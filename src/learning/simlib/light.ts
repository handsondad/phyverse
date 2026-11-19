import { W, H, INK, HOT, BLUE, WATER, n, r1, clamp, rad, deg, txt, arrow, poly, type State, type SimDef } from './kit';

/* ---------------- 光与颜色 ---------------- */

const MEDIA = ['水', '玻璃'];
const INDEX = [1.33, 1.5];

function refractionGeometry(s: State) {
  const surface = 140;
  const depth = 130;
  const P: [number, number] = [230 + 0.55 * depth, surface + depth];
  const ta = rad(Math.max(s.view, 0.01));
  const tw = Math.asin(Math.sin(ta) / INDEX[s.medium]);
  const S: [number, number] = [P[0] + depth * Math.tan(tw), surface];
  const apparent = s.view < 1 ? depth / INDEX[s.medium] : (depth * Math.tan(tw)) / Math.tan(ta);
  return { surface, depth, P, S, ta, apparent };
}

export const refraction: SimDef = {
  params: [
    { key: 'view', label: '眼睛斜着看的角度', min: 0, max: 70, step: 5, value: 45, unit: '°' },
    { key: 'medium', label: '碗里装的是', min: 0, max: 1, step: 1, value: 0, labels: MEDIA },
  ],
  animated: true,
  still: 0.6,
  draw(s, t) {
    const { surface, P, S, ta, apparent } = refractionGeometry(s);
    const E: [number, number] = [230, surface];
    const U: [number, number] = [230 - 0.55 * 110, surface - 110];
    const len = 190;
    const eye: [number, number] = [S[0] + Math.sin(ta) * len, surface - Math.cos(ta) * len];
    const Pa: [number, number] = [P[0], surface + apparent];
    let out = `<rect x="20" y="${surface}" width="${W - 40}" height="${H - surface - 10}" rx="6" fill="${s.medium ? '#dfeef2' : WATER}"/>`;
    out += `<line x1="20" y1="${surface}" x2="${W - 20}" y2="${surface}" stroke="#7fb3dc" stroke-width="3"/>`;
    out += `<line x1="${n(U[0])}" y1="${n(U[1])}" x2="${E[0]}" y2="${E[1]}" stroke="#c8955b" stroke-width="9" stroke-linecap="round"/>`;
    out += `<line x1="${E[0]}" y1="${E[1]}" x2="${n(P[0])}" y2="${n(P[1])}" stroke="#c8955b" stroke-width="9" stroke-linecap="round" opacity="0.28"/>`;
    out += `<line x1="${E[0]}" y1="${E[1]}" x2="${n(Pa[0])}" y2="${n(Pa[1])}" stroke="#c8955b" stroke-width="9" stroke-linecap="round"/>`;
    out += `<line x1="${n(S[0])}" y1="${n(S[1])}" x2="${n(Pa[0])}" y2="${n(Pa[1])}" stroke="${BLUE}" stroke-width="2" stroke-dasharray="6 5"/>`;
    out += `<polyline points="${poly([P, S, eye])}" fill="none" stroke="#ffb703" stroke-width="3.5"/>`;
    for (let k = 0; k < 4; k += 1) {
      const u = ((t * 0.5 + k / 4) % 1);
      const first = Math.hypot(S[0] - P[0], S[1] - P[1]);
      const total = first + len;
      const d = u * total;
      const [x, y] = d < first
        ? [P[0] + ((S[0] - P[0]) * d) / first, P[1] + ((S[1] - P[1]) * d) / first]
        : [S[0] + Math.sin(ta) * (d - first), surface - Math.cos(ta) * (d - first)];
      out += `<circle cx="${n(x)}" cy="${n(y)}" r="4.5" fill="#ffb703" stroke="#fff" stroke-width="1.5"/>`;
    }
    out += `<line x1="${n(S[0])}" y1="${surface - 70}" x2="${n(S[0])}" y2="${surface + 70}" stroke="#8b7a5c" stroke-width="1.5" stroke-dasharray="3 5"/>`;
    out += `<text x="${n(clamp(eye[0], 30, W - 30))}" y="${n(clamp(eye[1], 26, H - 10))}" font-size="30" text-anchor="middle" dominant-baseline="central">👁️</text>`;
    out += txt(P[0] + 14, P[1] + 4, '筷子尖其实在这', { anchor: 'start', size: 13, color: '#8b7a5c' });
    out += txt(Pa[0] + 14, Pa[1] + 4, '看起来在这', { anchor: 'start', size: 13, color: BLUE, bold: true });
    out += txt(40, surface - 10, '空气', { anchor: 'start', size: 13, color: '#8b7a5c' });
    out += txt(40, surface + 24, MEDIA[s.medium], { anchor: 'start', size: 13, color: '#2f7fbf' });
    return out;
  },
  readout(s) {
    const { depth, apparent } = refractionGeometry(s);
    return `从${s.view ? `斜 ${s.view}°` : '正上方'}看${MEDIA[s.medium]}里的筷子尖：看起来只有实际深度的 ${Math.round((apparent / depth) * 100)}%，筷子就像在水面“折”了一下`;
  },
};

const RAINBOW: readonly (readonly [string, number, string])[] = [
  ['红', 1.613, '#e03131'], ['橙', 1.618, '#f76707'], ['黄', 1.622, '#f2c200'], ['绿', 1.628, '#2f9e44'],
  ['蓝', 1.638, '#1c7ed6'], ['靛', 1.645, '#4c3fbf'], ['紫', 1.652, '#9c36b5'],
];
/** 真实玻璃里红紫只差一点点，画面把差别放大 3 倍才看得清 */
const SPREAD = 3;

