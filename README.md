# DSH Codex Style

为 **DeepSeek Harness（DSH）** 提供 Codex 桌面端风格的深色界面。当前版本 **0.1.3**，npm 包名 **`@xinxing1708/dsh-codex-style`**，适配 **Windows DSH 0.2.1-rc.2**。

本项目为社区独立插件，与 OpenAI 或 DeepSeek 无关联，未获其赞助或背书。

## 下载与安装

需要已安装 DSH `0.2.1-rc.2` 和 **Node.js 20 或更高版本**。可在 DSH 的「自定义 → 插件 → 添加插件」中输入完整 npm 包名 `@xinxing1708/dsh-codex-style`，沿用宿主的安装流程。若此前通过本项目脚本安装，请继续使用以下脚本方式升级，避免同时保留新旧名称。

在空目录的 PowerShell 中下载并解压 npm 包：

```powershell
npm pack @xinxing1708/dsh-codex-style@0.1.3 --registry=https://registry.npmmirror.com
tar -xf xinxing1708-dsh-codex-style-0.1.3.tgz
cd package
```

国内镜像同步需要时间；若提示包尚不存在，可将 registry 换成 `https://registry.npmjs.org` 重试。

1. 退出 DSH。
2. 双击 `install.cmd`，或在解压目录运行：

   ```powershell
   node scripts/install.mjs
   ```

3. 安装成功后启动 DSH。

安装器自动核对 DSH 版本，备份 desktop profile 的三份配置，安装插件并输出回退脚本位置。无需管理员权限、无需构建或安装 npm 依赖。已有全局主题会按安装规则停用，安装文件保留；升级本插件时保留上一版本。

DSH 安装在自定义位置时，在同一个 PowerShell 窗口设置现有 DSH 数据根目录，再运行安装：

```powershell
$env:DSH_HOME = "你的 DSH 数据根目录"
node scripts/install.mjs
```

默认数据根目录为当前用户的 `.dsh`，应包含 `profiles/desktop`。安装器支持旧版 `dsh-runtimes` 目录，以及官方 Windows 的当前用户和全局默认安装目录；没有 `pnpm-lock.yaml` 的 profile 会保持无锁文件状态。

若 DSH 程序安装在其他位置，可显式指定现有 `runtime.json` 的完整路径（仍会核对版本，不会修改运行时）：

```powershell
$env:DSH_RUNTIME_FILE = "D:\Apps\DeepSeek Harness\resources\runtime\primary-runtime\runtime.json"
node scripts/install.mjs
```

## 功能

- 52px 常驻导航：首页、定时任务、自定义；社区快捷入口沿用宿主原按钮与图标。
- 默认 288px 的可拖动、可收起二级侧栏，收起后悬停显示浮卡。
- 真实项目和会话树，包含标题/项目过滤、置顶、重命名、分叉、归档与恢复。
- 项目分组和单项目平滑展开/收起；聊天右键及 Shift+F10 复用原菜单。
- 长标题悬停后滚动；聊天行尾提供带渐变文字提示的置顶/归档图标，已置顶显示实心图钉。
- 新聊天、项目悬停详情和项目编辑。
- 齿轮账号/设置菜单，设置提示渐显渐隐。
- 单行搜索框保持 32px；发送按钮在空输入时为灰色，有内容时为灰白色。
- 真实权限预设、模型目录、思考强度滑条及 Max 动效。
- 保留 DSH 原生输入编辑器、附件、“+”、消息、工具调用与审批流程。
- 本插件详情页在「卸载」左侧提供真实「检查更新」按钮，可查看当前版本、最新版本和查询结果。

项目移除、会话归档和权限切换等控件使用宿主真实动作。模型切换沿用 DSH 的默认值保存行为，实际可用档位由模型目录决定。

## 检查更新

打开「自定义 → 插件 → 本插件详情」，点击「检查更新」。检查只读取 npm 版本信息，不安装或卸载插件。只有本插件的已安装包详情显示该入口，组件子页与其他插件不显示。

