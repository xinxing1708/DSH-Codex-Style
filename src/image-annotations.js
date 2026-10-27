// 图片批注：图片大预览、编号点评论与手绘标注编辑器。
// 本文件由 build 拼接进 client.js 的同一 factory，复用其 React/h/hooks/createPortal；
// 不使用 JSX、ESM import/export 或新依赖。数据层、几何/格式化函数保持纯函数，
// 便于 scripts/test-image-annotations.mjs 在 VM 中直接加载本文件做功能验证。
//
// 对外接口（由宿主适配器或后续集成单接线）：
//   createImageAnnotationStore() / ImageAnnotationViewer / ImageAnnotationPill /
//   formatImageAnnotationPrompt(groups) / exportImageAnnotationImage(image, state)

/* ------------------------------- 常量 ------------------------------- */

const imageAnnotationDotSize = 30;
const imageAnnotationPopupGap = 27;
const imageAnnotationPopupMargin = 8;
const imageAnnotationPopupWidth = 294;
const imageAnnotationNewHeight = 44;
const imageAnnotationEditHeight = 120;
const imageAnnotationDragThreshold = 8;
const imageAnnotationMinZoom = 0.15;
const imageAnnotationMaxZoom = 8;
const imageAnnotationDefaultColor = '#dc2626';
const imageAnnotationColors = ['#dc2626', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#111111'];
const imageAnnotationWidthRanges = { pen: [1, 32], text: [8, 128], select: [1, 32], shape: [1, 32] };
const imageAnnotationShapeList = [
  { id: 'line', label: '线条' },
  { id: 'arrow', label: '箭头' },
  { id: 'rect', label: '矩形' },
  { id: 'ellipse', label: '椭圆' }
];
const imageAnnotationFrozenEmptyState = Object.freeze({ comments: Object.freeze([]), marks: Object.freeze([]) });

/* ----------------------------- 数据存储 ----------------------------- */

function imageAnnotationNormalizeState(value) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    ...source,
    comments: Array.isArray(source.comments) ? source.comments.filter(item => item && typeof item === 'object') : [],
    marks: Array.isArray(source.marks) ? source.marks.filter(item => item && typeof item === 'object') : [],
    markupUndo: Array.isArray(source.markupUndo) ? source.markupUndo.filter(item => Array.isArray(item)) : [],
    markupRedo: Array.isArray(source.markupRedo) ? source.markupRedo.filter(item => Array.isArray(item)) : []
  };
}

function imageAnnotationCreateEmptyState() {
  return { comments: [], marks: [], markupUndo: [], markupRedo: [] };
}

// 每张图片按宿主提供的 key 独立保存；未写过的 key 返回同一份只读空状态。
function createImageAnnotationStore() {
  const entries = new Map();
  const listeners = [];
  const notify = () => {
    for (const listener of listeners.slice()) {
      try {
        listener();
      } catch (error) {
        console.error('[codex-style] 图片批注订阅回调失败', error);
      }
    }
  };
  return {
    get(key) {
      return entries.get(key) || imageAnnotationFrozenEmptyState;
    },
    set(key, value) {
      entries.set(key, imageAnnotationNormalizeState(value));
      notify();
    },
    clear(key) {
      if (entries.delete(key)) notify();
    },
    // 胶囊叉号只清空这张图的评论，手绘 marks 由宿主决定是否随 clear 一并处理。
    clearComments(key) {
      const current = entries.get(key);
      if (!current || !current.comments.length) return;
      entries.set(key, { ...current, comments: [] });
      notify();
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      };
    }
  };
}

/* --------------------------- 坐标与几何 --------------------------- */

function imageAnnotationClamp01(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  if (number < 0) return 0;
  if (number > 1) return 1;
  return number;
}

function imageAnnotationNormalizePoint(x, y) {
  return { x: imageAnnotationClamp01(x), y: imageAnnotationClamp01(y) };
}

function imageAnnotationPointFromClient(rect, clientX, clientY) {
  const left = Number(rect && rect.left) || 0;
  const top = Number(rect && rect.top) || 0;
  const width = Number(rect && rect.width) > 0 ? Number(rect.width) : 1;
  const height = Number(rect && rect.height) > 0 ? Number(rect.height) : 1;
  return imageAnnotationNormalizePoint((Number(clientX) - left) / width, (Number(clientY) - top) / height);
}

// 按下到抬起位移超过 8 个事件坐标像素视为拖动，不落点。
function imageAnnotationPointerMoved(start, event) {
  if (!start || !event) return false;
  const dx = Number(event.clientX) - Number(start.x);
  const dy = Number(event.clientY) - Number(start.y);
  return Math.sqrt(dx * dx + dy * dy) > imageAnnotationDragThreshold;
}

// 弹层定位：与点中心间距 27px（不是点边缘 + 27），避边 8px，优先右、左，再下、上。
function imageAnnotationPlacePopup(dot, size, viewport, options) {
  const gap = options && Number.isFinite(options.gap) ? options.gap : imageAnnotationPopupGap;
  const margin = options && Number.isFinite(options.margin) ? options.margin : imageAnnotationPopupMargin;
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  const width = Math.max(0, Number(size && size.width) || 0);
  const height = Math.max(0, Number(size && size.height) || 0);
  const dotLeft = Number(dot && dot.left) || 0;
  const dotTop = Number(dot && dot.top) || 0;
  const dotWidth = Number(dot && dot.width) || 0;
  const dotHeight = Number(dot && dot.height) || 0;
  const centerX = dotLeft + dotWidth / 2;
  const centerY = dotTop + dotHeight / 2;
  const maxLeft = Math.max(margin, viewWidth - margin - width);
  const maxTop = Math.max(margin, viewHeight - margin - height);
  const clamp = (value, low, high) => Math.min(Math.max(value, low), high);
  const candidates = [
    { side: 'right', left: centerX + gap, top: centerY - height / 2 },
    { side: 'left', left: centerX - gap - width, top: centerY - height / 2 },
    { side: 'bottom', left: centerX - width / 2, top: centerY + gap },
    { side: 'top', left: centerX - width / 2, top: centerY - gap - height }
  ];
  const fits = candidate => candidate.left >= margin && candidate.left <= maxLeft && candidate.top >= margin && candidate.top <= maxTop;
  const picked = candidates.find(fits) || candidates[0];
  return {
    side: picked.side,
    left: clamp(picked.left, margin, maxLeft),
    top: clamp(picked.top, margin, maxTop)
  };
}

function imageAnnotationClampDrag(startRect, deltaX, deltaY, viewport, margin) {
  const safeMargin = Number.isFinite(margin) ? margin : imageAnnotationPopupMargin;
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  let x = Number(deltaX) || 0;
  let y = Number(deltaY) || 0;
  const left = (Number(startRect && startRect.left) || 0) + x;
  const top = (Number(startRect && startRect.top) || 0) + y;
  const width = Number(startRect && startRect.width) || 0;
  const height = Number(startRect && startRect.height) || 0;
  if (viewWidth > 0) {
    if (left < safeMargin) x += safeMargin - left;
    else if (left + width > viewWidth - safeMargin) x -= left + width - (viewWidth - safeMargin);
  }
  if (viewHeight > 0) {
    if (top < safeMargin) y += safeMargin - top;
    else if (top + height > viewHeight - safeMargin) y -= top + height - (viewHeight - safeMargin);
  }
  return { x, y };
}

/* ----------------------------- 评论操作 ----------------------------- */

let imageAnnotationIdSeed = 0;

function imageAnnotationNextId(prefix) {
  imageAnnotationIdSeed += 1;
  return String(prefix || 'item') + '-' + Date.now().toString(36) + '-' + imageAnnotationIdSeed.toString(36);
}

function imageAnnotationNormalizedText(text) {
  return typeof text === 'string' ? text.trim() : '';
}

function imageAnnotationAddComment(state, input) {
  const base = imageAnnotationNormalizeState(state);
  const text = imageAnnotationNormalizedText(input && input.text);
  if (!text) return { ...base, comments: base.comments.slice() };
  const point = imageAnnotationNormalizePoint(input && input.x, input && input.y);
  const comment = {
    id: input && input.id ? input.id : imageAnnotationNextId('comment'),
    text,
    x: point.x,
    y: point.y
  };
  return { ...base, comments: base.comments.concat(comment) };
}

function imageAnnotationUpdateComment(state, id, text) {
  const base = imageAnnotationNormalizeState(state);
  const next = imageAnnotationNormalizedText(text);
  if (!next) return { ...base, comments: base.comments.slice() };
  return { ...base, comments: base.comments.map(comment => comment.id === id ? { ...comment, text: next } : comment) };
}

function imageAnnotationRemoveComment(state, id) {
  const base = imageAnnotationNormalizeState(state);
  return { ...base, comments: base.comments.filter(comment => comment.id !== id) };
}

function imageAnnotationCommentNumber(state, id) {
  const comments = Array.isArray(state && state.comments) ? state.comments : [];
  return comments.findIndex(comment => comment.id === id) + 1;
}

/* ----------------------------- 手绘操作 ----------------------------- */

function imageAnnotationCommitMarks(state, marks) {
  const base = imageAnnotationNormalizeState(state);
  const undo = base.markupUndo.concat([base.marks]).slice(-80);
  return { ...base, marks: Array.isArray(marks) ? marks : [], markupUndo: undo, markupRedo: [] };
}

