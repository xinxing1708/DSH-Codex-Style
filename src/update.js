// 固定 scoped 身份；版本查询后由宿主下载，只有用户点击「立即安装」才切换安装。
const UPDATE_PACKAGE = '@xinxing1708/dsh-codex-style';
const UPDATE_REGISTRIES = [
  { id: 'npmmirror', label: 'npmmirror 中国镜像', url: 'https://registry.npmmirror.com/' },
  { id: 'tencent', label: '腾讯云 npm 镜像', url: 'https://mirrors.cloud.tencent.com/npm/' },
  { id: 'npm', label: 'npm 官方源', url: 'https://registry.npmjs.org/' }
];

// 客户端命名空间需要显式挂载；仅声明 Host Remote 不会自动生成浏览器方法。
function mountPluginUpdateRemote(ctx) {
  const { z } = require('zod');
  const version = z.string().min(1);
  const snapshot = z.object({ phase: z.enum(['idle', 'downloading', 'ready', 'installing', 'installed', 'error']), version: z.string().optional(), downloaded: z.number(), total: z.number().nullable() }).passthrough();
  return ctx.remote.$mount({ package: UPDATE_PACKAGE, descriptors: ['status', 'download', 'installUpdate'].map(method => ({
    id: UPDATE_PACKAGE + '#codexStyleUpdates/' + method,
    service: 'codexStyleUpdates', namespace: 'codexStyleUpdates', method, invocation: { kind: 'direct' },
    parameters: method === 'status' ? [] : [{ name: 'version', wire: 'version', source: 'json', codec: { mode: 'strict', typeSymbol: UPDATE_PACKAGE + '#update-version', create: () => version, jsonSchema: { type: 'string', minLength: 1 } } }],
    result: { mode: 'strict', typeSymbol: UPDATE_PACKAGE + '#update-state', create: () => snapshot }
  })) });
}

function updateVersionParts(value) {
  if (typeof value !== 'string') return null;
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.exec(value);
  if (!match) return null;
  const pre = match[4]?.split('.');
  if (pre?.some(part => /^\d+$/.test(part) && part.length > 1 && part[0] === '0')) return null;
  return { core: match.slice(1, 4).map(BigInt), pre };
}
function compareUpdateVersions(left, right) {
  const a = updateVersionParts(left), b = updateVersionParts(right);
  if (!a || !b) return null;
  for (let i = 0; i < 3; i++) if (a.core[i] !== b.core[i]) return a.core[i] > b.core[i] ? 1 : -1;
  if (!a.pre || !b.pre) return a.pre ? -1 : b.pre ? 1 : 0;
  for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i++) {
    const x = a.pre[i], y = b.pre[i];
    if (x === y) continue;
    if (x === undefined || y === undefined) return x === undefined ? -1 : 1;
    const xn = /^\d+$/.test(x), yn = /^\d+$/.test(y);
    if (xn && yn) return BigInt(x) > BigInt(y) ? 1 : -1;
    if (xn !== yn) return xn ? -1 : 1;
    return x > y ? 1 : -1;
  }
  return 0;
}

async function checkPluginUpdate(currentVersion, { signal, fetcher = globalThis.fetch, timeoutMs = 6500 } = {}) {
  signal?.throwIfAborted();
  if (!updateVersionParts(currentVersion)) return { state: 'error', message: '无法读取当前插件版本，请重新打开插件详情。' };
  // 并行读取多个源，取已返回的最高版本，避免先响应的滞后镜像遮住新版。
  const sources = await Promise.all(UPDATE_REGISTRIES.map(async registry => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener('abort', abort, { once: true });
    const timer = setTimeout(abort, timeoutMs);
    try {
      const response = await fetcher(registry.url + UPDATE_PACKAGE.replace('/', '%2F') + '/latest', {
        signal: controller.signal, mode: 'cors', credentials: 'omit', cache: 'no-store', redirect: 'error', referrerPolicy: 'no-referrer', headers: { Accept: 'application/json' }
      });
      if (response.status === 404) return { ...registry, status: 'missing' };
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const metadata = await response.json();
      if (metadata.name !== UPDATE_PACKAGE || !updateVersionParts(metadata.version)) throw new Error('无效的包元数据');
      return { ...registry, status: 'ok', version: metadata.version };
    } catch {
      return { ...registry, status: 'error' };
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
    }
  }));
  signal?.throwIfAborted();
  const available = sources.filter(source => source.status === 'ok');
  if (!available.length) {
    const unpublished = sources.find(source => source.id === 'npm')?.status === 'missing';
    return { state: unpublished ? 'unpublished' : 'error', sources, message: unpublished ? '该包尚未发布到 npm，或已被撤回，暂时无法查询版本。' : '暂时无法从更新源读取版本，请稍后重试。' };
  }
  const latest = available.reduce((best, source) => {
    const compared = compareUpdateVersions(source.version, best.version);
    return compared > 0 || (compared === 0 && source.id === 'npm') ? source : best;
  });
  const comparison = compareUpdateVersions(latest.version, currentVersion);
  return { state: comparison > 0 ? 'update' : comparison < 0 ? 'ahead' : 'current', latestVersion: latest.version, source: latest.label, mirror: latest.id !== 'npm', sources };
}

