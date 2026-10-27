// 页面前进后退（独立可选组件）：只使用公开 layout.panelInfo、sessions.list、
// uiWorkspace.openSession、slots 与 shortcuts。非宿主原生导航；历史仅本次运行内存，
// 不持久化，不恢复设置弹窗、页面子状态或滚动位置。
const NAVIGATION_BACK_ID = 'codex-style.navigation.back';
const NAVIGATION_FORWARD_ID = 'codex-style.navigation.forward';
const NAVIGATION_NATIVE_SHIFT = '68px';
const NAVIGATION_EMPTY = { entries: [], index: -1, canBack: false, canForward: false, busy: false };
// 后退/前进是直杆箭头；侧栏按钮继续使用现有按钮。
const NAVIGATION_BACK_PATH = 'M12 8H3 M7 4 3 8l4 4';
const NAVIGATION_FORWARD_PATH = 'M4 8h9 M9 4l4 4-4 4';

// 会话 route 为 {panelId:null, sessionId}；主面板 route 为 {panelId, sessionId:null}，
// 主面板期间不记录后台会话，避免后台会话变化制造同一面板的假历史。
// 无主会话空态是 {null,null}，公开面无法清除已有会话，故不记录、不作为可返回目标。
function navigationRouteOf(panelInfo, sessions) {
  if (!panelInfo) return null;
  const panelId = panelInfo.activePanelId === undefined ? null : panelInfo.activePanelId;
  if (panelId !== null) return { panelId, sessionId: null };
  const ids = sessions && Array.isArray(sessions.ids) ? sessions.ids : null;
  const byId = sessions && sessions.byId ? sessions.byId : null;
  if (!ids || !byId) return null;
  for (const id of ids) {
    const retained = byId[id] && byId[id].retainedBy;
    if (((retained && retained.mainView) || 0) > 0) return { panelId: null, sessionId: id };
  }
  return null;
}

function sameNavigationRoute(left, right) {
  return left !== null && right !== null && left.panelId === right.panelId && left.sessionId === right.sessionId;
}

function navigationRouteKey(route) {
  if (route === null) return '';
  return route.panelId === null ? 'session:' + route.sessionId : 'panel:' + route.panelId;
}

// 纯内存历史模型：同一轮通知合并到一次微任务；首次稳定快照为 base；
// 同页去重；后退后新导航截断 forward；恢复期间 busy 防连点。
function createNavigationController({ read, restore, schedule = queueMicrotask, onState = () => {} }) {
  let entries = [];
  let index = -1;
  let pending = false;
  let base = false;
  let busy = false;
  let disposed = false;
  const state = () => ({
    entries: entries.slice(),
    index,
    canBack: index > 0,
    canForward: index >= 0 && index < entries.length - 1,
    busy
  });
  const publish = () => { if (!disposed) onState(state()); };
  const observe = () => {
    const route = read();
    if (route === null) return;
    if (!base) {
      base = true;
      entries = [route];
      index = 0;
      return;
    }
    if (sameNavigationRoute(route, entries[index])) return;
    entries = entries.slice(0, index + 1);
    entries.push(route);
    index = entries.length - 1;
  };
  const flush = () => {
    if (disposed) return;
    pending = false;
    observe();
    busy = false;
    publish();
  };
  const refresh = () => {
    if (disposed || pending) return;
    pending = true;
    schedule(flush);
  };
  // 沿同方向跳过不可恢复目标：最近可恢复者优先；全部失效时保持位置，
  // 由下一轮读取按实际页面记录，不伪造位置，也不新增历史。
  const move = direction => {
    if (disposed || busy || direction === 0) return false;
    let target = index + direction;
    if (target < 0 || target >= entries.length) return false;
    busy = true;
    let moved = false;
    while (target >= 0 && target < entries.length) {
      let restored = false;
      try { restored = restore(entries[target]) !== false; } catch (_error) { restored = false; }
      if (restored) { index = target; moved = true; break; }
      target += direction;
    }
    refresh();
    publish();
    return moved;
  };
  return {
    refresh,
    observe,
    getState: state,
    back: () => move(-1),
    forward: () => move(1),
    dispose() {
      disposed = true;
      pending = false;
      entries = [];
      index = -1;
      busy = false;
    }
  };
}

