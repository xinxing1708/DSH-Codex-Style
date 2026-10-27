// 图片批注客户端集成：把独立的预览/点批注/手绘 UI 接到宿主公开槽位与 Remote 服务。
//
// 约定（由 build 拼进主 client factory，全部顶层标识使用 imageAnnotationIntegration 前缀）：
// - 只消费公开契约：conversation.input.attachments / conversation.chat.user.images 的 owner props、
//   标准 props（sessionId/useInput/inputActions）、ctx.conversation.createDrafts/releaseDraftAttachment、
//   ctx.uiConversation 的授权图片 URL（经槽位 loadImage 回调）与 ctx.remote 手写 descriptor。
// - 不替换正文/编辑器、不拦截 DOM、不改宿主函数；拖放/附件 rail/非图片文件卡由本文件的叶组件自绘。
// - 批注文本只进入 Host prepare/recall，不写编辑器或可见正文。
// - 发送载体：文件名 '<原basename>.__dsc_ia_<uuid>__<扩展名>'；token 不含批注内容；显示层统一去后缀。

const imageAnnotationIntegrationCarrierMarker = '.__dsc_ia_';
const imageAnnotationIntegrationCarrierExpression = /^(.*)\.__dsc_ia_([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})__(\.[^./\\]+)$/i;
const imageAnnotationIntegrationDefaultName = '图片';
const imageAnnotationIntegrationMaxExtension = 16;

// build.mjs 会定义两个 CSS 常量；未接线时（如仅加载本文件做测试）保持空字符串即可。
const imageAnnotationIntegrationOwnCssText = (function () {
  try {
    return typeof IMAGE_ANNOTATIONS_INTEGRATION_CSS_TEXT === 'string' ? IMAGE_ANNOTATIONS_INTEGRATION_CSS_TEXT : '';
  } catch (error) {
    return '';
  }
})();
const imageAnnotationIntegrationUiCssText = (function () {
  try {
    return typeof IMAGE_ANNOTATIONS_CSS_TEXT === 'string' ? IMAGE_ANNOTATIONS_CSS_TEXT : '';
  } catch (error) {
    return '';
  }
})();

/* ------------------------------ 纯函数 ------------------------------ */

// 拆分显示名：扩展名含点；没有扩展名时返回空串。
function imageAnnotationIntegrationSplitExtension(name) {
  const text = String(name || '');
  const index = text.lastIndexOf('.');
  if (index <= 0 || index === text.length - 1) return { base: text, extension: '' };
  const extension = text.slice(index);
  if (extension.length > imageAnnotationIntegrationMaxExtension || /[\\/]/.test(extension)) return { base: text, extension: '' };
  return { base: text.slice(0, index), extension };
}

// 解析发送载体文件名。返回 token/原 basename/扩展名/显示名；不是载体时返回 null。
function imageAnnotationIntegrationParseCarrier(name) {
  const match = imageAnnotationIntegrationCarrierExpression.exec(String(name || ''));
  if (!match) return null;
  const baseName = match[1];
  const token = match[2].toLowerCase();
  const extension = match[3];
  return { token, baseName, extension, displayName: baseName + extension };
}

// 显示层统一去掉中间后缀。
function imageAnnotationIntegrationStripCarrier(name) {
  const parsed = imageAnnotationIntegrationParseCarrier(name);
  return parsed ? parsed.displayName : String(name || '');
}

// 生成带 token 的发送载体名；扩展名缺失时补 .png，保证 Host 能稳定解析。
function imageAnnotationIntegrationCarrierName(displayName, token, extensionOverride) {
  const parts = imageAnnotationIntegrationSplitExtension(displayName);
  const extension = typeof extensionOverride === 'string' && extensionOverride.startsWith('.')
    ? extensionOverride
    : (parts.extension || '.png');
  return parts.base + imageAnnotationIntegrationCarrierMarker + token + '__' + extension;
}

// 随机 UUID（不含任何批注内容）。
function imageAnnotationIntegrationUuid() {
  const cryptoObject = typeof globalThis === 'object' ? globalThis.crypto : undefined;
  if (!cryptoObject || typeof cryptoObject.randomUUID !== 'function') throw new Error('当前环境不支持生成批注标识');
  return cryptoObject.randomUUID();
}

// 批注状态键按 session 隔离；token 是已发送图片的稳定身份。
function imageAnnotationIntegrationSentKey(sessionId, token) {
  return 'ia-sent|' + String(sessionId || '') + '|' + String(token || '');
}
function imageAnnotationIntegrationDraftKey(sessionId, draftId) {
  return 'ia-draft|' + String(sessionId || '') + '|' + String(draftId || '');
}
function imageAnnotationIntegrationHistoryKey(sessionId, attachmentId) {
  return 'ia-history|' + String(sessionId || '') + '|' + String(attachmentId || '');
}
function imageAnnotationIntegrationPreviewKey(sessionId, url) {
  return 'ia-preview|' + String(sessionId || '') + '|' + String(url || '');
}

function imageAnnotationIntegrationClamp(value, low, high) {
  const number = Number(value);
  if (!Number.isFinite(number)) return low;
  return Math.min(high, Math.max(low, number));
}

// Host prepare 只接受 trim 后非空、坐标 0..1 的评论。
function imageAnnotationIntegrationPreparedComments(state) {
  const comments = state && Array.isArray(state.comments) ? state.comments : [];
  const rows = [];
  for (const comment of comments) {
    if (!comment || typeof comment !== 'object') continue;
    const text = String(comment.text === undefined || comment.text === null ? '' : comment.text).trim();
    if (!text) continue;
    rows.push({ text, x: imageAnnotationIntegrationClamp(comment.x, 0, 1), y: imageAnnotationIntegrationClamp(comment.y, 0, 1) });
  }
  return rows;
}

// 恢复出来的评论补本地 id，UI 的编辑/删除/编号依赖它。
function imageAnnotationIntegrationRecalledComments(token, comments) {
  const list = Array.isArray(comments) ? comments : [];
  const prefix = 'recalled-' + String(token || '').slice(0, 8) + '-';
  const rows = [];
  let index = 0;
  for (const comment of list) {
    if (!comment || typeof comment !== 'object') continue;
    const text = String(comment.text === undefined || comment.text === null ? '' : comment.text).trim();
    if (!text) continue;
    rows.push({
      id: prefix + index,
      text,
      x: imageAnnotationIntegrationClamp(comment.x, 0, 1),
      y: imageAnnotationIntegrationClamp(comment.y, 0, 1)
    });
    index += 1;
  }
  return rows;
}

// 只比较批注内容本身，用于“目标是否还有未同步改动”的判断。
function imageAnnotationIntegrationContentParts(state) {
  const comments = imageAnnotationIntegrationPreparedComments(state);
  let marks = '[]';
  try {
    marks = JSON.stringify(state && Array.isArray(state.marks) ? state.marks : []);
  } catch (error) {
    marks = String(state && Array.isArray(state.marks) ? state.marks.length : 0);
  }
  return { comments, marks };
}

function imageAnnotationIntegrationSameIds(left, right) {
  const a = Array.isArray(left) ? left : [];
  const b = Array.isArray(right) ? right : [];
  if (a.length !== b.length) return false;
  for (let index = 0; index < a.length; index += 1) if (a[index] !== b[index]) return false;
  return true;
}

function imageAnnotationIntegrationFileSize(bytes) {
  const value = Number(bytes);
  if (!Number.isFinite(value) || value < 0) return '';
  if (value < 1024) return value + ' B';
  if (value < 1024 * 1024) return (value / 1024).toFixed(value < 10240 ? 1 : 0) + ' KB';
  return (value / 1024 / 1024).toFixed(1) + ' MB';
}

function imageAnnotationIntegrationExtensionLabel(name) {
  const parts = imageAnnotationIntegrationSplitExtension(name);
  return parts.extension ? parts.extension.slice(1).toUpperCase().slice(0, 8) : 'FILE';
}

function imageAnnotationIntegrationSourceDimensions(source) {
  if (!source) return { width: 0, height: 0 };
  if (source.attachment) {
    return { width: Number(source.attachment.width) || 0, height: Number(source.attachment.height) || 0 };
  }
  if (source.preview) {
    return { width: Number(source.preview.width) || 0, height: Number(source.preview.height) || 0 };
  }
  return { width: 0, height: 0 };
}

// 历史图片呈现尺寸：单图长边 240、长宽比裁到 [0.25, 4] 且不放大；compact 用 64 方图。
function imageAnnotationIntegrationHistoryFit(dimensions, compact) {
  if (compact) return { width: 64, height: 64, objectPosition: 'center' };
  const width = Math.max(0, Number(dimensions && dimensions.width) || 0);
  const height = Math.max(0, Number(dimensions && dimensions.height) || 0);
  if (!width || !height) return { width: 240, height: 240, objectPosition: 'center', pending: true };
  const natural = width / height;
  const ratio = Math.min(4, Math.max(0.25, natural));
  const box = ratio >= 1 ? { width: 240, height: 240 / ratio } : { width: 240 * ratio, height: 240 };
  const scale = Math.min(1, width / box.width, height / box.height);
  return {
    width: Math.max(1, Math.round(box.width * scale)),
    height: Math.max(1, Math.round(box.height * scale)),
    objectPosition: natural < 0.25 ? 'center top' : natural > 4 ? 'left center' : 'center'
  };
}

