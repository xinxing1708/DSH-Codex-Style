// 图片批注客户端集成功能测试。
// 通过 node:vm 同时加载 src/image-annotations.js 与 src/image-annotations-integration.js，
// 注入迷你 React 运行时、DOM/Canvas/File/URL 桩，以及只实现公开契约的假宿主，
// 真实驱动组件事件、Remote 调用与草稿动作；不做源码字符串比对。
//
// 运行：node scripts/test-image-annotations-integration.mjs

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const uiSource = await readFile(resolve(root, 'src/image-annotations.js'), 'utf8');
const integrationSource = await readFile(resolve(root, 'src/image-annotations-integration.js'), 'utf8');
const integrationCss = await readFile(resolve(root, 'src/image-annotations-integration.css'), 'utf8');
const UI_CSS = '.dsc-ia-test{color:#fff}';
const PLUGIN_PACKAGE = '@xinxing1708/dsh-codex-style';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

test('真实 URL 构造器可为手绘源图创建和释放 Blob URL', () => {
  assert.equal(typeof URL, 'function');
  const scope = vm.createContext({ URL });
  vm.runInContext(integrationSource, scope);
  const blob = new Blob(['image bytes'], { type: 'image/png' });
  const url = scope.imageAnnotationIntegrationCreateObjectUrl(blob);
  assert.ok(url.startsWith('blob:'), '手绘导出必须取得有效源图 URL');
  scope.imageAnnotationIntegrationRevokeObjectUrl(url);
  assert.equal(scope.imageAnnotationIntegrationCreateObjectUrl({}), '', '不支持的源由调用方处理');
});

/* ---------------------------- 迷你 React 运行时 ---------------------------- */

const FRAGMENT = Symbol.for('image-annotation-integration-test.fragment');
const PORTAL = Symbol.for('image-annotation-integration-test.portal');

function createMiniReact() {
  const pending = [];
  const instances = new Set();
  let current = null;
  let running = false;

  const flush = () => {
    if (running) return;
    running = true;
    try {
      let guard = 0;
      while (pending.length > 0 && guard < 80) {
        guard += 1;
        const batch = pending.splice(0);
        for (const instance of batch) {
          if (!instance.disposed) renderInstance(instance);
        }
      }
    } finally {
      running = false;
    }
  };

  const schedule = instance => {
    if (!instance.disposed && pending.indexOf(instance) < 0) pending.push(instance);
  };

  const depsChanged = (previous, next) => {
    if (!previous || !next) return true;
    if (previous.length !== next.length) return true;
    for (let index = 0; index < previous.length; index += 1) {
      if (!Object.is(previous[index], next[index])) return true;
    }
    return false;
  };

  const useState = initial => {
    const instance = current;
    const index = instance.cursor;
    instance.cursor += 1;
    if (!(index in instance.hooks)) {
      instance.hooks[index] = { value: typeof initial === 'function' ? initial() : initial };
    }
    const slot = instance.hooks[index];
    return [slot.value, next => {
      const value = typeof next === 'function' ? next(slot.value) : next;
      if (Object.is(value, slot.value)) return;
      slot.value = value;
      schedule(instance);
    }];
  };

  const useRef = initial => {
    const instance = current;
    const index = instance.cursor;
    instance.cursor += 1;
    if (!(index in instance.hooks)) instance.hooks[index] = { current: initial };
    return instance.hooks[index];
  };

  const useMemo = (factory, deps) => {
    const instance = current;
    const index = instance.cursor;
    instance.cursor += 1;
    const previous = instance.hooks[index];
    if (previous && !depsChanged(previous.deps, deps)) return previous.value;
    const value = factory();
    instance.hooks[index] = { value, deps };
    return value;
  };

  const useCallback = (callback, deps) => useMemo(() => callback, deps);

  const useEffect = (effect, deps) => {
    const instance = current;
    instance.cursor += 1;
    instance.effectDefs.push({ effect, deps });
  };

  const useLayoutEffect = useEffect;

  const createElement = (type, props, ...children) => {
    const config = { ...(props || {}) };
    const kids = children.flat(Infinity).filter(child => child !== null && child !== undefined && child !== false && child !== true);
    if (kids.length > 0) config.children = kids.length === 1 ? kids[0] : kids;
    return { type, props: config, key: config.key };
  };

  const createPortal = (children, container) => ({ type: PORTAL, props: { children, container } });

  const runCleanup = slot => {
    if (!slot || typeof slot.cleanup !== 'function') return;
    const cleanup = slot.cleanup;
    slot.cleanup = undefined;
    try {
      cleanup();
    } catch (error) {
      console.error('[test] effect cleanup failed', error);
    }
  };

  const runEffects = instance => {
    const defs = instance.effectDefs;
    for (let index = 0; index < defs.length; index += 1) {
      const def = defs[index];
      const slot = instance.effectSlots[index];
      if (!slot) {
        const created = { deps: def.deps, cleanup: undefined };
        instance.effectSlots[index] = created;
        const cleanup = def.effect();
        if (typeof cleanup === 'function') created.cleanup = cleanup;
      } else if (depsChanged(slot.deps, def.deps)) {
        runCleanup(slot);
        slot.deps = def.deps;
        const cleanup = def.effect();
        if (typeof cleanup === 'function') slot.cleanup = cleanup;
      }
    }
    if (instance.effectSlots.length > defs.length) {
      for (let index = defs.length; index < instance.effectSlots.length; index += 1) runCleanup(instance.effectSlots[index]);
      instance.effectSlots.length = defs.length;
    }
  };

  const materialize = (parent, node) => {
    if (node === null || node === undefined || node === false || node === true) return null;
    if (Array.isArray(node)) {
      const rows = [];
      for (const child of node) {
        const item = materialize(parent, child);
        if (item !== null && item !== undefined) rows.push(item);
      }
      return rows;
    }
    if (typeof node !== 'object') return node;
    if (node.type === FRAGMENT) return materialize(parent, node.props && node.props.children);
    if (node.type === PORTAL) {
      return { type: PORTAL, props: { children: materialize(parent, node.props.children), container: node.props.container } };
    }
    if (typeof node.type === 'function') {
      const key = node.key !== undefined ? 'k:' + String(node.key) : 'i:' + parent.materializeIndex;
      parent.materializeIndex += 1;
      let child = parent.nextChildren.get(key) || parent.children.get(key);
      if (!child || child.type !== node.type) {
        if (child) disposeInstance(child);
        child = createInstance(node.type, key);
        child.props = node.props || {};
        child.parent = parent;
        parent.nextChildren.set(key, child);
        renderInstance(child);
        return child.output;
      }
      child.props = node.props || {};
      child.parent = parent;
      renderInstance(child);
      return child.output;
    }
    const props = { ...(node.props || {}) };
    if (props.children !== undefined) props.children = materialize(parent, props.children);
    return { type: node.type, props };
  };

  const createInstance = (type, key) => {
    const instance = {
      type,
      key,
      props: {},
      hooks: [],
      cursor: 0,
      effectSlots: [],
      effectDefs: [],
      children: new Map(),
      nextChildren: new Map(),
      materializeIndex: 0,
      passiveIndex: 0,
      rawOutput: null,
      output: null,
      parent: null,
      disposed: false
    };
    instances.add(instance);
    return instance;
  };

  // 子组件 rerender 后，父级缓存的 materialize 结果会过期；沿 parent 链用最新子输出重建快照。
  const passiveMaterialize = (parent, node) => {
    if (node === null || node === undefined || node === false || node === true) return null;
    if (Array.isArray(node)) {
      const rows = [];
      for (const child of node) {
        const item = passiveMaterialize(parent, child);
        if (item !== null && item !== undefined) rows.push(item);
      }
      return rows;
    }
    if (typeof node !== 'object') return node;
    if (node.type === FRAGMENT) return passiveMaterialize(parent, node.props && node.props.children);
    if (node.type === PORTAL) {
      return { type: PORTAL, props: { children: passiveMaterialize(parent, node.props.children), container: node.props.container } };
    }
    if (typeof node.type === 'function') {
      const key = node.key !== undefined ? 'k:' + String(node.key) : 'i:' + parent.passiveIndex;
      parent.passiveIndex += 1;
      const child = parent.children.get(key);
      if (!child || child.type !== node.type) return null;
      return child.output;
    }
    const props = { ...(node.props || {}) };
    if (props.children !== undefined) props.children = passiveMaterialize(parent, props.children);
    return { type: node.type, props };
  };

  const refreshAncestors = instance => {
    let parent = instance.parent;
    while (parent && !parent.disposed) {
      parent.passiveIndex = 0;
      parent.output = passiveMaterialize(parent, parent.rawOutput);
      parent = parent.parent;
    }
  };

  const disposeInstance = instance => {
    if (!instance || instance.disposed) return;
    instance.disposed = true;
    for (const slot of instance.effectSlots) runCleanup(slot);
    instance.effectSlots = [];
    for (const child of instance.children.values()) disposeInstance(child);
    instance.children.clear();
    instances.delete(instance);
  };

  const renderInstance = instance => {
    if (instance.disposed) return;
    current = instance;
    instance.cursor = 0;
    instance.materializeIndex = 0;
    instance.effectDefs = [];
    instance.nextChildren = new Map();
    let output = null;
    try {
      output = instance.type(instance.props);
    } catch (error) {
      current = null;
      throw error;
    }
    current = null;
    // 与真实 React 一致：同一实例两次渲染的 Hook 数量必须相同（否则 React #310/#300）。
    if (instance.hookCount !== undefined && instance.hookCount !== instance.cursor) {
      throw new Error('Hook 数量变化：' + instance.hookCount + ' → ' + instance.cursor);
    }
    instance.hookCount = instance.cursor;
    instance.rawOutput = output;
    instance.output = materialize(instance, output);
    for (const [key, child] of Array.from(instance.children.entries())) {
      if (!instance.nextChildren.has(key)) {
        disposeInstance(child);
        instance.children.delete(key);
      }
    }
    for (const [key, child] of instance.nextChildren.entries()) instance.children.set(key, child);
    runEffects(instance);
    refreshAncestors(instance);
  };

  const mount = (type, props) => {
    const instance = createInstance(type, 'root');
    instance.props = props || {};
    renderInstance(instance);
    flush();
    return {
      get output() {
        return instance.output;
      },
      get instance() {
        return instance;
      },
      rerender(nextProps) {
        if (nextProps) instance.props = nextProps;
        renderInstance(instance);
        flush();
      },
      unmount() {
        disposeInstance(instance);
        flush();
      }
    };
  };

  return {
    React: {
      createElement,
      Fragment: FRAGMENT,
      useState,
      useRef,
      useMemo,
      useCallback,
      useEffect,
      useLayoutEffect
    },
    createPortal,
    mount,
    flush
  };
}

