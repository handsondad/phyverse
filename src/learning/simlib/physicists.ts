import { W, H, INK, HOT, BLUE, WATER, n, clamp, rad, noise, txt, arrow, poly, type SimDef } from './kit';

/* ---------------- 物理学家的故事：墨子小孔、阿基米德王冠、伽利略斜面、居里静电计、吴健雄镜子 ---------------- */

const NOTE = '#8b7a5c';
const GOLD = '#f2c94c';
const SILVER = '#ced4da';

/* ---------- 墨子：小孔成倒像 ---------- */

/** 一个小人：head 在 headY 那头，脚在 footY 那头，倒过来画就是倒像 */
function figure(x: number, headY: number, footY: number, color: string, opacity = 1): string {
  const len = footY - headY;
  const r = Math.abs(len) * 0.13;
  const neck = headY + Math.sign(len) * r * 2;
  const hip = headY + len * 0.62;
  const arms = headY + len * 0.36;
  return `<g opacity="${n(opacity)}" stroke="${color}" stroke-width="4" stroke-linecap="round" fill="none">`
    + `<circle cx="${n(x)}" cy="${n(headY + Math.sign(len) * r)}" r="${n(r)}" fill="${color}"/>`
    + `<line x1="${n(x)}" y1="${n(neck)}" x2="${n(x)}" y2="${n(hip)}"/>`
    + `<line x1="${n(x - r * 1.6)}" y1="${n(arms)}" x2="${n(x + r * 1.6)}" y2="${n(arms)}"/>`
    + `<line x1="${n(x)}" y1="${n(hip)}" x2="${n(x - r * 1.2)}" y2="${n(footY)}"/>`
    + `<line x1="${n(x)}" y1="${n(hip)}" x2="${n(x + r * 1.2)}" y2="${n(footY)}"/></g>`;
}

const HOLES = ['针尖大的小孔', '手指粗的大孔'] as const;

export const pinhole: SimDef = {
  params: [
    { key: 'd', label: '人离小孔', min: 1, max: 4, step: 1, value: 2, labels: ['', '很近', '近', '远', '很远'] },
    { key: 'hole', label: '挡板上的孔', min: 0, max: 1, step: 1, value: 0, labels: [...HOLES] },
  ],
  animated: false,
  draw(s) {
    const [hx, hy, screen] = [300, 160, 476];
    const ox = hx - 40 - s.d * 40;
    const half = 44;
    const img = half * (screen - hx) / (hx - ox);
    let out = `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#2b2f3a"/>`;
    out += `<rect x="${hx - 5}" y="48" width="10" height="${hy - 48 - (s.hole ? 10 : 3)}" fill="#8b7a5c"/>`;
    out += `<rect x="${hx - 5}" y="${hy + (s.hole ? 10 : 3)}" width="10" height="${H - 20 - hy - (s.hole ? 10 : 3)}" fill="#8b7a5c"/>`;
    out += `<rect x="${screen}" y="16" width="14" height="${H - 32}" fill="#f8f1e3"/>`;
    out += `<circle cx="${n(ox)}" cy="${hy - half - 26}" r="10" fill="#ffd43b"/>`;
    out += figure(ox, hy - half, hy + half, '#ffd8a8');
    out += `<line x1="${n(ox)}" y1="${hy - half}" x2="${screen}" y2="${n(hy + img)}" stroke="#ffd43b" stroke-width="2" opacity="0.8"/>`;
    out += `<line x1="${n(ox)}" y1="${hy + half}" x2="${screen}" y2="${n(hy - img)}" stroke="${HOT}" stroke-width="2" opacity="0.8"/>`;
    const copies = s.hole ? [-12, -6, 0, 6, 12] : [0];
    for (const dy of copies) out += figure(screen - 16, hy + img + dy, hy - img + dy, '#ffd8a8', s.hole ? 0.28 : 1);
    out += txt(ox, 304, '被照亮的人', { size: 12, color: '#f1f3f5', plain: true });
    out += txt(hx + 12, 40, '挡板', { size: 12, color: '#f1f3f5', plain: true, anchor: 'start' });
    out += txt(screen + 7, 312, '屏', { size: 12, color: '#f1f3f5', plain: true });
    out += txt(20, 32, s.hole ? '孔太大：好多个像叠在一起，糊了' : '光走直线，在小孔处交叉：像倒过来了', { size: 13, bold: true, color: s.hole ? HOT : '#ffd43b', plain: true, anchor: 'start' });
    return out;
  },
  readout(s) {
    const k = 176 / (40 + s.d * 40);
    if (s.hole) return '孔开得太大，人身上每一点的光都穿过孔里许多位置，落到屏上一大片，叠在一起就模糊了';
    return `屏上的像是倒立的：头上来的光往下走，脚下来的光往上走。人离得${['', '很近', '近', '远', '很远'][s.d]}，像高约是人的 ${n(k)} 倍——离得越近像越大`;
  },
};