function imageAnnotationAddMark(state, mark) {
  if (!mark || typeof mark !== 'object') return imageAnnotationNormalizeState(state);
  const base = imageAnnotationNormalizeState(state);
  const nextMark = mark.id ? mark : { ...mark, id: imageAnnotationNextId('mark') };
  return imageAnnotationCommitMarks(base, base.marks.concat([nextMark]));
}

function imageAnnotationReplaceMark(state, id, patch) {
  const base = imageAnnotationNormalizeState(state);
  const marks = base.marks.map(mark => mark.id === id ? { ...mark, ...(patch || {}) } : mark);
  return imageAnnotationCommitMarks(base, marks);
}

function imageAnnotationMoveMark(state, id, deltaX, deltaY) {
  const base = imageAnnotationNormalizeState(state);
  const dx = Number(deltaX) || 0;
  const dy = Number(deltaY) || 0;
  if (!dx && !dy) return base;
  const marks = base.marks.map(mark => {
    if (mark.id !== id) return mark;
    if (mark.type === 'stroke' && Array.isArray(mark.points)) {
      return { ...mark, points: mark.points.map(point => ({ x: point.x + dx, y: point.y + dy })) };
    }
    if (mark.type === 'text') return { ...mark, x: mark.x + dx, y: mark.y + dy };
    if (typeof mark.x1 === 'number') return { ...mark, x1: mark.x1 + dx, y1: mark.y1 + dy, x2: mark.x2 + dx, y2: mark.y2 + dy };
    return mark;
  });
  return imageAnnotationCommitMarks(base, marks);
}

function imageAnnotationRemoveMark(state, id) {
  const base = imageAnnotationNormalizeState(state);
  return imageAnnotationCommitMarks(base, base.marks.filter(mark => mark.id !== id));
}

function imageAnnotationUndoMarkup(state) {
  const base = imageAnnotationNormalizeState(state);
  if (!base.markupUndo.length) return base;
  const previous = base.markupUndo[base.markupUndo.length - 1];
  return {
    ...base,
    marks: previous.slice(),
    markupUndo: base.markupUndo.slice(0, -1),
    markupRedo: base.markupRedo.concat([base.marks.slice()])
  };
}

function imageAnnotationRedoMarkup(state) {
  const base = imageAnnotationNormalizeState(state);
  if (!base.markupRedo.length) return base;
  const next = base.markupRedo[base.markupRedo.length - 1];
  return {
    ...base,
    marks: next.slice(),
    markupRedo: base.markupRedo.slice(0, -1),
    markupUndo: base.markupUndo.concat([base.marks.slice()])
  };
}

function imageAnnotationMarkBounds(mark) {
  if (!mark || typeof mark !== 'object') return null;
  if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const point of mark.points) {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y > maxY) maxY = point.y;
    }
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  }
  if (mark.type === 'text') {
    const size = Number(mark.size) || 0.03;
    return { x1: mark.x, y1: mark.y, x2: mark.x + Math.max(0.04, (String(mark.text || '').length || 1) * size * 0.55), y2: mark.y + size * 1.2 };
  }
  if (typeof mark.x1 === 'number') {
    return { x1: Math.min(mark.x1, mark.x2), y1: Math.min(mark.y1, mark.y2), x2: Math.max(mark.x1, mark.x2), y2: Math.max(mark.y1, mark.y2) };
  }
  return null;
}

/* --------------------------- 发送层格式化 --------------------------- */

function imageAnnotationPercent(value) {
  const percent = Math.round(imageAnnotationClamp01(value) * 1000) / 10;
  return String(percent);
}

// groups: [{imageNumber, name, comments:[{text,x,y}]}] -> "Image 1:\n1. (x: 25%, y: 40%) ..."
// 只供发送层使用；UI 不显示这段文字。
function formatImageAnnotationPrompt(groups) {
  const rows = [];
  const list = Array.isArray(groups) ? groups : [];
  for (let index = 0; index < list.length; index += 1) {
    const group = list[index];
    const comments = Array.isArray(group && group.comments) ? group.comments : [];
    const usable = comments.filter(comment => imageAnnotationNormalizedText(comment && comment.text));
    if (!usable.length) continue;
    const rawNumber = Number(group && group.imageNumber);
    const imageNumber = Number.isFinite(rawNumber) && rawNumber > 0 ? Math.round(rawNumber) : index + 1;
    const lines = ['Image ' + imageNumber + ':'];
    usable.forEach((comment, commentIndex) => {
      lines.push((commentIndex + 1) + '. (x: ' + imageAnnotationPercent(comment.x) + '%, y: ' + imageAnnotationPercent(comment.y) + '%) ' + imageAnnotationNormalizedText(comment.text));
    });
    rows.push(lines.join('\n'));
  }
  return rows.join('\n\n');
}

/* ----------------------------- 图片导出 ----------------------------- */

function imageAnnotationLoadImage(src) {
  return new Promise((resolve, reject) => {
    if (typeof Image !== 'function') {
      reject(new Error('当前环境不支持图片导出'));
      return;
    }
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('图片加载失败'));
    if (String(src || '').indexOf('data:') !== 0 && String(src || '').indexOf('blob:') !== 0) image.crossOrigin = 'anonymous';
    image.src = src || '';
  });
}

// 只有手绘 marks 会被合成到原图；普通点评论永远不烧进图片。
function imageAnnotationDrawMarks(context, marks, width, height) {
  if (!context || !Array.isArray(marks)) return;
  context.save();
  context.lineCap = 'round';
  context.lineJoin = 'round';
  for (const mark of marks) {
    if (!mark || typeof mark !== 'object') continue;
    const ratio = Number(mark.width) || 0;
    const lineWidth = Math.max(1, ratio * width);
    const color = typeof mark.color === 'string' && mark.color ? mark.color : imageAnnotationDefaultColor;
    if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length > 1) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.beginPath();
      mark.points.forEach((point, index) => {
        const px = point.x * width;
        const py = point.y * height;
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.stroke();
    } else if (mark.type === 'text' && mark.text) {
      const fontSize = Math.max(1, (Number(mark.size) || 0.03) * width);
      context.fillStyle = color;
      context.font = '600 ' + Math.round(fontSize) + 'px "Segoe UI", "Microsoft YaHei", sans-serif';
      context.textBaseline = 'top';
      context.fillText(String(mark.text), mark.x * width, mark.y * height);
    } else if (typeof mark.x1 === 'number' && typeof mark.x2 === 'number') {
      const x1 = mark.x1 * width, y1 = mark.y1 * height, x2 = mark.x2 * width, y2 = mark.y2 * height;
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = lineWidth;
      if (mark.type === 'rect') {
        context.strokeRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
      } else if (mark.type === 'ellipse') {
        context.beginPath();
        context.ellipse((x1 + x2) / 2, (y1 + y2) / 2, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2, 0, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        if (mark.type === 'arrow') {
          const angle = Math.atan2(y2 - y1, x2 - x1);
          const head = Math.max(8, lineWidth * 3.2);
          context.beginPath();
          context.moveTo(x2, y2);
          context.lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6));
          context.lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6));
          context.closePath();
          context.fill();
        }
      }
    }
  }
  context.restore();
}

function imageAnnotationCanvasBlob(image, marks) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') {
      reject(new Error('当前环境不支持画布导出'));
      return;
    }
    const width = Number(image && (image.naturalWidth || image.width)) || 0;
    const height = Number(image && (image.naturalHeight || image.height)) || 0;
    if (!width || !height) {
      reject(new Error('图片尺寸未知'));
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;
    if (!context) {
      reject(new Error('无法创建画布'));
      return;
    }
    context.drawImage(image, 0, 0, width, height);
    imageAnnotationDrawMarks(context, marks, width, height);
    if (typeof canvas.toBlob !== 'function') {
      reject(new Error('当前环境不支持导出 Blob'));
      return;
    }
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('图片导出失败'));
    }, 'image/png');
  });
}

function exportImageAnnotationImage(image, state) {
  const marks = Array.isArray(state && state.marks) ? state.marks : [];
  const src = image && image.src;
  if (!marks.length && typeof fetch === 'function' && src) {
    return fetch(src).then(response => {
      if (!response || (typeof response.ok === 'boolean' && !response.ok)) throw new Error('图片下载失败');
      return response.blob();
    }).catch(() => imageAnnotationLoadImage(src).then(loaded => imageAnnotationCanvasBlob(loaded, [])));
  }
  return imageAnnotationLoadImage(src).then(loaded => imageAnnotationCanvasBlob(loaded, marks));
}

/* ------------------------------- 图标 ------------------------------- */

