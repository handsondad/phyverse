# AGENTS.md — PhyVerse 物理奇遇记 Agent 协作与内容扩展指南

本文档面向参与 **PhyVerse（物理奇遇记）** 的所有编码 Agent。修改代码、调整样式或新增物理问题前，请先读完本文件和 skill `skills/phyverse-explainer/`（镜像于 `.agents/skills/phyverse-explainer/` 与 `.cursor/skills/phyverse-explainer/`）。

---

## 1. 产品定位与核心设计哲学（必读）

1. **是「生活物理问答馆」，不是刷题平台**
   - 目标是**从孩子真遇到过的事出发，由浅入深讲懂一个物理道理，并改掉一个常见的错误想法**。读者是小学高年级到初中，高中内容标「综合」。
   - **禁止**强制解锁、倒计时、完成度百分比、测验和考试话术。唯一的记录是问题卡上的「⭐ 看过」（本地 `localStorage`，键 `phyverse.learning.v1`）。
2. **「奇遇记」系列的一员**：和「身体奇遇记」（bodyverse）、「化学奇遇记」（chemverse）同一对小念和爸爸、同一套暖色手写风。三层结构：首页 → 主题 → 问题文章，外加「🔭 3D 实验台」。不要加顶栏、侧栏、地图、测验或进度条。
   - **首页 `#home`**：3D 小星球上的小念和爸爸（WebGL 不可用时退回 SVG 头像），11 张主题卡，最后一张是「🔭 3D 实验台」。
   - **主题 `#topic/<unit>`**：十一个 `units`——`motion` 运动与力 → `pressure` 压强与浮力 → `energy` 能量与机械 → `heat` 热与物态 → `sound` 声音与振动 → `light` 光与颜色 → `circuit` 电与电路 → `magnet` 磁与电磁 → `cosmos` 地球与宇宙 → `micro` 微观与现代 → `physicists` 物理学家的故事（讲人和他们真做过的实验，把流传的段子和史料对一对）。页首小念（`kidHook`）和爸爸（`dadLens`）各说一句，问题按「入门 / 进阶 / 综合」分组。
   - **问题 `#q/<slug>`**：每题都是「小念 × 爸爸」图文聊天文章。**左问答、右动画、有声音**：爸爸的气泡里放能拖滑块的互动图（`sim`），右栏是讲解动画（`film`），一轮配一到三场戏，小念和爸爸把每句话读出来。结尾「小念还想问」和「👨‍👩‍👧 给大人」（安全须知、对应课本、**参考来源**）。
   - **🔭 3D 实验台 `#labs` / `#lab/<slug>`**：只放 10 个真正的 3D 课件，按主题分组；可在「看懂原理 / 自由实验台」间切换，页首「📖 先听爸爸讲」回到文章。文章里不嵌实验台，实验课的文章只在页首放一个「去 3D 实验台」链接。
3. **主次分明**：网站的主体是十一个主题里**调研过的生活问题**；3D 实验台是一小部分补充。新内容优先写生活问题。
4. **每题从生活现场（`hook` / `trigger`）出发**：先讲小念看到的那一幕（公交急刹、冰壶滑远、微波炉热饭），不要一上来堆定义。
5. **做成系列**：角色、头像和 3D 小星球在与领域无关的 `src/series/`，和 bodyverse、chemverse 保持一模一样；物理道具只在 `src/learning/home-planet.ts` 里摆。

---

## 2. 目录结构与关键文件