/* ------------------------------ 浏览器桩 ------------------------------ */

function createBrowserStubs(options = {}) {
  const objectUrls = new Map();
  const createdUrls = [];
  const revokedUrls = [];
  const createdElements = [];
  const listeners = { document: new Map(), window: new Map() };
  const imageDimensions = new Map(options.imageDimensions || []);
  const localStorageWrites = [];
  let urlSequence = 0;
  let uuidSequence = 0;

  class FakeBlob {
    constructor(parts, init) {
      this.parts = Array.isArray(parts) ? parts : [parts];
      this.type = init && init.type ? String(init.type) : '';
      this.size = this.parts.reduce((total, part) => total + (typeof part === 'string' ? part.length : (part && Number(part.size)) || 0), 0);
    }
  }

  class FakeFile extends FakeBlob {
    constructor(parts, name, init = {}) {
      super(parts, init);
      this.name = String(name === undefined ? '' : name);
      this.lastModified = 0;
    }
  }

  const addListener = (scope, type, fn) => {
    if (!listeners[scope].has(type)) listeners[scope].set(type, []);
    listeners[scope].get(type).push(fn);
  };
  const removeListener = (scope, type, fn) => {
    const list = listeners[scope].get(type) || [];
    const index = list.indexOf(fn);
    if (index >= 0) list.splice(index, 1);
  };
  const countListeners = (scope, type) => (listeners[scope].get(type) || []).length;

  const createCanvas = () => {
    const context = {
      canvas: null,
      calls: [],
      fillTextCalls: [],
      drawImageCalls: [],
      save() {},
      restore() {},
      translate() {},
      scale() {},
      rotate() {},
      setLineDash() {},
      beginPath() {},
      closePath() {},
      moveTo() {},
      lineTo() {},
      arc() {},
      ellipse() {},
      rect() {},
      roundRect() {},
      stroke() {},
      fill() {},
      clip() {},
      fillRect() {},
      strokeRect() {},
      clearRect() {},
      drawImage(...args) { context.drawImageCalls.push(args); },
      fillText(text) { context.fillTextCalls.push(String(text)); },
      strokeText() {},
      measureText(text) { return { width: String(text || '').length * 6 }; },
      createLinearGradient() { return { addColorStop() {} }; }
    };
    const canvas = {
      tagName: 'CANVAS',
      style: {},
      width: 0,
      height: 0,
      getContext() {
        context.canvas = canvas;
        return context;
      },
      toBlob(callback) {
        callback(new FakeBlob(['CANVAS_BURNED'], { type: 'image/png' }));
      }
    };
    context.canvas = canvas;
    return canvas;
  };

  const createElement = tag => {
    if (String(tag).toLowerCase() === 'canvas') {
      const canvas = createCanvas();
      createdElements.push(canvas);
      return canvas;
    }
    const element = {
      tagName: String(tag).toUpperCase(),
      style: {},
      dataset: {},
      attributes: {},
      children: [],
      parentNode: null,
      isConnected: true,
      removed: false,
      scrollLeft: 0,
      scrollWidth: 320,
      clientWidth: 320,
      setAttribute(name, value) { element.attributes[name] = String(value); },
      removeAttribute(name) { delete element.attributes[name]; },
      appendChild(child) {
        element.children.push(child);
        if (child) {
          child.parentNode = element;
          child.isConnected = true;
        }
        return child;
      },
      removeChild(child) {
        const index = element.children.indexOf(child);
        if (index >= 0) element.children.splice(index, 1);
        if (child) child.isConnected = false;
        return child;
      },
      remove() {
        element.removed = true;
        element.isConnected = false;
        if (element.parentNode) element.parentNode.removeChild(element);
      },
      focus() { documentStub.activeElement = element; },
      blur() {},
      click() {},
      addEventListener() {},
      removeEventListener() {},
      setPointerCapture() {},
      releasePointerCapture() {},
      scrollIntoView() {},
      getBoundingClientRect() { return { left: 0, top: 0, width: 300, height: 200, right: 300, bottom: 200 }; }
    };
    createdElements.push(element);
    return element;
  };

  const documentStub = {
    body: createElement('body'),
    head: createElement('head'),
    documentElement: createElement('html'),
    activeElement: null,
    visibilityState: 'visible',
    createElement,
    createTextNode(text) { return { nodeValue: String(text) }; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener(type, fn) { addListener('document', type, fn); },
    removeEventListener(type, fn) { removeListener('document', type, fn); },
    contains() { return true; }
  };

  const windowStub = {
    innerWidth: 1280,
    innerHeight: 800,
    devicePixelRatio: 1,
    addEventListener(type, fn) { addListener('window', type, fn); },
    removeEventListener(type, fn) { removeListener('window', type, fn); },
    matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; },
    setTimeout,
    clearTimeout
  };

  class FakeImage {
    constructor() {
      this.naturalWidth = 0;
      this.naturalHeight = 0;
      this.onload = null;
      this.onerror = null;
      this._src = '';
    }
    get src() {
      return this._src;
    }
    set src(value) {
      this._src = String(value || '');
      const dimensions = imageDimensions.get(this._src) || options.defaultDimensions || { width: 800, height: 600 };
      this.naturalWidth = dimensions.width;
      this.naturalHeight = dimensions.height;
      queueMicrotask(() => {
        if (typeof this.onload === 'function') this.onload();
      });
    }
  }

  const URLStub = {
    createObjectURL(value) {
      const url = 'blob:test-' + (++urlSequence);
      objectUrls.set(url, value);
      createdUrls.push({ url, value });
      return url;
    },
    revokeObjectURL(url) {
      revokedUrls.push(url);
      objectUrls.delete(url);
    }
  };

  const fetchStub = async url => {
    const value = objectUrls.get(url);
    if (!value) return { ok: false, status: 404, blob: async () => new FakeBlob([]) };
    return { ok: true, status: 200, blob: async () => (value instanceof FakeBlob ? value : new FakeBlob([value])) };
  };

  const cryptoStub = {
    randomUUID() {
      uuidSequence += 1;
      return '00000000-0000-4000-8000-' + String(uuidSequence).padStart(12, '0');
    }
  };

  const localStorageStub = {
    getItem() { return null; },
    setItem(key, value) { localStorageWrites.push([String(key), String(value)]); },
    removeItem() {}
  };

  const dispatch = (scope, type, event) => {
    const list = (listeners[scope].get(type) || []).slice();
    for (const listener of list) listener(event);
    return list.length;
  };

  return {
    document: documentStub,
    window: windowStub,
    File: FakeFile,
    Blob: FakeBlob,
    Image: FakeImage,
    URL: URLStub,
    fetch: fetchStub,
    crypto: cryptoStub,
    localStorage: localStorageStub,
    objectUrls,
    createdUrls,
    revokedUrls,
    createdElements,
    localStorageWrites,
    registerUrl(url, value) { objectUrls.set(url, value); },
    dispatch,
    countListeners,
    imageDimensions
  };
}

/* ------------------------------ 沙箱加载 ------------------------------ */

// 只用于 client 侧 descriptor 构造的 zod 形状桩；真正的参数校验由 Host Remote 承担。
function createFakeZod() {
  const schema = () => {
    const api = {
      min() { return api; },
      max() { return api; },
      uuid() { return api; },
      optional() { return api; },
      nullable() { return api; },
      default() { return api; },
      strict() { return api; },
      passthrough() { return api; },
      array() { return schema(); },
      describe() { return api; }
    };
    return api;
  };
  const z = {
    string: () => schema(),
    number: () => schema(),
    boolean: () => schema(),
    object: () => schema(),
    array: () => schema(),
    record: () => schema(),
    union: () => schema(),
    literal: () => schema(),
    enum: () => schema(),
    unknown: () => schema(),
    any: () => schema()
  };
  return { z };
}

// 跨 vm 边界的断言只比较结构，不比较原型。
function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadBundle(options = {}) {
  const mini = createMiniReact();
  const browser = createBrowserStubs(options);
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    document: browser.document,
    window: browser.window,
    navigator: { userAgent: 'node-image-annotation-integration-test' },
    File: browser.File,
    Blob: browser.Blob,
    Image: browser.Image,
    URL: browser.URL,
    fetch: browser.fetch,
    crypto: browser.crypto,
    localStorage: browser.localStorage,
    __IA_REACT__: mini.React,
    __IA_PORTAL__: mini.createPortal,
    __IA_UI_CSS__: UI_CSS,
    __IA_INT_CSS__: integrationCss,
    require(name) {
      if (name === 'zod') return createFakeZod();
      throw new Error('未提供的测试模块：' + name);
    }
  };
  vm.createContext(sandbox);
  const wrapper = `
const React = globalThis.__IA_REACT__;
const h = React.createElement;
const Fragment = React.Fragment;
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } = React;
const createPortal = globalThis.__IA_PORTAL__;
const PLUGIN_PACKAGE = ${JSON.stringify(PLUGIN_PACKAGE)};
const IMAGE_ANNOTATIONS_CSS_TEXT = globalThis.__IA_UI_CSS__;
const IMAGE_ANNOTATIONS_INTEGRATION_CSS_TEXT = globalThis.__IA_INT_CSS__;
${uiSource}
${integrationSource}
;globalThis.__IA_EXPORTS__ = {
  createImageAnnotationStore, ImageAnnotationViewer, ImageAnnotationPill,
  exportImageAnnotationImage, formatImageAnnotationPrompt,
  mountCodexImageAnnotations,
  imageAnnotationIntegrationCarrierName, imageAnnotationIntegrationParseCarrier,
  imageAnnotationIntegrationStripCarrier, imageAnnotationIntegrationSplitExtension,
  imageAnnotationIntegrationContentParts, imageAnnotationIntegrationHistoryFit,
  imageAnnotationIntegrationPreparedComments, imageAnnotationIntegrationRecalledComments,
  imageAnnotationIntegrationDroppedDirectories, imageAnnotationIntegrationFileSize
};
`;
  const script = new vm.Script(wrapper, { filename: 'image-annotations-integration.test-bundle.js' });
  script.runInContext(sandbox);
  return { api: sandbox.__IA_EXPORTS__, mini, browser, sandbox };
}

/* ------------------------------ 假宿主 ------------------------------ */