/* ---------------------------- 浏览器小工具 ---------------------------- */

function imageAnnotationIntegrationCreateObjectUrl(value) {
  try {
    if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') return URL.createObjectURL(value);
  } catch (error) {
    // 忽略：调用方会在需要时给出明确错误。
  }
  return '';
}

function imageAnnotationIntegrationRevokeObjectUrl(url) {
  if (!url || typeof url !== 'string' || url.indexOf('blob:') !== 0) return;
  try {
    if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') URL.revokeObjectURL(url);
  } catch (error) {
    // 忽略：失效 URL 不影响功能。
  }
}

// 拖放目录识别：目录在 File 上不可区分，只能由 entry API 提供；没有该 API 时视为普通文件。
function imageAnnotationIntegrationDroppedDirectories(dataTransfer, files) {
  const directories = new Set();
  if (!dataTransfer || !dataTransfer.items) return directories;
  let fileIndex = 0;
  for (const item of dataTransfer.items) {
    if (!item || item.kind !== 'file') continue;
    const file = files[fileIndex];
    fileIndex += 1;
    if (typeof item.webkitGetAsEntry !== 'function') continue;
    let entry = null;
    try {
      entry = item.webkitGetAsEntry();
    } catch (error) {
      entry = null;
    }
    if (!entry || entry.isDirectory !== true) continue;
    if (file !== undefined) directories.add(file);
  }
  return directories;
}

// 保留宿主原生的 document 级拖放语义：拖入计数、dropEffect、目录集合、drop 后重置。
function imageAnnotationIntegrationInstallDropListeners(documentObject, windowObject, canAcceptDrop, onAddFiles, dragDepth, setDragActive) {
  if (!documentObject || typeof documentObject.addEventListener !== 'function') return () => {};
  const fileTransfer = event => {
    const dataTransfer = event && event.dataTransfer;
    if (!dataTransfer || !dataTransfer.types || typeof dataTransfer.types.includes !== 'function') return null;
    return dataTransfer.types.includes('Files') ? dataTransfer : null;
  };
  const reset = () => {
    dragDepth.current = 0;
    setDragActive(false);
  };
  const onDragEnter = event => {
    if (fileTransfer(event) === null) return;
    event.preventDefault();
    dragDepth.current += 1;
    setDragActive(true);
  };
  const onDragOver = event => {
    const dataTransfer = fileTransfer(event);
    if (dataTransfer === null) return;
    event.preventDefault();
    try {
      dataTransfer.dropEffect = canAcceptDrop ? 'copy' : 'none';
    } catch (error) {
      // 只读 dropEffect 的合成事件忽略。
    }
  };
  const onDragLeave = event => {
    if (fileTransfer(event) === null) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragActive(false);
    const viewWidth = windowObject && Number(windowObject.innerWidth) || 0;
    const viewHeight = windowObject && Number(windowObject.innerHeight) || 0;
    const leftViewport = Number(event.clientX) <= 0 || Number(event.clientY) <= 0
      || (viewWidth > 0 && Number(event.clientX) >= viewWidth)
      || (viewHeight > 0 && Number(event.clientY) >= viewHeight);
    if ((event.target === documentObject.documentElement || event.target === documentObject.body) && leftViewport) reset();
  };
  const onDrop = event => {
    const dataTransfer = fileTransfer(event);
    if (dataTransfer === null) return;
    event.preventDefault();
    reset();
    if (!canAcceptDrop) return;
    const files = dataTransfer.files ? Array.from(dataTransfer.files) : [];
    if (typeof onAddFiles !== 'function') return;
    onAddFiles(files, imageAnnotationIntegrationDroppedDirectories(dataTransfer, files));
  };
  documentObject.addEventListener('dragenter', onDragEnter);
  documentObject.addEventListener('dragover', onDragOver);
  documentObject.addEventListener('dragleave', onDragLeave);
  documentObject.addEventListener('drop', onDrop);
  if (windowObject && typeof windowObject.addEventListener === 'function') windowObject.addEventListener('dragend', reset);
  return () => {
    documentObject.removeEventListener('dragenter', onDragEnter);
    documentObject.removeEventListener('dragover', onDragOver);
    documentObject.removeEventListener('dragleave', onDragLeave);
    documentObject.removeEventListener('drop', onDrop);
    if (windowObject && typeof windowObject.removeEventListener === 'function') windowObject.removeEventListener('dragend', reset);
  };
}

/* ------------------------------ 运行时 ------------------------------ */

// 一次 mount 对应一个运行时：批注 store、目标映射、草稿状态、recall 缓存与订阅都在这里，
// 组件卸载/组件停用后整体丢弃；不写 localStorage，也不删除 Host 的持久 token 快照。
function createImageAnnotationIntegrationRuntime() {
  const revisionListeners = new Set();
  const viewerListeners = new Set();
  let revision = 0;
  let viewer = null;
  const runtime = {
    disposed: false,
    store: createImageAnnotationStore(),
    targets: new Map(),
    draftKeyByDraftId: new Map(),
    draftIdByKey: new Map(),
    recallStates: new Map(),
    recallPromises: new Map(),
    draftState: null,
    expectedDraftIds: null,
    draftErrorSink: null,
    inputActions: null,
    conversationService: null,
    remoteAccessor: null,
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      revisionListeners.add(listener);
      return () => revisionListeners.delete(listener);
    },
    getRevision() {
      return revision;
    },
    bump() {
      if (runtime.disposed) return;
      revision += 1;
      for (const listener of Array.from(revisionListeners)) {
        try {
          listener();
        } catch (error) {
          console.error('[codex-style] 图片批注订阅回调失败', error);
        }
      }
    },
    subscribeViewer(listener) {
      if (typeof listener !== 'function') return () => {};
      viewerListeners.add(listener);
      return () => viewerListeners.delete(listener);
    },
    getViewer() {
      return viewer;
    },
    setViewer(next) {
      if (runtime.disposed) return;
      viewer = next || null;
      for (const listener of Array.from(viewerListeners)) {
        try {
          listener();
        } catch (error) {
          console.error('[codex-style] 图片批注预览订阅回调失败', error);
        }
      }
    }
  };
  const offStore = runtime.store.subscribe(() => runtime.bump());
  runtime.dispose = function disposeImageAnnotationIntegrationRuntime() {
    if (runtime.disposed) return;
    runtime.disposed = true;
    offStore();
    revisionListeners.clear();
    viewerListeners.clear();
    viewer = null;
    runtime.targets.clear();
    runtime.draftKeyByDraftId.clear();
    runtime.draftIdByKey.clear();
    runtime.recallStates.clear();
    runtime.recallPromises.clear();
    runtime.draftState = null;
    runtime.expectedDraftIds = null;
    runtime.draftErrorSink = null;
    runtime.inputActions = null;
    runtime.conversationService = null;
    runtime.remoteAccessor = null;
  };
  return runtime;
}

function imageAnnotationIntegrationRemote(runtime) {
  if (!runtime || typeof runtime.remoteAccessor !== 'function') return undefined;
  try {
    return runtime.remoteAccessor();
  } catch (error) {
    return undefined;
  }
}

// 兼容两种 Remote 返回：直接返回服务结果，或传输层包一层 { ok, value }。
function imageAnnotationIntegrationRemoteValue(answer) {
  if (!answer || typeof answer !== 'object') return null;
  if (answer.ok === false) return null;
  return Object.prototype.hasOwnProperty.call(answer, 'value') ? answer.value : answer;
}

async function imageAnnotationIntegrationPrepare(runtime, sessionId, token, comments) {
  const remote = imageAnnotationIntegrationRemote(runtime);
  if (!remote || typeof remote.prepare !== 'function') throw new Error('宿主的图片批注服务尚未就绪');
  let answer;
  try {
    answer = await remote.prepare({ sessionId, token, comments });
  } catch (error) {
    throw new Error('图片批注准备失败：' + imageAnnotationErrorText(error));
  }
  const value = imageAnnotationIntegrationRemoteValue(answer);
  if (!value || value.ok === false) {
    throw new Error((value && value.error && value.error.message) || (answer && answer.error && answer.error.message) || '宿主未接受图片批注');
  }
}

async function imageAnnotationIntegrationRecall(runtime, sessionId, token) {
  const remote = imageAnnotationIntegrationRemote(runtime);
  if (!remote || typeof remote.recall !== 'function') {
    return { status: 'unavailable', error: new Error('宿主暂不支持恢复已发送图片的批注') };
  }
  let answer;
  try {
    answer = await remote.recall({ sessionId, token });
  } catch (error) {
    return { status: 'error', error };
  }
  if (!answer || answer.ok === false) {
    return { status: 'error', error: new Error((answer && answer.error && answer.error.message) || '恢复已发送图片的批注失败') };
  }
  const value = imageAnnotationIntegrationRemoteValue(answer);
  if (!value || typeof value !== 'object') return { status: 'error', error: new Error('批注恢复返回格式无效') };
  if (value.ok === false) return { status: 'missing' };
  return { status: 'ok', comments: Array.isArray(value.comments) ? value.comments : [] };
}

