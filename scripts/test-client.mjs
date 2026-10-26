import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { Context, Service } from '@deepseek-ai/cordis';

// 加载实际发行 bundle；DOM 呈现另用原生前端隔离检查，这里只验证服务生命周期。
async function modelRegistration() {
  let plugin;
  const intervals = new Map();
  const store = value => ({ getSnapshot: () => value, set: next => { value = next; } });
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: store };
      return {};
    });
  } }, localStorage: { getItem: () => null } };
  new Script(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).runInNewContext({
    window, console: { warn() {}, error() {} },
    setInterval: fn => { const id = {}; intervals.set(id, fn); return id; },
    clearInterval: id => intervals.delete(id)
  });
  const injections = [];
  plugin.apply({ inject: (dependencies, callback) => injections.push({ dependencies, callback }), effect() {}, slots: { inject() {} } });
  return { ...injections.find(row => row.dependencies.includes('remote.session')), intervals };
}

async function fixture(t) {
  const registration = await modelRegistration();
  const ctx = new Context();
  t.after(() => ctx.fiber.dispose());
  const entries = new Set();
  class Slots extends Service {
    constructor(scope) { super(scope, 'slots'); }
    entries() { return [{ options: { priority: -7 } }]; }
    inject(name, callback) { return this.ctx.effect(callback); }
    register(options, component) {
      const entry = { options, component }; entries.add(entry);
      return () => entries.delete(entry);
    }
  }
  await ctx.plugin(Slots).await();
  for (const name of ['sessions', 'locale', 'remote', 'remote.session']) ctx.provide(name, {});
  const consumer = ctx.inject(registration.dependencies, registration.callback);
  await new Promise(setImmediate);
  class Directories extends Service {
    constructor(scope, id) { super(scope, 'modelDirectories'); this.id = id; }
    directoryFor(sessionId) { return { service: this.id, sessionId }; }
  }
  const provide = async id => {
    const provider = ctx.plugin(Directories, id); await provider.await(); await consumer.await();
    await new Promise(setImmediate); return provider;
  };
  return { ...registration, entries, provide };
}

test('model picker mounts when its service becomes ready after the old probe deadline', async t => {
  const f = await fixture(t);
  for (let tick = 0; tick < 42; tick++) for (const callback of [...f.intervals.values()]) callback();
  await f.provide('late');
  assert.equal(f.entries.size, 1);
  const entry = [...f.entries][0];
  assert.equal(entry.options.priority, -8);
  assert.equal(entry.options.inject('chat').directory.service, 'late');
});

test('model picker releases a removed service and binds the replacement', async t => {
  const f = await fixture(t);
  const first = await f.provide('first');
  // 旧代码也先完成一次探测，以便独立验证替换时的清理。
  for (const callback of [...f.intervals.values()]) callback();
  assert.equal(f.entries.size, 1);
  await first.dispose(); await new Promise(setImmediate);
  assert.equal(f.entries.size, 0);
  await f.provide('second');
  assert.equal(f.entries.size, 1);
  assert.equal([...f.entries][0].options.inject('chat').directory.service, 'second');
});

// 运行实际 bundle 和 Cordis 生命周期，检查两个呈现组件是否互相干扰。
async function presentationFixture(t) {
  let plugin;
  const attributes = new Map(), styles = new Set(), events = new Map(), entries = new Set();
  const body = { setAttribute: (key, value) => attributes.set(key, value), removeAttribute: key => attributes.delete(key) };
  const document = { body, head: { appendChild: style => styles.add(style) }, createElement: () => ({ dataset: {}, remove() { styles.delete(this); } }) };
  const window = { __ModuleLoader__: { load: definition => {
    plugin = definition.factory(name => {
      if (name === 'react') return { Component: class {} };
      if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: value => ({ getSnapshot: () => value, set: next => { value = next; } }) };
      return {};
    });
  } }, localStorage: { getItem: () => null } };
  const bundle = (await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')).replace('    return module.exports;', 'module.exports.fixture = { watchCodexPresentation, headerPresentation }; return module.exports;');
  new Script(bundle).runInNewContext({ window, document, console: { warn() {}, error() {} } });
  const ctx = new Context();
  class Slots extends Service {
    constructor(scope) { super(scope, 'slots'); }
    entries() { return [{ options: { key: 'turn-process', priority: 0 } }]; }
    inject(name, callback) { return this.ctx.effect(callback); }
    register(options, component) { const entry = { options, component }; entries.add(entry); return () => entries.delete(entry); }
  }
  await ctx.plugin(Slots).await();
  let inventory = [], nextReply;
  const fibers = [];
  ctx.on('internal/plugin', fiber => { fibers.push(fiber); });
  ctx.provide('remote', {
    pluginInventory: { list: () => nextReply ? nextReply() : Promise.resolve({ ok: true, value: { entries: inventory } }) },
    $on: (name, callback) => { events.set(name, callback); return () => events.delete(name); }
  });
  const stop = ctx.effect(() => plugin.fixture.watchCodexPresentation(ctx));
  t.after(() => ctx.fiber.dispose());
  const flush = () => new Promise(setImmediate);
  const set = async (header, body, phase = 'active') => {
    inventory = [['header', header], ['body', body]].map(([name, enabled]) => ({ moduleName: '@xinxing1708/dsh-codex-style/' + name, enabled, fiberPhase: enabled ? phase : null }));
    await events.get('plugin-manager/changed')(); await flush();
    for (const fiber of fibers) await fiber.await();
  };
  const state = () => ({ header: attributes.has('data-dsc-codex-header'), body: attributes.has('data-dsc-codex-body'), headerStore: plugin.fixture.headerPresentation.getSnapshot(), styles: styles.size, bodySlots: entries.size });
  await flush();
  return { ctx, set, stop, state, events, reply: fn => { nextReply = fn; }, flush };
}

test('header and body effects switch independently and release on plugin disposal', async t => {
  const f = await presentationFixture(t);
  for (const [header, body] of [[true, true], [false, true], [true, false], [false, false], [true, true]]) {
    await f.set(header, body);
    assert.deepEqual(f.state(), { header, body, headerStore: header, styles: Number(header) + Number(body), bodySlots: Number(body) }, `header=${header}, body=${body}`);
  }
  f.stop(); await f.flush();
  assert.deepEqual(f.state(), { header: false, body: false, headerStore: false, styles: 0, bodySlots: 0 });
  assert.equal(f.events.size, 0);
});

test('inactive inventory, errors and stale replies cannot enable presentation effects', async t => {
  const f = await presentationFixture(t);
  await f.set(true, true, 'loading');
  assert.equal(f.state().styles, 0);
  await f.set(true, true);
  f.reply(() => Promise.resolve({ ok: false, error: { message: 'fixture disconnected' } }));
  await f.events.get('plugin-manager/changed')(); await f.flush();
  assert.equal(f.state().styles, 0);
  const replies = [];
  f.reply(() => new Promise(resolve => replies.push(resolve)));
  const refresh = f.events.get('plugin-manager/changed');
  const old = refresh(), latest = refresh();
  replies[1]({ ok: true, value: { entries: [] } }); await latest;
  replies[0]({ ok: true, value: { entries: ['header', 'body'].map(name => ({ moduleName: '@xinxing1708/dsh-codex-style/' + name, enabled: true, fiberPhase: 'active' })) } }); await old; await f.flush();
  assert.equal(f.state().styles, 0);
});
