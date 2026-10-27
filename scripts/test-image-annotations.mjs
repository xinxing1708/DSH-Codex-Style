// 图片批注功能测试。
// 通过 node:vm 直接加载 src/image-annotations.js（与 build 拼接后的作用域约定一致），
// 注入最小 React 运行时与 DOM 桩，真实驱动纯函数和组件事件，而不是比对源码字符串。
//
// 运行：node --test scripts/test-image-annotations.mjs

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceText = await readFile(resolve(root, 'src/image-annotations.js'), 'utf8');
const cssText = await readFile(resolve(root, 'src/image-annotations.css'), 'utf8');

/* --------------------------- 最小 React 运行时 --------------------------- */

function createMiniRuntime() {
  const slots = [];
  let cursor = 0;
  let mounted = false;
  let render = null;
  let tree = null;

  const schedule = () => {
    if (mounted && render) render();
  };

  const useState = initial => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = { value: typeof initial === 'function' ? initial() : initial };
    const slot = slots[index];
    return [slot.value, next => {
      const value = typeof next === 'function' ? next(slot.value) : next;
      if (!Object.is(value, slot.value)) {
        slot.value = value;
        schedule();
      }
    }];
  };

  const useRef = initial => {
    const index = cursor++;
    if (!(index in slots)) slots[index] = { current: initial };
    return slots[index];
  };

  const useMemo = factory => { cursor += 1; return factory(); };
  const useCallback = callback => { cursor += 1; return callback; };
  const useEffect = () => { cursor += 1; };
  const useLayoutEffect = () => { cursor += 1; };

  const createElement = (type, props, ...children) => {
    const config = { ...(props || {}) };
    const kids = children.flat(Infinity).filter(child => child !== null && child !== undefined && child !== false && child !== true);
    config.children = kids.length === 0 ? undefined : kids.length === 1 ? kids[0] : kids;
    return { type, props: config };
  };

  const Fragment = Symbol.for('image-annotation-test.fragment');

  const expand = node => {
    if (node === null || node === undefined || node === false || node === true) return node;
    if (Array.isArray(node)) return node.map(expand).filter(child => child !== null && child !== undefined && child !== false);
    if (typeof node !== 'object') return node;
    if (node.type === Fragment) return expand(node.props.children);
    if (typeof node.type === 'function') return expand(node.type(node.props));
    const children = node.props.children === undefined
      ? undefined
      : [].concat(node.props.children).flat(Infinity).map(expand).filter(child => child !== null && child !== undefined && child !== false);
    return { type: node.type, props: { ...node.props, children } };
  };

  const React = {
    createElement,
    Fragment,
    useState,
    useRef,
    useMemo,
    useCallback,
    useEffect,
    useLayoutEffect
  };

  const mount = (Component, props) => {
    const renderOnce = () => {
      cursor = 0;
      tree = expand(Component(props));
      return tree;
    };
    render = renderOnce;
    mounted = true;
    renderOnce();
    return {
      get tree() { return tree; },
      rerender() { return renderOnce(); },
      unmount() { mounted = false; }
    };
  };

  return { React, mount };
}

/* ------------------------------- DOM 桩 ------------------------------- */

function createDocumentStub() {
  const documentStub = {
    body: { appendChild() {}, removeChild() {} },
    activeElement: null,
    createElement(tag) {
      return {
        tagName: String(tag).toUpperCase(),
        style: {},
        setAttribute() {},
        removeAttribute() {},
        appendChild() {},
        removeChild() {},
        remove() {},
        focus() {},
        click() {},
        getBoundingClientRect() { return { left: 0, top: 0, width: 1, height: 1 }; }
      };
    },
    addEventListener() {},
    removeEventListener() {}
  };
  return documentStub;
}

function createWindowStub() {
  return {
    innerWidth: 1280,
    innerHeight: 800,
    addEventListener() {},
    removeEventListener() {}
  };
}

function loadModule(options = {}) {
  const runtime = createMiniRuntime();
  const documentStub = options.document || createDocumentStub();
  const windowStub = options.window || createWindowStub();
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    queueMicrotask,
    document: documentStub,
    window: windowStub,
    navigator: { userAgent: 'node-image-annotation-test' },
    Blob: class TestBlob {
      constructor(parts, init) { this.parts = parts; this.type = init && init.type; }
    },
    Image: undefined,
    fetch: undefined,
    __IA_REACT__: runtime.React,
    __IA_PORTAL__: undefined
  };
  vm.createContext(sandbox);
  const wrapper = `
const React = globalThis.__IA_REACT__;
const h = React.createElement;
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } = React;
const createPortal = globalThis.__IA_PORTAL__;
${sourceText}
;globalThis.__IA_EXPORTS__ = {
  createImageAnnotationStore, ImageAnnotationViewer, ImageAnnotationPill,
  formatImageAnnotationPrompt, exportImageAnnotationImage,
  imageAnnotationNormalizePoint, imageAnnotationPointFromClient, imageAnnotationPointerMoved,
  imageAnnotationPlacePopup, imageAnnotationClampDrag, imageAnnotationFitBox,
  imageAnnotationNormalizeState, imageAnnotationCreateEmptyState,
  imageAnnotationAddComment, imageAnnotationUpdateComment, imageAnnotationRemoveComment,
  imageAnnotationCommentNumber,
  imageAnnotationAddMark, imageAnnotationReplaceMark, imageAnnotationMoveMark,
  imageAnnotationRemoveMark, imageAnnotationUndoMarkup, imageAnnotationRedoMarkup,
  imageAnnotationMarkBounds, imageAnnotationDrawMarks,
  imageAnnotationNormalizedText, imageAnnotationPercent, imageAnnotationClamp01
};
`;
  const script = new vm.Script(wrapper, { filename: 'image-annotations.test-bundle.js' });
  script.runInContext(sandbox);
  return { api: sandbox.__IA_EXPORTS__, runtime, sandbox, documentStub, windowStub };
}

/* ----------------------------- 树遍历工具 ----------------------------- */

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

function query(tree, predicate) {
  const matches = [];
  walk(tree, node => {
    if (node.props && predicate(node)) matches.push(node);
  });
  return matches;
}

function classesOf(node) {
  return String((node.props && node.props.className) || '').split(/\s+/).filter(Boolean);
}

function nodeByClass(tree, className) {
  return query(tree, node => classesOf(node).includes(className))[0];
}

function nodesByClass(tree, className) {
  return query(tree, node => classesOf(node).includes(className));
}

function nodeByAria(tree, label) {
  return query(tree, node => node.props['aria-label'] === label)[0];
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

// 供 CSS 回归断言使用的极简规则块提取（只匹配精确选择器，不误命中伪类组合）。
function cssRuleBlock(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(escaped + '\\s*\\{([^}]*)\\}'));
  return match ? match[1] : '';
}

function fire(node, handlerName, event) {
  assert.ok(node, '找不到要触发的节点：' + handlerName);
  const handler = node.props[handlerName];
  assert.equal(typeof handler, 'function', '节点缺少事件处理：' + handlerName);
  return handler(event || {});
}

function pointerEvent(overrides = {}) {
  return {
    button: 0,
    pointerId: 1,
    clientX: 0,
    clientY: 0,
    currentTarget: { setPointerCapture() {}, releasePointerCapture() {} },
    target: null,
    stopPropagation() { this.stopped = true; },
    preventDefault() { this.prevented = true; },
    ...overrides
  };
}

