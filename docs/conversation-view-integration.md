# 第三方视图接入 `conversation.view`

本插件的白色滑块胶囊不维护自己的视图清单。它只读取宿主（DSH）已经渲染的 `role="tab"` 按钮和 `conversation.view` 列表槽；第三方插件按宿主公开契约注册视图后，胶囊会随宿主实际可见的固定项自然增减。

## 最小可用注册

宿主自己的客户端运行器文档给出的最小写法如下（`ctx` 是插件的 Cordis 上下文）：

```js
// 示例假设模块已按 DSH client 插件方式取得 React（const React = require('react')）。
return {
  inject: ['slots'],
  apply(ctx) {
    ctx.slots.inject('conversation.view', () => ctx.slots.register(
      {
        name: 'conversation.view',
        id: 'my-view',
        order: 100,
        label: '我的视图'
      },
      () => React.createElement('div', null, 'hello')
    ));
  }
};
```

对应本机 DSH 0.2.2-rc.1 的宿主实现，实际使用到的字段与语义是：

- `name`：固定为 `conversation.view`；该槽在宿主声明中为 `list`、`scope: 'session'`。
- `id`：必填且稳定的视图标识。宿主用它做选中、固定/取消固定和视图内容匹配。
- `order`：可选排序值；宿主按注册项顺序生成胶囊。例如宿主自带对话为 0、轨迹为 10，`dsh-context` 的上下文为 20、编队为 30。不要依赖其它插件的具体数字。
- `label`：字符串，或返回字符串的函数。宿主通过 `resolveSlotLabel(entry.options.label)` 解析；未提供或返回 `undefined`/`null` 时回退到 `id`。标签会经过宿主的 88px 省略规则。
- `locale`、`inject(sessionId)`、`children` 等是宿主 slot 注册的通用字段；如果视图需要会话数据，可以像宿主自带视图一样在 `inject(sessionId)` 中返回组件 props。最小视图可以完全不用它们。

视图组件会收到宿主 `renderSlot('conversation.view', ...)` 传入的四个 props：

```js
{ inspectCall, viewRequest, openView, completeViewRequest }
```

其中 `openView` 可用于切换到本插件的另一个视图；不需要这些能力时忽略即可，不要自行伪造会话或视图状态。

## 本插件负责什么

- 只给宿主已经渲染的 `[data-conversation-tabs]` 行和 `role="tab"` 按钮添加可释放的布局标记。
- 根据 `conversation.session.header.actions` 的实际占用和 header 可用宽度，反推宿主 `(行宽 - 48) / 120` 的可见项预算，让固定项在有空间时自然出现。
- 白色滑块使用选中标签的实测 `getBoundingClientRect()` 位置与宽度；选中项被固定在“更多”菜单时不显示滑块。
- 长标签仍由宿主的 `tabLabel` 规则做 88px 省略；胶囊不硬编码某个插件的视图数量或文字。
- 注册、排序、固定/取消固定、选中、卸载仍由宿主完成；本插件不写固定配置，也不替换按钮回调。

## 溢出与宿主依赖

宿主只有在 `conversation.session.header.views.actions` 槽有注册项时（标准安装由 `@deepseek-ai/dsh-client-ui-entry-customization` 提供）才计算 `visibleViewLimit` 并把放不下的视图放进“更多会话视图”菜单。若该宿主组件被禁用，宿主要求所有固定视图都可见，本插件会保留全部视图而不是擅自隐藏；此时第三方应控制自己的视图数量或标签长度。

本项目不在产品代码里识别任何具体第三方的 `id` 或标签。上面的 `dsh-context` 顺序仅用于说明宿主注册表的实际排序，不是兼容性白名单。
