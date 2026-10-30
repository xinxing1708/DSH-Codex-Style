const React = require('react');
const { createPortal } = require('react-dom');
const { Button, IconRefreshOutlineRegular } = require('@deepseek-ai/dsh-client-ui-primitives');
const { createSnapshotStore } = require('@deepseek-ai/dsh-client-store');
const h = React.createElement;
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useSyncExternalStore, useId } = React;
const PLUGIN_ID = 'dsh-codex-style';
const headerPresentation = createSnapshotStore(false);

// 自绘图标沿用本项目原型；功能与目录全部来自宿主。
const paths = {
  folder: 'M2.3 6.1c0-.75.6-1.35 1.35-1.35H6.2l1.5 1.6h4.85c.75 0 1.35.6 1.35 1.35v4.9c0 .75-.6 1.35-1.35 1.35h-8.9c-.75 0-1.35-.6-1.35-1.35Z',
  folderOpen: 'M2.1 12.2V4.4c0-.8.6-1.4 1.4-1.4h2.9l1.4 1.6h4c.8 0 1.4.6 1.4 1.4v1M2.1 12.2l2.2-4.8h9.3a.8.8 0 0 1 .7 1.1l-1.8 4a1.5 1.5 0 0 1-1.4.9H3.5a1.4 1.4 0 0 1-1.4-1.2Z',
  chat: 'M13 7.5a5 5 0 0 1-5 5H3l-1 1V7.5a5.5 5.5 0 1 1 11 0Z',
  pencil: 'M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9m-2.3-5.2-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8',
  search: 'M10.5 10.5 14 14M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
  plus: 'M8 3v10M3 8h10',
  more: 'M2 2h4v4H2zM2 10h4v4H2zM10 10h4v4h-4zM10 4h4M12 2v4',
  chevron: 'm5 6 3 3 3-3',
  back: 'm10 3-5 5 5 5',
  check: 'm3.5 8 3 3 6-6',
  shield: 'M8 1.8 13 4v4.2c0 2.8-2.3 4.8-5 6-2.7-1.2-5-3.2-5-6V4ZM8 5v3.6m0 2.1v.1',
  pin: 'm5 2 6 0-1 4 2 2H9v5l-1 1V8H4l2-2Z',
  archive: 'M3 5.5v6.3c0 .9.7 1.7 1.7 1.7h6.6c1 0 1.7-.8 1.7-1.7V5.5M2.5 2.5h11v3h-11ZM6.2 8h3.6',
  monitor: 'M2 3h12v8H2zM5.5 13h5M8 11v2',
  arrowUpRight: 'M4.8 11.2 11.2 4.8M5.9 4.8h5.3v5.3',
  close: 'M4 4l8 8M12 4l-8 8',
  settings: 'M6.5 2.5 7 1h2l.5 1.5 1.6.9 1.5-.3 1 1.8-1 1.2v1.8l1 1.2-1 1.8-1.5-.3-1.6.9L9 13H7l-.5-1.5-1.6-.9-1.5.3-1-1.8 1-1.2V6.1l-1-1.2 1-1.8 1.5.3ZM10.2 7a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0Z',
  skill: 'M8 2 14 5.2v5.6L8 14 2 10.8V5.2ZM8 2v6m6-2.8L8 11.4 2 5.2'
};
function Icon({ name, size = 16, ...props }) {
  return h('svg', { viewBox: '0 0 16 16', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, h('path', { d: paths[name] || paths.chat }));
}
function PluginSupportSection({ subject }) {
  if (subject?.kind !== 'bundle' || subject.pkg?.name !== PLUGIN_PACKAGE) return null;
  return h('aside', { className: 'dsc-plugin-support', 'aria-label': '支持插件开发' },
    h('p', null, '如果您认为插件使用体验不错，可以到github点一颗star支持我'),
    h('a', { href: 'https://github.com/xinxing1708/DSH-Codex-Style', target: '_blank', rel: 'noopener noreferrer' },
      'GitHub · xinxing1708/DSH-Codex-Style', h(Icon, { name: 'arrowUpRight', size: 14 })));
}
// 以页面时间轴零点对齐，错开开始、等待恢复和重新挂载的运行圈保持同一转角。
function syncSessionSpinner(svg) {
  if (!svg) return;
  for (const animation of svg.getAnimations()) {
    if (animation.animationName === 'dsc-session-spin') animation.startTime = 0;
  }
}
function useSource(source) {
  const subscribe = useCallback(fn => source.subscribe(fn), [source]);
  const snapshot = useCallback(() => source.getSnapshot(), [source]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
// 社区版提醒：宿主公开 Toast 固定顶部居中；用户要求右下角，这里沿用 shell.overlay 自绘轻量提醒。
const COMMUNITY_NOTICE_TEXT = '检测到当前为社区版 DSH Desktop，不是 DeepSeek 官方版。本插件针对官方 DeepSeek Harness，效果可能一般。';
const COMMUNITY_NOTICE_HOLD_MS = 6000;
function createCommunityNotice() {
  let snapshot = null;
  const listeners = new Set();
  const publish = next => { snapshot = next; for (const listener of listeners) listener(); };
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    show(text) { publish({ text }); },
    clear() { if (snapshot !== null) publish(null); }
  };
}
function CommunityNotice({ notice }) {
  const current = useSource(notice);
  const dismiss = useCallback(() => notice.clear(), [notice]);
  useEffect(() => {
    if (!current) return undefined;
    const timer = setTimeout(dismiss, COMMUNITY_NOTICE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [current, dismiss]);
  if (!current) return null;
  return createPortal(h('div', { className: 'dsc-ui dsc-community-notice', role: 'status', 'aria-live': 'polite' }, h('span', { className: 'dsc-community-notice-text' }, current.text)), document.body);
}
function errorText(error) { return error?.message || String(error); }
function ErrorLine({ text }) { return text ? h('div', { className: 'dsc-error', role: 'alert' }, text) : null; }
// 用 aria-disabled 代替原生 disabled：避免全局 `.dsc-ui button:disabled { opacity: .45 }` 在提交瞬间造成变暗闪烁。
function Option({ title, detail, icon, selected, onClick, disabled, warning }) {
  return h('button', { type: 'button', className: 'dsc-option', role: 'menuitemradio', 'aria-checked': !!selected, 'aria-disabled': disabled ? 'true' : undefined, 'data-warning': !!warning, onClick: e => { if (disabled) return; onClick?.(e); } },
    icon && h(Icon, { name: icon }),
    h('span', { className: 'dsc-option-copy' }, h('span', null, title), detail && h('small', null, detail)),
    selected && h(Icon, { name: 'check' }));
}

// 所有浮层位于自己的 portal 根；只读取 anchor 与自己的 DOM，不查宿主私有选择器。
// placement: 'top' 为默认（锚点上方优先），'right' 用于行尾菜单（锚点右下方展开）。
function Popover({ anchor, point, onClose, label, width = 300, children, className = '', autoFocus = true, role = 'menu', placement = 'top' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ visibility: 'hidden' });
  useLayoutEffect(() => {
    const place = () => {
      if (!anchor.current || !ref.current) return;
      const box = anchor.current.getBoundingClientRect();
      const w = Math.min(width, window.innerWidth - 24);
      const size = ref.current.getBoundingClientRect();
      if (point) {
        setPosition({ position: 'fixed', left: Math.max(12, Math.min(point.x, window.innerWidth - w - 12)), top: Math.max(12, Math.min(point.y, window.innerHeight - size.height - 12)), width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      if (placement === 'bottom') {
        const left = Math.max(12, Math.min(window.innerWidth - w - 12, box.right - w));
        const top = Math.max(12, Math.min(box.bottom + 9, window.innerHeight - size.height - 12));
        setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      if (placement === 'right') {
        const spaceRight = window.innerWidth - box.right - 12;
        const left = spaceRight >= w ? box.right + 6 : Math.max(12, box.left - w - 6);
        const top = Math.max(12, Math.min(window.innerHeight - size.height - 12, box.top - 4));
        setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      const left = Math.max(12, Math.min(window.innerWidth - w - 12, box.right - w));
      const top = box.top - size.height - 9 >= 12 ? box.top - size.height - 9 : Math.max(12, Math.min(box.bottom + 9, window.innerHeight - size.height - 12));
      setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
    };
    place();
    const observer = new ResizeObserver(place);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { observer.disconnect(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [anchor, point, width, placement]);
  useEffect(() => {
    if (autoFocus) (ref.current?.querySelector('input, [aria-checked="true"], button, [role="slider"]'))?.focus({ preventScroll: true });
    const pointer = e => { if (!ref.current?.contains(e.target) && !anchor.current?.contains(e.target)) onClose(); };
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(); anchor.current?.focus(); return; }
      if (!ref.current?.contains(e.target) || e.target.matches('input, [role="slider"]') || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const items = [...ref.current.querySelectorAll('button:not(:disabled)')];
      if (!items.length) return;
      e.preventDefault();
      const index = items.indexOf(document.activeElement);
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    };
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('keydown', key, true);
    return () => { document.removeEventListener('pointerdown', pointer, true); document.removeEventListener('keydown', key, true); };
  }, [anchor, onClose, autoFocus]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-menu ' + className, style: position, role, 'aria-label': label }, children), document.body);
}

// 行悬停详情卡：按原型实测放置（右侧、与行顶对齐），不复用菜单的向上翻转定位。
// 项目卡 321×130：名称+图钉 / 聊天数 / 分隔线 / 路径 / 分隔线 / 编辑项目；会话卡 470 宽与行顶差 6px。
function HoverCard({ anchor, kind, onClose, onEnter, onLeave, children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ visibility: 'hidden' });
  useLayoutEffect(() => {
    const place = () => {
      if (!anchor.current || !ref.current) return;
      const box = anchor.current.getBoundingClientRect();
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      const gap = kind === 'project' ? 5 : 12;
      let left = box.right + gap;
      if (left + width > window.innerWidth - 8) left = Math.max(8, Math.min(box.left - gap - width, window.innerWidth - width - 8));
      let top = kind === 'project' ? box.top : box.top - 6;
      if (top + height > window.innerHeight - 8) top = Math.max(8, window.innerHeight - height - 8);
      if (top < 8) top = 8;
      setPosition({ position: 'fixed', left: Math.round(left), top: Math.round(top), visibility: 'visible' });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [anchor, kind]);
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    window.addEventListener('resize', onClose);
    window.addEventListener('scroll', onClose, true);
    document.addEventListener('keydown', onKey, true);
    return () => { window.removeEventListener('resize', onClose); window.removeEventListener('scroll', onClose, true); document.removeEventListener('keydown', onKey, true); };
  }, [onClose]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-row-pop dsc-row-pop--' + kind, style: position, role: 'dialog', 'aria-label': kind === 'project' ? '项目详情' : '对话详情', onPointerEnter: onEnter, onPointerLeave: onLeave }, children), document.body);
}
// 图钉为真实状态指示：DSH 只有会话置顶、没有工作区置顶，因此工作区始终显示空心「未置顶」。
function PinMark({ filled }) {
  return h('svg', { viewBox: '0 0 16 16', width: 14, height: 14, fill: filled ? 'currentColor' : 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
    h('g', { transform: 'rotate(45 8 8)' }, h('path', { d: 'M6 2.5h4v3L12 8.5H4L6 5.5ZM8 8.5V14' })));
}
function ProjectHoverCard({ data, anchor, onReveal, onEdit, ...root }) {
  return h(HoverCard, { anchor, kind: 'project', ...root },
    h('div', { className: 'dsc-row-pop__head' },
      h('span', { className: 'dsc-row-pop__name' }, h(Icon, { name: 'folder', size: 15 }), h('span', null, data.title)),
      h('span', { className: 'dsc-row-pop__pin', role: 'img', title: data.pinned ? '已置顶' : '未置顶（DSH 暂不支持工作区置顶）', 'aria-label': data.pinned ? '已置顶' : '未置顶' }, h(PinMark, { filled: data.pinned }))),
    h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'chat', size: 15 }), h('span', null, `${data.count} 次聊天`)),
    data.path && h('div', { className: 'dsc-row-pop__sep' }),
    data.path && h('button', { type: 'button', className: 'dsc-row-pop__line dsc-row-pop__line--path', title: '在文件资源管理器中显示', onClick: onReveal },
      h(Icon, { name: 'folder', size: 15 }), h('span', { className: 'dsc-row-pop__path' }, data.path), h(Icon, { name: 'arrowUpRight', size: 14, className: 'dsc-row-pop__arrow' })),
    h('div', { className: 'dsc-row-pop__sep' }),
    h('button', { type: 'button', className: 'dsc-row-pop__line dsc-row-pop__line--action', onClick: onEdit }, h(Icon, { name: 'settings', size: 15 }), h('span', null, '编辑项目')));
}
function ThreadHoverCard({ data, anchor, ...root }) {
  return h(HoverCard, { anchor, kind: 'thread', ...root },
    h('div', { className: 'dsc-row-pop__head' },
      h('p', { className: 'dsc-row-pop__excerpt' }, data.title),
      h('span', { className: 'dsc-row-pop__meta' }, h(Icon, { name: 'monitor', size: 14 }), data.status)),
    data.workspaceTitle && h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'folder', size: 15 }), h('span', null, data.workspaceTitle)),
    data.path && h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'folder', size: 15 }), h('span', { className: 'dsc-row-pop__path' }, data.path)));
}

// 「编辑项目」对话框：名称输入接真实工作区重命名，底部「移除本地项目」接真实工作区删除；
// 源文件夹只读展示当前路径，不提供添加/更换文件夹（DSH 无该能力）。
function EditWorkspaceDialog({ workspace, onClose, onRename, onDelete }) {
  const [name, setName] = useState(workspace.title || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const input = useRef(null);
  useEffect(() => { input.current?.focus(); input.current?.select(); }, []);
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  const save = async () => {
    const title = name.trim();
    if (!title) { setError('项目名称不能为空'); return; }
    if (busy) return;
    if (title === (workspace.title || '')) { onClose(); return; }
    setBusy('save'); setError('');
    try { await onRename(title); onClose(); } catch (e) { setError(errorText(e)); setBusy(''); }
  };
  const remove = async () => {
    if (busy) return;
    if (!window.confirm(`移除本地项目「${workspace.title || ''}」？项目中的对话会保留在“最近”中。`)) return;
    setBusy('remove'); setError('');
    try { await onDelete(); onClose(); } catch (e) { setError(errorText(e)); setBusy(''); }
  };
  return createPortal(h('div', { className: 'dsc-ui dsc-modal', role: 'presentation' },
    h('div', { className: 'dsc-modal__mask', 'aria-hidden': true, onClick: onClose }),
    h('div', { className: 'dsc-modal__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dsc-edit-workspace-title' },
      h('div', { className: 'dsc-modal__head' },
        h('h2', { id: 'dsc-edit-workspace-title' }, '编辑项目'),
        h('button', { type: 'button', className: 'dsc-modal__close', title: '关闭', 'aria-label': '关闭', onClick: onClose }, h(Icon, { name: 'close', size: 16 }))),
      h('div', { className: 'dsc-modal__field' },
        h(Icon, { name: 'folder', size: 16 }),
        h('input', { ref: input, className: 'dsc-modal__input', value: name, onChange: e => setName(e.target.value), onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); save(); } }, 'aria-label': '项目名称', placeholder: '项目名称' })),
      h('div', { className: 'dsc-modal__label' }, '源文件夹'),
      h('div', { className: 'dsc-modal__source' }, h(Icon, { name: 'folder', size: 16 }), h('span', { className: 'dsc-modal__path', title: workspace.path || '' }, workspace.path || '未记录路径')),
      h(ErrorLine, { text: error }),
      h('div', { className: 'dsc-modal__actions' },
        h('button', { type: 'button', className: 'dsc-modal__remove', onClick: remove, disabled: !!busy }, busy === 'remove' ? '正在移除…' : '移除本地项目'),
        h('div', { className: 'dsc-modal__spacer' }),
        h('button', { type: 'button', className: 'dsc-modal__cancel', onClick: onClose, disabled: !!busy }, '取消'),
        h('button', { type: 'button', className: 'dsc-modal__save', onClick: save, disabled: !!busy }, busy === 'save' ? '保存中…' : '保存')))), document.body);
}

function RenameThreadDialog({ thread, onClose, onRename }) {
  const [name, setName] = useState(thread.title || '未命名对话');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const panel = useRef(null);
  const input = useRef(null);
  const submitting = useRef(false);
  useEffect(() => {
    const previous = document.activeElement;
    input.current?.focus(); input.current?.select();
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  const close = () => { if (!submitting.current) onClose(); };
  const save = async event => {
    event.preventDefault();
    if (submitting.current) return;
    const title = name.trim();
    if (!title) { setError('对话名称不能为空'); input.current?.focus(); return; }
    if (title === thread.title) { onClose(); return; }
    submitting.current = true; setBusy(true); setError('');
    try { await onRename(title); onClose(); }
    catch (e) { submitting.current = false; setBusy(false); setError(errorText(e)); }
  };
  const keyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
    if (event.key !== 'Tab') return;
    const items = [...panel.current.querySelectorAll('input:not(:disabled), button:not(:disabled)')];
    const first = items[0], last = items[items.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return createPortal(h('div', { className: 'dsc-ui dsc-modal', onKeyDown: keyDown },
    h('div', { className: 'dsc-modal__mask', 'aria-hidden': true, onClick: close }),
    h('form', { ref: panel, className: 'dsc-modal__panel', role: 'dialog', 'aria-modal': true, 'aria-label': '重命名对话', 'aria-busy': busy, onSubmit: save },
      h('div', { className: 'dsc-modal__head' }, h('h2', null, '重命名对话'),
        h('button', { type: 'button', className: 'dsc-modal__close', 'aria-label': '关闭重命名', disabled: busy, onClick: close }, h(Icon, { name: 'close' }))),
      h('div', { className: 'dsc-modal__field' }, h(Icon, { name: 'pencil' }),
        h('input', { ref: input, className: 'dsc-modal__input', 'aria-label': '对话名称', value: name, disabled: busy, onChange: e => setName(e.target.value), onKeyDown: e => { if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault(); } })),
      h(ErrorLine, { text: error }),
      h('div', { className: 'dsc-modal__actions' }, h('div', { className: 'dsc-modal__spacer' }),
        h('button', { type: 'button', className: 'dsc-modal__cancel', disabled: busy, onClick: close }, '取消'),
        h('button', { type: 'submit', className: 'dsc-modal__save', disabled: busy }, busy ? '保存中…' : '保存')))), document.body);
}

function relativeTime(value) {
  const timestamp = typeof value === 'number' ? value : Date.parse(value);
  if (!Number.isFinite(timestamp)) return '';
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  return minutes < 1 ? '刚刚' : minutes < 60 ? minutes + '分钟前' : minutes < 1440 ? Math.floor(minutes / 60) + '小时前' : Math.floor(minutes / 1440) + '天前';
}

// 测量标题当前可用宽度；侧栏拖宽、重命名都会重新计算。
function ThreadTitle({ title }) {
  const viewport = useRef(null);
  const text = useRef(null);
  useLayoutEffect(() => {
    const measure = () => {
      const overflow = Math.max(0, text.current.scrollWidth - viewport.current.clientWidth);
      viewport.current.dataset.overflow = String(overflow > 1);
      viewport.current.style.setProperty('--dsc-title-shift', -overflow + 'px');
      // 按距离计算时长，使轻微溢出与长标题都以录像约 30 CSS px/s 的速度移动。
      viewport.current.style.setProperty('--dsc-title-duration', overflow / 30 + 's');
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(text.current);
    return () => observer.disconnect();
  }, [title]);
  return h('span', { ref: viewport, className: 'dsc-thread-title' }, h('span', { ref: text, className: 'dsc-thread-title-text' }, title));
}

// 提示 portal 到 body，避免被滚动区或正在开合的项目裁掉；延迟和进退由 CSS 控制。
function RowTooltip({ anchor, open, label, onClose }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({});
  useLayoutEffect(() => {
    if (!open) return;
    const box = anchor.current.getBoundingClientRect();
    const tip = ref.current.getBoundingClientRect();
    setPosition({ left: Math.max(8, Math.min(box.left + (box.width - tip.width) / 2, window.innerWidth - tip.width - 8)), top: box.top - tip.height - 7 >= 8 ? box.top - tip.height - 7 : box.bottom + 7 });
    window.addEventListener('resize', onClose);
    window.addEventListener('scroll', onClose, true);
    return () => { window.removeEventListener('resize', onClose); window.removeEventListener('scroll', onClose, true); };
  }, [anchor, open, label, onClose]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-row-tooltip', role: 'tooltip', 'aria-hidden': !open, 'data-open': open, style: position }, label), document.body);
}

function ThreadAction({ label, active, onIntent, onClick, className = '', pressed, children }) {
  const anchor = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const close = useCallback(() => { setHovered(false); setFocused(false); }, []);
  useEffect(() => { if (!active) close(); }, [active, close]);
  return h(React.Fragment, null,
    h('button', { ref: anchor, type: 'button', className: 'dsc-thread-action ' + className, 'aria-label': label, 'aria-pressed': pressed,
      onPointerEnter: () => { onIntent(); setHovered(true); }, onPointerLeave: () => setHovered(false),
      onFocus: e => { if (e.currentTarget.matches(':focus-visible')) { onIntent(); setFocused(true); } }, onBlur: () => setFocused(false),
      onClick: () => { close(); onIntent(); onClick(); } }, children),
    h(RowTooltip, { anchor, open: active && (hovered || focused), label, onClose: close }));
}

function ProjectFold({ open, children, className = '' }) {
  return h('div', { className: 'dsc-project-fold ' + className, 'data-open': open, 'aria-hidden': !open, ref: node => { if (node) node.inert = !open; } },
    h('div', { className: 'dsc-project-clip' }, children));
}

// 宿主完成提醒仅检查 mainView；此处补上窗口焦点和真实主区，状态只属于当前插件页面。
function createSessionCompletionTracker(ctx) {
  const store = createSnapshotStore(new Set());
  let previousRunning = new Map();
  let previousHostUnread = new Set();
  let windowFocused = false;
  const reconcile = () => {
    const catalog = ctx.sessions.list.getSnapshot();
    const status = ctx.uiSession.sessionStatus.getSnapshot();
    const panel = ctx.layout.panelInfo.getSnapshot();
    const viewingConversation = windowFocused && document.visibilityState === 'visible' && panel.activePanelId === null;
    const viewedId = viewingConversation ? catalog.ids.find(id => (catalog.byId[id]?.retainedBy?.mainView ?? 0) > 0) : undefined;
    const next = new Set(store.getSnapshot());
    const running = new Map();
    const hostUnread = new Set();
    for (const id of new Set([...catalog.ids, ...status.keys()])) {
      const state = status.get(id);
      const isRunning = state?.running ?? catalog.byId[id]?.running;
      running.set(id, isRunning);
      if (state?.completionUnread) hostUnread.add(id);
      const justCompleted = previousRunning.get(id) === true && isRunning === false;
      const hostCompleted = state?.completionUnread && !previousHostUnread.has(id);
      if (isRunning || id === viewedId) next.delete(id);
      else if (justCompleted || hostCompleted) next.add(id);
    }
    if (catalog.phase === 'ready') for (const id of next) if (!catalog.byId[id]) next.delete(id);
    previousRunning = running;
    previousHostUnread = hostUnread;
    const before = store.getSnapshot();
    if (next.size !== before.size || [...next].some(id => !before.has(id))) store.set(next);
  };
  const start = () => {
    windowFocused = document.hasFocus();
    const focus = () => { windowFocused = true; reconcile(); };
    const blur = () => { windowFocused = false; reconcile(); };
    const visibility = () => { windowFocused = document.hasFocus(); reconcile(); };
    const disposers = [ctx.sessions.list, ctx.uiSession.sessionStatus, ctx.layout.panelInfo].map(source => source.subscribe(reconcile));
    window.addEventListener('focus', focus);
    window.addEventListener('blur', blur);
    document.addEventListener('visibilitychange', visibility);
    reconcile();
    return () => {
      disposers.forEach(dispose => dispose());
      window.removeEventListener('focus', focus);
      window.removeEventListener('blur', blur);
      document.removeEventListener('visibilitychange', visibility);
    };
  };
  return { store, start };
}

function makeWorkspaceTree(ctx, completionStore) {
  return function WorkspaceTree({ query = '', tools = true, active = true, onNavigate }) {
    const catalog = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    const status = useSource(ctx.uiSession.sessionStatus);
    const completions = useSource(completionStore);
    const panel = useSource(ctx.layout.panelInfo);
    const [expanded, setExpanded] = useState({});
    const [projectsOpen, setProjectsOpen] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [message, setMessage] = useState('');
    const [adding, setAdding] = useState(false);
    const [menu, setMenu] = useState(null);
    const [projectMenu, setProjectMenu] = useState(null);
    const [hover, setHover] = useState(null);
    const [editing, setEditing] = useState(null);
    const [renaming, setRenaming] = useState(null);
    const menuAnchor = useRef(null);
    const projectAnchor = useRef(null);
    const hoverAnchor = useRef(null);
    const hoverTimer = useRef(null);
    const alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; clearTimeout(hoverTimer.current); }; }, []);
    useEffect(() => {
      if (active) return;
      clearTimeout(hoverTimer.current);
      setHover(null); setMenu(null); setProjectMenu(null); setEditing(null); setRenaming(null);
    }, [active]);
    const run = async action => { setMessage(''); try { await action(); } catch (e) { if (alive.current) setMessage(errorText(e)); } };
    const archived = useMemo(() => new Set(workspaces.archivedSessionIds), [workspaces.archivedSessionIds]);
    const pinned = useMemo(() => new Set(workspaces.pinnedSessionIds), [workspaces.pinnedSessionIds]);
    // 一次建立归属索引；保留多项目引用时的旧呈现，以及搜索/详情使用首个项目的语义。
    const memberships = useMemo(() => {
      const index = new Map();
      for (const workspace of workspaces.items) for (const id of new Set(workspace.sessionIds)) {
        if (!index.has(id)) index.set(id, []);
        index.get(id).push(workspace);
      }
      return index;
    }, [workspaces.items]);
    const workspaceOf = id => memberships.get(id)?.[0];
    const ordered = useMemo(() => catalog.ids.map(id => catalog.byId[id])
      .filter(s => s && s.origin !== 'subagent' && !s.blank)
      .map(s => ({ ...s, sessionId: s.id, title: s.title || s.displayTitle }))
      .sort((a, b) => (Number(b.updatedAt) || Date.parse(b.updatedAt) || 0) - (Number(a.updatedAt) || Date.parse(a.updatedAt) || 0)), [catalog.ids, catalog.byId]);
    const currentId = useMemo(() => catalog.ids.find(id => (catalog.byId[id]?.retainedBy?.mainView ?? 0) > 0), [catalog.ids, catalog.byId]);
    const searchText = query.trim().toLowerCase();
    const visible = useMemo(() => ordered.filter(s => (showArchived || !archived.has(s.sessionId)) &&
      (!searchText || `${s.title || ''} ${memberships.get(s.sessionId)?.[0]?.title || ''}`.toLowerCase().includes(searchText))), [ordered, archived, showArchived, searchText, memberships]);
    const groups = useMemo(() => {
      const projects = new Map(), pins = [], recent = [];
      for (const session of visible) {
        if (pinned.has(session.sessionId)) { pins.push(session); continue; }
        const owners = memberships.get(session.sessionId);
        if (!owners) { recent.push(session); continue; }
        for (const workspace of owners) {
          if (!projects.has(workspace.workspaceId)) projects.set(workspace.workspaceId, []);
          projects.get(workspace.workspaceId).push(session);
        }
      }
      return { projects, pins, recent };
    }, [visible, pinned, memberships]);
    const cancelHover = () => clearTimeout(hoverTimer.current);
    const hideHover = () => { clearTimeout(hoverTimer.current); setHover(null); };
    const closeHover = () => { cancelHover(); hoverTimer.current = setTimeout(() => setHover(null), 140); };
    const enterHover = (target, data) => {
      cancelHover();
      hoverAnchor.current = target;
      if (hover) setHover(data);
      else hoverTimer.current = setTimeout(() => setHover(data), 300);
    };
    const revealWorkspace = hoverData => {
      hideHover();
      run(async () => {
        const sessionRemote = ctx.remote?.session;
        if (typeof sessionRemote?.openWorkspacePath !== 'function') throw new Error('当前宿主不支持在文件管理器中显示文件夹');
        const result = await sessionRemote.openWorkspacePath({ path: hoverData.path, action: 'reveal' });
        if (result?.ok === false) throw result.error;
      });
    };
    const editWorkspace = workspace => {
      hideHover();
      setEditing(workspace);
    };
    const rename = async (row, title) => {
      const result = await ctx.sessions.using(row.sessionId, { source: 'workspaceOperation' }, reference => reference.binding.session.rename(title));
      if (result?.ok === false) throw result.error;
    };
    const togglePin = s => run(() => pinned.has(s.sessionId) ? ctx.uiWorkspace.unpinSession(s.sessionId) : ctx.uiWorkspace.pinSession(s.sessionId));
    const toggleArchive = s => run(() => archived.has(s.sessionId) ? ctx.uiWorkspace.unarchiveSession(s.sessionId) : ctx.uiWorkspace.archiveSession(s.sessionId));
    // 继续使用原来的菜单与动作，只把入口改为整行右键（含 Shift+F10 / 菜单键）。
    const openThreadMenu = (event, s) => {
      event.preventDefault(); event.stopPropagation();
      menuAnchor.current = event.currentTarget.querySelector('.dsc-thread-main');
      const box = menuAnchor.current.getBoundingClientRect();
      const point = event.type === 'contextmenu' && (event.clientX || event.clientY) ? { x: event.clientX, y: event.clientY } : { x: box.left + 16, y: box.bottom };
      hideHover(); setProjectMenu(null); setMenu({ ...s, point });
    };
    const row = (s, rowActive = active) => {
      const state = status.get(s.sessionId);
      const actionsActive = rowActive && !menu && !projectMenu && !editing && !renaming;
      const pending = state?.pendingInteraction;
      const running = state?.running && !pending;
      const completed = completions.has(s.sessionId) && !pending && !state?.running;
      const activity = pending ? '等待处理' : state?.running ? '运行中' : completed ? '已完成' : relativeTime(s.updatedAt);
      return h('div', { key: s.sessionId, className: 'dsc-thread' + (s.sessionId === currentId && panel.activePanelId === null ? ' is-active' : '') + (archived.has(s.sessionId) ? ' is-archived' : '') + (pinned.has(s.sessionId) ? ' is-pinned' : ''),
        onContextMenu: e => openThreadMenu(e, s), onKeyDown: e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) openThreadMenu(e, s); },
        onPointerEnter: e => enterHover(e.currentTarget, { kind: 'thread', id: s.sessionId, title: s.title || '未命名对话', status: activity, workspaceTitle: workspaceOf(s.sessionId)?.title, path: workspaceOf(s.sessionId)?.path }), onPointerLeave: closeHover },
        h('button', { type: 'button', className: 'dsc-thread-main', 'aria-haspopup': 'menu', onClick: () => { if (archived.has(s.sessionId)) run(() => ctx.uiWorkspace.unarchiveSession(s.sessionId)); else { ctx.uiWorkspace.openSession(s.sessionId); onNavigate?.(); } } },
          h('span', { className: 'dsc-state', 'data-state': pending ? 'pending' : 'idle' }, pending && h(Icon, { name: 'chat', size: 14 })),
          h(ThreadTitle, { title: s.title || '未命名对话' }),
          running ? h('span', { className: 'dsc-thread-running', role: 'img', 'aria-label': '对话进行中', title: '对话进行中' },
            h('svg', { className: 'dsc-running-spinner', ref: syncSessionSpinner, onAnimationStart: event => syncSessionSpinner(event.currentTarget), viewBox: '0 0 16 16', width: 12, height: 12, fill: 'none', 'aria-hidden': true },
              h('circle', { cx: 8, cy: 8, r: 6.5, stroke: 'currentColor', strokeWidth: 1.6, opacity: .22 }),
              h('circle', { cx: 8, cy: 8, r: 6.5, stroke: 'currentColor', strokeWidth: 1.6, strokeDasharray: '30.6 10.2', strokeLinecap: 'round' })))
            : completed ? h('span', { className: 'dsc-thread-completion', role: 'img', 'aria-label': '对话已完成，未读', title: '对话已完成，未读' }) : h('small', { className: 'dsc-thread-time' }, activity)),
        h('div', { className: 'dsc-thread-actions' },
          h(ThreadAction, { label: pinned.has(s.sessionId) ? '取消置顶聊天' : '置顶聊天', className: 'dsc-pin-action', pressed: pinned.has(s.sessionId), active: actionsActive, onIntent: hideHover, onClick: () => togglePin(s) }, h(PinMark, { filled: pinned.has(s.sessionId) })),
          h(ThreadAction, { label: archived.has(s.sessionId) ? '取消归档聊天' : '归档聊天', active: actionsActive, onIntent: hideHover, onClick: () => toggleArchive(s) }, h(Icon, { name: 'archive', size: 14 }))));
    };
    const addWorkspace = async () => {
      setAdding(true);
      await run(async () => {
        const picked = await ctx.uiWorkspace.pickDirectory();
        if (!picked) return;
        const path = typeof picked === 'string' ? picked : picked.path;
        if (!path) return;
        const created = await ctx.workspaces.create({ path });
        await ctx.uiWorkspace.openWorkspace(created.workspaceId);
        onNavigate?.();
      });
      if (alive.current) setAdding(false);
    };
    const projectHeading = h('div', { className: 'dsc-tree-tools', 'data-compact': !tools },
      h('button', { type: 'button', className: 'dsc-projects-toggle', 'aria-label': '项目', 'aria-expanded': projectsOpen, onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setProjectsOpen(!projectsOpen); } }, h('span', { className: 'dsc-tree-tools-label' }, '项目'), h(Icon, { name: 'chevron', size: 12 })),
      h('button', { type: 'button', className: 'dsc-icon-button', title: '添加工作区', onClick: addWorkspace, disabled: adding }, h(Icon, { name: 'plus' })));
    return h('div', { className: 'dsc-ui dsc-workspaces' },
      query && projectHeading,
      h(ErrorLine, { text: message || (catalog.error && errorText(catalog.error)) || (workspaces.error && errorText(workspaces.error)) }),
      h('div', { className: 'dsc-tree-scroll' },
        query ? h(React.Fragment, null, h('div', { className: 'dsc-section-title' }, '搜索结果'), visible.map(s => row(s))) : h(React.Fragment, null,
          pinned.size > 0 && h('section', null, h('div', { className: 'dsc-section-title' }, '置顶'), groups.pins.map(s => row(s))),
          projectHeading,
          h(ProjectFold, { open: projectsOpen, className: 'dsc-project-list-fold' }, h('div', { className: 'dsc-project-list' }, workspaces.items.map(w => {
            const children = groups.projects.get(w.workspaceId) || [];
            const open = expanded[w.workspaceId] ?? w.sessionIds.includes(currentId);
            return h('section', { key: w.workspaceId }, h('div', { className: 'dsc-project', onPointerEnter: e => enterHover(e.currentTarget, { kind: 'project', id: w.workspaceId, workspace: w, title: w.title || '未命名项目', count: children.length, path: w.path, pinned: w.pinned === true }), onPointerLeave: closeHover },
              h('button', { type: 'button', className: 'dsc-project-main', onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setExpanded({ ...expanded, [w.workspaceId]: !open }); }, 'aria-expanded': open }, h(Icon, { name: open ? 'folderOpen' : 'folder' }), h('span', null, w.title || '未命名项目')),
              h('button', { type: 'button', className: 'dsc-row-action', title: '项目菜单', 'aria-label': '项目菜单', 'aria-haspopup': 'menu', 'aria-expanded': projectMenu?.workspaceId === w.workspaceId, onClick: e => { projectAnchor.current = e.currentTarget; setHover(null); setProjectMenu(projectMenu?.workspaceId === w.workspaceId ? null : w); } }, '⋯'),
              h('button', { type: 'button', className: 'dsc-row-action', title: '在此项目新建对话', 'aria-label': '在此项目新建对话', onClick: () => { ctx.uiWorkspace.startSession(w.workspaceId); onNavigate?.(); } }, h(Icon, { name: 'pencil', size: 14 }))),
              h(ProjectFold, { open }, h('div', { className: 'dsc-project-children' }, children.length ? children.map(s => row(s, active && projectsOpen && open)) : h('small', { className: 'dsc-empty' }, '暂无对话'))));
          }))),
          h('div', { className: 'dsc-section-title' }, '最近'), groups.recent.map(s => row(s))),
        !visible.length && catalog.phase === 'ready' && h('div', { className: 'dsc-empty' }, query ? '没有匹配的对话' : '选择项目，开始新对话'),
        catalog.phase !== 'ready' && h('div', { className: 'dsc-empty', role: 'status' }, '正在加载会话…')),
      h('label', { className: 'dsc-archive-toggle' }, h('input', { type: 'checkbox', checked: showArchived, onChange: e => setShowArchived(e.target.checked) }), '显示已归档对话'),
      menu && h(Popover, { anchor: menuAnchor, point: menu.point, onClose: () => setMenu(null), label: '对话菜单', width: 228 },
        h(Option, { title: '重命名', icon: 'pencil', onClick: () => { const target = menu; setMenu(null); hideHover(); setRenaming(target); } }),
        h(Option, { title: pinned.has(menu.sessionId) ? '取消置顶' : '置顶', icon: 'pin', onClick: () => { const target = menu; setMenu(null); togglePin(target); } }),
        h(Option, { title: '分叉对话', icon: 'chat', onClick: () => { const target = menu; setMenu(null); run(() => ctx.uiWorkspace.forkSession(target.sessionId)); } }),
        h(Option, { title: archived.has(menu.sessionId) ? '取消归档' : '归档', icon: 'archive', onClick: () => { const target = menu; setMenu(null); toggleArchive(target); } })),
      // Codex 风格项目菜单：仅提供编辑与移除项目两项，编辑复用现有编辑项目对话框；从行右侧下方展开。
      projectMenu && h(Popover, { anchor: projectAnchor, onClose: () => setProjectMenu(null), label: '项目菜单', width: 228, placement: 'right' },
        h(Option, { title: '编辑', icon: 'pencil', onClick: () => { const target = projectMenu; setProjectMenu(null); editWorkspace(target); } }),
        h(Option, { title: '移除项目', icon: 'close', onClick: () => { const target = projectMenu; setProjectMenu(null); if (!window.confirm(`移除项目“${target.title || '未命名项目'}”？`)) return; run(() => ctx.workspaces.delete(target.workspaceId)); } })),
      hover && !menu && !projectMenu && (hover.kind === 'project'
        ? h(ProjectHoverCard, { key: hover.id, data: hover, anchor: hoverAnchor, onClose: hideHover, onEnter: cancelHover, onLeave: closeHover, onReveal: () => revealWorkspace(hover), onEdit: () => editWorkspace(hover.workspace) })
        : h(ThreadHoverCard, { key: hover.id, data: hover, anchor: hoverAnchor, onClose: hideHover, onEnter: cancelHover, onLeave: closeHover })),
      editing && h(EditWorkspaceDialog, { key: editing.workspaceId, workspace: editing, onClose: () => setEditing(null), onRename: title => ctx.workspaces.rename(editing.workspaceId, title), onDelete: () => ctx.workspaces.delete(editing.workspaceId) }),
      renaming && h(RenameThreadDialog, { key: renaming.sessionId, thread: renaming, onClose: () => setRenaming(null), onRename: title => rename(renaming, title) }));
  };
}

