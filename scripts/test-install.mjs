import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, realpath, lstat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { load as parseYaml } from 'js-yaml';
const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(join(source, 'package.json'), 'utf8'));
const installer = join(source, 'scripts/install.mjs');
const lock = "lockfileVersion: '9.0'\n\nimporters:\n\n  .:\n    dependencies:\n      fixture:\n        specifier: 1.0.0\n        version: 1.0.0\n";
async function fixture(t, { layout = 'legacy', withLock = true, version = '0.2.1-rc.3', dependencies = true, patchText = '[]\n', writeRuntime = true } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dsh-codex-install-test-'));
  t.after(async () => { assert.ok(root.startsWith(join(tmpdir(), 'dsh-codex-install-test-'))); await rm(root, { recursive: true, force: true }); });
  const home = join(root, 'home'), profile = join(home, 'profiles/desktop'), appData = join(root, 'local');
  const installDir = join(root, 'custom/DeepSeek-Harness');
  const runtimeFile = layout === 'legacy' ? join(home, 'dsh-runtimes/dsh-primary-runtime/runtime.json') : layout === 'custom' ? join(installDir, 'resources/runtime/primary-runtime/runtime.json') : join(appData, 'Programs/DeepSeek Harness/resources/runtime/primary-runtime/runtime.json');
  await mkdir(profile, { recursive: true });
  if (writeRuntime) { await mkdir(dirname(runtimeFile), { recursive: true }); await writeFile(runtimeFile, JSON.stringify({ desktopVersion: version })); }
  const markerPath = join(home, 'dsh-codex-style', 'install-environment.json');
  const environment = async () => JSON.parse(await readFile(markerPath, 'utf8'));
  const config = { name: 'fixture', private: true, dsh: { profile: { bundles: ['@deepseek-ai/dsh-base'] } } };
  if (dependencies) config.dependencies = { fixture: '1.0.0' };
  const original = { 'package.json': JSON.stringify(config, null, 2), 'cordis.patch.yml': patchText };
  if (withLock) original['pnpm-lock.yaml'] = lock;
  for (const [file, bytes] of Object.entries(original)) await writeFile(join(profile, file), bytes);
  // 固定 DSH_INSTALL_DIR，避免测试读到本机注册表中的真实 DSH 安装；模拟注册表时用 undefined 移除该变量。
  const env = { ...process.env, DSH_HOME: home, DSH_RUNTIME_FILE: '', DSH_INSTALL_DIR: join(root, 'no-registered-install'), DSH_CODEX_STYLE_TEST_HOSTS: '', DSH_CODEX_STYLE_ALLOW_THIRD_PARTY: '', LOCALAPPDATA: appData, ProgramFiles: join(root, 'programs') };
  const run = (script = installer, extraEnv = {}) => {
    const environmentVariables = { ...env, ...extraEnv };
    for (const key of Object.keys(environmentVariables)) if (environmentVariables[key] === undefined) delete environmentVariables[key];
    return spawnSync(process.execPath, [script], { env: environmentVariables, encoding: 'utf8' });
  };
  // 社区安装会在 JSON 回执前输出可读警告；调用方仍可用 JSON.parse 解析回执，rollback 等纯文本输出原样返回。
  const success = (script, extraEnv) => {
    const result = run(script, extraEnv);
    assert.equal(result.status, 0, result.stderr);
    const start = result.stdout.indexOf('{');
    return start === -1 ? result.stdout : result.stdout.slice(start);
  };
  const restored = async () => {
    for (const [file, bytes] of Object.entries(original)) assert.equal(await readFile(join(profile, file), 'utf8'), bytes);
    if (!withLock) await assert.rejects(lstat(join(profile, 'pnpm-lock.yaml')), { code: 'ENOENT' });
  };
  return { root, home, profile, installDir, runtimeFile, markerPath, environment, run, success, restored };
}
for (const version of ['0.2.1-rc.2', '0.2.1-rc.3', '0.2.1-rc.5']) for (const withLock of [true, false]) {
  test(`install, same-version upgrade and two rollbacks; runtime=${version}, lock=${withLock}`, async t => {
    const f = await fixture(t, { version, withLock, dependencies: withLock });
    const a = JSON.parse(f.success()); const link = join(f.profile, 'node_modules', manifest.name);
    assert.equal(a.runtimeVersion, version);
    assert.equal(await realpath(link), await realpath(a.target));
    const patch = parseYaml(await readFile(join(f.profile, 'cordis.patch.yml'), 'utf8'));
    assert.equal(patch.find(row => row.id === 'ui-skin-codex-style')?.name, manifest.name);
    const b = JSON.parse(f.success()); assert.notEqual(a.target, b.target);
    f.success(b.rollback); assert.equal(await realpath(link), await realpath(a.target));
    f.success(a.rollback); await f.restored(); await assert.rejects(lstat(link), { code: 'ENOENT' });
  });
}
for (const patchText of ['  [ ]\r\n', '# keep [] in comment\r\n[] # empty overrides\r\n', '- id: unrelated\n  disabled: true\n']) {
  test(`initial installation produces a readable patch: ${JSON.stringify(patchText)}`, async t => {
    const f = await fixture(t, { patchText, withLock: false });
    const a = JSON.parse(f.success());
    const text = await readFile(join(f.profile, 'cordis.patch.yml'), 'utf8');
    const rows = parseYaml(text);
    assert.ok(Array.isArray(rows));
    assert.equal(rows.filter(row => row.id === 'ui-skin-codex-style').length, 1);
    for (const row of parseYaml(patchText)) assert.deepEqual(rows.find(item => item.id === row.id), row);
    if (patchText.includes('# keep')) assert.ok(text.includes('# keep [] in comment'));
    f.success(a.rollback); await f.restored();
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
test('installation directory on another drive is found before default locations', { skip: process.platform !== 'win32' }, async t => {
  const f = await fixture(t, { layout: 'custom', withLock: false });
  const official = join(f.root, 'local/Programs/DeepSeek Harness/resources/runtime/primary-runtime/runtime.json');
  await mkdir(dirname(official), { recursive: true }); await writeFile(official, JSON.stringify({ desktopVersion: '0.2.1-rc.2' }));
  const a = JSON.parse(f.success(undefined, { DSH_INSTALL_DIR: f.installDir }));
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile)); assert.equal(a.runtimeVersion, '0.2.1-rc.3');
  f.success(a.rollback); await f.restored();
});
test('missing runtime lists searched locations and the DSH_INSTALL_DIR hint', async t => {
  const f = await fixture(t, { layout: 'custom' }); const r = f.run();
  assert.notEqual(r.status, 0); assert.match(r.stderr, /未找到 DSH runtime\.json/); assert.match(r.stderr, /DSH_INSTALL_DIR/);
  assert.ok(r.stderr.includes(join(f.home, 'dsh-runtimes')), r.stderr); await f.restored();
});
const desktop = { name: 'DSH Desktop', version: '1.0.6', location: 'X:\\DSH Desktop', official: false };
// 模拟注册表模式：移除夹具默认的显式安装目录，让注入的注册表主机参与候选。
const registryMode = { DSH_INSTALL_DIR: undefined };

test('community DSH Desktop with a valid runtime installs after a warning and records its target', async t => {
  const f = await fixture(t, { layout: 'custom' });
  const hosts = JSON.stringify([{ ...desktop, location: f.installDir }]);
  const r = f.run(undefined, { ...registryMode, DSH_CODEX_STYLE_TEST_HOSTS: hosts });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /检测到的不是 DeepSeek 官方版/);
  assert.match(r.stdout, /社区版 DSH Desktop 1\.0\.6/);
  assert.match(r.stdout, /效果可能一般/);
  const a = JSON.parse(r.stdout.slice(r.stdout.indexOf('{')));
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile));
  assert.equal(await realpath(join(f.profile, 'node_modules', manifest.name)), await realpath(a.target));
  const marker = await f.environment();
  assert.equal(marker.schemaVersion, 1);
  assert.equal(marker.target.official, false);
  assert.equal(resolve(marker.target.installRoot), resolve(f.installDir));
  assert.equal(resolve(marker.target.runtimePath), resolve(f.runtimeFile));
  assert.deepEqual(marker.communityHosts.map(host => resolve(host.installRoot)), [resolve(f.installDir)]);
  f.success(a.rollback); await f.restored();
});

