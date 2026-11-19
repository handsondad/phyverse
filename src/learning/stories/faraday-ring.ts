import type { Story } from './types';

const IRON = '#868e96';
const HOT = '#e8590c';

export const faradayRing: Story = {
  slug: 'faraday-ring',
  title: '装订书的学徒法拉第，是怎样让磁变出电的？',
  trigger: '小念在手摇手电筒的说明书上看到一行字：“原理：法拉第电磁感应”。她问爸爸法拉第是谁，爸爸说他小时候家里穷得上不起几年学。',
  dialogue: [
    {
      nian: '爸爸，法拉第小时候都上不起几年学，后来怎么成了大科学家？',
      dad: '法拉第家里很穷，13 岁就到书店打杂，后来当了装订书的学徒。他一边装订一边读书里讲电的文章，还自己动手做小实验。后来有人带他去英国皇家研究院听化学家戴维的讲座，他把笔记工工整整誊好装订成册寄给戴维，终于当上了实验室的助手。',
      figure: {
        kind: 'image',
        src: '/images/photos/faraday-phillips-1842.webp',
        alt: '托马斯·菲利普斯绘制的迈克尔·法拉第油画肖像：中年男子身穿深色外套，一手扶着桌上的电池匣',
        caption: '法拉第肖像（托马斯·菲利普斯约 1842 年绘）。他从书店学徒一路自学，成了伟大的实验物理学家。',
        credit: 'Thomas Phillips · 公有领域',
        href: 'https://commons.wikimedia.org/wiki/File:M_Faraday_Th_Phillips_oil_1842.jpg',
      },
    },
    {
      nian: '实验室的助手？那他自己的大发现是什么？',
      dad: '是让磁变出电！那时人们已经知道电流能变出磁，法拉第想：反过来，磁能不能变出电？他试了很多年。1831 年 8 月 29 日，他在一个铁环两边各绕一组线圈：左边接电池，右边连一根导线，导线从一枚小磁针旁经过，用来看有没有电流。',
    },
    {
      nian: '小磁针动了吗？左边一通电，右边就一直有电流了吧？',
      dad: '奇怪的事发生了！左边一接上电池，磁针猛地一跳，可接着就摆回原位不动了；电一直通着，右边并没有电流。等他把电池断开，磁针又往反方向跳了一下。电流只在“接通”和“断开”的一刹那出现，一闪就没了。',
      figure: { kind: 'sim', sim: 'faradayRing', caption: '拖动左边线圈的状态：接通、一直通着、断开时，看右边的小磁针什么时候跳。' },
    },
    {
      nian: '一刹那？为什么只有接通和断开的时候才有电？',
      dad: '因为只有那一刹那，铁环里的磁场在变化：接通时从没有变成有，断开时从有变成没有。磁场一稳定不变，右边的线圈就“感觉”不到什么了。法拉第由此明白：不是有磁就有电，而是磁场变化时才生出电来。这就是电磁感应。',
    },
    {
      nian: '电磁感应……后来他又是怎么用它发电的？',
      dad: '同年秋天，他把一根条形磁铁在线圈里来回抽动，线圈里就一阵阵地有电流；他还让一个铜盘在大磁铁两极之间不停地转，得到了源源不断的电，这就是最早的发电机。今天的发电站，不管烧煤、用水力还是风力，都是让线圈和磁铁转起来，靠的还是法拉第的原理。',
    },
    {
      nian: '我明白了！法拉第发现磁场变化的时候才会生出电，接通和断开电池的一刹那铁环里的磁场在变，所以磁针只跳一下；让磁铁和线圈不停地动，就能一直发电。',
      dad: '一点不差！一个没上过几年学的装订学徒，靠自学和一双巧手找到了这条规律。英国皇家研究院至今还保存着他亲手绕的那个铁环。',
    },
  ],
  tip: '可以用漆包线在铁钉或螺丝刀杆上绕两组线圈，一组接一节干电池并快速接通、断开，另一组连接灵敏电流计，就能看到指针只在接通和断开时偏转。只用一两节干电池，绝不要把导线接到插座上。',
  sources: [
    { title: '物理 九年级 · 第二十章 电与磁 · 第5节 磁生电；选择性必修 第二册 · 第二章 电磁感应', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Michael Faraday’s ring-coil apparatus（1831 年 8 月 29 日的铁环线圈：一组线圈通电时，另一组只出现短暂电流）', by: '英国皇家研究院（Royal Institution）', url: 'https://www.rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus' },
    { title: 'Notebooks preview: The note-taking life of a young Michael Faraday（13 岁在书店打杂、后成装订学徒，誊写戴维讲座笔记进入皇家研究院）', by: '英国皇家研究院（Royal Institution）', url: 'https://www.rigb.org/explore-science/explore/blog/notebooks-preview-note-taking-life-young-michael-faraday' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '书店里的学徒', duration: 11,
        cues: [
          { kind: 'sprite', icon: '📚', path: [[360, 460]], size: 200, from: 0.3 },
          { kind: 'count', at: [360, 260], label: '去书店那年', start: 0, end: 13, unit: '岁', from: 1 },
          { kind: 'arrow', path: [[500, 460], [720, 460]], color: HOT, text: '听戴维讲座', from: 3 },
          { kind: 'sprite', icon: '🔬', path: [[860, 460]], size: 180, from: 4.5 },
          { kind: 'label', at: [860, 540], pos: [860, 680], text: '当上实验室助手', from: 5.5 },
          { kind: 'text', at: [600, 820], text: '靠自学走进实验室', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '磁能变出电吗', duration: 11,
        cues: [
          { kind: 'count', at: [600, 230], label: '那一天', start: 1800, end: 1831, unit: '年', from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [600, 490], size: [300, 300], color: IRON, outline: true, from: 1.5 },
          { kind: 'label', at: [460, 490], pos: [220, 620], text: '左线圈：接电池', from: 2.5 },
          { kind: 'label', at: [740, 490], pos: [980, 620], text: '右线圈：连磁针', from: 3.5 },
          { kind: 'text', at: [600, 820], text: '左边通电，右边会怎样？', from: 6 },
        ],
      },
      {
        turn: 2, title: '磁针只跳一下', duration: 12,
        cues: [
          { kind: 'swing', pivot: [600, 220], length: 220, angle: 35, period: 1.2, damping: 0.9, color: HOT, from: 1 },
          { kind: 'text', at: [600, 600], text: '一接通：跳一下', from: 1 },
          { kind: 'text', at: [600, 690], text: '一直通：回原位', from: 4.5 },
          { kind: 'text', at: [600, 780], text: '一断开：反向跳', from: 8 },
        ],
      },
      {
        turn: 3, title: '磁场变化才生电', duration: 11,
        cues: [
          { kind: 'meter', at: [380, 340], label: '铁环磁场', start: 0, end: 90, over: 2, from: 0.5 },
          { kind: 'pulse', at: [820, 340], color: HOT, from: 0.8, to: 3.2 },
          { kind: 'label', at: [820, 360], pos: [960, 500], text: '变化中：有电流', from: 1, to: 4 },
          { kind: 'text', at: [600, 600], text: '磁场不变：没有电流', from: 5 },
          { kind: 'text', at: [600, 820], text: '这就是电磁感应', from: 8 },
        ],
      },
      {
        turn: 4, title: '最早的发电机', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🧲', path: [[300, 460], [480, 460], [300, 460]], size: 120, travel: 3, from: 0.3 },
          { kind: 'flow', path: [[560, 460], [760, 460]], color: HOT, count: 4, from: 1 },
          { kind: 'sprite', icon: '💡', path: [[880, 460]], size: 140, from: 2 },
          { kind: 'text', at: [600, 820], text: '磁铁动起来，电就不断', from: 5 },
        ],
      },
    ],
  },
};
