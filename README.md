# DSH Codex Style

为 **DeepSeek Harness（DSH）** 提供 Codex 桌面端风格的深色主题。

当前版本 **0.1.7**，适配 **Windows DSH 0.2.1-rc.2 / rc.3**。

## 功能

- **主题界面（主模块）**：Codex 风格的导航、可收起侧栏和输入区，支持项目/会话搜索与管理、模型和权限选择、思考强度滑条与 MAX 动效、会话运行/完成提示，以及检查更新、自动下载、下载进度和确认安装。保留 DSH 原生编辑器、附件、工具调用与审批流程。

- **Codex 风格工作规范（可选子模块，默认关闭）**：额外加入工作规范提示词，引导模型明确任务边界、减少额外改动、区分审查与执行、持续中文沟通并按证据交付。用户原有的 `AGENTS.md` 继续生效，不会被替换或改写；实际效果取决于模型遵循。

  开关支持热生效，作用于后续模型请求；如 DSH 提示需要重启，请重启后使用。关闭不会撤回已发送到模型的提示词，也不会回滚同一对话已产生的内容；正在进行的请求不受影响，切换后建议新建对话。

- **Codex 正文效果（可选子模块，默认开启）**：显示每轮顶部「已处理」耗时和分割线，增加操作流光、步骤展开动效及铅笔、终端和图像图标；展开箭头悬停时显示。思考不显示前导图标，实时思考内容隐藏，完成后仍可展开查看。需同时开启主模块，关闭后恢复 DSH 原有正文呈现。

- **Codex 顶部重绘（可选子模块，默认开启）**：会话顶部采用标题与右侧工具在上、模式/智能体/后台任务与视图切换在下的布局；「对话 / 轨迹」使用白色滑块胶囊，更多视图使用四格图标。与正文效果独立，需同时开启主模块；关闭后恢复 DSH 原生顶部布局和视图样式。

在「自定义 → 插件 → 本插件详情 → 包含的组件」分别管理三个子模块。主界面、顶部重绘和正文效果默认开启，工作规范提示词注入默认关闭；升级时保留用户已经保存的开关选择。

## 安装

在 DSH「自定义 → 插件 → 添加插件」中输入 `@xinxing1708/dsh-codex-style`；也可从 [发行页面](https://github.com/xinxing1708/DSH-Codex-Style/releases/tag/v0.1.7) 下载 Windows ZIP，退出 DSH 后运行 `install.cmd`（需要 Node.js 20+），完成后重新启动 DSH。

从 0.1.6 起，发现新版后会自动下载，下载完成后点击「立即安装」，重启 DSH 生效。旧版本先按现有安装方式升级到 0.1.6；脚本如提示无法识别现有配置，请先保留原配置并核对安装来源。源码构建运行 `npm run build`，版本变更见 [更新记录](CHANGELOG.md)。

## 效果预览

新对话首页效果<img width="1911" height="1224" alt="image" src="https://github.com/user-attachments/assets/690fd8cb-3973-46f5-a3a8-46d516b98379" />
搭配提示词注入后的deepseek v4.1 flash 1017任务过程效果<img width="1918" height="1222" alt="image" src="https://github.com/user-attachments/assets/23d6e604-c6ef-4c00-b2d5-d81b1995bbfb" />
codex正文风格打开后样式<img width="1910" height="1222" alt="image" src="https://github.com/user-attachments/assets/0f40145d-87f9-4e9b-8317-e56caa4d7561" />
侧边栏收起后鼠标悬停在导航栏图标时悬浮卡片效果<img width="1905" height="1224" alt="image" src="https://github.com/user-attachments/assets/86a2e1a6-2e4b-4cd3-ab8a-68791cf1d16c" />
模型思考强度选择效果<img width="1909" height="1215" alt="image" src="https://github.com/user-attachments/assets/191614b4-3716-4213-bb94-1c18ae919b5f" />
<img width="1899" height="1222" alt="image" src="https://github.com/user-attachments/assets/d70dd2c6-d8a5-4838-854a-87e5a72bc247" />


## 开发验证

首次检出运行 `npm ci`，修改源码后执行 `npm run build`，再运行 `npm test`。测试使用临时 profile 检查安装、更新和回退，不改日常 DSH 配置。

## 许可与致谢

自研代码使用 [MIT License](LICENSE)。感谢项目贡献者及 `yuehuawu416-cmyk` 的修复，品牌素材说明见 [第三方说明](THIRD_PARTY_NOTICES.md)。

本项目为社区独立插件，与 OpenAI 或 DeepSeek 无关联，未获其赞助或背书。
