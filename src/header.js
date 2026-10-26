// 顶部重绘只随独立子组件启停；原生会话、视图与按钮动作继续由宿主持有。
function mountCodexHeader(ctx) {
  ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.dscCodexHeader = '';
    style.textContent = HEADER_CSS_TEXT;
    document.head.appendChild(style);
    document.body.setAttribute('data-dsc-codex-header', '');
    headerPresentation.set(true);
    return () => {
      headerPresentation.set(false);
      style.remove();
      document.body.removeAttribute('data-dsc-codex-header');
    };
  }, 'codex-style: optional header stylesheet');
}