function imageAnnotationIcon(name, size) {
  const dimension = Number(size) > 0 ? Number(size) : 20;
  const common = {
    viewBox: '0 0 24 24',
    width: dimension,
    height: dimension,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false'
  };
  const paths = {
    close: ['M6 6l12 12', 'M18 6L6 18'],
    download: ['M12 4v11', 'M7 11l5 5 5-5', 'M5 20h14'],
    fit: ['M4 9V4h5', 'M20 9V4h-5', 'M4 15v5h5', 'M20 15v5h-5'],
    chevron: ['m7 10 5 5 5-5'],
    prev: ['m15 5-7 7 7 7'],
    next: ['m9 5 7 7-7 7'],
    select: ['M5 3l14 8-6 1.4L10.5 19 5 3Z'],
    pen: ['M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z', 'M13 7l4 4'],
    text: ['M5 6V4h14v2', 'M12 4v16', 'M8 20h8'],
    eraser: ['M9 20H4l-1.5-4L14 4.5l5.5 5.5L11 18.5', 'M10 20h10'],
    undo: ['M9 14 4 9l5-5', 'M4 9h9a6 6 0 0 1 0 12h-2'],
    redo: ['m15 14 5-5-5-5', 'M20 9h-9a6 6 0 0 0 0 12h2'],
    trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13'],
    arrowUp: ['M12 19V5', 'm6 11 6-6 6 6'],
    comment: ['M4 5h16v11H9l-5 4V5Z'],
    rect: ['M4 6h16v12H4z'],
    ellipse: ['M12 5c4.4 0 8 3.1 8 7s-3.6 7-8 7-8-3.1-8-7 3.6-7 8-7Z'],
    arrow: ['M4 20 20 4', 'M20 4h-6', 'M20 4v6'],
    line: ['M4 20 20 4'],
    grip: ['M9 6h.01', 'M15 6h.01', 'M9 12h.01', 'M15 12h.01', 'M9 18h.01', 'M15 18h.01']
  };
  const shape = paths[name] || paths.comment;
  return h('svg', common, shape.map((d, index) => h('path', { key: index, d })));
}

/* --------------------------- 小工具与常量 --------------------------- */

function imageAnnotationErrorText(error) {
  return (error && error.message) || String(error || '');
}

function imageAnnotationIsTextInput(target) {
  if (!target || typeof target !== 'object') return false;
  const tag = String(target.tagName || '').toUpperCase();
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable === true;
}

function imageAnnotationViewportSize() {
  if (typeof window === 'undefined') return { width: 1280, height: 800 };
  return { width: Number(window.innerWidth) || 1280, height: Number(window.innerHeight) || 800 };
}

function imageAnnotationFitBox(natural, viewport) {
  const width = Math.max(0, Number(natural && natural.width) || 0);
  const height = Math.max(0, Number(natural && natural.height) || 0);
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  const horizontalPadding = Math.min(160, Math.max(24, viewWidth * 0.12));
  const verticalPadding = Math.min(240, Math.max(132, viewHeight * 0.22));
  const availableWidth = Math.max(48, viewWidth - horizontalPadding * 2);
  const availableHeight = Math.max(48, viewHeight - verticalPadding);
  if (!width || !height) return { width: 0, height: 0, scale: 0 };
  const scale = Math.min(availableWidth / width, availableHeight / height);
  return { width: width * scale, height: height * scale, scale };
}

function imageAnnotationMarkStrokeWidth(mark, baseWidth) {
  return Math.max(0.5, (Number(mark && mark.width) || 0.004) * Math.max(1, baseWidth));
}

/* --------------------------- 评论弹层组件 --------------------------- */

// 纯展示组件（不持有 hooks），输入焦点由 Viewer 通过 inputRef 转交。
function imageAnnotationCommentPopup(props) {
  const draft = props.draft;
  const edit = draft.kind === 'edit';
  const canSave = imageAnnotationNormalizedText(draft.text).length > 0;
  const inputProps = {
    ref: props.inputRef,
    className: 'dsc-ia-popup-input',
    value: draft.text,
    placeholder: '添加评论…',
    'aria-label': edit ? '编辑批注内容' : '批注内容',
    onChange: event => props.onChange(event.target.value),
    onKeyDown: event => {
      if (event.key !== 'Tab') event.stopPropagation();
      if (event.key === 'Escape') {
        event.preventDefault();
        props.onCancel();
        return;
      }
      if (edit) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          if (canSave) props.onSave();
        }
        return;
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (canSave) props.onSave();
      }
    }
  };
  return h('div', {
    className: 'dsc-ia-popup ' + (edit ? 'is-edit' : 'is-new') + (props.positioned ? '' : ' is-unpositioned'),
    style: props.position ? { left: props.position.left + 'px', top: props.position.top + 'px' } : undefined,
    role: 'dialog',
    'aria-label': edit ? '编辑批注' : '添加批注',
    'aria-modal': false,
    onPointerDown: event => event.stopPropagation(),
    onClick: event => event.stopPropagation()
  },
    edit
      ? h('textarea', { ...inputProps, rows: 2, className: 'dsc-ia-popup-input dsc-ia-popup-textarea' })
      : h('input', { ...inputProps, type: 'text', autoComplete: 'off', spellCheck: false }),
    edit
      ? h('div', { className: 'dsc-ia-popup-actions' },
        h('button', {
          type: 'button',
          className: 'dsc-ia-popup-trash',
          'aria-label': '删除这条批注',
          title: '删除这条批注',
          onClick: () => props.onDelete()
        }, imageAnnotationIcon('trash', 18)),
        h('div', { className: 'dsc-ia-popup-buttons' },
          h('button', { type: 'button', className: 'dsc-ia-popup-cancel', onClick: () => props.onCancel() }, '取消'),
          h('button', {
            type: 'button',
            className: 'dsc-ia-popup-save',
            disabled: !canSave,
            'aria-disabled': canSave ? undefined : 'true',
            onClick: () => { if (canSave) props.onSave(); }
          }, '保存')))
      : canSave
        ? h('button', {
          type: 'button',
          className: 'dsc-ia-popup-send',
          'aria-label': '保存这条批注',
          title: '保存这条批注',
          onClick: () => props.onSave()
        }, imageAnnotationIcon('arrowUp', 16))
        : null
  );
}

/* --------------------------- 工具条组件 --------------------------- */

function imageAnnotationMarkupToolbar(props) {
  const toolButton = (id, icon, label) => h('button', {
    key: id,
    type: 'button',
    className: 'dsc-ia-tool' + (props.tool === id ? ' is-active' : ''),
    'aria-label': label,
    title: label,
    'aria-pressed': props.tool === id,
    onClick: () => props.onTool(id)
  }, imageAnnotationIcon(icon, 20));
  const shapeMenu = props.shapeMenuOpen ? h('div', { className: 'dsc-ia-menu dsc-ia-shape-menu', role: 'menu', 'aria-label': '选择形状' },
    imageAnnotationShapeList.map(shape => h('button', {
      key: shape.id,
      type: 'button',
      role: 'menuitemradio',
      'aria-checked': props.shape === shape.id && props.tool === 'shape',
      className: 'dsc-ia-menu-item' + (props.shape === shape.id ? ' is-active' : ''),
      title: shape.label,
      onClick: () => props.onShape(shape.id)
    }, imageAnnotationIcon(shape.id, 18), h('span', null, shape.label)))) : null;
  const colorMenu = props.colorMenuOpen ? h('div', { className: 'dsc-ia-menu dsc-ia-color-menu', role: 'menu', 'aria-label': '选择标注颜色' },
    imageAnnotationColors.map(color => h('button', {
      key: color,
      type: 'button',
      role: 'menuitemradio',
      'aria-checked': props.color === color,
      'aria-label': '颜色 ' + color,
      title: color,
      className: 'dsc-ia-color-swatch' + (props.color === color ? ' is-active' : ''),
      style: { background: color },
      onClick: () => props.onColor(color)
    }))) : null;
  const shapeIcon = props.shape === 'ellipse' ? 'ellipse' : props.shape === 'arrow' ? 'arrow' : props.shape === 'line' ? 'line' : 'rect';
  return h('div', {
    className: 'dsc-ia-markup-toolbar',
    role: 'toolbar',
    'aria-label': '手绘标注工具'
  },
    h('button', {
      type: 'button',
      className: 'dsc-ia-grip',
      'data-drag-handle': 'true',
      'aria-label': '拖动标注工具条',
      title: '拖动标注工具条',
      onPointerDown: event => { event.stopPropagation(); props.onDragStart(event); }
    }, imageAnnotationIcon('grip', 16)),
    toolButton('select', 'select', '选择'),
    toolButton('pen', 'pen', '画笔'),
    toolButton('text', 'text', '文字'),
    h('div', { className: 'dsc-ia-tool-wrap' },
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool' + (props.tool === 'shape' ? ' is-active' : ''),
        'aria-label': '形状',
        title: '形状',
        'aria-pressed': props.tool === 'shape',
        'aria-expanded': !!props.shapeMenuOpen,
        onClick: () => props.onTool('shape')
      }, imageAnnotationIcon(shapeIcon, 20)),
      shapeMenu),
    h('div', { className: 'dsc-ia-tool-wrap' },
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool dsc-ia-tool-color',
        'aria-label': '标注颜色',
        title: '标注颜色',
        'aria-expanded': !!props.colorMenuOpen,
        onClick: () => props.onColorMenu()
      }, h('span', { className: 'dsc-ia-color-dot', style: { background: props.color } })),
      colorMenu),
    toolButton('eraser', 'eraser', '橡皮'),
    h('span', { className: 'dsc-ia-divider', 'aria-hidden': true }),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '撤销',
      title: '撤销',
      disabled: !props.canUndo,
      onClick: () => props.onUndo()
    }, imageAnnotationIcon('undo', 20)),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '重做',
      title: '重做',
      disabled: !props.canRedo,
      onClick: () => props.onRedo()
    }, imageAnnotationIcon('redo', 20)),
    h('span', { className: 'dsc-ia-divider', 'aria-hidden': true }),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '关闭标注',
      title: '关闭标注',
      onClick: () => props.onClose()
    }, imageAnnotationIcon('close', 20))
  );
}

