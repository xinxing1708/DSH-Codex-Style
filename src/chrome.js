// 保留官方 sidebar/settings/composer 的所有者；导航在 shell.overlay 独立挂载。
// 二级侧栏复用同一内容与真实动作；收起态只改变呈现方式，不导航或展开宿主列。
const DEFAULT_SIDEBAR_WIDTH = 288;
// 「更多」是插件自有 main 面板；与技能页同模式，点击即切换布局页面，
// 历史、右侧内容与轨道高亮全部由 activePanelId 推导，不再使用侧栏局部状态。
const MORE_PANEL_ID = 'codex-style-more';

// 0.2.1-rc.2/rc.3 的 root store handle.create() 返回 AppFrame 已持有的同一布局实例。
// 仅将启动/重新展开时的默认值 280 改为 288；真实 grid、分隔条和宽度变量仍由宿主计算。
function initializeSidebarWidth(ctx) {
  const entry = ctx.slots.entriesOfSlot('root')[0];
  const store = entry?.store?.create();
  if (!store?.actions?.setSidebar || !store.getSnapshot().layoutInfo) {
    console.warn('codex-style: 当前 root 未提供已核实的侧栏宽度动作');
    return;
  }
  let previous = store.getSnapshot().layoutInfo.sidebar;
  let owned = false;
  const sync = initial => {
    const width = store.getSnapshot().layoutInfo.sidebar;
    const reopening = previous === 0 && width === 280;
    if (width !== previous) owned = false;
    previous = width;
    if (width !== 280 || (!initial && !reopening)) return;
    // 先更新本地记录，避免 setSidebar 的同步通知被误认为用户拖动。
    previous = DEFAULT_SIDEBAR_WIDTH;
    owned = true;
    store.actions.setSidebar(DEFAULT_SIDEBAR_WIDTH);
  };
  const unsubscribe = store.subscribe(() => sync(false));
  sync(true);
  return () => {
    // 卸载时只恢复本次仍在生效的默认值；保留用户后续拖动值和 0px 收起态。
    unsubscribe();
    if (owned && store.getSnapshot().layoutInfo.sidebar === DEFAULT_SIDEBAR_WIDTH) store.actions.setSidebar(280);
  };
}

