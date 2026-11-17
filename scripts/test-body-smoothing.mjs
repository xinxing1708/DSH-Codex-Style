import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

// Browser checks use an existing Playwright installation; no runtime dependency is added.
// Set DSC_PLAYWRIGHT_PATH when Playwright is supplied outside node_modules.
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require(process.env.DSC_PLAYWRIGHT_PATH || 'playwright')); } catch {}
const skip = chromium ? false : 'Set DSC_PLAYWRIGHT_PATH to an existing Playwright installation';
const js = await readFile(process.env.DSC_BODY_JS_PATH || new URL('../src/body.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/body.css', import.meta.url), 'utf8');

async function fixture(t) {
  const browser = await chromium.launch({ channel: process.env.DSC_BROWSER_CHANNEL || 'msedge', headless: true, args: ['--no-proxy-server'] });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 900, height: 650 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setContent('<body data-dsc-codex-body style="margin:0;background:#181818;color:#ddd;font:16px/24px sans-serif"><div data-conversation-session="fixture"><div data-conversation-scroll style="height:550px;overflow:auto;background:#181818"><div id="messages"></div><div data-conversation-region="composer" style="position:sticky;bottom:0;height:40px"></div></div></div></body>');
  await page.addStyleTag({ content: css + '[data-stream-body]{display:flex;flex-direction:column;gap:16px;width:450px}p{margin:0}' });
  await page.addScriptTag({ content: js });
  await page.evaluate(() => {
    const original = window.requestAnimationFrame.bind(window);
    window.frames = 0;
    window.requestAnimationFrame = callback => original(time => { window.frames++; callback(time); });
    window.stop = mountBodySmoothing();
    window.add = html => {
      const root = document.createElement('div'); root.setAttribute('data-streaming', '');
      const body = document.createElement('div'); body.dataset.streamBody = '';
      const wrapper = document.createElement('div'); wrapper.innerHTML = html;
      body.appendChild(wrapper); root.appendChild(body); messages.appendChild(root);
      window.current = { root, body, wrapper };
    };
  });
  return { page, errors };
}

test('an idle stream stops requesting frames while it waits for more text', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>等</p>'));
  await page.waitForTimeout(900);
  await page.evaluate(() => { window.frames = 0; });
  await page.waitForTimeout(250);
  const frames = await page.evaluate(() => window.frames);
  assert.ok(frames <= 1, `idle stream requested ${frames} frames in 250ms`);
  assert.deepEqual(errors, []);
});

test('new text in a paragraph with inline formatting is revealed gradually', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p><strong>重点</strong>初始文字</p>'));
  await page.waitForTimeout(800);
  await page.evaluate(() => { current.wrapper.querySelector('p').lastChild.data += '随后突发新增一大段内容看看是否连续地浮现。'.repeat(35); });
  await page.waitForTimeout(35);
  const bounds = await page.evaluate(() => ({ shown: current.body.offsetHeight, full: current.body.scrollHeight }));
  assert.ok(bounds.shown < bounds.full, `rich paragraph jumped directly to ${bounds.shown}/${bounds.full}px`);
  assert.deepEqual(errors, []);
});

test('steady reveal does not rescan the document every animation frame', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '持续揭示的文字'.repeat(300) + '</p>'));
  await page.waitForTimeout(60);
  await page.evaluate(() => {
    const original = document.querySelectorAll.bind(document);
    window.scans = 0;
    document.querySelectorAll = (...args) => { window.scans++; return original(...args); };
  });
  await page.waitForTimeout(200);
  const scans = await page.evaluate(() => window.scans);
  assert.ok(scans <= 2, `steady reveal performed ${scans} full-document scans in 200ms`);
  assert.deepEqual(errors, []);
});