type V2 = [number, number];
function refract(d: V2, normal: V2, eta: number): V2 | undefined {
  const cosi = -(normal[0] * d[0] + normal[1] * d[1]);
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return undefined;
  const a = eta * cosi - Math.sqrt(k);
  return [eta * d[0] + a * normal[0], eta * d[1] + a * normal[1]];
}

function prismRays(incidence: number) {
  const A: V2 = [280, 64];
  const C: V2 = [390, 254];
  const M: V2 = [225, 159];
  const nin: V2 = [0.866, 0.5];
  const tA: V2 = [0.5, -0.866];
  const i = rad(incidence);
  const d: V2 = [Math.cos(i) * nin[0] + Math.sin(i) * tA[0], Math.cos(i) * nin[1] + Math.sin(i) * tA[1]];
  return {
    M, d,
    rays: RAINBOW.map(([name, index, color]) => {
      const nn = 1.613 + (index - 1.613) * SPREAD;
      const inside = refract(d, [-0.866, -0.5], 1 / nn)!;
      const ex = C[0] - A[0];
      const ey = C[1] - A[1];
      const den = inside[0] * ey - inside[1] * ex;
      const u = ((A[0] - M[0]) * ey - (A[1] - M[1]) * ex) / den;
      const X: V2 = [M[0] + inside[0] * u, M[1] + inside[1] * u];
      const out = refract(inside, [-0.866, 0.5], nn);
      const turn = out ? deg(Math.acos(clamp(d[0] * out[0] + d[1] * out[1], -1, 1))) : undefined;
      return { name, color, X, out, turn };
    }),
  };
}

export const prism: SimDef = {
  params: [
    { key: 'i', label: '光射到三棱镜上的角度', min: 30, max: 70, step: 5, value: 50, unit: '°' },
    { key: 'only', label: '射进去的光', min: 0, max: 1, step: 1, value: 0, labels: ['白光', '只有红光'] },
  ],
  animated: false,
  draw(s) {
    const { M, d, rays } = prismRays(s.i);
    const shown = s.only ? rays.slice(0, 1) : rays;
    let out = `<polygon points="280,64 170,254 390,254" fill="#eaf4fb" fill-opacity="0.85" stroke="#7fa7c9" stroke-width="3"/>`;
    const start: V2 = [M[0] - d[0] * 240, M[1] - d[1] * 240];
    out += `<line x1="${n(start[0])}" y1="${n(start[1])}" x2="${M[0]}" y2="${M[1]}" stroke="#d8cfc2" stroke-width="8" stroke-linecap="round"/>`;
    out += `<line x1="${n(start[0])}" y1="${n(start[1])}" x2="${M[0]}" y2="${M[1]}" stroke="${s.only ? '#e03131' : '#fffdf7'}" stroke-width="4" stroke-linecap="round"/>`;
    for (const ray of shown) {
      out += `<line x1="${M[0]}" y1="${M[1]}" x2="${n(ray.X[0])}" y2="${n(ray.X[1])}" stroke="${ray.color}" stroke-width="2.5" opacity="0.85"/>`;
      if (ray.out) {
        const end: V2 = [ray.X[0] + ray.out[0] * 260, ray.X[1] + ray.out[1] * 260];
        out += `<line x1="${n(ray.X[0])}" y1="${n(ray.X[1])}" x2="${n(end[0])}" y2="${n(end[1])}" stroke="${ray.color}" stroke-width="3.5"/>`;
      }
    }
    const first = shown[0];
    const last = shown[shown.length - 1];
    if (first.out) out += txt(Math.min(first.X[0] + first.out[0] * 170, W - 20), first.X[1] + first.out[1] * 170 - 8, '红', { color: first.color, bold: true });
    if (!s.only && last.out) out += txt(Math.min(last.X[0] + last.out[0] * 170, W - 20), last.X[1] + last.out[1] * 170 + 20, '紫', { color: last.color, bold: true });
    if (!first.out) out += txt(280, 290, '光在玻璃里被全部反射回去了（全反射）', { size: 14, color: HOT });
    out += txt(start[0] + 10, start[1] - 12, s.only ? '红光' : '白光', { anchor: 'start', size: 14 });
    return out;
  },
  readout(s) {
    const { rays } = prismRays(s.i);
    const red = rays[0].turn;
    const violet = rays[rays.length - 1].turn;
    if (red === undefined || violet === undefined) return '这个角度下光出不去了：在玻璃里发生全反射';
    if (s.only) return `只有红光：拐了 ${n(red)}°，出来还是红光——三棱镜不会“造”颜色，只会把混在一起的颜色分开`;
    return `红光拐了 ${n(red)}°，紫光拐了 ${n(violet)}°：紫光拐得更多，白光就被拉开成一道彩带（画面把差别放大了）`;
  },
};

const GLOW = '#ffb703';
const NOTE = '#8b7a5c';

function bar(x: number, y: number, w: number, value: number, label: string, color: string): string {
  return txt(x, y - 8, label, { anchor: 'start', size: 13, color: NOTE })
    + `<rect x="${x}" y="${y}" width="${w}" height="14" rx="7" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`
    + `<rect x="${x}" y="${y}" width="${n(w * clamp(value, 0, 1))}" height="14" rx="7" fill="${color}"/>`;
}

function lerp2(a: V2, b: V2, u: number): V2 {
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
}

const LAMP = [1, 0.15, 0];
const LAMP_LABELS = ['灯亮着', '灯调得很暗', '灯全关了'];
const VIEWERS = ['小念', '小猫'];
/** 暗处小猫比人看得清得多，可一点光都没有，谁也看不见 */
const SEEN = [[1, 0.3, 0], [1, 0.85, 0]];