function imageAnnotationSizeSlider(props) {
  const range = props.range;
  const min = range[0];
  const max = range[1];
  const value = Math.min(max, Math.max(min, Number(props.value) || min));
  const ratio = max > min ? (value - min) / (max - min) : 0;
  const sliderHeight = 192;
  const thumbSize = 16;
  return h('div', {
    className: 'dsc-ia-size-slider' + (props.dragging ? ' is-dragging' : ''),
    role: 'slider',
    tabIndex: 0,
    'aria-label': props.label || '笔宽',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    'aria-valuetext': value + 'px',
    onPointerDown: event => { event.preventDefault(); if (typeof event.currentTarget.focus === 'function') event.currentTarget.focus({ preventScroll: true }); props.onDown(event); },
    onPointerMove: props.onMove,
    onPointerUp: props.onUp,
    onPointerCancel: props.onUp,
    onKeyDown: event => {
      const step = event.shiftKey ? 5 : 1;
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') { event.preventDefault(); props.onChange(Math.min(max, value + step)); }
      else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') { event.preventDefault(); props.onChange(Math.max(min, value - step)); }
      else if (event.key === 'Home') { event.preventDefault(); props.onChange(min); }
      else if (event.key === 'End') { event.preventDefault(); props.onChange(max); }
    }
  },
    h('div', { className: 'dsc-ia-size-rail', 'aria-hidden': true }),
    h('div', {
      className: 'dsc-ia-size-thumb',
      'aria-hidden': true,
      style: { top: (sliderHeight - thumbSize / 2 - ratio * (sliderHeight - thumbSize)) + 'px' }
    })
  );
}

/* --------------------------- 图片旁胶囊 --------------------------- */

function ImageAnnotationPill(props) {
  const count = Math.max(0, Math.floor(Number(props && props.count) || 0));
  if (!count) return null;
  const onOpen = typeof props.onOpen === 'function' ? props.onOpen : null;
  const onClear = typeof props.onClear === 'function' ? props.onClear : null;
  return h('span', { className: 'dsc-ia-pill' },
    h('button', {
      type: 'button',
      className: 'dsc-ia-pill-open',
      title: '查看图片批注',
      'aria-label': '查看图片批注（' + count + ' 条）',
      onClick: event => { event.stopPropagation(); if (onOpen) onOpen(); }
    },
      imageAnnotationIcon('comment', 14),
      h('span', { className: 'dsc-ia-pill-count' }, count + ' 条批注')),
    h('button', {
      type: 'button',
      className: 'dsc-ia-pill-clear',
      title: '清除这张图片的全部批注',
      'aria-label': '清除这张图片的 ' + count + ' 条批注',
      onClick: event => { event.stopPropagation(); if (onClear) onClear(); }
    }, imageAnnotationIcon('close', 12))
  );
}

/* ----------------------------- 主编辑器 ----------------------------- */

