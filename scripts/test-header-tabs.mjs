import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

// 直接加载实际发行 bundle，只注入测试导出；不复制产品实现。
async function fixture() {
  let plugin;
  const window = {
    __ModuleLoader__: { load: definition => { plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; }, subscribe: () => () => {} }) };
      return {};
    }); } },
    localStorage: { getItem: () => null },
    addEventListener() {}, removeEventListener() {}
  };
  const document = {
    body: { getAttribute: () => null, setAttribute() {}, removeAttribute() {} },
    head: { appendChild() {} },
    createElement: () => ({ dataset: {}, remove() {} }),
    documentElement: { hasAttribute: () => false },
    querySelector: () => null,
    querySelectorAll: () => []
  };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).replace(
    '    return module.exports;',
    '    module.exports.fixture = { viewRowPlan, viewSliderBox, createConversationHeaderPresenter, HEADER_CSS_TEXT }; return module.exports;'
  );
  assert.notEqual(bundle, await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'));
  new Script(bundle, { filename: 'dsh-codex-style/client.js' }).runInNewContext({
    window, document, console: { warn() {}, error() {} }, queueMicrotask,
    setTimeout, clearTimeout, requestAnimationFrame: () => 1, cancelAnimationFrame() {}, getComputedStyle: () => ({ position: 'static' })
  });
  return plugin.fixture;
}

