import rawCourseDialogues from '../data/course-dialogues.json';
import type { LessonPlan } from './curriculum';

/** 3D 课件里每一段的原文，由 scripts/extract-lab-steps.mjs 从课件里读出来 */
export interface RawCourseStep {
  tag: string;
  q: string;
  eq: string;
  expect: string;
  concl: string;
  wrong: string;
}

export interface DialogueTurn {
  tag: string;
  ask: string;
  /** One-line headline shown before the answer. */
  lead?: string;
  answer: string;
  eq?: string;
  phenomenon?: string;
  wrong?: string;
  steps?: { icon: string; label: string }[];
  stepIndex?: number;
}

const courseDialogues = rawCourseDialogues as Record<string, RawCourseStep[]>;

/** Courseware copy cites the textbook for teachers (「（教材原话）」「教材 p.72：」); readers of an article don't need it. */
export function readable(text: string): string {
  return text
    .replace(/（[^（）]*教材[^（）]*）/g, '')
    .replace(/（p\.\s*\d+）/g, '')
    .replace(/教材(?:脚注)?(?:原话|\s*p\.\s*\d+(?:\s*[表图][\d.-]*)?(?:\s*\+\s*p\.\s*\d+)?)\s*[：:]\s*/g, '')
    .replace(/^教材(只)?给了/, '实验台上$1摆了')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// The opening hook and the closing takeaway are rendered by the article itself, so dialogues only hold the inquiry in between.
function buildFromCourse(lesson: LessonPlan, steps: RawCourseStep[]): DialogueTurn[] {
  return steps.map((step, index) => ({
    tag: step.tag,
    ask: step.q === lesson.question ? '先别急着找答案——这张实验台上都摆了些什么？' : readable(step.q),
    answer: readable(step.concl),
    eq: step.eq || undefined,
    phenomenon: readable(step.expect) || undefined,
    wrong: readable(step.wrong) || undefined,
    stepIndex: index,
  }));
}

export function getLessonDialogue(lesson: LessonPlan): DialogueTurn[] {
  const courseSteps = courseDialogues[lesson.slug];
  if (courseSteps?.length) return buildFromCourse(lesson, courseSteps);
  return [{ tag: '追问', ask: lesson.question ?? lesson.title, answer: lesson.takeaway }];
}
