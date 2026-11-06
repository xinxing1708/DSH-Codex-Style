import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { apply as applySkillsHost } from './skills-host.js';
import { applyEnvironmentService } from './community-environment.js';

// 自研插件更新已退役：Host 不再注册插件更新 RPC、更新器或安装器。
// 本文件只保留用户授权的只读技能目录服务与只读运行环境判定。
export const name = 'codex-style';
export const inject = ['profileContext'];
export async function apply(ctx) {
  // 外部 profile 与日常手动安装都使用当前 runtime 的 SDK，避免复制或安装另一份宿主。
  const require = createRequire(ctx.profileContext.installAnchor);
  const { Remote, TypertRemoteService } = await import(pathToFileURL(require.resolve('@deepseek-ai/dsh-typert-protocol')).href);
  // 只读运行环境判定：只读受管安装标记与 profileContext，不扫描用户配置、不写文件。
  applyEnvironmentService(ctx, { Remote, TypertRemoteService });
  // 只读技能目录/正文：复用宿主 SkillRegistry，不新增发现、启停或写文件能力。
  applySkillsHost(ctx, { Remote, TypertRemoteService });
}
