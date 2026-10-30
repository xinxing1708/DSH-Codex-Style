// 运行环境归属判定：只读本插件在受管安装根留下的环境标记，并与运行中宿主的 installAnchor 做路径包含判断。
// 标记缺失、损坏或无法核实一律按非社区处理（fail closed）；提醒失败不得影响主插件加载。
import { readFileSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';

export const INSTALL_ENVIRONMENT_DIRECTORY = 'dsh-codex-style';
export const INSTALL_ENVIRONMENT_FILENAME = 'install-environment.json';
export const INSTALL_ENVIRONMENT_SCHEMA = 1;

const isRecord = value => typeof value === 'object' && value !== null && !Array.isArray(value);
const comparable = path => {
  const absolute = resolve(path);
  return process.platform === 'win32' ? absolute.toLowerCase() : absolute;
};

/** 判断 child 是否位于 root 目录之下；不把同前缀兄弟目录或 root 自身算作命中。 */
export function isPathInside(child, root) {
  if (typeof child !== 'string' || typeof root !== 'string' || child === '' || root === '') return false;
  const relativePath = relative(comparable(root), comparable(child));
  if (relativePath === '' || isAbsolute(relativePath)) return false;
  return relativePath.split(sep)[0] !== '..';
}

/** 校验并收敛标记结构；字段不合法时返回 null，交由调用方按 fail closed 处理。 */
function normalizeMarker(value) {
  if (!isRecord(value) || value.schemaVersion !== INSTALL_ENVIRONMENT_SCHEMA) return null;
  const target = value.target;
  if (!isRecord(target) || typeof target.installRoot !== 'string' || target.installRoot === '') return null;
  if (target.official !== true && target.official !== false && target.official !== null) return null;
  if (!Array.isArray(value.communityHosts)) return null;
  const communityHosts = [];
  for (const host of value.communityHosts) {
    if (!isRecord(host) || typeof host.installRoot !== 'string' || host.installRoot === '') return null;
    communityHosts.push({ installRoot: host.installRoot });
  }
  return { target: { official: target.official, installRoot: target.installRoot }, communityHosts };
}

/** 读取 <DSH home>/dsh-codex-style/install-environment.json；缺失时不算异常，损坏时给出可诊断原因。 */
export function loadInstallEnvironment(home) {
  if (typeof home !== 'string' || home === '') return { marker: null, warning: '缺少 DSH home，无法读取安装环境标记。' };
  const file = join(home, INSTALL_ENVIRONMENT_DIRECTORY, INSTALL_ENVIRONMENT_FILENAME);
  let text;
  try { text = readFileSync(file, 'utf8'); }
  catch (error) { return error.code === 'ENOENT' ? { marker: null } : { marker: null, warning: '读取安装环境标记失败：' + (error.message || error.code) }; }
  let value;
  try { value = JSON.parse(text); }
  catch { return { marker: null, warning: '安装环境标记不是有效 JSON：' + file }; }
  const marker = normalizeMarker(value);
  return marker ? { marker } : { marker: null, warning: '安装环境标记结构无效：' + file };
}

/** 运行中的安装根是否属于社区版：命中社区主机，或命中明确非官方的安装目标。 */
export function isCommunityInstall(installAnchor, marker) {
  if (!marker || typeof installAnchor !== 'string' || installAnchor === '') return false;
  if (marker.communityHosts.some(host => isPathInside(installAnchor, host.installRoot))) return true;
  return marker.target.official === false && isPathInside(installAnchor, marker.target.installRoot);
}

/** 合并读取与判定，供 Host 服务一次性缓存。 */
export function classifyRunningEnvironment({ home, installAnchor }) {
  const { marker, warning } = loadInstallEnvironment(home);
  return { community: isCommunityInstall(installAnchor, marker), ...(warning === undefined ? {} : { warning }) };
}

/**
 * 注册只读 Remote 服务 codexStyleEnvironment：status() 返回本次运行是否社区版。
 * @param ctx - Host 插件上下文，需已提供 profileContext。
 * @param dependencies - 当前 runtime SDK 的 Remote 装饰器与 TypertRemoteService。
 */
export function applyEnvironmentService(ctx, { Remote, TypertRemoteService }) {
  const initializers = [];
  let cached;
  // 每个 Host 实例最多读取一次标记；主插件生命周期重建后重新按真实运行路径判定。
  const resolveStatus = () => {
    if (cached === undefined) {
      cached = classifyRunningEnvironment({ home: ctx.profileContext?.home, installAnchor: ctx.profileContext?.installAnchor });
      if (cached.warning !== undefined) console.warn('codex-style: ' + cached.warning);
    }
    return cached;
  };
  class CodexStyleEnvironment extends TypertRemoteService {
    constructor(inner) {
      super(inner, 'codexStyleEnvironment');
      for (const initialize of initializers) initialize.call(this);
    }
    status() { return { community: resolveStatus().community }; }
  }
  Remote(CodexStyleEnvironment.prototype.status, { kind: 'method', name: 'status', static: false, private: false, addInitializer: initialize => initializers.push(initialize) });
  ctx.plugin(CodexStyleEnvironment);
}
