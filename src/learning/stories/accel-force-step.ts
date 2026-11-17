import type { Story } from './types';

export const accelForceStep: Story = {
  slug: 'accel-force-step',
  title: '同样一脚油门，空车一下就窜出去，装满货的卡车为什么慢吞吞？',
  trigger: '等红绿灯时，绿灯一亮，旁边的空货车“呼”地开走了，装满沙子的大卡车却慢悠悠地才起步。',
  dialogue: [
    {
      nian: '爸爸，那辆大卡车的发动机是不是没劲？怎么起步那么慢？',
      dad: '不一定是没劲，是它太重了。同样大的推力，推一辆空车和推一辆装满货的车，效果差得远：车越重，越难让它的速度变起来。这跟惯性是一回事，越重的东西越不愿意改变原来的样子。',
    },
    {
      nian: '推力一样，车越重就越慢？那推力决定的是车跑多快吗？',
      dad: '很多人这么以为，其实推力决定的不是“跑多快”，而是“提速有多快”：每过一秒，速度能加多少。这个提速的快慢叫加速度。推力大，加速度就大；车重，加速度就小。只要一直推，再重的车速度也会一点点涨上去，只是涨得慢。',
      figure: { kind: 'sim', sim: 'push', caption: '拖动「车上装的货」和「发动机的推力」：上面一排是同样推力下的空车，比比谁提速快。' },
    },
    {
      nian: '加速度跟推力、车重到底是什么关系？能算出来吗？',
      dad: '能！科学家用小车做过实验：车重不变，拉力翻一倍，加速度也翻一倍；拉力不变，车重翻一倍，加速度就只剩一半。合起来就是：加速度等于力除以质量，这就是牛顿第二定律。比如 2 万牛的推力推 10 吨的空车，每过一秒，速度就快每秒 2 米。',
      eq: 'a = F ÷ m = 20000 N ÷ 10000 kg = 2 m/s²',
      show: { kind: 'lab', step: 4, label: '看「a 与 F」' },
    },
    {
      nian: '车重翻一倍，加速度就只剩一半……那装了 10 吨货的卡车呢？',
      dad: '这辆车自己 10 吨，再装 10 吨货，一共 20 吨，是空车的 2 倍重。同样 2 万牛的推力，加速度只剩一半，每过一秒才快每秒 1 米。车太重就难控制，所以国家给货车定了限重：比如两根车轴的货车，连车带货超过 18 吨就算超限。',
      eq: 'a = 20000 N ÷ 20000 kg = 1 m/s²',
      show: { kind: 'lab', step: 5, label: '看「a 与 m」' },
    },
    {
      nian: '连车带货太重就难控制？刹车的时候也是这个规律吗？',
      dad: '对，刹车也是让速度变，只不过是变慢。刹车能给的力就那么大，车越重，减速就越慢，要滑出更长的路才能停住。所以大卡车要和前车留出更远的距离；我们过马路也要离大车远一点，大车司机常常看不见车旁边的小朋友。',
    },
    {
      nian: '要滑出更长的路……那科学家当年是怎么把加速度量出来的？',
      dad: '实验室里用一辆小车、一块长木板和几个槽码就能量：槽码通过细绳拉小车，拉力就知道了；小车后面拖一条纸带，打点计时器每 0.02 秒在上面打一个点，点和点越隔越远，就能算出加速度。木板还要垫高一点，把小车受到的摩擦抵消掉。',
      show: { kind: 'lab', step: 3, label: '看「求加速度」' },
    },
    {
      nian: '我明白了！推力决定的是提速快慢，也就是加速度。加速度等于力除以质量：力越大提速越快，车越重提速越慢。所以满载的卡车起步慢、刹车也慢，过马路要离它远一点。',
      dad: '完全正确！想自己量一量，就去「3D 实验台」做这个小车实验：挂上不同的槽码，换上不同重的小车，看纸带上的点是怎么变的。',
    },
  ],
  tip: '文中的“空车 10 吨、推力 2 万牛”是为了好算取的整数，互动图也一样，不是某一款车的参数；真实的车起步时还有摩擦和空气阻力。高中教材用“探究加速度与力、质量的关系”实验得出 a 与 F 成正比、与 m 成反比，再总结成牛顿第二定律，3D 实验台里可以一步步做。带孩子过马路时，提醒他离大货车远一点，别站在它的盲区里。',
  sources: [
    { title: '物理 必修 第一册 · 第四章 运动和力的关系 · 第2节 实验：探究加速度与力、质量的关系；第3节 牛顿第二定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Newton’s Laws of Motion（牛顿运动定律）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/' },
    { title: '超限运输车辆行驶公路管理规定（交通运输部令 2016 年第 62 号，货车车货总质量限值）', by: '交通运输部 · 中国政府网', url: 'https://www.gov.cn/gongbao/content/2016/content_5120703.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '同样的推力', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 680], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [190, 360], size: [210, 100], color: '#ffe7b0', text: '空车', slide: { to: [920, 360], at: 1.2, over: 3.5 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [210, 610], size: [260, 125], color: '#ffb36b', text: '满载', slide: { to: [470, 610], at: 1.2, over: 3.5 }, from: 0.2 },
          { kind: 'text', at: [600, 820], text: '越重，越难提速', from: 5.5 },
        ],
      },
      {
        turn: 1, title: '提速有多快', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 590], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [210, 520], size: [260, 125], color: '#ffb36b', text: '满载', slide: { to: [900, 520], at: 0.6, over: 8 }, from: 0 },
          { kind: 'meter', at: [600, 300], label: '速度一点点涨', start: 0, end: 0.75, over: 8, from: 0.6 },
          { kind: 'myth', wrong: '推力决定车跑多快', right: '推力决定提速有多快', from: 6 },
        ],
      },
      {
        turn: 2, title: '力 ÷ 质量', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 240], text: 'a = F ÷ m', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [330, 450], size: [290, 90], color: '#ffd166', text: '拉力翻倍', from: 1.6 },
          { kind: 'arrow', path: [[500, 450], [690, 450]], color: '#5d4e37', from: 2.2 },
          { kind: 'shape', shape: 'pill', at: [870, 450], size: [290, 90], color: '#ffb36b', text: '加速度翻倍', from: 2.8 },
          { kind: 'shape', shape: 'pill', at: [330, 620], size: [290, 90], color: '#ffd166', text: '质量翻倍', from: 4.6 },
          { kind: 'arrow', path: [[500, 620], [690, 620]], color: '#5d4e37', from: 5.2 },
          { kind: 'shape', shape: 'pill', at: [870, 620], size: [290, 90], color: '#9cc7e8', text: '加速度减半', from: 5.8 },
        ],
      },
      {
        turn: 3, title: '重一倍', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 680], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [180, 360], size: [200, 100], color: '#ffe7b0', text: '10 吨', slide: { to: [900, 360], at: 1, over: 4 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [200, 610], size: [240, 125], color: '#ffb36b', text: '20 吨', slide: { to: [560, 610], at: 1, over: 4 }, from: 0.2 },
          { kind: 'text', at: [600, 820], text: '重一倍，加速度减半', from: 5.6 },
        ],
      },
      {
        turn: 4, title: '刹车也一样', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 680], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [170, 385], size: [190, 100], color: '#9cc7e8', text: '小汽车', slide: { to: [480, 385], at: 1, over: 2 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [190, 610], size: [280, 130], color: '#ffb36b', text: '满载大卡车', slide: { to: [900, 610], at: 1, over: 4.5 }, from: 0.2 },
          { kind: 'text', at: [600, 820], text: '过马路，离大车远一点', from: 6 },
        ],
      },
      {
        turn: 5, title: '纸带上的点', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [960, 18], color: '#b08850', from: 0 },
          { kind: 'shape', shape: 'rect', at: [230, 475], size: [130, 70], color: '#9cc7e8', text: '小车', slide: { to: [980, 475], at: 1, over: 4 }, from: 0.2 },
          { kind: 'atom', path: [[260, 660]], symbol: '', color: '#5d4e37', r: 10, from: 1.4 },
          { kind: 'atom', path: [[300, 660]], symbol: '', color: '#5d4e37', r: 10, from: 2 },
          { kind: 'atom', path: [[380, 660]], symbol: '', color: '#5d4e37', r: 10, from: 2.6 },
          { kind: 'atom', path: [[500, 660]], symbol: '', color: '#5d4e37', r: 10, from: 3.2 },
          { kind: 'atom', path: [[660, 660]], symbol: '', color: '#5d4e37', r: 10, from: 3.8 },
          { kind: 'text', at: [600, 810], text: '点越隔越远：在加速', from: 6 },
        ],
      },
    ],
  },
};
