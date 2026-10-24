import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, realpath, lstat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(join(source, 'package.json'), 'utf8'));
const installer = join(source, 'scripts/install.mjs');
const lock = "lockfileVersion: '9.0'\n\nimporters:\n\n  .:\n    dependencies:\n      fixture:\n        specifier: 1.0.0\n        version: 1.0.0\n";
async function fixture(t, { layout = 'legacy', withLock = true, version = '0.2.1-rc.3', dependencies = true } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dsh-codex-install-test-'));
  t.after(async () => { assert.ok(root.startsWith(join(tmpdir(), 'dsh-codex-install-test-'))); await rm(root, { recursive: true, force: true }); });
  const home = join(root, 'home'), profile = join(home, 'profiles/desktop'), appData = join(root, 'local');
  const runtimeFile = layout === 'legacy' ? join(home, 'dsh-runtimes/dsh-primary-runtime/runtime.json') : join(appData, 'Programs/DeepSeek Harness/resources/runtime/primary-runtime/runtime.json');
  await mkdir(profile, { recursive: true }); await mkdir(dirname(runtimeFile), { recursive: true });
  await writeFile(runtimeFile, JSON.stringify({ desktopVersion: version }));
  const config = { name: 'fixture', private: true, dsh: { profile: { bundles: ['@deepseek-ai/dsh-base'] } } };
  if (dependencies) config.dependencies = { fixture: '1.0.0' };
  const original = { 'package.json': JSON.stringify(config, null, 2), 'cordis.patch.yml': '[]\n' };
  if (withLock) original['pnpm-lock.yaml'] = lock;
  for (const [file, bytes] of Object.entries(original)) await writeFile(join(profile, file), bytes);
  const env = { ...process.env, DSH_HOME: home, DSH_RUNTIME_FILE: '', LOCALAPPDATA: appData, ProgramFiles: join(root, 'programs') };
  const run = (script = installer, extraEnv = {}) => spawnSync(process.execPath, [script], { env: { ...env, ...extraEnv }, encoding: 'utf8' });
  const success = (script, extraEnv) => { const result = run(script, extraEnv); assert.equal(result.status, 0, result.stderr); return result.stdout; };
  const restored = async () => {
    for (const [file, bytes] of Object.entries(original)) assert.equal(await readFile(join(profile, file), 'utf8'), bytes);
    if (!withLock) await assert.rejects(lstat(join(profile, 'pnpm-lock.yaml')), { code: 'ENOENT' });
  };
  return { root, home, profile, runtimeFile, run, success, restored };
}
for (const version of ['0.2.1-rc.2', '0.2.1-rc.3']) for (const withLock of [true, false]) {
  test(`install, same-version upgrade and two rollbacks; runtime=${version}, lock=${withLock}`, async t => {
    const f = await fixture(t, { version, withLock, dependencies: withLock });
    const a = JSON.parse(f.success()); const link = join(f.profile, 'node_modules', manifest.name);
    assert.equal(a.runtimeVersion, version);
    assert.equal(await realpath(link), await realpath(a.target));
    const b = JSON.parse(f.success()); assert.notEqual(a.target, b.target);
    f.success(b.rollback); assert.equal(await realpath(link), await realpath(a.target));
    f.success(a.rollback); await f.restored(); await assert.rejects(lstat(link), { code: 'ENOENT' });
  });
}
test('Windows official installation directory discovery without lock', { skip: process.platform !== 'win32' }, async t => {
  const f = await fixture(t, { layout: 'official', withLock: false }); const a = JSON.parse(f.success());
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile)); f.success(a.rollback); await f.restored();
});
test('Windows official runtime takes priority over a leftover legacy runtime', { skip: process.platform !== 'win32' }, async t => {
  const f = await fixture(t, { layout: 'official', withLock: false });
  const legacy = join(f.home, 'dsh-runtimes/dsh-primary-runtime/runtime.json');
  await mkdir(dirname(legacy), { recursive: true }); await writeFile(legacy, JSON.stringify({ desktopVersion: '0.2.1-rc.2' }));
  const a = JSON.parse(f.success()); assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile)); assert.equal(a.runtimeVersion, '0.2.1-rc.3');
  f.success(a.rollback); await f.restored();
});
test('explicit runtime file supports a custom installation', async t => {
  const f = await fixture(t, { layout: 'official', withLock: false }); const a = JSON.parse(f.success(undefined, { DSH_RUNTIME_FILE: f.runtimeFile }));
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile)); f.success(a.rollback); await f.restored();
});
for (const version of ['0.2.1-rc.1', '0.2.1-rc.4', '0.2.1', '0.2.2', '2.0.19-next']) test(`unsupported runtime ${version} refuses to modify profile`, async t => {
  const f = await fixture(t, { version }); const r = f.run(); assert.notEqual(r.status, 0); assert.match(r.stderr, /版本不匹配/); await f.restored();
});
test('invalid explicit runtime does not silently use another installation', async t => {
  const f = await fixture(t); const r = f.run(undefined, { DSH_RUNTIME_FILE: join(f.root, 'missing.json') }); assert.notEqual(r.status, 0); assert.match(r.stderr, /未找到 DSH/); await f.restored();
});
test('rollback preserves subsequent user edits', async t => {
  const f = await fixture(t, { withLock: false }); const a = JSON.parse(f.success());
  const file = join(f.profile, 'cordis.patch.yml'); await writeFile(file, '# user edit\n');
  assert.notEqual(f.run(a.rollback).status, 0); assert.equal(await readFile(file, 'utf8'), '# user edit\n');
});

test('optional components ship complete and preserve saved switches on upgrade', async t => {
  const f = await fixture(t);
  const patch = join(f.profile, 'cordis.patch.yml');
  const saved = "- id: codex-style-work-guidelines\n  disabled: false\n- id: codex-style-body\n  disabled: false\n";
  await writeFile(patch, saved);
  const a = JSON.parse(f.success());
  for (const file of ['lib/behavior.js', 'prompts/work-guidelines.md', 'locale/behavior/en.json', 'locale/behavior/zh.json', 'lib/body.js', 'locale/body/en.json', 'locale/body/zh.json']) {
    assert.deepEqual(await readFile(join(a.target, file)), await readFile(join(source, file)));
  }
  assert.ok((await readFile(patch, 'utf8')).startsWith(saved));
  const b = JSON.parse(f.success());
  assert.equal(await readFile(patch, 'utf8'), await readFile(join(b.backup, 'cordis.patch.yml'), 'utf8'));
  f.success(b.rollback); f.success(a.rollback);
  assert.equal(await readFile(patch, 'utf8'), saved);
});
