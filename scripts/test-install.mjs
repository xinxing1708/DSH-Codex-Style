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
async function fixture(t, { layout = 'legacy', withLock = true, version = manifest.dsh.engines.dsh, dependencies = true } = {}) {
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
for (const withLock of [true, false]) {
  test(`install, same-version upgrade and two rollbacks; lock=${withLock}`, async t => {
    const f = await fixture(t, { withLock, dependencies: withLock });
    const a = JSON.parse(f.success()); const link = join(f.profile, 'node_modules', manifest.name);
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
test('explicit runtime file supports a custom installation', async t => {
  const f = await fixture(t, { layout: 'official', withLock: false }); const a = JSON.parse(f.success(undefined, { DSH_RUNTIME_FILE: f.runtimeFile }));
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile)); f.success(a.rollback); await f.restored();
});
test('version mismatch refuses to modify profile', async t => {
  const f = await fixture(t, { version: '2.0.19-next' }); const r = f.run(); assert.notEqual(r.status, 0); assert.match(r.stderr, /版本不匹配/); await f.restored();
});
test('invalid explicit runtime does not silently use another installation', async t => {
  const f = await fixture(t); const r = f.run(undefined, { DSH_RUNTIME_FILE: join(f.root, 'missing.json') }); assert.notEqual(r.status, 0); assert.match(r.stderr, /未找到 DSH/); await f.restored();
});
test('rollback preserves subsequent user edits', async t => {
  const f = await fixture(t, { withLock: false }); const a = JSON.parse(f.success());
  const file = join(f.profile, 'cordis.patch.yml'); await writeFile(file, '# user edit\n');
  assert.notEqual(f.run(a.rollback).status, 0); assert.equal(await readFile(file, 'utf8'), '# user edit\n');
});
