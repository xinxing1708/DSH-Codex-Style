// 安装到当前用户 desktop profile；只复制本包，旧主题保留以便回退。
import { readFile, writeFile, mkdir, copyFile, lstat, symlink, realpath, access, unlink } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dshRoot = resolve(process.env.DSH_HOME || resolve(homedir(), '.dsh'));
const profile = resolve(dshRoot, 'profiles/desktop');
const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
const runtime = JSON.parse(await readFile(resolve(dshRoot, 'dsh-runtimes/dsh-primary-runtime/runtime.json'), 'utf8'));
if (runtime.desktopVersion !== manifest.dsh.engines.dsh) throw new Error(`DSH 版本不匹配：${runtime.desktopVersion}`);
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const target = resolve(dshRoot, 'dsh-codex-style', manifest.version + '-' + stamp);
const backup = resolve(dshRoot, 'codex-style-backups', stamp);
const packagePath = resolve(profile, 'package.json');
const patchPath = resolve(profile, 'cordis.patch.yml');
const lockPath = resolve(profile, 'pnpm-lock.yaml');
const linkPath = resolve(profile, 'node_modules', manifest.name);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const originals = await Promise.all([packagePath, patchPath, lockPath].map(async path => ({ path, bytes: await readFile(path) })));
const config = JSON.parse(originals[0].bytes.toString());
const previousDependency = config.dependencies?.[manifest.name];
let previousTarget;
const previousLink = await lstat(linkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; });
if (previousDependency) {
  if (!previousDependency.startsWith('link:') || !previousLink?.isSymbolicLink()) throw new Error('同名安装不是本插件的本地链接，请人工核对。');
  previousTarget = await realpath(linkPath);
  const managedRelative = relative(resolve(dshRoot, 'dsh-codex-style'), previousTarget);
  if (!managedRelative || managedRelative.startsWith('..') || resolve(profile, previousDependency.slice(5)) !== resolve(previousTarget)) throw new Error('现有插件链接不在受管理目录，停止升级。');
  const previousManifest = JSON.parse(await readFile(resolve(previousTarget, 'package.json'), 'utf8'));
  if (previousManifest.name !== manifest.name) throw new Error('旧插件身份不匹配');
} else if (previousLink) throw new Error('node_modules 中已存在同名路径，停止以免覆盖。');
await access(resolve(source, 'lib/client.js'));
await access(resolve(source, 'lib/host.js'));
await mkdir(backup, { recursive: true });
for (const entry of originals) await writeFile(resolve(backup, entry.path.split(/[\\/]/).pop()), entry.bytes);
await mkdir(resolve(target, 'lib'), { recursive: true });
await mkdir(resolve(target, 'licenses'), { recursive: true });
for (const file of ['package.json', 'cordis.patch.yml', 'skin.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'THIRD_PARTY_NOTICES.md', 'licenses/DeepSeek-Harness-LICENSE', 'lib/client.js', 'lib/host.js']) await copyFile(resolve(source, file), resolve(target, file));

const localLink = 'link:' + relative(profile, target).replaceAll('\\', '/');
config.dependencies[manifest.name] = localLink;
const oldSkins = new Set(['dsh-claude-style', '@michengai/dsh-codex-ui']);
config.dsh.profile.bundles = config.dsh.profile.bundles.filter(name => !oldSkins.has(name) && name !== manifest.name);
config.dsh.profile.bundles.push(manifest.name);
const eol = originals[1].bytes.includes(Buffer.from('\r\n')) ? '\r\n' : '\n';
const patch = previousTarget ? originals[1].bytes.toString() : originals[1].bytes.toString() + eol + [
  '# Codex Style：旧主题依赖保留，仅停用其界面行。',
  '- id: ui-skin-claude-style',
  '  disabled: true',
  '- id: ui-skin-codex-style',
  '  name: dsh-codex-style',
  '  disabled: false',
  ''
].join(eol);
const lockBefore = originals[2].bytes.toString();
const header = /(importers:\r?\n\r?\n  \.:\r?\n    dependencies:\r?\n)/;
if (!header.test(lockBefore)) throw new Error('未识别 desktop 锁文件结构；备份已保留，未改 profile。');
const lockEntry = `      dsh-codex-style:${eol}        specifier: ${localLink}${eol}        version: ${localLink}${eol}`;
const previousLockEntry = /^      dsh-codex-style:\r?\n        specifier: [^\r\n]+\r?\n        version: [^\r\n]+(?:\r?\n|$)/m;
if (previousTarget && !previousLockEntry.test(lockBefore)) throw new Error('未识别旧插件锁文件条目；未改 profile。');
const lockFinal = previousTarget ? lockBefore.replace(previousLockEntry, () => lockEntry) : lockBefore.replace(header, match => match + lockEntry);
const outputs = [Buffer.from(JSON.stringify(config, null, 2) + '\n'), Buffer.from(patch), Buffer.from(lockFinal)];
const receipt = { name: manifest.name, version: manifest.version, target, previousTarget, linkPath, profile, backup, files: originals.map((entry, index) => ({ path: entry.path, backup: resolve(backup, entry.path.split(/[\\/]/).pop()), before: hash(entry.bytes), after: hash(outputs[index]) })), clientHash: hash(await readFile(resolve(target, 'lib/client.js'))) };
await writeFile(resolve(backup, 'installation.json'), JSON.stringify(receipt, null, 2) + '\n');
await copyFile(resolve(source, 'scripts/rollback.mjs'), resolve(backup, 'rollback.mjs'));
try {
  for (const entry of receipt.files) if (hash(await readFile(entry.path)) !== entry.before) throw new Error('安装前配置发生更改，停止：' + entry.path);
  if (previousTarget) await unlink(linkPath);
  await symlink(target, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  for (let i = 0; i < originals.length; i++) {
    if (hash(await readFile(originals[i].path)) !== receipt.files[i].before) throw new Error('安装期间配置发生更改，停止以保留新内容：' + originals[i].path);
    await writeFile(originals[i].path, outputs[i]);
  }
} catch (error) {
  // 仅恢复仍保持为本次写入内容的文件，避免覆盖同时发生的人工更改。
  for (const entry of receipt.files) if (hash(await readFile(entry.path)) === entry.after) await copyFile(entry.backup, entry.path);
  const linked = await realpath(linkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; });
  if (linked && resolve(linked) === target) await unlink(linkPath);
  if (previousTarget && !(await lstat(linkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; }))) await symlink(previousTarget, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  throw error;
}
const installed = await realpath(linkPath);
if (resolve(installed) !== target) throw new Error('插件链接目标不匹配');
console.log(JSON.stringify({ installed: true, name: manifest.name, version: manifest.version, target, profile, backup, rollback: resolve(backup, 'rollback.mjs'), clientHash: receipt.clientHash, restartRequired: true }, null, 2));
