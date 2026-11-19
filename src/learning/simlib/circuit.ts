import { W, H, INK, HOT, BLUE, n, r1, r2, clamp, noise, txt, poly, type State, type SimDef } from './kit';

/* ---------------- 电与磁 ---------------- */

const staticVolts = (s: State): number => s.steps * 0.75 * Math.exp(-(s.humid - 20) / 20);

export const staticShock: SimDef = {
  params: [
    { key: 'steps', label: '在地毯上走了', min: 0, max: 20, step: 2, value: 10, unit: ' 步' },
    { key: 'humid', label: '空气湿度', min: 20, max: 80, step: 10, value: 30, unit: '%' },
  ],
  animated: true,
  still: 0.05,
  draw(s, t) {
    const v = staticVolts(s);
    const shock = v >= 3;
    let out = `<rect x="0" y="272" width="${W}" height="48" fill="#d9a3a3"/>`;
    for (let x = 0; x < W; x += 16) out += `<line x1="${x}" y1="276" x2="${x + 8}" y2="292" stroke="#c48686" stroke-width="2"/>`;
    out += `<rect x="410" y="60" width="110" height="212" rx="6" fill="#c8955b" stroke="${INK}" stroke-width="3"/><circle cx="426" cy="176" r="10" fill="#d8dee6" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<text x="180" y="250" font-size="120" text-anchor="middle">🧒</text>`;
    out += `<line x1="226" y1="176" x2="300" y2="176" stroke="#f4c7a1" stroke-width="14" stroke-linecap="round"/>`;
    const charges = Math.min(Math.round(v * 2), 32);
    for (let i = 0; i < charges; i += 1) {
      const a = noise(i * 3 + 1) * Math.PI * 2;
      const r = 50 + noise(i * 3 + 2) * 36;
      const x = 180 + Math.cos(a) * r * 0.8 + Math.sin(t * 3 + i) * 2;
      const y = 180 + Math.sin(a) * r;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="8" fill="#fff" stroke="${BLUE}" stroke-width="2"/><line x1="${n(x - 4)}" y1="${n(y)}" x2="${n(x + 4)}" y2="${n(y)}" stroke="${BLUE}" stroke-width="2.5"/>`;
    }
    if (shock) {
      const on = (t % 1.4) < 0.18;
      if (on) {
        const zig: [number, number][] = Array.from({ length: 7 }, (_, i) => [306 + i * 18, 176 + (i % 2 ? -10 : 10) * (i > 0 && i < 6 ? 1 : 0)]);
        out += `<polyline points="${poly(zig)}" fill="none" stroke="#ffd43b" stroke-width="6" stroke-linejoin="round"/><polyline points="${poly(zig)}" fill="none" stroke="#fff" stroke-width="2"/>`;
        out += txt(360, 150, '啪！', { size: 26, bold: true, color: HOT });
      }
    } else if (s.humid >= 50) {
      for (let i = 0; i < 6; i += 1) {
        const p = ((t * 0.4 + i / 6) % 1);
        out += `<circle cx="${n(180 + Math.cos(i) * (60 + p * 120))}" cy="${n(170 - p * 120)}" r="4" fill="#8fb8d8" opacity="${n(1 - p)}"/>`;
      }
      out += txt(180, 40, '潮湿的空气把电荷悄悄带走了', { size: 14, color: '#2f7fbf' });
    }
    out += txt(W - 20, 30, `约 ${r1(v)} 千伏`, { anchor: 'end', size: 20, bold: true, color: shock ? HOT : INK });
    return out;
  },
  readout(s) {
    const v = staticVolts(s);
    return v >= 3
      ? `身上攒了约 ${r1(v)} 千伏的静电：手指快碰到门把手时，电荷一下冲过去，“啪”地电你一下`
      : `身上只有约 ${r1(v)} 千伏：${s.humid >= 50 ? '空气潮湿，电荷攒不住' : '走得还不够多'}，碰门把手不太会觉得被电`;
  },
};

type Pt = [number, number];

/** 顺着折线流动的电荷小圆点；speed 是每秒走多少像素，gap 是点和点的间距 */
function flowDots(path: readonly Pt[], t: number, speed: number, gap: number, color = '#ffd43b'): string {
  const lengths = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]));
  const total = lengths.reduce((a, b) => a + b, 0);
  const dots = Math.max(1, Math.round(total / gap));
  let out = '';
  for (let k = 0; k < dots; k += 1) {
    let d = (((t * speed + (k * total) / dots) % total) + total) % total;
    let seg = 0;
    while (seg < lengths.length - 1 && d > lengths[seg]) { d -= lengths[seg]; seg += 1; }
    const [a, b] = [path[seg], path[seg + 1]];
    const u = lengths[seg] ? d / lengths[seg] : 0;
    out += `<circle cx="${n(a[0] + (b[0] - a[0]) * u)}" cy="${n(a[1] + (b[1] - a[1]) * u)}" r="4.5" fill="${color}" stroke="${INK}" stroke-width="1"/>`;
  }
  return out;
}

export const circuit: SimDef = {
  params: [
    { key: 'mode', label: '三盏灯怎么接', min: 0, max: 1, step: 1, value: 1, labels: ['串联：排成一条路', '并联：各走各的路'] },
    { key: 'broken', label: '灯泡', min: 0, max: 1, step: 1, value: 1, labels: ['三盏都好', '中间那盏坏了'] },
  ],
  animated: true,
  still: 0.3,
  draw(s, t) {
    const parallel = s.mode === 1;
    const broken = s.broken === 1;
    const [left, right, top, bottom] = [70, 500, 70, 270];
    const bulbs: Pt[] = parallel ? [[200, 170], [320, 170], [440, 170]] : [[180, top], [290, top], [400, top]];
    const lit = bulbs.map((_, i) => (parallel ? !(broken && i === 1) : !broken));
    let out = '';
    const wires = parallel
      ? `M${left} 140 V${top} H440 M${left} 220 V${bottom} H440 ${bulbs.map(([x]) => `M${x} ${top} V${bottom}`).join(' ')}`
      : `M${left} 140 V${top} H${right} V${bottom} H${left} V220`;
    out += `<path d="${wires}" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    out += `<rect x="${left - 22}" y="140" width="44" height="80" rx="8" fill="#ffe8a3" stroke="${INK}" stroke-width="3"/>`;
    out += txt(left, 160, '+', { size: 18, bold: true }) + txt(left, 212, '−', { size: 18, bold: true }) + txt(left, 186, '电池', { size: 11 });
    const paths: Pt[][] = parallel
      ? bulbs.map(([x], i) => (lit[i] ? [[left, 140], [left, top], [x, top], [x, bottom], [left, bottom], [left, 220]] as Pt[] : [])).filter(p => p.length)
      : lit[0] ? [[[left, 140], [left, top], [right, top], [right, bottom], [left, bottom], [left, 220]]] : [];
    for (const path of paths) out += flowDots(path, t, 80, 45);
    bulbs.forEach(([x, y], i) => {
      const dead = broken && i === 1;
      if (lit[i]) out += `<circle cx="${x}" cy="${y}" r="${n(34 + Math.sin(t * 6 + i) * 2)}" fill="#ffe066" opacity="0.45"/>`;
      out += `<circle cx="${x}" cy="${y}" r="20" fill="${lit[i] ? '#fff3b0' : '#e9e4da'}" stroke="${INK}" stroke-width="3"/>`;
      out += dead
        ? `<path d="M${x - 10} ${y + 6} L${x - 3} ${y - 6} M${x + 3} ${y - 6} L${x + 10} ${y + 6}" stroke="${INK}" stroke-width="2.5"/>` + txt(x, y + 44, '坏了', { size: 13, color: HOT, bold: true })
        : `<path d="M${x - 10} ${y + 6} Q${x} ${y - 14} ${x + 10} ${y + 6}" fill="none" stroke="${lit[i] ? HOT : '#8b7a5c'}" stroke-width="2.5"/>`;
    });
    out += txt(W - 20, 300, parallel ? '并联：每盏灯各有一条路' : '串联：只有一条路', { anchor: 'end', size: 15, color: BLUE, bold: true });
    return out;
  },
  readout(s) {
    if (!s.broken) return s.mode ? '并联：三条岔路都通，三盏灯都亮' : '串联：一条路通到底，三盏灯都亮';
    return s.mode
      ? '并联：中间那条岔路断了，另外两条照样通——这就是家里的接法'
      : '串联：中间断了，整条路都不通，三盏灯一起灭——就像老式的一串小彩灯';
  },
};

const GLOW = '#ffb703';
const NOTE = '#8b7a5c';
const SAFE = '#2f8a57';

function bar(x: number, y: number, w: number, value: number, label: string, color: string): string {
  return txt(x, y - 8, label, { anchor: 'start', size: 13, color: NOTE })
    + `<rect x="${x}" y="${y}" width="${w}" height="14" rx="7" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`
    + `<rect x="${x}" y="${y}" width="${n(w * clamp(value, 0, 1))}" height="14" rx="7" fill="${color}"/>`;
}

function bulb(x: number, y: number, glow: number, t: number, phase = 0): string {
  let out = glow > 0.02 ? `<circle cx="${x}" cy="${y}" r="${n(24 + 26 * glow + Math.sin(t * 6 + phase) * 1.5)}" fill="#ffe066" opacity="${n(0.15 + 0.45 * glow)}"/>` : '';
  out += `<circle cx="${x}" cy="${y}" r="20" fill="${glow > 0.02 ? '#fff3b0' : '#e9e4da'}" stroke="${INK}" stroke-width="3"/>`;
  out += `<path d="M${x - 10} ${y + 6} Q${x} ${y - 14} ${x + 10} ${y + 6}" fill="none" stroke="${glow > 0.02 ? HOT : NOTE}" stroke-width="2.5"/>`;
  return out;
}

/* ---------- 小鸟站在电线上 ---------- */

const BIRD_CASES = ['两只脚站在一根电线上', '翅膀碰到了电线杆', '张开翅膀碰到两根电线', '风筝线挂上了电线'];
const BIRD_READOUT = [
  '两只脚站在同一根电线上：脚和脚之间几乎没有电压差，电流照样顺着电线走，不会绕到小鸟身上——小鸟安然无恙',
  '一只脚踩着电线、翅膀碰到电线杆：电线和大地之间有上万伏的电压差，电流穿过小鸟的身体流进大地——非常危险',
  '张开翅膀同时碰到两根电线：两根线之间也有很大的电压差，电流从一根线穿过身体流到另一根——所以电线要隔得够远',
  '风筝线挂上电线，人站在地上拉着线：电线、风筝线、人和大地连成了一条路，潮湿的风筝线也会导电——千万别在电线附近放风筝',
];

export const bird: SimDef = {
  params: [
    { key: 'case', label: '碰到了什么', min: 0, max: 3, step: 1, value: 0, labels: BIRD_CASES },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const [ya, yb, pole] = [100, 170, 470];
    let out = `<rect x="0" y="0" width="${W}" height="${H}" fill="#eef6fc"/><rect x="0" y="290" width="${W}" height="30" fill="#cfe0b4"/>`;
    out += `<rect x="${pole - 8}" y="54" width="16" height="236" fill="#a07850" stroke="${INK}" stroke-width="2"/>`;
    for (const y of [ya, yb]) {
      out += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${INK}" stroke-width="3.5"/>`;
      out += `<rect x="${pole - 14}" y="${y - 9}" width="28" height="18" rx="6" fill="#9ccbe8" stroke="${INK}" stroke-width="2"/>`;
    }
    out += txt(16, ya - 10, '电线 A', { anchor: 'start', size: 13, color: NOTE }) + txt(16, yb - 10, '电线 B', { anchor: 'start', size: 13, color: NOTE });
    out += txt(16, 310, '大地', { anchor: 'start', size: 13, color: NOTE });
    out += txt(pole, 44, '电线杆（埋在地里）', { size: 12, color: NOTE });
    const danger = s.case > 0;
    let path: Pt[] = [];
    if (s.case === 0) {
      out += `<text x="220" y="${ya + 4}" font-size="42" text-anchor="middle">🐦</text>`;
      out += txt(220, ya + 30, '两脚之间几乎没有电压差', { size: 13, color: SAFE, bold: true });
    } else if (s.case === 1) {
      out += `<text x="420" y="${ya + 4}" font-size="42" text-anchor="middle">🐦</text>`;
      out += `<path d="M432 84 Q452 92 ${pole - 8} 122" fill="none" stroke="#6b5a45" stroke-width="6" stroke-linecap="round"/>`;
      path = [[260, ya], [420, ya], [440, 92], [pole - 8, 122], [pole, 150], [pole, 288]];
    } else if (s.case === 2) {
      out += `<text x="220" y="${yb + 4}" font-size="42" text-anchor="middle">🐦</text>`;
      out += `<path d="M230 152 Q246 126 250 ${ya}" fill="none" stroke="#6b5a45" stroke-width="6" stroke-linecap="round"/>`;
      path = [[110, ya], [250, ya], [236, 140], [220, yb], [110, yb]];
    } else {
      out += `<polyline points="128,252 300,52" fill="none" stroke="#8b7a5c" stroke-width="2"/>`;
      out += `<text x="306" y="62" font-size="40" text-anchor="middle">🪁</text>`;
      out += `<text x="110" y="292" font-size="58" text-anchor="middle">🧒</text>`;
      path = [[150, ya], [257, ya], [128, 252], [116, 288]];
    }
    if (danger) {
      out += flowDots(path, t, 140, 26, '#ffd43b');
      if ((t % 1.2) < 0.25) out += `<circle cx="${path[1][0]}" cy="${path[1][1]}" r="16" fill="#ffd43b" opacity="0.6"/>`;
    }
    out += txt(20, 34, danger ? '⚠ 电流穿过身体' : '✓ 没有电流穿过', { anchor: 'start', size: 17, bold: true, color: danger ? HOT : SAFE });
    return out;
  },
  readout(s) {
    return BIRD_READOUT[s.case];
  },
};

/* ---------- 电池节数和灯泡亮度 ---------- */

/** 小灯泡的灯丝越热电阻越大：电流约随电压的 0.6 次方增长（示意） */
function lampCircuit(s: State): { volts: number; count: number; amps: number; ohms: number; glow: number } {
  const volts = 1.5 * s.cells;
  const count = s.bulbs + 1;
  const each = volts / count;
  const amps = 0.2 * (each / 1.5) ** 0.6;
  return { volts, count, amps, ohms: each / amps, glow: clamp((each * amps) / 1.75, 0, 1) };
}

export const ohm: SimDef = {
  params: [
    { key: 'cells', label: '电池', min: 1, max: 3, step: 1, value: 1, unit: ' 节' },
    { key: 'bulbs', label: '灯泡', min: 0, max: 1, step: 1, value: 0, labels: ['1 盏灯', '2 盏灯串在一起'] },
  ],
  animated: true,
  still: 0.3,
  draw(s, t) {
    const { volts, count, amps, ohms, glow } = lampCircuit(s);
    const [left, right, top, bottom] = [70, 490, 80, 260];
    let out = `<path d="M${left} 116 V${top} H${right} V${bottom} H${left} V224" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    out += flowDots([[left, 116], [left, top], [right, top], [right, bottom], [left, bottom], [left, 224]], t, 300 * amps, 40);
    const cellH = 108 / s.cells;
    for (let i = 0; i < s.cells; i += 1) {
      const y = 116 + i * cellH;
      out += `<rect x="${left - 22}" y="${n(y)}" width="44" height="${n(cellH - 4)}" rx="6" fill="#ffe8a3" stroke="${INK}" stroke-width="2.5"/>`;
      out += txt(left, y + cellH / 2 + 4, '1.5V', { size: 11 });
    }
    const xs = count === 1 ? [280] : [210, 350];
    xs.forEach((x, i) => {
      out += `<rect x="${x - 24}" y="${top - 4}" width="48" height="8" fill="#fff"/>` + bulb(x, top, glow, t, i);
      out += txt(x, top + 42, '电阻拦', { size: 12, color: HOT });
    });
    out += txt(left + 30, 132, '电压推', { anchor: 'start', size: 13, color: BLUE, bold: true });
    out += bar(170, 168, 240, glow, '每盏灯有多亮（示意）', GLOW);
    out += txt(290, 220, `每盏灯的电阻约 ${r1(ohms)} 欧`, { size: 13, color: NOTE });
    out += `<circle cx="280" cy="${bottom}" r="18" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` + txt(280, bottom + 5, 'A', { size: 15, bold: true });
    out += txt(20, 30, `${volts} 伏 · 电流约 ${r2(amps)} 安`, { anchor: 'start', size: 16, bold: true });
    out += txt(280, 304, '电流表', { size: 12, color: NOTE });
    return out;
  },
  readout(s) {
    const { volts, count, amps, ohms } = lampCircuit(s);
    const head = `${s.cells} 节电池共 ${volts} 伏，${count === 1 ? '1 盏灯' : '2 盏灯串在一起'}：电流约 ${r2(amps)} 安，每盏灯的电阻约 ${r1(ohms)} 欧。`;
    if (count === 2) return `${head}两盏灯一起拦着，电流变小，每盏都比同样的电池只接一盏灯时暗`;
    if (s.cells === 1) return `${head}电压在推，灯丝的电阻在拦，电流的大小由这两样一起决定`;
    return `${head}电压大了，推得更有劲，电流变大、灯更亮；可电流没有翻倍，因为灯丝越热，电阻越大`;
  },
};

/* ---------- 电器一起开会跳闸 ---------- */

const MAINS = 220;
const BREAKER = 16;
const APPLIANCES = [
  { key: 'heater', name: '电暖器', icon: '🔥', watts: 2000 },
  { key: 'kettle', name: '电热水壶', icon: '🫖', watts: 1800 },
  { key: 'ac', name: '空调', icon: '❄️', watts: 1200 },
] as const;
const LIGHTS = 100;

function loadOf(s: State): { watts: number; amps: number; tripped: boolean } {
  const watts = LIGHTS + APPLIANCES.reduce((sum, a) => sum + (s[a.key] ? a.watts : 0), 0);
  const amps = watts / MAINS;
  return { watts, amps, tripped: amps > BREAKER };
}

export const load: SimDef = {
  params: APPLIANCES.map(a => ({ key: a.key, label: `${a.name}（约 ${a.watts} 瓦）`, min: 0, max: 1, step: 1, value: a.key === 'heater' ? 1 : 0, labels: ['关着', '开着'] })),
  animated: true,
  still: 0.3,
  draw(s, t) {
    const { watts, amps, tripped } = loadOf(s);
    const [live, neutral] = [100, 200];
    let out = `<rect x="26" y="64" width="90" height="160" rx="8" fill="#f4efe4" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<rect x="58" y="108" width="26" height="60" rx="5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    out += tripped
      ? `<rect x="62" y="140" width="18" height="24" rx="3" fill="${HOT}"/>`
      : `<rect x="62" y="112" width="18" height="24" rx="3" fill="${SAFE}"/>`;
    out += txt(71, 196, '空气开关', { size: 12 }) + txt(71, 212, `最多 ${BREAKER} 安`, { size: 11, color: NOTE });
    out += `<line x1="116" y1="${live}" x2="530" y2="${live}" stroke="${INK}" stroke-width="3.5"/><line x1="116" y1="${neutral}" x2="530" y2="${neutral}" stroke="${INK}" stroke-width="3.5"/>`;
    const slots = [{ name: '电灯', icon: '💡', watts: LIGHTS, on: true }, ...APPLIANCES.map(a => ({ name: a.name, icon: a.icon, watts: a.watts, on: s[a.key] === 1 }))];
    slots.forEach((slot, i) => {
      const x = 180 + i * 100;
      const on = slot.on && !tripped;
      out += `<line x1="${x}" y1="${live}" x2="${x}" y2="${neutral}" stroke="${INK}" stroke-width="2.5"/>`;
      out += `<rect x="${x - 34}" y="128" width="68" height="44" rx="8" fill="${on ? '#fff3b0' : '#ece8df'}" stroke="${INK}" stroke-width="2"/>`;
      out += `<text x="${x}" y="160" font-size="24" text-anchor="middle" opacity="${on ? 1 : 0.35}">${slot.icon}</text>`;
      out += txt(x, 222, slot.name, { size: 12 }) + txt(x, 238, `约 ${slot.watts} 瓦`, { size: 11, color: NOTE });
      if (on) out += flowDots([[x, live], [x, neutral]], t, 40 + amps * 4, 30);
    });
    if (!tripped) out += flowDots([[116, live], [530, live]], t, 40 + amps * 8, 36);
    const scale = 24;
    out += bar(150, 276, 360, amps / scale, `总电流 = ${watts} 瓦 ÷ ${MAINS} 伏 ≈ ${r1(amps)} 安`, tripped ? HOT : BLUE);
    const lim = 150 + (360 * BREAKER) / scale;
    out += `<line x1="${n(lim)}" y1="270" x2="${n(lim)}" y2="296" stroke="${HOT}" stroke-width="3"/>` + txt(lim, 310, `${BREAKER} 安`, { size: 11, color: HOT, bold: true });
    out += txt(20, 34, `总功率约 ${watts} 瓦`, { anchor: 'start', size: 16, bold: true });
    out += txt(W - 20, 34, tripped ? '啪！跳闸了' : '正常供电', { anchor: 'end', size: 17, bold: true, color: tripped ? HOT : SAFE });
    return out;
  },
  readout(s) {
    const { watts, amps, tripped } = loadOf(s);
    const head = `同时开着的电器总功率约 ${watts} 瓦，总电流 = ${watts} ÷ ${MAINS} ≈ ${r1(amps)} 安。`;
    return tripped
      ? `${head}超过了这条线路允许的 ${BREAKER} 安，空气开关“啪”地跳闸断电，免得电线过热起火`
      : `${head}没超过这条线路允许的 ${BREAKER} 安，开关不会跳`;
  },
};

/* ---------- 电流通过导线会发热 ---------- */

const CABLES = ['合格的粗导线', '劣质的细导线'];
const CABLE_OHMS = [0.15, 0.45];

function cablePoint(u: number): Pt {
  const [p0, p1, p2, p3]: Pt[] = [[118, 170], [210, 270], [330, 60], [420, 170]];
  const v = 1 - u;
  return [
    v ** 3 * p0[0] + 3 * v * v * u * p1[0] + 3 * v * u * u * p2[0] + u ** 3 * p3[0],
    v ** 3 * p0[1] + 3 * v * v * u * p1[1] + 3 * v * u * u * p2[1] + u ** 3 * p3[1],
  ];
}

export const joule: SimDef = {
  params: [
    { key: 'amps', label: '充电电流', min: 0.5, max: 3, step: 0.5, value: 1, unit: ' 安' },
    { key: 'cable', label: '充电线', min: 0, max: 1, step: 1, value: 0, labels: CABLES },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const ohms = CABLE_OHMS[s.cable];
    const heat = s.amps * s.amps * ohms;
    const level = clamp(heat / 4.05, 0, 1);
    const pts = Array.from({ length: 25 }, (_, i) => cablePoint(i / 24));
    const red = Math.round(93 + (232 - 93) * level);
    const green = Math.round(78 + (89 - 78) * level);
    let out = `<rect x="40" y="130" width="78" height="80" rx="10" fill="#f4efe4" stroke="${INK}" stroke-width="2.5"/>` + txt(79, 176, '充电头', { size: 13 });
    out += `<rect x="420" y="84" width="84" height="170" rx="14" fill="#2f3640" stroke="${INK}" stroke-width="2.5"/><rect x="430" y="98" width="64" height="130" rx="6" fill="#9ccbe8"/>`;
    out += '<text x="462" y="176" font-size="30" text-anchor="middle">⚡</text>';
    out += `<polyline points="${poly(pts)}" fill="none" stroke="rgb(${red},${green},55)" stroke-width="${s.cable ? 4 : 10}" stroke-linecap="round" stroke-linejoin="round"/>`;
    out += flowDots(pts, t, 60 + s.amps * 50, 34);
    const waves = Math.round(level * 6);
    for (let i = 0; i < waves; i += 1) {
      const [x, y] = pts[4 + i * 3];
      const rise = (t * 24 + i * 9) % 30;
      out += `<path d="M${n(x)} ${n(y - 14 - rise)} q5 -6 0 -12 q-5 -6 0 -12" fill="none" stroke="${HOT}" stroke-width="2" opacity="${n(0.8 - rise / 40)}"/>`;
    }
    out += bar(20, 40, 220, level, '导线每秒生的热（示意）', HOT);
    out += txt(W - 20, 30, `每秒约 ${r2(heat)} 焦`, { anchor: 'end', size: 16, bold: true, color: level > 0.5 ? HOT : INK });
    out += txt(270, 300, `${CABLES[s.cable]}：电阻约 ${ohms} 欧`, { size: 13, color: NOTE });
    return out;
  },
  readout(s) {
    const ohms = CABLE_OHMS[s.cable];
    const heat = s.amps * s.amps * ohms;
    const twice = s.amps >= 1 ? `；电流从 ${s.amps / 2} 安变成 ${s.amps} 安，生热变成 4 倍` : '';
    return `电流 ${s.amps} 安流过电阻约 ${ohms} 欧的${CABLES[s.cable]}：每秒生热 = ${s.amps}² × ${ohms} ≈ ${r2(heat)} 焦${twice}。电流流过有电阻的东西，总会生热`;
  },
};

/* ---------- 旧电池的内阻 ---------- */

const CELLS = [
  { name: '新电池', emf: 1.58, r: 0.15 },
  { name: '旧电池', emf: 1.42, r: 4 },
];
const LOADS = [
  { name: '只用电压表量', short: '电压表', ohms: 3000 },
  { name: '装进遥控器', short: '遥控器', ohms: 8 },
  { name: '装进玩具小车', short: '玩具小车', ohms: 2 },
];
const ENOUGH = 1.1;

function cellOut(s: State): { emf: number; r: number; amps: number; drop: number; volts: number } {
  const { emf, r } = CELLS[s.cell];
  const amps = emf / (LOADS[s.load].ohms + r);
  return { emf, r, amps, drop: amps * r, volts: emf - amps * r };
}

export const battery: SimDef = {
  params: [
    { key: 'cell', label: '电池', min: 0, max: 1, step: 1, value: 1, labels: CELLS.map(c => c.name) },
    { key: 'load', label: '怎么用', min: 0, max: 2, step: 1, value: 0, labels: LOADS.map(l => l.name) },
  ],
  animated: true,
  still: 0.3,
  draw(s, t) {
    const { emf, r, amps, drop, volts } = cellOut(s);
    const [top, bottom, left, right] = [80, 220, 70, 470];
    let out = `<rect x="34" y="58" width="196" height="184" rx="12" fill="#fff8e8" stroke="${NOTE}" stroke-width="2" stroke-dasharray="7 6"/>`;
    out += txt(132, 232, '电池里面', { size: 12, color: NOTE });
    const outside = s.load > 0 ? `M300 ${top} H${right} V${bottom} H300` : '';
    out += `<path d="M${left} 136 V${top} H120 M184 ${top} H300 ${outside} M300 ${bottom} H${left} V164" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    out += `<line x1="${left - 22}" y1="136" x2="${left + 22}" y2="136" stroke="${INK}" stroke-width="4"/><line x1="${left - 12}" y1="164" x2="${left + 12}" y2="164" stroke="${INK}" stroke-width="7"/>`;
    out += txt(left + 30, 156, `E ${r2(emf)} 伏`, { anchor: 'start', size: 13, bold: true, color: BLUE });
    const zig: Pt[] = Array.from({ length: 9 }, (_, i) => [120 + i * 8, top + (i === 0 || i === 8 ? 0 : i % 2 ? -9 : 9)]);
    out += `<polyline points="${poly(zig)}" fill="none" stroke="${HOT}" stroke-width="3.5" stroke-linejoin="round"/>`;
    out += txt(152, top + 28, `内阻 ${r} 欧`, { size: 12, color: HOT, bold: true });
    out += `<circle cx="230" cy="${top}" r="5" fill="${INK}"/><circle cx="230" cy="${bottom}" r="5" fill="${INK}"/>`;
    if (amps > 0.01) out += flowDots([[left, 136], [left, top], [right, top], [right, bottom], [left, bottom], [left, 164]], t, 40 + amps * 220, 40);
    else out += txt(350, top - 10, '几乎没有电流', { size: 12, color: NOTE });
    out += `<line x1="300" y1="${top}" x2="300" y2="128" stroke="${INK}" stroke-width="2"/><line x1="300" y1="172" x2="300" y2="${bottom}" stroke="${INK}" stroke-width="2"/>`;
    out += `<circle cx="300" cy="150" r="22" fill="#fff" stroke="${INK}" stroke-width="2.5"/>` + txt(300, 156, 'V', { size: 16, bold: true });
    const ld = LOADS[s.load];
    if (s.load > 0) {
      out += `<rect x="${right - 46}" y="118" width="92" height="64" rx="10" fill="#f4efe4" stroke="${INK}" stroke-width="2.5"/>` + txt(right, 146, ld.short, { size: 13, bold: true });
      const ok = volts >= ENOUGH;
      out += txt(right, 168, ok ? '能用 ✓' : '没劲了 ✗', { size: 13, bold: true, color: ok ? SAFE : HOT });
    } else {
      out += txt(400, 154, '外面没接东西', { size: 12, color: NOTE });
    }
    out += txt(300, 196, `读数 ${r2(volts)} 伏`, { size: 13, bold: true, color: BLUE });
    const full = 380 / 1.6;
    out += txt(90, 268, `电池的“力气” E = ${r2(emf)} 伏，分成两份：`, { anchor: 'start', size: 13, color: NOTE });
    out += `<rect x="90" y="278" width="${n(volts * full)}" height="16" rx="4" fill="${BLUE}"/><rect x="${n(90 + volts * full)}" y="278" width="${n(Math.max(drop * full, 0.5))}" height="16" rx="4" fill="${HOT}"/>`;
    out += txt(90, 312, `给外面 ${r2(volts)} 伏`, { anchor: 'start', size: 12, color: BLUE, bold: true }) + txt(470, 312, `内阻分走 ${r2(drop)} 伏`, { anchor: 'end', size: 12, color: HOT, bold: true });
    out += txt(20, 30, `电流约 ${amps < 0.01 ? '0.00' : r2(amps)} 安`, { anchor: 'start', size: 16, bold: true });
    return out;
  },
  readout(s) {
    const { amps, drop, volts } = cellOut(s);
    const c = CELLS[s.cell].name;
    if (s.load === 0) return `${c}只接电压表：电压表几乎不取电流，内阻分不走电压，读数约 ${r2(volts)} 伏——看起来“还有电”`;
    const verdict = volts >= ENOUGH ? '够用' : '剩下的电压不够，按不动了';
    return `${c}${LOADS[s.load].name}：电流约 ${r2(amps)} 安，电池里面的内阻分走 ${r2(drop)} 伏，两头只剩 ${r2(volts)} 伏——${verdict}`;
  },
};

/* ---------- 电容器充电、放电 ---------- */

const CAP_U = 8;
const CAP_R = 3300;
const CAP_C = 470e-6;
const TAU = CAP_R * CAP_C;
const FLASH_TAU = 1 * CAP_C;
const CAP_MODES = ['充电：接上电池', '放电：经过电阻', '放电：经过闪光灯管'];

function capAt(mode: number, t: number): { volts: number; milliamps: number } {
  if (mode === 0) return { volts: CAP_U * (1 - Math.exp(-t / TAU)), milliamps: (CAP_U / CAP_R) * Math.exp(-t / TAU) * 1000 };
  const tau = mode === 1 ? TAU : FLASH_TAU;
  const ohms = mode === 1 ? CAP_R : 1;
  return { volts: CAP_U * Math.exp(-t / tau), milliamps: -(CAP_U / ohms) * Math.exp(-t / tau) * 1000 };
}

export const capacitor: SimDef = {
  params: [
    { key: 'mode', label: '做什么', min: 0, max: 2, step: 1, value: 0, labels: CAP_MODES },
    { key: 't', label: '过了多久', min: 0, max: 8, step: 0.5, value: 1.5, unit: ' 秒' },
  ],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const { volts, milliamps } = capAt(s.mode, s.t);
    const q = CAP_C * volts * 1000;
    let out = `<path d="M120 160 H60 V270 H110 M160 270 H210 V160 H150" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    out += `<rect x="112" y="104" width="8" height="112" fill="#c9d3dd" stroke="${INK}" stroke-width="2"/><rect x="150" y="104" width="8" height="112" fill="#c9d3dd" stroke="${INK}" stroke-width="2"/>`;
    const charges = Math.round((volts / CAP_U) * 7);
    for (let i = 0; i < charges; i += 1) {
      const y = 112 + i * 14.5;
      out += txt(129, y + 6, '+', { size: 14, bold: true, color: HOT }) + txt(142, y + 6, '−', { size: 14, bold: true, color: BLUE });
    }
    if (s.mode === 0) {
      out += `<line x1="122" y1="256" x2="122" y2="284" stroke="${INK}" stroke-width="4"/><line x1="146" y1="262" x2="146" y2="278" stroke="${INK}" stroke-width="7"/>`;
      out += `<line x1="110" y1="270" x2="122" y2="270" stroke="${INK}" stroke-width="4"/><line x1="146" y1="270" x2="160" y2="270" stroke="${INK}" stroke-width="4"/>`;
      out += txt(135, 304, `电池 ${CAP_U} 伏（经过电阻）`, { size: 12, color: NOTE });
    } else if (s.mode === 1) {
      const zig: Pt[] = Array.from({ length: 7 }, (_, i) => [110 + i * (50 / 6), 270 + (i === 0 || i === 6 ? 0 : i % 2 ? -8 : 8)]);
      out += `<polyline points="${poly(zig)}" fill="none" stroke="${INK}" stroke-width="3.5"/>` + txt(135, 304, '电阻 3.3 千欧', { size: 12, color: NOTE });
    } else {
      const flash = s.t < 0.25 ? 1 : 0;
      if (flash) out += `<circle cx="135" cy="270" r="${n(44 + Math.sin(t * 20) * 4)}" fill="#fff6b0" opacity="0.8"/>`;
      out += `<rect x="110" y="260" width="50" height="20" rx="10" fill="${flash ? '#fffbe0' : '#e4ecf2'}" stroke="${INK}" stroke-width="2.5"/>` + txt(135, 304, '闪光灯管（约 1 欧）', { size: 12, color: NOTE });
    }
    const flowing = Math.abs(milliamps) > 0.05 && !(s.mode === 2 && s.t > 0);
    if (flowing) {
      const loop: Pt[] = [[210, 160], [210, 270], [160, 270], [110, 270], [60, 270], [60, 160]];
      const speed = (s.mode === 0 ? 1 : -1) * (30 + Math.min(Math.abs(milliamps), 3) * 40);
      out += flowDots(loop, t, speed, 34);
    }
    const [gx, gy, gw, gh] = [310, 70, 220, 170];
    const px = (time: number): number => gx + (time / 8) * gw;
    const py = (v: number): number => gy + gh - (v / CAP_U) * gh;
    out += `<line x1="${gx}" y1="${gy + gh}" x2="${gx + gw + 10}" y2="${gy + gh}" stroke="${INK}" stroke-width="2"/><line x1="${gx}" y1="${gy - 10}" x2="${gx}" y2="${gy + gh}" stroke="${INK}" stroke-width="2"/>`;
    out += txt(gx, gy - 16, '电容器两端电压 / 伏', { anchor: 'start', size: 12, color: NOTE }) + txt(gx + gw, gy + gh + 20, '时间 / 秒', { anchor: 'end', size: 12, color: NOTE });
    out += txt(gx - 6, py(CAP_U) + 4, `${CAP_U}`, { anchor: 'end', size: 11, color: NOTE }) + txt(gx - 6, gy + gh + 4, '0', { anchor: 'end', size: 11, color: NOTE });
    const curve: Pt[] = s.mode === 2
      ? [[px(0), py(CAP_U)], [px(0.02), py(0)], [px(8), py(0)]]
      : Array.from({ length: 41 }, (_, i) => [px(i / 5), py(capAt(s.mode, i / 5).volts)]);
    out += `<polyline points="${poly(curve)}" fill="none" stroke="${BLUE}" stroke-width="3"/>`;
    out += `<line x1="${n(px(TAU))}" y1="${gy + gh}" x2="${n(px(TAU))}" y2="${gy + gh + 6}" stroke="${INK}" stroke-width="2"/>` + txt(px(TAU), gy + gh + 20, 'τ', { size: 12, color: NOTE });
    out += `<circle cx="${n(px(s.t))}" cy="${n(py(volts))}" r="7" fill="${HOT}" stroke="#fff" stroke-width="2"/>`;
    const amps = Math.abs(milliamps) >= 1000 ? `约 ${r1(Math.abs(milliamps) / 1000)} 安` : `${r2(Math.abs(milliamps))} 毫安`;
    out += txt(20, 30, `${r2(volts)} 伏 · 存了 ${r2(q)} 毫库`, { anchor: 'start', size: 16, bold: true });
    out += txt(20, 52, `电流 ${amps}${s.mode > 0 ? '（和充电反向）' : ''}`, { anchor: 'start', size: 13, color: NOTE });
    return out;
  },
  readout(s) {
    const { volts, milliamps } = capAt(s.mode, s.t);
    const q = CAP_C * volts * 1000;
    if (s.mode === 0) return `充电 ${s.t} 秒：电容器两端 ${r2(volts)} 伏，存了约 ${r2(q)} 毫库电荷，电流 ${r2(milliamps)} 毫安——越充越慢，过 5τ（约 7.8 秒）基本充满`;
    if (s.mode === 1) return `经过 3.3 千欧的电阻放电 ${s.t} 秒：还剩 ${r2(volts)} 伏，电流 ${r2(Math.abs(milliamps))} 毫安，方向和充电时相反，越放越慢`;
    return s.t === 0
      ? '刚按下快门：闪光灯管的电阻只有约 1 欧，电流一下子冲到约 8 安，存的电马上倒出来变成强光'
      : '经过闪光灯管放电：时间常数不到千分之一秒，存的电早就一下子放完了，所以闪光只“咔”地亮一下';
  },
};

const ROD_MODES = ['没装接闪杆', '装了接闪杆并可靠接地', '引下线半路断了（危险）'] as const;

export const lightningRod: SimDef = {
  params: [{ key: 'setup', label: '楼顶防雷', min: 0, max: 2, step: 1, value: 1, labels: [...ROD_MODES] }],
  animated: true,
  still: 0.35,
  draw(s, t) {
    const m = clamp(Math.round(s.setup), 0, 2);
    const flash = (t % 2.2) < 0.55;
    let out = `<rect width="${W}" height="264" rx="12" fill="#253047"/>`;
    out += `<rect y="260" width="${W}" height="60" rx="8" fill="#6b563c"/>`;
    out += txt(74, 294, '潮湿的大地', { size: 13, bold: true, color: '#fff3bf', plain: true });
    out += `<ellipse cx="270" cy="54" rx="168" ry="34" fill="#495670"/><ellipse cx="190" cy="62" rx="90" ry="26" fill="#3c475e"/><ellipse cx="350" cy="62" rx="96" ry="26" fill="#3c475e"/>`;
    for (let i = 0; i < 6; i += 1) out += txt(150 + i * 48, 68, '−', { size: 17, bold: true, color: '#74c0fc', plain: true });
    out += `<polygon points="186,154 264,116 342,154" fill="#c96b59" stroke="#fff" stroke-width="1.5"/>`;
    out += `<rect x="198" y="154" width="132" height="106" fill="#f3e5ce" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="220" y="176" width="34" height="34" rx="4" fill="#cfe5f7" stroke="${INK}" stroke-width="1.5"/>`;
    out += `<text x="288" y="236" font-size="34" text-anchor="middle">🧒</text>`;

    if (m > 0) {
      out += `<line x1="264" y1="88" x2="264" y2="118" stroke="#ffd43b" stroke-width="4" stroke-linecap="round"/>`;
      out += `<circle cx="264" cy="86" r="4" fill="#ffd43b"/>`;
      out += txt(214, 96, '接闪杆', { anchor: 'end', size: 12.5, bold: true, color: '#ffd43b', plain: true });
      for (const dx of [-10, 0, 10]) out += txt(264 + dx, 80, '+', { size: 12, bold: true, color: '#ffd43b', plain: true });
      if (m === 1) {
        out += `<polyline points="264,116 348,152 348,288" fill="none" stroke="#ffd43b" stroke-width="4" stroke-linejoin="round"/>`;
        out += `<line x1="322" y1="288" x2="376" y2="288" stroke="#ffd43b" stroke-width="4"/>`;
        out += txt(424, 206, '引下线（粗导体）', { anchor: 'start', size: 12.5, color: '#ffd43b', plain: true, bold: true });
        out += txt(436, 292, '接地网散入大地', { anchor: 'start', size: 12.5, color: '#ffd43b', plain: true });
      } else {
        out += `<polyline points="264,116 348,152 348,196" fill="none" stroke="#ffd43b" stroke-width="4"/>`;
        out += `<line x1="348" y1="234" x2="348" y2="288" stroke="#adb5bd" stroke-width="3" stroke-dasharray="5 4"/>`;
        out += txt(422, 216, '✗ 引下线断开了！', { anchor: 'start', size: 13, bold: true, color: '#ff8787', plain: true });
      }
    } else {
      for (const dx of [-24, 0, 24]) out += txt(264 + dx, 112, '+', { size: 13, bold: true, color: '#ffa8a8', plain: true });
    }

    if (flash) {
      if (m === 0) {
        out += `<polyline points="250,74 274,94 256,108 264,120" fill="none" stroke="#fff3bf" stroke-width="5" stroke-linecap="round"/>`;
        out += `<circle cx="264" cy="124" r="18" fill="${HOT}" opacity="0.85"/>`;
        out += txt(112, 136, '⚡ 直接劈坏屋顶！', { size: 13.5, bold: true, color: '#ffa8a8', plain: true });
      } else if (m === 1) {
        out += `<polyline points="256,66 270,76 264,86" fill="none" stroke="#fff3bf" stroke-width="5" stroke-linecap="round"/>`;
        for (let k = 0; k < 4; k += 1) {
          const y = 156 + k * 34;
          out += `<circle cx="348" cy="${y}" r="5" fill="#fff3bf"/>`;
        }
        out += txt(106, 136, '✓ 接住闪电，顺导线入地', { size: 13, bold: true, color: '#8ce99a', plain: true });
      } else {
        out += `<polyline points="256,66 270,76 264,86" fill="none" stroke="#fff3bf" stroke-width="5"/>`;
        out += `<polyline points="348,196 326,208 310,202" fill="none" stroke="#ff8787" stroke-width="4"/>`;
        out += txt(102, 136, '⚡ 半路跳火劈进屋里！', { size: 13, bold: true, color: '#ffa8a8', plain: true });
      }
    }
    const headline = [
      '没装接闪杆：闪电直接劈中楼顶砖瓦，容易起火伤人',
      '不是把雷“吓跑”，而是替大楼接住闪电、安全送进大地',
      '只装尖针却没接通大地：引来的雷电流无路可走，反而更危险',
    ][m];
    out += txt(W / 2, 24, headline, { size: 13.5, bold: true, color: '#fff3bf', plain: true });
    return out;
  },
  readout(s) {
    const m = clamp(Math.round(s.setup), 0, 2);
    if (m === 0) return '没装防雷装置：雷雨云压顶时，屋顶感应出大量电荷，闪电直接劈在水泥砖瓦上，瞬间高温很容易引发火灾';
    if (m === 1) return '装了接闪杆、引下线和接地网：高处的金属杆主动接住这一劈，给雷电流留出一条电阻极小的“专用滑梯”，安全散进大地';
    return '如果引下线断了或接地不良：接闪杆把闪电接了下来，几万安的大电流却下不了地，就会向旁边墙体和电线跳火反击';
  },
};