test('community DSH Desktop without a readable runtime is refused, never guessed from the registry version', async t => {
  const f = await fixture(t, { layout: 'custom', writeRuntime: false });
  const hosts = JSON.stringify([{ ...desktop, location: f.installDir }]);
  const r = f.run(undefined, { ...registryMode, DSH_CODEX_STYLE_TEST_HOSTS: hosts });
  assert.notEqual(r.status, 0); assert.match(r.stderr, /未找到 DSH runtime\.json/); assert.doesNotMatch(r.stderr, /版本不匹配/);
  assert.doesNotMatch(r.stderr, /at file:/); await f.restored();
  await assert.rejects(lstat(f.markerPath), { code: 'ENOENT' });
});

test('unsupported community runtime is refused without touching the profile or environment marker', async t => {
  const f = await fixture(t, { layout: 'custom', version: '0.2.1-rc.4' });
  const hosts = JSON.stringify([{ ...desktop, location: f.installDir }]);
  const r = f.run(undefined, { ...registryMode, DSH_CODEX_STYLE_TEST_HOSTS: hosts });
  assert.notEqual(r.status, 0); assert.match(r.stderr, /版本不匹配：检测到 0\.2\.1-rc\.4/); assert.match(r.stderr, /未作任何修改/);
  await f.restored(); await assert.rejects(lstat(f.markerPath), { code: 'ENOENT' });
});

