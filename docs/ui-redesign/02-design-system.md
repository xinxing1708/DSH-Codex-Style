# 02 · 设计系统（Design System）

## 1. 原则

1. **单一令牌源**：颜色、圆角、间距、字号、动效一律来自 `assets/tokens.css` 的 `--cx-*`；组件 CSS 不写死色值（`chrome.css` 里遗留的 3 处硬编码本轮收敛为令牌）。
2. **两套令牌分工**：`--cx-*` 供插件自有界面；`--dsw-*` 供宿主原生区块。两者由主题/外观统一驱动。
3. **不透明材质**：不使用 Acrylic / Mica / backdrop-filter；所有主表面为实色。仅保留 1px 边框与低强度阴影。
4. **密度可切换**：`Standard` 默认，`Compact` 通过 `body[data-dsc-density="compact"]` 覆盖少量尺寸令牌。

## 2. 颜色令牌

| 语义 | 令牌 | 深色 | 浅色 |
|---|---|---|---|
| 窗口底色 | `--cx-window` | `#0f0f0f` | `#f3f3f3` |
| 侧栏 | `--cx-sidebar` | `#101010` | `#fbfbfb` |
| 主表面 | `--cx-surface` | `#111111` | `#ffffff` |
| 次级表面 | `--cx-thread` | `#171717` | `#ffffff` |
| 嵌套表面 | `--cx-nested` | `#212121` | `#f5f5f5` |
| 浮层 | `--cx-popover-fill` | `#2d2d2d` | `#ffffff` |
| 正文 | `--cx-text` | `#fcfcfc` | `#0d0d0d` |
| 次级文字 | `--cx-text-2` | `rgba(255,255,255,.7)` | `#505050` |
| 弱化文字 | `--cx-text-3` | `rgba(255,255,255,.5)` | `#898989` |
| 边框 l1/l3 | `--cx-border-l1` / `-l3` | `.08` / `.16` 白 | `.12` / `.18` 黑 |
| 强调 | `--cx-accent` | `#0285ff` | `#2b68cb` |
| 悬停 / 选中 | `--cx-hover` / `--cx-active` | `.045` / `.08` 白 | `.045` / `.065` 黑 |

本轮新增：

| 令牌 | 用途 |
|---|---|
| `--cx-hover-strong` | 侧栏「新聊天」等强调悬停 |
| `--cx-tooltip-fill` | rail 悬浮提示底色 |
| `--cx-focus-ring` | 键盘焦点外环（2px 强调色 + 1px 窗口色） |
| `--cx-disabled-opacity` | 统一禁用态透明度 |
| `--cx-density-item` / `--cx-density-pad` / `--cx-density-gap` / `--cx-density-row` | 密度缩放 |
| `--cx-sidebar-compact` / `-standard` / `-wide` | 侧栏三档宽度 |

## 3. 尺寸与圆角

| 项 | 值 | 说明 |
|---|---|---|
| 顶部栏 | 44px | 与宿主 titlebar 对齐 |
| 一级 rail | 48px（原 52px） | 落在规格 44–48 内 |
| rail 项 | 34px（原 36px） | 图标 20px，命中区 ≥ 32px |
| 侧栏宽度 | 216 / 264 / 312 三档 | 默认 264，宿主 store 持久化 |
| 侧栏 header | 44px | 品牌行 |
| 新聊天按钮 | 32px | 标准密度 |
| 输入卡 | 736 × 98，圆角 24px | 沿用 Codex 实测值（见下方偏差说明） |
| 卡片 / 控件圆角 | 16 / 10 / 8 / 7px | `--cx-radius-*` 阶梯 |
| 基础间距 | 4px，常用 8/12/16/24 | `--cx-space-*` |
| 正文 | 14px / 24px 行高，列宽 768px | 规格 760–880 内 |
| 动效 | 120–200ms | `--cx-dur-fast` / `--cx-dur` |

**与任务书建议值的偏差（有意保留）**：输入卡圆角 24px、导航行高 30px、侧栏默认 264px 来自对 Codex 真机截图的测量；任务书给的是 14–16px、34–38px、224–248px 的初始基准。此处优先还原参考基准，偏差记录在此。

## 4. 密度

- `Standard`：默认值（上表）。
- `Compact`：rail 项 30px、侧栏 padding 6px、行间距 1px、设置页行高 40px、消息间距收紧约 10%。
- 通过 `body[data-dsc-density="compact"]` 切换，设置 → 外观 → 密度。

## 5. 状态

| 状态 | 表现 |
|---|---|
| Hover | 背景 `--cx-hover`，120ms |
| Active | 背景 `--cx-active` + 文字提亮 |
| Focus-visible | `outline: 2px solid var(--cx-focus)`，offset 2px（既有规则，补 rail/sidebar） |
| Disabled | `opacity: var(--cx-disabled-opacity)`，`cursor: default` |
| Loading / 生成中 | 发送按钮 12px 渐变环，1.7s；`prefers-reduced-motion` 下静止 |
| Error | `--cx-danger` 文字 + 可复制文本，不吞异常 |

## 6. 字体

- 正文栈：系统栈（`--cx-font-sans`），代码 `--cx-font-mono`。
- 外观设置提供 系统 / Inter / Serif / 等宽 四档，写入 `--cx-font-sans` 与 `--dsh-font-family-text`。

## 7. 图标

统一 `assets/icons.json` 的内联 SVG（16/18/20px，1.4–1.5 线宽）；rail 使用宿主同款 20px 图标；不引入第二套图标库。

## 8. 动效

| 场景 | 时长 |
|---|---|
| Hover / focus | 120ms |
| 侧栏展开 / 收起 | 140–200ms |
| 弹层进入 | 120–180ms |
| 减少动态效果 | `prefers-reduced-motion: reduce` 下关闭非必要动画 |
