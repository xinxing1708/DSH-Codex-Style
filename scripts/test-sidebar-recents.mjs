import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

// Exercise the shipped WorkspaceTree and its row callbacks, with synchronous stores/hooks.
// Browser layout and effects are checked separately; this fixture owns no host data.
async function fixture() {
  const states = []; let cursor = 0, plugin;
  const store = value => ({ getSnapshot: () => value, subscribe: () => () => {}, set: next => { value = next; } });
  const React = {
    Component: class {}, Fragment: 'fragment',
    createElement: (type, props, ...children) => ({ type, props: props || {}, children: children.flat(Infinity) }),
    useState(initial) { const index = cursor++; if (!(index in states)) states[index] = initial; return [states[index], next => { states[index] = typeof next === 'function' ? next(states[index]) : next; }]; },
    useMemo: fn => fn(), useCallback: fn => fn, useRef: current => ({ current }),
    useEffect() {}, useLayoutEffect() {}, useSyncExternalStore: (_, snapshot) => snapshot(), useId: () => 'fixture'
  };
  const bundle = (await readFile(process.env.DSH_RECENTS_BUNDLE || new URL('../lib/client.js', import.meta.url), 'utf8'))
    .replace('    return module.exports;', 'module.exports.fixture = { makeWorkspaceTree }; return module.exports;');
  new Script(bundle).runInNewContext({ window: { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => name === 'react' ? React : name === '@deepseek-ai/dsh-client-store' ? { createSnapshotStore: store } : {});
  } } }, clearTimeout, setTimeout, console });
  const sessions = [
    { id: 'a', title: 'Alpha', updatedAt: 100, retainedBy: { mainView: 1 } },
    { id: 'b', title: 'Beta', updatedAt: 300 },
    { id: 'p', title: 'Pinned', updatedAt: 200 },
    { id: 'archived', title: 'Archived', updatedAt: 400 },
    { id: 'blank', blank: true, updatedAt: 600 },
    { id: 'child', origin: 'subagent', updatedAt: 500 }
  ];
  const catalog = store({ phase: 'ready', ids: sessions.map(s => s.id), byId: Object.fromEntries(sessions.map(s => [s.id, s])) });
  const workspaces = store({ items: [
    { workspaceId: 'one', title: 'Project one', sessionIds: ['a', 'p', 'archived', 'blank', 'child'] },
    { workspaceId: 'two', title: 'Project two', sessionIds: ['b', 'a'] }
  ], archivedSessionIds: ['archived'], pinnedSessionIds: ['p'] });
  const opened = [], status = store(new Map()), completions = store(new Set());
  const ctx = { sessions: { list: catalog }, workspaces: { list: workspaces },
    uiSession: { sessionStatus: status }, layout: { panelInfo: store({ activePanelId: null }) },
    uiWorkspace: { openSession: id => opened.push(id) } };
  const Tree = plugin.fixture.makeWorkspaceTree(ctx, completions, { show() {} });
  return { catalog, workspaces, opened, status, completions, render: props => { cursor = 0; return Tree(props || {}); } };
}
function all(node, predicate) {
  if (!node || typeof node !== 'object') return [];
  return [...(predicate(node) ? [node] : []), ...node.children.flatMap(child => all(child, predicate))];
}
const rows = node => all(node, n => n.props.className?.split(' ').includes('dsc-thread'));
const ids = node => rows(node).map(n => n.props.key);
const recent = tree => {
  const parent = all(tree, n => n.children.some(c => c?.props?.className === 'dsc-section-title' && c.children.includes('最近')))[0];
  assert.ok(parent, 'recent heading exists');
  const index = parent.children.findIndex(c => c?.props?.className === 'dsc-section-title' && c.children.includes('最近'));
  return { props: {}, children: parent.children.slice(index + 1) };
};

test('recent includes project and pinned sessions once, newest first, with normal exclusions', async () => {
  const f = await fixture(), tree = f.render();
  assert.deepEqual(ids(recent(tree)), ['b', 'p', 'a']);
  assert.equal(rows(tree).filter(n => n.props.key === 'a').length, 3, 'two project references and one recent entry');
  assert.equal(rows(tree).filter(n => n.props.key === 'p').length, 2, 'existing pinned section plus recent entry');
});

test('project collapse leaves recent available and both entries open the same session', async () => {
  const f = await fixture(); let tree = f.render();
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
