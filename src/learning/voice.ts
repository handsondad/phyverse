import manifest from '../data/voice-manifest.json';
import type { LineLength, Speaker } from './film/narration';

// 小念和爸爸的配音：npm run voice 用 edge-tts 把每篇有动画的文章逐句读出来，
// 放在 public/voice/<slug>/<轮次>-<nian|dad>.mp3，时长记在 src/data/voice-manifest.json。
// 声音和「身体奇遇记」「化学奇遇记」一样，同一对角色听起来也是同一对人。

export const voices = {
  nian: { voice: 'zh-CN-YunxiaNeural', rate: '+0%' },
  dad: { voice: 'zh-CN-YunxiNeural', rate: '-5%' },
} as const satisfies Record<Speaker, { voice: string; rate: string }>;

export const clipKey = (slug: string, turn: number, who: Speaker): string => `${slug}/${turn}-${who}`;

export type VoiceManifest = { voices: typeof voices; clips: Record<string, { hash: string; seconds: number }> };

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const byLength = (table: Record<string, string>): string =>
  Object.keys(table).sort((a, b) => b.length - a.length).map(escapeRegExp).join('|');

/** 数字后面的单位念成中文；一个字母的单位要和数字隔开或在句末才算，免得把「3 m 长」以外的字母也念了 */
const UNITS: Record<string, string> = {
  'm/s²': '米每二次方秒', 'km/s': '千米每秒', 'km/h': '千米每小时', 'm/s': '米每秒', 'rad/s': '弧度每秒', 'r/s': '转每秒',
  'J·s': '焦耳秒', 'V/(10¹⁴ Hz)': '伏每10的14次方赫兹', 'kg/m³': '千克每立方米', 'g/cm³': '克每立方厘米',
  'μA': '微安', 'mA': '毫安', 'kΩ': '千欧', 'MΩ': '兆欧', 'μF': '微法', 'mF': '毫法', 'mC': '毫库', 'μC': '微库',
  'μW': '微瓦', 'mW': '毫瓦', 'kW': '千瓦', 'kV': '千伏', 'mV': '毫伏', 'eV': '电子伏', 'nm': '纳米', 'μm': '微米',
  'mm': '毫米', 'cm': '厘米', 'km': '千米', 'kg': '千克', 'mg': '毫克', 'kPa': '千帕', 'Pa': '帕', 'kHz': '千赫',
  'Hz': '赫兹', 'kJ': '千焦', 'mT': '毫特', 'min': '分钟', 'ms': '毫秒', 'mH': '毫亨', '℃': '摄氏度',
  'μm²': '平方微米', 'μT': '微特', 'r/min': '转每分钟',
};
const SHORT_UNITS: Record<string, string> = { V: '伏', A: '安', W: '瓦', J: '焦', N: '牛', s: '秒', m: '米', g: '克', H: '亨', T: '特', Ω: '欧', K: '开', C: '库' };
const SUPERSCRIPT = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const SUBSCRIPT = '₀₁₂₃₄₅₆₇₈₉';
const UNIT = new RegExp(`([\\d${SUPERSCRIPT}])\\s*(${byLength(UNITS)})(?![A-Za-z])`, 'g');
const SHORT_UNIT = new RegExp(`([\\d${SUPERSCRIPT}])\\s*(${byLength(SHORT_UNITS)})(?![A-Za-z²³/·₀-₉])`, 'g');
const POWER = new RegExp(`(\\d)\\s*×\\s*10(⁻?[${SUPERSCRIPT}]+)`, 'g');
const CIRCLED = '①②③④⑤⑥⑦⑧⑨⑩';

/** 课件里常见的物理量符号：念它的名字比念字母好懂 */
const SYMBOLS: readonly (readonly [RegExp, string])[] = [
  [/U_?c\b/g, '遏止电压'], [/I_?sat\b|I_s\b/g, '饱和电流'], [/W₀′?/g, '逸出功'], [/ν_?c\b|νc/g, '截止频率'],
  [/E_?k\b/g, '动能'], [/u_?C\b/g, '电容电压'], [/τ_?chg|τ_?dis/g, '时间常数'], [/[½]\s*m(?:ₑ)?v(?:_c)?²/g, '二分之一m v平方'],
  [/hν/g, 'h乘频率'], [/ν/g, '频率'], [/λ/g, '波长'], [/τ/g, '时间常数'], [/ω/g, '角速度'], [/Δ/g, '变化'], [/ε/g, '电动势'],
  [/∝/g, '正比于'], [/√/g, '根号'], [/∫\s*i\s*dt/g, '电流对时间的积分'],
];