test('official installation leaves no community warning and marks the official target', async t => {
  const f = await fixture(t);
  const r = f.run();
  assert.equal(r.status, 0, r.stderr); assert.doesNotMatch(r.stdout, /不是 DeepSeek 官方版/);
  const marker = await f.environment();
  assert.equal(marker.target.official, true);
  assert.equal(resolve(marker.target.runtimePath), resolve(f.runtimeFile));
  assert.deepEqual(marker.communityHosts, []);
  const a = JSON.parse(r.stdout.slice(r.stdout.indexOf('{')));
  f.success(a.rollback); await f.restored();
});

test('official Harness alongside DSH Desktop requires confirmation and records the official target', async t => {
  const f = await fixture(t, { withLock: false }); const hosts = JSON.stringify([desktop]);
  const r = f.run(undefined, { DSH_CODEX_STYLE_TEST_HOSTS: hosts });
  assert.notEqual(r.status, 0); assert.match(r.stderr, /还装有 DSH Desktop 1\.0\.6/); await f.restored();
  const confirmed = f.run(undefined, { DSH_CODEX_STYLE_TEST_HOSTS: hosts, DSH_CODEX_STYLE_ALLOW_THIRD_PARTY: '1' });
  assert.equal(confirmed.status, 0, confirmed.stderr);
  assert.doesNotMatch(confirmed.stdout, /不是 DeepSeek 官方版/);
  const a = JSON.parse(confirmed.stdout.slice(confirmed.stdout.indexOf('{')));
  const marker = await f.environment();
  assert.equal(marker.target.official, true);
  assert.notEqual(resolve(marker.target.installRoot), resolve(desktop.location));
  assert.ok(marker.communityHosts.some(host => resolve(host.installRoot) === resolve(desktop.location)));
  f.success(a.rollback); await f.restored();
});
test('explicit runtime file supports a custom installation without blaming a nearby community host', async t => {
  const f = await fixture(t, { layout: 'official', withLock: false });
  const extra = { DSH_RUNTIME_FILE: f.runtimeFile, DSH_CODEX_STYLE_TEST_HOSTS: JSON.stringify([desktop]), DSH_CODEX_STYLE_ALLOW_THIRD_PARTY: '1' };
  const r = f.run(undefined, extra);
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stdout, /不是 DeepSeek 官方版/);
  const a = JSON.parse(r.stdout.slice(r.stdout.indexOf('{')));
  assert.equal(resolve(a.runtimePath), resolve(f.runtimeFile));
  const marker = await f.environment();
  assert.equal(marker.target.official, null);
  assert.equal(resolve(marker.target.installRoot), resolve(dirname(dirname(dirname(dirname(f.runtimeFile))))));
  assert.ok(marker.communityHosts.some(host => host.name === 'DSH Desktop'));
  f.success(a.rollback); await f.restored();
});

