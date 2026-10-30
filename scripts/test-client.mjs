import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { Context, Service } from '@deepseek-ai/cordis';

// 加载实际发行 bundle；DOM 呈现另用原生前端隔离检查，这里只验证服务生命周期。
async function modelRegistration() {
  let plugin;
  const intervals = new Map();
  const store = value => ({ getSnapshot: () => value, set: next => { value = next; } });
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: store };
      return {};
    });
  } }, localStorage: { getItem: () => null } };
  new Script(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).runInNewContext({
    window, console: { warn() {}, error() {} },
    setInterval: fn => { const id = {}; intervals.set(id, fn); return id; },
    clearInterval: id => intervals.delete(id)
  });
  const injections = [];
  plugin.apply({ inject: (dependencies, callback) => injections.push({ dependencies, callback }), effect() {}, slots: { inject() {} } });
  return { ...injections.find(row => row.dependencies.includes('remote.session')), intervals };
}

async function fixture(t) {
  const registration = await modelRegistration();
  const ctx = new Context();
  t.after(() => ctx.fiber.dispose());
  const entries = new Set();
  class Slots extends Service {
    constructor(scope) { super(scope, 'slots'); }
    entries() { return [{ options: { priority: -7 } }]; }
    inject(name, callback) { return this.ctx.effect(callback); }
    register(options, component) {
      const entry = { options, component }; entries.add(entry);
      return () => entries.delete(entry);
    }
  }
  await ctx.plugin(Slots).await();
  for (const name of ['sessions', 'locale', 'remote', 'remote.session']) ctx.provide(name, {});
  const consumer = ctx.inject(registration.dependencies, registration.callback);
  await new Promise(setImmediate);
  class Directories extends Service {
    constructor(scope, id) { super(scope, 'modelDirectories'); this.id = id; }
    directoryFor(sessionId) { return { service: this.id, sessionId }; }
  }
  const provide = async id => {
    const provider = ctx.plugin(Directories, id); await provider.await(); await consumer.await();
    await new Promise(setImmediate); return provider;
  };
  return { ...registration, entries, provide };
}

test('model picker mounts when its service becomes ready after the old probe deadline', async t => {
  const f = await fixture(t);
  for (let tick = 0; tick < 42; tick++) for (const callback of [...f.intervals.values()]) callback();
  await f.provide('late');
  assert.equal(f.entries.size, 1);
  const entry = [...f.entries][0];
  assert.equal(entry.options.priority, -8);
  assert.equal(entry.options.inject('chat').directory.service, 'late');
});

test('model picker releases a removed service and binds the replacement', async t => {
  const f = await fixture(t);
  const first = await f.provide('first');
  // 旧代码也先完成一次探测，以便独立验证替换时的清理。
  for (const callback of [...f.intervals.values()]) callback();
  assert.equal(f.entries.size, 1);
  await first.dispose(); await new Promise(setImmediate);
  assert.equal(f.entries.size, 0);
  await f.provide('second');
  assert.equal(f.entries.size, 1);
  assert.equal([...f.entries][0].options.inject('chat').directory.service, 'second');
});