function PrototypeIcon({ name, className = '' }) {
  return h('span', { className: 'dsc-proto-icon ' + className, 'aria-hidden': true, dangerouslySetInnerHTML: { __html: PROTOTYPE_ICONS[name] } });
}
function useSlotVersion(ctx, names) {
  const axis = names.join('|');
  const subscribe = useCallback(listener => {
    const disposers = names.map(name => ctx.slots.subscribe(name, listener));
    return () => disposers.forEach(dispose => dispose());
  }, [ctx, axis]);
  const snapshot = useCallback(() => names.map(name => ctx.slots.getVersion(name)).join(':'), [ctx, axis]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
function usePanelDirectory(ctx) {
  const version = useSlotVersion(ctx, ['main', 'sidebar.panellist']);
  const locale = useSource(ctx.locale);
  return useMemo(() => {
    const mains = new Set(ctx.slots.entriesOfSlot('main').map(entry => entry.options.key));
    return ctx.slots.entriesOfSlot('sidebar.panellist').map(({ options }) => ({
      id: options.id, order: options.order ?? 0,
      label: (typeof options.label === 'function' ? options.label() : options.label) ?? options.id,
      available: mains.has(options.id)
    })).sort((a, b) => a.order - b.order);
  }, [ctx, version, locale]);
}
// 导航分类只由当前 main 面板决定；「更多」注册为真实面板后与其他页面同源。
function navigationCategoryOf(panel) {
  const activePanelId = panel === null || panel === undefined || panel.activePanelId === undefined ? null : panel.activePanelId;
  if (activePanelId === MORE_PANEL_ID) return 'more';
  if (activePanelId === null) return 'home';
  if (activePanelId === 'plugins') return 'plugins';
  if (activePanelId === SKILLS_PANEL_ID) return 'skills';
  if (activePanelId === 'schedules') return 'tasks';
  return 'extension';
}
// 侧栏二级区域：第三方页沿用最近的常规区域；「更多」只在它自己的页面显示，
// 从「更多」后退到第三方页时不残留「更多」菜单。
function sidebarSectionOf(category, last, hasMore) {
  if (category !== 'extension' && category !== 'more') last.current = category;
  return category === 'more' && hasMore ? 'more' : last.current;
}
function useNavigationDirectory(ctx, sidebar) {
  const panel = useSource(ctx.layout.panelInfo);
  const panels = usePanelDirectory(ctx);
  const moreVersion = useSlotVersion(ctx, ['sidebar.panellist.actions']);
  const hasMore = useMemo(() => ctx.slots.entriesOfSlot('sidebar.panellist.actions').some(entry => entry.options.id === 'entry-customization'), [ctx, moreVersion]);
  // 官方分组只按已核实的 main id 识别；社区入口的名称不能决定它属于自定义。
  const pluginRows = panels.filter(row => row.available && row.id === 'plugins').concat([{ id: SKILLS_PANEL_ID, order: 90, label: '技能', available: true }]);
  const taskRows = panels.filter(row => row.available && row.id === 'schedules');
  const category = navigationCategoryOf(panel);
  return { panel, panels, pluginRows, taskRows, category, hasMore };
}

// 原 sidebar entry 拥有 panellist 的 renderSlot 授权。保留原按钮、图标及注入，
// 仅以公开 slot 锚点定位原 nav，给第三方行添加可释放标记并用 CSS 呈现在轨道中。
// 不复制 component、不借用私有 renderer、不搬移 React 所拥有的 DOM。
function useNativeExtensionNavigation(sidebar, target, panels) {
  useLayoutEffect(() => {
    const host = document.querySelector('[data-slot="sidebar"]');
    if (!host || !target.current) return;
    const attributes = new Map();
    const properties = new Map();
    let nav;
    let frame;
    const mark = (node, name, value) => {
      let saved = attributes.get(node);
      if (!saved) attributes.set(node, saved = new Map());
      if (!saved.has(name)) saved.set(name, node.getAttribute(name));
      if (value === null) node.removeAttribute(name);
      else if (node.getAttribute(name) !== value) node.setAttribute(name, value);
    };
    const property = (node, name, value) => {
      let saved = properties.get(node);
      if (!saved) properties.set(node, saved = new Map());
      if (!saved.has(name)) saved.set(name, [node.style.getPropertyValue(name), node.style.getPropertyPriority(name)]);
      node.style.setProperty(name, value);
    };
    const hidePreview = () => sidebar.hide();
    const followNative = () => sidebar.hide();
    const detach = () => {
      nav?.removeEventListener('pointerenter', hidePreview);
      nav?.removeEventListener('focusin', hidePreview);
      nav?.removeEventListener('click', followNative, true);
    };
    const sync = () => {
      frame = undefined;
      const glyphs = [...host.querySelectorAll('[data-slot="sidebar.panellist"]')];
      const buttons = glyphs.map(glyph => glyph.closest('button'));
      // rc.3 可在「更多」中取消固定，真实行因而只是目录的子集；保留原生固定状态。
      const rows = buttons.map((button, i) => {
        if (!button) return null;
        const label = button.getAttribute('aria-label');
        if (buttons.length === panels.length && panels[i]?.label === label) return panels[i];
        const retained = panels.find(row => row.id === button.getAttribute('data-dsc-extension-row') && row.label === label);
        if (retained) return retained;
        const matches = panels.filter(row => row.label === label);
        return matches.length === 1 ? matches[0] : null;
      });
      // 同名或提交时序不同的行保留原生入口，不让单行识别失败隐藏整个导航。
      if (!buttons.length || buttons.some(button => !button)) return;
      const nextNav = buttons[0].closest('nav');
      if (!nextNav || buttons.some(button => button.closest('nav') !== nextNav)) return;
      if (nextNav !== nav) {
        detach();
        nav = nextNav;
        nav.addEventListener('pointerenter', hidePreview);
        nav.addEventListener('focusin', hidePreview);
        nav.addEventListener('click', followNative, true);
      }
      mark(nav, 'data-dsc-extension-nav', '');
      buttons.forEach((button, i) => {
        const row = rows[i];
        const extension = !row || (row.available && row.id !== 'plugins' && row.id !== 'schedules');
        mark(button, 'data-dsc-extension-row', row?.id ?? '');
        mark(button, 'data-dsc-extension-hidden', extension ? null : '');
        if (!extension) return;
        mark(button, 'title', row?.label ?? button.getAttribute('aria-label'));
        const glyph = glyphs[i].parentElement;
        mark(glyph, 'data-dsc-extension-glyph', '');
        [...button.children].filter(child => child !== glyph).forEach(child => mark(child, 'data-dsc-extension-label', ''));
      });
      // rc.3「更多」由自有导航与二级侧栏呈现；隐藏旧入口，原宿主注册与生命周期继续保留。
      for (const button of nav.querySelectorAll('button[aria-haspopup="menu"]')) {
        if (button.querySelector('[data-slot="sidebar.panellist"]')) continue;
        mark(button, 'data-dsc-extension-hidden', '');
      }
      const box = target.current.getBoundingClientRect();
      property(nav, '--dsc-extension-left', box.left + 'px');
      property(nav, '--dsc-extension-top', box.top + 'px');
      property(nav, '--dsc-extension-width', box.width + 'px');
      property(nav, '--dsc-extension-height', Math.max(0, box.height) + 'px');
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(sync); };
    const content = new MutationObserver(schedule);
    content.observe(host, { childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label'], subtree: true });
    const size = new ResizeObserver(schedule);
    size.observe(target.current);
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      content.disconnect(); size.disconnect();
      window.removeEventListener('resize', schedule);
      detach();
      for (const [node, saved] of attributes) for (const [name, value] of saved) {
        if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
      }
      for (const [node, saved] of properties) for (const [name, [value, priority]] of saved) {
        if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
      }
    };
  }, [sidebar, target, panels]);
}

// 导航与二级侧栏共享呈现状态；悬停计时不调用 layout，也不发起模型请求。
function createSidebarPresentation() {
  const store = createSnapshotStore({ collapsed: true, preview: null });
  let opening;
  let closing;
  const cancel = () => { clearTimeout(opening); clearTimeout(closing); };
  const hide = () => { cancel(); if (store.getSnapshot().preview !== null) store.set({ ...store.getSnapshot(), preview: null }); };
  const show = category => {
    cancel();
    if (store.getSnapshot().collapsed) store.set({ ...store.getSnapshot(), preview: category });
  };
  return {
    store, hide, show, hold: cancel, dispose: cancel,
    setCollapsed(collapsed) {
      if (store.getSnapshot().collapsed === collapsed) return;
      cancel();
      store.set({ ...store.getSnapshot(), collapsed, preview: null });
    },
    enter(category) {
      cancel();
      if (!store.getSnapshot().collapsed || store.getSnapshot().preview === category) return;
      opening = setTimeout(() => show(category), category === 'home' ? 300 : 100);
    },
    leave() {
      cancel();
      closing = setTimeout(hide, 140);
    }
  };
}

// 点击「更多」= 选中插件自有 main 面板；失败只回显错误，不改变当前页面。
function openMorePanel(ctx, sidebar, setError) {
  setError('');
  sidebar.hide();
  try { ctx.layout.selectPanel(MORE_PANEL_ID); } catch (e) { setError(errorText(e)); return false; }
  if (sidebar.store.getSnapshot().collapsed) ctx.layout.toggleSidebar();
  return true;
}

function makeNavigationRail(ctx, sidebar) {
  return function NavigationRail() {
    const { panels, pluginRows, taskRows, category, hasMore } = useNavigationDirectory(ctx, sidebar);
    const { collapsed, preview } = useSource(sidebar.store);
    const [error, setError] = useState('');
    const extensions = useRef(null);
    useNativeExtensionNavigation(sidebar, extensions, panels);
    const pick = id => {
      sidebar.hide();
      setError('');
      try { ctx.layout.selectPanel(id); } catch (e) { setError(errorText(e)); }
    };
    const openMore = () => { openMorePanel(ctx, sidebar, setError); };
    const item = (id, name, icon, action, active) => h('button', {
      key: id, type: 'button', className: 'dsc-rail__item' + ((active === true || category === id) ? ' dsc-rail__item--active' : ''),
      title: collapsed ? undefined : name, 'data-tip': name, 'data-dsc-preview-trigger': id, 'data-preview-enabled': collapsed,
      'aria-label': name, 'aria-current': (active === true || category === id) ? 'page' : undefined,
      'aria-haspopup': collapsed ? 'dialog' : undefined, 'aria-expanded': collapsed ? preview === id : undefined,
      'aria-controls': collapsed ? 'dsc-sidebar-card' : undefined,
      onPointerEnter: e => { if (e.pointerType !== 'touch') sidebar.enter(id); }, onPointerLeave: sidebar.leave,
      onFocus: () => sidebar.enter(id), onBlur: sidebar.leave,
      onKeyDown: e => { if (e.key === 'Escape') { sidebar.hide(); e.preventDefault(); } }, onClick: action
    }, icon === 'more' ? h(Icon, { name: 'more', size: 20 }) : h(PrototypeIcon, { name: icon }));
    return createPortal(h(React.Fragment, null,
      h('nav', { className: 'dsc-ui dsc-rail dsc-independent-rail', 'aria-label': '主导航' },
        item('home', '首页', 'home', () => pick(null)),
        taskRows.length > 0 && item('tasks', '定时任务', 'tasks', () => pick(taskRows[0].id)),
        pluginRows.length > 0 && item('plugins', '自定义', 'plugins', () => pick(pluginRows.some(row => row.id === 'plugins') ? 'plugins' : SKILLS_PANEL_ID), category === 'skills'),
        hasMore && item('more', '更多', 'more', openMore),
        h('div', { ref: extensions, className: 'dsc-extension-navigation-anchor', 'aria-hidden': true })),
      error && h('div', { className: 'dsc-ui dsc-navigation-error' }, h(ErrorLine, { text: error }))), document.body);
  };
}

// 「更多」main 页面：只是深色空白正文；入口动作全部在左侧二级菜单。
function MoreMain() {
  return h('div', { className: 'dsc-ui dsc-more-page', 'aria-label': '更多' });
}

// 面板无条件注册；侧栏「更多」入口的显示仍由原宿主 entry-customization 判定。
function registerMorePage(ctx) {
  return ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: MORE_PANEL_ID }, function MoreMainPage() {
    return h(MoreMain);
  }));
}

