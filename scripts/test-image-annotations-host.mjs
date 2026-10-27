// 图片批注 Host 半测试（不启动 DSH、不连接真实 profile、不写日常数据）。
//
// 覆盖两层：
// 1) 可注入内核夹具：真实调用本组件注册的 agent/pre-step、session/event 回调，
//    验证编号、快照、持久化、去重、清理与 Remote 校验；
// 2) 真实 Host SDK 隔离夹具：从本机已安装 ASAR 只读提取
//    @deepseek-ai/dsh-typert-protocol、dsh-scope、dsh-agent 的 dispatch、官方
//    dsh-llm message.js（及零依赖 util 包），配本地 @deepseek-ai/cordis，
//    在临时 profile 目录中验证 apply()、Remote 注册、scope 过滤和卸载。
//    ASAR 不存在时该组测试 skip（报告会写明 NOT RUN 原因）。
//
// 运行：node scripts/test-image-annotations-host.mjs
// 也兼容：node --test scripts/test-image-annotations-host.mjs

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { access, cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import * as host from '../src/image-annotations-host.mjs';

const {
  IMAGE_ANNOTATION_CLEAR_MARKER_SUFFIX,
  IMAGE_ANNOTATION_DATA_SEGMENTS,
  IMAGE_ANNOTATION_FILENAME_MARKER,
  IMAGE_ANNOTATION_HEADER,
  IMAGE_ANNOTATION_REMOTE_NAMESPACE,
  IMAGE_ANNOTATION_SNAPSHOT_VERSION,
  IMAGE_ANNOTATION_SOURCE_KIND,
  createImageAnnotationSnapshotStore,
  createImageAnnotationsHostKernel,
  formatImageAnnotationPrompt,
  normalizeImageAnnotationComments,
  parseImageAnnotationFilename,
  resolveImageAnnotationClearPath,
  resolveImageAnnotationSnapshotPath
} = host;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, '..');
// 可选的真实 SDK 验收由运行者显式提供安装包路径；公开测试不绑定个人安装目录。
const ASAR_PATH = process.env.DSH_ASAR || '';
const OS_TEMP_ROOT = resolve(tmpdir());
const tempDirs = [];

/** 递归清理前核对绝对目标确实位于系统临时目录，避免跟随链接/误删工作树。 */
function assertTemporaryCleanupTarget(dir) {
  const resolved = resolve(dir);
  if (resolved === OS_TEMP_ROOT || !resolved.startsWith(OS_TEMP_ROOT + sep)) {
    throw new Error(`refusing recursive cleanup outside the OS temp directory: ${resolved}`);
  }
  return resolved;
}

after(async () => {
  for (const dir of tempDirs.reverse()) {
    try {
      const target = assertTemporaryCleanupTarget(dir);
      await rm(target, { recursive: true, force: true });
    } catch {
      // 临时目录清理失败或目标不在临时根下都不影响测试结论；绝不递归清理其他路径。
    }
  }
});