// 权限目录只读 RPC + 事件通知；世代改变时清空旧 Host 的目录。
function permissionDirectory(ctx) {
  const store = createSnapshotStore({ value: null, error: null, revision: 0 });
  let epoch = 0;
  let disposed = false;
  let generation;
  const refresh = () => {
    const id = ctx.connection.generation.getSnapshot()?.id;
    const currentEpoch = ++epoch;
    store.set({ value: null, error: null, revision: currentEpoch });
    generation = id;
    if (id === undefined) return;
    ctx.remote.permissionPresets.catalog().then(result => {
      if (!result.ok) throw result.error;
      if (!disposed && epoch === currentEpoch && ctx.connection.generation.getSnapshot()?.id === id) store.set({ value: result.value, error: null, revision: currentEpoch });
    }).catch(error => {
      if (!disposed && epoch === currentEpoch) store.set({ value: null, error: errorText(error), revision: currentEpoch });
    });
  };
  const offCatalog = ctx.remote.$on('permission-presets/catalog-changed', refresh);
  const offGeneration = ctx.connection.generation.subscribe(() => {
    if (ctx.connection.generation.getSnapshot()?.id !== generation) refresh();
  });
  refresh();
  return { store, refresh, dispose() { disposed = true; ++epoch; offCatalog(); offGeneration(); } };
}

