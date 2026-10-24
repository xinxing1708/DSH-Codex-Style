window.__ModuleLoader__.load({
  id: "@xinxing1708/dsh-codex-style",
  factory: function(require) {
    'use strict';
    const CSS_TEXT = "/* 自研界面令牌；尺寸与色值参考界面测量。来源说明见 THIRD_PARTY_NOTICES.md。 */\n\nbody[data-dsh-codex-style] {\n  /* ---- 间距 ---- */\n  --cx-spacing: 4px;\n  --cx-space-1: 4px;\n  --cx-space-2: 8px;\n  --cx-space-3: 12px;\n  --cx-space-4: 16px;\n  --cx-space-5: 20px;\n  --cx-space-6: 24px;\n  --cx-space-8: 32px;\n\n  /* ---- 圆角阶梯 ---- */\n  --cx-radius-2xs: 2px;\n  --cx-radius-xs: 4px;\n  --cx-radius-sm: 6px;\n  --cx-radius-md: 8px;\n  --cx-radius-lg: 10px;\n  --cx-radius-xl: 12px;\n  --cx-radius-2xl: 16px;\n  --cx-radius-3xl: 20px;\n  --cx-radius-4xl: 24px;\n  --cx-radius-composer: 25px;\n  --cx-radius-full: 9999px;\n\n  /* ---- 暗色面（深色界面：导航/顶栏 #202020、侧栏 #1b1b1b、对话区 #181818） ---- */\n  --cx-window: #202020;\n  --cx-sidebar: #1b1b1b;\n  --cx-surface: #181818;\n  --cx-thread: #171717;\n  --cx-nested: #212121;\n  --cx-elevated: #282828;\n  --cx-summary: #2d2d2d;\n  --cx-hover: rgba(255, 255, 255, 0.045);\n  --cx-active: rgba(255, 255, 255, 0.08);\n\n  /* ---- 边框 ---- */\n  --cx-border-l1: rgba(255, 255, 255, 0.08);\n  --cx-border-l2: rgba(255, 255, 255, 0.04);\n  --cx-border-l3: rgba(255, 255, 255, 0.16);\n  --cx-border-strong: rgba(255, 255, 255, 0.16);\n\n  /* ---- 文本 ---- */\n  --cx-text: #ffffff;\n  --cx-text-2: rgba(255, 255, 255, 0.7);\n  --cx-text-3: rgba(255, 255, 255, 0.5);\n  --cx-text-4: rgba(255, 255, 255, 0.32);\n  --cx-text-inverse: #0d0d0d;\n\n  /* ---- 强调 / 状态 ---- */\n  --cx-accent: #0285ff;\n  --cx-accent-soft: #339cff;\n  --cx-focus: #339cff;\n  --cx-success: #40c977;\n  --cx-danger: #ff6764;\n  --cx-warning: #ff8549;\n  --cx-attention: #3a83f7;\n\n  /* ---- diff ---- */\n  --cx-diff-add-bg: rgba(64, 201, 119, 0.23);\n  --cx-diff-del-bg: rgba(255, 103, 100, 0.23);\n  --cx-diff-add-mark: #40c977;\n  --cx-diff-del-mark: #ff6764;\n\n  /* ---- 字体 ---- */\n  --cx-font-sans: -apple-system, system-ui, \"Segoe UI\", sans-serif;\n  --cx-font-mono: ui-monospace, \"SFMono-Regular\", \"SF Mono\", Menlo, Consolas, \"Liberation Mono\", monospace;\n\n  /* ---- 字号 / 行高 ---- */\n  --cx-text-xs: 12px;\n  --cx-text-sm: 14px;\n  --cx-text-md: 16px;\n  --cx-text-lg: 18px;\n  --cx-leading-xs: 16px;\n  --cx-leading-sm: 22px;\n  --cx-leading-md: 24px;\n  --cx-leading-lg: 28px;\n\n  /* ---- 字重 ---- */\n  --cx-weight-regular: 400;\n  --cx-weight-medium: 500;\n  --cx-weight-semibold: 600;\n  --cx-weight-bold: 700;\n  --cx-weight-shell: 445; /* 外壳专用非标准字重 */\n\n  /* ---- 动效 ---- */\n  --cx-dur-fast: 120ms;\n  --cx-dur: 150ms;\n  --cx-dur-relaxed: 300ms;\n  --cx-ease: ease;\n  --cx-ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);\n  --cx-ease-scroll: cubic-bezier(0.22, 1, 0.36, 1);\n\n  /* ---- 布局几何 ----\n     以真实 Codex 窗口截图（1988×1292 @1.5x）实测回填：\n     侧栏 288、标题栏 44、输入栈 710，详见 02-开发日志 第 10 轮。 */\n  --cx-titlebar-h: 44px;\n  --cx-rail-w: 52px;\n  --cx-sidebar-w: 288px;\n  --cx-thread-max: 768px;\n  --cx-right-w: 667px;\n  --cx-header-h: 48px;\n  --cx-row-h: 30px;\n  --cx-control-h: 28px;\n  --cx-send-h: 32px;\n  --cx-composer-stack-w: 742px; /* 含左右 16px 内边距 → 内容 710 */\n  --cx-composer-h: 97px;\n  --cx-picker-h: 37px;\n\n  /* ---- 输入区实测色（真实截图取色） ---- */\n  --cx-picker-fill: #282828;\n  --cx-composer-fill: rgba(55, 55, 55, 0.94);\n\n  /* ---- 应用视口 ----\n     真实 DSH 窗口截图 1988×1292（Windows 150% 缩放）换算为 1325×861 CSS。\n     原型按此尺寸渲染，各栏占比才与真实界面一致（旧 1600 视口下主区偏宽）。 */\n  --cx-app-w: 1325px;\n  --cx-app-h: 861px;\n\n  /* ---- 推理强度选择器 ----\n     尺寸/颜色按用户真实 Codex 录屏帧实测（1992×1296 @1.503x）。 */\n  --cx-reasoning-w: 255px;\n  --cx-reasoning-snap-dur: 140ms; /* 第 20 轮节点切换过渡，待用户验收 */\n  --cx-reasoning-fx-dur: 180ms;\n  --cx-reasoning-text-dur: 220ms;\n  /* 第 23 轮按用户新设计口径增强流速，两个亮带错速运行。 */\n  --cx-reasoning-flow-dur: 2.8s;\n  --cx-reasoning-bloom-dur: 4.2s;\n  --cx-reasoning-blue: #4c9bfe;\n  --cx-reasoning-track: #3e3e3e;\n  /* 第 22 轮：新录屏 100/660/900/1120 帧取色，深底与两种柔亮色分层。 */\n  --cx-reasoning-violet: #5134ad;\n  --cx-reasoning-purple: #844fcc;\n  --cx-reasoning-max-blue: #3a4ebd;\n  --cx-reasoning-max-glow: #bd8dff;\n  --cx-reasoning-max-ice: #adaaff;\n  --cx-reasoning-max-text: #b98cff;\n  --cx-reasoning-title: #4c9bfe;\n  /* 浮层/菜单底色：真实录屏帧取色 rgb(45,45,45) */\n  --cx-popover-fill: #2d2d2d;\n\n  /* ---- 阴影 ---- */\n  --cx-shadow-sm: 0 1px 2px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-md: 0 2px 4px -1px rgb(0 0 0 / 0.08);\n  --cx-shadow-lg: 0 4px 8px -2px rgb(0 0 0 / 0.1);\n  --cx-shadow-xl: 0 8px 16px -4px rgb(0 0 0 / 0.12);\n  --cx-shadow-2xl: 0 16px 32px -8px rgb(0 0 0 / 0.19);\n  --cx-composer-shadow:\n    0 0 0 0.5px var(--cx-border-strong),\n    0 3px 7.5px rgb(0 0 0 / 0.04),\n    0 0 20px rgb(0 0 0 / 0.05);\n\n  /* ---- z 轴 ---- */\n  --cx-z-ground: 0;\n  --cx-z-panel: 10;\n  --cx-z-floating: 20;\n  --cx-z-drawer: 40;\n  --cx-z-popover: 50;\n  --cx-z-overlay: 70;\n}\n\n/* ============ 导航栏 ============ */\n.dsc-rail {\n  grid-area: rail;\n  position: relative;\n  z-index: 30;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 0;\n  background: var(--cx-window);\n  border-right: 1px solid var(--cx-border-l2);\n}\n.dsc-rail__spacer { flex: 1; }\n.dsc-rail__item {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--cx-radius-md);\n  color: var(--cx-text-3);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease), color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-rail__item--active { background: var(--cx-active); color: var(--cx-text); }\n/* 插头先以不透明白色统一描边，再整体降低透明度，避免相交线段叠色发亮。 */\n.dsc-rail__plugin-icon { color: #fff; opacity: .5; stroke-width: 1.5; transition: opacity var(--cx-dur-fast) var(--cx-ease); }\n.dsc-rail__item:hover .dsc-rail__plugin-icon,\n.dsc-rail__item--active .dsc-rail__plugin-icon { opacity: 1; }\n.dsc-rail__item::after {\n  content: attr(data-tip);\n  position: absolute;\n  left: 44px;\n  top: 50%;\n  z-index: var(--cx-z-popover);\n  padding: 4px 8px;\n  border-radius: var(--cx-radius-sm);\n  border: 1px solid var(--cx-border-l1);\n  background: #2b2b2b;\n  color: var(--cx-text);\n  font-size: 12px;\n  line-height: 16px;\n  white-space: nowrap;\n  box-shadow: var(--cx-shadow-lg);\n  opacity: 0;\n  transform: translateY(-50%) translateX(-2px);\n  pointer-events: none;\n  transition: opacity var(--cx-dur-fast) var(--cx-ease), transform var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-rail__item:hover::after { opacity: 1; transform: translateY(-50%) translateX(0); }\n\n/* ============ 侧栏 ============ */\n.dsc-sidebar {\n  grid-area: sidebar;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 8px;\n  background: var(--cx-sidebar);\n  border-right: 1px solid var(--cx-border-l2);\n  overflow: hidden;\n}\n.dsc-sidebar__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 44px;\n  margin: -8px -8px 6px;\n  padding: 0 6px 0 10px;\n}\n.dsc-brand { display: flex; align-items: center; gap: 7px; }\n.dsc-brand__mark { display: block; height: 19px; width: auto; }\n.dsc-brand__wordmark {\n  font-size: 17px;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--cx-text);\n  line-height: 1;\n}\n.dsc-brand__badge {\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  line-height: 1;\n  padding: 3px 5px 2px;\n  border-radius: 3px;\n  background: var(--cx-text);\n  color: var(--cx-window);\n}\n.dsc-sidebar__header-actions { display: flex; align-items: center; gap: 2px; }\n.dsc-new-chat {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 32px;\n  padding: 0 8px;\n  border-radius: var(--cx-radius-md);\n  font-size: 13px;\n  font-weight: var(--cx-weight-medium);\n  color: var(--cx-text);\n  background: var(--cx-active);\n  transition: background-color var(--cx-dur-fast) var(--cx-ease);\n}\n.dsc-new-chat:hover { background: rgba(255, 255, 255, 0.12); }\n.dsc-new-chat kbd { margin-left: auto; font-size: 11px; color: var(--cx-text-4); }\n\n/* 自有组件与公开 slot/region 锚点；外壳几何适配通过自有 data-dsc-* 标记集中处理。 */\nbody[data-dsh-codex-style] { background: var(--cx-window); color-scheme: dark; --shiki-token-constant: #4dabf7; --shiki-token-string: #69db7c; --shiki-token-comment: #adb5bd; --shiki-token-keyword: #faa2c1; --shiki-token-function: #b197fc; }\n/* 整个三列外壳实际缩窄 52px，让宿主 ResizeObserver、右栏与拖拽使用同一可用宽度。\n   不能用 padding-left 代替：宿主测量的是 getBoundingClientRect().width。 */\nbody[data-dsh-codex-chrome] [data-dsc-frame] { margin-left: var(--cx-rail-w); width: calc(100% - var(--cx-rail-w)); }\n/* 全屏右栏原本按 100vw 展开；扣掉独立导航后，继续尊重宿主二级侧栏的真实宽度。 */\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame] [data-sidebar-right-panel=\"fullscreen\"] { max-width: max(0px, calc(100vw - var(--cx-rail-w) - var(--dsh-windows-sidebar-width, 0px))); }\n/* data-slot 是 renderer 声明的可寻址面；这里只传递变量，不选择/搬移宿主内部节点。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] { --dsw-specific-input-major: var(--cx-composer-fill); --dsw-radius-panel: var(--cx-radius-composer); --dsw-alias-border-l2: var(--cx-border-strong); --dsw-elevation-soft: var(--cx-composer-shadow); --dsh-composer-card-max-width: 710px; }\n/* DSH 0.2.1-rc.2 中英文发送标签；只覆盖发送色，保留停止按钮与宿主提交状态。 */\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]) { --dsw-alias-button-info-fill: #dfdfdf; --dsw-alias-button-info-hover: #dfdfdf; color: #363636; opacity: 1; }\nbody[data-dsh-codex-style] [data-slot=\"conversation.composer.bar\"] [data-composer-card] button:is([aria-label=\"发送消息\"], [aria-label=\"排队发送\"], [aria-label=\"插话发送\"], [aria-label=\"Send message\"], [aria-label=\"Queue message\"], [aria-label=\"Steer message\"]):disabled { --dsw-alias-button-info-fill: #8b8b8b; }\n/* 正文字体颜色：按 Codex 截图采样 #dfdfdf（原 #ffffff 偏亮）。仅覆盖对话内容区，不影响按钮、菜单等其它主文本。 */\nbody[data-dsh-codex-style] [data-conversation-content] { --dsw-alias-label-primary: #dfdfdf; }\n/* 原 sidebar/settings 父级继续挂载以保留原生页面与子槽位所有权；只隐藏其旧外观。 */\nbody[data-dsh-codex-chrome] [data-slot=\"sidebar\"] { display: block !important; position: relative; width: 100%; height: 100%; visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-slot=\"conversation.composer.bar\"] { --dsh-composer-side-clearance: 0px; display: flex !important; flex-direction: column; align-items: stretch; align-self: center; width: min(calc(100% - 32px),710px); max-width: 710px; position: relative; }\n/* 空态保留官方编辑器、草稿、附件、“+”与 chain；没有重建输入状态或移动节点。 */\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] { visibility: hidden; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-region=\"composer\"] { position: absolute; inset: auto 0 0; z-index: 7; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.composer.bar\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-slot=\"conversation.input.dock\"],\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"] [data-conversation-composer-overlay] { visibility: visible; }\nbody[data-dsh-codex-chrome] [data-conversation-content][data-content-phase=\"hero\"][data-dsc-hero-layout] [data-slot=\"conversation.hero.agentPreset\"] { visibility: visible; display: inline-flex !important; position: fixed; top: calc(var(--dsc-hero-card-top) - 33px); right: calc(100vw - var(--dsc-hero-card-right) + 18px); z-index: 8; height: 28px; max-width: 180px; }\n.dsc-ui { font: 14px/22px var(--cx-font-sans); color: var(--cx-text); box-sizing: border-box; }\n.dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { box-sizing: border-box; }\n.dsc-ui button, .dsc-ui input { font: inherit; color: inherit; }\n.dsc-ui button { border: 0; cursor: pointer; background: none; }\n.dsc-ui button:disabled { cursor: default; opacity: .45; }\n.dsc-ui button:focus-visible, .dsc-ui [role=slider]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: 2px; }\n.dsc-ui svg { flex: none; }\n.dsc-update-control { display: inline-flex; align-items: center; -webkit-app-region: no-drag; }\n.dsc-update-notice { position: fixed; right: 24px; bottom: 24px; width: 320px; max-width: calc(100vw - 32px); padding: 14px; z-index: 10000; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; animation: dsc-pop-in 130ms ease both; -webkit-app-region: no-drag; }\n.dsc-ui.dsc-update-panel { padding: 14px; }\n.dsc-update-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }\n.dsc-ui .dsc-update-close { display: grid; place-items: center; width: 24px; height: 24px; padding: 0; border-radius: 6px; color: var(--cx-text-2); }\n.dsc-update-close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-update-message { margin: 14px 0 10px; font-weight: 500; }\n.dsc-update-message[data-state=update] { color: #72b4ff; }\n.dsc-update-message[data-state=error] { color: #ff8585; }\n.dsc-update-versions { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; margin: 0; font-size: 13px; }\n.dsc-update-versions dt { color: var(--cx-text-2); }\n.dsc-update-versions dd { margin: 0; text-align: right; overflow-wrap: anywhere; }\n.dsc-update-note { margin: 10px 0 0; color: var(--cx-text-2); font-size: 12px; line-height: 18px; overflow-wrap: anywhere; }\n.dsc-update-note > span { display: block; color: var(--cx-text-3); }\n.dsc-ui .dsc-update-retry { margin-top: 14px; padding: 5px 10px; border: 1px solid var(--cx-border-l3); border-radius: 7px; }\n.dsc-update-retry:hover { background: var(--cx-hover); }\n.dsc-update-spin { animation: dsc-update-spin .9s linear infinite; }\n@keyframes dsc-update-spin { to { transform: rotate(360deg); } }\n@media (prefers-reduced-motion: reduce) { .dsc-update-spin { animation: none; } }\n.dsc-proto-icon { display: inline-flex; align-items: center; justify-content: center; flex: none; line-height: 1; }\n.dsc-proto-icon svg { display: block; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }\n/* 同一内容 portal 到 body：常驻时跟随宿主列，退场与浮卡不受 0px 列裁剪。只动画透明度和位移。 */\n.dsc-sidebar-shell { visibility: hidden; position: fixed; z-index: 20; min-width: 0; min-height: 0; display: flex; opacity: 0; transform: translateX(-24px); pointer-events: none; transition: opacity 180ms ease, transform 240ms var(--cx-ease-out), visibility 0s 240ms; -webkit-app-region: no-drag; }\n.dsc-sidebar-shell[data-open=true] { visibility: visible; opacity: 1; transform: translateX(0); pointer-events: auto; transition: opacity 180ms ease, transform 260ms var(--cx-ease-out), visibility 0s; }\n.dsc-sidebar-shell[data-mode=docked] > .dsc-sidebar { border-top-left-radius: 16px; }\n.dsc-sidebar-shell[data-mode=floating] { z-index: 40; transform: translateX(-12px); transition: opacity 150ms ease, transform 180ms var(--cx-ease-out), visibility 0s 180ms; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] { transform: translateX(0); transition-delay: 0s; }\n.dsc-sidebar-shell[data-mode=floating]::before { content: ''; position: absolute; top: 0; bottom: 0; left: -12px; width: 12px; }\n.dsc-sidebar-shell[data-mode=floating] > .dsc-sidebar { --cx-sidebar: #2c2c2c; border: 1px solid var(--cx-border-l1); border-radius: 12px; box-shadow: 0 0 0 3px #18181880, 0 8px 28px #0005; }\n.dsc-sidebar-shell[data-mode=floating][data-open=true] > .dsc-sidebar { animation: dsc-sidebar-content-in 150ms var(--cx-ease-out) both; }\n@keyframes dsc-sidebar-content-in { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }\n.dsc-independent-rail { visibility: visible; position: fixed; top: var(--dsh-frame-chrome-top, 0px); bottom: 0; left: 0; width: var(--cx-rail-w); z-index: 25; min-height: 0; padding-bottom: 56px; -webkit-app-region: no-drag; }\n.dsc-extension-navigation-anchor { flex: 1; align-self: stretch; min-height: 0; }\n/* 原生 panellist 继续负责图标注入、选中态、点击和卸载；只重排其可见区域。\n   位置来自自有轨道的剩余空间，超高时独立滚动，不覆盖底部齿轮。\n   Windows 原样式在 collapsed 时 display:none，并在开合时淡出，故明确覆盖这两项。 */\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] { visibility: visible; display: flex !important; position: fixed; left: var(--dsc-extension-left); top: var(--dsc-extension-top); width: var(--dsc-extension-width); max-height: var(--dsc-extension-height); min-height: 0; z-index: 26; flex-direction: column; align-items: center; gap: 4px !important; padding: 0; margin: 0 !important; box-sizing: border-box; overflow-x: hidden; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #ffffff26 transparent; opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-hidden] { display: none !important; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row] { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; min-height: 36px; padding: 0; margin: 0; border: 0; border-radius: var(--cx-radius-md); background: transparent; color: var(--cx-text-3); cursor: pointer; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:hover { color: var(--cx-text); background: var(--cx-hover); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row][aria-current=page] { color: var(--cx-text); background: var(--cx-active); }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-row]:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-label] { display: none; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] { display: inline-flex; align-items: center; justify-content: center; line-height: 1; }\nbody[data-dsh-codex-chrome] [data-dsc-extension-nav] [data-dsc-extension-glyph] svg { display: block; max-width: 20px; max-height: 20px; }\n.dsc-navigation-error { position: fixed; left: calc(var(--cx-rail-w) + 8px); top: var(--dsh-frame-overlay-top, 20px); z-index: 50; max-width: 320px; }\n.dsc-rail .dsc-rail__item { color: var(--cx-text-3); background: transparent; flex: none; padding: 0; }\n.dsc-rail .dsc-rail__item:hover { color: var(--cx-text); background: var(--cx-hover); }\n.dsc-rail .dsc-rail__item--active { color: var(--cx-text); background: var(--cx-active); }\n.dsc-rail__item[data-preview-enabled=true]::after { display: none; }\n.dsc-sidebar { flex: 1; min-width: 0; min-height: 0; overflow: hidden; }\n.dsc-sidebar .dsc-sidebar__header { flex: none; }\n.dsc-sidebar .dsc-brand { min-width: 0; gap: 6px; }\n.dsc-sidebar .dsc-brand__mark { height: 19px; max-width: 25px; }\n.dsc-sidebar .dsc-brand__badge { font-size: 8px; padding: 3px 4px 2px; }\n.dsc-sidebar .dsc-sidebar__header-actions { margin-left: auto; }\n/* Codex：新聊天默认无底色、不显示快捷键，仅悬停时出现灰色背景。 */\n.dsc-sidebar .dsc-new-chat { flex: none; justify-content: flex-start; width: 100%; font-size: 13px; font-weight: var(--cx-weight-medium); background: transparent; color: #c2c2c2; margin-bottom: 8px; }\n.dsc-sidebar .dsc-new-chat:hover { background: rgba(255,255,255,.08); }\n.dsc-sidebar .dsc-workspaces { flex: 1; min-height: 0; height: auto; }\n/* 同时限定两个自有类，避免后面的通用 .dsc-search 把它重新变成伸展项。 */\n.dsc-search.dsc-sidebar-search { flex: none; height: 32px; margin: 2px 0 8px; min-height: 32px; }\n.dsc-sidebar-search button { padding: 0 3px; }\n.dsc-sidebar .dsc-tree-tools { justify-content: space-between; padding: 12px 0 4px 8px; }\n.dsc-tree-tools-label { font-size: 12px; color: var(--cx-text-3); }\n.dsc-projects-toggle { display: flex; align-items: center; gap: 4px; height: 28px; padding: 0; }\n.dsc-projects-toggle svg { color: var(--cx-text-3); transform: rotate(-90deg); transition: transform 180ms ease; }\n.dsc-projects-toggle[aria-expanded=true] svg { transform: rotate(0); }\n.dsc-sidebar .dsc-tree-scroll { padding: 0; scrollbar-color: #ffffff26 transparent; scrollbar-width: thin; }\n.dsc-section-page-title { font-size: 17px; font-weight: 600; }\n.dsc-secondary-nav { display: flex; flex-direction: column; gap: 4px; min-height: 0; overflow: auto; padding-top: 6px; }\n.dsc-secondary-nav .dsc-secondary-item { display: flex; align-items: center; gap: 8px; min-height: 32px; width: 100%; padding: 0 8px; border-radius: var(--cx-radius-md); text-align: left; color: var(--cx-text-2); font-size: 13px; }\n.dsc-secondary-nav .dsc-secondary-item.is-active, .dsc-secondary-nav .dsc-secondary-item:hover { background: var(--cx-active); color: var(--cx-text); }\n.dsc-secondary-item .dsc-proto-icon svg { width: 16px; height: 16px; }\n.dsc-window-sidebar-toggle { visibility: visible; position: fixed; top: 6px; left: 12px; z-index: 35; -webkit-app-region: no-drag; }\n.dsc-collapsed-new-chat { display: none; align-items: center; margin-right: 8px; -webkit-app-region: no-drag; }\nbody[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] .dsc-collapsed-new-chat { display: flex; }\n.dsc-collapsed-new-chat .dsc-icon-button { width: 28px; height: 28px; }\n.dsc-gear-launcher { visibility: visible; position: fixed; left: 8px; bottom: 12px; z-index: 35; }\n.dsc-gear-launcher .dsc-gear-button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border-radius: var(--cx-radius-md); color: var(--cx-text-3); }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: var(--cx-hover); color: var(--cx-text); }\n/* 自绘悬停提示，避免系统 title 突然出现；菜单打开时不叠加提示。 */\n.dsc-gear-launcher .dsc-gear-button { position: relative; isolation: isolate; transition: color 150ms ease; }\n.dsc-gear-launcher .dsc-gear-button:hover, .dsc-gear-launcher .dsc-gear-button[aria-expanded=true] { background: none; }\n.dsc-gear-button::before { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--cx-hover); opacity: 0; transition: opacity 150ms ease; pointer-events: none; }\n.dsc-gear-button:hover::before, .dsc-gear-button[aria-expanded=true]::before, .dsc-gear-button:focus-visible::before { opacity: 1; }\n.dsc-gear-button::after { content: attr(aria-label); position: absolute; left: calc(100% + 8px); top: 50%; padding: 5px 9px; border: 1px solid var(--cx-border-l1); border-radius: 7px; background: var(--cx-popover-fill); color: var(--cx-text); font-size: 12px; line-height: 18px; white-space: nowrap; box-shadow: 0 4px 12px #0004; pointer-events: none; opacity: 0; transform: translate(-3px, -50%); transition: opacity 150ms ease, transform 150ms ease; }\n.dsc-gear-button[aria-expanded=false]:hover::after, .dsc-gear-button[aria-expanded=false]:focus-visible::after { opacity: 1; transform: translate(0, -50%); }\n.dsc-app-menu { padding: 5px; }\n.dsc-menu-separator { height: 1px; margin: 4px 6px; background: var(--cx-border-l1); }\n.dsc-app-menu .dsc-account-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px; text-align: left; border-radius: var(--cx-radius-md); }\n.dsc-account-row:hover { background: var(--cx-active); }\n.dsc-account-row > img, .dsc-account-avatar { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 28px; height: 28px; border-radius: 50%; background: var(--cx-active); object-fit: cover; }\n.dsc-account-row > span:last-child { display: flex; flex-direction: column; min-width: 0; }\n.dsc-account-row strong { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-account-row small { font-size: 11px; color: var(--cx-text-3); }\n.dsc-empty-hero { visibility: visible; position: fixed; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 24px; transform: translate(-50%,-50%); pointer-events: none; }\n.dsc-empty-hero svg { color: #525252; }\n.dsc-empty-hero h1 { font-size: 26px; line-height: 34px; font-weight: 400; color: var(--cx-text-2); margin: 0; white-space: nowrap; }\n.dsc-hero-projectbar { visibility: visible; position: fixed; z-index: 6; height: calc(var(--cx-picker-h) + var(--cx-radius-composer)); padding: 4px 4px var(--cx-radius-composer); background: var(--cx-picker-fill); border-radius: 20px; }\n.dsc-hero-projectbar .dsc-project-picker { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; max-width: calc(100% - 180px); color: var(--cx-text-2); font-size: 13px; border-radius: var(--cx-radius-full); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-hero-projectbar .dsc-project-picker:hover, .dsc-hero-projectbar .dsc-project-picker[aria-expanded=true] { background: var(--cx-active); }\n.dsc-ui button:active:not(:disabled) { transform: translateY(1px); }\n.dsc-brand-mark { width: 25px; height: 20px; object-fit: contain; }\n.dsc-brand { display: inline-flex; align-items: center; gap: 7px; }\n.dsc-brand strong { font-size: 17px; letter-spacing: -.02em; }\n.dsc-brand small { font: 700 8px/16px var(--cx-font-sans); letter-spacing: .12em; padding: 0 4px; color: #131313; background: #eee; border-radius: 3px; }\n.dsc-settings-trigger { display: inline-flex; gap: 8px; align-items: center; }\n.dsc-workspaces { height: 100%; min-height: 0; width: 100%; display: flex; flex-direction: column; background: var(--cx-sidebar); }\n.dsc-tree-tools { display: flex; gap: 4px; align-items: center; padding: 6px 8px 12px; }\n.dsc-search { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; border-radius: 8px; background: #ffffff08; padding: 3px 8px; color: var(--cx-text-3); }\n.dsc-search input { min-width: 0; width: 100%; border: 0; outline: none; background: none; font-size: 12px; }\n.dsc-search:focus-within { box-shadow: 0 0 0 1px var(--cx-border-l3); }\n.dsc-search input::placeholder { color: var(--cx-text-3); }\n.dsc-icon-button { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 7px; color: var(--cx-text-2); }\n.dsc-icon-button:hover { background: var(--cx-active); }\n.dsc-tree-scroll { flex: 1; min-height: 0; overflow: auto; scrollbar-width: thin; padding: 0 8px; }\n.dsc-section-title { padding: 12px 8px 6px; font-size: 12px; font-weight: 500; color: var(--cx-text-3); }\n.dsc-thread, .dsc-project { display: flex; align-items: center; height: 30px; border-radius: 7px; position: relative; }\n.dsc-thread:hover, .dsc-project:hover, .dsc-thread.is-active { background: #ffffff0d; }\n.dsc-ui .dsc-thread-main, .dsc-ui .dsc-project-main { display: flex; flex: 1; align-items: center; gap: 7px; min-width: 0; height: 100%; padding: 0 8px; text-align: left; color: #c2c2c2; }\n.dsc-thread-title, .dsc-project-main > span { min-width: 0; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.dsc-ui .dsc-thread-main { padding-right: 62px; }\n.dsc-thread-title-text { display: inline-block; width: max-content; max-width: none; vertical-align: top; }\n.dsc-thread-title[data-overflow=true] { text-overflow: clip; mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent); }\n.dsc-thread:hover .dsc-thread-title[data-overflow=true] .dsc-thread-title-text,\n.dsc-thread-main:focus-visible .dsc-thread-title[data-overflow=true] .dsc-thread-title-text { animation: dsc-title-scroll var(--dsc-title-duration) linear 250ms infinite alternate; }\n@keyframes dsc-title-scroll { from { transform: translateX(0); } to { transform: translateX(var(--dsc-title-shift)); } }\n.dsc-thread-time { position: absolute; right: 9px; font-size: 10px; color: var(--cx-text-4); transition: opacity 120ms ease; }\n.dsc-thread:hover .dsc-thread-time, .dsc-thread:has(:focus-visible) .dsc-thread-time { display: none; }\n.dsc-thread .dsc-state[data-state=idle] { display: none; }\n.dsc-thread-actions { position: absolute; top: 0; right: 4px; height: 100%; display: flex; align-items: center; gap: 1px; opacity: 0; pointer-events: none; transition: opacity 150ms ease; }\n.dsc-thread:hover .dsc-thread-actions, .dsc-thread:has(:focus-visible) .dsc-thread-actions { opacity: 1; pointer-events: auto; }\n.dsc-ui .dsc-thread-action { display: grid; place-items: center; flex: none; width: 25px; height: 26px; padding: 0; border-radius: 5px; color: #969696; transition: color 120ms ease; }\n.dsc-ui .dsc-thread-action:hover, .dsc-ui .dsc-thread-action:focus-visible { color: #d2d2d2; }\n.dsc-thread-action svg { width: 14px; height: 14px; }\n.dsc-row-tooltip { position: fixed; z-index: 10001; pointer-events: none; padding: 5px 11px; border: 1px solid #ffffff08; border-radius: 13px; color: #dfdfdf; background: #2d2d2d; font-size: 13px; line-height: 18px; white-space: nowrap; box-shadow: 0 2px 5px #0002; opacity: 0; visibility: hidden; transform: translateY(3px); transition: opacity 80ms ease, transform 80ms ease, visibility 0s 80ms; }\n.dsc-row-tooltip[data-open=true] { opacity: 1; visibility: visible; transform: translateY(0); transition: opacity 120ms ease 350ms, transform 120ms ease 350ms, visibility 0s 350ms; }\n.dsc-state { color: var(--cx-text-3); flex: none; display: flex; align-items: center; }\n.dsc-state[data-state=pending] { color: var(--cx-warning); }\n.dsc-state[data-state=running] { color: var(--cx-accent-soft); animation: dsc-status-pulse 1.2s ease-in-out infinite; }\n.dsc-state[data-state=done] { color: var(--cx-success); }\n.dsc-row-action { display: flex; opacity: 0; pointer-events: none; transition: opacity 150ms ease; width: 25px; height: 25px; align-items: center; justify-content: center; border-radius: 5px; padding: 0; margin-right: 3px; color: var(--cx-text-3); }\n.dsc-thread:hover .dsc-row-action, .dsc-project:hover .dsc-row-action, .dsc-thread:has(:focus-visible) .dsc-row-action, .dsc-project:has(:focus-visible) .dsc-row-action { opacity: 1; pointer-events: auto; }\n.dsc-row-action:hover { color: #fff; background: var(--cx-active); }\n/* 本轮按用户录像为项目内容局部开放布局动画；外壳与其他面板的尺寸规则保持原约定。 */\n.dsc-project-fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 180ms cubic-bezier(.2,.8,.2,1), opacity 150ms ease; }\n.dsc-project-fold[data-open=true] { grid-template-rows: 1fr; opacity: 1; }\n.dsc-project-clip { min-height: 0; overflow: hidden; }\n.dsc-project-children { padding-left: 14px; }\n.dsc-project-children, .dsc-project-list { transform: translateY(-4px); transition: transform 180ms cubic-bezier(.2,.8,.2,1); }\n.dsc-project-fold[data-open=true] > .dsc-project-clip > :is(.dsc-project-children, .dsc-project-list) { transform: translateY(0); }\n.dsc-project-children .dsc-state { display: none; }\n.dsc-empty { display: block; color: var(--cx-text-3); padding: 10px 12px; font-size: 12px; }\n.dsc-archive-toggle { padding: 8px 12px; display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--cx-text-3); }\n.dsc-archive-toggle input { accent-color: var(--cx-accent); }\n.dsc-thread.is-archived { opacity: .55; }\n.dsc-error { padding: 4px 8px; color: var(--cx-danger); font: 12px/17px var(--cx-font-sans); white-space: normal; max-width: 310px; }\n.dsc-menu { z-index: 10000; padding: 6px; background: var(--cx-popover-fill); border: 1px solid var(--cx-border-l1); border-radius: 14px; box-shadow: 0 12px 36px #0007; overflow: auto; animation: dsc-pop-in 130ms ease both; }\n.dsc-menu-heading { font-size: 12px; color: var(--cx-text-3); padding: 5px 8px 8px; }\n.dsc-option { width: 100%; display: flex; gap: 9px; align-items: center; text-align: left; padding: 7px 8px; border-radius: 7px; min-height: 32px; }\n.dsc-option:hover, .dsc-option:focus-visible { background: #ffffff12; }\n.dsc-option-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; line-height: 20px; }\n.dsc-option-copy small { font-size: 12px; color: var(--cx-text-3); line-height: 17px; }\n/* 行悬停详情卡：几何按原型实测（项目卡 321×130、右侧 5px；会话卡 470 宽、右侧 12px、上移 6px）。 */\n.dsc-row-pop { position: fixed; z-index: 10000; max-width: calc(100vw - 32px); padding: 6px; border-radius: var(--cx-radius-xl); border: 1px solid var(--cx-border-l1); background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); animation: dsc-row-pop-in 120ms var(--cx-ease-out) both; }\n.dsc-row-pop--project { width: 321px; padding: 8px; }\n.dsc-row-pop--thread { width: 470px; }\n.dsc-row-pop__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 8px 8px 10px; border-bottom: 1px solid var(--cx-border-l2); }\n.dsc-row-pop--project .dsc-row-pop__head { align-items: center; height: 28px; padding: 0 8px; border-bottom: 0; }\n.dsc-row-pop__name { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 14px; font-weight: var(--cx-weight-regular); color: var(--cx-text); }\n.dsc-row-pop__name > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop__pin { display: inline-flex; align-items: center; flex: none; color: var(--cx-text-3); }\n.dsc-row-pop__excerpt { margin: 0; font-size: 13px; line-height: 20px; color: var(--cx-text); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }\n.dsc-row-pop__meta { display: flex; align-items: center; gap: 6px; flex: none; font-size: 12px; color: var(--cx-text-3); white-space: nowrap; }\n.dsc-row-pop__line { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border-radius: var(--cx-radius-md); font-size: 13px; color: var(--cx-text-2); text-align: left; }\n.dsc-row-pop__line svg { flex: none; color: var(--cx-text-3); }\n.dsc-row-pop--project .dsc-row-pop__line { height: 28px; font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--project .dsc-row-pop__line svg { color: var(--cx-text-2); }\n.dsc-row-pop__line--path, .dsc-row-pop__line--action { cursor: pointer; }\n.dsc-row-pop__line--path:hover, .dsc-row-pop__line--action:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-row-pop__line--path:focus-visible, .dsc-row-pop__line--action:focus-visible { outline: 2px solid var(--cx-focus); outline-offset: -2px; }\n.dsc-row-pop__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-row-pop--project .dsc-row-pop__path { font-family: var(--cx-font-sans); font-size: 14px; color: var(--cx-text); }\n.dsc-row-pop--thread .dsc-row-pop__path { font-family: var(--cx-font-mono); font-size: 12px; }\n.dsc-row-pop__arrow { margin-left: auto; opacity: 0; transition: opacity 120ms var(--cx-ease); }\n.dsc-row-pop__line--path:hover .dsc-row-pop__arrow, .dsc-row-pop__line--path:focus-visible .dsc-row-pop__arrow { opacity: 1; }\n.dsc-row-pop__sep { height: 1px; background: var(--cx-border-l1); }\n@keyframes dsc-row-pop-in { from { opacity: 0; } to { opacity: 1; } }\n/* 「编辑项目」对话框：按参考图（面板 #2d2d2d、16 圆角、保存白底、移除暗红底）；源文件夹只读展示。 */\n.dsc-modal { position: fixed; inset: 0; z-index: 11000; display: flex; align-items: center; justify-content: center; padding: 24px; }\n.dsc-modal__mask { position: absolute; inset: 0; background: rgba(0,0,0,.12); }\n.dsc-modal__panel { position: relative; display: flex; flex-direction: column; width: min(520px, calc(100vw - 32px)); padding: 24px; border-radius: 16px; background: var(--cx-popover-fill); box-shadow: var(--cx-shadow-2xl); color: var(--cx-text); }\n.dsc-modal__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }\n.dsc-modal__head h2 { margin: 0; font-size: 20px; line-height: 28px; font-weight: 600; }\n.dsc-modal__close { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; border-radius: var(--cx-radius-sm); color: var(--cx-text-2); }\n.dsc-modal__close:hover { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__field { display: flex; align-items: center; gap: 10px; height: 44px; margin-top: 20px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); }\n.dsc-modal__field:focus-within { border-color: var(--cx-focus); }\n.dsc-modal__input { flex: 1; min-width: 0; height: 100%; border: 0; outline: none; background: none; font: 15px/22px var(--cx-font-sans); color: var(--cx-text); }\n.dsc-modal__input::placeholder { color: var(--cx-text-3); }\n.dsc-modal__label { margin: 20px 0 8px; font-size: 13px; line-height: 18px; color: var(--cx-text-3); }\n.dsc-modal__source { display: flex; align-items: center; gap: 10px; height: 48px; padding: 0 12px; border: 1px solid var(--cx-border-strong); border-radius: var(--cx-radius-md); color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__path { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.dsc-modal .dsc-error { margin-top: 12px; }\n.dsc-modal__actions { display: flex; align-items: center; gap: 8px; margin-top: 24px; }\n.dsc-modal__spacer { flex: 1; }\n.dsc-modal__remove { height: 36px; padding: 0 16px; border-radius: 999px; background: rgba(250,102,101,.14); color: #fa6665; font-size: 14px; }\n.dsc-modal__remove:hover:not(:disabled) { background: rgba(250,102,101,.22); }\n.dsc-modal__cancel { height: 36px; padding: 0 14px; border-radius: 999px; color: var(--cx-text-2); font-size: 14px; }\n.dsc-modal__cancel:hover:not(:disabled) { background: var(--cx-hover); color: var(--cx-text); }\n.dsc-modal__save { height: 36px; padding: 0 20px; border-radius: 999px; background: #dfdfdf; color: #131313; font-size: 14px; font-weight: 500; }\n.dsc-modal__save:hover:not(:disabled) { background: #fff; }\n.dsc-modal__save:disabled, .dsc-modal__remove:disabled, .dsc-modal__cancel:disabled { opacity: .6; cursor: default; }\n.dsc-permission, .dsc-model { position: relative; display: inline-flex; align-items: center; min-width: 0; }\n.dsc-model { gap: 2px; }\n.dsc-control-status { display: inline-flex; align-items: center; gap: 5px; padding: 0 7px; color: var(--cx-text-3); font-size: 11px; }\n.dsc-control-status button { padding: 2px 4px; text-decoration: underline; }\n.dsc-control-status button:hover { color: var(--cx-text); }\n.dsc-pill { height: 28px; display: inline-flex; align-items: center; gap: 6px; padding: 0 10px; border-radius: 999px; white-space: nowrap; color: var(--cx-text-2); font-size: 14px !important; }\n.dsc-pill:hover, .dsc-pill[aria-expanded=true] { background: #ffffff12; color: white; }\n.dsc-pill[data-warning=true] { color: var(--cx-warning); }\n.dsc-model-trigger { max-width: 260px; gap: 5px; }\n/* 右下角触发器：模型名偏白、思维强度灰色（参考图 4）。 */\n.dsc-model-trigger .dsc-model-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; color: #dfdfdf; }\n.dsc-model-trigger .dsc-effort-name { flex: none; color: #989898; }\n.dsc-model-trigger svg { flex: none; color: #989898; }\n/* 「修改模型」面板：标题与列表样式明确区别于宿主原生菜单。 */\n.dsc-menu.dsc-model-panel { padding: 8px; }\n.dsc-menu.dsc-model-panel .dsc-menu-heading { font-size: 14px; line-height: 20px; color: var(--cx-text); font-weight: 500; padding: 6px 8px 10px; }\n.dsc-model-group { color: var(--cx-text-3); font-size: 11px; padding: 7px 8px 2px; }\n.dsc-model-search { border: 0; border-bottom: 1px solid var(--cx-border-l1); background: none; outline: none; padding: 6px 8px; width: 100%; margin-bottom: 3px; }\n.dsc-back { display: flex; align-items: center; gap: 4px; color: var(--cx-text-3); font-size: 12px !important; border-radius: 5px; }\n.dsc-back:hover { color: #fff; }\n/* 滑条弹层裁掉横向溢出：Max/Low/High 档的撒点动画会向右超出边界，触发多余的水平滚动条。 */\n.dsc-reasoning-pop { padding: 12px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); overflow: hidden; animation: dsc-reasoning-in 130ms var(--cx-ease) both; }\n.dsc-reasoning { position: relative; }\n.dsc-reasoning-heading { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 20px 10px; text-align: center; }\n.dsc-reasoning-heading strong { font-size: 14px; font-weight: var(--cx-weight-semibold); line-height: 18px; color: var(--cx-reasoning-title); transition: color 150ms ease; }\n.dsc-reasoning-model { display: inline-flex; align-items: center; justify-content: center; gap: 2px; max-width: 100%; padding: 4px 10px; border-radius: var(--cx-radius-md); color: #ffffff9e !important; font-size: 12px !important; line-height: 16px !important; white-space: nowrap; transition: background-color 120ms var(--cx-ease), color 120ms var(--cx-ease); }\n.dsc-reasoning-model:hover { background: #3c3b3b; color: var(--cx-text) !important; }\n.dsc-reasoning-reset { position: absolute; top: -4px; right: -4px; display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: var(--cx-radius-sm); color: var(--cx-text-3) !important; }\n.dsc-reasoning-reset:hover { background: var(--cx-hover); color: var(--cx-text) !important; }\n.dsc-reasoning[data-level=max] .dsc-reasoning-heading strong { color: var(--cx-reasoning-max-text); }\n.dsc-slider { height: 32px; position: relative; margin: 0 2px; border-radius: 999px; cursor: pointer; touch-action: none; outline: none; }\n/* 提交期间保持原有视觉：只禁用拖拽，不切换光标/透明度，避免切换档位时闪变。 */\n.dsc-slider[aria-disabled=true] { cursor: default; opacity: 1; }\n.dsc-slider-track { position: absolute; inset: 4px 0; height: 24px; border-radius: 999px; background: var(--cx-reasoning-track); overflow: hidden; }\n.dsc-slider-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--cx-reasoning-blue); transform-origin: left center; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-slider-max { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg,var(--cx-reasoning-max-blue),var(--cx-reasoning-purple) 52%,var(--cx-reasoning-violet)); opacity: 0; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-slider-max { opacity: 1; }\n.dsc-slider-max::before, .dsc-slider-max::after { content: ''; position: absolute; animation-play-state: paused; }\n.dsc-slider-max::before { inset: -50% -25%; background: radial-gradient(ellipse,var(--cx-reasoning-max-ice),#a095ffd9 22%,transparent 58%); animation: dsc-max-flow 2.8s cubic-bezier(.4,0,.6,1) -.45s infinite alternate; animation-play-state: paused; }\n.dsc-slider-max::after { inset: -40% -30%; background: radial-gradient(ellipse,#d6a2ff,var(--cx-reasoning-max-glow) 20%,transparent 55%); animation: dsc-max-bloom 4.2s cubic-bezier(.4,0,.6,1) -1.65s infinite alternate; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-slider-max::before, .dsc-slider[data-level=max] .dsc-slider-max::after { animation-play-state: running; }\n.dsc-stars { position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 180ms ease; }\n.dsc-slider[data-level=max] .dsc-stars { opacity: 1; }\n.dsc-stars i { position: absolute; border-radius: 50%; background: #fff; box-shadow: 0 0 3px #e0d6ff8c; animation: dsc-star-drift var(--pdur) cubic-bezier(.4,0,.6,1) var(--pdelay) infinite alternate; animation-play-state: paused; }\n.dsc-slider[data-level=max] .dsc-stars i { animation-play-state: running; }\n.dsc-tick { position: absolute; top: 50%; width: 5px; height: 5px; border-radius: 50%; background: #ffffff38; transform: translate(-50%,-50%); transition: opacity 150ms ease,transform 120ms ease; }\n.dsc-tick.is-on { background: #ffffff4d; }\n.dsc-slider[data-level=max] .dsc-tick { opacity: 0; }\n.dsc-thumb-position { position: absolute; inset: 0; pointer-events: none; transition: transform 140ms var(--cx-ease-scroll); }\n.dsc-thumb { position: absolute; top: 50%; left: 14px; width: 28px; height: 28px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px #0007,0 0 0 1px #0000000f; transform: translate(-50%,-50%); pointer-events: auto; transition: transform 140ms var(--cx-ease-out),box-shadow 140ms var(--cx-ease); }\n/* 固定白色滑块为正圆，避免宿主全局圆角规则覆盖插件外形。 */\n.dsc-ui .dsc-slider .dsc-thumb { border-radius: 50% !important; }\n.dsc-thumb:hover { transform: translate(-50%,-50%) scale(1.1); box-shadow: 0 1px 6px #0008,0 0 0 1px #0000000f; }\n.dsc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\n.dsc-permission-menu { padding: 4px; border-radius: var(--cx-radius-2xl); box-shadow: var(--cx-shadow-2xl); }\n.dsc-permission-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 4px 8px; color: var(--cx-text-3); font-size: 13px; line-height: 18px; }\n.dsc-permission-heading button { padding: 0; white-space: nowrap; text-decoration: underline; text-underline-offset: 2px; }\n.dsc-permission-help { margin: 4px 8px 8px; color: var(--cx-text-2); font-size: 12px; line-height: 18px; }\n.dsc-permission-menu .dsc-option { align-items: flex-start; gap: 8px; padding: 6px 8px; border-radius: var(--cx-radius-xl); color: var(--cx-text-2); font-size: 14px; line-height: 19px; }\n.dsc-permission-menu .dsc-option > svg { margin-top: 3px; }\n.dsc-permission-menu .dsc-option-copy { line-height: 19px; }\n.dsc-permission-menu .dsc-option[data-warning=true], .dsc-permission-menu .dsc-option[data-warning=true] small { color: var(--cx-warning); }\n.dsc-burst { position: absolute; left: 14px; top: 50%; }\n.dsc-burst i { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #b98cff; animation: dsc-burst 280ms cubic-bezier(.22,1,.36,1) both; }\n.dsc-slider-labels { display: flex; justify-content: space-between; padding-top: 3px; }\n.dsc-slider-labels button { padding: 0 3px; font-size: 10px; color: var(--cx-text-3); }\n.dsc-slider-labels button:hover { color: white; }\n.dsc-reasoning-description { display: block; text-align: center; color: var(--cx-text-3); font-size: 11px; line-height: 16px; margin-top: 7px; }\n@keyframes dsc-pop-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }\n/* 退场淡出：关闭弹层时先播放 160ms，再卸载 DOM。 */\n@keyframes dsc-pop-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(3px); } }\n.dsc-menu.dsc-menu-closing { animation: dsc-pop-out 160ms ease both; pointer-events: none; }\n@keyframes dsc-reasoning-in { from { opacity: 0; } to { opacity: 1; } }\n@keyframes dsc-status-pulse { 50% { opacity: .4; } }\n@keyframes dsc-max-flow { from { transform: translateX(-32%) scale(.82,1); opacity: .95; } to { transform: translateX(32%) scale(1.02,1); opacity: .8; } }\n@keyframes dsc-max-bloom { from { transform: translateX(28%) scale(.7,1); opacity: .9; } to { transform: translateX(-28%) scale(1,1); opacity: 1; } }\n@keyframes dsc-star-drift { from { transform: translate(-50%,-50%) translate(calc(var(--dx)*-.5),calc(var(--dy)*-.5)); opacity: .45; } to { transform: translate(-50%,-50%) translate(calc(var(--dx)*.5),calc(var(--dy)*.5)); opacity: .8; } }\n@keyframes dsc-burst { 0% { transform: translate(-50%,-50%) scale(.45); opacity: 0; } 22% { opacity: .65; } 100% { transform: translate(-50%,-50%) translate(var(--bx),var(--by)) scale(.45); opacity: 0; } }\n@media (prefers-reduced-motion: reduce) {\n  .dsc-sidebar-shell, .dsc-row-tooltip, .dsc-ui *, .dsc-ui *::before, .dsc-ui *::after { animation: none !important; transition: none !important; }\n  .dsc-burst { display: none; }\n}\n\n/* Codex 几何（第 48 轮）：\n   1) 侧边栏列左上角圆角、对话列左上角直角（与 Codex 蓝框/红框一致）；\n   2) 对话正文列与输入框同宽：由插件测量输入框卡片的实际视觉宽度写入 --dsc-composer-visual-width，\n      正文列优先取该值，回退到宿主 --dsh-composer-card-max-width（正文 + 32px）。 */\nbody[data-dsh-codex-style] [data-conversation-scroll] [class*=\"_column\"] { max-width: var(--dsc-composer-visual-width, var(--dsh-composer-card-max-width)); }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-sidebar-column] { border-top-left-radius: var(--dsh-windows-content-radius, 16px); }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-center-column] { border-radius: 0; }\nhtml[data-windows-titlebar] body[data-dsh-codex-chrome] [data-dsc-frame][data-sidebar-collapsed] [data-dsc-center-column] { border-top-left-radius: var(--dsh-windows-content-radius, 16px); }\n";
    const PROTOTYPE_ICONS = {"home":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><path d=\"M3 7.2 8 3.2l5 4v5.3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z\"/></svg>","tasks":"<svg viewBox=\"0 0 16 16\" width=\"20\" height=\"20\" aria-hidden=\"true\"><circle cx=\"8\" cy=\"8\" r=\"5.5\"/><path d=\"M8 5v3l2 1.5\"/></svg>","plugins":"<svg class=\"dsc-rail__plugin-icon\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M7.5 3v4m5-4v4M5.5 7h9v2.8a4.5 4.5 0 0 1-9 0V7ZM10 14.3v3.2\"/></svg>","settings":"<svg viewBox=\"0 0 20 20\" width=\"18\" height=\"18\" stroke-width=\"1.4\" aria-hidden=\"true\">\n          <path d=\"M8.80 3.20 L9.07 1.85 A8.20 8.20 0 0 1 10.93 1.85 L11.20 3.20 A6.90 6.90 0 0 1 13.96 4.35 L15.10 3.58 A8.20 8.20 0 0 1 16.42 4.90 L15.65 6.04 A6.90 6.90 0 0 1 16.80 8.80 L18.15 9.07 A8.20 8.20 0 0 1 18.15 10.93 L16.80 11.20 A6.90 6.90 0 0 1 15.65 13.96 L16.42 15.10 A8.20 8.20 0 0 1 15.10 16.42 L13.96 15.65 A6.90 6.90 0 0 1 11.20 16.80 L10.93 18.15 A8.20 8.20 0 0 1 9.07 18.15 L8.80 16.80 A6.90 6.90 0 0 1 6.04 15.65 L4.90 16.42 A8.20 8.20 0 0 1 3.58 15.10 L4.35 13.96 A6.90 6.90 0 0 1 3.20 11.20 L1.85 10.93 A8.20 8.20 0 0 1 1.85 9.07 L3.20 8.80 A6.90 6.90 0 0 1 4.35 6.04 L3.58 4.90 A8.20 8.20 0 0 1 4.90 3.58 L6.04 4.35 A6.90 6.90 0 0 1 8.80 3.20\"/>\n          <circle cx=\"10\" cy=\"10\" r=\"2.3\"/>\n        </svg>","newChat":"<svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path d=\"M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9\"/><path d=\"m10.9 2.7-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8\"/></svg>"};
    const BRAND_MARK = "data:image/png;base64,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";
    const PLUGIN_VERSION = "0.1.3";
    const PLUGIN_PACKAGE = "@xinxing1708/dsh-codex-style";
    const module = { exports: {} };
    const exports = module.exports;
// 保留官方 sidebar/settings/composer 的所有者；导航在 shell.overlay 独立挂载。
// 二级侧栏复用同一内容与真实动作；收起态只改变呈现方式，不导航或展开宿主列。
const DEFAULT_SIDEBAR_WIDTH = 288;

// 0.2.1-rc.2 的 root store handle.create() 返回 AppFrame 已持有的同一布局实例。
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
function useNavigationDirectory(ctx) {
  const panel = useSource(ctx.layout.panelInfo);
  const panels = usePanelDirectory(ctx);
  // 官方分组只按已核实的 main id 识别；社区入口的名称不能决定它属于自定义。
  const pluginRows = panels.filter(row => row.available && row.id === 'plugins');
  const taskRows = panels.filter(row => row.available && row.id === 'schedules');
  const category = panel.activePanelId === null ? 'home' : panel.activePanelId === 'plugins' ? 'plugins' : panel.activePanelId === 'schedules' ? 'tasks' : 'extension';
  return { panel, panels, pluginRows, taskRows, category };
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
    const detach = () => {
      nav?.removeEventListener('pointerenter', hidePreview);
      nav?.removeEventListener('focusin', hidePreview);
      nav?.removeEventListener('click', hidePreview, true);
    };
    const sync = () => {
      frame = undefined;
      const glyphs = [...host.querySelectorAll('[data-slot="sidebar.panellist"]')];
      const buttons = glyphs.map(glyph => glyph.closest('button'));
      // 注册表通知可以先于原 SidebarRoot 的 React commit；等真实行与目录对齐再标记。
      if (!buttons.length || buttons.length !== panels.length || buttons.some((button, i) => !button || button.getAttribute('aria-label') !== panels[i].label)) return;
      const nextNav = buttons[0].closest('nav');
      if (!nextNav || buttons.some(button => button.closest('nav') !== nextNav)) return;
      if (nextNav !== nav) {
        detach();
        nav = nextNav;
        nav.addEventListener('pointerenter', hidePreview);
        nav.addEventListener('focusin', hidePreview);
        nav.addEventListener('click', hidePreview, true);
      }
      mark(nav, 'data-dsc-extension-nav', '');
      buttons.forEach((button, i) => {
        const row = panels[i];
        const extension = row.available && row.id !== 'plugins' && row.id !== 'schedules';
        mark(button, 'data-dsc-extension-row', row.id);
        mark(button, 'data-dsc-extension-hidden', extension ? null : '');
        if (!extension) return;
        mark(button, 'title', row.label);
        const glyph = glyphs[i].parentElement;
        mark(glyph, 'data-dsc-extension-glyph', '');
        [...button.children].filter(child => child !== glyph).forEach(child => mark(child, 'data-dsc-extension-label', ''));
      });
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
      store.set({ collapsed, preview: null });
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

function makeNavigationRail(ctx, sidebar) {
  return function NavigationRail() {
    const { panels, pluginRows, taskRows, category } = useNavigationDirectory(ctx);
    const { collapsed, preview } = useSource(sidebar.store);
    const [error, setError] = useState('');
    const extensions = useRef(null);
    useNativeExtensionNavigation(sidebar, extensions, panels);
    const pick = id => {
      sidebar.hide();
      setError('');
      try { ctx.layout.selectPanel(id); } catch (e) { setError(errorText(e)); }
    };
    const item = (id, name, icon, action) => h('button', {
      key: id, type: 'button', className: 'dsc-rail__item' + (category === id ? ' dsc-rail__item--active' : ''),
      title: collapsed ? undefined : name, 'data-tip': name, 'data-dsc-preview-trigger': id, 'data-preview-enabled': collapsed,
      'aria-label': name, 'aria-current': category === id ? 'page' : undefined,
      'aria-haspopup': collapsed ? 'dialog' : undefined, 'aria-expanded': collapsed ? preview === id : undefined,
      'aria-controls': collapsed ? 'dsc-sidebar-card' : undefined,
      onPointerEnter: e => { if (e.pointerType !== 'touch') sidebar.enter(id); }, onPointerLeave: sidebar.leave,
      onFocus: () => sidebar.enter(id), onBlur: sidebar.leave,
      onKeyDown: e => { if (e.key === 'Escape') { sidebar.hide(); e.preventDefault(); } }, onClick: action
    }, h(PrototypeIcon, { name: icon }));
    return createPortal(h(React.Fragment, null,
      h('nav', { className: 'dsc-ui dsc-rail dsc-independent-rail', 'aria-label': '主导航' },
        item('home', '首页', 'home', () => pick(null)),
        taskRows.length > 0 && item('tasks', '定时任务', 'tasks', () => pick(taskRows[0].id)),
        pluginRows.length > 0 && item('plugins', '自定义', 'plugins', () => pick('plugins')),
        h('div', { ref: extensions, className: 'dsc-extension-navigation-anchor', 'aria-hidden': true })),
      error && h('div', { className: 'dsc-ui dsc-navigation-error' }, h(ErrorLine, { text: error }))), document.body);
  };
}

function makeSidebarChrome(ctx, sidebar) {
  const Tree = makeWorkspaceTree(ctx);
  return function SidebarChrome() {
    const { panel, pluginRows, taskRows, category: selectedCategory } = useNavigationDirectory(ctx);
    const { collapsed, preview } = useSource(sidebar.store);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [geometry, setGeometry] = useState(null);
    const marker = useRef(null);
    const insidePointer = useRef(null);
    const lastWidth = useRef(DEFAULT_SIDEBAR_WIDTH);
    const lastSection = useRef('home');
    if (selectedCategory !== 'extension') lastSection.current = selectedCategory;
    const presentation = useRef({ category: lastSection.current, mode: 'docked' });
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
    const visibleCategory = collapsed ? preview : lastSection.current;
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
    const openSearch = () => { if (collapsed) sidebar.show('home'); else pick(null); setSearchOpen(true); };
    const closeSearch = () => { setSearchOpen(false); setQuery(''); searchAnchor.current?.focus(); };
    const pageRows = category === 'tasks' ? taskRows : pluginRows;
    const inset = mode === 'floating' ? 4 : 0;
    const style = geometry ? { left: geometry.left + inset, top: geometry.top + inset, width: Math.min(geometry.width, Math.max(0, window.innerWidth - geometry.left - inset - 8)), height: Math.max(0, geometry.height - inset * 2) } : { visibility: 'hidden' };
    const shell = h('div', {
      ref: node => { if (node) node.inert = !shown; }, id: 'dsc-sidebar-card', className: 'dsc-ui dsc-sidebar-shell', style,
      'data-mode': mode, 'data-open': shown, 'aria-hidden': !shown,
      role: mode === 'floating' ? 'dialog' : undefined, 'aria-label': mode === 'floating' ? (category === 'home' ? '首页侧栏' : category === 'tasks' ? '定时任务侧栏' : '自定义侧栏') : undefined,
      onPointerEnter: sidebar.hold, onPointerLeave: sidebar.leave,
      onPointerDownCapture: e => { insidePointer.current = e.nativeEvent; },
      onFocusCapture: sidebar.hold, onBlurCapture: sidebar.leave,
      onKeyDown: e => { if (collapsed && e.key === 'Escape' && !e.defaultPrevented) { sidebar.hide(); e.preventDefault(); } }
    },
      h('aside', { key: category, className: 'dsc-sidebar', 'aria-label': category === 'home' ? '项目与对话' : category === 'tasks' ? '定时任务' : '自定义' },
        h('div', { className: 'dsc-sidebar__header' }, category === 'home' ? h('div', { className: 'dsc-brand' }, h('img', { className: 'dsc-brand__mark', src: BRAND_MARK, alt: '' }), h('span', { className: 'dsc-brand__wordmark' }, 'deepseek'), h('span', { className: 'dsc-brand__badge' }, 'HARNESS')) : h('strong', { className: 'dsc-section-page-title' }, category === 'tasks' ? '定时任务' : '自定义'),
          h('div', { className: 'dsc-sidebar__header-actions' }, h('button', { type: 'button', ref: searchAnchor, className: 'dsc-icon-button', title: '搜索对话与项目', 'aria-label': '搜索对话与项目', 'aria-expanded': searchOpen, onClick: openSearch }, h(Icon, { name: 'search' })))),
        category === 'home' && h('button', { type: 'button', className: 'dsc-new-chat', title: '新聊天', onClick: () => { setSearchOpen(false); setQuery(''); run(() => { ctx.uiWorkspace.startSession(); sidebar.hide(); }); } }, h(PrototypeIcon, { name: 'newChat' }), h('span', null, '新聊天')),
        category === 'home' && searchOpen && h('label', { className: 'dsc-search dsc-sidebar-search' }, h(Icon, { name: 'search' }), h('input', { ref: search, value: query, onChange: e => setQuery(e.target.value), onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); closeSearch(); } }, placeholder: '搜索标题或项目', 'aria-label': '搜索标题或项目' }), h('button', { type: 'button', onClick: closeSearch, 'aria-label': '关闭搜索' }, '×')),
        h(ErrorLine, { text: error }),
        category === 'home' ? h(Tree, { query, tools: false, active: shown, onNavigate: sidebar.hide }) : h('div', { className: 'dsc-secondary-nav' }, pageRows.map(row => h('button', { key: row.id, type: 'button', className: 'dsc-secondary-item' + (row.id === panel.activePanelId ? ' is-active' : ''), 'aria-current': row.id === panel.activePanelId ? 'page' : undefined, onClick: () => pick(row.id) }, h(PrototypeIcon, { name: category === 'tasks' ? 'tasks' : 'plugins' }), row.label)))));
    return h(React.Fragment, null, h('span', { ref: marker, 'aria-hidden': true }), createPortal(shell, document.body));
  };
}

function makeShellChrome(ctx, sidebar) {
  const Navigation = makeNavigationRail(ctx, sidebar);
  const Toggle = makeSidebarToggle(ctx);
  return function ShellChrome() {
    const marker = useRef(null);
    useLayoutEffect(() => {
      // 0.2.1-rc.2 的窄适配：由公开 overlay/slot 锚点找到它们所属的列，
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
function makeCollapsedNewChat(ctx) {
  return function CollapsedNewChat() {
    // startSession 返回 void；异步创建、导航和失败通知都由宿主处理。
    return h('div', { className: 'dsc-ui dsc-collapsed-new-chat' },
      h('button', { type: 'button', className: 'dsc-icon-button', title: '新建对话', 'aria-label': '新建对话', onClick: () => ctx.uiWorkspace.startSession() }, h(PrototypeIcon, { name: 'newChat' })));
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
      const client = { version: '0.2.1-rc.2', locale: ctx.locale.getSnapshot().active, timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60 };
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
      const card = composer.getBoundingClientRect();
      const fallback = composer.closest('[data-chain-overlay-fallback]');
      const visible = area.width > 0 && card.width > 0 && (!fallback || fallback.style.display !== 'none');
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
    const bar = geometry && createPortal(h('div', { className: 'dsc-ui dsc-hero-projectbar', style: { left: geometry.left + 12, top: geometry.top - 37, width: Math.max(120, geometry.width - 24) } },
      h('button', { type: 'button', ref: anchor, className: 'dsc-project-picker', 'aria-haspopup': 'menu', 'aria-expanded': shown, onClick: () => { if (shown) close(); else setOpen(true); } }, h(Icon, { name: 'folder' }), current?.title || '选择项目'), menu), document.body);
    return h(React.Fragment, null, h('span', { ref, 'aria-hidden': true }), bar);
  };
}

const React = require('react');
const { createPortal } = require('react-dom');
const { RiskConfirmation, Button, IconRefreshOutlineRegular } = require('@deepseek-ai/dsh-client-ui-primitives');
const { createSnapshotStore } = require('@deepseek-ai/dsh-client-store');
const h = React.createElement;
const { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useSyncExternalStore } = React;
const PLUGIN_ID = 'dsh-codex-style';

// 自绘图标沿用本项目原型；功能与目录全部来自宿主。
const paths = {
  folder: 'M2.3 6.1c0-.75.6-1.35 1.35-1.35H6.2l1.5 1.6h4.85c.75 0 1.35.6 1.35 1.35v4.9c0 .75-.6 1.35-1.35 1.35h-8.9c-.75 0-1.35-.6-1.35-1.35Z',
  folderOpen: 'M2.1 12.2V4.4c0-.8.6-1.4 1.4-1.4h2.9l1.4 1.6h4c.8 0 1.4.6 1.4 1.4v1M2.1 12.2l2.2-4.8h9.3a.8.8 0 0 1 .7 1.1l-1.8 4a1.5 1.5 0 0 1-1.4.9H3.5a1.4 1.4 0 0 1-1.4-1.2Z',
  chat: 'M13 7.5a5 5 0 0 1-5 5H3l-1 1V7.5a5.5 5.5 0 1 1 11 0Z',
  pencil: 'M8.1 2.8H4.6a2 2 0 0 0-2 2v6.6a2 2 0 0 0 2 2h6.6a2 2 0 0 0 2-2V7.9m-2.3-5.2-5.3 5.3L5 10.4l2.4-.6 5.3-5.3a1.3 1.3 0 0 0-1.8-1.8ZM9.8 3.8l1.8 1.8',
  search: 'M10.5 10.5 14 14M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
  plus: 'M8 3v10M3 8h10',
  chevron: 'm5 6 3 3 3-3',
  back: 'm10 3-5 5 5 5',
  check: 'm3.5 8 3 3 6-6',
  shield: 'M8 1.8 13 4v4.2c0 2.8-2.3 4.8-5 6-2.7-1.2-5-3.2-5-6V4ZM8 5v3.6m0 2.1v.1',
  pin: 'm5 2 6 0-1 4 2 2H9v5l-1 1V8H4l2-2Z',
  archive: 'M3 5.5v6.3c0 .9.7 1.7 1.7 1.7h6.6c1 0 1.7-.8 1.7-1.7V5.5M2.5 2.5h11v3h-11ZM6.2 8h3.6',
  monitor: 'M2 3h12v8H2zM5.5 13h5M8 11v2',
  arrowUpRight: 'M4.8 11.2 11.2 4.8M5.9 4.8h5.3v5.3',
  close: 'M4 4l8 8M12 4l-8 8',
  settings: 'M6.5 2.5 7 1h2l.5 1.5 1.6.9 1.5-.3 1 1.8-1 1.2v1.8l1 1.2-1 1.8-1.5-.3-1.6.9L9 13H7l-.5-1.5-1.6-.9-1.5.3-1-1.8 1-1.2V6.1l-1-1.2 1-1.8 1.5.3ZM10.2 7a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0Z'
};
function Icon({ name, size = 16, ...props }) {
  return h('svg', { viewBox: '0 0 16 16', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, ...props }, h('path', { d: paths[name] || paths.chat }));
}
function useSource(source) {
  const subscribe = useCallback(fn => source.subscribe(fn), [source]);
  const snapshot = useCallback(() => source.getSnapshot(), [source]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
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
      viewport.current.style.setProperty('--dsc-title-duration', Math.max(2.5, overflow / 30) + 's');
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

function makeWorkspaceTree(ctx) {
  return function WorkspaceTree({ query = '', tools = true, active = true, onNavigate }) {
    const catalog = useSource(ctx.sessions.list);
    const workspaces = useSource(ctx.workspaces.list);
    const status = useSource(ctx.uiSession.sessionStatus);
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
    const archived = new Set(workspaces.archivedSessionIds);
    const pinned = new Set(workspaces.pinnedSessionIds);
    const items = catalog.ids.map(id => catalog.byId[id]).filter(s => s && s.origin !== 'subagent' && !s.blank && (showArchived || !archived.has(s.id))).map(s => ({ ...s, sessionId: s.id, title: s.title || s.displayTitle }));
    const currentId = catalog.ids.find(id => (catalog.byId[id]?.retainedBy?.mainView ?? 0) > 0);
    const workspaceOf = id => workspaces.items.find(w => w.sessionIds.includes(id));
    const matches = s => !query.trim() || `${s.title || ''} ${workspaceOf(s.sessionId)?.title || ''}`.toLowerCase().includes(query.trim().toLowerCase());
    const ordered = [...items].sort((a, b) => (Number(b.updatedAt) || Date.parse(b.updatedAt) || 0) - (Number(a.updatedAt) || Date.parse(a.updatedAt) || 0));
    const visible = ordered.filter(matches);
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
      const result = await ctx.sessions.rename(row.sessionId, title);
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
      const activity = pending ? '等待处理' : state?.running ? '运行中' : state?.completionUnread ? '已完成' : relativeTime(s.updatedAt);
      return h('div', { key: s.sessionId, className: 'dsc-thread' + (s.sessionId === currentId && panel.activePanelId === null ? ' is-active' : '') + (archived.has(s.sessionId) ? ' is-archived' : '') + (pinned.has(s.sessionId) ? ' is-pinned' : ''),
        onContextMenu: e => openThreadMenu(e, s), onKeyDown: e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) openThreadMenu(e, s); },
        onPointerEnter: e => enterHover(e.currentTarget, { kind: 'thread', id: s.sessionId, title: s.title || '未命名对话', status: activity, workspaceTitle: workspaceOf(s.sessionId)?.title, path: workspaceOf(s.sessionId)?.path }), onPointerLeave: closeHover },
        h('button', { type: 'button', className: 'dsc-thread-main', 'aria-haspopup': 'menu', onClick: () => { if (archived.has(s.sessionId)) run(() => ctx.uiWorkspace.unarchiveSession(s.sessionId)); else { ctx.uiWorkspace.openSession(s.sessionId); onNavigate?.(); } } },
          h('span', { className: 'dsc-state', 'data-state': pending ? 'pending' : state?.running ? 'running' : state?.completionUnread ? 'done' : 'idle' }, (pending || state?.running || state?.completionUnread) && h(Icon, { name: 'chat', size: 14 })),
          h(ThreadTitle, { title: s.title || '未命名对话' }),
          h('small', { className: 'dsc-thread-time' }, activity)),
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
          pinned.size > 0 && h('section', null, h('div', { className: 'dsc-section-title' }, '置顶'), visible.filter(s => pinned.has(s.sessionId)).map(s => row(s))),
          projectHeading,
          h(ProjectFold, { open: projectsOpen, className: 'dsc-project-list-fold' }, h('div', { className: 'dsc-project-list' }, workspaces.items.map(w => {
            const children = visible.filter(s => w.sessionIds.includes(s.sessionId) && !pinned.has(s.sessionId));
            const open = expanded[w.workspaceId] ?? w.sessionIds.includes(currentId);
            return h('section', { key: w.workspaceId }, h('div', { className: 'dsc-project', onPointerEnter: e => enterHover(e.currentTarget, { kind: 'project', id: w.workspaceId, workspace: w, title: w.title || '未命名项目', count: children.length, path: w.path, pinned: w.pinned === true }), onPointerLeave: closeHover },
              h('button', { type: 'button', className: 'dsc-project-main', onClick: () => { hideHover(); setMenu(null); setProjectMenu(null); setExpanded({ ...expanded, [w.workspaceId]: !open }); }, 'aria-expanded': open }, h(Icon, { name: open ? 'folderOpen' : 'folder' }), h('span', null, w.title || '未命名项目')),
              h('button', { type: 'button', className: 'dsc-row-action', title: '项目菜单', 'aria-label': '项目菜单', 'aria-haspopup': 'menu', 'aria-expanded': projectMenu?.workspaceId === w.workspaceId, onClick: e => { projectAnchor.current = e.currentTarget; setHover(null); setProjectMenu(projectMenu?.workspaceId === w.workspaceId ? null : w); } }, '⋯'),
              h('button', { type: 'button', className: 'dsc-row-action', title: '在此项目新建对话', 'aria-label': '在此项目新建对话', onClick: () => { ctx.uiWorkspace.startSession(w.workspaceId); onNavigate?.(); } }, h(Icon, { name: 'pencil', size: 14 }))),
              h(ProjectFold, { open }, h('div', { className: 'dsc-project-children' }, children.length ? children.map(s => row(s, active && projectsOpen && open)) : h('small', { className: 'dsc-empty' }, '暂无对话'))));
          }))),
          h('div', { className: 'dsc-section-title' }, '最近'), visible.filter(s => !workspaceOf(s.sessionId) && !pinned.has(s.sessionId)).map(s => row(s))),
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

function makePermissionPicker(ctx, directory) {
  return function PermissionPicker({ sessionId, useProjection, locked }) {
    const selection = useProjection('permissions');
    const catalog = useSource(directory.store);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [acknowledged, setAcknowledged] = useState(false);
    const [help, setHelp] = useState(false);
    const [error, setError] = useState('');
    const anchor = useRef(null);
    const alive = useRef(true);
    useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
    useEffect(() => { setOpen(false); setConfirmation(null); setAcknowledged(false); }, [catalog.revision, locked, sessionId]);
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
      if (value === 'danger-full-access' || value === 'auto') { setOpen(false); setAcknowledged(false); setConfirmation(value); return; }
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
      confirmation && h(RiskConfirmation, { open: true, title: confirmation === 'auto' ? '启用自动审查' : '启用完全访问权限',
        description: confirmation === 'auto' ? '实验性自动审查会在完整沙箱访问下处理审批。请确认你理解自动审查的执行范围。' : 'DSH 将获得完整文件系统和命令执行访问，且不再逐项请求批准。',
        acknowledgeLabel: '我理解并接受此权限范围', cancelLabel: '取消', closeLabel: '关闭', confirmLabel: '确认启用', acknowledged, disabled: locked || busy,
        onAcknowledgedChange: setAcknowledged, onCancel: () => setConfirmation(null), onConfirm: () => { if (!acknowledged) return; const value = confirmation; setConfirmation(null); submit(value); } }));
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
      levels.map((x, i) => h('span', { key: x.id ?? 'default', className: 'dsc-tick' + (i <= preview ? ' is-on' : ''), style: { left: `calc(14px + (100% - 28px) * ${count > 1 ? i / (count - 1) : 0})` } })),
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
    return () => { style.remove(); if (previous === null) document.body.removeAttribute('data-dsh-codex-style'); else document.body.setAttribute('data-dsh-codex-style', previous); };
  }, 'codex-style: stylesheet');
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
  ctx.effect(() => { updates.start(); return () => updates.dispose(); }, 'codex-style: automatic update check');
  ctx.slots.inject('plugins.detail.actions', () => ctx.slots.register({ name: 'plugins.detail.actions', id: 'codex-style:check-update' }, props => h(PluginUpdateAction, { ...props, updates })));
  ctx.inject(['pluginNavigation'], scope => scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:update-notice' }, () => h(PluginUpdateNotice, { updates, onOpen: () => scope.reflect.get('pluginNavigation').openBundle(PLUGIN_PACKAGE) }))));
  // 等各区域自己的服务就绪；权限 RPC 的命名空间不能由 remote 根服务存在来推断。
  ctx.inject(['sessions', 'uiSession', 'workspaces', 'uiWorkspace', 'layout', 'shortcuts', 'remote', 'locale'], scope => {
    const sidebar = createSidebarPresentation();
    scope.effect(() => () => sidebar.dispose(), 'codex-style: sidebar presentation');
    register(scope, 'sidebar.workspaces', makeSidebarChrome(scope, sidebar));
    scope.slots.inject('shell.overlay', () => scope.slots.register({ name: 'shell.overlay', id: 'codex-style:shell' }, makeShellChrome(scope, sidebar)));
    register(scope, 'conversation.header.leading', makeCollapsedNewChat(scope));
  });
  ctx.inject(['locale', 'remote', 'remote.account'], scope => register(scope, 'settings.launcher', makeGearLauncher(scope)));
  ctx.inject(['workspaces'], scope => {
    register(scope, 'conversation.hero.brand.mark', EmptyHero);
    register(scope, 'conversation.hero.workspace', makeHeroWorkspace(scope));
  });
  // 模型控件：主动探测 modelDirectories 并重试注册，避免因服务就绪通知延迟而静默缺失、回退到宿主原生控件。
  // directoryFor / select 内部会访问 session Remote；注入列表与宿主模型选择插件保持一致。
  ctx.inject(['sessions', 'slots', 'locale', 'remote', 'remote.session'], scope => {
    let mounted = false;
    const mount = () => {
      if (mounted) return true;
      const directories = scope.get('modelDirectories');
      console.warn('[codex-style] modelDirectories 探测：', Boolean(directories));
      if (!directories) return false;
      const Picker = makeModelPicker(scope);
      scope.slots.inject('conversation.input.model', () => {
        const tryRegister = priority => scope.slots.register({
          name: 'conversation.input.model',
          priority,
          inject: sessionId => ({ directory: directories.directoryFor(sessionId) })
        }, Picker);
        try {
          // single slot 按最低 priority 渲染：取现有注册的最低值再低 1，才能覆盖宿主原生控件。
          const registered = scope.slots.entries('conversation.input.model').map(entry => entry.options?.priority ?? 0);
          let priority = Math.min(0, ...registered) - 1;
          let dispose;
          try {
            dispose = tryRegister(priority);
          } catch (error) {
            priority = Math.min(priority, -1000);
            dispose = tryRegister(priority);
          }
          console.warn('[codex-style] 自绘模型控件已注册，priority', priority);
          return dispose;
        } catch (error) {
          console.error('[codex-style] 自绘模型控件注册失败', error);
          return () => {};
        }
      });
      mounted = true;
      return true;
    };
    if (mount()) return;
    let attempts = 0;
    const timer = setInterval(() => { attempts += 1; if (mount() || attempts > 40) clearInterval(timer); }, 250);
    scope.effect(() => () => clearInterval(timer), 'codex-style: model directory probe');
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
    const sync = () => {
      frame = 0;
      const bar = document.querySelector('[data-slot="conversation.composer.bar"]');
      if (!bar) return;
      let width = 0;
      for (const card of bar.querySelectorAll('[class*="_card"]')) width = Math.max(width, card.getBoundingClientRect().width);
      if (width <= 0) width = bar.getBoundingClientRect().width;
      if (width > 0) document.documentElement.style.setProperty('--dsc-composer-visual-width', `${Math.round(width)}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    for (const el of document.querySelectorAll('[data-slot="conversation.composer.bar"], [data-conversation-content]')) observer.observe(el);
    window.addEventListener('resize', schedule);
    const timer = setInterval(schedule, 1200);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      clearInterval(timer);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--dsc-composer-visual-width');
    };
  }, 'codex-style: composer width sync');
}
exports.name = 'codex-style';
exports.inject = ['slots', 'theme'];
exports.apply = apply;

// 只读检查与新版提醒；固定 scoped 身份，不能查询 npm 上同名的第三方包。
const UPDATE_PACKAGE = '@xinxing1708/dsh-codex-style';
const UPDATE_REGISTRIES = [
  { id: 'npmmirror', label: 'npmmirror 中国镜像', url: 'https://registry.npmmirror.com/' },
  { id: 'tencent', label: '腾讯云 npm 镜像', url: 'https://mirrors.cloud.tencent.com/npm/' },
  { id: 'npm', label: 'npm 官方源', url: 'https://registry.npmjs.org/' }
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

async function checkPluginUpdate(currentVersion, { signal, fetcher = globalThis.fetch, timeoutMs = 6500 } = {}) {
  signal?.throwIfAborted();
  if (!updateVersionParts(currentVersion)) return { state: 'error', message: '无法读取当前插件版本，请重新打开插件详情。' };
  // 并行读取多个源，取已返回的最高版本，避免先响应的滞后镜像遮住新版。
  const sources = await Promise.all(UPDATE_REGISTRIES.map(async registry => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal?.addEventListener('abort', abort, { once: true });
    const timer = setTimeout(abort, timeoutMs);
    try {
      const response = await fetcher(registry.url + UPDATE_PACKAGE.replace('/', '%2F') + '/latest', {
        signal: controller.signal, mode: 'cors', credentials: 'omit', cache: 'no-store', redirect: 'error', referrerPolicy: 'no-referrer', headers: { Accept: 'application/json' }
      });
      if (response.status === 404) return { ...registry, status: 'missing' };
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const metadata = await response.json();
      if (metadata.name !== UPDATE_PACKAGE || !updateVersionParts(metadata.version)) throw new Error('无效的包元数据');
      return { ...registry, status: 'ok', version: metadata.version };
    } catch {
      return { ...registry, status: 'error' };
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
    }
  }));
  signal?.throwIfAborted();
  const available = sources.filter(source => source.status === 'ok');
  if (!available.length) {
    const unpublished = sources.find(source => source.id === 'npm')?.status === 'missing';
    return { state: unpublished ? 'unpublished' : 'error', sources, message: unpublished ? '该包尚未发布到 npm，或已被撤回，暂时无法查询版本。' : '暂时无法从更新源读取版本，请稍后重试。' };
  }
  const latest = available.reduce((best, source) => {
    const compared = compareUpdateVersions(source.version, best.version);
    return compared > 0 || (compared === 0 && source.id === 'npm') ? source : best;
  });
  const comparison = compareUpdateVersions(latest.version, currentVersion);
  return { state: comparison > 0 ? 'update' : comparison < 0 ? 'ahead' : 'current', latestVersion: latest.version, source: latest.label, mirror: latest.id !== 'npm', sources };
}

const UPDATE_CACHE_KEY = 'dsh-codex-style:update-check:v1';
const UPDATE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const UPDATE_RETRY_MS = 60 * 60 * 1000;
function createPluginUpdateService(currentVersion, { query = checkPluginUpdate } = {}) {
  let lastSuccess = 0, retryAt = 0, timer, pending, controller, started = false, disposed = false;
  let cached = {};
  try { cached = JSON.parse(window.localStorage.getItem(UPDATE_CACHE_KEY) || '{}') || {}; } catch { /* 存储不可用时仍可在本次运行检查。 */ }
  const validCache = cached.currentVersion === currentVersion && Number.isFinite(cached.checkedAt) && cached.checkedAt > 0 && cached.checkedAt <= Date.now() && updateVersionParts(cached.latestVersion);
  if (validCache) lastSuccess = cached.checkedAt;
  const comparison = validCache ? compareUpdateVersions(cached.latestVersion, currentVersion) : null;
  const store = createSnapshotStore({
    state: validCache ? comparison > 0 ? 'update' : comparison < 0 ? 'ahead' : 'current' : 'idle',
    checking: false,
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
  async function runScheduled() {
    if (disposed) return;
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
    pending = Promise.resolve().then(() => query(currentVersion, { signal })).then(result => {
      if (disposed || signal.aborted) return result;
      store.set({ ...store.getSnapshot(), message: undefined, ...result, checking: false });
      if (['current', 'update', 'ahead'].includes(result.state)) { lastSuccess = Date.now(); retryAt = 0; save(); }
      else retryAt = Date.now() + UPDATE_RETRY_MS;
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
    store, check,
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
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVisible);
    }
  };
}

function PluginUpdateNotice({ updates, onOpen }) {
  const state = useSource(updates.store);
  if (compareUpdateVersions(state.latestVersion, PLUGIN_VERSION) !== 1 || state.dismissedVersion === state.latestVersion) return null;
  return h('aside', { className: 'dsc-ui dsc-update-notice', role: 'status', 'aria-live': 'polite', 'aria-label': 'Codex Style 更新提醒' },
    h('div', { className: 'dsc-update-heading' }, h('strong', null, 'Codex Style 有新版本'), h('button', { type: 'button', className: 'dsc-update-close', 'aria-label': '忽略此版本提醒', onClick: () => updates.dismiss() }, h(Icon, { name: 'close' }))),
    h('p', { className: 'dsc-update-note' }, 'v' + PLUGIN_VERSION + ' → v' + state.latestVersion),
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
  const busy = result.checking;
  useEffect(() => () => { if (!updates) service.dispose(); }, [service, updates]);
  const close = useCallback(() => { setOpen(false); }, []);
  const check = async () => {
    setOpen(true);
    await service.check();
  };
  const messages = { checking: '正在检查更新…', current: '已是最新版本', ahead: '当前版本较新', update: '发现新版本', unpublished: '暂未查到发布版本', error: '检查失败' };
  return h('span', { className: 'dsc-update-control', 'data-update-state': busy ? 'checking' : result.state },
    h(Button, { variant: 'outline', size: 'sm', ref: anchor, disabled: busy, icon: h(IconRefreshOutlineRegular, { size: 13, className: busy ? 'dsc-update-spin' : undefined }), onClick: check, 'aria-haspopup': 'dialog', 'aria-expanded': open }, busy ? '检查中…' : '检查更新'),
    open && h(Popover, { anchor, onClose: close, label: '检查插件更新', role: 'dialog', width: 336, className: 'dsc-update-panel' },
      h('div', { className: 'dsc-update-heading' }, h('strong', null, '插件更新'), h('button', { type: 'button', className: 'dsc-update-close', onClick: close, 'aria-label': '关闭更新检查' }, h(Icon, { name: 'close' }))),
      h('p', { className: 'dsc-update-message', role: 'status', 'aria-live': 'polite', 'data-state': result.state }, messages[busy ? 'checking' : result.state]),
      h('dl', { className: 'dsc-update-versions' }, h('dt', null, '当前版本'), h('dd', null, currentVersion ? 'v' + currentVersion : '未知'), result.latestVersion && h(React.Fragment, null, h('dt', null, busy || ['error', 'unpublished'].includes(result.state) ? '上次查到' : '最新版本'), h('dd', null, 'v' + result.latestVersion))),
      result.source && h('p', { className: 'dsc-update-note' }, '来源：' + result.source, result.mirror && h('span', null, '镜像同步可能稍有延迟。')),
      result.message && h('p', { className: 'dsc-update-note' }, result.message),
      result.state === 'update' && h('p', { className: 'dsc-update-note' }, '新版本已发布，请按安装说明更新插件。'),
      !busy && h('button', { type: 'button', className: 'dsc-update-retry', onClick: check }, '重新检查')));
}

    return module.exports;
  }
});