// 已发送图片已经烧录手绘；历史快照仅保留点评论，避免再次叠加或重复烧录。
// 刷新/重开之后内存丢失，再由 recall 从 Host 持久快照恢复 comments（marks 已烧进图片字节）。
function imageAnnotationIntegrationRememberSentState(runtime, sessionId, token, state) {
  const key = imageAnnotationIntegrationSentKey(sessionId, token);
  runtime.store.set(key, {
    comments: state && Array.isArray(state.comments) ? state.comments : [],
    marks: [],
    markupUndo: [],
    markupRedo: []
  });
}

// 当前 store 未恢复且 Host 支持 recall 时，异步恢复该 token 的评论；重复调用会自动去重。
function imageAnnotationIntegrationHydrateRecall(runtime, sessionId, token, state) {
  for (const target of runtime.targets.values()) {
    if (target.sessionId !== sessionId || target.token !== token || target.recallHydrated) continue;
    const current = runtime.store.get(target.key);
    const edited = JSON.stringify(imageAnnotationIntegrationPreparedComments(current)) !== JSON.stringify(target.syncedComments || []);
    if (!edited && JSON.stringify(current.comments) !== JSON.stringify(state.comments)) {
      runtime.store.set(target.key, { ...current, comments: state.comments });
    }
    target.syncedComments = imageAnnotationIntegrationPreparedComments(state);
    target.recallHydrated = true;
  }
}

function imageAnnotationIntegrationScheduleRecall(runtime, sessionId, target) {
  if (!runtime || runtime.disposed || !sessionId || !target || !target.token) return;
  const key = imageAnnotationIntegrationSentKey(sessionId, target.token);
  const phase = runtime.recallStates.get(key);
  if (phase && phase.phase === 'ready') {
    imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, runtime.store.get(key));
    return;
  }
  if (phase && (phase.phase === 'loading' || phase.phase === 'missing' || phase.phase === 'error')) return;
  if (runtime.recallPromises.has(key)) return;
  const local = runtime.store.get(key);
  if (local && Array.isArray(local.comments) && local.comments.length > 0) {
    imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, local);
    runtime.recallStates.set(key, { phase: 'ready' });
    return;
  }
  runtime.recallStates.set(key, { phase: 'loading' });
  runtime.bump();
  const promise = (async () => {
    const result = await imageAnnotationIntegrationRecall(runtime, sessionId, target.token);
    if (runtime.disposed) return;
    if (result.status === 'ok') {
      const existing = runtime.store.get(key);
      const merged = {
        comments: imageAnnotationIntegrationRecalledComments(target.token, result.comments),
        marks: existing && Array.isArray(existing.marks) ? existing.marks : [],
        markupUndo: [],
        markupRedo: []
      };
      runtime.store.set(key, merged);
      imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, merged);
      // token 快照已经代表当前图片内容：把它记为“已同步”，避免用户只打开/关闭预览时误判为未同步。
      target.syncedComments = imageAnnotationIntegrationPreparedComments(merged);
      target.syncedMarks = imageAnnotationIntegrationContentParts(merged).marks;
      runtime.recallStates.set(key, { phase: 'ready' });
    } else if (result.status === 'missing') {
      // 带 token 却查不到快照不能静默当无批注：给出明确错误并允许重试。
      runtime.recallStates.set(key, {
        phase: 'missing',
        missing: true,
        error: '未找到该图片已保存的批注记录'
      });
    } else {
      runtime.recallStates.set(key, {
        phase: 'error',
        unavailable: result.status === 'unavailable',
        error: imageAnnotationErrorText(result.error) || '恢复已发送图片的批注失败'
      });
    }
    runtime.bump();
  })().catch(error => {
    if (runtime.disposed) return;
    runtime.recallStates.set(key, { phase: 'error', error: imageAnnotationErrorText(error) });
    runtime.bump();
  }).finally(() => {
    runtime.recallPromises.delete(key);
  });
  runtime.recallPromises.set(key, promise);
}

function imageAnnotationIntegrationRetryRecall(runtime, sessionId, target) {
  if (!runtime || runtime.disposed || !sessionId || !target || !target.token) return;
  const key = imageAnnotationIntegrationSentKey(sessionId, target.token);
  runtime.recallStates.delete(key);
  imageAnnotationIntegrationScheduleRecall(runtime, sessionId, target);
}

function imageAnnotationIntegrationRecallError(runtime, key) {
  const phase = runtime.recallStates.get(key);
  if (!phase) return '';
  if (phase.phase === 'error' || phase.phase === 'missing') return phase.error || '批注恢复失败';
  return '';
}

/* --------------------------- 目标与草稿状态 --------------------------- */

function imageAnnotationIntegrationEnsureDraftTarget(runtime, sessionId, attachment) {
  const draftId = attachment && attachment.id;
  const fileName = attachment && attachment.file && typeof attachment.file.name === 'string' ? attachment.file.name : '';
  const parsed = imageAnnotationIntegrationParseCarrier(fileName);
  let key = runtime.draftKeyByDraftId.get(draftId);
  if (!key) key = imageAnnotationIntegrationDraftKey(sessionId, draftId);
  let target = runtime.targets.get(key);
  // 附件替换后的 store 通知可能先于 owner props 更新；旧 props 不能把目标绑回已释放的旧 id。
  if (target && target.draftId !== draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId)
    && !imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId)) return { key, target };
  if (!target) {
    const initialState = runtime.store.get(key);
    const parts = imageAnnotationIntegrationContentParts(initialState);
    target = {
      kind: 'draft',
      key,
      sessionId,
      draftId,
      token: parsed ? parsed.token : null,
      displayName: parsed ? parsed.displayName : (fileName || imageAnnotationIntegrationDefaultName),
      baseFile: attachment && attachment.file ? attachment.file : null,
      currentFile: attachment && attachment.file ? attachment.file : null,
      width: attachment && attachment.width,
      height: attachment && attachment.height,
      src: attachment && attachment.previewUrl ? attachment.previewUrl : '',
      // synced* 记录“当前草稿文件已经代表的批注内容”；null 表示未知，需要先同步一次。
      syncedComments: parsed && parsed.token ? parts.comments : [],
      syncedMarks: parsed && parsed.token ? parts.marks : '[]',
      attachment: null
    };
    runtime.targets.set(key, target);
  } else {
    target.draftId = draftId;
    target.sessionId = sessionId;
    if (attachment) {
      if (attachment.width !== undefined) target.width = attachment.width;
      if (attachment.height !== undefined) target.height = attachment.height;
      if (attachment.previewUrl) target.src = attachment.previewUrl;
      if (!target.baseFile && attachment.file) target.baseFile = attachment.file;
      if (attachment.file) target.currentFile = attachment.file;
    }
    if (parsed) {
      if (!target.token) target.token = parsed.token;
      if (!target.baseFile) target.displayName = parsed.displayName;
    }
    if (target.syncedComments === undefined) target.syncedComments = [];
    if (target.syncedMarks === undefined) target.syncedMarks = '[]';
  }
  runtime.draftKeyByDraftId.set(draftId, key);
  runtime.draftIdByKey.set(key, draftId);
  return { key, target };
}

function imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, source) {
  if (!source) return null;
  if (source.attachment) {
    const attachment = source.attachment;
    const parsed = imageAnnotationIntegrationParseCarrier(attachment.name || '');
    const token = parsed ? parsed.token : null;
    const key = token
      ? imageAnnotationIntegrationSentKey(sessionId, token)
      : imageAnnotationIntegrationHistoryKey(sessionId, attachment.attachmentId || '');
    let target = runtime.targets.get(key);
    if (!target) {
      const initialState = runtime.store.get(key);
      const parts = imageAnnotationIntegrationContentParts(initialState);
      target = {
        kind: 'history',
        key,
        sessionId,
        token,
        attachmentId: attachment.attachmentId || '',
        attachment,
        displayName: parsed ? parsed.displayName : (attachment.name || imageAnnotationIntegrationDefaultName),
        width: attachment.width,
        height: attachment.height,
        src: '',
        baseBytes: null,
        baseType: null,
        draftId: null,
        syncedComments: token ? parts.comments : [],
        syncedMarks: token ? parts.marks : '[]'
      };
      runtime.targets.set(key, target);
    } else {
      target.attachment = attachment;
      if (attachment.width !== undefined) target.width = attachment.width;
      if (attachment.height !== undefined) target.height = attachment.height;
      if (parsed) {
        target.token = token;
        target.displayName = parsed.displayName;
      }
    }
    return { key, target };
  }
  if (source.preview) {
    const preview = source.preview;
    const parsed = imageAnnotationIntegrationParseCarrier(preview.name || '');
    const token = parsed ? parsed.token : null;
    const key = token
      ? imageAnnotationIntegrationSentKey(sessionId, token)
      : imageAnnotationIntegrationPreviewKey(sessionId, preview.url || '');
    let target = runtime.targets.get(key);
    if (!target) {
      const initialState = runtime.store.get(key);
      const parts = imageAnnotationIntegrationContentParts(initialState);
      target = {
        kind: 'preview',
        key,
        sessionId,
        token,
        displayName: parsed ? parsed.displayName : (preview.name || imageAnnotationIntegrationDefaultName),
        width: preview.width,
        height: preview.height,
        src: preview.url || '',
        baseBytes: null,
        baseType: null,
        draftId: null,
        syncedComments: token ? parts.comments : [],
        syncedMarks: token ? parts.marks : '[]'
      };
      runtime.targets.set(key, target);
    } else {
      if (preview.url) target.src = preview.url;
      if (parsed) {
        target.token = token;
        target.displayName = parsed.displayName;
      }
    }
    return { key, target };
  }
  return null;
}

function imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId) {
  const state = runtime.draftState;
  return !!state && state.sessionId === sessionId && Array.isArray(state.ids) && state.ids.indexOf(draftId) >= 0;
}

function imageAnnotationIntegrationRequireDraftState(runtime, sessionId) {
  const state = runtime.draftState;
  if (!state || state.sessionId !== sessionId) throw new Error('草稿尚未就绪，请稍后重试');
  if (state.phase === 'adjudicating' || state.phase === 'submitting') throw new Error('消息正在发送，暂时无法更新图片附件');
  if (!Array.isArray(state.ids)) throw new Error('草稿附件状态不可用');
  return state;
}

function imageAnnotationIntegrationRequireInputActions(runtime) {
  const actions = runtime.inputActions;
  // 真实公开契约：addAttachments/removeAttachment 返回 void（rc.3 :14958-14960），
  // 不得把宿主内部 Shell 的 boolean 当契约使用；这里只确认方法存在。
  if (!actions || typeof actions.addAttachments !== 'function' || typeof actions.removeAttachment !== 'function') {
    throw new Error('宿主输入服务不可用，暂时无法更新草稿附件');
  }
  return actions;
}

function imageAnnotationIntegrationDraftAdd(runtime, ids) {
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  try {
    actions.addAttachments(ids.slice());
  } catch (error) {
    throw new Error('无法把图片加入草稿：' + imageAnnotationErrorText(error));
  }
}

function imageAnnotationIntegrationDraftRemove(runtime, id) {
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  try {
    actions.removeAttachment(id);
  } catch (error) {
    throw new Error('无法更新草稿图片附件：' + imageAnnotationErrorText(error));
  }
}

function imageAnnotationIntegrationReleaseDraft(runtime, draftId) {
  const conversation = runtime.conversationService;
  if (conversation && typeof conversation.releaseDraftAttachment === 'function') {
    try {
      conversation.releaseDraftAttachment(draftId);
    } catch (error) {
      console.warn('[codex-style] 释放草稿附件失败', error);
    }
  }
}

// 记录期望的附件顺序；组件在下一次 useInput 快照里核对，不一致时按期望顺序重同步。
function imageAnnotationIntegrationCommitDraftState(runtime, sessionId, ids, phase) {
  runtime.draftState = { sessionId, ids: ids.slice(), phase: phase || 'plain' };
  runtime.expectedDraftIds = { sessionId, ids: ids.slice() };
}

// void 批量重同步：先移除所有可能存在的候选 id（含重复项），再按目标顺序添加。
// 仅在可编辑（plain）状态下调用；不读取任何返回值，只以公开 actions 的真实副作用为准。
function imageAnnotationIntegrationResyncDraft(runtime, sessionId, expectedIds) {
  const state = runtime.draftState;
  if (!state || state.sessionId !== sessionId) return;
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  const counts = new Map();
  for (const id of state.ids || []) counts.set(id, (counts.get(id) || 0) + 1);
  const candidates = new Set([].concat(state.ids || [], expectedIds));
  for (const id of candidates) {
    // 同 id 可能因宿主拒绝移除而重复出现：多调用几次确保清空。
    const times = (counts.get(id) || 0) + 1;
    for (let attempt = 0; attempt < times; attempt += 1) {
      try {
        actions.removeAttachment(id);
      } catch (error) {
        // 单步失败继续尝试；最终由下一次快照核对暴露问题。
      }
    }
  }
  for (const id of expectedIds) actions.addAttachments([id]);
  runtime.draftState = { sessionId, ids: expectedIds.slice(), phase: state.phase || 'plain' };
}

function imageAnnotationIntegrationRestoreDraft(runtime, sessionId, originalIds, newDraftId) {
  const actions = runtime.inputActions;
  if (!actions) return;
  const candidates = new Set([].concat(originalIds, [newDraftId], runtime.draftState && runtime.draftState.ids ? runtime.draftState.ids : []));
  for (const id of candidates) {
    try {
      actions.removeAttachment(id);
    } catch (error) {
      // 尽力恢复；忽略单步失败。
    }
  }
  try {
    actions.addAttachments(originalIds.slice());
  } catch (error) {
    console.warn('[codex-style] 恢复草稿附件失败', error);
  }
  runtime.draftState = { sessionId, ids: originalIds.slice(), phase: runtime.draftState ? runtime.draftState.phase : 'plain' };
  // 让下一次快照核对继续兜底（若宿主侧仍未恢复成功，会在组件里重同步一次并报错）。
  runtime.expectedDraftIds = { sessionId, ids: originalIds.slice() };
}

// 追加新草稿附件（历史图片首次批注）：顺序追加，不改历史消息。
function imageAnnotationIntegrationAppendDraft(runtime, sessionId, target, newDraftId) {
  const state = imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  imageAnnotationIntegrationDraftAdd(runtime, [newDraftId]);
  const ids = state.ids.concat([newDraftId]);
  imageAnnotationIntegrationCommitDraftState(runtime, sessionId, ids, state.phase);
  runtime.draftKeyByDraftId.set(newDraftId, target.key);
  runtime.draftIdByKey.set(target.key, newDraftId);
  target.draftId = newDraftId;
  return ids;
}

// 原位替换草稿附件：先追加新附件，再按“移除旧 → 依次把旧位置之后的附件移到末尾”重排，
// 保证 Image N 顺序不变；全程同步、不读返回值、不中途 await；旧附件在成功后才会 release。
function imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, newDraftId) {
  const state = imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  const originalIds = state.ids.slice();
  const oldDraftId = target.draftId;
  const index = originalIds.indexOf(oldDraftId);
  if (index < 0) throw new Error('原图片附件已不在草稿中');
  imageAnnotationIntegrationDraftAdd(runtime, [newDraftId]);
  try {
    imageAnnotationIntegrationDraftRemove(runtime, oldDraftId);
    const tail = originalIds.slice(index + 1);
    for (const id of tail) {
      imageAnnotationIntegrationDraftRemove(runtime, id);
      imageAnnotationIntegrationDraftAdd(runtime, [id]);
    }
  } catch (error) {
    // 恢复原顺序；新 draft 由上层 SyncTarget 统一释放，避免重复 release。
    imageAnnotationIntegrationRestoreDraft(runtime, sessionId, originalIds, newDraftId);
    throw new Error('草稿图片顺序更新失败，请重试');
  }
  const finalIds = originalIds.slice(0, index).concat([newDraftId], originalIds.slice(index + 1));
  imageAnnotationIntegrationCommitDraftState(runtime, sessionId, finalIds, state.phase);
  imageAnnotationIntegrationReleaseDraft(runtime, oldDraftId);
  runtime.draftKeyByDraftId.delete(oldDraftId);
  runtime.draftKeyByDraftId.set(newDraftId, target.key);
  runtime.draftIdByKey.set(target.key, newDraftId);
  target.draftId = newDraftId;
  return finalIds;
}

// 判断目标内容是否还没有同步进当前草稿文件；以“最后一次成功同步的内容”为准，
// 不能使用 viewer 打开时的本地快照（否则关闭/重开会把未 prepare 的草稿误判成已同步）。
function imageAnnotationIntegrationTargetDirty(runtime, sessionId, target, state) {
  const parts = imageAnnotationIntegrationContentParts(state);
  const hasDraft = !!target.draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId);
  if (parts.comments.length === 0 && parts.marks === '[]' && !hasDraft) return false;
  if (target.syncedComments === undefined || target.syncedComments === null || target.syncedMarks === undefined || target.syncedMarks === null) return true;
  const syncedComments = Array.isArray(target.syncedComments) ? target.syncedComments : [];
  return JSON.stringify(parts.comments) !== JSON.stringify(syncedComments) || parts.marks !== target.syncedMarks;
}

/* ------------------------------ 图片字节 ------------------------------ */

