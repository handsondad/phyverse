import { W, H, INK, HOT, BLUE, n, r1, clamp, smooth, rad, deg, noise, txt, arrow, poly, type State, type SimDef } from './kit';

/* ---------------- 磁与电磁 ---------------- */

const NPOLE = '#d9480f';
const SPOLE = BLUE;
const IRON = '#9aa3ad';
const COPPER = '#c77d3a';
const FIELD = '#7a9cc6';

type Pt = [number, number];

/** N 极红、S 极蓝的小磁针；ang 是 N 端在屏幕上的方向（弧度） */
function needle(cx: number, cy: number, ang: number, len: number): string {
  const [dx, dy] = [Math.cos(ang), Math.sin(ang)];
  const [px, py] = [-dy * len * 0.18, dx * len * 0.18];
  const tip = (s: number): string => `${n(cx + dx * len * s)},${n(cy + dy * len * s)}`;
  const side = `${n(cx + px)},${n(cy + py)} ${n(cx - px)},${n(cy - py)}`;
  return `<polygon points="${tip(1)} ${side}" fill="${NPOLE}" stroke="${INK}" stroke-width="1.5"/>`
    + `<polygon points="${tip(-1)} ${side}" fill="${SPOLE}" stroke="${INK}" stroke-width="1.5"/>`
    + `<circle cx="${n(cx)}" cy="${n(cy)}" r="3" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
}

/** 横放的条形磁铁；nLeft 为真时 N 极在左边 */
function bar(x: number, y: number, w: number, h: number, nLeft: boolean): string {
  const half = w / 2;
  const [left, right] = nLeft ? [NPOLE, SPOLE] : [SPOLE, NPOLE];
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(half)}" height="${n(h)}" fill="${left}" stroke="${INK}" stroke-width="2.5"/>`
    + `<rect x="${n(x + half)}" y="${n(y)}" width="${n(half)}" height="${n(h)}" fill="${right}" stroke="${INK}" stroke-width="2.5"/>`
    + txt(x + half / 2, y + h / 2 + 6, nLeft ? 'N' : 'S', { size: 17, bold: true, color: '#fff', plain: true })
    + txt(x + half * 1.5, y + h / 2 + 6, nLeft ? 'S' : 'N', { size: 17, bold: true, color: '#fff', plain: true });
}

/** 地球那样的偶极磁场：每条磁感线 r = L·R·cos²λ，画在左右两边 */
function dipolePaths(cx: number, cy: number, R: number, Ls: readonly number[]): Pt[][] {
  const paths: Pt[][] = [];
  for (const L of Ls) {
    const top = Math.acos(Math.sqrt(1 / L));
    for (const side of [1, -1]) {
      const pts: Pt[] = [];
      for (let i = 0; i <= 40; i += 1) {
        const lat = -top + (2 * top * i) / 40;
        const r = L * R * Math.cos(lat) ** 2;
        pts.push([cx + side * r * Math.cos(lat), cy - r * Math.sin(lat)]);
      }
      paths.push(pts);
    }
  }
  return paths;
}

function along(path: readonly Pt[], u: number): Pt {
  const f = clamp(u, 0, 1) * (path.length - 1);
  const i = Math.min(Math.floor(f), path.length - 2);
  const k = f - i;
  return [path[i][0] + (path[i + 1][0] - path[i][0]) * k, path[i][1] + (path[i + 1][1] - path[i][1]) * k];
}

/* ---------- 指南针 ---------- */

const latName = (lat: number): string => (lat === 0 ? '赤道上' : `${lat > 0 ? '北' : '南'}纬 ${Math.abs(lat)}°`);
const dipAngle = (lat: number): number => deg(Math.atan(2 * Math.tan(rad(lat))));
const LATS = Array.from({ length: 17 }, (_, i) => 80 - i * 10);
const latOf = (s: State): number => LATS[s.lat];

