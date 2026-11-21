import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

// Exercise the shipped WorkspaceTree and its row callbacks, with synchronous stores/hooks.
// Browser layout and effects are checked separately; this fixture owns no host data.
async function fixture(input) {
  const states = []; let cursor = 0, plugin;
  const store = value => ({ getSnapshot: () => value, subscribe: () => () => {}, set: next => { value = next; } });
  const React = {
    Component: class {}, Fragment: 'fragment',
    createElement: (type, props, ...children) => ({ type, props: props || {}, children: children.flat(Infinity) }),
    useState(initial) { const index = cursor++; if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial; return [states[index], next => { states[index] = typeof next === 'function' ? next(states[index]) : next; }]; },
    useMemo: fn => fn(), useCallback: fn => fn,
    useRef(current) { const index = cursor++; return states[index] ??= { current }; },
    useEffect() {}, useLayoutEffect() {}, useSyncExternalStore: (_, snapshot) => snapshot(), useId: () => 'fixture'
  };
  const bundle = (await readFile(process.env.DSH_RECENTS_BUNDLE || new URL('../lib/client.js', import.meta.url), 'utf8'))
    .replace('    return module.exports;', 'module.exports.fixture = { makeWorkspaceTree }; return module.exports;');
  new Script(bundle).runInNewContext({ window: { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => name === 'react' ? React : name === '@deepseek-ai/dsh-client-store' ? { createSnapshotStore: store } : {});
  } } }, __DSH_DIRECTORY_PICKER__: input?.desktop, clearTimeout, setTimeout, console });
  const sessions = input?.sessions ?? [
    { id: 'a', title: 'Alpha', updatedAt: 100, retainedBy: { mainView: 1 } },
    { id: 'b', title: 'Beta', updatedAt: 300 },
    { id: 'p', title: 'Pinned', updatedAt: 200 },
    { id: 'archived', title: 'Archived', updatedAt: 400 },
    { id: 'blank', blank: true, updatedAt: 600 },
    { id: 'child', origin: 'subagent', updatedAt: 500 }
  ];
  const catalog = store({ phase: 'ready', ids: sessions.map(s => s.id), byId: Object.fromEntries(sessions.map(s => [s.id, s])) });
  const workspaces = store(input?.workspaces ?? { items: [
    { workspaceId: 'one', title: 'Project one', sessionIds: ['a', 'p', 'archived', 'blank', 'child'] },
    { workspaceId: 'two', title: 'Project two', sessionIds: ['b', 'a'] }
  ], archivedSessionIds: ['archived'], pinnedSessionIds: ['p'] });
  const opened = [], status = store(new Map()), completions = store(new Set());
  const ctx = { sessions: { list: catalog }, workspaces: { list: workspaces },
    uiSession: { sessionStatus: status }, layout: { panelInfo: store({ activePanelId: null }) },
    modules: input?.modules,
    uiWorkspace: { openSession: id => opened.push(id), ...input?.uiWorkspace } };
  ctx.workspaces.create = input?.createWorkspace;
  const Tree = plugin.fixture.makeWorkspaceTree(ctx, completions, { show() {} });
  return { catalog, workspaces, opened, status, completions, render: props => { cursor = 0; return Tree(props || {}); } };
}
function all(node, predicate) {
  if (!node || typeof node !== 'object') return [];
  let children = node.children;
  // Search the settled fold state and leave transition timing to the browser fixture.
  if (typeof children[0] === 'function' && typeof node.props.open === 'boolean') {
    children = node.props.open ? [children[0]()] : [];
  }
  return [...(predicate(node) ? [node] : []), ...children.flatMap(child => all(child, predicate))];
}
const rows = node => all(node, n => n.props.className?.split(' ').includes('dsc-thread'));
const ids = node => rows(node).map(n => n.props.key);
const byClass = name => node => node.props.className?.split(' ').includes(name);
const treeProjects = tree => all(tree, byClass('dsc-project-list'))[0];
const project = (tree, id) => all(treeProjects(tree), n => n.type === 'section' && n.props.key === id)[0];
const moreButton = (node, scope, text = '展开显示') => all(node, n => n.type === 'button' &&
  n.props['data-dsc-sidebar-more'] === scope && n.children.includes(text))[0];