const UPDATE_CACHE_KEY = 'dsh-codex-style:update-check:v1';
const UPDATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const UPDATE_RETRY_MS = 60 * 60 * 1000;
function createPluginUpdateService(currentVersion, { query = checkPluginUpdate } = {}) {
  let lastSuccess = 0, retryAt = 0, timer, pending, controller, started = false, disposed = false;
  let host, transferTimer, transferRequest, hostGeneration = 0;
  let cached = {};
  try { cached = JSON.parse(window.localStorage.getItem(UPDATE_CACHE_KEY) || '{}') || {}; } catch { /* 存储不可用时仍可在本次运行检查。 */ }
  const validCache = cached.currentVersion === currentVersion && Number.isFinite(cached.checkedAt) && cached.checkedAt > 0 && cached.checkedAt <= Date.now() && updateVersionParts(cached.latestVersion);
  if (validCache) lastSuccess = cached.checkedAt;
  const comparison = validCache ? compareUpdateVersions(cached.latestVersion, currentVersion) : null;
  const store = createSnapshotStore({
    state: validCache ? comparison > 0 ? 'update' : comparison < 0 ? 'ahead' : 'current' : 'idle',
    checking: false,
    transfer: { phase: 'idle' },
    ...(validCache ? { latestVersion: cached.latestVersion, source: UPDATE_REGISTRIES.find(row => row.label === cached.source)?.label, mirror: cached.mirror === true } : {}),
    dismissedVersion: updateVersionParts(cached.dismissedVersion) ? cached.dismissedVersion : undefined
  });
  const save = () => {
    const state = store.getSnapshot();
    try { window.localStorage.setItem(UPDATE_CACHE_KEY, JSON.stringify({ currentVersion, checkedAt: lastSuccess, latestVersion: state.latestVersion, source: state.source, mirror: state.mirror, dismissedVersion: state.dismissedVersion })); } catch { /* 不阻断检查或提醒。 */ }
  };
  const schedule = delay => {
    clearTimeout(timer);
    if (started && !disposed) timer = setTimeout(runScheduled, Math.max(0, delay));
  };
  const dueIn = () => Math.max(lastSuccess ? lastSuccess + UPDATE_INTERVAL_MS : 0, retryAt) - Date.now();
  const transferError = error => { if (!disposed) store.set({ ...store.getSnapshot(), transfer: { ...store.getSnapshot().transfer, phase: 'error', message: error.message || '更新服务暂时不可用，请重试。' } }); };
  function acceptTransfer(transfer) {
    if (disposed || !transfer || compareUpdateVersions(transfer.version, currentVersion) !== 1) return;
    const state = store.getSnapshot();
    const newer = compareUpdateVersions(transfer.version, state.latestVersion) === 1 || !state.latestVersion;
    store.set({ ...state, ...(newer ? { latestVersion: transfer.version, state: 'update' } : {}), transfer });
    clearTimeout(transferTimer);
    if (['downloading', 'installing'].includes(transfer.phase)) transferTimer = setTimeout(() => refreshTransfer().catch(transferError), 400);
    else if (transfer.phase === 'ready' && compareUpdateVersions(state.latestVersion, transfer.version) === 1) transferTimer = setTimeout(download, 0);
  }
  async function callHost(method, ...args) {
    if (!host) throw new Error('更新服务尚未连接，请稍后重试。');
    const answer = await host[method](...args);
    if (!answer.ok) throw new Error(answer.error?.message || '更新服务调用失败。');
    return answer.value;
  }
  async function refreshTransfer() {
    const generation = hostGeneration;
    const transfer = await callHost('status');
    if (generation !== hostGeneration || disposed) return;
    if (transfer?.phase === 'idle') store.set({ ...store.getSnapshot(), transfer: { phase: 'idle' } });
    else acceptTransfer(transfer);
  }
  function download() {
    if (transferRequest) return transferRequest;
    const state = store.getSnapshot();
    if (state.state !== 'update' || ['downloading', 'installing', 'installed'].includes(state.transfer.phase)) return Promise.resolve();
    const generation = hostGeneration;
    store.set({ ...state, transfer: { phase: 'downloading', version: state.latestVersion, downloaded: 0, total: null } });
    transferRequest = callHost('download', state.latestVersion).then(transfer => { if (generation === hostGeneration) acceptTransfer(transfer); }).catch(error => { if (generation === hostGeneration) transferError(error); }).finally(() => { transferRequest = null; });
    return transferRequest;
  }
  async function install() {
    const state = store.getSnapshot();
    if (state.transfer.phase !== 'ready' || state.transfer.version !== state.latestVersion) return;
    const generation = hostGeneration;
    store.set({ ...state, transfer: { ...state.transfer, phase: 'installing', message: undefined } });
    try {
      const transfer = await callHost('installUpdate', state.latestVersion);
      if (generation === hostGeneration) acceptTransfer(transfer);
    } catch (error) {
      if (!disposed && generation === hostGeneration) store.set({ ...store.getSnapshot(), transfer: { ...state.transfer, phase: 'installing', message: '安装结果暂未收到，正在重新查询。' } });
      // 安装回复可能随宿主重载丢失；先查询结果，不能再次执行安装。
      await refreshTransfer().catch(transferError);
    }
  }
  async function runScheduled() {
    if (disposed) return;
    if (dueIn() > 0) { schedule(dueIn()); return; }
    if (window.navigator.onLine === false) { retryAt = Date.now() + UPDATE_RETRY_MS; schedule(dueIn()); return; }
    await check();
  }
  function check() {
    if (disposed) return Promise.reject(new Error('更新检查已停用'));
    if (pending) return pending;
    controller = new AbortController();
    const signal = controller.signal;
    store.set({ ...store.getSnapshot(), checking: true });
    pending = Promise.resolve().then(() => query(currentVersion, { signal })).then(async result => {
      if (disposed || signal.aborted) return result;
      store.set({ ...store.getSnapshot(), message: undefined, ...result, checking: false });
      if (['current', 'update', 'ahead'].includes(result.state)) { lastSuccess = Date.now(); retryAt = 0; save(); }
      else retryAt = Date.now() + UPDATE_RETRY_MS;
      if (result.state === 'update' && host) await download();
      return result;
    }).catch(error => {
      if (!disposed && !signal.aborted) {
        store.set({ ...store.getSnapshot(), state: 'error', checking: false, message: '检查失败，请稍后重试。' });
        retryAt = Date.now() + UPDATE_RETRY_MS;
      }
      return { state: 'error' };
    }).finally(() => { pending = null; controller = null; if (!disposed) schedule(dueIn()); });
    return pending;
  }
  const onOnline = () => { retryAt = 0; schedule(dueIn()); };
  const onVisible = () => { if (document.visibilityState === 'visible') schedule(dueIn()); };
  return {
    store, check, download, install,
    connect(remote) {
      host = remote; hostGeneration++;
      refreshTransfer().then(() => {
        const state = store.getSnapshot();
        if (state.state === 'update' && !(state.transfer.version === state.latestVersion && ['ready', 'downloading', 'installing', 'installed'].includes(state.transfer.phase))) return download();
      }).catch(transferError);
      return () => { host = undefined; hostGeneration++; clearTimeout(transferTimer); };
    },
    dismiss() { store.set({ ...store.getSnapshot(), dismissedVersion: store.getSnapshot().latestVersion }); save(); },
    start() {
      if (started || disposed) return;
      started = true;
      window.addEventListener('online', onOnline);
      document.addEventListener('visibilitychange', onVisible);
      schedule(Math.max(8000, dueIn()));
    },
    dispose() {
      disposed = true; started = false;
      clearTimeout(timer); controller?.abort();
      clearTimeout(transferTimer); host = undefined; hostGeneration++;
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    }
  };
}