// VM 内创建的对象与宿主 realm 原型不同，结构化值用字段断言而不是 deepStrictEqual。
function expectPoint(actual, x, y, message) {
  assert.equal(actual.x, x, (message || 'x') + '：' + actual.x);
  assert.equal(actual.y, y, (message || 'y') + '：' + actual.y);
}

function expectBounds(actual, x1, y1, x2, y2) {
  assert.equal(actual.x1, x1);
  assert.equal(actual.y1, y1);
  assert.equal(actual.x2, x2);
  assert.equal(actual.y2, y2);
}

const viewerStageRect = { left: 100, top: 50, width: 800, height: 400 };

function mountViewer(module, options = {}) {
  const { api, runtime } = module;
  const store = options.store || api.createImageAnnotationStore();
  const images = options.images || [{ key: 'a', src: 'a.png', name: 'a.png', width: 800, height: 600 }];
  const events = { close: 0, complete: [], download: 0 };
  const props = {
    images,
    store,
    initialIndex: options.initialIndex || 0,
    onClose: options.onClose || (() => { events.close += 1; }),
    onComplete: options.onComplete || (payload => { events.complete.push(payload); }),
    onDownload: options.onDownload
  };
  const app = runtime.mount(api.ImageAnnotationViewer, props);
  const canvas = nodeByClass(app.tree, 'dsc-ia-canvas');
  if (canvas && canvas.props.ref) canvas.props.ref.current = { getBoundingClientRect: () => viewerStageRect };
  return { app, store, images, events, props };
}

function setCanvasRect(app, rect) {
  const canvas = nodeByClass(app.tree, 'dsc-ia-canvas');
  assert.ok(canvas, '缺少图片画布节点');
  canvas.props.ref.current = { getBoundingClientRect: () => rect };
}

function clickStageAt(app, clientX, clientY) {
  setCanvasRect(app, viewerStageRect);
  const down = nodeByClass(app.tree, 'dsc-ia-stage');
  fire(down, 'onPointerDown', pointerEvent({ clientX, clientY }));
  const up = nodeByClass(app.tree, 'dsc-ia-stage');
  fire(up, 'onPointerUp', pointerEvent({ clientX, clientY }));
}

function enterComment(app) {
  fire(buttonByText(app.tree, '添加评论'), 'onClick');
}

function enterMarkup(app) {
  fire(buttonByText(app.tree, '标注'), 'onClick');
}

function svgPoint(app, handlerName, clientX, clientY) {
  setCanvasRect(app, viewerStageRect);
  const svg = nodeByClass(app.tree, 'dsc-ia-marks');
  return fire(svg, handlerName, pointerEvent({ clientX, clientY, pointerId: 2 }));
}

/* ------------------------------- 加载检查 ------------------------------- */

test('源码可加载、接口齐全且 CSS 覆盖三态关键类', () => {
  const module = loadModule();
  for (const name of ['createImageAnnotationStore', 'ImageAnnotationViewer', 'ImageAnnotationPill', 'formatImageAnnotationPrompt', 'exportImageAnnotationImage']) {
    assert.equal(typeof module.api[name], 'function', '缺少接口 ' + name);
  }
  assert.ok(sourceText.length > 1000, '源码过短');
  for (const className of ['dsc-ia-root', 'dsc-ia-dot', 'dsc-ia-popup', 'dsc-ia-markup-toolbar', 'dsc-ia-size-slider', 'dsc-ia-pill']) {
    assert.ok(cssText.includes('.' + className), 'CSS 缺少 ' + className);
  }
  assert.ok(cssText.includes('prefers-reduced-motion'), '缺少减少动效处理');
  assert.ok(cssText.includes('@media (max-width: 640px)'), '缺少小视口处理');
  // 源码必须保持可拼接的 script 片段，而不是 ESM 模块。
  assert.ok(!/^\s*import\s/m.test(sourceText), '源码不得使用 ESM import');
  assert.ok(!/^\s*export\s/m.test(sourceText), '源码不得使用 ESM export');
});

