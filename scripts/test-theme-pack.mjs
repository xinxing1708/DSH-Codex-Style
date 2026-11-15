import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { buildThemeTokenCss, CODEX_TOKEN_MAP, parseThemePalette } from './theme-map.mjs';

// 主题包数据随仓库提供；映射表由构建期生成，运行时不解析 CSS。
const themes = JSON.parse(await readFile(new URL('../assets/themes.data.json', import.meta.url), 'utf8'));
const bundle = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');
const chrome = await readFile(new URL('../src/chrome.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');

test('内置主题包保留 30 套配色和唯一 id', () => {
  assert.equal(themes.length, 30, '主题包完整');
  const ids = themes.map(theme => theme.id);
  assert.equal(new Set(ids).size, ids.length, 'id 唯一');
  for (const theme of themes) {
    assert.match(theme.css, new RegExp(`body\\[data-dsh-theme="${theme.id}"\\]`), `${theme.id} 的浅色规则`);
    assert.match(theme.css, new RegExp(`body\\[data-dsh-theme="${theme.id}"\\]\\[data-ds-dark-theme\\]`), `${theme.id} 的深色规则`);
    assert.ok(theme.swatch?.light?.length === 4 && theme.swatch?.dark?.length === 4, `${theme.id} 有色卡`);
  }
});

test('映射表把主题令牌翻成 Codex 令牌，并区分浅色/深色', () => {
  const palette = parseThemePalette(themes[0].css);
  assert.ok(Object.keys(palette.light).length > 40 && Object.keys(palette.dark).length > 40, '两套令牌都解析到');
  const tokenCss = buildThemeTokenCss(themes);
  for (const theme of themes) {
    const light = tokenCss.match(new RegExp(`body\\[data-dsh-codex-style\\]\\[data-dsh-theme="${theme.id}"\\]\\{([^}]*)\\}`));
    const dark = tokenCss.match(new RegExp(`body\\[data-dsh-codex-style\\]\\[data-dsh-theme="${theme.id}"\\]\\[data-ds-dark-theme\\]\\{([^}]*)\\}`));
    assert.ok(light && dark, `${theme.id} 有浅色与深色映射`);
    assert.match(light[1], /--cx-window:/, `${theme.id} 映射窗口底色`);
    assert.match(light[1], /--cx-text:/, `${theme.id} 映射正文颜色`);
    assert.notEqual(light[1], dark[1], `${theme.id} 深浅色不一致`);
  }
  // 只映射配色；圆角、阴影这类几何令牌仍在 Codex 自己的覆盖层里。
  assert.equal(CODEX_TOKEN_MAP['--cx-radius-composer'], undefined);
  assert.equal(CODEX_TOKEN_MAP['--cx-window'], '--dsw-alias-bg-base');
});

test('发行 bundle 内联主题包与映射表', () => {
  assert.match(bundle, /const CODEX_THEME_PACK = \[\{"id":"/, 'bundle 内联主题数据');
  assert.match(bundle, /const CODEX_THEME_MAP_CSS = "html body\[data-dsh-codex-style\]\[data-dsh-theme=/, 'bundle 内联映射表');
  for (const theme of themes) {
    assert.ok(bundle.includes(`data-dsh-theme=\\"${theme.id}\\"`), `${theme.id} 进入映射表`);
  }
  assert.match(bundle, /function AppearancePage\(/, 'bundle 含外观设置页');
});

test('齿轮菜单只留「外观」入口，打开设置页', () => {
  assert.match(chrome, /title: '外观'/, '菜单项');
  assert.match(chrome, /openSettings\('codex-appearance'\)/, '打开设置分区');
  assert.match(css, /\.dsc-appearance-theme/, '外观页样式');
});

test('主题包写入与撤销 DOM、持久化选择', async () => {
  const attributes = new Map();
  const storage = new Map();
  const append = [];
  const document = {
    head: { appendChild: node => { append.push(node); node.isConnected = true; } },
    body: {
      getAttribute: key => attributes.get(key) ?? null,
      setAttribute: (key, value) => attributes.set(key, String(value)),
      removeAttribute: key => attributes.delete(key),
      hasAttribute: key => attributes.has(key)
    },
    documentElement: { lang: 'zh-CN' },
    createElement: () => ({ dataset: {}, textContent: '', remove() { this.isConnected = false; } })
  };
  const window = { __ModuleLoader__: { load: definition => { window.__definition = definition; } } };
  new Script(bundle.replace('    return module.exports;', 'module.exports.fixture = { createThemePack }; return module.exports;'), { filename: 'dsh-codex-style/client.js' })
    .runInNewContext({ window, document, localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key) }, console: { warn() {}, error() {} } });
  assert.ok(window.__definition, 'loader 收到插件定义');
  const factory = window.__definition.factory;
  const plugin = factory(name => {
    if (name === 'react') return { Component: class {} };
    if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: initial => ({ getSnapshot: () => initial, set() {}, subscribe: () => () => {} }) };
    return {};
  });
  assert.equal(typeof plugin.fixture?.createThemePack, 'function', 'bundle 可导出主题包工厂');

  const pack = plugin.fixture.createThemePack();
  assert.equal(pack.themes.length, 30, '运行时拿到 30 套主题');
  pack.mount();
  assert.equal(attributes.get('data-dsh-theme'), undefined, '未选主题时不改宿主属性');
  assert.ok(pack.select('ocean'), '可以选中主题');
  assert.equal(attributes.get('data-dsh-theme'), 'ocean', '写入宿主主题属性');
  assert.equal(storage.get('dsh-codex-style:theme'), 'ocean', '记住选择');
  assert.equal(pack.getActive(), 'ocean');
  pack.select(null);
  assert.equal(attributes.get('data-dsh-theme'), undefined, '恢复默认时撤掉属性');
  assert.equal(storage.get('dsh-codex-style:theme'), undefined, '恢复默认时清掉记忆');
  assert.equal(pack.select('nope'), false, '未知主题不生效');
  pack.select('forest');
  pack.unmount();
  assert.equal(attributes.get('data-dsh-theme'), undefined, '卸载时撤掉属性');
  assert.equal(append.length > 0, true, '样式注入到 head');
});
