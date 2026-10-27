// 可选图片批注组件的 Host 半：prepare/recall Remote + agent/pre-step 隐藏上下文注入。
//
// 数据流（与客户端/任务单约定一致）：
//   Client 完成一次批注 → crypto.randomUUID() token → await remote.prepare(...)
//   → Host 把不可变 comments 快照原子写入 <profileDir>/data/dsh-codex-style/image-annotations/<sessionId>/<token>.json
//   → Client 用同一个 token 命名新 File（<stem>.__dsc_ia_<uuid>__<ext>）
//   → 宿主原发送链把 attachment.name 保留进 image block
//   → 本组件在 agent/pre-step 中按名称解析 token，读取本 session 快照，
//      紧跟在真实 user 消息之后追加一条非 user 来源的隐藏 user-role 消息。
// Chat 既有的可见性规则会隐藏非 user 来源的 context 行；本组件不修改普通正文、
// 不替换发送链、不注册模型/工具。持久快照不因请求消费、agent 释放或组件卸载删除，
// 只清理内存缓存与监听器。
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export const name = 'codex-style-image-annotations';
export const inject = ['profileContext', 'agents'];

/** 客户端 ctx.remote.$mount 使用的 Host 命名空间。 */
export const IMAGE_ANNOTATION_REMOTE_NAMESPACE = 'codexStyleImageAnnotations';
/** 本组件暴露的 Remote 方法，按此顺序标记 descriptor。 */
export const IMAGE_ANNOTATION_REMOTE_METHODS = Object.freeze(['prepare', 'recall', 'clear']);
/** 隐藏消息的 source.kind；非 'user' 来源，Chat 归类为 context 行。 */
export const IMAGE_ANNOTATION_SOURCE_KIND = 'codex-style/image-annotations';
/** 隐藏消息正文固定前缀（任务单确定的英文标题）。 */
export const IMAGE_ANNOTATION_HEADER = 'The user annotated the images in the preceding user message:\n\n';
/** 文件名 token 标记：<stem>.__dsc_ia_<uuid>__<extension>。 */
export const IMAGE_ANNOTATION_FILENAME_MARKER = '.__dsc_ia_';
/** 持久快照格式版本。 */
export const IMAGE_ANNOTATION_SNAPSHOT_VERSION = 1;
/** 删除标记（tombstone）格式版本；文件为同目录 `<token>.json.cleared`。 */
export const IMAGE_ANNOTATION_CLEAR_MARKER_VERSION = 1;
/** 删除标记文件后缀：保留原 comments 快照不动，只追加此标记表达“用户已清空”。 */
export const IMAGE_ANNOTATION_CLEAR_MARKER_SUFFIX = '.cleared';
/** 持久快照根目录相对 profileContext.dir 的路径段。 */
export const IMAGE_ANNOTATION_DATA_SEGMENTS = Object.freeze(['data', 'dsh-codex-style', 'image-annotations']);

const CANONICAL_UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;
const TOKEN_FILENAME = new RegExp(
  '^(?<stem>[\\s\\S]*)\\.__dsc_ia_(?<token>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})__(?<extension>\\.[^./\\\\]*)?$',
  'u'
);
const MAX_SESSION_ID_LENGTH = 200;
const MAX_COMMENTS = 256;
const MAX_COMMENT_TEXT = 8192;

/** 判断一个字符串是否是规范 UUID（主机接受客户端 crypto.randomUUID 的 v4 形式）。 */
export function isCanonicalUuidToken(value) {
  return typeof value === 'string' && CANONICAL_UUID.test(value);
}

function normalizeUuidToken(value, subject = 'token') {
  if (!isCanonicalUuidToken(value)) {
    throw new TypeError(`image annotations: ${subject} must be a canonical UUID string`);
  }
  return value.toLowerCase();
}

function normalizeSessionId(value) {
  if (typeof value !== 'string' || value === '') {
    throw new TypeError('image annotations: sessionId must be a non-empty string');
  }
  if (value.length > MAX_SESSION_ID_LENGTH) {
    throw new TypeError(`image annotations: sessionId must be at most ${MAX_SESSION_ID_LENGTH} characters`);
  }
  if (value === '.' || value === '..') throw new TypeError('image annotations: sessionId is not a usable directory name');
  return value;
}