// 基础 bundle 只配置 sandbox/approval，不提供 description；内置项在宿主缺省时补回可核实的范围说明。
const PERMISSION_COPY = {
  'read-only': {
    title: '仅可查看',
    hostNames: ['Read Only'],
    description: '只读沙箱会阻止文件修改；需要扩大访问范围时会请求批准。'
  },
  'workspace-write': {
    title: '工作区内修改',
    hostNames: ['Workspace Write'],
    description: '可在工作区及允许的临时目录内修改文件；扩大访问范围前会请求批准。'
  },
  'danger-full-access': {
    title: '完全权限',
    hostNames: ['Full Access', 'Full access'],
    description: '可访问完整文件系统，且不再逐项请求批准。'
  },
  auto: {
    title: '自动审查 · EXP',
    hostNames: [],
    description: '无沙箱运行；每次原生工具调用和 PTC 内层调用前，由同一模型进行实验性审查。'
  },
  custom: {
    title: '自定义',
    hostNames: ['Custom'],
    description: '当前沙箱与审批设置不匹配任何已配置的权限预设。'
  }
};
function permissionCopy(option) {
  const fallback = PERMISSION_COPY[option.value];
  const hostName = typeof option.name === 'string' && option.name.trim() ? option.name : option.value;
  const useLocalizedTitle = fallback && (option.value === 'auto' || hostName === option.value || fallback.hostNames.includes(hostName));
  return {
    title: useLocalizedTitle ? fallback.title : hostName,
    description: option.description || fallback?.description || '具体范围由当前 DSH 配置提供。'
  };
}

