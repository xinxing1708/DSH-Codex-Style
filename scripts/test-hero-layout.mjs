import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const chrome = await readFile(new URL('../src/chrome.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8');

test('hero project picker is portaled inside the native composer card', () => {
  const workspace = chrome.slice(chrome.indexOf('function makeHeroWorkspace(ctx)'));
  assert.match(workspace, /createPortal\(h\('div', \{ className: 'dsc-ui dsc-hero-projectbar'/);
  assert.match(workspace, /menu\), card\)/);
  assert.match(css, /\[data-content-phase="hero"\].*\[data-composer-card\] \{[^}]*padding-top:/);
  assert.doesNotMatch(css, /\.dsc-hero-projectbar \{[^}]*position: fixed/);
});

test('hero agent preset sits within composer top row', () => {
  assert.match(css, /\[data-slot="conversation.hero.agentPreset"\] \{[^}]*top: calc\(var\(--dsc-hero-card-top\) \+ /);
});

test('todo dock follows measured composer card width', () => {
  assert.match(css, /\[data-conversation-region="composer"\] \[data-testid="todo-panel"\] \{[^}]*width: min\(calc\(100% - 32px\), var\(--dsc-composer-visual-width, 100%\)\)/);
});
