// 独立宿主 Markdown/滚动验证，不请求模型、不读取 profile、不操作日常 DSH 进程。
// DSH_ASAR=<installed app.asar> [DSH_BODY_BUNDLE=<built client.js>] [DSC_BODY_JS_PATH=<source body.js>]
// [HOST_OFF=1] [HOST_SHOW=1] [HOST_SNAPSHOT=<png>] node body-markdown-fixture.mjs
// 未指定 DSH_BODY_BUNDLE 时使用当前源码；调用方可用 HOST_SNAPSHOT 指定截图路径。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const archive = process.env.DSH_ASAR;
const pw = process.env.DSC_PLAYWRIGHT_PATH || process.env.CODEX_PLAYWRIGHT_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { chromium } = require(pw);
const browserPath = [process.env.DSH_BROWSER_EXECUTABLE, chromium.executablePath(),
  process.platform === 'win32' && path.join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
  process.platform === 'win32' && path.join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe')
].filter(Boolean).find(candidate => fs.existsSync(candidate));

function openAsar(filename) {
  const fd = fs.openSync(filename, 'r'), head = Buffer.alloc(8);
  fs.readSync(fd, head, 0, 8, 0);
  const headerSize = head.readUInt32LE(4), bytes = Buffer.alloc(headerSize);
  fs.readSync(fd, bytes, 0, headerSize, 8);
  const header = JSON.parse(bytes.subarray(8, 8 + bytes.readUInt32LE(4)).toString('utf8'));
  const files = new Map();
  function walk(node, prefix = '') {
    for (const [name, item] of Object.entries(node.files || {})) {
      const key = prefix ? prefix + '/' + name : name;
      if (item.files) walk(item, key); else files.set(key, item);
    }
  }
  walk(header);
  return { files, read(key) {
    const item = files.get(key); assert.ok(item, 'ASAR member missing: ' + key);
    const out = Buffer.alloc(item.size); fs.readSync(fd, out, 0, item.size, 8 + headerSize + Number(item.offset)); return out;
  }, close() { fs.closeSync(fd); } };
}
function expose(source, names) {
  const text = source.toString('utf8');
  const end = text.includes('return module.exports}});') ? 'return module.exports}});' : 'return module.exports;';
  assert.ok(text.includes(end), 'module test export seam missing');
  return text.replace(end, `module.exports.fixture={${names}};${end}`);
}