/* ---------- 牛顿：哪儿的苹果都朝地心掉 ---------- */

const PLACES = [
  { name: '英国伍尔索普', lat: 53, side: 1 },
  { name: '中国北京', lat: 40, side: -1 },
  { name: '赤道上', lat: 0, side: 1 },
  { name: '阿根廷', lat: -35, side: -1 },
  { name: '南极', lat: -90, side: 1 },
] as const;

export const appleEarth: SimDef = {
  params: [
    { key: 'place', label: '苹果树长在', min: 0, max: 4, step: 1, value: 0, labels: PLACES.map(p => p.name) },
    { key: 'all', label: '看', min: 0, max: 1, step: 1, value: 0, labels: ['这一棵树', '全世界的苹果一起看'] },
  ],
  animated: true,
  still: 0.6,
  draw(s, t) {
    const [cx, cy, R] = [280, 172, 100];
    const at = (lat: number, side: number, out: number): [number, number] => {
      const phi = rad(90 - lat);
      return [cx + side * Math.sin(phi) * (R + out), cy - Math.cos(phi) * (R + out)];
    };
    let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#a5d8ff" stroke="${INK}" stroke-width="2"/>`;
    out += `<path d="M${cx - 60} ${cy - 50} q30 -30 60 -10 q20 30 -10 50 q-40 10 -50 -40z M${cx + 20} ${cy + 20} q40 -10 50 20 q-10 40 -40 30z" fill="#8ce99a"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="5" fill="${HOT}"/>`;
    out += txt(cx, cy + 22, '地心', { size: 12, bold: true, color: HOT });
    const shown = s.all ? PLACES.map((_, i) => i) : [clamp(Math.round(s.place), 0, 4)];
    const u = (t % 1.6) / 1.6;
    for (const i of shown) {
      const p = PLACES[i];
      const [rx, ry] = at(p.lat, p.side, 0);
      const [tx, ty] = at(p.lat, p.side, 26);
      const [kx, ky] = at(p.lat, p.side, 38);
      out += `<line x1="${n(rx)}" y1="${n(ry)}" x2="${n(tx)}" y2="${n(ty)}" stroke="#8b5a2b" stroke-width="5"/>`;
      out += `<circle cx="${n(kx)}" cy="${n(ky)}" r="15" fill="#51cf66"/>`;
      const [ax, ay] = at(p.lat, p.side, 30 - u * u * 26);
      out += `<circle cx="${n(ax)}" cy="${n(ay)}" r="6" fill="#e03131" stroke="${INK}" stroke-width="1"/>`;
      out += `<line x1="${n(rx)}" y1="${n(ry)}" x2="${cx}" y2="${cy}" stroke="${HOT}" stroke-width="2" stroke-dasharray="6 5" opacity="0.8"/>`;
      const [lx, ly] = at(p.lat, p.side, 64);
      out += txt(lx, ly + 4, p.name, { size: 12, bold: !s.all, color: INK });
    }
    out += txt(20, 30, s.all ? '各地的“往下”都指向同一个地心' : '苹果不往旁边、不往上，总朝地心掉', { size: 14, bold: true, color: BLUE, anchor: 'start' });
    return out;
  },
  readout(s) {
    if (s.all) return '把全世界的苹果放在一起看：北京、阿根廷、南极的“往下”方向各不相同，却都指向同一个地心——是地球在把它们往中间拉';
    const p = PLACES[clamp(Math.round(s.place), 0, 4)];
    return `长在${p.name}的苹果，熟了也是垂直落向地面，正对着地心。牛顿问自己：苹果为什么不往旁边、不往上，偏偏总朝着地心掉？`;
  },
};

