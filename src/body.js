// 可选正文呈现：只使用公开组件清单、Slot 与 data-* 锚点。
// 子路径宿主组件没有独立客户端包，主界面按它的实际 Cordis 启停装卸本效果。
// DSH 0.2.2 默认保留所有助手回复；收起过程时补齐过程自述的可见性。
// 回复行由公开 turn/kind/group-part 锚点定位，最终回答沿用宿主的最后回复边界。
function bodyCollapsedReplyCss(turn, hasAnswer) {
  const reply = `[data-chat-turn="${turn}"][data-chat-flow-kind="assistant-step"]:not([data-chat-group-part="reasoning"])`;
  const earlier = hasAnswer ? `:has(~ ${reply})` : '';
  return `body[data-dsc-codex-body] [data-chat-turn="${turn}"][data-chat-flow-kind="turn-process"]:has(.dsc-body-turn__label[aria-expanded="false"]) ~ ${reply}${earlier} { display: none; }`;
}

function bodyDuration(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return `${hours ? hours + '小时' : ''}${minutes ? minutes + '分钟' : ''}${seconds % 60}秒`;
}

function CodexTurnProcess({ node, turnProcess, useSession }) {
  const turn = node.location.kind === 'turn' || node.location.kind === 'step' ? node.location.turn : undefined;
  const sessionRunning = useSession(snapshot => snapshot.running);
  const running = turn?.status === 'open' && sessionRunning;
  const start = turn?.start?.time;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!running || !Number.isFinite(start)) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [running, start]);
  if (!turn || (!running && turn.status !== 'closed')) return null;
  const end = running ? now : turn.end?.time;
  const duration = Number.isFinite(start) && Number.isFinite(end) ? bodyDuration(Math.max(0, end - start)) : '';
  const reason = turn.end?.data?.reason?.kind;
  const stopped = reason === 'aborted' || reason === 'interrupted';
  const failed = reason === 'error';
  // 异常和中断保持原回合始终展开的语义，不隐藏失败与审批信息。
  const canCollapse = !running && !stopped && !failed && !!turnProcess?.foldable && !!turnProcess?.hasContent;
  const open = !turnProcess?.foldable || !!turnProcess?.open;
  const label = `已处理${duration ? ' ' + duration : ''}${stopped ? ' · 已停止' : failed ? ' · 出错' : ''}`;
  return h('div', { className: 'dsc-body-turn', 'data-dsc-body-running': running || undefined },
    h('span', { className: 'dsc-body-turn__status', role: 'status', 'aria-live': 'polite', 'aria-atomic': true }, running ? '正在处理' : stopped ? '已停止' : failed ? '处理出错' : '处理完成'),
    h('button', {
      type: 'button', className: 'dsc-body-turn__label', disabled: !canCollapse,
      'data-turn-process': node.data.turn,
      'data-turn-process-messages': node.data.messageCount,
      'data-turn-process-tool-calls': node.data.toolCallCount,
      'data-turn-process-subagents': node.data.subagentCount,
      'aria-expanded': canCollapse ? open : undefined,
      onClick: canCollapse ? () => turnProcess.setOpen(!open) : undefined
    }, h('span', null, label), canCollapse && h('svg', { viewBox: '0 0 16 16', width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, 'aria-hidden': true }, h('path', { d: 'm5 6 3 3 3-3' }))),
    h('div', { className: 'dsc-body-turn__divider', 'aria-hidden': true }),
    canCollapse && !open && h('style', null, bodyCollapsedReplyCss(node.data.turn, turnProcess.spec.answerStep != null)));
}

const DSC_BODY_EXPAND_CONTROL = '.dsc-body-turn__label[aria-expanded], [data-process-activity][aria-controls][aria-expanded], [data-sample="bash"][aria-expanded], [data-tool] [data-disclosure-row][aria-expanded]';

function dscBodyTurnRows(header) {
  const turn = header.closest('[data-chat-flow-kind="turn-process"][data-chat-turn]');
  if (!turn) return [];
  const rows = [];
  for (let row = turn.nextElementSibling; row && row.dataset.chatTurn === turn.dataset.chatTurn; row = row.nextElementSibling) {
    rows.push(row);
  }
  return rows;
}

function dscBodyDetails(control) {
  return control.matches('[data-sample="bash"]')
    ? control.nextElementSibling
    : control.closest('[data-disclosure-header]')?.nextElementSibling;
}

function dscBodyExpansionTargets(control) {
  if (control.matches('.dsc-body-turn__label')) return dscBodyTurnRows(control);
  if (control.hasAttribute('data-process-activity')) {
    const content = document.getElementById(control.getAttribute('aria-controls'));
    return content?.matches('[data-step-process-body]') ? [content] : [];
  }
  return [dscBodyDetails(control)].filter(Boolean);
}

function mountBodyExpansion() {
  if (typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') return () => {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map();
  const pending = new Map();
  let frame = 0;

  const stop = element => {
    active.get(element)?.cancel();
    active.delete(element);
  };
  const clear = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pending.clear();
    for (const element of active.keys()) stop(element);
  };

  const flush = () => {
    frame = 0;
    const targets = new Map();
    for (const [control, { opening, prior }] of pending) {
      if (!control.isConnected || (control.getAttribute('aria-expanded') === 'true') !== opening) continue;
      if (opening) {
        for (const element of dscBodyExpansionTargets(control)) {
          // 整轮只动画从折叠状态恢复的节点。最终答复此前可见，保持原位。
          if (prior && !prior.has(element)) continue;
          if (!element.closest('[hidden], [data-chat-motion="collapse"]')) targets.set(element, prior?.get(element));
        }
      } else {
        for (const element of dscBodyExpansionTargets(control)) stop(element);
      }
    }
    pending.clear();
    for (const element of active.keys()) {
      if (!element.isConnected || element.closest('[hidden], [data-chat-motion="collapse"]')) stop(element);
    }

    // 先统一读取展开尺寸，再启动短动画。后续每帧由浏览器采样，不接管宿主滚动。
    const boxes = [];
    for (const [element, from] of targets) {
      const style = getComputedStyle(element);
      const height = Number.parseFloat(style.height);
      if (!(height > 0)) continue;
      boxes.push({ element, height, marginTop: style.marginTop, from });
    }
    for (const { element, height, marginTop, from } of boxes) {
      stop(element);
      const animation = element.animate([
        { height: `${Math.min(from?.height ?? 0, height)}px`, marginTop: from?.marginTop ?? '0px', opacity: from?.opacity ?? 0, overflow: 'hidden' },
        { height: `${height}px`, marginTop, opacity: 1, overflow: 'hidden' }
      ], { id: 'dsc-body-expand', duration: 200, easing: 'cubic-bezier(.25,.7,.25,1)' });
      active.set(element, animation);
      animation.finished.then(() => {
        if (active.get(element) === animation) active.delete(element);
      }, () => {});
    }
  };

  const onActivate = event => {
    if (document.hidden || reduce.matches || !(event.target instanceof Element)) return;
    const control = event.target.closest(DSC_BODY_EXPAND_CONTROL);
    if (!control?.closest('[data-chat-flow]')) return;
    if (event.type === 'keydown' && (control.tagName === 'BUTTON' || event.repeat || !['Enter', ' '].includes(event.key))) return;
    const opening = control.getAttribute('aria-expanded') === 'false';
    let prior;
    if (opening && control.matches('.dsc-body-turn__label, [data-process-activity]')) {
      prior = new Map();
      for (const element of dscBodyExpansionTargets(control)) {
        if (element.dataset.chatMotion === 'collapse') {
          const style = getComputedStyle(element);
          prior.set(element, { height: Number.parseFloat(style.height) || 0, marginTop: style.marginTop, opacity: Number(style.opacity) });
        } else if (element.hasAttribute('hidden') || control.hasAttribute('data-process-activity') || getComputedStyle(element).display === 'none') {
          prior.set(element, undefined);
        }
      }
    }
    pending.set(control, { opening, prior });
    if (!frame) frame = requestAnimationFrame(flush);
  };
  document.addEventListener('click', onActivate, true);
  document.addEventListener('keydown', onActivate, true);
  document.addEventListener('visibilitychange', clear);
  reduce.addEventListener('change', clear);
  return () => {
    clear();
    document.removeEventListener('click', onActivate, true);
    document.removeEventListener('keydown', onActivate, true);
    document.removeEventListener('visibilitychange', clear);
    reduce.removeEventListener('change', clear);
  };
}