插件加载约 8 秒后自动查询，此后每 24 小时复查；查询结果保存在本地，重新打开不会重复查询。发现新版时在右下角提醒，点击「查看更新」进入本插件详情。关闭提醒会记住本次版本，下一个新版仍会提醒。查询失败时安静等待约 1 小时再试，恢复联网后可提前重试；手动按钮始终可用。

查询并行使用 npmmirror、腾讯云 npm 镜像和 npm 官方源，按有效响应中的最高版本提示；不依赖 GitHub，也不需要登录 npm。请求不携带凭据，最长等待约 6.5 秒；所有源失败、包未发布和最新版分别提示，不将错误当成已更新。镜像可能同步延迟，结果中会注明来源。停用插件会取消检查与定时器。

国内镜像为大陆直连用户提供更新查询通道；可用性仍取决于用户网络和镜像服务，无法保证所有运营商、所有时刻均可达。自动检查负责提醒，安装仍由用户按本页说明执行。

## 回退或卸载

退出 DSH，运行安装器输出的回退脚本：

```powershell
node "<备份目录>/rollback.mjs"
```

初装时恢复安装前配置并解除插件链接；升级时恢复上一版本。若安装后的配置有其他修改，脚本会停止并提示合并。备份和插件版本目录保留，回退后重新启动 DSH。

## 从源码构建

下载仓库源码或克隆本仓库，在根目录运行：

```powershell
npm run build
```

构建仅使用 Node.js 标准库，不需要 `npm install` 或联网。所需源码、样式、自绘图标和品牌图均已包含，产物写入 `lib/`。随后可运行 `node scripts/install.mjs`。

## 部分效果演示
<img width="962" height="617" alt="image" src="https://github.com/user-attachments/assets/73a8455d-f4c0-476e-a8de-731c3bec69c4" />
<img width="962" height="617" alt="image" src="https://github.com/user-attachments/assets/17d9ed75-c0ff-4a6d-b759-c208c58b1099" />
<img width="962" height="617" alt="image" src="https://github.com/user-attachments/assets/a7dd4a26-9100-4633-865e-d3dc2dc82269" />
<img width="962" height="617" alt="image" src="https://github.com/user-attachments/assets/ee67555e-3fd0-4995-8ed2-db1c430b2855" />
<img width="962" height="617" alt="image" src="https://github.com/user-attachments/assets/8e74053d-a8a2-4c55-96c1-db504554c361" />




| 路径 | 用途 |
|---|---|
| `src/` | 客户端组件、宿主入口及局部样式 |
| `assets/` | 独立构建所需令牌、导航样式、图标及品牌图 |
| `lib/` | 可安装的构建产物 |
| `scripts/` | 构建、安装及回退 |
| `cordis.patch.yml` / `skin.json` | DSH 插件接入及皮肤元数据 |

## 兼容范围

四项侧栏交互已通过实际组件的隔离浏览器检查；更新入口以 DSH 随包的真实插件详情页与按钮验证位置、状态、取消及无修改行为，并完成本机无代理查询。0.1.3 另验证了自动检查周期、缓存、断网恢复、版本提醒与忽略操作。真实日常宿主交互仍待用户验收。

仅适配 Windows DSH `0.2.1-rc.2`，当前只有深色主题。消息结构、插件/任务/设置内页及原生窗口控制沿用宿主；搜索范围为项目和会话标题。DOM 适配和布局接线依赖此 DSH 版本，升级宿主后需要重新核对。

发行前完成独立源码构建、包内容与隐私检查、临时 profile 中的安装/升级/回退及旧包名迁移验证；0.1.1 的搜索高度、发送配色和已有悬停修复继续保留。隔离检查不等同于日常 DSH 的完整交互验收。

## 许可与致谢

自研代码使用 [MIT License](LICENSE)。感谢项目贡献者及 `yuehuawu416-cmyk` 的修复。

品牌图来源、MIT 原文及上游品牌规范见 [第三方说明](THIRD_PARTY_NOTICES.md)。本包不分发个人配置、聊天数据、开发记录或参考截图。
