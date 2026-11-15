// 主题包：把 dsh-theme（Apache-2.0，见 THIRD_PARTY_NOTICES.md）的 30 套配色内置进本插件，
// 用户不必再单独安装第三个插件。挑选主题后同时改宿主令牌（body[data-dsh-theme]）与 Codex 令牌
// （构建期由 scripts/theme-map.mjs 生成的映射表），因此原生区块与 Codex 外壳一起变色。

const CODEX_THEME_STORAGE = 'dsh-codex-style:theme';
const CODEX_THEME_IDS = new Set((typeof CODEX_THEME_PACK === 'undefined' ? [] : CODEX_THEME_PACK).map(theme => theme.id));
// 主题只负责配色：宿主令牌里与 Codex 自带调色板重叠的部分交给主题，其余（圆角、阴影等）保留。
const CODEX_THEME_HOST_TOKENS = new Set(typeof CODEX_THEME_HOST_TOKEN_NAMES === 'undefined' ? [] : CODEX_THEME_HOST_TOKEN_NAMES);

function isThemePackId(id) {
  return typeof id === 'string' && CODEX_THEME_IDS.has(id);
}

function isThemePackActive() {
  return typeof document !== 'undefined' && isThemePackId(document.body.getAttribute('data-dsh-theme'));
}

function currentColorScheme() {
  return typeof document !== 'undefined' && document.body?.hasAttribute('data-ds-dark-theme') ? 'dark' : 'light';
}

function themePackZh() {
  const lang = typeof document !== 'undefined' ? document.documentElement?.lang : '';
  return String(lang || 'en').toLowerCase().startsWith('zh');
}

function createThemePack() {
  const themes = CODEX_THEME_PACK;
  const listeners = new Set();
  let activeId = null;
  let themeStyle = null;
  let mapStyle = null;

  const notify = () => { for (const listener of [...listeners]) { try { listener(activeId); } catch {} } };
  const ensureStyles = () => {
    if (!document.head) return;
    if (!mapStyle) {
      mapStyle = document.createElement('style');
      mapStyle.dataset.dshCodexThemeMap = '';
      mapStyle.textContent = CODEX_THEME_MAP_CSS;
      document.head.appendChild(mapStyle);
    }
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.dataset.dshCodexTheme = '';
      document.head.appendChild(themeStyle);
    }
  };
  const write = id => {
    const theme = themes.find(row => row.id === id);
    if (!theme) return false;
    ensureStyles();
    if (!themeStyle) return false;
    themeStyle.textContent = theme.css;
    document.body.setAttribute('data-dsh-theme', theme.id);
    activeId = theme.id;
    try { localStorage.setItem(CODEX_THEME_STORAGE, theme.id); } catch {}
    notify();
    return true;
  };
  const clear = ({ forget = true } = {}) => {
    if (themeStyle) themeStyle.textContent = '';
    if (activeId !== null && document.body.getAttribute('data-dsh-theme') === activeId) document.body.removeAttribute('data-dsh-theme');
    activeId = null;
    if (forget) try { localStorage.removeItem(CODEX_THEME_STORAGE); } catch {}
    notify();
  };
  const saved = () => {
    try { return localStorage.getItem(CODEX_THEME_STORAGE); } catch { return null; }
  };
  return {
    themes,
    getActive: () => activeId,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    select(id) { return id === null || id === undefined ? clear() : write(id); },
    /** 插件启动：先装映射表，再恢复用户上次选的主题；没选过就什么都不改。 */
    mount() {
      ensureStyles();
      const id = saved();
      if (isThemePackId(id)) write(id);
    },
    /** 插件卸载：撤掉自己写过的属性和样式，已保存的选择保留，重新启用后继续生效。 */
    unmount() {
      if (activeId !== null && document.body.getAttribute('data-dsh-theme') === activeId) document.body.removeAttribute('data-dsh-theme');
      activeId = null;
      themeStyle?.remove(); themeStyle = null;
      mapStyle?.remove(); mapStyle = null;
    }
  };
}

let currentThemePack = null;

function installThemePack(ctx) {
  currentThemePack = createThemePack();
  const pack = currentThemePack;
  ctx.effect(() => {
    pack.mount();
    return () => { pack.unmount(); if (currentThemePack === pack) currentThemePack = null; };
  }, 'codex-style: theme pack');
  return pack;
}

function getThemePack() { return currentThemePack; }

/** 齿轮菜单里显示当前主题名；未选主题时显示“跟随 DSH 外观”。 */
function currentThemeLabel() {
  const pack = currentThemePack;
  const id = pack ? pack.getActive() : null;
  if (!pack || id === null) return '跟随 DSH 外观';
  const theme = pack.themes.find(row => row.id === id);
  if (!theme) return '跟随 DSH 外观';
  const zh = themePackZh();
  return zh ? theme.nameZh : theme.name;
}

// 齿轮菜单里的主题选择面板：只依赖 React 和本插件自己的样式类。
function ThemePackPanel({ onBack }) {
  const pack = getThemePack();
  const [activeId, setActiveId] = useState(pack ? pack.getActive() : null);
  useEffect(() => {
    if (!pack) return;
    setActiveId(pack.getActive());
    return pack.subscribe(setActiveId);
  }, [pack]);
  if (!pack) return null;
  const scheme = currentColorScheme();
  const zh = themePackZh();
  const row = (id, title, detail, swatch) => h('button', {
    key: id || 'default', type: 'button', role: 'menuitemradio', 'aria-checked': activeId === id,
    className: 'dsc-theme-row' + (activeId === id ? ' is-active' : ''),
    onClick: () => { pack.select(id); onBack(); }
  },
  swatch ? h('span', { className: 'dsc-theme-swatch', style: { background: swatch[0] } }, h('span', { className: 'dsc-theme-swatch-dot', style: { background: swatch[2] } })) : h('span', { className: 'dsc-theme-swatch is-default' }),
  h('span', { className: 'dsc-theme-copy' }, h('span', { className: 'dsc-theme-name' }, title), detail ? h('small', null, detail) : null),
  activeId === id ? h(Icon, { name: 'check', size: 14 }) : null);
  return h(React.Fragment, null,
    h('div', { className: 'dsc-menu-heading dsc-theme-heading' },
      h('button', { type: 'button', className: 'dsc-theme-back', 'aria-label': '返回', onClick: onBack }, h(Icon, { name: 'chevron', size: 12 })),
      h('span', null, '主题包')),
    h('div', { className: 'dsc-theme-list', role: 'menu', 'aria-label': '主题包' },
      row(null, '跟随 DSH 外观', '不套用主题包配色', null),
      pack.themes.map(theme => row(theme.id, zh ? theme.nameZh : theme.name, theme.descZh && zh ? theme.descZh : theme.desc, (theme.swatch || {})[scheme]))));
}