// 恢复目标前先使宿主旧的异步新建导航失效；校验会话仍存在、panels 仍注册。
function restoreNavigationRoute(ctx, route) {
  if (route === null) return false;
  try { ctx.layout.beginNavigation(); } catch (_error) { /* 旧宿主没有该动作时仍可恢复 */ }
  const panels = typeof ctx.slots.entriesOfSlot === 'function' ? ctx.slots.entriesOfSlot('main') : ctx.slots.entries('main');
  if (route.panelId === null) {
    const sessions = ctx.sessions.list.getSnapshot();
    if (!route.sessionId || !(sessions.byId && sessions.byId[route.sessionId])) return false;
    ctx.uiWorkspace.openSession(route.sessionId);
    return true;
  }
  if (!panels.some(entry => entry && entry.options && entry.options.key === route.panelId)) return false;
  try { ctx.layout.selectPanel(route.panelId); } catch (_error) { return false; }
  return true;
}

// catalog 是键位的唯一真源：命令存在但未绑定/被取消/冲突时 keys 为空，
// 提示不显示键位胶囊；catalog 尚未就绪时同样不猜默认组合。
function navigationCatalogKeys(catalog, id) {
  if (!Array.isArray(catalog)) return [];
  const row = catalog.find(entry => entry && entry.id === id);
  return row && Array.isArray(row.keys) ? row.keys : [];
}

function NavigationShortcutChip({ label }) {
  return h('span', { className: 'dsc-nav-tooltip__key', 'aria-hidden': true }, label);
}

// 悬停/聚焦提示：深灰圆角，近窗口左边 8px 防越界，按钮下 2–4px；键位读 shortcuts.catalog。
function NavigationTooltip({ id, label, keys, left, top }) {
  const width = 8 + label.length * 13 + keys.length * 20;
  const x = Math.max(8, Math.min(left, (typeof window !== 'undefined' ? window.innerWidth : 1024) - width - 8));
  return createPortal(h('div', {
    className: 'dsc-ui dsc-nav-tooltip', role: 'tooltip', 'data-navigation-tip': id,
    style: { left: x, top: top + 3 }
  }, h('span', null, label), h('span', { className: 'dsc-nav-tooltip__keys' }, keys.map((key, position) => key === '+'
    ? h('span', { key: 'plus-' + position, className: 'dsc-nav-tooltip__plus', 'aria-hidden': true }, '+')
    : h(NavigationShortcutChip, { key: key + '-' + position, label: key })))), document.body);
}

function makeNavigationControls(ctx, controls, controller) {
  return function NavigationControls() {
    const state = useSource(controls);
    const catalog = useSource(ctx.shortcuts.catalog);
    const [tip, setTip] = useState(null);
    const anchors = useRef({ back: null, forward: null });
    const backKeys = navigationCatalogKeys(catalog, NAVIGATION_BACK_ID);
    const forwardKeys = navigationCatalogKeys(catalog, NAVIGATION_FORWARD_ID);
    const buttons = [
      { id: 'back', label: '返回', path: NAVIGATION_BACK_PATH, keys: backKeys, enabled: state.canBack, run: () => controller.back() },
      { id: 'forward', label: '前进', path: NAVIGATION_FORWARD_PATH, keys: forwardKeys, enabled: state.canForward, run: () => controller.forward() }
    ];
    const shown = tip !== null && state.entries.length > 0 ? tip : null;
    return createPortal(h(React.Fragment, null,
      h('div', { className: 'dsc-ui dsc-nav-controls', role: 'group', 'aria-label': '页面历史' }, buttons.map(button => h('button', {
        key: button.id, type: 'button', ref: node => { anchors.current[button.id] = node; },
        className: 'dsc-nav-button', 'aria-label': button.label, 'aria-disabled': button.enabled ? undefined : 'true',
        'data-navigation-button': button.id,
        onPointerEnter: () => setTip(button.id), onPointerLeave: () => setTip(null),
        onFocus: () => setTip(button.id), onBlur: () => setTip(null),
        onClick: () => { if (button.enabled) { setTip(null); button.run(); } }
      }, h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: button.path }))))),
      shown !== null && (() => {
        const button = buttons.find(item => item.id === shown);
        const anchor = anchors.current[shown];
        const box = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : { left: 8, bottom: 36 };
        return h(NavigationTooltip, { id: shown, label: button.label, keys: button.keys, left: box.left, top: box.bottom });
      })()), document.body);
  };
}

