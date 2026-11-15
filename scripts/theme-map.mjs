// dsh-theme（Apache-2.0）把 30 套配色写在 body[data-dsh-theme="<id>"] 的 --dsw-* 令牌里；
// Codex 外壳读的是自己的 --cx-*。这里在构建时把两套令牌对齐，主题才能染到外壳、而不只改宿主原生区块。
// 只读取主题自带的令牌值，不改写、不复制其样式实现。

/** Codex 令牌 → 宿主令牌。主题没定义的键会跳过，回落 Codex 自带配色。 */
export const CODEX_TOKEN_MAP = {
  '--cx-window': '--dsw-alias-bg-base',
  '--cx-sidebar': '--dsw-specific-sidebar-fill',
  '--cx-surface': '--dsw-alias-bg-base',
  '--cx-thread': '--dsw-alias-bg-layer-1',
  '--cx-nested': '--dsw-alias-bg-layer-2',
  '--cx-elevated': '--dsw-alias-bg-layer-2',
  '--cx-summary': '--dsw-alias-bg-layer-3',
  '--cx-hover': '--dsw-alias-interactive-bg-hover',
  '--cx-active': '--dsw-alias-interactive-bg-hover',
  '--cx-border-l1': '--dsw-alias-border-l1',
  '--cx-border-l2': '--dsw-alias-border-l2',
  '--cx-border-l3': '--dsw-alias-border-l3',
  '--cx-border-strong': '--dsw-alias-border-l4',
  '--cx-sidebar-divider': '--dsw-alias-border-l1',
  '--cx-sidebar-divider-hover': '--dsw-alias-border-l4',
  '--cx-frame-line': '--dsw-alias-border-l2',
  '--cx-text': '--dsw-alias-label-primary',
  '--cx-text-2': '--dsw-alias-label-secondary',
  '--cx-text-3': '--dsw-alias-label-tertiary',
  '--cx-text-4': '--dsw-alias-label-dimmed',
  '--cx-text-inverse': '--dsw-alias-label-primary-inverted',
  '--cx-nav-icon': '--dsw-alias-label-tertiary',
  '--cx-sidebar-text': '--dsw-alias-label-secondary',
  '--cx-sidebar-muted': '--dsw-alias-label-tertiary',
  '--cx-sidebar-selected': '--dsw-alias-interactive-bg-hover-solid',
  '--cx-accent': '--dsw-alias-brand-primary',
  '--cx-accent-soft': '--dsw-alias-brand-primary',
  '--cx-link': '--dsw-alias-link',
  '--cx-focus': '--dsw-alias-brand-primary',
  '--cx-success': '--dsw-alias-state-success-primary',
  '--cx-danger': '--dsw-alias-state-error-primary',
  '--cx-warning': '--dsw-alias-state-warn-primary',
  '--cx-attention': '--dsw-alias-state-business-primary',
  '--cx-picker-fill': '--dsw-alias-bg-layer-2',
  '--cx-composer-fill': '--dsw-specific-input-major',
  '--cx-popover-fill': '--dsw-specific-menu',
  '--cx-reasoning-track': '--dsw-alias-border-l4',
  '--cx-reasoning-title': '--dsw-alias-brand-primary',
  '--cx-reasoning-max-text': '--dsw-alias-brand-primary'
};

/** 只存在于宿主侧、没有对应 Codex 令牌的配色项；主题生效时也要让出，否则气泡等会停在插件自带色。 */
export const EXTRA_HOST_TOKENS = ['--dsw-specific-bubble', '--dsw-specific-bubble-highlight'];

const RULE = /body\[data-dsh-theme="[^"]+"\](?:\[data-ds-dark-theme\])?\{([^}]*)\}/g;
const DECLARATION = /(--dsw-[a-z0-9-]+)\s*:\s*([^;]+);/g;

/**
 * 取出一套主题的浅色/深色宿主令牌。
 * @param {string} css - 主题自带的 CSS 文本。
 * @returns {{ light: Record<string, string>, dark: Record<string, string> }}
 */
export function parseThemePalette(css) {
  const light = {};
  const dark = {};
  for (const rule of String(css).matchAll(RULE)) {
    const block = rule[0];
    const target = block.includes('[data-ds-dark-theme]') ? dark : light;
    for (const declaration of block.matchAll(DECLARATION)) target[declaration[1]] = declaration[2].trim();
  }
  return { light, dark: Object.keys(dark).length ? dark : light };
}

/** 按主题生成 codex 令牌映射；未定义的键直接省略，交给 Codex 默认值。 */
export function themeTokenCss(id, palette) {
  const render = tokens => Object.entries(CODEX_TOKEN_MAP)
    .filter(([, host]) => tokens[host] !== undefined)
    .map(([codex, host]) => `${codex}:${tokens[host]}`)
    .join(';');
  const light = render(palette.light);
  const dark = render(palette.dark);
  const rules = [];
  // 多一个 html 元素提升特异性：本插件的深浅色默认块是 body[data-dsh-codex-style][data-dsc-color-scheme]，
  // 主题映射必须压过它，且样式表注入先后不影响结果。
  if (light) rules.push(`html body[data-dsh-codex-style][data-dsh-theme="${id}"]{${light}}`);
  if (dark) rules.push(`html body[data-dsh-codex-style][data-dsh-theme="${id}"][data-ds-dark-theme]{${dark}}`);
  return rules.join('\n');
}

/**
 * 为整个主题包生成一张映射表：只要 body 上出现主题包里的 id（无论由本插件还是 dsh-theme 设置），
 * Codex 外壳就跟随该主题配色。
 * @param {Array<{ id: string, css: string }>} themes
 */
export function buildThemeTokenCss(themes) {
  return themes.map(theme => themeTokenCss(theme.id, parseThemePalette(theme.css))).filter(Boolean).join('\n');
}
