import { W, H, INK, HOT, BLUE, n, clamp, rad, deg, noise, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 地球与宇宙：月相、四季、视差、日月食、潮汐、光年 ---------------- */

const SPACE = '#1e2a4a';
const SUN = '#ffb703';
const SEA = '#3d7fc4';
const LAND = '#5bb26b';
const MOON = '#f1ead2';
const DARK = '#3a4060';
const PALE = '#c8d4ea';

function stars(count: number, x = 0, y = 0, w = W, h = H, seed = 0): string {
  let out = '';
  for (let i = 0; i < count; i += 1) {
    out += `<circle cx="${n(x + noise(seed + i * 2 + 1) * w)}" cy="${n(y + noise(seed + i * 2 + 2) * h)}" r="${n(0.7 + noise(seed + i) * 1.1)}" fill="#fff" opacity="0.6"/>`;
  }
  return out;
}

function earth(cx: number, cy: number, r: number): string {
  return `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${SEA}" stroke="#fff" stroke-width="1.5"/>`
    + `<path d="M${n(cx - r * 0.55)} ${n(cy - r * 0.2)} q${n(r * 0.25)} ${n(-r * 0.4)} ${n(r * 0.55)} ${n(-r * 0.2)} q${n(r * 0.2)} ${n(r * 0.15)} ${n(r * 0.05)} ${n(r * 0.45)} q${n(-r * 0.35)} ${n(r * 0.2)} ${n(-r * 0.6)} ${n(-r * 0.25)}Z" fill="${LAND}"/>`;
}

/** 从地面看到的月亮：phase 0 新月、0.5 满月；北半球看，变圆时亮在右边 */
function moonFace(cx: number, cy: number, R: number, phase: number, lit = MOON): string {
  let out = `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R)}" fill="${DARK}"/>`;
  if (phase < 0.02 || phase > 0.98) return out;
  const th = phase * 2 * Math.PI;
  const k = Math.cos(th);
  const right = th < Math.PI;
  const gibbous = k < 0;
  const inner = right ? (gibbous ? 1 : 0) : (gibbous ? 0 : 1);
  const [top, bottom] = [`${n(cx)} ${n(cy - R)}`, `${n(cx)} ${n(cy + R)}`];
  out += `<path d="M${top} A${n(R)} ${n(R)} 0 0 ${right ? 1 : 0} ${bottom} A${n(Math.max(Math.abs(k) * R, 0.1))} ${n(R)} 0 0 ${inner} ${top}Z" fill="${lit}"/>`;
  return out;
}

/* ---------- 月相 ---------- */

const SYNODIC = 29.5;
const CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
function lunarDay(day: number): string {
  const d = clamp(Math.round(day) + 1, 1, 30);
  if (d <= 10) return `初${CN[d]}`;
  if (d < 20) return `十${CN[d - 10]}`;
  if (d === 20) return '二十';
  if (d < 30) return `廿${CN[d - 20]}`;
  return '三十';
}
function phaseInfo(day: number): [string, string] {
  if (day < 1 || day >= 28.5) return ['新月', '亮的那半边几乎全背着我们，看不见'];
  if (day < 6.5) return ['蛾眉月', '只有右边一小弯亮面朝着我们'];
  if (day < 8.5) return ['上弦月', '右边一半亮着'];
  if (day < 13.8) return ['凸月', '亮面大半朝着我们，一天天变圆'];
  if (day < 15.8) return ['满月', '亮的那半边整个朝着我们'];
  if (day < 21) return ['凸月', '亮面一天天往左缩'];
  if (day < 23) return ['下弦月', '左边一半亮着'];
  return ['残月', '只剩左边一小弯亮面'];
}

export const phases: SimDef = {
  params: [{ key: 'day', label: '新月之后第几天', min: 0, max: 29, step: 1, value: 4, unit: ' 天' }],
  animated: false,
  draw(s) {
    const day = s.day;
    const th = (day / SYNODIC) * 2 * Math.PI;
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${SPACE}"/>` + stars(30, 0, 0, 300, H);
    for (const y of [70, 130, 190, 250]) out += arrow(8, y, 46, y, SUN, 3);
    out += txt(28, 300, '太阳光', { size: 12, color: SUN, plain: true });
    const [ex, ey, R] = [180, 160, 108];
    out += `<circle cx="${ex}" cy="${ey}" r="${R}" fill="none" stroke="${PALE}" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.7"/>`;
    out += earth(ex, ey, 24);
    const [mx, my] = [ex - R * Math.cos(th), ey + R * Math.sin(th)];
    out += `<line x1="${ex}" y1="${ey}" x2="${n(mx)}" y2="${n(my)}" stroke="#ffd43b" stroke-width="1.5" stroke-dasharray="3 4"/>`;
    out += `<circle cx="${n(mx)}" cy="${n(my)}" r="14" fill="${DARK}" stroke="#fff" stroke-width="1"/>`;
    out += `<path d="M${n(mx)} ${n(my - 14)} A14 14 0 0 0 ${n(mx)} ${n(my + 14)}Z" fill="${MOON}"/>`;
    out += txt(180, 26, '从北极上空往下看', { size: 13, color: PALE, plain: true });
    out += txt(ex, ey + 44, '地球', { size: 12, color: PALE, plain: true });

    out += `<rect x="312" y="14" width="236" height="292" rx="12" fill="#2a3760"/>`;
    out += txt(430, 40, '从地球上看到的月亮', { size: 14, color: PALE, plain: true });
    out += moonFace(430, 140, 72, day / SYNODIC);
    const [name] = phaseInfo(day);
    out += txt(430, 252, name, { size: 24, bold: true, color: '#ffd43b', plain: true });
    out += txt(430, 282, `大约农历${lunarDay(day)}`, { size: 14, color: PALE, plain: true });
    return out;
  },
  readout(s) {
    const [name, how] = phaseInfo(s.day);
    return `新月后第 ${s.day} 天（大约农历${lunarDay(s.day)}）：${name}。太阳总照亮月亮朝着它的那一半，这时${how}`;
  },
};

/* ---------- 四季 ---------- */

const SEASONS = ['3 月（春分）', '6 月（夏至）', '9 月（秋分）', '12 月（冬至）'];
const SEASON_POS: [number, number][] = [[150, 108], [34, 165], [150, 222], [266, 165]];
const DECL = [0, 23.5, 0, -23.5];
const BEIJING = 40;
function dayLength(decl: number): number {
  const c = clamp(-Math.tan(rad(BEIJING)) * Math.tan(rad(decl)), -1, 1);
  return (2 * deg(Math.acos(c))) / 15;
}

export const tilt: SimDef = {
  params: [
    { key: 'season', label: '地球走到', min: 0, max: 3, step: 1, value: 1, labels: SEASONS },
    { key: 'axis', label: '地轴', min: 0, max: 1, step: 1, value: 0, labels: ['斜着（真实的地球）', '假如不斜'] },
  ],
  animated: false,
  draw(s) {
    const tilted = s.axis === 0;
    const decl = tilted ? DECL[s.season] : 0;
    let out = `<rect width="300" height="${H}" rx="12" fill="${SPACE}"/>` + stars(24, 0, 0, 300, H, 7);
    out += `<ellipse cx="150" cy="165" rx="116" ry="57" fill="none" stroke="${PALE}" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.7"/>`;
    out += `<circle cx="150" cy="165" r="30" fill="${SUN}" opacity="0.35"/><circle cx="150" cy="165" r="20" fill="${SUN}"/>`;
    SEASON_POS.forEach(([x, y], i) => {
      const on = i === s.season;
      const r = on ? 17 : 10;
      out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${SEA}" opacity="${on ? 1 : 0.45}"/>`;
      const away = Math.atan2(y - 165, x - 150);
      const [dx, dy] = [Math.cos(away), Math.sin(away)];
      out += `<path d="M${n(x - dy * r)} ${n(y + dx * r)} A${r} ${r} 0 0 ${1} ${n(x + dy * r)} ${n(y - dx * r)}Z" fill="#0b1228" opacity="${on ? 0.55 : 0.3}"/>`;
      const a = tilted ? rad(23.5) : 0;
      const L = r + 8;
      out += `<line x1="${n(x - Math.sin(a) * L)}" y1="${n(y + Math.cos(a) * L)}" x2="${n(x + Math.sin(a) * L)}" y2="${n(y - Math.cos(a) * L)}" stroke="#fff" stroke-width="${on ? 2.5 : 1.5}" opacity="${on ? 1 : 0.5}"/>`;
    });
    out += txt(150, 28, '地轴一年到头都朝同一个方向斜', { size: 12, color: PALE, plain: true });
    if (s.season === 3) out += txt(150, 300, '这时地球离太阳最近的日子快到了', { size: 11, color: '#ffd43b', plain: true });
    if (s.season === 1) out += txt(150, 300, '这时地球离太阳最远的日子快到了', { size: 11, color: '#ffd43b', plain: true });

    const h = 90 - BEIJING + decl;
    out += txt(430, 30, '北京（北纬 40°）正午的阳光', { size: 13, color: '#8b7a5c' });
    const [gx, gy, beam] = [424, 240, 34];
    const [dx, dy] = [Math.cos(rad(h)), Math.sin(rad(h))];
    const foot = beam / Math.sin(rad(h));
    const L = Math.min(180, (gx - 318) / dx);
    out += `<polygon points="${poly([[gx - dx * L, gy - dy * L], [gx, gy], [gx + foot, gy], [gx + foot - dx * L, gy - dy * L]])}" fill="${SUN}" opacity="0.35"/>`;
    out += `<circle cx="${n(gx + foot / 2 - dx * (L - 14))}" cy="${n(gy - dy * (L - 14))}" r="13" fill="${SUN}"/>`;
    out += `<rect x="320" y="${gy}" width="228" height="10" fill="#8b6b3d"/>`;
    out += `<rect x="${gx}" y="${gy - 4}" width="${n(foot)}" height="8" fill="${HOT}"/>`;
    out += `<path d="M${gx - 30} ${gy} A30 30 0 0 1 ${n(gx - 30 * dx)} ${n(gy - 30 * dy)}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    out += txt(gx + foot / 2, gy + 30, '同样一束光铺开这么宽', { size: 12, color: HOT });
    out += txt(434, 300, `太阳高约 ${Math.round(h)}° · 白天约 ${Math.round(dayLength(decl))} 小时`, { size: 15, bold: true, color: BLUE });
    return out;
  },
  readout(s) {
    const tilted = s.axis === 0;
    const decl = tilted ? DECL[s.season] : 0;
    const h = Math.round(90 - BEIJING + decl);
    const day = Math.round(dayLength(decl));
    if (!tilted) return `假如地轴不斜：一年到头北京正午太阳都约 ${h}° 高，白天总是约 ${day} 小时——就没有明显的四季了`;
    if (s.season === 1) return `6 月，北半球歪向太阳：北京正午太阳高约 ${h}°，阳光照得直、照得集中，白天约 ${day} 小时，所以热。这时地球离太阳比 1 月时还远`;
    if (s.season === 3) return `12 月，北半球背着太阳：太阳只有约 ${h}° 高，同样一束光铺得很开，白天约 ${day} 小时，所以冷。1 月初地球反而离太阳最近`;
    return `太阳直射赤道：北京正午太阳高约 ${h}°，白天约 ${day} 小时，不冷不热`;
  },
};

/* ---------- 视差：月亮跟着车走 ---------- */

const LOOKS = ['看路边的树', '看远处的山', '看月亮'];

export const parallax: SimDef = {
  params: [{ key: 'look', label: '坐在车里', min: 0, max: 2, step: 1, value: 2, labels: LOOKS }],
  animated: true,
  still: 1.5,
  draw(s, t) {
    let out = `<clipPath id="parallax-window"><rect x="14" y="14" width="532" height="150" rx="14"/></clipPath><g clip-path="url(#parallax-window)">`;
    out += `<rect x="14" y="14" width="532" height="150" fill="#2a3760"/>`;
    out += stars(18, 20, 18, 520, 70, 3);
    out += `<circle cx="420" cy="58" r="20" fill="${MOON}"/>`;
    const far = (t * 12) % 180;
    let hills = '';
    for (let x = -180; x < 720; x += 180) hills += `M${n(x - far)} 150 q45 -70 90 -40 q45 -40 90 40 `;
    out += `<path d="${hills}" fill="#4b5d8f"/>`;
    out += `<rect x="14" y="140" width="532" height="24" fill="#3c4a33"/>`;
    const near = (t * 320) % 140;
    for (let x = -140; x < 700; x += 140) out += `<text x="${n(x - near)}" y="160" font-size="58">🌳</text>`;
    out += `</g><rect x="14" y="14" width="532" height="150" rx="14" fill="none" stroke="${INK}" stroke-width="6"/>`;
    out += txt(30, 34, '车窗外', { size: 12, anchor: 'start', color: PALE, plain: true });

    const u = (t % 4) / 4;
    const [x0, x1] = [70, 330];
    const cx = x0 + (x1 - x0) * u;
    const road = 300;
    out += `<line x1="20" y1="${road}" x2="540" y2="${road}" stroke="#8b7a5c" stroke-width="10" stroke-linecap="round"/>`;
    out += `<text x="${n(cx)}" y="${road + 8}" font-size="26" text-anchor="middle">🚗</text>`;
    const targets: [number, number][] = [[200, 262], [200, 200]];
    const look = s.look;
    if (look < 2) {
      const [tx, ty] = targets[look];
      out += `<line x1="${x0}" y1="${road - 10}" x2="${tx}" y2="${ty}" stroke="${PALE}" stroke-width="2" stroke-dasharray="4 4"/>`;
      out += `<line x1="${n(cx)}" y1="${road - 10}" x2="${tx}" y2="${ty}" stroke="${HOT}" stroke-width="2.5"/>`;
      out += `<text x="${tx}" y="${ty + 10}" font-size="${look === 0 ? 26 : 34}" text-anchor="middle">${look === 0 ? '🌳' : '⛰️'}</text>`;
      out += txt(470, 200, '看它的方向', { size: 13, color: HOT }) + txt(470, 222, look === 0 ? '变了一大截' : '慢慢在变', { size: 15, bold: true, color: HOT });
    } else {
      out += `<line x1="${x0}" y1="${road - 10}" x2="${x0}" y2="178" stroke="${PALE}" stroke-width="2" stroke-dasharray="4 4"/>`;
      out += `<line x1="${n(cx)}" y1="${road - 10}" x2="${n(cx)}" y2="178" stroke="${HOT}" stroke-width="2.5"/>`;
      out += txt(470, 200, '月亮在 38 万公里外', { size: 13, color: HOT }) + txt(470, 222, '两条视线几乎平行', { size: 15, bold: true, color: HOT });
    }
    return out;
  },
  readout(s) {
    if (s.look === 0) return '路边的树离你只有十几米：车往前开一点，看它的方向就变了一大截，它“嗖”地往后退';
    if (s.look === 1) return `远处的山离你几公里：比如 5 公里外的山，车开 1 公里，看它的方向只转了约 ${Math.round(deg(Math.atan(1 / 5)))}°，它慢慢往后挪`;
    return '月亮离你约 38 万公里：车开出好几公里，看它的方向几乎一点没变——它就像一直跟着你走';
  },
};

/* ---------- 日食、月食 ---------- */

export const eclipse: SimDef = {
  params: [
    { key: 'when', label: '月亮走到', min: 0, max: 1, step: 1, value: 0, labels: ['太阳和地球中间（初一）', '地球背后（十五）'] },
    { key: 'plane', label: '这个月', min: 0, max: 1, step: 1, value: 0, labels: ['刚好穿过一条线', '偏在上方（大多数月份）'] },
  ],
  animated: true,
  still: 1,
  draw(s, t) {
    const solar = s.when === 0;
    const off = s.plane === 1 ? -58 : 0;
    const [ex, ey, er] = [320, 165, 40];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${SPACE}"/>` + stars(30, 0, 0, W, H, 11);
    out += `<circle cx="-40" cy="${ey}" r="118" fill="${SUN}" opacity="0.3"/><circle cx="-40" cy="${ey}" r="104" fill="${SUN}"/>`;
    const dash = n(-(t * 60) % 40);
    for (const y of [95, 130, 200, 235]) out += `<line x1="70" y1="${y}" x2="540" y2="${y}" stroke="#ffd43b" stroke-width="1.2" stroke-dasharray="10 30" stroke-dashoffset="${dash}" opacity="0.45"/>`;
    out += `<polygon points="${poly([[ex, ey - er], [552, ey], [ex, ey + er]])}" fill="#0b1228" opacity="0.75"/>`;
    out += earth(ex, ey, er);
    const [mx, my] = [solar ? 196 : 450, ey + off];
    const hit = s.plane === 0;
    if (solar) {
      out += `<polygon points="${poly([[mx, my - 11], [ex - er + (hit ? 4 : 0), my], [mx, my + 11]])}" fill="#0b1228" opacity="0.8"/>`;
      if (hit) out += `<circle cx="${ex - er + 6}" cy="${ey}" r="6" fill="#0b1228"/>`;
    }
    const inShadow = !solar && hit;
    out += `<circle cx="${mx}" cy="${n(my)}" r="11" fill="${inShadow ? '#b5483a' : MOON}" stroke="#fff" stroke-width="1"/>`;
    out += `<line x1="${mx - 50}" y1="${ey}" x2="${mx + 50}" y2="${ey}" stroke="${PALE}" stroke-width="1" stroke-dasharray="2 4" opacity="${s.plane ? 0.8 : 0}"/>`;
    if (s.plane) out += txt(mx, my - 22, '月亮的轨道斜着约 5°', { size: 12, color: PALE, plain: true });
    out += txt(ex, ey + er + 22, '地球', { size: 12, color: PALE, plain: true });
    out += txt(60, 304, '示意图，大小和距离都没按比例', { size: 11, anchor: 'start', color: PALE, plain: true });

    out += `<rect x="420" y="220" width="126" height="88" rx="10" fill="#2a3760"/>`;
    out += txt(483, 238, '地上看到', { size: 12, color: PALE, plain: true });
    if (solar) {
      out += `<circle cx="483" cy="272" r="22" fill="${SUN}"/>`;
      if (hit) out += `<circle cx="483" cy="272" r="27" fill="none" stroke="#fff" stroke-width="2" opacity="0.6"/><circle cx="483" cy="272" r="22" fill="#0b1228"/>`;
    } else {
      out += `<circle cx="483" cy="272" r="22" fill="${hit ? '#b5483a' : MOON}"/>`;
    }
    out += txt(483, 304, solar ? (hit ? '日食' : '太阳照常') : (hit ? '月食，泛红' : '圆圆的满月'), { size: 12, bold: true, color: '#ffd43b', plain: true });
    return out;
  },
  readout(s) {
    if (s.plane === 1) return '月亮绕地球的轨道和地球绕太阳的轨道斜着约 5°：大多数月份，初一、十五的月亮都从影子的上方或下方擦过去，所以不是每个月都有日食、月食';
    if (s.when === 0) return '初一，月亮正好挡在太阳和地球中间：月亮的影子落到地球上，影子里的人看到日食。影子很小，同一个地方平均要几百年才轮到一次';
    return '十五，月亮正好钻进地球的影子：满月慢慢变暗，还会泛红——这是月食，夜里那半边地球的人都能看到';
  },
};

/* ---------- 潮汐 ---------- */

export const tide: SimDef = {
  params: [{ key: 'sun', label: '太阳和月亮', min: 0, max: 1, step: 1, value: 0, labels: ['排成一条线（初一、十五前后）', '成直角（初八、廿三前后）'] }],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const aligned = s.sun === 0;
    const amp = aligned ? 24 : 9;
    const [ex, ey, er] = [150, 165, 62];
    let out = `<rect width="300" height="${H}" rx="12" fill="${SPACE}"/>` + stars(20, 0, 0, 300, H, 5);
    const water: [number, number][] = [];
    for (let i = 0; i <= 72; i += 1) {
      const a = (i / 72) * 2 * Math.PI;
      const r = er + 12 + amp * Math.cos(2 * a);
      water.push([ex + r * Math.cos(a), ey - r * Math.sin(a)]);
    }
    out += `<polygon points="${poly(water)}" fill="#74b3e8" opacity="0.85"/>`;
    out += `<circle cx="${ex}" cy="${ey}" r="${er}" fill="#8fbf6a" stroke="#fff" stroke-width="1.5"/>`;
    out += `<circle cx="280" cy="${ey}" r="12" fill="${MOON}"/>` + txt(280, ey + 30, '月亮', { size: 12, color: PALE, plain: true });
    if (aligned) out += arrow(46, 30, 14, 30, SUN, 3) + txt(56, 34, '太阳在很远的这边', { size: 11, anchor: 'start', color: SUN, plain: true });
    else out += arrow(ex, 40, ex, 14, SUN, 3) + txt(ex + 12, 30, '太阳在很远的这边', { size: 11, anchor: 'start', color: SUN, plain: true });
    const spin = (t / 6) * 2 * Math.PI;
    const [px, py] = [ex + er * Math.cos(spin), ey - er * Math.sin(spin)];
    out += `<circle cx="${n(px)}" cy="${n(py)}" r="7" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
    out += txt(ex, ey + 5, '地球在转', { size: 12, color: '#fff', plain: true });
    out += txt(150, 300, '水被拉成两头鼓（夸张画法）', { size: 11, color: PALE, plain: true });

    out += txt(430, 34, '红点那片海边的水位', { size: 13, color: '#8b7a5c' });
    const [gx, gw, gy] = [322, 222, 170];
    out += `<line x1="${gx}" y1="${gy}" x2="${gx + gw}" y2="${gy}" stroke="#d8cfc2" stroke-width="1.5"/>`;
    const curve: [number, number][] = [];
    for (let i = 0; i <= 80; i += 1) {
      const a = (i / 80) * 2 * Math.PI;
      curve.push([gx + (i / 80) * gw, gy - amp * 2.6 * Math.cos(2 * a)]);
    }
    out += `<polyline points="${poly(curve)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`;
    const u = (spin % (2 * Math.PI)) / (2 * Math.PI);
    const level = amp * 2.6 * Math.cos(2 * spin);
    out += `<circle cx="${n(gx + u * gw)}" cy="${n(gy - level)}" r="6" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
    out += txt(gx, gy + 90, '转一圈（一天多一点）', { size: 12, anchor: 'start', color: '#8b7a5c' });
    out += txt(430, 290, aligned ? '大潮：涨得高、落得低' : '小潮：涨落都不大', { size: 16, bold: true, color: aligned ? HOT : BLUE });
    return out;
  },
  readout(s) {
    const base = '海边这个点跟着地球一起转，一天里两次转进鼓起来的水里：大约每隔十二个多小时涨一次潮';
    return s.sun === 0
      ? `${base}。太阳、月亮排成一条线，两边的拉扯叠在一起，潮水涨得特别高，叫大潮`
      : `${base}。太阳、月亮成直角，太阳的拉扯和月亮的错开了，部分抵消，涨落小，叫小潮`;
  },
};

/* ---------- 光年：星光是过去的光 ---------- */

const FAR = [
  { name: '月亮', dist: '约 38 万公里', time: '约 1.3 秒', log: Math.log10(1.3), draw: (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="14" fill="${MOON}"/>` },
  { name: '太阳', dist: '约 1.5 亿公里', time: '约 8 分钟', log: Math.log10(500), draw: (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="24" fill="${SUN}" opacity="0.35"/><circle cx="${x}" cy="${y}" r="17" fill="${SUN}"/>` },
  { name: '海王星', dist: '约 45 亿公里', time: '约 4.2 小时', log: Math.log10(4.2 * 3600), draw: (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="13" fill="#4c6ef5"/>` },
  { name: '比邻星', dist: '约 40 万亿公里', time: '约 4.2 年', log: Math.log10(4.24 * 365.25 * 86400), draw: (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="16" fill="#ff8787" opacity="0.4"/><circle cx="${x}" cy="${y}" r="9" fill="#ff8787"/>` },
];
const TICKS: [number, string][] = [[0, '1 秒'], [Math.log10(60), '1 分钟'], [Math.log10(3600), '1 小时'], [Math.log10(86400), '1 天'], [Math.log10(365.25 * 86400), '1 年']];

export const lightyear: SimDef = {
  params: [{ key: 'target', label: '看的是', min: 0, max: 3, step: 1, value: 1, labels: FAR.map(f => f.name) }],
  animated: true,
  still: 2,
  draw(s, t) {
    const f = FAR[s.target];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="${SPACE}"/>` + stars(40, 0, 0, W, 200, 21);
    const [ax, bx, y] = [70, 490, 100];
    out += f.draw(ax, y) + txt(ax, y + 40, f.name, { size: 14, bold: true, color: '#fff', plain: true });
    out += earth(bx, y, 20) + txt(bx, y + 40, '地球上的你', { size: 13, color: PALE, plain: true });
    out += `<line x1="${ax + 26}" y1="${y}" x2="${bx - 26}" y2="${y}" stroke="${PALE}" stroke-width="1" stroke-dasharray="3 5"/>`;
    const u = (t % 3) / 2.4;
    if (u <= 1) {
      const px = ax + 26 + (bx - ax - 52) * u;
      out += `<line x1="${n(Math.max(ax + 26, px - 60))}" y1="${y}" x2="${n(px)}" y2="${y}" stroke="#ffd43b" stroke-width="4" stroke-linecap="round" opacity="0.6"/><circle cx="${n(px)}" cy="${y}" r="6" fill="#ffd43b"/>`;
    }
    out += txt(280, 40, `离我们${f.dist}，光也要走${f.time}`, { size: 16, bold: true, color: '#ffd43b', plain: true });
    out += txt(280, 168, `你看到的是它${f.time}以前的样子`, { size: 14, color: '#fff', plain: true });

    const [x0, x1, ly] = [40, 520, 250];
    const max = 9;
    const at = (v: number): number => x0 + ((v + 0.5) / (max + 0.5)) * (x1 - x0);
    out += `<line x1="${x0}" y1="${ly}" x2="${x1}" y2="${ly}" stroke="${PALE}" stroke-width="2"/>`;
    for (const [v, label] of TICKS) out += `<line x1="${n(at(v))}" y1="${ly - 6}" x2="${n(at(v))}" y2="${ly + 6}" stroke="${PALE}" stroke-width="1.5"/>` + txt(at(v), ly + 24, label, { size: 11, color: PALE, plain: true });
    FAR.forEach((g, i) => {
      const on = i === s.target;
      out += `<circle cx="${n(at(g.log))}" cy="${ly}" r="${on ? 8 : 5}" fill="${on ? '#ffd43b' : PALE}"/>`;
      if (on) out += txt(at(g.log), ly - 16, g.name, { size: 12, bold: true, color: '#ffd43b', plain: true });
    });
    out += txt(x0, 300, '光走的时间（每往右一格，时间就长很多倍）', { size: 11, anchor: 'start', color: PALE, plain: true });
    return out;
  },
  readout(s) {
    const f = FAR[s.target];
    return `${f.name}离我们${f.dist}。光一秒能走约 30 万公里，也要走${f.time}才到——所以我们看到的${f.name}，是它${f.time}以前发出的光`;
  },
};