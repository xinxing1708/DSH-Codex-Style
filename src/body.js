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

function mountCodexBody(ctx) {
  ctx.effect(() => {
    document.body.setAttribute('data-dsc-codex-body', '');
    const style = document.createElement('style');
    style.dataset.dscCodexBody = '';
    style.textContent = BODY_CSS_TEXT;
    document.head.appendChild(style);
    return () => { style.remove(); document.body.removeAttribute('data-dsc-codex-body'); };
  }, 'codex-style: optional body stylesheet');
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