function createInputController(mini) {
  const state = { phase: 'plain', ids: [] };
  const listeners = new Set();
  const snapshot = () => ({
    draft: '',
    attachmentIds: state.ids.slice(),
    phase: state.phase,
    draftRev: 0,
    occurrences: [],
    queue: []
  });
  const notify = () => {
    const value = snapshot();
    for (const listener of Array.from(listeners)) listener(value);
  };
  const calls = { addAttachments: [], removeAttachment: [], setDraft: [], insertText: [], submit: 0 };
  let failRemoveNext = null;
  let failAddNext = null;
  let ignoreRemoveId = null;
  const inputActions = {
    captureInsertion() { return { start: 0, end: 0, draftRev: 0 }; },
    insertText(text) { calls.insertText.push(String(text)); return false; },
    setDraft(text) { calls.setDraft.push(String(text)); },
    persistDraft() {},
    // 与 rc.3 公开契约一致：add/remove 返回 void（宿主内部 boolean 不是公开契约）。
    addAttachments(ids) {
      if (state.phase !== 'plain') return undefined;
      if (failAddNext !== null && ids.indexOf(failAddNext) >= 0) {
        failAddNext = null;
        throw new Error('模拟宿主添加附件失败');
      }
      calls.addAttachments.push(ids.slice());
      state.ids = state.ids.concat(ids);
      notify();
      return undefined;
    },
    removeAttachment(id) {
      if (state.phase !== 'plain') return undefined;
      if (ignoreRemoveId !== null && ignoreRemoveId === id) {
        ignoreRemoveId = null;
        return undefined;
      }
      if (failRemoveNext !== null && failRemoveNext === id) {
        failRemoveNext = null;
        throw new Error('模拟宿主移除附件失败');
      }
      const index = state.ids.indexOf(id);
      if (index >= 0) {
        calls.removeAttachment.push(id);
        state.ids.splice(index, 1);
        notify();
      }
      return undefined;
    },
    pruneAttachments(ids) {
      const keep = new Set(ids);
      state.ids = state.ids.filter(id => keep.has(id));
      notify();
    },
    submit() { calls.submit += 1; }
  };
  const useInput = selector => {
    const [value, setValue] = mini.React.useState(snapshot);
    mini.React.useEffect(() => {
      const listener = () => setValue(snapshot());
      listeners.add(listener);
      return () => listeners.delete(listener);
    }, []);
    return selector ? selector(value) : value;
  };
  return {
    state,
    snapshot,
    calls,
    inputActions,
    useInput,
    ids() { return state.ids.slice(); },
    setIds(ids) { state.ids = ids.slice(); notify(); },
    setPhase(phase) { state.phase = phase; notify(); },
    failNextRemove(id) { failRemoveNext = id; },
    failNextAdd(id) { failAddNext = id; },
    ignoreRemoveOnce(id) { ignoreRemoveId = id; }
  };
}

function createHarness(options = {}) {
  const bundle = loadBundle(options);
  const mini = bundle.mini;
  const browser = bundle.browser;
  const slotEntries = new Map();
  const remoteApi = {};
  const remoteMounts = [];
  let draftSequence = 0;
  const conversation = {
    created: [],
    released: [],
    createDrafts(sessionId, files) {
      if (options.createDrafts) {
        const result = options.createDrafts(sessionId, files);
        if (result) return result;
      }
      return files.map(file => {
        draftSequence += 1;
        const id = 'draft-' + draftSequence;
        const row = { kind: 'image', id, previewUrl: 'blob:draft-' + id, file, width: 800, height: 600 };
        conversation.created.push({ sessionId, ...row });
        return row;
      });
    },
    releaseDraftAttachment(id) {
      conversation.released.push(id);
    }
  };
  const prepareCalls = [];
  const recallCalls = [];
  const remoteMethodCalls = [];
  const events = [];
  const remoteHandlers = {
    clear: options.clear || (async () => ({ ok: true, value: { ok: true } })),
    prepare: options.prepare || (async request => {
      prepareCalls.push(request);
      events.push('prepare');
      return { ok: true, value: { ok: true } };
    }),
    recall: options.recall || (async request => {
      recallCalls.push(request);
      return { ok: true, value: { ok: false, comments: [] } };
    })
  };
  remoteApi.$mount = spec => {
    const namespace = spec.descriptors[0] && spec.descriptors[0].namespace;
    const handlers = {};
    for (const descriptor of spec.descriptors) {
      handlers[descriptor.method] = (...args) => {
        remoteMethodCalls.push(descriptor.method);
        return remoteHandlers[descriptor.method](...args);
      };
    }
    remoteApi[namespace] = handlers;
    const record = { spec, handlers, namespace };
    remoteMounts.push(record);
    return () => {
      if (remoteApi[namespace] === handlers) delete remoteApi[namespace];
      const index = remoteMounts.indexOf(record);
      if (index >= 0) remoteMounts.splice(index, 1);
    };
  };

  const addSlotEntry = (lifetime, optionsValue, component) => {
    const row = { options: optionsValue || {}, component };
    const name = row.options.name;
    if (!slotEntries.has(name)) slotEntries.set(name, []);
    slotEntries.get(name).push(row);
    const dispose = () => {
      const list = slotEntries.get(name) || [];
      const index = list.indexOf(row);
      if (index >= 0) list.splice(index, 1);
    };
    if (lifetime) lifetime.push(dispose);
    return dispose;
  };

  const makeSlots = lifetime => ({
    entries(name) {
      return (slotEntries.get(name) || []).map(row => ({ options: row.options, component: row.component }));
    },
    register(slotOptions, component) {
      return addSlotEntry(lifetime, slotOptions, component);
    },
    inject(name, factory) {
      const dispose = factory();
      if (typeof dispose === 'function' && lifetime) lifetime.push(dispose);
      return dispose;
    }
  });

  // 与 Cordis 一致：'remote.<ns>' 是独立服务，只有在 inject 里声明过它的作用域才能读取。
  const remoteView = declared => new Proxy(remoteApi, {
    get(target, key) {
      if (typeof key === 'string' && !key.startsWith('$') && key in target && !declared.has('remote.' + key)) {
        throw new Error('cannot get property "remote.' + key + '" without inject');
      }
      return target[key];
    }
  });
  const makeContext = (lifetime, declared = new Set()) => {
    const context = {
      slots: makeSlots(lifetime),
      remote: remoteView(declared),
      conversation,
      effects: [],
      effect(effect) {
        const cleanup = effect();
        const dispose = () => {
          if (typeof cleanup === 'function') cleanup();
        };
        lifetime.push(dispose);
        context.effects.push(cleanup);
        return dispose;
      },
      inject(deps, callback) {
        const local = [];
        const scope = makeContext(local, new Set([...declared, ...(Array.isArray(deps) ? deps : [])]));
        callback(scope);
        const dispose = () => {
          for (const item of local.splice(0).reverse()) {
            try {
              item();
            } catch (error) {
              // 测试桩：单个 disposer 失败不阻断其余清理。
            }
          }
        };
        lifetime.push(dispose);
        return { dispose };
      }
    };
    return context;
  };

  const lifetime = [];
  const context = makeContext(lifetime);
  const sessions = new Map();
  const inputFor = sessionId => {
    if (!sessions.has(sessionId)) sessions.set(sessionId, createInputController(mini));
    return sessions.get(sessionId);
  };

  // 宿主官方条目先占位；本插件用更小 priority 覆盖，停用后应恢复。
  addSlotEntry(lifetime, { name: 'conversation.input.attachments', priority: 100 }, function OfficialAttachments() {
    return { type: 'div', props: { className: 'official-attachments' } };
  });
  addSlotEntry(lifetime, { name: 'conversation.chat.user.images', priority: 100 }, function OfficialImages() {
    return { type: 'div', props: { className: 'official-images' } };
  });

  const dispose = bundle.api.mountCodexImageAnnotations(context);
  const runtime = dispose && dispose.runtime ? dispose.runtime : null;

  const activeEntry = name => {
    const list = slotEntries.get(name) || [];
    if (!list.length) return null;
    return list.slice().sort((a, b) => (a.options.priority || 0) - (b.options.priority || 0))[0];
  };

  const listEntries = name => (slotEntries.get(name) || []).slice();

  const mountComposer = params => {
    const entry = activeEntry('conversation.input.attachments');
    assert.ok(entry, '应有可用的附件槽入口');
    const input = inputFor(params.sessionId === undefined ? 's1' : params.sessionId);
    const initial = (params.attachments || []).slice();
    const descriptorFor = id => {
      const existing = initial.find(row => row.id === id);
      if (existing) return existing;
      const created = conversation.created.find(row => row.id === id);
      if (created) return { kind: 'image', id: created.id, previewUrl: created.previewUrl, file: created.file, width: created.width, height: created.height };
      return null;
    };
    // 模拟宿主 InputBar：attachments 由 input.attachmentIds 每次渲染重新解析，而不是固定的 owner props。
    function ComposerHost(hostProps) {
      const snapshot = input.useInput(state => state);
      // rerender({ sessionId, attachments }) 可模拟 session-maybe 槽位的会话过渡。
      const overrides = hostProps && Object.prototype.hasOwnProperty.call(hostProps, 'sessionId') ? hostProps : null;
      if (overrides && overrides.attachments) for (const row of overrides.attachments) if (!initial.some(item => item.id === row.id)) initial.push(row);
      const sessionId = overrides ? overrides.sessionId : params.sessionId;
      const attachments = sessionId === undefined ? [] : snapshot.attachmentIds.map(descriptorFor).filter(Boolean);
      return bundle.mini.React.createElement(entry.component, {
        ...params.props,
        sessionId,
        attachments,
        canAcceptDrop: params.canAcceptDrop !== false,
        uploads: params.uploads || {},
        dropLimits: params.dropLimits,
        onAddFiles: params.onAddFiles || (() => {}),
        onRemoveAttachment: params.onRemoveAttachment || (() => {}),
        onRetryFile: params.onRetryFile || (() => {}),
        useInput: input.useInput,
        inputActions: input.inputActions
      });
    }
    return mini.mount(ComposerHost, params.props || {});
  };

  const mountHistory = params => {
    const entry = activeEntry('conversation.chat.user.images');
    assert.ok(entry, '应有可用的历史图片槽入口');
    const input = inputFor(params.sessionId);
    const loadImage = params.loadImage || (async attachment => {
      const url = 'blob:history-' + attachment.attachmentId;
      browser.registerUrl(url, new browser.Blob([params.bytes || 'HISTORY_BYTES'], { type: attachment.mediaType || 'image/png' }));
      return url;
    });
    return mini.mount(entry.component, {
      sessionId: params.sessionId,
      images: params.images || [{ attachment: params.attachment }],
      align: params.align || 'end',
      compact: params.compact === true,
      loadImage,
      useInput: input.useInput,
      inputActions: input.inputActions
    });
  };

  const mountHost = () => {
    const entry = listEntries('shell.overlay').find(row => row.options.id === 'codex-style:image-annotations-host');
    assert.ok(entry, '应注册图片批注预览宿主');
    return mini.mount(entry.component, {});
  };

  const findViewerButtons = () => {
    const host = mountHostIfNeeded();
    return host;
  };

  let hostMounted = null;
  const mountHostIfNeeded = () => {
    if (!hostMounted) hostMounted = mountHost();
    return hostMounted;
  };

  const flush = () => mini.flush();
  const settle = async value => {
    if (value && typeof value.then === 'function') await value;
    for (let index = 0; index < 12; index += 1) {
      await Promise.resolve();
      mini.flush();
    }
    mini.flush();
  };

  return {
    bundle,
    mini,
    browser,
    context,
    runtime,
    dispose,
    slotEntries,
    listEntries,
    activeEntry,
    remoteApi,
    remoteMounts,
    remoteHandlers,
    prepareCalls,
    recallCalls,
    remoteMethodCalls,
    events,
    conversation,
    inputFor,
    mountComposer,
    mountHistory,
    mountHost,
    mountHostIfNeeded,
    flush,
    settle,
    inputFor
  };
}