// 正文流式平滑：宿主每次到达都会把末尾段落整体重写，插件无法包裹字符，
// 所以不减少渲染，只限制“露出来”的速度——把正文容器裁到当前揭示行，再用同色
// 柔边盖住当前行光标之后的字符，并按顺序推进已收到的文本块。
const DSC_BODY_SMOOTH = {
  tailKeep: 8,      // 仅仍在增长的末尾文本单元保留的未揭示字数
  minCps: 62.5,     // 每秒最低揭示字数
  drainMs: 700,     // 积压按该时长摊平
  finishCps: 900,   // data-streaming 移除后的最低排空速度
  frameMs: 1000 / 144, // 正文揭示和布局测量的帧间预算
  holdMs: 400       // 文本停止增长超过该时长后不再保留末尾缓冲
};
// 只按公开块级标签识别 Markdown 文本块与揭示单元，不依赖宿主的哈希类名。
const DSC_BODY_MD_BLOCKS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'PRE', 'BLOCKQUOTE', 'TABLE', 'HR', 'FIGURE', 'DL']);

// 按顺序收集互不重叠的语义单元。表格、图片等非正文块不作为揭示单元，但仍会被
// 正文容器的裁剪挡住，不会绕过其前方尚未揭示的文字。
function dscBodyCollectUnits(container) {
  const units = [];
  for (const wrapper of container.children) {
    if (wrapper.nodeType !== 1) continue;
    if (DSC_BODY_MD_BLOCKS.has(wrapper.tagName)) {
      dscBodyCollectBlock(wrapper, units);
      continue;
    }
    let markdown = false;
    for (const child of wrapper.children) {
      if (DSC_BODY_MD_BLOCKS.has(child.tagName)) { markdown = true; break; }
    }
    if (!markdown) continue;
    for (const block of wrapper.children) dscBodyCollectBlock(block, units);
  }
  return units;
}

function dscBodyCollectBlock(block, units) {
  switch (block.tagName) {
    case 'P': case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6':
      units.push({ el: block, leaf: true, fade: dscBodyHasNonTextInline(block) });
      break;
    case 'PRE':
      // 代码块无法逐字裁剪，整块淡入。
      units.push({ el: block, leaf: false, fade: true });
      break;
    case 'BLOCKQUOTE':
      // 引用块以不重叠单元整体揭示，不拆到内部段落。
      units.push({ el: block, leaf: false, fade: true });
      break;
    case 'UL': case 'OL':
      if (dscBodySimpleList(block)) {
        for (const item of block.children) {
          if (item.tagName === 'LI') units.push({ el: item, leaf: true, fade: dscBodyHasNonTextInline(item) });
        }
      } else {
        units.push({ el: block, leaf: false, fade: true });
      }
      break;
    default:
      break;
  }
}

// 粗体、链接及行内代码仍由 Range 按其文字节点揭示；无法按文本定位的媒体才整块淡入。
function dscBodyHasNonTextInline(element) {
  if (element.querySelector('img,video,audio,canvas,iframe,input,button,math')) return true;
  for (const svg of element.querySelectorAll('svg')) {
    // 宿主给普通链接附加 aria-hidden 图标；它不应让整段文字绕过揭示。
    if (svg.getAttribute('aria-hidden') === 'true' && svg.closest('a')?.textContent.trim()) continue;
    return true;
  }
  return false;
}

// 列表项只含行内内容时逐项揭示；含嵌套块时整表作为一个单元，避免父子单元重叠。
function dscBodySimpleList(list) {
  if (!list.children.length) return false;
  for (const item of list.children) {
    if (item.tagName !== 'LI') return false;
    for (const child of item.children) {
      if (DSC_BODY_MD_BLOCKS.has(child.tagName)) return false;
    }
  }
  return true;
}

const DSC_BODY_REASONING_GROUP = '[data-chat-group-part="reasoning"]';
const DSC_BODY_REASONING = `${DSC_BODY_REASONING_GROUP}, [data-variant="think"]`;

// 宿主的正文和思考分组共用 AssistantMarkdown，思考摘要也有 data-streaming。
// 按宿主公开标记排除思考，然后检查它是否是带正文容器的流式根。
function dscBodyIsRoot(root) {
  if (!root || root.nodeType !== 1 || root.tagName !== 'DIV') return false;
  if (!root.hasAttribute('data-streaming')) return false;
  const body = root.firstElementChild;
  return body?.tagName === 'DIV' && !root.closest(DSC_BODY_REASONING);
}

function dscBodyNodeHasRoot(node) {
  if (!node || node.nodeType !== 1 || node.closest(DSC_BODY_REASONING)) return false;
  if (dscBodyIsRoot(node)) return true;
  for (const root of node.querySelectorAll('div[data-streaming]')) if (dscBodyIsRoot(root)) return true;
  return false;
}

