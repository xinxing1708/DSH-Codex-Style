import { readFile, writeFile, mkdir, realpath, lstat, rename, unlink, symlink, copyFile } from 'node:fs/promises';
import { dirname, join, resolve, relative, isAbsolute } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { gunzipSync } from 'node:zlib';

import { UPDATE_PACKAGE } from './update-common.js';
export { UPDATE_PACKAGE };
export const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const optional = async path => { try { return await readFile(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } };
async function atomicWrite(path, bytes) {
  const temporary = path + '.' + randomUUID() + '.tmp';
  await writeFile(temporary, bytes);
  await rename(temporary, path);
}

// npm tarball 只解出普通文件和目录；不执行包脚本，也不接受可跳出目标目录的链接。
export async function extractUpdate(archive, directory) {
  const tar = gunzipSync(archive, { maxOutputLength: 64 * 1024 * 1024 });
  const seen = new Set();
  let pax = {};
  for (let offset = 0; offset + 512 <= tar.length;) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every(byte => byte === 0)) break;
    const string = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '');
    const size = parseInt(string(124, 12).trim() || '0', 8);
    const checksum = parseInt(string(148, 8).trim(), 8);
    const sum = header.reduce((total, byte, i) => total + (i >= 148 && i < 156 ? 32 : byte), 0);
    if (!Number.isSafeInteger(size) || size < 0 || checksum !== sum || offset + 512 + size > tar.length) throw new Error('更新包的归档格式无效。');
    const bytes = tar.subarray(offset + 512, offset + 512 + size);
    offset += 512 + Math.ceil(size / 512) * 512;
    const type = string(156, 1);
    if (type === 'x') {
      pax = {};
      for (let i = 0; i < bytes.length;) {
        const space = bytes.indexOf(32, i), length = Number(bytes.subarray(i, space).toString());
        if (space < i || !Number.isInteger(length) || length <= space - i + 1 || i + length > bytes.length) throw new Error('更新包的扩展文件名无效。');
        const row = bytes.subarray(space + 1, i + length - 1).toString(), equal = row.indexOf('=');
        if (equal > 0) pax[row.slice(0, equal)] = row.slice(equal + 1);
        i += length;
      }
      continue;
    }
    const name = pax.path || [string(345, 155), string(0, 100)].filter(Boolean).join('/');
    pax = {};
    if (!['', '0', '5'].includes(type) || !name.startsWith('package/')) throw new Error('更新包包含不支持的归档条目。');
    const filename = name.slice(8).replace(/\/$/, '');
    if (!filename && type === '5') continue;
    if (!filename || filename.includes('\\') || filename.includes(':') || filename.split('/').some(part => !part || part === '.' || part === '..')) throw new Error('更新包文件路径无效。');
    const path = resolve(directory, filename), inside = relative(directory, path);
    if (inside.startsWith('..') || isAbsolute(inside) || seen.has(filename.toLowerCase())) throw new Error('更新包文件路径重复或越界。');
    seen.add(filename.toLowerCase());
    if (type === '5') await mkdir(path, { recursive: true });
    else { await mkdir(dirname(path), { recursive: true }); await writeFile(path, bytes, { flag: 'wx' }); }
  }
  return JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'));
}

