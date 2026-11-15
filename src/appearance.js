// 外观设置页：把主题选择从齿轮菜单搬进「设置 → 外观」，并提供 Codex 式的强调色 / 背景 / 前景 / 字体。
// 三种来源共用一套状态：内置预设、dsh-theme 主题包（30 套）、用户自定义颜色。
// 预设只给三元组（背景 / 前景 / 强调色），其余界面令牌在运行时按明暗推导，避免逐主题写死。

const APPEARANCE_STORAGE = 'dsh-codex-style:appearance';

// Codex 外观预设：深浅两套三元组，取自各主题公开的配色参数。
const APPEARANCE_PRESETS = [
  { id: 'default', name: 'DeepSeek 默认', desc: '不套用任何配色覆盖', light: null, dark: null },
  { id: 'rose-pine', name: 'Rose Pine', desc: '柔和玫瑰与奶油底', light: { bg: '#FAF4ED', fg: '#575279', accent: '#D7827E' }, dark: { bg: '#191724', fg: '#E0DEF4', accent: '#EBBCBA' } },
  { id: 'rose-pine-moon', name: 'Rose Pine Moon', desc: '夜色下的玫瑰', light: { bg: '#FAF4ED', fg: '#575279', accent: '#EA9A97' }, dark: { bg: '#232136', fg: '#E0DEF4', accent: '#EA9A97' } },
  { id: 'nord', name: 'Nord', desc: '北欧冷调', light: { bg: '#ECEFF4', fg: '#2E3440', accent: '#5E81AC' }, dark: { bg: '#2E3440', fg: '#ECEFF4', accent: '#88C0D0' } },
  { id: 'solarized', name: 'Solarized', desc: '经典太阳化', light: { bg: '#FDF6E3', fg: '#657B83', accent: '#B58900' }, dark: { bg: '#002B36', fg: '#839496', accent: '#268BD2' } },
  { id: 'tokyo-night', name: 'Tokyo Night', desc: '霓虹夜城', light: { bg: '#F6F6F8', fg: '#343B58', accent: '#3E63DD' }, dark: { bg: '#1A1B26', fg: '#C0CAF5', accent: '#7AA2F7' } },
  { id: 'gruvbox', name: 'Gruvbox', desc: '暖色复古', light: { bg: '#FBF1C7', fg: '#3C3836', accent: '#B57614' }, dark: { bg: '#282828', fg: '#EBDBB2', accent: '#FABD2F' } },
  { id: 'catppuccin', name: 'Catppuccin', desc: '奶油拿铁', light: { bg: '#EFF1F5', fg: '#4C4F69', accent: '#8839EF' }, dark: { bg: '#1E1E2E', fg: '#CDD6F4', accent: '#CBA6F7' } },
  { id: 'dracula', name: 'Dracula', desc: '高对比紫', light: { bg: '#F8F8F2', fg: '#282A36', accent: '#7C3AED' }, dark: { bg: '#282A36', fg: '#F8F8F2', accent: '#BD93F9' } },
  { id: 'one-dark', name: 'One Dark', desc: 'Atom 经典', light: { bg: '#FAFAFA', fg: '#383A42', accent: '#4078F2' }, dark: { bg: '#282C34', fg: '#ABB2BF', accent: '#61AFEF' } },
  { id: 'github', name: 'GitHub', desc: '代码站配色', light: { bg: '#FFFFFF', fg: '#24292F', accent: '#0969DA' }, dark: { bg: '#0D1117', fg: '#E6EDF3', accent: '#2F81F7' } }
];

const APPEARANCE_FONTS = [
  { id: 'system', name: '系统默认', stack: '' },
  { id: 'inter', name: 'Inter', stack: 'Inter, "Segoe UI", system-ui, sans-serif' },
  { id: 'serif', name: 'Serif', stack: 'Georgia, "Songti SC", "SimSun", serif' },
  { id: 'mono', name: '等宽', stack: 'ui-monospace, "SF Mono", Consolas, monospace' }
];

