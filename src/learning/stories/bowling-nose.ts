import type { Story } from './types';

export const bowlingNose: Story = {
  slug: 'bowling-nose',
  title: '大铁球从鼻尖放手，荡回来会砸到脸吗？',
  trigger: '科学课的视频里，老师把一个用长绳吊着的保龄球拉到自己鼻尖前，轻轻一松手；铁球荡出去又呼地荡回来，停在离鼻尖一点点的地方，全班同学都尖叫起来。',
  dialogue: [
    {
      nian: '爸爸，那个铁球荡回来那么快，老师为什么一点都不躲？',
      dad: '因为他知道它砸不到。只要松手时不推它，人也站着不动，铁球荡回来最多只能回到出发时的高度。出发点就在鼻尖前面，它最远也就荡回到那里，不会再多往前一点。',
    },
    {
      nian: '最多回到出发时的高度？为什么它不会荡得更高一点呢？',
      dad: '铁球荡起来，就是高度和速度来回换：往下荡，高度换成速度；往上荡，速度又换回高度。这一路上没有谁给它添能量，空气反倒在一直挡它，偷走一点点能量。所以它每次都荡不回原来那么高，停在离鼻尖差一点的地方。',
      figure: { kind: 'sim', sim: 'pendulum', caption: '选一选：松手时推不推、人往不往前探头。按播放，看铁球荡回来会不会碰到鼻子。' },
    },
    {
      nian: '空气偷走一点点能量……那要是松手时顺手推了一下呢？',
      dad: '那就危险了！很多人以为铁球荡回来会比出发时更高，其实不推它，它最多回到原高度；可一推，就是给它添了能量，它就能荡过鼻尖。人要是往前探头去看，脸就挪进了铁球的路线里，也会被砸到。',
    },
    {
      nian: '往前探头也会被砸到？那老师是怎么保证自己不动的？',
      dad: '做这个演示的老师会把后背和脑袋紧紧贴在墙上或门框上，松手时手只是张开，不往前送。好几所大学物理系的演示说明里都特别提醒：千万别推，人也别往前凑。我们在家可别拿重东西模仿。',
    },
    {
      nian: '千万别推？可我荡秋千的时候，为什么越荡越高呢？',
      dad: '因为你一直在给秋千添能量。要是你坐着一动不动，也没人推，秋千就会越荡越低，最后停下来，跟那个铁球一样。你在最高处收腿、到最低处蹬腿伸直，身体一起一伏，就像有人在推你，能量补上了，就越荡越高。',
    },
    {
      nian: '我懂了！铁球只是在高度和速度之间来回换，没人添能量，最多回到出发的高度，空气还偷走一点，所以砸不到。可要是推了它或者往前凑，就会被砸到。',
      dad: '说得好！用细绳吊一个装了一点水的轻塑料瓶，从鼻尖前面松手，背贴着墙站稳，看它荡回来停在哪儿。记住：只用轻东西，不要用铁球或者石头。',
    },
  ],
  tip: '大学里的演示常用 7 千克多的保龄球，挂在好几米长的绳子上；如果在家试，只能用很轻的东西，比如装一点水的塑料瓶。互动图里的摆长、角度和空气阻力都是示意值。',
  sources: [
    { title: '物理 八年级下册 · 第十一章 功和机械能 · 第4节 机械能及其转化', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Bowling Ball Pendulum（20.39 保龄球摆）', by: 'UC Santa Barbara Physics Lecture Demonstrations', url: 'https://web.physics.ucsb.edu/~lecturedemonstrations/Composer/Pages/20.39.html' },
    { title: 'Energy Conservation: Bowling Ball Pendulum（1M-01）', by: 'Purdue University Physics Demonstrations', url: 'https://www.physics.purdue.edu/demos/display_page.php?item=1M-01' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '松手，不推', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [1080, 480], size: [40, 760], color: '#cfc6b8', from: 0 },
          { kind: 'sprite', icon: '😐', path: [[1010, 540]], size: 90, from: 0 },
          { kind: 'swing', pivot: [600, 140], length: 520, angle: 40, period: 3, damping: 0.02, color: '#3553a6', from: 0.6 },
          { kind: 'label', at: [930, 540], pos: [760, 760], text: '出发点', from: 1 },
          { kind: 'text', at: [450, 840], text: '最多回到出发的高度', from: 7 },
        ],
      },
      {
        turn: 1, title: '高度和速度来回换', duration: 12,
        cues: [
          { kind: 'swing', pivot: [600, 140], length: 520, angle: 40, period: 3, damping: 0.04, color: '#3553a6', from: 0 },
          { kind: 'meter', at: [200, 300], label: '高度', start: 0.9, end: 0.8, color: '#3553a6', from: 0.6, over: 9 },
          { kind: 'text', at: [600, 820], text: '空气偷走一点点', from: 6 },
        ],
      },
      {
        turn: 2, title: '一推就危险', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [130, 500], size: [40, 680], color: '#cfc6b8', from: 0 },
          { kind: 'sprite', icon: '😵', path: [[210, 500]], size: 90, from: 0 },
          { kind: 'swing', pivot: [600, 140], length: 520, angle: 48, period: 3, color: '#b03f38', from: 0.4 },
          { kind: 'pulse', at: [210, 500], radius: 90, color: '#b03f38', from: 1.9 },
          { kind: 'label', at: [986, 488], pos: [900, 640], text: '推了一下', from: 0.4 },
          { kind: 'myth', wrong: '荡回来会比出发时更高', right: '不推它，最多回到原高度', from: 7 },
        ],
      },
      {
        turn: 3, title: '后背贴墙', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [1080, 480], size: [40, 760], color: '#cfc6b8', from: 0 },
          { kind: 'sprite', icon: '😌', path: [[1010, 540]], size: 90, from: 0 },
          { kind: 'swing', pivot: [600, 140], length: 520, angle: 40, period: 3, damping: 0.02, color: '#3553a6', from: 0.4 },
          { kind: 'label', at: [1060, 600], pos: [760, 760], text: '贴墙，不动', from: 1.2 },
          { kind: 'text', at: [450, 840], text: '千万别推，也别往前凑', from: 6 },
        ],
      },
      {
        turn: 4, title: '秋千越荡越高', duration: 12,
        cues: [
          { kind: 'swing', pivot: [600, 140], length: 460, angle: 15, period: 2.8, color: '#e8590c', icon: '🧒', from: 0.3, to: 5.3 },
          { kind: 'swing', pivot: [600, 140], length: 460, angle: 35, period: 2.8, color: '#e8590c', icon: '🧒', from: 5.3 },
          { kind: 'text', at: [600, 820], text: '收腿蹬腿，补上能量', from: 6.4 },
        ],
      },
    ],
  },
};
