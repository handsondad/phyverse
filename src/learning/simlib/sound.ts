import { W, H, INK, HOT, BLUE, n, r1, r2, clamp, smooth, noise, txt, poly, type State, type SimDef } from './kit';

/* ---------------- 声音与波 ---------------- */

export const thunder: SimDef = {
  params: [{ key: 'd', label: '闪电离你多远', min: 0.4, max: 3, step: 0.2, value: 1, unit: ' km' }],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const delay = (s.d * 1000) / 340;
    const u = t % (delay + 2.5);
    const [kx, ky] = [70, 262];
    const [bx, by] = [480, 270];
    let out = '';
    if (u < 0.25) out += `<rect width="${W}" height="${H}" fill="#fff6c2" opacity="${n(1 - u / 0.25)}"/>`;
    out += `<line x1="0" y1="282" x2="${W}" y2="282" stroke="${INK}" stroke-width="2"/>`;
    out += `<ellipse cx="480" cy="54" rx="70" ry="28" fill="#8e8a99"/><ellipse cx="440" cy="62" rx="44" ry="22" fill="#a19dab"/><ellipse cx="520" cy="64" rx="40" ry="20" fill="#a19dab"/>`;
    if (u < 0.35) out += `<polyline points="480,80 462,140 494,150 468,210 500,218 ${bx},${by}" fill="none" stroke="#ffd43b" stroke-width="7" stroke-linejoin="round"/>`;
    if (u < delay) {
      const reach = bx - kx;
      const rad0 = (u / delay) * reach;
      for (let k = 0; k < 3; k += 1) {
        const r = rad0 - k * 26;
        if (r <= 0) continue;
        out += `<path d="M${n(bx - r)} ${by} A${n(r)} ${n(r)} 0 0 1 ${n(bx - r * 0.5)} ${n(by - r * 0.87)}" fill="none" stroke="#7a5cc4" stroke-width="${4 - k}" opacity="${n(0.9 - k * 0.25)}"/>`;
      }
    }
    const heard = u >= delay;
    const shake = heard && u < delay + 0.6 ? Math.sin(u * 60) * 3 : 0;
    out += `<text x="${n(kx + shake)}" y="${ky}" font-size="46" text-anchor="middle">${heard ? '🙉' : '🧒'}</text>`;
    out += txt(kx + 10, 208, u < 1.4 ? '看到闪电了！' : '', { color: '#c28a00', bold: true });
    if (heard) out += txt(kx + 120, 236, '轰隆隆——', { color: '#7a5cc4', bold: true, size: 22 });
    out += txt(260, 40, `${r1(Math.min(u, delay))} 秒`, { size: 30, bold: true, color: heard ? '#7a5cc4' : INK });
    out += txt(260, 62, heard ? '雷声到了' : '雷声还在路上……', { size: 13, color: '#8b7a5c' });
    out += txt(275, 304, `${s.d} 千米`, { size: 13, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const delay = (s.d * 1000) / 340;
    return `${s.d} 千米外的闪电：光只要 ${n((s.d / 300000) * 1e6)} 微秒就到了，雷声要走 ${r1(delay)} 秒——数到几秒，就乘 340 米`;
  },
};

const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const LINEAR_DENSITY = 0.00342;
const stringFreq = (s: State): number => Math.sqrt(s.T / LINEAR_DENSITY) / (2 * (s.L / 100));
function noteName(f: number): string {
  const midi = Math.round(12 * Math.log2(f / 440) + 69);
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

export const guitar: SimDef = {
  params: [
    { key: 'L', label: '能振动的弦长', min: 30, max: 65, step: 5, value: 65, unit: ' cm' },
    { key: 'T', label: '弦拧得多紧（拉力）', min: 40, max: 120, step: 10, value: 70, unit: ' N' },
  ],
  animated: true,
  still: 0.06,
  draw(s, t) {
    const f = stringFreq(s);
    const [nut, bridge, y] = [40, 520, 96];
    const px = (bridge - nut) / 65;
    const finger = bridge - s.L * px;
    let out = `<rect x="20" y="70" width="${W - 40}" height="52" rx="10" fill="#e9d2ac" stroke="${INK}" stroke-width="2"/>`;
    for (let k = 1; k < 13; k += 1) {
      const x = bridge - 65 * px * 2 ** (-k / 12);
      out += `<line x1="${n(x)}" y1="72" x2="${n(x)}" y2="120" stroke="#b79a6b" stroke-width="2"/>`;
    }
    out += `<rect x="${nut - 6}" y="70" width="8" height="52" fill="#f6f1e7" stroke="${INK}" stroke-width="1.5"/><rect x="${bridge - 2}" y="70" width="8" height="52" fill="#4a4036"/>`;
    out += `<line x1="${nut}" y1="${y}" x2="${n(finger)}" y2="${y}" stroke="#7d6a4b" stroke-width="3"/>`;
    const amp = 13 * Math.cos(2 * Math.PI * (f / 28) * t);
    const pts: [number, number][] = Array.from({ length: 41 }, (_, i) => {
      const x = finger + ((bridge - finger) * i) / 40;
      return [x, y + amp * Math.sin((Math.PI * i) / 40)];
    });
    out += `<polyline points="${poly(pts)}" fill="none" stroke="${HOT}" stroke-width="3"/>`;
    if (s.L < 65) out += `<circle cx="${n(finger)}" cy="${y}" r="11" fill="#f4c7a1" stroke="${INK}" stroke-width="2"/>`;
    out += txt((finger + bridge) / 2, 60, `振动的这一段 ${s.L} cm`, { size: 13, color: HOT });
    const [gx, gy, gw, gh] = [40, 160, 480, 110];
    out += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="10" fill="#fff" stroke="#e7dccb" stroke-width="2"/>`;
    const cycles = f * 0.02;
    const wave: [number, number][] = Array.from({ length: 161 }, (_, i) => {
      const u = i / 160;
      return [gx + u * gw, gy + gh / 2 - 36 * Math.sin(2 * Math.PI * (cycles * u - t * 0.6))];
    });
    out += `<polyline points="${poly(wave)}" fill="none" stroke="#7a5cc4" stroke-width="2.5"/>`;
    out += txt(gx + gw / 2, gy + gh + 22, `同样 0.02 秒里来回振动 ${r1(cycles)} 次`, { size: 13, color: '#7a5cc4' });
    out += txt(W - 24, 30, `${Math.round(f)} 次/秒 ≈ ${noteName(f)}`, { anchor: 'end', size: 18, bold: true, color: HOT });
    return out;
  },
  readout(s) {
    const f = stringFreq(s);
    return `弦长 ${s.L} cm、拉力 ${s.T} N：每秒振动约 ${Math.round(f)} 次（频率 ${Math.round(f)} Hz，大约是 ${noteName(f)} 这个音）`;
  },
};

const SOUND = '#7a5cc4';
const ECHO = '#c2588f';
const NOTE = '#8b7a5c';

/** 一段朝左（dir = -1）或朝右（dir = 1）张开的波纹 */
function wavefront(cx: number, cy: number, r: number, dir: 1 | -1, color: string, opacity: number, width = 3, half = 0.6): string {
  const x = cx + dir * r * Math.cos(half);
  const dy = r * Math.sin(half);
  return `<path d="M${n(x)} ${n(cy - dy)} A${n(r)} ${n(r)} 0 0 ${dir > 0 ? 1 : 0} ${n(x)} ${n(cy + dy)}" fill="none" stroke="${color}" stroke-width="${n(width)}" stroke-linecap="round" opacity="${n(opacity)}"/>`;
}

function meterBar(x: number, y: number, w: number, value: number, label: string, color: string): string {
  return txt(x, y - 8, label, { anchor: 'start', size: 13, color: NOTE })
    + `<rect x="${x}" y="${y}" width="${w}" height="14" rx="7" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`
    + `<rect x="${x}" y="${y}" width="${n(Math.max(w * clamp(value, 0, 1), 0))}" height="14" rx="7" fill="${color}"/>`;
}

const AIR = [1, 0.5, 0.12, 0.02];
const AIR_LABELS = ['满满的空气', '抽掉一半', '只剩一点点', '几乎抽空了'];

export const bellJar: SimDef = {
  params: [{ key: 'air', label: '罩子里的空气', min: 0, max: 3, step: 1, value: 0, labels: AIR_LABELS }],
  animated: true,
  still: 0.4,
  draw(s, t) {
    const air = AIR[s.air];
    const [cx, base] = [170, 262];
    const dome = `M${cx - 105} ${base} V150 A105 96 0 0 1 ${cx + 105} 150 V${base}`;
    let out = `<path d="${dome}" fill="#e6f3fb" fill-opacity="0.45"/>`;
    const count = Math.round(70 * air);
    for (let i = 0; i < count; i += 1) {
      const x = cx - 92 + noise(i * 3 + 1) * 184 + Math.sin(t * 5 + i) * 4;
      const y = 66 + noise(i * 3 + 2) * 186 + Math.cos(t * 6 + i * 1.7) * 4;
      if (y < 150 && ((x - cx) / 98) ** 2 + ((y - 150) / 90) ** 2 > 1) continue;
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="3.5" fill="#8fb8d8"/>`;
    }
    const knock = Math.sin(t * 38);
    out += `<line x1="${cx}" y1="${base}" x2="${cx}" y2="190" stroke="${INK}" stroke-width="4"/>`;
    out += `<path d="M${cx - 38} 190 Q${cx - 36} 128 ${cx} 124 Q${cx + 36} 128 ${cx + 38} 190 Z" fill="#f2c94c" stroke="${INK}" stroke-width="2.5" transform="rotate(${n(knock * 3)} ${cx} 124)"/>`;
    out += `<line x1="${cx + 70}" y1="${base}" x2="${n(cx + 52 + knock * 8)}" y2="170" stroke="${INK}" stroke-width="3"/><circle cx="${n(cx + 52 + knock * 8)}" cy="166" r="8" fill="${HOT}" stroke="${INK}" stroke-width="2"/>`;
    out += `<path d="${dome}" fill="none" stroke="#6f8580" stroke-width="4"/>`;
    out += `<rect x="40" y="${base}" width="270" height="16" rx="5" fill="#b9a88a" stroke="${INK}" stroke-width="2"/>`;
    out += `<path d="M280 ${base + 16} V300 H372 V254" fill="none" stroke="#8b7a5c" stroke-width="6"/>`;
    out += `<rect x="340" y="206" width="64" height="48" rx="8" fill="#d9cdb6" stroke="${INK}" stroke-width="2"/>${txt(372, 235, '抽气机', { size: 13 })}`;
    const heard = air ** 0.6;
    for (let k = 0; k < 4; k += 1) {
      const phase = (t * 0.9 + k / 4) % 1;
      out += wavefront(cx + 100, 160, 16 + phase * 190, 1, SOUND, (1 - phase) * heard, 3);
    }
    out += `<text x="505" y="190" font-size="44" text-anchor="middle">👂</text>`;
    out += meterBar(420, 64, 120, heard, '听到的铃声', SOUND);
    out += txt(cx, 40, '铃锤一直在敲', { size: 13, color: HOT, bold: true });
    out += txt(cx, 306, `罩子里：${AIR_LABELS[s.air]}`, { size: 14, bold: true });
    return out;
  },
  readout(s) {
    return [
      '罩子里满是空气：铃声清清楚楚地传出来',
      '抽掉一半空气：铃锤照样在敲，听到的铃声变小了',
      '只剩一点点空气：铃声已经很微弱了',
      '几乎抽空了：铃锤还在敲，却几乎听不见——声音要靠空气这样的东西才能传出来',
    ][s.air];
  },
};

const SPEED_AIR = 340;

export const echo: SimDef = {
  params: [{ key: 'd', label: '离山崖多远', min: 5, max: 200, step: 5, value: 85, unit: ' 米' }],
  animated: true,
  still: 0.35,
  draw(s, t) {
    const delay = (2 * s.d) / SPEED_AIR;
    const [kx, gy] = [56, 220];
    const cliff = 130 + (s.d / 200) * 370;
    const u = t % (delay + 1.6);
    let out = `<line x1="0" y1="${gy + 18}" x2="${n(cliff)}" y2="${gy + 18}" stroke="${INK}" stroke-width="2"/>`;
    out += `<polygon points="${n(cliff)},${gy + 18} ${n(cliff)},90 ${n(cliff + 26)},64 ${W},60 ${W},${gy + 18}" fill="#c4ad87" stroke="${INK}" stroke-width="2"/>`;
    out += `<text x="${kx}" y="${gy + 14}" font-size="44" text-anchor="middle">🧒</text>`;
    const mouth = kx + 24;
    const reach = cliff - mouth;
    const head = (u / delay) * 2 * reach;
    for (let k = 0; k < 3; k += 1) {
      const dist = head - k * 14;
      if (dist <= 0 || dist > 2 * reach) continue;
      out += dist <= reach
        ? wavefront(mouth, gy - 14, dist, 1, SOUND, 1 - k * 0.3, 3.5 - k)
        : wavefront(cliff, gy - 14, dist - reach, -1, ECHO, (1 - k * 0.3) * (1 - (dist - reach) / reach * 0.4), 3.5 - k);
    }
    if (u < 0.5) out += txt(kx + 34, gy - 64, '喂——', { size: 20, bold: true, color: SOUND });
    if (u >= delay && u < delay + 0.8) out += txt(kx + 40, gy - 92, delay >= 0.1 ? '喂……（回声）' : '声音拖长了一点', { size: 16, bold: true, color: ECHO, anchor: 'start' });
    out += txt((kx + cliff) / 2, gy + 36, `${s.d} 米`, { size: 13, color: NOTE });
    const [tx, tw, ty, span] = [40, 480, 272, 1.4];
    out += `<line x1="${tx}" y1="${ty + 10}" x2="${tx + tw}" y2="${ty + 10}" stroke="#d8ccb6" stroke-width="2"/>`;
    const block = (0.1 / span) * tw;
    out += `<rect x="${tx}" y="${ty}" width="${n(block)}" height="20" rx="4" fill="${SOUND}" opacity="0.85"/>`;
    out += `<rect x="${n(tx + (delay / span) * tw)}" y="${ty}" width="${n(block)}" height="20" rx="4" fill="${ECHO}" opacity="0.75"/>`;
    out += txt(tx, ty + 40, '0 秒', { anchor: 'start', size: 12, color: NOTE });
    out += txt(tx + tw, ty + 40, `${span} 秒`, { anchor: 'end', size: 12, color: NOTE });
    out += txt(tx + tw / 2, ty + 40, '紫色：喊出的声音（约 0.1 秒）　粉色：回声', { size: 12, color: NOTE });
    out += txt(150, 30, `回声 ${r2(delay)} 秒后回来`, { size: 20, bold: true, color: delay >= 0.1 ? ECHO : INK, anchor: 'start' });
    out += txt(150, 52, delay >= 0.1 ? '超过 0.1 秒：耳朵能分出两声' : '不到 0.1 秒：和原来的声音混在一起', { size: 13, color: NOTE, anchor: 'start' });
    return out;
  },
  readout(s) {
    const delay = (2 * s.d) / SPEED_AIR;
    return delay < 0.1
      ? `离山崖 ${s.d} 米：声音来回走 ${2 * s.d} 米，${r2(delay)} 秒就回来了，不到 0.1 秒，和原来的声音混在一起，只觉得声音拖长了`
      : `离山崖 ${s.d} 米：声音来回走 ${2 * s.d} 米，${r2(delay)} 秒后才回来，超过 0.1 秒，能听出一声回声`;
  },
};

const SIREN_SPEED = [0, 10, 20, 30];
const SIREN_F = 700;
const heardFreq = (vs: number, toward: boolean): number => (SIREN_F * SPEED_AIR) / (SPEED_AIR + (toward ? -vs : vs));

export const doppler: SimDef = {
  params: [{ key: 'v', label: '救护车的速度', min: 0, max: 3, step: 1, value: 2, labels: ['停着不动', '每秒 10 米', '每秒 20 米', '每秒 30 米'] }],
  animated: true,
  still: 2.6,
  draw(s, t) {
    const vs = SIREN_SPEED[s.v];
    const c = 150;
    const vpx = (vs / SPEED_AIR) * c * 6;
    const [x0, span, gy] = [130, 300, 196];
    const loop = vpx ? span / vpx : 1;
    const carX = (time: number): number => (vpx ? x0 + vpx * (((time % loop) + loop) % loop) : x0 + span / 2);
    let out = `<line x1="0" y1="${gy + 8}" x2="${W}" y2="${gy + 8}" stroke="${INK}" stroke-width="2"/>`;
    const gap = 0.32;
    for (let j = 0; j < 14; j += 1) {
      const te = t - (t % gap) - j * gap;
      const r = c * (t - te);
      if (r > 340) continue;
      out += `<circle cx="${n(carX(te))}" cy="${gy - 16}" r="${n(r)}" fill="none" stroke="${SOUND}" stroke-width="2.5" opacity="${n(1 - r / 340)}"/>`;
    }
    out += `<text transform="translate(${n(carX(t))} ${gy}) scale(-1 1)" font-size="42" text-anchor="middle">🚑</text>`;
    out += `<text x="${W - 34}" y="${gy + 2}" font-size="40" text-anchor="middle">🧍</text>`;
    out += `<text x="34" y="${gy + 2}" font-size="40" text-anchor="middle">🧍</text>`;
    out += txt(W - 12, gy + 40, `车头前面：约 ${Math.round(heardFreq(vs, true))} 赫兹`, { anchor: 'end', size: 14, bold: true, color: vs ? HOT : INK });
    out += txt(12, gy + 40, `车尾后面：约 ${Math.round(heardFreq(vs, false))} 赫兹`, { anchor: 'start', size: 14, bold: true, color: vs ? BLUE : INK });
    out += txt(W / 2, 30, vs ? '车头前面的波挤在一起，车尾后面的波被拉开' : '车停着：前后的波一样密', { size: 16, bold: true });
    out += txt(W / 2, 300, `警笛本身按 ${SIREN_F} 赫兹算；画面里把车速放大了，好看清`, { size: 12, color: NOTE });
    return out;
  },
  readout(s) {
    const vs = SIREN_SPEED[s.v];
    if (!vs) return `车停着：前后的人听到的都是警笛本来的 ${SIREN_F} 赫兹`;
    return `车速每秒 ${vs} 米（约 ${Math.round(vs * 3.6)} 千米/时）：车开过来时听到约 ${Math.round(heardFreq(vs, true))} 赫兹，开走以后约 ${Math.round(heardFreq(vs, false))} 赫兹——声音“一下变低”就是这么来的`;
  },
};

const LANES = [
  { name: '空气', v: 340, color: '#8fb8d8' },
  { name: '水', v: 1500, color: '#3a7bb5' },
  { name: '钢铁', v: 5200, color: '#6f7d8c' },
];
const seconds = (v: number): string => (v < 1 ? r2(v) : r1(v));

export const medium: SimDef = {
  params: [{ key: 'd', label: '声音要走多远', min: 100, max: 1000, step: 100, value: 500, unit: ' 米' }],
  animated: true,
  still: 1.2,
  draw(s, t) {
    const air = s.d / LANES[0].v;
    const u = t % (air + 1.5);
    const [x0, x1] = [110, 450];
    let out = txt(W / 2, 32, `同样走 ${s.d} 米，谁先到？`, { size: 18, bold: true });
    out += `<line x1="${x1}" y1="60" x2="${x1}" y2="268" stroke="${INK}" stroke-width="2" stroke-dasharray="6 5"/>${txt(x1, 56, '终点', { size: 12, color: NOTE })}`;
    LANES.forEach((lane, i) => {
      const y = 96 + i * 72;
      const time = s.d / lane.v;
      const p = Math.min(u / time, 1);
      const x = x0 + p * (x1 - x0);
      out += `<rect x="${x0}" y="${y - 16}" width="${x1 - x0}" height="32" rx="16" fill="${lane.color}" fill-opacity="${lane.name === '空气' ? 0.2 : 0.3}"/>`;
      out += txt(x0 - 14, y + 6, lane.name, { anchor: 'end', size: 17, bold: true });
      for (let k = 1; k < 3; k += 1) if (x - k * 12 > x0) out += wavefront(x - k * 12, y, 10, 1, lane.color, 0.6 - k * 0.2, 2.5, 0.9);
      out += `<circle cx="${n(x)}" cy="${y}" r="10" fill="${lane.color}" stroke="${INK}" stroke-width="2"/>`;
      out += txt(x1 + 14, y + 6, p >= 1 ? `${seconds(time)} 秒` : '……', { anchor: 'start', size: 16, bold: p >= 1, color: p >= 1 ? HOT : NOTE });
    });
    out += txt(W / 2, 302, '声速大约：空气 340 米/秒，水 1500 米/秒，钢铁五千多米/秒', { size: 12, color: NOTE });
    return out;
  },
  readout(s) {
    const [air, water, steel] = LANES.map(lane => seconds(s.d / lane.v));
    return `走 ${s.d} 米：空气要 ${air} 秒，水要 ${water} 秒，钢铁只要 ${steel} 秒——固体传声最快，气体最慢`;
  },
};

const GLASS_F = 800;
const GLASS_Q = 40;
/** 杯子跟着振动的幅度，正好对准时是 1 */
function glassResponse(f: number): number {
  const r = f / GLASS_F;
  return 1 / GLASS_Q / Math.sqrt((1 - r * r) ** 2 + (r / GLASS_Q) ** 2);
}

export const resonance: SimDef = {
  params: [
    { key: 'f', label: '唱出的声音频率', min: 500, max: 1100, step: 25, value: 650, unit: ' 赫兹' },
    { key: 'loud', label: '声音大小', min: 0, max: 1, step: 1, value: 1, labels: ['小声', '很大声'] },
  ],
  animated: true,
  still: 2.2,
  draw(s, t) {
    const match = glassResponse(s.f);
    const a = match * (s.loud ? 1 : 0.35);
    const cycle = t % 6;
    const amp = a * smooth(cycle / 2.5);
    const broken = a > 0.9 && cycle > 3;
    const [gx, top] = [120, 82];
    let out = '';
    if (broken) {
      out += `<line x1="${gx}" y1="214" x2="${gx}" y2="252" stroke="#6f8580" stroke-width="4"/><ellipse cx="${gx}" cy="256" rx="44" ry="8" fill="#eef6fb" stroke="#6f8580" stroke-width="3"/>`;
      for (let k = 0; k < 7; k += 1) {
        const x = gx - 80 + noise(k * 5 + 3) * 160;
        const y = 236 + noise(k * 5 + 4) * 26;
        out += `<polygon points="${n(x)},${n(y)} ${n(x + 14)},${n(y - 10)} ${n(x + 8)},${n(y + 6)}" fill="#eef6fb" stroke="#6f8580" stroke-width="2"/>`;
      }
      out += txt(gx, 150, '碎了！', { size: 24, bold: true, color: HOT });
    } else {
      const wob = 20 * amp * Math.sin(t * 30);
      out += `<path d="M${n(gx - 58 - wob)} ${top} Q${n(gx - 62 - wob)} 196 ${gx} 210 Q${n(gx + 62 + wob)} 196 ${n(gx + 58 + wob)} ${top}" fill="#eef6fb" fill-opacity="0.7" stroke="#6f8580" stroke-width="3"/>`;
      out += `<ellipse cx="${gx}" cy="${top}" rx="${n(58 + wob)}" ry="9" fill="#f7fbfe" stroke="#6f8580" stroke-width="3"/>`;
      out += `<line x1="${gx}" y1="210" x2="${gx}" y2="252" stroke="#6f8580" stroke-width="4"/><ellipse cx="${gx}" cy="256" rx="44" ry="8" fill="#eef6fb" stroke="#6f8580" stroke-width="3"/>`;
    }
    for (let k = 0; k < 4; k += 1) {
      const phase = (t * 1.2 + k / 4) % 1;
      out += wavefront(262, 150, 10 + phase * 76, -1, SOUND, (1 - phase) * (s.loud ? 1 : 0.4), s.loud ? 3.5 : 2);
    }
    out += `<text x="290" y="168" font-size="44" text-anchor="middle">🗣️</text>`;
    const [px, py, pw, ph] = [340, 70, 196, 140];
    const fx = (f: number): number => px + ((f - 500) / 600) * pw;
    const curve: [number, number][] = Array.from({ length: 121 }, (_, i) => {
      const f = 500 + i * 5;
      return [fx(f), py + ph - glassResponse(f) * (ph - 10)];
    });
    out += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="#fff" stroke="#e7dccb" stroke-width="2"/>`;
    out += `<line x1="${fx(GLASS_F)}" y1="${py}" x2="${fx(GLASS_F)}" y2="${py + ph}" stroke="${NOTE}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    out += `<polyline points="${poly(curve)}" fill="none" stroke="${ECHO}" stroke-width="2.5"/>`;
    out += `<circle cx="${n(fx(s.f))}" cy="${n(py + ph - match * (ph - 10))}" r="7" fill="${HOT}" stroke="${INK}" stroke-width="2"/>`;
    out += txt(px + pw / 2, py - 10, '杯子跟着振动有多猛', { size: 13, color: NOTE });
    out += txt(fx(GLASS_F), py + ph + 18, `杯子自己的频率 约 ${GLASS_F} 赫兹`, { size: 12, color: NOTE });
    out += txt(px, py + ph + 36, '500', { anchor: 'start', size: 11, color: NOTE }) + txt(px + pw, py + ph + 36, '1100 赫兹', { anchor: 'end', size: 11, color: NOTE });
    const line = match > 0.9
      ? (s.loud ? (broken ? '频率对准了，声音又够大：杯子碎了' : '频率对准了：杯壁越晃越厉害……') : '频率对准了，可声音太小，杯子晃得不够')
      : match > 0.3 ? '差一点就对准了，杯子晃得还不够' : '频率没对上：再大声，杯子也只轻轻抖一下';
    out += txt(W / 2, 302, line, { size: 15, bold: true, color: match > 0.9 ? HOT : INK });
    return out;
  },
  readout(s) {
    const match = glassResponse(s.f);
    if (match > 0.9) return s.loud ? `${s.f} 赫兹正好对上杯子自己的频率，声音又够大：杯壁越晃越猛，最后碎了——这叫共振` : `${s.f} 赫兹对上了杯子的频率，可声音太小，杯子晃不碎`;
    return `${s.f} 赫兹没对上杯子自己的约 ${GLASS_F} 赫兹：杯子只跟着轻轻抖，晃的幅度只有对准时的 ${Math.round(match * 100)}%`;
  },
};

const WAYS = ['什么也不做', '在声源处：装消声器', '在传播途中：建隔音墙', '在人耳处：戴耳塞'];
const NOISE_HEARD = [1, 0.45, 0.5, 0.35];

export const noiseBlock: SimDef = {
  params: [{ key: 'way', label: '在哪儿挡噪声', min: 0, max: 3, step: 1, value: 0, labels: WAYS }],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const [sx, sy, wall] = [118, 196, 300];
    let out = `<rect x="0" y="222" width="${W}" height="${H - 222}" fill="#eadfca"/><rect x="0" y="222" width="270" height="40" fill="#c9c2b5"/>`;
    out += `<line x1="10" y1="242" x2="260" y2="242" stroke="#fff" stroke-width="3" stroke-dasharray="16 12"/>`;
    out += `<text x="70" y="226" font-size="54" text-anchor="middle">🚚</text>`;
    out += `<polygon points="400,120 470,74 540,120" fill="#d9776b" stroke="${INK}" stroke-width="2"/><rect x="410" y="120" width="120" height="102" fill="#f3e3c8" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="428" y="146" width="56" height="50" fill="#cfe5f7" stroke="${INK}" stroke-width="2"/>`;
    out += `<text x="456" y="190" font-size="34" text-anchor="middle">🧒</text>`;
    if (s.way === 1) out += `<rect x="96" y="210" width="34" height="16" rx="5" fill="#8b7a5c" stroke="${INK}" stroke-width="1.5"/>${txt(113, 280, '消声器', { size: 13, bold: true, color: HOT })}`;
    if (s.way === 2) out += `<rect x="${wall}" y="112" width="18" height="110" fill="#9aa7b3" stroke="${INK}" stroke-width="2"/>${txt(wall + 9, 104, '隔音墙', { size: 13, bold: true, color: HOT })}`;
    if (s.way === 3) out += `<circle cx="444" cy="174" r="4" fill="${HOT}"/><circle cx="468" cy="174" r="4" fill="${HOT}"/>${txt(456, 244, '耳塞', { size: 13, bold: true, color: HOT })}`;
    const loud = s.way === 1 ? 0.4 : 1;
    for (let k = 0; k < 5; k += 1) {
      const phase = (t * 0.7 + k / 5) % 1;
      const r = 14 + phase * 320;
      const past = sx + r * Math.cos(0.5) > wall;
      const fade = s.way === 2 && past ? 0.22 : 1;
      out += wavefront(sx, sy - 20, r, 1, SOUND, (1 - phase * 0.7) * loud * fade, 1 + 3 * loud * fade, 0.5);
    }
    out += meterBar(24, 52, 200, NOISE_HEARD[s.way], '传进耳朵的噪声（示意）', HOT);
    return out;
  },
  readout(s) {
    return [
      '什么也不做：卡车的噪声一路传进窗户，吵得睡不着',
      '在声源处减弱：给机器、车子装上消声器，噪声一出来就小了',
      '在传播途中阻断：隔音墙通常能让噪声降低大约 5 到 10 分贝，听起来最多小一半',
      '在人耳处防护：噪声照样传到身边，耳塞把它挡在耳朵口',
    ][s.way];
  },
};

