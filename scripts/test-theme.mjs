import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';
import { Context } from '@deepseek-ai/cordis';

// 加载实际发行 bundle，并只向测试暴露主题入口；不复制产品实现。
async function fixture(t, { preference = 'dark', scheme = preference, previousMarker = null } = {}) {
  let plugin;
  const attributes = new Map(previousMarker === null ? [] : [['data-dsc-color-scheme', previousMarker]]);
  const attributeWrites = [];
  const document = {
    body: {
      getAttribute: key => attributes.get(key) ?? null,
      setAttribute: (key, value) => { attributes.set(key, String(value)); attributeWrites.push([key, String(value)]); },
      removeAttribute: key => { attributes.delete(key); attributeWrites.push([key, null]); }
    }
  };
  const store = initial => {
    let value = initial;
    return { getSnapshot: () => value, set: next => { value = next; }, subscribe: () => () => {} };
  };
  const window = {
    __ModuleLoader__: { load: definition => {
      plugin = definition.factory(name => {
        if (name === 'react') return { Component: class {} };
        if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: store };
        return {};
      });
    } },
    localStorage: { getItem: () => null }
  };
  const original = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8');
  const bundle = original.replace('    return module.exports;', 'module.exports.fixture = { mountCodexTheme }; return module.exports;');
  assert.notEqual(bundle, original, 'bundle test export inserted');
  new Script(bundle, { filename: 'dsh-codex-style/client.js' }).runInNewContext({ window, document, console: { warn() {}, error() {} } });
  assert.equal(typeof plugin.fixture.mountCodexTheme, 'function', 'bundle includes theme lifecycle');

  const ctx = new Context();
  const layers = new Map(), setCalls = [], overrideCalls = [];
  let snapshot = { preference, active: { id: preference === 'system' ? scheme : preference, colorScheme: scheme, tokens: {} }, revision: 0 };
  const compose = () => {
    const tokens = {};
    for (const layer of layers.values()) for (const [key, modes] of Object.entries(layer)) tokens[key] = modes[snapshot.active.colorScheme];
    snapshot = { ...snapshot, active: { ...snapshot.active, tokens }, revision: snapshot.revision + 1 };
    ctx.emit('theme/change', snapshot);
  };
  const update = (nextPreference, nextScheme) => {
    snapshot = { ...snapshot, preference: nextPreference, active: { id: nextPreference === 'system' ? nextScheme : nextPreference, colorScheme: nextScheme } };
    compose();
  };
  const theme = {
    getTheme: () => snapshot,
    setTheme: id => { setCalls.push(id); update(id, id); },
    overrideTokens: (source, tokens) => {
      overrideCalls.push(source);
      layers.set(source, tokens);
      compose();
      return () => { layers.delete(source); compose(); };
    }
  };
  ctx.provide('theme', theme);
  const dark = { '--dsw-alias-bg-base': '#111111', '--dsw-alias-label-primary': '#fcfcfc', '--dsw-radius-panel': '25px' };
  const light = { '--dsw-alias-bg-base': '#ffffff', '--dsw-alias-label-primary': '#0d0d0d' };
  plugin.fixture.mountCodexTheme(ctx, dark, light);
  t.after(() => ctx.fiber.dispose());
  return {
    ctx, theme, layers, setCalls, overrideCalls, update, attributeWrites,
    marker: () => attributes.get('data-dsc-color-scheme'),
    state: () => snapshot,
    stop: () => ctx.fiber.dispose()
  };
}

for (const scheme of ['light', 'dark']) test(`initial ${scheme} follows the host scheme without changing preference`, async t => {
  const f = await fixture(t, { preference: scheme });
  assert.equal(f.marker(), scheme);
  assert.equal(f.state().active.tokens['--dsw-alias-bg-base'], scheme === 'light' ? '#ffffff' : '#111111');
  assert.equal(f.state().active.tokens['--dsw-alias-label-primary'], scheme === 'light' ? '#0d0d0d' : '#fcfcfc');
  assert.equal(f.state().active.tokens['--dsw-radius-panel'], '25px', 'scheme-invariant values retain the dark baseline');
  assert.deepEqual(f.setCalls, []);
});

test('light/dark changes update the marker and token selection without rebuilding the layer', async t => {
  const f = await fixture(t);
  f.update('light', 'light');
  assert.equal(f.marker(), 'light');
  assert.equal(f.state().active.tokens['--dsw-alias-bg-base'], '#ffffff');
  f.update('dark', 'dark');
  assert.equal(f.marker(), 'dark');
  assert.equal(f.state().active.tokens['--dsw-alias-bg-base'], '#111111');
  assert.equal(f.overrideCalls.length, 1);
  assert.deepEqual(f.setCalls, []);
});

test('system uses the host-resolved active color scheme when the OS changes', async t => {
  const f = await fixture(t, { preference: 'system', scheme: 'dark' });
  assert.equal(f.marker(), 'dark');
  f.update('system', 'light');
  assert.equal(f.state().preference, 'system');
  assert.equal(f.marker(), 'light');
  assert.equal(f.state().active.tokens['--dsw-alias-bg-base'], '#ffffff');
  f.update('system', 'dark');
  assert.equal(f.marker(), 'dark');
  assert.deepEqual(f.setCalls, []);
});

test('registered custom themes follow active.colorScheme rather than their id', async t => {
  const f = await fixture(t, { preference: 'custom-evening', scheme: 'light' });
  assert.equal(f.marker(), 'light');
  assert.equal(f.state().preference, 'custom-evening');
  f.update('custom-paper', 'dark');
  assert.equal(f.marker(), 'dark');
  assert.equal(f.state().preference, 'custom-paper');
  assert.deepEqual(f.setCalls, []);
});

test('legacy Codex dark id migrates once and later host choices remain authoritative', async t => {
  const f = await fixture(t, { preference: 'dsh-codex-dark', scheme: 'dark' });
  assert.deepEqual(f.setCalls, ['dark']);
  assert.equal(f.state().preference, 'dark');
  assert.equal(f.marker(), 'dark');
  f.update('light', 'light');
  assert.equal(f.marker(), 'light');
  await f.stop();
  assert.equal(f.state().preference, 'light', 'unload preserves the latest user choice');
  assert.deepEqual(f.setCalls, ['dark'], 'no keep loop or preference restoration');
});

test('unload removes the token layer and listener and retracts only the owned marker', async t => {
  const f = await fixture(t);
  assert.equal(f.layers.size, 1);
  f.update('light', 'light');
  await f.stop();
  assert.equal(f.layers.size, 0);
  assert.equal(f.marker(), undefined);
  assert.equal(f.state().preference, 'light');
  const writes = f.attributeWrites.length;
  f.update('dark', 'dark');
  assert.equal(f.attributeWrites.length, writes, 'theme listener was detached');
  assert.deepEqual(f.setCalls, []);
});

test('unload restores a pre-existing marker without resetting host preference', async t => {
  const f = await fixture(t, { previousMarker: 'previous-owner' });
  assert.equal(f.marker(), 'dark');
  f.update('system', 'light');
  await f.stop();
  assert.equal(f.marker(), 'previous-owner');
  assert.equal(f.state().preference, 'system');
  assert.deepEqual(f.setCalls, []);
});
