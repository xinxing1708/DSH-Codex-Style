import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const bundleUrl = new URL('../lib/client.js', import.meta.url);
const createSnapshotStore = initial => {
  let value = initial;
  const listeners = new Set();
  return {
    getSnapshot: () => value,
    set: next => { value = next; for (const listener of listeners) listener(); },
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); }
  };
};

// 运行实际发行 bundle，只取出历史控制器；DOM/slot 用最小 mock。
async function loadFixture() {
  let plugin;
  const sandbox = {
    console: { warn() {}, error() {} },
    queueMicrotask,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    localStorage: { getItem: () => null },
    getComputedStyle: () => ({ position: 'static' }),
    MutationObserver: class { observe() {} disconnect() {} },
    window: { innerWidth: 1024, addEventListener() {}, removeEventListener() {} }
  };
  const window = {
    __ModuleLoader__: {
      load: definition => {
        plugin = definition.factory(name => {
          if (name === 'react') return { Component: class {}, createElement: () => null, Fragment: 'fragment' };
          if (name === 'react-dom') return { createPortal: () => null };
          if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore };
          if (name === '@deepseek-ai/dsh-client-ui-primitives') return {};
          return {};
        });
      }
    }
  };
  sandbox.window = window;
  const source = (await readFile(bundleUrl, 'utf8')).replace('    return module.exports;',
    'module.exports.fixture = { createNavigationController, navigationRouteOf, sameNavigationRoute, restoreNavigationRoute, mountCodexNavigation, createNavigationTitlebarMarker, navigationCatalogKeys }; return module.exports;');
  new Script(source).runInNewContext(sandbox);
  return { fixture: plugin.fixture, sandbox };
}

const A = { panelId: null, sessionId: 'session-a' };
const B = { panelId: null, sessionId: 'session-b' };
const C = { panelId: 'plugins', sessionId: null };
const D = { panelId: 'schedules', sessionId: null };

function controllerFixture(fixture) {
  let current = null;
  let restoreResult = true;
  const failed = new Set();
  const throwing = new Set();
  const scheduled = [];
  const states = [];
  const restored = [];
  let reads = 0;
  const controller = fixture.createNavigationController({
    read: () => { reads++; return current; },
    restore: route => {
      restored.push(route);
      if (throwing.has(route)) throw new Error('fixture restore failure');
      if (!restoreResult || failed.has(route)) return false;
      current = route;
      return true;
    },
    schedule: callback => scheduled.push(callback),
    onState: state => states.push(state)
  });
  return {
    controller,
    states,
    scheduled,
    restored,
    readCount: () => reads,
    get current() { return current; },
    set current(value) { current = value; },
    setRestore(value) { restoreResult = value; },
    fail(route) { failed.add(route); },
    throwOn(route) { throwing.add(route); },
    flush() { while (scheduled.length) scheduled.shift()(); },
    move(route) { current = route; controller.refresh(); this.flush(); },
    settle(route) { current = route; }
  };
}

let loading;
const fixture = () => {
  loading ??= loadFixture();
  return loading;
};
const controllerFixtureFor = async () => controllerFixture((await fixture()).fixture);

test('A → B → C then back and forward move one entry per step', async () => {
  const h = await controllerFixtureFor();
  h.current = A;
  h.controller.refresh();
  h.flush();
  h.move(B);
  h.move(C);
  assert.deepEqual([...h.controller.getState().entries], [A, B, C]);
  assert.equal(h.controller.getState().canBack, true);
  assert.equal(h.controller.back(), true);
  h.flush();
  assert.equal(h.controller.getState().index, 1);
  assert.deepEqual(h.current, B);
  assert.equal(h.controller.getState().canForward, true);
  assert.equal(h.controller.forward(), true);
  h.flush();
  assert.equal(h.controller.getState().index, 2);
  assert.deepEqual(h.current, C);
});

test('a new navigation after back truncates the forward branch', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B); h.move(C);
  h.controller.back(); h.flush();
  assert.equal(h.controller.getState().index, 1);
  h.move(D);
  assert.deepEqual([...h.controller.getState().entries], [A, B, D]);
  assert.equal(h.controller.getState().canForward, false);
});

