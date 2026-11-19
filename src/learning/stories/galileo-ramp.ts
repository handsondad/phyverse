import type { Story } from './types';

const INK = '#5d4e37';
const BLUE = '#3553a6';
const HOT = '#e8590c';

export const galileoRampStory: Story = {
  slug: 'galileo-ramp',
  title: '没有秒表，伽利略怎样量出东西越落越快？',
  trigger: '小念从滑梯顶上松开一个皮球，皮球一路越滚越快冲到底；她想起课本上说伽利略研究过下落，好奇四百年前的人拿什么计时。',
  dialogue: [
    {
      nian: '爸爸，石头一松手眨眼就落地，伽利略那时候连秒表都没有，他是怎么量出下落快慢的？',
      dad: '他想了个聪明的办法：把下落“放慢”！让小球从一条很缓的斜槽上滚下来，它和自由下落遵守同一种规律，只是慢得多，人就来得及看、来得及量了。斜面越缓，“慢动作”放得越慢，就像把一段飞快的录像调成了慢放。',
    },
    {
      nian: '慢动作是看清了，可没有秒表，时间怎么量？',
      dad: '可以借一个“天然节拍器”——摆。伽利略发现，同样长的摆，每来回摆一次用的时间几乎一样。伽利略博物馆里有一台十九世纪初做的大斜面：小球和摆同时出发，摆每摆一次，小球正好敲响槽边的一个小铃铛，铃声叮、叮、叮均匀地响。',
    },
    {
      nian: '小铃铛均匀地响……那铃铛之间离得一样远吗？',
      dad: '不一样远，越往下隔得越远！从头数，相邻铃铛的距离是 1 份、3 份、5 份、7 份，像奇数一样一个比一个大。加起来看，第一拍走 1 份，两拍一共 4 份，三拍 9 份，四拍 16 份——走过的路正好和时间的平方成正比。',
      figure: { kind: 'sim', sim: 'galileoRamp', caption: '看摆打节拍、小球敲铃：每拍多走的路是 1、3、5、7 份。换陡一点的斜面、换木球试试。' },
    },
    {
      nian: '时间的平方？这能说明小球越滚越快吗？',
      dad: '能！同样一拍，后面走的路比前面多，说明它每一拍都在加速，而且每拍都比上一拍多走 2 份，速度在均匀地增加。斜面陡一点、缓一点，这个 1、3、5、7 的比例都不变。伽利略由此推想：斜面陡到竖直，就是自由下落，规律也一样。',
    },
    {
      nian: '规律也一样……那铁球和木球一起滚，谁先到底？',
      dad: '几乎一起到！只要空气阻力小得可以不管，轻的重的落得一样快，这推翻了亚里士多德“越重落得越快”的说法。还要说一句：伽利略博物馆写得很清楚，没有文件证明伽利略做的正是这台铃铛斜面，它是后人照他的规律做来演示的。',
    },
    {
      nian: '我懂了！伽利略用很缓的斜面把下落放慢，用摆打节拍量时间，发现小球每拍多走的路是 1、3、5、7 份，越滚越快，而且和轻重、斜面陡缓都没关系。',
      dad: '总结得真棒！伽利略不只是猜，而是想办法把难量的东西变成能量的东西，再用实验去检验，这正是物理学家最厉害的本事。',
    },
  ],
  tip: '用一块长木板垫高一端、一颗玻璃弹珠和手机节拍器就能重做：节拍器每响一次，在弹珠经过处贴一条胶带，量量胶带之间的距离比。斜面要缓、木板要直，弹珠滚落时注意别砸到脚。伽利略博物馆说明：现存铃铛斜面是十九世纪初的演示仪器，并无文件证明伽利略做过这一具体实验。',
  sources: [
    { title: '物理 必修 第一册 · 第二章 匀变速直线运动的研究 · 第4节 自由落体运动（伽利略对自由落体运动的研究）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Inclined plane（带五个小铃铛和摆的斜面：摆每完成一次摆动，小球敲响一个铃铛，铃铛间距按奇数排列；并无文件证明伽利略做过这一具体实验）', by: '伽利略博物馆（Museo Galileo）', url: 'https://catalogue.museogalileo.it/object/InclinedPlane.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '把下落放慢', duration: 10,
        cues: [
          { kind: 'toss', at: [260, 240], velocity: [0, 0], ground: 700, icon: '🪨', from: 0.5 },
          { kind: 'label', at: [260, 640], pos: [200, 470], text: '眨眼就落地', from: 1.6 },
          { kind: 'bond', a: [520, 360], b: [1060, 700], order: 2, color: INK, from: 0.3 },
          { kind: 'sprite', icon: '⚽', path: [[530, 330], [1050, 670]], size: 50, travel: 6, from: 1.2 },
          { kind: 'text', at: [600, 820], text: '斜面让下落变成慢动作', from: 6 },
        ],
      },
      {
        turn: 1, title: '摆来打节拍', duration: 11,
        cues: [
          { kind: 'swing', pivot: [400, 220], length: 300, angle: 25, period: 2, from: 0.3 },
          { kind: 'label', at: [400, 520], pos: [200, 680], text: '每次来回一样长', from: 2 },
          { kind: 'pulse', at: [860, 440], color: HOT, from: 3 },
          { kind: 'text', at: [860, 320], text: '叮、叮、叮', from: 3 },
          { kind: 'text', at: [600, 820], text: '摆一次，铃响一下', from: 6 },
        ],
      },
      {
        turn: 2, title: '一拍比一拍远', duration: 12,
        cues: [
          { kind: 'bond', a: [120, 300], b: [1080, 700], order: 2, color: INK, from: 0 },
          { kind: 'label', at: [150, 312], pos: [150, 222], text: '1 份', from: 1 },
          { kind: 'label', at: [270, 362], pos: [270, 262], text: '3 份', from: 2 },
          { kind: 'label', at: [510, 462], pos: [510, 352], text: '5 份', from: 3 },
          { kind: 'label', at: [870, 612], pos: [870, 492], text: '7 份', from: 4 },
          { kind: 'count', at: [960, 260], label: '四拍一共', start: 0, end: 16, unit: '份', from: 6 },
          { kind: 'text', at: [600, 820], text: '路程和时间平方成正比', from: 8 },
        ],
      },
      {
        turn: 3, title: '越滚越快', duration: 10,
        cues: [
          { kind: 'meter', at: [600, 340], label: '小球速度', start: 10, end: 90, over: 6, from: 0.5 },
          { kind: 'text', at: [600, 560], text: '每拍多走 2 份', from: 2.5 },
          { kind: 'arrow', path: [[300, 700], [900, 700]], color: BLUE, text: '斜面陡到竖直', from: 4.5 },
          { kind: 'text', at: [600, 820], text: '陡缓都是1、3、5、7', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '轻重一起到', duration: 11,
        cues: [
          { kind: 'bond', a: [160, 320], b: [1040, 680], order: 2, color: INK, from: 0 },
          { kind: 'sprite', icon: '⚫', path: [[180, 290], [1020, 650]], size: 50, travel: 5, from: 0.8 },
          { kind: 'sprite', icon: '🟤', path: [[180, 230], [1020, 590]], size: 50, travel: 5, from: 0.8 },
          { kind: 'myth', wrong: '越重的球滚得越快', right: '轻的重的几乎一起到底', from: 6.5 },
        ],
      },
    ],
  },
};