export const compass: SimDef = {
  params: [
    { key: 'lat', label: '指南针放在', min: 0, max: 16, step: 1, value: 4, labels: LATS.map(latName) },
    { key: 'magnet', label: '旁边', min: 0, max: 1, step: 1, value: 0, labels: ['什么都没放', '放一块冰箱贴磁铁'] },
  ],
  animated: true,
  still: 2,
  draw(s, t) {
    const [cx, cy, R] = [165, 162, 92];
    const deg0 = latOf(s);
    const lat = rad(deg0);
    let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#cfe5f7" stroke="${INK}" stroke-width="3"/>`;
    out += `<path d="M${cx - 50} ${cy - 40} q30 -30 60 -10 t40 30 q-20 30 -50 20 t-50 -40z M${cx - 20} ${cy + 30} q30 -10 50 10 t10 40 q-30 10 -50 -10z" fill="#bcd9a0" opacity="0.9"/>`;
    for (const path of dipolePaths(cx, cy, R, [1.45, 2.05, 2.7])) {
      out += `<polyline points="${poly(path)}" fill="none" stroke="${FIELD}" stroke-width="2" stroke-dasharray="6 5"/>`;
      const mid = path[20];
      out += arrow(mid[0], mid[1] + 10, mid[0], mid[1] - 8, FIELD, 2.5);
    }
    out += `<line x1="${cx}" y1="${cy - R - 22}" x2="${cx}" y2="${cy + R + 22}" stroke="${INK}" stroke-width="1.5" stroke-dasharray="3 4"/>`;
    out += txt(cx, cy - R - 28, '北极', { size: 13, bold: true }) + txt(cx, cy + R + 38, '南极', { size: 13, bold: true });
    out += `<rect x="${cx - 9}" y="${cy - 46}" width="18" height="46" fill="${SPOLE}" stroke="${INK}" stroke-width="2" opacity="0.85"/><rect x="${cx - 9}" y="${cy}" width="18" height="46" fill="${NPOLE}" stroke="${INK}" stroke-width="2" opacity="0.85"/>`;
    out += txt(cx, cy - 26, 'S', { size: 13, bold: true, color: '#fff', plain: true }) + txt(cx, cy + 32, 'N', { size: 13, bold: true, color: '#fff', plain: true });
    const [px, py] = [cx + R * Math.cos(lat), cy - R * Math.sin(lat)];
    const [br, bl] = [-2 * Math.sin(lat), Math.cos(lat)];
    const field = Math.atan2(br * -Math.sin(lat) + bl * -Math.cos(lat), br * Math.cos(lat) + bl * -Math.sin(lat));
    out += `<circle cx="${n(px)}" cy="${n(py)}" r="15" fill="#fff" stroke="${INK}" stroke-width="2"/>` + needle(px, py, field, 12);
    out += `<line x1="${n(px + 16)}" y1="${n(py)}" x2="398" y2="150" stroke="${INK}" stroke-width="1.2" stroke-dasharray="3 3"/>`;

    out += `<rect x="398" y="40" width="150" height="240" rx="12" fill="#fffdf8" stroke="${INK}" stroke-width="2"/>`;
    out += txt(473, 62, '侧面看这个指南针', { size: 12, color: '#8b7a5c' });
    out += `<line x1="410" y1="210" x2="536" y2="210" stroke="#8b6b3d" stroke-width="4"/>`;
    out += txt(414, 232, '南', { size: 13, anchor: 'start' }) + txt(532, 232, '北', { size: 13, anchor: 'end' });
    const near = s.magnet === 1;
    let ang: number;
    if (near) {
      out += bar(408, 244, 64, 22, false);
      ang = Math.atan2(255 - 150, 418 - 473) + Math.sin(t * 9) * 0.03;
    } else if (Math.abs(deg0) >= 80) {
      ang = rad(90 * Math.sign(deg0)) + Math.sin(t * 2.2) * 0.9;
    } else {
      ang = rad(dipAngle(deg0)) + Math.sin(t * 5) * 0.03 * Math.exp(-t);
    }
    out += needle(473, 150, ang, 48);
    if (!near && Math.abs(deg0) >= 80) out += txt(473, 100, '晃来晃去', { size: 14, bold: true, color: HOT });
    out += txt(20, 300, latName(deg0), { size: 15, bold: true, anchor: 'start', color: BLUE });
    out += txt(20, 34, '地球像一块大磁铁', { size: 14, anchor: 'start', color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const lat = latOf(s);
    if (s.magnet === 1) return '旁边的磁铁比地球的磁场强得多：指南针的 N 极被它的 S 极拐跑了，不再指北';
    if (Math.abs(lat) >= 80) return `${latName(lat)}，已经挨着磁极：磁感线几乎是竖直的，水平的指南针找不到方向，晃来晃去不好用`;
    const dip = Math.round(Math.abs(dipAngle(lat)));
    if (lat === 0) return '赤道上：磁感线和地面平行，指南针的 N 极水平地指向北方（示意图把地磁轴和地轴画成了一条）';
    return `${latName(lat)}：指南针的 N 极顺着磁感线指向北方；能上下转的磁针还会${lat > 0 ? '往下' : '往上'}斜约 ${dip}°（示意图把地磁轴和地轴画成了一条）`;
  },
};

/* ---------- 磁化：哪些东西能被吸 ---------- */

const STUFF = [
  { name: '铁钉', color: IRON, magnetic: true },
  { name: '钢做的罐头盒', color: '#b8c0c8', magnetic: true },
  { name: '铝做的易拉罐', color: '#dfe3e8', magnetic: false },
  { name: '铜丝', color: '#d89a5f', magnetic: false },
] as const;

export const magnetize: SimDef = {
  params: [
    { key: 'stuff', label: '拿什么去试', min: 0, max: 3, step: 1, value: 0, labels: STUFF.map(x => x.name) },
    { key: 'near', label: '磁铁', min: 0, max: 1, step: 1, value: 1, labels: ['离得远', '凑近了'] },
  ],
  animated: true,
  still: 2,
  draw(s, t) {
    const stuff = STUFF[s.stuff];
    const near = s.near === 1;
    const pulled = near && stuff.magnetic;
    const x = pulled ? 330 - 140 * smooth(t / 0.8) : near ? 280 : 360;
    let out = bar(30, 130, 150, 60, false);
    for (let i = 0; i < 5; i += 1) {
      const yy = 110 + i * 25;
      out += `<path d="M180 160 Q${220 + i * 6} ${yy} ${n(Math.min(x, 300))} ${yy}" fill="none" stroke="${FIELD}" stroke-width="1.5" stroke-dasharray="4 5" opacity="${near ? 0.8 : 0.3}"/>`;
    }
    out += `<rect x="${n(x)}" y="110" width="170" height="100" rx="10" fill="${stuff.color}" stroke="${INK}" stroke-width="3"/>`;
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        const [gx, gy] = [x + 22 + c * 31, 132 + r * 28];
        if (stuff.magnetic) {
          const wild = noise(r * 5 + c + 7) * Math.PI * 2;
          const k = near ? smooth(t / 1.2) : 0;
          const a = wild + (Math.atan2(Math.sin(-wild), Math.cos(-wild))) * k;
          out += arrow(gx - 10 * Math.cos(a), gy - 10 * Math.sin(a), gx + 10 * Math.cos(a), gy + 10 * Math.sin(a), pulled ? NPOLE : INK, 2.5);
        } else {
          out += `<circle cx="${n(gx)}" cy="${n(gy)}" r="5" fill="#fff" stroke="#8b7a5c" stroke-width="1.5"/>`;
        }
      }
    }
    out += txt(x + 85, 236, stuff.name, { size: 15, bold: true });
    out += txt(20, 36, stuff.magnetic ? (pulled ? '小磁区排成一队：变成了临时的小磁铁' : '里面的小磁区方向乱糟糟') : '没有能排队的小磁区', { size: 15, anchor: 'start', bold: true, color: pulled ? NPOLE : INK });
    if (pulled && t > 0.8) out += txt(186, 104, '吸住了！', { size: 16, bold: true, color: HOT, anchor: 'start' });
    if (near && !stuff.magnetic) out += txt(x + 85, 290, '磁铁凑近了也吸不动', { size: 14, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const stuff = STUFF[s.stuff];
    if (stuff.magnetic) {
      return s.near
        ? `${stuff.name}里的小磁区一下子排成一队，它变成了一块临时的小磁铁，被磁铁吸了过去`
        : `${stuff.name}里有许多小磁区，平时方向乱七八糟，磁性互相抵消，所以它自己不吸东西`;
    }
    return `${stuff.name}也是金属，可它里面没有能排队的小磁区，${s.near ? '磁铁凑近了也吸不动' : '拿磁铁来试试看'}`;
  },
};

/* ---------- 电磁铁 ---------- */

const clipsLifted = (s: State): number => (s.core ? Math.min(12, Math.floor((s.amps * s.turns) / 8)) : 0);

export const coil: SimDef = {
  params: [
    { key: 'amps', label: '电流', min: 0, max: 3, step: 0.5, value: 1.5, unit: ' 安' },
    { key: 'turns', label: '线圈绕了', min: 10, max: 50, step: 10, value: 20, unit: ' 匝' },
    { key: 'core', label: '线圈里面', min: 0, max: 1, step: 1, value: 1, labels: ['空着', '插进一根铁芯'] },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const on = s.amps > 0;
    const clips = clipsLifted(s);
    const [cx, top, bottom] = [270, 60, 190];
    let out = '';
    if (on) {
      const k = clamp((s.amps * s.turns * (s.core ? 1 : 0.15)) / 150, 0.15, 1);
      for (let i = 1; i <= 3; i += 1) out += `<ellipse cx="${cx}" cy="${(top + bottom) / 2}" rx="${40 + i * 26}" ry="${80 + i * 18}" fill="none" stroke="${FIELD}" stroke-width="2" stroke-dasharray="6 5" opacity="${n(k * (1.1 - i * 0.25))}"/>`;
    }
    out += s.core
      ? `<rect x="${cx - 18}" y="${top - 8}" width="36" height="${bottom - top + 16}" rx="4" fill="${IRON}" stroke="${INK}" stroke-width="2.5"/>`
      : `<rect x="${cx - 18}" y="${top - 8}" width="36" height="${bottom - top + 16}" rx="4" fill="#fffdf8" stroke="#c9bfae" stroke-width="2" stroke-dasharray="4 4"/>`;
    const loops = s.turns / 5;
    for (let i = 0; i < loops; i += 1) {
      const y = top + ((bottom - top) * (i + 0.5)) / loops;
      out += `<path d="M${cx - 26} ${n(y)} Q${cx} ${n(y + 9)} ${cx + 26} ${n(y - 2)}" fill="none" stroke="${COPPER}" stroke-width="4" stroke-linecap="round"/>`;
    }
    out += `<path d="M${cx - 26} ${top} H90 V110 M${cx - 26} ${bottom} H90 V150" fill="none" stroke="${INK}" stroke-width="3"/>`;
    out += `<rect x="66" y="110" width="48" height="40" rx="6" fill="#ffe8a3" stroke="${INK}" stroke-width="2.5"/>` + txt(90, 136, on ? '通电' : '断电', { size: 13, bold: true, color: on ? HOT : INK });
    if (on) {
      for (let k = 0; k < 4; k += 1) {
        const u = (t * 0.6 * s.amps + k / 4) % 1;
        const y = 110 - u * 50;
        out += `<circle cx="90" cy="${n(Math.max(y, top))}" r="4" fill="#ffd43b" stroke="${INK}"/>`;
      }
    }
    const chains = clips > 6 ? [cx - 14, cx + 14] : [cx];
    for (let i = 0; i < clips; i += 1) {
      const x = chains[i % chains.length];
      const y = bottom + 12 + Math.floor(i / chains.length) * 15;
      out += `<rect x="${x - 5}" y="${y}" width="10" height="14" rx="5" fill="none" stroke="#6c757d" stroke-width="2.5"/>`;
    }
    const dropped = 12 - clips;
    for (let i = 0; i < dropped; i += 1) out += `<rect x="${n(170 + noise(i + 3) * 200)}" y="${n(292 + noise(i + 9) * 10)}" width="14" height="9" rx="4" fill="none" stroke="#6c757d" stroke-width="2.5" transform="rotate(${n(noise(i) * 60 - 30)} ${n(177 + noise(i + 3) * 200)} 296)"/>`;
    out += `<line x1="150" y1="306" x2="400" y2="306" stroke="#8b6b3d" stroke-width="3"/>`;
    const strength = s.amps * s.turns * (s.core ? 1 : 0.02);
    out += txt(430, 70, '磁性强弱', { size: 14, bold: true });
    out += `<rect x="430" y="80" width="26" height="200" rx="6" fill="#f1ece2" stroke="${INK}" stroke-width="2"/>`;
    const h = clamp(strength / 150, 0, 1) * 196;
    out += `<rect x="432" y="${n(278 - h)}" width="22" height="${n(h)}" rx="4" fill="${NPOLE}"/>`;
    out += txt(470, 290, `吸起 ${clips} 枚`, { size: 15, bold: true, anchor: 'start', color: clips ? HOT : INK });
    return out;
  },
  readout(s) {
    const clips = clipsLifted(s);
    if (!s.amps) return '断电：电流一停，磁性立刻消失，回形针全掉下来——废品站就是这样“放手”的';
    if (!s.core) return `${s.amps} 安、${s.turns} 匝的空线圈也有磁性，可是太弱了，一枚回形针也吸不起来；插进铁芯试试`;
    return `${s.amps} 安 × ${s.turns} 匝，再插上铁芯：吸起 ${clips} 枚回形针。电流越大、匝数越多，磁性越强`;
  },
};

/* ---------- 电动机（从上往下看） ---------- */

function motorAngle(s: State, t: number): number {
  if (!s.amps) return Math.PI;
  const sign = s.dir ? -1 : 1;
  if (s.comm) return Math.PI + sign * 2 * Math.PI * 0.35 * s.amps * t;
  const eq = sign > 0 ? Math.PI * 1.5 : Math.PI * 0.5;
  return eq + (Math.PI - eq) * Math.exp(-t / 1.4) * Math.cos(4 * t);
}

export const motor: SimDef = {
  params: [
    { key: 'amps', label: '电流', min: 0, max: 3, step: 0.5, value: 1.5, unit: ' 安' },
    { key: 'dir', label: '电池', min: 0, max: 1, step: 1, value: 0, labels: ['正着接', '反过来接'] },
    { key: 'comm', label: '换向器', min: 0, max: 1, step: 1, value: 1, labels: ['拆掉', '装着'] },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const [cx, cy, R] = [280, 165, 90];
    let out = `<rect x="40" y="70" width="80" height="190" rx="8" fill="${NPOLE}" stroke="${INK}" stroke-width="3"/>` + txt(80, 175, 'N', { size: 30, bold: true, color: '#fff', plain: true });
    out += `<rect x="440" y="70" width="80" height="190" rx="8" fill="${SPOLE}" stroke="${INK}" stroke-width="3"/>` + txt(480, 175, 'S', { size: 30, bold: true, color: '#fff', plain: true });
    for (let i = 0; i < 4; i += 1) {
      const y = 95 + i * 47;
      out += `<line x1="128" y1="${y}" x2="432" y2="${y}" stroke="${FIELD}" stroke-width="1.5" stroke-dasharray="6 6"/>` + arrow(410, y, 428, y, FIELD, 2);
    }
    const phi = motorAngle(s, t);
    const a: Pt = [cx + R * Math.cos(phi), cy + R * Math.sin(phi)];
    const b: Pt = [cx - R * Math.cos(phi), cy - R * Math.sin(phi)];
    out += `<line x1="${n(a[0])}" y1="${n(a[1])}" x2="${n(b[0])}" y2="${n(b[1])}" stroke="${COPPER}" stroke-width="8" stroke-linecap="round"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
    const on = s.amps > 0;
    const sign = s.dir ? -1 : 1;
    const ends: [Pt, number][] = [[a, 1], [b, -1]];
    for (const [p, tag] of ends) {
      const flow = (s.comm ? (p[0] < cx ? 1 : -1) : tag) * sign;
      out += `<circle cx="${n(p[0])}" cy="${n(p[1])}" r="13" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
      if (on) {
        out += flow > 0
          ? `<circle cx="${n(p[0])}" cy="${n(p[1])}" r="4" fill="${INK}"/>`
          : `<path d="M${n(p[0] - 6)} ${n(p[1] - 6)} L${n(p[0] + 6)} ${n(p[1] + 6)} M${n(p[0] + 6)} ${n(p[1] - 6)} L${n(p[0] - 6)} ${n(p[1] + 6)}" stroke="${INK}" stroke-width="2.5"/>`;
        const len = 22 + s.amps * 8;
        out += arrow(p[0], p[1] + (flow > 0 ? -16 : 16), p[0], p[1] + (flow > 0 ? -16 - len : 16 + len), HOT, 4);
      }
    }
    out += txt(280, 34, '从上往下看：线圈两边的电流 ⊙ 向外、⊗ 向里', { size: 13, color: '#8b7a5c' });
    if (on) out += txt(280, 306, s.comm ? (s.dir ? '逆时针转' : '顺时针转') : '转到竖直就被拉住', { size: 16, bold: true, color: HOT });
    return out;
  },
  readout(s) {
    if (!s.amps) return '没有电流：线圈不受力，一动不动';
    if (!s.comm) return '拆掉换向器：电流一直朝一个方向，线圈转到竖直的位置就被拉住，来回晃几下就停了';
    return `${s.amps} 安：磁场把线圈一边往上推、一边往下推，线圈就转起来；换向器每半圈把电流掉个头，所以一直${s.dir ? '逆时针' : '顺时针'}转。电池反过来接，就倒着转；电流越大转得越快`;
  },
};

/* ---------- 发电机 ---------- */

const peakVolts = (s: State): number => s.speed * (s.strong ? 2 : 1);

export const generator: SimDef = {
  params: [
    { key: 'speed', label: '摇得多快', min: 0, max: 3, step: 0.5, value: 1.5, unit: ' 圈/秒' },
    { key: 'strong', label: '磁铁', min: 0, max: 1, step: 1, value: 0, labels: ['普通磁铁', '更强的磁铁'] },
  ],
  animated: true,
  still: 0.3,
  draw(s, t) {
    const [cx, cy] = [160, 165];
    const phi = 2 * Math.PI * s.speed * t;
    const peak = peakVolts(s);
    const u = peak * Math.sin(phi);
    let out = '';
    for (const x of [48, 252]) {
      out += `<rect x="${x}" y="115" width="40" height="100" rx="6" fill="#f3e3cf" stroke="${INK}" stroke-width="2.5"/>`;
      for (let i = 0; i < 6; i += 1) out += `<line x1="${x}" y1="${123 + i * 16}" x2="${x + 40}" y2="${127 + i * 16}" stroke="${COPPER}" stroke-width="4"/>`;
    }
    out += `<circle cx="${cx}" cy="${cy}" r="82" fill="none" stroke="#c9bfae" stroke-width="2" stroke-dasharray="4 6"/>`;
    const [dx, dy] = [Math.cos(phi) * 70, Math.sin(phi) * 70];
    const thick = 16;
    const [px, py] = [-Math.sin(phi) * thick, Math.cos(phi) * thick];
    out += `<polygon points="${poly([[cx + px, cy + py], [cx + dx + px, cy + dy + py], [cx + dx - px, cy + dy - py], [cx - px, cy - py]])}" fill="${NPOLE}" stroke="${INK}" stroke-width="2"/>`;
    out += `<polygon points="${poly([[cx + px, cy + py], [cx - dx + px, cy - dy + py], [cx - dx - px, cy - dy - py], [cx - px, cy - py]])}" fill="${SPOLE}" stroke="${INK}" stroke-width="2"/>`;
    out += txt(cx + dx * 0.7, cy + dy * 0.7 + 5, 'N', { size: 14, bold: true, color: '#fff', plain: true }) + txt(cx - dx * 0.7, cy - dy * 0.7 + 5, 'S', { size: 14, bold: true, color: '#fff', plain: true });
    out += `<circle cx="${cx}" cy="${cy}" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    out += `<path d="M68 115 V70 H420 V93 M272 215 V240 H330 V130 H406" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
    const glow = clamp(Math.abs(u) / 4, 0, 1);
    out += `<circle cx="420" cy="110" r="${n(20 + glow * 26)}" fill="#ffe066" opacity="${n(glow * 0.6)}"/>`;
    out += `<circle cx="420" cy="110" r="17" fill="${glow > 0.1 ? '#fff3b0' : '#e9e4da'}" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<path d="M412 114 Q420 98 428 114" fill="none" stroke="${glow > 0.1 ? HOT : '#8b7a5c'}" stroke-width="2.5"/>`;
    const [gx, gy, gw, gh] = [355, 238, 185, 70];
    out += `<line x1="${gx}" y1="${gy}" x2="${gx + gw}" y2="${gy}" stroke="${INK}" stroke-width="1.5"/><line x1="${gx}" y1="${gy - gh / 2 - 4}" x2="${gx}" y2="${gy + gh / 2 + 4}" stroke="${INK}" stroke-width="1.5"/>`;
    const pts: Pt[] = [];
    for (let i = 0; i <= 60; i += 1) {
      const tt = t - 2 + (2 * i) / 60;
      pts.push([gx + (gw * i) / 60, gy - (peak * Math.sin(2 * Math.PI * s.speed * tt) * (gh / 2)) / 6]);
    }
    out += `<polyline points="${poly(pts)}" fill="none" stroke="${BLUE}" stroke-width="2.5"/>`;
    out += txt(gx + 4, gy - gh / 2 - 8, '电压', { size: 12, anchor: 'start' }) + txt(gx + gw, gy + gh / 2 + 4, '时间 →', { size: 12, anchor: 'end' });
    out += txt(20, 34, s.speed ? `最高约 ${r1(peak)} 伏` : '不转就没有电', { size: 16, bold: true, anchor: 'start', color: s.speed ? HOT : INK });
    return out;
  },
  readout(s) {
    if (!s.speed) return '不摇的时候，穿过线圈的磁场不变，线圈里就没有电流，灯不亮';
    return `每秒 ${s.speed} 圈：穿过线圈的磁场一会儿朝这边、一会儿朝那边，线圈里就生出来回变的电流，电压最高约 ${r1(peakVolts(s))} 伏。摇得越快、磁铁越强，电压越高`;
  },
};

/* ---------- 喇叭 ---------- */

const TONES = [
  { name: '低音', hz: 100, vis: 1.2, wave: 230 },
  { name: '中音', hz: 400, vis: 2.4, wave: 115 },
  { name: '高音', hz: 1600, vis: 4.8, wave: 58 },
] as const;

export const speaker: SimDef = {
  params: [
    { key: 'tone', label: '放什么音', min: 0, max: 2, step: 1, value: 1, labels: TONES.map(x => `${x.name}（每秒 ${x.hz} 次）`) },
    { key: 'vol', label: '音量', min: 0, max: 3, step: 1, value: 2, unit: ' 档' },
  ],
  animated: true,
  still: 0.2,
  draw(s, t) {
    const tone = TONES[s.tone];
    const phase = 2 * Math.PI * tone.vis * t;
    const dx = s.vol * 5 * Math.sin(phase);
    let out = `<rect x="40" y="110" width="70" height="100" rx="6" fill="#6c757d" stroke="${INK}" stroke-width="2.5"/>` + txt(75, 232, '磁铁', { size: 13 });
    out += `<rect x="${n(112 + dx)}" y="135" width="30" height="50" rx="4" fill="${COPPER}" stroke="${INK}" stroke-width="2"/>`;
    for (let i = 0; i < 4; i += 1) out += `<line x1="${n(114 + dx)}" y1="${142 + i * 11}" x2="${n(140 + dx)}" y2="${142 + i * 11}" stroke="#8a4f1d" stroke-width="2"/>`;
    out += `<polygon points="${poly([[142 + dx, 140], [215 + dx, 55], [228 + dx, 55], [228 + dx, 265], [215 + dx, 265], [142 + dx, 180]])}" fill="#e8dcc6" stroke="${INK}" stroke-width="2.5"/>`;
    out += txt(178, 290, '纸盆', { size: 13 }) + txt(126, 230, '线圈', { size: 12 });
    for (let c = 0; c < 34; c += 1) {
      const x0 = 250 + c * 9;
      const x = x0 + s.vol * 2.5 * Math.sin(phase - (2 * Math.PI * (x0 - 250)) / tone.wave);
      for (let r = 0; r < 9; r += 1) out += `<circle cx="${n(x)}" cy="${78 + r * 21}" r="2.6" fill="#8fb8d8"/>`;
    }
    out += txt(400, 286, s.vol ? '空气一疏一密地传出去，就是声音' : '纸盆不动，就没有声音', { size: 13, color: '#2f7fbf' });
    const [gx, gy] = [250, 34];
    const pts: Pt[] = [];
    for (let i = 0; i <= 50; i += 1) pts.push([gx + i * 5.6, gy + 6 - s.vol * 3.5 * Math.sin(2 * Math.PI * tone.vis * (t - (50 - i) / 50))]);
    out += txt(gx - 8, gy + 10, '电流', { size: 12, anchor: 'end' }) + `<polyline points="${poly(pts)}" fill="none" stroke="${HOT}" stroke-width="2"/>`;
    return out;
  },
  readout(s) {
    const tone = TONES[s.tone];
    if (!s.vol) return '没有电流：线圈不受力，纸盆不动，喇叭不响';
    return `${tone.name}：电流每秒来回 ${tone.hz} 次，线圈在磁铁旁边被推出去、拉回来，带着纸盆每秒振 ${tone.hz} 次。电流越大，纸盆振得越猛，声音越响（图里放慢了）`;
  },
};

/* ---------- 电磁炉 ---------- */

const POTS = [
  { name: '铁锅', color: '#4a4f57', heat: 1 },
  { name: '铝锅', color: '#cfd5dc', heat: 0 },
  { name: '陶瓷碗', color: '#f1e6d2', heat: 0 },
] as const;

export const eddy: SimDef = {
  params: [
    { key: 'pot', label: '放上去的是', min: 0, max: 2, step: 1, value: 0, labels: POTS.map(x => x.name) },
    { key: 'lift', label: '锅', min: 0, max: 1, step: 1, value: 0, labels: ['放在面板上', '端起来离开面板'] },
  ],
  animated: true,
  still: 3,
  draw(s, t) {
    const pot = POTS[s.pot];
    const up = s.lift === 1;
    const heating = pot.heat > 0 && !up;
    const temp = heating ? Math.min(95, 20 + t * 18) : 20;
    const potY = up ? 40 : 120;
    let out = `<rect x="70" y="216" width="420" height="84" rx="10" fill="#3b3f46" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<rect x="80" y="202" width="400" height="16" rx="4" fill="#d6e2ea" stroke="${INK}" stroke-width="2"/>`;
    for (let i = 0; i < 4; i += 1) out += `<ellipse cx="280" cy="252" rx="${40 + i * 30}" ry="${10 + i * 6}" fill="none" stroke="${COPPER}" stroke-width="4"/>`;
    const flip = Math.sin(2 * Math.PI * 1.2 * t) > 0;
    for (const x of [200, 280, 360]) {
      const top = up ? 150 : potY + 70;
      out += `<line x1="${x}" y1="236" x2="${x}" y2="${top}" stroke="${FIELD}" stroke-width="2" stroke-dasharray="5 5"/>`;
      out += flip ? arrow(x + 14, 244, x + 14, 222, '#9ec5f0', 2.5) : arrow(x + 14, 222, x + 14, 244, '#9ec5f0', 2.5);
    }
    const hot = (temp - 20) / 75;
    const color = heating ? `rgb(${n(74 + hot * 150)},${n(79 - hot * 20)},${n(87 - hot * 40)})` : pot.color;
    if (s.pot === 2) {
      out += `<path d="M170 ${potY} H390 Q385 ${potY + 75} 330 ${potY + 80} H230 Q175 ${potY + 75} 170 ${potY}z" fill="${color}" stroke="${INK}" stroke-width="3"/>`;
    } else {
      out += `<rect x="160" y="${potY}" width="240" height="80" rx="10" fill="${color}" stroke="${INK}" stroke-width="3"/>`;
      out += `<rect x="400" y="${potY + 14}" width="70" height="14" rx="6" fill="#5d4e37"/>`;
    }
    if (heating) {
      for (let i = 0; i < 3; i += 1) {
        const x = 200 + i * 80;
        out += `<ellipse cx="${x}" cy="${potY + 70}" rx="26" ry="7" fill="none" stroke="#ffd43b" stroke-width="2.5" stroke-dasharray="6 4" stroke-dashoffset="${n((flip ? 1 : -1) * t * 30)}"/>`;
      }
      if (t > 2) {
        for (let i = 0; i < 3; i += 1) {
          const p = ((t * 0.5 + i / 3) % 1);
          out += `<path d="M${230 + i * 50} ${n(potY - 6 - p * 30)} q8 -10 0 -20" fill="none" stroke="#c9d6df" stroke-width="3" opacity="${n(1 - p)}"/>`;
        }
      }
    }
    out += txt(20, 34, `锅约 ${Math.round(temp)} ℃`, { size: 16, bold: true, anchor: 'start', color: heating ? HOT : INK });
    out += txt(540, 34, heating ? '锅底自己在发热' : up ? '锅一离开就不热了' : '没检测到合适的锅', { size: 14, anchor: 'end', bold: true, color: heating ? HOT : '#8b7a5c' });
    out += txt(470, 214, '面板', { size: 12, anchor: 'start', color: '#5d6b75' });
    return out;
  },
  readout(s) {
    const pot = POTS[s.pot];
    if (s.lift) return `把${pot.name}端起来：锅离开了变化的磁场，锅底不再生热，立刻就不热了`;
    if (pot.heat) return '铁锅：面板下面的线圈产生来回变化的磁场，在锅底激起一圈圈涡流，锅底自己发热；面板只是被热锅捂热';
    if (s.pot === 1) return '铝锅：铝不吸磁铁、电阻又小，家用电磁炉一般热不起来，会提示没放锅（锅底能吸住磁铁才合适）';
    return '陶瓷碗：不导电，变化的磁场在里面激不起涡流，一点也不热';
  },
};

/* ---------- 极光 ---------- */

const WINDS = [
  { name: '太阳风平静', L: 3.2, color: '#51cf66' },
  { name: '太阳风变强', L: 2.4, color: '#51cf66' },
  { name: '超大地磁暴', L: 1.65, color: '#ff6b81' },
] as const;

export const aurora: SimDef = {
  params: [
    { key: 'wind', label: '太阳', min: 0, max: 2, step: 1, value: 0, labels: WINDS.map(x => x.name) },
  ],
  animated: true,
  still: 2,
  draw(s, t) {
    const wind = WINDS[s.wind];
    const [cx, cy, R] = [370, 160, 52];
    let out = `<circle cx="-30" cy="160" r="95" fill="#ffd43b" opacity="0.35"/><circle cx="-30" cy="160" r="75" fill="#ffb703" stroke="${HOT}" stroke-width="3"/>`;
    out += txt(14, 40, '太阳', { size: 14, bold: true, anchor: 'start' });
    const lines = dipolePaths(cx, cy, R, [1.65, 2.4, 3.2]);
    for (const path of lines) out += `<polyline points="${poly(path.filter(([x, y]) => x > 60 && y > -20 && y < H + 20))}" fill="none" stroke="${FIELD}" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.8"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#cfe5f7" stroke="${INK}" stroke-width="3"/>`;
    out += `<path d="M${cx - 30} ${cy - 20} q20 -20 40 -5 t25 20 q-15 20 -35 12z" fill="#bcd9a0"/>`;
    const count = [5, 8, 12][s.wind];
    for (let i = 0; i < count; i += 1) {
      const u = (t * (0.35 + s.wind * 0.12) + i / count) % 1;
      const y = 70 + noise(i + 1) * 180;
      out += `<circle cx="${n(70 + u * 120)}" cy="${n(y)}" r="3" fill="#ffd43b" stroke="${INK}" stroke-width="0.8"/>`;
    }
    const top = Math.acos(Math.sqrt(1 / wind.L));
    for (const side of [1, -1]) {
      const path = dipolePaths(cx, cy, R, [wind.L])[side > 0 ? 0 : 1];
      for (let k = 0; k < 3; k += 1) {
        const u = (t * 0.5 + k / 3) % 1;
        for (const [a, b] of [[0.5, 1], [0.5, 0]] as const) {
          const [x, y] = along(path, a + (b - a) * u);
          out += `<circle cx="${n(x)}" cy="${n(y)}" r="3.2" fill="#ffd43b" stroke="${INK}" stroke-width="0.8"/>`;
        }
      }
      for (const pole of [1, -1]) {
        const [x, y] = [cx + side * R * Math.cos(top), cy - pole * R * Math.sin(top)];
        const flick = 0.6 + 0.4 * Math.sin(t * 5 + side + pole);
        out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(11 + s.wind * 3)}" fill="${wind.color}" opacity="${n(0.5 * flick)}"/><circle cx="${n(x)}" cy="${n(y)}" r="5" fill="${wind.color}"/>`;
      }
    }
    const bj = rad(40);
    const [bx, by] = [cx + R * Math.cos(bj), cy - R * Math.sin(bj)];
    out += `<circle cx="${n(bx)}" cy="${n(by)}" r="4" fill="${INK}"/><line x1="${n(bx + 4)}" y1="${n(by - 3)}" x2="${n(bx + 40)}" y2="${n(by - 30)}" stroke="${INK}" stroke-width="1"/>` + txt(bx + 44, by - 32, '北京', { size: 12, anchor: 'start', bold: true });
    out += txt(cx, 306, wind.name, { size: 15, bold: true, color: s.wind === 2 ? HOT : BLUE });
    return out;
  },
  readout(s) {
    if (s.wind === 2) return '超大地磁暴：被磁场引下来的粒子落到了离磁极远得多的地方，2024 年 5 月这样的一次，北京郊外也拍到了红色的极光';
    if (s.wind === 1) return '太阳风变强：更多带电粒子顺着磁感线冲进大气，极光更亮，也往离磁极远一点的地方扩';
    return '太阳风平静：带电粒子被地球磁场挡在外面，只有一部分顺着磁感线溜到南北两极附近，撞得高空的空气发光，就是极光';
  },
};

