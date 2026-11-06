// 自研插件更新已退役：本文件只保留 DSH 本体更新入口。
// 沿用 Electron preload 的 dshDesktop.updates（与原生设置行指示器同一入口）；
// 检查、下载、校验、停止任务确认与重启安装全部由宿主主进程负责，这里只呈现状态并转交点击。
const DESKTOP_UPDATE_BUSY = ['checking', 'downloading', 'verifying', 'installing'];
const DESKTOP_UPDATE_FAILURES = {
  check: '检查更新失败，请稍后重试。', 'check-network': '检查更新失败，请检查网络连接后重试。',
  download: '下载更新失败，请重试。', 'download-network': '下载更新失败，请检查网络连接后重试。',
  install: '安装更新失败，请稍后重试。', 'install-network': '安装更新失败，请检查网络连接后重试。',
  'stop-failed': '未能安全停止任务，更新尚未安装，请稍后重试。', 'tasks-changed': '有新任务开始运行，请重新确认是否停止任务并更新。',
  'tasks-unavailable': '无法确认任务状态，请在工作区就绪后重试更新。'
};
function createDesktopUpdateSource() {
  const store = createSnapshotStore({ available: false, failed: false, opening: false });
  let bridge, live = false;
  const patch = next => { if (live) store.set({ ...store.getSnapshot(), ...next }); };
  return {
    store,
    start(carrier) {
      const candidate = carrier?.protocolVersion === 1 ? carrier.updates : undefined;
      if (!candidate || ['status', 'open', 'subscribe'].some(name => typeof candidate[name] !== 'function')) return;
      bridge = candidate; live = true;
      let received = false;
      store.set({ available: true, failed: false, opening: false });
      const unsubscribe = bridge.subscribe(presentation => { received = true; patch({ presentation, failed: false }); });
      bridge.status().then(presentation => { if (!received) patch({ presentation }); }, () => { if (!received) patch({ failed: true }); });
      return () => { live = false; bridge = undefined; unsubscribe?.(); store.set({ available: false, failed: false, opening: false }); };
    },
    // 与原生指示器一致：忙碌阶段忽略点击，后续点击并入宿主正在进行的同一操作。
    open() {
      const state = store.getSnapshot();
      if (!live || state.opening || DESKTOP_UPDATE_BUSY.includes(state.presentation?.phase)) return;
      const target = bridge;
      patch({ opening: true });
      Promise.resolve().then(() => target.open()).catch(() => patch({ failed: true })).finally(() => patch({ opening: false }));
    }
  };
}
function desktopUpdateView({ presentation: state, failed, opening }) {
  if (failed) return { kind: 'error', label: '重试更新', detail: '暂时无法读取更新状态，点击重试。' };
  if (!state || state.phase === 'idle') return null;
  const version = state.version ? 'v' + state.version : '';
  const percent = Math.min(100, Math.max(0, Math.floor(state.percent ?? 0)));
  const view = {
    available: { kind: 'download', label: '有可用更新', detail: (version ? '新版本 ' + version + '，' : '') + '点击下载并安装' },
    downloading: { kind: 'progress', percent, label: '正在下载更新 ' + percent + '%', detail: version && '目标版本 ' + version },
    verifying: { kind: 'busy', label: '正在校验更新文件…', detail: version },
    ready: { kind: 'download', label: '更新已就绪', detail: (version ? version + ' 已下载，' : '') + '点击安装并重启' },
    installing: { kind: 'busy', label: '正在准备重启…', detail: version },
    checking: { kind: 'busy', label: '正在检查更新…', detail: '' },
    error: { kind: 'error', label: '重试更新', detail: DESKTOP_UPDATE_FAILURES[state.failure] ?? DESKTOP_UPDATE_FAILURES.install }
  }[state.phase];
  return view && opening && view.kind !== 'progress' ? { ...view, kind: 'busy' } : view ?? null;
}
const DESKTOP_UPDATE_RING = 2 * Math.PI * 6;
function DesktopUpdateGlyph({ view }) {
  const svg = (children, props = {}) => h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, children);
  if (view.kind === 'progress') return svg([
    h('circle', { key: 'track', cx: 8, cy: 8, r: 6, strokeOpacity: 0.32, strokeWidth: 2 }),
    h('circle', { key: 'value', className: 'dsc-desktop-update-ring', cx: 8, cy: 8, r: 6, strokeWidth: 2, strokeLinecap: 'butt', transform: 'rotate(-90 8 8)', strokeDasharray: DESKTOP_UPDATE_RING * view.percent / 100 + ' ' + DESKTOP_UPDATE_RING })
  ]);
  if (view.kind === 'busy') return svg(h('path', { d: 'M8 2.5a5.5 5.5 0 1 1-5.5 5.5' }), { className: 'dsc-update-spin' });
  if (view.kind === 'error') return svg(h('path', { d: 'M8 4v5m0 2.6v.1', strokeWidth: 1.9 }));
  return svg(h('path', { d: 'M8 2.8v7.1M5.2 7.3 8 10.1l2.8-2.8M3.2 9.8v1.4c0 1 .8 1.8 1.8 1.8h6c1 0 1.8-.8 1.8-1.8V9.8' }));
}
// 位于设置齿轮正上方：发现新版显示蓝圆箭头，下载中换为环形进度，悬停显示进度与目标版本。
function DesktopUpdateRailButton({ source }) {
  const state = useSource(source.store);
  const tipId = useId();
  const view = state.available ? desktopUpdateView(state) : null;
  if (!view) return null;
  const busy = view.kind === 'busy' || view.kind === 'progress';
  return h('div', { className: 'dsc-desktop-update', 'data-update-phase': state.failed ? 'failed' : state.presentation.phase },
    h('button', { type: 'button', className: 'dsc-desktop-update-button', 'aria-label': view.label, 'aria-describedby': tipId, 'aria-disabled': busy, onClick: () => { if (!busy) source.open(); } },
      h('span', { className: 'dsc-desktop-update-dot', 'data-kind': view.kind }, h(DesktopUpdateGlyph, { view }))),
    h('span', { id: tipId, role: 'tooltip', className: 'dsc-desktop-update-tip' },
      h('strong', null, view.label),
      view.detail && h('span', null, view.detail),
      view.kind === 'progress' && h('span', { className: 'dsc-update-progress', 'aria-hidden': true }, h('span', { className: 'dsc-update-progress-fill', style: { transform: 'scaleX(' + view.percent / 100 + ')' } }))));
}
