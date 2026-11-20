import { describe, expect, it, vi } from 'vitest';
import { setHtml } from '../src/learning/html';
import { mountSims, renderSim, simNames } from '../src/learning/sims';

const broken = /NaN|undefined|Infinity/;

function combos(inputs: HTMLInputElement[]): number[][] {
  const levels = inputs.map(input => {
    const [min, max, step] = [Number(input.min), Number(input.max), Number(input.step)];
    const mid = min + Math.round((max - min) / 2 / step) * step;
    return [...new Set([min, mid, max])];
  });
  return levels.reduce<number[][]>((all, values) => all.flatMap(prefix => values.map(value => [...prefix, value])), [[]]);
}

describe('能拖滑块的互动图', () => {
  it.each(simNames)('%s draws a clean picture and readout for every slider setting', name => {
    const host = document.createElement('div');
    setHtml(host, renderSim(name, '说明', 'sim-0'));
    const stop = mountSims(host);
    const svg = host.querySelector('.sim-svg')!;
    const readout = host.querySelector('.sim-readout')!;
    const inputs = [...host.querySelectorAll<HTMLInputElement>('input[data-key]')];
    expect(inputs.length).toBeGreaterThan(0);
    expect(svg.innerHTML).not.toMatch(broken);

    for (const values of combos(inputs)) {
      values.forEach((value, i) => {
        inputs[i].value = String(value);
        inputs[i].dispatchEvent(new Event('input'));
      });
      const where = `${name} ${values.join(' / ')}`;
      expect(svg.innerHTML, where).not.toMatch(broken);
      expect(svg.querySelectorAll('*').length, where).toBeGreaterThan(3);
      expect(readout.textContent, where).not.toMatch(broken);
      expect(readout.textContent!.length, where).toBeGreaterThan(6);
      for (const input of inputs) expect(input.parentElement!.querySelector('output')!.textContent, where).not.toBe('');
    }
    stop();
  });

  it('animates visible sims cleanly across time and pauses when hidden or scrolled away', () => {
    let observerCallback: IntersectionObserverCallback | undefined;
    const origObserver = globalThis.IntersectionObserver;
    let rafId = 0;
    const queue = new Map<number, FrameRequestCallback>();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      const id = ++rafId;
      queue.set(id, cb);
      return id;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
      queue.delete(id);
    });
    globalThis.IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) { observerCallback = cb; }
      observe(): void {}
      unobserve(): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [];
    };

    try {
      for (const name of simNames) {
        queue.clear();
        const host = document.createElement('div');
        setHtml(host, renderSim(name, '说明', `sim-${name}`));
        const stop = mountSims(host);
        const svg = host.querySelector('.sim-svg')!;
        observerCallback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
        if (queue.size > 0) {
          for (const stamp of [100, 700, 1600]) {
            const next = [...queue.values()][0];
            queue.clear();
            next?.(stamp);
            expect(svg.innerHTML, `${name} @ ${stamp}ms`).not.toMatch(broken);
          }
          observerCallback?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
          expect(queue.size, `${name} should stop raf when out of view`).toBe(0);
        }
        stop();
      }
    } finally {
      globalThis.IntersectionObserver = origObserver;
    }
  });
});
