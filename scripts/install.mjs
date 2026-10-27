// 安装到当前用户 desktop profile；只复制本包，旧主题保留以便回退。
import { readFile, writeFile, mkdir, copyFile, lstat, symlink, realpath, access, unlink } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dshRoot = await realpath(resolve(process.env.DSH_HOME || resolve(homedir(), '.dsh')));
const profile = resolve(dshRoot, 'profiles/desktop');
const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
// 自定义安装可显式指定 runtime.json；自动发现同时兼容旧版数据目录和官方 Windows 安装器。
const runtimeCandidates = process.env.DSH_RUNTIME_FILE ? [resolve(process.env.DSH_RUNTIME_FILE)] : [
  ...(process.platform === 'win32' ? [
    resolve(process.env.LOCALAPPDATA || resolve(homedir(), 'AppData/Local'), 'Programs/DeepSeek Harness/resources/runtime/primary-runtime/runtime.json'),
    ...(process.env.ProgramFiles ? [resolve(process.env.ProgramFiles, 'DeepSeek Harness/resources/runtime/primary-runtime/runtime.json')] : [])
  ] : []),
  resolve(dshRoot, 'dsh-runtimes/dsh-primary-runtime/runtime.json')
];
let runtime;
let runtimePath;
for (const candidate of runtimeCandidates) {
  try { runtime = JSON.parse(await readFile(candidate, 'utf8')); runtimePath = candidate; break; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
if (!runtime) throw new Error('未找到 DSH runtime.json；自定义安装请设置 DSH_RUNTIME_FILE 为现有 runtime.json 的完整路径。');
// 与宿主读取同一根级字段；当前范围只列已核对的精确版本，不实现通用 SemVer 解析。
const supportedVersions = manifest.engines.dsh.split(/\s*\|\|\s*/);
if (!supportedVersions.includes(runtime.desktopVersion)) throw new Error(`DSH 版本不匹配：${runtime.desktopVersion}；支持 ${manifest.engines.dsh}`);
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const target = resolve(dshRoot, 'dsh-codex-style', manifest.version + '-' + stamp);
const backup = resolve(dshRoot, 'codex-style-backups', stamp);
const packagePath = resolve(profile, 'package.json');
const patchPath = resolve(profile, 'cordis.patch.yml');
const lockPath = resolve(profile, 'pnpm-lock.yaml');
const linkPath = resolve(profile, 'node_modules', manifest.name);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const originals = await Promise.all([packagePath, patchPath].map(async path => ({ path, bytes: await readFile(path) })));
// 官方 Desktop 的外部插件 profile 可能没有锁文件；保留缺失状态，不伪造锁文件。
try { originals.push({ path: lockPath, bytes: await readFile(lockPath) }); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const config = JSON.parse(originals[0].bytes.toString());
config.dependencies ??= {};
if (!Array.isArray(config.dsh?.profile?.bundles)) throw new Error('未识别 desktop profile 的插件列表；未改 profile。');
const legacyName = 'dsh-codex-style';
let previousTarget;
let previousName;
let previousLinkPath;
// 仅迁移本安装器管理的旧包；npm 上的同名第三方包不能按版本号认领。
for (const name of new Set([manifest.name, legacyName])) {
  const candidatePath = resolve(profile, 'node_modules', name);
  const previousDependency = config.dependencies?.[name];
  const previousLink = await lstat(candidatePath).catch(e => { if (e.code === 'ENOENT') return null; throw e; });
  if (!previousDependency && !previousLink) continue;
  if (!previousDependency) throw new Error('node_modules 中已存在同名路径，停止以免覆盖：' + name);
  if (!previousDependency.startsWith('link:') || !previousLink?.isSymbolicLink()) throw new Error('同名安装不是本插件的本地链接，请人工核对。');
  const candidateTarget = await realpath(candidatePath);
  const managedRelative = relative(resolve(dshRoot, 'dsh-codex-style'), candidateTarget);
  if (!managedRelative || managedRelative.startsWith('..') || isAbsolute(managedRelative) || resolve(profile, previousDependency.slice(5)) !== resolve(candidateTarget)) throw new Error('现有插件链接不在受管理目录，停止升级。');
  const previousManifest = JSON.parse(await readFile(resolve(candidateTarget, 'package.json'), 'utf8'));
  if (previousManifest.name !== name) throw new Error('旧插件身份不匹配');
  if (previousTarget) throw new Error('新旧包同时存在，请先核对安装来源。');
  previousTarget = candidateTarget;
  previousName = name;
  previousLinkPath = candidatePath;
}
await access(resolve(source, 'lib/client.js'));
await access(resolve(source, 'lib/host.js'));
await access(resolve(source, 'lib/skills-host.js'));
await access(resolve(source, 'lib/behavior.js'));
await access(resolve(source, 'lib/body.js'));
await access(resolve(source, 'lib/header.js'));
await access(resolve(source, 'lib/navigation.js'));
await access(resolve(source, 'lib/image-annotations.js'));
await access(resolve(source, 'lib/image-annotations-host.js'));
await access(resolve(source, 'lib/updater.js'));
await access(resolve(source, 'lib/update-common.js'));
await access(resolve(source, 'lib/update-install.js'));
await mkdir(backup, { recursive: true });
for (const entry of originals) await writeFile(resolve(backup, entry.path.split(/[\\/]/).pop()), entry.bytes);
await mkdir(resolve(target, 'lib'), { recursive: true });
await mkdir(resolve(target, 'licenses'), { recursive: true });
for (const file of ['package.json', 'cordis.patch.yml', 'skin.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'THIRD_PARTY_NOTICES.md', 'licenses/DeepSeek-Harness-LICENSE', 'lib/client.js', 'lib/host.js', 'lib/skills-host.js', 'lib/behavior.js', 'lib/body.js', 'lib/header.js', 'lib/navigation.js', 'lib/image-annotations.js', 'lib/image-annotations-host.js', 'lib/updater.js', 'lib/update-common.js', 'lib/update-install.js', 'scripts/rollback.mjs', 'prompts/work-guidelines.md', 'locale/behavior/en.json', 'locale/behavior/zh.json', 'locale/body/en.json', 'locale/body/zh.json', 'locale/header/en.json', 'locale/header/zh.json', 'locale/navigation/en.json', 'locale/navigation/zh.json', 'locale/image-annotations/en.json', 'locale/image-annotations/zh.json']) {
  await mkdir(dirname(resolve(target, file)), { recursive: true });
  await copyFile(resolve(source, file), resolve(target, file));
}

const localLink = 'link:' + relative(profile, target).replaceAll('\\', '/');
if (previousName && previousName !== manifest.name) delete config.dependencies[previousName];
config.dependencies[manifest.name] = localLink;
const oldSkins = new Set(['dsh-claude-style', '@michengai/dsh-codex-ui']);
config.dsh.profile.bundles = config.dsh.profile.bundles.filter(name => !oldSkins.has(name) && name !== manifest.name && name !== previousName);
config.dsh.profile.bundles.push(manifest.name);
const eol = originals[1].bytes.includes(Buffer.from('\r\n')) ? '\r\n' : '\n';
const patchBefore = originals[1].bytes.toString();
// 默认空列表不能再拼接第二个 YAML 根节点；只移除空列表本身，保留注释和换行。
const emptyPatch = /^\[\s*\]$/.test(patchBefore.replace(/#[^\r\n]*/g, '').trim());
const patchPrefix = emptyPatch ? patchBefore.replace(/^[^#\r\n]+/gm, text => text.replace(/[\[\]]/g, '')) : patchBefore;
const ownBlock = /^- id: ui-skin-codex-style\r?\n(?:[ \t]+[^\r\n]*(?:\r?\n|$))*/gm;
const ownBlocks = [...patchBefore.matchAll(ownBlock)];
if (ownBlocks.length > 1 || (previousTarget && ownBlocks.length !== 1)) throw new Error('未识别唯一的皮肤配置行；未改 profile。');
const patch = ownBlocks.length ? patchBefore.replace(ownBlock, block => {
  const nameLine = /^  name: (.+)$/m;
  const oldName = block.match(nameLine)?.[1].trim().replace(/^(['"])(.*)\1$/, '$2');
  if (oldName !== manifest.name && oldName !== previousName) throw new Error('皮肤配置指向其他包，未改 profile。');
  return block.replace(nameLine, () => '  name: ' + JSON.stringify(manifest.name));
}) : patchPrefix + eol + [
  '# Codex Style：旧主题依赖保留，仅停用其界面行。',
  '- id: ui-skin-claude-style',
  '  disabled: true',
  '- id: ui-skin-codex-style',
  '  name: ' + JSON.stringify(manifest.name),
  '  disabled: false',
  ''
].join(eol);
const outputs = [Buffer.from(JSON.stringify(config, null, 2) + '\n'), Buffer.from(patch)];
if (originals[2]) {
const lockBefore = originals[2].bytes.toString();
const header = /(importers:\r?\n\r?\n  \.:\r?\n    dependencies:\r?\n)/;
if (!header.test(lockBefore)) throw new Error('未识别 desktop 锁文件结构；备份已保留，未改 profile。');
const lockEntry = `      '${manifest.name}':${eol}        specifier: ${localLink}${eol}        version: ${localLink}${eol}`;
const escapedPreviousName = (previousName || manifest.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const previousLockEntry = new RegExp(`^      (?:'${escapedPreviousName}'|"${escapedPreviousName}"|${escapedPreviousName}):\\r?\\n        specifier: [^\\r\\n]+\\r?\\n        version: [^\\r\\n]+(?:\\r?\\n|$)`, 'm');
if (previousTarget && !previousLockEntry.test(lockBefore)) throw new Error('未识别旧插件锁文件条目；未改 profile。');
const lockFinal = previousTarget ? lockBefore.replace(previousLockEntry, () => lockEntry) : lockBefore.replace(header, match => match + lockEntry);
outputs.push(Buffer.from(lockFinal));
}
const receipt = { name: manifest.name, version: manifest.version, runtimeVersion: runtime.desktopVersion, runtimePath, target, previousTarget, previousName, previousLinkPath, linkPath, profile, backup, files: originals.map((entry, index) => ({ path: entry.path, backup: resolve(backup, entry.path.split(/[\\/]/).pop()), before: hash(entry.bytes), after: hash(outputs[index]) })), clientHash: hash(await readFile(resolve(target, 'lib/client.js'))) };
await writeFile(resolve(backup, 'installation.json'), JSON.stringify(receipt, null, 2) + '\n');
await copyFile(resolve(source, 'scripts/rollback.mjs'), resolve(backup, 'rollback.mjs'));
try {
  if (!originals[2] && await lstat(lockPath).catch(error => { if (error.code === 'ENOENT') return null; throw error; })) throw new Error('安装前新增了锁文件，请重试；未改 profile。');
  for (const entry of receipt.files) if (hash(await readFile(entry.path)) !== entry.before) throw new Error('安装前配置发生更改，停止：' + entry.path);
  await mkdir(dirname(linkPath), { recursive: true });
  if (previousTarget) await unlink(previousLinkPath);
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
  if (previousTarget && !(await lstat(previousLinkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; }))) await symlink(previousTarget, previousLinkPath, process.platform === 'win32' ? 'junction' : 'dir');
  throw error;
}
const installed = await realpath(linkPath);
if (resolve(installed) !== target) throw new Error('插件链接目标不匹配');
console.log(JSON.stringify({ installed: true, name: manifest.name, version: manifest.version, runtimeVersion: runtime.desktopVersion, runtimePath, target, profile, backup, rollback: resolve(backup, 'rollback.mjs'), clientHash: receipt.clientHash, restartRequired: true }, null, 2));
