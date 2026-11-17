import type { Story } from './types';

export const saltyEgg: Story = {
  slug: 'salty-egg',
  title: '鸡蛋放进盐水为什么会浮起来，人为什么能在死海里躺着漂？',
  trigger: '奶奶腌咸蛋前，先把一个生鸡蛋丢进盐水里试咸淡：鸡蛋慢慢浮了上来，奶奶说“这就够咸了”。',
  dialogue: [
    {
      nian: '爸爸，鸡蛋在清水里明明是沉的，为什么放进盐水就浮起来了？',
      dad: '因为盐水比清水“重”。同样满满一杯，盐水比清水更沉，这叫盐水的密度大。鸡蛋泡进去排开同样多的液体，排开的是更重的盐水，浮力就更大。盐放得够多，浮力超过鸡蛋的重量，鸡蛋就浮上来了。',
      figure: { kind: 'sim', sim: 'brine', caption: '一点点往水里加盐：看这杯盐水的密度什么时候超过鸡蛋，鸡蛋就浮上来了。' },
    },
    {
      nian: '盐水的密度大，浮力就更大？那鸡蛋的密度是多少呢？',
      dad: '新鲜鸡蛋比水稍微重一点，大多在每立方厘米 1.03 到 1.09 克之间，清水是 1 克，所以它在清水里会沉。每 100 毫升水里化进十来克盐，盐水的密度就能超过鸡蛋，这就是奶奶说的“够咸了”。',
      eq: '密度 = 质量 ÷ 体积',
    },
    {
      nian: '盐水的密度能超过鸡蛋？那海水那么咸，人在海里是不是也更容易浮起来？',
      dad: '是的。人身体的平均密度跟水差不多，吸足一口气会更轻一点，所以在泳池里只能勉强漂着。海水的密度约 1.03，比泳池的水大一点，就好浮一些。死海就厉害了：湖水里差不多三分之一都是盐，密度约 1.24，人一躺下，身体自己就浮起一大截。',
    },
    {
      nian: '死海里差不多三分之一都是盐？那里的水为什么会这么咸呢？',
      dad: '因为死海只进不出。约旦河的水流进去，却没有河从这里流出去，水只能在大太阳下蒸发掉，盐却留了下来。一年又一年，盐越积越多，湖水就越来越咸。这么咸的水，鱼都活不了，所以叫“死海”。',
    },
    {
      nian: '湖水这么咸，人在死海里是不是就不会被淹着了？',
      dad: '可不能这么想。浮得高不等于安全：人在死海里一翻身，脸朝下就很难再翻回来，又咸又苦的水呛进嘴里、溅进眼睛，非常危险。所以去死海要在有救生员的浴场，仰面慢慢躺下，不要扑腾，也别把脸埋进水里。',
    },
    {
      nian: '我明白了！东西受到的浮力，等于它排开的液体有多重。盐水比清水密度大，同样泡进去，浮力更大，盐放够了鸡蛋就浮起来；死海的水特别咸、密度特别大，人就能躺着漂。',
      dad: '完全正确！在家可以试：一杯清水里放一个生鸡蛋，一勺一勺加盐搅匀，数数加到第几勺鸡蛋浮起来。做完的盐水别倒进花盆里。',
    },
  ],
  tip: '鸡蛋放久了会慢慢变轻，放了很久的鸡蛋在清水里也可能浮起来，那样的蛋就别吃了。互动图的盐水密度按 20 ℃ 的食盐水估算，鸡蛋按 1.08。死海水里不只有食盐，还有很多镁盐、钙盐，所以能比饱和食盐水还重。去死海一定要听救生员的。',
  sources: [
    { title: '物理 八年级下册 · 第十章 浮力 · 第3节 物体的浮沉条件及应用', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Egg Float（鸡蛋密度多在 1.06–1.09，饱和食盐水约 1.2）', by: 'Flinn Scientific', url: 'https://www.flinnsci.ca/api/library/Download/d425a1fde31745bf8dbc020d433befa7' },
    { title: 'JetStream Max: “A Funny Bath” – The Dead Sea（死海只能靠蒸发失水，盐越积越多）', by: 'NOAA（美国国家海洋和大气管理局）', url: 'https://www.noaa.gov/jetstream/dead-max' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '清水沉，盐水浮', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [340, 520], size: [300, 340], liquid: '#cfe5f7', level: 0.8, label: '清水', from: 0 },
          { kind: 'shape', shape: 'circle', at: [340, 645], size: [100, 76], color: '#f7ecd9', from: 0.8 },
          { kind: 'vessel', vessel: 'beaker', at: [860, 520], size: [300, 340], liquid: '#e3eef7', level: 0.8, label: '盐水', from: 2.2 },
          { kind: 'shape', shape: 'circle', at: [860, 645], size: [100, 76], color: '#f7ecd9', slide: { to: [860, 410], at: 4.4, over: 2.4 }, from: 2.8 },
          { kind: 'arrow', path: [[960, 610], [960, 470]], color: '#3a6fb0', text: '浮力更大', from: 4 },
          { kind: 'text', at: [600, 830], text: '盐水更“重”，托得更有劲', from: 7.6 },
        ],
      },
      {
        turn: 1, title: '比一比密度', duration: 11,
        cues: [
          { kind: 'meter', at: [600, 280], label: '清水 1.00', start: 0, end: 0.4, color: '#9cc7e8', from: 0.4 },
          { kind: 'meter', at: [600, 420], label: '新鲜鸡蛋', start: 0, end: 0.6, color: '#e0b06b', from: 1.6 },
          { kind: 'meter', at: [600, 560], label: '加了盐的水', start: 0.4, end: 0.75, color: '#3a6fb0', from: 3.2, over: 3 },
          { kind: 'sprite', icon: '🥚', path: [[960, 560]], size: 110, from: 6.4 },
          { kind: 'text', at: [600, 760], text: '十来克盐，就够咸了', from: 7 },
        ],
      },
      {
        turn: 2, title: '泳池、大海、死海', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [230, 640], size: [300, 300], color: '#cfe5f7', text: '泳池', from: 0.3 },
          { kind: 'sprite', icon: '🏊', path: [[230, 500]], size: 110, from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [300, 300], color: '#8fbbe0', text: '海水 1.03', from: 2.4 },
          { kind: 'sprite', icon: '🏊', path: [[600, 485]], size: 110, from: 2.9 },
          { kind: 'shape', shape: 'rect', at: [970, 640], size: [300, 300], color: '#5f8fb8', text: '死海 1.24', from: 4.6 },
          { kind: 'sprite', icon: '🛀', path: [[970, 455]], size: 120, from: 5.2 },
          { kind: 'text', at: [600, 830], text: '越咸，浮起来越多', from: 7.4 },
        ],
      },
      {
        turn: 3, title: '只进不出', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [700, 260], color: '#7fb8e6', text: '死海', from: 0 },
          { kind: 'flow', path: [[140, 300], [240, 420], [300, 560]], color: '#4f93cf', count: 6, speed: 160, from: 0.8 },
          { kind: 'label', at: [200, 380], pos: [200, 230], text: '河水流进来', from: 1.4 },
          { kind: 'sprite', icon: '☀️', path: [[900, 240]], size: 130, from: 2.8 },
          { kind: 'particles', box: [400, 380, 400, 120], count: 10, color: '#d8ecf8', motion: 'rise', from: 3.4 },
          { kind: 'shape', shape: 'rect', at: [600, 790], size: [700, 40], color: '#f3efe6', text: '盐留下来', motion: 'grow', over: 3, from: 5.4 },
          { kind: 'text', at: [600, 860], text: '水蒸发走，盐越积越多', size: 's', from: 7.6 },
        ],
      },
      {
        turn: 4, title: '浮得高也要小心', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [1100, 360], color: '#5f8fb8', from: 0 },
          { kind: 'sprite', icon: '🛟', path: [[300, 300]], size: 120, from: 0.8 },
          { kind: 'sprite', icon: '🙆', path: [[620, 470]], size: 140, from: 1.6 },
          { kind: 'label', at: [620, 420], pos: [860, 300], text: '仰面慢慢躺', from: 2.6 },
          { kind: 'sprite', icon: '🙈', path: [[960, 600]], size: 110, from: 4.6 },
          { kind: 'label', at: [960, 560], pos: [960, 420], text: '别让水溅进眼睛', from: 5.2 },
          { kind: 'text', at: [600, 840], text: '有救生员的地方才下水', from: 7.2 },
        ],
      },
    ],
  },
};