// 运行实际 bundle 和 Cordis 生命周期，检查两个呈现组件是否互相干扰。
async function presentationFixture(t) {
  let plugin;
  const attributes = new Map(), styles = new Set(), events = new Map(), entries = new Set();
  const document = {
    body: { getAttribute: () => null, setAttribute: (key, value) => attributes.set(key, value), removeAttribute: key => attributes.delete(key) },
    head: { appendChild: style => styles.add(style) },
    createElement: () => { const node = { dataset: {}, remove() { styles.delete(node); } }; return node; },
    documentElement: { hasAttribute: () => false },
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) };
      return {};
    });
  } }, localStorage: { getItem: () => null }, addEventListener() {}, removeEventListener() {} };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).replace('    return module.exports;', 'module.exports.fixture = { watchCodexPresentation, headerPresentation }; return module.exports;');
  new Script(bundle).runInNewContext({ window, document, console: { warn() {}, error() {} }, queueMicrotask, requestAnimationFrame: () => 1, cancelAnimationFrame() {}, getComputedStyle: () => ({ position: 'static' }) });
  const ctx = new Context();
  class Slots extends Service {
    constructor(scope) { super(scope, 'slots'); }
    entries() { return [{ options: { key: 'turn-process', priority: 0 } }]; }
    inject(name, callback) { return this.ctx.effect(callback); }
    register(options, component) { const entry = { options, component }; entries.add(entry); return () => entries.delete(entry); }
  }
  await ctx.plugin(Slots).await();
  let inventory = [], nextReply;
  const fibers = [];
  ctx.on('internal/plugin', fiber => { fibers.push(fiber); });
  ctx.provide('remote', {
    pluginInventory: { list: () => nextReply ? nextReply() : Promise.resolve({ ok: true, value: { entries: inventory } }) },
    $on: (name, callback) => { events.set(name, callback); return () => events.delete(name); }
  });
  const observable = value => ({ getSnapshot: () => value, subscribe: () => () => {} });
  ctx.provide('layout', { panelInfo: observable({ activePanelId: null }), beginNavigation() { return { aborted: false }; }, selectPanel() {} });
  ctx.provide('sessions', { list: observable({ ids: ['a'], byId: { a: { retainedBy: { mainView: 1 } } } }) });
  ctx.provide('uiWorkspace', { openSession() {} });
  ctx.provide('shortcuts', { catalog: observable([]), register: () => () => {} });
  const stop = ctx.effect(() => plugin.fixture.watchCodexPresentation(ctx));
  t.after(() => ctx.fiber.dispose());
  const flush = () => new Promise(setImmediate);
  const set = async (header, body, navigation, phase = 'active') => {
    inventory = [['header', header], ['body', body], ['navigation', navigation]].map(([name, enabled]) => ({ moduleName: '@xinxing1708/dsh-codex-style/' + name, enabled, fiberPhase: enabled ? phase : null }));
    await events.get('plugin-manager/changed')(); await flush();
    for (const fiber of fibers) await fiber.await();
  };
  const state = () => ({ header: attributes.has('data-dsc-codex-header'), body: attributes.has('data-dsc-codex-body'), navigation: attributes.has('data-dsc-codex-navigation'), headerStore: plugin.fixture.headerPresentation.getSnapshot(), styles: styles.size, slots: entries.size });
  await flush();
  return { ctx, set, stop, state, events, reply: fn => { nextReply = fn; }, flush };
}

test('header, body and navigation effects switch independently and release on plugin disposal', async t => {
  const f = await presentationFixture(t);
  for (const [header, body, navigation] of [[true, true, true], [false, true, true], [true, false, true], [true, true, false], [false, false, false], [true, true, true]]) {
    await f.set(header, body, navigation);
    assert.deepEqual(f.state(), {
      header, body, navigation, headerStore: header,
      styles: Number(header) + Number(body) + Number(navigation),
      slots: Number(body) + Number(navigation)
    }, `header=${header}, body=${body}, navigation=${navigation}`);
  }
  f.stop(); await f.flush();
  assert.deepEqual(f.state(), { header: false, body: false, navigation: false, headerStore: false, styles: 0, slots: 0 });
  assert.equal(f.events.size, 0);
});

