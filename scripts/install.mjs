// 安装到当前用户 desktop profile；只复制本包，旧主题保留以便回退。
import { readFile, writeFile, mkdir, copyFile, lstat, symlink, realpath, access, unlink, rename } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dshRoot = await realpath(resolve(process.env.DSH_HOME || resolve(homedir(), '.dsh')));
const profile = resolve(dshRoot, 'profiles/desktop');
const manifest = JSON.parse(await readFile(resolve(source, 'package.json'), 'utf8'));
// 安装失败只输出可读说明，不打印 Node 堆栈；失败路径在抛出前已恢复 profile。
process.on('uncaughtException', error => {
  console.error('\n安装失败：' + error.message + '\n');
  process.exit(1);
});
// 官方安装器把实际安装目录写入卸载注册表；用户改装到其他盘时只能从这里得知位置。
// 同时识别第三方整合包 DSH Desktop：它自带补丁过的内核和大量插件，本插件未适配。
// PowerShell 以 UTF-8 输出，避免 reg.exe 按控制台代码页输出导致中文路径乱码。
function registeredHosts() {
  const keys = ['HKCU:\\Software', 'HKLM:\\Software', 'HKLM:\\Software\\WOW6432Node'].map(root => `'${root}\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'`);
  const script = `[Console]::OutputEncoding=[Text.Encoding]::UTF8; Get-ItemProperty ${keys.join(',')} -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -like 'DeepSeek Harness*' -or $_.DisplayName -like 'DSH Desktop*' } | ForEach-Object { $_.DisplayName + [char]9 + $_.DisplayVersion + [char]9 + $_.InstallLocation }`;
  try {
    const output = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], { encoding: 'utf8', timeout: 20000, windowsHide: true, stdio: ['ignore', 'pipe', 'ignore'] });
    return output.split(/\r?\n/).filter(line => line.trim()).map(line => {
      const [name, version, location] = line.split('\t').map(part => (part || '').trim().replace(/^"(.*)"$/, '$1'));
      return { name, version, location, official: name.startsWith('DeepSeek Harness') };
    });
  } catch { return []; }
}
// DSH_INSTALL_DIR 显式指定官方安装目录时不查询注册表。
// DSH_CODEX_STYLE_TEST_HOSTS 仅供隔离测试注入注册表结果。
const hosts = process.env.DSH_CODEX_STYLE_TEST_HOSTS ? JSON.parse(process.env.DSH_CODEX_STYLE_TEST_HOSTS)
  : process.platform === 'win32' && process.env.DSH_INSTALL_DIR === undefined ? registeredHosts() : [];