test('CSS 回归：浅色按钮显式深色文字，缩放菜单向下展开', () => {
  const globalRule = cssRuleBlock(cssText, '.dsc-ia-root button');
  assert.ok(globalRule, '应有全局按钮基础规则');
  assert.ok(!/\bcolor\s*:/.test(globalRule), '全局按钮规则不得用 color 覆盖浅色按钮的显式文字色');
  for (const selector of ['.dsc-ia-primary', '.dsc-ia-popup-save', '.dsc-ia-popup-send']) {
    assert.match(cssRuleBlock(cssText, selector), /\bcolor\s*:\s*#111/, selector + ' 必须有显式深色文字');
  }
  const zoomMenu = cssRuleBlock(cssText, '.dsc-ia-zoom-menu');
  assert.match(zoomMenu, /top\s*:\s*calc\(100%\s*\+\s*8px\)/, '缩放菜单必须向下展开');
  assert.match(zoomMenu, /bottom\s*:\s*auto/, '缩放菜单必须清除继承的 bottom 定位');
});

/* ------------------------------- 坐标边界 ------------------------------- */

test('归一化坐标钳制在 0..1，点击坐标按图片内容 rect 计算', () => {
  const { api } = loadModule();
  expectPoint(api.imageAnnotationNormalizePoint(-0.3, 1.4), 0, 1);
  expectPoint(api.imageAnnotationNormalizePoint(0.25, 0.75), 0.25, 0.75);
  expectPoint(api.imageAnnotationNormalizePoint(NaN, Infinity), 0, 0);
  expectPoint(api.imageAnnotationNormalizePoint('0.5', '2'), 0.5, 1);
  assert.equal(api.imageAnnotationClamp01(-1), 0);
  assert.equal(api.imageAnnotationClamp01(2), 1);

  const rect = { left: 100, top: 50, width: 400, height: 200 };
  expectPoint(api.imageAnnotationPointFromClient(rect, 300, 150), 0.5, 0.5);
  expectPoint(api.imageAnnotationPointFromClient(rect, 100, 50), 0, 0);
  expectPoint(api.imageAnnotationPointFromClient(rect, 500, 250), 1, 1);
  expectPoint(api.imageAnnotationPointFromClient(rect, 0, 0), 0, 0);
  expectPoint(api.imageAnnotationPointFromClient(rect, 900, 900), 1, 1);
  const degenerate = api.imageAnnotationPointFromClient({ left: 0, top: 0, width: 0, height: 0 }, 10, 10);
  assert.ok(Number.isFinite(degenerate.x) && Number.isFinite(degenerate.y), '零尺寸 rect 不能产生 NaN');
});

test('按下到抬起位移不超过 8 个事件坐标像素才放点', () => {
  const { api } = loadModule();
  const start = { x: 100, y: 100 };
  assert.equal(api.imageAnnotationPointerMoved(start, { clientX: 108, clientY: 100 }), false);
  assert.equal(api.imageAnnotationPointerMoved(start, { clientX: 100, clientY: 108 }), false);
  assert.equal(api.imageAnnotationPointerMoved(start, { clientX: 109, clientY: 100 }), true);
  assert.equal(api.imageAnnotationPointerMoved(start, { clientX: 106, clientY: 106 }), true);
  assert.equal(api.imageAnnotationPointerMoved(null, { clientX: 0, clientY: 0 }), false);
});

/* -------------------------------- store -------------------------------- */

test('store 按图片 key 隔离，clear 与 clearComments 行为不同', () => {
  const { api } = loadModule();
  const store = api.createImageAnnotationStore();
  const empty = store.get('a');
  assert.equal(empty.comments.length, 0);
  assert.equal(empty.marks.length, 0);

  const commented = api.imageAnnotationAddComment(store.get('a'), { text: '  第一条  ', x: 0.2, y: 0.3 });
  const marked = api.imageAnnotationAddMark(commented, { type: 'stroke', color: '#dc2626', width: 0.01, points: [{ x: 0.1, y: 0.1 }, { x: 0.2, y: 0.2 }] });
  store.set('a', marked);
  store.set('b', api.imageAnnotationAddComment(store.get('b'), { text: '另一张图', x: 0.9, y: 0.9 }));

  assert.equal(store.get('a').comments.length, 1);
  assert.equal(store.get('a').comments[0].text, '第一条');
  assert.equal(store.get('a').marks.length, 1);
  assert.equal(store.get('b').comments.length, 1);
  assert.equal(store.get('b').comments[0].text, '另一张图');
  assert.equal(store.get('c').comments.length, 0);

  let notifications = 0;
  const off = store.subscribe(() => { notifications += 1; });
  store.set('a', api.imageAnnotationAddComment(store.get('a'), { text: '通知', x: 0.5, y: 0.5 }));
  assert.equal(notifications, 1);
  off();
  store.set('a', api.imageAnnotationAddComment(store.get('a'), { text: '不再通知', x: 0.5, y: 0.5 }));
  assert.equal(notifications, 1);

  store.clearComments('a');
  assert.equal(store.get('a').comments.length, 0, 'clearComments 只清评论');
  assert.equal(store.get('a').marks.length, 1, 'clearComments 保留手绘');

  store.clear('a');
  assert.equal(store.get('a').comments.length, 0);
  assert.equal(store.get('a').marks.length, 0, 'clear 清完整状态');
  assert.equal(store.get('b').comments.length, 1, '其他图片不受影响');
});

/* ------------------------------ 评论增改删 ------------------------------ */

test('评论新增 trim 空白、拒绝空文本、删除后编号重排', () => {
  const { api } = loadModule();
  let state = api.imageAnnotationCreateEmptyState();
  state = api.imageAnnotationAddComment(state, { text: '   ', x: 0.1, y: 0.1 });
  assert.equal(state.comments.length, 0, '空白文本不保存');

  state = api.imageAnnotationAddComment(state, { text: '  第一条  ', x: -0.5, y: 1.8 });
  state = api.imageAnnotationAddComment(state, { text: '第二条', x: 0.5, y: 0.5 });
  assert.equal(state.comments.length, 2);
  assert.equal(state.comments[0].text, '第一条');
  assert.deepEqual({ x: state.comments[0].x, y: state.comments[0].y }, { x: 0, y: 1 });
  assert.equal(new Set(state.comments.map(comment => comment.id)).size, 2, 'id 必须唯一');

  assert.equal(api.imageAnnotationCommentNumber(state, state.comments[1].id), 2);
  const firstId = state.comments[0].id;
  const secondId = state.comments[1].id;

  state = api.imageAnnotationUpdateComment(state, firstId, '  修改后  ');
  assert.equal(state.comments[0].text, '修改后');
  assert.deepEqual({ x: state.comments[0].x, y: state.comments[0].y }, { x: 0, y: 1 }, '修改不改坐标');
  state = api.imageAnnotationUpdateComment(state, firstId, '   ');
  assert.equal(state.comments[0].text, '修改后', '空文本不覆盖原文');

  state = api.imageAnnotationRemoveComment(state, firstId);
  assert.equal(state.comments.length, 1);
  assert.equal(api.imageAnnotationCommentNumber(state, secondId), 1, '删除后编号重排为 1');
});

/* ------------------------------ 格式化准确 ------------------------------ */

test('格式化输出 Image N 与一位小数百分比坐标，跳过空组', () => {
  const { api } = loadModule();
  const groups = [
    { imageNumber: 1, name: 'a.png', comments: [
      { text: '把这里改成圆角', x: 0.25, y: 0.4 },
      { text: '缩小这个图标', x: 0.725, y: 0.61 }
    ] },
    { imageNumber: 2, name: 'b.png', comments: [] },
    { imageNumber: 3, name: 'c.png', comments: [{ text: '第三张', x: -0.2, y: 1.7 }] },
    { imageNumber: 4, name: 'd.png', comments: [{ text: '   ', x: 0.1, y: 0.1 }] }
  ];
  assert.equal(
    api.formatImageAnnotationPrompt(groups),
    'Image 1:\n1. (x: 25%, y: 40%) 把这里改成圆角\n2. (x: 72.5%, y: 61%) 缩小这个图标\n\nImage 3:\n1. (x: 0%, y: 100%) 第三张'
  );
  assert.equal(api.formatImageAnnotationPrompt([]), '');
  assert.equal(api.formatImageAnnotationPrompt([{ imageNumber: 1, comments: [] }]), '');
  assert.equal(api.imageAnnotationPercent(0.33333), '33.3');
  assert.equal(api.imageAnnotationPercent(0.2504), '25');
  assert.equal(api.imageAnnotationPercent(-3), '0');
  assert.equal(api.imageAnnotationPercent(5), '100');
  // 编号必须按 comments 数组顺序而不是坐标排序。
  assert.equal(
    api.formatImageAnnotationPrompt([{ imageNumber: 2, comments: [{ text: '甲', x: 0.9, y: 0.9 }, { text: '乙', x: 0.1, y: 0.1 }] }]),
    'Image 2:\n1. (x: 90%, y: 90%) 甲\n2. (x: 10%, y: 10%) 乙'
  );
});

/* ------------------------------ 弹层定位 ------------------------------ */

test('弹层与点中心间隔 27px、避边 8px，优先右、左，再下、上', () => {
  const { api } = loadModule();
  const size = { width: 294, height: 44 };
  const viewport = { width: 1200, height: 800 };

  const centered = api.imageAnnotationPlacePopup({ left: 400, top: 300, width: 30, height: 30 }, size, viewport);
  assert.equal(centered.side, 'right');
  assert.equal(centered.left, 415 + 27, '弹层左边缘距点中心 27px，而不是点边缘 27px');
  assert.equal(centered.left - 415, 27);
  assert.equal(centered.top, 315 - 22);

  const nearRight = api.imageAnnotationPlacePopup({ left: 1000, top: 300, width: 30, height: 30 }, size, viewport);
  assert.equal(nearRight.side, 'left');
  assert.equal(nearRight.left, 1015 - 27 - 294);
  assert.equal((1015) - (nearRight.left + 294), 27, '左侧弹层右边缘距点中心 27px');

  const bothSidesTight = api.imageAnnotationPlacePopup({ left: 185, top: 250, width: 30, height: 30 }, size, { width: 400, height: 600 });
  assert.equal(bothSidesTight.side, 'bottom');

  const nearBottom = api.imageAnnotationPlacePopup({ left: 500, top: 740, width: 30, height: 30 }, { width: 294, height: 120 }, { width: 1200, height: 800 });
  assert.equal(nearBottom.side, 'top');
  assert.ok(nearBottom.top >= 8);

  const tinyViewport = api.imageAnnotationPlacePopup({ left: 450, top: 300, width: 30, height: 30 }, size, { width: 320, height: 480 });
  assert.ok(tinyViewport.left >= 8 && tinyViewport.left + 294 <= 320 - 8 + 0.001, '窄视口必须 clamp 在视口内');
  assert.ok(tinyViewport.top >= 8);

  const drag = api.imageAnnotationClampDrag({ left: 1000, top: 0, width: 100, height: 40 }, 300, -50, viewport, 8);
  assert.ok(1000 + 100 + drag.x <= 1200 - 8 + 0.001, '拖动不能把工具条带出视口右侧');
  assert.ok(0 + drag.y >= 8, '拖动不能把工具条带出视口上方');
});

/* ---------------------------- 手绘 undo/redo ---------------------------- */

test('手绘 marks 可撤销、重做、移动、删除，且新操作清空重做栈', () => {
  const { api } = loadModule();
  const stroke = index => ({ type: 'stroke', color: '#dc2626', width: 0.01, points: [{ x: 0.1, y: 0.1 + index * 0.05 }, { x: 0.2, y: 0.2 + index * 0.05 }] });
  let state = api.imageAnnotationCreateEmptyState();
  state = api.imageAnnotationAddMark(state, stroke(0));
  state = api.imageAnnotationAddMark(state, stroke(1));
  state = api.imageAnnotationAddMark(state, stroke(2));
  assert.equal(state.marks.length, 3);
  assert.equal(state.markupUndo.length, 3);

  state = api.imageAnnotationUndoMarkup(state);
  state = api.imageAnnotationUndoMarkup(state);
  assert.equal(state.marks.length, 1);
  assert.equal(state.markupRedo.length, 2);
  state = api.imageAnnotationRedoMarkup(state);
  state = api.imageAnnotationRedoMarkup(state);
  assert.equal(state.marks.length, 3, '两次重做恢复三步操作');
  assert.equal(state.markupUndo.length, 3);

  state = api.imageAnnotationUndoMarkup(state);
  assert.equal(state.marks.length, 2);
  state = api.imageAnnotationAddMark(state, stroke(9));
  assert.equal(state.markupRedo.length, 0, '撤销后新操作应清空重做栈');

  const targetId = state.marks[0].id;
  const beforeX = state.marks[0].points[0].x;
  state = api.imageAnnotationMoveMark(state, targetId, 0.1, 0.05);
  assert.ok(Math.abs(state.marks[0].points[0].x - (beforeX + 0.1)) < 1e-9, '移动应平移所有点');
  state = api.imageAnnotationUndoMarkup(state);
  assert.ok(Math.abs(state.marks[0].points[0].x - beforeX) < 1e-9, '移动可撤销');

  const removeId = state.marks[0].id;
  state = api.imageAnnotationRemoveMark(state, removeId);
  assert.equal(state.marks.length, 2);
  state = api.imageAnnotationUndoMarkup(state);
  assert.equal(state.marks.length, 3, '删除可撤销');

  assert.equal(api.imageAnnotationUndoMarkup(api.imageAnnotationCreateEmptyState()).marks.length, 0, '空历史撤销不报错');
  assert.equal(api.imageAnnotationRedoMarkup(api.imageAnnotationCreateEmptyState()).marks.length, 0);

  const bounds = api.imageAnnotationMarkBounds({ type: 'stroke', points: [{ x: 0.2, y: 0.4 }, { x: 0.6, y: 0.1 }] });
  expectBounds(bounds, 0.2, 0.1, 0.6, 0.4);
});

/* ------------------------------ 图片旁胶囊 ------------------------------ */

test('胶囊只在有批注时渲染，叉号有独立 aria-label 且不冒泡触发打开', () => {
  const { api } = loadModule();
  assert.equal(api.ImageAnnotationPill({ count: 0, onOpen() {}, onClear() {} }), null);
  assert.equal(api.ImageAnnotationPill({ count: -3, onOpen() {}, onClear() {} }), null);

  const calls = [];
  const tree = api.ImageAnnotationPill({
    count: 3,
    onOpen: () => calls.push('open'),
    onClear: () => calls.push('clear')
  });
  assert.ok(tree, '有批注时必须渲染胶囊');
  const openButton = query(tree, node => node.props['aria-label'] && node.props['aria-label'].includes('查看图片批注'))[0];
  const clearButton = query(tree, node => node.props['aria-label'] && node.props['aria-label'].includes('清除这张图片'))[0];
  assert.ok(openButton && clearButton, '胶囊需要打开与清除两个按钮');
  assert.match(clearButton.props['aria-label'], /3 条批注/, '叉号 aria-label 必须包含数量');
  assert.notEqual(openButton.props['aria-label'], clearButton.props['aria-label']);

  const clearEvent = { stopped: false, stopPropagation() { this.stopped = true; } };
  clearButton.props.onClick(clearEvent);
  assert.equal(clearEvent.stopped, true, '叉号必须阻止冒泡以免误开预览');
  assert.deepEqual(calls, ['clear']);

  const openEvent = { stopPropagation() {} };
  openButton.props.onClick(openEvent);
  assert.deepEqual(calls, ['clear', 'open']);
});

/* --------------------------- Viewer：完成与保存 --------------------------- */

test('完成批注调用 onComplete，保存成功后才关闭', async () => {
  const module = loadModule();
  const completeCalls = [];
  let resolveComplete = null;
  const onComplete = payload => {
    completeCalls.push(payload);
    return new Promise(resolve => { resolveComplete = resolve; });
  };
  const mounted = mountViewer(module, { onComplete });
  const app = mounted.app;

  // 预览态不应有“发送”或模型动作，只有真实可用的本地操作。
  assert.equal(query(app.tree, node => node.type === 'button' && /发送|模型/.test(textOf(node))).length, 0);

  enterComment(app);
  const completeButton = buttonByText(app.tree, '完成批注');
  assert.ok(completeButton, '评论态必须有完成批注按钮');

  const pending = fire(completeButton, 'onClick');
  assert.equal(mounted.events.close, 0, '保存 Promise 完成前不能关闭');
  assert.equal(completeCalls.length, 1, '点击完成时必须调用 onComplete');

  resolveComplete({ ok: true });
  await pending;
  assert.equal(completeCalls.length, 1, '完成时必须只回调一次 onComplete');
  assert.equal(completeCalls[0].image.key, 'a');
  assert.equal(completeCalls[0].state.comments.length, 0);
  assert.equal(completeCalls[0].all.length, 1);
  assert.equal(completeCalls[0].all[0].number, 1);
  assert.equal(mounted.events.close, 1, '保存成功后关闭预览');
});

test('保存失败时保持打开并显示错误，不丢草稿', async () => {
  const module = loadModule();
  const onComplete = () => Promise.reject(new Error('磁盘已满'));
  const mounted = mountViewer(module, { onComplete });
  const app = mounted.app;

  enterComment(app);
  clickStageAt(app, 500, 250);
  const input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  assert.ok(input, '点击图像后应出现新增评论输入框');
  input.props.onChange({ target: { value: '这条不能丢' } });

  await fire(buttonByText(app.tree, '完成批注'), 'onClick');
  assert.equal(mounted.events.close, 0, '保存失败不能关闭');
  const alerts = query(app.tree, node => node.props.role === 'alert');
  assert.ok(alerts.length > 0);
  assert.match(textOf(alerts[0]), /磁盘已满/);
  assert.equal(mounted.store.get('a').comments.length, 1, '保存失败前草稿已落库');
  assert.equal(mounted.store.get('a').comments[0].text, '这条不能丢');
});

test('完成批注会把非空未提交草稿一并保存', async () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterComment(app);
  clickStageAt(app, 300, 150);
  const input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  input.props.onChange({ target: { value: '未提交草稿' } });

  await fire(buttonByText(app.tree, '完成批注'), 'onClick');
  assert.equal(mounted.events.complete.length, 1);
  assert.equal(mounted.events.complete[0].state.comments.length, 1, '完成时必须带上未提交草稿');
  assert.equal(mounted.events.complete[0].state.comments[0].text, '未提交草稿');
});

