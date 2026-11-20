import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildLessonIndex, renderLessonIndex } from '../src/learning/lesson-summary';

// 首页和主题页用的轻量索引：改了文章标题、开场、轮数或配图后重跑一次
const out = fileURLToPath(new URL('../src/data/lesson-index.json', import.meta.url));
writeFileSync(out, renderLessonIndex(), 'utf8');
console.log(`已写入 ${buildLessonIndex().length} 个问题 → src/data/lesson-index.json`);