test('explicit DSH_INSTALL_DIR stays official even when a community host is present', async t => {
  const f = await fixture(t, { layout: 'custom' });
  const extra = { DSH_INSTALL_DIR: f.installDir, DSH_CODEX_STYLE_TEST_HOSTS: JSON.stringify([desktop]), DSH_CODEX_STYLE_ALLOW_THIRD_PARTY: '1' };
  const r = f.run(undefined, extra);
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stdout, /不是 DeepSeek 官方版/);
  const marker = await f.environment();
  assert.equal(marker.target.official, true);
  assert.equal(resolve(marker.target.installRoot), resolve(f.installDir));
  const a = JSON.parse(r.stdout.slice(r.stdout.indexOf('{')));
  f.success(a.rollback); await f.restored();
});
for (const version of ['0.2.1-rc.1', '0.2.1-rc.4', '0.2.1', '0.2.2', '2.0.19-next']) test(`unsupported runtime ${version} refuses to modify profile`, async t => {
  const f = await fixture(t, { version }); const r = f.run(); assert.notEqual(r.status, 0); assert.match(r.stderr, new RegExp(`版本不匹配：检测到 ${version.replaceAll('.', '\\.')}`)); assert.match(r.stderr, /未作任何修改/); await f.restored();
});
test('invalid explicit runtime does not silently use another installation', async t => {
  const f = await fixture(t); const r = f.run(undefined, { DSH_RUNTIME_FILE: join(f.root, 'missing.json') }); assert.notEqual(r.status, 0); assert.match(r.stderr, /未找到 DSH/); await f.restored();
});
test('rollback preserves subsequent user edits', async t => {
  const f = await fixture(t, { withLock: false }); const a = JSON.parse(f.success());
  const file = join(f.profile, 'cordis.patch.yml'); await writeFile(file, '# user edit\n');
  assert.notEqual(f.run(a.rollback).status, 0); assert.equal(await readFile(file, 'utf8'), '# user edit\n');
});

for (const disabled of [true, false]) test(`optional components ship complete and preserve saved switches on upgrade; disabled=${disabled}`, async t => {
  const f = await fixture(t);
  const patch = join(f.profile, 'cordis.patch.yml');
  const saved = `- id: codex-style-work-guidelines\n  disabled: ${!disabled}\n- id: codex-style-body\n  disabled: ${disabled}\n- id: codex-style-header\n  disabled: ${!disabled}\n- id: codex-style-navigation\n  disabled: ${!disabled}\n- id: codex-style-image-annotations\n  disabled: ${disabled}\n`;
  await writeFile(patch, saved);
  const a = JSON.parse(f.success());
  for (const file of ['lib/behavior.js', 'prompts/work-guidelines.md', 'locale/behavior/en.json', 'locale/behavior/zh.json', 'lib/body.js', 'locale/body/en.json', 'locale/body/zh.json', 'lib/header.js', 'locale/header/en.json', 'locale/header/zh.json', 'lib/navigation.js', 'locale/navigation/en.json', 'locale/navigation/zh.json', 'lib/skills-host.js', 'lib/image-annotations.js', 'lib/image-annotations-host.js', 'locale/image-annotations/en.json', 'locale/image-annotations/zh.json']) {
    assert.deepEqual(await readFile(join(a.target, file)), await readFile(join(source, file)));
  }
  assert.ok((await readFile(patch, 'utf8')).startsWith(saved));
  const b = JSON.parse(f.success());
  assert.equal(await readFile(patch, 'utf8'), await readFile(join(b.backup, 'cordis.patch.yml'), 'utf8'));
  f.success(b.rollback); f.success(a.rollback);
  assert.equal(await readFile(patch, 'utf8'), saved);
});

test('bundle defaults enable visual effects and keep prompt injection disabled', async () => {
  const [{ insert }] = parseYaml(await readFile(join(source, 'cordis.patch.yml'), 'utf8'));
  const defaults = new Map(insert.map(row => [row.id, row]));
  assert.notEqual(defaults.get('ui-skin-codex-style').disabled, true);
  assert.equal(defaults.get('codex-style-body').disabled, false);
  assert.equal(defaults.get('codex-style-header').disabled, false);
  assert.equal(defaults.get('codex-style-navigation').disabled, false);
  assert.equal(defaults.get('codex-style-image-annotations').disabled, false);
  assert.equal(defaults.get('codex-style-work-guidelines').disabled, true);
  assert.equal(defaults.get('codex-style-header').name, manifest.name + '/header');
  assert.equal(manifest.exports['./header'], './lib/header.js');
  assert.equal(manifest.exports['./header/locale/*.json'], './locale/header/*.json');
  assert.equal(defaults.get('codex-style-navigation').name, manifest.name + '/navigation');
  assert.equal(manifest.exports['./navigation'], './lib/navigation.js');
  assert.equal(manifest.exports['./navigation/locale/*.json'], './locale/navigation/*.json');
  assert.equal(defaults.get('codex-style-image-annotations').name, manifest.name + '/image-annotations');
  assert.equal(manifest.exports['./image-annotations'], './lib/image-annotations.js');
  assert.equal(manifest.exports['./image-annotations/locale/*.json'], './locale/image-annotations/*.json');
});
