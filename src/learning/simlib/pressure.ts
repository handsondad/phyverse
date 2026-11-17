import { INK, HOT, BLUE, WATER, W, G, n, r1, r2, txt, arrow, smooth, clamp, noise, type SimDef } from './kit';

/* ---------------- 压强与浮力 ---------------- */

const BOAT_VOLUME = [1, 10, 24];
const BOAT_NAMES = ['实心铁块', '铁皮小碗', '大肚子船'];
const STEEL = 8;

export const buoyancy: SimDef = {
  params: [
    { key: 'shape', label: '8 千克钢铁做成', min: 0, max: 2, step: 1, value: 0, labels: BOAT_NAMES },
    { key: 'cargo', label: '再装上货物', min: 0, max: 20, step: 2, value: 0, unit: ' kg' },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const vmax = BOAT_VOLUME[s.shape];
    const total = STEEL + (s.shape ? s.cargo : 0);
    const f = total / vmax;
    const floats = f <= 1;
    const [surface, bottom] = [128, 292];
    const [w, h] = [[46, 46], [130, 46], [250, 70]][s.shape];
    const cx = 280;
    const bob = floats ? Math.sin(t * 2) * 2 : 0;
    const top = floats ? surface - h + f * h + bob : bottom - h;
    let out = `<rect x="50" y="40" width="460" height="256" rx="10" fill="none" stroke="${INK}" stroke-width="3"/>`;
    out += `<rect x="52" y="${surface}" width="456" height="${bottom + 2 - surface}" fill="${WATER}"/>`;
    out += `<path d="M52 ${surface} ${Array.from({ length: 24 }, (_, i) => `Q${54 + i * 19 + 5} ${n(surface - 3 + Math.sin(t * 3 + i) * 1.5)} ${54 + i * 19 + 10} ${surface}`).join(' ')}" fill="none" stroke="#7fb3dc" stroke-width="2"/>`;
    if (s.shape === 0) {
      out += `<rect x="${cx - w / 2}" y="${n(top)}" width="${w}" height="${h}" rx="4" fill="#7d8790" stroke="${INK}" stroke-width="2.5"/>`;
    } else {
      const lip = s.shape === 1 ? 14 : 28;
      out += `<path d="M${cx - w / 2} ${n(top)} L${cx + w / 2} ${n(top)} L${cx + w / 2 - lip} ${n(top + h)} L${cx - w / 2 + lip} ${n(top + h)} Z" fill="#8d99a6" stroke="${INK}" stroke-width="2.5"/>`;
      if (s.shape === 2) out += `<rect x="${cx - 40}" y="${n(top - 30)}" width="60" height="30" rx="4" fill="#f3efe6" stroke="${INK}" stroke-width="2"/><rect x="${cx + 4}" y="${n(top - 52)}" width="10" height="22" fill="${HOT}"/>`;
      const boxes = Math.round(s.cargo / 2);
      for (let i = 0; i < boxes; i += 1) {
        const across = s.shape === 1 ? 5 : 10;
        const bx = cx - (across * 11) / 2 + (i % across) * 11;
        const by = top - 10 - Math.floor(i / across) * 10;
        out += `<rect x="${n(bx)}" y="${n(by)}" width="10" height="10" fill="#d9a35b" stroke="${INK}" stroke-width="1"/>`;
      }
    }
    const k = 3.6;
    const lift = Math.min(total, vmax);
    const mid = top + h / 2;
    out += arrow(cx + w / 2 + 34, mid, cx + w / 2 + 34, mid - lift * k, BLUE, 5);
    out += txt(cx + w / 2 + 40, mid - lift * k - 8, `浮力 ${lift} kg 水重`, { anchor: 'start', color: BLUE, size: 14 });
    out += arrow(cx - w / 2 - 34, mid, cx - w / 2 - 34, mid + total * k, HOT, 5);
    out += txt(cx - w / 2 - 40, Math.min(mid + total * k + 18, 312), `重 ${total} kg`, { anchor: 'end', color: HOT, size: 14 });
    out += txt(280, 26, floats ? '浮着 ✔' : '沉下去了 ✘', { color: floats ? '#2c774a' : HOT, bold: true, size: 18 });
    return out;
  },
  readout(s) {
    const vmax = BOAT_VOLUME[s.shape];
    const total = STEEL + (s.shape ? s.cargo : 0);
    return total <= vmax
      ? `${BOAT_NAMES[s.shape]}连货重 ${total} kg，全泡进水里能排开 ${vmax} kg 水：浮力够大，浮着，吃水 ${Math.round((total / vmax) * 100)}%`
      : `${BOAT_NAMES[s.shape]}重 ${total} kg，可就算全泡进水里也只能排开 ${vmax} kg 水：浮力不够，沉下去`;
  },
};

