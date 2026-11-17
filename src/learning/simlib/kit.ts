import { escapeHtml } from '../html';

/** 互动图共用的类型、颜色和画图小工具。画布固定 560×320。 */

export interface SimParam {
  readonly key: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly value: number;
  readonly unit?: string;
  /** 分档的滑块：每一档的名字，值就是下标 */
  readonly labels?: readonly string[];
}

export type State = Record<string, number>;

export interface SimDef {
  readonly params: readonly SimParam[];
  readonly animated: boolean;
  /** 减少动态效果时停在第几秒 */
  readonly still?: number;
  draw(s: State, t: number): string;
  readout(s: State): string;
}

export const W = 560;
export const H = 320;
export const INK = '#5d4e37';
export const HOT = '#e8590c';
export const BLUE = '#3553a6';
export const WATER = '#cfe5f7';
export const G = 9.8;

export const n = (v: number): string => (Math.round(v * 10) / 10).toString();
export const r1 = (v: number): string => (Math.round(v * 10) / 10).toFixed(1);
export const r2 = (v: number): string => (Math.round(v * 100) / 100).toFixed(2);
export const esc = escapeHtml;
export const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi);
export const smooth = (x: number): number => {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};
export const rad = (deg: number): number => (deg * Math.PI) / 180;
export const deg = (r: number): number => (r * 180) / Math.PI;

export function noise(seed: number): number {
  let h = Math.imul(Math.floor(seed) ^ 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** plain：深色底上不描白边 */
export type TextOpts = { size?: number; anchor?: 'start' | 'middle' | 'end'; color?: string; bold?: boolean; plain?: boolean };
export function txt(x: number, y: number, s: string, o: TextOpts = {}): string {
  return `<text x="${n(x)}" y="${n(y)}" font-size="${o.size ?? 15}" text-anchor="${o.anchor ?? 'middle'}" fill="${o.color ?? INK}"${o.bold ? ' font-weight="700"' : ''} class="sim-text${o.plain ? ' is-plain' : ''}">${esc(s)}</text>`;
}

export function arrow(x1: number, y1: number, x2: number, y2: number, color = HOT, width = 4): string {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 2) return '';
  const a = Math.atan2(y2 - y1, x2 - x1);
  const head = Math.min(12, len * 0.6);
  const wing = (turn: number): string => `${n(x2 - head * Math.cos(a + turn))},${n(y2 - head * Math.sin(a + turn))}`;
  return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2 - (head * 0.6) * Math.cos(a))}" y2="${n(y2 - (head * 0.6) * Math.sin(a))}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`
    + `<polygon points="${n(x2)},${n(y2)} ${wing(0.45)} ${wing(-0.45)}" fill="${color}"/>`;
}

export const poly = (points: readonly (readonly [number, number])[]): string => points.map(([x, y]) => `${n(x)},${n(y)}`).join(' ');
