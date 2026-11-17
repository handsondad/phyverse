import type { Story } from './types';

export const blueSky: Story = {
  slug: 'blue-sky',
  title: '天空为什么是蓝的，夕阳为什么是红的？',
  trigger: '秋天的下午，天空蓝得透亮；到了傍晚，小念在楼顶看见太阳变成了一个大红球，西边的天也红彤彤的。',
  dialogue: [
    {
      nian: '爸爸，天空为什么是蓝的？是不是它映出了大海的颜色？',
      dad: '不是大海映上去的，离海很远的内陆城市，天也一样蓝。阳光看上去是白的，其实里面混着各种颜色的光。阳光穿过空气时，会撞上数不清的空气分子，被撞得向四面八方乱跑，这叫散射。蓝光最容易被散射，满天都是散开的蓝光，天空就是蓝的。',
    },
    {
      nian: '蓝光最容易被散射？为什么偏偏是蓝光？',
      dad: '光也是一种波，蓝光的波又短又密，红光的波又长又缓。美国宇航局给孩子的科普里说，空气里那些极小的分子，最容易把波短的蓝光撞散。红光不太容易被撞散，大多一路直直地走过去。',
      figure: { kind: 'sim', sim: 'scatter', caption: '换一换太阳的位置：阳光穿过多少空气？直射到眼前的蓝光、红光还剩多少？' },
    },
    {
      nian: '红光一路直直地走过去……那傍晚的太阳为什么变红了？',
      dad: '傍晚太阳快落山时，阳光是斜着照过来的，要穿过比中午厚得多的空气才到你眼前。一路上蓝光几乎都被散射掉了，剩下红光、橙光照到眼前，太阳和西边的天空就红彤彤的。很多人以为天空蓝是反射了大海，其实是空气把蓝光散射得最多。',
    },
    {
      nian: '空气把蓝光散射得最多……那为什么天边总比头顶白一些？',
      dad: '靠近地平线的天，光要穿过的空气更多，蓝光被散射了一次又一次，各种颜色又混到了一起，看上去就偏白。地面也会反射、散射阳光，把颜色混得更匀。所以头顶最蓝，越往天边越淡。',
    },
    {
      nian: '越往天边越淡……那别的星球上，天空也是蓝的吗？',
      dad: '那得看它的空气里有什么。火星的空气很稀薄，里面飘着许多细细的尘土。美国宇航局的科普里说，火星白天的天空是橙红色的，到了日落时分，太阳周围反而泛着蓝灰色，正好和地球反过来。',
    },
    {
      nian: '我明白了！阳光里有各种颜色，空气分子最容易把蓝光散开，满天都是蓝光，天就蓝了。傍晚阳光穿过的空气多，蓝光都散光了，剩下红光，夕阳就红了。',
      dad: '说得好！在一杯清水里滴几滴牛奶搅匀，用手电筒从侧面照，从旁边看水有点发蓝，从对面看手电筒的光就偏橙了。',
    },
  ],
  tip: '互动图里“穿过几倍的空气”是按太阳的高度估算的，蓝光、红光还剩多少只是示意。千万别直接盯着太阳看，快落山的太阳也不行。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第5节 光的色散（白光由各种色光组成）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Why Is the Sky Blue?（蓝光散射最多、红色夕阳、火星的天空）', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '散开的蓝光', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[180, 220]], size: 120, from: 0 },
          { kind: 'ray', path: [[240, 260], [1000, 640]], color: '#f5b800', draw: 1.5, from: 0.6 },
          { kind: 'particles', box: [300, 300, 600, 260], count: 18, color: '#9db8d6', motion: 'jitter', from: 1 },
          { kind: 'arrow', path: [[480, 380], [430, 260]], color: '#2f6fd6', draw: 0.5, from: 3 },
          { kind: 'arrow', path: [[700, 480], [820, 360]], color: '#2f6fd6', draw: 0.5, from: 3.6 },
          { kind: 'arrow', path: [[600, 440], [540, 580]], color: '#2f6fd6', draw: 0.5, from: 4.2 },
          { kind: 'text', at: [600, 830], text: '蓝光被撞得四散', from: 7 },
        ],
      },
      {
        turn: 1, title: '波短的蓝光', duration: 12,
        cues: [
          { kind: 'wave', a: [160, 360], b: [1060, 360], amplitude: 30, wavelength: 70, speed: 220, color: '#2f6fd6', from: 0.4 },
          { kind: 'label', at: [260, 360], pos: [260, 240], text: '蓝光：波短', from: 1 },
          { kind: 'wave', a: [160, 580], b: [1060, 580], amplitude: 30, wavelength: 210, speed: 220, color: '#e03131', from: 2 },
          { kind: 'label', at: [260, 580], pos: [260, 700], text: '红光：波长', from: 2.6 },
          { kind: 'text', at: [600, 830], text: '波短的最容易撞散', from: 7 },
        ],
      },
      {
        turn: 2, title: '夕阳为什么红', duration: 12,
        cues: [
          { kind: 'bond', a: [0, 660], b: [1200, 660], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'circle', at: [180, 610], size: [110, 110], color: '#ff7a2f', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[960, 600]], size: 120, from: 0 },
          { kind: 'ray', path: [[240, 610], [900, 610]], color: '#ff7a2f', draw: 1.4, from: 1 },
          { kind: 'arrow', path: [[420, 600], [380, 460]], color: '#2f6fd6', draw: 0.5, from: 2.6 },
          { kind: 'arrow', path: [[640, 600], [690, 460]], color: '#2f6fd6', draw: 0.5, from: 3.2 },
          { kind: 'myth', wrong: '天空蓝是反射了大海', right: '空气把蓝光散得最多', from: 7 },
        ],
      },
      {
        turn: 3, title: '天边偏白', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 310], size: [1100, 200], color: '#5ea8ef', text: '头顶最蓝', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1100, 200], color: '#d9ebfa', text: '天边偏白', from: 2 },
          { kind: 'bond', a: [50, 640], b: [1150, 640], color: '#8b7a5c', from: 0 },
          { kind: 'text', at: [600, 830], text: '穿过空气多，颜色就淡', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '火星正相反', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 460], size: [500, 380], color: '#7fb3e6', text: '地球白天', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 460], size: [500, 380], color: '#e0915a', text: '火星白天', from: 2 },
          { kind: 'shape', shape: 'circle', at: [870, 590], size: [60, 60], color: '#f3efe6', from: 5 },
          { kind: 'pulse', at: [870, 590], color: '#8fb3d9', radius: 70, from: 5.5 },
          { kind: 'text', at: [600, 830], text: '火星日落反而泛蓝', from: 6 },
        ],
      },
    ],
  },
};