/* ------------------------------ 树查询工具 ------------------------------ */

function walk(node, visit) {
  if (node === null || node === undefined || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  visit(node);
  const children = node.props && node.props.children;
  if (children === undefined) return;
  for (const child of [].concat(children)) walk(child, visit);
}

function query(node, predicate) {
  const matches = [];
  walk(node, element => {
    if (element.props && predicate(element)) matches.push(element);
  });
  return matches;
}

function classesOf(node) {
  return String((node.props && node.props.className) || '').split(/\s+/).filter(Boolean);
}

function nodeByClass(node, className) {
  return query(node, element => classesOf(element).includes(className))[0];
}

function nodesByClass(node, className) {
  return query(node, element => classesOf(element).includes(className));
}

function textOf(node) {
  if (node === null || node === undefined || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (typeof node !== 'object') return '';
  return textOf(node.props && node.props.children);
}

function buttonByText(tree, text) {
  return query(tree, node => node.type === 'button' && textOf(node).includes(text))[0];
}

function fire(node, handler, event = {}) {
  const fn = node && node.props ? node.props[handler] : undefined;
  assert.equal(typeof fn, 'function', '节点应有 ' + handler + ' 处理器');
  const synthetic = {
    stopPropagation() {},
    preventDefault() {},
    target: {},
    currentTarget: {},
    clientX: 10,
    clientY: 10,
    ...event
  };
  return fn(synthetic);
}

async function click(harness, node) {
  const result = fire(node, 'onClick');
  await harness.settle(result);
  return result;
}

function makeFile(harness, name, marker, type = 'image/png') {
  return new harness.bundle.sandbox.File([marker], name, { type });
}

function fileMarker(file) {
  const parts = (file && file.parts) || [];
  const first = parts[0];
  if (typeof first === 'string') return first;
  if (first && first.parts) return String(first.parts[0]);
  return '';
}

function draftOrder(harness, sessionId) {
  return harness.inputFor(sessionId).ids();
}

function imagesAndFiles(harness, sessionId, specs) {
  const rows = [];
  for (const spec of specs) {
    const file = makeFile(harness, spec.name, spec.marker || spec.name, spec.type || 'image/png');
    rows.push({
      kind: 'image',
      id: spec.id,
      previewUrl: 'blob:preview-' + spec.id,
      file,
      width: spec.width || 800,
      height: spec.height || 600
    });
  }
  return rows;
}

/* -------------------------------- 测试 -------------------------------- */

test('发送载体文件名：生成、解析、显示名去后缀', () => {
  const { api } = loadBundle();
  const token = '12345678-1234-1234-1234-123456789abc';
  assert.equal(api.imageAnnotationIntegrationCarrierName('test.png', token), 'test.__dsc_ia_' + token + '__.png');
  assert.equal(api.imageAnnotationIntegrationCarrierName('my.photo.jpg', token, '.png'), 'my.photo.__dsc_ia_' + token + '__.png');
  const parsed = api.imageAnnotationIntegrationParseCarrier('test.__dsc_ia_' + token + '__.png');
  assert.equal(parsed.token, token);
  assert.equal(parsed.baseName, 'test');
  assert.equal(parsed.extension, '.png');
  assert.equal(parsed.displayName, 'test.png');
  assert.equal(api.imageAnnotationIntegrationStripCarrier('报告.__dsc_ia_' + token + '__.PNG'), '报告.PNG');
  assert.equal(api.imageAnnotationIntegrationParseCarrier('test.png'), null);
  assert.equal(api.imageAnnotationIntegrationParseCarrier('test.__dsc_ia_not-a-uuid__.png'), null);
  const noExtension = api.imageAnnotationIntegrationCarrierName('image', token);
  assert.ok(noExtension.endsWith('__.png'), '缺扩展名时载体补 .png');
  assert.equal(api.imageAnnotationIntegrationParseCarrier(noExtension).displayName, 'image.png');
  assert.deepEqual(plain(api.imageAnnotationIntegrationSplitExtension('a.b.png')), { base: 'a.b', extension: '.png' });
  assert.deepEqual(plain(api.imageAnnotationIntegrationSplitExtension('image')), { base: 'image', extension: '' });
});

test('批注内容签名：裁剪/坐标归一并忽略撤销历史；只有 marks 的变化也算改动', () => {
  const { api } = loadBundle();
  const base = { comments: [{ id: 'c1', text: '  改这里  ', x: 1.4, y: -0.2 }], marks: [], markupUndo: [[1]], markupRedo: [] };
  const same = { comments: [{ id: 'c2', text: '改这里', x: 1, y: 0 }], marks: [], markupUndo: [], markupRedo: [[2]] };
  assert.deepEqual(plain(api.imageAnnotationIntegrationContentParts(base)), plain(api.imageAnnotationIntegrationContentParts(same)));
  assert.deepEqual(plain(api.imageAnnotationIntegrationPreparedComments(base)), [{ text: '改这里', x: 1, y: 0 }]);
  const withMark = { comments: [], marks: [{ id: 'm1', type: 'pen', points: [[0.1, 0.2]] }] };
  assert.notDeepEqual(plain(api.imageAnnotationIntegrationContentParts(base)), plain(api.imageAnnotationIntegrationContentParts(withMark)));
  assert.deepEqual(plain(api.imageAnnotationIntegrationRecalledComments('abcdef12-3333-4444-5555-666677778888', [
    { text: ' 历史评论 ', x: 0.25, y: 0.5 }, { text: '   ', x: 0, y: 0 }
  ]).map(row => ({ text: row.text, x: row.x, y: row.y }))), [{ text: '历史评论', x: 0.25, y: 0.5 }]);
});

test('历史图片布局：长边 240、比例裁剪、不放大；compact 为 64 方图', () => {
  const { api } = loadBundle();
  assert.deepEqual(plain(api.imageAnnotationIntegrationHistoryFit({ width: 800, height: 400 }, false)), { width: 240, height: 120, objectPosition: 'center' });
  assert.deepEqual(plain(api.imageAnnotationIntegrationHistoryFit({ width: 100, height: 400 }, false)), { width: 60, height: 240, objectPosition: 'center' });
  assert.deepEqual(plain(api.imageAnnotationIntegrationHistoryFit({ width: 60, height: 240 }, false)), { width: 60, height: 240, objectPosition: 'center' });
  assert.deepEqual(plain(api.imageAnnotationIntegrationHistoryFit({ width: 10, height: 400 }, false)), { width: 10, height: 40, objectPosition: 'center top' });
  assert.deepEqual(plain(api.imageAnnotationIntegrationHistoryFit({ width: 800, height: 600 }, true)), { width: 64, height: 64, objectPosition: 'center' });
  assert.equal(api.imageAnnotationIntegrationHistoryFit({}, false).pending, true);
});

test('挂载：注册两个单槽位、预览宿主、样式与 prepare+recall Remote；禁用后恢复宿主条目', () => {
  const harness = createHarness();
  const attachments = harness.listEntries('conversation.input.attachments');
  const images = harness.listEntries('conversation.chat.user.images');
  assert.equal(attachments.length, 2);
  assert.equal(images.length, 2);
  assert.equal(harness.activeEntry('conversation.input.attachments').options.priority, -1);
  assert.equal(harness.activeEntry('conversation.chat.user.images').options.priority, -1);
  assert.ok(harness.listEntries('shell.overlay').some(row => row.options.id === 'codex-style:image-annotations-host'));

  const style = harness.browser.createdElements.find(element => element.tagName === 'STYLE' && element.dataset.dscImageAnnotations !== undefined);
  assert.ok(style, '应注入集成样式');
  assert.ok(style.textContent.includes('.dsc-iai-rail'));
  assert.ok(style.textContent.includes('.dsc-ia-test'), 'UI 样式应与集成样式同批注入');

  assert.equal(harness.remoteMounts.length, 1);
  assert.deepEqual(plain(harness.remoteMethodCalls), [], '挂载阶段不应调用 Host RPC');
  const descriptors = harness.remoteMounts[0].spec.descriptors;
  assert.deepEqual(plain(descriptors.map(row => row.method)), ['clear', 'prepare', 'recall']);
  assert.ok(descriptors.every(row => row.namespace === 'codexStyleImageAnnotations'));
  assert.ok(descriptors.every(row => row.invocation.kind === 'direct'));
  for (const descriptor of descriptors) {
    assert.equal(descriptor.parameters.length, 1);
    assert.equal(descriptor.parameters[0].name, 'request');
    assert.equal(descriptor.parameters[0].source, 'json');
    assert.equal(descriptor.parameters[0].codec.mode, 'strict');
    assert.equal(typeof descriptor.parameters[0].codec.create, 'function');
    assert.equal(descriptor.result.mode, 'strict');
    assert.equal(typeof descriptor.result.create, 'function');
  }
  assert.deepEqual(plain(harness.remoteMounts[0].handlers && Object.keys(harness.remoteMounts[0].handlers)), ['clear', 'prepare', 'recall']);

  harness.dispose();
  assert.equal(harness.activeEntry('conversation.input.attachments').options.priority, 100);
  assert.equal(harness.activeEntry('conversation.chat.user.images').options.priority, 100);
  assert.ok(style.removed, '禁用时移除样式');
  assert.equal(harness.remoteApi.codexStyleImageAnnotations, undefined, '禁用时释放远程命名空间');
  assert.equal(harness.runtime.disposed, true);
  assert.deepEqual(harness.browser.localStorageWrites, []);
});

test('待发附件 rail：顺序、文件卡上传/重试/移除、空态与胶囊行', async () => {
  const harness = createHarness();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2', 'f1']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A_BYTES' },
    { id: 'd2', name: 'test.__dsc_ia_12345678-1234-1234-1234-123456789abc__.png', marker: 'B_BYTES' }
  ]);
  attachments.push({ kind: 'file', id: 'f1', file: makeFile(harness, 'notes.txt', 'FILE_BYTES', 'text/plain') });
  const removed = [];
  const retried = [];
  const composer = harness.mountComposer({
    sessionId: 's1',
    attachments,
    uploads: { f1: { status: 'error' } },
    onRemoveAttachment: id => removed.push(id),
    onRetryFile: id => retried.push(id)
  });
  const tree = composer.output;
  const items = nodesByClass(tree, 'dsc-iai-rail-item');
  assert.equal(items.length, 2);
  assert.equal(nodeByClass(items[0], 'dsc-iai-thumb').props.children.props.alt, 'a.png');
  assert.equal(nodeByClass(items[1], 'dsc-iai-thumb').props.children.props.alt, 'test.png', '显示层去掉 token 后缀');

  const fileCard = nodeByClass(tree, 'dsc-iai-file');
  assert.ok(fileCard, '非图片附件应渲染文件卡');
  assert.ok(textOf(fileCard).includes('notes.txt'));
  assert.ok(textOf(fileCard).includes('上传失败，点击重试'));
  await click(harness, buttonByText(fileCard, '上传失败'));
  assert.deepEqual(retried, ['f1']);
  await click(harness, nodeByClass(fileCard, 'dsc-iai-remove'));
  assert.deepEqual(removed, ['f1']);
  assert.equal(nodesByClass(tree, 'dsc-ia-pill').length, 0, '无批注时不显示胶囊');
});