const openProject = (tree, id) => {
  const button = all(project(tree, id), byClass('dsc-project-main'))[0];
  assert.ok(button, `project ${id} exists`);
  if (!button.props['aria-expanded']) button.props.onClick();
};
const recent = tree => all(tree, byClass('dsc-recent-list'))[0];
const addButton = tree => all(tree, node => node.props.title === '添加工作区')[0];

test('workspace add uses the NEXT bridge once and opens the created workspace', async () => {
  let selectDirectory;
  const calls = [];
  const f = await fixture({
    desktop: { pick: () => { calls.push('desktop'); return new Promise(resolve => { selectDirectory = resolve; }); } },
    createWorkspace: async ({ path }) => { calls.push(path); return { workspaceId: 'new' }; },
    uiWorkspace: { pickDirectory: () => assert.fail('host picker called alongside desktop bridge'),
      openWorkspace: async id => calls.push(id) }
  });
  const props = { onNavigate: () => calls.push('navigated') };
  const button = addButton(f.render(props));
  const pending = button.props.onClick();
  await button.props.onClick();
  assert.equal(addButton(f.render(props)).props.disabled, true);
  selectDirectory('C:/example');
  await pending;
  assert.deepEqual(calls, ['desktop', 'C:/example', 'new', 'navigated']);
  assert.equal(addButton(f.render(props)).props.disabled, false);
});

test('workspace add preserves native cancel and error and can be retried', async () => {
  let attempts = 0;
  const f = await fixture({
    uiWorkspace: { pickDirectory: async () => { if (++attempts === 1) return null; throw new Error('chooser unavailable'); } },
    createWorkspace: () => assert.fail('no directory selected')
  });
  await addButton(f.render()).props.onClick();
  assert.equal(addButton(f.render()).props.disabled, false);
  await addButton(f.render()).props.onClick();
  assert.equal(attempts, 2);
  assert.equal(addButton(f.render()).props.disabled, false);
  assert.ok(all(f.render(), node => node.props.text?.includes('chooser unavailable')).length > 0);
});

test('workspace add in browser browse mode delegates to the host factory during search', async () => {
  let picker;
  const f = await fixture({
    modules: { manifest: { plugins: [{ id: '@deepseek-ai/dsh-client-ui-directory-picker-browse' }] } },
    createWorkspace: () => assert.fail('host picker creates the workspace'),
    uiWorkspace: { pickDirectory: () => assert.fail('native picker called for browse mode'),
      openWorkspace: id => f.opened.push(id) }
  });
  const props = { query: 'Alpha', renderFactorySlot: (name, input) => { assert.equal(name, 'workspace.picker'); picker = input; } };
  addButton(f.render(props)).props.onClick();
  f.render(props);
  assert.equal(picker.open, true);
  picker.onClose();
  f.render(props);
  assert.equal(picker.open, false);
  picker.onPick('new');
  assert.deepEqual(f.opened, ['new']);
});

test('recent includes project and pinned sessions once, newest first, with normal exclusions', async () => {
  const f = await fixture();
  openProject(f.render(), 'two');
  const tree = f.render();
  assert.deepEqual(ids(recent(tree)), ['b', 'p', 'a']);
  assert.equal(rows(tree).filter(n => n.props.key === 'a').length, 3, 'two project references and one recent entry');
  assert.equal(rows(tree).filter(n => n.props.key === 'p').length, 2, 'existing pinned section plus recent entry');
});

test('project collapse leaves recent available and both entries open the same session', async () => {
  const f = await fixture();
  openProject(f.render(), 'two');
  let tree = f.render();
  assert.equal(rows(tree).filter(n => n.props.key === 'a').length, 3);
  for (const row of rows(tree).filter(n => n.props.key === 'a')) {
    all(row, n => n.props.className === 'dsc-thread-main')[0].props.onClick();
  }
  assert.deepEqual(f.opened, ['a', 'a', 'a']);
  all(tree, n => n.props.className === 'dsc-projects-toggle')[0].props.onClick();
  tree = f.render();
  assert.equal(all(tree, n => n.props.className === 'dsc-projects-toggle')[0].props['aria-expanded'], false);
  assert.deepEqual(ids(recent(tree)), ['b', 'p', 'a']);
});