- `src/series/`：系列共用。`characters.ts` 名字、配色、身高；`avatar.ts` SVG 头像；`duo-stage.ts` 首页 3D 小星球（three.js），模型 `public/models/character.glb`（CC0，见同目录 `CREDITS.md`）。
- `src/learning/curriculum.ts`：**课程与目录的唯一数据源**：十一个 `units`（`emoji`、`kidHook`、`dadLens`、`color`）和全部问题 `lessonPlan`（`slug`、`unit`、`hook`、`question`、`level`、`objectives`、`takeaway`、`textbook`、`prerequisites`；3D 课件另有 `file` / `cover`）。
- `src/learning/stories/`：**「小念 × 爸爸」问答文章**，每篇一个文件，导出 `Story`（`title` 必须和 curriculum 的 `question` 一字不差、`trigger`、`dialogue`、`tip`、`sources`、可选 `film`），在 `stories/index.ts` 里 import 并加进 `stories` 数组才生效（该文件是 CRLF 换行）。规矩在 `stories/rules.ts`，类型和动画元素在 `stories/types.ts`。
- `src/learning/sims.ts` & `src/learning/simlib/`：**爸爸气泡里的互动图**（560×320 纯 SVG，滑块切换参数，可带动画）。每个主题一个文件（`motion.ts`、`pressure.ts`……`micro.ts`、`sky.ts`、`physicists.ts`），公用画笔在 `kit.ts`；新图在对应文件导出 `SimDef`，再登记到 `sims.ts` 的 `SIMS`。`tests/sims.test.ts` 会把每张图拨到两头和中间检查（不出 NaN、读数有内容）。
- `src/learning/figures.ts`：其余配图：`sim`、`bars` 柱状对比、`scale` 色阶横尺、`image` 照片（`public/images/photos/`，必须带 `credit` 和 https 的 `href`）。
- `src/learning/film/`：**讲解动画引擎**（1200×900 画布；`engine.ts` 时间线、`stage.ts` 画面、`player.ts` 播放器、`narration.ts` 按配音长度拉长时间线）。物理专用元素有 `wave` 波、`ray` 光线、`swing` 摆、`toss` 抛体，通用的有 `text`、`label`、`arrow`、`flow`、`pulse`、`sprite`、`shape`、`particles`、`meter`、`count`、`myth` 等。
- **语音讲解**：`src/learning/voice.ts`（小念 `zh-CN-YunxiaNeural`，爸爸 `zh-CN-YunxiNeural` −5%，与系列一致；`speakable()` 把 ℃、单位、物理量符号换成念法）、`scripts/voice.ts`（`npm run voice`，edge-tts + ffmpeg）、音频在 `public/voice/`、清单 `src/data/voice-manifest.json`。实验台「看懂原理」的讲稿是我们自己写的 `public/theme/lab-script.json`（每个课件按步骤号一条：小念的问题 `q`、算式 `eq`（空串就不显示）、爸爸的「你看到」`seen` 和「所以」`concl`；最后一条考核段只写 `hold: true`；`tag` 要和 `src/data/course-dialogues.json` 对上，对不上的步骤退回清洗过的课件原文），改完跑 `npm run voice -- lab`；配音清单是 `src/data/lab-voice-manifest.json`。声音开关键 `phyverse-film-voice`，默认开。
- `src/learning/article.ts` / `catalog.ts` / `dialogue.ts`：把问题统一成文章；有 `story` 用 `storyArticle`，没有的用 `autoArticle`（只剩兜底作用，现在每题都有手写文章）。
- `src/learning/pages/`：`home.ts`、`topic.ts`、`lesson.ts`（文章页）、`lab.ts`（实验台，iframe `sandbox="allow-scripts"`，消息前缀 `phyverse:`）。
- `public/theme/tokens.css`：**全站唯一颜色与设计变量源**（`--cv-*`，物理强调色蓝 `#3553a6`，测试会查）。`public/theme/lesson.css` & `lesson-adapter.js`：注入 3D 课件的主题和「看懂原理 / 自由实验台」控制器（大读数单位在 `MAIN_UNITS`）。
- `public/lessons/`：第三方 3D 课件（`courses/`、`covers/`、`LICENSE`、`THIRD_PARTY_NOTICES.md`），**只读**。
- `scripts/`：工具，都用 vite-node 跑。`story.ts`（`story:todo` / `story:new` / `story:check` / `story:frames` / `story:sims`）、`voice.ts` 与 `voice-clips.ts`、`import-lessons.mjs`（`lessons:import`）、`extract-lab-steps.mjs`（`lessons:steps`）。预览输出在 `.story-preview/`（已忽略）。临时脚本也放 `scripts/` 或 `.story-preview/` 下，用完删掉。
- `skills/phyverse-explainer/`（镜像于 `.agents/skills/phyverse-explainer/` 与 `.cursor/skills/phyverse-explainer/`）：写文章的完整说明：`SKILL.md` 总流程、`question-bank.md` 题库、`sources.md` 资料与许可、`dialogue.md` 问答、`figures.md` 互动图清单与新图写法、`film.md` 动画、`design.md` 风格与实验台。

---

## 3. 如何新增一个物理问题

完整清单见 `skills/phyverse-explainer/SKILL.md`（镜像于 `.agents/skills/phyverse-explainer/SKILL.md` 与 `.cursor/skills/phyverse-explainer/SKILL.md`），简要流程：