async function makeTempDir(prefix) {
  const dir = await mkdtemp(join(tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

function token() {
  return randomUUID();
}

function withToken(fileName, uuid = token()) {
  const dot = fileName.lastIndexOf('.');
  if (dot > 0) return `${fileName.slice(0, dot)}${IMAGE_ANNOTATION_FILENAME_MARKER}${uuid}__${fileName.slice(dot)}`;
  return `${fileName}${IMAGE_ANNOTATION_FILENAME_MARKER}${uuid}__`;
}

function snapshotPath(profileDir, sessionId, uuid) {
  return resolveImageAnnotationSnapshotPath(profileDir, sessionId, uuid);
}

function clearPath(profileDir, sessionId, uuid) {
  return resolveImageAnnotationClearPath(profileDir, sessionId, uuid);
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/* ----------------------------- 纯函数与文件名 ----------------------------- */

test('filename parser reads the exact client carrier format', () => {
  const uuid = '12345678-1234-1234-1234-123456789abc';
  assert.deepEqual(parseImageAnnotationFilename(`test${IMAGE_ANNOTATION_FILENAME_MARKER}${uuid}__.png`), {
    token: uuid,
    stem: 'test',
    extension: '.png',
    originalName: 'test.png'
  });
  assert.deepEqual(parseImageAnnotationFilename(`my.photo${IMAGE_ANNOTATION_FILENAME_MARKER}${uuid}__.jpeg`), {
    token: uuid,
    stem: 'my.photo',
    extension: '.jpeg',
    originalName: 'my.photo.jpeg'
  });
  assert.deepEqual(parseImageAnnotationFilename(`screenshot${IMAGE_ANNOTATION_FILENAME_MARKER}${uuid}__`), {
    token: uuid,
    stem: 'screenshot',
    extension: '',
    originalName: 'screenshot'
  });
  const upper = token().toUpperCase();
  assert.equal(parseImageAnnotationFilename(`x${IMAGE_ANNOTATION_FILENAME_MARKER}${upper}__.png`).token, upper.toLowerCase());
});

test('filename parser ignores ordinary names and malformed carriers', () => {
  assert.equal(parseImageAnnotationFilename('cat.png'), null);
  assert.equal(parseImageAnnotationFilename(undefined), null);
  assert.equal(parseImageAnnotationFilename(''), null);
  assert.equal(parseImageAnnotationFilename(`cat${IMAGE_ANNOTATION_FILENAME_MARKER}not-a-uuid__.png`), null);
  assert.equal(parseImageAnnotationFilename(`cat${IMAGE_ANNOTATION_FILENAME_MARKER}${token()}`), null); // 缺 uuid 后的 __ 分隔符
  assert.equal(parseImageAnnotationFilename(`cat${IMAGE_ANNOTATION_FILENAME_MARKER}${token()}__.png.bak`), null);
  assert.equal(parseImageAnnotationFilename(`cat${IMAGE_ANNOTATION_FILENAME_MARKER}${token()}__png`), null);
});

test('filename parser keeps a marker-looking stem before the real token', () => {
  const first = token();
  const second = token();
  const parsed = parseImageAnnotationFilename(`a${IMAGE_ANNOTATION_FILENAME_MARKER}${first}__.b${IMAGE_ANNOTATION_FILENAME_MARKER}${second}__.png`);
  assert.equal(parsed.token, second);
  assert.equal(parsed.stem, `a${IMAGE_ANNOTATION_FILENAME_MARKER}${first}__.b`);
});

test('comments normalize trims text and clamps coordinates', () => {
  const comments = normalizeImageAnnotationComments([
    { text: '  把这里改成圆角  ', x: 1.5, y: -0.2, id: 'ignored' },
    { text: '缩小这个图标', x: 0.725, y: 0 }
  ]);
  assert.deepEqual(comments.map(c => ({ text: c.text, x: c.x, y: c.y })), [
    { text: '把这里改成圆角', x: 1, y: 0 },
    { text: '缩小这个图标', x: 0.725, y: 0 }
  ]);
  assert.equal(Object.isFrozen(comments), true);
  assert.equal(Object.isFrozen(comments[0]), true);
});

test('comments normalize rejects invalid input visibly', () => {
  const cases = [
    undefined,
    null,
    'x',
    [],
    [null],
    [{ text: '   ', x: 0.1, y: 0.2 }],
    [{ text: 'ok', x: '0.5', y: 0.2 }],
    [{ text: 'ok', x: Number.NaN, y: 0.2 }],
    [{ text: 'ok', x: 0.2, y: Number.POSITIVE_INFINITY }],
    [{ text: 3, x: 0.2, y: 0.2 }],
    Array.from({ length: 257 }, () => ({ text: 'x', x: 0, y: 0 })),
    [{ text: 'x'.repeat(8193), x: 0, y: 0 }]
  ];
  for (const value of cases) assert.throws(() => normalizeImageAnnotationComments(value), /image annotations:/u);
});

test('formatted prompt contains coordinates and real image numbers', () => {
  const formatted = formatImageAnnotationPrompt([
    { imageNumber: 1, comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }] },
    { imageNumber: 3, comments: [{ text: '缩小这个图标', x: 0.725, y: 0.61 }, { text: '第二点', x: 0, y: 1 }] }
  ]);
  assert.equal(formatted, [
    'Image 1:',
    '1. (x: 25%, y: 40%) 把这里改成圆角',
    'Image 3:',
    '1. (x: 72.5%, y: 61%) 缩小这个图标',
    '2. (x: 0%, y: 100%) 第二点'
  ].join('\n'));
  assert.equal(formatImageAnnotationPrompt([]), '');
  assert.equal(formatImageAnnotationPrompt([{ imageNumber: 1, comments: [] }]), '');
});

/* ------------------------------- 假 Host 夹具 ------------------------------- */

function createFakeKernelHost({
  profileDir,
  sessions = [],
  persistedSessions = [],
  existingAgents = [],
  exposeSessionServices = true
} = {}) {
  const services = new Map();
  const rootListeners = [];
  const pluginDisposers = [];
  const instances = new Map();
  const agentRecords = new Map();
  const warnings = [];
  const liveSessions = new Set(sessions);
  const persisted = new Set(persistedSessions);

  const agentsService = {
    get: sessionId => agentRecords.get(sessionId)?.agent,
    list: () => [...agentRecords.values()].map(record => record.agent)
  };
  services.set('agents', agentsService);
  if (exposeSessionServices) {
    services.set('sessions', {
      get: sessionId => (liveSessions.has(sessionId) ? { id: sessionId } : undefined)
    });
    services.set('sessionQuery', {
      persisted,
      async observeSession(sessionId) {
        if (!persisted.has(sessionId)) {
          const error = new Error(`session "${sessionId}" not found`);
          error.code = 'SESSION_QUERY_SESSION_NOT_FOUND';
          throw error;
        }
        return { [Symbol.dispose]() {} };
      }
    });
  }

  function createAgentRecord(sessionId) {
    const listeners = [];
    const agentEffects = [];
    const agentCtx = {
      on(event, listener, options) {
        const record = { event, listener, options };
        listeners.push(record);
        return () => {
          const index = listeners.indexOf(record);
          if (index < 0) return false;
          listeners.splice(index, 1);
          return true;
        };
      },
      effect(fn) {
        const dispose = fn();
        agentEffects.push(dispose);
        return dispose;
      }
    };
    const agent = { id: sessionId, session: { id: sessionId }, options: {}, ctx: agentCtx };
    const record = { agent, listeners, agentEffects };
    agentRecords.set(sessionId, record);
    liveSessions.add(sessionId);
    return record;
  }

  for (const sessionId of existingAgents) createAgentRecord(sessionId);

  const ctx = {
    logger: { warn: message => warnings.push(String(message)) },
    get: serviceName => services.get(serviceName),
    on(event, listener, options) {
      const record = { event, listener, options };
      rootListeners.push(record);
      return () => {
        const index = rootListeners.indexOf(record);
        if (index < 0) return false;
        rootListeners.splice(index, 1);
        return true;
      };
    },
    effect(fn) {
      const dispose = fn();
      pluginDisposers.push(dispose);
      return dispose;
    },
    plugin(PluginClass) {
      const instance = new PluginClass(ctx);
      services.set(instance.name, instance);
      instances.set(instance.name, instance);
      return instance;
    }
  };

  let messageSequence = 0;
  const createUserMessage = input => ({ ...input, role: 'user', id: `fake-message-${++messageSequence}` });
  class FakeTypertRemoteService {
    constructor(inner, serviceKey) {
      this.ctx = inner;
      this.name = serviceKey;
    }
  }
  const fakeRemote = (_method, decoratorContext) => {
    decoratorContext.addInitializer(() => {});
  };

  const kernel = createImageAnnotationsHostKernel({
    Remote: fakeRemote,
    TypertRemoteService: FakeTypertRemoteService,
    createUserMessage,
    profileDir
  });
  kernel.install(ctx);

  function service() {
    return services.get(IMAGE_ANNOTATION_REMOTE_NAMESPACE);
  }

  function emitRoot(event, ...args) {
    for (const record of [...rootListeners]) {
      if (record.event === event) record.listener(...args);
    }
  }

  function emitAgentEvent(sessionId, event, ...args) {
    const record = agentRecords.get(sessionId);
    if (record === undefined) return;
    for (const listener of [...record.listeners]) {
      if (listener.event === event) listener.listener(...args);
    }
  }

  async function dispatchPreStep(agent, messages, options = {}) {
    const record = agentRecords.get(agent.session.id);
    if (record === undefined) throw new Error(`unknown fake agent ${agent.session.id}`);
    const signal = options.signal ?? new AbortController().signal;
    const base = options.next ?? (async () => ({ kind: 'enter', messages }));
    const chain = record.listeners
      .filter(listener => listener.event === 'agent/pre-step')
      .map(listener => listener.listener);
    const run = async index => {
      if (index >= chain.length) return base();
      return chain[index]({ agent, messages, turn: options.turn ?? 1, step: options.step ?? 1, signal }, () => run(index + 1));
    };
    return run(0);
  }

  function emitSessionEvent(sessionId, session, event) {
    emitAgentEvent(sessionId, 'session/event', session, event);
  }

  function releaseAgent(sessionId) {
    const record = agentRecords.get(sessionId);
    if (record === undefined) return;
    agentRecords.delete(sessionId);
    liveSessions.delete(sessionId);
    record.listeners.splice(0);
    for (const dispose of record.agentEffects.splice(0).reverse()) {
      try {
        dispose?.();
      } catch {
        // 清理失败不应阻断测试后续检查。
      }
    }
  }

  function notifyAgentDisposed(sessionId) {
    const record = agentRecords.get(sessionId);
    if (record !== undefined) emitRoot('agent/disposed', { agent: record.agent });
  }

  function unload() {
    for (const dispose of pluginDisposers.splice(0).reverse()) {
      try {
        dispose?.();
      } catch {
        // 插件卸载时的清理异常单独报错意义不大；后续断言会暴露残留。
      }
    }
    rootListeners.splice(0);
    for (const [serviceName, instance] of instances) {
      if (services.get(serviceName) === instance) services.delete(serviceName);
    }
    instances.clear();
  }

  function addAgent(sessionId, { announce = true } = {}) {
    if (agentRecords.has(sessionId)) return agentRecords.get(sessionId).agent;
    const record = createAgentRecord(sessionId);
    if (announce) emitRoot('agent/created', { agent: record.agent });
    return record.agent;
  }

  return {
    ctx,
    kernel,
    service,
    warnings,
    agentsService,
    addAgent,
    dispatchPreStep,
    emitSessionEvent,
    emitRoot,
    releaseAgent,
    notifyAgentDisposed,
    unload,
    agentOf: sessionId => agentRecords.get(sessionId)?.agent
  };
}

function imageBlock(name) {
  return {
    type: 'image',
    attachment: {
      attachmentId: 'sha256:' + '0'.repeat(64),
      mediaType: 'image/png',
      width: 8,
      height: 8,
      ...(name === undefined ? {} : { name })
    }
  };
}

let messageSequence = 0;
function userMessage({ id, rpcId, images = [], text, sourceKind = 'user' } = {}) {
  const content = images.map(name => imageBlock(name));
  if (text !== undefined) content.push({ type: 'text', text });
  const message = {
    id: id ?? `user-message-${++messageSequence}`,
    role: 'user',
    content,
    source: { kind: sourceKind }
  };
  if (rpcId !== undefined) message.source.rpcId = rpcId;
  return message;
}

function hiddenMessages(decision) {
  return decision.messages.filter(message => message?.source?.kind === IMAGE_ANNOTATION_SOURCE_KIND);
}

function hiddenText(message) {
  return message.content.map(block => block.text ?? '').join('');
}

async function prepare(hostFixture, request) {
  return hostFixture.service().prepare(request);
}

const commentsA = [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }];
const commentsB = [{ text: '缩小这个图标', x: 0.5, y: 0.75 }];

/* --------------------------- Remote prepare/recall --------------------------- */

test('prepare persists an immutable snapshot and binds only live sessions', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  const result = await prepare(fake, {
    sessionId: 's1',
    token: uuid,
    comments: [{ text: '  把这里改成圆角 ', x: 1.5, y: -1 }]
  });
  assert.deepEqual(result, { ok: true });

  const file = snapshotPath(profileDir, 's1', uuid);
  assert.equal(file.startsWith(resolve(profileDir) + '\\') || file.startsWith(resolve(profileDir) + '/'), true);
  assert.equal(file.includes(resolve(pluginRoot)), false);
  assert.equal(await fileExists(file), true);
  const persisted = JSON.parse(await readFile(file, 'utf8'));
  assert.equal(persisted.version, IMAGE_ANNOTATION_SNAPSHOT_VERSION);
  assert.equal(persisted.sessionId, 's1');
  assert.equal(persisted.token, uuid);
  assert.deepEqual(persisted.comments, [{ text: '把这里改成圆角', x: 1, y: 0 }]);
  assert.deepEqual(await readdir(dirname(file)), [`${uuid}.json`], 'atomic save must not leave temporary files');

  await assert.rejects(
    prepare(fake, { sessionId: 's2', token: token(), comments: commentsA }),
    /no live agent for session "s2"/u
  );
  fake.unload();
});

