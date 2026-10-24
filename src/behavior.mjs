import { readFileSync } from 'node:fs';

// 独立宿主组件；提示词由包内文件提供，不读取或改写用户的全局 AGENTS.md。
export const name = 'codex-style-work-guidelines';
export const inject = ['systemPrompt'];

const instructions = readFileSync(new URL('../prompts/work-guidelines.md', import.meta.url), 'utf8');

export function apply(ctx) {
  ctx.systemPrompt.section({
    name: 'codex-style:work-guidelines',
    order: 10300,
    text: instructions,
    interpolate: false
  });
}