test('session-maybe：同一附件槽实例从无会话过渡到有会话时 Hook 数量不变（React #310 回归）', async () => {
  const harness = createHarness();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'a.png', marker: 'A_BYTES' }]);
  const composer = harness.mountComposer({ sessionId: undefined, attachments: [] });
  assert.equal(nodesByClass(composer.output, 'dsc-iai-rail-item').length, 0, '无会话时不渲染');
  composer.rerender({ sessionId: 's1', attachments });
  await harness.settle();
  assert.equal(nodesByClass(composer.output, 'dsc-iai-rail-item').length, 1, '会话就绪后渲染图片且可点击打开预览');
});

test('拖放：document 级监听保留文件/目录/可接受与重置语义，卸载后移除', async () => {
  const harness = createHarness();
  const input = harness.inputFor('s1');
  input.setIds([]);
  const received = [];
  const composer = harness.mountComposer({
    sessionId: 's1',
    attachments: [],
    onAddFiles: (files, directories) => received.push({ files: files.map(file => file.name), directories: directories ? Array.from(directories).map(file => file.name) : [] }),
    dropLimits: { count: 10, size: '20 MB' }
  });
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 1);
  assert.equal(harness.browser.countListeners('document', 'drop'), 1);
  // 输入卡片是带 gap 的 flex 列：无附件时不得留下空容器，否则提示语与卡片顶部距离变大。
  assert.equal(nodeByClass(composer.output, 'dsc-iai-rail-wrap'), undefined, '无附件时不渲染空容器');

  const fileA = makeFile(harness, 'photo.png', 'PHOTO');
  const fileB = makeFile(harness, 'folder-member.png', 'DIR');
  const transfer = {
    types: ['Files'],
    files: [fileA, fileB],
    items: [
      { kind: 'file', webkitGetAsEntry: () => ({ isDirectory: false }) },
      { kind: 'file', webkitGetAsEntry: () => ({ isDirectory: true }) }
    ],
    dropEffect: ''
  };
  const event = extra => ({ dataTransfer: transfer, preventDefault() {}, target: harness.browser.document.body, clientX: 20, clientY: 20, ...extra });
  harness.browser.dispatch('document', 'dragenter', event());
  harness.flush();
  assert.ok(nodeByClass(composer.output, 'dsc-iai-drop'), '拖入文件时显示遮罩');
  assert.ok(textOf(nodeByClass(composer.output, 'dsc-iai-drop')).includes('最多 10 张图片'));
  harness.browser.dispatch('document', 'dragover', event());
  assert.equal(transfer.dropEffect, 'copy');
  harness.browser.dispatch('document', 'drop', event());
  await harness.settle();
  assert.deepEqual(plain(received), [{ files: ['photo.png', 'folder-member.png'], directories: ['folder-member.png'] }]);
  assert.equal(nodeByClass(composer.output, 'dsc-iai-drop'), undefined, 'drop 后遮罩关闭');
  composer.unmount();
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 0, '卸载后移除全部拖放监听');

  const blocked = harness.mountComposer({ sessionId: 's2', attachments: [], canAcceptDrop: false, onAddFiles: () => received.push({ files: ['unexpected'] }) });
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 1);
  harness.browser.dispatch('document', 'dragenter', event());
  harness.flush();
  assert.ok(nodeByClass(blocked.output, 'dsc-iai-drop'), '不可接受也要显示遮罩');
  harness.browser.dispatch('document', 'dragover', event());
  assert.equal(transfer.dropEffect, 'none');
  harness.browser.dispatch('document', 'drop', event());
  await harness.settle();
  assert.equal(received.length, 1, '不可接受时 drop 不调用 onAddFiles');
  assert.equal(nodeByClass(blocked.output, 'dsc-iai-drop'), undefined, 'drop 后遮罩关闭');

  blocked.unmount();
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 0, '卸载后移除全部拖放监听');
});

test('预览入口：点击待发图片按 rail 顺序打开大预览，关闭不清状态', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2', 'd3']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A' },
    { id: 'd2', name: 'b.png', marker: 'B' },
    { id: 'd3', name: 'c.png', marker: 'C' }
  ]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const thumbs = nodesByClass(composer.output, 'dsc-iai-thumb');
  assert.equal(thumbs.length, 3);
  await click(harness, thumbs[1]);
  const viewerImage = query(harness.mountHostIfNeeded().output, node => node.type === 'img' && node.props.src === 'blob:preview-d2')[0];
  assert.ok(viewerImage, '预览应显示第二张图');
  const titleName = nodeByClass(harness.mountHostIfNeeded().output, 'dsc-ia-title-name');
  assert.equal(textOf(titleName), 'b.png', '预览标题显示去后缀名称');
  const close = query(harness.mountHostIfNeeded().output, node => node.props && node.props['aria-label'] === '关闭图片预览')[0];
  assert.ok(close);
  await click(harness, close);
  assert.equal(nodesByClass(harness.mountHostIfNeeded().output, 'dsc-ia-root').length, 0, '关闭后卸载预览');
  assert.deepEqual(harness.conversation.created, [], '只预览不产生附件');
});

test('完成待发图片批注：prepare 先完成才 createDrafts 并原位替换，Image N 顺序不变', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2', 'd3']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A_BYTES' },
    { id: 'd2', name: 'b.png', marker: 'B_BYTES' },
    { id: 'd3', name: 'c.png', marker: 'C_BYTES' }
  ]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  const targetKey = 'ia-draft|s1|d2';

  // 打开第二张图的评论态后写入评论（即用户在预览里编辑），再完成。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[1]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set(targetKey, { comments: [{ id: 'c1', text: '把这里改成圆角', x: 0.25, y: 0.4 }], marks: [] });
  harness.flush();
  const complete = buttonByText(harness.mountHostIfNeeded().output, '完成批注');
  const pending = fire(complete, 'onClick');
  await harness.settle();
  assert.equal(harness.prepareCalls.length, 1);
  assert.equal(harness.prepareCalls[0].sessionId, 's1');
  assert.match(harness.prepareCalls[0].token, UUID_PATTERN);
  assert.deepEqual(plain(harness.prepareCalls[0].comments), [{ text: '把这里改成圆角', x: 0.25, y: 0.4 }]);
  await pending;
  await harness.settle();

  assert.equal(harness.events[0], 'prepare');
  assert.equal(harness.conversation.created.length, 1);
  assert.equal(harness.conversation.created[0].sessionId, 's1');
  const created = harness.conversation.created[0];
  assert.equal(created.file.name, 'b.__dsc_ia_' + harness.prepareCalls[0].token + '__.png');
  assert.equal(fileMarker(created.file), 'B_BYTES', '只有评论时保留原图字节');
  assert.deepEqual(input.ids(), ['d1', created.id, 'd3'], '原位替换保持图片顺序');
  assert.deepEqual(harness.conversation.released, ['d2']);
  assert.equal(runtime.store.get(targetKey).comments.length, 1);
  assert.equal(nodesByClass(harness.mountHostIfNeeded().output, 'dsc-ia-root').length, 0, '成功后关闭预览');
  assert.deepEqual(input.calls.setDraft, [], '批注文本不写编辑器/正文');
  assert.deepEqual(input.calls.insertText, []);
  const railText = textOf(composer.output);
  assert.ok(!railText.includes('x:') && !railText.includes('把这里改成圆角'), '坐标/评论文本不进入可见输入区');
  assert.ok(railText.includes('1 条批注'), '图片旁只显示计数胶囊');
});

test('prepare 未完成前不替换附件；失败保稿且不改动草稿', async () => {
  let resolvePrepare;
  const harness = createHarness({
    prepare: () => new Promise(resolve => { resolvePrepare = resolve; })
  });
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A' },
    { id: 'd2', name: 'b.png', marker: 'B' }
  ]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '第一条', x: 0.1, y: 0.2 }], marks: [] });
  harness.flush();
  const pending = fire(buttonByText(harness.mountHostIfNeeded().output, '完成批注'), 'onClick');
  await harness.settle();
  assert.equal(harness.conversation.created.length, 0, 'prepare 未完成时不创建草稿');
  assert.deepEqual(input.ids(), ['d1', 'd2']);
  resolvePrepare({ ok: true, value: { ok: true } });
  await pending;
  await harness.settle();
  assert.equal(harness.conversation.created.length, 1);
  assert.deepEqual(input.ids(), [harness.conversation.created[0].id, 'd2']);
});

test('prepare 拒绝：预览保留并显示错误，草稿与批注状态都不丢', async () => {
  const harness = createHarness({
    prepare: async () => { throw new Error('网络不可用'); }
  });
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'a.png', marker: 'A' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '保留我', x: 0.3, y: 0.6 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.conversation.created.length, 0);
  assert.deepEqual(input.ids(), ['d1'], '失败时不替换原附件');
  assert.equal(runtime.store.get('ia-draft|s1|d1').comments.length, 1, '批注状态保留');
  const alert = query(harness.mountHostIfNeeded().output, node => node.props && node.props.role === 'alert')[0];
  assert.ok(alert, '预览应显示错误');
  assert.ok(textOf(alert).includes('批注保存失败'));
  assert.equal(nodesByClass(harness.mountHostIfNeeded().output, 'dsc-ia-root').length, 1, '失败时预览不关闭');
});