/* --------------------------- Viewer：新增与编辑 --------------------------- */

test('点击图片落点保存评论，空白文本不产生评论', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterComment(app);

  clickStageAt(app, 500, 250); // rect 100,50,800,400 -> (0.5, 0.5)
  let popup = nodeByClass(app.tree, 'dsc-ia-popup');
  assert.ok(popup, '点击图像应出现新增评论胶囊');
  assert.equal(nodesByClass(app.tree, 'dsc-ia-popup-send').length, 0, '空文本时不显示保存箭头');

  // 返工：新建评论立即在落点显示下一个编号点；弹层定位先就绪再显示以便聚焦。
  const draftDot = nodesByClass(app.tree, 'dsc-ia-dot')[0];
  assert.ok(draftDot, '点击后应立即显示蓝色编号点');
  assert.ok(classesOf(draftDot).includes('is-draft'));
  assert.equal(textOf(draftDot), '1', '草稿点使用下一个编号');
  assert.ok(!classesOf(popup).includes('is-unpositioned'), '弹层应在定位就绪后显示');
  assert.ok(popup.props.style && popup.props.style.left, '弹层应写入定位坐标');

  let input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  input.props.onChange({ target: { value: '   ' } });
  assert.equal(nodesByClass(app.tree, 'dsc-ia-popup-send').length, 0, '空白文本仍不显示箭头');

  input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  input.props.onChange({ target: { value: '  第一条批注  ' } });
  const send = nodeByClass(app.tree, 'dsc-ia-popup-send');
  assert.ok(send, '非空文本应出现保存箭头');
  fire(send, 'onClick');

  const state = mounted.store.get('a');
  assert.equal(state.comments.length, 1);
  assert.equal(state.comments[0].text, '第一条批注');
  assert.deepEqual({ x: state.comments[0].x, y: state.comments[0].y }, { x: 0.5, y: 0.5 });
  assert.equal(nodeByClass(app.tree, 'dsc-ia-popup'), undefined, '保存后关闭输入胶囊');
  const savedDots = nodesByClass(app.tree, 'dsc-ia-dot');
  assert.equal(savedDots.length, 1, '保存后草稿点由正式编号点替换');
  assert.ok(!classesOf(savedDots[0]).includes('is-draft'));
});