test('prepare is idempotent for identical content and rejects a changed token snapshot', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const file = snapshotPath(profileDir, 's1', uuid);
  const before = await readFile(file, 'utf8');
  assert.deepEqual(await prepare(fake, { sessionId: 's1', token: uuid, comments: [{ ...commentsA[0], text: `  ${commentsA[0].text}  ` }] }), { ok: true });
  assert.equal(await readFile(file, 'utf8'), before, 'idempotent retry must not rewrite the immutable snapshot');

  await assert.rejects(
    prepare(fake, { sessionId: 's1', token: uuid, comments: commentsB }),
    /already prepared with different comments/u
  );
  const persisted = JSON.parse(await readFile(file, 'utf8'));
  assert.deepEqual(persisted.comments, commentsA);
  fake.unload();
});

test('prepare and recall validate every input field', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  const invalidPrepares = [
    [null, /request object/u],
    [[], /request object/u],
    [{ sessionId: '', token: uuid, comments: commentsA }, /sessionId/u],
    [{ sessionId: '.', token: uuid, comments: commentsA }, /sessionId/u],
    [{ sessionId: 's1', token: 'not-a-uuid', comments: commentsA }, /canonical UUID/u],
    [{ sessionId: 's1', token: uuid }, /comments must be an array/u],
    [{ sessionId: 's1', token: uuid, comments: [] }, /at least one comment/u],
    [{ sessionId: 's1', token: uuid, comments: [{ text: '', x: 0, y: 0 }] }, /must not be blank/u],
    [{ sessionId: 's1', token: uuid, comments: [{ text: 'x', x: '0', y: 0 }] }, /must be a finite number/u]
  ];
  for (const [input, pattern] of invalidPrepares) {
    await assert.rejects(prepare(fake, input), pattern);
  }
  await assert.rejects(fake.service().recall(null), /request object/u);
  await assert.rejects(fake.service().recall({ sessionId: 's1', token: 'bad' }), /canonical UUID/u);
  assert.equal(await fileExists(snapshotPath(profileDir, 's1', uuid)), false);
  fake.unload();
});

test('prepare surfaces a persistence failure instead of returning ok', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  // 在数据根路径的位置放一个普通文件，让 mkdir/写入失败。
  await writeFile(join(profileDir, IMAGE_ANNOTATION_DATA_SEGMENTS[0]), 'blocked');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  await assert.rejects(
    prepare(fake, { sessionId: 's1', token: token(), comments: commentsA }),
    /persist|cannot be read|ENOTDIR|EEXIST|not a directory/iu
  );
  fake.unload();
});

test('concurrent prepare preserves immutable-token semantics', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const sameToken = token();
  const same = await Promise.allSettled([
    prepare(fake, { sessionId: 's1', token: sameToken, comments: commentsA }),
    prepare(fake, { sessionId: 's1', token: sameToken, comments: commentsA })
  ]);
  assert.deepEqual(same.map(result => result.status), ['fulfilled', 'fulfilled']);

  const conflictToken = token();
  const conflict = await Promise.allSettled([
    prepare(fake, { sessionId: 's1', token: conflictToken, comments: commentsA }),
    prepare(fake, { sessionId: 's1', token: conflictToken, comments: commentsB })
  ]);
  const fulfilled = conflict.filter(result => result.status === 'fulfilled');
  const rejected = conflict.filter(result => result.status === 'rejected');
  assert.equal(fulfilled.length, 1);
  assert.equal(rejected.length, 1);
  assert.match(rejected[0].reason.message, /already prepared with different comments/u);
  const persisted = JSON.parse(await readFile(snapshotPath(profileDir, 's1', conflictToken), 'utf8'));
  assert.equal(persisted.comments.length, 1);
  assert.ok(['把这里改成圆角', '缩小这个图标'].includes(persisted.comments[0].text));
  fake.unload();
});

test('recall restores comments from disk, including for cold sessions', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const first = createFakeKernelHost({ profileDir, existingAgents: ['s1', 'cold'] });
  const uuid = token();
  await prepare(first, { sessionId: 's1', token: uuid, comments: commentsA });
  await prepare(first, { sessionId: 'cold', token: uuid, comments: commentsB });
  assert.deepEqual(await first.service().recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  assert.deepEqual(await first.service().recall({ sessionId: 's1', token: token() }), { ok: false, comments: [] });
  first.unload();

  // 模拟 Host 重启：新内核只读磁盘；live session 仍可 recall，cold session 走 sessionQuery。
  const second = createFakeKernelHost({
    profileDir,
    sessions: ['s1'],
    persistedSessions: ['cold']
  });
  assert.deepEqual(await second.service().recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  assert.deepEqual(await second.service().recall({ sessionId: 'cold', token: uuid }), {
    ok: true,
    comments: [{ text: '缩小这个图标', x: 0.5, y: 0.75 }]
  });
  assert.deepEqual(await second.service().recall({ sessionId: 'missing', token: uuid }), { ok: false, comments: [] });
  second.unload();
});

test('recall refuses to guess when no session verification service exists', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'], exposeSessionServices: false });
  await prepare(fake, { sessionId: 's1', token: token(), comments: commentsA });
  await assert.rejects(
    fake.service().recall({ sessionId: 's1', token: token() }),
    /cannot be verified/u
  );
  fake.unload();
});

test('corrupt persisted snapshots fail explicitly', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  const file = snapshotPath(profileDir, 's1', uuid);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, '{not-json', 'utf8');
  await assert.rejects(fake.service().recall({ sessionId: 's1', token: uuid }), /unreadable \(invalid JSON\)/u);
  await assert.rejects(
    prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA }),
    /unreadable \(invalid JSON\)/u
  );
  assert.equal(await fileExists(file), true);
  fake.unload();
});

test('pre-step falls back to message.id when source.rpcId is absent', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const real = userMessage({ id: 'message-without-rpc', images: [withToken('a.png', uuid)] });
  const decision = await fake.dispatchPreStep(fake.agentOf('s1'), [real]);
  const [hidden] = hiddenMessages(decision);
  assert.equal(hidden.source.requestId, 'message-without-rpc');
  fake.emitSessionEvent('s1', { id: 's1' }, { type: 'user/message', data: hidden, seq: 1 });
  assert.equal(hiddenMessages(await fake.dispatchPreStep(fake.agentOf('s1'), [real])).length, 0);
  fake.unload();
});

test('non-user context messages never receive annotation injection', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const contextMessage = {
    id: 'context-with-image',
    role: 'user',
    content: [imageBlock(withToken('a.png', uuid))],
    source: { kind: 'runtime-context', form: 'snapshot' }
  };
  const real = userMessage({ rpcId: 'req-context', images: ['plain.png'] });
  const decision = await fake.dispatchPreStep(fake.agentOf('s1'), [contextMessage, real]);
  assert.equal(hiddenMessages(decision).length, 0);
  fake.unload();
});

/* ------------------------------- clear / tombstone ------------------------------- */

test('clear writes an adjacent tombstone and preserves the immutable comments snapshot', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const jsonFile = snapshotPath(profileDir, 's1', uuid);
  const markerFile = clearPath(profileDir, 's1', uuid);
  const before = await readFile(jsonFile, 'utf8');

  assert.deepEqual(await fake.service().clear({ sessionId: 's1', token: uuid }), { ok: true });
  assert.equal(await readFile(jsonFile, 'utf8'), before, 'clear must not modify or delete the comments snapshot');
  assert.equal(dirname(markerFile), dirname(jsonFile), 'tombstone lives beside its snapshot');
  assert.equal(await fileExists(markerFile), true);
  const marker = JSON.parse(await readFile(markerFile, 'utf8'));
  assert.equal(marker.version, 1);
  assert.equal(marker.sessionId, 's1');
  assert.equal(marker.token, uuid);
  assert.equal(typeof marker.clearedAt, 'number');

  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  fake.unload();
});

