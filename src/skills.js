// 技能页：直接消费本插件 Host 半提供的 codexStyleSkills 只读目录/正文，不复制宿主技能数据。
// 页面只新增“展示 + 导航 + 草稿初始化”，不提供启停、卸载、安装或 frontmatter 编辑。
const SKILLS_PANEL_ID = 'codex-style-skills';
const SKILLS_PACKAGE = '@xinxing1708/dsh-codex-style';
const SKILLS_PAGE_SIZE = 6;

const SKILL_SOURCE_GROUPS = [
  { id: 'project', label: '项目', sources: ['project-dsh', 'project-agents'] },
  { id: 'personal', label: '个人', sources: ['user-dsh', 'user-agents', 'custom'] },
  { id: 'bundled', label: '内置', sources: ['bundled'] }
];
const SKILL_SOURCE_GROUP_OTHER = { id: 'other', label: '其他来源' };

function mountSkillsRemote(ctx) {
  const { z } = require('zod');
  const scope = z.object({ sessionId: z.string().optional(), cwd: z.string().optional() }).passthrough();
  const skill = z.object({
    name: z.string(), description: z.string(), whenToUse: z.string().optional(), path: z.string().optional(),
    invocation: z.object({ modelInvocable: z.boolean(), userInvocable: z.boolean() }).passthrough(),
    source: z.string(), provider: z.string()
  }).passthrough();
  const catalog = z.object({
    skills: z.array(skill), complete: z.boolean(), unavailable: z.string().optional(),
    scope: z.object({ cwd: z.string().optional(), session: z.boolean().optional(), preset: z.string().optional() }).passthrough().optional()
  }).passthrough();
  const definition = z.union([z.null(), skill.extend({ content: z.string() }).passthrough()]);
  return ctx.remote.$mount({
    package: SKILLS_PACKAGE,
    descriptors: [
      { id: SKILLS_PACKAGE + '#codexStyleSkills/catalog', service: 'codexStyleSkills', namespace: 'codexStyleSkills', method: 'catalog', invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-scope', create: () => scope, jsonSchema: { type: 'object' } } }],
        result: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-catalog', create: () => catalog } },
      { id: SKILLS_PACKAGE + '#codexStyleSkills/content', service: 'codexStyleSkills', namespace: 'codexStyleSkills', method: 'content', invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-content-request', create: () => z.object({ name: z.string(), sessionId: z.string().optional(), cwd: z.string().optional() }).passthrough(), jsonSchema: { type: 'object' } } }],
        result: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-content', create: () => definition } }
    ]
  });
}

function unwrapRemote(answer) {
  if (answer !== null && typeof answer === 'object' && 'ok' in answer) {
    if (!answer.ok) throw new Error(answer.error?.message || '技能服务返回错误');
    return answer.value;
  }
  return answer;
}

/**
 * Resolve the visible scope. No retained main Session means the global catalog, never a guessed project;
 * `agentPreset` rides along so a new draft keeps a preset that carries this skill.
 */
function skillScopeOf(ctx) {
  const sessions = ctx.sessions.list.getSnapshot();
  const workspaces = ctx.workspaces.list.getSnapshot();
  const byId = sessions.byId || {};
  const sessionId = (sessions.ids || []).find(id => (byId[id]?.retainedBy?.mainView ?? 0) > 0);
  if (sessionId === undefined) return { cwd: undefined, workspaceTitle: '' };
  const workspace = (workspaces.items || []).find(row => row.sessionIds?.includes(sessionId));
  const summary = byId[sessionId] || {};
  return {
    sessionId,
    cwd: summary.cwd,
    workspaceId: workspace?.workspaceId,
    workspaceTitle: workspace?.title || workspace?.path || '',
    agentPreset: summary.projectionValues?.agentPreset
  };
}

function scopeKeyOf(scope) { return JSON.stringify([scope.sessionId ?? null, scope.cwd ?? null]); }
function scopeRequest(scope) {
  return { ...(scope.sessionId === undefined ? {} : { sessionId: scope.sessionId }), ...(scope.cwd === undefined ? {} : { cwd: scope.cwd }) };
}

function createSkillsController(ctx) {
  const initialScope = skillScopeOf(ctx);
  const store = createSnapshotStore({ phase: 'idle', skills: [], complete: true, unavailable: '', error: '', refreshing: false, scope: initialScope, scopeKey: scopeKeyOf(initialScope) });
  let generation = 0;
  let disposed = false;
  // 作用范围一变就丢弃旧范围的数据；详情由页面按 scopeKey 关闭，避免同名技能串正文。
  const syncScope = scope => {
    const key = scopeKeyOf(scope);
    const current = store.getSnapshot();
    if (key === current.scopeKey) return current;
    const next = { ...current, scope, scopeKey: key, skills: [], complete: true, unavailable: '', error: '', phase: current.phase === 'idle' ? 'idle' : 'loading' };
    store.set(next);
    return next;
  };
  const load = async () => {
    if (disposed) return;
    const scope = skillScopeOf(ctx);
    syncScope(scope);
    const key = scopeKeyOf(scope);
    const current = generation += 1;
    store.set({ ...store.getSnapshot(), refreshing: true, error: '', unavailable: '' });
    try {
      const remote = ctx.remote?.codexStyleSkills;
      if (remote === undefined) {
        if (!disposed && current === generation) store.set({ ...store.getSnapshot(), phase: 'unavailable', unavailable: '技能服务尚未就绪', refreshing: false });
        return;
      }
      const value = unwrapRemote(await remote.catalog(scopeRequest(scope)));
      if (disposed || current !== generation) return;
      const latest = store.getSnapshot();
      if (latest.scopeKey !== key) return;
      // complete=false 只代表来源不完整；同 scope 已有一份成功数据时保留它并提示。
      const keepPrevious = value.complete === false && latest.skills.length > 0;
      store.set({ ...latest, phase: 'ready', skills: keepPrevious ? latest.skills : (value.skills || []), complete: value.complete !== false, unavailable: '', error: '', refreshing: false });
    } catch (error) {
      if (disposed || current !== generation) return;
      const latest = store.getSnapshot();
      if (latest.scopeKey !== key) return;
      const message = error?.message || String(error);
      store.set({ ...latest, phase: latest.skills.length > 0 ? 'ready' : 'error', error: message, refreshing: false });
    }
  };
  const content = async (skill, scope) => {
    const remote = ctx.remote?.codexStyleSkills;
    if (remote === undefined) throw new Error('技能服务尚未就绪');
    return unwrapRemote(await remote.content({ name: skill.name, ...scopeRequest(scope) }));
  };
  return { store, load, content, dispose() { disposed = true; generation += 1; } };
}

function groupSkills(skills) {
  const groups = [];
  const rest = [];
  for (const skill of skills) {
    const group = SKILL_SOURCE_GROUPS.find(row => row.sources.includes(skill.source));
    if (group === undefined) { rest.push(skill); continue; }
    let bucket = groups.find(row => row.id === group.id);
    if (bucket === undefined) { bucket = { id: group.id, label: group.label, skills: [] }; groups.push(bucket); }
    bucket.skills.push(skill);
  }
  if (rest.length > 0) groups.push({ ...SKILL_SOURCE_GROUP_OTHER, skills: rest });
  return groups.filter(group => group.skills.length > 0);
}

// 自绘实心立方体：无真实图标元数据时的唯一 fallback，按名称在黄 / 紫两款原创配色中选择。
function SkillCube({ size = 40, tone = 'amber' }) {
  const palette = tone === 'violet'
    ? { top: '#9b7cf2', left: '#7350d8', right: '#5a3cb8', edge: '#c3b0ff' }
    : { top: '#f4c95d', left: '#d59b2d', right: '#a9741c', edge: '#ffe29a' };
  return h('svg', { viewBox: '0 0 40 40', width: size, height: size, 'aria-hidden': true, className: 'dsc-skill-cube' },
    h('path', { d: 'M20 4 35 12.5 20 21 5 12.5Z', fill: palette.top }),
    h('path', { d: 'M5 12.5 20 21v15L5 27.5Z', fill: palette.left }),
    h('path', { d: 'M35 12.5 20 21v15l15-8.5Z', fill: palette.right }),
    h('path', { d: 'M20 4 35 12.5 20 21 5 12.5Z', fill: 'none', stroke: palette.edge, strokeWidth: 1.1, opacity: .55 }));
}
function cubeTone(skill) {
  let hash = 0;
  for (const char of String(skill.name)) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return hash % 2 === 0 ? 'amber' : 'violet';
}

function SkillCard({ skill, onOpen }) {
  return h('button', { type: 'button', className: 'dsc-skill-card', onClick: e => onOpen(skill, e.currentTarget) },
    h('span', { className: 'dsc-skill-card-icon' }, h(SkillCube, { tone: cubeTone(skill) })),
    h('span', { className: 'dsc-skill-card-copy' },
      h('span', { className: 'dsc-skill-card-title' }, skill.name),
      h('span', { className: 'dsc-skill-card-desc' }, skill.description)),
    skill.invocation?.modelInvocable && h('span', { className: 'dsc-skill-card-flag', title: '模型可自动调用', 'aria-label': '模型可自动调用' }, h(Icon, { name: 'check', size: 14 })));
}

function SkillSection({ group, expanded, onToggle, onOpen, query }) {
  const visible = query === '' && !expanded ? group.skills.slice(0, SKILLS_PAGE_SIZE) : group.skills;
  const hidden = group.skills.length - visible.length;
  const names = group.skills.slice(SKILLS_PAGE_SIZE).map(skill => skill.name).slice(0, 2).join('、');
  return h('section', { className: 'dsc-skills-section' },
    h('h2', { className: 'dsc-skills-section-title' }, group.label),
    h('div', { className: 'dsc-skills-grid' }, visible.map(skill => h(SkillCard, { key: skill.name, skill, onOpen }))),
    query === '' && group.skills.length > SKILLS_PAGE_SIZE && h('button', { type: 'button', className: 'dsc-skills-more', onClick: onToggle },
      expanded ? '收起' : `查看 ${names}，另有 ${hidden} 项`));
}

/** Mirror the native client helper exactly: no empty-segment filtering, colons kept literal. */
function skillFileAddress(sessionId, cwd, path) {
  const encodeSegment = segment => encodeURIComponent(segment).replace(/%3A/gi, ':');
  const encodePath = value => value.split('/').map(encodeSegment).join('/');
  const normalized = path.replace(/\\/g, '/');
  const root = (cwd || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const address = root !== '' && normalized.startsWith(root + '/') ? normalized.slice(root.length + 1) : normalized;
  return 'dsh-resource://file/session/' + encodeSegment(sessionId) + '/' + encodePath(address);
}

function draftFailureText(error) { return error?.message || String(error); }

async function startFreshDraft(ctx, scope, prompt) {
  // 新建 Session 后打开；用宿主 retained reference 等待就绪，再用 reference.binding 初始化草稿。
  // 绝不调用发送、提交或模型接口；只对新建 ID 写命令。
  const request = {};
  if (scope?.workspaceId !== undefined) request.workspaceId = scope.workspaceId;
  else if (scope?.cwd !== undefined) request.cwd = scope.cwd;
  if (scope?.agentPreset !== undefined) request.agentPreset = scope.agentPreset;
  const sessionId = await ctx.sessions.create(request);
  if (typeof sessionId !== 'string' || sessionId === '') throw new Error('宿主未返回新会话');
  ctx.uiWorkspace.openSession(sessionId);
  const conversation = ctx.get('conversation');
  if (conversation?.input?.requestDraftInitialization === undefined) throw new Error('当前宿主未提供草稿初始化接口');
  await ctx.sessions.using(sessionId, { source: 'codexStyleSkills' }, async reference => {
    const binding = reference?.binding;
    if (binding === undefined) throw new Error('新会话尚未就绪');
    const outcome = conversation.input.requestDraftInitialization(binding, { prompt, whenDraftExists: 'replace' });
    if (outcome === 'blocked') throw new Error('草稿初始化被宿主拒绝');
  });
  ctx.layout.selectPanel(null);
  return sessionId;
}

class MarkdownBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) {
      return h('div', { className: 'dsc-skills-preview-note', role: 'alert' }, 'Markdown 渲染失败，已显示原始正文。', h('pre', { className: 'dsc-skills-plain' }, this.props.text));
    }
    return this.props.children;
  }
}