// 读取目标的原图字节：草稿图取创建时保存的原始 File；历史图在内存缓存中取，
// 没有缓存时用槽位授权的 loadImage URL（blob:）一次性读取。原始 bytes 只留内存，不写 localStorage。
async function imageAnnotationIntegrationBaseSource(runtime, target) {
  if (target.kind === 'draft') {
    if (!target.baseFile) throw new Error('缺少原图数据，无法导出批注');
    const url = imageAnnotationIntegrationCreateObjectUrl(target.baseFile);
    return {
      blob: target.baseFile,
      type: target.baseFile.type || 'image/png',
      displayName: target.displayName || imageAnnotationIntegrationDefaultName,
      src: url,
      release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
    };
  }
  if (target.baseBytes) {
    const url = imageAnnotationIntegrationCreateObjectUrl(target.baseBytes);
    return {
      blob: target.baseBytes,
      type: target.baseType || target.baseBytes.type || 'image/png',
      displayName: target.displayName || imageAnnotationIntegrationDefaultName,
      src: url,
      release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
    };
  }
  if (!target.src) throw new Error('图片尚未加载完成，请稍后重试');
  let response;
  try {
    if (typeof fetch !== 'function') throw new Error('当前环境不支持读取图片');
    response = await fetch(target.src);
  } catch (error) {
    throw new Error('读取原图失败：' + imageAnnotationErrorText(error));
  }
  if (!response || (typeof response.ok === 'boolean' && !response.ok)) throw new Error('读取原图失败');
  let blob;
  try {
    blob = await response.blob();
  } catch (error) {
    throw new Error('读取原图失败：' + imageAnnotationErrorText(error));
  }
  target.baseBytes = blob;
  target.baseType = blob && blob.type ? blob.type : 'image/png';
  const url = imageAnnotationIntegrationCreateObjectUrl(blob);
  return {
    blob,
    type: target.baseType,
    displayName: target.displayName || imageAnnotationIntegrationDefaultName,
    src: url,
    release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
  };
}

// 由当前批注状态生成待发送文件：有 comments 先 prepare 再用 token 载体名；
// 有 marks 时从原图重新烧录（绝不在已烧录图上二次合成）；两者皆无则回退无 token 原图。
async function imageAnnotationIntegrationBuildTargetFile(runtime, target, state) {
  if (typeof File !== 'function') throw new Error('当前环境不支持生成图片文件');
  const comments = imageAnnotationIntegrationPreparedComments(state);
  const marks = state && Array.isArray(state.marks) ? state.marks : [];
  const token = comments.length > 0 ? imageAnnotationIntegrationUuid() : null;
  if (token) await imageAnnotationIntegrationPrepare(runtime, target.sessionId, token, comments);
  const base = await imageAnnotationIntegrationBaseSource(runtime, target);
  try {
    let blob;
    let type;
    let burned = false;
    if (marks.length > 0) {
      blob = await exportImageAnnotationImage({
        key: target.key,
        src: base.src,
        name: base.displayName,
        width: base.width,
        height: base.height
      }, { comments: [], marks });
      type = 'image/png';
      burned = true;
    } else {
      blob = base.blob;
      type = base.type || 'image/png';
    }
    const parts = imageAnnotationIntegrationSplitExtension(base.displayName);
    const displayName = burned ? parts.base + '.png' : base.displayName;
    const name = token
      ? imageAnnotationIntegrationCarrierName(base.displayName, token, burned ? '.png' : undefined)
      : displayName;
    return {
      token,
      file: new File([blob], name, { type }),
      displayName,
      comments,
      marks
    };
  } finally {
    base.release();
  }
}

// 把一次完成/清除同步到草稿：prepare（或空）→ 生成文件 → createDrafts → 原位替换/追加。
// 每个 await 之后都检查组件是否已被停用：停用后不再创建/改动草稿，避免留下孤立附件。
async function imageAnnotationIntegrationSyncTarget(runtime, sessionId, target, state) {
  const conversation = runtime.conversationService;
  if (!conversation || typeof conversation.createDrafts !== 'function') throw new Error('宿主的会话服务尚未就绪');
  const built = await imageAnnotationIntegrationBuildTargetFile(runtime, target, state);
  if (runtime.disposed) throw new Error('图片批注组件已停用');
  imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  imageAnnotationIntegrationRequireInputActions(runtime);
  let drafts;
  try {
    drafts = conversation.createDrafts(sessionId, [built.file]);
  } catch (error) {
    throw new Error('无法把批注图片加入草稿：' + imageAnnotationErrorText(error));
  }
  if (runtime.disposed) {
    const created = Array.isArray(drafts) ? drafts[0] : drafts;
    if (created && created.id) imageAnnotationIntegrationReleaseDraft(runtime, created.id);
    throw new Error('图片批注组件已停用');
  }
  const draft = Array.isArray(drafts) ? drafts[0] : drafts;
  if (!draft || !draft.id) throw new Error('无法把批注图片加入草稿');
  try {
    if (target.draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId)) {
      imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, draft.id);
    } else {
      imageAnnotationIntegrationAppendDraft(runtime, sessionId, target, draft.id);
    }
  } catch (error) {
    imageAnnotationIntegrationReleaseDraft(runtime, draft.id);
    throw error;
  }
  target.token = built.token;
  target.displayName = built.displayName;
  target.currentFile = built.file;
  target.syncedComments = built.comments;
  target.syncedMarks = imageAnnotationIntegrationContentParts({ marks: built.marks }).marks;
  if (built.token) {
    imageAnnotationIntegrationRememberSentState(runtime, sessionId, built.token, runtime.store.get(target.key));
    // token 载体已经代表当前批注内容：历史/回显出现该 token 时无需再当作未同步。
  }
  runtime.bump();
  return built;
}

// 胶囊叉号：清空这张图的评论但保留图片与手绘；若当前草稿里该图带着已 prepare 的 token，
// 同步换成无 token 文件（保留 marks），避免下一条消息继续携带旧批注快照。
async function imageAnnotationIntegrationClearComments(runtime, sessionId, target) {
  const previousToken = target.token;
  const state = runtime.store.get(target.key);
  const comments = state && Array.isArray(state.comments) ? state.comments : [];
  const marks = state && Array.isArray(state.marks) ? state.marks : [];
  if (!comments.length) return false;
  const draftId = target.draftId;
  const draftLive = draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId);
  if (draftLive && target.token) {
    const built = await imageAnnotationIntegrationBuildTargetFile(runtime, target, { comments: [], marks });
    if (runtime.disposed) throw new Error('图片批注组件已停用');
    const conversation = runtime.conversationService;
    if (!conversation || typeof conversation.createDrafts !== 'function') throw new Error('宿主的会话服务尚未就绪');
    let drafts;
    try {
      drafts = conversation.createDrafts(sessionId, [built.file]);
    } catch (error) {
      throw new Error('无法更新草稿图片：' + imageAnnotationErrorText(error));
    }
    if (runtime.disposed) {
      const created = Array.isArray(drafts) ? drafts[0] : drafts;
      if (created && created.id) imageAnnotationIntegrationReleaseDraft(runtime, created.id);
      throw new Error('图片批注组件已停用');
    }
    const draft = Array.isArray(drafts) ? drafts[0] : drafts;
    if (!draft || !draft.id) throw new Error('无法更新草稿图片');
    try {
      imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, draft.id);
    } catch (error) {
      imageAnnotationIntegrationReleaseDraft(runtime, draft.id);
      throw error;
    }
    target.displayName = built.displayName;
    target.currentFile = built.file;
    target.syncedComments = [];
    target.syncedMarks = imageAnnotationIntegrationContentParts({ marks }).marks;
  } else {
    // 草稿里本来就是无 token 文件：只清本地评论；marks 是否已烧录以最后一次成功同步为准，保持不变。
    target.syncedComments = [];
  }
  if (previousToken) {
    const remote = imageAnnotationIntegrationRemote(runtime);
    if (!remote || typeof remote.clear !== 'function') throw new Error('宿主批注删除服务尚未就绪，请重试');
    const answer = imageAnnotationIntegrationRemoteValue(await remote.clear({ sessionId, token: previousToken }));
    if (runtime.disposed) return false;
    if (!answer || answer.ok !== true) throw new Error('保存批注删除状态失败，请重试');
    runtime.store.clearComments(imageAnnotationIntegrationSentKey(sessionId, previousToken));
    for (const related of runtime.targets.values()) {
      if (related.sessionId !== sessionId || related.token !== previousToken) continue;
      runtime.store.clearComments(related.key);
      related.syncedComments = [];
    }
    if (draftLive) target.token = null;
  }
  if (marks.length > 0) runtime.store.clearComments(target.key);
  else runtime.store.clear(target.key);
  runtime.bump();
  return true;
}

/* ------------------------------ 预览流程 ------------------------------ */

function imageAnnotationIntegrationOpenViewer(runtime, sessionId, kind, images, initialIndex) {
  if (!runtime || runtime.disposed) return;
  const list = Array.isArray(images) ? images.filter(image => image && image.key !== undefined) : [];
  if (!list.length) return;
  const index = Math.max(0, Math.min(Math.round(Number(initialIndex) || 0), list.length - 1));
  // 不记录 viewer 打开时的本地 store 快照：是否同步以每个 target 的“最后成功同步内容”为准，
  // 否则“新增评论 → 关闭预览 → 重新打开 → 完成”会因为基线包含本地评论而漏 prepare。
  runtime.setViewer({ sessionId, kind, images: list, initialIndex: index });
}

