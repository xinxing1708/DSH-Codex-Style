import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

// 自研插件更新退役后的发布边界：不得再构建、复制、打包或注册退役模块。
// DSH 本体更新（DesktopUpdate*）保持可用；技能、环境、正文等其它功能不在本测试范围内。
const product = dirname(dirname(fileURLToPath(import.meta.url)));
const read = name => readFile(join(product, name), 'utf8');
const retired = ['lib/updater.js', 'lib/update-install.js', 'lib/update-host-install.js', 'lib/update-common.js'];
const markers = [
  'codexStyleUpdates', 'mountPluginUpdateRemote', 'createPluginUpdateService',
  'PluginUpdateAction', 'PluginUpdateNotice', 'PluginUpdateControl', 'UPDATE_CACHE_KEY',
  'registry.npmmirror.com', 'registry.npmjs.org', 'mirrors.cloud.tencent.com'
];

test('retired update modules are neither built nor left in lib', async () => {
  for (const file of retired) await assert.rejects(access(join(product, file)), { code: 'ENOENT' }, file);
  const lib = await readdir(join(product, 'lib'));
  for (const name of lib) assert(!/^(updater|update-(common|install|host-install))\.js$/.test(name), name);
});

test('client bundle keeps only the DSH desktop update and drops every self-update marker', async () => {
  const bundle = await read('lib/client.js');
  for (const marker of markers) assert.equal(bundle.includes(marker), false, marker);
  for (const kept of ['createDesktopUpdateSource', 'DesktopUpdateRailButton', 'desktopUpdateView']) assert.equal(bundle.includes(kept), true, kept);
});

test('host half registers no update service and imports no retired module', async () => {
  const source = await read('lib/host.js');
  for (const marker of ['codexStyleUpdates', 'PluginUpdater', 'HostInstaller', 'update-install', 'update-host-install', 'update-common']) assert.equal(source.includes(marker), false, marker);
  const host = await import(new URL('../lib/host.js', import.meta.url));
  assert.equal(host.name, 'codex-style');
  assert.deepEqual(host.inject, ['profileContext']);
  assert.equal(host.apply.toString().includes('codexStyleUpdates'), false);
});

test('manual installer no longer requires or copies retired modules', async () => {
  const installer = await read('scripts/install.mjs');
  for (const marker of ['lib/updater.js', 'lib/update-common.js', 'lib/update-install.js', 'update-host-install']) {
    assert.equal(installer.includes(marker), false, marker);
  }
  // 手动安装/回退仍使用 rollback.mjs，保持引用。
  assert.equal(installer.includes("'scripts/rollback.mjs'"), true);
});

test('npm test no longer runs archived update suites', async () => {
  const manifest = JSON.parse(await read('package.json'));
  for (const file of ['scripts/test-update.mjs', 'scripts/test-update-host-install.mjs', 'scripts/test-host-wiring.mjs']) {
    await assert.rejects(access(join(product, file)), { code: 'ENOENT' }, file);
    assert.equal(manifest.scripts.test.includes(file), false, file);
  }
});

test('package contents exclude retired artifacts', async () => {
  const npm = join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
  const output = execFileSync(process.execPath, [npm, 'pack', '--dry-run', '--ignore-scripts', '--json'], { cwd: product, encoding: 'utf8' });
  const files = JSON.parse(output)[0].files.map(entry => entry.path.replaceAll('\\', '/'));
  for (const file of retired) assert.equal(files.includes(file), false, file);
  for (const file of ['scripts/test-update.mjs', 'scripts/test-host-wiring.mjs']) assert.equal(files.includes(file), false, file);
  // 发布仍带 DSH 本体更新入口所需的客户端与 Host 构建产物。
  assert.equal(files.includes('lib/client.js'), true);
  assert.equal(files.includes('lib/host.js'), true);
});
