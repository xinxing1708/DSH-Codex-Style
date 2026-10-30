import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { apply as applySkillsHost } from '../src/skills-host.mjs';
import { applyEnvironmentService } from '../src/community-environment.mjs';

// 与宿主 dsh-api-gateway methodParameterNames 同规则：参数表只能是不重复的标识符，
// 不允许默认值、解构或 rest，否则 Host 端调用时抛 gateway/signature-invalid。
function gatewayParameterNames(fn) {
  const source = Function.prototype.toString.call(fn);
  const open = source.indexOf('(');
  const close = source.indexOf(')', open + 1);
  const body = source.slice(open + 1, close).trim();
  if (body === '') return [];
  const names = body.split(',').map(part => part.trim());
  for (const name of names) assert.match(name, /^[$A-Z_a-z][$\w]*$/u, `invalid SRC parameter "${name}"`);
  assert.equal(new Set(names).size, names.length);
  return names;
}

test('skills host Remote methods use gateway-valid parameter lists', () => {
  const marked = [];
  class TypertRemoteService { constructor(ctx) { this.ctx = ctx; } }
  const Remote = (fn, context) => { marked.push([context.name, fn]); };
  applySkillsHost({ plugin() {} }, { Remote, TypertRemoteService });
  assert.deepEqual(marked.map(([name]) => name), ['catalog', 'content']);
  for (const [name, fn] of marked) assert.deepEqual(gatewayParameterNames(fn), ['request', 'signal'], name);
});
test('environment host Remote registers a gateway-valid zero-argument status method', () => {
  const marked = [];
  const registered = [];
  class TypertRemoteService {}
  const Remote = (fn, context) => { marked.push([context.name, fn]); };
  const ctx = { profileContext: { home: join(tmpdir(), 'dsh-codex-signature-fixture'), installAnchor: 'ignored-anchor' }, plugin: plugin => registered.push(plugin) };
  applyEnvironmentService(ctx, { Remote, TypertRemoteService });
  assert.deepEqual(marked.map(([name]) => name), ['status']);
  for (const [name, fn] of marked) assert.deepEqual(gatewayParameterNames(fn), [], name);
  assert.equal(registered.length, 1, 'environment service must be mounted as a plugin');
  // 缺标记时 fail closed：绝不把未知环境当社区。
  assert.deepEqual(new registered[0]({}).status(), { community: false });
});