// 同包升级不重写 cordis.patch.yml，保留宿主整理后的分组格式与各可选组件的开关。
export async function installUpdate({ archive, version, profile, compatibility = () => {}, beforeCommit = async () => {} }) {
  const profileFile = join(profile, 'package.json'), lockFile = join(profile, 'pnpm-lock.yaml');
  const original = await readFile(profileFile), lock = await optional(lockFile);
  const config = JSON.parse(original);
  if (!config.dependencies?.[UPDATE_PACKAGE] || !config.dsh?.profile?.bundles?.includes(UPDATE_PACKAGE)) throw new Error('当前 profile 未安装或未启用 Codex Style。');
  const link = join(profile, 'node_modules', UPDATE_PACKAGE);
  const previous = await realpath(link), info = await lstat(link);
  if (JSON.parse(await readFile(join(previous, 'package.json'), 'utf8')).name !== UPDATE_PACKAGE) throw new Error('已安装插件的身份不匹配。');
  const stamp = version + '-update-' + randomUUID();
  const target = join(dirname(dirname(profile)), 'dsh-codex-style', stamp);
  const backup = join(dirname(dirname(profile)), 'codex-style-backups', stamp);
  await mkdir(target, { recursive: true });
  const manifest = await extractUpdate(archive, target);
  if (manifest.name !== UPDATE_PACKAGE || manifest.version !== version || !manifest.dsh?.bundle?.patch) throw new Error('更新包的名称、版本或插件声明不匹配。');
  await compatibility(manifest);
  for (const file of ['lib/host.js', 'lib/client.js', 'lib/behavior.js', 'lib/body.js', 'cordis.patch.yml', 'scripts/rollback.mjs']) await readFile(join(target, file));
  const specifier = 'link:' + relative(profile, target).replaceAll('\\', '/');
  config.dependencies[UPDATE_PACKAGE] = specifier;
  const files = [{ path: profileFile, bytes: original, next: Buffer.from(JSON.stringify(config, null, 2) + '\n') }];
  if (lock) {
    const text = lock.toString(), eol = text.includes('\r\n') ? '\r\n' : '\n';
    const entry = /^(      )(?:'@xinxing1708\/dsh-codex-style'|"@xinxing1708\/dsh-codex-style"|@xinxing1708\/dsh-codex-style):\r?\n(?:        [^\r\n]*(?:\r?\n|$))+/m;
    if (!entry.test(text)) throw new Error('未识别当前插件的锁文件条目，未更改现有安装。');
    const replacement = `      '${UPDATE_PACKAGE}':${eol}        specifier: ${specifier}${eol}        version: ${specifier}${eol}`;
    files.push({ path: lockFile, bytes: lock, next: Buffer.from(text.replace(entry, () => replacement)) });
  }
  await mkdir(backup, { recursive: true });
  for (const file of files) await writeFile(join(backup, file.path === profileFile ? 'package.json' : 'pnpm-lock.yaml'), file.bytes);
  const moved = info.isSymbolicLink() ? previous : link + '.previous-' + randomUUID();
  const receipt = { name: UPDATE_PACKAGE, version, profile, target, backup, linkPath: link, previousLinkPath: link, previousTarget: moved, files: files.map(file => ({ path: file.path, backup: join(backup, file.path === profileFile ? 'package.json' : 'pnpm-lock.yaml'), before: digest(file.bytes), after: digest(file.next) })) };
  await writeFile(join(backup, 'installation.json'), JSON.stringify(receipt, null, 2));
  await copyFile(join(target, 'scripts/rollback.mjs'), join(backup, 'rollback.mjs'));
  await beforeCommit();
  for (const file of files) if (digest(await readFile(file.path)) !== digest(file.bytes)) throw new Error('安装前配置已变化，请重试。');
  if (!lock && await optional(lockFile)) throw new Error('安装前新增了锁文件，请重试。');
  if (await realpath(link) !== previous) throw new Error('插件位置已变化，请重试。');
  let switched = false, removed = false;
  try {
    if (info.isSymbolicLink()) await unlink(link); else await rename(link, moved);
    removed = true;
    await symlink(target, link, process.platform === 'win32' ? 'junction' : 'dir');
    switched = true;
    for (const file of files) {
      if (digest(await readFile(file.path)) !== digest(file.bytes)) throw new Error('安装期间配置已变化，已停止升级。');
      await atomicWrite(file.path, file.next);
    }
  } catch (error) {
    for (const file of files) if (digest(await readFile(file.path)) === digest(file.next)) await atomicWrite(file.path, file.bytes);
    if (switched && await realpath(link) === target) await unlink(link);
    if (removed) {
      if (info.isSymbolicLink()) await symlink(previous, link, process.platform === 'win32' ? 'junction' : 'dir');
      else await rename(moved, link);
    }
    throw error;
  }
  return { version, restartRequired: true, backup, rollback: join(backup, 'rollback.mjs') };
}