export const seeLight: SimDef = {
  params: [
    { key: 'lamp', label: '屋里的灯', min: 0, max: 2, step: 1, value: 0, labels: LAMP_LABELS },
    { key: 'who', label: '谁在看', min: 0, max: 1, step: 1, value: 0, labels: VIEWERS },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const b = LAMP[s.lamp];
    const bulb: V2 = [150, 78];
    const apple: V2 = [430, 206];
    const eye: V2 = [118, 210];
    let out = `<rect x="0" y="0" width="${W}" height="${H}" fill="#fff8e8"/>`;
    out += `<rect x="330" y="236" width="200" height="14" rx="4" fill="#c8955b" stroke="${INK}" stroke-width="2"/><line x1="350" y1="250" x2="350" y2="314" stroke="${INK}" stroke-width="4"/><line x1="510" y1="250" x2="510" y2="314" stroke="${INK}" stroke-width="4"/>`;
    out += `<text x="${apple[0]}" y="${apple[1] + 26}" font-size="52" text-anchor="middle">🍎</text>`;
    out += `<text x="80" y="${eye[1] + 32}" font-size="64" text-anchor="middle">${s.who ? '🐱' : '🧒'}</text>`;
    out += `<rect x="0" y="0" width="${W}" height="${H}" fill="#241f38" opacity="${n(0.8 * (1 - b) ** 0.7)}"/>`;
    out += `<line x1="150" y1="0" x2="150" y2="50" stroke="${INK}" stroke-width="3"/><polygon points="122,70 178,70 164,48 136,48" fill="#d9cdb6" stroke="${INK}" stroke-width="2"/>`;
    if (b > 0) out += `<circle cx="${bulb[0]}" cy="${bulb[1]}" r="${n(18 + 30 * b)}" fill="${GLOW}" opacity="${n(0.3 * b)}"/>`;
    out += `<circle cx="${bulb[0]}" cy="${bulb[1]}" r="11" fill="${b > 0 ? GLOW : '#9a9488'}" stroke="${INK}" stroke-width="2"/>`;
    if (b > 0) {
      for (const dy of [-16, 0, 16]) {
        const end: V2 = [apple[0] - 6, apple[1] + dy];
        out += `<line x1="${bulb[0]}" y1="${bulb[1]}" x2="${end[0]}" y2="${end[1]}" stroke="${GLOW}" stroke-width="2" stroke-dasharray="6 6" opacity="${n(0.7 * b)}"/>`;
        for (let k = 0; k < 3; k += 1) {
          const [x, y] = lerp2(bulb, end, (t * 0.5 + k / 3 + dy / 100) % 1);
          out += `<circle cx="${n(x)}" cy="${n(y)}" r="4.5" fill="${GLOW}" stroke="#fff" stroke-width="1.2" opacity="${n(b)}"/>`;
        }
      }
      const from: V2 = [apple[0] - 30, apple[1] - 4];
      const to: V2 = [eye[0] + 6, eye[1] - 8];
      out += `<line x1="${from[0]}" y1="${from[1]}" x2="${to[0]}" y2="${to[1]}" stroke="${HOT}" stroke-width="2.5" stroke-dasharray="6 6" opacity="${n(0.8 * b ** 0.5)}"/>`;
      for (let k = 0; k < 4; k += 1) {
        const [x, y] = lerp2(from, to, (t * 0.5 + k / 4) % 1);
        out += `<circle cx="${n(x)}" cy="${n(y)}" r="4.5" fill="${HOT}" stroke="#fff" stroke-width="1.2" opacity="${n(b ** 0.5)}"/>`;
      }
      out += txt(270, 238, '苹果把光弹进眼睛', { size: 13, color: HOT, bold: true });
    } else {
      out += `<line x1="${eye[0] + 10}" y1="${eye[1] - 8}" x2="${apple[0] - 34}" y2="${apple[1] - 4}" stroke="#b8b2c8" stroke-width="2.5" stroke-dasharray="4 8"/>`;
      out += txt(270, 190, '✗ 眼睛不会射出光去照东西', { size: 14, color: HOT, bold: true });
    }
    out += bar(330, 40, 200, SEEN[s.who][s.lamp], `${VIEWERS[s.who]}看清了多少`, BLUE);
    out += txt(200, 300, '光：灯 → 苹果 → 眼睛', { size: 14, bold: true });
    return out;
  },
  readout(s) {
    const who = VIEWERS[s.who];
    if (s.lamp === 0) return `灯亮着：灯光照到苹果上，苹果又把光弹进${who}的眼睛，${who}就看见了苹果`;
    if (s.lamp === 1) return s.who ? '灯调得很暗：弹进眼睛的光很少，可小猫的眼睛收光本领强，还能看得比较清楚' : '灯调得很暗：弹进眼睛的光很少，小念只能看到模模糊糊的影子';
    return `灯全关了：没有光照到苹果，也就没有光弹进眼睛——${s.who ? '小猫也' : '小念'}什么都看不见。眼睛自己不会发光`;
  },
};

const SEASONS = ['夏至前后', '春分、秋分', '冬至前后'];
const DECLINATION = [23.4, 0, -23.4];
/** 按北京的纬度、当地太阳时估算 */
const LATITUDE = 40;
const DIRS = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];

function sunAt(hour: number, season: number) {
  const h = rad((hour - 12) * 15);
  const lat = rad(LATITUDE);
  const d = rad(DECLINATION[season]);
  const east = -Math.cos(d) * Math.sin(h);
  const north = Math.sin(d) * Math.cos(lat) - Math.cos(d) * Math.cos(h) * Math.sin(lat);
  const up = Math.sin(d) * Math.sin(lat) + Math.cos(d) * Math.cos(h) * Math.cos(lat);
  const alt = deg(Math.asin(clamp(up, -1, 1)));
  const shadowAz = Math.atan2(-east, -north);
  const dir = DIRS[((Math.round(shadowAz / (Math.PI / 4)) % 8) + 8) % 8];
  const flat = Math.hypot(east, north) || 1;
  return { alt, dir, sx: -east / flat, sy: -north / flat, length: alt > 0 ? 1 / Math.tan(rad(alt)) : Infinity };
}

