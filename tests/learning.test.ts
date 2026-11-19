import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { autoArticle } from '../src/learning/article';
import { labs, lessonAsset, lessons, unitLabs, unitLessons, units } from '../src/learning/catalog';
import { getLessonDialogue } from '../src/learning/dialogue';
import { emptyProgress, PROGRESS_KEY, readProgress, writeProgress } from '../src/learning/progress';
import { findStory } from '../src/learning/stories';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('physics lesson collection', () => {
  it('sorts everything into ten physics topics plus the physicists’ stories', () => {
    expect(units.map(unit => unit.id)).toEqual(['motion', 'pressure', 'energy', 'heat', 'sound', 'light', 'circuit', 'magnet', 'cosmos', 'micro', 'physicists']);
    expect(new Set(units.map(unit => unit.color)).size).toBe(units.length);
    for (const unit of units) {
      expect(unit.emoji).not.toBe('');
      expect(unit.kidHook).toMatch(/？$/);
      expect(unit.dadLens.length).toBeGreaterThan(4);
      expect(unit.question).toMatch(/？$/);
    }
    expect(new Set(lessons.map(lesson => lesson.slug)).size).toBe(lessons.length);
    expect(lessons.every(lesson => units.some(unit => unit.id === lesson.unit))).toBe(true);
  });

  it('fills every topic with researched everyday questions', () => {
    for (const unit of units) {
      const items = unitLessons(unit.id);
      const native = items.filter(lesson => lesson.kind === 'native');
      expect(items.length, unit.id).toBeGreaterThanOrEqual(9);
      expect(native.length, unit.id).toBeGreaterThanOrEqual(7);
    }
    expect(lessons.filter(lesson => !lesson.story).map(lesson => lesson.slug)).toEqual([]);
  });

  it('ships the 3D courseware, covers and original licensing locally, themed by the injected adapter', () => {
    const simulations = lessons.filter(lesson => lesson.kind === 'simulation');
    expect(simulations.length).toBe(10);
    for (const lesson of simulations) {
      expect(existsSync(resolve(root, 'public', 'lessons', lesson.file!))).toBe(true);
      expect(existsSync(resolve(root, 'public', 'lessons', lesson.cover!))).toBe(true);
      expect(lesson.steps.length).toBeGreaterThan(0);
      const source = readFileSync(resolve(root, 'public', 'lessons', lesson.file!), 'utf8');
      expect(source).toContain('<canvas');
      expect(source).toContain('<link rel="stylesheet" href="../../theme/lesson.css">');
      expect(source).toContain('<script defer src="../../theme/lesson-adapter.js"></script>');
    }
    expect(readFileSync(resolve(root, 'public', 'lessons', 'LICENSE'), 'utf8')).toContain('CC BY-NC 4.0');
    expect(existsSync(resolve(root, 'public', 'lessons', 'THIRD_PARTY_NOTICES.md'))).toBe(true);
    const directory = readFileSync(resolve(root, 'public', 'lessons', 'courses', 'index.html'), 'utf8');
    for (const lesson of simulations) expect(directory).toContain(`href="${lesson.slug}.html"`);
    expect(lessonAsset(simulations[0].file!)).toContain('lessons/courses/');
  });

  it('keeps background questions pointing backwards, never forwards', () => {
    for (const [index, lesson] of lessons.entries()) {
      expect(lesson.hook.length).toBeGreaterThan(15);
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.takeaway.length).toBeGreaterThan(15);
      for (const prerequisite of lesson.prerequisites) {
        const at = lessons.findIndex(item => item.slug === prerequisite);
        expect(at).toBeGreaterThanOrEqual(0);
        expect(at).toBeLessThan(index);
      }
    }
  });

  it('shares one set of design tokens between the site and the isolated lessons', () => {
    const theme = readFileSync(resolve(root, 'public', 'theme', 'lesson.css'), 'utf8');
    const tokens = readFileSync(resolve(root, 'public', 'theme', 'tokens.css'), 'utf8');
    expect(theme).toContain("@import './tokens.css'");
    expect(tokens).toContain('--cv-accent: #3553a6');
    expect(tokens).toContain('color-scheme: light');
    expect(theme).toContain('--ink: var(--cv-text) !important');
    expect(theme).not.toMatch(/filter:\s*(invert|hue-rotate)/);
  });

  it('gives every question a 小念 × 爸爸 article that does not repeat the opening or closing', () => {
    for (const lesson of lessons) {
      const { article } = lesson;
      expect(article.title).toMatch(/[？?]/);
      expect(article.trigger.length).toBeGreaterThan(10);
      expect(article.tip.length).toBeGreaterThan(10);
      expect(article.turns.length).toBeGreaterThanOrEqual(2);
      for (const turn of article.turns) {
        expect(turn.nian.trim()).not.toBe('');
        expect(turn.dad.trim()).not.toBe('');
      }
      for (const turn of lesson.dialogue) {
        expect(turn.ask).not.toBe(lesson.question);
        expect(turn.answer).not.toBe(lesson.takeaway);
      }
      if (!lesson.story) {
        expect(article.turns.at(-1)?.dad).toContain(lesson.takeaway);
        expect(article.film).toBeUndefined();
      }
    }
  });
});

