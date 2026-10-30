import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import {
  INSTALL_ENVIRONMENT_DIRECTORY,
  INSTALL_ENVIRONMENT_FILENAME,
  isPathInside,
  isCommunityInstall,
  loadInstallEnvironment,
  classifyRunningEnvironment
} from '../src/community-environment.mjs';

// 安装根 fixture：不依赖真实 DSH，只验证路径归属与标记容错。
const root = resolve('environment-fixture');
const otherRoot = root + '-other';
const anchorUnder = path => join(path, 'resources', 'app.asar', 'dsh', 'node_modules', '@deepseek-ai', 'dsh', 'package.json');
const marker = ({ official, installRoot = root, community = [] }) => ({
  schemaVersion: 1,
  writtenAt: '2026-10-28T00:00:00.000Z',
  pluginVersion: '0.2.1',
  target: { name: official === false ? 'DSH Desktop' : 'DeepSeek Harness', official, installRoot, runtimePath: join(installRoot, 'resources/runtime/primary-runtime/runtime.json'), desktopVersion: '0.2.1-rc.3' },
  communityHosts: community.map(installRoot => ({ name: 'DSH Desktop', version: '1.0.6', installRoot }))
});

async function home(t, environment) {
  const directory = await mkdtemp(join(tmpdir(), 'dsh-codex-environment-'));
  t.after(async () => { assert.ok(directory.startsWith(join(tmpdir(), 'dsh-codex-environment-'))); await rm(directory, { recursive: true, force: true }); });
  if (environment !== undefined) {
    await mkdir(join(directory, INSTALL_ENVIRONMENT_DIRECTORY), { recursive: true });
    await writeFile(join(directory, INSTALL_ENVIRONMENT_DIRECTORY, INSTALL_ENVIRONMENT_FILENAME), typeof environment === 'string' ? environment : JSON.stringify(environment));
  }
  return directory;
}

test('path containment rejects siblings, prefixes and the root itself', () => {
  assert.equal(isPathInside(join(root, 'resources', 'x'), root), true);
  assert.equal(isPathInside(join(otherRoot, 'resources', 'x'), root), false);
  assert.equal(isPathInside(root, root), false);
  assert.equal(isPathInside(resolve(root, '..'), root), false);
  assert.equal(isPathInside('', root), false);
  assert.equal(isPathInside(anchorUnder(otherRoot), root), false);
});

test('Windows paths compare case-insensitively', { skip: process.platform !== 'win32' }, () => {
  assert.equal(isPathInside(anchorUnder(root).toUpperCase(), root.toLowerCase()), true);
});

test('community target and listed community hosts are recognized, official target is not', () => {
  const communityMarker = marker({ official: false });
  assert.equal(isCommunityInstall(anchorUnder(root), communityMarker), true);
  assert.equal(isCommunityInstall(anchorUnder(otherRoot), communityMarker), false);
  const officialMarker = marker({ official: true, community: [otherRoot] });
  assert.equal(isCommunityInstall(anchorUnder(root), officialMarker), false);
  assert.equal(isCommunityInstall(anchorUnder(otherRoot), officialMarker), true);
});

test('unknown target identity is fail closed instead of community', () => {
  const unknown = marker({ official: null });
  assert.equal(isCommunityInstall(anchorUnder(root), unknown), false);
  assert.equal(isCommunityInstall(anchorUnder(root), marker({ official: true })), false);
  assert.equal(isCommunityInstall(anchorUnder(root), null), false);
  assert.equal(isCommunityInstall('', marker({ official: false })), false);
});

test('missing marker is a normal non-community environment', async t => {
  const directory = await home(t);
  assert.deepEqual(loadInstallEnvironment(directory), { marker: null });
  assert.deepEqual(classifyRunningEnvironment({ home: directory, installAnchor: anchorUnder(root) }), { community: false });
});

test('invalid or unreadable markers warn and stay non-community', async t => {
  const broken = await home(t, '{"schemaVersion":1,');
  const brokenMarker = loadInstallEnvironment(broken);
  assert.equal(brokenMarker.marker, null);
  assert.match(brokenMarker.warning, /不是有效 JSON/);
  assert.equal(classifyRunningEnvironment({ home: broken, installAnchor: anchorUnder(root) }).community, false);

  const wrongSchema = await home(t, JSON.stringify({ ...marker({ official: false }), schemaVersion: 2 }));
  assert.match(loadInstallEnvironment(wrongSchema).warning, /结构无效/);

  const missingTarget = await home(t, JSON.stringify({ schemaVersion: 1, communityHosts: [] }));
  assert.match(loadInstallEnvironment(missingTarget).warning, /结构无效/);

  const badCommunity = await home(t, JSON.stringify({ ...marker({ official: true }), communityHosts: [{ name: 'DSH Desktop' }] }));
  assert.match(loadInstallEnvironment(badCommunity).warning, /结构无效/);

  const noHome = loadInstallEnvironment('');
  assert.equal(noHome.marker, null);
  assert.match(noHome.warning, /缺少 DSH home/);
});

test('valid community marker drives classification through the DSH home', async t => {
  const directory = await home(t, marker({ official: false }));
  assert.equal(classifyRunningEnvironment({ home: directory, installAnchor: anchorUnder(root) }).community, true);
  assert.equal(classifyRunningEnvironment({ home: directory, installAnchor: anchorUnder(otherRoot) }).community, false);
});