/* ---------- 法拉第：铁环上的两组线圈 ---------- */

const MOMENTS = ['电池没接上', '刚接通的一刹那', '一直接通着', '刚断开的一刹那'] as const;

export const faradayRing: SimDef = {
  params: [
    { key: 'moment', label: '左边线圈', min: 0, max: 3, step: 1, value: 1, labels: [...MOMENTS] },
    { key: 'coils', label: '左边的导线', min: 0, max: 1, step: 1, value: 0, labels: ['只接一段', '三段连成一组'] },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const m = clamp(Math.round(s.moment), 0, 3);
    const [cx, cy, R] = [240, 170, 78];
    const on = m === 1 || m === 2;
    let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#868e96" stroke-width="22"/>`;
    for (let i = 0; i < 9; i += 1) {
      const a = rad(130 + i * 12.5);
      const [x1, y1] = [cx + Math.cos(a) * (R - 15), cy + Math.sin(a) * (R - 15)];
      const [x2, y2] = [cx + Math.cos(a) * (R + 15), cy + Math.sin(a) * (R + 15)];
      out += `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="#d9480f" stroke-width="${s.coils ? 4 : 3}"/>`;
      const b = rad(-50 + i * 12.5);
      out += `<line x1="${n(cx + Math.cos(b) * (R - 15))}" y1="${n(cy + Math.sin(b) * (R - 15))}" x2="${n(cx + Math.cos(b) * (R + 15))}" y2="${n(cy + Math.sin(b) * (R + 15))}" stroke="#c2255c" stroke-width="3"/>`;
    }
    out += `<path d="M${cx - R - 14} ${cy + 30} L60 ${cy + 30} L60 286 L90 286" fill="none" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="90" y="272" width="56" height="28" rx="4" fill="#ffe066" stroke="${INK}" stroke-width="2"/>`;
    out += txt(118, 291, '电池', { size: 12, bold: true });
    out += `<path d="M146 286 L170 286" stroke="${INK}" stroke-width="2"/>`;
    out += `<line x1="170" y1="286" x2="${on ? 200 : 196}" y2="${on ? 286 : 268}" stroke="${on ? HOT : INK}" stroke-width="3"/>`;
    out += `<path d="M200 286 L${cx - R} 286 L${cx - R} ${cy + 46}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    out += txt(186, 262, on ? '开关合上' : '开关断开', { size: 11, color: on ? HOT : NOTE });
    out += `<path d="M${cx + R + 14} ${cy - 30} L440 ${cy - 30} L440 120 M${cx + R + 14} ${cy + 30} L500 ${cy + 30} L500 120" fill="none" stroke="${INK}" stroke-width="2"/>`;
    out += `<circle cx="470" cy="90" r="40" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
    const amp = (s.coils ? 50 : 25) * (m === 1 ? 1 : m === 3 ? -1 : 0);
    const tt = t % 3;
    const angle = amp * Math.exp(-tt * 1.2) * Math.cos(tt * 6);
    out += `<g transform="rotate(${n(angle)} 470 90)"><polygon points="${poly([[470, 56], [464, 90], [476, 90]])}" fill="${HOT}"/><polygon points="${poly([[470, 124], [464, 90], [476, 90]])}" fill="#adb5bd"/></g>`;
    out += txt(470, 150, '小磁针', { size: 12, bold: true });
    out += txt(cx - R - 34, cy - 50, '线圈 A', { size: 12, bold: true, color: '#d9480f' });
    out += txt(cx + R + 40, cy + 64, '线圈 B', { size: 12, bold: true, color: '#c2255c' });
    out += txt(cx, cy + 4, '铁环', { size: 12, color: NOTE });
    const head = m === 1 ? '一接通：B 里冒出一下电流，磁针一跳！' : m === 3 ? '一断开：磁针往反方向跳一下' : m === 2 ? '一直通着：磁针摆几下又回原位' : '没通电：什么也没发生';
    out += txt(20, 30, head, { size: 14, bold: true, color: amp ? HOT : BLUE, anchor: 'start' });
    return out;
  },
  readout(s) {
    const m = clamp(Math.round(s.moment), 0, 3);
    const more = s.coils ? '左边三段导线连成一组，磁针跳得更厉害。' : '';
    if (m === 0) return '左边线圈 A 没通电，铁环里没有磁场，右边线圈 B 也没有电流，磁针安安静静';
    if (m === 2) return '电一直通着，铁环里的磁场稳稳的不再变化，线圈 B 里就没有电流了——磁针摆几下，回到原来的位置';
    if (m === 1) return `接通的一刹那，铁环里的磁场从无到有，线圈 B 里冒出一股短短的电流，磁针跳了一下。${more}`;
    return `断开的一刹那，磁场从有到无，线圈 B 里又冒出一股电流，方向和刚才相反，磁针往另一边跳。${more}`;
  },
};

