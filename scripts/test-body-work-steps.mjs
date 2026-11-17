// 使用本机 DSH 的真实 ChatFlow 与插件源码做隔离交互回归。
// 设置 DSH_ASAR 指向桌面应用 app.asar；FOLD_BUNDLE=1 检查已构建 bundle。
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runtimePlaywright = path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
let chromium;
for (const name of [process.env.CODEX_PLAYWRIGHT_MODULE, process.env.PLAYWRIGHT_MODULE, 'playwright', runtimePlaywright].filter(Boolean)) {
  try { ({ chromium } = require(name)); break; } catch { /* 尝试下一个已安装路径 */ }
}
const archive = process.env.DSH_ASAR || '';
const browserPath = chromium && [
  process.env.DSH_BROWSER_EXECUTABLE,
  chromium.executablePath(),
  process.platform === 'win32' && path.join(process.env['ProgramFiles(x86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
  process.platform === 'win32' && path.join(process.env.ProgramFiles || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe')
].filter(Boolean).find(candidate => fs.existsSync(candidate));
const skip = !archive || !fs.existsSync(archive)
  ? 'set DSH_ASAR to an installed DSH app.asar'
  : !chromium ? 'Playwright unavailable; set CODEX_PLAYWRIGHT_MODULE'
    : !browserPath ? 'Chromium unavailable; set DSH_BROWSER_EXECUTABLE' : false;
function readArchive(filename) {
  const fd = fs.openSync(filename, 'r');
  const head = Buffer.alloc(8); fs.readSync(fd, head, 0, 8, 0);
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
  return {
    files,
    read(key) {
      const item = files.get(key);
      if (!item) throw new Error('Missing ASAR member: ' + key);
      const value = Buffer.alloc(item.size);
      fs.readSync(fd, value, 0, item.size, 8 + headerSize + Number(item.offset));
      return value;
    },
    close() { fs.closeSync(fd); }
  };
}
test('work steps distinguish whole-turn and local group folding', { skip }, async t => {
const asar = readArchive(archive), base = 'dsh/node_modules/@deepseek-ai/';
t.after(() => asar.close());
const assetsPrefix = base + 'dsh-web-frontend/dist/assets/';
const asset = re => [...asar.files.keys()].find(key => key.startsWith(assetsPrefix) && re.test(path.basename(key)));
const indexJs = asset(/^index-.*\.js$/), indexCss = asset(/^index-.*\.css$/), vendorJs = asset(/^vendor-.*\.js$/), vendorCss = asset(/^vendor-.*\.css$/);
assert.ok(indexJs && indexCss && vendorJs && vendorCss, 'missing frontend assets');
let host = asar.read(indexJs).toString('utf8');
const boot = host.match(/(?:const|let|var)\s+([$\w]+)=globalThis\.dshDesktopBoot/), table = host.match(/function ([$\w]+)\(\)\{return\{react:/);
assert.ok(boot && table, 'missing native frontend module table');
host = host.slice(0, boot.index) + '\nwindow.fixtureModules = ' + table[1] + '();';
function expose(src, names) {
  src = src.toString('utf8');
  const end = src.includes('return module.exports}});') ? 'return module.exports}});' : 'return module.exports;';
  assert.ok(src.includes(end), 'missing plugin module ending');
  return src.replace(end, `module.exports.fixture={${names}};${end}`);
}
const chat=expose(asar.read(base+'dsh-client-ui-chat/lib/client.js'),'ChatFlow,ChatGroupSeat,ReasoningRow,AssistantNodeView,ContextMessageNodeView,RunningStatus,TurnProcessNodeView,useDisclosure,useFlowHidden,useMotionHidden,createFlowMotion,TurnGroups');
const tool=expose(asar.read(base+'dsh-client-ui-tool/lib/client.js'),'ToolRow,BashRow');
const renderer=asar.read(base+'dsh-client-ui-renderer/lib/client.js');
const bodySource=fs.readFileSync(path.join(root,'src/body.js'),'utf8'),bodyCss=fs.readFileSync(path.join(root,'src/body.css'),'utf8');
const plugin=process.env.FOLD_BUNDLE ? expose(fs.readFileSync(path.join(root,'lib/client.js')),'CodexTurnProcess,mountCodexBody,CSS_TEXT,bodyDuration') : `window.__ModuleLoader__.load({id:'@xinxing1708/dsh-codex-style',factory:require=>{const React=require('react'),h=React.createElement,{useState,useEffect,useLayoutEffect,useRef,useMemo,useCallback}=React;const BODY_CSS_TEXT=${JSON.stringify(bodyCss)},CSS_TEXT='';${bodySource};return {fixture:{CodexTurnProcess,mountCodexBody,CSS_TEXT,bodyDuration}};}});`;
const vendorName=path.basename(vendorJs);
const routes={'/host.js':['text/javascript',host],['/'+vendorName]:['text/javascript',asar.read(vendorJs)],'/host.css':['text/css',asar.read(indexCss)],'/vendor.css':['text/css',asar.read(vendorCss)],'/chat.js':['text/javascript',chat],'/tool.js':['text/javascript',tool],'/renderer.js':['text/javascript',renderer],'/plugin.js':['text/javascript',plugin]};
const hostVersion=JSON.parse(asar.read(base+'dsh-client-ui-chat/package.json').toString('utf8')).version;
const html=`<!doctype html><html lang="zh-CN" data-ds-dark-theme><head><meta charset="utf-8"><title>正文效果隔离检查</title><link rel="stylesheet" href="/vendor.css"><link rel="stylesheet" href="/host.css"></head><body data-dsh-codex-style="fixture" style="margin:0;background:#181818;color:#eee;font:14px/24px 'Segoe UI',sans-serif"><main id="fixture" style="width:740px;margin:48px auto"></main><script type="module">
import '/host.js';window.loaded={};window.__ModuleLoader__={load:d=>loaded[d.id]=d.factory(Object.assign(id=>{if(!(id in fixtureModules))throw Error('Missing '+id);return fixtureModules[id];},{asset:x=>'/fixture-asset/'+x}))};
await import('/chat.js');await import('/tool.js');await import('/renderer.js');await import('/plugin.js');
const React=fixtureModules.react,h=React.createElement,C=loaded['@deepseek-ai/dsh-client-ui-chat'].fixture,T=loaded['@deepseek-ai/dsh-client-ui-tool'].fixture,P=loaded['@xinxing1708/dsh-codex-style'].fixture;
window.nativeGroupingClass=C.TurnGroups;const style=document.createElement('style');style.textContent=P.CSS_TEXT;document.head.appendChild(style);
const {Context}=fixtureModules['@deepseek-ai/cordis'];const ctx=new Context();window.ctx=ctx;
new loaded['@deepseek-ai/dsh-client-ui-renderer'].SlotRegistry(ctx);
ctx.slots.register({name:'root',children:{'conversation.chat.node':{kind:'keyed',scope:'root'}}},()=>null);
ctx.slots.register({name:'conversation.chat.node',key:'turn-process'},C.TurnProcessNodeView);
ctx.slots.register({name:'conversation.chat.node',key:'assistant-step',children:{'conversation.chat.reasoning.body':{kind:'single',scope:'root'}}},C.AssistantNodeView);
const originalSpec=ctx.slots.spec('conversation.chat.reasoning.body');
const events=new Map();window.inventory={enabled:false,phase:null};window.requests=0;window.pending=[];window.hold=false;
ctx.provide('remote',{pluginInventory:{list:()=>{requests++;return hold?new Promise(resolve=>pending.push(resolve)):Promise.resolve({ok:true,value:{entries:[{moduleName:'@xinxing1708/dsh-codex-style/body',enabled:inventory.enabled,fiberPhase:inventory.phase}]}});}},$on:(name,fn)=>{events.set(name,fn);return()=>events.delete(name);}});
window.changeComponent=async(enabled,phase=enabled?'active':null)=>{inventory={enabled,phase};await events.get('plugin-manager/changed')?.();};
const bodyFeature=ctx.plugin({name:'fixture-body',apply:P.mountCodexBody,inject:['slots']});window.stopWatch=()=>bodyFeature.dispose();
const source=value=>{const listeners=new Set();return{getSnapshot:()=>value,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);},set:next=>{value=next;listeners.forEach(fn=>fn());}};};
const useSource=(s,select=x=>x)=>select(React.useSyncExternalStore(s.subscribe,s.getSnapshot));
const clockStart=Date.now()-201000;
const policy=source({foldedReplies:'all',foldCompletedTurns:true,stepGrouping:'collapsed',liveProcessDetail:true,settledReasoningPreview:true,collapseTiming:'completion'});
const turnState=source({status:'open',reason:null}),view=source({turnProcesses:[]}),model=source({});window.model=model;
const chat=source({nodes:new Map(),navigation:{items:()=>[{anchorKey:'a1'}]}}),groups=source(new Map()),session=source({running:true});window.setSessionRunning=running=>session.set({running});
const turnData=new Map();turnData.source=()=>({getSnapshot:()=>null,subscribe:()=>()=>{}});
window.calls=[];
const make=()=>{const state=turnState.getSnapshot(),closed=state.status==='closed';const turn={turn:1,status:state.status,start:{time:clockStart},...(closed?{end:{time:clockStart+218000,data:{reason:{kind:state.reason||'completed'}}}}:{}),data:turnData};
 const spec={turn:1,processStartSeq:1,answerAnchorSeq:closed&&!window.noAnswer?50:null,answerStep:window.noAnswer?null:2,inlineReasoning:true};
 const loc={kind:'step',turn};const nodes=new Map([
 ['head',{key:'head',kind:'turn-process',anchorSeq:0,location:{kind:'turn',turn},data:{turn:1,messageCount:2,toolCallCount:2,subagentCount:0}}],
 ['a1',{key:'a1',kind:'assistant-step',anchorSeq:2,location:loc,data:{step:1,status:closed?'ok':'running',blocks:[{kind:'reasoning',text:'这是一段演示思考。'},{kind:'text',text:'我会先核对桌面端的运行配置。'}]}}],
 ['t1',{key:'t1',kind:'context',anchorSeq:1,location:loc,data:{content:[],source:null,producer:{role:'inject',label:'stop-that-shit'},form:null}}],
 ['t2',{key:'t2',kind:'tool-call',anchorSeq:4,location:loc,data:{variant:'edit',toolName:'edit',state:closed?'ok':'running',title:closed?'已编辑':'正在编辑',summary:'src/body.css',bodyRaw:'--- body.css\\n+++ body.css\\n+ color: #969696;',filePath:'src/body.css'}}],
 ['a2',{key:'a2',kind:'assistant-step',anchorSeq:50,location:loc,data:{step:2,status:closed?'ok':'running',blocks:[{kind:'text',text:closed?'正文效果已完成，工具结果可以继续展开查看。':'正文会继续流式追加，只有当前操作保留流动高光。'}]}}]
 ]);model.set({turn,spec,closed,process:{turn:1,turnStarted:true,turnClosed:closed,hasExternalProcess:true,hasNonReplyProcess:true,hasInterleavedInput:window.interleaved===true,spec}});
 chat.set({nodes,navigation:{items:()=>[{anchorKey:'a2'}]}});groups.set(new Map([['g',{key:'g',data:{turn:1,closed,summary:{running:closed?undefined:'edit',runningDetail:'src/body.css',counts:[{kind:'thinking',count:1}]}},members:[{kind:'node',key:'t1'},{kind:'node',key:'a1',groupPart:'reasoning'}]}],['g2',{key:'g2',data:{turn:1,closed,summary:{counts:[{kind:'commands',count:1}]}},members:[{kind:'node',key:'t2'}]}]]));session.set({running:!closed});};
window.finish=reason=>{turnState.set({status:'closed',reason});make();};window.restart=()=>{turnState.set({status:'open',reason:null});make();};make();
const dict={'message.contextInjection':'上下文注入','tool.title.bash':'运行命令','message.think':'思考过程','message.stepProcess.done.thinking':'已完成分析','chat.deepDiving':'深度求索中','chat.deepDivingFor':'深度求索中 {duration}','message.turnProcess.took':'已处理 ','message.turnProcess.worked':'已处理','message.stopped':'已停止','message.turnProcess.failed':'出错','message.stepProcess.edit':'正在编辑','message.stepProcess.done.edit':'编辑了文件','message.stepProcess.done.commands':'运行了命令','message.stepProcess.sharedPrefix':'','message.stepProcess.joinTwo':'{first}{second}','row.running':'运行中','message.turnProcess.separator':' · ','row.input':'输入','row.output':'输出','runDuration.minute':'{count}分钟','runDuration.second':'{count}秒'};
const t=(key,args={})=>Object.entries(args).reduce((s,[k,v])=>s.replaceAll('{'+k+'}',v),dict[key]||key);
const usePresentation=selector=>useSource(policy,selector),useStore=selector=>useSource(view,selector),useChat=selector=>useSource(chat,selector),useSession=selector=>useSource(session,selector);
const useChatNode=(key,selector=x=>x)=>useSource(chat,s=>selector(s.nodes.get(key)));
const useChatNodeBottom=()=>false,useChatNodeProcess=()=>useSource(model,m=>m.process),useChatGroup=(key,selector=x=>x)=>useSource(groups,s=>selector(s.get(key)));
const motion=C.createFlowMotion(()=>null,()=>{}),useGroupAction=(hidden,reveal)=>C.useFlowHidden(hidden,reveal,motion);
function useGroupHeaderAction(ref,hidden){C.useMotionHidden(ref,hidden,motion);}
const actions={setTurnProcessOpen:(turn,answerStep,open)=>{calls.push({type:'turn',open});view.set({turnProcesses:[{turn,answerStep,collapsed:!open}]});}};
const renderSlot=(name,owner,opts)=>{
 if(name==='conversation.chat.node'){
  if(opts.entryKey==='turn-process'){const e=ctx.slots.entriesOfSlot(name).find(e=>e.options.key==='turn-process');return h(e.component,{...owner,t,useSession});}
  if(opts.entryKey==='context')return h(C.ContextMessageNodeView,{...owner,t});
  if(opts.entryKey==='assistant-step')return h(C.AssistantNodeView,{...owner,useContextMenu:()=>({getTriggerProps:()=>({})}),resolveFilePath:x=>x,useTurnData:()=>null,useDisclosure:C.useDisclosure,useGroupAction,usePresentation,renderSlot,t});
  if(opts.entryKey==='tool-call' && owner.node.key==='t1')return h(T.BashRow,{toolName:'bash',block:{kind:'result',callId:'fixture-shell',call:{name:'bash',argsRaw:JSON.stringify({command:'node scripts/build.mjs'})},args:{text:()=>undefined},content:[{type:'text',text:'Built successfully\\nExit code: 0'}],isError:false},sessionId:'fixture',useSessions:selector=>selector({byId:{fixture:{cwd:'D:/fixture'}}}),useDisclosure:C.useDisclosure,t,inspect:()=>calls.push({type:'inspect'})});
  if(opts.entryKey==='tool-call')return h(T.ToolRow,{...owner.node.data,useDisclosure:C.useDisclosure,t,icon:h('svg',{width:14,height:14},h('circle',{cx:7,cy:7,r:5,fill:'none',stroke:'currentColor'})),inspect:()=>calls.push({type:'inspect'}),onOpenFile:path=>calls.push({type:'file',path})});
 }
 if(name==='conversation.chat.reasoning.body')return h('div',null,owner.text);
 return null;
};
function Root(){React.useSyncExternalStore(fn=>ctx.slots.subscribe('conversation.chat.node',fn),()=>ctx.slots.getVersion('conversation.chat.node'));return h(React.Fragment,null,h('div',{style:{background:'#222',padding:'14px 18px',borderRadius:20,margin:'0 0 32px 150px'}},'为正文添加可独立开关的 Codex 效果。'),h('div',{'data-chat-flow':'','data-chat-motion':''},h('div',{'data-slot':'conversation.chat.flow',style:{display:'contents'}},h(C.ChatFlow,{entries:[{kind:'node',key:'head'},{kind:'group',key:'g'},{kind:'node',key:'a1',groupPart:'response'},{kind:'group',key:'g2'},{kind:'node',key:'a2',groupPart:'response'}],pendingInputs:[],lastInputTurn:1,deferCollapse:false,useConnectionState:()=> 'connected',useSession,useChat,useChatNode,useChatNodeBottom,useChatNodeProcess,useChatGroup,usePresentation,useStore,actions,renderSlot,renderFactorySlot:()=>null,t,useGroupAction,useGroupHeaderAction,cwd:'D:/fixture',openFile:path=>calls.push({type:'file',path}),loadImage:()=>{},fileMentions:()=>null}))));}
window.root=fixtureModules['react-dom/client'].createRoot(document.getElementById('fixture'));root.render(h(Root));
window.inspectState=()=>({attrs:document.body.hasAttribute('data-dsc-codex-body'),styles:document.querySelectorAll('style[data-dsc-codex-body]').length,childOwnerPreserved:ctx.slots.spec('conversation.chat.reasoning.body')===originalSpec,entries:ctx.slots.entries('conversation.chat.node').map(e=>({key:e.options.key,priority:e.options.priority,keys:Object.keys(e)})),listeners:events.size});
window.mode=mode=>policy.set({...policy.getSnapshot(),stepGrouping:mode});window.replies=value=>policy.set({...policy.getSnapshot(),foldedReplies:value});window.setNoAnswer=value=>{window.noAnswer=value;make();};window.setInterleaved=value=>{window.interleaved=value;make();};window.ready=true;
</script></body></html>`;


const browser=await chromium.launch({executablePath:browserPath,headless:true,args:['--no-proxy-server']});
t.after(() => browser.close());
const page=await browser.newPage({viewport:{width:1050,height:950},deviceScaleFactor:1.5}),errors=[];
page.setDefaultTimeout(4000);
page.on('pageerror',error=>errors.push(error.message));
routes['/']=['text/html',html];
await page.route('**/*',route=>{const found=routes[new URL(route.request().url()).pathname];return found?route.fulfill({contentType:found[0],body:found[1]}):route.fulfill({status:404,body:''});});
const checks=[];
const screenshot=async name=>{if(process.env.DSH_BODY_SCREENSHOT_DIR){fs.mkdirSync(process.env.DSH_BODY_SCREENSHOT_DIR,{recursive:true});await page.locator('#fixture').screenshot({path:path.join(process.env.DSH_BODY_SCREENSHOT_DIR,name)});}};
  await page.goto('http://turn-fold.fixture/');await page.waitForFunction(()=>window.ready);await page.waitForTimeout(200);
  if(errors.length) throw Error(errors.join(' | '));
  const grouping=await page.evaluate(()=>{
    const order=['head','context','a1','t2','a2'],turn={turn:1,status:'closed'},location={kind:'step',turn};
    const nodes=new Map([
      ['head',{key:'head',kind:'turn-process',groupTree:'turn',location}],
      ['context',{key:'context',kind:'context',location,data:{}}],
      ['a1',{key:'a1',kind:'assistant-step',location,data:{blocks:[{kind:'reasoning',text:'思考过程'},{kind:'text',text:'第一段工作自述'}]}}],
      ['t2',{key:'t2',kind:'tool-call',location,data:{root:{kind:'result',callId:'t2',call:{name:'bash'},subCalls:[]}}}],
      ['a2',{key:'a2',kind:'assistant-step',location,data:{blocks:[{kind:'text',text:'最终答复'}]}}]
    ]);
    const input={readTurn:()=>order,readNode:key=>nodes.get(key),readPosition:key=>{const i=order.indexOf(key);return {previous:order[i-1],next:order[i+1]}},timeline:{turns:new Map([[1,turn]])}};
    const g=new window.nativeGroupingClass(1);g.rebuild(input,new Set(order));return {roots:order.flatMap(key=>g.references(key)),groups:g.snapshots().map(x=>({key:x.key,members:x.members}))};
  });
  assert.deepEqual(grouping.roots.map(x=>x.kind),['node','group','node','group','node']);
  assert.deepEqual(grouping.groups[0].members.map(x=>[x.key,x.groupPart??'']),[['context',''],['a1','reasoning']]);
  checks.push('host groups context and reasoning before the separate narration');
  await page.evaluate(()=>finish('completed'));await page.waitForTimeout(200);
  const header=page.locator('.dsc-body-turn__label');
  assert.equal(await header.count(),1,'one whole-turn work-steps entry');
  assert.match(await header.textContent(),/^已处理 /,'whole-turn entry preserves its original wording');
  assert.equal(await header.getAttribute('title'),null,'no added tooltip');
  assert.equal(await header.isEnabled(),true);
  await page.mouse.move(0,0);await page.waitForTimeout(200);
  assert.equal(await header.locator('svg').evaluate(el=>getComputedStyle(el).opacity),'0','whole-turn arrow preserves its original idle appearance');
  await header.hover();await page.waitForTimeout(200);
  assert.equal(await header.locator('svg').evaluate(el=>getComputedStyle(el).opacity),'1','whole-turn arrow appears on hover');
  await page.mouse.move(0,0);await page.waitForTimeout(200);
  if(await header.getAttribute('aria-expanded')!=='true') await header.click();await page.waitForTimeout(200);
  const group=page.locator('[data-chat-group-key="g"] [data-process-activity]');
  const groupBody=page.locator('[data-chat-group-key="g"] [data-step-process-body]');
  const narration=page.locator('[data-chat-node-key="a1"][data-chat-group-part="response"]');
  const answer=page.locator('[data-chat-node-key="a2"][data-chat-group-part="response"]');
  const later=page.locator('[data-chat-group-key="g2"]');
  assert.equal(await group.evaluate(el=>getComputedStyle(el,'::before').content),'none','no added group prefix');
  assert.equal(await page.getByRole('button',{name:'已完成分析',exact:true}).count(),1,'local group preserves its original accessible name');
  if(await group.getAttribute('aria-expanded')!=='true') await group.click();await page.waitForTimeout(200);
  assert.equal(await groupBody.isVisible(),true);
  assert.equal(await page.locator('[data-chat-node-key="t1"]').isVisible(),true,'injected context belongs to first group');
  assert.equal(await page.locator('[data-chat-node-key="a1"][data-chat-group-part="reasoning"]').isVisible(),true,'first reasoning belongs to first group');
  assert.equal(await narration.isVisible(),true);assert.equal(await later.isVisible(),true);assert.equal(await answer.isVisible(),true);
  await screenshot('work-steps-expanded.png');
  await group.click();await page.waitForTimeout(200);
  assert.equal(await group.getAttribute('aria-expanded'),'false');assert.equal(await groupBody.isVisible(),false);
  assert.equal(await header.getAttribute('aria-expanded'),'true');assert.equal(await narration.isVisible(),true);assert.equal(await later.isVisible(),true);
  checks.push('local group only affects its own context and reasoning');
  await header.click();await page.waitForTimeout(250);
  assert.equal(await header.getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('[data-chat-group-key="g"]').isVisible(),false);assert.equal(await narration.isVisible(),false);assert.equal(await later.isVisible(),false);
  assert.equal(await answer.isVisible(),true,'whole-turn fold preserves final answer');
  await screenshot('work-steps-collapsed.png');
  checks.push('whole-turn fold hides all process groups and narration while keeping the final answer');
  await header.click();await page.waitForTimeout(200);
  assert.equal(await narration.isVisible(),true);assert.equal(await later.isVisible(),true);assert.equal(await answer.isVisible(),true);
  checks.push('reopening restores the process');
  await page.evaluate(()=>setNoAnswer(true));await page.waitForTimeout(200);
  if(await header.getAttribute('aria-expanded')!=='false') await header.click();await page.waitForTimeout(200);
  assert.equal(await narration.isVisible(),false);assert.equal(await answer.isVisible(),false);
  checks.push('a completed turn without a final answer folds its process replies');
  await page.evaluate(()=>setNoAnswer(false));
  for(const reason of ['aborted','interrupted','error']){
    await page.evaluate(reason=>finish(reason),reason);await page.waitForTimeout(180);
    assert.equal(await header.isDisabled(),true,reason+' remains uncollapsible');assert.equal(await narration.isVisible(),true,reason+' process remains visible');
  }
  await page.evaluate(()=>restart());await page.waitForTimeout(180);
  assert.match(await header.textContent(),/^已处理 /,'running turn preserves its original wording');
  assert.equal(await header.isDisabled(),true,'running turn remains uncollapsible');assert.equal(await narration.isVisible(),true);
  checks.push('running, stopped, and failed turns retain existing open semantics');
  assert.deepEqual(errors,[]);
  t.diagnostic(JSON.stringify({hostVersion,source:process.env.FOLD_BUNDLE?'bundle':'source',checks}));
});
