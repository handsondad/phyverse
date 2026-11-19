import { W, H, INK, HOT, BLUE, G, n, clamp, noise, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 宇宙与微观 ---------------- */

const EARTH_R = 6371;
const GM = 398600;
const LAUNCH = EARTH_R + 300;
type Orbit = { pts: [number, number][]; times: number[]; crashed: boolean; escaped: boolean; arc: number; duration: number };
const orbitCache = new Map<number, Orbit>();

function orbitPath(v: number): Orbit {
  const cached = orbitCache.get(v);
  if (cached) return cached;
  let [x, y, vx, vy] = [0, LAUNCH, v, 0];
  const pts: [number, number][] = [[x, y]];
  const times = [0];
  const dt = 10;
  let angle = 0;
  let crashed = false;
  let escaped = false;
  let time = 0;
  const period = 2 * Math.PI * Math.sqrt(LAUNCH ** 3 / GM);
  for (let step = 0; step < 4000; step += 1) {
    const r = Math.hypot(x, y);
    const ax = (-GM * x) / r ** 3;
    const ay = (-GM * y) / r ** 3;
    vx += ax * dt;
    vy += ay * dt;
    const before = Math.atan2(x, y);
    x += vx * dt;
    y += vy * dt;
    time += dt;
    let delta = Math.atan2(x, y) - before;
    if (delta < -Math.PI) delta += 2 * Math.PI;
    if (delta > Math.PI) delta -= 2 * Math.PI;
    angle += delta;
    if (step % 3 === 0) { pts.push([x, y]); times.push(time); }
    if (Math.hypot(x, y) < EARTH_R) { crashed = true; break; }
    if (Math.hypot(x, y) > EARTH_R * 9) { escaped = true; break; }
    if (Math.abs(angle) >= 2 * Math.PI && time > period * 0.5) break;
  }
  pts.push([x, y]);
  times.push(time);
  const orbit = { pts, times, crashed, escaped, arc: Math.abs(angle) * EARTH_R, duration: time };
  orbitCache.set(v, orbit);
  return orbit;
}

export const orbit: SimDef = {
  params: [{ key: 'v', label: '从高山顶上横着打出去的速度', min: 3, max: 11, step: 0.5, value: 5, unit: ' km/s' }],
  animated: true,
  still: 2.5,
  draw(s, t) {
    const o = orbitPath(s.v);
    const [cx, cy, scale] = [280, 172, 92 / EARTH_R];
    const toScreen = ([x, y]: [number, number]): [number, number] => [cx + x * scale, cy - y * scale];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="#1e2a4a"/>`;
    for (let i = 0; i < 40; i += 1) out += `<circle cx="${n(noise(i * 2 + 1) * W)}" cy="${n(noise(i * 2 + 2) * H)}" r="${n(0.8 + noise(i) * 1.2)}" fill="#fff" opacity="0.7"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="${n(92 + 6)}" fill="#7fb3dc" opacity="0.25"/><circle cx="${cx}" cy="${cy}" r="92" fill="#3d7fc4"/>`;
    out += `<path d="M${cx - 50} ${cy - 20} q20 -30 50 -20 q20 10 10 40 q-30 20 -60 -20Z M${cx + 20} ${cy + 30} q30 -10 40 20 q-20 30 -40 -20Z" fill="#5bb26b"/>`;
    out += `<path d="M${cx - 12} ${cy - 90} L${cx} ${n(cy - LAUNCH * scale)} L${cx + 12} ${cy - 90} Z" fill="#8b7a5c"/>`;
    out += `<polyline points="${poly(o.pts.map(toScreen))}" fill="none" stroke="#ffd43b" stroke-width="2" stroke-dasharray="5 5" opacity="0.7"/>`;
    const anim = clamp(o.duration / 1000, 3, 8);
    const u = (t % (anim + 1)) / anim;
    const target = Math.min(u, 1) * o.duration;
    let k = 0;
    while (k < o.times.length - 1 && o.times[k] < target) k += 1;
    const trail = o.pts.slice(Math.max(0, k - 30), k + 1).map(toScreen);
    if (trail.length > 1) out += `<polyline points="${poly(trail)}" fill="none" stroke="#ffd43b" stroke-width="3.5" stroke-linecap="round"/>`;
    const [bx, by] = toScreen(o.pts[k]);
    out += `<circle cx="${n(bx)}" cy="${n(by)}" r="6" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
    out += txt(20, 30, `${s.v} km/s`, { anchor: 'start', size: 20, bold: true, color: '#ffd43b', plain: true });
    out += txt(20, 52, '虚线：这一发的整条路线', { anchor: 'start', size: 12, color: '#c8d4ea', plain: true });
    return out;
  },
  readout(s) {
    const o = orbitPath(s.v);
    if (o.crashed) return `${s.v} km/s：一边往前飞、一边往下掉，飞了 ${Math.round(o.arc).toLocaleString('zh-CN')} 千米后落回地面`;
    if (o.escaped) return `${s.v} km/s：飞得太快，挣脱了地球的引力，一去不回（要超过约 11 km/s）`;
    const period = Math.round(o.duration / 60);
    return Math.abs(s.v - Math.sqrt(GM / LAUNCH)) < 0.4
      ? `${s.v} km/s：往下掉多少，地面就弯走多少——永远掉不到地上，大约 ${period} 分钟绕地球一圈`
      : `${s.v} km/s：比绕圈要的速度快，飞出一个拉长的椭圆，大约 ${period} 分钟转回来`;
  },
};

const KID = 30;
export const elevator: SimDef = {
  params: [{ key: 'a', label: '电梯的加速度（向上为正）', min: -9.8, max: 4.9, step: 0.7, value: 0, unit: ' m/s²' }],
  animated: true,
  still: 1,
  draw(s, t) {
    const a = Math.round(s.a * 10) / 10;
    const reading = KID * (1 + a / G);
    const free = reading < 0.5;
    let out = `<rect x="150" y="10" width="260" height="300" fill="#f6efe4"/>`;
    const shift = ((0.5 * a * (t % 3) ** 2 * 20) % 40 + 40) % 40;
    for (let y = -40; y < H; y += 40) {
      out += `<line x1="150" y1="${n(y + shift)}" x2="170" y2="${n(y + shift)}" stroke="#d8cfc2" stroke-width="3"/><line x1="390" y1="${n(y + shift)}" x2="410" y2="${n(y + shift)}" stroke="#d8cfc2" stroke-width="3"/>`;
    }
    out += `<line x1="280" y1="0" x2="280" y2="56" stroke="${INK}" stroke-width="3"/>`;
    out += `<rect x="190" y="56" width="180" height="240" rx="10" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
    out += `<rect x="240" y="268" width="80" height="20" rx="5" fill="#d8dee6" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="260" y="272" width="40" height="12" rx="2" fill="#203040"/><text x="280" y="282" font-size="10" text-anchor="middle" fill="#7dffb0" font-family="monospace">${n(Math.max(reading, 0))}</text>`;
    const float = free ? 40 + Math.sin(t * 1.5) * 8 : 0;
    out += `<text x="280" y="${n(266 - float)}" font-size="70" text-anchor="middle">🧒</text>`;
    if (free) out += `<circle cx="${n(330 + Math.sin(t) * 6)}" cy="${n(130 + Math.cos(t * 1.3) * 6)}" r="10" fill="#7fb3dc" stroke="#2f7fbf" stroke-width="2"/>` + txt(330, 108, '水珠团成球', { size: 11, color: '#2f7fbf' });
    if (Math.abs(a) > 0.05) out += arrow(450, 170, 450, 170 - a * 9, a > 0 ? BLUE : HOT, 5) + txt(462, 175 - a * 4.5, '加速度', { anchor: 'start', size: 13, color: a > 0 ? BLUE : HOT });
    out += txt(80, 120, '体重计', { size: 14, color: '#8b7a5c' });
    out += txt(80, 150, `${n(Math.max(reading, 0))} kg`, { size: 26, bold: true, color: free ? HOT : INK });
    out += txt(80, 176, `（其实 ${KID} kg）`, { size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const a = Math.round(s.a * 10) / 10;
    const reading = Math.max(KID * (1 + a / G), 0);
    const state = a > 0 ? '超重：脚下要托得更用力，才能带着你一起往上加速'
      : a === 0 ? '和平时一样：脚下的支持力正好等于重力'
        : reading < 0.5 ? '完全失重：电梯和人一起自由下落，谁也不托谁——空间站里就是这样'
          : '失重：脚下托得没那么用力了，人觉得轻飘飘';
    return `体重计显示 ${n(reading)} kg：${state}`;
  },
};

const BH_BODIES = [
  { name: '现在的太阳', rLabel: '半径 70 万公里', color: '#ffb703', coreR: 30 },
  { name: '压成白矮星大小', rLabel: '半径约 6000 公里', color: '#e7f5ff', coreR: 11 },
  { name: '压成黑洞（质量不变）', rLabel: '视界半径约 3 公里', color: '#0b0f1c', coreR: 6 },
] as const;
const BH_PROBES = ['地球轨道（1.5 亿公里）', '离中心 30 公里处', '跨进 3 公里视界内'] as const;

export const blackHole: SimDef = {
  params: [
    { key: 'stage', label: '中心天体（同样重）', min: 0, max: 2, step: 1, value: 2, labels: BH_BODIES.map(b => b.name) },
    { key: 'probe', label: '去哪儿测逃逸速度', min: 0, max: 2, step: 1, value: 0, labels: [...BH_PROBES] },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const st = clamp(Math.round(s.stage), 0, 2);
    const pr = clamp(Math.round(s.probe), 0, 2);
    const body = BH_BODIES[st];
    let out = `<rect width="${W}" height="${H}" rx="12" fill="#141b2d"/>`;
    out += `<line x1="274" y1="44" x2="274" y2="286" stroke="#334166" stroke-width="1.5"/>`;

    const [lx, ly, orbR] = [138, 168, 92];
    out += txt(lx, 56, '远处：地球绕它转（质量没变）', { size: 12.5, bold: true, color: '#c8d4ea', plain: true });
    out += `<circle cx="${lx}" cy="${ly}" r="${orbR}" fill="none" stroke="#5c7cfa" stroke-width="1.8" stroke-dasharray="5 4"/>`;
    if (st === 2) out += `<circle cx="${lx}" cy="${ly}" r="14" fill="none" stroke="#ff922b" stroke-width="3" opacity="0.85"/>`;
    out += `<circle cx="${lx}" cy="${ly}" r="${body.coreR}" fill="${body.color}" stroke="${st === 2 ? '#ffd43b' : '#fff'}" stroke-width="1.8"/>`;
    const ang = t * 0.9;
    const [ex, ey] = [lx + Math.cos(ang) * orbR, ly + Math.sin(ang) * orbR];
    out += `<circle cx="${n(ex)}" cy="${n(ey)}" r="8" fill="${ st === 2 ? '#495057' : '#4dabf7'}" stroke="#fff" stroke-width="1.5"/>`;
    out += txt(lx, 286, st === 2 ? '变暗变冷，但地球轨道纹丝不动！' : '一年转一圈，轨道半径一模一样', { size: 11.5, color: '#ffd43b', plain: true });

    const [rx, ry] = [416, 162];
    out += txt(rx, 56, '近处放大：要多快才逃得掉？', { size: 12.5, bold: true, color: '#c8d4ea', plain: true });
    if (st < 2 && pr > 0) {
      out += `<circle cx="${rx}" cy="${ry}" r="66" fill="${body.color}" opacity="0.28" stroke="${body.color}" stroke-width="2" stroke-dasharray="5 4"/>`;
      out += txt(rx, ry - 6, '这里还在星球肚子里面', { size: 12.5, bold: true, color: '#fff', plain: true });
      out += txt(rx, ry + 16, '只有压成黑洞，才能凑到这么近', { size: 11.5, color: '#ffd43b', plain: true });
    } else {
      out += `<circle cx="${rx}" cy="${ry}" r="28" fill="#05070e" stroke="#ff922b" stroke-width="2.5" stroke-dasharray="4 3"/>`;
      out += txt(rx, ry + 4, '视界', { size: 11.5, color: '#ffd43b', plain: true });
      if (pr === 0) {
        out += arrow(rx + 46, ry, rx + 104, ry - 26, '#8ce99a', 3.5);
        out += txt(rx, 242, '逃逸速度约 42 km/s（光轻松飞走）', { size: 12, color: '#8ce99a', plain: true, bold: true });
      } else if (pr === 1) {
        out += `<path d="M${rx + 46} ${ry + 28} Q${rx + 36} ${ry - 34} ${rx + 106} ${ry - 52}" fill="none" stroke="#ffd43b" stroke-width="3.5"/>`;
        out += txt(rx, 242, '逃逸速度约 9.5 万 km/s（光被拉弯逃走）', { size: 12, color: '#ffd43b', plain: true, bold: true });
      } else {
        out += `<path d="M${rx + 16} ${ry - 8} Q${rx + 34} ${ry - 28} ${rx + 6} ${ry - 2}" fill="none" stroke="${HOT}" stroke-width="3.5"/>`;
        out += txt(rx, 242, '要超 30 万 km/s：连光都折回去了！', { size: 12, color: '#ffa8a8', plain: true, bold: true });
      }
    }
    out += txt(rx, 286, body.rLabel, { size: 12, color: '#c8d4ea', plain: true });
    out += txt(W / 2, 26, '黑洞不是到处乱吸的吸尘器——离远了引力跟普通恒星一样', { size: 14, bold: true, color: '#ffd43b', plain: true });
    return out;
  },
  readout(s) {
    const st = clamp(Math.round(s.stage), 0, 2);
    const pr = clamp(Math.round(s.probe), 0, 2);
    if (pr === 0) return `在地球轨道（离中心 1.5 亿公里）上：不管中心是现在的太阳、白矮星还是同样质量的黑洞，引力一分不多，逃逸速度都是约 42 km/s，地球照原样一年绕一圈`;
    if (st < 2) return `没压成黑洞前，离中心 30 公里或 3 公里的地方还深埋在星球肚子里面，外面的物质还没有全部集中到那么小的范围里`;
    if (pr === 1) return '太阳质量的黑洞，离中心 30 公里处：引力已经极强，逃逸速度飙升到约每秒 9.5 万公里，光线经过会被狠狠拉弯，但因为还没跨过 3 公里界线，光仍能逃出来';
    return '跨进半径约 3 公里的“事件视界”：想逃出去得比每秒 30 万公里的光速还快，宇宙里没有任何东西跑得过光，所以连光也有去无回';
  },
};