test('inactive inventory, errors and stale replies cannot enable presentation effects', async t => {
  const f = await presentationFixture(t);
  await f.set(true, true, true, 'loading');
  assert.equal(f.state().styles, 0);
  await f.set(true, true, true);
  f.reply(() => Promise.resolve({ ok: false, error: { message: 'fixture disconnected' } }));
  await f.events.get('plugin-manager/changed')(); await f.flush();
  assert.equal(f.state().styles, 0);
  const replies = [];
  f.reply(() => new Promise(resolve => replies.push(resolve)));
  const refresh = f.events.get('plugin-manager/changed');
  const old = refresh(), latest = refresh();
  replies[1]({ ok: true, value: { entries: [] } }); await latest;
  replies[0]({ ok: true, value: { entries: ['header', 'body', 'navigation'].map(name => ({ moduleName: '@xinxing1708/dsh-codex-style/' + name, enabled: true, fiberPhase: 'active' })) } }); await old; await f.flush();
  assert.equal(f.state().styles, 0);
});

// 「更多」不再由侧栏局部状态旁路；点击必须切换真实 main 面板。
async function moreFixture() {
  let plugin;
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) };
      return {};
    });
  } }, localStorage: { getItem: () => null } };
  const document = {
    body: { getAttribute: () => null, setAttribute() {}, removeAttribute() {} },
    head: { appendChild() {} },
    createElement: () => ({ dataset: {}, remove() {} }),
    documentElement: { hasAttribute: () => false },
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).replace('    return module.exports;', 'module.exports.fixture = { navigationCategoryOf, openMorePanel, registerMorePage, MORE_PANEL_ID, sidebarSectionOf }; return module.exports;');
  new Script(bundle).runInNewContext({ window, document, console: { warn() {}, error() {} }, queueMicrotask, requestAnimationFrame: () => 1, cancelAnimationFrame() {} });
  return plugin.fixture;
}

test('more entry selects the plugin main panel and derives its category from activePanelId', async () => {
  const fixture = await moreFixture();
  assert.equal(fixture.MORE_PANEL_ID, 'codex-style-more');
  // 页面以插件自有 main 面板注册；侧栏入口是否显示仍由原生 entry-customization 决定。
  const registered = [];
  const slots = {
    inject: (name, callback) => { assert.equal(name, 'main'); return callback(); },
    register: (options, component) => { registered.push({ options, component }); return () => {}; }
  };
  fixture.registerMorePage({ slots });
  // vm 内对象与宿主不同 realm，逐字段比较原语。
  assert.equal(registered.length, 1);
  assert.equal(registered[0].options.name, 'main');
  assert.equal(registered[0].options.key, 'codex-style-more');
  assert.equal(typeof registered[0].component, 'function');
  const calls = [];
  const errors = [];
  const rail = { hide: () => calls.push('hide'), store: { getSnapshot: () => ({ collapsed: true, preview: null }) } };
  const layout = { selectPanel: id => calls.push(['selectPanel', id]), toggleSidebar: () => calls.push('toggleSidebar') };
  assert.equal(fixture.openMorePanel({ layout }, rail, text => errors.push(text)), true);
  // 先收起预览、再切换页面、最后在收起态展开侧栏（保持原「点更多会展开」行为）。
  assert.deepEqual(calls, ['hide', ['selectPanel', 'codex-style-more'], 'toggleSidebar']);
  assert.deepEqual(errors, ['']);
  calls.length = 0;
  const expanded = { hide: () => calls.push('hide'), store: { getSnapshot: () => ({ collapsed: false, preview: null }) } };
  fixture.openMorePanel({ layout }, expanded, text => errors.push(text));
  assert.deepEqual(calls, ['hide', ['selectPanel', 'codex-style-more']]);
  // 失败只回显错误，不展开侧栏，也不伪造分类。
  calls.length = 0;
  const failing = { layout: { selectPanel: () => { throw new Error('boom'); }, toggleSidebar: () => calls.push('toggleSidebar') } };
  assert.equal(fixture.openMorePanel(failing, rail, text => errors.push(text)), false);
  assert.deepEqual(calls, ['hide']);
  assert.deepEqual(errors.slice(-1), ['boom']);
  // 分类只由 activePanelId 决定，与侧栏 section 无关。
  assert.equal(fixture.navigationCategoryOf({ activePanelId: 'codex-style-more' }), 'more');
  assert.equal(fixture.navigationCategoryOf({ activePanelId: null }), 'home');
  assert.equal(fixture.navigationCategoryOf({ activePanelId: 'plugins' }), 'plugins');
  assert.equal(fixture.navigationCategoryOf({ activePanelId: 'codex-style-skills' }), 'skills');
  assert.equal(fixture.navigationCategoryOf({ activePanelId: 'schedules' }), 'tasks');
  assert.equal(fixture.navigationCategoryOf({ activePanelId: 'community-third-party' }), 'extension');
  assert.equal(fixture.navigationCategoryOf(null), 'home');
  // 侧栏区域：首页→市场→更多→后退（市场），侧栏回到首页，不残留「更多」菜单。
  const last = { current: 'home' };
  assert.equal(fixture.sidebarSectionOf('home', last, true), 'home');
  assert.equal(fixture.sidebarSectionOf('extension', last, true), 'home');
  assert.equal(fixture.sidebarSectionOf('more', last, true), 'more');
  assert.equal(fixture.sidebarSectionOf('extension', last, true), 'home');
  assert.equal(fixture.sidebarSectionOf('plugins', last, true), 'plugins');
  assert.equal(fixture.sidebarSectionOf('more', last, false), 'plugins');
});