/**
 * 解析客户端带 token 的文件名。
 *
 * 固定格式：`<原basename>.__dsc_ia_<uuid>__<原extension含点>`；无扩展名时末尾只有 `__`。
 * 只有完整格式且 UUID 合法才返回 token —— 其他文件名视为普通图片，不做任何推断。
 * @param {unknown} fileName - 真实上传的 attachment.name。
 * @returns {{token: string, stem: string, extension: string, originalName: string} | null}
 */
export function parseImageAnnotationFilename(fileName) {
  if (typeof fileName !== 'string' || !fileName.includes(IMAGE_ANNOTATION_FILENAME_MARKER)) return null;
  const match = TOKEN_FILENAME.exec(fileName);
  const groups = match?.groups;
  if (groups === undefined || !isCanonicalUuidToken(groups.token)) return null;
  const extension = groups.extension ?? '';
  return {
    token: groups.token.toLowerCase(),
    stem: groups.stem,
    extension,
    originalName: groups.stem + extension
  };
}

function clampCoordinate(value, subject) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`image annotations: ${subject} must be a finite number`);
  }
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

/**
 * 校验并规范化一次批注数据。文本 trim 后必须非空，坐标必须是有限数字并 clamp 到 0..1。
 * 返回冻结数组，快照内容不能被调用方后续修改。
 * @param {unknown} comments
 * @returns {ReadonlyArray<Readonly<{text: string, x: number, y: number}>>}
 */
export function normalizeImageAnnotationComments(comments) {
  if (!Array.isArray(comments)) throw new TypeError('image annotations: comments must be an array');
  if (comments.length === 0) throw new TypeError('image annotations: comments must contain at least one comment');
  if (comments.length > MAX_COMMENTS) {
    throw new TypeError(`image annotations: comments must contain at most ${MAX_COMMENTS} entries`);
  }
  const normalized = [];
  for (let index = 0; index < comments.length; index += 1) {
    const comment = comments[index];
    if (comment === null || typeof comment !== 'object' || Array.isArray(comment)) {
      throw new TypeError(`image annotations: comments[${index}] must be an object`);
    }
    if (typeof comment.text !== 'string') {
      throw new TypeError(`image annotations: comments[${index}].text must be a string`);
    }
    const text = comment.text.trim();
    if (text === '') throw new TypeError(`image annotations: comments[${index}].text must not be blank`);
    if (text.length > MAX_COMMENT_TEXT) {
      throw new TypeError(`image annotations: comments[${index}].text must be at most ${MAX_COMMENT_TEXT} characters`);
    }
    const x = clampCoordinate(comment.x, `comments[${index}].x`);
    const y = clampCoordinate(comment.y, `comments[${index}].y`);
    normalized.push(Object.freeze({ text, x, y }));
  }
  return Object.freeze(normalized);
}

function formatPercent(value) {
  const clamped = value < 0 ? 0 : value > 1 ? 1 : value;
  return String(Math.round(clamped * 1000) / 10);
}

/**
 * 生成模型可见的坐标段；格式与客户端 `formatImageAnnotationPrompt` 一致：
 *
 * ```text
 * Image 1:
 * 1. (x: 25%, y: 40%) 把这里改成圆角
 * ```
 *
 * `imageNumber` 是用户消息里所有 image block 的 1-based 次序（未批注图片也占号）。
 * @param {ReadonlyArray<{imageNumber: number, comments: ReadonlyArray<{text: string, x: number, y: number}>}>} groups
 * @returns {string}
 */
export function formatImageAnnotationPrompt(groups) {
  if (!Array.isArray(groups)) throw new TypeError('image annotations: groups must be an array');
  const lines = [];
  for (const group of groups) {
    if (group === null || typeof group !== 'object') continue;
    const comments = Array.isArray(group.comments) ? group.comments : [];
    if (comments.length === 0) continue;
    const imageNumber = Number.isSafeInteger(group.imageNumber) && group.imageNumber > 0 ? group.imageNumber : 1;
    lines.push(`Image ${imageNumber}:`);
    for (let index = 0; index < comments.length; index += 1) {
      const comment = comments[index];
      if (comment === null || typeof comment !== 'object') continue;
      lines.push(`${index + 1}. (x: ${formatPercent(comment.x)}%, y: ${formatPercent(comment.y)}%) ${comment.text}`);
    }
  }
  return lines.join('\n');
}