function ImageAnnotationViewer(props) {
  const images = Array.isArray(props && props.images) ? props.images.filter(item => item && item.key !== undefined) : [];
  const initialIndex = Number.isFinite(Number(props && props.initialIndex)) ? Math.round(Number(props.initialIndex)) : 0;
  const [index, setIndex] = useState(() => Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1)));
  const [mode, setMode] = useState('preview');
  const [revision, setRevision] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState(() => imageAnnotationViewportSize());
  const [natural, setNatural] = useState(() => {
    const first = images[Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1))];
    return { width: Math.max(0, Number(first && first.width) || 0), height: Math.max(0, Number(first && first.height) || 0) };
  });
  const [panning, setPanning] = useState(false);
  const [draft, setDraft] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [commentCursor, setCommentCursor] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [markupTool, setMarkupTool] = useState('pen');
  const [markupColor, setMarkupColor] = useState(imageAnnotationDefaultColor);
  const [markupWidth, setMarkupWidth] = useState(4);
  const [markupTextSize, setMarkupTextSize] = useState(24);
  const [markupShape, setMarkupShape] = useState('rect');
  const [shapeMenuOpen, setShapeMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [selectedMarkId, setSelectedMarkId] = useState(null);
  const [drawing, setDrawing] = useState(null);
  const [markDrag, setMarkDrag] = useState(null);
  const [textDraft, setTextDraft] = useState(null);
  const [textPosition, setTextPosition] = useState(null);
  const [sliderDrag, setSliderDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const keyHandlerRef = useRef(null);
  const focusedDraftRef = useRef(null);
  const toolbarRef = useRef(null);
  const bottomRef = useRef(null);
  const markupToolbarRef = useRef(null);
  const fallbackStoreRef = useRef(null);
  if (!fallbackStoreRef.current) fallbackStoreRef.current = createImageAnnotationStore();
  const store = props && props.store && typeof props.store.get === 'function' ? props.store : fallbackStoreRef.current;
  const activeImage = images[index] || null;
  const activeKey = activeImage ? activeImage.key : undefined;
  const activeKeyRef = useRef(activeKey);
  activeKeyRef.current = activeKey;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const textDraftRef = useRef(textDraft);
  textDraftRef.current = textDraft;
  const drawingRef = useRef(drawing);
  drawingRef.current = drawing;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const panRef = useRef(pan);
  panRef.current = pan;
  const stagePointerRef = useRef(null);
  const markupPointerRef = useRef(null);
  const markDragRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderDragRef = useRef(false);
  const toolbarDragRef = useRef(null);
  const savingRef = useRef(false);
  const previousFocusRef = useRef(null);

  const state = store.get(activeKey);
  const comments = Array.isArray(state && state.comments) ? state.comments : [];
  const marks = Array.isArray(state && state.marks) ? state.marks : [];
  const canUndo = Array.isArray(state && state.markupUndo) && state.markupUndo.length > 0;
  const canRedo = Array.isArray(state && state.markupRedo) && state.markupRedo.length > 0;

  const bump = () => setRevision(value => value + 1);

  useEffect(() => {
    if (!store || typeof store.subscribe !== 'function') return undefined;
    return store.subscribe(() => bump());
  }, [store]);

  useEffect(() => {
    const handleResize = () => setViewport(imageAnnotationViewportSize());
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  useEffect(() => {
    setNatural({ width: Math.max(0, Number(activeImage && activeImage.width) || 0), height: Math.max(0, Number(activeImage && activeImage.height) || 0) });
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedMarkId(null);
    setDrawing(null);
    setTextDraft(null);
    setCommentCursor(null);
    setDraft(null);
    setPopupPosition(null);
  }, [activeKey]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof node.addEventListener !== 'function') return undefined;
    const handleWheel = event => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      setZoom(current => Math.min(imageAnnotationMaxZoom, Math.max(imageAnnotationMinZoom, current * factor)));
    };
    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, []);

  useLayoutEffect(() => {
    previousFocusRef.current = typeof document !== 'undefined' ? document.activeElement : null;
    const node = rootRef.current;
    if (node && typeof node.focus === 'function') node.focus({ preventScroll: true });
    return () => {
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === 'function' && previous.isConnected !== false) previous.focus({ preventScroll: true });
    };
  }, []);

  // 点击图片后浏览器可能把焦点移到 body；此时 root 的合成事件收不到按键。
  // 用 document 兜底处理“焦点在对话框外”的 Esc/快捷键，并把 Tab 拉回对话框。
  useEffect(() => {
    if (typeof document === 'undefined' || typeof document.addEventListener !== 'function') return undefined;
    const listener = event => {
      const root = rootRef.current;
      const inside = !!(root && typeof root.contains === 'function' && root.contains(event.target));
      if (!inside && event.key === 'Tab') {
        event.preventDefault();
        if (root && typeof root.focus === 'function') root.focus({ preventScroll: true });
        return;
      }
      if (inside) return;
      const handler = keyHandlerRef.current;
      if (typeof handler === 'function') handler(event);
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  // 弹层位置：点中心间隔 27px、避边 8px；缩放、平移、切图与窗口变化都重新定位。
  useLayoutEffect(() => {
    const target = draft || textDraft;
    if (!target) { setPopupPosition(null); setTextPosition(null); return; }
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return;
    const rect = node.getBoundingClientRect();
    const dotRect = {
      left: rect.left + target.x * rect.width - imageAnnotationDotSize / 2,
      top: rect.top + target.y * rect.height - imageAnnotationDotSize / 2,
      width: imageAnnotationDotSize,
      height: imageAnnotationDotSize
    };
    if (draft) {
      const edit = draft.kind === 'edit';
      setPopupPosition(imageAnnotationPlacePopup(dotRect, { width: imageAnnotationPopupWidth, height: edit ? imageAnnotationEditHeight : imageAnnotationNewHeight }, imageAnnotationViewportSize()));
    }
    if (textDraft) {
      setTextPosition(imageAnnotationPlacePopup(dotRect, { width: 240, height: 38 }, imageAnnotationViewportSize()));
    }
  }, [draft, textDraft, zoom, pan, index, viewport.width, viewport.height, revision]);

  // 定位就绪前弹层 visibility:hidden，focus() 不会生效；等位置写入后再聚焦一次。
  // 用草稿标识去重，文本变化重新定位不会重复聚焦或跳光标。
  useLayoutEffect(() => {
    const active = draft
      ? 'draft:' + draft.kind + ':' + (draft.kind === 'edit' ? draft.id : draft.x + ',' + draft.y)
      : textDraft
        ? 'text:' + (textDraft.id || textDraft.x + ',' + textDraft.y)
        : null;
    if (!active) {
      focusedDraftRef.current = null;
      return;
    }
    if (focusedDraftRef.current === active) return;
    if (draft && !popupPosition) return;
    if (textDraft && !textPosition) return;
    const node = inputRef.current;
    if (!node || typeof node.focus !== 'function') return;
    node.focus({ preventScroll: true });
    if (typeof node.setSelectionRange === 'function' && typeof node.value === 'string') {
      const end = node.value.length;
      node.setSelectionRange(end, end);
    }
    focusedDraftRef.current = active;
  }, [
    draft ? draft.kind + ':' + (draft.kind === 'edit' ? draft.id : draft.x + ',' + draft.y) : null,
    textDraft ? 'text:' + (textDraft.id || textDraft.x + ',' + textDraft.y) : null,
    popupPosition,
    textPosition
  ]);

  const naturalWidth = natural.width;
  const naturalHeight = natural.height;
  const fit = imageAnnotationFitBox({ width: naturalWidth, height: naturalHeight }, viewport);
  const baseWidth = fit.width;
  const baseHeight = fit.height;
  const imageName = (activeImage && (activeImage.name || activeImage.src)) || '图片';

  // 在打开草稿的同一事件里先算好位置，使弹层首帧即定位就绪，focus 才能生效。
  const measurePopupPosition = (target, isText) => {
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return null;
    const rect = node.getBoundingClientRect();
    const width = Math.max(1, Number(rect.width) || 1);
    const height = Math.max(1, Number(rect.height) || 1);
    const dotRect = {
      left: (Number(rect.left) || 0) + target.x * width - imageAnnotationDotSize / 2,
      top: (Number(rect.top) || 0) + target.y * height - imageAnnotationDotSize / 2,
      width: imageAnnotationDotSize,
      height: imageAnnotationDotSize
    };
    const size = isText
      ? { width: 240, height: 38 }
      : { width: imageAnnotationPopupWidth, height: target.kind === 'edit' ? imageAnnotationEditHeight : imageAnnotationNewHeight };
    return imageAnnotationPlacePopup(dotRect, size, imageAnnotationViewportSize());
  };

  const closeMenus = () => {
    setZoomMenuOpen(false);
    setShapeMenuOpen(false);
    setColorMenuOpen(false);
  };

  const flushDraft = () => {
    const current = draftRef.current;
    if (!current) return false;
    const key = activeKeyRef.current;
    const text = imageAnnotationNormalizedText(current.text);
    if (text) {
      if (current.kind === 'new') store.set(key, imageAnnotationAddComment(store.get(key), { text, x: current.x, y: current.y }));
      else store.set(key, imageAnnotationUpdateComment(store.get(key), current.id, text));
    }
    setDraft(null);
    draftRef.current = null;
    return true;
  };

  // 非空手绘文字草稿在切图/关闭/退出标注时提交；只有显式取消（Esc/取消按钮）才丢弃。
  const commitTextDraft = () => {
    const current = textDraftRef.current;
    if (!current) return false;
    const key = activeKeyRef.current;
    const text = imageAnnotationNormalizedText(current.text);
    if (text) {
      if (current.id) {
        store.set(key, imageAnnotationReplaceMark(store.get(key), current.id, { text }));
      } else {
        const color = current.color || markupColor;
        const size = (Number(current.size) || markupTextSize) / Math.max(1, baseWidth);
        store.set(key, imageAnnotationAddMark(store.get(key), { type: 'text', text, x: current.x, y: current.y, color, size }));
      }
    }
    setTextDraft(null);
    textDraftRef.current = null;
    setTextPosition(null);
    return true;
  };

  const openNewDraft = point => {
    commitTextDraft();
    flushDraft();
    closeMenus();
    setSelectedMarkId(null);
    const nextDraft = { kind: 'new', x: point.x, y: point.y, text: '' };
    setPopupPosition(measurePopupPosition(nextDraft));
    setDraft(nextDraft);
  };

  const openEditDraft = comment => {
    commitTextDraft();
    flushDraft();
    if (modeRef.current !== 'comment') setMode('comment');
    const nextDraft = { kind: 'edit', id: comment.id, text: comment.text, x: comment.x, y: comment.y };
    setPopupPosition(measurePopupPosition(nextDraft));
    setDraft(nextDraft);
  };

  const saveDraft = () => {
    const current = draftRef.current;
    if (!current) return;
    const text = imageAnnotationNormalizedText(current.text);
    if (!text) return;
    const key = activeKeyRef.current;
    if (current.kind === 'new') store.set(key, imageAnnotationAddComment(store.get(key), { text, x: current.x, y: current.y }));
    else store.set(key, imageAnnotationUpdateComment(store.get(key), current.id, text));
    setDraft(null);
    draftRef.current = null;
  };

  const cancelDraft = () => {
    setDraft(null);
    draftRef.current = null;
  };

  const deleteDraft = () => {
    const current = draftRef.current;
    if (current && current.kind === 'edit') store.set(activeKeyRef.current, imageAnnotationRemoveComment(store.get(activeKeyRef.current), current.id));
    setDraft(null);
    draftRef.current = null;
  };

  const requestClose = () => {
    commitTextDraft();
    flushDraft();
    if (typeof props.onClose === 'function') props.onClose();
  };

  const switchImage = nextIndex => {
    commitTextDraft();
    flushDraft();
    setIndex(nextIndex);
  };

  const enterMode = nextMode => {
    commitTextDraft();
    flushDraft();
    closeMenus();
    setSelectedMarkId(null);
    setDrawing(null);
    setDraft(null);
    setMode(nextMode);
  };

  const completeAnnotation = async () => {
    if (savingRef.current) return;
    commitTextDraft();
    flushDraft();
    const image = images[index];
    if (!image) return;
    if (typeof props.onComplete !== 'function') {
      if (typeof props.onClose === 'function') props.onClose();
      else setMode('preview');
      return;
    }
    const payload = {
      image,
      state: store.get(image.key),
      all: images.map((item, itemIndex) => ({ ...item, number: itemIndex + 1, state: store.get(item.key) }))
    };
    savingRef.current = true;
    setSaving(true);
    setError('');
    try {
      const pending = props.onComplete(payload);
      if (pending && typeof pending.then === 'function') await pending;
      savingRef.current = false;
      setSaving(false);
      if (typeof props.onClose === 'function') props.onClose();
      else setMode('preview');
    } catch (failure) {
      savingRef.current = false;
      setSaving(false);
      setError('批注保存失败：' + imageAnnotationErrorText(failure));
    }
  };

  const undoMarkup = () => store.set(activeKey, imageAnnotationUndoMarkup(store.get(activeKey)));
  const redoMarkup = () => store.set(activeKey, imageAnnotationRedoMarkup(store.get(activeKey)));
  const deleteSelectedMark = () => {
    if (!selectedMarkId) return;
    store.set(activeKey, imageAnnotationRemoveMark(store.get(activeKey), selectedMarkId));
    setSelectedMarkId(null);
  };

  const downloadImage = () => {
    if (!activeImage) return;
    if (typeof props.onDownload === 'function') { props.onDownload(activeImage); return; }
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') return;
    const link = document.createElement('a');
    link.href = activeImage.src || '';
    link.download = activeImage.name || 'image.png';
    link.rel = 'noopener';
    if (document.body && typeof document.body.appendChild === 'function') {
      document.body.appendChild(link);
      if (typeof link.click === 'function') link.click();
      if (typeof link.remove === 'function') link.remove();
      else if (typeof document.body.removeChild === 'function') document.body.removeChild(link);
    }
  };

  /* --------------------------- 指针与绘制 --------------------------- */

  const canvasPoint = event => {
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') {
      return imageAnnotationPointFromClient({ left: 0, top: 0, width: 1, height: 1 }, event.clientX, event.clientY);
    }
    return imageAnnotationPointFromClient(node.getBoundingClientRect(), event.clientX, event.clientY);
  };

  const beginStagePointer = event => {
    if (event.button !== undefined && event.button !== 0) return;
    if (modeRef.current === 'markup') return;
    // 导航等交互控件自行处理点击；若在此捕获指针，click 目标会变成 stage，按钮失效并可能误落点。
    if (event.target && typeof event.target.closest === 'function' && event.target.closest('button, [role="button"], a, input, textarea, select')) return;
    if (typeof event.preventDefault === 'function') event.preventDefault();
    closeMenus();
    const point = canvasPoint(event);
    stagePointerRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      mode: modeRef.current,
      point
    };
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略不支持捕获的环境 */ }
    }
    if (modeRef.current === 'comment') setCommentCursor(point);
  };

  const moveStagePointer = event => {
    const pointer = stagePointerRef.current;
    if (!pointer) {
      if (modeRef.current === 'comment') setCommentCursor(canvasPoint(event));
      return;
    }
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (!pointer.moved && Math.sqrt(dx * dx + dy * dy) > imageAnnotationDragThreshold) {
      pointer.moved = true;
      pointer.basePan = { x: panRef.current.x, y: panRef.current.y };
      setPanning(true);
      if (modeRef.current === 'comment') setCommentCursor(null);
    }
    if (pointer.moved) setPan({ x: pointer.basePan.x + dx, y: pointer.basePan.y + dy });
  };

  const endStagePointer = event => {
    const pointer = stagePointerRef.current;
    stagePointerRef.current = null;
    setPanning(false);
    setCommentCursor(null);
    if (!pointer) return;
    if (!pointer.moved && pointer.mode === 'comment') openNewDraft(canvasPoint(event));
  };

  const cancelStagePointer = () => {
    stagePointerRef.current = null;
    setPanning(false);
    setCommentCursor(null);
  };

  const beginMarkupPointer = event => {
    if (event.button !== undefined && event.button !== 0) return;
    if (!baseWidth || !baseHeight) return;
    const point = canvasPoint(event);
    closeMenus();
    if (markupTool === 'select') { setSelectedMarkId(null); return; }
    if (markupTool === 'text') {
      commitTextDraft();
      const nextDraft = { id: null, x: point.x, y: point.y, text: '', color: markupColor, size: markupTextSize };
      setTextPosition(measurePopupPosition(nextDraft, true));
      setTextDraft(nextDraft);
      textDraftRef.current = nextDraft;
      return;
    }
    if (markupTool === 'eraser') return;
    if (markupTool === 'pen') {
      markupPointerRef.current = { pointerId: event.pointerId, points: [point] };
      setDrawing({ kind: 'stroke', points: [point], color: markupColor, width: markupWidth });
    } else {
      markupPointerRef.current = { pointerId: event.pointerId, start: point, shape: markupShape };
      setDrawing({ kind: 'shape', shape: markupShape, x1: point.x, y1: point.y, x2: point.x, y2: point.y, color: markupColor, width: markupWidth });
    }
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveMarkupPointer = event => {
    const pointer = markupPointerRef.current;
    if (!pointer) return;
    const point = canvasPoint(event);
    const current = drawingRef.current;
    if (!current) return;
    if (current.kind === 'stroke') {
      pointer.points.push(point);
      setDrawing({ ...current, points: pointer.points.slice() });
    } else {
      setDrawing({ ...current, x2: point.x, y2: point.y });
    }
  };

  const endMarkupPointer = () => {
    const pointer = markupPointerRef.current;
    markupPointerRef.current = null;
    const current = drawingRef.current;
    setDrawing(null);
    if (!pointer || !current || !baseWidth || !baseHeight) return;
    const key = activeKeyRef.current;
    if (current.kind === 'stroke') {
      if (current.points.length < 2) return;
      store.set(key, imageAnnotationAddMark(store.get(key), {
        type: 'stroke',
        color: current.color,
        width: current.width / Math.max(1, baseWidth),
        points: current.points.map(point => ({ x: point.x, y: point.y }))
      }));
      return;
    }
    const dx = Math.abs(current.x2 - current.x1) * baseWidth;
    const dy = Math.abs(current.y2 - current.y1) * baseHeight;
    if (dx < 3 && dy < 3) return;
    store.set(key, imageAnnotationAddMark(store.get(key), {
      type: current.shape,
      color: current.color,
      width: current.width / Math.max(1, baseWidth),
      x1: current.x1,
      y1: current.y1,
      x2: current.x2,
      y2: current.y2
    }));
  };

  const beginMarkDrag = (event, mark) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.stopPropagation();
    if (markupTool === 'eraser') {
      event.preventDefault();
      store.set(activeKeyRef.current, imageAnnotationRemoveMark(store.get(activeKeyRef.current), mark.id));
      return;
    }
    if (markupTool !== 'select') return;
    event.preventDefault();
    setSelectedMarkId(mark.id);
    markDragRef.current = { id: mark.id, startX: event.clientX, startY: event.clientY, dx: 0, dy: 0 };
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveMarkDrag = event => {
    const drag = markDragRef.current;
    if (!drag || !baseWidth || !baseHeight) return;
    const width = Math.max(1, baseWidth * zoomRef.current);
    const height = Math.max(1, baseHeight * zoomRef.current);
    drag.dx = (event.clientX - drag.startX) / width;
    drag.dy = (event.clientY - drag.startY) / height;
    setMarkDrag({ id: drag.id, dx: drag.dx, dy: drag.dy });
  };

  const endMarkDrag = () => {
    const drag = markDragRef.current;
    markDragRef.current = null;
    setMarkDrag(null);
    if (!drag || (!drag.dx && !drag.dy)) return;
    store.set(activeKeyRef.current, imageAnnotationMoveMark(store.get(activeKeyRef.current), drag.id, drag.dx, drag.dy));
  };

  const openTextEditor = (mark, event) => {
    if (event) event.stopPropagation();
    if (markupTool !== 'select') return;
    commitTextDraft();
    const nextDraft = { id: mark.id, x: mark.x, y: mark.y, text: mark.text || '', color: mark.color };
    setTextPosition(measurePopupPosition(nextDraft, true));
    setTextDraft(nextDraft);
    textDraftRef.current = nextDraft;
  };

  // 确定按钮/Enter 与关闭、切图共用同一提交逻辑：非空保存，空则清除。
  const saveTextDraft = () => {
    commitTextDraft();
  };

  const cancelTextDraft = () => {
    setTextDraft(null);
    textDraftRef.current = null;
    setTextPosition(null);
  };

  /* --------------------------- 拖动工具条 --------------------------- */

  const beginToolbarDrag = event => {
    if (event.button !== undefined && event.button !== 0) return;
    const target = event.target;
    if (target && typeof target.closest === 'function') {
      const handle = target.closest('[data-drag-handle]');
      if (!handle && target.closest('button, input, textarea, [role="slider"]')) return;
    }
    event.preventDefault();
    const node = event.currentTarget;
    const container = target && typeof target.closest === 'function' ? target.closest('[data-drag-container]') : null;
    const rectNode = container || node;
    if (!rectNode || typeof rectNode.getBoundingClientRect !== 'function') return;
    toolbarDragRef.current = { startX: event.clientX, startY: event.clientY, rect: rectNode.getBoundingClientRect(), startOffset: offset };
    if (typeof node.setPointerCapture === 'function') {
      try { node.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略不支持捕获的环境 */ }
    }
  };

  const moveToolbarDrag = event => {
    const drag = toolbarDragRef.current;
    if (!drag) return;
    const next = imageAnnotationClampDrag(drag.rect, event.clientX - drag.startX, event.clientY - drag.startY, imageAnnotationViewportSize(), 8);
    setOffset({ x: drag.startOffset.x + next.x, y: drag.startOffset.y + next.y });
  };

  const endToolbarDrag = () => {
    toolbarDragRef.current = null;
  };

  /* --------------------------- 尺寸滑条 --------------------------- */

  const activeSliderValue = markupTool === 'text' ? markupTextSize : markupWidth;
  const activeSliderRange = imageAnnotationWidthRanges[markupTool] || imageAnnotationWidthRanges.pen;

  const setSliderValue = value => {
    if (markupTool === 'text') setMarkupTextSize(value);
    else setMarkupWidth(value);
  };

  const sliderValueFromEvent = event => {
    const node = sliderRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return activeSliderValue;
    const rect = node.getBoundingClientRect();
    const inner = Math.max(1, rect.height - 32);
    const ratio = Math.min(1, Math.max(0, (rect.bottom - 16 - event.clientY) / inner));
    return Math.round(activeSliderRange[0] + ratio * (activeSliderRange[1] - activeSliderRange[0]));
  };

  const beginSliderDrag = event => {
    event.preventDefault();
    sliderDragRef.current = true;
    setSliderDrag(true);
    setSliderValue(sliderValueFromEvent(event));
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveSliderDrag = event => {
    if (!sliderDragRef.current) return;
    setSliderValue(sliderValueFromEvent(event));
  };

  const endSliderDrag = () => {
    sliderDragRef.current = false;
    setSliderDrag(false);
  };

  /* --------------------------- 键盘与焦点 --------------------------- */

  const handleRootKeyDown = event => {
    if (event.defaultPrevented) return;
    if (imageAnnotationIsTextInput(event.target)) return;
    const key = event.key;
    if (key === 'Escape') {
      event.preventDefault();
      if (draftRef.current) { cancelDraft(); return; }
      if (textDraftRef.current) { cancelTextDraft(); return; }
      if (zoomMenuOpen || shapeMenuOpen || colorMenuOpen) { closeMenus(); return; }
      if (selectedMarkId) { setSelectedMarkId(null); return; }
      requestClose();
      return;
    }
    if (key === 'Tab') {
      const root = rootRef.current;
      if (!root || typeof root.querySelectorAll !== 'function') return;
      const focusables = Array.from(root.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'))
        .filter(node => !node.disabled && node.getAttribute('aria-disabled') !== 'true' && node.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = typeof document !== 'undefined' ? document.activeElement : null;
      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !root.contains(current))) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (key === 'Delete' || key === 'Backspace') {
      if (selectedMarkId) { event.preventDefault(); deleteSelectedMark(); }
      return;
    }
    if (key === '+' || key === '=') {
      event.preventDefault();
      setZoom(current => Math.min(imageAnnotationMaxZoom, current * 1.2));
      return;
    }
    if (key === '-') {
      event.preventDefault();
      setZoom(current => Math.max(imageAnnotationMinZoom, current / 1.2));
      return;
    }
    if (key === '0') {
      event.preventDefault();
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    if (images.length > 1 && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      event.preventDefault();
      const next = key === 'ArrowLeft' ? index - 1 : index + 1;
      if (next >= 0 && next < images.length) switchImage(next);
    }
  };
  keyHandlerRef.current = handleRootKeyDown;

  /* --------------------------- 渲染辅助 --------------------------- */

  const renderMarkElement = mark => {
    if (!baseWidth || !baseHeight) return null;
    const color = mark.color || imageAnnotationDefaultColor;
    const strokeWidth = imageAnnotationMarkStrokeWidth(mark, baseWidth);
    const selected = mark.id === selectedMarkId;
    const dragOffset = markDrag && markDrag.id === mark.id ? markDrag : null;
    const translate = dragOffset ? 'translate(' + dragOffset.dx * baseWidth + ' ' + dragOffset.dy * baseHeight + ')' : undefined;
    const handlers = {
      className: 'dsc-ia-mark',
      'data-mark-id': mark.id,
      onPointerDown: event => beginMarkDrag(event, mark),
      onPointerMove: moveMarkDrag,
      onPointerUp: endMarkDrag,
      onDoubleClick: event => openTextEditor(mark, event)
    };
    let shape = null;
    if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length > 1) {
      const points = mark.points.map(point => (point.x * baseWidth) + ',' + (point.y * baseHeight)).join(' ');
      shape = h('polyline', { points, fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' });
    } else if (mark.type === 'text') {
      shape = h('text', {
        x: mark.x * baseWidth,
        y: mark.y * baseHeight,
        fill: color,
        fontSize: Math.max(8, (Number(mark.size) || 0.03) * baseWidth),
        fontFamily: '"Segoe UI", "Microsoft YaHei", sans-serif',
        fontWeight: 600,
        dominantBaseline: 'hanging',
        style: { userSelect: 'none' }
      }, String(mark.text || ''));
    } else if (typeof mark.x1 === 'number') {
      const x1 = mark.x1 * baseWidth, y1 = mark.y1 * baseHeight, x2 = mark.x2 * baseWidth, y2 = mark.y2 * baseHeight;
      if (mark.type === 'rect') {
        shape = h('rect', { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), fill: 'none', stroke: color, strokeWidth });
      } else if (mark.type === 'ellipse') {
        shape = h('ellipse', { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx: Math.abs(x2 - x1) / 2, ry: Math.abs(y2 - y1) / 2, fill: 'none', stroke: color, strokeWidth });
      } else {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const head = Math.max(8, strokeWidth * 3.2);
        const points = mark.type === 'arrow'
          ? [
            String(x2) + ',' + String(y2),
            String(x2 - head * Math.cos(angle - Math.PI / 6)) + ',' + String(y2 - head * Math.sin(angle - Math.PI / 6)),
            String(x2 - head * Math.cos(angle + Math.PI / 6)) + ',' + String(y2 - head * Math.sin(angle + Math.PI / 6))
          ].join(' ')
          : null;
        shape = h('g', null,
          h('line', { x1, y1, x2, y2, stroke: color, strokeWidth, strokeLinecap: 'round' }),
          points && h('polygon', { points, fill: color, stroke: 'none' }));
      }
    }
    const bounds = selected ? imageAnnotationMarkBounds(mark) : null;
    return h('g', {
      key: mark.id,
      transform: translate,
      ...handlers
    },
      shape,
      selected && bounds
        ? h('rect', {
          className: 'dsc-ia-selection',
          x: bounds.x1 * baseWidth - 3,
          y: bounds.y1 * baseHeight - 3,
          width: Math.max(6, (bounds.x2 - bounds.x1) * baseWidth + 6),
          height: Math.max(6, (bounds.y2 - bounds.y1) * baseHeight + 6),
          fill: 'none',
          stroke: '#8bc3fe',
          strokeWidth: 1,
          strokeDasharray: '4 3',
          pointerEvents: 'none'
        })
        : null);
  };

  const renderDrawing = () => {
    if (!drawing || !baseWidth || !baseHeight) return null;
    if (drawing.kind === 'stroke') {
      const points = drawing.points.map(point => (point.x * baseWidth) + ',' + (point.y * baseHeight)).join(' ');
      return h('polyline', { points, fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, strokeLinecap: 'round', strokeLinejoin: 'round', pointerEvents: 'none' });
    }
    const x1 = drawing.x1 * baseWidth, y1 = drawing.y1 * baseHeight, x2 = drawing.x2 * baseWidth, y2 = drawing.y2 * baseHeight;
    if (drawing.shape === 'rect') return h('rect', { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, pointerEvents: 'none' });
    if (drawing.shape === 'ellipse') return h('ellipse', { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx: Math.abs(x2 - x1) / 2, ry: Math.abs(y2 - y1) / 2, fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, pointerEvents: 'none' });
    return h('line', { x1, y1, x2, y2, stroke: drawing.color, strokeWidth: drawing.width, strokeLinecap: 'round', pointerEvents: 'none' });
  };

  const dots = comments.map((comment, commentIndex) => h('button', {
    key: comment.id,
    type: 'button',
    className: 'dsc-ia-dot' + (draft && draft.kind === 'edit' && draft.id === comment.id ? ' is-active' : ''),
    style: {
      left: (comment.x * 100) + '%',
      top: (comment.y * 100) + '%',
      '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom))
    },
    title: comment.text,
    'aria-label': '第 ' + (commentIndex + 1) + ' 条批注：' + comment.text,
    onPointerDown: event => event.stopPropagation(),
    onClick: event => { event.stopPropagation(); openEditDraft(comment); }
  }, h('span', { className: 'dsc-ia-dot-label', 'aria-hidden': true }, String(commentIndex + 1))));

  // 新建评论立即在落点显示下一个编号；保存后由正式点替换，不计入已保存数量。
  const draftDot = draft && draft.kind === 'new'
    ? h('span', {
      className: 'dsc-ia-dot is-active is-draft',
      'aria-hidden': true,
      style: {
        left: (draft.x * 100) + '%',
        top: (draft.y * 100) + '%',
        '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom))
      }
    }, h('span', { className: 'dsc-ia-dot-label' }, String(comments.length + 1)))
    : null;

  const toolbar = mode === 'preview'
    ? h('div', {
      ref: toolbarRef,
      className: 'dsc-ia-toolbar',
      role: 'toolbar',
      'aria-label': '图片操作',
      'data-drag-container': 'true',
      style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
      onPointerDown: beginToolbarDrag,
      onPointerMove: moveToolbarDrag,
      onPointerUp: endToolbarDrag,
      onPointerCancel: endToolbarDrag
    },
      h('button', { type: 'button', className: 'dsc-ia-toolbar-button', title: '手绘标注', onClick: () => enterMode('markup') }, imageAnnotationIcon('pen', 18), h('span', null, '标注')),
      h('button', { type: 'button', className: 'dsc-ia-toolbar-button', title: '添加评论', onClick: () => enterMode('comment') }, imageAnnotationIcon('comment', 18), h('span', null, '添加评论')))
    : null;

  const bottomBar = mode === 'comment'
    ? h('div', {
      ref: bottomRef,
      className: 'dsc-ia-bottom',
      role: 'toolbar',
      'aria-label': '批注操作',
      'data-drag-container': 'true',
      style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
      onPointerDown: beginToolbarDrag,
      onPointerMove: moveToolbarDrag,
      onPointerUp: endToolbarDrag,
      onPointerCancel: endToolbarDrag
    },
      h('button', {
        type: 'button',
        className: 'dsc-ia-grip',
        'data-drag-handle': 'true',
        'aria-label': '拖动批注栏',
        title: '拖动批注栏'
      }, imageAnnotationIcon('grip', 16)),
      h('span', { className: 'dsc-ia-bottom-label', role: 'status' }, comments.length ? comments.length + ' 条批注' : '点击图像以添加评论'),
      h('button', {
        type: 'button',
        className: 'dsc-ia-primary',
        'aria-busy': saving ? 'true' : undefined,
        onClick: completeAnnotation
      }, saving ? '保存中…' : '完成批注'),
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool',
        'aria-label': '退出批注模式',
        title: '退出批注模式',
        onClick: () => { flushDraft(); closeMenus(); setMode('preview'); }
      }, imageAnnotationIcon('close', 18)))
    : null;

  const markupToolbar = mode === 'markup'
    ? h(React.Fragment, null,
      h('div', {
        ref: markupToolbarRef,
        className: 'dsc-ia-markup-anchor',
        'data-drag-container': 'true',
        style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
        onPointerDown: beginToolbarDrag,
        onPointerMove: moveToolbarDrag,
        onPointerUp: endToolbarDrag,
        onPointerCancel: endToolbarDrag
      },
        h(imageAnnotationMarkupToolbar, {
          tool: markupTool,
          shape: markupShape,
          color: markupColor,
          canUndo,
          canRedo,
          shapeMenuOpen,
          colorMenuOpen,
          onTool: nextTool => {
            closeMenus();
            setMarkupTool(nextTool);
            if (nextTool === 'shape') setShapeMenuOpen(true);
            setSelectedMarkId(null);
          },
          onShape: shapeId => { setMarkupShape(shapeId); setMarkupTool('shape'); setShapeMenuOpen(false); },
          onColorMenu: () => { closeMenus(); setColorMenuOpen(!colorMenuOpen); },
          onColor: color => { setMarkupColor(color); setColorMenuOpen(false); },
          onUndo: undoMarkup,
          onRedo: redoMarkup,
          onClose: () => { commitTextDraft(); closeMenus(); setSelectedMarkId(null); setDrawing(null); setMode('preview'); },
          onDragStart: beginToolbarDrag
        })),
      // 橡皮按对象擦除，没有半径语义；选择工具也没有笔宽，均不显示尺寸滑条。
      markupTool === 'select' || markupTool === 'eraser'
        ? null
        : h(imageAnnotationSizeSlider, {
          value: activeSliderValue,
          range: activeSliderRange,
          label: markupTool === 'text' ? '文字大小' : '笔宽',
          dragging: sliderDrag,
          onDown: event => { sliderRef.current = event.currentTarget; beginSliderDrag(event); },
          onMove: moveSliderDrag,
          onUp: endSliderDrag,
          onChange: value => setSliderValue(Math.min(activeSliderRange[1], Math.max(activeSliderRange[0], value)))
        }))
    : null;

  const popup = draft
    ? h(imageAnnotationCommentPopup, {
      draft,
      inputRef,
      position: popupPosition,
      positioned: !!popupPosition,
      onChange: value => setDraft(current => {
        if (!current) return current;
        const next = { ...current, text: value };
        draftRef.current = next;
        return next;
      }),
      onSave: saveDraft,
      onCancel: cancelDraft,
      onDelete: deleteDraft
    })
    : null;

  const textEditor = textDraft
    ? h('div', {
      className: 'dsc-ia-text-editor' + (textPosition ? '' : ' is-unpositioned'),
      style: textPosition ? { left: textPosition.left + 'px', top: textPosition.top + 'px' } : undefined,
      onPointerDown: event => event.stopPropagation(),
      onClick: event => event.stopPropagation()
    },
      h('input', {
        ref: inputRef,
        className: 'dsc-ia-text-input',
        value: textDraft.text,
        placeholder: '输入文字…',
        'aria-label': '标注文字',
        onChange: event => setTextDraft(current => {
          if (!current) return current;
          const next = { ...current, text: event.target.value };
          textDraftRef.current = next;
          return next;
        }),
        onKeyDown: event => {
          if (event.key !== 'Tab') event.stopPropagation();
          if (event.key === 'Escape') { event.preventDefault(); cancelTextDraft(); }
          else if (event.key === 'Enter') { event.preventDefault(); saveTextDraft(); }
        }
      }),
      h('div', { className: 'dsc-ia-text-actions' },
        h('button', { type: 'button', className: 'dsc-ia-popup-cancel', onClick: cancelTextDraft }, '取消'),
        h('button', { type: 'button', className: 'dsc-ia-popup-save', onClick: saveTextDraft, disabled: !imageAnnotationNormalizedText(textDraft.text) }, '确定')))
    : null;

  const zoomMenu = zoomMenuOpen
    ? h('div', { className: 'dsc-ia-menu dsc-ia-zoom-menu', role: 'menu', 'aria-label': '缩放比例' },
      h('button', { type: 'button', role: 'menuitem', className: 'dsc-ia-menu-item', onClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); setZoomMenuOpen(false); } }, '适应窗口'),
      [0.5, 1, 2].map(level => h('button', {
        key: level,
        type: 'button',
        role: 'menuitem',
        className: 'dsc-ia-menu-item' + (Math.abs(zoom - level) < 0.001 ? ' is-active' : ''),
        onClick: () => { setZoom(level); setZoomMenuOpen(false); }
      }, Math.round(level * 100) + '%')))
    : null;

  const stage = h('div', {
    ref: stageRef,
    className: 'dsc-ia-stage' + (panning ? ' is-panning' : ''),
    'data-mode': mode,
    style: { cursor: mode === 'comment' ? 'crosshair' : mode === 'markup' ? 'default' : panning ? 'grabbing' : 'grab' },
    onPointerDown: beginStagePointer,
    onPointerMove: moveStagePointer,
    onPointerUp: endStagePointer,
    onPointerCancel: cancelStagePointer,
    onPointerLeave: () => setCommentCursor(null)
  },
    h('div', {
      ref: canvasRef,
      className: 'dsc-ia-canvas',
      style: {
        width: baseWidth ? baseWidth + 'px' : '1px',
        height: baseHeight ? baseHeight + 'px' : '1px',
        transform: 'translate(-50%, -50%) translate(' + pan.x + 'px, ' + pan.y + 'px) scale(' + zoom + ')'
      }
    },
      h('img', {
        key: activeKey === undefined ? 'empty' : String(activeKey),
        className: 'dsc-ia-image',
        src: activeImage ? activeImage.src : undefined,
        alt: (activeImage && activeImage.name) || '图片预览',
        draggable: false,
        onLoad: event => {
          const node = event.currentTarget;
          if (node && node.naturalWidth && node.naturalHeight) setNatural({ width: node.naturalWidth, height: node.naturalHeight });
        }
      }),
      // 手绘在所有模式可见；只有标注模式绑定绘制/选择/擦除事件，其余模式只读展示。
      (mode === 'markup' || marks.length > 0)
        ? h('svg', {
          className: 'dsc-ia-marks',
          'data-tool': mode === 'markup' ? markupTool : 'preview',
          viewBox: '0 0 ' + Math.max(1, baseWidth) + ' ' + Math.max(1, baseHeight),
          preserveAspectRatio: 'none',
          ...(mode === 'markup'
            ? {
              onPointerDown: beginMarkupPointer,
              onPointerMove: moveMarkupPointer,
              onPointerUp: endMarkupPointer,
              onPointerCancel: () => { markupPointerRef.current = null; setDrawing(null); }
            }
            : {})
        }, marks.map(renderMarkElement), mode === 'markup' ? renderDrawing() : null)
        : null,
      mode !== 'markup'
        ? h('div', { className: 'dsc-ia-dots' },
          dots,
          draftDot,
          mode === 'comment' && commentCursor && !draft
            ? h('span', {
              className: 'dsc-ia-cursor-dot',
              'aria-hidden': true,
              style: { left: commentCursor.x * 100 + '%', top: commentCursor.y * 100 + '%', '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom)) }
            })
            : null)
        : null),
    images.length > 1
      ? h(React.Fragment, null,
        h('button', {
          type: 'button',
          className: 'dsc-ia-nav dsc-ia-nav-prev',
          'aria-label': '上一张图片',
          title: '上一张图片',
          disabled: index <= 0,
          onPointerDown: event => event.stopPropagation(),
          onClick: () => switchImage(index - 1)
        }, imageAnnotationIcon('prev', 20)),
        h('button', {
          type: 'button',
          className: 'dsc-ia-nav dsc-ia-nav-next',
          'aria-label': '下一张图片',
          title: '下一张图片',
          disabled: index >= images.length - 1,
          onPointerDown: event => event.stopPropagation(),
          onClick: () => switchImage(index + 1)
        }, imageAnnotationIcon('next', 20)))
      : null);

  const topBar = h('div', { className: 'dsc-ia-top' },
    h('div', { className: 'dsc-ia-title' },
      h('span', { className: 'dsc-ia-title-name' }, imageName),
      images.length > 1 ? h('span', { className: 'dsc-ia-title-index' }, (index + 1) + ' / ' + images.length) : null),
    h('div', { className: 'dsc-ia-actions' },
      h('div', { className: 'dsc-ia-zoom-wrap' },
        h('button', {
          type: 'button',
          className: 'dsc-ia-action dsc-ia-zoom-button',
          'aria-label': '缩放比例',
          'aria-expanded': !!zoomMenuOpen,
          title: '缩放比例',
          onClick: () => { setZoomMenuOpen(!zoomMenuOpen); setShapeMenuOpen(false); setColorMenuOpen(false); }
        }, Math.round(zoom * 100) + '%', imageAnnotationIcon('chevron', 14)),
        zoomMenu),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action',
        'aria-label': '适应窗口',
        title: '适应窗口',
        onClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); }
      }, imageAnnotationIcon('fit', 18)),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action',
        'aria-label': '下载图片',
        title: '下载图片',
        onClick: downloadImage
      }, imageAnnotationIcon('download', 18)),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action dsc-ia-close',
        'aria-label': '关闭图片预览',
        title: '关闭图片预览',
        onClick: requestClose
      }, imageAnnotationIcon('close', 18))));

  const body = h(React.Fragment, null,
    topBar,
    images.length === 0
      ? h('div', { className: 'dsc-ia-empty' }, '没有可预览的图片')
      : h(React.Fragment, null, stage, toolbar, bottomBar, markupToolbar, popup, textEditor));

  const tree = h('div', {
    ref: rootRef,
    className: 'dsc-ia-root',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': '图片预览与批注',
    tabIndex: -1,
    onKeyDown: handleRootKeyDown,
    onPointerDown: event => {
      if (event.target === event.currentTarget) {
        if (zoomMenuOpen) setZoomMenuOpen(false);
      }
    }
  },
    h('div', { className: 'dsc-ia-backdrop', 'aria-hidden': true }),
    body,
    error ? h('div', { className: 'dsc-ia-error', role: 'alert' }, error) : null,
    h('div', { className: 'dsc-ia-sr', role: 'status', 'aria-live': 'polite' }, saving ? '正在保存批注' : ''));

  if (typeof createPortal === 'function' && typeof document !== 'undefined' && document.body) return createPortal(tree, document.body);
  return tree;
}