// 当前单元之后是否还有元素内容（正文块或其他非正文块），用于判断是否仍在写最后一段。
function dscBodyHasFollowing(container, element) {
  let node = element;
  while (node && node !== container) {
    let sibling = node.nextElementSibling;
    while (sibling?.classList.contains('dsc-body-edge-viewport')) sibling = sibling.nextElementSibling;
    if (sibling) return true;
    node = node.parentElement;
  }
  return false;
}

function dscBodyCharRect(element, index) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  let remain = Math.max(0, Math.floor(index));
  let node;
  while ((node = walker.nextNode())) {
    if (node.length === 0) continue;
    if (remain < node.length) {
      const range = document.createRange();
      try {
        range.setStart(node, remain);
        range.setEnd(node, remain + 1);
      } catch {
        return null;
      }
      for (const rect of range.getClientRects()) {
        if (rect.width > 0.2 && rect.height > 0.2) return rect;
      }
      return null;
    }
    remain -= node.length;
  }
  return null;
}

function dscBodyInlineBounds(element, originTop) {
  const bounds = [];
  for (const inline of element.querySelectorAll('a, code, a svg[aria-hidden="true"]')) {
    // 折行链接按可见片段测量，不能用整个链接跨多行的外接矩形。
    for (const rect of inline.getClientRects()) {
      if (rect.width && rect.height) bounds.push({ top: rect.top - originTop, bottom: rect.bottom - originTop });
    }
  }
  return { element, bounds };
}

// 取正文所在滚动区实际底色；取不到时调用方降级为整块淡入（不能只裁不遮）。
function dscBodyEdgeColor(root) {
  const scroller = root.closest('[data-conversation-scroll]');
  let node = scroller || root;
  while (node) {
    const color = getComputedStyle(node).backgroundColor;
    if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') return color;
    node = node.parentElement;
  }
  return null;
}