test('updates inside an active message do not rescan unrelated conversations', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '开始输出'.repeat(150) + '</p>'));
  await page.waitForTimeout(60);
  const scans = await page.evaluate(async () => {
    const original = document.querySelectorAll.bind(document);
    let count = 0;
    document.querySelectorAll = (...args) => { count++; return original(...args); };
    const p = current.wrapper.querySelector('p');
    for (let i = 0; i < 8; i++) {
      p.textContent += '新增文本';
      await new Promise(resolve => setTimeout(resolve, 20));
    }
    document.querySelectorAll = original;
    return count;
  });
  assert.ok(scans <= 2, `message updates caused ${scans} full-document scans`);
  assert.deepEqual(errors, []);
});

test('replacing tail text does not re-examine unchanged earlier Markdown blocks', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => {
    stop();
    add(Array.from({ length: 30 }, (_, i) => `<p class="stable">已显示的第 ${i + 1} 段 <strong>正文</strong></p>`).join('') + '<p>正在输出：<span id="tail">起始内容</span></p>');
    stop = mountBodySmoothing();
  });
  await page.waitForTimeout(80);
  const result = await page.evaluate(async () => {
    const stable = new Set(current.wrapper.querySelectorAll('.stable'));
    const original = Element.prototype.querySelector;
    let stableQueries = 0;
    Element.prototype.querySelector = function (...args) {
      if (stable.has(this)) stableQueries++;
      return original.apply(this, args);
    };
    try {
      const tail = current.wrapper.querySelector('#tail');
      for (let i = 0; i < 6; i++) {
        tail.textContent += '继续流式输出的一段新内容。'.repeat(16);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      return { stableQueries, shown: current.body.offsetHeight, full: current.body.scrollHeight };
    } finally {
      Element.prototype.querySelector = original;
    }
  });
  assert.ok(result.shown < result.full, `updated text must still be gradually revealed: ${result.shown}/${result.full}px`);
  assert.equal(result.stableQueries, 0, `unchanged earlier blocks were re-examined ${result.stableQueries} times`);
  assert.deepEqual(errors, []);
});

test('moving the reveal edge does not force layout on every frame', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '连续呈现的正文内容'.repeat(60) + '</p>'));
  await page.waitForTimeout(60);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Performance.enable');
  await page.evaluate(() => { window.frames = 0; });
  const metrics = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(row => [row.name, row.value]));
  const before = await metrics();
  await page.waitForTimeout(300);
  const frames = await page.evaluate(() => window.frames);
  const after = await metrics();
  const layouts = after.LayoutCount - before.LayoutCount;
  assert.ok(layouts <= Math.max(10, Math.ceil(frames * 2 / 3)), `${layouts} layouts for ${frames} reveal frames`);
  assert.deepEqual(errors, []);
});

test('the waiting reveal edge follows scrolling and is clipped to the conversation viewport', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => {
    DSC_BODY_SMOOTH.holdMs = 3000;
    const spacer = document.createElement('div'); spacer.style.height = '180px'; messages.appendChild(spacer);
    add('<p>abcdef</p>');
    const below = document.createElement('div'); below.style.height = '800px'; messages.appendChild(below);
  });
  await page.waitForFunction(() => document.querySelector('.dsc-body-edge-viewport'));
  await page.waitForTimeout(250);
  const before = await page.evaluate(() => document.querySelector('.dsc-body-edge-viewport').getBoundingClientRect().top);
  await page.evaluate(() => { document.querySelector('[data-conversation-scroll]').scrollTop = 80; });
  await page.waitForFunction(top => document.querySelector('.dsc-body-edge-viewport')?.getBoundingClientRect().top <= top - 60, before, { timeout: 1500 });
  const after = await page.evaluate(() => document.querySelector('.dsc-body-edge-viewport').getBoundingClientRect().top);
  assert.ok(after <= before - 60, `edge did not follow scroll: ${before} → ${after}`);
  assert.deepEqual(errors, []);
});

