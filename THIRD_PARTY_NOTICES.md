# 第三方说明

本插件由社区独立开发，与 OpenAI 或 DeepSeek 无关联，未获其赞助或背书。OpenAI、Codex、DeepSeek 等名称及品牌归各自权利人所有；此处用于描述界面风格和宿主兼容性，不表示商标授权。

## DeepSeek Harness 品牌图

`assets/dsh-mark.png` 从 DeepSeek Harness 公开源码中的应用图标生成：提取鲸鱼区域、转成白色透明剪影并缩小。它仅用于已安装 DSH 内的宿主品牌识别，不作为本插件的独立官方身份标识。

- 来源：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。
- 固定版本：`687f282e8625c6b8d11ff58211a90524be2e4317`。
- 源文件：`apps/desktop/resources/icon.png`。
- 源文件 Git blob SHA：`d7b136f2bd8b8f15b632904826629546b23f2ebe`。
- 版权：Copyright (c) 2026 DeepSeek。
- 许可：MIT，完整文本随附于 `licenses/DeepSeek-Harness-LICENSE`；该说明同时适用于编入 `lib/client.js` 的图片副本。
- 品牌使用遵循上游 [品牌素材使用规范](https://github.com/deepseek-ai/deepseek-harness/blob/687f282e8625c6b8d11ff58211a90524be2e4317/BRAND_GUIDELINES.zh.md)。

## dsh-theme 主题包数据

`assets/themes.data.json` 取自社区主题包 [dsh-theme](https://github.com/mux9056-bot/dsh-theme) 1.0.1 的 `lib/themes.data.json`，包含 30 套配色的名称、简介、色卡与 CSS 令牌；构建时只读取其中的 `--dsw-*` 令牌值，并据此生成 Codex 侧的 `--cx-*` 映射（`scripts/theme-map.mjs`）。本插件不复制其界面组件、设置行实现或构建脚本。

- 来源：[mux9056-bot/dsh-theme](https://github.com/mux9056-bot/dsh-theme)。
- 固定版本：`1.0.1`。
- 版权：Copyright the dsh-theme authors。
- 许可：Apache License 2.0，完整文本随附于 `licenses/dsh-theme-LICENSE`；该说明同时适用于编入 `lib/client.js` 的主题数据副本。

## 运行依赖与界面参考

React、客户端模块与宿主服务由 DSH 的模块加载器提供，本包没有捆绑这些第三方运行库。图标、组件及样式由本项目实现；尺寸、色值与交互节奏参考 Codex 桌面界面测量，不随包分发 OpenAI 截图、录屏、字体、声音或官方图标。

设计参数整理时参考了 [codex-ui-kit](https://github.com/JaminZhou/codex-ui-kit) 的数值资料；本项目不引入该库或复制其组件实现。