function imageAnnotationIntegrationCloseViewer(runtime) {
  if (!runtime || runtime.disposed) return;
  runtime.setViewer(null);
}

// “完成批注”：以 target.synced* 判断哪些图片有真正未同步的改动；无改动完成不产生任何附件。
// prepare/替换失败或部分成功时，只更新已成功 target 的同步记录；关闭/重开不会把未同步草稿标成已同步。
async function imageAnnotationIntegrationCompleteViewer(runtime, viewer, payload) {
  if (!runtime || runtime.disposed || !viewer) return;
  const sessionId = viewer.sessionId;
  const all = payload && Array.isArray(payload.all) ? payload.all : [];
  const dirty = [];
  for (const item of all) {
    if (!item || item.key === undefined) continue;
    const target = runtime.targets.get(item.key);
    if (!target) continue;
    const state = runtime.store.get(item.key);
    if (imageAnnotationIntegrationTargetDirty(runtime, sessionId, target, state)) dirty.push({ item, target, state });
  }
  if (!dirty.length) return;
  for (const entry of dirty) {
    if (runtime.disposed) throw new Error('图片批注组件已停用');
    await imageAnnotationIntegrationSyncTarget(runtime, sessionId, entry.target, entry.state);
  }
}

/* ------------------------------ React 基础设施 ------------------------------ */

function imageAnnotationIntegrationNoopHook() {
  return undefined;
}

// 订阅运行时 revision：store、映射、recall 状态变化都会刷新胶囊/marker。
function imageAnnotationIntegrationUseRevision(runtime) {
  const [revision, setRevision] = useState(() => runtime.getRevision());
  useEffect(() => {
    if (!runtime || runtime.disposed) return undefined;
    const off = runtime.subscribe(() => {
      if (!runtime.disposed) setRevision(runtime.getRevision());
    });
    setRevision(runtime.getRevision());
    return off;
  }, [runtime]);
  return revision;
}

function imageAnnotationIntegrationUseViewer(runtime) {
  const [viewer, setLocalViewer] = useState(() => runtime.getViewer());
  useEffect(() => {
    if (!runtime || runtime.disposed) return undefined;
    const off = runtime.subscribeViewer(() => {
      if (!runtime.disposed) setLocalViewer(runtime.getViewer());
    });
    setLocalViewer(runtime.getViewer());
    return off;
  }, [runtime]);
  return viewer;
}

/* ------------------------------ 组件：拖放遮罩 ------------------------------ */

function ImageAnnotationDropOverlay(props) {
  const blocked = props.blocked === true;
  const limits = props.limits || null;
  const desc = limits && Number(limits.count) > 0
    ? '最多 ' + limits.count + ' 张图片' + (limits.size ? '，每张不超过 ' + limits.size : '')
    : '';
  return h('div', { className: 'dsc-iai-drop' + (blocked ? ' is-blocked' : ''), 'data-slot': 'image-annotation-drop', 'aria-hidden': true },
    h('div', { className: 'dsc-iai-drop-card' },
      h('div', { className: 'dsc-iai-drop-title' }, blocked ? '消息发送中，暂不能添加附件' : '拖放图片或文件到此处'),
      !blocked && desc ? h('div', { className: 'dsc-iai-drop-desc' }, desc) : null));
}

/* ------------------------------ 组件：文件卡 ------------------------------ */

function imageAnnotationIntegrationRenderFileCard(attachment, uploads, props) {
  const upload = uploads ? uploads[attachment.id] : undefined;
  const state = upload === undefined || upload.status === 'uploading' ? 'uploading'
    : upload.status === 'ready' ? 'ready' : 'error';
  const file = attachment.file || {};
  const name = file.name || '文件';
  const bytes = Number(file.size) || 0;
  const extension = imageAnnotationIntegrationExtensionLabel(name);
  const meta = state === 'uploading'
    ? '正在上传'
    : state === 'error'
      ? '上传失败，点击重试'
      : [extension, imageAnnotationIntegrationFileSize(bytes)].filter(Boolean).join(' ');
  const progress = state === 'uploading' && upload && Number(upload.total) > 0
    ? Math.min(1, Math.max(0, Number(upload.loaded) / Number(upload.total)))
    : undefined;
  return h('div', { key: attachment.id, className: 'dsc-iai-file' + (state === 'error' ? ' is-error' : ''), title: name, 'data-file-id': attachment.id },
    h('span', { className: 'dsc-iai-file-icon', 'aria-hidden': true },
      state === 'uploading' ? h('span', { className: 'dsc-iai-spinner' }) : extension),
    state === 'error'
      ? h('button', {
        type: 'button',
        className: 'dsc-iai-file-body dsc-iai-file-retry',
        'aria-label': '重试上传 ' + name,
        onClick: () => { if (typeof props.onRetryFile === 'function') props.onRetryFile(attachment.id); }
      },
        h('span', { className: 'dsc-iai-file-name' }, name),
        h('span', { className: 'dsc-iai-file-meta is-error' }, meta))
      : h('span', { className: 'dsc-iai-file-body' },
        h('span', { className: 'dsc-iai-file-name' }, name),
        h('span', { className: 'dsc-iai-file-meta' }, meta)),
    h('button', {
      type: 'button',
      className: 'dsc-iai-remove',
      title: '移除附件',
      'aria-label': '移除附件 ' + name,
      onClick: event => {
        event.stopPropagation();
        if (typeof props.onRemoveAttachment === 'function') props.onRemoveAttachment(attachment.id);
      }
    }, imageAnnotationIcon('close', 12)),
    state === 'uploading'
      ? h('span', { className: 'dsc-iai-progress', 'aria-hidden': true },
        h('span', { className: 'dsc-iai-progress-bar', style: progress === undefined ? undefined : { width: (progress * 100).toFixed(1) + '%' } }))
      : null);
}

/* --------------------------- 组件：待发附件 rail --------------------------- */