/* ---------- 阿基米德与伽利略：水里称王冠 ---------- */

const GOLD_DENSITY = 19.3;
const SILVER_DENSITY = 10.5;
const CROWN_MASS = 1000;

export const crownBalance: SimDef = {
  params: [
    { key: 'silver', label: '王冠里偷掺的银', min: 0, max: 50, step: 10, value: 30, unit: '%' },
    { key: 'water', label: '在哪儿称', min: 0, max: 1, step: 1, value: 1, labels: ['空气里', '浸在水里'] },
  ],
  animated: false,
  draw(s) {
    const f = s.silver / 100;
    const crownV = CROWN_MASS * ((1 - f) / GOLD_DENSITY + f / SILVER_DENSITY);
    const goldV = CROWN_MASS / GOLD_DENSITY;
    const diff = s.water ? crownV - goldV : 0;
    const tilt = clamp(diff * 1.3, 0, 20);
    const [cx, cy, arm] = [280, 92, 160];
    const a = rad(tilt);
    const left: [number, number] = [cx - arm * Math.cos(a), cy - arm * Math.sin(a)];
    const right: [number, number] = [cx + arm * Math.cos(a), cy + arm * Math.sin(a)];
    let out = `<polygon points="${poly([[cx - 40, 300], [cx + 40, 300], [cx + 8, cy], [cx - 8, cy]])}" fill="#c8955b"/>`;
    out += `<line x1="${n(left[0])}" y1="${n(left[1])}" x2="${n(right[0])}" y2="${n(right[1])}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="8" fill="${INK}"/>`;
    for (const [px, py, label, isCrown] of [[left[0], left[1], '王冠', true], [right[0], right[1], '纯金块', false]] as const) {
      const bottom = py + 100;
      out += `<line x1="${n(px)}" y1="${n(py)}" x2="${n(px)}" y2="${n(bottom - 34)}" stroke="${NOTE}" stroke-width="2"/>`;
      if (s.water) out += `<rect x="${n(px - 56)}" y="${n(bottom - 40)}" width="112" height="74" rx="8" fill="${WATER}" stroke="#7fa7c9" stroke-width="2"/>`;
      if (isCrown) {
        const wGap = 30 + f * 20;
        out += `<polygon points="${poly([[px - wGap, bottom - 4], [px - wGap, bottom - 32], [px - wGap / 2, bottom - 18], [px, bottom - 38], [px + wGap / 2, bottom - 18], [px + wGap, bottom - 32], [px + wGap, bottom - 4]])}" fill="${f ? '#e0c46b' : GOLD}" stroke="${INK}" stroke-width="2"/>`;
        if (f) out += `<rect x="${n(px - wGap * 0.6)}" y="${n(bottom - 14)}" width="${n(wGap * 1.2 * f * 1.6)}" height="8" fill="${SILVER}"/>`;
      } else {
        out += `<rect x="${n(px - 22)}" y="${n(bottom - 26)}" width="44" height="22" rx="3" fill="${GOLD}" stroke="${INK}" stroke-width="2"/>`;
      }
      out += txt(px, bottom + 50 - (s.water ? 0 : 8), label, { size: 13, bold: true });
    }
    out += txt(cx, 30, s.water
      ? (diff > 0.5 ? `王冠多排开约 ${Math.round(diff)} 克水，被托得更轻，翘起来了！` : '两边排开的水一样多：真是纯金')
      : '在空气里，两边都是 1000 克，天平平平的', { size: 14, bold: true, color: diff > 0.5 ? HOT : BLUE });
    return out;
  },
  readout(s) {
    const f = s.silver / 100;
    const crownV = CROWN_MASS * ((1 - f) / GOLD_DENSITY + f / SILVER_DENSITY);
    const goldV = CROWN_MASS / GOLD_DENSITY;
    if (!s.water) return `在空气里称：王冠和金块都是 1000 克，天平看不出谁掺了假`;
    if (!f) return `浸在水里：纯金王冠和金块的体积都约 ${Math.round(goldV)} 立方厘米，排开的水一样多，天平依旧平衡`;
    return `浸在水里：掺了 ${s.silver}% 银的王冠体积约 ${Math.round(crownV)} 立方厘米，比金块多排开约 ${Math.round(crownV - goldV)} 克水，浮力更大，王冠那头翘起来——掺假露馅了`;
  },
};