// 社区版提醒：真实发行 bundle + 宿主生命周期桩，验证每次主 apply 至多一次、官方不显示、异步卸载安全。
function createElement(type, props, ...children) {
  const element = { type, props: { ...(props || {}) } };
  if (children.length) element.props.children = children.length === 1 ? children[0] : children;
  return element;
}
// 记录组件挂载时返回的 effect 清理函数，用于模拟 React 在重渲染/卸载时执行清理。
const pendingEffectCleanups = [];
const reactStub = {
  Component: class {},
  Fragment: 'Fragment',
  createElement,
  createPortal: element => element,
  useCallback: fn => fn,
  useEffect: fn => { const cleanup = fn(); if (typeof cleanup === 'function') pendingEffectCleanups.push(cleanup); return cleanup; },
  useLayoutEffect: fn => { const cleanup = fn(); if (typeof cleanup === 'function') pendingEffectCleanups.push(cleanup); return cleanup; },
  useMemo: fn => fn(),
  useRef: value => ({ current: value }),
  useState: value => [value, () => {}],
  useId: () => 'fixture-id',
  useSyncExternalStore: (subscribe, getSnapshot) => getSnapshot()
};
function renderElement(element) {
  let node = element;
  while (node && typeof node === 'object' && typeof node.type === 'function') node = node.type(node.props);
  return node;
}
async function communityFixture() {
  pendingEffectCleanups.length = 0;
  let plugin;
  const timers = new Map();
  const cleared = [];
  const document = { body: {} };
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return reactStub;
      if (name === 'react-dom') return { createPortal: element => element };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) };
      return {};
    });
  } }, localStorage: { getItem: () => null }, addEventListener() {}, removeEventListener() {} };
  new Script(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).runInNewContext({
    window, document, console: { warn() {}, error() {} },
    setTimeout: (fn, delay) => { const id = {}; timers.set(id, { fn, delay }); return id; },
    clearTimeout: id => { cleared.push(id); timers.delete(id); },
    setInterval: () => ({}), clearInterval() {}
  });
  return { plugin, timers, cleared };
}
async function communityActivation(reply) {
  const fixture = await communityFixture();
  const injections = [], slotInjections = [], entries = [];
  const slots = {
    inject: (name, factory) => slotInjections.push({ name, factory }),
    register: (options, component) => { entries.push({ options, component }); return () => {}; }
  };
  fixture.plugin.apply({ inject: (dependencies, callback) => injections.push({ dependencies, callback }), effect() {}, slots });
  const registration = slotInjections.find(row => row.name === 'shell.overlay');
  assert.ok(registration, 'community notice must register into shell.overlay');
  registration.factory();
  const noticeEntry = entries.find(entry => entry.options.id === 'codex-style:community-notice');
  assert.ok(noticeEntry, 'community notice component must be registered once');
  const scopeEntries = [], disposers = [], statusCalls = [];
  const scope = {
    remote: { codexStyleEnvironment: { status: () => { statusCalls.push(true); return reply; } } },
    slots: { inject: (name, factory) => scopeEntries.push({ name, factory }), register: (options, component) => { scopeEntries.push({ options, component }); return () => {}; } },
    effect: fn => { const dispose = fn(); disposers.push(dispose); return dispose; }
  };
  const injection = injections.find(row => row.dependencies.includes('remote.codexStyleEnvironment'));
  assert.ok(injection, 'community environment namespace must be injected');
  injection.callback(scope);
  const settle = async () => { for (let index = 0; index < 4; index++) await new Promise(setImmediate); };
  return { fixture, injection, scope, statusCalls, disposers, settle, render: () => renderElement(noticeEntry.component()) };
}

