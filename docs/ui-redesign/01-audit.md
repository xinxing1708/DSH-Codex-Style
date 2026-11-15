# 01 · 源码审查（Audit）

> 审查对象：本仓库 `@xinxing1708/dsh-codex-style`（DSH 客户端 UI 插件），不是 DeepSeek Harness 本体。
> 审查时间：2026-11-15。基线提交：`db5c6d6`（feat/theme-pack 分支）。

## 1. 实际技术栈

| 项 | 实际值 |
|---|---|
| 形态 | DeepSeek Harness **客户端插件**（`dsh.client`：`platform: web`，`inject` 宿主 UI 服务） |
| 宿主 | DSH Desktop 0.2.2-rc.3（Electron 外壳 + 本地 Web 客户端），插件挂载在 `profiles/desktop` |
| 语言 | 原生 ESM JavaScript（无 TypeScript、无打包框架） |
| UI 运行时 | 宿主提供的 React 实例，插件用 `h(...)`（`React.createElement` 别名）手写元素树 |
| 插件框架 | `@deepseek-ai/cordis` 的 `ctx`：`ctx.effect` / `ctx.slots` / `ctx.inject` / `ctx.theme` |
| 样式 | 纯 CSS 字符串，构建期内联进 `lib/client.js`；不使用 CSS-in-JS、Tailwind 或 UI 组件库 |
| 构建 | `scripts/build.mjs`：读 `src/*` 与 `assets/*`，拼成一个 `window.__ModuleLoader__.load({...})` 模块 |
| 测试 | `node:test`（Node 24），共 14 个测试文件 |
| 包体 | `lib/client.js` 约 969 KB（其中主题包数据 296 KB） |

## 2. 入口、生命周期与路由

- 入口：`lib/client.js` 的 `apply(ctx)`（源码 `src/client.js`）。
- 启动顺序：`mountCodexPresentation(ctx)` → 主题令牌层（`mountCodexTheme`）→ 自带样式表 → `installThemePack` → `installAppearance` → 技能页 / 导航 / 图片批注等可选组件。
- 路由：插件不接管路由，跟随宿主的 `activePanelId` / session 选中态；导航历史由 `src/navigation.js` 在内存里记录最近打开的会话与面板。
- 卸载：所有 `ctx.effect` 返回清理函数，恢复 body 上的标记、样式表、令牌层与侧栏默认宽度。

## 3. 布局结构（宿主 frame + 插件层）

```
body[data-dsh-codex-style][data-dsh-codex-chrome]
├── .dsc-independent-rail            ← 插件新增，一级导航（52px，本次拟调 48px）
└── [data-dsc-frame]（宿主三列，左边距 = rail 宽）
    ├── [data-slot="sidebar"]        ← 宿主侧栏，插件重绘外观与内容
    │   └── .dsc-sidebar（品牌 / 新聊天 / 项目 / 会话 / 底部动作）
    └── [data-conversation-content]  ← 会话区
        ├── 顶部 header（插件重绘：标题 + 视图胶囊 + 模式/模型）
        ├── 消息列表（宿主渲染，插件做正文与过程样式）
        └── [data-slot="conversation.composer.bar"]（宿主输入卡，插件改外观）
```

## 4. 组件清单（源码位置）

| 区域 | 源码 | 说明 |
|---|---|---|
| 一级导航 rail | `src/chrome.js` `makeNavigationRail` / `src/style.css` `.dsc-rail*` | 图标项、Tooltip、当前分类 |
| 侧栏 | `src/chrome.js` `makeSidebarChrome` / `src/client.js` `makeWorkspaceTree` | 品牌、新聊天、搜索、项目树、会话行、右键菜单 |
| 顶部栏 | `src/header.js` + `src/header.css` | 标题、视图胶囊、模式/模型/后台任务 |
| 输入卡 | 宿主 `InputBar`，插件在 `src/style.css` 第 9–56 行改外观 | 圆角、填充、发送/停止环、工具行 |
| 空状态 | `src/chrome.js` `EmptyHero` / `makeHeroWorkspace` | 云图标 + 标题 + 项目栏 |
| 正文 / 过程 | `src/body.js` + `src/body.css` | 流式揭示、回合耗时、过程收起 |
| 工具执行 | 宿主 `turn-process` 节点，插件在 `src/body.css` 覆盖视觉 | 状态行、展开、日志 |
| 技能页 | `src/skills.js` / `src/skills.css` | 自定义 → 技能 |
| 图片批注 | `src/image-annotations*.js` / `.css` | 预览、点评论、手绘 |
| 页面导航 | `src/navigation.js` / `.css` | 前进/后退、快捷键、标题栏标记 |
| 外观设置 | `src/appearance.js`（本轮新增） | 设置 → 外观：模式 / 预设 / 三色 / 字体 |
| 主题包 | `src/theme-pack.js` + `assets/themes.data.json` | dsh-theme 30 套配色 |

