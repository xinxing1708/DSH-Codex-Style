window.__ModuleLoader__.load({
  id: "@xinxing1708/dsh-codex-style",
  factory: function(require) {
    'use strict';
    const CSS_TEXT = "/* 自研界面令牌；尺寸与色值参考界面测量。来源说明见 THIRD_PARTY_NOTICES.md。 */\n\nbody[data-dsh-codex-style] {\n  /* ---- 间距 ---- */\n  --cx-spacing: 4px;\n  --cx-space-1: 4px;\n  --cx-space-2: 8px;\n  --cx-space-3: 12px;\n  --cx-space-4: 16px;\n  --cx-space-5: 20px;\n  --cx-space-6: 24px;\n  --cx-space-8: 32px;\n\n  /* ---- 圆角阶梯 ---- */\n  --cx-radius-2xs: 2px;\n  --cx-radius-xs: 4px;\n  --cx-radius-sm: 6px;\n  --cx-radius-md: 8px;\n  --cx-radius-lg: 10px;\n  --cx-radius-xl: 12px;\n  --cx-radius-2xl: 16px;\n  --cx-radius-3xl: 20px;\n  --cx-radius-4xl: 24px;\n  --cx-radius-composer: 24px;\n  --cx-radius-full: 9999px;\n\n  /* ---- 暗色面（深色界面：导航/顶栏 #202020、侧栏 #1b1b1b、对话区 #181818） ---- */\n  --cx-window: #202020;\n  --cx-sidebar: #1b1b1b;\n  --cx-surface: #181818;\n  --cx-thread: #171717;\n  --cx-nested: #212121;\n  --cx-elevated: #282828;\n  --cx-summary: #2d2d2d;\n  --cx-hover: rgba(255, 255, 255, 0.045);\n  --cx-active: rgba(255, 255, 255, 0.08);\n\n  /* ---- 边框 ---- */\n  --cx-border-l1: rgba(255, 255, 255, 0.08);\n  --cx-border-l2: rgba(255, 255, 255, 0.04);\n  --cx-border-l3: rgba(255, 255, 255, 0.16);\n  --cx-border-strong: rgba(255, 255, 255, 0.16);\n  /* 侧栏分割线：2026-10-26 用户截图的静态与悬停灰度。 */\n  --cx-sidebar-divider: #323232;\n  --cx-sidebar-divider-hover: #535353;\n\n  /* ---- 文本 ---- */\n  --cx-text: #ffffff;\n  --cx-text-2: rgba(255, 255, 255, 0.7);\n  --cx-text-3: rgba(255, 255, 255, 0.5);\n  --cx-text-4: rgba(255, 255, 255, 0.32);\n  --cx-text-inverse: #0d0d0d;\n\n  /* ---- 强调 / 状态 ---- */\n  --cx-accent: #0285ff;\n  --cx-accent-soft: #339cff;\n  --cx-link: #9bc8f8;\n  --cx-focus: #339cff;\n  --cx-success: #40c977;\n  --cx-danger: #ff6764;\n  --cx-warning: #ff8549;\n  --cx-attention: #3a83f7;\n\n  /* ---- diff ---- */\n  --cx-diff-add-bg: rgba(64, 201, 119, 0.23);\n  --cx-diff-del-bg: rgba(255, 103, 100, 0.23);\n  --cx-diff-add-mark: #40c977;\n  --cx-diff-del-mark: #ff6764;\n\n  /* ---- 字体 ---- */\n  --cx-font-sans: -apple-system, system-ui, \"Segoe UI\", sans-serif;\n  --cx-font-mono: ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace;\n\n  /* ---- 字号 / 行高 ---- */\n  --cx-text-xs: 12px;\n  --cx-text-sm: 14px;\n  --cx-text-md: 16px;\n  --cx-text-lg: 18px;\n  --cx-leading-xs: 16px;\n  --cx-leading-sm: 22px;\n  --cx-leading-md: 24px;\n  --cx-leading-lg: 28px;\n\n  /* ---- 字重 ---- */\n  --cx-weight-regular: 400;\n  --cx-weight-medium: 500;\n  --cx-weight-semibold: 600;\n  --cx-weight-bold: 700;\n  --cx-weight-shell: 445; /* 外壳专用非标准字重 */\n\n  /* ---- 动效 ---- */\n  --cx-dur-fast: 120ms;\n  --cx-dur: 150ms;\n  --cx-dur-relaxed: 300ms;\n  --cx-ease: ease;\n  --cx-ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);\n  --cx-ease-scroll: cubic-bezier(0.22, 1, 0.36, 1);\n\n  /* ---- 布局几何 ----\n     以真实 Codex 窗口截图（1988×1292 @1.5x）实测回填：\n     侧栏 288、标题栏 44、输入栈 710，详见 02-开发日志 第 10 轮。 */\n  --cx-titlebar-h: 44px;\n  --cx-rail-w: 52px;\n  --cx-sidebar-w: 288px;\n  --cx-thread-max: 768px;\n  --cx-right-w: 667px;\n  --cx-header-h: 48px;\n  --cx-row-h: 30px;\n  --cx-control-h: 28px;\n  --cx-send-h: 32px;\n  --cx-composer-stack-w: 768px; /* 2026-10-25 用户截图：左右各 16px，卡片 736 */\n  --cx-composer-h: 98px;\n  --cx-picker-h: 38px;\n\n  /* ---- 输入区实测色（真实截图取色） ---- */\n  --cx-picker-fill: #282828;\n  --cx-composer-fill: rgba(55, 55, 55, 0.94);\n\n  /* ---- 应用视口 ----\n     真实 DSH 窗口截图 1988×1292（Windows 150% 缩放）换算为 1325×861 CSS。\n     原型按此尺寸渲染，各栏占比才与真实界面一致（旧 1600 视口下主区偏宽）。 */\n  --cx-app-w: 1325px;\n  --cx-app-h: 861px;\n\n  /* ---- 推理强度选择器 ----\n     尺寸/颜色按用户真实 Codex 录屏帧实测（1992×1296 @1.503x）。 */\n  --cx-reasoning-w: 255px;\n  --cx-reasoning-snap-dur: 140ms; /* 第 20 轮节点切换过渡，待用户验收 */\n  --cx-reasoning-fx-dur: 180ms;\n  --cx-reasoning-text-dur: 220ms;\n  /* 第 23 轮按用户新设计口径增强流速，两个亮带错速运行。 */\n  --cx-reasoning-flow-dur: 2.8s;\n  --cx-reasoning-bloom-dur: 4.2s;\n  --cx-reasoning-blue: #4c9bfe;\n  --cx-reasoning-track: #3e3e3e;\n  /* 第 22 轮：新录屏 100/660/900/1120 帧取色，深底与两种柔亮色分层。 */\n  --cx-reasoning-violet: #5134ad;\n  --cx-reasoning-purple: #844fcc;\n  --cx-reasoning-max-blue: #3a4ebd;\n  --cx-reasoning-max-glow: #bd8dff;\n  --cx-reasoning-max-ice: #adaaff;\n  --cx-reasoning-max-text: #b98cff;\n  --cx-reasoning-title: #4c9bfe;\n  /* 浮层/菜单底色：真实录屏帧取色 rgb(45,45,45) */\n  --cx-popover-fill: #2d2d2d;\n\n  /* ---- 阴影 ---- */\n  --cx-shadow-sm: 0 1px 2px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-lg: 0 4px 8px -2px rgb(0 0 0 / 0.1);\n  --cx-shadow-xl: 0 8px 16px -4px rgb(0 0 0 / 0.12);\n  --cx-shadow-2xl: 0 16px 32px -8px rgb(0 0 0 / 0.19);\n  --cx-composer-shadow:\n    0 0 0 0.5px var(--cx-border-strong),\n    0 3px 7.5px rgb(0 0 0 / 0.04),\n    0 0 20px rgb(0 0 0 / 0.05);\n\n  /* ---- z 轴 ---- */\n  --cx-z-ground: 0;\n  --cx-z-panel: 10;\n  --cx-z-floating: 20;\n  --cx-z-drawer: 40;\n  --cx-z-popover: 50;\n  --cx-z-overlay: 70;\n}\n\n/* ============ 导航栏 ============ */\n.dsc-rail {\n  grid-area: rail;\n  position: relative;\n  z-index: 30;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 0;\n  background: var(--cx-window);\n  border-right: 1px solid var(--cx-border-l2);\n}\n.dsc-rail__spacer { flex: 1; }\n.dsc-rail__item {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--cx-radius-md);\n  color: var(--cx-text-3);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease), color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-rail__item--active { background: var(--cx-active); color: var(--cx-text); }\n/* 插头先以不透明白色统一描边，再整体降低透明度，避免相交线段叠色发亮。 */\n.dsc-rail__plugin-icon { color: #fff; opacity: .5; stroke-width: 1.5; transition: opacity var(--cx-dur-fast) var(--cx-ease); }\n.dsc-rail__item:hover .dsc-rail__plugin-icon,\n.dsc-rail__item--active .dsc-rail__plugin-icon { opacity: 1; }\n.dsc-rail__item::after {\n  content: attr(data-tip);\n  position: absolute;\n  left: 44px;\n  top: 50%;\n  z-index: var(--cx-z-popover);\n  padding: 4px 8px;\n  border-radius: var(--cx-radius-sm);\n  border: 1px solid var(--cx-border-l1);\n  background: #2b2b2b;\n  color: var(--cx-text);\n  font-size: 12px;\n  line-height: 16px;\n  white-space: nowrap;\n  box-shadow: var(--cx-shadow-lg);\n  opacity: 0;\n  transform: translateY(-50%) translateX(-2px);\n  pointer-events: none;\n  transition: opacity var(--cx-dur-fast) var(--cx-ease), transform var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover::after { opacity: 1; transform: translateY(-50%) translateX(0); }\n\n/* ============ 侧栏 ============ */\n.dsc-sidebar {\n  grid-area: sidebar;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 8px;\n  background: var(--cx-sidebar);\n  border-right: 1px solid var(--cx-border-l2);\n  overflow: hidden;\n}\n.dsc-sidebar__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 44px;\n  margin: -8px -8px 6px;\n  padding: 0 6px 0 10px;\n}\n.dsc-brand { display: flex; align-items: center; gap: 7px; }\n.dsc-brand__mark { display: block; height: 19px; width: auto; }\n.dsc-brand__wordmark {\n  font-size: 17px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--cx-text);\n  line-height: 1;\n}\n.dsc-brand__badge {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  line-height: 1;\n  padding: 3px 5px 2px;\n  border-radius: 3px;\n  background: var(--cx-text);\n  color: var(--cx-window);\n}\n.dsc-sidebar__header-actions { display: flex; align-items: center; gap: 2px; }\n.dsc-new-chat {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 32px;\n  padding: 0 8px;\n  border-radius: var(--cx-radius-md);\n  font-size: 13px;\n  font-weight: var(--cx-weight-medium);\n  color: var(--cx-text);\n  background: var(--cx-active);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-new-chat:hover { background: rgba(255, 255, 255, 0.12); }\n.dsc-new-chat kbd { margin-left: auto; font-size: 11px; color: var(--cx-text-4); }\n\n/* 自有组件与公开 slot/region 锚点；外壳几何适配通过自有 data-dsc-* 标记集中处理。 */\nbody[data-dsh-codex-style] { background: var(--cx-window); color-scheme: dark; --shiki-token-constant: #4dabf7; --shiki-token-string: #69db7c; --shiki-token-comment: #adb5bd; --shiki-token-keyword: #faa2c1; --shiki-token-function: #b197fc; }\n/* 整个三列外壳实际缩窄 52px，让宿主 ResizeObserver、右栏与拖拽使用同一可用宽度。\n   不能用 padding-left 代替：宿主测量的是 getBoundingClientRect().width。 */\nbody[data-dsh-codex-chrome] [data-dsc-frame] { margin-left: var(--cx-rail-w); width: calc(100% - var(--cx-rail-w)); }\n/* 全屏右栏原本按 100vw 展开；扣掉独立导航后，继续尊重宿主二级侧栏的真实宽度。 */\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame] [data-sidebar-right-panel=\"fullscreen\"] { max-width: max(0px, calc(100vw - var(--cx-rail-w) - var(--dsh-windows-sidebar-width, 0px))); }\n/* data-slot 与公开 data-* 标记作为外观边界；编辑器、输入状态和动作仍由宿主持有。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] { --dsw-specific-input-major: var(--cx-composer-fill); --dsw-radius-panel: var(--cx-radius-composer); --dsw-alias-border-l2: var(--cx-border-strong); --dsw-elevation-soft: var(--cx-composer-shadow); --dsh-composer-card-max-width: calc(var(--cx-composer-stack-w) - 32px); }\n/* 单行卡片按截图为 736×98；输入区保留自然增高，发送/停止不改变工具行高度。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] > :has(> [data-composer-card]) { width: 100%; padding: 0; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] { min-height: var(--cx-composer-h); }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-input] { min-height: 42px; padding-left: 12px; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-placeholder] { left: 12px; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-dock] { display: flex; box-sizing: border-box; min-height: 20px; padding-top: 2px; }\n/* “+”沿用原生命令入口；悬停圆底与提示颜色按用户 Codex 截图校准。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:hover:not(:disabled) { background: #454545; }\nbody[data-dsh-codex-style]:has([data-slot=\"conversation.composer.bar\"] [data-composer-card] button[aria-haspopup=\"listbox\"]:is(:hover,:focus-visible):not(:disabled)) [role=\"tooltip\"] { background: #2d2d2d; color: #dfdfdf; }\n/* 顶部工作区/模式只改触发器轮廓，菜单和宿主动作继续沿用。 */\nbody[data-dsh-codex-style] :is([data-slot=\"conversation.hero.workspace\"],[data-slot=\"conversation.hero.agentPreset\"]) button { border-radius: 999px; corner-shape: round; }\n/* 所有提交状态共享占位；保留原提交/中断回调、Tooltip 和快捷键。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"], [aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) { width: 28px; height: 28px; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"], [aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) svg { width: 14px; height: 14px; }\n/* 中英文发送标签；保留宿主提交与禁用状态。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]) { --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; color: #363636; opacity: 1; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]):disabled { --dsw-alias-button-info-fill: #8b8b8b; }\n/* 停止生成复用宿主按钮与中断动作；普通态、悬停态均为参考图的浅灰圆底和深灰方块。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) { --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; color: #2d2d2d; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"停止生成\"], [aria-label=\"Stop generating\"]) svg rect { rx: 1.5px; }\n/* 正文字体颜色：按 Codex 截图采样 #dfdfdf（原 #ffffff 偏亮）。仅覆盖对话内容区，不影响按钮、菜单等其它主文本。 */\nbody[data-dsh-codex-style] [data-conversation-content] { --dsw-alias-label-primary: #dfdfdf; --dsw-alias-link: var(--cx-link); }\n/* 正文列随输入卡宽度对齐，隐藏宿主两侧的宽度拖拽柄及其整条命中区域。 */\nbody[data-dsh-codex-style] [data-conversation-content] > [data-width-handle] { display: none; }\n/* 原 sidebar/settings 父级继续挂载以保留原生页面与子槽位所有权；只隐藏其旧外观。 */\nbody[data-dsh-codex-chrome] [data-slot=\"sidebar\"] { display: block !important; position: relative; width: 100%; height: 100%; visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-slot=\"conversation.composer.bar\"] { --dsh-composer-side-clearance: 0px; display: flex !important; flex-direction: column; align-items: stretch; align-self: center; width: min(calc(100% - 32px), var(--dsh-composer-card-max-width)); max-width: var(--dsh-composer-card-max-width); position: relative; }\nbody[data-dsh-codex-chrome] [data-conversation-region=\"composer\"] :has(> [data-slot=\"conversation.composer.bar\"]) { width: 100%; align-self: stretch; padding-bottom: 0; gap: 0; }\n/* 两侧等量保留原生滚动条空间，使空态与会话中的输入卡共用同一中线。 */\nbody[data-dsh-codex-chrome] [data-conversation-content] > [data-conversation-scroll] { scrollbar-gutter: stable both-edges; margin-right: 0; }\n/* 空态保留官方编辑器、草稿、附件、“+”与 chain；没有重建输入状态或移动节点。 */\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] { visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-region=\"composer\"] { position: absolute; inset: auto var(--dsh-scrollbar-width, 15px) 0; z-index: 7; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.composer.bar\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.input.dock\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-composer-overlay] { visibility: visible; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"][data-dsc-hero-layout] [data-slot=\"conversation.hero.agentPreset\"] { visibility: visible; display: inline-flex !important; position: fixed; top: calc(var(--dsc-hero-card-top) - 33px); right: calc(100vw - var(--dsc-hero-card-right) + 18px); z-index: 8; height: 28px; max-width: 180px; }\n.dsc-ui { font: 14px/22px var(--cx-font-sans); color: var(--cx-text); box-sizing: border-box; }\n.dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { box-sizing: border-box; }\n.dsc-ui button, .dsc-ui input { font: inherit; color: inherit; }\n.dsc-ui button { border: 0; cursor: pointer; background: none; }\n.dsc-ui button:disabled { cursor: default; opacity: .45; }\n.dsc-ui button:focus-visible, .dsc-ui [role=slider]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: 2px; }\n.dsc-ui svg { flex: none; }\n.dsc-update-control { display: inline-flex; align-items: center; gap: 12px; -webkit-app-region: no-drag; }\n.dsc-update-download { display: inline-flex; align-items: center; gap: 8px; }\n.dsc-update-progress { display: block; width: 112px; height: 5px; overflow: hidden; border-radius: 999px; background: #ffffff1f; }\n.dsc-update-progress-fill { display: block; width: 100%; height: 100%; border-radius: inherit; background: #72b4ff; transform-origin: left; transition: transform 180ms ease; }\n.dsc-update-progress[data-indeterminate=true] .dsc-update-progress-fill { width: 32%; animation: dsc-update-download 1.2s ease-in-out infinite; }\n.dsc-update-progress-label { min-width: 34px; color: var(--cx-text-2); font-size: 12px; font-variant-numeric: tabular-nums; }\n@keyframes dsc-update-download { from { transform: translateX(-110%); } to { transform: translateX(410%); } }\n.dsc-update-notice { position: fixed; right: 24px; bottom: 24px; width: 320px; max-width: calc(100vw - 32px); padding: 14px; z-index: 10000; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; animation: dsc-pop-in 130ms ease both; -webkit-app-region: no-drag; }\n/* 社区版运行提醒：固定右下角，位于更新通知之上；窄窗不超出视口，复用弹层与文本 token。 */\n.dsc-community-notice { position: fixed; right: 24px; bottom: 24px; z-index: 10001; box-sizing: border-box; width: max-content; max-width: min(420px, calc(100vw - 48px)); padding: 12px 16px; border: 1px solid var(--cx-border-l1); border-radius: 14px; background: var(--cx-popover-fill); color: var(--cx-text); font-size: 13px; line-height: 20px; box-shadow: var(--cx-shadow-2xl); animation: dsc-pop-in 130ms ease both; -webkit-app-region: no-drag; }\n.dsc-community-notice-text { display: block; }\n@media (prefers-reduced-motion: reduce) { .dsc-community-notice { animation: none; } }\n.dsc-ui.dsc-update-panel { padding: 14px; }\n.dsc-update-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }\n.dsc-ui .dsc-update-close { display: grid; place-items: center; width: 24px; height: 24px; padding: 0; border-radius: 6px; color: var(--cx-text-2); }\n.dsc-update-close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-update-message { margin: 14px 0 10px; font-weight: 500; }\n.dsc-update-message[data-state=update] { color: #72b4ff; }\n.dsc-update-message[data-state=error] { color: #ff8585; }\n.dsc-update-versions { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; margin: 0; font-size: 13px; }\n.dsc-update-versions dt { color: var(--cx-text-2); }\n.dsc-update-versions dd { margin: 0; text-align: right; overflow-wrap: anywhere; }\n.dsc-update-note { margin: 10px 0 0; color: var(--cx-text-2); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }\n.dsc-update-note > span { display: block; color: var(--cx-text-3); }\n.dsc-ui .dsc-update-retry { margin-top: 14px; padding: 5px 10px; border: 1px solid var(--cx-border-l3); border-radius: 7px; }\n.dsc-update-retry:hover { background: var(--cx-hover); }\n.dsc-update-spin { animation: dsc-update-spin .9s linear infinite; }\n@keyframes dsc-update-spin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) { .dsc-update-spin, .dsc-update-progress-fill { animation: none !important; transition: none; } }\n.dsc-proto-icon { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 1; }\n.dsc-proto-icon svg { display: block; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n/* 同一内容 portal 到 body：常驻时跟随宿主列，退场与浮卡不受 0px 列裁剪。只动画透明度和位移。 */\n.dsc-sidebar-shell { visibility: hidden; position: fixed; z-index: 20; min-width: 0; min-height: 0; display: flex; opacity: 0; transform: translateX(-24px); pointer-events: none; transition: opacity 180ms ease, transform 240ms var(--cx-ease-out), visibility 0s 240ms; -webkit-app-region: no-drag; }\n.dsc-sidebar-shell[data-open=true] { visibility: visible; opacity: 1; transform: translateX(0); pointer-events: auto; transition: opacity 180ms ease, transform 260ms var(--cx-ease-out), visibility 0s; }\n.dsc-sidebar-shell[data-mode=docked] > .dsc-sidebar { border-top-left-radius: 16px; border-right-color: transparent; }\n/* rc.2/rc.3 原生 DragHandle 的公开 data-side 保留指针捕获与宽度动作。\n   热区仍为原生 8px；抬到常驻侧栏 portal 之上，避免左半边被遮住。\n   只绘制伪元素，不增加占位；悬停/拖动用 transform 加粗，移出恢复。 */\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"] { z-index: 21; }\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]::after { content: ''; position: absolute; top: 0; bottom: 0; left: calc(50% - 1px); width: 1px; background: var(--cx-sidebar-divider); transform: scaleX(1); transform-origin: right center; pointer-events: none; transition: background-color var(--cx-dur-fast) var(--cx-ease), transform var(--cx-dur-fast) var(--cx-ease); }\nbody[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]:is(:hover,[data-dragging])::after { background: var(--cx-sidebar-divider-hover); transform: scaleX(1.5); }\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-codex-chrome] [data-dsc-frame] > [data-side=\"sidebar\"]::after { transition: none; }\n}\n.dsc-sidebar-shell[data-mode=floating] { z-index: 40; transform: translateX(-12px); transition: opacity 150ms ease, transform 180ms var(--cx-ease-out), visibility 0s 180ms; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] { transform: translateX(0); transition-delay: 0s; }\n.dsc-sidebar-shell[data-mode=floating]::before { content: ''; position: absolute; top: 0; bottom: 0; left: -12px; width: 12px; }\n.dsc-sidebar-shell[data-mode=floating] > .dsc-sidebar { --cx-sidebar: #2c2c2c; border: 1px solid var(--cx-border-l1); border-radius: 12px; box-shadow: 0 0 0 3px #18181880, 0 8px 28px #0005; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] > .dsc-sidebar { animation: dsc-sidebar-content-in 150ms var(--cx-ease-out) both; }\n@keyframes dsc-sidebar-content-in { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }\n.dsc-independent-rail { visibility: visible; position: fixed; top: var(--dsh-frame-chrome-top, 0px); bottom: 0; left: 0; width: var(--cx-rail-w); z-index: 25; min-height: 0; padding-bottom: 56px; -webkit-app-region: no-drag; }\n.dsc-extension-navigation-anchor { flex: 1; align-self: stretch; min-height: 0; }\n/* 原生 panellist 继续负责图标注入、选中态、点击和卸载；只重排其可见区域。\n   位置来自自有轨道的剩余空间，超高时独立滚动，不覆盖底部齿轮。\n   Windows 原样式在 collapsed 时 display:none，并在开合时淡出，故明确覆盖这两项。 */\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] { visibility: visible; display: flex !important; position: fixed; left: var(--dsc-extension-left); top: var(--dsc-extension-top); width: var(--dsc-extension-width); max-height: var(--dsc-extension-height); min-height: 0; z-index: 26; flex-direction: column; align-items: center; gap: 4px !important; padding: 0; margin: 0 !important; box-sizing: border-box; overflow-x: hidden; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #ffffff26 transparent; opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-hidden] { display: none !important; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row] { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; min-height: 36px; padding: 0; margin: 0; border: 0; border-radius: var(--cx-radius-md); background: transparent; color: var(--cx-text-3); cursor: pointer; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:hover { color: var(--cx-text); background: var(--cx-hover); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row][aria-current=page] { color: var(--cx-text); background: var(--cx-active); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-label] { display: none; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] { display: inline-flex; align-items: center; justify-content: center; line-height: 1; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] svg { display: block; max-width: 20px; max-height: 20px; }\n.dsc-navigation-error { position: fixed; left: calc(var(--cx-rail-w) + 8px); top: var(--dsh-frame-overlay-top, 20px); z-index: 50; max-width: 320px; }\n.dsc-rail .dsc-rail__item { color: var(--cx-text-3); background: transparent; flex: none; padding: 0; }\n.dsc-rail .dsc-rail__item:hover { color: var(--cx-text); background: var(--cx-hover); }\n.dsc-rail .dsc-rail__item--active { color: var(--cx-text); background: var(--cx-active); }\n.dsc-rail__item[data-preview-enabled=true]::after { display: none; }\n.dsc-rail__item[data-dsc-preview-trigger=more]::after { display: block; }\n.dsc-rail__item[data-dsc-preview-trigger=more]:focus-visible::after { opacity: 1; transform: translateY(-50%) translateX(0); }\n.dsc-sidebar { flex: 1; min-width: 0; min-height: 0; overflow: hidden; }\n.dsc-sidebar .dsc-sidebar__header { flex: none; }\n.dsc-sidebar .dsc-brand { min-width: 0; gap: 6px; }\n.dsc-sidebar .dsc-brand__mark { height: 19px; max-width: 25px; }\n.dsc-sidebar .dsc-brand__badge { font-size: 8px; padding: 3px 4px 2px; }\n.dsc-sidebar .dsc-sidebar__header-actions { margin-left: auto; }\n/* 用户截图灰度：品牌字标与徽章浅底压低亮度，鲸鱼标识仅以透明度匹配；不改全局正文。 */\n.dsc-sidebar .dsc-brand__mark { opacity: .72; }\n.dsc-sidebar .dsc-brand__wordmark { color: #c2c2c2; }\n.dsc-sidebar .dsc-brand__badge { background: #b8b8b8; }\n/* Codex：新聊天默认无底色、不显示快捷键，仅悬停时出现灰色背景。 */\n.dsc-sidebar .dsc-new-chat { flex: none; justify-content: flex-start; width: 100%; font-size: 13px; font-weight: var(--cx-weight-medium); background: transparent; color: #c2c2c2; margin-bottom: 8px; }\n.dsc-sidebar .dsc-new-chat:hover { background: rgba(255,255,255,.08); }\n.dsc-sidebar .dsc-workspaces { flex: 1; min-height: 0; height: auto; }\n/* 同时限定两个自有类，避免后面的通用 .dsc-search 把它重新变成伸展项。 */\n.dsc-search.dsc-sidebar-search { flex: none; height: 32px; margin: 2px 0 8px; min-height: 32px; }\n.dsc-sidebar-search button { padding: 0 3px; }\n/* 搜索图标与清除键：恢复被 `.dsc-ui button {color: inherit}` 覆盖的自有灰阶。 */\n.dsc-sidebar .dsc-sidebar-search button { color: #8f8f8f; }\n.dsc-sidebar .dsc-sidebar-search button:hover, .dsc-sidebar .dsc-sidebar-search button:focus-visible { color: #b4b4b4; }\n.dsc-sidebar .dsc-tree-tools { justify-content: space-between; padding: 12px 0 4px 8px; }\n.dsc-tree-tools-label { font-size: 12px; color: var(--cx-text-3); }\n.dsc-projects-toggle { display: flex; align-items: center; gap: 4px; height: 28px; padding: 0; }\n.dsc-projects-toggle svg { color: var(--cx-text-3); transform: rotate(-90deg); transition: transform 180ms ease; }\n.dsc-projects-toggle[aria-expanded=true] svg { transform: rotate(0); }\n.dsc-sidebar .dsc-tree-scroll { padding: 0; scrollbar-color: #ffffff26 transparent; scrollbar-width: thin; }\n.dsc-section-page-title { font-size: 17px; font-weight: 600; }\n.dsc-secondary-nav { display: flex; flex-direction: column; gap: 4px; min-height: 0; overflow: auto; padding-top: 6px; }\n.dsc-secondary-nav .dsc-secondary-item { display: flex; align-items: center; gap: 8px; min-height: 32px; width: 100%; padding: 0 8px; border-radius: var(--cx-radius-md); text-align: left; color: var(--cx-text-2); font-size: 13px; }\n.dsc-secondary-nav .dsc-secondary-item.is-active, .dsc-secondary-nav .dsc-secondary-item:hover { background: var(--cx-active); color: var(--cx-text); }\n.dsc-secondary-item .dsc-proto-icon svg { width: 16px; height: 16px; }\n/* 「更多」main 页面：与正文同色的空白页。 */\n.dsc-more-page { box-sizing: border-box; width: 100%; height: 100%; min-height: 100%; background: #181818; }\n.dsc-window-sidebar-toggle { visibility: visible; position: fixed; top: 6px; left: 12px; z-index: 35; -webkit-app-region: no-drag; }\n.dsc-collapsed-new-chat { display: none; align-items: center; margin-right: 8px; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] .dsc-collapsed-new-chat { display: flex; }\n.dsc-collapsed-new-chat .dsc-icon-button { width: 28px; height: 28px; color: #8f8f8f; }\n.dsc-collapsed-new-chat .dsc-icon-button:hover, .dsc-collapsed-new-chat .dsc-icon-button:focus-visible { color: #b4b4b4; }\n/* 会话标题左侧常驻 leading：工作区标识与“仅收起显示”的新建按钮分离；无工作区时不留空位。 */\n.dsc-header-leading { display: flex; align-items: center; gap: 4px; min-width: 0; -webkit-app-region: no-drag; }\n.dsc-header-leading > .dsc-collapsed-new-chat { order: -1; }\n.dsc-workspace-mark { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 28px; height: 28px; border-radius: 7px; color: #dfdfdf; cursor: default; -webkit-app-region: no-drag; }\n.dsc-workspace-mark:focus-visible { outline: 1px solid #ffffff40; outline-offset: -1px; }\n/* 深灰圆角提示 portal 到 body，避免 header 裁剪；同一元素不设原生 title。 */\n.dsc-ui.dsc-workspace-tooltip { position: fixed; z-index: 10002; transform: translate(-50%, -100%); max-width: calc(100vw - 16px); overflow: hidden; padding: 5px 11px; border: 1px solid #ffffff08; border-radius: 12px; background: #2d2d2d; color: #dfdfdf; font-size: 13px; line-height: 18px; text-overflow: ellipsis; white-space: nowrap; box-shadow: 0 2px 5px #0002; pointer-events: none; -webkit-app-region: no-drag; }\n.dsc-gear-launcher { visibility: visible; position: fixed; left: 8px; bottom: 12px; z-index: 35; }\n.dsc-gear-launcher .dsc-gear-button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: var(--cx-radius-md); color: var(--cx-text-3); }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: var(--cx-hover); color: var(--cx-text); }\n/* 自绘悬停提示，避免系统 title 突然出现；菜单打开时不叠加提示。 */\n.dsc-gear-launcher .dsc-gear-button { position: relative; isolation: isolate; transition: color 150ms ease; }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: none; }\n.dsc-gear-button::before { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--cx-hover); opacity: 0; transition: opacity 150ms ease; pointer-events: none; }\n.dsc-gear-button:hover::before, .dsc-gear-button[aria-expanded=true]::before, .dsc-gear-button:focus-visible::before { opacity: 1; }\n.dsc-gear-button::after { content: attr(aria-label); position: absolute; left: calc(100% + 8px); top: 50%; padding: 5px 9px; border: 1px solid var(--cx-border-l1); border-radius: 7px; background: var(--cx-popover-fill); color: var(--cx-text); font-size: 12px; line-height: 18px; white-space: nowrap; box-shadow: 0 4px 12px #0004; pointer-events: none; opacity: 0; transform: translate(-3px, -50%); transition: opacity 150ms ease, transform 150ms ease; }\n.dsc-gear-button[aria-expanded=false]:hover::after, .dsc-gear-button[aria-expanded=false]:focus-visible::after { opacity: 1; transform: translate(0, -50%); }\n/* DSH 本体更新：齿轮正上方 36px 透明按钮内嵌 24px 蓝圆；仅在插件外壳生效时出现，原生侧栏指示器随宿主侧栏一同隐藏。 */\n.dsc-desktop-update-launcher { display: none; position: fixed; left: 8px; bottom: 52px; z-index: 35; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] .dsc-desktop-update-launcher { display: block; }\nbody[data-dsh-codex-chrome]:has(.dsc-desktop-update) .dsc-independent-rail { padding-bottom: 96px; }\n.dsc-desktop-update { position: relative; }\n.dsc-ui .dsc-desktop-update-button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: var(--cx-radius-md); transition: background-color 150ms ease; }\n.dsc-ui .dsc-desktop-update-button:hover, .dsc-ui .dsc-desktop-update-button:focus-visible { background: var(--cx-hover); }\n.dsc-ui .dsc-desktop-update-button[aria-disabled=true] { cursor: default; }\n.dsc-desktop-update-dot { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: var(--cx-accent-soft); color: #fff; }\n.dsc-desktop-update-ring { transition: stroke-dasharray 240ms ease; }\n.dsc-desktop-update-tip { position: absolute; left: calc(100% + 8px); top: 50%; display: flex; flex-direction: column; gap: 2px; min-width: max-content; padding: 6px 10px; border: 1px solid var(--cx-border-l1); border-radius: 10px; background: var(--cx-popover-fill); color: var(--cx-text-2); font-size: 12px; line-height: 18px; white-space: nowrap; box-shadow: 0 4px 12px #0004; pointer-events: none; opacity: 0; transform: translate(-3px, -50%); transition: opacity 150ms ease, transform 150ms ease; }\n.dsc-desktop-update-tip strong { color: var(--cx-text); font-size: 13px; font-weight: 500; font-variant-numeric: tabular-nums; }\n.dsc-desktop-update-tip .dsc-update-progress { margin-top: 5px; }\n.dsc-desktop-update:hover .dsc-desktop-update-tip, .dsc-desktop-update:focus-within .dsc-desktop-update-tip { opacity: 1; transform: translate(0, -50%); }\n@media (prefers-reduced-motion: reduce) { .dsc-desktop-update-ring, .dsc-desktop-update-tip { transition: none; } }\n.dsc-app-menu { padding: 5px; }\n.dsc-menu-separator { height: 1px; margin: 4px 6px; background: var(--cx-border-l1); }\n.dsc-app-menu .dsc-account-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px; text-align: left; border-radius: var(--cx-radius-md); }\n.dsc-account-row:hover { background: var(--cx-active); }\n.dsc-account-row > img, .dsc-account-avatar { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--cx-active); object-fit: cover; }\n.dsc-account-row > span:last-child { display: flex; flex-direction: column; min-width: 0; }\n.dsc-account-row strong { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-account-row small { font-size: 11px; color: var(--cx-text-3); }\n.dsc-empty-hero { visibility: visible; position: fixed; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 24px; transform: translate(-50%,-50%); pointer-events: none; }\n.dsc-empty-hero svg { color: #525252; }\n.dsc-empty-hero h1 { font-size: 26px; line-height: 34px; font-weight: 400; color: var(--cx-text-2); margin: 0; white-space: nowrap; }\n.dsc-hero-projectbar { visibility: visible; position: fixed; z-index: 6; height: calc(var(--cx-picker-h) + var(--cx-radius-composer)); padding: 4px 4px var(--cx-radius-composer); background: var(--cx-picker-fill); border-radius: 20px; }\n.dsc-hero-projectbar .dsc-project-picker { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; max-width: calc(100% - 180px); color: var(--cx-text-2); font-size: 13px; border-radius: var(--cx-radius-full); corner-shape: round; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-hero-projectbar .dsc-project-picker:hover, .dsc-hero-projectbar .dsc-project-picker[aria-expanded=true] { background: var(--cx-active); }\n.dsc-brand-mark { width: 25px; height: 20px; object-fit: contain; }\n.dsc-brand { display: inline-flex; align-items: center; gap: 7px; }\n.dsc-brand strong { font-size: 17px; letter-spacing: -.02em; }\n.dsc-brand small { font: 700 8px/16px var(--cx-font-sans); letter-spacing: .12em; padding: 0 4px; color: #131313; background: #eee; border-radius: 3px; }\n.dsc-settings-trigger { display: inline-flex; gap: 8px; align-items: center; }\n.dsc-workspaces { height: 100%; min-height: 0; width: 100%; display: flex; flex-direction: column; background: var(--cx-sidebar); }\n.dsc-tree-tools { display: flex; gap: 4px; align-items: center; padding: 6px 8px 12px; }\n.dsc-search { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; border-radius: 8px; background: #ffffff08; padding: 3px 8px; color: var(--cx-text-3); }\n.dsc-search input { min-width: 0; width: 100%; border: 0; outline: none; background: none; font-size: 12px; }\n.dsc-search:focus-within { box-shadow: 0 0 0 1px var(--cx-border-l3); }\n.dsc-search input::placeholder { color: var(--cx-text-3); }\n.dsc-icon-button { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 7px; color: var(--cx-text-2); }\n.dsc-icon-button:hover { background: var(--cx-active); }\n/* 用户截图灰度：自有侧栏图标常态 #8f8f8f、悬停/键盘聚焦 #b4b4b4；禁用沿用父级透明度。 */\n.dsc-sidebar .dsc-icon-button { color: #8f8f8f; }\n.dsc-sidebar .dsc-icon-button:hover, .dsc-sidebar .dsc-icon-button:focus-visible { color: #b4b4b4; }\n.dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button { color: #8f8f8f; }\n.dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button:hover, .dsc-ui.dsc-window-sidebar-toggle .dsc-icon-button:focus-visible { color: #b4b4b4; }\n.dsc-tree-scroll { flex: 1; min-height: 0; overflow: auto; scrollbar-width: thin; padding: 0 8px; }\n.dsc-section-title { padding: 12px 8px 6px; font-size: 12px; font-weight: 500; color: var(--cx-text-3); }\n.dsc-thread, .dsc-project { display: flex; align-items: center; height: 30px; border-radius: 7px; position: relative; }\n.dsc-thread:hover, .dsc-project:hover, .dsc-thread.is-active { background: #ffffff0d; }\n.dsc-ui .dsc-thread-main, .dsc-ui .dsc-project-main { display: flex; flex: 1; align-items: center; gap: 7px; min-width: 0; height: 100%; padding: 0 8px; text-align: left; color: #c2c2c2; }\n.dsc-thread-title, .dsc-project-main > span { min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-ui .dsc-thread-main { padding-right: 62px; }\n.dsc-thread-title-text { display: inline-block; width: max-content; max-width: none; vertical-align: top; }\n.dsc-thread-title[data-overflow=true] { text-overflow: clip; mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent); }\n.dsc-thread:hover .dsc-thread-title[data-overflow=true] .dsc-thread-title-text,\n.dsc-thread-main:focus-visible .dsc-thread-title[data-overflow=true] .dsc-thread-title-text { animation: dsc-title-scroll var(--dsc-title-duration) linear 250ms infinite alternate; }\n@keyframes dsc-title-scroll { from { transform: translateX(0); } to { transform: translateX(var(--dsc-title-shift)); } }\n.dsc-thread-time { position: absolute; right: 9px; font-size: 10px; color: var(--cx-text-4); transition: opacity 120ms ease; }\n.dsc-thread-completion { position: absolute; right: 9px; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: #4c9bfe; transform: translateY(-50%); pointer-events: none; }\n.dsc-thread-running { position: absolute; right: 9px; top: 50%; display: grid; place-items: center; width: 12px; height: 12px; color: #969696; transform: translateY(-50%); pointer-events: none; }\n.dsc-running-spinner { animation: dsc-session-spin 1.9s linear infinite; }\n.dsc-thread:hover .dsc-thread-time, .dsc-thread:has(:focus-visible) .dsc-thread-time { display: none; }\n.dsc-thread:hover .dsc-thread-completion, .dsc-thread:has(:focus-visible) .dsc-thread-completion { opacity: 0; }\n.dsc-thread:hover .dsc-thread-running, .dsc-thread:has(:focus-visible) .dsc-thread-running { opacity: 0; }\n.dsc-thread .dsc-state[data-state=idle] { display: none; }\n.dsc-thread-actions { position: absolute; top: 0; right: 4px; height: 100%; display: flex; align-items: center; gap: 1px; opacity: 0; pointer-events: none; transition: opacity 150ms ease; }\n.dsc-thread:hover .dsc-thread-actions, .dsc-thread:has(:focus-visible) .dsc-thread-actions { opacity: 1; pointer-events: auto; }\n.dsc-ui .dsc-thread-action { display: grid; place-items: center; flex: none; width: 25px; height: 26px; padding: 0; border-radius: 5px; color: #969696; transition: color 120ms ease; }\n.dsc-ui .dsc-thread-action:hover, .dsc-ui .dsc-thread-action:focus-visible { color: #d2d2d2; }\n.dsc-thread-action svg { width: 14px; height: 14px; }\n.dsc-row-tooltip { position: fixed; z-index: 10001; pointer-events: none; padding: 5px 11px; border: 1px solid #ffffff08; border-radius: 13px; color: #dfdfdf; background: #2d2d2d; font-size: 13px; line-height: 18px; white-space: nowrap; box-shadow: 0 2px 5px #0002; opacity: 0; visibility: hidden; transform: translateY(3px); transition: opacity 80ms ease, transform 80ms ease, visibility 0s 80ms; }\n.dsc-row-tooltip[data-open=true] { opacity: 1; visibility: visible; transform: translateY(0); transition: opacity 120ms ease 350ms, transform 120ms ease 350ms, visibility 0s 350ms; }\n.dsc-state { color: var(--cx-text-3); flex: none; display: flex; align-items: center; }\n.dsc-state[data-state=pending] { color: var(--cx-warning); }\n.dsc-row-action { display: flex; opacity: 0; pointer-events: none; transition: opacity 150ms ease; width: 25px; height: 25px; align-items: center; justify-content: center; border-radius: 5px; padding: 0; margin-right: 3px; color: var(--cx-text-3); }\n.dsc-thread:hover .dsc-row-action, .dsc-project:hover .dsc-row-action, .dsc-thread:has(:focus-visible) .dsc-row-action, .dsc-project:has(:focus-visible) .dsc-row-action { opacity: 1; pointer-events: auto; }\n.dsc-row-action:hover { color: #fff; background: var(--cx-active); }\n/* 本轮按用户录像为项目内容局部开放布局动画；外壳与其他面板的尺寸规则保持原约定。 */\n.dsc-project-fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 180ms cubic-bezier(.2,.8,.2,1), opacity 150ms ease; }\n.dsc-project-fold[data-open=true] { grid-template-rows: 1fr; opacity: 1; }\n.dsc-project-clip { min-height: 0; overflow: hidden; }\n.dsc-project-children { padding-left: 14px; }\n.dsc-project-children, .dsc-project-list { transform: translateY(-4px); transition: transform 180ms cubic-bezier(.2,.8,.2,1); }\n.dsc-project-fold[data-open=true] > .dsc-project-clip > :is(.dsc-project-children, .dsc-project-list) { transform: translateY(0); }\n.dsc-project-children .dsc-state { display: none; }\n.dsc-empty { display: block; color: var(--cx-text-3); padding: 10px 12px; font-size: 12px; }\n.dsc-archive-toggle { padding: 8px 12px; display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--cx-text-3); }\n.dsc-archive-toggle input { accent-color: var(--cx-accent); }\n.dsc-thread.is-archived { opacity: .55; }\n.dsc-error { padding: 4px 8px; color: var(--cx-danger); font: 12px/17px var(--cx-font-sans); white-space: normal; max-width: 310px; }\n.dsc-menu { z-index: 10000; padding: 6px; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; overflow: auto; animation: dsc-pop-in 130ms ease both; }\n.dsc-menu-heading { font-size: 12px; color: var(--cx-text-3); padding: 5px 8px 8px; }\n.dsc-option { width: 100%; display: flex; gap: 9px; align-items: center; text-align: left; padding: 7px 8px; border-radius: 7px; min-height: 32px; }\n.dsc-option:hover, .dsc-option:focus-visible { background: #ffffff12; }\n.dsc-option-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; line-height: 20px; }\n.dsc-option-copy small { font-size: 12px; color: var(--cx-text-3); line-height: 17px; }\n/* 行悬停详情卡：几何按原型实测（项目卡 321×130、右侧 5px；会话卡 470 宽、右侧 12px、上移 6px）。 */\n.dsc-row-pop { position: fixed; z-index: 10000; max-width: calc(100vw - 32px); padding: 6px; border-radius: var(--cx-radius-xl); border: 1px solid var(--cx-border-l1); background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); animation: dsc-row-pop-in 120ms var(--cx-ease-out) both; }\n.dsc-row-pop--project { width: 321px; padding: 8px; }\n.dsc-row-pop--thread { width: 470px; }\n.dsc-row-pop__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 8px 8px 10px; border-bottom: 1px solid var(--cx-border-l2); }\n.dsc-row-pop--project .dsc-row-pop__head { align-items: center; height: 28px; padding: 0 8px; border-bottom: 0; }\n.dsc-row-pop__name { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 14px; font-weight: var(--cx-weight-regular); color: var(--cx-text); }\n.dsc-row-pop__name > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop__pin { display: inline-flex; align-items: center; flex: none; color: var(--cx-text-3); }\n.dsc-row-pop__excerpt { margin: 0; font-size: 13px; line-height: 20px; color: var(--cx-text); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }\n.dsc-row-pop__meta { display: flex; align-items: center; gap: 6px; flex: none; font-size: 12px; color: var(--cx-text-3); white-space: nowrap; }\n.dsc-row-pop__line { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border-radius: var(--cx-radius-md); font-size: 13px; color: var(--cx-text-2); text-align: left; }\n.dsc-row-pop__line svg { flex: none; color: var(--cx-text-3); }\n.dsc-row-pop--project .dsc-row-pop__line { height: 28px; font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--project .dsc-row-pop__line svg { color: var(--cx-text-2); }\n.dsc-row-pop__line--path, .dsc-row-pop__line--action { cursor: pointer; }\n.dsc-row-pop__line--path:hover, .dsc-row-pop__line--action:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-row-pop__line--path:focus-visible, .dsc-row-pop__line--action:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\n.dsc-row-pop__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop--project .dsc-row-pop__path { font-family: var(--cx-font-sans); font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--thread .dsc-row-pop__path { font-family: var(--cx-font-mono); font-size: 12px; }\n.dsc-row-pop__arrow { margin-left: auto; opacity: 0; transition: opacity 120ms var(--cx-ease); }\n.dsc-row-pop__line--path:hover .dsc-row-pop__arrow, .dsc-row-pop__line--path:focus-visible .dsc-row-pop__arrow { opacity: 1; }\n.dsc-row-pop__sep { height: 1px; background: var(--cx-border-l1); }\n@keyframes dsc-row-pop-in { from { opacity: 0; } to { opacity: 1; } }\n/* 「编辑项目」对话框：按参考图（面板 #2d2d2d、16 圆角、保存白底、移除暗红底）；源文件夹只读展示。 */\n.dsc-modal { position: fixed; inset: 0; z-index: 11000; display: flex; align-items: center; justify-content: center; padding: 24px; }\n.dsc-modal__mask { position: absolute; inset: 0; background: rgba(0,0,0,.12); }\n.dsc-modal__panel { position: relative; display: flex; flex-direction: column; width: min(520px, calc(100vw - 32px)); padding: 24px; border-radius: 16px; background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); color: var(--cx-text); }\n.dsc-modal__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.dsc-modal__head h2 { margin: 0; font-size: 20px; line-height: 28px; font-weight: 600; }\n.dsc-modal__close { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border-radius: var(--cx-radius-sm); color: var(--cx-text-2); }\n.dsc-modal__close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__field { display: flex; align-items: center; gap: 10px; height: 44px; margin-top: 20px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); }\n.dsc-modal__field:focus-within { border-color: var(--cx-focus); }\n.dsc-modal__input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; font: 15px/22px var(--cx-font-sans); color: var(--cx-text); }\n.dsc-modal__input::placeholder { color: var(--cx-text-3); }\n.dsc-modal__label { margin: 20px 0 8px; font-size: 13px; line-height: 18px; color: var(--cx-text-3); }\n.dsc-modal__source { display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-modal .dsc-error { margin-top: 12px; }\n.dsc-modal__actions { display: flex; align-items: center; gap: 8px; margin-top: 24px; }\n.dsc-modal__spacer { flex: 1; }\n.dsc-modal__remove { height: 36px; padding: 0 16px; border-radius: 999px; background: rgba(250,102,101,.14); color: #fa6665; font-size: 14px; }\n.dsc-modal__remove:hover:not(:disabled) { background: rgba(250,102,101,.22); }\n.dsc-modal__cancel { height: 36px; padding: 0 14px; border-radius: 999px; color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__cancel:hover:not(:disabled) { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__save { height: 36px; padding: 0 20px; border-radius: 999px; background: #dfdfdf; color: #131313; font-size: 14px; font-weight: 500; }\n.dsc-modal__save:hover:not(:disabled) { background: #fff; }\n.dsc-modal__save:disabled, .dsc-modal__remove:disabled, .dsc-modal__cancel:disabled { opacity: .6; cursor: default; }\n/* 编辑项目底部按钮：优先于 .dsc-ui button 的重置；不改变源文件夹和其他弹窗。 */\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__actions > button { height: 32px; border-radius: 10px; corner-shape: round; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save,\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__save:hover:not(:disabled) { padding: 0 16px; background: #dfdfdf; color: #2b2a2a; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove { background: #403030; color: #fa6665; }\n.dsc-modal__panel[aria-labelledby=\"dsc-edit-workspace-title\"] .dsc-modal__remove:hover:not(:disabled) { background: #4b3333; color: #fa6665; }\n.dsc-permission, .dsc-model { position: relative; display: inline-flex; align-items: center; min-width: 0; }\n.dsc-model { gap: 2px; }\n.dsc-control-status { display: inline-flex; align-items: center; gap: 5px; padding: 0 7px; color: var(--cx-text-3); font-size: 11px; }\n.dsc-control-status button { padding: 2px 4px; text-decoration: underline; }\n.dsc-control-status button:hover { color: var(--cx-text); }\n.dsc-pill { height: 28px; display: inline-flex; align-items: center; gap: 6px; padding: 0 10px; border-radius: 999px; corner-shape: round; white-space: nowrap; color: var(--cx-text-2); font-size: 14px !important; }\n.dsc-pill:hover, .dsc-pill[aria-expanded=true] { background: #ffffff12; color: white; }\n.dsc-pill[data-warning=true] { color: var(--cx-warning); }\n.dsc-model-trigger { max-width: 260px; gap: 5px; corner-shape: round; }\n/* 右下角触发器：模型名偏白、思维强度灰色（参考图 4）。 */\n.dsc-model-trigger .dsc-model-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #dfdfdf; }\n.dsc-model-trigger .dsc-effort-name { flex: none; color: #989898; }\n.dsc-model-trigger svg { flex: none; color: #989898; }\n/* 「修改模型」面板：标题与列表样式明确区别于宿主原生菜单。 */\n.dsc-menu.dsc-model-panel { padding: 8px; }\n.dsc-menu.dsc-model-panel .dsc-menu-heading { font-size: 14px; line-height: 20px; color: var(--cx-text); font-weight: 500; padding: 6px 8px 10px; }\n.dsc-model-group { color: var(--cx-text-3); font-size: 11px; padding: 7px 8px 2px; }\n.dsc-model-search { border: 0; border-bottom: 1px solid var(--cx-border-l1); background: none; outline: none; padding: 6px 8px; width: 100%; margin-bottom: 3px; }\n.dsc-back { display: flex; align-items: center; gap: 4px; color: var(--cx-text-3); font-size: 12px !important; border-radius: 5px; }\n.dsc-back:hover { color: #fff; }\n/* 滑条弹层裁掉横向溢出：Max/Low/High 档的撒点动画会向右超出边界，触发多余的水平滚动条。 */\n.dsc-reasoning-pop { padding: 12px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); overflow: hidden; animation: dsc-reasoning-in 130ms var(--cx-ease) both; }\n.dsc-reasoning { position: relative; }\n.dsc-reasoning-heading { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 20px 10px; text-align: center; }\n.dsc-reasoning-heading strong { font-size: 14px; font-weight: var(--cx-weight-semibold); line-height: 18px; color: var(--cx-reasoning-title); transition: color 150ms ease; }\n.dsc-reasoning-model { display: inline-flex; align-items: center; justify-content: center; gap: 2px; max-width: 100%; padding: 4px 10px; border-radius: 999px; corner-shape: round; color: #ffffff9e !important; font-size: 12px !important; line-height: 16px !important; white-space: nowrap; transition: background-color 120ms var(--cx-ease), color 120ms var(--cx-ease); }\n.dsc-reasoning-model:hover { background: #3c3b3b; color: var(--cx-text) !important; }\n.dsc-reasoning-reset { position: absolute; top: -4px; right: -4px; display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: var(--cx-radius-sm); color: var(--cx-text-3) !important; }\n.dsc-reasoning-reset:hover { background: var(--cx-hover); color: var(--cx-text) !important; }\n.dsc-reasoning[data-level=max] .dsc-reasoning-heading strong { color: var(--cx-reasoning-max-text); }\n.dsc-slider { height: 32px; position: relative; margin: 0 2px; border-radius: 999px; cursor: pointer; touch-action: none; outline: none; }\n/* rc.3 的全局 superellipse 会把 full/50% 圆角画成方圆形；仅恢复本控件的圆形轮廓。 */\n.dsc-slider, .dsc-slider-track, .dsc-slider-fill, .dsc-slider-max, .dsc-thumb, .dsc-tick::after, .dsc-stars i, .dsc-burst i { corner-shape: round; }\n/* 提交期间保持原有视觉：只禁用拖拽，不切换光标/透明度，避免切换档位时闪变。 */\n.dsc-slider[aria-disabled=true] { cursor: default; opacity: 1; }\n.dsc-slider-track { position: absolute; inset: 4px 0; height: 24px; border-radius: 999px; background: var(--cx-reasoning-track); overflow: hidden; }\n.dsc-slider-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--cx-reasoning-blue); transform-origin: left center; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-slider-max { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg,var(--cx-reasoning-max-blue),var(--cx-reasoning-purple) 52%,var(--cx-reasoning-violet)); opacity: 0; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-slider-max { opacity: 1; }\n.dsc-slider-max::before, .dsc-slider-max::after { content: ''; position: absolute; animation-play-state: paused; }\n.dsc-slider-max::before { inset: -50% -25%; background: radial-gradient(ellipse,var(--cx-reasoning-max-ice),#a095ffd9 22%,transparent 58%); animation: dsc-max-flow 2.8s linear -.45s infinite; animation-play-state: paused; }\n.dsc-slider-max::after { inset: -40% -30%; background: radial-gradient(ellipse,#d6a2ff,var(--cx-reasoning-max-glow) 20%,transparent 55%); animation: dsc-max-bloom 4.2s linear -1.65s infinite; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-slider-max::before, .dsc-slider[data-level=max] .dsc-slider-max::after { animation-play-state: running; }\n.dsc-stars { position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-stars { opacity: 1; }\n.dsc-stars i { position: absolute; border-radius: 50%; background: #fff; box-shadow: 0 0 3px #e0d6ff8c; animation: dsc-star-drift var(--pdur) linear var(--pdelay) infinite; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-stars i { animation-play-state: running; }\n.dsc-tick { position: absolute; top: 50%; width: 24px; height: 24px; transform: translate(-50%,-50%); transition: opacity 150ms ease; }\n.dsc-tick::after { content: ''; position: absolute; top: 50%; left: 50%; width: 5px; height: 5px; border-radius: 50%; background: #ffffff38; transform: translate(-50%,-50%); transition: transform 120ms ease,background-color 120ms ease; pointer-events: none; }\n.dsc-tick.is-on::after { background: #ffffff4d; }\n.dsc-slider:not([aria-disabled=true]) .dsc-tick:hover::after { transform: translate(-50%,-50%) scale(1.6); background: #ffffff73; }\n.dsc-slider[data-level=max] .dsc-tick { opacity: 0; pointer-events: none; }\n.dsc-thumb-position { position: absolute; inset: 0; pointer-events: none; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-thumb { position: absolute; z-index: 1; top: 50%; left: 14px; width: 28px; height: 28px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px #0007,0 0 0 1px #0000000f; transform: translate(-50%,-50%); pointer-events: auto; transition: transform 140ms var(--cx-ease-out),box-shadow 140ms var(--cx-ease); }\n/* 固定白色滑块为正圆，避免宿主全局圆角规则覆盖插件外形。 */\n.dsc-ui .dsc-slider .dsc-thumb { border-radius: 50% !important; }\n.dsc-thumb:hover { transform: translate(-50%,-50%) scale(1.1); box-shadow: 0 1px 6px #0008,0 0 0 1px #0000000f; }\n.dsc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n.dsc-permission-menu { padding: 4px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); }\n.dsc-permission-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 4px 8px; color: var(--cx-text-3); font-size: 13px; line-height: 18px; }\n.dsc-permission-heading button { padding: 0; white-space: nowrap; text-decoration: underline; text-underline-offset: 2px; }\n.dsc-permission-help { margin: 4px 8px 8px; color: var(--cx-text-2); font-size: 12px; line-height: 18px; }\n.dsc-permission-menu .dsc-option { align-items: flex-start; gap: 8px; padding: 6px 8px; border-radius: var(--cx-radius-xl); color: var(--cx-text-2); font-size: 14px; line-height: 19px; }\n.dsc-permission-menu .dsc-option > svg { margin-top: 3px; }\n.dsc-permission-menu .dsc-option-copy { line-height: 19px; }\n.dsc-permission-menu .dsc-option[data-warning=true], .dsc-permission-menu .dsc-option[data-warning=true] small { color: var(--cx-warning); }\n/* 权限风险弹窗：按用户 Codex 截图换算 1.5 倍显示缩放，约 520px 宽；不影响宿主其他确认框。 */\n.dsc-ui.dsc-permission-dialog { width: 520px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 32px); margin: auto; padding: 20px; border: 0; border-radius: 20px; background: #2b2b2b; color: #dedede; box-shadow: 0 18px 70px #0003; overflow-y: auto; overscroll-behavior: contain; -webkit-app-region: no-drag; animation: dsc-pop-in 150ms ease both; }\n.dsc-permission-dialog::backdrop { background: #0006; }\n.dsc-permission-dialog__heading { display: flex; align-items: center; gap: 8px; min-height: 28px; }\n.dsc-permission-dialog__heading > svg { flex: none; }\n.dsc-permission-dialog__heading h2 { margin: 0; font-size: 20px; font-weight: 650; line-height: 28px; letter-spacing: -.3px; }\n.dsc-permission-dialog__badge { margin-left: auto; padding: 1px 7px; border: 1px solid #ffffff14; border-radius: 6px; color: #aaa; font-size: 11px; line-height: 18px; white-space: nowrap; }\n.dsc-permission-dialog__description { margin: 14px 0 12px; color: #999; font-size: 14px; line-height: 20px; }\n.dsc-permission-dialog__capabilities { margin: 0; padding: 4px 16px; border-radius: 16px; list-style: none; background: #333; }\n.dsc-permission-dialog__capabilities li { display: flex; align-items: center; gap: 12px; min-height: 51px; padding: 8px 0; }\n.dsc-permission-dialog__capabilities li + li { border-top: 1px solid #ffffff08; }\n.dsc-permission-dialog__capabilities li > div { min-width: 0; }\n.dsc-permission-dialog__capabilities strong { display: block; font-size: 14px; font-weight: 600; line-height: 18px; }\n.dsc-permission-dialog__capabilities span { display: block; color: #999; font-size: 12px; line-height: 17px; overflow-wrap: anywhere; }\n.dsc-permission-dialog__warning { margin: 12px 0 0; color: #999; font-size: 14px; line-height: 20px; }\n.dsc-ui .dsc-permission-dialog__more { margin-left: 3px; padding: 0; color: #8ac4ff; white-space: nowrap; font-size: inherit; }\n.dsc-permission-dialog__more:hover { text-decoration: underline; text-underline-offset: 3px; }\n.dsc-permission-dialog__help { margin: 10px 0 0; padding: 10px 12px; border-radius: 10px; background: #ffffff06; color: #aaa; font-size: 12px; line-height: 18px; }\n.dsc-permission-dialog__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 14px; }\n.dsc-ui .dsc-permission-dialog__actions button { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 36px; padding: 6px 20px; border-radius: 999px; font-size: 14px; line-height: 20px; transition: background-color 120ms ease; }\n.dsc-ui .dsc-permission-dialog__cancel { background: #333; color: #d5d5d5; }\n.dsc-ui .dsc-permission-dialog__cancel:hover:not(:disabled) { background: #3d3d3d; }\n.dsc-ui .dsc-permission-dialog__confirm { background: #443232; color: #ff6764; }\n.dsc-ui .dsc-permission-dialog__confirm:hover:not(:disabled) { background: #533838; }\n@media (max-width: 480px) {\n  .dsc-ui.dsc-permission-dialog { padding: 18px; }\n  .dsc-permission-dialog__heading h2 { font-size: 18px; line-height: 26px; }\n  .dsc-permission-dialog__capabilities { padding-inline: 12px; }\n}\n.dsc-burst { position: absolute; left: 14px; top: 50%; pointer-events: none; }\n/* 等 140ms 节点移动落定后，从白球边缘扩散；反复进入 Max 会由原有 key 重播。 */\n.dsc-burst i { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #b98cff; box-shadow: 0 0 3px #b98cff40; animation: dsc-burst 280ms ease-out 140ms both; }\n.dsc-slider-labels { display: flex; justify-content: space-between; padding-top: 3px; }\n.dsc-slider-labels button { padding: 0 3px; font-size: 10px; color: var(--cx-text-3); }\n.dsc-slider-labels button:hover { color: white; }\n.dsc-reasoning-description { display: block; text-align: center; color: var(--cx-text-3); font-size: 11px; line-height: 16px; margin-top: 7px; }\n@keyframes dsc-pop-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }\n/* 退场淡出：关闭弹层时先播放 160ms，再卸载 DOM。 */\n@keyframes dsc-pop-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(3px); } }\n.dsc-menu.dsc-menu-closing { animation: dsc-pop-out 160ms ease both; pointer-events: none; }\n@keyframes dsc-reasoning-in { from { opacity: 0; } to { opacity: 1; } }\n@keyframes dsc-session-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n/* 两层亮带和星点均向左单程流动，出场淡去后从右侧开始下一轮。 */\n@keyframes dsc-max-flow { 0% { transform: translateX(65%) scale(.82,1); opacity: 0; } 12% { opacity: .95; } 88% { opacity: .8; } 100% { transform: translateX(-65%) scale(1.02,1); opacity: 0; } }\n@keyframes dsc-max-bloom { 0% { transform: translateX(65%) scale(.7,1); opacity: 0; } 12% { opacity: .9; } 88% { opacity: 1; } 100% { transform: translateX(-65%) scale(1,1); opacity: 0; } }\n@keyframes dsc-star-drift { 0% { transform: translate(-50%,-50%) translate(calc(var(--dx)*.5),calc(var(--dy)*-.5)); opacity: 0; } 20% { opacity: .7; } 80% { opacity: .8; } 100% { transform: translate(-50%,-50%) translate(calc(var(--dx)*-.5),calc(var(--dy)*.5)); opacity: 0; } }\n@keyframes dsc-burst { 0% { transform: translate(-50%,-50%) translate(calc(var(--bx)*.45),calc(var(--by)*.45)) scale(.5); opacity: 0; } 18% { transform: translate(-50%,-50%) translate(calc(var(--bx)*.72),calc(var(--by)*.72)) scale(1); opacity: .65; } 100% { transform: translate(-50%,-50%) translate(var(--bx),var(--by)) scale(.5); opacity: 0; } }\n@media (prefers-reduced-motion: reduce) {\n  .dsc-sidebar-shell, .dsc-row-tooltip, .dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { animation: none !important; transition: none !important; }\n  .dsc-burst { display: none; }\n}\n\n/* Codex 几何（第 48 轮）：\n   1) 侧边栏列左上角圆角、对话列左上角直角（与 Codex 蓝框/红框一致）；\n   2) 对话正文列与输入框同宽：由插件测量输入框卡片的实际视觉宽度写入 --dsc-composer-visual-width，\n      正文列优先取该值，回退到宿主 --dsh-composer-card-max-width（正文 + 32px）。 */\nbody[data-dsh-codex-style] [data-conversation-scroll] [class*=\"_column\"] { max-width: var(--dsc-composer-visual-width, var(--dsh-composer-card-max-width)); }\n/* 公开详情插槽在来源信息后声明；仅在本插件详情用 flex 顺序把来源信息排在支持提示之后。 */\nbody[data-dsh-codex-style] [data-plugin-detail=\"@xinxing1708/dsh-codex-style\"] [data-plugin-source] { order: 1; }\n.dsc-plugin-support { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 16px 0; color: #989898; font-size: 13px; line-height: 20px; }\n.dsc-plugin-support p { margin: 0; }\n.dsc-plugin-support a { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; color: #9bc8f8; text-decoration: none; overflow-wrap: anywhere; border-radius: 4px; }\n.dsc-plugin-support a:hover { text-decoration: underline; text-underline-offset: 3px; }\n.dsc-plugin-support a:focus-visible { outline: 2px solid #9bc8f8; outline-offset: 4px; }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-sidebar-column] { border-top-left-radius: var(--dsh-windows-content-radius, 16px); }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-center-column] { border-radius: 0; }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] [data-dsc-center-column] { border-top-left-radius: var(--dsh-windows-content-radius, 16px); }\n";
    const SKILLS_CSS_TEXT = "/* 技能页：只作用于自有 .dsc-skills-* 结构，不改宿主令牌与布局。 */\n.dsc-skills-page {\n  box-sizing: border-box;\n  min-height: 100%;\n  padding: 30px 30px 56px;\n  color: #dfdfdf;\n  background: #181818;\n  font: 14px/22px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  overflow: auto;\n}\n.dsc-skills-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }\n.dsc-skills-heading h1 { margin: 0; font-size: 22px; line-height: 30px; font-weight: 600; letter-spacing: -.01em; }\n.dsc-skills-heading p { margin: 4px 0 0; color: #989898; font-size: 14px; line-height: 22px; }\n.dsc-skills-toolbar { display: flex; align-items: center; gap: 10px; }\n.dsc-skills-scope {\n  max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\n  padding: 4px 10px; border: 1px solid #ffffff14; border-radius: 999px; color: #989898; font-size: 12px;\n}\n.dsc-skills-search {\n  display: inline-flex; align-items: center; gap: 6px; width: 240px; height: 32px; padding: 0 12px;\n  border: 1px solid #ffffff14; border-radius: 999px; color: #989898; background: transparent;\n}\n.dsc-skills-search:focus-within { border-color: #ffffff2e; color: #dfdfdf; }\n.dsc-skills-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: #dfdfdf; font: inherit; }\n.dsc-skills-search input::placeholder { color: #777; }\n.dsc-skills-toolbar .dsc-icon-button { width: 32px; height: 32px; border-radius: 999px; color: #989898; }\n.dsc-skills-toolbar .dsc-icon-button:hover { background: #222; color: #dfdfdf; }\n\n.dsc-skills-section { margin-top: 26px; }\n.dsc-skills-section-title {\n  margin: 0 0 12px; padding-bottom: 8px; border-bottom: 1px solid #ffffff14;\n  font-size: 16px; line-height: 22px; font-weight: 600; color: #dfdfdf;\n}\n.dsc-skills-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 28px; }\n.dsc-skill-card {\n  display: flex; align-items: center; gap: 12px; width: 100%; height: 60px; padding: 8px 10px;\n  border: 0; border-radius: 10px; background: transparent; color: inherit; text-align: left; cursor: pointer;\n  transition: background-color 150ms ease;\n}\n.dsc-skill-card:hover { background: #222; }\n.dsc-skill-card:focus-visible { outline: 2px solid #ffffff2e; outline-offset: -2px; }\n.dsc-skill-card-icon { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: #141414; }\n.dsc-skill-cube { display: block; }\n.dsc-skill-card-copy { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 2px; }\n.dsc-skill-card-title { font-size: 14px; line-height: 20px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-skill-card-desc { font-size: 14px; line-height: 20px; color: #989898; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-skill-card-flag { flex: none; display: inline-flex; color: #989898; }\n.dsc-ui .dsc-skills-more {\n  margin-top: 6px; padding: 4px 2px; border: 0; background: transparent; color: #989898;\n  font: inherit; font-size: 13px; cursor: pointer; text-align: left;\n}\n.dsc-skills-more:hover { color: #dfdfdf; }\n\n.dsc-skills-state { padding: 22px 2px; color: #989898; font-size: 14px; }\n.dsc-skills-state button { margin-left: 10px; padding: 2px 10px; border: 1px solid #ffffff14; border-radius: 6px; background: #202020; color: #dfdfdf; font: inherit; cursor: pointer; }\n.dsc-skills-state-error { color: #fa6665; }\n.dsc-skills-state-warn { color: #d6a75a; }\n\n.dsc-skills-overlay {\n  position: fixed; inset: 0; z-index: 900; display: flex; align-items: center; justify-content: center;\n  padding: 36px 24px; background: #00000026;\n}\n.dsc-skills-dialog {\n  display: flex; flex-direction: column; box-sizing: border-box; overflow: hidden;\n  width: min(600px, calc(100vw - 48px)); max-height: calc(100vh - 72px); padding: 20px;\n  border: 1px solid #ffffff14; border-radius: 20px;\n  background: linear-gradient(180deg, #2b2a2a, #2c2b2b);\n  color: #dfdfdf; box-shadow: 0 18px 48px #00000059;\n}\n.dsc-skills-dialog-headrow { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.dsc-skills-dialog-icon { display: inline-flex; flex: none; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: #141414; }\n.dsc-skills-dialog-headactions { display: flex; align-items: center; gap: 4px; }\n.dsc-skills-dialog-headactions .dsc-icon-button { width: 30px; height: 30px; border-radius: 8px; color: #989898; }\n.dsc-skills-dialog-headactions .dsc-icon-button:hover { background: #ffffff14; color: #dfdfdf; }\n.dsc-skills-dialog-title { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-top: 14px; }\n.dsc-skills-dialog-title h2 { margin: 0; font-size: 20px; line-height: 26px; font-weight: 600; }\n.dsc-skills-dialog-kind { color: #989898; font-size: 14px; }\n.dsc-skills-dialog-desc {\n  margin: 8px 0 14px; color: #bdbdbd; font-size: 16px; line-height: 24px;\n  max-height: 28vh; overflow: auto; overflow-wrap: anywhere;\n}\n.dsc-skills-preview {\n  flex: 1 1 auto; min-height: 96px; max-height: 160px; overflow: auto; padding: 12px 14px;\n  border-radius: 12px; background: #232222; color: #c9c9c9; font-size: 13px; line-height: 20px;\n}\n.dsc-skills-preview-note { color: #989898; font-size: 13px; }\n.dsc-skills-plain { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/20px ui-monospace, \"Cascadia Mono\", Consolas, monospace; }\n.dsc-skills-dialog-foot { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex: none; margin-top: 14px; }\n.dsc-skills-dialog-notice { margin-right: auto; color: #fa6665; font-size: 12px; line-height: 18px; }\n.dsc-ui .dsc-skills-try {\n  display: inline-flex; align-items: center; gap: 5px; corner-shape: round;\n  padding: 6px 14px; border: 0; border-radius: 999px; background: #dfdfdf; color: #1b1b1b;\n  font: inherit; font-size: 13px; font-weight: 600; cursor: pointer;\n  transition: background-color 120ms ease;\n}\n.dsc-ui .dsc-skills-try:hover { background: #f0f0f0; }\n.dsc-skills-try:disabled { opacity: .6; cursor: default; }\n.dsc-skills-search, .dsc-skills-scope { corner-shape: round; }\n.dsc-skills-preview :is(h1, h2, h3, h4, h5, h6) { font: 600 14px/22px \"Segoe UI\", \"Microsoft YaHei\", sans-serif; margin: 12px 0 8px; }\n.dsc-skills-preview :is(h1, h2, h3):first-child { margin-top: 0; }\n.dsc-skills-preview p { margin: 8px 0; }\n\n@media (max-width: 900px) {\n  .dsc-skills-page { padding: 22px 18px 40px; }\n  .dsc-skills-grid { grid-template-columns: minmax(0, 1fr); }\n  .dsc-skills-search { width: 200px; }\n}\n@media (max-width: 620px) {\n  .dsc-skills-header { flex-direction: column; }\n  .dsc-skills-toolbar { width: 100%; }\n  .dsc-skills-search { flex: 1; width: auto; }\n  .dsc-skills-overlay { padding: 16px; }\n  .dsc-skills-dialog { padding: 16px; border-radius: 16px; max-height: calc(100vh - 32px); }\n  .dsc-skills-dialog-desc { font-size: 15px; line-height: 22px; max-height: 22vh; }\n  .dsc-skills-preview { max-height: 34vh; }\n}\n@media (max-height: 560px) {\n  .dsc-skills-dialog { overflow-y: auto; }\n  .dsc-skills-dialog > * { flex-shrink: 0; }\n  .dsc-skills-dialog-desc { max-height: 20vh; }\n  .dsc-skills-preview { flex: none; min-height: 64px; max-height: 20vh; }\n}\n@media (prefers-reduced-motion: reduce) {\n  .dsc-skill-card, .dsc-skills-try { transition: none; }\n}\n";
    const BODY_CSS_TEXT = "/* 本文件只在正文子组件实际启用时挂载；不覆盖宿主 Markdown 与工具内容。 */\nbody[data-dsc-codex-body] [data-chat-flow] {\n  --dsc-body-muted: #969696;\n  --dsc-body-images: url(\"data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2016%2016'%20fill%3D'none'%20stroke%3D'black'%20stroke-width%3D'1.1'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'm6.2%204.6.4-2A1.5%201.5%200%200%201%208.4%201.5l4.9%201a1.5%201.5%200%200%201%201.2%201.8l-1%204.9a1.5%201.5%200%200%201-1.8%201.2l-.7-.1'%2F%3E%3Cg%20transform%3D'rotate(-12%206.1%209.7)'%3E%3Crect%20x%3D'1.7'%20y%3D'5.3'%20width%3D'8.9'%20height%3D'8.7'%20rx%3D'1.7'%2F%3E%3Cpath%20d%3D'm2%2011.9%202.6-2.4%202.2%201.7%201.5-1.4%202.1%202.1'%2F%3E%3Ccircle%20cx%3D'4.3'%20cy%3D'7.8'%20r%3D'.65'%20fill%3D'black'%20stroke%3D'none'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  --dsc-body-pencil: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='m2 14 1.5-5.1L10.9 1.5a1.6 1.6 0 0 1 2.3 0l1.1 1.1a1.6 1.6 0 0 1 0 2.3L6.9 12.3 2 14Zm7.8-11.4 3.4 3.4M3.5 8.9l3.4 3.4' fill='none' stroke='black' stroke-width='1.15' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");\n  --dsc-body-terminal: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect x='1.5' y='1.5' width='13' height='13' rx='2.2' fill='none' stroke='black' stroke-width='1.15'/%3E%3Cpath d='m4.4 5.2 2.2 2.3-2.2 2.3m4.1.2h2.8' fill='none' stroke='black' stroke-width='1.15' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");\n}\n/* 下方正文已由宿主保留 16px 间隔，回合头不再额外叠加下边距。 */\nbody[data-dsc-codex-body] .dsc-body-turn { margin: 12px 0 0; color: #969696; font-size: 13px; line-height: 22px; }\nbody[data-dsc-codex-body] .dsc-body-turn__status { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; border: 0; overflow: hidden; white-space: nowrap; clip-path: inset(50%); }\nbody[data-dsc-codex-body] .dsc-body-turn__label { display: inline-flex; align-items: center; gap: 7px; padding: 0; border: 0; background: none; color: inherit; font: inherit; font-variant-numeric: tabular-nums; cursor: pointer; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:disabled { opacity: 1; cursor: default; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:enabled:hover { color: #c8c8c8; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:focus-visible { outline: 1px solid #aaa; outline-offset: 4px; border-radius: 3px; }\nbody[data-dsc-codex-body] .dsc-body-turn__label svg { opacity: 0; transition: transform 160ms ease, opacity 120ms ease; }\nbody[data-dsc-codex-body] .dsc-body-turn__label:is(:hover, :focus-visible) svg { opacity: 1; }\nbody[data-dsc-codex-body] .dsc-body-turn__label[aria-expanded=\"true\"] svg { transform: rotate(180deg); }\nbody[data-dsc-codex-body] .dsc-body-turn__divider { height: 1px; background: #ffffff12; margin-top: 9px; }\n/* 没有真实回合头时保留底部状态，避免连接/加载阶段丢失运行提示。 */\nbody[data-dsc-codex-body] :is([data-chat-flow], [data-slot=\"conversation.chat.flow\"]):has(.dsc-body-turn[data-dsc-body-running]) > [data-chat-running] { display: none; }\n/* 思考不显示前导图标；保留完成思考的真实折叠操作，流式正文和摘要仍隐藏。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"][data-state=\"running\"] { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"] [data-disclosure-row] > :first-child { display: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-variant=\"think\"] [data-disclosure-row] > span:last-child > span:first-child > span:not(:first-child) { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"]:has(> [data-shimmer]) > [data-shimmer] { display: none; }\nbody[data-dsc-codex-body] [data-process-activity=\"thinking\"]:has(> [data-shimmer])::after { content: '正在思考'; color: transparent; background: linear-gradient(105deg, #969696 42%, #e1e1e1 50%, #969696 58%); background-clip: text; background-size: 250% 100%; animation: dsc-body-thinking 2s linear infinite; }\n/* 灰色正文操作行；失败/停止颜色及详情内容沿用宿主。 */\nbody[data-dsc-codex-body] [data-process-activity],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"bash\"], [data-tool]) { color: var(--dsc-body-muted); }\nbody[data-dsc-codex-body] [data-process-activity] { width: fit-content; max-width: 100%; gap: 7px; text-align: left; }\nbody[data-dsc-codex-body] [data-process-activity] > span:first-child { display: contents; }\nbody[data-dsc-codex-body] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-step-process-chevron] { position: static; flex: none; transform: none !important; }\nbody[data-dsc-codex-body] [data-step-process-icon] { opacity: 1 !important; }\nbody[data-dsc-codex-body] [data-step-process-icon] { width: 16px; height: 16px; }\nbody[data-dsc-codex-body] [data-step-process-chevron] { order: 3; width: 12px; height: 12px; margin-left: 0; opacity: 0 !important; transition: opacity 120ms ease; }\nbody[data-dsc-codex-body] [data-process-activity]:is(:hover, :focus-visible) [data-step-process-chevron] { opacity: 1 !important; }\nbody[data-dsc-codex-body] [data-process-activity] > [data-shimmer] { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n/* 通用工具（包括 ops_bash 等别名）统一使用终端；编辑/写入仍使用铅笔。 */\nbody[data-dsc-codex-body] [data-process-activity=\"commands\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-process-activity=\"tools\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"bash\"], [data-variant=\"others\"]):is([data-sample], [data-tool]) { --dsc-body-icon: var(--dsc-body-terminal); }\nbody[data-dsc-codex-body] [data-process-activity=\"edit\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-process-activity=\"write\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"])[data-tool] { --dsc-body-icon: var(--dsc-body-pencil); }\n/* read_image 的专用工具行和图像分组；普通 read 文件行继续使用宿主图标。 */\nbody[data-dsc-codex-body] [data-process-activity=\"readImage\"] [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool]:is([data-tool=\"read_image\"], [data-tool=\"ops_read_image\"]) { --dsc-body-icon: var(--dsc-body-images); }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon],\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child { position: relative; width: 16px; min-width: 16px; height: 16px; }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon] > *,\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child > *,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child > * { visibility: hidden; }\nbody[data-dsc-codex-body] :is([data-process-activity=\"commands\"], [data-process-activity=\"edit\"], [data-process-activity=\"write\"], [data-process-activity=\"tools\"], [data-process-activity=\"readImage\"]) [data-step-process-icon]::before,\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-variant=\"edit\"], [data-variant=\"write\"], [data-variant=\"bash\"], [data-variant=\"others\"], [data-tool=\"read_image\"], [data-tool=\"ops_read_image\"])[data-tool] [data-disclosure-row] > :first-child::before,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] > span:first-child::before { content: ''; position: absolute; inset: 0; background: #969696; mask: var(--dsc-body-icon) center / 16px 16px no-repeat; }\n/* 原生前导箭头移至右侧；只在悬停或键盘焦点时显示，点击展开后移出也隐藏。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool] [data-disclosure-row] > :first-child > svg { display: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-tool] [data-disclosure-row] > :first-child > span:first-child { opacity: 1 !important; transform: none !important; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable],\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable] { position: relative; padding-right: 18px; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable]::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable]::after { content: ''; position: absolute; right: 3px; top: 8px; width: 5px; height: 5px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: rotate(45deg); opacity: 0; transition: transform 160ms ease, opacity 120ms ease; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable]:is(:hover, :focus-visible, :has(:focus-visible))::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable]:is(:hover, :focus-visible, :has(:focus-visible))::after { opacity: 1; }\nbody[data-dsc-codex-body] [data-chat-flow] :is([data-tool], [data-variant=\"think\"]) [data-disclosure-row][data-expandable][aria-expanded=\"true\"]::after,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][data-expandable][aria-expanded=\"true\"]::after { transform: rotate(225deg); }\n/* 沿用原生 TextShimmer 的无障碍隐藏副本，只重设灰色高光的扫过方式。 */\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] { position: absolute; inset: 0; overflow: hidden; pointer-events: none; mask: none; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] > span { position: absolute; inset: 0; width: auto; color: #e1e1e1; transform: none; mask-image: linear-gradient(105deg, transparent 42%, #000 50%, transparent 58%); mask-size: 250% 100%; animation: dsc-body-light 2s linear infinite; }\nbody[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] > span > span { transform: none; animation: none; }\nbody[data-dsc-codex-body] [data-process-activity][aria-expanded=\"true\"] > [data-shimmer] > [aria-hidden=\"true\"] { display: none; }\n@keyframes dsc-body-light { from { mask-position: 130% 0; } to { mask-position: -30% 0; } }\n@keyframes dsc-body-thinking { from { background-position: 130% 0; } to { background-position: -30% 0; } }\n/* 宿主继续管理高度、滚动锚点与收起清理；这里只动画透明度和轻微位移。 */\nbody[data-dsc-codex-body] [data-step-process]:has([data-process-activity][aria-expanded=\"true\"]) > [data-step-process-body] > [data-step-process-content],\nbody[data-dsc-codex-body] [data-chat-flow] [data-disclosure-header] + *,\nbody[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"][aria-expanded=\"true\"] + * { animation: dsc-body-reveal 180ms cubic-bezier(.2,.8,.2,1) both; }\n@keyframes dsc-body-reveal { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: translateY(0); } }\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsc-codex-body] [data-chat-flow] [data-shimmer] > [aria-hidden=\"true\"] { display: none; }\n  body[data-dsc-codex-body] [data-process-activity=\"thinking\"]::after { animation: none !important; color: #969696 !important; background: none !important; }\n  body[data-dsc-codex-body] [data-step-process-content],\n  body[data-dsc-codex-body] [data-chat-flow] [data-disclosure-header] + *,\n  body[data-dsc-codex-body] [data-chat-flow] [data-sample=\"bash\"] + * { animation: none !important; }\n  body[data-dsc-codex-body] .dsc-body-turn__label svg,\n  body[data-dsc-codex-body] [data-step-process-chevron],\n  body[data-dsc-codex-body] [data-chat-flow] [aria-expanded]::after { transition: none; }\n}\n";
    const HEADER_CSS_TEXT = "/* 标题/打开方式在上层，模式/智能体/后台任务与视图切换在下层。\n   display:contents 只改变排版，原 DOM、原按钮回调及菜单所有权不变。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-conversation-header] { display: grid; grid-template-columns: auto minmax(0, 1fr) 120px 28px; align-items: center; gap: 4px 8px; min-height: 44px; padding: 6px 14px; container-type: inline-size; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-conversation-header] [data-conversation-header-leading] { grid-area: 1 / 1; }\n/* 当前会话标题灰度：宿主给标题 span 单独设色，需同时命中标题文本与容器；\n   祖先面包屑按钮、操作与视图滑块保留宿主颜色。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title],\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title] > span:first-child { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title-row] { display: contents; container-type: normal; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-title-cluster] { display: contents; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] { grid-area: 1 / 2; flex-wrap: wrap; min-width: 0; max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] > span,\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-navigation] > span > :is(span, button) { max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] { grid-area: 2 / 1 / auto / 3; flex-wrap: wrap; min-width: 0; max-width: 100%; gap: 4px 8px; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] > :not([data-slot]),\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] > [data-slot] > * { flex: none; max-width: 100%; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] button { white-space: nowrap; }\n/* 宿主窄容器规则会隐藏这些文字；这里为独立操作行保留完整标签。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] span[title] { display: inline-flex; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] [data-team-action] button > span { display: inline; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-utilities] { grid-area: 1 / 3; justify-content: flex-end; flex-wrap: wrap; min-width: 0; max-width: 120px; gap: 4px 6px; margin: 0; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-open-in-app] { order: 100; flex: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-corner] { grid-area: 1 / 4; min-width: 28px; margin: 0; }\n/* rc.3 原生按 120px/标签与 48px 菜单预算决定可见项，仍保留其 288px 测量宽度。\n   Grid 只为右对齐的 150px 实际控件留位；左侧透明测量区不接收点击。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] { grid-area: 2 / 3 / auto / 5; justify-self: end; display: flex; flex-wrap: nowrap; align-items: center; justify-content: flex-end; gap: 6px; width: 288px; max-width: none; min-width: 0; margin: 0; padding: 0; pointer-events: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] > * { pointer-events: auto; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] [data-dsc-view-switch] { order: 0; flex: none; width: 120px; margin: 0; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] { grid-area: 2 / 3 / auto / 5; justify-self: end; box-sizing: border-box; display: flex; flex: none; flex-wrap: nowrap; align-items: stretch; gap: 0; width: 120px; height: 28px; min-height: 28px; min-width: 0; margin: 0; padding: 3px; border: 1px solid #484848; border-radius: 999px; corner-shape: round; background: #181818; position: relative; isolation: isolate; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch]::before { content: ''; position: absolute; z-index: 0; top: 3px; bottom: 3px; left: 3px; width: calc((100% - 6px) / var(--dsc-view-count, 2)); border-radius: 999px; corner-shape: round; background: #dfdfdf; opacity: var(--dsc-view-active, 1); transform: translateX(calc(var(--dsc-view-index, 0) * 100%)); pointer-events: none; transition: transform 180ms var(--cx-ease-out), opacity 120ms ease; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] { flex: 1 1 0; min-width: 0; min-height: 0; height: 20px; margin: 0; padding: 0 8px; border: 0; border-radius: 999px; corner-shape: round; color: #aaa; background: transparent; font: 500 12px/20px var(--cx-font-sans); text-align: center; position: relative; z-index: 1; transition: color 150ms ease; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]::after { display: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] + [role=\"tab\"]::before { content: ''; position: absolute; left: 0; top: 6px; bottom: 6px; width: 1px; background: #555; pointer-events: none; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"true\"] { color: #242424; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:first-child[aria-selected=\"false\"] { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"][aria-selected=\"false\"]:hover { color: #dfdfdf; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"]:focus-visible { outline: 1px solid #aaa; outline-offset: 1px; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"] { color: #aaa; width: 24px; height: 28px; min-height: 28px; padding: 0; margin: 0; position: relative; }\n/* 视图目录使用四格图标，和右上方会话日志/反馈的三点菜单区分。 */\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"] > svg { visibility: hidden; }\nbody[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row] button[aria-haspopup=\"menu\"]::before { content: ''; position: absolute; width: 14px; height: 14px; left: 5px; top: 7px; background: currentColor; mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.2'%3E%3Crect x='1.5' y='1.5' width='5' height='5' rx='1'/%3E%3Crect x='9.5' y='1.5' width='5' height='5' rx='1'/%3E%3Crect x='1.5' y='9.5' width='5' height='5' rx='1'/%3E%3Crect x='9.5' y='9.5' width='5' height='5' rx='1'/%3E%3C/svg%3E\") center / contain no-repeat; pointer-events: none; }\n@container (max-width: 640px) {\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-actions] { grid-column: 1 / -1; }\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-header-view-row], body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] { grid-row: 3; }\n}\n@media (prefers-reduced-motion: reduce) {\n  body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch]::before, body[data-dsh-codex-style][data-dsc-codex-header] [data-dsc-view-switch] > [role=\"tab\"] { transition: none; }\n}\n";
    const NAVIGATION_CSS_TEXT = "/* 页面前进后退：只在导航组件启用时生效；关闭后侧栏按钮回到原位置与尺寸。 */\nbody[data-dsc-codex-navigation] {\n  --dsc-navigation-native-shift: 68px;\n}\n\n/* 后退 / 前进：两个 32px 按钮，left 8，gap 2；中心约 24 / 58。 */\nbody[data-dsc-codex-navigation] .dsc-nav-controls {\n  position: fixed;\n  top: 4px;\n  left: 8px;\n  z-index: 36;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  -webkit-app-region: no-drag;\n}\n\n.dsc-nav-controls .dsc-nav-button {\n  box-sizing: border-box;\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: #8f8f8f;\n  cursor: default;\n  -webkit-app-region: no-drag;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-nav-controls .dsc-nav-button[aria-disabled='true'] {\n  color: #535353;\n}\n\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']) {\n  cursor: pointer;\n}\n\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):hover,\n.dsc-nav-controls .dsc-nav-button:not([aria-disabled='true']):focus-visible {\n  background: #ffffff14;\n  color: #b4b4b4;\n}\n\n.dsc-nav-controls .dsc-nav-button:focus-visible {\n  outline: 1px solid #ffffff40;\n  outline-offset: -1px;\n}\n\n/* 复用的侧栏按钮移到第三位：中心约 92；内部按钮同步 32px / 8px 圆角。 */\nbody[data-dsc-codex-navigation] .dsc-window-sidebar-toggle {\n  top: 4px;\n  left: 76px;\n}\n\nbody[data-dsc-codex-navigation] .dsc-window-sidebar-toggle .dsc-icon-button {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n}\n\n/* 悬停/键盘聚焦提示：深灰圆角；portal 到 body 且高于标题栏拖拽区。 */\n.dsc-nav-tooltip {\n  position: fixed;\n  z-index: 10002;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  max-width: calc(100vw - 16px);\n  padding: 6px 10px;\n  border-radius: 12px;\n  background: #303030;\n  color: #e8e8e8;\n  font-size: 13px;\n  line-height: 18px;\n  white-space: nowrap;\n  box-shadow: 0 6px 20px #0006;\n  pointer-events: none;\n  -webkit-app-region: no-drag;\n}\n\n.dsc-nav-tooltip__keys {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  margin-left: 8px;\n}\n\n.dsc-nav-tooltip__key {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 6px;\n  background: #505050;\n  color: #ededed;\n  font-size: 11px;\n  line-height: 18px;\n}\n\n.dsc-nav-tooltip__plus {\n  padding: 0 1px;\n  color: #8a8a8a;\n  font-size: 11px;\n  line-height: 18px;\n}\n\n/* 原顶部快捷栏右移：只标记最小宿主节点；右上窗口按钮与标题栏拖拽区不移动。 */\nbody[data-dsc-codex-navigation] [data-dsc-navigation-menubar],\nbody[data-dsc-codex-navigation] [data-dsc-navigation-titlebar-row],\nbody[data-dsc-codex-navigation] [data-dsc-navigation-native-shift] {\n  transform: translateX(var(--dsc-navigation-native-shift));\n}\n\n/* 自绘侧栏按钮覆盖原生旧位置；原生切换键隐藏，避免两套按钮露出或重叠。 */\nbody[data-dsc-codex-navigation] [data-dsc-navigation-native-toggle] {\n  visibility: hidden !important;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-nav-controls .dsc-nav-button {\n    transition: none;\n  }\n}\n";
    const IMAGE_ANNOTATIONS_CSS_TEXT = "/* 图片批注：仅作用于自有 .dsc-ia-* 结构，不修改宿主令牌与布局。\n   尺寸依据本轮视觉规范（30px 点、294px 弹层、44px 工具条、32x192 笔宽滑条）。 */\n\n.dsc-ia-root {\n  position: fixed;\n  inset: 0;\n  z-index: 2147482000;\n  display: flex;\n  flex-direction: column;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  background: rgba(0, 0, 0, 0.65);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n  outline: none;\n  overscroll-behavior: contain;\n}\n\n/* 只继承字体族：不能用 font/color 简写继承盖过浅色按钮上的显式深色文字。 */\n.dsc-ia-root button {\n  font-family: inherit;\n}\n\n.dsc-ia-backdrop {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n/* 顶部动作条：图片名、缩放、适应、下载、关闭。 */\n.dsc-ia-top {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  min-height: 52px;\n  padding: 8px 16px;\n  box-sizing: border-box;\n  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  pointer-events: none;\n}\n\n.dsc-ia-top > * {\n  pointer-events: auto;\n}\n\n/* Windows 自绘标题栏的最小化/最大化/关闭键固定在右上角并压在页面之上；\n   顶部动作条整体下移到标题栏以下，避免图片的关闭键被窗口关闭键遮住。 */\nhtml[data-windows-titlebar] .dsc-ia-top {\n  top: 36px;\n}\n\n.dsc-ia-title {\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  min-width: 0;\n  color: #e6e6e6;\n}\n\n.dsc-ia-title-name {\n  max-width: 46vw;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.dsc-ia-title-index {\n  flex: none;\n  color: #989898;\n  font-size: 12px;\n}\n\n.dsc-ia-actions {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  flex: none;\n}\n\n.dsc-ia-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  height: 32px;\n  padding: 0 8px;\n  border: 0;\n  border-radius: 8px;\n  background: rgba(24, 24, 24, 0.62);\n  color: #dfdfdf;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-action:hover {\n  background: rgba(255, 255, 255, 0.14);\n  color: #fff;\n}\n\n.dsc-ia-action:focus-visible,\n.dsc-ia-tool:focus-visible,\n.dsc-ia-toolbar-button:focus-visible,\n.dsc-ia-primary:focus-visible,\n.dsc-ia-nav:focus-visible,\n.dsc-ia-popup button:focus-visible,\n.dsc-ia-pill button:focus-visible,\n.dsc-ia-grip:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.55);\n  outline-offset: 1px;\n}\n\n.dsc-ia-zoom-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n/* 舞台：图片居中 contain，可平移；点与 SVG 覆盖在图片内容 rect 上。 */\n.dsc-ia-stage {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  overflow: hidden;\n  touch-action: none;\n}\n\n.dsc-ia-canvas {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform-origin: center center;\n  will-change: transform;\n}\n\n.dsc-ia-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  user-select: none;\n  -webkit-user-drag: none;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);\n  background: #111;\n  box-sizing: border-box;\n}\n\n/* 评论编号点：30px，蓝色水滴（左下角 3px），缩放时反向补偿保持视觉大小。 */\n.dsc-ia-dots {\n  position: absolute;\n  inset: 0;\n}\n\n.dsc-ia-dot {\n  position: absolute;\n  z-index: 2;\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.35);\n  border-radius: 50% 50% 50% 3px;\n  background: #8bc3fe;\n  color: #fff;\n  cursor: pointer;\n  box-sizing: border-box;\n  transform: translate(-50%, -50%) scale(var(--dsc-ia-dot-scale, 1));\n  transform-origin: center center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 120ms ease, border-color 120ms ease;\n}\n\n.dsc-ia-dot-label {\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.dsc-ia-dot.is-draft {\n  pointer-events: none;\n  cursor: default;\n}\n\n.dsc-ia-dot:hover,\n.dsc-ia-dot.is-active {\n  border-color: #fff;\n  transform: translate(-50%, -50%) scale(calc(var(--dsc-ia-dot-scale, 1) * 1.05));\n}\n\n.dsc-ia-cursor-dot {\n  position: absolute;\n  z-index: 1;\n  width: 30px;\n  height: 30px;\n  border-radius: 50% 50% 50% 3px;\n  background: #8bc3fe;\n  opacity: 0.55;\n  pointer-events: none;\n  transform: translate(-50%, -50%) scale(var(--dsc-ia-dot-scale, 1));\n  transform-origin: center center;\n}\n\n/* 手绘 SVG */\n.dsc-ia-marks {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  touch-action: none;\n  cursor: crosshair;\n}\n\n.dsc-ia-marks[data-tool=\"select\"] {\n  cursor: default;\n}\n\n.dsc-ia-marks[data-tool=\"eraser\"] {\n  cursor: cell;\n}\n\n.dsc-ia-marks[data-tool=\"text\"] {\n  cursor: text;\n}\n\n.dsc-ia-marks[data-tool=\"preview\"] {\n  cursor: default;\n}\n\n.dsc-ia-marks .dsc-ia-mark {\n  pointer-events: none;\n}\n\n.dsc-ia-marks[data-tool=\"select\"] .dsc-ia-mark,\n.dsc-ia-marks[data-tool=\"eraser\"] .dsc-ia-mark {\n  pointer-events: auto;\n  cursor: move;\n}\n\n.dsc-ia-marks[data-tool=\"eraser\"] .dsc-ia-mark {\n  cursor: cell;\n}\n\n.dsc-ia-selection {\n  pointer-events: none;\n}\n\n/* 左右切图 */\n.dsc-ia-nav {\n  position: absolute;\n  top: 50%;\n  z-index: 6;\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.45);\n  color: #fff;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: translateY(-50%);\n  transition: background-color 120ms ease;\n}\n\n.dsc-ia-nav:hover {\n  background: rgba(255, 255, 255, 0.16);\n}\n\n.dsc-ia-nav:disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n\n.dsc-ia-nav-prev {\n  left: 20px;\n}\n\n.dsc-ia-nav-next {\n  right: 20px;\n}\n\n/* 预览态底部浮动工具条（标注 / 添加评论） */\n.dsc-ia-toolbar {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 48px;\n  padding: 2px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  cursor: grab;\n  touch-action: none;\n}\n\n.dsc-ia-toolbar:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-toolbar-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 42px;\n  padding: 0 14px;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #dfdfdf;\n  font-size: 13px;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-toolbar-button:hover {\n  background: rgba(255, 255, 255, 0.09);\n  color: #fff;\n}\n\n/* 评论态底部栏：拖拽柄 + 提示/计数 + 完成批注 + 关闭 */\n.dsc-ia-bottom {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 6;\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 48px;\n  padding: 2px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  touch-action: none;\n}\n\n.dsc-ia-grip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 40px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #8f8f8f;\n  cursor: grab;\n}\n\n.dsc-ia-grip:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-bottom-label {\n  padding: 0 10px;\n  color: #cfcfcf;\n  font-size: 13px;\n  white-space: nowrap;\n}\n\n.dsc-ia-primary {\n  height: 40px;\n  padding: 0 18px;\n  border: 0;\n  border-radius: 999px;\n  background: #dfdfdf;\n  color: #111;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 120ms ease;\n}\n\n.dsc-ia-primary:hover {\n  background: #fff;\n}\n\n/* 评论输入弹层：294x44 / 294x120 */\n.dsc-ia-popup {\n  position: fixed;\n  z-index: 8;\n  width: 294px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.09);\n  border-radius: 22px;\n  background: #303030;\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.dsc-ia-popup.is-unpositioned,\n.dsc-ia-text-editor.is-unpositioned {\n  visibility: hidden;\n}\n\n.dsc-ia-popup.is-new {\n  display: flex;\n  align-items: center;\n  padding: 0 6px 0 16px;\n  height: 44px;\n}\n\n.dsc-ia-popup.is-edit {\n  display: flex;\n  flex-direction: column;\n  height: 120px;\n  padding: 8px 16px 0;\n}\n\n.dsc-ia-popup-input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dsc-ia-popup-input::placeholder {\n  color: #8d8d8d;\n}\n\n.dsc-ia-popup-textarea {\n  width: 100%;\n  height: auto;\n  padding: 0;\n  resize: none;\n  overflow: auto;\n}\n\n.dsc-ia-popup-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex: none;\n  height: 48px;\n}\n\n.dsc-ia-popup-buttons {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.dsc-ia-popup-trash {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #bdbdbd;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-trash:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #ff6764;\n}\n\n.dsc-ia-popup-cancel {\n  height: 32px;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  color: #cfcfcf;\n  font-size: 13px;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-cancel:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n.dsc-ia-popup-save {\n  height: 32px;\n  padding: 0 16px;\n  border: 0;\n  border-radius: 999px;\n  background: #dfdfdf;\n  color: #111;\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-save:hover {\n  background: #fff;\n}\n\n.dsc-ia-popup-save:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.dsc-ia-popup-send {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: #dfdfdf;\n  color: #111;\n  cursor: pointer;\n}\n\n.dsc-ia-popup-send:hover {\n  background: #fff;\n}\n\n/* 手绘文字的独立输入框 */\n.dsc-ia-text-editor {\n  position: fixed;\n  z-index: 8;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  width: 240px;\n  height: 38px;\n  padding: 0 6px 0 12px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 19px;\n  background: #303030;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);\n}\n\n.dsc-ia-text-input {\n  flex: 1;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: #fff;\n  font: 14px/20px \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dsc-ia-text-input::placeholder {\n  color: #8d8d8d;\n}\n\n.dsc-ia-text-actions {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex: none;\n}\n\n/* 手绘工具条：44px 深灰，图标工具与菜单 */\n.dsc-ia-markup-anchor {\n  position: absolute;\n  left: 50%;\n  bottom: 24px;\n  z-index: 7;\n  touch-action: none;\n}\n\n.dsc-ia-markup-toolbar {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  height: 44px;\n  padding: 2px 4px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.96);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);\n  cursor: grab;\n}\n\n.dsc-ia-markup-toolbar:active {\n  cursor: grabbing;\n}\n\n.dsc-ia-tool {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border: 0;\n  border-radius: 10px;\n  background: transparent;\n  color: #d6d6d6;\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n.dsc-ia-tool:hover {\n  background: rgba(255, 255, 255, 0.09);\n  color: #fff;\n}\n\n.dsc-ia-tool.is-active {\n  background: #363636;\n  color: #fff;\n}\n\n.dsc-ia-tool:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.dsc-ia-tool:disabled:hover {\n  background: transparent;\n}\n\n.dsc-ia-tool-wrap {\n  position: relative;\n  display: inline-flex;\n}\n\n.dsc-ia-divider {\n  width: 1px;\n  height: 20px;\n  margin: 0 4px;\n  background: rgba(255, 255, 255, 0.14);\n}\n\n.dsc-ia-tool-color {\n  width: 36px;\n}\n\n.dsc-ia-color-dot {\n  display: block;\n  width: 18px;\n  height: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  box-sizing: border-box;\n}\n\n/* 弹出菜单：形状与颜色 */\n.dsc-ia-menu {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 9;\n  padding: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n  background: #2d2d2d;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);\n}\n\n.dsc-ia-shape-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 116px;\n}\n\n.dsc-ia-menu-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 34px;\n  padding: 0 10px;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: #dfdfdf;\n  font-size: 13px;\n  text-align: left;\n  white-space: nowrap;\n  cursor: pointer;\n}\n\n.dsc-ia-menu-item:hover {\n  background: rgba(255, 255, 255, 0.08);\n}\n\n.dsc-ia-menu-item.is-active {\n  background: #363636;\n  color: #fff;\n}\n\n.dsc-ia-color-menu {\n  display: flex;\n  gap: 6px;\n}\n\n.dsc-ia-color-swatch {\n  width: 26px;\n  height: 26px;\n  padding: 0;\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 50%;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n\n.dsc-ia-color-swatch.is-active {\n  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.75);\n}\n\n.dsc-ia-zoom-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 108px;\n  top: calc(100% + 8px);\n  bottom: auto;\n  left: auto;\n  right: 0;\n  transform: none;\n}\n\n/* 左侧竖向笔宽滑条：32x192，轨道上下各 16px */\n.dsc-ia-size-slider {\n  position: fixed;\n  left: 20px;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 7;\n  width: 32px;\n  height: 192px;\n  box-sizing: border-box;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  background: rgba(45, 45, 45, 0.92);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  cursor: ns-resize;\n  touch-action: none;\n}\n\n.dsc-ia-size-rail {\n  position: absolute;\n  left: 50%;\n  top: 16px;\n  bottom: 16px;\n  width: 2px;\n  margin-left: -1px;\n  border-radius: 2px;\n  background: rgba(175, 175, 175, 0.4);\n  transition: width 300ms ease, margin-left 300ms ease, background-color 300ms ease;\n}\n\n.dsc-ia-size-slider:hover .dsc-ia-size-rail,\n.dsc-ia-size-slider:focus-visible .dsc-ia-size-rail,\n.dsc-ia-size-slider.is-dragging .dsc-ia-size-rail {\n  width: 8px;\n  margin-left: -4px;\n  background: rgba(220, 220, 220, 0.5);\n}\n\n.dsc-ia-size-thumb {\n  position: absolute;\n  left: 50%;\n  width: 16px;\n  height: 16px;\n  margin-left: -8px;\n  margin-top: -8px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);\n  transition: transform 120ms ease;\n}\n\n.dsc-ia-size-slider:hover .dsc-ia-size-thumb,\n.dsc-ia-size-slider:focus-visible .dsc-ia-size-thumb,\n.dsc-ia-size-slider.is-dragging .dsc-ia-size-thumb {\n  transform: scale(1.1);\n}\n\n.dsc-ia-size-slider:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.55);\n  outline-offset: 2px;\n}\n\n/* 图片旁“N 条批注”胶囊 */\n.dsc-ia-pill {\n  display: inline-flex;\n  align-items: center;\n  height: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 999px;\n  background: rgba(45, 45, 45, 0.95);\n  color: #dfdfdf;\n  font-size: 12px;\n  overflow: hidden;\n  vertical-align: middle;\n}\n\n.dsc-ia-pill-open {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  height: 100%;\n  padding: 0 8px;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.dsc-ia-pill-open:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n.dsc-ia-pill-clear {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  border-left: 1px solid rgba(255, 255, 255, 0.08);\n  background: transparent;\n  color: #989898;\n  cursor: pointer;\n}\n\n.dsc-ia-pill-clear:hover {\n  background: rgba(255, 255, 255, 0.08);\n  color: #fff;\n}\n\n/* 错误与无障碍 */\n.dsc-ia-error {\n  position: fixed;\n  left: 50%;\n  bottom: 96px;\n  z-index: 10;\n  max-width: min(560px, calc(100vw - 32px));\n  padding: 8px 14px;\n  border: 1px solid #ff6764;\n  border-radius: 10px;\n  background: rgba(60, 20, 20, 0.96);\n  color: #ffd6d5;\n  font-size: 13px;\n  transform: translateX(-50%);\n}\n\n.dsc-ia-sr {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.dsc-ia-empty {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #bdbdbd;\n  font-size: 14px;\n}\n\n/* 小视口：弹层不越界，工具条不撑破屏幕 */\n@media (max-width: 640px) {\n  .dsc-ia-popup {\n    width: min(294px, calc(100vw - 16px));\n  }\n\n  .dsc-ia-bottom,\n  .dsc-ia-toolbar {\n    max-width: calc(100vw - 16px);\n  }\n\n  .dsc-ia-bottom-label {\n    white-space: normal;\n    line-height: 16px;\n  }\n\n  .dsc-ia-size-slider {\n    left: 8px;\n    height: 160px;\n  }\n\n  .dsc-ia-title-name {\n    max-width: 34vw;\n  }\n\n  .dsc-ia-nav-prev {\n    left: 8px;\n  }\n\n  .dsc-ia-nav-next {\n    right: 8px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-ia-root *,\n  .dsc-ia-root *::before,\n  .dsc-ia-root *::after {\n    transition-duration: 0.001ms !important;\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n\n/* 图片批注集成层样式：只服务本插件自绘的附件 rail、胶囊行、恢复错误与历史图片框。\n   批注编辑器本体（.dsc-ia-*）由 image-annotations.css 提供，不在这里重复。 */\n\n.dsc-iai-rail-wrap {\n  min-width: 0;\n  margin-bottom: -4px;\n  padding: 2px 10px 0;\n  position: relative;\n}\n\n.dsc-iai-rail {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  padding-bottom: 2px;\n}\n\n.dsc-iai-rail::-webkit-scrollbar {\n  display: none;\n}\n\n.dsc-iai-rail-item {\n  flex: none;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  max-width: 168px;\n}\n\n.dsc-iai-rail-image {\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n\n.dsc-iai-thumb {\n  width: 64px;\n  height: 64px;\n  padding: 0;\n  border: .5px solid var(--dsw-alias-border-l2-darkmode-thin, var(--dsw-alias-border-l2, rgba(255, 255, 255, .1)));\n  border-radius: 14px;\n  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, .06));\n  cursor: zoom-in;\n  overflow: hidden;\n  display: block;\n}\n\n.dsc-iai-thumb img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n\n.dsc-iai-thumb:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary, #339cff);\n  outline-offset: 2px;\n}\n\n.dsc-iai-remove {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  z-index: 1;\n  width: 18px;\n  height: 18px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--dsw-alias-button-contrast-fill, rgba(0, 0, 0, .72));\n  color: var(--dsw-alias-label-primary-inverted, #fff);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  opacity: 0;\n  transition: opacity .2s ease-in-out;\n}\n\n.dsc-iai-rail-item:hover .dsc-iai-remove,\n.dsc-iai-file:hover .dsc-iai-remove,\n.dsc-iai-remove:focus-visible {\n  opacity: 1;\n}\n\n@media (pointer: coarse) {\n  .dsc-iai-remove {\n    opacity: 1;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-iai-remove {\n    transition: none;\n  }\n}\n\n.dsc-iai-pill-row {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  max-width: 100%;\n}\n\n.dsc-iai-recall-error {\n  max-width: 168px;\n  padding: 2px 6px;\n  border: 1px solid var(--dsw-alias-state-error-primary, #ff6764);\n  border-radius: 999px;\n  background: transparent;\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n  font-size: 11px;\n  line-height: 16px;\n  text-align: left;\n  cursor: pointer;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dsc-iai-recall-error:hover {\n  background: var(--dsw-alias-state-error-tertiary, rgba(255, 103, 100, .12));\n}\n\n.dsc-iai-inline-error {\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n  font-size: 12px;\n  line-height: 18px;\n  padding: 2px 2px 0;\n}\n\n/* ------------------------------ 文件卡 ------------------------------ */\n\n.dsc-iai-file {\n  position: relative;\n  flex: none;\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  width: 240px;\n  height: 64px;\n  padding: 0 12px;\n  border: .5px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, .1));\n  border-radius: 14px;\n  background: var(--dsw-specific-input-major, rgba(55, 55, 55, .94));\n  text-align: left;\n}\n\n.dsc-iai-file.is-error {\n  border-color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-file-icon {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: .02em;\n  color: var(--dsw-alias-label-secondary, rgba(255, 255, 255, .7));\n}\n\n.dsc-iai-spinner {\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: dsc-iai-file-spin .8s linear infinite;\n}\n\n@keyframes dsc-iai-file-spin {\n  to { transform: rotate(360deg); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsc-iai-spinner { animation: none; }\n}\n\n.dsc-iai-file-body {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  padding: 0;\n  border: none;\n  background: none;\n  color: inherit;\n  text-align: left;\n}\n\n.dsc-iai-file-retry {\n  cursor: pointer;\n  font: inherit;\n}\n\n.dsc-iai-file-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-primary, #fff);\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 22px;\n}\n\n.dsc-iai-file-meta {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 15px;\n}\n\n.dsc-iai-file-meta.is-error {\n  color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-progress {\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  bottom: 5px;\n  height: 2px;\n  border-radius: 1px;\n  background: var(--dsw-alias-fill-tertiary, rgba(255, 255, 255, .08));\n  overflow: hidden;\n}\n\n.dsc-iai-progress-bar {\n  display: block;\n  height: 100%;\n  width: 35%;\n  border-radius: inherit;\n  background: var(--dsw-alias-brand-primary, #0285ff);\n  animation: dsc-iai-file-progress 1.2s ease-in-out infinite alternate;\n}\n\n.dsc-iai-progress-bar[style] {\n  animation: none;\n}\n\n@keyframes dsc-iai-file-progress {\n  0% { transform: translate(-70%); }\n  to { transform: translate(220%); }\n}\n\n/* ------------------------------ 拖放遮罩 ------------------------------ */\n\n.dsc-iai-drop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  display: grid;\n  place-items: center;\n  background: rgba(0, 0, 0, .55);\n  pointer-events: none;\n}\n\n.dsc-iai-drop-card {\n  min-width: 280px;\n  max-width: min(420px, 80vw);\n  padding: 20px 28px;\n  border: 1px dashed var(--dsw-alias-border-l4, rgba(255, 255, 255, .18));\n  border-radius: 20px;\n  background: var(--dsw-alias-bg-layer-1, #212121);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, .45);\n  text-align: center;\n}\n\n.dsc-iai-drop.is-blocked .dsc-iai-drop-card {\n  border-color: var(--dsw-alias-state-error-primary, #ff6764);\n}\n\n.dsc-iai-drop-title {\n  color: var(--dsw-alias-label-primary, #fff);\n  font-size: 15px;\n  font-weight: 600;\n  line-height: 22px;\n}\n\n.dsc-iai-drop-desc {\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n}\n\n/* ------------------------------ 历史图片 ------------------------------ */\n\n.dsc-iai-history-group {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: flex-end;\n  gap: 10px;\n  max-width: 100%;\n}\n\n.dsc-iai-history-group[data-align=\"start\"] {\n  justify-content: flex-start;\n}\n\n.dsc-iai-history {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n  min-width: 0;\n}\n\n.dsc-iai-history[data-align=\"start\"] {\n  align-items: flex-start;\n}\n\n.dsc-iai-history-frame {\n  position: relative;\n  box-sizing: border-box;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  overflow: hidden;\n  border: .5px solid var(--dsw-alias-border-l2-darkmode-thin, var(--dsw-alias-border-l2, rgba(255, 255, 255, .1)));\n  border-radius: 16px;\n  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, .06));\n  cursor: zoom-in;\n}\n\n.dsc-iai-history-frame img {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: cover;\n}\n\n.dsc-iai-history-frame:focus-visible,\n.dsc-iai-history-error:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-business-primary, #339cff);\n  outline-offset: 2px;\n}\n\n.dsc-iai-history-loading {\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n  padding: 0 10px;\n}\n\n.dsc-iai-history-error {\n  max-width: 240px;\n  padding: 10px 12px;\n  border: .5px solid var(--dsw-alias-state-error-primary, #ff6764);\n  border-radius: 12px;\n  background: var(--dsw-alias-interactive-bg-hover-danger, rgba(255, 103, 100, .08));\n  color: var(--dsw-alias-label-tertiary, rgba(255, 255, 255, .5));\n  font-size: 12px;\n  line-height: 18px;\n  cursor: pointer;\n}\n";
    const PROTOTYPE_ICONS = {"home":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path d=\"M3 7.2 8 3.2l5 4v5.3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/></svg>","tasks":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"5.5\"/><path d=\"M8 5v3l2 1.5\"/></svg>","plugins":"<svg class=\"dsc-rail__plugin-icon\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M7.5 3v4m5-4v4M5.5 7h9v2.8a4.5 4.5 0 0 1-9 0V7ZM10 14.3v3.2\"/></svg>","settings":"<svg viewBox=\"0 0 20 20\" width=\"18\" height=\"18\" stroke-width=\"1.4\" aria-hidden=\"true\">\n          <path d=\"M8.80 3.20 L9.07 1.85 A8.20 8.20 0 0 1 10.93 1.85 L11.20 3.20 A6.90 6.90 0 0 1 13.96 4.35 L15.10 3.58 A8.20 8.20 0 0 1 16.42 4.90 L15.65 6.04 A6.90 6.90 0 0 1 16.80 8.80 L18.15 9.07 A8.20 8.20 0 0 1 18.15 10.93 L16.80 11.20 A6.90 6.90 0 0 1 15.65 13.96 L16.42 15.10 A8.20 8.20 0 0 1 15.10 16.42 L13.96 15.65 A6.90 6.90 0 0 1 11.20 16.80 L10.93 18.15 A8.20 8.20 0 0 1 9.07 18.15 L8.80 16.80 A6.90 6.90 0 0 1 6.04 15.65 L4.90 16.42 A8.20 8.20 0 0 1 3.58 15.10 L4.35 13.96 A6.90 6.90 0 0 1 3.20 11.20 L1.85 10.93 A8.20 8.20 0 0 1 1.85 9.07 L3.20 8.80 A6.90 6.90 0 0 1 4.35 6.04 L3.58 4.90 A8.20 8.20 0 0 1 4.90 3.58 L6.04 4.35 A6.90 6.90 0 0 1 8.80 3.20\"/>\n          <circle cx=\"10\" cy=\"10\" r=\"2.3\"/>\n        </svg>","newChat":"<svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9\"/><path d=\"m10.9 2.7-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8\"/></svg>"};
    const BRAND_MARK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADBCAYAAAAgsW7DAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABgkSURBVHhe7d0HtD1VdcdxCxoJwd6CgooRGyqClYgNlNgrEUPsiBorYoyxKxK7sRGMYkVFl41oUOygYokaY4klQbFrIgj2/j1ZP9j/rPf//d//vVvOzJyZuz9rsVgL7ptz5szcuTNn9tn7POdJKaWUUkoppZRSSimllFJKKaWUUkoppZT6VkrZCzgQuJL/v5TShAEPLQH4OXCIfyalNEHA3lu+/GsuAj8upVzSP5tSmhjgA34BEODB/tmU0jpKKRcC/rSUckU9Q5dSdgMu7p9rDbCff/HXONk/n9JKA3YFbgb8HfCPwEeATwGnAT8BfgP8DvgV8EPgc8AHgWcAt/TtDQ14v3/rtwB+oYua/01KKyN+0Q8Gjokv80/9izKPuFjc2NsZAnAd75/TvvvfpTRpwHWBJwAf1S+5fymWFXcHl/Z2+wa8xPvmgDf536U0OcCewOOBz/qXoAMnl1Iu4n3oE7Aj8D3vmAPOGsNcRkpzAy4PPAI4Ffi9n/y1Af8O3MX7MYRSygHev+0BHuB/n9IoATsBdwXeWko520/2rgDPKaVc0PszlOjPTIAvl1Iu4NtIaSb60imopJSye4Sa6gt4t1LKYcCTgaOBY7fzz4uBJwL3j7/TP/vFKzdt8/ze3noU7AI8F/iGn+BdAw71/gwN+KT3cyOaE/FtpLSV+HW9BnAv4LH6lVWQCfCteEX2az+xFgX8LLb5ReAk4BXAI4HbAVfR7b1uc4GjSimf8b/viy5cPk5DAy6j8fO+biRebR7o20orTJND8SU7Engf8E0/cYYQJ+tSr+tqAP7Wx6wFpZSbeF9nAfwSuLVvL60Q4KrAw4ATgf/1kySdC/iQj10rgAd6f2cVrzDv59uconh03c3/+8qJ2fJDdVIDv/WTIm2Nc+3t49gK4B+8z/MCXg9cwbc9FcA9NV8UkZ3vAvbwz0yebhWB1+lZ20+AtH0K/fWxbAnwdu/zIoAzSylPLaVc1tsYM83brLOv312Ju4FSyvki9PUUH4Q0G62t93FtCXCC93kZsebhSIVNe1tjo2On2zffRwH+2T8/KfHF/7TveJoPcAsf25boUc77XENMvL5GodTe5hhogZfv01oxyT29eIh4N5+/+JUA+/sYt6TrcGdFVQIv1dyRt90q4G98P5weA4A/8r8drQjMOc53NC3tAB/rligk2TvcBeAHmkzz9luz2S//FsB3JnMB0BUv0j6lyoC/9/FuiZY1e5+7BLywlLKD92NoCs1WTgfv7/YooK2lcO6FRJTcib5zqR7dYvu4t2TeMOAagPeUUv7Y+zIU4AbAx72fGwE+5tsZFeAewBm+Y6m+liPmgHd7f/ugi4D3pW/AtSK5y++8f5sB3ujbG4V4tfc836HUHeDzrc4Y134NOA/g+d6fGoALa3EYcIlSyp/onNcdB7ALcL2IXlW4+txf/C20MM3bbZ6CNPKWfxhdnezLUpYf72ufgNt7n2YVX/JbxmIzRSN+OPIsaIb+DIWnx+IzLRI7XXkNvf1FjS4EOuL2T/MdSf0BDvfjMjRNUno/+xQhtjt5v7YH2FmFSnTnMuT6k9bjO7YC7At833ciDeJZjU2AHeod7BtwhPfLlVIuFtmXT/e/71ssgtrF+9ikUsqd513vnbqlOQGlE/djNYRFlwPXBHx7o4tiPLMr/r4JwJdafJW5DeDuwB98B1IblIpr6GASZSRu4QcCuNM6fbtmJE1tihbFeV+bA9wxv/zti/fwe/nx69OQWZK2UBSq9em+Kkzqn2vEYWv72hzg+jVnPFO3IrvOw/049gV4mfepb3GLf05OR+CZ/v9boR9V4Oo+hs0Arqy4a+94ah9wvGa5/Zh2TSs/vS8D2Qt4kf/HlgD/WUo5r49hE+J5bvBZ0rS4mCC8th/bLimrcgt3jC1N9G1Pq/EcembaAXivdziNTyzMOsiPcZfy3JkNcCMfuya0fuuU5tdn4JAq/nj7aWvAV5t8/afc+97ZNA19pZ6Kwiq9VUcaoyaXdkfxjcHz3qfuRLx+52vPVVDF207nijmSthKBaoVZ5u1bDVo+q9Vtfg7UpFl4bzedC3ilj9fggKd7R9N0xaq2y/l5UBPwTm931UV1qbbe/ZdS9llmPXMaJ72H7vIiEOfVuqmwVxXwWh+nQcWtf6+53FI7Yja6s+dR4FXe5qpq8tlfJbK9o2m1dHkRiMQxmST23HFuq6hrpO/+pXc0rR7gv7q6CAD38fZWDfCF5t7716rllqYB+FqHF4G3eXurAvg1cB0fk0Ep/5l3NCVdBLqYGAQutapp5JSExMdjcEPkcE/jAHyli/JbkTN/pcrAKyDKx2FwwO28oymtBXy5i1x1wF29ramKYqnn8zEYXAtZW1L7Ik6gi4vApgUzx07VfkopF/V9HxxwW+9sStujpJVa4+/n0bKAJ3lbUwGcWkq5iO9zE4BPeIdT2ogCxZQgxs+lZQEP8bbGDvhXVRPyfW2CEhB4h1OahQqTdnFiK1nJVCYGgRf4/jVl6NJNadyAD6o+np9XywJuqqo+3t5YaAm9gp18v5qid7st5GpL4wZ8oKOLgIptvsvba50uisCevj/NUdFD73xKi4g7ge1W31mG4uXH8EgQxUIHS78+t1zxlyo7WdF9fp7VANwY+JE32ALgN8DRXQRKdUYRWL4jKS1L5bO12s/PtxqAR3l7Q1JlIeBY4Fre1+YBz/MdSqmGyCzURbDQgd7WEGJtxJHAHt7HUVCJpFjvnVIn4ktyDT/3lgG82Nvpi5ZGK4OyLkJDF1xdmm5ZsrBn6hpwptaY+Pm3iChM89/eRheUrETJcIE3RIjyPsqS5X0aLeAI3+mUuhDFLh/t5+C8NAno264lQpsfExWvtTrx4t7+pAAn+SCk1CUlvlwmFh54tm+zBuCsLuYrmqXVSF3lY9NrGlUOBr4TS0c1GaR/vgp8P/7fT/zv0mqI82B/Pyc3E3NWX/Ht1aCEJN7epJVSbu6DMK94tvuIKpnqGQm4BXBd3ToBOwE76qBp3XP8s4OCROL/7VJKuUncbh2lXwbgP7q6KKX26LyZJ2gIuL5voxbgm6Of1JuH6o/5IMzhbD3PdfGeN0pI7ws8FHhjrDvPugQTFcf3Dn4erAd4mv99LcD35rkYjd6iST+1ZqDP0sVx13C1Usp9geOA071PafwU66+7Rz/+a2nVof9dLfFoupO3OUm61Yksr3MDXubb65MeK4A/L6U8NesVTkuUxtJFfpsLgYJtOn5lrbva6slNmhSrq37tIzAL4N6+vSHFnMOTuvx1SP0Cfg+cANwm5pH07v91/rmaogbG7n5+TRJwKx+AORzk22tFTCoe0+pikTQ/4OuaJ/D/XttKXQD0PO0DMCvgEN9eayLP/AMzvfm24tWs1qmfpOSUwBn+mVUUb7Q6WcHYHOClPgCzAu7n22uZ3jdrwlO3lb4vqyLiLjSDvpcn7IhXtnqMehjwnkUfDccuJgF3XDs2k6XYZh+AOdzXtzcGwN4xwbRSF4KIZZ95fXpMtmmF6Nm+rYlTOvz28vTXVko57zK3xsDhvs0xWXMhmHxtei2aWfS2NorDLvNDMSrA8T4Gk1RKuaCeA30AZgW83Lc5RnEheIvv35QA9/D9nhdwqDLd+LanBni67/sklVIutOQF4C2+zTGLdd2f8v2cgvXepy9CcRfAt3z7UzKGye0qVOJZKYx8AGYFvNu3OXZ69ovQ4x/4/o6Zkmj6vi4KuFJXC3EasY/v8yQtu6BC72X1GOHbnYJIj67lqpMQSSofXivEVZOJwBe8nbGLxB/TXvu/BbCfD8A89N4Y2Nm3OyXAXZT6yfd9rLTUFXilwrhj5eUhCprS46Dv+2aAS2gFqLcxZnpT4vs5WXHgF6a87MC1fbtTE/kSXuH7PyVxYVBSy7ku6IolAN7v2xsr3fX5Pk7WshcA0cSZb3eqgL+MpaKTFUlb5krcGRfIScwJKDWe799kVboALJ3bbUyAXaeePk0XOU30+b5vJCYGf+jbGptFshONVqULwDG+3VXQZUKKPkTJqu2W1gJO9H3eTCnlgDEnbAF+tmq5AGtcAD7m210VSm89wrRlCnPVcb8kcFXgVf6BNfbyfd6M3jT4RsZCaeh8fyat0gVAz8TVq8COBXD1KH3VvPjV3+YXTgt//LOy6OOdQml9W2Ogi6Hvy6TVuADIKOugVVRKudiiadX6pHUP3ncB/to/K8Bz/LOzUKpvJdb07bUOeJDvy6QtGwewRWuZgYYCvNDHpiV6/+99lg0uAI/yz84KuLVvr2VaEFYrXHo0Yu330ivhgH/yba+qlissxa/yNoU4lHLLPytK7e6fnYeCjXybrYo1MXMHQ42aUnlXWuu9GuunZ6Touo6TVi4MOBXYM5J/6NXdi/wzorRYwJV93+YR8QHf9W23CHib93/yIiPwwqsBtwB+pffjvv1VpnyJrSYciUSbinlX7rt1Ad+uURyjlHJn33aLgEd43ydv2XwAawF39e2vuqh0tN0vWct0Aai10At4k2+/NcoJ4f2evMgI9HEfjEUot6BvP51z8t9sjLUPY81/rQuAoiebHYMpr2rdFPB6H5BFqMijav/59tM5Y3xTPSb5mLUsMgYv/QiwRSnlcd5GQ17j/V0ZwLE+GouI1ygrHQ+wEeBOrU4MridWel7V92NRUQi2yUxCNdKljRbwEB+QRa3USqoFxGrCpV+79gW4j+/DMhRX4G0MLepbrkYZsPUo4YUPyqJUZMK3n7a2TCGWvmmdv/d/GREheKa3M6Ta+zg6Wvtd63VVFJLYzdtIW1PiDR+7Vi0bDOQUNOZtDEn5H72PKyUCQs7ygVkU8GBvI22r1txL15QObd4sQRuJmo1NzIVEivMreh9XSrwK/DcfnEUpR5y3kbYVVW4/5uPXIj3aaRLP92ERsQz5p97GEIAPe/9WEvBGH5xFRV33PbyNtC3gMhFw0zzgEzV+LSNpSBMToaqB6P1bScoZ74OzpKd6G2l9wL5jKcIZRTP3832YVfz6N5E7ISI0c75KdFX2AVpGJIjMoKAZad7Ex7BV8dysoJ6ZHwkiBuBeqk/o2xvKFIvaLExZYpapELQerQf3dtL2Aa/2MWxZTA4+UcFf660EjXThKsf+wgi1bcpKB/+sp/at2dTqBnZN9eiBz/s4joHu+PSLqqXFes0HnNLy3AbwPzXfbEwCcLQP1DLiGWvpSaNVAlxTkWk+lqkuXah87FcecLAPVAXP8nbSxoAH+CCmemLNynV83FcecIXatd+VhXaVMwYvCnizj2WqA3ivj3eKgKBI7VXVSmZaWVK8Lmty5dzYaVWmj3cKumX3AVtWVNa9gLeVNlb71Ww651z80npvLFIopdzcB62G2stKVwXwfB/LtDjNr/gYpzXiVVSVHIFrRbagvAuYk9JUq1yVj2eaH3B6zQxHk6XiET54NeRdwGKUrLLWcu1VlnH/MwJu64NXQ8wFrGbixSUBT/HxTLOLCdWZQ5dXWlePAaLKsd5e2pzWVdRcsr2CDvMxTRvYXrWYZQE/UCFNby9tTjH3Y1k12JK881wAcAMfyIoyOnBBwGN9MNPGlIjVxzFtIrIEfdYHs4YoI/Zn3mbaXM1CLqsgs1MtQc/rPqC1AO/09tJsorBnPgpsQnkHdSfr45dmFMlCf+wDWwtwd28zzSYfBTan0uQ+bmlOqvfnA1tLvGnYplZ92pzCWSNHX1pHpC67uI9bmpNKQynJpw9wLXmVXlzUc8hHgXWo2I2PV1oQ8A4f4JqAA73NNBvgkT6eq07Fbn2c0hI6fiW45XbtUt5umo1KW/mYrqo4ly7hY5SWBPyLD3ZNwAneZpqN0q6VUs72MV1Fuda/I8D1uy7moNoE3m6azZgKjnZFyUh9XFJFenfvg15TVBS6pbebZlOzutPYAJ/Lpb4di1j03/rg16S1Aitdq30JpZSLrmIasagzeDUfj9QB4OV+ADrwmbyaLwa4qQ/m1AH39HFIHSmlXLbL6MAtWn+VA9xGt9zApxTLoNJewJX9c0NQtR4fzwnLhWV9U2YVPwpdUBSit90Cffm9r6JCKFEdZ/AgFOAk79/UxJupTPDZN9W17yJ9+HqAx3j7Q5vllWjcGRzsf9uXKDv+Xe/XVETx2Yv6fqeeADfyg9KVljK5RmaeL3sftwc4FfgL304flOG561e3Q4i6frmcfGjAS/zgdEWlpb39IcQinLmz9AJvVey+b69rwOHelzGLV8X7+36mAQA79VnvHbi392EIwLu8b7NQ0c8op72jb7NLwHHel7HKGf/G9H2bqdl270Pflq2eFHcQB/h2u6JXql1ld+oT8ATft9QA4Cg/WF1SMgzvQ5/0TO99WgTwAt1F+fa7AOwahVpHKct5Nyyeiz/pB61LwNHej76o2jHwQ+/TIqJWXS93AwqzHmP+AOB435fUmCFWpOnEAC7sfekD8GLvzzKA56gMmLdTm15Netst0w9LRoWORCnlzn4Au6ZnW+AK3peuAdesPfcR+3I9b6s24GnedouAL+Ta/pEBjvQD2bXILdjLbfRaerXnfVlWpEw/wtuqrfWqw8CPgCt5v9MIdL1seD0qntn35GDkS+xkdaSiDYHLeZs1Aa/1dlsQK0Jv5P1NIwHsPNRrJ+AtfaYX6/INiO5sVKjV26xF5dqB93m7Q1P0ZJaSHzndvgFn+MHtA/BN4Nbepy5o4i5qz3UGeKa3W4sq5pZSTvY2h6Zwa+AOWdNvxCKN2E/84PYFeF4fJaFrxQVsBPhgV5Odeq3Z4kVAgK8Bx8QYd/6WJFWmlN9d1hXYDPBF4Bber9r6iINQ7AFwe2+7hpYvAlvoTismmffy/qeGKYbfD2bfFHXXZRUi4JXeZleAZ3j7NehuadF1Dn3S61flO1DV34wRGIkuC43OKp7VD/K+1QC8ydvrEvAeYBfvRw09pX2rAvhqKeVxXb8xSRUAj/ADOIR4xVbtsaCUsjtwprfTtXhLsJ/3p4ZlFzz1DTgr5gr29n1JDWnlIiCRtefRyySXAK4ev0KDiPXxD/d+1TDGsmNRElwZm3oPDEsz6iun4KxigYwmwHQrebNZUk1FKLBW8/3ctzeQ13SxslCv4oZ8k7MM4CPKH5AxBQ0C7qawVz9oLVD8AnCKIhr1Dh54aPyjZB4KNFLM/u/974YWxTH29bFeFnDtyME3SvEm6K98v9LAgFvp2c0PWFpchEQ/u3Y0pLYHvN3bGxPgHr5faWARLLRy1Wy6Bnwv7liqVlkCnu5tjUWEp5/f9ykNLLLVfNwPWFpePM7otd4BtcJqgTvqAuNttS5WWnby6jQtKbLsvMEPWqonIun0qkzzL7v6MZhHKeViwKtancdZjyYzaz8apcqAJ/uBS/Xp7UVMZr5Ny6hLKYcppgC4il6L6pdSkZO6a9A/ymQcX3rdrekz+vcNWg8fXgv4qJ9vqUHKLKSEEH4AU/cizPYPSu+mykJx16AFOV8Hvh8XjnP437YOOMTPtdQoFdrUe1w/iKlpzwKeUithak3AsX6OpcZFGS4ly0wNA36ztl5DvDI8NBbs/MI/36e4Yzlq6zMrjYrWggPf8IObhgecttF6hFLKbloNqtWSwKd7iirU44uyCSuIaw/vUxqh+FV5nR/pNJyIub+kH6uNAJeO+gT3VGJS4BWanFOJOeDbs+ZYjJh/LYbSHMUJqhMB3D+2nTP9UxVrwE/zEyL1R1/S2mXbo7iMak0q0aqCw24Yd3463gfHv5VcRv9d//8a+rz+zreVJk6LdVSYo8V4/KmLV4c39GOSUu+AGwMf8pM01RdrDJ6ZeflSc2KS6Wt+0qY6Yllt/uqndkUo8eEKVvETOC0mAoEe4mOdUrOAyyhpZkYSLg74GfDceWf4U2qGlsECT8j4gdnFF/8ly6RIS6kpKh8eUWmf9hM+/T8Fzqjc+e4+filNBrC/CmJmFqJzRRCNkoZc3scqpclSDnllvI0INK18WxkRG/+OWHGZRTXSagP2BB6virRjSm4xj8iZ/27gQV3VF0xp9GIJsuYL3jzmPIURtPOViLNXGG3VvIApTV7Uyds3YgveEEkxBityupFIAKrVby9V0gvd1ZRSdvB9SiktKBar7BELVI4AjgM+HCvSOi0OojX1kc9Oef8/ALw6+qBf92t1WfQ0pbQBYOdSymVLKfsAd48v5WOVfFPVeqJiz/FRZETP4acojx5wYtQoVCLULZ/TklbNR6ia8kHAnVTrLmIaLu1tp5RSSimllFJKKaWUUkoppZRSSimllFKauP8D0a9eXOntdgwAAAAASUVORK5CYII=";
    const PLUGIN_VERSION = "0.2.0";
    const PLUGIN_PACKAGE = "@xinxing1708/dsh-codex-style";
    const module = { exports: {} };
    const exports = module.exports;
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
        h('div', { ref: extensions, className: 'dsc-extension-navigation-anchor', 'aria-hidden': true })),
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