test('手绘 marks：导出烧录到原图并重新加入草稿，不二次烘焙', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'paint.jpg', marker: 'ORIGINAL_BYTES', type: 'image/jpeg' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', {
    comments: [{ id: 'c1', text: '看这里', x: 0.5, y: 0.5 }],
    marks: [{ id: 'm1', type: 'pen', color: '#dc2626', width: 4, points: [[0.1, 0.1], [0.2, 0.2]] }]
  });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.conversation.created.length, 1);
  const first = harness.conversation.created[0].file;
  assert.equal(fileMarker(first), 'CANVAS_BURNED', '有手绘时发送烧录后的位图');
  assert.ok(first.name.startsWith('paint.__dsc_ia_'));
  assert.ok(first.name.endsWith('__.png'), '烧录图按实际编码用 .png 载体');
  assert.equal(first.type, 'image/png');
  const canvas = harness.browser.createdElements.filter(element => element.tagName === 'CANVAS').pop();
  assert.ok(canvas, '导出使用 Canvas');
  const context = canvas.getContext('2d');
  assert.ok(context.drawImageCalls.length >= 1, '应绘制原图');
  assert.ok(context.fillTextCalls.every(text => !text.includes('看这里')), '评论文本绝不烧进图片');
  assert.ok(!harness.browser.createdUrls.some(row => row.value && row.value.name === first.name), '烧录图不能在已有烧录文件上再合成');

  // 再次编辑新增手绘：仍从原始 File 导出，而不是从第一次的烧录文件。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  const secondComment = runtime.store.get('ia-draft|s1|d1');
  runtime.store.set('ia-draft|s1|d1', {
    comments: secondComment.comments,
    marks: secondComment.marks.concat([{ id: 'm2', type: 'rect', color: '#dc2626', width: 2, x1: 0.3, y1: 0.3, x2: 0.5, y2: 0.5 }])
  });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.conversation.created.length, 2);
  const baseInputs = harness.browser.createdUrls.filter(row => row.value && row.value.name === 'paint.jpg');
  assert.ok(baseInputs.length >= 1, '重新编辑必须复用原始图片字节');
  assert.equal(fileMarker(harness.conversation.created[1].file), 'CANVAS_BURNED');
  assert.notEqual(harness.prepareCalls[0].token, harness.prepareCalls[1].token, '每次完成生成新 token');
});

test('多图顺序：一次完成两张图片的批注仍保持 A/B/C 位置与各自 token', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2', 'd3']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A' },
    { id: 'd2', name: 'b.png', marker: 'B' },
    { id: 'd3', name: 'c.png', marker: 'C' }
  ]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '第一张', x: 0.1, y: 0.1 }], marks: [] });
  runtime.store.set('ia-draft|s1|d3', { comments: [{ id: 'c2', text: '第三张', x: 0.9, y: 0.9 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.prepareCalls.length, 2);
  assert.deepEqual(harness.prepareCalls.map(call => call.comments[0].text), ['第一张', '第三张']);
  const ids = input.ids();
  assert.equal(ids.length, 3);
  const created = harness.conversation.created;
  assert.equal(created.length, 2);
  assert.equal(ids[0], created[0].id);
  assert.equal(ids[1], 'd2');
  assert.equal(ids[2], created[1].id);
  assert.ok(created[0].file.name.includes(harness.prepareCalls[0].token));
  assert.ok(created[1].file.name.includes(harness.prepareCalls[1].token));
});

test('无改动完成：已同步内容不重复 prepare；关闭重开也不会重复同步', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'a.png', marker: 'A' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  // 第一次：新增评论 → 完成 → 真正 prepare + 替换草稿。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '已有批注', x: 0.2, y: 0.2 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.prepareCalls.length, 1);
  assert.equal(harness.conversation.created.length, 1);
  const syncedDraft = input.ids()[0];
  assert.ok(nodesByClass(composer.output, 'dsc-ia-pill').length >= 1, '同步后显示胶囊');

  // 第二次：重新打开、什么都不改、完成 → 不应产生新 prepare/附件。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.prepareCalls.length, 1, '已同步内容不重复 prepare');
  assert.equal(harness.conversation.created.length, 1);
  assert.deepEqual(input.ids(), [syncedDraft]);
});

test('新增评论后关闭预览再重开：完成时必须补 prepare，不能把未同步草稿当已同步', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'note.png', marker: 'NOTE_BYTES' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;

  // 打开预览 → 写入评论（等价于用户在预览里新增评论）→ 用 X 关闭预览（本地保留）。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '关闭后保留', x: 0.3, y: 0.4 }], marks: [] });
  harness.flush();
  await click(harness, query(harness.mountHostIfNeeded().output, node => node.props && node.props['aria-label'] === '关闭图片预览')[0]);
  assert.equal(harness.prepareCalls.length, 0, '关闭预览本身不 prepare');
  assert.ok(nodesByClass(composer.output, 'dsc-ia-pill').length >= 1, '本地胶囊已显示');

  // 重新打开 → 直接完成（不再改内容）→ 必须 prepare 并替换草稿。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.prepareCalls.length, 1, '关闭重开后完成必须补 prepare');
  assert.equal(harness.conversation.created.length, 1);
  assert.ok(harness.conversation.created[0].file.name.includes(harness.prepareCalls[0].token));
  assert.deepEqual(plain(harness.prepareCalls[0].comments), [{ text: '关闭后保留', x: 0.3, y: 0.4 }]);
});

test('胶囊叉号：只清空这一图的评论并保留图片/手绘，元数据换成无 token 文件，其他图不变', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'd2']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: 'a.png', marker: 'A' },
    { id: 'd2', name: 'b.png', marker: 'B' }
  ]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  const mark = { id: 'm1', type: 'pen', color: '#dc2626', width: 4, points: [[0.1, 0.1], [0.2, 0.2]] };

  // 先完成一次，让 d1 的草稿文件带上 token。
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '清我', x: 0.3, y: 0.3 }], marks: [mark] });
  runtime.store.set('ia-draft|s1|d2', { comments: [{ id: 'c2', text: '别动我', x: 0.4, y: 0.4 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  const tokenDraftId = input.ids()[0];
  assert.ok(harness.conversation.created[0].file.name.includes('.__dsc_ia_'));
  harness.flush();

  const pills = nodesByClass(composer.output, 'dsc-ia-pill');
  assert.equal(pills.length, 2, '两张图各一个胶囊');
  const clearButton = query(pills[0], node => classesOf(node).includes('dsc-ia-pill-clear'))[0];
  assert.ok(clearButton);
  await click(harness, clearButton);

  assert.equal(runtime.store.get('ia-draft|s1|d1').comments.length, 0, '只清空评论');
  assert.equal(runtime.store.get('ia-draft|s1|d1').marks.length, 1, '保留手绘');
  assert.equal(runtime.store.get('ia-draft|s1|d2').comments.length, 1, '其他图不变');
  assert.equal(input.ids().length, 2, '图片与顺序保持');
  assert.notEqual(input.ids()[0], tokenDraftId, '原位替换为新的无 token 文件');
  assert.equal(input.ids()[1], harness.conversation.created[1].id);
  const replacement = harness.conversation.created[2].file;
  assert.ok(!replacement.name.includes('.__dsc_ia_'), '清除后文件名不带 token');
  assert.equal(fileMarker(replacement), 'CANVAS_BURNED', '保留 hand drawn 需要重新烧录');
  assert.equal(harness.prepareCalls.length, 2, '清除不产生新的 Host 快照（两次来自第一轮两张图）');
  assert.deepEqual(harness.conversation.released, ['d1', 'd2', tokenDraftId]);
  assert.equal(harness.conversation.created.length, 3);
});

test('历史图片：点击打开预览、批注完成后追加当前草稿且不改历史 message', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const existing = imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'keep.png', marker: 'KEEP' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments: existing });
  const attachment = { attachmentId: 'sha256-hist-a', mediaType: 'image/png', width: 800, height: 600, bytes: 12, name: 'shot.png' };
  const history = harness.mountHistory({
    sessionId: 's1',
    attachment,
    bytes: 'HISTORY_BYTES'
  });
  await harness.settle();
  const frame = nodeByClass(history.output, 'dsc-iai-history-frame');
  assert.ok(frame, '历史图片应渲染可点击缩略图');
  assert.equal(frame.props.title, '预览并批注 shot.png');
  const image = query(history.output, node => node.type === 'img')[0];
  assert.equal(image.props.src, 'blob:history-sha256-hist-a');

  await click(harness, frame);
  const runtime = harness.runtime;
  runtime.store.set('ia-history|s1|sha256-hist-a', { comments: [{ id: 'c1', text: '历史图评论', x: 0.5, y: 0.25 }], marks: [] });
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.conversation.created.length, 1);
  assert.equal(harness.conversation.created[0].sessionId, 's1');
  const file = harness.conversation.created[0].file;
  assert.ok(file.name.startsWith('shot.__dsc_ia_'));
  assert.equal(fileMarker(file), 'HISTORY_BYTES', '历史图读取授权字节后追加到草稿');
  assert.deepEqual(input.ids(), ['d1', harness.conversation.created[0].id], '历史图追加到当前草稿');
  assert.equal(attachment.name, 'shot.png', '历史附件未被改写');
  assert.deepEqual(input.calls.setDraft, [], '不改正文/编辑器');
});