test('recent follows rename, activity, timestamps, archive visibility and removals', async () => {
  const f = await fixture(), snapshot = f.catalog.getSnapshot();
  f.catalog.set({ ...snapshot, byId: { ...snapshot.byId, a: { ...snapshot.byId.a, title: 'Renamed', updatedAt: 700 } } });
  f.status.set(new Map([['a', { running: true }]]));
  let tree = f.render();
  assert.deepEqual(ids(recent(tree)), ['a', 'b', 'p']);
  for (const row of rows(tree).filter(n => n.props.key === 'a')) {
    assert.equal(all(row, n => n.props.title === 'Renamed').length, 1);
    assert.equal(all(row, n => n.props['aria-label'] === '对话进行中').length, 1);
  }
  const ws = f.workspaces.getSnapshot(); f.workspaces.set({ ...ws, archivedSessionIds: ['archived', 'a'] });
  tree = f.render(); assert.deepEqual(ids(recent(tree)), ['b', 'p']);
  all(tree, n => n.type === 'input' && n.props.type === 'checkbox')[0].props.onChange({ target: { checked: true } });
  tree = f.render(); assert.deepEqual(ids(recent(tree)), ['a', 'archived', 'b', 'p']);
  f.catalog.set({ ...f.catalog.getSnapshot(), ids: snapshot.ids.filter(id => id !== 'a') });
  assert.deepEqual(ids(recent(f.render())), ['archived', 'b', 'p']);
});

test('search produces a single result per session despite multiple project memberships', async () => {
  const f = await fixture();
  assert.deepEqual(ids(f.render({ query: 'Alpha' })), ['a']);
});

function paginationData() {
  const sessions = [], items = [];
  const add = (id, updatedAt, extra) => {
    sessions.push({ id, title: id, updatedAt, ...extra });
    return id;
  };
  const main = Array.from({ length: 47 }, (_, index) => add(`main-${index + 1}`, index === 0 ? 3000 : 1000 - index,
    index === 0 ? { retainedBy: { mainView: 1 } } : undefined));
  const otherRecent = Array.from({ length: 60 }, (_, index) => add(`standalone-${index + 1}`, 2000 - index));
  for (const index of [7, 8, 3, 6, 2, 5, 4]) {
    const stamp = index <= 5 ? 3001 - index : 500 - index;
    const session = add(`project-${index}-only`, stamp);
    items.push({ workspaceId: `p${index}`, title: `Project ${index}`, sessionIds: [session] });
  }
  items.splice(3, 0, { workspaceId: 'p1', title: 'Project 1', sessionIds: [...main].reverse() });
  return { sessions, workspaces: { items, archivedSessionIds: [], pinnedSessionIds: [] }, main,
    global: [main[0], 'project-2-only', 'project-3-only', 'project-4-only', 'project-5-only', ...otherRecent, ...main.slice(1),
      'project-6-only', 'project-7-only', 'project-8-only'] };
}

