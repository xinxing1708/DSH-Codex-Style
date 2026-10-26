// 客户端与 Host 共用的包身份、更新源和版本规则；无网络或存储副作用。
export const UPDATE_PACKAGE = '@xinxing1708/dsh-codex-style';
export const UPDATE_REGISTRIES = [
  { id: 'npmmirror', label: 'npmmirror 中国镜像', url: 'https://registry.npmmirror.com/' },
  { id: 'npm', label: 'npm 官方源', url: 'https://registry.npmjs.org/' },
  { id: 'tencent', label: '腾讯云 npm 镜像', url: 'https://mirrors.cloud.tencent.com/npm/' }
];

export function updateVersionParts(value) {
  if (typeof value !== 'string') return null;
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.exec(value);
  if (!match) return null;
  const pre = match[4]?.split('.');
  if (pre?.some(part => /^\d+$/.test(part) && part.length > 1 && part[0] === '0')) return null;
  return { core: match.slice(1, 4).map(BigInt), pre };
}
export function compareUpdateVersions(left, right) {
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