function mountBodySmoothing() {
  if (typeof MutationObserver !== 'function' || typeof requestAnimationFrame !== 'function') return () => {};
  const states = new Map();
  const layers = new Set();
  const seenViews = new WeakMap();
  const shownRoots = new WeakSet();
  const reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let frame = 0;
  let wakeTimer = 0;
  let wakeAt = 0;
  let nextFrameAt = 0;
  let disposed = false;
  const isReduced = () => !!(reduce && reduce.matches);
  const isHidden = () => document.visibilityState === 'hidden';
  const watchedViews = new Map();
  const sizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(entries => {
    if (disposed) return;
    let resumed = false;
    let geometryChanged = false;
    for (const entry of entries) {
      const target = entry.target;
      if (watchedViews.has(target)) {
        if (!target.isConnected) { sizeObserver.unobserve(target); watchedViews.delete(target); continue; }
        const visible = !!target.getClientRects().length;
        const wasVisible = watchedViews.get(target);
        watchedViews.set(target, visible);
        if (!visible) {
          for (const state of [...states.values()]) if (state.view === target) release(state);
        } else if (!wasVisible) resumed = true;
      } else {
        for (const state of states.values()) {
          if (state.container !== target || state.width === entry.contentRect.width) continue;
          state.width = entry.contentRect.width;
          state.paintKey = null;
          geometryChanged = true;
        }
      }
    }
    if (resumed) syncStates(false, true);
    if (resumed || geometryChanged) schedule();
  }) : null;

  function watchView(view) {
    if (!view || watchedViews.has(view) || !sizeObserver) return;
    watchedViews.set(view, !!view.getClientRects().length);
    sizeObserver.observe(view);
  }

  function schedule() {
    if (frame || disposed) return;
    frame = requestAnimationFrame(step);
  }

  // 缓冲区等待新增文字时无需逐帧空转；到期后再排空末尾。
  function scheduleWake(at) {
    if (disposed || (wakeTimer && wakeAt <= at)) return;
    if (wakeTimer) clearTimeout(wakeTimer);
    wakeAt = at;
    wakeTimer = setTimeout(() => { wakeTimer = 0; wakeAt = 0; schedule(); }, Math.max(1, at - performance.now()));
  }

  function cancelWake() {
    if (wakeTimer) clearTimeout(wakeTimer);
    wakeTimer = 0;
    wakeAt = 0;
  }

  // 每个正文 root 独立持有柔边层，避免多个 root 抢用同一层遮罩。
  function ensureLayer(state) {
    if (state.layer && state.layer.isConnected) return state.layer;
    const viewport = document.createElement('div');
    viewport.className = 'dsc-body-edge-viewport';
    viewport.setAttribute('aria-hidden', 'true');
    const layer = document.createElement('div');
    layer.className = 'dsc-body-edge';
    viewport.appendChild(layer);
    // 与文字共享布局和滚动坐标；宿主在 ResizeObserver 中跟随尾部时无需追帧校准。
    state.container.appendChild(viewport);
    layers.add(viewport);
    state.viewport = viewport;
    state.layer = layer;
    // 实色由遮罩的渐变淡出（CSS），不解析颜色字符串，主题/color() 写法都能用。
    if (state.color) layer.style.backgroundColor = state.color;
    return layer;
  }

  function hideLayer(state) {
    if (state.layer && state.layer.style.opacity !== '0') state.layer.style.opacity = '0';
    if (state.viewport) state.viewport.style.display = 'none';
  }

  // 只写 max-height 与裁剪类，并保存容器原有内联值，还原时原样写回。
  function applyClip(state, height) {
    const el = state.container;
    if (!el) return;
    if (state.clipSaved === null) {
      state.clipSaved = {
        value: el.style.getPropertyValue('max-height'),
        priority: el.style.getPropertyPriority('max-height'),
        hadClass: el.classList.contains('dsc-body-smooth-clip')
      };
    }
    const value = `${Math.max(0, Math.ceil(height))}px`;
    if (state.clipValue !== value) {
      el.style.setProperty('max-height', value);
      state.clipValue = value;
    }
    if (!el.classList.contains('dsc-body-smooth-clip')) el.classList.add('dsc-body-smooth-clip');
  }

  function clearClip(state) {
    const el = state.container;
    const saved = state.clipSaved;
    state.clipSaved = null;
    state.clipValue = '';
    if (!el || !saved) return;
    if (!saved.hadClass) el.classList.remove('dsc-body-smooth-clip');
    if (saved.value) el.style.setProperty('max-height', saved.value, saved.priority || '');
    else el.style.removeProperty('max-height');
  }

  function release(state) {
    shownRoots.add(state.root);
    clearClip(state);
    hideLayer(state);
    if (state.layer) {
      state.viewport.remove();
      layers.delete(state.viewport);
      state.viewport = null;
      state.layer = null;
    }
    for (const el of state.fadedEls) el.classList.remove('dsc-body-smooth-fade');
    state.fadedEls.clear();
    if (states.get(state.root) === state) states.delete(state.root);
    if (sizeObserver && state.container && ![...states.values()].some(other => other.container === state.container)) sizeObserver.unobserve(state.container);
  }

  function releaseAll() {
    for (const state of [...states.values()]) release(state);
  }

  function paintMask(state, rect, maskLeft, origin) {
    const layer = ensureLayer(state);
    if (!layer) return;
    const viewport = state.viewport;
    const set = (style, property, value) => { if (style[property] !== value) style[property] = value; };
    set(viewport.style, 'top', `${rect.top - origin.top}px`);
    set(viewport.style, 'height', `${rect.height}px`);
    set(viewport.style, 'display', 'block');
    // 本地坐标不受上方折叠、滚动或宿主尾随影响；裁剪由祖先的 overflow 负责。
    set(layer.style, 'transform', `translateX(${maskLeft - origin.left}px)`);
    if (layer.style.opacity !== '1') layer.style.opacity = '1';
  }

  // 当前单元裁到光标所在行底部；完全揭示后柔边放在最后一个字符右侧，挡住后续新增。
  function paintClipUnit(state) {
    const el = state.container;
    const unit = state.units[state.index];
    if (!el || !unit) { paintEnd(state); return; }
    const total = unit.el.textContent.length;
    const atEnd = state.cursor >= total;
    const key = `${state.index}:${Math.floor(state.cursor)}:${total}:${atEnd}`;
    // 局部遮罩无需追踪窗口坐标；光标还在同一字符时不重复测量整段排版。
    if (state.paintKey === key) return;
    if (state.paintKey === null) state.inlineBounds = null;
    state.paintKey = key;
    const box = el.getBoundingClientRect();
    if (total === 0) {
      applyClip(state, unit.el.getBoundingClientRect().top - box.top);
      hideLayer(state);
      return;
    }
    let index = atEnd ? total - 1 : Math.floor(state.cursor);
    let rect = dscBodyCharRect(unit.el, index);
    if (!rect) {
      // 折叠空白/换行没有可测量字形，寻找同方向的可见字符，不能放开整个队列。
      const text = unit.el.textContent;
      if (atEnd) index = text.trimEnd().length - 1;
      else {
        const next = text.slice(index).search(/\S/);
        index = next < 0 ? -1 : index + next;
      }
      if (index >= 0) rect = dscBodyCharRect(unit.el, index);
    }
    if (!rect) { paintBoundary(state); return; }
    const origin = { top: box.top + el.clientTop, left: box.left + el.clientLeft };
    // 字形的 Range 不包含链接/行内代码的背景和边框；合入同一行的实际盒子。
    if (state.inlineBounds?.element !== unit.el) state.inlineBounds = dscBodyInlineBounds(unit.el, origin.top);
    const lineTop = rect.top - origin.top;
    const lineBottom = rect.bottom - origin.top;
    let top = lineTop;
    let bottom = lineBottom;
    for (const inline of state.inlineBounds.bounds) {
      if (inline.bottom <= lineTop || inline.top >= lineBottom) continue;
      top = Math.min(top, inline.top);
      bottom = Math.max(bottom, inline.bottom);
    }
    applyClip(state, bottom + el.clientTop);
    paintMask(state, { top: top + origin.top, height: bottom - top }, atEnd ? rect.right : rect.left, origin);
  }

  function paintBoundary(state) {
    const el = state.container;
    const unit = state.units[state.index];
    if (!el || !unit) { paintEnd(state); return; }
    applyClip(state, unit.el.getBoundingClientRect().top - el.getBoundingClientRect().top);
    hideLayer(state);
  }

  // 队列清空后不再裁剪；新内容到达时由 MutationObserver 先同步遮住再逐帧揭示。
  function paintEnd(state) {
    state.paintKey = null;
    if (state.clipSaved !== null) clearClip(state);
    hideLayer(state);
  }

  function paintState(state) {
    if (state.index >= state.units.length) { paintEnd(state); return; }
    const unit = state.units[state.index];
    if (state.fadeAll || unit.fade) { paintBoundary(state); return; }
    paintClipUnit(state);
  }

  // 单元只在末尾追加；节点被替换或文本缩短时按身份/包含/位置对齐，不重放历史也不整段放开。
  function refreshUnits(state, baseline) {
    state.paintKey = null;
    state.queuedLength = null;
    const container = state.container;
    const next = container ? dscBodyCollectUnits(container) : [];
    if (baseline) {
      state.units = next;
      state.index = 0;
      state.cursor = 0;
      state.seenTotal = -1;
      state.grewAt = 0;
      if (!next.length) return true;
      if (state.fadeAll) { state.index = next.length; return true; }
      const last = next.length - 1;
      if (next[last].fade) { state.index = next.length; return true; }
      state.index = last;
      state.cursor = next[last].el.textContent.length;
      state.seenTotal = state.cursor;
      return true;
    }
    const prev = state.units;
    const prevIndex = state.index;
    const prevCursor = state.cursor;
    let same = prev.length === next.length;
    if (same) {
      for (let i = 0; i < next.length; i++) {
        if (prev[i].el !== next[i].el) { same = false; break; }
      }
    }
    if (same) { state.units = next; return false; }
    let index = next.length;
    let cursor = 0;
    if (prevIndex < prev.length) {
      const current = prev[prevIndex].el;
      let found = next.findIndex(unit => unit.el === current);
      let advanceTo = prevCursor;
      if (found < 0) {
        const absorbed = next.findIndex(unit => unit.el.contains(current));
        if (absorbed >= 0) { found = absorbed; advanceTo = Number.POSITIVE_INFINITY; }
      }
      if (found < 0 && prevIndex < next.length) { found = prevIndex; advanceTo = prevCursor; }
      if (found >= 0) { index = found; cursor = advanceTo; }
    } else if (next.length) {
      const known = new Set(prev.map(unit => unit.el));
      let first = -1;
      for (let i = 0; i < next.length; i++) {
        if (!known.has(next[i].el)) { first = i; break; }
      }
      if (prev.length === 0) { index = 0; cursor = 0; }
      else if (first > 0) { index = first; cursor = 0; }
      // 整批单元被宿主重建时按已展示基线处理，不重放历史内容。
    }
    state.units = next;
    state.seenTotal = -1;
    if (index >= next.length) { state.index = next.length; state.cursor = 0; return true; }
    const unit = next[index];
    const total = unit.el.textContent.length;
    state.index = index;
    state.cursor = unit.fade ? 0 : Math.min(cursor, total);
    return true;
  }

  function adoptContainer(state, container) {
    clearClip(state);
    if (sizeObserver && state.container) sizeObserver.unobserve(state.container);
    state.container = container;
    if (state.viewport) container.appendChild(state.viewport);
    if (sizeObserver && container) sizeObserver.observe(container);
    state.clipSaved = null;
    state.clipValue = '';
    state.paintKey = null;
    state.width = null;
  }

  function createState(root, baseline) {
    const state = {
      root,
      container: root.firstElementChild,
      units: [],
      index: 0,
      cursor: 0,
      seenTotal: -1,
      last: 0,
      grewAt: 0,
      finishing: false,
      finishRate: null,
      queuedLength: null,
      view: root.closest('[data-conversation-session]'),
      fadeUntil: 0,
      color: dscBodyEdgeColor(root),
      layer: null,
      viewport: null,
      clipSaved: null,
      clipValue: '',
      paintKey: null,
      inlineBounds: null,
      width: null,
      fadedEls: new Set()
    };
    state.fadeAll = state.color === null;
    states.set(root, state);
    state.session = state.view?.getAttribute('data-conversation-session');
    watchView(state.view);
    if (sizeObserver && state.container) sizeObserver.observe(state.container);
    refreshUnits(state, baseline);
    return state;
  }

  // 与 DOM 对账：新建/丢弃状态、更新流式标记，并在结构变化时同步建立遮蔽（早于绘制）。
  function syncStates(structureChanged, baseline = false) {
    if (disposed) return;
    for (const state of [...states.values()]) {
      if (!state.root.isConnected || (state.view &&
        (state.view.getAttribute('data-conversation-session') !== state.session || !state.view.getClientRects().length))) release(state);
    }
    if (isReduced() || isHidden()) { releaseAll(); return; }
    const views = new Map();
    for (const root of document.querySelectorAll('[data-streaming]')) {
      if (!dscBodyIsRoot(root)) continue;
      const view = root.closest('[data-conversation-session]');
      if (view && !view.getClientRects().length) { shownRoots.add(root); continue; }
      const session = view?.getAttribute('data-conversation-session');
      const entering = view && seenViews.get(view) !== session;
      if (view) views.set(view, session);
      let state = states.get(root);
      if (!state) {
        // 启用/恢复/切回会话不重放；当前会话中新出现的输出从首块开始揭示。
        state = createState(root, baseline || entering || shownRoots.has(root));
        paintState(state);
        continue;
      }
      state.finishing = false;
      state.finishRate = null;
      if (!structureChanged) continue;
      const container = root.firstElementChild;
      if (container && container !== state.container) adoptContainer(state, container);
      refreshUnits(state, false);
      paintState(state);
    }
    for (const [view, session] of views) seenViews.set(view, session);
    // 空会话也建立基线，随后到达的第一批输出不能被当作历史。
    for (const view of document.querySelectorAll('[data-conversation-session]')) {
      watchView(view);
      if (view.getClientRects().length) seenViews.set(view, view.getAttribute('data-conversation-session'));
    }
    for (const state of [...states.values()]) {
      if (state.root.hasAttribute('data-streaming')) continue;
      state.finishing = true;
      if (!structureChanged || !state.root.isConnected) continue;
      const container = state.root.firstElementChild;
      if (container && container !== state.container) adoptContainer(state, container);
      refreshUnits(state, false);
      paintState(state);
    }
  }

  function advance(state, now) {
    const finishing = state.finishing;
    const delta = state.last ? Math.min(64, Math.max(0, now - state.last)) : 16;
    state.last = now;
    if (state.queuedLength === null) {
      state.queuedLength = 0;
      if (!state.fadeAll) {
        for (let i = state.index; i < state.units.length; i++) {
          const unit = state.units[i];
          if (!unit.fade) state.queuedLength += unit.el.textContent.length;
        }
      }
    }
    const catchupRate = Math.max(0, state.queuedLength - state.cursor) * 1000 / DSC_BODY_SMOOTH.drainMs;
    let rate = Math.max(DSC_BODY_SMOOTH.minCps, catchupRate);
    if (finishing) {
      // 结束后按整队剩余字数排空；补到的尾部文字仍可提高排空速度。
      state.finishRate = Math.max(state.finishRate ?? DSC_BODY_SMOOTH.finishCps, catchupRate);
      rate = state.finishRate;
    }
    let budget = rate * delta / 1000;
    let guard = 0;
    for (;;) {
      if (guard++ > 64) { paintState(state); return true; }
      if (state.index >= state.units.length) {
        if (finishing && now >= state.fadeUntil) { release(state); return false; }
        if (finishing) scheduleWake(state.fadeUntil);
        paintEnd(state);
        return false;
      }
      const unit = state.units[state.index];
      if (!unit.el.isConnected) { refreshUnits(state, false); continue; }
      // 代码块和无法按文字定位的媒体淡入一次后推进队列。
      if (state.fadeAll || unit.fade) {
        if (!state.fadedEls.has(unit.el)) {
          if (!unit.el.classList.contains('dsc-body-smooth-fade')) {
            state.fadedEls.add(unit.el);
            unit.el.classList.add('dsc-body-smooth-fade');
            state.fadeUntil = Math.max(state.fadeUntil, now + 200);
          }
        }
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      const total = unit.el.textContent.length;
      // 文本被宿主缩短时先夹紧进度，避免 cursor 越界后把整段内容一次放开。
      if (state.cursor > total) state.cursor = total;
      if (total > state.seenTotal) state.grewAt = now;
      state.seenTotal = total;
      const last = state.index === state.units.length - 1;
      // 只有“之后没有任何内容”的末段才保留末尾缓冲；其后还有块时视为已冻结，继续摊平。
      const tail = last && !dscBodyHasFollowing(state.container, unit.el);
      const live = tail && !finishing && now - state.grewAt <= DSC_BODY_SMOOTH.holdMs;
      const backlog = total - state.cursor;
      const available = live ? backlog - DSC_BODY_SMOOTH.tailKeep : backlog;
      if (available > 0.01) {
        const revealed = Math.min(available, budget);
        state.cursor += revealed;
        budget -= revealed;
      }
      if (state.cursor < total - 0.01) {
        paintClipUnit(state);
        if (live && total - state.cursor <= DSC_BODY_SMOOTH.tailKeep) {
          scheduleWake(state.grewAt + DSC_BODY_SMOOTH.holdMs + 1);
          return false;
        }
        return true;
      }
      state.cursor = total;
      if (finishing || !last) {
        if (state.queuedLength !== null) state.queuedLength -= total;
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      if (tail) {
        if (live) {
          paintClipUnit(state);
          scheduleWake(state.grewAt + DSC_BODY_SMOOTH.holdMs + 1);
          return false;
        }
        paintEnd(state);
        return false;
      }
      paintEnd(state);
      return false;
    }
  }

  function step(timestamp) {
    frame = 0;
    if (disposed) return;
    if (isReduced() || isHidden()) { releaseAll(); return; }
    const now = typeof timestamp === 'number' && Number.isFinite(timestamp) ? timestamp : performance.now();
    if (!states.size) return;
    // 保留到期点的相位，让 240 Hz 等刷新率也能按 144 Hz 的预算推进。
    if (now + 0.5 < nextFrameAt) { schedule(); return; }
    const { frameMs } = DSC_BODY_SMOOTH;
    nextFrameAt += frameMs;
    if (nextFrameAt <= now) nextFrameAt = now + frameMs;
    let needsFrame = false;
    for (const state of [...states.values()]) {
      if (!state.root.isConnected || (state.view && state.view.getAttribute('data-conversation-session') !== state.session)) {
        release(state);
        continue;
      }
      if (advance(state, now)) needsFrame = true;
    }
    if (needsFrame) schedule();
  }

  function ownMutation(record) {
    let own = false;
    for (const node of record.addedNodes) { if (!layers.has(node)) return false; own = true; }
    for (const node of record.removedNodes) { if (!layers.has(node)) return false; own = true; }
    return own;
  }

  function meaningful(record) {
    for (const node of record.addedNodes) {
      if (node.nodeType === 1 && (node.hasAttribute('data-conversation-session') || node.querySelector('[data-conversation-session]'))) return true;
    }
    for (const node of record.addedNodes) if (dscBodyNodeHasRoot(node)) return true;
    for (const node of record.removedNodes) if (dscBodyNodeHasRoot(node)) return true;
    return false;
  }

  // 样式与 class 不在观察范围，避免自己写入的变化触发新一轮揭示。
  const observer = new MutationObserver(records => {
    if (disposed) return;
    let elementsRemoved = false;
    let structure = false;
    let streaming = false;
    let textChanged = false;
    let themeChanged = false;
    let geometryChanged = false;
    const dirty = new Map();
    for (const record of records) {
      const target = record.target;
      const element = target.nodeType === 1 ? target : target.parentElement;
      if (element?.closest(DSC_BODY_REASONING)) continue;
      if (record.type === 'attributes') {
        if (record.attributeName === 'data-ds-dark-theme') { themeChanged ||= record.target === document.body; continue; }
        if (record.attributeName === 'hidden') {
          for (const state of states.values()) {
            if (!state.view?.contains(record.target)) continue;
            state.paintKey = null;
            if (state.clipSaved !== null) geometryChanged = true;
          }
          continue;
        }
        if (record.attributeName === 'data-conversation-session') structure = true;
        else if (states.has(record.target) || dscBodyIsRoot(record.target)) streaming = true;
        continue;
      }
      if (record.type === 'childList' && !ownMutation(record)) {
        let local = false;
        // 宿主以 textContent 替换文本节点；只有元素增删才会改变 Markdown 单元。
        // 普通 token 到达复用现有队列，避免重扫已完成的段落、列表和媒体。
        const removed = Array.from(record.removedNodes).some(node => node.nodeType === 1);
        elementsRemoved ||= removed;
        const elementsChanged = removed || Array.from(record.addedNodes).some(node => node.nodeType === 1);
        for (const state of states.values()) {
          if (state.root.isConnected && state.root.contains(record.target)) {
            state.paintKey = null;
            state.queuedLength = null;
            dirty.set(state, dirty.get(state) || elementsChanged);
            local = true;
          }
        }
        if (local) {
          // 消息内普通更新只刷新所属 root；新嵌套流仍需发现。
          for (const node of record.addedNodes) if (dscBodyNodeHasRoot(node)) structure = true;
          for (const node of record.removedNodes) if (dscBodyNodeHasRoot(node)) structure = true;
        } else if (meaningful(record)) structure = true;
      }
      if (record.type === 'characterData' && states.size > 0) {
        // 裁剪已撤掉的尾段重新增长时，先同步遮住新增字符，避免先完整绘制一帧。
        for (const state of states.values()) {
          if (!state.root.contains(target)) continue;
          state.paintKey = null;
          state.queuedLength = null;
          textChanged = true;
          if (state.clipSaved !== null) continue;
          const current = state.units[state.index];
          if (current && current.el.contains(target)) paintState(state);
        }
      }
    }
    if (sizeObserver && elementsRemoved) {
      for (const view of watchedViews.keys()) {
        if (!view.isConnected) { sizeObserver.unobserve(view); watchedViews.delete(view); }
      }
    }
    if (themeChanged) {
      for (const state of states.values()) {
        state.color = dscBodyEdgeColor(state.root);
        state.paintKey = null;
        state.queuedLength = null;
        state.fadeAll = state.color === null;
        if (state.layer && state.color) state.layer.style.backgroundColor = state.color;
      }
    }
    if (structure) syncStates(true);
    else {
      if (streaming) syncStates(false);
      for (const [state, elementsChanged] of dirty) {
        if (states.get(state.root) !== state) continue;
        const container = state.root.firstElementChild;
        if (container && container !== state.container) adoptContainer(state, container);
        if (elementsChanged) refreshUnits(state, false);
        // 普通文字增量沿用当前裁剪与柔边，留到下一次动画推进一起重新定位。
        if (elementsChanged || state.clipSaved === null) paintState(state);
      }
    }
    if (!structure && !streaming && !dirty.size && !textChanged && !themeChanged && !geometryChanged) return;
    schedule();
  });

  const onVisibility = () => {
    if (isHidden()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      cancelWake();
      return;
    }
    syncStates(false, true);
    schedule();
  };
  const onReduce = () => {
    if (isReduced()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      cancelWake();
      return;
    }
    syncStates(false, true);
    schedule();
  };
  const onGeometry = () => {
    for (const state of states.values()) {
      state.paintKey = null;
    }
    if (states.size) schedule();
  };
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['data-streaming', 'data-conversation-session', 'data-ds-dark-theme', 'hidden'] });
  document.addEventListener('visibilitychange', onVisibility);
  if (reduce && reduce.addEventListener) reduce.addEventListener('change', onReduce);
  window.addEventListener('resize', onGeometry);
  syncStates(false, true);
  schedule();

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    cancelWake();
    observer.disconnect();
    if (sizeObserver) sizeObserver.disconnect();
    watchedViews.clear();
    document.removeEventListener('visibilitychange', onVisibility);
    if (reduce && reduce.removeEventListener) reduce.removeEventListener('change', onReduce);
    window.removeEventListener('resize', onGeometry);
    releaseAll();
  };
}

