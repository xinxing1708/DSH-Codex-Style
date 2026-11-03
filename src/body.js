// 可选正文呈现：只使用公开组件清单、Slot 与 data-* 锚点。
// 子路径宿主组件没有独立客户端包，主界面按它的实际 Cordis 启停装卸本效果。
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
    h('div', { className: 'dsc-body-turn__divider', 'aria-hidden': true }));
}

// 正文流式平滑：宿主每次到达都会把末尾段落整体重写，插件无法包裹字符，
// 所以不减少渲染，只限制“露出来”的速度——把正文容器裁到当前揭示行，再用同色
// 柔边盖住当前行光标之后的字符，并按顺序推进已收到的文本块。
const DSC_BODY_SMOOTH = {
  tailKeep: 8,      // 仅仍在增长的末尾文本单元保留的未揭示字数
  minCps: 62.5,     // 最低揭示速度（约每帧 1 字）
  drainMs: 700,     // 积压按该时长摊平
  finishCps: 900,   // data-streaming 移除后的排空速度
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
      units.push({ el: block, leaf: true, fade: block.firstElementChild != null });
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
          if (item.tagName === 'LI') units.push({ el: item, leaf: true, fade: item.firstElementChild != null });
        }
      } else {
        units.push({ el: block, leaf: false, fade: true });
      }
      break;
    default:
      break;
  }
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

// AssistantMarkdown 的根 div（data-streaming）下是正文容器 div；宿主的思考摘要
// 也会带 data-streaming，必须按结构排除，不能只按属性匹配。
function dscBodyIsRoot(root) {
  if (!root || root.nodeType !== 1 || root.tagName !== 'DIV') return false;
  if (!root.hasAttribute('data-streaming')) return false;
  const body = root.firstElementChild;
  return !!body && body.tagName === 'DIV';
}

function dscBodyNodeHasRoot(node) {
  if (!node || node.nodeType !== 1) return false;
  return node.hasAttribute('data-streaming') || node.querySelector('[data-streaming]') !== null;
}