export const shadow: SimDef = {
  params: [
    { key: 'hour', label: '几点钟', min: 6, max: 18, step: 1, value: 9, unit: ' 点' },
    { key: 'season', label: '什么时候', min: 0, max: 2, step: 1, value: 1, labels: SEASONS },
  ],
  animated: false,
  draw(s) {
    const sun = sunAt(s.hour, s.season);
    const [px, gy, pole] = [430, 250, 100];
    let out = `<rect x="0" y="0" width="${W}" height="${gy}" fill="${sun.alt > 0 ? '#eaf4fb' : '#c9cfe0'}"/><rect x="0" y="${gy}" width="${W}" height="${H - gy}" fill="#e3d3b4"/>`;
    if (sun.alt > 0) {
      const a = rad(sun.alt);
      const len = pole / Math.tan(a);
      const tip = px - len;
      const sunPos: V2 = [px + 120 * Math.cos(a), gy - pole - 120 * Math.sin(a)];
      out += `<line x1="${n(sunPos[0])}" y1="${n(sunPos[1])}" x2="${n(tip)}" y2="${gy}" stroke="${GLOW}" stroke-width="2.5" stroke-dasharray="7 6"/>`;
      out += `<line x1="${px}" y1="${gy}" x2="${n(Math.max(tip, 14))}" y2="${gy}" stroke="#4a3f33" stroke-width="10" stroke-linecap="round" opacity="0.75"/>`;
      if (tip < 14) out += txt(20, gy + 30, '← 影子还长，画不下了', { anchor: 'start', size: 13, color: NOTE });
      else out += txt((px + tip) / 2, gy + 30, `影子约 ${r1(sun.length)} 米`, { size: 14, bold: true });
      out += `<circle cx="${n(sunPos[0])}" cy="${n(sunPos[1])}" r="22" fill="#ffd43b" stroke="#f08c00" stroke-width="3"/>`;
      out += txt(W / 2 - 40, 34, `太阳离地面约 ${Math.round(sun.alt)}°`, { size: 16, bold: true, color: HOT });
    } else {
      out += txt(W / 2, 120, s.hour < 12 ? '太阳还在地平线下面，没升起来' : '太阳已经落山了', { size: 16, bold: true, color: BLUE });
    }
    out += `<line x1="${px}" y1="${gy}" x2="${px}" y2="${gy - pole}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
    out += txt(px + 12, gy - pole / 2, '1 米的竿子', { anchor: 'start', size: 12, color: NOTE });
    const [cx, cy, r] = [70, 86, 40];
    out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${NOTE}" stroke-width="2"/>`;
    out += txt(cx, cy - r - 6, '北', { size: 12, color: NOTE }) + txt(cx + r + 10, cy + 4, '东', { size: 12, color: NOTE });
    if (sun.alt > 0) out += arrow(cx, cy, cx + sun.sx * (r - 6), cy - sun.sy * (r - 6), '#4a3f33', 4);
    out += txt(cx, cy + r + 18, sun.alt > 0 ? `从上往下看：影子朝${sun.dir}` : '从上往下看', { size: 12, color: NOTE });
    out += txt(W / 2, 306, '侧面看：顺着阳光照来的方向', { size: 12, color: NOTE });
    return out;
  },
  readout(s) {
    const sun = sunAt(s.hour, s.season);
    const when = `北京${SEASONS[s.season]}的 ${s.hour} 点`;
    if (sun.alt <= 0) return `${when}：太阳${s.hour < 12 ? '还没升起来' : '已经落山了'}，地上没有太阳照出的影子`;
    return `${when}：太阳离地面约 ${Math.round(sun.alt)}°，1 米高的竿子影子约 ${r1(sun.length)} 米，朝${sun.dir}——太阳越低，影子越长`;
  },
};

