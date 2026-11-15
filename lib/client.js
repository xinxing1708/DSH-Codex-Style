window.__ModuleLoader__.load({
  id: "@xinxing1708/dsh-codex-style",
  factory: function(require) {
    'use strict';
    const CSS_TEXT = "/* 自研界面令牌；尺寸与色值参考界面测量。来源说明见 THIRD_PARTY_NOTICES.md。 */\n\nbody[data-dsh-codex-style] {\n  /* ---- 间距 ---- */\n  --cx-spacing: 4px;\n  --cx-space-1: 4px;\n  --cx-space-2: 8px;\n  --cx-space-3: 12px;\n  --cx-space-4: 16px;\n  --cx-space-5: 20px;\n  --cx-space-6: 24px;\n  --cx-space-8: 32px;\n\n  /* ---- 圆角阶梯 ---- */\n  --cx-radius-2xs: 2px;\n  --cx-radius-xs: 4px;\n  --cx-radius-sm: 6px;\n  --cx-radius-md: 8px;\n  --cx-radius-lg: 10px;\n  --cx-radius-xl: 12px;\n  --cx-radius-2xl: 16px;\n  --cx-radius-3xl: 20px;\n  --cx-radius-4xl: 24px;\n  --cx-radius-composer: 24px;\n  --cx-radius-full: 9999px;\n\n  /* ---- 暗色面（第 134 轮按新版 Codex 默认主题：导航/顶栏 #0f0f0f、侧栏 #101010、对话区 #111111） ---- */\n  --cx-window: #0f0f0f;\n  --cx-sidebar: #101010;\n  --cx-surface: #111111;\n  --cx-thread: #171717;\n  --cx-nested: #212121;\n  --cx-elevated: #282828;\n  --cx-summary: #2d2d2d;\n  --cx-hover: rgba(255, 255, 255, 0.045);\n  --cx-active: rgba(255, 255, 255, 0.08);\n\n  /* ---- 边框 ---- */\n  --cx-border-l1: rgba(255, 255, 255, 0.08);\n  --cx-border-l2: rgba(255, 255, 255, 0.04);\n  --cx-border-l3: rgba(255, 255, 255, 0.16);\n  --cx-border-strong: rgba(255, 255, 255, 0.16);\n  /* 侧栏分割线：静态按 2026-11-06 Codex 截图取 #212121；悬停/拖拽保留原加深加粗。 */\n  --cx-sidebar-divider: #212121;\n  --cx-sidebar-divider-hover: #535353;\n  /* 外框：Codex 截图在 150% 缩放下为 1 设备像素 #191919；0.667px × 1.5 = 1 设备像素。 */\n  --cx-frame-line: #191919;\n  --cx-frame-line-width: 0.667px;\n  --cx-frame-radius: 16px;\n\n  /* ---- 文本 ---- */\n  --cx-text: #fcfcfc;\n  --cx-text-2: rgba(255, 255, 255, 0.7);\n  --cx-text-3: rgba(255, 255, 255, 0.5);\n  --cx-text-4: rgba(255, 255, 255, 0.32);\n  --cx-text-inverse: #0d0d0d;\n\n  /* ---- 第 134 轮侧栏/导航语义色（只落在自有侧栏与 rail，不外扩菜单） ---- */\n  --cx-nav-icon: #7f7f7f;\n  --cx-sidebar-text: #d8d8d8;\n  --cx-sidebar-muted: #7f7f7f;\n  --cx-sidebar-selected: #212121;\n\n  /* ---- 强调 / 状态 ---- */\n  --cx-accent: #0285ff;\n  --cx-accent-soft: #339cff;\n  --cx-link: #9bc8f8;\n  --cx-focus: #339cff;\n  --cx-success: #40c977;\n  --cx-danger: #ff6764;\n  --cx-warning: #ff8549;\n  --cx-attention: #3a83f7;\n\n  /* ---- diff ---- */\n  --cx-diff-add-bg: rgba(64, 201, 119, 0.23);\n  --cx-diff-del-bg: rgba(255, 103, 100, 0.23);\n  --cx-diff-add-mark: #40c977;\n  --cx-diff-del-mark: #ff6764;\n\n  /* ---- 字体 ---- */\n  --cx-font-sans: -apple-system, system-ui, \"Segoe UI\", sans-serif;\n  --cx-font-mono: ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace;\n\n  /* ---- 字号 / 行高 ---- */\n  --cx-text-xs: 12px;\n  --cx-text-sm: 14px;\n  --cx-text-md: 16px;\n  --cx-text-lg: 18px;\n  --cx-leading-xs: 16px;\n  --cx-leading-sm: 22px;\n  --cx-leading-md: 24px;\n  --cx-leading-lg: 28px;\n\n  /* ---- 字重 ---- */\n  --cx-weight-regular: 400;\n  --cx-weight-medium: 500;\n  --cx-weight-semibold: 600;\n  --cx-weight-bold: 700;\n  --cx-weight-shell: 445; /* 外壳专用非标准字重 */\n\n  /* ---- 动效 ---- */\n  --cx-dur-fast: 120ms;\n  --cx-dur: 150ms;\n  --cx-dur-relaxed: 300ms;\n  --cx-ease: ease;\n  --cx-ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);\n  --cx-ease-scroll: cubic-bezier(0.22, 1, 0.36, 1);\n\n  /* ---- 布局几何 ----\n     以真实 Codex 窗口截图（1988×1292 @1.5x）实测回填：\n     侧栏 288、标题栏 44、输入栈 710，详见 02-开发日志 第 10 轮。 */\n  --cx-titlebar-h: 44px;\n  --cx-rail-w: 52px;\n  --cx-sidebar-w: 288px;\n  --cx-thread-max: 768px;\n  --cx-right-w: 667px;\n  --cx-header-h: 48px;\n  --cx-row-h: 30px;\n  --cx-control-h: 28px;\n  --cx-send-h: 32px;\n  --cx-composer-stack-w: 768px; /* 2026-10-25 用户截图：左右各 16px，卡片 736 */\n  --cx-composer-h: 98px;\n  --cx-picker-h: 38px;\n\n  /* ---- 输入区实测色（真实截图取色） ---- */\n  --cx-picker-fill: #282828;\n  --cx-composer-fill: #2b2b2b;\n\n  /* ---- 应用视口 ----\n     真实 DSH 窗口截图 1988×1292（Windows 150% 缩放）换算为 1325×861 CSS。\n     原型按此尺寸渲染，各栏占比才与真实界面一致（旧 1600 视口下主区偏宽）。 */\n  --cx-app-w: 1325px;\n  --cx-app-h: 861px;\n\n  /* ---- 推理强度选择器 ----\n     尺寸/颜色按用户真实 Codex 录屏帧实测（1992×1296 @1.503x）。 */\n  --cx-reasoning-w: 255px;\n  --cx-reasoning-snap-dur: 140ms; /* 第 20 轮节点切换过渡，待用户验收 */\n  --cx-reasoning-fx-dur: 180ms;\n  --cx-reasoning-text-dur: 220ms;\n  /* 第 23 轮按用户新设计口径增强流速，两个亮带错速运行。 */\n  --cx-reasoning-flow-dur: 2.8s;\n  --cx-reasoning-bloom-dur: 4.2s;\n  --cx-reasoning-blue: #4c9bfe;\n  --cx-reasoning-track: #3e3e3e;\n  /* 第 22 轮：新录屏 100/660/900/1120 帧取色，深底与两种柔亮色分层。 */\n  --cx-reasoning-violet: #5134ad;\n  --cx-reasoning-purple: #844fcc;\n  --cx-reasoning-max-blue: #3a4ebd;\n  --cx-reasoning-max-glow: #bd8dff;\n  --cx-reasoning-max-ice: #adaaff;\n  --cx-reasoning-max-text: #b98cff;\n  --cx-reasoning-title: #4c9bfe;\n  /* 浮层/菜单底色：真实录屏帧取色 rgb(45,45,45) */\n  --cx-popover-fill: #2d2d2d;\n\n  /* ---- 阴影 ---- */\n  --cx-shadow-sm: 0 1px 2px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-lg: 0 4px 8px -2px rgb(0 0 0 / 0.1);\n  --cx-shadow-xl: 0 8px 16px -4px rgb(0 0 0 / 0.12);\n  --cx-shadow-2xl: 0 16px 32px -8px rgb(0 0 0 / 0.19);\n  --cx-composer-shadow:\n    0 0 0 0.5px var(--cx-border-strong),\n    0 3px 7.5px rgb(0 0 0 / 0.04),\n    0 0 20px rgb(0 0 0 / 0.05);\n\n  /* ---- z 轴 ---- */\n  --cx-z-ground: 0;\n  --cx-z-panel: 10;\n  --cx-z-floating: 20;\n  --cx-z-drawer: 40;\n  --cx-z-popover: 50;\n  --cx-z-overlay: 70;\n}\n\n/* 浅色只覆盖颜色令牌；深色原值、几何与动效保持不变。\n   data-dsc-color-scheme 由宿主主题状态同步，不通过滤镜改变图像内容。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] {\n  --cx-window: #f3f3f3;\n  --cx-sidebar: #fbfbfb;\n  --cx-surface: #fff;\n  --cx-thread: #fff;\n  --cx-nested: #f5f5f5;\n  --cx-elevated: #fff;\n  --cx-summary: #f3f3f3;\n  --cx-hover: rgba(0, 0, 0, 0.045);\n  --cx-active: rgba(0, 0, 0, 0.065);\n  --cx-border-l1: rgba(0, 0, 0, 0.12);\n  --cx-border-l2: rgba(0, 0, 0, 0.055);\n  --cx-border-l3: rgba(0, 0, 0, 0.18);\n  --cx-border-strong: rgba(0, 0, 0, 0.10);\n  --cx-sidebar-divider: #e9e9e9;\n  --cx-sidebar-divider-hover: #c6c6c6;\n  --cx-frame-line: #dedede;\n  --cx-text: #0d0d0d;\n  --cx-text-2: #505050;\n  --cx-text-3: #898989;\n  --cx-text-4: #ababab;\n  --cx-text-inverse: #fff;\n  --cx-nav-icon: #898989;\n  --cx-sidebar-text: #303030;\n  --cx-sidebar-muted: #898989;\n  --cx-sidebar-selected: #eee;\n  --cx-accent: #2b68cb;\n  --cx-accent-soft: #2b68cb;\n  --cx-link: #2867bc;\n  --cx-focus: #2b68cb;\n  --cx-success: #17834a;\n  --cx-danger: #c93634;\n  --cx-warning: #dd5512;\n  --cx-attention: #2b68cb;\n  --cx-diff-add-bg: rgba(64, 201, 119, 0.14);\n  --cx-diff-del-bg: rgba(255, 103, 100, 0.12);\n  --cx-diff-add-mark: #17834a;\n  --cx-diff-del-mark: #c93634;\n  --cx-picker-fill: #f3f3f3;\n  --cx-composer-fill: #fff;\n  --cx-reasoning-blue: #2b68cb;\n  --cx-reasoning-track: #e5e4e4;\n  --cx-reasoning-title: #2b68cb;\n  --cx-reasoning-max-text: #7744c4;\n  --cx-popover-fill: #fff;\n  --cx-shadow-2xl: 0 8px 24px rgb(0 0 0 / 0.10);\n  --cx-composer-shadow:\n    0 0 0 0.5px #ededed,\n    0 3px 7.5px rgb(0 0 0 / 0.025),\n    0 0 20px rgb(0 0 0 / 0.035);\n}\n\n/* ============ 导航栏 ============ */\n.dsc-rail {\n  grid-area: rail;\n  position: relative;\n  z-index: 30;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 0;\n  background: var(--cx-window);\n  border-right: 1px solid var(--cx-border-l2);\n}\n.dsc-rail__spacer { flex: 1; }\n.dsc-rail__item {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--cx-radius-md);\n  color: var(--cx-nav-icon);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease), color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-rail__item--active { background: var(--cx-active); color: var(--cx-text); }\n/* 插头先以浅灰 #efefef 统一描边，再整体降低透明度，避免相交线段叠色发亮。 */\n.dsc-rail__plugin-icon { color: #efefef; opacity: .5; stroke-width: 1.5; transition: opacity var(--cx-dur-fast) var(--cx-ease); }\n.dsc-rail__item:hover .dsc-rail__plugin-icon,\n.dsc-rail__item--active .dsc-rail__plugin-icon { opacity: 1; color: #fcfcfc; }\n.dsc-rail__item::after {\n  content: attr(data-tip);\n  position: absolute;\n  left: 44px;\n  top: 50%;\n  z-index: var(--cx-z-popover);\n  padding: 4px 8px;\n  border-radius: var(--cx-radius-sm);\n  border: 1px solid var(--cx-border-l1);\n  background: #2b2b2b;\n  color: var(--cx-text);\n  font-size: 12px;\n  line-height: 16px;\n  white-space: nowrap;\n  box-shadow: var(--cx-shadow-lg);\n  opacity: 0;\n  transform: translateY(-50%) translateX(-2px);\n  pointer-events: none;\n  transition: opacity var(--cx-dur-fast) var(--cx-ease), transform var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover::after { opacity: 1; transform: translateY(-50%) translateX(0); }\n\n/* ============ 侧栏 ============ */\n.dsc-sidebar {\n  grid-area: sidebar;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 8px;\n  background: var(--cx-sidebar);\n  border-right: 1px solid var(--cx-border-l2);\n  overflow: hidden;\n}\n.dsc-sidebar__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 44px;\n  margin: -8px -8px 6px;\n  padding: 0 6px 0 10px;\n}\n.dsc-brand { display: flex; align-items: center; gap: 7px; }\n.dsc-brand__mark { display: block; height: 19px; width: auto; }\n.dsc-brand__wordmark {\n  font-size: 17px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--cx-sidebar-text);\n  line-height: 1;\n}\n.dsc-brand__badge {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  line-height: 1;\n  padding: 3px 5px 2px;\n  border-radius: 3px;\n  background: var(--cx-text);\n  color: var(--cx-window);\n}\n.dsc-sidebar__header-actions { display: flex; align-items: center; gap: 2px; }\n.dsc-new-chat {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 32px;\n  padding: 0 8px;\n  border-radius: var(--cx-radius-md);\n  font-size: 13px;\n  font-weight: var(--cx-weight-medium);\n  color: var(--cx-sidebar-text);\n  background: var(--cx-active);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-new-chat:hover { background: rgba(255, 255, 255, 0.12); }\n.dsc-new-chat kbd { margin-left: auto; font-size: 11px; color: var(--cx-sidebar-muted); }\n\n/* 浅色导航的插件线条保留原图形，深色提示仍为黑底白字。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-rail__plugin-icon { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-rail__item--active .dsc-rail__plugin-icon { color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-rail__item[data-tip]::after { background: #0d0d0d; color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-new-chat:hover { background: rgba(0, 0, 0, .06); }\n\n/* 自有组件与公开 slot/region 锚点；外壳几何适配通过自有 data-dsc-* 标记集中处理。 */\nbody[data-dsh-codex-style] { background: var(--cx-window); color-scheme: dark; --shiki-token-constant: #4dabf7; --shiki-token-string: #69db7c; --shiki-token-comment: #adb5bd; --shiki-token-keyword: #faa2c1; --shiki-token-function: #b197fc; }\n/* 整个三列外壳实际缩窄 52px，让宿主 ResizeObserver、右栏与拖拽使用同一可用宽度。\n   不能用 padding-left 代替：宿主测量的是 getBoundingClientRect().width。 */\nbody[data-dsh-codex-chrome] [data-dsc-frame] { margin-left: var(--cx-rail-w); width: calc(100% - var(--cx-rail-w)); }\n/* 全屏右栏原本按 100vw 展开；扣掉独立导航后，继续尊重宿主二级侧栏的真实宽度。 */\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame] [data-sidebar-right-panel=\"fullscreen\"] { max-width: max(0px, calc(100vw - var(--cx-rail-w) - var(--dsh-windows-sidebar-width, 0px))); }\n/* data-slot 与公开 data-* 标记作为外观边界；编辑器、输入状态和动作仍由宿主持有。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] { --dsw-specific-input-major: var(--cx-composer-fill); --dsw-radius-panel: var(--cx-radius-composer); --dsw-alias-border-l2: var(--cx-border-strong); --dsw-elevation-soft: var(--cx-composer-shadow); --dsh-composer-card-max-width: calc(var(--cx-composer-stack-w) - 32px); }\n/* 单行卡片按截图为 736×98；输入区保留自然增高，发送/停止不改变工具行高度。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] > :has(> [data-composer-card]) { width: 100%; padding: 0; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] { min-height: var(--cx-composer-h); }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-input] { min-height: 42px; padding-left: 12px; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-placeholder] { left: 12px; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-dock] { display: flex; box-sizing: border-box; min-height: 20px; padding-top: 2px; }\n/* “+”沿用原生命令入口；悬停圆底与提示颜色按用户 Codex 截图校准。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:hover:not(:disabled) { background: #454545; }\nbody[data-dsh-codex-style]:has([data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:is(:hover,:focus-visible):not(:disabled)) [role=\"tooltip\"] { background: #2d2d2d; color: #dfdfdf; }\n/* 顶部工作区/模式只改触发器轮廓，菜单和宿主动作继续沿用。 */\nbody[data-dsh-codex-style] :is([data-slot=\"conversation.hero.workspace\"],[data-slot=\"conversation.hero.agentPreset\"]) button { border-radius: 999px; corner-shape: round; }\n/* 所有提交状态共享占位；保留原提交/中断回调、Tooltip 和快捷键。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"], [aria-label=\"停止生成\"], [aria-label=\"Stop generating\"], [data-sending]) { box-sizing: border-box; flex: none; display: grid; place-items: center; width: 28px; height: 28px; min-width: 0; padding: 0; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"], [aria-label=\"停止生成\"], [aria-label=\"Stop generating\"], [data-sending]) svg { width: 14px; height: 14px; }\n/* 中英文发送标签；保留宿主提交与禁用状态。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]) { --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; color: #363636; opacity: 1; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]):disabled { --dsw-alias-button-info-fill: #8b8b8b; }\n/* 停止生成复用宿主按钮与中断动作；普通态、悬停态均为参考图的浅灰圆底和深灰方块。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) { --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; color: #2d2d2d; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) svg rect { rx: 1.5px; }\n/* 新版宿主在提交窗口把按钮换成 34px 蓝底 + data-sending；这里统一为发送/停止的 28px 灰底，环由伪元素绘制，宿主 disabled/Tooltip/回调保持。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending] { position: relative; --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; background: #dfdfdf; color: #363636; opacity: 1; }\n/* 隐藏宿主 16px 白色环并停掉它自己的 .8s 动画，避免与下方 1.7s 灰环双转。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending] > svg { visibility: hidden; animation: none; }\n/* 14px 槽位内 12px 外径、1.5px 线宽；360° 连续深浅灰渐变环，顺时针 1.7s。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending]::before { content: \"\"; position: absolute; inset: 0; margin: auto; width: 12px; height: 12px; border-radius: 50%; pointer-events: none; background: conic-gradient(from 0deg, #b8b8b8 0deg, #363636 270deg 360deg); -webkit-mask: radial-gradient(circle closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px)); mask: radial-gradient(circle closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px)); animation: dsc-composer-sending-spin 1.7s linear infinite; }\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending]::before { animation: none; }\n}\n@keyframes dsc-composer-sending-spin { to { transform: rotate(360deg); } }\n/* 正文字体颜色：第 134 轮按新版 Codex 默认主题取 #fcfcfc（原 #dfdfdf 偏暗）。仅覆盖对话内容区，不影响按钮、菜单等其它主文本。 */\nbody[data-dsh-codex-style] [data-conversation-content] { --dsw-alias-label-primary: var(--cx-text); --dsw-alias-link: var(--cx-link); }\n/* 正文列随输入卡宽度对齐，隐藏宿主两侧的宽度拖拽柄及其整条命中区域。 */\nbody[data-dsh-codex-style] [data-conversation-content] > [data-width-handle] { display: none; }\n/* 原 sidebar/settings 父级继续挂载以保留原生页面与子槽位所有权；只隐藏其旧外观。 */\nbody[data-dsh-codex-chrome] [data-slot=\"sidebar\"] { display: block !important; position: relative; width: 100%; height: 100%; visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-slot=\"conversation.composer.bar\"] { --dsh-composer-side-clearance: 0px; display: flex !important; flex-direction: column; align-items: stretch; align-self: center; width: min(calc(100% - 32px), var(--dsh-composer-card-max-width)); max-width: var(--dsh-composer-card-max-width); position: relative; }\nbody[data-dsh-codex-chrome] [data-conversation-region=\"composer\"] :has(> [data-slot=\"conversation.composer.bar\"]) { width: 100%; align-self: stretch; padding-bottom: 0; gap: 0; }\n/* 两侧等量保留原生滚动条空间，使空态与会话中的输入卡共用同一中线。 */\nbody[data-dsh-codex-chrome] [data-conversation-content] > [data-conversation-scroll] { scrollbar-gutter: stable both-edges; margin-right: 0; }\n/* 空态保留官方编辑器、草稿、附件、“+”与 chain；没有重建输入状态或移动节点。 */\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] { visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-region=\"composer\"] { position: absolute; inset: auto var(--dsh-scrollbar-width, 15px) 0; z-index: 7; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.composer.bar\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.input.dock\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-composer-overlay] { visibility: visible; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"][data-dsc-hero-layout] [data-slot=\"conversation.hero.agentPreset\"] { visibility: visible; display: inline-flex !important; position: fixed; top: calc(var(--dsc-hero-card-top) - 33px); right: calc(100vw - var(--dsc-hero-card-right) + 18px); z-index: 8; height: 28px; max-width: 180px; }\n.dsc-ui { font: 14px/22px var(--cx-font-sans); color: var(--cx-text); box-sizing: border-box; }\n.dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { box-sizing: border-box; }\n.dsc-ui button, .dsc-ui input { font: inherit; color: inherit; }\n.dsc-ui button { border: 0; cursor: pointer; background: none; }\n.dsc-ui button:disabled { cursor: default; opacity: .45; }\n.dsc-ui button:focus-visible, .dsc-ui [role=slider]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: 2px; }\n.dsc-ui svg { flex: none; }\n.dsc-update-control { display: inline-flex; align-items: center; gap: 12px; -webkit-app-region: no-drag; }\n.dsc-update-download { display: inline-flex; align-items: center; gap: 8px; }\n.dsc-update-progress { display: block; width: 112px; height: 5px; overflow: hidden; border-radius: 999px; background: #ffffff1f; }\n.dsc-update-progress-fill { display: block; width: 100%; height: 100%; border-radius: inherit; background: #72b4ff; transform-origin: left; transition: transform 180ms ease; }\n.dsc-update-progress[data-indeterminate=true] .dsc-update-progress-fill { width: 32%; animation: dsc-update-download 1.2s ease-in-out infinite; }\n.dsc-update-progress-label { min-width: 34px; color: var(--cx-text-2); font-size: 12px; font-variant-numeric: tabular-nums; }\n@keyframes dsc-update-download { from { transform: translateX(-110%); } to { transform: translateX(410%); } }\n.dsc-update-notice { position: fixed; right: 24px; bottom: 24px; width: 320px; max-width: calc(100vw - 32px); padding: 14px; z-index: 10000; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; animation: dsc-pop-in 130ms ease both; -webkit-app-region: no-drag; }\n/* 社区版运行提醒：固定右下角，位于更新通知之上；窄窗不超出视口，复用弹层与文本 token。 */\n.dsc-community-notice { position: fixed; right: 24px; bottom: 24px; z-index: 10001; box-sizing: border-box; width: max-content; max-width: min(420px, calc(100vw - 48px)); padding: 12px 16px; border: 1px solid var(--cx-border-l1); border-radius: 14px; background: var(--cx-popover-fill); color: var(--cx-text); font-size: 13px; line-height: 20px; box-shadow: var(--cx-shadow-2xl); animation: dsc-pop-in 130ms ease both; -webkit-app-region: no-drag; }\n.dsc-community-notice-text { display: block; }\n@media (prefers-reduced-motion: reduce) { .dsc-community-notice { animation: none; } }\n/* 归档成功提示：顶部居中；入场 160ms，退场 1000ms（与 client.js ARCHIVE_NOTICE_FADE_MS 对应）。 */\n.dsc-ui.dsc-archive-notice { position: fixed; top: 40px; left: 50%; z-index: 10001; display: flex; align-items: center; gap: 8px; width: max-content; max-width: calc(100vw - 32px); padding: 7px 8px 7px 12px; border: 1px solid var(--cx-border-l1); border-radius: var(--cx-radius-lg); background: var(--cx-popover-fill); color: var(--cx-text); font-size: 13px; line-height: 18px; box-shadow: var(--cx-shadow-2xl); transform: translate(-50%, 0); animation: dsc-archive-notice-in 160ms ease both; -webkit-app-region: no-drag; }\n.dsc-ui.dsc-archive-notice[data-phase=leaving] { animation: dsc-archive-notice-out 1000ms ease both; }\n.dsc-archive-notice-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; }\n.dsc-archive-notice-text { color: var(--cx-text); white-space: nowrap; }\n.dsc-archive-notice-error { color: var(--cx-danger); font-size: 12px; line-height: 17px; overflow-wrap: anywhere; }\n.dsc-ui .dsc-archive-notice-undo { display: inline-flex; align-items: center; flex: none; height: 24px; padding: 0 9px; border-radius: var(--cx-radius-sm); color: var(--cx-accent-soft); font-size: 13px; }\n.dsc-ui .dsc-archive-notice-undo:hover:not(:disabled) { background: var(--cx-active); color: var(--cx-text); }\n.dsc-ui .dsc-archive-notice-close { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 24px; height: 24px; padding: 0; border-radius: var(--cx-radius-sm); color: var(--cx-text-3); }\n.dsc-ui .dsc-archive-notice-close:hover, .dsc-ui .dsc-archive-notice-close:focus-visible { background: var(--cx-hover); color: var(--cx-text); }\n@keyframes dsc-archive-notice-in { from { opacity: 0; transform: translate(-50%, -6px); } to { opacity: 1; transform: translate(-50%, 0); } }\n@keyframes dsc-archive-notice-out { from { opacity: 1; transform: translate(-50%, 0); } to { opacity: 0; transform: translate(-50%, -6px); } }\n@media (prefers-reduced-motion: reduce) { .dsc-ui.dsc-archive-notice, .dsc-ui.dsc-archive-notice[data-phase=leaving] { animation: none; } }\n.dsc-ui.dsc-update-panel { padding: 14px; }\n.dsc-update-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }\n.dsc-ui .dsc-update-close { display: grid; place-items: center; width: 24px; height: 24px; padding: 0; border-radius: 6px; color: var(--cx-text-2); }\n.dsc-update-close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-update-message { margin: 14px 0 10px; font-weight: 500; }\n.dsc-update-message[data-state=update] { color: #72b4ff; }\n.dsc-update-message[data-state=error] { color: #ff8585; }\n.dsc-update-versions { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; margin: 0; font-size: 13px; }\n.dsc-update-versions dt { color: var(--cx-text-2); }\n.dsc-update-versions dd { margin: 0; text-align: right; overflow-wrap: anywhere; }\n.dsc-update-note { margin: 10px 0 0; color: var(--cx-text-2); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }\n.dsc-update-note > span { display: block; color: var(--cx-text-3); }\n.dsc-ui .dsc-update-retry { margin-top: 14px; padding: 5px 10px; border: 1px solid var(--cx-border-l3); border-radius: 7px; }\n.dsc-update-retry:hover { background: var(--cx-hover); }\n.dsc-update-spin { animation: dsc-update-spin .9s linear infinite; }\n@keyframes dsc-update-spin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) { .dsc-update-spin, .dsc-update-progress-fill { animation: none !important; transition: none; } }\n.dsc-proto-icon { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 1; }\n.dsc-proto-icon svg { display: block; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n/* 同一内容 portal 到 body：常驻时跟随宿主列，退场与浮卡不受 0px 列裁剪。只动画透明度和位移。 */\n.dsc-sidebar-shell { visibility: hidden; position: fixed; z-index: 20; min-width: 0; min-height: 0; display: flex; opacity: 0; transform: translateX(-24px); pointer-events: none; transition: opacity 180ms ease, transform 240ms var(--cx-ease-out), visibility 0s 240ms; -webkit-app-region: no-drag; }\n.dsc-sidebar-shell[data-open=true] { visibility: visible; opacity: 1; transform: translateX(0); pointer-events: auto; transition: opacity 180ms ease, transform 260ms var(--cx-ease-out), visibility 0s; }\n.dsc-sidebar-shell[data-mode=docked] > .dsc-sidebar { border-top-left-radius: var(--cx-frame-radius); border-bottom-left-radius: var(--cx-frame-radius); border-right-color: transparent; corner-shape: round; }\n/* rc.2/rc.3 原生 DragHandle 的公开 data-side 保留指针捕获与宽度动作。\n   热区仍为原生 8px；抬到常驻侧栏 portal 之上，避免左半边被遮住。\n   只绘制伪元素，不增加占位；悬停/拖动用 transform 加粗，移出恢复。 */\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"] { z-index: 21; }\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]::after { content: ''; position: absolute; top: 0; bottom: 0; left: calc(50% - 1px); width: 1px; background: var(--cx-sidebar-divider); transform: scaleX(1); transform-origin: right center; pointer-events: none; transition: background-color var(--cx-dur-fast) var(--cx-ease), transform var(--cx-dur-fast) var(--cx-ease); }\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]:is(:hover,[data-dragging])::after { background: var(--cx-sidebar-divider-hover); transform: scaleX(1.5); }\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]::after { transition: none; }\n}\n.dsc-sidebar-shell[data-mode=floating] { z-index: 40; transform: translateX(-12px); transition: opacity 150ms ease, transform 180ms var(--cx-ease-out), visibility 0s 180ms; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] { transform: translateX(0); transition-delay: 0s; }\n.dsc-sidebar-shell[data-mode=floating]::before { content: ''; position: absolute; top: 0; bottom: 0; left: -12px; width: 12px; }\n.dsc-sidebar-shell[data-mode=floating] > .dsc-sidebar { --cx-sidebar: #2c2c2c; border: 1px solid var(--cx-border-l1); border-radius: 12px; box-shadow: 0 0 0 3px #18181880, 0 8px 28px #0005; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] > .dsc-sidebar { animation: dsc-sidebar-content-in 150ms var(--cx-ease-out) both; }\n@keyframes dsc-sidebar-content-in { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }\n.dsc-independent-rail { visibility: visible; position: fixed; top: var(--dsh-frame-chrome-top, 0px); bottom: 0; left: 0; width: var(--cx-rail-w); z-index: 25; min-height: 0; padding-bottom: 56px; -webkit-app-region: no-drag; }\n/* 外框左缘由常驻 frame 的单条描边统一绘制；原生 1px 边框保留宽度但不再着色，避免出现第二条线。 */\nbody[data-dsh-codex-chrome] .dsc-independent-rail { border-right-color: transparent; background-clip: padding-box; }\n.dsc-extension-navigation-anchor { flex: 1; align-self: stretch; min-height: 0; }\n/* 原生 panellist 继续负责图标注入、选中态、点击和卸载；只重排其可见区域。\n   位置来自自有轨道的剩余空间，超高时独立滚动，不覆盖底部齿轮。\n   Windows 原样式在 collapsed 时 display:none，并在开合时淡出，故明确覆盖这两项。 */\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] { visibility: visible; display: flex !important; position: fixed; left: var(--dsc-extension-left); top: var(--dsc-extension-top); width: var(--dsc-extension-width); max-height: var(--dsc-extension-height); min-height: 0; z-index: 26; flex-direction: column; align-items: center; gap: 4px !important; padding: 0; margin: 0 !important; box-sizing: border-box; overflow-x: hidden; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #ffffff26 transparent; opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-hidden] { display: none !important; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row] { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; min-height: 36px; padding: 0; margin: 0; border: 0; border-radius: var(--cx-radius-md); background: transparent; color: var(--cx-nav-icon); cursor: pointer; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:hover { color: var(--cx-text); background: var(--cx-hover); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row][aria-current=page] { color: var(--cx-text); background: var(--cx-active); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-label] { display: none; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] { display: inline-flex; align-items: center; justify-content: center; line-height: 1; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] svg { display: block; max-width: 20px; max-height: 20px; }\n.dsc-navigation-error { position: fixed; left: calc(var(--cx-rail-w) + 8px); top: var(--dsh-frame-overlay-top, 20px); z-index: 50; max-width: 320px; }\n.dsc-rail .dsc-rail__item { color: var(--cx-nav-icon); background: transparent; flex: none; padding: 0; }\n.dsc-rail .dsc-rail__item:hover { color: var(--cx-text); background: var(--cx-hover); }\n.dsc-rail .dsc-rail__item--active { color: var(--cx-text); background: var(--cx-active); }\n.dsc-rail__item[data-preview-enabled=true]::after { display: none; }\n.dsc-rail__item[data-dsc-preview-trigger=more]::after { display: block; }\n.dsc-rail__item[data-dsc-preview-trigger=more]:focus-visible::after { opacity: 1; transform: translateY(-50%) translateX(0); }\n.dsc-sidebar { flex: 1; min-width: 0; min-height: 0; overflow: hidden; }\n.dsc-sidebar .dsc-sidebar__header { flex: none; }\n.dsc-sidebar .dsc-brand { min-width: 0; gap: 6px; }\n.dsc-sidebar .dsc-brand__mark { height: 19px; max-width: 25px; }\n.dsc-sidebar .dsc-brand__badge { font-size: 8px; padding: 3px 4px 2px; }\n.dsc-sidebar .dsc-sidebar__header-actions { margin-left: auto; }\n/* 用户截图灰度：品牌字标与徽章浅底压低亮度，鲸鱼标识仅以透明度匹配；不改全局正文。 */\n.dsc-sidebar .dsc-brand__mark { opacity: .72; }\n.dsc-sidebar .dsc-brand__wordmark { color: var(--cx-sidebar-text); }\n.dsc-sidebar .dsc-brand__badge { background: #b8b8b8; }\n/* Codex：新聊天默认无底色、不显示快捷键，仅悬停时出现灰色背景。 */\n.dsc-sidebar .dsc-new-chat { flex: none; justify-content: flex-start; width: 100%; font-size: 13px; font-weight: var(--cx-weight-medium); background: transparent; color: var(--cx-sidebar-text); margin-bottom: 8px; }\n.dsc-sidebar .dsc-new-chat:hover { background: rgba(255,255,255,.08); }\n.dsc-sidebar .dsc-workspaces { flex: 1; min-height: 0; height: auto; }\n/* 同时限定两个自有类，避免后面的通用 .dsc-search 把它重新变成伸展项。 */\n.dsc-search.dsc-sidebar-search { flex: none; height: 32px; margin: 2px 0 8px; min-height: 32px; }\n.dsc-sidebar-search button { padding: 0 3px; }\n/* 搜索图标与清除键：恢复被 `.dsc-ui button {color: inherit}` 覆盖的自有灰阶。 */\n.dsc-sidebar .dsc-sidebar-search button { color: var(--cx-sidebar-muted); }\n.dsc-sidebar .dsc-sidebar-search button:hover, .dsc-sidebar .dsc-sidebar-search button:focus-visible { color: var(--cx-sidebar-text); }\n.dsc-sidebar .dsc-tree-tools { justify-content: space-between; padding: 12px 0 4px 8px; }\n.dsc-tree-tools-label { font-size: 12px; color: var(--cx-sidebar-muted); }\n.dsc-projects-toggle { display: flex; align-items: center; gap: 4px; height: 28px; padding: 0; }\n.dsc-projects-toggle svg { color: var(--cx-sidebar-muted); transform: rotate(-90deg); transition: transform 180ms ease; }\n.dsc-projects-toggle[aria-expanded=true] svg { transform: rotate(0); }\n.dsc-sidebar .dsc-tree-scroll { padding: 0; scrollbar-color: #ffffff26 transparent; scrollbar-width: thin; }\n.dsc-section-page-title { font-size: 17px; font-weight: 600; }\n.dsc-secondary-nav { display: flex; flex-direction: column; gap: 4px; min-height: 0; overflow: auto; padding-top: 6px; }\n.dsc-secondary-nav .dsc-secondary-item { display: flex; align-items: center; gap: 8px; min-height: 32px; width: 100%; padding: 0 8px; border-radius: var(--cx-radius-md); text-align: left; color: var(--cx-text-2); font-size: 13px; }\n.dsc-secondary-nav .dsc-secondary-item.is-active, .dsc-secondary-nav .dsc-secondary-item:hover { background: var(--cx-active); color: var(--cx-text); }\n.dsc-secondary-item .dsc-proto-icon svg { width: 16px; height: 16px; }\n/* 「更多」main 页面：与正文同色的空白页。 */\n.dsc-more-page { box-sizing: border-box; width: 100%; height: 100%; min-height: 100%; background: #181818; }\n.dsc-window-sidebar-toggle { visibility: visible; position: fixed; top: 6px; left: 12px; z-index: 35; -webkit-app-region: no-drag; }\n.dsc-collapsed-new-chat { display: none; align-items: center; margin-right: 8px; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] .dsc-collapsed-new-chat { display: flex; }\n.dsc-collapsed-new-chat .dsc-icon-button { width: 28px; height: 28px; color: var(--cx-sidebar-muted); }\n.dsc-collapsed-new-chat .dsc-icon-button:hover, .dsc-collapsed-new-chat .dsc-icon-button:focus-visible { color: var(--cx-sidebar-text); }\n/* 会话标题左侧常驻 leading：工作区标识与“仅收起显示”的新建按钮分离；无工作区时不留空位。 */\n.dsc-header-leading { display: flex; align-items: center; gap: 4px; min-width: 0; -webkit-app-region: no-drag; }\n.dsc-header-leading > .dsc-collapsed-new-chat { order: -1; }\n.dsc-workspace-mark { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 28px; height: 28px; border-radius: 7px; color: #dfdfdf; cursor: default; -webkit-app-region: no-drag; }\n.dsc-workspace-mark:focus-visible { outline: 1px solid #ffffff40; outline-offset: -1px; }\n/* 深灰圆角提示 portal 到 body，避免 header 裁剪；同一元素不设原生 title。 */\n.dsc-ui.dsc-workspace-tooltip { position: fixed; z-index: 10002; transform: translate(-50%, -100%); max-width: calc(100vw - 16px); overflow: hidden; padding: 5px 11px; border: 1px solid #ffffff08; border-radius: 12px; background: #2d2d2d; color: #dfdfdf; font-size: 13px; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; box-shadow: 0 2px 5px #0002; pointer-events: none; -webkit-app-region: no-drag; }\n.dsc-gear-launcher { visibility: visible; position: fixed; left: 8px; bottom: 12px; z-index: 35; }\n.dsc-gear-launcher .dsc-gear-button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: var(--cx-radius-md); color: var(--cx-sidebar-muted); }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: var(--cx-hover); color: var(--cx-sidebar-text); }\n/* 自绘悬停提示，避免系统 title 突然出现；菜单打开时不叠加提示。 */\n.dsc-gear-launcher .dsc-gear-button { position: relative; isolation: isolate; transition: color 150ms ease; }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: none; }\n.dsc-gear-button::before { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--cx-hover); opacity: 0; transition: opacity 150ms ease; pointer-events: none; }\n.dsc-gear-button:hover::before, .dsc-gear-button[aria-expanded=true]::before, .dsc-gear-button:focus-visible::before { opacity: 1; }\n.dsc-gear-button::after { content: attr(aria-label); position: absolute; left: calc(100% + 8px); top: 50%; padding: 5px 9px; border: 1px solid var(--cx-border-l1); border-radius: 7px; background: var(--cx-popover-fill); color: var(--cx-text); font-size: 12px; line-height: 18px; white-space: nowrap; box-shadow: 0 4px 12px #0004; pointer-events: none; opacity: 0; transform: translate(-3px, -50%); transition: opacity 150ms ease, transform 150ms ease; }\n.dsc-gear-button[aria-expanded=false]:hover::after, .dsc-gear-button[aria-expanded=false]:focus-visible::after { opacity: 1; transform: translate(0, -50%); }\n/* DSH 本体更新：齿轮正上方 36px 透明按钮内嵌 24px 蓝圆；仅在插件外壳生效时出现，原生侧栏指示器随宿主侧栏一同隐藏。 */\n.dsc-desktop-update-launcher { display: none; position: fixed; left: 8px; bottom: 52px; z-index: 35; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] .dsc-desktop-update-launcher { display: block; }\nbody[data-dsh-codex-chrome]:has(.dsc-desktop-update) .dsc-independent-rail { padding-bottom: 96px; }\n.dsc-desktop-update { position: relative; }\n.dsc-ui .dsc-desktop-update-button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: var(--cx-radius-md); transition: background-color 150ms ease; }\n.dsc-ui .dsc-desktop-update-button:hover, .dsc-ui .dsc-desktop-update-button:focus-visible { background: var(--cx-hover); }\n.dsc-ui .dsc-desktop-update-button[aria-disabled=true] { cursor: default; }\n.dsc-desktop-update-dot { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--cx-accent-soft); color: #fff; }\n.dsc-desktop-update-ring { transition: stroke-dasharray 240ms ease; }\n.dsc-desktop-update-tip { position: absolute; left: calc(100% + 8px); top: 50%; display: flex; flex-direction: column; gap: 2px; min-width: max-content; padding: 6px 10px; border: 1px solid var(--cx-border-l1); border-radius: 10px; background: var(--cx-popover-fill); color: var(--cx-text-2); font-size: 12px; line-height: 18px; white-space: nowrap; box-shadow: 0 4px 12px #0004; pointer-events: none; opacity: 0; transform: translate(-3px, -50%); transition: opacity 150ms ease, transform 150ms ease; }\n.dsc-desktop-update-tip strong { color: var(--cx-text); font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; }\n.dsc-desktop-update-tip .dsc-update-progress { margin-top: 5px; }\n.dsc-desktop-update:hover .dsc-desktop-update-tip, .dsc-desktop-update:focus-within .dsc-desktop-update-tip { opacity: 1; transform: translate(0, -50%); }\n@media (prefers-reduced-motion: reduce) { .dsc-desktop-update-ring, .dsc-desktop-update-tip { transition: none; } }\n.dsc-app-menu { padding: 5px; }\n.dsc-menu-separator { height: 1px; margin: 4px 6px; background: var(--cx-border-l1); }\n.dsc-app-menu .dsc-account-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px; text-align: left; border-radius: var(--cx-radius-md); }\n.dsc-account-row:hover { background: var(--cx-active); }\n.dsc-account-row > img, .dsc-account-avatar { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--cx-active); object-fit: cover; }\n.dsc-account-row > span:last-child { display: flex; flex-direction: column; min-width: 0; }\n.dsc-account-row strong { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-account-row small { font-size: 11px; color: var(--cx-text-3); }\n/* 齿轮菜单上方的第三方入口分组：宿主 footer.action 原生节点原样呈现；关闭后标记/变量全部移除。 */\nbody[data-dsh-codex-chrome] [data-dsc-app-footer-base] { display: flex !important; flex-direction: column; }\nbody[data-dsh-codex-chrome] [data-dsc-app-footer-host] {\n  visibility: visible !important;\n  position: fixed !important;\n  left: var(--dsc-app-footer-left);\n  bottom: var(--dsc-app-footer-bottom);\n  width: var(--dsc-app-footer-width);\n  max-height: max(48px, var(--dsc-app-footer-max-height, calc(100vh - var(--dsc-app-footer-bottom) - 8px)));\n  box-sizing: border-box;\n  display: flex !important;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0 !important;\n  padding: 5px !important;\n  overflow-x: hidden;\n  overflow-y: auto;\n  background: var(--cx-popover-fill);\n  border: 1px solid var(--cx-border-l1);\n  border-radius: 14px;\n  box-shadow: 0 12px 36px #0007;\n  z-index: 9999;\n  scrollbar-width: thin;\n  scrollbar-color: #ffffff26 transparent;\n  -webkit-app-region: no-drag;\n}\nbody[data-dsh-codex-chrome] [data-dsc-app-footer-host] [data-dsc-app-footer-entry] { flex: none; width: 100% !important; min-width: 0; }\nbody[data-dsh-codex-chrome] [data-dsc-app-footer-host] [data-dsc-app-footer-entry] button { width: 100% !important; min-width: 0; justify-content: flex-start !important; }\n/* 宿主收起态对 footer 入口只渲染图标（第三方按 wide=false 省略文字节点）；\n   分组里用按钮的无障碍名称补一个可见标签，展开态有原生文字时不会命中。 */\nbody[data-dsh-codex-chrome] [data-dsc-app-footer-host] [data-dsc-app-footer-entry] button[data-dsc-app-footer-label]::after {\n  content: attr(data-dsc-app-footer-label);\n  min-width: 0;\n  margin-left: 8px;\n  overflow: hidden;\n  color: inherit;\n  font-size: 14px;\n  line-height: 20px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n/* 分组位于宿主侧栏列层叠上下文（z-index:21）内，低于自有 rail（25）。\n   菜单打开期间只让 rail 中与分组重叠的竖向区段放行，其余区域仍由透明命中层挡住，\n   避免点击穿透到下面的侧栏内容；按钮本身保持可点，重叠的图标临时隐藏。 */\n.dsc-rail-hitblock { display: none; position: absolute; inset: 0; z-index: 0; pointer-events: auto; }\nbody[data-dsh-codex-chrome] .dsc-independent-rail[data-dsc-app-footer-clear] { pointer-events: none; }\nbody[data-dsh-codex-chrome] .dsc-independent-rail[data-dsc-app-footer-clear] .dsc-rail-hitblock { display: block; clip-path: inset(0 0 calc(100% - var(--dsc-app-footer-clear-top, 100%)) 0); }\nbody[data-dsh-codex-chrome] .dsc-independent-rail[data-dsc-app-footer-clear] .dsc-rail__item { position: relative; z-index: 1; pointer-events: auto; }\nbody[data-dsh-codex-chrome] .dsc-independent-rail [data-dsc-app-footer-clear-item] { opacity: 0 !important; pointer-events: none !important; }\n.dsc-empty-hero { visibility: visible; position: fixed; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 24px; transform: translate(-50%,-50%); pointer-events: none; }\n.dsc-empty-hero svg { color: #525252; }\n.dsc-empty-hero h1 { font-size: 26px; line-height: 34px; font-weight: 400; color: var(--cx-text-2); margin: 0; white-space: nowrap; }\n.dsc-hero-projectbar { visibility: visible; position: fixed; z-index: 6; height: calc(var(--cx-picker-h) + var(--cx-radius-composer)); padding: 4px 4px var(--cx-radius-composer); background: var(--cx-picker-fill); border-radius: 20px; }\n.dsc-hero-projectbar .dsc-project-picker { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; max-width: calc(100% - 180px); color: var(--cx-text-2); font-size: 13px; border-radius: var(--cx-radius-full); corner-shape: round; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-hero-projectbar .dsc-project-picker:hover, .dsc-hero-projectbar .dsc-project-picker[aria-expanded=true] { background: var(--cx-active); }\n.dsc-brand-mark { width: 25px; height: 20px; object-fit: contain; }\n.dsc-brand { display: inline-flex; align-items: center; gap: 7px; }\n.dsc-brand strong { font-size: 17px; letter-spacing: -.02em; }\n.dsc-brand small { font: 700 8px/16px var(--cx-font-sans); letter-spacing: .12em; padding: 0 4px; color: #131313; background: #eee; border-radius: 3px; }\n.dsc-settings-trigger { display: inline-flex; gap: 8px; align-items: center; }\n.dsc-workspaces { height: 100%; min-height: 0; width: 100%; display: flex; flex-direction: column; background: var(--cx-sidebar); }\n.dsc-tree-tools { display: flex; gap: 4px; align-items: center; padding: 6px 8px 12px; }\n.dsc-search { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; border-radius: 8px; background: #ffffff08; padding: 3px 8px; color: var(--cx-sidebar-muted); }\n.dsc-search input { min-width: 0; width: 100%; border: 0; outline: none; background: none; font-size: 12px; }\n.dsc-search:focus-within { box-shadow: 0 0 0 1px var(--cx-border-l3); }\n.dsc-search input::placeholder { color: var(--cx-sidebar-muted); }\n.dsc-icon-button { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 7px; color: var(--cx-text-2); }\n.dsc-icon-button:hover { background: var(--cx-active); }\n/* 用户截图灰度：自有侧栏图标常态 #8f8f8f、悬停/键盘聚焦 #b4b4b4；禁用沿用父级透明度。 */\n.dsc-sidebar .dsc-icon-button { color: var(--cx-sidebar-muted); }\n.dsc-sidebar .dsc-icon-button:hover, .dsc-sidebar .dsc-icon-button:focus-visible { color: var(--cx-sidebar-text); }\n.dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button { color: var(--cx-sidebar-muted); }\n.dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button:hover, .dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button:focus-visible { color: var(--cx-sidebar-text); }\n.dsc-tree-scroll { flex: 1; min-height: 0; overflow: auto; scrollbar-width: thin; padding: 0 8px; }\n.dsc-section-title { padding: 12px 8px 6px; font-size: 12px; font-weight: 500; color: var(--cx-sidebar-muted); }\n.dsc-thread, .dsc-project { display: flex; align-items: center; height: 30px; border-radius: 7px; position: relative; }\n.dsc-thread:hover, .dsc-project:hover, .dsc-thread.is-active { background: #ffffff0d; }\n.dsc-thread.is-active { background: var(--cx-sidebar-selected); }\n.dsc-ui .dsc-thread-main, .dsc-ui .dsc-project-main { display: flex; flex: 1; align-items: center; gap: 7px; min-width: 0; height: 100%; padding: 0 8px; text-align: left; color: var(--cx-sidebar-text); }\n.dsc-thread-title, .dsc-project-main > span { min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-ui .dsc-thread-main { padding-right: 62px; }\n.dsc-thread-title-text { display: inline-block; width: max-content; max-width: none; vertical-align: top; }\n.dsc-thread-title[data-overflow=true] { text-overflow: clip; mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent); }\n.dsc-thread:hover .dsc-thread-title[data-overflow=true] .dsc-thread-title-text,\n.dsc-thread-main:focus-visible .dsc-thread-title[data-overflow=true] .dsc-thread-title-text { animation: dsc-title-scroll var(--dsc-title-duration) linear 250ms infinite alternate; }\n@keyframes dsc-title-scroll { from { transform: translateX(0); } to { transform: translateX(var(--dsc-title-shift)); } }\n.dsc-thread-time { position: absolute; right: 9px; font-size: 10px; color: var(--cx-sidebar-muted); transition: opacity 120ms ease; }\n.dsc-thread-completion { position: absolute; right: 9px; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: #4c9bfe; transform: translateY(-50%); pointer-events: none; }\n.dsc-thread-running { position: absolute; right: 9px; top: 50%; display: grid; place-items: center; width: 12px; height: 12px; color: var(--cx-sidebar-muted); transform: translateY(-50%); pointer-events: none; }\n.dsc-running-spinner { animation: dsc-session-spin 1.9s linear infinite; }\n.dsc-thread:hover .dsc-thread-time, .dsc-thread:has(:focus-visible) .dsc-thread-time { display: none; }\n.dsc-thread:hover .dsc-thread-completion, .dsc-thread:has(:focus-visible) .dsc-thread-completion { opacity: 0; }\n.dsc-thread:hover .dsc-thread-running, .dsc-thread:has(:focus-visible) .dsc-thread-running { opacity: 0; }\n.dsc-thread .dsc-state[data-state=idle] { display: none; }\n.dsc-thread-actions { position: absolute; top: 0; right: 4px; height: 100%; display: flex; align-items: center; gap: 1px; opacity: 0; pointer-events: none; transition: opacity 150ms ease; }\n.dsc-thread:hover .dsc-thread-actions, .dsc-thread:has(:focus-visible) .dsc-thread-actions { opacity: 1; pointer-events: auto; }\n.dsc-ui .dsc-thread-action { display: grid; place-items: center; flex: none; width: 25px; height: 26px; padding: 0; border-radius: 5px; color: var(--cx-sidebar-muted); transition: color 120ms ease; }\n.dsc-ui .dsc-thread-action:hover, .dsc-ui .dsc-thread-action:focus-visible { color: var(--cx-sidebar-text); }\n.dsc-thread-action svg { width: 14px; height: 14px; }\n.dsc-row-tooltip { position: fixed; z-index: 10001; pointer-events: none; padding: 5px 11px; border: 1px solid #ffffff08; border-radius: 13px; color: #dfdfdf; background: #2d2d2d; font-size: 13px; line-height: 18px; white-space: nowrap; box-shadow: 0 2px 5px #0002; opacity: 0; visibility: hidden; transform: translateY(3px); transition: opacity 80ms ease, transform 80ms ease, visibility 0s 80ms; }\n.dsc-row-tooltip[data-open=true] { opacity: 1; visibility: visible; transform: translateY(0); transition: opacity 120ms ease 350ms, transform 120ms ease 350ms, visibility 0s 350ms; }\n.dsc-state { color: var(--cx-sidebar-muted); flex: none; display: flex; align-items: center; }\n.dsc-state[data-state=pending] { color: var(--cx-warning); }\n.dsc-row-action { display: flex; opacity: 0; pointer-events: none; transition: opacity 150ms ease; width: 25px; height: 25px; align-items: center; justify-content: center; border-radius: 5px; padding: 0; margin-right: 3px; color: var(--cx-sidebar-muted); }\n.dsc-ui .dsc-row-action { color: var(--cx-sidebar-muted); }\n.dsc-thread:hover .dsc-row-action, .dsc-project:hover .dsc-row-action, .dsc-thread:has(:focus-visible) .dsc-row-action, .dsc-project:has(:focus-visible) .dsc-row-action { opacity: 1; pointer-events: auto; }\n.dsc-row-action:hover { color: var(--cx-sidebar-text); background: var(--cx-active); }\n/* 本轮按用户录像为项目内容局部开放布局动画；外壳与其他面板的尺寸规则保持原约定。 */\n.dsc-project-fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 180ms cubic-bezier(.2,.8,.2,1), opacity 150ms ease; }\n.dsc-project-fold[data-open=true] { grid-template-rows: 1fr; opacity: 1; }\n.dsc-project-clip { min-height: 0; overflow: hidden; }\n.dsc-project-children { padding-left: 14px; }\n.dsc-project-children, .dsc-project-list { transform: translateY(-4px); transition: transform 180ms cubic-bezier(.2,.8,.2,1); }\n.dsc-project-fold[data-open=true] > .dsc-project-clip > :is(.dsc-project-children, .dsc-project-list) { transform: translateY(0); }\n.dsc-project-children .dsc-state { display: none; }\n/* 项目内“显示更多/收起”：真实按钮，缩进随项目子列表，颜色与行文字一致；不引入额外布局动画。 */\n.dsc-ui .dsc-project-more { display: flex; align-items: center; width: 100%; height: 26px; padding: 0 8px; border-radius: 7px; text-align: left; font-size: 12px; color: var(--cx-sidebar-muted); }\n.dsc-ui .dsc-project-more:hover, .dsc-ui .dsc-project-more:focus-visible { color: var(--cx-sidebar-text); background: #ffffff0d; }\n.dsc-ui .dsc-project-more:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\n.dsc-empty { display: block; color: var(--cx-sidebar-muted); padding: 10px 12px; font-size: 12px; }\n.dsc-archive-toggle { padding: 8px 12px; display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--cx-sidebar-muted); }\n.dsc-archive-toggle input { accent-color: var(--cx-accent); }\n.dsc-thread.is-archived { opacity: .55; }\n.dsc-error { padding: 4px 8px; color: var(--cx-danger); font: 12px/17px var(--cx-font-sans); white-space: normal; max-width: 310px; }\n.dsc-menu { z-index: 10000; padding: 6px; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; overflow: auto; animation: dsc-pop-in 130ms ease both; }\n.dsc-menu-heading { font-size: 12px; color: var(--cx-text-3); padding: 5px 8px 8px; }\n.dsc-option { width: 100%; display: flex; gap: 9px; align-items: center; text-align: left; padding: 7px 8px; border-radius: 7px; min-height: 32px; }\n.dsc-option:hover, .dsc-option:focus-visible { background: #ffffff12; }\n.dsc-option-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; line-height: 20px; }\n.dsc-option-copy small { font-size: 12px; color: var(--cx-text-3); line-height: 17px; }\n/* 主题包：二级面板复用菜单的胶囊与行样式，只额外画一个“底色 + 强调色”索引块。 */\n.dsc-theme-heading { display: flex; align-items: center; gap: 6px; padding: 2px 4px 8px; font-size: 13px; color: var(--cx-text-2); }\n.dsc-theme-back { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: var(--cx-radius-sm); color: var(--cx-text-3); transform: rotate(180deg); }\n.dsc-theme-back:hover { background: var(--cx-active); color: var(--cx-text); }\n.dsc-theme-list { display: flex; flex-direction: column; gap: 1px; max-height: min(52vh, 460px); overflow-y: auto; padding-right: 2px; }\n.dsc-theme-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 6px 8px; border-radius: 7px; text-align: left; }\n.dsc-theme-row:hover, .dsc-theme-row:focus-visible, .dsc-theme-row.is-active { background: var(--cx-active); }\n.dsc-theme-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; line-height: 18px; }\n.dsc-theme-name { font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-theme-copy small { font-size: 11px; color: var(--cx-text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-theme-swatch { flex: none; display: inline-flex; align-items: flex-end; justify-content: flex-end; width: 22px; height: 22px; padding: 3px; border-radius: 7px; box-shadow: inset 0 0 0 1px var(--cx-border-l2); }\n.dsc-theme-swatch-dot { width: 9px; height: 9px; border-radius: 50%; box-shadow: 0 0 0 1px #0000001a; }\n.dsc-theme-swatch.is-default { background: linear-gradient(135deg, var(--cx-text-4), transparent); box-shadow: inset 0 0 0 1px var(--cx-border-l3); }\n/* 设置 →「外观」：模式预览、预设网格、三色与字体。全部使用自有令牌，主题切换后自动跟随。 */\n.dsc-appearance { display: flex; flex-direction: column; gap: 18px; padding: 4px 2px 24px; }\n.dsc-appearance-title { margin: 0; font-size: 20px; line-height: 28px; font-weight: var(--cx-weight-semibold); color: var(--cx-text); }\n.dsc-appearance-note { margin: -10px 0 0; font-size: 12px; line-height: 18px; color: var(--cx-text-3); }\n.dsc-appearance-group { display: flex; flex-direction: column; gap: 10px; }\n.dsc-appearance-group-title { font-size: 13px; line-height: 18px; color: var(--cx-text-2); }\n.dsc-appearance-modes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; max-width: 520px; }\n.dsc-appearance-mode { display: flex; flex-direction: column; gap: 8px; padding: 8px; border-radius: var(--cx-radius-xl); border: 1px solid var(--cx-border-l1); background: var(--cx-surface); text-align: left; }\n.dsc-appearance-mode:hover { border-color: var(--cx-border-l3); }\n.dsc-appearance-mode.is-active { border-color: var(--cx-accent); box-shadow: 0 0 0 1px var(--cx-accent); }\n.dsc-appearance-mode-preview { display: flex; flex-direction: column; gap: 4px; height: 56px; padding: 8px; border-radius: var(--cx-radius-lg); background: var(--cx-thread); border: 1px solid var(--cx-border-l2); }\n.dsc-appearance-mode-preview[data-mode=\"dark\"] { background: #171717; border-color: #ffffff1a; }\n.dsc-appearance-mode-preview[data-mode=\"light\"] { background: #fafafa; border-color: #00000014; }\n.dsc-appearance-mode-preview i { display: block; height: 5px; border-radius: 3px; background: var(--cx-text-3); opacity: .5; }\n.dsc-appearance-mode-preview i:nth-child(1) { width: 60%; }\n.dsc-appearance-mode-preview i:nth-child(2) { width: 88%; }\n.dsc-appearance-mode-preview i:nth-child(3) { width: 44%; }\n.dsc-appearance-mode-label { font-size: 13px; color: var(--cx-text-2); }\n.dsc-appearance-themes { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 8px; }\n.dsc-appearance-theme { display: flex; align-items: center; gap: 8px; padding: 7px 8px; border-radius: var(--cx-radius-lg); border: 1px solid var(--cx-border-l1); background: var(--cx-surface); text-align: left; }\n.dsc-appearance-theme:hover { border-color: var(--cx-border-l3); }\n.dsc-appearance-theme.is-active { border-color: var(--cx-accent); box-shadow: 0 0 0 1px var(--cx-accent); }\n.dsc-appearance-theme-swatch { flex: none; display: inline-flex; align-items: flex-end; justify-content: flex-end; gap: 3px; width: 30px; height: 22px; padding: 4px; border-radius: 6px; border: 1px solid transparent; }\n.dsc-appearance-theme-swatch i { display: block; width: 7px; height: 7px; border-radius: 50%; }\n.dsc-appearance-theme-name { font-size: 12px; line-height: 16px; color: var(--cx-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-appearance-subtitle { grid-column: 1 / -1; margin: 6px 0 -2px; font-size: 12px; line-height: 16px; color: var(--cx-text-3); }\n.dsc-appearance-card { display: flex; flex-direction: column; border: 1px solid var(--cx-border-l1); border-radius: var(--cx-radius-xl); background: var(--cx-surface); overflow: hidden; max-width: 720px; }\n.dsc-appearance-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 46px; padding: 8px 14px; }\n.dsc-appearance-row + .dsc-appearance-row { border-top: 1px solid var(--cx-border-l2); }\n.dsc-appearance-row-label { font-size: 13px; color: var(--cx-text-2); }\n.dsc-appearance-color { display: inline-flex; align-items: center; gap: 8px; padding: 4px 10px 4px 6px; border: 1px solid var(--cx-border-l1); border-radius: var(--cx-radius-full); }\n.dsc-appearance-swatch { width: 20px; height: 20px; padding: 0; border: 0; border-radius: 50%; background: none; cursor: pointer; }\n.dsc-appearance-swatch::-webkit-color-swatch-wrapper { padding: 0; }\n.dsc-appearance-swatch::-webkit-color-swatch { border: 1px solid var(--cx-border-l3); border-radius: 50%; }\n.dsc-appearance-hex { width: 84px; border: 0; background: none; color: var(--cx-text-2); font: 12px/16px var(--cx-font-mono); text-transform: uppercase; }\n.dsc-appearance-select { height: 28px; padding: 0 8px; border: 1px solid var(--cx-border-l1); border-radius: var(--cx-radius-md); background: var(--cx-surface); color: var(--cx-text-2); font-size: 13px; }\n/* 行悬停详情卡：几何按原型实测（项目卡 321×130、右侧 5px；会话卡 470 宽、右侧 12px、上移 6px）。 */\n.dsc-row-pop { position: fixed; z-index: 10000; max-width: calc(100vw - 32px); padding: 6px; border-radius: var(--cx-radius-xl); border: 1px solid var(--cx-border-l1); background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); animation: dsc-row-pop-in 120ms var(--cx-ease-out) both; }\n.dsc-row-pop--project { width: 321px; padding: 8px; }\n.dsc-row-pop--thread { width: 470px; }\n.dsc-row-pop__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 8px 8px 10px; border-bottom: 1px solid var(--cx-border-l2); }\n.dsc-row-pop--project .dsc-row-pop__head { align-items: center; height: 28px; padding: 0 8px; border-bottom: 0; }\n.dsc-row-pop__name { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 14px; font-weight: var(--cx-weight-regular); color: var(--cx-text); }\n.dsc-row-pop__name > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop__pin { display: inline-flex; align-items: center; flex: none; color: var(--cx-text-3); }\n.dsc-row-pop__excerpt { margin: 0; font-size: 13px; line-height: 20px; color: var(--cx-text); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }\n.dsc-row-pop__meta { display: flex; align-items: center; gap: 6px; flex: none; font-size: 12px; color: var(--cx-text-3); white-space: nowrap; }\n.dsc-row-pop__line { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border-radius: var(--cx-radius-md); font-size: 13px; color: var(--cx-text-2); text-align: left; }\n.dsc-row-pop__line svg { flex: none; color: var(--cx-text-3); }\n.dsc-row-pop--project .dsc-row-pop__line { height: 28px; font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--project .dsc-row-pop__line svg { color: var(--cx-text-2); }\n.dsc-row-pop__line--path, .dsc-row-pop__line--action { cursor: pointer; }\n.dsc-row-pop__line--path:hover, .dsc-row-pop__line--action:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-row-pop__line--path:focus-visible, .dsc-row-pop__line--action:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\n.dsc-row-pop__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop--project .dsc-row-pop__path { font-family: var(--cx-font-sans); font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--thread .dsc-row-pop__path { font-family: var(--cx-font-mono); font-size: 12px; }\n.dsc-row-pop__arrow { margin-left: auto; opacity: 0; transition: opacity 120ms var(--cx-ease); }\n.dsc-row-pop__line--path:hover .dsc-row-pop__arrow, .dsc-row-pop__line--path:focus-visible .dsc-row-pop__arrow { opacity: 1; }\n.dsc-row-pop__sep { height: 1px; background: var(--cx-border-l1); }\n@keyframes dsc-row-pop-in { from { opacity: 0; } to { opacity: 1; } }\n/* 「编辑项目」对话框：按参考图（面板 #2d2d2d、16 圆角、保存白底、移除暗红底）；源文件夹只读展示。 */\n.dsc-modal { position: fixed; inset: 0; z-index: 11000; display: flex; align-items: center; justify-content: center; padding: 24px; }\n.dsc-modal__mask { position: absolute; inset: 0; background: rgba(0,0,0,.12); }\n.dsc-modal__panel { position: relative; display: flex; flex-direction: column; width: min(520px, calc(100vw - 32px)); padding: 24px; border-radius: 16px; background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); color: var(--cx-text); }\n.dsc-modal__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.dsc-modal__head h2 { margin: 0; font-size: 20px; line-height: 28px; font-weight: 600; }\n.dsc-modal__close { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border-radius: var(--cx-radius-sm); color: var(--cx-text-2); }\n.dsc-modal__close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__field { display: flex; align-items: center; gap: 10px; height: 44px; margin-top: 20px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); }\n.dsc-modal__field:focus-within { border-color: var(--cx-focus); }\n.dsc-modal__input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; font: 15px/22px var(--cx-font-sans); color: var(--cx-text); }\n.dsc-modal__input::placeholder { color: var(--cx-text-3); }\n.dsc-modal__label { margin: 20px 0 8px; font-size: 13px; line-height: 18px; color: var(--cx-text-3); }\n.dsc-modal__source { display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-modal .dsc-error { margin-top: 12px; }\n.dsc-modal__actions { display: flex; align-items: center; gap: 8px; margin-top: 24px; }\n.dsc-modal__spacer { flex: 1; }\n.dsc-modal__remove { height: 36px; padding: 0 16px; border-radius: 999px; background: rgba(250,102,101,.14); color: #fa6665; font-size: 14px; }\n.dsc-modal__remove:hover:not(:disabled) { background: rgba(250,102,101,.22); }\n.dsc-modal__cancel { height: 36px; padding: 0 14px; border-radius: 999px; color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__cancel:hover:not(:disabled) { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__save { height: 36px; padding: 0 20px; border-radius: 999px; background: #dfdfdf; color: #131313; font-size: 14px; font-weight: 500; }\n.dsc-modal__save:hover:not(:disabled) { background: #fff; }\n.dsc-modal__save:disabled, .dsc-modal__remove:disabled, .dsc-modal__cancel:disabled { opacity: .6; cursor: default; }\n/* 编辑项目底部按钮：优先于 .dsc-ui button 的重置；不改变源文件夹和其他弹窗。 */\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__actions > button { height: 32px; border-radius: 10px; corner-shape: round; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save,\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save:hover:not(:disabled) { padding: 0 16px; background: #dfdfdf; color: #2b2a2a; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove { background: #403030; color: #fa6665; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove:hover:not(:disabled) { background: #4b3333; color: #fa6665; }\n.dsc-permission, .dsc-model { position: relative; display: inline-flex; align-items: center; min-width: 0; }\n.dsc-model { gap: 2px; }\n.dsc-control-status { display: inline-flex; align-items: center; gap: 5px; padding: 0 7px; color: var(--cx-text-3); font-size: 11px; }\n.dsc-control-status button { padding: 2px 4px; text-decoration: underline; }\n.dsc-control-status button:hover { color: var(--cx-text); }\n.dsc-pill { height: 28px; display: inline-flex; align-items: center; gap: 6px; padding: 0 10px; border-radius: 999px; corner-shape: round; white-space: nowrap; color: var(--cx-text-2); font-size: 14px !important; }\n.dsc-pill:hover, .dsc-pill[aria-expanded=true] { background: #ffffff12; color: white; }\n.dsc-pill[data-warning=true] { color: var(--cx-warning); }\n.dsc-model-trigger { max-width: 260px; gap: 5px; corner-shape: round; }\n/* 右下角触发器：模型名偏白、思维强度灰色（参考图 4）。 */\n.dsc-model-trigger .dsc-model-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #dfdfdf; }\n.dsc-model-trigger .dsc-effort-name { flex: none; color: #989898; }\n.dsc-model-trigger svg { flex: none; color: #989898; }\n/* 「修改模型」面板：标题与列表样式明确区别于宿主原生菜单。 */\n.dsc-menu.dsc-model-panel { padding: 8px; }\n.dsc-menu.dsc-model-panel .dsc-menu-heading { font-size: 14px; line-height: 20px; color: var(--cx-text); font-weight: 500; padding: 6px 8px 10px; }\n.dsc-model-group { color: var(--cx-text-3); font-size: 11px; padding: 7px 8px 2px; }\n.dsc-model-search { border: 0; border-bottom: 1px solid var(--cx-border-l1); background: none; outline: none; padding: 6px 8px; width: 100%; margin-bottom: 3px; }\n.dsc-back { display: flex; align-items: center; gap: 4px; color: var(--cx-text-3); font-size: 12px !important; border-radius: 5px; }\n.dsc-back:hover { color: #fff; }\n/* 滑条弹层裁掉横向溢出：Max/Low/High 档的撒点动画会向右超出边界，触发多余的水平滚动条。 */\n.dsc-reasoning-pop { padding: 12px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); overflow: hidden; animation: dsc-reasoning-in 130ms var(--cx-ease) both; }\n.dsc-reasoning { position: relative; }\n.dsc-reasoning-heading { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 20px 10px; text-align: center; }\n.dsc-reasoning-heading strong { font-size: 14px; font-weight: var(--cx-weight-semibold); line-height: 18px; color: var(--cx-reasoning-title); transition: color 150ms ease; }\n.dsc-reasoning-model { display: inline-flex; align-items: center; justify-content: center; gap: 2px; max-width: 100%; padding: 4px 10px; border-radius: 999px; corner-shape: round; color: #ffffff9e !important; font-size: 12px !important; line-height: 16px !important; white-space: nowrap; transition: background-color 120ms var(--cx-ease), color 120ms var(--cx-ease); }\n.dsc-reasoning-model:hover { background: #3c3b3b; color: var(--cx-text) !important; }\n.dsc-reasoning-reset { position: absolute; top: -4px; right: -4px; display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: var(--cx-radius-sm); color: var(--cx-text-3) !important; }\n.dsc-reasoning-reset:hover { background: var(--cx-hover); color: var(--cx-text) !important; }\n.dsc-reasoning[data-level=max] .dsc-reasoning-heading strong { color: var(--cx-reasoning-max-text); }\n.dsc-slider { height: 32px; position: relative; margin: 0 2px; border-radius: 999px; cursor: pointer; touch-action: none; outline: none; }\n/* rc.3 的全局 superellipse 会把 full/50% 圆角画成方圆形；仅恢复本控件的圆形轮廓。 */\n.dsc-slider, .dsc-slider-track, .dsc-slider-fill, .dsc-slider-max, .dsc-thumb, .dsc-tick::after, .dsc-stars i, .dsc-burst i { corner-shape: round; }\n/* 提交期间保持原有视觉：只禁用拖拽，不切换光标/透明度，避免切换档位时闪变。 */\n.dsc-slider[aria-disabled=true] { cursor: default; opacity: 1; }\n.dsc-slider-track { position: absolute; inset: 4px 0; height: 24px; border-radius: 999px; background: var(--cx-reasoning-track); overflow: hidden; }\n.dsc-slider-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--cx-reasoning-blue); transform-origin: left center; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-slider-max { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg,var(--cx-reasoning-max-blue),var(--cx-reasoning-purple) 52%,var(--cx-reasoning-violet)); opacity: 0; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-slider-max { opacity: 1; }\n.dsc-slider-max::before, .dsc-slider-max::after { content: ''; position: absolute; animation-play-state: paused; }\n.dsc-slider-max::before { inset: -50% -25%; background: radial-gradient(ellipse,var(--cx-reasoning-max-ice),#a095ffd9 22%,transparent 58%); animation: dsc-max-flow 2.8s linear -.45s infinite; animation-play-state: paused; }\n.dsc-slider-max::after { inset: -40% -30%; background: radial-gradient(ellipse,#d6a2ff,var(--cx-reasoning-max-glow) 20%,transparent 55%); animation: dsc-max-bloom 4.2s linear -1.65s infinite; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-slider-max::before, .dsc-slider[data-level=max] .dsc-slider-max::after { animation-play-state: running; }\n.dsc-stars { position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-stars { opacity: 1; }\n.dsc-stars i { position: absolute; border-radius: 50%; background: #fff; box-shadow: 0 0 3px #e0d6ff8c; animation: dsc-star-drift var(--pdur) linear var(--pdelay) infinite; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-stars i { animation-play-state: running; }\n.dsc-tick { position: absolute; top: 50%; width: 24px; height: 24px; transform: translate(-50%,-50%); transition: opacity 150ms ease; }\n.dsc-tick::after { content: ''; position: absolute; top: 50%; left: 50%; width: 5px; height: 5px; border-radius: 50%; background: #ffffff38; transform: translate(-50%,-50%); transition: transform 120ms ease,background-color 120ms ease; pointer-events: none; }\n.dsc-tick.is-on::after { background: #ffffff4d; }\n.dsc-slider:not([aria-disabled=true]) .dsc-tick:hover::after { transform: translate(-50%,-50%) scale(1.6); background: #ffffff73; }\n.dsc-slider[data-level=max] .dsc-tick { opacity: 0; pointer-events: none; }\n.dsc-thumb-position { position: absolute; inset: 0; pointer-events: none; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-thumb { position: absolute; z-index: 1; top: 50%; left: 14px; width: 28px; height: 28px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px #0007,0 0 0 1px #0000000f; transform: translate(-50%,-50%); pointer-events: auto; transition: transform 140ms var(--cx-ease-out),box-shadow 140ms var(--cx-ease); }\n/* 固定白色滑块为正圆，避免宿主全局圆角规则覆盖插件外形。 */\n.dsc-ui .dsc-slider .dsc-thumb { border-radius: 50% !important; }\n.dsc-thumb:hover { transform: translate(-50%,-50%) scale(1.1); box-shadow: 0 1px 6px #0008,0 0 0 1px #0000000f; }\n.dsc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n.dsc-permission-menu { padding: 4px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); }\n.dsc-permission-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 4px 8px; color: var(--cx-text-3); font-size: 13px; line-height: 18px; }\n.dsc-permission-heading button { padding: 0; white-space: nowrap; text-decoration: underline; text-underline-offset: 2px; }\n.dsc-permission-help { margin: 4px 8px 8px; color: var(--cx-text-2); font-size: 12px; line-height: 18px; }\n.dsc-permission-menu .dsc-option { align-items: flex-start; gap: 8px; padding: 6px 8px; border-radius: var(--cx-radius-xl); color: var(--cx-text-2); font-size: 14px; line-height: 19px; }\n.dsc-permission-menu .dsc-option > svg { margin-top: 3px; }\n.dsc-permission-menu .dsc-option-copy { line-height: 19px; }\n.dsc-permission-menu .dsc-option[data-warning=true], .dsc-permission-menu .dsc-option[data-warning=true] small { color: var(--cx-warning); }\n/* 权限风险弹窗：按用户 Codex 截图换算 1.5 倍显示缩放，约 520px 宽；不影响宿主其他确认框。 */\n.dsc-ui.dsc-permission-dialog { width: 520px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 32px); margin: auto; padding: 20px; border: 0; border-radius: 20px; background: #2b2b2b; color: #dedede; box-shadow: 0 18px 70px #0003; overflow-y: auto; overscroll-behavior: contain; -webkit-app-region: no-drag; animation: dsc-pop-in 150ms ease both; }\n.dsc-permission-dialog::backdrop { background: #0006; }\n.dsc-permission-dialog__heading { display: flex; align-items: center; gap: 8px; min-height: 28px; }\n.dsc-permission-dialog__heading > svg { flex: none; }\n.dsc-permission-dialog__heading h2 { margin: 0; font-size: 20px; font-weight: 650; line-height: 28px; letter-spacing: -.3px; }\n.dsc-permission-dialog__badge { margin-left: auto; padding: 1px 7px; border: 1px solid #ffffff14; border-radius: 6px; color: #aaa; font-size: 11px; line-height: 18px; white-space: nowrap; }\n.dsc-permission-dialog__description { margin: 14px 0 12px; color: #999; font-size: 14px; line-height: 20px; }\n.dsc-permission-dialog__capabilities { margin: 0; padding: 4px 16px; border-radius: 16px; list-style: none; background: #333; }\n.dsc-permission-dialog__capabilities li { display: flex; align-items: center; gap: 12px; min-height: 51px; padding: 8px 0; }\n.dsc-permission-dialog__capabilities li + li { border-top: 1px solid #ffffff08; }\n.dsc-permission-dialog__capabilities li > div { min-width: 0; }\n.dsc-permission-dialog__capabilities strong { display: block; font-size: 14px; font-weight: 600; line-height: 18px; }\n.dsc-permission-dialog__capabilities span { display: block; color: #999; font-size: 12px; line-height: 17px; overflow-wrap: anywhere; }\n.dsc-permission-dialog__warning { margin: 12px 0 0; color: #999; font-size: 14px; line-height: 20px; }\n.dsc-ui .dsc-permission-dialog__more { margin-left: 3px; padding: 0; color: #8ac4ff; white-space: nowrap; font-size: inherit; }\n.dsc-permission-dialog__more:hover { text-decoration: underline; text-underline-offset: 3px; }\n.dsc-permission-dialog__help { margin: 10px 0 0; padding: 10px 12px; border-radius: 10px; background: #ffffff06; color: #aaa; font-size: 12px; line-height: 18px; }\n.dsc-permission-dialog__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 14px; }\n.dsc-ui .dsc-permission-dialog__actions button { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 36px; padding: 6px 20px; border-radius: 999px; font-size: 14px; line-height: 20px; transition: background-color 120ms ease; }\n.dsc-ui .dsc-permission-dialog__cancel { background: #333; color: #d5d5d5; }\n.dsc-ui .dsc-permission-dialog__cancel:hover:not(:disabled) { background: #3d3d3d; }\n.dsc-ui .dsc-permission-dialog__confirm { background: #443232; color: #ff6764; }\n.dsc-ui .dsc-permission-dialog__confirm:hover:not(:disabled) { background: #533838; }\n@media (max-width: 480px) {\n  .dsc-ui.dsc-permission-dialog { padding: 18px; }\n  .dsc-permission-dialog__heading h2 { font-size: 18px; line-height: 26px; }\n  .dsc-permission-dialog__capabilities { padding-inline: 12px; }\n}\n.dsc-burst { position: absolute; left: 14px; top: 50%; pointer-events: none; }\n/* 等 140ms 节点移动落定后，从白球边缘扩散；反复进入 Max 会由原有 key 重播。 */\n.dsc-burst i { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #b98cff; box-shadow: 0 0 3px #b98cff40; animation: dsc-burst 280ms ease-out 140ms both; }\n.dsc-slider-labels { display: flex; justify-content: space-between; padding-top: 3px; }\n.dsc-slider-labels button { padding: 0 3px; font-size: 10px; color: var(--cx-text-3); }\n.dsc-slider-labels button:hover { color: white; }\n.dsc-reasoning-description { display: block; text-align: center; color: var(--cx-text-3); font-size: 11px; line-height: 16px; margin-top: 7px; }\n@keyframes dsc-pop-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }\n/* 退场淡出：关闭弹层时先播放 160ms，再卸载 DOM。 */\n@keyframes dsc-pop-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(3px); } }\n.dsc-menu.dsc-menu-closing { animation: dsc-pop-out 160ms ease both; pointer-events: none; }\n@keyframes dsc-reasoning-in { from { opacity: 0; } to { opacity: 1; } }\n@keyframes dsc-session-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n/* 两层亮带和星点均向左单程流动，出场淡去后从右侧开始下一轮。 */\n@keyframes dsc-max-flow { 0% { transform: translateX(65%) scale(.82,1); opacity: 0; } 12% { opacity: .95; } 88% { opacity: .8; } 100% { transform: translateX(-65%) scale(1.02,1); opacity: 0; } }\n@keyframes dsc-max-bloom { 0% { transform: translateX(65%) scale(.7,1); opacity: 0; } 12% { opacity: .9; } 88% { opacity: 1; } 100% { transform: translateX(-65%) scale(1,1); opacity: 0; } }\n@keyframes dsc-star-drift { 0% { transform: translate(-50%,-50%) translate(calc(var(--dx)*.5),calc(var(--dy)*-.5)); opacity: 0; } 20% { opacity: .7; } 80% { opacity: .8; } 100% { transform: translate(-50%,-50%) translate(calc(var(--dx)*-.5),calc(var(--dy)*.5)); opacity: 0; } }\n@keyframes dsc-burst { 0% { transform: translate(-50%,-50%) translate(calc(var(--bx)*.45),calc(var(--by)*.45)) scale(.5); opacity: 0; } 18% { transform: translate(-50%,-50%) translate(calc(var(--bx)*.72),calc(var(--by)*.72)) scale(1); opacity: .65; } 100% { transform: translate(-50%,-50%) translate(var(--bx),var(--by)) scale(.5); opacity: 0; } }\n@media (prefers-reduced-motion: reduce) {\n  .dsc-sidebar-shell, .dsc-row-tooltip, .dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { animation: none !important; transition: none !important; }\n  .dsc-burst { display: none; }\n}\n\n/* Codex 几何（第 48 轮）：\n   1) 侧边栏列左上角圆角、对话列左上角直角（与 Codex 蓝框/红框一致）；\n   2) 对话正文列与输入框同宽：由插件测量输入框卡片的实际视觉宽度写入 --dsc-composer-visual-width，\n      正文列优先取该值，回退到宿主 --dsh-composer-card-max-width（正文 + 32px）。 */\nbody[data-dsh-codex-style] [data-conversation-scroll] [class*=\"_column\"] { max-width: var(--dsc-composer-visual-width, var(--dsh-composer-card-max-width)); }\n/* 公开详情插槽在来源信息后声明；仅在本插件详情用 flex 顺序把来源信息排在支持提示之后。 */\nbody[data-dsh-codex-style] [data-plugin-detail=\"@xinxing1708/dsh-codex-style\"] [data-plugin-source] { order: 1; }\n.dsc-plugin-support { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 16px 0; color: #989898; font-size: 13px; line-height: 20px; }\n.dsc-plugin-support p { margin: 0; }\n.dsc-plugin-support a { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; color: #9bc8f8; text-decoration: none; overflow-wrap: anywhere; border-radius: 4px; }\n.dsc-plugin-support a:hover { text-decoration: underline; text-underline-offset: 3px; }\n.dsc-plugin-support a:focus-visible { outline: 2px solid #9bc8f8; outline-offset: 4px; }\n/* BOUNDARY-20261106：导航右侧的单一外框。\n   1) 常驻 frame 上一个不占位、不可拦截指针的伪元素描边；顶部从 40px 标题栏下沿开始，\n      经侧栏左上真圆弧连续走到右侧与下沿，外侧底色仍是 frame 的 #0f0f0f。\n   2) 各列只做内容裁剪：侧栏列左上/左下、正文列右上/右下（右栏收起时）；\n      侧栏收起时正文列接管左上/左下。接缝处不重复圆角。\n   3) 宿主全局 corner-shape:superellipse(1.5) 会削弱圆弧，这里显式恢复 round。\n   4) 0.667px × 150% = 1 设备像素；不改变列宽、顶部高度或控件坐标。 */\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame]::after {\n  content: '';\n  position: absolute;\n  inset: var(--dsh-windows-titlebar-height, 40px) 0 0;\n  z-index: 24;\n  border-radius: var(--cx-frame-radius);\n  box-shadow: inset 0 0 0 var(--cx-frame-line-width) var(--cx-frame-line);\n  corner-shape: round;\n  pointer-events: none;\n}\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-sidebar-column] {\n  border-top-left-radius: var(--cx-frame-radius);\n  border-bottom-left-radius: var(--cx-frame-radius);\n  corner-shape: round;\n}\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-center-column] {\n  border-radius: 0;\n  corner-shape: round;\n}\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame][data-rightbar-collapsed] [data-dsc-center-column] {\n  border-top-right-radius: var(--cx-frame-radius);\n  border-bottom-right-radius: var(--cx-frame-radius);\n}\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] [data-dsc-center-column] {\n  border-top-left-radius: var(--cx-frame-radius);\n  border-bottom-left-radius: var(--cx-frame-radius);\n}\n\n/* 浅色呈现只覆盖颜色；深色规则、几何与动作保持不变。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] {\n  color-scheme: light;\n  --shiki-token-constant: #155da9;\n  --shiki-token-string: #197342;\n  --shiki-token-comment: #757575;\n  --shiki-token-keyword: #a33669;\n  --shiki-token-function: #7651b4;\n}\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-conversation-content] { --dsw-alias-label-primary: var(--cx-text); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:hover:not(:disabled) { background: #eee; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"], [aria-label=\"停止生成\"], [aria-label=\"Stop generating\"], [data-sending]) { --dsw-alias-button-info-fill: #0d0d0d; --dsw-alias-button-info-hover: #252525; color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]):disabled { --dsw-alias-button-info-fill: #b6b6b6; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending] { background: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[data-sending]::before { background: conic-gradient(from 0deg, #fff 0deg, #777 270deg 360deg); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-sidebar-shell[data-mode=floating] > .dsc-sidebar { --cx-sidebar: #fff; box-shadow: 0 0 0 3px #f3f3f380, 0 8px 28px #0002; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is([data-dsc-extension-nav], .dsc-sidebar .dsc-tree-scroll, [data-dsc-app-footer-host]) { scrollbar-color: #00000026 transparent; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-sidebar .dsc-new-chat:hover, .dsc-thread:hover, .dsc-project:hover, .dsc-ui .dsc-project-more:hover, .dsc-ui .dsc-project-more:focus-visible) { background: #0000000d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-thread.is-active { background: var(--cx-sidebar-selected); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-sidebar .dsc-brand__badge { background: #303030; color: #fff; }\n/* 只调整单色品牌字形，不影响附件和正文图片。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-brand__mark { filter: brightness(0); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-more-page { background: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-workspace-mark { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-workspace-mark:focus-visible { outline-color: #2b68cb; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-empty-hero svg { color: #bababa; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-search { background: #00000005; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-brand small { color: #fff; background: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-menu { box-shadow: 0 8px 24px #0000001a; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-option:hover, .dsc-option:focus-visible) { background: #00000009; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-pill:hover, .dsc-pill[aria-expanded=true]) { background: #0000000a; color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-pill[data-warning=true] { color: var(--cx-warning); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-model-trigger .dsc-model-name { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-model-trigger .dsc-effort-name, .dsc-model-trigger svg) { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-back:hover, .dsc-slider-labels button:hover) { color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-reasoning-model { color: #777 !important; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-reasoning-model:hover { background: #eee; color: #303030 !important; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-tick::after { background: #adadad; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-tick.is-on::after { background: #ffffff4d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-slider:not([aria-disabled=true]) .dsc-tick:hover::after { background: #7f7f7f; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-slider:not([aria-disabled=true]) .dsc-tick.is-on:hover::after { background: #ffffff73; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-thumb { box-shadow: 0 0 0 2px var(--cx-reasoning-blue), 0 1px 4px #0002; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-thumb:hover { box-shadow: 0 0 0 2px var(--cx-reasoning-blue), 0 1px 6px #0003; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-modal__save, .dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save) { background: #0d0d0d; color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-modal__save:hover:not(:disabled), .dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save:hover:not(:disabled)) { background: #303030; color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-modal__remove, .dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove) { background: #c9363412; color: #c93634; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-modal__remove:hover:not(:disabled), .dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove:hover:not(:disabled)) { background: #c9363422; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui.dsc-permission-dialog { background: #fff; color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-permission-dialog__badge { color: #777; border-color: #00000014; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-permission-dialog__description, .dsc-permission-dialog__capabilities span, .dsc-permission-dialog__warning) { color: #777; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-permission-dialog__capabilities { background: #f5f5f5; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-permission-dialog__capabilities li + li { border-color: #00000008; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-permission-dialog__more { color: var(--cx-link); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-permission-dialog__help { background: #f5f5f5; color: #777; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-permission-dialog__cancel { background: #eee; color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-permission-dialog__cancel:hover:not(:disabled) { background: #e5e5e5; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-permission-dialog__confirm { background: #c9363412; color: #c93634; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-permission-dialog__confirm:hover:not(:disabled) { background: #c9363422; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-plugin-support { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-plugin-support a { color: var(--cx-link); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-plugin-support a:focus-visible { outline-color: var(--cx-focus); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-update-progress { background: #0000001f; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-update-progress-fill, .dsc-thread-completion) { background: var(--cx-accent); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-update-message[data-state=update] { color: var(--cx-accent); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-update-message[data-state=error] { color: var(--cx-danger); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is([role=\"tooltip\"], .dsc-row-tooltip, .dsc-ui.dsc-workspace-tooltip, .dsc-desktop-update-tip),\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-gear-button::after { background: #0d0d0d; color: #fff; border-color: #ffffff14; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-desktop-update-tip strong { color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"]:has([data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:is(:hover,:focus-visible):not(:disabled)) [role=\"tooltip\"] { background: #0d0d0d; color: #fff; }\n";
    const SKILLS_CSS_TEXT = "/* 技能页：只作用于自有 .dsc-skills-* 结构，不改宿主令牌与布局。 */\n.dsc-skills-page {\n  box-sizing: border-box;\n  min-height: 100%;\n  padding: 30px 30px 56px;\n  color: #dfdfdf;\n  background: #181818;\n  font: 14px/22px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  overflow: auto;\n}\n.dsc-skills-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }\n.dsc-skills-heading h1 { margin: 0; font-size: 22px; line-height: 30px; font-weight: 600; letter-spacing: -.01em; }\n.dsc-skills-heading p { margin: 4px 0 0; color: #989898; font-size: 14px; line-height: 22px; }\n.dsc-skills-toolbar { display: flex; align-items: center; gap: 10px; }\n.dsc-skills-scope {\n  max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\n  padding: 4px 10px; border: 1px solid #ffffff14; border-radius: 999px; color: #989898; font-size: 12px;\n}\n.dsc-skills-search {\n  display: inline-flex; align-items: center; gap: 6px; width: 240px; height: 32px; padding: 0 12px;\n  border: 1px solid #ffffff14; border-radius: 999px; color: #989898; background: transparent;\n}\n.dsc-skills-search:focus-within { border-color: #ffffff2e; color: #dfdfdf; }\n.dsc-skills-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: #dfdfdf; font: inherit; }\n.dsc-skills-search input::placeholder { color: #777; }\n.dsc-skills-toolbar .dsc-icon-button { width: 32px; height: 32px; border-radius: 999px; color: #989898; }\n.dsc-skills-toolbar .dsc-icon-button:hover { background: #222; color: #dfdfdf; }\n\n.dsc-skills-section { margin-top: 26px; }\n.dsc-skills-section-title {\n  margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #ffffff14;\n  font-size: 16px; line-height: 22px; font-weight: 600; color: #dfdfdf;\n}\n.dsc-skills-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 28px; }\n.dsc-skill-card {\n  display: flex; align-items: center; gap: 12px; width: 100%; height: 60px; padding: 8px 10px;\n  border: 0; border-radius: 10px; background: transparent; color: inherit; text-align: left; cursor: pointer;\n  transition: background-color 150ms ease;\n}\n.dsc-skill-card:hover { background: #222; }\n.dsc-skill-card:focus-visible { outline: 2px solid #ffffff2e; outline-offset: -2px; }\n.dsc-skill-card-icon { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: #141414; }\n.dsc-skill-cube { display: block; }\n.dsc-skill-card-copy { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 2px; }\n.dsc-skill-card-title { font-size: 14px; line-height: 20px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-skill-card-desc { font-size: 14px; line-height: 20px; color: #989898; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-skill-card-flag { flex: none; display: inline-flex; color: #989898; }\n.dsc-ui .dsc-skills-more {\n  margin-top: 6px; padding: 4px 2px; border: 0; background: transparent; color: #989898;\n  font: inherit; font-size: 13px; cursor: pointer; text-align: left;\n}\n.dsc-skills-more:hover { color: #dfdfdf; }\n\n.dsc-skills-state { padding: 22px 2px; color: #989898; font-size: 14px; }\n.dsc-skills-state button { margin-left: 10px; padding: 2px 10px; border: 1px solid #ffffff14; border-radius: 6px; background: #202020; color: #dfdfdf; font: inherit; cursor: pointer; }\n.dsc-skills-state-error { color: #fa6665; }\n.dsc-skills-state-warn { color: #d6a75a; }\n\n.dsc-skills-overlay {\n  position: fixed; inset: 0; z-index: 900; display: flex; align-items: center; justify-content: center;\n  padding: 36px 24px; background: #00000026;\n}\n.dsc-skills-dialog {\n  display: flex; flex-direction: column; box-sizing: border-box; overflow: hidden;\n  width: min(600px, calc(100vw - 48px)); max-height: calc(100vh - 72px); padding: 20px;\n  border: 1px solid #ffffff14; border-radius: 20px;\n  background: linear-gradient(180deg, #2b2a2a, #2c2b2b);\n  color: #dfdfdf; box-shadow: 0 18px 48px #00000059;\n}\n.dsc-skills-dialog-headrow { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.dsc-skills-dialog-icon { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: #141414; }\n.dsc-skills-dialog-headactions { display: flex; align-items: center; gap: 4px; }\n.dsc-skills-dialog-headactions .dsc-icon-button { width: 30px; height: 30px; border-radius: 8px; color: #989898; }\n.dsc-skills-dialog-headactions .dsc-icon-button:hover { background: #ffffff14; color: #dfdfdf; }\n.dsc-skills-dialog-title { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-top: 14px; }\n.dsc-skills-dialog-title h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 600; }\n.dsc-skills-dialog-kind { color: #989898; font-size: 14px; }\n.dsc-skills-dialog-desc {\n  margin: 8px 0 14px; color: #bdbdbd; font-size: 16px; line-height: 24px;\n  max-height: 28vh; overflow: auto; overflow-wrap: anywhere;\n}\n.dsc-skills-preview {\n  flex: 1 1 auto; min-height: 96px; max-height: 160px; overflow: auto; padding: 12px 14px;\n  border-radius: 12px; background: #232222; color: #c9c9c9; font-size: 13px; line-height: 20px;\n}\n.dsc-skills-preview-note { color: #989898; font-size: 13px; }\n.dsc-skills-plain { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/20px ui-monospace, \"Cascadia Mono\", Consolas, monospace; }\n.dsc-skills-dialog-foot { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex: none; margin-top: 14px; }\n.dsc-skills-dialog-notice { margin-right: auto; color: #fa6665; font-size: 12px; line-height: 18px; }\n.dsc-ui .dsc-skills-try {\n  display: inline-flex; align-items: center; gap: 5px; corner-shape: round;\n  padding: 6px 14px; border: 0; border-radius: 999px; background: #dfdfdf; color: #1b1b1b;\n  font: inherit; font-size: 13px; font-weight: 600; cursor: pointer;\n  transition: background-color 120ms ease;\n}\n.dsc-ui .dsc-skills-try:hover { background: #f0f0f0; }\n.dsc-skills-try:disabled { opacity: .6; cursor: default; }\n.dsc-skills-search, .dsc-skills-scope { corner-shape: round; }\n.dsc-skills-preview :is(h1, h2, h3, h4, h5, h6) { font: 600 14px/22px \"Segoe UI\", \"Microsoft YaHei\", sans-serif; margin: 12px 0 8px; }\n.dsc-skills-preview :is(h1, h2, h3):first-child { margin-top: 0; }\n.dsc-skills-preview p { margin: 8px 0; }\n\n@media (max-width: 900px) {\n  .dsc-skills-page { padding: 22px 18px 40px; }\n  .dsc-skills-grid { grid-template-columns: minmax(0, 1fr); }\n  .dsc-skills-search { width: 200px; }\n}\n@media (max-width: 620px) {\n  .dsc-skills-header { flex-direction: column; }\n  .dsc-skills-toolbar { width: 100%; }\n  .dsc-skills-search { flex: 1; width: auto; }\n  .dsc-skills-overlay { padding: 16px; }\n  .dsc-skills-dialog { padding: 16px; border-radius: 16px; max-height: calc(100vh - 32px); }\n  .dsc-skills-dialog-desc { font-size: 15px; line-height: 22px; max-height: 22vh; }\n  .dsc-skills-preview { max-height: 34vh; }\n}\n@media (max-height: 560px) {\n  .dsc-skills-dialog { overflow-y: auto; }\n  .dsc-skills-dialog > * { flex-shrink: 0; }\n  .dsc-skills-dialog-desc { max-height: 20vh; }\n  .dsc-skills-preview { flex: none; min-height: 64px; max-height: 20vh; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dsc-skill-card, .dsc-skills-try { transition: none; }\n}\n\n/* 技能目录与详情继承同一个浅色状态，不改变数据、预览与打开动作。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-page { color: #303030; background: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skills-heading p, .dsc-skills-scope, .dsc-skills-search, .dsc-skills-toolbar .dsc-icon-button, .dsc-skill-card-desc, .dsc-skill-card-flag, .dsc-ui .dsc-skills-more, .dsc-skills-state, .dsc-skills-dialog-headactions .dsc-icon-button, .dsc-skills-dialog-kind, .dsc-skills-preview-note) { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skills-scope, .dsc-skills-search, .dsc-skills-section-title, .dsc-skills-state button, .dsc-skills-dialog) { border-color: #00000014; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skills-search:focus-within, .dsc-skills-search input, .dsc-skills-section-title, .dsc-skills-more:hover, .dsc-skills-state button, .dsc-skills-dialog) { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-search:focus-within { border-color: #2b68cb; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-search input::placeholder { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skills-toolbar .dsc-icon-button:hover, .dsc-skill-card:hover, .dsc-skills-dialog-headactions .dsc-icon-button:hover) { background: #f3f3f3; color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skill-card:focus-visible { outline-color: #2b68cb; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skill-card-icon, .dsc-skills-dialog-icon) { background: #f3f3f3; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-state button { background: #f5f5f5; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-skills-state-error, .dsc-skills-dialog-notice) { color: #c93634; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-state-warn { color: #a56a12; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-dialog { background: #fff; box-shadow: 0 18px 48px #00000026; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-dialog-desc { color: #505050; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-skills-preview { background: #f5f5f5; color: #505050; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-skills-try { background: #0d0d0d; color: #fff; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ui .dsc-skills-try:hover { background: #303030; }\n";
    const BODY_CSS_TEXT = "/* 本文件只在正文子组件实际启用时挂载；不覆盖宿主 Markdown 与工具内容。 */\n/* 第 134 轮：颜色默认值放在正文开关自身作用域，不依赖主外壳开关。 */\nbody[data-dsc-codex-body] {\n  --dsc-body-muted: #9e9e9e;\n  --dsc-body-running: #6b6b6b;\n  --dsc-body-shimmer: #fcfcfc;\n  --dsc-body-turn: #7f7f7f;\n}\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-body] {\n  --dsc-body-muted: #898989;\n  --dsc-body-running: #ababab;\n  --dsc-body-shimmer: #505050;\n  --dsc-body-turn: #898989;\n}\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-body] .dsc-body-turn__divider { background: #ededed; }\nbody[data-dsc-codex-body] [data-chat-flow] {\n  --dsc-body-images: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%2016'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'1.1'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'm6.2%204.6.4-2A1.5%201.5%200%200%201%208.4%201.5l4.9%201a1.5%201.5%200%200%201%201.2%201.8l-1%204.9a1.5%201.5%200%200%201-1.8%201.2l-.7-.1'%2F%3E%3Cg%20transform%3D'rotate(-12%206.1%209.7)'%3E%3Crect%20x%3D'1.7'%20y%3D'5.3'%20width%3D'8.9'%20height%3D'8.7'%20rx%3D'1.7'%2F%3E%3Cpath%20d%3D'm2%2011.9%202.6-2.4%202.2%201.7%201.5-1.4%202.1%202.1'%2F%3E%3Ccircle%20cx%3D'4.3'%20cy%3D'7.8'%20r%3D'.65'%20fill%3D'black'%20stroke%3D'none'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  --dsc-body-pencil: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='m2 14 1.5-5.1L10.9 1.5a1.6 1.6 0 0 1 2.3 0l1.1 1.1a1.6 1.6 0 0 1 0 2.3L6.9 12.3 2 14Zm7.8-11.4 3.4 3.4M3.5 8.9l3.4 3.4' fill='none' stroke='black' stroke-width='1.15' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");\n  --dsc-body-terminal: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect x='1.5' y='1.5' width='13' height='13' rx='2.2' fill='none' stroke='black' stroke-width='1.15'/%3E%3Cpath d='m4.4 5.2 2.2 2.3-2.2 2.3m4.1.2h2.8' fill='none' stroke='black' stroke-width='1.15' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");\n}\n/* 下方正文已由宿主保留 16px 间隔，回合头不再额外叠加下边距。 */\nbody[data-dsc-codex-body] .dsc-body-turn { margin: 12px 0 0; color: var(--dsc-body-turn); font-size: 13px; line-height: 22px; }\nbody[data-dsc-codex-body] .dsc-body-turn__status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; border: 0; overflow: hidden; white-space: nowrap; clip-path: inset(50%); }\nbody[data-dsc-codex-body] .dsc-body-turn__label { display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; background: none; color: inherit; font: inherit; font-variant-numeric: tabular-nums; cursor: pointer; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:disabled { opacity: 1; cursor: default; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:enabled:hover { color: var(--dsc-body-shimmer); }\nbody[data-dsc-codex-body] .dsc-body-turn__label:focus-visible { outline: 1px solid #aaa; outline-offset: 4px; border-radius: 3px; }\nbody[data-dsc-codex-body] .dsc-body-turn__label svg { opacity: 0; transition: transform 160ms ease, opacity 120ms ease; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:is(:hover, :focus-visible) svg { opacity: 1; }\nbody[data-dsc-codex-body] .dsc-body-turn__label[aria-expanded=\"true\"] svg { transform: rotate(180deg); }\nbody[data-dsc-codex-body] .dsc-body-turn__divider { height: 1px; background: #ffffff12; margin-top: 9px; }\n/* 没有真实回合头时保留底部状态，避免连接/加载阶段丢失运行提示。 */\nbody[data-dsc-codex-body] :is([data-chat-flow], [data-slot=\"conversation.chat.flow\"]):has(.dsc-body-turn[data-dsc-body-running]) > [data-chat-running] { display: none; }\n/* 思考不显示前导图标；保留完成思考的真实折叠操作，流式正文和摘要仍隐藏。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"][data-state=\"running\"] { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"] [data-disclosure-row] > :first-child { display: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"] [data-disclosure-row] > span:last-child > span:first-child > span:not(:first-child) { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"]:has(> [data-shimmer]) > [data-shimmer] { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"]:has(> [data-shimmer])::after { content: '正在思考'; color: transparent; background: linear-gradient(105deg, var(--dsc-body-running) 42%, var(--dsc-body-shimmer) 50%, var(--dsc-body-running) 58%); background-clip: text; background-size: 250% 100%; animation: dsc-body-thinking 2s linear infinite; }\n/* 灰色正文操作行；失败/停止颜色及详情内容沿用宿主。 */\nbody[data-dsc-codex-body] [data-process-activity],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"bash\"], [data-tool]) { color: var(--dsc-body-muted); }\n/* 已完成“已使用…”等 others 行：宿主 GenericCommandCard 完成态为 data-state=\"ok\"。 */\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"bash\"], [data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"others\"])[data-state=\"ok\"] { color: var(--dsc-body-muted); }\n/* 运行中：宿主工具用已有 data-state=\"running\"；活动行退回检测内部 data-shimmer，均为宿主既有属性。 */\nbody[data-dsc-codex-body] [data-process-activity]:has([data-shimmer]),\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant], [data-tool])[data-state=\"running\"],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant], [data-tool]):has([data-shimmer]) { color: var(--dsc-body-running); }\n/* 已完成行悬停/键盘焦点文字转亮；运行行不参与，保持运行灰。 */\nbody[data-dsc-codex-body] [data-process-activity]:not([data-state=\"running\"]):not(:has([data-shimmer])):is(:hover, :focus-visible),\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant], [data-tool]):not([data-state=\"running\"]):not(:has([data-shimmer])):is(:hover, :focus-visible) { color: var(--dsc-body-shimmer); }\nbody[data-dsc-codex-body] [data-process-activity] { width: fit-content; max-width: 100%; gap: 7px; text-align: left; }\nbody[data-dsc-codex-body] [data-process-activity] > span:first-child { display: contents; }\nbody[data-dsc-codex-body] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-step-process-chevron] { position: static; flex: none; transform: none !important; }\nbody[data-dsc-codex-body] [data-step-process-icon] { opacity: 1 !important; }\nbody[data-dsc-codex-body] [data-step-process-icon] { width: 16px; height: 16px; }\nbody[data-dsc-codex-body] [data-step-process-chevron] { order: 3; width: 12px; height: 12px; margin-left: 0; opacity: 0 !important; transition: opacity 120ms ease; }\nbody[data-dsc-codex-body] [data-process-activity]:is(:hover, :focus-visible) [data-step-process-chevron] { opacity: 1 !important; }\nbody[data-dsc-codex-body] [data-process-activity] > [data-shimmer] { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n/* 通用工具（包括 ops_bash 等别名）统一使用终端；编辑/写入仍使用铅笔。 */\nbody[data-dsc-codex-body] [data-process-activity=\"commands\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-process-activity=\"tools\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"bash\"], [data-variant=\"others\"]):is([data-sample], [data-tool]) { --dsc-body-icon: var(--dsc-body-terminal); }\nbody[data-dsc-codex-body] [data-process-activity=\"edit\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-process-activity=\"write\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"])[data-tool] { --dsc-body-icon: var(--dsc-body-pencil); }\n/* read_image 的专用工具行和图像分组；普通 read 文件行继续使用宿主图标。 */\nbody[data-dsc-codex-body] [data-process-activity=\"readImage\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool]:is([data-tool=\"read_image\"], [data-tool=\"ops_read_image\"]) { --dsc-body-icon: var(--dsc-body-images); }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child { position: relative; width: 16px; min-width: 16px; height: 16px; }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon] > *,\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child > *,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child > * { visibility: hidden; }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon]::before,\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child::before,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child::before { content: ''; position: absolute; inset: 0; background: currentColor; mask: var(--dsc-body-icon) center / 16px 16px no-repeat; }\n/* 原生前导箭头移至右侧；只在悬停或键盘焦点时显示，点击展开后移出也隐藏。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool] [data-disclosure-row] > :first-child > svg { display: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool] [data-disclosure-row] > :first-child > span:first-child { opacity: 1 !important; transform: none !important; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable],\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable] { position: relative; padding-right: 18px; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable]::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable]::after { content: ''; position: absolute; right: 3px; top: 8px; width: 5px; height: 5px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: rotate(45deg); opacity: 0; transition: transform 160ms ease, opacity 120ms ease; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable]:is(:hover, :focus-visible, :has(:focus-visible))::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable]:is(:hover, :focus-visible, :has(:focus-visible))::after { opacity: 1; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable][aria-expanded=\"true\"]::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable][aria-expanded=\"true\"]::after { transform: rotate(225deg); }\n/* 沿用原生 TextShimmer 的无障碍隐藏副本，只重设灰色高光的扫过方式。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] { position: absolute; inset: 0; overflow: hidden; pointer-events: none; mask: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] > span { position: absolute; inset: 0; width: auto; color: var(--dsc-body-shimmer); transform: none; mask-image: linear-gradient(105deg, transparent 42%, #000 50%, transparent 58%); mask-size: 250% 100%; animation: dsc-body-light 2s linear infinite; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] > span > span { transform: none; animation: none; }\nbody[data-dsc-codex-body] [data-process-activity][aria-expanded=\"true\"] > [data-shimmer] > [aria-hidden=\"true\"] { display: none; }\n@keyframes dsc-body-light { from { mask-position: 130% 0; } to { mask-position: -30% 0; } }\n@keyframes dsc-body-thinking { from { background-position: 130% 0; } to { background-position: -30% 0; } }\n/* 宿主继续管理高度、滚动锚点与收起清理；这里只动画透明度和轻微位移。 */\nbody[data-dsc-codex-body] [data-step-process]:has([data-process-activity][aria-expanded=\"true\"]) > [data-step-process-body] > [data-step-process-content],\nbody[data-dsc-codex-body] [data-chat-flow] [data-disclosure-header] + *,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][aria-expanded=\"true\"] + * { animation: dsc-body-reveal 180ms cubic-bezier(.2,.8,.2,1) both; }\n@keyframes dsc-body-reveal { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: translateY(0); } }\n/* 正文流式平滑：脚本把正文容器裁到光标所在行，只露出已揭示的部分。 */\nbody[data-dsc-codex-body] .dsc-body-smooth-clip { overflow: hidden; overflow-anchor: none; }\n/* 容器整体裁剪时子块保持自然高度，避免被 flex 收缩压扁或改变换行。 */\nbody[data-dsc-codex-body] .dsc-body-smooth-clip > * { flex: 0 0 auto; }\n/* 含行内元素的段落与代码块无法逐字裁剪，降级为整块淡入。 */\nbody[data-dsc-codex-body] .dsc-body-smooth-fade { animation: dsc-body-smooth-in 200ms cubic-bezier(.2,.8,.2,1) both; }\n@keyframes dsc-body-smooth-in { from { opacity: 0; } to { opacity: 1; } }\n/* 写头柔边层，位置与高度由脚本逐帧设置；底色实色 + 左缘 mask 渐变淡入。 */\nbody[data-dsc-codex-body] .dsc-body-edge {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  z-index: 30;\n  pointer-events: none;\n  opacity: 0;\n  border-radius: 2px;\n  background: none;\n  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 14px);\n  mask-image: linear-gradient(90deg, transparent 0, #000 14px);\n}\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] { display: none; }\n  body[data-dsc-codex-body] [data-process-activity=\"thinking\"]::after { animation: none !important; color: var(--dsc-body-running) !important; background: none !important; }\n  body[data-dsc-codex-body] [data-step-process-content],\n  body[data-dsc-codex-body] [data-chat-flow] [data-disclosure-header] + *,\n  body[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] + * { animation: none !important; }\n  body[data-dsc-codex-body] .dsc-body-smooth-fade { animation: none !important; }\n  body[data-dsc-codex-body] .dsc-body-turn__label svg,\n  body[data-dsc-codex-body] [data-step-process-chevron],\n  body[data-dsc-codex-body] [data-chat-flow] [aria-expanded]::after { transition: none; }\n}\n";
    const HEADER_CSS_TEXT = "/* 标题/打开方式在上层，模式/智能体/后台任务与视图切换在下层。\n   display:contents 只改变排版，原 DOM、原按钮回调及菜单所有权不变。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-conversation-header] { display: grid; grid-template-columns: auto minmax(0, 1fr) 120px 28px; align-items: center; gap: 4px 8px; min-height: 44px; padding: 6px 14px; container-type: inline-size; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-conversation-header] [data-conversation-header-leading] { grid-area: 1 / 1; }\n/* 当前会话标题灰度：宿主给标题 span 单独设色，需同时命中标题文本与容器；\n   祖先面包屑按钮、操作与视图滑块保留宿主颜色。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title],\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title] > span:first-child { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title-row] { display: contents; container-type: normal; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title-cluster] { display: contents; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] { grid-area: 1 / 2; flex-wrap: wrap; min-width: 0; max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] > span,\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] > span > :is(span, button) { max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] { grid-area: 2 / 1 / auto / 3; flex-wrap: wrap; min-width: 0; max-width: 100%; gap: 4px 8px; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] > :not([data-slot]),\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] > [data-slot] > * { flex: none; max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] button { white-space: nowrap; }\n/* 宿主窄容器规则会隐藏这些文字；这里为独立操作行保留完整标签。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] span[title] { display: inline-flex; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] [data-team-action] button > span { display: inline; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-utilities] { grid-area: 1 / 3; justify-content: flex-end; flex-wrap: wrap; min-width: 0; max-width: 120px; gap: 4px 6px; margin: 0; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-open-in-app] { order: 100; flex: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-corner] { grid-area: 1 / 4; min-width: 28px; margin: 0; }\n/* 宿主按 (行宽 - 48) / 120 估算可见视图数。行宽由脚本写入可用空间，\n   不再固定 288px；胶囊随可见标签自然收窄/加宽，白色滑块用实测几何定位。\n   行本身保持透明且不接收点击，只有胶囊和更多按钮可交互。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] { grid-area: 2 / 1 / auto / -1; justify-self: end; display: flex; flex-wrap: nowrap; align-items: center; justify-content: flex-end; gap: 6px; width: var(--dsc-view-row-width, 100%); max-width: 100%; min-width: 0; margin: 0; padding: 0; pointer-events: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-views-own-row] [data-dsc-header-view-row] { grid-area: 3 / 1 / auto / -1; width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] > * { pointer-events: auto; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] [data-dsc-view-switch] { order: 0; flex: 0 1 auto; width: auto; max-width: var(--dsc-view-max-width, 100%); margin: 0; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] { grid-area: 2 / 3 / auto / 5; justify-self: end; box-sizing: border-box; display: flex; flex: 0 1 auto; flex-wrap: nowrap; align-items: stretch; gap: 0; width: auto; max-width: var(--dsc-view-max-width, 100%); height: 28px; min-height: 28px; min-width: 0; margin: 0; padding: 3px; border: 1px solid #484848; border-radius: 999px; corner-shape: round; background: #181818; position: relative; isolation: isolate; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch]::before { content: ''; position: absolute; z-index: 0; top: 3px; bottom: 3px; left: 0; width: var(--dsc-view-width, 0px); border-radius: 999px; corner-shape: round; background: #dfdfdf; opacity: var(--dsc-view-active, 1); transform: translateX(var(--dsc-view-left, 3px)); pointer-events: none; transition: transform 180ms var(--cx-ease-out), opacity 120ms ease; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] { box-sizing: border-box; flex: 0 1 auto; min-width: 0; max-width: 100%; min-height: 0; height: 20px; margin: 0; padding: 0 8px; border: 0; border-radius: 999px; corner-shape: round; color: #aaa; background: transparent; font: 500 12px/20px var(--cx-font-sans); text-align: center; white-space: nowrap; position: relative; z-index: 1; transition: color 150ms ease; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] > span { display: block; max-width: 88px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]::after { display: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] + [role=\"tab\"]::before { content: ''; position: absolute; left: 0; top: 6px; bottom: 6px; width: 1px; background: #555; pointer-events: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"true\"] { color: #242424; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:first-child[aria-selected=\"false\"] { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"false\"]:hover { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:focus-visible { outline: 1px solid #aaa; outline-offset: 1px; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"] { width: 24px; height: 28px; min-height: 28px; padding: 0; margin: 0; position: relative; }\n/* 视图目录使用四格图标，和右上方会话日志/反馈的三点菜单区分。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"] > svg { visibility: hidden; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"]::before { content: ''; position: absolute; width: 14px; height: 14px; left: 5px; top: 7px; background: currentColor; mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.2'%3E%3Crect x='1.5' y='1.5' width='5' height='5' rx='1'/%3E%3Crect x='9.5' y='1.5' width='5' height='5' rx='1'/%3E%3Crect x='1.5' y='9.5' width='5' height='5' rx='1'/%3E%3Crect x='9.5' y='9.5' width='5' height='5' rx='1'/%3E%3C/svg%3E\") center / contain no-repeat; pointer-events: none; }\n@container (max-width: 640px) {\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] { grid-column: 1 / -1; }\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] { grid-area: 3 / 1 / auto / -1; width: 100%; }\n}\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch]::before, body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] { transition: none; }\n}\n\n/* 浅色下保留顶部布局、选中滑块与原生操作，只换颜色。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-header-title],\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-header-title] > span:first-child { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] { border-color: #dedede; background: #f3f3f3; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch]::before { background: #fff; box-shadow: 0 1px 3px #00000014; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] + [role=\"tab\"]::before { background: #d4d4d4; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"true\"],\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:first-child[aria-selected=\"false\"],\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"false\"]:hover { color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:focus-visible { outline-color: #2b68cb; }\n";
    const NAVIGATION_CSS_TEXT = "/* 页面前进后退：只在导航组件启用时生效；关闭后侧栏按钮回到原位置与尺寸。 */\nbody[data-dsc-codex-navigation] {\n  --dsc-navigation-native-shift: 68px;\n  /* 宿主 Windows 捕获菜单由 preload 按 left: var(--dsh-windows-menu-start, 48px) 定位。\n     收起态宿主会把它抬到 84px 给原生新建会话键让位，但本插件收起态用自有 rail，那个键不可见。\n     两态统一按“展开默认 48px + 位移”定位，菜单始终紧接折叠键右缘 8px。 */\n  --dsh-windows-menu-start: calc(48px + var(--dsc-navigation-native-shift));\n}\n\n/* 后退 / 前进：两个 32px 按钮，left 8，gap 2；中心约 24 / 58。 */\nbody[data-dsc-codex-navigation] .dsc-nav-controls {\n  position: fixed;\n  top: 4px;\n  left: 8px;\n  z-index: 36;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  -webkit-app-region: no-drag;\n}\n\n.dsc-nav-controls .dsc-nav-button {\n  box-sizing: border-box;\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: #8f8f8f;\n  cursor: default;\n  -webkit-app-region: no-drag;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-nav-controls .dsc-nav-button[aria-disabled='true'] {\n  color: #535353;\n}\n\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']) {\n  cursor: pointer;\n}\n\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):hover,\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):focus-visible {\n  background: #ffffff14;\n  color: #b4b4b4;\n}\n\n.dsc-nav-controls .dsc-nav-button:focus-visible {\n  outline: 1px solid #ffffff40;\n  outline-offset: -1px;\n}\n\n/* 复用的侧栏按钮移到第三位：中心约 92；内部按钮同步 32px / 8px 圆角。 */\nbody[data-dsc-codex-navigation] .dsc-window-sidebar-toggle {\n  top: 4px;\n  left: 76px;\n}\n\nbody[data-dsc-codex-navigation] .dsc-window-sidebar-toggle .dsc-icon-button {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n}\n\n/* 悬停/键盘聚焦提示：深灰圆角；portal 到 body 且高于标题栏拖拽区。 */\n.dsc-nav-tooltip {\n  position: fixed;\n  z-index: 10002;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  max-width: calc(100vw - 16px);\n  padding: 6px 10px;\n  border-radius: 12px;\n  background: #303030;\n  color: #e8e8e8;\n  font-size: 13px;\n  line-height: 18px;\n  white-space: nowrap;\n  box-shadow: 0 6px 20px #0006;\n  pointer-events: none;\n  -webkit-app-region: no-drag;\n}\n\n.dsc-nav-tooltip__keys {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  margin-left: 8px;\n}\n\n.dsc-nav-tooltip__key {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 6px;\n  background: #505050;\n  color: #ededed;\n  font-size: 11px;\n  line-height: 18px;\n}\n\n.dsc-nav-tooltip__plus {\n  padding: 0 1px;\n  color: #8a8a8a;\n  font-size: 11px;\n  line-height: 18px;\n}\n\n/* 原生固定按钮右移：只标记最小宿主按钮；右上窗口按钮与标题栏拖拽区不移动。 */\nbody[data-dsc-codex-navigation] [data-dsc-navigation-native-shift] {\n  transform: translateX(var(--dsc-navigation-native-shift));\n}\n\n/* 自绘侧栏按钮覆盖原生旧位置；原生切换键隐藏，避免两套按钮露出或重叠。 */\nbody[data-dsc-codex-navigation] [data-dsc-navigation-native-toggle] {\n  visibility: hidden !important;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-nav-controls .dsc-nav-button {\n    transition: none;\n  }\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-controls .dsc-nav-button { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-controls .dsc-nav-button[aria-disabled='true'] { color: #c1c1c1; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):hover,\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):focus-visible { background: #0000000d; color: #303030; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-controls .dsc-nav-button:focus-visible { outline-color: #2b68cb; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-nav-tooltip { background: #0d0d0d; color: #fff; }\n";
    const IMAGE_ANNOTATIONS_CSS_TEXT = "/* 图片批注：仅作用于自有 .dsc-ia-* 结构，不修改宿主令牌与布局。\n   尺寸依据本轮视觉规范（30px 点、294px 弹层、44px 工具条、32x192 笔宽滑条）。 */\n\n.dsc-ia-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147482000;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  background: rgba(0, 0, 0, 0.65);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  outline: none;\n  overscroll-behavior: contain;\n}\n\n/* 只继承字体族：不能用 font/color 简写继承盖过浅色按钮上的显式深色文字。 */\n.dsc-ia-root button {\n  font-family: inherit;\n}\n\n.dsc-ia-backdrop {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n/* 顶部动作条：图片名、缩放、适应、下载、关闭。 */\n.dsc-ia-top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  min-height: 52px;\n  padding: 8px 16px;\n  box-sizing: border-box;\n  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  pointer-events: none;\n}\n\n.dsc-ia-top > * {\n  pointer-events: auto;\n}\n\n/* Windows 自绘标题栏的最小化/最大化/关闭键固定在右上角并压在页面之上；\n   顶部动作条整体下移到标题栏以下，避免图片的关闭键被窗口关闭键遮住。 */\nhtml[data-windows-titlebar] .dsc-ia-top {\n  top: 36px;\n}\n\n.dsc-ia-title {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  min-width: 0;\n  color: #e6e6e6;\n}\n\n.dsc-ia-title-name {\n  max-width: 46vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dsc-ia-title-index {\n  flex: none;\n  color: #989898;\n  font-size: 12px;\n}\n\n.dsc-ia-actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex: none;\n}\n\n.dsc-ia-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  height: 32px;\n  padding: 0 8px;\n  border: 0;\n  border-radius: 8px;\n  background: rgba(24, 24, 24, 0.62);\n  color: #dfdfdf;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-action:hover {\n  background: rgba(255, 255, 255, 0.14);\n  color: #fff;\n}\n\n.dsc-ia-action:focus-visible,\n.dsc-ia-tool:focus-visible,\n.dsc-ia-toolbar-button:focus-visible,\n.dsc-ia-primary:focus-visible,\n.dsc-ia-nav:focus-visible,\n.dsc-ia-popup button:focus-visible,\n.dsc-ia-pill button:focus-visible,\n.dsc-ia-grip:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.55);\n  outline-offset: 1px;\n}\n\n.dsc-ia-zoom-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n/* 舞台：图片居中 contain，可平移；点与 SVG 覆盖在图片内容 rect 上。 */\n.dsc-ia-stage {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  overflow: hidden;\n  touch-action: none;\n}\n\n.dsc-ia-canvas {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform-origin: center center;\n  will-change: transform;\n}\n\n.dsc-ia-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  user-select: none;\n  -webkit-user-drag: none;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);\n  background: #111;\n  box-sizing: border-box;\n}\n\n/* 评论编号点：30px，蓝色水滴（左下角 3px），缩放时反向补偿保持视觉大小。 */\n.dsc-ia-dots {\n  position: absolute;\n  inset: 0;\n}\n\n.dsc-ia-dot {\n  position: absolute;\n  z-index: 2;\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.35);\n  border-radius: 50% 50% 50% 3px;\n  background: #8bc3fe;\n  color: #fff;\n  cursor: pointer;\n  box-sizing: border-box;\n  transform: translate(-50%, -50%) scale(var(--dsc-ia-dot-scale, 1));\n  transform-origin: center center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 120ms ease, border-color 120ms ease;\n}\n\n.dsc-ia-dot-label {\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.dsc-ia-dot.is-draft {\n  pointer-events: none;\n  cursor: default;\n}\n\n.dsc-ia-dot:hover,\n.dsc-ia-dot.is-active {\n  border-color: #fff;\n  transform: translate(-50%, -50%) scale(calc(var(--dsc-ia-dot-scale, 1) * 1.05));\n}\n\n.dsc-ia-cursor-dot {\n  position: absolute;\n  z-index: 1;\n  width: 30px;\n  height: 30px;\n  border-radius: 50% 50% 50% 3px;\n  background: #8bc3fe;\n  opacity: 0.55;\n  pointer-events: none;\n  transform: translate(-50%, -50%) scale(var(--dsc-ia-dot-scale, 1));\n  transform-origin: center center;\n}\n\n/* 手绘 SVG */\n.dsc-ia-marks {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  touch-action: none;\n  cursor: crosshair;\n}\n\n.dsc-ia-marks[data-tool=\"select\"] {\n  cursor: default;\n}\n\n.dsc-ia-marks[data-tool=\"eraser\"] {\n  cursor: cell;\n}\n\n.dsc-ia-marks[data-tool=\"text\"] {\n  cursor: text;\n}\n\n.dsc-ia-marks[data-tool=\"preview\"] {\n  cursor: default;\n}\n\n.dsc-ia-marks .dsc-ia-mark {\n  pointer-events: none;\n}\n\n.dsc-ia-marks[data-tool=\"select\"] .dsc-ia-mark,\n.dsc-ia-marks[data-tool=\"eraser\"] .dsc-ia-mark {\n  pointer-events: auto;\n  cursor: move;\n}\n\n.dsc-ia-marks[data-tool=\"eraser\"] .dsc-ia-mark {\n  cursor: cell;\n}\n\n.dsc-ia-selection {\n  pointer-events: none;\n}\n\n/* 左右切图 */\n.dsc-ia-nav {\n  position: absolute;\n  top: 50%;\n  z-index: 6;\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: translateY(-50%);\n  transition: background-color 120ms ease;\n}\n\n.dsc-ia-nav:hover {\n  background: rgba(255, 255, 255, 0.16);\n}\n\n.dsc-ia-nav:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n\n.dsc-ia-nav-prev {\n  left: 20px;\n}\n\n.dsc-ia-nav-next {\n  right: 20px;\n}\n\n/* 预览态底部浮动工具条（标注 / 添加评论） */\n.dsc-ia-toolbar {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 48px;\n  padding: 2px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  cursor: grab;\n  touch-action: none;\n}\n\n.dsc-ia-toolbar:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-toolbar-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 42px;\n  padding: 0 14px;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #dfdfdf;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-toolbar-button:hover {\n  background: rgba(255, 255, 255, 0.09);\n  color: #fff;\n}\n\n/* 评论态底部栏：拖拽柄 + 提示/计数 + 完成批注 + 关闭 */\n.dsc-ia-bottom {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 48px;\n  padding: 2px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  touch-action: none;\n}\n\n.dsc-ia-grip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 40px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #8f8f8f;\n  cursor: grab;\n}\n\n.dsc-ia-grip:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-bottom-label {\n  padding: 0 10px;\n  color: #cfcfcf;\n  font-size: 13px;\n  white-space: nowrap;\n}\n\n.dsc-ia-primary {\n  height: 40px;\n  padding: 0 18px;\n  border: 0;\n  border-radius: 999px;\n  background: #dfdfdf;\n  color: #111;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 120ms ease;\n}\n\n.dsc-ia-primary:hover {\n  background: #fff;\n}\n\n/* 评论输入弹层：294x44 / 294x120 */\n.dsc-ia-popup {\n  position: fixed;\n  z-index: 8;\n  width: 294px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.09);\n  border-radius: 22px;\n  background: #303030;\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.dsc-ia-popup.is-unpositioned,\n.dsc-ia-text-editor.is-unpositioned {\n  visibility: hidden;\n}\n\n.dsc-ia-popup.is-new {\n  display: flex;\n  align-items: center;\n  padding: 0 6px 0 16px;\n  height: 44px;\n}\n\n.dsc-ia-popup.is-edit {\n  display: flex;\n  flex-direction: column;\n  height: 120px;\n  padding: 8px 16px 0;\n}\n\n.dsc-ia-popup-input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dsc-ia-popup-input::placeholder {\n  color: #8d8d8d;\n}\n\n.dsc-ia-popup-textarea {\n  width: 100%;\n  height: auto;\n  padding: 0;\n  resize: none;\n  overflow: auto;\n}\n\n.dsc-ia-popup-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex: none;\n  height: 48px;\n}\n\n.dsc-ia-popup-buttons {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.dsc-ia-popup-trash {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #bdbdbd;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-trash:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #ff6764;\n}\n\n.dsc-ia-popup-cancel {\n  height: 32px;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #cfcfcf;\n  font-size: 13px;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-cancel:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n.dsc-ia-popup-save {\n  height: 32px;\n  padding: 0 16px;\n  border: 0;\n  border-radius: 999px;\n  background: #dfdfdf;\n  color: #111;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-save:hover {\n  background: #fff;\n}\n\n.dsc-ia-popup-save:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.dsc-ia-popup-send {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: #dfdfdf;\n  color: #111;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-send:hover {\n  background: #fff;\n}\n\n/* 手绘文字的独立输入框 */\n.dsc-ia-text-editor {\n  position: fixed;\n  z-index: 8;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  width: 240px;\n  height: 38px;\n  padding: 0 6px 0 12px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 19px;\n  background: #303030;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);\n}\n\n.dsc-ia-text-input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dsc-ia-text-input::placeholder {\n  color: #8d8d8d;\n}\n\n.dsc-ia-text-actions {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex: none;\n}\n\n/* 手绘工具条：44px 深灰，图标工具与菜单 */\n.dsc-ia-markup-anchor {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 7;\n  touch-action: none;\n}\n\n.dsc-ia-markup-toolbar {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 44px;\n  padding: 2px 4px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.96);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  cursor: grab;\n}\n\n.dsc-ia-markup-toolbar:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-tool {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border: 0;\n  border-radius: 10px;\n  background: transparent;\n  color: #d6d6d6;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-tool:hover {\n  background: rgba(255, 255, 255, 0.09);\n  color: #fff;\n}\n\n.dsc-ia-tool.is-active {\n  background: #363636;\n  color: #fff;\n}\n\n.dsc-ia-tool:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.dsc-ia-tool:disabled:hover {\n  background: transparent;\n}\n\n.dsc-ia-tool-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsc-ia-divider {\n  width: 1px;\n  height: 20px;\n  margin: 0 4px;\n  background: rgba(255, 255, 255, 0.14);\n}\n\n.dsc-ia-tool-color {\n  width: 36px;\n}\n\n.dsc-ia-color-dot {\n  display: block;\n  width: 18px;\n  height: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  box-sizing: border-box;\n}\n\n/* 弹出菜单：形状与颜色 */\n.dsc-ia-menu {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 9;\n  padding: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  background: #2d2d2d;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);\n}\n\n.dsc-ia-shape-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 116px;\n}\n\n.dsc-ia-menu-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 34px;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: #dfdfdf;\n  font-size: 13px;\n  text-align: left;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.dsc-ia-menu-item:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n\n.dsc-ia-menu-item.is-active {\n  background: #363636;\n  color: #fff;\n}\n\n.dsc-ia-color-menu {\n  display: flex;\n  gap: 6px;\n}\n\n.dsc-ia-color-swatch {\n  width: 26px;\n  height: 26px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 50%;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n\n.dsc-ia-color-swatch.is-active {\n  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);\n}\n\n.dsc-ia-zoom-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 108px;\n  top: calc(100% + 8px);\n  bottom: auto;\n  left: auto;\n  right: 0;\n  transform: none;\n}\n\n/* 左侧竖向笔宽滑条：32x192，轨道上下各 16px */\n.dsc-ia-size-slider {\n  position: fixed;\n  left: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 7;\n  width: 32px;\n  height: 192px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  background: rgba(45, 45, 45, 0.92);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  cursor: ns-resize;\n  touch-action: none;\n}\n\n.dsc-ia-size-rail {\n  position: absolute;\n  left: 50%;\n  top: 16px;\n  bottom: 16px;\n  width: 2px;\n  margin-left: -1px;\n  border-radius: 2px;\n  background: rgba(175, 175, 175, 0.4);\n  transition: width 300ms ease, margin-left 300ms ease, background-color 300ms ease;\n}\n\n.dsc-ia-size-slider:hover .dsc-ia-size-rail,\n.dsc-ia-size-slider:focus-visible .dsc-ia-size-rail,\n.dsc-ia-size-slider.is-dragging .dsc-ia-size-rail {\n  width: 8px;\n  margin-left: -4px;\n  background: rgba(220, 220, 220, 0.5);\n}\n\n.dsc-ia-size-thumb {\n  position: absolute;\n  left: 50%;\n  width: 16px;\n  height: 16px;\n  margin-left: -8px;\n  margin-top: -8px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);\n  transition: transform 120ms ease;\n}\n\n.dsc-ia-size-slider:hover .dsc-ia-size-thumb,\n.dsc-ia-size-slider:focus-visible .dsc-ia-size-thumb,\n.dsc-ia-size-slider.is-dragging .dsc-ia-size-thumb {\n  transform: scale(1.1);\n}\n\n.dsc-ia-size-slider:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.55);\n  outline-offset: 2px;\n}\n\n/* 图片旁“N 条批注”胶囊 */\n.dsc-ia-pill {\n  display: inline-flex;\n  align-items: center;\n  height: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  color: #dfdfdf;\n  font-size: 12px;\n  overflow: hidden;\n  vertical-align: middle;\n}\n\n.dsc-ia-pill-open {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 100%;\n  padding: 0 8px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.dsc-ia-pill-open:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n.dsc-ia-pill-clear {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  border-left: 1px solid rgba(255, 255, 255, 0.08);\n  background: transparent;\n  color: #989898;\n  cursor: pointer;\n}\n\n.dsc-ia-pill-clear:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n/* 错误与无障碍 */\n.dsc-ia-error {\n  position: fixed;\n  left: 50%;\n  bottom: 96px;\n  z-index: 10;\n  max-width: min(560px, calc(100vw - 32px));\n  padding: 8px 14px;\n  border: 1px solid #ff6764;\n  border-radius: 10px;\n  background: rgba(60, 20, 20, 0.96);\n  color: #ffd6d5;\n  font-size: 13px;\n  transform: translateX(-50%);\n}\n\n.dsc-ia-sr {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.dsc-ia-empty {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #bdbdbd;\n  font-size: 14px;\n}\n\n/* 小视口：弹层不越界，工具条不撑破屏幕 */\n@media (max-width: 640px) {\n  .dsc-ia-popup {\n    width: min(294px, calc(100vw - 16px));\n  }\n\n  .dsc-ia-bottom,\n  .dsc-ia-toolbar {\n    max-width: calc(100vw - 16px);\n  }\n\n  .dsc-ia-bottom-label {\n    white-space: normal;\n    line-height: 16px;\n  }\n\n  .dsc-ia-size-slider {\n    left: 8px;\n    height: 160px;\n  }\n\n  .dsc-ia-title-name {\n    max-width: 34vw;\n  }\n\n  .dsc-ia-nav-prev {\n    left: 8px;\n  }\n\n  .dsc-ia-nav-next {\n    right: 8px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-ia-root *,\n  .dsc-ia-root *::before,\n  .dsc-ia-root *::after {\n    transition-duration: 0.001ms !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n\n/* 随主界面的浅色模式换肤；不对原图、手绘 SVG、色板或编号点应用反色。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-root {\n  color: #171717;\n  background: rgba(242, 243, 245, 0.94);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-top {\n  background: linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0));\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-title { color: #333; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-title-index { color: #777; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-action {\n  background: rgba(255, 255, 255, 0.94);\n  color: #303030;\n  box-shadow: inset 0 0 0 1px #dedede;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-action:hover {\n  background: #e9e9e9;\n  color: #0d0d0d;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-action, .dsc-ia-tool, .dsc-ia-toolbar-button, .dsc-ia-primary, .dsc-ia-nav, .dsc-ia-popup button, .dsc-ia-pill button, .dsc-ia-grip, .dsc-ia-size-slider):focus-visible {\n  outline-color: #2b68cb;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-image {\n  border-color: rgba(0, 0, 0, 0.08);\n  background: #fff;\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-nav {\n  border-color: #dedede;\n  background: rgba(255, 255, 255, 0.94);\n  color: #303030;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-nav:hover { background: #e9e9e9; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-toolbar, .dsc-ia-bottom, .dsc-ia-markup-toolbar) {\n  border-color: #dedede;\n  background: rgba(255, 255, 255, 0.96);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-toolbar-button, .dsc-ia-tool, .dsc-ia-menu-item) { color: #333; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-toolbar-button, .dsc-ia-tool, .dsc-ia-menu-item):hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: #0d0d0d;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-tool, .dsc-ia-menu-item).is-active {\n  background: #eaf2ff;\n  color: #245fb9;\n}\n\n/* 禁用工具仍沿用原先透明背景，避免浅色 hover 覆盖原禁用规则。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-tool:disabled:hover { background: transparent; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-grip { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-bottom-label { color: #666; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-primary, .dsc-ia-popup-save, .dsc-ia-popup-send) {\n  background: #0d0d0d;\n  color: #fff;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-primary, .dsc-ia-popup-save, .dsc-ia-popup-send):hover { background: #303030; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-popup, .dsc-ia-text-editor, .dsc-ia-menu) {\n  border-color: #dedede;\n  background: #fff;\n  color: #171717;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-popup-input, .dsc-ia-text-input) { color: #171717; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-popup-input, .dsc-ia-text-input)::placeholder { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-popup-trash, .dsc-ia-popup-cancel) { color: #666; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-popup-trash:hover {\n  background: rgba(196, 57, 53, 0.08);\n  color: #c43935;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-popup-cancel:hover {\n  background: rgba(0, 0, 0, 0.06);\n  color: #0d0d0d;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-divider { background: rgba(0, 0, 0, 0.12); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-color-dot, .dsc-ia-color-swatch) { border-color: rgba(0, 0, 0, 0.25); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-color-swatch.is-active { box-shadow: 0 0 0 2px #2b68cb; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-size-slider {\n  border-color: #dedede;\n  background: rgba(255, 255, 255, 0.96);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-size-rail { background: #c8c8c8; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-size-slider:is(:hover, :focus-visible, .is-dragging) .dsc-ia-size-rail { background: #ababab; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-size-thumb { box-shadow: 0 0 0 1.5px #2b68cb, 0 1px 4px rgba(0, 0, 0, 0.12); }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-pill {\n  border-color: #c6d9f9;\n  background: #eaf2ff;\n  color: #245fb9;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-pill-clear {\n  border-left-color: #c6d9f9;\n  color: #245fb9;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-ia-pill-open, .dsc-ia-pill-clear):hover {\n  background: #dceaff;\n  color: #174a98;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-error {\n  border-color: #c43935;\n  background: rgba(255, 241, 240, 0.97);\n  color: #a82c28;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-ia-empty { color: #666; }\n\n/* 图片批注集成层样式：只服务本插件自绘的附件 rail、胶囊行、恢复错误与历史图片框。\n   批注编辑器本体（.dsc-ia-*）由 image-annotations.css 提供，不在这里重复。 */\n\n.dsc-iai-rail-wrap {\n  min-width: 0;\n  margin-bottom: -4px;\n  padding: 2px 10px 0;\n  position: relative;\n}\n\n.dsc-iai-rail {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  padding-bottom: 2px;\n}\n\n.dsc-iai-rail::-webkit-scrollbar {\n  display: none;\n}\n\n.dsc-iai-rail-item {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  max-width: 168px;\n}\n\n.dsc-iai-rail-image {\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.dsc-iai-thumb {\n  width: 64px;\n  height: 64px;\n  padding: 0;\n  border: .5px solid var(--dsw-alias-border-l2-darkmode-thin, var(--dsw-alias-border-l2, rgba(255, 255, 255, .1)));\n  border-radius: 14px;\n  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, .06));\n  cursor: zoom-in;\n  overflow: hidden;\n  display: block;\n}\n\n.dsc-iai-thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n.dsc-iai-thumb:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary, #339cff);\n  outline-offset: 2px;\n}\n\n.dsc-iai-remove {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  z-index: 1;\n  width: 18px;\n  height: 18px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--dsw-alias-button-contrast-fill, rgba(0, 0, 0, .72));\n  color: var(--dsw-alias-label-primary-inverted, #fff);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity .2s ease-in-out;\n}\n\n.dsc-iai-rail-item:hover .dsc-iai-remove,\n.dsc-iai-file:hover .dsc-iai-remove,\n.dsc-iai-remove:focus-visible {\n  opacity: 1;\n}\n\n@media (pointer: coarse) {\n  .dsc-iai-remove {\n    opacity: 1;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-iai-remove {\n    transition: none;\n  }\n}\n\n.dsc-iai-pill-row {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  max-width: 100%;\n}\n\n.dsc-iai-recall-error {\n  max-width: 168px;\n  padding: 2px 6px;\n  border: 1px solid var(--dsw-alias-state-error-primary, #ff6764);\n  border-radius: 999px;\n  background: transparent;\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n  font-size: 11px;\n  line-height: 16px;\n  text-align: left;\n  cursor: pointer;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsc-iai-recall-error:hover {\n  background: var(--dsw-alias-state-error-tertiary, rgba(255, 103, 100, .12));\n}\n\n.dsc-iai-inline-error {\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n  font-size: 12px;\n  line-height: 18px;\n  padding: 2px 2px 0;\n}\n\n/* ------------------------------ 文件卡 ------------------------------ */\n\n.dsc-iai-file {\n  position: relative;\n  flex: none;\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  width: 240px;\n  height: 64px;\n  padding: 0 12px;\n  border: .5px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, .1));\n  border-radius: 14px;\n  background: var(--dsw-specific-input-major, rgba(55, 55, 55, .94));\n  text-align: left;\n}\n\n.dsc-iai-file.is-error {\n  border-color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-file-icon {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: .02em;\n  color: var(--dsw-alias-label-secondary, rgba(255, 255, 255, .7));\n}\n\n.dsc-iai-spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: dsc-iai-file-spin .8s linear infinite;\n}\n\n@keyframes dsc-iai-file-spin {\n  to { transform: rotate(360deg); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-iai-spinner { animation: none; }\n}\n\n.dsc-iai-file-body {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  padding: 0;\n  border: none;\n  background: none;\n  color: inherit;\n  text-align: left;\n}\n\n.dsc-iai-file-retry {\n  cursor: pointer;\n  font: inherit;\n}\n\n.dsc-iai-file-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-primary, #fff);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 22px;\n}\n\n.dsc-iai-file-meta {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 15px;\n}\n\n.dsc-iai-file-meta.is-error {\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-progress {\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  bottom: 5px;\n  height: 2px;\n  border-radius: 1px;\n  background: var(--dsw-alias-fill-tertiary, rgba(255, 255, 255, .08));\n  overflow: hidden;\n}\n\n.dsc-iai-progress-bar {\n  display: block;\n  height: 100%;\n  width: 35%;\n  border-radius: inherit;\n  background: var(--dsw-alias-brand-primary, #0285ff);\n  animation: dsc-iai-file-progress 1.2s ease-in-out infinite alternate;\n}\n\n.dsc-iai-progress-bar[style] {\n  animation: none;\n}\n\n@keyframes dsc-iai-file-progress {\n  0% { transform: translate(-70%); }\n  to { transform: translate(220%); }\n}\n\n/* ------------------------------ 拖放遮罩 ------------------------------ */\n\n.dsc-iai-drop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  display: grid;\n  place-items: center;\n  background: rgba(0, 0, 0, .55);\n  pointer-events: none;\n}\n\n.dsc-iai-drop-card {\n  min-width: 280px;\n  max-width: min(420px, 80vw);\n  padding: 20px 28px;\n  border: 1px dashed var(--dsw-alias-border-l4, rgba(255, 255, 255, .18));\n  border-radius: 20px;\n  background: var(--dsw-alias-bg-layer-1, #212121);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, .45);\n  text-align: center;\n}\n\n.dsc-iai-drop.is-blocked .dsc-iai-drop-card {\n  border-color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-drop-title {\n  color: var(--dsw-alias-label-primary, #fff);\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 22px;\n}\n\n.dsc-iai-drop-desc {\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n}\n\n/* ------------------------------ 历史图片 ------------------------------ */\n\n.dsc-iai-history-group {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: flex-end;\n  gap: 10px;\n  max-width: 100%;\n}\n\n.dsc-iai-history-group[data-align=\"start\"] {\n  justify-content: flex-start;\n}\n\n.dsc-iai-history {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n  min-width: 0;\n}\n\n.dsc-iai-history[data-align=\"start\"] {\n  align-items: flex-start;\n}\n\n.dsc-iai-history-frame {\n  position: relative;\n  box-sizing: border-box;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  overflow: hidden;\n  border: .5px solid var(--dsw-alias-border-l2-darkmode-thin, var(--dsw-alias-border-l2, rgba(255, 255, 255, .1)));\n  border-radius: 16px;\n  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, .06));\n  cursor: zoom-in;\n}\n\n.dsc-iai-history-frame img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: cover;\n}\n\n.dsc-iai-history-frame:focus-visible,\n.dsc-iai-history-error:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary, #339cff);\n  outline-offset: 2px;\n}\n\n.dsc-iai-history-loading {\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n  padding: 0 10px;\n}\n\n.dsc-iai-history-error {\n  max-width: 240px;\n  padding: 10px 12px;\n  border: .5px solid var(--dsw-alias-state-error-primary, #ff6764);\n  border-radius: 12px;\n  background: var(--dsw-alias-interactive-bg-hover-danger, rgba(255, 103, 100, .08));\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n  cursor: pointer;\n}\n\n/* 浅色只调整附件周边 UI，图片像素和上传/批注状态保持原样。 */\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-iai-thumb, .dsc-iai-history-frame) {\n  border-color: rgba(0, 0, 0, 0.12);\n  background: #f3f3f3;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-remove {\n  background: rgba(0, 0, 0, 0.72);\n  color: #fff;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-file {\n  border-color: #dedede;\n  background: #fff;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-iai-file.is-error, .dsc-iai-recall-error) { border-color: #c43935; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-file-icon { color: #666; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-file-name { color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-iai-file-meta, .dsc-iai-history-loading) { color: #898989; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] :is(.dsc-iai-file-meta.is-error, .dsc-iai-recall-error, .dsc-iai-inline-error) { color: #c43935; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-recall-error:hover { background: rgba(196, 57, 53, 0.08); }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-progress { background: #e5e5e5; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-spinner {\n  border-color: #898989;\n  border-top-color: transparent;\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-drop { background: rgba(242, 243, 245, 0.8); }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-drop-card {\n  border-color: #ababab;\n  background: #fff;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14);\n}\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-drop.is-blocked .dsc-iai-drop-card { border-color: #c43935; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-drop-title { color: #0d0d0d; }\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-drop-desc { color: #898989; }\n\nbody[data-dsh-codex-style][data-dsc-color-scheme=\"light\"] .dsc-iai-history-error {\n  border-color: #c43935;\n  background: #fff1f0;\n  color: #a82c28;\n}\n";
    const PROTOTYPE_ICONS = {"home":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path d=\"M3 7.2 8 3.2l5 4v5.3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/></svg>","tasks":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"5.5\"/><path d=\"M8 5v3l2 1.5\"/></svg>","plugins":"<svg class=\"dsc-rail__plugin-icon\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M7.5 3v4m5-4v4M5.5 7h9v2.8a4.5 4.5 0 0 1-9 0V7ZM10 14.3v3.2\"/></svg>","settings":"<svg viewBox=\"0 0 20 20\" width=\"18\" height=\"18\" stroke-width=\"1.4\" aria-hidden=\"true\">\n          <path d=\"M8.80 3.20 L9.07 1.85 A8.20 8.20 0 0 1 10.93 1.85 L11.20 3.20 A6.90 6.90 0 0 1 13.96 4.35 L15.10 3.58 A8.20 8.20 0 0 1 16.42 4.90 L15.65 6.04 A6.90 6.90 0 0 1 16.80 8.80 L18.15 9.07 A8.20 8.20 0 0 1 18.15 10.93 L16.80 11.20 A6.90 6.90 0 0 1 15.65 13.96 L16.42 15.10 A8.20 8.20 0 0 1 15.10 16.42 L13.96 15.65 A6.90 6.90 0 0 1 11.20 16.80 L10.93 18.15 A8.20 8.20 0 0 1 9.07 18.15 L8.80 16.80 A6.90 6.90 0 0 1 6.04 15.65 L4.90 16.42 A8.20 8.20 0 0 1 3.58 15.10 L4.35 13.96 A6.90 6.90 0 0 1 3.20 11.20 L1.85 10.93 A8.20 8.20 0 0 1 1.85 9.07 L3.20 8.80 A6.90 6.90 0 0 1 4.35 6.04 L3.58 4.90 A8.20 8.20 0 0 1 4.90 3.58 L6.04 4.35 A6.90 6.90 0 0 1 8.80 3.20\"/>\n          <circle cx=\"10\" cy=\"10\" r=\"2.3\"/>\n        </svg>","appearance":"<svg viewBox=\"0 0 20 20\" width=\"18\" height=\"18\" stroke-width=\"1.4\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"10\" r=\"7\"/><path d=\"M10 3a7 7 0 0 0 0 14z\" fill=\"currentColor\" stroke=\"none\"/></svg>","newChat":"<svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9\"/><path d=\"m10.9 2.7-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8\"/></svg>"};
    const BRAND_MARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADBCAYAAAAgsW7DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABgkSURBVHhe7d0HtD1VdcdxCxoJwd6CgooRGyqClYgNlNgrEUPsiBorYoyxKxK7sRGMYkVFl41oUOygYokaY4klQbFrIgj2/j1ZP9j/rPf//d//vVvOzJyZuz9rsVgL7ptz5szcuTNn9tn7POdJKaWUUkoppZRSSimllFJKKaWUUkoppZT6VkrZCzgQuJL/v5TShAEPLQH4OXCIfyalNEHA3lu+/GsuAj8upVzSP5tSmhjgA34BEODB/tmU0jpKKRcC/rSUckU9Q5dSdgMu7p9rDbCff/HXONk/n9JKA3YFbgb8HfCPwEeATwGnAT8BfgP8DvgV8EPgc8AHgWcAt/TtDQ14v3/rtwB+oYua/01KKyN+0Q8Gjokv80/9izKPuFjc2NsZAnAd75/TvvvfpTRpwHWBJwAf1S+5fymWFXcHl/Z2+wa8xPvmgDf536U0OcCewOOBz/qXoAMnl1Iu4n3oE7Aj8D3vmAPOGsNcRkpzAy4PPAI4Ffi9n/y1Af8O3MX7MYRSygHev+0BHuB/n9IoATsBdwXeWko520/2rgDPKaVc0PszlOjPTIAvl1Iu4NtIaSb60imopJSye4Sa6gt4t1LKYcCTgaOBY7fzz4uBJwL3j7/TP/vFKzdt8/ze3noU7AI8F/iGn+BdAw71/gwN+KT3cyOaE/FtpLSV+HW9BnAv4LH6lVWQCfCteEX2az+xFgX8LLb5ReAk4BXAI4HbAVfR7b1uc4GjSimf8b/viy5cPk5DAy6j8fO+biRebR7o20orTJND8SU7Engf8E0/cYYQJ+tSr+tqAP7Wx6wFpZSbeF9nAfwSuLVvL60Q4KrAw4ATgf/1kySdC/iQj10rgAd6f2cVrzDv59uconh03c3/+8qJ2fJDdVIDv/WTIm2Nc+3t49gK4B+8z/MCXg9cwbc9FcA9NV8UkZ3vAvbwz0yebhWB1+lZ20+AtH0K/fWxbAnwdu/zIoAzSylPLaVc1tsYM83brLOv312Ju4FSyvki9PUUH4Q0G62t93FtCXCC93kZsebhSIVNe1tjo2On2zffRwH+2T8/KfHF/7TveJoPcAsf25boUc77XENMvL5GodTe5hhogZfv01oxyT29eIh4N5+/+JUA+/sYt6TrcGdFVQIv1dyRt90q4G98P5weA4A/8r8drQjMOc53NC3tAB/rligk2TvcBeAHmkzz9luz2S//FsB3JnMB0BUv0j6lyoC/9/FuiZY1e5+7BLywlLKD92NoCs1WTgfv7/YooK2lcO6FRJTcib5zqR7dYvu4t2TeMOAagPeUUv7Y+zIU4AbAx72fGwE+5tsZFeAewBm+Y6m+liPmgHd7f/ugi4D3pW/AtSK5y++8f5sB3ujbG4V4tfc836HUHeDzrc4Y134NOA/g+d6fGoALa3EYcIlSyp/onNcdB7ALcL2IXlW4+txf/C20MM3bbZ6CNPKWfxhdnezLUpYf72ufgNt7n2YVX/JbxmIzRSN+OPIsaIb+DIWnx+IzLRI7XXkNvf1FjS4EOuL2T/MdSf0BDvfjMjRNUno/+xQhtjt5v7YH2FmFSnTnMuT6k9bjO7YC7At833ciDeJZjU2AHeod7BtwhPfLlVIuFtmXT/e/71ssgtrF+9ikUsqd513vnbqlOQGlE/djNYRFlwPXBHx7o4tiPLMr/r4JwJdafJW5DeDuwB98B1IblIpr6GASZSRu4QcCuNM6fbtmJE1tihbFeV+bA9wxv/zti/fwe/nx69OQWZK2UBSq9em+Kkzqn2vEYWv72hzg+jVnPFO3IrvOw/049gV4mfepb3GLf05OR+CZ/v9boR9V4Oo+hs0Arqy4a+94ah9wvGa5/Zh2TSs/vS8D2Qt4kf/HlgD/WUo5r49hE+J5bvBZ0rS4mCC8th/bLimrcgt3jC1N9G1Pq/EcembaAXivdziNTyzMOsiPcZfy3JkNcCMfuya0fuuU5tdn4JAq/nj7aWvAV5t8/afc+97ZNA19pZ6Kwiq9VUcaoyaXdkfxjcHz3qfuRLx+52vPVVDF207nijmSthKBaoVZ5u1bDVo+q9Vtfg7UpFl4bzedC3ilj9fggKd7R9N0xaq2y/l5UBPwTm931UV1qbbe/ZdS9llmPXMaJ72H7vIiEOfVuqmwVxXwWh+nQcWtf6+53FI7Yja6s+dR4FXe5qpq8tlfJbK9o2m1dHkRiMQxmST23HFuq6hrpO/+pXc0rR7gv7q6CAD38fZWDfCF5t7716rllqYB+FqHF4G3eXurAvg1cB0fk0Ep/5l3NCVdBLqYGAQutapp5JSExMdjcEPkcE/jAHyli/JbkTN/pcrAKyDKx2FwwO28oymtBXy5i1x1wF29ramKYqnn8zEYXAtZW1L7Ik6gi4vApgUzx07VfkopF/V9HxxwW+9sStujpJVa4+/n0bKAJ3lbUwGcWkq5iO9zE4BPeIdT2ogCxZQgxs+lZQEP8bbGDvhXVRPyfW2CEhB4h1OahQqTdnFiK1nJVCYGgRf4/jVl6NJNadyAD6o+np9XywJuqqo+3t5YaAm9gp18v5qid7st5GpL4wZ8oKOLgIptvsvba50uisCevj/NUdFD73xKi4g7ge1W31mG4uXH8EgQxUIHS78+t1zxlyo7WdF9fp7VANwY+JE32ALgN8DRXQRKdUYRWL4jKS1L5bO12s/PtxqAR3l7Q1JlIeBY4Fre1+YBz/MdSqmGyCzURbDQgd7WEGJtxJHAHt7HUVCJpFjvnVIn4ktyDT/3lgG82Nvpi5ZGK4OyLkJDF1xdmm5ZsrBn6hpwptaY+Pm3iChM89/eRheUrETJcIE3RIjyPsqS5X0aLeAI3+mUuhDFLh/t5+C8NAno264lQpsfExWvtTrx4t7+pAAn+SCk1CUlvlwmFh54tm+zBuCsLuYrmqXVSF3lY9NrGlUOBr4TS0c1GaR/vgp8P/7fT/zv0mqI82B/Pyc3E3NWX/Ht1aCEJN7epJVSbu6DMK94tvuIKpnqGQm4BXBd3ToBOwE76qBp3XP8s4OCROL/7VJKuUncbh2lXwbgP7q6KKX26LyZJ2gIuL5voxbgm6Of1JuH6o/5IMzhbD3PdfGeN0pI7ws8FHhjrDvPugQTFcf3Dn4erAd4mv99LcD35rkYjd6iST+1ZqDP0sVx13C1Usp9geOA071PafwU66+7Rz/+a2nVof9dLfFoupO3OUm61Yksr3MDXubb65MeK4A/L6U8NesVTkuUxtJFfpsLgYJtOn5lrbva6slNmhSrq37tIzAL4N6+vSHFnMOTuvx1SP0Cfg+cANwm5pH07v91/rmaogbG7n5+TRJwKx+AORzk22tFTCoe0+pikTQ/4OuaJ/D/XttKXQD0PO0DMCvgEN9eayLP/AMzvfm24tWs1qmfpOSUwBn+mVUUb7Q6WcHYHOClPgCzAu7n22uZ3jdrwlO3lb4vqyLiLjSDvpcn7IhXtnqMehjwnkUfDccuJgF3XDs2k6XYZh+AOdzXtzcGwN4xwbRSF4KIZZ95fXpMtmmF6Nm+rYlTOvz28vTXVko57zK3xsDhvs0xWXMhmHxtei2aWfS2NorDLvNDMSrA8T4Gk1RKuaCeA30AZgW83Lc5RnEheIvv35QA9/D9nhdwqDLd+LanBni67/sklVIutOQF4C2+zTGLdd2f8v2cgvXepy9CcRfAt3z7UzKGye0qVOJZKYx8AGYFvNu3OXZ69ovQ4x/4/o6Zkmj6vi4KuFJXC3EasY/v8yQtu6BC72X1GOHbnYJIj67lqpMQSSofXivEVZOJwBe8nbGLxB/TXvu/BbCfD8A89N4Y2Nm3OyXAXZT6yfd9rLTUFXilwrhj5eUhCprS46Dv+2aAS2gFqLcxZnpT4vs5WXHgF6a87MC1fbtTE/kSXuH7PyVxYVBSy7ku6IolAN7v2xsr3fX5Pk7WshcA0cSZb3eqgL+MpaKTFUlb5krcGRfIScwJKDWe799kVboALJ3bbUyAXaeePk0XOU30+b5vJCYGf+jbGptFshONVqULwDG+3VXQZUKKPkTJqu2W1gJO9H3eTCnlgDEnbAF+tmq5AGtcAD7m210VSm89wrRlCnPVcb8kcFXgVf6BNfbyfd6M3jT4RsZCaeh8fyat0gVAz8TVq8COBXD1KH3VvPjV3+YXTgt//LOy6OOdQml9W2Ogi6Hvy6TVuADIKOugVVRKudiiadX6pHUP3ncB/to/K8Bz/LOzUKpvJdb07bUOeJDvy6QtGwewRWuZgYYCvNDHpiV6/+99lg0uAI/yz84KuLVvr2VaEFYrXHo0Yu330ivhgH/yba+qlissxa/yNoU4lHLLPytK7e6fnYeCjXybrYo1MXMHQ42aUnlXWuu9GuunZ6Touo6TVi4MOBXYM5J/6NXdi/wzorRYwJV93+YR8QHf9W23CHib93/yIiPwwqsBtwB+pffjvv1VpnyJrSYciUSbinlX7rt1Ad+uURyjlHJn33aLgEd43ydv2XwAawF39e2vuqh0tN0vWct0Aai10At4k2+/NcoJ4f2evMgI9HEfjEUot6BvP51z8t9sjLUPY81/rQuAoiebHYMpr2rdFPB6H5BFqMijav/59tM5Y3xTPSb5mLUsMgYv/QiwRSnlcd5GQ17j/V0ZwLE+GouI1ygrHQ+wEeBOrU4MridWel7V92NRUQi2yUxCNdKljRbwEB+QRa3USqoFxGrCpV+79gW4j+/DMhRX4G0MLepbrkYZsPUo4YUPyqJUZMK3n7a2TCGWvmmdv/d/GREheKa3M6Ta+zg6Wvtd63VVFJLYzdtIW1PiDR+7Vi0bDOQUNOZtDEn5H72PKyUCQs7ygVkU8GBvI22r1txL15QObd4sQRuJmo1NzIVEivMreh9XSrwK/DcfnEUpR5y3kbYVVW4/5uPXIj3aaRLP92ERsQz5p97GEIAPe/9WEvBGH5xFRV33PbyNtC3gMhFw0zzgEzV+LSNpSBMToaqB6P1bScoZ74OzpKd6G2l9wL5jKcIZRTP3832YVfz6N5E7ISI0c75KdFX2AVpGJIjMoKAZad7Ex7BV8dysoJ6ZHwkiBuBeqk/o2xvKFIvaLExZYpapELQerQf3dtL2Aa/2MWxZTA4+UcFf660EjXThKsf+wgi1bcpKB/+sp/at2dTqBnZN9eiBz/s4joHu+PSLqqXFes0HnNLy3AbwPzXfbEwCcLQP1DLiGWvpSaNVAlxTkWk+lqkuXah87FcecLAPVAXP8nbSxoAH+CCmemLNynV83FcecIXatd+VhXaVMwYvCnizj2WqA3ivj3eKgKBI7VXVSmZaWVK8Lmty5dzYaVWmj3cKumX3AVtWVNa9gLeVNlb71Ww651z80npvLFIopdzcB62G2stKVwXwfB/LtDjNr/gYpzXiVVSVHIFrRbagvAuYk9JUq1yVj2eaH3B6zQxHk6XiET54NeRdwGKUrLLWcu1VlnH/MwJu64NXQ8wFrGbixSUBT/HxTLOLCdWZQ5dXWlePAaLKsd5e2pzWVdRcsr2CDvMxTRvYXrWYZQE/UCFNby9tTjH3Y1k12JK881wAcAMfyIoyOnBBwGN9MNPGlIjVxzFtIrIEfdYHs4YoI/Zn3mbaXM1CLqsgs1MtQc/rPqC1AO/09tJsorBnPgpsQnkHdSfr45dmFMlCf+wDWwtwd28zzSYfBTan0uQ+bmlOqvfnA1tLvGnYplZ92pzCWSNHX1pHpC67uI9bmpNKQynJpw9wLXmVXlzUc8hHgXWo2I2PV1oQ8A4f4JqAA73NNBvgkT6eq07Fbn2c0hI6fiW45XbtUt5umo1KW/mYrqo4ly7hY5SWBPyLD3ZNwAneZpqN0q6VUs72MV1Fuda/I8D1uy7moNoE3m6azZgKjnZFyUh9XFJFenfvg15TVBS6pbebZlOzutPYAJ/Lpb4di1j03/rg16S1Aitdq30JpZSLrmIasagzeDUfj9QB4OV+ADrwmbyaLwa4qQ/m1AH39HFIHSmlXLbL6MAtWn+VA9xGt9zApxTLoNJewJX9c0NQtR4fzwnLhWV9U2YVPwpdUBSit90Cffm9r6JCKFEdZ/AgFOAk79/UxJupTPDZN9W17yJ9+HqAx3j7Q5vllWjcGRzsf9uXKDv+Xe/XVETx2Yv6fqeeADfyg9KVljK5RmaeL3sftwc4FfgL304flOG561e3Q4i6frmcfGjAS/zgdEWlpb39IcQinLmz9AJvVey+b69rwOHelzGLV8X7+36mAQA79VnvHbi392EIwLu8b7NQ0c8op72jb7NLwHHel7HKGf/G9H2bqdl270Pflq2eFHcQB/h2u6JXql1ld+oT8ATft9QA4Cg/WF1SMgzvQ5/0TO99WgTwAt1F+fa7AOwahVpHKct5Nyyeiz/pB61LwNHej76o2jHwQ+/TIqJWXS93AwqzHmP+AOB435fUmCFWpOnEAC7sfekD8GLvzzKA56gMmLdTm15Netst0w9LRoWORCnlzn4Au6ZnW+AK3peuAdesPfcR+3I9b6s24GnedouAL+Ta/pEBjvQD2bXILdjLbfRaerXnfVlWpEw/wtuqrfWqw8CPgCt5v9MIdL1seD0qntn35GDkS+xkdaSiDYHLeZs1Aa/1dlsQK0Jv5P1NIwHsPNRrJ+AtfaYX6/INiO5sVKjV26xF5dqB93m7Q1P0ZJaSHzndvgFn+MHtA/BN4Nbepy5o4i5qz3UGeKa3W4sq5pZSTvY2h6Zwa+AOWdNvxCKN2E/84PYFeF4fJaFrxQVsBPhgV5Odeq3Z4kVAgK8Bx8QYd/6WJFWmlN9d1hXYDPBF4Bber9r6iINQ7AFwe2+7hpYvAlvoTismmffy/qeGKYbfD2bfFHXXZRUi4JXeZleAZ3j7NehuadF1Dn3S61flO1DV34wRGIkuC43OKp7VD/K+1QC8ydvrEvAeYBfvRw09pX2rAvhqKeVxXb8xSRUAj/ADOIR4xVbtsaCUsjtwprfTtXhLsJ/3p4ZlFzz1DTgr5gr29n1JDWnlIiCRtefRyySXAK4ev0KDiPXxD/d+1TDGsmNRElwZm3oPDEsz6iun4KxigYwmwHQrebNZUk1FKLBW8/3ctzeQ13SxslCv4oZ8k7MM4CPKH5AxBQ0C7qawVz9oLVD8AnCKIhr1Dh54aPyjZB4KNFLM/u/974YWxTH29bFeFnDtyME3SvEm6K98v9LAgFvp2c0PWFpchEQ/u3Y0pLYHvN3bGxPgHr5faWARLLRy1Wy6Bnwv7liqVlkCnu5tjUWEp5/f9ykNLLLVfNwPWFpePM7otd4BtcJqgTvqAuNttS5WWnby6jQtKbLsvMEPWqonIun0qkzzL7v6MZhHKeViwKtancdZjyYzaz8apcqAJ/uBS/Xp7UVMZr5Ny6hLKYcppgC4il6L6pdSkZO6a9A/ymQcX3rdrekz+vcNWg8fXgv4qJ9vqUHKLKSEEH4AU/cizPYPSu+mykJx16AFOV8Hvh8XjnP437YOOMTPtdQoFdrUe1w/iKlpzwKeUithak3AsX6OpcZFGS4ly0wNA36ztl5DvDI8NBbs/MI/36e4Yzlq6zMrjYrWggPf8IObhgecttF6hFLKbloNqtWSwKd7iirU44uyCSuIaw/vUxqh+FV5nR/pNJyIub+kH6uNAJeO+gT3VGJS4BWanFOJOeDbs+ZYjJh/LYbSHMUJqhMB3D+2nTP9UxVrwE/zEyL1R1/S2mXbo7iMak0q0aqCw24Yd3463gfHv5VcRv9d//8a+rz+zreVJk6LdVSYo8V4/KmLV4c39GOSUu+AGwMf8pM01RdrDJ6ZeflSc2KS6Wt+0qY6Yllt/uqndkUo8eEKVvETOC0mAoEe4mOdUrOAyyhpZkYSLg74GfDceWf4U2qGlsECT8j4gdnFF/8ly6RIS6kpKh8eUWmf9hM+/T8Fzqjc+e4+filNBrC/CmJmFqJzRRCNkoZc3scqpclSDnllvI0INK18WxkRG/+OWHGZRTXSagP2BB6virRjSm4xj8iZ/27gQV3VF0xp9GIJsuYL3jzmPIURtPOViLNXGG3VvIApTV7Uyds3YgveEEkxBityupFIAKrVby9V0gvd1ZRSdvB9SiktKBar7BELVI4AjgM+HCvSOi0OojX1kc9Oef8/ALw6+qBf92t1WfQ0pbQBYOdSymVLKfsAd48v5WOVfFPVeqJiz/FRZETP4acojx5wYtQoVCLULZ/TklbNR6ia8kHAnVTrLmIaLu1tp5RSSimllFJKKaWUUkoppZRSSimllFKauP8D0a9eXOntdgwAAAAASUVORK5CYII=";
    const PLUGIN_VERSION = "0.2.6";
    const PLUGIN_PACKAGE = "@xinxing1708/dsh-codex-style";
    const CODEX_THEME_PACK = [{"id":"ocean","name":"Ocean","nameZh":"海洋","desc":"Cool blue seas and quiet depth.","descZh":"清凉的蓝，安静而深邃。","swatch":{"light":["#d5e7ef","#f0f7f8","#0e7490","#0f2440"],"dark":["#0b1722","#0f1f2d","#22d3ee","#e6f1f9"]},"css":"/* Ocean (海洋) — dsh-theme */\nbody[data-dsh-theme=\"ocean\"]{\n  --dsw-alias-bg-base: #d5e7ef;\n  --dsw-alias-bg-layer-1: #f0f7f8;\n  --dsw-alias-bg-layer-2: #f0f7f8;\n  --dsw-alias-bg-layer-3: #c5dde8;\n  --dsw-alias-bg-overlay: #c5dde8;\n  --dsw-alias-bg-module-platform: #c5dde8;\n  --dsw-alias-bg-multi-select: #c5dde8;\n  --dsw-alias-bg-skeleton: rgba(15, 36, 64, 0.060);\n  --dsw-alias-border-l1: rgba(15, 36, 64, 0.055);\n  --dsw-alias-border-l2: rgba(15,36,64,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(15,36,64,0.10);\n  --dsw-alias-border-l3: rgba(15, 36, 64, 0.160);\n  --dsw-alias-border-l4: rgba(15, 36, 64, 0.220);\n  --dsw-alias-border-inverted: rgba(15, 36, 64, 0.080);\n  --dsw-alias-border-inverted2: rgba(15, 36, 64, 0.080);\n  --dsw-alias-brand-primary: #0e7490;\n  --dsw-alias-brand-primary-invert: #0f2440;\n  --dsw-alias-brand-text: #0f2440;\n  --dsw-alias-button-primary-fill: #0e7490;\n  --dsw-alias-button-primary-hover: #155e75;\n  --dsw-alias-button-primary-dimmed: rgba(14, 116, 144, 0.140);\n  --dsw-alias-button-info-fill: #0e7490;\n  --dsw-alias-button-info-hover: #155e75;\n  --dsw-alias-button-contrast-fill: #0f2440;\n  --dsw-alias-button-elevated-fill: #f0f7f8;\n  --dsw-alias-button-floating-fill: #f0f7f8;\n  --dsw-alias-button-floating-hover: #c5dde8;\n  --dsw-alias-button-ghost-active-fill: #c5dde8;\n  --dsw-alias-button-ghost-active-hover: #c5dde8;\n  --dsw-alias-button-ghost-active-border: #6e8aa3;\n  --dsw-alias-button-tool-bar-fill: rgba(15, 36, 64, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(15, 36, 64, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(15, 36, 64, 0.280);\n  --dsw-alias-label-primary: #0f2440;\n  --dsw-alias-label-secondary: #3e5c78;\n  --dsw-alias-label-tertiary: #6e8aa3;\n  --dsw-alias-label-caption: #6e8aa3;\n  --dsw-alias-label-dimmed: rgba(15, 36, 64, 0.450);\n  --dsw-alias-label-primary-bluish: #0f2440;\n  --dsw-alias-label-primary-dimmed: #0f2440;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(15, 36, 64, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(15, 36, 64, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(14, 116, 144, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #c5dde8;\n  --dsw-alias-markdown-code-block: #d8e8f1;\n  --dsw-alias-markdown-code-block-banner: #c9dfeb;\n  --dsw-alias-markdown-inline-code: #d8e8f1;\n  --dsw-alias-markdown-code-segment-selected: #c9dfeb;\n  --dsw-alias-markdown-code-segment-unselected: #d8e8f1;\n  --dsw-alias-markdown-citation: #c5dde8;\n  --dsw-alias-markdown-placeholder: #c5dde8;\n  --dsw-alias-markdown-tag: #c5dde8;\n  --dsw-alias-state-business-primary: #0e7490;\n  --dsw-alias-state-business-tertiary: rgba(14, 116, 144, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(15, 36, 64, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(15, 36, 64, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(15, 36, 64, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(15, 36, 64, 0.220);\n  --dsw-alias-toast-bg: #0f2440;\n  --dsw-alias-tooltip-bg: #0f2440;\n  --dsw-specific-bubble: #d8e8f1;\n  --dsw-specific-bubble-highlight: rgba(14, 116, 144, 0.120);\n  --dsw-specific-input-major: #f0f7f8;\n  --dsw-specific-login-input: #c5dde8;\n  --dsw-specific-menu: #f0f7f8;\n  --dsw-specific-selector: #c5dde8;\n  --dsw-specific-sidebar-fill: #d6e7f1;\n  --dsw-specific-sidebar-nav-item-active: rgba(15, 36, 64, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(14, 116, 144, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(15, 36, 64, 0.050);\n  --dsw-specific-tip: #c5dde8;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(213, 231, 239) 20.19%, rgba(213, 231, 239, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(197, 221, 232) 20.19%, rgba(197, 221, 232, 0) 100%);\n}\nbody[data-dsh-theme=\"ocean\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0b1722;\n  --dsw-alias-bg-layer-1: #0f1f2d;\n  --dsw-alias-bg-layer-2: #0f1f2d;\n  --dsw-alias-bg-layer-3: #15293a;\n  --dsw-alias-bg-overlay: #15293a;\n  --dsw-alias-bg-module-platform: #15293a;\n  --dsw-alias-bg-multi-select: #15293a;\n  --dsw-alias-bg-skeleton: rgba(230, 241, 249, 0.080);\n  --dsw-alias-border-l1: rgba(230, 241, 249, 0.055);\n  --dsw-alias-border-l2: rgba(230,241,249,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(230,241,249,0.10);\n  --dsw-alias-border-l3: rgba(230, 241, 249, 0.160);\n  --dsw-alias-border-l4: rgba(230, 241, 249, 0.220);\n  --dsw-alias-border-inverted: rgba(230, 241, 249, 0.120);\n  --dsw-alias-border-inverted2: rgba(230, 241, 249, 0.120);\n  --dsw-alias-brand-primary: #22d3ee;\n  --dsw-alias-brand-primary-invert: #e6f1f9;\n  --dsw-alias-brand-text: #e6f1f9;\n  --dsw-alias-button-primary-fill: #22d3ee;\n  --dsw-alias-button-primary-hover: #67e8f9;\n  --dsw-alias-button-primary-dimmed: rgba(34, 211, 238, 0.140);\n  --dsw-alias-button-info-fill: #22d3ee;\n  --dsw-alias-button-info-hover: #67e8f9;\n  --dsw-alias-button-contrast-fill: #e6f1f9;\n  --dsw-alias-button-elevated-fill: #0f1f2d;\n  --dsw-alias-button-floating-fill: #0f1f2d;\n  --dsw-alias-button-floating-hover: #15293a;\n  --dsw-alias-button-ghost-active-fill: #15293a;\n  --dsw-alias-button-ghost-active-hover: #15293a;\n  --dsw-alias-button-ghost-active-border: #6d8ba3;\n  --dsw-alias-button-tool-bar-fill: rgba(230, 241, 249, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(230, 241, 249, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(230, 241, 249, 0.280);\n  --dsw-alias-label-primary: #e6f1f9;\n  --dsw-alias-label-secondary: #9db8cc;\n  --dsw-alias-label-tertiary: #6d8ba3;\n  --dsw-alias-label-caption: #6d8ba3;\n  --dsw-alias-label-dimmed: rgba(230, 241, 249, 0.450);\n  --dsw-alias-label-primary-bluish: #e6f1f9;\n  --dsw-alias-label-primary-dimmed: #e6f1f9;\n  --dsw-alias-label-primary-foreground: #06222b;\n  --dsw-alias-label-primary-inverted: #06222b;\n  --dsw-alias-interactive-bg-hover: rgba(230, 241, 249, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(230, 241, 249, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(34, 211, 238, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #15293a;\n  --dsw-alias-markdown-code-block: #0d1c29;\n  --dsw-alias-markdown-code-block-banner: #122434;\n  --dsw-alias-markdown-inline-code: #0d1c29;\n  --dsw-alias-markdown-code-segment-selected: #122434;\n  --dsw-alias-markdown-code-segment-unselected: #0d1c29;\n  --dsw-alias-markdown-citation: #15293a;\n  --dsw-alias-markdown-placeholder: #15293a;\n  --dsw-alias-markdown-tag: #15293a;\n  --dsw-alias-state-business-primary: #22d3ee;\n  --dsw-alias-state-business-tertiary: rgba(34, 211, 238, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(230, 241, 249, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(230, 241, 249, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(230, 241, 249, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(230, 241, 249, 0.220);\n  --dsw-alias-toast-bg: #e6f1f9;\n  --dsw-alias-tooltip-bg: #e6f1f9;\n  --dsw-specific-bubble: #0d1c29;\n  --dsw-specific-bubble-highlight: rgba(34, 211, 238, 0.120);\n  --dsw-specific-input-major: #0f1f2d;\n  --dsw-specific-login-input: #15293a;\n  --dsw-specific-menu: #0f1f2d;\n  --dsw-specific-selector: #15293a;\n  --dsw-specific-sidebar-fill: #0c1a26;\n  --dsw-specific-sidebar-nav-item-active: rgba(230, 241, 249, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(34, 211, 238, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(230, 241, 249, 0.050);\n  --dsw-specific-tip: #15293a;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(11, 23, 34) 20.19%, rgba(11, 23, 34, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(21, 41, 58) 20.19%, rgba(21, 41, 58, 0) 100%);\n}\nbody[data-dsh-theme=\"ocean\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"ocean\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"midnight","name":"Midnight","nameZh":"午夜","desc":"Deep navy with electric blue accents.","descZh":"深夜藏蓝，缀以电光蓝。","swatch":{"light":["#e5ebf8","#f8fafe","#2563eb","#0b1c33"],"dark":["#070d1a","#0d1526","#3b82f6","#dbe7fb"]},"css":"/* Midnight (午夜) — dsh-theme */\nbody[data-dsh-theme=\"midnight\"]{\n  --dsw-alias-bg-base: #e5ebf8;\n  --dsw-alias-bg-layer-1: #f8fafe;\n  --dsw-alias-bg-layer-2: #f8fafe;\n  --dsw-alias-bg-layer-3: #d9e2f3;\n  --dsw-alias-bg-overlay: #d9e2f3;\n  --dsw-alias-bg-module-platform: #d9e2f3;\n  --dsw-alias-bg-multi-select: #d9e2f3;\n  --dsw-alias-bg-skeleton: rgba(11, 28, 51, 0.060);\n  --dsw-alias-border-l1: rgba(11, 28, 51, 0.055);\n  --dsw-alias-border-l2: rgba(11,28,51,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(11,28,51,0.10);\n  --dsw-alias-border-l3: rgba(11, 28, 51, 0.160);\n  --dsw-alias-border-l4: rgba(11, 28, 51, 0.220);\n  --dsw-alias-border-inverted: rgba(11, 28, 51, 0.080);\n  --dsw-alias-border-inverted2: rgba(11, 28, 51, 0.080);\n  --dsw-alias-brand-primary: #2563eb;\n  --dsw-alias-brand-primary-invert: #0b1c33;\n  --dsw-alias-brand-text: #0b1c33;\n  --dsw-alias-button-primary-fill: #2563eb;\n  --dsw-alias-button-primary-hover: #1d4ed8;\n  --dsw-alias-button-primary-dimmed: rgba(37, 99, 235, 0.140);\n  --dsw-alias-button-info-fill: #2563eb;\n  --dsw-alias-button-info-hover: #1d4ed8;\n  --dsw-alias-button-contrast-fill: #0b1c33;\n  --dsw-alias-button-elevated-fill: #f8fafe;\n  --dsw-alias-button-floating-fill: #f8fafe;\n  --dsw-alias-button-floating-hover: #d9e2f3;\n  --dsw-alias-button-ghost-active-fill: #d9e2f3;\n  --dsw-alias-button-ghost-active-hover: #d9e2f3;\n  --dsw-alias-button-ghost-active-border: #73849f;\n  --dsw-alias-button-tool-bar-fill: rgba(11, 28, 51, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(11, 28, 51, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(11, 28, 51, 0.280);\n  --dsw-alias-label-primary: #0b1c33;\n  --dsw-alias-label-secondary: #44597a;\n  --dsw-alias-label-tertiary: #73849f;\n  --dsw-alias-label-caption: #73849f;\n  --dsw-alias-label-dimmed: rgba(11, 28, 51, 0.450);\n  --dsw-alias-label-primary-bluish: #0b1c33;\n  --dsw-alias-label-primary-dimmed: #0b1c33;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(11, 28, 51, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(11, 28, 51, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(37, 99, 235, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #d9e2f3;\n  --dsw-alias-markdown-code-block: #e2e9f6;\n  --dsw-alias-markdown-code-block-banner: #d6e1f2;\n  --dsw-alias-markdown-inline-code: #e2e9f6;\n  --dsw-alias-markdown-code-segment-selected: #d6e1f2;\n  --dsw-alias-markdown-code-segment-unselected: #e2e9f6;\n  --dsw-alias-markdown-citation: #d9e2f3;\n  --dsw-alias-markdown-placeholder: #d9e2f3;\n  --dsw-alias-markdown-tag: #d9e2f3;\n  --dsw-alias-state-business-primary: #2563eb;\n  --dsw-alias-state-business-tertiary: rgba(37, 99, 235, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #16a34a;\n  --dsw-alias-state-success-secondary: #16a34a;\n  --dsw-alias-state-success-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(11, 28, 51, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(11, 28, 51, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(11, 28, 51, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(11, 28, 51, 0.220);\n  --dsw-alias-toast-bg: #0b1c33;\n  --dsw-alias-tooltip-bg: #0b1c33;\n  --dsw-specific-bubble: #e2e9f6;\n  --dsw-specific-bubble-highlight: rgba(37, 99, 235, 0.120);\n  --dsw-specific-input-major: #f8fafe;\n  --dsw-specific-login-input: #d9e2f3;\n  --dsw-specific-menu: #f8fafe;\n  --dsw-specific-selector: #d9e2f3;\n  --dsw-specific-sidebar-fill: #e0e7f5;\n  --dsw-specific-sidebar-nav-item-active: rgba(11, 28, 51, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(37, 99, 235, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(11, 28, 51, 0.050);\n  --dsw-specific-tip: #d9e2f3;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(229, 235, 248) 20.19%, rgba(229, 235, 248, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(217, 226, 243) 20.19%, rgba(217, 226, 243, 0) 100%);\n}\nbody[data-dsh-theme=\"midnight\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #070d1a;\n  --dsw-alias-bg-layer-1: #0d1526;\n  --dsw-alias-bg-layer-2: #0d1526;\n  --dsw-alias-bg-layer-3: #141f36;\n  --dsw-alias-bg-overlay: #141f36;\n  --dsw-alias-bg-module-platform: #141f36;\n  --dsw-alias-bg-multi-select: #141f36;\n  --dsw-alias-bg-skeleton: rgba(219, 231, 251, 0.080);\n  --dsw-alias-border-l1: rgba(219, 231, 251, 0.055);\n  --dsw-alias-border-l2: rgba(219,231,251,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(219,231,251,0.10);\n  --dsw-alias-border-l3: rgba(219, 231, 251, 0.160);\n  --dsw-alias-border-l4: rgba(219, 231, 251, 0.220);\n  --dsw-alias-border-inverted: rgba(219, 231, 251, 0.120);\n  --dsw-alias-border-inverted2: rgba(219, 231, 251, 0.120);\n  --dsw-alias-brand-primary: #3b82f6;\n  --dsw-alias-brand-primary-invert: #dbe7fb;\n  --dsw-alias-brand-text: #dbe7fb;\n  --dsw-alias-button-primary-fill: #3b82f6;\n  --dsw-alias-button-primary-hover: #60a5fa;\n  --dsw-alias-button-primary-dimmed: rgba(59, 130, 246, 0.140);\n  --dsw-alias-button-info-fill: #3b82f6;\n  --dsw-alias-button-info-hover: #60a5fa;\n  --dsw-alias-button-contrast-fill: #dbe7fb;\n  --dsw-alias-button-elevated-fill: #0d1526;\n  --dsw-alias-button-floating-fill: #0d1526;\n  --dsw-alias-button-floating-hover: #141f36;\n  --dsw-alias-button-ghost-active-fill: #141f36;\n  --dsw-alias-button-ghost-active-hover: #141f36;\n  --dsw-alias-button-ghost-active-border: #64789c;\n  --dsw-alias-button-tool-bar-fill: rgba(219, 231, 251, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(219, 231, 251, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(219, 231, 251, 0.280);\n  --dsw-alias-label-primary: #dbe7fb;\n  --dsw-alias-label-secondary: #8fa8cf;\n  --dsw-alias-label-tertiary: #64789c;\n  --dsw-alias-label-caption: #64789c;\n  --dsw-alias-label-dimmed: rgba(219, 231, 251, 0.450);\n  --dsw-alias-label-primary-bluish: #dbe7fb;\n  --dsw-alias-label-primary-dimmed: #dbe7fb;\n  --dsw-alias-label-primary-foreground: #061024;\n  --dsw-alias-label-primary-inverted: #061024;\n  --dsw-alias-interactive-bg-hover: rgba(219, 231, 251, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(219, 231, 251, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(59, 130, 246, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #141f36;\n  --dsw-alias-markdown-code-block: #0b1322;\n  --dsw-alias-markdown-code-block-banner: #101a2e;\n  --dsw-alias-markdown-inline-code: #0b1322;\n  --dsw-alias-markdown-code-segment-selected: #101a2e;\n  --dsw-alias-markdown-code-segment-unselected: #0b1322;\n  --dsw-alias-markdown-citation: #141f36;\n  --dsw-alias-markdown-placeholder: #141f36;\n  --dsw-alias-markdown-tag: #141f36;\n  --dsw-alias-state-business-primary: #3b82f6;\n  --dsw-alias-state-business-tertiary: rgba(59, 130, 246, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #34d399;\n  --dsw-alias-state-success-secondary: #34d399;\n  --dsw-alias-state-success-tertiary: rgba(52, 211, 153, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(219, 231, 251, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(219, 231, 251, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(219, 231, 251, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(219, 231, 251, 0.220);\n  --dsw-alias-toast-bg: #dbe7fb;\n  --dsw-alias-tooltip-bg: #dbe7fb;\n  --dsw-specific-bubble: #0b1322;\n  --dsw-specific-bubble-highlight: rgba(59, 130, 246, 0.120);\n  --dsw-specific-input-major: #0d1526;\n  --dsw-specific-login-input: #141f36;\n  --dsw-specific-menu: #0d1526;\n  --dsw-specific-selector: #141f36;\n  --dsw-specific-sidebar-fill: #0a1120;\n  --dsw-specific-sidebar-nav-item-active: rgba(219, 231, 251, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(59, 130, 246, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(219, 231, 251, 0.050);\n  --dsw-specific-tip: #141f36;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(7, 13, 26) 20.19%, rgba(7, 13, 26, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(20, 31, 54) 20.19%, rgba(20, 31, 54, 0) 100%);\n}\nbody[data-dsh-theme=\"midnight\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"midnight\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"aurora","name":"Aurora","nameZh":"极光","desc":"Violet skies melting into teal.","descZh":"紫罗兰与青碧交融的夜空。","swatch":{"light":["#e6e1fa","#f8f4fe","#7c3aed","#221a3e"],"dark":["#0e0a1f","#151031","#a78bfa","#ece7ff"]},"css":"/* Aurora (极光) — dsh-theme */\nbody[data-dsh-theme=\"aurora\"]{\n  --dsw-alias-bg-base: #e6e1fa;\n  --dsw-alias-bg-layer-1: #f8f4fe;\n  --dsw-alias-bg-layer-2: #f8f4fe;\n  --dsw-alias-bg-layer-3: #dcd3f6;\n  --dsw-alias-bg-overlay: #dcd3f6;\n  --dsw-alias-bg-module-platform: #dcd3f6;\n  --dsw-alias-bg-multi-select: #dcd3f6;\n  --dsw-alias-bg-skeleton: rgba(34, 26, 62, 0.060);\n  --dsw-alias-border-l1: rgba(34, 26, 62, 0.055);\n  --dsw-alias-border-l2: rgba(34,26,62,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(34,26,62,0.10);\n  --dsw-alias-border-l3: rgba(34, 26, 62, 0.160);\n  --dsw-alias-border-l4: rgba(34, 26, 62, 0.220);\n  --dsw-alias-border-inverted: rgba(34, 26, 62, 0.080);\n  --dsw-alias-border-inverted2: rgba(34, 26, 62, 0.080);\n  --dsw-alias-brand-primary: #7c3aed;\n  --dsw-alias-brand-primary-invert: #221a3e;\n  --dsw-alias-brand-text: #221a3e;\n  --dsw-alias-button-primary-fill: #7c3aed;\n  --dsw-alias-button-primary-hover: #6d28d9;\n  --dsw-alias-button-primary-dimmed: rgba(124, 58, 237, 0.140);\n  --dsw-alias-button-info-fill: #7c3aed;\n  --dsw-alias-button-info-hover: #6d28d9;\n  --dsw-alias-button-contrast-fill: #221a3e;\n  --dsw-alias-button-elevated-fill: #f8f4fe;\n  --dsw-alias-button-floating-fill: #f8f4fe;\n  --dsw-alias-button-floating-hover: #dcd3f6;\n  --dsw-alias-button-ghost-active-fill: #dcd3f6;\n  --dsw-alias-button-ghost-active-hover: #dcd3f6;\n  --dsw-alias-button-ghost-active-border: #847ca6;\n  --dsw-alias-button-tool-bar-fill: rgba(34, 26, 62, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(34, 26, 62, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(34, 26, 62, 0.280);\n  --dsw-alias-label-primary: #221a3e;\n  --dsw-alias-label-secondary: #5b5480;\n  --dsw-alias-label-tertiary: #847ca6;\n  --dsw-alias-label-caption: #847ca6;\n  --dsw-alias-label-dimmed: rgba(34, 26, 62, 0.450);\n  --dsw-alias-label-primary-bluish: #221a3e;\n  --dsw-alias-label-primary-dimmed: #221a3e;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(34, 26, 62, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(34, 26, 62, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(124, 58, 237, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #dcd3f6;\n  --dsw-alias-markdown-code-block: #e6e4f9;\n  --dsw-alias-markdown-code-block-banner: #dcd7f5;\n  --dsw-alias-markdown-inline-code: #e6e4f9;\n  --dsw-alias-markdown-code-segment-selected: #dcd7f5;\n  --dsw-alias-markdown-code-segment-unselected: #e6e4f9;\n  --dsw-alias-markdown-citation: #dcd3f6;\n  --dsw-alias-markdown-placeholder: #dcd3f6;\n  --dsw-alias-markdown-tag: #dcd3f6;\n  --dsw-alias-state-business-primary: #7c3aed;\n  --dsw-alias-state-business-tertiary: rgba(124, 58, 237, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #0d9488;\n  --dsw-alias-state-success-secondary: #0d9488;\n  --dsw-alias-state-success-tertiary: rgba(13, 148, 136, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(34, 26, 62, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(34, 26, 62, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(34, 26, 62, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(34, 26, 62, 0.220);\n  --dsw-alias-toast-bg: #221a3e;\n  --dsw-alias-tooltip-bg: #221a3e;\n  --dsw-specific-bubble: #e6e4f9;\n  --dsw-specific-bubble-highlight: rgba(124, 58, 237, 0.120);\n  --dsw-specific-input-major: #f8f4fe;\n  --dsw-specific-login-input: #dcd3f6;\n  --dsw-specific-menu: #f8f4fe;\n  --dsw-specific-selector: #dcd3f6;\n  --dsw-specific-sidebar-fill: #e4e0f8;\n  --dsw-specific-sidebar-nav-item-active: rgba(34, 26, 62, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(124, 58, 237, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(34, 26, 62, 0.050);\n  --dsw-specific-tip: #dcd3f6;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(230, 225, 250) 20.19%, rgba(230, 225, 250, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(220, 211, 246) 20.19%, rgba(220, 211, 246, 0) 100%);\n}\nbody[data-dsh-theme=\"aurora\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0e0a1f;\n  --dsw-alias-bg-layer-1: #151031;\n  --dsw-alias-bg-layer-2: #151031;\n  --dsw-alias-bg-layer-3: #1d1740;\n  --dsw-alias-bg-overlay: #1d1740;\n  --dsw-alias-bg-module-platform: #1d1740;\n  --dsw-alias-bg-multi-select: #1d1740;\n  --dsw-alias-bg-skeleton: rgba(236, 231, 255, 0.080);\n  --dsw-alias-border-l1: rgba(236, 231, 255, 0.055);\n  --dsw-alias-border-l2: rgba(236,231,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(236,231,255,0.10);\n  --dsw-alias-border-l3: rgba(236, 231, 255, 0.160);\n  --dsw-alias-border-l4: rgba(236, 231, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(236, 231, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(236, 231, 255, 0.120);\n  --dsw-alias-brand-primary: #a78bfa;\n  --dsw-alias-brand-primary-invert: #ece7ff;\n  --dsw-alias-brand-text: #ece7ff;\n  --dsw-alias-button-primary-fill: #a78bfa;\n  --dsw-alias-button-primary-hover: #c4b5fd;\n  --dsw-alias-button-primary-dimmed: rgba(167, 139, 250, 0.140);\n  --dsw-alias-button-info-fill: #a78bfa;\n  --dsw-alias-button-info-hover: #c4b5fd;\n  --dsw-alias-button-contrast-fill: #ece7ff;\n  --dsw-alias-button-elevated-fill: #151031;\n  --dsw-alias-button-floating-fill: #151031;\n  --dsw-alias-button-floating-hover: #1d1740;\n  --dsw-alias-button-ghost-active-fill: #1d1740;\n  --dsw-alias-button-ghost-active-hover: #1d1740;\n  --dsw-alias-button-ghost-active-border: #746a9e;\n  --dsw-alias-button-tool-bar-fill: rgba(236, 231, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(236, 231, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(236, 231, 255, 0.280);\n  --dsw-alias-label-primary: #ece7ff;\n  --dsw-alias-label-secondary: #a99fd8;\n  --dsw-alias-label-tertiary: #746a9e;\n  --dsw-alias-label-caption: #746a9e;\n  --dsw-alias-label-dimmed: rgba(236, 231, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #ece7ff;\n  --dsw-alias-label-primary-dimmed: #ece7ff;\n  --dsw-alias-label-primary-foreground: #1a1030;\n  --dsw-alias-label-primary-inverted: #1a1030;\n  --dsw-alias-interactive-bg-hover: rgba(236, 231, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(236, 231, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(167, 139, 250, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #1d1740;\n  --dsw-alias-markdown-code-block: #120d28;\n  --dsw-alias-markdown-code-block-banner: #181238;\n  --dsw-alias-markdown-inline-code: #120d28;\n  --dsw-alias-markdown-code-segment-selected: #181238;\n  --dsw-alias-markdown-code-segment-unselected: #120d28;\n  --dsw-alias-markdown-citation: #1d1740;\n  --dsw-alias-markdown-placeholder: #1d1740;\n  --dsw-alias-markdown-tag: #1d1740;\n  --dsw-alias-state-business-primary: #a78bfa;\n  --dsw-alias-state-business-tertiary: rgba(167, 139, 250, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #2dd4bf;\n  --dsw-alias-state-success-secondary: #2dd4bf;\n  --dsw-alias-state-success-tertiary: rgba(45, 212, 191, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(236, 231, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(236, 231, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(236, 231, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(236, 231, 255, 0.220);\n  --dsw-alias-toast-bg: #ece7ff;\n  --dsw-alias-tooltip-bg: #ece7ff;\n  --dsw-specific-bubble: #120d28;\n  --dsw-specific-bubble-highlight: rgba(167, 139, 250, 0.120);\n  --dsw-specific-input-major: #151031;\n  --dsw-specific-login-input: #1d1740;\n  --dsw-specific-menu: #151031;\n  --dsw-specific-selector: #1d1740;\n  --dsw-specific-sidebar-fill: #100b24;\n  --dsw-specific-sidebar-nav-item-active: rgba(236, 231, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(167, 139, 250, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(236, 231, 255, 0.050);\n  --dsw-specific-tip: #1d1740;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(14, 10, 31) 20.19%, rgba(14, 10, 31, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(29, 23, 64) 20.19%, rgba(29, 23, 64, 0) 100%);\n}\nbody[data-dsh-theme=\"aurora\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"aurora\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"lava","name":"Lava","nameZh":"熔岩","desc":"Charcoal rock with ember-orange fire.","descZh":"炭黑岩层，燃烧的橙红余烬。","swatch":{"light":["#f6e3d9","#fef6f2","#ea580c","#2b1712"],"dark":["#150e0b","#1e1410","#f97316","#fdeee8"]},"css":"/* Lava (熔岩) — dsh-theme */\nbody[data-dsh-theme=\"lava\"]{\n  --dsw-alias-bg-base: #f6e3d9;\n  --dsw-alias-bg-layer-1: #fef6f2;\n  --dsw-alias-bg-layer-2: #fef6f2;\n  --dsw-alias-bg-layer-3: #efd5c9;\n  --dsw-alias-bg-overlay: #efd5c9;\n  --dsw-alias-bg-module-platform: #efd5c9;\n  --dsw-alias-bg-multi-select: #efd5c9;\n  --dsw-alias-bg-skeleton: rgba(43, 23, 18, 0.060);\n  --dsw-alias-border-l1: rgba(43, 23, 18, 0.055);\n  --dsw-alias-border-l2: rgba(43,23,18,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(43,23,18,0.10);\n  --dsw-alias-border-l3: rgba(43, 23, 18, 0.160);\n  --dsw-alias-border-l4: rgba(43, 23, 18, 0.220);\n  --dsw-alias-border-inverted: rgba(43, 23, 18, 0.080);\n  --dsw-alias-border-inverted2: rgba(43, 23, 18, 0.080);\n  --dsw-alias-brand-primary: #ea580c;\n  --dsw-alias-brand-primary-invert: #2b1712;\n  --dsw-alias-brand-text: #2b1712;\n  --dsw-alias-button-primary-fill: #ea580c;\n  --dsw-alias-button-primary-hover: #c2410c;\n  --dsw-alias-button-primary-dimmed: rgba(234, 88, 12, 0.140);\n  --dsw-alias-button-info-fill: #ea580c;\n  --dsw-alias-button-info-hover: #c2410c;\n  --dsw-alias-button-contrast-fill: #2b1712;\n  --dsw-alias-button-elevated-fill: #fef6f2;\n  --dsw-alias-button-floating-fill: #fef6f2;\n  --dsw-alias-button-floating-hover: #efd5c9;\n  --dsw-alias-button-ghost-active-fill: #efd5c9;\n  --dsw-alias-button-ghost-active-hover: #efd5c9;\n  --dsw-alias-button-ghost-active-border: #93746a;\n  --dsw-alias-button-tool-bar-fill: rgba(43, 23, 18, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(43, 23, 18, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(43, 23, 18, 0.280);\n  --dsw-alias-label-primary: #2b1712;\n  --dsw-alias-label-secondary: #6b4a40;\n  --dsw-alias-label-tertiary: #93746a;\n  --dsw-alias-label-caption: #93746a;\n  --dsw-alias-label-dimmed: rgba(43, 23, 18, 0.450);\n  --dsw-alias-label-primary-bluish: #2b1712;\n  --dsw-alias-label-primary-dimmed: #2b1712;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(43, 23, 18, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(43, 23, 18, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(234, 88, 12, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #efd5c9;\n  --dsw-alias-markdown-code-block: #f2e3db;\n  --dsw-alias-markdown-code-block-banner: #edd6c9;\n  --dsw-alias-markdown-inline-code: #f2e3db;\n  --dsw-alias-markdown-code-segment-selected: #edd6c9;\n  --dsw-alias-markdown-code-segment-unselected: #f2e3db;\n  --dsw-alias-markdown-citation: #efd5c9;\n  --dsw-alias-markdown-placeholder: #efd5c9;\n  --dsw-alias-markdown-tag: #efd5c9;\n  --dsw-alias-state-business-primary: #ea580c;\n  --dsw-alias-state-business-tertiary: rgba(234, 88, 12, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(43, 23, 18, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(43, 23, 18, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(43, 23, 18, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(43, 23, 18, 0.220);\n  --dsw-alias-toast-bg: #2b1712;\n  --dsw-alias-tooltip-bg: #2b1712;\n  --dsw-specific-bubble: #f2e3db;\n  --dsw-specific-bubble-highlight: rgba(234, 88, 12, 0.120);\n  --dsw-specific-input-major: #fef6f2;\n  --dsw-specific-login-input: #efd5c9;\n  --dsw-specific-menu: #fef6f2;\n  --dsw-specific-selector: #efd5c9;\n  --dsw-specific-sidebar-fill: #f1e0d7;\n  --dsw-specific-sidebar-nav-item-active: rgba(43, 23, 18, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(234, 88, 12, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(43, 23, 18, 0.050);\n  --dsw-specific-tip: #efd5c9;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(246, 227, 217) 20.19%, rgba(246, 227, 217, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(239, 213, 201) 20.19%, rgba(239, 213, 201, 0) 100%);\n}\nbody[data-dsh-theme=\"lava\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #150e0b;\n  --dsw-alias-bg-layer-1: #1e1410;\n  --dsw-alias-bg-layer-2: #1e1410;\n  --dsw-alias-bg-layer-3: #2a1a14;\n  --dsw-alias-bg-overlay: #2a1a14;\n  --dsw-alias-bg-module-platform: #2a1a14;\n  --dsw-alias-bg-multi-select: #2a1a14;\n  --dsw-alias-bg-skeleton: rgba(253, 238, 232, 0.080);\n  --dsw-alias-border-l1: rgba(253, 238, 232, 0.055);\n  --dsw-alias-border-l2: rgba(253,238,232,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(253,238,232,0.10);\n  --dsw-alias-border-l3: rgba(253, 238, 232, 0.160);\n  --dsw-alias-border-l4: rgba(253, 238, 232, 0.220);\n  --dsw-alias-border-inverted: rgba(253, 238, 232, 0.120);\n  --dsw-alias-border-inverted2: rgba(253, 238, 232, 0.120);\n  --dsw-alias-brand-primary: #f97316;\n  --dsw-alias-brand-primary-invert: #fdeee8;\n  --dsw-alias-brand-text: #fdeee8;\n  --dsw-alias-button-primary-fill: #f97316;\n  --dsw-alias-button-primary-hover: #fb923c;\n  --dsw-alias-button-primary-dimmed: rgba(249, 115, 22, 0.140);\n  --dsw-alias-button-info-fill: #f97316;\n  --dsw-alias-button-info-hover: #fb923c;\n  --dsw-alias-button-contrast-fill: #fdeee8;\n  --dsw-alias-button-elevated-fill: #1e1410;\n  --dsw-alias-button-floating-fill: #1e1410;\n  --dsw-alias-button-floating-hover: #2a1a14;\n  --dsw-alias-button-ghost-active-fill: #2a1a14;\n  --dsw-alias-button-ghost-active-hover: #2a1a14;\n  --dsw-alias-button-ghost-active-border: #96695a;\n  --dsw-alias-button-tool-bar-fill: rgba(253, 238, 232, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(253, 238, 232, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(253, 238, 232, 0.280);\n  --dsw-alias-label-primary: #fdeee8;\n  --dsw-alias-label-secondary: #c98f7a;\n  --dsw-alias-label-tertiary: #96695a;\n  --dsw-alias-label-caption: #96695a;\n  --dsw-alias-label-dimmed: rgba(253, 238, 232, 0.450);\n  --dsw-alias-label-primary-bluish: #fdeee8;\n  --dsw-alias-label-primary-dimmed: #fdeee8;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(253, 238, 232, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(253, 238, 232, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(249, 115, 22, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2a1a14;\n  --dsw-alias-markdown-code-block: #1a110d;\n  --dsw-alias-markdown-code-block-banner: #241712;\n  --dsw-alias-markdown-inline-code: #1a110d;\n  --dsw-alias-markdown-code-segment-selected: #241712;\n  --dsw-alias-markdown-code-segment-unselected: #1a110d;\n  --dsw-alias-markdown-citation: #2a1a14;\n  --dsw-alias-markdown-placeholder: #2a1a14;\n  --dsw-alias-markdown-tag: #2a1a14;\n  --dsw-alias-state-business-primary: #f97316;\n  --dsw-alias-state-business-tertiary: rgba(249, 115, 22, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(253, 238, 232, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(253, 238, 232, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(253, 238, 232, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(253, 238, 232, 0.220);\n  --dsw-alias-toast-bg: #fdeee8;\n  --dsw-alias-tooltip-bg: #fdeee8;\n  --dsw-specific-bubble: #1a110d;\n  --dsw-specific-bubble-highlight: rgba(249, 115, 22, 0.120);\n  --dsw-specific-input-major: #1e1410;\n  --dsw-specific-login-input: #2a1a14;\n  --dsw-specific-menu: #1e1410;\n  --dsw-specific-selector: #2a1a14;\n  --dsw-specific-sidebar-fill: #180f0c;\n  --dsw-specific-sidebar-nav-item-active: rgba(253, 238, 232, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(249, 115, 22, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(253, 238, 232, 0.050);\n  --dsw-specific-tip: #2a1a14;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(21, 14, 11) 20.19%, rgba(21, 14, 11, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(42, 26, 20) 20.19%, rgba(42, 26, 20, 0) 100%);\n}\nbody[data-dsh-theme=\"lava\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"lava\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"forest","name":"Forest","nameZh":"森林","desc":"Pine greens and soft moss.","descZh":"松绿与柔软的苔藓。","swatch":{"light":["#daeade","#f2f8f4","#15803d","#14261a"],"dark":["#0c150f","#122017","#4ade80","#e2f2e7"]},"css":"/* Forest (森林) — dsh-theme */\nbody[data-dsh-theme=\"forest\"]{\n  --dsw-alias-bg-base: #daeade;\n  --dsw-alias-bg-layer-1: #f2f8f4;\n  --dsw-alias-bg-layer-2: #f2f8f4;\n  --dsw-alias-bg-layer-3: #c9e1ce;\n  --dsw-alias-bg-overlay: #c9e1ce;\n  --dsw-alias-bg-module-platform: #c9e1ce;\n  --dsw-alias-bg-multi-select: #c9e1ce;\n  --dsw-alias-bg-skeleton: rgba(20, 38, 26, 0.060);\n  --dsw-alias-border-l1: rgba(20, 38, 26, 0.055);\n  --dsw-alias-border-l2: rgba(20,38,26,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(20,38,26,0.10);\n  --dsw-alias-border-l3: rgba(20, 38, 26, 0.160);\n  --dsw-alias-border-l4: rgba(20, 38, 26, 0.220);\n  --dsw-alias-border-inverted: rgba(20, 38, 26, 0.080);\n  --dsw-alias-border-inverted2: rgba(20, 38, 26, 0.080);\n  --dsw-alias-brand-primary: #15803d;\n  --dsw-alias-brand-primary-invert: #14261a;\n  --dsw-alias-brand-text: #14261a;\n  --dsw-alias-button-primary-fill: #15803d;\n  --dsw-alias-button-primary-hover: #166534;\n  --dsw-alias-button-primary-dimmed: rgba(21, 128, 61, 0.140);\n  --dsw-alias-button-info-fill: #15803d;\n  --dsw-alias-button-info-hover: #166534;\n  --dsw-alias-button-contrast-fill: #14261a;\n  --dsw-alias-button-elevated-fill: #f2f8f4;\n  --dsw-alias-button-floating-fill: #f2f8f4;\n  --dsw-alias-button-floating-hover: #c9e1ce;\n  --dsw-alias-button-ghost-active-fill: #c9e1ce;\n  --dsw-alias-button-ghost-active-hover: #c9e1ce;\n  --dsw-alias-button-ghost-active-border: #71877b;\n  --dsw-alias-button-tool-bar-fill: rgba(20, 38, 26, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(20, 38, 26, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(20, 38, 26, 0.280);\n  --dsw-alias-label-primary: #14261a;\n  --dsw-alias-label-secondary: #44604e;\n  --dsw-alias-label-tertiary: #71877b;\n  --dsw-alias-label-caption: #71877b;\n  --dsw-alias-label-dimmed: rgba(20, 38, 26, 0.450);\n  --dsw-alias-label-primary-bluish: #14261a;\n  --dsw-alias-label-primary-dimmed: #14261a;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(20, 38, 26, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(20, 38, 26, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(21, 128, 61, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #c9e1ce;\n  --dsw-alias-markdown-code-block: #d9e9dd;\n  --dsw-alias-markdown-code-block-banner: #cae0ce;\n  --dsw-alias-markdown-inline-code: #d9e9dd;\n  --dsw-alias-markdown-code-segment-selected: #cae0ce;\n  --dsw-alias-markdown-code-segment-unselected: #d9e9dd;\n  --dsw-alias-markdown-citation: #c9e1ce;\n  --dsw-alias-markdown-placeholder: #c9e1ce;\n  --dsw-alias-markdown-tag: #c9e1ce;\n  --dsw-alias-state-business-primary: #15803d;\n  --dsw-alias-state-business-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #16a34a;\n  --dsw-alias-state-success-secondary: #16a34a;\n  --dsw-alias-state-success-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(20, 38, 26, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(20, 38, 26, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(20, 38, 26, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(20, 38, 26, 0.220);\n  --dsw-alias-toast-bg: #14261a;\n  --dsw-alias-tooltip-bg: #14261a;\n  --dsw-specific-bubble: #d9e9dd;\n  --dsw-specific-bubble-highlight: rgba(21, 128, 61, 0.120);\n  --dsw-specific-input-major: #f2f8f4;\n  --dsw-specific-login-input: #c9e1ce;\n  --dsw-specific-menu: #f2f8f4;\n  --dsw-specific-selector: #c9e1ce;\n  --dsw-specific-sidebar-fill: #d7e8db;\n  --dsw-specific-sidebar-nav-item-active: rgba(20, 38, 26, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(21, 128, 61, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(20, 38, 26, 0.050);\n  --dsw-specific-tip: #c9e1ce;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(218, 234, 222) 20.19%, rgba(218, 234, 222, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(201, 225, 206) 20.19%, rgba(201, 225, 206, 0) 100%);\n}\nbody[data-dsh-theme=\"forest\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0c150f;\n  --dsw-alias-bg-layer-1: #122017;\n  --dsw-alias-bg-layer-2: #122017;\n  --dsw-alias-bg-layer-3: #1a2d20;\n  --dsw-alias-bg-overlay: #1a2d20;\n  --dsw-alias-bg-module-platform: #1a2d20;\n  --dsw-alias-bg-multi-select: #1a2d20;\n  --dsw-alias-bg-skeleton: rgba(226, 242, 231, 0.080);\n  --dsw-alias-border-l1: rgba(226, 242, 231, 0.055);\n  --dsw-alias-border-l2: rgba(226,242,231,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(226,242,231,0.10);\n  --dsw-alias-border-l3: rgba(226, 242, 231, 0.160);\n  --dsw-alias-border-l4: rgba(226, 242, 231, 0.220);\n  --dsw-alias-border-inverted: rgba(226, 242, 231, 0.120);\n  --dsw-alias-border-inverted2: rgba(226, 242, 231, 0.120);\n  --dsw-alias-brand-primary: #4ade80;\n  --dsw-alias-brand-primary-invert: #e2f2e7;\n  --dsw-alias-brand-text: #e2f2e7;\n  --dsw-alias-button-primary-fill: #4ade80;\n  --dsw-alias-button-primary-hover: #86efac;\n  --dsw-alias-button-primary-dimmed: rgba(74, 222, 128, 0.140);\n  --dsw-alias-button-info-fill: #4ade80;\n  --dsw-alias-button-info-hover: #86efac;\n  --dsw-alias-button-contrast-fill: #e2f2e7;\n  --dsw-alias-button-elevated-fill: #122017;\n  --dsw-alias-button-floating-fill: #122017;\n  --dsw-alias-button-floating-hover: #1a2d20;\n  --dsw-alias-button-ghost-active-fill: #1a2d20;\n  --dsw-alias-button-ghost-active-hover: #1a2d20;\n  --dsw-alias-button-ghost-active-border: #66836f;\n  --dsw-alias-button-tool-bar-fill: rgba(226, 242, 231, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(226, 242, 231, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(226, 242, 231, 0.280);\n  --dsw-alias-label-primary: #e2f2e7;\n  --dsw-alias-label-secondary: #96b8a2;\n  --dsw-alias-label-tertiary: #66836f;\n  --dsw-alias-label-caption: #66836f;\n  --dsw-alias-label-dimmed: rgba(226, 242, 231, 0.450);\n  --dsw-alias-label-primary-bluish: #e2f2e7;\n  --dsw-alias-label-primary-dimmed: #e2f2e7;\n  --dsw-alias-label-primary-foreground: #052e14;\n  --dsw-alias-label-primary-inverted: #052e14;\n  --dsw-alias-interactive-bg-hover: rgba(226, 242, 231, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(226, 242, 231, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(74, 222, 128, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #1a2d20;\n  --dsw-alias-markdown-code-block: #0f1b14;\n  --dsw-alias-markdown-code-block-banner: #16261b;\n  --dsw-alias-markdown-inline-code: #0f1b14;\n  --dsw-alias-markdown-code-segment-selected: #16261b;\n  --dsw-alias-markdown-code-segment-unselected: #0f1b14;\n  --dsw-alias-markdown-citation: #1a2d20;\n  --dsw-alias-markdown-placeholder: #1a2d20;\n  --dsw-alias-markdown-tag: #1a2d20;\n  --dsw-alias-state-business-primary: #4ade80;\n  --dsw-alias-state-business-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #34d399;\n  --dsw-alias-state-success-secondary: #34d399;\n  --dsw-alias-state-success-tertiary: rgba(52, 211, 153, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(226, 242, 231, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(226, 242, 231, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(226, 242, 231, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(226, 242, 231, 0.220);\n  --dsw-alias-toast-bg: #e2f2e7;\n  --dsw-alias-tooltip-bg: #e2f2e7;\n  --dsw-specific-bubble: #0f1b14;\n  --dsw-specific-bubble-highlight: rgba(74, 222, 128, 0.120);\n  --dsw-specific-input-major: #122017;\n  --dsw-specific-login-input: #1a2d20;\n  --dsw-specific-menu: #122017;\n  --dsw-specific-selector: #1a2d20;\n  --dsw-specific-sidebar-fill: #0e1812;\n  --dsw-specific-sidebar-nav-item-active: rgba(226, 242, 231, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(74, 222, 128, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(226, 242, 231, 0.050);\n  --dsw-specific-tip: #1a2d20;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(12, 21, 15) 20.19%, rgba(12, 21, 15, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(26, 45, 32) 20.19%, rgba(26, 45, 32, 0) 100%);\n}\nbody[data-dsh-theme=\"forest\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"forest\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"sakura","name":"Sakura","nameZh":"樱花","desc":"Blossom pinks on a pale spring sky.","descZh":"淡粉的春日，落樱如雨。","swatch":{"light":["#fbdde8","#fdf2f7","#db2777","#3d1420"],"dark":["#1d0f16","#281420","#f472b6","#fdeef4"]},"css":"/* Sakura (樱花) — dsh-theme */\nbody[data-dsh-theme=\"sakura\"]{\n  --dsw-alias-bg-base: #fbdde8;\n  --dsw-alias-bg-layer-1: #fdf2f7;\n  --dsw-alias-bg-layer-2: #fdf2f7;\n  --dsw-alias-bg-layer-3: #f6ccdb;\n  --dsw-alias-bg-overlay: #f6ccdb;\n  --dsw-alias-bg-module-platform: #f6ccdb;\n  --dsw-alias-bg-multi-select: #f6ccdb;\n  --dsw-alias-bg-skeleton: rgba(61, 20, 32, 0.060);\n  --dsw-alias-border-l1: rgba(61, 20, 32, 0.055);\n  --dsw-alias-border-l2: rgba(61,20,32,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(61,20,32,0.10);\n  --dsw-alias-border-l3: rgba(61, 20, 32, 0.160);\n  --dsw-alias-border-l4: rgba(61, 20, 32, 0.220);\n  --dsw-alias-border-inverted: rgba(61, 20, 32, 0.080);\n  --dsw-alias-border-inverted2: rgba(61, 20, 32, 0.080);\n  --dsw-alias-brand-primary: #db2777;\n  --dsw-alias-brand-primary-invert: #3d1420;\n  --dsw-alias-brand-text: #3d1420;\n  --dsw-alias-button-primary-fill: #db2777;\n  --dsw-alias-button-primary-hover: #be185d;\n  --dsw-alias-button-primary-dimmed: rgba(219, 39, 119, 0.140);\n  --dsw-alias-button-info-fill: #db2777;\n  --dsw-alias-button-info-hover: #be185d;\n  --dsw-alias-button-contrast-fill: #3d1420;\n  --dsw-alias-button-elevated-fill: #fdf2f7;\n  --dsw-alias-button-floating-fill: #fdf2f7;\n  --dsw-alias-button-floating-hover: #f6ccdb;\n  --dsw-alias-button-ghost-active-fill: #f6ccdb;\n  --dsw-alias-button-ghost-active-hover: #f6ccdb;\n  --dsw-alias-button-ghost-active-border: #ad7a8a;\n  --dsw-alias-button-tool-bar-fill: rgba(61, 20, 32, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(61, 20, 32, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(61, 20, 32, 0.280);\n  --dsw-alias-label-primary: #3d1420;\n  --dsw-alias-label-secondary: #8a4a5c;\n  --dsw-alias-label-tertiary: #ad7a8a;\n  --dsw-alias-label-caption: #ad7a8a;\n  --dsw-alias-label-dimmed: rgba(61, 20, 32, 0.450);\n  --dsw-alias-label-primary-bluish: #3d1420;\n  --dsw-alias-label-primary-dimmed: #3d1420;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(61, 20, 32, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(61, 20, 32, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(219, 39, 119, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(225, 29, 72, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f6ccdb;\n  --dsw-alias-markdown-code-block: #f9dde8;\n  --dsw-alias-markdown-code-block-banner: #f5cddd;\n  --dsw-alias-markdown-inline-code: #f9dde8;\n  --dsw-alias-markdown-code-segment-selected: #f5cddd;\n  --dsw-alias-markdown-code-segment-unselected: #f9dde8;\n  --dsw-alias-markdown-citation: #f6ccdb;\n  --dsw-alias-markdown-placeholder: #f6ccdb;\n  --dsw-alias-markdown-tag: #f6ccdb;\n  --dsw-alias-state-business-primary: #db2777;\n  --dsw-alias-state-business-tertiary: rgba(219, 39, 119, 0.140);\n  --dsw-alias-state-error-primary: #e11d48;\n  --dsw-alias-state-error-secondary: rgba(225, 29, 72, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(61, 20, 32, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(61, 20, 32, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(61, 20, 32, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(61, 20, 32, 0.220);\n  --dsw-alias-toast-bg: #3d1420;\n  --dsw-alias-tooltip-bg: #3d1420;\n  --dsw-specific-bubble: #f9dde8;\n  --dsw-specific-bubble-highlight: rgba(219, 39, 119, 0.120);\n  --dsw-specific-input-major: #fdf2f7;\n  --dsw-specific-login-input: #f6ccdb;\n  --dsw-specific-menu: #fdf2f7;\n  --dsw-specific-selector: #f6ccdb;\n  --dsw-specific-sidebar-fill: #f9dfe9;\n  --dsw-specific-sidebar-nav-item-active: rgba(61, 20, 32, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(219, 39, 119, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(61, 20, 32, 0.050);\n  --dsw-specific-tip: #f6ccdb;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(251, 221, 232) 20.19%, rgba(251, 221, 232, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(246, 204, 219) 20.19%, rgba(246, 204, 219, 0) 100%);\n}\nbody[data-dsh-theme=\"sakura\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #1d0f16;\n  --dsw-alias-bg-layer-1: #281420;\n  --dsw-alias-bg-layer-2: #281420;\n  --dsw-alias-bg-layer-3: #361b29;\n  --dsw-alias-bg-overlay: #361b29;\n  --dsw-alias-bg-module-platform: #361b29;\n  --dsw-alias-bg-multi-select: #361b29;\n  --dsw-alias-bg-skeleton: rgba(253, 238, 244, 0.080);\n  --dsw-alias-border-l1: rgba(253, 238, 244, 0.055);\n  --dsw-alias-border-l2: rgba(253,238,244,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(253,238,244,0.10);\n  --dsw-alias-border-l3: rgba(253, 238, 244, 0.160);\n  --dsw-alias-border-l4: rgba(253, 238, 244, 0.220);\n  --dsw-alias-border-inverted: rgba(253, 238, 244, 0.120);\n  --dsw-alias-border-inverted2: rgba(253, 238, 244, 0.120);\n  --dsw-alias-brand-primary: #f472b6;\n  --dsw-alias-brand-primary-invert: #fdeef4;\n  --dsw-alias-brand-text: #fdeef4;\n  --dsw-alias-button-primary-fill: #f472b6;\n  --dsw-alias-button-primary-hover: #f9a8d4;\n  --dsw-alias-button-primary-dimmed: rgba(244, 114, 182, 0.140);\n  --dsw-alias-button-info-fill: #f472b6;\n  --dsw-alias-button-info-hover: #f9a8d4;\n  --dsw-alias-button-contrast-fill: #fdeef4;\n  --dsw-alias-button-elevated-fill: #281420;\n  --dsw-alias-button-floating-fill: #281420;\n  --dsw-alias-button-floating-hover: #361b29;\n  --dsw-alias-button-ghost-active-fill: #361b29;\n  --dsw-alias-button-ghost-active-hover: #361b29;\n  --dsw-alias-button-ghost-active-border: #a06b83;\n  --dsw-alias-button-tool-bar-fill: rgba(253, 238, 244, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(253, 238, 244, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(253, 238, 244, 0.280);\n  --dsw-alias-label-primary: #fdeef4;\n  --dsw-alias-label-secondary: #d49db2;\n  --dsw-alias-label-tertiary: #a06b83;\n  --dsw-alias-label-caption: #a06b83;\n  --dsw-alias-label-dimmed: rgba(253, 238, 244, 0.450);\n  --dsw-alias-label-primary-bluish: #fdeef4;\n  --dsw-alias-label-primary-dimmed: #fdeef4;\n  --dsw-alias-label-primary-foreground: #2a0515;\n  --dsw-alias-label-primary-inverted: #2a0515;\n  --dsw-alias-interactive-bg-hover: rgba(253, 238, 244, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(253, 238, 244, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(244, 114, 182, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #361b29;\n  --dsw-alias-markdown-code-block: #22111b;\n  --dsw-alias-markdown-code-block-banner: #2d1825;\n  --dsw-alias-markdown-inline-code: #22111b;\n  --dsw-alias-markdown-code-segment-selected: #2d1825;\n  --dsw-alias-markdown-code-segment-unselected: #22111b;\n  --dsw-alias-markdown-citation: #361b29;\n  --dsw-alias-markdown-placeholder: #361b29;\n  --dsw-alias-markdown-tag: #361b29;\n  --dsw-alias-state-business-primary: #f472b6;\n  --dsw-alias-state-business-tertiary: rgba(244, 114, 182, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(253, 238, 244, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(253, 238, 244, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(253, 238, 244, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(253, 238, 244, 0.220);\n  --dsw-alias-toast-bg: #fdeef4;\n  --dsw-alias-tooltip-bg: #fdeef4;\n  --dsw-specific-bubble: #22111b;\n  --dsw-specific-bubble-highlight: rgba(244, 114, 182, 0.120);\n  --dsw-specific-input-major: #281420;\n  --dsw-specific-login-input: #361b29;\n  --dsw-specific-menu: #281420;\n  --dsw-specific-selector: #361b29;\n  --dsw-specific-sidebar-fill: #200f18;\n  --dsw-specific-sidebar-nav-item-active: rgba(253, 238, 244, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(244, 114, 182, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(253, 238, 244, 0.050);\n  --dsw-specific-tip: #361b29;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(29, 15, 22) 20.19%, rgba(29, 15, 22, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(54, 27, 41) 20.19%, rgba(54, 27, 41, 0) 100%);\n}\nbody[data-dsh-theme=\"sakura\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"sakura\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"sunset","name":"Sunset","nameZh":"日落","desc":"Warm peach fading into dusk.","descZh":"暖桃色渐入黄昏。","swatch":{"light":["#fcebe0","#fef9f7","#ea580c","#331a10"],"dark":["#180e10","#211316","#fb923c","#fdf0ec"]},"css":"/* Sunset (日落) — dsh-theme */\nbody[data-dsh-theme=\"sunset\"]{\n  --dsw-alias-bg-base: #fcebe0;\n  --dsw-alias-bg-layer-1: #fef9f7;\n  --dsw-alias-bg-layer-2: #fef9f7;\n  --dsw-alias-bg-layer-3: #f8dccb;\n  --dsw-alias-bg-overlay: #f8dccb;\n  --dsw-alias-bg-module-platform: #f8dccb;\n  --dsw-alias-bg-multi-select: #f8dccb;\n  --dsw-alias-bg-skeleton: rgba(51, 26, 16, 0.060);\n  --dsw-alias-border-l1: rgba(51, 26, 16, 0.055);\n  --dsw-alias-border-l2: rgba(51,26,16,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(51,26,16,0.10);\n  --dsw-alias-border-l3: rgba(51, 26, 16, 0.160);\n  --dsw-alias-border-l4: rgba(51, 26, 16, 0.220);\n  --dsw-alias-border-inverted: rgba(51, 26, 16, 0.080);\n  --dsw-alias-border-inverted2: rgba(51, 26, 16, 0.080);\n  --dsw-alias-brand-primary: #ea580c;\n  --dsw-alias-brand-primary-invert: #331a10;\n  --dsw-alias-brand-text: #331a10;\n  --dsw-alias-button-primary-fill: #ea580c;\n  --dsw-alias-button-primary-hover: #c2410c;\n  --dsw-alias-button-primary-dimmed: rgba(234, 88, 12, 0.140);\n  --dsw-alias-button-info-fill: #ea580c;\n  --dsw-alias-button-info-hover: #c2410c;\n  --dsw-alias-button-contrast-fill: #331a10;\n  --dsw-alias-button-elevated-fill: #fef9f7;\n  --dsw-alias-button-floating-fill: #fef9f7;\n  --dsw-alias-button-floating-hover: #f8dccb;\n  --dsw-alias-button-ghost-active-fill: #f8dccb;\n  --dsw-alias-button-ghost-active-hover: #f8dccb;\n  --dsw-alias-button-ghost-active-border: #a4765f;\n  --dsw-alias-button-tool-bar-fill: rgba(51, 26, 16, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(51, 26, 16, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(51, 26, 16, 0.280);\n  --dsw-alias-label-primary: #331a10;\n  --dsw-alias-label-secondary: #7a4a33;\n  --dsw-alias-label-tertiary: #a4765f;\n  --dsw-alias-label-caption: #a4765f;\n  --dsw-alias-label-dimmed: rgba(51, 26, 16, 0.450);\n  --dsw-alias-label-primary-bluish: #331a10;\n  --dsw-alias-label-primary-dimmed: #331a10;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(51, 26, 16, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(51, 26, 16, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(234, 88, 12, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f8dccb;\n  --dsw-alias-markdown-code-block: #f8e7da;\n  --dsw-alias-markdown-code-block-banner: #f4dbc9;\n  --dsw-alias-markdown-inline-code: #f8e7da;\n  --dsw-alias-markdown-code-segment-selected: #f4dbc9;\n  --dsw-alias-markdown-code-segment-unselected: #f8e7da;\n  --dsw-alias-markdown-citation: #f8dccb;\n  --dsw-alias-markdown-placeholder: #f8dccb;\n  --dsw-alias-markdown-tag: #f8dccb;\n  --dsw-alias-state-business-primary: #ea580c;\n  --dsw-alias-state-business-tertiary: rgba(234, 88, 12, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(51, 26, 16, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(51, 26, 16, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(51, 26, 16, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(51, 26, 16, 0.220);\n  --dsw-alias-toast-bg: #331a10;\n  --dsw-alias-tooltip-bg: #331a10;\n  --dsw-specific-bubble: #f8e7da;\n  --dsw-specific-bubble-highlight: rgba(234, 88, 12, 0.120);\n  --dsw-specific-input-major: #fef9f7;\n  --dsw-specific-login-input: #f8dccb;\n  --dsw-specific-menu: #fef9f7;\n  --dsw-specific-selector: #f8dccb;\n  --dsw-specific-sidebar-fill: #f8e6d6;\n  --dsw-specific-sidebar-nav-item-active: rgba(51, 26, 16, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(234, 88, 12, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(51, 26, 16, 0.050);\n  --dsw-specific-tip: #f8dccb;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(252, 235, 224) 20.19%, rgba(252, 235, 224, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(248, 220, 203) 20.19%, rgba(248, 220, 203, 0) 100%);\n}\nbody[data-dsh-theme=\"sunset\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #180e10;\n  --dsw-alias-bg-layer-1: #211316;\n  --dsw-alias-bg-layer-2: #211316;\n  --dsw-alias-bg-layer-3: #2e1a1e;\n  --dsw-alias-bg-overlay: #2e1a1e;\n  --dsw-alias-bg-module-platform: #2e1a1e;\n  --dsw-alias-bg-multi-select: #2e1a1e;\n  --dsw-alias-bg-skeleton: rgba(253, 240, 236, 0.080);\n  --dsw-alias-border-l1: rgba(253, 240, 236, 0.055);\n  --dsw-alias-border-l2: rgba(253,240,236,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(253,240,236,0.10);\n  --dsw-alias-border-l3: rgba(253, 240, 236, 0.160);\n  --dsw-alias-border-l4: rgba(253, 240, 236, 0.220);\n  --dsw-alias-border-inverted: rgba(253, 240, 236, 0.120);\n  --dsw-alias-border-inverted2: rgba(253, 240, 236, 0.120);\n  --dsw-alias-brand-primary: #fb923c;\n  --dsw-alias-brand-primary-invert: #fdf0ec;\n  --dsw-alias-brand-text: #fdf0ec;\n  --dsw-alias-button-primary-fill: #fb923c;\n  --dsw-alias-button-primary-hover: #fdba74;\n  --dsw-alias-button-primary-dimmed: rgba(251, 146, 60, 0.140);\n  --dsw-alias-button-info-fill: #fb923c;\n  --dsw-alias-button-info-hover: #fdba74;\n  --dsw-alias-button-contrast-fill: #fdf0ec;\n  --dsw-alias-button-elevated-fill: #211316;\n  --dsw-alias-button-floating-fill: #211316;\n  --dsw-alias-button-floating-hover: #2e1a1e;\n  --dsw-alias-button-ghost-active-fill: #2e1a1e;\n  --dsw-alias-button-ghost-active-hover: #2e1a1e;\n  --dsw-alias-button-ghost-active-border: #9c7167;\n  --dsw-alias-button-tool-bar-fill: rgba(253, 240, 236, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(253, 240, 236, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(253, 240, 236, 0.280);\n  --dsw-alias-label-primary: #fdf0ec;\n  --dsw-alias-label-secondary: #d2a090;\n  --dsw-alias-label-tertiary: #9c7167;\n  --dsw-alias-label-caption: #9c7167;\n  --dsw-alias-label-dimmed: rgba(253, 240, 236, 0.450);\n  --dsw-alias-label-primary-bluish: #fdf0ec;\n  --dsw-alias-label-primary-dimmed: #fdf0ec;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(253, 240, 236, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(253, 240, 236, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(251, 146, 60, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2e1a1e;\n  --dsw-alias-markdown-code-block: #1d1113;\n  --dsw-alias-markdown-code-block-banner: #28171a;\n  --dsw-alias-markdown-inline-code: #1d1113;\n  --dsw-alias-markdown-code-segment-selected: #28171a;\n  --dsw-alias-markdown-code-segment-unselected: #1d1113;\n  --dsw-alias-markdown-citation: #2e1a1e;\n  --dsw-alias-markdown-placeholder: #2e1a1e;\n  --dsw-alias-markdown-tag: #2e1a1e;\n  --dsw-alias-state-business-primary: #fb923c;\n  --dsw-alias-state-business-tertiary: rgba(251, 146, 60, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(253, 240, 236, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(253, 240, 236, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(253, 240, 236, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(253, 240, 236, 0.220);\n  --dsw-alias-toast-bg: #fdf0ec;\n  --dsw-alias-tooltip-bg: #fdf0ec;\n  --dsw-specific-bubble: #1d1113;\n  --dsw-specific-bubble-highlight: rgba(251, 146, 60, 0.120);\n  --dsw-specific-input-major: #211316;\n  --dsw-specific-login-input: #2e1a1e;\n  --dsw-specific-menu: #211316;\n  --dsw-specific-selector: #2e1a1e;\n  --dsw-specific-sidebar-fill: #1a1012;\n  --dsw-specific-sidebar-nav-item-active: rgba(253, 240, 236, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(251, 146, 60, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(253, 240, 236, 0.050);\n  --dsw-specific-tip: #2e1a1e;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(24, 14, 16) 20.19%, rgba(24, 14, 16, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(46, 26, 30) 20.19%, rgba(46, 26, 30, 0) 100%);\n}\nbody[data-dsh-theme=\"sunset\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"sunset\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"graphite","name":"Graphite","nameZh":"石墨","desc":"Soft neutral gray, easy on the eyes.","descZh":"柔和的暖灰，护眼耐看。","swatch":{"light":["#f6f6f5","#ffffff","#3f3f3c","#1c1c1a"],"dark":["#161614","#1d1d1a","#e4e4e0","#ececea"]},"css":"/* Graphite (石墨) — dsh-theme */\nbody[data-dsh-theme=\"graphite\"]{\n  --dsw-alias-bg-base: #f6f6f5;\n  --dsw-alias-bg-layer-1: #ffffff;\n  --dsw-alias-bg-layer-2: #ffffff;\n  --dsw-alias-bg-layer-3: #ececea;\n  --dsw-alias-bg-overlay: #ececea;\n  --dsw-alias-bg-module-platform: #ececea;\n  --dsw-alias-bg-multi-select: #ececea;\n  --dsw-alias-bg-skeleton: rgba(28, 28, 26, 0.060);\n  --dsw-alias-border-l1: rgba(28, 28, 26, 0.055);\n  --dsw-alias-border-l2: rgba(28,28,26,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(28,28,26,0.10);\n  --dsw-alias-border-l3: rgba(28, 28, 26, 0.160);\n  --dsw-alias-border-l4: rgba(28, 28, 26, 0.220);\n  --dsw-alias-border-inverted: rgba(28, 28, 26, 0.080);\n  --dsw-alias-border-inverted2: rgba(28, 28, 26, 0.080);\n  --dsw-alias-brand-primary: #3f3f3c;\n  --dsw-alias-brand-primary-invert: #1c1c1a;\n  --dsw-alias-brand-text: #1c1c1a;\n  --dsw-alias-button-primary-fill: #3f3f3c;\n  --dsw-alias-button-primary-hover: #2e2e2b;\n  --dsw-alias-button-primary-dimmed: rgba(63, 63, 60, 0.140);\n  --dsw-alias-button-info-fill: #3f3f3c;\n  --dsw-alias-button-info-hover: #2e2e2b;\n  --dsw-alias-button-contrast-fill: #1c1c1a;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #ececea;\n  --dsw-alias-button-ghost-active-fill: #ececea;\n  --dsw-alias-button-ghost-active-hover: #ececea;\n  --dsw-alias-button-ghost-active-border: #8b8b85;\n  --dsw-alias-button-tool-bar-fill: rgba(28, 28, 26, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(28, 28, 26, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(28, 28, 26, 0.280);\n  --dsw-alias-label-primary: #1c1c1a;\n  --dsw-alias-label-secondary: #5c5c57;\n  --dsw-alias-label-tertiary: #8b8b85;\n  --dsw-alias-label-caption: #8b8b85;\n  --dsw-alias-label-dimmed: rgba(28, 28, 26, 0.450);\n  --dsw-alias-label-primary-bluish: #1c1c1a;\n  --dsw-alias-label-primary-dimmed: #1c1c1a;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(28, 28, 26, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(28, 28, 26, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(63, 63, 60, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #ececea;\n  --dsw-alias-markdown-code-block: #eeedeb;\n  --dsw-alias-markdown-code-block-banner: #e7e6e3;\n  --dsw-alias-markdown-inline-code: #eeedeb;\n  --dsw-alias-markdown-code-segment-selected: #e7e6e3;\n  --dsw-alias-markdown-code-segment-unselected: #eeedeb;\n  --dsw-alias-markdown-citation: #ececea;\n  --dsw-alias-markdown-placeholder: #ececea;\n  --dsw-alias-markdown-tag: #ececea;\n  --dsw-alias-state-business-primary: #3f3f3c;\n  --dsw-alias-state-business-tertiary: rgba(63, 63, 60, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(28, 28, 26, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(28, 28, 26, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(28, 28, 26, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(28, 28, 26, 0.220);\n  --dsw-alias-toast-bg: #1c1c1a;\n  --dsw-alias-tooltip-bg: #1c1c1a;\n  --dsw-specific-bubble: #eeedeb;\n  --dsw-specific-bubble-highlight: rgba(63, 63, 60, 0.120);\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-login-input: #ececea;\n  --dsw-specific-menu: #ffffff;\n  --dsw-specific-selector: #ececea;\n  --dsw-specific-sidebar-fill: #ededeb;\n  --dsw-specific-sidebar-nav-item-active: rgba(28, 28, 26, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(63, 63, 60, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(28, 28, 26, 0.050);\n  --dsw-specific-tip: #ececea;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(246, 246, 245) 20.19%, rgba(246, 246, 245, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(236, 236, 234) 20.19%, rgba(236, 236, 234, 0) 100%);\n}\nbody[data-dsh-theme=\"graphite\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #161614;\n  --dsw-alias-bg-layer-1: #1d1d1a;\n  --dsw-alias-bg-layer-2: #1d1d1a;\n  --dsw-alias-bg-layer-3: #262622;\n  --dsw-alias-bg-overlay: #262622;\n  --dsw-alias-bg-module-platform: #262622;\n  --dsw-alias-bg-multi-select: #262622;\n  --dsw-alias-bg-skeleton: rgba(236, 236, 234, 0.080);\n  --dsw-alias-border-l1: rgba(236, 236, 234, 0.055);\n  --dsw-alias-border-l2: rgba(236,236,234,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(236,236,234,0.10);\n  --dsw-alias-border-l3: rgba(236, 236, 234, 0.160);\n  --dsw-alias-border-l4: rgba(236, 236, 234, 0.220);\n  --dsw-alias-border-inverted: rgba(236, 236, 234, 0.120);\n  --dsw-alias-border-inverted2: rgba(236, 236, 234, 0.120);\n  --dsw-alias-brand-primary: #e4e4e0;\n  --dsw-alias-brand-primary-invert: #ececea;\n  --dsw-alias-brand-text: #ececea;\n  --dsw-alias-button-primary-fill: #e4e4e0;\n  --dsw-alias-button-primary-hover: #ffffff;\n  --dsw-alias-button-primary-dimmed: rgba(228, 228, 224, 0.140);\n  --dsw-alias-button-info-fill: #e4e4e0;\n  --dsw-alias-button-info-hover: #ffffff;\n  --dsw-alias-button-contrast-fill: #ececea;\n  --dsw-alias-button-elevated-fill: #1d1d1a;\n  --dsw-alias-button-floating-fill: #1d1d1a;\n  --dsw-alias-button-floating-hover: #262622;\n  --dsw-alias-button-ghost-active-fill: #262622;\n  --dsw-alias-button-ghost-active-hover: #262622;\n  --dsw-alias-button-ghost-active-border: #71716b;\n  --dsw-alias-button-tool-bar-fill: rgba(236, 236, 234, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(236, 236, 234, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(236, 236, 234, 0.280);\n  --dsw-alias-label-primary: #ececea;\n  --dsw-alias-label-secondary: #a3a39c;\n  --dsw-alias-label-tertiary: #71716b;\n  --dsw-alias-label-caption: #71716b;\n  --dsw-alias-label-dimmed: rgba(236, 236, 234, 0.450);\n  --dsw-alias-label-primary-bluish: #ececea;\n  --dsw-alias-label-primary-dimmed: #ececea;\n  --dsw-alias-label-primary-foreground: #161614;\n  --dsw-alias-label-primary-inverted: #161614;\n  --dsw-alias-interactive-bg-hover: rgba(236, 236, 234, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(236, 236, 234, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(228, 228, 224, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #262622;\n  --dsw-alias-markdown-code-block: #1a1a17;\n  --dsw-alias-markdown-code-block-banner: #21211e;\n  --dsw-alias-markdown-inline-code: #1a1a17;\n  --dsw-alias-markdown-code-segment-selected: #21211e;\n  --dsw-alias-markdown-code-segment-unselected: #1a1a17;\n  --dsw-alias-markdown-citation: #262622;\n  --dsw-alias-markdown-placeholder: #262622;\n  --dsw-alias-markdown-tag: #262622;\n  --dsw-alias-state-business-primary: #e4e4e0;\n  --dsw-alias-state-business-tertiary: rgba(228, 228, 224, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(236, 236, 234, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(236, 236, 234, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(236, 236, 234, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(236, 236, 234, 0.220);\n  --dsw-alias-toast-bg: #ececea;\n  --dsw-alias-tooltip-bg: #ececea;\n  --dsw-specific-bubble: #1a1a17;\n  --dsw-specific-bubble-highlight: rgba(228, 228, 224, 0.120);\n  --dsw-specific-input-major: #1d1d1a;\n  --dsw-specific-login-input: #262622;\n  --dsw-specific-menu: #1d1d1a;\n  --dsw-specific-selector: #262622;\n  --dsw-specific-sidebar-fill: #181816;\n  --dsw-specific-sidebar-nav-item-active: rgba(236, 236, 234, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(228, 228, 224, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(236, 236, 234, 0.050);\n  --dsw-specific-tip: #262622;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(22, 22, 20) 20.19%, rgba(22, 22, 20, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(38, 38, 34) 20.19%, rgba(38, 38, 34, 0) 100%);\n}\nbody[data-dsh-theme=\"graphite\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"graphite\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"ink","name":"Ink","nameZh":"墨黑","desc":"Pure black and white, nothing more.","descZh":"纯粹的黑与白，至简。","swatch":{"light":["#fafafa","#ffffff","#0a0a0a","#0a0a0a"],"dark":["#0a0a0a","#111111","#ffffff","#f5f5f5"]},"css":"/* Ink (墨黑) — dsh-theme */\nbody[data-dsh-theme=\"ink\"]{\n  --dsw-alias-bg-base: #fafafa;\n  --dsw-alias-bg-layer-1: #ffffff;\n  --dsw-alias-bg-layer-2: #ffffff;\n  --dsw-alias-bg-layer-3: #f0f0f0;\n  --dsw-alias-bg-overlay: #f0f0f0;\n  --dsw-alias-bg-module-platform: #f0f0f0;\n  --dsw-alias-bg-multi-select: #f0f0f0;\n  --dsw-alias-bg-skeleton: rgba(10, 10, 10, 0.060);\n  --dsw-alias-border-l1: rgba(10, 10, 10, 0.066);\n  --dsw-alias-border-l2: rgba(10,10,10,0.12);\n  --dsw-alias-border-l2-darkmode-thin: rgba(10,10,10,0.12);\n  --dsw-alias-border-l3: rgba(10, 10, 10, 0.192);\n  --dsw-alias-border-l4: rgba(10, 10, 10, 0.264);\n  --dsw-alias-border-inverted: rgba(10, 10, 10, 0.080);\n  --dsw-alias-border-inverted2: rgba(10, 10, 10, 0.080);\n  --dsw-alias-brand-primary: #0a0a0a;\n  --dsw-alias-brand-primary-invert: #0a0a0a;\n  --dsw-alias-brand-text: #0a0a0a;\n  --dsw-alias-button-primary-fill: #0a0a0a;\n  --dsw-alias-button-primary-hover: #333333;\n  --dsw-alias-button-primary-dimmed: rgba(10, 10, 10, 0.140);\n  --dsw-alias-button-info-fill: #0a0a0a;\n  --dsw-alias-button-info-hover: #333333;\n  --dsw-alias-button-contrast-fill: #0a0a0a;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f0f0f0;\n  --dsw-alias-button-ghost-active-fill: #f0f0f0;\n  --dsw-alias-button-ghost-active-hover: #f0f0f0;\n  --dsw-alias-button-ghost-active-border: #8a8a8a;\n  --dsw-alias-button-tool-bar-fill: rgba(10, 10, 10, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(10, 10, 10, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(10, 10, 10, 0.280);\n  --dsw-alias-label-primary: #0a0a0a;\n  --dsw-alias-label-secondary: #525252;\n  --dsw-alias-label-tertiary: #8a8a8a;\n  --dsw-alias-label-caption: #8a8a8a;\n  --dsw-alias-label-dimmed: rgba(10, 10, 10, 0.450);\n  --dsw-alias-label-primary-bluish: #0a0a0a;\n  --dsw-alias-label-primary-dimmed: #0a0a0a;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(10, 10, 10, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(10, 10, 10, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(10, 10, 10, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f0f0f0;\n  --dsw-alias-markdown-code-block: #f2f2f2;\n  --dsw-alias-markdown-code-block-banner: #ebebeb;\n  --dsw-alias-markdown-inline-code: #f2f2f2;\n  --dsw-alias-markdown-code-segment-selected: #ebebeb;\n  --dsw-alias-markdown-code-segment-unselected: #f2f2f2;\n  --dsw-alias-markdown-citation: #f0f0f0;\n  --dsw-alias-markdown-placeholder: #f0f0f0;\n  --dsw-alias-markdown-tag: #f0f0f0;\n  --dsw-alias-state-business-primary: #0a0a0a;\n  --dsw-alias-state-business-tertiary: rgba(10, 10, 10, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #16a34a;\n  --dsw-alias-state-success-secondary: #16a34a;\n  --dsw-alias-state-success-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(10, 10, 10, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(10, 10, 10, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(10, 10, 10, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(10, 10, 10, 0.220);\n  --dsw-alias-toast-bg: #0a0a0a;\n  --dsw-alias-tooltip-bg: #0a0a0a;\n  --dsw-specific-bubble: #f2f2f2;\n  --dsw-specific-bubble-highlight: rgba(10, 10, 10, 0.120);\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-login-input: #f0f0f0;\n  --dsw-specific-menu: #ffffff;\n  --dsw-specific-selector: #f0f0f0;\n  --dsw-specific-sidebar-fill: #f4f4f4;\n  --dsw-specific-sidebar-nav-item-active: rgba(10, 10, 10, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(10, 10, 10, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(10, 10, 10, 0.050);\n  --dsw-specific-tip: #f0f0f0;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(250, 250, 250) 20.19%, rgba(250, 250, 250, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(240, 240, 240) 20.19%, rgba(240, 240, 240, 0) 100%);\n}\nbody[data-dsh-theme=\"ink\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0a0a0a;\n  --dsw-alias-bg-layer-1: #111111;\n  --dsw-alias-bg-layer-2: #111111;\n  --dsw-alias-bg-layer-3: #1a1a1a;\n  --dsw-alias-bg-overlay: #1a1a1a;\n  --dsw-alias-bg-module-platform: #1a1a1a;\n  --dsw-alias-bg-multi-select: #1a1a1a;\n  --dsw-alias-bg-skeleton: rgba(245, 245, 245, 0.080);\n  --dsw-alias-border-l1: rgba(255, 255, 255, 0.066);\n  --dsw-alias-border-l2: rgba(255,255,255,0.12);\n  --dsw-alias-border-l2-darkmode-thin: rgba(255,255,255,0.12);\n  --dsw-alias-border-l3: rgba(255, 255, 255, 0.192);\n  --dsw-alias-border-l4: rgba(255, 255, 255, 0.264);\n  --dsw-alias-border-inverted: rgba(245, 245, 245, 0.120);\n  --dsw-alias-border-inverted2: rgba(245, 245, 245, 0.120);\n  --dsw-alias-brand-primary: #ffffff;\n  --dsw-alias-brand-primary-invert: #f5f5f5;\n  --dsw-alias-brand-text: #f5f5f5;\n  --dsw-alias-button-primary-fill: #ffffff;\n  --dsw-alias-button-primary-hover: #d4d4d4;\n  --dsw-alias-button-primary-dimmed: rgba(255, 255, 255, 0.140);\n  --dsw-alias-button-info-fill: #ffffff;\n  --dsw-alias-button-info-hover: #d4d4d4;\n  --dsw-alias-button-contrast-fill: #f5f5f5;\n  --dsw-alias-button-elevated-fill: #111111;\n  --dsw-alias-button-floating-fill: #111111;\n  --dsw-alias-button-floating-hover: #1a1a1a;\n  --dsw-alias-button-ghost-active-fill: #1a1a1a;\n  --dsw-alias-button-ghost-active-hover: #1a1a1a;\n  --dsw-alias-button-ghost-active-border: #6e6e6e;\n  --dsw-alias-button-tool-bar-fill: rgba(245, 245, 245, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(245, 245, 245, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(245, 245, 245, 0.280);\n  --dsw-alias-label-primary: #f5f5f5;\n  --dsw-alias-label-secondary: #a3a3a3;\n  --dsw-alias-label-tertiary: #6e6e6e;\n  --dsw-alias-label-caption: #6e6e6e;\n  --dsw-alias-label-dimmed: rgba(245, 245, 245, 0.450);\n  --dsw-alias-label-primary-bluish: #f5f5f5;\n  --dsw-alias-label-primary-dimmed: #f5f5f5;\n  --dsw-alias-label-primary-foreground: #0a0a0a;\n  --dsw-alias-label-primary-inverted: #0a0a0a;\n  --dsw-alias-interactive-bg-hover: rgba(245, 245, 245, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(245, 245, 245, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 255, 255, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #1a1a1a;\n  --dsw-alias-markdown-code-block: #0e0e0e;\n  --dsw-alias-markdown-code-block-banner: #161616;\n  --dsw-alias-markdown-inline-code: #0e0e0e;\n  --dsw-alias-markdown-code-segment-selected: #161616;\n  --dsw-alias-markdown-code-segment-unselected: #0e0e0e;\n  --dsw-alias-markdown-citation: #1a1a1a;\n  --dsw-alias-markdown-placeholder: #1a1a1a;\n  --dsw-alias-markdown-tag: #1a1a1a;\n  --dsw-alias-state-business-primary: #ffffff;\n  --dsw-alias-state-business-tertiary: rgba(255, 255, 255, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(245, 245, 245, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(245, 245, 245, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(245, 245, 245, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(245, 245, 245, 0.220);\n  --dsw-alias-toast-bg: #f5f5f5;\n  --dsw-alias-tooltip-bg: #f5f5f5;\n  --dsw-specific-bubble: #0e0e0e;\n  --dsw-specific-bubble-highlight: rgba(255, 255, 255, 0.120);\n  --dsw-specific-input-major: #111111;\n  --dsw-specific-login-input: #1a1a1a;\n  --dsw-specific-menu: #111111;\n  --dsw-specific-selector: #1a1a1a;\n  --dsw-specific-sidebar-fill: #0d0d0d;\n  --dsw-specific-sidebar-nav-item-active: rgba(245, 245, 245, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(255, 255, 255, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(245, 245, 245, 0.050);\n  --dsw-specific-tip: #1a1a1a;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(10, 10, 10) 20.19%, rgba(10, 10, 10, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(26, 26, 26) 20.19%, rgba(26, 26, 26, 0) 100%);\n}\nbody[data-dsh-theme=\"ink\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"ink\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"paper","name":"Paper","nameZh":"纸张","desc":"Warm cream like a well-read notebook.","descZh":"暖奶油色，像一本翻旧了的笔记本。","swatch":{"light":["#f4eee5","#fcf9f2","#8a5a2b","#2f2417"],"dark":["#171310","#1f1a15","#d4a15c","#f3ece1"]},"css":"/* Paper (纸张) — dsh-theme */\nbody[data-dsh-theme=\"paper\"]{\n  --dsw-alias-bg-base: #f4eee5;\n  --dsw-alias-bg-layer-1: #fcf9f2;\n  --dsw-alias-bg-layer-2: #fcf9f2;\n  --dsw-alias-bg-layer-3: #ebe3d5;\n  --dsw-alias-bg-overlay: #ebe3d5;\n  --dsw-alias-bg-module-platform: #ebe3d5;\n  --dsw-alias-bg-multi-select: #ebe3d5;\n  --dsw-alias-bg-skeleton: rgba(47, 36, 23, 0.060);\n  --dsw-alias-border-l1: rgba(47, 36, 23, 0.066);\n  --dsw-alias-border-l2: rgba(47,36,23,0.12);\n  --dsw-alias-border-l2-darkmode-thin: rgba(47,36,23,0.12);\n  --dsw-alias-border-l3: rgba(47, 36, 23, 0.192);\n  --dsw-alias-border-l4: rgba(47, 36, 23, 0.264);\n  --dsw-alias-border-inverted: rgba(47, 36, 23, 0.080);\n  --dsw-alias-border-inverted2: rgba(47, 36, 23, 0.080);\n  --dsw-alias-brand-primary: #8a5a2b;\n  --dsw-alias-brand-primary-invert: #2f2417;\n  --dsw-alias-brand-text: #2f2417;\n  --dsw-alias-button-primary-fill: #8a5a2b;\n  --dsw-alias-button-primary-hover: #6f481f;\n  --dsw-alias-button-primary-dimmed: rgba(138, 90, 43, 0.140);\n  --dsw-alias-button-info-fill: #8a5a2b;\n  --dsw-alias-button-info-hover: #6f481f;\n  --dsw-alias-button-contrast-fill: #2f2417;\n  --dsw-alias-button-elevated-fill: #fcf9f2;\n  --dsw-alias-button-floating-fill: #fcf9f2;\n  --dsw-alias-button-floating-hover: #ebe3d5;\n  --dsw-alias-button-ghost-active-fill: #ebe3d5;\n  --dsw-alias-button-ghost-active-hover: #ebe3d5;\n  --dsw-alias-button-ghost-active-border: #9a8870;\n  --dsw-alias-button-tool-bar-fill: rgba(47, 36, 23, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(47, 36, 23, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(47, 36, 23, 0.280);\n  --dsw-alias-label-primary: #2f2417;\n  --dsw-alias-label-secondary: #6b5943;\n  --dsw-alias-label-tertiary: #9a8870;\n  --dsw-alias-label-caption: #9a8870;\n  --dsw-alias-label-dimmed: rgba(47, 36, 23, 0.450);\n  --dsw-alias-label-primary-bluish: #2f2417;\n  --dsw-alias-label-primary-dimmed: #2f2417;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(47, 36, 23, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(47, 36, 23, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(138, 90, 43, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #ebe3d5;\n  --dsw-alias-markdown-code-block: #f0e9dd;\n  --dsw-alias-markdown-code-block-banner: #e9decd;\n  --dsw-alias-markdown-inline-code: #f0e9dd;\n  --dsw-alias-markdown-code-segment-selected: #e9decd;\n  --dsw-alias-markdown-code-segment-unselected: #f0e9dd;\n  --dsw-alias-markdown-citation: #ebe3d5;\n  --dsw-alias-markdown-placeholder: #ebe3d5;\n  --dsw-alias-markdown-tag: #ebe3d5;\n  --dsw-alias-state-business-primary: #8a5a2b;\n  --dsw-alias-state-business-tertiary: rgba(138, 90, 43, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(47, 36, 23, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(47, 36, 23, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(47, 36, 23, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(47, 36, 23, 0.220);\n  --dsw-alias-toast-bg: #2f2417;\n  --dsw-alias-tooltip-bg: #2f2417;\n  --dsw-specific-bubble: #f0e9dd;\n  --dsw-specific-bubble-highlight: rgba(138, 90, 43, 0.120);\n  --dsw-specific-input-major: #fcf9f2;\n  --dsw-specific-login-input: #ebe3d5;\n  --dsw-specific-menu: #fcf9f2;\n  --dsw-specific-selector: #ebe3d5;\n  --dsw-specific-sidebar-fill: #f0e9de;\n  --dsw-specific-sidebar-nav-item-active: rgba(47, 36, 23, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(138, 90, 43, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(47, 36, 23, 0.050);\n  --dsw-specific-tip: #ebe3d5;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(244, 238, 229) 20.19%, rgba(244, 238, 229, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(235, 227, 213) 20.19%, rgba(235, 227, 213, 0) 100%);\n}\nbody[data-dsh-theme=\"paper\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #171310;\n  --dsw-alias-bg-layer-1: #1f1a15;\n  --dsw-alias-bg-layer-2: #1f1a15;\n  --dsw-alias-bg-layer-3: #2a231b;\n  --dsw-alias-bg-overlay: #2a231b;\n  --dsw-alias-bg-module-platform: #2a231b;\n  --dsw-alias-bg-multi-select: #2a231b;\n  --dsw-alias-bg-skeleton: rgba(243, 236, 225, 0.080);\n  --dsw-alias-border-l1: rgba(243, 236, 225, 0.055);\n  --dsw-alias-border-l2: rgba(243,236,225,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(243,236,225,0.10);\n  --dsw-alias-border-l3: rgba(243, 236, 225, 0.160);\n  --dsw-alias-border-l4: rgba(243, 236, 225, 0.220);\n  --dsw-alias-border-inverted: rgba(243, 236, 225, 0.120);\n  --dsw-alias-border-inverted2: rgba(243, 236, 225, 0.120);\n  --dsw-alias-brand-primary: #d4a15c;\n  --dsw-alias-brand-primary-invert: #f3ece1;\n  --dsw-alias-brand-text: #f3ece1;\n  --dsw-alias-button-primary-fill: #d4a15c;\n  --dsw-alias-button-primary-hover: #e3b877;\n  --dsw-alias-button-primary-dimmed: rgba(212, 161, 92, 0.140);\n  --dsw-alias-button-info-fill: #d4a15c;\n  --dsw-alias-button-info-hover: #e3b877;\n  --dsw-alias-button-contrast-fill: #f3ece1;\n  --dsw-alias-button-elevated-fill: #1f1a15;\n  --dsw-alias-button-floating-fill: #1f1a15;\n  --dsw-alias-button-floating-hover: #2a231b;\n  --dsw-alias-button-ghost-active-fill: #2a231b;\n  --dsw-alias-button-ghost-active-hover: #2a231b;\n  --dsw-alias-button-ghost-active-border: #857763;\n  --dsw-alias-button-tool-bar-fill: rgba(243, 236, 225, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(243, 236, 225, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(243, 236, 225, 0.280);\n  --dsw-alias-label-primary: #f3ece1;\n  --dsw-alias-label-secondary: #b4a489;\n  --dsw-alias-label-tertiary: #857763;\n  --dsw-alias-label-caption: #857763;\n  --dsw-alias-label-dimmed: rgba(243, 236, 225, 0.450);\n  --dsw-alias-label-primary-bluish: #f3ece1;\n  --dsw-alias-label-primary-dimmed: #f3ece1;\n  --dsw-alias-label-primary-foreground: #241505;\n  --dsw-alias-label-primary-inverted: #241505;\n  --dsw-alias-interactive-bg-hover: rgba(243, 236, 225, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(243, 236, 225, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(212, 161, 92, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2a231b;\n  --dsw-alias-markdown-code-block: #1b1611;\n  --dsw-alias-markdown-code-block-banner: #241d16;\n  --dsw-alias-markdown-inline-code: #1b1611;\n  --dsw-alias-markdown-code-segment-selected: #241d16;\n  --dsw-alias-markdown-code-segment-unselected: #1b1611;\n  --dsw-alias-markdown-citation: #2a231b;\n  --dsw-alias-markdown-placeholder: #2a231b;\n  --dsw-alias-markdown-tag: #2a231b;\n  --dsw-alias-state-business-primary: #d4a15c;\n  --dsw-alias-state-business-tertiary: rgba(212, 161, 92, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(243, 236, 225, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(243, 236, 225, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(243, 236, 225, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(243, 236, 225, 0.220);\n  --dsw-alias-toast-bg: #f3ece1;\n  --dsw-alias-tooltip-bg: #f3ece1;\n  --dsw-specific-bubble: #1b1611;\n  --dsw-specific-bubble-highlight: rgba(212, 161, 92, 0.120);\n  --dsw-specific-input-major: #1f1a15;\n  --dsw-specific-login-input: #2a231b;\n  --dsw-specific-menu: #1f1a15;\n  --dsw-specific-selector: #2a231b;\n  --dsw-specific-sidebar-fill: #191511;\n  --dsw-specific-sidebar-nav-item-active: rgba(243, 236, 225, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(212, 161, 92, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(243, 236, 225, 0.050);\n  --dsw-specific-tip: #2a231b;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(23, 19, 16) 20.19%, rgba(23, 19, 16, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(42, 35, 27) 20.19%, rgba(42, 35, 27, 0) 100%);\n}\nbody[data-dsh-theme=\"paper\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"paper\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"amber","name":"Amber","nameZh":"琥珀","desc":"Golden honey light, warm and clear.","descZh":"蜂蜜般的金色，温暖透亮。","swatch":{"light":["#f8ead4","#fbf5e9","#b45309","#33260e"],"dark":["#171207","#201809","#f59e0b","#faf0d3"]},"css":"/* Amber (琥珀) — dsh-theme */\nbody[data-dsh-theme=\"amber\"]{\n  --dsw-alias-bg-base: #f8ead4;\n  --dsw-alias-bg-layer-1: #fbf5e9;\n  --dsw-alias-bg-layer-2: #fbf5e9;\n  --dsw-alias-bg-layer-3: #f0ddba;\n  --dsw-alias-bg-overlay: #f0ddba;\n  --dsw-alias-bg-module-platform: #f0ddba;\n  --dsw-alias-bg-multi-select: #f0ddba;\n  --dsw-alias-bg-skeleton: rgba(51, 38, 14, 0.060);\n  --dsw-alias-border-l1: rgba(51, 38, 14, 0.055);\n  --dsw-alias-border-l2: rgba(51,38,14,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(51,38,14,0.10);\n  --dsw-alias-border-l3: rgba(51, 38, 14, 0.160);\n  --dsw-alias-border-l4: rgba(51, 38, 14, 0.220);\n  --dsw-alias-border-inverted: rgba(51, 38, 14, 0.080);\n  --dsw-alias-border-inverted2: rgba(51, 38, 14, 0.080);\n  --dsw-alias-brand-primary: #b45309;\n  --dsw-alias-brand-primary-invert: #33260e;\n  --dsw-alias-brand-text: #33260e;\n  --dsw-alias-button-primary-fill: #b45309;\n  --dsw-alias-button-primary-hover: #92400e;\n  --dsw-alias-button-primary-dimmed: rgba(180, 83, 9, 0.140);\n  --dsw-alias-button-info-fill: #b45309;\n  --dsw-alias-button-info-hover: #92400e;\n  --dsw-alias-button-contrast-fill: #33260e;\n  --dsw-alias-button-elevated-fill: #fbf5e9;\n  --dsw-alias-button-floating-fill: #fbf5e9;\n  --dsw-alias-button-floating-hover: #f0ddba;\n  --dsw-alias-button-ghost-active-fill: #f0ddba;\n  --dsw-alias-button-ghost-active-hover: #f0ddba;\n  --dsw-alias-button-ghost-active-border: #9c8957;\n  --dsw-alias-button-tool-bar-fill: rgba(51, 38, 14, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(51, 38, 14, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(51, 38, 14, 0.280);\n  --dsw-alias-label-primary: #33260e;\n  --dsw-alias-label-secondary: #6f5a2c;\n  --dsw-alias-label-tertiary: #9c8957;\n  --dsw-alias-label-caption: #9c8957;\n  --dsw-alias-label-dimmed: rgba(51, 38, 14, 0.450);\n  --dsw-alias-label-primary-bluish: #33260e;\n  --dsw-alias-label-primary-dimmed: #33260e;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(51, 38, 14, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(51, 38, 14, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(180, 83, 9, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f0ddba;\n  --dsw-alias-markdown-code-block: #f4e8cd;\n  --dsw-alias-markdown-code-block-banner: #eedcb7;\n  --dsw-alias-markdown-inline-code: #f4e8cd;\n  --dsw-alias-markdown-code-segment-selected: #eedcb7;\n  --dsw-alias-markdown-code-segment-unselected: #f4e8cd;\n  --dsw-alias-markdown-citation: #f0ddba;\n  --dsw-alias-markdown-placeholder: #f0ddba;\n  --dsw-alias-markdown-tag: #f0ddba;\n  --dsw-alias-state-business-primary: #b45309;\n  --dsw-alias-state-business-tertiary: rgba(180, 83, 9, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(51, 38, 14, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(51, 38, 14, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(51, 38, 14, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(51, 38, 14, 0.220);\n  --dsw-alias-toast-bg: #33260e;\n  --dsw-alias-tooltip-bg: #33260e;\n  --dsw-specific-bubble: #f4e8cd;\n  --dsw-specific-bubble-highlight: rgba(180, 83, 9, 0.120);\n  --dsw-specific-input-major: #fbf5e9;\n  --dsw-specific-login-input: #f0ddba;\n  --dsw-specific-menu: #fbf5e9;\n  --dsw-specific-selector: #f0ddba;\n  --dsw-specific-sidebar-fill: #f5e7cf;\n  --dsw-specific-sidebar-nav-item-active: rgba(51, 38, 14, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(180, 83, 9, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(51, 38, 14, 0.050);\n  --dsw-specific-tip: #f0ddba;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(248, 234, 212) 20.19%, rgba(248, 234, 212, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(240, 221, 186) 20.19%, rgba(240, 221, 186, 0) 100%);\n}\nbody[data-dsh-theme=\"amber\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #171207;\n  --dsw-alias-bg-layer-1: #201809;\n  --dsw-alias-bg-layer-2: #201809;\n  --dsw-alias-bg-layer-3: #2c210e;\n  --dsw-alias-bg-overlay: #2c210e;\n  --dsw-alias-bg-module-platform: #2c210e;\n  --dsw-alias-bg-multi-select: #2c210e;\n  --dsw-alias-bg-skeleton: rgba(250, 240, 211, 0.080);\n  --dsw-alias-border-l1: rgba(250, 240, 211, 0.055);\n  --dsw-alias-border-l2: rgba(250,240,211,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(250,240,211,0.10);\n  --dsw-alias-border-l3: rgba(250, 240, 211, 0.160);\n  --dsw-alias-border-l4: rgba(250, 240, 211, 0.220);\n  --dsw-alias-border-inverted: rgba(250, 240, 211, 0.120);\n  --dsw-alias-border-inverted2: rgba(250, 240, 211, 0.120);\n  --dsw-alias-brand-primary: #f59e0b;\n  --dsw-alias-brand-primary-invert: #faf0d3;\n  --dsw-alias-brand-text: #faf0d3;\n  --dsw-alias-button-primary-fill: #f59e0b;\n  --dsw-alias-button-primary-hover: #fbbf24;\n  --dsw-alias-button-primary-dimmed: rgba(245, 158, 11, 0.140);\n  --dsw-alias-button-info-fill: #f59e0b;\n  --dsw-alias-button-info-hover: #fbbf24;\n  --dsw-alias-button-contrast-fill: #faf0d3;\n  --dsw-alias-button-elevated-fill: #201809;\n  --dsw-alias-button-floating-fill: #201809;\n  --dsw-alias-button-floating-hover: #2c210e;\n  --dsw-alias-button-ghost-active-fill: #2c210e;\n  --dsw-alias-button-ghost-active-hover: #2c210e;\n  --dsw-alias-button-ghost-active-border: #8f7a45;\n  --dsw-alias-button-tool-bar-fill: rgba(250, 240, 211, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(250, 240, 211, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(250, 240, 211, 0.280);\n  --dsw-alias-label-primary: #faf0d3;\n  --dsw-alias-label-secondary: #c4a968;\n  --dsw-alias-label-tertiary: #8f7a45;\n  --dsw-alias-label-caption: #8f7a45;\n  --dsw-alias-label-dimmed: rgba(250, 240, 211, 0.450);\n  --dsw-alias-label-primary-bluish: #faf0d3;\n  --dsw-alias-label-primary-dimmed: #faf0d3;\n  --dsw-alias-label-primary-foreground: #221301;\n  --dsw-alias-label-primary-inverted: #221301;\n  --dsw-alias-interactive-bg-hover: rgba(250, 240, 211, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(250, 240, 211, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(245, 158, 11, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2c210e;\n  --dsw-alias-markdown-code-block: #1c1508;\n  --dsw-alias-markdown-code-block-banner: #251b0b;\n  --dsw-alias-markdown-inline-code: #1c1508;\n  --dsw-alias-markdown-code-segment-selected: #251b0b;\n  --dsw-alias-markdown-code-segment-unselected: #1c1508;\n  --dsw-alias-markdown-citation: #2c210e;\n  --dsw-alias-markdown-placeholder: #2c210e;\n  --dsw-alias-markdown-tag: #2c210e;\n  --dsw-alias-state-business-primary: #f59e0b;\n  --dsw-alias-state-business-tertiary: rgba(245, 158, 11, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(250, 240, 211, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(250, 240, 211, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(250, 240, 211, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(250, 240, 211, 0.220);\n  --dsw-alias-toast-bg: #faf0d3;\n  --dsw-alias-tooltip-bg: #faf0d3;\n  --dsw-specific-bubble: #1c1508;\n  --dsw-specific-bubble-highlight: rgba(245, 158, 11, 0.120);\n  --dsw-specific-input-major: #201809;\n  --dsw-specific-login-input: #2c210e;\n  --dsw-specific-menu: #201809;\n  --dsw-specific-selector: #2c210e;\n  --dsw-specific-sidebar-fill: #191306;\n  --dsw-specific-sidebar-nav-item-active: rgba(250, 240, 211, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(245, 158, 11, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(250, 240, 211, 0.050);\n  --dsw-specific-tip: #2c210e;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(23, 18, 7) 20.19%, rgba(23, 18, 7, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(44, 33, 14) 20.19%, rgba(44, 33, 14, 0) 100%);\n}\nbody[data-dsh-theme=\"amber\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"amber\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"mint","name":"Mint","nameZh":"薄荷","desc":"Fresh green-teal, crisp and cool.","descZh":"清新的青绿，脆爽清凉。","swatch":{"light":["#d3ece2","#eef8f5","#059669","#0e2b1d"],"dark":["#0a1611","#10221a","#34d399","#def3e8"]},"css":"/* Mint (薄荷) — dsh-theme */\nbody[data-dsh-theme=\"mint\"]{\n  --dsw-alias-bg-base: #d3ece2;\n  --dsw-alias-bg-layer-1: #eef8f5;\n  --dsw-alias-bg-layer-2: #eef8f5;\n  --dsw-alias-bg-layer-3: #c0e4d4;\n  --dsw-alias-bg-overlay: #c0e4d4;\n  --dsw-alias-bg-module-platform: #c0e4d4;\n  --dsw-alias-bg-multi-select: #c0e4d4;\n  --dsw-alias-bg-skeleton: rgba(14, 43, 29, 0.060);\n  --dsw-alias-border-l1: rgba(14, 43, 29, 0.055);\n  --dsw-alias-border-l2: rgba(14,43,29,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(14,43,29,0.10);\n  --dsw-alias-border-l3: rgba(14, 43, 29, 0.160);\n  --dsw-alias-border-l4: rgba(14, 43, 29, 0.220);\n  --dsw-alias-border-inverted: rgba(14, 43, 29, 0.080);\n  --dsw-alias-border-inverted2: rgba(14, 43, 29, 0.080);\n  --dsw-alias-brand-primary: #059669;\n  --dsw-alias-brand-primary-invert: #0e2b1d;\n  --dsw-alias-brand-text: #0e2b1d;\n  --dsw-alias-button-primary-fill: #059669;\n  --dsw-alias-button-primary-hover: #047857;\n  --dsw-alias-button-primary-dimmed: rgba(5, 150, 105, 0.140);\n  --dsw-alias-button-info-fill: #059669;\n  --dsw-alias-button-info-hover: #047857;\n  --dsw-alias-button-contrast-fill: #0e2b1d;\n  --dsw-alias-button-elevated-fill: #eef8f5;\n  --dsw-alias-button-floating-fill: #eef8f5;\n  --dsw-alias-button-floating-hover: #c0e4d4;\n  --dsw-alias-button-ghost-active-fill: #c0e4d4;\n  --dsw-alias-button-ghost-active-hover: #c0e4d4;\n  --dsw-alias-button-ghost-active-border: #6f9080;\n  --dsw-alias-button-tool-bar-fill: rgba(14, 43, 29, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(14, 43, 29, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(14, 43, 29, 0.280);\n  --dsw-alias-label-primary: #0e2b1d;\n  --dsw-alias-label-secondary: #3f6652;\n  --dsw-alias-label-tertiary: #6f9080;\n  --dsw-alias-label-caption: #6f9080;\n  --dsw-alias-label-dimmed: rgba(14, 43, 29, 0.450);\n  --dsw-alias-label-primary-bluish: #0e2b1d;\n  --dsw-alias-label-primary-dimmed: #0e2b1d;\n  --dsw-alias-label-primary-foreground: #00150d;\n  --dsw-alias-label-primary-inverted: #00150d;\n  --dsw-alias-interactive-bg-hover: rgba(14, 43, 29, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(14, 43, 29, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(5, 150, 105, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #c0e4d4;\n  --dsw-alias-markdown-code-block: #d2ebdf;\n  --dsw-alias-markdown-code-block-banner: #c1e3d2;\n  --dsw-alias-markdown-inline-code: #d2ebdf;\n  --dsw-alias-markdown-code-segment-selected: #c1e3d2;\n  --dsw-alias-markdown-code-segment-unselected: #d2ebdf;\n  --dsw-alias-markdown-citation: #c0e4d4;\n  --dsw-alias-markdown-placeholder: #c0e4d4;\n  --dsw-alias-markdown-tag: #c0e4d4;\n  --dsw-alias-state-business-primary: #059669;\n  --dsw-alias-state-business-tertiary: rgba(5, 150, 105, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #16a34a;\n  --dsw-alias-state-success-secondary: #16a34a;\n  --dsw-alias-state-success-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(14, 43, 29, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(14, 43, 29, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(14, 43, 29, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(14, 43, 29, 0.220);\n  --dsw-alias-toast-bg: #0e2b1d;\n  --dsw-alias-tooltip-bg: #0e2b1d;\n  --dsw-specific-bubble: #d2ebdf;\n  --dsw-specific-bubble-highlight: rgba(5, 150, 105, 0.120);\n  --dsw-specific-input-major: #eef8f5;\n  --dsw-specific-login-input: #c0e4d4;\n  --dsw-specific-menu: #eef8f5;\n  --dsw-specific-selector: #c0e4d4;\n  --dsw-specific-sidebar-fill: #d3ebe0;\n  --dsw-specific-sidebar-nav-item-active: rgba(14, 43, 29, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(5, 150, 105, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(14, 43, 29, 0.050);\n  --dsw-specific-tip: #c0e4d4;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(211, 236, 226) 20.19%, rgba(211, 236, 226, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(192, 228, 212) 20.19%, rgba(192, 228, 212, 0) 100%);\n}\nbody[data-dsh-theme=\"mint\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0a1611;\n  --dsw-alias-bg-layer-1: #10221a;\n  --dsw-alias-bg-layer-2: #10221a;\n  --dsw-alias-bg-layer-3: #172e23;\n  --dsw-alias-bg-overlay: #172e23;\n  --dsw-alias-bg-module-platform: #172e23;\n  --dsw-alias-bg-multi-select: #172e23;\n  --dsw-alias-bg-skeleton: rgba(222, 243, 232, 0.080);\n  --dsw-alias-border-l1: rgba(222, 243, 232, 0.055);\n  --dsw-alias-border-l2: rgba(222,243,232,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(222,243,232,0.10);\n  --dsw-alias-border-l3: rgba(222, 243, 232, 0.160);\n  --dsw-alias-border-l4: rgba(222, 243, 232, 0.220);\n  --dsw-alias-border-inverted: rgba(222, 243, 232, 0.120);\n  --dsw-alias-border-inverted2: rgba(222, 243, 232, 0.120);\n  --dsw-alias-brand-primary: #34d399;\n  --dsw-alias-brand-primary-invert: #def3e8;\n  --dsw-alias-brand-text: #def3e8;\n  --dsw-alias-button-primary-fill: #34d399;\n  --dsw-alias-button-primary-hover: #6ee7b7;\n  --dsw-alias-button-primary-dimmed: rgba(52, 211, 153, 0.140);\n  --dsw-alias-button-info-fill: #34d399;\n  --dsw-alias-button-info-hover: #6ee7b7;\n  --dsw-alias-button-contrast-fill: #def3e8;\n  --dsw-alias-button-elevated-fill: #10221a;\n  --dsw-alias-button-floating-fill: #10221a;\n  --dsw-alias-button-floating-hover: #172e23;\n  --dsw-alias-button-ghost-active-fill: #172e23;\n  --dsw-alias-button-ghost-active-hover: #172e23;\n  --dsw-alias-button-ghost-active-border: #5f8a75;\n  --dsw-alias-button-tool-bar-fill: rgba(222, 243, 232, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(222, 243, 232, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(222, 243, 232, 0.280);\n  --dsw-alias-label-primary: #def3e8;\n  --dsw-alias-label-secondary: #8fc0a8;\n  --dsw-alias-label-tertiary: #5f8a75;\n  --dsw-alias-label-caption: #5f8a75;\n  --dsw-alias-label-dimmed: rgba(222, 243, 232, 0.450);\n  --dsw-alias-label-primary-bluish: #def3e8;\n  --dsw-alias-label-primary-dimmed: #def3e8;\n  --dsw-alias-label-primary-foreground: #00150d;\n  --dsw-alias-label-primary-inverted: #00150d;\n  --dsw-alias-interactive-bg-hover: rgba(222, 243, 232, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(222, 243, 232, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(52, 211, 153, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #172e23;\n  --dsw-alias-markdown-code-block: #0d1d16;\n  --dsw-alias-markdown-code-block-banner: #13271d;\n  --dsw-alias-markdown-inline-code: #0d1d16;\n  --dsw-alias-markdown-code-segment-selected: #13271d;\n  --dsw-alias-markdown-code-segment-unselected: #0d1d16;\n  --dsw-alias-markdown-citation: #172e23;\n  --dsw-alias-markdown-placeholder: #172e23;\n  --dsw-alias-markdown-tag: #172e23;\n  --dsw-alias-state-business-primary: #34d399;\n  --dsw-alias-state-business-tertiary: rgba(52, 211, 153, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(222, 243, 232, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(222, 243, 232, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(222, 243, 232, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(222, 243, 232, 0.220);\n  --dsw-alias-toast-bg: #def3e8;\n  --dsw-alias-tooltip-bg: #def3e8;\n  --dsw-specific-bubble: #0d1d16;\n  --dsw-specific-bubble-highlight: rgba(52, 211, 153, 0.120);\n  --dsw-specific-input-major: #10221a;\n  --dsw-specific-login-input: #172e23;\n  --dsw-specific-menu: #10221a;\n  --dsw-specific-selector: #172e23;\n  --dsw-specific-sidebar-fill: #0c1913;\n  --dsw-specific-sidebar-nav-item-active: rgba(222, 243, 232, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(52, 211, 153, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(222, 243, 232, 0.050);\n  --dsw-specific-tip: #172e23;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(10, 22, 17) 20.19%, rgba(10, 22, 17, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(23, 46, 35) 20.19%, rgba(23, 46, 35, 0) 100%);\n}\nbody[data-dsh-theme=\"mint\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"mint\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"violet","name":"Violet","nameZh":"紫罗兰","desc":"Soft lavender-purple with a regal accent.","descZh":"柔和的紫，带着一丝庄重。","swatch":{"light":["#efe7fc","#fbf8fe","#7c3aed","#241538"],"dark":["#120b1e","#191031","#a78bfa","#efe8ff"]},"css":"/* Violet (紫罗兰) — dsh-theme */\nbody[data-dsh-theme=\"violet\"]{\n  --dsw-alias-bg-base: #efe7fc;\n  --dsw-alias-bg-layer-1: #fbf8fe;\n  --dsw-alias-bg-layer-2: #fbf8fe;\n  --dsw-alias-bg-layer-3: #e3d8f7;\n  --dsw-alias-bg-overlay: #e3d8f7;\n  --dsw-alias-bg-module-platform: #e3d8f7;\n  --dsw-alias-bg-multi-select: #e3d8f7;\n  --dsw-alias-bg-skeleton: rgba(36, 21, 56, 0.060);\n  --dsw-alias-border-l1: rgba(36, 21, 56, 0.055);\n  --dsw-alias-border-l2: rgba(36,21,56,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(36,21,56,0.10);\n  --dsw-alias-border-l3: rgba(36, 21, 56, 0.160);\n  --dsw-alias-border-l4: rgba(36, 21, 56, 0.220);\n  --dsw-alias-border-inverted: rgba(36, 21, 56, 0.080);\n  --dsw-alias-border-inverted2: rgba(36, 21, 56, 0.080);\n  --dsw-alias-brand-primary: #7c3aed;\n  --dsw-alias-brand-primary-invert: #241538;\n  --dsw-alias-brand-text: #241538;\n  --dsw-alias-button-primary-fill: #7c3aed;\n  --dsw-alias-button-primary-hover: #6d28d9;\n  --dsw-alias-button-primary-dimmed: rgba(124, 58, 237, 0.140);\n  --dsw-alias-button-info-fill: #7c3aed;\n  --dsw-alias-button-info-hover: #6d28d9;\n  --dsw-alias-button-contrast-fill: #241538;\n  --dsw-alias-button-elevated-fill: #fbf8fe;\n  --dsw-alias-button-floating-fill: #fbf8fe;\n  --dsw-alias-button-floating-hover: #e3d8f7;\n  --dsw-alias-button-ghost-active-fill: #e3d8f7;\n  --dsw-alias-button-ghost-active-hover: #e3d8f7;\n  --dsw-alias-button-ghost-active-border: #8570a8;\n  --dsw-alias-button-tool-bar-fill: rgba(36, 21, 56, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(36, 21, 56, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(36, 21, 56, 0.280);\n  --dsw-alias-label-primary: #241538;\n  --dsw-alias-label-secondary: #5c4680;\n  --dsw-alias-label-tertiary: #8570a8;\n  --dsw-alias-label-caption: #8570a8;\n  --dsw-alias-label-dimmed: rgba(36, 21, 56, 0.450);\n  --dsw-alias-label-primary-bluish: #241538;\n  --dsw-alias-label-primary-dimmed: #241538;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(36, 21, 56, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(36, 21, 56, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(124, 58, 237, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e3d8f7;\n  --dsw-alias-markdown-code-block: #e8e0f8;\n  --dsw-alias-markdown-code-block-banner: #ded1f4;\n  --dsw-alias-markdown-inline-code: #e8e0f8;\n  --dsw-alias-markdown-code-segment-selected: #ded1f4;\n  --dsw-alias-markdown-code-segment-unselected: #e8e0f8;\n  --dsw-alias-markdown-citation: #e3d8f7;\n  --dsw-alias-markdown-placeholder: #e3d8f7;\n  --dsw-alias-markdown-tag: #e3d8f7;\n  --dsw-alias-state-business-primary: #7c3aed;\n  --dsw-alias-state-business-tertiary: rgba(124, 58, 237, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(36, 21, 56, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(36, 21, 56, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(36, 21, 56, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(36, 21, 56, 0.220);\n  --dsw-alias-toast-bg: #241538;\n  --dsw-alias-tooltip-bg: #241538;\n  --dsw-specific-bubble: #e8e0f8;\n  --dsw-specific-bubble-highlight: rgba(124, 58, 237, 0.120);\n  --dsw-specific-input-major: #fbf8fe;\n  --dsw-specific-login-input: #e3d8f7;\n  --dsw-specific-menu: #fbf8fe;\n  --dsw-specific-selector: #e3d8f7;\n  --dsw-specific-sidebar-fill: #e9e1f9;\n  --dsw-specific-sidebar-nav-item-active: rgba(36, 21, 56, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(124, 58, 237, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(36, 21, 56, 0.050);\n  --dsw-specific-tip: #e3d8f7;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(239, 231, 252) 20.19%, rgba(239, 231, 252, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(227, 216, 247) 20.19%, rgba(227, 216, 247, 0) 100%);\n}\nbody[data-dsh-theme=\"violet\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #120b1e;\n  --dsw-alias-bg-layer-1: #191031;\n  --dsw-alias-bg-layer-2: #191031;\n  --dsw-alias-bg-layer-3: #231540;\n  --dsw-alias-bg-overlay: #231540;\n  --dsw-alias-bg-module-platform: #231540;\n  --dsw-alias-bg-multi-select: #231540;\n  --dsw-alias-bg-skeleton: rgba(239, 232, 255, 0.080);\n  --dsw-alias-border-l1: rgba(239, 232, 255, 0.055);\n  --dsw-alias-border-l2: rgba(239,232,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(239,232,255,0.10);\n  --dsw-alias-border-l3: rgba(239, 232, 255, 0.160);\n  --dsw-alias-border-l4: rgba(239, 232, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(239, 232, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(239, 232, 255, 0.120);\n  --dsw-alias-brand-primary: #a78bfa;\n  --dsw-alias-brand-primary-invert: #efe8ff;\n  --dsw-alias-brand-text: #efe8ff;\n  --dsw-alias-button-primary-fill: #a78bfa;\n  --dsw-alias-button-primary-hover: #c4b5fd;\n  --dsw-alias-button-primary-dimmed: rgba(167, 139, 250, 0.140);\n  --dsw-alias-button-info-fill: #a78bfa;\n  --dsw-alias-button-info-hover: #c4b5fd;\n  --dsw-alias-button-contrast-fill: #efe8ff;\n  --dsw-alias-button-elevated-fill: #191031;\n  --dsw-alias-button-floating-fill: #191031;\n  --dsw-alias-button-floating-hover: #231540;\n  --dsw-alias-button-ghost-active-fill: #231540;\n  --dsw-alias-button-ghost-active-hover: #231540;\n  --dsw-alias-button-ghost-active-border: #7e6ca8;\n  --dsw-alias-button-tool-bar-fill: rgba(239, 232, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(239, 232, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(239, 232, 255, 0.280);\n  --dsw-alias-label-primary: #efe8ff;\n  --dsw-alias-label-secondary: #b3a2e0;\n  --dsw-alias-label-tertiary: #7e6ca8;\n  --dsw-alias-label-caption: #7e6ca8;\n  --dsw-alias-label-dimmed: rgba(239, 232, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #efe8ff;\n  --dsw-alias-label-primary-dimmed: #efe8ff;\n  --dsw-alias-label-primary-foreground: #1d0f38;\n  --dsw-alias-label-primary-inverted: #1d0f38;\n  --dsw-alias-interactive-bg-hover: rgba(239, 232, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(239, 232, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(167, 139, 250, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #231540;\n  --dsw-alias-markdown-code-block: #150d26;\n  --dsw-alias-markdown-code-block-banner: #1c1233;\n  --dsw-alias-markdown-inline-code: #150d26;\n  --dsw-alias-markdown-code-segment-selected: #1c1233;\n  --dsw-alias-markdown-code-segment-unselected: #150d26;\n  --dsw-alias-markdown-citation: #231540;\n  --dsw-alias-markdown-placeholder: #231540;\n  --dsw-alias-markdown-tag: #231540;\n  --dsw-alias-state-business-primary: #a78bfa;\n  --dsw-alias-state-business-tertiary: rgba(167, 139, 250, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(239, 232, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(239, 232, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(239, 232, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(239, 232, 255, 0.220);\n  --dsw-alias-toast-bg: #efe8ff;\n  --dsw-alias-tooltip-bg: #efe8ff;\n  --dsw-specific-bubble: #150d26;\n  --dsw-specific-bubble-highlight: rgba(167, 139, 250, 0.120);\n  --dsw-specific-input-major: #191031;\n  --dsw-specific-login-input: #231540;\n  --dsw-specific-menu: #191031;\n  --dsw-specific-selector: #231540;\n  --dsw-specific-sidebar-fill: #140c22;\n  --dsw-specific-sidebar-nav-item-active: rgba(239, 232, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(167, 139, 250, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(239, 232, 255, 0.050);\n  --dsw-specific-tip: #231540;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(18, 11, 30) 20.19%, rgba(18, 11, 30, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(35, 21, 64) 20.19%, rgba(35, 21, 64, 0) 100%);\n}\nbody[data-dsh-theme=\"violet\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"violet\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"cyber","name":"Cyber","nameZh":"赛博","desc":"Neon cyan on near-black circuit board.","descZh":"近黑底上的霓虹青，赛博电路板。","swatch":{"light":["#d0e9f2","#edf7f9","#0891b2","#0c2438"],"dark":["#070b14","#0d1422","#22d3ee","#dff2ff"]},"css":"/* Cyber (赛博) — dsh-theme */\nbody[data-dsh-theme=\"cyber\"]{\n  --dsw-alias-bg-base: #d0e9f2;\n  --dsw-alias-bg-layer-1: #edf7f9;\n  --dsw-alias-bg-layer-2: #edf7f9;\n  --dsw-alias-bg-layer-3: #bde0ec;\n  --dsw-alias-bg-overlay: #bde0ec;\n  --dsw-alias-bg-module-platform: #bde0ec;\n  --dsw-alias-bg-multi-select: #bde0ec;\n  --dsw-alias-bg-skeleton: rgba(12, 36, 56, 0.060);\n  --dsw-alias-border-l1: rgba(12, 36, 56, 0.055);\n  --dsw-alias-border-l2: rgba(12,36,56,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(12,36,56,0.10);\n  --dsw-alias-border-l3: rgba(12, 36, 56, 0.160);\n  --dsw-alias-border-l4: rgba(12, 36, 56, 0.220);\n  --dsw-alias-border-inverted: rgba(12, 36, 56, 0.080);\n  --dsw-alias-border-inverted2: rgba(12, 36, 56, 0.080);\n  --dsw-alias-brand-primary: #0891b2;\n  --dsw-alias-brand-primary-invert: #0c2438;\n  --dsw-alias-brand-text: #0c2438;\n  --dsw-alias-button-primary-fill: #0891b2;\n  --dsw-alias-button-primary-hover: #0e7490;\n  --dsw-alias-button-primary-dimmed: rgba(8, 145, 178, 0.140);\n  --dsw-alias-button-info-fill: #0891b2;\n  --dsw-alias-button-info-hover: #0e7490;\n  --dsw-alias-button-contrast-fill: #0c2438;\n  --dsw-alias-button-elevated-fill: #edf7f9;\n  --dsw-alias-button-floating-fill: #edf7f9;\n  --dsw-alias-button-floating-hover: #bde0ec;\n  --dsw-alias-button-ghost-active-fill: #bde0ec;\n  --dsw-alias-button-ghost-active-hover: #bde0ec;\n  --dsw-alias-button-ghost-active-border: #6d8aa5;\n  --dsw-alias-button-tool-bar-fill: rgba(12, 36, 56, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(12, 36, 56, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(12, 36, 56, 0.280);\n  --dsw-alias-label-primary: #0c2438;\n  --dsw-alias-label-secondary: #3d5f7d;\n  --dsw-alias-label-tertiary: #6d8aa5;\n  --dsw-alias-label-caption: #6d8aa5;\n  --dsw-alias-label-dimmed: rgba(12, 36, 56, 0.450);\n  --dsw-alias-label-primary-bluish: #0c2438;\n  --dsw-alias-label-primary-dimmed: #0c2438;\n  --dsw-alias-label-primary-foreground: #001722;\n  --dsw-alias-label-primary-inverted: #001722;\n  --dsw-alias-interactive-bg-hover: rgba(12, 36, 56, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(12, 36, 56, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(8, 145, 178, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #bde0ec;\n  --dsw-alias-markdown-code-block: #cfe9f3;\n  --dsw-alias-markdown-code-block-banner: #bee0ed;\n  --dsw-alias-markdown-inline-code: #cfe9f3;\n  --dsw-alias-markdown-code-segment-selected: #bee0ed;\n  --dsw-alias-markdown-code-segment-unselected: #cfe9f3;\n  --dsw-alias-markdown-citation: #bde0ec;\n  --dsw-alias-markdown-placeholder: #bde0ec;\n  --dsw-alias-markdown-tag: #bde0ec;\n  --dsw-alias-state-business-primary: #0891b2;\n  --dsw-alias-state-business-tertiary: rgba(8, 145, 178, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(12, 36, 56, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(12, 36, 56, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(12, 36, 56, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(12, 36, 56, 0.220);\n  --dsw-alias-toast-bg: #0c2438;\n  --dsw-alias-tooltip-bg: #0c2438;\n  --dsw-specific-bubble: #cfe9f3;\n  --dsw-specific-bubble-highlight: rgba(8, 145, 178, 0.120);\n  --dsw-specific-input-major: #edf7f9;\n  --dsw-specific-login-input: #bde0ec;\n  --dsw-specific-menu: #edf7f9;\n  --dsw-specific-selector: #bde0ec;\n  --dsw-specific-sidebar-fill: #d0e8f3;\n  --dsw-specific-sidebar-nav-item-active: rgba(12, 36, 56, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(8, 145, 178, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(12, 36, 56, 0.050);\n  --dsw-specific-tip: #bde0ec;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(208, 233, 242) 20.19%, rgba(208, 233, 242, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(189, 224, 236) 20.19%, rgba(189, 224, 236, 0) 100%);\n}\nbody[data-dsh-theme=\"cyber\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #070b14;\n  --dsw-alias-bg-layer-1: #0d1422;\n  --dsw-alias-bg-layer-2: #0d1422;\n  --dsw-alias-bg-layer-3: #162032;\n  --dsw-alias-bg-overlay: #162032;\n  --dsw-alias-bg-module-platform: #162032;\n  --dsw-alias-bg-multi-select: #162032;\n  --dsw-alias-bg-skeleton: rgba(223, 242, 255, 0.080);\n  --dsw-alias-border-l1: rgba(223, 242, 255, 0.055);\n  --dsw-alias-border-l2: rgba(223,242,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(223,242,255,0.10);\n  --dsw-alias-border-l3: rgba(223, 242, 255, 0.160);\n  --dsw-alias-border-l4: rgba(223, 242, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(223, 242, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(223, 242, 255, 0.120);\n  --dsw-alias-brand-primary: #22d3ee;\n  --dsw-alias-brand-primary-invert: #dff2ff;\n  --dsw-alias-brand-text: #dff2ff;\n  --dsw-alias-button-primary-fill: #22d3ee;\n  --dsw-alias-button-primary-hover: #67e8f9;\n  --dsw-alias-button-primary-dimmed: rgba(34, 211, 238, 0.140);\n  --dsw-alias-button-info-fill: #22d3ee;\n  --dsw-alias-button-info-hover: #67e8f9;\n  --dsw-alias-button-contrast-fill: #dff2ff;\n  --dsw-alias-button-elevated-fill: #0d1422;\n  --dsw-alias-button-floating-fill: #0d1422;\n  --dsw-alias-button-floating-hover: #162032;\n  --dsw-alias-button-ghost-active-fill: #162032;\n  --dsw-alias-button-ghost-active-hover: #162032;\n  --dsw-alias-button-ghost-active-border: #64849f;\n  --dsw-alias-button-tool-bar-fill: rgba(223, 242, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(223, 242, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(223, 242, 255, 0.280);\n  --dsw-alias-label-primary: #dff2ff;\n  --dsw-alias-label-secondary: #8fb4d8;\n  --dsw-alias-label-tertiary: #64849f;\n  --dsw-alias-label-caption: #64849f;\n  --dsw-alias-label-dimmed: rgba(223, 242, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #dff2ff;\n  --dsw-alias-label-primary-dimmed: #dff2ff;\n  --dsw-alias-label-primary-foreground: #001722;\n  --dsw-alias-label-primary-inverted: #001722;\n  --dsw-alias-interactive-bg-hover: rgba(223, 242, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(223, 242, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(34, 211, 238, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #162032;\n  --dsw-alias-markdown-code-block: #0a111d;\n  --dsw-alias-markdown-code-block-banner: #101a2a;\n  --dsw-alias-markdown-inline-code: #0a111d;\n  --dsw-alias-markdown-code-segment-selected: #101a2a;\n  --dsw-alias-markdown-code-segment-unselected: #0a111d;\n  --dsw-alias-markdown-citation: #162032;\n  --dsw-alias-markdown-placeholder: #162032;\n  --dsw-alias-markdown-tag: #162032;\n  --dsw-alias-state-business-primary: #22d3ee;\n  --dsw-alias-state-business-tertiary: rgba(34, 211, 238, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(223, 242, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(223, 242, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(223, 242, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(223, 242, 255, 0.220);\n  --dsw-alias-toast-bg: #dff2ff;\n  --dsw-alias-tooltip-bg: #dff2ff;\n  --dsw-specific-bubble: #0a111d;\n  --dsw-specific-bubble-highlight: rgba(34, 211, 238, 0.120);\n  --dsw-specific-input-major: #0d1422;\n  --dsw-specific-login-input: #162032;\n  --dsw-specific-menu: #0d1422;\n  --dsw-specific-selector: #162032;\n  --dsw-specific-sidebar-fill: #090e19;\n  --dsw-specific-sidebar-nav-item-active: rgba(223, 242, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(34, 211, 238, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(223, 242, 255, 0.050);\n  --dsw-specific-tip: #162032;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(7, 11, 20) 20.19%, rgba(7, 11, 20, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(22, 32, 50) 20.19%, rgba(22, 32, 50, 0) 100%);\n}\nbody[data-dsh-theme=\"cyber\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"cyber\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"retro","name":"Retro","nameZh":"复古","desc":"Sepia cream with rusty terracotta.","descZh":"旧照片般的米褐与陶土红。","swatch":{"light":["#f2decb","#f9ede0","#c2410c","#3a2a17"],"dark":["#1a1309","#231a0e","#fb923c","#f5ead5"]},"css":"/* Retro (复古) — dsh-theme */\nbody[data-dsh-theme=\"retro\"]{\n  --dsw-alias-bg-base: #f2decb;\n  --dsw-alias-bg-layer-1: #f9ede0;\n  --dsw-alias-bg-layer-2: #f9ede0;\n  --dsw-alias-bg-layer-3: #e9ceb3;\n  --dsw-alias-bg-overlay: #e9ceb3;\n  --dsw-alias-bg-module-platform: #e9ceb3;\n  --dsw-alias-bg-multi-select: #e9ceb3;\n  --dsw-alias-bg-skeleton: rgba(58, 42, 23, 0.060);\n  --dsw-alias-border-l1: rgba(58, 42, 23, 0.066);\n  --dsw-alias-border-l2: rgba(58,42,23,0.12);\n  --dsw-alias-border-l2-darkmode-thin: rgba(58,42,23,0.12);\n  --dsw-alias-border-l3: rgba(58, 42, 23, 0.192);\n  --dsw-alias-border-l4: rgba(58, 42, 23, 0.264);\n  --dsw-alias-border-inverted: rgba(58, 42, 23, 0.080);\n  --dsw-alias-border-inverted2: rgba(58, 42, 23, 0.080);\n  --dsw-alias-brand-primary: #c2410c;\n  --dsw-alias-brand-primary-invert: #3a2a17;\n  --dsw-alias-brand-text: #3a2a17;\n  --dsw-alias-button-primary-fill: #c2410c;\n  --dsw-alias-button-primary-hover: #9a3412;\n  --dsw-alias-button-primary-dimmed: rgba(194, 65, 12, 0.140);\n  --dsw-alias-button-info-fill: #c2410c;\n  --dsw-alias-button-info-hover: #9a3412;\n  --dsw-alias-button-contrast-fill: #3a2a17;\n  --dsw-alias-button-elevated-fill: #f9ede0;\n  --dsw-alias-button-floating-fill: #f9ede0;\n  --dsw-alias-button-floating-hover: #e9ceb3;\n  --dsw-alias-button-ghost-active-fill: #e9ceb3;\n  --dsw-alias-button-ghost-active-hover: #e9ceb3;\n  --dsw-alias-button-ghost-active-border: #a48e6a;\n  --dsw-alias-button-tool-bar-fill: rgba(58, 42, 23, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(58, 42, 23, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(58, 42, 23, 0.280);\n  --dsw-alias-label-primary: #3a2a17;\n  --dsw-alias-label-secondary: #7a6140;\n  --dsw-alias-label-tertiary: #a48e6a;\n  --dsw-alias-label-caption: #a48e6a;\n  --dsw-alias-label-dimmed: rgba(58, 42, 23, 0.450);\n  --dsw-alias-label-primary-bluish: #3a2a17;\n  --dsw-alias-label-primary-dimmed: #3a2a17;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(58, 42, 23, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(58, 42, 23, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(194, 65, 12, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e9ceb3;\n  --dsw-alias-markdown-code-block: #eeddc7;\n  --dsw-alias-markdown-code-block-banner: #e6ceb0;\n  --dsw-alias-markdown-inline-code: #eeddc7;\n  --dsw-alias-markdown-code-segment-selected: #e6ceb0;\n  --dsw-alias-markdown-code-segment-unselected: #eeddc7;\n  --dsw-alias-markdown-citation: #e9ceb3;\n  --dsw-alias-markdown-placeholder: #e9ceb3;\n  --dsw-alias-markdown-tag: #e9ceb3;\n  --dsw-alias-state-business-primary: #c2410c;\n  --dsw-alias-state-business-tertiary: rgba(194, 65, 12, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(58, 42, 23, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(58, 42, 23, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(58, 42, 23, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(58, 42, 23, 0.220);\n  --dsw-alias-toast-bg: #3a2a17;\n  --dsw-alias-tooltip-bg: #3a2a17;\n  --dsw-specific-bubble: #eeddc7;\n  --dsw-specific-bubble-highlight: rgba(194, 65, 12, 0.120);\n  --dsw-specific-input-major: #f9ede0;\n  --dsw-specific-login-input: #e9ceb3;\n  --dsw-specific-menu: #f9ede0;\n  --dsw-specific-selector: #e9ceb3;\n  --dsw-specific-sidebar-fill: #eeddc8;\n  --dsw-specific-sidebar-nav-item-active: rgba(58, 42, 23, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(194, 65, 12, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(58, 42, 23, 0.050);\n  --dsw-specific-tip: #e9ceb3;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(242, 222, 203) 20.19%, rgba(242, 222, 203, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(233, 206, 179) 20.19%, rgba(233, 206, 179, 0) 100%);\n}\nbody[data-dsh-theme=\"retro\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #1a1309;\n  --dsw-alias-bg-layer-1: #231a0e;\n  --dsw-alias-bg-layer-2: #231a0e;\n  --dsw-alias-bg-layer-3: #2f2413;\n  --dsw-alias-bg-overlay: #2f2413;\n  --dsw-alias-bg-module-platform: #2f2413;\n  --dsw-alias-bg-multi-select: #2f2413;\n  --dsw-alias-bg-skeleton: rgba(245, 234, 213, 0.080);\n  --dsw-alias-border-l1: rgba(245, 234, 213, 0.055);\n  --dsw-alias-border-l2: rgba(245,234,213,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(245,234,213,0.10);\n  --dsw-alias-border-l3: rgba(245, 234, 213, 0.160);\n  --dsw-alias-border-l4: rgba(245, 234, 213, 0.220);\n  --dsw-alias-border-inverted: rgba(245, 234, 213, 0.120);\n  --dsw-alias-border-inverted2: rgba(245, 234, 213, 0.120);\n  --dsw-alias-brand-primary: #fb923c;\n  --dsw-alias-brand-primary-invert: #f5ead5;\n  --dsw-alias-brand-text: #f5ead5;\n  --dsw-alias-button-primary-fill: #fb923c;\n  --dsw-alias-button-primary-hover: #fdba74;\n  --dsw-alias-button-primary-dimmed: rgba(251, 146, 60, 0.140);\n  --dsw-alias-button-info-fill: #fb923c;\n  --dsw-alias-button-info-hover: #fdba74;\n  --dsw-alias-button-contrast-fill: #f5ead5;\n  --dsw-alias-button-elevated-fill: #231a0e;\n  --dsw-alias-button-floating-fill: #231a0e;\n  --dsw-alias-button-floating-hover: #2f2413;\n  --dsw-alias-button-ghost-active-fill: #2f2413;\n  --dsw-alias-button-ghost-active-hover: #2f2413;\n  --dsw-alias-button-ghost-active-border: #8d7a57;\n  --dsw-alias-button-tool-bar-fill: rgba(245, 234, 213, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(245, 234, 213, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(245, 234, 213, 0.280);\n  --dsw-alias-label-primary: #f5ead5;\n  --dsw-alias-label-secondary: #bfa97e;\n  --dsw-alias-label-tertiary: #8d7a57;\n  --dsw-alias-label-caption: #8d7a57;\n  --dsw-alias-label-dimmed: rgba(245, 234, 213, 0.450);\n  --dsw-alias-label-primary-bluish: #f5ead5;\n  --dsw-alias-label-primary-dimmed: #f5ead5;\n  --dsw-alias-label-primary-foreground: #2a0d01;\n  --dsw-alias-label-primary-inverted: #2a0d01;\n  --dsw-alias-interactive-bg-hover: rgba(245, 234, 213, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(245, 234, 213, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(251, 146, 60, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2f2413;\n  --dsw-alias-markdown-code-block: #1e160b;\n  --dsw-alias-markdown-code-block-banner: #281d10;\n  --dsw-alias-markdown-inline-code: #1e160b;\n  --dsw-alias-markdown-code-segment-selected: #281d10;\n  --dsw-alias-markdown-code-segment-unselected: #1e160b;\n  --dsw-alias-markdown-citation: #2f2413;\n  --dsw-alias-markdown-placeholder: #2f2413;\n  --dsw-alias-markdown-tag: #2f2413;\n  --dsw-alias-state-business-primary: #fb923c;\n  --dsw-alias-state-business-tertiary: rgba(251, 146, 60, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(245, 234, 213, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(245, 234, 213, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(245, 234, 213, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(245, 234, 213, 0.220);\n  --dsw-alias-toast-bg: #f5ead5;\n  --dsw-alias-tooltip-bg: #f5ead5;\n  --dsw-specific-bubble: #1e160b;\n  --dsw-specific-bubble-highlight: rgba(251, 146, 60, 0.120);\n  --dsw-specific-input-major: #231a0e;\n  --dsw-specific-login-input: #2f2413;\n  --dsw-specific-menu: #231a0e;\n  --dsw-specific-selector: #2f2413;\n  --dsw-specific-sidebar-fill: #1c140a;\n  --dsw-specific-sidebar-nav-item-active: rgba(245, 234, 213, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(251, 146, 60, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(245, 234, 213, 0.050);\n  --dsw-specific-tip: #2f2413;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(26, 19, 9) 20.19%, rgba(26, 19, 9, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(47, 36, 19) 20.19%, rgba(47, 36, 19, 0) 100%);\n}\nbody[data-dsh-theme=\"retro\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"retro\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"terminal","name":"Terminal","nameZh":"终端","desc":"Green phosphor on a CRT black.","descZh":"CRT 黑底上的磷光绿。","swatch":{"light":["#e7f1ea","#f7fcf9","#16a34a","#152117"],"dark":["#060d08","#0b150d","#22c55e","#d3f5dc"]},"css":"/* Terminal (终端) — dsh-theme */\nbody[data-dsh-theme=\"terminal\"]{\n  --dsw-alias-bg-base: #e7f1ea;\n  --dsw-alias-bg-layer-1: #f7fcf9;\n  --dsw-alias-bg-layer-2: #f7fcf9;\n  --dsw-alias-bg-layer-3: #d7e6db;\n  --dsw-alias-bg-overlay: #d7e6db;\n  --dsw-alias-bg-module-platform: #d7e6db;\n  --dsw-alias-bg-multi-select: #d7e6db;\n  --dsw-alias-bg-skeleton: rgba(21, 33, 23, 0.060);\n  --dsw-alias-border-l1: rgba(21, 33, 23, 0.055);\n  --dsw-alias-border-l2: rgba(21,33,23,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(21,33,23,0.10);\n  --dsw-alias-border-l3: rgba(21, 33, 23, 0.160);\n  --dsw-alias-border-l4: rgba(21, 33, 23, 0.220);\n  --dsw-alias-border-inverted: rgba(21, 33, 23, 0.080);\n  --dsw-alias-border-inverted2: rgba(21, 33, 23, 0.080);\n  --dsw-alias-brand-primary: #16a34a;\n  --dsw-alias-brand-primary-invert: #152117;\n  --dsw-alias-brand-text: #152117;\n  --dsw-alias-button-primary-fill: #16a34a;\n  --dsw-alias-button-primary-hover: #15803d;\n  --dsw-alias-button-primary-dimmed: rgba(22, 163, 74, 0.140);\n  --dsw-alias-button-info-fill: #16a34a;\n  --dsw-alias-button-info-hover: #15803d;\n  --dsw-alias-button-contrast-fill: #152117;\n  --dsw-alias-button-elevated-fill: #f7fcf9;\n  --dsw-alias-button-floating-fill: #f7fcf9;\n  --dsw-alias-button-floating-hover: #d7e6db;\n  --dsw-alias-button-ghost-active-fill: #d7e6db;\n  --dsw-alias-button-ghost-active-hover: #d7e6db;\n  --dsw-alias-button-ghost-active-border: #7c8f7f;\n  --dsw-alias-button-tool-bar-fill: rgba(21, 33, 23, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(21, 33, 23, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(21, 33, 23, 0.280);\n  --dsw-alias-label-primary: #152117;\n  --dsw-alias-label-secondary: #4c5e4f;\n  --dsw-alias-label-tertiary: #7c8f7f;\n  --dsw-alias-label-caption: #7c8f7f;\n  --dsw-alias-label-dimmed: rgba(21, 33, 23, 0.450);\n  --dsw-alias-label-primary-bluish: #152117;\n  --dsw-alias-label-primary-dimmed: #152117;\n  --dsw-alias-label-primary-foreground: #00290f;\n  --dsw-alias-label-primary-inverted: #00290f;\n  --dsw-alias-interactive-bg-hover: rgba(21, 33, 23, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(21, 33, 23, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(22, 163, 74, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #d7e6db;\n  --dsw-alias-markdown-code-block: #e1ece3;\n  --dsw-alias-markdown-code-block-banner: #d4e4d7;\n  --dsw-alias-markdown-inline-code: #e1ece3;\n  --dsw-alias-markdown-code-segment-selected: #d4e4d7;\n  --dsw-alias-markdown-code-segment-unselected: #e1ece3;\n  --dsw-alias-markdown-citation: #d7e6db;\n  --dsw-alias-markdown-placeholder: #d7e6db;\n  --dsw-alias-markdown-tag: #d7e6db;\n  --dsw-alias-state-business-primary: #16a34a;\n  --dsw-alias-state-business-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #16a34a;\n  --dsw-alias-state-success-secondary: #16a34a;\n  --dsw-alias-state-success-tertiary: rgba(22, 163, 74, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(21, 33, 23, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(21, 33, 23, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(21, 33, 23, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(21, 33, 23, 0.220);\n  --dsw-alias-toast-bg: #152117;\n  --dsw-alias-tooltip-bg: #152117;\n  --dsw-specific-bubble: #e1ece3;\n  --dsw-specific-bubble-highlight: rgba(22, 163, 74, 0.120);\n  --dsw-specific-input-major: #f7fcf9;\n  --dsw-specific-login-input: #d7e6db;\n  --dsw-specific-menu: #f7fcf9;\n  --dsw-specific-selector: #d7e6db;\n  --dsw-specific-sidebar-fill: #e1ede3;\n  --dsw-specific-sidebar-nav-item-active: rgba(21, 33, 23, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(22, 163, 74, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(21, 33, 23, 0.050);\n  --dsw-specific-tip: #d7e6db;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(231, 241, 234) 20.19%, rgba(231, 241, 234, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(215, 230, 219) 20.19%, rgba(215, 230, 219, 0) 100%);\n}\nbody[data-dsh-theme=\"terminal\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #060d08;\n  --dsw-alias-bg-layer-1: #0b150d;\n  --dsw-alias-bg-layer-2: #0b150d;\n  --dsw-alias-bg-layer-3: #122112;\n  --dsw-alias-bg-overlay: #122112;\n  --dsw-alias-bg-module-platform: #122112;\n  --dsw-alias-bg-multi-select: #122112;\n  --dsw-alias-bg-skeleton: rgba(211, 245, 220, 0.080);\n  --dsw-alias-border-l1: rgba(211, 245, 220, 0.055);\n  --dsw-alias-border-l2: rgba(211,245,220,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(211,245,220,0.10);\n  --dsw-alias-border-l3: rgba(211, 245, 220, 0.160);\n  --dsw-alias-border-l4: rgba(211, 245, 220, 0.220);\n  --dsw-alias-border-inverted: rgba(211, 245, 220, 0.120);\n  --dsw-alias-border-inverted2: rgba(211, 245, 220, 0.120);\n  --dsw-alias-brand-primary: #22c55e;\n  --dsw-alias-brand-primary-invert: #d3f5dc;\n  --dsw-alias-brand-text: #d3f5dc;\n  --dsw-alias-button-primary-fill: #22c55e;\n  --dsw-alias-button-primary-hover: #4ade80;\n  --dsw-alias-button-primary-dimmed: rgba(34, 197, 94, 0.140);\n  --dsw-alias-button-info-fill: #22c55e;\n  --dsw-alias-button-info-hover: #4ade80;\n  --dsw-alias-button-contrast-fill: #d3f5dc;\n  --dsw-alias-button-elevated-fill: #0b150d;\n  --dsw-alias-button-floating-fill: #0b150d;\n  --dsw-alias-button-floating-hover: #122112;\n  --dsw-alias-button-ghost-active-fill: #122112;\n  --dsw-alias-button-ghost-active-hover: #122112;\n  --dsw-alias-button-ghost-active-border: #52835e;\n  --dsw-alias-button-tool-bar-fill: rgba(211, 245, 220, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(211, 245, 220, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(211, 245, 220, 0.280);\n  --dsw-alias-label-primary: #d3f5dc;\n  --dsw-alias-label-secondary: #7fbf8d;\n  --dsw-alias-label-tertiary: #52835e;\n  --dsw-alias-label-caption: #52835e;\n  --dsw-alias-label-dimmed: rgba(211, 245, 220, 0.450);\n  --dsw-alias-label-primary-bluish: #d3f5dc;\n  --dsw-alias-label-primary-dimmed: #d3f5dc;\n  --dsw-alias-label-primary-foreground: #00290f;\n  --dsw-alias-label-primary-inverted: #00290f;\n  --dsw-alias-interactive-bg-hover: rgba(211, 245, 220, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(211, 245, 220, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(34, 197, 94, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #122112;\n  --dsw-alias-markdown-code-block: #081109;\n  --dsw-alias-markdown-code-block-banner: #0e1a10;\n  --dsw-alias-markdown-inline-code: #081109;\n  --dsw-alias-markdown-code-segment-selected: #0e1a10;\n  --dsw-alias-markdown-code-segment-unselected: #081109;\n  --dsw-alias-markdown-citation: #122112;\n  --dsw-alias-markdown-placeholder: #122112;\n  --dsw-alias-markdown-tag: #122112;\n  --dsw-alias-state-business-primary: #22c55e;\n  --dsw-alias-state-business-tertiary: rgba(34, 197, 94, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(211, 245, 220, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(211, 245, 220, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(211, 245, 220, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(211, 245, 220, 0.220);\n  --dsw-alias-toast-bg: #d3f5dc;\n  --dsw-alias-tooltip-bg: #d3f5dc;\n  --dsw-specific-bubble: #081109;\n  --dsw-specific-bubble-highlight: rgba(34, 197, 94, 0.120);\n  --dsw-specific-input-major: #0b150d;\n  --dsw-specific-login-input: #122112;\n  --dsw-specific-menu: #0b150d;\n  --dsw-specific-selector: #122112;\n  --dsw-specific-sidebar-fill: #081008;\n  --dsw-specific-sidebar-nav-item-active: rgba(211, 245, 220, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(34, 197, 94, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(211, 245, 220, 0.050);\n  --dsw-specific-tip: #122112;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(6, 13, 8) 20.19%, rgba(6, 13, 8, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(18, 33, 18) 20.19%, rgba(18, 33, 18, 0) 100%);\n}\nbody[data-dsh-theme=\"terminal\"]{\n  --shiki-token-constant: #0f766e;\n  --shiki-token-string: #15803d;\n  --shiki-token-comment: #6b7280;\n  --shiki-token-keyword: #b91c1c;\n  --shiki-token-parameter: #92400e;\n  --shiki-token-function: #1d4ed8;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #374151;\n  --shiki-token-link: #0369a1;\n}\nbody[data-dsh-theme=\"terminal\"][data-ds-dark-theme]{\n  --shiki-token-constant: #2dd4bf;\n  --shiki-token-string: #4ade80;\n  --shiki-token-comment: #6b7280;\n  --shiki-token-keyword: #fb7185;\n  --shiki-token-parameter: #fdba74;\n  --shiki-token-function: #60a5fa;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #9ca3af;\n  --shiki-token-link: #38bdf8;\n}\n"},{"id":"dune","name":"Dune","nameZh":"沙丘","desc":"Golden sand under a warm sun.","descZh":"暖阳下的金色沙丘。","swatch":{"light":["#f1e5d4","#fbf4e8","#b45309","#2e2614"],"dark":["#161208","#1e190c","#d97706","#f4ecd4"]},"css":"/* Dune (沙丘) — dsh-theme */\nbody[data-dsh-theme=\"dune\"]{\n  --dsw-alias-bg-base: #f1e5d4;\n  --dsw-alias-bg-layer-1: #fbf4e8;\n  --dsw-alias-bg-layer-2: #fbf4e8;\n  --dsw-alias-bg-layer-3: #e8d7be;\n  --dsw-alias-bg-overlay: #e8d7be;\n  --dsw-alias-bg-module-platform: #e8d7be;\n  --dsw-alias-bg-multi-select: #e8d7be;\n  --dsw-alias-bg-skeleton: rgba(46, 38, 20, 0.060);\n  --dsw-alias-border-l1: rgba(46, 38, 20, 0.055);\n  --dsw-alias-border-l2: rgba(46,38,20,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(46,38,20,0.10);\n  --dsw-alias-border-l3: rgba(46, 38, 20, 0.160);\n  --dsw-alias-border-l4: rgba(46, 38, 20, 0.220);\n  --dsw-alias-border-inverted: rgba(46, 38, 20, 0.080);\n  --dsw-alias-border-inverted2: rgba(46, 38, 20, 0.080);\n  --dsw-alias-brand-primary: #b45309;\n  --dsw-alias-brand-primary-invert: #2e2614;\n  --dsw-alias-brand-text: #2e2614;\n  --dsw-alias-button-primary-fill: #b45309;\n  --dsw-alias-button-primary-hover: #92400e;\n  --dsw-alias-button-primary-dimmed: rgba(180, 83, 9, 0.140);\n  --dsw-alias-button-info-fill: #b45309;\n  --dsw-alias-button-info-hover: #92400e;\n  --dsw-alias-button-contrast-fill: #2e2614;\n  --dsw-alias-button-elevated-fill: #fbf4e8;\n  --dsw-alias-button-floating-fill: #fbf4e8;\n  --dsw-alias-button-floating-hover: #e8d7be;\n  --dsw-alias-button-ghost-active-fill: #e8d7be;\n  --dsw-alias-button-ghost-active-hover: #e8d7be;\n  --dsw-alias-button-ghost-active-border: #988b64;\n  --dsw-alias-button-tool-bar-fill: rgba(46, 38, 20, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(46, 38, 20, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(46, 38, 20, 0.280);\n  --dsw-alias-label-primary: #2e2614;\n  --dsw-alias-label-secondary: #6b5e3c;\n  --dsw-alias-label-tertiary: #988b64;\n  --dsw-alias-label-caption: #988b64;\n  --dsw-alias-label-dimmed: rgba(46, 38, 20, 0.450);\n  --dsw-alias-label-primary-bluish: #2e2614;\n  --dsw-alias-label-primary-dimmed: #2e2614;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(46, 38, 20, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(46, 38, 20, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(180, 83, 9, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e8d7be;\n  --dsw-alias-markdown-code-block: #ede2cd;\n  --dsw-alias-markdown-code-block-banner: #e5d5ba;\n  --dsw-alias-markdown-inline-code: #ede2cd;\n  --dsw-alias-markdown-code-segment-selected: #e5d5ba;\n  --dsw-alias-markdown-code-segment-unselected: #ede2cd;\n  --dsw-alias-markdown-citation: #e8d7be;\n  --dsw-alias-markdown-placeholder: #e8d7be;\n  --dsw-alias-markdown-tag: #e8d7be;\n  --dsw-alias-state-business-primary: #b45309;\n  --dsw-alias-state-business-tertiary: rgba(180, 83, 9, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(46, 38, 20, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(46, 38, 20, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(46, 38, 20, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(46, 38, 20, 0.220);\n  --dsw-alias-toast-bg: #2e2614;\n  --dsw-alias-tooltip-bg: #2e2614;\n  --dsw-specific-bubble: #ede2cd;\n  --dsw-specific-bubble-highlight: rgba(180, 83, 9, 0.120);\n  --dsw-specific-input-major: #fbf4e8;\n  --dsw-specific-login-input: #e8d7be;\n  --dsw-specific-menu: #fbf4e8;\n  --dsw-specific-selector: #e8d7be;\n  --dsw-specific-sidebar-fill: #ede2cf;\n  --dsw-specific-sidebar-nav-item-active: rgba(46, 38, 20, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(180, 83, 9, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(46, 38, 20, 0.050);\n  --dsw-specific-tip: #e8d7be;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(241, 229, 212) 20.19%, rgba(241, 229, 212, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(232, 215, 190) 20.19%, rgba(232, 215, 190, 0) 100%);\n}\nbody[data-dsh-theme=\"dune\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #161208;\n  --dsw-alias-bg-layer-1: #1e190c;\n  --dsw-alias-bg-layer-2: #1e190c;\n  --dsw-alias-bg-layer-3: #2a2312;\n  --dsw-alias-bg-overlay: #2a2312;\n  --dsw-alias-bg-module-platform: #2a2312;\n  --dsw-alias-bg-multi-select: #2a2312;\n  --dsw-alias-bg-skeleton: rgba(244, 236, 212, 0.080);\n  --dsw-alias-border-l1: rgba(244, 236, 212, 0.055);\n  --dsw-alias-border-l2: rgba(244,236,212,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(244,236,212,0.10);\n  --dsw-alias-border-l3: rgba(244, 236, 212, 0.160);\n  --dsw-alias-border-l4: rgba(244, 236, 212, 0.220);\n  --dsw-alias-border-inverted: rgba(244, 236, 212, 0.120);\n  --dsw-alias-border-inverted2: rgba(244, 236, 212, 0.120);\n  --dsw-alias-brand-primary: #d97706;\n  --dsw-alias-brand-primary-invert: #f4ecd4;\n  --dsw-alias-brand-text: #f4ecd4;\n  --dsw-alias-button-primary-fill: #d97706;\n  --dsw-alias-button-primary-hover: #f59e0b;\n  --dsw-alias-button-primary-dimmed: rgba(217, 119, 6, 0.140);\n  --dsw-alias-button-info-fill: #d97706;\n  --dsw-alias-button-info-hover: #f59e0b;\n  --dsw-alias-button-contrast-fill: #f4ecd4;\n  --dsw-alias-button-elevated-fill: #1e190c;\n  --dsw-alias-button-floating-fill: #1e190c;\n  --dsw-alias-button-floating-hover: #2a2312;\n  --dsw-alias-button-ghost-active-fill: #2a2312;\n  --dsw-alias-button-ghost-active-hover: #2a2312;\n  --dsw-alias-button-ghost-active-border: #857849;\n  --dsw-alias-button-tool-bar-fill: rgba(244, 236, 212, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(244, 236, 212, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(244, 236, 212, 0.280);\n  --dsw-alias-label-primary: #f4ecd4;\n  --dsw-alias-label-secondary: #b6a776;\n  --dsw-alias-label-tertiary: #857849;\n  --dsw-alias-label-caption: #857849;\n  --dsw-alias-label-dimmed: rgba(244, 236, 212, 0.450);\n  --dsw-alias-label-primary-bluish: #f4ecd4;\n  --dsw-alias-label-primary-dimmed: #f4ecd4;\n  --dsw-alias-label-primary-foreground: #1f0d00;\n  --dsw-alias-label-primary-inverted: #1f0d00;\n  --dsw-alias-interactive-bg-hover: rgba(244, 236, 212, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(244, 236, 212, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(217, 119, 6, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2a2312;\n  --dsw-alias-markdown-code-block: #1a1509;\n  --dsw-alias-markdown-code-block-banner: #231c0e;\n  --dsw-alias-markdown-inline-code: #1a1509;\n  --dsw-alias-markdown-code-segment-selected: #231c0e;\n  --dsw-alias-markdown-code-segment-unselected: #1a1509;\n  --dsw-alias-markdown-citation: #2a2312;\n  --dsw-alias-markdown-placeholder: #2a2312;\n  --dsw-alias-markdown-tag: #2a2312;\n  --dsw-alias-state-business-primary: #d97706;\n  --dsw-alias-state-business-tertiary: rgba(217, 119, 6, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(244, 236, 212, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(244, 236, 212, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(244, 236, 212, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(244, 236, 212, 0.220);\n  --dsw-alias-toast-bg: #f4ecd4;\n  --dsw-alias-tooltip-bg: #f4ecd4;\n  --dsw-specific-bubble: #1a1509;\n  --dsw-specific-bubble-highlight: rgba(217, 119, 6, 0.120);\n  --dsw-specific-input-major: #1e190c;\n  --dsw-specific-login-input: #2a2312;\n  --dsw-specific-menu: #1e190c;\n  --dsw-specific-selector: #2a2312;\n  --dsw-specific-sidebar-fill: #181307;\n  --dsw-specific-sidebar-nav-item-active: rgba(244, 236, 212, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(217, 119, 6, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(244, 236, 212, 0.050);\n  --dsw-specific-tip: #2a2312;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(22, 18, 8) 20.19%, rgba(22, 18, 8, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(42, 35, 18) 20.19%, rgba(42, 35, 18, 0) 100%);\n}\nbody[data-dsh-theme=\"dune\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"dune\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"glacier","name":"Glacier","nameZh":"冰川","desc":"Icy pale blues, sharp and clear.","descZh":"清澈锐利的冰蓝。","swatch":{"light":["#cde6f5","#ecf6fb","#0284c7","#0b2438"],"dark":["#0a141d","#101d29","#38bdf8","#dff1fc"]},"css":"/* Glacier (冰川) — dsh-theme */\nbody[data-dsh-theme=\"glacier\"]{\n  --dsw-alias-bg-base: #cde6f5;\n  --dsw-alias-bg-layer-1: #ecf6fb;\n  --dsw-alias-bg-layer-2: #ecf6fb;\n  --dsw-alias-bg-layer-3: #badcf0;\n  --dsw-alias-bg-overlay: #badcf0;\n  --dsw-alias-bg-module-platform: #badcf0;\n  --dsw-alias-bg-multi-select: #badcf0;\n  --dsw-alias-bg-skeleton: rgba(11, 36, 56, 0.060);\n  --dsw-alias-border-l1: rgba(11, 36, 56, 0.055);\n  --dsw-alias-border-l2: rgba(11,36,56,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(11,36,56,0.10);\n  --dsw-alias-border-l3: rgba(11, 36, 56, 0.160);\n  --dsw-alias-border-l4: rgba(11, 36, 56, 0.220);\n  --dsw-alias-border-inverted: rgba(11, 36, 56, 0.080);\n  --dsw-alias-border-inverted2: rgba(11, 36, 56, 0.080);\n  --dsw-alias-brand-primary: #0284c7;\n  --dsw-alias-brand-primary-invert: #0b2438;\n  --dsw-alias-brand-text: #0b2438;\n  --dsw-alias-button-primary-fill: #0284c7;\n  --dsw-alias-button-primary-hover: #0369a1;\n  --dsw-alias-button-primary-dimmed: rgba(2, 132, 199, 0.140);\n  --dsw-alias-button-info-fill: #0284c7;\n  --dsw-alias-button-info-hover: #0369a1;\n  --dsw-alias-button-contrast-fill: #0b2438;\n  --dsw-alias-button-elevated-fill: #ecf6fb;\n  --dsw-alias-button-floating-fill: #ecf6fb;\n  --dsw-alias-button-floating-hover: #badcf0;\n  --dsw-alias-button-ghost-active-fill: #badcf0;\n  --dsw-alias-button-ghost-active-hover: #badcf0;\n  --dsw-alias-button-ghost-active-border: #6d8ba4;\n  --dsw-alias-button-tool-bar-fill: rgba(11, 36, 56, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(11, 36, 56, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(11, 36, 56, 0.280);\n  --dsw-alias-label-primary: #0b2438;\n  --dsw-alias-label-secondary: #3d627e;\n  --dsw-alias-label-tertiary: #6d8ba4;\n  --dsw-alias-label-caption: #6d8ba4;\n  --dsw-alias-label-dimmed: rgba(11, 36, 56, 0.450);\n  --dsw-alias-label-primary-bluish: #0b2438;\n  --dsw-alias-label-primary-dimmed: #0b2438;\n  --dsw-alias-label-primary-foreground: #000d18;\n  --dsw-alias-label-primary-inverted: #000d18;\n  --dsw-alias-interactive-bg-hover: rgba(11, 36, 56, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(11, 36, 56, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(2, 132, 199, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #badcf0;\n  --dsw-alias-markdown-code-block: #cfe7f5;\n  --dsw-alias-markdown-code-block-banner: #bedef0;\n  --dsw-alias-markdown-inline-code: #cfe7f5;\n  --dsw-alias-markdown-code-segment-selected: #bedef0;\n  --dsw-alias-markdown-code-segment-unselected: #cfe7f5;\n  --dsw-alias-markdown-citation: #badcf0;\n  --dsw-alias-markdown-placeholder: #badcf0;\n  --dsw-alias-markdown-tag: #badcf0;\n  --dsw-alias-state-business-primary: #0284c7;\n  --dsw-alias-state-business-tertiary: rgba(2, 132, 199, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(11, 36, 56, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(11, 36, 56, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(11, 36, 56, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(11, 36, 56, 0.220);\n  --dsw-alias-toast-bg: #0b2438;\n  --dsw-alias-tooltip-bg: #0b2438;\n  --dsw-specific-bubble: #cfe7f5;\n  --dsw-specific-bubble-highlight: rgba(2, 132, 199, 0.120);\n  --dsw-specific-input-major: #ecf6fb;\n  --dsw-specific-login-input: #badcf0;\n  --dsw-specific-menu: #ecf6fb;\n  --dsw-specific-selector: #badcf0;\n  --dsw-specific-sidebar-fill: #cfe6f5;\n  --dsw-specific-sidebar-nav-item-active: rgba(11, 36, 56, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(2, 132, 199, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(11, 36, 56, 0.050);\n  --dsw-specific-tip: #badcf0;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(205, 230, 245) 20.19%, rgba(205, 230, 245, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(186, 220, 240) 20.19%, rgba(186, 220, 240, 0) 100%);\n}\nbody[data-dsh-theme=\"glacier\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0a141d;\n  --dsw-alias-bg-layer-1: #101d29;\n  --dsw-alias-bg-layer-2: #101d29;\n  --dsw-alias-bg-layer-3: #182838;\n  --dsw-alias-bg-overlay: #182838;\n  --dsw-alias-bg-module-platform: #182838;\n  --dsw-alias-bg-multi-select: #182838;\n  --dsw-alias-bg-skeleton: rgba(223, 241, 252, 0.080);\n  --dsw-alias-border-l1: rgba(223, 241, 252, 0.055);\n  --dsw-alias-border-l2: rgba(223,241,252,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(223,241,252,0.10);\n  --dsw-alias-border-l3: rgba(223, 241, 252, 0.160);\n  --dsw-alias-border-l4: rgba(223, 241, 252, 0.220);\n  --dsw-alias-border-inverted: rgba(223, 241, 252, 0.120);\n  --dsw-alias-border-inverted2: rgba(223, 241, 252, 0.120);\n  --dsw-alias-brand-primary: #38bdf8;\n  --dsw-alias-brand-primary-invert: #dff1fc;\n  --dsw-alias-brand-text: #dff1fc;\n  --dsw-alias-button-primary-fill: #38bdf8;\n  --dsw-alias-button-primary-hover: #7dd3fc;\n  --dsw-alias-button-primary-dimmed: rgba(56, 189, 248, 0.140);\n  --dsw-alias-button-info-fill: #38bdf8;\n  --dsw-alias-button-info-hover: #7dd3fc;\n  --dsw-alias-button-contrast-fill: #dff1fc;\n  --dsw-alias-button-elevated-fill: #101d29;\n  --dsw-alias-button-floating-fill: #101d29;\n  --dsw-alias-button-floating-hover: #182838;\n  --dsw-alias-button-ghost-active-fill: #182838;\n  --dsw-alias-button-ghost-active-hover: #182838;\n  --dsw-alias-button-ghost-active-border: #648096;\n  --dsw-alias-button-tool-bar-fill: rgba(223, 241, 252, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(223, 241, 252, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(223, 241, 252, 0.280);\n  --dsw-alias-label-primary: #dff1fc;\n  --dsw-alias-label-secondary: #93b8d0;\n  --dsw-alias-label-tertiary: #648096;\n  --dsw-alias-label-caption: #648096;\n  --dsw-alias-label-dimmed: rgba(223, 241, 252, 0.450);\n  --dsw-alias-label-primary-bluish: #dff1fc;\n  --dsw-alias-label-primary-dimmed: #dff1fc;\n  --dsw-alias-label-primary-foreground: #000d18;\n  --dsw-alias-label-primary-inverted: #000d18;\n  --dsw-alias-interactive-bg-hover: rgba(223, 241, 252, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(223, 241, 252, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #182838;\n  --dsw-alias-markdown-code-block: #0d1a24;\n  --dsw-alias-markdown-code-block-banner: #132230;\n  --dsw-alias-markdown-inline-code: #0d1a24;\n  --dsw-alias-markdown-code-segment-selected: #132230;\n  --dsw-alias-markdown-code-segment-unselected: #0d1a24;\n  --dsw-alias-markdown-citation: #182838;\n  --dsw-alias-markdown-placeholder: #182838;\n  --dsw-alias-markdown-tag: #182838;\n  --dsw-alias-state-business-primary: #38bdf8;\n  --dsw-alias-state-business-tertiary: rgba(56, 189, 248, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(223, 241, 252, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(223, 241, 252, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(223, 241, 252, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(223, 241, 252, 0.220);\n  --dsw-alias-toast-bg: #dff1fc;\n  --dsw-alias-tooltip-bg: #dff1fc;\n  --dsw-specific-bubble: #0d1a24;\n  --dsw-specific-bubble-highlight: rgba(56, 189, 248, 0.120);\n  --dsw-specific-input-major: #101d29;\n  --dsw-specific-login-input: #182838;\n  --dsw-specific-menu: #101d29;\n  --dsw-specific-selector: #182838;\n  --dsw-specific-sidebar-fill: #0c1821;\n  --dsw-specific-sidebar-nav-item-active: rgba(223, 241, 252, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(56, 189, 248, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(223, 241, 252, 0.050);\n  --dsw-specific-tip: #182838;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(10, 20, 29) 20.19%, rgba(10, 20, 29, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(24, 40, 56) 20.19%, rgba(24, 40, 56, 0) 100%);\n}\nbody[data-dsh-theme=\"glacier\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"glacier\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"nebula","name":"Nebula","nameZh":"星云","desc":"Indigo clouds dotted with starlight.","descZh":"靛蓝星云，缀满星光。","swatch":{"light":["#e4e4fa","#f7f7fe","#6366f1","#1c1a3e"],"dark":["#0c0b1d","#131230","#818cf8","#e8e7ff"]},"css":"/* Nebula (星云) — dsh-theme */\nbody[data-dsh-theme=\"nebula\"]{\n  --dsw-alias-bg-base: #e4e4fa;\n  --dsw-alias-bg-layer-1: #f7f7fe;\n  --dsw-alias-bg-layer-2: #f7f7fe;\n  --dsw-alias-bg-layer-3: #d8d8f6;\n  --dsw-alias-bg-overlay: #d8d8f6;\n  --dsw-alias-bg-module-platform: #d8d8f6;\n  --dsw-alias-bg-multi-select: #d8d8f6;\n  --dsw-alias-bg-skeleton: rgba(28, 26, 62, 0.060);\n  --dsw-alias-border-l1: rgba(28, 26, 62, 0.055);\n  --dsw-alias-border-l2: rgba(28,26,62,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(28,26,62,0.10);\n  --dsw-alias-border-l3: rgba(28, 26, 62, 0.160);\n  --dsw-alias-border-l4: rgba(28, 26, 62, 0.220);\n  --dsw-alias-border-inverted: rgba(28, 26, 62, 0.080);\n  --dsw-alias-border-inverted2: rgba(28, 26, 62, 0.080);\n  --dsw-alias-brand-primary: #6366f1;\n  --dsw-alias-brand-primary-invert: #1c1a3e;\n  --dsw-alias-brand-text: #1c1a3e;\n  --dsw-alias-button-primary-fill: #6366f1;\n  --dsw-alias-button-primary-hover: #4f46e5;\n  --dsw-alias-button-primary-dimmed: rgba(99, 102, 241, 0.140);\n  --dsw-alias-button-info-fill: #6366f1;\n  --dsw-alias-button-info-hover: #4f46e5;\n  --dsw-alias-button-contrast-fill: #1c1a3e;\n  --dsw-alias-button-elevated-fill: #f7f7fe;\n  --dsw-alias-button-floating-fill: #f7f7fe;\n  --dsw-alias-button-floating-hover: #d8d8f6;\n  --dsw-alias-button-ghost-active-fill: #d8d8f6;\n  --dsw-alias-button-ghost-active-hover: #d8d8f6;\n  --dsw-alias-button-ghost-active-border: #7d7bad;\n  --dsw-alias-button-tool-bar-fill: rgba(28, 26, 62, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(28, 26, 62, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(28, 26, 62, 0.280);\n  --dsw-alias-label-primary: #1c1a3e;\n  --dsw-alias-label-secondary: #514f85;\n  --dsw-alias-label-tertiary: #7d7bad;\n  --dsw-alias-label-caption: #7d7bad;\n  --dsw-alias-label-dimmed: rgba(28, 26, 62, 0.450);\n  --dsw-alias-label-primary-bluish: #1c1a3e;\n  --dsw-alias-label-primary-dimmed: #1c1a3e;\n  --dsw-alias-label-primary-foreground: #050020;\n  --dsw-alias-label-primary-inverted: #050020;\n  --dsw-alias-interactive-bg-hover: rgba(28, 26, 62, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(28, 26, 62, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(99, 102, 241, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #d8d8f6;\n  --dsw-alias-markdown-code-block: #e2e2f9;\n  --dsw-alias-markdown-code-block-banner: #d6d6f5;\n  --dsw-alias-markdown-inline-code: #e2e2f9;\n  --dsw-alias-markdown-code-segment-selected: #d6d6f5;\n  --dsw-alias-markdown-code-segment-unselected: #e2e2f9;\n  --dsw-alias-markdown-citation: #d8d8f6;\n  --dsw-alias-markdown-placeholder: #d8d8f6;\n  --dsw-alias-markdown-tag: #d8d8f6;\n  --dsw-alias-state-business-primary: #6366f1;\n  --dsw-alias-state-business-tertiary: rgba(99, 102, 241, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #0d9488;\n  --dsw-alias-state-success-secondary: #0d9488;\n  --dsw-alias-state-success-tertiary: rgba(13, 148, 136, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(28, 26, 62, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(28, 26, 62, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(28, 26, 62, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(28, 26, 62, 0.220);\n  --dsw-alias-toast-bg: #1c1a3e;\n  --dsw-alias-tooltip-bg: #1c1a3e;\n  --dsw-specific-bubble: #e2e2f9;\n  --dsw-specific-bubble-highlight: rgba(99, 102, 241, 0.120);\n  --dsw-specific-input-major: #f7f7fe;\n  --dsw-specific-login-input: #d8d8f6;\n  --dsw-specific-menu: #f7f7fe;\n  --dsw-specific-selector: #d8d8f6;\n  --dsw-specific-sidebar-fill: #e1e2f8;\n  --dsw-specific-sidebar-nav-item-active: rgba(28, 26, 62, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(99, 102, 241, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(28, 26, 62, 0.050);\n  --dsw-specific-tip: #d8d8f6;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(228, 228, 250) 20.19%, rgba(228, 228, 250, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(216, 216, 246) 20.19%, rgba(216, 216, 246, 0) 100%);\n}\nbody[data-dsh-theme=\"nebula\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #0c0b1d;\n  --dsw-alias-bg-layer-1: #131230;\n  --dsw-alias-bg-layer-2: #131230;\n  --dsw-alias-bg-layer-3: #1b1a3f;\n  --dsw-alias-bg-overlay: #1b1a3f;\n  --dsw-alias-bg-module-platform: #1b1a3f;\n  --dsw-alias-bg-multi-select: #1b1a3f;\n  --dsw-alias-bg-skeleton: rgba(232, 231, 255, 0.080);\n  --dsw-alias-border-l1: rgba(232, 231, 255, 0.055);\n  --dsw-alias-border-l2: rgba(232,231,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(232,231,255,0.10);\n  --dsw-alias-border-l3: rgba(232, 231, 255, 0.160);\n  --dsw-alias-border-l4: rgba(232, 231, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(232, 231, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(232, 231, 255, 0.120);\n  --dsw-alias-brand-primary: #818cf8;\n  --dsw-alias-brand-primary-invert: #e8e7ff;\n  --dsw-alias-brand-text: #e8e7ff;\n  --dsw-alias-button-primary-fill: #818cf8;\n  --dsw-alias-button-primary-hover: #a5b4fc;\n  --dsw-alias-button-primary-dimmed: rgba(129, 140, 248, 0.140);\n  --dsw-alias-button-info-fill: #818cf8;\n  --dsw-alias-button-info-hover: #a5b4fc;\n  --dsw-alias-button-contrast-fill: #e8e7ff;\n  --dsw-alias-button-elevated-fill: #131230;\n  --dsw-alias-button-floating-fill: #131230;\n  --dsw-alias-button-floating-hover: #1b1a3f;\n  --dsw-alias-button-ghost-active-fill: #1b1a3f;\n  --dsw-alias-button-ghost-active-hover: #1b1a3f;\n  --dsw-alias-button-ghost-active-border: #716fa6;\n  --dsw-alias-button-tool-bar-fill: rgba(232, 231, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(232, 231, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(232, 231, 255, 0.280);\n  --dsw-alias-label-primary: #e8e7ff;\n  --dsw-alias-label-secondary: #a5a3dc;\n  --dsw-alias-label-tertiary: #716fa6;\n  --dsw-alias-label-caption: #716fa6;\n  --dsw-alias-label-dimmed: rgba(232, 231, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #e8e7ff;\n  --dsw-alias-label-primary-dimmed: #e8e7ff;\n  --dsw-alias-label-primary-foreground: #050020;\n  --dsw-alias-label-primary-inverted: #050020;\n  --dsw-alias-interactive-bg-hover: rgba(232, 231, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(232, 231, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(129, 140, 248, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #1b1a3f;\n  --dsw-alias-markdown-code-block: #100f28;\n  --dsw-alias-markdown-code-block-banner: #161538;\n  --dsw-alias-markdown-inline-code: #100f28;\n  --dsw-alias-markdown-code-segment-selected: #161538;\n  --dsw-alias-markdown-code-segment-unselected: #100f28;\n  --dsw-alias-markdown-citation: #1b1a3f;\n  --dsw-alias-markdown-placeholder: #1b1a3f;\n  --dsw-alias-markdown-tag: #1b1a3f;\n  --dsw-alias-state-business-primary: #818cf8;\n  --dsw-alias-state-business-tertiary: rgba(129, 140, 248, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #2dd4bf;\n  --dsw-alias-state-success-secondary: #2dd4bf;\n  --dsw-alias-state-success-tertiary: rgba(45, 212, 191, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(232, 231, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(232, 231, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(232, 231, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(232, 231, 255, 0.220);\n  --dsw-alias-toast-bg: #e8e7ff;\n  --dsw-alias-tooltip-bg: #e8e7ff;\n  --dsw-specific-bubble: #100f28;\n  --dsw-specific-bubble-highlight: rgba(129, 140, 248, 0.120);\n  --dsw-specific-input-major: #131230;\n  --dsw-specific-login-input: #1b1a3f;\n  --dsw-specific-menu: #131230;\n  --dsw-specific-selector: #1b1a3f;\n  --dsw-specific-sidebar-fill: #0e0d22;\n  --dsw-specific-sidebar-nav-item-active: rgba(232, 231, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(129, 140, 248, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(232, 231, 255, 0.050);\n  --dsw-specific-tip: #1b1a3f;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(12, 11, 29) 20.19%, rgba(12, 11, 29, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(27, 26, 63) 20.19%, rgba(27, 26, 63, 0) 100%);\n}\nbody[data-dsh-theme=\"nebula\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"nebula\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"coral","name":"Coral","nameZh":"珊瑚","desc":"Reef corals, bright and lively.","descZh":"礁石珊瑚，明快而活泼。","swatch":{"light":["#fceae4","#fefaf8","#ea580c","#331510"],"dark":["#170d0d","#201313","#fb7185","#fdeeed"]},"css":"/* Coral (珊瑚) — dsh-theme */\nbody[data-dsh-theme=\"coral\"]{\n  --dsw-alias-bg-base: #fceae4;\n  --dsw-alias-bg-layer-1: #fefaf8;\n  --dsw-alias-bg-layer-2: #fefaf8;\n  --dsw-alias-bg-layer-3: #f7dcd2;\n  --dsw-alias-bg-overlay: #f7dcd2;\n  --dsw-alias-bg-module-platform: #f7dcd2;\n  --dsw-alias-bg-multi-select: #f7dcd2;\n  --dsw-alias-bg-skeleton: rgba(51, 21, 16, 0.060);\n  --dsw-alias-border-l1: rgba(51, 21, 16, 0.055);\n  --dsw-alias-border-l2: rgba(51,21,16,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(51,21,16,0.10);\n  --dsw-alias-border-l3: rgba(51, 21, 16, 0.160);\n  --dsw-alias-border-l4: rgba(51, 21, 16, 0.220);\n  --dsw-alias-border-inverted: rgba(51, 21, 16, 0.080);\n  --dsw-alias-border-inverted2: rgba(51, 21, 16, 0.080);\n  --dsw-alias-brand-primary: #ea580c;\n  --dsw-alias-brand-primary-invert: #331510;\n  --dsw-alias-brand-text: #331510;\n  --dsw-alias-button-primary-fill: #ea580c;\n  --dsw-alias-button-primary-hover: #c2410c;\n  --dsw-alias-button-primary-dimmed: rgba(234, 88, 12, 0.140);\n  --dsw-alias-button-info-fill: #ea580c;\n  --dsw-alias-button-info-hover: #c2410c;\n  --dsw-alias-button-contrast-fill: #331510;\n  --dsw-alias-button-elevated-fill: #fefaf8;\n  --dsw-alias-button-floating-fill: #fefaf8;\n  --dsw-alias-button-floating-hover: #f7dcd2;\n  --dsw-alias-button-ghost-active-fill: #f7dcd2;\n  --dsw-alias-button-ghost-active-hover: #f7dcd2;\n  --dsw-alias-button-ghost-active-border: #a5756a;\n  --dsw-alias-button-tool-bar-fill: rgba(51, 21, 16, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(51, 21, 16, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(51, 21, 16, 0.280);\n  --dsw-alias-label-primary: #331510;\n  --dsw-alias-label-secondary: #7a4a40;\n  --dsw-alias-label-tertiary: #a5756a;\n  --dsw-alias-label-caption: #a5756a;\n  --dsw-alias-label-dimmed: rgba(51, 21, 16, 0.450);\n  --dsw-alias-label-primary-bluish: #331510;\n  --dsw-alias-label-primary-dimmed: #331510;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(51, 21, 16, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(51, 21, 16, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(234, 88, 12, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f7dcd2;\n  --dsw-alias-markdown-code-block: #f8e5de;\n  --dsw-alias-markdown-code-block-banner: #f4d7cd;\n  --dsw-alias-markdown-inline-code: #f8e5de;\n  --dsw-alias-markdown-code-segment-selected: #f4d7cd;\n  --dsw-alias-markdown-code-segment-unselected: #f8e5de;\n  --dsw-alias-markdown-citation: #f7dcd2;\n  --dsw-alias-markdown-placeholder: #f7dcd2;\n  --dsw-alias-markdown-tag: #f7dcd2;\n  --dsw-alias-state-business-primary: #ea580c;\n  --dsw-alias-state-business-tertiary: rgba(234, 88, 12, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(51, 21, 16, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(51, 21, 16, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(51, 21, 16, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(51, 21, 16, 0.220);\n  --dsw-alias-toast-bg: #331510;\n  --dsw-alias-tooltip-bg: #331510;\n  --dsw-specific-bubble: #f8e5de;\n  --dsw-specific-bubble-highlight: rgba(234, 88, 12, 0.120);\n  --dsw-specific-input-major: #fefaf8;\n  --dsw-specific-login-input: #f7dcd2;\n  --dsw-specific-menu: #fefaf8;\n  --dsw-specific-selector: #f7dcd2;\n  --dsw-specific-sidebar-fill: #f8e5dd;\n  --dsw-specific-sidebar-nav-item-active: rgba(51, 21, 16, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(234, 88, 12, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(51, 21, 16, 0.050);\n  --dsw-specific-tip: #f7dcd2;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(252, 234, 228) 20.19%, rgba(252, 234, 228, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(247, 220, 210) 20.19%, rgba(247, 220, 210, 0) 100%);\n}\nbody[data-dsh-theme=\"coral\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #170d0d;\n  --dsw-alias-bg-layer-1: #201313;\n  --dsw-alias-bg-layer-2: #201313;\n  --dsw-alias-bg-layer-3: #2c1a1a;\n  --dsw-alias-bg-overlay: #2c1a1a;\n  --dsw-alias-bg-module-platform: #2c1a1a;\n  --dsw-alias-bg-multi-select: #2c1a1a;\n  --dsw-alias-bg-skeleton: rgba(253, 238, 237, 0.080);\n  --dsw-alias-border-l1: rgba(253, 238, 237, 0.055);\n  --dsw-alias-border-l2: rgba(253,238,237,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(253,238,237,0.10);\n  --dsw-alias-border-l3: rgba(253, 238, 237, 0.160);\n  --dsw-alias-border-l4: rgba(253, 238, 237, 0.220);\n  --dsw-alias-border-inverted: rgba(253, 238, 237, 0.120);\n  --dsw-alias-border-inverted2: rgba(253, 238, 237, 0.120);\n  --dsw-alias-brand-primary: #fb7185;\n  --dsw-alias-brand-primary-invert: #fdeeed;\n  --dsw-alias-brand-text: #fdeeed;\n  --dsw-alias-button-primary-fill: #fb7185;\n  --dsw-alias-button-primary-hover: #fda4af;\n  --dsw-alias-button-primary-dimmed: rgba(251, 113, 133, 0.140);\n  --dsw-alias-button-info-fill: #fb7185;\n  --dsw-alias-button-info-hover: #fda4af;\n  --dsw-alias-button-contrast-fill: #fdeeed;\n  --dsw-alias-button-elevated-fill: #201313;\n  --dsw-alias-button-floating-fill: #201313;\n  --dsw-alias-button-floating-hover: #2c1a1a;\n  --dsw-alias-button-ghost-active-fill: #2c1a1a;\n  --dsw-alias-button-ghost-active-hover: #2c1a1a;\n  --dsw-alias-button-ghost-active-border: #9c6f6a;\n  --dsw-alias-button-tool-bar-fill: rgba(253, 238, 237, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(253, 238, 237, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(253, 238, 237, 0.280);\n  --dsw-alias-label-primary: #fdeeed;\n  --dsw-alias-label-secondary: #d0a09b;\n  --dsw-alias-label-tertiary: #9c6f6a;\n  --dsw-alias-label-caption: #9c6f6a;\n  --dsw-alias-label-dimmed: rgba(253, 238, 237, 0.450);\n  --dsw-alias-label-primary-bluish: #fdeeed;\n  --dsw-alias-label-primary-dimmed: #fdeeed;\n  --dsw-alias-label-primary-foreground: #2b0f02;\n  --dsw-alias-label-primary-inverted: #2b0f02;\n  --dsw-alias-interactive-bg-hover: rgba(253, 238, 237, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(253, 238, 237, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(251, 113, 133, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2c1a1a;\n  --dsw-alias-markdown-code-block: #1b1010;\n  --dsw-alias-markdown-code-block-banner: #251717;\n  --dsw-alias-markdown-inline-code: #1b1010;\n  --dsw-alias-markdown-code-segment-selected: #251717;\n  --dsw-alias-markdown-code-segment-unselected: #1b1010;\n  --dsw-alias-markdown-citation: #2c1a1a;\n  --dsw-alias-markdown-placeholder: #2c1a1a;\n  --dsw-alias-markdown-tag: #2c1a1a;\n  --dsw-alias-state-business-primary: #fb7185;\n  --dsw-alias-state-business-tertiary: rgba(251, 113, 133, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(253, 238, 237, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(253, 238, 237, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(253, 238, 237, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(253, 238, 237, 0.220);\n  --dsw-alias-toast-bg: #fdeeed;\n  --dsw-alias-tooltip-bg: #fdeeed;\n  --dsw-specific-bubble: #1b1010;\n  --dsw-specific-bubble-highlight: rgba(251, 113, 133, 0.120);\n  --dsw-specific-input-major: #201313;\n  --dsw-specific-login-input: #2c1a1a;\n  --dsw-specific-menu: #201313;\n  --dsw-specific-selector: #2c1a1a;\n  --dsw-specific-sidebar-fill: #190f0f;\n  --dsw-specific-sidebar-nav-item-active: rgba(253, 238, 237, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(251, 113, 133, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(253, 238, 237, 0.050);\n  --dsw-specific-tip: #2c1a1a;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(23, 13, 13) 20.19%, rgba(23, 13, 13, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(44, 26, 26) 20.19%, rgba(44, 26, 26, 0) 100%);\n}\nbody[data-dsh-theme=\"coral\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"coral\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"steel","name":"Steel","nameZh":"钢铁","desc":"Cool blue-gray, industrial calm.","descZh":"冷冽的蓝灰，工业般的沉静。","swatch":{"light":["#e7edf3","#f9fcfd","#0369a1","#16202b"],"dark":["#11161c","#181f27","#38bdf8","#e3eaf1"]},"css":"/* Steel (钢铁) — dsh-theme */\nbody[data-dsh-theme=\"steel\"]{\n  --dsw-alias-bg-base: #e7edf3;\n  --dsw-alias-bg-layer-1: #f9fcfd;\n  --dsw-alias-bg-layer-2: #f9fcfd;\n  --dsw-alias-bg-layer-3: #dae4eb;\n  --dsw-alias-bg-overlay: #dae4eb;\n  --dsw-alias-bg-module-platform: #dae4eb;\n  --dsw-alias-bg-multi-select: #dae4eb;\n  --dsw-alias-bg-skeleton: rgba(22, 32, 43, 0.060);\n  --dsw-alias-border-l1: rgba(22, 32, 43, 0.055);\n  --dsw-alias-border-l2: rgba(22,32,43,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(22,32,43,0.10);\n  --dsw-alias-border-l3: rgba(22, 32, 43, 0.160);\n  --dsw-alias-border-l4: rgba(22, 32, 43, 0.220);\n  --dsw-alias-border-inverted: rgba(22, 32, 43, 0.080);\n  --dsw-alias-border-inverted2: rgba(22, 32, 43, 0.080);\n  --dsw-alias-brand-primary: #0369a1;\n  --dsw-alias-brand-primary-invert: #16202b;\n  --dsw-alias-brand-text: #16202b;\n  --dsw-alias-button-primary-fill: #0369a1;\n  --dsw-alias-button-primary-hover: #075985;\n  --dsw-alias-button-primary-dimmed: rgba(3, 105, 161, 0.140);\n  --dsw-alias-button-info-fill: #0369a1;\n  --dsw-alias-button-info-hover: #075985;\n  --dsw-alias-button-contrast-fill: #16202b;\n  --dsw-alias-button-elevated-fill: #f9fcfd;\n  --dsw-alias-button-floating-fill: #f9fcfd;\n  --dsw-alias-button-floating-hover: #dae4eb;\n  --dsw-alias-button-ghost-active-fill: #dae4eb;\n  --dsw-alias-button-ghost-active-hover: #dae4eb;\n  --dsw-alias-button-ghost-active-border: #75879a;\n  --dsw-alias-button-tool-bar-fill: rgba(22, 32, 43, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(22, 32, 43, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(22, 32, 43, 0.280);\n  --dsw-alias-label-primary: #16202b;\n  --dsw-alias-label-secondary: #46586a;\n  --dsw-alias-label-tertiary: #75879a;\n  --dsw-alias-label-caption: #75879a;\n  --dsw-alias-label-dimmed: rgba(22, 32, 43, 0.450);\n  --dsw-alias-label-primary-bluish: #16202b;\n  --dsw-alias-label-primary-dimmed: #16202b;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(22, 32, 43, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(22, 32, 43, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(3, 105, 161, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #dae4eb;\n  --dsw-alias-markdown-code-block: #e3eaef;\n  --dsw-alias-markdown-code-block-banner: #d7e2e9;\n  --dsw-alias-markdown-inline-code: #e3eaef;\n  --dsw-alias-markdown-code-segment-selected: #d7e2e9;\n  --dsw-alias-markdown-code-segment-unselected: #e3eaef;\n  --dsw-alias-markdown-citation: #dae4eb;\n  --dsw-alias-markdown-placeholder: #dae4eb;\n  --dsw-alias-markdown-tag: #dae4eb;\n  --dsw-alias-state-business-primary: #0369a1;\n  --dsw-alias-state-business-tertiary: rgba(3, 105, 161, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(22, 32, 43, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(22, 32, 43, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(22, 32, 43, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(22, 32, 43, 0.220);\n  --dsw-alias-toast-bg: #16202b;\n  --dsw-alias-tooltip-bg: #16202b;\n  --dsw-specific-bubble: #e3eaef;\n  --dsw-specific-bubble-highlight: rgba(3, 105, 161, 0.120);\n  --dsw-specific-input-major: #f9fcfd;\n  --dsw-specific-login-input: #dae4eb;\n  --dsw-specific-menu: #f9fcfd;\n  --dsw-specific-selector: #dae4eb;\n  --dsw-specific-sidebar-fill: #e2e9ef;\n  --dsw-specific-sidebar-nav-item-active: rgba(22, 32, 43, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(3, 105, 161, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(22, 32, 43, 0.050);\n  --dsw-specific-tip: #dae4eb;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(231, 237, 243) 20.19%, rgba(231, 237, 243, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(218, 228, 235) 20.19%, rgba(218, 228, 235, 0) 100%);\n}\nbody[data-dsh-theme=\"steel\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #11161c;\n  --dsw-alias-bg-layer-1: #181f27;\n  --dsw-alias-bg-layer-2: #181f27;\n  --dsw-alias-bg-layer-3: #212b36;\n  --dsw-alias-bg-overlay: #212b36;\n  --dsw-alias-bg-module-platform: #212b36;\n  --dsw-alias-bg-multi-select: #212b36;\n  --dsw-alias-bg-skeleton: rgba(227, 234, 241, 0.080);\n  --dsw-alias-border-l1: rgba(227, 234, 241, 0.055);\n  --dsw-alias-border-l2: rgba(227,234,241,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(227,234,241,0.10);\n  --dsw-alias-border-l3: rgba(227, 234, 241, 0.160);\n  --dsw-alias-border-l4: rgba(227, 234, 241, 0.220);\n  --dsw-alias-border-inverted: rgba(227, 234, 241, 0.120);\n  --dsw-alias-border-inverted2: rgba(227, 234, 241, 0.120);\n  --dsw-alias-brand-primary: #38bdf8;\n  --dsw-alias-brand-primary-invert: #e3eaf1;\n  --dsw-alias-brand-text: #e3eaf1;\n  --dsw-alias-button-primary-fill: #38bdf8;\n  --dsw-alias-button-primary-hover: #7dd3fc;\n  --dsw-alias-button-primary-dimmed: rgba(56, 189, 248, 0.140);\n  --dsw-alias-button-info-fill: #38bdf8;\n  --dsw-alias-button-info-hover: #7dd3fc;\n  --dsw-alias-button-contrast-fill: #e3eaf1;\n  --dsw-alias-button-elevated-fill: #181f27;\n  --dsw-alias-button-floating-fill: #181f27;\n  --dsw-alias-button-floating-hover: #212b36;\n  --dsw-alias-button-ghost-active-fill: #212b36;\n  --dsw-alias-button-ghost-active-hover: #212b36;\n  --dsw-alias-button-ghost-active-border: #6b7d8f;\n  --dsw-alias-button-tool-bar-fill: rgba(227, 234, 241, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(227, 234, 241, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(227, 234, 241, 0.280);\n  --dsw-alias-label-primary: #e3eaf1;\n  --dsw-alias-label-secondary: #9aabbd;\n  --dsw-alias-label-tertiary: #6b7d8f;\n  --dsw-alias-label-caption: #6b7d8f;\n  --dsw-alias-label-dimmed: rgba(227, 234, 241, 0.450);\n  --dsw-alias-label-primary-bluish: #e3eaf1;\n  --dsw-alias-label-primary-dimmed: #e3eaf1;\n  --dsw-alias-label-primary-foreground: #05283c;\n  --dsw-alias-label-primary-inverted: #05283c;\n  --dsw-alias-interactive-bg-hover: rgba(227, 234, 241, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(227, 234, 241, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(56, 189, 248, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #212b36;\n  --dsw-alias-markdown-code-block: #151c24;\n  --dsw-alias-markdown-code-block-banner: #1c252f;\n  --dsw-alias-markdown-inline-code: #151c24;\n  --dsw-alias-markdown-code-segment-selected: #1c252f;\n  --dsw-alias-markdown-code-segment-unselected: #151c24;\n  --dsw-alias-markdown-citation: #212b36;\n  --dsw-alias-markdown-placeholder: #212b36;\n  --dsw-alias-markdown-tag: #212b36;\n  --dsw-alias-state-business-primary: #38bdf8;\n  --dsw-alias-state-business-tertiary: rgba(56, 189, 248, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(227, 234, 241, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(227, 234, 241, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(227, 234, 241, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(227, 234, 241, 0.220);\n  --dsw-alias-toast-bg: #e3eaf1;\n  --dsw-alias-tooltip-bg: #e3eaf1;\n  --dsw-specific-bubble: #151c24;\n  --dsw-specific-bubble-highlight: rgba(56, 189, 248, 0.120);\n  --dsw-specific-input-major: #181f27;\n  --dsw-specific-login-input: #212b36;\n  --dsw-specific-menu: #181f27;\n  --dsw-specific-selector: #212b36;\n  --dsw-specific-sidebar-fill: #131920;\n  --dsw-specific-sidebar-nav-item-active: rgba(227, 234, 241, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(56, 189, 248, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(227, 234, 241, 0.050);\n  --dsw-specific-tip: #212b36;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(17, 22, 28) 20.19%, rgba(17, 22, 28, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(33, 43, 54) 20.19%, rgba(33, 43, 54, 0) 100%);\n}\nbody[data-dsh-theme=\"steel\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"steel\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"autumn","name":"Autumn","nameZh":"秋日","desc":"Golden leaves on a harvest afternoon.","descZh":"丰收午后，满地金黄。","swatch":{"light":["#f9ebd5","#fef8ed","#d97706","#33240f"],"dark":["#181105","#211806","#f59e0b","#f9eed3"]},"css":"/* Autumn (秋日) — dsh-theme */\nbody[data-dsh-theme=\"autumn\"]{\n  --dsw-alias-bg-base: #f9ebd5;\n  --dsw-alias-bg-layer-1: #fef8ed;\n  --dsw-alias-bg-layer-2: #fef8ed;\n  --dsw-alias-bg-layer-3: #f2dfbe;\n  --dsw-alias-bg-overlay: #f2dfbe;\n  --dsw-alias-bg-module-platform: #f2dfbe;\n  --dsw-alias-bg-multi-select: #f2dfbe;\n  --dsw-alias-bg-skeleton: rgba(51, 36, 15, 0.060);\n  --dsw-alias-border-l1: rgba(51, 36, 15, 0.055);\n  --dsw-alias-border-l2: rgba(51,36,15,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(51,36,15,0.10);\n  --dsw-alias-border-l3: rgba(51, 36, 15, 0.160);\n  --dsw-alias-border-l4: rgba(51, 36, 15, 0.220);\n  --dsw-alias-border-inverted: rgba(51, 36, 15, 0.080);\n  --dsw-alias-border-inverted2: rgba(51, 36, 15, 0.080);\n  --dsw-alias-brand-primary: #d97706;\n  --dsw-alias-brand-primary-invert: #33240f;\n  --dsw-alias-brand-text: #33240f;\n  --dsw-alias-button-primary-fill: #d97706;\n  --dsw-alias-button-primary-hover: #b45309;\n  --dsw-alias-button-primary-dimmed: rgba(217, 119, 6, 0.140);\n  --dsw-alias-button-info-fill: #d97706;\n  --dsw-alias-button-info-hover: #b45309;\n  --dsw-alias-button-contrast-fill: #33240f;\n  --dsw-alias-button-elevated-fill: #fef8ed;\n  --dsw-alias-button-floating-fill: #fef8ed;\n  --dsw-alias-button-floating-hover: #f2dfbe;\n  --dsw-alias-button-ghost-active-fill: #f2dfbe;\n  --dsw-alias-button-ghost-active-hover: #f2dfbe;\n  --dsw-alias-button-ghost-active-border: #9d8859;\n  --dsw-alias-button-tool-bar-fill: rgba(51, 36, 15, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(51, 36, 15, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(51, 36, 15, 0.280);\n  --dsw-alias-label-primary: #33240f;\n  --dsw-alias-label-secondary: #6f5931;\n  --dsw-alias-label-tertiary: #9d8859;\n  --dsw-alias-label-caption: #9d8859;\n  --dsw-alias-label-dimmed: rgba(51, 36, 15, 0.450);\n  --dsw-alias-label-primary-bluish: #33240f;\n  --dsw-alias-label-primary-dimmed: #33240f;\n  --dsw-alias-label-primary-foreground: #2b1400;\n  --dsw-alias-label-primary-inverted: #2b1400;\n  --dsw-alias-interactive-bg-hover: rgba(51, 36, 15, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(51, 36, 15, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(217, 119, 6, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f2dfbe;\n  --dsw-alias-markdown-code-block: #f3e5cd;\n  --dsw-alias-markdown-code-block-banner: #eedaba;\n  --dsw-alias-markdown-inline-code: #f3e5cd;\n  --dsw-alias-markdown-code-segment-selected: #eedaba;\n  --dsw-alias-markdown-code-segment-unselected: #f3e5cd;\n  --dsw-alias-markdown-citation: #f2dfbe;\n  --dsw-alias-markdown-placeholder: #f2dfbe;\n  --dsw-alias-markdown-tag: #f2dfbe;\n  --dsw-alias-state-business-primary: #d97706;\n  --dsw-alias-state-business-tertiary: rgba(217, 119, 6, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(51, 36, 15, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(51, 36, 15, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(51, 36, 15, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(51, 36, 15, 0.220);\n  --dsw-alias-toast-bg: #33240f;\n  --dsw-alias-tooltip-bg: #33240f;\n  --dsw-specific-bubble: #f3e5cd;\n  --dsw-specific-bubble-highlight: rgba(217, 119, 6, 0.120);\n  --dsw-specific-input-major: #fef8ed;\n  --dsw-specific-login-input: #f2dfbe;\n  --dsw-specific-menu: #fef8ed;\n  --dsw-specific-selector: #f2dfbe;\n  --dsw-specific-sidebar-fill: #f4e6d0;\n  --dsw-specific-sidebar-nav-item-active: rgba(51, 36, 15, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(217, 119, 6, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(51, 36, 15, 0.050);\n  --dsw-specific-tip: #f2dfbe;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(249, 235, 213) 20.19%, rgba(249, 235, 213, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(242, 223, 190) 20.19%, rgba(242, 223, 190, 0) 100%);\n}\nbody[data-dsh-theme=\"autumn\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #181105;\n  --dsw-alias-bg-layer-1: #211806;\n  --dsw-alias-bg-layer-2: #211806;\n  --dsw-alias-bg-layer-3: #2d210c;\n  --dsw-alias-bg-overlay: #2d210c;\n  --dsw-alias-bg-module-platform: #2d210c;\n  --dsw-alias-bg-multi-select: #2d210c;\n  --dsw-alias-bg-skeleton: rgba(249, 238, 211, 0.080);\n  --dsw-alias-border-l1: rgba(249, 238, 211, 0.055);\n  --dsw-alias-border-l2: rgba(249,238,211,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(249,238,211,0.10);\n  --dsw-alias-border-l3: rgba(249, 238, 211, 0.160);\n  --dsw-alias-border-l4: rgba(249, 238, 211, 0.220);\n  --dsw-alias-border-inverted: rgba(249, 238, 211, 0.120);\n  --dsw-alias-border-inverted2: rgba(249, 238, 211, 0.120);\n  --dsw-alias-brand-primary: #f59e0b;\n  --dsw-alias-brand-primary-invert: #f9eed3;\n  --dsw-alias-brand-text: #f9eed3;\n  --dsw-alias-button-primary-fill: #f59e0b;\n  --dsw-alias-button-primary-hover: #fbbf24;\n  --dsw-alias-button-primary-dimmed: rgba(245, 158, 11, 0.140);\n  --dsw-alias-button-info-fill: #f59e0b;\n  --dsw-alias-button-info-hover: #fbbf24;\n  --dsw-alias-button-contrast-fill: #f9eed3;\n  --dsw-alias-button-elevated-fill: #211806;\n  --dsw-alias-button-floating-fill: #211806;\n  --dsw-alias-button-floating-hover: #2d210c;\n  --dsw-alias-button-ghost-active-fill: #2d210c;\n  --dsw-alias-button-ghost-active-hover: #2d210c;\n  --dsw-alias-button-ghost-active-border: #8d7848;\n  --dsw-alias-button-tool-bar-fill: rgba(249, 238, 211, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(249, 238, 211, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(249, 238, 211, 0.280);\n  --dsw-alias-label-primary: #f9eed3;\n  --dsw-alias-label-secondary: #c2a86b;\n  --dsw-alias-label-tertiary: #8d7848;\n  --dsw-alias-label-caption: #8d7848;\n  --dsw-alias-label-dimmed: rgba(249, 238, 211, 0.450);\n  --dsw-alias-label-primary-bluish: #f9eed3;\n  --dsw-alias-label-primary-dimmed: #f9eed3;\n  --dsw-alias-label-primary-foreground: #2b1400;\n  --dsw-alias-label-primary-inverted: #2b1400;\n  --dsw-alias-interactive-bg-hover: rgba(249, 238, 211, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(249, 238, 211, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(245, 158, 11, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2d210c;\n  --dsw-alias-markdown-code-block: #1c1405;\n  --dsw-alias-markdown-code-block-banner: #251a09;\n  --dsw-alias-markdown-inline-code: #1c1405;\n  --dsw-alias-markdown-code-segment-selected: #251a09;\n  --dsw-alias-markdown-code-segment-unselected: #1c1405;\n  --dsw-alias-markdown-citation: #2d210c;\n  --dsw-alias-markdown-placeholder: #2d210c;\n  --dsw-alias-markdown-tag: #2d210c;\n  --dsw-alias-state-business-primary: #f59e0b;\n  --dsw-alias-state-business-tertiary: rgba(245, 158, 11, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(249, 238, 211, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(249, 238, 211, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(249, 238, 211, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(249, 238, 211, 0.220);\n  --dsw-alias-toast-bg: #f9eed3;\n  --dsw-alias-tooltip-bg: #f9eed3;\n  --dsw-specific-bubble: #1c1405;\n  --dsw-specific-bubble-highlight: rgba(245, 158, 11, 0.120);\n  --dsw-specific-input-major: #211806;\n  --dsw-specific-login-input: #2d210c;\n  --dsw-specific-menu: #211806;\n  --dsw-specific-selector: #2d210c;\n  --dsw-specific-sidebar-fill: #1a1205;\n  --dsw-specific-sidebar-nav-item-active: rgba(249, 238, 211, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(245, 158, 11, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(249, 238, 211, 0.050);\n  --dsw-specific-tip: #2d210c;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(24, 17, 5) 20.19%, rgba(24, 17, 5, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(45, 33, 12) 20.19%, rgba(45, 33, 12, 0) 100%);\n}\nbody[data-dsh-theme=\"autumn\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"autumn\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"matcha","name":"Matcha","nameZh":"抹茶","desc":"Mossy greens with a hint of tea.","descZh":"苔绿间透着茶香。","swatch":{"light":["#e8f0d8","#f7faf3","#65a30d","#232b12"],"dark":["#131606","#1a1e09","#a3e635","#f1f5dc"]},"css":"/* Matcha (抹茶) — dsh-theme */\nbody[data-dsh-theme=\"matcha\"]{\n  --dsw-alias-bg-base: #e8f0d8;\n  --dsw-alias-bg-layer-1: #f7faf3;\n  --dsw-alias-bg-layer-2: #f7faf3;\n  --dsw-alias-bg-layer-3: #dbe7c4;\n  --dsw-alias-bg-overlay: #dbe7c4;\n  --dsw-alias-bg-module-platform: #dbe7c4;\n  --dsw-alias-bg-multi-select: #dbe7c4;\n  --dsw-alias-bg-skeleton: rgba(35, 43, 18, 0.060);\n  --dsw-alias-border-l1: rgba(35, 43, 18, 0.055);\n  --dsw-alias-border-l2: rgba(35,43,18,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(35,43,18,0.10);\n  --dsw-alias-border-l3: rgba(35, 43, 18, 0.160);\n  --dsw-alias-border-l4: rgba(35, 43, 18, 0.220);\n  --dsw-alias-border-inverted: rgba(35, 43, 18, 0.080);\n  --dsw-alias-border-inverted2: rgba(35, 43, 18, 0.080);\n  --dsw-alias-brand-primary: #65a30d;\n  --dsw-alias-brand-primary-invert: #232b12;\n  --dsw-alias-brand-text: #232b12;\n  --dsw-alias-button-primary-fill: #65a30d;\n  --dsw-alias-button-primary-hover: #4d7c0f;\n  --dsw-alias-button-primary-dimmed: rgba(101, 163, 13, 0.140);\n  --dsw-alias-button-info-fill: #65a30d;\n  --dsw-alias-button-info-hover: #4d7c0f;\n  --dsw-alias-button-contrast-fill: #232b12;\n  --dsw-alias-button-elevated-fill: #f7faf3;\n  --dsw-alias-button-floating-fill: #f7faf3;\n  --dsw-alias-button-floating-hover: #dbe7c4;\n  --dsw-alias-button-ghost-active-fill: #dbe7c4;\n  --dsw-alias-button-ghost-active-hover: #dbe7c4;\n  --dsw-alias-button-ghost-active-border: #89935e;\n  --dsw-alias-button-tool-bar-fill: rgba(35, 43, 18, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(35, 43, 18, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(35, 43, 18, 0.280);\n  --dsw-alias-label-primary: #232b12;\n  --dsw-alias-label-secondary: #5a6635;\n  --dsw-alias-label-tertiary: #89935e;\n  --dsw-alias-label-caption: #89935e;\n  --dsw-alias-label-dimmed: rgba(35, 43, 18, 0.450);\n  --dsw-alias-label-primary-bluish: #232b12;\n  --dsw-alias-label-primary-dimmed: #232b12;\n  --dsw-alias-label-primary-foreground: #122400;\n  --dsw-alias-label-primary-inverted: #122400;\n  --dsw-alias-interactive-bg-hover: rgba(35, 43, 18, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(35, 43, 18, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(101, 163, 13, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #dbe7c4;\n  --dsw-alias-markdown-code-block: #e6edd4;\n  --dsw-alias-markdown-code-block-banner: #dbe5c1;\n  --dsw-alias-markdown-inline-code: #e6edd4;\n  --dsw-alias-markdown-code-segment-selected: #dbe5c1;\n  --dsw-alias-markdown-code-segment-unselected: #e6edd4;\n  --dsw-alias-markdown-citation: #dbe7c4;\n  --dsw-alias-markdown-placeholder: #dbe7c4;\n  --dsw-alias-markdown-tag: #dbe7c4;\n  --dsw-alias-state-business-primary: #65a30d;\n  --dsw-alias-state-business-tertiary: rgba(101, 163, 13, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(35, 43, 18, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(35, 43, 18, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(35, 43, 18, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(35, 43, 18, 0.220);\n  --dsw-alias-toast-bg: #232b12;\n  --dsw-alias-tooltip-bg: #232b12;\n  --dsw-specific-bubble: #e6edd4;\n  --dsw-specific-bubble-highlight: rgba(101, 163, 13, 0.120);\n  --dsw-specific-input-major: #f7faf3;\n  --dsw-specific-login-input: #dbe7c4;\n  --dsw-specific-menu: #f7faf3;\n  --dsw-specific-selector: #dbe7c4;\n  --dsw-specific-sidebar-fill: #e5edd5;\n  --dsw-specific-sidebar-nav-item-active: rgba(35, 43, 18, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(101, 163, 13, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(35, 43, 18, 0.050);\n  --dsw-specific-tip: #dbe7c4;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(232, 240, 216) 20.19%, rgba(232, 240, 216, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(219, 231, 196) 20.19%, rgba(219, 231, 196, 0) 100%);\n}\nbody[data-dsh-theme=\"matcha\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #131606;\n  --dsw-alias-bg-layer-1: #1a1e09;\n  --dsw-alias-bg-layer-2: #1a1e09;\n  --dsw-alias-bg-layer-3: #242a0e;\n  --dsw-alias-bg-overlay: #242a0e;\n  --dsw-alias-bg-module-platform: #242a0e;\n  --dsw-alias-bg-multi-select: #242a0e;\n  --dsw-alias-bg-skeleton: rgba(241, 245, 220, 0.080);\n  --dsw-alias-border-l1: rgba(241, 245, 220, 0.055);\n  --dsw-alias-border-l2: rgba(241,245,220,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(241,245,220,0.10);\n  --dsw-alias-border-l3: rgba(241, 245, 220, 0.160);\n  --dsw-alias-border-l4: rgba(241, 245, 220, 0.220);\n  --dsw-alias-border-inverted: rgba(241, 245, 220, 0.120);\n  --dsw-alias-border-inverted2: rgba(241, 245, 220, 0.120);\n  --dsw-alias-brand-primary: #a3e635;\n  --dsw-alias-brand-primary-invert: #f1f5dc;\n  --dsw-alias-brand-text: #f1f5dc;\n  --dsw-alias-button-primary-fill: #a3e635;\n  --dsw-alias-button-primary-hover: #bef264;\n  --dsw-alias-button-primary-dimmed: rgba(163, 230, 53, 0.140);\n  --dsw-alias-button-info-fill: #a3e635;\n  --dsw-alias-button-info-hover: #bef264;\n  --dsw-alias-button-contrast-fill: #f1f5dc;\n  --dsw-alias-button-elevated-fill: #1a1e09;\n  --dsw-alias-button-floating-fill: #1a1e09;\n  --dsw-alias-button-floating-hover: #242a0e;\n  --dsw-alias-button-ghost-active-fill: #242a0e;\n  --dsw-alias-button-ghost-active-hover: #242a0e;\n  --dsw-alias-button-ghost-active-border: #818c52;\n  --dsw-alias-button-tool-bar-fill: rgba(241, 245, 220, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(241, 245, 220, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(241, 245, 220, 0.280);\n  --dsw-alias-label-primary: #f1f5dc;\n  --dsw-alias-label-secondary: #b3c07c;\n  --dsw-alias-label-tertiary: #818c52;\n  --dsw-alias-label-caption: #818c52;\n  --dsw-alias-label-dimmed: rgba(241, 245, 220, 0.450);\n  --dsw-alias-label-primary-bluish: #f1f5dc;\n  --dsw-alias-label-primary-dimmed: #f1f5dc;\n  --dsw-alias-label-primary-foreground: #122400;\n  --dsw-alias-label-primary-inverted: #122400;\n  --dsw-alias-interactive-bg-hover: rgba(241, 245, 220, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(241, 245, 220, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(163, 230, 53, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #242a0e;\n  --dsw-alias-markdown-code-block: #171a07;\n  --dsw-alias-markdown-code-block-banner: #1f240b;\n  --dsw-alias-markdown-inline-code: #171a07;\n  --dsw-alias-markdown-code-segment-selected: #1f240b;\n  --dsw-alias-markdown-code-segment-unselected: #171a07;\n  --dsw-alias-markdown-citation: #242a0e;\n  --dsw-alias-markdown-placeholder: #242a0e;\n  --dsw-alias-markdown-tag: #242a0e;\n  --dsw-alias-state-business-primary: #a3e635;\n  --dsw-alias-state-business-tertiary: rgba(163, 230, 53, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(241, 245, 220, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(241, 245, 220, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(241, 245, 220, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(241, 245, 220, 0.220);\n  --dsw-alias-toast-bg: #f1f5dc;\n  --dsw-alias-tooltip-bg: #f1f5dc;\n  --dsw-specific-bubble: #171a07;\n  --dsw-specific-bubble-highlight: rgba(163, 230, 53, 0.120);\n  --dsw-specific-input-major: #1a1e09;\n  --dsw-specific-login-input: #242a0e;\n  --dsw-specific-menu: #1a1e09;\n  --dsw-specific-selector: #242a0e;\n  --dsw-specific-sidebar-fill: #151806;\n  --dsw-specific-sidebar-nav-item-active: rgba(241, 245, 220, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(163, 230, 53, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(241, 245, 220, 0.050);\n  --dsw-specific-tip: #242a0e;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(19, 22, 6) 20.19%, rgba(19, 22, 6, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(36, 42, 14) 20.19%, rgba(36, 42, 14, 0) 100%);\n}\nbody[data-dsh-theme=\"matcha\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"matcha\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"knight","name":"Knight","nameZh":"骑士","desc":"Dark armor trimmed with old gold.","descZh":"暗色铠甲，缀以古金。","swatch":{"light":["#efe9dd","#faf6ef","#9a6b16","#241f14"],"dark":["#121110","#1a1816","#d4a72c","#f0e9d8"]},"css":"/* Knight (骑士) — dsh-theme */\nbody[data-dsh-theme=\"knight\"]{\n  --dsw-alias-bg-base: #efe9dd;\n  --dsw-alias-bg-layer-1: #faf6ef;\n  --dsw-alias-bg-layer-2: #faf6ef;\n  --dsw-alias-bg-layer-3: #e5dbc9;\n  --dsw-alias-bg-overlay: #e5dbc9;\n  --dsw-alias-bg-module-platform: #e5dbc9;\n  --dsw-alias-bg-multi-select: #e5dbc9;\n  --dsw-alias-bg-skeleton: rgba(36, 31, 20, 0.060);\n  --dsw-alias-border-l1: rgba(36, 31, 20, 0.055);\n  --dsw-alias-border-l2: rgba(36,31,20,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(36,31,20,0.10);\n  --dsw-alias-border-l3: rgba(36, 31, 20, 0.160);\n  --dsw-alias-border-l4: rgba(36, 31, 20, 0.220);\n  --dsw-alias-border-inverted: rgba(36, 31, 20, 0.080);\n  --dsw-alias-border-inverted2: rgba(36, 31, 20, 0.080);\n  --dsw-alias-brand-primary: #9a6b16;\n  --dsw-alias-brand-primary-invert: #241f14;\n  --dsw-alias-brand-text: #241f14;\n  --dsw-alias-button-primary-fill: #9a6b16;\n  --dsw-alias-button-primary-hover: #7c5610;\n  --dsw-alias-button-primary-dimmed: rgba(154, 107, 22, 0.140);\n  --dsw-alias-button-info-fill: #9a6b16;\n  --dsw-alias-button-info-hover: #7c5610;\n  --dsw-alias-button-contrast-fill: #241f14;\n  --dsw-alias-button-elevated-fill: #faf6ef;\n  --dsw-alias-button-floating-fill: #faf6ef;\n  --dsw-alias-button-floating-hover: #e5dbc9;\n  --dsw-alias-button-ghost-active-fill: #e5dbc9;\n  --dsw-alias-button-ghost-active-hover: #e5dbc9;\n  --dsw-alias-button-ghost-active-border: #8e8468;\n  --dsw-alias-button-tool-bar-fill: rgba(36, 31, 20, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(36, 31, 20, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(36, 31, 20, 0.280);\n  --dsw-alias-label-primary: #241f14;\n  --dsw-alias-label-secondary: #60573f;\n  --dsw-alias-label-tertiary: #8e8468;\n  --dsw-alias-label-caption: #8e8468;\n  --dsw-alias-label-dimmed: rgba(36, 31, 20, 0.450);\n  --dsw-alias-label-primary-bluish: #241f14;\n  --dsw-alias-label-primary-dimmed: #241f14;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(36, 31, 20, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(36, 31, 20, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(154, 107, 22, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e5dbc9;\n  --dsw-alias-markdown-code-block: #ebe4d5;\n  --dsw-alias-markdown-code-block-banner: #e2d9c2;\n  --dsw-alias-markdown-inline-code: #ebe4d5;\n  --dsw-alias-markdown-code-segment-selected: #e2d9c2;\n  --dsw-alias-markdown-code-segment-unselected: #ebe4d5;\n  --dsw-alias-markdown-citation: #e5dbc9;\n  --dsw-alias-markdown-placeholder: #e5dbc9;\n  --dsw-alias-markdown-tag: #e5dbc9;\n  --dsw-alias-state-business-primary: #9a6b16;\n  --dsw-alias-state-business-tertiary: rgba(154, 107, 22, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(36, 31, 20, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(36, 31, 20, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(36, 31, 20, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(36, 31, 20, 0.220);\n  --dsw-alias-toast-bg: #241f14;\n  --dsw-alias-tooltip-bg: #241f14;\n  --dsw-specific-bubble: #ebe4d5;\n  --dsw-specific-bubble-highlight: rgba(154, 107, 22, 0.120);\n  --dsw-specific-input-major: #faf6ef;\n  --dsw-specific-login-input: #e5dbc9;\n  --dsw-specific-menu: #faf6ef;\n  --dsw-specific-selector: #e5dbc9;\n  --dsw-specific-sidebar-fill: #eae4d4;\n  --dsw-specific-sidebar-nav-item-active: rgba(36, 31, 20, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(154, 107, 22, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(36, 31, 20, 0.050);\n  --dsw-specific-tip: #e5dbc9;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(239, 233, 221) 20.19%, rgba(239, 233, 221, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(229, 219, 201) 20.19%, rgba(229, 219, 201, 0) 100%);\n}\nbody[data-dsh-theme=\"knight\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #121110;\n  --dsw-alias-bg-layer-1: #1a1816;\n  --dsw-alias-bg-layer-2: #1a1816;\n  --dsw-alias-bg-layer-3: #242019;\n  --dsw-alias-bg-overlay: #242019;\n  --dsw-alias-bg-module-platform: #242019;\n  --dsw-alias-bg-multi-select: #242019;\n  --dsw-alias-bg-skeleton: rgba(240, 233, 216, 0.080);\n  --dsw-alias-border-l1: rgba(240, 233, 216, 0.055);\n  --dsw-alias-border-l2: rgba(240,233,216,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(240,233,216,0.10);\n  --dsw-alias-border-l3: rgba(240, 233, 216, 0.160);\n  --dsw-alias-border-l4: rgba(240, 233, 216, 0.220);\n  --dsw-alias-border-inverted: rgba(240, 233, 216, 0.120);\n  --dsw-alias-border-inverted2: rgba(240, 233, 216, 0.120);\n  --dsw-alias-brand-primary: #d4a72c;\n  --dsw-alias-brand-primary-invert: #f0e9d8;\n  --dsw-alias-brand-text: #f0e9d8;\n  --dsw-alias-button-primary-fill: #d4a72c;\n  --dsw-alias-button-primary-hover: #e3bd4f;\n  --dsw-alias-button-primary-dimmed: rgba(212, 167, 44, 0.140);\n  --dsw-alias-button-info-fill: #d4a72c;\n  --dsw-alias-button-info-hover: #e3bd4f;\n  --dsw-alias-button-contrast-fill: #f0e9d8;\n  --dsw-alias-button-elevated-fill: #1a1816;\n  --dsw-alias-button-floating-fill: #1a1816;\n  --dsw-alias-button-floating-hover: #242019;\n  --dsw-alias-button-ghost-active-fill: #242019;\n  --dsw-alias-button-ghost-active-hover: #242019;\n  --dsw-alias-button-ghost-active-border: #857855;\n  --dsw-alias-button-tool-bar-fill: rgba(240, 233, 216, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(240, 233, 216, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(240, 233, 216, 0.280);\n  --dsw-alias-label-primary: #f0e9d8;\n  --dsw-alias-label-secondary: #b8a97e;\n  --dsw-alias-label-tertiary: #857855;\n  --dsw-alias-label-caption: #857855;\n  --dsw-alias-label-dimmed: rgba(240, 233, 216, 0.450);\n  --dsw-alias-label-primary-bluish: #f0e9d8;\n  --dsw-alias-label-primary-dimmed: #f0e9d8;\n  --dsw-alias-label-primary-foreground: #1e1400;\n  --dsw-alias-label-primary-inverted: #1e1400;\n  --dsw-alias-interactive-bg-hover: rgba(240, 233, 216, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(240, 233, 216, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(212, 167, 44, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #242019;\n  --dsw-alias-markdown-code-block: #171512;\n  --dsw-alias-markdown-code-block-banner: #201d18;\n  --dsw-alias-markdown-inline-code: #171512;\n  --dsw-alias-markdown-code-segment-selected: #201d18;\n  --dsw-alias-markdown-code-segment-unselected: #171512;\n  --dsw-alias-markdown-citation: #242019;\n  --dsw-alias-markdown-placeholder: #242019;\n  --dsw-alias-markdown-tag: #242019;\n  --dsw-alias-state-business-primary: #d4a72c;\n  --dsw-alias-state-business-tertiary: rgba(212, 167, 44, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(240, 233, 216, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(240, 233, 216, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(240, 233, 216, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(240, 233, 216, 0.220);\n  --dsw-alias-toast-bg: #f0e9d8;\n  --dsw-alias-tooltip-bg: #f0e9d8;\n  --dsw-specific-bubble: #171512;\n  --dsw-specific-bubble-highlight: rgba(212, 167, 44, 0.120);\n  --dsw-specific-input-major: #1a1816;\n  --dsw-specific-login-input: #242019;\n  --dsw-specific-menu: #1a1816;\n  --dsw-specific-selector: #242019;\n  --dsw-specific-sidebar-fill: #141311;\n  --dsw-specific-sidebar-nav-item-active: rgba(240, 233, 216, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(212, 167, 44, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(240, 233, 216, 0.050);\n  --dsw-specific-tip: #242019;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(18, 17, 16) 20.19%, rgba(18, 17, 16, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(36, 32, 25) 20.19%, rgba(36, 32, 25, 0) 100%);\n}\nbody[data-dsh-theme=\"knight\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"knight\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"pastel","name":"Pastel","nameZh":"粉彩","desc":"Soft candy colors, gentle and playful.","descZh":"糖果般的柔彩，轻柔俏皮。","swatch":{"light":["#f6f2fd","#fdfcff","#a78bfa","#2c2340"],"dark":["#16121f","#1d1829","#c4b5fd","#efeaff"]},"css":"/* Pastel (粉彩) — dsh-theme */\nbody[data-dsh-theme=\"pastel\"]{\n  --dsw-alias-bg-base: #f6f2fd;\n  --dsw-alias-bg-layer-1: #fdfcff;\n  --dsw-alias-bg-layer-2: #fdfcff;\n  --dsw-alias-bg-layer-3: #ece5f8;\n  --dsw-alias-bg-overlay: #ece5f8;\n  --dsw-alias-bg-module-platform: #ece5f8;\n  --dsw-alias-bg-multi-select: #ece5f8;\n  --dsw-alias-bg-skeleton: rgba(44, 35, 64, 0.060);\n  --dsw-alias-border-l1: rgba(44, 35, 64, 0.055);\n  --dsw-alias-border-l2: rgba(44,35,64,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(44,35,64,0.10);\n  --dsw-alias-border-l3: rgba(44, 35, 64, 0.160);\n  --dsw-alias-border-l4: rgba(44, 35, 64, 0.220);\n  --dsw-alias-border-inverted: rgba(44, 35, 64, 0.080);\n  --dsw-alias-border-inverted2: rgba(44, 35, 64, 0.080);\n  --dsw-alias-brand-primary: #a78bfa;\n  --dsw-alias-brand-primary-invert: #2c2340;\n  --dsw-alias-brand-text: #2c2340;\n  --dsw-alias-button-primary-fill: #a78bfa;\n  --dsw-alias-button-primary-hover: #8b5cf6;\n  --dsw-alias-button-primary-dimmed: rgba(167, 139, 250, 0.140);\n  --dsw-alias-button-info-fill: #a78bfa;\n  --dsw-alias-button-info-hover: #8b5cf6;\n  --dsw-alias-button-contrast-fill: #2c2340;\n  --dsw-alias-button-elevated-fill: #fdfcff;\n  --dsw-alias-button-floating-fill: #fdfcff;\n  --dsw-alias-button-floating-hover: #ece5f8;\n  --dsw-alias-button-ghost-active-fill: #ece5f8;\n  --dsw-alias-button-ghost-active-hover: #ece5f8;\n  --dsw-alias-button-ghost-active-border: #9a8fb4;\n  --dsw-alias-button-tool-bar-fill: rgba(44, 35, 64, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(44, 35, 64, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(44, 35, 64, 0.280);\n  --dsw-alias-label-primary: #2c2340;\n  --dsw-alias-label-secondary: #6d6288;\n  --dsw-alias-label-tertiary: #9a8fb4;\n  --dsw-alias-label-caption: #9a8fb4;\n  --dsw-alias-label-dimmed: rgba(44, 35, 64, 0.450);\n  --dsw-alias-label-primary-bluish: #2c2340;\n  --dsw-alias-label-primary-dimmed: #2c2340;\n  --dsw-alias-label-primary-foreground: #2e1065;\n  --dsw-alias-label-primary-inverted: #2e1065;\n  --dsw-alias-interactive-bg-hover: rgba(44, 35, 64, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(44, 35, 64, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(167, 139, 250, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #ece5f8;\n  --dsw-alias-markdown-code-block: #efe9f9;\n  --dsw-alias-markdown-code-block-banner: #e7def5;\n  --dsw-alias-markdown-inline-code: #efe9f9;\n  --dsw-alias-markdown-code-segment-selected: #e7def5;\n  --dsw-alias-markdown-code-segment-unselected: #efe9f9;\n  --dsw-alias-markdown-citation: #ece5f8;\n  --dsw-alias-markdown-placeholder: #ece5f8;\n  --dsw-alias-markdown-tag: #ece5f8;\n  --dsw-alias-state-business-primary: #a78bfa;\n  --dsw-alias-state-business-tertiary: rgba(167, 139, 250, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #0d9488;\n  --dsw-alias-state-success-secondary: #0d9488;\n  --dsw-alias-state-success-tertiary: rgba(13, 148, 136, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(44, 35, 64, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(44, 35, 64, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(44, 35, 64, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(44, 35, 64, 0.220);\n  --dsw-alias-toast-bg: #2c2340;\n  --dsw-alias-tooltip-bg: #2c2340;\n  --dsw-specific-bubble: #efe9f9;\n  --dsw-specific-bubble-highlight: rgba(167, 139, 250, 0.120);\n  --dsw-specific-input-major: #fdfcff;\n  --dsw-specific-login-input: #ece5f8;\n  --dsw-specific-menu: #fdfcff;\n  --dsw-specific-selector: #ece5f8;\n  --dsw-specific-sidebar-fill: #efebf9;\n  --dsw-specific-sidebar-nav-item-active: rgba(44, 35, 64, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(167, 139, 250, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(44, 35, 64, 0.050);\n  --dsw-specific-tip: #ece5f8;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(246, 242, 253) 20.19%, rgba(246, 242, 253, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(236, 229, 248) 20.19%, rgba(236, 229, 248, 0) 100%);\n}\nbody[data-dsh-theme=\"pastel\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #16121f;\n  --dsw-alias-bg-layer-1: #1d1829;\n  --dsw-alias-bg-layer-2: #1d1829;\n  --dsw-alias-bg-layer-3: #282038;\n  --dsw-alias-bg-overlay: #282038;\n  --dsw-alias-bg-module-platform: #282038;\n  --dsw-alias-bg-multi-select: #282038;\n  --dsw-alias-bg-skeleton: rgba(239, 234, 255, 0.080);\n  --dsw-alias-border-l1: rgba(239, 234, 255, 0.055);\n  --dsw-alias-border-l2: rgba(239,234,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(239,234,255,0.10);\n  --dsw-alias-border-l3: rgba(239, 234, 255, 0.160);\n  --dsw-alias-border-l4: rgba(239, 234, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(239, 234, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(239, 234, 255, 0.120);\n  --dsw-alias-brand-primary: #c4b5fd;\n  --dsw-alias-brand-primary-invert: #efeaff;\n  --dsw-alias-brand-text: #efeaff;\n  --dsw-alias-button-primary-fill: #c4b5fd;\n  --dsw-alias-button-primary-hover: #ddd6fe;\n  --dsw-alias-button-primary-dimmed: rgba(196, 181, 253, 0.140);\n  --dsw-alias-button-info-fill: #c4b5fd;\n  --dsw-alias-button-info-hover: #ddd6fe;\n  --dsw-alias-button-contrast-fill: #efeaff;\n  --dsw-alias-button-elevated-fill: #1d1829;\n  --dsw-alias-button-floating-fill: #1d1829;\n  --dsw-alias-button-floating-hover: #282038;\n  --dsw-alias-button-ghost-active-fill: #282038;\n  --dsw-alias-button-ghost-active-hover: #282038;\n  --dsw-alias-button-ghost-active-border: #8478a0;\n  --dsw-alias-button-tool-bar-fill: rgba(239, 234, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(239, 234, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(239, 234, 255, 0.280);\n  --dsw-alias-label-primary: #efeaff;\n  --dsw-alias-label-secondary: #b6a9d6;\n  --dsw-alias-label-tertiary: #8478a0;\n  --dsw-alias-label-caption: #8478a0;\n  --dsw-alias-label-dimmed: rgba(239, 234, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #efeaff;\n  --dsw-alias-label-primary-dimmed: #efeaff;\n  --dsw-alias-label-primary-foreground: #2e1065;\n  --dsw-alias-label-primary-inverted: #2e1065;\n  --dsw-alias-interactive-bg-hover: rgba(239, 234, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(239, 234, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(196, 181, 253, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #282038;\n  --dsw-alias-markdown-code-block: #1a1526;\n  --dsw-alias-markdown-code-block-banner: #221b30;\n  --dsw-alias-markdown-inline-code: #1a1526;\n  --dsw-alias-markdown-code-segment-selected: #221b30;\n  --dsw-alias-markdown-code-segment-unselected: #1a1526;\n  --dsw-alias-markdown-citation: #282038;\n  --dsw-alias-markdown-placeholder: #282038;\n  --dsw-alias-markdown-tag: #282038;\n  --dsw-alias-state-business-primary: #c4b5fd;\n  --dsw-alias-state-business-tertiary: rgba(196, 181, 253, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #2dd4bf;\n  --dsw-alias-state-success-secondary: #2dd4bf;\n  --dsw-alias-state-success-tertiary: rgba(45, 212, 191, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(239, 234, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(239, 234, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(239, 234, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(239, 234, 255, 0.220);\n  --dsw-alias-toast-bg: #efeaff;\n  --dsw-alias-tooltip-bg: #efeaff;\n  --dsw-specific-bubble: #1a1526;\n  --dsw-specific-bubble-highlight: rgba(196, 181, 253, 0.120);\n  --dsw-specific-input-major: #1d1829;\n  --dsw-specific-login-input: #282038;\n  --dsw-specific-menu: #1d1829;\n  --dsw-specific-selector: #282038;\n  --dsw-specific-sidebar-fill: #181322;\n  --dsw-specific-sidebar-nav-item-active: rgba(239, 234, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(196, 181, 253, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(239, 234, 255, 0.050);\n  --dsw-specific-tip: #282038;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(22, 18, 31) 20.19%, rgba(22, 18, 31, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(40, 32, 56) 20.19%, rgba(40, 32, 56, 0) 100%);\n}\nbody[data-dsh-theme=\"pastel\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"pastel\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"lavender","name":"Lavender","nameZh":"薰衣草","desc":"A field of lavender in the morning light.","descZh":"晨光里的薰衣草田。","swatch":{"light":["#efe8fc","#fbf9ff","#8b5cf6","#241b3a"],"dark":["#131024","#1a1630","#a78bfa","#ede8ff"]},"css":"/* Lavender (薰衣草) — dsh-theme */\nbody[data-dsh-theme=\"lavender\"]{\n  --dsw-alias-bg-base: #efe8fc;\n  --dsw-alias-bg-layer-1: #fbf9ff;\n  --dsw-alias-bg-layer-2: #fbf9ff;\n  --dsw-alias-bg-layer-3: #e3d9f8;\n  --dsw-alias-bg-overlay: #e3d9f8;\n  --dsw-alias-bg-module-platform: #e3d9f8;\n  --dsw-alias-bg-multi-select: #e3d9f8;\n  --dsw-alias-bg-skeleton: rgba(36, 27, 58, 0.060);\n  --dsw-alias-border-l1: rgba(36, 27, 58, 0.055);\n  --dsw-alias-border-l2: rgba(36,27,58,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(36,27,58,0.10);\n  --dsw-alias-border-l3: rgba(36, 27, 58, 0.160);\n  --dsw-alias-border-l4: rgba(36, 27, 58, 0.220);\n  --dsw-alias-border-inverted: rgba(36, 27, 58, 0.080);\n  --dsw-alias-border-inverted2: rgba(36, 27, 58, 0.080);\n  --dsw-alias-brand-primary: #8b5cf6;\n  --dsw-alias-brand-primary-invert: #241b3a;\n  --dsw-alias-brand-text: #241b3a;\n  --dsw-alias-button-primary-fill: #8b5cf6;\n  --dsw-alias-button-primary-hover: #7c3aed;\n  --dsw-alias-button-primary-dimmed: rgba(139, 92, 246, 0.140);\n  --dsw-alias-button-info-fill: #8b5cf6;\n  --dsw-alias-button-info-hover: #7c3aed;\n  --dsw-alias-button-contrast-fill: #241b3a;\n  --dsw-alias-button-elevated-fill: #fbf9ff;\n  --dsw-alias-button-floating-fill: #fbf9ff;\n  --dsw-alias-button-floating-hover: #e3d9f8;\n  --dsw-alias-button-ghost-active-fill: #e3d9f8;\n  --dsw-alias-button-ghost-active-hover: #e3d9f8;\n  --dsw-alias-button-ghost-active-border: #8578a8;\n  --dsw-alias-button-tool-bar-fill: rgba(36, 27, 58, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(36, 27, 58, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(36, 27, 58, 0.280);\n  --dsw-alias-label-primary: #241b3a;\n  --dsw-alias-label-secondary: #5b4f80;\n  --dsw-alias-label-tertiary: #8578a8;\n  --dsw-alias-label-caption: #8578a8;\n  --dsw-alias-label-dimmed: rgba(36, 27, 58, 0.450);\n  --dsw-alias-label-primary-bluish: #241b3a;\n  --dsw-alias-label-primary-dimmed: #241b3a;\n  --dsw-alias-label-primary-foreground: #0c0420;\n  --dsw-alias-label-primary-inverted: #0c0420;\n  --dsw-alias-interactive-bg-hover: rgba(36, 27, 58, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(36, 27, 58, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(139, 92, 246, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e3d9f8;\n  --dsw-alias-markdown-code-block: #e8e1f9;\n  --dsw-alias-markdown-code-block-banner: #ded4f5;\n  --dsw-alias-markdown-inline-code: #e8e1f9;\n  --dsw-alias-markdown-code-segment-selected: #ded4f5;\n  --dsw-alias-markdown-code-segment-unselected: #e8e1f9;\n  --dsw-alias-markdown-citation: #e3d9f8;\n  --dsw-alias-markdown-placeholder: #e3d9f8;\n  --dsw-alias-markdown-tag: #e3d9f8;\n  --dsw-alias-state-business-primary: #8b5cf6;\n  --dsw-alias-state-business-tertiary: rgba(139, 92, 246, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(36, 27, 58, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(36, 27, 58, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(36, 27, 58, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(36, 27, 58, 0.220);\n  --dsw-alias-toast-bg: #241b3a;\n  --dsw-alias-tooltip-bg: #241b3a;\n  --dsw-specific-bubble: #e8e1f9;\n  --dsw-specific-bubble-highlight: rgba(139, 92, 246, 0.120);\n  --dsw-specific-input-major: #fbf9ff;\n  --dsw-specific-login-input: #e3d9f8;\n  --dsw-specific-menu: #fbf9ff;\n  --dsw-specific-selector: #e3d9f8;\n  --dsw-specific-sidebar-fill: #e9e2fa;\n  --dsw-specific-sidebar-nav-item-active: rgba(36, 27, 58, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(139, 92, 246, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(36, 27, 58, 0.050);\n  --dsw-specific-tip: #e3d9f8;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(239, 232, 252) 20.19%, rgba(239, 232, 252, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(227, 217, 248) 20.19%, rgba(227, 217, 248, 0) 100%);\n}\nbody[data-dsh-theme=\"lavender\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #131024;\n  --dsw-alias-bg-layer-1: #1a1630;\n  --dsw-alias-bg-layer-2: #1a1630;\n  --dsw-alias-bg-layer-3: #231d40;\n  --dsw-alias-bg-overlay: #231d40;\n  --dsw-alias-bg-module-platform: #231d40;\n  --dsw-alias-bg-multi-select: #231d40;\n  --dsw-alias-bg-skeleton: rgba(237, 232, 255, 0.080);\n  --dsw-alias-border-l1: rgba(237, 232, 255, 0.055);\n  --dsw-alias-border-l2: rgba(237,232,255,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(237,232,255,0.10);\n  --dsw-alias-border-l3: rgba(237, 232, 255, 0.160);\n  --dsw-alias-border-l4: rgba(237, 232, 255, 0.220);\n  --dsw-alias-border-inverted: rgba(237, 232, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(237, 232, 255, 0.120);\n  --dsw-alias-brand-primary: #a78bfa;\n  --dsw-alias-brand-primary-invert: #ede8ff;\n  --dsw-alias-brand-text: #ede8ff;\n  --dsw-alias-button-primary-fill: #a78bfa;\n  --dsw-alias-button-primary-hover: #c4b5fd;\n  --dsw-alias-button-primary-dimmed: rgba(167, 139, 250, 0.140);\n  --dsw-alias-button-info-fill: #a78bfa;\n  --dsw-alias-button-info-hover: #c4b5fd;\n  --dsw-alias-button-contrast-fill: #ede8ff;\n  --dsw-alias-button-elevated-fill: #1a1630;\n  --dsw-alias-button-floating-fill: #1a1630;\n  --dsw-alias-button-floating-hover: #231d40;\n  --dsw-alias-button-ghost-active-fill: #231d40;\n  --dsw-alias-button-ghost-active-hover: #231d40;\n  --dsw-alias-button-ghost-active-border: #7d73a6;\n  --dsw-alias-button-tool-bar-fill: rgba(237, 232, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(237, 232, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(237, 232, 255, 0.280);\n  --dsw-alias-label-primary: #ede8ff;\n  --dsw-alias-label-secondary: #b0a5dc;\n  --dsw-alias-label-tertiary: #7d73a6;\n  --dsw-alias-label-caption: #7d73a6;\n  --dsw-alias-label-dimmed: rgba(237, 232, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #ede8ff;\n  --dsw-alias-label-primary-dimmed: #ede8ff;\n  --dsw-alias-label-primary-foreground: #0c0420;\n  --dsw-alias-label-primary-inverted: #0c0420;\n  --dsw-alias-interactive-bg-hover: rgba(237, 232, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(237, 232, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(167, 139, 250, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(251, 113, 133, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #231d40;\n  --dsw-alias-markdown-code-block: #161228;\n  --dsw-alias-markdown-code-block-banner: #1d1835;\n  --dsw-alias-markdown-inline-code: #161228;\n  --dsw-alias-markdown-code-segment-selected: #1d1835;\n  --dsw-alias-markdown-code-segment-unselected: #161228;\n  --dsw-alias-markdown-citation: #231d40;\n  --dsw-alias-markdown-placeholder: #231d40;\n  --dsw-alias-markdown-tag: #231d40;\n  --dsw-alias-state-business-primary: #a78bfa;\n  --dsw-alias-state-business-tertiary: rgba(167, 139, 250, 0.140);\n  --dsw-alias-state-error-primary: #fb7185;\n  --dsw-alias-state-error-secondary: rgba(251, 113, 133, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(237, 232, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(237, 232, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(237, 232, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(237, 232, 255, 0.220);\n  --dsw-alias-toast-bg: #ede8ff;\n  --dsw-alias-tooltip-bg: #ede8ff;\n  --dsw-specific-bubble: #161228;\n  --dsw-specific-bubble-highlight: rgba(167, 139, 250, 0.120);\n  --dsw-specific-input-major: #1a1630;\n  --dsw-specific-login-input: #231d40;\n  --dsw-specific-menu: #1a1630;\n  --dsw-specific-selector: #231d40;\n  --dsw-specific-sidebar-fill: #151126;\n  --dsw-specific-sidebar-nav-item-active: rgba(237, 232, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(167, 139, 250, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(237, 232, 255, 0.050);\n  --dsw-specific-tip: #231d40;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(19, 16, 36) 20.19%, rgba(19, 16, 36, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(35, 29, 64) 20.19%, rgba(35, 29, 64, 0) 100%);\n}\nbody[data-dsh-theme=\"lavender\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"lavender\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"charcoal","name":"Charcoal","nameZh":"煤灰","desc":"Honest grays, no color to distract.","descZh":"诚实的灰，不打扰你的专注。","swatch":{"light":["#f4f4f4","#ffffff","#333333","#181818"],"dark":["#131313","#1a1a1a","#d4d4d4","#e8e8e8"]},"css":"/* Charcoal (煤灰) — dsh-theme */\nbody[data-dsh-theme=\"charcoal\"]{\n  --dsw-alias-bg-base: #f4f4f4;\n  --dsw-alias-bg-layer-1: #ffffff;\n  --dsw-alias-bg-layer-2: #ffffff;\n  --dsw-alias-bg-layer-3: #e9e9e9;\n  --dsw-alias-bg-overlay: #e9e9e9;\n  --dsw-alias-bg-module-platform: #e9e9e9;\n  --dsw-alias-bg-multi-select: #e9e9e9;\n  --dsw-alias-bg-skeleton: rgba(24, 24, 24, 0.060);\n  --dsw-alias-border-l1: rgba(24, 24, 24, 0.055);\n  --dsw-alias-border-l2: rgba(24,24,24,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(24,24,24,0.10);\n  --dsw-alias-border-l3: rgba(24, 24, 24, 0.160);\n  --dsw-alias-border-l4: rgba(24, 24, 24, 0.220);\n  --dsw-alias-border-inverted: rgba(24, 24, 24, 0.080);\n  --dsw-alias-border-inverted2: rgba(24, 24, 24, 0.080);\n  --dsw-alias-brand-primary: #333333;\n  --dsw-alias-brand-primary-invert: #181818;\n  --dsw-alias-brand-text: #181818;\n  --dsw-alias-button-primary-fill: #333333;\n  --dsw-alias-button-primary-hover: #262626;\n  --dsw-alias-button-primary-dimmed: rgba(51, 51, 51, 0.140);\n  --dsw-alias-button-info-fill: #333333;\n  --dsw-alias-button-info-hover: #262626;\n  --dsw-alias-button-contrast-fill: #181818;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #e9e9e9;\n  --dsw-alias-button-ghost-active-fill: #e9e9e9;\n  --dsw-alias-button-ghost-active-hover: #e9e9e9;\n  --dsw-alias-button-ghost-active-border: #7d7d7d;\n  --dsw-alias-button-tool-bar-fill: rgba(24, 24, 24, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(24, 24, 24, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(24, 24, 24, 0.280);\n  --dsw-alias-label-primary: #181818;\n  --dsw-alias-label-secondary: #4d4d4d;\n  --dsw-alias-label-tertiary: #7d7d7d;\n  --dsw-alias-label-caption: #7d7d7d;\n  --dsw-alias-label-dimmed: rgba(24, 24, 24, 0.450);\n  --dsw-alias-label-primary-bluish: #181818;\n  --dsw-alias-label-primary-dimmed: #181818;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(24, 24, 24, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(24, 24, 24, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(51, 51, 51, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #e9e9e9;\n  --dsw-alias-markdown-code-block: #ebebeb;\n  --dsw-alias-markdown-code-block-banner: #e3e3e3;\n  --dsw-alias-markdown-inline-code: #ebebeb;\n  --dsw-alias-markdown-code-segment-selected: #e3e3e3;\n  --dsw-alias-markdown-code-segment-unselected: #ebebeb;\n  --dsw-alias-markdown-citation: #e9e9e9;\n  --dsw-alias-markdown-placeholder: #e9e9e9;\n  --dsw-alias-markdown-tag: #e9e9e9;\n  --dsw-alias-state-business-primary: #333333;\n  --dsw-alias-state-business-tertiary: rgba(51, 51, 51, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(24, 24, 24, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(24, 24, 24, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(24, 24, 24, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(24, 24, 24, 0.220);\n  --dsw-alias-toast-bg: #181818;\n  --dsw-alias-tooltip-bg: #181818;\n  --dsw-specific-bubble: #ebebeb;\n  --dsw-specific-bubble-highlight: rgba(51, 51, 51, 0.120);\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-login-input: #e9e9e9;\n  --dsw-specific-menu: #ffffff;\n  --dsw-specific-selector: #e9e9e9;\n  --dsw-specific-sidebar-fill: #ebebeb;\n  --dsw-specific-sidebar-nav-item-active: rgba(24, 24, 24, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(51, 51, 51, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(24, 24, 24, 0.050);\n  --dsw-specific-tip: #e9e9e9;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(244, 244, 244) 20.19%, rgba(244, 244, 244, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(233, 233, 233) 20.19%, rgba(233, 233, 233, 0) 100%);\n}\nbody[data-dsh-theme=\"charcoal\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #131313;\n  --dsw-alias-bg-layer-1: #1a1a1a;\n  --dsw-alias-bg-layer-2: #1a1a1a;\n  --dsw-alias-bg-layer-3: #232323;\n  --dsw-alias-bg-overlay: #232323;\n  --dsw-alias-bg-module-platform: #232323;\n  --dsw-alias-bg-multi-select: #232323;\n  --dsw-alias-bg-skeleton: rgba(232, 232, 232, 0.080);\n  --dsw-alias-border-l1: rgba(232, 232, 232, 0.055);\n  --dsw-alias-border-l2: rgba(232,232,232,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(232,232,232,0.10);\n  --dsw-alias-border-l3: rgba(232, 232, 232, 0.160);\n  --dsw-alias-border-l4: rgba(232, 232, 232, 0.220);\n  --dsw-alias-border-inverted: rgba(232, 232, 232, 0.120);\n  --dsw-alias-border-inverted2: rgba(232, 232, 232, 0.120);\n  --dsw-alias-brand-primary: #d4d4d4;\n  --dsw-alias-brand-primary-invert: #e8e8e8;\n  --dsw-alias-brand-text: #e8e8e8;\n  --dsw-alias-button-primary-fill: #d4d4d4;\n  --dsw-alias-button-primary-hover: #f0f0f0;\n  --dsw-alias-button-primary-dimmed: rgba(212, 212, 212, 0.140);\n  --dsw-alias-button-info-fill: #d4d4d4;\n  --dsw-alias-button-info-hover: #f0f0f0;\n  --dsw-alias-button-contrast-fill: #e8e8e8;\n  --dsw-alias-button-elevated-fill: #1a1a1a;\n  --dsw-alias-button-floating-fill: #1a1a1a;\n  --dsw-alias-button-floating-hover: #232323;\n  --dsw-alias-button-ghost-active-fill: #232323;\n  --dsw-alias-button-ghost-active-hover: #232323;\n  --dsw-alias-button-ghost-active-border: #6d6d6d;\n  --dsw-alias-button-tool-bar-fill: rgba(232, 232, 232, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(232, 232, 232, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(232, 232, 232, 0.280);\n  --dsw-alias-label-primary: #e8e8e8;\n  --dsw-alias-label-secondary: #9e9e9e;\n  --dsw-alias-label-tertiary: #6d6d6d;\n  --dsw-alias-label-caption: #6d6d6d;\n  --dsw-alias-label-dimmed: rgba(232, 232, 232, 0.450);\n  --dsw-alias-label-primary-bluish: #e8e8e8;\n  --dsw-alias-label-primary-dimmed: #e8e8e8;\n  --dsw-alias-label-primary-foreground: #131313;\n  --dsw-alias-label-primary-inverted: #131313;\n  --dsw-alias-interactive-bg-hover: rgba(232, 232, 232, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(232, 232, 232, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(212, 212, 212, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #232323;\n  --dsw-alias-markdown-code-block: #171717;\n  --dsw-alias-markdown-code-block-banner: #1f1f1f;\n  --dsw-alias-markdown-inline-code: #171717;\n  --dsw-alias-markdown-code-segment-selected: #1f1f1f;\n  --dsw-alias-markdown-code-segment-unselected: #171717;\n  --dsw-alias-markdown-citation: #232323;\n  --dsw-alias-markdown-placeholder: #232323;\n  --dsw-alias-markdown-tag: #232323;\n  --dsw-alias-state-business-primary: #d4d4d4;\n  --dsw-alias-state-business-tertiary: rgba(212, 212, 212, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(232, 232, 232, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(232, 232, 232, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(232, 232, 232, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(232, 232, 232, 0.220);\n  --dsw-alias-toast-bg: #e8e8e8;\n  --dsw-alias-tooltip-bg: #e8e8e8;\n  --dsw-specific-bubble: #171717;\n  --dsw-specific-bubble-highlight: rgba(212, 212, 212, 0.120);\n  --dsw-specific-input-major: #1a1a1a;\n  --dsw-specific-login-input: #232323;\n  --dsw-specific-menu: #1a1a1a;\n  --dsw-specific-selector: #232323;\n  --dsw-specific-sidebar-fill: #151515;\n  --dsw-specific-sidebar-nav-item-active: rgba(232, 232, 232, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(212, 212, 212, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(232, 232, 232, 0.050);\n  --dsw-specific-tip: #232323;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(19, 19, 19) 20.19%, rgba(19, 19, 19, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(35, 35, 35) 20.19%, rgba(35, 35, 35, 0) 100%);\n}\nbody[data-dsh-theme=\"charcoal\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"charcoal\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"rose","name":"Rose","nameZh":"玫瑰","desc":"Deep maroon velvet with blush petals.","descZh":"深酒红的天鹅绒，缀着浅绯花瓣。","swatch":{"light":["#f7dce2","#fbf2f4","#be123c","#331421"],"dark":["#190b12","#221019","#fb7185","#fdecf2"]},"css":"/* Rose (玫瑰) — dsh-theme */\nbody[data-dsh-theme=\"rose\"]{\n  --dsw-alias-bg-base: #f7dce2;\n  --dsw-alias-bg-layer-1: #fbf2f4;\n  --dsw-alias-bg-layer-2: #fbf2f4;\n  --dsw-alias-bg-layer-3: #f1cbd4;\n  --dsw-alias-bg-overlay: #f1cbd4;\n  --dsw-alias-bg-module-platform: #f1cbd4;\n  --dsw-alias-bg-multi-select: #f1cbd4;\n  --dsw-alias-bg-skeleton: rgba(51, 20, 33, 0.060);\n  --dsw-alias-border-l1: rgba(51, 20, 33, 0.055);\n  --dsw-alias-border-l2: rgba(51,20,33,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(51,20,33,0.10);\n  --dsw-alias-border-l3: rgba(51, 20, 33, 0.160);\n  --dsw-alias-border-l4: rgba(51, 20, 33, 0.220);\n  --dsw-alias-border-inverted: rgba(51, 20, 33, 0.080);\n  --dsw-alias-border-inverted2: rgba(51, 20, 33, 0.080);\n  --dsw-alias-brand-primary: #be123c;\n  --dsw-alias-brand-primary-invert: #331421;\n  --dsw-alias-brand-text: #331421;\n  --dsw-alias-button-primary-fill: #be123c;\n  --dsw-alias-button-primary-hover: #9f1239;\n  --dsw-alias-button-primary-dimmed: rgba(190, 18, 60, 0.140);\n  --dsw-alias-button-info-fill: #be123c;\n  --dsw-alias-button-info-hover: #9f1239;\n  --dsw-alias-button-contrast-fill: #331421;\n  --dsw-alias-button-elevated-fill: #fbf2f4;\n  --dsw-alias-button-floating-fill: #fbf2f4;\n  --dsw-alias-button-floating-hover: #f1cbd4;\n  --dsw-alias-button-ghost-active-fill: #f1cbd4;\n  --dsw-alias-button-ghost-active-hover: #f1cbd4;\n  --dsw-alias-button-ghost-active-border: #a57589;\n  --dsw-alias-button-tool-bar-fill: rgba(51, 20, 33, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(51, 20, 33, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(51, 20, 33, 0.280);\n  --dsw-alias-label-primary: #331421;\n  --dsw-alias-label-secondary: #7a4a5c;\n  --dsw-alias-label-tertiary: #a57589;\n  --dsw-alias-label-caption: #a57589;\n  --dsw-alias-label-dimmed: rgba(51, 20, 33, 0.450);\n  --dsw-alias-label-primary-bluish: #331421;\n  --dsw-alias-label-primary-dimmed: #331421;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(51, 20, 33, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(51, 20, 33, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(190, 18, 60, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f1cbd4;\n  --dsw-alias-markdown-code-block: #f5dce2;\n  --dsw-alias-markdown-code-block-banner: #efcbd5;\n  --dsw-alias-markdown-inline-code: #f5dce2;\n  --dsw-alias-markdown-code-segment-selected: #efcbd5;\n  --dsw-alias-markdown-code-segment-unselected: #f5dce2;\n  --dsw-alias-markdown-citation: #f1cbd4;\n  --dsw-alias-markdown-placeholder: #f1cbd4;\n  --dsw-alias-markdown-tag: #f1cbd4;\n  --dsw-alias-state-business-primary: #be123c;\n  --dsw-alias-state-business-tertiary: rgba(190, 18, 60, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(51, 20, 33, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(51, 20, 33, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(51, 20, 33, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(51, 20, 33, 0.220);\n  --dsw-alias-toast-bg: #331421;\n  --dsw-alias-tooltip-bg: #331421;\n  --dsw-specific-bubble: #f5dce2;\n  --dsw-specific-bubble-highlight: rgba(190, 18, 60, 0.120);\n  --dsw-specific-input-major: #fbf2f4;\n  --dsw-specific-login-input: #f1cbd4;\n  --dsw-specific-menu: #fbf2f4;\n  --dsw-specific-selector: #f1cbd4;\n  --dsw-specific-sidebar-fill: #f5dce2;\n  --dsw-specific-sidebar-nav-item-active: rgba(51, 20, 33, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(190, 18, 60, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(51, 20, 33, 0.050);\n  --dsw-specific-tip: #f1cbd4;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(247, 220, 226) 20.19%, rgba(247, 220, 226, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(241, 203, 212) 20.19%, rgba(241, 203, 212, 0) 100%);\n}\nbody[data-dsh-theme=\"rose\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #190b12;\n  --dsw-alias-bg-layer-1: #221019;\n  --dsw-alias-bg-layer-2: #221019;\n  --dsw-alias-bg-layer-3: #2e1722;\n  --dsw-alias-bg-overlay: #2e1722;\n  --dsw-alias-bg-module-platform: #2e1722;\n  --dsw-alias-bg-multi-select: #2e1722;\n  --dsw-alias-bg-skeleton: rgba(253, 236, 242, 0.080);\n  --dsw-alias-border-l1: rgba(253, 236, 242, 0.055);\n  --dsw-alias-border-l2: rgba(253,236,242,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(253,236,242,0.10);\n  --dsw-alias-border-l3: rgba(253, 236, 242, 0.160);\n  --dsw-alias-border-l4: rgba(253, 236, 242, 0.220);\n  --dsw-alias-border-inverted: rgba(253, 236, 242, 0.120);\n  --dsw-alias-border-inverted2: rgba(253, 236, 242, 0.120);\n  --dsw-alias-brand-primary: #fb7185;\n  --dsw-alias-brand-primary-invert: #fdecf2;\n  --dsw-alias-brand-text: #fdecf2;\n  --dsw-alias-button-primary-fill: #fb7185;\n  --dsw-alias-button-primary-hover: #fda4af;\n  --dsw-alias-button-primary-dimmed: rgba(251, 113, 133, 0.140);\n  --dsw-alias-button-info-fill: #fb7185;\n  --dsw-alias-button-info-hover: #fda4af;\n  --dsw-alias-button-contrast-fill: #fdecf2;\n  --dsw-alias-button-elevated-fill: #221019;\n  --dsw-alias-button-floating-fill: #221019;\n  --dsw-alias-button-floating-hover: #2e1722;\n  --dsw-alias-button-ghost-active-fill: #2e1722;\n  --dsw-alias-button-ghost-active-hover: #2e1722;\n  --dsw-alias-button-ghost-active-border: #9d6b82;\n  --dsw-alias-button-tool-bar-fill: rgba(253, 236, 242, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(253, 236, 242, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(253, 236, 242, 0.280);\n  --dsw-alias-label-primary: #fdecf2;\n  --dsw-alias-label-secondary: #d19ab0;\n  --dsw-alias-label-tertiary: #9d6b82;\n  --dsw-alias-label-caption: #9d6b82;\n  --dsw-alias-label-dimmed: rgba(253, 236, 242, 0.450);\n  --dsw-alias-label-primary-bluish: #fdecf2;\n  --dsw-alias-label-primary-dimmed: #fdecf2;\n  --dsw-alias-label-primary-foreground: #2a0a14;\n  --dsw-alias-label-primary-inverted: #2a0a14;\n  --dsw-alias-interactive-bg-hover: rgba(253, 236, 242, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(253, 236, 242, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(251, 113, 133, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #2e1722;\n  --dsw-alias-markdown-code-block: #1d0e16;\n  --dsw-alias-markdown-code-block-banner: #271320;\n  --dsw-alias-markdown-inline-code: #1d0e16;\n  --dsw-alias-markdown-code-segment-selected: #271320;\n  --dsw-alias-markdown-code-segment-unselected: #1d0e16;\n  --dsw-alias-markdown-citation: #2e1722;\n  --dsw-alias-markdown-placeholder: #2e1722;\n  --dsw-alias-markdown-tag: #2e1722;\n  --dsw-alias-state-business-primary: #fb7185;\n  --dsw-alias-state-business-tertiary: rgba(251, 113, 133, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(253, 236, 242, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(253, 236, 242, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(253, 236, 242, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(253, 236, 242, 0.220);\n  --dsw-alias-toast-bg: #fdecf2;\n  --dsw-alias-tooltip-bg: #fdecf2;\n  --dsw-specific-bubble: #1d0e16;\n  --dsw-specific-bubble-highlight: rgba(251, 113, 133, 0.120);\n  --dsw-specific-input-major: #221019;\n  --dsw-specific-login-input: #2e1722;\n  --dsw-specific-menu: #221019;\n  --dsw-specific-selector: #2e1722;\n  --dsw-specific-sidebar-fill: #1b0d14;\n  --dsw-specific-sidebar-nav-item-active: rgba(253, 236, 242, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(251, 113, 133, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(253, 236, 242, 0.050);\n  --dsw-specific-tip: #2e1722;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(25, 11, 18) 20.19%, rgba(25, 11, 18, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(46, 23, 34) 20.19%, rgba(46, 23, 34, 0) 100%);\n}\nbody[data-dsh-theme=\"rose\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"rose\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"wave","name":"Wave","nameZh":"碧波","desc":"Teal water, clear and alive.","descZh":"青碧的水波，清澈灵动。","swatch":{"light":["#d0ede9","#eef7f6","#0d9488","#0c2b26"],"dark":["#081412","#0d1d1a","#2dd4bf","#ddf3ef"]},"css":"/* Wave (碧波) — dsh-theme */\nbody[data-dsh-theme=\"wave\"]{\n  --dsw-alias-bg-base: #d0ede9;\n  --dsw-alias-bg-layer-1: #eef7f6;\n  --dsw-alias-bg-layer-2: #eef7f6;\n  --dsw-alias-bg-layer-3: #bce4de;\n  --dsw-alias-bg-overlay: #bce4de;\n  --dsw-alias-bg-module-platform: #bce4de;\n  --dsw-alias-bg-multi-select: #bce4de;\n  --dsw-alias-bg-skeleton: rgba(12, 43, 38, 0.060);\n  --dsw-alias-border-l1: rgba(12, 43, 38, 0.055);\n  --dsw-alias-border-l2: rgba(12,43,38,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(12,43,38,0.10);\n  --dsw-alias-border-l3: rgba(12, 43, 38, 0.160);\n  --dsw-alias-border-l4: rgba(12, 43, 38, 0.220);\n  --dsw-alias-border-inverted: rgba(12, 43, 38, 0.080);\n  --dsw-alias-border-inverted2: rgba(12, 43, 38, 0.080);\n  --dsw-alias-brand-primary: #0d9488;\n  --dsw-alias-brand-primary-invert: #0c2b26;\n  --dsw-alias-brand-text: #0c2b26;\n  --dsw-alias-button-primary-fill: #0d9488;\n  --dsw-alias-button-primary-hover: #0f766e;\n  --dsw-alias-button-primary-dimmed: rgba(13, 148, 136, 0.140);\n  --dsw-alias-button-info-fill: #0d9488;\n  --dsw-alias-button-info-hover: #0f766e;\n  --dsw-alias-button-contrast-fill: #0c2b26;\n  --dsw-alias-button-elevated-fill: #eef7f6;\n  --dsw-alias-button-floating-fill: #eef7f6;\n  --dsw-alias-button-floating-hover: #bce4de;\n  --dsw-alias-button-ghost-active-fill: #bce4de;\n  --dsw-alias-button-ghost-active-hover: #bce4de;\n  --dsw-alias-button-ghost-active-border: #6d9189;\n  --dsw-alias-button-tool-bar-fill: rgba(12, 43, 38, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(12, 43, 38, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(12, 43, 38, 0.280);\n  --dsw-alias-label-primary: #0c2b26;\n  --dsw-alias-label-secondary: #3d645d;\n  --dsw-alias-label-tertiary: #6d9189;\n  --dsw-alias-label-caption: #6d9189;\n  --dsw-alias-label-dimmed: rgba(12, 43, 38, 0.450);\n  --dsw-alias-label-primary-bluish: #0c2b26;\n  --dsw-alias-label-primary-dimmed: #0c2b26;\n  --dsw-alias-label-primary-foreground: #001a15;\n  --dsw-alias-label-primary-inverted: #001a15;\n  --dsw-alias-interactive-bg-hover: rgba(12, 43, 38, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(12, 43, 38, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(13, 148, 136, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(220, 38, 38, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #bce4de;\n  --dsw-alias-markdown-code-block: #d0ede7;\n  --dsw-alias-markdown-code-block-banner: #bee4dd;\n  --dsw-alias-markdown-inline-code: #d0ede7;\n  --dsw-alias-markdown-code-segment-selected: #bee4dd;\n  --dsw-alias-markdown-code-segment-unselected: #d0ede7;\n  --dsw-alias-markdown-citation: #bce4de;\n  --dsw-alias-markdown-placeholder: #bce4de;\n  --dsw-alias-markdown-tag: #bce4de;\n  --dsw-alias-state-business-primary: #0d9488;\n  --dsw-alias-state-business-tertiary: rgba(13, 148, 136, 0.140);\n  --dsw-alias-state-error-primary: #dc2626;\n  --dsw-alias-state-error-secondary: rgba(220, 38, 38, 0.750);\n  --dsw-alias-state-success-primary: #15803d;\n  --dsw-alias-state-success-secondary: #15803d;\n  --dsw-alias-state-success-tertiary: rgba(21, 128, 61, 0.140);\n  --dsw-alias-state-warn-primary: #b45309;\n  --dsw-alias-state-warn-secondary: #b45309;\n  --dsw-alias-state-warn-tertiary: rgba(180, 83, 9, 0.160);\n  --dsw-alias-state-warn-label: #b45309;\n  --dsw-alias-scrollbar-bg-l1: rgba(12, 43, 38, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(12, 43, 38, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(12, 43, 38, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(12, 43, 38, 0.220);\n  --dsw-alias-toast-bg: #0c2b26;\n  --dsw-alias-tooltip-bg: #0c2b26;\n  --dsw-specific-bubble: #d0ede7;\n  --dsw-specific-bubble-highlight: rgba(13, 148, 136, 0.120);\n  --dsw-specific-input-major: #eef7f6;\n  --dsw-specific-login-input: #bce4de;\n  --dsw-specific-menu: #eef7f6;\n  --dsw-specific-selector: #bce4de;\n  --dsw-specific-sidebar-fill: #cfece7;\n  --dsw-specific-sidebar-nav-item-active: rgba(12, 43, 38, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(13, 148, 136, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(12, 43, 38, 0.050);\n  --dsw-specific-tip: #bce4de;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(208, 237, 233) 20.19%, rgba(208, 237, 233, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(188, 228, 222) 20.19%, rgba(188, 228, 222, 0) 100%);\n}\nbody[data-dsh-theme=\"wave\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #081412;\n  --dsw-alias-bg-layer-1: #0d1d1a;\n  --dsw-alias-bg-layer-2: #0d1d1a;\n  --dsw-alias-bg-layer-3: #142822;\n  --dsw-alias-bg-overlay: #142822;\n  --dsw-alias-bg-module-platform: #142822;\n  --dsw-alias-bg-multi-select: #142822;\n  --dsw-alias-bg-skeleton: rgba(221, 243, 239, 0.080);\n  --dsw-alias-border-l1: rgba(221, 243, 239, 0.055);\n  --dsw-alias-border-l2: rgba(221,243,239,0.10);\n  --dsw-alias-border-l2-darkmode-thin: rgba(221,243,239,0.10);\n  --dsw-alias-border-l3: rgba(221, 243, 239, 0.160);\n  --dsw-alias-border-l4: rgba(221, 243, 239, 0.220);\n  --dsw-alias-border-inverted: rgba(221, 243, 239, 0.120);\n  --dsw-alias-border-inverted2: rgba(221, 243, 239, 0.120);\n  --dsw-alias-brand-primary: #2dd4bf;\n  --dsw-alias-brand-primary-invert: #ddf3ef;\n  --dsw-alias-brand-text: #ddf3ef;\n  --dsw-alias-button-primary-fill: #2dd4bf;\n  --dsw-alias-button-primary-hover: #5eead4;\n  --dsw-alias-button-primary-dimmed: rgba(45, 212, 191, 0.140);\n  --dsw-alias-button-info-fill: #2dd4bf;\n  --dsw-alias-button-info-hover: #5eead4;\n  --dsw-alias-button-contrast-fill: #ddf3ef;\n  --dsw-alias-button-elevated-fill: #0d1d1a;\n  --dsw-alias-button-floating-fill: #0d1d1a;\n  --dsw-alias-button-floating-hover: #142822;\n  --dsw-alias-button-ghost-active-fill: #142822;\n  --dsw-alias-button-ghost-active-hover: #142822;\n  --dsw-alias-button-ghost-active-border: #5d8a81;\n  --dsw-alias-button-tool-bar-fill: rgba(221, 243, 239, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(221, 243, 239, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(221, 243, 239, 0.280);\n  --dsw-alias-label-primary: #ddf3ef;\n  --dsw-alias-label-secondary: #8dbfb5;\n  --dsw-alias-label-tertiary: #5d8a81;\n  --dsw-alias-label-caption: #5d8a81;\n  --dsw-alias-label-dimmed: rgba(221, 243, 239, 0.450);\n  --dsw-alias-label-primary-bluish: #ddf3ef;\n  --dsw-alias-label-primary-dimmed: #ddf3ef;\n  --dsw-alias-label-primary-foreground: #001a15;\n  --dsw-alias-label-primary-inverted: #001a15;\n  --dsw-alias-interactive-bg-hover: rgba(221, 243, 239, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(221, 243, 239, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(45, 212, 191, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #142822;\n  --dsw-alias-markdown-code-block: #0a1815;\n  --dsw-alias-markdown-code-block-banner: #10211d;\n  --dsw-alias-markdown-inline-code: #0a1815;\n  --dsw-alias-markdown-code-segment-selected: #10211d;\n  --dsw-alias-markdown-code-segment-unselected: #0a1815;\n  --dsw-alias-markdown-citation: #142822;\n  --dsw-alias-markdown-placeholder: #142822;\n  --dsw-alias-markdown-tag: #142822;\n  --dsw-alias-state-business-primary: #2dd4bf;\n  --dsw-alias-state-business-tertiary: rgba(45, 212, 191, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(221, 243, 239, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(221, 243, 239, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(221, 243, 239, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(221, 243, 239, 0.220);\n  --dsw-alias-toast-bg: #ddf3ef;\n  --dsw-alias-tooltip-bg: #ddf3ef;\n  --dsw-specific-bubble: #0a1815;\n  --dsw-specific-bubble-highlight: rgba(45, 212, 191, 0.120);\n  --dsw-specific-input-major: #0d1d1a;\n  --dsw-specific-login-input: #142822;\n  --dsw-specific-menu: #0d1d1a;\n  --dsw-specific-selector: #142822;\n  --dsw-specific-sidebar-fill: #091613;\n  --dsw-specific-sidebar-nav-item-active: rgba(221, 243, 239, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(45, 212, 191, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(221, 243, 239, 0.050);\n  --dsw-specific-tip: #142822;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(8, 20, 18) 20.19%, rgba(8, 20, 18, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(20, 40, 34) 20.19%, rgba(20, 40, 34, 0) 100%);\n}\nbody[data-dsh-theme=\"wave\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"wave\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"},{"id":"mono","name":"Mono","nameZh":"极简","desc":"Strict monochrome, maximal focus.","descZh":"严格单色，极致专注。","swatch":{"light":["#ffffff","#ffffff","#000000","#000000"],"dark":["#000000","#0c0c0c","#ffffff","#ffffff"]},"css":"/* Mono (极简) — dsh-theme */\nbody[data-dsh-theme=\"mono\"]{\n  --dsw-alias-bg-base: #ffffff;\n  --dsw-alias-bg-layer-1: #ffffff;\n  --dsw-alias-bg-layer-2: #ffffff;\n  --dsw-alias-bg-layer-3: #f2f2f2;\n  --dsw-alias-bg-overlay: #f2f2f2;\n  --dsw-alias-bg-module-platform: #f2f2f2;\n  --dsw-alias-bg-multi-select: #f2f2f2;\n  --dsw-alias-bg-skeleton: rgba(0, 0, 0, 0.060);\n  --dsw-alias-border-l1: rgba(0, 0, 0, 0.066);\n  --dsw-alias-border-l2: rgba(0,0,0,0.12);\n  --dsw-alias-border-l2-darkmode-thin: rgba(0,0,0,0.12);\n  --dsw-alias-border-l3: rgba(0, 0, 0, 0.192);\n  --dsw-alias-border-l4: rgba(0, 0, 0, 0.264);\n  --dsw-alias-border-inverted: rgba(0, 0, 0, 0.080);\n  --dsw-alias-border-inverted2: rgba(0, 0, 0, 0.080);\n  --dsw-alias-brand-primary: #000000;\n  --dsw-alias-brand-primary-invert: #000000;\n  --dsw-alias-brand-text: #000000;\n  --dsw-alias-button-primary-fill: #000000;\n  --dsw-alias-button-primary-hover: #333333;\n  --dsw-alias-button-primary-dimmed: rgba(0, 0, 0, 0.140);\n  --dsw-alias-button-info-fill: #000000;\n  --dsw-alias-button-info-hover: #333333;\n  --dsw-alias-button-contrast-fill: #000000;\n  --dsw-alias-button-elevated-fill: #ffffff;\n  --dsw-alias-button-floating-fill: #ffffff;\n  --dsw-alias-button-floating-hover: #f2f2f2;\n  --dsw-alias-button-ghost-active-fill: #f2f2f2;\n  --dsw-alias-button-ghost-active-hover: #f2f2f2;\n  --dsw-alias-button-ghost-active-border: #8c8c8c;\n  --dsw-alias-button-tool-bar-fill: rgba(0, 0, 0, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(0, 0, 0, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(0, 0, 0, 0.280);\n  --dsw-alias-label-primary: #000000;\n  --dsw-alias-label-secondary: #555555;\n  --dsw-alias-label-tertiary: #8c8c8c;\n  --dsw-alias-label-caption: #8c8c8c;\n  --dsw-alias-label-dimmed: rgba(0, 0, 0, 0.450);\n  --dsw-alias-label-primary-bluish: #000000;\n  --dsw-alias-label-primary-dimmed: #000000;\n  --dsw-alias-label-primary-foreground: #ffffff;\n  --dsw-alias-label-primary-inverted: #ffffff;\n  --dsw-alias-interactive-bg-hover: rgba(0, 0, 0, 0.060);\n  --dsw-alias-interactive-bg-active: rgba(0, 0, 0, 0.100);\n  --dsw-alias-interactive-bg-hover-accent: rgba(0, 0, 0, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(185, 28, 28, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #f2f2f2;\n  --dsw-alias-markdown-code-block: #f5f5f5;\n  --dsw-alias-markdown-code-block-banner: #ececec;\n  --dsw-alias-markdown-inline-code: #f5f5f5;\n  --dsw-alias-markdown-code-segment-selected: #ececec;\n  --dsw-alias-markdown-code-segment-unselected: #f5f5f5;\n  --dsw-alias-markdown-citation: #f2f2f2;\n  --dsw-alias-markdown-placeholder: #f2f2f2;\n  --dsw-alias-markdown-tag: #f2f2f2;\n  --dsw-alias-state-business-primary: #000000;\n  --dsw-alias-state-business-tertiary: rgba(0, 0, 0, 0.140);\n  --dsw-alias-state-error-primary: #b91c1c;\n  --dsw-alias-state-error-secondary: rgba(185, 28, 28, 0.750);\n  --dsw-alias-state-success-primary: #166534;\n  --dsw-alias-state-success-secondary: #166534;\n  --dsw-alias-state-success-tertiary: rgba(22, 101, 52, 0.140);\n  --dsw-alias-state-warn-primary: #a16207;\n  --dsw-alias-state-warn-secondary: #a16207;\n  --dsw-alias-state-warn-tertiary: rgba(161, 98, 7, 0.160);\n  --dsw-alias-state-warn-label: #a16207;\n  --dsw-alias-scrollbar-bg-l1: rgba(0, 0, 0, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(0, 0, 0, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(0, 0, 0, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(0, 0, 0, 0.220);\n  --dsw-alias-toast-bg: #000000;\n  --dsw-alias-tooltip-bg: #000000;\n  --dsw-specific-bubble: #f5f5f5;\n  --dsw-specific-bubble-highlight: rgba(0, 0, 0, 0.120);\n  --dsw-specific-input-major: #ffffff;\n  --dsw-specific-login-input: #f2f2f2;\n  --dsw-specific-menu: #ffffff;\n  --dsw-specific-selector: #f2f2f2;\n  --dsw-specific-sidebar-fill: #f7f7f7;\n  --dsw-specific-sidebar-nav-item-active: rgba(0, 0, 0, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(0, 0, 0, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(0, 0, 0, 0.050);\n  --dsw-specific-tip: #f2f2f2;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(255, 255, 255) 20.19%, rgba(255, 255, 255, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(242, 242, 242) 20.19%, rgba(242, 242, 242, 0) 100%);\n}\nbody[data-dsh-theme=\"mono\"][data-ds-dark-theme]{\n  --dsw-alias-bg-base: #000000;\n  --dsw-alias-bg-layer-1: #0c0c0c;\n  --dsw-alias-bg-layer-2: #0c0c0c;\n  --dsw-alias-bg-layer-3: #161616;\n  --dsw-alias-bg-overlay: #161616;\n  --dsw-alias-bg-module-platform: #161616;\n  --dsw-alias-bg-multi-select: #161616;\n  --dsw-alias-bg-skeleton: rgba(255, 255, 255, 0.080);\n  --dsw-alias-border-l1: rgba(255, 255, 255, 0.077);\n  --dsw-alias-border-l2: rgba(255,255,255,0.14);\n  --dsw-alias-border-l2-darkmode-thin: rgba(255,255,255,0.14);\n  --dsw-alias-border-l3: rgba(255, 255, 255, 0.224);\n  --dsw-alias-border-l4: rgba(255, 255, 255, 0.308);\n  --dsw-alias-border-inverted: rgba(255, 255, 255, 0.120);\n  --dsw-alias-border-inverted2: rgba(255, 255, 255, 0.120);\n  --dsw-alias-brand-primary: #ffffff;\n  --dsw-alias-brand-primary-invert: #ffffff;\n  --dsw-alias-brand-text: #ffffff;\n  --dsw-alias-button-primary-fill: #ffffff;\n  --dsw-alias-button-primary-hover: #cccccc;\n  --dsw-alias-button-primary-dimmed: rgba(255, 255, 255, 0.140);\n  --dsw-alias-button-info-fill: #ffffff;\n  --dsw-alias-button-info-hover: #cccccc;\n  --dsw-alias-button-contrast-fill: #ffffff;\n  --dsw-alias-button-elevated-fill: #0c0c0c;\n  --dsw-alias-button-floating-fill: #0c0c0c;\n  --dsw-alias-button-floating-hover: #161616;\n  --dsw-alias-button-ghost-active-fill: #161616;\n  --dsw-alias-button-ghost-active-hover: #161616;\n  --dsw-alias-button-ghost-active-border: #6b6b6b;\n  --dsw-alias-button-tool-bar-fill: rgba(255, 255, 255, 0.180);\n  --dsw-alias-button-tool-bar-fill-invisible: rgba(255, 255, 255, 0.100);\n  --dsw-alias-button-tool-bar-hover: rgba(255, 255, 255, 0.280);\n  --dsw-alias-label-primary: #ffffff;\n  --dsw-alias-label-secondary: #a1a1a1;\n  --dsw-alias-label-tertiary: #6b6b6b;\n  --dsw-alias-label-caption: #6b6b6b;\n  --dsw-alias-label-dimmed: rgba(255, 255, 255, 0.450);\n  --dsw-alias-label-primary-bluish: #ffffff;\n  --dsw-alias-label-primary-dimmed: #ffffff;\n  --dsw-alias-label-primary-foreground: #000000;\n  --dsw-alias-label-primary-inverted: #000000;\n  --dsw-alias-interactive-bg-hover: rgba(255, 255, 255, 0.100);\n  --dsw-alias-interactive-bg-active: rgba(255, 255, 255, 0.160);\n  --dsw-alias-interactive-bg-hover-accent: rgba(255, 255, 255, 0.120);\n  --dsw-alias-interactive-bg-hover-danger: rgba(248, 113, 113, 0.080);\n  --dsw-alias-interactive-bg-hover-solid: #161616;\n  --dsw-alias-markdown-code-block: #0a0a0a;\n  --dsw-alias-markdown-code-block-banner: #131313;\n  --dsw-alias-markdown-inline-code: #0a0a0a;\n  --dsw-alias-markdown-code-segment-selected: #131313;\n  --dsw-alias-markdown-code-segment-unselected: #0a0a0a;\n  --dsw-alias-markdown-citation: #161616;\n  --dsw-alias-markdown-placeholder: #161616;\n  --dsw-alias-markdown-tag: #161616;\n  --dsw-alias-state-business-primary: #ffffff;\n  --dsw-alias-state-business-tertiary: rgba(255, 255, 255, 0.140);\n  --dsw-alias-state-error-primary: #f87171;\n  --dsw-alias-state-error-secondary: rgba(248, 113, 113, 0.750);\n  --dsw-alias-state-success-primary: #4ade80;\n  --dsw-alias-state-success-secondary: #4ade80;\n  --dsw-alias-state-success-tertiary: rgba(74, 222, 128, 0.140);\n  --dsw-alias-state-warn-primary: #fbbf24;\n  --dsw-alias-state-warn-secondary: #fbbf24;\n  --dsw-alias-state-warn-tertiary: rgba(251, 191, 36, 0.160);\n  --dsw-alias-state-warn-label: #fbbf24;\n  --dsw-alias-scrollbar-bg-l1: rgba(255, 255, 255, 0.120);\n  --dsw-alias-scrollbar-bg-l2: rgba(255, 255, 255, 0.120);\n  --dsw-alias-scrollbar-hover-l1: rgba(255, 255, 255, 0.220);\n  --dsw-alias-scrollbar-hover-l2: rgba(255, 255, 255, 0.220);\n  --dsw-alias-toast-bg: #ffffff;\n  --dsw-alias-tooltip-bg: #ffffff;\n  --dsw-specific-bubble: #0a0a0a;\n  --dsw-specific-bubble-highlight: rgba(255, 255, 255, 0.120);\n  --dsw-specific-input-major: #0c0c0c;\n  --dsw-specific-login-input: #161616;\n  --dsw-specific-menu: #0c0c0c;\n  --dsw-specific-selector: #161616;\n  --dsw-specific-sidebar-fill: #050505;\n  --dsw-specific-sidebar-nav-item-active: rgba(255, 255, 255, 0.060);\n  --dsw-specific-sidebar-nav-item-active-accent: rgba(255, 255, 255, 0.140);\n  --dsw-specific-sidebar-nav-item-hover: rgba(255, 255, 255, 0.050);\n  --dsw-specific-tip: #161616;\n  --dsw-linear-gradient-think: linear-gradient(180deg, rgb(0, 0, 0) 20.19%, rgba(0, 0, 0, 0) 100%);\n  --dsw-linear-think-select: linear-gradient(180deg, rgb(22, 22, 22) 20.19%, rgba(22, 22, 22, 0) 100%);\n}\nbody[data-dsh-theme=\"mono\"]{\n  --shiki-token-constant: #1c7ed6;\n  --shiki-token-string: #2f9e44;\n  --shiki-token-comment: #868e96;\n  --shiki-token-keyword: #d6336c;\n  --shiki-token-parameter: #e8590c;\n  --shiki-token-function: #6741d9;\n  --shiki-token-string-expression: #2b8a3e;\n  --shiki-token-punctuation: #495057;\n  --shiki-token-link: #1971c2;\n}\nbody[data-dsh-theme=\"mono\"][data-ds-dark-theme]{\n  --shiki-token-constant: #4dabf7;\n  --shiki-token-string: #69db7c;\n  --shiki-token-comment: #adb5bd;\n  --shiki-token-keyword: #faa2c1;\n  --shiki-token-parameter: #ffa94d;\n  --shiki-token-function: #b197fc;\n  --shiki-token-string-expression: #8ce99a;\n  --shiki-token-punctuation: #ced4da;\n  --shiki-token-link: #74c0fc;\n}\n"}];
    const CODEX_THEME_MAP_CSS = "html body[data-dsh-codex-style][data-dsh-theme=\"ocean\"]{--cx-window:#d5e7ef;--cx-sidebar:#d6e7f1;--cx-surface:#d5e7ef;--cx-thread:#f0f7f8;--cx-nested:#f0f7f8;--cx-elevated:#f0f7f8;--cx-summary:#c5dde8;--cx-hover:rgba(15, 36, 64, 0.060);--cx-active:rgba(15, 36, 64, 0.060);--cx-border-l1:rgba(15, 36, 64, 0.055);--cx-border-l2:rgba(15,36,64,0.10);--cx-border-l3:rgba(15, 36, 64, 0.160);--cx-border-strong:rgba(15, 36, 64, 0.220);--cx-sidebar-divider:rgba(15, 36, 64, 0.055);--cx-sidebar-divider-hover:rgba(15, 36, 64, 0.220);--cx-frame-line:rgba(15,36,64,0.10);--cx-text:#0f2440;--cx-text-2:#3e5c78;--cx-text-3:#6e8aa3;--cx-text-4:rgba(15, 36, 64, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#6e8aa3;--cx-sidebar-text:#3e5c78;--cx-sidebar-muted:#6e8aa3;--cx-sidebar-selected:#c5dde8;--cx-accent:#0e7490;--cx-accent-soft:#0e7490;--cx-focus:#0e7490;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0e7490;--cx-picker-fill:#f0f7f8;--cx-composer-fill:#f0f7f8;--cx-popover-fill:#f0f7f8;--cx-reasoning-track:rgba(15, 36, 64, 0.220);--cx-reasoning-title:#0e7490;--cx-reasoning-max-text:#0e7490}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"ocean\"][data-ds-dark-theme]{--cx-window:#0b1722;--cx-sidebar:#0c1a26;--cx-surface:#0b1722;--cx-thread:#0f1f2d;--cx-nested:#0f1f2d;--cx-elevated:#0f1f2d;--cx-summary:#15293a;--cx-hover:rgba(230, 241, 249, 0.100);--cx-active:rgba(230, 241, 249, 0.100);--cx-border-l1:rgba(230, 241, 249, 0.055);--cx-border-l2:rgba(230,241,249,0.10);--cx-border-l3:rgba(230, 241, 249, 0.160);--cx-border-strong:rgba(230, 241, 249, 0.220);--cx-sidebar-divider:rgba(230, 241, 249, 0.055);--cx-sidebar-divider-hover:rgba(230, 241, 249, 0.220);--cx-frame-line:rgba(230,241,249,0.10);--cx-text:#e6f1f9;--cx-text-2:#9db8cc;--cx-text-3:#6d8ba3;--cx-text-4:rgba(230, 241, 249, 0.450);--cx-text-inverse:#06222b;--cx-nav-icon:#6d8ba3;--cx-sidebar-text:#9db8cc;--cx-sidebar-muted:#6d8ba3;--cx-sidebar-selected:#15293a;--cx-accent:#22d3ee;--cx-accent-soft:#22d3ee;--cx-focus:#22d3ee;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#22d3ee;--cx-picker-fill:#0f1f2d;--cx-composer-fill:#0f1f2d;--cx-popover-fill:#0f1f2d;--cx-reasoning-track:rgba(230, 241, 249, 0.220);--cx-reasoning-title:#22d3ee;--cx-reasoning-max-text:#22d3ee}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"midnight\"]{--cx-window:#e5ebf8;--cx-sidebar:#e0e7f5;--cx-surface:#e5ebf8;--cx-thread:#f8fafe;--cx-nested:#f8fafe;--cx-elevated:#f8fafe;--cx-summary:#d9e2f3;--cx-hover:rgba(11, 28, 51, 0.060);--cx-active:rgba(11, 28, 51, 0.060);--cx-border-l1:rgba(11, 28, 51, 0.055);--cx-border-l2:rgba(11,28,51,0.10);--cx-border-l3:rgba(11, 28, 51, 0.160);--cx-border-strong:rgba(11, 28, 51, 0.220);--cx-sidebar-divider:rgba(11, 28, 51, 0.055);--cx-sidebar-divider-hover:rgba(11, 28, 51, 0.220);--cx-frame-line:rgba(11,28,51,0.10);--cx-text:#0b1c33;--cx-text-2:#44597a;--cx-text-3:#73849f;--cx-text-4:rgba(11, 28, 51, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#73849f;--cx-sidebar-text:#44597a;--cx-sidebar-muted:#73849f;--cx-sidebar-selected:#d9e2f3;--cx-accent:#2563eb;--cx-accent-soft:#2563eb;--cx-focus:#2563eb;--cx-success:#16a34a;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#2563eb;--cx-picker-fill:#f8fafe;--cx-composer-fill:#f8fafe;--cx-popover-fill:#f8fafe;--cx-reasoning-track:rgba(11, 28, 51, 0.220);--cx-reasoning-title:#2563eb;--cx-reasoning-max-text:#2563eb}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"midnight\"][data-ds-dark-theme]{--cx-window:#070d1a;--cx-sidebar:#0a1120;--cx-surface:#070d1a;--cx-thread:#0d1526;--cx-nested:#0d1526;--cx-elevated:#0d1526;--cx-summary:#141f36;--cx-hover:rgba(219, 231, 251, 0.100);--cx-active:rgba(219, 231, 251, 0.100);--cx-border-l1:rgba(219, 231, 251, 0.055);--cx-border-l2:rgba(219,231,251,0.10);--cx-border-l3:rgba(219, 231, 251, 0.160);--cx-border-strong:rgba(219, 231, 251, 0.220);--cx-sidebar-divider:rgba(219, 231, 251, 0.055);--cx-sidebar-divider-hover:rgba(219, 231, 251, 0.220);--cx-frame-line:rgba(219,231,251,0.10);--cx-text:#dbe7fb;--cx-text-2:#8fa8cf;--cx-text-3:#64789c;--cx-text-4:rgba(219, 231, 251, 0.450);--cx-text-inverse:#061024;--cx-nav-icon:#64789c;--cx-sidebar-text:#8fa8cf;--cx-sidebar-muted:#64789c;--cx-sidebar-selected:#141f36;--cx-accent:#3b82f6;--cx-accent-soft:#3b82f6;--cx-focus:#3b82f6;--cx-success:#34d399;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#3b82f6;--cx-picker-fill:#0d1526;--cx-composer-fill:#0d1526;--cx-popover-fill:#0d1526;--cx-reasoning-track:rgba(219, 231, 251, 0.220);--cx-reasoning-title:#3b82f6;--cx-reasoning-max-text:#3b82f6}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"aurora\"]{--cx-window:#e6e1fa;--cx-sidebar:#e4e0f8;--cx-surface:#e6e1fa;--cx-thread:#f8f4fe;--cx-nested:#f8f4fe;--cx-elevated:#f8f4fe;--cx-summary:#dcd3f6;--cx-hover:rgba(34, 26, 62, 0.060);--cx-active:rgba(34, 26, 62, 0.060);--cx-border-l1:rgba(34, 26, 62, 0.055);--cx-border-l2:rgba(34,26,62,0.10);--cx-border-l3:rgba(34, 26, 62, 0.160);--cx-border-strong:rgba(34, 26, 62, 0.220);--cx-sidebar-divider:rgba(34, 26, 62, 0.055);--cx-sidebar-divider-hover:rgba(34, 26, 62, 0.220);--cx-frame-line:rgba(34,26,62,0.10);--cx-text:#221a3e;--cx-text-2:#5b5480;--cx-text-3:#847ca6;--cx-text-4:rgba(34, 26, 62, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#847ca6;--cx-sidebar-text:#5b5480;--cx-sidebar-muted:#847ca6;--cx-sidebar-selected:#dcd3f6;--cx-accent:#7c3aed;--cx-accent-soft:#7c3aed;--cx-focus:#7c3aed;--cx-success:#0d9488;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#7c3aed;--cx-picker-fill:#f8f4fe;--cx-composer-fill:#f8f4fe;--cx-popover-fill:#f8f4fe;--cx-reasoning-track:rgba(34, 26, 62, 0.220);--cx-reasoning-title:#7c3aed;--cx-reasoning-max-text:#7c3aed}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"aurora\"][data-ds-dark-theme]{--cx-window:#0e0a1f;--cx-sidebar:#100b24;--cx-surface:#0e0a1f;--cx-thread:#151031;--cx-nested:#151031;--cx-elevated:#151031;--cx-summary:#1d1740;--cx-hover:rgba(236, 231, 255, 0.100);--cx-active:rgba(236, 231, 255, 0.100);--cx-border-l1:rgba(236, 231, 255, 0.055);--cx-border-l2:rgba(236,231,255,0.10);--cx-border-l3:rgba(236, 231, 255, 0.160);--cx-border-strong:rgba(236, 231, 255, 0.220);--cx-sidebar-divider:rgba(236, 231, 255, 0.055);--cx-sidebar-divider-hover:rgba(236, 231, 255, 0.220);--cx-frame-line:rgba(236,231,255,0.10);--cx-text:#ece7ff;--cx-text-2:#a99fd8;--cx-text-3:#746a9e;--cx-text-4:rgba(236, 231, 255, 0.450);--cx-text-inverse:#1a1030;--cx-nav-icon:#746a9e;--cx-sidebar-text:#a99fd8;--cx-sidebar-muted:#746a9e;--cx-sidebar-selected:#1d1740;--cx-accent:#a78bfa;--cx-accent-soft:#a78bfa;--cx-focus:#a78bfa;--cx-success:#2dd4bf;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#a78bfa;--cx-picker-fill:#151031;--cx-composer-fill:#151031;--cx-popover-fill:#151031;--cx-reasoning-track:rgba(236, 231, 255, 0.220);--cx-reasoning-title:#a78bfa;--cx-reasoning-max-text:#a78bfa}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"lava\"]{--cx-window:#f6e3d9;--cx-sidebar:#f1e0d7;--cx-surface:#f6e3d9;--cx-thread:#fef6f2;--cx-nested:#fef6f2;--cx-elevated:#fef6f2;--cx-summary:#efd5c9;--cx-hover:rgba(43, 23, 18, 0.060);--cx-active:rgba(43, 23, 18, 0.060);--cx-border-l1:rgba(43, 23, 18, 0.055);--cx-border-l2:rgba(43,23,18,0.10);--cx-border-l3:rgba(43, 23, 18, 0.160);--cx-border-strong:rgba(43, 23, 18, 0.220);--cx-sidebar-divider:rgba(43, 23, 18, 0.055);--cx-sidebar-divider-hover:rgba(43, 23, 18, 0.220);--cx-frame-line:rgba(43,23,18,0.10);--cx-text:#2b1712;--cx-text-2:#6b4a40;--cx-text-3:#93746a;--cx-text-4:rgba(43, 23, 18, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#93746a;--cx-sidebar-text:#6b4a40;--cx-sidebar-muted:#93746a;--cx-sidebar-selected:#efd5c9;--cx-accent:#ea580c;--cx-accent-soft:#ea580c;--cx-focus:#ea580c;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#ea580c;--cx-picker-fill:#fef6f2;--cx-composer-fill:#fef6f2;--cx-popover-fill:#fef6f2;--cx-reasoning-track:rgba(43, 23, 18, 0.220);--cx-reasoning-title:#ea580c;--cx-reasoning-max-text:#ea580c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"lava\"][data-ds-dark-theme]{--cx-window:#150e0b;--cx-sidebar:#180f0c;--cx-surface:#150e0b;--cx-thread:#1e1410;--cx-nested:#1e1410;--cx-elevated:#1e1410;--cx-summary:#2a1a14;--cx-hover:rgba(253, 238, 232, 0.100);--cx-active:rgba(253, 238, 232, 0.100);--cx-border-l1:rgba(253, 238, 232, 0.055);--cx-border-l2:rgba(253,238,232,0.10);--cx-border-l3:rgba(253, 238, 232, 0.160);--cx-border-strong:rgba(253, 238, 232, 0.220);--cx-sidebar-divider:rgba(253, 238, 232, 0.055);--cx-sidebar-divider-hover:rgba(253, 238, 232, 0.220);--cx-frame-line:rgba(253,238,232,0.10);--cx-text:#fdeee8;--cx-text-2:#c98f7a;--cx-text-3:#96695a;--cx-text-4:rgba(253, 238, 232, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#96695a;--cx-sidebar-text:#c98f7a;--cx-sidebar-muted:#96695a;--cx-sidebar-selected:#2a1a14;--cx-accent:#f97316;--cx-accent-soft:#f97316;--cx-focus:#f97316;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#f97316;--cx-picker-fill:#1e1410;--cx-composer-fill:#1e1410;--cx-popover-fill:#1e1410;--cx-reasoning-track:rgba(253, 238, 232, 0.220);--cx-reasoning-title:#f97316;--cx-reasoning-max-text:#f97316}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"forest\"]{--cx-window:#daeade;--cx-sidebar:#d7e8db;--cx-surface:#daeade;--cx-thread:#f2f8f4;--cx-nested:#f2f8f4;--cx-elevated:#f2f8f4;--cx-summary:#c9e1ce;--cx-hover:rgba(20, 38, 26, 0.060);--cx-active:rgba(20, 38, 26, 0.060);--cx-border-l1:rgba(20, 38, 26, 0.055);--cx-border-l2:rgba(20,38,26,0.10);--cx-border-l3:rgba(20, 38, 26, 0.160);--cx-border-strong:rgba(20, 38, 26, 0.220);--cx-sidebar-divider:rgba(20, 38, 26, 0.055);--cx-sidebar-divider-hover:rgba(20, 38, 26, 0.220);--cx-frame-line:rgba(20,38,26,0.10);--cx-text:#14261a;--cx-text-2:#44604e;--cx-text-3:#71877b;--cx-text-4:rgba(20, 38, 26, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#71877b;--cx-sidebar-text:#44604e;--cx-sidebar-muted:#71877b;--cx-sidebar-selected:#c9e1ce;--cx-accent:#15803d;--cx-accent-soft:#15803d;--cx-focus:#15803d;--cx-success:#16a34a;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#15803d;--cx-picker-fill:#f2f8f4;--cx-composer-fill:#f2f8f4;--cx-popover-fill:#f2f8f4;--cx-reasoning-track:rgba(20, 38, 26, 0.220);--cx-reasoning-title:#15803d;--cx-reasoning-max-text:#15803d}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"forest\"][data-ds-dark-theme]{--cx-window:#0c150f;--cx-sidebar:#0e1812;--cx-surface:#0c150f;--cx-thread:#122017;--cx-nested:#122017;--cx-elevated:#122017;--cx-summary:#1a2d20;--cx-hover:rgba(226, 242, 231, 0.100);--cx-active:rgba(226, 242, 231, 0.100);--cx-border-l1:rgba(226, 242, 231, 0.055);--cx-border-l2:rgba(226,242,231,0.10);--cx-border-l3:rgba(226, 242, 231, 0.160);--cx-border-strong:rgba(226, 242, 231, 0.220);--cx-sidebar-divider:rgba(226, 242, 231, 0.055);--cx-sidebar-divider-hover:rgba(226, 242, 231, 0.220);--cx-frame-line:rgba(226,242,231,0.10);--cx-text:#e2f2e7;--cx-text-2:#96b8a2;--cx-text-3:#66836f;--cx-text-4:rgba(226, 242, 231, 0.450);--cx-text-inverse:#052e14;--cx-nav-icon:#66836f;--cx-sidebar-text:#96b8a2;--cx-sidebar-muted:#66836f;--cx-sidebar-selected:#1a2d20;--cx-accent:#4ade80;--cx-accent-soft:#4ade80;--cx-focus:#4ade80;--cx-success:#34d399;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#4ade80;--cx-picker-fill:#122017;--cx-composer-fill:#122017;--cx-popover-fill:#122017;--cx-reasoning-track:rgba(226, 242, 231, 0.220);--cx-reasoning-title:#4ade80;--cx-reasoning-max-text:#4ade80}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"sakura\"]{--cx-window:#fbdde8;--cx-sidebar:#f9dfe9;--cx-surface:#fbdde8;--cx-thread:#fdf2f7;--cx-nested:#fdf2f7;--cx-elevated:#fdf2f7;--cx-summary:#f6ccdb;--cx-hover:rgba(61, 20, 32, 0.060);--cx-active:rgba(61, 20, 32, 0.060);--cx-border-l1:rgba(61, 20, 32, 0.055);--cx-border-l2:rgba(61,20,32,0.10);--cx-border-l3:rgba(61, 20, 32, 0.160);--cx-border-strong:rgba(61, 20, 32, 0.220);--cx-sidebar-divider:rgba(61, 20, 32, 0.055);--cx-sidebar-divider-hover:rgba(61, 20, 32, 0.220);--cx-frame-line:rgba(61,20,32,0.10);--cx-text:#3d1420;--cx-text-2:#8a4a5c;--cx-text-3:#ad7a8a;--cx-text-4:rgba(61, 20, 32, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#ad7a8a;--cx-sidebar-text:#8a4a5c;--cx-sidebar-muted:#ad7a8a;--cx-sidebar-selected:#f6ccdb;--cx-accent:#db2777;--cx-accent-soft:#db2777;--cx-focus:#db2777;--cx-success:#15803d;--cx-danger:#e11d48;--cx-warning:#b45309;--cx-attention:#db2777;--cx-picker-fill:#fdf2f7;--cx-composer-fill:#fdf2f7;--cx-popover-fill:#fdf2f7;--cx-reasoning-track:rgba(61, 20, 32, 0.220);--cx-reasoning-title:#db2777;--cx-reasoning-max-text:#db2777}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"sakura\"][data-ds-dark-theme]{--cx-window:#1d0f16;--cx-sidebar:#200f18;--cx-surface:#1d0f16;--cx-thread:#281420;--cx-nested:#281420;--cx-elevated:#281420;--cx-summary:#361b29;--cx-hover:rgba(253, 238, 244, 0.100);--cx-active:rgba(253, 238, 244, 0.100);--cx-border-l1:rgba(253, 238, 244, 0.055);--cx-border-l2:rgba(253,238,244,0.10);--cx-border-l3:rgba(253, 238, 244, 0.160);--cx-border-strong:rgba(253, 238, 244, 0.220);--cx-sidebar-divider:rgba(253, 238, 244, 0.055);--cx-sidebar-divider-hover:rgba(253, 238, 244, 0.220);--cx-frame-line:rgba(253,238,244,0.10);--cx-text:#fdeef4;--cx-text-2:#d49db2;--cx-text-3:#a06b83;--cx-text-4:rgba(253, 238, 244, 0.450);--cx-text-inverse:#2a0515;--cx-nav-icon:#a06b83;--cx-sidebar-text:#d49db2;--cx-sidebar-muted:#a06b83;--cx-sidebar-selected:#361b29;--cx-accent:#f472b6;--cx-accent-soft:#f472b6;--cx-focus:#f472b6;--cx-success:#4ade80;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#f472b6;--cx-picker-fill:#281420;--cx-composer-fill:#281420;--cx-popover-fill:#281420;--cx-reasoning-track:rgba(253, 238, 244, 0.220);--cx-reasoning-title:#f472b6;--cx-reasoning-max-text:#f472b6}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"sunset\"]{--cx-window:#fcebe0;--cx-sidebar:#f8e6d6;--cx-surface:#fcebe0;--cx-thread:#fef9f7;--cx-nested:#fef9f7;--cx-elevated:#fef9f7;--cx-summary:#f8dccb;--cx-hover:rgba(51, 26, 16, 0.060);--cx-active:rgba(51, 26, 16, 0.060);--cx-border-l1:rgba(51, 26, 16, 0.055);--cx-border-l2:rgba(51,26,16,0.10);--cx-border-l3:rgba(51, 26, 16, 0.160);--cx-border-strong:rgba(51, 26, 16, 0.220);--cx-sidebar-divider:rgba(51, 26, 16, 0.055);--cx-sidebar-divider-hover:rgba(51, 26, 16, 0.220);--cx-frame-line:rgba(51,26,16,0.10);--cx-text:#331a10;--cx-text-2:#7a4a33;--cx-text-3:#a4765f;--cx-text-4:rgba(51, 26, 16, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#a4765f;--cx-sidebar-text:#7a4a33;--cx-sidebar-muted:#a4765f;--cx-sidebar-selected:#f8dccb;--cx-accent:#ea580c;--cx-accent-soft:#ea580c;--cx-focus:#ea580c;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#ea580c;--cx-picker-fill:#fef9f7;--cx-composer-fill:#fef9f7;--cx-popover-fill:#fef9f7;--cx-reasoning-track:rgba(51, 26, 16, 0.220);--cx-reasoning-title:#ea580c;--cx-reasoning-max-text:#ea580c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"sunset\"][data-ds-dark-theme]{--cx-window:#180e10;--cx-sidebar:#1a1012;--cx-surface:#180e10;--cx-thread:#211316;--cx-nested:#211316;--cx-elevated:#211316;--cx-summary:#2e1a1e;--cx-hover:rgba(253, 240, 236, 0.100);--cx-active:rgba(253, 240, 236, 0.100);--cx-border-l1:rgba(253, 240, 236, 0.055);--cx-border-l2:rgba(253,240,236,0.10);--cx-border-l3:rgba(253, 240, 236, 0.160);--cx-border-strong:rgba(253, 240, 236, 0.220);--cx-sidebar-divider:rgba(253, 240, 236, 0.055);--cx-sidebar-divider-hover:rgba(253, 240, 236, 0.220);--cx-frame-line:rgba(253,240,236,0.10);--cx-text:#fdf0ec;--cx-text-2:#d2a090;--cx-text-3:#9c7167;--cx-text-4:rgba(253, 240, 236, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#9c7167;--cx-sidebar-text:#d2a090;--cx-sidebar-muted:#9c7167;--cx-sidebar-selected:#2e1a1e;--cx-accent:#fb923c;--cx-accent-soft:#fb923c;--cx-focus:#fb923c;--cx-success:#4ade80;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#fb923c;--cx-picker-fill:#211316;--cx-composer-fill:#211316;--cx-popover-fill:#211316;--cx-reasoning-track:rgba(253, 240, 236, 0.220);--cx-reasoning-title:#fb923c;--cx-reasoning-max-text:#fb923c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"graphite\"]{--cx-window:#f6f6f5;--cx-sidebar:#ededeb;--cx-surface:#f6f6f5;--cx-thread:#ffffff;--cx-nested:#ffffff;--cx-elevated:#ffffff;--cx-summary:#ececea;--cx-hover:rgba(28, 28, 26, 0.060);--cx-active:rgba(28, 28, 26, 0.060);--cx-border-l1:rgba(28, 28, 26, 0.055);--cx-border-l2:rgba(28,28,26,0.10);--cx-border-l3:rgba(28, 28, 26, 0.160);--cx-border-strong:rgba(28, 28, 26, 0.220);--cx-sidebar-divider:rgba(28, 28, 26, 0.055);--cx-sidebar-divider-hover:rgba(28, 28, 26, 0.220);--cx-frame-line:rgba(28,28,26,0.10);--cx-text:#1c1c1a;--cx-text-2:#5c5c57;--cx-text-3:#8b8b85;--cx-text-4:rgba(28, 28, 26, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#8b8b85;--cx-sidebar-text:#5c5c57;--cx-sidebar-muted:#8b8b85;--cx-sidebar-selected:#ececea;--cx-accent:#3f3f3c;--cx-accent-soft:#3f3f3c;--cx-focus:#3f3f3c;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#3f3f3c;--cx-picker-fill:#ffffff;--cx-composer-fill:#ffffff;--cx-popover-fill:#ffffff;--cx-reasoning-track:rgba(28, 28, 26, 0.220);--cx-reasoning-title:#3f3f3c;--cx-reasoning-max-text:#3f3f3c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"graphite\"][data-ds-dark-theme]{--cx-window:#161614;--cx-sidebar:#181816;--cx-surface:#161614;--cx-thread:#1d1d1a;--cx-nested:#1d1d1a;--cx-elevated:#1d1d1a;--cx-summary:#262622;--cx-hover:rgba(236, 236, 234, 0.100);--cx-active:rgba(236, 236, 234, 0.100);--cx-border-l1:rgba(236, 236, 234, 0.055);--cx-border-l2:rgba(236,236,234,0.10);--cx-border-l3:rgba(236, 236, 234, 0.160);--cx-border-strong:rgba(236, 236, 234, 0.220);--cx-sidebar-divider:rgba(236, 236, 234, 0.055);--cx-sidebar-divider-hover:rgba(236, 236, 234, 0.220);--cx-frame-line:rgba(236,236,234,0.10);--cx-text:#ececea;--cx-text-2:#a3a39c;--cx-text-3:#71716b;--cx-text-4:rgba(236, 236, 234, 0.450);--cx-text-inverse:#161614;--cx-nav-icon:#71716b;--cx-sidebar-text:#a3a39c;--cx-sidebar-muted:#71716b;--cx-sidebar-selected:#262622;--cx-accent:#e4e4e0;--cx-accent-soft:#e4e4e0;--cx-focus:#e4e4e0;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#e4e4e0;--cx-picker-fill:#1d1d1a;--cx-composer-fill:#1d1d1a;--cx-popover-fill:#1d1d1a;--cx-reasoning-track:rgba(236, 236, 234, 0.220);--cx-reasoning-title:#e4e4e0;--cx-reasoning-max-text:#e4e4e0}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"ink\"]{--cx-window:#fafafa;--cx-sidebar:#f4f4f4;--cx-surface:#fafafa;--cx-thread:#ffffff;--cx-nested:#ffffff;--cx-elevated:#ffffff;--cx-summary:#f0f0f0;--cx-hover:rgba(10, 10, 10, 0.060);--cx-active:rgba(10, 10, 10, 0.060);--cx-border-l1:rgba(10, 10, 10, 0.066);--cx-border-l2:rgba(10,10,10,0.12);--cx-border-l3:rgba(10, 10, 10, 0.192);--cx-border-strong:rgba(10, 10, 10, 0.264);--cx-sidebar-divider:rgba(10, 10, 10, 0.066);--cx-sidebar-divider-hover:rgba(10, 10, 10, 0.264);--cx-frame-line:rgba(10,10,10,0.12);--cx-text:#0a0a0a;--cx-text-2:#525252;--cx-text-3:#8a8a8a;--cx-text-4:rgba(10, 10, 10, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#8a8a8a;--cx-sidebar-text:#525252;--cx-sidebar-muted:#8a8a8a;--cx-sidebar-selected:#f0f0f0;--cx-accent:#0a0a0a;--cx-accent-soft:#0a0a0a;--cx-focus:#0a0a0a;--cx-success:#16a34a;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0a0a0a;--cx-picker-fill:#ffffff;--cx-composer-fill:#ffffff;--cx-popover-fill:#ffffff;--cx-reasoning-track:rgba(10, 10, 10, 0.264);--cx-reasoning-title:#0a0a0a;--cx-reasoning-max-text:#0a0a0a}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"ink\"][data-ds-dark-theme]{--cx-window:#0a0a0a;--cx-sidebar:#0d0d0d;--cx-surface:#0a0a0a;--cx-thread:#111111;--cx-nested:#111111;--cx-elevated:#111111;--cx-summary:#1a1a1a;--cx-hover:rgba(245, 245, 245, 0.100);--cx-active:rgba(245, 245, 245, 0.100);--cx-border-l1:rgba(255, 255, 255, 0.066);--cx-border-l2:rgba(255,255,255,0.12);--cx-border-l3:rgba(255, 255, 255, 0.192);--cx-border-strong:rgba(255, 255, 255, 0.264);--cx-sidebar-divider:rgba(255, 255, 255, 0.066);--cx-sidebar-divider-hover:rgba(255, 255, 255, 0.264);--cx-frame-line:rgba(255,255,255,0.12);--cx-text:#f5f5f5;--cx-text-2:#a3a3a3;--cx-text-3:#6e6e6e;--cx-text-4:rgba(245, 245, 245, 0.450);--cx-text-inverse:#0a0a0a;--cx-nav-icon:#6e6e6e;--cx-sidebar-text:#a3a3a3;--cx-sidebar-muted:#6e6e6e;--cx-sidebar-selected:#1a1a1a;--cx-accent:#ffffff;--cx-accent-soft:#ffffff;--cx-focus:#ffffff;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#ffffff;--cx-picker-fill:#111111;--cx-composer-fill:#111111;--cx-popover-fill:#111111;--cx-reasoning-track:rgba(255, 255, 255, 0.264);--cx-reasoning-title:#ffffff;--cx-reasoning-max-text:#ffffff}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"paper\"]{--cx-window:#f4eee5;--cx-sidebar:#f0e9de;--cx-surface:#f4eee5;--cx-thread:#fcf9f2;--cx-nested:#fcf9f2;--cx-elevated:#fcf9f2;--cx-summary:#ebe3d5;--cx-hover:rgba(47, 36, 23, 0.060);--cx-active:rgba(47, 36, 23, 0.060);--cx-border-l1:rgba(47, 36, 23, 0.066);--cx-border-l2:rgba(47,36,23,0.12);--cx-border-l3:rgba(47, 36, 23, 0.192);--cx-border-strong:rgba(47, 36, 23, 0.264);--cx-sidebar-divider:rgba(47, 36, 23, 0.066);--cx-sidebar-divider-hover:rgba(47, 36, 23, 0.264);--cx-frame-line:rgba(47,36,23,0.12);--cx-text:#2f2417;--cx-text-2:#6b5943;--cx-text-3:#9a8870;--cx-text-4:rgba(47, 36, 23, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#9a8870;--cx-sidebar-text:#6b5943;--cx-sidebar-muted:#9a8870;--cx-sidebar-selected:#ebe3d5;--cx-accent:#8a5a2b;--cx-accent-soft:#8a5a2b;--cx-focus:#8a5a2b;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#8a5a2b;--cx-picker-fill:#fcf9f2;--cx-composer-fill:#fcf9f2;--cx-popover-fill:#fcf9f2;--cx-reasoning-track:rgba(47, 36, 23, 0.264);--cx-reasoning-title:#8a5a2b;--cx-reasoning-max-text:#8a5a2b}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"paper\"][data-ds-dark-theme]{--cx-window:#171310;--cx-sidebar:#191511;--cx-surface:#171310;--cx-thread:#1f1a15;--cx-nested:#1f1a15;--cx-elevated:#1f1a15;--cx-summary:#2a231b;--cx-hover:rgba(243, 236, 225, 0.100);--cx-active:rgba(243, 236, 225, 0.100);--cx-border-l1:rgba(243, 236, 225, 0.055);--cx-border-l2:rgba(243,236,225,0.10);--cx-border-l3:rgba(243, 236, 225, 0.160);--cx-border-strong:rgba(243, 236, 225, 0.220);--cx-sidebar-divider:rgba(243, 236, 225, 0.055);--cx-sidebar-divider-hover:rgba(243, 236, 225, 0.220);--cx-frame-line:rgba(243,236,225,0.10);--cx-text:#f3ece1;--cx-text-2:#b4a489;--cx-text-3:#857763;--cx-text-4:rgba(243, 236, 225, 0.450);--cx-text-inverse:#241505;--cx-nav-icon:#857763;--cx-sidebar-text:#b4a489;--cx-sidebar-muted:#857763;--cx-sidebar-selected:#2a231b;--cx-accent:#d4a15c;--cx-accent-soft:#d4a15c;--cx-focus:#d4a15c;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#d4a15c;--cx-picker-fill:#1f1a15;--cx-composer-fill:#1f1a15;--cx-popover-fill:#1f1a15;--cx-reasoning-track:rgba(243, 236, 225, 0.220);--cx-reasoning-title:#d4a15c;--cx-reasoning-max-text:#d4a15c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"amber\"]{--cx-window:#f8ead4;--cx-sidebar:#f5e7cf;--cx-surface:#f8ead4;--cx-thread:#fbf5e9;--cx-nested:#fbf5e9;--cx-elevated:#fbf5e9;--cx-summary:#f0ddba;--cx-hover:rgba(51, 38, 14, 0.060);--cx-active:rgba(51, 38, 14, 0.060);--cx-border-l1:rgba(51, 38, 14, 0.055);--cx-border-l2:rgba(51,38,14,0.10);--cx-border-l3:rgba(51, 38, 14, 0.160);--cx-border-strong:rgba(51, 38, 14, 0.220);--cx-sidebar-divider:rgba(51, 38, 14, 0.055);--cx-sidebar-divider-hover:rgba(51, 38, 14, 0.220);--cx-frame-line:rgba(51,38,14,0.10);--cx-text:#33260e;--cx-text-2:#6f5a2c;--cx-text-3:#9c8957;--cx-text-4:rgba(51, 38, 14, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#9c8957;--cx-sidebar-text:#6f5a2c;--cx-sidebar-muted:#9c8957;--cx-sidebar-selected:#f0ddba;--cx-accent:#b45309;--cx-accent-soft:#b45309;--cx-focus:#b45309;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#b45309;--cx-picker-fill:#fbf5e9;--cx-composer-fill:#fbf5e9;--cx-popover-fill:#fbf5e9;--cx-reasoning-track:rgba(51, 38, 14, 0.220);--cx-reasoning-title:#b45309;--cx-reasoning-max-text:#b45309}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"amber\"][data-ds-dark-theme]{--cx-window:#171207;--cx-sidebar:#191306;--cx-surface:#171207;--cx-thread:#201809;--cx-nested:#201809;--cx-elevated:#201809;--cx-summary:#2c210e;--cx-hover:rgba(250, 240, 211, 0.100);--cx-active:rgba(250, 240, 211, 0.100);--cx-border-l1:rgba(250, 240, 211, 0.055);--cx-border-l2:rgba(250,240,211,0.10);--cx-border-l3:rgba(250, 240, 211, 0.160);--cx-border-strong:rgba(250, 240, 211, 0.220);--cx-sidebar-divider:rgba(250, 240, 211, 0.055);--cx-sidebar-divider-hover:rgba(250, 240, 211, 0.220);--cx-frame-line:rgba(250,240,211,0.10);--cx-text:#faf0d3;--cx-text-2:#c4a968;--cx-text-3:#8f7a45;--cx-text-4:rgba(250, 240, 211, 0.450);--cx-text-inverse:#221301;--cx-nav-icon:#8f7a45;--cx-sidebar-text:#c4a968;--cx-sidebar-muted:#8f7a45;--cx-sidebar-selected:#2c210e;--cx-accent:#f59e0b;--cx-accent-soft:#f59e0b;--cx-focus:#f59e0b;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#f59e0b;--cx-picker-fill:#201809;--cx-composer-fill:#201809;--cx-popover-fill:#201809;--cx-reasoning-track:rgba(250, 240, 211, 0.220);--cx-reasoning-title:#f59e0b;--cx-reasoning-max-text:#f59e0b}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"mint\"]{--cx-window:#d3ece2;--cx-sidebar:#d3ebe0;--cx-surface:#d3ece2;--cx-thread:#eef8f5;--cx-nested:#eef8f5;--cx-elevated:#eef8f5;--cx-summary:#c0e4d4;--cx-hover:rgba(14, 43, 29, 0.060);--cx-active:rgba(14, 43, 29, 0.060);--cx-border-l1:rgba(14, 43, 29, 0.055);--cx-border-l2:rgba(14,43,29,0.10);--cx-border-l3:rgba(14, 43, 29, 0.160);--cx-border-strong:rgba(14, 43, 29, 0.220);--cx-sidebar-divider:rgba(14, 43, 29, 0.055);--cx-sidebar-divider-hover:rgba(14, 43, 29, 0.220);--cx-frame-line:rgba(14,43,29,0.10);--cx-text:#0e2b1d;--cx-text-2:#3f6652;--cx-text-3:#6f9080;--cx-text-4:rgba(14, 43, 29, 0.450);--cx-text-inverse:#00150d;--cx-nav-icon:#6f9080;--cx-sidebar-text:#3f6652;--cx-sidebar-muted:#6f9080;--cx-sidebar-selected:#c0e4d4;--cx-accent:#059669;--cx-accent-soft:#059669;--cx-focus:#059669;--cx-success:#16a34a;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#059669;--cx-picker-fill:#eef8f5;--cx-composer-fill:#eef8f5;--cx-popover-fill:#eef8f5;--cx-reasoning-track:rgba(14, 43, 29, 0.220);--cx-reasoning-title:#059669;--cx-reasoning-max-text:#059669}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"mint\"][data-ds-dark-theme]{--cx-window:#0a1611;--cx-sidebar:#0c1913;--cx-surface:#0a1611;--cx-thread:#10221a;--cx-nested:#10221a;--cx-elevated:#10221a;--cx-summary:#172e23;--cx-hover:rgba(222, 243, 232, 0.100);--cx-active:rgba(222, 243, 232, 0.100);--cx-border-l1:rgba(222, 243, 232, 0.055);--cx-border-l2:rgba(222,243,232,0.10);--cx-border-l3:rgba(222, 243, 232, 0.160);--cx-border-strong:rgba(222, 243, 232, 0.220);--cx-sidebar-divider:rgba(222, 243, 232, 0.055);--cx-sidebar-divider-hover:rgba(222, 243, 232, 0.220);--cx-frame-line:rgba(222,243,232,0.10);--cx-text:#def3e8;--cx-text-2:#8fc0a8;--cx-text-3:#5f8a75;--cx-text-4:rgba(222, 243, 232, 0.450);--cx-text-inverse:#00150d;--cx-nav-icon:#5f8a75;--cx-sidebar-text:#8fc0a8;--cx-sidebar-muted:#5f8a75;--cx-sidebar-selected:#172e23;--cx-accent:#34d399;--cx-accent-soft:#34d399;--cx-focus:#34d399;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#34d399;--cx-picker-fill:#10221a;--cx-composer-fill:#10221a;--cx-popover-fill:#10221a;--cx-reasoning-track:rgba(222, 243, 232, 0.220);--cx-reasoning-title:#34d399;--cx-reasoning-max-text:#34d399}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"violet\"]{--cx-window:#efe7fc;--cx-sidebar:#e9e1f9;--cx-surface:#efe7fc;--cx-thread:#fbf8fe;--cx-nested:#fbf8fe;--cx-elevated:#fbf8fe;--cx-summary:#e3d8f7;--cx-hover:rgba(36, 21, 56, 0.060);--cx-active:rgba(36, 21, 56, 0.060);--cx-border-l1:rgba(36, 21, 56, 0.055);--cx-border-l2:rgba(36,21,56,0.10);--cx-border-l3:rgba(36, 21, 56, 0.160);--cx-border-strong:rgba(36, 21, 56, 0.220);--cx-sidebar-divider:rgba(36, 21, 56, 0.055);--cx-sidebar-divider-hover:rgba(36, 21, 56, 0.220);--cx-frame-line:rgba(36,21,56,0.10);--cx-text:#241538;--cx-text-2:#5c4680;--cx-text-3:#8570a8;--cx-text-4:rgba(36, 21, 56, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#8570a8;--cx-sidebar-text:#5c4680;--cx-sidebar-muted:#8570a8;--cx-sidebar-selected:#e3d8f7;--cx-accent:#7c3aed;--cx-accent-soft:#7c3aed;--cx-focus:#7c3aed;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#7c3aed;--cx-picker-fill:#fbf8fe;--cx-composer-fill:#fbf8fe;--cx-popover-fill:#fbf8fe;--cx-reasoning-track:rgba(36, 21, 56, 0.220);--cx-reasoning-title:#7c3aed;--cx-reasoning-max-text:#7c3aed}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"violet\"][data-ds-dark-theme]{--cx-window:#120b1e;--cx-sidebar:#140c22;--cx-surface:#120b1e;--cx-thread:#191031;--cx-nested:#191031;--cx-elevated:#191031;--cx-summary:#231540;--cx-hover:rgba(239, 232, 255, 0.100);--cx-active:rgba(239, 232, 255, 0.100);--cx-border-l1:rgba(239, 232, 255, 0.055);--cx-border-l2:rgba(239,232,255,0.10);--cx-border-l3:rgba(239, 232, 255, 0.160);--cx-border-strong:rgba(239, 232, 255, 0.220);--cx-sidebar-divider:rgba(239, 232, 255, 0.055);--cx-sidebar-divider-hover:rgba(239, 232, 255, 0.220);--cx-frame-line:rgba(239,232,255,0.10);--cx-text:#efe8ff;--cx-text-2:#b3a2e0;--cx-text-3:#7e6ca8;--cx-text-4:rgba(239, 232, 255, 0.450);--cx-text-inverse:#1d0f38;--cx-nav-icon:#7e6ca8;--cx-sidebar-text:#b3a2e0;--cx-sidebar-muted:#7e6ca8;--cx-sidebar-selected:#231540;--cx-accent:#a78bfa;--cx-accent-soft:#a78bfa;--cx-focus:#a78bfa;--cx-success:#4ade80;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#a78bfa;--cx-picker-fill:#191031;--cx-composer-fill:#191031;--cx-popover-fill:#191031;--cx-reasoning-track:rgba(239, 232, 255, 0.220);--cx-reasoning-title:#a78bfa;--cx-reasoning-max-text:#a78bfa}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"cyber\"]{--cx-window:#d0e9f2;--cx-sidebar:#d0e8f3;--cx-surface:#d0e9f2;--cx-thread:#edf7f9;--cx-nested:#edf7f9;--cx-elevated:#edf7f9;--cx-summary:#bde0ec;--cx-hover:rgba(12, 36, 56, 0.060);--cx-active:rgba(12, 36, 56, 0.060);--cx-border-l1:rgba(12, 36, 56, 0.055);--cx-border-l2:rgba(12,36,56,0.10);--cx-border-l3:rgba(12, 36, 56, 0.160);--cx-border-strong:rgba(12, 36, 56, 0.220);--cx-sidebar-divider:rgba(12, 36, 56, 0.055);--cx-sidebar-divider-hover:rgba(12, 36, 56, 0.220);--cx-frame-line:rgba(12,36,56,0.10);--cx-text:#0c2438;--cx-text-2:#3d5f7d;--cx-text-3:#6d8aa5;--cx-text-4:rgba(12, 36, 56, 0.450);--cx-text-inverse:#001722;--cx-nav-icon:#6d8aa5;--cx-sidebar-text:#3d5f7d;--cx-sidebar-muted:#6d8aa5;--cx-sidebar-selected:#bde0ec;--cx-accent:#0891b2;--cx-accent-soft:#0891b2;--cx-focus:#0891b2;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0891b2;--cx-picker-fill:#edf7f9;--cx-composer-fill:#edf7f9;--cx-popover-fill:#edf7f9;--cx-reasoning-track:rgba(12, 36, 56, 0.220);--cx-reasoning-title:#0891b2;--cx-reasoning-max-text:#0891b2}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"cyber\"][data-ds-dark-theme]{--cx-window:#070b14;--cx-sidebar:#090e19;--cx-surface:#070b14;--cx-thread:#0d1422;--cx-nested:#0d1422;--cx-elevated:#0d1422;--cx-summary:#162032;--cx-hover:rgba(223, 242, 255, 0.100);--cx-active:rgba(223, 242, 255, 0.100);--cx-border-l1:rgba(223, 242, 255, 0.055);--cx-border-l2:rgba(223,242,255,0.10);--cx-border-l3:rgba(223, 242, 255, 0.160);--cx-border-strong:rgba(223, 242, 255, 0.220);--cx-sidebar-divider:rgba(223, 242, 255, 0.055);--cx-sidebar-divider-hover:rgba(223, 242, 255, 0.220);--cx-frame-line:rgba(223,242,255,0.10);--cx-text:#dff2ff;--cx-text-2:#8fb4d8;--cx-text-3:#64849f;--cx-text-4:rgba(223, 242, 255, 0.450);--cx-text-inverse:#001722;--cx-nav-icon:#64849f;--cx-sidebar-text:#8fb4d8;--cx-sidebar-muted:#64849f;--cx-sidebar-selected:#162032;--cx-accent:#22d3ee;--cx-accent-soft:#22d3ee;--cx-focus:#22d3ee;--cx-success:#4ade80;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#22d3ee;--cx-picker-fill:#0d1422;--cx-composer-fill:#0d1422;--cx-popover-fill:#0d1422;--cx-reasoning-track:rgba(223, 242, 255, 0.220);--cx-reasoning-title:#22d3ee;--cx-reasoning-max-text:#22d3ee}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"retro\"]{--cx-window:#f2decb;--cx-sidebar:#eeddc8;--cx-surface:#f2decb;--cx-thread:#f9ede0;--cx-nested:#f9ede0;--cx-elevated:#f9ede0;--cx-summary:#e9ceb3;--cx-hover:rgba(58, 42, 23, 0.060);--cx-active:rgba(58, 42, 23, 0.060);--cx-border-l1:rgba(58, 42, 23, 0.066);--cx-border-l2:rgba(58,42,23,0.12);--cx-border-l3:rgba(58, 42, 23, 0.192);--cx-border-strong:rgba(58, 42, 23, 0.264);--cx-sidebar-divider:rgba(58, 42, 23, 0.066);--cx-sidebar-divider-hover:rgba(58, 42, 23, 0.264);--cx-frame-line:rgba(58,42,23,0.12);--cx-text:#3a2a17;--cx-text-2:#7a6140;--cx-text-3:#a48e6a;--cx-text-4:rgba(58, 42, 23, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#a48e6a;--cx-sidebar-text:#7a6140;--cx-sidebar-muted:#a48e6a;--cx-sidebar-selected:#e9ceb3;--cx-accent:#c2410c;--cx-accent-soft:#c2410c;--cx-focus:#c2410c;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#c2410c;--cx-picker-fill:#f9ede0;--cx-composer-fill:#f9ede0;--cx-popover-fill:#f9ede0;--cx-reasoning-track:rgba(58, 42, 23, 0.264);--cx-reasoning-title:#c2410c;--cx-reasoning-max-text:#c2410c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"retro\"][data-ds-dark-theme]{--cx-window:#1a1309;--cx-sidebar:#1c140a;--cx-surface:#1a1309;--cx-thread:#231a0e;--cx-nested:#231a0e;--cx-elevated:#231a0e;--cx-summary:#2f2413;--cx-hover:rgba(245, 234, 213, 0.100);--cx-active:rgba(245, 234, 213, 0.100);--cx-border-l1:rgba(245, 234, 213, 0.055);--cx-border-l2:rgba(245,234,213,0.10);--cx-border-l3:rgba(245, 234, 213, 0.160);--cx-border-strong:rgba(245, 234, 213, 0.220);--cx-sidebar-divider:rgba(245, 234, 213, 0.055);--cx-sidebar-divider-hover:rgba(245, 234, 213, 0.220);--cx-frame-line:rgba(245,234,213,0.10);--cx-text:#f5ead5;--cx-text-2:#bfa97e;--cx-text-3:#8d7a57;--cx-text-4:rgba(245, 234, 213, 0.450);--cx-text-inverse:#2a0d01;--cx-nav-icon:#8d7a57;--cx-sidebar-text:#bfa97e;--cx-sidebar-muted:#8d7a57;--cx-sidebar-selected:#2f2413;--cx-accent:#fb923c;--cx-accent-soft:#fb923c;--cx-focus:#fb923c;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#fb923c;--cx-picker-fill:#231a0e;--cx-composer-fill:#231a0e;--cx-popover-fill:#231a0e;--cx-reasoning-track:rgba(245, 234, 213, 0.220);--cx-reasoning-title:#fb923c;--cx-reasoning-max-text:#fb923c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"terminal\"]{--cx-window:#e7f1ea;--cx-sidebar:#e1ede3;--cx-surface:#e7f1ea;--cx-thread:#f7fcf9;--cx-nested:#f7fcf9;--cx-elevated:#f7fcf9;--cx-summary:#d7e6db;--cx-hover:rgba(21, 33, 23, 0.060);--cx-active:rgba(21, 33, 23, 0.060);--cx-border-l1:rgba(21, 33, 23, 0.055);--cx-border-l2:rgba(21,33,23,0.10);--cx-border-l3:rgba(21, 33, 23, 0.160);--cx-border-strong:rgba(21, 33, 23, 0.220);--cx-sidebar-divider:rgba(21, 33, 23, 0.055);--cx-sidebar-divider-hover:rgba(21, 33, 23, 0.220);--cx-frame-line:rgba(21,33,23,0.10);--cx-text:#152117;--cx-text-2:#4c5e4f;--cx-text-3:#7c8f7f;--cx-text-4:rgba(21, 33, 23, 0.450);--cx-text-inverse:#00290f;--cx-nav-icon:#7c8f7f;--cx-sidebar-text:#4c5e4f;--cx-sidebar-muted:#7c8f7f;--cx-sidebar-selected:#d7e6db;--cx-accent:#16a34a;--cx-accent-soft:#16a34a;--cx-focus:#16a34a;--cx-success:#16a34a;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#16a34a;--cx-picker-fill:#f7fcf9;--cx-composer-fill:#f7fcf9;--cx-popover-fill:#f7fcf9;--cx-reasoning-track:rgba(21, 33, 23, 0.220);--cx-reasoning-title:#16a34a;--cx-reasoning-max-text:#16a34a}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"terminal\"][data-ds-dark-theme]{--cx-window:#060d08;--cx-sidebar:#081008;--cx-surface:#060d08;--cx-thread:#0b150d;--cx-nested:#0b150d;--cx-elevated:#0b150d;--cx-summary:#122112;--cx-hover:rgba(211, 245, 220, 0.100);--cx-active:rgba(211, 245, 220, 0.100);--cx-border-l1:rgba(211, 245, 220, 0.055);--cx-border-l2:rgba(211,245,220,0.10);--cx-border-l3:rgba(211, 245, 220, 0.160);--cx-border-strong:rgba(211, 245, 220, 0.220);--cx-sidebar-divider:rgba(211, 245, 220, 0.055);--cx-sidebar-divider-hover:rgba(211, 245, 220, 0.220);--cx-frame-line:rgba(211,245,220,0.10);--cx-text:#d3f5dc;--cx-text-2:#7fbf8d;--cx-text-3:#52835e;--cx-text-4:rgba(211, 245, 220, 0.450);--cx-text-inverse:#00290f;--cx-nav-icon:#52835e;--cx-sidebar-text:#7fbf8d;--cx-sidebar-muted:#52835e;--cx-sidebar-selected:#122112;--cx-accent:#22c55e;--cx-accent-soft:#22c55e;--cx-focus:#22c55e;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#22c55e;--cx-picker-fill:#0b150d;--cx-composer-fill:#0b150d;--cx-popover-fill:#0b150d;--cx-reasoning-track:rgba(211, 245, 220, 0.220);--cx-reasoning-title:#22c55e;--cx-reasoning-max-text:#22c55e}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"dune\"]{--cx-window:#f1e5d4;--cx-sidebar:#ede2cf;--cx-surface:#f1e5d4;--cx-thread:#fbf4e8;--cx-nested:#fbf4e8;--cx-elevated:#fbf4e8;--cx-summary:#e8d7be;--cx-hover:rgba(46, 38, 20, 0.060);--cx-active:rgba(46, 38, 20, 0.060);--cx-border-l1:rgba(46, 38, 20, 0.055);--cx-border-l2:rgba(46,38,20,0.10);--cx-border-l3:rgba(46, 38, 20, 0.160);--cx-border-strong:rgba(46, 38, 20, 0.220);--cx-sidebar-divider:rgba(46, 38, 20, 0.055);--cx-sidebar-divider-hover:rgba(46, 38, 20, 0.220);--cx-frame-line:rgba(46,38,20,0.10);--cx-text:#2e2614;--cx-text-2:#6b5e3c;--cx-text-3:#988b64;--cx-text-4:rgba(46, 38, 20, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#988b64;--cx-sidebar-text:#6b5e3c;--cx-sidebar-muted:#988b64;--cx-sidebar-selected:#e8d7be;--cx-accent:#b45309;--cx-accent-soft:#b45309;--cx-focus:#b45309;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#b45309;--cx-picker-fill:#fbf4e8;--cx-composer-fill:#fbf4e8;--cx-popover-fill:#fbf4e8;--cx-reasoning-track:rgba(46, 38, 20, 0.220);--cx-reasoning-title:#b45309;--cx-reasoning-max-text:#b45309}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"dune\"][data-ds-dark-theme]{--cx-window:#161208;--cx-sidebar:#181307;--cx-surface:#161208;--cx-thread:#1e190c;--cx-nested:#1e190c;--cx-elevated:#1e190c;--cx-summary:#2a2312;--cx-hover:rgba(244, 236, 212, 0.100);--cx-active:rgba(244, 236, 212, 0.100);--cx-border-l1:rgba(244, 236, 212, 0.055);--cx-border-l2:rgba(244,236,212,0.10);--cx-border-l3:rgba(244, 236, 212, 0.160);--cx-border-strong:rgba(244, 236, 212, 0.220);--cx-sidebar-divider:rgba(244, 236, 212, 0.055);--cx-sidebar-divider-hover:rgba(244, 236, 212, 0.220);--cx-frame-line:rgba(244,236,212,0.10);--cx-text:#f4ecd4;--cx-text-2:#b6a776;--cx-text-3:#857849;--cx-text-4:rgba(244, 236, 212, 0.450);--cx-text-inverse:#1f0d00;--cx-nav-icon:#857849;--cx-sidebar-text:#b6a776;--cx-sidebar-muted:#857849;--cx-sidebar-selected:#2a2312;--cx-accent:#d97706;--cx-accent-soft:#d97706;--cx-focus:#d97706;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#d97706;--cx-picker-fill:#1e190c;--cx-composer-fill:#1e190c;--cx-popover-fill:#1e190c;--cx-reasoning-track:rgba(244, 236, 212, 0.220);--cx-reasoning-title:#d97706;--cx-reasoning-max-text:#d97706}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"glacier\"]{--cx-window:#cde6f5;--cx-sidebar:#cfe6f5;--cx-surface:#cde6f5;--cx-thread:#ecf6fb;--cx-nested:#ecf6fb;--cx-elevated:#ecf6fb;--cx-summary:#badcf0;--cx-hover:rgba(11, 36, 56, 0.060);--cx-active:rgba(11, 36, 56, 0.060);--cx-border-l1:rgba(11, 36, 56, 0.055);--cx-border-l2:rgba(11,36,56,0.10);--cx-border-l3:rgba(11, 36, 56, 0.160);--cx-border-strong:rgba(11, 36, 56, 0.220);--cx-sidebar-divider:rgba(11, 36, 56, 0.055);--cx-sidebar-divider-hover:rgba(11, 36, 56, 0.220);--cx-frame-line:rgba(11,36,56,0.10);--cx-text:#0b2438;--cx-text-2:#3d627e;--cx-text-3:#6d8ba4;--cx-text-4:rgba(11, 36, 56, 0.450);--cx-text-inverse:#000d18;--cx-nav-icon:#6d8ba4;--cx-sidebar-text:#3d627e;--cx-sidebar-muted:#6d8ba4;--cx-sidebar-selected:#badcf0;--cx-accent:#0284c7;--cx-accent-soft:#0284c7;--cx-focus:#0284c7;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0284c7;--cx-picker-fill:#ecf6fb;--cx-composer-fill:#ecf6fb;--cx-popover-fill:#ecf6fb;--cx-reasoning-track:rgba(11, 36, 56, 0.220);--cx-reasoning-title:#0284c7;--cx-reasoning-max-text:#0284c7}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"glacier\"][data-ds-dark-theme]{--cx-window:#0a141d;--cx-sidebar:#0c1821;--cx-surface:#0a141d;--cx-thread:#101d29;--cx-nested:#101d29;--cx-elevated:#101d29;--cx-summary:#182838;--cx-hover:rgba(223, 241, 252, 0.100);--cx-active:rgba(223, 241, 252, 0.100);--cx-border-l1:rgba(223, 241, 252, 0.055);--cx-border-l2:rgba(223,241,252,0.10);--cx-border-l3:rgba(223, 241, 252, 0.160);--cx-border-strong:rgba(223, 241, 252, 0.220);--cx-sidebar-divider:rgba(223, 241, 252, 0.055);--cx-sidebar-divider-hover:rgba(223, 241, 252, 0.220);--cx-frame-line:rgba(223,241,252,0.10);--cx-text:#dff1fc;--cx-text-2:#93b8d0;--cx-text-3:#648096;--cx-text-4:rgba(223, 241, 252, 0.450);--cx-text-inverse:#000d18;--cx-nav-icon:#648096;--cx-sidebar-text:#93b8d0;--cx-sidebar-muted:#648096;--cx-sidebar-selected:#182838;--cx-accent:#38bdf8;--cx-accent-soft:#38bdf8;--cx-focus:#38bdf8;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#38bdf8;--cx-picker-fill:#101d29;--cx-composer-fill:#101d29;--cx-popover-fill:#101d29;--cx-reasoning-track:rgba(223, 241, 252, 0.220);--cx-reasoning-title:#38bdf8;--cx-reasoning-max-text:#38bdf8}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"nebula\"]{--cx-window:#e4e4fa;--cx-sidebar:#e1e2f8;--cx-surface:#e4e4fa;--cx-thread:#f7f7fe;--cx-nested:#f7f7fe;--cx-elevated:#f7f7fe;--cx-summary:#d8d8f6;--cx-hover:rgba(28, 26, 62, 0.060);--cx-active:rgba(28, 26, 62, 0.060);--cx-border-l1:rgba(28, 26, 62, 0.055);--cx-border-l2:rgba(28,26,62,0.10);--cx-border-l3:rgba(28, 26, 62, 0.160);--cx-border-strong:rgba(28, 26, 62, 0.220);--cx-sidebar-divider:rgba(28, 26, 62, 0.055);--cx-sidebar-divider-hover:rgba(28, 26, 62, 0.220);--cx-frame-line:rgba(28,26,62,0.10);--cx-text:#1c1a3e;--cx-text-2:#514f85;--cx-text-3:#7d7bad;--cx-text-4:rgba(28, 26, 62, 0.450);--cx-text-inverse:#050020;--cx-nav-icon:#7d7bad;--cx-sidebar-text:#514f85;--cx-sidebar-muted:#7d7bad;--cx-sidebar-selected:#d8d8f6;--cx-accent:#6366f1;--cx-accent-soft:#6366f1;--cx-focus:#6366f1;--cx-success:#0d9488;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#6366f1;--cx-picker-fill:#f7f7fe;--cx-composer-fill:#f7f7fe;--cx-popover-fill:#f7f7fe;--cx-reasoning-track:rgba(28, 26, 62, 0.220);--cx-reasoning-title:#6366f1;--cx-reasoning-max-text:#6366f1}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"nebula\"][data-ds-dark-theme]{--cx-window:#0c0b1d;--cx-sidebar:#0e0d22;--cx-surface:#0c0b1d;--cx-thread:#131230;--cx-nested:#131230;--cx-elevated:#131230;--cx-summary:#1b1a3f;--cx-hover:rgba(232, 231, 255, 0.100);--cx-active:rgba(232, 231, 255, 0.100);--cx-border-l1:rgba(232, 231, 255, 0.055);--cx-border-l2:rgba(232,231,255,0.10);--cx-border-l3:rgba(232, 231, 255, 0.160);--cx-border-strong:rgba(232, 231, 255, 0.220);--cx-sidebar-divider:rgba(232, 231, 255, 0.055);--cx-sidebar-divider-hover:rgba(232, 231, 255, 0.220);--cx-frame-line:rgba(232,231,255,0.10);--cx-text:#e8e7ff;--cx-text-2:#a5a3dc;--cx-text-3:#716fa6;--cx-text-4:rgba(232, 231, 255, 0.450);--cx-text-inverse:#050020;--cx-nav-icon:#716fa6;--cx-sidebar-text:#a5a3dc;--cx-sidebar-muted:#716fa6;--cx-sidebar-selected:#1b1a3f;--cx-accent:#818cf8;--cx-accent-soft:#818cf8;--cx-focus:#818cf8;--cx-success:#2dd4bf;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#818cf8;--cx-picker-fill:#131230;--cx-composer-fill:#131230;--cx-popover-fill:#131230;--cx-reasoning-track:rgba(232, 231, 255, 0.220);--cx-reasoning-title:#818cf8;--cx-reasoning-max-text:#818cf8}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"coral\"]{--cx-window:#fceae4;--cx-sidebar:#f8e5dd;--cx-surface:#fceae4;--cx-thread:#fefaf8;--cx-nested:#fefaf8;--cx-elevated:#fefaf8;--cx-summary:#f7dcd2;--cx-hover:rgba(51, 21, 16, 0.060);--cx-active:rgba(51, 21, 16, 0.060);--cx-border-l1:rgba(51, 21, 16, 0.055);--cx-border-l2:rgba(51,21,16,0.10);--cx-border-l3:rgba(51, 21, 16, 0.160);--cx-border-strong:rgba(51, 21, 16, 0.220);--cx-sidebar-divider:rgba(51, 21, 16, 0.055);--cx-sidebar-divider-hover:rgba(51, 21, 16, 0.220);--cx-frame-line:rgba(51,21,16,0.10);--cx-text:#331510;--cx-text-2:#7a4a40;--cx-text-3:#a5756a;--cx-text-4:rgba(51, 21, 16, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#a5756a;--cx-sidebar-text:#7a4a40;--cx-sidebar-muted:#a5756a;--cx-sidebar-selected:#f7dcd2;--cx-accent:#ea580c;--cx-accent-soft:#ea580c;--cx-focus:#ea580c;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#ea580c;--cx-picker-fill:#fefaf8;--cx-composer-fill:#fefaf8;--cx-popover-fill:#fefaf8;--cx-reasoning-track:rgba(51, 21, 16, 0.220);--cx-reasoning-title:#ea580c;--cx-reasoning-max-text:#ea580c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"coral\"][data-ds-dark-theme]{--cx-window:#170d0d;--cx-sidebar:#190f0f;--cx-surface:#170d0d;--cx-thread:#201313;--cx-nested:#201313;--cx-elevated:#201313;--cx-summary:#2c1a1a;--cx-hover:rgba(253, 238, 237, 0.100);--cx-active:rgba(253, 238, 237, 0.100);--cx-border-l1:rgba(253, 238, 237, 0.055);--cx-border-l2:rgba(253,238,237,0.10);--cx-border-l3:rgba(253, 238, 237, 0.160);--cx-border-strong:rgba(253, 238, 237, 0.220);--cx-sidebar-divider:rgba(253, 238, 237, 0.055);--cx-sidebar-divider-hover:rgba(253, 238, 237, 0.220);--cx-frame-line:rgba(253,238,237,0.10);--cx-text:#fdeeed;--cx-text-2:#d0a09b;--cx-text-3:#9c6f6a;--cx-text-4:rgba(253, 238, 237, 0.450);--cx-text-inverse:#2b0f02;--cx-nav-icon:#9c6f6a;--cx-sidebar-text:#d0a09b;--cx-sidebar-muted:#9c6f6a;--cx-sidebar-selected:#2c1a1a;--cx-accent:#fb7185;--cx-accent-soft:#fb7185;--cx-focus:#fb7185;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#fb7185;--cx-picker-fill:#201313;--cx-composer-fill:#201313;--cx-popover-fill:#201313;--cx-reasoning-track:rgba(253, 238, 237, 0.220);--cx-reasoning-title:#fb7185;--cx-reasoning-max-text:#fb7185}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"steel\"]{--cx-window:#e7edf3;--cx-sidebar:#e2e9ef;--cx-surface:#e7edf3;--cx-thread:#f9fcfd;--cx-nested:#f9fcfd;--cx-elevated:#f9fcfd;--cx-summary:#dae4eb;--cx-hover:rgba(22, 32, 43, 0.060);--cx-active:rgba(22, 32, 43, 0.060);--cx-border-l1:rgba(22, 32, 43, 0.055);--cx-border-l2:rgba(22,32,43,0.10);--cx-border-l3:rgba(22, 32, 43, 0.160);--cx-border-strong:rgba(22, 32, 43, 0.220);--cx-sidebar-divider:rgba(22, 32, 43, 0.055);--cx-sidebar-divider-hover:rgba(22, 32, 43, 0.220);--cx-frame-line:rgba(22,32,43,0.10);--cx-text:#16202b;--cx-text-2:#46586a;--cx-text-3:#75879a;--cx-text-4:rgba(22, 32, 43, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#75879a;--cx-sidebar-text:#46586a;--cx-sidebar-muted:#75879a;--cx-sidebar-selected:#dae4eb;--cx-accent:#0369a1;--cx-accent-soft:#0369a1;--cx-focus:#0369a1;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0369a1;--cx-picker-fill:#f9fcfd;--cx-composer-fill:#f9fcfd;--cx-popover-fill:#f9fcfd;--cx-reasoning-track:rgba(22, 32, 43, 0.220);--cx-reasoning-title:#0369a1;--cx-reasoning-max-text:#0369a1}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"steel\"][data-ds-dark-theme]{--cx-window:#11161c;--cx-sidebar:#131920;--cx-surface:#11161c;--cx-thread:#181f27;--cx-nested:#181f27;--cx-elevated:#181f27;--cx-summary:#212b36;--cx-hover:rgba(227, 234, 241, 0.100);--cx-active:rgba(227, 234, 241, 0.100);--cx-border-l1:rgba(227, 234, 241, 0.055);--cx-border-l2:rgba(227,234,241,0.10);--cx-border-l3:rgba(227, 234, 241, 0.160);--cx-border-strong:rgba(227, 234, 241, 0.220);--cx-sidebar-divider:rgba(227, 234, 241, 0.055);--cx-sidebar-divider-hover:rgba(227, 234, 241, 0.220);--cx-frame-line:rgba(227,234,241,0.10);--cx-text:#e3eaf1;--cx-text-2:#9aabbd;--cx-text-3:#6b7d8f;--cx-text-4:rgba(227, 234, 241, 0.450);--cx-text-inverse:#05283c;--cx-nav-icon:#6b7d8f;--cx-sidebar-text:#9aabbd;--cx-sidebar-muted:#6b7d8f;--cx-sidebar-selected:#212b36;--cx-accent:#38bdf8;--cx-accent-soft:#38bdf8;--cx-focus:#38bdf8;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#38bdf8;--cx-picker-fill:#181f27;--cx-composer-fill:#181f27;--cx-popover-fill:#181f27;--cx-reasoning-track:rgba(227, 234, 241, 0.220);--cx-reasoning-title:#38bdf8;--cx-reasoning-max-text:#38bdf8}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"autumn\"]{--cx-window:#f9ebd5;--cx-sidebar:#f4e6d0;--cx-surface:#f9ebd5;--cx-thread:#fef8ed;--cx-nested:#fef8ed;--cx-elevated:#fef8ed;--cx-summary:#f2dfbe;--cx-hover:rgba(51, 36, 15, 0.060);--cx-active:rgba(51, 36, 15, 0.060);--cx-border-l1:rgba(51, 36, 15, 0.055);--cx-border-l2:rgba(51,36,15,0.10);--cx-border-l3:rgba(51, 36, 15, 0.160);--cx-border-strong:rgba(51, 36, 15, 0.220);--cx-sidebar-divider:rgba(51, 36, 15, 0.055);--cx-sidebar-divider-hover:rgba(51, 36, 15, 0.220);--cx-frame-line:rgba(51,36,15,0.10);--cx-text:#33240f;--cx-text-2:#6f5931;--cx-text-3:#9d8859;--cx-text-4:rgba(51, 36, 15, 0.450);--cx-text-inverse:#2b1400;--cx-nav-icon:#9d8859;--cx-sidebar-text:#6f5931;--cx-sidebar-muted:#9d8859;--cx-sidebar-selected:#f2dfbe;--cx-accent:#d97706;--cx-accent-soft:#d97706;--cx-focus:#d97706;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#d97706;--cx-picker-fill:#fef8ed;--cx-composer-fill:#fef8ed;--cx-popover-fill:#fef8ed;--cx-reasoning-track:rgba(51, 36, 15, 0.220);--cx-reasoning-title:#d97706;--cx-reasoning-max-text:#d97706}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"autumn\"][data-ds-dark-theme]{--cx-window:#181105;--cx-sidebar:#1a1205;--cx-surface:#181105;--cx-thread:#211806;--cx-nested:#211806;--cx-elevated:#211806;--cx-summary:#2d210c;--cx-hover:rgba(249, 238, 211, 0.100);--cx-active:rgba(249, 238, 211, 0.100);--cx-border-l1:rgba(249, 238, 211, 0.055);--cx-border-l2:rgba(249,238,211,0.10);--cx-border-l3:rgba(249, 238, 211, 0.160);--cx-border-strong:rgba(249, 238, 211, 0.220);--cx-sidebar-divider:rgba(249, 238, 211, 0.055);--cx-sidebar-divider-hover:rgba(249, 238, 211, 0.220);--cx-frame-line:rgba(249,238,211,0.10);--cx-text:#f9eed3;--cx-text-2:#c2a86b;--cx-text-3:#8d7848;--cx-text-4:rgba(249, 238, 211, 0.450);--cx-text-inverse:#2b1400;--cx-nav-icon:#8d7848;--cx-sidebar-text:#c2a86b;--cx-sidebar-muted:#8d7848;--cx-sidebar-selected:#2d210c;--cx-accent:#f59e0b;--cx-accent-soft:#f59e0b;--cx-focus:#f59e0b;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#f59e0b;--cx-picker-fill:#211806;--cx-composer-fill:#211806;--cx-popover-fill:#211806;--cx-reasoning-track:rgba(249, 238, 211, 0.220);--cx-reasoning-title:#f59e0b;--cx-reasoning-max-text:#f59e0b}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"matcha\"]{--cx-window:#e8f0d8;--cx-sidebar:#e5edd5;--cx-surface:#e8f0d8;--cx-thread:#f7faf3;--cx-nested:#f7faf3;--cx-elevated:#f7faf3;--cx-summary:#dbe7c4;--cx-hover:rgba(35, 43, 18, 0.060);--cx-active:rgba(35, 43, 18, 0.060);--cx-border-l1:rgba(35, 43, 18, 0.055);--cx-border-l2:rgba(35,43,18,0.10);--cx-border-l3:rgba(35, 43, 18, 0.160);--cx-border-strong:rgba(35, 43, 18, 0.220);--cx-sidebar-divider:rgba(35, 43, 18, 0.055);--cx-sidebar-divider-hover:rgba(35, 43, 18, 0.220);--cx-frame-line:rgba(35,43,18,0.10);--cx-text:#232b12;--cx-text-2:#5a6635;--cx-text-3:#89935e;--cx-text-4:rgba(35, 43, 18, 0.450);--cx-text-inverse:#122400;--cx-nav-icon:#89935e;--cx-sidebar-text:#5a6635;--cx-sidebar-muted:#89935e;--cx-sidebar-selected:#dbe7c4;--cx-accent:#65a30d;--cx-accent-soft:#65a30d;--cx-focus:#65a30d;--cx-success:#15803d;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#65a30d;--cx-picker-fill:#f7faf3;--cx-composer-fill:#f7faf3;--cx-popover-fill:#f7faf3;--cx-reasoning-track:rgba(35, 43, 18, 0.220);--cx-reasoning-title:#65a30d;--cx-reasoning-max-text:#65a30d}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"matcha\"][data-ds-dark-theme]{--cx-window:#131606;--cx-sidebar:#151806;--cx-surface:#131606;--cx-thread:#1a1e09;--cx-nested:#1a1e09;--cx-elevated:#1a1e09;--cx-summary:#242a0e;--cx-hover:rgba(241, 245, 220, 0.100);--cx-active:rgba(241, 245, 220, 0.100);--cx-border-l1:rgba(241, 245, 220, 0.055);--cx-border-l2:rgba(241,245,220,0.10);--cx-border-l3:rgba(241, 245, 220, 0.160);--cx-border-strong:rgba(241, 245, 220, 0.220);--cx-sidebar-divider:rgba(241, 245, 220, 0.055);--cx-sidebar-divider-hover:rgba(241, 245, 220, 0.220);--cx-frame-line:rgba(241,245,220,0.10);--cx-text:#f1f5dc;--cx-text-2:#b3c07c;--cx-text-3:#818c52;--cx-text-4:rgba(241, 245, 220, 0.450);--cx-text-inverse:#122400;--cx-nav-icon:#818c52;--cx-sidebar-text:#b3c07c;--cx-sidebar-muted:#818c52;--cx-sidebar-selected:#242a0e;--cx-accent:#a3e635;--cx-accent-soft:#a3e635;--cx-focus:#a3e635;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#a3e635;--cx-picker-fill:#1a1e09;--cx-composer-fill:#1a1e09;--cx-popover-fill:#1a1e09;--cx-reasoning-track:rgba(241, 245, 220, 0.220);--cx-reasoning-title:#a3e635;--cx-reasoning-max-text:#a3e635}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"knight\"]{--cx-window:#efe9dd;--cx-sidebar:#eae4d4;--cx-surface:#efe9dd;--cx-thread:#faf6ef;--cx-nested:#faf6ef;--cx-elevated:#faf6ef;--cx-summary:#e5dbc9;--cx-hover:rgba(36, 31, 20, 0.060);--cx-active:rgba(36, 31, 20, 0.060);--cx-border-l1:rgba(36, 31, 20, 0.055);--cx-border-l2:rgba(36,31,20,0.10);--cx-border-l3:rgba(36, 31, 20, 0.160);--cx-border-strong:rgba(36, 31, 20, 0.220);--cx-sidebar-divider:rgba(36, 31, 20, 0.055);--cx-sidebar-divider-hover:rgba(36, 31, 20, 0.220);--cx-frame-line:rgba(36,31,20,0.10);--cx-text:#241f14;--cx-text-2:#60573f;--cx-text-3:#8e8468;--cx-text-4:rgba(36, 31, 20, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#8e8468;--cx-sidebar-text:#60573f;--cx-sidebar-muted:#8e8468;--cx-sidebar-selected:#e5dbc9;--cx-accent:#9a6b16;--cx-accent-soft:#9a6b16;--cx-focus:#9a6b16;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#9a6b16;--cx-picker-fill:#faf6ef;--cx-composer-fill:#faf6ef;--cx-popover-fill:#faf6ef;--cx-reasoning-track:rgba(36, 31, 20, 0.220);--cx-reasoning-title:#9a6b16;--cx-reasoning-max-text:#9a6b16}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"knight\"][data-ds-dark-theme]{--cx-window:#121110;--cx-sidebar:#141311;--cx-surface:#121110;--cx-thread:#1a1816;--cx-nested:#1a1816;--cx-elevated:#1a1816;--cx-summary:#242019;--cx-hover:rgba(240, 233, 216, 0.100);--cx-active:rgba(240, 233, 216, 0.100);--cx-border-l1:rgba(240, 233, 216, 0.055);--cx-border-l2:rgba(240,233,216,0.10);--cx-border-l3:rgba(240, 233, 216, 0.160);--cx-border-strong:rgba(240, 233, 216, 0.220);--cx-sidebar-divider:rgba(240, 233, 216, 0.055);--cx-sidebar-divider-hover:rgba(240, 233, 216, 0.220);--cx-frame-line:rgba(240,233,216,0.10);--cx-text:#f0e9d8;--cx-text-2:#b8a97e;--cx-text-3:#857855;--cx-text-4:rgba(240, 233, 216, 0.450);--cx-text-inverse:#1e1400;--cx-nav-icon:#857855;--cx-sidebar-text:#b8a97e;--cx-sidebar-muted:#857855;--cx-sidebar-selected:#242019;--cx-accent:#d4a72c;--cx-accent-soft:#d4a72c;--cx-focus:#d4a72c;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#d4a72c;--cx-picker-fill:#1a1816;--cx-composer-fill:#1a1816;--cx-popover-fill:#1a1816;--cx-reasoning-track:rgba(240, 233, 216, 0.220);--cx-reasoning-title:#d4a72c;--cx-reasoning-max-text:#d4a72c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"pastel\"]{--cx-window:#f6f2fd;--cx-sidebar:#efebf9;--cx-surface:#f6f2fd;--cx-thread:#fdfcff;--cx-nested:#fdfcff;--cx-elevated:#fdfcff;--cx-summary:#ece5f8;--cx-hover:rgba(44, 35, 64, 0.060);--cx-active:rgba(44, 35, 64, 0.060);--cx-border-l1:rgba(44, 35, 64, 0.055);--cx-border-l2:rgba(44,35,64,0.10);--cx-border-l3:rgba(44, 35, 64, 0.160);--cx-border-strong:rgba(44, 35, 64, 0.220);--cx-sidebar-divider:rgba(44, 35, 64, 0.055);--cx-sidebar-divider-hover:rgba(44, 35, 64, 0.220);--cx-frame-line:rgba(44,35,64,0.10);--cx-text:#2c2340;--cx-text-2:#6d6288;--cx-text-3:#9a8fb4;--cx-text-4:rgba(44, 35, 64, 0.450);--cx-text-inverse:#2e1065;--cx-nav-icon:#9a8fb4;--cx-sidebar-text:#6d6288;--cx-sidebar-muted:#9a8fb4;--cx-sidebar-selected:#ece5f8;--cx-accent:#a78bfa;--cx-accent-soft:#a78bfa;--cx-focus:#a78bfa;--cx-success:#0d9488;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#a78bfa;--cx-picker-fill:#fdfcff;--cx-composer-fill:#fdfcff;--cx-popover-fill:#fdfcff;--cx-reasoning-track:rgba(44, 35, 64, 0.220);--cx-reasoning-title:#a78bfa;--cx-reasoning-max-text:#a78bfa}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"pastel\"][data-ds-dark-theme]{--cx-window:#16121f;--cx-sidebar:#181322;--cx-surface:#16121f;--cx-thread:#1d1829;--cx-nested:#1d1829;--cx-elevated:#1d1829;--cx-summary:#282038;--cx-hover:rgba(239, 234, 255, 0.100);--cx-active:rgba(239, 234, 255, 0.100);--cx-border-l1:rgba(239, 234, 255, 0.055);--cx-border-l2:rgba(239,234,255,0.10);--cx-border-l3:rgba(239, 234, 255, 0.160);--cx-border-strong:rgba(239, 234, 255, 0.220);--cx-sidebar-divider:rgba(239, 234, 255, 0.055);--cx-sidebar-divider-hover:rgba(239, 234, 255, 0.220);--cx-frame-line:rgba(239,234,255,0.10);--cx-text:#efeaff;--cx-text-2:#b6a9d6;--cx-text-3:#8478a0;--cx-text-4:rgba(239, 234, 255, 0.450);--cx-text-inverse:#2e1065;--cx-nav-icon:#8478a0;--cx-sidebar-text:#b6a9d6;--cx-sidebar-muted:#8478a0;--cx-sidebar-selected:#282038;--cx-accent:#c4b5fd;--cx-accent-soft:#c4b5fd;--cx-focus:#c4b5fd;--cx-success:#2dd4bf;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#c4b5fd;--cx-picker-fill:#1d1829;--cx-composer-fill:#1d1829;--cx-popover-fill:#1d1829;--cx-reasoning-track:rgba(239, 234, 255, 0.220);--cx-reasoning-title:#c4b5fd;--cx-reasoning-max-text:#c4b5fd}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"lavender\"]{--cx-window:#efe8fc;--cx-sidebar:#e9e2fa;--cx-surface:#efe8fc;--cx-thread:#fbf9ff;--cx-nested:#fbf9ff;--cx-elevated:#fbf9ff;--cx-summary:#e3d9f8;--cx-hover:rgba(36, 27, 58, 0.060);--cx-active:rgba(36, 27, 58, 0.060);--cx-border-l1:rgba(36, 27, 58, 0.055);--cx-border-l2:rgba(36,27,58,0.10);--cx-border-l3:rgba(36, 27, 58, 0.160);--cx-border-strong:rgba(36, 27, 58, 0.220);--cx-sidebar-divider:rgba(36, 27, 58, 0.055);--cx-sidebar-divider-hover:rgba(36, 27, 58, 0.220);--cx-frame-line:rgba(36,27,58,0.10);--cx-text:#241b3a;--cx-text-2:#5b4f80;--cx-text-3:#8578a8;--cx-text-4:rgba(36, 27, 58, 0.450);--cx-text-inverse:#0c0420;--cx-nav-icon:#8578a8;--cx-sidebar-text:#5b4f80;--cx-sidebar-muted:#8578a8;--cx-sidebar-selected:#e3d9f8;--cx-accent:#8b5cf6;--cx-accent-soft:#8b5cf6;--cx-focus:#8b5cf6;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#8b5cf6;--cx-picker-fill:#fbf9ff;--cx-composer-fill:#fbf9ff;--cx-popover-fill:#fbf9ff;--cx-reasoning-track:rgba(36, 27, 58, 0.220);--cx-reasoning-title:#8b5cf6;--cx-reasoning-max-text:#8b5cf6}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"lavender\"][data-ds-dark-theme]{--cx-window:#131024;--cx-sidebar:#151126;--cx-surface:#131024;--cx-thread:#1a1630;--cx-nested:#1a1630;--cx-elevated:#1a1630;--cx-summary:#231d40;--cx-hover:rgba(237, 232, 255, 0.100);--cx-active:rgba(237, 232, 255, 0.100);--cx-border-l1:rgba(237, 232, 255, 0.055);--cx-border-l2:rgba(237,232,255,0.10);--cx-border-l3:rgba(237, 232, 255, 0.160);--cx-border-strong:rgba(237, 232, 255, 0.220);--cx-sidebar-divider:rgba(237, 232, 255, 0.055);--cx-sidebar-divider-hover:rgba(237, 232, 255, 0.220);--cx-frame-line:rgba(237,232,255,0.10);--cx-text:#ede8ff;--cx-text-2:#b0a5dc;--cx-text-3:#7d73a6;--cx-text-4:rgba(237, 232, 255, 0.450);--cx-text-inverse:#0c0420;--cx-nav-icon:#7d73a6;--cx-sidebar-text:#b0a5dc;--cx-sidebar-muted:#7d73a6;--cx-sidebar-selected:#231d40;--cx-accent:#a78bfa;--cx-accent-soft:#a78bfa;--cx-focus:#a78bfa;--cx-success:#4ade80;--cx-danger:#fb7185;--cx-warning:#fbbf24;--cx-attention:#a78bfa;--cx-picker-fill:#1a1630;--cx-composer-fill:#1a1630;--cx-popover-fill:#1a1630;--cx-reasoning-track:rgba(237, 232, 255, 0.220);--cx-reasoning-title:#a78bfa;--cx-reasoning-max-text:#a78bfa}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"charcoal\"]{--cx-window:#f4f4f4;--cx-sidebar:#ebebeb;--cx-surface:#f4f4f4;--cx-thread:#ffffff;--cx-nested:#ffffff;--cx-elevated:#ffffff;--cx-summary:#e9e9e9;--cx-hover:rgba(24, 24, 24, 0.060);--cx-active:rgba(24, 24, 24, 0.060);--cx-border-l1:rgba(24, 24, 24, 0.055);--cx-border-l2:rgba(24,24,24,0.10);--cx-border-l3:rgba(24, 24, 24, 0.160);--cx-border-strong:rgba(24, 24, 24, 0.220);--cx-sidebar-divider:rgba(24, 24, 24, 0.055);--cx-sidebar-divider-hover:rgba(24, 24, 24, 0.220);--cx-frame-line:rgba(24,24,24,0.10);--cx-text:#181818;--cx-text-2:#4d4d4d;--cx-text-3:#7d7d7d;--cx-text-4:rgba(24, 24, 24, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#7d7d7d;--cx-sidebar-text:#4d4d4d;--cx-sidebar-muted:#7d7d7d;--cx-sidebar-selected:#e9e9e9;--cx-accent:#333333;--cx-accent-soft:#333333;--cx-focus:#333333;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#333333;--cx-picker-fill:#ffffff;--cx-composer-fill:#ffffff;--cx-popover-fill:#ffffff;--cx-reasoning-track:rgba(24, 24, 24, 0.220);--cx-reasoning-title:#333333;--cx-reasoning-max-text:#333333}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"charcoal\"][data-ds-dark-theme]{--cx-window:#131313;--cx-sidebar:#151515;--cx-surface:#131313;--cx-thread:#1a1a1a;--cx-nested:#1a1a1a;--cx-elevated:#1a1a1a;--cx-summary:#232323;--cx-hover:rgba(232, 232, 232, 0.100);--cx-active:rgba(232, 232, 232, 0.100);--cx-border-l1:rgba(232, 232, 232, 0.055);--cx-border-l2:rgba(232,232,232,0.10);--cx-border-l3:rgba(232, 232, 232, 0.160);--cx-border-strong:rgba(232, 232, 232, 0.220);--cx-sidebar-divider:rgba(232, 232, 232, 0.055);--cx-sidebar-divider-hover:rgba(232, 232, 232, 0.220);--cx-frame-line:rgba(232,232,232,0.10);--cx-text:#e8e8e8;--cx-text-2:#9e9e9e;--cx-text-3:#6d6d6d;--cx-text-4:rgba(232, 232, 232, 0.450);--cx-text-inverse:#131313;--cx-nav-icon:#6d6d6d;--cx-sidebar-text:#9e9e9e;--cx-sidebar-muted:#6d6d6d;--cx-sidebar-selected:#232323;--cx-accent:#d4d4d4;--cx-accent-soft:#d4d4d4;--cx-focus:#d4d4d4;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#d4d4d4;--cx-picker-fill:#1a1a1a;--cx-composer-fill:#1a1a1a;--cx-popover-fill:#1a1a1a;--cx-reasoning-track:rgba(232, 232, 232, 0.220);--cx-reasoning-title:#d4d4d4;--cx-reasoning-max-text:#d4d4d4}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"rose\"]{--cx-window:#f7dce2;--cx-sidebar:#f5dce2;--cx-surface:#f7dce2;--cx-thread:#fbf2f4;--cx-nested:#fbf2f4;--cx-elevated:#fbf2f4;--cx-summary:#f1cbd4;--cx-hover:rgba(51, 20, 33, 0.060);--cx-active:rgba(51, 20, 33, 0.060);--cx-border-l1:rgba(51, 20, 33, 0.055);--cx-border-l2:rgba(51,20,33,0.10);--cx-border-l3:rgba(51, 20, 33, 0.160);--cx-border-strong:rgba(51, 20, 33, 0.220);--cx-sidebar-divider:rgba(51, 20, 33, 0.055);--cx-sidebar-divider-hover:rgba(51, 20, 33, 0.220);--cx-frame-line:rgba(51,20,33,0.10);--cx-text:#331421;--cx-text-2:#7a4a5c;--cx-text-3:#a57589;--cx-text-4:rgba(51, 20, 33, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#a57589;--cx-sidebar-text:#7a4a5c;--cx-sidebar-muted:#a57589;--cx-sidebar-selected:#f1cbd4;--cx-accent:#be123c;--cx-accent-soft:#be123c;--cx-focus:#be123c;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#be123c;--cx-picker-fill:#fbf2f4;--cx-composer-fill:#fbf2f4;--cx-popover-fill:#fbf2f4;--cx-reasoning-track:rgba(51, 20, 33, 0.220);--cx-reasoning-title:#be123c;--cx-reasoning-max-text:#be123c}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"rose\"][data-ds-dark-theme]{--cx-window:#190b12;--cx-sidebar:#1b0d14;--cx-surface:#190b12;--cx-thread:#221019;--cx-nested:#221019;--cx-elevated:#221019;--cx-summary:#2e1722;--cx-hover:rgba(253, 236, 242, 0.100);--cx-active:rgba(253, 236, 242, 0.100);--cx-border-l1:rgba(253, 236, 242, 0.055);--cx-border-l2:rgba(253,236,242,0.10);--cx-border-l3:rgba(253, 236, 242, 0.160);--cx-border-strong:rgba(253, 236, 242, 0.220);--cx-sidebar-divider:rgba(253, 236, 242, 0.055);--cx-sidebar-divider-hover:rgba(253, 236, 242, 0.220);--cx-frame-line:rgba(253,236,242,0.10);--cx-text:#fdecf2;--cx-text-2:#d19ab0;--cx-text-3:#9d6b82;--cx-text-4:rgba(253, 236, 242, 0.450);--cx-text-inverse:#2a0a14;--cx-nav-icon:#9d6b82;--cx-sidebar-text:#d19ab0;--cx-sidebar-muted:#9d6b82;--cx-sidebar-selected:#2e1722;--cx-accent:#fb7185;--cx-accent-soft:#fb7185;--cx-focus:#fb7185;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#fb7185;--cx-picker-fill:#221019;--cx-composer-fill:#221019;--cx-popover-fill:#221019;--cx-reasoning-track:rgba(253, 236, 242, 0.220);--cx-reasoning-title:#fb7185;--cx-reasoning-max-text:#fb7185}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"wave\"]{--cx-window:#d0ede9;--cx-sidebar:#cfece7;--cx-surface:#d0ede9;--cx-thread:#eef7f6;--cx-nested:#eef7f6;--cx-elevated:#eef7f6;--cx-summary:#bce4de;--cx-hover:rgba(12, 43, 38, 0.060);--cx-active:rgba(12, 43, 38, 0.060);--cx-border-l1:rgba(12, 43, 38, 0.055);--cx-border-l2:rgba(12,43,38,0.10);--cx-border-l3:rgba(12, 43, 38, 0.160);--cx-border-strong:rgba(12, 43, 38, 0.220);--cx-sidebar-divider:rgba(12, 43, 38, 0.055);--cx-sidebar-divider-hover:rgba(12, 43, 38, 0.220);--cx-frame-line:rgba(12,43,38,0.10);--cx-text:#0c2b26;--cx-text-2:#3d645d;--cx-text-3:#6d9189;--cx-text-4:rgba(12, 43, 38, 0.450);--cx-text-inverse:#001a15;--cx-nav-icon:#6d9189;--cx-sidebar-text:#3d645d;--cx-sidebar-muted:#6d9189;--cx-sidebar-selected:#bce4de;--cx-accent:#0d9488;--cx-accent-soft:#0d9488;--cx-focus:#0d9488;--cx-success:#15803d;--cx-danger:#dc2626;--cx-warning:#b45309;--cx-attention:#0d9488;--cx-picker-fill:#eef7f6;--cx-composer-fill:#eef7f6;--cx-popover-fill:#eef7f6;--cx-reasoning-track:rgba(12, 43, 38, 0.220);--cx-reasoning-title:#0d9488;--cx-reasoning-max-text:#0d9488}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"wave\"][data-ds-dark-theme]{--cx-window:#081412;--cx-sidebar:#091613;--cx-surface:#081412;--cx-thread:#0d1d1a;--cx-nested:#0d1d1a;--cx-elevated:#0d1d1a;--cx-summary:#142822;--cx-hover:rgba(221, 243, 239, 0.100);--cx-active:rgba(221, 243, 239, 0.100);--cx-border-l1:rgba(221, 243, 239, 0.055);--cx-border-l2:rgba(221,243,239,0.10);--cx-border-l3:rgba(221, 243, 239, 0.160);--cx-border-strong:rgba(221, 243, 239, 0.220);--cx-sidebar-divider:rgba(221, 243, 239, 0.055);--cx-sidebar-divider-hover:rgba(221, 243, 239, 0.220);--cx-frame-line:rgba(221,243,239,0.10);--cx-text:#ddf3ef;--cx-text-2:#8dbfb5;--cx-text-3:#5d8a81;--cx-text-4:rgba(221, 243, 239, 0.450);--cx-text-inverse:#001a15;--cx-nav-icon:#5d8a81;--cx-sidebar-text:#8dbfb5;--cx-sidebar-muted:#5d8a81;--cx-sidebar-selected:#142822;--cx-accent:#2dd4bf;--cx-accent-soft:#2dd4bf;--cx-focus:#2dd4bf;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#2dd4bf;--cx-picker-fill:#0d1d1a;--cx-composer-fill:#0d1d1a;--cx-popover-fill:#0d1d1a;--cx-reasoning-track:rgba(221, 243, 239, 0.220);--cx-reasoning-title:#2dd4bf;--cx-reasoning-max-text:#2dd4bf}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"mono\"]{--cx-window:#ffffff;--cx-sidebar:#f7f7f7;--cx-surface:#ffffff;--cx-thread:#ffffff;--cx-nested:#ffffff;--cx-elevated:#ffffff;--cx-summary:#f2f2f2;--cx-hover:rgba(0, 0, 0, 0.060);--cx-active:rgba(0, 0, 0, 0.060);--cx-border-l1:rgba(0, 0, 0, 0.066);--cx-border-l2:rgba(0,0,0,0.12);--cx-border-l3:rgba(0, 0, 0, 0.192);--cx-border-strong:rgba(0, 0, 0, 0.264);--cx-sidebar-divider:rgba(0, 0, 0, 0.066);--cx-sidebar-divider-hover:rgba(0, 0, 0, 0.264);--cx-frame-line:rgba(0,0,0,0.12);--cx-text:#000000;--cx-text-2:#555555;--cx-text-3:#8c8c8c;--cx-text-4:rgba(0, 0, 0, 0.450);--cx-text-inverse:#ffffff;--cx-nav-icon:#8c8c8c;--cx-sidebar-text:#555555;--cx-sidebar-muted:#8c8c8c;--cx-sidebar-selected:#f2f2f2;--cx-accent:#000000;--cx-accent-soft:#000000;--cx-focus:#000000;--cx-success:#166534;--cx-danger:#b91c1c;--cx-warning:#a16207;--cx-attention:#000000;--cx-picker-fill:#ffffff;--cx-composer-fill:#ffffff;--cx-popover-fill:#ffffff;--cx-reasoning-track:rgba(0, 0, 0, 0.264);--cx-reasoning-title:#000000;--cx-reasoning-max-text:#000000}\nhtml body[data-dsh-codex-style][data-dsh-theme=\"mono\"][data-ds-dark-theme]{--cx-window:#000000;--cx-sidebar:#050505;--cx-surface:#000000;--cx-thread:#0c0c0c;--cx-nested:#0c0c0c;--cx-elevated:#0c0c0c;--cx-summary:#161616;--cx-hover:rgba(255, 255, 255, 0.100);--cx-active:rgba(255, 255, 255, 0.100);--cx-border-l1:rgba(255, 255, 255, 0.077);--cx-border-l2:rgba(255,255,255,0.14);--cx-border-l3:rgba(255, 255, 255, 0.224);--cx-border-strong:rgba(255, 255, 255, 0.308);--cx-sidebar-divider:rgba(255, 255, 255, 0.077);--cx-sidebar-divider-hover:rgba(255, 255, 255, 0.308);--cx-frame-line:rgba(255,255,255,0.14);--cx-text:#ffffff;--cx-text-2:#a1a1a1;--cx-text-3:#6b6b6b;--cx-text-4:rgba(255, 255, 255, 0.450);--cx-text-inverse:#000000;--cx-nav-icon:#6b6b6b;--cx-sidebar-text:#a1a1a1;--cx-sidebar-muted:#6b6b6b;--cx-sidebar-selected:#161616;--cx-accent:#ffffff;--cx-accent-soft:#ffffff;--cx-focus:#ffffff;--cx-success:#4ade80;--cx-danger:#f87171;--cx-warning:#fbbf24;--cx-attention:#ffffff;--cx-picker-fill:#0c0c0c;--cx-composer-fill:#0c0c0c;--cx-popover-fill:#0c0c0c;--cx-reasoning-track:rgba(255, 255, 255, 0.308);--cx-reasoning-title:#ffffff;--cx-reasoning-max-text:#ffffff}";
    const CODEX_THEME_HOST_TOKEN_NAMES = ["--dsw-alias-bg-base","--dsw-specific-sidebar-fill","--dsw-alias-bg-layer-1","--dsw-alias-bg-layer-2","--dsw-alias-bg-layer-3","--dsw-alias-interactive-bg-hover","--dsw-alias-border-l1","--dsw-alias-border-l2","--dsw-alias-border-l3","--dsw-alias-border-l4","--dsw-alias-label-primary","--dsw-alias-label-secondary","--dsw-alias-label-tertiary","--dsw-alias-label-dimmed","--dsw-alias-label-primary-inverted","--dsw-alias-interactive-bg-hover-solid","--dsw-alias-brand-primary","--dsw-alias-link","--dsw-alias-state-success-primary","--dsw-alias-state-error-primary","--dsw-alias-state-warn-primary","--dsw-alias-state-business-primary","--dsw-specific-input-major","--dsw-specific-menu"];
    const module = { exports: {} };
    const exports = module.exports;
// 主题包：把 dsh-theme（Apache-2.0，见 THIRD_PARTY_NOTICES.md）的 30 套配色内置进本插件，
// 用户不必再单独安装第三个插件。挑选主题后同时改宿主令牌（body[data-dsh-theme]）与 Codex 令牌
// （构建期由 scripts/theme-map.mjs 生成的映射表），因此原生区块与 Codex 外壳一起变色。

const CODEX_THEME_STORAGE = 'dsh-codex-style:theme';
const CODEX_THEME_IDS = new Set((typeof CODEX_THEME_PACK === 'undefined' ? [] : CODEX_THEME_PACK).map(theme => theme.id));
// 主题只负责配色：宿主令牌里与 Codex 自带调色板重叠的部分交给主题，其余（圆角、阴影等）保留。
const CODEX_THEME_HOST_TOKENS = new Set(typeof CODEX_THEME_HOST_TOKEN_NAMES === 'undefined' ? [] : CODEX_THEME_HOST_TOKEN_NAMES);

function isThemePackId(id) {
  return typeof id === 'string' && CODEX_THEME_IDS.has(id);
}

function isThemePackActive() {
  return typeof document !== 'undefined' && isThemePackId(document.body.getAttribute('data-dsh-theme'));
}

function currentColorScheme() {
  return typeof document !== 'undefined' && document.body?.hasAttribute('data-ds-dark-theme') ? 'dark' : 'light';
}

function themePackZh() {
  const lang = typeof document !== 'undefined' ? document.documentElement?.lang : '';
  return String(lang || 'en').toLowerCase().startsWith('zh');
}

function createThemePack() {
  const themes = CODEX_THEME_PACK;
  const listeners = new Set();
  let activeId = null;
  let themeStyle = null;
  let mapStyle = null;

  const notify = () => { for (const listener of [...listeners]) { try { listener(activeId); } catch {} } };
  const ensureStyles = () => {
    if (!document.head) return;
    if (!mapStyle) {
      mapStyle = document.createElement('style');
      mapStyle.dataset.dshCodexThemeMap = '';
      mapStyle.textContent = CODEX_THEME_MAP_CSS;
      document.head.appendChild(mapStyle);
    }
    if (!themeStyle) {
      themeStyle = document.createElement('style');
      themeStyle.dataset.dshCodexTheme = '';
      document.head.appendChild(themeStyle);
    }
  };
  const write = id => {
    const theme = themes.find(row => row.id === id);
    if (!theme) return false;
    ensureStyles();
    if (!themeStyle) return false;
    themeStyle.textContent = theme.css;
    document.body.setAttribute('data-dsh-theme', theme.id);
    activeId = theme.id;
    try { localStorage.setItem(CODEX_THEME_STORAGE, theme.id); } catch {}
    notify();
    return true;
  };
  const clear = ({ forget = true } = {}) => {
    if (themeStyle) themeStyle.textContent = '';
    if (activeId !== null && document.body.getAttribute('data-dsh-theme') === activeId) document.body.removeAttribute('data-dsh-theme');
    activeId = null;
    if (forget) try { localStorage.removeItem(CODEX_THEME_STORAGE); } catch {}
    notify();
  };
  const saved = () => {
    try { return localStorage.getItem(CODEX_THEME_STORAGE); } catch { return null; }
  };
  return {
    themes,
    getActive: () => activeId,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    select(id) { return id === null || id === undefined ? clear() : write(id); },
    /** 插件启动：先装映射表，再恢复用户上次选的主题；没选过就什么都不改。 */
    mount() {
      ensureStyles();
      const id = saved();
      if (isThemePackId(id)) write(id);
    },
    /** 插件卸载：撤掉自己写过的属性和样式，已保存的选择保留，重新启用后继续生效。 */
    unmount() {
      if (activeId !== null && document.body.getAttribute('data-dsh-theme') === activeId) document.body.removeAttribute('data-dsh-theme');
      activeId = null;
      themeStyle?.remove(); themeStyle = null;
      mapStyle?.remove(); mapStyle = null;
    }
  };
}

let currentThemePack = null;

function installThemePack(ctx) {
  currentThemePack = createThemePack();
  const pack = currentThemePack;
  ctx.effect(() => {
    pack.mount();
    return () => { pack.unmount(); if (currentThemePack === pack) currentThemePack = null; };
  }, 'codex-style: theme pack');
  return pack;
}

function getThemePack() { return currentThemePack; }

// 外观设置页：把主题选择从齿轮菜单搬进「设置 → 外观」，并提供 Codex 式的强调色 / 背景 / 前景 / 字体。
// 三种来源共用一套状态：内置预设、dsh-theme 主题包（30 套）、用户自定义颜色。
// 预设只给三元组（背景 / 前景 / 强调色），其余界面令牌在运行时按明暗推导，避免逐主题写死。

const APPEARANCE_STORAGE = 'dsh-codex-style:appearance';

// Codex 外观预设：深浅两套三元组，取自各主题公开的配色参数。
const APPEARANCE_PRESETS = [
  { id: 'default', name: 'DeepSeek 默认', desc: '不套用任何配色覆盖', light: null, dark: null },
  { id: 'rose-pine', name: 'Rose Pine', desc: '柔和玫瑰与奶油底', light: { bg: '#FAF4ED', fg: '#575279', accent: '#D7827E' }, dark: { bg: '#191724', fg: '#E0DEF4', accent: '#EBBCBA' } },
  { id: 'rose-pine-moon', name: 'Rose Pine Moon', desc: '夜色下的玫瑰', light: { bg: '#FAF4ED', fg: '#575279', accent: '#EA9A97' }, dark: { bg: '#232136', fg: '#E0DEF4', accent: '#EA9A97' } },
  { id: 'nord', name: 'Nord', desc: '北欧冷调', light: { bg: '#ECEFF4', fg: '#2E3440', accent: '#5E81AC' }, dark: { bg: '#2E3440', fg: '#ECEFF4', accent: '#88C0D0' } },
  { id: 'solarized', name: 'Solarized', desc: '经典太阳化', light: { bg: '#FDF6E3', fg: '#657B83', accent: '#B58900' }, dark: { bg: '#002B36', fg: '#839496', accent: '#268BD2' } },
  { id: 'tokyo-night', name: 'Tokyo Night', desc: '霓虹夜城', light: { bg: '#F6F6F8', fg: '#343B58', accent: '#3E63DD' }, dark: { bg: '#1A1B26', fg: '#C0CAF5', accent: '#7AA2F7' } },
  { id: 'gruvbox', name: 'Gruvbox', desc: '暖色复古', light: { bg: '#FBF1C7', fg: '#3C3836', accent: '#B57614' }, dark: { bg: '#282828', fg: '#EBDBB2', accent: '#FABD2F' } },
  { id: 'catppuccin', name: 'Catppuccin', desc: '奶油拿铁', light: { bg: '#EFF1F5', fg: '#4C4F69', accent: '#8839EF' }, dark: { bg: '#1E1E2E', fg: '#CDD6F4', accent: '#CBA6F7' } },
  { id: 'dracula', name: 'Dracula', desc: '高对比紫', light: { bg: '#F8F8F2', fg: '#282A36', accent: '#7C3AED' }, dark: { bg: '#282A36', fg: '#F8F8F2', accent: '#BD93F9' } },
  { id: 'one-dark', name: 'One Dark', desc: 'Atom 经典', light: { bg: '#FAFAFA', fg: '#383A42', accent: '#4078F2' }, dark: { bg: '#282C34', fg: '#ABB2BF', accent: '#61AFEF' } },
  { id: 'github', name: 'GitHub', desc: '代码站配色', light: { bg: '#FFFFFF', fg: '#24292F', accent: '#0969DA' }, dark: { bg: '#0D1117', fg: '#E6EDF3', accent: '#2F81F7' } }
];

const APPEARANCE_FONTS = [
  { id: 'system', name: '系统默认', stack: '' },
  { id: 'inter', name: 'Inter', stack: 'Inter, "Segoe UI", system-ui, sans-serif' },
  { id: 'serif', name: 'Serif', stack: 'Georgia, "Songti SC", "SimSun", serif' },
  { id: 'mono', name: '等宽', stack: 'ui-monospace, "SF Mono", Consolas, monospace' }
];

function parseHex(value) {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(value ?? '').trim());
  if (!match) return null;
  const body = match[1].length === 3 ? match[1].split('').map(ch => ch + ch).join('') : match[1];
  return { r: parseInt(body.slice(0, 2), 16), g: parseInt(body.slice(2, 4), 16), b: parseInt(body.slice(4, 6), 16) };
}

function toHex(channel) {
  return Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0');
}

function rgbHex(rgb) { return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b); }

/** 两色按比例混合；任一侧不是合法 hex 时返回前者。 */
function mix(base, target, ratio) {
  const a = parseHex(base);
  const b = parseHex(target);
  if (!a || !b) return base;
  return rgbHex({ r: a.r + (b.r - a.r) * ratio, g: a.g + (b.g - a.g) * ratio, b: a.b + (b.b - a.b) * ratio });
}

/** hex + 透明度；用于文字层级与边框。 */
function alpha(color, value) {
  const rgb = parseHex(color);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${value})` : color;
}

/** 主题三元组 → Codex 与宿主两套令牌；所有界面色都由这三色推导。 */
function deriveTokens(triple) {
  const bg = triple.bg;
  const fg = triple.fg;
  const accent = triple.accent;
  const surface = mix(bg, fg, 0.03);
  const nested = mix(bg, fg, 0.06);
  const elevated = mix(bg, fg, 0.09);
  const summary = mix(bg, fg, 0.12);
  const sidebar = mix(bg, fg, 0.02);
  const cx = {
    '--cx-window': bg,
    '--cx-sidebar': sidebar,
    '--cx-surface': bg,
    '--cx-thread': surface,
    '--cx-nested': nested,
    '--cx-elevated': elevated,
    '--cx-summary': summary,
    '--cx-hover': alpha(fg, 0.05),
    '--cx-active': alpha(fg, 0.09),
    '--cx-border-l1': alpha(fg, 0.1),
    '--cx-border-l2': alpha(fg, 0.06),
    '--cx-border-l3': alpha(fg, 0.16),
    '--cx-border-strong': alpha(fg, 0.2),
    '--cx-sidebar-divider': alpha(fg, 0.1),
    '--cx-sidebar-divider-hover': alpha(fg, 0.24),
    '--cx-frame-line': alpha(fg, 0.1),
    '--cx-text': fg,
    '--cx-text-2': alpha(fg, 0.72),
    '--cx-text-3': alpha(fg, 0.52),
    '--cx-text-4': alpha(fg, 0.34),
    '--cx-text-inverse': bg,
    '--cx-nav-icon': alpha(fg, 0.5),
    '--cx-sidebar-text': alpha(fg, 0.86),
    '--cx-sidebar-muted': alpha(fg, 0.5),
    '--cx-sidebar-selected': alpha(fg, 0.08),
    '--cx-accent': accent,
    '--cx-accent-soft': accent,
    '--cx-link': accent,
    '--cx-focus': accent,
    '--cx-attention': accent,
    '--cx-picker-fill': nested,
    '--cx-composer-fill': surface,
    '--cx-popover-fill': elevated
  };
  const dsw = {
    '--dsw-alias-bg-base': bg,
    '--dsw-alias-bg-layer-1': surface,
    '--dsw-alias-bg-layer-2': nested,
    '--dsw-alias-bg-layer-3': elevated,
    '--dsw-alias-bg-overlay': elevated,
    '--dsw-alias-bg-module-platform': mix(bg, fg, 0.04),
    '--dsw-alias-label-primary': fg,
    '--dsw-alias-label-secondary': alpha(fg, 0.72),
    '--dsw-alias-label-tertiary': alpha(fg, 0.52),
    '--dsw-alias-label-caption': alpha(fg, 0.52),
    '--dsw-alias-label-dimmed': alpha(fg, 0.34),
    '--dsw-alias-label-primary-inverted': bg,
    '--dsw-alias-border-l1': alpha(fg, 0.1),
    '--dsw-alias-border-l2': alpha(fg, 0.1),
    '--dsw-alias-border-l3': alpha(fg, 0.16),
    '--dsw-alias-border-l4': alpha(fg, 0.22),
    '--dsw-alias-interactive-bg-hover': alpha(fg, 0.05),
    '--dsw-alias-interactive-bg-hover-solid': mix(bg, fg, 0.1),
    '--dsw-alias-brand-primary': accent,
    '--dsw-alias-link': accent,
    '--dsw-specific-sidebar-fill': sidebar,
    '--dsw-specific-sidebar-nav-item-active': alpha(fg, 0.1),
    '--dsw-specific-sidebar-nav-item-hover': alpha(fg, 0.05),
    '--dsw-specific-sidebar-nav-item-active-accent': alpha(fg, 0.14),
    '--dsw-specific-input-major': surface,
    '--dsw-specific-menu': elevated,
    '--dsw-menu-surface-fill': elevated,
    '--dsw-alias-markdown-code-block': nested,
    '--dsw-alias-markdown-inline-code': nested,
    '--dsw-alias-markdown-code-block-banner': elevated,
    '--dsw-alias-scrollbar-bg-l1': alpha(fg, 0.16),
    '--dsw-alias-scrollbar-bg-l2': alpha(fg, 0.2),
    '--dsw-alias-scrollbar-hover-l2': alpha(fg, 0.35)
  };
  return { cx, dsw };
}

function cssBlock(selector, tokens) {
  return `${selector}{${Object.entries(tokens).map(([key, value]) => `${key}:${value}`).join(';')}}`;
}

/** 当前生效的明暗：'system' 走系统偏好，其余按选择。 */
function resolveScheme(mode) {
  if (mode === 'light' || mode === 'dark') return mode;
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(APPEARANCE_STORAGE) || 'null');
    if (!raw || typeof raw !== 'object') return null;
    return raw;
  } catch { return null; }
}

function createAppearance(ctx) {
  const listeners = new Set();
  let style = null;
  let custom = null;
  const savedState = loadState();
  // 只有用户动过外观才接管宿主明暗；首次启用保持 DSH 自己的外观选择。
  let managed = savedState !== null;
  let state = Object.assign({ preset: 'default', mode: 'system', font: 'system' }, savedState || {});
  if (!Array.isArray(state.customLight)) custom = null; else custom = { light: state.customLight, dark: state.customDark };
  if (!managed && typeof document !== 'undefined' && typeof document.body?.getAttribute === 'function') {
    state.mode = document.body.getAttribute('data-ds-dark-theme') !== null ? 'dark' : 'light';
  }
  let media = null;

  const notify = () => { for (const listener of [...listeners]) { try { listener(); } catch {} } };
  const ensureStyle = () => {
    if (style || !document.head) return;
    style = document.createElement('style');
    style.dataset.dshCodexAppearance = '';
    document.head.appendChild(style);
  };
  const write = () => { try { localStorage.setItem(APPEARANCE_STORAGE, JSON.stringify({ ...state, customLight: custom?.light ?? null, customDark: custom?.dark ?? null })); } catch {} };

  const tripleFor = (presetId, scheme) => {
    if (custom) return custom[scheme];
    if (typeof presetId === 'string' && presetId.startsWith('pack:')) {
      const pack = getThemePack();
      const swatch = pack?.themes.find(row => row.id === presetId.slice(5))?.swatch?.[scheme];
      if (swatch) return { bg: swatch[0], fg: swatch[3], accent: swatch[2] };
    }
    const preset = APPEARANCE_PRESETS.find(row => row.id === presetId);
    return preset ? preset[scheme] : null;
  };

  const applyFont = () => {
    const font = APPEARANCE_FONTS.find(row => row.id === state.font) || APPEARANCE_FONTS[0];
    if (!document.body || !document.body.style || typeof document.body.style.setProperty !== 'function') return;
    if (font.stack) {
      document.body.style.setProperty('--cx-font-sans', font.stack);
      document.body.style.setProperty('--dsh-font-family-text', font.stack);
      document.body.style.setProperty('font-family', font.stack);
    } else {
      document.body.style.removeProperty('--cx-font-sans');
      document.body.style.removeProperty('--dsh-font-family-text');
      document.body.style.removeProperty('font-family');
    }
  };

  const apply = () => {
    if (typeof document === 'undefined' || !document.body) return;
    const body = document.body;
    const setDark = value => { if (typeof body.toggleAttribute === 'function') body.toggleAttribute('data-ds-dark-theme', value); };
    const setAppearance = value => { if (value === null) { if (typeof body.removeAttribute === 'function') body.removeAttribute('data-dsh-appearance'); } else if (typeof body.setAttribute === 'function') body.setAttribute('data-dsh-appearance', value); };
    const scheme = resolveScheme(state.mode);
    const packId = typeof state.preset === 'string' && state.preset.startsWith('pack:') ? state.preset.slice(5) : null;
    const pack = getThemePack();
    ensureStyle();
    applyFont();
    // 用户动过外观后才接管明暗：与 dsh-theme 一样写宿主实际读取的标记。
    if (managed) setDark(scheme === 'dark');
    if (packId && pack) {
      setAppearance(null);
      if (style) style.textContent = '';
      pack.select(packId);
      return;
    }
    // 内置预设或自定义：撤掉主题包，改写两套令牌。
    if (pack && pack.getActive() !== null) pack.select(null);
    const triple = tripleFor(state.preset, scheme);
    if (!triple || (state.preset === 'default' && !custom)) {
      setAppearance(null);
      if (style) style.textContent = '';
      return;
    }
    const tokens = deriveTokens(triple);
    if (style) {
      style.textContent = cssBlock('html body[data-dsh-codex-style][data-dsh-appearance]', tokens.cx)
        + '\n' + cssBlock('html body[data-dsh-appearance]', tokens.dsw);
    }
    setAppearance(state.preset);
  };

  const applyAndMaybeWrite = () => { apply(); write(); notify(); };

  const setMode = mode => { managed = true; state = { ...state, mode }; applyAndMaybeWrite(); };
  const setPreset = preset => { managed = true; custom = null; state = { ...state, preset }; applyAndMaybeWrite(); };
  const setColor = (key, value) => {
    managed = true;
    const scheme = resolveScheme(state.mode);
    if (!custom) {
      const base = tripleFor(state.preset, scheme) || (scheme === 'dark' ? { bg: '#191724', fg: '#E0DEF4', accent: '#EBBCBA' } : { bg: '#FAF4ED', fg: '#575279', accent: '#D7827E' });
      custom = { light: { ...base }, dark: { ...base } };
    }
    custom[scheme] = { ...custom[scheme], [key]: value };
    state = { ...state, preset: 'custom' };
    applyAndMaybeWrite();
  };
  const setFont = font => { managed = true; state = { ...state, font }; applyAndMaybeWrite(); };
  const reset = () => {
    custom = null;
    managed = false;
    state = { preset: 'default', mode: 'system', font: 'system' };
    try { localStorage.removeItem(APPEARANCE_STORAGE); } catch {}
    apply();
    // 复位后把明暗标记交还宿主当前偏好。
    try {
      const scheme = ctx?.theme?.getTheme?.()?.active?.colorScheme;
      if (scheme && typeof document.body.toggleAttribute === 'function') document.body.toggleAttribute('data-ds-dark-theme', scheme === 'dark');
    } catch {}
    notify();
  };

  const watchSystem = () => {
    if (typeof matchMedia !== 'function') return;
    media = matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (state.mode === 'system') apply(); };
    media.addEventListener?.('change', onChange);
  };

  return {
    presets: APPEARANCE_PRESETS,
    fonts: APPEARANCE_FONTS,
    getState: () => ({ ...state }),
    getCustom: () => custom ? { light: { ...custom.light }, dark: { ...custom.dark } } : null,
    getTriple: () => tripleFor(state.preset, resolveScheme(state.mode)),
    setMode, setPreset, setColor, setFont, reset,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    mount() { watchSystem(); apply(); },
    unmount() {
      media?.removeEventListener?.('change', () => {});
      if (style) { style.remove(); style = null; }
      document.body?.removeAttribute?.('data-dsh-appearance');
      document.body?.style?.removeProperty?.('--cx-font-sans');
      document.body?.style?.removeProperty?.('--dsh-font-family-text');
      document.body?.style?.removeProperty?.('font-family');
      // 交还明暗控制权：按宿主主题快照恢复标记。
      try {
        const scheme = ctx?.theme?.getTheme?.()?.active?.colorScheme;
        if (scheme && typeof document.body?.toggleAttribute === 'function') document.body.toggleAttribute('data-ds-dark-theme', scheme === 'dark');
      } catch {}
    }
  };
}

let currentAppearance = null;

function installAppearance(ctx) {
  currentAppearance = createAppearance(ctx);
  const appearance = currentAppearance;
  ctx.effect(() => {
    appearance.mount();
    return () => { appearance.unmount(); if (currentAppearance === appearance) currentAppearance = null; };
  }, 'codex-style: appearance');
  ctx.slots.inject('settings.section', () => ctx.slots.register(
    { name: 'settings.section', id: 'codex-appearance', order: 12, label: '外观' },
    AppearancePage));
  ctx.slots.inject('settings.section.icon', () => ctx.slots.register(
    { name: 'settings.section.icon', id: 'codex-appearance' },
    () => h(Icon, { name: 'settings', size: 16 })));
  return appearance;
}

function getAppearance() { return currentAppearance; }

/** 齿轮菜单里显示当前外观名：主题包 → 包名，内置预设 → 预设名，改过颜色 → 自定义。 */
function currentAppearanceLabel() {
  const appearance = currentAppearance;
  if (!appearance) return 'DeepSeek 默认';
  const state = appearance.getState();
  if (appearance.getCustom()) return '自定义';
  if (typeof state.preset === 'string' && state.preset.startsWith('pack:')) {
    const pack = getThemePack();
    const theme = pack?.themes.find(row => row.id === state.preset.slice(5));
    return theme ? theme.nameZh : '主题包';
  }
  const preset = appearance.presets.find(row => row.id === state.preset);
  return preset ? preset.name : 'DeepSeek 默认';
}

function isAppearanceActive() {
  if (typeof document === 'undefined' || !document.body) return false;
  const body = document.body;
  return typeof body.hasAttribute === 'function'
    ? body.hasAttribute('data-dsh-appearance')
    : body.getAttribute('data-dsh-appearance') !== null;
}

// ------------------------------ 设置页 UI ------------------------------

function useAppearanceState() {
  const appearance = getAppearance();
  const [, bump] = useState(0);
  useEffect(() => {
    if (!appearance) return;
    return appearance.subscribe(() => bump(value => value + 1));
  }, [appearance]);
  return appearance;
}

function AppearancePage() {
  const appearance = useAppearanceState();
  if (!appearance) return null;
  const state = appearance.getState();
  const custom = appearance.getCustom();
  const scheme = resolveScheme(state.mode);
  const triple = custom ? custom[scheme] : (appearance.presets.find(row => row.id === state.preset)?.[scheme] ?? appearance.getTriple() ?? { bg: '#111111', fg: '#fcfcfc', accent: '#0285ff' });
  const pack = getThemePack();
  const packThemes = pack ? pack.themes : [];
  const active = state.preset;
  const colorRow = (label, key) => h('div', { className: 'dsc-appearance-row' },
    h('span', { className: 'dsc-appearance-row-label' }, label),
    h('span', { className: 'dsc-appearance-color' },
      h('input', { type: 'color', className: 'dsc-appearance-swatch', value: triple[key], 'aria-label': label, onChange: event => appearance.setColor(key, event.target.value) }),
      h('input', { type: 'text', className: 'dsc-appearance-hex', value: triple[key], spellCheck: false, onChange: event => { if (parseHex(event.target.value)) appearance.setColor(key, rgbHex(parseHex(event.target.value))); } })));
  return h('div', { className: 'dsc-ui dsc-appearance' },
    h('h2', { className: 'dsc-appearance-title' }, '外观'),
    h('p', { className: 'dsc-appearance-note' }, '配色与字体由本插件接管；「DeepSeek 默认」只清空覆盖，不会卸载插件。'),
    h('div', { className: 'dsc-appearance-group' },
      h('div', { className: 'dsc-appearance-group-title' }, '模式'),
      h('div', { className: 'dsc-appearance-modes', role: 'radiogroup', 'aria-label': '模式' },
        [['light', '浅色'], ['dark', '深色'], ['system', '跟随系统']].map(([id, label]) => h('button', {
          key: id, type: 'button', role: 'radio', 'aria-checked': state.mode === id,
          className: 'dsc-appearance-mode' + (state.mode === id ? ' is-active' : ''),
          onClick: () => appearance.setMode(id)
        },
        h('span', { className: 'dsc-appearance-mode-preview', 'data-mode': id === 'system' ? scheme : id }, h('i', null), h('i', null), h('i', null)),
        h('span', { className: 'dsc-appearance-mode-label' }, label))))),
    h('div', { className: 'dsc-appearance-group' },
      h('div', { className: 'dsc-appearance-group-title' }, '主题'),
      h('div', { className: 'dsc-appearance-themes' },
        appearance.presets.map(preset => {
          const colors = preset[scheme] || (preset.id === 'default' ? { bg: scheme === 'dark' ? '#0f0f0f' : '#ffffff', fg: scheme === 'dark' ? '#fcfcfc' : '#0d0d0d', accent: scheme === 'dark' ? '#0285ff' : '#2b68cb' } : null);
          return h('button', {
            key: preset.id, type: 'button', 'aria-pressed': active === preset.id,
            className: 'dsc-appearance-theme' + (active === preset.id ? ' is-active' : ''),
            title: preset.desc, onClick: () => appearance.setPreset(preset.id)
          },
          h('span', { className: 'dsc-appearance-theme-swatch', style: { background: colors?.bg, borderColor: colors ? alpha(colors.fg, 0.2) : undefined } },
            h('i', { style: { background: colors?.fg } }), h('i', { style: { background: colors?.accent } })),
          h('span', { className: 'dsc-appearance-theme-name' }, preset.name));
        }),
        packThemes.length ? h('div', { className: 'dsc-appearance-subtitle' }, '主题包（dsh-theme）') : null,
        packThemes.map(theme => h('button', {
          key: 'pack:' + theme.id, type: 'button', 'aria-pressed': active === 'pack:' + theme.id,
          className: 'dsc-appearance-theme' + (active === 'pack:' + theme.id ? ' is-active' : ''),
          title: theme.nameZh,
          onClick: () => appearance.setPreset('pack:' + theme.id)
        },
        h('span', { className: 'dsc-appearance-theme-swatch', style: { background: (theme.swatch || {})[scheme]?.[0] } },
          h('i', { style: { background: (theme.swatch || {})[scheme]?.[3] } }), h('i', { style: { background: (theme.swatch || {})[scheme]?.[2] } })),
        h('span', { className: 'dsc-appearance-theme-name' }, theme.nameZh))))),
    h('div', { className: 'dsc-appearance-card' },
      colorRow('强调色', 'accent'),
      colorRow('背景', 'bg'),
      colorRow('前景', 'fg'),
      h('div', { className: 'dsc-appearance-row' },
        h('span', { className: 'dsc-appearance-row-label' }, '字体'),
        h('select', { className: 'dsc-appearance-select', value: state.font, 'aria-label': '字体', onChange: event => appearance.setFont(event.target.value) },
          appearance.fonts.map(font => h('option', { key: font.id, value: font.id }, font.name))))));
}

// 保留官方 sidebar/settings/composer 的所有者；导航在 shell.overlay 独立挂载。
// 二级侧栏复用同一内容与真实动作；收起态只改变呈现方式，不导航或展开宿主列。
const DEFAULT_SIDEBAR_WIDTH = 288;
// 「更多」是插件自有 main 面板；与技能页同模式，点击即切换布局页面，
// 历史、右侧内容与轨道高亮全部由 activePanelId 推导，不再使用侧栏局部状态。
const MORE_PANEL_ID = 'codex-style-more';

// 0.2.1-rc.2/rc.3 的 root store handle.create() 返回 AppFrame 已持有的同一布局实例。
// 仅将启动/重新展开时的默认值 280 改为 288；真实 grid、分隔条和宽度变量仍由宿主计算。
function initializeSidebarWidth(ctx) {
  const entry = ctx.slots.entriesOfSlot('root')[0];
  const store = entry?.store?.create();
  if (!store?.actions?.setSidebar || !store.getSnapshot().layoutInfo) {
    console.warn('codex-style: 当前 root 未提供已核实的侧栏宽度动作');
    return;
  }
  let previous = store.getSnapshot().layoutInfo.sidebar;
  let owned = false;
  const sync = initial => {
    const width = store.getSnapshot().layoutInfo.sidebar;
    const reopening = previous === 0 && width === 280;
    if (width !== previous) owned = false;
    previous = width;
    if (width !== 280 || (!initial && !reopening)) return;
    // 先更新本地记录，避免 setSidebar 的同步通知被误认为用户拖动。
    previous = DEFAULT_SIDEBAR_WIDTH;
    owned = true;
    store.actions.setSidebar(DEFAULT_SIDEBAR_WIDTH);
  };
  const unsubscribe = store.subscribe(() => sync(false));
  sync(true);
  return () => {
    // 卸载时只恢复本次仍在生效的默认值；保留用户后续拖动值和 0px 收起态。
    unsubscribe();
    if (owned && store.getSnapshot().layoutInfo.sidebar === DEFAULT_SIDEBAR_WIDTH) store.actions.setSidebar(280);
  };
}

function PrototypeIcon({ name, className = '' }) {
  return h('span', { className: 'dsc-proto-icon ' + className, 'aria-hidden': true, dangerouslySetInnerHTML: { __html: PROTOTYPE_ICONS[name] } });
}
function useSlotVersion(ctx, names) {
  const axis = names.join('|');
  const subscribe = useCallback(listener => {
    const disposers = names.map(name => ctx.slots.subscribe(name, listener));
    return () => disposers.forEach(dispose => dispose());
  }, [ctx, axis]);
  const snapshot = useCallback(() => names.map(name => ctx.slots.getVersion(name)).join(':'), [ctx, axis]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
function usePanelDirectory(ctx) {
  const version = useSlotVersion(ctx, ['main', 'sidebar.panellist']);
  const locale = useSource(ctx.locale);
  return useMemo(() => {
    const mains = new Set(ctx.slots.entriesOfSlot('main').map(entry => entry.options.key));
    return ctx.slots.entriesOfSlot('sidebar.panellist').map(({ options }) => ({
      id: options.id, order: options.order ?? 0,
      label: (typeof options.label === 'function' ? options.label() : options.label) ?? options.id,
      available: mains.has(options.id)
    })).sort((a, b) => a.order - b.order);
  }, [ctx, version, locale]);
}
// 导航分类只由当前 main 面板决定；「更多」注册为真实面板后与其他页面同源。
function navigationCategoryOf(panel) {
  const activePanelId = panel === null || panel === undefined || panel.activePanelId === undefined ? null : panel.activePanelId;
  if (activePanelId === MORE_PANEL_ID) return 'more';
  if (activePanelId === null) return 'home';
  if (activePanelId === 'plugins') return 'plugins';
  if (activePanelId === SKILLS_PANEL_ID) return 'skills';
  if (activePanelId === 'schedules') return 'tasks';
  return 'extension';
}
// 侧栏二级区域：第三方页沿用最近的常规区域；「更多」只在它自己的页面显示，
// 从「更多」后退到第三方页时不残留「更多」菜单。
function sidebarSectionOf(category, last, hasMore) {
  if (category !== 'extension' && category !== 'more') last.current = category;
  return category === 'more' && hasMore ? 'more' : last.current;
}
function useNavigationDirectory(ctx, sidebar) {
  const panel = useSource(ctx.layout.panelInfo);
  const panels = usePanelDirectory(ctx);
  const moreVersion = useSlotVersion(ctx, ['sidebar.panellist.actions']);
  const hasMore = useMemo(() => ctx.slots.entriesOfSlot('sidebar.panellist.actions').some(entry => entry.options.id === 'entry-customization'), [ctx, moreVersion]);
  // 官方分组只按已核实的 main id 识别；社区入口的名称不能决定它属于自定义。
  const pluginRows = panels.filter(row => row.available && row.id === 'plugins').concat([{ id: SKILLS_PANEL_ID, order: 90, label: '技能', available: true }]);
  const taskRows = panels.filter(row => row.available && row.id === 'schedules');
  const category = navigationCategoryOf(panel);
  return { panel, panels, pluginRows, taskRows, category, hasMore };
}

// 原 sidebar entry 拥有 panellist 的 renderSlot 授权。保留原按钮、图标及注入，
// 仅以公开 slot 锚点定位原 nav，给第三方行添加可释放标记并用 CSS 呈现在轨道中。
// 不复制 component、不借用私有 renderer、不搬移 React 所拥有的 DOM。
function useNativeExtensionNavigation(sidebar, target, panels) {
  useLayoutEffect(() => {
    const host = document.querySelector('[data-slot="sidebar"]');
    if (!host || !target.current) return;
    const attributes = new Map();
    const properties = new Map();
    let nav;
    let frame;
    const mark = (node, name, value) => {
      let saved = attributes.get(node);
      if (!saved) attributes.set(node, saved = new Map());
      if (!saved.has(name)) saved.set(name, node.getAttribute(name));
      if (value === null) node.removeAttribute(name);
      else if (node.getAttribute(name) !== value) node.setAttribute(name, value);
    };
    const property = (node, name, value) => {
      let saved = properties.get(node);
      if (!saved) properties.set(node, saved = new Map());
      if (!saved.has(name)) saved.set(name, [node.style.getPropertyValue(name), node.style.getPropertyPriority(name)]);
      node.style.setProperty(name, value);
    };
    const hidePreview = () => sidebar.hide();
    const followNative = () => sidebar.hide();
    const detach = () => {
      nav?.removeEventListener('pointerenter', hidePreview);
      nav?.removeEventListener('focusin', hidePreview);
      nav?.removeEventListener('click', followNative, true);
    };
    const sync = () => {
      frame = undefined;
      const glyphs = [...host.querySelectorAll('[data-slot="sidebar.panellist"]')];
      const buttons = glyphs.map(glyph => glyph.closest('button'));
      // rc.3 可在「更多」中取消固定，真实行因而只是目录的子集；保留原生固定状态。
      const rows = buttons.map((button, i) => {
        if (!button) return null;
        const label = button.getAttribute('aria-label');
        if (buttons.length === panels.length && panels[i]?.label === label) return panels[i];
        const retained = panels.find(row => row.id === button.getAttribute('data-dsc-extension-row') && row.label === label);
        if (retained) return retained;
        const matches = panels.filter(row => row.label === label);
        return matches.length === 1 ? matches[0] : null;
      });
      // 同名或提交时序不同的行保留原生入口，不让单行识别失败隐藏整个导航。
      if (!buttons.length || buttons.some(button => !button)) return;
      const nextNav = buttons[0].closest('nav');
      if (!nextNav || buttons.some(button => button.closest('nav') !== nextNav)) return;
      if (nextNav !== nav) {
        detach();
        nav = nextNav;
        nav.addEventListener('pointerenter', hidePreview);
        nav.addEventListener('focusin', hidePreview);
        nav.addEventListener('click', followNative, true);
      }
      mark(nav, 'data-dsc-extension-nav', '');
      buttons.forEach((button, i) => {
        const row = rows[i];
        const extension = !row || (row.available && row.id !== 'plugins' && row.id !== 'schedules');
        mark(button, 'data-dsc-extension-row', row?.id ?? '');
        mark(button, 'data-dsc-extension-hidden', extension ? null : '');
        if (!extension) return;
        mark(button, 'title', row?.label ?? button.getAttribute('aria-label'));
        const glyph = glyphs[i].parentElement;
        mark(glyph, 'data-dsc-extension-glyph', '');
        [...button.children].filter(child => child !== glyph).forEach(child => mark(child, 'data-dsc-extension-label', ''));
      });
      // rc.3「更多」由自有导航与二级侧栏呈现；隐藏旧入口，原宿主注册与生命周期继续保留。
      for (const button of nav.querySelectorAll('button[aria-haspopup="menu"]')) {
        if (button.querySelector('[data-slot="sidebar.panellist"]')) continue;
        mark(button, 'data-dsc-extension-hidden', '');
      }
      const box = target.current.getBoundingClientRect();
      property(nav, '--dsc-extension-left', box.left + 'px');
      property(nav, '--dsc-extension-top', box.top + 'px');
      property(nav, '--dsc-extension-width', box.width + 'px');
      property(nav, '--dsc-extension-height', Math.max(0, box.height) + 'px');
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(sync); };
    const content = new MutationObserver(schedule);
    content.observe(host, { childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label'], subtree: true });
    const size = new ResizeObserver(schedule);
    size.observe(target.current);
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      content.disconnect(); size.disconnect();
      window.removeEventListener('resize', schedule);
      detach();
      for (const [node, saved] of attributes) for (const [name, value] of saved) {
        if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
      }
      for (const [node, saved] of properties) for (const [name, [value, priority]] of saved) {
        if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
      }
    };
  }, [sidebar, target, panels]);
}

// 导航与二级侧栏共享呈现状态；悬停计时不调用 layout，也不发起模型请求。
function createSidebarPresentation() {
  const store = createSnapshotStore({ collapsed: true, preview: null });
  let opening;
  let closing;
  const cancel = () => { clearTimeout(opening); clearTimeout(closing); };
  const hide = () => { cancel(); if (store.getSnapshot().preview !== null) store.set({ ...store.getSnapshot(), preview: null }); };
  const show = category => {
    cancel();
    if (store.getSnapshot().collapsed) store.set({ ...store.getSnapshot(), preview: category });
  };
  return {
    store, hide, show, hold: cancel, dispose: cancel,
    setCollapsed(collapsed) {
      if (store.getSnapshot().collapsed === collapsed) return;
      cancel();
      store.set({ ...store.getSnapshot(), collapsed, preview: null });
    },
    enter(category) {
      cancel();
      if (!store.getSnapshot().collapsed || store.getSnapshot().preview === category) return;
      opening = setTimeout(() => show(category), category === 'home' ? 300 : 100);
    },
    leave() {
      cancel();
      closing = setTimeout(hide, 140);
    }
  };
}

// 点击「更多」= 选中插件自有 main 面板；失败只回显错误，不改变当前页面。
function openMorePanel(ctx, sidebar, setError) {
  setError('');
  sidebar.hide();
  try { ctx.layout.selectPanel(MORE_PANEL_ID); } catch (e) { setError(errorText(e)); return false; }
  if (sidebar.store.getSnapshot().collapsed) ctx.layout.toggleSidebar();
  return true;
}

function makeNavigationRail(ctx, sidebar) {
  return function NavigationRail() {
    const { panels, pluginRows, taskRows, category, hasMore } = useNavigationDirectory(ctx, sidebar);
    const { collapsed, preview } = useSource(sidebar.store);
    const [error, setError] = useState('');
    const extensions = useRef(null);
    useNativeExtensionNavigation(sidebar, extensions, panels);
    const pick = id => {
      sidebar.hide();
      setError('');
      try { ctx.layout.selectPanel(id); } catch (e) { setError(errorText(e)); }
    };
    const openMore = () => { openMorePanel(ctx, sidebar, setError); };
    const item = (id, name, icon, action, active) => h('button', {
      key: id, type: 'button', className: 'dsc-rail__item' + ((active === true || category === id) ? ' dsc-rail__item--active' : ''),
      title: collapsed ? undefined : name, 'data-tip': name, 'data-dsc-preview-trigger': id, 'data-preview-enabled': collapsed,
      'aria-label': name, 'aria-current': (active === true || category === id) ? 'page' : undefined,
      'aria-haspopup': collapsed ? 'dialog' : undefined, 'aria-expanded': collapsed ? preview === id : undefined,
      'aria-controls': collapsed ? 'dsc-sidebar-card' : undefined,
      onPointerEnter: e => { if (e.pointerType !== 'touch') sidebar.enter(id); }, onPointerLeave: sidebar.leave,
      onFocus: () => sidebar.enter(id), onBlur: sidebar.leave,
      onKeyDown: e => { if (e.key === 'Escape') { sidebar.hide(); e.preventDefault(); } }, onClick: action
    }, icon === 'more' ? h(Icon, { name: 'more', size: 20 }) : h(PrototypeIcon, { name: icon }));
    return createPortal(h(React.Fragment, null,
      h('nav', { className: 'dsc-ui dsc-rail dsc-independent-rail', 'aria-label': '主导航' },
        item('home', '首页', 'home', () => pick(null)),
        taskRows.length > 0 && item('tasks', '定时任务', 'tasks', () => pick(taskRows[0].id)),
        pluginRows.length > 0 && item('plugins', '自定义', 'plugins', () => pick(pluginRows.some(row => row.id === 'plugins') ? 'plugins' : SKILLS_PANEL_ID), category === 'skills'),
        hasMore && item('more', '更多', 'more', openMore),
        h('div', { ref: extensions, className: 'dsc-extension-navigation-anchor', 'aria-hidden': true }),
        h('span', { className: 'dsc-rail-hitblock', 'aria-hidden': true })),
      error && h('div', { className: 'dsc-ui dsc-navigation-error' }, h(ErrorLine, { text: error }))), document.body);
  };
}

// 「更多」main 页面：只是深色空白正文；入口动作全部在左侧二级菜单。
function MoreMain() {
  return h('div', { className: 'dsc-ui dsc-more-page', 'aria-label': '更多' });
}

// 面板无条件注册；侧栏「更多」入口的显示仍由原宿主 entry-customization 判定。
function registerMorePage(ctx) {
  return ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: MORE_PANEL_ID }, function MoreMainPage() {
    return h(MoreMain);
  }));
}

function makeSidebarChrome(ctx, sidebar, archiveNotice) {
  const completions = createSessionCompletionTracker(ctx);
  ctx.effect(() => completions.start(), 'codex-style: unread session completions');
  ctx.effect(() => registerMorePage(ctx), 'codex-style: more page');
  const Tree = makeWorkspaceTree(ctx, completions.store, archiveNotice);
  return function SidebarChrome() {
    const { panel, pluginRows, taskRows, category: selectedCategory, hasMore } = useNavigationDirectory(ctx, sidebar);
    const { collapsed, preview } = useSource(sidebar.store);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [geometry, setGeometry] = useState(null);
    const marker = useRef(null);
    const insidePointer = useRef(null);
    const lastWidth = useRef(DEFAULT_SIDEBAR_WIDTH);
    const lastSection = useRef('home');
    const section = sidebarSectionOf(selectedCategory, lastSection, hasMore);
    const presentation = useRef({ category: section, mode: 'docked' });
    const search = useRef(null);
    const searchAnchor = useRef(null);
    useLayoutEffect(() => {
      const column = marker.current?.closest('[data-slot="sidebar"]')?.parentElement;
      const frame = column?.parentElement;
      if (!column || !frame) return;
      const measure = () => {
        const isCollapsed = frame.hasAttribute('data-sidebar-collapsed');
        const box = column.getBoundingClientRect();
        const targetWidth = parseFloat(getComputedStyle(frame).getPropertyValue('--dsh-windows-sidebar-width')) || box.width;
        if (!isCollapsed && targetWidth >= 264) lastWidth.current = targetWidth;
        // 退场仍保留完整内容宽度；不让宿主收起的 0px 列裁掉淡出过程。
        setGeometry({ left: box.left, top: box.top, height: box.height, width: lastWidth.current });
        sidebar.setCollapsed(isCollapsed);
      };
      measure();
      const size = new ResizeObserver(measure);
      size.observe(column);
      const state = new MutationObserver(measure);
      state.observe(frame, { attributes: true, attributeFilter: ['data-sidebar-collapsed'] });
      window.addEventListener('resize', measure);
      return () => { size.disconnect(); state.disconnect(); window.removeEventListener('resize', measure); };
    }, []);
    // 第三方直接打开原 main，保留最近的二级区域，不给它再造一层目录。
    const visibleCategory = collapsed ? preview : section;
    const shown = geometry !== null && visibleCategory !== null;
    if (shown) presentation.current = { category: visibleCategory, mode: collapsed ? 'floating' : 'docked' };
    const { category, mode } = presentation.current;
    useEffect(() => { if (shown && searchOpen && category === 'home') search.current?.focus(); }, [shown, searchOpen, category]);
    useEffect(() => {
      if (!collapsed || !preview) return;
      const outside = e => {
        // React 的 capture 会沿 portal 祖先传播，项目菜单/详情卡也属于侧栏。
        if (insidePointer.current !== e && !e.target.closest?.('[data-dsc-preview-trigger]')) sidebar.hide();
      };
      const blur = () => sidebar.hide();
      const escape = e => { if (e.key === 'Escape' && !e.defaultPrevented) { sidebar.hide(); e.preventDefault(); } };
      document.addEventListener('pointerdown', outside);
      document.addEventListener('keydown', escape);
      window.addEventListener('blur', blur);
      return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); window.removeEventListener('blur', blur); };
    }, [collapsed, preview]);
    const run = async action => { setError(''); try { await action(); } catch (e) { setError(errorText(e)); } };
    const pick = id => run(() => { ctx.layout.selectPanel(id); sidebar.hide(); });
    const moreAction = action => run(() => {
      action();
      sidebar.hide();
    });
    const openSearch = () => { if (collapsed) sidebar.show('home'); else pick(null); setSearchOpen(true); };
    const closeSearch = () => { setSearchOpen(false); setQuery(''); searchAnchor.current?.focus(); };
    const pageRows = category === 'tasks' ? taskRows : pluginRows;
    const inset = mode === 'floating' ? 4 : 0;
    const style = geometry ? { left: geometry.left + inset, top: geometry.top + inset, width: Math.min(geometry.width, Math.max(0, window.innerWidth - geometry.left - inset - 8)), height: Math.max(0, geometry.height - inset * 2) } : { visibility: 'hidden' };
    const shell = h('div', {
      ref: node => { if (node) node.inert = !shown; }, id: 'dsc-sidebar-card', className: 'dsc-ui dsc-sidebar-shell', style,
      'data-mode': mode, 'data-section': category, 'data-open': shown, 'aria-hidden': !shown,
      role: mode === 'floating' ? 'dialog' : undefined, 'aria-label': mode === 'floating' ? (category === 'home' ? '首页侧栏' : category === 'tasks' ? '定时任务侧栏' : category === 'more' ? '更多侧栏' : category === 'skills' ? '技能侧栏' : '自定义侧栏') : undefined,
      onPointerEnter: sidebar.hold, onPointerLeave: sidebar.leave,
      onPointerDownCapture: e => { insidePointer.current = e.nativeEvent; },
      onFocusCapture: sidebar.hold, onBlurCapture: sidebar.leave,
      onKeyDown: e => { if (collapsed && e.key === 'Escape' && !e.defaultPrevented) { sidebar.hide(); e.preventDefault(); } }
    },
      h('aside', { key: category, className: 'dsc-sidebar', 'aria-label': category === 'home' ? '项目与对话' : category === 'tasks' ? '定时任务' : category === 'more' ? '更多' : category === 'skills' ? '技能' : '自定义' },
        h('div', { className: 'dsc-sidebar__header' }, category === 'home' ? h('div', { className: 'dsc-brand' }, h('img', { className: 'dsc-brand__mark', src: BRAND_MARK, alt: '' }), h('span', { className: 'dsc-brand__wordmark' }, 'deepseek'), h('span', { className: 'dsc-brand__badge' }, 'HARNESS')) : h('strong', { className: 'dsc-section-page-title' }, category === 'tasks' ? '定时任务' : category === 'more' ? '更多' : '自定义'),
          h('div', { className: 'dsc-sidebar__header-actions' }, h('button', { type: 'button', ref: searchAnchor, className: 'dsc-icon-button', title: '搜索对话与项目', 'aria-label': '搜索对话与项目', 'aria-expanded': searchOpen, onClick: openSearch }, h(Icon, { name: 'search' })))),
        category === 'home' && h('button', { type: 'button', className: 'dsc-new-chat', title: '新聊天', onClick: () => { setSearchOpen(false); setQuery(''); run(() => { ctx.uiWorkspace.startSession(); sidebar.hide(); }); } }, h(PrototypeIcon, { name: 'newChat' }), h('span', null, '新聊天')),
        category === 'home' && searchOpen && h('label', { className: 'dsc-search dsc-sidebar-search' }, h(Icon, { name: 'search' }), h('input', { ref: search, value: query, onChange: e => setQuery(e.target.value), onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); closeSearch(); } }, placeholder: '搜索标题或项目', 'aria-label': '搜索标题或项目' }), h('button', { type: 'button', onClick: closeSearch, 'aria-label': '关闭搜索' }, '×')),
        h(ErrorLine, { text: error }),
        category === 'home' ? h(Tree, { query, tools: false, active: shown, onNavigate: sidebar.hide }) : category === 'more' ? h('div', { className: 'dsc-secondary-nav' },
          h('button', { type: 'button', className: 'dsc-secondary-item', onClick: () => moreAction(() => ctx.pluginNavigation.openList()) }, h(PrototypeIcon, { name: 'plugins' }), '浏览更多插件'),
          h('button', { type: 'button', className: 'dsc-secondary-item', onClick: () => moreAction(() => ctx.uiWorkspace.startSession(undefined, { agentPreset: 'cordis', prompt: ctx.locale.bind('entryCustomization')('createPrompt.sidebar'), whenDraftExists: 'append' })) }, h(Icon, { name: 'plus' }), '创建你的插件'))
          : h('div', { className: 'dsc-secondary-nav' }, pageRows.map(row => h('button', { key: row.id, type: 'button', className: 'dsc-secondary-item' + (row.id === panel.activePanelId ? ' is-active' : ''), 'aria-current': row.id === panel.activePanelId ? 'page' : undefined, onClick: () => pick(row.id) }, h(Icon, { name: category === 'tasks' ? 'tasks' : row.id === SKILLS_PANEL_ID ? 'skill' : 'plugins' }), row.label)))));
    return h(React.Fragment, null, h('span', { ref: marker, 'aria-hidden': true }), createPortal(shell, document.body));
  };
}

function makeShellChrome(ctx, sidebar) {
  const Navigation = makeNavigationRail(ctx, sidebar);
  const Toggle = makeSidebarToggle(ctx);
  return function ShellChrome() {
    const marker = useRef(null);
    useLayoutEffect(() => {
      // 由公开 overlay/slot 锚点找到它们所属的列，
      // 外壳仅增加插件标记；宽度通过已有布局动作初始化，不改写 grid 或搬移 DOM。
      const overlay = marker.current?.closest('[data-shell-overlay]');
      const frame = overlay?.parentElement;
      if (!frame) return;
      const saved = [];
      const mark = (element, name, value = '') => {
        if (!element) return;
        saved.push([element, name, element.getAttribute(name)]);
        element.setAttribute(name, value);
      };
      // main 插槽外还有 MainPanel；圆角裁剪属于 frame 的直接子列，不能标到内层。
      const columnFor = slot => {
        let element = frame.querySelector(`[data-slot="${slot}"]`);
        while (element && element.parentElement !== frame) element = element.parentElement;
        return element;
      };
      mark(document.body, 'data-dsh-codex-chrome', PLUGIN_VERSION);
      mark(frame, 'data-dsc-frame');
      mark(columnFor('sidebar'), 'data-dsc-sidebar-column');
      mark(columnFor('main'), 'data-dsc-center-column');
      const restoreWidth = initializeSidebarWidth(ctx);
      return () => {
        restoreWidth?.();
        saved.reverse().forEach(([element, name, previous]) => {
          if (previous === null) element.removeAttribute(name); else element.setAttribute(name, previous);
        });
      };
    }, []);
    return h(React.Fragment, null, h('span', { ref: marker, hidden: true }), h(Navigation), h(Toggle));
  };
}

// 此常驻入口不替换 AppFrame，也不修改系统标题栏；collapsed 时仍可重新打开侧栏。
function makeSidebarToggle(ctx) {
  return function SidebarToggle() {
    return createPortal(h('div', { className: 'dsc-ui dsc-window-sidebar-toggle' }, h('button', { type: 'button', className: 'dsc-icon-button', title: '显示或隐藏侧边栏', 'aria-label': '显示或隐藏侧边栏', onClick: () => ctx.layout.toggleSidebar() }, h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, 'aria-hidden': true }, h('rect', { x: 2, y: 3, width: 12, height: 10, rx: 1.5 }), h('path', { d: 'M6 3v10' })))), document.body);
  };
}

// 视图胶囊只按宿主公开锚点工作：行宽和滑块几何都来自真实 DOM 测量，
// 不绑定具体视图 id，也不改宿主的注册、排序、固定/取消固定或选中状态。
// 宿主按 (行宽 - 48) / 120 估算可见视图；这是偏保守的固定预算（真实中文标签约 40-56px）。
// 这里不再用预算反推可见数：行宽放到内容宽，让宿主尽量多渲染；
// 胶囊用 --dsc-view-max-width 收缩到 actions 右侧的真实剩余空间，长标签在胶囊内省略。
const VIEW_MORE_RESERVE = 40; // 更多按钮 24px + 间距 + 胶囊边框/内边距余量
const VIEW_ROW_GAP = 8; // 与左侧 actions 的间距
const VIEW_ROW_MIN_INLINE = 120; // 低于此宽度改为独立一行，避免胶囊被压到不可读
const VIEW_ROW_NARROW = 640; // 与 header.css 的容器查询阈值一致

// 行宽决定宿主渲染几个视图；胶囊最大宽度决定它实际能占多少。
// 两者分开后，宿主不会因为固定 120px 预算把本可放下的视图提前收进四格菜单。
function viewRowPlan({ contentWidth, actionsWidth, narrow }) {
  if (!(contentWidth > 0)) return null;
  const used = Number.isFinite(actionsWidth) ? Math.max(0, actionsWidth) : 0;
  const available = Math.max(0, contentWidth - used - VIEW_ROW_GAP);
  if (narrow || available < VIEW_ROW_MIN_INLINE) return { mode: 'stacked', width: contentWidth, capsule: null };
  return {
    mode: 'inline',
    width: contentWidth,
    capsule: Math.max(0, available - VIEW_MORE_RESERVE)
  };
}

// 白色滑块相对 tablist 的 padding box 定位；边框宽度由计算样式提供。
function viewSliderBox({ tabsLeft, tabsBorderLeft, tabLeft, tabWidth }) {
  return { left: Math.max(0, tabLeft - tabsLeft - tabsBorderLeft), width: Math.max(0, tabWidth) };
}

// 可脱离 React 测试的 DOM 呈现器：加可释放标记/变量、写测量行宽与滑块几何。
function createConversationHeaderPresenter({ header, window: win, document: doc, MutationObserver: Mutation, ResizeObserver: Resize }) {
  const view = win || header.ownerDocument?.defaultView || globalThis;
  const documentRef = doc || header.ownerDocument || globalThis.document;
  const MutationClass = Mutation || view.MutationObserver || globalThis.MutationObserver;
  const ResizeClass = Resize || view.ResizeObserver || globalThis.ResizeObserver;
  const attributes = new Map();
  const properties = new Map();
  const observed = new Set();
  let frame = null;
  let disposed = false;
  let activeAttributes = new Set();
  let activeProperties = new Set();
  const getStyle = node => {
    try {
      const owner = node?.ownerDocument?.defaultView;
      const reader = owner?.getComputedStyle || view.getComputedStyle || globalThis.getComputedStyle;
      return reader ? reader(node) : {};
    } catch (_error) {
      return {};
    }
  };
  const requestFrame = typeof view.requestAnimationFrame === 'function' ? fn => view.requestAnimationFrame(fn) : fn => { fn(); return null; };
  const cancelFrame = typeof view.cancelAnimationFrame === 'function' ? id => view.cancelAnimationFrame(id) : () => {};
  const restoreAttributes = (node, saved) => {
    if (!node || typeof node.setAttribute !== 'function') return;
    for (const [name, value] of saved) {
      if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
    }
  };
  const rememberAttribute = (node, name) => {
    let saved = attributes.get(node);
    if (!saved) attributes.set(node, saved = new Map());
    if (!saved.has(name)) saved.set(name, node.getAttribute(name));
  };
  const mark = (node, name) => {
    if (!node) return;
    activeAttributes.add(node);
    rememberAttribute(node, name);
    if (!node.hasAttribute(name)) node.setAttribute(name, '');
  };
  const unmark = (node, name) => {
    const saved = attributes.get(node);
    if (!saved || !saved.has(name)) return;
    const value = saved.get(name);
    if (node.isConnected !== false) {
      if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
    }
    saved.delete(name);
    if (saved.size === 0) attributes.delete(node);
  };
  const restoreProperties = (node, saved) => {
    if (!node?.style || typeof node.style.setProperty !== 'function') return;
    for (const [name, [value, priority]] of saved) {
      if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
    }
  };
  const rememberProperty = (node, name) => {
    let saved = properties.get(node);
    if (!saved) properties.set(node, saved = new Map());
    if (!saved.has(name)) {
      saved.set(name, [node.style.getPropertyValue(name), typeof node.style.getPropertyPriority === 'function' ? node.style.getPropertyPriority(name) : '']);
    }
  };
  // value 为 null 时恢复插件接管前的值；CSS 里用默认值兜底。
  const applyProperty = (node, name, value) => {
    if (!node?.style || typeof node.style.setProperty !== 'function') return;
    activeProperties.add(node);
    rememberProperty(node, name);
    if (value === null || value === undefined) {
      const saved = properties.get(node)?.get(name);
      if (saved && saved[0]) node.style.setProperty(name, saved[0], saved[1]); else node.style.removeProperty(name);
    } else {
      const text = String(value);
      if (node.style.getPropertyValue(name) !== text) node.style.setProperty(name, text);
    }
  };
  // actions 是拉伸的 grid/flex 容器，容器自身宽度不能代表内容占用；
  // 取直接 flex 项（穿透 display:contents 包装层）的最右边缘。
  const usedRight = element => {
    let right = 0;
    const walk = node => {
      for (const child of node?.children || []) {
        if (getStyle(child).display === 'contents') { walk(child); continue; }
        const rect = typeof child.getBoundingClientRect === 'function' ? child.getBoundingClientRect() : null;
        if (rect && rect.width > 0) right = Math.max(right, Number.isFinite(rect.right) ? rect.right : rect.left + rect.width);
      }
    };
    walk(element);
    return right;
  };
  const observe = node => {
    if (!ResizeClass || !node || observed.has(node)) return;
    observed.add(node);
    resizeObserver.observe(node);
  };
  const resizeObserver = ResizeClass ? new ResizeClass(() => schedule()) : null;
  const mutationObserver = MutationClass ? new MutationClass(records => { if (records.length) schedule(); }) : null;
  const prune = () => {
    for (const node of [...observed]) {
      if (node.isConnected === false) {
        resizeObserver?.unobserve?.(node);
        observed.delete(node);
      }
    }
  };
  const schedule = () => {
    if (disposed || frame !== null) return;
    frame = requestFrame(sync);
  };
  const sync = () => {
    frame = null;
    if (disposed) return;
    activeAttributes = new Set();
    activeProperties = new Set();
    const headerRect = typeof header.getBoundingClientRect === 'function' ? header.getBoundingClientRect() : { left: 0, width: 0 };
    const headerStyle = getStyle(header);
    const borderLeft = parseFloat(headerStyle.borderLeftWidth) || 0;
    const paddingLeft = parseFloat(headerStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(headerStyle.paddingRight) || 0;
    const contentLeft = (headerRect.left || 0) + borderLeft + paddingLeft;
    const contentWidth = Math.max(0, (header.clientWidth || headerRect.width || 0) - paddingLeft - paddingRight);
    const corner = header.querySelector('[data-conversation-header-corner]');
    const row = corner?.parentElement;
    const tabs = header.querySelector('[data-conversation-tabs]');
    let actions = null;
    if (row && corner) {
      mark(header, 'data-dsc-conversation-header');
      mark(row, 'data-dsc-header-title-row');
      const navigation = row.querySelector('nav[aria-label]');
      mark(navigation?.parentElement, 'data-dsc-header-title-cluster');
      mark(navigation, 'data-dsc-header-navigation');
      // 末项是当前标题容器；只标记它，祖先面包屑按钮与操作保持原样。
      mark(navigation?.lastElementChild, 'data-dsc-header-title');
      actions = row.querySelector('[data-slot="conversation.session.header.actions"]')?.parentElement;
      mark(actions, 'data-dsc-header-actions');
      mark(row.querySelector('[data-slot="conversation.session.header.utilities"]')?.parentElement, 'data-dsc-header-utilities');
      mark(row.querySelector('[data-slot="conversation.session.header.utilities"] [data-open-target="directory"]')?.parentElement, 'data-dsc-header-open-in-app');
      mark(corner, 'data-dsc-header-corner');
    }
    if (tabs) {
      mark(tabs, 'data-dsc-view-switch');
      // rc.2 的 tablist 本身是行；rc.3 的父行还拥有原生更多视图菜单。
      const tabsRow = tabs.parentElement !== header && tabs.parentElement?.getAttribute('data-slot') !== 'conversation.session.header' ? tabs.parentElement : null;
      mark(tabsRow, 'data-dsc-header-view-row');
      const buttons = [...tabs.querySelectorAll('[role="tab"]')];
      const active = buttons.findIndex(button => button.getAttribute('aria-selected') === 'true');
      for (const [name, value] of [['--dsc-view-count', Math.max(1, buttons.length)], ['--dsc-view-index', Math.max(0, active)], ['--dsc-view-active', active >= 0 ? 1 : 0]]) {
        applyProperty(tabs, name, value);
      }
      // 行宽放到内容宽让宿主尽量多渲染；胶囊用实际剩余空间收缩，避免提前收进四格。
      if (tabsRow) {
        const plan = viewRowPlan({
          contentWidth,
          actionsWidth: actions ? Math.max(0, usedRight(actions) - contentLeft) : 0,
          narrow: contentWidth <= VIEW_ROW_NARROW
        });
        if (plan?.mode === 'inline') {
          unmark(header, 'data-dsc-header-views-own-row');
          applyProperty(tabsRow, '--dsc-view-row-width', Math.round(plan.width) + 'px');
          applyProperty(tabs, '--dsc-view-max-width', Math.round(plan.capsule) + 'px');
        } else {
          mark(header, 'data-dsc-header-views-own-row');
          applyProperty(tabsRow, '--dsc-view-row-width', null);
          applyProperty(tabs, '--dsc-view-max-width', null);
        }
      }
      // 白滑块跟随实际选中项；选中项被固定在“更多”菜单时不显示。
      const tabsRect = typeof tabs.getBoundingClientRect === 'function' ? tabs.getBoundingClientRect() : null;
      const tabRect = active >= 0 && typeof buttons[active].getBoundingClientRect === 'function' ? buttons[active].getBoundingClientRect() : null;
      if (tabsRect && tabRect && tabRect.width > 0) {
        const box = viewSliderBox({
          tabsLeft: tabsRect.left,
          tabsBorderLeft: parseFloat(getStyle(tabs).borderLeftWidth) || 0,
          tabLeft: tabRect.left,
          tabWidth: tabRect.width
        });
        applyProperty(tabs, '--dsc-view-left', box.left.toFixed(2) + 'px');
        applyProperty(tabs, '--dsc-view-width', box.width.toFixed(2) + 'px');
      } else {
        applyProperty(tabs, '--dsc-view-left', '0px');
        applyProperty(tabs, '--dsc-view-width', '0px');
      }
      observe(tabs);
    }
    observe(actions);
    prune();
    for (const [element, saved] of [...attributes]) if (!activeAttributes.has(element)) { restoreAttributes(element, saved); attributes.delete(element); }
    for (const [element, saved] of [...properties]) if (!activeProperties.has(element)) { restoreProperties(element, saved); properties.delete(element); }
  };
  sync();
  if (mutationObserver) mutationObserver.observe(header, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['aria-selected'] });
  observe(header);
  view.addEventListener?.('resize', schedule);
  try {
    const ready = documentRef?.fonts?.ready;
    if (ready && typeof ready.then === 'function') ready.then(() => { if (!disposed) schedule(); }).catch(() => {});
  } catch (_error) {}
  return {
    sync,
    dispose() {
      if (disposed) return;
      disposed = true;
      if (frame !== null) { cancelFrame(frame); frame = null; }
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
      view.removeEventListener?.('resize', schedule);
      for (const [element, saved] of attributes) restoreAttributes(element, saved);
      attributes.clear();
      for (const [element, saved] of properties) restoreProperties(element, saved);
      properties.clear();
      observed.clear();
    }
  };
}

// 公开的会话头 leading 座负责留位；仅收起二级侧栏时显示，不覆盖标题。
// 保留原生头部、视图按钮和子槽所有权，仅从公开锚点添加可释放的布局标记。
function useConversationHeaderChrome(marker, enabled) {
  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const header = marker.current?.closest('header');
    if (!header) return undefined;
    const presenter = createConversationHeaderPresenter({ header });
    return () => presenter.dispose();
  }, [marker, enabled]);
}

// 工作区归属只读宿主公开数据：sessions.list 的 retainedBy.mainView 定位当前会话，
// Summary 的 cwd 与官方 ConversationContent 同一读取路径；workspaces.items 的
// sessionIds 是多引用权威归属。多引用时仅用 cwd 唯一消歧，无法消歧则不显示。
function normalizedWorkspacePath(value) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
}
function workspacePathRank(workspace, cwd) {
  const path = normalizedWorkspacePath(workspace?.path);
  if (!path || !cwd || (cwd !== path && !cwd.startsWith(path + '/'))) return -1;
  return path.length;
}
function currentMainSessionId(sessions) {
  const ids = Array.isArray(sessions?.ids) ? sessions.ids : [];
  const active = ids.filter(id => ((sessions.byId?.[id]?.retainedBy?.mainView ?? 0) > 0));
  return active.length === 1 ? active[0] : null;
}
function pickSessionWorkspace(sessions, workspaces) {
  const sessionId = currentMainSessionId(sessions);
  if (sessionId === null) return null;
  const items = Array.isArray(workspaces?.items) ? workspaces.items : [];
  const owners = items.filter(item => Array.isArray(item.sessionIds) && item.sessionIds.includes(sessionId));
  if (owners.length === 1) return owners[0];
  // 无权威成员或存在多个共享引用时，cwd 只用于唯一匹配；0/多匹配一律隐藏。
  const pool = owners.length > 1 ? owners : items;
  const cwd = normalizedWorkspacePath(sessions.byId?.[sessionId]?.cwd);
  if (!cwd) return null;
  const ranked = pool.map(workspace => [workspacePathRank(workspace, cwd), workspace]).filter(([rank]) => rank >= 0);
  if (ranked.length === 0) return null;
  const mostSpecific = Math.max(...ranked.map(([rank]) => rank));
  const best = ranked.filter(([rank]) => rank === mostSpecific);
  return best.length === 1 ? best[0][1] : null;
}
function makeCollapsedNewChat(ctx) {
  return function ConversationHeaderLeading() {
    const marker = useRef(null);
    const sessions = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    useConversationHeaderChrome(marker, useSource(headerPresentation));
    const workspace = useMemo(() => pickSessionWorkspace(sessions, workspaces), [sessions, workspaces]);
    const name = workspace ? workspace.title || workspace.path || '' : '';
    const anchor = useRef(null);
    const [tip, setTip] = useState(null);
    const showTip = useCallback(() => {
      const box = anchor.current?.getBoundingClientRect?.();
      if (box) setTip({ left: box.left + box.width / 2, top: box.top });
    }, []);
    const hideTip = useCallback(() => setTip(null), []);
    useEffect(() => { setTip(null); }, [name, workspace?.workspaceId, currentMainSessionId(sessions)]);
    // startSession 返回 void；异步创建、导航和失败通知都由宿主处理。
    return h('div', { ref: marker, className: 'dsc-ui dsc-header-leading' },
      name && h('span', {
        ref: anchor, className: 'dsc-workspace-mark', tabIndex: 0, 'aria-label': name,
        onPointerEnter: showTip, onPointerLeave: hideTip, onFocus: showTip, onBlur: hideTip
      }, h(Icon, { name: 'folder' })),
      h('div', { className: 'dsc-collapsed-new-chat' },
        h('button', { type: 'button', className: 'dsc-icon-button', title: '新建对话', 'aria-label': '新建对话', onClick: () => ctx.uiWorkspace.startSession() }, h(PrototypeIcon, { name: 'newChat' }))),
      tip && createPortal(h('div', { className: 'dsc-ui dsc-workspace-tooltip', role: 'tooltip', style: { left: tip.left, top: tip.top - 6 } }, name), document.body));
  };
}

// 公开 sidebar.footer.action 的第三方入口：只在齿轮菜单打开时把宿主原生节点呈现为菜单上方独立分组。
// 只读公开 data-slot 锚点与 entries 计数；不重渲染、不复制、不搬移、不代发点击。
function footerActionRoot(documentRef) {
  const slot = documentRef && typeof documentRef.querySelector === 'function' ? documentRef.querySelector('[data-slot="sidebar.footer.action"]') : null;
  if (!slot || typeof slot.closest !== 'function') return null;
  if (!slot.closest('[data-slot="sidebar"]')) return null;
  // 抽屉布局里宿主列自带 transform 与裁剪，固定定位不可靠；按约定跳过。
  if (slot.closest('[data-sidebar-drawer]')) return null;
  const host = slot.parentElement;
  if (!host) return null;
  return { slot, host, base: host.parentElement };
}
// 分组紧贴菜单上方：0 个入口、抽屉布局或菜单尚未定位时不占空间。
function footerActionPlan({ entries, drawer, menuRect, viewportHeight }) {
  if (!(Number(entries) > 0) || drawer) return null;
  if (!menuRect || !(menuRect.width > 0)) return null;
  const height = Number(viewportHeight) > 0 ? Number(viewportHeight) : 0;
  const bottom = Math.max(8, Math.round(Math.max(0, height - menuRect.top) + 4));
  return {
    left: Math.max(8, Math.round(menuRect.left)),
    width: Math.max(0, Math.round(menuRect.width)),
    bottom,
    // 面板底边距视口底部 bottom，上方可用高度 = 视口高 - bottom - 顶部 8px 安全距。
    maxHeight: Math.max(48, height - bottom - 8)
  };
}
// 注册数大于 0 不代表已有可渲染入口：Cordis 无 inventory、插件返回 null、
// 渲染失败留下的 data-slot-error 空占位、display:none 的入口都可能是空的。
// 检查入口内的控件/文字及隐藏状态；不依赖侧栏祖先的布局矩形或 visibility，
// 因为收起态宿主会隐藏整个 footArea，而呈现器需要重新显示真实入口。
function footerActionHasContent(slot) {
  if (!slot || typeof slot.querySelectorAll !== 'function') return false;
  const available = node => {
    let current = node;
    while (current && current !== slot) {
      if (typeof current.hasAttribute === 'function' && (current.hasAttribute('hidden') || current.getAttribute('aria-hidden') === 'true')) return false;
      const view = current.ownerDocument && current.ownerDocument.defaultView;
      if (view && typeof view.getComputedStyle === 'function' && view.getComputedStyle(current).display === 'none') return false;
      current = current.parentElement;
    }
    return current === slot;
  };
  const isControl = node => {
    const tag = String((node && node.tagName) || '').toUpperCase();
    if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true;
    if (tag === 'A') return !!(typeof node.hasAttribute === 'function' && node.hasAttribute('href'));
    if (tag === 'SVG' || tag === 'IMG' || tag === 'CANVAS' || tag === 'VIDEO') return true;
    return !!(node && typeof node.getAttribute === 'function' && node.getAttribute('role') === 'button');
  };
  const ownText = node => {
    if (!node || typeof node.textContent !== 'string') return false;
    if (node.childNodes && node.childNodes.length > 0) {
      for (const child of node.childNodes) if (child && child.nodeType === 3 && String(child.textContent || '').trim() !== '') return true;
      return false;
    }
    return node.textContent.trim() !== '';
  };
  for (const entry of slot.children ? [...slot.children] : []) {
    if (!entry) continue;
    if (typeof entry.hasAttribute === 'function' && entry.hasAttribute('hidden')) continue;
    const nodes = [entry];
    if (typeof entry.querySelectorAll === 'function') nodes.push(...entry.querySelectorAll('*'));
    for (const node of nodes) {
      if (!available(node)) continue;
      if (isControl(node) || ownText(node)) return true;
    }
  }
  return false;
}
// 可脱离 React 测试的 DOM 呈现器：加可释放标记/变量并把原生按钮移出 Tab 序列（方向键仍可达）。
function createFooterActionPresenter({ document: doc, window: win, readEntries, readPanelRect, onRoot = () => {} }) {
  const attributes = new Map();
  const properties = new Map();
  const tabIndexes = new Map();
  const clearMarked = new Map();
  let rootElement = null;
  let disposed = false;
  const rememberAttribute = (node, name) => {
    let saved = attributes.get(node);
    if (!saved) attributes.set(node, saved = new Map());
    if (!saved.has(name)) saved.set(name, node.getAttribute(name));
  };
  const mark = (node, name, value = '') => {
    if (!node) return;
    rememberAttribute(node, name);
    if (node.getAttribute(name) !== value) node.setAttribute(name, value);
  };
  const rememberProperty = (node, name) => {
    let saved = properties.get(node);
    if (!saved) properties.set(node, saved = new Map());
    if (saved.has(name) || !node.style) return;
    saved.set(name, [node.style.getPropertyValue(name), typeof node.style.getPropertyPriority === 'function' ? node.style.getPropertyPriority(name) : '']);
  };
  const applyProperty = (node, name, value) => {
    if (!node || !node.style) return;
    rememberProperty(node, name);
    if (node.style.getPropertyValue(name) !== value) node.style.setProperty(name, value);
  };
  const restoreProperty = (node, name) => {
    const saved = properties.get(node);
    if (!saved || !saved.has(name)) return;
    const [value, priority] = saved.get(name);
    if (node.isConnected && node.style) {
      if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
    }
    saved.delete(name);
    if (saved.size === 0) properties.delete(node);
  };
  const unmark = (node, name) => {
    const saved = attributes.get(node);
    if (saved && saved.has(name)) {
      const value = saved.get(name);
      if (node.isConnected) {
        if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
      }
      saved.delete(name);
      if (saved.size === 0) attributes.delete(node);
    }
    clearMarked.delete(node);
  };
  // 分组落在宿主侧栏列层叠上下文内、低于自有 rail；菜单打开期间只让 rail 与分组
  // 竖向重叠的区段放行点击，其余 rail 面积由透明命中层继续阻挡，重叠的 rail 图标临时隐藏。
  const syncClear = (plan, host) => {
    const rail = doc && typeof doc.querySelector === 'function' ? doc.querySelector('.dsc-independent-rail') : null;
    const next = new Map();
    let clearTop = null;
    if (rail && typeof rail.getBoundingClientRect === 'function' && typeof host.getBoundingClientRect === 'function') {
      const railRect = rail.getBoundingClientRect();
      const hostRect = host.getBoundingClientRect();
      const horizontal = plan.left < railRect.right && plan.left + plan.width > railRect.left;
      const vertical = hostRect.bottom > railRect.top && hostRect.top < railRect.bottom;
      if (horizontal && vertical) {
        clearTop = Math.max(0, Math.min(railRect.height, Math.round(hostRect.top - railRect.top)));
        next.set(rail, 'data-dsc-app-footer-clear');
        if (typeof rail.querySelectorAll === 'function') {
          for (const item of rail.querySelectorAll('.dsc-rail__item')) {
            const box = typeof item.getBoundingClientRect === 'function' ? item.getBoundingClientRect() : null;
            if (box && box.bottom > hostRect.top && box.top < hostRect.bottom) next.set(item, 'data-dsc-app-footer-clear-item');
          }
        }
      }
    }
    for (const [node, marker] of [...clearMarked]) {
      if (next.get(node) === marker) continue;
      unmark(node, marker);
      if (marker === 'data-dsc-app-footer-clear') restoreProperty(node, '--dsc-app-footer-clear-top');
    }
    for (const [node, marker] of next) {
      if (clearMarked.get(node) !== marker) { mark(node, marker); clearMarked.set(node, marker); }
    }
    if (clearTop !== null) {
      for (const [node, marker] of next) {
        if (marker === 'data-dsc-app-footer-clear') applyProperty(node, '--dsc-app-footer-clear-top', clearTop + 'px');
      }
    }
  };
  const publishRoot = node => {
    if (rootElement === node) return;
    rootElement = node;
    onRoot(node);
  };
  const restore = () => {
    if (disposed && attributes.size === 0 && properties.size === 0 && tabIndexes.size === 0) return;
    for (const [node, saved] of attributes) {
      if (!node.isConnected) continue;
      for (const [name, value] of saved) {
        if (value === null) node.removeAttribute(name); else node.setAttribute(name, value);
      }
    }
    attributes.clear();
    for (const [node, saved] of properties) {
      if (!node.isConnected) continue;
      for (const [name, [value, priority]] of saved) {
        if (value) node.style.setProperty(name, value, priority); else node.style.removeProperty(name);
      }
    }
    properties.clear();
    for (const [node, value] of tabIndexes) if (node.isConnected) node.tabIndex = value;
    tabIndexes.clear();
    clearMarked.clear();
    publishRoot(null);
  };
  const sync = () => {
    if (disposed) return;
    let entries = 0;
    try { entries = Number(readEntries && readEntries()) || 0; } catch (_error) { entries = 0; }
    const target = footerActionRoot(doc);
    const menuRect = target ? readPanelRect && readPanelRect() : null;
    const plan = target ? footerActionPlan({ entries, drawer: false, menuRect, viewportHeight: win && win.innerHeight }) : null;
    // 注册数只说明“有人登记”，不足以证明已渲染；空 slot 不占样式、不改宿主布局。
    if (!target || !plan || !footerActionHasContent(target.slot)) { restore(); return; }
    const { slot, host, base } = target;
    mark(host, 'data-dsc-app-footer-host');
    mark(base, 'data-dsc-app-footer-base');
    applyProperty(host, '--dsc-app-footer-left', plan.left + 'px');
    applyProperty(host, '--dsc-app-footer-width', plan.width + 'px');
    applyProperty(host, '--dsc-app-footer-bottom', plan.bottom + 'px');
    applyProperty(host, '--dsc-app-footer-max-height', plan.maxHeight + 'px');
    for (const child of slot.children ? [...slot.children] : []) {
      if (!child || typeof child.tagName !== 'string') continue;
      mark(child, 'data-dsc-app-footer-entry');
      // 宿主收起态只给这些入口渲染图标（第三方按 wide=false 省略文字节点）；
      // 分组里用按钮的无障碍名称补一个可见标签，展开态已有原生文字时自动不生效。
      const button = typeof child.querySelectorAll === 'function' ? child.querySelectorAll('button')[0] : null;
      const text = typeof child.textContent === 'string' ? child.textContent.replace(/\s+/g, '') : '';
      const label = button ? String(button.getAttribute('aria-label') || button.getAttribute('title') || '').trim() : '';
      if (button && text === '' && label) mark(button, 'data-dsc-app-footer-label', label);
      else if (button) unmark(button, 'data-dsc-app-footer-label');
    }
    if (typeof host.querySelectorAll === 'function') {
      for (const node of host.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')) {
        if (!tabIndexes.has(node)) tabIndexes.set(node, node.tabIndex);
        if (node.tabIndex !== -1) node.tabIndex = -1;
      }
    }
    syncClear(plan, host);
    publishRoot(host);
  };
  return {
    sync,
    root: () => rootElement,
    dispose() {
      disposed = true;
      restore();
    }
  };
}
// 入口可能在菜单打开期间返回 null、被隐藏或整组替换：只监听 slot 自身的子节点与
// 显示相关属性；本组件写入的 data-*/tabindex/CSS 变量不在观察范围内，不会自激。
function watchFooterActionSlot(schedule, documentRef, Observer = typeof MutationObserver === 'function' ? MutationObserver : null) {
  if (!documentRef || typeof Observer !== 'function') return () => {};
  let observer = null;
  let target = null;
  const bind = () => {
    const slot = documentRef.querySelector('[data-slot="sidebar.footer.action"]');
    if (slot === target) return;
    if (observer) observer.disconnect();
    target = slot;
    observer = slot ? new Observer(() => { bind(); schedule(); }) : null;
    if (observer) observer.observe(slot, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'hidden', 'class', 'aria-hidden'] });
  };
  bind();
  const disconnect = () => {
    if (observer) observer.disconnect();
    observer = null;
    target = null;
  };
  disconnect.refresh = bind;
  return disconnect;
}
// 菜单打开期间跟踪公开 footer 入口；关闭时恢复属性并把焦点送回齿轮。
function useHostFooterActions(ctx, open, menuRef, anchorRef) {
  const [groupRoot, setGroupRoot] = useState(null);
  useLayoutEffect(() => {
    if (!open || typeof document === 'undefined') { setGroupRoot(null); return undefined; }
    let frame = 0;
    const presenter = createFooterActionPresenter({
      document,
      window,
      readEntries: () => {
        try { return ctx.slots.entriesOfSlot('sidebar.footer.action').length; } catch (_error) { return 0; }
      },
      readPanelRect: () => (menuRef.current && typeof menuRef.current.getBoundingClientRect === 'function' ? menuRef.current.getBoundingClientRect() : null),
      onRoot: element => { setGroupRoot(previous => (previous === element ? previous : element)); }
    });
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; disconnectContent.refresh?.(); presenter.sync(); });
    };
    const disconnectContent = watchFooterActionSlot(schedule, document);
    presenter.sync();
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    const observer = sidebar && typeof MutationObserver === 'function' ? new MutationObserver(schedule) : null;
    if (observer && sidebar) observer.observe(sidebar, { childList: true, subtree: true });
    let unsubscribe = () => {};
    try {
      if (ctx.slots && typeof ctx.slots.subscribe === 'function') unsubscribe = ctx.slots.subscribe('sidebar.footer.action', schedule);
    } catch (_error) { unsubscribe = () => {}; }
    const size = menuRef.current && typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
    if (size && menuRef.current) size.observe(menuRef.current);
    const panel = menuRef.current;
    if (panel && typeof panel.addEventListener === 'function') panel.addEventListener('animationend', schedule);
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      if (observer) observer.disconnect();
      disconnectContent();
      if (size) size.disconnect();
      if (panel && typeof panel.removeEventListener === 'function') panel.removeEventListener('animationend', schedule);
      unsubscribe();
      window.removeEventListener('resize', schedule);
      const host = presenter.root();
      if (host && typeof host.contains === 'function' && host.contains(document.activeElement)) anchorRef.current?.focus();
      presenter.dispose();
      setGroupRoot(null);
    };
  }, [ctx, open, menuRef, anchorRef]);
  return groupRoot;
}

function makeGearLauncher(ctx) {
  return function GearLauncher({ openSettings, settingsOpen }) {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [failed, setFailed] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const anchor = useRef(null);
    const menuRef = useRef(null);
    const footerRoot = useHostFooterActions(ctx, open, menuRef, anchor);
    useEffect(() => { if (settingsOpen) setOpen(false); }, [settingsOpen]);
    useEffect(() => {
      if (!open) return;
      let active = true;
      setProfile(null); setFailed(false); setAvatarFailed(false);
      const version = ctx.modules.manifest.release?.version;
      if (!version) { setFailed(true); return; }
      const client = { version, locale: ctx.locale.getSnapshot().active, timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
      ctx.remote.account.getProfile(client).then(result => {
        if (!result.ok) throw result.error;
        if (active) { setProfile(result.value?.status === 'ready' ? result.value.value : null); setFailed(result.value?.status !== 'ready'); }
      }).catch(() => { if (active) setFailed(true); });
      return () => { active = false; };
    }, [open]);
    const showSettings = () => { setOpen(false); openSettings(); };
    const showAppearance = () => { setOpen(false); openSettings('codex-appearance'); };
    return createPortal(h('div', { className: 'dsc-ui dsc-gear-launcher' },
      h('button', { ref: anchor, type: 'button', className: 'dsc-gear-button', 'aria-label': '设置', 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) }, h(PrototypeIcon, { name: 'settings' })),
      open && h(Popover, { anchor, onClose: () => setOpen(false), label: '设置与账号', width: 228, className: 'dsc-app-menu', panelRef: menuRef, extraRoots: footerRoot ? [footerRoot] : [] },
        h('button', { type: 'button', className: 'dsc-account-row', role: 'menuitem', onClick: showSettings, title: '在账号子页面中管理' }, profile?.avatarUrl && !avatarFailed ? h('img', { src: profile.avatarUrl, alt: '', onError: () => setAvatarFailed(true) }) : h('span', { className: 'dsc-account-avatar' }, h(Icon, { name: 'chat' })), h('span', null, h('strong', null, profile?.name || profile?.contact || '账号'), h('small', null, profile ? '账号与设置' : failed ? '打开账号设置' : '正在读取账号…'))),
        h('div', { className: 'dsc-menu-separator', role: 'separator' }),
        // 外观选择搬进设置页：齿轮菜单只留入口，避免再开一层浮层。
        h(Option, { title: '外观', detail: currentAppearanceLabel(), icon: 'appearance', onClick: showAppearance }),
        h(Option, { title: '设置', icon: 'settings', onClick: showSettings }))), document.body);
  };
}

function CloudMark() {
  return h('svg', { viewBox: '0 0 64 64', width: 48, height: 48, fill: 'none', stroke: 'currentColor', strokeWidth: 3.1, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: 'M21 9c5-6 13-6 18-1 9-1 17 6 17 14 8 6 9 17 2 24-1 10-10 17-20 14-8 6-19 3-23-5C4 54-1 44 4 35c-4-8 1-18 9-20 1-3 4-5 8-6Z' }), h('path', { d: 'm20 24 6 9-6 9m16 1h11' }));
}
// 公开 region/slot 锚点用于测量；不查私有 class，不搬移原编辑器或其它节点。
function useHeroGeometry(ref) {
  const [geometry, setGeometry] = useState(null);
  useLayoutEffect(() => {
    const region = ref.current?.closest('[data-conversation-content]');
    const composer = region?.querySelector('[data-slot="conversation.composer.bar"]');
    if (!region || !composer) return;
    const measure = () => {
      const area = region.getBoundingClientRect();
      const card = (composer.querySelector('[data-composer-card]') || composer).getBoundingClientRect();
      const fallback = composer.closest('[data-chain-overlay-fallback]');
      const visible = region.getAttribute('data-content-phase') === 'hero' && area.width > 0 && card.width > 0 && (!fallback || fallback.style.display !== 'none');
      setGeometry(previous => {
        const next = visible ? { left: card.left, top: card.top, width: card.width, centerX: area.left + area.width / 2, centerY: area.top + area.height * .45 } : null;
        return JSON.stringify(previous) === JSON.stringify(next) ? previous : next;
      });
    };
    measure();
    const resize = new ResizeObserver(measure); resize.observe(region); resize.observe(composer);
    const mutation = new MutationObserver(measure); mutation.observe(region, { subtree: true, attributes: true, attributeFilter: ['data-content-phase', 'style'] });
    window.addEventListener('resize', measure); window.addEventListener('scroll', measure, true);
    return () => { resize.disconnect(); mutation.disconnect(); window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true); };
  }, [ref]);
  return geometry;
}
function EmptyHero() {
  const ref = useRef(null);
  const geometry = useHeroGeometry(ref);
  return h(React.Fragment, null, h('span', { ref, 'aria-hidden': true }), geometry && createPortal(h('div', { className: 'dsc-ui dsc-empty-hero', style: { left: geometry.centerX, top: geometry.centerY } }, h(CloudMark), h('h1', null, '我们要构建什么？')), document.body));
}
function makeHeroWorkspace(ctx) {
  return function HeroWorkspace({ open: ownerOpen, selectedId, onPick, onClose }) {
    const workspaces = useSource(ctx.workspaces.list);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const anchor = useRef(null);
    const geometry = useHeroGeometry(ref);
    const current = workspaces.items.find(row => row.workspaceId === selectedId);
    const shown = ownerOpen || open;
    useLayoutEffect(() => {
      if (!geometry) return;
      const region = ref.current?.closest('[data-conversation-content]');
      if (!region) return;
      const names = ['--dsc-hero-card-top', '--dsc-hero-card-right'];
      const previous = names.map(name => region.style.getPropertyValue(name));
      region.style.setProperty(names[0], geometry.top + 'px');
      region.style.setProperty(names[1], geometry.left + geometry.width + 'px');
      region.setAttribute('data-dsc-hero-layout', '');
      return () => { names.forEach((name, i) => { if (previous[i]) region.style.setProperty(name, previous[i]); else region.style.removeProperty(name); }); region.removeAttribute('data-dsc-hero-layout'); };
    }, [geometry]);
    const close = () => { setOpen(false); onClose(); };
    const menu = shown && h(Popover, { anchor, label: '选择项目', onClose: close, width: 280 },
      h('div', { className: 'dsc-menu-heading' }, '选择项目'),
      workspaces.items.map(row => h(Option, { key: row.workspaceId, title: row.title, detail: row.path, icon: 'folder', selected: row.workspaceId === selectedId, onClick: () => { setOpen(false); onPick(row.workspaceId); } })),
      !workspaces.items.length && h('div', { className: 'dsc-empty' }, '先在左侧添加工作区'));
    const bar = geometry && createPortal(h('div', { className: 'dsc-ui dsc-hero-projectbar', style: { left: geometry.left + 13, top: geometry.top - 38, width: Math.max(120, geometry.width - 26) } },
      h('button', { type: 'button', ref: anchor, className: 'dsc-project-picker', 'aria-haspopup': 'menu', 'aria-expanded': shown, onClick: () => { if (shown) close(); else setOpen(true); } }, h(Icon, { name: 'folder' }), current?.title || '选择项目'), menu), document.body);
    return h(React.Fragment, null, h('span', { ref, 'aria-hidden': true }), bar);
  };
}

const React = require('react');
const { createPortal } = require('react-dom');
const { Button, IconRefreshOutlineRegular } = require('@deepseek-ai/dsh-client-ui-primitives');
const { createSnapshotStore } = require('@deepseek-ai/dsh-client-store');
const h = React.createElement;
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useSyncExternalStore, useId } = React;
const PLUGIN_ID = 'dsh-codex-style';
const headerPresentation = createSnapshotStore(false);

// 自绘图标沿用本项目原型；功能与目录全部来自宿主。
const paths = {
  folder: 'M2.3 6.1c0-.75.6-1.35 1.35-1.35H6.2l1.5 1.6h4.85c.75 0 1.35.6 1.35 1.35v4.9c0 .75-.6 1.35-1.35 1.35h-8.9c-.75 0-1.35-.6-1.35-1.35Z',
  folderOpen: 'M2.1 12.2V4.4c0-.8.6-1.4 1.4-1.4h2.9l1.4 1.6h4c.8 0 1.4.6 1.4 1.4v1M2.1 12.2l2.2-4.8h9.3a.8.8 0 0 1 .7 1.1l-1.8 4a1.5 1.5 0 0 1-1.4.9H3.5a1.4 1.4 0 0 1-1.4-1.2Z',
  chat: 'M13 7.5a5 5 0 0 1-5 5H3l-1 1V7.5a5.5 5.5 0 1 1 11 0Z',
  pencil: 'M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9m-2.3-5.2-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8',
  search: 'M10.5 10.5 14 14M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
  plus: 'M8 3v10M3 8h10',
  more: 'M2 2h4v4H2zM2 10h4v4H2zM10 10h4v4h-4zM10 4h4M12 2v4',
  chevron: 'm5 6 3 3 3-3',
  back: 'm10 3-5 5 5 5',
  check: 'm3.5 8 3 3 6-6',
  shield: 'M8 1.8 13 4v4.2c0 2.8-2.3 4.8-5 6-2.7-1.2-5-3.2-5-6V4ZM8 5v3.6m0 2.1v.1',
  pin: 'm5 2 6 0-1 4 2 2H9v5l-1 1V8H4l2-2Z',
  archive: 'M3 5.5v6.3c0 .9.7 1.7 1.7 1.7h6.6c1 0 1.7-.8 1.7-1.7V5.5M2.5 2.5h11v3h-11ZM6.2 8h3.6',
  monitor: 'M2 3h12v8H2zM5.5 13h5M8 11v2',
  arrowUpRight: 'M4.8 11.2 11.2 4.8M5.9 4.8h5.3v5.3',
  close: 'M4 4l8 8M12 4l-8 8',
  settings: 'M6.5 2.5 7 1h2l.5 1.5 1.6.9 1.5-.3 1 1.8-1 1.2v1.8l1 1.2-1 1.8-1.5-.3-1.6.9L9 13H7l-.5-1.5-1.6-.9-1.5.3-1-1.8 1-1.2V6.1l-1-1.2 1-1.8 1.5.3ZM10.2 7a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0Z',
  skill: 'M8 2 14 5.2v5.6L8 14 2 10.8V5.2ZM8 2v6m6-2.8L8 11.4 2 5.2'
};
function Icon({ name, size = 16, ...props }) {
  return h('svg', { viewBox: '0 0 16 16', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, h('path', { d: paths[name] || paths.chat }));
}
function PluginSupportSection({ subject }) {
  if (subject?.kind !== 'bundle' || subject.pkg?.name !== PLUGIN_PACKAGE) return null;
  return h('aside', { className: 'dsc-plugin-support', 'aria-label': '支持插件开发' },
    h('p', null, '如果您认为插件使用体验不错，可以到github点一颗star支持我'),
    h('a', { href: 'https://github.com/xinxing1708/DSH-Codex-Style', target: '_blank', rel: 'noopener noreferrer' },
      'GitHub · xinxing1708/DSH-Codex-Style', h(Icon, { name: 'arrowUpRight', size: 14 })));
}
// 以页面时间轴零点对齐，错开开始、等待恢复和重新挂载的运行圈保持同一转角。
function syncSessionSpinner(svg) {
  if (!svg) return;
  for (const animation of svg.getAnimations()) {
    if (animation.animationName === 'dsc-session-spin') animation.startTime = 0;
  }
}
function useSource(source) {
  const subscribe = useCallback(fn => source.subscribe(fn), [source]);
  const snapshot = useCallback(() => source.getSnapshot(), [source]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}
// 社区版提醒：宿主公开 Toast 固定顶部居中；用户要求右下角，这里沿用 shell.overlay 自绘轻量提醒。
const COMMUNITY_NOTICE_TEXT = '检测到当前为社区版 DSH Desktop，不是 DeepSeek 官方版。本插件针对官方 DeepSeek Harness，效果可能一般。';
const COMMUNITY_NOTICE_HOLD_MS = 6000;
function createCommunityNotice() {
  let snapshot = null;
  const listeners = new Set();
  const publish = next => { snapshot = next; for (const listener of listeners) listener(); };
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    show(text) { publish({ text }); },
    clear() { if (snapshot !== null) publish(null); }
  };
}
function CommunityNotice({ notice }) {
  const current = useSource(notice);
  const dismiss = useCallback(() => notice.clear(), [notice]);
  useEffect(() => {
    if (!current) return undefined;
    const timer = setTimeout(dismiss, COMMUNITY_NOTICE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [current, dismiss]);
  if (!current) return null;
  return createPortal(h('div', { className: 'dsc-ui dsc-community-notice', role: 'status', 'aria-live': 'polite' }, h('span', { className: 'dsc-community-notice-text' }, current.text)), document.body);
}
// 归档成功提示：顶部居中「已归档」+ 真实撤销/关闭；停留 6 秒后用 1 秒原路淡出。
const ARCHIVE_NOTICE_HOLD_MS = 6000;
const ARCHIVE_NOTICE_FADE_MS = 1000;
function createArchiveNotice(unarchive) {
  const store = createSnapshotStore(null);
  let seq = 0;
  const show = sessionId => {
    seq += 1;
    store.set({ id: seq, sessionId, phase: 'visible', pending: false, error: '' });
  };
  const leave = id => {
    const current = store.getSnapshot();
    if (!current || current.id !== id || current.phase !== 'visible') return;
    store.set({ ...current, phase: 'leaving' });
  };
  const clear = id => {
    const current = store.getSnapshot();
    if (current && current.id === id) store.set(null);
  };
  const close = id => {
    const current = store.getSnapshot();
    if (!current || current.id !== id) return;
    store.set({ ...current, phase: 'leaving', pending: false });
  };
  const undo = async id => {
    const current = store.getSnapshot();
    if (!current || current.id !== id || current.pending || current.phase !== 'visible') return;
    store.set({ ...current, pending: true, error: '' });
    try {
      const result = await unarchive(current.sessionId);
      if (result?.ok === false) throw result.error || new Error('取消归档失败');
      const latest = store.getSnapshot();
      if (latest && latest.id === id) store.set({ ...latest, pending: false, phase: 'leaving' });
    } catch (error) {
      const latest = store.getSnapshot();
      if (latest && latest.id === id) store.set({ ...latest, pending: false, error: errorText(error) });
    }
  };
  // 停用插件时清空并推进序号，让在途的撤销/关闭完成回调失效。
  const dispose = () => { seq += 1; store.set(null); };
  return { store, show, leave, clear, close, undo, dispose };
}
function ArchiveNotice({ notice }) {
  const current = useSource(notice.store);
  const id = current?.id;
  const phase = current?.phase;
  const pending = current?.pending === true;
  const error = current?.error || '';
  useEffect(() => {
    if (id === undefined) return undefined;
    if (phase === 'leaving') {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
      const timer = setTimeout(() => notice.clear(id), reduced ? 0 : ARCHIVE_NOTICE_FADE_MS);
      return () => clearTimeout(timer);
    }
    if (pending || error) return undefined;
    const timer = setTimeout(() => notice.leave(id), ARCHIVE_NOTICE_HOLD_MS);
    return () => clearTimeout(timer);
  }, [id, phase, pending, error, notice]);
  if (!current) return null;
  return createPortal(h('div', { key: current.id, className: 'dsc-ui dsc-archive-notice', 'data-phase': current.phase, role: 'status', 'aria-live': 'polite' },
    h('div', { className: 'dsc-archive-notice-body' },
      h('span', { className: 'dsc-archive-notice-text' }, '已归档'),
      error && h('span', { className: 'dsc-archive-notice-error' }, '撤销失败：' + error)),
    h('button', { type: 'button', className: 'dsc-archive-notice-undo', disabled: pending, onClick: () => notice.undo(id) }, '撤销'),
    h('button', { type: 'button', className: 'dsc-archive-notice-close', 'aria-label': '关闭归档提示', onClick: () => notice.close(id) }, h(Icon, { name: 'close', size: 14 }))), document.body);
}
function errorText(error) { return error?.message || String(error); }
function ErrorLine({ text }) { return text ? h('div', { className: 'dsc-error', role: 'alert' }, text) : null; }
// 用 aria-disabled 代替原生 disabled：避免全局 `.dsc-ui button:disabled { opacity: .45 }` 在提交瞬间造成变暗闪烁。
function Option({ title, detail, icon, selected, onClick, disabled, warning }) {
  return h('button', { type: 'button', className: 'dsc-option', role: 'menuitemradio', 'aria-checked': !!selected, 'aria-disabled': disabled ? 'true' : undefined, 'data-warning': !!warning, onClick: e => { if (disabled) return; onClick?.(e); } },
    icon && h(Icon, { name: icon }),
    h('span', { className: 'dsc-option-copy' }, h('span', null, title), detail && h('small', null, detail)),
    selected && h(Icon, { name: 'check' }));
}

// 齿轮菜单会把公开 sidebar.footer.action 的原生节点作为“菜单上方分组”一并显示；
// 这些节点不在 Popover 的 DOM 子树内，因此把“点内/键盘范围”判定独立出来，供菜单与测试复用。
function isInsideMenuTarget(target, primary, extras) {
  if (!target) return false;
  const inside = node => Boolean(node && typeof node.contains === 'function' && node.contains(target));
  return inside(primary) || (extras || []).some(inside);
}
// 视觉顺序：外部分组在菜单上方，先参与方向键循环；菜单自身按钮随后。
function menuFocusItems(primary, extras) {
  const items = [];
  for (const root of [...(extras || []), primary]) {
    if (!root || typeof root.querySelectorAll !== 'function') continue;
    for (const node of root.querySelectorAll('button:not(:disabled)')) items.push(node);
  }
  return items;
}

// 所有浮层位于自己的 portal 根；只读取 anchor 与自己的 DOM，不查宿主私有选择器。
// placement: 'top' 为默认（锚点上方优先），'right' 用于行尾菜单（锚点右下方展开）。
function Popover({ anchor, point, onClose, label, width = 300, children, className = '', autoFocus = true, role = 'menu', placement = 'top', extraRoots = [], panelRef }) {
  const localRef = useRef(null);
  const ref = panelRef || localRef;
  const extras = useRef(extraRoots);
  extras.current = extraRoots;
  const [position, setPosition] = useState({ visibility: 'hidden' });
  useLayoutEffect(() => {
    const place = () => {
      if (!anchor.current || !ref.current) return;
      const box = anchor.current.getBoundingClientRect();
      const w = Math.min(width, window.innerWidth - 24);
      const size = ref.current.getBoundingClientRect();
      if (point) {
        setPosition({ position: 'fixed', left: Math.max(12, Math.min(point.x, window.innerWidth - w - 12)), top: Math.max(12, Math.min(point.y, window.innerHeight - size.height - 12)), width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      if (placement === 'bottom') {
        const left = Math.max(12, Math.min(window.innerWidth - w - 12, box.right - w));
        const top = Math.max(12, Math.min(box.bottom + 9, window.innerHeight - size.height - 12));
        setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      if (placement === 'right') {
        const spaceRight = window.innerWidth - box.right - 12;
        const left = spaceRight >= w ? box.right + 6 : Math.max(12, box.left - w - 6);
        const top = Math.max(12, Math.min(window.innerHeight - size.height - 12, box.top - 4));
        setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
        return;
      }
      const left = Math.max(12, Math.min(window.innerWidth - w - 12, box.right - w));
      const top = box.top - size.height - 9 >= 12 ? box.top - size.height - 9 : Math.max(12, Math.min(box.bottom + 9, window.innerHeight - size.height - 12));
      setPosition({ position: 'fixed', left, top, width: w, maxHeight: Math.max(100, window.innerHeight - 24) });
    };
    place();
    const observer = new ResizeObserver(place);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => { observer.disconnect(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [anchor, point, width, placement]);
  useEffect(() => {
    if (autoFocus) (ref.current?.querySelector('input, [aria-checked="true"], button, [role="slider"]'))?.focus({ preventScroll: true });
    const pointer = e => { if (!isInsideMenuTarget(e.target, ref.current, extras.current) && !anchor.current?.contains(e.target)) onClose(); };
    const key = e => {
      if (e.key === 'Escape') {
        const active = typeof document !== 'undefined' ? document.activeElement : null;
        // 焦点已进入第三方自己的弹窗时，不抢它的 Escape；菜单/分组内或焦点丢失时才关闭。
        const within = isInsideMenuTarget(active, ref.current, extras.current) || isInsideMenuTarget(e.target, ref.current, extras.current) || anchor.current?.contains(active) || active === null || (typeof document !== 'undefined' && active === document.body);
        if (!within) return;
        e.preventDefault(); e.stopPropagation(); onClose(); anchor.current?.focus(); return;
      }
      if (e.key === 'Tab') {
        const active = typeof document !== 'undefined' ? document.activeElement : null;
        const inExtras = (extras.current || []).some(root => root && typeof root.contains === 'function' && root.contains(active));
        if (!inExtras) return;
        const items = menuFocusItems(ref.current, []);
        if (!items.length) return;
        e.preventDefault();
        items[e.shiftKey ? items.length - 1 : 0].focus();
        return;
      }
      if (!isInsideMenuTarget(e.target, ref.current, extras.current) || e.target.matches('input, [role="slider"]') || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const items = menuFocusItems(ref.current, extras.current);
      if (!items.length) return;
      e.preventDefault();
      const index = items.indexOf(document.activeElement);
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    };
    document.addEventListener('pointerdown', pointer, true);
    document.addEventListener('keydown', key, true);
    return () => { document.removeEventListener('pointerdown', pointer, true); document.removeEventListener('keydown', key, true); };
  }, [anchor, onClose, autoFocus]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-menu ' + className, style: position, role, 'aria-label': label }, children), document.body);
}

// 行悬停详情卡：按原型实测放置（右侧、与行顶对齐），不复用菜单的向上翻转定位。
// 项目卡 321×130：名称+图钉 / 聊天数 / 分隔线 / 路径 / 分隔线 / 编辑项目；会话卡 470 宽与行顶差 6px。
function HoverCard({ anchor, kind, onClose, onEnter, onLeave, children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ visibility: 'hidden' });
  useLayoutEffect(() => {
    const place = () => {
      if (!anchor.current || !ref.current) return;
      const box = anchor.current.getBoundingClientRect();
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      const gap = kind === 'project' ? 5 : 12;
      let left = box.right + gap;
      if (left + width > window.innerWidth - 8) left = Math.max(8, Math.min(box.left - gap - width, window.innerWidth - width - 8));
      let top = kind === 'project' ? box.top : box.top - 6;
      if (top + height > window.innerHeight - 8) top = Math.max(8, window.innerHeight - height - 8);
      if (top < 8) top = 8;
      setPosition({ position: 'fixed', left: Math.round(left), top: Math.round(top), visibility: 'visible' });
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [anchor, kind]);
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    window.addEventListener('resize', onClose);
    window.addEventListener('scroll', onClose, true);
    document.addEventListener('keydown', onKey, true);
    return () => { window.removeEventListener('resize', onClose); window.removeEventListener('scroll', onClose, true); document.removeEventListener('keydown', onKey, true); };
  }, [onClose]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-row-pop dsc-row-pop--' + kind, style: position, role: 'dialog', 'aria-label': kind === 'project' ? '项目详情' : '对话详情', onPointerEnter: onEnter, onPointerLeave: onLeave }, children), document.body);
}
// 图钉为真实状态指示：DSH 只有会话置顶、没有工作区置顶，因此工作区始终显示空心「未置顶」。
function PinMark({ filled }) {
  return h('svg', { viewBox: '0 0 16 16', width: 14, height: 14, fill: filled ? 'currentColor' : 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true },
    h('g', { transform: 'rotate(45 8 8)' }, h('path', { d: 'M6 2.5h4v3L12 8.5H4L6 5.5ZM8 8.5V14' })));
}
function ProjectHoverCard({ data, anchor, onReveal, onEdit, ...root }) {
  return h(HoverCard, { anchor, kind: 'project', ...root },
    h('div', { className: 'dsc-row-pop__head' },
      h('span', { className: 'dsc-row-pop__name' }, h(Icon, { name: 'folder', size: 15 }), h('span', null, data.title)),
      h('span', { className: 'dsc-row-pop__pin', role: 'img', title: data.pinned ? '已置顶' : '未置顶（DSH 暂不支持工作区置顶）', 'aria-label': data.pinned ? '已置顶' : '未置顶' }, h(PinMark, { filled: data.pinned }))),
    h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'chat', size: 15 }), h('span', null, `${data.count} 次聊天`)),
    data.path && h('div', { className: 'dsc-row-pop__sep' }),
    data.path && h('button', { type: 'button', className: 'dsc-row-pop__line dsc-row-pop__line--path', title: '在文件资源管理器中显示', onClick: onReveal },
      h(Icon, { name: 'folder', size: 15 }), h('span', { className: 'dsc-row-pop__path' }, data.path), h(Icon, { name: 'arrowUpRight', size: 14, className: 'dsc-row-pop__arrow' })),
    h('div', { className: 'dsc-row-pop__sep' }),
    h('button', { type: 'button', className: 'dsc-row-pop__line dsc-row-pop__line--action', onClick: onEdit }, h(Icon, { name: 'settings', size: 15 }), h('span', null, '编辑项目')));
}
function ThreadHoverCard({ data, anchor, ...root }) {
  return h(HoverCard, { anchor, kind: 'thread', ...root },
    h('div', { className: 'dsc-row-pop__head' },
      h('p', { className: 'dsc-row-pop__excerpt' }, data.title),
      h('span', { className: 'dsc-row-pop__meta' }, h(Icon, { name: 'monitor', size: 14 }), data.status)),
    data.workspaceTitle && h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'folder', size: 15 }), h('span', null, data.workspaceTitle)),
    data.path && h('div', { className: 'dsc-row-pop__line' }, h(Icon, { name: 'folder', size: 15 }), h('span', { className: 'dsc-row-pop__path' }, data.path)));
}

// 「编辑项目」对话框：名称输入接真实工作区重命名，底部「移除本地项目」接真实工作区删除；
// 源文件夹只读展示当前路径，不提供添加/更换文件夹（DSH 无该能力）。
function EditWorkspaceDialog({ workspace, onClose, onRename, onDelete }) {
  const [name, setName] = useState(workspace.title || '');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const input = useRef(null);
  useEffect(() => { input.current?.focus(); input.current?.select(); }, []);
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  const save = async () => {
    const title = name.trim();
    if (!title) { setError('项目名称不能为空'); return; }
    if (busy) return;
    if (title === (workspace.title || '')) { onClose(); return; }
    setBusy('save'); setError('');
    try { await onRename(title); onClose(); } catch (e) { setError(errorText(e)); setBusy(''); }
  };
  const remove = async () => {
    if (busy) return;
    if (!window.confirm(`移除本地项目「${workspace.title || ''}」？项目中的对话会保留在“最近”中。`)) return;
    setBusy('remove'); setError('');
    try { await onDelete(); onClose(); } catch (e) { setError(errorText(e)); setBusy(''); }
  };
  return createPortal(h('div', { className: 'dsc-ui dsc-modal', role: 'presentation' },
    h('div', { className: 'dsc-modal__mask', 'aria-hidden': true, onClick: onClose }),
    h('div', { className: 'dsc-modal__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dsc-edit-workspace-title' },
      h('div', { className: 'dsc-modal__head' },
        h('h2', { id: 'dsc-edit-workspace-title' }, '编辑项目'),
        h('button', { type: 'button', className: 'dsc-modal__close', title: '关闭', 'aria-label': '关闭', onClick: onClose }, h(Icon, { name: 'close', size: 16 }))),
      h('div', { className: 'dsc-modal__field' },
        h(Icon, { name: 'folder', size: 16 }),
        h('input', { ref: input, className: 'dsc-modal__input', value: name, onChange: e => setName(e.target.value), onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); save(); } }, 'aria-label': '项目名称', placeholder: '项目名称' })),
      h('div', { className: 'dsc-modal__label' }, '源文件夹'),
      h('div', { className: 'dsc-modal__source' }, h(Icon, { name: 'folder', size: 16 }), h('span', { className: 'dsc-modal__path', title: workspace.path || '' }, workspace.path || '未记录路径')),
      h(ErrorLine, { text: error }),
      h('div', { className: 'dsc-modal__actions' },
        h('button', { type: 'button', className: 'dsc-modal__remove', onClick: remove, disabled: !!busy }, busy === 'remove' ? '正在移除…' : '移除本地项目'),
        h('div', { className: 'dsc-modal__spacer' }),
        h('button', { type: 'button', className: 'dsc-modal__cancel', onClick: onClose, disabled: !!busy }, '取消'),
        h('button', { type: 'button', className: 'dsc-modal__save', onClick: save, disabled: !!busy }, busy === 'save' ? '保存中…' : '保存')))), document.body);
}

function RenameThreadDialog({ thread, onClose, onRename }) {
  const [name, setName] = useState(thread.title || '未命名对话');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const panel = useRef(null);
  const input = useRef(null);
  const submitting = useRef(false);
  useEffect(() => {
    const previous = document.activeElement;
    input.current?.focus(); input.current?.select();
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  const close = () => { if (!submitting.current) onClose(); };
  const save = async event => {
    event.preventDefault();
    if (submitting.current) return;
    const title = name.trim();
    if (!title) { setError('对话名称不能为空'); input.current?.focus(); return; }
    if (title === thread.title) { onClose(); return; }
    submitting.current = true; setBusy(true); setError('');
    try { await onRename(title); onClose(); }
    catch (e) { submitting.current = false; setBusy(false); setError(errorText(e)); }
  };
  const keyDown = event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
    if (event.key !== 'Tab') return;
    const items = [...panel.current.querySelectorAll('input:not(:disabled), button:not(:disabled)')];
    const first = items[0], last = items[items.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return createPortal(h('div', { className: 'dsc-ui dsc-modal', onKeyDown: keyDown },
    h('div', { className: 'dsc-modal__mask', 'aria-hidden': true, onClick: close }),
    h('form', { ref: panel, className: 'dsc-modal__panel', role: 'dialog', 'aria-modal': true, 'aria-label': '重命名对话', 'aria-busy': busy, onSubmit: save },
      h('div', { className: 'dsc-modal__head' }, h('h2', null, '重命名对话'),
        h('button', { type: 'button', className: 'dsc-modal__close', 'aria-label': '关闭重命名', disabled: busy, onClick: close }, h(Icon, { name: 'close' }))),
      h('div', { className: 'dsc-modal__field' }, h(Icon, { name: 'pencil' }),
        h('input', { ref: input, className: 'dsc-modal__input', 'aria-label': '对话名称', value: name, disabled: busy, onChange: e => setName(e.target.value), onKeyDown: e => { if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault(); } })),
      h(ErrorLine, { text: error }),
      h('div', { className: 'dsc-modal__actions' }, h('div', { className: 'dsc-modal__spacer' }),
        h('button', { type: 'button', className: 'dsc-modal__cancel', disabled: busy, onClick: close }, '取消'),
        h('button', { type: 'submit', className: 'dsc-modal__save', disabled: busy }, busy ? '保存中…' : '保存')))), document.body);
}

function relativeTime(value) {
  const timestamp = typeof value === 'number' ? value : Date.parse(value);
  if (!Number.isFinite(timestamp)) return '';
  const minutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
  return minutes < 1 ? '刚刚' : minutes < 60 ? minutes + '分钟前' : minutes < 1440 ? Math.floor(minutes / 60) + '小时前' : Math.floor(minutes / 1440) + '天前';
}

// 测量标题当前可用宽度；侧栏拖宽、重命名都会重新计算。
function ThreadTitle({ title }) {
  const viewport = useRef(null);
  const text = useRef(null);
  useLayoutEffect(() => {
    const measure = () => {
      const overflow = Math.max(0, text.current.scrollWidth - viewport.current.clientWidth);
      viewport.current.dataset.overflow = String(overflow > 1);
      viewport.current.style.setProperty('--dsc-title-shift', -overflow + 'px');
      // 按距离计算时长，使轻微溢出与长标题都以录像约 30 CSS px/s 的速度移动。
      viewport.current.style.setProperty('--dsc-title-duration', overflow / 30 + 's');
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(text.current);
    return () => observer.disconnect();
  }, [title]);
  return h('span', { ref: viewport, className: 'dsc-thread-title' }, h('span', { ref: text, className: 'dsc-thread-title-text' }, title));
}

// 提示 portal 到 body，避免被滚动区或正在开合的项目裁掉；延迟和进退由 CSS 控制。
function RowTooltip({ anchor, open, label, onClose }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({});
  useLayoutEffect(() => {
    if (!open) return;
    const box = anchor.current.getBoundingClientRect();
    const tip = ref.current.getBoundingClientRect();
    setPosition({ left: Math.max(8, Math.min(box.left + (box.width - tip.width) / 2, window.innerWidth - tip.width - 8)), top: box.top - tip.height - 7 >= 8 ? box.top - tip.height - 7 : box.bottom + 7 });
    window.addEventListener('resize', onClose);
    window.addEventListener('scroll', onClose, true);
    return () => { window.removeEventListener('resize', onClose); window.removeEventListener('scroll', onClose, true); };
  }, [anchor, open, label, onClose]);
  return createPortal(h('div', { ref, className: 'dsc-ui dsc-row-tooltip', role: 'tooltip', 'aria-hidden': !open, 'data-open': open, style: position }, label), document.body);
}

function ThreadAction({ label, active, onIntent, onClick, className = '', pressed, children }) {
  const anchor = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const close = useCallback(() => { setHovered(false); setFocused(false); }, []);
  useEffect(() => { if (!active) close(); }, [active, close]);
  return h(React.Fragment, null,
    h('button', { ref: anchor, type: 'button', className: 'dsc-thread-action ' + className, 'aria-label': label, 'aria-pressed': pressed,
      onPointerEnter: () => { onIntent(); setHovered(true); }, onPointerLeave: () => setHovered(false),
      onFocus: e => { if (e.currentTarget.matches(':focus-visible')) { onIntent(); setFocused(true); } }, onBlur: () => setFocused(false),
      onClick: () => { close(); onIntent(); onClick(); } }, children),
    h(RowTooltip, { anchor, open: active && (hovered || focused), label, onClose: close }));
}

function ProjectFold({ open, children, className = '' }) {
  return h('div', { className: 'dsc-project-fold ' + className, 'data-open': open, 'aria-hidden': !open, ref: node => { if (node) node.inert = !open; } },
    h('div', { className: 'dsc-project-clip' }, children));
}

// 宿主完成提醒仅检查 mainView；此处补上窗口焦点和真实主区，状态只属于当前插件页面。
function createSessionCompletionTracker(ctx) {
  const store = createSnapshotStore(new Set());
  let previousRunning = new Map();
  let previousHostUnread = new Set();
  let windowFocused = false;
  const reconcile = () => {
    const catalog = ctx.sessions.list.getSnapshot();
    const status = ctx.uiSession.sessionStatus.getSnapshot();
    const panel = ctx.layout.panelInfo.getSnapshot();
    const viewingConversation = windowFocused && document.visibilityState === 'visible' && panel.activePanelId === null;
    const viewedId = viewingConversation ? catalog.ids.find(id => (catalog.byId[id]?.retainedBy?.mainView ?? 0) > 0) : undefined;
    const next = new Set(store.getSnapshot());
    const running = new Map();
    const hostUnread = new Set();
    for (const id of new Set([...catalog.ids, ...status.keys()])) {
      const state = status.get(id);
      const isRunning = state?.running ?? catalog.byId[id]?.running;
      running.set(id, isRunning);
      if (state?.completionUnread) hostUnread.add(id);
      const justCompleted = previousRunning.get(id) === true && isRunning === false;
      const hostCompleted = state?.completionUnread && !previousHostUnread.has(id);
      if (isRunning || id === viewedId) next.delete(id);
      else if (justCompleted || hostCompleted) next.add(id);
    }
    if (catalog.phase === 'ready') for (const id of next) if (!catalog.byId[id]) next.delete(id);
    previousRunning = running;
    previousHostUnread = hostUnread;
    const before = store.getSnapshot();
    if (next.size !== before.size || [...next].some(id => !before.has(id))) store.set(next);
  };
  const start = () => {
    windowFocused = document.hasFocus();
    const focus = () => { windowFocused = true; reconcile(); };
    const blur = () => { windowFocused = false; reconcile(); };
    const visibility = () => { windowFocused = document.hasFocus(); reconcile(); };
    const disposers = [ctx.sessions.list, ctx.uiSession.sessionStatus, ctx.layout.panelInfo].map(source => source.subscribe(reconcile));
    window.addEventListener('focus', focus);
    window.addEventListener('blur', blur);
    document.addEventListener('visibilitychange', visibility);
    reconcile();
    return () => {
      disposers.forEach(dispose => dispose());
      window.removeEventListener('focus', focus);
      window.removeEventListener('blur', blur);
      document.removeEventListener('visibilitychange', visibility);
    };
  };
  return { store, start };
}

// 项目内默认只显示最近 6 条；活动行位于后方时按需放宽，置顶、最近与搜索结果不受影响。
const PROJECT_SESSION_LIMIT = 6;

function makeWorkspaceTree(ctx, completionStore, archiveNotice) {
  return function WorkspaceTree({ query = '', tools = true, active = true, onNavigate }) {
    const catalog = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    const status = useSource(ctx.uiSession.sessionStatus);
    const completions = useSource(completionStore);
    const panel = useSource(ctx.layout.panelInfo);
    const [expanded, setExpanded] = useState({});
    const [moreExpanded, setMoreExpanded] = useState({});
    const [projectsOpen, setProjectsOpen] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [message, setMessage] = useState('');
    const [adding, setAdding] = useState(false);
    const [menu, setMenu] = useState(null);
    const [projectMenu, setProjectMenu] = useState(null);
    const [hover, setHover] = useState(null);
    const [editing, setEditing] = useState(null);
    const [renaming, setRenaming] = useState(null);
    const menuAnchor = useRef(null);
    const projectAnchor = useRef(null);
    const hoverAnchor = useRef(null);
    const hoverTimer = useRef(null);
    const alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; clearTimeout(hoverTimer.current); }; }, []);
    useEffect(() => {
      if (active) return;
      clearTimeout(hoverTimer.current);
      setHover(null); setMenu(null); setProjectMenu(null); setEditing(null); setRenaming(null);
    }, [active]);
    const run = async action => { setMessage(''); try { await action(); } catch (e) { if (alive.current) setMessage(errorText(e)); } };
    const archived = useMemo(() => new Set(workspaces.archivedSessionIds), [workspaces.archivedSessionIds]);
    const pinned = useMemo(() => new Set(workspaces.pinnedSessionIds), [workspaces.pinnedSessionIds]);
    // 一次建立归属索引；保留多项目引用时的旧呈现，以及搜索/详情使用首个项目的语义。
    const memberships = useMemo(() => {
      const index = new Map();
      for (const workspace of workspaces.items) for (const id of new Set(workspace.sessionIds)) {
        if (!index.has(id)) index.set(id, []);
        index.get(id).push(workspace);
      }
      return index;
    }, [workspaces.items]);
    const workspaceOf = id => memberships.get(id)?.[0];
    const ordered = useMemo(() => catalog.ids.map(id => catalog.byId[id])
      .filter(s => s && s.origin !== 'subagent' && !s.blank)
      .map(s => ({ ...s, sessionId: s.id, title: s.title || s.displayTitle }))
      .sort((a, b) => (Number(b.updatedAt) || Date.parse(b.updatedAt) || 0) - (Number(a.updatedAt) || Date.parse(a.updatedAt) || 0)), [catalog.ids, catalog.byId]);
    const currentId = useMemo(() => catalog.ids.find(id => (catalog.byId[id]?.retainedBy?.mainView ?? 0) > 0), [catalog.ids, catalog.byId]);
    const searchText = query.trim().toLowerCase();
    const visible = useMemo(() => ordered.filter(s => (showArchived || !archived.has(s.sessionId)) &&
      (!searchText || `${s.title || ''} ${memberships.get(s.sessionId)?.[0]?.title || ''}`.toLowerCase().includes(searchText))), [ordered, archived, showArchived, searchText, memberships]);
    const groups = useMemo(() => {
      const projects = new Map(), pins = [], recent = [];
      for (const session of visible) {
        if (pinned.has(session.sessionId)) { pins.push(session); continue; }
        const owners = memberships.get(session.sessionId);
        if (!owners) { recent.push(session); continue; }
        for (const workspace of owners) {
          if (!projects.has(workspace.workspaceId)) projects.set(workspace.workspaceId, []);
          projects.get(workspace.workspaceId).push(session);
        }
      }
      return { projects, pins, recent };
    }, [visible, pinned, memberships]);
    // 归属只读宿主公开目录：首次发现当前会话所属项目时固化为展开，避免切换会话后按 currentId 实时派生把它误折叠。
    // 已有记录（含用户显式收起）一律保留；空白会话或目录异步到达时，等 currentId / memberships 更新再补记。
    useLayoutEffect(() => {
      if (currentId === undefined) return;
      const owners = memberships.get(currentId);
      if (!owners?.length) return;
      setExpanded(previous => {
        if (owners.every(workspace => previous[workspace.workspaceId] !== undefined)) return previous;
        const next = { ...previous };
        for (const workspace of owners) if (next[workspace.workspaceId] === undefined) next[workspace.workspaceId] = true;
        return next;
      });
    }, [currentId, memberships]);
    // 活动判据沿用现有状态源：当前会话、等待处理、父会话运行（live 优先，目录行只兜底）、子代理仍在运行、未读完成。
    const sessionActive = session => {
      if (session.sessionId === currentId) return true;
      const state = status.get(session.sessionId);
      if (state?.pendingInteraction) return true;
      // 父会话自身运行：live 状态优先，避免目录行旧的 running=true 压过 live false。
      if ((state?.running ?? session.running) === true) return true;
      // 子代理运行不并入父 running；沿宿主公开快照的 subagentCatalog 逐个子会话核对，任一仍在运行即视为活动。
      const subagents = catalog.projectionsBySession?.[session.sessionId]?.values?.subagentCatalog;
      if (Array.isArray(subagents) && subagents.some(child => (status.get(child.id)?.running ?? catalog.byId[child.id]?.running) === true)) return true;
      return completions.has(session.sessionId);
    };
    // 每个项目独立截断：默认前 6 条，后方有活动行时放宽到包含该行；手动展开后显示全部。
    const projectSessions = (workspaceId, children) => {
      if (moreExpanded[workspaceId] === true) return children;
      let count = Math.min(PROJECT_SESSION_LIMIT, children.length);
      for (let index = PROJECT_SESSION_LIMIT; index < children.length; index += 1) if (sessionActive(children[index])) count = index + 1;
      return children.slice(0, count);
    };
    const cancelHover = () => clearTimeout(hoverTimer.current);
    const hideHover = () => { clearTimeout(hoverTimer.current); setHover(null); };
    const closeHover = () => { cancelHover(); hoverTimer.current = setTimeout(() => setHover(null), 140); };
    const enterHover = (target, data) => {
      cancelHover();
      hoverAnchor.current = target;
      if (hover) setHover(data);
      else hoverTimer.current = setTimeout(() => setHover(data), 300);
    };
    const revealWorkspace = hoverData => {
      hideHover();
      run(async () => {
        const sessionRemote = ctx.remote?.session;
        if (typeof sessionRemote?.openWorkspacePath !== 'function') throw new Error('当前宿主不支持在文件管理器中显示文件夹');
        const result = await sessionRemote.openWorkspacePath({ path: hoverData.path, action: 'reveal' });
        if (result?.ok === false) throw result.error;
      });
    };
    const editWorkspace = workspace => {
      hideHover();
      setEditing(workspace);
    };
    const rename = async (row, title) => {
      const result = await ctx.sessions.using(row.sessionId, { source: 'workspaceOperation' }, reference => reference.binding.session.rename(title));
      if (result?.ok === false) throw result.error;
    };
    const togglePin = s => run(() => pinned.has(s.sessionId) ? ctx.uiWorkspace.unpinSession(s.sessionId) : ctx.uiWorkspace.pinSession(s.sessionId));
    // 归档成功才提示；取消归档仍走原动作且不提示。失败沿用 run/ErrorLine，不把失败当成功。
    const toggleArchive = s => {
      hideHover();
      if (archived.has(s.sessionId)) return run(() => ctx.uiWorkspace.unarchiveSession(s.sessionId));
      return run(async () => {
        const result = await ctx.uiWorkspace.archiveSession(s.sessionId);
        if (result?.ok === false) throw result.error || new Error('归档失败');
        archiveNotice.show(s.sessionId);
      });
    };
    // 继续使用原来的菜单与动作，只把入口改为整行右键（含 Shift+F10 / 菜单键）。
    const openThreadMenu = (event, s) => {
      event.preventDefault(); event.stopPropagation();
      menuAnchor.current = event.currentTarget.querySelector('.dsc-thread-main');
      const box = menuAnchor.current.getBoundingClientRect();
      const point = event.type === 'contextmenu' && (event.clientX || event.clientY) ? { x: event.clientX, y: event.clientY } : { x: box.left + 16, y: box.bottom };
      hideHover(); setProjectMenu(null); setMenu({ ...s, point });
    };
    const row = (s, rowActive = active) => {
      const state = status.get(s.sessionId);
      const actionsActive = rowActive && !menu && !projectMenu && !editing && !renaming;
      const pending = state?.pendingInteraction;
      const running = state?.running && !pending;
      const completed = completions.has(s.sessionId) && !pending && !state?.running;
      const activity = pending ? '等待处理' : state?.running ? '运行中' : completed ? '已完成' : relativeTime(s.updatedAt);
      return h('div', { key: s.sessionId, className: 'dsc-thread' + (s.sessionId === currentId && panel.activePanelId === null ? ' is-active' : '') + (archived.has(s.sessionId) ? ' is-archived' : '') + (pinned.has(s.sessionId) ? ' is-pinned' : ''),
        onContextMenu: e => openThreadMenu(e, s), onKeyDown: e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) openThreadMenu(e, s); },
        onPointerEnter: e => enterHover(e.currentTarget, { kind: 'thread', id: s.sessionId, title: s.title || '未命名对话', status: activity, workspaceTitle: workspaceOf(s.sessionId)?.title, path: workspaceOf(s.sessionId)?.path }), onPointerLeave: closeHover },
        h('button', { type: 'button', className: 'dsc-thread-main', 'aria-haspopup': 'menu', onClick: () => { if (archived.has(s.sessionId)) run(() => ctx.uiWorkspace.unarchiveSession(s.sessionId)); else { ctx.uiWorkspace.openSession(s.sessionId); onNavigate?.(); } } },
          h('span', { className: 'dsc-state', 'data-state': pending ? 'pending' : 'idle' }, pending && h(Icon, { name: 'chat', size: 14 })),
          h(ThreadTitle, { title: s.title || '未命名对话' }),
          running ? h('span', { className: 'dsc-thread-running', role: 'img', 'aria-label': '对话进行中', title: '对话进行中' },
            h('svg', { className: 'dsc-running-spinner', ref: syncSessionSpinner, onAnimationStart: event => syncSessionSpinner(event.currentTarget), viewBox: '0 0 16 16', width: 12, height: 12, fill: 'none', 'aria-hidden': true },
              h('circle', { cx: 8, cy: 8, r: 6.5, stroke: 'currentColor', strokeWidth: 1.6, opacity: .22 }),
              h('circle', { cx: 8, cy: 8, r: 6.5, stroke: 'currentColor', strokeWidth: 1.6, strokeDasharray: '30.6 10.2', strokeLinecap: 'round' })))
            : completed ? h('span', { className: 'dsc-thread-completion', role: 'img', 'aria-label': '对话已完成，未读', title: '对话已完成，未读' }) : h('small', { className: 'dsc-thread-time' }, activity)),
        h('div', { className: 'dsc-thread-actions' },
          h(ThreadAction, { label: pinned.has(s.sessionId) ? '取消置顶聊天' : '置顶聊天', className: 'dsc-pin-action', pressed: pinned.has(s.sessionId), active: actionsActive, onIntent: hideHover, onClick: () => togglePin(s) }, h(PinMark, { filled: pinned.has(s.sessionId) })),
          h(ThreadAction, { label: archived.has(s.sessionId) ? '取消归档聊天' : '归档聊天', active: actionsActive, onIntent: hideHover, onClick: () => toggleArchive(s) }, h(Icon, { name: 'archive', size: 14 }))));
    };
    const addWorkspace = async () => {
      setAdding(true);
      await run(async () => {
        const picked = await ctx.uiWorkspace.pickDirectory();
        if (!picked) return;
        const path = typeof picked === 'string' ? picked : picked.path;
        if (!path) return;
        const created = await ctx.workspaces.create({ path });
        await ctx.uiWorkspace.openWorkspace(created.workspaceId);
        onNavigate?.();
      });
      if (alive.current) setAdding(false);
    };
    const projectHeading = h('div', { className: 'dsc-tree-tools', 'data-compact': !tools },
      h('button', { type: 'button', className: 'dsc-projects-toggle', 'aria-label': '项目', 'aria-expanded': projectsOpen, onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setProjectsOpen(!projectsOpen); } }, h('span', { className: 'dsc-tree-tools-label' }, '项目'), h(Icon, { name: 'chevron', size: 12 })),
      h('button', { type: 'button', className: 'dsc-icon-button', title: '添加工作区', onClick: addWorkspace, disabled: adding }, h(Icon, { name: 'plus' })));
    return h('div', { className: 'dsc-ui dsc-workspaces' },
      query && projectHeading,
      h(ErrorLine, { text: message || (catalog.error && errorText(catalog.error)) || (workspaces.error && errorText(workspaces.error)) }),
      h('div', { className: 'dsc-tree-scroll' },
        query ? h(React.Fragment, null, h('div', { className: 'dsc-section-title' }, '搜索结果'), visible.map(s => row(s))) : h(React.Fragment, null,
          pinned.size > 0 && h('section', null, h('div', { className: 'dsc-section-title' }, '置顶'), groups.pins.map(s => row(s))),
          projectHeading,
          h(ProjectFold, { open: projectsOpen, className: 'dsc-project-list-fold' }, h('div', { className: 'dsc-project-list' }, workspaces.items.map(w => {
            const children = groups.projects.get(w.workspaceId) || [];
            // 初帧保留当前会话派生作为过渡；useLayoutEffect 会在绘制前把尚无记录的所属项目固化为 true。
            const open = expanded[w.workspaceId] ?? w.sessionIds.includes(currentId);
            const shown = projectSessions(w.workspaceId, children);
            const hidden = children.length - shown.length;
            const more = moreExpanded[w.workspaceId] === true;
            const toggleMore = () => { hideHover(); setMenu(null); setProjectMenu(null); setMoreExpanded(previous => ({ ...previous, [w.workspaceId]: !(previous[w.workspaceId] === true) })); };
            return h('section', { key: w.workspaceId }, h('div', { className: 'dsc-project', onPointerEnter: e => enterHover(e.currentTarget, { kind: 'project', id: w.workspaceId, workspace: w, title: w.title || '未命名项目', count: children.length, path: w.path, pinned: w.pinned === true }), onPointerLeave: closeHover },
              h('button', { type: 'button', className: 'dsc-project-main', onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setExpanded(previous => ({ ...previous, [w.workspaceId]: !(previous[w.workspaceId] ?? w.sessionIds.includes(currentId)) })); }, 'aria-expanded': open }, h(Icon, { name: open ? 'folderOpen' : 'folder' }), h('span', null, w.title || '未命名项目')),
              h('button', { type: 'button', className: 'dsc-row-action', title: '项目菜单', 'aria-label': '项目菜单', 'aria-haspopup': 'menu', 'aria-expanded': projectMenu?.workspaceId === w.workspaceId, onClick: e => { projectAnchor.current = e.currentTarget; setHover(null); setProjectMenu(projectMenu?.workspaceId === w.workspaceId ? null : w); } }, '⋯'),
              h('button', { type: 'button', className: 'dsc-row-action', title: '在此项目新建对话', 'aria-label': '在此项目新建对话', onClick: () => { ctx.uiWorkspace.startSession(w.workspaceId); onNavigate?.(); } }, h(Icon, { name: 'pencil', size: 14 }))),
              h(ProjectFold, { open }, h('div', { className: 'dsc-project-children' }, children.length
                ? h(React.Fragment, null, shown.map(s => row(s, active && projectsOpen && open)),
                  children.length > PROJECT_SESSION_LIMIT && (more || hidden > 0) && h('button', { type: 'button', className: 'dsc-project-more', 'aria-expanded': more, onClick: toggleMore }, more ? '收起' : `显示更多（剩余 ${hidden}）`))
                : h('small', { className: 'dsc-empty' }, '暂无对话'))));
          }))),
          h('div', { className: 'dsc-section-title' }, '最近'), groups.recent.map(s => row(s))),
        !visible.length && catalog.phase === 'ready' && h('div', { className: 'dsc-empty' }, query ? '没有匹配的对话' : '选择项目，开始新对话'),
        catalog.phase !== 'ready' && h('div', { className: 'dsc-empty', role: 'status' }, '正在加载会话…')),
      h('label', { className: 'dsc-archive-toggle' }, h('input', { type: 'checkbox', checked: showArchived, onChange: e => setShowArchived(e.target.checked) }), '显示已归档对话'),
      menu && h(Popover, { anchor: menuAnchor, point: menu.point, onClose: () => setMenu(null), label: '对话菜单', width: 228 },
        h(Option, { title: '重命名', icon: 'pencil', onClick: () => { const target = menu; setMenu(null); hideHover(); setRenaming(target); } }),
        h(Option, { title: pinned.has(menu.sessionId) ? '取消置顶' : '置顶', icon: 'pin', onClick: () => { const target = menu; setMenu(null); togglePin(target); } }),
        h(Option, { title: '分叉对话', icon: 'chat', onClick: () => { const target = menu; setMenu(null); run(() => ctx.uiWorkspace.forkSession(target.sessionId)); } }),
        h(Option, { title: archived.has(menu.sessionId) ? '取消归档' : '归档', icon: 'archive', onClick: () => { const target = menu; setMenu(null); toggleArchive(target); } })),
      // Codex 风格项目菜单：仅提供编辑与移除项目两项，编辑复用现有编辑项目对话框；从行右侧下方展开。
      projectMenu && h(Popover, { anchor: projectAnchor, onClose: () => setProjectMenu(null), label: '项目菜单', width: 228, placement: 'right' },
        h(Option, { title: '编辑', icon: 'pencil', onClick: () => { const target = projectMenu; setProjectMenu(null); editWorkspace(target); } }),
        h(Option, { title: '移除项目', icon: 'close', onClick: () => { const target = projectMenu; setProjectMenu(null); if (!window.confirm(`移除项目“${target.title || '未命名项目'}”？`)) return; run(() => ctx.workspaces.delete(target.workspaceId)); } })),
      hover && !menu && !projectMenu && (hover.kind === 'project'
        ? h(ProjectHoverCard, { key: hover.id, data: hover, anchor: hoverAnchor, onClose: hideHover, onEnter: cancelHover, onLeave: closeHover, onReveal: () => revealWorkspace(hover), onEdit: () => editWorkspace(hover.workspace) })
        : h(ThreadHoverCard, { key: hover.id, data: hover, anchor: hoverAnchor, onClose: hideHover, onEnter: cancelHover, onLeave: closeHover })),
      editing && h(EditWorkspaceDialog, { key: editing.workspaceId, workspace: editing, onClose: () => setEditing(null), onRename: title => ctx.workspaces.rename(editing.workspaceId, title), onDelete: () => ctx.workspaces.delete(editing.workspaceId) }),
      renaming && h(RenameThreadDialog, { key: renaming.sessionId, thread: renaming, onClose: () => setRenaming(null), onRename: title => rename(renaming, title) }));
  };
}

// 权限目录只读 RPC + 事件通知；世代改变时清空旧 Host 的目录。
function permissionDirectory(ctx) {
  const store = createSnapshotStore({ value: null, error: null, revision: 0 });
  let epoch = 0;
  let disposed = false;
  let generation;
  const refresh = () => {
    const id = ctx.connection.generation.getSnapshot()?.id;
    const currentEpoch = ++epoch;
    store.set({ value: null, error: null, revision: currentEpoch });
    generation = id;
    if (id === undefined) return;
    ctx.remote.permissionPresets.catalog().then(result => {
      if (!result.ok) throw result.error;
      if (!disposed && epoch === currentEpoch && ctx.connection.generation.getSnapshot()?.id === id) store.set({ value: result.value, error: null, revision: currentEpoch });
    }).catch(error => {
      if (!disposed && epoch === currentEpoch) store.set({ value: null, error: errorText(error), revision: currentEpoch });
    });
  };
  const offCatalog = ctx.remote.$on('permission-presets/catalog-changed', refresh);
  const offGeneration = ctx.connection.generation.subscribe(() => {
    if (ctx.connection.generation.getSnapshot()?.id !== generation) refresh();
  });
  refresh();
  return { store, refresh, dispose() { disposed = true; ++epoch; offCatalog(); offGeneration(); } };
}

// 基础 bundle 只配置 sandbox/approval，不提供 description；内置项在宿主缺省时补回可核实的范围说明。
const PERMISSION_COPY = {
  'read-only': {
    title: '仅可查看',
    hostNames: ['Read Only'],
    description: '只读沙箱会阻止文件修改；需要扩大访问范围时会请求批准。'
  },
  'workspace-write': {
    title: '工作区内修改',
    hostNames: ['Workspace Write'],
    description: '可在工作区及允许的临时目录内修改文件；扩大访问范围前会请求批准。'
  },
  'danger-full-access': {
    title: '完全权限',
    hostNames: ['Full Access', 'Full access'],
    description: '可访问完整文件系统，且不再逐项请求批准。'
  },
  auto: {
    title: '自动审查 · EXP',
    hostNames: [],
    description: '无沙箱运行；每次原生工具调用和 PTC 内层调用前，由同一模型进行实验性审查。'
  },
  custom: {
    title: '自定义',
    hostNames: ['Custom'],
    description: '当前沙箱与审批设置不匹配任何已配置的权限预设。'
  }
};
function permissionCopy(option) {
  const fallback = PERMISSION_COPY[option.value];
  const hostName = typeof option.name === 'string' && option.name.trim() ? option.name : option.value;
  const useLocalizedTitle = fallback && (option.value === 'auto' || hostName === option.value || fallback.hostNames.includes(hostName));
  return {
    title: useLocalizedTitle ? fallback.title : hostName,
    description: option.description || fallback?.description || '具体范围由当前 DSH 配置提供。'
  };
}

// 只重绘提权确认；实际权限仍由当前会话的 /permission 命令保存。
const PERMISSION_RISK_COPY = {
  'danger-full-access': {
    title: '要开启完全访问权限吗？',
    description: 'DSH 将能够在未经你许可的情况下，在这台计算机上的任何位置运行命令、使用互联网，以及创建和编辑文件。这包括但不限于：',
    rows: [
      ['folder', '文件和文件夹', '读取、创建、修改、上传或删除此计算机上任意位置的文件'],
      ['terminal', '终端命令', '运行命令、安装软件和更改系统设置'],
      ['globe', '互联网和已启用的工具', '访问网站、发送数据并使用已启用的工具']
    ],
    warning: '这会带来敏感数据丢失或泄露、提示注入等风险。你可以将其关闭。',
    help: '完全访问不会逐项请求批准。请只在信任当前任务及所用工具时启用；完成后可在权限菜单中切回「工作区内修改」或「仅可查看」。'
  },
  auto: {
    title: '要启用自动审查吗？',
    description: 'DSH 将在无沙箱限制的环境中运行，由当前模型在工具执行前自动审查。启用后：',
    rows: [
      ['review', '模型自动审查', '每次工具调用前，由同一模型自动审查操作'],
      ['folder', '完整文件系统访问', '通过审查的操作可读取、修改或删除工作区以外的文件'],
      ['terminal', '命令与网络操作', '通过审查的操作可运行终端命令、访问网络和发送数据']
    ],
    warning: '自动审查是实验性能力，模型可能误判。它不提供沙箱隔离，仍有数据丢失或泄露的风险。',
    help: '自动审查由模型判断工具操作，不能保证识别所有风险，也不等同于你的逐项批准。需要限制文件访问时，请在权限菜单中选择「工作区内修改」或「仅可查看」。'
  }
};

function PermissionRiskIcon({ name, ...props }) {
  const common = { viewBox: '0 0 24 24', width: 24, height: 24, fill: 'none', 'aria-hidden': true, ...props };
  if (name === 'folder') return h('svg', common,
    h('path', { d: 'M2 7a3 3 0 0 1 3-3h4l2 2h8a3 3 0 0 1 3 3v2H2Z', fill: '#4c9eff' }),
    h('path', { d: 'M2 10h20v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3Z', fill: '#74c6ff' }));
  if (name === 'terminal') return h('svg', common,
    h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 4, fill: '#bdbdbd' }),
    h('path', { d: 'm7.5 9 3 3-3 3m6-1h3', stroke: '#fff', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
  if (name === 'globe') return h('svg', { ...common, stroke: '#4ed0f1', strokeWidth: 1.8 },
    h('circle', { cx: 12, cy: 12, r: 9 }), h('ellipse', { cx: 12, cy: 12, rx: 3.6, ry: 9 }), h('path', { d: 'M3 12h18' }));
  if (name === 'review') return h('svg', { ...common, stroke: '#aabaff', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'm12 2 8 3.5v6c0 4.5-3.7 7.8-8 10.5-4.3-2.7-8-6-8-10.5v-6Z' }), h('path', { d: 'm8.5 11.5 2.5 2.5 4.5-5' }));
  return h('svg', { ...common, stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' },
    h('path', { d: 'm10.4 3.7-8 14A1.8 1.8 0 0 0 4 20.4h16a1.8 1.8 0 0 0 1.6-2.7l-8-14a1.8 1.8 0 0 0-3.2 0Z' }),
    h('path', { d: 'M12 8v5m0 3v.2' }));
}

function PermissionRiskDialog({ value, disabled, focusTarget, onCancel, onConfirm }) {
  const copy = PERMISSION_RISK_COPY[value];
  const id = useId();
  const dialog = useRef(null);
  const cancel = useRef(null);
  const [help, setHelp] = useState(false);
  useLayoutEffect(() => {
    const previous = focusTarget?.current || document.activeElement;
    const element = dialog.current;
    element.showModal();
    cancel.current.focus({ preventScroll: true });
    return () => {
      element.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const close = () => { if (!disabled) onCancel(); };
  return createPortal(h('dialog', {
    ref: dialog, className: 'dsc-ui dsc-permission-dialog', 'data-mode': value,
    'aria-labelledby': id + '-title', 'aria-describedby': id + '-description ' + id + '-warning',
    onCancel: event => { event.preventDefault(); close(); },
    onClick: event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }
  },
    h('div', { className: 'dsc-permission-dialog__heading' },
      h(PermissionRiskIcon, { name: value === 'auto' ? 'review' : 'warning', width: 18, height: 18 }),
      h('h2', { id: id + '-title' }, copy.title),
      value === 'auto' && h('span', { className: 'dsc-permission-dialog__badge' }, '实验性')),
    h('p', { id: id + '-description', className: 'dsc-permission-dialog__description' }, copy.description),
    h('ul', { className: 'dsc-permission-dialog__capabilities' }, copy.rows.map(([icon, title, detail]) =>
      h('li', { key: icon }, h(PermissionRiskIcon, { name: icon }),
        h('div', null, h('strong', null, title), h('span', null, detail))))),
    h('p', { id: id + '-warning', className: 'dsc-permission-dialog__warning' }, copy.warning,
      h('button', { type: 'button', className: 'dsc-permission-dialog__more', 'aria-expanded': help, 'aria-controls': id + '-help', onClick: () => setHelp(!help) }, '了解更多')),
    help && h('p', { id: id + '-help', className: 'dsc-permission-dialog__help' }, copy.help),
    h('div', { className: 'dsc-permission-dialog__actions' },
      h('button', { ref: cancel, type: 'button', className: 'dsc-permission-dialog__cancel', disabled, onClick: close }, '取消'),
      h('button', { type: 'button', className: 'dsc-permission-dialog__confirm', disabled, onClick: () => { if (!disabled) onConfirm(); } },
        h(PermissionRiskIcon, { name: 'warning', width: 16, height: 16 }), '确认'))), document.body);
}

function makePermissionPicker(ctx, directory) {
  return function PermissionPicker({ sessionId, useProjection, locked }) {
    const selection = useProjection('permissions');
    const catalog = useSource(directory.store);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [help, setHelp] = useState(false);
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
    useEffect(() => { setOpen(false); setConfirmation(null); }, [catalog.revision, locked, sessionId]);
    // 不用消失的控件掩盖目录失败；没有真实会话投影时只显示状态，不伪造可选权限。
    if (!selection) return h('span', { className: 'dsc-ui dsc-control-status', role: 'status', title: '宿主尚未提供此会话的权限状态' }, h(Icon, { name: 'shield' }), '权限未就绪');
    if (!catalog.value) return h('span', { className: 'dsc-ui dsc-control-status', role: 'status' }, h(Icon, { name: 'shield' }), catalog.error ? '权限加载失败' : '权限加载中…', catalog.error && h('button', { type: 'button', onClick: directory.refresh, title: catalog.error }, '重试'));
    const options = catalog.value.options;
    const current = options.find(x => x.value === selection.currentValue);
    const currentCopy = current ? permissionCopy(current) : permissionCopy({ value: selection.currentValue });
    const submit = async value => {
      const binding = ctx.sessions.binding(sessionId);
      if (!binding || locked || busy || !options.some(x => x.value === value)) return;
      setBusy(true); setError('');
      try {
        const result = await binding.session.command('/permission ' + value);
        if (!result.ok) throw result.error;
        if (!result.value.matched) throw new Error('宿主没有接受权限命令');
      } catch (e) { if (alive.current) setError(errorText(e)); }
      finally { if (alive.current) setBusy(false); }
    };
    const choose = value => {
      if (value === selection.currentValue) { setOpen(false); return; }
      if (value === 'danger-full-access' || value === 'auto') { setOpen(false); setConfirmation(value); return; }
      setOpen(false); submit(value);
    };
    return h('div', { className: 'dsc-ui dsc-permission' },
      h('button', { type: 'button', ref: anchor, className: 'dsc-pill', 'data-warning': selection.currentValue === 'danger-full-access', title: '更改权限', disabled: locked || busy, 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) }, h(Icon, { name: 'shield' }), busy ? '保存中…' : currentCopy.title),
      open && h(Popover, { anchor, onClose: () => setOpen(false), label: '更改权限', width: 322, className: 'dsc-permission-menu' },
        h('div', { className: 'dsc-permission-heading' }, h('span', null, '应如何批准 DSH 操作？'), h('button', { type: 'button', 'aria-expanded': help, onClick: () => setHelp(!help) }, '了解更多')),
        help && h('p', { className: 'dsc-permission-help' }, '权限决定 DSH 可执行的操作范围。选择完全访问或自动审查时，请阅读确认说明；每个选项的具体范围见下方描述。'),
        options.map(option => {
          const copy = permissionCopy(option);
          return h(Option, { key: option.value, title: copy.title, detail: copy.description, icon: 'shield', warning: option.value === 'danger-full-access', selected: option.value === selection.currentValue, onClick: () => choose(option.value) });
        })),
      h(ErrorLine, { text: error }),
      confirmation && h(PermissionRiskDialog, { value: confirmation, disabled: locked || busy, focusTarget: anchor,
        onCancel: () => setConfirmation(null), onConfirm: () => { const value = confirmation; setConfirmation(null); submit(value); } }));
  };
}

function ReasoningSlider({ levels, index, modelName, pending, onCommit, onSelectModel, onReset }) {
  const [preview, setPreview] = useState(index);
  const [dragging, setDragging] = useState(false);
  const [burst, setBurst] = useState(0);
  const track = useRef(null);
  const current = useRef(index);
  const target = useRef(null);
  const count = levels.length;
  // 提交期间宿主状态可能先回旧档再落到新档；锁定目标档位，避免预览被中途值拉回造成闪烁。
  useEffect(() => {
    if (dragging) return;
    const wanted = target.current;
    if (wanted === null) { current.current = index; setPreview(index); return; }
    if (index === wanted) { target.current = null; current.current = index; setPreview(index); return; }
    if (pending) return;
    const timer = setTimeout(() => {
      if (target.current !== null && !pending) {
        target.current = null;
        current.current = index;
        setPreview(index);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [index, dragging, pending]);
  const stars = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ left: `${8 + (i * 37) % 85}%`, top: `${22 + (i * 29) % 57}%`, width: `${1.2 + (i % 5) * .24}px`, height: `${1.2 + (i % 5) * .24}px`, '--dx': `${12 + i % 13}px`, '--dy': `${2 + i % 5}px`, '--pdur': `${2.6 + (i % 9) * .2}s`, '--pdelay': `${-(i % 6) * .7}s` })), []);
  const ratio = count > 1 ? preview / (count - 1) : 0;
  const level = levels[preview];
  const update = next => {
    const n = Math.max(0, Math.min(count - 1, next));
    if (levels[n].id === 'max' && levels[current.current]?.id !== 'max') setBurst(x => x + 1);
    current.current = n; setPreview(n);
  };
  const fromPointer = e => { const box = track.current.getBoundingClientRect(); return Math.round(Math.max(0, Math.min(1, (e.clientX - box.left - 14) / Math.max(1, box.width - 28))) * (count - 1)); };
  const commit = () => {
    if (pending || levels[current.current].id === levels[index]?.id) return;
    target.current = current.current;
    onCommit(levels[current.current]);
  };
  return h('div', { className: 'dsc-reasoning', 'data-level': level.id },
    h('button', { type: 'button', className: 'dsc-reasoning-reset', 'aria-disabled': pending ? 'true' : undefined, onClick: () => { if (!pending) onReset(); }, title: '重置为默认推理强度', 'aria-label': '重置为默认推理强度' }, h('svg', { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: 'M13.2 8a5.2 5.2 0 1 1-1.6-3.7M13.4 2.7v2.9h-2.9' }))),
    h('div', { className: 'dsc-reasoning-heading' }, h('strong', null, level.name), h('button', { type: 'button', className: 'dsc-reasoning-model', onClick: () => { if (!pending) onSelectModel(); }, 'aria-disabled': pending ? 'true' : undefined, title: '修改模型' }, modelName, h(Icon, { name: 'chevron', size: 11, style: { transform: 'rotate(-90deg)' } }))),
    h('div', { ref: track, role: 'slider', tabIndex: pending ? -1 : 0, className: 'dsc-slider', 'data-level': level.id, 'aria-label': '思考强度', 'aria-valuemin': 0, 'aria-valuemax': count - 1, 'aria-valuenow': preview, 'aria-valuetext': level.name, 'aria-disabled': !!pending,
      style: { '--ratio': ratio, '--fill-ratio': `calc((14px + (100% - 28px) * ${ratio}) / 100%)` },
      onPointerDown: e => { if (pending) return; e.preventDefault(); e.currentTarget.focus(); e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); update(fromPointer(e)); },
      onPointerMove: e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) update(fromPointer(e)); },
      onPointerUp: e => { if (!e.currentTarget.hasPointerCapture(e.pointerId)) return; update(fromPointer(e)); e.currentTarget.releasePointerCapture(e.pointerId); setDragging(false); commit(); },
      onPointerCancel: e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); setDragging(false); current.current = index; setPreview(index); },
      onKeyDown: e => { if (pending) return; const n = e.key === 'Home' ? 0 : e.key === 'End' ? count - 1 : ['ArrowLeft', 'ArrowDown'].includes(e.key) ? current.current - 1 : ['ArrowRight', 'ArrowUp'].includes(e.key) ? current.current + 1 : null; if (n === null) return; e.preventDefault(); e.stopPropagation(); update(n); commit(); } },
      h('div', { className: 'dsc-slider-track' }, h('div', { className: 'dsc-slider-fill', style: { transform: `scaleX(${.061 + .939 * ratio})` } }), h('div', { className: 'dsc-slider-max' }), h('div', { className: 'dsc-stars' }, stars.map((style, i) => h('i', { key: i, style })))),
      levels.map((x, i) => h('span', { key: x.id ?? 'default', className: 'dsc-tick' + (i <= preview ? ' is-on' : ''), 'aria-hidden': true, style: { left: `calc(14px + (100% - 28px) * ${count > 1 ? i / (count - 1) : 0})` } })),
      h('div', { className: 'dsc-thumb-position', style: { transform: `translateX(calc((100% - 28px) * ${ratio}))` } }, h('span', { className: 'dsc-thumb' }), burst > 0 && level.id === 'max' && h('span', { key: burst, className: 'dsc-burst' }, Array.from({ length: 12 }, (_, i) => h('i', { key: i, style: { '--bx': `${Math.cos(i * Math.PI / 6) * 27}px`, '--by': `${Math.sin(i * Math.PI / 6) * 27}px` } }))))),
    h('span', { className: 'dsc-sr-only', role: 'status' }, pending ? '正在保存…' : level.description || level.name));
}

// 模型控件渲染异常时在页面内显示原因，避免静默让位给宿主原生控件。
class ModelPickerBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('codex-style: 模型控件渲染失败', error, info); }
  render() {
    if (!this.state.error) return this.props.children;
    const message = this.state.error?.message || String(this.state.error);
    return h('div', { className: 'dsc-ui dsc-error', role: 'alert', style: { maxWidth: 360 } }, `模型控件渲染失败：${message}`);
  }
}

function makeModelPicker(ctx) {
  function ModelPicker({ sessionId, locked, directory }) {
    const rawState = useSource(directory.store);
    const state = { current: rawState?.current ?? null, groups: rawState?.groups ?? [], failures: rawState?.failures ?? [], status: rawState?.status, error: rawState?.error, pending: rawState?.pending, retainedEffort: rawState?.retainedEffort };
    const [pane, setPane] = useState(null);
    const [shown, setShown] = useState(null);
    const [closing, setClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const alive = useRef(true);
    const subagent = ctx.sessions.subagentAddress(sessionId) !== undefined;
    useEffect(() => { alive.current = true; if (!subagent && typeof directory.load === 'function') directory.load().catch(e => { if (alive.current) setError(errorText(e)); }); return () => { alive.current = false; }; }, [directory, subagent]);
    const hasCurrent = state.current !== null;
    useEffect(() => { if (locked || !hasCurrent) setPane(null); }, [locked, hasCurrent]);
    // 关闭时保留一小段淡出，避免弹层硬切除；视图切换由 Popover 的 key 重放进场动画。
    useEffect(() => {
      if (pane) { setShown(pane); setClosing(false); return; }
      if (!shown) return;
      setClosing(true);
      const timer = setTimeout(() => { setShown(null); setClosing(false); }, 160);
      return () => clearTimeout(timer);
    }, [pane, shown]);
    const current = state.current;
    const group = state.groups.find(x => x.id === current?.provider);
    const model = group?.models?.find(x => x.id === current?.model);
    const reasoning = model?.reasoning;
    const levels = reasoning ? [...(reasoning.defaultEffort === undefined ? [{ id: undefined, name: '默认' }] : []), ...(reasoning.efforts ?? [])] : [];
    const index = Math.max(0, levels.findIndex(x => x.id === (current?.reasoningEffort ?? reasoning?.defaultEffort)));
    const pending = !!state.pending;
    const select = async selection => {
      if (locked || pending || subagent) return false;
      setError('');
      try { const result = typeof directory.select === 'function' ? await directory.select(selection) : { ok: false, error: new Error('当前宿主不支持切换模型') }; if (!result.ok) throw result.error; return true; }
      catch (e) { if (alive.current) setError(errorText(e)); return false; }
    };
    if (subagent) return null;
    return h('div', { className: 'dsc-ui dsc-model' }, h('button', { ref: anchor, type: 'button', className: 'dsc-pill dsc-model-trigger', disabled: locked, 'aria-haspopup': 'dialog', 'aria-expanded': pane !== null, 'aria-busy': pending, title: '选择推理强度', onClick: () => setPane(pane ? null : reasoning ? 'effort' : 'root') },
      model ? h(React.Fragment, null,
        h('span', { className: 'dsc-model-name' }, model.name),
        levels[index] && h('span', { className: 'dsc-effort-name' }, levels[index].name)) : h('span', { className: 'dsc-model-name' }, '选择模型'), h(Icon, { name: 'chevron', size: 12 })),
      shown && h(Popover, { key: shown, anchor, onClose: () => setPane(null), width: shown === 'effort' ? 255 : 330, label: shown === 'effort' ? '选择推理强度' : '修改模型', role: 'dialog', className: (shown === 'effort' ? 'dsc-reasoning-pop' : 'dsc-model-panel') + (closing ? ' dsc-menu-closing' : '') },
        shown === 'effort' ? (model && levels.length ? h(ReasoningSlider, { levels, index, modelName: model.name, pending, onSelectModel: () => setPane('root'), onReset: () => select({ provider: current.provider, model: current.model, ...(reasoning.defaultEffort === undefined ? {} : { reasoningEffort: reasoning.defaultEffort }) }), onCommit: level => select({ provider: current.provider, model: current.model, ...(level.id === undefined ? {} : { reasoningEffort: level.id }) }) }) : h('div', { className: 'dsc-empty' }, pending ? '正在加载推理档位…' : '该模型暂无可用的推理档位')) : h(React.Fragment, null,
          h('div', { className: 'dsc-menu-heading' }, '修改模型'),
          h('input', { className: 'dsc-model-search', placeholder: '搜索模型或渠道', value: query, readOnly: pending, onChange: e => setQuery(e.target.value) }),
          state.groups.map(g => {
            const models = (g.models ?? []).filter(m => `${g.name} ${m.name}`.toLowerCase().includes(query.toLowerCase()));
            return models.length ? h('section', { key: g.id }, h('div', { className: 'dsc-model-group' }, g.name), models.map(m => h(Option, { key: m.id, title: m.name, detail: m.description, selected: g.id === current?.provider && m.id === current?.model, disabled: pending, onClick: async () => { const isCurrent = g.id === current?.provider && m.id === current?.model; if (isCurrent) { const currentReasoning = m.reasoning; const hasLevels = currentReasoning ? (currentReasoning.defaultEffort === undefined ? 1 : 0) + (currentReasoning.efforts?.length ?? 0) : 0; setPane(hasLevels > 0 ? 'effort' : null); return; } const ok = await select({ provider: g.id, model: m.id, ...(m.reasoning?.defaultEffort === undefined ? {} : { reasoningEffort: m.reasoning.defaultEffort }) }); if (!ok) return; const snapshot = directory.store.getSnapshot(); const nextReasoning = (snapshot?.groups ?? []).find(item => item.id === g.id)?.models?.find(item => item.id === m.id)?.reasoning; const nextLevels = nextReasoning ? (nextReasoning.defaultEffort === undefined ? 1 : 0) + (nextReasoning.efforts?.length ?? 0) : 0; setPane(nextLevels > 0 ? 'effort' : null); } }))) : null;
          }),
          state.status === 'loading' && h('div', { className: 'dsc-empty' }, '正在加载模型…'),
          !state.groups.length && state.status !== 'loading' && h('div', { className: 'dsc-empty' }, '暂无可用模型'),
          state.failures.map(f => h(ErrorLine, { key: f.id, text: `${f.name}: ${f.message}` }))),
        h(ErrorLine, { text: error || state.error })),
      !pane && h(ErrorLine, { text: error || state.error }));
  }
  return function ModelPickerGuard(props) {
    if (!props.directory || !props.directory.store) return h('span', { className: 'dsc-ui dsc-control-status' }, '模型目录未就绪');
    return h(ModelPickerBoundary, null, h(ModelPicker, props));
  };
}

// 明暗由宿主实际生效的标记决定（自带外观与 dsh-theme 的“浅色/深色”都会落到 data-ds-dark-theme）；
// 主题包或 dsh-theme 接管配色时，Codex 让出调色板令牌，只保留圆角、阴影这类非配色令牌。
function mountCodexTheme(ctx, darkTokens, lightTokens) {
  const overrideLayer = () => {
    const themed = isThemePackActive() || isAppearanceActive();
    return Object.fromEntries(Object.entries(darkTokens)
      .filter(([key]) => !(themed && CODEX_THEME_HOST_TOKENS.has(key)))
      .map(([key, dark]) => [key, { light: lightTokens[key] ?? dark, dark }]));
  };
  ctx.effect(() => {
    let dispose = ctx.theme.overrideTokens(PLUGIN_ID, overrideLayer());
    if (typeof MutationObserver !== 'function') return () => dispose();
    const observer = new MutationObserver(() => { dispose(); dispose = ctx.theme.overrideTokens(PLUGIN_ID, overrideLayer()); });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-dsh-theme', 'data-dsh-appearance'] });
    return () => { observer.disconnect(); dispose(); };
  }, 'codex-style: theme');
  ctx.effect(() => {
    const previous = document.body.getAttribute('data-dsc-color-scheme');
    // 旧版本曾把这个自定义 id 写为当前偏好；升级时仅迁回等价的内置深色。
    if (ctx.theme.getTheme()?.preference === 'dsh-codex-dark') ctx.theme.setTheme('dark');
    const bootMarked = typeof document.documentElement?.dataset?.dsThemeSource === 'string';
    const sync = snapshot => {
      const dark = bootMarked ? document.body.hasAttribute('data-ds-dark-theme') : snapshot.active.colorScheme === 'dark';
      document.body.setAttribute('data-dsc-color-scheme', dark ? 'dark' : 'light');
    };
    sync(ctx.theme.getTheme());
    const off = ctx.on('theme/change', sync);
    const observer = typeof MutationObserver === 'function' ? new MutationObserver(() => sync(ctx.theme.getTheme())) : null;
    observer?.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme'] });
    return () => {
      off();
      observer?.disconnect();
      if (previous === null) document.body.removeAttribute('data-dsc-color-scheme');
      else document.body.setAttribute('data-dsc-color-scheme', previous);
    };
  }, 'codex-style: theme mode');
}

function apply(ctx) {
  console.warn('[codex-style] apply 开始 v' + PLUGIN_VERSION);
  mountCodexPresentation(ctx);
  ctx.inject(['remote', 'remote.pluginInventory'], scope => scope.effect(() => watchCodexPresentation(scope), 'codex-style: presentation component states'));
  // 社区版提醒：每次主客户端激活最多一次；官方环境、读取失败、提前卸载均不显示。
  const communityNotice = createCommunityNotice();
  let communityNoticeShown = false;
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:community-notice' }, () => h(CommunityNotice, { notice: communityNotice })));
  ctx.inject(['remote', 'remote.codexStyleEnvironment'], scope => scope.effect(() => {
    let active = true;
    Promise.resolve(scope.remote.codexStyleEnvironment.status()).then(result => {
      if (!active || communityNoticeShown || result?.community !== true) return;
      communityNoticeShown = true;
      communityNotice.show(COMMUNITY_NOTICE_TEXT);
    }).catch(error => { if (active) console.warn('codex-style: 无法读取运行环境', error); });
    return () => { active = false; communityNotice.clear(); };
  }, 'codex-style: community notice'));
  const tokenValues = {
    '--dsw-alias-bg-base': '#111111', '--dsw-alias-bg-layer-1': '#212121', '--dsw-alias-bg-layer-2': '#282828', '--dsw-alias-bg-layer-3': '#2d2d2d', '--dsw-alias-bg-overlay': '#282828',
    '--dsw-alias-bg-module-platform': '#0f0f0f', '--dsw-alias-label-primary': '#fcfcfc', '--dsw-alias-label-secondary': 'rgba(255,255,255,.7)', '--dsw-alias-label-tertiary': 'rgba(255,255,255,.5)',
    '--dsw-alias-label-caption': 'rgba(255,255,255,.5)', '--dsw-alias-label-dimmed': 'rgba(255,255,255,.32)', '--dsw-alias-label-primary-dimmed': 'rgba(255,255,255,.6)', '--dsw-alias-label-primary-bluish': '#eef3ff', '--dsw-alias-label-primary-inverted': '#131313',
    // 保留成熟深色值；浅色在下方提供独立语义值。
    '--dsw-alias-button-elevated-fill': 'var(--cx-active)', '--dsw-alias-button-floating-hover': 'rgba(255,255,255,.12)',
    '--dsw-alias-border-l1': 'rgba(255,255,255,.08)', '--dsw-alias-border-l2': 'rgba(255,255,255,.08)', '--dsw-alias-border-l3': 'rgba(255,255,255,.12)', '--dsw-alias-border-l4': 'rgba(255,255,255,.16)',
    '--dsw-alias-brand-primary': '#0285ff', '--dsw-alias-link': '#339cff', '--dsw-alias-interactive-bg-hover': 'rgba(255,255,255,.08)', '--dsw-alias-interactive-bg-hover-solid': '#282828',
    // 2026-10-23 按用户 Codex 截图采样：顶栏/窗口 chrome #202020、用户气泡 #222222（对话区保持 #181818）。
    '--dsw-specific-sidebar-fill': '#0f0f0f', '--dsw-specific-bubble': '#1d1d1d', '--dsw-specific-input-major': '#2b2b2b', '--dsw-specific-menu': '#2d2d2d', '--dsw-specific-selector': 'transparent',
    // 设置页左栏与侧栏导航项：light 主题下宿主给浅色底，插件把文字固定为白色，会成白底白字；这里按宿主暗色主题成对补齐。
    '--dsw-specific-sidebar-nav-item-active': '#43454a', '--dsw-specific-sidebar-nav-item-hover': '#2c2c2e', '--dsw-specific-sidebar-nav-item-active-accent': '#353638',
    // markdown 代码外观：light 主题下 inline code / 代码块顶栏也是浅底，需一并转成与对话背景有区分的深色。
    '--dsw-alias-markdown-code-block': '#212121', '--dsw-alias-markdown-inline-code': '#292929', '--dsw-alias-markdown-code-block-banner': '#2c2c2e',
    '--dsw-alias-markdown-code-segment-selected': '#353638', '--dsw-alias-markdown-code-segment-unselected': '#1b1b1c',
    '--dsw-alias-state-business-primary': '#339cff', '--dsw-alias-state-business-tertiary': '#0285ff26', '--dsw-alias-state-error-primary': '#ff6764', '--dsw-alias-state-warn-primary': '#ff8549', '--dsw-alias-state-warn-secondary': '#ff8549bb', '--dsw-alias-state-warn-tertiary': '#ff854926',
    '--dsw-alias-scrollbar-bg-l1': '#ffffff26', '--dsw-alias-scrollbar-bg-l2': '#ffffff32', '--dsw-alias-scrollbar-hover-l2': '#ffffff59',
    '--dsw-radius-panel': '25px', '--dsw-menu-surface-fill': '#2d2d2d', '--dsw-elevation-soft': '0 0 0 .5px rgba(255,255,255,.16),0 3px 8px #0000000a'
  };
  const lightTokenValues = {
    '--dsw-alias-bg-base': '#ffffff', '--dsw-alias-bg-layer-1': '#f3f3f3', '--dsw-alias-bg-layer-2': '#ffffff', '--dsw-alias-bg-layer-3': '#ffffff', '--dsw-alias-bg-overlay': '#ffffff',
    '--dsw-alias-bg-module-platform': '#f3f3f3', '--dsw-alias-label-primary': '#0d0d0d', '--dsw-alias-label-secondary': 'rgba(0,0,0,.7)', '--dsw-alias-label-tertiary': 'rgba(0,0,0,.5)',
    '--dsw-alias-label-caption': 'rgba(0,0,0,.5)', '--dsw-alias-label-dimmed': 'rgba(0,0,0,.32)', '--dsw-alias-label-primary-dimmed': 'rgba(0,0,0,.6)', '--dsw-alias-label-primary-bluish': '#19355a', '--dsw-alias-label-primary-inverted': '#ffffff',
    '--dsw-alias-button-floating-hover': 'rgba(0,0,0,.08)',
    '--dsw-alias-border-l1': 'rgba(0,0,0,.08)', '--dsw-alias-border-l2': 'rgba(0,0,0,.08)', '--dsw-alias-border-l3': 'rgba(0,0,0,.12)', '--dsw-alias-border-l4': 'rgba(0,0,0,.16)',
    '--dsw-alias-brand-primary': '#2b68cb', '--dsw-alias-link': '#2b68cb', '--dsw-alias-interactive-bg-hover': 'rgba(0,0,0,.045)', '--dsw-alias-interactive-bg-hover-solid': '#eeeeee',
    '--dsw-specific-sidebar-fill': '#f3f3f3', '--dsw-specific-bubble': '#f3f3f3', '--dsw-specific-input-major': '#ffffff', '--dsw-specific-menu': '#ffffff',
    '--dsw-specific-sidebar-nav-item-active': '#eeeeee', '--dsw-specific-sidebar-nav-item-hover': '#f3f3f3', '--dsw-specific-sidebar-nav-item-active-accent': '#e5e5e5',
    '--dsw-alias-markdown-code-block': '#f6f6f6', '--dsw-alias-markdown-inline-code': '#f1f1f1', '--dsw-alias-markdown-code-block-banner': '#eeeeee',
    '--dsw-alias-markdown-code-segment-selected': '#e5e5e5', '--dsw-alias-markdown-code-segment-unselected': '#fafafa',
    '--dsw-alias-state-business-primary': '#2b68cb', '--dsw-alias-state-business-tertiary': '#2b68cb18', '--dsw-alias-state-error-primary': '#c93632', '--dsw-alias-state-warn-primary': '#dd5512', '--dsw-alias-state-warn-secondary': '#dd5512bb', '--dsw-alias-state-warn-tertiary': '#dd551218',
    '--dsw-alias-scrollbar-bg-l1': '#00000018', '--dsw-alias-scrollbar-bg-l2': '#00000024', '--dsw-alias-scrollbar-hover-l2': '#00000040',
    '--dsw-menu-surface-fill': '#ffffff', '--dsw-elevation-soft': '0 0 0 .5px rgba(0,0,0,.08),0 3px 8px #0000000a'
  };
  mountCodexTheme(ctx, tokenValues, lightTokenValues);
  ctx.effect(() => {
    const previous = document.body.getAttribute('data-dsh-codex-style');
    document.body.setAttribute('data-dsh-codex-style', PLUGIN_VERSION);
    const style = document.createElement('style'); style.dataset.dshCodexStyle = PLUGIN_VERSION; style.textContent = CSS_TEXT; document.head.appendChild(style);
    const skillsStyle = document.createElement('style'); skillsStyle.dataset.dshCodexSkills = PLUGIN_VERSION; skillsStyle.textContent = SKILLS_CSS_TEXT; document.head.appendChild(skillsStyle);
    return () => { style.remove(); skillsStyle.remove(); if (previous === null) document.body.removeAttribute('data-dsh-codex-style'); else document.body.setAttribute('data-dsh-codex-style', previous); };
  }, 'codex-style: stylesheet');
  // 主题包在自带样式之后挂载：映射表要压过默认深浅色令牌，选择才能立刻生效。
  installThemePack(ctx);
  installAppearance(ctx);
  registerSkillsPage(ctx);
  const register = (scope, name, component, inject) => scope.slots.inject(name, () => {
    const priorities = scope.slots.entries(name).map(entry => entry.options.priority ?? 0);
    return scope.slots.register({ name, priority: Math.min(0, ...priorities) - 1, ...(inject ? { inject } : {}) }, component);
  });
  const components = {
    'sidebar.brand.mark': () => h('img', { className: 'dsc-brand-mark', src: BRAND_MARK, alt: '' }),
    'sidebar.brand.name': () => h('span', { className: 'dsc-ui dsc-brand' }, h('strong', null, 'deepseek'), h('small', null, 'HARNESS')),
    'settings.trigger': () => h('span', { className: 'dsc-ui dsc-settings-trigger' }, h(Icon, { name: 'settings', size: 18 }), '设置')
  };
  for (const [name, component] of Object.entries(components)) register(ctx, name, component);
  // 自研插件更新已退役：不再注册详情页更新按钮、更新提醒、Host 更新服务或定时网络查询。
  // 插件版本更新统一由 DSH 原生插件页/市场负责；本插件只保留 DSH 本体更新入口（见下方 desktopUpdates）。
  ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'codex-style:support' }, PluginSupportSection));
  // 等各区域自己的服务就绪；权限 RPC 的命名空间不能由 remote 根服务存在来推断。
  ctx.inject(['sessions', 'uiSession', 'workspaces', 'uiWorkspace', 'layout', 'shortcuts', 'remote', 'locale', 'pluginNavigation'], scope => {
    const sidebar = createSidebarPresentation();
    scope.effect(() => () => sidebar.dispose(), 'codex-style: sidebar presentation');
    // 归档提示状态由插件持有并独立注册到 shell.overlay：侧栏子树卸载仍可见，随插件 scope 卸载清理。
    const archiveNotice = createArchiveNotice(sessionId => scope.uiWorkspace.unarchiveSession(sessionId));
    scope.effect(() => () => archiveNotice.dispose(), 'codex-style: archive notice');
    scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:archive-notice' }, () => h(ArchiveNotice, { notice: archiveNotice })));
    register(scope, 'sidebar.workspaces', makeSidebarChrome(scope, sidebar, archiveNotice));
    scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:shell' }, makeShellChrome(scope, sidebar)));
    register(scope, 'conversation.header.leading', makeCollapsedNewChat(scope));
  });
  ctx.inject(['modules', 'locale', 'remote', 'remote.account'], scope => register(scope, 'settings.launcher', makeGearLauncher(scope)));
  const desktopUpdates = createDesktopUpdateSource();
  ctx.effect(() => desktopUpdates.start(globalThis.dshDesktop), 'codex-style: desktop update carrier');
  // 原生设置行指示器随被隐藏的宿主侧栏不可见；侧栏展开键上的蓝点由公开单槽位让给蓝圆入口。
  register(ctx, 'sidebar.toggle.badge', () => null);
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:desktop-update' }, () => createPortal(h('div', { className: 'dsc-ui dsc-desktop-update-launcher' }, h(DesktopUpdateRailButton, { source: desktopUpdates })), document.body)));
  ctx.inject(['workspaces'], scope => {
    register(scope, 'conversation.hero.brand.mark', EmptyHero);
    register(scope, 'conversation.hero.workspace', makeHeroWorkspace(scope));
  });
  // 由宿主等待目录、释放旧目录并在恢复后重新注册；保留 Session Remote 的访问声明。
  ctx.inject(['sessions', 'slots', 'locale', 'remote', 'remote.session', 'modelDirectories'], scope => {
    const directories = scope.modelDirectories;
    register(scope, 'conversation.input.model', makeModelPicker(scope), sessionId => ({ directory: directories.directoryFor(sessionId) }));
  });
  ctx.inject(['connection', 'sessions', 'remote', 'remote.permissionPresets'], scope => {
    const permissions = permissionDirectory(scope);
    scope.effect(() => () => permissions.dispose(), 'codex-style: permission directory');
    register(scope, 'conversation.input.permission', makePermissionPicker(scope, permissions));
  });
  // 对话正文列与重绘后的输入框对齐：直接测量输入框卡片的视觉宽度并同步给正文列，
  // 避免宿主变量（正文 +32px）与实际渲染的卡宽不一致。
  ctx.effect(() => {
    let frame = 0;
    let card;
    const anchor = '[data-slot="conversation.composer.bar"], [data-composer-card]';
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
    const sync = () => {
      frame = 0;
      const current = document.querySelector('[data-slot="conversation.composer.bar"] [data-composer-card]');
      if (current !== card) {
        if (card) observer.unobserve(card);
        card = current;
        if (card) observer.observe(card);
      }
      const width = card?.getBoundingClientRect().width;
      const value = width > 0 ? `${Math.round(width)}px` : '';
      const style = document.documentElement.style;
      if (style.getPropertyValue('--dsc-composer-visual-width') !== value) {
        if (value) style.setProperty('--dsc-composer-visual-width', value);
        else style.removeProperty('--dsc-composer-visual-width');
      }
    };
    // 只在卡片挂载/替换时重绑尺寸观察；流式文本与其他节点变化不触发全页测量。
    const mounting = new MutationObserver(records => {
      if ((card && !card.isConnected) || records.some(record => [...record.addedNodes].some(node =>
        node.nodeType === 1 && (node.matches(anchor) || node.querySelector(anchor))))) schedule();
    });
    mounting.observe(document.body, { childList: true, subtree: true });
    schedule();
    return () => {
      observer.disconnect();
      mounting.disconnect();
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--dsc-composer-visual-width');
    };
  }, 'codex-style: composer width sync');
}
exports.name = 'codex-style';
exports.inject = ['slots', 'theme'];
exports.apply = apply;

// 图片批注：图片大预览、编号点评论与手绘标注编辑器。
// 本文件由 build 拼接进 client.js 的同一 factory，复用其 React/h/hooks/createPortal；
// 不使用 JSX、ESM import/export 或新依赖。数据层、几何/格式化函数保持纯函数，
// 便于 scripts/test-image-annotations.mjs 在 VM 中直接加载本文件做功能验证。
//
// 对外接口（由宿主适配器或后续集成单接线）：
//   createImageAnnotationStore() / ImageAnnotationViewer / ImageAnnotationPill /
//   formatImageAnnotationPrompt(groups) / exportImageAnnotationImage(image, state)

/* ------------------------------- 常量 ------------------------------- */

const imageAnnotationDotSize = 30;
const imageAnnotationPopupGap = 27;
const imageAnnotationPopupMargin = 8;
const imageAnnotationPopupWidth = 294;
const imageAnnotationNewHeight = 44;
const imageAnnotationEditHeight = 120;
const imageAnnotationDragThreshold = 8;
const imageAnnotationMinZoom = 0.15;
const imageAnnotationMaxZoom = 8;
const imageAnnotationDefaultColor = '#dc2626';
const imageAnnotationColors = ['#dc2626', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#111111'];
const imageAnnotationWidthRanges = { pen: [1, 32], text: [8, 128], select: [1, 32], shape: [1, 32] };
const imageAnnotationShapeList = [
  { id: 'line', label: '线条' },
  { id: 'arrow', label: '箭头' },
  { id: 'rect', label: '矩形' },
  { id: 'ellipse', label: '椭圆' }
];
const imageAnnotationFrozenEmptyState = Object.freeze({ comments: Object.freeze([]), marks: Object.freeze([]) });

/* ----------------------------- 数据存储 ----------------------------- */

function imageAnnotationNormalizeState(value) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    ...source,
    comments: Array.isArray(source.comments) ? source.comments.filter(item => item && typeof item === 'object') : [],
    marks: Array.isArray(source.marks) ? source.marks.filter(item => item && typeof item === 'object') : [],
    markupUndo: Array.isArray(source.markupUndo) ? source.markupUndo.filter(item => Array.isArray(item)) : [],
    markupRedo: Array.isArray(source.markupRedo) ? source.markupRedo.filter(item => Array.isArray(item)) : []
  };
}

function imageAnnotationCreateEmptyState() {
  return { comments: [], marks: [], markupUndo: [], markupRedo: [] };
}

// 每张图片按宿主提供的 key 独立保存；未写过的 key 返回同一份只读空状态。
function createImageAnnotationStore() {
  const entries = new Map();
  const listeners = [];
  const notify = () => {
    for (const listener of listeners.slice()) {
      try {
        listener();
      } catch (error) {
        console.error('[codex-style] 图片批注订阅回调失败', error);
      }
    }
  };
  return {
    get(key) {
      return entries.get(key) || imageAnnotationFrozenEmptyState;
    },
    set(key, value) {
      entries.set(key, imageAnnotationNormalizeState(value));
      notify();
    },
    clear(key) {
      if (entries.delete(key)) notify();
    },
    // 胶囊叉号只清空这张图的评论，手绘 marks 由宿主决定是否随 clear 一并处理。
    clearComments(key) {
      const current = entries.get(key);
      if (!current || !current.comments.length) return;
      entries.set(key, { ...current, comments: [] });
      notify();
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      };
    }
  };
}

/* --------------------------- 坐标与几何 --------------------------- */

function imageAnnotationClamp01(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  if (number < 0) return 0;
  if (number > 1) return 1;
  return number;
}

function imageAnnotationNormalizePoint(x, y) {
  return { x: imageAnnotationClamp01(x), y: imageAnnotationClamp01(y) };
}

function imageAnnotationPointFromClient(rect, clientX, clientY) {
  const left = Number(rect && rect.left) || 0;
  const top = Number(rect && rect.top) || 0;
  const width = Number(rect && rect.width) > 0 ? Number(rect.width) : 1;
  const height = Number(rect && rect.height) > 0 ? Number(rect.height) : 1;
  return imageAnnotationNormalizePoint((Number(clientX) - left) / width, (Number(clientY) - top) / height);
}

// 按下到抬起位移超过 8 个事件坐标像素视为拖动，不落点。
function imageAnnotationPointerMoved(start, event) {
  if (!start || !event) return false;
  const dx = Number(event.clientX) - Number(start.x);
  const dy = Number(event.clientY) - Number(start.y);
  return Math.sqrt(dx * dx + dy * dy) > imageAnnotationDragThreshold;
}

// 弹层定位：与点中心间距 27px（不是点边缘 + 27），避边 8px，优先右、左，再下、上。
function imageAnnotationPlacePopup(dot, size, viewport, options) {
  const gap = options && Number.isFinite(options.gap) ? options.gap : imageAnnotationPopupGap;
  const margin = options && Number.isFinite(options.margin) ? options.margin : imageAnnotationPopupMargin;
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  const width = Math.max(0, Number(size && size.width) || 0);
  const height = Math.max(0, Number(size && size.height) || 0);
  const dotLeft = Number(dot && dot.left) || 0;
  const dotTop = Number(dot && dot.top) || 0;
  const dotWidth = Number(dot && dot.width) || 0;
  const dotHeight = Number(dot && dot.height) || 0;
  const centerX = dotLeft + dotWidth / 2;
  const centerY = dotTop + dotHeight / 2;
  const maxLeft = Math.max(margin, viewWidth - margin - width);
  const maxTop = Math.max(margin, viewHeight - margin - height);
  const clamp = (value, low, high) => Math.min(Math.max(value, low), high);
  const candidates = [
    { side: 'right', left: centerX + gap, top: centerY - height / 2 },
    { side: 'left', left: centerX - gap - width, top: centerY - height / 2 },
    { side: 'bottom', left: centerX - width / 2, top: centerY + gap },
    { side: 'top', left: centerX - width / 2, top: centerY - gap - height }
  ];
  const fits = candidate => candidate.left >= margin && candidate.left <= maxLeft && candidate.top >= margin && candidate.top <= maxTop;
  const picked = candidates.find(fits) || candidates[0];
  return {
    side: picked.side,
    left: clamp(picked.left, margin, maxLeft),
    top: clamp(picked.top, margin, maxTop)
  };
}

function imageAnnotationClampDrag(startRect, deltaX, deltaY, viewport, margin) {
  const safeMargin = Number.isFinite(margin) ? margin : imageAnnotationPopupMargin;
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  let x = Number(deltaX) || 0;
  let y = Number(deltaY) || 0;
  const left = (Number(startRect && startRect.left) || 0) + x;
  const top = (Number(startRect && startRect.top) || 0) + y;
  const width = Number(startRect && startRect.width) || 0;
  const height = Number(startRect && startRect.height) || 0;
  if (viewWidth > 0) {
    if (left < safeMargin) x += safeMargin - left;
    else if (left + width > viewWidth - safeMargin) x -= left + width - (viewWidth - safeMargin);
  }
  if (viewHeight > 0) {
    if (top < safeMargin) y += safeMargin - top;
    else if (top + height > viewHeight - safeMargin) y -= top + height - (viewHeight - safeMargin);
  }
  return { x, y };
}

/* ----------------------------- 评论操作 ----------------------------- */

let imageAnnotationIdSeed = 0;

function imageAnnotationNextId(prefix) {
  imageAnnotationIdSeed += 1;
  return String(prefix || 'item') + '-' + Date.now().toString(36) + '-' + imageAnnotationIdSeed.toString(36);
}

function imageAnnotationNormalizedText(text) {
  return typeof text === 'string' ? text.trim() : '';
}

function imageAnnotationAddComment(state, input) {
  const base = imageAnnotationNormalizeState(state);
  const text = imageAnnotationNormalizedText(input && input.text);
  if (!text) return { ...base, comments: base.comments.slice() };
  const point = imageAnnotationNormalizePoint(input && input.x, input && input.y);
  const comment = {
    id: input && input.id ? input.id : imageAnnotationNextId('comment'),
    text,
    x: point.x,
    y: point.y
  };
  return { ...base, comments: base.comments.concat(comment) };
}

function imageAnnotationUpdateComment(state, id, text) {
  const base = imageAnnotationNormalizeState(state);
  const next = imageAnnotationNormalizedText(text);
  if (!next) return { ...base, comments: base.comments.slice() };
  return { ...base, comments: base.comments.map(comment => comment.id === id ? { ...comment, text: next } : comment) };
}

function imageAnnotationRemoveComment(state, id) {
  const base = imageAnnotationNormalizeState(state);
  return { ...base, comments: base.comments.filter(comment => comment.id !== id) };
}

function imageAnnotationCommentNumber(state, id) {
  const comments = Array.isArray(state && state.comments) ? state.comments : [];
  return comments.findIndex(comment => comment.id === id) + 1;
}

/* ----------------------------- 手绘操作 ----------------------------- */

function imageAnnotationCommitMarks(state, marks) {
  const base = imageAnnotationNormalizeState(state);
  const undo = base.markupUndo.concat([base.marks]).slice(-80);
  return { ...base, marks: Array.isArray(marks) ? marks : [], markupUndo: undo, markupRedo: [] };
}

function imageAnnotationAddMark(state, mark) {
  if (!mark || typeof mark !== 'object') return imageAnnotationNormalizeState(state);
  const base = imageAnnotationNormalizeState(state);
  const nextMark = mark.id ? mark : { ...mark, id: imageAnnotationNextId('mark') };
  return imageAnnotationCommitMarks(base, base.marks.concat([nextMark]));
}

function imageAnnotationReplaceMark(state, id, patch) {
  const base = imageAnnotationNormalizeState(state);
  const marks = base.marks.map(mark => mark.id === id ? { ...mark, ...(patch || {}) } : mark);
  return imageAnnotationCommitMarks(base, marks);
}

function imageAnnotationMoveMark(state, id, deltaX, deltaY) {
  const base = imageAnnotationNormalizeState(state);
  const dx = Number(deltaX) || 0;
  const dy = Number(deltaY) || 0;
  if (!dx && !dy) return base;
  const marks = base.marks.map(mark => {
    if (mark.id !== id) return mark;
    if (mark.type === 'stroke' && Array.isArray(mark.points)) {
      return { ...mark, points: mark.points.map(point => ({ x: point.x + dx, y: point.y + dy })) };
    }
    if (mark.type === 'text') return { ...mark, x: mark.x + dx, y: mark.y + dy };
    if (typeof mark.x1 === 'number') return { ...mark, x1: mark.x1 + dx, y1: mark.y1 + dy, x2: mark.x2 + dx, y2: mark.y2 + dy };
    return mark;
  });
  return imageAnnotationCommitMarks(base, marks);
}

function imageAnnotationRemoveMark(state, id) {
  const base = imageAnnotationNormalizeState(state);
  return imageAnnotationCommitMarks(base, base.marks.filter(mark => mark.id !== id));
}

function imageAnnotationUndoMarkup(state) {
  const base = imageAnnotationNormalizeState(state);
  if (!base.markupUndo.length) return base;
  const previous = base.markupUndo[base.markupUndo.length - 1];
  return {
    ...base,
    marks: previous.slice(),
    markupUndo: base.markupUndo.slice(0, -1),
    markupRedo: base.markupRedo.concat([base.marks.slice()])
  };
}

function imageAnnotationRedoMarkup(state) {
  const base = imageAnnotationNormalizeState(state);
  if (!base.markupRedo.length) return base;
  const next = base.markupRedo[base.markupRedo.length - 1];
  return {
    ...base,
    marks: next.slice(),
    markupRedo: base.markupRedo.slice(0, -1),
    markupUndo: base.markupUndo.concat([base.marks.slice()])
  };
}

function imageAnnotationMarkBounds(mark) {
  if (!mark || typeof mark !== 'object') return null;
  if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const point of mark.points) {
      if (point.x < minX) minX = point.x;
      if (point.y < minY) minY = point.y;
      if (point.x > maxX) maxX = point.x;
      if (point.y > maxY) maxY = point.y;
    }
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  }
  if (mark.type === 'text') {
    const size = Number(mark.size) || 0.03;
    return { x1: mark.x, y1: mark.y, x2: mark.x + Math.max(0.04, (String(mark.text || '').length || 1) * size * 0.55), y2: mark.y + size * 1.2 };
  }
  if (typeof mark.x1 === 'number') {
    return { x1: Math.min(mark.x1, mark.x2), y1: Math.min(mark.y1, mark.y2), x2: Math.max(mark.x1, mark.x2), y2: Math.max(mark.y1, mark.y2) };
  }
  return null;
}

/* --------------------------- 发送层格式化 --------------------------- */

function imageAnnotationPercent(value) {
  const percent = Math.round(imageAnnotationClamp01(value) * 1000) / 10;
  return String(percent);
}

// groups: [{imageNumber, name, comments:[{text,x,y}]}] -> "Image 1:\n1. (x: 25%, y: 40%) ..."
// 只供发送层使用；UI 不显示这段文字。
function formatImageAnnotationPrompt(groups) {
  const rows = [];
  const list = Array.isArray(groups) ? groups : [];
  for (let index = 0; index < list.length; index += 1) {
    const group = list[index];
    const comments = Array.isArray(group && group.comments) ? group.comments : [];
    const usable = comments.filter(comment => imageAnnotationNormalizedText(comment && comment.text));
    if (!usable.length) continue;
    const rawNumber = Number(group && group.imageNumber);
    const imageNumber = Number.isFinite(rawNumber) && rawNumber > 0 ? Math.round(rawNumber) : index + 1;
    const lines = ['Image ' + imageNumber + ':'];
    usable.forEach((comment, commentIndex) => {
      lines.push((commentIndex + 1) + '. (x: ' + imageAnnotationPercent(comment.x) + '%, y: ' + imageAnnotationPercent(comment.y) + '%) ' + imageAnnotationNormalizedText(comment.text));
    });
    rows.push(lines.join('\n'));
  }
  return rows.join('\n\n');
}

/* ----------------------------- 图片导出 ----------------------------- */

function imageAnnotationLoadImage(src) {
  return new Promise((resolve, reject) => {
    if (typeof Image !== 'function') {
      reject(new Error('当前环境不支持图片导出'));
      return;
    }
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('图片加载失败'));
    if (String(src || '').indexOf('data:') !== 0 && String(src || '').indexOf('blob:') !== 0) image.crossOrigin = 'anonymous';
    image.src = src || '';
  });
}

// 只有手绘 marks 会被合成到原图；普通点评论永远不烧进图片。
function imageAnnotationDrawMarks(context, marks, width, height) {
  if (!context || !Array.isArray(marks)) return;
  context.save();
  context.lineCap = 'round';
  context.lineJoin = 'round';
  for (const mark of marks) {
    if (!mark || typeof mark !== 'object') continue;
    const ratio = Number(mark.width) || 0;
    const lineWidth = Math.max(1, ratio * width);
    const color = typeof mark.color === 'string' && mark.color ? mark.color : imageAnnotationDefaultColor;
    if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length > 1) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.beginPath();
      mark.points.forEach((point, index) => {
        const px = point.x * width;
        const py = point.y * height;
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.stroke();
    } else if (mark.type === 'text' && mark.text) {
      const fontSize = Math.max(1, (Number(mark.size) || 0.03) * width);
      context.fillStyle = color;
      context.font = '600 ' + Math.round(fontSize) + 'px "Segoe UI", "Microsoft YaHei", sans-serif';
      context.textBaseline = 'top';
      context.fillText(String(mark.text), mark.x * width, mark.y * height);
    } else if (typeof mark.x1 === 'number' && typeof mark.x2 === 'number') {
      const x1 = mark.x1 * width, y1 = mark.y1 * height, x2 = mark.x2 * width, y2 = mark.y2 * height;
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = lineWidth;
      if (mark.type === 'rect') {
        context.strokeRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
      } else if (mark.type === 'ellipse') {
        context.beginPath();
        context.ellipse((x1 + x2) / 2, (y1 + y2) / 2, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2, 0, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        if (mark.type === 'arrow') {
          const angle = Math.atan2(y2 - y1, x2 - x1);
          const head = Math.max(8, lineWidth * 3.2);
          context.beginPath();
          context.moveTo(x2, y2);
          context.lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6));
          context.lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6));
          context.closePath();
          context.fill();
        }
      }
    }
  }
  context.restore();
}

function imageAnnotationCanvasBlob(image, marks) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') {
      reject(new Error('当前环境不支持画布导出'));
      return;
    }
    const width = Number(image && (image.naturalWidth || image.width)) || 0;
    const height = Number(image && (image.naturalHeight || image.height)) || 0;
    if (!width || !height) {
      reject(new Error('图片尺寸未知'));
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = typeof canvas.getContext === 'function' ? canvas.getContext('2d') : null;
    if (!context) {
      reject(new Error('无法创建画布'));
      return;
    }
    context.drawImage(image, 0, 0, width, height);
    imageAnnotationDrawMarks(context, marks, width, height);
    if (typeof canvas.toBlob !== 'function') {
      reject(new Error('当前环境不支持导出 Blob'));
      return;
    }
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('图片导出失败'));
    }, 'image/png');
  });
}

function exportImageAnnotationImage(image, state) {
  const marks = Array.isArray(state && state.marks) ? state.marks : [];
  const src = image && image.src;
  if (!marks.length && typeof fetch === 'function' && src) {
    return fetch(src).then(response => {
      if (!response || (typeof response.ok === 'boolean' && !response.ok)) throw new Error('图片下载失败');
      return response.blob();
    }).catch(() => imageAnnotationLoadImage(src).then(loaded => imageAnnotationCanvasBlob(loaded, [])));
  }
  return imageAnnotationLoadImage(src).then(loaded => imageAnnotationCanvasBlob(loaded, marks));
}

/* ------------------------------- 图标 ------------------------------- */

function imageAnnotationIcon(name, size) {
  const dimension = Number(size) > 0 ? Number(size) : 20;
  const common = {
    viewBox: '0 0 24 24',
    width: dimension,
    height: dimension,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false'
  };
  const paths = {
    close: ['M6 6l12 12', 'M18 6L6 18'],
    download: ['M12 4v11', 'M7 11l5 5 5-5', 'M5 20h14'],
    fit: ['M4 9V4h5', 'M20 9V4h-5', 'M4 15v5h5', 'M20 15v5h-5'],
    chevron: ['m7 10 5 5 5-5'],
    prev: ['m15 5-7 7 7 7'],
    next: ['m9 5 7 7-7 7'],
    select: ['M5 3l14 8-6 1.4L10.5 19 5 3Z'],
    pen: ['M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z', 'M13 7l4 4'],
    text: ['M5 6V4h14v2', 'M12 4v16', 'M8 20h8'],
    eraser: ['M9 20H4l-1.5-4L14 4.5l5.5 5.5L11 18.5', 'M10 20h10'],
    undo: ['M9 14 4 9l5-5', 'M4 9h9a6 6 0 0 1 0 12h-2'],
    redo: ['m15 14 5-5-5-5', 'M20 9h-9a6 6 0 0 0 0 12h2'],
    trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13'],
    arrowUp: ['M12 19V5', 'm6 11 6-6 6 6'],
    comment: ['M4 5h16v11H9l-5 4V5Z'],
    rect: ['M4 6h16v12H4z'],
    ellipse: ['M12 5c4.4 0 8 3.1 8 7s-3.6 7-8 7-8-3.1-8-7 3.6-7 8-7Z'],
    arrow: ['M4 20 20 4', 'M20 4h-6', 'M20 4v6'],
    line: ['M4 20 20 4'],
    grip: ['M9 6h.01', 'M15 6h.01', 'M9 12h.01', 'M15 12h.01', 'M9 18h.01', 'M15 18h.01']
  };
  const shape = paths[name] || paths.comment;
  return h('svg', common, shape.map((d, index) => h('path', { key: index, d })));
}

/* --------------------------- 小工具与常量 --------------------------- */

function imageAnnotationErrorText(error) {
  return (error && error.message) || String(error || '');
}

function imageAnnotationIsTextInput(target) {
  if (!target || typeof target !== 'object') return false;
  const tag = String(target.tagName || '').toUpperCase();
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable === true;
}

function imageAnnotationViewportSize() {
  if (typeof window === 'undefined') return { width: 1280, height: 800 };
  return { width: Number(window.innerWidth) || 1280, height: Number(window.innerHeight) || 800 };
}

function imageAnnotationFitBox(natural, viewport) {
  const width = Math.max(0, Number(natural && natural.width) || 0);
  const height = Math.max(0, Number(natural && natural.height) || 0);
  const viewWidth = Math.max(0, Number(viewport && viewport.width) || 0);
  const viewHeight = Math.max(0, Number(viewport && viewport.height) || 0);
  const horizontalPadding = Math.min(160, Math.max(24, viewWidth * 0.12));
  const verticalPadding = Math.min(240, Math.max(132, viewHeight * 0.22));
  const availableWidth = Math.max(48, viewWidth - horizontalPadding * 2);
  const availableHeight = Math.max(48, viewHeight - verticalPadding);
  if (!width || !height) return { width: 0, height: 0, scale: 0 };
  const scale = Math.min(availableWidth / width, availableHeight / height);
  return { width: width * scale, height: height * scale, scale };
}

function imageAnnotationMarkStrokeWidth(mark, baseWidth) {
  return Math.max(0.5, (Number(mark && mark.width) || 0.004) * Math.max(1, baseWidth));
}

/* --------------------------- 评论弹层组件 --------------------------- */

// 纯展示组件（不持有 hooks），输入焦点由 Viewer 通过 inputRef 转交。
function imageAnnotationCommentPopup(props) {
  const draft = props.draft;
  const edit = draft.kind === 'edit';
  const canSave = imageAnnotationNormalizedText(draft.text).length > 0;
  const inputProps = {
    ref: props.inputRef,
    className: 'dsc-ia-popup-input',
    value: draft.text,
    placeholder: '添加评论…',
    'aria-label': edit ? '编辑批注内容' : '批注内容',
    onChange: event => props.onChange(event.target.value),
    onKeyDown: event => {
      if (event.key !== 'Tab') event.stopPropagation();
      if (event.key === 'Escape') {
        event.preventDefault();
        props.onCancel();
        return;
      }
      if (edit) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
          event.preventDefault();
          if (canSave) props.onSave();
        }
        return;
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (canSave) props.onSave();
      }
    }
  };
  return h('div', {
    className: 'dsc-ia-popup ' + (edit ? 'is-edit' : 'is-new') + (props.positioned ? '' : ' is-unpositioned'),
    style: props.position ? { left: props.position.left + 'px', top: props.position.top + 'px' } : undefined,
    role: 'dialog',
    'aria-label': edit ? '编辑批注' : '添加批注',
    'aria-modal': false,
    onPointerDown: event => event.stopPropagation(),
    onClick: event => event.stopPropagation()
  },
    edit
      ? h('textarea', { ...inputProps, rows: 2, className: 'dsc-ia-popup-input dsc-ia-popup-textarea' })
      : h('input', { ...inputProps, type: 'text', autoComplete: 'off', spellCheck: false }),
    edit
      ? h('div', { className: 'dsc-ia-popup-actions' },
        h('button', {
          type: 'button',
          className: 'dsc-ia-popup-trash',
          'aria-label': '删除这条批注',
          title: '删除这条批注',
          onClick: () => props.onDelete()
        }, imageAnnotationIcon('trash', 18)),
        h('div', { className: 'dsc-ia-popup-buttons' },
          h('button', { type: 'button', className: 'dsc-ia-popup-cancel', onClick: () => props.onCancel() }, '取消'),
          h('button', {
            type: 'button',
            className: 'dsc-ia-popup-save',
            disabled: !canSave,
            'aria-disabled': canSave ? undefined : 'true',
            onClick: () => { if (canSave) props.onSave(); }
          }, '保存')))
      : canSave
        ? h('button', {
          type: 'button',
          className: 'dsc-ia-popup-send',
          'aria-label': '保存这条批注',
          title: '保存这条批注',
          onClick: () => props.onSave()
        }, imageAnnotationIcon('arrowUp', 16))
        : null
  );
}

/* --------------------------- 工具条组件 --------------------------- */

function imageAnnotationMarkupToolbar(props) {
  const toolButton = (id, icon, label) => h('button', {
    key: id,
    type: 'button',
    className: 'dsc-ia-tool' + (props.tool === id ? ' is-active' : ''),
    'aria-label': label,
    title: label,
    'aria-pressed': props.tool === id,
    onClick: () => props.onTool(id)
  }, imageAnnotationIcon(icon, 20));
  const shapeMenu = props.shapeMenuOpen ? h('div', { className: 'dsc-ia-menu dsc-ia-shape-menu', role: 'menu', 'aria-label': '选择形状' },
    imageAnnotationShapeList.map(shape => h('button', {
      key: shape.id,
      type: 'button',
      role: 'menuitemradio',
      'aria-checked': props.shape === shape.id && props.tool === 'shape',
      className: 'dsc-ia-menu-item' + (props.shape === shape.id ? ' is-active' : ''),
      title: shape.label,
      onClick: () => props.onShape(shape.id)
    }, imageAnnotationIcon(shape.id, 18), h('span', null, shape.label)))) : null;
  const colorMenu = props.colorMenuOpen ? h('div', { className: 'dsc-ia-menu dsc-ia-color-menu', role: 'menu', 'aria-label': '选择标注颜色' },
    imageAnnotationColors.map(color => h('button', {
      key: color,
      type: 'button',
      role: 'menuitemradio',
      'aria-checked': props.color === color,
      'aria-label': '颜色 ' + color,
      title: color,
      className: 'dsc-ia-color-swatch' + (props.color === color ? ' is-active' : ''),
      style: { background: color },
      onClick: () => props.onColor(color)
    }))) : null;
  const shapeIcon = props.shape === 'ellipse' ? 'ellipse' : props.shape === 'arrow' ? 'arrow' : props.shape === 'line' ? 'line' : 'rect';
  return h('div', {
    className: 'dsc-ia-markup-toolbar',
    role: 'toolbar',
    'aria-label': '手绘标注工具'
  },
    h('button', {
      type: 'button',
      className: 'dsc-ia-grip',
      'data-drag-handle': 'true',
      'aria-label': '拖动标注工具条',
      title: '拖动标注工具条',
      onPointerDown: event => { event.stopPropagation(); props.onDragStart(event); }
    }, imageAnnotationIcon('grip', 16)),
    toolButton('select', 'select', '选择'),
    toolButton('pen', 'pen', '画笔'),
    toolButton('text', 'text', '文字'),
    h('div', { className: 'dsc-ia-tool-wrap' },
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool' + (props.tool === 'shape' ? ' is-active' : ''),
        'aria-label': '形状',
        title: '形状',
        'aria-pressed': props.tool === 'shape',
        'aria-expanded': !!props.shapeMenuOpen,
        onClick: () => props.onTool('shape')
      }, imageAnnotationIcon(shapeIcon, 20)),
      shapeMenu),
    h('div', { className: 'dsc-ia-tool-wrap' },
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool dsc-ia-tool-color',
        'aria-label': '标注颜色',
        title: '标注颜色',
        'aria-expanded': !!props.colorMenuOpen,
        onClick: () => props.onColorMenu()
      }, h('span', { className: 'dsc-ia-color-dot', style: { background: props.color } })),
      colorMenu),
    toolButton('eraser', 'eraser', '橡皮'),
    h('span', { className: 'dsc-ia-divider', 'aria-hidden': true }),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '撤销',
      title: '撤销',
      disabled: !props.canUndo,
      onClick: () => props.onUndo()
    }, imageAnnotationIcon('undo', 20)),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '重做',
      title: '重做',
      disabled: !props.canRedo,
      onClick: () => props.onRedo()
    }, imageAnnotationIcon('redo', 20)),
    h('span', { className: 'dsc-ia-divider', 'aria-hidden': true }),
    h('button', {
      type: 'button',
      className: 'dsc-ia-tool',
      'aria-label': '关闭标注',
      title: '关闭标注',
      onClick: () => props.onClose()
    }, imageAnnotationIcon('close', 20))
  );
}

function imageAnnotationSizeSlider(props) {
  const range = props.range;
  const min = range[0];
  const max = range[1];
  const value = Math.min(max, Math.max(min, Number(props.value) || min));
  const ratio = max > min ? (value - min) / (max - min) : 0;
  const sliderHeight = 192;
  const thumbSize = 16;
  return h('div', {
    className: 'dsc-ia-size-slider' + (props.dragging ? ' is-dragging' : ''),
    role: 'slider',
    tabIndex: 0,
    'aria-label': props.label || '笔宽',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    'aria-valuetext': value + 'px',
    onPointerDown: event => { event.preventDefault(); if (typeof event.currentTarget.focus === 'function') event.currentTarget.focus({ preventScroll: true }); props.onDown(event); },
    onPointerMove: props.onMove,
    onPointerUp: props.onUp,
    onPointerCancel: props.onUp,
    onKeyDown: event => {
      const step = event.shiftKey ? 5 : 1;
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') { event.preventDefault(); props.onChange(Math.min(max, value + step)); }
      else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') { event.preventDefault(); props.onChange(Math.max(min, value - step)); }
      else if (event.key === 'Home') { event.preventDefault(); props.onChange(min); }
      else if (event.key === 'End') { event.preventDefault(); props.onChange(max); }
    }
  },
    h('div', { className: 'dsc-ia-size-rail', 'aria-hidden': true }),
    h('div', {
      className: 'dsc-ia-size-thumb',
      'aria-hidden': true,
      style: { top: (sliderHeight - thumbSize / 2 - ratio * (sliderHeight - thumbSize)) + 'px' }
    })
  );
}

/* --------------------------- 图片旁胶囊 --------------------------- */

function ImageAnnotationPill(props) {
  const count = Math.max(0, Math.floor(Number(props && props.count) || 0));
  if (!count) return null;
  const onOpen = typeof props.onOpen === 'function' ? props.onOpen : null;
  const onClear = typeof props.onClear === 'function' ? props.onClear : null;
  return h('span', { className: 'dsc-ia-pill' },
    h('button', {
      type: 'button',
      className: 'dsc-ia-pill-open',
      title: '查看图片批注',
      'aria-label': '查看图片批注（' + count + ' 条）',
      onClick: event => { event.stopPropagation(); if (onOpen) onOpen(); }
    },
      imageAnnotationIcon('comment', 14),
      h('span', { className: 'dsc-ia-pill-count' }, count + ' 条批注')),
    h('button', {
      type: 'button',
      className: 'dsc-ia-pill-clear',
      title: '清除这张图片的全部批注',
      'aria-label': '清除这张图片的 ' + count + ' 条批注',
      onClick: event => { event.stopPropagation(); if (onClear) onClear(); }
    }, imageAnnotationIcon('close', 12))
  );
}

/* ----------------------------- 主编辑器 ----------------------------- */

function ImageAnnotationViewer(props) {
  const images = Array.isArray(props && props.images) ? props.images.filter(item => item && item.key !== undefined) : [];
  const initialIndex = Number.isFinite(Number(props && props.initialIndex)) ? Math.round(Number(props.initialIndex)) : 0;
  const [index, setIndex] = useState(() => Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1)));
  const [mode, setMode] = useState('preview');
  const [revision, setRevision] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState(() => imageAnnotationViewportSize());
  const [natural, setNatural] = useState(() => {
    const first = images[Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1))];
    return { width: Math.max(0, Number(first && first.width) || 0), height: Math.max(0, Number(first && first.height) || 0) };
  });
  const [panning, setPanning] = useState(false);
  const [draft, setDraft] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [commentCursor, setCommentCursor] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [markupTool, setMarkupTool] = useState('pen');
  const [markupColor, setMarkupColor] = useState(imageAnnotationDefaultColor);
  const [markupWidth, setMarkupWidth] = useState(4);
  const [markupTextSize, setMarkupTextSize] = useState(24);
  const [markupShape, setMarkupShape] = useState('rect');
  const [shapeMenuOpen, setShapeMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [selectedMarkId, setSelectedMarkId] = useState(null);
  const [drawing, setDrawing] = useState(null);
  const [markDrag, setMarkDrag] = useState(null);
  const [textDraft, setTextDraft] = useState(null);
  const [textPosition, setTextPosition] = useState(null);
  const [sliderDrag, setSliderDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const keyHandlerRef = useRef(null);
  const focusedDraftRef = useRef(null);
  const toolbarRef = useRef(null);
  const bottomRef = useRef(null);
  const markupToolbarRef = useRef(null);
  const fallbackStoreRef = useRef(null);
  if (!fallbackStoreRef.current) fallbackStoreRef.current = createImageAnnotationStore();
  const store = props && props.store && typeof props.store.get === 'function' ? props.store : fallbackStoreRef.current;
  const activeImage = images[index] || null;
  const activeKey = activeImage ? activeImage.key : undefined;
  const activeKeyRef = useRef(activeKey);
  activeKeyRef.current = activeKey;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const textDraftRef = useRef(textDraft);
  textDraftRef.current = textDraft;
  const drawingRef = useRef(drawing);
  drawingRef.current = drawing;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const panRef = useRef(pan);
  panRef.current = pan;
  const stagePointerRef = useRef(null);
  const markupPointerRef = useRef(null);
  const markDragRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderDragRef = useRef(false);
  const toolbarDragRef = useRef(null);
  const savingRef = useRef(false);
  const previousFocusRef = useRef(null);

  const state = store.get(activeKey);
  const comments = Array.isArray(state && state.comments) ? state.comments : [];
  const marks = Array.isArray(state && state.marks) ? state.marks : [];
  const canUndo = Array.isArray(state && state.markupUndo) && state.markupUndo.length > 0;
  const canRedo = Array.isArray(state && state.markupRedo) && state.markupRedo.length > 0;

  const bump = () => setRevision(value => value + 1);

  useEffect(() => {
    if (!store || typeof store.subscribe !== 'function') return undefined;
    return store.subscribe(() => bump());
  }, [store]);

  useEffect(() => {
    const handleResize = () => setViewport(imageAnnotationViewportSize());
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  useEffect(() => {
    setNatural({ width: Math.max(0, Number(activeImage && activeImage.width) || 0), height: Math.max(0, Number(activeImage && activeImage.height) || 0) });
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedMarkId(null);
    setDrawing(null);
    setTextDraft(null);
    setCommentCursor(null);
    setDraft(null);
    setPopupPosition(null);
  }, [activeKey]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof node.addEventListener !== 'function') return undefined;
    const handleWheel = event => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      setZoom(current => Math.min(imageAnnotationMaxZoom, Math.max(imageAnnotationMinZoom, current * factor)));
    };
    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, []);

  useLayoutEffect(() => {
    previousFocusRef.current = typeof document !== 'undefined' ? document.activeElement : null;
    const node = rootRef.current;
    if (node && typeof node.focus === 'function') node.focus({ preventScroll: true });
    return () => {
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === 'function' && previous.isConnected !== false) previous.focus({ preventScroll: true });
    };
  }, []);

  // 点击图片后浏览器可能把焦点移到 body；此时 root 的合成事件收不到按键。
  // 用 document 兜底处理“焦点在对话框外”的 Esc/快捷键，并把 Tab 拉回对话框。
  useEffect(() => {
    if (typeof document === 'undefined' || typeof document.addEventListener !== 'function') return undefined;
    const listener = event => {
      const root = rootRef.current;
      const inside = !!(root && typeof root.contains === 'function' && root.contains(event.target));
      if (!inside && event.key === 'Tab') {
        event.preventDefault();
        if (root && typeof root.focus === 'function') root.focus({ preventScroll: true });
        return;
      }
      if (inside) return;
      const handler = keyHandlerRef.current;
      if (typeof handler === 'function') handler(event);
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  // 弹层位置：点中心间隔 27px、避边 8px；缩放、平移、切图与窗口变化都重新定位。
  useLayoutEffect(() => {
    const target = draft || textDraft;
    if (!target) { setPopupPosition(null); setTextPosition(null); return; }
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return;
    const rect = node.getBoundingClientRect();
    const dotRect = {
      left: rect.left + target.x * rect.width - imageAnnotationDotSize / 2,
      top: rect.top + target.y * rect.height - imageAnnotationDotSize / 2,
      width: imageAnnotationDotSize,
      height: imageAnnotationDotSize
    };
    if (draft) {
      const edit = draft.kind === 'edit';
      setPopupPosition(imageAnnotationPlacePopup(dotRect, { width: imageAnnotationPopupWidth, height: edit ? imageAnnotationEditHeight : imageAnnotationNewHeight }, imageAnnotationViewportSize()));
    }
    if (textDraft) {
      setTextPosition(imageAnnotationPlacePopup(dotRect, { width: 240, height: 38 }, imageAnnotationViewportSize()));
    }
  }, [draft, textDraft, zoom, pan, index, viewport.width, viewport.height, revision]);

  // 定位就绪前弹层 visibility:hidden，focus() 不会生效；等位置写入后再聚焦一次。
  // 用草稿标识去重，文本变化重新定位不会重复聚焦或跳光标。
  useLayoutEffect(() => {
    const active = draft
      ? 'draft:' + draft.kind + ':' + (draft.kind === 'edit' ? draft.id : draft.x + ',' + draft.y)
      : textDraft
        ? 'text:' + (textDraft.id || textDraft.x + ',' + textDraft.y)
        : null;
    if (!active) {
      focusedDraftRef.current = null;
      return;
    }
    if (focusedDraftRef.current === active) return;
    if (draft && !popupPosition) return;
    if (textDraft && !textPosition) return;
    const node = inputRef.current;
    if (!node || typeof node.focus !== 'function') return;
    node.focus({ preventScroll: true });
    if (typeof node.setSelectionRange === 'function' && typeof node.value === 'string') {
      const end = node.value.length;
      node.setSelectionRange(end, end);
    }
    focusedDraftRef.current = active;
  }, [
    draft ? draft.kind + ':' + (draft.kind === 'edit' ? draft.id : draft.x + ',' + draft.y) : null,
    textDraft ? 'text:' + (textDraft.id || textDraft.x + ',' + textDraft.y) : null,
    popupPosition,
    textPosition
  ]);

  const naturalWidth = natural.width;
  const naturalHeight = natural.height;
  const fit = imageAnnotationFitBox({ width: naturalWidth, height: naturalHeight }, viewport);
  const baseWidth = fit.width;
  const baseHeight = fit.height;
  const imageName = (activeImage && (activeImage.name || activeImage.src)) || '图片';

  // 在打开草稿的同一事件里先算好位置，使弹层首帧即定位就绪，focus 才能生效。
  const measurePopupPosition = (target, isText) => {
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return null;
    const rect = node.getBoundingClientRect();
    const width = Math.max(1, Number(rect.width) || 1);
    const height = Math.max(1, Number(rect.height) || 1);
    const dotRect = {
      left: (Number(rect.left) || 0) + target.x * width - imageAnnotationDotSize / 2,
      top: (Number(rect.top) || 0) + target.y * height - imageAnnotationDotSize / 2,
      width: imageAnnotationDotSize,
      height: imageAnnotationDotSize
    };
    const size = isText
      ? { width: 240, height: 38 }
      : { width: imageAnnotationPopupWidth, height: target.kind === 'edit' ? imageAnnotationEditHeight : imageAnnotationNewHeight };
    return imageAnnotationPlacePopup(dotRect, size, imageAnnotationViewportSize());
  };

  const closeMenus = () => {
    setZoomMenuOpen(false);
    setShapeMenuOpen(false);
    setColorMenuOpen(false);
  };

  const flushDraft = () => {
    const current = draftRef.current;
    if (!current) return false;
    const key = activeKeyRef.current;
    const text = imageAnnotationNormalizedText(current.text);
    if (text) {
      if (current.kind === 'new') store.set(key, imageAnnotationAddComment(store.get(key), { text, x: current.x, y: current.y }));
      else store.set(key, imageAnnotationUpdateComment(store.get(key), current.id, text));
    }
    setDraft(null);
    draftRef.current = null;
    return true;
  };

  // 非空手绘文字草稿在切图/关闭/退出标注时提交；只有显式取消（Esc/取消按钮）才丢弃。
  const commitTextDraft = () => {
    const current = textDraftRef.current;
    if (!current) return false;
    const key = activeKeyRef.current;
    const text = imageAnnotationNormalizedText(current.text);
    if (text) {
      if (current.id) {
        store.set(key, imageAnnotationReplaceMark(store.get(key), current.id, { text }));
      } else {
        const color = current.color || markupColor;
        const size = (Number(current.size) || markupTextSize) / Math.max(1, baseWidth);
        store.set(key, imageAnnotationAddMark(store.get(key), { type: 'text', text, x: current.x, y: current.y, color, size }));
      }
    }
    setTextDraft(null);
    textDraftRef.current = null;
    setTextPosition(null);
    return true;
  };

  const openNewDraft = point => {
    commitTextDraft();
    flushDraft();
    closeMenus();
    setSelectedMarkId(null);
    const nextDraft = { kind: 'new', x: point.x, y: point.y, text: '' };
    setPopupPosition(measurePopupPosition(nextDraft));
    setDraft(nextDraft);
  };

  const openEditDraft = comment => {
    commitTextDraft();
    flushDraft();
    if (modeRef.current !== 'comment') setMode('comment');
    const nextDraft = { kind: 'edit', id: comment.id, text: comment.text, x: comment.x, y: comment.y };
    setPopupPosition(measurePopupPosition(nextDraft));
    setDraft(nextDraft);
  };

  const saveDraft = () => {
    const current = draftRef.current;
    if (!current) return;
    const text = imageAnnotationNormalizedText(current.text);
    if (!text) return;
    const key = activeKeyRef.current;
    if (current.kind === 'new') store.set(key, imageAnnotationAddComment(store.get(key), { text, x: current.x, y: current.y }));
    else store.set(key, imageAnnotationUpdateComment(store.get(key), current.id, text));
    setDraft(null);
    draftRef.current = null;
  };

  const cancelDraft = () => {
    setDraft(null);
    draftRef.current = null;
  };

  const deleteDraft = () => {
    const current = draftRef.current;
    if (current && current.kind === 'edit') store.set(activeKeyRef.current, imageAnnotationRemoveComment(store.get(activeKeyRef.current), current.id));
    setDraft(null);
    draftRef.current = null;
  };

  const requestClose = () => {
    commitTextDraft();
    flushDraft();
    if (typeof props.onClose === 'function') props.onClose();
  };

  const switchImage = nextIndex => {
    commitTextDraft();
    flushDraft();
    setIndex(nextIndex);
  };

  const enterMode = nextMode => {
    commitTextDraft();
    flushDraft();
    closeMenus();
    setSelectedMarkId(null);
    setDrawing(null);
    setDraft(null);
    setMode(nextMode);
  };

  const completeAnnotation = async () => {
    if (savingRef.current) return;
    commitTextDraft();
    flushDraft();
    const image = images[index];
    if (!image) return;
    if (typeof props.onComplete !== 'function') {
      if (typeof props.onClose === 'function') props.onClose();
      else setMode('preview');
      return;
    }
    const payload = {
      image,
      state: store.get(image.key),
      all: images.map((item, itemIndex) => ({ ...item, number: itemIndex + 1, state: store.get(item.key) }))
    };
    savingRef.current = true;
    setSaving(true);
    setError('');
    try {
      const pending = props.onComplete(payload);
      if (pending && typeof pending.then === 'function') await pending;
      savingRef.current = false;
      setSaving(false);
      if (typeof props.onClose === 'function') props.onClose();
      else setMode('preview');
    } catch (failure) {
      savingRef.current = false;
      setSaving(false);
      setError('批注保存失败：' + imageAnnotationErrorText(failure));
    }
  };

  const undoMarkup = () => store.set(activeKey, imageAnnotationUndoMarkup(store.get(activeKey)));
  const redoMarkup = () => store.set(activeKey, imageAnnotationRedoMarkup(store.get(activeKey)));
  const deleteSelectedMark = () => {
    if (!selectedMarkId) return;
    store.set(activeKey, imageAnnotationRemoveMark(store.get(activeKey), selectedMarkId));
    setSelectedMarkId(null);
  };

  const downloadImage = () => {
    if (!activeImage) return;
    if (typeof props.onDownload === 'function') { props.onDownload(activeImage); return; }
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') return;
    const link = document.createElement('a');
    link.href = activeImage.src || '';
    link.download = activeImage.name || 'image.png';
    link.rel = 'noopener';
    if (document.body && typeof document.body.appendChild === 'function') {
      document.body.appendChild(link);
      if (typeof link.click === 'function') link.click();
      if (typeof link.remove === 'function') link.remove();
      else if (typeof document.body.removeChild === 'function') document.body.removeChild(link);
    }
  };

  /* --------------------------- 指针与绘制 --------------------------- */

  const canvasPoint = event => {
    const node = canvasRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') {
      return imageAnnotationPointFromClient({ left: 0, top: 0, width: 1, height: 1 }, event.clientX, event.clientY);
    }
    return imageAnnotationPointFromClient(node.getBoundingClientRect(), event.clientX, event.clientY);
  };

  const beginStagePointer = event => {
    if (event.button !== undefined && event.button !== 0) return;
    if (modeRef.current === 'markup') return;
    // 导航等交互控件自行处理点击；若在此捕获指针，click 目标会变成 stage，按钮失效并可能误落点。
    if (event.target && typeof event.target.closest === 'function' && event.target.closest('button, [role="button"], a, input, textarea, select')) return;
    if (typeof event.preventDefault === 'function') event.preventDefault();
    closeMenus();
    const point = canvasPoint(event);
    stagePointerRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      mode: modeRef.current,
      point
    };
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略不支持捕获的环境 */ }
    }
    if (modeRef.current === 'comment') setCommentCursor(point);
  };

  const moveStagePointer = event => {
    const pointer = stagePointerRef.current;
    if (!pointer) {
      if (modeRef.current === 'comment') setCommentCursor(canvasPoint(event));
      return;
    }
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (!pointer.moved && Math.sqrt(dx * dx + dy * dy) > imageAnnotationDragThreshold) {
      pointer.moved = true;
      pointer.basePan = { x: panRef.current.x, y: panRef.current.y };
      setPanning(true);
      if (modeRef.current === 'comment') setCommentCursor(null);
    }
    if (pointer.moved) setPan({ x: pointer.basePan.x + dx, y: pointer.basePan.y + dy });
  };

  const endStagePointer = event => {
    const pointer = stagePointerRef.current;
    stagePointerRef.current = null;
    setPanning(false);
    setCommentCursor(null);
    if (!pointer) return;
    if (!pointer.moved && pointer.mode === 'comment') openNewDraft(canvasPoint(event));
  };

  const cancelStagePointer = () => {
    stagePointerRef.current = null;
    setPanning(false);
    setCommentCursor(null);
  };

  const beginMarkupPointer = event => {
    if (event.button !== undefined && event.button !== 0) return;
    if (!baseWidth || !baseHeight) return;
    const point = canvasPoint(event);
    closeMenus();
    if (markupTool === 'select') { setSelectedMarkId(null); return; }
    if (markupTool === 'text') {
      commitTextDraft();
      const nextDraft = { id: null, x: point.x, y: point.y, text: '', color: markupColor, size: markupTextSize };
      setTextPosition(measurePopupPosition(nextDraft, true));
      setTextDraft(nextDraft);
      textDraftRef.current = nextDraft;
      return;
    }
    if (markupTool === 'eraser') return;
    if (markupTool === 'pen') {
      markupPointerRef.current = { pointerId: event.pointerId, points: [point] };
      setDrawing({ kind: 'stroke', points: [point], color: markupColor, width: markupWidth });
    } else {
      markupPointerRef.current = { pointerId: event.pointerId, start: point, shape: markupShape };
      setDrawing({ kind: 'shape', shape: markupShape, x1: point.x, y1: point.y, x2: point.x, y2: point.y, color: markupColor, width: markupWidth });
    }
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveMarkupPointer = event => {
    const pointer = markupPointerRef.current;
    if (!pointer) return;
    const point = canvasPoint(event);
    const current = drawingRef.current;
    if (!current) return;
    if (current.kind === 'stroke') {
      pointer.points.push(point);
      setDrawing({ ...current, points: pointer.points.slice() });
    } else {
      setDrawing({ ...current, x2: point.x, y2: point.y });
    }
  };

  const endMarkupPointer = () => {
    const pointer = markupPointerRef.current;
    markupPointerRef.current = null;
    const current = drawingRef.current;
    setDrawing(null);
    if (!pointer || !current || !baseWidth || !baseHeight) return;
    const key = activeKeyRef.current;
    if (current.kind === 'stroke') {
      if (current.points.length < 2) return;
      store.set(key, imageAnnotationAddMark(store.get(key), {
        type: 'stroke',
        color: current.color,
        width: current.width / Math.max(1, baseWidth),
        points: current.points.map(point => ({ x: point.x, y: point.y }))
      }));
      return;
    }
    const dx = Math.abs(current.x2 - current.x1) * baseWidth;
    const dy = Math.abs(current.y2 - current.y1) * baseHeight;
    if (dx < 3 && dy < 3) return;
    store.set(key, imageAnnotationAddMark(store.get(key), {
      type: current.shape,
      color: current.color,
      width: current.width / Math.max(1, baseWidth),
      x1: current.x1,
      y1: current.y1,
      x2: current.x2,
      y2: current.y2
    }));
  };

  const beginMarkDrag = (event, mark) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.stopPropagation();
    if (markupTool === 'eraser') {
      event.preventDefault();
      store.set(activeKeyRef.current, imageAnnotationRemoveMark(store.get(activeKeyRef.current), mark.id));
      return;
    }
    if (markupTool !== 'select') return;
    event.preventDefault();
    setSelectedMarkId(mark.id);
    markDragRef.current = { id: mark.id, startX: event.clientX, startY: event.clientY, dx: 0, dy: 0 };
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveMarkDrag = event => {
    const drag = markDragRef.current;
    if (!drag || !baseWidth || !baseHeight) return;
    const width = Math.max(1, baseWidth * zoomRef.current);
    const height = Math.max(1, baseHeight * zoomRef.current);
    drag.dx = (event.clientX - drag.startX) / width;
    drag.dy = (event.clientY - drag.startY) / height;
    setMarkDrag({ id: drag.id, dx: drag.dx, dy: drag.dy });
  };

  const endMarkDrag = () => {
    const drag = markDragRef.current;
    markDragRef.current = null;
    setMarkDrag(null);
    if (!drag || (!drag.dx && !drag.dy)) return;
    store.set(activeKeyRef.current, imageAnnotationMoveMark(store.get(activeKeyRef.current), drag.id, drag.dx, drag.dy));
  };

  const openTextEditor = (mark, event) => {
    if (event) event.stopPropagation();
    if (markupTool !== 'select') return;
    commitTextDraft();
    const nextDraft = { id: mark.id, x: mark.x, y: mark.y, text: mark.text || '', color: mark.color };
    setTextPosition(measurePopupPosition(nextDraft, true));
    setTextDraft(nextDraft);
    textDraftRef.current = nextDraft;
  };

  // 确定按钮/Enter 与关闭、切图共用同一提交逻辑：非空保存，空则清除。
  const saveTextDraft = () => {
    commitTextDraft();
  };

  const cancelTextDraft = () => {
    setTextDraft(null);
    textDraftRef.current = null;
    setTextPosition(null);
  };

  /* --------------------------- 拖动工具条 --------------------------- */

  const beginToolbarDrag = event => {
    if (event.button !== undefined && event.button !== 0) return;
    const target = event.target;
    if (target && typeof target.closest === 'function') {
      const handle = target.closest('[data-drag-handle]');
      if (!handle && target.closest('button, input, textarea, [role="slider"]')) return;
    }
    event.preventDefault();
    const node = event.currentTarget;
    const container = target && typeof target.closest === 'function' ? target.closest('[data-drag-container]') : null;
    const rectNode = container || node;
    if (!rectNode || typeof rectNode.getBoundingClientRect !== 'function') return;
    toolbarDragRef.current = { startX: event.clientX, startY: event.clientY, rect: rectNode.getBoundingClientRect(), startOffset: offset };
    if (typeof node.setPointerCapture === 'function') {
      try { node.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略不支持捕获的环境 */ }
    }
  };

  const moveToolbarDrag = event => {
    const drag = toolbarDragRef.current;
    if (!drag) return;
    const next = imageAnnotationClampDrag(drag.rect, event.clientX - drag.startX, event.clientY - drag.startY, imageAnnotationViewportSize(), 8);
    setOffset({ x: drag.startOffset.x + next.x, y: drag.startOffset.y + next.y });
  };

  const endToolbarDrag = () => {
    toolbarDragRef.current = null;
  };

  /* --------------------------- 尺寸滑条 --------------------------- */

  const activeSliderValue = markupTool === 'text' ? markupTextSize : markupWidth;
  const activeSliderRange = imageAnnotationWidthRanges[markupTool] || imageAnnotationWidthRanges.pen;

  const setSliderValue = value => {
    if (markupTool === 'text') setMarkupTextSize(value);
    else setMarkupWidth(value);
  };

  const sliderValueFromEvent = event => {
    const node = sliderRef.current;
    if (!node || typeof node.getBoundingClientRect !== 'function') return activeSliderValue;
    const rect = node.getBoundingClientRect();
    const inner = Math.max(1, rect.height - 32);
    const ratio = Math.min(1, Math.max(0, (rect.bottom - 16 - event.clientY) / inner));
    return Math.round(activeSliderRange[0] + ratio * (activeSliderRange[1] - activeSliderRange[0]));
  };

  const beginSliderDrag = event => {
    event.preventDefault();
    sliderDragRef.current = true;
    setSliderDrag(true);
    setSliderValue(sliderValueFromEvent(event));
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch (captureError) { /* 忽略 */ }
    }
  };

  const moveSliderDrag = event => {
    if (!sliderDragRef.current) return;
    setSliderValue(sliderValueFromEvent(event));
  };

  const endSliderDrag = () => {
    sliderDragRef.current = false;
    setSliderDrag(false);
  };

  /* --------------------------- 键盘与焦点 --------------------------- */

  const handleRootKeyDown = event => {
    if (event.defaultPrevented) return;
    if (imageAnnotationIsTextInput(event.target)) return;
    const key = event.key;
    if (key === 'Escape') {
      event.preventDefault();
      if (draftRef.current) { cancelDraft(); return; }
      if (textDraftRef.current) { cancelTextDraft(); return; }
      if (zoomMenuOpen || shapeMenuOpen || colorMenuOpen) { closeMenus(); return; }
      if (selectedMarkId) { setSelectedMarkId(null); return; }
      requestClose();
      return;
    }
    if (key === 'Tab') {
      const root = rootRef.current;
      if (!root || typeof root.querySelectorAll !== 'function') return;
      const focusables = Array.from(root.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'))
        .filter(node => !node.disabled && node.getAttribute('aria-disabled') !== 'true' && node.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = typeof document !== 'undefined' ? document.activeElement : null;
      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !root.contains(current))) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (key === 'Delete' || key === 'Backspace') {
      if (selectedMarkId) { event.preventDefault(); deleteSelectedMark(); }
      return;
    }
    if (key === '+' || key === '=') {
      event.preventDefault();
      setZoom(current => Math.min(imageAnnotationMaxZoom, current * 1.2));
      return;
    }
    if (key === '-') {
      event.preventDefault();
      setZoom(current => Math.max(imageAnnotationMinZoom, current / 1.2));
      return;
    }
    if (key === '0') {
      event.preventDefault();
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }
    if (images.length > 1 && (key === 'ArrowLeft' || key === 'ArrowRight')) {
      event.preventDefault();
      const next = key === 'ArrowLeft' ? index - 1 : index + 1;
      if (next >= 0 && next < images.length) switchImage(next);
    }
  };
  keyHandlerRef.current = handleRootKeyDown;

  /* --------------------------- 渲染辅助 --------------------------- */

  const renderMarkElement = mark => {
    if (!baseWidth || !baseHeight) return null;
    const color = mark.color || imageAnnotationDefaultColor;
    const strokeWidth = imageAnnotationMarkStrokeWidth(mark, baseWidth);
    const selected = mark.id === selectedMarkId;
    const dragOffset = markDrag && markDrag.id === mark.id ? markDrag : null;
    const translate = dragOffset ? 'translate(' + dragOffset.dx * baseWidth + ' ' + dragOffset.dy * baseHeight + ')' : undefined;
    const handlers = {
      className: 'dsc-ia-mark',
      'data-mark-id': mark.id,
      onPointerDown: event => beginMarkDrag(event, mark),
      onPointerMove: moveMarkDrag,
      onPointerUp: endMarkDrag,
      onDoubleClick: event => openTextEditor(mark, event)
    };
    let shape = null;
    if (mark.type === 'stroke' && Array.isArray(mark.points) && mark.points.length > 1) {
      const points = mark.points.map(point => (point.x * baseWidth) + ',' + (point.y * baseHeight)).join(' ');
      shape = h('polyline', { points, fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' });
    } else if (mark.type === 'text') {
      shape = h('text', {
        x: mark.x * baseWidth,
        y: mark.y * baseHeight,
        fill: color,
        fontSize: Math.max(8, (Number(mark.size) || 0.03) * baseWidth),
        fontFamily: '"Segoe UI", "Microsoft YaHei", sans-serif',
        fontWeight: 600,
        dominantBaseline: 'hanging',
        style: { userSelect: 'none' }
      }, String(mark.text || ''));
    } else if (typeof mark.x1 === 'number') {
      const x1 = mark.x1 * baseWidth, y1 = mark.y1 * baseHeight, x2 = mark.x2 * baseWidth, y2 = mark.y2 * baseHeight;
      if (mark.type === 'rect') {
        shape = h('rect', { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), fill: 'none', stroke: color, strokeWidth });
      } else if (mark.type === 'ellipse') {
        shape = h('ellipse', { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx: Math.abs(x2 - x1) / 2, ry: Math.abs(y2 - y1) / 2, fill: 'none', stroke: color, strokeWidth });
      } else {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const head = Math.max(8, strokeWidth * 3.2);
        const points = mark.type === 'arrow'
          ? [
            String(x2) + ',' + String(y2),
            String(x2 - head * Math.cos(angle - Math.PI / 6)) + ',' + String(y2 - head * Math.sin(angle - Math.PI / 6)),
            String(x2 - head * Math.cos(angle + Math.PI / 6)) + ',' + String(y2 - head * Math.sin(angle + Math.PI / 6))
          ].join(' ')
          : null;
        shape = h('g', null,
          h('line', { x1, y1, x2, y2, stroke: color, strokeWidth, strokeLinecap: 'round' }),
          points && h('polygon', { points, fill: color, stroke: 'none' }));
      }
    }
    const bounds = selected ? imageAnnotationMarkBounds(mark) : null;
    return h('g', {
      key: mark.id,
      transform: translate,
      ...handlers
    },
      shape,
      selected && bounds
        ? h('rect', {
          className: 'dsc-ia-selection',
          x: bounds.x1 * baseWidth - 3,
          y: bounds.y1 * baseHeight - 3,
          width: Math.max(6, (bounds.x2 - bounds.x1) * baseWidth + 6),
          height: Math.max(6, (bounds.y2 - bounds.y1) * baseHeight + 6),
          fill: 'none',
          stroke: '#8bc3fe',
          strokeWidth: 1,
          strokeDasharray: '4 3',
          pointerEvents: 'none'
        })
        : null);
  };

  const renderDrawing = () => {
    if (!drawing || !baseWidth || !baseHeight) return null;
    if (drawing.kind === 'stroke') {
      const points = drawing.points.map(point => (point.x * baseWidth) + ',' + (point.y * baseHeight)).join(' ');
      return h('polyline', { points, fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, strokeLinecap: 'round', strokeLinejoin: 'round', pointerEvents: 'none' });
    }
    const x1 = drawing.x1 * baseWidth, y1 = drawing.y1 * baseHeight, x2 = drawing.x2 * baseWidth, y2 = drawing.y2 * baseHeight;
    if (drawing.shape === 'rect') return h('rect', { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, pointerEvents: 'none' });
    if (drawing.shape === 'ellipse') return h('ellipse', { cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, rx: Math.abs(x2 - x1) / 2, ry: Math.abs(y2 - y1) / 2, fill: 'none', stroke: drawing.color, strokeWidth: drawing.width, pointerEvents: 'none' });
    return h('line', { x1, y1, x2, y2, stroke: drawing.color, strokeWidth: drawing.width, strokeLinecap: 'round', pointerEvents: 'none' });
  };

  const dots = comments.map((comment, commentIndex) => h('button', {
    key: comment.id,
    type: 'button',
    className: 'dsc-ia-dot' + (draft && draft.kind === 'edit' && draft.id === comment.id ? ' is-active' : ''),
    style: {
      left: (comment.x * 100) + '%',
      top: (comment.y * 100) + '%',
      '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom))
    },
    title: comment.text,
    'aria-label': '第 ' + (commentIndex + 1) + ' 条批注：' + comment.text,
    onPointerDown: event => event.stopPropagation(),
    onClick: event => { event.stopPropagation(); openEditDraft(comment); }
  }, h('span', { className: 'dsc-ia-dot-label', 'aria-hidden': true }, String(commentIndex + 1))));

  // 新建评论立即在落点显示下一个编号；保存后由正式点替换，不计入已保存数量。
  const draftDot = draft && draft.kind === 'new'
    ? h('span', {
      className: 'dsc-ia-dot is-active is-draft',
      'aria-hidden': true,
      style: {
        left: (draft.x * 100) + '%',
        top: (draft.y * 100) + '%',
        '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom))
      }
    }, h('span', { className: 'dsc-ia-dot-label' }, String(comments.length + 1)))
    : null;

  const toolbar = mode === 'preview'
    ? h('div', {
      ref: toolbarRef,
      className: 'dsc-ia-toolbar',
      role: 'toolbar',
      'aria-label': '图片操作',
      'data-drag-container': 'true',
      style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
      onPointerDown: beginToolbarDrag,
      onPointerMove: moveToolbarDrag,
      onPointerUp: endToolbarDrag,
      onPointerCancel: endToolbarDrag
    },
      h('button', { type: 'button', className: 'dsc-ia-toolbar-button', title: '手绘标注', onClick: () => enterMode('markup') }, imageAnnotationIcon('pen', 18), h('span', null, '标注')),
      h('button', { type: 'button', className: 'dsc-ia-toolbar-button', title: '添加评论', onClick: () => enterMode('comment') }, imageAnnotationIcon('comment', 18), h('span', null, '添加评论')))
    : null;

  const bottomBar = mode === 'comment'
    ? h('div', {
      ref: bottomRef,
      className: 'dsc-ia-bottom',
      role: 'toolbar',
      'aria-label': '批注操作',
      'data-drag-container': 'true',
      style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
      onPointerDown: beginToolbarDrag,
      onPointerMove: moveToolbarDrag,
      onPointerUp: endToolbarDrag,
      onPointerCancel: endToolbarDrag
    },
      h('button', {
        type: 'button',
        className: 'dsc-ia-grip',
        'data-drag-handle': 'true',
        'aria-label': '拖动批注栏',
        title: '拖动批注栏'
      }, imageAnnotationIcon('grip', 16)),
      h('span', { className: 'dsc-ia-bottom-label', role: 'status' }, comments.length ? comments.length + ' 条批注' : '点击图像以添加评论'),
      h('button', {
        type: 'button',
        className: 'dsc-ia-primary',
        'aria-busy': saving ? 'true' : undefined,
        onClick: completeAnnotation
      }, saving ? '保存中…' : '完成批注'),
      h('button', {
        type: 'button',
        className: 'dsc-ia-tool',
        'aria-label': '退出批注模式',
        title: '退出批注模式',
        onClick: () => { flushDraft(); closeMenus(); setMode('preview'); }
      }, imageAnnotationIcon('close', 18)))
    : null;

  const markupToolbar = mode === 'markup'
    ? h(React.Fragment, null,
      h('div', {
        ref: markupToolbarRef,
        className: 'dsc-ia-markup-anchor',
        'data-drag-container': 'true',
        style: { transform: 'translateX(-50%) translate(' + offset.x + 'px, ' + offset.y + 'px)' },
        onPointerDown: beginToolbarDrag,
        onPointerMove: moveToolbarDrag,
        onPointerUp: endToolbarDrag,
        onPointerCancel: endToolbarDrag
      },
        h(imageAnnotationMarkupToolbar, {
          tool: markupTool,
          shape: markupShape,
          color: markupColor,
          canUndo,
          canRedo,
          shapeMenuOpen,
          colorMenuOpen,
          onTool: nextTool => {
            closeMenus();
            setMarkupTool(nextTool);
            if (nextTool === 'shape') setShapeMenuOpen(true);
            setSelectedMarkId(null);
          },
          onShape: shapeId => { setMarkupShape(shapeId); setMarkupTool('shape'); setShapeMenuOpen(false); },
          onColorMenu: () => { closeMenus(); setColorMenuOpen(!colorMenuOpen); },
          onColor: color => { setMarkupColor(color); setColorMenuOpen(false); },
          onUndo: undoMarkup,
          onRedo: redoMarkup,
          onClose: () => { commitTextDraft(); closeMenus(); setSelectedMarkId(null); setDrawing(null); setMode('preview'); },
          onDragStart: beginToolbarDrag
        })),
      // 橡皮按对象擦除，没有半径语义；选择工具也没有笔宽，均不显示尺寸滑条。
      markupTool === 'select' || markupTool === 'eraser'
        ? null
        : h(imageAnnotationSizeSlider, {
          value: activeSliderValue,
          range: activeSliderRange,
          label: markupTool === 'text' ? '文字大小' : '笔宽',
          dragging: sliderDrag,
          onDown: event => { sliderRef.current = event.currentTarget; beginSliderDrag(event); },
          onMove: moveSliderDrag,
          onUp: endSliderDrag,
          onChange: value => setSliderValue(Math.min(activeSliderRange[1], Math.max(activeSliderRange[0], value)))
        }))
    : null;

  const popup = draft
    ? h(imageAnnotationCommentPopup, {
      draft,
      inputRef,
      position: popupPosition,
      positioned: !!popupPosition,
      onChange: value => setDraft(current => {
        if (!current) return current;
        const next = { ...current, text: value };
        draftRef.current = next;
        return next;
      }),
      onSave: saveDraft,
      onCancel: cancelDraft,
      onDelete: deleteDraft
    })
    : null;

  const textEditor = textDraft
    ? h('div', {
      className: 'dsc-ia-text-editor' + (textPosition ? '' : ' is-unpositioned'),
      style: textPosition ? { left: textPosition.left + 'px', top: textPosition.top + 'px' } : undefined,
      onPointerDown: event => event.stopPropagation(),
      onClick: event => event.stopPropagation()
    },
      h('input', {
        ref: inputRef,
        className: 'dsc-ia-text-input',
        value: textDraft.text,
        placeholder: '输入文字…',
        'aria-label': '标注文字',
        onChange: event => setTextDraft(current => {
          if (!current) return current;
          const next = { ...current, text: event.target.value };
          textDraftRef.current = next;
          return next;
        }),
        onKeyDown: event => {
          if (event.key !== 'Tab') event.stopPropagation();
          if (event.key === 'Escape') { event.preventDefault(); cancelTextDraft(); }
          else if (event.key === 'Enter') { event.preventDefault(); saveTextDraft(); }
        }
      }),
      h('div', { className: 'dsc-ia-text-actions' },
        h('button', { type: 'button', className: 'dsc-ia-popup-cancel', onClick: cancelTextDraft }, '取消'),
        h('button', { type: 'button', className: 'dsc-ia-popup-save', onClick: saveTextDraft, disabled: !imageAnnotationNormalizedText(textDraft.text) }, '确定')))
    : null;

  const zoomMenu = zoomMenuOpen
    ? h('div', { className: 'dsc-ia-menu dsc-ia-zoom-menu', role: 'menu', 'aria-label': '缩放比例' },
      h('button', { type: 'button', role: 'menuitem', className: 'dsc-ia-menu-item', onClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); setZoomMenuOpen(false); } }, '适应窗口'),
      [0.5, 1, 2].map(level => h('button', {
        key: level,
        type: 'button',
        role: 'menuitem',
        className: 'dsc-ia-menu-item' + (Math.abs(zoom - level) < 0.001 ? ' is-active' : ''),
        onClick: () => { setZoom(level); setZoomMenuOpen(false); }
      }, Math.round(level * 100) + '%')))
    : null;

  const stage = h('div', {
    ref: stageRef,
    className: 'dsc-ia-stage' + (panning ? ' is-panning' : ''),
    'data-mode': mode,
    style: { cursor: mode === 'comment' ? 'crosshair' : mode === 'markup' ? 'default' : panning ? 'grabbing' : 'grab' },
    onPointerDown: beginStagePointer,
    onPointerMove: moveStagePointer,
    onPointerUp: endStagePointer,
    onPointerCancel: cancelStagePointer,
    onPointerLeave: () => setCommentCursor(null)
  },
    h('div', {
      ref: canvasRef,
      className: 'dsc-ia-canvas',
      style: {
        width: baseWidth ? baseWidth + 'px' : '1px',
        height: baseHeight ? baseHeight + 'px' : '1px',
        transform: 'translate(-50%, -50%) translate(' + pan.x + 'px, ' + pan.y + 'px) scale(' + zoom + ')'
      }
    },
      h('img', {
        key: activeKey === undefined ? 'empty' : String(activeKey),
        className: 'dsc-ia-image',
        src: activeImage ? activeImage.src : undefined,
        alt: (activeImage && activeImage.name) || '图片预览',
        draggable: false,
        onLoad: event => {
          const node = event.currentTarget;
          if (node && node.naturalWidth && node.naturalHeight) setNatural({ width: node.naturalWidth, height: node.naturalHeight });
        }
      }),
      // 手绘在所有模式可见；只有标注模式绑定绘制/选择/擦除事件，其余模式只读展示。
      (mode === 'markup' || marks.length > 0)
        ? h('svg', {
          className: 'dsc-ia-marks',
          'data-tool': mode === 'markup' ? markupTool : 'preview',
          viewBox: '0 0 ' + Math.max(1, baseWidth) + ' ' + Math.max(1, baseHeight),
          preserveAspectRatio: 'none',
          ...(mode === 'markup'
            ? {
              onPointerDown: beginMarkupPointer,
              onPointerMove: moveMarkupPointer,
              onPointerUp: endMarkupPointer,
              onPointerCancel: () => { markupPointerRef.current = null; setDrawing(null); }
            }
            : {})
        }, marks.map(renderMarkElement), mode === 'markup' ? renderDrawing() : null)
        : null,
      mode !== 'markup'
        ? h('div', { className: 'dsc-ia-dots' },
          dots,
          draftDot,
          mode === 'comment' && commentCursor && !draft
            ? h('span', {
              className: 'dsc-ia-cursor-dot',
              'aria-hidden': true,
              style: { left: commentCursor.x * 100 + '%', top: commentCursor.y * 100 + '%', '--dsc-ia-dot-scale': String(1 / Math.max(0.0001, zoom)) }
            })
            : null)
        : null),
    images.length > 1
      ? h(React.Fragment, null,
        h('button', {
          type: 'button',
          className: 'dsc-ia-nav dsc-ia-nav-prev',
          'aria-label': '上一张图片',
          title: '上一张图片',
          disabled: index <= 0,
          onPointerDown: event => event.stopPropagation(),
          onClick: () => switchImage(index - 1)
        }, imageAnnotationIcon('prev', 20)),
        h('button', {
          type: 'button',
          className: 'dsc-ia-nav dsc-ia-nav-next',
          'aria-label': '下一张图片',
          title: '下一张图片',
          disabled: index >= images.length - 1,
          onPointerDown: event => event.stopPropagation(),
          onClick: () => switchImage(index + 1)
        }, imageAnnotationIcon('next', 20)))
      : null);

  const topBar = h('div', { className: 'dsc-ia-top' },
    h('div', { className: 'dsc-ia-title' },
      h('span', { className: 'dsc-ia-title-name' }, imageName),
      images.length > 1 ? h('span', { className: 'dsc-ia-title-index' }, (index + 1) + ' / ' + images.length) : null),
    h('div', { className: 'dsc-ia-actions' },
      h('div', { className: 'dsc-ia-zoom-wrap' },
        h('button', {
          type: 'button',
          className: 'dsc-ia-action dsc-ia-zoom-button',
          'aria-label': '缩放比例',
          'aria-expanded': !!zoomMenuOpen,
          title: '缩放比例',
          onClick: () => { setZoomMenuOpen(!zoomMenuOpen); setShapeMenuOpen(false); setColorMenuOpen(false); }
        }, Math.round(zoom * 100) + '%', imageAnnotationIcon('chevron', 14)),
        zoomMenu),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action',
        'aria-label': '适应窗口',
        title: '适应窗口',
        onClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); }
      }, imageAnnotationIcon('fit', 18)),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action',
        'aria-label': '下载图片',
        title: '下载图片',
        onClick: downloadImage
      }, imageAnnotationIcon('download', 18)),
      h('button', {
        type: 'button',
        className: 'dsc-ia-action dsc-ia-close',
        'aria-label': '关闭图片预览',
        title: '关闭图片预览',
        onClick: requestClose
      }, imageAnnotationIcon('close', 18))));

  const body = h(React.Fragment, null,
    topBar,
    images.length === 0
      ? h('div', { className: 'dsc-ia-empty' }, '没有可预览的图片')
      : h(React.Fragment, null, stage, toolbar, bottomBar, markupToolbar, popup, textEditor));

  const tree = h('div', {
    ref: rootRef,
    className: 'dsc-ia-root',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': '图片预览与批注',
    tabIndex: -1,
    onKeyDown: handleRootKeyDown,
    onPointerDown: event => {
      if (event.target === event.currentTarget) {
        if (zoomMenuOpen) setZoomMenuOpen(false);
      }
    }
  },
    h('div', { className: 'dsc-ia-backdrop', 'aria-hidden': true }),
    body,
    error ? h('div', { className: 'dsc-ia-error', role: 'alert' }, error) : null,
    h('div', { className: 'dsc-ia-sr', role: 'status', 'aria-live': 'polite' }, saving ? '正在保存批注' : ''));

  if (typeof createPortal === 'function' && typeof document !== 'undefined' && document.body) return createPortal(tree, document.body);
  return tree;
}

// 图片批注客户端集成：把独立的预览/点批注/手绘 UI 接到宿主公开槽位与 Remote 服务。
//
// 约定（由 build 拼进主 client factory，全部顶层标识使用 imageAnnotationIntegration 前缀）：
// - 只消费公开契约：conversation.input.attachments / conversation.chat.user.images 的 owner props、
//   标准 props（sessionId/useInput/inputActions）、ctx.conversation.createDrafts/releaseDraftAttachment、
//   ctx.uiConversation 的授权图片 URL（经槽位 loadImage 回调）与 ctx.remote 手写 descriptor。
// - 不替换正文/编辑器、不拦截 DOM、不改宿主函数；拖放/附件 rail/非图片文件卡由本文件的叶组件自绘。
// - 批注文本只进入 Host prepare/recall，不写编辑器或可见正文。
// - 发送载体：文件名 '<原basename>.__dsc_ia_<uuid>__<扩展名>'；token 不含批注内容；显示层统一去后缀。

const imageAnnotationIntegrationCarrierMarker = '.__dsc_ia_';
const imageAnnotationIntegrationCarrierExpression = /^(.*)\.__dsc_ia_([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})__(\.[^./\\]+)$/i;
const imageAnnotationIntegrationDefaultName = '图片';
const imageAnnotationIntegrationMaxExtension = 16;

// build.mjs 会定义两个 CSS 常量；未接线时（如仅加载本文件做测试）保持空字符串即可。
const imageAnnotationIntegrationOwnCssText = (function () {
  try {
    return typeof IMAGE_ANNOTATIONS_INTEGRATION_CSS_TEXT === 'string' ? IMAGE_ANNOTATIONS_INTEGRATION_CSS_TEXT : '';
  } catch (error) {
    return '';
  }
})();
const imageAnnotationIntegrationUiCssText = (function () {
  try {
    return typeof IMAGE_ANNOTATIONS_CSS_TEXT === 'string' ? IMAGE_ANNOTATIONS_CSS_TEXT : '';
  } catch (error) {
    return '';
  }
})();

/* ------------------------------ 纯函数 ------------------------------ */

// 拆分显示名：扩展名含点；没有扩展名时返回空串。
function imageAnnotationIntegrationSplitExtension(name) {
  const text = String(name || '');
  const index = text.lastIndexOf('.');
  if (index <= 0 || index === text.length - 1) return { base: text, extension: '' };
  const extension = text.slice(index);
  if (extension.length > imageAnnotationIntegrationMaxExtension || /[\\/]/.test(extension)) return { base: text, extension: '' };
  return { base: text.slice(0, index), extension };
}

// 解析发送载体文件名。返回 token/原 basename/扩展名/显示名；不是载体时返回 null。
function imageAnnotationIntegrationParseCarrier(name) {
  const match = imageAnnotationIntegrationCarrierExpression.exec(String(name || ''));
  if (!match) return null;
  const baseName = match[1];
  const token = match[2].toLowerCase();
  const extension = match[3];
  return { token, baseName, extension, displayName: baseName + extension };
}

// 显示层统一去掉中间后缀。
function imageAnnotationIntegrationStripCarrier(name) {
  const parsed = imageAnnotationIntegrationParseCarrier(name);
  return parsed ? parsed.displayName : String(name || '');
}

// 生成带 token 的发送载体名；扩展名缺失时补 .png，保证 Host 能稳定解析。
function imageAnnotationIntegrationCarrierName(displayName, token, extensionOverride) {
  const parts = imageAnnotationIntegrationSplitExtension(displayName);
  const extension = typeof extensionOverride === 'string' && extensionOverride.startsWith('.')
    ? extensionOverride
    : (parts.extension || '.png');
  return parts.base + imageAnnotationIntegrationCarrierMarker + token + '__' + extension;
}

// 随机 UUID（不含任何批注内容）。
function imageAnnotationIntegrationUuid() {
  const cryptoObject = typeof globalThis === 'object' ? globalThis.crypto : undefined;
  if (!cryptoObject || typeof cryptoObject.randomUUID !== 'function') throw new Error('当前环境不支持生成批注标识');
  return cryptoObject.randomUUID();
}

// 批注状态键按 session 隔离；token 是已发送图片的稳定身份。
function imageAnnotationIntegrationSentKey(sessionId, token) {
  return 'ia-sent|' + String(sessionId || '') + '|' + String(token || '');
}
function imageAnnotationIntegrationDraftKey(sessionId, draftId) {
  return 'ia-draft|' + String(sessionId || '') + '|' + String(draftId || '');
}
function imageAnnotationIntegrationHistoryKey(sessionId, attachmentId) {
  return 'ia-history|' + String(sessionId || '') + '|' + String(attachmentId || '');
}
function imageAnnotationIntegrationPreviewKey(sessionId, url) {
  return 'ia-preview|' + String(sessionId || '') + '|' + String(url || '');
}

function imageAnnotationIntegrationClamp(value, low, high) {
  const number = Number(value);
  if (!Number.isFinite(number)) return low;
  return Math.min(high, Math.max(low, number));
}

// Host prepare 只接受 trim 后非空、坐标 0..1 的评论。
function imageAnnotationIntegrationPreparedComments(state) {
  const comments = state && Array.isArray(state.comments) ? state.comments : [];
  const rows = [];
  for (const comment of comments) {
    if (!comment || typeof comment !== 'object') continue;
    const text = String(comment.text === undefined || comment.text === null ? '' : comment.text).trim();
    if (!text) continue;
    rows.push({ text, x: imageAnnotationIntegrationClamp(comment.x, 0, 1), y: imageAnnotationIntegrationClamp(comment.y, 0, 1) });
  }
  return rows;
}

// 恢复出来的评论补本地 id，UI 的编辑/删除/编号依赖它。
function imageAnnotationIntegrationRecalledComments(token, comments) {
  const list = Array.isArray(comments) ? comments : [];
  const prefix = 'recalled-' + String(token || '').slice(0, 8) + '-';
  const rows = [];
  let index = 0;
  for (const comment of list) {
    if (!comment || typeof comment !== 'object') continue;
    const text = String(comment.text === undefined || comment.text === null ? '' : comment.text).trim();
    if (!text) continue;
    rows.push({
      id: prefix + index,
      text,
      x: imageAnnotationIntegrationClamp(comment.x, 0, 1),
      y: imageAnnotationIntegrationClamp(comment.y, 0, 1)
    });
    index += 1;
  }
  return rows;
}

// 只比较批注内容本身，用于“目标是否还有未同步改动”的判断。
function imageAnnotationIntegrationContentParts(state) {
  const comments = imageAnnotationIntegrationPreparedComments(state);
  let marks = '[]';
  try {
    marks = JSON.stringify(state && Array.isArray(state.marks) ? state.marks : []);
  } catch (error) {
    marks = String(state && Array.isArray(state.marks) ? state.marks.length : 0);
  }
  return { comments, marks };
}

function imageAnnotationIntegrationSameIds(left, right) {
  const a = Array.isArray(left) ? left : [];
  const b = Array.isArray(right) ? right : [];
  if (a.length !== b.length) return false;
  for (let index = 0; index < a.length; index += 1) if (a[index] !== b[index]) return false;
  return true;
}

function imageAnnotationIntegrationFileSize(bytes) {
  const value = Number(bytes);
  if (!Number.isFinite(value) || value < 0) return '';
  if (value < 1024) return value + ' B';
  if (value < 1024 * 1024) return (value / 1024).toFixed(value < 10240 ? 1 : 0) + ' KB';
  return (value / 1024 / 1024).toFixed(1) + ' MB';
}

function imageAnnotationIntegrationExtensionLabel(name) {
  const parts = imageAnnotationIntegrationSplitExtension(name);
  return parts.extension ? parts.extension.slice(1).toUpperCase().slice(0, 8) : 'FILE';
}

function imageAnnotationIntegrationSourceDimensions(source) {
  if (!source) return { width: 0, height: 0 };
  if (source.attachment) {
    return { width: Number(source.attachment.width) || 0, height: Number(source.attachment.height) || 0 };
  }
  if (source.preview) {
    return { width: Number(source.preview.width) || 0, height: Number(source.preview.height) || 0 };
  }
  return { width: 0, height: 0 };
}

// 历史图片呈现尺寸：单图长边 240、长宽比裁到 [0.25, 4] 且不放大；compact 用 64 方图。
function imageAnnotationIntegrationHistoryFit(dimensions, compact) {
  if (compact) return { width: 64, height: 64, objectPosition: 'center' };
  const width = Math.max(0, Number(dimensions && dimensions.width) || 0);
  const height = Math.max(0, Number(dimensions && dimensions.height) || 0);
  if (!width || !height) return { width: 240, height: 240, objectPosition: 'center', pending: true };
  const natural = width / height;
  const ratio = Math.min(4, Math.max(0.25, natural));
  const box = ratio >= 1 ? { width: 240, height: 240 / ratio } : { width: 240 * ratio, height: 240 };
  const scale = Math.min(1, width / box.width, height / box.height);
  return {
    width: Math.max(1, Math.round(box.width * scale)),
    height: Math.max(1, Math.round(box.height * scale)),
    objectPosition: natural < 0.25 ? 'center top' : natural > 4 ? 'left center' : 'center'
  };
}

/* ---------------------------- 浏览器小工具 ---------------------------- */

function imageAnnotationIntegrationCreateObjectUrl(value) {
  try {
    if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') return URL.createObjectURL(value);
  } catch (error) {
    // 忽略：调用方会在需要时给出明确错误。
  }
  return '';
}

function imageAnnotationIntegrationRevokeObjectUrl(url) {
  if (!url || typeof url !== 'string' || url.indexOf('blob:') !== 0) return;
  try {
    if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') URL.revokeObjectURL(url);
  } catch (error) {
    // 忽略：失效 URL 不影响功能。
  }
}

// 拖放目录识别：目录在 File 上不可区分，只能由 entry API 提供；没有该 API 时视为普通文件。
function imageAnnotationIntegrationDroppedDirectories(dataTransfer, files) {
  const directories = new Set();
  if (!dataTransfer || !dataTransfer.items) return directories;
  let fileIndex = 0;
  for (const item of dataTransfer.items) {
    if (!item || item.kind !== 'file') continue;
    const file = files[fileIndex];
    fileIndex += 1;
    if (typeof item.webkitGetAsEntry !== 'function') continue;
    let entry = null;
    try {
      entry = item.webkitGetAsEntry();
    } catch (error) {
      entry = null;
    }
    if (!entry || entry.isDirectory !== true) continue;
    if (file !== undefined) directories.add(file);
  }
  return directories;
}

// 保留宿主原生的 document 级拖放语义：拖入计数、dropEffect、目录集合、drop 后重置。
function imageAnnotationIntegrationInstallDropListeners(documentObject, windowObject, canAcceptDrop, onAddFiles, dragDepth, setDragActive) {
  if (!documentObject || typeof documentObject.addEventListener !== 'function') return () => {};
  const fileTransfer = event => {
    const dataTransfer = event && event.dataTransfer;
    if (!dataTransfer || !dataTransfer.types || typeof dataTransfer.types.includes !== 'function') return null;
    return dataTransfer.types.includes('Files') ? dataTransfer : null;
  };
  const reset = () => {
    dragDepth.current = 0;
    setDragActive(false);
  };
  const onDragEnter = event => {
    if (fileTransfer(event) === null) return;
    event.preventDefault();
    dragDepth.current += 1;
    setDragActive(true);
  };
  const onDragOver = event => {
    const dataTransfer = fileTransfer(event);
    if (dataTransfer === null) return;
    event.preventDefault();
    try {
      dataTransfer.dropEffect = canAcceptDrop ? 'copy' : 'none';
    } catch (error) {
      // 只读 dropEffect 的合成事件忽略。
    }
  };
  const onDragLeave = event => {
    if (fileTransfer(event) === null) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragActive(false);
    const viewWidth = windowObject && Number(windowObject.innerWidth) || 0;
    const viewHeight = windowObject && Number(windowObject.innerHeight) || 0;
    const leftViewport = Number(event.clientX) <= 0 || Number(event.clientY) <= 0
      || (viewWidth > 0 && Number(event.clientX) >= viewWidth)
      || (viewHeight > 0 && Number(event.clientY) >= viewHeight);
    if ((event.target === documentObject.documentElement || event.target === documentObject.body) && leftViewport) reset();
  };
  const onDrop = event => {
    const dataTransfer = fileTransfer(event);
    if (dataTransfer === null) return;
    event.preventDefault();
    reset();
    if (!canAcceptDrop) return;
    const files = dataTransfer.files ? Array.from(dataTransfer.files) : [];
    if (typeof onAddFiles !== 'function') return;
    onAddFiles(files, imageAnnotationIntegrationDroppedDirectories(dataTransfer, files));
  };
  documentObject.addEventListener('dragenter', onDragEnter);
  documentObject.addEventListener('dragover', onDragOver);
  documentObject.addEventListener('dragleave', onDragLeave);
  documentObject.addEventListener('drop', onDrop);
  if (windowObject && typeof windowObject.addEventListener === 'function') windowObject.addEventListener('dragend', reset);
  return () => {
    documentObject.removeEventListener('dragenter', onDragEnter);
    documentObject.removeEventListener('dragover', onDragOver);
    documentObject.removeEventListener('dragleave', onDragLeave);
    documentObject.removeEventListener('drop', onDrop);
    if (windowObject && typeof windowObject.removeEventListener === 'function') windowObject.removeEventListener('dragend', reset);
  };
}

/* ------------------------------ 运行时 ------------------------------ */

// 一次 mount 对应一个运行时：批注 store、目标映射、草稿状态、recall 缓存与订阅都在这里，
// 组件卸载/组件停用后整体丢弃；不写 localStorage，也不删除 Host 的持久 token 快照。
function createImageAnnotationIntegrationRuntime() {
  const revisionListeners = new Set();
  const viewerListeners = new Set();
  let revision = 0;
  let viewer = null;
  const runtime = {
    disposed: false,
    store: createImageAnnotationStore(),
    targets: new Map(),
    draftKeyByDraftId: new Map(),
    draftIdByKey: new Map(),
    recallStates: new Map(),
    recallPromises: new Map(),
    draftState: null,
    expectedDraftIds: null,
    draftErrorSink: null,
    inputActions: null,
    conversationService: null,
    remoteAccessor: null,
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      revisionListeners.add(listener);
      return () => revisionListeners.delete(listener);
    },
    getRevision() {
      return revision;
    },
    bump() {
      if (runtime.disposed) return;
      revision += 1;
      for (const listener of Array.from(revisionListeners)) {
        try {
          listener();
        } catch (error) {
          console.error('[codex-style] 图片批注订阅回调失败', error);
        }
      }
    },
    subscribeViewer(listener) {
      if (typeof listener !== 'function') return () => {};
      viewerListeners.add(listener);
      return () => viewerListeners.delete(listener);
    },
    getViewer() {
      return viewer;
    },
    setViewer(next) {
      if (runtime.disposed) return;
      viewer = next || null;
      for (const listener of Array.from(viewerListeners)) {
        try {
          listener();
        } catch (error) {
          console.error('[codex-style] 图片批注预览订阅回调失败', error);
        }
      }
    }
  };
  const offStore = runtime.store.subscribe(() => runtime.bump());
  runtime.dispose = function disposeImageAnnotationIntegrationRuntime() {
    if (runtime.disposed) return;
    runtime.disposed = true;
    offStore();
    revisionListeners.clear();
    viewerListeners.clear();
    viewer = null;
    runtime.targets.clear();
    runtime.draftKeyByDraftId.clear();
    runtime.draftIdByKey.clear();
    runtime.recallStates.clear();
    runtime.recallPromises.clear();
    runtime.draftState = null;
    runtime.expectedDraftIds = null;
    runtime.draftErrorSink = null;
    runtime.inputActions = null;
    runtime.conversationService = null;
    runtime.remoteAccessor = null;
  };
  return runtime;
}

function imageAnnotationIntegrationRemote(runtime) {
  if (!runtime || typeof runtime.remoteAccessor !== 'function') return undefined;
  try {
    return runtime.remoteAccessor();
  } catch (error) {
    return undefined;
  }
}

// 兼容两种 Remote 返回：直接返回服务结果，或传输层包一层 { ok, value }。
function imageAnnotationIntegrationRemoteValue(answer) {
  if (!answer || typeof answer !== 'object') return null;
  if (answer.ok === false) return null;
  return Object.prototype.hasOwnProperty.call(answer, 'value') ? answer.value : answer;
}

async function imageAnnotationIntegrationPrepare(runtime, sessionId, token, comments) {
  const remote = imageAnnotationIntegrationRemote(runtime);
  if (!remote || typeof remote.prepare !== 'function') throw new Error('宿主的图片批注服务尚未就绪');
  let answer;
  try {
    answer = await remote.prepare({ sessionId, token, comments });
  } catch (error) {
    throw new Error('图片批注准备失败：' + imageAnnotationErrorText(error));
  }
  const value = imageAnnotationIntegrationRemoteValue(answer);
  if (!value || value.ok === false) {
    throw new Error((value && value.error && value.error.message) || (answer && answer.error && answer.error.message) || '宿主未接受图片批注');
  }
}

async function imageAnnotationIntegrationRecall(runtime, sessionId, token) {
  const remote = imageAnnotationIntegrationRemote(runtime);
  if (!remote || typeof remote.recall !== 'function') {
    return { status: 'unavailable', error: new Error('宿主暂不支持恢复已发送图片的批注') };
  }
  let answer;
  try {
    answer = await remote.recall({ sessionId, token });
  } catch (error) {
    return { status: 'error', error };
  }
  if (!answer || answer.ok === false) {
    return { status: 'error', error: new Error((answer && answer.error && answer.error.message) || '恢复已发送图片的批注失败') };
  }
  const value = imageAnnotationIntegrationRemoteValue(answer);
  if (!value || typeof value !== 'object') return { status: 'error', error: new Error('批注恢复返回格式无效') };
  if (value.ok === false) return { status: 'missing' };
  return { status: 'ok', comments: Array.isArray(value.comments) ? value.comments : [] };
}

// 已发送图片已经烧录手绘；历史快照仅保留点评论，避免再次叠加或重复烧录。
// 刷新/重开之后内存丢失，再由 recall 从 Host 持久快照恢复 comments（marks 已烧进图片字节）。
function imageAnnotationIntegrationRememberSentState(runtime, sessionId, token, state) {
  const key = imageAnnotationIntegrationSentKey(sessionId, token);
  runtime.store.set(key, {
    comments: state && Array.isArray(state.comments) ? state.comments : [],
    marks: [],
    markupUndo: [],
    markupRedo: []
  });
}

// 当前 store 未恢复且 Host 支持 recall 时，异步恢复该 token 的评论；重复调用会自动去重。
function imageAnnotationIntegrationHydrateRecall(runtime, sessionId, token, state) {
  for (const target of runtime.targets.values()) {
    if (target.sessionId !== sessionId || target.token !== token || target.recallHydrated) continue;
    const current = runtime.store.get(target.key);
    const edited = JSON.stringify(imageAnnotationIntegrationPreparedComments(current)) !== JSON.stringify(target.syncedComments || []);
    if (!edited && JSON.stringify(current.comments) !== JSON.stringify(state.comments)) {
      runtime.store.set(target.key, { ...current, comments: state.comments });
    }
    target.syncedComments = imageAnnotationIntegrationPreparedComments(state);
    target.recallHydrated = true;
  }
}

function imageAnnotationIntegrationScheduleRecall(runtime, sessionId, target) {
  if (!runtime || runtime.disposed || !sessionId || !target || !target.token) return;
  const key = imageAnnotationIntegrationSentKey(sessionId, target.token);
  const phase = runtime.recallStates.get(key);
  if (phase && phase.phase === 'ready') {
    imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, runtime.store.get(key));
    return;
  }
  if (phase && (phase.phase === 'loading' || phase.phase === 'missing' || phase.phase === 'error')) return;
  if (runtime.recallPromises.has(key)) return;
  const local = runtime.store.get(key);
  if (local && Array.isArray(local.comments) && local.comments.length > 0) {
    imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, local);
    runtime.recallStates.set(key, { phase: 'ready' });
    return;
  }
  runtime.recallStates.set(key, { phase: 'loading' });
  runtime.bump();
  const promise = (async () => {
    const result = await imageAnnotationIntegrationRecall(runtime, sessionId, target.token);
    if (runtime.disposed) return;
    if (result.status === 'ok') {
      const existing = runtime.store.get(key);
      const merged = {
        comments: imageAnnotationIntegrationRecalledComments(target.token, result.comments),
        marks: existing && Array.isArray(existing.marks) ? existing.marks : [],
        markupUndo: [],
        markupRedo: []
      };
      runtime.store.set(key, merged);
      imageAnnotationIntegrationHydrateRecall(runtime, sessionId, target.token, merged);
      // token 快照已经代表当前图片内容：把它记为“已同步”，避免用户只打开/关闭预览时误判为未同步。
      target.syncedComments = imageAnnotationIntegrationPreparedComments(merged);
      target.syncedMarks = imageAnnotationIntegrationContentParts(merged).marks;
      runtime.recallStates.set(key, { phase: 'ready' });
    } else if (result.status === 'missing') {
      // 带 token 却查不到快照不能静默当无批注：给出明确错误并允许重试。
      runtime.recallStates.set(key, {
        phase: 'missing',
        missing: true,
        error: '未找到该图片已保存的批注记录'
      });
    } else {
      runtime.recallStates.set(key, {
        phase: 'error',
        unavailable: result.status === 'unavailable',
        error: imageAnnotationErrorText(result.error) || '恢复已发送图片的批注失败'
      });
    }
    runtime.bump();
  })().catch(error => {
    if (runtime.disposed) return;
    runtime.recallStates.set(key, { phase: 'error', error: imageAnnotationErrorText(error) });
    runtime.bump();
  }).finally(() => {
    runtime.recallPromises.delete(key);
  });
  runtime.recallPromises.set(key, promise);
}

function imageAnnotationIntegrationRetryRecall(runtime, sessionId, target) {
  if (!runtime || runtime.disposed || !sessionId || !target || !target.token) return;
  const key = imageAnnotationIntegrationSentKey(sessionId, target.token);
  runtime.recallStates.delete(key);
  imageAnnotationIntegrationScheduleRecall(runtime, sessionId, target);
}

function imageAnnotationIntegrationRecallError(runtime, key) {
  const phase = runtime.recallStates.get(key);
  if (!phase) return '';
  if (phase.phase === 'error' || phase.phase === 'missing') return phase.error || '批注恢复失败';
  return '';
}

/* --------------------------- 目标与草稿状态 --------------------------- */

function imageAnnotationIntegrationEnsureDraftTarget(runtime, sessionId, attachment) {
  const draftId = attachment && attachment.id;
  const fileName = attachment && attachment.file && typeof attachment.file.name === 'string' ? attachment.file.name : '';
  const parsed = imageAnnotationIntegrationParseCarrier(fileName);
  let key = runtime.draftKeyByDraftId.get(draftId);
  if (!key) key = imageAnnotationIntegrationDraftKey(sessionId, draftId);
  let target = runtime.targets.get(key);
  // 附件替换后的 store 通知可能先于 owner props 更新；旧 props 不能把目标绑回已释放的旧 id。
  if (target && target.draftId !== draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId)
    && !imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId)) return { key, target };
  if (!target) {
    const initialState = runtime.store.get(key);
    const parts = imageAnnotationIntegrationContentParts(initialState);
    target = {
      kind: 'draft',
      key,
      sessionId,
      draftId,
      token: parsed ? parsed.token : null,
      displayName: parsed ? parsed.displayName : (fileName || imageAnnotationIntegrationDefaultName),
      baseFile: attachment && attachment.file ? attachment.file : null,
      currentFile: attachment && attachment.file ? attachment.file : null,
      width: attachment && attachment.width,
      height: attachment && attachment.height,
      src: attachment && attachment.previewUrl ? attachment.previewUrl : '',
      // synced* 记录“当前草稿文件已经代表的批注内容”；null 表示未知，需要先同步一次。
      syncedComments: parsed && parsed.token ? parts.comments : [],
      syncedMarks: parsed && parsed.token ? parts.marks : '[]',
      attachment: null
    };
    runtime.targets.set(key, target);
  } else {
    target.draftId = draftId;
    target.sessionId = sessionId;
    if (attachment) {
      if (attachment.width !== undefined) target.width = attachment.width;
      if (attachment.height !== undefined) target.height = attachment.height;
      if (attachment.previewUrl) target.src = attachment.previewUrl;
      if (!target.baseFile && attachment.file) target.baseFile = attachment.file;
      if (attachment.file) target.currentFile = attachment.file;
    }
    if (parsed) {
      if (!target.token) target.token = parsed.token;
      if (!target.baseFile) target.displayName = parsed.displayName;
    }
    if (target.syncedComments === undefined) target.syncedComments = [];
    if (target.syncedMarks === undefined) target.syncedMarks = '[]';
  }
  runtime.draftKeyByDraftId.set(draftId, key);
  runtime.draftIdByKey.set(key, draftId);
  return { key, target };
}

function imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, source) {
  if (!source) return null;
  if (source.attachment) {
    const attachment = source.attachment;
    const parsed = imageAnnotationIntegrationParseCarrier(attachment.name || '');
    const token = parsed ? parsed.token : null;
    const key = token
      ? imageAnnotationIntegrationSentKey(sessionId, token)
      : imageAnnotationIntegrationHistoryKey(sessionId, attachment.attachmentId || '');
    let target = runtime.targets.get(key);
    if (!target) {
      const initialState = runtime.store.get(key);
      const parts = imageAnnotationIntegrationContentParts(initialState);
      target = {
        kind: 'history',
        key,
        sessionId,
        token,
        attachmentId: attachment.attachmentId || '',
        attachment,
        displayName: parsed ? parsed.displayName : (attachment.name || imageAnnotationIntegrationDefaultName),
        width: attachment.width,
        height: attachment.height,
        src: '',
        baseBytes: null,
        baseType: null,
        draftId: null,
        syncedComments: token ? parts.comments : [],
        syncedMarks: token ? parts.marks : '[]'
      };
      runtime.targets.set(key, target);
    } else {
      target.attachment = attachment;
      if (attachment.width !== undefined) target.width = attachment.width;
      if (attachment.height !== undefined) target.height = attachment.height;
      if (parsed) {
        target.token = token;
        target.displayName = parsed.displayName;
      }
    }
    return { key, target };
  }
  if (source.preview) {
    const preview = source.preview;
    const parsed = imageAnnotationIntegrationParseCarrier(preview.name || '');
    const token = parsed ? parsed.token : null;
    const key = token
      ? imageAnnotationIntegrationSentKey(sessionId, token)
      : imageAnnotationIntegrationPreviewKey(sessionId, preview.url || '');
    let target = runtime.targets.get(key);
    if (!target) {
      const initialState = runtime.store.get(key);
      const parts = imageAnnotationIntegrationContentParts(initialState);
      target = {
        kind: 'preview',
        key,
        sessionId,
        token,
        displayName: parsed ? parsed.displayName : (preview.name || imageAnnotationIntegrationDefaultName),
        width: preview.width,
        height: preview.height,
        src: preview.url || '',
        baseBytes: null,
        baseType: null,
        draftId: null,
        syncedComments: token ? parts.comments : [],
        syncedMarks: token ? parts.marks : '[]'
      };
      runtime.targets.set(key, target);
    } else {
      if (preview.url) target.src = preview.url;
      if (parsed) {
        target.token = token;
        target.displayName = parsed.displayName;
      }
    }
    return { key, target };
  }
  return null;
}

function imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId) {
  const state = runtime.draftState;
  return !!state && state.sessionId === sessionId && Array.isArray(state.ids) && state.ids.indexOf(draftId) >= 0;
}

function imageAnnotationIntegrationRequireDraftState(runtime, sessionId) {
  const state = runtime.draftState;
  if (!state || state.sessionId !== sessionId) throw new Error('草稿尚未就绪，请稍后重试');
  if (state.phase === 'adjudicating' || state.phase === 'submitting') throw new Error('消息正在发送，暂时无法更新图片附件');
  if (!Array.isArray(state.ids)) throw new Error('草稿附件状态不可用');
  return state;
}

function imageAnnotationIntegrationRequireInputActions(runtime) {
  const actions = runtime.inputActions;
  // 真实公开契约：addAttachments/removeAttachment 返回 void（rc.3 :14958-14960），
  // 不得把宿主内部 Shell 的 boolean 当契约使用；这里只确认方法存在。
  if (!actions || typeof actions.addAttachments !== 'function' || typeof actions.removeAttachment !== 'function') {
    throw new Error('宿主输入服务不可用，暂时无法更新草稿附件');
  }
  return actions;
}

function imageAnnotationIntegrationDraftAdd(runtime, ids) {
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  try {
    actions.addAttachments(ids.slice());
  } catch (error) {
    throw new Error('无法把图片加入草稿：' + imageAnnotationErrorText(error));
  }
}

function imageAnnotationIntegrationDraftRemove(runtime, id) {
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  try {
    actions.removeAttachment(id);
  } catch (error) {
    throw new Error('无法更新草稿图片附件：' + imageAnnotationErrorText(error));
  }
}

function imageAnnotationIntegrationReleaseDraft(runtime, draftId) {
  const conversation = runtime.conversationService;
  if (conversation && typeof conversation.releaseDraftAttachment === 'function') {
    try {
      conversation.releaseDraftAttachment(draftId);
    } catch (error) {
      console.warn('[codex-style] 释放草稿附件失败', error);
    }
  }
}

// 记录期望的附件顺序；组件在下一次 useInput 快照里核对，不一致时按期望顺序重同步。
function imageAnnotationIntegrationCommitDraftState(runtime, sessionId, ids, phase) {
  runtime.draftState = { sessionId, ids: ids.slice(), phase: phase || 'plain' };
  runtime.expectedDraftIds = { sessionId, ids: ids.slice() };
}

// void 批量重同步：先移除所有可能存在的候选 id（含重复项），再按目标顺序添加。
// 仅在可编辑（plain）状态下调用；不读取任何返回值，只以公开 actions 的真实副作用为准。
function imageAnnotationIntegrationResyncDraft(runtime, sessionId, expectedIds) {
  const state = runtime.draftState;
  if (!state || state.sessionId !== sessionId) return;
  const actions = imageAnnotationIntegrationRequireInputActions(runtime);
  const counts = new Map();
  for (const id of state.ids || []) counts.set(id, (counts.get(id) || 0) + 1);
  const candidates = new Set([].concat(state.ids || [], expectedIds));
  for (const id of candidates) {
    // 同 id 可能因宿主拒绝移除而重复出现：多调用几次确保清空。
    const times = (counts.get(id) || 0) + 1;
    for (let attempt = 0; attempt < times; attempt += 1) {
      try {
        actions.removeAttachment(id);
      } catch (error) {
        // 单步失败继续尝试；最终由下一次快照核对暴露问题。
      }
    }
  }
  for (const id of expectedIds) actions.addAttachments([id]);
  runtime.draftState = { sessionId, ids: expectedIds.slice(), phase: state.phase || 'plain' };
}

function imageAnnotationIntegrationRestoreDraft(runtime, sessionId, originalIds, newDraftId) {
  const actions = runtime.inputActions;
  if (!actions) return;
  const candidates = new Set([].concat(originalIds, [newDraftId], runtime.draftState && runtime.draftState.ids ? runtime.draftState.ids : []));
  for (const id of candidates) {
    try {
      actions.removeAttachment(id);
    } catch (error) {
      // 尽力恢复；忽略单步失败。
    }
  }
  try {
    actions.addAttachments(originalIds.slice());
  } catch (error) {
    console.warn('[codex-style] 恢复草稿附件失败', error);
  }
  runtime.draftState = { sessionId, ids: originalIds.slice(), phase: runtime.draftState ? runtime.draftState.phase : 'plain' };
  // 让下一次快照核对继续兜底（若宿主侧仍未恢复成功，会在组件里重同步一次并报错）。
  runtime.expectedDraftIds = { sessionId, ids: originalIds.slice() };
}

// 追加新草稿附件（历史图片首次批注）：顺序追加，不改历史消息。
function imageAnnotationIntegrationAppendDraft(runtime, sessionId, target, newDraftId) {
  const state = imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  imageAnnotationIntegrationDraftAdd(runtime, [newDraftId]);
  const ids = state.ids.concat([newDraftId]);
  imageAnnotationIntegrationCommitDraftState(runtime, sessionId, ids, state.phase);
  runtime.draftKeyByDraftId.set(newDraftId, target.key);
  runtime.draftIdByKey.set(target.key, newDraftId);
  target.draftId = newDraftId;
  return ids;
}

// 原位替换草稿附件：先追加新附件，再按“移除旧 → 依次把旧位置之后的附件移到末尾”重排，
// 保证 Image N 顺序不变；全程同步、不读返回值、不中途 await；旧附件在成功后才会 release。
function imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, newDraftId) {
  const state = imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  const originalIds = state.ids.slice();
  const oldDraftId = target.draftId;
  const index = originalIds.indexOf(oldDraftId);
  if (index < 0) throw new Error('原图片附件已不在草稿中');
  imageAnnotationIntegrationDraftAdd(runtime, [newDraftId]);
  try {
    imageAnnotationIntegrationDraftRemove(runtime, oldDraftId);
    const tail = originalIds.slice(index + 1);
    for (const id of tail) {
      imageAnnotationIntegrationDraftRemove(runtime, id);
      imageAnnotationIntegrationDraftAdd(runtime, [id]);
    }
  } catch (error) {
    // 恢复原顺序；新 draft 由上层 SyncTarget 统一释放，避免重复 release。
    imageAnnotationIntegrationRestoreDraft(runtime, sessionId, originalIds, newDraftId);
    throw new Error('草稿图片顺序更新失败，请重试');
  }
  const finalIds = originalIds.slice(0, index).concat([newDraftId], originalIds.slice(index + 1));
  imageAnnotationIntegrationCommitDraftState(runtime, sessionId, finalIds, state.phase);
  imageAnnotationIntegrationReleaseDraft(runtime, oldDraftId);
  runtime.draftKeyByDraftId.delete(oldDraftId);
  runtime.draftKeyByDraftId.set(newDraftId, target.key);
  runtime.draftIdByKey.set(target.key, newDraftId);
  target.draftId = newDraftId;
  return finalIds;
}

// 判断目标内容是否还没有同步进当前草稿文件；以“最后一次成功同步的内容”为准，
// 不能使用 viewer 打开时的本地快照（否则关闭/重开会把未 prepare 的草稿误判成已同步）。
function imageAnnotationIntegrationTargetDirty(runtime, sessionId, target, state) {
  const parts = imageAnnotationIntegrationContentParts(state);
  const hasDraft = !!target.draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId);
  if (parts.comments.length === 0 && parts.marks === '[]' && !hasDraft) return false;
  if (target.syncedComments === undefined || target.syncedComments === null || target.syncedMarks === undefined || target.syncedMarks === null) return true;
  const syncedComments = Array.isArray(target.syncedComments) ? target.syncedComments : [];
  return JSON.stringify(parts.comments) !== JSON.stringify(syncedComments) || parts.marks !== target.syncedMarks;
}

/* ------------------------------ 图片字节 ------------------------------ */

// 读取目标的原图字节：草稿图取创建时保存的原始 File；历史图在内存缓存中取，
// 没有缓存时用槽位授权的 loadImage URL（blob:）一次性读取。原始 bytes 只留内存，不写 localStorage。
async function imageAnnotationIntegrationBaseSource(runtime, target) {
  if (target.kind === 'draft') {
    if (!target.baseFile) throw new Error('缺少原图数据，无法导出批注');
    const url = imageAnnotationIntegrationCreateObjectUrl(target.baseFile);
    return {
      blob: target.baseFile,
      type: target.baseFile.type || 'image/png',
      displayName: target.displayName || imageAnnotationIntegrationDefaultName,
      src: url,
      release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
    };
  }
  if (target.baseBytes) {
    const url = imageAnnotationIntegrationCreateObjectUrl(target.baseBytes);
    return {
      blob: target.baseBytes,
      type: target.baseType || target.baseBytes.type || 'image/png',
      displayName: target.displayName || imageAnnotationIntegrationDefaultName,
      src: url,
      release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
    };
  }
  if (!target.src) throw new Error('图片尚未加载完成，请稍后重试');
  let response;
  try {
    if (typeof fetch !== 'function') throw new Error('当前环境不支持读取图片');
    response = await fetch(target.src);
  } catch (error) {
    throw new Error('读取原图失败：' + imageAnnotationErrorText(error));
  }
  if (!response || (typeof response.ok === 'boolean' && !response.ok)) throw new Error('读取原图失败');
  let blob;
  try {
    blob = await response.blob();
  } catch (error) {
    throw new Error('读取原图失败：' + imageAnnotationErrorText(error));
  }
  target.baseBytes = blob;
  target.baseType = blob && blob.type ? blob.type : 'image/png';
  const url = imageAnnotationIntegrationCreateObjectUrl(blob);
  return {
    blob,
    type: target.baseType,
    displayName: target.displayName || imageAnnotationIntegrationDefaultName,
    src: url,
    release: () => imageAnnotationIntegrationRevokeObjectUrl(url)
  };
}

// 由当前批注状态生成待发送文件：有 comments 先 prepare 再用 token 载体名；
// 有 marks 时从原图重新烧录（绝不在已烧录图上二次合成）；两者皆无则回退无 token 原图。
async function imageAnnotationIntegrationBuildTargetFile(runtime, target, state) {
  if (typeof File !== 'function') throw new Error('当前环境不支持生成图片文件');
  const comments = imageAnnotationIntegrationPreparedComments(state);
  const marks = state && Array.isArray(state.marks) ? state.marks : [];
  const token = comments.length > 0 ? imageAnnotationIntegrationUuid() : null;
  if (token) await imageAnnotationIntegrationPrepare(runtime, target.sessionId, token, comments);
  const base = await imageAnnotationIntegrationBaseSource(runtime, target);
  try {
    let blob;
    let type;
    let burned = false;
    if (marks.length > 0) {
      blob = await exportImageAnnotationImage({
        key: target.key,
        src: base.src,
        name: base.displayName,
        width: base.width,
        height: base.height
      }, { comments: [], marks });
      type = 'image/png';
      burned = true;
    } else {
      blob = base.blob;
      type = base.type || 'image/png';
    }
    const parts = imageAnnotationIntegrationSplitExtension(base.displayName);
    const displayName = burned ? parts.base + '.png' : base.displayName;
    const name = token
      ? imageAnnotationIntegrationCarrierName(base.displayName, token, burned ? '.png' : undefined)
      : displayName;
    return {
      token,
      file: new File([blob], name, { type }),
      displayName,
      comments,
      marks
    };
  } finally {
    base.release();
  }
}

// 把一次完成/清除同步到草稿：prepare（或空）→ 生成文件 → createDrafts → 原位替换/追加。
// 每个 await 之后都检查组件是否已被停用：停用后不再创建/改动草稿，避免留下孤立附件。
async function imageAnnotationIntegrationSyncTarget(runtime, sessionId, target, state) {
  const conversation = runtime.conversationService;
  if (!conversation || typeof conversation.createDrafts !== 'function') throw new Error('宿主的会话服务尚未就绪');
  const built = await imageAnnotationIntegrationBuildTargetFile(runtime, target, state);
  if (runtime.disposed) throw new Error('图片批注组件已停用');
  imageAnnotationIntegrationRequireDraftState(runtime, sessionId);
  imageAnnotationIntegrationRequireInputActions(runtime);
  let drafts;
  try {
    drafts = conversation.createDrafts(sessionId, [built.file]);
  } catch (error) {
    throw new Error('无法把批注图片加入草稿：' + imageAnnotationErrorText(error));
  }
  if (runtime.disposed) {
    const created = Array.isArray(drafts) ? drafts[0] : drafts;
    if (created && created.id) imageAnnotationIntegrationReleaseDraft(runtime, created.id);
    throw new Error('图片批注组件已停用');
  }
  const draft = Array.isArray(drafts) ? drafts[0] : drafts;
  if (!draft || !draft.id) throw new Error('无法把批注图片加入草稿');
  try {
    if (target.draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, target.draftId)) {
      imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, draft.id);
    } else {
      imageAnnotationIntegrationAppendDraft(runtime, sessionId, target, draft.id);
    }
  } catch (error) {
    imageAnnotationIntegrationReleaseDraft(runtime, draft.id);
    throw error;
  }
  target.token = built.token;
  target.displayName = built.displayName;
  target.currentFile = built.file;
  target.syncedComments = built.comments;
  target.syncedMarks = imageAnnotationIntegrationContentParts({ marks: built.marks }).marks;
  if (built.token) {
    imageAnnotationIntegrationRememberSentState(runtime, sessionId, built.token, runtime.store.get(target.key));
    // token 载体已经代表当前批注内容：历史/回显出现该 token 时无需再当作未同步。
  }
  runtime.bump();
  return built;
}

// 胶囊叉号：清空这张图的评论但保留图片与手绘；若当前草稿里该图带着已 prepare 的 token，
// 同步换成无 token 文件（保留 marks），避免下一条消息继续携带旧批注快照。
async function imageAnnotationIntegrationClearComments(runtime, sessionId, target) {
  const previousToken = target.token;
  const state = runtime.store.get(target.key);
  const comments = state && Array.isArray(state.comments) ? state.comments : [];
  const marks = state && Array.isArray(state.marks) ? state.marks : [];
  if (!comments.length) return false;
  const draftId = target.draftId;
  const draftLive = draftId && imageAnnotationIntegrationDraftIdLive(runtime, sessionId, draftId);
  if (draftLive && target.token) {
    const built = await imageAnnotationIntegrationBuildTargetFile(runtime, target, { comments: [], marks });
    if (runtime.disposed) throw new Error('图片批注组件已停用');
    const conversation = runtime.conversationService;
    if (!conversation || typeof conversation.createDrafts !== 'function') throw new Error('宿主的会话服务尚未就绪');
    let drafts;
    try {
      drafts = conversation.createDrafts(sessionId, [built.file]);
    } catch (error) {
      throw new Error('无法更新草稿图片：' + imageAnnotationErrorText(error));
    }
    if (runtime.disposed) {
      const created = Array.isArray(drafts) ? drafts[0] : drafts;
      if (created && created.id) imageAnnotationIntegrationReleaseDraft(runtime, created.id);
      throw new Error('图片批注组件已停用');
    }
    const draft = Array.isArray(drafts) ? drafts[0] : drafts;
    if (!draft || !draft.id) throw new Error('无法更新草稿图片');
    try {
      imageAnnotationIntegrationReplaceDraft(runtime, sessionId, target, draft.id);
    } catch (error) {
      imageAnnotationIntegrationReleaseDraft(runtime, draft.id);
      throw error;
    }
    target.displayName = built.displayName;
    target.currentFile = built.file;
    target.syncedComments = [];
    target.syncedMarks = imageAnnotationIntegrationContentParts({ marks }).marks;
  } else {
    // 草稿里本来就是无 token 文件：只清本地评论；marks 是否已烧录以最后一次成功同步为准，保持不变。
    target.syncedComments = [];
  }
  if (previousToken) {
    const remote = imageAnnotationIntegrationRemote(runtime);
    if (!remote || typeof remote.clear !== 'function') throw new Error('宿主批注删除服务尚未就绪，请重试');
    const answer = imageAnnotationIntegrationRemoteValue(await remote.clear({ sessionId, token: previousToken }));
    if (runtime.disposed) return false;
    if (!answer || answer.ok !== true) throw new Error('保存批注删除状态失败，请重试');
    runtime.store.clearComments(imageAnnotationIntegrationSentKey(sessionId, previousToken));
    for (const related of runtime.targets.values()) {
      if (related.sessionId !== sessionId || related.token !== previousToken) continue;
      runtime.store.clearComments(related.key);
      related.syncedComments = [];
    }
    if (draftLive) target.token = null;
  }
  if (marks.length > 0) runtime.store.clearComments(target.key);
  else runtime.store.clear(target.key);
  runtime.bump();
  return true;
}

/* ------------------------------ 预览流程 ------------------------------ */

function imageAnnotationIntegrationOpenViewer(runtime, sessionId, kind, images, initialIndex) {
  if (!runtime || runtime.disposed) return;
  const list = Array.isArray(images) ? images.filter(image => image && image.key !== undefined) : [];
  if (!list.length) return;
  const index = Math.max(0, Math.min(Math.round(Number(initialIndex) || 0), list.length - 1));
  // 不记录 viewer 打开时的本地 store 快照：是否同步以每个 target 的“最后成功同步内容”为准，
  // 否则“新增评论 → 关闭预览 → 重新打开 → 完成”会因为基线包含本地评论而漏 prepare。
  runtime.setViewer({ sessionId, kind, images: list, initialIndex: index });
}

function imageAnnotationIntegrationCloseViewer(runtime) {
  if (!runtime || runtime.disposed) return;
  runtime.setViewer(null);
}

// “完成批注”：以 target.synced* 判断哪些图片有真正未同步的改动；无改动完成不产生任何附件。
// prepare/替换失败或部分成功时，只更新已成功 target 的同步记录；关闭/重开不会把未同步草稿标成已同步。
async function imageAnnotationIntegrationCompleteViewer(runtime, viewer, payload) {
  if (!runtime || runtime.disposed || !viewer) return;
  const sessionId = viewer.sessionId;
  const all = payload && Array.isArray(payload.all) ? payload.all : [];
  const dirty = [];
  for (const item of all) {
    if (!item || item.key === undefined) continue;
    const target = runtime.targets.get(item.key);
    if (!target) continue;
    const state = runtime.store.get(item.key);
    if (imageAnnotationIntegrationTargetDirty(runtime, sessionId, target, state)) dirty.push({ item, target, state });
  }
  if (!dirty.length) return;
  for (const entry of dirty) {
    if (runtime.disposed) throw new Error('图片批注组件已停用');
    await imageAnnotationIntegrationSyncTarget(runtime, sessionId, entry.target, entry.state);
  }
}

/* ------------------------------ React 基础设施 ------------------------------ */

function imageAnnotationIntegrationNoopHook() {
  return undefined;
}

// 订阅运行时 revision：store、映射、recall 状态变化都会刷新胶囊/marker。
function imageAnnotationIntegrationUseRevision(runtime) {
  const [revision, setRevision] = useState(() => runtime.getRevision());
  useEffect(() => {
    if (!runtime || runtime.disposed) return undefined;
    const off = runtime.subscribe(() => {
      if (!runtime.disposed) setRevision(runtime.getRevision());
    });
    setRevision(runtime.getRevision());
    return off;
  }, [runtime]);
  return revision;
}

function imageAnnotationIntegrationUseViewer(runtime) {
  const [viewer, setLocalViewer] = useState(() => runtime.getViewer());
  useEffect(() => {
    if (!runtime || runtime.disposed) return undefined;
    const off = runtime.subscribeViewer(() => {
      if (!runtime.disposed) setLocalViewer(runtime.getViewer());
    });
    setLocalViewer(runtime.getViewer());
    return off;
  }, [runtime]);
  return viewer;
}

/* ------------------------------ 组件：拖放遮罩 ------------------------------ */

function ImageAnnotationDropOverlay(props) {
  const blocked = props.blocked === true;
  const limits = props.limits || null;
  const desc = limits && Number(limits.count) > 0
    ? '最多 ' + limits.count + ' 张图片' + (limits.size ? '，每张不超过 ' + limits.size : '')
    : '';
  return h('div', { className: 'dsc-iai-drop' + (blocked ? ' is-blocked' : ''), 'data-slot': 'image-annotation-drop', 'aria-hidden': true },
    h('div', { className: 'dsc-iai-drop-card' },
      h('div', { className: 'dsc-iai-drop-title' }, blocked ? '消息发送中，暂不能添加附件' : '拖放图片或文件到此处'),
      !blocked && desc ? h('div', { className: 'dsc-iai-drop-desc' }, desc) : null));
}

/* ------------------------------ 组件：文件卡 ------------------------------ */

function imageAnnotationIntegrationRenderFileCard(attachment, uploads, props) {
  const upload = uploads ? uploads[attachment.id] : undefined;
  const state = upload === undefined || upload.status === 'uploading' ? 'uploading'
    : upload.status === 'ready' ? 'ready' : 'error';
  const file = attachment.file || {};
  const name = file.name || '文件';
  const bytes = Number(file.size) || 0;
  const extension = imageAnnotationIntegrationExtensionLabel(name);
  const meta = state === 'uploading'
    ? '正在上传'
    : state === 'error'
      ? '上传失败，点击重试'
      : [extension, imageAnnotationIntegrationFileSize(bytes)].filter(Boolean).join(' ');
  const progress = state === 'uploading' && upload && Number(upload.total) > 0
    ? Math.min(1, Math.max(0, Number(upload.loaded) / Number(upload.total)))
    : undefined;
  return h('div', { key: attachment.id, className: 'dsc-iai-file' + (state === 'error' ? ' is-error' : ''), title: name, 'data-file-id': attachment.id },
    h('span', { className: 'dsc-iai-file-icon', 'aria-hidden': true },
      state === 'uploading' ? h('span', { className: 'dsc-iai-spinner' }) : extension),
    state === 'error'
      ? h('button', {
        type: 'button',
        className: 'dsc-iai-file-body dsc-iai-file-retry',
        'aria-label': '重试上传 ' + name,
        onClick: () => { if (typeof props.onRetryFile === 'function') props.onRetryFile(attachment.id); }
      },
        h('span', { className: 'dsc-iai-file-name' }, name),
        h('span', { className: 'dsc-iai-file-meta is-error' }, meta))
      : h('span', { className: 'dsc-iai-file-body' },
        h('span', { className: 'dsc-iai-file-name' }, name),
        h('span', { className: 'dsc-iai-file-meta' }, meta)),
    h('button', {
      type: 'button',
      className: 'dsc-iai-remove',
      title: '移除附件',
      'aria-label': '移除附件 ' + name,
      onClick: event => {
        event.stopPropagation();
        if (typeof props.onRemoveAttachment === 'function') props.onRemoveAttachment(attachment.id);
      }
    }, imageAnnotationIcon('close', 12)),
    state === 'uploading'
      ? h('span', { className: 'dsc-iai-progress', 'aria-hidden': true },
        h('span', { className: 'dsc-iai-progress-bar', style: progress === undefined ? undefined : { width: (progress * 100).toFixed(1) + '%' } }))
      : null);
}

/* --------------------------- 组件：待发附件 rail --------------------------- */

function makeImageAnnotationIntegrationComposer(runtime) {
  return function CodexImageAnnotationComposer(props) {
    const sessionId = props.sessionId;
    const attachments = Array.isArray(props.attachments) ? props.attachments : [];
    const canAcceptDrop = props.canAcceptDrop === true;
    const uploads = props.uploads || {};
    const dropLimits = props.dropLimits;
    const useInputHook = typeof props.useInput === 'function' ? props.useInput : imageAnnotationIntegrationNoopHook;
    const input = useInputHook(state => state);
    imageAnnotationIntegrationUseRevision(runtime);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const dragDepth = useRef(0);
    const railRef = useRef(null);
    const lastCount = useRef(0);

    // 草稿同步失败/自动重同步的可见错误出口。
    useEffect(() => {
      runtime.draftErrorSink = message => setError(message ? String(message) : '');
      return () => {
        if (runtime.draftErrorSink) runtime.draftErrorSink = null;
      };
    }, []);

    // 供“完成批注”同步排序使用的最新草稿状态；同时用公开 useInput 的最新快照核对
    // 上一次 void 批量替换/重排的实际结果，不一致时按期望顺序重同步一次（不依赖任何返回值）。
    useEffect(() => {
      if (!sessionId || !input) return;
      const ids = Array.isArray(input.attachmentIds) ? input.attachmentIds.slice() : [];
      runtime.draftState = { sessionId, ids, phase: input.phase || 'plain' };
      runtime.inputActions = props.inputActions || null;
      const expected = runtime.expectedDraftIds;
      if (!expected || expected.sessionId !== sessionId) return;
      if (imageAnnotationIntegrationSameIds(ids, expected.ids)) {
        runtime.expectedDraftIds = null;
        return;
      }
      if (!expected.retried) {
        expected.retried = true;
        try {
          imageAnnotationIntegrationResyncDraft(runtime, sessionId, expected.ids);
        } catch (failure) {
          runtime.expectedDraftIds = null;
          if (typeof runtime.draftErrorSink === 'function') runtime.draftErrorSink('草稿附件同步失败：' + imageAnnotationErrorText(failure));
        }
        return;
      }
      runtime.expectedDraftIds = null;
      if (typeof runtime.draftErrorSink === 'function') runtime.draftErrorSink('草稿附件同步失败：宿主附件顺序未能恢复，请检查后重试。');
    }, [sessionId, input && input.attachmentIds, input && input.phase, props.inputActions]);

    // 文档级拖放监听：与宿主原生语义一致（文件类型判断、嵌套 drag 计数、目录集合、可接受状态）。
    useEffect(() => {
      if (typeof document === 'undefined') return undefined;
      const windowObject = typeof window === 'undefined' ? undefined : window;
      return imageAnnotationIntegrationInstallDropListeners(
        document,
        windowObject,
        canAcceptDrop,
        props.onAddFiles,
        dragDepth,
        setDragActive
      );
    }, [canAcceptDrop, props.onAddFiles]);

    // 新附件加入后滚动到 rail 末尾，保持宿主原有“新项可见”行为。
    useEffect(() => {
      const count = attachments.length;
      if (count > lastCount.current && railRef.current) {
        const node = railRef.current;
        try {
          node.scrollLeft = node.scrollWidth;
        } catch (failure) {
          // 合成环境可能没有滚动属性。
        }
      }
      lastCount.current = count;
    }, [attachments.length]);

    // 注意：本槽位为 session-maybe，同一实例会从“无会话”过渡到“有会话”；
    // 任何提前 return 都必须放在全部 Hook 之后，否则 Hook 数量变化导致 React #310 崩溃。
    const imageItems = [];
    const imageItemByDraftId = new Map();
    for (const attachment of attachments) {
      if (!sessionId || !attachment || attachment.kind !== 'image') continue;
      const info = imageAnnotationIntegrationEnsureDraftTarget(runtime, sessionId, attachment);
      const item = { key: info.key, target: info.target, attachment };
      imageItems.push(item);
      imageItemByDraftId.set(attachment.id, item);
    }

    // 草稿图若已带 token（本运行时同步过，或宿主恢复了带 token 的草稿），尝试 recall 找回评论。
    const recallTokens = imageItems.map(item => item.target.token || '').join('|');
    useEffect(() => {
      if (!sessionId) return;
      for (const item of imageItems) {
        if (item.target.token) imageAnnotationIntegrationScheduleRecall(runtime, sessionId, item.target);
      }
    }, [sessionId, recallTokens]);

    if (!sessionId) return null;

    const openViewerAt = index => {
      const viewerImages = imageItems.map(item => ({
        key: item.key,
        src: item.attachment.previewUrl || item.target.src || '',
        name: item.target.displayName,
        width: item.attachment.width,
        height: item.attachment.height
      }));
      imageAnnotationIntegrationOpenViewer(runtime, sessionId, 'draft', viewerImages, index);
    };

    const clearItem = async item => {
      setError('');
      try {
        await imageAnnotationIntegrationClearComments(runtime, sessionId, item.target);
      } catch (failure) {
        setError('清除图片批注失败：' + imageAnnotationErrorText(failure));
      }
    };

    const children = [];
    for (const attachment of attachments) {
      if (attachment.kind === 'file') {
        children.push(imageAnnotationIntegrationRenderFileCard(attachment, uploads, props));
        continue;
      }
      const item = imageItemByDraftId.get(attachment.id);
      if (!item) continue;
      const count = runtime.store.get(item.key).comments.length;
      const recallError = imageAnnotationIntegrationRecallError(runtime, imageAnnotationIntegrationSentKey(sessionId, item.target.token || ''));
      children.push(h('div', { key: attachment.id, className: 'dsc-iai-rail-item', 'data-image-id': attachment.id },
        h('div', { className: 'dsc-iai-rail-image' },
          h('button', {
            type: 'button',
            className: 'dsc-iai-thumb',
            title: '预览并批注 ' + item.target.displayName,
            'aria-label': '预览并批注 ' + item.target.displayName,
            onClick: () => openViewerAt(imageItems.indexOf(item))
          }, h('img', { src: attachment.previewUrl, alt: item.target.displayName })),
          h('button', {
            type: 'button',
            className: 'dsc-iai-remove',
            title: '移除附件',
            'aria-label': '移除附件 ' + item.target.displayName,
            onClick: event => {
              event.stopPropagation();
              if (typeof props.onRemoveAttachment === 'function') props.onRemoveAttachment(attachment.id);
            }
          }, imageAnnotationIcon('close', 12))),
        count > 0
          ? h('div', { className: 'dsc-iai-pill-row' },
            h(ImageAnnotationPill, {
              count,
              onOpen: () => openViewerAt(imageItems.indexOf(item)),
              onClear: () => { void clearItem(item); }
            }))
          : null,
        recallError
          ? h('button', {
            type: 'button',
            className: 'dsc-iai-recall-error',
            title: recallError,
            onClick: () => imageAnnotationIntegrationRetryRecall(runtime, sessionId, item.target)
          }, '批注恢复失败 · 重试')
          : null));
    }

    // 输入卡片是带 gap 的纵向 flex：无附件也无错误时不能留下空容器，否则会多出一个间隙，
    // 把提示语推离卡片顶部。拖放层为 fixed 定位，不占流内间隙。
    const dropOverlay = dragActive ? h(ImageAnnotationDropOverlay, { blocked: !canAcceptDrop, limits: dropLimits }) : null;
    if (children.length === 0 && !error) return dropOverlay;
    return h('div', { className: 'dsc-iai-rail-wrap', 'data-slot': 'image-annotation-attachments' },
      dropOverlay,
      children.length > 0
        ? h('div', {
          className: 'dsc-iai-rail',
          ref: railRef,
          onWheel: event => {
            const node = railRef.current;
            if (!node || !event || !event.deltaY) return;
            if (node.scrollWidth <= node.clientWidth) return;
            node.scrollLeft += event.deltaY;
          }
        }, children)
        : null,
      error ? h('div', { className: 'dsc-iai-inline-error', role: 'alert' }, error) : null);
  };
}

/* --------------------------- 组件：历史用户图片 --------------------------- */

/* --------------------------- 组件：历史用户图片 --------------------------- */

// 单张历史/回显图片：durable 走授权 loadImage，本地回显直接用 object URL；每张独立 recall/胶囊。
function imageAnnotationIntegrationHistoryCell(props) {
  const runtime = props.runtime;
  const sessionId = props.sessionId;
  const source = props.source;
  const index = props.index;
  const loadImage = props.loadImage;
  imageAnnotationIntegrationUseRevision(runtime);
  const [loaded, setLoaded] = useState(() => (source && source.preview && source.preview.url ? source.preview.url : null));
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [actionError, setActionError] = useState('');

  const targetInfo = sessionId && source ? imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, source) : null;
  const attachment = source && source.attachment ? source.attachment : null;
  const preview = source && source.preview ? source.preview : null;

  // 历史/回显图片：durable 走授权 loadImage；本地回显直接用自己的 object URL。
  useEffect(() => {
    if (!targetInfo) return undefined;
    if (preview) {
      setLoaded(preview.url || null);
      setLoadError(false);
      if (preview.url) {
        targetInfo.target.src = preview.url;
        if (typeof props.onLoaded === 'function') props.onLoaded(index, preview.url);
      }
      return undefined;
    }
    if (!attachment || typeof loadImage !== 'function') {
      setLoadError(true);
      return undefined;
    }
    let live = true;
    setLoadError(false);
    Promise.resolve(loadImage(attachment)).then(url => {
      if (!live) return;
      setLoaded(url || null);
      if (url) {
        targetInfo.target.src = url;
        if (typeof props.onLoaded === 'function') props.onLoaded(index, url);
      }
    }).catch(() => {
      if (live) setLoadError(true);
    });
    return () => { live = false; };
  }, [sessionId, attachment, preview && preview.url, loadImage, attempt]);

  // 已发送图片带 token 且本地 store 未恢复时，用 Host 持久快照恢复评论。
  const recallToken = targetInfo && targetInfo.target.token ? targetInfo.target.token : '';
  useEffect(() => {
    if (sessionId && targetInfo && recallToken) imageAnnotationIntegrationScheduleRecall(runtime, sessionId, targetInfo.target);
  }, [sessionId, recallToken]);

  if (!source || !targetInfo) return null;

  const count = runtime.store.get(targetInfo.key).comments.length;
  const recallError = imageAnnotationIntegrationRecallError(runtime, targetInfo.key);
  const dimensions = imageAnnotationIntegrationSourceDimensions(source);
  const fit = imageAnnotationIntegrationHistoryFit(dimensions, props.compact === true);
  const displayName = targetInfo.target.displayName;
  const src = loaded || (preview && preview.url) || null;

  const openViewer = () => {
    if (typeof props.onOpen === 'function') props.onOpen(index);
  };

  const clearItem = async () => {
    setActionError('');
    try {
      await imageAnnotationIntegrationClearComments(runtime, sessionId, targetInfo.target);
    } catch (failure) {
      setActionError('清除图片批注失败：' + imageAnnotationErrorText(failure));
    }
  };

  const retryRecall = () => {
    setActionError('');
    imageAnnotationIntegrationRetryRecall(runtime, sessionId, targetInfo.target);
  };

  return h('div', { className: 'dsc-iai-history', 'data-align': props.align === 'start' ? 'start' : 'end' },
    loadError
      ? h('button', {
        type: 'button',
        className: 'dsc-iai-history-error',
        'aria-label': '图片加载失败，点击重试',
        onClick: () => setAttempt(value => value + 1)
      }, '图片加载失败 · 重试')
      : h('button', {
        type: 'button',
        className: 'dsc-iai-history-frame',
        style: { width: fit.width + 'px', height: fit.height + 'px' },
        title: '预览并批注 ' + displayName,
        'aria-label': '预览并批注 ' + displayName,
        onClick: openViewer
      },
        src
          ? h('img', { src, alt: displayName, style: { objectPosition: fit.objectPosition } })
          : h('span', { className: 'dsc-iai-history-loading' }, '加载中…')),
    count > 0
      ? h('div', { className: 'dsc-iai-pill-row' },
        h(ImageAnnotationPill, { count, onOpen: openViewer, onClear: () => { void clearItem(); } }))
      : null,
    recallError
      ? h('button', { type: 'button', className: 'dsc-iai-recall-error', title: recallError, onClick: retryRecall }, '批注恢复失败 · 重试')
      : null,
    actionError ? h('div', { className: 'dsc-iai-inline-error', role: 'alert' }, actionError) : null);
}

// 一个历史图片 slot：普通 Chat 每次传 1 张；若某个 owner 一次传多张，则完整渲染并支持多图预览导航。
function makeImageAnnotationIntegrationMessageImage(runtime) {
  return function CodexImageAnnotationMessageImages(props) {
    const sessionId = props.sessionId;
    const sources = Array.isArray(props.images) ? props.images : [];
    imageAnnotationIntegrationUseRevision(runtime);
    const loadedRef = useRef(new Map());
    const registerLoaded = useCallback((index, url) => {
      if (url) loadedRef.current.set(index, url);
      else loadedRef.current.delete(index);
    }, []);

    const openAt = async index => {
      if (!sessionId || runtime.disposed) return;
      const entries = [];
      for (let position = 0; position < sources.length; position += 1) {
        const info = imageAnnotationIntegrationEnsureHistoryTarget(runtime, sessionId, sources[position]);
        if (!info) continue;
        let src = loadedRef.current.get(position) || info.target.src || (sources[position].preview && sources[position].preview.url) || '';
        if (!src && typeof props.loadImage === 'function' && sources[position].attachment) {
          try {
            src = await props.loadImage(sources[position].attachment);
          } catch (failure) {
            src = '';
          }
          if (runtime.disposed) return;
          if (src) {
            info.target.src = src;
            loadedRef.current.set(position, src);
          }
        }
        const dimensions = imageAnnotationIntegrationSourceDimensions(sources[position]);
        entries.push({
          key: info.key,
          src: src || '',
          name: info.target.displayName,
          width: dimensions.width,
          height: dimensions.height,
          sourceIndex: position
        });
      }
      if (!entries.length) return;
      const found = entries.findIndex(entry => entry.sourceIndex === index);
      imageAnnotationIntegrationOpenViewer(runtime, sessionId, 'history', entries, found >= 0 ? found : 0);
    };

    if (!sources.length) return null;
    const cells = sources.map((source, index) => h(imageAnnotationIntegrationHistoryCell, {
      key: 'history-image:' + index,
      runtime,
      sessionId,
      source,
      index,
      loadImage: props.loadImage,
      align: props.align,
      compact: props.compact,
      onOpen: openAt,
      onLoaded: registerLoaded
    }));
    if (cells.length === 1) return cells[0];
    return h('div', { className: 'dsc-iai-history-group', 'data-align': props.align === 'start' ? 'start' : 'end' }, cells);
  };
}

/* --------------------------- 组件：预览宿主 --------------------------- */

function makeImageAnnotationIntegrationHost(runtime) {
  return function CodexImageAnnotationHost() {
    const viewer = imageAnnotationIntegrationUseViewer(runtime);
    if (!viewer || typeof document === 'undefined' || typeof createPortal !== 'function') return null;
    const viewerNode = h(ImageAnnotationViewer, {
      images: viewer.images,
      initialIndex: viewer.initialIndex,
      store: runtime.store,
      onClose: () => imageAnnotationIntegrationCloseViewer(runtime),
      onComplete: payload => imageAnnotationIntegrationCompleteViewer(runtime, viewer, payload)
    });
    return createPortal(viewerNode, document.body);
  };
}

/* ------------------------------ 样式与 Remote ------------------------------ */

function imageAnnotationIntegrationInstallStyles() {
  if (typeof document === 'undefined' || typeof document.createElement !== 'function') return () => {};
  const style = document.createElement('style');
  style.dataset.dscImageAnnotations = '';
  style.textContent = [imageAnnotationIntegrationUiCssText, imageAnnotationIntegrationOwnCssText].filter(Boolean).join('\n');
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}

// 客户端 Remote：准备、恢复和显式清除均使用本插件公开服务。
function mountImageAnnotationIntegrationRemote(ctx) {
  const { z } = require('zod');
  const comment = z.object({
    text: z.string().min(1),
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1)
  }).strict();
  const prepareRequest = z.object({
    sessionId: z.string().min(1),
    token: z.string().uuid(),
    comments: z.array(comment).min(1)
  }).strict();
  const prepareResult = z.object({ ok: z.boolean() }).passthrough();
  const recallRequest = z.object({
    sessionId: z.string().min(1),
    token: z.string().uuid()
  }).strict();
  const recallResult = z.object({
    ok: z.boolean(),
    comments: z.array(comment).optional()
  }).passthrough();
  const remote = ctx.remote && typeof ctx.remote.$mount === 'function' ? ctx.remote : null;
  if (!remote) throw new Error('remote 服务尚未就绪');
  return remote.$mount({
    package: PLUGIN_PACKAGE + '/image-annotations',
    descriptors: [
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/clear',
        service: 'codexStyleImageAnnotations', namespace: 'codexStyleImageAnnotations', method: 'clear',
        invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: {
          mode: 'strict', typeSymbol: PLUGIN_PACKAGE + '#image-annotations-clear',
          create: () => recallRequest, jsonSchema: { type: 'object' }
        } }],
        result: { mode: 'strict', typeSymbol: PLUGIN_PACKAGE + '#image-annotations-clear-result', create: () => prepareResult }
      },
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/prepare',
        service: 'codexStyleImageAnnotations',
        namespace: 'codexStyleImageAnnotations',
        method: 'prepare',
        invocation: { kind: 'direct' },
        parameters: [{
          name: 'request',
          wire: 'request',
          source: 'json',
          codec: {
            mode: 'strict',
            typeSymbol: PLUGIN_PACKAGE + '#image-annotations-prepare',
            create: () => prepareRequest,
            jsonSchema: { type: 'object' }
          }
        }],
        result: {
          mode: 'strict',
          typeSymbol: PLUGIN_PACKAGE + '#image-annotations-prepare-result',
          create: () => prepareResult
        }
      },
      {
        id: PLUGIN_PACKAGE + '#codexStyleImageAnnotations/recall',
        service: 'codexStyleImageAnnotations',
        namespace: 'codexStyleImageAnnotations',
        method: 'recall',
        invocation: { kind: 'direct' },
        parameters: [{
          name: 'request',
          wire: 'request',
          source: 'json',
          codec: {
            mode: 'strict',
            typeSymbol: PLUGIN_PACKAGE + '#image-annotations-recall',
            create: () => recallRequest,
            jsonSchema: { type: 'object' }
          }
        }],
        result: {
          mode: 'strict',
          typeSymbol: PLUGIN_PACKAGE + '#image-annotations-recall-result',
          create: () => recallResult
        }
      }
    ]
  });
}

/* ------------------------------ 槽位注册 ------------------------------ */

// 单槽位：沿用项目里 scope.slots.entries 计算优先级的方式，压过宿主自带条目；
// 组件停用后条目被移除，宿主原渲染自动恢复。
function imageAnnotationIntegrationRegisterSingleSlot(scope, name, component) {
  return scope.slots.inject(name, () => {
    const priorities = scope.slots.entries(name).map(entry => {
      const value = entry && entry.options ? entry.options.priority : undefined;
      return typeof value === 'number' ? value : 0;
    });
    return scope.slots.register({ name, priority: Math.min(0, ...priorities) - 1 }, component);
  });
}

/* ------------------------------ 挂载入口 ------------------------------ */

// 由外部开关 watcher 调用；返回幂等 dispose，禁用时移除样式/槽位/Remote/监听并丢弃内存状态，
// 不删除 Host 的持久 token 快照（重启后可 resume + recall 恢复）。
function mountCodexImageAnnotations(ctx) {
  const runtime = createImageAnnotationIntegrationRuntime();
  const disposers = [];
  let disposed = false;
  const remember = value => {
    if (!value) return;
    if (typeof value === 'function') disposers.push(value);
    else if (typeof value.dispose === 'function') disposers.push(() => value.dispose());
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    runtime.dispose();
    const list = disposers.splice(0).reverse();
    for (const item of list) {
      try {
        item();
      } catch (error) {
        console.error('[codex-style] 清理图片批注集成失败', error);
      }
    }
  };

  remember(ctx.effect(() => imageAnnotationIntegrationInstallStyles(), 'codex-style: image annotation styles'));

  const remoteFiber = ctx.inject(['remote'], scope => {
    scope.effect(() => mountImageAnnotationIntegrationRemote(scope), 'codex-style: image annotation remote methods');
    // gateway 把命名空间发布为独立服务 'remote.codexStyleImageAnnotations'；
    // Cordis 只允许声明了它的作用域读取，故由子 inject 在发布后接上访问器。
    scope.inject(['remote.codexStyleImageAnnotations'], inner => inner.effect(() => {
      const service = inner.remote.codexStyleImageAnnotations;
      runtime.remoteAccessor = () => service;
      return () => { if (runtime.remoteAccessor && runtime.remoteAccessor() === service) runtime.remoteAccessor = null; };
    }, 'codex-style: image annotation service connection'));
  });
  remember(remoteFiber);

  const conversationFiber = ctx.inject(['conversation'], scope => {
    runtime.conversationService = scope.conversation;
  });
  remember(conversationFiber);

  const slotsFiber = ctx.inject(['slots'], scope => {
    scope.slots.inject('shell.overlay', () => scope.slots.register(
      { name: 'shell.overlay', id: 'codex-style:image-annotations-host' },
      makeImageAnnotationIntegrationHost(runtime)
    ));
    imageAnnotationIntegrationRegisterSingleSlot(scope, 'conversation.input.attachments', makeImageAnnotationIntegrationComposer(runtime));
    imageAnnotationIntegrationRegisterSingleSlot(scope, 'conversation.chat.user.images', makeImageAnnotationIntegrationMessageImage(runtime));
  });
  remember(slotsFiber);

  ctx.effect(() => dispose, 'codex-style: image annotation integration lifetime');
  // 供测试/诊断观察本次挂载的内部状态（不参与宿主契约）。
  try {
    Object.defineProperty(dispose, 'runtime', { value: runtime, configurable: true });
  } catch (error) {
    dispose.runtime = runtime;
  }
  return dispose;
}

// 技能页：直接消费本插件 Host 半提供的 codexStyleSkills 只读目录/正文，不复制宿主技能数据。
// 页面只新增“展示 + 导航 + 草稿初始化”，不提供启停、卸载、安装或 frontmatter 编辑。
const SKILLS_PANEL_ID = 'codex-style-skills';
const SKILLS_PACKAGE = '@xinxing1708/dsh-codex-style';
const SKILLS_PAGE_SIZE = 6;

const SKILL_SOURCE_GROUPS = [
  { id: 'project', label: '项目', sources: ['project-dsh', 'project-agents'] },
  { id: 'personal', label: '个人', sources: ['user-dsh', 'user-agents', 'custom'] },
  { id: 'bundled', label: '内置', sources: ['bundled'] }
];
const SKILL_SOURCE_GROUP_OTHER = { id: 'other', label: '其他来源' };

function mountSkillsRemote(ctx) {
  const { z } = require('zod');
  const scope = z.object({ sessionId: z.string().optional(), cwd: z.string().optional() }).passthrough();
  const skill = z.object({
    name: z.string(), description: z.string(), whenToUse: z.string().optional(), path: z.string().optional(),
    invocation: z.object({ modelInvocable: z.boolean(), userInvocable: z.boolean() }).passthrough(),
    source: z.string(), provider: z.string()
  }).passthrough();
  const catalog = z.object({
    skills: z.array(skill), complete: z.boolean(), unavailable: z.string().optional(),
    scope: z.object({ cwd: z.string().optional(), session: z.boolean().optional(), preset: z.string().optional() }).passthrough().optional()
  }).passthrough();
  const definition = z.union([z.null(), skill.extend({ content: z.string() }).passthrough()]);
  return ctx.remote.$mount({
    package: SKILLS_PACKAGE + '/skills',
    descriptors: [
      { id: SKILLS_PACKAGE + '#codexStyleSkills/catalog', service: 'codexStyleSkills', namespace: 'codexStyleSkills', method: 'catalog', invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-scope', create: () => scope, jsonSchema: { type: 'object' } } }],
        result: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-catalog', create: () => catalog } },
      { id: SKILLS_PACKAGE + '#codexStyleSkills/content', service: 'codexStyleSkills', namespace: 'codexStyleSkills', method: 'content', invocation: { kind: 'direct' },
        parameters: [{ name: 'request', wire: 'request', source: 'json', codec: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-content-request', create: () => z.object({ name: z.string(), sessionId: z.string().optional(), cwd: z.string().optional() }).passthrough(), jsonSchema: { type: 'object' } } }],
        result: { mode: 'strict', typeSymbol: SKILLS_PACKAGE + '#skills-content', create: () => definition } }
    ]
  });
}

function unwrapRemote(answer) {
  if (answer !== null && typeof answer === 'object' && 'ok' in answer) {
    if (!answer.ok) throw new Error(answer.error?.message || '技能服务返回错误');
    return answer.value;
  }
  return answer;
}

/**
 * Resolve the visible scope. No retained main Session means the global catalog, never a guessed project;
 * `agentPreset` rides along so a new draft keeps a preset that carries this skill.
 */
function skillScopeOf(ctx) {
  const sessions = ctx.sessions.list.getSnapshot();
  const workspaces = ctx.workspaces.list.getSnapshot();
  const byId = sessions.byId || {};
  const sessionId = (sessions.ids || []).find(id => (byId[id]?.retainedBy?.mainView ?? 0) > 0);
  if (sessionId === undefined) return { cwd: undefined, workspaceTitle: '' };
  const workspace = (workspaces.items || []).find(row => row.sessionIds?.includes(sessionId));
  const summary = byId[sessionId] || {};
  return {
    sessionId,
    cwd: summary.cwd,
    workspaceId: workspace?.workspaceId,
    workspaceTitle: workspace?.title || workspace?.path || '',
    agentPreset: summary.projectionValues?.agentPreset
  };
}

function scopeKeyOf(scope) { return JSON.stringify([scope.sessionId ?? null, scope.cwd ?? null]); }
function scopeRequest(scope) {
  return { ...(scope.sessionId === undefined ? {} : { sessionId: scope.sessionId }), ...(scope.cwd === undefined ? {} : { cwd: scope.cwd }) };
}

function createSkillsController(ctx) {
  const initialScope = skillScopeOf(ctx);
  const store = createSnapshotStore({ phase: 'idle', skills: [], complete: true, unavailable: '', error: '', refreshing: false, scope: initialScope, scopeKey: scopeKeyOf(initialScope) });
  let generation = 0;
  let disposed = false;
  // Cordis 只在声明了 'remote.codexStyleSkills' 的作用域里暴露该命名空间；由独立 inject 连接注入。
  let service;
  let connectedListener = null;
  // 作用范围一变就丢弃旧范围的数据；详情由页面按 scopeKey 关闭，避免同名技能串正文。
  const syncScope = scope => {
    const key = scopeKeyOf(scope);
    const current = store.getSnapshot();
    if (key === current.scopeKey) return current;
    const next = { ...current, scope, scopeKey: key, skills: [], complete: true, unavailable: '', error: '', phase: current.phase === 'idle' ? 'idle' : 'loading' };
    store.set(next);
    return next;
  };
  const load = async () => {
    if (disposed) return;
    const scope = skillScopeOf(ctx);
    syncScope(scope);
    const key = scopeKeyOf(scope);
    const current = generation += 1;
    store.set({ ...store.getSnapshot(), refreshing: true, error: '', unavailable: '' });
    try {
      const remote = service;
      if (remote === undefined) {
        if (!disposed && current === generation) store.set({ ...store.getSnapshot(), phase: 'unavailable', unavailable: '技能服务尚未就绪', refreshing: false });
        return;
      }
      const value = unwrapRemote(await remote.catalog(scopeRequest(scope)));
      if (disposed || current !== generation) return;
      const latest = store.getSnapshot();
      if (latest.scopeKey !== key) return;
      // complete=false 只代表来源不完整；同 scope 已有一份成功数据时保留它并提示。
      const keepPrevious = value.complete === false && latest.skills.length > 0;
      store.set({ ...latest, phase: 'ready', skills: keepPrevious ? latest.skills : (value.skills || []), complete: value.complete !== false, unavailable: '', error: '', refreshing: false });
    } catch (error) {
      if (disposed || current !== generation) return;
      const latest = store.getSnapshot();
      if (latest.scopeKey !== key) return;
      const message = error?.message || String(error);
      store.set({ ...latest, phase: latest.skills.length > 0 ? 'ready' : 'error', error: message, refreshing: false });
    }
  };
  const content = async (skill, scope) => {
    const remote = service;
    if (remote === undefined) throw new Error('技能服务尚未就绪');
    return unwrapRemote(await remote.content({ name: skill.name, ...scopeRequest(scope) }));
  };
  // 命名空间就绪/断开时由外部调用；已显示“尚未就绪”的页面在连上后自动重读。
  const connect = remote => {
    service = remote;
    if (typeof connectedListener === 'function') connectedListener();
    return () => { if (service === remote) service = undefined; };
  };
  const onConnected = listener => { connectedListener = listener; return () => { if (connectedListener === listener) connectedListener = null; }; };
  return { store, load, content, connect, onConnected, dispose() { disposed = true; generation += 1; service = undefined; connectedListener = null; } };
}

function groupSkills(skills) {
  const groups = [];
  const rest = [];
  for (const skill of skills) {
    const group = SKILL_SOURCE_GROUPS.find(row => row.sources.includes(skill.source));
    if (group === undefined) { rest.push(skill); continue; }
    let bucket = groups.find(row => row.id === group.id);
    if (bucket === undefined) { bucket = { id: group.id, label: group.label, skills: [] }; groups.push(bucket); }
    bucket.skills.push(skill);
  }
  if (rest.length > 0) groups.push({ ...SKILL_SOURCE_GROUP_OTHER, skills: rest });
  return groups.filter(group => group.skills.length > 0);
}

// 自绘实心立方体：无真实图标元数据时的唯一 fallback，按名称在黄 / 紫两款原创配色中选择。
function SkillCube({ size = 40, tone = 'amber' }) {
  const palette = tone === 'violet'
    ? { top: '#9b7cf2', left: '#7350d8', right: '#5a3cb8', edge: '#c3b0ff' }
    : { top: '#f4c95d', left: '#d59b2d', right: '#a9741c', edge: '#ffe29a' };
  return h('svg', { viewBox: '0 0 40 40', width: size, height: size, 'aria-hidden': true, className: 'dsc-skill-cube' },
    h('path', { d: 'M20 4 35 12.5 20 21 5 12.5Z', fill: palette.top }),
    h('path', { d: 'M5 12.5 20 21v15L5 27.5Z', fill: palette.left }),
    h('path', { d: 'M35 12.5 20 21v15l15-8.5Z', fill: palette.right }),
    h('path', { d: 'M20 4 35 12.5 20 21 5 12.5Z', fill: 'none', stroke: palette.edge, strokeWidth: 1.1, opacity: .55 }));
}
function cubeTone(skill) {
  let hash = 0;
  for (const char of String(skill.name)) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return hash % 2 === 0 ? 'amber' : 'violet';
}

function SkillCard({ skill, onOpen }) {
  return h('button', { type: 'button', className: 'dsc-skill-card', onClick: e => onOpen(skill, e.currentTarget) },
    h('span', { className: 'dsc-skill-card-icon' }, h(SkillCube, { tone: cubeTone(skill) })),
    h('span', { className: 'dsc-skill-card-copy' },
      h('span', { className: 'dsc-skill-card-title' }, skill.name),
      h('span', { className: 'dsc-skill-card-desc' }, skill.description)),
    skill.invocation?.modelInvocable && h('span', { className: 'dsc-skill-card-flag', title: '模型可自动调用', 'aria-label': '模型可自动调用' }, h(Icon, { name: 'check', size: 14 })));
}

function SkillSection({ group, expanded, onToggle, onOpen, query }) {
  const visible = query === '' && !expanded ? group.skills.slice(0, SKILLS_PAGE_SIZE) : group.skills;
  const hidden = group.skills.length - visible.length;
  const names = group.skills.slice(SKILLS_PAGE_SIZE).map(skill => skill.name).slice(0, 2).join('、');
  return h('section', { className: 'dsc-skills-section' },
    h('h2', { className: 'dsc-skills-section-title' }, group.label),
    h('div', { className: 'dsc-skills-grid' }, visible.map(skill => h(SkillCard, { key: skill.name, skill, onOpen }))),
    query === '' && group.skills.length > SKILLS_PAGE_SIZE && h('button', { type: 'button', className: 'dsc-skills-more', onClick: onToggle },
      expanded ? '收起' : `查看 ${names}，另有 ${hidden} 项`));
}

/** Mirror the native client helper exactly: no empty-segment filtering, colons kept literal. */
function skillFileAddress(sessionId, cwd, path) {
  const encodeSegment = segment => encodeURIComponent(segment).replace(/%3A/gi, ':');
  const encodePath = value => value.split('/').map(encodeSegment).join('/');
  const normalized = path.replace(/\\/g, '/');
  const root = (cwd || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const address = root !== '' && normalized.startsWith(root + '/') ? normalized.slice(root.length + 1) : normalized;
  return 'dsh-resource://file/session/' + encodeSegment(sessionId) + '/' + encodePath(address);
}

function draftFailureText(error) { return error?.message || String(error); }

async function startFreshDraft(ctx, scope, prompt) {
  // 新建 Session 后打开；用宿主 retained reference 等待就绪，再用 reference.binding 初始化草稿。
  // 绝不调用发送、提交或模型接口；只对新建 ID 写命令。
  const request = {};
  if (scope?.workspaceId !== undefined) request.workspaceId = scope.workspaceId;
  else if (scope?.cwd !== undefined) request.cwd = scope.cwd;
  if (scope?.agentPreset !== undefined) request.agentPreset = scope.agentPreset;
  const sessionId = await ctx.sessions.create(request);
  if (typeof sessionId !== 'string' || sessionId === '') throw new Error('宿主未返回新会话');
  ctx.uiWorkspace.openSession(sessionId);
  const conversation = ctx.get('conversation');
  if (conversation?.input?.requestDraftInitialization === undefined) throw new Error('当前宿主未提供草稿初始化接口');
  await ctx.sessions.using(sessionId, { source: 'codexStyleSkills' }, async reference => {
    const binding = reference?.binding;
    if (binding === undefined) throw new Error('新会话尚未就绪');
    const outcome = conversation.input.requestDraftInitialization(binding, { prompt, whenDraftExists: 'replace' });
    if (outcome === 'blocked') throw new Error('草稿初始化被宿主拒绝');
  });
  ctx.layout.selectPanel(null);
  return sessionId;
}

class MarkdownBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) {
      return h('div', { className: 'dsc-skills-preview-note', role: 'alert' }, 'Markdown 渲染失败，已显示原始正文。', h('pre', { className: 'dsc-skills-plain' }, this.props.text));
    }
    return this.props.children;
  }
}

let SKILL_PRIMITIVES;
function skillPrimitives() {
  if (SKILL_PRIMITIVES === undefined) {
    try { SKILL_PRIMITIVES = require('@deepseek-ai/dsh-client-ui-primitives'); } catch { SKILL_PRIMITIVES = null; }
  }
  return SKILL_PRIMITIVES;
}
// 契约取自宿主客户端 markdownLabels：code.copyLabel / copiedLabel / toolbarLabels{codeLabel,wrapLabel,unwrapLabel}
// 与 footnotes；中文值取自 @deepseek-ai/dsh-client-locale 的 zh 字典，缺失任一键会被代码块组件直接读取而崩溃。
const SKILL_MARKDOWN_LABELS = {
  code: {
    copyLabel: '复制',
    copiedLabel: '复制成功',
    toolbarLabels: { codeLabel: '代码块', wrapLabel: '自动换行', unwrapLabel: '取消自动换行' }
  },
  footnotes: '脚注'
};
function SkillMarkdown({ text }) {
  const primitives = skillPrimitives();
  if (primitives?.MarkdownText === undefined) return h('pre', { className: 'dsc-skills-plain' }, text);
  return h(MarkdownBoundary, { text }, h(primitives.MarkdownText, { text, labels: SKILL_MARKDOWN_LABELS }));
}

function dialogFocusables(dialog) {
  if (!dialog) return [];
  return [...dialog.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter(node => !node.disabled && node.getClientRects().length > 0);
}

function SkillsDetail({ ctx, controller, scope, skill, onClose, restoreFocus }) {
  const [state, setState] = useState({ phase: 'loading', content: '', error: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [trying, setTrying] = useState(false);
  const busy = useRef(false);
  const menuAnchor = useRef(null);
  const dialogRef = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    let active = true;
    setState({ phase: 'loading', content: '', error: '' });
    controller.content(skill, scope).then(value => { if (active) setState({ phase: 'ready', content: value?.content || '', error: value === null ? '该技能已不在当前范围' : '' }); },
      error => { if (active) setState({ phase: 'error', content: '', error: draftFailureText(error) }); });
    return () => { active = false; };
  }, [skill.name, scope.sessionId, scope.cwd]);
  useEffect(() => {
    closeButton.current?.focus();
    return () => { restoreFocus?.(); };
  }, []);
  const run = async action => {
    setNotice('');
    try { await action(); } catch (error) { setNotice(draftFailureText(error)); }
  };
  const withMenu = action => { setMenuOpen(false); run(action); };
  const openResource = () => {
    if (skill.path === undefined) return Promise.reject(new Error('该技能没有可打开的文件'));
    if (scope.sessionId !== undefined && ctx.sidebarRight?.openResource !== undefined) {
      ctx.sidebarRight.openResource(skillFileAddress(scope.sessionId, scope.cwd, skill.path));
      return Promise.resolve();
    }
    return ctx.remote.session.openWorkspacePath({ path: skill.path }).then(answer => {
      if (!answer?.ok) throw new Error('宿主未能打开该文件');
    });
  };
  const reveal = () => skill.path === undefined ? Promise.reject(new Error('该技能没有文件路径'))
    : ctx.remote.session.openWorkspacePath({ path: skill.path, action: 'reveal' }).then(answer => { if (!answer?.ok) throw new Error('宿主未能定位该文件'); });
  const copyMarkdown = async () => {
    let content = state.content;
    if (content === '') { const value = await controller.content(skill, scope); content = value?.content || ''; }
    if (content === '') throw new Error('该技能没有可复制的正文');
    if (navigator.clipboard?.writeText === undefined) throw new Error('当前窗口不支持剪贴板');
    await navigator.clipboard.writeText(content);
  };
  const tryNow = async () => {
    if (busy.current) return;
    busy.current = true;
    setTrying(true);
    setNotice('');
    try {
      await startFreshDraft(ctx, scope, `/${skill.name} `);
      onClose();
    } catch (error) { setNotice(draftFailureText(error)); } finally { busy.current = false; setTrying(false); }
  };
  const onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (menuOpen) setMenuOpen(false); else onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = dialogFocusables(dialogRef.current);
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  const hasPath = skill.path !== undefined;
  // 原生 MarkdownText 的 labels 代码块契约不可为空；userInvocable=false 时不得出现“立即试用”命令按钮。
  const canTry = skill.invocation?.userInvocable !== false;
  const iconNode = h('span', { className: 'dsc-skills-dialog-icon' }, h(SkillCube, { tone: cubeTone(skill) }));
  const actionsNode = h('div', { className: 'dsc-skills-dialog-headactions' },
    h('button', { type: 'button', ref: menuAnchor, className: 'dsc-icon-button', title: '更多', 'aria-label': '更多', 'aria-haspopup': 'menu', 'aria-expanded': menuOpen, onClick: () => setMenuOpen(!menuOpen) },
      h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': true }, [4, 8, 12].map(x => h('circle', { key: x, cx: x, cy: 8, r: 1.4, fill: 'currentColor' })))),
    h('button', { type: 'button', ref: closeButton, className: 'dsc-icon-button', title: '关闭', 'aria-label': '关闭', onClick: onClose }, h(Icon, { name: 'close', size: 16 })));
  const headRow = h('div', { className: 'dsc-skills-dialog-headrow' }, iconNode, actionsNode);
  const menuNode = menuOpen && h(Popover, { anchor: menuAnchor, onClose: () => setMenuOpen(false), label: '技能操作', width: 220, placement: 'bottom' },
    hasPath && h(Option, { title: '打开', icon: 'arrowUpRight', onClick: () => withMenu(openResource) }),
    hasPath && h(Option, { title: '在文件资源管理器中显示', icon: 'folder', onClick: () => withMenu(reveal) }),
    h(Option, { title: '复制 Markdown', onClick: () => withMenu(copyMarkdown) }));
  const previewNode = h('div', { className: 'dsc-skills-preview' },
    state.phase === 'loading' && h('div', { className: 'dsc-skills-preview-note' }, '正在读取正文…'),
    state.phase === 'error' && h('div', { className: 'dsc-skills-preview-note', role: 'alert' }, state.error),
    state.phase === 'ready' && state.content === '' && h('div', { className: 'dsc-skills-preview-note' }, state.error || '该技能没有正文'),
    state.phase === 'ready' && state.content !== '' && h(SkillMarkdown, { text: state.content }));
  const footNode = h('div', { className: 'dsc-skills-dialog-foot' },
    notice !== '' && h('span', { className: 'dsc-skills-dialog-notice', role: 'alert' }, notice),
    canTry && h('button', { type: 'button', className: 'dsc-skills-try', disabled: trying, 'aria-disabled': trying ? 'true' : undefined, onClick: tryNow }, h(Icon, { name: 'chat', size: 15 }), trying ? '正在新建草稿…' : '立即试用'));
  // dialog 必须是 overlay 的唯一子节点，且完整包住 headrow / 标题 / 描述 / 预览 / 底栏。
  const dialogNode = h('div', { ref: dialogRef, className: 'dsc-skills-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'dsc-skill-title', tabIndex: -1, onKeyDown },
    headRow,
    menuNode,
    h('div', { className: 'dsc-skills-dialog-title' }, h('h2', { id: 'dsc-skill-title' }, skill.name), h('span', { className: 'dsc-skills-dialog-kind' }, 'Skill')),
    h('p', { className: 'dsc-skills-dialog-desc' }, skill.description),
    previewNode,
    footNode);
  return createPortal(h('div', { className: 'dsc-ui dsc-skills-overlay', onPointerDown: e => { if (e.target === e.currentTarget) onClose(); } }, dialogNode), document.body);
}

function SkillsPage({ ctx, controller, active }) {
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const state = useSource(controller.store);
  const sessions = useSource(ctx.sessions.list);
  const workspaces = useSource(ctx.workspaces.list);
  const scope = useMemo(() => skillScopeOf(ctx), [sessions, workspaces]);
  useEffect(() => { if (active) controller.load(); }, [active, scope.sessionId, scope.cwd]);
  useEffect(() => (active ? controller.onConnected(() => controller.load()) : undefined), [active]);
  useEffect(() => { setSelected(null); }, [state.scopeKey]);
  const filtered = query === '' ? state.skills : state.skills.filter(skill => (skill.name + ' ' + skill.description + ' ' + (skill.whenToUse || '')).toLowerCase().includes(query.toLowerCase()));
  const groups = groupSkills(filtered);
  const rangeLabel = scope.workspaceTitle || (scope.cwd ? scope.cwd.replace(/^.*[\\/]/, '') : '全局技能');
  const onOpen = (skill, anchor) => setSelected({ skill, scope: { ...scope }, anchor });
  const closeDetail = () => {
    const anchor = selected?.anchor;
    setSelected(null);
    if (anchor?.isConnected) anchor.focus();
  };
  return h('div', { className: 'dsc-ui dsc-skills-page' },
    h('header', { className: 'dsc-skills-header' },
      h('div', { className: 'dsc-skills-heading' }, h('h1', null, '技能'), h('p', null, '通过任务专用技能扩展 DSH')),
      h('div', { className: 'dsc-skills-toolbar' },
        h('span', { className: 'dsc-skills-scope', title: scope.cwd || '全局' }, rangeLabel),
        h('label', { className: 'dsc-skills-search' }, h(Icon, { name: 'search', size: 14 }), h('input', { type: 'search', value: query, placeholder: '搜索技能', 'aria-label': '搜索技能', onChange: e => setQuery(e.target.value) })),
        h('button', { type: 'button', className: 'dsc-icon-button', title: '刷新', 'aria-label': '刷新', onClick: () => controller.load() }, h(IconRefreshOutlineRegular, { size: 16 })))),
    state.phase === 'loading' && h('div', { className: 'dsc-skills-state' }, '正在读取技能…'),
    state.phase === 'unavailable' && h('div', { className: 'dsc-skills-state' }, `技能服务尚未就绪：${state.unavailable}`),
    state.phase === 'error' && h('div', { className: 'dsc-skills-state dsc-skills-state-error', role: 'alert' }, state.error, h('button', { type: 'button', onClick: () => controller.load() }, '重试')),
    state.phase === 'ready' && state.error !== '' && h('div', { className: 'dsc-skills-state dsc-skills-state-warn', role: 'alert' }, `刷新失败，显示上次结果：${state.error}`),
    state.phase === 'ready' && !state.complete && h('div', { className: 'dsc-skills-state dsc-skills-state-warn' }, '部分来源暂不可见，目录可能不完整。'),
    state.phase === 'ready' && groups.length === 0 && h('div', { className: 'dsc-skills-state' }, query === '' ? '当前范围没有技能' : `没有匹配“${query}”的技能`),
    groups.map(group => h(SkillSection, { key: group.id, group, query, expanded: expanded[group.id] === true, onToggle: () => setExpanded({ ...expanded, [group.id]: !(expanded[group.id] === true) }), onOpen })),
    selected !== null && h(SkillsDetail, { ctx, controller, scope: selected.scope, skill: selected.skill, onClose: closeDetail, restoreFocus: () => { if (selected.anchor?.isConnected) selected.anchor.focus(); } }));
}

function registerSkillsPage(ctx) {
  // 单次注入：先 $mount 发布 namespace，再注册页面；页面本身不等待 remote.codexStyleSkills。
  // 只声明 remote 与页面所需服务，避免"等 namespace、namespace 等 $mount"的循环。
  return ctx.inject(['slots', 'remote', 'sessions', 'workspaces', 'uiSession', 'uiWorkspace', 'layout', 'sidebarRight'], scope => {
    scope.effect(() => mountSkillsRemote(scope), 'codex-style: skills remote methods');
    const controller = createSkillsController(scope);
    scope.effect(() => () => controller.dispose(), 'codex-style: skills catalog');
    // 页面不等命名空间；命名空间由 $mount 发布后，这个子 inject 才激活并把服务交给 controller。
    scope.inject(['remote.codexStyleSkills'], inner => inner.effect(() => controller.connect(inner.remote.codexStyleSkills), 'codex-style: skills service connection'));
    scope.slots.inject('main', function* () {
      yield scope.slots.register({ name: 'main', key: SKILLS_PANEL_ID }, function SkillsMain() {
        const panel = useSource(scope.layout.panelInfo);
        return h(SkillsPage, { ctx: scope, controller, active: panel.activePanelId === SKILLS_PANEL_ID });
      });
    });
  });
}

// 自研插件更新已退役：本文件只保留 DSH 本体更新入口。
// 沿用 Electron preload 的 dshDesktop.updates（与原生设置行指示器同一入口）；
// 检查、下载、校验、停止任务确认与重启安装全部由宿主主进程负责，这里只呈现状态并转交点击。
const DESKTOP_UPDATE_BUSY = ['checking', 'downloading', 'verifying', 'installing'];
const DESKTOP_UPDATE_FAILURES = {
  check: '检查更新失败，请稍后重试。', 'check-network': '检查更新失败，请检查网络连接后重试。',
  download: '下载更新失败，请重试。', 'download-network': '下载更新失败，请检查网络连接后重试。',
  install: '安装更新失败，请稍后重试。', 'install-network': '安装更新失败，请检查网络连接后重试。',
  'stop-failed': '未能安全停止任务，更新尚未安装，请稍后重试。', 'tasks-changed': '有新任务开始运行，请重新确认是否停止任务并更新。',
  'tasks-unavailable': '无法确认任务状态，请在工作区就绪后重试更新。'
};
function createDesktopUpdateSource() {
  const store = createSnapshotStore({ available: false, failed: false, opening: false });
  let bridge, live = false;
  const patch = next => { if (live) store.set({ ...store.getSnapshot(), ...next }); };
  return {
    store,
    start(carrier) {
      const candidate = carrier?.protocolVersion === 1 ? carrier.updates : undefined;
      if (!candidate || ['status', 'open', 'subscribe'].some(name => typeof candidate[name] !== 'function')) return;
      bridge = candidate; live = true;
      let received = false;
      store.set({ available: true, failed: false, opening: false });
      const unsubscribe = bridge.subscribe(presentation => { received = true; patch({ presentation, failed: false }); });
      bridge.status().then(presentation => { if (!received) patch({ presentation }); }, () => { if (!received) patch({ failed: true }); });
      return () => { live = false; bridge = undefined; unsubscribe?.(); store.set({ available: false, failed: false, opening: false }); };
    },
    // 与原生指示器一致：忙碌阶段忽略点击，后续点击并入宿主正在进行的同一操作。
    open() {
      const state = store.getSnapshot();
      if (!live || state.opening || DESKTOP_UPDATE_BUSY.includes(state.presentation?.phase)) return;
      const target = bridge;
      patch({ opening: true });
      Promise.resolve().then(() => target.open()).catch(() => patch({ failed: true })).finally(() => patch({ opening: false }));
    }
  };
}
function desktopUpdateView({ presentation: state, failed, opening }) {
  if (failed) return { kind: 'error', label: '重试更新', detail: '暂时无法读取更新状态，点击重试。' };
  if (!state || state.phase === 'idle') return null;
  const version = state.version ? 'v' + state.version : '';
  const percent = Math.min(100, Math.max(0, Math.floor(state.percent ?? 0)));
  const view = {
    available: { kind: 'download', label: '有可用更新', detail: (version ? '新版本 ' + version + '，' : '') + '点击下载并安装' },
    downloading: { kind: 'progress', percent, label: '正在下载更新 ' + percent + '%', detail: version && '目标版本 ' + version },
    verifying: { kind: 'busy', label: '正在校验更新文件…', detail: version },
    ready: { kind: 'download', label: '更新已就绪', detail: (version ? version + ' 已下载，' : '') + '点击安装并重启' },
    installing: { kind: 'busy', label: '正在准备重启…', detail: version },
    checking: { kind: 'busy', label: '正在检查更新…', detail: '' },
    error: { kind: 'error', label: '重试更新', detail: DESKTOP_UPDATE_FAILURES[state.failure] ?? DESKTOP_UPDATE_FAILURES.install }
  }[state.phase];
  return view && opening && view.kind !== 'progress' ? { ...view, kind: 'busy' } : view ?? null;
}
const DESKTOP_UPDATE_RING = 2 * Math.PI * 6;
function DesktopUpdateGlyph({ view }) {
  const svg = (children, props = {}) => h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, children);
  if (view.kind === 'progress') return svg([
    h('circle', { key: 'track', cx: 8, cy: 8, r: 6, strokeOpacity: 0.32, strokeWidth: 2 }),
    h('circle', { key: 'value', className: 'dsc-desktop-update-ring', cx: 8, cy: 8, r: 6, strokeWidth: 2, strokeLinecap: 'butt', transform: 'rotate(-90 8 8)', strokeDasharray: DESKTOP_UPDATE_RING * view.percent / 100 + ' ' + DESKTOP_UPDATE_RING })
  ]);
  if (view.kind === 'busy') return svg(h('path', { d: 'M8 2.5a5.5 5.5 0 1 1-5.5 5.5' }), { className: 'dsc-update-spin' });
  if (view.kind === 'error') return svg(h('path', { d: 'M8 4v5m0 2.6v.1', strokeWidth: 1.9 }));
  return svg(h('path', { d: 'M8 2.8v7.1M5.2 7.3 8 10.1l2.8-2.8M3.2 9.8v1.4c0 1 .8 1.8 1.8 1.8h6c1 0 1.8-.8 1.8-1.8V9.8' }));
}
// 位于设置齿轮正上方：发现新版显示蓝圆箭头，下载中换为环形进度，悬停显示进度与目标版本。
function DesktopUpdateRailButton({ source }) {
  const state = useSource(source.store);
  const tipId = useId();
  const view = state.available ? desktopUpdateView(state) : null;
  if (!view) return null;
  const busy = view.kind === 'busy' || view.kind === 'progress';
  return h('div', { className: 'dsc-desktop-update', 'data-update-phase': state.failed ? 'failed' : state.presentation.phase },
    h('button', { type: 'button', className: 'dsc-desktop-update-button', 'aria-label': view.label, 'aria-describedby': tipId, 'aria-disabled': busy, onClick: () => { if (!busy) source.open(); } },
      h('span', { className: 'dsc-desktop-update-dot', 'data-kind': view.kind }, h(DesktopUpdateGlyph, { view }))),
    h('span', { id: tipId, role: 'tooltip', className: 'dsc-desktop-update-tip' },
      h('strong', null, view.label),
      view.detail && h('span', null, view.detail),
      view.kind === 'progress' && h('span', { className: 'dsc-update-progress', 'aria-hidden': true }, h('span', { className: 'dsc-update-progress-fill', style: { transform: 'scaleX(' + view.percent / 100 + ')' } }))));
}

// 可选正文呈现：只使用公开组件清单、Slot 与 data-* 锚点。
// 子路径宿主组件没有独立客户端包，主界面按它的实际 Cordis 启停装卸本效果。
// DSH 0.2.2 默认保留所有助手回复；收起过程时补齐过程自述的可见性。
// 回复行由公开 turn/kind/group-part 锚点定位，最终回答沿用宿主的最后回复边界。
function bodyCollapsedReplyCss(turn, hasAnswer) {
  const reply = `[data-chat-turn="${turn}"][data-chat-flow-kind="assistant-step"]:not([data-chat-group-part="reasoning"])`;
  const earlier = hasAnswer ? `:has(~ ${reply})` : '';
  return `body[data-dsc-codex-body] [data-chat-turn="${turn}"][data-chat-flow-kind="turn-process"]:has(.dsc-body-turn__label[aria-expanded="false"]) ~ ${reply}${earlier} { display: none; }`;
}

function bodyDuration(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  return `${hours ? hours + '小时' : ''}${minutes ? minutes + '分钟' : ''}${seconds % 60}秒`;
}

function CodexTurnProcess({ node, turnProcess, useSession }) {
  const turn = node.location.kind === 'turn' || node.location.kind === 'step' ? node.location.turn : undefined;
  const sessionRunning = useSession(snapshot => snapshot.running);
  const running = turn?.status === 'open' && sessionRunning;
  const start = turn?.start?.time;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!running || !Number.isFinite(start)) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [running, start]);
  if (!turn || (!running && turn.status !== 'closed')) return null;
  const end = running ? now : turn.end?.time;
  const duration = Number.isFinite(start) && Number.isFinite(end) ? bodyDuration(Math.max(0, end - start)) : '';
  const reason = turn.end?.data?.reason?.kind;
  const stopped = reason === 'aborted' || reason === 'interrupted';
  const failed = reason === 'error';
  // 异常和中断保持原回合始终展开的语义，不隐藏失败与审批信息。
  const canCollapse = !running && !stopped && !failed && !!turnProcess?.foldable && !!turnProcess?.hasContent;
  const open = !turnProcess?.foldable || !!turnProcess?.open;
  const label = `已处理${duration ? ' ' + duration : ''}${stopped ? ' · 已停止' : failed ? ' · 出错' : ''}`;
  return h('div', { className: 'dsc-body-turn', 'data-dsc-body-running': running || undefined },
    h('span', { className: 'dsc-body-turn__status', role: 'status', 'aria-live': 'polite', 'aria-atomic': true }, running ? '正在处理' : stopped ? '已停止' : failed ? '处理出错' : '处理完成'),
    h('button', {
      type: 'button', className: 'dsc-body-turn__label', disabled: !canCollapse,
      'data-turn-process': node.data.turn,
      'data-turn-process-messages': node.data.messageCount,
      'data-turn-process-tool-calls': node.data.toolCallCount,
      'data-turn-process-subagents': node.data.subagentCount,
      'aria-expanded': canCollapse ? open : undefined,
      onClick: canCollapse ? () => turnProcess.setOpen(!open) : undefined
    }, h('span', null, label), canCollapse && h('svg', { viewBox: '0 0 16 16', width: 12, height: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, 'aria-hidden': true }, h('path', { d: 'm5 6 3 3 3-3' }))),
    h('div', { className: 'dsc-body-turn__divider', 'aria-hidden': true }),
    canCollapse && !open && h('style', null, bodyCollapsedReplyCss(node.data.turn, turnProcess.spec.answerStep != null)));
}

// 正文流式平滑：宿主每次到达都会把末尾段落整体重写，插件无法包裹字符，
// 所以不减少渲染，只限制“露出来”的速度——把正文容器裁到当前揭示行，再用同色
// 柔边盖住当前行光标之后的字符，并按顺序推进已收到的文本块。
const DSC_BODY_SMOOTH = {
  tailKeep: 8,      // 仅仍在增长的末尾文本单元保留的未揭示字数
  minCps: 62.5,     // 最低揭示速度（约每帧 1 字）
  drainMs: 700,     // 积压按该时长摊平
  finishCps: 900,   // data-streaming 移除后的排空速度
  holdMs: 400       // 文本停止增长超过该时长后不再保留末尾缓冲
};
// 只按公开块级标签识别 Markdown 文本块与揭示单元，不依赖宿主的哈希类名。
const DSC_BODY_MD_BLOCKS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'PRE', 'BLOCKQUOTE', 'TABLE', 'HR', 'FIGURE', 'DL']);

// 按顺序收集互不重叠的语义单元。表格、图片等非正文块不作为揭示单元，但仍会被
// 正文容器的裁剪挡住，不会绕过其前方尚未揭示的文字。
function dscBodyCollectUnits(container) {
  const units = [];
  for (const wrapper of container.children) {
    if (wrapper.nodeType !== 1) continue;
    if (DSC_BODY_MD_BLOCKS.has(wrapper.tagName)) {
      dscBodyCollectBlock(wrapper, units);
      continue;
    }
    let markdown = false;
    for (const child of wrapper.children) {
      if (DSC_BODY_MD_BLOCKS.has(child.tagName)) { markdown = true; break; }
    }
    if (!markdown) continue;
    for (const block of wrapper.children) dscBodyCollectBlock(block, units);
  }
  return units;
}

function dscBodyCollectBlock(block, units) {
  switch (block.tagName) {
    case 'P': case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6':
      units.push({ el: block, leaf: true, fade: block.firstElementChild != null });
      break;
    case 'PRE':
      // 代码块无法逐字裁剪，整块淡入。
      units.push({ el: block, leaf: false, fade: true });
      break;
    case 'BLOCKQUOTE':
      // 引用块以不重叠单元整体揭示，不拆到内部段落。
      units.push({ el: block, leaf: false, fade: true });
      break;
    case 'UL': case 'OL':
      if (dscBodySimpleList(block)) {
        for (const item of block.children) {
          if (item.tagName === 'LI') units.push({ el: item, leaf: true, fade: item.firstElementChild != null });
        }
      } else {
        units.push({ el: block, leaf: false, fade: true });
      }
      break;
    default:
      break;
  }
}

// 列表项只含行内内容时逐项揭示；含嵌套块时整表作为一个单元，避免父子单元重叠。
function dscBodySimpleList(list) {
  if (!list.children.length) return false;
  for (const item of list.children) {
    if (item.tagName !== 'LI') return false;
    for (const child of item.children) {
      if (DSC_BODY_MD_BLOCKS.has(child.tagName)) return false;
    }
  }
  return true;
}

// AssistantMarkdown 的根 div（data-streaming）下是正文容器 div；宿主的思考摘要
// 也会带 data-streaming，必须按结构排除，不能只按属性匹配。
function dscBodyIsRoot(root) {
  if (!root || root.nodeType !== 1 || root.tagName !== 'DIV') return false;
  if (!root.hasAttribute('data-streaming')) return false;
  const body = root.firstElementChild;
  return !!body && body.tagName === 'DIV';
}

function dscBodyNodeHasRoot(node) {
  if (!node || node.nodeType !== 1) return false;
  return node.hasAttribute('data-streaming') || node.querySelector('[data-streaming]') !== null;
}

// 当前单元之后是否还有元素内容（正文块或其他非正文块），用于判断是否仍在写最后一段。
function dscBodyHasFollowing(container, element) {
  let node = element;
  while (node && node !== container) {
    if (node.nextElementSibling) return true;
    node = node.parentElement;
  }
  return false;
}

function dscBodyCharRect(element, index) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  let remain = Math.max(0, Math.floor(index));
  let node;
  while ((node = walker.nextNode())) {
    if (node.length === 0) continue;
    if (remain < node.length) {
      const range = document.createRange();
      try {
        range.setStart(node, remain);
        range.setEnd(node, remain + 1);
      } catch {
        return null;
      }
      for (const rect of range.getClientRects()) {
        if (rect.width > 0.2 && rect.height > 0.2) return rect;
      }
      return null;
    }
    remain -= node.length;
  }
  return null;
}

// 取正文所在滚动区实际底色；取不到时调用方降级为整块淡入（不能只裁不遮）。
function dscBodyEdgeColor(root) {
  const scroller = root.closest('[data-conversation-scroll]');
  let node = scroller || root;
  while (node) {
    const color = getComputedStyle(node).backgroundColor;
    if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') return color;
    node = node.parentElement;
  }
  return null;
}

function mountBodySmoothing() {
  if (typeof MutationObserver !== 'function' || typeof requestAnimationFrame !== 'function') return () => {};
  const states = new Map();
  const layers = new Set();
  const seenViews = new WeakMap();
  const shownRoots = new WeakSet();
  const reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  let frame = 0;
  let disposed = false;
  const isReduced = () => !!(reduce && reduce.matches);
  const isHidden = () => document.visibilityState === 'hidden';

  function schedule() {
    if (frame || disposed) return;
    frame = requestAnimationFrame(step);
  }

  // 每个正文 root 独立持有柔边层，避免多个 root 抢用同一层遮罩。
  function ensureLayer(state) {
    if (state.layer && state.layer.isConnected) return state.layer;
    const layer = document.createElement('div');
    layer.className = 'dsc-body-edge';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    layers.add(layer);
    state.layer = layer;
    // 实色由遮罩的渐变淡出（CSS），不解析颜色字符串，主题/color() 写法都能用。
    if (state.color) layer.style.backgroundColor = state.color;
    return layer;
  }

  function hideLayer(state) {
    if (state.layer && state.layer.style.opacity !== '0') state.layer.style.opacity = '0';
  }

  // 只写 max-height 与裁剪类，并保存容器原有内联值，还原时原样写回。
  function applyClip(state, height) {
    const el = state.container;
    if (!el) return;
    if (state.clipSaved === null) {
      state.clipSaved = {
        value: el.style.getPropertyValue('max-height'),
        priority: el.style.getPropertyPriority('max-height'),
        hadClass: el.classList.contains('dsc-body-smooth-clip')
      };
    }
    const value = `${Math.max(0, Math.ceil(height))}px`;
    if (state.clipValue !== value) {
      el.style.setProperty('max-height', value);
      state.clipValue = value;
    }
    if (!el.classList.contains('dsc-body-smooth-clip')) el.classList.add('dsc-body-smooth-clip');
  }

  function clearClip(state) {
    const el = state.container;
    const saved = state.clipSaved;
    state.clipSaved = null;
    state.clipValue = '';
    if (!el || !saved) return;
    if (!saved.hadClass) el.classList.remove('dsc-body-smooth-clip');
    if (saved.value) el.style.setProperty('max-height', saved.value, saved.priority || '');
    else el.style.removeProperty('max-height');
  }

  function release(state) {
    shownRoots.add(state.root);
    clearClip(state);
    hideLayer(state);
    if (state.layer) {
      state.layer.remove();
      layers.delete(state.layer);
      state.layer = null;
    }
    for (const el of state.fadedEls) el.classList.remove('dsc-body-smooth-fade');
    state.fadedEls.clear();
    if (states.get(state.root) === state) states.delete(state.root);
  }

  function releaseAll() {
    for (const state of [...states.values()]) release(state);
  }

  // 遮罩范围取 root 所属滚动区与视口的交集，并扣除滚动区内 sticky 的输入区。
  function ensureScrollport(state) {
    if (state.scroller === undefined || (state.scroller && !state.scroller.isConnected)) {
      state.scroller = state.root.closest('[data-conversation-scroll]');
      state.seat = undefined;
    }
    if (!state.scroller) return null;
    if (state.seat === undefined || (state.seat && !state.seat.isConnected)) {
      state.seat = null;
      for (const child of state.scroller.children) {
        if (child.getAttribute('data-conversation-region') === 'composer') { state.seat = child; break; }
      }
    }
    return state.scroller;
  }

  function visibleRect(state) {
    const port = ensureScrollport(state) || state.root;
    const box = port.getBoundingClientRect();
    const width = window.innerWidth || document.documentElement.clientWidth || 0;
    const height = window.innerHeight || document.documentElement.clientHeight || 0;
    const rect = {
      left: Math.max(0, box.left),
      top: Math.max(0, box.top),
      right: Math.min(width, box.right),
      bottom: Math.min(height, box.bottom)
    };
    if (state.seat) {
      const seat = state.seat.getBoundingClientRect();
      if (seat.height > 0 && seat.bottom > rect.top && seat.top < rect.bottom) rect.bottom = Math.max(rect.top, seat.top);
    }
    return rect;
  }

  function paintMask(state, rect, maskLeft, containerRight, visible) {
    const layer = ensureLayer(state);
    if (!layer) return;
    const right = Math.min(containerRight, visible.right);
    if (visible.right <= visible.left || visible.bottom <= visible.top
      || rect.bottom <= visible.top || rect.top >= visible.bottom
      || containerRight <= visible.left || maskLeft >= visible.right) {
      hideLayer(state);
      return;
    }
    const width = right - maskLeft;
    const top = Math.max(visible.top, rect.top);
    const bottom = Math.min(visible.bottom, rect.bottom);
    if (width <= 0 || bottom <= top) { hideLayer(state); return; }
    layer.style.left = `${maskLeft}px`;
    layer.style.top = `${top}px`;
    layer.style.width = `${width}px`;
    layer.style.height = `${bottom - top}px`;
    // 左缘被滚动区/视口裁掉时保持渐变原始坐标，不把渐变从可见区左缘重新开始。
    const inset = Math.max(0, visible.left - maskLeft);
    layer.style.clipPath = inset > 0 ? `inset(0px 0px 0px ${inset}px)` : '';
    if (layer.style.opacity !== '1') layer.style.opacity = '1';
  }

  // 当前单元裁到光标所在行底部；完全揭示后柔边放在最后一个字符右侧，挡住后续新增。
  function paintClipUnit(state) {
    const el = state.container;
    const unit = state.units[state.index];
    if (!el || !unit) { paintEnd(state); return; }
    const box = el.getBoundingClientRect();
    const visible = visibleRect(state);
    const total = unit.el.textContent.length;
    if (total === 0) {
      applyClip(state, unit.el.getBoundingClientRect().top - box.top);
      hideLayer(state);
      return;
    }
    const atEnd = state.cursor >= total;
    let index = atEnd ? total - 1 : Math.floor(state.cursor);
    let rect = dscBodyCharRect(unit.el, index);
    if (!rect) {
      // 折叠空白/换行没有可测量字形，寻找同方向的可见字符，不能放开整个队列。
      const text = unit.el.textContent;
      if (atEnd) index = text.trimEnd().length - 1;
      else {
        const next = text.slice(index).search(/\S/);
        index = next < 0 ? -1 : index + next;
      }
      if (index >= 0) rect = dscBodyCharRect(unit.el, index);
    }
    if (!rect) { paintBoundary(state); return; }
    applyClip(state, rect.bottom - box.top);
    paintMask(state, rect, atEnd ? rect.right : rect.left, box.right, visible);
  }

  function paintBoundary(state) {
    const el = state.container;
    const unit = state.units[state.index];
    if (!el || !unit) { paintEnd(state); return; }
    applyClip(state, unit.el.getBoundingClientRect().top - el.getBoundingClientRect().top);
    hideLayer(state);
  }

  // 队列清空后不再裁剪；新内容到达时由 MutationObserver 先同步遮住再逐帧揭示。
  function paintEnd(state) {
    if (state.clipSaved !== null) clearClip(state);
    hideLayer(state);
  }

  function paintState(state) {
    if (state.index >= state.units.length) { paintEnd(state); return; }
    const unit = state.units[state.index];
    if (state.fadeAll || unit.fade) { paintBoundary(state); return; }
    paintClipUnit(state);
  }

  // 单元只在末尾追加；节点被替换或文本缩短时按身份/包含/位置对齐，不重放历史也不整段放开。
  function refreshUnits(state, baseline) {
    const container = state.container;
    const next = container ? dscBodyCollectUnits(container) : [];
    if (baseline) {
      state.units = next;
      state.index = 0;
      state.cursor = 0;
      state.seenTotal = -1;
      state.grewAt = 0;
      if (!next.length) return true;
      if (state.fadeAll) { state.index = next.length; return true; }
      const last = next.length - 1;
      if (next[last].fade || (next[last].leaf && next[last].el.firstElementChild != null)) { state.index = next.length; return true; }
      state.index = last;
      state.cursor = next[last].el.textContent.length;
      state.seenTotal = state.cursor;
      return true;
    }
    const prev = state.units;
    const prevIndex = state.index;
    const prevCursor = state.cursor;
    let same = prev.length === next.length;
    if (same) {
      for (let i = 0; i < next.length; i++) {
        if (prev[i].el !== next[i].el) { same = false; break; }
      }
    }
    if (same) { state.units = next; return false; }
    let index = next.length;
    let cursor = 0;
    if (prevIndex < prev.length) {
      const current = prev[prevIndex].el;
      let found = next.findIndex(unit => unit.el === current);
      let advanceTo = prevCursor;
      if (found < 0) {
        const absorbed = next.findIndex(unit => unit.el.contains(current));
        if (absorbed >= 0) { found = absorbed; advanceTo = Number.POSITIVE_INFINITY; }
      }
      if (found < 0 && prevIndex < next.length) { found = prevIndex; advanceTo = prevCursor; }
      if (found >= 0) { index = found; cursor = advanceTo; }
    } else if (next.length) {
      const known = new Set(prev.map(unit => unit.el));
      let first = -1;
      for (let i = 0; i < next.length; i++) {
        if (!known.has(next[i].el)) { first = i; break; }
      }
      if (prev.length === 0) { index = 0; cursor = 0; }
      else if (first > 0) { index = first; cursor = 0; }
      // 整批单元被宿主重建时按已展示基线处理，不重放历史内容。
    }
    state.units = next;
    state.seenTotal = -1;
    if (index >= next.length) { state.index = next.length; state.cursor = 0; return true; }
    const unit = next[index];
    const total = unit.el.textContent.length;
    state.index = index;
    state.cursor = unit.fade || (unit.leaf && unit.el.firstElementChild != null) ? 0 : Math.min(cursor, total);
    return true;
  }

  function adoptContainer(state, container) {
    clearClip(state);
    state.container = container;
    state.clipSaved = null;
    state.clipValue = '';
  }

  function createState(root, baseline) {
    const state = {
      root,
      container: root.firstElementChild,
      units: [],
      index: 0,
      cursor: 0,
      seenTotal: -1,
      last: 0,
      grewAt: 0,
      finishing: false,
      view: root.closest('[data-conversation-session]'),
      fadeUntil: 0,
      color: dscBodyEdgeColor(root),
      layer: null,
      scroller: undefined,
      seat: undefined,
      clipSaved: null,
      clipValue: '',
      fadedEls: new Set()
    };
    state.fadeAll = state.color === null;
    states.set(root, state);
    state.session = state.view?.getAttribute('data-conversation-session');
    refreshUnits(state, baseline);
    return state;
  }

  // 与 DOM 对账：新建/丢弃状态、更新流式标记，并在结构变化时同步建立遮蔽（早于绘制）。
  function syncStates(structureChanged, baseline = false) {
    if (disposed) return;
    for (const state of [...states.values()]) {
      if (!state.root.isConnected || (state.view &&
        (state.view.getAttribute('data-conversation-session') !== state.session || !state.view.getClientRects().length))) release(state);
    }
    if (isReduced() || isHidden()) { releaseAll(); return; }
    const views = new Map();
    for (const root of document.querySelectorAll('[data-streaming]')) {
      if (!dscBodyIsRoot(root)) continue;
      const view = root.closest('[data-conversation-session]');
      if (view && !view.getClientRects().length) { shownRoots.add(root); continue; }
      const session = view?.getAttribute('data-conversation-session');
      const entering = view && seenViews.get(view) !== session;
      if (view) views.set(view, session);
      let state = states.get(root);
      if (!state) {
        // 启用/恢复/切回会话不重放；当前会话中新出现的输出从首块开始揭示。
        state = createState(root, baseline || entering || shownRoots.has(root));
        paintState(state);
        continue;
      }
      state.finishing = false;
      if (!structureChanged) continue;
      const container = root.firstElementChild;
      if (container && container !== state.container) adoptContainer(state, container);
      refreshUnits(state, false);
      paintState(state);
    }
    for (const [view, session] of views) seenViews.set(view, session);
    // 空会话也建立基线，随后到达的第一批输出不能被当作历史。
    for (const view of document.querySelectorAll('[data-conversation-session]')) {
      if (view.getClientRects().length) seenViews.set(view, view.getAttribute('data-conversation-session'));
    }
    for (const state of [...states.values()]) {
      if (state.root.hasAttribute('data-streaming')) continue;
      state.finishing = true;
      if (!structureChanged || !state.root.isConnected) continue;
      const container = state.root.firstElementChild;
      if (container && container !== state.container) adoptContainer(state, container);
      refreshUnits(state, false);
      paintState(state);
    }
  }

  function advance(state, now) {
    const finishing = state.finishing;
    let guard = 0;
    for (;;) {
      if (guard++ > 64) { paintState(state); return; }
      if (state.index >= state.units.length) {
        if (finishing && now >= state.fadeUntil) { release(state); return; }
        paintEnd(state);
        return;
      }
      const unit = state.units[state.index];
      if (!unit.el.isConnected) { refreshUnits(state, false); continue; }
      // 代码块与含行内元素的段落无法逐字裁剪：淡入一次后推进队列。
      if (state.fadeAll || unit.fade || (unit.leaf && unit.el.firstElementChild != null)) {
        if (!state.fadedEls.has(unit.el)) {
          if (!unit.el.classList.contains('dsc-body-smooth-fade')) {
            state.fadedEls.add(unit.el);
            unit.el.classList.add('dsc-body-smooth-fade');
            state.fadeUntil = Math.max(state.fadeUntil, now + 200);
          }
        }
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      const total = unit.el.textContent.length;
      // 文本被宿主缩短时先夹紧进度，避免 cursor 越界后把整段内容一次放开。
      if (state.cursor > total) state.cursor = total;
      if (total > state.seenTotal) state.grewAt = now;
      state.seenTotal = total;
      const last = state.index === state.units.length - 1;
      // 只有“之后没有任何内容”的末段才保留末尾缓冲；其后还有块时视为已冻结，继续摊平。
      const tail = last && !dscBodyHasFollowing(state.container, unit.el);
      const live = tail && !finishing && now - state.grewAt <= DSC_BODY_SMOOTH.holdMs;
      const backlog = total - state.cursor;
      const delta = state.last ? Math.min(64, Math.max(0, now - state.last)) : 16;
      state.last = now;
      if (backlog > 0.01) {
        const rate = finishing
          ? DSC_BODY_SMOOTH.finishCps
          : live && backlog <= DSC_BODY_SMOOTH.tailKeep
            ? 0
            : Math.max(DSC_BODY_SMOOTH.minCps, backlog * 1000 / DSC_BODY_SMOOTH.drainMs);
        state.cursor = Math.min(total, state.cursor + rate * delta / 1000);
      }
      if (state.cursor < total - 0.01) {
        paintClipUnit(state);
        return;
      }
      state.cursor = total;
      if (finishing) {
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      if (tail) {
        if (live) { paintClipUnit(state); return; }
        paintEnd(state);
        return;
      }
      if (!last) {
        state.index += 1;
        state.cursor = 0;
        state.seenTotal = -1;
        continue;
      }
      paintEnd(state);
      return;
    }
  }

  function step(timestamp) {
    frame = 0;
    if (disposed) return;
    if (isReduced() || isHidden()) { releaseAll(); return; }
    const now = typeof timestamp === 'number' && Number.isFinite(timestamp) ? timestamp : performance.now();
    syncStates(false);
    if (!states.size) return;
    for (const state of [...states.values()]) advance(state, now);
    if (states.size) schedule();
  }

  function ownMutation(record) {
    let own = false;
    for (const node of record.addedNodes) { if (!layers.has(node)) return false; own = true; }
    for (const node of record.removedNodes) { if (!layers.has(node)) return false; own = true; }
    return own;
  }

  function meaningful(record) {
    for (const node of record.addedNodes) {
      if (node.nodeType === 1 && (node.hasAttribute('data-conversation-session') || node.querySelector('[data-conversation-session]'))) return true;
    }
    for (const state of states.values()) {
      if (state.root.isConnected && state.root.contains(record.target)) return true;
    }
    for (const node of record.addedNodes) if (dscBodyNodeHasRoot(node)) return true;
    for (const node of record.removedNodes) if (dscBodyNodeHasRoot(node)) return true;
    return false;
  }

  // 只观察必要属性 data-streaming；自己写入的 style/class 不在观察范围，避免自循环。
  const observer = new MutationObserver(records => {
    if (disposed) return;
    let structure = false;
    let streaming = false;
    for (const record of records) {
      if (record.type === 'attributes') {
        streaming = true;
        if (record.attributeName === 'data-conversation-session') structure = true;
        continue;
      }
      if (record.type === 'childList' && !ownMutation(record) && meaningful(record)) structure = true;
      if (record.type === 'characterData' && states.size > 0) {
        // 裁剪已撤掉的尾段重新增长时，先同步遮住新增字符，避免先完整绘制一帧。
        const target = record.target;
        for (const state of states.values()) {
          if (state.clipSaved !== null) continue;
          const current = state.units[state.index];
          if (current && current.el.contains(target)) paintState(state);
        }
      }
    }
    if (structure) syncStates(true);
    else if (streaming) syncStates(false);
    else if (!states.size) return;
    schedule();
  });

  const onVisibility = () => {
    if (isHidden()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      return;
    }
    syncStates(false, true);
    schedule();
  };
  const onReduce = () => {
    if (isReduced()) {
      releaseAll();
      if (frame) { cancelAnimationFrame(frame); frame = 0; }
      return;
    }
    syncStates(false, true);
    schedule();
  };
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['data-streaming', 'data-conversation-session'] });
  document.addEventListener('visibilitychange', onVisibility);
  if (reduce && reduce.addEventListener) reduce.addEventListener('change', onReduce);
  syncStates(false, true);
  schedule();

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    if (reduce && reduce.removeEventListener) reduce.removeEventListener('change', onReduce);
    releaseAll();
  };
}

function mountCodexBody(ctx) {
  ctx.effect(() => {
    document.body.setAttribute('data-dsc-codex-body', '');
    const style = document.createElement('style');
    style.dataset.dscCodexBody = '';
    style.textContent = BODY_CSS_TEXT;
    document.head.appendChild(style);
    return () => { style.remove(); document.body.removeAttribute('data-dsc-codex-body'); };
  }, 'codex-style: body stylesheet');
  ctx.effect(() => mountBodySmoothing(), 'codex-style: streaming text smoothing');
  ctx.slots.inject('conversation.chat.node', () => {
    const priorities = ctx.slots.entries('conversation.chat.node').filter(entry => entry.options.key === 'turn-process').map(entry => entry.options.priority ?? 0);
    return ctx.slots.register({ name: 'conversation.chat.node', key: 'turn-process', priority: Math.min(0, ...priorities) - 1 }, CodexTurnProcess);
  });
}

// 正文与顶部是主界面固定效果；随主客户端及所需槽位的生命周期装卸。
function mountCodexPresentation(ctx) {
  mountCodexHeader(ctx);
  ctx.inject(['slots'], mountCodexBody);
}

// 只有前进后退、图片批注仍按独立子组件清单启停。
function watchCodexPresentation(ctx) {
  let disposed = false;
  let revision = 0;
  const effects = [
    { path: '/navigation', name: 'codex-style-navigation-presentation', apply: mountCodexNavigation, inject: ['slots', 'layout', 'sessions', 'uiWorkspace', 'shortcuts'] },
    { path: '/image-annotations', name: 'codex-style-image-annotations-presentation', apply: mountCodexImageAnnotations, inject: ['slots', 'sessions', 'uiSession', 'conversation', 'remote'] }
  ];
  const setEnabled = (effect, enabled) => {
    if (enabled && !effect.feature) effect.feature = ctx.plugin({ name: effect.name, apply: effect.apply, inject: effect.inject });
    else if (!enabled && effect.feature) { effect.feature.dispose(); effect.feature = undefined; }
  };
  const refresh = async () => {
    const request = ++revision;
    try {
      const result = await ctx.remote.pluginInventory.list();
      if (disposed || request !== revision) return;
      if (!result.ok) throw new Error(result.error?.message || '无法读取呈现组件状态');
      for (const effect of effects) setEnabled(effect, result.value.entries.some(row => row.moduleName === PLUGIN_PACKAGE + effect.path && row.enabled && row.fiberPhase === 'active'));
    } catch (error) {
      if (disposed || request !== revision) return;
      for (const effect of effects) setEnabled(effect, false);
      console.warn('codex-style: 呈现组件状态读取失败', error);
    }
  };
  const offChanged = ctx.remote.$on('plugin-manager/changed', refresh);
  const offReset = ctx.on('connection/reset', refresh);
  refresh();
  return () => { disposed = true; revision++; offChanged(); offReset(); for (const effect of effects) setEnabled(effect, false); };
}

// 顶部重绘随主界面启停；原生会话、视图与按钮动作继续由宿主持有。
function mountCodexHeader(ctx) {
  ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.dscCodexHeader = '';
    style.textContent = HEADER_CSS_TEXT;
    document.head.appendChild(style);
    document.body.setAttribute('data-dsc-codex-header', '');
    headerPresentation.set(true);
    return () => {
      headerPresentation.set(false);
      style.remove();
      document.body.removeAttribute('data-dsc-codex-header');
    };
  }, 'codex-style: header stylesheet');
}

// 页面前进后退（独立可选组件）：只使用公开 layout.panelInfo、sessions.list、
// uiWorkspace.openSession、slots 与 shortcuts。非宿主原生导航；历史仅本次运行内存，
// 不持久化，不恢复设置弹窗、页面子状态或滚动位置。
const NAVIGATION_BACK_ID = 'codex-style.navigation.back';
const NAVIGATION_FORWARD_ID = 'codex-style.navigation.forward';
const NAVIGATION_NATIVE_SHIFT = '68px';
const NAVIGATION_EMPTY = { entries: [], index: -1, canBack: false, canForward: false, busy: false };
// 后退/前进是直杆箭头；侧栏按钮继续使用现有按钮。
const NAVIGATION_BACK_PATH = 'M12 8H3 M7 4 3 8l4 4';
const NAVIGATION_FORWARD_PATH = 'M4 8h9 M9 4l4 4-4 4';

// 会话 route 为 {panelId:null, sessionId}；主面板 route 为 {panelId, sessionId:null}，
// 主面板期间不记录后台会话，避免后台会话变化制造同一面板的假历史。
// 无主会话空态是 {null,null}，公开面无法清除已有会话，故不记录、不作为可返回目标。
function navigationRouteOf(panelInfo, sessions) {
  if (!panelInfo) return null;
  const panelId = panelInfo.activePanelId === undefined ? null : panelInfo.activePanelId;
  if (panelId !== null) return { panelId, sessionId: null };
  const ids = sessions && Array.isArray(sessions.ids) ? sessions.ids : null;
  const byId = sessions && sessions.byId ? sessions.byId : null;
  if (!ids || !byId) return null;
  for (const id of ids) {
    const retained = byId[id] && byId[id].retainedBy;
    if (((retained && retained.mainView) || 0) > 0) return { panelId: null, sessionId: id };
  }
  return null;
}

function sameNavigationRoute(left, right) {
  return left !== null && right !== null && left.panelId === right.panelId && left.sessionId === right.sessionId;
}

function navigationRouteKey(route) {
  if (route === null) return '';
  return route.panelId === null ? 'session:' + route.sessionId : 'panel:' + route.panelId;
}

// 纯内存历史模型：同一轮通知合并到一次微任务；首次稳定快照为 base；
// 同页去重；后退后新导航截断 forward；恢复期间 busy 防连点。
function createNavigationController({ read, restore, schedule = queueMicrotask, onState = () => {} }) {
  let entries = [];
  let index = -1;
  let pending = false;
  let base = false;
  let busy = false;
  let disposed = false;
  const state = () => ({
    entries: entries.slice(),
    index,
    canBack: index > 0,
    canForward: index >= 0 && index < entries.length - 1,
    busy
  });
  const publish = () => { if (!disposed) onState(state()); };
  const observe = () => {
    const route = read();
    if (route === null) return;
    if (!base) {
      base = true;
      entries = [route];
      index = 0;
      return;
    }
    if (sameNavigationRoute(route, entries[index])) return;
    entries = entries.slice(0, index + 1);
    entries.push(route);
    index = entries.length - 1;
  };
  const flush = () => {
    if (disposed) return;
    pending = false;
    observe();
    busy = false;
    publish();
  };
  const refresh = () => {
    if (disposed || pending) return;
    pending = true;
    schedule(flush);
  };
  // 沿同方向跳过不可恢复目标：最近可恢复者优先；全部失效时保持位置，
  // 由下一轮读取按实际页面记录，不伪造位置，也不新增历史。
  const move = direction => {
    if (disposed || busy || direction === 0) return false;
    let target = index + direction;
    if (target < 0 || target >= entries.length) return false;
    busy = true;
    let moved = false;
    while (target >= 0 && target < entries.length) {
      let restored = false;
      try { restored = restore(entries[target]) !== false; } catch (_error) { restored = false; }
      if (restored) { index = target; moved = true; break; }
      target += direction;
    }
    refresh();
    publish();
    return moved;
  };
  return {
    refresh,
    observe,
    getState: state,
    back: () => move(-1),
    forward: () => move(1),
    dispose() {
      disposed = true;
      pending = false;
      entries = [];
      index = -1;
      busy = false;
    }
  };
}

// 恢复目标前先使宿主旧的异步新建导航失效；校验会话仍存在、panels 仍注册。
function restoreNavigationRoute(ctx, route) {
  if (route === null) return false;
  try { ctx.layout.beginNavigation(); } catch (_error) { /* 旧宿主没有该动作时仍可恢复 */ }
  const panels = typeof ctx.slots.entriesOfSlot === 'function' ? ctx.slots.entriesOfSlot('main') : ctx.slots.entries('main');
  if (route.panelId === null) {
    const sessions = ctx.sessions.list.getSnapshot();
    if (!route.sessionId || !(sessions.byId && sessions.byId[route.sessionId])) return false;
    ctx.uiWorkspace.openSession(route.sessionId);
    return true;
  }
  if (!panels.some(entry => entry && entry.options && entry.options.key === route.panelId)) return false;
  try { ctx.layout.selectPanel(route.panelId); } catch (_error) { return false; }
  return true;
}

// catalog 是键位的唯一真源：命令存在但未绑定/被取消/冲突时 keys 为空，
// 提示不显示键位胶囊；catalog 尚未就绪时同样不猜默认组合。
function navigationCatalogKeys(catalog, id) {
  if (!Array.isArray(catalog)) return [];
  const row = catalog.find(entry => entry && entry.id === id);
  return row && Array.isArray(row.keys) ? row.keys : [];
}

function NavigationShortcutChip({ label }) {
  return h('span', { className: 'dsc-nav-tooltip__key', 'aria-hidden': true }, label);
}

// 悬停/聚焦提示：深灰圆角，近窗口左边 8px 防越界，按钮下 2–4px；键位读 shortcuts.catalog。
function NavigationTooltip({ id, label, keys, left, top }) {
  const width = 8 + label.length * 13 + keys.length * 20;
  const x = Math.max(8, Math.min(left, (typeof window !== 'undefined' ? window.innerWidth : 1024) - width - 8));
  return createPortal(h('div', {
    className: 'dsc-ui dsc-nav-tooltip', role: 'tooltip', 'data-navigation-tip': id,
    style: { left: x, top: top + 3 }
  }, h('span', null, label), h('span', { className: 'dsc-nav-tooltip__keys' }, keys.map((key, position) => key === '+'
    ? h('span', { key: 'plus-' + position, className: 'dsc-nav-tooltip__plus', 'aria-hidden': true }, '+')
    : h(NavigationShortcutChip, { key: key + '-' + position, label: key })))), document.body);
}

function makeNavigationControls(ctx, controls, controller) {
  return function NavigationControls() {
    const state = useSource(controls);
    const catalog = useSource(ctx.shortcuts.catalog);
    const [tip, setTip] = useState(null);
    const anchors = useRef({ back: null, forward: null });
    const backKeys = navigationCatalogKeys(catalog, NAVIGATION_BACK_ID);
    const forwardKeys = navigationCatalogKeys(catalog, NAVIGATION_FORWARD_ID);
    const buttons = [
      { id: 'back', label: '返回', path: NAVIGATION_BACK_PATH, keys: backKeys, enabled: state.canBack, run: () => controller.back() },
      { id: 'forward', label: '前进', path: NAVIGATION_FORWARD_PATH, keys: forwardKeys, enabled: state.canForward, run: () => controller.forward() }
    ];
    const shown = tip !== null && state.entries.length > 0 ? tip : null;
    return createPortal(h(React.Fragment, null,
      h('div', { className: 'dsc-ui dsc-nav-controls', role: 'group', 'aria-label': '页面历史' }, buttons.map(button => h('button', {
        key: button.id, type: 'button', ref: node => { anchors.current[button.id] = node; },
        className: 'dsc-nav-button', 'aria-label': button.label, 'aria-disabled': button.enabled ? undefined : 'true',
        'data-navigation-button': button.id,
        onPointerEnter: () => setTip(button.id), onPointerLeave: () => setTip(null),
        onFocus: () => setTip(button.id), onBlur: () => setTip(null),
        onClick: () => { if (button.enabled) { setTip(null); button.run(); } }
      }, h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, h('path', { d: button.path }))))),
      shown !== null && (() => {
        const button = buttons.find(item => item.id === shown);
        const anchor = anchors.current[shown];
        const box = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : { left: 8, bottom: 36 };
        return h(NavigationTooltip, { id: shown, label: button.label, keys: button.keys, left: box.left, top: box.bottom });
      })()), document.body);
  };
}

// Windows 应用菜单由 preload 挂成 body 子元素 [data-windows-menu]，位置由 CSS 外边距跟随宿主；
// 这里只处理侧栏里的原生固定按钮：左侧切换键由自绘按钮替代（隐藏），其余按钮右移。
// 只给最小宿主节点加自有 data-* 并还原；不改 DOM、不读 hashed class、不依赖元素插入时序。
function createNavigationTitlebarMarker() {
  const saved = [];
  let observer = null;
  let timer = 0;
  let disposed = false;
  const mark = (element, name) => {
    if (!element || element.hasAttribute(name)) return;
    saved.push([element, name, element.getAttribute(name)]);
    element.setAttribute(name, '');
  };
  const restore = () => {
    for (const [element, name, previous] of saved.reverse()) {
      if (previous === null) element.removeAttribute(name); else element.setAttribute(name, previous);
    }
    saved.length = 0;
  };
  const apply = () => {
    if (disposed) return;
    timer = 0;
    if (typeof document === 'undefined' || !document.documentElement || !document.documentElement.hasAttribute('data-windows-titlebar')) return;
    // 先清掉上一轮标记并在无 transform 的布局下完成全部测量与分类，
    // 再统一写标记；避免祖先 transform 改变 fixed 包含块后误判原生按钮。
    restore();
    const pending = [];
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    const buttons = sidebar && typeof sidebar.querySelectorAll === 'function' ? [...sidebar.querySelectorAll('button')] : [];
    const classified = [];
    for (const button of buttons) {
      const style = typeof getComputedStyle === 'function' ? getComputedStyle(button) : null;
      if (!style || style.position !== 'fixed') continue;
      const box = button.getBoundingClientRect ? button.getBoundingClientRect() : { top: 0, left: 0 };
      if (box.top >= 48) continue;
      // 左侧窄按钮由自绘切换键替代；其余固定按钮右移。
      if (box.left < 40) classified.push([button, 'data-dsc-navigation-native-toggle']);
      else classified.push([button, 'data-dsc-navigation-native-shift']);
    }
    pending.push(...classified);
    for (const [element, name] of pending) mark(element, name);
  };
  const schedule = () => {
    if (disposed || timer) return;
    timer = requestAnimationFrame(apply);
  };
  const start = () => {
    let attemptsLeft = 60;
    const retry = () => {
      if (disposed) return;
      timer = 0;
      apply();
      attemptsLeft--;
      if (typeof document !== 'undefined' && !document.querySelector('[data-slot="sidebar"]') && attemptsLeft > 0) { timer = requestAnimationFrame(retry); return; }
      const frameElement = typeof document !== 'undefined' ? document.querySelector('[data-dsc-frame]') : null;
      if (frameElement && typeof MutationObserver === 'function') {
        observer = new MutationObserver(schedule);
        observer.observe(frameElement, { attributes: true, attributeFilter: ['data-sidebar-collapsed'] });
      }
      if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', schedule);
    };
    retry();
  };
  return {
    start,
    dispose() {
      disposed = true;
      if (timer) { cancelAnimationFrame(timer); timer = 0; }
      if (observer) { observer.disconnect(); observer = null; }
      if (typeof window !== 'undefined' && window.removeEventListener) window.removeEventListener('resize', schedule);
      restore();
    }
  };
}

function registerNavigationShortcuts(ctx, controller) {
  const make = (id, label, code, run) => ctx.shortcuts.register({
    id, label: () => label, aliases: [],
    // 仅声明 Desktop 三个 profile；Web 不声明该绑定（宿主 Web 白名单不接受单修饰 Bracket）。
    defaults: {
      'desktop:macos': { code, modifiers: ['primary'] },
      'desktop:windows': { code, modifiers: ['primary'] },
      'desktop:linux': { code, modifiers: ['primary'] }
    },
    regions: ['page', 'editable'], modals: [],
    resolve: context => context && context.modal ? { status: 'pass' } : { status: 'handled', run }
  });
  const disposeBack = make(NAVIGATION_BACK_ID, '返回', 'BracketLeft', () => controller.back());
  const disposeForward = make(NAVIGATION_FORWARD_ID, '前进', 'BracketRight', () => controller.forward());
  return () => { disposeBack(); disposeForward(); };
}

function mountCodexNavigation(ctx) {
  const controls = createSnapshotStore(NAVIGATION_EMPTY);
  const controller = createNavigationController({
    read: () => navigationRouteOf(ctx.layout.panelInfo.getSnapshot(), ctx.sessions.list.getSnapshot()),
    restore: route => restoreNavigationRoute(ctx, route),
    schedule: callback => queueMicrotask(callback),
    onState: state => {
      const previous = controls.getSnapshot();
      if (previous.canBack === state.canBack && previous.canForward === state.canForward && previous.busy === state.busy && previous.index === state.index && previous.entries.length === state.entries.length) return;
      controls.set(state);
    }
  });
  const disposeEffect = ctx.effect(() => {
    const style = document.createElement('style');
    style.dataset.dscCodexNavigation = '';
    style.textContent = typeof NAVIGATION_CSS_TEXT === 'string' ? NAVIGATION_CSS_TEXT : '';
    document.head.appendChild(style);
    const body = document.body;
    const previous = body.getAttribute('data-dsc-codex-navigation');
    body.setAttribute('data-dsc-codex-navigation', '');
    const unsubscribeLayout = ctx.layout.panelInfo.subscribe(() => controller.refresh());
    const unsubscribeSessions = ctx.sessions.list.subscribe(() => controller.refresh());
    const marker = createNavigationTitlebarMarker();
    const disposeShortcuts = registerNavigationShortcuts(ctx, controller);
    marker.start();
    controller.refresh();
    return () => {
      controller.dispose();
      disposeShortcuts();
      marker.dispose();
      unsubscribeSessions();
      unsubscribeLayout();
      if (previous === null) body.removeAttribute('data-dsc-codex-navigation'); else body.setAttribute('data-dsc-codex-navigation', previous);
      style.remove();
      controls.set(NAVIGATION_EMPTY);
    };
  }, 'codex-style: optional navigation history');
  const NavigationControls = makeNavigationControls(ctx, controls, controller);
  const disposeSlot = ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'codex-style:navigation' }, NavigationControls));
  return () => {
    disposeSlot();
    disposeEffect();
  };
}

    return module.exports;
  }
});
