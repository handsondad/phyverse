import type { Story } from './types';

const RED = '#e03131';
const VIOLET = '#7048e8';
const BLUE = '#3553a6';

export const einsteinLight: Story = {
  slug: 'einstein-light',
  title: '爱因斯坦的诺贝尔奖为什么不是颁给相对论？',
  trigger: '小念在纪录片里听到“爱因斯坦因为光电效应获得诺贝尔奖”，她愣住了：不是说爱因斯坦最有名的是相对论吗？',
  dialogue: [
    {
      nian: '爸爸，爱因斯坦最有名的不是相对论吗，诺贝尔奖为什么颁给了光电效应？',
      dad: '诺贝尔奖官网写得很清楚：1921 年的物理学奖，表彰他对理论物理的贡献，“特别是发现了光电效应的规律”。那时相对论还很新，不少科学家心里打着问号；而他对光电效应的解释，能用实验一项项去检验。诺贝尔奖更愿意奖给被实验牢牢证实的发现。',
    },
    {
      nian: '光电效应？光怎么会有“效应”，它做了什么？',
      dad: '光照到金属上，能把金属里的电子打出来，这就是光电效应。怪就怪在：紫外光一照，电子马上飞出来；红光开得再亮，一个电子也打不出来。按当时的想法，光是连绵不断的波，亮一点能量就多一点，怎么会打不出来呢？大家都想不通。',
    },
    {
      nian: '红光开得再亮也不行？爱因斯坦是怎么解释的？',
      dad: '1905 年，爱因斯坦提出：光是一份一份的，每一份叫一个光子。一个光子的能量只看光的颜色，红光的光子能量小，紫外光的光子能量大。电子一次只能吃下一个光子，光子能量不够，来再多也没用；光更亮，只是光子更多。',
      figure: { kind: 'sim', sim: 'photon', caption: '换不同颜色的光、调亮度：看看哪种光能把电子打出来，变亮又改变了什么。' },
    },
    {
      nian: '一份一份的光子……1905 年的时候，爱因斯坦在哪儿做研究？',
      dad: '说出来你可能不信：在瑞士专利局！他大学毕业后找不到教书的工作，就去专利局当技术员，审查别人的发明。白天上班，业余时间做研究，1905 年一年就发表了好几篇改变物理学的论文，光子是一篇，狭义相对论也是一篇。后来人们管这一年叫“奇迹年”。',
      figure: {
        kind: 'image',
        src: '/images/photos/einstein-patent-office.webp',
        alt: '约 1905 年的青年爱因斯坦坐在瑞士伯尔尼专利局的办公桌前，黑白照片',
        caption: '约 1905 年，在伯尔尼专利局工作的爱因斯坦。光子的想法就是这时提出的。',
        credit: 'Lucien Chavan · 公有领域',
        href: 'https://commons.wikimedia.org/wiki/File:Einstein_patentoffice.jpg',
      },
    },
    {
      nian: '奇迹年……听说爱因斯坦小时候数学不及格，是真的吗？',
      dad: '这是个流传很广的误会！爱因斯坦自己说过：“我数学从没不及格，十五岁前就掌握了微积分。”他十六岁报考苏黎世的大学时，是法语、植物这些科目没准备好，总分没过，数学和物理其实考得很好。补完中学课程后，他第二年就考上了。',
    },
    {
      nian: '我明白了！爱因斯坦提出光是一份一份的光子，颜色决定光子的能量，解释了红光再亮也打不出电子，这个想法能被实验证实，所以诺贝尔奖颁给了光电效应。',
      dad: '完全正确！光子的想法后来成了量子物理的起点，太阳能电池、数码相机的感光芯片，也都靠光子把电子“打”出来工作。',
    },
  ],
  tip: '“爱因斯坦数学不及格”是二十世纪三十年代报纸专栏传开的误会，他本人当面否认过，报考苏黎世联邦理工学院没考上是因为法语等科目准备不足。照片是他在伯尔尼专利局工作时期的肖像，文中的诺贝尔奖颁奖理由取自诺贝尔奖官网。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第四章 原子结构和波粒二象性 · 第2节 光电效应', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Albert Einstein – Facts（1921 年诺贝尔物理学奖：表彰其对理论物理的贡献，特别是发现光电效应定律）', by: '诺贝尔奖官网（NobelPrize.org）', url: 'https://www.nobelprize.org/prizes/physics/1921/einstein/facts/' },
    { title: 'Albert Einstein – Biographical（找不到教职，进入瑞士专利局任技术员，业余时间完成大量重要工作）', by: '诺贝尔奖官网（NobelPrize.org）', url: 'https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/' },
    { title: 'Making the Grade（“数学不及格”是误传：他十五岁前已掌握微积分）', by: '《时代》周刊（TIME）', url: 'https://content.time.com/time/specials/packages/article/0,28804,1936731_1936743_1936758,00.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '奖给了光电效应', duration: 11,
        cues: [
          { kind: 'count', at: [600, 280], label: '诺贝尔奖', start: 1900, end: 1921, unit: '年', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [380, 520], size: [300, 110], color: '#e7f5ff', text: '光电效应', from: 2 },
          { kind: 'shape', shape: 'rect', at: [820, 520], size: [300, 110], color: '#f1f3f5', text: '相对论', from: 2.5 },
          { kind: 'label', at: [380, 580], pos: [380, 700], text: '能用实验检验', from: 4 },
          { kind: 'label', at: [820, 580], pos: [820, 700], text: '当时还打着问号', from: 5 },
          { kind: 'text', at: [600, 820], text: '奖给证实了的发现', from: 7 },
        ],
      },
      {
        turn: 1, title: '红光打不出电子', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [700, 60], color: '#adb5bd', text: '金属', from: 0.2 },
          { kind: 'ray', path: [[300, 260], [520, 570]], color: VIOLET, draw: 1, from: 1 },
          { kind: 'flow', path: [[540, 570], [700, 300]], color: BLUE, count: 3, from: 2 },
          { kind: 'ray', path: [[960, 260], [760, 570]], color: RED, draw: 1, from: 4 },
          { kind: 'label', at: [760, 570], pos: [1000, 420], text: '再亮也打不出', from: 5.5 },
          { kind: 'text', at: [600, 820], text: '大家都想不通', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '一份一份的光', duration: 11,
        cues: [
          { kind: 'count', at: [600, 230], label: '那一年', start: 1900, end: 1905, unit: '年', from: 0.4 },
          { kind: 'flow', path: [[200, 420], [1000, 420]], color: RED, count: 4, size: 10, from: 1 },
          { kind: 'label', at: [600, 420], pos: [600, 330], text: '红光子：能量小', from: 1.6 },
          { kind: 'flow', path: [[200, 600], [1000, 600]], color: VIOLET, count: 4, size: 18, from: 3 },
          { kind: 'label', at: [600, 600], pos: [600, 700], text: '紫外光子：能量大', from: 3.6 },
          { kind: 'text', at: [600, 820], text: '一个电子只吃一个光子', from: 7 },
        ],
      },
      {
        turn: 3, title: '专利局的奇迹年', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🏢', path: [[360, 460]], size: 200, from: 0.3 },
          { kind: 'label', at: [360, 560], pos: [360, 690], text: '瑞士专利局技术员', from: 1.5 },
          { kind: 'count', at: [840, 300], label: '奇迹年', start: 1900, end: 1905, unit: '年', from: 3 },
          { kind: 'text', at: [840, 490], text: '光子', from: 4.5 },
          { kind: 'text', at: [840, 570], text: '狭义相对论', from: 5.5 },
          { kind: 'text', at: [600, 820], text: '业余时间改变了物理', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '数学不及格？', duration: 10,
        cues: [
          { kind: 'count', at: [600, 340], label: '学会微积分前', start: 0, end: 15, unit: '岁', from: 0.5 },
          { kind: 'sprite', icon: '📐', path: [[600, 560]], size: 130, from: 2 },
          { kind: 'myth', wrong: '爱因斯坦数学不及格', right: '他十五岁前就学会了微积分', from: 5 },
        ],
      },
    ],
  },
};
