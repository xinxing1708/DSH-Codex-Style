# 05 · 开发进度（Progress）

> 维护规则：每次提交前更新本文件；恢复执行时先看这里再看 `git status`。

```text
Current Phase: 7（回归与文档，已完成）
Current Task: 收尾提交 / PR
Completed: P1 令牌、P2 外壳、P3 输入卡状态、P6 设置页「界面」组、P7 回归与文档
In Progress: —
Pending: 实机视觉验收（环境无浏览器控制，见 07-final-report）
Files Changed:
  assets/tokens.css, assets/chrome.css, src/style.css, src/chrome.js,
  src/appearance.js, scripts/test-appearance.mjs, lib/client.js,
  docs/ui-redesign/01..07
Checks Run:
  node scripts/build.mjs                     → 通过（client 974371 bytes）
  node --test --test-isolation=none ...      → 180 项 / 177 通过 / 3 跳过 / 0 失败
  test-install.mjs                           → 沙箱内既有失败（engines.dsh 用例）
  test-retirement.mjs                        → 沙箱禁止子进程管道，未能执行
Known Failures: 仅上述两项环境限制，与本次改动无关
Next Action: 推送分支、更新 PR；有浏览器环境后补实机截图
```

## 阶段记录

| 阶段 | 状态 | 说明 |
|---|---|---|
| P0 基线 | ✅ | 审查完成，基线 177 通过 / 0 失败，见 `01-audit.md` |
| P1 设计令牌 | ✅ | 新增焦点环、禁用透明度、悬停强度、提示底色、密度与侧栏档位令牌；`chrome.css` 3 处硬编码改为令牌 |
| P2 外壳 | ✅ | rail 52→48、项 36→34；侧栏宽度三档（216/264/312）与记忆；焦点环 |
| P3 输入卡 | ✅ | 禁用态走令牌、输入卡内控件焦点环；未改宿主结构 |
| P4 内容 | 🟡 | 正文列宽/消息排版沿用宿主与既有令牌，未新增 DOM 操作（见 07 未实现项） |
| P5 工具 | 🟡 | 状态色沿用 `--cx-success/danger/warning`，未改工具流程 |
| P6 设置 | ✅ | 外观页新增「界面」组：密度、侧栏宽度、材质（固定不透明） |
| P7 回归 | ✅ | 全量测试与构建通过；文档完成 |

## 与计划偏差

- 任务书建议输入卡圆角 14–16px、导航行高 34–38px；本插件沿用 Codex 实测的 24px / 30px，原因见 `02-design-system.md` 第 3 节。
- 未新增「三态侧栏」的新状态机：宿主只有「宽度 + 0 收起」两种，插件在其上提供三档宽度，收起态沿用宿主行为（见 `03` 与 `07`）。
- 未做透明材质：任务要求关闭，外观页仅展示「不透明（固定）」说明。