test('clear is idempotent and does not rewrite an existing tombstone', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const markerFile = clearPath(profileDir, 's1', uuid);
  assert.deepEqual(await fake.service().clear({ sessionId: 's1', token: uuid }), { ok: true });
  const firstMarker = await readFile(markerFile, 'utf8');
  assert.deepEqual(await fake.service().clear({ sessionId: 's1', token: uuid }), { ok: true });
  assert.equal(await readFile(markerFile, 'utf8'), firstMarker);
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  fake.unload();
});

test('fresh kernel reads the tombstone and suppresses cleared annotations', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  await fake.service().clear({ sessionId: 's1', token: uuid });
  fake.unload();

  // 等价于新 Host 进程：新内核只有磁盘状态，没有内存缓存。
  const restarted = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  assert.deepEqual(await restarted.service().recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  const real = userMessage({ rpcId: 'req-cleared', images: [withToken('a.png', uuid)] });
  const decision = { kind: 'enter', messages: [real] };
  assert.strictEqual(
    await restarted.dispatchPreStep(restarted.agentOf('s1'), [real], { next: async () => decision }),
    decision,
    'a cleared token must contribute no hidden annotation segment'
  );
  assert.equal(await fileExists(snapshotPath(profileDir, 's1', uuid)), true);
  assert.equal(await fileExists(clearPath(profileDir, 's1', uuid)), true);
  restarted.unload();
});

test('cleared tokens are empty while other annotated images keep their own Image numbers', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const first = token();
  const second = token();
  await prepare(fake, { sessionId: 's1', token: first, comments: commentsA });
  await prepare(fake, { sessionId: 's1', token: second, comments: commentsB });
  await fake.service().clear({ sessionId: 's1', token: first });

  const mixed = userMessage({ rpcId: 'req-mixed', images: [withToken('a.png', first), withToken('b.png', second)] });
  const mixedDecision = await fake.dispatchPreStep(fake.agentOf('s1'), [mixed]);
  const hidden = hiddenMessages(mixedDecision);
  assert.equal(hidden.length, 1);
  const text = hiddenText(hidden[0]);
  assert.doesNotMatch(text, /Image 1:/u);
  assert.match(text, /Image 2:\n1\. \(x: 50%, y: 75%\) 缩小这个图标/u);

  await fake.service().clear({ sessionId: 's1', token: second });
  const allCleared = userMessage({ rpcId: 'req-all-cleared', images: [withToken('a.png', first), withToken('b.png', second)] });
  const allClearedDecision = { kind: 'enter', messages: [allCleared] };
  assert.strictEqual(
    await fake.dispatchPreStep(fake.agentOf('s1'), [allCleared], { next: async () => allClearedDecision }),
    allClearedDecision
  );
  fake.unload();
});

test('prepare after clear stays idempotent but cannot resurrect; a new token adds annotations', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  await fake.service().clear({ sessionId: 's1', token: uuid });

  assert.deepEqual(await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA }), { ok: true });
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  const real = userMessage({ rpcId: 'req-after-clear', images: [withToken('a.png', uuid)] });
  const decision = { kind: 'enter', messages: [real] };
  assert.strictEqual(await fake.dispatchPreStep(fake.agentOf('s1'), [real], { next: async () => decision }), decision);
  await assert.rejects(
    prepare(fake, { sessionId: 's1', token: uuid, comments: commentsB }),
    /already prepared with different comments/u
  );

  const fresh = token();
  await prepare(fake, { sessionId: 's1', token: fresh, comments: commentsB });
  const nextMessage = userMessage({ rpcId: 'req-new-token', images: [withToken('a.png', fresh)] });
  const nextDecision = await fake.dispatchPreStep(fake.agentOf('s1'), [nextMessage]);
  assert.equal(hiddenMessages(nextDecision).length, 1);
  assert.match(hiddenText(hiddenMessages(nextDecision)[0]), /缩小这个图标/u);
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: fresh }), {
    ok: true,
    comments: [{ text: '缩小这个图标', x: 0.5, y: 0.75 }]
  });
  fake.unload();
});

test('clear is isolated per session; other sessions keep their own snapshot', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1', 's2'] });
  const shared = token();
  await prepare(fake, { sessionId: 's1', token: shared, comments: commentsA });
  await prepare(fake, { sessionId: 's2', token: shared, comments: commentsB });
  await fake.service().clear({ sessionId: 's1', token: shared });

  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: shared }), { ok: true, comments: [] });
  assert.deepEqual(await fake.service().recall({ sessionId: 's2', token: shared }), {
    ok: true,
    comments: [{ text: '缩小这个图标', x: 0.5, y: 0.75 }]
  });
  const message = userMessage({ rpcId: 'req-shared-clear', images: [withToken('a.png', shared)] });
  const s1Decision = { kind: 'enter', messages: [message] };
  assert.strictEqual(await fake.dispatchPreStep(fake.agentOf('s1'), [message], { next: async () => s1Decision }), s1Decision);
  assert.match(hiddenText(hiddenMessages(await fake.dispatchPreStep(fake.agentOf('s2'), [message]))[0]), /缩小这个图标/u);
  fake.unload();
});

test('clear validates inputs/session/record and surfaces persistence failures', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });

  for (const [input, pattern] of [
    [null, /request object/u],
    [{ sessionId: '', token: uuid }, /sessionId/u],
    [{ sessionId: 's1', token: 'bad' }, /canonical UUID/u]
  ]) {
    await assert.rejects(fake.service().clear(input), pattern);
  }
  await assert.rejects(fake.service().clear({ sessionId: 's1', token: token() }), /no prepared snapshot/u);
  await assert.rejects(fake.service().clear({ sessionId: 'missing', token: uuid }), /was not found/u);

  const noVerification = createFakeKernelHost({ profileDir, existingAgents: ['s1'], exposeSessionServices: false });
  await assert.rejects(noVerification.service().clear({ sessionId: 's1', token: uuid }), /cannot be verified/u);
  noVerification.unload();

  // tombstone 路径被目录占据：clear 必须显式失败，且原 JSON 不被删除。
  const blocked = token();
  await prepare(fake, { sessionId: 's1', token: blocked, comments: commentsA });
  await mkdir(clearPath(profileDir, 's1', blocked), { recursive: true });
  await assert.rejects(
    fake.service().clear({ sessionId: 's1', token: blocked }),
    /clear marker|cannot be read|failed to persist/u
  );
  assert.equal(await fileExists(snapshotPath(profileDir, 's1', blocked)), true);

  // 坏 tombstone 也必须显式报错；当前内核缓存不会被外部坏文件污染，用全新内核读取磁盘。
  const corrupt = token();
  await prepare(fake, { sessionId: 's1', token: corrupt, comments: commentsA });
  await writeFile(clearPath(profileDir, 's1', corrupt), '{broken', 'utf8');
  await assert.rejects(fake.service().clear({ sessionId: 's1', token: corrupt }), /clear marker.*unreadable \(invalid JSON\)/u);
  fake.unload();
  const corruptReader = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  await assert.rejects(corruptReader.service().recall({ sessionId: 's1', token: corrupt }), /clear marker.*unreadable \(invalid JSON\)/u);
  corruptReader.unload();
});

/* ------------------------------- pre-step 注入 ------------------------------- */

test('pre-step appends one hidden message right after the real user message', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });

  const real = userMessage({ id: 'u1', rpcId: 'req-1', images: [withToken('photo.png', uuid)], text: '请看图' });
  const decision = await fake.dispatchPreStep(agent, [real], {
    next: async () => ({ kind: 'enter', messages: [real], startsRequestSeries: true })
  });
  assert.equal(decision.kind, 'enter');
  assert.equal(decision.startsRequestSeries, true);
  assert.equal(decision.messages.length, 2);
  assert.strictEqual(decision.messages[0], real);
  const hidden = decision.messages[1];
  assert.equal(hidden.role, 'user');
  assert.equal(hidden.source.kind, IMAGE_ANNOTATION_SOURCE_KIND);
  assert.equal(hidden.source.form, 'annotations');
  assert.equal(hidden.source.requestId, 'req-1');
  assert.equal(hidden.source.summary, 'image annotations');
  assert.equal(hidden.content.length, 1);
  assert.equal(hidden.content[0].type, 'text');
  assert.equal(hiddenText(hidden), IMAGE_ANNOTATION_HEADER + 'Image 1:\n1. (x: 25%, y: 40%) 把这里改成圆角');
  // 真实 user 消息原样保留，坐标只存在于隐藏消息。
  assert.equal(real.content.some(block => block.type === 'text' && block.text.includes('x:')), false);
  fake.unload();
});

