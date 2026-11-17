// 真实 rc.3 MarkdownText + 本插件流式遮罩回归。
// 通过 body-markdown-fixture.mjs 驱动安装包里的 AssistantMarkdown，不请求模型或启动 DSH。
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const fixture = path.join(root, 'scripts/fixtures/body-markdown-fixture.mjs');
const archive = process.env.DSH_ASAR || '';
const require = createRequire(import.meta.url);
const playwright = [process.env.DSC_PLAYWRIGHT_PATH, process.env.CODEX_PLAYWRIGHT_MODULE, 'playwright',
  path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')]
  .filter(Boolean).find(candidate => { try { require.resolve(candidate); return true; } catch { return false; } });
const skip = !fs.existsSync(fixture) ? `missing fixture: ${fixture}`
  : !archive || !fs.existsSync(archive) ? 'set DSH_ASAR to an installed DSH app.asar'
    : !playwright ? 'Playwright unavailable; set DSC_PLAYWRIGHT_PATH' : false;

function runFixture() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [fixture], {
      cwd: path.resolve(root, '..'),
      env: {
        ...process.env,
        DSH_ASAR: archive,
        DSC_PLAYWRIGHT_PATH: playwright,
        HOST_COMPACT: '1',
        HOST_OFF: '',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '', stderr = '';
    child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', code => {
      if (code !== 0) return reject(new Error(`host fixture exited ${code}: ${stderr || stdout}`));
      try { resolve(JSON.parse(stdout.trim())); }
      catch (error) { reject(new Error(`host fixture returned invalid JSON: ${error.message}\n${stdout}`)); }
    });
  });
}

test('real Markdown links keep the stream clipped and visibly masked', { skip }, async t => {
  const result = await runFixture();
  t.diagnostic(`host=${result.hostVersion}; source=${result.source}; root=${result.after.root?.slice(0, 260)}`);
  assert.deepEqual(result.errors, []);
  // rc.3 MarkdownText 给普通链接附加 aria-hidden SVG 图标；装饰图标不应使文字跳过揭示。
  assert.match(result.before.root, /<a href="https:\/\/example\.invalid"[^>]*><svg[^>]*aria-hidden="true"/);
  assert.deepEqual(result.before.icon, { ariaHidden: 'true', role: null });
  assert.ok(result.after.bodyHeight < result.after.bodyScrollHeight,
    `real linked paragraph bypassed clipping: ${result.after.bodyHeight}/${result.after.bodyScrollHeight}`);
  assert.ok(result.after.edgeRect && result.after.edgeViewportRect && result.after.edgeOpacity === '1' && result.after.edgeDisplay !== 'none',
    'real linked paragraph did not create a visible reveal mask');
});