function fakeNode({ tag = 'div', attrs = {}, rect = { left: 0, top: 0, width: 0, height: 0 }, children = [], style = {} } = {}) {
  const attributes = new Map(Object.entries(attrs));
  const properties = new Map(Object.entries(style).map(([name, value]) => [name, [String(value), '']]));
  const box = {
    left: rect.left, top: rect.top, width: rect.width, height: rect.height,
    right: rect.right ?? rect.left + rect.width,
    bottom: rect.bottom ?? rect.top + rect.height
  };
  const node = {
    nodeType: 1, tagName: tag.toUpperCase(), isConnected: true, children, parentElement: null,
    getAttribute: name => (attributes.has(name) ? attributes.get(name) : null),
    setAttribute: (name, value) => { attributes.set(name, String(value)); },
    removeAttribute: name => { attributes.delete(name); },
    hasAttribute: name => attributes.has(name),
    getBoundingClientRect: () => box,
    style: {
      getPropertyValue: name => (properties.get(name)?.[0] ?? ''),
      getPropertyPriority: name => (properties.get(name)?.[1] ?? ''),
      setProperty: (name, value, priority = '') => { properties.set(name, [String(value), priority]); },
      removeProperty: name => { properties.delete(name); }
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    attributes
  };
  for (const child of children) child.parentElement = node;
  return node;
}

function presenterFixture() {
  const buttons = [
    fakeNode({ tag: 'button', attrs: { role: 'tab', 'aria-selected': 'true' }, rect: { left: 24, top: 30, width: 40, height: 20 } }),
    fakeNode({ tag: 'button', attrs: { role: 'tab', 'aria-selected': 'false' }, rect: { left: 64, top: 30, width: 40, height: 20 } }),
    fakeNode({ tag: 'button', attrs: { role: 'tab', 'aria-selected': 'false' }, rect: { left: 104, top: 30, width: 52, height: 20 } }),
    fakeNode({ tag: 'button', attrs: { role: 'tab', 'aria-selected': 'false' }, rect: { left: 156, top: 30, width: 40, height: 20 } })
  ];
  const actionButtons = [
    fakeNode({ tag: 'button', rect: { left: 14, top: 40, width: 86, height: 28 } }),
    fakeNode({ tag: 'button', rect: { left: 100, top: 40, width: 100, height: 28 } }),
    fakeNode({ tag: 'button', rect: { left: 200, top: 40, width: 120, height: 28 } }),
    fakeNode({ tag: 'button', rect: { left: 320, top: 40, width: 40, height: 28 } })
  ];
  const header = fakeNode({ tag: 'header', rect: { left: 0, top: 0, width: 848, height: 73 } });
  header.clientWidth = 848;
  header.__computed = { paddingLeft: '14px', paddingRight: '14px', borderLeftWidth: '0px' };
  const corner = fakeNode({ attrs: { 'data-conversation-header-corner': '' } });
  const row = fakeNode({});
  const navigation = fakeNode({ tag: 'nav', attrs: { 'aria-label': '会话层级' } });
  const titleCluster = fakeNode({});
  const title = fakeNode({ tag: 'span' });
  const actionsSlot = fakeNode({ attrs: { 'data-slot': 'conversation.session.header.actions' } });
  const actions = fakeNode({ children: actionButtons });
  actionsSlot.parentElement = actions;
  const utilitiesSlot = fakeNode({ attrs: { 'data-slot': 'conversation.session.header.utilities' } });
  const utilities = fakeNode({});
  utilitiesSlot.parentElement = utilities;
  const opener = fakeNode({ attrs: { 'data-open-target': 'directory' } });
  const openerWrap = fakeNode({ children: [opener] });
  opener.parentElement = openerWrap;
  const tabs = fakeNode({ attrs: { 'data-conversation-tabs': '' }, rect: { left: 20, top: 30, width: 200, height: 28 }, style: { '--dsc-view-count': '9' } });
  tabs.__computed = { borderLeftWidth: '1px' };
  tabs.querySelectorAll = selector => (selector === '[role="tab"]' ? buttons : []);
  const viewRow = fakeNode({ children: [tabs] });
  tabs.parentElement = viewRow;
  corner.parentElement = row;
  navigation.parentElement = titleCluster;
  title.parentElement = navigation;
  navigation.lastElementChild = title;
  row.querySelector = selector => {
    if (selector === 'nav[aria-label]') return navigation;
    if (selector === '[data-slot="conversation.session.header.actions"]') return actionsSlot;
    if (selector === '[data-slot="conversation.session.header.utilities"]') return utilitiesSlot;
    if (selector === '[data-slot="conversation.session.header.utilities"] [data-open-target="directory"]') return opener;
    return null;
  };
  header.querySelector = selector => {
    if (selector === '[data-conversation-header-corner]') return corner;
    if (selector === '[data-conversation-tabs]') return tabs;
    return null;
  };
  row.parentElement = header;
  const frames = [];
  const observers = [];
  class FakeMutationObserver {
    constructor(callback) { this.callback = callback; this.connected = true; observers.push(this); }
    observe() {}
    disconnect() { this.connected = false; }
  }
  class FakeResizeObserver {
    constructor(callback) { this.callback = callback; this.connected = true; observers.push(this); }
    observe() {}
    unobserve() {}
    disconnect() { this.connected = false; }
  }
  const window = {
    getComputedStyle: node => node.__computed || {},
    requestAnimationFrame: callback => { frames.push(callback); return frames.length; },
    cancelAnimationFrame: id => { frames[id - 1] = null; },
    addEventListener() {}, removeEventListener() {}
  };
  const document = { fonts: undefined };
  const presenter = fixture().then(plugin => plugin.createConversationHeaderPresenter({
    header, window, document, MutationObserver: FakeMutationObserver, ResizeObserver: FakeResizeObserver
  }));
  return { presenter, header, row, tabs, viewRow, actions, utilities, corner, navigation, title, buttons, frames, observers };
}

test('viewRowPlan lets the host render views while the capsule fits the real free space', async () => {
  const { viewRowPlan } = await fixture();
  const wide = viewRowPlan({ contentWidth: 1052, actionsWidth: 554, narrow: false });
  assert.equal(wide.mode, 'inline');
  assert.equal(wide.width, 1052); // 行宽取内容宽，宿主按自身预算尽量多渲染
  assert.equal(wide.capsule, 450); // 1052 - 554 - 8 - 40
  assert.equal(Math.floor((wide.width - 48) / 120), 8);
  const capped = viewRowPlan({ contentWidth: 500, actionsWidth: 20, narrow: false });
  assert.equal(capped.mode, 'inline');
  assert.equal(capped.width, 500);
  assert.equal(capped.capsule, 432);
  const tight = viewRowPlan({ contentWidth: 392, actionsWidth: 554, narrow: false });
  assert.equal(tight.mode, 'stacked');
  assert.equal(tight.width, 392);
  assert.equal(tight.capsule, null);
  assert.equal(viewRowPlan({ contentWidth: 190, actionsWidth: 60, narrow: false }).mode, 'inline');
  assert.equal(viewRowPlan({ contentWidth: 180, actionsWidth: 60, narrow: false }).mode, 'stacked');
  assert.equal(viewRowPlan({ contentWidth: 640, actionsWidth: 0, narrow: true }).mode, 'stacked');
  assert.equal(viewRowPlan({ contentWidth: 0, actionsWidth: 0, narrow: false }), null);
  assert.equal(viewRowPlan({ contentWidth: 800, actionsWidth: Number.NaN, narrow: false }).mode, 'inline');
});

test('viewSliderBox maps a tab rect into the tablist padding box', async () => {
  const { viewSliderBox } = await fixture();
  const regular = viewSliderBox({ tabsLeft: 100, tabsBorderLeft: 1, tabLeft: 111, tabWidth: 45 });
  assert.equal(regular.left, 10);
  assert.equal(regular.width, 45);
  const clamped = viewSliderBox({ tabsLeft: 100, tabsBorderLeft: 1, tabLeft: 99, tabWidth: -3 });
  assert.equal(clamped.left, 0);
  assert.equal(clamped.width, 0);
});

test('header presenter marks public anchors and measures row/slider geometry', async t => {
  const f = presenterFixture();
  const presenter = await f.presenter;
  t.after(() => presenter.dispose());
  assert(f.header.hasAttribute('data-dsc-conversation-header'));
  assert(f.row.hasAttribute('data-dsc-header-title-row'));
  assert(f.tabs.hasAttribute('data-dsc-view-switch'));
  assert(f.viewRow.hasAttribute('data-dsc-header-view-row'));
  assert(f.actions.hasAttribute('data-dsc-header-actions'));
  assert(f.utilities.hasAttribute('data-dsc-header-utilities'));
  assert(f.corner.hasAttribute('data-dsc-header-corner'));
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-count'), '4');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-index'), '0');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-active'), '1');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-left'), '3.00px');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-width'), '40.00px');
  assert.equal(f.viewRow.style.getPropertyValue('--dsc-view-row-width'), '820px');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-max-width'), '426px');
  assert.equal(f.header.hasAttribute('data-dsc-header-views-own-row'), false);
});

test('header presenter follows selection, hides when none, and releases on dispose', async t => {
  const f = presenterFixture();
  const presenter = await f.presenter;
  t.after(() => presenter.dispose());
  for (const button of f.buttons) button.setAttribute('aria-selected', 'false');
  f.buttons[1].setAttribute('aria-selected', 'true');
  await new Promise(resolve => setImmediate(resolve));
  // MutationObserver 回调由真实宿主触发；这里直接调用呈现器同步，验证同一路径。
  presenter.sync();
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-index'), '1');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-left'), '43.00px');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-width'), '40.00px');
  for (const button of f.buttons) button.setAttribute('aria-selected', 'false');
  presenter.sync();
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-active'), '0');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-width'), '0px');
  presenter.dispose();
  assert.equal(f.header.hasAttribute('data-dsc-conversation-header'), false);
  assert.equal(f.tabs.hasAttribute('data-dsc-view-switch'), false);
  assert.equal(f.viewRow.hasAttribute('data-dsc-header-view-row'), false);
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-count'), '9');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-left'), '');
  assert.equal(f.viewRow.style.getPropertyValue('--dsc-view-row-width'), '');
  assert.equal(f.tabs.style.getPropertyValue('--dsc-view-max-width'), '');
});