describe('learning progress', () => {
  beforeEach(() => localStorage.clear());

  it('persists only the opened / read lesson record', () => {
    expect(readProgress()).toEqual(emptyProgress());
    const progress = { started: ['emf-step'], completed: ['emf-step'], lastLesson: 'emf-step' };
    writeProgress(progress);
    expect(readProgress()).toEqual(progress);
  });

  it('drops lessons that are no longer in the curriculum instead of discarding the whole record', () => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
      started: ['retired-lesson', 'emf-step'],
      completed: ['retired-lesson', 'emf-step'],
      lastLesson: 'retired-lesson',
    }));
    expect(readProgress()).toEqual({ started: ['emf-step'], completed: ['emf-step'], lastLesson: null });
  });

  it.each([
    '{',
    '{"started":[],"completed":["emf-step"],"lastLesson":null}',
    '{"started":[1],"completed":[],"lastLesson":null}',
    '{"started":[],"completed":[],"lastLesson":1}',
    '{"started":["emf-step","emf-step"],"completed":[],"lastLesson":null}',
  ])('reports malformed records instead of treating them as successful restores', stored => {
    localStorage.setItem(PROGRESS_KEY, stored);
    expect(() => readProgress()).toThrow();
  });
});

describe('learning workspace', () => {
  let listeners: { type: string; listener: EventListenerOrEventListenerObject }[] = [];
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetModules();
    listeners = [];
    localStorage.clear();
    window.history.replaceState(null, '', '/#home');
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    document.documentElement.lang = parsed.documentElement.lang;
    document.head.innerHTML = parsed.head.innerHTML;
    document.body.innerHTML = parsed.body.innerHTML;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: false })),
    });
  });

  afterEach(() => {
    for (const { type, listener } of listeners) window.removeEventListener(type, listener);
    vi.clearAllTimers();
    vi.useRealTimers();
    document.body.style.overflow = '';
  });

  async function start(): Promise<void> {
    // Keep each initialization in a separate window event lifecycle in jsdom.
    const add = window.addEventListener.bind(window);
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
      if (listener && ['hashchange', 'storage', 'message'].includes(type)) listeners.push({ type, listener });
      add(type, listener, options);
    });
    await import('../src/main');
    vi.runAllTimers();
  }

  function navigate(hash: string): void {
    window.history.replaceState(null, '', `/${hash}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  it('opens on 小念 and 爸爸 exploring physics, followed by one card per topic and the 3D lab', async () => {
    await start();
    expect(document.querySelector('.home-title h1')?.textContent).toContain('物理奇遇记');
    expect(document.getElementById('duo-title')?.textContent).toBe('小念和爸爸探索物理的奥秘');
    const cards = [...document.querySelectorAll<HTMLAnchorElement>('.topic-card:not(.is-labs)')];
    expect(cards.map(card => card.getAttribute('href'))).toEqual(units.map(unit => `#topic/${unit.id}`));
    expect(cards[0].textContent).toContain(`${unitLessons('motion').length} 个问题`);
    const labCard = document.querySelector('.topic-card.is-labs');
    expect(labCard?.getAttribute('href')).toBe('#labs');
    expect(labCard?.textContent).toContain(`${labs.length} 个实验`);
    const first = document.getElementById('duo-go')?.getAttribute('href');
    expect(first).toMatch(/^#q\//);
    document.getElementById('duo-next')!.click();
    expect(document.getElementById('duo-go')?.getAttribute('href')).not.toBe(first);
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.querySelector('.learning-footer')?.textContent).toContain('物理奇遇记');
    expect(document.querySelector('.learning-footer')?.textContent).not.toMatch(/CC BY-NC|仅限非商业使用/);
    expect(document.querySelector<HTMLImageElement>('#home-planet > img.home-duo-poster')?.getAttribute('src')).toContain('images/home-duo-poster.webp');
  });

  it('ships the home poster that stands in for the 3D planet until it loads', () => {
    const posterPath = resolve(root, 'public', 'images', 'home-duo-poster.webp');
    expect(existsSync(posterPath)).toBe(true);
    expect(readFileSync(posterPath).byteLength).toBeGreaterThan(10_000);
    expect(html).toContain('href="./images/home-duo-poster.webp"');
  });

  it('lists every question of a topic and links its neighbours', async () => {
    await start();
    navigate('#topic/circuit');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('电与电路');
    expect(document.querySelector('.qlist-intro')?.textContent).toContain('爸爸：这一类其实都在讲');
    const hrefs = [...document.querySelectorAll('.qlist-card')].map(card => card.getAttribute('href')).sort();
    expect(hrefs).toEqual(unitLessons('circuit').map(lesson => `#q/${lesson.slug}`).sort());
    expect(document.querySelectorAll('.qlist-chips a')).toHaveLength(units.length);
    expect(document.querySelector('.qlist-chips a[aria-current]')?.getAttribute('href')).toBe('#topic/circuit');
    navigate('#unit/magnet');
    expect(document.querySelector('.page-top h1')?.textContent).toContain('磁与电磁');
    navigate('#path');
    expect(document.querySelectorAll('.topic-card')).toHaveLength(units.length + 1);
  });

  it('can still turn a lab lesson into a chat with its cover when no story is written', () => {
    const lesson = lessons.find(item => item.slug === 'photoelectric-step')!;
    const cover = lessonAsset(lesson.cover!);
    const dialogue = getLessonDialogue(lesson);
    const article = autoArticle({ ...lesson, cover }, dialogue);
    expect(article.turns).toHaveLength(dialogue.length + 1);
    expect(article.turns.at(-1)!.dad).toContain(lesson.takeaway);
    expect(article.turns.find(turn => turn.figure)?.figure).toMatchObject({ kind: 'image', src: cover });
  });

  it('opens a lab lesson as its written story, linking out to the lab instead of embedding it', async () => {
    const story = findStory('photoelectric-step')!;
    await start();
    navigate('#q/photoelectric-step');
    expect(document.querySelector('.page-top h1')?.textContent).toBe(story.title);
    expect(document.querySelectorAll('.story-turn').length).toBeGreaterThanOrEqual(story.dialogue.length);
    expect(document.querySelector('iframe, #open-lab')).toBeNull();
    expect(document.querySelector('.page-lab')?.getAttribute('href')).toBe('#lab/photoelectric-step');
    const credits = [...document.querySelectorAll<HTMLAnchorElement>('.qa-sources a')];
    expect(credits.length).toBeGreaterThanOrEqual(story.sources.length);
    for (const credit of credits) {
      expect(credit.href).toMatch(/^https:/);
      expect(credit.rel).toBe('noopener noreferrer');
    }
    expect(readProgress().started).toEqual(['photoelectric-step']);
    navigate('#home');
    expect(document.querySelector('.topic-card[href="#topic/micro"]')?.textContent).toContain('看过 1 个');
  });

  it('gathers every experiment in the 3D lab, grouped by topic', async () => {
    await start();
    navigate('#labs');
    expect(document.title).toContain('3D 实验台');
    expect(document.querySelectorAll('.lab-card[href^="#lab/"]')).toHaveLength(labs.length);
    const groups = units.filter(unit => unitLabs(unit.id).length);
    expect(document.querySelectorAll('.labs .qlist-group')).toHaveLength(groups.length);
    expect(labs.every(lesson => lesson.kind === 'simulation' && lesson.file)).toBe(true);
  });

  it('runs a 3D lab on its own page and jumps to any step', async () => {
    await start();
    navigate('#lab/emf-step');
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toContain('lessons/courses/emf-step.html');
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.title).toContain('电动势');
    expect(document.querySelector('.page-lab')?.getAttribute('href')).toBe('#q/emf-step');
    const steps = document.querySelectorAll<HTMLButtonElement>('[data-lab-step]');
    expect(steps).toHaveLength(lessons.find(lesson => lesson.slug === 'emf-step')!.steps.length);

    steps[2].click();
    const post = vi.spyOn(frame.contentWindow!, 'postMessage');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:ready' }, source: frame.contentWindow }));
    expect(post).toHaveBeenCalledWith({ type: 'phyverse:play-step', step: 2 }, '*');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:step', step: 3 }, source: frame.contentWindow }));
    expect(steps[3].classList.contains('is-active')).toBe(true);
    steps[1].click();
    expect(post).toHaveBeenLastCalledWith({ type: 'phyverse:play-step', step: 1 }, '*');

    document.getElementById('reload-lesson')?.click();
    expect(document.querySelector('iframe')).not.toBe(frame);
    navigate('#home');
    expect(document.querySelector('iframe')).toBeNull();
  });

  it('supports legacy lesson links and unknown-route recovery', async () => {
    window.history.replaceState(null, '', '/#lesson/photoelectric-step');
    await start();
    expect(document.querySelector('.page-top h1')?.textContent).toBe(lessons.find(lesson => lesson.slug === 'photoelectric-step')!.article.title);
    navigate('#lab/photoelectric-step');
    expect(document.querySelector('iframe')?.title).toContain('光电效应');
    navigate('#q/unknown');
    expect(document.querySelector('iframe')).toBeNull();
    expect(document.title).toContain('页面未找到');
    expect(document.querySelector('.empty-state a')?.getAttribute('href')).toBe('#home');
  });

  it('only accepts messages from the currently mounted lesson frame', async () => {
    await start();
    navigate('#lab/emf-step');
    const frame = document.querySelector('iframe')!;
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:ready' }, source: window }));
    expect(document.getElementById('player-status')?.textContent).toContain('启动');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:ready' }, source: frame.contentWindow }));
    expect(document.getElementById('player-status')?.textContent).toContain('就绪');
    const data = { type: 'phyverse:open-lesson', slug: 'capacitor-step' };
    window.dispatchEvent(new MessageEvent('message', { data, source: window }));
    expect(location.hash).toBe('#lab/emf-step');
    window.dispatchEvent(new MessageEvent('message', { data: { ...data, slug: 'unknown' }, source: frame.contentWindow }));
    expect(location.hash).toBe('#lab/emf-step');
    window.dispatchEvent(new MessageEvent('message', { data, source: frame.contentWindow }));
    expect(location.hash).toBe('#q/capacitor-step');
  });

  it('starts labs in the guided watch mode, keeps the bench one switch away and shares the voice switch with articles', async () => {
    localStorage.removeItem('phyverse-film-voice');
    await start();
    navigate('#lab/emf-step');
    const frame = document.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toMatch(/emf-step\.html\?cv-mode=watch&cv-narration=1$/);
    expect(frame.getAttribute('allow')).toContain('autoplay');
    const [watch, bench] = document.querySelectorAll<HTMLButtonElement>('.mode-switch button');
    expect(watch.getAttribute('aria-pressed')).toBe('true');
    const post = vi.spyOn(frame.contentWindow!, 'postMessage');
    bench.click();
    expect(post).toHaveBeenCalledWith({ type: 'phyverse:set-mode', mode: 'lab' }, '*');
    expect(bench.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:mode', mode: 'watch' }, source: window }));
    expect(bench.getAttribute('aria-pressed')).toBe('true');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:mode', mode: 'watch' }, source: frame.contentWindow }));
    expect(watch.getAttribute('aria-pressed')).toBe('true');

    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:narration', on: false }, source: frame.contentWindow }));
    expect(localStorage.getItem('phyverse-film-voice')).toBe('off');
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:narration', on: true }, source: frame.contentWindow }));
    document.getElementById('reload-lesson')?.click();
    const reloaded = document.querySelector('iframe')!;
    expect(reloaded.getAttribute('src')).toMatch(/\?cv-mode=watch&cv-narration=1$/);
    window.dispatchEvent(new MessageEvent('message', { data: { type: 'phyverse:go-check' }, source: reloaded.contentWindow }));
    expect(location.hash).toBe('#q/emf-step');
  });

  it('keeps the open lab when another tab changes the record', async () => {
    await start();
    navigate('#lab/emf-step');
    const frame = document.querySelector('iframe');
    localStorage.clear();
    window.dispatchEvent(new StorageEvent('storage'));
    expect(document.querySelector('iframe')).toBe(frame);
  });

  it('surfaces storage failure and never overwrites the broken record', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem(PROGRESS_KEY, '{bad');
    await start();
    expect(document.getElementById('storage-notice')?.hidden).toBe(false);
    expect(error).toHaveBeenCalled();
    navigate('#q/emf-step');
    expect(localStorage.getItem(PROGRESS_KEY)).toBe('{bad');
  });
});