function PluginUpdateNotice({ updates, onOpen }) {
  const state = useSource(updates.store);
  if (compareUpdateVersions(state.latestVersion, PLUGIN_VERSION) !== 1 || state.dismissedVersion === state.latestVersion) return null;
  return h('aside', { className: 'dsc-ui dsc-update-notice', role: 'status', 'aria-live': 'polite', 'aria-label': 'Codex Style 更新提醒' },
    h('div', { className: 'dsc-update-heading' }, h('strong', null, state.transfer.phase === 'installed' ? 'Codex Style 更新已安装' : 'Codex Style 有新版本'), h('button', { type: 'button', className: 'dsc-update-close', 'aria-label': '忽略此版本提醒', onClick: () => updates.dismiss() }, h(Icon, { name: 'close' }))),
    h('p', { className: 'dsc-update-note' }, 'v' + PLUGIN_VERSION + ' → v' + state.latestVersion, state.transfer.phase === 'ready' && ' · 已下载', state.transfer.phase === 'installed' && ' · 重启 DSH 后生效'),
    h('button', { type: 'button', className: 'dsc-update-retry', onClick: onOpen }, '查看更新'));
}

function PluginUpdateAction({ subject, updates }) {
  const pkg = subject?.pkg;
  if (subject?.kind !== 'bundle' || !pkg?.installed) return null;
  const legacy = PLUGIN_PACKAGE === PLUGIN_ID && pkg.name === PLUGIN_ID && pkg.rows?.some(row => row.rowId === 'ui-skin-codex-style' && row.moduleName === PLUGIN_ID);
  if (pkg.name !== UPDATE_PACKAGE && !legacy) return null;
  return h(PluginUpdateControl, { key: pkg.name + '@' + pkg.version, currentVersion: pkg.version, updates });
}
function PluginUpdateControl({ currentVersion, updates }) {
  const anchor = useRef(null);
  const service = useMemo(() => updates || createPluginUpdateService(currentVersion), [updates, currentVersion]);
  const [open, setOpen] = useState(false);
  const result = useSource(service.store);
  const transfer = result.transfer;
  const downloading = transfer.phase === 'downloading', installing = transfer.phase === 'installing', installed = transfer.phase === 'installed';
  const ready = transfer.phase === 'ready' && transfer.version === result.latestVersion;
  const busy = result.checking || downloading || installing;
  const percent = transfer.total ? Math.min(100, Math.floor(transfer.downloaded / transfer.total * 100)) : null;
  useEffect(() => () => { if (!updates) service.dispose(); }, [service, updates]);
  const close = useCallback(() => { setOpen(false); }, []);
  const check = async () => {
    setOpen(true);
    if (ready) await service.install();
    else if (transfer.phase === 'error' && result.state === 'update') await service.download();
    else await service.check();
  };
  const visibleState = downloading ? 'downloading' : installing ? 'installing' : installed ? 'installed' : ready ? 'ready' : result.checking ? 'checking' : result.state;
  const messages = { checking: '正在检查更新…', current: '已是最新版本', ahead: '当前版本较新', update: '发现新版本', unpublished: '暂未查到发布版本', error: '检查失败', downloading: '正在下载更新…', ready: '下载完成，可以立即安装', installing: '正在安装更新…', installed: '安装完成，重新启动 DSH 后生效' };
  const buttonText = installing ? '安装中…' : installed ? '已安装' : ready ? '立即安装' : result.checking ? '检查中…' : transfer.phase === 'error' && result.state === 'update' ? '重试下载' : '检查更新';
  return h('span', { className: 'dsc-update-control', 'data-update-state': visibleState },
    downloading && h('span', { className: 'dsc-update-download' },
      h('span', { className: 'dsc-update-progress', role: 'progressbar', 'aria-label': '插件更新下载进度', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': percent ?? undefined, 'data-indeterminate': percent === null }, h('span', { className: 'dsc-update-progress-fill', style: percent === null ? undefined : { transform: 'scaleX(' + percent / 100 + ')' } })),
      h('span', { className: 'dsc-update-progress-label' }, percent === null ? Math.floor((transfer.downloaded || 0) / 1024) + ' KB' : percent + '%')),
    h(Button, { variant: 'outline', size: 'sm', ref: anchor, disabled: busy || installed, icon: ready || installed ? h(Icon, { name: 'check', size: 13 }) : h(IconRefreshOutlineRegular, { size: 13, className: busy ? 'dsc-update-spin' : undefined }), onClick: check, 'aria-haspopup': 'dialog', 'aria-expanded': open }, buttonText),
    open && h(Popover, { anchor, onClose: close, label: '检查插件更新', role: 'dialog', width: 336, className: 'dsc-update-panel' },
      h('div', { className: 'dsc-update-heading' }, h('strong', null, '插件更新'), h('button', { type: 'button', className: 'dsc-update-close', onClick: close, 'aria-label': '关闭更新检查' }, h(Icon, { name: 'close' }))),
      h('p', { className: 'dsc-update-message', role: 'status', 'aria-live': 'polite', 'data-state': visibleState }, messages[visibleState]),
      h('dl', { className: 'dsc-update-versions' }, h('dt', null, '当前版本'), h('dd', null, currentVersion ? 'v' + currentVersion : '未知'), result.latestVersion && h(React.Fragment, null, h('dt', null, busy || ['error', 'unpublished'].includes(result.state) ? '上次查到' : '最新版本'), h('dd', null, 'v' + result.latestVersion))),
      result.source && h('p', { className: 'dsc-update-note' }, '来源：' + result.source, result.mirror && h('span', null, '镜像同步可能稍有延迟。')),
      result.message && h('p', { className: 'dsc-update-note' }, result.message),
      transfer.message && h('p', { className: 'dsc-update-note', role: transfer.phase === 'error' ? 'alert' : undefined }, transfer.message),
      ready && h('p', { className: 'dsc-update-note' }, '点击「立即安装」升级插件，安装完成后重启 DSH 生效。'),
      !busy && !installed && h('button', { type: 'button', className: 'dsc-update-retry', onClick: check }, ready ? '立即安装' : transfer.phase === 'error' && result.state === 'update' ? '重试下载' : '重新检查')));
}
