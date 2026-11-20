import { lessons } from './catalog';
import { firstSentence } from './components';
import type { LessonSummary } from './lesson-index';

/** 从完整目录算出轻量索引；只给 `npm run lessons:index` 和测试用，不进网站的包 */
export function buildLessonIndex(): LessonSummary[] {
  return lessons.map(({ slug, kind, story, article }) => ({
    slug,
    articleTitle: article.title,
    trigger: article.trigger,
    dadHint: firstSentence(article.turns[0].dad),
    turns: article.turns.length,
    badge: article.film ? 'film' : article.turns.some(turn => turn.figure) ? 'figure' : '',
    story: Boolean(story),
    lab: kind === 'simulation',
  }));
}

export function renderLessonIndex(): string {
  return `${JSON.stringify(buildLessonIndex(), null, 2)}\n`;
}
