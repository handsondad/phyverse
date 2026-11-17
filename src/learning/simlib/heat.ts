import { W, INK, HOT, BLUE, WATER, n, clamp, smooth, noise, txt, arrow, poly, type State, type SimDef } from './kit';

/* ---------------- 热与物态 ---------------- */

const WIND = ['没有风', '微风', '大风'];
const evapRate = (s: State): number => 0.3 * 2 ** ((s.temp - 10) / 10) * [1, 2, 3.2][s.wind];

export const evaporation: SimDef = {
  params: [
    { key: 'temp', label: '汗水的温度', min: 10, max: 40, step: 5, value: 30, unit: ' ℃' },
    { key: 'wind', label: '风', min: 0, max: 2, step: 1, value: 0, labels: WIND },
  ],
  animated: true,
  still: 3,
  draw(s, t) {
    const rate = evapRate(s);
    let out = `<rect x="20" y="252" width="${W - 40}" height="50" rx="10" fill="#f4c7a1"/>`;
    out += txt(48, 284, '皮肤', { anchor: 'start', size: 15, color: '#8a5a33' });
    out += `<rect x="20" y="224" width="${W - 40}" height="30" rx="8" fill="#bfe0f5"/>`;
    out += txt(48, 244, '汗水', { anchor: 'start', size: 13, color: '#2f7fbf' });
    for (let i = 0; i < 34; i += 1) {
      const x = 100 + noise(i * 5 + 1) * 420 + Math.sin(t * (3 + s.temp / 10) + i) * 3;
      const y = 232 + noise(i * 5 + 2) * 16 + Math.cos(t * (4 + s.temp / 10) + i * 1.3) * 2;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="4" fill="#2f7fbf" opacity="0.8"/>`;
    }
    const slots = 14;
    const life = 2.6;
    for (let k = 0; k < slots; k += 1) {
      const cycle = t * (rate / slots) + k / slots;
      const tau = (cycle % 1) * (slots / rate);
      if (tau > life) continue;
      const seed = Math.floor(cycle) * 31 + k * 7;
      const x = 90 + noise(seed) * 400 + s.wind * tau * 70;
      const y = 226 - (tau / life) * 200;
      if (x > W - 10) continue;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="5" fill="${HOT}" opacity="${n(1 - tau / life)}"/>`;
    }
    if (s.wind) {
      for (let k = 0; k < 3; k += 1) {
        const y = 60 + k * 45;
        const x = ((t * 120 * s.wind + k * 150) % (W + 120)) - 120;
        out += arrow(x, y, x + 80, y, '#8fb8d8', 3);
      }
    }
    const stars = clamp(Math.round(rate / 1.4) + 1, 1, 5);
    out += txt(W - 24, 26, `蒸发快慢 ${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}`, { anchor: 'end', size: 16, color: HOT, bold: true });
    out += txt(W - 24, 48, '橙色：跑得最快、飞走的水分子', { anchor: 'end', size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const rate = evapRate(s);
    const base = evapRate({ temp: s.temp, wind: 0 });
    return s.wind
      ? `${s.temp} ℃、${WIND[s.wind]}：风把飞出来的水汽吹走，蒸发快了约 ${n(rate / base)} 倍，带走的热也多了这么多`
      : `${s.temp} ℃、没有风：飞出来的水汽堆在皮肤边上，有的又落回来，蒸发得慢`;
  },
};

const MATERIALS = ['铁', '石头', '木头', '泡沫'];
const EFFUSIVITY = [14000, 2500, 400, 40];
const MATERIAL_COLORS = ['#8d99a6', '#b9b2a6', '#c8955b', '#f1efe6'];
const contactTemp = (m: number): number => (1100 * 33 + EFFUSIVITY[m] * 5) / (1100 + EFFUSIVITY[m]);

export const conduction: SimDef = {
  params: [{ key: 'mat', label: '摸的是', min: 0, max: 3, step: 1, value: 0, labels: MATERIALS }],
  animated: true,
  still: 1.4,
  draw(s, t) {
    const m = s.mat;
    let out = `<rect x="40" y="206" width="420" height="64" rx="8" fill="${MATERIAL_COLORS[m]}" stroke="${INK}" stroke-width="2.5"/>`;
    out += txt(250, 296, `${MATERIALS[m]}：在冷风里放了一夜，5 ℃`, { size: 14, color: '#6b5a42' });
    out += `<path d="M216 40 L216 190 Q216 210 250 210 Q284 210 284 190 L284 40 Z" fill="#f4c7a1" stroke="${INK}" stroke-width="2.5"/>`;
    out += txt(250, 70, '手指 33 ℃', { size: 14, color: '#8a5a33' });
    const count = [18, 11, 5, 2][m];
    const speed = [150, 85, 35, 14][m];
    for (let i = 0; i < count; i += 1) {
      const cycle = (t * speed) / 180 + i / count;
      const p = cycle % 1;
      const seed = Math.floor(cycle) * 17 + i;
      const spread = (noise(seed) - 0.5) * 360;
      const x = p < 0.45 ? 236 + noise(seed + 3) * 28 : 250 + spread * ((p - 0.45) / 0.55);
      const y = p < 0.45 ? 110 + (p / 0.45) * 100 : 214 + noise(seed + 5) * 46;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="5" fill="${HOT}" opacity="${n(1 - p * 0.7)}"/>`;
    }
    const tc = contactTemp(m);
    const [tx, top, bottom] = [520, 50, 250];
    const level = bottom - ((tc - 0) / 40) * (bottom - top);
    out += `<rect x="${tx - 9}" y="${top}" width="18" height="${bottom - top}" rx="9" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="${tx}" cy="${bottom + 12}" r="16" fill="${HOT}" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="${tx - 5}" y="${n(level)}" width="10" height="${n(bottom + 2 - level)}" fill="${HOT}"/>`;
    out += txt(tx - 16, level + 5, `${Math.round(tc)} ℃`, { anchor: 'end', size: 15, bold: true, color: HOT });
    out += txt(tx, 32, '指尖皮肤', { size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const tc = Math.round(contactTemp(s.mat));
    return `${MATERIALS[s.mat]}和别的东西一样都是 5 ℃，可手指一碰，皮肤表面会降到约 ${tc} ℃${tc < 15 ? '——热被飞快地拉走，好冰！' : tc < 28 ? '——热跑得慢，只觉得有点凉' : '——热几乎跑不掉，不觉得凉'}`;
  },
};

/** 竖着的温度计：top 处是 hi ℃，bottom 处是 lo ℃ */
function thermometer(x: number, top: number, bottom: number, value: number, lo: number, hi: number, color = HOT): string {
  const level = bottom - ((clamp(value, lo, hi) - lo) / (hi - lo)) * (bottom - top);
  return `<rect x="${x - 9}" y="${top}" width="18" height="${bottom - top}" rx="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`
    + `<circle cx="${x}" cy="${bottom + 12}" r="15" fill="${color}" stroke="${INK}" stroke-width="2"/>`
    + `<rect x="${x - 5}" y="${n(level)}" width="10" height="${n(bottom + 2 - level)}" fill="${color}"/>`;
}

function flames(x0: number, gap: number, count: number, y: number, t: number): string {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const x = x0 + i * gap;
    const h = 16 + Math.sin(t * 9 + i * 1.7) * 5;
    out += `<path d="M${n(x - 7)} ${y} Q${n(x)} ${n(y - h * 2)} ${n(x + 7)} ${y} Z" fill="${i % 2 ? '#ffb347' : HOT}" opacity="0.85"/>`;
  }
  return out;
}

const ROOMS = ['冬天的厨房 5 ℃', '春秋的厨房 20 ℃', '夏天的厨房 32 ℃'];
const ROOM_T = [5, 20, 32];
const ROOM_SAY = [
  '冬天 5 ℃：水蒸气一出壶嘴就被冷空气冷成小水滴，白气又浓又长',
  '20 ℃：水蒸气出了壶嘴一小段才变成小水滴，白气飘一会儿就散了',
  '32 ℃：空气暖，水蒸气不容易冷下来，白气只有淡淡的一小团',
];

export const kettle: SimDef = {
  params: [
    { key: 'room', label: '厨房里', min: 0, max: 2, step: 1, value: 1, labels: ROOMS },
    { key: 'zoom', label: '看', min: 0, max: 1, step: 1, value: 0, labels: ['整个水壶', '放大看两段'] },
  ],
  animated: true,
  still: 3,
  draw(s, t) {
    const r = s.room;
    const [tx, ty] = [191, 166];
    const [dx, dy] = [0.3, -0.954];
    const gap = [12, 22, 38][r];
    const reach = [140, 105, 55][r];
    const count = [64, 42, 18][r];
    let out = flames(70, 22, 5, 304, t);
    out += `<path d="M40 292 L52 196 Q110 172 168 196 L180 292 Z" fill="#c9d3dc" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    out += `<path d="M160 222 L186 164 L196 170 L174 242 Z" fill="#c9d3dc" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    out += `<path d="M72 190 Q110 140 148 190" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    for (let k = 0; k < count; k += 1) {
      const cycle = t * 0.4 + k / count;
      const p = cycle % 1;
      const seed = Math.floor(cycle) * 41 + k * 3;
      const d = gap + p * reach;
      const side = (noise(seed) - 0.5) * (8 + p * 70) + Math.sin(t * 2 + k) * 3 * p;
      const x = tx + dx * d - dy * side;
      const y = ty + dy * d + dx * side;
      const op = 0.8 * (1 - p) ** 0.7 * smooth(p * 8);
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(5 + p * 11)}" fill="#fff" stroke="#aab6c2" stroke-width="1" opacity="${n(op)}"/>`;
    }
    const gapAt: [number, number] = [tx + (dx * gap) / 2, ty + (dy * gap) / 2];
    const cloudAt: [number, number] = [tx + dx * (gap + reach * 0.35), ty + dy * (gap + reach * 0.35)];
    out += `<ellipse cx="${n(gapAt[0])}" cy="${n(gapAt[1])}" rx="9" ry="${n(gap / 2 + 4)}" transform="rotate(17 ${n(gapAt[0])} ${n(gapAt[1])})" fill="none" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    if (!s.zoom) {
      out += `<line x1="${n(gapAt[0] + 10)}" y1="${n(gapAt[1])}" x2="262" y2="196" stroke="${BLUE}" stroke-width="1.5"/>`;
      out += txt(266, 201, '看不见的水蒸气', { anchor: 'start', size: 14, color: BLUE, bold: true });
      out += `<line x1="${n(cloudAt[0] + 20)}" y1="${n(cloudAt[1])}" x2="300" y2="86" stroke="${INK}" stroke-width="1.5"/>`;
      out += txt(304, 91, '白气：许许多多小水滴', { anchor: 'start', size: 14, bold: true });
    } else {
      const lens = (cx: number, cy: number, from: readonly [number, number], title: string, body: string): string =>
        `<line x1="${n(from[0])}" y1="${n(from[1])}" x2="${cx - 60}" y2="${cy}" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 3"/>`
        + `<circle cx="${cx}" cy="${cy}" r="62" fill="#fff" stroke="${INK}" stroke-width="3"/>${body}`
        + txt(cx, cy + 82, title, { size: 13, bold: true });
      let vapor = '';
      for (let i = 0; i < 7; i += 1) {
        const x = 330 + 40 * Math.sin(t * (2.4 + noise(i) * 3) + i * 2);
        const y = 200 + 40 * Math.sin(t * (2.9 + noise(i + 9) * 3) + i);
        vapor += `<circle cx="${n(x)}" cy="${n(y)}" r="4.5" fill="${BLUE}"/>`;
      }
      let drops = '';
      const pack = [[0, 0], [9, 0], [-9, 0], [4.5, 8], [-4.5, 8], [4.5, -8], [-4.5, -8]];
      for (let i = 0; i < 4; i += 1) {
        const cx = 450 + 26 * Math.sin(t * 0.5 + i * 1.6);
        const cy = 86 + 26 * Math.cos(t * 0.4 + i * 2.1);
        drops += pack.map(([ox, oy]) => `<circle cx="${n(cx + ox)}" cy="${n(cy + oy)}" r="4.5" fill="${BLUE}"/>`).join('');
      }
      out += lens(330, 200, gapAt, '壶嘴口：分开乱飞的水分子', vapor);
      out += lens(450, 86, cloudAt, '白气里：抱成团的小水滴', drops);
    }
    out += thermometer(530, 40, 250, ROOM_T[r], 0, 40, BLUE);
    out += txt(530, 30, `${ROOM_T[r]} ℃`, { size: 13, bold: true, color: BLUE });
    return out;
  },
  readout(s) {
    return `${ROOM_SAY[s.room]}；${s.zoom
      ? '放大看：壶嘴口是一个个分开乱飞的水分子，看不见；白气里是许多水分子抱成的小水滴，挡住了光才看得见'
      : '壶嘴口那一小段看起来空空的，那才是真正的水蒸气'}`;
  },
};

const WRAPS = ['什么也不包', '包一层薄布', '裹一件毛衣', '裹一件羽绒服'];
/** 示意值：热水降温的时间常数、冰化完要的时间（分钟） */
const TAU = [20, 30, 80, 160];
const MELT = [40, 55, 160, 320];
const minutesAt = (t: number): number => Math.min((t % 12) * 6, 60);
const hotWater = (w: number, m: number): number => 20 + 40 * Math.exp(-m / TAU[w]);
const iceLeft = (w: number, m: number): number => Math.max(0, 1 - m / MELT[w]);

export const insulate: SimDef = {
  params: [
    { key: 'wrap', label: '外面', min: 0, max: 3, step: 1, value: 0, labels: WRAPS },
    { key: 'what', label: '里面放', min: 0, max: 1, step: 1, value: 0, labels: ['一杯 60 ℃ 的热水', '一块冰'] },
  ],
  animated: true,
  still: 10.5,
  draw(s, t) {
    const w = s.wrap;
    const ice = s.what === 1;
    const m = minutesAt(t);
    const [cx, top, bottom, half] = [220, 120, 262, 48];
    const mid = (top + bottom) / 2;
    const thick = [0, 7, 20, 32][w];
    let out = `<rect x="20" y="${bottom}" width="${W - 40}" height="12" rx="4" fill="#d9c7a8"/>`;
    if (thick) {
      out += `<rect x="${cx - half - thick}" y="${top - thick}" width="${2 * (half + thick)}" height="${bottom - top + thick}" rx="${8 + thick / 2}" fill="${['', '#ece6d8', '#d9776b', '#86acd9'][w]}" stroke="${INK}" stroke-width="2"/>`;
      if (w >= 2) {
        for (let i = 0; i < (w === 2 ? 20 : 30); i += 1) {
          const [a, b] = [noise(i * 3 + 1), noise(i * 3 + 2)];
          const [x, y] = [
            [cx - half - thick + a * thick, cx + half + a * thick, cx - half + a * 2 * half][i % 3],
            [top + b * (bottom - top - 6), top + b * (bottom - top - 6), top - thick + 3 + b * (thick - 6)][i % 3],
          ];
          out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(2 + noise(i * 3 + 5) * thick * 0.12)}" fill="#fff" opacity="0.85"/>`;
        }
      }
    }
    out += `<rect x="${cx - half}" y="${top}" width="${2 * half}" height="${bottom - top}" rx="6" fill="#f7f3ea" stroke="${INK}" stroke-width="2.5"/>`;
    let flux: number;
    if (!ice) {
      const temp = hotWater(w, m);
      const k = (temp - 20) / 40;
      const mix = (a: number, b: number): number => Math.round(b + (a - b) * k);
      out += `<rect x="${cx - half + 5}" y="${top + 18}" width="${2 * half - 10}" height="${bottom - top - 23}" rx="4" fill="rgb(${mix(244, 168)}, ${mix(140, 213)}, ${mix(90, 242)})"/>`;
      out += thermometer(470, 70, 230, temp, 0, 70);
      out += txt(492, 160, `水温 ${Math.round(temp)} ℃`, { anchor: 'start', size: 14, bold: true, color: HOT });
      flux = (temp - 20) / TAU[w] / 2;
    } else {
      const left = iceLeft(w, m);
      const puddle = (1 - left) * 34;
      out += `<rect x="${cx - half + 5}" y="${n(bottom - 5 - puddle)}" width="${2 * half - 10}" height="${n(puddle)}" rx="3" fill="${WATER}"/>`;
      if (left > 0) {
        const side = 18 + 46 * Math.sqrt(left);
        out += `<rect x="${n(cx - side / 2)}" y="${n(bottom - 5 - puddle - side)}" width="${n(side)}" height="${n(side)}" rx="6" fill="#e6f6ff" stroke="#7fb3d5" stroke-width="2"/>`;
      }
      out += `<rect x="420" y="150" width="120" height="16" rx="8" fill="#fff" stroke="${INK}" stroke-width="2"/><rect x="422" y="152" width="${n(116 * left)}" height="12" rx="6" fill="#7fb3d5"/>`;
      out += txt(480, 140, left > 0 ? `冰还剩 ${Math.round(left * 100)}%` : '冰化完了', { size: 14, bold: true, color: BLUE });
      flux = 40 / MELT[w];
    }
    const dots = flux > 0.02 ? Math.max(1, Math.round(14 * flux)) : 0;
    for (let i = 0; i < dots; i += 1) {
      const cycle = t * 0.5 + i / dots;
      const p = cycle % 1;
      const angle = -Math.PI * (0.1 + 0.8 * noise(Math.floor(cycle) * 13 + i));
      const along = ice ? 1 - p : p;
      const radius = 40 + along * 120;
      const x = cx + Math.cos(angle) * radius * 1.1;
      const y = mid + Math.sin(angle) * radius * 0.8;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="5" fill="${HOT}" opacity="${n(0.9 * Math.sin(p * Math.PI))}"/>`;
    }
    out += txt(cx, 30, ice ? '屋里 20 ℃ 的热往冰里钻' : '热从水里往外跑', { size: 14, bold: true, color: HOT });
    out += txt(480, 40, `过了 ${Math.round(m)} 分钟`, { size: 16, bold: true });
    if (w >= 2) out += txt(cx, 300, w === 2 ? '毛衣里藏着许多不流动的空气' : '羽绒里藏着的空气更多', { size: 13, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const w = s.wrap;
    if (s.what === 1) {
      const left = iceLeft(w, 60);
      const head = left > 0 ? `${WRAPS[w]}：1 小时后，冰还剩约 ${Math.round(left * 100)}%` : `${WRAPS[w]}：不到 1 小时，冰就化完了`;
      return w >= 2 ? `${head}——毛衣不分冷热，它也挡住了屋里的热往冰里钻` : head;
    }
    const head = `${WRAPS[w]}：1 小时后，热水还有约 ${Math.round(hotWater(w, 60))} ℃`;
    return `${head}${['——热一直往外跑，很快就凉了', '——薄布只挡住了一点点', '——毛衣自己不发热，是里面不流动的空气把热挡住了', '——羽绒里不流动的空气更多，热跑得更慢'][w]}`;
  },
};

const PLACES = ['拉萨（约 65 千帕）', '海边（约 101 千帕）', '高压锅里（约 180 千帕）'];
const PRESSURE = [65, 101.325, 180];
/** 沸点随气压：按 NIST 水的饱和数据拟合（100 ℃ ↔ 101.3 千帕，117.7 ℃ ↔ 184.5 千帕） */
const boilingPoint = (kpa: number): number => 1 / (1 / 373.124 - Math.log(kpa / 101.325) / 4937) - 273.15;

export const boil: SimDef = {
  params: [
    { key: 'where', label: '在哪儿烧水', min: 0, max: 2, step: 1, value: 1, labels: PLACES },
    { key: 'fire', label: '火', min: 0, max: 1, step: 1, value: 0, labels: ['小火', '大火'] },
  ],
  animated: true,
  still: 12.5,
  draw(s, t) {
    const tb = boilingPoint(PRESSURE[s.where]);
    const rate = [10, 20][s.fire];
    const tau = t % 14;
    const tempAt = (x: number): number => Math.min(tb, 20 + rate * x);
    const now = tempAt(tau);
    const boiling = now >= tb - 0.01;
    let out = flames(s.fire ? 62 : 92, s.fire ? 28 : 34, s.fire ? 7 : 4, 306, t);
    out += `<path d="M50 160 L60 292 L230 292 L240 160 Z" fill="#c9d3dc" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    out += `<path d="M56 186 L64 286 L226 286 L234 186 Z" fill="${WATER}"/>`;
    if (s.where === 2) {
      out += `<path d="M42 162 Q145 116 248 162 Z" fill="#aab6c2" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
      out += `<rect x="139" y="116" width="12" height="16" rx="3" fill="#7d8790" stroke="${INK}" stroke-width="2"/>`;
      if (boiling) out += `<path d="M145 110 q-8 -10 0 -20 q8 -10 0 -20" fill="none" stroke="#aab6c2" stroke-width="4" stroke-linecap="round" opacity="${n(0.5 + 0.4 * Math.sin(t * 6))}"/>`;
      out += txt(40, 132, '锁紧的锅盖', { anchor: 'start', size: 12, color: '#8b7a5c' });
    }
    if (now > 60) {
      const count = boiling ? (s.fire ? 18 : 10) : 3;
      for (let k = 0; k < count; k += 1) {
        const cycle = t * (boiling ? 0.9 : 0.4) + k / count;
        const p = cycle % 1;
        const x = 74 + noise(Math.floor(cycle) * 17 + k) * 142;
        const y = 280 - p * (boiling ? 92 : 30);
        out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(3 + p * 5)}" fill="#fff" stroke="#7fb3d5" stroke-width="1.5" opacity="${n(1 - p * 0.5)}"/>`;
      }
    }
    out += txt(145, 70, `水温 ${Math.round(now)} ℃${boiling ? ' · 开了' : ''}`, { size: 16, bold: true, color: boiling ? HOT : INK });
    const [gx0, gx1, gy0, gy1] = [320, 540, 260, 40];
    const gx = (x: number): number => gx0 + (x / 14) * (gx1 - gx0);
    const gy = (v: number): number => gy0 - (v / 130) * (gy0 - gy1);
    out += `<line x1="${gx0}" y1="${gy0}" x2="${gx1}" y2="${gy0}" stroke="${INK}" stroke-width="2"/><line x1="${gx0}" y1="${gy0}" x2="${gx0}" y2="${gy1}" stroke="${INK}" stroke-width="2"/>`;
    out += txt(gx0 + 4, gy1 - 8, '水温', { anchor: 'start', size: 12, color: '#8b7a5c' });
    out += txt(gx1, gy0 + 18, '烧的时间 →', { anchor: 'end', size: 12, color: '#8b7a5c' });
    out += `<line x1="${gx0}" y1="${n(gy(100))}" x2="${gx1}" y2="${n(gy(100))}" stroke="#aab6c2" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    out += txt(gx0 - 6, gy(100) + 4, '100', { anchor: 'end', size: 11, color: '#8b7a5c' });
    out += txt(gx0 - 6, gy(50) + 4, '50', { anchor: 'end', size: 11, color: '#8b7a5c' });
    out += `<line x1="${gx0}" y1="${n(gy(tb))}" x2="${gx1}" y2="${n(gy(tb))}" stroke="${HOT}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    out += txt(gx1, gy(tb) + (tb < 100 ? 18 : -8), `沸点约 ${Math.round(tb)} ℃`, { anchor: 'end', size: 13, bold: true, color: HOT });
    const pts: [number, number][] = [];
    for (let i = 0; i <= 40; i += 1) {
      const x = (tau * i) / 40;
      pts.push([gx(x), gy(tempAt(x))]);
    }
    out += `<polyline points="${poly(pts)}" fill="none" stroke="${HOT}" stroke-width="3.5" stroke-linejoin="round"/>`;
    out += `<circle cx="${n(gx(tau))}" cy="${n(gy(now))}" r="6" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
    return out;
  },
  readout(s) {
    const tb = Math.round(boilingPoint(PRESSURE[s.where]));
    const place = PLACES[s.where].replace(/（.*）/, '');
    const tail = ['——比 100 ℃ 低十多度，饭和面不容易煮熟', '', '——比 100 ℃ 高十几度，饭菜熟得快'][s.where];
    return `${place}：水到约 ${tb} ℃ 就开了；${s.fire ? '大火只让它开得更快' : '小火开得慢一点'}，开了以后再烧，水温也停在 ${tb} ℃${tail}`;
  },
};

const HUMID = ['干燥的天（湿度 30%）', '普通的天（湿度 60%）', '闷热的天（湿度 85%）'];
const RH = [30, 60, 85];
const AIR_T = 30;
/** 露点：Magnus 公式 */
const dewPoint = (rh: number): number => {
  const g = Math.log(rh / 100) + (17.62 * AIR_T) / (243.12 + AIR_T);
  return (243.12 * g) / (17.62 - g);
};

export const dew: SimDef = {
  params: [
    { key: 'cup', label: '杯子的温度', min: 0, max: 30, step: 2, value: 4, unit: ' ℃' },
    { key: 'humid', label: '空气 30 ℃', min: 0, max: 2, step: 1, value: 1, labels: HUMID },
  ],
  animated: true,
  still: 6,
  draw(s, t) {
    const td = dewPoint(RH[s.humid]);
    const wet = clamp((td - s.cup) / 12, 0, 1);
    const grow = smooth(t / 5);
    const edge = (y: number): [number, number] => [140 + ((y - 60) / 220) * 10, 260 - ((y - 60) / 220) * 10];
    let out = `<path d="M136 60 L264 60 L252 282 L148 282 Z" fill="#f4fbff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    out += `<path d="M142 96 L258 96 L250 278 L150 278 Z" fill="${s.cup < 20 ? '#c98a4b' : '#ddb98f'}" opacity="0.85"/>`;
    if (s.cup <= 8) {
      out += `<rect x="160" y="104" width="34" height="34" rx="6" fill="#e6f6ff" stroke="#7fb3d5" stroke-width="2" transform="rotate(12 177 121)"/>`;
      out += `<rect x="204" y="112" width="30" height="30" rx="6" fill="#e6f6ff" stroke="#7fb3d5" stroke-width="2" transform="rotate(-9 219 127)"/>`;
    }
    if (wet > 0) {
      out += `<path d="M136 60 L264 60 L252 282 L148 282 Z" fill="#fff" opacity="${n(0.45 * grow * (0.4 + wet * 0.6))}"/>`;
      out += `<ellipse cx="200" cy="286" rx="${n(40 + 30 * wet * grow)}" ry="5" fill="#9cc7e8" opacity="${n(0.7 * grow * wet)}"/>`;
    }
    const drops = Math.round(46 * wet);
    for (let i = 0; i < drops; i += 1) {
      const y = 70 + noise(i * 5 + 1) * 205;
      const [l, r] = edge(y);
      const x = l + 6 + noise(i * 5 + 2) * (r - l - 12);
      const size = (2.5 + noise(i * 5 + 3) * 4) * grow * (0.5 + wet / 2);
      if (size < 0.6) continue;
      out += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(size)}" ry="${n(size * 1.3)}" fill="#d6ecfb" stroke="#3a7bb5" stroke-width="1.4"/>`
        + `<circle cx="${n(x - size * 0.35)}" cy="${n(y - size * 0.45)}" r="${n(size * 0.3)}" fill="#fff"/>`;
    }
    if (wet > 0 && grow > 0.5) {
      out += `<line x1="258" y1="150" x2="300" y2="120" stroke="${INK}" stroke-width="1.5"/>`;
      out += txt(302, 116, '杯子外面的小水珠', { anchor: 'start', size: 13, bold: true, color: '#3a7bb5' });
    }
    for (let i = 0; i < 22; i += 1) {
      const cycle = t * 0.22 + noise(i * 7);
      const p = cycle % 1;
      const seed = Math.floor(cycle) * 23 + i;
      const home: [number, number] = [20 + noise(seed) * 330, 24 + noise(seed + 1) * 270];
      if (home[0] > 120 && home[0] < 280) home[0] += home[0] < 200 ? -70 : 70;
      let [x, y] = home;
      let op = 0.8;
      if (wet > 0 && i % 2 === 0) {
        const ty = 80 + noise(seed + 2) * 190;
        const [l, r] = edge(ty);
        const tx = home[0] < 200 ? l : r;
        const k = smooth(p * 1.3);
        x = home[0] + (tx - home[0]) * k;
        y = home[1] + (ty - home[1]) * k;
        op = 0.8 * (1 - smooth((p - 0.75) * 4));
      } else {
        x += Math.sin(t * 1.3 + i) * 10;
        y += Math.cos(t * 1.1 + i * 2) * 8;
      }
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="3.5" fill="${BLUE}" opacity="${n(op)}"/>`;
    }
    out += txt(200, 306, '蓝点：空气里看不见的水汽', { size: 12, color: '#8b7a5c' });
    const [ax, top, bottom] = [420, 40, 280];
    const ay = (v: number): number => bottom - (v / 35) * (bottom - top);
    out += `<rect x="${ax - 6}" y="${n(ay(td))}" width="12" height="${n(bottom - ay(td))}" fill="#cfe5f7"/>`;
    out += `<line x1="${ax}" y1="${top}" x2="${ax}" y2="${bottom}" stroke="${INK}" stroke-width="2.5"/>`;
    out += txt(ax - 12, ay(0) + 4, '0 ℃', { anchor: 'end', size: 11, color: '#8b7a5c' });
    const mark = (v: number, label: string, color: string, dash = ''): string =>
      `<line x1="${ax - 14}" y1="${n(ay(v))}" x2="${ax + 14}" y2="${n(ay(v))}" stroke="${color}" stroke-width="3"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
      + txt(ax + 20, ay(v) + 5, label, { anchor: 'start', size: 13, bold: true, color });
    out += mark(AIR_T, '空气 30 ℃', '#8b7a5c');
    out += mark(td, `露点约 ${Math.round(td)} ℃`, BLUE, '5 3');
    const cupLabelY = Math.abs(s.cup - td) < 3 ? (s.cup < td ? s.cup - 2.5 : s.cup + 2.5) : s.cup;
    out += `<line x1="${ax - 14}" y1="${n(ay(s.cup))}" x2="${ax + 14}" y2="${n(ay(s.cup))}" stroke="${HOT}" stroke-width="3"/>`;
    out += txt(ax + 20, ay(cupLabelY) + 5, `杯壁 ${s.cup} ℃`, { anchor: 'start', size: 13, bold: true, color: HOT });
    out += txt(ax, 24, '比露点冷的地方会结出水珠', { size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const td = Math.round(dewPoint(RH[s.humid]));
    const head = `空气 30 ℃、湿度 ${RH[s.humid]}%：露点约 ${td} ℃。`;
    return s.cup < td
      ? `${head}杯壁 ${s.cup} ℃ 比露点低，贴着杯子的水汽被冷成小水珠——杯子“出汗”了`
      : `${head}杯壁 ${s.cup} ℃ 不比露点低，水汽冷得不够，杯子是干的`;
  },
};

/** 示意：同样多的沙子和水，晒同样多的太阳；温度变化之比 = 比热容的反比 4.2 : 0.92 */
const SAND_RATE = [5, 6];
const ratio = 0.92 / 4.2;
const beachTemps = (night: boolean, h: number): [number, number] => night
  ? [50 - SAND_RATE[1] * h, 25 + SAND_RATE[0] * 5 * ratio - SAND_RATE[1] * h * ratio]
  : [25 + SAND_RATE[0] * h, 25 + SAND_RATE[0] * h * ratio];

export const heatCap: SimDef = {
  params: [
    { key: 'phase', label: '什么时候', min: 0, max: 1, step: 1, value: 0, labels: ['白天晒太阳', '太阳下山以后'] },
    { key: 'hours', label: '过了几个小时', min: 0, max: 5, step: 1, value: 3, unit: ' 小时' },
  ],
  animated: true,
  still: 1,
  draw(s, t) {
    const night = s.phase === 1;
    const [sand, sea] = beachTemps(night, s.hours);
    let out = '';
    if (night) {
      out += `<rect x="0" y="0" width="${W}" height="200" fill="#2f3b63" opacity="0.88"/>`;
      out += `<circle cx="280" cy="44" r="20" fill="#f6f1c7"/><circle cx="290" cy="38" r="18" fill="#2f3b63"/>`;
      for (let i = 0; i < 12; i += 1) out += `<circle cx="${n(90 + noise(i) * 380)}" cy="${n(14 + noise(i + 30) * 90)}" r="1.6" fill="#fff" opacity="${n(0.5 + 0.5 * Math.sin(t * 2 + i))}"/>`;
    } else {
      out += `<circle cx="280" cy="42" r="24" fill="#ffd54f" stroke="#f0a020" stroke-width="3"/>`;
      out += arrow(258, 70, 170, 186, '#f0a020', 3) + arrow(302, 70, 390, 186, '#f0a020', 3);
    }
    out += `<path d="M0 200 L280 196 L280 320 L0 320 Z" fill="#ecd29a"/>`;
    for (let i = 0; i < 40; i += 1) out += `<circle cx="${n(noise(i * 2) * 275)}" cy="${n(206 + noise(i * 2 + 1) * 110)}" r="1.6" fill="#c9a86a"/>`;
    let wave = 'M280 200';
    for (let x = 280; x <= W; x += 10) wave += ` L${x} ${n(200 + Math.sin(x / 18 + t * 2) * 3)}`;
    out += `<path d="${wave} L${W} 320 L280 320 Z" fill="#7fb3d5"/>`;
    out += txt(140, 250, '砂石：吸热升温快', { size: 13, bold: true, color: '#8a5a33' });
    out += txt(420, 250, '水：吸同样的热，升温慢', { size: 13, bold: true, color: '#1f4e79' });
    const label = night ? { plain: true, color: '#fff' } : {};
    out += thermometer(36, 50, 168, sand, 0, 60);
    out += txt(56, 120, `沙子 ${Math.round(sand)} ℃`, { anchor: 'start', size: 14, bold: true, ...label });
    out += thermometer(524, 50, 168, sea, 0, 60, BLUE);
    out += txt(504, 120, `海水 ${Math.round(sea)} ℃`, { anchor: 'end', size: 14, bold: true, ...label });
    const diff = sand - sea;
    if (Math.abs(diff) > 0.5) {
      const toLand = diff > 0;
      for (let k = 0; k < 3; k += 1) {
        const p = (t * 0.45 + k / 3) % 1;
        const x = toLand ? 380 - p * 200 : 180 + p * 200;
        out += arrow(x, 160 + k * 8, x + (toLand ? -40 : 40), 160 + k * 8, night ? '#cfe5f7' : '#5b9bd5', 3);
      }
      out += txt(280, 145, toLand ? '海风：从海上吹向陆地' : '陆风：从陆地吹向海上', { size: 13, bold: true, color: night ? '#fff' : '#1f4e79', plain: night });
    }
    return out;
  },
  readout(s) {
    const night = s.phase === 1;
    const [sand, sea] = beachTemps(night, s.hours).map(v => Math.round(v));
    if (!night) {
      return s.hours
        ? `晒了 ${s.hours} 小时：沙子升到约 ${sand} ℃，海水才到约 ${sea} ℃——水的比热容是砂石的 4 倍多，吸同样多的热，温度只升一点点`
        : '太阳刚出来：沙子和海水都是 25 ℃，拖动小时数看看谁升温快';
    }
    return `太阳下山 ${s.hours} 小时：沙子降到约 ${sand} ℃，海水还有约 ${sea} ℃${sand < sea ? '——沙子比海水凉了，风改成从陆地吹向海上' : '——沙子降得快，海水降得慢'}`;
  },
};

const WATERS = ['冷水（10 ℃）', '温水（40 ℃）', '热水（80 ℃）'];
/** 墨粒散开的快慢 ∝ 温度 ÷ 水的黏度（斯托克斯—爱因斯坦），以冷水为 1 */
const SPREAD = [1, 2.2, 4.6];
const gauss = (seed: number): [number, number] => {
  const r = Math.sqrt(-2 * Math.log(Math.max(noise(seed * 2), 1e-6)));
  const a = 2 * Math.PI * noise(seed * 2 + 1);
  return [r * Math.cos(a), r * Math.sin(a)];
};
const reflect = (v: number, lo: number, hi: number): number => clamp(v < lo ? 2 * lo - v : v > hi ? 2 * hi - v : v, lo, hi);

export const diffuse: SimDef = {
  params: [
    { key: 'temp', label: '杯子里是', min: 0, max: 2, step: 1, value: 0, labels: WATERS },
    { key: 'zoom', label: '看', min: 0, max: 1, step: 1, value: 0, labels: ['整杯水', '放大看一颗墨粒'] },
  ],
  animated: true,
  still: 9,
  draw(s, t) {
    const k = SPREAD[s.temp];
    const tau = t % 14;
    if (!s.zoom) {
      let out = `<rect x="150" y="30" width="260" height="266" rx="10" fill="${WATER}" stroke="${INK}" stroke-width="2.5"/>`;
      if (tau < 0.6) {
        out += `<circle cx="280" cy="${n(6 + (tau / 0.6) * 64)}" r="7" fill="#2b2d6e"/>`;
        return out + txt(280, 314, WATERS[s.temp], { size: 13, color: '#8b7a5c' });
      }
      const sigma = 5 + 16 * Math.sqrt(k * (tau - 0.6));
      const cy = 70 + Math.min(sigma * 0.7, 140);
      for (let i = 0; i < 150; i += 1) {
        const [gx, gy] = gauss(i + 1);
        const jitter = (noise(i * 31 + Math.floor(t * 8)) - 0.5) * 2 * Math.sqrt(k);
        const x = reflect(280 + gx * sigma * 1.1 + jitter, 158, 402);
        const y = reflect(cy + gy * sigma * 0.9 + jitter, 38, 288);
        out += `<circle cx="${n(x)}" cy="${n(y)}" r="4" fill="#2b2d6e" opacity="0.5"/>`;
      }
      return out + txt(280, 314, `${WATERS[s.temp]} · 一直没有搅`, { size: 13, color: '#8b7a5c' });
    }
    const [cx, cy, R] = [280, 156, 132];
    let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#f4fbff" stroke="${INK}" stroke-width="3"/>`;
    const speed = Math.sqrt(k);
    for (let i = 0; i < 46; i += 1) {
      const x = cx + 0.66 * R * Math.sin(t * speed * (1.6 + noise(i) * 2.2) + i * 2.3);
      const y = cy + 0.66 * R * Math.sin(t * speed * (1.9 + noise(i + 50) * 2.2) + i * 1.1);
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="5" fill="#7fb3d5"/>`;
    }
    const path: [number, number][] = [[cx, cy]];
    const steps = Math.floor(tau * 8);
    for (let j = 0; j < steps; j += 1) {
      const a = noise(j * 13 + 7) * 2 * Math.PI;
      const len = 5 * speed * (0.4 + noise(j * 7 + 3));
      let [x, y] = path[path.length - 1];
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      const d = Math.hypot(x - cx, y - cy);
      if (d > R - 34) [x, y] = [cx + ((x - cx) * (R - 34)) / d, cy + ((y - cy) * (R - 34)) / d];
      path.push([x, y]);
    }
    const trail = path.slice(-70);
    if (trail.length > 1) out += `<polyline points="${poly(trail)}" fill="none" stroke="${HOT}" stroke-width="2" opacity="0.7" stroke-linejoin="round"/>`;
    const [px, py] = path[path.length - 1];
    out += `<circle cx="${n(px)}" cy="${n(py)}" r="18" fill="#2b2d6e" stroke="#fff" stroke-width="2"/>`;
    out += txt(20, 40, '黑球：一颗墨粒', { anchor: 'start', size: 13, bold: true });
    out += txt(20, 62, '蓝点：水分子', { anchor: 'start', size: 13, bold: true, color: '#3a7bb5' });
    out += txt(20, 84, '橙线：墨粒走过的路', { anchor: 'start', size: 13, bold: true, color: HOT });
    out += txt(W - 20, 306, '真实的水分子比这小得多、多得多', { anchor: 'end', size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    if (s.zoom) return `放大看：墨粒被四面八方的水分子撞来撞去，哪边撞得多一点就往哪边挪一点，走出一条乱糟糟的路；${WATERS[s.temp]}里分子跑得${['慢', '快一些', '最快'][s.temp]}，墨粒也抖得${['慢', '快一些', '最厉害'][s.temp]}`;
    return `${WATERS[s.temp]}：不搅也会散开——${['分子跑得慢，墨水散得慢吞吞', '分子跑得快一些，散得也快一些', '分子跑得最快，墨水很快就散满了大半杯'][s.temp]}`;
  },
};