test('project pane mounts five projects by latest conversation and adds the others on demand', async () => {
  const data = paginationData(), f = await fixture(data);
  let tree = f.render();
  const projectIds = tree => all(treeProjects(tree), n => n.type === 'section').map(n => n.props.key);
  assert.deepEqual(projectIds(tree), ['p1', 'p2', 'p3', 'p4', 'p5']);
  assert.equal(ids(tree).some(id => id.startsWith('project-8-')), false);
  assert.deepEqual(ids(project(tree, 'p2')), [], 'closed project has no mounted conversations');
  const button = moreButton(treeProjects(tree), 'projects');
  assert.ok(button, 'project pane has its own expand control');
  button.props.onClick();
  tree = f.render();
  assert.deepEqual(projectIds(tree), ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8']);
  openProject(tree, 'p8');
  tree = f.render();
  assert.deepEqual(ids(project(tree, 'p8')), ['project-8-only']);
  assert.deepEqual(ids(recent(tree)), data.global.slice(0, 20));
  moreButton(treeProjects(tree), 'projects', '收起').props.onClick();
  assert.deepEqual(projectIds(f.render()), ['p1', 'p2', 'p3', 'p4', 'p5']);

  const snapshot = f.catalog.getSnapshot();
  const moved = snapshot.byId['project-8-only'];
  f.catalog.set({ ...snapshot, byId: { ...snapshot.byId, [moved.id]: { ...moved, updatedAt: 4000 } } });
  f.workspaces.set({ ...data.workspaces, pinnedSessionIds: [moved.id] });
  tree = f.render();
  assert.deepEqual(projectIds(tree), ['p8', 'p1', 'p2', 'p3', 'p4'], 'pinned recent activity still ranks the project');
  assert.deepEqual(ids(project(tree, 'p8')), [], 'pinned sessions retain their separate group');
  assert.deepEqual(ids(recent(tree)).slice(0, 2), ['project-8-only', 'main-1']);
});

test('recent mounts 20 conversations at a time and search can find the remainder', async () => {
  const data = paginationData(), f = await fixture(data);
  let tree = f.render();
  assert.deepEqual(ids(recent(tree)), data.global.slice(0, 20));
  assert.ok(!ids(tree).includes('standalone-60'));
  for (const size of [40, 60, 80, 100, data.global.length]) {
    const button = moreButton(recent(tree), 'recent');
    assert.ok(button, 'recent has its own expand control until the final batch');
    button.props.onClick();
    tree = f.render();
    assert.deepEqual(ids(recent(tree)), data.global.slice(0, size));
  }
  moreButton(recent(tree), 'recent', '收起').props.onClick();
  assert.deepEqual(ids(recent(f.render())), data.global.slice(0, 20));
  const initial = await fixture(data);
  assert.deepEqual(ids(initial.render({ query: 'standalone-60' })), ['standalone-60']);
});

test('recent group folds independently and restores its loaded page on reopen', async () => {
  const data = paginationData(), f = await fixture(data);
  const toggle = tree => all(tree, byClass('dsc-recent-toggle'))[0];
  let tree = f.render();
  assert.equal(toggle(tree).props['aria-expanded'], true);
  moreButton(recent(tree), 'recent').props.onClick();
  tree = f.render();
  const projectRows = ids(treeProjects(tree));
  toggle(tree).props.onClick();
  tree = f.render();
  assert.equal(toggle(tree).props['aria-expanded'], false);
  assert.equal(recent(tree), undefined);
  assert.deepEqual(ids(treeProjects(tree)), projectRows);
  assert.deepEqual(ids(f.render({ query: 'standalone-60' })), ['standalone-60']);
  toggle(f.render()).props.onClick();
  tree = f.render();
  assert.equal(toggle(tree).props['aria-expanded'], true);
  assert.deepEqual(ids(recent(tree)), data.global.slice(0, 40));
  assert.deepEqual(f.opened, []);
});

test('a recent project loads its own five conversations even outside global recent and adds batches independently', async () => {
  const data = paginationData(), f = await fixture(data);
  f.status.set(new Map([['main-6', { running: true }], ['main-47', { pendingInteraction: true }]]));
  let tree = f.render();
  assert.ok(!ids(recent(tree)).includes('main-2'));
  assert.deepEqual(ids(project(tree, 'p1')), data.main.slice(0, 5));
  assert.ok(!ids(tree).includes('main-6'));
  for (const size of [25, 45, 47]) {
    const button = moreButton(project(tree, 'p1'), 'project');
    assert.ok(button, 'each project has its own expand control until the final batch');
    button.props.onClick();
    tree = f.render();
    assert.deepEqual(ids(project(tree, 'p1')), data.main.slice(0, size));
    assert.deepEqual(ids(recent(tree)), data.global.slice(0, 20));
  }
  moreButton(project(tree, 'p1'), 'project', '收起').props.onClick();
  assert.deepEqual(ids(project(f.render(), 'p1')), data.main.slice(0, 5));
});
