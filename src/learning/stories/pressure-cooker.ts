import type { Story } from './types';

export const pressureCooker: Story = {
  slug: 'pressure-cooker',
  title: '高压锅为什么煮得快，高原上为什么煮不熟饭？',
  trigger: '小念看西藏旅行的视频，博主说在拉萨用普通锅煮面条，煮了好久还是夹生的，后来换了高压锅才煮熟。',
  dialogue: [
    {
      nian: '爸爸，拉萨的水也是烧开了的，为什么面条煮不熟？',
      dad: '因为在拉萨，水不到 100 ℃ 就开了。水的沸点跟头顶的气压有关：在海边，气压约 101 千帕，水 100 ℃ 沸腾；拉萨海拔 3600 多米，空气稀薄，气压只有 65 千帕左右，水 88 ℃ 上下就开了。水温不够高，面条当然熟得慢。',
    },
    {
      nian: '气压低水就早早开了？那把火开到最大，水温能不能再升高？',
      dad: '不能。水一沸腾，温度就停在沸点不动了，火再大，也只是让水开得更猛、更快烧干，水温还是那么多。很多人以为火越大水温越高，其实水开以后，温度由沸点决定，沸点又由气压决定。',
      figure: { kind: 'sim', sim: 'boil', caption: '把锅搬到拉萨、海边和高压锅里，再换换火力：看水开以后，温度停在多少度。' },
    },
    {
      nian: '沸点由气压决定？那高压锅是怎么把沸点提高的？',
      dad: '高压锅的锅盖能锁紧，还有一圈密封圈，水蒸气跑不出去，锅里的气压就越来越高，能比外面多出 70 到 100 千帕左右。气压高了，沸点也跟着升高，锅里的水能到 115 到 120 ℃ 左右才开，饭菜就熟得快多了。',
    },
    {
      nian: '锅盖锁紧了，气压一直往上涨，锅会不会炸？',
      dad: '高压锅有好几道保险：锅盖上的限压阀，气压一到设定值，就被顶起来放气，“嗤嗤”地响；万一它堵住了，还有安全阀会自动放气。所以要按说明书用，检查阀门通不通。锅还有压力时不能硬开盖，这些事都要让大人来做。',
    },
    {
      nian: '高压锅能自己放气，保住锅里的气压？那住得越高的地方，是不是越需要它？',
      dad: '是的！美国农业部的家庭罐头指南里列过：海拔大约 3000 米的地方，水在 90 ℃ 左右就开了，比海边的 100 ℃ 低了约 10 ℃。所以在高原上，普通锅煮饭常常夹生，家家户户都爱用高压锅。',
    },
    {
      nian: '我明白了！水的沸点由气压决定：高原上气压低，水不到 100 ℃ 就开，面条煮不熟；火再大，水温也停在沸点。高压锅锁住水蒸气、提高气压，沸点升高，饭就熟得快。',
      dad: '说得好！请大人帮忙，用厨房温度计量一量刚烧开的水有多少度。如果有机会去山上，再量一次，比比两次的读数。',
    },
  ],
  tip: '拉萨的气压按中国天气网给出的年平均气压约 652 百帕，也就是 65 千帕左右；沸点是按美国国家标准与技术研究院的水的数据估算的，都是大约的值。高压锅里多出来的气压，不同锅不一样，以说明书为准。使用高压锅一定要有大人在场。',
  sources: [
    { title: '物理 八年级上册 · 第三章 第3节 汽化和液化；八年级下册 · 第九章 第3节 大气压强', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Using and Caring for Your Pressure Canner（压力与锅内温度）', by: 'Oregon State University Extension · PNW 421', url: 'https://extension.oregonstate.edu/sites/extd8/files/documents/pnw421.pdf' },
    { title: 'Temperatures at Which Water Boils at Different Elevations', by: 'National Center for Home Food Preservation（据 USDA 家庭罐头指南）', url: 'https://nchfp.uga.edu/how/can/general-canning-information/temperatures-at-which-water-boils-at-different-elevations/' },
    { title: '西藏 · 区划概况（拉萨海拔与年平均气压）', by: '中国天气网', url: 'https://www.weather.com.cn/xizang/xzqh/qhgk/646171.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '拉萨水早开', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 560], size: [260, 160], color: '#9aa7b3', text: '海边', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 560], size: [260, 160], color: '#9aa7b3', text: '拉萨', from: 0 },
          { kind: 'count', at: [330, 330], label: '沸点', start: 0, end: 100, unit: '℃', from: 1.2 },
          { kind: 'count', at: [870, 330], label: '沸点', start: 0, end: 88, unit: '℃', from: 3 },
          { kind: 'text', at: [600, 820], text: '气压低，水早早开了', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '火再大也没用', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [320, 180], color: '#9aa7b3', text: '水开了', from: 0 },
          { kind: 'particles', box: [450, 190, 300, 160], count: 18, color: '#aab6c2', motion: 'rise', from: 0.5 },
          { kind: 'sprite', icon: '🔥', path: [[600, 600]], size: 110, from: 1, wobble: true },
          { kind: 'meter', at: [920, 450], label: '水温', start: 0.8, end: 0.8, color: '#e8590c', from: 1.6 },
          { kind: 'myth', wrong: '火越大水温越高', right: '沸点由气压决定', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '锁紧锅盖', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [340, 220], color: '#9aa7b3', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 410], size: [380, 40], color: '#5f6b77', from: 0.4 },
          { kind: 'label', at: [760, 410], pos: [960, 480], text: '锁紧的锅盖', from: 1 },
          { kind: 'particles', box: [450, 440, 300, 160], count: 34, color: '#ffffff', motion: 'gas', from: 1 },
          { kind: 'count', at: [940, 300], label: '锅里沸点', start: 100, end: 120, unit: '℃', from: 3 },
          { kind: 'text', at: [600, 820], text: '气压高，沸点也高', from: 7 },
        ],
      },
      {
        turn: 3, title: '限压阀放气', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [340, 220], color: '#9aa7b3', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [380, 40], color: '#5f6b77', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [60, 60], color: '#e8590c', motion: 'wiggle', from: 1 },
          { kind: 'particles', box: [500, 180, 200, 140], count: 14, color: '#aab6c2', motion: 'rise', from: 1.6 },
          { kind: 'label', at: [630, 380], pos: [900, 300], text: '限压阀', from: 2.4 },
          { kind: 'text', at: [600, 820], text: '要让大人来操作', from: 6 },
        ],
      },
      {
        turn: 4, title: '越高越需要', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏔️', path: [[600, 470]], size: 340, from: 0 },
          { kind: 'label', at: [600, 340], pos: [880, 250], text: '大约 3000 米', from: 1.4 },
          { kind: 'count', at: [280, 330], label: '沸点', start: 100, end: 90, unit: '℃', from: 3 },
          { kind: 'text', at: [600, 820], text: '比海边低了约 10 ℃', from: 6.5 },
        ],
      },
    ],
  },
};
