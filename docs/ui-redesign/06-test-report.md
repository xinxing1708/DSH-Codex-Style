# 06 · 测试报告（Test Report）

## 1. 环境

| 项 | 值 |
|---|---|
| 宿主 | DSH Desktop 0.2.2-rc.3（Windows 11） |
| Node | v24.21.0（DSH 运行时自带） |
| 运行方式 | `node --test --test-isolation=none <files>`（沙箱禁止子进程管道，`node --test` 默认隔离会 EPERM） |
| 浏览器控制 | 不可用（无 Playwright / CDP），视觉验收未执行 |

## 2. 构建

```text
$ node scripts/build.mjs
Built @xinxing1708/dsh-codex-style@0.2.6: client 974371 bytes, navigation 260 bytes
```

构建脚本对产物执行 `new Script(...)` 语法校验；失败会直接抛错。

## 3. 测试结果

| 套件 | 结果 |
|---|---|
| test-client | 通过 |
| test-theme | 通过 |
| test-header-tabs | 通过 |
| test-skills | 通过 |
| test-navigation | 通过 |
| test-host-signatures | 通过 |
| test-community-environment | 通过 |
| test-theme-pack | 5 通过 |
| test-appearance | 4 通过（新增密度、侧栏宽度断言） |
| test-image-annotations / -host / -integration | 100 通过 / 3 跳过 |
| **合计** | **180 项：177 通过 / 3 跳过 / 0 失败** |

与重构前基线（177 通过 / 3 跳过 / 0 失败）一致，无新增失败。

## 4. 无法执行项（如实记录）

| 项目 | 原因 | 影响 |
|---|---|---|
| `scripts/test-install.mjs` 的 `engines.dsh` 用例 | 沙箱临时路径 8.3 别名导致断言差异（重构前即失败） | 未改安装器，不影响本次 UI 改动 |
| `scripts/test-retirement.mjs` | 需要 `npm pack` 子进程管道，沙箱 EPERM | 未改发行流程 |
| 实机截图 / 像素对比 | 环境无浏览器控制 | 视觉验收见 07 的「未验证」清单 |
| 1280×720 等五档分辨率、100/125/150% DPI | 同上，无法切换窗口尺寸与缩放 | 仅按代码中的响应式规则与宿主既有行为推断 |
| 启动时间 / 内存 / 滚动帧率 | 无基准设施，且无法驱动宿主窗口 | 未声称任何性能数字 |

## 5. 新增断言

1. 外观页注册为 `settings.section`（id `codex-appearance`），齿轮菜单入口跳转。
2. Rose Pine 预设三元组与图 4 一致；预设 ≥ 10 套且含「DeepSeek 默认」。
3. 三色推导同时产出 `--cx-*` 与 `--dsw-*`，含气泡令牌。
4. 运行时：密度写 `data-dsc-density`，侧栏宽度写宿主 store 与本地存储，复位清理。
