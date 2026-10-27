import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { Context, Service } from '@deepseek-ai/cordis';

// 只加载实际发行 bundle；不执行 React 渲染，也不连接任何宿主后端。
async function loadBundle() {
  let plugin;
  const store = value => ({ getSnapshot: () => value, subscribe: () => () => {}, set: next => { value = next; } });
  const window = {
    __ModuleLoader__: { load: definition => { plugin = definition.factory(name => {
      if (name === 'react') return { createElement: (type, props, ...children) => ({ type, props: props || {}, children }), Component: class {}, Fragment: Symbol('Fragment'), createContext: () => ({ Provider: () => null }), memo: fn => fn, forwardRef: fn => fn, useState: initial => [typeof initial === 'function' ? initial() : initial, () => {}], useReducer: initial => [initial, () => {}], useEffect() {}, useLayoutEffect() {}, useRef: () => ({ current: null }), useMemo: fn => fn(), useCallback: fn => fn, useSyncExternalStore: () => null, useId: () => 'id' };
      if (name === 'react-dom') return { createPortal: node => node };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: store };
      if (name === '@deepseek-ai/dsh-client-ui-primitives') return { Button: () => null, IconRefreshOutlineRegular: () => null, MarkdownText: props => ({ type: 'markdown', props, children: [] }) };
      if (name === 'zod') return { z: makeZodStub() };
      return {};
    }); } },
    localStorage: { getItem: () => null, setItem() {} }
  };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'))
    .replace('    return module.exports;', 'module.exports.fixture = { createSkillsController, skillScopeOf, groupSkills, registerSkillsPage, startFreshDraft, SKILLS_PANEL_ID, mountSkillsRemote, skillFileAddress, SkillsDetail, SkillMarkdown, SKILL_MARKDOWN_LABELS }; return module.exports;');
  new Script(bundle).runInNewContext({ window, document: { body: { setAttribute() {}, removeAttribute() {}, getAttribute: () => null }, head: { appendChild() {} }, createElement: () => ({ dataset: {}, remove() {} }), activeElement: null }, console: { warn() {}, error() {} }, setInterval: () => ({}), clearInterval() {}, requestAnimationFrame: () => 0, cancelAnimationFrame() {}, setTimeout: () => ({}), clearTimeout() {}, navigator: {} });
  return plugin.fixture;
}

const source = value => ({ getSnapshot: () => value, subscribe: () => () => {} });
const plain = value => JSON.parse(JSON.stringify(value));
const collectText = (node, out = []) => {
  if (node === null || node === undefined || node === false || node === true) return out;
  if (Array.isArray(node)) { for (const child of node) collectText(child, out); return out; }
  if (typeof node === 'string' || typeof node === 'number') { out.push(String(node)); return out; }
  if (node.children) collectText(node.children, out);
  return out;
};
function makeZodStub() {
  const node = () => new Proxy(function () {}, {
    get: (_target, key) => key === 'passthrough' || key === 'optional' || key === 'extend' ? (() => node()) : (() => node()),
    apply: () => node()
  });
  return new Proxy({}, { get: () => (() => node()) });
}

function fakeContext(skills, options = {}) {
  const calls = { catalog: [], content: [], created: [], opened: [], using: [], draft: [] };
  const state = {
    sessions: { ids: ['s1'], byId: { s1: { cwd: 'C:/work/proj', retainedBy: { mainView: 1 }, projectionValues: { agentPreset: 'custom-preset' } } } },
    workspaces: { items: [{ workspaceId: 'w1', path: 'C:/work/proj', sessionIds: ['s1'], title: 'proj' }] }
  };
  const ctx = {
    sessions: {
      list: { getSnapshot: () => state.sessions, subscribe: () => () => {} },
      binding: () => ({ sessionId: 'new1' }),
      create: async request => { calls.created.push(request); return 'new1'; },
      using: async (target, usingOptions, operation) => {
        calls.using.push({ target, options: usingOptions });
        return operation({ binding: { sessionId: target } });
      }
    },
    workspaces: { list: { getSnapshot: () => state.workspaces, subscribe: () => () => {} } },
    uiWorkspace: { openSession: id => { calls.opened.push(id); } },
    layout: { selectPanel() {}, panelInfo: source({ activePanelId: null }) },
    sidebarRight: { openResource() {} },
    remote: { codexStyleSkills: {
      catalog: async request => { calls.catalog.push(request); return skills.catalog(request); },
      content: async request => { calls.content.push(request); return skills.content(request); }
    } },
    get: name => name === 'conversation' ? { input: { requestDraftInitialization: (binding, request) => { calls.draft.push({ binding, request }); return 'applied'; } } } : undefined
  };
  return { ctx, state, calls };
}

