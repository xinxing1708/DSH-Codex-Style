// 只在安装后未发生其它配置修改时恢复备份；不删除旧主题或用户数据。
import { readFile, copyFile, realpath, lstat, unlink, symlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const receipt = JSON.parse(await readFile(resolve(dirname(fileURLToPath(import.meta.url)), 'installation.json'), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
for (const entry of receipt.files) {
  const current = hash(await readFile(entry.path));
  if (current !== entry.after && current !== entry.before) throw new Error('安装后配置已有更新，请手动合并备份，停止覆盖：' + entry.path);
  if (hash(await readFile(entry.backup)) !== entry.before) throw new Error('备份摘要不匹配：' + entry.backup);
}
const linkInfo = await lstat(receipt.linkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; });
if (linkInfo && (!linkInfo.isSymbolicLink() || resolve(await realpath(receipt.linkPath)) !== resolve(receipt.target))) throw new Error('插件链接已变化，停止回退');
const previousLinkPath = receipt.previousLinkPath || receipt.linkPath;
if (receipt.previousTarget && previousLinkPath !== receipt.linkPath && await lstat(previousLinkPath).catch(e => { if (e.code === 'ENOENT') return null; throw e; })) throw new Error('旧包链接已被重新创建，停止回退');
for (const entry of receipt.files) await copyFile(entry.backup, entry.path);
if (linkInfo) await unlink(receipt.linkPath);
if (receipt.previousTarget) await symlink(receipt.previousTarget, previousLinkPath, process.platform === 'win32' ? 'junction' : 'dir');
console.log('已恢复安装前的 desktop 配置。插件产物保留在 ' + receipt.target + '；重启 DSH 后生效。');
