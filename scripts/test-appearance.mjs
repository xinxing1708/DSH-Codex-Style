import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

// 外观页把主题选择搬进「设置 → 外观」，预设只给背景/前景/强调色三元组，其余令牌运行时推导。
const [appearanceSource, clientSource, css, bundle] = await Promise.all([
  readFile(new URL('../src/appearance.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/client.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
  readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
]);

test('外观页注册为设置分区，齿轮菜单直接跳转过去', () => {
  assert.match(clientSource, /installAppearance\(ctx\)/, '插件启动时挂载外观页');
  assert.match(appearanceSource, /name: 'settings\.section', id: 'codex-appearance', order: \d+, label: '外观'/, '注册设置分区');
  assert.match(appearanceSource, /name: 'settings\.section\.icon', id: 'codex-appearance'/, '注册分区图标');
  assert.match(css, /\.dsc-appearance-modes/, '模式选择样式');
});

test('内置预设包含图 4 的 Rose Pine 参数', () => {
  assert.ok(appearanceSource.includes("light: { bg: '#FAF4ED', fg: '#575279', accent: '#D7827E' }"), 'Rose Pine 浅色三元组');
  assert.ok(appearanceSource.includes("dark: { bg: '#191724', fg: '#E0DEF4', accent: '#EBBCBA' }"), 'Rose Pine 深色三元组');
  for (const name of ['Nord', 'Solarized', 'Tokyo Night', 'Gruvbox', 'Catppuccin', 'Dracula', 'One Dark', 'GitHub']) {
    assert.ok(appearanceSource.includes(`name: '${name}'`), `${name} 预设`);
  }
  assert.match(appearanceSource, /id: 'default', name: 'DeepSeek 默认'/, 'DeepSeek 默认作为默认预设');
  for (const font of ['Inter', '等宽']) assert.ok(appearanceSource.includes(`name: '${font}'`), `${font} 字体项`);
});

test('三色推导出 Codex 与宿主两套令牌', () => {
  assert.match(appearanceSource, /function deriveTokens\(triple\)/, '推导函数');
  assert.match(appearanceSource, /'--cx-window': bg/, '窗口色取背景');
  assert.match(appearanceSource, /'--cx-text': fg/, '正文色取前景');
  assert.match(appearanceSource, /'--cx-accent': accent/, '强调色');
  assert.match(appearanceSource, /'--dsw-alias-bg-base': bg/, '宿主底色同步');
  assert.match(appearanceSource, /'--dsw-specific-bubble': mix\(bg, fg, 0\.06\)/, '用户气泡跟随背景');
  assert.match(appearanceSource, /'--dsw-specific-bubble-highlight': alpha\(accent, 0\.14\)/, '气泡高亮跟随强调色');
  assert.match(appearanceSource, /html body\[data-dsh-codex-style\]\[data-dsh-appearance\]/, '映射选择器压过默认令牌');
});

test('运行时写入、切换明暗、自定义颜色与字体，并可复位', async () => {
  const attributes = new Map();
  const bodyStyle = new Map();
  const styles = [];
  const document = {
    head: { appendChild: node => styles.push(node) },
    body: {
      getAttribute: key => attributes.get(key) ?? null,
      setAttribute: (key, value) => attributes.set(key, String(value)),
      removeAttribute: key => attributes.delete(key),
      hasAttribute: key => attributes.has(key),
      toggleAttribute: (key, force) => { const next = force === undefined ? !attributes.has(key) : !!force; if (next) attributes.set(key, ''); else attributes.delete(key); return next; },
      style: {
        setProperty: (key, value) => bodyStyle.set(key, value),
        removeProperty: key => bodyStyle.delete(key)
      }
    },
    documentElement: { lang: 'zh-CN' },
    createElement: () => ({ dataset: {}, textContent: '', remove() {} })
  };
  const storage = new Map();
  const window = { __ModuleLoader__: { load: definition => { window.__definition = definition; } } };
  new Script(bundle.replace('    return module.exports;', 'module.exports.fixture = { createAppearance, initializeSidebarWidth }; return module.exports;'), { filename: 'dsh-codex-style/client.js' })
    .runInNewContext({ window, document, localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, String(value)), removeItem: key => storage.delete(key) }, console: { warn() {}, error() {} } });
  const plugin = window.__definition.factory(name => {
    if (name === 'react') return { Component: class {} };
    if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: initial => ({ getSnapshot: () => initial, set() {}, subscribe: () => () => {} }) };
    return {};
  });
  const layout = { width: 280 };
  const sidebarCalls = [];
  const layoutStore = {
    getSnapshot: () => ({ layoutInfo: { sidebar: layout.width } }),
    actions: { setSidebar: value => { layout.width = value; sidebarCalls.push(value); } },
    subscribe: () => () => {}
  };
  plugin.fixture.initializeSidebarWidth({ slots: { entriesOfSlot: () => [{ store: { create: () => layoutStore } }] } });
  const appearance = plugin.fixture.createAppearance({});
  assert.ok(appearance, '可导出外观实例');
  appearance.mount();
  assert.equal(attributes.has('data-dsh-appearance'), false, '未选预设时不写属性');
  assert.ok(styles.length > 0, '样式容器已注入');

  appearance.setPreset('rose-pine');
  assert.equal(attributes.get('data-dsh-appearance'), 'rose-pine', '选中预设写入属性');
  const lightCss = styles[0].textContent;
  assert.match(lightCss, /--cx-window:#FAF4ED/, '浅色背景生效');
  assert.match(lightCss, /--cx-accent:#D7827E/, '浅色强调色生效');
  assert.equal(attributes.has('data-ds-dark-theme'), false, '浅色模式不挂深色标记');

  appearance.setMode('dark');
  assert.equal(attributes.has('data-ds-dark-theme'), true, '深色模式挂宿主标记');
  assert.match(styles[0].textContent, /--cx-accent:#EBBCBA/, '深色强调色生效');

  appearance.setColor('accent', '#123456');
  assert.equal(attributes.get('data-dsh-appearance'), 'custom', '改色转为自定义');
  assert.match(styles[0].textContent, /--cx-accent:#123456/, '自定义颜色写入');

  appearance.setDensity('compact');
  assert.equal(attributes.get('data-dsc-density'), 'compact', '紧凑密度写入标记');
  assert.match(storage.get('dsh-codex-style:appearance') || '', /"density":"compact"/, '密度持久化');

  appearance.setSidebarWidth(312);
  assert.equal(sidebarCalls.at(-1), 312, '侧栏宽度写入宿主 store');
  assert.equal(storage.get('dsh-codex-style:sidebar-width'), '312', '侧栏宽度持久化');

  appearance.setFont('inter');
  assert.match(bodyStyle.get('--cx-font-sans') || '', /Inter/, '字体写入 CSS 变量');
  assert.match(String(bodyStyle.get('font-family') || ''), /Inter/, '字体写入 body');

  appearance.reset();
  assert.equal(attributes.has('data-dsh-appearance'), false, '复位后撤掉属性');
  assert.equal(styles[0].textContent, '', '复位后清空样式');
  assert.equal(bodyStyle.has('--cx-font-sans'), false, '复位后撤掉字体');
});
