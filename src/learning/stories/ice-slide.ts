import type { Story } from './types';

export const iceSlide: Story = {
  slug: 'ice-slide',
  title: '冰壶推一下能滑那么远，东西为什么会停下来？',
  trigger: '电视里在播冬奥会冰壶比赛，运动员轻轻一推，石头一样的冰壶在冰上滑了好远好远。',
  dialogue: [
    {
      nian: '爸爸，冰壶那么重，运动员只推了一下，它怎么能自己滑那么远？是不是推的力一直跟着它？',
      dad: '手一松开，推的力就没了，没有什么力一直跟着它往前推。冰壶能一直滑，靠的是惯性：东西跑起来以后，没人拦它，它就想一直跑下去。冰壶差不多 20 千克重，推出去以后要滑将近 30 米，才停到大本营里。',
    },
    {
      nian: '惯性让它一直跑，那地上的箱子一松手就停了，它没有惯性吗？',
      dad: '箱子也有惯性，是有东西在拦它：地面的摩擦。摩擦力总是往回拉，跟东西滑动的方向反着来，一点点把速度拉没。地毯毛茸茸的，摩擦大，箱子一下就停；冰面又滑又平，摩擦特别小，冰壶就能滑很远。',
      figure: { kind: 'sim', sim: 'slide', caption: '换「冰壶滑在」哪种地面上：地毯、木地板、冰面，摩擦越小滑得越远；再选「没有摩擦」看看会怎样。' },
    },
    {
      nian: '要是一点摩擦都没有，冰壶会滑多远？',
      dad: '那它会一直滑下去，速度永远不变。将近四百年前，伽利略让小球从斜坡滚下去、再冲上对面的斜坡，发现坡面越光滑，小球越能回到差不多一样的高度。他想：要是把对面的坡放平，又一点阻力都没有，小球就会永远滚下去。',
    },
    {
      nian: '一点阻力都没有，真的能永远滚下去？可我从来没见过不停的东西呀？',
      dad: '因为地球上到处都有摩擦和空气阻力，我们才从来没见过。后来牛顿把它总结成一条规律：东西不受力的时候，停着的就一直停着，动着的就一直沿直线、用同样的速度走下去。这就是牛顿第一定律。',
    },
    {
      nian: '牛顿第一定律是说，东西动起来不用一直推？那骑自行车不蹬，为什么会慢下来？',
      dad: '对，让东西一直动不需要力，要让它变快、变慢、拐弯才需要力。自行车不蹬会慢，是地面的摩擦和迎面的风在一路往回拉；你一直蹬，只是在补上被它们拉走的速度。很多人以为“不推就停”是力用完了，其实是被阻力拦下来的。',
    },
    {
      nian: '被阻力拦下来……那冰壶运动员拿刷子拼命刷冰，是在帮冰壶减少阻力吗？',
      dad: '猜对了！刷子来回刷，冰面会变得更光滑一点，冰壶受到的摩擦小了，就能多滑一段。反过来，想让东西停得快，就要加大摩擦：自行车的刹车皮紧紧夹住车轮，就是这个办法。',
    },
    {
      nian: '我明白了！东西动起来，不用一直推也会接着动，这是惯性。它会停下来，是摩擦在往回拉；摩擦越小滑得越远，一点阻力都没有就永远走下去，这就是牛顿第一定律。',
      dad: '完全正确！在家可以试试：用几本书搭一个斜坡，让同一辆玩具小车从同一个高度滑下来，分别滑到地毯、木地板和光滑的桌面上，比比哪次滑得最远。',
    },
  ],
  tip: '“推出去要滑将近 30 米”是按比赛场地算的：运动员最晚在前掷线放手，从那里到大本营圆心大约 28 米。互动图里几种地面的摩擦大小是示意值，滑行距离不是实测。教材用“阻力对物体运动的影响”实验和伽利略的斜面实验引出牛顿第一定律，可以对照着看。搭斜坡别太陡，小车别冲下桌子。',
  sources: [
    { title: '物理 八年级下册 · 第八章 运动和力 · 第1节 牛顿第一定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'The Rules of Curling（冰壶比赛规则：冰壶重量、场地尺寸）', by: 'World Curling', url: 'https://worldcurling.org/rules/' },
    { title: 'Newton’s Laws of Motion（牛顿运动定律）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '推一下就滑', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [1200, 130], color: '#e3f3fb', from: 0 },
          { kind: 'arrow', path: [[50, 520], [140, 520]], color: '#e0762b', text: '推一下', from: 0.3, to: 2 },
          { kind: 'sprite', icon: '🥌', path: [[190, 515], [1040, 515]], size: 90, travel: 7, from: 1.2 },
          { kind: 'label', at: [190, 490], pos: [330, 330], text: '冰壶约 20 千克', from: 0.6, to: 2.6 },
          { kind: 'count', at: [880, 300], label: '推出去要滑', start: 0, end: 30, unit: '米', over: 7, from: 1.2 },
          { kind: 'text', at: [600, 790], text: '手一松，推的力就没了', from: 3.4 },
        ],
      },
      {
        turn: 1, title: '摩擦往回拉', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [640, 290], size: [1040, 90], color: '#c98b73', text: '地毯', from: 0 },
          { kind: 'shape', shape: 'rect', at: [640, 470], size: [1040, 90], color: '#ddb683', text: '木地板', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [640, 650], size: [1040, 90], color: '#e3f3fb', text: '冰面', from: 0.8 },
          { kind: 'sprite', icon: '🥌', path: [[180, 290], [330, 290]], size: 70, travel: 1.2, from: 1.6 },
          { kind: 'sprite', icon: '🥌', path: [[180, 470], [520, 470]], size: 70, travel: 2.2, from: 1.6 },
          { kind: 'sprite', icon: '🥌', path: [[180, 650], [1100, 650]], size: 70, travel: 6, from: 1.6 },
          { kind: 'text', at: [600, 810], text: '摩擦越小，滑得越远', from: 6 },
        ],
      },
      {
        turn: 2, title: '伽利略的斜坡', duration: 13,
        cues: [
          { kind: 'bond', a: [160, 300], b: [460, 650], color: '#b08850', from: 0 },
          { kind: 'bond', a: [460, 650], b: [760, 300], color: '#b08850', from: 0.3, to: 6.2 },
          { kind: 'atom', path: [[180, 290], [460, 625], [740, 290]], symbol: '', color: '#ff9f43', r: 26, travel: 3.2, from: 0.8, to: 6.2 },
          { kind: 'label', at: [740, 290], pos: [960, 230], text: '回到差不多一样高', from: 3.6, to: 6.2 },
          { kind: 'bond', a: [460, 650], b: [1180, 650], color: '#b08850', from: 6.2 },
          { kind: 'atom', path: [[180, 290], [460, 625], [1180, 625]], symbol: '', color: '#ff9f43', r: 26, travel: 4.5, from: 6.6 },
          { kind: 'text', at: [700, 800], text: '放平了，就一直滚下去', from: 9.5 },
        ],
      },
      {
        turn: 3, title: '牛顿第一定律', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 380], size: [320, 130], color: '#9cc7e8', text: '一直停着', from: 0.4 },
          { kind: 'sprite', icon: '🥌', path: [[330, 580]], size: 90, from: 1 },
          { kind: 'shape', shape: 'rect', at: [870, 380], size: [320, 130], color: '#ffd166', text: '一直匀速直走', from: 2 },
          { kind: 'flow', path: [[640, 580], [1150, 580]], color: '#e0762b', count: 5, speed: 160, size: 14, from: 2.6 },
          { kind: 'text', at: [600, 790], text: '不受力，就保持原样', from: 4.5 },
        ],
      },
      {
        turn: 4, title: '不推就停？', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 500], size: [1200, 12], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'pill', at: [180, 440], size: [210, 90], color: '#9cc7e8', text: '自行车', slide: { to: [720, 440], at: 0.5, over: 5 }, from: 0 },
          { kind: 'arrow', path: [[700, 600], [570, 600]], color: '#e0762b', text: '地面摩擦', from: 3 },
          { kind: 'arrow', path: [[1000, 360], [870, 360]], color: '#3a6fb0', text: '迎面的风', from: 3.8 },
          { kind: 'myth', wrong: '不推就停，是力用完了', right: '是摩擦和风把它拦下来', from: 6 },
        ],
      },
      {
        turn: 5, title: '刷冰', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 570], size: [1200, 130], color: '#e3f3fb', from: 0 },
          { kind: 'sprite', icon: '🥌', path: [[150, 550], [1000, 550]], size: 80, travel: 7, from: 0.5 },
          { kind: 'sprite', icon: '🧹', path: [[270, 470], [1110, 470]], size: 80, travel: 7, wobble: true, from: 0.5 },
          { kind: 'meter', at: [600, 300], label: '冰面的摩擦', start: 0.6, end: 0.3, over: 3, from: 1.5 },
          { kind: 'text', at: [600, 790], text: '刷一刷，摩擦变小', from: 5 },
        ],
      },
    ],
  },
};