const DSC_BODY_TOOL_FLOW = '[data-chat-flow]:not([data-step-process-content])';
const DSC_BODY_TOOL_ACTIVITY = '[data-process-activity]:not([data-process-activity="thinking"])';
const DSC_BODY_TOOL_ROW = ':is([data-tool], [data-sample="bash"])';
const DSC_BODY_TOOL_LABEL = `[data-tool] [data-disclosure-row] > [data-shimmer], [data-sample="bash"] > [data-shimmer], ${DSC_BODY_TOOL_ACTIVITY} > [data-shimmer]`;
const DSC_BODY_TOOL_INTRO = 'data-dsc-body-tool-intro';
const DSC_BODY_TOOL_EXCLUDED = '[data-chat-flow-kind="assistant-step"], [data-streaming], [data-shimmer] > span';

function dscBodyGroupCall(ctx, session, groupKey) {
  const binding = session && ctx?.get?.('sessions')?.binding(session);
  const conversation = binding && ctx.get('uiConversation')?.binding(binding);
  const group = conversation?.snapshot.getSnapshot()?.views.grouped('chat')?.groupSource(groupKey)?.getSnapshot();
  const summary = group?.data.summary;
  if (!summary?.running || group.data.closed) return;
  const nodes = conversation.target('chat').getSnapshot()?.nodes;
  if (!nodes) return;
  let latest;
  const visit = tool => {
    if (!('kind' in tool) && (!latest || tool.time >= latest.time)) latest = tool;
    for (const child of tool.subCalls) visit(child);
  };
  // 组头展示的是宿主工具树里时间最近的活跃调用，DOM 标题自身没有调用 ID。
  for (const member of group.members) {
    const node = nodes.get(member.key);
    if (node?.kind === 'tool-call') visit(node.data.root);
  }
  if (!latest) return;
  const t = ctx.get('locale')?.bind('chat');
  const title = t?.(`message.stepProcess.${summary.preparing ? 'prepare.' : ''}${summary.running}`);
  const detail = summary.runningDetail;
  return { key: `call:${latest.callId}`, activity: summary.running,
    title, fullTitle: title && detail ? title + t('message.turnProcess.separator') + detail : title };
}

