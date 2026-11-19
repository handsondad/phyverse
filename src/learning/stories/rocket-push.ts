import type { Story } from './types';

const SPACE = '#1e2a4a';
const FLAME = '#ff922b';
const GAS = '#ffd43b';
const BODY = '#e9ecef';

export const rocketPush: Story = {
  slug: 'rocket-push',
  title: '太空里连空气都没有，火箭靠推什么往前飞？',
  trigger: '小念吹饱一个气球没扎紧，手一松，气球“噗噗噗”喷着气满屋乱窜；电视里正好在播长征火箭飞出大气层的画面。',
  dialogue: [
    {
      nian: '爸爸，气球在屋里能推着空气飞，可太空里连空气都没有，火箭靠推什么往前飞？',
      dad: '它谁也不用借，推的就是自己喷出去的燃气！很多人以为火箭靠喷气顶住后面的空气才能走，其实气球和火箭都不是在推外面的空气。火箭使劲把肚子里的热燃气往后推，力的作用是相互的，燃气也同时使劲把火箭往前推，这种现象叫反冲。',
    },
    {
      nian: '反冲……就像我站在滑板上往前扔球，自己会往后退一样吗？',
      dad: '这个比方一模一样！美国航天局就是拿滑板打比方的：你站在滑板上使劲把重球往后扔，球被你推向后面，你也立刻被球推向前面，周围有没有空气根本没关系。火箭只不过是把一个大球换成了源源不断高速喷出的燃气。',
      figure: { kind: 'sim', sim: 'recoil', caption: '调高往后喷气的速度、多喷掉几成燃料：在一点空气都没有的太空里，火箭能提速到多快？' },
    },
    {
      nian: '源源不断喷出的燃气……没有空气，外面的阻力是不是也没了？',
      dad: '对极了！空气非但帮不上忙，反而是挡路的阻力。在地面附近，稠密的空气既迎头拦着火箭，还顶在喷口外面挡着燃气冲出来；飞进太空真空以后，这两样麻烦全没了，同样的发动机推力反而比在地面时更大、飞得更痛快。',
    },
    {
      nian: '推力反而更大……可太空里没有氧气，火箭肚子里的火怎么烧得着？',
      dad: '所以火箭不像飞机那样从空气里吸氧气，它自己背着两只大罐子：一罐装燃料，另一罐专门装液态氧那样的助燃剂。两样东西在燃烧室里一碰头就能猛烈燃烧，化成高温高压燃气从喷口冲出去，在漆黑的真空里照样点火工作。',
    },
    {
      nian: '在真空里照样工作……那航天员出舱飘在半空时，也是靠喷气拐弯吗？',
      dad: '没错！1984 年，航天员麦坎德利斯第一次不系安全绳飘进太空，一直飞到离航天飞机约 100 米远的地方。他背上的机动背包里装着高压氮气，往左边喷一口冷气，人就往右边挪；往前面喷一口，人就停下来往回飞。',
      figure: {
        kind: 'image',
        src: '/images/photos/rocket-push-mmu.webp',
        alt: '航天员麦坎德利斯身穿白色航天服，背着喷气机动背包，不系安全绳独自飘在漆黑的太空中，下方是蔚蓝色的地球弧线',
        caption: '1984 年航天员麦坎德利斯不系安全绳飘到离飞船约 100 米远，全靠背包往不同方向喷氮气飞回来。',
        credit: 'NASA · 公有领域',
        href: 'https://images.nasa.gov/details/S84-27031',
      },
    },
    {
      nian: '我懂了！火箭不是靠推空气飞的，而是靠反冲：它把自带燃料烧出的燃气猛推向后面，燃气就同时把火箭推向前面，到了没有空气的太空反而飞得更顺畅。',
      dad: '总结得真清楚！回家我们可以拿吸管穿一根细绳，把吹饱的气球粘在吸管上，一松手就是一艘顺着绳子飞奔的“气球小火箭”。',
    },
  ],
  tip: '做气球小火箭实验时，注意别把没吹起来的气球含在嘴里深吸气，以防呛入；也绝不要自己摆弄爆竹火药模仿火箭，燃烧推进实验只能在正规航模课上由专业老师指导。',
  sources: [
    { title: '物理 选择性必修 第一册 · 第一章 动量守恒定律 · 第6节 反冲现象 火箭', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What Is a Rocket? (Grades 5-8)（太空真空里牛顿第三定律与滑板扔球比方；火箭自带助燃剂）', by: 'NASA', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-a-rocket-grades-5-8/' },
    { title: 'Rocket Thrust（火箭推力方程无需外部空气参与，自带氧化剂即可在真空工作）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/rocket-thrust/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是推空气', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [960, 420], color: SPACE, from: 0 },
          { kind: 'shape', shape: 'pill', at: [640, 430], size: [260, 90], color: BODY, text: '火箭', slide: { to: [820, 430], at: 2, over: 4 }, from: 0.4 },
          { kind: 'flow', path: [[500, 430], [200, 430]], color: GAS, count: 6, speed: 240, from: 1.5 },
          { kind: 'arrow', path: [[480, 520], [260, 520]], color: '#74c0fc', text: '往后推燃气', from: 2.2 },
          { kind: 'arrow', path: [[660, 520], [880, 520]], color: FLAME, text: '燃气往前推', from: 3 },
          { kind: 'myth', wrong: '火箭靠推外面的空气飞', right: '推自己喷出的燃气（反冲）', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '滑板扔球', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 680], size: [1000, 14], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🛹', path: [[560, 635], [780, 635]], size: 96, travel: 3.5, from: 2 },
          { kind: 'sprite', icon: '🧍', path: [[560, 540], [780, 540]], size: 120, travel: 3.5, from: 2 },
          { kind: 'sprite', icon: '🛹', path: [[560, 635]], size: 96, from: 0.2, to: 2 },
          { kind: 'sprite', icon: '🧍', path: [[560, 540]], size: 120, from: 0.2, to: 2 },
          { kind: 'atom', path: [[510, 520], [180, 520]], symbol: '球', color: '#3553a6', r: 30, travel: 2.6, from: 2 },
          { kind: 'text', at: [600, 810], text: '往后扔球，人就往前滑', from: 6 },
        ],
      },
      {
        turn: 2, title: '太空没阻力', duration: 11,
        cues: [
          { kind: 'particles', box: [120, 240, 380, 380], count: 20, color: '#9cc7e8', motion: 'gas', size: 8, from: 0.3 },
          { kind: 'label', at: [310, 430], pos: [310, 670], text: '地面空气拦着走', from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [860, 430], size: [420, 380], color: SPACE, from: 0.5 },
          { kind: 'sprite', icon: '🚀', path: [[720, 430], [1000, 430]], size: 100, travel: 3.2, from: 2.5 },
          { kind: 'label', at: [860, 350], pos: [860, 210], text: '太空真空无阻力', from: 3.5 },
          { kind: 'text', at: [600, 810], text: '没空气挡路，推力反而更大', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '自带两只罐', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [640, 200], color: BODY, from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [430, 440], size: [200, 120], color: '#ff922b', text: '燃料罐', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [680, 440], size: [200, 120], color: '#4dabf7', text: '助燃剂', from: 2.2 },
          { kind: 'pulse', at: [870, 440], color: FLAME, radius: 110, from: 3.8 },
          { kind: 'flow', path: [[920, 440], [1130, 440]], color: GAS, count: 5, speed: 220, from: 4.2 },
          { kind: 'text', at: [600, 810], text: '自己带氧，真空照样燃烧', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '喷气背包', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [980, 440], color: SPACE, from: 0 },
          { kind: 'sprite', icon: '🧑‍🚀', path: [[420, 450], [720, 450]], size: 130, travel: 4, from: 1.5 },
          { kind: 'flow', path: [[380, 450], [200, 450]], color: '#e7f5ff', count: 5, speed: 180, from: 1.8 },
          { kind: 'count', at: [600, 230], label: '离飞船约', start: 0, end: 100, unit: '米', from: 2.5 },
          { kind: 'text', at: [600, 810], text: '往左喷氮气，人就往右飞', from: 6.5 },
        ],
      },
    ],
  },
};