test('已有评论可编辑、取消、删除并重排编号', () => {
  const module = loadModule();
  const store = module.api.createImageAnnotationStore();
  store.set('a', module.api.imageAnnotationAddComment(module.api.imageAnnotationCreateEmptyState(), { text: '原文', x: 0.25, y: 0.5 }));
  store.set('a', module.api.imageAnnotationAddComment(store.get('a'), { text: '第二条', x: 0.75, y: 0.5 }));
  const mounted = mountViewer(module, { store });
  const app = mounted.app;
  enterComment(app);

  let dots = nodesByClass(app.tree, 'dsc-ia-dot');
  assert.equal(dots.length, 2);
  assert.equal(textOf(dots[0]), '1');
  assert.equal(textOf(dots[1]), '2');

  fire(dots[0], 'onClick', { stopPropagation() {} });
  assert.ok(nodeByClass(app.tree, 'dsc-ia-popup'), '点击编号应打开编辑卡');
  let textarea = query(app.tree, node => node.type === 'textarea')[0];
  assert.ok(textarea, '编辑卡必须使用 textarea');
  assert.equal(textarea.props.value, '原文');

  textarea.props.onChange({ target: { value: '修改后' } });
  fire(buttonByText(app.tree, '保存'), 'onClick');
  assert.equal(store.get('a').comments[0].text, '修改后');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-popup'), undefined);

  // 取消不改原文
  dots = nodesByClass(app.tree, 'dsc-ia-dot');
  fire(dots[0], 'onClick', { stopPropagation() {} });
  textarea = query(app.tree, node => node.type === 'textarea')[0];
  textarea.props.onChange({ target: { value: '不应保存' } });
  fire(buttonByText(app.tree, '取消'), 'onClick');
  assert.equal(store.get('a').comments[0].text, '修改后');

  // 删除第一条后，第二条编号重排为 1
  dots = nodesByClass(app.tree, 'dsc-ia-dot');
  fire(dots[0], 'onClick', { stopPropagation() {} });
  fire(nodeByAria(app.tree, '删除这条批注'), 'onClick');
  assert.equal(store.get('a').comments.length, 1);
  assert.equal(store.get('a').comments[0].text, '第二条');
  dots = nodesByClass(app.tree, 'dsc-ia-dot');
  assert.equal(textOf(dots[0]), '1', '删除后编号重排');
});

test('点击新点前先保存非空未提交草稿，不静默丢字', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterComment(app);

  clickStageAt(app, 300, 150);
  let input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  input.props.onChange({ target: { value: '先写的内容' } });

  clickStageAt(app, 600, 350);
  assert.equal(mounted.store.get('a').comments.length, 1, '新点前旧草稿应被保存');
  assert.equal(mounted.store.get('a').comments[0].text, '先写的内容');
  input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  assert.ok(input, '新点应出现新的空输入框');
  assert.equal(input.props.value, '', '新输入框不能带旧内容');
});

test('点击另一条已有评论前也保存当前未提交草稿', () => {
  const module = loadModule();
  const store = module.api.createImageAnnotationStore();
  store.set('a', module.api.imageAnnotationAddComment(module.api.imageAnnotationCreateEmptyState(), { text: '旧评论', x: 0.25, y: 0.5 }));
  const mounted = mountViewer(module, { store });
  const app = mounted.app;
  enterComment(app);

  clickStageAt(app, 500, 250);
  const input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0];
  input.props.onChange({ target: { value: '未提交的新评论' } });

  const marker = query(app.tree, node => node.type === 'button' && String(node.props['aria-label'] || '').startsWith('第 1 条批注：'))[0];
  fire(marker, 'onClick', { stopPropagation() {} });
  assert.equal(store.get('a').comments.length, 2, '切换到另一条评论前保存当前草稿');
  assert.equal(store.get('a').comments[1].text, '未提交的新评论');
  const textarea = query(app.tree, node => node.type === 'textarea')[0];
  assert.equal(textarea.props.value, '旧评论', '编辑卡应显示被点击评论的原文');
});