## 5. 主题系统与配置入口

- 宿主令牌：`--dsw-*`（`design-platform.css`），明暗由 `body[data-ds-dark-theme]` 切换。
- 插件令牌：`--cx-*`（`assets/tokens.css`），明暗由 `data-dsc-color-scheme` 切换。
- 插件覆盖层：`ctx.theme.overrideTokens(PLUGIN_ID, …)`，按 `{light, dark}` 成对下发；主题/外观接管时让出调色板令牌，只保留圆角与阴影。
- 外观状态：`localStorage` 键 `dsh-codex-style:appearance`；主题包选择键 `dsh-codex-style:theme`。
- 宿主布局：侧栏宽度由宿主 `layoutInfo.sidebar` 持久化，插件 `initializeSidebarWidth` 在首次/宿主默认值 280 时接管为 288。

## 6. 已存在、不得重复实现的成果

1. 深浅色令牌与跟随宿主的明暗切换。
2. Codex 风格 rail / 侧栏 / 顶部栏 / 输入卡 / 空状态。
3. 正文流式、回合耗时、过程收起，工具调用视觉。
4. 图片批注、技能页、前进后退、齿轮菜单与第三方入口分组。
5. 设置 → 外观（模式 / 11 个预设 / 30 套主题包 / 三色 / 字体）。
6. 消息气泡跟随主题（上一轮修复）。

## 7. 与业务逻辑的耦合风险

| 风险点 | 说明 | 处理 |
|---|---|---|
| 宿主私有 DOM 属性 | 依赖 `data-composer-card`、`data-content-phase`、`data-conversation-content` 等公开标记 | 只用公开 `data-*` 与 `data-slot`，不查 CSS-module 类名 |
| 侧栏宽度 | `initializeSidebarWidth` 直接写宿主 store | 保留原有「只在默认值时接管 + 卸载恢复」的所有权语义 |
| 输入卡 | 宿主拥有编辑器、附件、提交 | 只改外观，不重建节点 |
| 主题接管 | 写 `data-ds-dark-theme` 影响整个宿主 | 首次启用不接管，用户动过外观后才接管，并监听纠回 |
| CSS 特异性 | 插件样式与宿主样式混排 | 新规则统一挂 `body[data-dsh-codex-style]` 前缀 |

## 8. 构建与测试命令

```bash
node scripts/build.mjs                     # 构建 lib/client.js
node --test scripts/test-client.mjs ...    # 全量测试（沙箱内需 --test-isolation=none）
```

## 9. 基线结果（重构前）

| 检查 | 结果 |
|---|---|
| 构建 | 通过，`client 968985 bytes` |
| 非安装器测试 | 180 项，177 通过 / 3 跳过 / 0 失败 |
| `test-install.mjs` | 沙箱内 `engines.dsh` 用例失败（既有，未改安装器） |
| `test-retirement.mjs` | 沙箱禁止子进程管道，无法执行（既有） |
| 未提交改动 | 仅 `install.cmd` 行尾差异（本地噪声，不纳入提交） |

## 10. 重构顺序

1. Phase 1 设计令牌（密度、焦点环、禁用态、悬停强度）→ 不改视觉语义。
2. Phase 2 外壳（rail 48px、侧栏宽度档位、三态语义、焦点态）。
3. Phase 3 输入卡（统一令牌、状态一致性）。
4. Phase 4 消息 / 代码块 / 引用（沿用宿主渲染，只调令牌与间距）。
5. Phase 5 工具执行（状态色与日志滚动，不改流程）。
6. Phase 6 设置与细节（外观页新增密度/侧栏/材质行、图标与动效）。
7. Phase 7 回归 + 文档。