test('pre-step numbers images by the real user message order including unannotated images', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const first = token();
  const third = token();
  await prepare(fake, { sessionId: 's1', token: first, comments: commentsA });
  await prepare(fake, { sessionId: 's1', token: third, comments: commentsB });
  const real = userMessage({
    rpcId: 'req-images',
    images: [withToken('a.png', first), 'plain.png', withToken('c.png', third)]
  });
  const decision = await fake.dispatchPreStep(agent, [real]);
  const [hidden] = hiddenMessages(decision);
  const text = hiddenText(hidden);
  assert.match(text, /Image 1:/u);
  assert.doesNotMatch(text, /Image 2:/u);
  assert.match(text, /Image 3:/u);
  assert.match(text, /1\. \(x: 25%, y: 40%\) 把这里改成圆角/u);
  assert.match(text, /1\. \(x: 50%, y: 75%\) 缩小这个图标/u);
  fake.unload();
});

test('multiple user messages each get their own adjacent hidden message', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const first = token();
  const second = token();
  await prepare(fake, { sessionId: 's1', token: first, comments: commentsA });
  await prepare(fake, { sessionId: 's1', token: second, comments: commentsB });
  const userA = userMessage({ id: 'uA', rpcId: 'reqA', images: [withToken('a.png', first)] });
  const userB = userMessage({ id: 'uB', rpcId: 'reqB', images: [withToken('b.png', second)] });
  const runtimeContext = { id: 'ctx', role: 'user', content: [{ type: 'text', text: 'ctx' }], source: { kind: 'runtime-context' } };
  const decision = await fake.dispatchPreStep(agent, [userA, userB], {
    next: async () => ({ kind: 'enter', messages: [userA, runtimeContext, userB] })
  });
  const kinds = decision.messages.map(message => message.source.kind);
  assert.deepEqual(kinds, ['user', IMAGE_ANNOTATION_SOURCE_KIND, 'runtime-context', 'user', IMAGE_ANNOTATION_SOURCE_KIND]);
  assert.match(hiddenText(decision.messages[1]), /把这里改成圆角/u);
  assert.match(hiddenText(decision.messages[4]), /缩小这个图标/u);
  fake.unload();
});

test('the same token can be carried again by a later message until it is actually used', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const first = userMessage({ id: 'u1', rpcId: 'req-1', images: [withToken('a.png', uuid)] });
  const second = userMessage({ id: 'u2', rpcId: 'req-2', images: [withToken('a.png', uuid)] });

  const firstDecision = await fake.dispatchPreStep(agent, [first]);
  const firstHidden = hiddenMessages(firstDecision)[0];
  fake.emitSessionEvent('s1', { id: 's1' }, { type: 'user/message', data: firstHidden, seq: 1 });

  const secondDecision = await fake.dispatchPreStep(agent, [second]);
  assert.equal(hiddenMessages(secondDecision).length, 1, 'persistent token must not be consumed by an earlier request');
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  fake.unload();
});

test('durable original user message does not consume; only the hidden message does', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const real = userMessage({ id: 'u1', rpcId: 'req-1', images: [withToken('a.png', uuid)] });

  const before = await fake.dispatchPreStep(agent, [real]);
  const hidden = hiddenMessages(before)[0];
  fake.emitSessionEvent('s1', { id: 's1' }, { type: 'user/message', data: real, seq: 1 });
  const afterOriginal = await fake.dispatchPreStep(agent, [real]);
  assert.equal(hiddenMessages(afterOriginal).length, 1, 'original user/message durable must not mark annotations committed');

  fake.emitSessionEvent('s1', { id: 's1' }, { type: 'user/message', data: hidden, seq: 2 });
  const afterHidden = await fake.dispatchPreStep(agent, [real]);
  assert.equal(hiddenMessages(afterHidden).length, 0, 'hidden message durable marks this request as already injected');

  // 已提交 request 的重放不再依赖快照文件：文件被外部删除也不应失败。
  await rm(snapshotPath(profileDir, 's1', uuid));
  assert.equal(hiddenMessages(await fake.dispatchPreStep(agent, [real])).length, 0);

  // 另一个会话的 hidden 事件不能影响本会话去重。
  const fake2 = createFakeKernelHost({ profileDir, existingAgents: ['s1', 's2'] });
  const uuid2 = token();
  await prepare(fake2, { sessionId: 's1', token: uuid2, comments: commentsA });
  const real2 = userMessage({ id: 'u2', rpcId: 'req-2', images: [withToken('a.png', uuid2)] });
  const d2 = await fake2.dispatchPreStep(fake2.agentOf('s1'), [real2]);
  const hidden2 = hiddenMessages(d2)[0];
  fake2.emitSessionEvent('s2', { id: 's2' }, { type: 'user/message', data: hidden2, seq: 3 });
  assert.equal(hiddenMessages(await fake2.dispatchPreStep(fake2.agentOf('s1'), [real2])).length, 1);
  fake2.unload();
  fake.unload();
});

test('reject and abort leave the decision untouched and do not consume annotations', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const real = userMessage({ id: 'u1', rpcId: 'req-1', images: [withToken('a.png', uuid)] });

  const rejected = { kind: 'reject' };
  assert.strictEqual(await fake.dispatchPreStep(agent, [real], { next: async () => rejected }), rejected);

  const controller = new AbortController();
  controller.abort();
  const abortedDecision = { kind: 'enter', messages: [real] };
  assert.strictEqual(
    await fake.dispatchPreStep(agent, [real], { next: async () => abortedDecision, signal: controller.signal }),
    abortedDecision
  );

  const normal = await fake.dispatchPreStep(agent, [real]);
  assert.equal(hiddenMessages(normal).length, 1);
  fake.unload();
});

test('unknown or cross-session tokens fail loudly instead of silently dropping annotations', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1', 's2'] });
  const known = token();
  const unknown = token();
  await prepare(fake, { sessionId: 's1', token: known, comments: commentsA });

  const foreign = userMessage({ id: 'u-foreign', rpcId: 'req-foreign', images: [withToken('a.png', known)] });
  await assert.rejects(
    fake.dispatchPreStep(fake.agentOf('s2'), [foreign]),
    /no prepared snapshot in session "s2"/u
  );

  const unknownMessage = userMessage({ id: 'u-unknown', rpcId: 'req-unknown', images: [withToken('b.png', unknown)] });
  await assert.rejects(
    fake.dispatchPreStep(fake.agentOf('s1'), [unknownMessage]),
    /no prepared snapshot in session "s1"/u
  );

  // 本会话快照仍在，其他 session 的读取从未发生。
  assert.deepEqual(await fake.service().recall({ sessionId: 's1', token: known }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  fake.unload();
});

test('same token prepared in two sessions keeps each session snapshot isolated', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1', 's2'] });
  const shared = token();
  await prepare(fake, { sessionId: 's1', token: shared, comments: commentsA });
  await prepare(fake, { sessionId: 's2', token: shared, comments: commentsB });

  const message = userMessage({ rpcId: 'req-shared', images: [withToken('a.png', shared)] });
  const s1Decision = await fake.dispatchPreStep(fake.agentOf('s1'), [message]);
  const s2Decision = await fake.dispatchPreStep(fake.agentOf('s2'), [message]);
  assert.match(hiddenText(hiddenMessages(s1Decision)[0]), /把这里改成圆角/u);
  assert.match(hiddenText(hiddenMessages(s2Decision)[0]), /缩小这个图标/u);
  fake.unload();
});

test('agent release clears memory but persistent snapshots reload for the same session', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const real = userMessage({ rpcId: 'req-1', images: [withToken('a.png', uuid)] });
  assert.equal(hiddenMessages(await fake.dispatchPreStep(fake.agentOf('s1'), [real])).length, 1);

  fake.releaseAgent('s1');
  const agent = fake.addAgent('s1');
  const decision = await fake.dispatchPreStep(agent, [real]);
  assert.equal(hiddenMessages(decision).length, 1, 'released agent must reload the persisted snapshot on demand');
  fake.unload();
});

