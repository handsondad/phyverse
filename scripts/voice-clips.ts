import { createHash } from 'node:crypto';
import labScript from '../public/theme/lab-script.json';
import type { Speaker } from '../src/learning/film/narration';
import { stories } from '../src/learning/stories/index';
import { clipKey, labClipKey, labSpeakable, labSpeaker, speakable, voices, type LabPart, type LabScript } from '../src/learning/voice';

export type WantedClip = { readonly slug: string; readonly turn: number; readonly who: Speaker; readonly text: string };

/** 声音、语速或念的字一变，指纹就变，这句就要重新配 */
export function clipHash(who: Speaker, text: string): string {
  const { voice, rate } = voices[who];
  return createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex').slice(0, 12);
}

/** 有讲解动画的文章，每一轮小念和爸爸各一句 */
export function wantedClips(): Map<string, WantedClip> {
  const wanted = new Map<string, WantedClip>();
  for (const story of stories) {
    if (!story.film) continue;
    story.dialogue.forEach((turn, index) => {
      for (const who of ['nian', 'dad'] as const) {
        wanted.set(clipKey(story.slug, index, who), { slug: story.slug, turn: index, who, text: speakable(turn[who]) });
      }
    });
  }
  return wanted;
}

/** 卡片上爸爸念「👀 你看到」「💡 所以」那两段时，先把这两个字说出来 */
const LAB_LEAD: Record<LabPart, string> = { q: '', seen: '你看，', concl: '所以，' };

/** 3D 实验台「看懂原理」：每一段小念问一句，爸爸讲看到了什么、所以怎样（讲稿见 public/theme/lab-script.json） */
export function wantedLabClips(): Map<string, WantedClip> {
  const wanted = new Map<string, WantedClip>();
  for (const [slug, segments] of Object.entries(labScript as unknown as LabScript)) {
    segments.forEach((segment, index) => {
      if (segment.hold) return;
      const parts: [LabPart, string][] = [['q', segment.q], ['seen', segment.seen], ['concl', segment.concl]];
      for (const [part, raw] of parts) {
        const spoken = labSpeakable(raw ?? '');
        if (!spoken) continue;
        const who = labSpeaker[part];
        wanted.set(labClipKey(slug, index, part, raw), { slug, turn: index, who, text: LAB_LEAD[part] + spoken });
      }
    });
  }
  return wanted;
}