function makeImageAnnotationIntegrationComposer(runtime) {
  return function CodexImageAnnotationComposer(props) {
    const sessionId = props.sessionId;
    const attachments = Array.isArray(props.attachments) ? props.attachments : [];
    const canAcceptDrop = props.canAcceptDrop === true;
    const uploads = props.uploads || {};
    const dropLimits = props.dropLimits;
    const useInputHook = typeof props.useInput === 'function' ? props.useInput : imageAnnotationIntegrationNoopHook;
    const input = useInputHook(state => state);
    imageAnnotationIntegrationUseRevision(runtime);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const dragDepth = useRef(0);
    const railRef = useRef(null);
    const lastCount = useRef(0);

    // 草稿同步失败/自动重同步的可见错误出口。
    useEffect(() => {
      runtime.draftErrorSink = message => setError(message ? String(message) : '');
      return () => {
        if (runtime.draftErrorSink) runtime.draftErrorSink = null;
      };
    }, []);

    // 供“完成批注”同步排序使用的最新草稿状态；同时用公开 useInput 的最新快照核对
    // 上一次 void 批量替换/重排的实际结果，不一致时按期望顺序重同步一次（不依赖任何返回值）。
    useEffect(() => {
      if (!sessionId || !input) return;
      const ids = Array.isArray(input.attachmentIds) ? input.attachmentIds.slice() : [];
      runtime.draftState = { sessionId, ids, phase: input.phase || 'plain' };
      runtime.inputActions = props.inputActions || null;
      const expected = runtime.expectedDraftIds;
      if (!expected || expected.sessionId !== sessionId) return;
      if (imageAnnotationIntegrationSameIds(ids, expected.ids)) {
        runtime.expectedDraftIds = null;
        return;
      }
      if (!expected.retried) {
        expected.retried = true;
        try {
          imageAnnotationIntegrationResyncDraft(runtime, sessionId, expected.ids);
        } catch (failure) {
          runtime.expectedDraftIds = null;
          if (typeof runtime.draftErrorSink === 'function') runtime.draftErrorSink('草稿附件同步失败：' + imageAnnotationErrorText(failure));
        }
        return;
      }
      runtime.expectedDraftIds = null;
      if (typeof runtime.draftErrorSink === 'function') runtime.draftErrorSink('草稿附件同步失败：宿主附件顺序未能恢复，请检查后重试。');
    }, [sessionId, input && input.attachmentIds, input && input.phase, props.inputActions]);

    // 文档级拖放监听：与宿主原生语义一致（文件类型判断、嵌套 drag 计数、目录集合、可接受状态）。
    useEffect(() => {
      if (typeof document === 'undefined') return undefined;
      const windowObject = typeof window === 'undefined' ? undefined : window;
      return imageAnnotationIntegrationInstallDropListeners(
        document,
        windowObject,
        canAcceptDrop,
        props.onAddFiles,
        dragDepth,
        setDragActive
      );
    }, [canAcceptDrop, props.onAddFiles]);

    // 新附件加入后滚动到 rail 末尾，保持宿主原有“新项可见”行为。
    useEffect(() => {
      const count = attachments.length;
      if (count > lastCount.current && railRef.current) {
        const node = railRef.current;
        try {
          node.scrollLeft = node.scrollWidth;
        } catch (failure) {
          // 合成环境可能没有滚动属性。
        }
      }
      lastCount.current = count;
    }, [attachments.length]);

    if (!sessionId) return null;

    const imageItems = [];
    const imageItemByDraftId = new Map();
    for (const attachment of attachments) {
      if (!attachment || attachment.kind !== 'image') continue;
      const info = imageAnnotationIntegrationEnsureDraftTarget(runtime, sessionId, attachment);
      const item = { key: info.key, target: info.target, attachment };
      imageItems.push(item);
      imageItemByDraftId.set(attachment.id, item);
    }

    // 草稿图若已带 token（本运行时同步过，或宿主恢复了带 token 的草稿），尝试 recall 找回评论。
    const recallTokens = imageItems.map(item => item.target.token || '').join('|');
    useEffect(() => {
      for (const item of imageItems) {
        if (item.target.token) imageAnnotationIntegrationScheduleRecall(runtime, sessionId, item.target);
      }
    }, [sessionId, recallTokens]);

    const openViewerAt = index => {
      const viewerImages = imageItems.map(item => ({
        key: item.key,
        src: item.attachment.previewUrl || item.target.src || '',
        name: item.target.displayName,
        width: item.attachment.width,
        height: item.attachment.height
      }));
      imageAnnotationIntegrationOpenViewer(runtime, sessionId, 'draft', viewerImages, index);
    };

    const clearItem = async item => {
      setError('');
      try {
        await imageAnnotationIntegrationClearComments(runtime, sessionId, item.target);
      } catch (failure) {
        setError('清除图片批注失败：' + imageAnnotationErrorText(failure));
      }
    };

    const children = [];
    for (const attachment of attachments) {
      if (attachment.kind === 'file') {
        children.push(imageAnnotationIntegrationRenderFileCard(attachment, uploads, props));
        continue;
      }
      const item = imageItemByDraftId.get(attachment.id);
      if (!item) continue;
      const count = runtime.store.get(item.key).comments.length;
      const recallError = imageAnnotationIntegrationRecallError(runtime, imageAnnotationIntegrationSentKey(sessionId, item.target.token || ''));
      children.push(h('div', { key: attachment.id, className: 'dsc-iai-rail-item', 'data-image-id': attachment.id },
        h('div', { className: 'dsc-iai-rail-image' },
          h('button', {
            type: 'button',
            className: 'dsc-iai-thumb',
            title: '预览并批注 ' + item.target.displayName,
            'aria-label': '预览并批注 ' + item.target.displayName,
            onClick: () => openViewerAt(imageItems.indexOf(item))
          }, h('img', { src: attachment.previewUrl, alt: item.target.displayName })),
          h('button', {
            type: 'button',
            className: 'dsc-iai-remove',
            title: '移除附件',
            'aria-label': '移除附件 ' + item.target.displayName,
            onClick: event => {
              event.stopPropagation();
              if (typeof props.onRemoveAttachment === 'function') props.onRemoveAttachment(attachment.id);
            }
          }, imageAnnotationIcon('close', 12))),
        count > 0
          ? h('div', { className: 'dsc-iai-pill-row' },
            h(ImageAnnotationPill, {
              count,
              onOpen: () => openViewerAt(imageItems.indexOf(item)),
              onClear: () => { void clearItem(item); }
            }))
          : null,
        recallError
          ? h('button', {
            type: 'button',
            className: 'dsc-iai-recall-error',
            title: recallError,
            onClick: () => imageAnnotationIntegrationRetryRecall(runtime, sessionId, item.target)
          }, '批注恢复失败 · 重试')
          : null));
    }

    return h('div', { className: 'dsc-iai-rail-wrap', 'data-slot': 'image-annotation-attachments' },
      dragActive ? h(ImageAnnotationDropOverlay, { blocked: !canAcceptDrop, limits: dropLimits }) : null,
      children.length > 0
        ? h('div', {
          className: 'dsc-iai-rail',
          ref: railRef,
          onWheel: event => {
            const node = railRef.current;
            if (!node || !event || !event.deltaY) return;
            if (node.scrollWidth <= node.clientWidth) return;
            node.scrollLeft += event.deltaY;
          }
        }, children)
        : null,
      error ? h('div', { className: 'dsc-iai-inline-error', role: 'alert' }, error) : null);
  };
}

/* --------------------------- 组件：历史用户图片 --------------------------- */

/* --------------------------- 组件：历史用户图片 --------------------------- */

// 单张历史/回显图片：durable 走授权 loadImage，本地回显直接用 object URL；每张独立 recall/胶囊。
function imageAnnotationIntegrationHistoryCell(props) {
  const runtime = props.runtime;
  const sessionId = props.sessionId;
  const source = props.source;
  const index = props.index;
  const loadImage = props.loadImage;
  imageAnnotationIntegrationUseRevision(runtime);
  const [loaded, setLoaded] = useState(() => (source && source.preview && source.preview.url ? source.preview.url : null));
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [actionError, setActionError] = useState('');

  const targetInfo = sessionId && source ? imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, source) : null;
  const attachment = source && source.attachment ? source.attachment : null;
  const preview = source && source.preview ? source.preview : null;

  // 历史/回显图片：durable 走授权 loadImage；本地回显直接用自己的 object URL。
  useEffect(() => {
    if (!targetInfo) return undefined;
    if (preview) {
      setLoaded(preview.url || null);
      setLoadError(false);
      if (preview.url) {
        targetInfo.target.src = preview.url;
        if (typeof props.onLoaded === 'function') props.onLoaded(index, preview.url);
      }
      return undefined;
    }
    if (!attachment || typeof loadImage !== 'function') {
      setLoadError(true);
      return undefined;
    }
    let live = true;
    setLoadError(false);
    Promise.resolve(loadImage(attachment)).then(url => {
      if (!live) return;
      setLoaded(url || null);
      if (url) {
        targetInfo.target.src = url;
        if (typeof props.onLoaded === 'function') props.onLoaded(index, url);
      }
    }).catch(() => {
      if (live) setLoadError(true);
    });
    return () => { live = false; };
  }, [sessionId, attachment, preview && preview.url, loadImage, attempt]);

  // 已发送图片带 token 且本地 store 未恢复时，用 Host 持久快照恢复评论。
  const recallToken = targetInfo && targetInfo.target.token ? targetInfo.target.token : '';
  useEffect(() => {
    if (sessionId && targetInfo && recallToken) imageAnnotationIntegrationScheduleRecall(runtime, sessionId, targetInfo.target);
  }, [sessionId, recallToken]);

  if (!source || !targetInfo) return null;

  const count = runtime.store.get(targetInfo.key).comments.length;
  const recallError = imageAnnotationIntegrationRecallError(runtime, targetInfo.key);
  const dimensions = imageAnnotationIntegrationSourceDimensions(source);
  const fit = imageAnnotationIntegrationHistoryFit(dimensions, props.compact === true);
  const displayName = targetInfo.target.displayName;
  const src = loaded || (preview && preview.url) || null;

  const openViewer = () => {
    if (typeof props.onOpen === 'function') props.onOpen(index);
  };

  const clearItem = async () => {
    setActionError('');
    try {
      await imageAnnotationIntegrationClearComments(runtime, sessionId, targetInfo.target);
    } catch (failure) {
      setActionError('清除图片批注失败：' + imageAnnotationErrorText(failure));
    }
  };

  const retryRecall = () => {
    setActionError('');
    imageAnnotationIntegrationRetryRecall(runtime, sessionId, targetInfo.target);
  };

  return h('div', { className: 'dsc-iai-history', 'data-align': props.align === 'start' ? 'start' : 'end' },
    loadError
      ? h('button', {
        type: 'button',
        className: 'dsc-iai-history-error',
        'aria-label': '图片加载失败，点击重试',
        onClick: () => setAttempt(value => value + 1)
      }, '图片加载失败 · 重试')
      : h('button', {
        type: 'button',
        className: 'dsc-iai-history-frame',
        style: { width: fit.width + 'px', height: fit.height + 'px' },
        title: '预览并批注 ' + displayName,
        'aria-label': '预览并批注 ' + displayName,
        onClick: openViewer
      },
        src
          ? h('img', { src, alt: displayName, style: { objectPosition: fit.objectPosition } })
          : h('span', { className: 'dsc-iai-history-loading' }, '加载中…')),
    count > 0
      ? h('div', { className: 'dsc-iai-pill-row' },
        h(ImageAnnotationPill, { count, onOpen: openViewer, onClear: () => { void clearItem(); } }))
      : null,
    recallError
      ? h('button', { type: 'button', className: 'dsc-iai-recall-error', title: recallError, onClick: retryRecall }, '批注恢复失败 · 重试')
      : null,
    actionError ? h('div', { className: 'dsc-iai-inline-error', role: 'alert' }, actionError) : null);
}

