import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');
const bundle = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');

test('Remote 兼容层存在并走主题令牌', () => {
  assert.match(css, /Remote（dsh-remote）兼容层/, '兼容层分节');
  assert.match(css, /\[data-rw-ide-shell\] \{[\s\S]*?left: var\(--cx-rail-w\) !important/, '工作台让出 rail');
  assert.match(css, /\.dsh-rw-modal-panel, \[data-rw-dir-picker\][\s\S]*?z-index: 10060 !important/, '弹窗层级高于本插件浮层');
  assert.match(css, /\[data-rw-ide-header\][\s\S]*?background: var\(--cx-window\)/, '顶栏底色');
  assert.match(css, /\[data-rw-ide-tree\][\s\S]*?background: var\(--cx-sidebar\)/, '文件树表面');
  assert.match(css, /font-family: var\(--cx-font-sans\)/, '字体统一');
  assert.doesNotMatch(css, /data-rw-ide-teat/, '无拼写残留');
  assert.match(bundle, /Remote（dsh-remote）兼容层/, '构建产物包含兼容层');
});
