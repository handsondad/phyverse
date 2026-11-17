import catalog from '../data/lessons.json';
import { autoArticle, storyArticle, type Article } from './article';
import { lessonAsset } from './assets';
import { lessonPlan, units, type LessonPlan, type Unit } from './curriculum';
import { getLessonDialogue, type DialogueTurn } from './dialogue';
import { findStory, type Story } from './stories';

export { lessonAsset, units, type Article, type DialogueTurn, type Story, type Unit };
export interface Lesson extends LessonPlan {
  /** native：生活里的问题，配互动图和讲解动画；simulation：有 3D 课件的实验课 */
  kind: 'native' | 'simulation';
  question: string;
  textbook: string[];
  steps: string[];
  dialogue: DialogueTurn[];
  /** 写成「小念 × 爸爸」问答、配了讲解动画的课 */
  story?: Story;
  /** 文章页真正渲染的内容：有 `story` 用它，没有就由 `dialogue` 自动装配 */
  article: Article;
  file?: string;
  cover?: string;
}

function storyDialogue(story: Story): DialogueTurn[] {
  return story.dialogue.map((turn, i) => ({
    tag: story.film?.scenes.find(scene => scene.turn === i)?.title ?? `第 ${i + 1} 问`,
    ask: turn.nian,
    answer: turn.dad,
    eq: turn.eq,
    stepIndex: turn.show?.kind === 'lab' ? turn.show.step : undefined,
  }));
}

export const lessons: Lesson[] = lessonPlan.map(plan => {
  const source = catalog.find(course => course.slug === plan.slug);
  const story = findStory(plan.slug);
  const question = plan.question ?? source?.question ?? findUnit(plan.unit).question;
  const dialogue = story ? storyDialogue(story) : getLessonDialogue({ ...plan, question });
  return {
    ...plan,
    kind: source ? 'simulation' : 'native',
    question,
    textbook: plan.textbook ?? source?.textbook ?? ['生活中的物理 · 现象观察与原理解释'],
    steps: source?.steps ?? [],
    dialogue,
    story,
    article: story
      ? storyArticle(story)
      : autoArticle({
        hook: plan.hook, question, takeaway: plan.takeaway, objectives: plan.objectives,
        cover: source?.cover ? lessonAsset(source.cover) : undefined,
      }, dialogue),
    file: source?.file,
    cover: source?.cover,
  };
});

export function findUnit(id: string): Unit {
  const unit = units.find(item => item.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  return unit;
}

export function findLesson(slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function unitLessons(unitId: string): Lesson[] {
  return lessons.filter(lesson => lesson.unit === unitId);
}

/** 「🔭 3D 实验台」里只放真正有 3D 课件的课 */
export const labs: Lesson[] = lessons.filter(lesson => lesson.kind === 'simulation');

export function findLab(slug: string): Lesson | undefined {
  return labs.find(lesson => lesson.slug === slug);
}

export function unitLabs(unitId: string): Lesson[] {
  return labs.filter(lesson => lesson.unit === unitId);
}

/** 「小念还想问」：先接着往后问同一主题里的下一题，不够再从相邻主题补。 */
export function relatedLessons(lesson: Lesson, limit = 3): Lesson[] {
  const siblings = unitLessons(lesson.unit);
  const at = siblings.indexOf(lesson);
  const sameUnit = [...siblings.slice(at + 1), ...siblings.slice(0, at)];
  const index = lessons.indexOf(lesson);
  const nearby = [...lessons.slice(index + 1), ...lessons.slice(0, index)].filter(item => item.unit !== lesson.unit);
  return [...sameUnit, ...nearby].slice(0, limit);
}