const VOICE_WAYS = [
  { name: '自己边说边听（两路一起）', air: true, bone: true, bars: [0.92, 0.78, 0.66], tone: '浑厚、熟悉' },
  { name: '听手机录音（只有空气）', air: true, bone: false, bars: [0.42, 0.74, 0.68], tone: '偏细、偏亮，像陌生人' },
  { name: '捂住耳朵说话（主要是头骨）', air: false, bone: true, bars: [0.95, 0.52, 0.24], tone: '嗡嗡低沉，闷在脑子里' },
] as const;

export const boneVoice: SimDef = {
  params: [{ key: 'listen', label: '怎么听', min: 0, max: 2, step: 1, value: 0, labels: VOICE_WAYS.map(v => v.name) }],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const mode = VOICE_WAYS[clamp(Math.round(s.listen), 0, 2)];
    let out = `<circle cx="152" cy="144" r="76" fill="#fbe4cf" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<rect x="128" y="206" width="48" height="58" rx="14" fill="#fbe4cf" stroke="${INK}" stroke-width="2.2"/>`;
    out += `<circle cx="156" cy="228" r="8" fill="${HOT}"/>`;
    out += txt(156, 278, '声带振动', { size: 12.5, bold: true, color: HOT });
    out += `<circle cx="144" cy="142" r="14" fill="#fffdf8" stroke="${BLUE}" stroke-width="2.2"/>`;
    out += `<path d="M140 142 q6 -8 10 0 q-4 9 -11 3" fill="none" stroke="${BLUE}" stroke-width="2"/>`;
    out += txt(144, 118, '内耳耳蜗', { size: 12, bold: true, color: BLUE });
    out += `<ellipse cx="92" cy="146" rx="11" ry="20" fill="#f7d3b5" stroke="${INK}" stroke-width="2"/>`;
    if (Math.round(s.listen) === 2) {
      out += `<rect x="70" y="126" width="16" height="40" rx="7" fill="${HOT}"/>` + txt(54, 150, '捂住', { size: 12, color: HOT, bold: true });
    }
    if (Math.round(s.listen) === 1) {
      out += `<rect x="34" y="182" width="28" height="46" rx="6" fill="#343a40"/><circle cx="48" cy="196" r="5" fill="#74c0fc"/>`;
      out += txt(48, 244, '录音放出', { size: 11.5, color: BLUE });
    }
    if (mode.air) {
      for (let k = 0; k < 4; k += 1) {
        const u = (t * 0.9 + k / 4) % 1;
        const ax = 198 - u * 112;
        const ay = 222 - Math.sin(u * Math.PI) * 58 - u * 72;
        out += `<circle cx="${n(ax)}" cy="${n(ay)}" r="4" fill="${BLUE}" opacity="${n(0.9 - u * 0.4)}"/>`;
      }
      out += `<path d="M184 214 Q42 196 82 148" fill="none" stroke="${BLUE}" stroke-width="2.5" stroke-dasharray="6 4"/>`;
      out += txt(66, 92, '空气传声', { size: 12.5, bold: true, color: BLUE });
    }
    if (mode.bone) {
      for (let k = 0; k < 4; k += 1) {
        const u = (t * 1.2 + k / 4) % 1;
        out += `<circle cx="${n(154 - u * 10)}" cy="${n(220 - u * 72)}" r="4.5" fill="${HOT}"/>`;
      }
      out += `<line x1="154" y1="220" x2="145" y2="156" stroke="${HOT}" stroke-width="3.5" stroke-dasharray="5 3"/>`;
      out += txt(212, 184, '头骨直接传声', { anchor: 'start', size: 12.5, bold: true, color: HOT });
      out += txt(212, 201, '（特别擅长传低音）', { anchor: 'start', size: 11.5, color: '#8b7a5c' });
    }

    out += `<rect x="326" y="54" width="214" height="218" rx="14" fill="#f7efe1" stroke="#e2d5be" stroke-width="1.5"/>`;
    out += txt(433, 80, '传进内耳的声音成分', { size: 13.5, bold: true });
    const bands = ['低音', '中音', '高音'];
    mode.bars.forEach((v, i) => {
      const bx = 360 + i * 62;
      const bh = v * 124;
      const col = i === 0 && mode.bone ? HOT : BLUE;
      out += `<rect x="${bx}" y="98" width="32" height="130" rx="8" fill="#ebe1cf"/>`;
      out += `<rect x="${bx}" y="${n(228 - bh)}" width="32" height="${n(bh)}" rx="8" fill="${col}"/>`;
      out += txt(bx + 16, 248, bands[i], { size: 12.5, bold: i === 0 });
    });
    out += txt(W / 2, 26, `听起来：${mode.tone}`, { size: 15, bold: true, color: mode.bone ? INK : HOT });
    out += txt(W / 2, 304, '录音没坏——手机录下的，恰恰是别人平时听到的你', { size: 12.5, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    return [
      '平时自己说话：耳朵同时收到“空气传声”和“头骨传声（骨传导）”两路声音，头骨把低沉的振动放大了，所以你自己觉得声音浑厚饱满',
      '听手机录音：麦克风只收到了空气传过去的那一路，少了头骨加上的“低音滤镜”，听起来就变细、变高，但这正是别人一直听到的你',
      '捂住耳朵说话：空气那一路被挡在外面，几乎只剩头骨传进内耳的低频振动，声音就变得闷闷的、嗡嗡响',
    ][clamp(Math.round(s.listen), 0, 2)];
  },
};

