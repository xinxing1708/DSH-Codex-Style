# 04 · 迁移计划（Migration Plan）

## 1. 阶段与检查点

| 阶段 | 内容 | 涉及文件 | 检查点 |
|---|---|---|---|
| P1 令牌 | 焦点环、禁用透明度、悬停强度、提示底色、密度与侧栏档位令牌 | `assets/tokens.css` | 构建通过；浅/深色令牌成对；旧令牌名不变 |
| P2 外壳 | rail 52→48、项 36→34、焦点态；侧栏宽度三档与记忆 | `assets/chrome.css`、`src/chrome.js`、`assets/tokens.css` | 构建 + client 测试；侧栏宽度只在宿主默认值时接管 |
| P3 输入卡 | 状态令牌统一（focus / disabled / sending），不改结构 | `src/style.css` | 构建 + client 测试；宿主编辑器/提交回调未改 |
| P4 内容 | 正文列宽、间距、代码块/表格沿用宿主渲染 | `src/style.css`（令牌） | 构建；不新增 DOM 操作 |
| P5 工具 | 状态色沿用 `--cx-success/danger/warning`，日志滚动沿用宿主 | `src/style.css` | 构建 |
| P6 设置 | 外观页新增「界面」组：密度、侧栏宽度、材质（固定不透明） | `src/appearance.js`、`src/style.css` | 构建 + appearance 测试 |
| P7 回归 | 全量测试、构建、安装到本地 profile、文档 | `docs/`、`lib/client.js` | 177+/0 失败；沙箱限制项如实记录 |

## 2. 配置兼容

| 配置 | 处理 |
|---|---|
| `dsh-codex-style:appearance`（外观页） | 追加 `density`、`sidebarWidth` 字段；旧 JSON 缺字段时用默认值 |
| `dsh-codex-style:theme`（主题包） | 不变 |
| 宿主 `layoutInfo.sidebar` | 保留用户拖动值；只在宿主默认值 280 时接管为偏好宽度；卸载恢复原逻辑 |
| 旧组件开关（behavior/navigation/image-annotations） | 不变 |
| 快捷键、权限策略、模型配置 | 不触碰 |

新增字段默认值：`density: 'standard'`、`sidebarWidth: 264`（原硬编码 288 的收敛值）。读取时做白名单校验，未知值回退默认。

## 3. 回滚

- 代码回滚：按阶段提交，`git revert <commit>` 即可单独撤销。
- 运行回滚：卸载插件即移除全部样式与标记；外观状态保存在 localStorage，卸载后不生效。
- 侧栏宽度：卸载时把 288/偏好宽度恢复为宿主 280（沿用原 `initializeSidebarWidth` 的 ownership 语义）。

## 4. 风险与对策

| 风险 | 对策 |
|---|---|
| rail 变窄导致 frame 左移 | 只改 `--cx-rail-w` 一个变量，frame 边距与 rail 宽度同源 |
| 侧栏宽度偏好与用户拖动冲突 | 只在宿主默认值/首次启动接管；拖动后 `owned=false` |
| 密度压缩造成命中区过小 | 最小项 30px，图标仍 20px；仅影响自有 rail 与设置页 |
| 焦点环被宿主样式覆盖 | 使用 `outline` 而非 `box-shadow`，不参与布局 |
| 未实机验证 | 文档与最终报告明确标注，不宣称已通过视觉验收 |