function makeSidebarChrome(ctx, sidebar) {
  const completions = createSessionCompletionTracker(ctx);
  ctx.effect(() => completions.start(), 'codex-style: unread session completions');
  ctx.effect(() => registerMorePage(ctx), 'codex-style: more page');
  const Tree = makeWorkspaceTree(ctx, completions.store);
  return function SidebarChrome() {
    const { panel, pluginRows, taskRows, category: selectedCategory, hasMore } = useNavigationDirectory(ctx, sidebar);
    const { collapsed, preview } = useSource(sidebar.store);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [geometry, setGeometry] = useState(null);
    const marker = useRef(null);
    const insidePointer = useRef(null);
    const lastWidth = useRef(DEFAULT_SIDEBAR_WIDTH);
    const lastSection = useRef('home');
    const section = sidebarSectionOf(selectedCategory, lastSection, hasMore);
    const presentation = useRef({ category: section, mode: 'docked' });
    const search = useRef(null);
    const searchAnchor = useRef(null);
    useLayoutEffect(() => {
      const column = marker.current?.closest('[data-slot="sidebar"]')?.parentElement;
      const frame = column?.parentElement;
      if (!column || !frame) return;
      const measure = () => {
        const isCollapsed = frame.hasAttribute('data-sidebar-collapsed');
        const box = column.getBoundingClientRect();
        const targetWidth = parseFloat(getComputedStyle(frame).getPropertyValue('--dsh-windows-sidebar-width')) || box.width;
        if (!isCollapsed && targetWidth >= 264) lastWidth.current = targetWidth;
        // 退场仍保留完整内容宽度；不让宿主收起的 0px 列裁掉淡出过程。
        setGeometry({ left: box.left, top: box.top, height: box.height, width: lastWidth.current });
        sidebar.setCollapsed(isCollapsed);
      };
      measure();
      const size = new ResizeObserver(measure);
      size.observe(column);
      const state = new MutationObserver(measure);
      state.observe(frame, { attributes: true, attributeFilter: ['data-sidebar-collapsed'] });
      window.addEventListener('resize', measure);
      return () => { size.disconnect(); state.disconnect(); window.removeEventListener('resize', measure); };
    }, []);
    // 第三方直接打开原 main，保留最近的二级区域，不给它再造一层目录。
    const visibleCategory = collapsed ? preview : section;
    const shown = geometry !== null && visibleCategory !== null;
    if (shown) presentation.current = { category: visibleCategory, mode: collapsed ? 'floating' : 'docked' };
    const { category, mode } = presentation.current;
    useEffect(() => { if (shown && searchOpen && category === 'home') search.current?.focus(); }, [shown, searchOpen, category]);
    useEffect(() => {
      if (!collapsed || !preview) return;
      const outside = e => {
        // React 的 capture 会沿 portal 祖先传播，项目菜单/详情卡也属于侧栏。
        if (insidePointer.current !== e && !e.target.closest?.('[data-dsc-preview-trigger]')) sidebar.hide();
      };
      const blur = () => sidebar.hide();
      const escape = e => { if (e.key === 'Escape' && !e.defaultPrevented) { sidebar.hide(); e.preventDefault(); } };
      document.addEventListener('pointerdown', outside);
      document.addEventListener('keydown', escape);
      window.addEventListener('blur', blur);
      return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); window.removeEventListener('blur', blur); };
    }, [collapsed, preview]);
    const run = async action => { setError(''); try { await action(); } catch (e) { setError(errorText(e)); } };
    const pick = id => run(() => { ctx.layout.selectPanel(id); sidebar.hide(); });
    const moreAction = action => run(() => {
      action();
      sidebar.hide();
    });
    const openSearch = () => { if (collapsed) sidebar.show('home'); else pick(null); setSearchOpen(true); };
    const closeSearch = () => { setSearchOpen(false); setQuery(''); searchAnchor.current?.focus(); };
    const pageRows = category === 'tasks' ? taskRows : pluginRows;
    const inset = mode === 'floating' ? 4 : 0;
    const style = geometry ? { left: geometry.left + inset, top: geometry.top + inset, width: Math.min(geometry.width, Math.max(0, window.innerWidth - geometry.left - inset - 8)), height: Math.max(0, geometry.height - inset * 2) } : { visibility: 'hidden' };
    const shell = h('div', {
      ref: node => { if (node) node.inert = !shown; }, id: 'dsc-sidebar-card', className: 'dsc-ui dsc-sidebar-shell', style,
      'data-mode': mode, 'data-section': category, 'data-open': shown, 'aria-hidden': !shown,
      role: mode === 'floating' ? 'dialog' : undefined, 'aria-label': mode === 'floating' ? (category === 'home' ? '首页侧栏' : category === 'tasks' ? '定时任务侧栏' : category === 'more' ? '更多侧栏' : category === 'skills' ? '技能侧栏' : '自定义侧栏') : undefined,
      onPointerEnter: sidebar.hold, onPointerLeave: sidebar.leave,
      onPointerDownCapture: e => { insidePointer.current = e.nativeEvent; },
      onFocusCapture: sidebar.hold, onBlurCapture: sidebar.leave,
      onKeyDown: e => { if (collapsed && e.key === 'Escape' && !e.defaultPrevented) { sidebar.hide(); e.preventDefault(); } }
    },
      h('aside', { key: category, className: 'dsc-sidebar', 'aria-label': category === 'home' ? '项目与对话' : category === 'tasks' ? '定时任务' : category === 'more' ? '更多' : category === 'skills' ? '技能' : '自定义' },
        h('div', { className: 'dsc-sidebar__header' }, category === 'home' ? h('div', { className: 'dsc-brand' }, h('img', { className: 'dsc-brand__mark', src: BRAND_MARK, alt: '' }), h('span', { className: 'dsc-brand__wordmark' }, 'deepseek'), h('span', { className: 'dsc-brand__badge' }, 'HARNESS')) : h('strong', { className: 'dsc-section-page-title' }, category === 'tasks' ? '定时任务' : category === 'more' ? '更多' : '自定义'),
          h('div', { className: 'dsc-sidebar__header-actions' }, h('button', { type: 'button', ref: searchAnchor, className: 'dsc-icon-button', title: '搜索对话与项目', 'aria-label': '搜索对话与项目', 'aria-expanded': searchOpen, onClick: openSearch }, h(Icon, { name: 'search' })))),
        category === 'home' && h('button', { type: 'button', className: 'dsc-new-chat', title: '新聊天', onClick: () => { setSearchOpen(false); setQuery(''); run(() => { ctx.uiWorkspace.startSession(); sidebar.hide(); }); } }, h(PrototypeIcon, { name: 'newChat' }), h('span', null, '新聊天')),
        category === 'home' && searchOpen && h('label', { className: 'dsc-search dsc-sidebar-search' }, h(Icon, { name: 'search' }), h('input', { ref: search, value: query, onChange: e => setQuery(e.target.value), onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); closeSearch(); } }, placeholder: '搜索标题或项目', 'aria-label': '搜索标题或项目' }), h('button', { type: 'button', onClick: closeSearch, 'aria-label': '关闭搜索' }, '×')),
        h(ErrorLine, { text: error }),
        category === 'home' ? h(Tree, { query, tools: false, active: shown, onNavigate: sidebar.hide }) : category === 'more' ? h('div', { className: 'dsc-secondary-nav' },
          h('button', { type: 'button', className: 'dsc-secondary-item', onClick: () => moreAction(() => ctx.pluginNavigation.openList()) }, h(PrototypeIcon, { name: 'plugins' }), '浏览更多插件'),
          h('button', { type: 'button', className: 'dsc-secondary-item', onClick: () => moreAction(() => ctx.uiWorkspace.startSession(undefined, { agentPreset: 'cordis', prompt: ctx.locale.bind('entryCustomization')('createPrompt.sidebar'), whenDraftExists: 'append' })) }, h(Icon, { name: 'plus' }), '创建你的插件'))
          : h('div', { className: 'dsc-secondary-nav' }, pageRows.map(row => h('button', { key: row.id, type: 'button', className: 'dsc-secondary-item' + (row.id === panel.activePanelId ? ' is-active' : ''), 'aria-current': row.id === panel.activePanelId ? 'page' : undefined, onClick: () => pick(row.id) }, h(Icon, { name: category === 'tasks' ? 'tasks' : row.id === SKILLS_PANEL_ID ? 'skill' : 'plugins' }), row.label)))));
    return h(React.Fragment, null, h('span', { ref: marker, 'aria-hidden': true }), createPortal(shell, document.body));
  };
}

