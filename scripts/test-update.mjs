import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, realpath, symlink, rm, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { gzipSync, gunzipSync } from 'node:zlib';
import { PluginUpdater } from '../lib/updater.js';
import { installUpdate, UPDATE_PACKAGE } from '../lib/update-install.js';

const product = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const version = JSON.parse(await readFile(join(product, 'package.json'), 'utf8')).version;
const previousVersion = '0.1.4';
const packed = await mkdtemp(join(tmpdir(), 'dsh-codex-update-pack-'));
after(() => rm(packed, { recursive: true, force: true }));
const npm = join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js');
const result = JSON.parse(execFileSync(process.execPath, [npm, 'pack', '--ignore-scripts', '--json', '--pack-destination', packed], { cwd: product, encoding: 'utf8' }));
const archive = await readFile(join(packed, result[0].filename));
const integrity = bytes => 'sha512-' + createHash('sha512').update(bytes).digest('base64');
async function fixture(t, { withLock = true, directory = false } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'dsh-codex-update-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const profile = join(root, 'profiles/desktop'), link = join(profile, 'node_modules', UPDATE_PACKAGE);
  const previous = directory ? link : join(root, 'dsh-codex-style/old');
  await mkdir(previous, { recursive: true }); await mkdir(dirname(link), { recursive: true });
  await writeFile(join(previous, 'package.json'), JSON.stringify({ name: UPDATE_PACKAGE, version: previousVersion }));
  await writeFile(join(previous, 'client-old.js'), 'old theme bytes');
  if (!directory) await symlink(previous, link, process.platform === 'win32' ? 'junction' : 'dir');
  const config = { dependencies: { unrelated: '1.0.0', [UPDATE_PACKAGE]: directory ? previousVersion : 'link:' + relative(profile, previous).replaceAll('\\', '/') }, dsh: { profile: { bundles: ['unrelated', UPDATE_PACKAGE] } } };
  const original = { 'package.json': JSON.stringify(config, null, 2) + '\n', 'cordis.patch.yml': '- id: group\n  group: true\n  children:\n    - id: ui-skin-codex-style\n      name: "@xinxing1708/dsh-codex-style"\n- id: codex-style-work-guidelines\n  disabled: false\n- id: codex-style-body\n  disabled: true\n- id: codex-style-header\n  disabled: false\n' };
  if (withLock) original['pnpm-lock.yaml'] = `lockfileVersion: '9.0'\n\nimporters:\n\n  .:\n    dependencies:\n      '${UPDATE_PACKAGE}':\n        specifier: ${previousVersion}\n        version: ${previousVersion}\n      unrelated:\n        specifier: 1.0.0\n        version: 1.0.0\n`;
  for (const [name, bytes] of Object.entries(original)) await writeFile(join(profile, name), bytes);
  const unchanged = async () => {
    for (const [name, bytes] of Object.entries(original)) assert.equal(await readFile(join(profile, name), 'utf8'), bytes);
    assert.equal(await realpath(link), await realpath(previous));
  };
  return { root, profile, link, previous, original, unchanged };
}
function network({ bytes = archive, badIntegrity = false, noLength = false, failMirror = false, wrongIdentity = false, offline = false } = {}) {
  const calls = [];
  const fetcher = async (url, { signal }) => {
    calls.push(url); signal.throwIfAborted();
    if (offline) throw new Error('fixture offline');
    if (!url.endsWith('.tgz')) return new Response(JSON.stringify({ name: wrongIdentity ? 'other-package' : UPDATE_PACKAGE, version, dist: { tarball: new URL('update.tgz', url).href, integrity: badIntegrity ? integrity(Buffer.from('wrong bytes')) : integrity(bytes) } }));
    const failing = failMirror && url.includes('npmmirror');
    let position = 0;
    const stream = new ReadableStream({
      async pull(controller) {
        await new Promise(resolve => setTimeout(resolve, 8));
        if (signal.aborted) { controller.error(new Error('aborted')); return; }
        if (failing && position > 0) { controller.error(new Error('fixture connection reset')); return; }
        if (position >= bytes.length) { controller.close(); return; }
        const end = Math.min(bytes.length, position + Math.ceil(bytes.length / 4));
        controller.enqueue(bytes.subarray(position, end)); position = end;
      }
    });
    return new Response(stream, { headers: noLength ? {} : { 'content-length': String(bytes.length) } });
  };
  return { fetcher, calls };
}
async function downloaded(updater) { await updater.download(version); await updater.pending; return updater.status(); }

