import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

// 真实宿主 React 组件 + 本插件样式；思考增量由本地 fixture 提供，不发起模型请求。
const require = createRequire(import.meta.url);
const playwrightPaths = [
  process.env.CODEX_PLAYWRIGHT_MODULE,
  'playwright',
  path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
].filter(Boolean);
let chromium;
for (const candidate of playwrightPaths) {
  try { ({ chromium } = require(candidate)); break; } catch { /* 尝试下一个已安装路径 */ }
}
const asarPath = process.env.DSH_ASAR || '';
const browserPath = chromium && [
  process.env.DSH_BROWSER_EXECUTABLE,
  chromium.executablePath(),
  process.platform === 'win32' && path.join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
  process.platform === 'win32' && path.join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe')
].filter(Boolean).find(candidate => fs.existsSync(candidate));
const skip = !asarPath || !fs.existsSync(asarPath)
  ? 'set DSH_ASAR to an installed DSH app.asar'
  : !chromium ? 'Playwright unavailable; set CODEX_PLAYWRIGHT_MODULE'
    : !browserPath ? 'Chromium unavailable; set DSH_BROWSER_EXECUTABLE' : false;

function openAsar(filename) {
  const fd = fs.openSync(filename, 'r');
  const head = Buffer.alloc(8);
  fs.readSync(fd, head, 0, 8, 0);
  const headerSize = head.readUInt32LE(4), headerBytes = Buffer.alloc(headerSize);
  fs.readSync(fd, headerBytes, 0, headerSize, 8);
  const header = JSON.parse(headerBytes.subarray(8, 8 + headerBytes.readUInt32LE(4)).toString('utf8'));
  const files = new Map();
  const walk = (node, prefix = '') => {
    for (const [name, item] of Object.entries(node.files || {})) {
      const key = prefix ? `${prefix}/${name}` : name;
      if (item.files) walk(item, key); else files.set(key, item);
    }
  };
  walk(header);
  return {
    files,
    read(key) {
      const item = files.get(key);
      assert.ok(item, `ASAR member not found: ${key}`);
      const bytes = Buffer.alloc(item.size);
      fs.readSync(fd, bytes, 0, item.size, 8 + headerSize + Number(item.offset));
      return bytes;
    },
    close: () => fs.closeSync(fd)
  };
}