function makeShellChrome(ctx, sidebar) {
  const Navigation = makeNavigationRail(ctx, sidebar);
  const Toggle = makeSidebarToggle(ctx);
  return function ShellChrome() {
    const marker = useRef(null);
    useLayoutEffect(() => {
      // 0.2.1-rc.2/rc.3 的窄适配：由公开 overlay/slot 锚点找到它们所属的列，
      // 外壳仅增加插件标记；宽度通过已有布局动作初始化，不改写 grid 或搬移 DOM。
      const overlay = marker.current?.closest('[data-shell-overlay]');
      const frame = overlay?.parentElement;
      if (!frame) return;
      const saved = [];
      const mark = (element, name, value = '') => {
        if (!element) return;
        saved.push([element, name, element.getAttribute(name)]);
        element.setAttribute(name, value);
      };
      mark(document.body, 'data-dsh-codex-chrome', PLUGIN_VERSION);
      mark(frame, 'data-dsc-frame');
      mark(frame.querySelector('[data-slot="sidebar"]')?.parentElement, 'data-dsc-sidebar-column');
      mark(frame.querySelector('[data-slot="main"]')?.parentElement, 'data-dsc-center-column');
      const restoreWidth = initializeSidebarWidth(ctx);
      return () => {
        restoreWidth?.();
        saved.reverse().forEach(([element, name, previous]) => {
          if (previous === null) element.removeAttribute(name); else element.setAttribute(name, previous);
        });
      };
    }, []);
    return h(React.Fragment, null, h('span', { ref: marker, hidden: true }), h(Navigation), h(Toggle));
  };
}