// 一个历史图片 slot：普通 Chat 每次传 1 张；若某个 owner 一次传多张，则完整渲染并支持多图预览导航。
function makeImageAnnotationIntegrationMessageImage(runtime) {
  return function CodexImageAnnotationMessageImages(props) {
    const sessionId = props.sessionId;
    const sources = Array.isArray(props.images) ? props.images : [];
    imageAnnotationIntegrationUseRevision(runtime);
    const loadedRef = useRef(new Map());
    const registerLoaded = useCallback((index, url) => {
      if (url) loadedRef.current.set(index, url);
      else loadedRef.current.delete(index);
    }, []);

    const openAt = async index => {
      if (!sessionId || runtime.disposed) return;
      const entries = [];
      for (let position = 0; position < sources.length; position += 1) {
        const info = imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, sources[position]);
        if (!info) continue;
        let src = loadedRef.current.get(position) || info.target.src || (sources[position].preview && sources[position].preview.url) || '';
        if (!src && typeof props.loadImage === 'function' && sources[position].attachment) {
          try {
            src = await props.loadImage(sources[position].attachment);
          } catch (failure) {
            src = '';
          }
          if (runtime.disposed) return;
          if (src) {
            info.target.src = src;
            loadedRef.current.set(position, src);
          }
        }
        const dimensions = imageAnnotationIntegrationSourceDimensions(sources[position]);
        entries.push({
          key: info.key,
          src: src || '',
          name: info.target.displayName,
          width: dimensions.width,
          height: dimensions.height,
          sourceIndex: position
        });
      }
      if (!entries.length) return;
      const found = entries.findIndex(entry => entry.sourceIndex === index);
      imageAnnotationIntegrationOpenViewer(runtime, sessionId, 'history', entries, found >= 0 ? found : 0);
    };

    if (!sources.length) return null;
    const cells = sources.map((source, index) => h(imageAnnotationIntegrationHistoryCell, {
      key: 'history-image:' + index,
      runtime,
      sessionId,
      source,
      index,
      loadImage: props.loadImage,
      align: props.align,
      compact: props.compact,
      onOpen: openAt,
      onLoaded: registerLoaded
    }));
    if (cells.length === 1) return cells[0];
    return h('div', { className: 'dsc-iai-history-group', 'data-align': props.align === 'start' ? 'start' : 'end' }, cells);
  };
}

/* --------------------------- 组件：预览宿主 --------------------------- */

function makeImageAnnotationIntegrationHost(runtime) {
  return function CodexImageAnnotationHost() {
    const viewer = imageAnnotationIntegrationUseViewer(runtime);
    if (!viewer || typeof document === 'undefined' || typeof createPortal !== 'function') return null;
    const viewerNode = h(ImageAnnotationViewer, {
      images: viewer.images,
      initialIndex: viewer.initialIndex,
      store: runtime.store,
      onClose: () => imageAnnotationIntegrationCloseViewer(runtime),
      onComplete: payload => imageAnnotationIntegrationCompleteViewer(runtime, viewer, payload)
    });
    return createPortal(viewerNode, document.body);
  };
}

/* ------------------------------ 样式与 Remote ------------------------------ */

function imageAnnotationIntegrationInstallStyles() {
  if (typeof document === 'undefined' || typeof document.createElement !== 'function') return () => {};
  const style = document.createElement('style');
  style.dataset.dscImageAnnotations = '';
  style.textContent = [imageAnnotationIntegrationUiCssText, imageAnnotationIntegrationOwnCssText].filter(Boolean).join('\n');
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}

// 客户端 Remote：准备、恢复和显式清除均使用本插件公开服务。
function mountImageAnnotationIntegrationRemote(ctx) {
  const { z } = require('zod');
  const comment = z.object({
    text: z.string().min(1),
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1)
  }).strict();
  const prepareRequest = z.object({
    sessionId: z.string().min(1),
    token: z.string().uuid(),
    comments: z.array(comment).min(1)
  }).strict();
  const prepareResult = z.object({ ok: z.boolean() }).passthrough();
  const recallRequest = z.object({
    sessionId: z.string().min(1),
    token: z.string().uuid()
  }).strict();
  const recallResult = z.object({
    ok: z.boolean(),
    comments: z.array(comment).optional()
  }).passthrough();
  const remote = ctx.remote && typeof ctx.remote.$mount === 'function' ? ctx.remote : null;
  if (!remote) throw new Error('remote 服务尚未就绪');
  return remote.$mount({
    package: PLUGIN_PACKAGE,
    descriptors: [
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/clear',
        service: 'codexStyleImageAnnotations', namespace: 'codexStyleImageAnnotations', method: 'clear',
        invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: {
          mode: 'strict', typeSymbol: PLUGIN_PACKAGE + '#image-annotations-clear',
          create: () => recallRequest, jsonSchema: { type: 'object' }
        } }],
        result: { mode: 'strict', typeSymbol: PLUGIN_PACKAGE + '#image-annotations-clear-result', create: () => prepareResult }
      },
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/prepare',
        service: 'codexStyleImageAnnotations',
        namespace: 'codexStyleImageAnnotations',
        method: 'prepare',
        invocation: { kind: 'direct' },
        parameters: [{
          name: 'request',
          wire: 'request',
          source: 'json',
          codec: {
            mode: 'strict',
            typeSymbol: PLUGIN_PACKAGE + '#image-annotations-prepare',
            create: () => prepareRequest,
            jsonSchema: { type: 'object' }
          }
        }],
        result: {
          mode: 'strict',
          typeSymbol: PLUGIN_PACKAGE + '#image-annotations-prepare-result',
          create: () => prepareResult
        }
      },
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/recall',
        service: 'codexStyleImageAnnotations',
        namespace: 'codexStyleImageAnnotations',
        method: 'recall',
        invocation: { kind: 'direct' },
        parameters: [{
          name: 'request',
          wire: 'request',
          source: 'json',
          codec: {
            mode: 'strict',
            typeSymbol: PLUGIN_PACKAGE + '#image-annotations-recall',
            create: () => recallRequest,
            jsonSchema: { type: 'object' }
          }
        }],
        result: {
          mode: 'strict',
          typeSymbol: PLUGIN_PACKAGE + '#image-annotations-recall-result',
          create: () => recallResult
        }
      }
    ]
  });
}

/* ------------------------------ 槽位注册 ------------------------------ */

// 单槽位：沿用项目里 scope.slots.entries 计算优先级的方式，压过宿主自带条目；
// 组件停用后条目被移除，宿主原渲染自动恢复。
function imageAnnotationIntegrationRegisterSingleSlot(scope, name, component) {
  return scope.slots.inject(name, () => {
    const priorities = scope.slots.entries(name).map(entry => {
      const value = entry && entry.options ? entry.options.priority : undefined;
      return typeof value === 'number' ? value : 0;
    });
    return scope.slots.register({ name, priority: Math.min(0, ...priorities) - 1 }, component);
  });
}

/* ------------------------------ 挂载入口 ------------------------------ */

// 由外部开关 watcher 调用；返回幂等 dispose，禁用时移除样式/槽位/Remote/监听并丢弃内存状态，
// 不删除 Host 的持久 token 快照（重启后可 resume + recall 恢复）。
function mountCodexImageAnnotations(ctx) {
  const runtime = createImageAnnotationIntegrationRuntime();
  const disposers = [];
  let disposed = false;
  const remember = value => {
    if (!value) return;
    if (typeof value === 'function') disposers.push(value);
    else if (typeof value.dispose === 'function') disposers.push(() => value.dispose());
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    runtime.dispose();
    const list = disposers.splice(0).reverse();
    for (const item of list) {
      try {
        item();
      } catch (error) {
        console.error('[codex-style] 清理图片批注集成失败', error);
      }
    }
  };

  remember(ctx.effect(() => imageAnnotationIntegrationInstallStyles(), 'codex-style: image annotation styles'));

  const remoteFiber = ctx.inject(['remote'], scope => {
    runtime.remoteAccessor = () => scope.remote && scope.remote.codexStyleImageAnnotations;
    scope.effect(() => mountImageAnnotationIntegrationRemote(scope), 'codex-style: image annotation remote methods');
  });
  remember(remoteFiber);

  const conversationFiber = ctx.inject(['conversation'], scope => {
    runtime.conversationService = scope.conversation;
  });
  remember(conversationFiber);

  const slotsFiber = ctx.inject(['slots'], scope => {
    scope.slots.inject('shell.overlay', () => scope.slots.register(
      { name: 'shell.overlay', id: 'codex-style:image-annotations-host' },
      makeImageAnnotationIntegrationHost(runtime)
    ));
    imageAnnotationIntegrationRegisterSingleSlot(scope, 'conversation.input.attachments', makeImageAnnotationIntegrationComposer(runtime));
    imageAnnotationIntegrationRegisterSingleSlot(scope, 'conversation.chat.user.images', makeImageAnnotationIntegrationMessageImage(runtime));
  });
  remember(slotsFiber);

  ctx.effect(() => dispose, 'codex-style: image annotation integration lifetime');
  // 供测试/诊断观察本次挂载的内部状态（不参与宿主契约）。
  try {
    Object.defineProperty(dispose, 'runtime', { value: runtime, configurable: true });
  } catch (error) {
    dispose.runtime = runtime;
  }
  return dispose;
}