test('same panel ignores background session changes; no {null,null} target', async () => {
  const { navigationRouteOf } = (await fixture()).fixture;
  const sessions = { ids: ['a', 'b'], byId: { a: { retainedBy: { mainView: 1 } }, b: { retainedBy: { mainView: 2 } } } };
  const panelRoute = navigationRouteOf({ activePanelId: 'plugins' }, sessions);
  assert.equal(panelRoute.panelId, 'plugins');
  assert.equal(panelRoute.sessionId, null);
  const sessionRoute = navigationRouteOf({ activePanelId: null }, { ids: ['a'], byId: { a: { retainedBy: { mainView: 1 } } } });
  assert.equal(sessionRoute.panelId, null);
  assert.equal(sessionRoute.sessionId, 'a');
  assert.equal(navigationRouteOf({ activePanelId: null }, { ids: [], byId: {} }), null);
  const h = await controllerFixtureFor();
  h.current = C; h.controller.refresh(); h.flush();
  h.settle(C);
  h.controller.refresh(); h.flush();
  assert.equal(h.controller.getState().entries.length, 1);
  assert.equal(h.controller.back(), false);
});

test('restore validates live sessions and registered panels before applying', async () => {
  const { fixture: api } = await fixture();
  const { restoreNavigationRoute } = api;
  const panels = ['plugins'];
  const ctx = {
    beginCount: 0,
    selected: [],
    opened: [],
    layout: {
      beginNavigation() { ctx.beginCount++; return { aborted: false }; },
      selectPanel(id) { if (!panels.includes(id)) throw new Error('missing main panel'); ctx.selected.push(id); }
    },
    slots: { entriesOfSlot: () => panels.map(key => ({ options: { key } })) },
    sessions: { list: { getSnapshot: () => ({ ids: ['live'], byId: { live: { retainedBy: { mainView: 1 } } } }) } },
    uiWorkspace: { openSession(id) { ctx.opened.push(id); } }
  };
  assert.equal(restoreNavigationRoute(ctx, { panelId: null, sessionId: 'gone' }), false);
  assert.equal(restoreNavigationRoute(ctx, { panelId: 'missing', sessionId: null }), false);
  assert.deepEqual(ctx.selected, []);
  assert.equal(restoreNavigationRoute(ctx, { panelId: 'plugins', sessionId: null }), true);
  assert.deepEqual(ctx.selected, ['plugins']);
  assert.equal(restoreNavigationRoute(ctx, { panelId: null, sessionId: 'live' }), true);
  assert.deepEqual(ctx.opened, ['live']);
  assert.equal(ctx.beginCount, 4);
});

test('failed restore records the actual page instead of a fake position', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B);
  h.setRestore(false);
  h.current = D;
  assert.equal(h.controller.back(), false);
  h.flush();
  assert.deepEqual([...h.controller.getState().entries], [A, B, D]);
  assert.equal(h.controller.getState().index, 2);
});

test('successful restore commits once and never pushes a duplicate', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B);
  assert.equal(h.controller.back(), true);
  h.flush();
  assert.deepEqual([...h.controller.getState().entries], [A, B]);
  assert.equal(h.controller.getState().index, 0);
  assert.equal(h.controller.back(), false);
});

test('same-turn store notifications merge into one microtask', async () => {
  const h = await controllerFixtureFor();
  h.current = A;
  h.controller.refresh();
  h.controller.refresh();
  h.controller.refresh();
  assert.equal(h.scheduled.length, 1);
  assert.equal(h.readCount(), 0);
  h.flush();
  assert.equal(h.controller.getState().entries.length, 1);
  assert.equal(h.readCount(), 1);
});

test('dispose cancels the pending microtask', async () => {
  const h = await controllerFixtureFor();
  h.current = A;
  h.controller.refresh();
  const before = h.states.length;
  h.controller.dispose();
  h.flush();
  assert.equal(h.states.length, before);
  assert.equal(h.controller.getState().entries.length, 0);
});

