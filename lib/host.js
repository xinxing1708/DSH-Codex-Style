import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { PluginUpdater } from './updater.js';

// 用户授权的本插件更新服务；不注册模型或工具，不修改会话数据。
export const name = 'codex-style';
export const inject = ['profileContext'];
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
export async function apply(ctx) {
  // 外部 profile 与日常手动安装都使用当前 runtime 的 SDK，避免复制或安装另一份宿主。
  const require = createRequire(ctx.profileContext.installAnchor);
  const [{ Remote, TypertRemoteService }, { evaluatePluginCompatibility }] = await Promise.all([
    import(pathToFileURL(require.resolve('@deepseek-ai/dsh-typert-protocol')).href),
    import(pathToFileURL(require.resolve('@deepseek-ai/dsh-app-boot')).href)
  ]);
  const initializers = [];
  class CodexStyleUpdates extends TypertRemoteService {
    constructor(ctx) {
      super(ctx, 'codexStyleUpdates');
      for (const initialize of initializers) initialize.call(this);
      this.updater = new PluginUpdater({
        profile: ctx.profileContext.dir,
        currentVersion: manifest.version,
        compatibility: candidate => {
          if (evaluatePluginCompatibility(candidate, {})) throw new Error('新版本与当前 DSH 不兼容，已保留现有安装。');
        },
        exclusive: operation => ctx.get('hmr')?.runExclusive(operation) ?? operation()
      });
      ctx.effect(() => () => this.updater.dispose());
    }
    status() { return this.updater.status(); }
    download(version) { return this.updater.download(version); }
    installUpdate(version) { return this.updater.install(version); }
  }
  // 使用公开的标准装饰器调用方式，无需引入编译器或依赖私有 RPC 字段。
  for (const method of ['status', 'download', 'installUpdate']) Remote(CodexStyleUpdates.prototype[method], { kind: 'method', name: method, static: false, private: false, addInitializer: initialize => initializers.push(initialize) });
  ctx.plugin(CodexStyleUpdates);
}