test('Esc 先退出当前编辑，再按才关闭预览', () => {  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterComment(app);
  clickStageAt(app, 500, 250);

  const root = nodeByClass(app.tree, 'dsc-ia-root');
  const popupKeyDown = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '批注内容')[0].props.onKeyDown;
  const escapeEvent = { key: 'Escape', stopped: false, stopPropagation() { this.stopped = true; }, preventDefault() {} };
  popupKeyDown(escapeEvent);
  assert.equal(escapeEvent.stopped, true, '输入框 Esc 不能冒泡到全局');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-popup'), undefined, '第一次 Esc 关闭编辑');
  assert.equal(mounted.events.close, 0);

  fire(root, 'onKeyDown', { key: 'Escape', target: {}, preventDefault() {}, defaultPrevented: false });
  assert.equal(mounted.events.close, 1, '第二次 Esc 才关闭预览');
});

/* ----------------------------- Viewer：多图隔离 ----------------------------- */

test('多图评论按图片隔离，切换后各自数量正确', () => {
  const module = loadModule();
  const store = module.api.createImageAnnotationStore();
  store.set('a', module.api.imageAnnotationAddComment(module.api.imageAnnotationCreateEmptyState(), { text: 'A 图批注', x: 0.2, y: 0.2 }));
  const images = [
    { key: 'a', src: 'a.png', name: 'a.png', width: 800, height: 600 },
    { key: 'b', src: 'b.png', name: 'b.png', width: 800, height: 600 }
  ];
  const mounted = mountViewer(module, { store, images });
  const app = mounted.app;
  enterComment(app);
  assert.equal(nodesByClass(app.tree, 'dsc-ia-dot').length, 1);
  assert.match(textOf(nodeByClass(app.tree, 'dsc-ia-bottom-label')), /1 条批注/);

  fire(nodeByAria(app.tree, '下一张图片'), 'onClick');
  assert.equal(nodesByClass(app.tree, 'dsc-ia-dot').length, 0, 'B 图不能串到 A 图批注');
  assert.match(textOf(nodeByClass(app.tree, 'dsc-ia-bottom-label')), /点击图像以添加评论/);

  fire(nodeByAria(app.tree, '上一张图片'), 'onClick');
  assert.equal(nodesByClass(app.tree, 'dsc-ia-dot').length, 1);
  assert.equal(store.get('a').comments.length, 1);
  assert.equal(store.get('b').comments.length, 0);
});

test('导航按钮从舞台捕获中排除：能切图且不误落点', () => {
  const module = loadModule();
  const images = [
    { key: 'a', src: 'a.png', name: 'a.png', width: 800, height: 600 },
    { key: 'b', src: 'b.png', name: 'b.png', width: 800, height: 600 }
  ];
  const mounted = mountViewer(module, { images });
  const app = mounted.app;
  enterComment(app);

  // 按钮 pointerdown 冒泡到 stage 时被排除：不捕获指针、不落点。
  const buttonTarget = { tagName: 'BUTTON', closest: selector => selector.includes('button') ? { tagName: 'BUTTON' } : null };
  fire(nodeByClass(app.tree, 'dsc-ia-stage'), 'onPointerDown', pointerEvent({ target: buttonTarget, clientX: 500, clientY: 250 }));
  fire(nodeByClass(app.tree, 'dsc-ia-stage'), 'onPointerUp', pointerEvent({ target: buttonTarget, clientX: 500, clientY: 250 }));
  assert.equal(mounted.store.get('a').comments.length, 0, '点击导航不能误落点');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-popup'), undefined);

  // 导航自身阻断 pointerdown 冒泡，并真实切换图片。
  const next = nodeByAria(app.tree, '下一张图片');
  const pointerDownEvent = { stopped: false, stopPropagation() { this.stopped = true; } };
  fire(next, 'onPointerDown', pointerDownEvent);
  assert.equal(pointerDownEvent.stopped, true, '导航按钮必须阻断 pointerdown 冒泡');
  fire(next, 'onClick');
  assert.match(textOf(nodeByClass(app.tree, 'dsc-ia-title-index')), /2 \/ 2/, '应真实切到第二张图');
  assert.equal(nodesByClass(app.tree, 'dsc-ia-dot').length, 0);
  assert.match(textOf(nodeByClass(app.tree, 'dsc-ia-bottom-label')), /点击图像以添加评论/);
});

/* ----------------------------- Viewer：手绘 ----------------------------- */

test('手绘画笔真实产生 marks，撤销/重做按钮改变状态', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterMarkup(app);

  const svg = nodeByClass(app.tree, 'dsc-ia-marks');
  assert.ok(svg, '标注模式必须有 SVG 画布');
  assert.equal(svg.props['data-tool'], 'pen');

  svgPoint(app, 'onPointerDown', 500, 250);
  svgPoint(app, 'onPointerMove', 560, 280);
  svgPoint(app, 'onPointerMove', 600, 300);
  svgPoint(app, 'onPointerUp', 600, 300);
  app.rerender();

  let state = mounted.store.get('a');
  assert.equal(state.marks.length, 1, '画笔应产生一条手绘 mark');
  assert.equal(state.marks[0].type, 'stroke');
  assert.ok(state.marks[0].points.length >= 3);
  assert.ok(state.marks[0].width > 0 && state.marks[0].width < 0.1, '笔宽按图片宽度归一化');

  const undo = nodeByAria(app.tree, '撤销');
  assert.equal(undo.props.disabled, false, '有历史时撤销可用');
  fire(undo, 'onClick');
  assert.equal(mounted.store.get('a').marks.length, 0);
  app.rerender();
  const redo = nodeByAria(app.tree, '重做');
  assert.equal(redo.props.disabled, false);
  fire(redo, 'onClick');
  assert.equal(mounted.store.get('a').marks.length, 1);
  app.rerender();
  const redoAfter = nodeByAria(app.tree, '重做');
  assert.equal(redoAfter.props.disabled, true, '重做栈清空后按钮禁用');
});

test('形状、颜色、文字、橡皮与选择删除都真实生效', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterMarkup(app);

  // 颜色：打开色板选择绿色
  fire(nodeByAria(app.tree, '标注颜色'), 'onClick');
  const green = nodeByAria(app.tree, '颜色 #22c55e');
  assert.ok(green, '颜色菜单应提供可点击的色板');
  fire(green, 'onClick');

  // 形状：选择矩形后拖出矩形
  fire(nodeByAria(app.tree, '形状'), 'onClick');
  const rectMenu = query(app.tree, node => node.type === 'button' && textOf(node) === '矩形')[0];
  assert.ok(rectMenu, '形状菜单应有矩形');
  fire(rectMenu, 'onClick');
  svgPoint(app, 'onPointerDown', 400, 200);
  svgPoint(app, 'onPointerMove', 560, 320);
  svgPoint(app, 'onPointerUp', 560, 320);
  let marks = mounted.store.get('a').marks;
  assert.equal(marks.length, 1);
  assert.equal(marks[0].type, 'rect');
  assert.equal(marks[0].color, '#22c55e', '颜色选择必须作用到新 mark');

  // 文字：T 工具点击后出现输入框并生成 text mark
  fire(nodeByAria(app.tree, '文字'), 'onClick');
  svgPoint(app, 'onPointerDown', 600, 200);
  const textInput = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '标注文字')[0];
  assert.ok(textInput, '文字工具应出现输入框');
  textInput.props.onChange({ target: { value: '手绘文字' } });
  fire(buttonByText(app.tree, '确定'), 'onClick');
  marks = mounted.store.get('a').marks;
  assert.equal(marks.length, 2);
  assert.equal(marks[1].type, 'text');
  assert.equal(marks[1].text, '手绘文字');

  // 橡皮：按对象擦除矩形
  fire(nodeByAria(app.tree, '橡皮'), 'onClick');
  const markNodes = nodesByClass(app.tree, 'dsc-ia-mark');
  assert.equal(markNodes.length, 2);
  fire(markNodes[0], 'onPointerDown', pointerEvent({ currentTarget: { setPointerCapture() {} } }));
  marks = mounted.store.get('a').marks;
  assert.equal(marks.length, 1);
  assert.equal(marks[0].type, 'text', '橡皮应删除命中的对象');

  // 选择工具：选中文字 mark 后按 Delete 删除
  fire(nodeByAria(app.tree, '选择'), 'onClick');
  const textMark = nodesByClass(app.tree, 'dsc-ia-mark')[0];
  fire(textMark, 'onPointerDown', pointerEvent({ currentTarget: { setPointerCapture() {} } }));
  const root = nodeByClass(app.tree, 'dsc-ia-root');
  fire(root, 'onKeyDown', { key: 'Delete', target: {}, preventDefault() {}, defaultPrevented: false });
  assert.equal(mounted.store.get('a').marks.length, 0);
});