test('历史图片重复编辑：更新同一个目标草稿而不是每次追加重复附件', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const composer = harness.mountComposer({ sessionId: 's1', attachments: imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'keep.png', marker: 'KEEP' }]) });
  const attachment = { attachmentId: 'sha256-hist-b', mediaType: 'image/png', width: 640, height: 480, bytes: 10, name: 'again.png' };
  const history = harness.mountHistory({ sessionId: 's1', attachment, bytes: 'AGAIN_BYTES' });
  await harness.settle();
  const runtime = harness.runtime;
  await click(harness, nodeByClass(history.output, 'dsc-iai-history-frame'));
  runtime.store.set('ia-history|s1|sha256-hist-b', { comments: [{ id: 'c1', text: '第一次', x: 0.2, y: 0.2 }], marks: [] });
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  const firstDraftId = input.ids()[1];
  const createdCount = harness.conversation.created.length;
  assert.equal(input.ids().length, 2);

  // 再次编辑同一历史图：评论更新后完成，应原位替换刚才的草稿。
  await click(harness, nodeByClass(history.output, 'dsc-iai-history-frame'));
  runtime.store.set('ia-history|s1|sha256-hist-b', { comments: [{ id: 'c1', text: '第二次改', x: 0.4, y: 0.4 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.conversation.created.length, createdCount + 1);
  assert.equal(input.ids().length, 2, '不重复追加附件');
  assert.notEqual(input.ids()[1], firstDraftId);
  assert.deepEqual(harness.conversation.released, [firstDraftId]);
  assert.equal(harness.prepareCalls.length, 2);
  assert.notEqual(harness.prepareCalls[0].token, harness.prepareCalls[1].token);
  assert.deepEqual(harness.prepareCalls.map(call => call.comments[0].text), ['第一次', '第二次改']);
});

test('recall：历史 token 图片在 store 未恢复时从 Host 恢复 comments 并显示胶囊', async () => {
  const token = '12345678-1234-1234-1234-123456789abc';
  const harness = createHarness({
    recall: async request => {
      harness.recallCalls.push(request);
      return { ok: true, value: { ok: true, comments: [{ text: '刷新前的批注', x: 0.3, y: 0.6 }, { text: '第二条', x: 0.7, y: 0.2 }] } };
    }
  });
  harness.mountHostIfNeeded();
  const attachment = { attachmentId: 'sha256-sent-1', mediaType: 'image/png', width: 800, height: 600, bytes: 8, name: 'old.__dsc_ia_' + token + '__.png' };
  const history = harness.mountHistory({ sessionId: 's1', attachment, bytes: 'OLD_BYTES' });
  await harness.settle();
  assert.equal(harness.recallCalls.length, 1);
  assert.deepEqual(plain(harness.recallCalls[0]), { sessionId: 's1', token });
  const pill = nodeByClass(history.output, 'dsc-ia-pill');
  assert.ok(pill, 'recall 后显示胶囊');
  assert.ok(textOf(pill).includes('2 条批注'));
  const state = harness.runtime.store.get('ia-sent|s1|' + token);
  assert.deepEqual(plain(state.comments.map(row => row.text)), ['刷新前的批注', '第二条']);
  assert.ok(state.comments.every(row => typeof row.id === 'string' && row.id.length > 0), '恢复的评论需要本地 id');
  const frame = nodeByClass(history.output, 'dsc-iai-history-frame');
  assert.equal(frame.props.title, '预览并批注 old.png', '显示名去掉 token 后缀');
  assert.deepEqual(harness.browser.localStorageWrites, [], '不把图片/批注写 localStorage');
  // 胶囊点击打开预览，已恢复的评论点会在预览里出现（marker 数据来自 store）。
  await click(harness, query(history.output, node => classesOf(node).includes('dsc-ia-pill-open'))[0]);
  assert.equal(nodesByClass(harness.mountHostIfNeeded().output, 'dsc-ia-root').length, 1, '胶囊打开预览');
  assert.ok(nodesByClass(harness.mountHostIfNeeded().output, 'dsc-ia-dot').length >= 1, '恢复的评论显示为 marker');
  // 恢复出来的内容已代表发送快照：只打开/完成、不做修改，不应再 prepare 或追加附件。
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.recallCalls.length, 1);
  assert.equal(harness.prepareCalls.length, 0, '无改动完成不 prepare');
  assert.equal(harness.conversation.created.length, 0, '无改动完成不追加附件');
});

test('recall 缺失：带 token 却查不到记录必须显示明确错误并可重试，不能静默当无批注', async () => {
  let mode = 'missing';
  const token = '22345678-1234-1234-1234-123456789abc';
  const harness = createHarness({
    recall: async request => {
      harness.recallCalls.push(request);
      if (mode === 'missing') return { ok: true, value: { ok: false, comments: [] } };
      if (mode === 'error') throw new Error('宿主 RPC 超时');
      return { ok: true, value: { ok: true, comments: [{ text: '恢复成功', x: 0.1, y: 0.1 }] } };
    }
  });
  harness.mountHostIfNeeded();
  const attachment = { attachmentId: 'sha256-sent-2', mediaType: 'image/png', width: 400, height: 300, bytes: 8, name: 'x.__dsc_ia_' + token + '__.png' };
  const history = harness.mountHistory({ sessionId: 's1', attachment, bytes: 'X' });
  await harness.settle();
  assert.equal(nodeByClass(history.output, 'dsc-ia-pill'), undefined, '缺失时没有胶囊');
  const missingError = nodeByClass(history.output, 'dsc-iai-recall-error');
  assert.ok(missingError, '缺失必须显示错误而不是静默');
  assert.ok(String(missingError.props.title).includes('未找到该图片已保存的批注记录'));
  assert.ok(textOf(missingError).includes('重试'));

  // 用户重试后 Host 返回评论：显示胶囊并清除错误。
  mode = 'ok';
  await click(harness, missingError);
  assert.equal(harness.recallCalls.length, 2);
  assert.equal(nodeByClass(history.output, 'dsc-iai-recall-error'), undefined, '重试成功后错误消失');
  assert.ok(nodeByClass(history.output, 'dsc-ia-pill'), '重试成功后显示胶囊');

  // 网络失败同样显示可重试错误且重试后恢复。
  mode = 'error';
  const errorToken = '23345678-1234-1234-1234-123456789abc';
  const errorAttachment = { attachmentId: 'sha256-sent-2b', mediaType: 'image/png', width: 400, height: 300, bytes: 8, name: 'x2.__dsc_ia_' + errorToken + '__.png' };
  const retryHistory = harness.mountHistory({ sessionId: 's1', attachment: errorAttachment, bytes: 'X2' });
  await harness.settle();
  const errorButton = nodeByClass(retryHistory.output, 'dsc-iai-recall-error');
  assert.ok(errorButton, '网络失败显示恢复错误');
  assert.ok(textOf(errorButton).includes('重试'));
  assert.ok(String(errorButton.props.title).includes('RPC 超时'));

  mode = 'ok';
  await click(harness, errorButton);
  assert.equal(harness.recallCalls.length >= 4, true);
  assert.ok(nodeByClass(retryHistory.output, 'dsc-ia-pill'), '重试成功后显示胶囊');
});

test('recall 不可用：在图片区域显示可重试错误而不是静默当无批注', async () => {
  const token = '32345678-1234-1234-1234-123456789abc';
  const harness = createHarness();
  harness.mountHostIfNeeded();
  // 模拟宿主尚未提供 recall 方法。
  const originalRecall = harness.remoteMounts[0].handlers.recall;
  delete harness.remoteApi.codexStyleImageAnnotations.recall;
  const attachment = { attachmentId: 'sha256-sent-3', mediaType: 'image/png', width: 400, height: 300, bytes: 8, name: 'y.__dsc_ia_' + token + '__.png' };
  const history = harness.mountHistory({ sessionId: 's1', attachment, bytes: 'Y' });
  await harness.settle();
  const errorButton = nodeByClass(history.output, 'dsc-iai-recall-error');
  assert.ok(errorButton, '缺 recall 时不能静默');
  assert.ok(String(errorButton.props.title).includes('宿主暂不支持'));
  harness.remoteApi.codexStyleImageAnnotations.recall = originalRecall;
  await click(harness, errorButton);
  assert.equal(harness.recallCalls.length, 1, '重试确实发起了 recall');
  // 该 session 的 recall 明确返回缺失：仍显示“未找到”可重试错误，而不是伪装成无批注。
  const missingButton = nodeByClass(history.output, 'dsc-iai-recall-error');
  assert.ok(missingButton, '缺失后仍显示错误');
  assert.ok(String(missingButton.props.title).includes('未找到该图片已保存的批注记录'));
  assert.equal(nodeByClass(history.output, 'dsc-ia-pill'), undefined, '没有评论时不显示胶囊');
});

test('多 session 隔离：同一 token 的 recall 分 session 请求，草稿与胶囊互不串', async () => {
  const token = '42345678-1234-1234-1234-123456789abc';
  const harness = createHarness({
    recall: async request => {
      harness.recallCalls.push(request);
      return { ok: true, value: { ok: true, comments: [{ text: '会话 ' + request.sessionId, x: 0.5, y: 0.5 }] } };
    }
  });
  harness.mountHostIfNeeded();
  const attachment = { attachmentId: 'sha256-shared', mediaType: 'image/png', width: 400, height: 300, bytes: 8, name: 'shared.__dsc_ia_' + token + '__.png' };
  const historyS1 = harness.mountHistory({ sessionId: 's1', attachment, bytes: 'S1' });
  const historyS2 = harness.mountHistory({ sessionId: 's2', attachment, bytes: 'S2' });
  await harness.settle();
  assert.equal(harness.recallCalls.length, 2);
  assert.deepEqual(harness.recallCalls.map(call => call.sessionId).sort(), ['s1', 's2']);
  assert.equal(harness.runtime.store.get('ia-sent|s1|' + token).comments[0].text, '会话 s1');
  assert.equal(harness.runtime.store.get('ia-sent|s2|' + token).comments[0].text, '会话 s2');
  assert.ok(nodeByClass(historyS1.output, 'dsc-ia-pill'));
  assert.ok(nodeByClass(historyS2.output, 'dsc-ia-pill'));

  const inputS1 = harness.inputFor('s1');
  inputS1.setIds(['d1']);
  const composerS1 = harness.mountComposer({ sessionId: 's1', attachments: imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'a.png', marker: 'A' }]) });
  const inputS2 = harness.inputFor('s2');
  inputS2.setIds(['d2']);
  const composerS2 = harness.mountComposer({ sessionId: 's2', attachments: imagesAndFiles(harness, 's2', [{ id: 'd2', name: 'b.png', marker: 'B' }]) });
  harness.runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '只属于 s1', x: 0.2, y: 0.2 }], marks: [] });
  harness.flush();
  assert.ok(nodesByClass(composerS1.output, 'dsc-ia-pill').length >= 1);
  assert.equal(nodesByClass(composerS2.output, 'dsc-ia-pill').length, 0, '另一会话不显示批注');
});

test('重启恢复：卸载后重新 mount，历史 token 图片仍能通过 recall 恢复胶囊', async () => {
  const token = '52345678-1234-1234-1234-123456789abc';
  const recall = async request => {
    recallCalls.push(request);
    return { ok: true, value: { ok: true, comments: [{ text: '重启前的批注', x: 0.2, y: 0.8 }] } };
  };
  const recallCalls = [];
  const first = createHarness({ recall });
  first.dispose();
  const second = createHarness({ recall });
  second.mountHostIfNeeded();
  const attachment = { attachmentId: 'sha256-restart', mediaType: 'image/png', width: 500, height: 400, bytes: 8, name: 'r.__dsc_ia_' + token + '__.png' };
  const history = second.mountHistory({ sessionId: 's1', attachment, bytes: 'R' });
  await second.settle();
  assert.equal(recallCalls.length, 1, '内存丢失后依靠 Host 持久快照恢复');
  assert.ok(recallCalls[0].token === token);
  assert.ok(nodeByClass(history.output, 'dsc-ia-pill'), '重启后标签不消失');
  assert.deepEqual(second.browser.localStorageWrites, []);
});

