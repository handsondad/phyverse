import type { Story } from './types';

export const busBrake: Story = {
  slug: 'bus-brake',
  title: '公交车一刹车，我为什么会往前冲？',
  trigger: '早上坐公交车去上学，司机一脚急刹，站着的小念差点扑到前面叔叔的背上。',
  dialogue: [
    {
      nian: '爸爸，司机一刹车，我差点扑到前面叔叔身上！是不是有一股力把我往前推？',
      dad: '没有谁推你哦。车本来带着你一起往前跑，一刹车，车停了，你的脚被车厢地板拉着一起停下，可你的上身还想照原来的样子往前跑，就扑出去了。东西总想保持原来的样子，这就叫惯性。',
      figure: { kind: 'sim', sim: 'inertia', caption: '把「刹车有多猛」往大拖：车停得越急，人往前扑得越厉害；再换成「抓紧扶手」看看。' },
    },
    {
      nian: '惯性是一种力吗？是不是车开得越快，惯性就越大？',
      dad: '很多人这么以为，其实惯性不是力，是东西自己的“脾气”：没人去推它、拉它，它就照原样待着。惯性的大小只看东西有多重，和跑得快慢没关系。开得快的车难停，是因为要减掉的速度多，不是惯性变大了。',
    },
    {
      nian: '照原样待着？那车子猛一起步，我往后仰，也是因为这个吗？',
      dad: '对，正好反过来。车停着时你也停着；车猛地往前一开，地板拉着你的脚往前走，上身还想停在原地，看起来就像往后仰。不管刹车还是起步，都是脚先被车带着变了，上身慢了半拍。',
      show: { kind: 'steps', frames: [{ icon: '🚌', label: '车猛地起步' }, { icon: '🦶', label: '脚被带着走' }, { icon: '🧍', label: '上身慢半拍' }] },
    },
    {
      nian: '上身慢半拍，那我抓紧扶手，就不会扑出去了吗？',
      dad: '对！抓紧扶手，扶手就通过你的胳膊把上身也一起拉住，上身和脚一起慢下来，只晃一下。坐小汽车系安全带也是这个道理：安全带把人和座椅绑在一起，急刹时由它拉住你，你就不会撞到前面去。',
    },
    {
      nian: '安全带拉住大人，是不是比拉住我更费劲？',
      dad: '没错，越重的东西惯性越大，越难让它停下来，也越难让它动起来。装满货的大卡车，要停下来得滑出比小汽车长得多的路。所以司机要和前车留出距离，我们过马路也千万别从车前面突然冲出去。',
    },
    {
      nian: '我懂了！东西都想保持原来的样子，这就是惯性，越重惯性越大。车一刹，脚停了、上身还想往前，我就往前冲，根本没有力在推我。抓紧扶手、系好安全带，上身就能跟着一起停下来。',
      dad: '说得真好！回家可以试试：杯口放一张硬卡片，卡片上放一枚硬币，用手指把卡片横着猛地弹走——卡片飞了，硬币却掉进杯子里。硬币也想保持原来的样子呢。',
    },
  ],
  tip: '“惯性只看质量、不看速度”是教材的说法：开得快的车难停，是因为要减掉的速度多，不是惯性变大了。坐公交车请扶好扶手，坐小汽车系好安全带，小朋友要坐安全座椅。“卡片弹硬币”的小实验请用塑料杯，别用玻璃杯，免得碰碎。',
  sources: [
    { title: '物理 八年级下册 · 第八章 运动和力 · 第1节 牛顿第一定律（惯性）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Newton’s Laws of Motion（牛顿运动定律）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '急刹车', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 650], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [300, 510], size: [440, 210], color: '#ffd166', slide: { to: [640, 510], at: 0.4, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [190, 625], size: [64, 64], color: '#4a4036', slide: { to: [530, 625], at: 0.4, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [410, 625], size: [64, 64], color: '#4a4036', slide: { to: [750, 625], at: 0.4, over: 3 }, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[300, 470], [760, 470]], size: 130, travel: 3.6, from: 0.4 },
          { kind: 'arrow', path: [[760, 580], [640, 580]], color: '#e0762b', text: '脚被拉停', from: 3.4 },
          { kind: 'arrow', path: [[800, 410], [940, 410]], color: '#3a6fb0', text: '上身还想往前', from: 4.4 },
          { kind: 'myth', wrong: '有一股力把我往前推', right: '上身还想照原样往前跑', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '惯性不是力', duration: 10,
        cues: [
          { kind: 'shape', shape: 'pill', at: [230, 330], size: [220, 90], color: '#9cc7e8', text: '慢慢开', slide: { to: [520, 330], at: 0.4, over: 4.5 }, from: 0 },
          { kind: 'shape', shape: 'pill', at: [230, 560], size: [220, 90], color: '#ffb36b', text: '飞快开', slide: { to: [520, 560], at: 0.4, over: 1.2 }, from: 0 },
          { kind: 'meter', at: [900, 300], label: '慢车的惯性', start: 0, end: 0.6, from: 2 },
          { kind: 'meter', at: [900, 530], label: '快车的惯性', start: 0, end: 0.6, from: 2.6 },
          { kind: 'text', at: [600, 790], text: '惯性只看多重，不看多快', from: 5 },
        ],
      },
      {
        turn: 2, title: '猛一起步', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 650], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [380, 510], size: [440, 210], color: '#ffd166', slide: { to: [760, 510], at: 0.6, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [270, 625], size: [64, 64], color: '#4a4036', slide: { to: [650, 625], at: 0.6, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [490, 625], size: [64, 64], color: '#4a4036', slide: { to: [870, 625], at: 0.6, over: 3 }, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[380, 470], [660, 470]], size: 130, travel: 3.8, from: 0.6 },
          { kind: 'arrow', path: [[700, 580], [840, 580]], color: '#e0762b', text: '地板拉脚往前', from: 1.6 },
          { kind: 'label', at: [650, 410], pos: [380, 300], text: '上身慢半拍', from: 3.6 },
          { kind: 'text', at: [600, 790], text: '起步往后仰，刹车往前冲', from: 5 },
        ],
      },
      {
        turn: 3, title: '抓紧扶手', duration: 11,
        cues: [
          { kind: 'bond', a: [260, 290], b: [940, 290], color: '#b08850', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[600, 500]], size: 240, from: 0.3 },
          { kind: 'arrow', path: [[660, 390], [800, 390]], color: '#3a6fb0', text: '上身想往前', from: 1 },
          { kind: 'arrow', path: [[800, 480], [660, 480]], color: '#e0762b', text: '扶手往回拉', from: 2.4 },
          { kind: 'meter', at: [330, 760], label: '不扶：往前扑', start: 0, end: 0.9, from: 4 },
          { kind: 'meter', at: [870, 760], label: '抓紧：晃一下', start: 0, end: 0.2, color: '#2c774a', from: 4.6 },
          { kind: 'text', at: [600, 850], text: '安全带也是这个道理', size: 's', from: 7 },
        ],
      },
      {
        turn: 4, title: '越重越难停', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [1200, 10], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [170, 385], size: [190, 100], color: '#9cc7e8', text: '小汽车', slide: { to: [480, 385], at: 1, over: 2 }, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [190, 590], size: [280, 130], color: '#ffb36b', text: '满载大卡车', slide: { to: [900, 590], at: 1, over: 4.5 }, from: 0.2 },
          { kind: 'label', at: [480, 330], pos: [700, 250], text: '很快停住', from: 3.2 },
          { kind: 'label', at: [1040, 590], pos: [1000, 760], text: '还在往前滑', from: 4 },
          { kind: 'text', at: [500, 790], text: '越重越难停下来', from: 6.5 },
        ],
      },
    ],
  },
};
