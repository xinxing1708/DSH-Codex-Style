import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Script } from 'node:vm';

// 个人主页只读宿主公开数据：账号资料/钱包 + 本地会话目录；Token 与消费金额明确交给平台。
const [profileSource, chrome, css, bundle] = await Promise.all([
  readFile(new URL('../src/profile.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/chrome.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/style.css', import.meta.url), 'utf8'),
  readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
]);

test('个人页从齿轮菜单以浮层打开', () => {
  assert.match(profileSource, /function installProfilePage\(ctx\)/, '安装入口');
  assert.match(profileSource, /name: 'shell\.overlay', id: 'codex-style:profile'/, '注册浮层');
  assert.match(profileSource, /function openProfilePanel\(\)/, '打开函数');
  assert.match(chrome, /title: '个人', detail: '用量与统计'/, '齿轮菜单入口');
  assert.match(chrome, /openProfilePanel\(\)/, '点击打开浮层');
  assert.match(css, /\.dsc-profile-sheet/, '浮层样式');
});

test('只展示真实可得数据，消费金额交给平台', () => {
  assert.match(profileSource, /ctx\.remote\.account\.getProfile\(client\)/, '读取资料');
  assert.match(profileSource, /ctx\.remote\.account\.getBalance\(client\)/, '读取余额');
  assert.match(profileSource, /formatProfileMoney/, '余额格式化');
  assert.match(profileSource, /platform\.deepseek\.com\/usage/, '平台用量页入口');
  assert.match(profileSource, /Token 用量与消费明细由 DeepSeek 平台统计/, '不伪造消费金额');
  assert.doesNotMatch(profileSource, /累计消费/, '没有编造的累计消费卡片');
});

test('活动统计：按天聚合、连续天数、日历网格', async () => {
  const window = { __ModuleLoader__: { load: definition => { window.__definition = definition; } } };
  const document = { body: {}, head: { appendChild() {} }, documentElement: {} };
  new Script(bundle.replace('    return module.exports;', 'module.exports.fixture = { buildProfileActivity, buildProfileStreaks, buildProfileGrid }; return module.exports;'), { filename: 'dsh-codex-style/client.js' })
    .runInNewContext({ window, document, console: { warn() {}, error() {} } });
  const factory = window.__definition.factory;
  const plugin = factory(name => {
    if (name === 'react') return { Component: class {} };
    if (name === '@deepseek-ai/dsh-client-store') return { createSnapshotStore: initial => ({ getSnapshot: () => initial, set() {}, subscribe: () => () => {} }) };
    return {};
  });
  const { buildProfileActivity, buildProfileStreaks, buildProfileGrid } = plugin.fixture;

  const today = new Date();
  const iso = daysAgo => new Date(today.getTime() - daysAgo * 86400000);
  const activity = buildProfileActivity([
    { id: 'a', updatedAt: iso(0) }, { id: 'b', updatedAt: iso(0) }, { id: 'c', updatedAt: iso(1) },
    { id: 'd', updatedAt: iso(3) }, { id: 'e', updatedAt: null }
  ]);
  assert.equal([...activity.values()].reduce((sum, value) => sum + value, 0), 4, '按天累计会话数');
  assert.equal(activity.size, 3, '三天有活动');

  const streaks = buildProfileStreaks([...activity.keys()]);
  assert.equal(streaks.current, 2, '今天与昨天算连续两天');
  assert.equal(streaks.longest, 2, '最长连续两天');

  const grid = buildProfileGrid(activity, today);
  assert.ok(grid.length >= 50 && grid.length <= 58, '约 12 个月的周数');
  assert.ok(grid.every(week => week.length === 7), '每周 7 天');
  assert.ok(grid.flat().some(day => day.count === 2), '网格包含当天计数');
  assert.ok(grid.flat().filter(day => day.future).length < 7, '只有末尾少量未来格');
});