// 只重绘提权确认；实际权限仍由当前会话的 /permission 命令保存。
const PERMISSION_RISK_COPY = {
  'danger-full-access': {
    title: '要开启完全访问权限吗？',
    description: 'DSH 将能够在未经你许可的情况下，在这台计算机上的任何位置运行命令、使用互联网，以及创建和编辑文件。这包括但不限于：',
    rows: [
      ['folder', '文件和文件夹', '读取、创建、修改、上传或删除此计算机上任意位置的文件'],
      ['terminal', '终端命令', '运行命令、安装软件和更改系统设置'],
      ['globe', '互联网和已启用的工具', '访问网站、发送数据并使用已启用的工具']
    ],
    warning: '这会带来敏感数据丢失或泄露、提示注入等风险。你可以将其关闭。',
    help: '完全访问不会逐项请求批准。请只在信任当前任务及所用工具时启用；完成后可在权限菜单中切回「工作区内修改」或「仅可查看」。'
  },
  auto: {
    title: '要启用自动审查吗？',
    description: 'DSH 将在无沙箱限制的环境中运行，由当前模型在工具执行前自动审查。启用后：',
    rows: [
      ['review', '模型自动审查', '每次工具调用前，由同一模型自动审查操作'],
      ['folder', '完整文件系统访问', '通过审查的操作可读取、修改或删除工作区以外的文件'],
      ['terminal', '命令与网络操作', '通过审查的操作可运行终端命令、访问网络和发送数据']
    ],
    warning: '自动审查是实验性能力，模型可能误判。它不提供沙箱隔离，仍有数据丢失或泄露的风险。',
    help: '自动审查由模型判断工具操作，不能保证识别所有风险，也不等同于你的逐项批准。需要限制文件访问时，请在权限菜单中选择「工作区内修改」或「仅可查看」。'
  }
};