const asar = openAsar(archive), base = 'dsh/node_modules/@deepseek-ai/';
const assetBase = base + 'dsh-web-frontend/dist/assets/';
const asset = re => [...asar.files.keys()].find(key => key.startsWith(assetBase) && re.test(path.basename(key)));
const indexJs = asset(/^index-.*\.js$/), indexCss = asset(/^index-.*\.css$/), vendorJs = asset(/^vendor-.*\.js$/), vendorCss = asset(/^vendor-.*\.css$/);
assert.ok(indexJs && indexCss && vendorJs && vendorCss, 'host frontend assets missing');
let host = asar.read(indexJs).toString('utf8');
const boot = host.match(/(?:const|let|var)\s+([$\w]+)=globalThis\.dshDesktopBoot/), table = host.match(/function ([$\w]+)\(\)\{return\{react:/);
assert.ok(boot && table, 'host module table missing');
host = host.slice(0, boot.index) + '\nwindow.fixtureModules=' + table[1] + '();';
const chat = expose(asar.read(base + 'dsh-client-ui-chat/lib/client.js'), 'AssistantMarkdown,ChatViewport,ChatReading,ScrollFollow,ChatView_module_css_default,useDisclosure,useFlowHidden,createFlowMotion');
const hostVersion = JSON.parse(asar.read(base + 'dsh-client-ui-chat/package.json').toString('utf8')).version;
const hostCss = asar.read(indexCss), vendorStyle = asar.read(vendorCss), vendor = asar.read(vendorJs), vendorName = path.basename(vendorJs);
asar.close();
const sourcePath = process.env.DSC_BODY_JS_PATH || path.join(project, 'src/body.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const css = fs.readFileSync(path.join(project, 'src/body.css'), 'utf8');
const bundlePath = process.env.DSH_BODY_BUNDLE;
const plugin = bundlePath ? expose(fs.readFileSync(bundlePath), 'mountBodySmoothing,BODY_CSS_TEXT') :
  `window.__ModuleLoader__.load({id:'@xinxing1708/dsh-codex-style',factory:require=>{const React=require('react'),h=React.createElement,{useState,useEffect,useLayoutEffect,useRef,useMemo,useCallback}=React;const BODY_CSS_TEXT=${JSON.stringify(css)};${source};return {fixture:{mountBodySmoothing,BODY_CSS_TEXT}};}});`;

const html = `<!doctype html><html lang="zh-CN" data-ds-dark-theme><head><meta charset="utf-8">
<link rel="icon" href="data:,"><link rel="stylesheet" href="/vendor.css"><link rel="stylesheet" href="/host.css">
<style>html,body{height:100%;margin:0}body{background:#181818;color:#ddd;font:14px/24px 'Segoe UI',sans-serif;--dsh-chat-content-width:748px;--dsh-composer-side-clearance:8px}#session{height:100%}#scrollport{height:calc(100% - 32px);overflow:auto;background:#181818;display:flex;flex-direction:column}#content{flex:1 0 auto;min-height:auto}#composer{position:sticky;bottom:0;z-index:9;flex:none;min-height:100px;margin-top:auto;background:linear-gradient(transparent,#181818 36px);will-change:transform}#composer::after{display:block;content:'输入区';margin:38px auto 0;max-width:748px;padding:12px;border-radius:20px;background:#292929}.history{padding:8px 0}</style></head>
<body data-dsc-codex-body data-dsh-codex-style><div id="session" data-conversation-session="fixture"><div id="scrollport" data-conversation-scroll><div id="content"></div><div id="composer" data-composer-seat data-conversation-region="composer"></div></div></div>
<script type="module">
import '/host.js'; window.loaded={}; window.__ModuleLoader__={load:d=>loaded[d.id]=d.factory(Object.assign(id=>{if(!(id in fixtureModules))throw Error('Missing '+id);return fixtureModules[id]},{asset:x=>'/fixture-asset/'+x}))};
await import('/chat.js'); await import('/plugin.js');
const React=fixtureModules.react,h=React.createElement,C=loaded['@deepseek-ai/dsh-client-ui-chat'].fixture,P=loaded['@xinxing1708/dsh-codex-style'].fixture,cls=C.ChatView_module_css_default;
const style=document.createElement('style');style.textContent=P.BODY_CSS_TEXT;document.head.append(style);
const motion=C.createFlowMotion(()=>null,()=>{}),useGroupAction=(hidden,reveal)=>C.useFlowHidden(hidden,reveal,motion);
const t=key=>key,usePresentation=selector=>selector({settledReasoningPreview:true});
const initial='这是流式正文开头，带有 **加粗**、行内 \\x60代码\\x60 和 [链接](https://example.invalid)。';
function Fixture(){const [text,setText]=React.useState(initial),[streaming,setStreaming]=React.useState(true);window.appendText=chunk=>setText(prev=>prev+chunk);window.finish=()=>setStreaming(false);
return h('div',{className:cls.frame},h('div',{className:cls.root,'data-chat-following-tail':''},h('div',{className:cls.scroll,id:'host-list'},h('div',{className:cls.column,id:'host-column','data-chat-flow':''},
  h('div',{'data-slot':'conversation.chat.flow',style:{display:'contents'}},...Array.from({length:20},(_,i)=>h('div',{key:i,className:cls.flowItem+' history','data-chat-flow-kind':'assistant-step'},'历史记录 '+(i+1)+'：已完成的消息、工具结果与讨论内容。')),
    h('div',{className:cls.flowItem,'data-chat-flow-kind':'assistant-step','data-chat-group-part':'response'},h(C.AssistantMarkdown,{blocks:[{kind:'text',text}],streaming,groupPart:'response',useDisclosure:C.useDisclosure,useGroupAction,usePresentation,renderSlot:()=>null,t,loadImage:()=>{}}))),
  h('div',{'data-chat-turn-spacer':'',style:{height:0}})) )));
}
const reactRoot=fixtureModules['react-dom/client'].createRoot(document.getElementById('content'));reactRoot.render(h(Fixture));
await new Promise(requestAnimationFrame);await new Promise(requestAnimationFrame);
const viewport=new C.ChatViewport(),follow=new C.ScrollFollow(true,24),reading=new C.ChatReading(viewport,{read:()=>null,save:()=>{}},{initialized:true,followingTail:true,activeTurn:null},()=>{},follow);
let resizes=0,scrolls=0;
viewport.attach(document.getElementById('host-list'),document.getElementById('host-column'));
viewport.connect({scroll:event=>{scrolls++;reading.onScroll(event)},scrollEnd:outer=>reading.onScrollEnd(outer),resize:()=>{resizes++;reading.onResize()},interact:()=>{},history:()=>{}});
reading.bindFolds(); reading.followTail();
window.stop= ${process.env.HOST_OFF === '1' ? '()=>{}' : 'P.mountBodySmoothing()'};
window.metrics=()=>{const root=document.querySelector('[data-streaming]'),body=root?.firstElementChild,p=body?.querySelector('p'),scroller=document.getElementById('scrollport'),seat=document.getElementById('composer'),edge=document.querySelector('.dsc-body-edge'),ev=document.querySelector('.dsc-body-edge-viewport'),icon=p?.querySelector('a svg');const rect=el=>el?JSON.parse(JSON.stringify(el.getBoundingClientRect())):null;return {root:root?.outerHTML.slice(0,2000),icon:icon?{ariaHidden:icon.getAttribute('aria-hidden'),role:icon.getAttribute('role')}:null,bodyRect:rect(body),scrollRect:rect(scroller),seatRect:rect(seat),edgeRect:rect(edge),edgeViewportRect:rect(ev),scrollTop:scroller.scrollTop,scrollHeight:scroller.scrollHeight,clientHeight:scroller.clientHeight,resizes,scrolls,bodyHeight:body?.offsetHeight,bodyScrollHeight:body?.scrollHeight,clip:body?.style.maxHeight,elementCount:body?.querySelectorAll('*').length,paragraphs:body?.querySelectorAll('p').length,edgeOpacity:edge?getComputedStyle(edge).opacity:null,edgeDisplay:ev?getComputedStyle(ev).display:null};};
window.ready=true;
</script></body></html>`;
const routes = new Map([['/', ['text/html', html]], ['/host.js', ['text/javascript', host]], ['/chat.js', ['text/javascript', chat]], ['/plugin.js', ['text/javascript', plugin]], ['/host.css', ['text/css', hostCss]], ['/vendor.css', ['text/css', vendorStyle]], ['/' + vendorName, ['text/javascript', vendor]]]);
const browser = await chromium.launch({ executablePath: browserPath, headless: process.env.HOST_SHOW !== '1', args: ['--no-proxy-server'] });
const page = await browser.newPage({ viewport: { width: 1100, height: 760 }, deviceScaleFactor: 1 });
const errors=[]; page.on('pageerror', error => errors.push(error.message));
await page.route('**/*', route => { const item = routes.get(new URL(route.request().url()).pathname); return item ? route.fulfill({contentType:item[0],body:item[1]}) : route.fulfill({status:404,body:''}); });
try {
  await page.goto('http://host-markdown.fixture/');
  await page.waitForFunction(() => window.ready === true, null, {timeout:10000});
  const before = await page.evaluate(() => metrics());
  // 经由 React 状态更新增长普通 Markdown 段落，保留宿主实际行内元素。
  const chunk=' 后续正文继续流式输出，这里观察渐变遮罩、换行和尾部跟随。';
  for(let i=0;i<6;i++){await page.evaluate(text=>appendText(text),chunk.repeat(8));await page.waitForTimeout(50);}
  const after = await page.evaluate(() => metrics());
  if(process.env.HOST_SNAPSHOT) await page.screenshot({path:process.env.HOST_SNAPSHOT});
  assert.deepEqual(errors, []);
  const result={hostVersion,source:bundlePath||sourcePath,enabled:process.env.HOST_OFF!=='1',before,after,errors};
  console.log(process.env.HOST_COMPACT==='1' ? JSON.stringify(result) : JSON.stringify(result,null,2));
} finally { await browser.close(); }
