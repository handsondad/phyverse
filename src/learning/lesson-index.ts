import summaries from '../data/lesson-index.json';
import { lessonPlan, units, type LessonPlan, type Unit } from './curriculum';

export { units, type Unit };

/**
 * 首页、主题页和路由只要这点信息：不用把一百多篇问答、互动图和动画都背上首屏。
 * 由完整目录算出（`src/learning/lesson-summary.ts`），改了文章后跑 `npm run lessons:index`，测试会查是否过期。
 */
export interface LessonSummary {
  slug: string;
  /** 文章标题（小念的问题） */
  articleTitle: string;
  trigger: string;
  /** 爸爸第一句话，首页气泡里当预告 */
  dadHint: string;
  turns: number;
  badge: 'film' | 'figure' | '';
  story: boolean;
  /** 有 3D 课件，能进「🔭 3D 实验台」 */
  lab: boolean;
}

export interface LessonCard extends LessonPlan, Omit<LessonSummary, 'slug'> {}

const bySlug = new Map((summaries as LessonSummary[]).map(item => [item.slug, item]));

export const lessonCards: LessonCard[] = lessonPlan.flatMap(plan => {
  const summary = bySlug.get(plan.slug);
  return summary ? [{ ...summary, ...plan }] : [];
});

export const labCards: LessonCard[] = lessonCards.filter(card => card.lab);

export function findCard(slug: string): LessonCard | undefined {
  return lessonCards.find(card => card.slug === slug);
}

export function findLabCard(slug: string): LessonCard | undefined {
  return labCards.find(card => card.slug === slug);
}

export function unitCards(unitId: string): LessonCard[] {
  return lessonCards.filter(card => card.unit === unitId);
}