/* ---------- 伽利略：斜面上的铃铛 ---------- */

const TILTS = ['很缓', '中等', '陡一些'] as const;
const BEATS = [1, 0.75, 0.6];

export const galileoRamp: SimDef = {
  params: [
    { key: 'tilt', label: '斜面', min: 0, max: 2, step: 1, value: 0, labels: [...TILTS] },
    { key: 'ball', label: '滚下来的球', min: 0, max: 1, step: 1, value: 0, labels: ['铁球', '木球'] },
  ],
  animated: true,
  still: 3.2,
  draw(s, t) {
    const beat = BEATS[s.tilt];
    const rise = [70, 120, 170][s.tilt];
    const [x0, x1, ground] = [60, 520, 270];
    const y0 = ground - rise;
    const along = (u: number): [number, number] => [x0 + (x1 - x0) * u, y0 + (ground - y0) * u];
    let out = `<polygon points="${poly([[x0, y0 + 8], [x1, ground + 8], [x1, ground + 22], [x0, ground + 22]])}" fill="#d9b98a" stroke="${INK}" stroke-width="2"/>`;
    const loop = beat * 4 + 1.4;
    const local = t % loop;
    const units = Math.min((local / beat) ** 2, 16);
    [1, 4, 9, 16].forEach((mark, i) => {
      const [bx, by] = along(mark / 16);
      const rung = units >= mark && units < mark + 2.5;
      out += `<line x1="${n(bx)}" y1="${n(by - 4)}" x2="${n(bx)}" y2="${n(by - 34)}" stroke="${INK}" stroke-width="2"/>`;
      out += `<path d="M${n(bx - 10)} ${n(by - 30)} q10 -22 20 0 z" fill="${rung ? HOT : GOLD}" stroke="${INK}" stroke-width="1.5"/>`;
      if (rung) out += `<circle cx="${n(bx)}" cy="${n(by - 34)}" r="18" fill="none" stroke="${HOT}" stroke-width="2" opacity="0.7"/>`;
      out += txt(bx, by - 58, `第${i + 1}拍`, { size: 11, color: NOTE });
      const prev = i ? [1, 4, 9][i - 1] : 0;
      const [mx, my] = along((prev + mark) / 32);
      out += txt(mx, my + 30, `${2 * i + 1} 份`, { size: 13, bold: true, color: BLUE });
    });
    const [bx, by] = along(units / 16);
    const r = s.ball ? 13 : 11;
    out += `<circle cx="${n(bx)}" cy="${n(by - r)}" r="${r}" fill="${s.ball ? '#b07a45' : '#868e96'}" stroke="${INK}" stroke-width="2"/>`;
    const swing = Math.sin((Math.PI * local) / beat) * 0.5;
    const [px, py] = [470, 40];
    out += `<line x1="${px}" y1="${py}" x2="${n(px + 60 * Math.sin(swing))}" y2="${n(py + 60 * Math.cos(swing))}" stroke="${INK}" stroke-width="2"/>`;
    out += `<circle cx="${n(px + 60 * Math.sin(swing))}" cy="${n(py + 60 * Math.cos(swing))}" r="8" fill="${BLUE}"/>`;
    out += txt(px, py + 84, '摆每摆一下 = 一拍', { size: 12, color: NOTE });
    out += txt(150, 30, '一拍比一拍多走：1、3、5、7', { size: 14, bold: true, color: BLUE });
    return out;
  },
  readout(s) {
    return `斜面${TILTS[s.tilt]}、${s.ball ? '木球' : '铁球'}：每过一拍，小球多走 1、3、5、7 份路，累计 1、4、9、16 份——走过的路和时间的平方成正比。斜面越陡整体越快，比例不变；铁球木球也一样`;
  },
};

