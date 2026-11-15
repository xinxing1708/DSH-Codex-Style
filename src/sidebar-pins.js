// DSH 0.2.2-rc.3 兼容边界：固定状态尚未公开为 ctx service。
// 只调用原 sidebar 注册的注入工厂，复用其闭包中的状态和动作；不创建第二份 pin 状态。
function createSidebarPinAdapter(ctx) {
  const empty = { available: false, unpinned: [] };
  const store = createSnapshotStore(empty);
  let source;
  let setPinned;
  let unsubscribe;
  let owner;
  const publish = () => {
    const unpinned = source?.getSnapshot();
    const previous = store.getSnapshot();
    const available = Array.isArray(unpinned) && typeof setPinned === 'function';
    const ids = available ? unpinned : empty.unpinned;
    if (previous.available !== available || previous.unpinned !== ids) store.set({ available, unpinned: ids });
  };
  const detach = () => {
    unsubscribe?.(); unsubscribe = undefined;
    owner = source = setPinned = undefined;
  };
  const sync = () => {
    // single slot 只返回当前生效注册；StoredEntry 的 inject/children 在顶层。
    const current = ctx.slots.entriesOfSlot('sidebar')[0];
    const entry = current?.children?.['sidebar.panellist.actions'] && typeof current.inject === 'function' ? current : undefined;
    if (entry === owner) return;
    detach();
    if (entry) {
      try {
        const injected = entry.inject();
        const candidate = injected?.hooks?.entryPins;
        if (typeof candidate?.getSnapshot === 'function' && typeof candidate.subscribe === 'function' && typeof injected.setPinned === 'function') {
          source = candidate;
          setPinned = injected.setPinned;
          owner = entry;
          unsubscribe = source.subscribe(publish);
        }
      } catch (error) {
        console.warn('codex-style: 无法接入当前 sidebar 固定状态', error);
      }
    }
    publish();
  };
  return {
    store,
    canPin: id => store.getSnapshot().available && id !== 'plugins',
    setPinned(id, pinned) {
      if (!store.getSnapshot().available) throw new Error('当前宿主未提供导航固定接口');
      if (id !== 'plugins') setPinned(id, pinned);
    },
    start() {
      const stop = ctx.slots.subscribe('sidebar', sync);
      sync();
      return () => { stop(); detach(); publish(); };
    }
  };
}

function createSidebarPinMenu() {
  const store = createSnapshotStore(null);
  return {
    store,
    open: entry => store.set(entry),
    close(restoreFocus = false) {
      const previous = store.getSnapshot();
      store.set(null);
      if (restoreFocus && previous) queueMicrotask(() => {
        const target = previous.anchor?.isConnected ? previous.anchor : document.querySelector('[data-dsc-preview-trigger="more"]');
        target?.focus({ preventScroll: true });
      });
    }
  };
}

function SidebarPinContextMenu({ sidebar }) {
  const menu = useSource(sidebar.pinMenu.store);
  const pins = useSource(sidebar.pins.store);
  const ref = useRef(null);
  const [error, setError] = useState('');
  useLayoutEffect(() => {
    if (!menu || !ref.current) return;
    const box = menu.anchor.getBoundingClientRect();
    const element = ref.current;
    const x = menu.x ?? box.right + 4;
    const y = menu.y ?? box.top;
    element.style.left = Math.max(8, Math.min(x, window.innerWidth - element.offsetWidth - 8)) + 'px';
    element.style.top = Math.max(8, Math.min(y, window.innerHeight - element.offsetHeight - 8)) + 'px';
    element.querySelector('button')?.focus({ preventScroll: true });
    setError('');
  }, [menu]);
  useEffect(() => {
    if (!menu) return;
    const outside = event => { if (!ref.current?.contains(event.target)) sidebar.pinMenu.close(); };
    const key = event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); sidebar.pinMenu.close(true); }
      else if (event.key === 'Tab') sidebar.pinMenu.close();
    };
    const dismiss = () => sidebar.pinMenu.close();
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', key, true);
    window.addEventListener('resize', dismiss);
    window.addEventListener('blur', dismiss);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('keydown', key, true);
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('blur', dismiss);
    };
  }, [menu, sidebar]);
  useEffect(() => {
    if (menu && (!pins.available || pins.unpinned.includes(menu.id))) sidebar.pinMenu.close(true);
  }, [menu, pins, sidebar]);
  if (!menu || !pins.available) return null;
  return createPortal(h('div', {
    ref, className: 'dsc-ui dsc-pin-context-menu', role: 'menu', 'aria-label': menu.label + '导航操作',
    onKeyDown: event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') { event.preventDefault(); ref.current?.querySelector('button')?.focus(); } }
  }, h('button', {
    type: 'button', role: 'menuitem', onClick: () => {
      try { sidebar.pins.setPinned(menu.id, false); sidebar.pinMenu.close(true); }
      catch (reason) { setError(errorText(reason)); }
    }
  }, h(Icon, { name: 'pin' }), '从左侧栏取消固定'), error && h('div', { role: 'alert' }, error)), document.body);
}