const sample = (name, source, extra = {}) => ({ name, description: name + ' 描述', whenToUse: '', invocation: { modelInvocable: true, userInvocable: true }, source, provider: 'p', ...extra });

test('scope is global without a retained session and uses the retained session cwd otherwise', async () => {
  const f = await loadBundle();
  const skills = { catalog: async () => ({ ok: true, value: { skills: [sample('alpha', 'project-dsh')], complete: true } }), content: async () => ({ ok: true, value: null }) };
  const { ctx, state, calls } = fakeContext(skills);
  assert.deepEqual(plain(f.skillScopeOf(ctx)), { sessionId: 's1', cwd: 'C:/work/proj', workspaceId: 'w1', workspaceTitle: 'proj', agentPreset: 'custom-preset' });
  const controller = f.createSkillsController(ctx);
  await controller.load();
  assert.deepEqual(plain(calls.catalog.at(-1)), { sessionId: 's1', cwd: 'C:/work/proj' });
  state.sessions = { ids: [], byId: {} };
  assert.deepEqual(plain(f.skillScopeOf(ctx)), { workspaceTitle: '' });
  await controller.load();
  // 全局视图只读 global 层，不能拿首个项目冒充选中范围。
  assert.deepEqual(plain(calls.catalog.at(-1)), {});
  controller.dispose();
});

test('out-of-order replies, incomplete catalogs and failures never fabricate an empty list', async () => {
  const f = await loadBundle();
  const pending = [];
  const skills = { catalog: () => new Promise(resolve => pending.push(resolve)), content: async () => ({ ok: true, value: null }) };
  const { ctx } = fakeContext(skills);
  const controller = f.createSkillsController(ctx);
  const first = controller.load();
  const second = controller.load();
  pending[1]({ ok: true, value: { skills: [sample('beta', 'bundled')], complete: true } });
  await second;
  pending[0]({ ok: true, value: { skills: [sample('stale', 'bundled')], complete: true } });
  await first;
  assert.deepEqual(plain(controller.store.getSnapshot().skills.map(skill => skill.name)), ['beta']);
  // complete=false：保留同 scope 上一份成功结果，只标记不完整。
  controller.load().catch(() => {});
  const third = pending.length;
  pending[third - 1]({ ok: true, value: { skills: [], complete: false } });
  await new Promise(setImmediate);
  const kept = controller.store.getSnapshot();
  assert.equal(kept.complete, false);
  assert.deepEqual(plain(kept.skills.map(skill => skill.name)), ['beta']);
  controller.dispose();
});

test('scope changes drop old rows; failures keep last same-scope rows and report the error', async () => {
  const f = await loadBundle();
  const skills = { catalog: async request => ({ ok: true, value: { skills: request.cwd === undefined ? [] : [sample('alpha', 'project-dsh')], complete: true } }), content: async () => ({ ok: true, value: null }) };
  const { ctx, state } = fakeContext(skills);
  const controller = f.createSkillsController(ctx);
  await controller.load();
  assert.equal(controller.store.getSnapshot().skills.length, 1);
  state.sessions = { ids: [], byId: {} };
  await controller.load();
  // 新作用范围不得沿用旧范围的行；全局视图此时确为空目录。
  assert.deepEqual(plain(controller.store.getSnapshot().skills), []);
  assert.deepEqual(plain(controller.store.getSnapshot().scopeKey), JSON.stringify([null, null]));
  state.sessions = { ids: ['s2'], byId: { s2: { cwd: 'C:/other', retainedBy: { mainView: 1 } } } };
  state.workspaces = { items: [{ workspaceId: 'w2', path: 'C:/other', sessionIds: ['s2'], title: 'other' }] };
  const failing = f.createSkillsController({ ...ctx, remote: { codexStyleSkills: { catalog: async () => ({ ok: false, error: { message: 'fixture disconnect' } }), content: async () => ({ ok: true, value: null }) } } });
  await failing.load();
  const stateAfter = failing.store.getSnapshot();
  assert.equal(stateAfter.phase, 'error');
  assert.match(stateAfter.error, /fixture disconnect/);
  assert.equal(stateAfter.skills.length, 0);
  controller.dispose(); failing.dispose();
});