function PermissionRiskIcon({ name, ...props }) {
  const common = { viewBox: '0 0 24 24', width: 24, height: 24, fill: 'none', 'aria-hidden': true, ...props };
  if (name === 'folder') return h('svg', common,
    h('path', { d: 'M2 7a3 3 0 0 1 3-3h4l2 2h8a3 3 0 0 1 3 3v2H2Z', fill: '#4c9eff' }),
    h('path', { d: 'M2 10h20v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z', fill: '#74c6ff' }));
  if (name === 'terminal') return h('svg', common,
    h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 4, fill: '#bdbdbd' }),
    h('path', { d: 'm7.5 9 3 3-3 3m6-1h3', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
  if (name === 'globe') return h('svg', { ...common, stroke: '#4ed0f1', strokeWidth: 1.8 },
    h('circle', { cx: 12, cy: 12, r: 9 }), h('ellipse', { cx: 12, cy: 12, rx: 3.6, ry: 9 }), h('path', { d: 'M3 12h18' }));
  if (name === 'review') return h('svg', { ...common, stroke: '#aabaff', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'm12 2 8 3.5v6c0 4.5-3.7 7.8-8 10.5-4.3-2.7-8-6-8-10.5v-6Z' }), h('path', { d: 'm8.5 11.5 2.5 2.5 4.5-5' }));
  return h('svg', { ...common, stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'm10.4 3.7-8 14A1.8 1.8 0 0 0 4 20.4h16a1.8 1.8 0 0 0 1.6-2.7l-8-14a1.8 1.8 0 0 0-3.2 0Z' }),
    h('path', { d: 'M12 8v5m0 3v.2' }));
}