test('agent/disposed and session/disposed unbind without deleting persisted files', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1', 's2'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const file = snapshotPath(profileDir, 's1', uuid);

  fake.notifyAgentDisposed('s1');
  assert.equal(await fileExists(file), true);
  fake.releaseAgent('s1');
  const agent = fake.addAgent('s1');
  const real = userMessage({ rpcId: 'req-1', images: [withToken('a.png', uuid)] });
  assert.equal(hiddenMessages(await fake.dispatchPreStep(agent, [real])).length, 1, 'a recreated agent must reload the persisted snapshot');

  fake.emitRoot('session/disposed', { id: 's1' });
  assert.equal(await fileExists(file), true);
  fake.unload();
});

test('plugin unload removes listeners/service but leaves persistent files for a fresh registry', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const uuid = token();
  await prepare(fake, { sessionId: 's1', token: uuid, comments: commentsA });
  const file = snapshotPath(profileDir, 's1', uuid);
  const real = userMessage({ rpcId: 'req-1', images: [withToken('a.png', uuid)] });
  const agent = fake.agentOf('s1');
  assert.equal(hiddenMessages(await fake.dispatchPreStep(agent, [real])).length, 1);

  fake.unload();
  assert.equal(fake.service(), undefined);
  assert.equal(await fileExists(file), true);
  const afterUnload = await fake.dispatchPreStep(agent, [real]);
  assert.strictEqual(afterUnload.messages.length, 1, 'no annotation listener may survive plugin unload');

  const restarted = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  assert.deepEqual(await restarted.service().recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  assert.equal(hiddenMessages(await restarted.dispatchPreStep(restarted.agentOf('s1'), [real])).length, 1);
  await assert.rejects(
    prepare(restarted, { sessionId: 's1', token: uuid, comments: commentsB }),
    /different comments/u
  );
  restarted.unload();
});

test('agents created before or after install are both bound', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['before'] });
  fake.addAgent('after');
  for (const sessionId of ['before', 'after']) {
    const uuid = token();
    await prepare(fake, { sessionId, token: uuid, comments: commentsA });
    const real = userMessage({ rpcId: `req-${sessionId}`, images: [withToken('a.png', uuid)] });
    assert.equal(hiddenMessages(await fake.dispatchPreStep(fake.agentOf(sessionId), [real])).length, 1, sessionId);
  }
  fake.unload();
});

test('malformed token-like names are treated as ordinary images and ignored', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const agent = fake.agentOf('s1');
  const real = userMessage({ rpcId: 'req-bad', images: [`x${IMAGE_ANNOTATION_FILENAME_MARKER}not-a-uuid__.png`] });
  const decision = { kind: 'enter', messages: [real] };
  assert.strictEqual(await fake.dispatchPreStep(agent, [real], { next: async () => decision }), decision);
  fake.unload();
});

test('pre-step does not partially inject when one image token is unknown', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  const fake = createFakeKernelHost({ profileDir, existingAgents: ['s1'] });
  const known = token();
  await prepare(fake, { sessionId: 's1', token: known, comments: commentsA });
  const real = userMessage({
    rpcId: 'req-partial',
    images: [withToken('a.png', known), withToken('b.png', token())]
  });
  await assert.rejects(fake.dispatchPreStep(fake.agentOf('s1'), [real]), /no prepared snapshot/u);
  fake.unload();
});

test('store API rejects path-traversal session ids and bad tokens', async () => {
  const profileDir = await makeTempDir('dsh-ia-profile-');
  assert.throws(() => snapshotPath(profileDir, '..', token()), /sessionId is not a usable directory name/u);
  assert.throws(() => snapshotPath(profileDir, '.', token()), /sessionId is not a usable directory name/u);
  assert.throws(() => snapshotPath(profileDir, '', token()), /sessionId must be a non-empty string/u);
  assert.throws(() => snapshotPath(profileDir, 's1', '../x'), /canonical UUID/u);
  const store = createImageAnnotationSnapshotStore(profileDir);
  await assert.rejects(store.save('s1', 'bad', commentsA), /canonical UUID/u);
  await assert.rejects(store.read('s1', 'bad'), /canonical UUID/u);
  assert.equal(await store.read('s1', token()), null);
});

/* --------------------------- 真实 Host SDK 隔离夹具 --------------------------- */

function openAsarReader(asarPath) {
  const fd = openSync(asarPath, 'r');
  const sizeBuffer = Buffer.alloc(16);
  readSync(fd, sizeBuffer, 0, 16, 0);
  closeSync(fd);
  const headerSize = sizeBuffer.readUInt32LE(4);
  const jsonLength = sizeBuffer.readUInt32LE(12);
  const readFd = openSync(asarPath, 'r');
  const headerBuffer = Buffer.alloc(jsonLength);
  readSync(readFd, headerBuffer, 0, jsonLength, 16);
  closeSync(readFd);
  const header = JSON.parse(headerBuffer.toString('utf8').replace(/\0+$/u, ''));
  const baseOffset = 8 + headerSize;
  const entries = [];
  const walk = (node, prefix) => {
    for (const [name, entry] of Object.entries(node.files ?? {})) {
      const path = prefix === '' ? name : `${prefix}/${name}`;
      if (entry.files !== undefined) {
        walk(entry, path);
      } else if (entry.unpacked !== true) {
        entries.push({ path, size: entry.size, offset: entry.offset });
      }
    }
  };
  walk(header, '');
  const byPath = new Map(entries.map(entry => [entry.path, entry]));
  return {
    read(member) {
      const entry = byPath.get(member);
      if (entry === undefined) throw new Error(`ASAR member not found: ${member}`);
      const data = Buffer.alloc(entry.size);
      const readHandle = openSync(asarPath, 'r');
      readSync(readHandle, data, 0, entry.size, baseOffset + Number(entry.offset));
      closeSync(readHandle);
      return data;
    }
  };
}

const SDK_PACKAGE_PREFIX = 'dsh/node_modules/@deepseek-ai/';
const SDK_PACKAGES = {
  'dsh-typert-protocol': ['package.json', 'lib/index.js'],
  'dsh-scope': ['package.json', 'lib/index.js'],
  'dsh-util-crypto': ['package.json', 'lib/index.js'],
  'dsh-brand': ['package.json', 'lib/index.js'],
  'dsh-util-values': ['package.json', 'lib/index.js']
};

let realSdkPromise;

function loadRealSdk() {
  realSdkPromise ??= buildRealSdk().catch(error => {
    // 环境缺包/权限问题时返回 null，由各真实 SDK 用例 skip 并保留原因。
    return { unavailable: error instanceof Error ? error.message : String(error) };
  });
  return realSdkPromise;
}

