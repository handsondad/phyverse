import { W, H, INK, HOT, BLUE, G, n, r1, r2, clamp, deg, rad, noise, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 能量与功 ---------------- */

type Track = { xs: number[]; ys: number[]; ss: number[]; samples: number[]; passes: boolean; h2: number };
const trackCache = new Map<string, Track>();
const START = 20;

function coasterTrack(hill: number, friction: number): Track {
  const key = `${hill}|${friction}`;
  const cached = trackCache.get(key);
  if (cached) return cached;
  const h2 = (START * hill) / 100;
  const keys: [number, number][] = [[0, START], [12, 2], [25, h2], [38, 2], [50, 22]];
  const height = (x: number): number => {
    for (let i = 1; i < keys.length; i += 1) {
      const [x0, y0] = keys[i - 1];
      const [x1, y1] = keys[i];
      if (x <= x1) return y0 + (y1 - y0) * (1 - Math.cos(((x - x0) / (x1 - x0)) * Math.PI)) / 2;
    }
    return keys[keys.length - 1][1];
  };
  const xs: number[] = [];
  const ys: number[] = [];
  const ss: number[] = [];
  for (let i = 0; i <= 500; i += 1) {
    const x = (50 * i) / 500;
    xs.push(x);
    ys.push(height(x));
    ss.push(i ? ss[i - 1] + Math.hypot(x - xs[i - 1], ys[i] - ys[i - 1]) : 0);
  }
  const at = (s: number): { i: number; k: number } => {
    let i = 1;
    while (i < ss.length - 1 && ss[i] < s) i += 1;
    const k = (s - ss[i - 1]) / Math.max(ss[i] - ss[i - 1], 1e-9);
    return { i, k: clamp(k, 0, 1) };
  };
  const mu = [0, 0.025, 0.07][friction];
  let pos = 0.4;
  let vel = 0.6;
  let maxX = 0;
  const samples: number[] = [];
  const dt = 0.01;
  for (let step = 0; step <= 1600; step += 1) {
    if (step % 5 === 0) samples.push(pos);
    const { i } = at(pos);
    const ds = ss[i] - ss[i - 1];
    const sin = (ys[i] - ys[i - 1]) / ds;
    const cos = (xs[i] - xs[i - 1]) / ds;
    let acc = -G * sin;
    if (mu && Math.abs(vel) > 0.02) acc -= Math.sign(vel) * mu * G * cos;
    else if (mu && Math.abs(G * sin) < mu * G * cos) { acc = 0; vel = 0; }
    vel += acc * dt;
    pos = clamp(pos + vel * dt, 0, ss[ss.length - 1]);
    maxX = Math.max(maxX, xs[at(pos).i]);
  }
  const track = { xs, ys, ss, samples, passes: maxX > 26, h2 };
  trackCache.set(key, track);
  return track;
}

export const coaster: SimDef = {
  params: [
    { key: 'hill', label: '第二个坡的高度（跟出发点比）', min: 50, max: 110, step: 10, value: 70, unit: '%' },
    { key: 'friction', label: '摩擦', min: 0, max: 2, step: 1, value: 0, labels: ['没有摩擦', '有一点', '摩擦很大'] },
  ],
  animated: true,
  still: 2.6,
  draw(s, t) {
    const track = coasterTrack(s.hill, s.friction);
    const [ox, oy, px] = [30, 296, 10];
    const pts: [number, number][] = track.xs.map((x, i) => [ox + x * px, oy - track.ys[i] * px]);
    let out = `<line x1="0" y1="${oy}" x2="${W}" y2="${oy}" stroke="${INK}" stroke-width="2"/>`;
    for (let i = 0; i < pts.length; i += 25) out += `<line x1="${n(pts[i][0])}" y1="${n(pts[i][1])}" x2="${n(pts[i][0])}" y2="${oy}" stroke="#d8cfc2" stroke-width="3"/>`;
    out += `<line x1="${ox}" y1="${oy - START * px}" x2="${W - 10}" y2="${oy - START * px}" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.6"/>`;
    out += txt(W - 14, oy - START * px - 6, '出发的高度', { anchor: 'end', size: 12, color: BLUE });
    out += `<polyline points="${poly(pts)}" fill="none" stroke="#8b4a2b" stroke-width="6" stroke-linejoin="round"/>`;
    const frame = Math.floor(((t % 16) / 16) * (track.samples.length - 1));
    const pos = track.samples[frame];
    const next = track.samples[Math.min(frame + 1, track.samples.length - 1)];
    let i = 1;
    while (i < track.ss.length - 1 && track.ss[i] < pos) i += 1;
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const ang = deg(Math.atan2(y1 - y0, x1 - x0));
    out += `<g transform="translate(${n(x0)} ${n(y0)}) rotate(${n(ang)})"><rect x="-16" y="-20" width="32" height="15" rx="5" fill="${HOT}" stroke="${INK}" stroke-width="2"/><circle cx="-9" cy="-4" r="4" fill="${INK}"/><circle cx="9" cy="-4" r="4" fill="${INK}"/></g>`;
    const h = track.ys[i];
    const v = Math.abs(next - pos) / 0.05;
    const total = G * START;
    const pe = G * h;
    const ke = Math.min(0.5 * v * v, total - pe);
    const heat = Math.max(total - pe - ke, 0);
    const bars: [string, number, string][] = [['势能', pe, BLUE], ['动能', ke, HOT], ['变成热', heat, '#b03f38']];
    bars.forEach(([label, value, color], k) => {
      const y = 18 + k * 20;
      out += txt(78, y + 11, label, { anchor: 'end', size: 13 });
      out += `<rect x="86" y="${y}" width="150" height="13" rx="6" fill="#f3ece0"/><rect x="86" y="${y}" width="${n(clamp(value / total, 0, 1) * 150)}" height="13" rx="6" fill="${color}"/>`;
    });
    out += txt(ox + 25 * px, oy - track.h2 * px - 12, `${n(track.h2)} 米`, { size: 13, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const track = coasterTrack(s.hill, s.friction);
    const lead = `从 ${START} 米高出发、第二个坡 ${n(track.h2)} 米：`;
    if (track.passes) return `${lead}冲过去了！${s.friction ? '有摩擦漏掉了一点能量，但还够用' : '没有摩擦时，最高能回到出发的高度'}`;
    return `${lead}冲不上去，滑回来了——${s.friction || s.hill < 100 ? '摩擦把一部分能量变成了热' : '想冲上比出发点还高的坡，能量账本不答应'}`;
  },
};

export const lever: SimDef = {
  params: [
    { key: 'd', label: '支点离石头', min: 0.2, max: 1.4, step: 0.2, value: 0.4, unit: ' m' },
    { key: 'w', label: '石头有多重', min: 400, max: 1200, step: 200, value: 800, unit: ' N' },
  ],
  animated: false,
  draw(s) {
    const L = 2;
    const [x0, px, y] = [60, 220, 170];
    const fx = x0 + s.d * px;
    const force = (s.w * s.d) / (L - s.d);
    const r = 24 + (s.w / 1200) * 22;
    let out = `<line x1="0" y1="262" x2="${W}" y2="262" stroke="${INK}" stroke-width="3"/>`;
    out += `<path d="M${fx} ${y + 4} L${fx - 26} 262 L${fx + 26} 262 Z" fill="#c8955b" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<line x1="${x0}" y1="${y}" x2="${x0 + L * px}" y2="${y}" stroke="#6b5a42" stroke-width="10" stroke-linecap="round"/>`;
    out += `<path d="M${n(x0 - r)} ${y - 5} Q${n(x0 - r)} ${n(y - 2 * r)} ${n(x0)} ${n(y - 2 * r)} Q${n(x0 + r * 1.1)} ${n(y - 2 * r)} ${n(x0 + r)} ${y - 5} Z" fill="#9a9187" stroke="${INK}" stroke-width="2.5"/>`;
    out += arrow(x0, y + 10, x0, y + 10 + clamp(s.w / 12, 20, 90), '#8b7a5c', 4);
    out += txt(x0, y + 30 + clamp(s.w / 12, 20, 90), `${s.w} N`, { size: 14, color: '#6b5a42' });
    const hx = x0 + L * px;
    const len = clamp(force / 10, 14, 100);
    out += arrow(hx, y - 20 - len, hx, y - 8, HOT, 5);
    out += `<text x="${hx + 4}" y="${n(y - 30 - len)}" font-size="30" text-anchor="middle">✋</text>`;
    out += txt(hx - 18, y - len / 2 - 10, `${Math.round(force)} N`, { anchor: 'end', size: 16, color: HOT, bold: true });
    const dim = (a: number, b: number, label: string, color: string): string =>
      `<line x1="${n(a)}" y1="${y + 26}" x2="${n(b)}" y2="${y + 26}" stroke="${color}" stroke-width="2"/>`
      + `<line x1="${n(a)}" y1="${y + 19}" x2="${n(a)}" y2="${y + 33}" stroke="${color}" stroke-width="2"/><line x1="${n(b)}" y1="${y + 19}" x2="${n(b)}" y2="${y + 33}" stroke="${color}" stroke-width="2"/>`
      + txt((a + b) / 2, y + 48, label, { size: 13, color });
    out += dim(x0, fx, `阻力臂 ${n(s.d)} m`, '#6b5a42');
    out += dim(fx, hx, `动力臂 ${n(L - s.d)} m`, HOT);
    return out;
  },
  readout(s) {
    const force = Math.round((s.w * s.d) / (2 - s.d));
    const verdict = force < s.w ? `省力：手上只要 ${force} N，是石头重量的 ${Math.round((force / s.w) * 100)}%` : `费力了：手上要用 ${force} N，比石头还重`;
    return `${s.w} N × ${n(s.d)} m = ${force} N × ${n(2 - s.d)} m → ${verdict}`;
  },
};

/* ---------------- 滑轮 ---------------- */

const PULLEYS = [
  { name: '定滑轮', ropes: 1, down: true, verdict: '不省力，但能站在下面往下拉' },
  { name: '动滑轮', ropes: 2, down: false, verdict: '省一半力，可手要往上提，绳子多拉一倍' },
  { name: '滑轮组', ropes: 2, down: true, verdict: '又省力又能往下拉，代价还是多拉一倍绳子' },
] as const;
const LOAD = 200;

function wheel(cx: number, cy: number, r: number): string {
  return `<circle cx="${n(cx)}" cy="${n(cy)}" r="${r}" fill="#e6e1d6" stroke="${INK}" stroke-width="3"/><circle cx="${n(cx)}" cy="${n(cy)}" r="4" fill="${INK}"/>`;
}
const rope = (x1: number, y1: number, x2: number, y2: number): string =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#8b5a2b" stroke-width="3"/>`;
const ropeArc = (cx: number, cy: number, r: number, over: boolean): string =>
  `<path d="M${n(cx - r)} ${n(cy)} A${r} ${r} 0 0 ${over ? 1 : 0} ${n(cx + r)} ${n(cy)}" fill="none" stroke="#8b5a2b" stroke-width="3"/>`;

export const pulley: SimDef = {
  params: [
    { key: 'kind', label: '用哪种滑轮', min: 0, max: 2, step: 1, value: 0, labels: PULLEYS.map(p => p.name) },
    { key: 'pull', label: '手把绳子拉了多长', min: 0, max: 1.2, step: 0.2, value: 0.6, unit: ' m' },
  ],
  animated: false,
  draw(s) {
    const p = PULLEYS[s.kind];
    const [px, floor, r] = [100, 300, 30];
    const rise = s.pull / p.ropes;
    const force = LOAD / p.ropes;
    let out = `<rect x="120" y="0" width="320" height="14" fill="#c8b8a0" stroke="${INK}" stroke-width="2"/>`;
    out += `<line x1="0" y1="${floor}" x2="${W}" y2="${floor}" stroke="${INK}" stroke-width="2"/>`;
    out += txt(14, 30, p.name, { anchor: 'start', size: 17, bold: true });
    out += txt(14, 52, `重物 ${LOAD} N`, { anchor: 'start', size: 13, color: '#6b5a42' });
    const loadX = s.kind === 0 ? 250 : s.kind === 1 ? 280 : 270;
    const top = floor - 50 - rise * px;
    let handX: number;
    let handY: number;
    if (s.kind === 0) {
      out += rope(280, 14, 280, 50) + wheel(280, 50, r);
      handX = 310;
      handY = 120 + s.pull * px;
      out += ropeArc(280, 50, r, true) + rope(250, 50, 250, top) + rope(310, 50, 310, handY);
    } else {
      const cx = s.kind === 1 ? 280 : 270;
      const cy = top - 34;
      out += rope(cx - r, 14, cx - r, cy) + ropeArc(cx, cy, r, false) + rope(cx, cy, cx, top);
      if (s.kind === 1) {
        handX = cx + r;
        handY = 150 - s.pull * px;
        out += rope(handX, cy, handX, handY);
      } else {
        out += rope(cx + r, cy, cx + r, 50) + rope(330, 14, 330, 50) + ropeArc(330, 50, r, true);
        handX = 360;
        handY = 120 + s.pull * px;
        out += rope(handX, 50, handX, handY) + wheel(330, 50, r);
      }
      out += wheel(cx, cy, r);
    }
    out += `<rect x="${loadX - 35}" y="${n(top)}" width="70" height="50" rx="6" fill="#9a9187" stroke="${INK}" stroke-width="2.5"/>`;
    out += txt(loadX, top + 31, `${LOAD} N`, { size: 14, color: '#fff', bold: true, plain: true });
    out += `<line x1="${loadX - 50}" y1="${floor - 50}" x2="${loadX + 50}" y2="${floor - 50}" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    if (rise > 0) out += arrow(loadX - 48, floor - 50, loadX - 48, top + 2, BLUE, 3);
    out += txt(loadX - 56, (floor - 50 + top) / 2 + 5, `重物升高 ${n(rise)} m`, { anchor: 'end', size: 13, color: BLUE });
    out += `<text x="${handX}" y="${n(handY + (p.down ? 20 : 4))}" font-size="26" text-anchor="middle">✊</text>`;
    const len = (force / LOAD) * 70;
    const ax = handX + 34;
    out += p.down ? arrow(ax, handY - len / 2, ax, handY + len / 2, HOT, 5) : arrow(ax, handY + len / 2, ax, handY - len / 2, HOT, 5);
    out += txt(ax + 14, handY - 2, `手用 ${force} N`, { anchor: 'start', size: 15, color: HOT, bold: true });
    out += txt(ax + 14, handY + 18, `拉了 ${n(s.pull)} m`, { anchor: 'start', size: 13, color: HOT });
    return out;
  },
  readout(s) {
    const p = PULLEYS[s.kind];
    return `${p.name}：手用 ${LOAD / p.ropes} N（重物 ${LOAD} N），手拉 ${n(s.pull)} m，重物升高 ${n(s.pull / p.ropes)} m——${p.verdict}`;
  },
};

/* ---------------- 斜面 ---------------- */

const BOX = 600;

export const ramp: SimDef = {
  params: [
    { key: 'len', label: '斜面有多长（台子高 1 m）', min: 1, max: 8, step: 1, value: 4, unit: ' m' },
    { key: 'fric', label: '摩擦', min: 0, max: 1, step: 1, value: 0, labels: ['不计摩擦', '有一点摩擦'] },
  ],
  animated: false,
  draw(s) {
    const [px, ground, edge] = [58, 290, 500];
    const sin = 1 / s.len;
    const cos = Math.sqrt(1 - sin * sin);
    const force = BOX * (sin + (s.fric ? 0.1 * cos : 0));
    const work = force * s.len;
    const topY = ground - px;
    const footX = edge - cos * s.len * px;
    let out = `<line x1="0" y1="${ground}" x2="${W}" y2="${ground}" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="${edge}" y="${topY}" width="${W - edge}" height="${px}" fill="#d8c9ad" stroke="${INK}" stroke-width="2"/>`;
    if (s.len > 1) out += `<polygon points="${n(footX)},${ground} ${edge},${topY} ${edge},${ground}" fill="#efe4cf" stroke="${INK}" stroke-width="2.5"/>`;
    const ang = -deg(Math.atan2(sin, cos));
    const mid = 0.45;
    const bx = footX + (edge - footX) * mid;
    const by = ground - px * mid;
    out += `<g transform="translate(${n(bx)} ${n(by)}) rotate(${n(ang)})"><rect x="-15" y="-30" width="30" height="30" rx="3" fill="#b08850" stroke="${INK}" stroke-width="2"/></g>`;
    const len = (force / BOX) * 110;
    const ux = s.len > 1 ? cos : 0;
    const uy = s.len > 1 ? -sin : -1;
    const ox = bx + ux * 22 - (s.len > 1 ? sin * 16 : 0);
    const oy = by + uy * 22 - (s.len > 1 ? cos * 16 : 16);
    out += arrow(ox, oy, ox + ux * len, oy + uy * len, HOT, 5);
    out += txt(ox + ux * len / 2 - 10, oy + uy * len / 2 - 14, `${Math.round(force)} N`, { anchor: 'end', size: 15, color: HOT, bold: true });
    const bars: [string, number, number, string, string][] = [
      ['推力', force, BOX, HOT, `${Math.round(force)} N`],
      ['推的路', s.len, 8, BLUE, `${s.len} m`],
      ['做的功', work, 1200, '#2f7a4d', `${Math.round(work)} J`],
    ];
    bars.forEach(([label, value, max, color, text], k) => {
      const y = 18 + k * 24;
      out += txt(64, y + 12, label, { anchor: 'end', size: 13 });
      out += `<rect x="72" y="${y}" width="170" height="14" rx="7" fill="#f3ece0"/><rect x="72" y="${y}" width="${n(clamp(value / max, 0, 1) * 170)}" height="14" rx="7" fill="${color}"/>`;
      out += txt(250, y + 12, text, { anchor: 'start', size: 13, color, bold: true });
    });
    out += txt(530, topY - 8, '1 m', { size: 13, color: '#6b5a42' });
    return out;
  },
  readout(s) {
    const sin = 1 / s.len;
    const force = BOX * (sin + (s.fric ? 0.1 * Math.sqrt(1 - sin * sin) : 0));
    const work = Math.round(force * s.len);
    if (s.len === 1) return `直接把 ${BOX} N 的箱子搬上 1 m 高的台子：用 ${BOX} N 的力，走 1 m，做功 ${BOX} J`;
    const tail = s.fric ? `——比直接搬多做了 ${work - BOX} J，多出来的被摩擦变成了热` : '——和直接搬上去一样多：省了力，就得多走路';
    return `斜面长 ${s.len} m：推力 ${Math.round(force)} N，要推 ${s.len} m，做功 ${work} J${tail}`;
  },
};

/* ---------------- 弹球 ---------------- */

const BALLS = [
  { name: '超级弹力球', keep: 0.8, r: 10, color: '#e8590c' },
  { name: '篮球', keep: 0.6, r: 20, color: '#d9822b' },
  { name: '橡皮泥球', keep: 0.02, r: 13, color: '#9b6bd1' },
] as const;
const FLOORS = [{ name: '硬地板', keep: 1 }, { name: '厚地毯', keep: 0.55 }] as const;
const DROP = 1.8;

function bounces(keep: number): number[] {
  const peaks = [DROP];
  while (peaks.length < 9 && peaks[peaks.length - 1] * keep > 0.02) peaks.push(peaks[peaks.length - 1] * keep);
  return peaks;
}

export const bounce: SimDef = {
  params: [
    { key: 'ball', label: '什么球', min: 0, max: 2, step: 1, value: 1, labels: BALLS.map(b => b.name) },
    { key: 'floor', label: '落在哪儿', min: 0, max: 1, step: 1, value: 0, labels: FLOORS.map(f => f.name) },
  ],
  animated: true,
  still: 0.9,
  draw(s, t) {
    const ball = BALLS[s.ball];
    const keep = ball.keep * FLOORS[s.floor].keep;
    const peaks = bounces(keep);
    const [px, ground, x] = [110, 292, 330];
    const fall = (h: number): number => Math.sqrt((2 * h) / G);
    const spans = peaks.map((h, k) => (k ? 2 * fall(h) : fall(h)));
    const total = spans.reduce((a, b) => a + b, 0);
    let clock = t % (total + 1.6);
    let k = 0;
    while (k < spans.length - 1 && clock > spans[k]) { clock -= spans[k]; k += 1; }
    const done = clock > spans[k] && k === spans.length - 1;
    const peak = peaks[k];
    const tPeak = k ? fall(peak) : 0;
    const h = done ? 0 : Math.max(peak - 0.5 * G * (Math.min(clock, spans[k]) - tPeak) ** 2, 0);
    let out = `<rect x="0" y="${ground}" width="${W}" height="${320 - ground}" fill="${s.floor ? '#c9a3a3' : '#d8c9ad'}"/>`;
    out += `<line x1="0" y1="${ground}" x2="${W}" y2="${ground}" stroke="${INK}" stroke-width="2"/>`;
    peaks.slice(0, k + 1).forEach((ph, i) => {
      const y = ground - ph * px;
      out += `<line x1="${x - 60}" y1="${n(y)}" x2="${x + 120}" y2="${n(y)}" stroke="${i ? HOT : BLUE}" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.7"/>`;
      if (i < 3) out += txt(x + 126, y + 5, i ? `第 ${i} 次 ${r2(ph)} m` : `松手 ${DROP} m`, { anchor: 'start', size: 13, color: i ? HOT : BLUE });
    });
    const y = ground - ball.r - h * px;
    out += `<circle cx="${x}" cy="${n(y)}" r="${ball.r}" fill="${ball.color}" stroke="${INK}" stroke-width="2"/>`;
    const lost = DROP - peak;
    const bars: [string, number, string][] = [['势能', h, BLUE], ['动能', Math.max(peak - h, 0), HOT], ['热和声音', lost + (done ? peak : 0), '#b03f38']];
    bars.forEach(([label, value, color], i) => {
      const by = 18 + i * 20;
      out += txt(86, by + 11, label, { anchor: 'end', size: 13 });
      out += `<rect x="94" y="${by}" width="150" height="13" rx="6" fill="#f3ece0"/><rect x="94" y="${by}" width="${n(clamp(value / DROP, 0, 1) * 150)}" height="13" rx="6" fill="${color}"/>`;
    });
    return out;
  },
  readout(s) {
    const ball = BALLS[s.ball];
    const floor = FLOORS[s.floor];
    const keep = ball.keep * floor.keep;
    if (keep < 0.05) return `${ball.name}从 ${DROP} 米落到${floor.name}上：几乎不弹——能量差不多全变成了把它压扁的热和“啪”的一声`;
    return `${ball.name}从 ${DROP} 米落到${floor.name}上：第一次弹回约 ${r2(DROP * keep)} 米（${Math.round(keep * 100)}%），第二次约 ${r2(DROP * keep * keep)} 米……每碰一次地，都有一部分能量变成热和声音`;
  },
};

/* ---------------- 保龄球摆锤 ---------------- */

const SWING = { px: 250, py: 12, len: 250, start: 40, period: 3.2, hold: 0.6, r: 24 };

function noseX(lean: number): number {
  return SWING.px + SWING.len * Math.sin(rad(SWING.start)) + SWING.r + (lean ? -14 : 3);
}
function swingAngle(push: number, tau: number): number {
  const amp = push ? 47 : SWING.start;
  const phase = Math.acos(SWING.start / amp);
  const fade = 1 - 0.03 * (tau / SWING.period);
  return amp * fade * Math.cos((2 * Math.PI * tau) / SWING.period + phase);
}
function edgeAt(theta: number): number {
  return SWING.px + SWING.len * Math.sin(rad(theta)) + SWING.r;
}
function swingHits(push: number, lean: number): boolean {
  let top = -90;
  for (let tau = SWING.period / 2; tau <= SWING.period; tau += 0.01) top = Math.max(top, swingAngle(push, tau));
  return edgeAt(top) >= noseX(lean);
}

export const pendulum: SimDef = {
  params: [
    { key: 'push', label: '松手的时候', min: 0, max: 1, step: 1, value: 0, labels: ['轻轻松手，不推', '顺手推了一下'] },
    { key: 'lean', label: '人站着', min: 0, max: 1, step: 1, value: 0, labels: ['后背贴墙不动', '往前探头看'] },
  ],
  animated: true,
  still: 4.2,
  draw(s, t) {
    const { px, py, len, start, period, hold, r } = SWING;
    const loop = hold + period + 1.6;
    const clock = t % loop;
    const nose = noseX(s.lean);
    const hits = swingHits(s.push, s.lean);
    let tau = clamp(clock - hold, 0, period);
    let hit = false;
    if (clock > hold) {
      for (let k = period / 2; k <= tau; k += 0.01) {
        if (edgeAt(swingAngle(s.push, k)) >= nose) { tau = k; hit = true; break; }
      }
    }
    const theta = clock <= hold ? start : swingAngle(s.push, tau);
    const bx = px + len * Math.sin(rad(theta));
    const by = py + len * Math.cos(rad(theta));
    const y0 = py + len * Math.cos(rad(start));
    const wall = noseX(0) + 34;
    let out = `<rect x="150" y="0" width="200" height="${py}" fill="#c8b8a0" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="${n(wall)}" y="0" width="${n(W - wall)}" height="320" fill="#efe6d6"/>`;
    out += `<line x1="20" y1="${n(y0 - r)}" x2="${n(wall)}" y2="${n(y0 - r)}" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.7"/>`;
    out += txt(24, y0 - r - 8, '出发的高度', { anchor: 'start', size: 12, color: BLUE });
    out += `<line x1="${px}" y1="${py}" x2="${n(bx)}" y2="${n(by)}" stroke="${INK}" stroke-width="2"/>`;
    out += `<circle cx="${n(bx)}" cy="${n(by)}" r="${r}" fill="#3b3f4a" stroke="${INK}" stroke-width="2"/>`;
    [[-6, -8], [5, -9], [0, 2]].forEach(([dx, dy]) => { out += `<circle cx="${n(bx + dx)}" cy="${n(by + dy)}" r="3" fill="#9aa0aa"/>`; });
    const ended = clock > hold + period - 0.05 || hit;
    const face = ended ? (hits ? '😵' : '😅') : '😮';
    out += `<text x="${n(nose + 16)}" y="${n(y0 + 12)}" font-size="34" text-anchor="middle">${face}</text>`;
    if (hit) out += `<text x="${n(nose)}" y="${n(y0 - 26)}" font-size="28" text-anchor="middle">💥</text>`;
    else if (ended) out += txt(nose - 4, y0 + 52, '差一点点', { anchor: 'end', size: 13, color: '#2f7a4d', bold: true });
    return out;
  },
  readout(s) {
    if (s.push) return '顺手推了一下：多给了它能量，荡回来比出发的高度还高——砸到鼻子了！';
    if (s.lean) return '往前探头：球并没有荡得更高，是你把脸伸进了它的路线——砸到了！';
    return '轻轻松手、贴墙不动：球最多回到出发的高度，空气还偷走了一点，停在鼻尖前——安全';
  },
};

/* ---------------- 爬楼梯 ---------------- */

const CLIMBERS = [{ name: '小念', kg: 30 }, { name: '爸爸', kg: 65 }] as const;
const FLOOR_H = 3;

export const stairs: SimDef = {
  params: [
    { key: 'who', label: '谁上楼', min: 0, max: 1, step: 1, value: 0, labels: CLIMBERS.map(c => `${c.name}（${c.kg} 千克）`) },
    { key: 'time', label: '上一层楼用了', min: 3, max: 20, step: 1, value: 15, unit: ' 秒' },
  ],
  animated: true,
  still: 2.5,
  draw(s, t) {
    const c = CLIMBERS[s.who];
    const work = c.kg * G * FLOOR_H;
    const power = work / s.time;
    const [x0, y0, steps, sw, sh] = [70, 290, 10, 30, 18];
    let out = `<line x1="0" y1="${y0}" x2="${W}" y2="${y0}" stroke="${INK}" stroke-width="2"/>`;
    let path = `M${x0} ${y0}`;
    for (let i = 0; i < steps; i += 1) path += ` L${x0 + i * sw} ${y0 - (i + 1) * sh} L${x0 + (i + 1) * sw} ${y0 - (i + 1) * sh}`;
    path += ` L${x0 + steps * sw} ${y0} Z`;
    out += `<path d="${path}" fill="#e6dccb" stroke="${INK}" stroke-width="2"/>`;
    const topY = y0 - steps * sh;
    out += `<line x1="${x0 - 22}" y1="${y0}" x2="${x0 - 22}" y2="${topY}" stroke="${BLUE}" stroke-width="2"/>`;
    out += `<line x1="${x0 - 30}" y1="${topY}" x2="${x0 - 14}" y2="${topY}" stroke="${BLUE}" stroke-width="2"/><line x1="${x0 - 30}" y1="${y0}" x2="${x0 - 14}" y2="${y0}" stroke="${BLUE}" stroke-width="2"/>`;
    out += txt(x0 - 26, (y0 + topY) / 2 + 5, `${FLOOR_H} m`, { anchor: 'end', size: 13, color: BLUE });
    const play = s.time / 3;
    const k = clamp((t % (play + 1.2)) / play, 0, 1);
    const fx = x0 + 10 + k * (steps * sw - 20);
    const fy = y0 - Math.ceil(clamp(k * steps, 0.01, steps)) * sh;
    const icon = s.time <= 6 ? '🏃' : '🚶';
    out += `<text transform="translate(${n(fx)} ${n(fy - 2)}) scale(-1 1)" font-size="${s.who ? 38 : 30}" text-anchor="middle">${icon}</text>`;
    out += txt(x0 + steps * sw / 2, y0 + 22, `${n(k * s.time)} 秒`, { size: 13, color: '#6b5a42' });
    const bars: [string, number, number, string, string][] = [
      ['做的功', work, 2000, '#2f7a4d', `${Math.round(work)} 焦`],
      ['功率', power, 700, HOT, `${Math.round(power)} 瓦`],
    ];
    bars.forEach(([label, value, max, color, text], i) => {
      const by = 200 + i * 40;
      out += txt(420, by - 6, label, { anchor: 'start', size: 13 });
      out += `<rect x="420" y="${by}" width="120" height="14" rx="7" fill="#f3ece0"/><rect x="420" y="${by}" width="${n(clamp(value / max, 0, 1) * 120)}" height="14" rx="7" fill="${color}"/>`;
      out += txt(540, by - 6, text, { anchor: 'end', size: 13, color, bold: true });
    });
    out += txt(420, 300, `≈ ${r2(power / 735)} 匹马力`, { anchor: 'start', size: 13, color: '#6b5a42' });
    return out;
  },
  readout(s) {
    const c = CLIMBERS[s.who];
    const work = Math.round(c.kg * G * FLOOR_H);
    const power = Math.round(work / s.time);
    const tail = s.time <= 6 ? '——跑上去：功一样多，功率大' : '——走上去：功一样多，功率小';
    return `${c.name}（${c.kg} 千克）上 ${FLOOR_H} 米高的一层楼：做功约 ${work} 焦；用 ${s.time} 秒，功率约 ${power} 瓦${tail}`;
  },
};

/* ---------------- 滑梯 ---------------- */

const SURFACES = [
  { name: '几乎没摩擦', mu: 0 },
  { name: '光滑的塑料滑梯', mu: 0.2 },
  { name: '粗糙的滑梯', mu: 0.4 },
] as const;
const SLOPE = 35;

function chuteRun(h: number, mu: number): { v: number; heat: number; time: number; length: number } {
  const sin = Math.sin(rad(SLOPE));
  const tan = Math.tan(rad(SLOPE));
  const heat = mu / tan;
  const length = h / sin;
  const acc = G * (sin - mu * Math.cos(rad(SLOPE)));
  return { v: Math.sqrt(2 * G * h * (1 - heat)), heat, time: Math.sqrt((2 * length) / acc), length };
}

export const chute: SimDef = {
  params: [
    { key: 'h', label: '滑梯有多高', min: 1, max: 3, step: 0.5, value: 2, unit: ' m' },
    { key: 'surface', label: '滑道', min: 0, max: 2, step: 1, value: 1, labels: SURFACES.map(x => x.name) },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const surface = SURFACES[s.surface];
    const run = chuteRun(s.h, surface.mu);
    const [px, ground, x0] = [60, 290, 110];
    const topY = ground - s.h * px;
    const footX = x0 + (s.h / Math.tan(rad(SLOPE))) * px;
    let out = `<line x1="0" y1="${ground}" x2="${W}" y2="${ground}" stroke="${INK}" stroke-width="2"/>`;
    out += `<line x1="${x0 - 30}" y1="${ground}" x2="${x0 - 30}" y2="${n(topY - 30)}" stroke="#8b7a5c" stroke-width="4"/><line x1="${x0}" y1="${ground}" x2="${x0}" y2="${n(topY - 30)}" stroke="#8b7a5c" stroke-width="4"/>`;
    for (let y = ground - 24; y > topY; y -= 24) out += `<line x1="${x0 - 30}" y1="${y}" x2="${x0}" y2="${y}" stroke="#8b7a5c" stroke-width="3"/>`;
    out += `<path d="M${x0} ${n(topY)} L${n(footX)} ${ground - 12} Q${n(footX + 20)} ${ground - 2} ${n(footX + 60)} ${ground - 4}" fill="none" stroke="#e8590c" stroke-width="8" stroke-linecap="round"/>`;
    const loop = run.time + 1.4;
    const k = clamp((t % loop) / run.time, 0, 1);
    const d = k * k;
    const kx = x0 + (footX - x0) * d;
    const ky = topY + (ground - 12 - topY) * d;
    out += `<text x="${n(kx)}" y="${n(ky - 4)}" font-size="30" text-anchor="middle">🧒</text>`;
    if (surface.mu > 0 && k > 0.05 && k < 1) {
      for (let i = 0; i < (surface.mu > 0.3 ? 5 : 3); i += 1) out += `<circle cx="${n(kx - 14 - i * 9)}" cy="${n(ky - 2 + noise(i + Math.floor(t * 8)) * 6)}" r="3" fill="${HOT}" opacity="${n(0.7 - i * 0.12)}"/>`;
    }
    const total = s.h;
    const pe = s.h * (1 - d);
    const lost = s.h * run.heat * d;
    const bars: [string, number, string][] = [['势能', pe, BLUE], ['动能', Math.max(total - pe - lost, 0), HOT], ['变成热', lost, '#b03f38']];
    bars.forEach(([label, value, color], i) => {
      const by = 18 + i * 20;
      out += txt(372, by + 11, label, { anchor: 'end', size: 13 });
      out += `<rect x="380" y="${by}" width="150" height="13" rx="6" fill="#f3ece0"/><rect x="380" y="${by}" width="${n(clamp(value / total, 0, 1) * 150)}" height="13" rx="6" fill="${color}"/>`;
    });
    out += txt(x0 - 36, topY + 5, `${n(s.h)} m`, { anchor: 'end', size: 13, color: BLUE });
    return out;
  },
  readout(s) {
    const surface = SURFACES[s.surface];
    const run = chuteRun(s.h, surface.mu);
    const ideal = chuteRun(s.h, 0).v;
    const lead = `从 ${n(s.h)} 米高滑下（${surface.name}）：到底部约 ${r1(run.v)} 米/秒`;
    if (!surface.mu) return `${lead}，高度几乎全换成了速度`;
    return `${lead}，比没摩擦时的 ${r1(ideal)} 米/秒慢；约 ${Math.round(run.heat * 100)}% 的能量被摩擦变成了热`;
  },
};

const PLANTS = [
  { name: '火力发电', src: '煤或天然气烧水', chain: '化学能 → 水蒸气内能 → 机械能 → 电能', spin: true },
  { name: '水力发电', src: '大坝高处落水', chain: '水的重力势能 → 动能 → 电能', spin: true },
  { name: '风力发电', src: '流动的空气', chain: '风的动能 → 叶片机械能 → 电能', spin: true },
  { name: '太阳能光伏', src: '太阳光直照硅板', chain: '光能 → 直接打出电流（电能）', spin: false },
] as const;

export const turbine: SimDef = {
  params: [{ key: 'kind', label: '换一种发电站', min: 0, max: 3, step: 1, value: 0, labels: PLANTS.map(p => p.name) }],
  animated: true,
  still: 0.8,
  draw(s, t) {
    const k = clamp(Math.round(s.kind), 0, 3);
    const plant = PLANTS[k];
    let out = `<rect x="14" y="42" width="156" height="196" rx="14" fill="#f7efe1" stroke="#dfcfb5" stroke-width="1.5"/>`;
    out += `<rect x="192" y="42" width="176" height="196" rx="14" fill="#f7efe1" stroke="#dfcfb5" stroke-width="1.5"/>`;
    out += `<rect x="390" y="42" width="156" height="196" rx="14" fill="#f7efe1" stroke="#dfcfb5" stroke-width="1.5"/>`;
    out += arrow(170, 140, 192, 140, HOT, 4) + arrow(368, 140, 390, 140, HOT, 4);
    if (k === 0) {
      out += `<rect x="44" y="156" width="96" height="44" rx="8" fill="#495057"/><text x="92" y="186" font-size="28" text-anchor="middle">🔥</text>`;
      for (let i = 0; i < 4; i += 1) {
        const u = (t * 0.8 + i / 4) % 1;
        out += `<circle cx="${n(68 + i * 16)}" cy="${n(146 - u * 54)}" r="${n(6 + u * 5)}" fill="#ced4da" opacity="${n(0.85 - u * 0.6)}"/>`;
      }
      out += txt(92, 222, '高压水蒸气往前冲', { size: 12.5, color: INK });
    } else if (k === 1) {
      out += `<rect x="30" y="78" width="54" height="110" fill="#74c0fc"/><rect x="84" y="74" width="18" height="114" fill="#8d8173"/>`;
      for (let i = 0; i < 4; i += 1) {
        const u = (t * 1.1 + i / 4) % 1;
        out += `<circle cx="${n(104 + u * 52)}" cy="${n(96 + u * 72)}" r="5" fill="${BLUE}"/>`;
      }
      out += txt(92, 222, '高处的水往下冲', { size: 12.5, color: BLUE });
    } else if (k === 2) {
      for (let i = 0; i < 4; i += 1) {
        const y = 92 + i * 26;
        const x = 32 + ((t * 95 + i * 33) % 96);
        out += `<line x1="${n(x)}" y1="${y}" x2="${n(x + 28)}" y2="${y}" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"/>`;
      }
      out += txt(92, 222, '大风推着叶片转', { size: 12.5, color: BLUE });
    } else {
      out += `<circle cx="58" cy="88" r="22" fill="#ffb703"/>`;
      for (let i = 0; i < 4; i += 1) {
        const u = (t * 0.9 + i / 4) % 1;
        out += `<circle cx="${n(74 + u * 64)}" cy="${n(102 + u * 58)}" r="4" fill="#f59f00"/>`;
      }
      out += txt(92, 222, '阳光照在光伏板上', { size: 12.5, color: '#c77d00' });
    }
    out += txt(92, 64, plant.src, { size: 13, bold: true });

    if (plant.spin) {
      const [cx, cy] = [280, 138];
      out += `<circle cx="${cx}" cy="${cy}" r="42" fill="#fffdf8" stroke="${INK}" stroke-width="2.5"/>`;
      for (let i = 0; i < 4; i += 1) {
        const a = t * 3.2 + (i * Math.PI) / 2;
        out += `<line x1="${cx}" y1="${cy}" x2="${n(cx + Math.cos(a) * 34)}" y2="${n(cy + Math.sin(a) * 34)}" stroke="${i % 2 ? BLUE : HOT}" stroke-width="6" stroke-linecap="round"/>`;
      }
      out += `<circle cx="${cx}" cy="${cy}" r="8" fill="${INK}"/>`;
      out += txt(280, 64, '轮机带着发电机转', { size: 13, bold: true });
      out += txt(280, 222, '磁铁在线圈里转出电流', { size: 12, color: '#8b7a5c' });
    } else {
      out += `<polygon points="214,168 262,102 346,102 298,168" fill="#2b579a" stroke="${INK}" stroke-width="2"/>`;
      out += `<line x1="238" y1="135" x2="322" y2="135" stroke="#a5d8ff" stroke-width="1.5"/><line x1="280" y1="102" x2="256" y2="168" stroke="#a5d8ff" stroke-width="1.5"/>`;
      out += txt(280, 64, '光伏板（不用转轮子）', { size: 13, bold: true });
      out += txt(280, 222, '光子直接把电子推成电流', { size: 12, color: BLUE });
    }

    out += `<line x1="406" y1="128" x2="508" y2="128" stroke="${INK}" stroke-width="3"/><line x1="406" y1="154" x2="508" y2="154" stroke="${INK}" stroke-width="3"/>`;
    for (let i = 0; i < 4; i += 1) {
      const x = 412 + ((t * 70 + i * 24) % 90);
      out += `<circle cx="${n(x)}" cy="128" r="3.5" fill="${HOT}"/>`;
    }
    out += `<circle cx="514" cy="141" r="22" fill="#fff3bf" opacity="0.85"/><text x="514" y="150" font-size="28" text-anchor="middle">💡</text>`;
    out += txt(468, 64, '顺着电网送到家', { size: 13, bold: true });
    out += txt(468, 222, '一按开关，同步发电', { size: 12, color: '#8b7a5c' });

    out += txt(W / 2, 24, `${plant.name}：电不是凭空造出来的，是别的能量换来的`, { size: 14.5, bold: true, color: BLUE });
    out += `<rect x="40" y="254" width="480" height="44" rx="12" fill="#fffdf8" stroke="#e2d5be" stroke-width="1.5"/>`;
    out += txt(W / 2, 281, plant.chain, { size: 14, bold: true, color: HOT });
    out += txt(W / 2, H - 6, '发电站只是“能量兑换站”', { size: 11.5, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const k = clamp(Math.round(s.kind), 0, 3);
    const p = PLANTS[k];
    return `${p.name}（${p.chain}）：${p.spin ? '靠蒸汽、水流或大风推着大轮子转，带动发电机在线圈里生出电流' : '不用烧水也不用转轮子，阳光照在半导体光伏板上就能直接生出电流'}`;
  },
};