test('手绘文字草稿在关闭标注、切图与关闭预览时提交，显式取消才丢弃', () => {
  const module = loadModule();
  const images = [
    { key: 'a', src: 'a.png', name: 'a.png', width: 800, height: 600 },
    { key: 'b', src: 'b.png', name: 'b.png', width: 800, height: 600 }
  ];
  const mounted = mountViewer(module, { images });
  const app = mounted.app;
  enterMarkup(app);

  // 关闭标注：提交非空文字并移除输入框。
  fire(nodeByAria(app.tree, '文字'), 'onClick');
  svgPoint(app, 'onPointerDown', 600, 200);
  let input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '标注文字')[0];
  assert.ok(input, '文字工具应出现输入框');
  input.props.onChange({ target: { value: '关闭时提交' } });
  fire(nodeByAria(app.tree, '关闭标注'), 'onClick');
  let marks = mounted.store.get('a').marks;
  assert.equal(marks.length, 1, '关闭标注必须提交非空文字');
  assert.equal(marks[0].type, 'text');
  assert.equal(marks[0].text, '关闭时提交');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-text-editor'), undefined, '关闭后不得残留文字编辑器');

  // 切图：提交到原图，不串到下一张。
  enterMarkup(app);
  fire(nodeByAria(app.tree, '文字'), 'onClick');
  svgPoint(app, 'onPointerDown', 500, 200);
  input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '标注文字')[0];
  input.props.onChange({ target: { value: '切图提交' } });
  fire(nodeByAria(app.tree, '下一张图片'), 'onClick');
  assert.equal(mounted.store.get('a').marks.length, 2, '切图前文字提交到原图');
  assert.equal(mounted.store.get('a').marks[1].text, '切图提交');
  assert.equal(mounted.store.get('b').marks.length, 0, '不能串到下一张图');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-text-editor'), undefined);

  // 显式取消：Esc 丢弃。
  fire(nodeByAria(app.tree, '文字'), 'onClick');
  svgPoint(app, 'onPointerDown', 400, 200);
  input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '标注文字')[0];
  input.props.onChange({ target: { value: '取消丢弃' } });
  input.props.onKeyDown({ key: 'Escape', stopPropagation() {}, preventDefault() {} });
  assert.equal(mounted.store.get('b').marks.length, 0, '显式取消不保存');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-text-editor'), undefined);

  // 关闭预览：先提交到当前图，再通知宿主关闭。
  fire(nodeByAria(app.tree, '文字'), 'onClick');
  svgPoint(app, 'onPointerDown', 400, 260);
  input = query(app.tree, node => node.type === 'input' && node.props['aria-label'] === '标注文字')[0];
  input.props.onChange({ target: { value: '关闭预览提交' } });
  fire(nodeByAria(app.tree, '关闭图片预览'), 'onClick');
  assert.equal(mounted.store.get('b').marks.length, 1, '关闭预览前必须提交文字草稿');
  assert.equal(mounted.store.get('b').marks[0].text, '关闭预览提交');
  assert.equal(mounted.events.close, 1);
});

/* ------------------------------ 重新打开 ------------------------------ */

test('关闭后重新打开仍在预览中显示评论点与手绘痕迹', () => {
  const module = loadModule();
  const store = module.api.createImageAnnotationStore();
  let state = module.api.imageAnnotationCreateEmptyState();
  state = module.api.imageAnnotationAddComment(state, { text: '重新打开可见', x: 0.3, y: 0.4 });
  state = module.api.imageAnnotationAddMark(state, { type: 'stroke', color: '#dc2626', width: 0.01, points: [{ x: 0.1, y: 0.1 }, { x: 0.4, y: 0.4 }] });
  store.set('a', state);

  const mounted = mountViewer(module, { store });
  const app = mounted.app;
  assert.equal(nodesByClass(app.tree, 'dsc-ia-dot').length, 1, '预览态应显示已保存的评论点');
  const marksLayer = nodeByClass(app.tree, 'dsc-ia-marks');
  assert.ok(marksLayer, '预览态应显示已保存的手绘');
  assert.equal(marksLayer.props['data-tool'], 'preview');
  assert.equal(typeof marksLayer.props.onPointerDown, 'undefined', '预览态手绘只读，不绑定绘制事件');

  // 预览中点击编号直接进入评论编辑，不丢状态。
  fire(nodesByClass(app.tree, 'dsc-ia-dot')[0], 'onClick', { stopPropagation() {} });
  assert.ok(nodeByClass(app.tree, 'dsc-ia-popup'), '预览中点击编号打开编辑卡');
  assert.ok(buttonByText(app.tree, '完成批注'), '点击编号进入评论模式');
  const textarea = query(app.tree, node => node.type === 'textarea')[0];
  assert.equal(textarea.props.value, '重新打开可见');
});

/* ------------------------------ 拼接兼容 ------------------------------ */

test('源码可拼接进 client.js 同一 factory，不产生顶层声明冲突', async () => {
  const clientSource = await readFile(resolve(root, 'src/client.js'), 'utf8');
  const merged = clientSource + '\n' + sourceText;
  assert.doesNotThrow(() => new vm.Script(merged, { filename: 'client-image-annotations-merge.js' }), '拼接后不得有重复声明或语法错误');
});

/* ----------------------------- 顶部与平移 ----------------------------- */

test('顶部缩放、适应窗口、下载与关闭按钮真实生效', () => {
  const module = loadModule();
  const downloads = [];
  const mounted = mountViewer(module, { onDownload: image => downloads.push(image) });
  const app = mounted.app;

  const zoomButton = nodeByAria(app.tree, '缩放比例');
  assert.ok(zoomButton, '顶部必须有缩放比例按钮');
  assert.match(textOf(zoomButton), /100%/);
  fire(zoomButton, 'onClick');
  const twoHundred = query(app.tree, node => node.type === 'button' && textOf(node) === '200%')[0];
  assert.ok(twoHundred, '缩放菜单应提供 200%');
  fire(twoHundred, 'onClick');
  assert.match(textOf(nodeByAria(app.tree, '缩放比例')), /200%/);

  fire(nodeByAria(app.tree, '适应窗口'), 'onClick');
  assert.match(textOf(nodeByAria(app.tree, '缩放比例')), /100%/, '适应窗口恢复 100%');

  fire(nodeByAria(app.tree, '下载图片'), 'onClick');
  assert.equal(downloads.length, 1);
  assert.equal(downloads[0].key, 'a');

  fire(nodeByAria(app.tree, '关闭图片预览'), 'onClick');
  assert.equal(mounted.events.close, 1);
});

