// 个人主页：Codex 个人资料页样式的本地使用统计 + DeepSeek 账号余额。
// 只使用宿主公开数据：remote.account（资料/钱包）与 sessions.list（会话目录，本地时间戳）。
// Token 用量与消费明细由 DeepSeek 平台统计，插件拿不到，界面上明确标注并给出平台入口，不伪造数字。

const PLATFORM_USAGE_URL = 'https://platform.deepseek.com/usage';

const PROFILE_MONTHS = 12;

function profileDayKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function profileTime(value) {
  const time = typeof value === 'number' ? value : Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

/** 会话目录 → 按天活动计数（只统计真实会话，排除空白与子代理）。 */
function buildProfileActivity(sessions) {
  const counts = new Map();
  for (const session of sessions) {
    const time = profileTime(session.updatedAt);
    if (!time) continue;
    const key = profileDayKey(time);
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

/** 从「有活动的日期」计算当前与最长连续天数。 */
function buildProfileStreaks(days) {
  const unique = [...new Set(days)].sort();
  if (!unique.length) return { current: 0, longest: 0 };
  let longest = 1;
  let run = 1;
  for (let index = 1; index < unique.length; index += 1) {
    const previous = Date.parse(unique[index - 1]);
    const current = Date.parse(unique[index]);
    if (current - previous === 86400000) { run += 1; longest = Math.max(longest, run); } else run = 1;
  }
  const today = profileDayKey(new Date());
  const yesterday = profileDayKey(new Date(Date.now() - 86400000));
  let current = 0;
  if (unique.includes(today) || unique.includes(yesterday)) {
    let cursor = unique.includes(today) ? today : yesterday;
    while (unique.includes(cursor)) {
      current += 1;
      cursor = profileDayKey(new Date(Date.parse(cursor) - 86400000));
    }
  }
  return { current, longest };
}

/** 最近 12 个月的日历网格：每列一周，每行一天；最后一列对齐到本周。 */
function buildProfileGrid(activity, now = new Date()) {
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(end.getFullYear(), end.getMonth() - (PROFILE_MONTHS - 1), 1);
  const first = new Date(start);
  first.setDate(first.getDate() - first.getDay());
  const weeks = [];
  let cursor = new Date(first);
  while (cursor <= end) {
    const week = [];
    for (let day = 0; day < 7; day += 1) {
      const key = profileDayKey(cursor);
      week.push({ key, count: activity.get(key) || 0, future: cursor > end, month: cursor.getMonth() });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function formatProfileMoney(wallets, fallback = '—') {
  if (!Array.isArray(wallets) || !wallets.length) return fallback;
  return wallets.map(wallet => `${wallet.currency === 'CNY' ? '¥' : '$'}${Number(wallet.balance).toFixed(2)}`).join(' / ');
}

/** 个人浮层：由齿轮菜单挂载，portal 到 body，Esc/遮罩/右上角关闭。 */
function ProfileOverlay({ ctx, onClose }) {
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);
  return createPortal(h('div', { className: 'dsc-ui dsc-profile-layer', role: 'dialog', 'aria-modal': 'true', 'aria-label': '个人' },
    h('div', { className: 'dsc-profile-backdrop', 'aria-hidden': true, onClick: onClose }),
    h('div', { className: 'dsc-profile-sheet' },
      h('button', { type: 'button', className: 'dsc-profile-close', 'aria-label': '关闭', onClick: onClose }, '\u00d7'),
      h(ProfileMain, { ctx }))), document.body);
}

function ProfileMain({ ctx }) {
  const catalog = useSource(ctx.sessions.list);
  const workspaces = useSource(ctx.workspaces.list);
  const [account, setAccount] = useState({ status: 'loading', profile: null, wallets: [], bonus: [] });
  useEffect(() => {
    let alive = true;
    const client = {
      version: ctx.modules.manifest.release?.version,
      locale: ctx.locale.getSnapshot().active,
      timezoneOffsetSeconds: -new Date().getTimezoneOffset() * 60
    };
    const read = (promise, pick) => promise.then(result => {
      if (!result?.ok) return null;
      const details = result.value;
      return details?.status === 'ready' ? pick(details) : null;
    }).catch(() => null);
    Promise.allSettled([
      read(ctx.remote.account.getProfile(client), details => details.value),
      typeof ctx.remote.account.getBalance === 'function'
        ? read(ctx.remote.account.getBalance(client), details => ({ wallets: details.value || [], bonus: details.bonusWallets || [] }))
        : Promise.resolve(null)
    ]).then(([profile, balance]) => {
      if (!alive) return;
      setAccount({
        status: 'ready',
        profile: profile.status === 'fulfilled' ? profile.value : null,
        wallets: balance.status === 'fulfilled' ? balance.value?.wallets || [] : [],
        bonus: balance.status === 'fulfilled' ? balance.value?.bonus || [] : []
      });
    });
    return () => { alive = false; };
  }, []);

  const sessions = useMemo(() => catalog.ids.map(id => catalog.byId[id]).filter(session => session
    && session.origin !== 'subagent' && !session.blank)
    .sort((left, right) => profileTime(right.updatedAt) - profileTime(left.updatedAt)), [catalog.ids, catalog.byId]);
  const activity = useMemo(() => buildProfileActivity(sessions), [sessions]);
  const streaks = useMemo(() => buildProfileStreaks([...activity.keys()]), [activity]);
  const grid = useMemo(() => buildProfileGrid(activity), [activity]);
  const activeDays = activity.size;
  const peak = Math.max(0, ...[...activity.values()]);

  const card = (label, value, hint) => h('div', { className: 'dsc-profile-card' },
    h('strong', null, value), h('span', null, label), hint ? h('small', null, hint) : null);

  return h('div', { className: 'dsc-ui dsc-profile' },
    h('header', { className: 'dsc-profile-head' },
      h('span', { className: 'dsc-profile-avatar' }, account.profile?.avatarUrl ? h('img', { src: account.profile.avatarUrl, alt: '', onError: event => { event.currentTarget.remove(); } }) : h(Icon, { name: 'chat', size: 30 })),
      h('span', { className: 'dsc-profile-identity' },
        h('strong', null, account.profile?.name || '未登录')),
      ),
    account.status === 'loading' && h('p', { className: 'dsc-profile-note' }, '正在读取账号信息…'),

    h('section', { className: 'dsc-profile-stats' },
      card('Token 消耗', '—'),
      card('使用峰值', String(peak), '个会话/天'),
      card('最长任务用时', '—'),
      card('总消耗金额', '—'),
      card('本月消耗金额', '—')),
    h('p', { className: 'dsc-profile-note' },
      'Token、任务用时与消费金额由 DeepSeek 平台统计',
      h('button', { type: 'button', className: 'dsc-profile-link', onClick: () => { if (typeof window !== 'undefined') window.open(PLATFORM_USAGE_URL, '_blank', 'noopener'); } }, '打开平台用量页')),

    h('section', { className: 'dsc-profile-stats is-secondary' },
      card('充值余额', formatProfileMoney(account.wallets)),
      card('赠送余额', formatProfileMoney(account.bonus)),
      card('会话总数', String(sessions.length)),
      card('活跃天数', String(activeDays)),
      card('连续天数', String(streaks.current), `最长 ${streaks.longest} 天`)),

    h('section', { className: 'dsc-profile-block' },
      h('div', { className: 'dsc-profile-block-title' }, '使用活动'),
      h('div', { className: 'dsc-profile-heatmap', role: 'img', 'aria-label': `近 ${PROFILE_MONTHS} 个月会话活动` },
        grid.map((week, index) => h('div', { key: index, className: 'dsc-profile-week' },
          week.map(day => h('span', {
            key: day.key,
            className: 'dsc-profile-day' + (day.future ? ' is-future' : ''),
            'data-level': day.count === 0 ? 0 : day.count <= 1 ? 1 : day.count <= 3 ? 2 : day.count <= 6 ? 3 : 4,
            title: `${day.key} · ${day.count} 个会话`
          }))))),
      h('div', { className: 'dsc-profile-heatmap-meta' },
        h('span', null, `活跃 ${activeDays} 天 · 共 ${sessions.length} 个会话`),
        h('span', { className: 'dsc-profile-legend' }, '少', [0, 1, 2, 3, 4].map(level => h('i', { key: level, 'data-level': level })), '多'))),

  );
}