export const straw: SimDef = {
  params: [
    { key: 'dp', label: '吸管里比外面少的气压', min: 0, max: 2.4, step: 0.2, value: 0.6, unit: ' kPa' },
    { key: 'seal', label: '杯口', min: 0, max: 1, step: 1, value: 0, labels: ['敞开', '封死'] },
  ],
  animated: true,
  still: 0,
  draw(s, t) {
    const surface = 186;
    const perCm = 8;
    const rise = s.dp * 10.2 * (s.seal ? 0.12 : 1);
    const reach = 15;
    const top = surface - Math.min(rise, reach) * perCm;
    let out = `<path d="M196 104 L364 104 L346 296 L214 296 Z" fill="#fffaf2" stroke="${INK}" stroke-width="3"/>`;
    out += `<path d="M${196 + (surface - 104) * 0.094} ${surface} L${364 - (surface - 104) * 0.094} ${surface} L346 296 L214 296 Z" fill="#c98b5a" opacity="0.85"/>`;
    if (s.seal) out += `<rect x="190" y="96" width="180" height="12" rx="4" fill="#8b7a5c"/>`;
    out += `<rect x="270" y="${surface - reach * perCm - 10}" width="18" height="${296 - (surface - reach * perCm - 10) - 8}" fill="#fff" fill-opacity="0.6" stroke="${INK}" stroke-width="2.5"/>`;
    out += `<rect x="272" y="${n(top)}" width="14" height="${n(288 - top)}" fill="#c98b5a"/>`;
    const reached = rise >= reach;
    out += `<text x="279" y="${surface - reach * perCm - 22}" font-size="34" text-anchor="middle">${reached ? '😋' : '😗'}</text>`;
    if (reached) {
      for (let i = 0; i < 3; i += 1) {
        const y = surface - reach * perCm + 4 - ((t * 60 + i * 25) % 70);
        if (y > surface - reach * perCm - 60) out += `<circle cx="279" cy="${n(y)}" r="3" fill="#8a5a33"/>`;
      }
    }
    const push = s.seal ? 0.25 : 1;
    for (const x of [222, 248, 312, 338]) out += arrow(x, surface - 50 * push - 8, x, surface - 6, BLUE, 3.5);
    out += txt(120, 140, s.seal ? '杯里空气被吸稀了' : '外面：大气压', { color: BLUE, size: 15 });
    out += txt(120, 160, s.seal ? `也只剩 ${r1(101.3 - s.dp * 0.88)} kPa` : '101.3 kPa', { color: BLUE, size: 15 });
    out += `<line x1="290" y1="${n(top + 6)}" x2="420" y2="${n(top + 6)}" stroke="#c9bca6" stroke-width="2" stroke-dasharray="4 4"/>`;
    out += txt(430, top + 10, `管里 ${r1(101.3 - s.dp)} kPa`, { anchor: 'start', size: 14 });
    out += txt(430, 260, `上来 ${r1(Math.min(rise, reach))} 厘米`, { anchor: 'start', size: 15, color: HOT, bold: true });
    out += txt(430, 280, `嘴边还要 ${reach} 厘米`, { anchor: 'start', size: 13, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const rise = s.dp * 10.2 * (s.seal ? 0.12 : 1);
    if (s.seal) return `杯口封死：吸走管里的空气，杯里的空气也跟着变稀，两边差不多，饮料只上来 ${r1(rise)} 厘米`;
    return rise >= 15
      ? `管里比外面少 ${s.dp} kPa：外面的大气压把饮料压上去 ${r1(rise)} 厘米，到嘴边了！`
      : `管里比外面少 ${s.dp} kPa：大气压只能把饮料压上去 ${r1(rise)} 厘米，再吸用力一点`;
  },
};

const NAILS = [1, 10, 100, 1000];
const LIERS = ['小念（30 千克）', '爸爸（65 千克）'];
const LIER_KG = [30, 65];
/** 一根钉尖顶在皮肤上的面积，按 1 平方毫米估 */
const NAIL_TIP = 1e-6;

const nailLoad = (s: Record<string, number>): { weight: number; nails: number; each: number; p: number } => {
  const weight = LIER_KG[s.who] * G;
  const nails = NAILS[s.nails];
  return { weight, nails, each: weight / nails, p: weight / (nails * NAIL_TIP) };
};

const wanPa = (p: number): string => `${Math.round(p / 1e4).toLocaleString('zh-CN')} 万帕`;

export const press: SimDef = {
  params: [
    { key: 'nails', label: '板上的钉子', min: 0, max: 3, step: 1, value: 3, labels: NAILS.map(k => `${k} 根`) },
    { key: 'who', label: '躺上去的是', min: 0, max: 1, step: 1, value: 1, labels: LIERS },
  ],
  animated: false,
  draw(s) {
    const { weight, nails, each, p } = nailLoad(s);
    const hurt = each > 10 ? 2 : each > 1 ? 1 : 0;
    const nailColor = ['#7d8790', '#f08c00', HOT][hurt];
    const shown = Math.min(nails, 40);
    const [boardTop, tip] = [258, 236];
    let out = `<rect x="70" y="${boardTop}" width="420" height="20" rx="4" fill="#c99a62" stroke="${INK}" stroke-width="2"/>`;
    for (let i = 0; i < shown; i += 1) {
      const x = shown === 1 ? 280 : 92 + (i * 376) / (shown - 1);
      out += `<line x1="${n(x)}" y1="${boardTop}" x2="${n(x)}" y2="${tip + 4}" stroke="${nailColor}" stroke-width="3"/><polygon points="${n(x - 2.5)},${tip + 5} ${n(x + 2.5)},${tip + 5} ${n(x)},${tip}" fill="${nailColor}"/>`;
    }
    const scale = s.who ? 1 : 0.8;
    out += `<g transform="translate(280 ${tip}) scale(${scale}) translate(-280 ${-tip})">`
      + `<circle cx="110" cy="${tip - 22}" r="20" fill="#f6d2b3" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="132" y="${tip - 38}" width="270" height="38" rx="17" fill="#7fb3dc" stroke="${INK}" stroke-width="2"/>`
      + `<rect x="398" y="${tip - 30}" width="80" height="26" rx="12" fill="#4a6fa5" stroke="${INK}" stroke-width="2"/></g>`;
    if (hurt) out += `<circle cx="280" cy="${tip}" r="14" fill="none" stroke="${HOT}" stroke-width="3" opacity="0.7"/>`;
    out += arrow(280, 120, 280, tip - 46, HOT, 5);
    out += txt(292, 150, `体重 ${Math.round(weight)} 牛`, { anchor: 'start', color: HOT, size: 14 });
    out += txt(280, 30, ['不疼 ✔', '很疼 ✘', '会扎破 ✘'][hurt], { size: 18, bold: true, color: hurt ? HOT : '#2c774a' });
    out += txt(280, 60, `每根钉子顶 ${each >= 10 ? Math.round(each) : r2(each)} 牛`, { size: 16, bold: true, color: hurt ? HOT : BLUE });
    out += txt(280, 84, `钉尖下的压强 ≈ ${wanPa(p)}`, { size: 14 });
    out += txt(280, 306, shown < nails ? `（只画出 ${shown} 根，实际 ${nails} 根）` : `${nails} 根钉子`, { size: 13, color: '#8b7a5c' });
    return out;
  },
  readout(s) {
    const { weight, nails, each, p } = nailLoad(s);
    const who = LIERS[s.who].replace(/（.*）/, '');
    const head = `${who}重 ${Math.round(weight)} 牛，分给 ${nails} 根钉子：每根顶 ${each >= 10 ? Math.round(each) : r2(each)} 牛，压强约 ${wanPa(p)}`;
    if (each > 10) return `${head}——全压在这么小的尖上，会扎破皮肤`;
    if (each > 1) return `${head}——每根还是太重，会很疼`;
    return `${head}——每根分到的${each < 0.5 ? '比一个鸡蛋还轻' : '差不多一个鸡蛋那么重'}，扎不进去`;
  },
};

const DEPTH_PX = 11;
const kPaAt = (d: number): number => 9.8 * d;

export const depth: SimDef = {
  params: [{ key: 'd', label: '潜到多深', min: 0, max: 20, step: 1, value: 5, unit: ' 米' }],
  animated: true,
  still: 0,
  draw(s, t) {
    const [surface, bottom, left, wall] = [64, 284, 40, 356];
    let out = `<rect x="${left}" y="${surface}" width="${wall - left}" height="${bottom - surface}" fill="${WATER}"/>`;
    out += `<line x1="${left}" y1="${surface}" x2="${wall}" y2="${surface}" stroke="#7fb3dc" stroke-width="3"/>`;
    out += `<rect x="${left}" y="${bottom}" width="${wall - left}" height="12" fill="#d9c9a3"/>`;
    out += `<path d="M${wall} ${surface - 14} H${wall + 16} L${wall + 92} ${bottom + 12} H${wall} Z" fill="#c9c2b6" stroke="${INK}" stroke-width="2.5"/>`;
    for (let m = 4; m <= 20; m += 4) {
      const y = surface + m * DEPTH_PX;
      out += arrow(wall - 8 - (6 + m * 3.2), y, wall - 4, y, BLUE, 3);
    }
    out += txt(wall + 54, surface - 22, '大坝', { size: 14, bold: true });
    out += txt(wall + 100, bottom - 20, '下面厚', { size: 13, anchor: 'start', color: '#8b7a5c' });
    out += txt(wall + 44, surface + 18, '上面薄', { size: 13, anchor: 'start', color: '#8b7a5c' });
    const [dx, dy] = [170, surface + s.d * DEPTH_PX];
    const push = 10 + s.d * 2.6;
    if (s.d > 0) {
      out += arrow(dx, dy - 22 - push, dx, dy - 22, BLUE, 4) + arrow(dx, dy + 22 + push, dx, dy + 22, BLUE, 4);
      out += arrow(dx - 26 - push, dy, dx - 26, dy, BLUE, 4) + arrow(dx + 26 + push, dy, dx + 26, dy, BLUE, 4);
      for (let i = 0; i < 3; i += 1) {
        const rise = (t * 40 + i * 30) % Math.max(s.d * DEPTH_PX, 1);
        out += `<circle cx="${n(dx + 10 + Math.sin(t * 3 + i) * 3)}" cy="${n(dy - 16 - rise)}" r="3" fill="#ffffff" stroke="#7fb3dc"/>`;
      }
    }
    out += `<text x="${dx}" y="${n(dy + 11)}" font-size="30" text-anchor="middle">🤿</text>`;
    const kPa = kPaAt(s.d);
    out += txt(470, 120, `${s.d} 米深`, { size: 18, bold: true });
    out += txt(470, 150, s.d ? `水多压 ${Math.round(kPa)} 千帕` : '只有大气压', { size: 15, color: BLUE, bold: true });
    out += txt(470, 174, s.d ? `≈ ${r1(kPa / 101.3)} 个大气压` : '', { size: 14, color: BLUE });
    out += txt(280, 30, '越深，四面八方压得越重', { size: 16, bold: true, color: HOT });
    return out;
  },
  readout(s) {
    if (!s.d) return '在水面上：只有头顶的大气压，耳朵里外一样，不难受';
    const kPa = kPaAt(s.d);
    return `潜到 ${s.d} 米：水从上下左右一起压过来，比水面多 ${Math.round(kPa)} 千帕，约 ${r1(kPa / 101.3)} 个大气压——越深压得越重，所以大坝下面要修得更厚`;
  },
};

/** 潜艇整个泡进水里时的浮力记作 100 份；空水舱时艇重 90 份，水舱灌满能再加 20 份 */
const SUB_DRY = 90;
const SUB_TANK = 20;

export const ballast: SimDef = {
  params: [{ key: 'fill', label: '水舱里灌进的水', min: 0, max: 100, step: 10, value: 0, unit: '%' }],
  animated: true,
  still: 3.5,
  draw(s, t) {
    const weight = SUB_DRY + (SUB_TANK * s.fill) / 100;
    const [surface, floor] = [86, 290];
    const [len, hgt] = [230, 54];
    const cx = 230;
    const u = t % 6;
    const floatY = surface + hgt / 2 - (1 - Math.min(weight, 100) / 100) * hgt * 3;
    const target = weight < 100 ? floatY : weight === 100 ? 190 : floor - hgt / 2 - 4;
    const cy = floatY + (target - floatY) * smooth((u - 0.5) / 3);
    let out = `<rect x="20" y="${surface}" width="520" height="${floor - surface + 14}" fill="${WATER}"/>`;
    out += `<line x1="20" y1="${surface}" x2="540" y2="${surface}" stroke="#7fb3dc" stroke-width="3"/>`;
    out += `<rect x="20" y="${floor}" width="520" height="14" fill="#d9c9a3"/>`;
    const [l, r, top] = [cx - len / 2, cx + len / 2, cy - hgt / 2];
    out += `<rect x="${cx - 22}" y="${n(top - 26)}" width="40" height="28" rx="6" fill="#56616b" stroke="${INK}" stroke-width="2"/>`;
    out += `<rect x="${l}" y="${n(top)}" width="${len}" height="${hgt}" rx="${hgt / 2}" fill="#6f7b86" stroke="${INK}" stroke-width="2.5"/>`;
    for (const x of [l + 18, r - 70]) {
      out += `<rect x="${n(x)}" y="${n(top + 9)}" width="52" height="${hgt - 18}" rx="6" fill="#f3efe6" stroke="${INK}" stroke-width="1.5"/>`;
      const h = ((hgt - 18) * s.fill) / 100;
      if (h > 0) out += `<rect x="${n(x + 1)}" y="${n(top + hgt - 9 - h)}" width="50" height="${n(h)}" rx="5" fill="#4f93cf"/>`;
    }
    out += txt(cx, top + hgt / 2 + 5, '水舱', { size: 12, color: '#f3efe6', plain: true });
    const base = 270;
    out += `<rect x="404" y="78" width="132" height="${base - 78 + 34}" rx="10" fill="#fffaf2" fill-opacity="0.92" stroke="#d8cbb3" stroke-width="1.5"/>`;
    out += txt(470, 96, '整艘泡进水里', { size: 12, color: '#8b7a5c' });
    for (const [x, value, color, name] of [[420, 100, BLUE, '浮力'], [480, weight, HOT, '艇重']] as const) {
      out += `<rect x="${x}" y="${n(base - value * 1.4)}" width="40" height="${n(value * 1.4)}" rx="4" fill="${color}"/>`;
      out += txt(x + 20, base - value * 1.4 - 6, `${value}`, { size: 14, bold: true, color });
      out += txt(x + 20, base + 20, name, { size: 13, color });
    }
    const verdict = weight < 100 ? '比浮力轻：浮在水面' : weight === 100 ? '和浮力一样大：停在水里' : '比浮力重：沉下去';
    out += txt(W - 16, 30, verdict, { anchor: 'end', size: 17, bold: true, color: weight === 100 ? '#2c774a' : weight > 100 ? HOT : BLUE });
    return out;
  },
  readout(s) {
    const weight = SUB_DRY + (SUB_TANK * s.fill) / 100;
    if (weight < 100) return `水舱灌进 ${s.fill}% 的水：艇重 ${weight} 份，整艘泡进水里能得到 100 份浮力，重力比它小，浮在水面上`;
    if (weight === 100) return '水舱灌进一半水：艇重正好等于 100 份浮力，不上也不下，停在水里（悬浮）';
    return `水舱灌进 ${s.fill}% 的水：艇重 ${weight} 份，比 100 份浮力还重，沉下去；要上浮，就用压缩空气把水挤出去`;
  },
};

/** 食盐水在 20 ℃ 的密度（g/cm³），按质量分数 w 拟合：w = 10% 约 1.07、20% 约 1.15、26% 约 1.20 */
const brineDensity = (salt: number): number => {
  const w = salt / (100 + salt);
  return 1 + 0.7 * w + 0.3 * w * w;
};
const EGG = 1.08;

export const brine: SimDef = {
  params: [{ key: 'salt', label: '每 100 毫升水里加盐', min: 0, max: 36, step: 2, value: 0, unit: ' 克' }],
  animated: false,
  draw(s) {
    const rho = brineDensity(s.salt);
    const [left, right, surface, bottom] = [130, 330, 96, 290];
    let out = `<rect x="${left}" y="${surface}" width="${right - left}" height="${bottom - surface}" rx="8" fill="${WATER}"/>`;
    out += `<path d="M${left - 8} 60 V${bottom - 8} Q${left - 8} ${bottom + 8} ${left + 8} ${bottom + 8} H${right - 8} Q${right + 8} ${bottom + 8} ${right + 8} ${bottom - 8} V60" fill="none" stroke="#6f8580" stroke-width="4"/>`;
    for (let i = 0; i < Math.round(s.salt / 3); i += 1) {
      out += `<rect x="${n(left + 14 + noise(i * 7) * (right - left - 28))}" y="${n(bottom - 4 - noise(i * 13) * 6)}" width="4" height="4" fill="#ffffff" stroke="#c9d8e4" stroke-width="0.8" opacity="${s.salt >= 36 ? 1 : 0.35}"/>`;
    }
    const [rx, ry] = [42, 31];
    const floats = rho > EGG + 0.002;
    const cy = floats ? surface - ry + (EGG / rho) * 2 * ry : bottom - ry;
    out += `<ellipse cx="230" cy="${n(cy)}" rx="${rx}" ry="${ry}" fill="#f7ecd9" stroke="${INK}" stroke-width="2.5"/>`;
    const [gx, low, high] = [450, 282, 64];
    const yOf = (d: number): number => low - ((d - 1) / 0.25) * (low - high);
    out += `<line x1="${gx}" y1="${low}" x2="${gx}" y2="${high}" stroke="${INK}" stroke-width="3"/>`;
    const marks: [number, string, string][] = [[1, '清水 1.00', INK], [1.025, '海水 1.03', INK], [EGG, `鸡蛋 ${EGG.toFixed(2)}`, HOT], [1.24, '死海 1.24', INK]];
    for (const [d, name, color] of marks) {
      out += `<line x1="${gx - 6}" y1="${n(yOf(d))}" x2="${gx + 6}" y2="${n(yOf(d))}" stroke="${color}" stroke-width="2.5"/>`;
      out += txt(gx + 12, yOf(d) + 5, name, { anchor: 'start', size: 13, color });
    }
    const my = yOf(rho);
    out += `<polygon points="${gx - 8},${n(my)} ${gx - 22},${n(my - 8)} ${gx - 22},${n(my + 8)}" fill="${BLUE}"/>`;
    out += txt(gx - 26, my + 5, `这杯 ${r2(rho)}`, { anchor: 'end', size: 13, color: BLUE, bold: true });
    out += txt(gx, 40, '密度（克/厘米³）', { size: 13, color: '#8b7a5c' });
    out += txt(230, 40, floats ? '浮起来了 ✔' : '沉在杯底', { size: 18, bold: true, color: floats ? '#2c774a' : HOT });
    return out;
  },
  readout(s) {
    const rho = brineDensity(s.salt);
    if (!s.salt) return `清水密度 1.00，新鲜鸡蛋约 ${EGG.toFixed(2)}：鸡蛋比同样大的一块水重，沉到杯底`;
    const full = s.salt >= 36 ? '（盐已经化不开了）' : '';
    return rho > EGG + 0.002
      ? `每 100 毫升水加 ${s.salt} 克盐，盐水密度约 ${r2(rho)}${full}，比鸡蛋大：鸡蛋泡进去一部分就够托住它，浮上来`
      : `每 100 毫升水加 ${s.salt} 克盐，盐水密度约 ${r2(rho)}，还比鸡蛋小：浮力托不住，鸡蛋还沉着`;
  },
};

/** 一架起飞重量 575 吨的大型客机（机翼面积约 845 m²）：升力（吨）≈ 0.0528 × v² × 升力系数，v 用 m/s */
const PLANE_T = 575;
const STALL = 16;
const liftCoef = (a: number): number => (a <= STALL ? 0.3 + 0.11 * a : 0.3 + 0.11 * STALL - 0.2 * (a - STALL));
const liftTons = (s: Record<string, number>): number => 0.0528 * (s.v / 3.6) ** 2 * liftCoef(s.a);

export const wing: SimDef = {
  params: [
    { key: 'v', label: '在跑道上跑的速度', min: 0, max: 320, step: 20, value: 200, unit: ' km/h' },
    { key: 'a', label: '机翼抬起的角度', min: 0, max: 20, step: 2, value: 8, unit: '°' },
  ],
  animated: true,
  still: 1,
  draw(s, t) {
    const lift = liftTons(s);
    const stalled = s.a > STALL;
    const [cx, cy] = [250, 176];
    const turn = s.v > 0 ? liftCoef(s.a) * 22 : 0;
    let out = `<rect x="0" y="292" width="${W}" height="28" fill="#cfc6b8"/><line x1="0" y1="292" x2="${W}" y2="292" stroke="${INK}" stroke-width="2"/>`;
    for (const y0 of [96, 132, 222, 258]) {
      const above = y0 < cy;
      const near = 1 / (1 + Math.abs(y0 - cy) / 50);
      const yAt = (x: number): number => {
        const bump = (above ? -1 : 1) * 16 * near * Math.exp(-(((x - cx) / 90) ** 2));
        const down = turn * near * smooth((x - cx + 40) / 220);
        const shake = stalled && above ? Math.sin(x / 9 + t * 8) * 7 * smooth((x - cx) / 60) : 0;
        return y0 + bump + down + shake;
      };
      const pts = Array.from({ length: 27 }, (_, i) => `${i * 22},${n(yAt(i * 22))}`).join(' ');
      out += `<polyline points="${pts}" fill="none" stroke="#9cc7e8" stroke-width="2"/>`;
      if (s.v > 0) {
        const speed = (s.v / 3.6) * 4 * (above && !stalled ? 1.35 : 1);
        for (let k = 0; k < 4; k += 1) {
          const x = (t * speed + k * 140 + y0) % W;
          out += `<circle cx="${n(x)}" cy="${n(yAt(x))}" r="3.5" fill="${BLUE}"/>`;
        }
      }
    }
    out += `<g transform="translate(${cx} ${cy}) rotate(${s.a})"><path d="M-100 0 C-80 -30 40 -26 100 2 C40 8 -70 14 -100 0 Z" fill="#e6e1d6" stroke="${INK}" stroke-width="2.5"/></g>`;
    const up = Math.min((lift / PLANE_T) * 80, 130);
    out += arrow(cx + 6, cy - 10, cx + 6, cy - 10 - up, BLUE, 5);
    out += arrow(cx - 6, cy + 12, cx - 6, cy + 12 + 80, HOT, 5);
    out += txt(cx + 16, Math.max(cy - 20 - up, 70), `升力 ${Math.round(lift)} 吨`, { anchor: 'start', size: 14, color: BLUE, bold: true });
    out += txt(cx - 16, cy + 84, `飞机重 ${PLANE_T} 吨`, { anchor: 'end', size: 14, color: HOT });
    out += txt(W - 14, 284, '机翼把气流往下压 ↘', { anchor: 'end', size: 13, color: '#4f7fa8' });
    const verdict = s.v === 0 ? '停着：没有气流，就没有升力' : stalled ? '抬得太陡：失速，升力掉下来' : lift >= PLANE_T ? '升力超过重力：飞起来了 ✈' : '升力还不够：还在跑道上跑';
    out += txt(W / 2, 30, verdict, { size: 16, bold: true, color: lift >= PLANE_T && !stalled ? '#2c774a' : HOT });
    return out;
  },
  readout(s) {
    const lift = liftTons(s);
    if (s.v === 0) return '飞机停着不动：机翼旁边没有气流，一点升力都没有';
    const head = `时速 ${s.v} 千米、机翼抬起 ${s.a}°：升力约 ${Math.round(lift)} 吨`;
    if (s.a > STALL) return `${head}。抬得太陡，气流贴不住机翼上表面，升力反而变小（失速）`;
    return lift >= PLANE_T ? `${head}，超过 ${PLANE_T} 吨的飞机重量，飞起来了` : `${head}，比 ${PLANE_T} 吨小，还得再快一点或再抬一点`;
  },
};

/** 站台上人身前的空气被列车带着跑：示意按离车越远衰减（每 0.6 米降到约 1/e）估；人正面迎风面积按 0.7 m² */
const AIR = 1.2;
const platformPush = (s: Record<string, number>): { u: number; dp: number; force: number } => {
  const u = (s.v / 3.6) * Math.exp(-s.d / 0.6);
  const dp = 0.5 * AIR * u * u;
  return { u, dp, force: dp * 0.7 };
};

export const flowPress: SimDef = {
  params: [
    { key: 'v', label: '列车开过的速度', min: 0, max: 200, step: 20, value: 120, unit: ' km/h' },
    { key: 'd', label: '人离站台边', min: 0.5, max: 2.5, step: 0.5, value: 0.5, unit: ' 米' },
  ],
  animated: true,
  still: 0.5,
  draw(s, t) {
    const { u, force } = platformPush(s);
    const [edge, perM] = [118, 70];
    let out = `<rect x="0" y="34" width="${W}" height="${edge - 34}" fill="#8a8178"/>`;
    const car = 230;
    const shift = (t * (s.v / 3.6) * 9) % car;
    for (let i = -1; i < 4; i += 1) {
      const x = i * car + shift;
      out += `<rect x="${n(x + 4)}" y="44" width="${car - 8}" height="${edge - 54}" rx="14" fill="#f3f1ec" stroke="${INK}" stroke-width="2"/>`;
      for (let k = 0; k < 5; k += 1) out += `<rect x="${n(x + 22 + k * 40)}" y="58" width="26" height="16" rx="3" fill="#7fb3dc"/>`;
      out += `<rect x="${n(x + 4)}" y="${edge - 28}" width="${car - 8}" height="8" fill="#d64545"/>`;
    }
    out += `<rect x="0" y="${edge}" width="${W}" height="${320 - edge}" fill="#ece6da"/>`;
    out += `<line x1="0" y1="${edge}" x2="${W}" y2="${edge}" stroke="#ffffff" stroke-width="4"/>`;
    const yellow = edge + perM;
    out += `<line x1="0" y1="${yellow}" x2="${W}" y2="${yellow}" stroke="#f2c230" stroke-width="8" stroke-dasharray="26 10"/>`;
    out += txt(14, yellow - 12, '黄线（离边 1 米）', { anchor: 'start', size: 13, color: '#9a7a12' });
    const py = edge + s.d * perM;
    const px = 360;
    if (s.v > 0) {
      for (const y of [edge + 10, (edge + py) / 2]) {
        const sp = (s.v / 3.6) * 7 * Math.exp(-(y - edge) / perM / 0.6);
        for (let k = 0; k < 6; k += 1) {
          const x = (t * sp + k * 96) % W;
          out += `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x + 18)}" y2="${n(y)}" stroke="${BLUE}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`;
        }
      }
    }
    const lean = clamp(force / 6, 0, 16);
    out += `<g transform="translate(${px} ${n(py - lean)})"><ellipse cx="0" cy="8" rx="24" ry="14" fill="#4a6fa5" stroke="${INK}" stroke-width="2"/><circle cx="0" cy="6" r="11" fill="#f6d2b3" stroke="${INK}" stroke-width="2"/></g>`;
    const len = clamp(force * 0.7, 0, 90);
    if (len > 2) {
      out += arrow(px, py + 30 + len, px, py + 26, HOT, 5);
      out += txt(px + 14, py + 40 + len / 2, `往车那边推 ${Math.round(force)} 牛`, { anchor: 'start', size: 13.5, color: HOT, bold: true });
    }
    const verdict = force < 30 ? '站得稳' : force < 80 ? '被推得晃一下' : '很危险！';
    out += txt(W / 2, 24, s.v === 0 ? '列车停着：前后的气压一样' : `身前空气 ${r1(u)} 米/秒 → ${verdict}`, { size: 15, bold: true, color: force >= 30 ? HOT : INK, plain: false });
    return out;
  },
  readout(s) {
    if (s.v === 0) return '列车停着：人身前身后的空气都不动，压强一样，谁也不推谁';
    const { u, dp, force } = platformPush(s);
    const verdict = force < 30 ? '站得稳' : force < 80 ? '会被推得晃一下' : '很容易被推向列车，非常危险';
    return `列车 ${s.v} km/h 开过、人离站台边 ${s.d} 米：身前空气被带着跑到约 ${r1(u)} 米/秒，压强比身后小约 ${Math.round(dp)} 帕，差出来的推力约 ${Math.round(force)} 牛——${verdict}`;
  },
};