// Windows 应用菜单在 preload 创建的 [data-windows-menu] Shadow host 内；
// 只移动 host，菜单内部和弹出坐标仍由宿主持有。其它宿主再尝试 role=menubar / 标题栏行。
// 原生固定侧栏按钮按位置区分：左侧 28px 的切换键由自绘按钮替代（隐藏），新会话按钮右移。
// 只给最小宿主节点加自有 data-* 并还原；不改 DOM、不读 hashed class。
function createNavigationTitlebarMarker() {
  const saved = [];
  let observer = null;
  let timer = 0;
  let disposed = false;
  const mark = (element, name) => {
    if (!element || element.hasAttribute(name)) return;
    saved.push([element, name, element.getAttribute(name)]);
    element.setAttribute(name, '');
  };
  const restore = () => {
    for (const [element, name, previous] of saved.reverse()) {
      if (previous === null) element.removeAttribute(name); else element.setAttribute(name, previous);
    }
    saved.length = 0;
  };
  const apply = () => {
    if (disposed) return;
    timer = 0;
    if (typeof document === 'undefined' || !document.documentElement || !document.documentElement.hasAttribute('data-windows-titlebar')) return;
    // 先清掉上一轮标记并在无 transform 的布局下完成全部测量与分类，
    // 再统一写标记；避免祖先 transform 改变 fixed 包含块后误判原生按钮。
    restore();
    const pending = [];
    const menubar = document.querySelector('[data-windows-menu]') || document.querySelector('[role="menubar"]');
    const row = menubar ? null : document.querySelector('[data-slot="sidebar"] [data-window-drag]');
    const shifted = menubar || row;
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    const buttons = sidebar && typeof sidebar.querySelectorAll === 'function' ? [...sidebar.querySelectorAll('button')] : [];
    const classified = [];
    for (const button of buttons) {
      const style = typeof getComputedStyle === 'function' ? getComputedStyle(button) : null;
      if (!style || style.position !== 'fixed') continue;
      const box = button.getBoundingClientRect ? button.getBoundingClientRect() : { top: 0, left: 0 };
      if (box.top >= 48) continue;
      // 左侧窄按钮由自绘切换键替代；其余固定按钮右移。
      // 已随被标记祖先移动的按钮不再单独标记，避免同一行与其子按钮双移。
      if (box.left < 40) classified.push([button, 'data-dsc-navigation-native-toggle']);
      else if (!shifted || typeof shifted.contains !== 'function' || !shifted.contains(button)) classified.push([button, 'data-dsc-navigation-native-shift']);
    }
    if (menubar) pending.push([menubar, 'data-dsc-navigation-menubar']);
    else if (row) pending.push([row, 'data-dsc-navigation-titlebar-row']);
    pending.push(...classified);
    for (const [element, name] of pending) mark(element, name);
  };
  const schedule = () => {
    if (disposed || timer) return;
    timer = requestAnimationFrame(apply);
  };
  const start = () => {
    let attemptsLeft = 60;
    const retry = () => {
      if (disposed) return;
      timer = 0;
      apply();
      attemptsLeft--;
      if (typeof document !== 'undefined' && !document.querySelector('[data-slot="sidebar"]') && attemptsLeft > 0) { timer = requestAnimationFrame(retry); return; }
      const frameElement = typeof document !== 'undefined' ? document.querySelector('[data-dsc-frame]') : null;
      if (frameElement && typeof MutationObserver === 'function') {
        observer = new MutationObserver(schedule);
        observer.observe(frameElement, { attributes: true, attributeFilter: ['data-sidebar-collapsed'] });
      }
      if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', schedule);
    };
    retry();
  };
  return {
    start,
    dispose() {
      disposed = true;
      if (timer) { cancelAnimationFrame(timer); timer = 0; }
      if (observer) { observer.disconnect(); observer = null; }
      if (typeof window !== 'undefined' && window.removeEventListener) window.removeEventListener('resize', schedule);
      restore();
    }
  };
}