function mountBodyToolEntrance(ctx) {
  if (typeof MutationObserver !== 'function') return () => {};
  const flows = new WeakMap();
  const decorated = new Map();
  const pending = new Map();
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  function clear(label) {
    label.removeAttribute(DSC_BODY_TOOL_INTRO);
    decorated.delete(label);
  }

  function clearAll() {
    for (const label of decorated.keys()) clear(label);
    for (const group of pending.keys()) unwatch(group);
  }

  function onAnimation(event) {
    const label = event.target;
    if (event.animationName !== 'dsc-body-tool-entrance' || !decorated.has(label) ||
      label.getAttribute(DSC_BODY_TOOL_INTRO) !== 'entering') return;
    // 复用的组头可能在上一个动画结束事件派发前已开始播放下一次。
    if (label.getAnimations().some(animation => animation.animationName === event.animationName && animation.playState === 'running')) return;
    if (event.type === 'animationend' && label.matches(DSC_BODY_TOOL_LABEL)) label.setAttribute(DSC_BODY_TOOL_INTRO, 'shown');
    else clear(label);
  }

  function play(label, key) {
    if (reduce?.matches || document.visibilityState === 'hidden') return;
    if (label.getAttribute(DSC_BODY_TOOL_INTRO) === 'entering') {
      for (const animation of label.getAnimations({ subtree: true })) {
        if (animation.animationName !== 'dsc-body-tool-entrance') continue;
        animation.currentTime = 0;
        animation.play();
      }
    }
    decorated.set(label, key);
    label.setAttribute(DSC_BODY_TOOL_INTRO, 'entering');
  }

  function hidden(label) {
    return label.closest('[hidden], [aria-hidden="true"], [inert]') || !label.getClientRects().length;
  }

  function registerRow(label, seen, baseline) {
    const row = label.closest(DSC_BODY_TOOL_ROW);
    const seat = row?.closest('[data-chat-call-id], [data-chat-node-key]');
    if (!seat || !row.matches('[data-state="preparing"], [data-state="running"]')) return;
    const key = seat.hasAttribute('data-chat-call-id') ? `call:${seat.dataset.chatCallId}` : `node:${seat.dataset.chatNodeKey}`;
    if (seen.has(key) || (!baseline && hidden(label))) return;
    seen.add(key);
    if (!baseline) play(label, key);
  }

  function unwatch(group) {
    pending.get(group)?.disconnect();
    pending.delete(group);
  }

  function registerGroup(group, state, baseline = false) {
    const titleRow = group.querySelector(':scope > :first-child > [data-process-activity]');
    const label = titleRow?.querySelector(':scope > [data-shimmer]');
    if (!label || (!baseline && (titleRow.getAttribute('aria-expanded') === 'true' || hidden(label)))) {
      unwatch(group);
      return;
    }
    const call = dscBodyGroupCall(ctx, state.session, group.dataset.chatGroupKey);
    if (!call) {
      unwatch(group);
      return;
    }
    if (decorated.get(label) === call.key || (state.seen.has(call.key) && !decorated.has(label))) {
      unwatch(group);
      return;
    }
    // rc.5 会暂留旧标题。只在这段等待期观察组头文字，普通流式内容无需额外观察。
    const primary = label.firstElementChild?.textContent;
    if (!baseline && (titleRow.dataset.processActivity !== call.activity || (call.title &&
      primary !== call.title && primary !== call.fullTitle))) {
      if (!pending.has(group)) {
        const watcher = new MutationObserver(() => registerGroup(group, state));
        watcher.observe(titleRow, { subtree: true, childList: true, characterData: true });
        pending.set(group, watcher);
      }
      return;
    }
    unwatch(group);
    if (state.seen.has(call.key)) {
      clear(label);
      return;
    }
    state.seen.add(call.key);
    if (!baseline) play(label, call.key);
  }

  function getFlow(flow) {
    const session = flow.closest('[data-conversation-session]')?.getAttribute('data-conversation-session');
    const previous = flows.get(flow);
    if (previous && previous.session === session) return previous;
    if (previous) {
      for (const label of decorated.keys()) if (label.closest(DSC_BODY_TOOL_FLOW) === flow) clear(label);
      for (const group of pending.keys()) if (group.closest(DSC_BODY_TOOL_FLOW) === flow) unwatch(group);
    }
    const state = { session, seen: new Set() };
    flows.set(flow, state);
    for (const label of flow.querySelectorAll(DSC_BODY_TOOL_LABEL)) registerRow(label, state.seen, true);
    for (const group of flow.querySelectorAll('[data-chat-group-key]')) registerGroup(group, state, true);
    return state;
  }

  for (const flow of document.querySelectorAll(DSC_BODY_TOOL_FLOW)) getFlow(flow);
  const observer = new MutationObserver(records => {
    const candidates = new Set();
    const groups = new Set();
    let checkDecorated = false;
    for (const record of records) {
      checkDecorated ||= record.removedNodes.length > 0 || record.type === 'attributes';
      if (record.type === 'attributes') {
        if (record.attributeName === 'data-conversation-session') {
          if (record.target.matches(DSC_BODY_TOOL_FLOW)) getFlow(record.target);
          for (const flow of record.target.querySelectorAll(DSC_BODY_TOOL_FLOW)) getFlow(flow);
          continue;
        }
        const group = record.target.closest('[data-chat-group-key]');
        if (group && (record.target.matches('[data-process-activity], [data-shimmer]') || record.target.matches(DSC_BODY_TOOL_ROW))) groups.add(group);
        const label = record.attributeName === 'data-shimmer' ? record.target
          : record.attributeName === 'data-state' && record.target.matches(DSC_BODY_TOOL_ROW) ? record.target.querySelector(DSC_BODY_TOOL_LABEL) : null;
        if (label?.matches(DSC_BODY_TOOL_LABEL)) candidates.add(label);
        continue;
      }
      if (!record.addedNodes.length || record.target.closest?.(DSC_BODY_TOOL_EXCLUDED)) continue;
      const parentFlow = record.target.closest?.(DSC_BODY_TOOL_FLOW);
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches(DSC_BODY_TOOL_FLOW)) { getFlow(node); continue; }
        if (!parentFlow) {
          for (const flow of node.querySelectorAll(DSC_BODY_TOOL_FLOW)) getFlow(flow);
          continue;
        }
        if (node.matches('[data-chat-call-id]') || node.querySelector('[data-chat-call-id]')) {
          const group = node.closest('[data-chat-group-key]');
          if (group) groups.add(group);
        }
        if (node.matches(DSC_BODY_TOOL_LABEL)) candidates.add(node);
        else if (node.matches('[aria-hidden="true"]') && node.parentElement?.matches(DSC_BODY_TOOL_LABEL)) {
          // TextShimmer 原地切换到运行态时只挂入无障碍隐藏的高光副本。
          candidates.add(node.parentElement);
        } else {
          for (const label of node.querySelectorAll(DSC_BODY_TOOL_LABEL)) candidates.add(label);
        }
      }
    }
    if (checkDecorated) {
      for (const label of decorated.keys()) if (!label.isConnected || !label.matches(DSC_BODY_TOOL_LABEL)) clear(label);
      for (const group of pending.keys()) if (!group.isConnected) unwatch(group);
    }
    for (const label of candidates) {
      const flow = label.closest(DSC_BODY_TOOL_FLOW);
      if (!flow?.isConnected) continue;
      const group = label.closest('[data-chat-group-key]');
      if (group) groups.add(group);
      registerRow(label, getFlow(flow).seen, false);
    }
    for (const group of groups) {
      const flow = group.closest(DSC_BODY_TOOL_FLOW);
      if (flow?.isConnected) registerGroup(group, getFlow(flow));
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true,
    attributeFilter: ['data-process-activity', 'data-shimmer', 'data-state', 'aria-expanded', 'data-conversation-session'] });
  for (const name of ['animationend', 'animationcancel']) document.addEventListener(name, onAnimation);
  reduce?.addEventListener('change', clearAll);
  document.addEventListener('visibilitychange', clearAll);

  return () => {
    observer.disconnect();
    clearAll();
    reduce?.removeEventListener('change', clearAll);
    document.removeEventListener('visibilitychange', clearAll);
    for (const name of ['animationend', 'animationcancel']) document.removeEventListener(name, onAnimation);
  };
}