/** 把 sessionId 编码成单个安全目录名；普通 id（s1、UUID）保持原样。 */
function sessionSegment(sessionId) {
  const normalized = normalizeSessionId(sessionId);
  // encodeURIComponent 仍会保留 `*`，它在 Windows 文件名中非法。
  const encoded = encodeURIComponent(normalized).replace(/\*/gu, '%2A');
  if (encoded === '' || encoded === '.' || encoded === '..') {
    throw new TypeError('image annotations: sessionId is not a usable directory name');
  }
  return encoded;
}

function snapshotRoot(profileDir) {
  if (typeof profileDir !== 'string' || profileDir.trim() === '') {
    throw new TypeError('image annotations: profileDir must be a non-empty directory path');
  }
  return resolve(profileDir, ...IMAGE_ANNOTATION_DATA_SEGMENTS);
}

/**
 * 解析本 session/token 对应的持久快照文件绝对路径。
 * 同时验证路径仍位于插件私有数据根内，避免 sessionId 造成目录穿越。
 * @param {string} profileDir - profileContext.dir
 * @param {string} sessionId
 * @param {string} token
 * @returns {string}
 */
export function resolveImageAnnotationSnapshotPath(profileDir, sessionId, token) {
  const root = snapshotRoot(profileDir);
  const normalizedToken = normalizeUuidToken(token);
  const file = join(root, sessionSegment(sessionId), `${normalizedToken}.json`);
  const rootPrefix = root.endsWith(sep) ? root : root + sep;
  if (!resolve(file).startsWith(rootPrefix)) {
    throw new Error('image annotations: resolved snapshot path escapes the plugin data directory');
  }
  return file;
}

/**
 * 解析本 session/token 对应的删除标记路径（与原 comments JSON 同目录，原文件不动）。
 * @param {string} profileDir - profileContext.dir
 * @param {string} sessionId
 * @param {string} token
 * @returns {string}
 */
export function resolveImageAnnotationClearPath(profileDir, sessionId, token) {
  return resolveImageAnnotationSnapshotPath(profileDir, sessionId, token) + IMAGE_ANNOTATION_CLEAR_MARKER_SUFFIX;
}

function corruptSnapshotError(file, detail, cause) {
  return new Error(`image annotations: persisted snapshot "${file}" is unreadable (${detail})`, cause === undefined ? undefined : { cause });
}

function corruptClearMarkerError(file, detail, cause) {
  return new Error(`image annotations: persisted clear marker "${file}" is unreadable (${detail})`, cause === undefined ? undefined : { cause });
}

function normalizeStoredSnapshot(value, { file, sessionId, token }) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw corruptSnapshotError(file, 'not a JSON object');
  }
  if (value.version !== IMAGE_ANNOTATION_SNAPSHOT_VERSION) {
    throw corruptSnapshotError(file, `unsupported version ${String(value.version)}`);
  }
  if (value.sessionId !== sessionId || value.token !== token) {
    throw corruptSnapshotError(file, 'session/token does not match its directory');
  }
  try {
    return normalizeImageAnnotationComments(value.comments);
  } catch (error) {
    throw corruptSnapshotError(file, error instanceof Error ? error.message : String(error), error);
  }
}

function assertClearMarker(value, { file, sessionId, token }) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw corruptClearMarkerError(file, 'not a JSON object');
  }
  if (value.version !== IMAGE_ANNOTATION_CLEAR_MARKER_VERSION) {
    throw corruptClearMarkerError(file, `unsupported version ${String(value.version)}`);
  }
  if (value.sessionId !== sessionId || value.token !== token) {
    throw corruptClearMarkerError(file, 'session/token does not match its directory');
  }
}

function sameComments(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];
    if (a.text !== b.text || a.x !== b.x || a.y !== b.y) return false;
  }
  return true;
}

function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}

/**
 * 插件私有的持久 token 快照存储。
 *
 * - 写入先落同目录临时文件再 rename，prepare 成功返回前内容已完整可见；
 * - 同一 token 的首次写入内容不可变：同内容幂等，不同内容抛可见错误；
 * - 读取按需进行；坏文件抛显式错误，不静默当作“无批注”。
 * @param {string} profileDir - profileContext.dir
 */
