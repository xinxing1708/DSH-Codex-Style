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

test('running reasoning stays expandable and tool title entrances stay scoped', { skip }, async t => {
  const asar = openAsar(asarPath);
  let host, chat, tools, hostCss, vendorCss, vendorJs, vendorName, hostVersion;
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
    const exports = 'ChatGroupSeat,AssistantNodeView,ReasoningContent,useDisclosure,useFlowHidden,useMotionHidden,createFlowMotion';
    const marker = 'return module.exports}});';
    assert.ok(chat.includes(marker), 'host component test export seam must exist');
    chat = chat.replace(marker, `module.exports.fixture={${exports}};${marker}`);
    tools = asar.read('dsh/node_modules/@deepseek-ai/dsh-client-ui-tool/lib/client.js').toString('utf8');
    assert.ok(tools.includes(marker), 'host tool test export seam must exist');
    tools = tools.replace(marker, `module.exports.fixture={BashRow,ToolRow};${marker}`);
    hostCss = asar.read(indexCss);
    vendorCss = asar.read(vendorStyle);
    vendorJs = asar.read(vendor);
    vendorName = path.basename(vendor);
  } finally { asar.close(); }

  const bundlePath = process.env.DSH_BODY_BUNDLE;
  let bodyCss, pluginBundle;
  if (bundlePath) {
    const bundle = fs.readFileSync(bundlePath, 'utf8');
    const match = bundle.match(/\bconst\s+BODY_CSS_TEXT\s*=\s*("(?:\\.|[^"\\])*")\s*;/);
    assert.ok(match, 'BODY_CSS_TEXT JSON literal must exist in DSH_BODY_BUNDLE');
    bodyCss = JSON.parse(match[1]);
    const marker = '    return module.exports;';
    assert.ok(bundle.includes(marker), 'bundle test export seam must exist');
    pluginBundle = bundle.replace(marker, `module.exports.fixture={mountBodySmoothing,dscBodyIsRoot,mountBodyToolEntrance};${marker}`);
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
await import('/tools.js');
const React=fixtureModules.react,h=React.createElement,C=loaded['@deepseek-ai/dsh-client-ui-chat'].fixture;
const T=loaded['@deepseek-ai/dsh-client-ui-tool'].fixture;
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
const translate=key=>({'message.think':'Thinking','message.stepProcess.thinking':'Thinking','row.running':'Running','tool.title.bash':'正在运行'}[key]||key);
const renderSlot=(name,owner,opts)=>{
  if(name==='conversation.chat.node'&&opts.entryKey==='assistant-step')return h(C.AssistantNodeView,{...owner,useContextMenu:()=>({getTriggerProps:()=>({})}),resolveFilePath:x=>x,useTurnData:()=>null,useDisclosure:C.useDisclosure,useGroupAction,usePresentation,renderSlot,t:translate});
  if(name==='conversation.chat.node'&&opts.entryKey==='tool-call')return h(FixtureTool,{id:owner.node.data.root.callId,kind:'generic',state:owner.node.data.root.kind?'ok':'running',turn:1});
  if(name==='conversation.chat.reasoning.body')return h('div',{'data-fixture-reasoning-body':''},h(C.ReasoningContent,{...owner,t:translate}));
  return null;
};
const actions={setTurnProcessOpen(){}};
const toolRows=source([{id:'existing',kind:'generic',state:'running',turn:0}]), toolSession=source('fixture');
const groupKeys=source(['g']);
const chatTarget=source({nodes:{get:key=>nodes.getSnapshot().get(key)}});
const conversation={target:()=>chatTarget,snapshot:source({views:{grouped:()=>({groupSource:key=>({getSnapshot:()=>groups.getSnapshot().get(key)})})}})};
const services={sessions:{binding:id=>id},uiConversation:{binding:()=>conversation},locale:{bind:()=>translate}};
window.fixtureBodyContext={get:key=>services[key]};
const icon=h('svg',{width:14,height:14},h('circle',{cx:7,cy:7,r:5}));
function FixtureTool({id,kind,state,turn,hidden}){
  const argsRaw=JSON.stringify({command:'node scripts/build.mjs'});
  const common={toolName:kind==='shell'?'bash':'fixture-tool',useDisclosure:C.useDisclosure,t:translate};
  const tool=kind==='shell'
    ?h(T.BashRow,{...common,block:{phase:state==='preparing'?'preparing':'start',name:'bash',callId:id,argsRaw,args:{text:()=>undefined}},sessionId:'fixture',useSessions:selector=>selector({byId:{fixture:{cwd:'D:/fixture'}}})})
    :h(T.ToolRow,{...common,variant:'others',state,title:'Running tool',summary:'Build sample project and print some output',bodyRaw:'tool arguments',output:'Tool detail output',icon});
  return h('div',{'data-chat-node-key':id,'data-chat-call-id':id,'data-chat-turn':turn,hidden},tool);
}
function Root(){return h('div',{'data-chat-flow':'','data-conversation-session':useSource(toolSession)},
 ...useSource(groupKeys).map(groupKey=>h(C.ChatGroupSeat,{key:groupKey,groupKey,useChatGroup,useGroupHeaderAction,useChatNode,useChatNodeBottom,useChatNodeProcess,usePresentation,useStore,actions,renderSlot,t:translate,useGroupAction,deferCollapse:false})),
 ...useSource(toolRows).map(tool=>h(FixtureTool,{key:tool.id,...tool}))); }
fixtureModules['react-dom/client'].createRoot(document.getElementById('fixture')).render(h(Root));
window.fixture={
  change(key,patch){const next=new Map(nodes.getSnapshot()),node=next.get(key);next.set(key,{...node,data:{...node.data,...patch}});nodes.set(next);},
  text(key,text){this.change(key,{blocks:[{kind:'reasoning',text}]});},
  addSecond(){const next=new Map(nodes.getSnapshot());next.set('second',{...first,key:'second',anchorSeq:4,data:{...first.data,step:2,blocks:[{kind:'reasoning',text:'Later reasoning.'}]}});nodes.set(next);const grouped=new Map(groups.getSnapshot()),g=grouped.get('g');grouped.set('g',{...g,members:[...g.members,{kind:'node',key:'second',groupPart:'reasoning'}]});groups.set(grouped);},
  tool(id,kind,state,turn=2,hidden=false){toolRows.set([...toolRows.getSnapshot().filter(tool=>tool.id!==id),...state?[{id,kind,state,turn,hidden}]:[]]);},
  switchTools(){toolSession.set('other-session');toolRows.set([{id:'history',kind:'shell',state:'running',turn:2}]);},
  groupTool(id,detail,{key='g',time=Date.now(),settled=false}={}){
    const next=new Map(nodes.getSnapshot());
    next.set(id,{...first,kind:'tool-call',key:id,data:{root:{callId:id,time,subCalls:[],...(settled?{kind:'tool-result'}:{phase:'start'})}}});
    nodes.set(next);
    const grouped=new Map(groups.getSnapshot()),previous=grouped.get(key),g=previous??{...grouped.get('g'),key,members:[]};
    const members=g.members.some(member=>member.key===id)?g.members:[...g.members,{kind:'node',key:id}];
    grouped.set(key,{...g,members,data:{...g.data,summary:{...g.data.summary,running:'commands',runningDetail:detail}}});
    groups.set(grouped);
    if(!previous)groupKeys.set([...groupKeys.getSnapshot(),key]);
  }
};
window.ready=true;
</script></body></html>`;

  const routes = new Map([
    ['/', ['text/html', html]], ['/host.js', ['text/javascript', host]], ['/chat.js', ['text/javascript', chat]], ['/tools.js', ['text/javascript', tools]],
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
  await page.addScriptTag({ content: pluginBundle ?? fs.readFileSync(new URL('../src/body.js', import.meta.url), 'utf8') });
  await page.evaluate(() => {
    const compiled = window.loaded['@xinxing1708/dsh-codex-style']?.fixture;
    const mountSmoothing = compiled?.mountBodySmoothing ?? window.mountBodySmoothing;
    const isBodyRoot = compiled?.dscBodyIsRoot ?? window.dscBodyIsRoot;
    const nativeFrame = window.requestAnimationFrame.bind(window);
    const nativeQuery = document.querySelectorAll.bind(document);
    const counts = { admittedRoots: 0, scans: 0, frames: 0 };
    window.requestAnimationFrame = callback => {
      if (callback.name === 'step') counts.frames++;
      return nativeFrame(callback);
    };
    document.querySelectorAll = selector => {
      if (selector === '[data-streaming]' || selector === '[data-conversation-session]') counts.scans++;
      return nativeQuery(selector);
    };
    window.disposeSmoothing = mountSmoothing();
    window.measureReasoning = async (firstUpdate, lastUpdate) => {
      const paint = () => new Promise(resolve => nativeFrame(() => nativeFrame(resolve)));
      await paint();
      counts.frames = counts.scans = 0;
      for (let i = firstUpdate; i < lastUpdate; i++) {
        const heading = `Reasoning ${i}`;
        const text = `${heading}\nExplanation.\n\n${'New reasoning. '.repeat(i + 1)}`;
        window.fixture.text('first', text);
        await paint();
        const row = document.querySelector('[data-chat-node-key="first"]');
        counts.admittedRoots += [...row.querySelectorAll('[data-streaming]')].filter(isBodyRoot).length;
        if (row.querySelector('.dsc-body-smooth-clip, .dsc-body-edge-viewport, .dsc-body-smooth-fade')) {
          throw new Error('reasoning received a body reveal effect');
        }
        const body = row.querySelector('[data-fixture-reasoning-body]');
        if (body && !body.textContent.includes(heading)) throw new Error('reasoning did not update');
      }
      const result = { ...counts };
      counts.admittedRoots = 0;
      return result;
    };
  });
  const groupSelector = '[data-chat-group-key="g"] > div > [data-process-activity="thinking"]';
  const group = page.locator(groupSelector);
  await group.click();
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute('aria-expanded') === 'true', groupSelector);
  const first = page.locator('[data-chat-node-key="first"] [data-variant="think"]');
  await first.waitFor({ state: 'attached' });
  assert.equal(await first.isVisible(), true, 'running thinking must remain visible after its group opens');
  const collapsed = await page.evaluate(() => window.measureReasoning(0, 5));
  assert.ok(await first.locator('span[data-streaming]').count(), 'running reasoning summary shares the streaming attribute');
  const firstRow = first.locator('[data-disclosure-row]');
  await firstRow.click();
  assert.equal(await firstRow.getAttribute('aria-expanded'), 'true');
  const body = first.locator('[data-fixture-reasoning-body]');
  await body.waitFor({ state: 'visible' });
  const expanded = await page.evaluate(() => window.measureReasoning(5, 10));
  t.diagnostic(`reasoning reveal updates ${JSON.stringify({ collapsed, expanded })}`);
  assert.deepEqual({ collapsed, expanded }, {
    collapsed: { admittedRoots: 0, scans: 0, frames: 0 },
    expanded: { admittedRoots: 0, scans: 0, frames: 0 }
  }, 'reasoning updates must stay outside the body reveal observer and animation');

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
  await group.click();
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute('aria-expanded') === 'false', groupSelector);

  await page.locator('[data-chat-call-id="existing"]').waitFor();
  await page.evaluate(() => {
    const compiled = window.loaded['@xinxing1708/dsh-codex-style']?.fixture;
    window.disposeToolEntrance = (compiled?.mountBodyToolEntrance ?? window.mountBodyToolEntrance)(window.fixtureBodyContext);
  });
  const introAttribute = 'data-dsc-body-tool-intro';
  const entrance = `[${introAttribute}="entering"]`;
  const shown = `[${introAttribute}="shown"]`;
  const toolLabel = id => page.locator(`[data-chat-call-id="${id}"] [data-shimmer]`);
  const screenshotDir = process.env.DSH_TOOL_SCREENSHOT_DIR;
  async function captureShell(name, time) {
    const row = page.locator('[data-chat-call-id="new-shell"] [data-sample="bash"]');
    await row.evaluate((element, time) => {
      const animations = element.getAnimations({ subtree: true }).filter(animation => animation.animationName?.startsWith('dsc-body-tool-'));
      for (const animation of animations) {
        animation.pause();
        animation.currentTime = time;
      }
    }, time);
    await row.screenshot({ path: path.join(screenshotDir, `${name}.png`) });
  }
  assert.equal(await page.locator(`[data-chat-call-id="existing"] ${entrance}`).count(), 0, 'current running history is baselined');
  await page.evaluate(() => fixture.tool('history-peer', 'generic', 'running', 0));
  await toolLabel('history-peer').waitFor();
  assert.equal(await toolLabel('history-peer').getAttribute(introAttribute), 'entering', 'a loaded call does not consume its turn');

  const groupTitleSelector = '[data-chat-group-key="g"] [data-process-activity="commands"] > [data-shimmer]';
  const groupLabel = page.locator(groupTitleSelector);
  const groupEntrance = page.locator(groupTitleSelector + entrance);
  const groupShown = page.locator(groupTitleSelector + shown);
  await page.evaluate(() => fixture.groupTool('group-first','node scripts/build.mjs'));
  await groupEntrance.waitFor();
  await groupShown.waitFor();
  await page.evaluate(() => fixture.groupTool('group-first','updated arguments'));
  await page.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('updated arguments'), groupTitleSelector);
  assert.equal(await groupLabel.getAttribute(introAttribute), 'shown', 'arguments of the same call do not restart the entrance');
  await page.evaluate(() => fixture.groupTool('group-second','updated arguments'));
  await groupEntrance.waitFor();
  await groupLabel.evaluate(label => {
    for (const animation of label.getAnimations({ subtree: true })) {
      if (animation.animationName !== 'dsc-body-tool-entrance') continue;
      animation.pause();
      animation.currentTime = 600;
    }
  });
  await page.evaluate(() => fixture.groupTool('group-third','different command'));
  await page.waitForFunction(selector => {
    const label = document.querySelector(selector);
    const phase = label?.getAnimations().find(animation => animation.animationName === 'dsc-body-tool-entrance');
    return label?.textContent.includes('different command') && phase?.playState === 'running' && phase.currentTime < 600;
  }, groupTitleSelector);
  await groupShown.waitFor();
  await page.evaluate(() => fixture.groupTool('group-third','updated arguments',{settled:true}));
  await page.waitForFunction(selector => document.querySelector(selector)?.textContent.includes('updated arguments') &&
    !document.querySelector(selector)?.hasAttribute('data-dsc-body-tool-intro'), groupTitleSelector);
  assert.equal(await groupEntrance.count(), 0, 'returning to an earlier running call does not replay');
  await page.evaluate(() => fixture.groupTool('group-fourth','next group',{key:'g2'}));
  await page.locator(`[data-chat-group-key="g2"] [data-process-activity="commands"] > ${entrance}`).waitFor();
  await groupLabel.locator('..').click();
  await toolLabel('group-second').waitFor();
  assert.equal(await toolLabel('group-second').getAttribute(introAttribute), null, 'opening a group does not replay the same call');
  await page.evaluate(() => fixture.groupTool('group-expanded','another call'));
  await page.locator(`[data-chat-call-id="group-expanded"] ${entrance}`).waitFor();

  await page.evaluate(() => {
    fixture.tool('hidden-first', 'generic', 'running', 2, true);
    fixture.tool('new-shell', 'shell', 'preparing');
    fixture.tool('new-generic', 'generic', 'running');
  });
  const shell = toolLabel('new-shell');
  const shellEntrance = page.locator(`[data-chat-call-id="new-shell"] ${entrance}`);
  await shellEntrance.waitFor();
  assert.equal(await shell.evaluate(label => label.parentElement.dataset.sample), 'bash');
  await page.locator(`[data-chat-call-id="new-generic"] ${entrance}`).waitFor();
  assert.equal(await toolLabel('hidden-first').getAttribute(introAttribute), null);
  const geometry = await shell.evaluate(label => {
    const animation = label.getAnimations().find(animation => animation.animationName === 'dsc-body-tool-entrance');
    const icon = label.parentElement.firstElementChild;
    const sweep = label.querySelector(':scope > [aria-hidden] > span');
    const sampleAt = (track, element, property, time) => {
      const css = element.getAnimations().find(animation => animation.animationName === track);
      css.pause(); css.currentTime = time;
      return getComputedStyle(element)[property];
    };
    return {
      duration: animation.effect.getTiming().duration,
      positions: [0, 450, 740].map(time => [label, sweep].map(element =>
        sampleAt('dsc-body-tool-entrance', element, 'maskPosition', time))),
      iconMask: getComputedStyle(icon).maskImage,
      rowMask: getComputedStyle(label.parentElement).maskImage,
      titleMask: getComputedStyle(label).maskImage,
      highlightMask: getComputedStyle(sweep).maskImage,
      highlightTrack: sweep.getAnimations().map(animation => animation.animationName)
    };
  });
  assert.equal(geometry.duration, 900);
  assert.equal(geometry.positions[0][0], '100% 0px');
  assert.equal(geometry.positions[1][0], '50% 0px');
  assert.ok(parseFloat(geometry.positions[2][0]) < 50);
  for (const [titlePosition, lightPosition] of geometry.positions) assert.equal(titlePosition, lightPosition);
  assert.deepEqual(geometry.highlightTrack, ['dsc-body-tool-entrance']);
  assert.equal(geometry.iconMask, 'none');
  assert.equal(geometry.rowMask, 'none');
  assert.match(geometry.titleMask, /linear-gradient/);
  assert.match(geometry.highlightMask, /linear-gradient/);
  await page.evaluate(() => { fixture.tool('new-shell','shell','running'); fixture.tool('new-generic','generic','ok'); });
  assert.equal(await page.locator('[data-chat-call-id="new-shell"] [data-state]').getAttribute('data-state'), 'running');
  assert.equal(await shell.evaluate(el => Math.round(el.getAnimations()[0].currentTime)), 740, 'preparing to running keeps the same entrance');
  if (screenshotDir) {
    for (const [name, time] of [['intro-start', 0], ['intro-middle', 450], ['intro-end', 740]]) await captureShell(name, time);
  }
  await shell.evaluate(label => {
    for (const element of [label, label.querySelector(':scope > [aria-hidden] > span')]) element.getAnimations()[0].play();
  });
  await page.locator(`[data-chat-call-id="new-shell"] ${shown}`).waitFor();
  const ordinary = await shell.evaluate(label => {
    const sweep = label.querySelector(':scope > [aria-hidden] > span').getAnimations()[0];
    return [getComputedStyle(label).maskImage, sweep.animationName, sweep.effect.getTiming().duration, sweep.effect.getTiming().delay];
  });
  assert.deepEqual(ordinary, ['none', 'dsc-body-tool-sweep', 4000, 3100]);
  if (screenshotDir) {
    await captureShell('ordinary-idle', 0);
    await captureShell('ordinary-sweep', 3550);
  }
  await toolLabel('new-generic').waitFor({state:'detached'});
  const row = page.locator('[data-chat-call-id="new-generic"] [data-disclosure-row]');
  await row.click();
  assert.equal(await page.getByText('Tool detail output').evaluate(el=>getComputedStyle(el).clipPath), 'none');
  await page.evaluate(() => fixture.tool('new-shell','shell',null));
  await shell.waitFor({state:'detached'});
  await page.evaluate(() => fixture.tool('new-shell','shell','running'));
  await page.locator('[data-chat-call-id="new-shell"] [data-sample]').waitFor();
  assert.equal(await shell.getAttribute(introAttribute), null, 'remount of a known running call does not replay');
  await page.evaluate(() => fixture.switchTools());
  await page.locator('[data-chat-call-id="history"] [data-sample]').waitFor();
  assert.equal(await page.locator(entrance).count(), 0, 'switching sessions does not replay loaded tools');
  await page.evaluate(() => fixture.tool('fresh','generic','running',3));
  await page.locator(`[data-chat-call-id="fresh"] ${entrance}`).waitFor();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => fixture.tool('reduced','generic','running',4));
  const reduced = page.locator('[data-chat-call-id="reduced"] [data-shimmer]');
  await reduced.waitFor();
  assert.equal(await reduced.getAttribute(introAttribute), null);
  assert.equal(await reduced.locator(':scope > [aria-hidden]').evaluate(el => getComputedStyle(el).display), 'none');
  await page.evaluate(() => { window.disposeToolEntrance(); window.disposeSmoothing(); });
  assert.deepEqual(errors, []);
  t.diagnostic(`Host ${hostVersion}; plugin ${bundlePath ? 'bundle' : 'source'}; actual host components, synthetic stream; no model request`);
});