function mountCodexBody(ctx) {
  ctx.effect(() => {
    document.body.setAttribute('data-dsc-codex-body', '');
    const style = document.createElement('style');
    style.dataset.dscCodexBody = '';
    style.textContent = BODY_CSS_TEXT;
    document.head.appendChild(style);
    return () => { style.remove(); document.body.removeAttribute('data-dsc-codex-body'); };
  }, 'codex-style: body stylesheet');
  ctx.effect(() => mountBodySmoothing(), 'codex-style: streaming text smoothing');
  ctx.effect(() => mountBodyExpansion(), 'codex-style: process expansion');
  ctx.effect(() => mountBodyToolEntrance(ctx), 'codex-style: tool title entrance');
  ctx.slots.inject('conversation.chat.node', () => {
    const priorities = ctx.slots.entries('conversation.chat.node').filter(entry => entry.options.key === 'turn-process').map(entry => entry.options.priority ?? 0);
    return ctx.slots.register({ name: 'conversation.chat.node', key: 'turn-process', priority: Math.min(0, ...priorities) - 1 }, CodexTurnProcess);
  });
}

// 正文与顶部是主界面固定效果；随主客户端及所需槽位的生命周期装卸。
function mountCodexPresentation(ctx) {
  mountCodexHeader(ctx);
  ctx.inject(['slots'], mountCodexBody);
}