export function createImageAnnotationSnapshotStore(profileDir) {
  const root = snapshotRoot(profileDir);
  const tokenLocks = new Map();

  function withTokenLock(key, task) {
    const previous = tokenLocks.get(key) ?? Promise.resolve();
    const current = previous.then(task, task);
    const settled = current.then(() => {}, () => {});
    tokenLocks.set(key, settled);
    return current.finally(() => {
      if (tokenLocks.get(key) === settled) tokenLocks.delete(key);
    });
  }

  async function readSnapshot(sessionId, token) {
    const file = resolveImageAnnotationSnapshotPath(profileDir, sessionId, token);
    const normalizedToken = token.toLowerCase();
    let text;
    try {
      text = await readFile(file, 'utf8');
    } catch (error) {
      if (error?.code === 'ENOENT') return null;
      throw new Error(`image annotations: persisted snapshot "${file}" cannot be read: ${messageOf(error)}`, { cause: error });
    }
    let value;
    try {
      value = JSON.parse(text);
    } catch (error) {
      throw corruptSnapshotError(file, 'invalid JSON', error);
    }
    return normalizeStoredSnapshot(value, { file, sessionId: normalizeSessionId(sessionId), token: normalizedToken });
  }

  async function readClearMarker(sessionId, token) {
    const marker = resolveImageAnnotationClearPath(profileDir, sessionId, token);
    let text;
    try {
      text = await readFile(marker, 'utf8');
    } catch (error) {
      if (error?.code === 'ENOENT') return false;
      throw new Error(`image annotations: persisted clear marker "${marker}" cannot be read: ${messageOf(error)}`, { cause: error });
    }
    let value;
    try {
      value = JSON.parse(text);
    } catch (error) {
      throw corruptClearMarkerError(marker, 'invalid JSON', error);
    }
    assertClearMarker(value, {
      file: marker,
      sessionId: normalizeSessionId(sessionId),
      token: normalizeUuidToken(token)
    });
    return true;
  }

  async function readState(sessionId, token) {
    const comments = await readSnapshot(sessionId, token);
    if (comments === null) return null;
    const cleared = await readClearMarker(sessionId, token);
    return Object.freeze({ comments, cleared });
  }

  async function saveSnapshot(sessionId, token, comments) {
    const normalizedSessionId = normalizeSessionId(sessionId);
    const normalizedToken = normalizeUuidToken(token);
    const normalizedComments = normalizeImageAnnotationComments(comments);
    const file = resolveImageAnnotationSnapshotPath(profileDir, normalizedSessionId, normalizedToken);
    return withTokenLock(`${normalizedSessionId}\u0000${normalizedToken}`, async () => {
      const existing = await readSnapshot(normalizedSessionId, normalizedToken);
      if (existing !== null) {
        if (sameComments(existing, normalizedComments)) return;
        throw new Error(
          `image annotations: token "${normalizedToken}" was already prepared with different comments; ` +
          'edit the annotations and complete them again to mint a new token'
        );
      }
      await mkdir(dirname(file), { recursive: true });
      const payload = JSON.stringify({
        version: IMAGE_ANNOTATION_SNAPSHOT_VERSION,
        sessionId: normalizedSessionId,
        token: normalizedToken,
        comments: normalizedComments,
        createdAt: Date.now()
      }) + '\n';
      const temporary = join(dirname(file), `.tmp-${process.pid}-${Date.now()}-${randomUUID()}`);
      try {
        await writeFile(temporary, payload, { encoding: 'utf8', mode: 0o600 });
        await rename(temporary, file);
      } catch (error) {
        await unlink(temporary).catch(() => {});
        throw new Error(
          `image annotations: failed to persist token "${normalizedToken}" for session "${normalizedSessionId}": ${messageOf(error)}`,
          { cause: error }
        );
      }
    });
  }

  async function clearSnapshot(sessionId, token) {
    const normalizedSessionId = normalizeSessionId(sessionId);
    const normalizedToken = normalizeUuidToken(token);
    const snapshot = resolveImageAnnotationSnapshotPath(profileDir, normalizedSessionId, normalizedToken);
    const marker = snapshot + IMAGE_ANNOTATION_CLEAR_MARKER_SUFFIX;
    return withTokenLock(`${normalizedSessionId}\u0000${normalizedToken}`, async () => {
      // 只允许清空确实存在的记录；快照文件必须保留，不能用删除 json 表达 clear。
      const comments = await readSnapshot(normalizedSessionId, normalizedToken);
      if (comments === null) {
        throw new Error(
          `image annotations: token "${normalizedToken}" has no prepared snapshot in session "${normalizedSessionId}"; cannot clear an unknown record`
        );
      }
      if (await readClearMarker(normalizedSessionId, normalizedToken)) return;
      await mkdir(dirname(marker), { recursive: true });
      const payload = JSON.stringify({
        version: IMAGE_ANNOTATION_CLEAR_MARKER_VERSION,
        sessionId: normalizedSessionId,
        token: normalizedToken,
        clearedAt: Date.now()
      }) + '\n';
      const temporary = join(dirname(marker), `.tmp-clear-${process.pid}-${Date.now()}-${randomUUID()}`);
      try {
        await writeFile(temporary, payload, { encoding: 'utf8', mode: 0o600 });
        await rename(temporary, marker);
      } catch (error) {
        await unlink(temporary).catch(() => {});
        throw new Error(
          `image annotations: failed to persist clear marker for token "${normalizedToken}" in session "${normalizedSessionId}": ${messageOf(error)}`,
          { cause: error }
        );
      }
    });
  }

  return Object.freeze({ root, read: readSnapshot, readState, save: saveSnapshot, clear: clearSnapshot });
}