function PermissionRiskDialog({ value, disabled, focusTarget, onCancel, onConfirm }) {
  const copy = PERMISSION_RISK_COPY[value];
  const id = useId();
  const dialog = useRef(null);
  const cancel = useRef(null);
  const [help, setHelp] = useState(false);
  useLayoutEffect(() => {
    const previous = focusTarget?.current || document.activeElement;
    const element = dialog.current;
    element.showModal();
    cancel.current.focus({ preventScroll: true });
    return () => {
      element.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const close = () => { if (!disabled) onCancel(); };
  return createPortal(h('dialog', {
    ref: dialog, className: 'dsc-ui dsc-permission-dialog', 'data-mode': value,
    'aria-labelledby': id + '-title', 'aria-describedby': id + '-description ' + id + '-warning',
    onCancel: event => { event.preventDefault(); close(); },
    onClick: event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }
  },
    h('div', { className: 'dsc-permission-dialog__heading' },
      h(PermissionRiskIcon, { name: value === 'auto' ? 'review' : 'warning', width: 18, height: 18 }),
      h('h2', { id: id + '-title' }, copy.title),
      value === 'auto' && h('span', { className: 'dsc-permission-dialog__badge' }, '实验性')),
    h('p', { id: id + '-description', className: 'dsc-permission-dialog__description' }, copy.description),
    h('ul', { className: 'dsc-permission-dialog__capabilities' }, copy.rows.map(([icon, title, detail]) =>
      h('li', { key: icon }, h(PermissionRiskIcon, { name: icon }),
        h('div', null, h('strong', null, title), h('span', null, detail))))),
    h('p', { id: id + '-warning', className: 'dsc-permission-dialog__warning' }, copy.warning,
      h('button', { type: 'button', className: 'dsc-permission-dialog__more', 'aria-expanded': help, 'aria-controls': id + '-help', onClick: () => setHelp(!help) }, '了解更多')),
    help && h('p', { id: id + '-help', className: 'dsc-permission-dialog__help' }, copy.help),
    h('div', { className: 'dsc-permission-dialog__actions' },
      h('button', { ref: cancel, type: 'button', className: 'dsc-permission-dialog__cancel', disabled, onClick: close }, '取消'),
      h('button', { type: 'button', className: 'dsc-permission-dialog__confirm', disabled, onClick: () => { if (!disabled) onConfirm(); } },
        h(PermissionRiskIcon, { name: 'warning', width: 16, height: 16 }), '确认'))), document.body);
}

function makePermissionPicker(ctx, directory) {
  return function PermissionPicker({ sessionId, useProjection, locked }) {
    const selection = useProjection('permissions');
    const catalog = useSource(directory.store);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [help, setHelp] = useState(false);
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
    useEffect(() => { setOpen(false); setConfirmation(null); }, [catalog.revision, locked, sessionId]);
    // 不用消失的控件掩盖目录失败；没有真实会话投影时只显示状态，不伪造可选权限。
    if (!selection) return h('span', { className: 'dsc-ui dsc-control-status', role: 'status', title: '宿主尚未提供此会话的权限状态' }, h(Icon, { name: 'shield' }), '权限未就绪');
    if (!catalog.value) return h('span', { className: 'dsc-ui dsc-control-status', role: 'status' }, h(Icon, { name: 'shield' }), catalog.error ? '权限加载失败' : '权限加载中…', catalog.error && h('button', { type: 'button', onClick: directory.refresh, title: catalog.error }, '重试'));
    const options = catalog.value.options;
    const current = options.find(x => x.value === selection.currentValue);
    const currentCopy = current ? permissionCopy(current) : permissionCopy({ value: selection.currentValue });
    const submit = async value => {
      const binding = ctx.sessions.binding(sessionId);
      if (!binding || locked || busy || !options.some(x => x.value === value)) return;
      setBusy(true); setError('');
      try {
        const result = await binding.session.command('/permission ' + value);
        if (!result.ok) throw result.error;
        if (!result.value.matched) throw new Error('宿主没有接受权限命令');
      } catch (e) { if (alive.current) setError(errorText(e)); }
      finally { if (alive.current) setBusy(false); }
    };
    const choose = value => {
      if (value === selection.currentValue) { setOpen(false); return; }
      if (value === 'danger-full-access' || value === 'auto') { setOpen(false); setConfirmation(value); return; }
      setOpen(false); submit(value);
    };
    return h('div', { className: 'dsc-ui dsc-permission' },
      h('button', { type: 'button', ref: anchor, className: 'dsc-pill', 'data-warning': selection.currentValue === 'danger-full-access', title: '更改权限', disabled: locked || busy, 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) }, h(Icon, { name: 'shield' }), busy ? '保存中…' : currentCopy.title),
      open && h(Popover, { anchor, onClose: () => setOpen(false), label: '更改权限', width: 322, className: 'dsc-permission-menu' },
        h('div', { className: 'dsc-permission-heading' }, h('span', null, '应如何批准 DSH 操作？'), h('button', { type: 'button', 'aria-expanded': help, onClick: () => setHelp(!help) }, '了解更多')),
        help && h('p', { className: 'dsc-permission-help' }, '权限决定 DSH 可执行的操作范围。选择完全访问或自动审查时，请阅读确认说明；每个选项的具体范围见下方描述。'),
        options.map(option => {
          const copy = permissionCopy(option);
          return h(Option, { key: option.value, title: copy.title, detail: copy.description, icon: 'shield', warning: option.value === 'danger-full-access', selected: option.value === selection.currentValue, onClick: () => choose(option.value) });
        })),
      h(ErrorLine, { text: error }),
      confirmation && h(PermissionRiskDialog, { value: confirmation, disabled: locked || busy, focusTarget: anchor,
        onCancel: () => setConfirmation(null), onConfirm: () => { const value = confirmation; setConfirmation(null); submit(value); } }));
  };
}

function ReasoningSlider({ levels, index, modelName, pending, onCommit, onSelectModel, onReset }) {
  const [preview, setPreview] = useState(index);
  const [dragging, setDragging] = useState(false);
  const [burst, setBurst] = useState(0);
  const track = useRef(null);
  const current = useRef(index);
  const target = useRef(null);
  const count = levels.length;
  // 提交期间宿主状态可能先回旧档再落到新档；锁定目标档位，避免预览被中途值拉回造成闪烁。
  useEffect(() => {
    if (dragging) return;
    const wanted = target.current;
    if (wanted === null) { current.current = index; setPreview(index); return; }
    if (index === wanted) { target.current = null; current.current = index; setPreview(index); return; }
    if (pending) return;
    const timer = setTimeout(() => {
      if (target.current !== null && !pending) {
        target.current = null;
        current.current = index;
        setPreview(index);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [index, dragging, pending]);
  const stars = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ left: `${8 + (i * 37) % 85}%`, top: `${22 + (i * 29) % 57}%`, width: `${1.2 + (i % 5) * .24}px`, height: `${1.2 + (i % 5) * .24}px`, '--dx': `${12 + i % 13}px`, '--dy': `${2 + i % 5}px`, '--pdur': `${2.6 + (i % 9) * .2}s`, '--pdelay': `${-(i % 6) * .7}s` })), []);
  const ratio = count > 1 ? preview / (count - 1) : 0;
  const level = levels[preview];
  const update = next => {
    const n = Math.max(0, Math.min(count - 1, next));
    if (levels[n].id === 'max' && levels[current.current]?.id !== 'max') setBurst(x => x + 1);
    current.current = n; setPreview(n);
  };
  const fromPointer = e => { const box = track.current.getBoundingClientRect(); return Math.round(Math.max(0, Math.min(1, (e.clientX - box.left - 14) / Math.max(1, box.width - 28))) * (count - 1)); };
  const commit = () => {
    if (pending || levels[current.current].id === levels[index]?.id) return;
    target.current = current.current;
    onCommit(levels[current.current]);
  };
  return h('div', { className: 'dsc-reasoning', 'data-level': level.id },
    h('button', { type: 'button', className: 'dsc-reasoning-reset', 'aria-disabled': pending ? 'true' : undefined, onClick: () => { if (!pending) onReset(); }, title: '重置为默认推理强度', 'aria-label': '重置为默认推理强度' }, h('svg', { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: 'M13.2 8a5.2 5.2 0 1 1-1.6-3.7M13.4 2.7v2.9h-2.9' }))),
    h('div', { className: 'dsc-reasoning-heading' }, h('strong', null, level.name), h('button', { type: 'button', className: 'dsc-reasoning-model', onClick: () => { if (!pending) onSelectModel(); }, 'aria-disabled': pending ? 'true' : undefined, title: '修改模型' }, modelName, h(Icon, { name: 'chevron', size: 11, style: { transform: 'rotate(-90deg)' } }))),
    h('div', { ref: track, role: 'slider', tabIndex: pending ? -1 : 0, className: 'dsc-slider', 'data-level': level.id, 'aria-label': '思考强度', 'aria-valuemin': 0, 'aria-valuemax': count - 1, 'aria-valuenow': preview, 'aria-valuetext': level.name, 'aria-disabled': !!pending,
      style: { '--ratio': ratio, '--fill-ratio': `calc((14px + (100% - 28px) * ${ratio}) / 100%)` },
      onPointerDown: e => { if (pending) return; e.preventDefault(); e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); update(fromPointer(e)); },
      onPointerMove: e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) update(fromPointer(e)); },
      onPointerUp: e => { if (!e.currentTarget.hasPointerCapture(e.pointerId)) return; update(fromPointer(e)); e.currentTarget.releasePointerCapture(e.pointerId); setDragging(false); commit(); },
      onPointerCancel: e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); setDragging(false); current.current = index; setPreview(index); },
      onKeyDown: e => { if (pending) return; const n = e.key === 'Home' ? 0 : e.key === 'End' ? count - 1 : ['ArrowLeft', 'ArrowDown'].includes(e.key) ? current.current - 1 : ['ArrowRight', 'ArrowUp'].includes(e.key) ? current.current + 1 : null; if (n === null) return; e.preventDefault(); e.stopPropagation(); update(n); commit(); } },
      h('div', { className: 'dsc-slider-track' }, h('div', { className: 'dsc-slider-fill', style: { transform: `scaleX(${.061 + .939 * ratio})` } }), h('div', { className: 'dsc-slider-max' }), h('div', { className: 'dsc-stars' }, stars.map((style, i) => h('i', { key: i, style })))),
      levels.map((x, i) => h('span', { key: x.id ?? 'default', className: 'dsc-tick' + (i <= preview ? ' is-on' : ''), 'aria-hidden': true, style: { left: `calc(14px + (100% - 28px) * ${count > 1 ? i / (count - 1) : 0})` } })),
      h('div', { className: 'dsc-thumb-position', style: { transform: `translateX(calc((100% - 28px) * ${ratio}))` } }, h('span', { className: 'dsc-thumb' }), burst > 0 && level.id === 'max' && h('span', { key: burst, className: 'dsc-burst' }, Array.from({ length: 12 }, (_, i) => h('i', { key: i, style: { '--bx': `${Math.cos(i * Math.PI / 6) * 27}px`, '--by': `${Math.sin(i * Math.PI / 6) * 27}px` } }))))),
    h('span', { className: 'dsc-sr-only', role: 'status' }, pending ? '正在保存…' : level.description || level.name));
}

// 模型控件渲染异常时在页面内显示原因，避免静默让位给宿主原生控件。
class ModelPickerBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('codex-style: 模型控件渲染失败', error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    const message = this.state.error?.message || String(this.state.error);
    return h('div', { className: 'dsc-ui dsc-error', role: 'alert', style: { maxWidth: 360 } }, `模型控件渲染失败：${message}`);
  }
}