test('back and forward skip stale targets in the same direction', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B); h.move(C);
  h.fail(B);
  assert.equal(h.controller.back(), true);
  h.flush();
  assert.equal(h.controller.getState().index, 0);
  assert.deepEqual(h.current, A);
  assert.deepEqual(h.restored.slice(0, 2), [B, A]);
  assert.equal(h.controller.forward(), true);
  h.flush();
  assert.equal(h.controller.getState().index, 2);
  assert.deepEqual(h.current, C);
  assert.deepEqual(h.restored.slice(2), [B, C]);
});

test('all stale targets leave position and history unchanged', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B); h.move(C);
  h.fail(A); h.fail(B);
  assert.equal(h.controller.back(), false);
  h.flush();
  const state = h.controller.getState();
  assert.equal(state.index, 2);
  assert.equal(state.entries.length, 3);
  assert.deepEqual(h.current, C);
});

test('restore errors skip to the next target without faking position', async () => {
  const h = await controllerFixtureFor();
  h.current = A; h.controller.refresh(); h.flush();
  h.move(B); h.move(C);
  h.throwOn(B);
  assert.equal(h.controller.back(), true);
  h.flush();
  assert.equal(h.controller.getState().index, 0);
  assert.deepEqual(h.current, A);
});

function mountFixture() {
  const styles = new Set();
  const attributes = new Map();
  const subscriptions = { layout: 0, sessions: 0 };
  const entries = [];
  const commands = [];
  const disposed = [];
  const document = {
    createElement: () => {
      const node = { dataset: {}, textContent: '', remove() { styles.delete(node); } };
      return node;
    },
    head: { appendChild: node => styles.add(node) },
    body: {
      getAttribute: key => (attributes.has(key) ? '' : null),
      setAttribute: (key, value) => attributes.set(key, value === undefined ? '' : value),
      removeAttribute: key => attributes.delete(key)
    },
    documentElement: { hasAttribute: () => false },
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const observable = value => ({ getSnapshot: () => value, subscribe: () => () => {} });
  const ctx = {
    effect(handler) { let dispose; dispose = handler(); return () => { dispose?.(); }; },
    slots: {
      inject(name, callback) { const dispose = callback(); return () => { dispose?.(); }; },
      register(options) { entries.push(options); return () => { disposed.push(options.id); }; }
    },
    layout: {
      panelInfo: observable({ activePanelId: null }),
      beginNavigation() { return { aborted: false }; },
      selectPanel() {}
    },
    sessions: { list: observable({ ids: ['a'], byId: { a: { retainedBy: { mainView: 1 } } } }) },
    uiWorkspace: { openSession() {} },
    shortcuts: {
      catalog: observable([]),
      register(command) {
        commands.push(command);
        return () => { const index = commands.indexOf(command); if (index >= 0) commands.splice(index, 1); };
      }
    }
  };
  return { ctx, document, styles, attributes, subscriptions, entries, commands, disposed };
}

test('mount wires commands, styles and slot, then disposes everything', async () => {
  const { fixture: api, sandbox } = await fixture();
  const dom = mountFixture();
  sandbox.document = dom.document;
  const dispose = api.mountCodexNavigation(dom.ctx);
  assert.equal(dom.styles.size, 1);
  assert.equal(dom.attributes.has('data-dsc-codex-navigation'), true);
  assert.equal(dom.commands.length, 2);
  assert.deepEqual(dom.commands.map(command => command.id).sort(), ['codex-style.navigation.back', 'codex-style.navigation.forward']);
  for (const command of dom.commands) {
    assert.deepEqual(Object.keys(command.defaults).sort(), ['desktop:linux', 'desktop:macos', 'desktop:windows']);
    assert.deepEqual([...command.regions], ['page', 'editable']);
    assert.equal(command.resolve({ modal: 'settings' }).status, 'pass');
    assert.equal(command.resolve({ modal: null }).status, 'handled');
  }
  assert.equal(dom.entries.length, 1);
  assert.equal(dom.entries[0].id, 'codex-style:navigation');
  assert.equal(dom.attributes.get('data-dsc-codex-navigation'), '');
  dispose();
  assert.equal(dom.styles.size, 0);
  assert.equal(dom.attributes.has('data-dsc-codex-navigation'), false);
  assert.equal(dom.commands.length, 0);
  assert.ok(dom.disposed.includes('codex-style:navigation'));
});

test('catalog keys stay empty when a command is unbound', async () => {
  const { fixture: api } = await fixture();
  const back = 'codex-style.navigation.back';
  assert.deepEqual([...api.navigationCatalogKeys([], back)], []);
  assert.deepEqual([...api.navigationCatalogKeys([{ id: back, keys: [] }], back)], []);
  assert.deepEqual([...api.navigationCatalogKeys([{ id: back, keys: ['Alt', '+', '['] }], back)], ['Alt', '+', '[']);
  assert.deepEqual([...api.navigationCatalogKeys([{ id: 'other.command', keys: ['X'] }], back)], []);
});

test('titlebar marker measures before marking and restores on dispose', async () => {
  const { fixture: api, sandbox } = await fixture();
  const events = [];
  const makeNode = (name, { position = 'static', rect = { top: 0, left: 0 } } = {}) => {
    const attributes = new Map();
    const node = {
      name,
      attributes,
      __position: position,
      __rect: rect,
      __children: new Set(),
      hasAttribute(key) { return attributes.has(key); },
      getAttribute(key) { return attributes.has(key) ? attributes.get(key) : null; },
      setAttribute(key, value) { events.push('mark:' + name + ':' + key); attributes.set(key, value); },
      removeAttribute(key) { events.push('unmark:' + name + ':' + key); attributes.delete(key); },
      getBoundingClientRect() { events.push('measure:' + name); return rect; },
      contains(other) { return node.__children.has(other); }
    };
    return node;
  };
  const toggle = makeNode('toggle', { position: 'fixed', rect: { top: 6, left: 12 } });
  const newSession = makeNode('newSession', { position: 'fixed', rect: { top: 6, left: 48 } });
  const row = makeNode('row');
  row.__children.add(newSession);
  const sidebar = { querySelectorAll: () => [toggle, newSession] };
  sandbox.document = {
    documentElement: { hasAttribute: name => name === 'data-windows-titlebar' },
    querySelector: selector => selector === '[data-slot="sidebar"]' ? sidebar : selector === '[data-slot="sidebar"] [data-window-drag]' ? row : null,
    querySelectorAll: () => []
  };
  sandbox.getComputedStyle = element => ({ position: element.__position });
  const marker = api.createNavigationTitlebarMarker();
  marker.start();
  const firstMark = events.findIndex(event => event.startsWith('mark:'));
  const measures = events.map((event, index) => event.startsWith('measure:') ? index : -1).filter(index => index >= 0);
  assert.ok(measures.length >= 2);
  assert.ok(firstMark > measures[measures.length - 1], 'measurements must finish before any mark');
  assert.ok(row.hasAttribute('data-dsc-navigation-titlebar-row'));
  assert.ok(toggle.hasAttribute('data-dsc-navigation-native-toggle'));
  assert.equal(newSession.hasAttribute('data-dsc-navigation-native-shift'), false);
  marker.dispose();
  for (const node of [row, toggle, newSession]) for (const key of ['data-dsc-navigation-titlebar-row', 'data-dsc-navigation-native-toggle', 'data-dsc-navigation-native-shift']) assert.equal(node.hasAttribute(key), false);
  // 本机 preload 菜单的 role=menubar 在 Shadow DOM 内，只能从 host 锚点定位。
  const menuHost = makeNode('windowsMenu');
  sandbox.document.querySelector = selector => selector === '[data-windows-menu]' ? menuHost : selector === '[data-slot="sidebar"]' ? sidebar : null;
  const nativeMarker = api.createNavigationTitlebarMarker();
  nativeMarker.start();
  assert.ok(menuHost.hasAttribute('data-dsc-navigation-menubar'));
  assert.ok(newSession.hasAttribute('data-dsc-navigation-native-shift'));
  nativeMarker.dispose();
  assert.equal(menuHost.hasAttribute('data-dsc-navigation-menubar'), false);
  assert.equal(newSession.hasAttribute('data-dsc-navigation-native-shift'), false);
});