// 只有前进后退、图片批注仍按独立子组件清单启停。
function watchCodexPresentation(ctx) {
  let disposed = false;
  let revision = 0;
  const effects = [
    { path: '/navigation', name: 'codex-style-navigation-presentation', apply: mountCodexNavigation, inject: ['slots', 'layout', 'sessions', 'uiWorkspace', 'shortcuts'] },
    { path: '/image-annotations', name: 'codex-style-image-annotations-presentation', apply: mountCodexImageAnnotations, inject: ['slots', 'sessions', 'uiSession', 'conversation', 'remote'] }
  ];
  const setEnabled = (effect, enabled) => {
    if (enabled && !effect.feature) effect.feature = ctx.plugin({ name: effect.name, apply: effect.apply, inject: effect.inject });
    else if (!enabled && effect.feature) { effect.feature.dispose(); effect.feature = undefined; }
  };
  const refresh = async () => {
    const request = ++revision;
    try {
      const result = await ctx.remote.pluginInventory.list();
      if (disposed || request !== revision) return;
      if (!result.ok) throw new Error(result.error?.message || '无法读取呈现组件状态');
      for (const effect of effects) setEnabled(effect, result.value.entries.some(row => row.moduleName === PLUGIN_PACKAGE + effect.path && row.enabled && row.fiberPhase === 'active'));
    } catch (error) {
      if (disposed || request !== revision) return;
      for (const effect of effects) setEnabled(effect, false);
      console.warn('codex-style: 呈现组件状态读取失败', error);
    }
  };
  const offChanged = ctx.remote.$on('plugin-manager/changed', refresh);
  const offReset = ctx.on('connection/reset', refresh);
  refresh();
  return () => { disposed = true; revision++; offChanged(); offReset(); for (const effect of effects) setEnabled(effect, false); };
}