function makeSidebarChrome(ctx, sidebar) {
  const completions = createSessionCompletionTracker(ctx);
  ctx.effect(() => completions.start(), 'codex-style: unread session completions');
  ctx.effect(() => registerMorePage(ctx), 'codex-style: more page');
  const Tree = makeWorkspaceTree(ctx, completions.store);
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
      // 0.2.1-rc.2/rc.3 的窄适配：由公开 overlay/slot 锚点找到它们所属的列，
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
      mark(document.body, 'data-dsh-codex-chrome', PLUGIN_VERSION);
      mark(frame, 'data-dsc-frame');
      mark(frame.querySelector('[data-slot="sidebar"]')?.parentElement, 'data-dsc-sidebar-column');
      mark(frame.querySelector('[data-slot="main"]')?.parentElement, 'data-dsc-center-column');
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

// 公开的会话头 leading 座负责留位；仅收起二级侧栏时显示，不覆盖标题。
// 保留原生头部、视图按钮和子槽所有权，仅从公开锚点添加可释放的布局标记。
function useConversationHeaderChrome(marker, enabled) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const header = marker.current?.closest('header');
    if (!header) return;
    const attributes = new Map();
    const properties = new Map();
    const restore = (element, saved) => {
      for (const [name, value] of saved) {
        if (value === null) element.removeAttribute(name); else element.setAttribute(name, value);
      }
    };
    const sync = () => {
      const touched = new Set();
      const mark = (element, name) => {
        if (!element) return;
        touched.add(element);
        let saved = attributes.get(element);
        if (!saved) attributes.set(element, saved = new Map());
        if (!saved.has(name)) saved.set(name, element.getAttribute(name));
        if (!element.hasAttribute(name)) element.setAttribute(name, '');
      };
      const corner = header.querySelector('[data-conversation-header-corner]');
      const row = corner?.parentElement;
      const tabs = header.querySelector('[data-conversation-tabs]');
      if (row && corner) {
        mark(header, 'data-dsc-conversation-header');
        mark(row, 'data-dsc-header-title-row');
        const navigation = row.querySelector('nav[aria-label]');
        mark(navigation?.parentElement, 'data-dsc-header-title-cluster');
        mark(navigation, 'data-dsc-header-navigation');
        // 末项是当前标题容器；只标记它，祖先面包屑按钮与操作保持原样。
        mark(navigation?.lastElementChild, 'data-dsc-header-title');
        mark(row.querySelector('[data-slot="conversation.session.header.actions"]')?.parentElement, 'data-dsc-header-actions');
        mark(row.querySelector('[data-slot="conversation.session.header.utilities"]')?.parentElement, 'data-dsc-header-utilities');
        mark(row.querySelector('[data-slot="conversation.session.header.utilities"] [data-open-target="directory"]')?.parentElement, 'data-dsc-header-open-in-app');
        mark(corner, 'data-dsc-header-corner');
      }
      if (tabs) {
        mark(tabs, 'data-dsc-view-switch');
        // rc.2 的 tablist 本身是行；rc.3 的父行还拥有原生更多视图菜单。
        if (tabs.parentElement !== header && tabs.parentElement?.getAttribute('data-slot') !== 'conversation.session.header') mark(tabs.parentElement, 'data-dsc-header-view-row');
        const buttons = [...tabs.querySelectorAll('[role="tab"]')];
        const active = buttons.findIndex(button => button.getAttribute('aria-selected') === 'true');
        if (!properties.has(tabs)) properties.set(tabs, new Map(['--dsc-view-count', '--dsc-view-index', '--dsc-view-active'].map(name => [name, [tabs.style.getPropertyValue(name), tabs.style.getPropertyPriority(name)]])));
        for (const [name, value] of [['--dsc-view-count', Math.max(1, buttons.length)], ['--dsc-view-index', Math.max(0, active)], ['--dsc-view-active', active >= 0 ? 1 : 0]]) {
          if (tabs.style.getPropertyValue(name) !== String(value)) tabs.style.setProperty(name, value);
        }
      }
      for (const [element, saved] of attributes) if (!touched.has(element)) { restore(element, saved); attributes.delete(element); }
      for (const [element, saved] of properties) if (element !== tabs) {
        for (const [name, [value, priority]] of saved) { if (value) element.style.setProperty(name, value, priority); else element.style.removeProperty(name); }
        properties.delete(element);
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(header, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-selected'] });
    return () => {
      observer.disconnect();
      for (const [element, saved] of attributes) restore(element, saved);
      for (const [element, saved] of properties) for (const [name, [value, priority]] of saved) {
        if (value) element.style.setProperty(name, value, priority); else element.style.removeProperty(name);
      }
    };
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

function makeGearLauncher(ctx) {
  return function GearLauncher({ openSettings, settingsOpen }) {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [failed, setFailed] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const anchor = useRef(null);
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
    return createPortal(h('div', { className: 'dsc-ui dsc-gear-launcher' },
      h('button', { ref: anchor, type: 'button', className: 'dsc-gear-button', 'aria-label': '设置', 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) }, h(PrototypeIcon, { name: 'settings' })),
      open && h(Popover, { anchor, onClose: () => setOpen(false), label: '设置与账号', width: 228, className: 'dsc-app-menu' },
        h('button', { type: 'button', className: 'dsc-account-row', role: 'menuitem', onClick: showSettings, title: '在账号子页面中管理' }, profile?.avatarUrl && !avatarFailed ? h('img', { src: profile.avatarUrl, alt: '', onError: () => setAvatarFailed(true) }) : h('span', { className: 'dsc-account-avatar' }, h(Icon, { name: 'chat' })), h('span', null, h('strong', null, profile?.name || profile?.contact || '账号'), h('small', null, profile ? '账号与设置' : failed ? '打开账号设置' : '正在读取账号…'))),
        h('div', { className: 'dsc-menu-separator', role: 'separator' }),
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
function errorText(error) { return error?.message || String(error); }
function ErrorLine({ text }) { return text ? h('div', { className: 'dsc-error', role: 'alert' }, text) : null; }
// 用 aria-disabled 代替原生 disabled：避免全局 `.dsc-ui button:disabled { opacity: .45 }` 在提交瞬间造成变暗闪烁。
function Option({ title, detail, icon, selected, onClick, disabled, warning }) {
  return h('button', { type: 'button', className: 'dsc-option', role: 'menuitemradio', 'aria-checked': !!selected, 'aria-disabled': disabled ? 'true' : undefined, 'data-warning': !!warning, onClick: e => { if (disabled) return; onClick?.(e); } },
    icon && h(Icon, { name: icon }),
    h('span', { className: 'dsc-option-copy' }, h('span', null, title), detail && h('small', null, detail)),
    selected && h(Icon, { name: 'check' }));
}

// 所有浮层位于自己的 portal 根；只读取 anchor 与自己的 DOM，不查宿主私有选择器。
// placement: 'top' 为默认（锚点上方优先），'right' 用于行尾菜单（锚点右下方展开）。
function Popover({ anchor, point, onClose, label, width = 300, children, className = '', autoFocus = true, role = 'menu', placement = 'top' }) {
  const ref = useRef(null);
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
    const pointer = e => { if (!ref.current?.contains(e.target) && !anchor.current?.contains(e.target)) onClose(); };
    const key = e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(); anchor.current?.focus(); return; }
      if (!ref.current?.contains(e.target) || e.target.matches('input, [role="slider"]') || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const items = [...ref.current.querySelectorAll('button:not(:disabled)')];
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

function makeWorkspaceTree(ctx, completionStore) {
  return function WorkspaceTree({ query = '', tools = true, active = true, onNavigate }) {
    const catalog = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    const status = useSource(ctx.uiSession.sessionStatus);
    const completions = useSource(completionStore);
    const panel = useSource(ctx.layout.panelInfo);
    const [expanded, setExpanded] = useState({});
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
    const toggleArchive = s => run(() => archived.has(s.sessionId) ? ctx.uiWorkspace.unarchiveSession(s.sessionId) : ctx.uiWorkspace.archiveSession(s.sessionId));
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
            const open = expanded[w.workspaceId] ?? w.sessionIds.includes(currentId);
            return h('section', { key: w.workspaceId }, h('div', { className: 'dsc-project', onPointerEnter: e => enterHover(e.currentTarget, { kind: 'project', id: w.workspaceId, workspace: w, title: w.title || '未命名项目', count: children.length, path: w.path, pinned: w.pinned === true }), onPointerLeave: closeHover },
              h('button', { type: 'button', className: 'dsc-project-main', onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setExpanded({ ...expanded, [w.workspaceId]: !open }); }, 'aria-expanded': open }, h(Icon, { name: open ? 'folderOpen' : 'folder' }), h('span', null, w.title || '未命名项目')),
              h('button', { type: 'button', className: 'dsc-row-action', title: '项目菜单', 'aria-label': '项目菜单', 'aria-haspopup': 'menu', 'aria-expanded': projectMenu?.workspaceId === w.workspaceId, onClick: e => { projectAnchor.current = e.currentTarget; setHover(null); setProjectMenu(projectMenu?.workspaceId === w.workspaceId ? null : w); } }, '⋯'),
              h('button', { type: 'button', className: 'dsc-row-action', title: '在此项目新建对话', 'aria-label': '在此项目新建对话', onClick: () => { ctx.uiWorkspace.startSession(w.workspaceId); onNavigate?.(); } }, h(Icon, { name: 'pencil', size: 14 }))),
              h(ProjectFold, { open }, h('div', { className: 'dsc-project-children' }, children.length ? children.map(s => row(s, active && projectsOpen && open)) : h('small', { className: 'dsc-empty' }, '暂无对话'))));
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

function apply(ctx) {
  console.warn('[codex-style] apply 开始 v' + PLUGIN_VERSION);
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
    '--dsw-alias-bg-base': '#181818', '--dsw-alias-bg-layer-1': '#212121', '--dsw-alias-bg-layer-2': '#282828', '--dsw-alias-bg-layer-3': '#2d2d2d', '--dsw-alias-bg-overlay': '#282828',
    '--dsw-alias-bg-module-platform': '#212121', '--dsw-alias-label-primary': '#fff', '--dsw-alias-label-secondary': 'rgba(255,255,255,.7)', '--dsw-alias-label-tertiary': 'rgba(255,255,255,.5)',
    '--dsw-alias-label-caption': 'rgba(255,255,255,.5)', '--dsw-alias-label-dimmed': 'rgba(255,255,255,.32)', '--dsw-alias-label-primary-dimmed': 'rgba(255,255,255,.6)', '--dsw-alias-label-primary-bluish': '#eef3ff', '--dsw-alias-label-primary-inverted': '#131313',
    // 本版始终呈现深色；宿主 preference=system/light 时也要成对覆盖按钮背景与文字。
    '--dsw-alias-button-elevated-fill': 'var(--cx-active)', '--dsw-alias-button-floating-hover': 'rgba(255,255,255,.12)',
    '--dsw-alias-border-l1': 'rgba(255,255,255,.08)', '--dsw-alias-border-l2': 'rgba(255,255,255,.08)', '--dsw-alias-border-l3': 'rgba(255,255,255,.12)', '--dsw-alias-border-l4': 'rgba(255,255,255,.16)',
    '--dsw-alias-brand-primary': '#0285ff', '--dsw-alias-link': '#339cff', '--dsw-alias-interactive-bg-hover': 'rgba(255,255,255,.08)', '--dsw-alias-interactive-bg-hover-solid': '#282828',
    // 2026-10-23 按用户 Codex 截图采样：顶栏/窗口 chrome #202020、用户气泡 #222222（对话区保持 #181818）。
    '--dsw-specific-sidebar-fill': '#202020', '--dsw-specific-bubble': '#222222', '--dsw-specific-input-major': 'rgba(55,55,55,.94)', '--dsw-specific-menu': '#2d2d2d', '--dsw-specific-selector': 'transparent',
    // 设置页左栏与侧栏导航项：light 主题下宿主给浅色底，插件把文字固定为白色，会成白底白字；这里按宿主暗色主题成对补齐。
    '--dsw-specific-sidebar-nav-item-active': '#43454a', '--dsw-specific-sidebar-nav-item-hover': '#2c2c2e', '--dsw-specific-sidebar-nav-item-active-accent': '#353638',
    // markdown 代码外观：light 主题下 inline code / 代码块顶栏也是浅底，需一并转成与对话背景有区分的深色。
    '--dsw-alias-markdown-code-block': '#212121', '--dsw-alias-markdown-inline-code': '#292929', '--dsw-alias-markdown-code-block-banner': '#2c2c2e',
    '--dsw-alias-markdown-code-segment-selected': '#353638', '--dsw-alias-markdown-code-segment-unselected': '#1b1b1c',
    '--dsw-alias-state-business-primary': '#339cff', '--dsw-alias-state-business-tertiary': '#0285ff26', '--dsw-alias-state-error-primary': '#ff6764', '--dsw-alias-state-warn-primary': '#ff8549', '--dsw-alias-state-warn-secondary': '#ff8549bb', '--dsw-alias-state-warn-tertiary': '#ff854926',
    '--dsw-alias-scrollbar-bg-l1': '#ffffff26', '--dsw-alias-scrollbar-bg-l2': '#ffffff32', '--dsw-alias-scrollbar-hover-l2': '#ffffff59',
    '--dsw-radius-panel': '25px', '--dsw-menu-surface-fill': '#2d2d2d', '--dsw-elevation-soft': '0 0 0 .5px rgba(255,255,255,.16),0 3px 8px #0000000a'
  };
  ctx.effect(() => ctx.theme.overrideTokens(PLUGIN_ID, Object.fromEntries(Object.entries(tokenValues).map(([k, v]) => [k, { light: v, dark: v }]))), 'codex-style: theme');
  // 宿主偏好是 system 且系统为浅色时只会启用 light 色板；组件私有的 light/dark 分支（如变更卡的 --changes-fill）
  // 不在 token 覆盖范围内。注册并保持一个暗色主题，让 data-ds-dark-theme 生效，再用上面的 token 层覆盖 Codex 配色。
  const DARK_THEME_ID = 'dsh-codex-dark';
  ctx.effect(() => {
    let disposeTheme;
    try {
      disposeTheme = ctx.theme.register({ id: DARK_THEME_ID, colorScheme: 'dark', tokens: {} });
    } catch (error) {
      // 注册失败时退回纯 token 覆盖，不影响插件其余部分。
      console.warn('codex-style: 暗色主题注册失败', error);
      return () => {};
    }
    const previous = ctx.theme.getTheme()?.preference;
    const keep = snapshot => {
      if (snapshot?.preference === DARK_THEME_ID) return;
      try { ctx.theme.setTheme(DARK_THEME_ID); } catch (error) { console.warn('codex-style: 无法启用内置暗色主题', error); }
    };
    keep(ctx.theme.getTheme());
    const off = ctx.on('theme/change', keep);
    return () => {
      off();
      try { if (previous !== undefined && previous !== DARK_THEME_ID) ctx.theme.setTheme(previous); } catch (error) { console.warn('codex-style: 恢复原主题失败', error); }
      disposeTheme();
    };
  }, 'codex-style: dark theme');
  ctx.effect(() => {
    const previous = document.body.getAttribute('data-dsh-codex-style');
    document.body.setAttribute('data-dsh-codex-style', PLUGIN_VERSION);
    const style = document.createElement('style'); style.dataset.dshCodexStyle = PLUGIN_VERSION; style.textContent = CSS_TEXT; document.head.appendChild(style);
    const skillsStyle = document.createElement('style'); skillsStyle.dataset.dshCodexSkills = PLUGIN_VERSION; skillsStyle.textContent = SKILLS_CSS_TEXT; document.head.appendChild(skillsStyle);
    return () => { style.remove(); skillsStyle.remove(); if (previous === null) document.body.removeAttribute('data-dsh-codex-style'); else document.body.setAttribute('data-dsh-codex-style', previous); };
  }, 'codex-style: stylesheet');
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
  const updates = createPluginUpdateService(PLUGIN_VERSION);
  ctx.inject(['remote'], scope => scope.effect(() => mountPluginUpdateRemote(scope), 'codex-style: update remote methods'));
  ctx.inject(['remote', 'remote.codexStyleUpdates'], scope => scope.effect(() => updates.connect(scope.remote.codexStyleUpdates), 'codex-style: update download and install'));
  ctx.effect(() => { updates.start(); return () => updates.dispose(); }, 'codex-style: automatic update check');
  ctx.slots.inject('plugins.detail.actions', () => ctx.slots.register({ name: 'plugins.detail.actions', id: 'codex-style:check-update' }, props => h(PluginUpdateAction, { ...props, updates })));
  ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({ name: 'plugins.detail.section', id: 'codex-style:support' }, PluginSupportSection));
  ctx.inject(['pluginNavigation'], scope => scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:update-notice' }, () => h(PluginUpdateNotice, { updates, onOpen: () => scope.reflect.get('pluginNavigation').openBundle(PLUGIN_PACKAGE) }))));
  // 等各区域自己的服务就绪；权限 RPC 的命名空间不能由 remote 根服务存在来推断。
  ctx.inject(['sessions', 'uiSession', 'workspaces', 'uiWorkspace', 'layout', 'shortcuts', 'remote', 'locale', 'pluginNavigation'], scope => {
    const sidebar = createSidebarPresentation();
    scope.effect(() => () => sidebar.dispose(), 'codex-style: sidebar presentation');
    register(scope, 'sidebar.workspaces', makeSidebarChrome(scope, sidebar));
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

// 客户端与 Host 共用的包身份、更新源和版本规则；无网络或存储副作用。
const UPDATE_PACKAGE = '@xinxing1708/dsh-codex-style';
const UPDATE_REGISTRIES = [
  { id: 'npmmirror', label: 'npmmirror 中国镜像', url: 'https://registry.npmmirror.com/' },
  { id: 'npm', label: 'npm 官方源', url: 'https://registry.npmjs.org/' },
  { id: 'tencent', label: '腾讯云 npm 镜像', url: 'https://mirrors.cloud.tencent.com/npm/' }
];

function updateVersionParts(value) {
  if (typeof value !== 'string') return null;
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.exec(value);
  if (!match) return null;
  const pre = match[4]?.split('.');
  if (pre?.some(part => /^\d+$/.test(part) && part.length > 1 && part[0] === '0')) return null;
  return { core: match.slice(1, 4).map(BigInt), pre };
}
function compareUpdateVersions(left, right) {
  const a = updateVersionParts(left), b = updateVersionParts(right);
  if (!a || !b) return null;
  for (let i = 0; i < 3; i++) if (a.core[i] !== b.core[i]) return a.core[i] > b.core[i] ? 1 : -1;
  if (!a.pre || !b.pre) return a.pre ? -1 : b.pre ? 1 : 0;
  for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i++) {
    const x = a.pre[i], y = b.pre[i];
    if (x === y) continue;
    if (x === undefined || y === undefined) return x === undefined ? -1 : 1;
    const xn = /^\d+$/.test(x), yn = /^\d+$/.test(y);
    if (xn && yn) return BigInt(x) > BigInt(y) ? 1 : -1;
    if (xn !== yn) return xn ? -1 : 1;
    return x > y ? 1 : -1;
  }
  return 0;
}


// 固定 scoped 身份；版本查询后由宿主下载，只有用户点击「立即安装」才切换安装。
// 客户端命名空间需要显式挂载；仅声明 Host Remote 不会自动生成浏览器方法。
function mountPluginUpdateRemote(ctx) {
  const { z } = require('zod');
  const version = z.string().min(1);
  const snapshot = z.object({ phase: z.enum(['idle', 'downloading', 'ready', 'installing', 'installed', 'error']), version: z.string().optional(), downloaded: z.number(), total: z.number().nullable() }).passthrough();
  const checkResult = z.object({ state: z.enum(['current', 'update', 'ahead', 'error', 'unpublished']), latestVersion: z.string().optional() }).passthrough();
  return ctx.remote.$mount({ package: UPDATE_PACKAGE + '/updates', descriptors: ['status', 'check', 'download', 'installUpdate'].map(method => ({
    id: UPDATE_PACKAGE + '#codexStyleUpdates/' + method,
    service: 'codexStyleUpdates', namespace: 'codexStyleUpdates', method, invocation: { kind: 'direct' },
    parameters: ['status', 'check'].includes(method) ? [] : [{ name: 'version', wire: 'version', source: 'json', codec: { mode: 'strict', typeSymbol: UPDATE_PACKAGE + '#update-version', create: () => version, jsonSchema: { type: 'string', minLength: 1 } } }],
    result: { mode: 'strict', typeSymbol: UPDATE_PACKAGE + (method === 'check' ? '#update-check' : '#update-state'), create: () => method === 'check' ? checkResult : snapshot }
  })) });
}

const UPDATE_CACHE_KEY = 'dsh-codex-style:update-check:v1';
const UPDATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const UPDATE_RETRY_MS = 60 * 60 * 1000;
function createPluginUpdateService(currentVersion, { query } = {}) {
  let lastSuccess = 0, retryAt = 0, timer, pending, controller, started = false, disposed = false;
  let host, transferTimer, transferRequest, hostGeneration = 0;
  let cached = {};
  try { cached = JSON.parse(window.localStorage.getItem(UPDATE_CACHE_KEY) || '{}') || {}; } catch { /* 存储不可用时仍可在本次运行检查。 */ }
  const validCache = cached.currentVersion === currentVersion && Number.isFinite(cached.checkedAt) && cached.checkedAt > 0 && cached.checkedAt <= Date.now() && updateVersionParts(cached.latestVersion);
  if (validCache) lastSuccess = cached.checkedAt;
  const comparison = validCache ? compareUpdateVersions(cached.latestVersion, currentVersion) : null;
  const store = createSnapshotStore({
    state: validCache ? comparison > 0 ? 'update' : comparison < 0 ? 'ahead' : 'current' : 'idle',
    checking: false,
    transfer: { phase: 'idle' },
    ...(validCache ? { latestVersion: cached.latestVersion, source: UPDATE_REGISTRIES.find(row => row.label === cached.source)?.label, mirror: cached.mirror === true } : {}),
    dismissedVersion: updateVersionParts(cached.dismissedVersion) ? cached.dismissedVersion : undefined
  });
  const save = () => {
    const state = store.getSnapshot();
    try { window.localStorage.setItem(UPDATE_CACHE_KEY, JSON.stringify({ currentVersion, checkedAt: lastSuccess, latestVersion: state.latestVersion, source: state.source, mirror: state.mirror, dismissedVersion: state.dismissedVersion })); } catch { /* 不阻断检查或提醒。 */ }
  };
  const schedule = delay => {
    clearTimeout(timer);
    if (started && !disposed) timer = setTimeout(runScheduled, Math.max(0, delay));
  };
  const dueIn = () => Math.max(lastSuccess ? lastSuccess + UPDATE_INTERVAL_MS : 0, retryAt) - Date.now();
  const transferError = error => { if (!disposed) store.set({ ...store.getSnapshot(), transfer: { ...store.getSnapshot().transfer, phase: 'error', message: error.message || '更新服务暂时不可用，请重试。' } }); };
  function acceptTransfer(transfer) {
    if (disposed || !transfer || compareUpdateVersions(transfer.version, currentVersion) !== 1) return;
    const state = store.getSnapshot();
    const newer = compareUpdateVersions(transfer.version, state.latestVersion) === 1 || !state.latestVersion;
    store.set({ ...state, ...(newer ? { latestVersion: transfer.version, state: 'update' } : {}), transfer });
    clearTimeout(transferTimer);
    if (['downloading', 'installing'].includes(transfer.phase)) transferTimer = setTimeout(() => refreshTransfer().catch(transferError), 400);
    else if (transfer.phase === 'ready' && compareUpdateVersions(state.latestVersion, transfer.version) === 1) transferTimer = setTimeout(download, 0);
  }
  async function callHost(method, ...args) {
    if (!host) throw new Error('更新服务尚未连接，请稍后重试。');
    const answer = await host[method](...args);
    if (!answer.ok) throw new Error(answer.error?.message || '更新服务调用失败。');
    return answer.value;
  }
  async function refreshTransfer() {
    const generation = hostGeneration;
    const transfer = await callHost('status');
    if (generation !== hostGeneration || disposed) return;
    if (transfer?.phase === 'idle') store.set({ ...store.getSnapshot(), transfer: { phase: 'idle' } });
    else acceptTransfer(transfer);
  }
  function download() {
    if (transferRequest) return transferRequest;
    const state = store.getSnapshot();
    if (state.state !== 'update' || ['downloading', 'installing', 'installed'].includes(state.transfer.phase)) return Promise.resolve();
    const generation = hostGeneration;
    store.set({ ...state, transfer: { phase: 'downloading', version: state.latestVersion, downloaded: 0, total: null } });
    transferRequest = callHost('download', state.latestVersion).then(transfer => { if (generation === hostGeneration) acceptTransfer(transfer); }).catch(error => { if (generation === hostGeneration) transferError(error); }).finally(() => { transferRequest = null; });
    return transferRequest;
  }
  async function install() {
    const state = store.getSnapshot();
    if (state.transfer.phase !== 'ready' || state.transfer.version !== state.latestVersion) return;
    const generation = hostGeneration;
    store.set({ ...state, transfer: { ...state.transfer, phase: 'installing', message: undefined } });
    try {
      const transfer = await callHost('installUpdate', state.latestVersion);
      if (generation === hostGeneration) acceptTransfer(transfer);
    } catch (error) {
      if (!disposed && generation === hostGeneration) store.set({ ...store.getSnapshot(), transfer: { ...state.transfer, phase: 'installing', message: '安装结果暂未收到，正在重新查询。' } });
      // 安装回复可能随宿主重载丢失；先查询结果，不能再次执行安装。
      await refreshTransfer().catch(transferError);
    }
  }
  async function runScheduled() {
    if (disposed) return;
    if (!host && !query) return; // 连接就绪时重新安排，不把启动期间的未连接当查询失败。
    if (dueIn() > 0) { schedule(dueIn()); return; }
    if (window.navigator.onLine === false) { retryAt = Date.now() + UPDATE_RETRY_MS; schedule(dueIn()); return; }
    await check();
  }
  function check() {
    if (disposed) return Promise.reject(new Error('更新检查已停用'));
    if (pending) return pending;
    controller = new AbortController();
    const signal = controller.signal;
    store.set({ ...store.getSnapshot(), checking: true });
    pending = Promise.resolve().then(() => query ? query(currentVersion, { signal }) : callHost('check')).then(async result => {
      if (disposed || signal.aborted) return result;
      store.set({ ...store.getSnapshot(), message: undefined, ...result, checking: false });
      if (['current', 'update', 'ahead'].includes(result.state)) { lastSuccess = Date.now(); retryAt = 0; save(); }
      else retryAt = Date.now() + UPDATE_RETRY_MS;
      if (result.state === 'update' && host) await download();
      return result;
    }).catch(error => {
      if (!disposed && !signal.aborted) {
        store.set({ ...store.getSnapshot(), state: 'error', checking: false, message: '检查失败，请稍后重试。' });
        retryAt = Date.now() + UPDATE_RETRY_MS;
      }
      return { state: 'error' };
    }).finally(() => { pending = null; controller = null; if (!disposed) schedule(dueIn()); });
    return pending;
  }
  const onOnline = () => { retryAt = 0; schedule(dueIn()); };
  const onVisible = () => { if (document.visibilityState === 'visible') schedule(dueIn()); };
  return {
    store, check, download, install,
    connect(remote) {
      host = remote; hostGeneration++;
      if (started) schedule(Math.max(8000, dueIn()));
      refreshTransfer().then(() => {
        const state = store.getSnapshot();
        if (state.state === 'update' && !(state.transfer.version === state.latestVersion && ['ready', 'downloading', 'installing', 'installed'].includes(state.transfer.phase))) return download();
      }).catch(transferError);
      return () => { host = undefined; hostGeneration++; clearTimeout(transferTimer); };
    },
    dismiss() { store.set({ ...store.getSnapshot(), dismissedVersion: store.getSnapshot().latestVersion }); save(); },
    start() {
      if (started || disposed) return;
      started = true;
      window.addEventListener('online', onOnline);
      document.addEventListener('visibilitychange', onVisible);
      schedule(Math.max(8000, dueIn()));
    },
    dispose() {
      disposed = true; started = false;
      clearTimeout(timer); controller?.abort();
      clearTimeout(transferTimer); host = undefined; hostGeneration++;
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    }
  };
}

// DSH 本体更新沿用 Electron preload 的 dshDesktop.updates（与原生设置行指示器同一入口）；
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

function PluginUpdateNotice({ updates, onOpen }) {
  const state = useSource(updates.store);
  if (compareUpdateVersions(state.latestVersion, PLUGIN_VERSION) !== 1 || state.dismissedVersion === state.latestVersion) return null;
  return h('aside', { className: 'dsc-ui dsc-update-notice', role: 'status', 'aria-live': 'polite', 'aria-label': 'Codex Style 更新提醒' },
    h('div', { className: 'dsc-update-heading' }, h('strong', null, state.transfer.phase === 'installed' ? 'Codex Style 更新已安装' : 'Codex Style 有新版本'), h('button', { type: 'button', className: 'dsc-update-close', 'aria-label': '忽略此版本提醒', onClick: () => updates.dismiss() }, h(Icon, { name: 'close' }))),
    h('p', { className: 'dsc-update-note' }, 'v' + PLUGIN_VERSION + ' → v' + state.latestVersion, state.transfer.phase === 'ready' && ' · 已下载', state.transfer.phase === 'installed' && ' · 重启 DSH 后生效'),
    h('button', { type: 'button', className: 'dsc-update-retry', onClick: onOpen }, '查看更新'));
}

function PluginUpdateAction({ subject, updates }) {
  const pkg = subject?.pkg;
  if (subject?.kind !== 'bundle' || !pkg?.installed) return null;
  const legacy = PLUGIN_PACKAGE === PLUGIN_ID && pkg.name === PLUGIN_ID && pkg.rows?.some(row => row.rowId === 'ui-skin-codex-style' && row.moduleName === PLUGIN_ID);
  if (pkg.name !== UPDATE_PACKAGE && !legacy) return null;
  return h(PluginUpdateControl, { key: pkg.name + '@' + pkg.version, currentVersion: pkg.version, updates });
}
function PluginUpdateControl({ currentVersion, updates }) {
  const anchor = useRef(null);
  const service = useMemo(() => updates || createPluginUpdateService(currentVersion), [updates, currentVersion]);
  const [open, setOpen] = useState(false);
  const result = useSource(service.store);
  const transfer = result.transfer;
  const downloading = transfer.phase === 'downloading', installing = transfer.phase === 'installing', installed = transfer.phase === 'installed';
  const ready = transfer.phase === 'ready' && transfer.version === result.latestVersion;
  const busy = result.checking || downloading || installing;
  const percent = transfer.total ? Math.min(100, Math.floor(transfer.downloaded / transfer.total * 100)) : null;
  useEffect(() => () => { if (!updates) service.dispose(); }, [service, updates]);
  const close = useCallback(() => { setOpen(false); }, []);
  const check = async () => {
    setOpen(true);
    if (ready) await service.install();
    else if (transfer.phase === 'error' && result.state === 'update') await service.download();
    else await service.check();
  };
  const visibleState = downloading ? 'downloading' : installing ? 'installing' : installed ? 'installed' : ready ? 'ready' : result.checking ? 'checking' : result.state;
  const messages = { checking: '正在检查更新…', current: '已是最新版本', ahead: '当前版本较新', update: '发现新版本', unpublished: '暂未查到发布版本', error: '检查失败', downloading: '正在下载更新…', ready: '下载完成，可以立即安装', installing: '正在安装更新…', installed: '安装完成，重新启动 DSH 后生效' };
  const buttonText = installing ? '安装中…' : installed ? '已安装' : ready ? '立即安装' : result.checking ? '检查中…' : transfer.phase === 'error' && result.state === 'update' ? '重试下载' : '检查更新';
  return h('span', { className: 'dsc-update-control', 'data-update-state': visibleState },
    downloading && h('span', { className: 'dsc-update-download' },
      h('span', { className: 'dsc-update-progress', role: 'progressbar', 'aria-label': '插件更新下载进度', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': percent ?? undefined, 'data-indeterminate': percent === null }, h('span', { className: 'dsc-update-progress-fill', style: percent === null ? undefined : { transform: 'scaleX(' + percent / 100 + ')' } })),
      h('span', { className: 'dsc-update-progress-label' }, percent === null ? Math.floor((transfer.downloaded || 0) / 1024) + ' KB' : percent + '%')),
    h(Button, { variant: 'outline', size: 'sm', ref: anchor, disabled: busy || installed, icon: ready || installed ? h(Icon, { name: 'check', size: 13 }) : h(IconRefreshOutlineRegular, { size: 13, className: busy ? 'dsc-update-spin' : undefined }), onClick: check, 'aria-haspopup': 'dialog', 'aria-expanded': open }, buttonText),
    open && h(Popover, { anchor, onClose: close, label: '检查插件更新', role: 'dialog', width: 336, className: 'dsc-update-panel' },
      h('div', { className: 'dsc-update-heading' }, h('strong', null, '插件更新'), h('button', { type: 'button', className: 'dsc-update-close', onClick: close, 'aria-label': '关闭更新检查' }, h(Icon, { name: 'close' }))),
      h('p', { className: 'dsc-update-message', role: 'status', 'aria-live': 'polite', 'data-state': visibleState }, messages[visibleState]),
      h('dl', { className: 'dsc-update-versions' }, h('dt', null, '当前版本'), h('dd', null, currentVersion ? 'v' + currentVersion : '未知'), result.latestVersion && h(React.Fragment, null, h('dt', null, busy || ['error', 'unpublished'].includes(result.state) ? '上次查到' : '最新版本'), h('dd', null, 'v' + result.latestVersion))),
      result.source && h('p', { className: 'dsc-update-note' }, '来源：' + result.source, result.mirror && h('span', null, '镜像同步可能稍有延迟。')),
      result.message && h('p', { className: 'dsc-update-note' }, result.message),
      transfer.message && h('p', { className: 'dsc-update-note', role: transfer.phase === 'error' ? 'alert' : undefined }, transfer.message),
      ready && h('p', { className: 'dsc-update-note' }, '点击「立即安装」升级插件，安装完成后重启 DSH 生效。'),
      !busy && !installed && h('button', { type: 'button', className: 'dsc-update-retry', onClick: check }, ready ? '立即安装' : transfer.phase === 'error' && result.state === 'update' ? '重试下载' : '重新检查')));
}

// 可选正文呈现：只使用公开组件清单、Slot 与 data-* 锚点。
// 子路径宿主组件没有独立客户端包，主界面按它的实际 Cordis 启停装卸本效果。
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
    h('div', { className: 'dsc-body-turn__divider', 'aria-hidden': true }));
}

function mountCodexBody(ctx) {
  ctx.effect(() => {
    document.body.setAttribute('data-dsc-codex-body', '');
    const style = document.createElement('style');
    style.dataset.dscCodexBody = '';
    style.textContent = BODY_CSS_TEXT;
    document.head.appendChild(style);
    return () => { style.remove(); document.body.removeAttribute('data-dsc-codex-body'); };
  }, 'codex-style: optional body stylesheet');
  ctx.slots.inject('conversation.chat.node', () => {
    const priorities = ctx.slots.entries('conversation.chat.node').filter(entry => entry.options.key === 'turn-process').map(entry => entry.options.priority ?? 0);
    return ctx.slots.register({ name: 'conversation.chat.node', key: 'turn-process', priority: Math.min(0, ...priorities) - 1 }, CodexTurnProcess);
  });
}

// 三个独立子组件共用一次组件清单查询，各自装卸，互不改变对方状态。
function watchCodexPresentation(ctx) {
  let disposed = false;
  let revision = 0;
  const effects = [
    { path: '/body', name: 'codex-style-body-presentation', apply: mountCodexBody, inject: ['slots'] },
    { path: '/header', name: 'codex-style-header-presentation', apply: mountCodexHeader },
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

// 顶部重绘只随独立子组件启停；原生会话、视图与按钮动作继续由宿主持有。
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
  }, 'codex-style: optional header stylesheet');
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

// Windows 应用菜单在 preload 创建的 [data-windows-menu] Shadow host 内；
// 只移动 host，菜单内部和弹出坐标仍由宿主持有。其它宿主再尝试 role=menubar / 标题栏行。
// 原生固定侧栏按钮按位置区分：左侧 28px 的切换键由自绘按钮替代（隐藏），新会话按钮右移。
// 只给最小宿主节点加自有 data-* 并还原；不改 DOM、不读 hashed class。
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
    const menubar = document.querySelector('[data-windows-menu]') || document.querySelector('[role="menubar"]');
    const row = menubar ? null : document.querySelector('[data-slot="sidebar"] [data-window-drag]');
    const shifted = menubar || row;
    const sidebar = document.querySelector('[data-slot="sidebar"]');
    const buttons = sidebar && typeof sidebar.querySelectorAll === 'function' ? [...sidebar.querySelectorAll('button')] : [];
    const classified = [];
    for (const button of buttons) {
      const style = typeof getComputedStyle === 'function' ? getComputedStyle(button) : null;
      if (!style || style.position !== 'fixed') continue;
      const box = button.getBoundingClientRect ? button.getBoundingClientRect() : { top: 0, left: 0 };
      if (box.top >= 48) continue;
      // 左侧窄按钮由自绘切换键替代；其余固定按钮右移。
      // 已随被标记祖先移动的按钮不再单独标记，避免同一行与其子按钮双移。
      if (box.left < 40) classified.push([button, 'data-dsc-navigation-native-toggle']);
      else if (!shifted || typeof shifted.contains !== 'function' || !shifted.contains(button)) classified.push([button, 'data-dsc-navigation-native-shift']);
    }
    if (menubar) pending.push([menubar, 'data-dsc-navigation-menubar']);
    else if (row) pending.push([row, 'data-dsc-navigation-titlebar-row']);
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