function kid(cx: number, top: number, k: number, front: boolean, paper: boolean): string {
  const head: V2 = [cx, top + 26 * k];
  const hand: V2 = [cx + 58 * k, top + 6 * k];
  let out = `<rect x="${n(cx - 28 * k)}" y="${n(top + 50 * k)}" width="${n(56 * k)}" height="${n(80 * k)}" rx="${n(12 * k)}" fill="#7aa7d9" stroke="${INK}" stroke-width="2"/>`;
  out += `<line x1="${n(cx - 26 * k)}" y1="${n(top + 60 * k)}" x2="${n(cx - 40 * k)}" y2="${n(top + 120 * k)}" stroke="#f0c9a0" stroke-width="${n(10 * k)}" stroke-linecap="round"/>`;
  out += `<line x1="${n(cx + 26 * k)}" y1="${n(top + 60 * k)}" x2="${n(hand[0])}" y2="${n(hand[1])}" stroke="#f0c9a0" stroke-width="${n(10 * k)}" stroke-linecap="round"/>`;
  if (front) {
    out += `<circle cx="${n(head[0])}" cy="${n(head[1])}" r="${n(24 * k)}" fill="#f6d7b0" stroke="${INK}" stroke-width="2"/>`;
    out += `<path d="M${n(cx - 24 * k)} ${n(head[1] - 2 * k)} A${n(24 * k)} ${n(24 * k)} 0 0 1 ${n(cx + 24 * k)} ${n(head[1] - 2 * k)} Q${n(cx)} ${n(head[1] - 14 * k)} ${n(cx - 24 * k)} ${n(head[1] - 2 * k)} Z" fill="#5b4636"/>`;
    out += `<circle cx="${n(cx - 8 * k)}" cy="${n(head[1] + 4 * k)}" r="${n(2.6 * k)}" fill="${INK}"/><circle cx="${n(cx + 8 * k)}" cy="${n(head[1] + 4 * k)}" r="${n(2.6 * k)}" fill="${INK}"/>`;
    out += `<path d="M${n(cx - 7 * k)} ${n(head[1] + 12 * k)} Q${n(cx)} ${n(head[1] + 18 * k)} ${n(cx + 7 * k)} ${n(head[1] + 12 * k)}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  } else {
    out += `<circle cx="${n(head[0])}" cy="${n(head[1])}" r="${n(24 * k)}" fill="#5b4636" stroke="${INK}" stroke-width="2"/>`;
  }
  if (paper) {
    const [w, h] = [40 * k, 32 * k];
    out += `<rect x="${n(hand[0] - w / 2)}" y="${n(hand[1] - h - 2 * k)}" width="${n(w)}" height="${n(h)}" fill="#fffdf5" stroke="${INK}" stroke-width="1.5"/>`;
    out += `<text transform="translate(${n(hand[0])} ${n(hand[1] - 10 * k)}) scale(-1 1)" font-size="${n(26 * k)}" font-weight="700" text-anchor="middle" fill="${HOT}" opacity="${front ? 1 : 0.3}">R</text>`;
  }
  return out;
}

export const mirror: SimDef = {
  params: [{ key: 'act', label: '对着镜子', min: 0, max: 1, step: 1, value: 0, labels: ['举起右手', '举起写着 R 的纸'] }],
  animated: false,
  draw(s) {
    const paper = s.act === 1;
    let out = `<rect x="160" y="12" width="240" height="186" rx="8" fill="#e6f1f7" stroke="#8aa4b6" stroke-width="6"/>`;
    out += `<line x1="190" y1="30" x2="230" y2="80" stroke="#fff" stroke-width="6" opacity="0.7"/>`;
    out += kid(280, 40, 0.85, true, paper);
    out += kid(280, 200, 1.5, false, paper);
    out += txt(84, 56, '镜子里的你', { size: 13, bold: true }) + txt(84, 76, '脸朝着你', { size: 12, color: NOTE });
    out += txt(84, 250, '你（背影）', { size: 13, bold: true }) + txt(84, 270, '脸朝着镜子', { size: 12, color: NOTE });
    out += arrow(222, 300, 222, 222, NOTE, 3) + arrow(222, 74, 222, 120, NOTE, 3);
    const rows: readonly (readonly [string, string, string])[] = [
      ['上下', '头还在上面 ✓', INK],
      ['左右', '举手的还是这边 ✓', INK],
      ['前后', '一个朝里一个朝外', HOT],
    ];
    rows.forEach(([name, note, color], i) => {
      const y = 70 + i * 62;
      out += txt(422, y, name, { anchor: 'start', size: 15, bold: true, color });
      out += txt(422, y + 22, note, { anchor: 'start', size: 12, color });
    });
    out += txt(488, 270, '镜子只把前后翻了过来', { size: 13, bold: true, color: HOT });
    return out;
  },
  readout(s) {
    return s.act
      ? '纸上的 R 在镜子里成了反字：为了让镜子“看”到字，你把纸转过来朝着镜子，前后一翻，就像从纸的背面看字一样'
      : '你举起右手，镜子里举起的手也在同一边。上下、左右都没换，换的是前后：你脸朝镜子，镜子里的你脸朝外';
  },
};

const SUN_ALT = [70, 25, 4];
const SUN_LABELS = ['中午，太阳高高的', '下午，太阳偏西了', '傍晚，太阳快落山'];
const SKY = [['#5ea8ef', '#cfe6fb'], ['#7fb3e6', '#e6eff6'], ['#3d4f86', '#f39a5b']];
const SUN_FILL = ['#fffbe6', '#ffe08a', '#ff7a2f'];
/** 阳光斜着穿过的空气，按太阳在头顶时算 1 倍（Kasten–Young 公式） */
const airMass = (alt: number): number => 1 / (Math.sin(rad(alt)) + 0.50572 * (alt + 6.07995) ** -1.6364);
/** 整层空气对蓝光、红光的散射程度（示意） */
const SCATTER_BLUE = 0.21;
const SCATTER_RED = 0.05;

export const scatter: SimDef = {
  params: [{ key: 'sun', label: '太阳在哪儿', min: 0, max: 2, step: 1, value: 0, labels: SUN_LABELS }],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const alt = SUN_ALT[s.sun];
    const m = airMass(alt);
    const [top, bottom] = SKY[s.sun];
    let out = `<defs><linearGradient id="sky-scatter-${s.sun}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>`;
    out += `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#sky-scatter-${s.sun})"/>`;
    out += `<path d="M0 246 Q280 220 ${W} 246 V${H} H0 Z" fill="#b9c79a" stroke="${INK}" stroke-width="2"/>`;
    const me: V2 = [430, 230];
    const a = rad(alt);
    const sun: V2 = [me[0] - 210 * Math.cos(a), me[1] - 210 * Math.sin(a)];
    out += `<line x1="${n(sun[0])}" y1="${n(sun[1])}" x2="${me[0] - 8}" y2="${me[1] - 10}" stroke="${SUN_FILL[s.sun]}" stroke-width="9" stroke-linecap="round" opacity="0.85"/>`;
    const count = Math.min(Math.round(3 + 1.6 * m), 18);
    const dx = me[0] - sun[0];
    const dy = me[1] - sun[1];
    const len = Math.hypot(dx, dy);
    for (let i = 0; i < count; i += 1) {
      const u = (i + 0.5) / count;
      const p: V2 = [sun[0] + dx * u, sun[1] + dy * u];
      const side = i % 2 ? 1 : -1;
      const grow = (t * 0.8 + i * 0.37) % 1;
      const q: V2 = [p[0] + side * (-dy / len) * (8 + 22 * grow), p[1] + side * (dx / len) * (8 + 22 * grow)];
      out += arrow(p[0], p[1], q[0], q[1], '#2f6fd6', 2.5);
    }
    out += `<circle cx="${n(sun[0])}" cy="${n(sun[1])}" r="20" fill="${SUN_FILL[s.sun]}" stroke="#f08c00" stroke-width="3"/>`;
    out += `<text x="${me[0] + 6}" y="${me[1] + 14}" font-size="34" text-anchor="middle">🧍</text>`;
    out += bar(24, 40, 150, Math.exp(-SCATTER_BLUE * m), '直射到眼前的蓝光', '#2f6fd6');
    out += bar(24, 86, 150, Math.exp(-SCATTER_RED * m), '直射到眼前的红光', '#e03131');
    out += txt(24, 132, `阳光穿过的空气：约 ${m < 10 ? r1(m) : Math.round(m)} 倍`, { anchor: 'start', size: 14, bold: true });
    out += txt(24, 152, '（太阳在头顶时算 1 倍）', { anchor: 'start', size: 12, color: NOTE });
    out += txt(W / 2, 300, '蓝色小箭头：被空气分子散射到四面八方的蓝光', { size: 13, color: '#2f6fd6' });
    return out;
  },
  readout(s) {
    const m = airMass(SUN_ALT[s.sun]);
    return [
      `中午太阳高：阳光穿过的空气最少（约 ${r1(m)} 倍），蓝光被空气分子散向四面八方，满天都是蓝光，天空就是蓝的`,
      `下午太阳偏西：阳光要穿过约 ${r1(m)} 倍的空气，一路上蓝光被散射掉一些，天空还是蓝的，太阳显得更黄`,
      `傍晚太阳快落山：阳光斜着穿过约 ${Math.round(m)} 倍的空气，蓝光几乎都在半路被散射掉了，剩下红光、橙光照到眼前，夕阳就是红的`,
    ][s.sun];
  },
};