test('community activation shows one bottom-right notice and clears its timer', async () => {
  const activation = await communityActivation(Promise.resolve({ community: true }));
  await activation.settle();
  assert.equal(activation.statusCalls.length, 1);
  const notice = activation.render();
  assert.equal(notice.props.className, 'dsc-ui dsc-community-notice');
  assert.equal(notice.props.role, 'status');
  assert.equal(notice.props['aria-live'], 'polite');
  assert.match(notice.props.children.props.children, /社区版 DSH Desktop/);
  assert.equal(activation.fixture.timers.size, 1);
  const [timer] = [...activation.fixture.timers.values()];
  assert.equal(timer.delay, 6000);
  timer.fn();
  assert.equal(activation.render(), null);
  // 组件卸载/重渲染时 React 执行 effect 清理，必须 clearTimeout。
  const cleanup = pendingEffectCleanups.find(fn => typeof fn === 'function');
  assert.ok(cleanup, 'notice effect must expose a cleanup function');
  cleanup();
  assert.ok(activation.fixture.cleared.length >= 1);
});

test('official environment never renders the community notice', async () => {
  const activation = await communityActivation(Promise.resolve({ community: false }));
  await activation.settle();
  assert.equal(activation.statusCalls.length, 1);
  assert.equal(activation.render(), null);
  assert.equal(activation.fixture.timers.size, 0);
});

test('environment read failure stays silent instead of breaking activation', async () => {
  let rejectStatus;
  const reply = new Promise((resolve, reject) => { rejectStatus = reject; });
  const activation = await communityActivation(reply);
  rejectStatus(new Error('environment unavailable'));
  await activation.settle();
  assert.equal(activation.render(), null);
  assert.equal(activation.fixture.timers.size, 0);
});

test('late environment reply after activation disposal cannot show the notice', async () => {
  let resolveStatus;
  const reply = new Promise(resolve => { resolveStatus = resolve; });
  const activation = await communityActivation(reply);
  assert.equal(activation.render(), null);
  activation.disposers[0]();
  resolveStatus({ community: true });
  await activation.settle();
  assert.equal(activation.render(), null);
  assert.equal(activation.fixture.timers.size, 0);
});

test('every main activation shows at most one notice, including a re-run effect', async () => {
  const first = await communityActivation(Promise.resolve({ community: true }));
  await first.settle();
  const second = await communityActivation(Promise.resolve({ community: true }));
  await second.settle();
  assert.equal(first.statusCalls.length, 1);
  assert.equal(second.statusCalls.length, 1);
  const extraScope = { ...second.scope, effect: fn => { const dispose = fn(); second.disposers.push(dispose); return dispose; } };
  second.injection.callback(extraScope);
  await second.settle();
  assert.notEqual(first.render(), null);
  assert.notEqual(second.render(), null);
  assert.equal(second.fixture.timers.size, 1);
});