test('void removeAttachment 契约：A/文档/B 原位替换为新 A，不丢原图且顺序准确', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'f1', 'd2']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: '界面 A.png', marker: 'A_BYTES' },
    { id: 'd2', name: '界面 B.png', marker: 'B_BYTES' }
  ]);
  attachments.splice(1, 0, { kind: 'file', id: 'f1', file: makeFile(harness, '需求说明.txt', 'DOC_BYTES', 'text/plain') });
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  // 公开契约检查：add/remove 都返回 void，不能把 undefined 当失败。
  assert.equal(input.inputActions.removeAttachment('does-not-exist'), undefined);
  assert.equal(input.inputActions.addAttachments([]), undefined);

  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '改一下', x: 0.5, y: 0.5 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));

  assert.equal(harness.prepareCalls.length, 1);
  assert.equal(harness.conversation.created.length, 1);
  const newDraftId = harness.conversation.created[0].id;
  assert.deepEqual(input.ids(), [newDraftId, 'f1', 'd2'], '替换后准确为 新A/文档/B');
  assert.deepEqual(harness.conversation.released, ['d1'], '只释放被替换的旧 A，文档与 B 不受影响');
  assert.equal(fileMarker(harness.conversation.created[0].file), 'A_BYTES', '原图 bytes 未丢');
  assert.ok(harness.conversation.created[0].file.name.includes(harness.prepareCalls[0].token));
});

test('移除/重排失败会恢复原草稿且不丢原图；恢复分支不依赖返回值', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'f1', 'd2']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: '界面 A.png', marker: 'A_BYTES' },
    { id: 'd2', name: '界面 B.png', marker: 'B_BYTES' }
  ]);
  attachments.splice(1, 0, { kind: 'file', id: 'f1', file: makeFile(harness, '需求说明.txt', 'DOC_BYTES', 'text/plain') });
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '触发恢复', x: 0.2, y: 0.2 }], marks: [] });
  harness.flush();
  // 在把旧位置之后的附件移回时注入一次失败，验证恢复路径。
  input.failNextAdd('f1');
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));

  assert.deepEqual(input.ids(), ['d1', 'f1', 'd2'], '失败后恢复原草稿顺序与原图');
  assert.equal(harness.conversation.released.length, 1, '新 draft 只释放一次');
  assert.equal(harness.conversation.released[0], harness.conversation.created[0].id);
  const alert = query(harness.mountHostIfNeeded().output, node => node.props && node.props.role === 'alert')[0];
  assert.ok(alert, '失败要显示在预览里');
  assert.ok(textOf(alert).includes('草稿图片顺序更新失败'));
});

test('宿主静默忽略 removeAttachment 时：用 useInput 最新快照核对并重同步为 新A/文档/B', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1', 'f1', 'd2']);
  const attachments = imagesAndFiles(harness, 's1', [
    { id: 'd1', name: '界面 A.png', marker: 'A_BYTES' },
    { id: 'd2', name: '界面 B.png', marker: 'B_BYTES' }
  ]);
  attachments.splice(1, 0, { kind: 'file', id: 'f1', file: makeFile(harness, '需求说明.txt', 'DOC_BYTES', 'text/plain') });
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '静默忽略测试', x: 0.1, y: 0.1 }], marks: [] });
  harness.flush();
  // 模拟宿主在可编辑判断上出现竞态：void 调用返回但旧附件实际未被移除。
  input.ignoreRemoveOnce('d1');
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  await harness.settle();
  const created = harness.conversation.created[0];
  assert.deepEqual(input.ids(), [created.id, 'f1', 'd2'], '快照核对后重同步为 新A/文档/B');
  assert.equal(new Set(input.ids()).size, input.ids().length, '不应出现重复附件');
  assert.deepEqual(harness.conversation.released, ['d1']);
});

test('禁用时仍在等待 prepare：返回后不得创建孤立草稿附件', async () => {
  let resolvePrepare = null;
  const harness = createHarness({
    prepare: () => new Promise(resolve => { resolvePrepare = resolve; })
  });
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const attachments = imagesAndFiles(harness, 's1', [{ id: 'd1', name: '界面 A.png', marker: 'A_BYTES' }]);
  const composer = harness.mountComposer({ sessionId: 's1', attachments });
  const runtime = harness.runtime;
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  runtime.store.set('ia-draft|s1|d1', { comments: [{ id: 'c1', text: '准备中禁用', x: 0.4, y: 0.4 }], marks: [] });
  harness.flush();
  const pending = fire(buttonByText(harness.mountHostIfNeeded().output, '完成批注'), 'onClick');
  await harness.settle();
  assert.equal(typeof resolvePrepare, 'function', 'prepare 已发出并在等待');
  harness.dispose();
  resolvePrepare({ ok: true, value: { ok: true } });
  await pending;
  await harness.settle();
  assert.equal(harness.conversation.created.length, 0, '禁用后返回的 prepare 不得 createDrafts');
  assert.deepEqual(input.ids(), ['d1'], '禁用不改动草稿附件');
});

test('历史图片 slot 一次传多图：完整显示、可导航、按各自目标独立批注', async () => {
  const harness = createHarness();
  harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds([]);
  // 真实宿主里当前会话始终有 composer；历史图批注需要它的公开草稿状态。
  harness.mountComposer({ sessionId: 's1', attachments: [] });
  const attachmentA = { attachmentId: 'sha256-multi-a', mediaType: 'image/png', width: 800, height: 600, bytes: 9, name: 'one.png' };
  const attachmentB = { attachmentId: 'sha256-multi-b', mediaType: 'image/png', width: 640, height: 480, bytes: 9, name: 'two.png' };
  const history = harness.mountHistory({
    sessionId: 's1',
    images: [{ attachment: attachmentA }, { attachment: attachmentB }],
    bytes: 'MULTI_BYTES'
  });
  await harness.settle();
  assert.ok(nodeByClass(history.output, 'dsc-iai-history-group'), '多图用分组容器渲染');
  const frames = nodesByClass(history.output, 'dsc-iai-history-frame');
  assert.equal(frames.length, 2, '两张历史图片都完整显示');
  assert.deepEqual(frames.map(frame => frame.props.title), ['预览并批注 one.png', '预览并批注 two.png']);

  // 点第二张进入预览：应带 2 张图并定位到 2/2，可向前导航到 1/2。
  await click(harness, frames[1]);
  let hostTree = harness.mountHostIfNeeded().output;
  assert.equal(nodesByClass(hostTree, 'dsc-ia-root').length, 1);
  assert.equal(textOf(nodeByClass(hostTree, 'dsc-ia-title-index')), '2 / 2');
  const prev = query(hostTree, node => node.props && node.props['aria-label'] === '上一张图片')[0];
  assert.ok(prev, '多图预览应提供上一张导航');
  await click(harness, prev);
  hostTree = harness.mountHostIfNeeded().output;
  assert.equal(textOf(nodeByClass(hostTree, 'dsc-ia-title-index')), '1 / 2');
  const next = query(hostTree, node => node.props && node.props['aria-label'] === '下一张图片')[0];
  await click(harness, next);
  hostTree = harness.mountHostIfNeeded().output;
  assert.equal(textOf(nodeByClass(hostTree, 'dsc-ia-title-index')), '2 / 2');

  // 仅给第二张加评论并完成：只同步第二张，第一张不被误判为有改动。
  const runtime = harness.runtime;
  runtime.store.set('ia-history|s1|sha256-multi-b', { comments: [{ id: 'c1', text: '第二张批注', x: 0.5, y: 0.5 }], marks: [] });
  harness.flush();
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '添加评论'));
  await click(harness, buttonByText(harness.mountHostIfNeeded().output, '完成批注'));
  assert.equal(harness.prepareCalls.length, 1, '只同步有改动的第二张');
  assert.deepEqual(plain(harness.prepareCalls[0].comments), [{ text: '第二张批注', x: 0.5, y: 0.5 }]);
  assert.equal(harness.conversation.created.length, 1);
  assert.ok(harness.conversation.created[0].file.name.startsWith('two.__dsc_ia_'));
  assert.deepEqual(input.ids(), [harness.conversation.created[0].id]);
  harness.flush();
  assert.equal(nodesByClass(history.output, 'dsc-ia-pill').length, 1, '只有第二张显示胶囊');
});

test('禁用清理：槽位恢复宿主条目、样式/预览/监听/Remote 全部释放，不删除 Host 记录', async () => {
  const harness = createHarness();
  const host = harness.mountHostIfNeeded();
  const input = harness.inputFor('s1');
  input.setIds(['d1']);
  const composer = harness.mountComposer({ sessionId: 's1', attachments: imagesAndFiles(harness, 's1', [{ id: 'd1', name: 'a.png', marker: 'A' }]) });
  await click(harness, nodesByClass(composer.output, 'dsc-iai-thumb')[0]);
  assert.equal(nodesByClass(host.output, 'dsc-ia-root').length, 1);
  const style = harness.browser.createdElements.find(element => element.tagName === 'STYLE' && element.dataset.dscImageAnnotations !== undefined);
  const mountedHandlers = harness.remoteMounts[0].handlers;
  const remoteCallsBeforeDispose = harness.remoteMethodCalls.length;
  harness.dispose();
  assert.ok(style.removed);
  assert.equal(harness.activeEntry('conversation.input.attachments').options.priority, 100, '宿主原附件渲染恢复');
  assert.equal(harness.activeEntry('conversation.chat.user.images').options.priority, 100);
  assert.equal(harness.remoteApi.codexStyleImageAnnotations, undefined);
  assert.equal(typeof mountedHandlers.prepare, 'function', '只做本地释放，不调用 Host 删除');
  assert.equal(harness.remoteMethodCalls.length, remoteCallsBeforeDispose, '禁用过程不发起额外 Host RPC（不删除持久记录）');
  assert.ok(harness.remoteMethodCalls.every(name => ['clear', 'prepare', 'recall'].includes(name)), '只使用本插件批注服务');
  assert.equal(harness.runtime.disposed, true);
  assert.equal(harness.runtime.getViewer(), null);
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 1, '组件仍挂载时监听保留（由外部开关统一 unmount）');
  composer.unmount();
  assert.equal(harness.browser.countListeners('document', 'dragenter'), 0);
});