test('the waiting reveal edge follows expansion of earlier work in the same session', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => {
    DSC_BODY_SMOOTH.holdMs = 3000;
    const previous = document.createElement('div'); previous.id = 'previous-work';
    previous.hidden = true; previous.style.height = '100px'; messages.appendChild(previous);
    add('<p>abcdef</p>');
  });
  await page.waitForFunction(() => document.querySelector('.dsc-body-edge-viewport'));
  await page.waitForTimeout(250);
  const before = await page.evaluate(() => document.querySelector('.dsc-body-edge-viewport').getBoundingClientRect().top);
  await page.evaluate(() => { document.querySelector('#previous-work').hidden = false; });
  await page.waitForTimeout(120);
  const after = await page.evaluate(() => document.querySelector('.dsc-body-edge-viewport').getBoundingClientRect().top);
  assert.ok(after >= before + 90, `edge did not follow earlier work: ${before} → ${after}`);
  assert.deepEqual(errors, []);
});

test('hiding a session releases a waiting edge and restores its clipping', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>abcdef</p>'));
  await page.waitForFunction(() => document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 1500 });
  await page.evaluate(() => { document.querySelector('[data-conversation-session]').style.display = 'none'; });
  await page.waitForFunction(() => !current.body.style.maxHeight && !document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 1500 });
  const state = await page.evaluate(() => ({ clip: current.body.style.maxHeight, edges: document.querySelectorAll('.dsc-body-edge-viewport').length }));
  assert.deepEqual(state, { clip: '', edges: 0 });
  await page.evaluate(() => { document.querySelector('[data-conversation-session]').style.display = ''; });
  // Reappearance of the edge is the observable completion of the restored history baseline.
  await page.waitForFunction(() => document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 1500 });
  await page.evaluate(() => { current.wrapper.querySelector('p').firstChild.data += '重新显示后继续输出新的文字'.repeat(45); });
  await page.waitForFunction(() => current.body.offsetHeight < current.body.scrollHeight, null, { timeout: 1500 });
  const resumed = await page.evaluate(() => ({ shown: current.body.offsetHeight, full: current.body.scrollHeight }));
  assert.ok(resumed.shown < resumed.full, 'new text after returning to a session was not revealed gradually');
  assert.deepEqual(errors, []);
});

test('ending a stream drains queued blocks and removes the temporary clipping', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '第一段文字'.repeat(60) + '</p><pre>const x = 1;</pre><p>' + '第二段文字'.repeat(60) + '</p>'));
  await page.waitForTimeout(40);
  const initial = await page.evaluate(() => ({ shown: current.body.offsetHeight, full: current.body.scrollHeight }));
  assert.ok(initial.shown < initial.full, 'queued text must start clipped');
  await page.evaluate(() => current.root.removeAttribute('data-streaming'));
  await page.waitForFunction(() => !current.body.style.maxHeight && !document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 4000 });
  const result = await page.evaluate(() => ({ text: current.wrapper.textContent, fades: current.wrapper.querySelectorAll('.dsc-body-smooth-fade').length }));
  assert.ok(result.text.includes('const x = 1;') && result.text.includes('第二段文字'));
  assert.equal(result.fades, 0);
  assert.deepEqual(errors, []);
});

test('a final block added in the same update as stream completion still drains in order', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '初'.repeat(30) + '</p>'));
  await page.waitForTimeout(60);
  await page.evaluate(() => {
    const final = document.createElement('p'); final.textContent = '后'.repeat(800);
    current.wrapper.appendChild(final);
    current.root.removeAttribute('data-streaming');
  });
  await page.waitForTimeout(200);
  const progress = await page.evaluate(() => ({ shown: current.body.offsetHeight, full: current.body.scrollHeight }));
  assert.ok(progress.shown < progress.full, 'the final block became visible before its queued reveal');
  await page.waitForFunction(() => !current.body.style.maxHeight && !document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 4000 });
  assert.deepEqual(errors, []);
});