const LENS_D = [3, 8];
const LENS_F = 10;
const LENS_LABELS = ['小放大镜（直径 3 厘米）', '大放大镜（直径 8 厘米）'];
/** 太阳在焦点上的像大约 0.1 厘米，光斑不会比它更小 */
function lensSpot(s: State) {
  const D = LENS_D[s.size];
  const spot = Math.max((D * Math.abs(s.d - LENS_F)) / LENS_F, 0.1);
  return { D, spot, gain: (D / spot) ** 2 };
}
const roundGain = (g: number): number => (g >= 100 ? Math.round(g / 100) * 100 : g >= 10 ? Math.round(g) : Math.round(g * 10) / 10);

export const burnLens: SimDef = {
  params: [
    { key: 'd', label: '放大镜离纸多远', min: 2, max: 20, step: 1, value: 6, unit: ' 厘米' },
    { key: 'size', label: '用哪个放大镜', min: 0, max: 1, step: 1, value: 1, labels: LENS_LABELS },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const { D, spot, gain } = lensSpot(s);
    const [lx, cy, k] = [140, 168, 14];
    const focus = lx + LENS_F * k;
    const xp = lx + s.d * k;
    const half = (D * k) / 2;
    let out = `<rect x="${xp}" y="58" width="8" height="226" fill="#fffdf5" stroke="#d8ccb6" stroke-width="2"/>`;
    out += txt(xp + 4, 300, '纸', { size: 13, color: NOTE });
    out += `<line x1="${focus}" y1="${cy + half + 8}" x2="${focus}" y2="270" stroke="${NOTE}" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    out += txt(focus, 284, '焦点', { size: 12, color: NOTE });
    for (let i = 0; i < 5; i += 1) {
      const o = -half + (i * 2 * half) / 4;
      const end = cy + o * (1 - (xp - lx) / (LENS_F * k));
      out += `<line x1="16" y1="${n(cy + o)}" x2="${lx}" y2="${n(cy + o)}" stroke="${GLOW}" stroke-width="2.5"/>`;
      out += `<line x1="${lx}" y1="${n(cy + o)}" x2="${xp}" y2="${n(end)}" stroke="${GLOW}" stroke-width="2.5"/>`;
    }
    out += `<ellipse cx="${lx}" cy="${cy}" rx="9" ry="${n(half + 4)}" fill="#dff1fb" fill-opacity="0.85" stroke="#7fa7c9" stroke-width="3"/>`;
    out += `<line x1="${lx}" y1="${n(cy + half + 6)}" x2="${lx}" y2="${n(cy + half + 56)}" stroke="#8b5e3c" stroke-width="8" stroke-linecap="round"/>`;
    const heat = clamp(Math.log10(gain) / Math.log10(6400), 0, 1);
    const ry = Math.max((spot * k) / 2, 2);
    out += `<circle cx="${xp}" cy="${cy}" r="${n(ry + 6 + 10 * heat)}" fill="${GLOW}" opacity="${n(0.15 + 0.4 * heat)}"/>`;
    out += `<ellipse cx="${xp}" cy="${cy}" rx="3" ry="${n(ry)}" fill="#fff3b0" stroke="${HOT}" stroke-width="1.5"/>`;
    if (gain >= 500) out += `<text x="${xp + 6}" y="${cy - 14 + Math.sin(t * 9) * 2}" font-size="34" text-anchor="middle">🔥</text>`;
    else if (gain >= 60) out += `<text x="${xp + 10}" y="${n(cy - 16 - ((t * 20) % 20))}" font-size="26" text-anchor="middle" opacity="0.8">💨</text>`;
    out += txt(40, cy - half - 14, '阳光', { size: 13, color: '#c77d00', bold: true });
    out += bar(330, 30, 200, heat, '纸上这一点有多烫（示意）', HOT);
    out += txt(20, 30, `光斑直径约 ${r1(spot)} 厘米`, { anchor: 'start', size: 15, bold: true });
    return out;
  },
  readout(s) {
    const { spot, gain } = lensSpot(s);
    const effect = gain >= 500 ? '纸很快冒烟、烧了起来' : gain >= 60 ? '纸慢慢发烫、冒烟' : '纸只是有点暖';
    return `放大镜离纸 ${s.d} 厘米：光斑直径约 ${r1(spot)} 厘米，那里每一小块分到的阳光是平时的约 ${roundGain(gain)} 倍，${effect}。放大镜没让阳光变多，只是把一大片光挤到了一小点上`;
  },
};

const EYES = ['正常的眼睛', '近视的眼睛（眼球偏长）'];
const GLASSES = ['不戴眼镜', '戴近视镜（凹透镜）'];
const EYE_F = 190;
const LONGER = 40;
/** 近视镜让远处来的光看起来像从这么远的一点发出来，正好补上偏长的那一截 */
const VIRTUAL = 1 / (1 / EYE_F - 1 / (EYE_F + LONGER));

function eyeRays(s: State) {
  const [lx, cy, gx] = [190, 158, 114];
  const retina = lx + EYE_F + (s.eye ? LONGER : 0);
  const v = s.glasses ? 1 / (1 / EYE_F - 1 / VIRTUAL) : EYE_F;
  const rays = [-46, -23, 23, 46].map(y0 => {
    const slope = s.glasses ? y0 / (gx - (lx - VIRTUAL)) : 0;
    const y1 = y0 + slope * (lx - gx);
    return { y0, y1, yr: y1 * (1 - (retina - lx) / v) };
  });
  return { lx, cy, gx, retina, v, rays, blur: Math.abs(rays[0].yr) };
}

export const eyeFocus: SimDef = {
  params: [
    { key: 'eye', label: '眼睛', min: 0, max: 1, step: 1, value: 1, labels: EYES },
    { key: 'glasses', label: '眼镜', min: 0, max: 1, step: 1, value: 0, labels: GLASSES },
  ],
  animated: false,
  draw(s) {
    const { lx, cy, gx, retina, v, rays, blur } = eyeRays(s);
    const front = lx - 22;
    let out = `<ellipse cx="${n((front + retina) / 2)}" cy="${cy}" rx="${n((retina - front) / 2)}" ry="96" fill="#fbfbfb" stroke="#c9b8a6" stroke-width="3"/>`;
    out += `<path d="M${retina - 20} ${cy - 78} Q${retina + 20} ${cy} ${retina - 20} ${cy + 78}" fill="none" stroke="#e07a7a" stroke-width="6" stroke-linecap="round"/>`;
    out += txt(retina - 10, cy + 116, '视网膜', { size: 12, color: '#c0504d' });
    if (s.glasses) {
      out += `<path d="M${gx - 14} 100 Q${gx - 2} ${cy} ${gx - 14} 216 L${gx + 14} 216 Q${gx + 2} ${cy} ${gx + 14} 100 Z" fill="#dff1fb" stroke="#7fa7c9" stroke-width="2.5"/>`;
      out += txt(gx, 88, '近视镜', { size: 12, color: NOTE });
    }
    for (const { y0, y1, yr } of rays) {
      if (s.glasses) {
        out += `<line x1="20" y1="${cy + y0}" x2="${gx}" y2="${cy + y0}" stroke="${GLOW}" stroke-width="2.5"/>`;
        out += `<line x1="${gx}" y1="${cy + y0}" x2="${lx}" y2="${n(cy + y1)}" stroke="${GLOW}" stroke-width="2.5"/>`;
      } else {
        out += `<line x1="20" y1="${cy + y0}" x2="${lx}" y2="${cy + y0}" stroke="${GLOW}" stroke-width="2.5"/>`;
      }
      out += `<line x1="${lx}" y1="${n(cy + y1)}" x2="${retina}" y2="${n(cy + yr)}" stroke="${GLOW}" stroke-width="2.5"/>`;
    }
    out += `<ellipse cx="${lx}" cy="${cy}" rx="11" ry="52" fill="#cfe8f5" fill-opacity="0.85" stroke="#7fa7c9" stroke-width="2.5"/>`;
    out += txt(lx, cy - 64, '晶状体', { size: 12, color: NOTE });
    if (lx + v < retina - 4) out += `<circle cx="${n(lx + v)}" cy="${cy}" r="5" fill="${HOT}"/>${txt(lx + v, cy - 12, '聚在这', { size: 12, color: HOT, bold: true })}`;
    if (blur > 2) out += `<line x1="${retina + 6}" y1="${n(cy - blur)}" x2="${retina + 6}" y2="${n(cy + blur)}" stroke="${HOT}" stroke-width="4" stroke-linecap="round"/>`;
    out += txt(20, cy + 72, '远处来的光', { anchor: 'start', size: 12, color: '#c77d00' });
    out += `<rect x="446" y="34" width="104" height="70" rx="6" fill="#2f5d4a" stroke="#8b5e3c" stroke-width="5"/>`;
    out += txt(498, 22, '看到的黑板', { size: 12, color: NOTE });
    const fuzz = clamp(blur / 10, 0, 1);
    if (fuzz > 0.15) {
      for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-0.7, 0.7], [0.7, -0.7]]) {
        out += `<text x="${n(498 + ox * 6 * fuzz)}" y="${n(80 + oy * 6 * fuzz)}" font-size="30" font-weight="700" text-anchor="middle" fill="#fff" opacity="0.28">山 E</text>`;
      }
    } else {
      out += `<text x="498" y="80" font-size="30" font-weight="700" text-anchor="middle" fill="#fff">山 E</text>`;
    }
    const sharp = blur <= 2;
    out += txt(W / 2, 302, sharp ? '光正好聚在视网膜上：看得清' : lx + v < retina ? '光在视网膜前面就聚了：看不清' : '光要到视网膜后面才聚：看不清', { size: 15, bold: true, color: sharp ? BLUE : HOT });
    return out;
  },
  readout(s) {
    if (!s.eye && !s.glasses) return '正常的眼睛：远处来的光正好聚在视网膜上，黑板看得清清楚楚';
    if (s.eye && !s.glasses) return '近视的眼睛：眼球偏长，光在视网膜前面就聚成一点，到视网膜上又散开了——黑板一片模糊';
    if (s.eye) return '近视眼戴上凹透镜：光先被稍稍散开一点，聚的那一点往后挪，正好落回视网膜上，又看清了';
    return '正常的眼睛戴近视镜：光要到视网膜后面才聚起来，反而看不清——别人的眼镜不能乱戴';
  },
};

export const thinFilm: SimDef = {
  params: [{ key: 'd', label: '肥皂膜有多厚', min: 20, max: 580, step: 40, value: 220, unit: ' 纳米' }],
  animated: false,
  draw(s) {
    const nSoap = 1.38;
    const gain = (lam: number): number => Math.sin((2 * Math.PI * nSoap * s.d) / lam) ** 2;
    const [r, g, b] = [gain(650), gain(535), gain(460)];
    const rgb = `rgb(${Math.round(35 + r * 220)},${Math.round(35 + g * 215)},${Math.round(45 + b * 210)})`;
    const filmW = 24 + (s.d / 580) * 64;
    const fx = 148;
    let out = `<rect x="14" y="42" width="246" height="238" rx="14" fill="#1e2a4a"/>`;
    out += `<rect x="${fx}" y="58" width="${n(filmW)}" height="206" rx="8" fill="#a5d8ff" fill-opacity="0.32" stroke="#74c0fc" stroke-width="2"/>`;
    out += txt(fx + filmW / 2, 280, `膜厚 ${s.d} 纳米`, { size: 12.5, bold: true, color: BLUE });
    out += arrow(36, 96, fx - 2, 134, '#ffffff', 3.5);
    out += arrow(fx - 2, 134, 42, 182, '#ffd43b', 3);
    out += `<line x1="${fx}" y1="134" x2="${n(fx + filmW)}" y2="156" stroke="#a5d8ff" stroke-width="2.5"/>`;
    out += arrow(fx + filmW, 156, 42, 224, '#ff8787', 3);
    out += txt(82, 84, '白光照上去', { size: 12, color: '#fff', plain: true });
    out += txt(88, 168, '前表面反射', { size: 11.5, color: '#ffd43b', plain: true });
    out += txt(92, 240, '后表面反射', { size: 11.5, color: '#ffa8a8', plain: true });

    out += `<rect x="276" y="42" width="270" height="238" rx="14" fill="#f7efe1" stroke="#e2d5be" stroke-width="1.5"/>`;
    out += `<circle cx="354" cy="146" r="54" fill="#182033" stroke="${INK}" stroke-width="2"/>`;
    out += `<circle cx="354" cy="146" r="46" fill="${rgb}" opacity="${n(clamp(0.18 + Math.max(r, g, b) * 0.82, 0.18, 1))}"/>`;
    out += `<ellipse cx="336" cy="126" rx="14" ry="7" transform="rotate(-28 336 126)" fill="#ffffff" opacity="0.45"/>`;
    out += txt(354, 222, s.d <= 40 ? '极薄暗斑（快破了）' : '叠出来的泡泡颜色', { size: 12.5, bold: true });

    const channels: [string, number, string][] = [['红光', r, '#e03131'], ['绿光', g, '#2f9e44'], ['蓝光', b, '#1971c2']];
    channels.forEach(([name, val, col], i) => {
      const y = 84 + i * 54;
      out += txt(432, y, `${name} ${Math.round(val * 100)}%`, { anchor: 'start', size: 12.5, bold: true, color: col });
      out += `<rect x="432" y="${y + 8}" width="96" height="14" rx="7" fill="#e6dcc8"/>`;
      out += `<rect x="432" y="${y + 8}" width="${n(96 * val)}" height="14" rx="7" fill="${col}"/>`;
    });
    const headline = s.d <= 40
      ? '膜薄到几十纳米：前后两束反射光几乎全抵消，变成黑乎乎的暗斑'
      : '前后两面各反射一束光：合拍的颜色变亮，顶牛的颜色抵消';
    out += txt(W / 2, 26, headline, { size: 14, bold: true, color: s.d <= 40 ? HOT : BLUE });
    out += txt(W / 2, 306, '泡泡上薄下厚，不同厚度捧红不同颜色，就流出了彩带', { size: 12, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const nSoap = 1.38;
    const gain = (lam: number): number => Math.round(Math.sin((2 * Math.PI * nSoap * s.d) / lam) ** 2 * 100);
    if (s.d <= 40) return `膜厚只有 ${s.d} 纳米：前表面反射光翻了个身，和几乎没多走路的后表面反射光正好波峰撞波谷，红绿蓝一起抵消——泡泡最顶上出现透明暗斑，马上就要破了`;
    return `膜厚 ${s.d} 纳米：两束反射光叠在一起后，红光保留约 ${gain(650)}%、绿光约 ${gain(535)}%、蓝光约 ${gain(460)}%——肥皂水本身没颜色，彩色是光波叠加“挑”出来的`;
  },
};