test('running reasoning is expandable and follows streaming updates', { skip }, async t => {
  const asar = openAsar(asarPath);
  let host, chat, hostCss, vendorCss, vendorJs, vendorName, hostVersion;
  try {
    const prefix = 'dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist/assets/';
    const asset = pattern => [...asar.files.keys()].find(key => key.startsWith(prefix) && pattern.test(path.basename(key)));
    const indexJs = asset(/^index-.*\.js$/), indexCss = asset(/^index-.*\.css$/);
    const vendor = asset(/^vendor-.*\.js$/), vendorStyle = asset(/^vendor-.*\.css$/);
    assert.ok(indexJs && indexCss && vendor && vendorStyle, 'host frontend assets must exist');
    host = asar.read(indexJs).toString('utf8');
    const boot = host.match(/(?:const|let|var)\s+([$\w]+)=globalThis\.dshDesktopBoot/);
    const table = host.match(/function ([$\w]+)\(\)\{return\{react:/);
    assert.ok(boot && table, 'host module table must be discoverable');
    host = host.slice(0, boot.index) + `\nwindow.fixtureModules=${table[1]}();`;
    const base = 'dsh/node_modules/@deepseek-ai/dsh-client-ui-chat/';
    hostVersion = JSON.parse(asar.read(base + 'package.json').toString('utf8')).version;
    chat = asar.read(base + 'lib/client.js').toString('utf8');
    const exports = 'ChatGroupSeat,AssistantNodeView,useDisclosure,useFlowHidden,useMotionHidden,createFlowMotion';
    const marker = 'return module.exports}});';
    assert.ok(chat.includes(marker), 'host component test export seam must exist');
    chat = chat.replace(marker, `module.exports.fixture={${exports}};${marker}`);
    hostCss = asar.read(indexCss);
    vendorCss = asar.read(vendorStyle);
    vendorJs = asar.read(vendor);
    vendorName = path.basename(vendor);
  } finally { asar.close(); }

  const bundlePath = process.env.DSH_BODY_BUNDLE;
  let bodyCss;
  if (bundlePath) {
    const bundle = fs.readFileSync(bundlePath, 'utf8');
    // build.mjs uses JSON.stringify; read just that literal without executing the bundle.
    const match = bundle.match(/\bconst\s+BODY_CSS_TEXT\s*=\s*("(?:\\.|[^"\\])*")\s*;/);
    assert.ok(match, 'BODY_CSS_TEXT JSON literal must exist in DSH_BODY_BUNDLE');
    bodyCss = JSON.parse(match[1]);
  } else {
    bodyCss = fs.readFileSync(new URL('../src/body.css', import.meta.url), 'utf8');
  }
  const html = `<!doctype html><html data-ds-dark-theme><head><meta charset="utf-8">
<link rel="icon" href="data:,"><link rel="stylesheet" href="/vendor.css"><link rel="stylesheet" href="/host.css">
<style>${bodyCss}</style></head><body data-dsc-codex-body data-dsh-codex-style style="color:#eee;background:#181818;font:14px/24px sans-serif">
<div id="fixture" style="width:740px;margin:32px"></div><script type="module">
import '/host.js';
window.loaded={};
window.__ModuleLoader__={load:d=>loaded[d.id]=d.factory(Object.assign(id=>{
  if(!(id in fixtureModules))throw Error('Missing '+id);return fixtureModules[id];
},{asset:x=>'/fixture-asset/'+x}))};
await import('/chat.js');
const React=fixtureModules.react,h=React.createElement,C=loaded['@deepseek-ai/dsh-client-ui-chat'].fixture;
const source=value=>{const listeners=new Set();return{getSnapshot:()=>value,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},set:next=>{value=next;listeners.forEach(fn=>fn());}}};
const useSource=(store,select=x=>x)=>select(React.useSyncExternalStore(store.subscribe,store.getSnapshot));
const policy=source({foldedReplies:'all',foldCompletedTurns:true,stepGrouping:'collapsed',liveProcessDetail:true,settledReasoningPreview:true,collapseTiming:'completion'});
const view=source({turnProcesses:[]});
const turnData=new Map();turnData.source=()=>({getSnapshot:()=>null,subscribe:()=>()=>{}});
const turn={turn:1,status:'open',start:{time:Date.now()},data:turnData};
const first={key:'first',kind:'assistant-step',anchorSeq:2,location:{kind:'step',turn},data:{step:1,status:'running',blocks:[{kind:'reasoning',text:'Initial reasoning.'}]}};
const nodes=source(new Map([['first',first]]));
const groups=source(new Map([['g',{key:'g',data:{turn:1,closed:false,summary:{running:'thinking',runningDetail:'',counts:[{kind:'thinking',count:1}]}},members:[{kind:'node',key:'first',groupPart:'reasoning'}]}]]));
const spec={turn:1,processStartSeq:1,answerAnchorSeq:null,answerStep:null,inlineReasoning:true};
const process={turn:1,turnStarted:true,turnClosed:false,hasExternalProcess:true,hasNonReplyProcess:true,hasInterleavedInput:false,spec};
const usePresentation=selector=>useSource(policy,selector),useStore=selector=>useSource(view,selector);
const useChatNode=(key,selector=x=>x)=>useSource(nodes,s=>selector(s.get(key)));
const useChatNodeBottom=()=>false,useChatNodeProcess=()=>process,useChatGroup=(key,selector=x=>x)=>useSource(groups,s=>selector(s.get(key)));
const motion=C.createFlowMotion(()=>null,()=>{}),useGroupAction=(hidden,reveal)=>C.useFlowHidden(hidden,reveal,motion);
function useGroupHeaderAction(ref,hidden){C.useMotionHidden(ref,hidden,motion);}
const translate=key=>({'message.think':'Thinking','message.stepProcess.thinking':'Thinking','row.running':'Running'}[key]||key);
const renderSlot=(name,owner,opts)=>{
  if(name==='conversation.chat.node'&&opts.entryKey==='assistant-step')return h(C.AssistantNodeView,{...owner,useContextMenu:()=>({getTriggerProps:()=>({})}),resolveFilePath:x=>x,useTurnData:()=>null,useDisclosure:C.useDisclosure,useGroupAction,usePresentation,renderSlot,t:translate});
  if(name==='conversation.chat.reasoning.body')return h('div',{'data-fixture-reasoning-body':''},owner.text);
  return null;
};
const actions={setTurnProcessOpen(){}};
function Root(){return h('div',{'data-chat-flow':''},h(C.ChatGroupSeat,{groupKey:'g',useChatGroup,useGroupHeaderAction,useChatNode,useChatNodeBottom,useChatNodeProcess,usePresentation,useStore,actions,renderSlot,t:translate,useGroupAction,deferCollapse:false}));}
fixtureModules['react-dom/client'].createRoot(document.getElementById('fixture')).render(h(Root));
window.fixture={
  change(key,patch){const next=new Map(nodes.getSnapshot()),node=next.get(key);next.set(key,{...node,data:{...node.data,...patch}});nodes.set(next);},
  text(key,text){this.change(key,{blocks:[{kind:'reasoning',text}]});},
  addSecond(){const next=new Map(nodes.getSnapshot());next.set('second',{...first,key:'second',anchorSeq:4,data:{...first.data,step:2,blocks:[{kind:'reasoning',text:'Later reasoning.'}]}});nodes.set(next);const grouped=new Map(groups.getSnapshot()),g=grouped.get('g');grouped.set('g',{...g,members:[...g.members,{kind:'node',key:'second',groupPart:'reasoning'}]});groups.set(grouped);}
};
window.ready=true;
</script></body></html>`;

  const routes = new Map([
    ['/', ['text/html', html]], ['/host.js', ['text/javascript', host]], ['/chat.js', ['text/javascript', chat]],
    ['/host.css', ['text/css', hostCss]], ['/vendor.css', ['text/css', vendorCss]],
    ['/' + vendorName, ['text/javascript', vendorJs]]
  ]);
  const browser = await chromium.launch({ executablePath: browserPath, headless: true, args: ['--no-proxy-server'] });
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width: 1050, height: 950 } });
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => {
    const item = routes.get(new URL(route.request().url()).pathname);
    return item ? route.fulfill({ contentType: item[0], body: item[1] }) : route.fulfill({ status: 404, body: '' });
  });
  await page.goto('http://body-reasoning.fixture/');
  await page.waitForFunction(() => window.ready === true);
  const groupSelector = '[data-chat-group-key="g"] > div > [data-process-activity="thinking"]';
  const group = page.locator(groupSelector);
  await group.click();
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute('aria-expanded') === 'true', groupSelector);
  const first = page.locator('[data-chat-node-key="first"] [data-variant="think"]');
  await first.waitFor({ state: 'attached' });
  assert.equal(await first.isVisible(), true, 'running thinking must remain visible after its group opens');
  const firstRow = first.locator('[data-disclosure-row]');
  await firstRow.click();
  assert.equal(await firstRow.getAttribute('aria-expanded'), 'true');
  const body = first.locator('[data-fixture-reasoning-body]');
  await body.waitFor({ state: 'visible' });

  for (const text of ['Initial reasoning.', 'Initial reasoning. One.', 'Initial reasoning. One. Two.']) {
    await page.evaluate(value => window.fixture.text('first', value), text);
    await page.waitForFunction(value => document.querySelector('[data-chat-node-key="first"] [data-fixture-reasoning-body]')?.textContent === value, text);
    assert.equal(await body.isVisible(), true, 'streaming reasoning remains visible');
  }
  await firstRow.click();
  await body.waitFor({ state: 'hidden' });
  await firstRow.click();
  await body.waitFor({ state: 'visible' });
  assert.equal(await body.textContent(), 'Initial reasoning. One. Two.');
  await group.click();
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute('aria-expanded') === 'false', groupSelector);
  await group.click();
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute('aria-expanded') === 'true', groupSelector);
  await first.waitFor({ state: 'visible' });
  if (await firstRow.getAttribute('aria-expanded') !== 'true') await firstRow.click();
  await body.waitFor({ state: 'visible' });
  assert.equal(await body.textContent(), 'Initial reasoning. One. Two.');

  await page.evaluate(() => window.fixture.change('first', { status: 'ok' }));
  await page.waitForFunction(() => document.querySelector('[data-chat-node-key="first"] [data-variant="think"]')?.getAttribute('data-state') === 'ok');
  assert.equal(await firstRow.getAttribute('aria-expanded'), 'true', 'completion retains the open disclosure');
  assert.equal(await body.textContent(), 'Initial reasoning. One. Two.');
  await page.evaluate(() => window.fixture.addSecond());
  const second = page.locator('[data-chat-node-key="second"] [data-variant="think"][data-state="running"]');
  await second.waitFor({ state: 'visible' });
  const secondRow = second.locator('[data-disclosure-row]');
  await secondRow.click();
  const secondBody = second.locator('[data-fixture-reasoning-body]');
  await secondBody.waitFor({ state: 'visible' });
  await page.evaluate(() => window.fixture.text('second', 'Later reasoning. Updated.'));
  await page.waitForFunction(() => document.querySelector('[data-chat-node-key="second"] [data-fixture-reasoning-body]')?.textContent === 'Later reasoning. Updated.');

  await page.evaluate(() => window.fixture.text('second', ''));
  await second.waitFor({ state: 'detached' });
  await page.evaluate(() => window.fixture.text('second', 'Later reasoning returns.'));
  await second.waitFor({ state: 'visible' });
  assert.equal(await second.locator('[data-disclosure-row]').getAttribute('aria-expanded'), 'false');
  assert.deepEqual(errors, []);
  t.diagnostic(`Host ${hostVersion}; CSS from ${bundlePath ? 'bundle' : 'source'}; actual host components, synthetic stream; no model request`);
});
