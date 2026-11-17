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
