import { W, H, INK, HOT, BLUE, G, n, r1, r2, clamp, smooth, rad, deg, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 运动与力 ---------------- */

export const inertia: SimDef = {
  params: [
    { key: 'a', label: '刹车有多猛', min: 2, max: 8, step: 1, value: 5, unit: ' m/s²' },
    { key: 'hold', label: '扶手', min: 0, max: 1, step: 1, value: 0, labels: ['不扶', '抓紧扶手'] },
  ],
  animated: true,
  still: 2.2,
  draw(s, t) {
    const v0 = 8;
    const tb = 1.2;
    const stop = v0 / s.a;
    const u = t % 6;
    const tau = clamp(u - tb, 0, stop);
    const dist = Math.min(u, tb) * v0 + v0 * tau - 0.5 * s.a * tau * tau;
    const braking = u > tb && u < tb + stop;
    const full = deg(Math.atan(s.a / G)) * (s.hold ? 0.25 : 1.7);
    let lean = 0;
    if (u > tb) lean = full * smooth((u - tb) / 0.3);
    if (u > tb + stop) lean = full * Math.exp(-(u - tb - stop) * 3) * Math.cos((u - tb - stop) * 9);
    const ball = Math.min(200 + (u > tb ? 0.5 * s.a * Math.min(u - tb, stop) ** 2 * 30 + (u > tb + stop ? v0 * (u - tb - stop) * 30 : 0) : 0), 396);
    let out = `<line x1="0" y1="274" x2="${W}" y2="274" stroke="${INK}" stroke-width="3"/>`;
    const offset = (dist * 30) % 60;
    for (let x = -offset; x < W; x += 60) out += `<line x1="${n(x)}" y1="292" x2="${n(x + 30)}" y2="292" stroke="#c9bca6" stroke-width="5" stroke-linecap="round"/>`;
    out += `<rect x="110" y="96" width="320" height="156" rx="20" fill="#ffd166" stroke="${INK}" stroke-width="3"/>`;
    for (let x = 128; x < 400; x += 58) out += `<rect x="${x}" y="110" width="46" height="44" rx="8" fill="#eaf4fb" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="404" y="110" width="20" height="70" rx="6" fill="#eaf4fb" stroke="${INK}" stroke-width="2"/>`;
    out += `<line x1="130" y1="236" x2="420" y2="236" stroke="${INK}" stroke-opacity="0.35" stroke-width="2"/>`;
    out += `<line x1="150" y1="166" x2="390" y2="166" stroke="#8b7a5c" stroke-width="4" stroke-linecap="round"/>`;
    for (const cx of [170, 370]) {
      const spin = (dist * 30) / 22;
      out += `<circle cx="${cx}" cy="254" r="22" fill="#4a4036"/><circle cx="${cx}" cy="254" r="9" fill="#d8cfc2"/>`
        + `<line x1="${n(cx + 18 * Math.cos(spin))}" y1="${n(254 + 18 * Math.sin(spin))}" x2="${n(cx - 18 * Math.cos(spin))}" y2="${n(254 - 18 * Math.sin(spin))}" stroke="#d8cfc2" stroke-width="3"/>`;
    }
    const body = `<g transform="rotate(${n(lean)} 270 234)">`
      + `<line x1="262" y1="234" x2="268" y2="196" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
      + `<line x1="278" y1="234" x2="272" y2="196" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
      + `<rect x="258" y="170" width="24" height="32" rx="9" fill="${BLUE}"/>`
      + `<circle cx="270" cy="158" r="12" fill="#f4c7a1" stroke="${INK}" stroke-width="2"/>`
      + (s.hold ? '' : `<line x1="280" y1="178" x2="296" y2="196" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`)
      + '</g>';
    out += body;
    if (s.hold) out += `<line x1="276" y1="176" x2="${n(290 + lean * 0.3)}" y2="166" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
    out += `<circle cx="${n(ball)}" cy="228" r="8" fill="${HOT}" stroke="${INK}" stroke-width="1.5"/>`;
    if (braking) {
      out += txt(270, 84, '刹车！车停了，人还想往前', { color: HOT, bold: true, size: 17 });
      out += arrow(300, 152, 360, 152, HOT, 4);
    } else if (u < tb) {
      out += arrow(150, 70, 230, 70, BLUE, 4) + txt(290, 76, '车和人一起往前跑', { color: BLUE, size: 15 });
    }
    return out;
  },
  readout(s) {
    const tilt = Math.round(deg(Math.atan(s.a / G)) * (s.hold ? 0.25 : 1.7));
    return s.hold
      ? `刹车加速度 ${s.a} m/s²：抓着扶手，扶手替你“刹车”，身子只晃一下（约 ${tilt}°）`
      : `刹车加速度 ${s.a} m/s²：脚跟着车停了，上身还想往前，往前扑约 ${tilt}°；地上的小球一路滚到车头`;
  },
};

export const projectile: SimDef = {
  params: [
    { key: 'angle', label: '扔出去的角度', min: 10, max: 80, step: 5, value: 30, unit: '°' },
    { key: 'v', label: '出手速度', min: 8, max: 20, step: 1, value: 14, unit: ' m/s' },
  ],
  animated: true,
  still: 0.9,
  draw(s, t) {
    const scale = 11;
    const [ox, oy] = [44, 282];
    const th = rad(s.angle);
    const [vx, vy] = [s.v * Math.cos(th), s.v * Math.sin(th)];
    const flight = (2 * vy) / G;
    const range = vx * flight;
    const path = (a: number): [number, number][] => {
      const [cx, cy] = [s.v * Math.cos(a), s.v * Math.sin(a)];
      const T = (2 * cy) / G;
      return Array.from({ length: 41 }, (_, i) => {
        const tau = (T * i) / 40;
        return [ox + cx * tau * scale, oy - (cy * tau - 0.5 * G * tau * tau) * scale];
      });
    };
    let out = `<line x1="20" y1="${oy}" x2="${W - 10}" y2="${oy}" stroke="${INK}" stroke-width="3"/>`;
    for (let m = 0; m * scale + ox < W - 20; m += 5) {
      out += `<line x1="${ox + m * scale}" y1="${oy}" x2="${ox + m * scale}" y2="${oy + 7}" stroke="${INK}" stroke-width="2"/>`;
      if (m % 10 === 0) out += txt(ox + m * scale, oy + 24, `${m} m`, { size: 12, color: '#8b7a5c' });
    }
    if (s.angle !== 45) {
      out += `<polyline points="${poly(path(rad(45)))}" fill="none" stroke="#c9bca6" stroke-width="2.5" stroke-dasharray="6 6"/>`;
      const far = ox + (s.v * s.v / G) * scale;
      out += txt(Math.min(far, W - 30), oy - 10, '45°', { size: 13, color: '#8b7a5c' });
    }
    out += `<polyline points="${poly(path(th))}" fill="none" stroke="${BLUE}" stroke-width="3"/>`;
    const land = ox + range * scale;
    out += `<line x1="${n(land)}" y1="${oy}" x2="${n(land)}" y2="${oy - 26}" stroke="${HOT}" stroke-width="3"/><polygon points="${n(land)},${oy - 26} ${n(land + 18)},${oy - 20} ${n(land)},${oy - 14}" fill="${HOT}"/>`;
    out += txt(clamp(land, 50, W - 50), oy - 34, `${r1(range)} 米`, { color: HOT, bold: true });
    const u = t % (flight + 1.2);
    const tau = Math.min(u, flight);
    const bx = ox + vx * tau * scale;
    const vNow = vy - G * tau;
    const by = oy - (vy * tau - 0.5 * G * tau * tau) * scale;
    if (u < flight) {
      out += arrow(bx, by, bx + vx * 3.2, by, '#2c774a', 3);
      out += arrow(bx, by, bx, by - vNow * 3.2, HOT, 3);
    }
    out += `<circle cx="${n(bx)}" cy="${n(by)}" r="9" fill="#ff9f43" stroke="${INK}" stroke-width="2"/>`;
    out += `<text x="${ox - 18}" y="${oy - 6}" font-size="32" text-anchor="middle">🧒</text>`;
    out += txt(W - 16, 26, '绿：横着的速度一直不变', { anchor: 'end', size: 13, color: '#2c774a' });
    out += txt(W - 16, 46, '橙：竖着的速度被重力改变', { anchor: 'end', size: 13, color: HOT });
    return out;
  },
  readout(s) {
    const th = rad(s.angle);
    const range = (s.v * s.v * Math.sin(2 * th)) / G;
    const flight = (2 * s.v * Math.sin(th)) / G;
    return `${s.angle}° 扔出：在空中飞 ${r1(flight)} 秒，落在 ${r1(range)} 米外（同样的速度 45° 能扔 ${r1((s.v * s.v) / G)} 米）`;
  },
};

/** 一个侧面的小人：脚踩在 (x, y)，lean 是往后仰的角度（度，正数往左仰） */
function kid(x: number, y: number, lean: number, shirt: string, socks = false): string {
  const foot = socks ? '#ffffff' : INK;
  return `<g transform="rotate(${n(-lean)} ${n(x)} ${n(y)})">`
    + `<line x1="${n(x - 6)}" y1="${n(y)}" x2="${n(x - 2)}" y2="${n(y - 34)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    + `<line x1="${n(x + 6)}" y1="${n(y)}" x2="${n(x + 2)}" y2="${n(y - 34)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
    + `<ellipse cx="${n(x - 8)}" cy="${n(y)}" rx="7" ry="3.5" fill="${foot}" stroke="${INK}" stroke-width="1.5"/>`
    + `<ellipse cx="${n(x + 8)}" cy="${n(y)}" rx="7" ry="3.5" fill="${foot}" stroke="${INK}" stroke-width="1.5"/>`
    + `<rect x="${n(x - 11)}" y="${n(y - 66)}" width="22" height="34" rx="9" fill="${shirt}"/>`
    + `<circle cx="${n(x)}" cy="${n(y - 78)}" r="11" fill="#f4c7a1" stroke="${INK}" stroke-width="2"/>`
    + '</g>';
}

const SURFACES = ['地毯', '木地板', '冰面', '没有摩擦'];
/** 冰壶在各种地面上的滑动摩擦系数，示意用的大约值 */
const SLIDE_MU = [0.4, 0.2, 0.015, 0];
const SURFACE_COLORS = ['#c98b73', '#ddb683', '#e3f3fb', '#f6f1e6'];

const slideDistance = (v: number, mu: number): number => (mu > 0 ? (v * v) / (2 * mu * G) : Infinity);

export const slide: SimDef = {
  params: [
    { key: 'floor', label: '冰壶滑在', min: 0, max: 3, step: 1, value: 0, labels: SURFACES },
    { key: 'v', label: '推出去的速度', min: 1, max: 4, step: 0.5, value: 2.5, unit: ' m/s' },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const mu = SLIDE_MU[s.floor];
    const dist = SLIDE_MU.slice(0, 3).map(m => slideDistance(s.v, m));
    const longest = Math.max(...dist);
    let out = '';
    SURFACES.forEach((name, i) => {
      const y = 26 + i * 25;
      const hot = i === s.floor;
      const color = hot ? HOT : '#8b7a5c';
      out += txt(78, y + 5, name, { anchor: 'end', size: 13, color, bold: hot });
      if (i < 3) {
        const w = Math.max(4, (360 * dist[i]) / longest);
        out += `<rect x="88" y="${y - 7}" width="${n(w)}" height="14" rx="7" fill="${hot ? HOT : '#d8cbb3'}"/>`;
        out += txt(96 + w, y + 5, `${r1(dist[i])} 米`, { anchor: 'start', size: 13, color, bold: hot });
      } else {
        out += arrow(88, y, 300, y, hot ? HOT : '#d8cbb3', 4) + txt(308, y + 5, '一直滑下去，不会停', { anchor: 'start', size: 13, color, bold: hot });
      }
    });

    const stopTime = mu > 0 ? s.v / (mu * G) : Infinity;
    const fast = Math.max(1, Math.min(stopTime, 40) / 4);
    const play = Math.min(stopTime, 40) / fast;
    const u = t % (play + 1.2);
    const tau = Math.min(u, play) * fast;
    const moving = tau < stopTime && u < play;
    const pos = mu > 0 ? s.v * tau - 0.5 * mu * G * tau * tau : s.v * tau;
    const vNow = mu > 0 ? Math.max(s.v - mu * G * tau, 0) : s.v;
    const perM = 60;
    const stoneX = 150 + Math.min(pos * perM, 120);
    const shift = Math.max(pos * perM - 120, 0);
    out += `<rect x="0" y="252" width="${W}" height="68" fill="${SURFACE_COLORS[s.floor]}"/>`;
    out += `<line x1="0" y1="252" x2="${W}" y2="252" stroke="${INK}" stroke-width="2.5"/>`;
    for (let m = Math.floor(shift / perM) - 1; m * perM - shift < W; m += 1) {
      const x = 150 + m * perM - shift;
      if (x < -10 || m < 0) continue;
      out += `<line x1="${n(x)}" y1="252" x2="${n(x)}" y2="${m % 5 === 0 ? 266 : 260}" stroke="${INK}" stroke-opacity="0.5" stroke-width="2"/>`;
      if (m % 5 === 0) out += txt(x, 282, `${m} 米`, { size: 12, color: '#8b7a5c' });
    }
    const start = 150 - shift;
    if (start > -4) out += `<line x1="${n(start)}" y1="200" x2="${n(start)}" y2="252" stroke="${HOT}" stroke-width="2" stroke-dasharray="5 4"/>`;
    out += `<ellipse cx="${n(stoneX)}" cy="236" rx="30" ry="14" fill="#8e98a3" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="${n(stoneX - 30)}" y="224" width="60" height="10" fill="#6f7a86"/>`
      + `<ellipse cx="${n(stoneX)}" cy="224" rx="30" ry="10" fill="#aab3bd" stroke="${INK}" stroke-width="2"/>`
      + `<path d="M${n(stoneX - 6)} 222 v-12 h22" fill="none" stroke="#d64545" stroke-width="5" stroke-linecap="round"/>`;
    if (moving) {
      out += arrow(stoneX + 34, 214, stoneX + 34 + vNow * 22, 214, BLUE, 4);
      if (mu > 0) out += arrow(stoneX - 30, 246, stoneX - 30 - (18 + mu * 120), 246, HOT, 4);
    }
    out += txt(stoneX, 190, mu > 0 && !moving && u >= play ? `停了：滑了 ${r1(Math.min(pos, dist[s.floor]))} 米` : `${r1(pos)} 米`, { bold: true, color: INK, size: 14 });
    if (mu > 0 && fast > 1.05 && moving) out += txt(W - 14, 186, `快放 ×${Math.round(fast)}`, { anchor: 'end', size: 12, color: '#8b7a5c' });
    out += txt(W - 14, 166, mu > 0 ? '橙：摩擦往回拉  蓝：速度' : '没有摩擦：速度一直不变', { anchor: 'end', size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const mu = SLIDE_MU[s.floor];
    if (!mu) return `没有摩擦时，谁也不去拉住它：以 ${s.v} m/s 推出，速度永远不变，一直滑下去——伽利略就是这样想到的`;
    return `在${SURFACES[s.floor]}上以 ${s.v} m/s 推出：摩擦一路往回拉，滑 ${r1(slideDistance(s.v, mu))} 米、${r1(s.v / (mu * G))} 秒后停下`;
  },
};

const SOLES = ['光滑鞋底', '有花纹的鞋底'];
const FLOORS = ['干地面', '湿地面'];
/** 抓地力（示意，0～1）：[地面][鞋底] */
const GRIP = [[0.8, 0.78], [0.12, 0.55]];
const NEED = 0.3;

export const friction: SimDef = {
  params: [
    { key: 'sole', label: '鞋底', min: 0, max: 1, step: 1, value: 0, labels: SOLES },
    { key: 'floor', label: '地面', min: 0, max: 1, step: 1, value: 1, labels: FLOORS },
  ],
  animated: true,
  still: 0.6,
  draw(s, t) {
    const grip = GRIP[s.floor][s.sole];
    const slips = grip < NEED;
    const phase = (t * 1.6) % 1;
    const push = Math.sin(phase * Math.PI);
    let out = `<rect x="0" y="232" width="250" height="88" fill="${s.floor ? '#dbe9f3' : '#e9e2d4'}"/>`
      + `<line x1="0" y1="232" x2="250" y2="232" stroke="${INK}" stroke-width="2.5"/>`;
    if (s.floor) for (let i = 0; i < 5; i += 1) out += `<ellipse cx="${30 + i * 48}" cy="240" rx="16" ry="3" fill="#9cc7e8"/>`;
    const slide = slips ? push * 26 : 0;
    const lean = slips ? -push * 18 : push * 6;
    out += `<g transform="rotate(${n(lean)} 120 232)">`
      + `<line x1="120" y1="186" x2="${n(150 + slide * 0.2)}" y2="232" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
      + `<line x1="120" y1="186" x2="${n(96 - slide)}" y2="232" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`
      + `<rect x="108" y="140" width="24" height="48" rx="10" fill="${BLUE}"/>`
      + `<circle cx="120" cy="126" r="13" fill="#f4c7a1" stroke="${INK}" stroke-width="2"/>`
      + '</g>';
    out += arrow(96 - slide, 250, 60 - slide, 250, BLUE, 3) + txt(64 - slide, 272, '脚往后蹬地', { size: 12, color: BLUE });
    if (!slips) out += arrow(96, 214, 96 + 70 * grip, 214, HOT, 4) + txt(118, 204, '地面往前推脚', { size: 12, color: HOT, anchor: 'start' });
    else out += txt(110, 100, '哧溜——滑倒了！', { size: 16, color: HOT, bold: true });

    out += txt(18, 30, '抓地力', { anchor: 'start', size: 13 });
    out += `<rect x="68" y="20" width="170" height="14" rx="7" fill="#efe6d6"/><rect x="68" y="20" width="${n(170 * grip)}" height="14" rx="7" fill="${slips ? HOT : '#2c774a'}"/>`;
    out += `<line x1="${n(68 + 170 * NEED)}" y1="14" x2="${n(68 + 170 * NEED)}" y2="40" stroke="${INK}" stroke-width="2"/>`;
    out += txt(68 + 170 * NEED, 54, '走路至少要这么多', { size: 11, color: '#8b7a5c' });

    const [bx, by, bw, bh] = [278, 40, 266, 230];
    out += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="16" fill="#fffdf8" stroke="#cfe0f7" stroke-width="2.5"/>`;
    out += txt(bx + bw / 2, by + 24, '放大看鞋底和地面', { size: 13, color: '#8b7a5c' });
    const floorY = by + 170;
    out += `<rect x="${bx + 12}" y="${floorY}" width="${bw - 24}" height="34" rx="6" fill="#cfc6b8"/>`;
    const lift = s.floor && !s.sole ? 12 : 0;
    const soleTop = by + 90;
    const soleBottom = floorY - lift;
    const left = bx + 26;
    const right = bx + bw - 26;
    if (s.sole) {
      const grooves = 6;
      const step = (right - left) / grooves;
      let d = `M${left} ${soleTop} H${right} V${soleBottom}`;
      for (let i = grooves - 1; i >= 0; i -= 1) {
        const x = left + i * step;
        d += ` H${n(x + step * 0.7)} V${soleBottom - 16} H${n(x + step * 0.3)} V${soleBottom}`;
      }
      d += ` H${left} Z`;
      if (s.floor) {
        for (let i = 0; i < grooves; i += 1) {
          const x = left + i * step + step * 0.3;
          out += `<rect x="${n(x)}" y="${soleBottom - 16}" width="${n(step * 0.4)}" height="16" fill="#7fb8e6"/>`;
          const drift = ((t * 30 + i * 9) % 18) - 9;
          out += `<circle cx="${n(x + step * 0.2 + drift * 0.4)}" cy="${soleBottom - 8}" r="2.5" fill="#ffffff"/>`;
        }
      }
      out += `<path d="${d}" fill="#4a4036" fill-opacity="${s.floor ? 0.92 : 1}"/>`;
    } else {
      out += `<rect x="${left}" y="${soleTop}" width="${right - left}" height="${soleBottom - soleTop}" rx="6" fill="#4a4036"/>`;
    }
    if (lift) {
      out += `<rect x="${bx + 12}" y="${soleBottom}" width="${bw - 24}" height="${lift}" fill="#7fb8e6"/>`;
      out += txt(bx + bw / 2, soleTop - 12, '一层水膜把鞋底托离地面', { size: 13, color: HOT, bold: true });
    } else if (s.floor) {
      out += txt(bx + bw / 2, soleTop - 12, '水被挤进花纹沟里，鞋底还踩得到地', { size: 12.5, color: '#2c774a', bold: true });
    } else {
      out += txt(bx + bw / 2, soleTop - 12, '鞋底贴着地面，抓得牢', { size: 13, color: '#2c774a', bold: true });
    }
    return out;
  },
  readout(s) {
    if (!s.floor) return `${SOLES[s.sole]}踩在干地面上：鞋底和地面贴得紧，摩擦够大，脚往后蹬，地面就把你往前推`;
    return s.sole
      ? '有花纹的鞋底踩湿地：水被挤进花纹的沟里，鞋底大部分还贴着地，摩擦够用，不容易滑'
      : '光滑鞋底踩湿地：鞋底和地面之间夹了一层水，像在水上滑，摩擦小得不够走路，一蹬就滑';
  },
};

const TUG_FEET = ['穿运动鞋', '只穿袜子'];
/** 脚和地面之间的摩擦系数，示意用的大约值 */
const TUG_MU = [0.8, 0.3];

export const tug: SimDef = {
  params: [
    { key: 'left', label: '左队体重合计', min: 120, max: 240, step: 20, value: 180, unit: ' kg' },
    { key: 'right', label: '右队体重合计', min: 120, max: 240, step: 20, value: 160, unit: ' kg' },
    { key: 'feet', label: '右队脚下', min: 0, max: 1, step: 1, value: 0, labels: TUG_FEET },
  ],
  animated: true,
  still: 2,
  draw(s, t) {
    const gripL = TUG_MU[0] * s.left;
    const gripR = TUG_MU[s.feet] * s.right;
    const dir = Math.sign(gripL - gripR);
    const u = t % 5;
    const drift = -dir * 60 * smooth((u - 0.6) / 3.4);
    const ground = 262;
    let out = `<rect x="0" y="${ground}" width="${W}" height="${320 - ground}" fill="#e9e2d4"/><line x1="0" y1="${ground}" x2="${W}" y2="${ground}" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<line x1="280" y1="${ground - 6}" x2="280" y2="${ground + 14}" stroke="${HOT}" stroke-width="3"/>`;
    const ropeY = 196;
    out += `<line x1="${n(40 + drift)}" y1="${ropeY}" x2="${n(520 + drift)}" y2="${ropeY}" stroke="#b08850" stroke-width="6" stroke-linecap="round"/>`;
    out += `<rect x="${n(274 + drift)}" y="${ropeY - 4}" width="12" height="26" fill="#d64545"/>`;
    const sizeL = 0.85 + (s.left - 120) / 600;
    const sizeR = 0.85 + (s.right - 120) / 600;
    for (const [i, x] of [100, 160].entries()) {
      out += `<g transform="translate(${n(x + drift)} ${ground}) scale(${n(sizeL)}) translate(${-x} ${-ground})">${kid(x, ground, 16 - i * 2, '#2c774a')}</g>`;
    }
    for (const [i, x] of [400, 460].entries()) {
      out += `<g transform="translate(${n(x + drift)} ${ground}) scale(${n(sizeR)}) translate(${-x} ${-ground})">${kid(x, ground, -(16 - i * 2), BLUE, s.feet === 1)}</g>`;
    }
    const rope = 64;
    out += arrow(186 + drift, ropeY - 22, 186 + drift + rope, ropeY - 22, '#8b5cf6', 4) + txt(186 + drift + rope / 2, ropeY - 32, '绳子拉左队', { size: 12, color: '#8b5cf6' });
    out += arrow(374 + drift, ropeY - 22, 374 + drift - rope, ropeY - 22, '#8b5cf6', 4) + txt(374 + drift - rope / 2, ropeY - 32, '绳子拉右队', { size: 12, color: '#8b5cf6' });
    out += txt(280 + drift, ropeY - 56, '一样大！', { size: 14, color: '#8b5cf6', bold: true });
    const scale = 0.42;
    out += arrow(130 + drift, ground + 18, 130 + drift - gripL * scale, ground + 18, '#2c774a', 5);
    out += arrow(430 + drift, ground + 18, 430 + drift + gripR * scale, ground + 18, BLUE, 5);
    out += txt(130 + drift, ground + 44, '地面帮左队', { size: 12, color: '#2c774a' });
    out += txt(430 + drift, ground + 44, '地面帮右队', { size: 12, color: BLUE });
    const verdict = dir > 0 ? '左队脚下抓得更牢 → 左队赢' : dir < 0 ? '右队脚下抓得更牢 → 右队赢' : '两边脚下一样牢 → 僵住了';
    out += txt(280, 30, verdict, { size: 16, bold: true, color: dir ? HOT : INK });
    return out;
  },
  readout(s) {
    const gripL = TUG_MU[0] * s.left;
    const gripR = TUG_MU[s.feet] * s.right;
    if (gripL === gripR) return '绳子拉两队的力一样大，两队脚下也一样牢，谁也拉不动谁';
    const [win, lose, ratio] = gripL > gripR ? ['左队', '右队', gripR / gripL] : ['右队', '左队', gripL / gripR];
    return `绳子拉两队的力永远一样大；${lose}脚下最多只能抓住${win}的 ${Math.round(ratio * 100)}%，先被拖着滑过去——${win}赢`;
  },
};

const PLACES = ['地球上（有空气）', '月球上（没有空气）'];
const LIGHT_THINGS = ['羽毛', '揉成团的纸'];
/** 地球空气里的收尾速度（m/s），大约值：羽毛很快就只能慢慢飘，纸团要快得多 */
const TERMINAL = [0.5, 6];
const DROP_H = 1.6;

/** 从 1.6 米高放手：每 1/240 秒记一次已经落下的距离，直到落地 */
function fallTrack(g: number, terminal: number): number[] {
  const dt = 1 / 240;
  const ys = [0];
  let [y, v] = [0, 0];
  while (y < DROP_H && ys.length < 240 * 20) {
    const drag = Number.isFinite(terminal) ? (g / (terminal * terminal)) * v * v : 0;
    v += (g - drag) * dt;
    y = Math.min(y + v * dt, DROP_H);
    ys.push(y);
  }
  return ys;
}

const fallTime = (ys: readonly number[]): number => (ys.length - 1) / 240;
const fallAt = (ys: readonly number[], time: number): number => ys[Math.min(Math.round(time * 240), ys.length - 1)];

function fallTracks(s: Record<string, number>): { g: number; hammer: number[]; light: number[] } {
  const g = s.place ? 1.62 : G;
  return { g, hammer: fallTrack(g, Infinity), light: fallTrack(g, s.place ? Infinity : TERMINAL[s.thing]) };
}

export const fall: SimDef = {
  params: [
    { key: 'place', label: '在哪儿放手', min: 0, max: 1, step: 1, value: 0, labels: PLACES },
    { key: 'thing', label: '和锤子一起放手的', min: 0, max: 1, step: 1, value: 0, labels: LIGHT_THINGS },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const moon = s.place === 1;
    const { hammer, light } = fallTracks(s);
    const [tH, tL] = [fallTime(hammer), fallTime(light)];
    const u = t % (Math.max(tH, tL) + 1.6);
    const top = 70;
    const ground = 274;
    const perM = (ground - top) / DROP_H;
    let out = `<rect width="${W}" height="${ground}" rx="12" fill="${moon ? '#1f2433' : '#eaf4fb'}"/>`;
    out += `<rect x="0" y="${ground}" width="${W}" height="${320 - ground}" fill="${moon ? '#9a9a96' : '#b7d99a'}"/>`;
    if (moon) for (let i = 0; i < 14; i += 1) out += `<circle cx="${n(20 + ((i * 97) % 520))}" cy="${n(16 + ((i * 53) % 120))}" r="1.6" fill="#ffffff"/>`;
    const textOpts = { size: 13, color: moon ? '#f2efe6' : '#8b7a5c', plain: moon };
    out += `<line x1="70" y1="${top}" x2="70" y2="${ground}" stroke="${moon ? '#f2efe6' : '#8b7a5c'}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
    out += txt(64, (top + ground) / 2, '1.6 米', { ...textOpts, anchor: 'end' });
    const columns: [number, number[], number, string][] = [[200, hammer, tH, '锤子'], [360, light, tL, LIGHT_THINGS[s.thing]]];
    for (const [x, ys, total, name] of columns) {
      const y = top + fallAt(ys, u) * perM;
      out += `<rect x="${x - 22}" y="${top - 26}" width="44" height="10" rx="5" fill="${moon ? '#f2efe6' : '#f4c7a1'}" opacity="0.8"/>`;
      if (name === '锤子') {
        out += `<g transform="translate(${x} ${n(y)})"><rect x="-3" y="-4" width="6" height="30" rx="2" fill="#b08850"/><rect x="-14" y="-12" width="28" height="12" rx="3" fill="#7d8691" stroke="${INK}" stroke-width="1.5"/></g>`;
      } else if (name === '羽毛') {
        const sway = moon ? 0 : Math.sin(u * 5) * 14 * Math.min(fallAt(ys, u) / 0.3, 1);
        out += `<g transform="translate(${n(x + sway)} ${n(y)}) rotate(${n(sway * 2)})"><path d="M0 18 C -12 6, -10 -10, 0 -18 C 10 -10, 12 6, 0 18 Z" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/><line x1="0" y1="20" x2="0" y2="-16" stroke="${INK}" stroke-width="1.2"/></g>`;
      } else {
        out += `<polygon points="${poly(Array.from({ length: 9 }, (_, i) => {
          const a = (i / 9) * Math.PI * 2;
          const r = 11 + (i % 2) * 3;
          return [x + r * Math.cos(a), y + r * Math.sin(a)] as const;
        }))}" fill="#f6f3ea" stroke="${INK}" stroke-width="1.5"/>`;
      }
      const landed = u >= total;
      out += txt(x, ground + 30, landed ? `${name} ${r2(total)} 秒落地` : name, { size: 13.5, bold: landed, color: landed ? HOT : INK });
    }
    const same = Math.abs(tH - tL) < 0.05;
    out += txt(W - 18, 30, moon ? '月球：没有空气托着' : '地球：空气往上托', { ...textOpts, anchor: 'end', size: 14, bold: true });
    if (u > Math.max(tH, tL)) out += txt(W - 18, 52, same ? '几乎同时落地！' : `差了 ${r1(Math.abs(tL - tH))} 秒`, { ...textOpts, anchor: 'end', size: 14, color: moon ? '#ffd166' : HOT, plain: moon });
    return out;
  },
  readout(s) {
    const { hammer, light } = fallTracks(s);
    const [tH, tL] = [fallTime(hammer), fallTime(light)];
    if (s.place) return `月球上没有空气：从 1.6 米放手，锤子和${LIGHT_THINGS[s.thing]}都用 ${r2(tH)} 秒，同时落地——1971 年阿波罗 15 号的航天员就这样做过`;
    return s.thing
      ? `地球上：锤子 ${r2(tH)} 秒、纸团 ${r2(tL)} 秒，几乎一起落地。同一张纸，揉成团空气就托不住了——快慢看空气，不看轻重`
      : `地球上：锤子 ${r2(tH)} 秒落地，羽毛要 ${r1(tL)} 秒——是空气一直在往上托羽毛`;
  },
};