async function buildRealSdk() {
  if (!existsSync(ASAR_PATH)) {
    return { unavailable: `ASAR not found at ${ASAR_PATH} (set DSH_ASAR to override)` };
  }
  const fixtureRoot = await makeTempDir('dsh-ia-sdk-');
  const dataDir = await makeTempDir('dsh-ia-sdk-data-');
  const nodeModules = join(fixtureRoot, 'node_modules', '@deepseek-ai');
  await mkdir(nodeModules, { recursive: true });
  await writeFile(join(fixtureRoot, 'package.json'), JSON.stringify({ name: 'dsh-image-annotations-sdk-fixture', private: true, type: 'module' }, null, 2));
  const asar = openAsarReader(ASAR_PATH);

  for (const [packageName, members] of Object.entries(SDK_PACKAGES)) {
    const packageDir = join(nodeModules, packageName);
    for (const member of members) {
      const target = join(packageDir, member);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, asar.read(`${SDK_PACKAGE_PREFIX}${packageName}/${member}`));
    }
  }
  // 官方 dsh-llm 的 message.js 只依赖 3 个零依赖 util 包；这里只暴露 createUserMessage 所需入口。
  {
    const packageDir = join(nodeModules, 'dsh-llm');
    await mkdir(join(packageDir, 'lib', 'types'), { recursive: true });
    await writeFile(join(packageDir, 'lib', 'types', 'message.js'), asar.read(`${SDK_PACKAGE_PREFIX}dsh-llm/lib/types/message.js`));
    await writeFile(join(packageDir, 'package.json'), JSON.stringify({
      name: '@deepseek-ai/dsh-llm',
      private: true,
      type: 'module',
      exports: { '.': './lib/types/message.js' }
    }, null, 2));
  }
  // 官方 agentEvents 派发器；它只依赖 dsh-scope。
  {
    const packageDir = join(nodeModules, 'dsh-agent');
    await mkdir(join(packageDir, 'lib', 'types'), { recursive: true });
    await writeFile(join(packageDir, 'lib', 'types', 'dispatch.js'), asar.read(`${SDK_PACKAGE_PREFIX}dsh-agent/lib/types/dispatch.js`));
    await writeFile(join(packageDir, 'package.json'), JSON.stringify({
      name: '@deepseek-ai/dsh-agent',
      private: true,
      type: 'module'
    }, null, 2));
  }
  // 本地已安装的 Cordis 及其依赖复制进夹具，避免测试期间解析到其它副本。
  for (const [linkName, source] of [
    ['@deepseek-ai/cordis', join(pluginRoot, 'node_modules', '@deepseek-ai', 'cordis')],
    ['@deepseek-ai/cosmokit', join(pluginRoot, 'node_modules', '@deepseek-ai', 'cosmokit')],
    ['@standard-schema/spec', join(pluginRoot, 'node_modules', '@standard-schema', 'spec')]
  ]) {
    const target = join(fixtureRoot, 'node_modules', ...linkName.split('/'));
    await cp(source, target, { recursive: true });
  }

  const cordis = await import(pathToFileURL(join(nodeModules, 'cordis', 'lib', 'index.js')).href);
  const protocol = await import(pathToFileURL(join(nodeModules, 'dsh-typert-protocol', 'lib', 'index.js')).href);
  const scope = await import(pathToFileURL(join(nodeModules, 'dsh-scope', 'lib', 'index.js')).href);
  const dispatch = await import(pathToFileURL(join(nodeModules, 'dsh-agent', 'lib', 'types', 'dispatch.js')).href);
  const message = await import(pathToFileURL(join(nodeModules, 'dsh-llm', 'lib', 'types', 'message.js')).href);
  if (typeof cordis.Context !== 'function' || typeof protocol.Remote !== 'function'
    || typeof scope.createScope !== 'function' || typeof dispatch.agentEvents !== 'function'
    || typeof message.createUserMessage !== 'function') {
    throw new Error('extracted SDK fixture did not expose the expected constructors');
  }
  return {
    fixtureRoot,
    dataDir,
    installAnchor: join(fixtureRoot, 'package.json'),
    cordis,
    protocol,
    scope,
    dispatch,
    createUserMessage: message.createUserMessage
  };
}

async function createRealHost(sdk) {
  const { Context, Service } = sdk.cordis;
  const ctx = new Context();
  class ProfileContextService extends Service {
    constructor(inner) {
      super(inner, 'profileContext');
      this.dir = sdk.dataDir;
      this.installAnchor = sdk.installAnchor;
    }
  }
  class AgentsService extends Service {
    constructor(inner) {
      super(inner, 'agents');
      this.store = new Map();
    }
    get(id) {
      return this.store.get(id);
    }
    list() {
      return [...this.store.values()];
    }
  }
  class SessionsService extends Service {
    constructor(inner) {
      super(inner, 'sessions');
      this.store = new Map();
      this.persisted = new Set();
    }
    get(id) {
      return this.store.get(id);
    }
  }
  class SessionQueryService extends Service {
    constructor(inner) {
      super(inner, 'sessionQuery');
    }
    async observeSession(id) {
      const sessions = this.ctx.get('sessions');
      if (sessions.get(id) !== undefined || sessions.persisted.has(id)) return { [Symbol.dispose]() {} };
      const error = new Error(`session "${id}" not found`);
      error.code = 'SESSION_QUERY_SESSION_NOT_FOUND';
      throw error;
    }
  }
  await ctx.plugin(ProfileContextService);
  await ctx.plugin(AgentsService);
  await ctx.plugin(SessionsService);
  await ctx.plugin(SessionQueryService);
  const agents = ctx.get('agents');
  const sessions = ctx.get('sessions');
  const pluginDefinition = { name: host.name, inject: host.inject, apply: host.apply };
  let fiber = ctx.plugin(pluginDefinition);
  await fiber;

  function spawn(sessionId) {
    const agent = { id: sessionId, session: { id: sessionId }, options: {}, ctx: undefined };
    const scopeHandle = sdk.scope.createScope(ctx, agent);
    agent.ctx = scopeHandle.ctx;
    agents.store.set(sessionId, agent);
    const session = { id: sessionId, events: [] };
    sessions.store.set(sessionId, session);
    const events = sdk.dispatch.agentEvents(ctx, agent);
    return { agent, session, scopeHandle, events };
  }

  async function announce(entry) {
    await entry.events.serial('agent/created', { source: 'startup' });
    return entry;
  }

  function preStep(entry, messages, { next, signal } = {}) {
    const signalValue = signal ?? new AbortController().signal;
    const base = next ?? (async () => ({ kind: 'enter', messages }));
    return entry.events.waterfall(
      'agent/pre-step',
      { messages, turn: 1, step: 1, signal: signalValue },
      base
    );
  }

  function emitSession(entry, event) {
    const carrier = sdk.scope.scopeTarget(entry.session, sdk.scope.scopeOf(entry.agent.ctx));
    ctx.emit(carrier, 'session/event', entry.session, event);
  }

  async function release(entry) {
    await entry.scopeHandle.dispose();
    agents.store.delete(entry.agent.id);
    entry.events.emit('agent/disposed', {});
  }

  return {
    ctx,
    agents,
    sessions,
    spawn,
    announce,
    preStep,
    emitSession,
    release,
    service: () => ctx.get(IMAGE_ANNOTATION_REMOTE_NAMESPACE),
    disposePlugins: async () => {
      await fiber.dispose();
    },
    reloadPlugin: async () => {
      fiber = ctx.plugin(pluginDefinition);
      await fiber;
      return fiber;
    }
  };
}

function realSdkTest(title, fn) {
  return test(title, async t => {
    const sdk = await loadRealSdk();
    if (sdk.unavailable !== undefined) {
      t.skip(`real Host SDK fixture unavailable: ${sdk.unavailable}`);
      return;
    }
    await fn(t, sdk);
  });
}