// 此常驻入口不替换 AppFrame，也不修改系统标题栏；collapsed 时仍可重新打开侧栏。
function makeSidebarToggle(ctx) {
  return function SidebarToggle() {
    return createPortal(h('div', { className: 'dsc-ui dsc-window-sidebar-toggle' }, h('button', { type: 'button', className: 'dsc-icon-button', title: '显示或隐藏侧边栏', 'aria-label': '显示或隐藏侧边栏', onClick: () => ctx.layout.toggleSidebar() }, h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, 'aria-hidden': true }, h('rect', { x: 2, y: 3, width: 12, height: 10, rx: 1.5 }), h('path', { d: 'M6 3v10' })))), document.body);
  };
}

// 公开的会话头 leading 座负责留位；仅收起二级侧栏时显示，不覆盖标题。
// 保留原生头部、视图按钮和子槽所有权，仅从公开锚点添加可释放的布局标记。
function useConversationHeaderChrome(marker, enabled) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const header = marker.current?.closest('header');
    if (!header) return;
    const attributes = new Map();
    const properties = new Map();
    const restore = (element, saved) => {
      for (const [name, value] of saved) {
        if (value === null) element.removeAttribute(name); else element.setAttribute(name, value);
      }
    };
    const sync = () => {
      const touched = new Set();
      const mark = (element, name) => {
        if (!element) return;
        touched.add(element);
        let saved = attributes.get(element);
        if (!saved) attributes.set(element, saved = new Map());
        if (!saved.has(name)) saved.set(name, element.getAttribute(name));
        if (!element.hasAttribute(name)) element.setAttribute(name, '');
      };
      const corner = header.querySelector('[data-conversation-header-corner]');
      const row = corner?.parentElement;
      const tabs = header.querySelector('[data-conversation-tabs]');
      if (row && corner) {
        mark(header, 'data-dsc-conversation-header');
        mark(row, 'data-dsc-header-title-row');
        const navigation = row.querySelector('nav[aria-label]');
        mark(navigation?.parentElement, 'data-dsc-header-title-cluster');
        mark(navigation, 'data-dsc-header-navigation');
        // 末项是当前标题容器；只标记它，祖先面包屑按钮与操作保持原样。
        mark(navigation?.lastElementChild, 'data-dsc-header-title');
        mark(row.querySelector('[data-slot="conversation.session.header.actions"]')?.parentElement, 'data-dsc-header-actions');
        mark(row.querySelector('[data-slot="conversation.session.header.utilities"]')?.parentElement, 'data-dsc-header-utilities');
        mark(row.querySelector('[data-slot="conversation.session.header.utilities"] [data-open-target="directory"]')?.parentElement, 'data-dsc-header-open-in-app');
        mark(corner, 'data-dsc-header-corner');
      }
      if (tabs) {
        mark(tabs, 'data-dsc-view-switch');
        // rc.2 的 tablist 本身是行；rc.3 的父行还拥有原生更多视图菜单。
        if (tabs.parentElement !== header && tabs.parentElement?.getAttribute('data-slot') !== 'conversation.session.header') mark(tabs.parentElement, 'data-dsc-header-view-row');
        const buttons = [...tabs.querySelectorAll('[role="tab"]')];
        const active = buttons.findIndex(button => button.getAttribute('aria-selected') === 'true');
        if (!properties.has(tabs)) properties.set(tabs, new Map(['--dsc-view-count', '--dsc-view-index', '--dsc-view-active'].map(name => [name, [tabs.style.getPropertyValue(name), tabs.style.getPropertyPriority(name)]])));
        for (const [name, value] of [['--dsc-view-count', Math.max(1, buttons.length)], ['--dsc-view-index', Math.max(0, active)], ['--dsc-view-active', active >= 0 ? 1 : 0]]) {
          if (tabs.style.getPropertyValue(name) !== String(value)) tabs.style.setProperty(name, value);
        }
      }
      for (const [element, saved] of attributes) if (!touched.has(element)) { restore(element, saved); attributes.delete(element); }
      for (const [element, saved] of properties) if (element !== tabs) {
        for (const [name, [value, priority]] of saved) { if (value) element.style.setProperty(name, value, priority); else element.style.removeProperty(name); }
        properties.delete(element);
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(header, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
    return () => {
      observer.disconnect();
      for (const [element, saved] of attributes) restore(element, saved);
      for (const [element, saved] of properties) for (const [name, [value, priority]] of saved) {
        if (value) element.style.setProperty(name, value, priority); else element.style.removeProperty(name);
      }
    };
  }, [marker, enabled]);
}

