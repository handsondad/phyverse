import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { clipHash, wantedClips, wantedLabClips } from '../scripts/voice-clips';
import { lineAt, narrateFilm, narrationGaps, stretchScene } from '../src/learning/film/narration';
import { mountFilm } from '../src/learning/film/player';
import { stories } from '../src/learning/stories';
import type { Cue, Film, FilmScene } from '../src/learning/stories/types';
import { clipKey, fnv1a, labSpeakable, speakable, type FilmVoice, type VoiceManifest } from '../src/learning/voice';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, 'src/data/voice-manifest.json'), 'utf8')) as VoiceManifest;

const scene = (turn: number, duration: number, extra: Partial<FilmScene> = {}): FilmScene => ({
  turn,
  title: 't',
  duration,
  cues: [
    { kind: 'text', at: [600, 450], text: '字', from: 1, to: duration - 1 },
    { kind: 'count', at: [600, 450], label: '数', start: 0, end: 9, from: 2 },
  ],
  ...extra,
});

describe('小念和爸爸的配音', () => {
  it('has a clip for every line of every filmed article, reading the current text', () => {
    const problems: string[] = [];
    for (const [key, clip] of wantedClips()) {
      const saved = manifest.clips[key];
      if (!saved) problems.push(`${key} 没有配音`);
      else if (saved.hash !== clipHash(clip.who, clip.text)) problems.push(`${key} 文字改过了`);
      else if (!existsSync(join(root, 'public/voice', `${key}.mp3`))) problems.push(`${key} 缺音频文件`);
    }
    expect(problems.slice(0, 10), `共 ${problems.length} 句要重新配音：npm run voice`).toEqual([]);
  });

  const labManifest = JSON.parse(readFileSync(join(root, 'src/data/lab-voice-manifest.json'), 'utf8')) as VoiceManifest;

  it('gives every 3D lab segment a line for 小念 and for 爸爸, in the same two voices', () => {
    expect(labManifest.voices).toEqual(manifest.voices);
    const wanted = wantedLabClips();
    expect(wanted.size).toBeGreaterThan(200);
    for (const [key, clip] of wanted) expect(clip.who).toBe(key.includes('-q-') ? 'nian' : 'dad');
  });

  it.skipIf(!Object.keys(labManifest.clips).length)('voices every 3D lab segment, reading the current text', () => {
    const problems: string[] = [];
    for (const [key, clip] of wantedLabClips()) {
      const saved = labManifest.clips[key];
      if (!saved) problems.push(`${key} 没有配音`);
      else if (saved.hash !== clipHash(clip.who, clip.text)) problems.push(`${key} 文字改过了`);
      else if (!existsSync(join(root, 'public/voice', `${key}.mp3`))) problems.push(`${key} 缺音频文件`);
    }
    expect(problems.slice(0, 10), `共 ${problems.length} 段要重新配音：npm run voice -- lab`).toEqual([]);
  });

  it('reads the lab bench notation aloud: units, quantity symbols, comparisons and powers of ten', () => {
    expect(labSpeakable('U = 0.00 V、I = 0.294 μA')).toBe('U等于0.00伏、I等于0.294微安');
    expect(labSpeakable('E = U + Ir（教材式 1，p.89）')).toBe('E等于U加Ir');
    expect(labSpeakable('电源 8.0 V、R 3.3 kΩ、C 470 μF')).toBe('电源 8.0伏、R 3.3千欧、C 470微法');
    expect(labSpeakable('频率 5.5×10¹⁴ Hz，a = 0.81 m/s²')).toBe('频率 5.5乘10的14次方赫兹，a等于0.81米每二次方秒');
    expect(labSpeakable('① 合上开关 → ② 读数')).toBe('一、合上开关，变成二、读数');
    expect(labSpeakable('hν > W₀，Uc 格亮起 1.11 V')).toBe('h乘频率大于逸出功，遏止电压格亮起 1.11伏');
    expect(fnv1a('台面上有什么？')).toMatch(/^[0-9a-f]{8}$/);
  });

  it('reads physics numbers and units the way a parent would say them', () => {
    expect(speakable('雷声每秒走 340 m，光每秒 30 万千米')).toBe('雷声每秒走 340米，光每秒 30 万千米');
    expect(speakable('−10 ℃ 到 +5 ℃，角度 45°')).toBe('负10摄氏度到正5摄氏度，角度 45度');
    expect(speakable('7.9 km/s 绕地球转')).toBe('7.9千米每秒绕地球转');
    expect(speakable('10~20 N 的力')).toBe('10到20牛的力');
  });

  it('stretches every timed part of a scene, but leaves looping motion alone', () => {
    const cues: Cue[] = [
      { kind: 'atom', path: [[100, 100], [500, 500]], symbol: 'e⁻', color: '#ff0000', from: 1, travel: 3 },
      { kind: 'vessel', vessel: 'beaker', at: [600, 500], size: [300, 300], liquid: '#ddeeff', level: 0.2, rise: { to: 0.8, at: 2 }, tint: { color: '#0000ff', at: 1, over: 2 }, from: 0 },
      { kind: 'particles', box: [100, 100, 300, 300], count: 10, color: '#888888', motion: 'gas', amount: { at: 1, over: 2, from: 2, to: 10 }, from: 0 },
      { kind: 'flow', path: [[0, 0], [100, 0]], speed: 200, from: 0.5 },
    ];
    const stretched = stretchScene({ turn: 0, title: 't', duration: 10, cues, camera: [{ t: 4, at: [600, 450], zoom: 2 }] }, 2);
    expect(stretched.duration).toBe(20);
    expect(stretched.camera?.[0].t).toBe(8);
    const [atom, vessel, particles, flow] = stretched.cues;
    expect(atom).toMatchObject({ from: 2, travel: 6 });
    expect(vessel).toMatchObject({ rise: { at: 4, over: 4 }, tint: { at: 2, over: 4 } });
    expect(particles).toMatchObject({ amount: { at: 2, over: 4, from: 2, to: 10 } });
    expect(flow).toMatchObject({ from: 1, speed: 200 });
  });

  it('stretches each scene until its lines are read, and reads the unfilmed last turn after the last scene', () => {
    const film: Film = { scenes: [scene(0, 10, { camera: [{ t: 0, at: [600, 450], zoom: 1 }, { t: 5, at: [600, 450], zoom: 2 }] }), scene(1, 10)] };
    const lengths: Record<string, number> = { '0-nian': 4, '0-dad': 25.65, '1-nian': 1, '1-dad': 2, '2-nian': 3, '2-dad': 6 };
    const result = narrateFilm(film, 3, (turn, who) => lengths[`${turn}-${who}`]);
    expect(result).toBeDefined();
    const [first, second] = result!.film.scenes;
    expect(first.duration).toBeCloseTo(narrationGaps.lead + 4 + narrationGaps.between + 25.65 + narrationGaps.tail);
    const factor = first.duration / 10;
    expect(first.cues[0].from).toBeCloseTo(factor);
    expect((first.cues[1] as { over: number }).over).toBeCloseTo(2 * factor);
    expect(first.camera?.[1].t).toBeCloseTo(5 * factor);

    const tail = narrationGaps.lead + 1 + narrationGaps.between + 2 + narrationGaps.afterTurn + 3 + narrationGaps.between + 6 + narrationGaps.tail;
    expect(second.duration).toBeCloseTo(Math.max(10, tail));
    expect(result!.lines.map(line => `${line.turn}-${line.who}`)).toEqual(['0-nian', '0-dad', '1-nian', '1-dad', '2-nian', '2-dad']);
    expect(result!.lines[2].start).toBeCloseTo(first.duration + narrationGaps.lead);
    expect(lineAt(result!.lines, 0.5)).toEqual({ line: result!.lines[0], speaking: true });
    expect(lineAt(result!.lines, 0.1)).toBeUndefined();

    expect(narrateFilm(film, 3, (turn, who) => (turn === 2 && who === 'dad' ? undefined : 1)), '缺一句配音就退回无声版').toBeUndefined();
  });

  it('lets the player follow the voice: it reads the line under the playhead, reports who speaks, and can be muted', () => {
    localStorage.removeItem('phyverse-film-voice');
    const played: string[] = [];
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      played.push(this.src);
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    const film: Film = { scenes: [scene(0, 6), scene(1, 6)] };
    const voice: FilmVoice = { turnCount: 2, lengthOf: () => 3, src: (turn, who) => `/voice/demo/${turn}-${who}.mp3` };
    const lines = narrateFilm(film, 2, voice.lengthOf)!.lines;
    const turns: string[] = [];
    const host = document.createElement('div');
    document.body.append(host);
    const handle = mountFilm(host, film, { voice, onTurn: (turn, who) => turns.push(`${turn}-${who ?? ''}`) });

    const range = host.querySelector<HTMLInputElement>('.film-range')!;
    const voiced = Number(range.max);
    range.value = String(lines[3].start + 0.5);
    range.dispatchEvent(new Event('input'));
    host.querySelector<HTMLButtonElement>('.film-play')!.click();
    expect(played.at(-1)).toMatch(/\/voice\/demo\/1-dad\.mp3$/);
    expect(turns.at(-1)).toBe('1-dad');

    const mute = host.querySelector<HTMLButtonElement>('.film-voice')!;
    expect(mute.getAttribute('aria-pressed')).toBe('true');
    mute.click();
    expect(mute.textContent).toBe('🔇');
    expect(localStorage.getItem('phyverse-film-voice')).toBe('off');
    expect(Number(range.max)).toBeLessThan(voiced);
    expect(turns.at(-1)).toBe('1-');
    handle.destroy();
    host.remove();
  });

  it('narrates every film without shortening a scene or overlapping two lines', () => {
    for (const story of stories) {
      if (!story.film) continue;
      const result = narrateFilm(story.film, story.dialogue.length, (turn, who) => manifest.clips[clipKey(story.slug, turn, who)]?.seconds);
      expect(result, `${story.slug} 缺配音`).toBeDefined();
      result!.film.scenes.forEach((item, index) => expect(item.duration).toBeGreaterThanOrEqual(story.film!.scenes[index].duration));
      expect(result!.lines).toHaveLength(story.dialogue.length * 2);
      result!.lines.slice(1).forEach((line, index) => {
        const before = result!.lines[index];
        expect(before.start + before.seconds, `${story.slug} 第 ${before.turn + 1} 轮和后一句叠在一起了`).toBeLessThanOrEqual(line.start);
      });
    }
  });
});