const thirdParty = hosts.filter(host => !host.official);
const thirdPartyNote = thirdParty.map(host => `${host.name}${host.version ? ' ' + host.version : ''}`).join('、');
const runtimeIn = dir => resolve(dir, 'resources/runtime/primary-runtime/runtime.json');
// runtime.json 固定在 <安装根>/resources/runtime/primary-runtime/；据此回推安装根，写入环境标记。
function installRootOf(runtimePath) {
  const parts = resolve(runtimePath).split(/[\\/]/);
  const suffix = ['resources', 'runtime', 'primary-runtime', 'runtime.json'];
  if (parts.length > suffix.length && suffix.every((part, index) => parts[parts.length - suffix.length + index].toLowerCase() === part)) return parts.slice(0, -suffix.length).join(sep);
  return dirname(resolve(runtimePath));
}
// 官方候选优先：注册表官方主机 → 官方默认目录 → 旧版数据目录 → 注册表第三方主机。
// 每个候选项携带可核实的注册表主机身份；显式 DSH_INSTALL_DIR / DSH_RUNTIME_FILE 保持原有语义。
const officialHosts = hosts.filter(host => host.official && host.location);
const communityHosts = thirdParty.filter(host => host.location);
const officialDefaultRoots = process.platform === 'win32' ? [
  resolve(process.env.LOCALAPPDATA || resolve(homedir(), 'AppData/Local'), 'Programs/DeepSeek Harness'),
  ...(process.env.ProgramFiles ? [resolve(process.env.ProgramFiles, 'DeepSeek Harness')] : [])
] : [];
const runtimeCandidates = [];
const addRuntimeCandidate = (path, host) => {
  const candidate = resolve(path);
  if (!runtimeCandidates.some(entry => entry.path === candidate)) runtimeCandidates.push({ path: candidate, host });
};
const syntheticHost = (root, official) => ({ name: 'DeepSeek Harness', version: null, location: root, official });
if (process.env.DSH_RUNTIME_FILE) addRuntimeCandidate(process.env.DSH_RUNTIME_FILE);
else {
  if (process.platform === 'win32') {
    if (process.env.DSH_INSTALL_DIR !== undefined) {
      if (process.env.DSH_INSTALL_DIR) addRuntimeCandidate(runtimeIn(process.env.DSH_INSTALL_DIR), syntheticHost(resolve(process.env.DSH_INSTALL_DIR), true));
    } else for (const host of officialHosts) addRuntimeCandidate(runtimeIn(host.location), host);
    for (const root of officialDefaultRoots) addRuntimeCandidate(runtimeIn(root), syntheticHost(root, true));
  }
  addRuntimeCandidate(resolve(dshRoot, 'dsh-runtimes/dsh-primary-runtime/runtime.json'), syntheticHost(null, true));
  if (process.platform === 'win32') for (const host of communityHosts) addRuntimeCandidate(runtimeIn(host.location), host);
}
let runtime;
let runtimePath;
let selectedHost;
for (const candidate of runtimeCandidates) {
  try { runtime = JSON.parse(await readFile(candidate.path, 'utf8')); runtimePath = candidate.path; selectedHost = candidate.host; break; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
const supportedVersions = manifest.engines.dsh.split(/\s*\|\|\s*/);
const supportedNote = `本插件 ${manifest.version} 只适配 DeepSeek 官方桌面版 DeepSeek Harness ${supportedVersions.join(' / ')}。`;
if (!runtime) {
  const communityNote = thirdParty.length ? `\n注册表检测到 ${thirdPartyNote}，但其安装目录中没有可读的 DSH runtime.json。` : '';
  throw new Error('未找到 DSH runtime.json。已查找：\n  ' + runtimeCandidates.map(candidate => candidate.path).join('\n  ') + communityNote + '\nDSH 装在其他目录时，请先执行 set DSH_INSTALL_DIR=<DSH 安装目录>（含 "DeepSeek Harness.exe" 的文件夹），再运行 install.cmd。');
}
// 与宿主读取同一根级字段；当前范围只列已核对的精确版本，不实现通用 SemVer 解析。
if (!supportedVersions.includes(runtime.desktopVersion)) throw new Error(`DSH 版本不匹配：检测到 ${runtime.desktopVersion}（${runtimePath}）。\n${supportedNote}\n版本不同时界面结构可能已改变，强行安装会导致界面错乱，所以未作任何修改。请换用支持的 DSH 版本，或等待本插件发布适配新版本的更新。`);
// 安装目标身份：注册表/默认目录/旧目录可知官方性；显式 runtime 文件没有可核实宿主身份，不臆测。
const selectedOfficial = selectedHost ? selectedHost.official === true : null;
const installRoot = selectedHost?.location ? resolve(selectedHost.location) : installRootOf(runtimePath);
const installEnvironmentPath = resolve(dshRoot, 'dsh-codex-style', 'install-environment.json');
const installEnvironment = {
  schemaVersion: 1,
  writtenAt: new Date().toISOString(),
  pluginVersion: manifest.version,
  target: { name: selectedHost?.name ?? null, official: selectedOfficial, installRoot, runtimePath, desktopVersion: runtime.desktopVersion },
  communityHosts: communityHosts.map(host => ({ name: host.name, version: host.version || null, installRoot: resolve(host.location) }))
};
// 仅社区版目标：中文可读警告后继续安装；官方目标不输出该警告。
if (selectedOfficial === false) {
  const edition = `${selectedHost.name}${selectedHost.version ? ' ' + selectedHost.version : ''}`;
  console.log(`检测到的不是 DeepSeek 官方版，而是社区版 ${edition}。本插件针对官方 DeepSeek Harness，效果可能一般；将继续安装，社区版自带改过的内核和界面插件，装上后界面可能错乱。`);
}
// 官方版与第三方整合包同时存在时，两者可能共用 ~/.dsh 下的 profile；第三方宿主加载后会界面错乱，需用户确认。
// 已明确选择社区目标时，上一条警告已说明风险，不再要求确认。
if (thirdParty.length && selectedOfficial !== false && process.env.DSH_CODEX_STYLE_ALLOW_THIRD_PARTY !== '1') {
  const warning = `\n注意：本机还装有 ${thirdPartyNote}。\n${supportedNote}\n如果 DSH Desktop 与官方版共用同一个 desktop 配置，DSH Desktop 也会加载本插件，界面会错乱。\n`;
  if (!process.stdin.isTTY) throw new Error(warning.trim() + '\n确认只在官方 DeepSeek Harness 中使用时，设置 DSH_CODEX_STYLE_ALLOW_THIRD_PARTY=1 后重新运行。');
  const { createInterface } = await import('node:readline/promises');
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await prompt.question(warning + '仍要安装到官方 DeepSeek Harness 吗？输入 y 继续，其他键取消：');
  prompt.close();
  if (answer.trim().toLowerCase() !== 'y') throw new Error('已取消，未作任何修改。');
}
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
await access(resolve(source, 'lib/community-environment.js'));
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
for (const file of ['package.json', 'cordis.patch.yml', 'skin.json', 'README.md', 'LICENSE', 'CHANGELOG.md', 'THIRD_PARTY_NOTICES.md', 'licenses/DeepSeek-Harness-LICENSE', 'lib/client.js', 'lib/host.js', 'lib/skills-host.js', 'lib/community-environment.js', 'lib/behavior.js', 'lib/body.js', 'lib/header.js', 'lib/navigation.js', 'lib/image-annotations.js', 'lib/image-annotations-host.js', 'lib/updater.js', 'lib/update-common.js', 'lib/update-install.js', 'scripts/rollback.mjs', 'prompts/work-guidelines.md', 'locale/behavior/en.json', 'locale/behavior/zh.json', 'locale/body/en.json', 'locale/body/zh.json', 'locale/header/en.json', 'locale/header/zh.json', 'locale/navigation/en.json', 'locale/navigation/zh.json', 'locale/image-annotations/en.json', 'locale/image-annotations/zh.json']) {
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
// 环境事实与 profile 分离；写入失败只提示，不推翻已完成的安装。
try {
  const temporary = installEnvironmentPath + '.' + process.pid + '.tmp';
  await writeFile(temporary, JSON.stringify(installEnvironment, null, 2) + '\n');
  await rename(temporary, installEnvironmentPath);
} catch (error) {
  console.error('\n环境标记写入失败，本次运行不会显示社区版提醒：' + error.message + '\n');
}
console.log(JSON.stringify({ installed: true, name: manifest.name, version: manifest.version, runtimeVersion: runtime.desktopVersion, runtimePath, target, profile, backup, rollback: resolve(backup, 'rollback.mjs'), clientHash: receipt.clientHash, restartRequired: true }, null, 2));