/* ---------- 居里夫人：天平称不出，静电计量得出 ---------- */

const ROUNDS = ['刚运来的矿渣', '第 1 轮提炼', '第 2 轮提炼', '第 3 轮提炼', '最后一小撮'] as const;
const ACTIVITY = [0.08, 0.2, 0.38, 0.65, 1];

export const radiumRefine: SimDef = {
  params: [
    { key: 'round', label: '提炼到', min: 0, max: 4, step: 1, value: 2, labels: [...ROUNDS] },
    { key: 'tool', label: '用什么来量', min: 0, max: 1, step: 1, value: 1, labels: ['天平', '静电计'] },
  ],
  animated: true,
  still: 1,
  draw(s, t) {
    const r = clamp(Math.round(s.round), 0, 4);
    const pile = 120 * (1 - r / 5) + 10;
    let out = `<rect x="16" y="40" width="250" height="250" rx="14" fill="#f3ead8"/>`;
    out += `<path d="M${n(140 - pile)} 260 Q140 ${n(260 - pile * 1.2)} ${n(140 + pile)} 260 Z" fill="#6b5b4b"/>`;
    for (let i = 0; i < 6; i += 1) out += `<circle cx="${n(140 - pile * 0.6 + noise(i) * pile * 1.2)}" cy="${n(250 - noise(i + 9) * pile * 0.5)}" r="3" fill="#9c8670"/>`;
    out += txt(140, 284, ROUNDS[r], { size: 13, bold: true });
    const glow = ACTIVITY[r];
    out += `<circle cx="140" cy="76" r="${n(8 + glow * 14 + Math.sin(t * 4) * 2 * glow)}" fill="#a9e34b" opacity="${n(0.25 + glow * 0.6)}"/>`;
    out += txt(140, 112, '提出来的一小撮', { size: 12, color: NOTE });
    out += `<rect x="290" y="40" width="254" height="250" rx="14" fill="#fffdf8" stroke="#e2d5be" stroke-width="1.5"/>`;
    if (s.tool) {
      out += txt(417, 72, '静电计：看它让空气导电多快', { size: 13, bold: true, color: BLUE });
      out += `<rect x="320" y="120" width="194" height="26" rx="13" fill="#ebe1cf"/>`;
      out += `<rect x="320" y="120" width="${n(194 * glow)}" height="26" rx="13" fill="#5c940d"/>`;
      out += txt(417, 178, r === 4 ? '比铀强约 300 倍！' : r === 0 ? '比铀含量该有的强 4 到 5 倍' : '越提越强', { size: 15, bold: true, color: r === 4 ? HOT : INK });
      out += txt(417, 236, '它一定藏着新元素', { size: 13, color: NOTE });
    } else {
      out += txt(417, 72, '天平：只能称出有多重', { size: 13, bold: true, color: NOTE });
      out += `<line x1="347" y1="160" x2="487" y2="160" stroke="${INK}" stroke-width="5"/><polygon points="${poly([[417, 160], [405, 220], [429, 220]])}" fill="#c8955b"/>`;
      out += `<circle cx="352" cy="146" r="${n(4 + 10 * (1 - r / 5))}" fill="#6b5b4b"/>`;
      out += txt(417, 256, '越提越少，看不出它有多“活泼”', { size: 13, bold: true, color: HOT });
    }
    return out;
  },
  readout(s) {
    const r = clamp(Math.round(s.round), 0, 4);
    if (!s.tool) return `用天平：${ROUNDS[r]}只会越称越轻，新元素混在里面的那一点点，天平根本称不出来`;
    if (r === 0) return '用静电计：沥青铀矿渣让空气导电的本领，比按它含的铀算出来的还强 4 到 5 倍——里面一定藏着更“活泼”的新东西';
    if (r === 4) return '用静电计：一轮轮把不活泼的部分去掉，留下的一小撮比铀强约 300 倍，居里夫妇宣布发现了新元素钋';
    return `用静电计：${ROUNDS[r]}后，剩下的越来越少，可它让空气导电越来越快——活泼的东西被一点点集中起来了`;
  },
};