const COIL_GAPS = [
  { name: '贴着放正（约 3 毫米）', dy: 0, link: 1 },
  { name: '垫高一点（约 12 毫米）', dy: 28, link: 0.42 },
  { name: '拿远了（40 毫米）', dy: 78, link: 0 },
] as const;
const BETWEEN_ITEMS = ['什么都没夹', '薄塑料手机壳', '一枚金属硬币'] as const;

export const wirelessCoil: SimDef = {
  params: [
    { key: 'gap', label: '手机离底座', min: 0, max: 2, step: 1, value: 0, labels: COIL_GAPS.map(g => g.name) },
    { key: 'between', label: '中间夹着', min: 0, max: 2, step: 1, value: 0, labels: [...BETWEEN_ITEMS] },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const g = COIL_GAPS[clamp(Math.round(s.gap), 0, 2)];
    const b = clamp(Math.round(s.between), 0, 2);
    const metal = b === 2 && g.dy < 60;
    const watts = metal ? 0 : Math.round(15 * g.link);
    const baseY = 232;
    const phoneY = 164 - g.dy;
    const flip = Math.sin(t * 7);
    let out = `<rect x="136" y="${baseY}" width="248" height="36" rx="14" fill="#dee2e6" stroke="${INK}" stroke-width="2.2"/>`;
    for (let i = 0; i < 6; i += 1) out += `<ellipse cx="${200 + i * 24}" cy="${baseY + 12}" rx="10" ry="5" fill="${COPPER}" stroke="${INK}" stroke-width="1.2"/>`;
    out += txt(260, baseY + 56, '充电底座：发射线圈（通快速来回变的交流电）', { size: 12, color: '#8b7a5c' });

    if (!metal || Math.floor(t * 2) % 2 === 0) {
      for (const side of [-1, 1]) {
        const reach = 74;
        const cx = 260 + side * 46;
        out += `<ellipse cx="${cx}" cy="${baseY - 26}" rx="34" ry="${reach}" fill="none" stroke="${FIELD}" stroke-width="2.2" stroke-dasharray="6 4" opacity="${n(0.45 + 0.45 * Math.abs(flip))}"/>`;
      }
      const dirUp = flip >= 0;
      out += arrow(260, dirUp ? baseY - 8 : baseY - 68, 260, dirUp ? baseY - 68 : baseY - 8, BLUE, 3.5);
    }

    if (b === 1) {
      out += `<rect x="152" y="${phoneY + 34}" width="216" height="8" rx="4" fill="#a5d8ff" opacity="0.7" stroke="${BLUE}" stroke-width="1.2"/>`;
      out += txt(438, phoneY + 42, '塑料壳：磁场照穿不误', { size: 12, color: BLUE });
    } else if (b === 2) {
      out += `<ellipse cx="260" cy="${baseY - 12}" rx="34" ry="8" fill="#ffd43b" stroke="${HOT}" stroke-width="2.2"/>`;
      if (metal) {
        out += `<ellipse cx="260" cy="${baseY - 12}" rx="22" ry="4.5" fill="none" stroke="${HOT}" stroke-width="2" stroke-dasharray="4 3"/>`;
        out += txt(444, baseY - 8, '硬币里激起涡流发烫！', { size: 12.5, bold: true, color: HOT });
      }
    }

    out += `<rect x="148" y="${phoneY}" width="224" height="32" rx="12" fill="#343a40" stroke="${INK}" stroke-width="2"/>`;
    for (let i = 0; i < 6; i += 1) out += `<ellipse cx="${200 + i * 24}" cy="${phoneY + 22}" rx="10" ry="4.5" fill="${COPPER}"/>`;
    out += `<rect x="420" y="76" width="118" height="68" rx="12" fill="#f7efe1" stroke="#dfcfb5" stroke-width="1.5"/>`;
    out += txt(479, 100, '充电功率', { size: 12, color: '#8b7a5c' });
    out += txt(479, 128, metal ? '保护断电' : `${watts} 瓦`, { size: 18, bold: true, color: watts > 0 ? BLUE : HOT });
    if (watts > 0) {
      for (let k = 0; k < 4; k += 1) {
        const x = 186 + ((t * 65 + k * 36) % 144);
        out += `<circle cx="${n(x)}" cy="${phoneY + 11}" r="3.2" fill="#8ce99a"/>`;
      }
    }
    const headline = metal
      ? '夹了金属硬币：磁场在硬币里转出涡流生热，底座立刻停充保护'
      : watts > 0 ? '没有电火花跳过空气！是来回变化的磁场隔空“晃”出了电流' : '拿得太远：磁感线够不着手机里的接收线圈，充不上电';
    out += txt(W / 2, 28, headline, { size: 13.5, bold: true, color: watts > 0 ? BLUE : HOT });
    return out;
  },
  readout(s) {
    const g = clamp(Math.round(s.gap), 0, 2);
    const b = clamp(Math.round(s.between), 0, 2);
    if (b === 2 && g < 2) return '中间夹了金属硬币或钥匙：交变磁场在金属片里激起一圈圈涡流（跟电磁炉热锅一个道理），硬币很快发烫，合格充电器会检测到异物并自动断电';
    if (g === 2) return '手机拿远到 40 毫米：底座线圈的磁场散开了，几乎穿不过手机背面的接收线圈，感应不出电流（0 瓦）';
    const shell = b === 1 ? '隔着几毫米厚的塑料或木头壳，磁场照样穿过；' : '';
    return `${shell}${g === 0 ? '两只线圈贴近对齐，穿过接收线圈的磁场变化最强，充电功率约 15 瓦' : '稍微垫高一点，穿过去的磁感线少了一半多，充电变慢到约 6 瓦'}`;
  },
};