// 工作区归属只读宿主公开数据：sessions.list 的 retainedBy.mainView 定位当前会话，
// Summary 的 cwd 与官方 ConversationContent 同一读取路径；workspaces.items 的
// sessionIds 是多引用权威归属。多引用时仅用 cwd 唯一消歧，无法消歧则不显示。
function normalizedWorkspacePath(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
}
function workspacePathRank(workspace, cwd) {
  const path = normalizedWorkspacePath(workspace?.path);
  if (!path || !cwd || (cwd !== path && !cwd.startsWith(path + '/'))) return -1;
  return path.length;
}
function currentMainSessionId(sessions) {
  const ids = Array.isArray(sessions?.ids) ? sessions.ids : [];
  const active = ids.filter(id => ((sessions.byId?.[id]?.retainedBy?.mainView ?? 0) > 0));
  return active.length === 1 ? active[0] : null;
}
function pickSessionWorkspace(sessions, workspaces) {
  const sessionId = currentMainSessionId(sessions);
  if (sessionId === null) return null;
  const items = Array.isArray(workspaces?.items) ? workspaces.items : [];
  const owners = items.filter(item => Array.isArray(item.sessionIds) && item.sessionIds.includes(sessionId));
  if (owners.length === 1) return owners[0];
  // 无权威成员或存在多个共享引用时，cwd 只用于唯一匹配；0/多匹配一律隐藏。
  const pool = owners.length > 1 ? owners : items;
  const cwd = normalizedWorkspacePath(sessions.byId?.[sessionId]?.cwd);
  if (!cwd) return null;
  const ranked = pool.map(workspace => [workspacePathRank(workspace, cwd), workspace]).filter(([rank]) => rank >= 0);
  if (ranked.length === 0) return null;
  const mostSpecific = Math.max(...ranked.map(([rank]) => rank));
  const best = ranked.filter(([rank]) => rank === mostSpecific);
  return best.length === 1 ? best[0][1] : null;
}
function makeCollapsedNewChat(ctx) {
  return function ConversationHeaderLeading() {
    const marker = useRef(null);
    const sessions = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    useConversationHeaderChrome(marker, useSource(headerPresentation));
    const workspace = useMemo(() => pickSessionWorkspace(sessions, workspaces), [sessions, workspaces]);
    const name = workspace ? workspace.title || workspace.path || '' : '';
    const anchor = useRef(null);
    const [tip, setTip] = useState(null);
    const showTip = useCallback(() => {
      const box = anchor.current?.getBoundingClientRect?.();
      if (box) setTip({ left: box.left + box.width / 2, top: box.top });
    }, []);
    const hideTip = useCallback(() => setTip(null), []);
    useEffect(() => { setTip(null); }, [name, workspace?.workspaceId, currentMainSessionId(sessions)]);
    // startSession 返回 void；异步创建、导航和失败通知都由宿主处理。
    return h('div', { ref: marker, className: 'dsc-ui dsc-header-leading' },
      name && h('span', {
        ref: anchor, className: 'dsc-workspace-mark', tabIndex: 0, 'aria-label': name,
        onPointerEnter: showTip, onPointerLeave: hideTip, onFocus: showTip, onBlur: hideTip
      }, h(Icon, { name: 'folder' })),
      h('div', { className: 'dsc-collapsed-new-chat' },
        h('button', { type: 'button', className: 'dsc-icon-button', title: '新建对话', 'aria-label': '新建对话', onClick: () => ctx.uiWorkspace.startSession() }, h(PrototypeIcon, { name: 'newChat' }))),
      tip && createPortal(h('div', { className: 'dsc-ui dsc-workspace-tooltip', role: 'tooltip', style: { left: tip.left, top: tip.top - 6 } }, name), document.body));
  };
}

