import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

const source = await readFile(new URL('../src/sidebar-pins.js', import.meta.url), 'utf8');
function snapshot(value) {
  const listeners = new Set();
  return { getSnapshot: () => value, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    set(next) { value = next; for (const listener of [...listeners]) listener(); }, listenerCount: () => listeners.size };
}
function fixture() {
  const api = new Script(source + '\n({createSidebarPinAdapter,createSidebarPinMenu})').runInNewContext({
    createSnapshotStore: snapshot, console, queueMicrotask
  });
  const changed = new Set();
  let entries = [];
  const ctx = { slots: {
    entriesOfSlot(name) { assert.equal(name, 'sidebar'); return entries; },
    subscribe(name, listener) { assert.equal(name, 'sidebar'); changed.add(listener); return () => changed.delete(listener); }
  } };
  const adapter = api.createSidebarPinAdapter(ctx);
  return { adapter, api, setEntries(next) { entries = next; for (const listener of [...changed]) listener(); }, listenerCount: () => changed.size };
}
function nativeEntry() {
  const unpinned = snapshot([]);
  const calls = [];
  const setPinned = (id, pinned) => {
    calls.push([id, pinned]);
    const current = unpinned.getSnapshot();
    if (id === 'plugins' || pinned !== current.includes(id)) return;
    unpinned.set(pinned ? current.filter(value => value !== id) : [...current, id]);
  };
  // 真正 StoredEntry 把 inject 和 children 保留在顶层，options 只含排序/标签。
  const entry = { options: {}, children: { 'sidebar.panellist.actions': { kind: 'list' } },
    inject: () => ({ hooks: { entryPins: unpinned }, setPinned }) };
  return { entry, unpinned, calls };
}

test('sidebar pins reuse the real owner source for unpin and repin without a second state', () => {
  const f = fixture(), native = nativeEntry();
  f.setEntries([native.entry]);
  const stop = f.adapter.start();
  assert.equal(f.adapter.store.getSnapshot().available, true);
  native.entry.inject().setPinned('schedules', false);
  assert.deepEqual([...f.adapter.store.getSnapshot().unpinned], ['schedules']);
  f.adapter.setPinned('context', false);
  assert.deepEqual(native.unpinned.getSnapshot(), ['schedules', 'context']);
  f.adapter.setPinned('schedules', true);
  assert.deepEqual(native.unpinned.getSnapshot(), ['context']);
  assert.equal(f.adapter.store.getSnapshot().unpinned, native.unpinned.getSnapshot());
  assert.equal(f.adapter.canPin('plugins'), false);
  f.adapter.setPinned('plugins', false);
  assert.equal(native.calls.length, 3);
  stop();
  assert.equal(native.unpinned.listenerCount(), 0);
  assert.equal(f.listenerCount(), 0);
  assert.equal(f.adapter.store.getSnapshot().available, false);
});

test('sidebar replacement and unload detach the old owner and bind a late replacement', () => {
  const f = fixture(), first = nativeEntry(), next = nativeEntry();
  const stop = f.adapter.start();
  assert.equal(f.adapter.canPin('schedules'), false);
  f.setEntries([first.entry]);
  f.adapter.setPinned('schedules', false);
  f.setEntries([next.entry]);
  assert.equal(first.unpinned.listenerCount(), 0);
  assert.deepEqual([...f.adapter.store.getSnapshot().unpinned], []);
  first.unpinned.set(['stale']);
  assert.deepEqual([...f.adapter.store.getSnapshot().unpinned], []);
  f.adapter.setPinned('context', false);
  assert.deepEqual(next.unpinned.getSnapshot(), ['context']);
  f.setEntries([]);
  assert.equal(next.unpinned.listenerCount(), 0);
  assert.equal(f.adapter.canPin('context'), false);
  assert.throws(() => f.adapter.setPinned('context', true), /固定接口/);
  stop();
});

test('unsupported sidebar does not execute other registrations or manufacture pin state', () => {
  const f = fixture(), hidden = nativeEntry();
  let calls = 0;
  hidden.entry.inject = () => { calls++; return {}; };
  f.setEntries([{ options: {} }, hidden.entry]);
  const stop = f.adapter.start();
  assert.equal(calls, 0);
  assert.equal(f.adapter.store.getSnapshot().available, false);
  stop();
});