function parseHex(value) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(value ?? '').trim());
  if (!match) return null;
  const body = match[1].length === 3 ? match[1].split('').map(ch => ch + ch).join('') : match[1];
  return { r: parseInt(body.slice(0, 2), 16), g: parseInt(body.slice(2, 4), 16), b: parseInt(body.slice(4, 6), 16) };
}

function toHex(channel) {
  return Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0');
}

function rgbHex(rgb) { return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b); }

/** 两色按比例混合；任一侧不是合法 hex 时返回前者。 */
function mix(base, target, ratio) {
  const a = parseHex(base);
  const b = parseHex(target);
  if (!a || !b) return base;
  return rgbHex({ r: a.r + (b.r - a.r) * ratio, g: a.g + (b.g - a.g) * ratio, b: a.b + (b.b - a.b) * ratio });
}

/** hex + 透明度；用于文字层级与边框。 */
function alpha(color, value) {
  const rgb = parseHex(color);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${value})` : color;
}

/** 主题三元组 → Codex 与宿主两套令牌；所有界面色都由这三色推导。 */
function deriveTokens(triple) {
  const bg = triple.bg;
  const fg = triple.fg;
  const accent = triple.accent;
  const surface = mix(bg, fg, 0.03);
  const nested = mix(bg, fg, 0.06);
  const elevated = mix(bg, fg, 0.09);
  const summary = mix(bg, fg, 0.12);
  const sidebar = mix(bg, fg, 0.02);
  const cx = {
    '--cx-window': bg,
    '--cx-sidebar': sidebar,
    '--cx-surface': bg,
    '--cx-thread': surface,
    '--cx-nested': nested,
    '--cx-elevated': elevated,
    '--cx-summary': summary,
    '--cx-hover': alpha(fg, 0.05),
    '--cx-active': alpha(fg, 0.09),
    '--cx-border-l1': alpha(fg, 0.1),
    '--cx-border-l2': alpha(fg, 0.06),
    '--cx-border-l3': alpha(fg, 0.16),
    '--cx-border-strong': alpha(fg, 0.2),
    '--cx-sidebar-divider': alpha(fg, 0.1),
    '--cx-sidebar-divider-hover': alpha(fg, 0.24),
    '--cx-frame-line': alpha(fg, 0.1),
    '--cx-text': fg,
    '--cx-text-2': alpha(fg, 0.72),
    '--cx-text-3': alpha(fg, 0.52),
    '--cx-text-4': alpha(fg, 0.34),
    '--cx-text-inverse': bg,
    '--cx-nav-icon': alpha(fg, 0.5),
    '--cx-sidebar-text': alpha(fg, 0.86),
    '--cx-sidebar-muted': alpha(fg, 0.5),
    '--cx-sidebar-selected': alpha(fg, 0.08),
    '--cx-accent': accent,
    '--cx-accent-soft': accent,
    '--cx-link': accent,
    '--cx-focus': accent,
    '--cx-attention': accent,
    '--cx-picker-fill': nested,
    '--cx-composer-fill': surface,
    '--cx-popover-fill': elevated
  };
  const dsw = {
    '--dsw-alias-bg-base': bg,
    '--dsw-alias-bg-layer-1': surface,
    '--dsw-alias-bg-layer-2': nested,
    '--dsw-alias-bg-layer-3': elevated,
    '--dsw-alias-bg-overlay': elevated,
    '--dsw-alias-bg-module-platform': mix(bg, fg, 0.04),
    '--dsw-alias-label-primary': fg,
    '--dsw-alias-label-secondary': alpha(fg, 0.72),
    '--dsw-alias-label-tertiary': alpha(fg, 0.52),
    '--dsw-alias-label-caption': alpha(fg, 0.52),
    '--dsw-alias-label-dimmed': alpha(fg, 0.34),
    '--dsw-alias-label-primary-inverted': bg,
    '--dsw-alias-border-l1': alpha(fg, 0.1),
    '--dsw-alias-border-l2': alpha(fg, 0.1),
    '--dsw-alias-border-l3': alpha(fg, 0.16),
    '--dsw-alias-border-l4': alpha(fg, 0.22),
    '--dsw-alias-interactive-bg-hover': alpha(fg, 0.05),
    '--dsw-alias-interactive-bg-hover-solid': mix(bg, fg, 0.1),
    '--dsw-alias-brand-primary': accent,
    '--dsw-alias-link': accent,
    '--dsw-specific-sidebar-fill': sidebar,
    '--dsw-specific-sidebar-nav-item-active': alpha(fg, 0.1),
    '--dsw-specific-sidebar-nav-item-hover': alpha(fg, 0.05),
    '--dsw-specific-sidebar-nav-item-active-accent': alpha(fg, 0.14),
    '--dsw-specific-input-major': surface,
    '--dsw-specific-bubble': mix(bg, fg, 0.06),
    '--dsw-specific-bubble-highlight': alpha(accent, 0.14),
    '--dsw-specific-menu': elevated,
    '--dsw-menu-surface-fill': elevated,
    '--dsw-alias-markdown-code-block': nested,
    '--dsw-alias-markdown-inline-code': nested,
    '--dsw-alias-markdown-code-block-banner': elevated,
    '--dsw-alias-scrollbar-bg-l1': alpha(fg, 0.16),
    '--dsw-alias-scrollbar-bg-l2': alpha(fg, 0.2),
    '--dsw-alias-scrollbar-hover-l2': alpha(fg, 0.35)
  };
  return { cx, dsw };
}

function cssBlock(selector, tokens) {
  return `${selector}{${Object.entries(tokens).map(([key, value]) => `${key}:${value}`).join(';')}}`;
}

/** 当前生效的明暗：'system' 走系统偏好，其余按选择。 */
function resolveScheme(mode) {
  if (mode === 'light' || mode === 'dark') return mode;
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(APPEARANCE_STORAGE) || 'null');
    if (!raw || typeof raw !== 'object') return null;
    return raw;
  } catch { return null; }
}

function createAppearance(ctx) {
  const listeners = new Set();
  let style = null;
  let custom = null;
  const savedState = loadState();
  // 只有用户动过外观才接管宿主明暗；首次启用保持 DSH 自己的外观选择。
  let managed = savedState !== null;
  let state = Object.assign({ preset: 'default', mode: 'system', font: 'system' }, savedState || {});
  if (!Array.isArray(state.customLight)) custom = null; else custom = { light: state.customLight, dark: state.customDark };
  if (!managed && typeof document !== 'undefined' && typeof document.body?.getAttribute === 'function') {
    state.mode = document.body.getAttribute('data-ds-dark-theme') !== null ? 'dark' : 'light';
  }
  let media = null;

  const notify = () => { for (const listener of [...listeners]) { try { listener(); } catch {} } };
  const ensureStyle = () => {
    if (style || !document.head) return;
    style = document.createElement('style');
    style.dataset.dshCodexAppearance = '';
    document.head.appendChild(style);
  };
  const write = () => { try { localStorage.setItem(APPEARANCE_STORAGE, JSON.stringify({ ...state, customLight: custom?.light ?? null, customDark: custom?.dark ?? null })); } catch {} };

  const tripleFor = (presetId, scheme) => {
    if (custom) return custom[scheme];
    if (typeof presetId === 'string' && presetId.startsWith('pack:')) {
      const pack = getThemePack();
      const swatch = pack?.themes.find(row => row.id === presetId.slice(5))?.swatch?.[scheme];
      if (swatch) return { bg: swatch[0], fg: swatch[3], accent: swatch[2] };
    }
    const preset = APPEARANCE_PRESETS.find(row => row.id === presetId);
    return preset ? preset[scheme] : null;
  };

  const applyFont = () => {
    const font = APPEARANCE_FONTS.find(row => row.id === state.font) || APPEARANCE_FONTS[0];
    if (!document.body || !document.body.style || typeof document.body.style.setProperty !== 'function') return;
    if (font.stack) {
      document.body.style.setProperty('--cx-font-sans', font.stack);
      document.body.style.setProperty('--dsh-font-family-text', font.stack);
      document.body.style.setProperty('font-family', font.stack);
    } else {
      document.body.style.removeProperty('--cx-font-sans');
      document.body.style.removeProperty('--dsh-font-family-text');
      document.body.style.removeProperty('font-family');
    }
  };

  const apply = () => {
    if (typeof document === 'undefined' || !document.body) return;
    const body = document.body;
    const setDark = value => { if (typeof body.toggleAttribute === 'function') body.toggleAttribute('data-ds-dark-theme', value); };
    const setAppearance = value => { if (value === null) { if (typeof body.removeAttribute === 'function') body.removeAttribute('data-dsh-appearance'); } else if (typeof body.setAttribute === 'function') body.setAttribute('data-dsh-appearance', value); };
    const scheme = resolveScheme(state.mode);
    const packId = typeof state.preset === 'string' && state.preset.startsWith('pack:') ? state.preset.slice(5) : null;
    const pack = getThemePack();
    ensureStyle();
    applyFont();
    // 用户动过外观后才接管明暗：与 dsh-theme 一样写宿主实际读取的标记。
    if (managed) setDark(scheme === 'dark');
    if (packId && pack) {
      setAppearance(null);
      if (style) style.textContent = '';
      pack.select(packId);
      return;
    }
    // 内置预设或自定义：撤掉主题包，改写两套令牌。
    if (pack && pack.getActive() !== null) pack.select(null);
    const triple = tripleFor(state.preset, scheme);
    if (!triple || (state.preset === 'default' && !custom)) {
      setAppearance(null);
      if (style) style.textContent = '';
      return;
    }
    const tokens = deriveTokens(triple);
    if (style) {
      style.textContent = cssBlock('html body[data-dsh-codex-style][data-dsh-appearance]', tokens.cx)
        + '\n' + cssBlock('html body[data-dsh-appearance]', tokens.dsw);
    }
    setAppearance(state.preset);
  };

  const applyAndMaybeWrite = () => { apply(); write(); notify(); };

  const setMode = mode => { managed = true; state = { ...state, mode }; applyAndMaybeWrite(); };
  const setPreset = preset => { managed = true; custom = null; state = { ...state, preset }; applyAndMaybeWrite(); };
  const setColor = (key, value) => {
    managed = true;
    const scheme = resolveScheme(state.mode);
    if (!custom) {
      const base = tripleFor(state.preset, scheme) || (scheme === 'dark' ? { bg: '#191724', fg: '#E0DEF4', accent: '#EBBCBA' } : { bg: '#FAF4ED', fg: '#575279', accent: '#D7827E' });
      custom = { light: { ...base }, dark: { ...base } };
    }
    custom[scheme] = { ...custom[scheme], [key]: value };
    state = { ...state, preset: 'custom' };
    applyAndMaybeWrite();
  };
  const setFont = font => { managed = true; state = { ...state, font }; applyAndMaybeWrite(); };
  const reset = () => {
    custom = null;
    managed = false;
    state = { preset: 'default', mode: 'system', font: 'system' };
    try { localStorage.removeItem(APPEARANCE_STORAGE); } catch {}
    apply();
    // 复位后把明暗标记交还宿主当前偏好。
    try {
      const scheme = ctx?.theme?.getTheme?.()?.active?.colorScheme;
      if (scheme && typeof document.body.toggleAttribute === 'function') document.body.toggleAttribute('data-ds-dark-theme', scheme === 'dark');
    } catch {}
    notify();
  };

  const watchSystem = () => {
    if (typeof matchMedia !== 'function') return;
    media = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (state.mode === 'system') apply(); };
    media.addEventListener?.('change', onChange);
  };
  // 原生外观仍可被设置页改动：用户动过外观后，把宿主写回的明暗标记纠回本页的选择。
  let observer = null;
  const watchHostScheme = () => {
    if (typeof MutationObserver !== 'function' || typeof document.body?.hasAttribute !== 'function') return;
    observer = new MutationObserver(() => {
      if (!managed) return;
      const want = resolveScheme(state.mode) === 'dark';
      if (document.body.hasAttribute('data-ds-dark-theme') !== want) apply();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
  };

  return {
    presets: APPEARANCE_PRESETS,
    fonts: APPEARANCE_FONTS,
    getState: () => ({ ...state }),
    getCustom: () => custom ? { light: { ...custom.light }, dark: { ...custom.dark } } : null,
    getTriple: () => tripleFor(state.preset, resolveScheme(state.mode)),
    setMode, setPreset, setColor, setFont, reset,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    mount() { watchSystem(); watchHostScheme(); apply(); },
    unmount() {
      observer?.disconnect(); observer = null;
      media?.removeEventListener?.('change', () => {});
      if (style) { style.remove(); style = null; }
      document.body?.removeAttribute?.('data-dsh-appearance');
      document.body?.style?.removeProperty?.('--cx-font-sans');
      document.body?.style?.removeProperty?.('--dsh-font-family-text');
      document.body?.style?.removeProperty?.('font-family');
      // 交还明暗控制权：按宿主主题快照恢复标记。
      try {
        const scheme = ctx?.theme?.getTheme?.()?.active?.colorScheme;
        if (scheme && typeof document.body?.toggleAttribute === 'function') document.body.toggleAttribute('data-ds-dark-theme', scheme === 'dark');
      } catch {}
    }
  };
}

let currentAppearance = null;

function installAppearance(ctx) {
  currentAppearance = createAppearance(ctx);
  const appearance = currentAppearance;
  ctx.effect(() => {
    appearance.mount();
    return () => { appearance.unmount(); if (currentAppearance === appearance) currentAppearance = null; };
  }, 'codex-style: appearance');
  ctx.slots.inject('settings.section', () => ctx.slots.register(
    { name: 'settings.section', id: 'codex-appearance', order: 12, label: '外观' },
    AppearancePage));
  ctx.slots.inject('settings.section.icon', () => ctx.slots.register(
    { name: 'settings.section.icon', id: 'codex-appearance' },
    () => h(Icon, { name: 'settings', size: 16 })));
  return appearance;
}

function getAppearance() { return currentAppearance; }

/** 齿轮菜单里显示当前外观名：主题包 → 包名，内置预设 → 预设名，改过颜色 → 自定义。 */
function currentAppearanceLabel() {
  const appearance = currentAppearance;
  if (!appearance) return 'DeepSeek 默认';
  const state = appearance.getState();
  if (appearance.getCustom()) return '自定义';
  if (typeof state.preset === 'string' && state.preset.startsWith('pack:')) {
    const pack = getThemePack();
    const theme = pack?.themes.find(row => row.id === state.preset.slice(5));
    return theme ? theme.nameZh : '主题包';
  }
  const preset = appearance.presets.find(row => row.id === state.preset);
  return preset ? preset.name : 'DeepSeek 默认';
}

function isAppearanceActive() {
  if (typeof document === 'undefined' || !document.body) return false;
  const body = document.body;
  return typeof body.hasAttribute === 'function'
    ? body.hasAttribute('data-dsh-appearance')
    : body.getAttribute('data-dsh-appearance') !== null;
}

// ------------------------------ 设置页 UI ------------------------------

function useAppearanceState() {
  const appearance = getAppearance();
  const [, bump] = useState(0);
  useEffect(() => {
    if (!appearance) return;
    return appearance.subscribe(() => bump(value => value + 1));
  }, [appearance]);
  return appearance;
}

function AppearancePage() {
  const appearance = useAppearanceState();
  if (!appearance) return null;
  const state = appearance.getState();
  const custom = appearance.getCustom();
  const scheme = resolveScheme(state.mode);
  const triple = custom ? custom[scheme] : (appearance.presets.find(row => row.id === state.preset)?.[scheme] ?? appearance.getTriple() ?? { bg: '#111111', fg: '#fcfcfc', accent: '#0285ff' });
  const pack = getThemePack();
  const packThemes = pack ? pack.themes : [];
  const active = state.preset;
  const colorRow = (label, key) => h('div', { className: 'dsc-appearance-row' },
    h('span', { className: 'dsc-appearance-row-label' }, label),
    h('span', { className: 'dsc-appearance-color' },
      h('input', { type: 'color', className: 'dsc-appearance-swatch', value: triple[key], 'aria-label': label, onChange: event => appearance.setColor(key, event.target.value) }),
      h('input', { type: 'text', className: 'dsc-appearance-hex', value: triple[key], spellCheck: false, onChange: event => { if (parseHex(event.target.value)) appearance.setColor(key, rgbHex(parseHex(event.target.value))); } })));
  return h('div', { className: 'dsc-ui dsc-appearance' },
    h('h2', { className: 'dsc-appearance-title' }, '外观'),
    h('p', { className: 'dsc-appearance-note' }, '配色与字体由本插件接管；「DeepSeek 默认」只清空覆盖，不会卸载插件。'),
    h('div', { className: 'dsc-appearance-group' },
      h('div', { className: 'dsc-appearance-group-title' }, '模式'),
      h('div', { className: 'dsc-appearance-modes', role: 'radiogroup', 'aria-label': '模式' },
        [['light', '浅色'], ['dark', '深色'], ['system', '跟随系统']].map(([id, label]) => h('button', {
          key: id, type: 'button', role: 'radio', 'aria-checked': state.mode === id,
          className: 'dsc-appearance-mode' + (state.mode === id ? ' is-active' : ''),
          onClick: () => appearance.setMode(id)
        },
        h('span', { className: 'dsc-appearance-mode-preview', 'data-mode': id === 'system' ? scheme : id }, h('i', null), h('i', null), h('i', null)),
        h('span', { className: 'dsc-appearance-mode-label' }, label))))),
    h('div', { className: 'dsc-appearance-group' },
      h('div', { className: 'dsc-appearance-group-title' }, '主题'),
      h('div', { className: 'dsc-appearance-themes' },
        appearance.presets.map(preset => {
          const colors = preset[scheme] || (preset.id === 'default' ? { bg: scheme === 'dark' ? '#0f0f0f' : '#ffffff', fg: scheme === 'dark' ? '#fcfcfc' : '#0d0d0d', accent: scheme === 'dark' ? '#0285ff' : '#2b68cb' } : null);
          return h('button', {
            key: preset.id, type: 'button', 'aria-pressed': active === preset.id,
            className: 'dsc-appearance-theme' + (active === preset.id ? ' is-active' : ''),
            title: preset.desc, onClick: () => appearance.setPreset(preset.id)
          },
          h('span', { className: 'dsc-appearance-theme-swatch', style: { background: colors?.bg, borderColor: colors ? alpha(colors.fg, 0.2) : undefined } },
            h('i', { style: { background: colors?.fg } }), h('i', { style: { background: colors?.accent } })),
          h('span', { className: 'dsc-appearance-theme-name' }, preset.name));
        }),
        packThemes.length ? h('div', { className: 'dsc-appearance-subtitle' }, '主题包（dsh-theme）') : null,
        packThemes.map(theme => h('button', {
          key: 'pack:' + theme.id, type: 'button', 'aria-pressed': active === 'pack:' + theme.id,
          className: 'dsc-appearance-theme' + (active === 'pack:' + theme.id ? ' is-active' : ''),
          title: theme.nameZh,
          onClick: () => appearance.setPreset('pack:' + theme.id)
        },
        h('span', { className: 'dsc-appearance-theme-swatch', style: { background: (theme.swatch || {})[scheme]?.[0] } },
          h('i', { style: { background: (theme.swatch || {})[scheme]?.[3] } }), h('i', { style: { background: (theme.swatch || {})[scheme]?.[2] } })),
        h('span', { className: 'dsc-appearance-theme-name' }, theme.nameZh))))),
    h('div', { className: 'dsc-appearance-card' },
      colorRow('强调色', 'accent'),
      colorRow('背景', 'bg'),
      colorRow('前景', 'fg'),
      h('div', { className: 'dsc-appearance-row' },
        h('span', { className: 'dsc-appearance-row-label' }, '字体'),
        h('select', { className: 'dsc-appearance-select', value: state.font, 'aria-label': '字体', onChange: event => appearance.setFont(event.target.value) },
          appearance.fonts.map(font => h('option', { key: font.id, value: font.id }, font.name))))));
}
