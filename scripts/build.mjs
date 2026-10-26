import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [manifest, source, updateSource, chromeSource, ownCss, tokens, chromeCssSource, icons, mark] = await Promise.all([
  readFile(resolve(root, 'package.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'src/client.js'), 'utf8'),
  readFile(resolve(root, 'src/update.js'), 'utf8'),
  readFile(resolve(root, 'src/chrome.js'), 'utf8'),
  readFile(resolve(root, 'src/style.css'), 'utf8'),
  readFile(resolve(root, 'assets/tokens.css'), 'utf8'),
  readFile(resolve(root, 'assets/chrome.css'), 'utf8'),
  readFile(resolve(root, 'assets/icons.json'), 'utf8').then(JSON.parse),
  readFile(resolve(root, 'assets/dsh-mark.png'))
]);
// 构建输入均随源码提供；不读取个人原型、配置或联网下载资源。
const chromeCss = chromeCssSource.replace(/\.(rail[\w-]*|sidebar[\w-]*|brand[\w-]*|new-chat)\b/g, (_, name) => '.dsc-' + name);
const css = tokens.replace(':root', 'body[data-dsh-codex-style]') + '\n' + chromeCss + '\n' + ownCss;
const updateCommon = await readFile(resolve(root, 'src/update-common.mjs'), 'utf8');
const bodySource = await readFile(resolve(root, 'src/body.js'), 'utf8');
const bodyCss = await readFile(resolve(root, 'src/body.css'), 'utf8');
const headerSource = await readFile(resolve(root, 'src/header.js'), 'utf8');
const headerCss = await readFile(resolve(root, 'src/header.css'), 'utf8');
const output = `window.__ModuleLoader__.load({\n  id: ${JSON.stringify(manifest.name)},\n  factory: function(require) {\n    'use strict';\n    const CSS_TEXT = ${JSON.stringify(css)};\n    const BODY_CSS_TEXT = ${JSON.stringify(bodyCss)};\n    const HEADER_CSS_TEXT = ${JSON.stringify(headerCss)};\n    const PROTOTYPE_ICONS = ${JSON.stringify(icons)};\n    const BRAND_MARK = ${JSON.stringify('data:image/png;base64,' + mark.toString('base64'))};\n    const PLUGIN_VERSION = ${JSON.stringify(manifest.version)};\n    const PLUGIN_PACKAGE = ${JSON.stringify(manifest.name)};\n    const module = { exports: {} };\n    const exports = module.exports;\n${chromeSource}\n${source}\n${updateCommon.replace(/^export /gm, '')}\n${updateSource}\n${bodySource}\n${headerSource}\n    return module.exports;\n  }\n});\n`;
new Script(output, { filename: 'dsh-codex-style/client.js' });
await mkdir(resolve(root, 'lib'), { recursive: true });
await writeFile(resolve(root, 'lib/client.js'), output);
await writeFile(resolve(root, 'lib/host.js'), await readFile(resolve(root, 'src/host.mjs')));
await writeFile(resolve(root, 'lib/update-common.js'), updateCommon);
await writeFile(resolve(root, 'lib/updater.js'), await readFile(resolve(root, 'src/updater.mjs')));
await writeFile(resolve(root, 'lib/update-install.js'), await readFile(resolve(root, 'src/update-install.mjs')));
await writeFile(resolve(root, 'lib/behavior.js'), await readFile(resolve(root, 'src/behavior.mjs')));
await writeFile(resolve(root, 'lib/body.js'), await readFile(resolve(root, 'src/body.mjs')));
await writeFile(resolve(root, 'lib/header.js'), await readFile(resolve(root, 'src/header.mjs')));
console.log(`Built ${manifest.name}@${manifest.version}: client ${Buffer.byteLength(output)} bytes`);