const EMPTY_TRUCK = 10;

function truck(x: number, ground: number, crates: number, ghost: boolean): string {
  const style = ghost ? ` fill-opacity="0.25" stroke-dasharray="5 4"` : '';
  let out = `<rect x="${n(x)}" y="${ground - 62}" width="104" height="44" rx="5" fill="#e6dccb" stroke="${INK}" stroke-width="2"${style}/>`
    + `<path d="M${n(x + 104)} ${ground - 18} V${ground - 56} H${n(x + 126)} L${n(x + 144)} ${ground - 36} V${ground - 18} Z" fill="${ghost ? '#ffd166' : '#f08c00'}" stroke="${INK}" stroke-width="2"${style}/>`
    + `<rect x="${n(x + 110)}" y="${ground - 52}" width="16" height="14" rx="3" fill="#eaf4fb"${ghost ? ' opacity="0.4"' : ''}/>`;
  for (let i = 0; i < crates; i += 1) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    out += `<rect x="${n(x + 6 + col * 32)}" y="${ground - 50 - row * 18}" width="28" height="16" rx="3" fill="#c08a4d" stroke="${INK}" stroke-width="1.2"/>`;
  }
  for (const cx of [x + 24, x + 82, x + 124]) out += `<circle cx="${n(cx)}" cy="${ground - 10}" r="10" fill="#4a4036"${ghost ? ' opacity="0.35"' : ''}/>`;
  return out;
}