realSdkTest('real SDK: apply registers Remote namespace and persists into the real profile dir', async (t, sdk) => {
  const real = await createRealHost(sdk);
  const service = real.service();
  assert.notEqual(service, undefined);
  assert.equal(service.name, IMAGE_ANNOTATION_REMOTE_NAMESPACE);
  assert.equal(service.typertRemote.namespace, IMAGE_ANNOTATION_REMOTE_NAMESPACE);
  const methods = sdk.protocol.remoteMethods(service).map(marker => marker.method);
  assert.deepEqual(methods, ['prepare', 'recall', 'clear']);

  const entry = await real.announce(real.spawn('s1'));
  const uuid = token();
  const result = await service.prepare({ sessionId: 's1', token: uuid, comments: commentsA });
  assert.deepEqual(result, { ok: true });
  const file = snapshotPath(sdk.dataDir, 's1', uuid);
  assert.equal(await fileExists(file), true);
  assert.equal(resolve(file).startsWith(resolve(sdk.fixtureRoot)), false, 'data must not be written into the plugin/package directory');
  assert.deepEqual(await service.recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });

  // 真实 createUserMessage：隐藏消息由官方构造函数创建并 deepFreeze。
  const user = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', uuid)), { type: 'text', text: '请看图' }],
    source: { kind: 'user', rpcId: 'req-1' }
  });
  const decision = await real.preStep(entry, [user], {
    next: async () => ({ kind: 'enter', messages: [user] })
  });
  assert.equal(decision.messages.length, 2);
  assert.strictEqual(decision.messages[0], user);
  const hidden = decision.messages[1];
  assert.equal(Object.isFrozen(hidden), true);
  assert.equal(hidden.role, 'user');
  assert.equal(hidden.source.kind, IMAGE_ANNOTATION_SOURCE_KIND);
  assert.equal(hidden.source.requestId, 'req-1');
  assert.equal(hiddenText(hidden), IMAGE_ANNOTATION_HEADER + 'Image 1:\n1. (x: 25%, y: 40%) 把这里改成圆角');

  // 原始 user durable 不消费；hidden durable 才标记 committed。
  real.emitSession(entry, { type: 'user/message', data: user, seq: 1 });
  const afterOriginal = await real.preStep(entry, [user], {
    next: async () => ({ kind: 'enter', messages: [user] })
  });
  assert.equal(hiddenMessages(afterOriginal).length, 1);
  real.emitSession(entry, { type: 'user/message', data: hidden, seq: 2 });
  const afterHidden = await real.preStep(entry, [user], {
    next: async () => ({ kind: 'enter', messages: [user] })
  });
  assert.equal(hiddenMessages(afterHidden).length, 0);

  // token 快照不因消费删除；同 token 不同内容拒绝。
  assert.deepEqual(await service.recall({ sessionId: 's1', token: uuid }), {
    ok: true,
    comments: [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]
  });
  await assert.rejects(
    service.prepare({ sessionId: 's1', token: uuid, comments: commentsB }),
    /different comments/u
  );

  // clear：tombstone 持久化，原快照保留；同 token 再 prepare 不能取消 clear。
  const clearFile = clearPath(sdk.dataDir, 's1', uuid);
  assert.deepEqual(await service.clear({ sessionId: 's1', token: uuid }), { ok: true });
  assert.equal(await fileExists(file), true);
  assert.equal(await fileExists(clearFile), true);
  assert.deepEqual(await service.recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  assert.deepEqual(await service.prepare({ sessionId: 's1', token: uuid, comments: commentsA }), { ok: true });
  assert.deepEqual(await service.recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  const clearedUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', uuid))],
    source: { kind: 'user', rpcId: 'req-cleared' }
  });
  const clearedDecision = { kind: 'enter', messages: [clearedUser] };
  assert.strictEqual(
    await real.preStep(entry, [clearedUser], { next: async () => clearedDecision }),
    clearedDecision,
    'cleared token must not add a hidden segment'
  );

  // 新 token 才新增批注；旧 token 保持已清空。
  const nextToken = token();
  await service.prepare({ sessionId: 's1', token: nextToken, comments: commentsB });
  const nextUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', nextToken))],
    source: { kind: 'user', rpcId: 'req-next' }
  });
  const nextDecision = await real.preStep(entry, [nextUser], {
    next: async () => ({ kind: 'enter', messages: [nextUser] })
  });
  assert.match(hiddenText(hiddenMessages(nextDecision)[0]), /缩小这个图标/u);

  await real.release(entry);
  await real.disposePlugins();
  assert.equal(real.service(), undefined);
  // 插件卸载后旧 agent 的 hidden 注入监听必须消失。
  const afterDisposeUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', uuid)), { type: 'text', text: '再看一次' }],
    source: { kind: 'user', rpcId: 'req-2' }
  });
  const entry2 = await real.announce(real.spawn('s1'));
  const afterDispose = await real.preStep(entry2, [afterDisposeUser], {
    next: async () => ({ kind: 'enter', messages: [afterDisposeUser] })
  });
  assert.strictEqual(afterDispose.messages.length, 1);

  // 重新加载组件：tombstone 与新 token 都从磁盘恢复；既有 live agent 由 agents.list() 重新绑定。
  await real.reloadPlugin();
  const service2 = real.service();
  assert.deepEqual(await service2.recall({ sessionId: 's1', token: uuid }), { ok: true, comments: [] });
  assert.deepEqual(await service2.recall({ sessionId: 's1', token: nextToken }), {
    ok: true,
    comments: [{ text: '缩小这个图标', x: 0.5, y: 0.75 }]
  });
  const reloadClearedUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', uuid))],
    source: { kind: 'user', rpcId: 'req-reload-cleared' }
  });
  const reloadClearedDecision = { kind: 'enter', messages: [reloadClearedUser] };
  assert.strictEqual(
    await real.preStep(entry2, [reloadClearedUser], { next: async () => reloadClearedDecision }),
    reloadClearedDecision
  );
  const reloadUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', nextToken)), { type: 'text', text: '重启后继续' }],
    source: { kind: 'user', rpcId: 'req-reload' }
  });
  const reloadDecision = await real.preStep(entry2, [reloadUser], {
    next: async () => ({ kind: 'enter', messages: [reloadUser] })
  });
  assert.equal(hiddenMessages(reloadDecision).length, 1);
  assert.match(hiddenText(hiddenMessages(reloadDecision)[0]), /\(x: 50%, y: 75%\) 缩小这个图标/u);
  await assert.rejects(
    service2.prepare({ sessionId: 's1', token: uuid, comments: commentsB }),
    /different comments/u
  );
  await real.release(entry2);
});

realSdkTest('real SDK: scoped dispatch keeps sessions apart and bad files fail explicitly', async (t, sdk) => {
  const real = await createRealHost(sdk);
  const first = await real.announce(real.spawn('s1'));
  const second = await real.announce(real.spawn('s2'));
  const uuid = token();
  await real.service().prepare({ sessionId: 's1', token: uuid, comments: commentsA });

  const foreign = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', uuid))],
    source: { kind: 'user', rpcId: 'req-foreign' }
  });
  await assert.rejects(real.preStep(second, [foreign]), /no prepared snapshot in session "s2"/u);
  assert.deepEqual(await real.service().recall({ sessionId: 's2', token: uuid }), { ok: false, comments: [] });
  assert.deepEqual(await real.service().recall({ sessionId: 'unknown', token: uuid }), { ok: false, comments: [] });

  // 历史图刷新场景：会话不再是 live，但持久化存在时 recall 仍可读。
  const cold = token();
  await real.service().prepare({ sessionId: 's1', token: cold, comments: commentsB });
  real.sessions.store.delete('s1');
  real.sessions.persisted.add('s1');
  assert.deepEqual(await real.service().recall({ sessionId: 's1', token: cold }), {
    ok: true,
    comments: [{ text: '缩小这个图标', x: 0.5, y: 0.75 }]
  });

  // 坏持久文件必须显式报错（不静默当作无批注）。
  const corrupt = token();
  const corruptFile = snapshotPath(sdk.dataDir, 's2', corrupt);
  await mkdir(dirname(corruptFile), { recursive: true });
  await writeFile(corruptFile, '{broken', 'utf8');
  await assert.rejects(real.service().recall({ sessionId: 's2', token: corrupt }), /unreadable \(invalid JSON\)/u);
  const corruptUser = sdk.createUserMessage({
    content: [imageBlock(withToken('photo.png', corrupt))],
    source: { kind: 'user', rpcId: 'req-corrupt' }
  });
  await assert.rejects(real.preStep(second, [corruptUser]), /unreadable \(invalid JSON\)/u);

  await real.release(first);
  await real.release(second);
});

realSdkTest('real SDK: apply validates profile context and unavailable SDK resolution', async () => {
  await assert.rejects(host.apply({}), /profileContext is unavailable/u);
  await assert.rejects(host.apply({ profileContext: { dir: '' } }), /profileContext\.dir is unavailable/u);
});

/* ------------------------------- 组件导出形状 ------------------------------- */

test('component exports the fixed name/inject contract', () => {
  assert.equal(host.name, 'codex-style-image-annotations');
  assert.deepEqual(host.inject, ['profileContext', 'agents']);
  assert.equal(typeof host.apply, 'function');
  assert.equal(typeof createImageAnnotationsHostKernel, 'function');
  assert.deepEqual([...IMAGE_ANNOTATION_DATA_SEGMENTS], ['data', 'dsh-codex-style', 'image-annotations']);
});

test('built host entry re-exports this source half when build output exists', async t => {
  const markerPath = join(pluginRoot, 'lib', 'image-annotations.js');
  const builtHostPath = join(pluginRoot, 'lib', 'image-annotations-host.js');
  if (!existsSync(markerPath) || !existsSync(builtHostPath)) {
    t.skip('build output is owned by a parallel task and is not present in this checkout');
    return;
  }
  const [builtHost, marker] = await Promise.all([
    import(`${pathToFileURL(builtHostPath).href}?probe=${Date.now()}`),
    import(`${pathToFileURL(markerPath).href}?probe=${Date.now()}`)
  ]);
  assert.equal(builtHost.name, host.name);
  assert.deepEqual(builtHost.inject, host.inject);
  assert.equal(typeof builtHost.apply, 'function');
  assert.equal(marker.name, host.name);
  assert.deepEqual(marker.inject, host.inject);
  assert.equal(typeof marker.apply, 'function');
});