// 当前单元之后是否还有元素内容（正文块或其他非正文块），用于判断是否仍在写最后一段。
function dscBodyHasFollowing(container, element) {
  let node = element;
  while (node && node !== container) {
    if (node.nextElementSibling) return true;
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
  let disposed = false;
  const isReduced = () => !!(reduce && reduce.matches);
  const isHidden = () => document.visibilityState === 'hidden';

  function schedule() {
    if (frame || disposed) return;
    frame = requestAnimationFrame(step);
  }

  // 每个正文 root 独立持有柔边层，避免多个 root 抢用同一层遮罩。
  function ensureLayer(state) {
    if (state.layer && state.layer.isConnected) return state.layer;
    const layer = document.createElement('div');
    layer.className = 'dsc-body-edge';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    layers.add(layer);
    state.layer = layer;
    // 实色由遮罩的渐变淡出（CSS），不解析颜色字符串，主题/color() 写法都能用。
    if (state.color) layer.style.backgroundColor = state.color;
    return layer;
  }

  function hideLayer(state) {
    if (state.layer && state.layer.style.opacity !== '0') state.layer.style.opacity = '0';
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
      state.layer.remove();
      layers.delete(state.layer);
      state.layer = null;
    }
    for (const el of state.fadedEls) el.classList.remove('dsc-body-smooth-fade');
    state.fadedEls.clear();
    if (states.get(state.root) === state) states.delete(state.root);
  }

  function releaseAll() {
    for (const state of [...states.values()]) release(state);
  }

  // 遮罩范围取 root 所属滚动区与视口的交集，并扣除滚动区内 sticky 的输入区。
  function ensureScrollport(state) {
    if (state.scroller === undefined || (state.scroller && !state.scroller.isConnected)) {
      state.scroller = state.root.closest('[data-conversation-scroll]');
      state.seat = undefined;
    }
    if (!state.scroller) return null;
    if (state.seat === undefined || (state.seat && !state.seat.isConnected)) {
      state.seat = null;
      for (const child of state.scroller.children) {
        if (child.getAttribute('data-conversation-region') === 'composer') { state.seat = child; break; }
      }
    }
    return state.scroller;
  }

  function visibleRect(state) {
    const port = ensureScrollport(state) || state.root;
    const box = port.getBoundingClientRect();
    const width = window.innerWidth || document.documentElement.clientWidth || 0;
    const height = window.innerHeight || document.documentElement.clientHeight || 0;
    const rect = {
      left: Math.max(0, box.left),
      top: Math.max(0, box.top),
      right: Math.min(width, box.right),
      bottom: Math.min(height, box.bottom)
    };
    if (state.seat) {
      const seat = state.seat.getBoundingClientRect();
      if (seat.height > 0 && seat.bottom > rect.top && seat.top < rect.bottom) rect.bottom = Math.max(rect.top, seat.top);
    }
    return rect;
  }

  function paintMask(state, rect, maskLeft, containerRight, visible) {
    const layer = ensureLayer(state);
    if (!layer) return;
    const right = Math.min(containerRight, visible.right);
    if (visible.right <= visible.left || visible.bottom <= visible.top
      || rect.bottom <= visible.top || rect.top >= visible.bottom
      || containerRight <= visible.left || maskLeft >= visible.right) {
      hideLayer(state);
      return;
    }
    const width = right - maskLeft;
    const top = Math.max(visible.top, rect.top);
    const bottom = Math.min(visible.bottom, rect.bottom);
    if (width <= 0 || bottom <= top) { hideLayer(state); return; }
    layer.style.left = `${maskLeft}px`;
    layer.style.top = `${top}px`;
    layer.style.width = `${width}px`;
    layer.style.height = `${bottom - top}px`;
    // 左缘被滚动区/视口裁掉时保持渐变原始坐标，不把渐变从可见区左缘重新开始。
    const inset = Math.max(0, visible.left - maskLeft);
    layer.style.clipPath = inset > 0 ? `inset(0px 0px 0px ${inset}px)` : '';
    if (layer.style.opacity !== '1') layer.style.opacity = '1';
  }

  // 当前单元裁到光标所在行底部；完全揭示后柔边放在最后一个字符右侧，挡住后续新增。
  function paintClipUnit(state) {
    const el = state.container;
    const unit = state.units[state.index];
    if (!el || !unit) { paintEnd(state); return; }
    const box = el.getBoundingClientRect();
    const visible = visibleRect(state);
    const total = unit.el.textContent.length;
    if (total === 0) {
      applyClip(state, unit.el.getBoundingClientRect().top - box.top);
      hideLayer(state);
      return;
    }
    const atEnd = state.cursor >= total;
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
    applyClip(state, rect.bottom - box.top);
    paintMask(state, rect, atEnd ? rect.right : rect.left, box.right, visible);
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
      if (next[last].fade || (next[last].leaf && next[last].el.firstElementChild != null)) { state.index = next.length; return true; }
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
    state.cursor = unit.fade || (unit.leaf && unit.el.firstElementChild != null) ? 0 : Math.min(cursor, total);
    return true;
  }

  function adoptContainer(state, container) {
    clearClip(state);
    state.container = container;
    state.clipSaved = null;
    state.clipValue = '';
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
      view: root.closest('[data-conversation-session]'),
      fadeUntil: 0,
      color: dscBodyEdgeColor(root),
      layer: null,
      scroller: undefined,
      seat: undefined,
      clipSaved: null,
      clipValue: '',
      fadedEls: new Set()
    };
    state.fadeAll = state.color === null;
    states.set(root, state);
    state.session = state.view?.getAttribute('data-conversation-session');
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
      if (!structureChanged) continue;
      const container = root.firstElementChild;
      if (container && container !== state.container) adoptContainer(state, container);
      refreshUnits(state, false);
      paintState(state);
    }
    for (const [view, session] of views) seenViews.set(view, session);
    // 空会话也建立基线，随后到达的第一批输出不能被当作历史。
    for (const view of document.querySelectorAll('[data-conversation-session]')) {
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
    let guard = 0;
    for (;;) {
      if (guard++ > 64) { paintState(state); return; }
      if (state.index >= state.units.length) {
        if (finishing && now >= state.fadeUntil) { release(state); return; }
        paintEnd(state);
        return;
      }
      const unit = state.units[state.index];
      if (!unit.el.isConnected) { refreshUnits(state, false); continue; }
      // 代码块与含行内元素的段落无法逐字裁剪：淡入一次后推进队列。
      if (state.fadeAll || unit.fade || (unit.leaf && unit.el.firstElementChild != null)) {
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
      const delta = state.last ? Math.min(64, Math.max(0, now - state.last)) : 16;
      state.last = now;
      if (backlog > 0.01) {
        const rate = finishing
          ? DSC_BODY_SMOOTH.finishCps
          : live && backlog <= DSC_BODY_SMOOTH.tailKeep
            ? 0
            : Math.max(DSC_BODY_SMOOTH.minCps, backlog * 1000 / DSC_BODY_SMOOTH.drainMs);
        state.cursor = Math.min(total, state.cursor + rate * delta / 1000);
      }
      if (state.cursor < total - 0.01) {
        paintClipUnit(state);
        return;
      }
      state.cursor = total;
      if (finishing) {
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      if (tail) {
        if (live) { paintClipUnit(state); return; }
        paintEnd(state);
        return;
      }
      if (!last) {
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      paintEnd(state);
      return;
    }
  }

  function step(timestamp) {
    frame = 0;
    if (disposed) return;
    if (isReduced() || isHidden()) { releaseAll(); return; }
    const now = typeof timestamp === 'number' && Number.isFinite(timestamp) ? timestamp : performance.now();
    syncStates(false);
    if (!states.size) return;
    for (const state of [...states.values()]) advance(state, now);
    if (states.size) schedule();
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
    for (const state of states.values()) {
      if (state.root.isConnected && state.root.contains(record.target)) return true;
    }
    for (const node of record.addedNodes) if (dscBodyNodeHasRoot(node)) return true;
    for (const node of record.removedNodes) if (dscBodyNodeHasRoot(node)) return true;
    return false;
  }

  // 只观察必要属性 data-streaming；自己写入的 style/class 不在观察范围，避免自循环。
  const observer = new MutationObserver(records => {
    if (disposed) return;
    let structure = false;
    let streaming = false;
    for (const record of records) {
      if (record.type === 'attributes') {
        streaming = true;
        if (record.attributeName === 'data-conversation-session') structure = true;
        continue;
      }
      if (record.type === 'childList' && !ownMutation(record) && meaningful(record)) structure = true;
      if (record.type === 'characterData' && states.size > 0) {
        // 裁剪已撤掉的尾段重新增长时，先同步遮住新增字符，避免先完整绘制一帧。
        const target = record.target;
        for (const state of states.values()) {
          if (state.clipSaved !== null) continue;
          const current = state.units[state.index];
          if (current && current.el.contains(target)) paintState(state);
        }
      }
    }
    if (structure) syncStates(true);
    else if (streaming) syncStates(false);
    else if (!states.size) return;
    schedule();
  });

  const onVisibility = () => {
    if (isHidden()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      return;
    }
    syncStates(false, true);
    schedule();
  };
  const onReduce = () => {
    if (isReduced()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      return;
    }
    syncStates(false, true);
    schedule();
  };
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['data-streaming', 'data-conversation-session'] });
  document.addEventListener('visibilitychange', onVisibility);
  if (reduce && reduce.addEventListener) reduce.addEventListener('change', onReduce);
  syncStates(false, true);
  schedule();

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    if (reduce && reduce.removeEventListener) reduce.removeEventListener('change', onReduce);
    releaseAll();
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
  }, 'codex-style: optional body stylesheet');
  ctx.effect(() => mountBodySmoothing(), 'codex-style: streaming text smoothing');
  ctx.slots.inject('conversation.chat.node', () => {
    const priorities = ctx.slots.entries('conversation.chat.node').filter(entry => entry.options.key === 'turn-process').map(entry => entry.options.priority ?? 0);
    return ctx.slots.register({ name: 'conversation.chat.node', key: 'turn-process', priority: Math.min(0, ...priorities) - 1 }, CodexTurnProcess);
  });
}

// 三个独立子组件共用一次组件清单查询，各自装卸，互不改变对方状态。
function watchCodexPresentation(ctx) {
  let disposed = false;
  let revision = 0;
  const effects = [
    { path: '/body', name: 'codex-style-body-presentation', apply: mountCodexBody, inject: ['slots'] },
    { path: '/header', name: 'codex-style-header-presentation', apply: mountCodexHeader },
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