export const push: SimDef = {
  params: [
    { key: 'cargo', label: '车上装的货', min: 0, max: 30, step: 5, value: 20, unit: ' 吨' },
    { key: 'force', label: '发动机的推力', min: 10, max: 40, step: 5, value: 20, unit: ' kN' },
  ],
  animated: true,
  still: 2.6,
  draw(s, t) {
    const mass = EMPTY_TRUCK + s.cargo;
    const a = s.force / mass;
    const a0 = s.force / EMPTY_TRUCK;
    const u = t % 4.2;
    const tau = Math.min(u, 3);
    const perM = 16;
    let out = '';
    const lanes: [number, number, number, boolean, string][] = [[132, a0, 0, true, `空车 ${EMPTY_TRUCK} 吨`], [276, a, s.cargo / 5, false, `连货 ${mass} 吨`]];
    for (const [ground, acc, crates, ghost, name] of lanes) {
      out += `<line x1="0" y1="${ground}" x2="${W}" y2="${ground}" stroke="${INK}" stroke-width="2.5"/>`;
      out += `<line x1="30" y1="${ground - 80}" x2="30" y2="${ground}" stroke="${HOT}" stroke-width="2" stroke-dasharray="5 4"/>`;
      const dist = 0.5 * acc * tau * tau;
      const x = 30 + Math.min(dist * perM, W - 190);
      out += truck(x, ground, Math.round(crates), ghost);
      out += txt(18, ground - 92, name, { anchor: 'start', size: 13, color: ghost ? '#8b7a5c' : INK, bold: !ghost });
      out += txt(W - 14, ground - 92, `${r1(acc * tau)} m/s`, { anchor: 'end', size: 14, color: ghost ? '#8b7a5c' : HOT, bold: true });
      if (u < 3) out += arrow(x + 150, ground - 34, x + 150 + 30, ground - 34, BLUE, 4);
    }
    out += txt(W / 2, 22, `同样 ${s.force} 千牛的推力，${u < 3 ? `第 ${r1(tau)} 秒` : '3 秒后'}`, { size: 14, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const mass = EMPTY_TRUCK + s.cargo;
    const a = s.force / mass;
    return `推力 ${s.force} 千牛、车连货 ${mass} 吨：加速度 = 推力 ÷ 质量 = ${r2(a)} m/s²，3 秒后快到 ${r1(3 * a)} m/s；空车同样的推力是 ${r2(s.force / EMPTY_TRUCK)} m/s²`;
  },
};

export const drop: SimDef = {
  params: [
    { key: 'v', label: '弹珠滚出桌边的速度', min: 0, max: 3, step: 0.5, value: 1.5, unit: ' m/s' },
    { key: 'h', label: '桌子有多高', min: 0.5, max: 1.2, step: 0.1, value: 0.8, unit: ' m' },
  ],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const perM = 168;
    const top = 80;
    const edge = 150;
    const floor = top + s.h * perM;
    const tf = Math.sqrt((2 * s.h) / G);
    const slow = 3;
    const u = t % (tf * slow + 1.4);
    const tau = Math.min(u / slow, tf);
    let out = `<rect x="16" y="${top - 12}" width="${edge - 16}" height="12" rx="3" fill="#c8955b" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="30" y="${top}" width="10" height="${n(floor - top)}" fill="#b07b45"/><rect x="${edge - 24}" y="${top}" width="10" height="${n(floor - top)}" fill="#b07b45"/>`
      + `<line x1="0" y1="${n(floor)}" x2="${W}" y2="${n(floor)}" stroke="${INK}" stroke-width="2.5"/>`;
    const r = 7;
    for (let k = 1; k * 0.1 <= tau + 1e-9; k += 1) {
      const tk = k * 0.1;
      const yk = top - r + 0.5 * G * tk * tk * perM;
      const xk = edge + s.v * tk * perM;
      out += `<line x1="${edge}" y1="${n(yk)}" x2="${n(xk)}" y2="${n(yk)}" stroke="#c9bca6" stroke-width="1.5" stroke-dasharray="3 4"/>`;
      out += `<circle cx="${edge}" cy="${n(yk)}" r="${r}" fill="#9cc7e8" opacity="0.45"/>`;
      if (s.v > 0) out += `<circle cx="${n(xk)}" cy="${n(yk)}" r="${r}" fill="#ffb36b" opacity="0.45"/>`;
    }
    const y = top - r + 0.5 * G * tau * tau * perM;
    out += `<circle cx="${edge}" cy="${n(Math.min(y, floor - r))}" r="${r}" fill="#3a86c8" stroke="${INK}" stroke-width="1.5"/>`;
    if (s.v > 0) out += `<circle cx="${n(edge + s.v * tau * perM)}" cy="${n(Math.min(y, floor - r))}" r="${r}" fill="${HOT}" stroke="${INK}" stroke-width="1.5"/>`;
    const landed = u / slow >= tf;
    out += txt(edge - 4, top - 24, '蓝：直接掉下去', { anchor: 'end', size: 12.5, color: '#3a86c8' });
    out += txt(edge + 12, top - 24, '橙：滚出桌边', { anchor: 'start', size: 12.5, color: HOT });
    out += txt(W - 14, 26, '慢动作 · 每 0.1 秒留一个影子', { anchor: 'end', size: 12, color: '#8b7a5c' });
    if (landed) {
      out += txt(W - 14, 50, `一起落地！都用了 ${r2(tf)} 秒`, { anchor: 'end', size: 14.5, color: HOT, bold: true });
      if (s.v > 0) out += txt(edge + s.v * tf * perM, floor + 22, `${r2(s.v * tf)} 米`, { size: 13, color: HOT, bold: true });
    }
    return out;
  },
  readout(s) {
    const tf = Math.sqrt((2 * s.h) / G);
    if (!s.v) return `速度为 0 就是直接掉下去：从 ${r1(s.h)} 米高落地用 ${r2(tf)} 秒`;
    return `从 ${r1(s.h)} 米高的桌边以 ${s.v} m/s 滚出：${r2(tf)} 秒落地，和直接掉下去的同时着地；横着一直是 ${s.v} m/s，走了 ${r2(s.v * tf)} 米`;
  },
};

const STRING_STATE = ['拉着绳子', '剪断绳子'];
const WHIRL_MASS = 0.1;
const WHIRL_R = 0.5;

export const whirl: SimDef = {
  params: [
    { key: 'f', label: '每秒转几圈', min: 0.5, max: 2, step: 0.25, value: 1, unit: ' 圈' },
    { key: 'cut', label: '绳子', min: 0, max: 1, step: 1, value: 0, labels: STRING_STATE },
  ],
  animated: true,
  still: 0.9,
  draw(s, t) {
    const [cx, cy, R] = [170, 140, 90];
    const w = 2 * Math.PI * s.f;
    const force = WHIRL_MASS * w * w * WHIRL_R;
    // counter-clockwise on screen, cut after one and a half turns: the ball is at the bottom and flies right
    const cutAt = 1.5 / s.f;
    const u = s.cut ? t % (cutAt + 1.8) : t;
    let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#d8cbb3" stroke-width="2" stroke-dasharray="6 6"/>`
      + `<circle cx="${cx}" cy="${cy}" r="9" fill="${INK}"/>`;
    const angleAt = (time: number): number => -Math.PI / 2 - w * time;
    if (!s.cut || u < cutAt) {
      const a = angleAt(u);
      const [bx, by] = [cx + R * Math.cos(a), cy + R * Math.sin(a)];
      out += `<line x1="${cx}" y1="${cy}" x2="${n(bx)}" y2="${n(by)}" stroke="#b08850" stroke-width="3"/>`;
      const pull = 18 + force * 9;
      out += arrow(bx, by, bx - pull * Math.cos(a), by - pull * Math.sin(a), HOT, 4);
      const vLen = 18 + w * WHIRL_R * 9;
      out += arrow(bx, by, bx + vLen * Math.sin(a), by - vLen * Math.cos(a), BLUE, 3);
      out += `<circle cx="${n(bx)}" cy="${n(by)}" r="12" fill="#ff9f43" stroke="${INK}" stroke-width="2"/>`;
      if (s.cut) out += txt(W - 16, 270, '转到最下面就剪断……', { anchor: 'end', size: 14, color: HOT, bold: true });
    } else {
      const [px, py] = [cx, cy + R];
      const go = Math.min((u - cutAt) * w * R, W - px + 20);
      out += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${n(cy + 0.45 * R)}" stroke="#b08850" stroke-width="3"/>`;
      out += `<line x1="${px}" y1="${py + 14}" x2="${px}" y2="${H - 10}" stroke="#c9bca6" stroke-width="2.5" stroke-dasharray="5 5"/>`;
      out += txt(px - 12, H - 22, '✗ 往外甩', { size: 13, color: '#8b7a5c', anchor: 'end' });
      out += `<line x1="${px}" y1="${py}" x2="${n(px + go)}" y2="${py}" stroke="${BLUE}" stroke-width="2.5" stroke-dasharray="7 5"/>`;
      out += `<circle cx="${n(px + go)}" cy="${py}" r="12" fill="#ff9f43" stroke="${INK}" stroke-width="2"/>`;
      out += txt(W - 16, 270, '✓ 沿着剪断那一刻的方向直直飞走', { anchor: 'end', size: 14, color: BLUE, bold: true });
    }
    out += txt(W - 16, 34, '橙：绳子往圆心拉', { anchor: 'end', size: 13, color: HOT });
    out += txt(W - 16, 56, '蓝：球此刻的速度方向', { anchor: 'end', size: 13, color: BLUE });
    out += txt(W - 16, 96, `要拉 ${r1(force)} 牛`, { anchor: 'end', size: 20, color: HOT, bold: true });
    out += `<rect x="${W - 156}" y="108" width="140" height="12" rx="6" fill="#efe6d6"/><rect x="${W - 156}" y="108" width="${n(140 * force / 8)}" height="12" rx="6" fill="${HOT}"/>`;
    return out;
  },
  readout(s) {
    const w = 2 * Math.PI * s.f;
    const force = WHIRL_MASS * w * w * WHIRL_R;
    if (s.cut) return '剪断后，再没有谁往圆心拉它：球照着剪断那一刻的速度方向直直飞出去，不是被“甩”向外面';
    return `0.1 千克的球、绳长 0.5 米，每秒转 ${s.f} 圈：绳子要一直往圆心拉 ${r1(force)} 牛；转快一倍，要拉 4 倍`;
  },
};