1. **选题**：从 `question-bank.md` 挑一题（或先把新题按同样的列补进题库：生活现场、要破的误区、学段、互动图、查证去处）。一个题只回答一个「为什么」。`npm run story:todo` 看已经写了哪些。
2. **查资料**（`sources.md`）：至少一条 1 级来源（通常是人教版教材那一章）加一条 1–3 级来源；每个数字对上两处，对不上就写「大约」或不写。
3. **进 curriculum**：在 `lessonPlan` 对应主题里加一条，放在同主题生活问题的最后、3D 实验课前面；`prerequisites` 只能指向排在前面的题（测试会查），`hook` 多于 15 字。
4. **生成草稿**：`npm run story:new -- <slug>`（会写 `stories/<slug>.ts` 并登记；之后把 `stories/index.ts` 统一成 CRLF）。
5. **写问答、互动图、动画**：细则见 `dialogue.md`、`figures.md`、`film.md`。没有合适的 sim 就新写一个并在 `figures.md` 登记一行。
6. **检查、看图、配音、验证**：见第 5 节。

### 写作规矩（`stories/rules.ts`，`tests/stories.test.ts` 和 `story:check` 共用）
- 对话 5–8 轮。除最后一轮外，小念每句都带「？」；从第 2 轮起要**接住爸爸上一句里的一个两字词**（「的了是能太在」这类虚字组成的词不算）；最后一轮以「我懂了 / 我明白了」开头。
- 爸爸每句 20–180 字，第一句直接回答，再打比方，误区点名说破；`tip` ≥20 字。
- `sources` 至少 2 条、都是 https；互动图每篇 1–2 张，图注 ≤70 字。
- 动画：至少 4 场、第一场配第 1 轮、每场 4–14 秒、全片 30–150 秒、同屏 ≤8 个元素；文字长度 场次标题 ≤12、`label` ≤12、`text` ≤14、`arrow` ≤10、`shape` ≤7、`meter`/`count` 标签 ≤8、`myth` ≤18；左上角 y < 140 留给场次标题，有 `myth` 卡的场 y > 720 留空；画面上出现的数字，爸爸这一轮要念出来。

### 资料与许可红线（细则见 `sources.md`）
- **OpenStax 不读不用**（其许可禁止喂给 AI；检查器会拦）。
- 中科院物理所、《1分钟物理》、科普文章、教材只拿来找选题和核对，**问答全用自己的话写，图全自己画**。
- 百科、知乎、公众号、短视频、AI 生成的文字不当来源；LibreTexts、CK-12 也不用。
- 照片只用 NASA / Wikimedia Commons 上公有领域、CC0、CC BY、CC BY-SA 的，原样使用、不用 NASA 标志、不暗示认可，在 `public/images/photos/CREDITS.md` 记一行。
- PhET（CC BY-NC）只在自己的互动图做不到时才嵌，并署名。
- **3D 课件**（`public/lessons/`）是铜匠十点睡觉的 CC BY-NC 4.0 作品：**原文件严禁修改**，适配只在 `public/theme/lesson.css` 和 `lesson-adapter.js` 里做；`LICENSE`、`THIRD_PARTY_NOTICES.md` 一直跟着课件走；署名和改动说明写在 `README.md` 的「参考与致谢」。

---

## 4. 视觉与前端工程规范

1. 颜色只用 `public/theme/tokens.css` 的 `--cv-*` 变量；新样式写进 `src/learning/learning.css`。互动图小字用 `.sim-text`（雅黑），橙色 `#e8590c` 只用来点出「看这里」。
2. 动态 HTML 一律用 `src/learning/html.ts` 的 `html` 模板和 `setHtml()`（默认转义），`raw()` 只给自己生成的 SVG；外链加 `target="_blank" rel="noopener noreferrer"`。
3. 会自己动的东西（动画、互动图、小星球）离开视野就停，尊重「减少动态效果」，拖动要有键盘替代。
4. TypeScript 严格模式（含 `noUnusedLocals`），2 空格缩进；路由是 hash 路由，资源用相对地址（GitHub Pages 子路径部署）。

---

## 5. 验证与测试命令

```bash
# 0. 只改了文章时：先查这几篇，看动画联系表，再给改过的句子配音
npm run story:check -- <slug>
npm run story:frames -- <slug>      # 输出 .story-preview/<slug>-frames.png
npm run story:sims -- <sim>         # 新写或改了互动图时
npm run voice -- <slug>             # 要联网；需要 edge-tts 和 PATH 里的 ffmpeg/ffprobe

# 1. 代码规范
npm run lint

# 2. 类型检查
npm exec -- tsc --noEmit

# 3. 测试（Windows 上单 worker 更稳）
npm run test -- --no-file-parallelism --maxWorkers=1

# 4. 生产构建
npm run build
```

最后在浏览器里打开 `#q/<slug>`：桌面开着声音听一遍、拖一遍滑块，再用 390px 手机宽度看一遍。改了对话的字一定要重跑 `voice`，`tests/voice.test.ts` 会查每句配音是不是读的现在的文字。
