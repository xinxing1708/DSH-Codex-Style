import { readFile, writeFile, mkdir, rename, open } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash, timingSafeEqual } from 'node:crypto';
import { UPDATE_PACKAGE, installUpdate } from './update-install.js';

const REGISTRIES = ['https://registry.npmmirror.com/', 'https://registry.npmjs.org/', 'https://mirrors.cloud.tencent.com/npm/'];
const HOSTS = new Set(['registry.npmjs.org', 'registry.npmmirror.com', 'cdn.npmmirror.com', 'mirrors.cloud.tencent.com']);
const VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;
function newer(version, current) {
  const a = VERSION.exec(version || ''), b = VERSION.exec(current || '');
  if (!a || !b) return false;
  for (let i = 1; i <= 3; i++) if (BigInt(a[i]) !== BigInt(b[i])) return BigInt(a[i]) > BigInt(b[i]);
  if (!a[4] || !b[4]) return !!b[4] && !a[4];
  const left = a[4].split('.'), right = b[4].split('.');
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i] === right[i]) continue;
    if (left[i] === undefined || right[i] === undefined) return right[i] === undefined;
    const an = /^\d+$/.test(left[i]), bn = /^\d+$/.test(right[i]);
    return an && bn ? BigInt(left[i]) > BigInt(right[i]) : an !== bn ? !an : left[i] > right[i];
  }
  return false;
}
const MAX_BYTES = 32 * 1024 * 1024;
function verify(bytes, integrity) {
  const match = /^(sha512|sha256|sha1)-([A-Za-z0-9+/]+={0,2})$/.exec(integrity || '');
  if (!match) throw new Error('更新源未提供可验证的文件摘要。');
  const expected = Buffer.from(match[2], 'base64'), actual = createHash(match[1]).update(bytes).digest();
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new Error('更新包完整性校验失败，请重新下载。');
}
export class PluginUpdater {
  constructor({ profile, currentVersion, fetcher = globalThis.fetch, compatibility, exclusive = operation => operation(), changed = () => {} }) {
    Object.assign(this, { profile, currentVersion, fetcher, compatibility, exclusive, changed });
    this.cache = join(profile, 'codex-style-updates');
    this.state = { phase: 'idle', downloaded: 0, total: null };
    this.lifetime = new AbortController();
    this.restoring = this.restore();
  }
  set(patch) { this.state = Object.fromEntries(Object.entries({ ...this.state, ...patch }).filter(([, value]) => value !== undefined)); this.changed(this.state); return this.state; }
  async restore() {
    try {
      const cached = JSON.parse(await readFile(join(this.cache, 'ready.json'), 'utf8'));
      if (!newer(cached.version, this.currentVersion)) return;
      const bytes = await readFile(join(this.cache, cached.version + '.tgz'));
      verify(bytes, cached.integrity);
      this.ready = cached;
      this.set({ phase: 'ready', version: cached.version, downloaded: bytes.length, total: bytes.length });
    } catch { /* 无缓存或缓存损坏时，下一次检查会重新下载。 */ }
  }
  async status() { await this.restoring; return this.state; }
  async request(url, signal) {
    for (let redirects = 0; redirects < 6; redirects++) {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' || !HOSTS.has(parsed.hostname) || parsed.username || parsed.password || parsed.port) throw new Error('更新源地址不受支持。');
      const response = await this.fetcher(parsed.href, { signal, redirect: 'manual', credentials: 'omit', headers: { Accept: 'application/json, application/octet-stream' } });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('location');
        await response.body?.cancel();
        if (!location) throw new Error('更新源重定向无效。');
        url = new URL(location, parsed).href;
        continue;
      }
      if (!response.ok) { await response.body?.cancel(); throw new Error('更新源暂时不可用（HTTP ' + response.status + '）。'); }
      return response;
    }
    throw new Error('更新源重定向次数过多。');
  }
  async download(version) {
    await this.restoring;
    if (!VERSION.test(version || '') || !newer(version, this.currentVersion)) throw new Error('更新版本无效或不高于当前版本。');
    if (this.pending || this.state.phase === 'installing' || this.state.phase === 'installed') return this.state;
    if (this.ready?.version === version && this.state.phase === 'ready') return this.state;
    this.set({ phase: 'downloading', version, downloaded: 0, total: null, message: undefined });
    this.pending = this.fetchPackage(version).catch(error => this.set({ phase: 'error', message: this.lifetime.signal.aborted ? '下载已取消。' : error.message })).finally(() => { this.pending = null; });
    return this.state;
  }
  async fetchPackage(version) {
    await mkdir(this.cache, { recursive: true });
    let lastError;
    for (const registry of REGISTRIES) {
      this.lifetime.signal.throwIfAborted();
      this.set({ downloaded: 0, total: null });
      const signal = AbortSignal.any([this.lifetime.signal, AbortSignal.timeout(120000)]);
      try {
        const response = await this.request(registry + UPDATE_PACKAGE.replace('/', '%2F') + '/' + version, AbortSignal.any([signal, AbortSignal.timeout(8000)]));
        const metadata = await response.json();
        if (metadata.name !== UPDATE_PACKAGE || metadata.version !== version) throw new Error('更新包名称或版本不匹配。');
        const integrity = metadata.dist?.integrity || (metadata.dist?.shasum && 'sha1-' + Buffer.from(metadata.dist.shasum, 'hex').toString('base64'));
        if (!integrity || typeof metadata.dist?.tarball !== 'string') throw new Error('更新源未提供文件地址或摘要。');
        const archive = await this.request(metadata.dist?.tarball, signal);
        const length = Number(archive.headers.get('content-length'));
        const total = Number.isSafeInteger(length) && length > 0 ? length : null;
        if (total > MAX_BYTES) { await archive.body?.cancel(); throw new Error('更新包超过允许大小。'); }
        this.set({ total });
        const temporary = join(this.cache, version + '.part'), chunks = [];
        const file = await open(temporary, 'w');
        let downloaded = 0;
        try {
          for await (const chunk of archive.body) {
            downloaded += chunk.byteLength;
            if (downloaded > MAX_BYTES) throw new Error('更新包超过允许大小。');
            await file.writeFile(chunk);
            chunks.push(Buffer.from(chunk));
            this.set({ downloaded });
          }
        } finally { await file.close(); }
        if (total && total !== downloaded) throw new Error('下载未完成，请重试。');
        verify(Buffer.concat(chunks), integrity);
        await rename(temporary, join(this.cache, version + '.tgz'));
        this.ready = { version, integrity };
        await writeFile(join(this.cache, 'ready.json'), JSON.stringify(this.ready));
        return this.set({ phase: 'ready', downloaded, total: downloaded, message: undefined });
      } catch (error) { lastError = error; }
    }
    throw lastError || new Error('暂时无法下载更新，请重试。');
  }
  async install(version) {
    await this.restoring;
    if (this.installing) return this.installing;
    if (this.state.phase !== 'ready' || this.ready?.version !== version) throw new Error('请先完成该版本的下载。');
    this.set({ phase: 'installing', message: undefined });
    this.installing = (async () => {
      let verified = false;
      try {
        const archive = await readFile(join(this.cache, version + '.tgz'));
        verify(archive, this.ready.integrity);
        verified = true;
        const result = await this.exclusive(() => installUpdate({ archive, version, profile: this.profile, compatibility: this.compatibility }));
        return this.set({ phase: 'installed', ...result, message: '安装完成，重新启动 DSH 后生效。' });
      } catch (error) { return this.set({ phase: verified ? 'ready' : 'error', message: '安装失败：' + error.message }); }
      finally { this.installing = null; }
    })();
    return this.installing;
  }
  dispose() { this.lifetime.abort(); }
}
