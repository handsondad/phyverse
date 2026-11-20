# 资料来源与许可

网站不商用，但仍然只用许可允许的东西，并且写清出处。文章的 `sources`（`StorySource[]`）列在「给大人」里，检查器要求至少 2 条。

## 红线（检查器能拦的会拦，拦不到的靠自觉）

- **OpenStax 不读不用**：它的新许可明确禁止拿内容训练或喂给 AI。网页、PDF、习题都不打开，`sources` 里出现 openstax 会被拦。
- **不抄文字**：中科院物理所问答、《1分钟物理》、科普文章、教材，都只拿来找选题、核对说法；问答全部用自己的话写。比方也自己想。
- **不搬没有开放许可的图、视频、动画、课件**：只当灵感，要画就按真实数据自己画（互动图、动画都是自己画的 SVG）。
- **3D 课件**（`public/lessons/`）是铜匠十点睡觉的 CC BY-NC 4.0 作品：原文件不许改，适配只在 `public/theme/lesson.css` 和 `lesson-adapter.js` 里做；`LICENSE`、`THIRD_PARTY_NOTICES.md` 跟着课件走。
- **百科、知乎、公众号、短视频、AI 生成的文字不当来源**：可以顺着它们找到原始出处，引的是原始出处。

## 来源分级

| 级别 | 是什么 | 例子 |
|---|---|---|
| 1 | 教材、课标、国家和国际科学机构 | 人教版初中 / 高中物理教材、义务教育与普通高中物理课程标准、中国气象局、中国地震局、中国载人航天、国家能源局、NASA、NOAA、ESA、NIST |
| 2 | 大学、科学馆、学会的科普 | 中科院物理所、科普中国、美国物理学会（APS）、HyperPhysics（佐治亚州立大学）、NASA Space Place |
| 3 | 同行评议论文 | The Physics Teacher、American Journal of Physics、Physics Education、《物理教师》；误区研究（FCI、MOSART） |

- 每篇至少一条 1 级（通常是教材那一章）加一条 1–3 级。
- 网上的数字至少对上两处来源；对不上就写「大约」，或者不写数字。
- 教材和课外写法不一样（比如单位、近似值）时，在 `tip` 里说一句。

`sources` 每条写 `title`（资料名，教材写到章：「八年级下册 第八章 运动和力」）、`by`（人民教育出版社、NASA……）、能点开的 `url`（https）。

## 别人的照片

真照片能让孩子相信「这真的发生过」：阿波罗 15 号在月球上放手的锤子和羽毛、极光、日食、天宫课堂。

- **哪里找**：NASA 图片库（images.nasa.gov）、Wikimedia Commons。只用公有领域、CC0、CC BY、CC BY-SA 的；CC BY-SA 的照片原样用、不改图。
- **NASA 的注意事项**：署名写「NASA」（或页面上写的 NASA/JPL-Caltech 等）；不用 NASA 标志和徽章；不暗示 NASA 认可本站；NASA 网站上也有第三方版权的图，先看图片页的说明。
- **怎么放**：下载到 `public/images/photos/<slug>-<名字>.webp`（宽 ≤1200px，尽量 ≤200KB），在 `public/images/photos/CREDITS.md` 记一行（文件、原图页、作者、许可）。配图写：

```ts
figure: {
  kind: 'image',
  src: '/images/photos/feather-hammer-apollo15.webp',
  alt: '…',
  caption: '…',
  credit: 'NASA · 公有领域',
  href: 'https://images.nasa.gov/details/…',
},
```

`/images/photos/` 下的图没写 `credit` 和 https 的 `href`，检查器会拦。

## PhET 互动实验

PhET（科罗拉多大学博尔德分校）的 HTML5 实验从 2026 年 3 月起是 CC BY-NC 4.0，我们不商用，可以嵌入，署名写「PhET Interactive Simulations, University of Colorado Boulder」并链到 https://phet.colorado.edu 。

- **先用自己的互动图**：我们的 sim 和文章同一个画风、只演爸爸这一句。只有自己做不出同等效果（比如能自由搭电路、能拖着摆放很多物体）时才嵌 PhET。
- 嵌之前到 phet.colorado.edu 确认：是 HTML5 版（不是 Java / Flash）、有中文、许可页仍写 CC BY-NC。
- 现在 `figures.ts` 里还没有 `phet` 这种图；第一次要用时再加：点了才加载的 iframe（`https://phet.colorado.edu/sims/html/<sim>/latest/<sim>_all.html?locale=zh_CN`），每篇最多一个，图下自动写署名，同时在 `rules.ts` 和本文件补规矩。

## 署名汇总

README 的「参考与致谢」列：3D 课件（铜匠十点睡觉，CC BY-NC 4.0）、用到的 PhET 实验、照片（指向 `CREDITS.md`）、小念和爸爸的模型（CC0）、误区研究（FCI、MOSART）。