function registerNavigationShortcuts(ctx, controller) {
  const make = (id, label, code, run) => ctx.shortcuts.register({
    id, label: () => label, aliases: [],
    // 仅声明 Desktop 三个 profile；Web 不声明该绑定（宿主 Web 白名单不接受单修饰 Bracket）。
    defaults: {
      'desktop:macos': { code, modifiers: ['primary'] },
      'desktop:windows': { code, modifiers: ['primary'] },
      'desktop:linux': { code, modifiers: ['primary'] }
    },
    regions: ['page', 'editable'], modals: [],
    resolve: context => context && context.modal ? { status: 'pass' } : { status: 'handled', run }
  });
  const disposeBack = make(NAVIGATION_BACK_ID, '返回', 'BracketLeft', () => controller.back());
  const disposeForward = make(NAVIGATION_FORWARD_ID, '前进', 'BracketRight', () => controller.forward());
  return () => { disposeBack(); disposeForward(); };
}

function mountCodexNavigation(ctx) {
  const controls = createSnapshotStore(NAVIGATION_EMPTY);
  const controller = createNavigationController({
    read: () => navigationRouteOf(ctx.layout.panelInfo.getSnapshot(), ctx.sessions.list.getSnapshot()),
    restore: route => restoreNavigationRoute(ctx, route),
    schedule: callback => queueMicrotask(callback),
    onState: state => {
      const previous = controls.getSnapshot();
      if (previous.canBack === state.canBack && previous.canForward === state.canForward && previous.busy === state.busy && previous.index === state.index && previous.entries.length === state.entries.length) return;
      controls.set(state);
    }
  });
  const disposeEffect = ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.dscCodexNavigation = '';
    style.textContent = typeof NAVIGATION_CSS_TEXT === 'string' ? NAVIGATION_CSS_TEXT : '';
    document.head.appendChild(style);
    const body = document.body;
    const previous = body.getAttribute('data-dsc-codex-navigation');
    body.setAttribute('data-dsc-codex-navigation', '');
    const unsubscribeLayout = ctx.layout.panelInfo.subscribe(() => controller.refresh());
    const unsubscribeSessions = ctx.sessions.list.subscribe(() => controller.refresh());
    const marker = createNavigationTitlebarMarker();
    const disposeShortcuts = registerNavigationShortcuts(ctx, controller);
    marker.start();
    controller.refresh();
    return () => {
      controller.dispose();
      disposeShortcuts();
      marker.dispose();
      unsubscribeSessions();
      unsubscribeLayout();
      if (previous === null) body.removeAttribute('data-dsc-codex-navigation'); else body.setAttribute('data-dsc-codex-navigation', previous);
      style.remove();
      controls.set(NAVIGATION_EMPTY);
    };
  }, 'codex-style: optional navigation history');
  const NavigationControls = makeNavigationControls(ctx, controls, controller);
  const disposeSlot = ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:navigation' }, NavigationControls));
  return () => {
    disposeSlot();
    disposeEffect();
  };
}