function makeGearLauncher(ctx) {
  return function GearLauncher({ openSettings, settingsOpen }) {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [failed, setFailed] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const anchor = useRef(null);
    useEffect(() => { if (settingsOpen) setOpen(false); }, [settingsOpen]);
    useEffect(() => {
      if (!open) return;
      let active = true;
      setProfile(null); setFailed(false); setAvatarFailed(false);
      const version = ctx.modules.manifest.release?.version;
      if (!version) { setFailed(true); return; }
      const client = { version, locale: ctx.locale.getSnapshot().active, timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
      ctx.remote.account.getProfile(client).then(result => {
        if (!result.ok) throw result.error;
        if (active) { setProfile(result.value?.status === 'ready' ? result.value.value : null); setFailed(result.value?.status !== 'ready'); }
      }).catch(() => { if (active) setFailed(true); });
      return () => { active = false; };
    }, [open]);
    const showSettings = () => { setOpen(false); openSettings(); };
    return createPortal(h('div', { className: 'dsc-ui dsc-gear-launcher' },
      h('button', { ref: anchor, type: 'button', className: 'dsc-gear-button', 'aria-label': '设置', 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) }, h(PrototypeIcon, { name: 'settings' })),
      open && h(Popover, { anchor, onClose: () => setOpen(false), label: '设置与账号', width: 228, className: 'dsc-app-menu' },
        h('button', { type: 'button', className: 'dsc-account-row', role: 'menuitem', onClick: showSettings, title: '在账号子页面中管理' }, profile?.avatarUrl && !avatarFailed ? h('img', { src: profile.avatarUrl, alt: '', onError: () => setAvatarFailed(true) }) : h('span', { className: 'dsc-account-avatar' }, h(Icon, { name: 'chat' })), h('span', null, h('strong', null, profile?.name || profile?.contact || '账号'), h('small', null, profile ? '账号与设置' : failed ? '打开账号设置' : '正在读取账号…'))),
        h('div', { className: 'dsc-menu-separator', role: 'separator' }),
        h(Option, { title: '设置', icon: 'settings', onClick: showSettings }))), document.body);
  };
}

