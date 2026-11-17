import type { Story } from './types';

export const mountainRoad: Story = {
  slug: 'mountain-road',
  title: '盘山公路为什么要绕来绕去？',
  trigger: '坐车上山，路一会儿往左拐、一会儿往右拐，绕了一圈又一圈；小念趴在车窗上看，山顶好像一直就在头顶上。',
  dialogue: [
    {
      nian: '爸爸，山顶就在上面，为什么不修一条直直的路冲上去？',
      dad: '直着冲上去太陡了。车子爬坡时，发动机要和把车往下拽的那份重力较劲：坡越陡，往下拽得越狠，车可能爬不动，下坡时也容易刹不住。把路修得绕来绕去，坡就缓了，每走一段只升高一点点，车子就轻松多了。',
    },
    {
      nian: '坡缓了车子就轻松？那绕远路是不是也省了力气呢？',
      dad: '省的是每一步用的力，不是总的力气。物理里把力乘上沿着力的方向走的距离叫做功。把 600 牛的箱子直接搬上 1 米高的台子，做功 600 焦；改成推上 4 米长的斜面，只要用 150 牛，可得推 4 米，算下来还是 600 焦。',
      eq: '功 = 力 × 距离：600 N × 1 m = 150 N × 4 m = 600 J',
      figure: { kind: 'sim', sim: 'ramp', caption: '拖动斜面的长度：推力变小了，要推的路变长了，做的功变了吗？再打开摩擦看看。' },
    },
    {
      nian: '推上斜面，做的功还是 600 焦？那有没有又省力、又省功的机器呢？',
      dad: '没有。很多人以为省了力就省了功，其实杠杆、滑轮、斜面都一样：省力就得多走距离，省距离就得多用力，做的功不会变少。斜面上还有摩擦，路越长，摩擦偷走的能量越多，做的功反而要多一点。所以路也不能修得无限长。',
    },
    {
      nian: '路也不能无限长？那公路修多陡才合适，有规定吗？',
      dad: '有。国家的公路标准规定了最大纵坡：车速快的高速公路最陡只能 3%，也就是走 100 米升高 3 米；山里车速慢的小路最陡也只到 9%。翻山的路还要求一长段的平均坡度不能太陡，免得车子一路长下坡，刹车一直踩着，热得发烫。',
    },
    {
      nian: '刹车会热得发烫？那轮椅坡道是不是也一样，不能修得太陡？',
      dad: '对，而且要更缓。轮椅要靠人用手推着上坡，国家的无障碍设计规范写着：坡道的坡度用 1:12 时，一段最多只能升高 0.75 米，水平要拉出 9 米长；有条件的话做得比这还缓，推起来更安全、更省劲。所以医院门口的坡道总是长长的，还要折回来。',
    },
    {
      nian: '我懂了！把东西抬到同样高，做的功一样多；斜面把路拉长，每一步的力就小了，省力就得多走路。盘山公路绕来绕去，就是把陡坡变成长长的缓坡。',
      dad: '说得好！拿一块木板搭在一摞书上，用一根橡皮筋拉着玩具车往上走：木板放得越平，橡皮筋被拉长得越多还是越少？',
    },
  ],
  tip: '文中的箱子 600 牛、台子 1 米、斜面 4 米都是为了好算取的整数，互动图里“有一点摩擦”按摩擦系数 0.1 估算。公路最大纵坡来自《公路工程技术标准》（JTG B01—2014），按设计车速从每小时 120 千米的 3% 到 20 千米的 9%；轮椅坡道的数据来自《无障碍设计规范》（GB 50763—2012）。',
  sources: [
    { title: '物理 八年级下册 · 第十一章 功和机械能 · 第1节 功；第十二章 简单机械 · 第2节 滑轮（轮轴和斜面）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '最大纵坡（各级公路设计速度与最大纵坡表）', by: '科普中国', url: 'https://www.kepuchina.cn/article/articleinfo?ar_id=358242&business_type=100&classify=0' },
    { title: '无障碍设计规范（GB 50763—2012）· 3.4 轮椅坡道', by: '住房和城乡建设部（安徽省宿州市住房和城乡建设局转载）', url: 'https://zjj.ahsz.gov.cn/download/5bbe97c7b760b4e97150fcb8' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '直冲太陡', duration: 11,
        cues: [
          { kind: 'bond', a: [300, 760], b: [560, 220], color: '#b03f38', from: 0.3 },
          { kind: 'label', at: [430, 490], pos: [200, 400], text: '太陡：爬不动', from: 1.4 },
          { kind: 'ray', path: [[700, 760], [1100, 680], [760, 600], [1100, 520], [760, 440], [1050, 360]], color: '#8b7a5c', draw: 1.5, from: 2.4 },
          { kind: 'sprite', icon: '🚗', path: [[700, 750], [1100, 670], [760, 590], [1100, 510], [760, 430], [1050, 350]], size: 70, travel: 6, from: 3 },
          { kind: 'text', at: [600, 840], text: '绕着走，坡就缓了', from: 8 },
        ],
      },
      {
        turn: 1, title: '功一样多', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 720], size: [1200, 20], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [960, 660], size: [240, 100], color: '#d8c9ad', text: '1 米高', from: 0 },
          { kind: 'bond', a: [200, 710], b: [840, 610], color: '#8b7a5c', from: 0.4 },
          { kind: 'sprite', icon: '📦', path: [[250, 680], [790, 595]], size: 70, travel: 5, from: 1.4 },
          { kind: 'formula', at: [600, 200], text: '600 × 1 = 150 × 4', from: 2 },
          { kind: 'meter', at: [330, 330], label: '推力', start: 0.9, end: 0.23, color: '#e8590c', from: 3, over: 2 },
          { kind: 'meter', at: [330, 450], label: '要推的路', start: 0.23, end: 0.9, color: '#3553a6', from: 3, over: 2 },
          { kind: 'count', at: [880, 400], label: '做的功', start: 600, end: 600, unit: '焦', from: 5.6 },
        ],
      },
      {
        turn: 2, title: '省力不省功', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 380], size: [260, 90], color: '#ffd166', text: '杠杆', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [260, 90], color: '#ffd166', text: '滑轮', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [870, 380], size: [260, 90], color: '#ffd166', text: '斜面', from: 1.8 },
          { kind: 'formula', at: [600, 230], text: '省力 → 多走路', from: 2.6 },
          { kind: 'text', at: [600, 560], text: '做的功都不会变少', from: 3.8 },
          { kind: 'myth', wrong: '省了力就省了功', right: '省力就得多走路', from: 6.4 },
        ],
      },
      {
        turn: 3, title: '最陡 3% 到 9%', duration: 12,
        cues: [
          { kind: 'bond', a: [150, 700], b: [1050, 673], color: '#8b7a5c', from: 0.4 },
          { kind: 'label', at: [1050, 673], pos: [880, 600], text: '高速：最陡 3%', from: 1 },
          { kind: 'bond', a: [150, 500], b: [1050, 419], color: '#b03f38', from: 3 },
          { kind: 'label', at: [1050, 419], pos: [880, 330], text: '山路：最陡 9%', from: 3.6 },
          { kind: 'text', at: [600, 830], text: '走 100 米，升高 3 米', from: 6.4 },
        ],
      },
      {
        turn: 4, title: '轮椅坡道', duration: 12,
        cues: [
          { kind: 'bond', a: [150, 700], b: [1050, 625], color: '#8b7a5c', from: 0.3 },
          { kind: 'label', at: [600, 662], pos: [560, 520], text: '坡度 1:12', from: 1 },
          { kind: 'count', at: [330, 320], label: '水平长度', start: 0, end: 9, unit: '米', from: 2 },
          { kind: 'label', at: [1050, 625], pos: [900, 450], text: '最多升高 0.75 米', from: 3.4 },
          { kind: 'sprite', icon: '🧑‍🦽', path: [[200, 660], [1000, 590]], size: 80, travel: 6, from: 4.4 },
          { kind: 'text', at: [600, 830], text: '坡道长长的，推着才省劲', from: 8 },
        ],
      },
    ],
  },
};