function isUserSourceMessage(message) {
  return message !== null && typeof message === 'object'
    && message.source !== null && typeof message.source === 'object'
    && message.source.kind === 'user'
    && Array.isArray(message.content);
}

function imageBlocksOf(message) {
  return message.content.filter(block => block !== null && typeof block === 'object' && block.type === 'image');
}

function messageDedupeKey(message) {
  const rpcId = message.source?.rpcId;
  if (typeof rpcId === 'string' && rpcId !== '') return rpcId;
  if (typeof message.id === 'string' && message.id !== '') return message.id;
  throw new Error('image annotations: a user message carrying annotations has no stable identity (source.rpcId or message.id)');
}

function disposeObservation(observation) {
  if (observation === undefined || observation === null) return;
  if (typeof observation[Symbol.dispose] === 'function') observation[Symbol.dispose]();
  else if (typeof observation.dispose === 'function') observation.dispose();
}

/** 只读验证 session 确实存在；不创建、不唤醒、不启动 Agent。 */
async function sessionExists(ctx, sessionId) {
  const sessions = ctx.get?.('sessions');
  if (typeof sessions?.get === 'function' && sessions.get(sessionId) !== undefined) return true;
  const query = ctx.get?.('sessionQuery');
  if (typeof query?.observeSession === 'function') {
    let observation;
    try {
      observation = await query.observeSession(sessionId, { projectionMode: 'none' });
    } catch (error) {
      if (error?.code === 'SESSION_QUERY_SESSION_NOT_FOUND') return false;
      throw error;
    }
    disposeObservation(observation);
    return true;
  }
  throw new Error('image annotations: session existence cannot be verified in this Host composition (sessions/sessionQuery unavailable)');
}

/**
 * 创建可注入依赖的 Host 内核。
 *
 * 生产入口 `apply()` 用真实 `@deepseek-ai/dsh-typert-protocol` / `@deepseek-ai/dsh-llm`
 * 和 `ctx.profileContext.dir` 创建内核；隔离测试可传临时 profileDir 与官方同构的
 * createUserMessage 注入。内核只依赖 Cordis 的 `ctx.get/on/effect/plugin` 与
 * `agent.ctx.on/effect` 子集。
 *
 * @param {{
 *   Remote: Function,
 *   TypertRemoteService: Function,
 *   createUserMessage: Function,
 *   profileDir: string
 * }} dependencies
 * @returns {{ install(ctx: object): void, store: object }}
 */
