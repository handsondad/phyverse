import { html, raw, setHtml, type SafeHtml } from './html';
import { H, W, n, type SimDef, type SimParam, type State } from './simlib/kit';
import { inertia, projectile, slide, friction, tug, fall, push, drop, whirl } from './simlib/motion';
import { buoyancy, straw, press, depth, ballast, brine, wing, flowPress } from './simlib/pressure';
import { coaster, lever, pulley, ramp, bounce, pendulum, stairs, chute } from './simlib/energy';
import { evaporation, conduction, kettle, insulate, boil, dew, heatCap, diffuse } from './simlib/heat';
import { thunder, guitar, bellJar, echo, doppler, medium, resonance, noiseBlock } from './simlib/sound';
import { refraction, prism, seeLight, shadow, mirror, scatter, burnLens, eyeFocus } from './simlib/light';
import { staticShock, circuit, bird, ohm, load, joule, battery, capacitor } from './simlib/circuit';
import { compass, magnetize, coil, motor, generator, speaker, eddy, aurora } from './simlib/magnet';
import { orbit, elevator } from './simlib/cosmos';
import { phases, tilt, parallax, eclipse, tide, lightyear } from './simlib/sky';
import { zoom, rutherford, photon, signal, microwave, xray, chain, fusion } from './simlib/micro';

/**
 * 文章里能拖滑块的互动图。每一种只由「滑块的值」和「时间 t」决定画面，
 * 所以静态页面能先画出默认那一帧，减少动态效果时停在固定的一帧，滑走了就暂停。
 * 画布固定 560×320；每个主题的互动图写在 simlib/<主题>.ts，共用的画图工具在 simlib/kit.ts。
 */

export type { SimParam };

const SIMS = {
  inertia, projectile, slide, friction, tug, fall, push, drop, whirl, buoyancy, straw, press, depth, ballast, brine, wing, flowPress,
  coaster, lever, pulley, ramp, bounce, pendulum, stairs, chute, evaporation, conduction, kettle, insulate, boil, dew, heatCap, diffuse,
  thunder, guitar, bellJar, echo, doppler, medium, resonance, noiseBlock, refraction, prism, seeLight, shadow, mirror, scatter, burnLens, eyeFocus, staticShock, circuit, bird, ohm, load, joule, battery, capacitor,
  compass, magnetize, coil, motor, generator, speaker, eddy, aurora, orbit, elevator, phases, tilt, parallax, eclipse, tide, lightyear,
  zoom, rutherford, photon, signal, microwave, xray, chain, fusion,
} satisfies Record<string, SimDef>;

export type SimName = keyof typeof SIMS;
export const simNames = Object.keys(SIMS) as SimName[];

function defaults(def: SimDef): State {
  return Object.fromEntries(def.params.map(p => [p.key, p.value]));
}

export function simParams(name: SimName): readonly SimParam[] {
  return SIMS[name].params;
}

/** 给预览工具用：滑块拨到 values、第 t 秒时的完整画面和读数 */
export function simSnapshot(name: SimName, values: State, t?: number): { svg: string; readout: string } {
  const def = SIMS[name];
  const state = { ...defaults(def), ...values };
  return {
    svg: `<svg class="sim-svg" viewBox="0 0 ${W} ${H}">${frame(def, state, t ?? def.still ?? 0)}</svg>`,
    readout: def.readout(state),
  };
}

function valueText(p: SimParam, value: number): string {
  return p.labels ? p.labels[Math.round(value)] ?? '' : `${Number.isInteger(p.step) ? value : n(value)}${p.unit ?? ''}`;
}

function frame(def: SimDef, s: State, t: number): string {
  return `<rect width="${W}" height="${H}" rx="12" fill="#fffdf8"/>${def.draw(s, t)}`;
}

/** 静态页面就画好默认那一帧和滑块；接上交互由 mountSims 来做 */
export function renderSim(name: SimName, caption: string, id: string): SafeHtml {
  const def = SIMS[name];
  const state = defaults(def);
  return html`
    <figure class="fig fig-sim" data-sim="${name}" data-id="${id}">
      <svg class="sim-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${caption}">${raw(frame(def, state, def.still ?? 0))}</svg>
      <div class="sim-controls">
        ${def.params.map(p => html`
          <label class="sim-param">
            <span>${p.label}</span>
            <input type="range" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.value}" data-key="${p.key}" aria-valuetext="${valueText(p, p.value)}">
            <output>${valueText(p, p.value)}</output>
          </label>`)}
      </div>
      <p class="sim-readout" aria-live="polite">${def.readout(state)}</p>
      <figcaption>👆 拖一拖滑块 · ${caption}</figcaption>
    </figure>`;
}

/** 给文章里所有互动图接上滑块和动画；返回的函数拆掉监听、停下动画 */
export function mountSims(root: ParentNode): () => void {
  const stops = [...root.querySelectorAll<HTMLElement>('figure[data-sim]')].map(mountOne);
  return () => stops.forEach(stop => stop());
}

function mountOne(figure: HTMLElement): () => void {
  const name = figure.dataset.sim as SimName;
  const def = SIMS[name];
  const svg = figure.querySelector<SVGSVGElement>('.sim-svg');
  const readout = figure.querySelector<HTMLElement>('.sim-readout');
  if (!def || !svg || !readout) return () => undefined;
  const state = defaults(def);
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  let visible = false;
  let raf = 0;
  let started = 0;
  let last = 0;

  const draw = (t: number): void => setHtml(svg, raw(frame(def, state, t)));
  const tick = (now: number): void => {
    raf = 0;
    if (!visible) return;
    if (!started) started = now;
    if (now - last > 30) {
      draw((now - started) / 1000);
      last = now;
    }
    raf = requestAnimationFrame(tick);
  };
  const play = (): void => {
    if (!raf && visible && def.animated && !still && typeof requestAnimationFrame === 'function') raf = requestAnimationFrame(tick);
  };

  const inputs = [...figure.querySelectorAll<HTMLInputElement>('input[data-key]')];
  const onInput = (event: Event): void => {
    const input = event.currentTarget as HTMLInputElement;
    const param = def.params.find(p => p.key === input.dataset.key);
    if (!param) return;
    state[param.key] = Number(input.value);
    const text = valueText(param, state[param.key]);
    input.setAttribute('aria-valuetext', text);
    const output = input.parentElement?.querySelector('output');
    if (output) output.textContent = text;
    readout.textContent = def.readout(state);
    started = 0;
    if (!def.animated || still || !raf) draw(def.still ?? 0);
  };
  inputs.forEach(input => input.addEventListener('input', onInput));

  const observer = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) play();
    }, { threshold: 0.15 })
    : null;
  observer?.observe(figure);

  return () => {
    observer?.disconnect();
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    visible = false;
    inputs.forEach(input => input.removeEventListener('input', onInput));
  };
}