function CloudMark() {
  return h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: 'currentColor', strokeWidth: 3.1, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: 'M21 9c5-6 13-6 18-1 9-1 17 6 17 14 8 6 9 17 2 24-1 10-10 17-20 14-8 6-19 3-23-5C4 54-1 44 4 35c-4-8 1-18 9-20 1-3 4-5 8-6Z' }), h('path', { d: 'm20 24 6 9-6 9m16 1h11' }));
}
// 公开 region/slot 锚点用于测量；不查私有 class，不搬移原编辑器或其它节点。
function useHeroGeometry(ref) {
  const [geometry, setGeometry] = useState(null);
  useLayoutEffect(() => {
    const region = ref.current?.closest('[data-conversation-content]');
    const composer = region?.querySelector('[data-slot="conversation.composer.bar"]');
    if (!region || !composer) return;
    const measure = () => {
      const area = region.getBoundingClientRect();
      const card = (composer.querySelector('[data-composer-card]') || composer).getBoundingClientRect();
      const fallback = composer.closest('[data-chain-overlay-fallback]');
      const visible = region.getAttribute('data-content-phase') === 'hero' && area.width > 0 && card.width > 0 && (!fallback || fallback.style.display !== 'none');
      setGeometry(previous => {
        const next = visible ? { left: card.left, top: card.top, width: card.width, centerX: area.left + area.width / 2, centerY: area.top + area.height * .45 } : null;
        return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
      });
    };
    measure();
    const resize = new ResizeObserver(measure); resize.observe(region); resize.observe(composer);
    const mutation = new MutationObserver(measure); mutation.observe(region, { subtree: true, attributes: true, attributeFilter: ['data-content-phase', 'style'] });
    window.addEventListener('resize', measure); window.addEventListener('scroll', measure, true);
    return () => { resize.disconnect(); mutation.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
  }, [ref]);
  return geometry;
}
function EmptyHero() {
  const ref = useRef(null);
  const geometry = useHeroGeometry(ref);
  return h(React.Fragment, null, h('span', { ref, 'aria-hidden': true }), geometry && createPortal(h('div', { className: 'dsc-ui dsc-empty-hero', style: { left: geometry.centerX, top: geometry.centerY } }, h(CloudMark), h('h1', null, '我们要构建什么？')), document.body));
}
function makeHeroWorkspace(ctx) {
  return function HeroWorkspace({ open: ownerOpen, selectedId, onPick, onClose }) {
    const workspaces = useSource(ctx.workspaces.list);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const anchor = useRef(null);
    const geometry = useHeroGeometry(ref);
    const current = workspaces.items.find(row => row.workspaceId === selectedId);
    const shown = ownerOpen || open;
    useLayoutEffect(() => {
      if (!geometry) return;
      const region = ref.current?.closest('[data-conversation-content]');
      if (!region) return;
      const names = ['--dsc-hero-card-top', '--dsc-hero-card-right'];
      const previous = names.map(name => region.style.getPropertyValue(name));
      region.style.setProperty(names[0], geometry.top + 'px');
      region.style.setProperty(names[1], geometry.left + geometry.width + 'px');
      region.setAttribute('data-dsc-hero-layout', '');
      return () => { names.forEach((name, i) => { if (previous[i]) region.style.setProperty(name, previous[i]); else region.style.removeProperty(name); }); region.removeAttribute('data-dsc-hero-layout'); };
    }, [geometry]);
    const close = () => { setOpen(false); onClose(); };
    const menu = shown && h(Popover, { anchor, label: '选择项目', onClose: close, width: 280 },
      h('div', { className: 'dsc-menu-heading' }, '选择项目'),
      workspaces.items.map(row => h(Option, { key: row.workspaceId, title: row.title, detail: row.path, icon: 'folder', selected: row.workspaceId === selectedId, onClick: () => { setOpen(false); onPick(row.workspaceId); } })),
      !workspaces.items.length && h('div', { className: 'dsc-empty' }, '先在左侧添加工作区'));
    const bar = geometry && createPortal(h('div', { className: 'dsc-ui dsc-hero-projectbar', style: { left: geometry.left + 13, top: geometry.top - 38, width: Math.max(120, geometry.width - 26) } },
      h('button', { type: 'button', ref: anchor, className: 'dsc-project-picker', 'aria-haspopup': 'menu', 'aria-expanded': shown, onClick: () => { if (shown) close(); else setOpen(true); } }, h(Icon, { name: 'folder' }), current?.title || '选择项目'), menu), document.body);
    return h(React.Fragment, null, h('span', { ref, 'aria-hidden': true }), bar);
  };
}