export function createImageAnnotationsHostKernel(dependencies) {
  const { Remote, TypertRemoteService, createUserMessage, profileDir } = dependencies ?? {};
  if (typeof Remote !== 'function') throw new TypeError('image annotations: Remote decorator is unavailable');
  if (typeof TypertRemoteService !== 'function') throw new TypeError('image annotations: TypertRemoteService is unavailable');
  if (typeof createUserMessage !== 'function') throw new TypeError('image annotations: createUserMessage is unavailable');

  const store = createImageAnnotationSnapshotStore(profileDir);
  /** @type {Map<string, {snapshots: Map<string, {comments: ReadonlyArray<object>, cleared: boolean}>, committed: Set<string>}>} */
  const sessionState = new Map();
  /** @type {Map<string, {agent: object, disposers: Function[]}>} */
  const bindings = new Map();

  function stateFor(sessionId) {
    let state = sessionState.get(sessionId);
    if (state === undefined) {
      state = { snapshots: new Map(), committed: new Set() };
      sessionState.set(sessionId, state);
    }
    return state;
  }

  async function loadSnapshot(sessionId, token) {
    const cached = sessionState.get(sessionId)?.snapshots.get(token);
    if (cached !== undefined) return cached;
    return await refreshSnapshot(sessionId, token);
  }

  /** 从磁盘重新读取 comments+tombstone 状态并覆盖内存缓存（prepare/clear 后必须调用）。 */
  async function refreshSnapshot(sessionId, token) {
    const entry = await store.readState(sessionId, token);
    if (entry === null) {
      sessionState.get(sessionId)?.snapshots.delete(token);
      return null;
    }
    stateFor(sessionId).snapshots.set(token, entry);
    return entry;
  }

  function sessionIdOf(agent) {
    const sessionId = agent?.session?.id;
    return typeof sessionId === 'string' && sessionId !== '' ? sessionId : undefined;
  }

  function unbindAgent(sessionId) {
    const binding = bindings.get(sessionId);
    if (binding !== undefined) {
      bindings.delete(sessionId);
      for (const dispose of binding.disposers) {
        try {
          dispose();
        } catch {
          // agent 释放与插件卸载可能同时发生；清理失败不应阻断另一条清理路径。
        }
      }
    }
    sessionState.delete(sessionId);
  }

  function markCommitted(sessionId, session, event) {
    // 只有隐藏消息自身 durable 才算该次 request 的批注上下文已提交；
    // 原始 user/message durable 不代表隐藏上下文存在（可能被取消/路由失败）。
    if (session?.id !== sessionId) return;
    if (event?.type !== 'user/message') return;
    const source = event.data?.source;
    if (source?.kind !== IMAGE_ANNOTATION_SOURCE_KIND) return;
    const requestId = source.requestId;
    if (typeof requestId !== 'string' || requestId === '') return;
    stateFor(sessionId).committed.add(requestId);
  }

  function createPreStepHandler(agent, sessionId) {
    return async function imageAnnotationsPreStep(payload, next) {
      const decision = await next();
      if (decision?.kind !== 'enter') return decision;
      const signal = payload?.signal;
      if (signal?.aborted) return decision;
      if (payload?.agent !== agent) return decision;
      const messages = Array.isArray(decision.messages) ? decision.messages : [];
      if (messages.length === 0) return decision;

      const additions = [];
      const plannedKeys = new Set();
      for (let index = 0; index < messages.length; index += 1) {
        const message = messages[index];
        if (!isUserSourceMessage(message)) continue;
        const images = imageBlocksOf(message);
        if (images.length === 0) continue;
        const carriers = [];
        for (let imageIndex = 0; imageIndex < images.length; imageIndex += 1) {
          const parsed = parseImageAnnotationFilename(images[imageIndex]?.attachment?.name);
          if (parsed !== null) carriers.push({ imageNumber: imageIndex + 1, token: parsed.token });
        }
        if (carriers.length === 0) continue;

        const dedupeKey = messageDedupeKey(message);
        if (plannedKeys.has(dedupeKey)) continue;
        // 已经由 hidden message durable 标记的 request 不再读取/注入；即使快照文件后来被外部移除，
        // 已提交批次的重放也不应因此失败。
        if (sessionState.get(sessionId)?.committed.has(dedupeKey) === true) continue;

        const annotations = [];
        for (const carrier of carriers) {
          if (signal?.aborted) return decision;
          const entry = await loadSnapshot(sessionId, carrier.token);
          if (signal?.aborted) return decision;
          if (entry === null) {
            throw new Error(
              `image annotations: token "${carrier.token}" has no prepared snapshot in session "${sessionId}"; ` +
              'refusing to send this image without its annotations'
            );
          }
          // 显式 clear 后该 token 视为“空评论”：跳过该图的坐标段，不追加隐藏消息；
          // 快照文件与已有 durable 历史都保持不变。
          if (entry.cleared) continue;
          annotations.push({ imageNumber: carrier.imageNumber, comments: entry.comments });
        }
        plannedKeys.add(dedupeKey);

        const formatted = formatImageAnnotationPrompt(annotations);
        if (formatted === '') continue;
        additions.push({
          afterIndex: index,
          hidden: createUserMessage({
            content: [{ type: 'text', text: IMAGE_ANNOTATION_HEADER + formatted }],
            source: {
              kind: IMAGE_ANNOTATION_SOURCE_KIND,
              form: 'annotations',
              requestId: dedupeKey,
              summary: 'image annotations'
            }
          })
        });
      }

      if (additions.length === 0) return decision;
      const nextMessages = [];
      let additionIndex = 0;
      for (let index = 0; index < messages.length; index += 1) {
        nextMessages.push(messages[index]);
        while (additionIndex < additions.length && additions[additionIndex].afterIndex === index) {
          nextMessages.push(additions[additionIndex].hidden);
          additionIndex += 1;
        }
      }
      return { ...decision, messages: nextMessages };
    };
  }

  function bindAgent(ctx, agent) {
    const sessionId = sessionIdOf(agent);
    if (sessionId === undefined) return;
    if (bindings.has(sessionId)) return;
    const agentCtx = agent?.ctx;
    if (agentCtx === null || typeof agentCtx !== 'object'
      || typeof agentCtx.on !== 'function' || typeof agentCtx.effect !== 'function') {
      ctx.logger?.warn?.(`image annotations: agent "${sessionId}" has no scoped context; annotations are unavailable for it`);
      return;
    }
    const disposers = [];
    try {
      disposers.push(agentCtx.on('agent/pre-step', createPreStepHandler(agent, sessionId), { prepend: true }));
      disposers.push(agentCtx.on('session/event', (session, event) => markCommitted(sessionId, session, event)));
      // agent 释放时 unwound；本插件卸载时通过保存的 disposer 也主动清理。
      disposers.push(agentCtx.effect(() => () => unbindAgent(sessionId)));
    } catch (error) {
      for (const dispose of disposers) {
        try {
          dispose();
        } catch {
          // 注册失败时尽力回滚已注册的监听。
        }
      }
      ctx.logger?.warn?.(`image annotations: failed to bind agent "${sessionId}": ${messageOf(error)}`);
      return;
    }
    bindings.set(sessionId, { agent, disposers });
  }

  class CodexStyleImageAnnotations extends TypertRemoteService {
    constructor(inner) {
      super(inner, IMAGE_ANNOTATION_REMOTE_NAMESPACE);
      for (const initialize of initializers) initialize.call(this);
    }

    /** Remote prepare：校验后原子持久化 token 快照，成功才返回 {ok:true}。 */
    async prepare(request) {
      const input = normalizePrepareRequest(request);
      const agents = this.ctx.get('agents');
      if (typeof agents?.get !== 'function') {
        throw new Error('image annotations: agent registry is unavailable; cannot bind the prepared snapshot to a live session');
      }
      if (agents.get(input.sessionId) === undefined) {
        throw new Error(`image annotations: no live agent for session "${input.sessionId}"; open the session before completing annotations`);
      }
      await store.save(input.sessionId, input.token, input.comments);
      // prepare 只保证内容幂等，不能取消 clear：必须从磁盘重读 tombstone 覆盖缓存。
      await refreshSnapshot(input.sessionId, input.token);
      return { ok: true };
    }

    /** Remote recall：只读恢复历史图片的批注胶囊/坐标；clear 后返回空；不启动 Agent。 */
    async recall(request) {
      const input = normalizeRecallRequest(request);
      if (!(await sessionExists(this.ctx, input.sessionId))) return { ok: false, comments: [] };
      const entry = await loadSnapshot(input.sessionId, input.token);
      if (entry === null) return { ok: false, comments: [] };
      if (entry.cleared) return { ok: true, comments: [] };
      return {
        ok: true,
        comments: entry.comments.map(comment => ({ text: comment.text, x: comment.x, y: comment.y }))
      };
    }

    /** Remote clear：胶囊×的持久删除语义；保留原 comments 快照，只原子写 tombstone。 */
    async clear(request) {
      const input = normalizeClearRequest(request);
      if (!(await sessionExists(this.ctx, input.sessionId))) {
        throw new Error(`image annotations: session "${input.sessionId}" was not found; cannot clear annotations`);
      }
      await store.clear(input.sessionId, input.token);
      // 同一进程内此前可能已缓存 cleared:false；必须从磁盘重读 tombstone。
      await refreshSnapshot(input.sessionId, input.token);
      return { ok: true };
    }
  }

  const initializers = [];
  for (const method of IMAGE_ANNOTATION_REMOTE_METHODS) {
    Remote(CodexStyleImageAnnotations.prototype[method], {
      kind: 'method',
      name: method,
      static: false,
      private: false,
      addInitializer: initialize => initializers.push(initialize)
    });
  }

  function install(ctx) {
    const agents = ctx.get('agents');
    let existing = [];
    try {
      existing = typeof agents?.list === 'function' ? agents.list() : [];
    } catch (error) {
      ctx.logger?.warn?.(`image annotations: cannot enumerate live agents: ${messageOf(error)}`);
    }
    for (const agent of existing) bindAgent(ctx, agent);
    ctx.on('agent/created', payload => {
      try {
        bindAgent(ctx, payload?.agent);
      } catch (error) {
        ctx.logger?.warn?.(`image annotations: failed to bind created agent: ${messageOf(error)}`);
      }
    });
    ctx.on('agent/disposed', payload => {
      const sessionId = sessionIdOf(payload?.agent);
      if (sessionId !== undefined) unbindAgent(sessionId);
    });
    ctx.on('session/disposed', session => {
      const sessionId = session?.id;
      if (typeof sessionId === 'string' && sessionId !== '') unbindAgent(sessionId);
    });
    ctx.effect(() => () => {
      for (const sessionId of [...bindings.keys()]) unbindAgent(sessionId);
      bindings.clear();
      sessionState.clear();
    });
    ctx.plugin(CodexStyleImageAnnotations);
  }

  return { install, store };
}