/** 文章里的字 → 念出来的字：单位、温度、角度、范围换成读法 */
export function speakable(text: string): string {
  return text
    .replace(/(^|[^\d])\+(\d)/g, '$1正$2')
    .replace(/(^|[^\d\w])[−-](\d)/g, '$1负$2')
    .replace(/(\d)\s*[–~～]\s*(\d)/g, '$1到$2')
    .replace(/(\d+)°(\d+)′/g, '$1度$2分')
    .replace(/(\d+)°/g, '$1度')
    .replace(/\s*℃/g, '摄氏度')
    .replace(UNIT, (_, digit: string, unit: string) => `${digit}${UNITS[unit]}`)
    .replace(SHORT_UNIT, (_, digit: string, unit: string) => `${digit}${SHORT_UNITS[unit]}`)
    .replace(/([\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, '$1');
}

// 3D 实验台「看懂原理」也是小念问、爸爸讲：npm run voice 把每一段念成
// public/voice/lab/<课件>/<段>-<q|seen|concl>-<指纹>.mp3。指纹算的是课件里的原文（fnv1a），
// 课件改了字，文件名就对不上，实验台退回无声，等重新配音。
export type LabPart = 'q' | 'seen' | 'concl';
/** public/theme/lab-script.json：每个课件按步骤号一条；hold 的考核段没有演示，不写讲稿 */
export type LabLine =
  | { readonly tag: string; readonly hold: true }
  | { readonly tag: string; readonly hold?: undefined; readonly q: string; readonly eq?: string; readonly seen: string; readonly concl: string };
export type LabScript = Record<string, readonly LabLine[]>;
export const labSpeaker: Record<LabPart, Speaker> = { q: 'nian', seen: 'dad', concl: 'dad' };

/** 和 public/theme/lesson-adapter.js 里的 fnv1a 一字不差 */
export function fnv1a(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export const labClipKey = (slug: string, segment: number, part: LabPart, raw: string): string =>
  `lab/${slug}/${segment}-${part}-${fnv1a(raw)}`;

/** 实验台的一段话 → 念出来的字：括号里的旁注不念，单位、物理量符号、比较号和科学记数法念中文 */
export function labSpeakable(text: string): string {
  let out = text.replace(/（[^（）]*）|\([^()]*[\u4e00-\u9fff][^()]*\)/g, '');
  out = out
    .replace(UNIT, (_, digit: string, unit: string) => `${digit}${UNITS[unit]}`)
    .replace(SHORT_UNIT, (_, digit: string, unit: string) => `${digit}${SHORT_UNITS[unit]}`)
    .replace(POWER, (_, digit: string, power: string) =>
      `${digit}乘10的${power.startsWith('⁻') ? '负' : ''}${[...power.replace('⁻', '')].map(d => SUPERSCRIPT.indexOf(d)).join('')}次方`)
    .replace(/([\w)²³])\s*\+\s*(?=[\w(])/g, '$1加')
    .replace(/([\w)²³])\s*−\s*(?=[\w(])/g, '$1减');
  for (const [pattern, name] of SYMBOLS) out = out.replace(pattern, name);
  out = out
    .replace(/\bp\.\s*(\d+)/g, '第$1页')
    .replace(/(\d) (\d{3})(?!\d)/g, '$1$2')
    .replace(/(\d+)\s*\/\s*(\d+)(?!\d)/g, '$2分之$1')
    .replace(new RegExp(`[${CIRCLED}]\\s*`, 'g'), mark => `${'一二三四五六七八九十'[CIRCLED.indexOf(mark.trim())]}、`)
    .replace(/\s*(?:→|⟶|⇒)\s*/g, '，变成').replace(/\s*(?:↔|⇄)\s*/g, '，')
    .replace(/\s*≤\s*/g, '小于等于').replace(/\s*≥\s*/g, '大于等于')
    .replace(/\s*=\s*/g, '等于').replace(/\s*≈\s*/g, '约等于').replace(/\s*≠\s*/g, '不等于')
    .replace(/\s*<\s*/g, '小于').replace(/\s*>\s*/g, '大于').replace(/\s*±\s*/g, '正负')
    .replace(/(\d)×(?!\s*\d)/g, '$1倍').replace(/\s*×\s*/g, '乘').replace(/\s*÷\s*/g, '除以')
    .replace(/([A-Za-z])²/g, '$1的平方').replace(/²/g, '平方').replace(/³/g, '立方')
    .replace(/([\u4e00-\u9fff])\s*↑/g, '$1升高').replace(/([\u4e00-\u9fff])\s*↓/g, '$1降低').replace(/[↑↓]/g, '')
    .replace(/\s+\/\s+/g, '，').replace(/\//g, '每')
    .replace(/\s*·\s*/g, '，')
    .replace(/[「」]/g, '')
    .replace(new RegExp(`[${SUBSCRIPT}]`, 'g'), digit => String(SUBSCRIPT.indexOf(digit)))
    .replace(/，\s*([，。；：])/g, '$1')
    .replace(/^，/, '');
  return speakable(out);
}

export type FilmVoice = {
  readonly turnCount: number;
  readonly lengthOf: LineLength;
  readonly src: (turn: number, who: Speaker) => string;
};

const clips = (manifest as VoiceManifest).clips;

/** 这篇文章的配音；一句都还没配就是 undefined，播放器不显示声音开关 */
export function voiceFor(slug: string, turnCount: number): FilmVoice | undefined {
  if (!clips[clipKey(slug, 0, 'nian')]) return undefined;
  return {
    turnCount,
    lengthOf: (turn, who) => clips[clipKey(slug, turn, who)]?.seconds,
    src: (turn, who) => `${import.meta.env.BASE_URL}voice/${clipKey(slug, turn, who)}.mp3`,
  };
}
