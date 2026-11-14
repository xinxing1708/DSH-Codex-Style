import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// 空态项目栏必须留在输入卡内部：hero 阶段 Conversation 根节点 isolate 成独立层叠上下文，
// 挂在 body 上的 fixed 浮层会盖住卡片第一行草稿（见 GitHub issue #3）。
const [chrome, css, client, bundle] = await Promise.all([
  readFile(new URL('../src/chrome.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/client.js', import.meta.url), 'utf8'),
  readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
]);
const hero = chrome.slice(chrome.indexOf('function makeHeroWorkspace(ctx)'));

test('hero 项目栏 portal 到输入卡，不再是挂 body 的 fixed 浮层', () => {
  assert.match(hero, /createPortal\(h\('div', \{ className: 'dsc-ui dsc-hero-projectbar'[\s\S]*?menu\), card\)/, '项目栏渲染在卡片内');
  assert.doesNotMatch(hero, /document\.body\)/, 'hero 项目栏不再挂到 body');
  assert.doesNotMatch(css, /\.dsc-hero-projectbar \{[^}]*position: fixed/, '项目栏不再 fixed');
  assert.match(css, /\.dsc-hero-projectbar \{[^}]*position: absolute/, '项目栏相对卡片定位');
});

test('卡片为项目栏让出拦高，草稿显示在项目栏下方', () => {
  assert.match(css, /\[data-content-phase="hero"\] \[data-composer-card\] \{[^}]*padding-top: calc\(var\(--cx-picker-h\) \+ 8px\)/, '卡片顶部让出项目栏高度');
  assert.match(css, /\.dsc-hero-projectbar \{[^}]*height: var\(--cx-picker-h\)/, '项目栏高度与让位一致');
});

test('项目栏点击不冒泡到卡片自身的选工作区入口', () => {
  assert.match(hero, /onClick: keepCardClick/, '项目栏吞掉卡片点击');
  assert.match(hero, /const keepCardClick = event => event\.stopPropagation\(\)/, '停止冒泡');
});

test('模式胶囊与项目菜单贴合卡片首行', () => {
  assert.match(css, /\[data-slot="conversation\.hero\.agentPreset"\] \{[^}]*top: calc\(var\(--dsc-hero-card-top\) \+ 5px\)/, '模式胶囊落在项目栏一行');
  assert.match(hero, /placement: 'top-start'/, '菜单左缘对齐触发器');
  assert.match(client, /placement === 'top-start' \? box\.left : box\.right - w/, 'Popover 支持左缘对齐');
});

test('发行 bundle 已包含修复', () => {
  assert.match(bundle, /dsc-ui dsc-hero-projectbar'[\s\S]*?menu\), card\)/, 'bundle 项目栏挂在卡内');
  assert.doesNotMatch(bundle, /dsc-hero-projectbar', style: \{ left:/, 'bundle 不再使用 fixed 坐标');
});
