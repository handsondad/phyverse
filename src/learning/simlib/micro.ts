import { W, H, INK, HOT, BLUE, n, clamp, smooth, noise, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 微观与现代：尺度、原子核、光子、电磁波、微波、X 光、裂变、聚变 ---------------- */

const PAPER = '#fbf6ec';
const PANEL = '#f3ead8';
const SPACE = '#1e2a4a';
const PALE = '#c8d4ea';
const PROTON = '#e8590c';
const NEUTRON = '#adb5bd';
const GOLD = '#f2c94c';

/* ---------- 原子有多小 ---------- */

const ZOOM = [
  { name: '头发丝', size: '几万到十万纳米粗', step: '再缩小几百到一千倍' },
  { name: '病毒', size: '流感病毒约 100 纳米', step: '再缩小约 40 倍' },
  { name: 'DNA', size: '约 2.5 纳米粗', step: '再缩小约 10 倍' },
  { name: '原子', size: '只有零点几纳米', step: '再缩小约十万倍' },
  { name: '原子核', size: '约为原子的十万分之一', step: '' },
] as const;

function hair(): string {
  let out = `<polygon points="${poly([[20, 250], [120, 300], [320, 70], [220, 20]])}" fill="#8d6e4c"/>`;
  for (let i = 0; i < 7; i += 1) {
    const [x, y] = [70 + i * 34, 262 - i * 38];
    out += `<path d="M${x - 40} ${y - 4} q40 -26 96 10" fill="none" stroke="#6b5136" stroke-width="2"/>`;
  }
  out += `<circle cx="170" cy="160" r="2" fill="#fff"/>`;
  out += `<circle cx="170" cy="160" r="14" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 3"/>`;
  out += `<rect x="78" y="182" width="184" height="22" rx="11" fill="#3b2a1a" opacity="0.8"/>`;
  out += txt(170, 197, '一个病毒在这里只有一个小点', { size: 12, color: '#fff', plain: true });
  return out;
}

function virus(): string {
  let out = '';
  for (let i = 0; i < 18; i += 1) {
    const a = (i / 18) * 2 * Math.PI;
    const [x1, y1, x2, y2] = [165 + Math.cos(a) * 88, 155 + Math.sin(a) * 88, 165 + Math.cos(a) * 112, 155 + Math.sin(a) * 112];
    out += `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#d6336c" stroke-width="4"/><circle cx="${n(x2)}" cy="${n(y2)}" r="6" fill="#f06595"/>`;
  }
  out += `<circle cx="165" cy="155" r="90" fill="#fcc2d7" stroke="#d6336c" stroke-width="3"/>`;
  out += `<path d="M110 150 q20 -30 40 0 t40 0 t40 0" fill="none" stroke="#862e9c" stroke-width="3"/>`;
  out += txt(165, 196, '里面藏着细细的遗传物质', { size: 12, color: '#862e9c' });
  return out;
}

function dna(): string {
  let out = '';
  const strand = (shift: number): [number, number][] => Array.from({ length: 41 }, (_, i) => [20 + i * 7.5, 155 + Math.sin(i * 0.42 + shift) * 62]);
  const [a, b] = [strand(0), strand(Math.PI)];
  for (let i = 0; i < a.length; i += 3) out += `<line x1="${n(a[i][0])}" y1="${n(a[i][1])}" x2="${n(b[i][0])}" y2="${n(b[i][1])}" stroke="#adb5bd" stroke-width="3"/>`;
  for (const s of [a, b]) {
    out += `<polyline points="${poly(s)}" fill="none" stroke="${BLUE}" stroke-width="5"/>`;
    for (let i = 0; i < s.length; i += 2) out += `<circle cx="${n(s[i][0])}" cy="${n(s[i][1])}" r="6.5" fill="#74c0fc" stroke="${BLUE}" stroke-width="1.5"/>`;
  }
  out += txt(165, 252, '每个小球大约就是一个原子', { size: 12, color: BLUE });
  return out;
}

function atom(): string {
  return `<defs><radialGradient id="zoom-cloud"><stop offset="0" stop-color="#74c0fc" stop-opacity="0.85"/><stop offset="0.7" stop-color="#a5d8ff" stop-opacity="0.45"/><stop offset="1" stop-color="#d0ebff" stop-opacity="0"/></radialGradient></defs>`
    + `<circle cx="165" cy="150" r="120" fill="url(#zoom-cloud)"/>`
    + `<circle cx="165" cy="150" r="1.6" fill="${PROTON}"/>`
    + `<line x1="168" y1="147" x2="226" y2="100" stroke="${INK}" stroke-width="1"/>`
    + txt(232, 96, '原子核在正中间', { size: 12, anchor: 'start' })
    + txt(232, 112, '（照比例画就看不见了）', { size: 11, anchor: 'start', color: '#8b7a5c' })
    + txt(165, 290, '外面是一团电子“云”', { size: 12, color: BLUE });
}

function nucleus(): string {
  const balls: [number, number, boolean][] = [
    [140, 130, true], [175, 120, false], [205, 140, true], [125, 165, false], [160, 158, true], [195, 172, false],
    [150, 195, true], [185, 205, false], [218, 180, true], [130, 200, false], [168, 92, true], [110, 135, false],
  ];
  let out = '';
  for (const [x, y, p] of balls) out += `<circle cx="${x}" cy="${y}" r="22" fill="${p ? PROTON : NEUTRON}" stroke="#fff" stroke-width="2"/>${p ? txt(x, y + 5, '+', { size: 16, bold: true, color: '#fff', plain: true }) : ''}`;
  out += txt(165, 270, '质子（+）和中子挤成一团', { size: 12 });
  return out;
}

export const zoom: SimDef = {
  params: [{ key: 'level', label: '放大到', min: 0, max: 4, step: 1, value: 0, labels: ZOOM.map(z => z.name) }],
  animated: false,
  draw(s) {
    const level = clamp(Math.round(s.level), 0, 4);
    const dark = level === 0;
    let out = `<rect width="330" height="${H}" rx="12" fill="${dark ? '#c9b48f' : PAPER}"/>`;
    out += [hair, virus, dna, atom, nucleus][level]();
    out += `<rect x="342" y="0" width="${W - 342}" height="${H}" rx="12" fill="${PANEL}"/>`;
    ZOOM.forEach((z, i) => {
      const y = 34 + i * 62;
      const on = i === level;
      out += `<rect x="352" y="${y - 22}" width="198" height="40" rx="10" fill="${on ? '#fff' : 'none'}" stroke="${on ? HOT : '#d8c9a8'}" stroke-width="${on ? 2.5 : 1}"/>`;
      out += txt(364, y - 2, z.name, { size: 15, bold: on, anchor: 'start', color: on ? HOT : INK });
      out += txt(364, y + 13, z.size, { size: 11, anchor: 'start', color: '#8b7a5c' });
      if (z.step) {
        out += arrow(540, y + 19, 540, y + 41, on ? HOT : '#c4b38f', 2.5);
        out += txt(534, y + 34, z.step, { size: 10, anchor: 'end', color: on ? HOT : '#a8977a' });
      }
    });
    return out;
  },
  readout(s) {
    const level = clamp(Math.round(s.level), 0, 4);
    const z = ZOOM[level];
    const next = level < 4 ? `往下${z.step}，就到了${ZOOM[level + 1].name}。` : '这已经是原子最里面的“芯”了。';
    return `${z.name}：${z.size}。${next}一根头发丝的粗细里，能并排摆下二十万个左右的原子。`;
  },
};

/* ---------- α 粒子打金箔 ---------- */

const K_COULOMB = 10;
function trajectory(b: number): [number, number][] {
  let [x, y, vx, vy] = [-260, b, 1, 0];
  const out: [number, number][] = [[x, y]];
  for (let i = 0; i < 2400; i += 1) {
    const r = Math.max(Math.hypot(x, y), 4);
    const a = K_COULOMB / (r * r);
    vx += (a * x) / r * 0.5;
    vy += (a * y) / r * 0.5;
    x += vx * 0.5;
    y += vy * 0.5;
    if (i % 6 === 0) out.push([x, y]);
    if (x > 270 || x < -270 || Math.abs(y) > 170) break;
  }
  return out;
}
const AIMS = [-130, -70, -34, -12, -3, 6, 20, 50, 100];
const PATHS = AIMS.map(trajectory);

function alongPath(path: readonly [number, number][], p: number): [number, number] {
  const i = clamp(p, 0, 1) * (path.length - 1);
  const [a, b] = [path[Math.floor(i)], path[Math.min(path.length - 1, Math.floor(i) + 1)]];
  const f = i - Math.floor(i);
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}

export const rutherford: SimDef = {
  params: [{ key: 'view', label: '看', min: 0, max: 1, step: 1, value: 0, labels: ['整片金箔', '放大一个金原子'] }],
  animated: true,
  still: 2.2,
  draw(s, t) {
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${SPACE}"/>`;
    if (s.view === 0) {
      out += `<rect x="16" y="130" width="54" height="60" rx="6" fill="#495057"/>` + txt(43, 214, 'α 粒子源', { size: 12, color: PALE, plain: true });
      out += `<rect x="274" y="30" width="10" height="260" fill="${GOLD}"/>` + txt(279, 22, '薄薄的金箔', { size: 12, color: GOLD, plain: true });
      for (let i = 0; i < 26; i += 1) {
        const y0 = 64 + noise(i * 7 + 1) * 192;
        const kind = i % 13 === 5 ? 'back' : i % 5 === 2 ? 'turn' : 'straight';
        const side = y0 > 160 ? 1 : -1;
        const exit = (q: number): [number, number] => kind === 'straight' ? [279 + q * 270, y0]
          : kind === 'turn' ? [279 + q * 230, y0 + side * q * 110] : [279 - q * 220, y0 + side * q * 70];
        const color = kind === 'back' ? '#ff6b6b' : kind === 'turn' ? '#ffd43b' : '#a5d8ff';
        out += `<polyline points="${poly([[70, 160 + (y0 - 160) * 0.2], [279, y0], exit(1)])}" fill="none" stroke="${color}" stroke-width="1" opacity="0.25"/>`;
        const p = (t * 0.45 + noise(i * 7 + 3)) % 1;
        const q0 = Math.min(1, p * 2);
        const [x, y] = p > 0.5 ? exit((p - 0.5) * 2) : [70 + q0 * 209, 160 + (y0 - 160) * (0.2 + 0.8 * q0)];
        if (x < W - 4) out += `<circle cx="${n(x)}" cy="${n(y)}" r="${kind === 'straight' ? 3 : 4}" fill="${color}"/>`;
      }
      out += txt(420, 300, '蓝：直穿过去　黄：拐了弯　红：弹回来', { size: 12, color: PALE, plain: true });
    } else {
      const [cx, cy] = [280, 160];
      out += `<circle cx="${cx}" cy="${cy}" r="140" fill="#2a3760" stroke="${PALE}" stroke-width="1.5" stroke-dasharray="5 6"/>`;
      out += txt(cx, 36, '一个金原子（虚线圈）', { size: 12, color: PALE, plain: true });
      out += `<circle cx="${cx}" cy="${cy}" r="5" fill="${PROTON}"/>`;
      out += txt(cx + 12, cy + 26, '原子核（画大了很多）', { size: 11, color: '#ffa94d', anchor: 'start', plain: true });
      PATHS.forEach((path, i) => {
        out += `<polyline points="${poly(path.map(([x, y]) => [cx + x, cy + y]))}" fill="none" stroke="#a5d8ff" stroke-width="1" opacity="0.35"/>`;
        const [x, y] = alongPath(path, (t * 0.3 + i * 0.07) % 1);
        out += `<circle cx="${n(cx + x)}" cy="${n(cy + y)}" r="4" fill="${Math.abs(AIMS[i]) < 15 ? '#ff6b6b' : '#a5d8ff'}"/>`;
      });
      out += txt(cx, 306, '离核远的几乎不拐弯，正对着核的才被猛推回去', { size: 12, color: PALE, plain: true });
    }
    return out;
  },
  readout(s) {
    return s.view === 0
      ? 'α 粒子一个个打向薄薄的金箔：绝大多数直直穿了过去，少数拐了弯，极少数竟被弹了回来（图里弹回的比例画多了）。卢瑟福由此推断：原子中间有个很小、很重、带正电的核，别的地方几乎是空的。'
      : '放大一个金原子：原子核只有原子的大约十万分之一，图里画大了很多。离核远的 α 粒子几乎不受影响，只有正对着核飞过去的，才会被它的正电猛地推回来。';
  },
};

/* ---------- 光子打电子 ---------- */

const LIGHTS = [
  { name: '红光', nm: 650, color: '#e03131' },
  { name: '黄光', nm: 580, color: '#f59f00' },
  { name: '蓝光', nm: 450, color: '#1c7ed6' },
  { name: '紫外线', nm: 300, color: '#7048e8' },
] as const;
const W0_NA = 2.29;
const eV = (nm: number): number => 1240 / nm;

export const photon: SimDef = {
  params: [
    { key: 'color', label: '用什么光照', min: 0, max: 3, step: 1, value: 0, labels: LIGHTS.map(l => l.name) },
    { key: 'bright', label: '亮度', min: 0, max: 2, step: 1, value: 2, labels: ['暗', '中', '很亮'] },
  ],
  animated: true,
  still: 1.4,
  draw(s, t) {
    const light = LIGHTS[clamp(Math.round(s.color), 0, 3)];
    const E = eV(light.nm);
    const works = E > W0_NA;
    const count = [3, 7, 14][clamp(Math.round(s.bright), 0, 2)];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${PAPER}"/>`;
    out += `<rect x="16" y="120" width="44" height="80" rx="10" fill="#495057"/><circle cx="60" cy="160" r="16" fill="${light.color}" opacity="${0.4 + 0.25 * s.bright}"/>`;
    out += `<rect x="330" y="60" width="26" height="240" rx="4" fill="#ced4da" stroke="#868e96"/>` + txt(343, 50, '钠板', { size: 13, bold: true });
    for (let i = 0; i < count; i += 1) {
      const p = (t * 0.7 + i / count) % 1;
      const y = 80 + noise(i * 11 + 2) * 200;
      const x = 80 + p * 245;
      let wave = '';
      for (let k = 0; k <= 12; k += 1) wave += `${k ? 'L' : 'M'}${n(x - 24 + k * 2)} ${n(y + Math.sin(k * 1.4 + t * 9) * 5)}`;
      out += `<path d="${wave}" fill="none" stroke="${light.color}" stroke-width="2.5"/>`;
      if (works) {
        const speed = Math.sqrt(E - W0_NA) * 210;
        const ex = 362 + p * speed;
        if (ex < W - 10) out += `<circle cx="${n(ex)}" cy="${n(y - p * 30)}" r="5" fill="${BLUE}"/>${txt(ex, y - p * 30 + 3.5, '−', { size: 10, bold: true, color: '#fff', plain: true })}`;
      } else {
        out += `<circle cx="330" cy="${n(y)}" r="${n(3 + (1 - p) * 3)}" fill="${light.color}" opacity="${n((1 - p) * 0.4)}"/>`;
      }
    }
    if (light.nm === 300) out += txt(190, 306, '紫外线看不见，图里画成紫色', { size: 11, color: '#8b7a5c' });
    out += txt(190, 24, '每颗光子的能量', { size: 12, color: '#8b7a5c' });
    const scale = 80;
    out += `<rect x="90" y="32" width="${n(E * scale * 0.55)}" height="12" rx="4" fill="${light.color}"/>`;
    const thr = 90 + W0_NA * scale * 0.55;
    out += `<line x1="${n(thr)}" y1="28" x2="${n(thr)}" y2="50" stroke="${INK}" stroke-width="2" stroke-dasharray="3 2"/>` + txt(thr + 4, 62, '钠要的门槛', { size: 11, anchor: 'start' });
    out += txt(462, 30, works ? '电子飞出来了' : '一个电子也没有', { size: 16, bold: true, color: works ? BLUE : '#c92a2a' });
    out += txt(462, 52, works ? (s.bright > 1 ? '光越亮，电子越多' : '调亮一点，电子会更多') : '开得再亮也一样', { size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const light = LIGHTS[clamp(Math.round(s.color), 0, 3)];
    const E = eV(light.nm);
    return E > W0_NA
      ? `${light.name}（约 ${light.nm} 纳米）：每颗光子约 ${E.toFixed(1)} eV，比钠需要的 ${W0_NA} eV 大，一颗就能打出一个电子。光越亮，光子越多，打出的电子越多；可每个电子最多只带走约 ${(E - W0_NA).toFixed(1)} eV。`
      : `${light.name}（约 ${light.nm} 纳米）：每颗光子只有约 ${E.toFixed(1)} eV，比钠需要的 ${W0_NA} eV 小。光再亮也只是光子更多，每一颗都不够，一个电子都打不出来。`;
  },
};

/* ---------- 手机信号 ---------- */

const PLACES = ['空地上', '隔着一堵砖墙', '关在铁皮电梯里'] as const;

function phone(x: number, y: number, bars: number): string {
  let out = `<rect x="${x - 14}" y="${y - 26}" width="28" height="52" rx="5" fill="#343a40"/><rect x="${x - 11}" y="${y - 20}" width="22" height="36" rx="2" fill="#a5d8ff"/>`;
  for (let i = 0; i < 4; i += 1) out += `<rect x="${x - 9 + i * 5}" y="${y - 6 - i * 4}" width="3.5" height="${6 + i * 4}" fill="${i < bars ? '#2b8a3e' : '#dee2e6'}"/>`;
  return out;
}

function ripples(x: number, y: number, t: number, dir: 1 | -1, reach: number, opacity = 1, color = '#7048e8'): string {
  let out = '';
  for (let k = 0; k < 4; k += 1) {
    const r = ((t * 60 + k * reach / 4) % reach) + 8;
    const fade = (1 - r / (reach + 8)) * opacity;
    out += `<path d="M${n(x + dir * r * 0.5)} ${n(y - r * 0.85)} A${n(r)} ${n(r)} 0 0 ${dir > 0 ? 1 : 0} ${n(x + dir * r * 0.5)} ${n(y + r * 0.85)}" fill="none" stroke="${color}" stroke-width="2.5" opacity="${n(fade)}"/>`;
  }
  return out;
}

export const signal: SimDef = {
  params: [{ key: 'place', label: '打电话的人在', min: 0, max: 2, step: 1, value: 0, labels: [...PLACES] }],
  animated: true,
  still: 1.5,
  draw(s, t) {
    const place = clamp(Math.round(s.place), 0, 2);
    let out = `<rect width="${W}" height="${H}" rx="12" fill="#eef6fb"/><rect y="250" width="${W}" height="70" fill="#d8e8c8"/>`;
    out += `<polygon points="${poly([[280, 60], [262, 250], [298, 250]])}" fill="none" stroke="#868e96" stroke-width="3"/>`;
    out += `<line x1="268" y1="190" x2="292" y2="190" stroke="#868e96" stroke-width="2"/><line x1="272" y1="130" x2="288" y2="130" stroke="#868e96" stroke-width="2"/>`;
    out += `<rect x="270" y="52" width="20" height="16" rx="3" fill="#495057"/>` + txt(280, 274, '基站', { size: 13, bold: true });
    out += txt(80, 274, '小念', { size: 13, bold: true }) + txt(490, 274, '奶奶', { size: 13, bold: true });
    const bars = [4, 2, 0][place];
    out += phone(80, 190, bars) + phone(490, 190, place === 2 ? 0 : 4);
    out += `<path d="M48 150 q-10 10 0 20 M40 144 q-16 16 0 32" fill="none" stroke="${HOT}" stroke-width="2"/>`;
    out += txt(80, 238, '声音→电信号', { size: 11, color: HOT });
    const strength = [1, 0.45, 0.06][place];
    out += ripples(96, 180, t, 1, place === 2 ? 40 : 150);
    if (place === 1) out += `<rect x="168" y="120" width="22" height="130" fill="#c0603a"/>` + txt(179, 112, '砖墙', { size: 12, color: '#c0603a' });
    if (place === 2) out += `<rect x="40" y="120" width="86" height="130" rx="4" fill="none" stroke="#495057" stroke-width="6"/>` + txt(83, 110, '铁皮电梯', { size: 12, color: '#495057' });
    if (strength > 0.1) out += ripples(300, 90, t + 0.6, 1, 170, strength, '#7048e8');
    out += place === 2
      ? txt(400, 92, '信号出不去', { size: 14, bold: true, color: '#c92a2a' })
      : txt(390, 300, '电磁波每秒约走 30 万公里', { size: 13, bold: true, color: '#7048e8' });
    if (place !== 2) out += txt(490, 238, '电信号→声音', { size: 11, color: HOT });
    return out;
  },
  readout(s) {
    const place = clamp(Math.round(s.place), 0, 2);
    return [
      '手机把声音变成电信号，再从天线发出看不见的电磁波；基站收到后接力转发，奶奶的手机收到再变回声音。电磁波和光一样快，每秒约走 30 万公里，所以几乎听不出延迟。',
      '砖墙会吸收、挡掉一部分电磁波，信号变弱，但大多还能穿过去，通话一般还能继续。',
      '金属会把电磁波反射回去，铁皮电梯像一个盒子把手机罩住，信号很难进出，所以常常“无服务”。',
    ][place];
  },
};

/* ---------- 微波炉 ---------- */

const MW_STAGES = ['刚转 30 秒', '转了 1 分钟', '搅一搅、放一会儿'] as const;

function heatColor(v: number): string {
  const stops: [number, [number, number, number]][] = [[0, [116, 192, 252]], [0.5, [255, 212, 59]], [1, [240, 62, 62]]];
  const x = clamp(v, 0, 1);
  const [lo, hi] = x < 0.5 ? [stops[0], stops[1]] : [stops[1], stops[2]];
  const f = (x - lo[0]) / (hi[0] - lo[0]);
  const c = lo[1].map((a, i) => Math.round(a + (hi[1][i] - a) * f));
  return `rgb(${c.join(',')})`;
}

export const microwave: SimDef = {
  params: [{ key: 'stage', label: '这碗饭', min: 0, max: 2, step: 1, value: 1, labels: [...MW_STAGES] }],
  animated: true,
  still: 0.6,
  draw(s, t) {
    const stage = clamp(Math.round(s.stage), 0, 2);
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${PAPER}"/>`;
    out += `<rect x="16" y="40" width="200" height="190" rx="12" fill="#495057"/><rect x="28" y="54" width="146" height="162" rx="6" fill="#212529"/>`;
    out += `<rect x="182" y="60" width="24" height="60" rx="3" fill="#868e96"/>` + txt(116, 254, '微波在金属壁之间来回反射', { size: 11, color: '#8b7a5c' });
    if (stage < 2) {
      for (let k = 0; k < 3; k += 1) {
        const off = ((t * 120 + k * 50) % 150);
        out += `<polyline points="${poly([[34, 70 + off * 0.2], [80, 60 + off * 0.5], [130, 110 + off * 0.3], [168, 70 + off * 0.6]])}" fill="none" stroke="#b197fc" stroke-width="2" opacity="0.7"/>`;
      }
    }
    out += `<ellipse cx="101" cy="196" rx="52" ry="12" fill="#f8f9fa"/><ellipse cx="101" cy="186" rx="40" ry="10" fill="#fff3bf"/>`;
    const [cx, cy, R] = [400, 160, 120];
    out += txt(cx, 22, '把饭从中间切开看', { size: 13, color: '#8b7a5c' });
    for (let ring = 10; ring >= 1; ring -= 1) {
      const r = (ring / 10) * R;
      const depth = 1 - ring / 10;
      const v = stage === 2 ? 0.55 : stage === 0 ? clamp(0.55 - depth * 1.6, 0.05, 1) : clamp(1 - depth * 1.3, 0.12, 1);
      out += `<circle cx="${cx}" cy="${cy}" r="${n(r)}" fill="${heatColor(v)}"/>`;
    }
    for (let i = 0; i < 10; i += 1) {
      const a = (i / 10) * 2 * Math.PI;
      const rr = i % 2 ? R * 0.88 : R * 0.3;
      const [x, y] = [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
      const outer = i % 2 === 1;
      const spin = stage === 2 ? 0 : outer ? Math.sin(t * 24 + i) * 50 : Math.sin(t * 6 + i) * (stage === 1 ? 12 : 4);
      out += `<g transform="translate(${n(x)} ${n(y)}) rotate(${n(spin)})"><circle r="6" fill="#e03131"/><circle cx="-6" cy="5" r="3.5" fill="#fff" stroke="#adb5bd"/><circle cx="6" cy="5" r="3.5" fill="#fff" stroke="#adb5bd"/></g>`;
    }
    if (stage < 2) {
      out += `<line x1="${cx + 92}" y1="${cy - 70}" x2="530" y2="60" stroke="${INK}" stroke-width="1"/>` + txt(536, 54, '外层：微波直接加热', { size: 11, anchor: 'end' });
      out += `<line x1="${cx}" y1="${cy}" x2="530" y2="292" stroke="${INK}" stroke-width="1"/>` + txt(546, 306, stage === 0 ? '中间：还凉着' : '中间：靠热慢慢传进来', { size: 11, anchor: 'end' });
    } else {
      out += txt(cx, 306, '搅一搅、放一会儿，冷热就匀了', { size: 12, color: '#8b7a5c' });
    }
    return out;
  },
  readout(s) {
    return [
      '微波钻进饭的外层，让那里的水分子飞快地来回转，互相摩擦生热。刚转 30 秒，外圈开始热了，中间还是凉的。',
      '转了 1 分钟：外层被微波直接加热，已经烫了；中间主要靠外层的热一点点传进去，还没跟上。所以微波炉不是从里往外热。',
      '搅一搅、放一会儿，热从烫的地方传到凉的地方，整碗饭就热得比较均匀了，也不容易烫着嘴。',
    ][clamp(Math.round(s.stage), 0, 2)];
  },
};

/* ---------- X 光 ---------- */

const FINGERS: [number, number, number][] = [[-30, 92, 15], [-10, 108, 15], [10, 104, 15], [29, 86, 14]];

function handShape(x: number, y: number, k: number, fill: string, stroke = 'none'): string {
  let out = `<rect x="${n(x - 40 * k)}" y="${n(y - 20 * k)}" width="${n(80 * k)}" height="${n(78 * k)}" rx="${n(18 * k)}" fill="${fill}" stroke="${stroke}"/>`;
  for (const [dx, len, w] of FINGERS) out += `<rect x="${n(x + (dx - w / 2) * k)}" y="${n(y - (len - 4) * k)}" width="${n(w * k)}" height="${n(len * k)}" rx="${n(w * k * 0.5)}" fill="${fill}" stroke="${stroke}"/>`;
  out += `<rect x="${n(x - 62 * k)}" y="${n(y - 2 * k)}" width="${n(36 * k)}" height="${n(14 * k)}" rx="${n(7 * k)}" fill="${fill}" stroke="${stroke}" transform="rotate(-35 ${n(x - 40 * k)} ${n(y + 5 * k)})"/>`;
  return out;
}

function handBones(x: number, y: number, k: number, color: string): string {
  let out = '';
  for (const [dx, len] of FINGERS) {
    const seg = (len - 14) / 3;
    for (let j = 0; j < 3; j += 1) {
      const top = y - (len - 10) * k + j * seg * k;
      out += `<rect x="${n(x + (dx - 3.5) * k)}" y="${n(top)}" width="${n(7 * k)}" height="${n((seg - 3) * k)}" rx="${n(3 * k)}" fill="${color}"/>`;
    }
    out += `<rect x="${n(x + (dx * 0.8 - 3) * k)}" y="${n(y - 12 * k)}" width="${n(6 * k)}" height="${n(44 * k)}" rx="${n(3 * k)}" fill="${color}"/>`;
  }
  out += `<rect x="${n(x - 24 * k)}" y="${n(y + 36 * k)}" width="${n(48 * k)}" height="${n(18 * k)}" rx="${n(8 * k)}" fill="${color}"/>`;
  return out;
}

export const xray: SimDef = {
  params: [
    { key: 'ray', label: '照手的是', min: 0, max: 1, step: 1, value: 1, labels: ['手电筒的光', 'X 光'] },
    { key: 'ring', label: '手上', min: 0, max: 1, step: 1, value: 0, labels: ['没戴东西', '戴着金属戒指'] },
  ],
  animated: false,
  draw(s) {
    const isX = s.ray === 1;
    const ring = s.ring === 1;
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${PAPER}"/>`;
    out += `<rect x="14" y="130" width="40" height="60" rx="8" fill="#495057"/>` + txt(34, 214, isX ? 'X 光机' : '手电筒', { size: 12 });
    const beam = isX ? '#b197fc' : '#ffe066';
    out += `<polygon points="${poly([[54, 150], [54, 170], [372, 290], [372, 30]])}" fill="${beam}" opacity="0.28"/>`;
    out += handShape(210, 175, 1, '#f4c7a1', '#d9a47e');
    if (ring) out += `<rect x="${210 - 18}" y="${175 - 30}" width="16" height="7" rx="3" fill="#868e96"/>`;
    out += txt(210, 300, '手', { size: 12 });
    out += `<rect x="372" y="20" width="174" height="280" rx="10" fill="${isX ? '#111' : '#fff9db'}" stroke="#868e96" stroke-width="2"/>`;
    const [hx, hy, k] = [459, 178, 1.15];
    if (isX) {
      out += handShape(hx, hy, k, '#5c5f66');
      out += handBones(hx, hy, k, '#f1f3f5');
      if (ring) out += `<rect x="${n(hx - 18 * k)}" y="${n(hy - 30 * k)}" width="${n(16 * k)}" height="${n(7 * k)}" rx="3" fill="#fff"/>`;
    } else {
      out += handShape(hx, hy, k, '#3b3226');
    }
    out += txt(459, 316, isX ? '片子：骨头白、肉淡' : '屏上：只有黑黑的手影', { size: 12, color: isX ? '#7048e8' : INK });
    return out;
  },
  readout(s) {
    const ring = s.ring === 1 ? (s.ray === 1 ? '金属戒指挡得比骨头还厉害，在片子上最白，所以拍片前要摘掉金属饰品。' : '戒指也只是手影的一部分。') : '';
    return s.ray === 1
      ? `X 光能量高，大部分能穿过肌肉和脂肪，在片子上只留下淡淡的灰影；骨头里含钙，挡住的 X 光多，片子上就白白的。${ring}`
      : `手电筒的光被皮肤和肌肉挡住了，屏上只有一个黑黑的手影，看不到里面的骨头。${ring}`;
  },
};

/* ---------- 链式反应与控制棒 ---------- */

const RODS = ['插得深', '插得刚好', '拔出一些'] as const;
const K_FACTOR = [0.8, 1, 1.2];

export const chain: SimDef = {
  params: [{ key: 'rods', label: '控制棒', min: 0, max: 2, step: 1, value: 1, labels: [...RODS] }],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const rods = clamp(Math.round(s.rods), 0, 2);
    const kf = K_FACTOR[rods];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${PAPER}"/>`;
    out += `<rect x="16" y="40" width="270" height="250" rx="10" fill="#d0ebff" stroke="${BLUE}" stroke-width="2"/>` + txt(151, 30, '反应堆芯（泡在水里）', { size: 12, color: BLUE });
    for (let r = 0; r < 5; r += 1) {
      for (let c = 0; c < 6; c += 1) {
        const [x, y] = [44 + c * 44, 70 + r * 48];
        out += `<circle cx="${x}" cy="${y}" r="9" fill="#2f9e44" opacity="0.85"/>`;
      }
    }
    const depth = [230, 150, 70][rods];
    for (const x of [88, 176, 264]) out += `<rect x="${x - 7}" y="34" width="14" height="${depth}" rx="3" fill="#495057"/>`;
    out += txt(176, 312, '灰色：控制棒，能吸走中子', { size: 11, color: '#495057' });
    const neutrons = [5, 9, 14][rods];
    for (let i = 0; i < neutrons; i += 1) {
      const sp = 0.6 + noise(i * 5 + 1) * 0.6;
      const px = (noise(i * 5 + 2) + t * sp * 0.4) % 2;
      const py = (noise(i * 5 + 3) + t * sp * 0.27) % 2;
      const x = 24 + (px < 1 ? px : 2 - px) * 254;
      const y = 48 + (py < 1 ? py : 2 - py) * 234;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="3.5" fill="${HOT}"/>`;
    }
    const flashes = [1, 2, 4][rods];
    for (let i = 0; i < flashes; i += 1) {
      const f = (t * 1.3 + i / flashes) % 1;
      const cell = Math.floor(noise(Math.floor(t * 1.3 + i / flashes) * 13 + i) * 30);
      const [x, y] = [44 + (cell % 6) * 44, 70 + Math.floor(cell / 6) * 48];
      out += `<circle cx="${x}" cy="${y}" r="${n(10 + f * 16)}" fill="#ffd43b" opacity="${n((1 - f) * 0.7)}"/>`;
    }
    const [gx, gy, gw, gh] = [330, 60, 210, 190];
    out += `<line x1="${gx}" y1="${gy + gh}" x2="${gx + gw}" y2="${gy + gh}" stroke="${INK}" stroke-width="1.5"/><line x1="${gx}" y1="${gy}" x2="${gx}" y2="${gy + gh}" stroke="${INK}" stroke-width="1.5"/>`;
    out += txt(gx + 4, gy - 12, '每一代裂变的个数', { size: 12, anchor: 'start' }) + txt(gx + gw, gy + gh + 18, '一代接一代 →', { size: 11, anchor: 'end', color: '#8b7a5c' });
    const pts: [number, number][] = [];
    for (let g = 0; g <= 12 && Math.pow(kf, g) * 0.35 <= 1; g += 1) pts.push([gx + (g / 12) * gw, gy + gh - Math.pow(kf, g) * 0.35 * gh]);
    out += `<line x1="${gx}" y1="${n(gy + gh * 0.65)}" x2="${gx + gw}" y2="${n(gy + gh * 0.65)}" stroke="#adb5bd" stroke-dasharray="4 4"/>`;
    out += `<polyline points="${poly(pts)}" fill="none" stroke="${HOT}" stroke-width="3"/>`;
    out += txt(gx + gw / 2, 290, ['越来越少，慢慢停下', '一代一样多，平稳发电', '越来越多，控制系统会把棒插回去'][rods], { size: 12, bold: true, color: rods === 1 ? '#2b8a3e' : HOT });
    out += txt(gx + gw / 2, 308, `每次裂变，平均让下一代有 ${kf} 次`, { size: 11, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    return [
      '控制棒插得深，吸走的中子多，每次裂变引起的下一次裂变不到一次，反应越来越弱，慢慢就停了。',
      '控制棒插得刚好：每次裂变平均正好引起下一次裂变，反应不快不慢，稳稳地放热发电。核电站平时就这样运行。',
      '控制棒拔出一些，中子多了，反应一代比一代快。真正的核电站会自动把棒插回去；燃料里容易裂变的铀只占约 3%～5%，不会像原子弹那样炸开。',
    ][clamp(Math.round(s.rods), 0, 2)];
  },
};

/* ---------- 核聚变 ---------- */

const TEMPS = ['常温', '约 5500 ℃（太阳表面）', '约 1500 万 ℃（太阳中心）'] as const;

function protonBall(x: number, y: number, r = 14): string {
  return `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${PROTON}" stroke="#fff" stroke-width="1.5"/>${txt(x, y + 5, '+', { size: 15, bold: true, color: '#fff', plain: true })}`;
}

export const fusion: SimDef = {
  params: [{ key: 'temp', label: '温度', min: 0, max: 2, step: 1, value: 2, labels: [...TEMPS] }],
  animated: true,
  still: 1.4,
  draw(s, t) {
    const temp = clamp(Math.round(s.temp), 0, 2);
    const bg = ['#f1f3f5', '#fff3bf', '#ffd8a8'][temp];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${bg}"/>`;
    const jiggle = [0.6, 2.5, 7][temp];
    for (let i = 0; i < 9; i += 1) {
      const [bx, by] = [40 + noise(i * 3 + 1) * 480, 30 + noise(i * 3 + 2) * 70 + (i % 2) * 190];
      out += `<circle cx="${n(bx + Math.sin(t * jiggle + i) * jiggle * 2)}" cy="${n(by + Math.cos(t * jiggle * 1.3 + i) * jiggle * 1.5)}" r="5" fill="${PROTON}" opacity="0.35"/>`;
    }
    const [cx, cy] = [280, 160];
    const p = (t * 0.4) % 1;
    const closest = [130, 60, 0][temp];
    const fuse = temp === 2;
    if (!fuse || p < 0.45) {
      const go = p < 0.5 ? smooth(p / 0.5) : 1 - smooth((p - 0.5) / 0.5);
      const d = 230 - (230 - Math.max(closest, 16)) * go;
      out += protonBall(cx - d, cy) + protonBall(cx + d, cy);
      if (!fuse) {
        out += arrow(cx - d - 20, cy + 30, cx - d - 60, cy + 30, BLUE, 3) + arrow(cx + d + 20, cy + 30, cx + d + 60, cy + 30, BLUE, 3);
        out += txt(cx, cy + 70, '都带正电，互相推开', { size: 13, color: BLUE });
      }
    } else {
      const f = (p - 0.45) / 0.55;
      out += `<circle cx="${cx}" cy="${cy}" r="${n(20 + f * 120)}" fill="#fff3bf" opacity="${n((1 - f) * 0.9)}"/>`;
      for (let k = 0; k < 8; k += 1) {
        const a = (k / 8) * 2 * Math.PI;
        const [r1, r2] = [30 + f * 90, 50 + f * 110];
        out += arrow(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, '#f08c00', 3);
      }
      for (const [dx, dy, pr] of [[-9, -9, true], [9, 9, true], [9, -9, false], [-9, 9, false]] as const) {
        out += `<circle cx="${cx + dx}" cy="${cy + dy}" r="11" fill="${pr ? PROTON : NEUTRON}" stroke="#fff" stroke-width="1.5"/>`;
      }
      out += txt(cx, cy + 50, '聚成氦，放出能量', { size: 14, bold: true, color: '#d9480f' });
    }
    out += txt(cx, 26, ['跑得慢：远远就弹回去了', '快了些：还是撞不到一起', '跑得飞快：偶尔能撞到一起'][temp], { size: 13, bold: true, color: INK });
    out += txt(cx, 306, '图里只画了一步，真实要经过好几步才聚成一个氦', { size: 11, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    return [
      '常温下，两个氢原子核都带正电，跑得又慢，离得老远就被推开了，根本撞不到一起。',
      '太阳表面约 5500 ℃，原子核跑得快一些，可还是冲不过彼此的推力，聚变发生不了。',
      '太阳中心约 1500 万 ℃，原子核跑得飞快，偶尔能冲到一起，聚合成氦，放出巨大的能量。太阳的光和热就是从这里来的。',
    ][clamp(Math.round(s.temp), 0, 2)];
  },
};

/* ---------- 卫星导航与相对论时钟 ---------- */

const GPS_FIXES = [
  { name: '完全不校正相对论', rateUs: 38 },
  { name: '只管飞得快变慢（漏了高空）', rateUs: 45 },
  { name: '速度和高空两项都校正', rateUs: 0 },
] as const;

export const relativityClock: SimDef = {
  params: [
    { key: 'fix', label: '卫星原子钟', min: 0, max: 2, step: 1, value: 0, labels: GPS_FIXES.map(g => g.name) },
    { key: 'hours', label: '过去了多久', min: 0, max: 24, step: 4, value: 24, unit: ' 小时' },
  ],
  animated: true,
  still: 1,
  draw(s, t) {
    const mode = GPS_FIXES[clamp(Math.round(s.fix), 0, 2)];
    const driftUs = (mode.rateUs * s.hours) / 24;
    const errKm = driftUs * 0.3;
    let out = `<rect x="14" y="40" width="532" height="106" rx="14" fill="${SPACE}"/>`;
    const sx = 86 + ((t * 52) % 210);
    out += `<rect x="${n(sx - 24)}" y="78" width="48" height="14" rx="3" fill="#74c0fc"/><rect x="${n(sx - 9)}" y="70" width="18" height="30" rx="4" fill="#ffd43b"/>`;
    out += txt(168, 62, '约 2 万公里高空导航卫星', { size: 12, bold: true, color: '#fff', plain: true });
    out += txt(168, 118, '飞得快：每天慢约 7 微秒', { size: 11.5, color: '#a5d8ff', plain: true });
    out += txt(168, 136, '引力弱：每天快约 45 微秒', { size: 11.5, color: '#ffd43b', plain: true });

    out += `<rect x="336" y="54" width="194" height="78" rx="10" fill="#2c3a63"/>`;
    out += txt(433, 76, `${s.hours} 小时累计钟差`, { size: 12, color: PALE, plain: true });
    out += txt(433, 106, mode.rateUs === 0 ? '约 0 微秒（已对齐）' : `快了 ${n(driftUs)} 微秒`, { size: 17, bold: true, color: mode.rateUs === 0 ? '#8ce99a' : '#ffd43b', plain: true });
    out += txt(433, 124, '（1 微秒 = 百万分之一秒）', { size: 10.5, color: PALE, plain: true });

    out += `<rect x="14" y="158" width="532" height="134" rx="14" fill="#eef3e6" stroke="#ced8c0" stroke-width="1.5"/>`;
    out += `<line x1="30" y1="224" x2="530" y2="224" stroke="#ffffff" stroke-width="14"/>`;
    out += `<line x1="30" y1="224" x2="530" y2="224" stroke="#adb5bd" stroke-width="1.5" stroke-dasharray="10 8"/>`;
    out += `<line x1="150" y1="166" x2="150" y2="284" stroke="#ffffff" stroke-width="12"/>`;
    const carX = 150;
    const dotX = clamp(carX + errKm * 22, carX, 476);
    if (errKm > 0.1) {
      out += `<line x1="${carX}" y1="224" x2="${n(dotX)}" y2="224" stroke="${HOT}" stroke-width="3" stroke-dasharray="5 4"/>`;
      out += `<circle cx="${n(dotX)}" cy="224" r="18" fill="${HOT}" opacity="0.2"/>`;
    }
    out += `<text x="${carX}" y="214" font-size="24" text-anchor="middle">🚗</text>`;
    out += txt(carX, 256, '真车在这儿', { size: 12, bold: true });
    out += `<circle cx="${n(dotX)}" cy="224" r="7.5" fill="${mode.rateUs === 0 ? BLUE : HOT}" stroke="#fff" stroke-width="2.2"/>`;
    out += txt(dotX, 190, mode.rateUs === 0 ? '导航蓝点准准贴在车上' : `导航歪出去约 ${n(errKm)} 公里！`, { size: 12.5, bold: true, color: mode.rateUs === 0 ? BLUE : HOT });
    out += txt(W / 2, 25, mode.rateUs === 0 ? '把狭义和广义相对论一起算进去，导航才指得准路' : '光 1 微秒就跑 300 米——钟差一点点，地图偏出十几公里', { size: 14, bold: true, color: mode.rateUs === 0 ? BLUE : HOT });
    out += txt(W / 2, 310, '45 − 7 = 38 微秒/天：每天指路的手机，都在验证爱因斯坦的相对论', { size: 11.5, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const mode = GPS_FIXES[clamp(Math.round(s.fix), 0, 2)];
    const driftUs = (mode.rateUs * s.hours) / 24;
    const errKm = driftUs * 0.3;
    if (mode.rateUs === 0) return '把“飞得快慢 7 微秒”和“高空引力弱快 45 微秒”两笔账都提前校正后：卫星钟和地面钟步调一致，手机导航能准到几米之内';
    if (s.hours === 0) return '刚对好表那一刻还没偏；往右拖动时间滑块，看看几个小时后导航蓝点会偏到哪儿去';
    return `${mode.name}，过 ${s.hours} 小时：卫星上的原子钟比地面快了约 ${n(driftUs)} 微秒，无线电信号按光速一算，定位就歪出约 ${n(errKm)} 公里`;
  },
};