test('the reveal edge follows the conversation background after a theme change', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => { DSC_BODY_SMOOTH.holdMs = 3000; add('<p>abcdef</p>'); });
  await page.waitForFunction(() => document.querySelector('.dsc-body-edge'));
  await page.evaluate(() => {
    document.querySelector('[data-conversation-scroll]').style.backgroundColor = 'rgb(240, 240, 240)';
    document.body.setAttribute('data-ds-dark-theme', 'changed');
  });
  await page.waitForTimeout(80);
  const colors = await page.evaluate(() => ({ edge: getComputedStyle(document.querySelector('.dsc-body-edge')).backgroundColor, scroll: getComputedStyle(document.querySelector('[data-conversation-scroll]')).backgroundColor }));
  assert.equal(colors.edge, colors.scroll);
  assert.deepEqual(errors, []);
});

test('reduced motion and disposal restore the host container', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => add('<p>' + '需要裁剪'.repeat(150) + '</p>'));
  await page.waitForTimeout(40);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !current.body.style.maxHeight && !document.querySelector('.dsc-body-edge-viewport'), null, { timeout: 1500 });
  let state = await page.evaluate(() => ({ clip: current.body.style.maxHeight, edges: document.querySelectorAll('.dsc-body-edge-viewport').length }));
  assert.deepEqual(state, { clip: '', edges: 0 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(40);
  await page.evaluate(() => { stop(); current.body.style.setProperty('max-height', '800px', 'important'); stop = mountBodySmoothing(); stop(); });
  state = await page.evaluate(() => ({ value: current.body.style.getPropertyValue('max-height'), priority: current.body.style.getPropertyPriority('max-height'), edges: document.querySelectorAll('.dsc-body-edge-viewport').length }));
  assert.deepEqual(state, { value: '800px', priority: 'important', edges: 0 });
  assert.deepEqual(errors, []);
});

test('the reveal edge moves with text when host auto-scrolls during ResizeObserver delivery', { skip }, async t => {
  const { page, errors } = await fixture(t);
  await page.evaluate(() => {
    DSC_BODY_SMOOTH.holdMs = 30000;
    DSC_BODY_SMOOTH.tailKeep = 0;
    DSC_BODY_SMOOTH.drainMs = 1200;
    document.querySelector('[data-conversation-scroll]').style.height = '180px';
    add('<p>底部滚动与流式遮罩对齐。</p>');
  });
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    const scroller = document.querySelector('[data-conversation-scroll]');
    window.scrollSamples = [];
    window.hostScrollObserver = new ResizeObserver(entries => {
      if (!entries.some(entry => entry.target === current.body)) return;
      const edge = document.querySelector('.dsc-body-edge-viewport');
      if (!edge) return;
      const beforeBody = current.body.getBoundingClientRect().top;
      const beforeEdge = edge.getBoundingClientRect().top;
      const beforeScroll = scroller.scrollTop;
      scroller.scrollTop = scroller.scrollHeight;
      const bodyShift = current.body.getBoundingClientRect().top - beforeBody;
      const edgeShift = edge.getBoundingClientRect().top - beforeEdge;
      if (scroller.scrollTop !== beforeScroll) window.scrollSamples.push({ bodyShift, edgeShift });
    });
    hostScrollObserver.observe(current.body);
    current.wrapper.querySelector('p').firstChild.data += (' 新增流式正文，用于触发尾部滚动与遮罩同步。'.repeat(40));
  });
  await page.waitForFunction(() => window.scrollSamples.length >= 3, null, { timeout: 4000 });
  const samples = await page.evaluate(() => window.scrollSamples);
  for (const { bodyShift, edgeShift } of samples) {
    assert.ok(Math.abs(bodyShift - edgeShift) < 0.5,
      `auto-scroll displaced text ${bodyShift}px but edge ${edgeShift}px in the same frame`);
  }
  assert.deepEqual(errors, []);
});

