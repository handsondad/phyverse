import type { Story } from './types';

const PROTON = '#e8590c';
const SUN = '#ffb703';
const GLOW = '#fff3bf';

export const sunShine: Story = {
  slug: 'sun-shine',
  title: '太阳为什么能一直发光发热？',
  trigger: '傍晚，小念看着太阳慢慢落下去，突然想到：太阳每天都这么亮、这么热，它到底烧掉了多少煤？',
  dialogue: [
    {
      nian: '爸爸，太阳是像煤一样在烧吗？会不会哪天就烧完了？',
      dad: '太阳可不是在烧煤。一百多年前就有科学家算过：就算太阳整个是煤做的，也早就烧光了，可地球上的岩石告诉我们，太阳已经亮了几十亿年。真正的答案藏在太阳中心：那里不停地发生核聚变，把氢原子核聚合成氦，放出巨大的能量。',
      figure: {
        kind: 'image',
        src: '/images/photos/sun-shine-sdo-prominence.webp',
        alt: '太阳动力学天文台在极紫外波段拍到的太阳局部：翻腾的橙红色表面边缘喷出扭曲的日珥气团',
        caption: '太阳动力学天文台拍到的太阳边缘：整颗太阳是一团翻腾的炙热等离子体，不是烧煤的火炉。',
        credit: 'NASA / GSFC / SDO · 公有领域',
        href: 'https://images.nasa.gov/details/PIA22661',
      },
    },
    {
      nian: '把氢原子核聚合成氦……原子核怎么能撞到一起？',
      dad: '这可不容易。氢原子核都带正电，两个靠近时会互相推开，跑得不够快根本撞不到。太阳中心的温度大约 1500 万摄氏度，原子核跑得飞快，才偶尔能冲到一起。美国航天局说，正是这么高的温度，让核聚变能一直进行下去。',
      figure: { kind: 'sim', sim: 'fusion', caption: '把温度从常温调到太阳中心：两个氢原子核什么时候才撞得到一起？' },
    },
    {
      nian: '让核聚变一直进行下去……太阳中心的光，要多久才能跑出来？',
      dad: '要很久很久。美国航天局估计，能量从太阳中心一路碰碰撞撞地往外挪，挪到靠近表面的地方，就要大约 17 万年。可一旦从表面射出来，只要大约 8 分钟就能到地球。你今天晒到的阳光，它的能量可能是十几万年前在太阳中心产生的。',
    },
    {
      nian: '十几万年前在太阳中心产生的……太阳会一直这样亮下去吗？',
      dad: '不会永远亮。美国航天局说，太阳大约在 46 亿年前形成，现在差不多走到了一辈子的一半，还能再亮大约 50 亿年。等中心的氢用得差不多了，它会膨胀成一颗红巨星，最后变成一颗小小的白矮星。不过，那是非常非常遥远的事。',
    },
    {
      nian: '非常非常遥远的事……那太阳放出来的能量，我们平时都用到了吗？',
      dad: '几乎处处都用到了。植物靠阳光长大，我们吃的粮食、蔬菜都来自它；煤和石油是很久以前的生物埋在地下变成的，里面存的也是太阳的能量；风和雨，也是太阳把空气和水晒热、晒干才有的。课本里说，地球上的大部分能量都来自太阳。',
    },
    {
      nian: '我懂了！太阳不是在烧煤，是在中心约 1500 万摄氏度的高温下，把氢原子核聚合成氦，放出巨大的能量。它已经亮了四十多亿年，还能再亮大约 50 亿年。地球上的光和热，大多是它送来的。',
      dad: '说得对！找一块晒着太阳的深色石头，再找一块背阴的石头，摸一摸哪块更热：你摸到的热，就是从太阳中心一路送来的能量。',
    },
  ],
  tip: '千万不要直接盯着太阳看，也不要用望远镜、放大镜对着太阳。互动图里只画了两个氢原子核撞到一起，真实的聚变要经过好几步才得到一个氦。',
  sources: [
    { title: '物理 九年级 · 第二十二章 能源与可持续发展 · 第2节 核能（太阳内部氢原子核在超高温下聚变）；第3节 太阳能（地球上的大部分能量来自太阳）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Our Sun: Facts（中心约 1500 万 ℃，氢聚变成氦；能量从中心到对流层顶约 17 万年；约 46 亿年前形成，还能亮约 50 亿年，之后成为红巨星、白矮星）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/sun/facts/' },
    { title: 'Physics for Future Presidents · Ch. 4 Nuclei and Radioactivity（太阳要是煤做的早就烧完了；太阳靠 4 个氢核聚变成氦发光，是地球上几乎所有生命的能量来源）', by: 'Richard A. Muller · 加州大学伯克利分校', url: 'https://muller.lbl.gov/teaching/Physics10/PffP_textbook/PffP-04-radioactivity-5-27.pdf' },
    { title: 'How Old Is the Sun?（太阳大约走到了一辈子的一半）', by: 'NASA Space Place（美国航天局）', url: 'https://spaceplace.nasa.gov/sun-age/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是在烧煤', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [460, 460], color: SUN, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [140, 140], color: GLOW, motion: 'pulse', from: 1.5 },
          { kind: 'label', at: [600, 450], pos: [960, 230], text: '太阳中心', from: 2 },
          { kind: 'pulse', at: [600, 450], color: '#f08c00', radius: 300, from: 3 },
          { kind: 'myth', wrong: '太阳像煤一样在燃烧', right: '中心在发生核聚变', from: 7 },
        ],
      },
      {
        turn: 1, title: '撞到一起才行', duration: 12,
        cues: [
          { kind: 'atom', path: [[200, 450], [540, 450]], symbol: '+', color: PROTON, r: 34, travel: 3, from: 0.5 },
          { kind: 'atom', path: [[1000, 450], [660, 450]], symbol: '+', color: PROTON, r: 34, travel: 3, from: 0.5 },
          { kind: 'pulse', at: [600, 450], color: '#f08c00', radius: 240, from: 4 },
          { kind: 'count', at: [600, 230], label: '中心温度约', start: 0, end: 1500, unit: '万 ℃', from: 1.5 },
          { kind: 'text', at: [600, 830], text: '跑得飞快才撞得到', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '光的漫长旅程', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 460], size: [440, 440], color: SUN, from: 0 },
          { kind: 'flow', path: [[380, 460], [450, 400], [400, 340], [480, 300], [440, 250], [530, 280]], color: GLOW, count: 3, speed: 60, from: 1 },
          { kind: 'count', at: [380, 760], label: '挪到表面约', start: 0, end: 17, unit: '万年', from: 2.5 },
          { kind: 'ray', path: [[600, 400], [1000, 400]], color: '#f59f00', draw: 1, from: 5 },
          { kind: 'count', at: [900, 280], label: '到地球约', start: 0, end: 8, unit: '分钟', from: 5.5 },
          { kind: 'sprite', icon: '🌍', path: [[1060, 400]], size: 90, from: 5 },
        ],
      },
      {
        turn: 3, title: '太阳的一辈子', duration: 12,
        cues: [
          { kind: 'bond', a: [150, 470], b: [1050, 470], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '☀️', path: [[150, 470], [580, 470]], size: 90, travel: 3, from: 0.5 },
          { kind: 'count', at: [360, 300], label: '已经亮了约', start: 0, end: 46, unit: '亿年', from: 1.5 },
          { kind: 'count', at: [840, 300], label: '还能亮约', start: 0, end: 50, unit: '亿年', from: 4 },
          { kind: 'label', at: [1050, 470], pos: [1000, 640], text: '红巨星、白矮星', from: 6 },
          { kind: 'text', at: [600, 830], text: '差不多走到了一半', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '处处是太阳能', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[600, 280]], size: 150, from: 0 },
          { kind: 'sprite', icon: '🌾', path: [[260, 560]], size: 120, from: 1.5 },
          { kind: 'sprite', icon: '🪨', path: [[600, 600]], size: 120, from: 2.5 },
          { kind: 'sprite', icon: '🌬️', path: [[940, 560]], size: 120, from: 3.5 },
          { kind: 'label', at: [600, 640], pos: [600, 740], text: '煤里也存着太阳能', from: 4 },
          { kind: 'text', at: [600, 830], text: '大部分能量来自太阳', from: 7.5 },
        ],
      },
    ],
  },
};