test('拖动平移超过 8px 时不落点，图片随 pan 移动', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterComment(app);

  fire(nodeByClass(app.tree, 'dsc-ia-stage'), 'onPointerDown', pointerEvent({ clientX: 500, clientY: 250 }));
  fire(nodeByClass(app.tree, 'dsc-ia-stage'), 'onPointerMove', pointerEvent({ clientX: 540, clientY: 260 }));
  assert.equal(nodeByClass(app.tree, 'dsc-ia-popup'), undefined, '拖动过程不创建评论点');
  const canvas = nodeByClass(app.tree, 'dsc-ia-canvas');
  assert.match(canvas.props.style.transform, /translate\(40px, 10px\)/);

  fire(nodeByClass(app.tree, 'dsc-ia-stage'), 'onPointerUp', pointerEvent({ clientX: 540, clientY: 260 }));
  assert.equal(mounted.store.get('a').comments.length, 0, '拖动结束也不能落点');
});

test('笔宽/文字大小滑条范围正确，对象橡皮与选择工具不显示滑条', () => {
  const module = loadModule();
  const mounted = mountViewer(module);
  const app = mounted.app;
  enterMarkup(app);

  let slider = nodeByClass(app.tree, 'dsc-ia-size-slider');
  assert.ok(slider, '画笔必须有笔宽滑条');
  assert.equal(slider.props['aria-valuemin'], 1);
  assert.equal(slider.props['aria-valuemax'], 32);

  fire(nodeByAria(app.tree, '文字'), 'onClick');
  slider = nodeByClass(app.tree, 'dsc-ia-size-slider');
  assert.equal(slider.props['aria-valuemin'], 8, '文字大小范围 8-128');
  assert.equal(slider.props['aria-valuemax'], 128);

  fire(nodeByAria(app.tree, '形状'), 'onClick');
  slider = nodeByClass(app.tree, 'dsc-ia-size-slider');
  assert.ok(slider, '形状线宽沿用笔宽滑条');
  assert.equal(slider.props['aria-valuemin'], 1);
  assert.equal(slider.props['aria-valuemax'], 32);

  fire(nodeByAria(app.tree, '橡皮'), 'onClick');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-size-slider'), undefined, '对象橡皮没有半径语义，不得显示无效尺寸滑条');

  fire(nodeByAria(app.tree, '选择'), 'onClick');
  assert.equal(nodeByClass(app.tree, 'dsc-ia-size-slider'), undefined, '选择工具不应显示无意义的笔宽滑条');
});

test('UI 正文不出现 Image N / 百分比坐标序列化文本', () => {
  const module = loadModule();
  const store = module.api.createImageAnnotationStore();
  store.set('a', module.api.imageAnnotationAddComment(module.api.imageAnnotationCreateEmptyState(), { text: '把这里改成圆角', x: 0.25, y: 0.4 }));
  const mounted = mountViewer(module, { store });
  const app = mounted.app;
  enterComment(app);
  const text = textOf(nodeByClass(app.tree, 'dsc-ia-root'));
  assert.ok(!/Image\s+\d+/.test(text), 'UI 不得显示 Image N');
  assert.ok(!/x:\s*-?\d/.test(text), 'UI 不得显示坐标文本');
  assert.match(text, /1 条批注/);
});

/* ------------------------------ 导出行为 ------------------------------ */test('导出只有手绘 marks 合成进图片，评论绝不烧入', async () => {
  const module = loadModule();
  const { api, sandbox } = module;
  const calls = { fillText: [], strokeRect: 0, drawImage: 0, ellipse: 0 };
  const context2d = {
    save() {}, restore() {}, beginPath() {}, closePath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {},
    fillText(text) { calls.fillText.push(String(text)); },
    strokeRect() { calls.strokeRect += 1; },
    ellipse() { calls.ellipse += 1; },
    drawImage() { calls.drawImage += 1; },
    set strokeStyle(value) {}, set fillStyle(value) {}, set lineWidth(value) {}, set font(value) {},
    set lineCap(value) {}, set lineJoin(value) {}, set textBaseline(value) {}
  };
  let canvasCreated = 0;
  sandbox.document.createElement = tag => {
    if (String(tag).toLowerCase() === 'canvas') {
      canvasCreated += 1;
      return {
        width: 0,
        height: 0,
        getContext: () => context2d,
        toBlob: callback => callback({ type: 'image/png', size: 42, via: 'canvas' })
      };
    }
    return { style: {}, setAttribute() {}, appendChild() {}, removeChild() {}, click() {}, remove() {} };
  };
  sandbox.Image = class FakeImage {
    constructor() { this.naturalWidth = 200; this.naturalHeight = 100; }
    set src(value) { this._src = value; setTimeout(() => { if (typeof this.onload === 'function') this.onload(); }, 0); }
    get src() { return this._src; }
  };

  const state = {
    comments: [{ id: 'c1', text: '绝密评论', x: 0.5, y: 0.5 }],
    marks: [
      { id: 'm1', type: 'stroke', color: '#dc2626', width: 0.01, points: [{ x: 0.1, y: 0.1 }, { x: 0.4, y: 0.5 }] },
      { id: 'm2', type: 'rect', color: '#22c55e', width: 0.01, x1: 0.2, y1: 0.2, x2: 0.6, y2: 0.7 },
      { id: 'm3', type: 'ellipse', color: '#3b82f6', width: 0.01, x1: 0.3, y1: 0.3, x2: 0.7, y2: 0.8 },
      { id: 'm4', type: 'arrow', color: '#fff', width: 0.01, x1: 0.1, y1: 0.2, x2: 0.7, y2: 0.8 },
      { id: 'm5', type: 'text', color: '#fff', size: 0.05, x: 0.4, y: 0.4, text: '手绘文字' }
    ]
  };
  const blob = await api.exportImageAnnotationImage({ src: 'a.png', width: 200, height: 100 }, state);
  assert.equal(blob.type, 'image/png');
  assert.equal(calls.drawImage, 1, '必须把原图绘制到画布');
  assert.ok(calls.fillText.includes('手绘文字'), '文字 mark 必须绘制');
  assert.ok(!calls.fillText.includes('绝密评论'), '评论文字绝不能烧入图片');
  assert.ok(!calls.fillText.some(text => text.includes('绝密评论')));
  assert.equal(calls.strokeRect, 1);
  assert.equal(calls.ellipse, 1);

  // 没有手绘时直接取原图 Blob，不经过 Canvas 合成。
  sandbox.fetch = async () => ({ ok: true, blob: async () => ({ type: 'image/png', via: 'fetch' }) });
  canvasCreated = 0;
  calls.drawImage = 0;
  const original = await api.exportImageAnnotationImage({ src: 'a.png' }, { comments: state.comments, marks: [] });
  assert.equal(original.via, 'fetch');
  assert.equal(canvasCreated, 0, '没有 marks 时不应重新合成图片');
  assert.equal(calls.drawImage, 0);
});