/* ---------- 吴健雄：镜子里的世界不一样 ---------- */

export const parityMirror: SimDef = {
  params: [
    { key: 'cold', label: '钴原子核', min: 0, max: 1, step: 1, value: 1, labels: ['常温：乱转', '冻到接近零下 273 ℃：排整齐'] },
    { key: 'mirror', label: '看', min: 0, max: 1, step: 1, value: 0, labels: ['真实的实验', '镜子里的样子'] },
  ],
  animated: true,
  still: 1.4,
  draw(s, t) {
    const [cx, cy] = [200, 165];
    const aligned = Boolean(s.cold);
    const upShare = aligned ? 0.3 : 0.5;
    let out = `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="${s.mirror ? '#eef3fb' : '#fbf6ec'}"/>`;
    if (s.mirror) out += `<rect x="12" y="12" width="${W - 24}" height="${H - 24}" rx="10" fill="none" stroke="#a5c3e6" stroke-width="3" stroke-dasharray="10 6"/>`;
    for (let i = 0; i < 20; i += 1) {
      const up = noise(i * 7 + 1) < upShare;
      const u = (t * 0.7 + i / 20) % 1;
      const spread = (noise(i * 3 + 2) - 0.5) * 1.6;
      const dir = up ? -1 : 1;
      const x = cx + spread * u * 70;
      const y = cy + dir * (24 + u * 96);
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="4" fill="${up ? HOT : BLUE}" opacity="${n(1 - u * 0.7)}"/>`;
    }
    out += `<circle cx="${cx}" cy="${cy}" r="22" fill="#9775fa" stroke="${INK}" stroke-width="2"/>`;
    out += txt(cx, cy + 5, '钴', { size: 13, bold: true, color: '#fff', plain: true });
    if (aligned) {
      const spinUp = !s.mirror;
      out += arrow(cx + 40, cy + (spinUp ? 26 : -26), cx + 40, cy + (spinUp ? -30 : 30), '#7048e8', 4);
      const sweep = spinUp ? 0 : 1;
      out += `<path d="M${cx - 30} ${cy - 30} A40 14 0 1 ${sweep} ${cx + 30} ${cy - 30}" fill="none" stroke="#7048e8" stroke-width="2.5"/>`;
      out += txt(cx + 52, cy + 4, '自转方向', { size: 12, color: '#7048e8', anchor: 'start' });
    } else {
      out += txt(cx, cy - 40, '方向乱七八糟', { size: 12, color: NOTE });
    }
    const up = Math.round(upShare * 100);
    out += `<rect x="350" y="70" width="180" height="180" rx="12" fill="#fff" stroke="#e2d5be" stroke-width="1.5"/>`;
    out += txt(440, 100, '飞出来的电子', { size: 13, bold: true });
    out += txt(440, 140, `往上 ${up} 个`, { size: 16, bold: true, color: HOT });
    out += txt(440, 172, `往下 ${100 - up} 个`, { size: 16, bold: true, color: BLUE });
    out += txt(440, 218, '（每 100 个，比例是示意）', { size: 11, color: NOTE });
    const head = !aligned ? '原子核乱转：上下一样多，看不出偏心' : s.mirror ? '镜子里：自转反了，电子却顺着自转多飞' : '真实实验：电子总往和自转相反的一头多飞';
    out += txt(W / 2, 32, head, { size: 14, bold: true, color: aligned ? (s.mirror ? HOT : BLUE) : INK });
    if (aligned && s.mirror) out += txt(W / 2, 304, '真实世界做不出这个结果：镜子里的那一套不成立！', { size: 13, bold: true, color: HOT });
    return out;
  },
  readout(s) {
    if (!s.cold) return '常温下钴原子核的自转方向乱七八糟，电子往各个方向飞得一样多，什么也看不出来';
    if (s.mirror) return '照镜子：原子核的自转方向反了过来，电子却还是往下多飞，变成顺着自转飞。真实实验里从来做不出这个结果——镜子里的世界和真实世界不一样，宇宙原来分得出左和右';
    return '冻到只比零下 273 ℃ 高一点点，再加磁场把钴原子核的自转排整齐：衰变放出的电子总是往和自转相反的那头飞得多，上下不对称';
  },
};