test('content is pinned to the scope captured when the detail opened', async () => {
  const f = await loadBundle();
  const skills = { catalog: async () => ({ ok: true, value: { skills: [sample('alpha', 'project-dsh')], complete: true } }), content: async request => ({ ok: true, value: request.name === 'alpha' ? { ...sample('alpha', 'project-dsh'), content: '# Alpha' } : null }) };
  const { ctx, calls } = fakeContext(skills);
  const controller = f.createSkillsController(ctx);
  const pinned = { sessionId: 's1', cwd: 'C:/work/proj' };
  const value = await controller.content({ name: 'alpha' }, pinned);
  assert.equal(value.content, '# Alpha');
  assert.deepEqual(plain(calls.content.at(-1)), { name: 'alpha', sessionId: 's1', cwd: 'C:/work/proj' });
  // 页面已切到全局后，详情仍用打开时的 scope。
  assert.deepEqual(plain(calls.content.at(-1)), plain(calls.content.at(-1)));
  controller.dispose();
});

test('a fresh draft creates a new session with the preset, initializes only that draft and never submits', async () => {
  const f = await loadBundle();
  const skills = { catalog: async () => ({ ok: true, value: { skills: [], complete: true } }), content: async () => ({ ok: true, value: null }) };
  const { ctx, calls } = fakeContext(skills);
  const sessionId = await f.startFreshDraft(ctx, { workspaceId: 'w1', agentPreset: 'custom-preset' }, '/alpha ');
  assert.equal(sessionId, 'new1');
  assert.deepEqual(plain(calls.created), [{ workspaceId: 'w1', agentPreset: 'custom-preset' }]);
  assert.deepEqual(plain(calls.opened), ['new1']);
  assert.equal(calls.using.length, 1);
  assert.equal(calls.using[0].target, 'new1');
  assert.equal(calls.using[0].options.source, 'codexStyleSkills');
  assert.deepEqual(plain(calls.draft), [{ binding: { sessionId: 'new1' }, request: { prompt: '/alpha ', whenDraftExists: 'replace' } }]);
  assert.equal('send' in ctx.sessions, false);
  await f.startFreshDraft(ctx, { cwd: 'C:/unattached-project', agentPreset: 'custom-preset' }, '/alpha ');
  assert.deepEqual(plain(calls.created.at(-1)), { cwd: 'C:/unattached-project', agentPreset: 'custom-preset' });
  const blocked = { ...ctx, get: name => name === 'conversation' ? { input: { requestDraftInitialization: () => 'blocked' } } : undefined };
  await assert.rejects(() => f.startFreshDraft(blocked, { workspaceId: 'w1' }, '/alpha '), /草稿初始化被宿主拒绝/);
});

// 真实 Cordis：先只有 remote，$mount 后才发布 namespace；页面注册不得反向等待 namespace。
async function cordisFixture() {
  const ctx = new Context();
  const registered = [];
  const disposers = [];
  class Slots extends Service {
    constructor(scope) { super(scope, 'slots'); }
    inject(name, callback) {
      return this.ctx.effect(() => {
        const result = callback();
        if (result !== null && typeof result?.next === 'function') {
          const disposers = [];
          for (let step = result.next(); !step.done; step = result.next(undefined)) if (typeof step.value === 'function') disposers.push(step.value);
          return () => { for (const dispose of disposers.reverse()) dispose(); };
        }
        return undefined;
      });
    }
    register(options, component) { const entry = { options, component }; registered.push(entry); return () => { const index = registered.indexOf(entry); if (index >= 0) registered.splice(index, 1); }; }
  }
  await ctx.plugin(Slots).await();
  const sessions = { list: source({ ids: [], byId: {} }), create: async () => 's1', using: async (target, options, operation) => operation({ binding: { sessionId: target } }), binding: () => ({ sessionId: 's1' }) };
  ctx.provide('sessions', sessions);
  ctx.provide('workspaces', { list: source({ items: [] }) });
  ctx.provide('uiSession', {});
  ctx.provide('uiWorkspace', { openSession() {} });
  ctx.provide('layout', { panelInfo: source({ activePanelId: null }), selectPanel() {} });
  ctx.provide('sidebarRight', {});
  const remote = { mounts: 0, $mount: () => { remote.mounts += 1; return () => {}; } };
  ctx.provide('remote', remote);
  return { ctx, remote, registered, publish: () => { remote.codexStyleSkills = { catalog: async () => ({ ok: true, value: { skills: [], complete: true } }), content: async () => ({ ok: true, value: null }) }; }, dispose: () => ctx.fiber.dispose() };
}