let SKILL_PRIMITIVES;
function skillPrimitives() {
  if (SKILL_PRIMITIVES === undefined) {
    try { SKILL_PRIMITIVES = require('@deepseek-ai/dsh-client-ui-primitives'); } catch { SKILL_PRIMITIVES = null; }
  }
  return SKILL_PRIMITIVES;
}
// 契约取自宿主客户端 markdownLabels：code.copyLabel / copiedLabel / toolbarLabels{codeLabel,wrapLabel,unwrapLabel}
// 与 footnotes；中文值取自 @deepseek-ai/dsh-client-locale 的 zh 字典，缺失任一键会被代码块组件直接读取而崩溃。
const SKILL_MARKDOWN_LABELS = {
  code: {
    copyLabel: '复制',
    copiedLabel: '复制成功',
    toolbarLabels: { codeLabel: '代码块', wrapLabel: '自动换行', unwrapLabel: '取消自动换行' }
  },
  footnotes: '脚注'
};
function SkillMarkdown({ text }) {
  const primitives = skillPrimitives();
  if (primitives?.MarkdownText === undefined) return h('pre', { className: 'dsc-skills-plain' }, text);
  return h(MarkdownBoundary, { text }, h(primitives.MarkdownText, { text, labels: SKILL_MARKDOWN_LABELS }));
}