const chrome = await readFile(new URL('../src/chrome.js', import.meta.url), 'utf8');
function renderedFixture() {
  const pins = snapshot({ available: true, unpinned: ['schedules', 'context-b'] });
  const calls = [];
  const panels = [
    { id: 'plugins', label: '插件' }, { id: 'schedules', label: '自动化任务' },
    { id: 'context-a', label: '同名插件' }, { id: 'context-b', label: '同名插件' }
  ];
  const ctx = {
    layout: { panelInfo: snapshot({ activePanelId: 'codex-style-more' }), selectPanel: id => calls.push(['open', id]) },
    locale: snapshot('zh'), effect() {},
    slots: {
      entriesOfSlot(name) {
        if (name === 'main') return panels.map(row => ({ options: { key: row.id } }));
        if (name === 'sidebar.panellist') return panels.map(options => ({ options }));
        if (name === 'sidebar.panellist.actions') return [{ options: { id: 'entry-customization' } }];
        return [];
      }, getVersion: () => 1, subscribe: () => () => {}
    }
  };
  const sidebar = {
    store: snapshot({ collapsed: false, preview: null }), hide() {},
    pins: { store: pins, canPin: id => pins.getSnapshot().available && id !== 'plugins', setPinned(id, value) {
      calls.push(['pin', id, value]);
      pins.set({ available: true, unpinned: value ? pins.getSnapshot().unpinned.filter(key => key !== id) : [...pins.getSnapshot().unpinned, id] });
    } }, pinMenu: { open: entry => calls.push(['menu', entry.id]) }
  };
  const api = new Script(chrome + '\n({makeSidebarChrome,makeNavigationRail,useNavigationDirectory,openSidebarPinContext})').runInNewContext({
    h: (type, props, ...children) => ({ type, props: props || {}, children: children.flat() }),
    React: { Fragment: 'Fragment' }, createPortal: node => node,
    useSource: source => source.getSnapshot(), useMemo: fn => fn(), useCallback: fn => fn,
    useSyncExternalStore: (_, read) => read(), useRef: value => ({ current: value }), useState: value => [value, () => {}],
    useEffect() {}, useLayoutEffect() {}, document: { body: {} }, window: { innerWidth: 1200 },
    createSnapshotStore: snapshot, createSessionCompletionTracker: () => ({ start() {}, store: snapshot({}) }),
    makeWorkspaceTree: () => 'Tree', Icon: 'Icon', ErrorLine: 'ErrorLine', SidebarPinContextMenu: 'PinMenu',
    SKILLS_PANEL_ID: 'codex-style-skills', BRAND_MARK: '', errorText: String
  });
  const all = (node, predicate) => !node || typeof node !== 'object' ? [] : [
    ...(predicate(node) ? [node] : []), ...(node.children || []).flatMap(child => all(child, predicate))
  ];
  const renderMore = () => api.makeSidebarChrome(ctx, sidebar, {})();
  const renderRail = () => api.makeNavigationRail(ctx, sidebar)();
  return { api, ctx, sidebar, pins, calls, all, renderMore, renderRail };
}

test('More groups all eligible entries and toggles native pins independently of page navigation', () => {
  const f = renderedFixture();
  const rows = () => f.all(f.renderMore(), node => node.props.className === 'dsc-more-entry');
  const groupRows = label => f.all(f.all(f.renderMore(), node => node.props.className === 'dsc-more-group' && node.props['aria-label'] === label)[0], node => node.props.className === 'dsc-more-entry');
  assert.equal(rows().length, 3, 'permanently pinned plugins are excluded');
  assert.equal(groupRows('未固定').length, 2);
  assert.equal(groupRows('已固定').length, 1);
  assert.equal(f.all(f.renderRail(), node => node.props['data-dsc-preview-trigger'] === 'tasks').length, 0);
  assert.equal(f.api.useNavigationDirectory(f.ctx, f.sidebar).taskRows.length, 1, 'task page content remains available');
  const entries = groupRows('未固定');
  entries[1].children[0].props.onClick();
  assert.deepEqual(f.calls, [['open', 'context-b']]);
  entries[0].children[1].props.onClick({ stopPropagation() {} });
  assert.deepEqual(f.calls[1], ['pin', 'schedules', true]);
  assert.equal(f.calls.length, 2, 'pin action must not open the page');
  assert.equal(rows().length, 3);
  assert.equal(groupRows('未固定').length, 1);
  assert.equal(groupRows('已固定').length, 2);
  assert.equal(f.all(f.renderRail(), node => node.props['data-dsc-preview-trigger'] === 'tasks').length, 1);
  const pinned = groupRows('已固定')[0].children[1];
  assert.equal(pinned.props['aria-pressed'], true);
  assert.equal(pinned.children[0].props.fill, 'currentColor');
  pinned.props.onClick();
  assert.deepEqual(f.calls[2], ['pin', 'schedules', false]);
  assert.equal(f.calls.length, 3);
  assert.equal(groupRows('未固定').length, 2);
  assert.equal(groupRows('已固定').length, 1);
  assert.equal(f.all(f.renderRail(), node => node.props['data-dsc-preview-trigger'] === 'tasks').length, 0);
  assert.equal(groupRows('未固定')[0].children[1].props['aria-pressed'], false);
  assert.equal(groupRows('未固定')[0].children[1].children[0].props.fill, 'none');
  assert.ok(f.all(f.renderMore(), node => node.props.className === 'dsc-more-hint')[0].children.includes('也可右键导航图标快捷取消固定。'));
});

test('context operation targets the requested id and remains unavailable without the host adapter', () => {
  const f = renderedFixture();
  let prevented = 0;
  const event = { type: 'keydown', preventDefault() { prevented++; }, stopPropagation() {} };
  assert.equal(f.api.openSidebarPinContext(event, f.sidebar, { id: 'context-a', label: '同名插件' }, {}), true);
  assert.deepEqual(f.calls, [['menu', 'context-a']]);
  f.pins.set({ available: false, unpinned: [] });
  assert.equal(f.api.openSidebarPinContext(event, f.sidebar, { id: 'context-b', label: '同名插件' }, {}), false);
  assert.equal(prevented, 1);
});
