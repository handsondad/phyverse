import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const CURVE: Vec[] = [[160, 720], [420, 720], [600, 690], [740, 600], [820, 470], [850, 300]];

export const centripetalStep: Story = {
  slug: 'centripetal-step',
  title: '汽车急转弯，人为什么会被甩向外边？',
  trigger: '坐车去奶奶家，汽车在路口一个急转弯，小念整个人一下子歪向车门，手里的水杯也差点洒了。',
  dialogue: [
    {
      nian: '爸爸，车一拐弯，是不是有一股力把我往外甩？',
      dad: '其实没有谁往外推你。车往左拐的时候，你的身子还想照原来的方向直直往前走，这是惯性；可车已经拐过去了，看起来就像你被甩向了右边的车门。真正在用力的是车门和座椅：它们推着你，让你跟着车一起拐弯。',
    },
    {
      nian: '车门推着我拐弯？那拐弯为什么非得有力推着才行？',
      dad: '因为拐弯就是在改变运动的方向，改变运动就要力。不管是汽车、旋转木马还是用绳子甩的小球，要它一直绕圈，就得有一个一直指向圆心的力拉着它，这个力叫向心力。甩小球时是绳子在拉；你在车里，是车门和座椅在推。',
      figure: { kind: 'sim', sim: 'whirl', caption: '拖动「每秒转几圈」，看绳子要拉多大的力；再选「剪断绳子」，看球往哪儿飞。' },
    },
    {
      nian: '要是甩着甩着，绳子突然断了，小球会往外飞吗？',
      dad: '它会沿着断开那一刻的方向直直飞出去，也就是圆圈在那一点的切线方向，并不会顺着绳子往外飞。绳子一断，再也没有谁拉它，它只剩下惯性，照断开时的样子直着走。转动的雨伞边上甩出去的水珠，也是这样沿着切线飞走的。',
    },
    {
      nian: '沿着切线飞出去……那向心力要多大，才能拉住它转圈？',
      dad: '看三样：东西越重、转得越快、圈越大，要的向心力就越大。其中转得快最厉害，转速翻一倍，要的力就变成 4 倍。比如 0.1 千克的小球，绳长 0.5 米，每秒转一圈，绳子要拉大约 2 牛；每秒转两圈，就要拉将近 8 牛。',
      eq: 'F = m ω² r',
      show: { kind: 'lab', step: 4, label: '看「角速度关系」' },
    },
    {
      nian: '转速翻一倍，力就变成 4 倍？那汽车拐弯开快了会怎样？',
      dad: '很危险！汽车拐弯，向心力靠的是轮胎和地面之间的摩擦。开得越快，要的向心力就越大，可摩擦能给的力有个上限；一旦超过，轮胎就抓不住地，车会侧滑冲出弯道。所以弯道前常有限速牌；下雨天路滑，摩擦更小，还要开得更慢。',
      show: { kind: 'lab', step: 5, label: '看「三条合成一条式子」' },
    },
    {
      nian: '弯道要限速，是怕摩擦不够？那坐车的时候我该怎么做？',
      dad: '对。坐车一定要系好安全带，拐弯时它和座椅一起拉住你，你就不会撞到车门上。手里别拿热水和尖的东西，拐弯时容易洒、容易戳到人。下次车拐弯，你可以想一想：不是有力把我往外甩，是我的身子还想直着走。',
    },
    {
      nian: '我懂了！拐弯时我的身子靠惯性还想直着走，是车门和座椅推着我拐弯，没有力把我往外甩。绕圈要有指向圆心的向心力，转得越快要的力越大，所以拐弯要慢，还要系好安全带。',
      dad: '完全正确！想看看向心力到底怎样跟质量、半径、转速有关，就去「3D 实验台」摇一摇那台向心力演示器，标尺上露出的格数会告诉你答案。',
    },
  ],
  tip: '高中会学到“离心力”这个词：它是坐在转动的东西上描述运动时才用的“假想的力”；站在路边看，人只是靠惯性想直着走，是车门和座椅给了他向心力。互动图里小球的质量、绳长是为了好算取的数。雨天骑自行车拐弯也要提前减速，道理一样。',
  sources: [
    { title: '物理 必修 第二册 · 第六章 圆周运动 · 第2节 向心力', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Centrifugal force（离心力：在转动参考系里才出现的惯性力）', by: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/science/centrifugal-force' },
    { title: 'Newton’s Laws of Motion（牛顿运动定律）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '急转弯', duration: 12,
        cues: [
          { kind: 'arrow', path: CURVE, color: '#d8cbb3', draw: 1, from: 0 },
          { kind: 'atom', path: CURVE, symbol: '车', color: '#ffd166', r: 40, travel: 4.5, from: 1 },
          { kind: 'arrow', path: [[460, 720], [1000, 720]], color: '#3a6fb0', text: '身子想直着走', from: 3 },
          { kind: 'arrow', path: [[800, 560], [660, 470]], color: '#e0762b', text: '车门推着拐弯', from: 5 },
          { kind: 'text', at: [600, 840], text: '不是被甩，是想直着走', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '向心力', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [440, 440], color: '#fffdf8', outline: true, from: 0 },
          { kind: 'atom', path: [[600, 440]], symbol: '', color: '#5d4e37', r: 12, from: 0.2 },
          { kind: 'flow', path: circle(600, 440, 220), color: '#ff9f43', count: 1, speed: 345, size: 26, loop: true, from: 0.6 },
          { kind: 'arrow', path: [[600, 220], [600, 320]], color: '#e0762b', from: 2.4 },
          { kind: 'arrow', path: [[820, 440], [720, 440]], color: '#e0762b', from: 3 },
          { kind: 'arrow', path: [[600, 660], [600, 560]], color: '#e0762b', from: 3.6 },
          { kind: 'arrow', path: [[380, 440], [480, 440]], color: '#e0762b', from: 4.2 },
          { kind: 'text', at: [600, 810], text: '一直指向圆心', from: 6 },
        ],
      },
      {
        turn: 2, title: '绳子断了', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [400, 400], color: '#fffdf8', outline: true, from: 0 },
          { kind: 'atom', path: [[600, 420]], symbol: '', color: '#5d4e37', r: 12, from: 0.2 },
          { kind: 'flow', path: circle(600, 420, 200), color: '#ff9f43', count: 1, speed: 314, size: 24, loop: true, from: 0, to: 4 },
          { kind: 'atom', path: [[600, 220], [1150, 220]], symbol: '', color: '#ff9f43', r: 24, travel: 2.2, from: 4 },
          { kind: 'arrow', path: [[600, 205], [600, 150]], color: '#c9bca6', text: '✗ 不是往外', from: 5 },
          { kind: 'myth', wrong: '有离心力把它往外甩', right: '没人拉了，它就直着走', from: 7 },
        ],
      },
      {
        turn: 3, title: '转快一倍', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 210], text: 'F = m ω² r', from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [330, 440], size: [220, 220], color: '#fffdf8', outline: true, from: 1 },
          { kind: 'flow', path: circle(330, 440, 110), color: '#ff9f43', count: 1, speed: 691, size: 18, loop: true, from: 1.2 },
          { kind: 'count', at: [330, 680], label: '每秒转 1 圈', start: 0, end: 2, unit: '牛', over: 1, from: 2 },
          { kind: 'shape', shape: 'circle', at: [870, 440], size: [220, 220], color: '#fffdf8', outline: true, from: 3.4 },
          { kind: 'flow', path: circle(870, 440, 110), color: '#ff9f43', count: 1, speed: 1382, size: 18, loop: true, from: 3.6 },
          { kind: 'count', at: [870, 680], label: '每秒转 2 圈', start: 0, end: 8, unit: '牛', over: 1.4, from: 4.4 },
          { kind: 'text', at: [600, 840], text: '转速翻倍，力变 4 倍', from: 7 },
        ],
      },
      {
        turn: 4, title: '弯道要慢', duration: 11,
        cues: [
          { kind: 'arrow', path: CURVE, color: '#d8cbb3', draw: 1, from: 0 },
          { kind: 'atom', path: CURVE, symbol: '慢', color: '#9cc7e8', r: 40, travel: 3.5, from: 0.6 },
          { kind: 'atom', path: [[160, 720], [420, 720], [640, 690], [900, 640], [1120, 600]], symbol: '快', color: '#ffb36b', r: 40, travel: 1.6, from: 4.6 },
          { kind: 'label', at: [900, 640], pos: [1000, 460], text: '摩擦抓不住', from: 6 },
          { kind: 'text', at: [600, 840], text: '弯道前要减速', from: 7 },
        ],
      },
      {
        turn: 5, title: '系好安全带', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🚗', path: [[600, 440]], size: 240, from: 0.3 },
          { kind: 'pulse', at: [600, 440], color: '#2c774a', radius: 200, from: 1 },
          { kind: 'label', at: [620, 420], pos: [930, 260], text: '系好安全带', from: 1.6 },
          { kind: 'text', at: [600, 780], text: '拐弯时身子还想直着走', from: 4.5 },
        ],
      },
    ],
  },
};