function dialogFocusables(dialog) {
  if (!dialog) return [];
  return [...dialog.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter(node => !node.disabled && node.getClientRects().length > 0);
}

function SkillsDetail({ ctx, controller, scope, skill, onClose, restoreFocus }) {
  const [state, setState] = useState({ phase: 'loading', content: '', error: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [trying, setTrying] = useState(false);
  const busy = useRef(false);
  const menuAnchor = useRef(null);
  const dialogRef = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    let active = true;
    setState({ phase: 'loading', content: '', error: '' });
    controller.content(skill, scope).then(value => { if (active) setState({ phase: 'ready', content: value?.content || '', error: value === null ? '该技能已不在当前范围' : '' }); },
      error => { if (active) setState({ phase: 'error', content: '', error: draftFailureText(error) }); });
    return () => { active = false; };
  }, [skill.name, scope.sessionId, scope.cwd]);
  useEffect(() => {
    closeButton.current?.focus();
    return () => { restoreFocus?.(); };
  }, []);
  const run = async action => {
    setNotice('');
    try { await action(); } catch (error) { setNotice(draftFailureText(error)); }
  };
  const withMenu = action => { setMenuOpen(false); run(action); };
  const openResource = () => {
    if (skill.path === undefined) return Promise.reject(new Error('该技能没有可打开的文件'));
    if (scope.sessionId !== undefined && ctx.sidebarRight?.openResource !== undefined) {
      ctx.sidebarRight.openResource(skillFileAddress(scope.sessionId, scope.cwd, skill.path));
      return Promise.resolve();
    }
    return ctx.remote.session.openWorkspacePath({ path: skill.path }).then(answer => {
      if (!answer?.ok) throw new Error('宿主未能打开该文件');
    });
  };
  const reveal = () => skill.path === undefined ? Promise.reject(new Error('该技能没有文件路径'))
    : ctx.remote.session.openWorkspacePath({ path: skill.path, action: 'reveal' }).then(answer => { if (!answer?.ok) throw new Error('宿主未能定位该文件'); });
  const copyMarkdown = async () => {
    let content = state.content;
    if (content === '') { const value = await controller.content(skill, scope); content = value?.content || ''; }
    if (content === '') throw new Error('该技能没有可复制的正文');
    if (navigator.clipboard?.writeText === undefined) throw new Error('当前窗口不支持剪贴板');
    await navigator.clipboard.writeText(content);
  };
  const tryNow = async () => {
    if (busy.current) return;
    busy.current = true;
    setTrying(true);
    setNotice('');
    try {
      await startFreshDraft(ctx, scope, `/${skill.name} `);
      onClose();
    } catch (error) { setNotice(draftFailureText(error)); } finally { busy.current = false; setTrying(false); }
  };
  const onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (menuOpen) setMenuOpen(false); else onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = dialogFocusables(dialogRef.current);
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  const hasPath = skill.path !== undefined;
  // 原生 MarkdownText 的 labels 代码块契约不可为空；userInvocable=false 时不得出现“立即试用”命令按钮。
  const canTry = skill.invocation?.userInvocable !== false;
  const iconNode = h('span', { className: 'dsc-skills-dialog-icon' }, h(SkillCube, { tone: cubeTone(skill) }));
  const actionsNode = h('div', { className: 'dsc-skills-dialog-headactions' },
    h('button', { type: 'button', ref: menuAnchor, className: 'dsc-icon-button', title: '更多', 'aria-label': '更多', 'aria-haspopup': 'menu', 'aria-expanded': menuOpen, onClick: () => setMenuOpen(!menuOpen) },
      h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': true }, [4, 8, 12].map(x => h('circle', { key: x, cx: x, cy: 8, r: 1.4, fill: 'currentColor' })))),
    h('button', { type: 'button', ref: closeButton, className: 'dsc-icon-button', title: '关闭', 'aria-label': '关闭', onClick: onClose }, h(Icon, { name: 'close', size: 16 })));
  const headRow = h('div', { className: 'dsc-skills-dialog-headrow' }, iconNode, actionsNode);
  const menuNode = menuOpen && h(Popover, { anchor: menuAnchor, onClose: () => setMenuOpen(false), label: '技能操作', width: 220, placement: 'bottom' },
    hasPath && h(Option, { title: '打开', icon: 'arrowUpRight', onClick: () => withMenu(openResource) }),
    hasPath && h(Option, { title: '在文件资源管理器中显示', icon: 'folder', onClick: () => withMenu(reveal) }),
    h(Option, { title: '复制 Markdown', onClick: () => withMenu(copyMarkdown) }));
  const previewNode = h('div', { className: 'dsc-skills-preview' },
    state.phase === 'loading' && h('div', { className: 'dsc-skills-preview-note' }, '正在读取正文…'),
    state.phase === 'error' && h('div', { className: 'dsc-skills-preview-note', role: 'alert' }, state.error),
    state.phase === 'ready' && state.content === '' && h('div', { className: 'dsc-skills-preview-note' }, state.error || '该技能没有正文'),
    state.phase === 'ready' && state.content !== '' && h(SkillMarkdown, { text: state.content }));
  const footNode = h('div', { className: 'dsc-skills-dialog-foot' },
    notice !== '' && h('span', { className: 'dsc-skills-dialog-notice', role: 'alert' }, notice),
    canTry && h('button', { type: 'button', className: 'dsc-skills-try', disabled: trying, 'aria-disabled': trying ? 'true' : undefined, onClick: tryNow }, h(Icon, { name: 'chat', size: 15 }), trying ? '正在新建草稿…' : '立即试用'));
  // dialog 必须是 overlay 的唯一子节点，且完整包住 headrow / 标题 / 描述 / 预览 / 底栏。
  const dialogNode = h('div', { ref: dialogRef, className: 'dsc-skills-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dsc-skill-title', tabIndex: -1, onKeyDown },
    headRow,
    menuNode,
    h('div', { className: 'dsc-skills-dialog-title' }, h('h2', { id: 'dsc-skill-title' }, skill.name), h('span', { className: 'dsc-skills-dialog-kind' }, 'Skill')),
    h('p', { className: 'dsc-skills-dialog-desc' }, skill.description),
    previewNode,
    footNode);
  return createPortal(h('div', { className: 'dsc-ui dsc-skills-overlay', onPointerDown: e => { if (e.target === e.currentTarget) onClose(); } }, dialogNode), document.body);
}

function SkillsPage({ ctx, controller, active }) {
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const state = useSource(controller.store);
  const sessions = useSource(ctx.sessions.list);
  const workspaces = useSource(ctx.workspaces.list);
  const scope = useMemo(() => skillScopeOf(ctx), [sessions, workspaces]);
  useEffect(() => { if (active) controller.load(); }, [active, scope.sessionId, scope.cwd]);
  useEffect(() => { setSelected(null); }, [state.scopeKey]);
  const filtered = query === '' ? state.skills : state.skills.filter(skill => (skill.name + ' ' + skill.description + ' ' + (skill.whenToUse || '')).toLowerCase().includes(query.toLowerCase()));
  const groups = groupSkills(filtered);
  const rangeLabel = scope.workspaceTitle || (scope.cwd ? scope.cwd.replace(/^.*[\\/]/, '') : '全局技能');
  const onOpen = (skill, anchor) => setSelected({ skill, scope: { ...scope }, anchor });
  const closeDetail = () => {
    const anchor = selected?.anchor;
    setSelected(null);
    if (anchor?.isConnected) anchor.focus();
  };
  return h('div', { className: 'dsc-ui dsc-skills-page' },
    h('header', { className: 'dsc-skills-header' },
      h('div', { className: 'dsc-skills-heading' }, h('h1', null, '技能'), h('p', null, '通过任务专用技能扩展 DSH')),
      h('div', { className: 'dsc-skills-toolbar' },
        h('span', { className: 'dsc-skills-scope', title: scope.cwd || '全局' }, rangeLabel),
        h('label', { className: 'dsc-skills-search' }, h(Icon, { name: 'search', size: 14 }), h('input', { type: 'search', value: query, placeholder: '搜索技能', 'aria-label': '搜索技能', onChange: e => setQuery(e.target.value) })),
        h('button', { type: 'button', className: 'dsc-icon-button', title: '刷新', 'aria-label': '刷新', onClick: () => controller.load() }, h(IconRefreshOutlineRegular, { size: 16 })))),
    state.phase === 'loading' && h('div', { className: 'dsc-skills-state' }, '正在读取技能…'),
    state.phase === 'unavailable' && h('div', { className: 'dsc-skills-state' }, `技能服务尚未就绪：${state.unavailable}`),
    state.phase === 'error' && h('div', { className: 'dsc-skills-state dsc-skills-state-error', role: 'alert' }, state.error, h('button', { type: 'button', onClick: () => controller.load() }, '重试')),
    state.phase === 'ready' && state.error !== '' && h('div', { className: 'dsc-skills-state dsc-skills-state-warn', role: 'alert' }, `刷新失败，显示上次结果：${state.error}`),
    state.phase === 'ready' && !state.complete && h('div', { className: 'dsc-skills-state dsc-skills-state-warn' }, '部分来源暂不可见，目录可能不完整。'),
    state.phase === 'ready' && groups.length === 0 && h('div', { className: 'dsc-skills-state' }, query === '' ? '当前范围没有技能' : `没有匹配“${query}”的技能`),
    groups.map(group => h(SkillSection, { key: group.id, group, query, expanded: expanded[group.id] === true, onToggle: () => setExpanded({ ...expanded, [group.id]: !(expanded[group.id] === true) }), onOpen })),
    selected !== null && h(SkillsDetail, { ctx, controller, scope: selected.scope, skill: selected.skill, onClose: closeDetail, restoreFocus: () => { if (selected.anchor?.isConnected) selected.anchor.focus(); } }));
}

function registerSkillsPage(ctx) {
  // 单次注入：先 $mount 发布 namespace，再注册页面；页面本身不等待 remote.codexStyleSkills。
  // 只声明 remote 与页面所需服务，避免"等 namespace、namespace 等 $mount"的循环。
  return ctx.inject(['slots', 'remote', 'sessions', 'workspaces', 'uiSession', 'uiWorkspace', 'layout', 'sidebarRight'], scope => {
    scope.effect(() => mountSkillsRemote(scope), 'codex-style: skills remote methods');
    const controller = createSkillsController(scope);
    scope.effect(() => () => controller.dispose(), 'codex-style: skills catalog');
    scope.slots.inject('main', function* () {
      yield scope.slots.register({ name: 'main', key: SKILLS_PANEL_ID }, function SkillsMain() {
        const panel = useSource(scope.layout.panelInfo);
        return h(SkillsPage, { ctx: scope, controller, active: panel.activePanelId === SKILLS_PANEL_ID });
      });
    });
  });
}