// DSH 本体更新：只转交 preload 的 status/subscribe/open，状态呈现与原生指示器一致。
async function desktopUpdateFixture() {
  let plugin;
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) };
      return {};
    });
  } }, localStorage: { getItem: () => null } };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).replace('    return module.exports;', 'module.exports.fixture = { createDesktopUpdateSource, desktopUpdateView }; return module.exports;');
  new Script(bundle).runInNewContext({ window, console: { warn() {}, error() {} } });
  return plugin.fixture;
}
function desktopCarrier(initial) {
  const listeners = new Set();
  const carrier = { protocolVersion: 1, updates: {
    opens: 0,
    status: async () => initial,
    open: async () => { carrier.updates.opens++; },
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); }
  } };
  return { carrier, push: state => listeners.forEach(listener => listener(state)), listeners };
}

test('desktop update source follows preload pushes and releases its subscription', async () => {
  const { createDesktopUpdateSource } = await desktopUpdateFixture();
  const source = createDesktopUpdateSource();
  assert.equal(source.start(undefined), undefined);
  assert.equal(source.start({ protocolVersion: 2, updates: {} }), undefined);
  assert.equal(source.store.getSnapshot().available, false);
  const fake = desktopCarrier({ phase: 'available', version: '0.2.2' });
  const stop = source.start(fake.carrier);
  await new Promise(setImmediate);
  assert.equal(source.store.getSnapshot().presentation.phase, 'available');
  fake.push({ phase: 'downloading', version: '0.2.2', percent: 42 });
  assert.equal(source.store.getSnapshot().presentation.percent, 42);
  stop();
  assert.equal(fake.listeners.size, 0);
  assert.equal(source.store.getSnapshot().available, false);
});

test('desktop update clicks reach the host only outside busy phases', async () => {
  const { createDesktopUpdateSource } = await desktopUpdateFixture();
  const source = createDesktopUpdateSource();
  const fake = desktopCarrier({ phase: 'ready', version: '0.2.2' });
  source.start(fake.carrier);
  await new Promise(setImmediate);
  source.open(); source.open();
  await new Promise(setImmediate);
  assert.equal(fake.carrier.updates.opens, 1);
  for (const phase of ['checking', 'downloading', 'verifying', 'installing']) { fake.push({ phase, percent: 10 }); source.open(); }
  await new Promise(setImmediate);
  assert.equal(fake.carrier.updates.opens, 1);
  fake.push({ phase: 'error', failure: 'download-network' });
  source.open();
  await new Promise(setImmediate);
  assert.equal(fake.carrier.updates.opens, 2);
});

test('desktop update view maps every phase to the rail glyph and hover copy', async () => {
  const { desktopUpdateView } = await desktopUpdateFixture();
  assert.equal(desktopUpdateView({ presentation: { phase: 'idle' } }), null);
  assert.equal(desktopUpdateView({}), null);
  assert.equal(desktopUpdateView({ presentation: { phase: 'available', version: '0.2.2' } }).kind, 'download');
  const progress = desktopUpdateView({ presentation: { phase: 'downloading', version: '0.2.2', percent: 42.7 } });
  assert.deepEqual([progress.kind, progress.percent, progress.label, progress.detail], ['progress', 42, '正在下载更新 42%', '目标版本 v0.2.2']);
  assert.equal(desktopUpdateView({ presentation: { phase: 'verifying' } }).kind, 'busy');
  assert.equal(desktopUpdateView({ presentation: { phase: 'ready', version: '0.2.2' } }).detail, 'v0.2.2 已下载，点击安装并重启');
  assert.equal(desktopUpdateView({ presentation: { phase: 'error', failure: 'tasks-changed' } }).detail, '有新任务开始运行，请重新确认是否停止任务并更新。');
  assert.equal(desktopUpdateView({ failed: true }).kind, 'error');
  assert.equal(desktopUpdateView({ presentation: { phase: 'available' }, opening: true }).kind, 'busy');
});