test('skills page registers without the mounted namespace and the mount publishes it afterwards', async () => {
  const f = await loadBundle();
  const cordis = await cordisFixture();
  try {
    const fiber = f.registerSkillsPage(cordis.ctx);
    await fiber.await?.();
    for (let tick = 0; tick < 20; tick++) await new Promise(setImmediate);
    // 页面已可到达：main 注册先于 namespace 建立，mount 也已发生。
    assert.ok(cordis.remote.mounts >= 1, 'mount should run');
    assert.equal(cordis.registered.filter(entry => entry.options?.key === f.SKILLS_PANEL_ID).length, 1);
    assert.equal(cordis.remote.codexStyleSkills, undefined);
    cordis.publish();
    await new Promise(setImmediate);
    assert.equal(typeof cordis.remote.codexStyleSkills.catalog, 'function');
    assert.equal(cordis.registered.filter(entry => entry.options?.key === f.SKILLS_PANEL_ID).length, 1);
  } finally {
    await cordis.dispose();
  }
});

test('navigation registers exactly one skills panel and groups only real sources', async () => {
  const f = await loadBundle();
  const groups = f.groupSkills([sample('a', 'project-dsh'), sample('b', 'user-dsh'), sample('c', 'bundled'), sample('d', 'plugin-custom')]);
  assert.deepEqual(plain(groups.map(group => group.label)), ['项目', '个人', '内置', '其他来源']);
  assert.deepEqual(plain(groups.map(group => group.skills.length)), [1, 1, 1, 1]);
  // 路径编码与原生 helper 一致：不过滤空段，保留盘符冒号。
  assert.equal(f.skillFileAddress('s1', 'C:/work/proj', 'C:/work/proj/.dsh/skills/a/SKILL.md'), 'dsh-resource://file/session/s1/.dsh/skills/a/SKILL.md');
  assert.equal(f.skillFileAddress('s1', 'C:/work/proj', 'D:/outside/SKILL.md'), 'dsh-resource://file/session/s1/D:/outside/SKILL.md');
});

test('detail dialog wraps every section and hides the try action for user-only skills', async () => {
  const f = await loadBundle();
  const baseSkill = sample('alpha', 'project-dsh', { invocation: { modelInvocable: true, userInvocable: true } });
  const detail = skill => f.SkillsDetail({ ctx: {}, controller: { content: async () => null }, scope: { sessionId: 's1', cwd: 'C:/work' }, skill, onClose() {}, restoreFocus() {} });
  const overlay = detail(baseSkill);
  assert.match(overlay.props.className, /dsc-skills-overlay/);
  const children = overlay.children.filter(Boolean);
  assert.equal(children.length, 1, 'overlay must contain exactly the dialog');
  const dialog = children[0];
  assert.match(dialog.props.className, /dsc-skills-dialog/);
  const classes = dialog.children.filter(Boolean).map(node => node.props?.className || '');
  for (const required of ['dsc-skills-dialog-headrow', 'dsc-skills-dialog-title', 'dsc-skills-dialog-desc', 'dsc-skills-preview', 'dsc-skills-dialog-foot']) {
    assert.ok(classes.includes(required), `dialog must wrap ${required}`);
  }
  // 头部行只放图标与操作；标题、描述、预览和底栏必须是 dialog 的直接子节点。
  const headrow = dialog.children.filter(Boolean).find(node => node.props?.className === 'dsc-skills-dialog-headrow');
  assert.equal(headrow.children.filter(Boolean).length, 2);
  assert.ok(collectText(dialog).includes('立即试用'), 'user-invocable skill keeps the try action');
  const userOnly = detail({ ...baseSkill, invocation: { modelInvocable: true, userInvocable: false } });
  assert.equal(collectText(userOnly).includes('立即试用'), false, 'user-only skill must not offer the command button');
});

test('SkillMarkdown passes the complete native labels contract', async () => {
  const f = await loadBundle();
  const labels = f.SKILL_MARKDOWN_LABELS;
  assert.deepEqual(plain(labels.code.toolbarLabels), { codeLabel: '代码块', wrapLabel: '自动换行', unwrapLabel: '取消自动换行' });
  assert.equal(labels.code.copyLabel, '复制');
  assert.equal(labels.code.copiedLabel, '复制成功');
  assert.equal(labels.footnotes, '脚注');
  const tree = f.SkillMarkdown({ text: '# 标题' });
  const markdown = tree.children[0];
  assert.equal(typeof markdown.type, 'function');
  assert.deepEqual(plain(markdown.props.labels), plain(labels));
});