function normalizePrepareRequest(request) {
  if (request === null || typeof request !== 'object' || Array.isArray(request)) {
    throw new TypeError('image annotations: prepare expects a request object');
  }
  return {
    sessionId: normalizeSessionId(request.sessionId),
    token: normalizeUuidToken(request.token),
    comments: normalizeImageAnnotationComments(request.comments)
  };
}

function normalizeRecallRequest(request) {
  if (request === null || typeof request !== 'object' || Array.isArray(request)) {
    throw new TypeError('image annotations: recall expects a request object');
  }
  return {
    sessionId: normalizeSessionId(request.sessionId),
    token: normalizeUuidToken(request.token)
  };
}

function normalizeClearRequest(request) {
  if (request === null || typeof request !== 'object' || Array.isArray(request)) {
    throw new TypeError('image annotations: clear expects a request object');
  }
  return {
    sessionId: normalizeSessionId(request.sessionId),
    token: normalizeUuidToken(request.token)
  };
}

/**
 * 组件入口。动态解析当前 runtime SDK，避免复制宿主依赖；生产使用真实
 * `ctx.profileContext.dir` 作为持久快照根（不是插件包目录）。
 * @param {object} ctx - Cordis Host 插件上下文。
 */
export async function apply(ctx) {
  const profileContext = ctx?.profileContext;
  if (profileContext === null || typeof profileContext !== 'object') {
    throw new Error('image annotations: profileContext is unavailable');
  }
  const profileDir = profileContext.dir;
  if (typeof profileDir !== 'string' || profileDir.trim() === '') {
    throw new Error('image annotations: profileContext.dir is unavailable; token snapshots cannot be persisted');
  }
  const require = createRequire(profileContext.installAnchor);
  const [protocol, llm] = await Promise.all([
    import(pathToFileURL(require.resolve('@deepseek-ai/dsh-typert-protocol')).href),
    import(pathToFileURL(require.resolve('@deepseek-ai/dsh-llm')).href)
  ]);
  const { Remote, TypertRemoteService } = protocol ?? {};
  const { createUserMessage } = llm ?? {};
  if (typeof Remote !== 'function' || typeof TypertRemoteService !== 'function') {
    throw new Error('image annotations: @deepseek-ai/dsh-typert-protocol does not expose Remote/TypertRemoteService');
  }
  if (typeof createUserMessage !== 'function') {
    throw new Error('image annotations: @deepseek-ai/dsh-llm does not expose createUserMessage');
  }
  createImageAnnotationsHostKernel({ Remote, TypertRemoteService, createUserMessage, profileDir }).install(ctx);
}