for (const withLock of [false, true]) test(`download -> install -> rollback keeps grouped patches and switches; lock=${withLock}`, async t => {
  const f = await fixture(t, { withLock }), net = network(), progress = [];
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: net.fetcher, changed: state => progress.push({ ...state }) });
  t.after(() => updater.dispose());
  await updater.download(version); await updater.download(version); await updater.pending;
  assert.equal((await updater.status()).phase, 'ready'); assert.equal(net.calls.length, 2);
  assert(progress.some(state => state.phase === 'downloading' && state.downloaded > 0 && state.downloaded < state.total));
  await f.unchanged();
  const result = await updater.install(version); assert.equal(result.phase, 'installed'); assert.equal(result.restartRequired, true);
  const target = await realpath(f.link); assert.notEqual(target, await realpath(f.previous));
  assert.equal(JSON.parse(await readFile(join(target, 'package.json'), 'utf8')).version, version);
  assert.deepEqual(await readFile(join(target, 'lib/client.js')), await readFile(join(product, 'lib/client.js')));
  for (const file of ['lib/header.js', 'locale/header/zh.json', 'locale/header/en.json']) assert.deepEqual(await readFile(join(target, file)), await readFile(join(product, file)));
  assert.equal(await readFile(join(f.profile, 'cordis.patch.yml'), 'utf8'), f.original['cordis.patch.yml']);
  execFileSync(process.execPath, [result.rollback]); await f.unchanged();
});
test('missing Content-Length reports received bytes and becomes ready only after integrity verification', async t => {
  const f = await fixture(t), progress = [], updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: network({ noLength: true }).fetcher, changed: state => progress.push({ ...state }) });
  t.after(() => updater.dispose()); assert.equal((await downloaded(updater)).phase, 'ready');
  assert(progress.some(state => state.phase === 'downloading' && state.total === null && state.downloaded > 0)); await f.unchanged();
});
test('interrupted domestic mirror falls back and completes a fresh verified download', async t => {
  const f = await fixture(t), net = network({ failMirror: true }), updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: net.fetcher });
  t.after(() => updater.dispose()); assert.equal((await downloaded(updater)).phase, 'ready');
  assert(net.calls.some(url => url.includes('registry.npmjs.org')));
  assert.deepEqual(await readFile(join(f.profile, 'codex-style-updates', version + '.tgz')), archive); await f.unchanged();
});
for (const reason of ['badIntegrity', 'wrongIdentity', 'offline']) test(`${reason} cannot enable installation or alter the existing plugin`, async t => {
  const f = await fixture(t), updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: network({ [reason]: true }).fetcher });
  t.after(() => updater.dispose()); assert.equal((await downloaded(updater)).phase, 'error');
  await assert.rejects(updater.install(version), /先完成/); await f.unchanged();
  updater.fetcher = network().fetcher; assert.equal((await downloaded(updater)).phase, 'ready'); await f.unchanged();
});
test('verified download survives host reload without downloading again', async t => {
  const f = await fixture(t), updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: network().fetcher });
  await downloaded(updater); updater.dispose();
  const restored = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: () => { throw Error('must use cache'); } });
  t.after(() => restored.dispose()); assert.equal((await restored.status()).phase, 'ready');
  assert.equal((await restored.install(version)).phase, 'installed');
});
test('tampering after download disables installation and allows a fresh download', async t => {
  const f = await fixture(t), updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: network().fetcher });
  t.after(() => updater.dispose()); await downloaded(updater);
  await writeFile(join(f.profile, 'codex-style-updates', version + '.tgz'), 'corrupt cache');
  assert.equal((await updater.install(version)).phase, 'error'); await f.unchanged();
  assert.equal((await downloaded(updater)).phase, 'ready');
});
test('incompatible release refuses installation and keeps the installed package', async t => {
  const f = await fixture(t), updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: network().fetcher, compatibility: () => { throw Error('incompatible runtime'); } });
  t.after(() => updater.dispose()); await downloaded(updater);
  const state = await updater.install(version); assert.equal(state.phase, 'ready'); assert.match(state.message, /incompatible/); await f.unchanged();
});
test('profile edit during preparation is retained and aborts installation', async t => {
  const f = await fixture(t), path = join(f.profile, 'package.json'), changed = JSON.stringify({ ...JSON.parse(f.original['package.json']), userEdit: true });
  await assert.rejects(installUpdate({ archive, version, profile: f.profile, beforeCommit: () => writeFile(path, changed) }), /配置已变化/);
  assert.equal(await readFile(path, 'utf8'), changed); assert.equal(await realpath(f.link), await realpath(f.previous));
});
test('regular npm directory can upgrade with a retained rollback target', async t => {
  const f = await fixture(t, { directory: true, withLock: false });
  const installed = await installUpdate({ archive, version, profile: f.profile });
  execFileSync(process.execPath, [installed.rollback]);
  assert.equal(await readFile(join(f.link, 'client-old.js'), 'utf8'), 'old theme bytes');
  assert.equal(await readFile(join(f.profile, 'package.json'), 'utf8'), f.original['package.json']);
});
test('tar path traversal is rejected even when the download digest is valid', async t => {
  const f = await fixture(t), tar = gunzipSync(archive);
  tar.fill(0, 0, 100); tar.write('package/../escape.txt', 0); tar.fill(32, 148, 156);
  const checksum = tar.subarray(0, 512).reduce((total, byte) => total + byte, 0);
  tar.write(checksum.toString(8).padStart(6, '0') + '\0 ', 148);
  await assert.rejects(installUpdate({ archive: gzipSync(tar), version, profile: f.profile }), /路径无效/);
  await f.unchanged(); await assert.rejects(lstat(join(f.root, 'dsh-codex-style/escape.txt')), { code: 'ENOENT' });
});
test('same or older versions cannot start a download', async t => {
  const f = await fixture(t), updater = new PluginUpdater({ profile: f.profile, currentVersion: version, fetcher: network().fetcher });
  t.after(() => updater.dispose()); await assert.rejects(updater.download(version), /不高于/); await assert.rejects(updater.download('0.1.4'), /不高于/); await f.unchanged();
});

