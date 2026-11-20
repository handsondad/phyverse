# 页面风格与系列规矩

物理奇遇记是「奇遇记」系列的一员，和「身体奇遇记」（bodyverse）、「化学奇遇记」（chemverse）同一对小念和爸爸、同一套暖色手写风。

## 结构（不要加层）

首页 `#home` → 主题 `#topic/<unit>` → 问题文章 `#q/<slug>`，外加首页第 11 张卡「🔭 3D 实验台」`#labs` → 单个实验 `#lab/<slug>`。没有顶栏、侧栏、地图、测验、进度条。唯一的记录是本地的「⭐ 看过」（`phyverse.learning.v1`）。

- **主题**就是 `curriculum.ts` 的 `units`，十一个：运动与力、压强与浮力、能量与机械、热与物态、声音与振动、光与颜色、电与电路、磁与电磁、地球与宇宙、微观与现代、物理学家的故事。每个有 `emoji`、`title`、`kidHook`（小念说）、`dadLens`（爸爸说）、`color`。主题页按 入门 / 进阶 / 综合 分组。
- **文章**：左聊天、右动画；文章里没有实验台入口（实验课的文章页首有一个「🔭 去 3D 实验台」）。
- **实验台**：只放真正的 3D 课件，在 `#labs` 按主题分组；实验页页首「📖 先听爸爸讲」回到文章。
- **主次**：网站的主体是十一个主题里调研过的生活问题；3D 实验台是一小部分补充。

## 视觉

- 颜色只用 `public/theme/tokens.css` 的 `--cv-*` 变量：奶油底、白卡片、浅橙描边、暖棕文字；物理的强调色是蓝 `--cv-accent: #3553a6`（测试会校验，别改）。
- 字体：手写体，正文继承即可；互动图里的小字用雅黑（`.sim-text`，太小的手写字看不清）。
- 大圆角（卡片 24px、按钮全圆）、2–3px 浅色描边、轻阴影、轻轻的弹跳动效；尊重「减少动态效果」。
- 新样式写进 `src/learning/learning.css`；`styles.css` 给所有元素设了雅黑和 `margin: 0`，要覆盖时注意优先级。
- 动态 HTML 一律用 `src/learning/html.ts` 的 `html` 模板和 `setHtml()`（默认转义），`raw()` 只给自己生成的 SVG。外链加 `target="_blank" rel="noopener noreferrer"`。
- 互动图是白底圆角卡片（`.fig-sim`），橙色 `#e8590c` 只用来点出「看这里」，蓝色是物理的主色。
- 页面里任何会自己动的东西（动画、互动图、小星球）离开视野就停，「减少动态效果」时不自己动。

## 小念和爸爸的形象

- 名字、配色、身高在 `src/series/characters.ts`，SVG 头像在 `src/series/avatar.ts`，3D 小星球在 `src/series/duo-stage.ts`，模型是 `public/models/character.glb`（CC0）。和 bodyverse、chemverse 保持一模一样，要改长相几个仓库一起改。
- 首页星球上的物理道具（牛顿摆、马蹄形磁铁、台灯、三棱镜、小球）在 `src/learning/home-planet.ts`，道具放在 |x| ≤ 1.6 的地方。

## 3D 实验台（第三方课件）

`public/lessons/` 下的 3D 课件是铜匠十点睡觉的 CC BY-NC 4.0 作品，原文件不许改；样式和交互适配只在 `public/theme/lesson.css` 和 `public/theme/lesson-adapter.js` 里做，页面在 `src/learning/pages/lab.ts`。iframe 用 `sandbox="allow-scripts"`，消息前缀 `phyverse:`。

- 实验台要和文章看起来是一家：「看懂原理」说明卡也是小念问、爸爸答的两个气泡，**不出现给老师看的教材引注**（「教材图 12.3-1」「p.89」「量程 0〜3 V」这类）；讲稿要换成我们自己写的、孩子听得懂的话。讲稿在 `public/theme/lab-script.json`，读数都带单位，比值写成「1比4」，改完跑 `npm run voice -- lab`。
- 声音：说明卡和文章同一对声音、同一个开关（`phyverse-film-voice`，默认开）；配音是 `npm run voice -- lab` 预先生成的。
- 自由实验台要简单：步骤条、左边「🔭 动手试试」、右边「🎛️ 调一调」（一个带单位的大读数、几个旋钮）、底下上一步 / 下一步；其余的不放。大读数的单位在 `lesson-adapter.js` 的 `MAIN_UNITS`。