function makeModelPicker(ctx) {
  function ModelPicker({ sessionId, locked, directory }) {
    const rawState = useSource(directory.store);
    const state = { current: rawState?.current ?? null, groups: rawState?.groups ?? [], failures: rawState?.failures ?? [], status: rawState?.status, error: rawState?.error, pending: rawState?.pending, retainedEffort: rawState?.retainedEffort };
    const [pane, setPane] = useState(null);
    const [shown, setShown] = useState(null);
    const [closing, setClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const alive = useRef(true);
    const subagent = ctx.sessions.subagentAddress(sessionId) !== undefined;
    useEffect(() => { alive.current = true; if (!subagent && typeof directory.load === 'function') directory.load().catch(e => { if (alive.current) setError(errorText(e)); }); return () => { alive.current = false; }; }, [directory, subagent]);
    const hasCurrent = state.current !== null;
    useEffect(() => { if (locked || !hasCurrent) setPane(null); }, [locked, hasCurrent]);
    // 关闭时保留一小段淡出，避免弹层硬切除；视图切换由 Popover 的 key 重放进场动画。
    useEffect(() => {
      if (pane) { setShown(pane); setClosing(false); return; }
      if (!shown) return;
      setClosing(true);
      const timer = setTimeout(() => { setShown(null); setClosing(false); }, 160);
      return () => clearTimeout(timer);
    }, [pane, shown]);
    const current = state.current;
    const group = state.groups.find(x => x.id === current?.provider);
    const model = group?.models?.find(x => x.id === current?.model);
    const reasoning = model?.reasoning;
    const levels = reasoning ? [...(reasoning.defaultEffort === undefined ? [{ id: undefined, name: '默认' }] : []), ...(reasoning.efforts ?? [])] : [];
    const index = Math.max(0, levels.findIndex(x => x.id === (current?.reasoningEffort ?? reasoning?.defaultEffort)));
    const pending = !!state.pending;
    const select = async selection => {
      if (locked || pending || subagent) return false;
      setError('');
      try { const result = typeof directory.select === 'function' ? await directory.select(selection) : { ok: false, error: new Error('当前宿主不支持切换模型') }; if (!result.ok) throw result.error; return true; }
      catch (e) { if (alive.current) setError(errorText(e)); return false; }
    };
    if (subagent) return null;
    return h('div', { className: 'dsc-ui dsc-model' }, h('button', { ref: anchor, type: 'button', className: 'dsc-pill dsc-model-trigger', disabled: locked, 'aria-haspopup': 'dialog', 'aria-expanded': pane !== null, 'aria-busy': pending, title: '选择推理强度', onClick: () => setPane(pane ? null : reasoning ? 'effort' : 'root') },
      model ? h(React.Fragment, null,
        h('span', { className: 'dsc-model-name' }, model.name),
        levels[index] && h('span', { className: 'dsc-effort-name' }, levels[index].name)) : h('span', { className: 'dsc-model-name' }, '选择模型'), h(Icon, { name: 'chevron', size: 12 })),
      shown && h(Popover, { key: shown, anchor, onClose: () => setPane(null), width: shown === 'effort' ? 255 : 330, label: shown === 'effort' ? '选择推理强度' : '修改模型', role: 'dialog', className: (shown === 'effort' ? 'dsc-reasoning-pop' : 'dsc-model-panel') + (closing ? ' dsc-menu-closing' : '') },
        shown === 'effort' ? (model && levels.length ? h(ReasoningSlider, { levels, index, modelName: model.name, pending, onSelectModel: () => setPane('root'), onReset: () => select({ provider: current.provider, model: current.model, ...(reasoning.defaultEffort === undefined ? {} : { reasoningEffort: reasoning.defaultEffort }) }), onCommit: level => select({ provider: current.provider, model: current.model, ...(level.id === undefined ? {} : { reasoningEffort: level.id }) }) }) : h('div', { className: 'dsc-empty' }, pending ? '正在加载推理档位…' : '该模型暂无可用的推理档位')) : h(React.Fragment, null,
          h('div', { className: 'dsc-menu-heading' }, '修改模型'),
          h('input', { className: 'dsc-model-search', placeholder: '搜索模型或渠道', value: query, readOnly: pending, onChange: e => setQuery(e.target.value) }),
          state.groups.map(g => {
            const models = (g.models ?? []).filter(m => `${g.name} ${m.name}`.toLowerCase().includes(query.toLowerCase()));
            return models.length ? h('section', { key: g.id }, h('div', { className: 'dsc-model-group' }, g.name), models.map(m => h(Option, { key: m.id, title: m.name, detail: m.description, selected: g.id === current?.provider && m.id === current?.model, disabled: pending, onClick: async () => { const isCurrent = g.id === current?.provider && m.id === current?.model; if (isCurrent) { const currentReasoning = m.reasoning; const hasLevels = currentReasoning ? (currentReasoning.defaultEffort === undefined ? 1 : 0) + (currentReasoning.efforts?.length ?? 0) : 0; setPane(hasLevels > 0 ? 'effort' : null); return; } const ok = await select({ provider: g.id, model: m.id, ...(m.reasoning?.defaultEffort === undefined ? {} : { reasoningEffort: m.reasoning.defaultEffort }) }); if (!ok) return; const snapshot = directory.store.getSnapshot(); const nextReasoning = (snapshot?.groups ?? []).find(item => item.id === g.id)?.models?.find(item => item.id === m.id)?.reasoning; const nextLevels = nextReasoning ? (nextReasoning.defaultEffort === undefined ? 1 : 0) + (nextReasoning.efforts?.length ?? 0) : 0; setPane(nextLevels > 0 ? 'effort' : null); } }))) : null;
          }),
          state.status === 'loading' && h('div', { className: 'dsc-empty' }, '正在加载模型…'),
          !state.groups.length && state.status !== 'loading' && h('div', { className: 'dsc-empty' }, '暂无可用模型'),
          state.failures.map(f => h(ErrorLine, { key: f.id, text: `${f.name}: ${f.message}` }))),
        h(ErrorLine, { text: error || state.error })),
      !pane && h(ErrorLine, { text: error || state.error }));
  }
  return function ModelPickerGuard(props) {
    if (!props.directory || !props.directory.store) return h('span', { className: 'dsc-ui dsc-control-status' }, '模型目录未就绪');
    return h(ModelPickerBoundary, null, h(ModelPicker, props));
  };
}

function apply(ctx) {
  console.warn('[codex-style] apply 开始 v' + PLUGIN_VERSION);
  ctx.inject(['remote', 'remote.pluginInventory'], scope => scope.effect(() => watchCodexPresentation(scope), 'codex-style: presentation component states'));
  // 社区版提醒：每次主客户端激活最多一次；官方环境、读取失败、提前卸载均不显示。
  const communityNotice = createCommunityNotice();
  let communityNoticeShown = false;
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:community-notice' }, () => h(CommunityNotice, { notice: communityNotice })));
  ctx.inject(['remote', 'remote.codexStyleEnvironment'], scope => scope.effect(() => {
    let active = true;
    Promise.resolve(scope.remote.codexStyleEnvironment.status()).then(result => {
      if (!active || communityNoticeShown || result?.community !== true) return;
      communityNoticeShown = true;
      communityNotice.show(COMMUNITY_NOTICE_TEXT);
    }).catch(error => { if (active) console.warn('codex-style: 无法读取运行环境', error); });
    return () => { active = false; communityNotice.clear(); };
  }, 'codex-style: community notice'));
  const tokenValues = {
    '--dsw-alias-bg-base': '#181818', '--dsw-alias-bg-layer-1': '#212121', '--dsw-alias-bg-layer-2': '#282828', '--dsw-alias-bg-layer-3': '#2d2d2d', '--dsw-alias-bg-overlay': '#282828',
    '--dsw-alias-bg-module-platform': '#212121', '--dsw-alias-label-primary': '#fff', '--dsw-alias-label-secondary': 'rgba(255,255,255,.7)', '--dsw-alias-label-tertiary': 'rgba(255,255,255,.5)',
    '--dsw-alias-label-caption': 'rgba(255,255,255,.5)', '--dsw-alias-label-dimmed': 'rgba(255,255,255,.32)', '--dsw-alias-label-primary-dimmed': 'rgba(255,255,255,.6)', '--dsw-alias-label-primary-bluish': '#eef3ff', '--dsw-alias-label-primary-inverted': '#131313',
    // 本版始终呈现深色；宿主 preference=system/light 时也要成对覆盖按钮背景与文字。
    '--dsw-alias-button-elevated-fill': 'var(--cx-active)', '--dsw-alias-button-floating-hover': 'rgba(255,255,255,.12)',
    '--dsw-alias-border-l1': 'rgba(255,255,255,.08)', '--dsw-alias-border-l2': 'rgba(255,255,255,.08)', '--dsw-alias-border-l3': 'rgba(255,255,255,.12)', '--dsw-alias-border-l4': 'rgba(255,255,255,.16)',
    '--dsw-alias-brand-primary': '#0285ff', '--dsw-alias-link': '#339cff', '--dsw-alias-interactive-bg-hover': 'rgba(255,255,255,.08)', '--dsw-alias-interactive-bg-hover-solid': '#282828',
    // 2026-10-23 按用户 Codex 截图采样：顶栏/窗口 chrome #202020、用户气泡 #222222（对话区保持 #181818）。
    '--dsw-specific-sidebar-fill': '#202020', '--dsw-specific-bubble': '#222222', '--dsw-specific-input-major': 'rgba(55,55,55,.94)', '--dsw-specific-menu': '#2d2d2d', '--dsw-specific-selector': 'transparent',
    // 设置页左栏与侧栏导航项：light 主题下宿主给浅色底，插件把文字固定为白色，会成白底白字；这里按宿主暗色主题成对补齐。
    '--dsw-specific-sidebar-nav-item-active': '#43454a', '--dsw-specific-sidebar-nav-item-hover': '#2c2c2e', '--dsw-specific-sidebar-nav-item-active-accent': '#353638',
    // markdown 代码外观：light 主题下 inline code / 代码块顶栏也是浅底，需一并转成与对话背景有区分的深色。
    '--dsw-alias-markdown-code-block': '#212121', '--dsw-alias-markdown-inline-code': '#292929', '--dsw-alias-markdown-code-block-banner': '#2c2c2e',
    '--dsw-alias-markdown-code-segment-selected': '#353638', '--dsw-alias-markdown-code-segment-unselected': '#1b1b1c',
    '--dsw-alias-state-business-primary': '#339cff', '--dsw-alias-state-business-tertiary': '#0285ff26', '--dsw-alias-state-error-primary': '#ff6764', '--dsw-alias-state-warn-primary': '#ff8549', '--dsw-alias-state-warn-secondary': '#ff8549bb', '--dsw-alias-state-warn-tertiary': '#ff854926',
    '--dsw-alias-scrollbar-bg-l1': '#ffffff26', '--dsw-alias-scrollbar-bg-l2': '#ffffff32', '--dsw-alias-scrollbar-hover-l2': '#ffffff59',
    '--dsw-radius-panel': '25px', '--dsw-menu-surface-fill': '#2d2d2d', '--dsw-elevation-soft': '0 0 0 .5px rgba(255,255,255,.16),0 3px 8px #0000000a'
  };
  ctx.effect(() => ctx.theme.overrideTokens(PLUGIN_ID, Object.fromEntries(Object.entries(tokenValues).map(([k, v]) => [k, { light: v, dark: v }]))), 'codex-style: theme');
  // 宿主偏好是 system 且系统为浅色时只会启用 light 色板；组件私有的 light/dark 分支（如变更卡的 --changes-fill）
  // 不在 token 覆盖范围内。注册并保持一个暗色主题，让 data-ds-dark-theme 生效，再用上面的 token 层覆盖 Codex 配色。
  const DARK_THEME_ID = 'dsh-codex-dark';
  ctx.effect(() => {
    let disposeTheme;
    try {
      disposeTheme = ctx.theme.register({ id: DARK_THEME_ID, colorScheme: 'dark', tokens: {} });
    } catch (error) {
      // 注册失败时退回纯 token 覆盖，不影响插件其余部分。
      console.warn('codex-style: 暗色主题注册失败', error);
      return () => {};
    }
    const previous = ctx.theme.getTheme()?.preference;
    const keep = snapshot => {
      if (snapshot?.preference === DARK_THEME_ID) return;
      try { ctx.theme.setTheme(DARK_THEME_ID); } catch (error) { console.warn('codex-style: 无法启用内置暗色主题', error); }
    };
    keep(ctx.theme.getTheme());
    const off = ctx.on('theme/change', keep);
    return () => {
      off();
      try { if (previous !== undefined && previous !== DARK_THEME_ID) ctx.theme.setTheme(previous); } catch (error) { console.warn('codex-style: 恢复原主题失败', error); }
      disposeTheme();
    };
  }, 'codex-style: dark theme');
  ctx.effect(() => {
    const previous = document.body.getAttribute('data-dsh-codex-style');
    document.body.setAttribute('data-dsh-codex-style', PLUGIN_VERSION);
    const style = document.createElement('style'); style.dataset.dshCodexStyle = PLUGIN_VERSION; style.textContent = CSS_TEXT; document.head.appendChild(style);
    const skillsStyle = document.createElement('style'); skillsStyle.dataset.dshCodexSkills = PLUGIN_VERSION; skillsStyle.textContent = SKILLS_CSS_TEXT; document.head.appendChild(skillsStyle);
    return () => { style.remove(); skillsStyle.remove(); if (previous === null) document.body.removeAttribute('data-dsh-codex-style'); else document.body.setAttribute('data-dsh-codex-style', previous); };
  }, 'codex-style: stylesheet');
  registerSkillsPage(ctx);
  const register = (scope, name, component, inject) => scope.slots.inject(name, () => {
    const priorities = scope.slots.entries(name).map(entry => entry.options.priority ?? 0);
    return scope.slots.register({ name, priority: Math.min(0, ...priorities) - 1, ...(inject ? { inject } : {}) }, component);
  });
  const components = {
    'sidebar.brand.mark': () => h('img', { className: 'dsc-brand-mark', src: BRAND_MARK, alt: '' }),
    'sidebar.brand.name': () => h('span', { className: 'dsc-ui dsc-brand' }, h('strong', null, 'deepseek'), h('small', null, 'HARNESS')),
    'settings.trigger': () => h('span', { className: 'dsc-ui dsc-settings-trigger' }, h(Icon, { name: 'settings', size: 18 }), '设置')
  };
  for (const [name, component] of Object.entries(components)) register(ctx, name, component);
  const updates = createPluginUpdateService(PLUGIN_VERSION);
  ctx.inject(['remote'], scope => scope.effect(() => mountPluginUpdateRemote(scope), 'codex-style: update remote methods'));
  ctx.inject(['remote', 'remote.codexStyleUpdates'], scope => scope.effect(() => updates.connect(scope.remote.codexStyleUpdates), 'codex-style: update download and install'));
  ctx.effect(() => { updates.start(); return () => updates.dispose(); }, 'codex-style: automatic update check');
  ctx.slots.inject('plugins.detail.actions', () => ctx.slots.register({ name: 'plugins.detail.actions', id: 'codex-style:check-update' }, props => h(PluginUpdateAction, { ...props, updates })));
  ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'codex-style:support' }, PluginSupportSection));
  ctx.inject(['pluginNavigation'], scope => scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:update-notice' }, () => h(PluginUpdateNotice, { updates, onOpen: () => scope.reflect.get('pluginNavigation').openBundle(PLUGIN_PACKAGE) }))));
  // 等各区域自己的服务就绪；权限 RPC 的命名空间不能由 remote 根服务存在来推断。
  ctx.inject(['sessions', 'uiSession', 'workspaces', 'uiWorkspace', 'layout', 'shortcuts', 'remote', 'locale', 'pluginNavigation'], scope => {
    const sidebar = createSidebarPresentation();
    scope.effect(() => () => sidebar.dispose(), 'codex-style: sidebar presentation');
    register(scope, 'sidebar.workspaces', makeSidebarChrome(scope, sidebar));
    scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:shell' }, makeShellChrome(scope, sidebar)));
    register(scope, 'conversation.header.leading', makeCollapsedNewChat(scope));
  });
  ctx.inject(['modules', 'locale', 'remote', 'remote.account'], scope => register(scope, 'settings.launcher', makeGearLauncher(scope)));
  const desktopUpdates = createDesktopUpdateSource();
  ctx.effect(() => desktopUpdates.start(globalThis.dshDesktop), 'codex-style: desktop update carrier');
  // 原生设置行指示器随被隐藏的宿主侧栏不可见；侧栏展开键上的蓝点由公开单槽位让给蓝圆入口。
  register(ctx, 'sidebar.toggle.badge', () => null);
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:desktop-update' }, () => createPortal(h('div', { className: 'dsc-ui dsc-desktop-update-launcher' }, h(DesktopUpdateRailButton, { source: desktopUpdates })), document.body)));
  ctx.inject(['workspaces'], scope => {
    register(scope, 'conversation.hero.brand.mark', EmptyHero);
    register(scope, 'conversation.hero.workspace', makeHeroWorkspace(scope));
  });
  // 由宿主等待目录、释放旧目录并在恢复后重新注册；保留 Session Remote 的访问声明。
  ctx.inject(['sessions', 'slots', 'locale', 'remote', 'remote.session', 'modelDirectories'], scope => {
    const directories = scope.modelDirectories;
    register(scope, 'conversation.input.model', makeModelPicker(scope), sessionId => ({ directory: directories.directoryFor(sessionId) }));
  });
  ctx.inject(['connection', 'sessions', 'remote', 'remote.permissionPresets'], scope => {
    const permissions = permissionDirectory(scope);
    scope.effect(() => () => permissions.dispose(), 'codex-style: permission directory');
    register(scope, 'conversation.input.permission', makePermissionPicker(scope, permissions));
  });
  // 对话正文列与重绘后的输入框对齐：直接测量输入框卡片的视觉宽度并同步给正文列，
  // 避免宿主变量（正文 +32px）与实际渲染的卡宽不一致。
  ctx.effect(() => {
    let frame = 0;
    let card;
    const anchor = '[data-slot="conversation.composer.bar"], [data-composer-card]';
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
    const sync = () => {
      frame = 0;
      const current = document.querySelector('[data-slot="conversation.composer.bar"] [data-composer-card]');
      if (current !== card) {
        if (card) observer.unobserve(card);
        card = current;
        if (card) observer.observe(card);
      }
      const width = card?.getBoundingClientRect().width;
      const value = width > 0 ? `${Math.round(width)}px` : '';
      const style = document.documentElement.style;
      if (style.getPropertyValue('--dsc-composer-visual-width') !== value) {
        if (value) style.setProperty('--dsc-composer-visual-width', value);
        else style.removeProperty('--dsc-composer-visual-width');
      }
    };
    // 只在卡片挂载/替换时重绑尺寸观察；流式文本与其他节点变化不触发全页测量。
    const mounting = new MutationObserver(records => {
      if ((card && !card.isConnected) || records.some(record => [...record.addedNodes].some(node =>
        node.nodeType === 1 && (node.matches(anchor) || node.querySelector(anchor))))) schedule();
    });
    mounting.observe(document.body, { childList: true, subtree: true });
    schedule();
    return () => {
      observer.disconnect();
      mounting.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--dsc-composer-visual-width');
    };
  }, 'codex-style: composer width sync');
}
exports.name = 'codex-style';
exports.inject = ['slots', 'theme'];
exports.apply = apply;