test('host check selects the newest source and reuses its metadata for download', async t => {
  const f = await fixture(t), net = network();
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: async (url, options) => {
    if (url.endsWith('/latest') && url.includes('npmmirror')) {
      net.calls.push(url); return new Response(JSON.stringify({ name: UPDATE_PACKAGE, version: previousVersion }));
    }
    return net.fetcher(url, options);
  } });
  t.after(() => updater.dispose());
  const result = await updater.check();
  assert.equal(result.state, 'update'); assert.equal(result.latestVersion, version); assert.equal(result.mirror, false);
  assert.equal((await downloaded(updater)).phase, 'ready');
  assert.equal(net.calls.filter(url => !url.endsWith('.tgz')).length, 3, 'download should reuse checked metadata instead of querying the version again');
  await f.unchanged();
});

for (const mode of ['offline', 'missing', 'wrongIdentity']) test(`host check reports ${mode} without claiming current`, async t => {
  const f = await fixture(t);
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: mode === 'missing' ? async () => new Response('', { status: 404 }) : network({ [mode]: true }).fetcher });
  t.after(() => updater.dispose());
  assert.equal((await updater.check()).state, mode === 'missing' ? 'unpublished' : 'error');
  assert.equal((await updater.status()).phase, 'idle'); await f.unchanged();
});

test('host rejects malformed prerelease versions before requesting a package', async t => {
  const f = await fixture(t), net = network();
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: net.fetcher });
  t.after(async () => { updater.dispose(); await updater.pending; });
  for (const candidate of ['0.1.7-01', '0.1.7-a..b']) await assert.rejects(updater.download(candidate), /版本/);
  assert.equal(net.calls.length, 0);
});

test('a different requested version cannot reuse the checked release metadata', async t => {
  const f = await fixture(t), net = network();
  const requestedVersion = `${version}-metadata-mismatch`;
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: net.fetcher });
  t.after(() => updater.dispose()); await updater.check();
  await updater.download(requestedVersion); await updater.pending;
  assert.equal((await updater.status()).phase, 'error');
  assert.equal(net.calls.filter(url => url.endsWith(`/${requestedVersion}`)).length, 3);
  assert.equal(net.calls.some(url => url.endsWith('.tgz')), false); await f.unchanged();
});

test('disposing the host cancels an in-flight metadata check', async t => {
  const f = await fixture(t); let aborted = 0;
  const updater = new PluginUpdater({ profile: f.profile, currentVersion: previousVersion, fetcher: (_url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => { aborted++; reject(signal.reason); }, { once: true });
  }) });
  const checking = updater.check(); updater.dispose();
  await assert.rejects(checking); assert.equal(aborted, 3); await f.unchanged();
});
