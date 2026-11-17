import type { Story } from './types';

export const rainbow: Story = {
  slug: 'rainbow',
  title: '雨后的彩虹，七种颜色是从哪里来的？',
  trigger: '一场阵雨刚停，太阳从小念背后照过来，对面天上挂起一道弯弯的彩虹，红橙黄绿蓝靛紫，一层挨着一层。',
  dialogue: [
    {
      nian: '爸爸，阳光明明是白的，彩虹里这么多颜色是从哪儿来的？',
      dad: '颜色本来就藏在阳光里。白光其实是红、橙、黄、绿、蓝、靛、紫各种颜色的光混在一起的。三百多年前，牛顿让一束阳光穿过三棱镜，白光就被拉开成一条彩带，这叫光的色散。',
    },
    {
      nian: '穿过三棱镜就被拉开成彩带？为什么会被拉开？',
      dad: '因为不同颜色的光，进出玻璃时拐弯拐得不一样多：紫光拐得最多，红光拐得最少。本来挤在一起的颜色，一拐弯就分了家，排成一条彩带。要是只让红光射进去，出来还是红光，三棱镜并不会“造”出新颜色。',
      figure: { kind: 'sim', sim: 'prism', caption: '换一换射进去的光和角度：哪种颜色拐得多？三棱镜会不会“造”颜色？' },
    },
    {
      nian: '红光拐得最少……那天上又没有三棱镜，彩虹是谁分出来的？',
      dad: '是空中千千万万颗小水滴。阳光射进一颗水滴时拐一次弯，在水滴背面反射一下，出来时再拐一次弯，颜色就被分开了。英国气象局的科普也是这样讲的。很多人以为是水滴给阳光染上了颜色，其实颜色本来就藏在白光里，水滴只是把它们分开。',
    },
    {
      nian: '颜色本来就藏在白光里……那为什么有时候下雨，也看不见彩虹？',
      dad: '看彩虹得满足条件：太阳要在你背后，雨滴要在你前面。从水滴里出来的彩色光，和太阳照来的方向大约偏开 42°。澳大利亚气象局说，太阳高过 42° 时，彩虹就落到地平线下面去了，所以夏天中午很难看见，早上和傍晚的阵雨过后最容易遇到。',
    },
    {
      nian: '太阳高过 42° 就看不见……那彩虹为什么总是弯弯的一道？',
      dad: '因为能把彩色光送进你眼睛的水滴，都在离你影子头顶那一点 42° 远的一圈上，排起来正好是一个圆。平常地面挡住了下半圈，我们只看见一段弧；从飞机上或高山顶上，有时能看到一整圈的彩虹。',
    },
    {
      nian: '我懂了！白光里本来就藏着各种颜色，紫光拐得多、红光拐得少，水滴把它们分开，就成了彩虹。看彩虹要背对太阳，太阳低的时候最容易看见。',
      dad: '说得好！晴天的早上或傍晚，背对太阳，用喷壶往前面喷出一片细细的水雾，你自己就能造出一道小彩虹。',
    },
  ],
  tip: '彩虹的颜色其实是连续变化的，并没有清清楚楚的七条，“七种颜色”是牛顿的分法。互动图把红光和紫光拐弯的差别放大了，真实的玻璃里没差那么多。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第5节 光的色散', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Rainbows: optical wonders（折射、反射、背对太阳、整圈彩虹）', by: 'Met Office（英国气象局）', url: 'https://weather.metoffice.gov.uk/learn-about/weather/optical-effects/rainbows' },
    { title: 'Ask BOM: how do rainbows form?（42°、太阳要低于 42°）', by: 'Bureau of Meteorology（澳大利亚气象局）', url: 'https://media.bom.gov.au/social/blog/899/ask-bom-how-do-rainbows-form' },
    { title: 'I can make a rainbow（牛顿与三棱镜、七种颜色、自己造彩虹）', by: 'Met Office for Schools', url: 'https://weather.metoffice.gov.uk/learn-about/met-office-for-schools/other-content/make-a-rainbow-diy-activity' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '藏在白光里', duration: 12,
        cues: [
          { kind: 'bond', a: [600, 300], b: [480, 520], color: '#7fa7c9', from: 0 },
          { kind: 'bond', a: [480, 520], b: [720, 520], color: '#7fa7c9', from: 0 },
          { kind: 'bond', a: [720, 520], b: [600, 300], color: '#7fa7c9', from: 0 },
          { kind: 'ray', path: [[120, 470], [540, 420]], color: '#c9bfae', draw: 1, from: 0.6 },
          { kind: 'ray', path: [[540, 420], [660, 430], [1100, 500]], color: '#e03131', draw: 1, from: 2 },
          { kind: 'ray', path: [[540, 420], [660, 430], [1100, 580]], color: '#2f9e44', draw: 1, from: 2.3 },
          { kind: 'ray', path: [[540, 420], [660, 430], [1100, 660]], color: '#9c36b5', draw: 1, from: 2.6 },
          { kind: 'text', at: [600, 830], text: '白光被拉开成彩带', from: 7 },
        ],
      },
      {
        turn: 1, title: '紫光拐得多', duration: 12,
        cues: [
          { kind: 'bond', a: [600, 300], b: [480, 520], color: '#7fa7c9', from: 0 },
          { kind: 'bond', a: [480, 520], b: [720, 520], color: '#7fa7c9', from: 0 },
          { kind: 'bond', a: [720, 520], b: [600, 300], color: '#7fa7c9', from: 0 },
          { kind: 'ray', path: [[120, 470], [540, 420]], color: '#c9bfae', draw: 1, from: 0.4 },
          { kind: 'ray', path: [[540, 420], [660, 430], [1100, 500]], color: '#e03131', draw: 1, from: 1.4 },
          { kind: 'ray', path: [[540, 420], [660, 430], [1100, 660]], color: '#9c36b5', draw: 1, from: 1.4 },
          { kind: 'label', at: [1000, 486], pos: [960, 330], text: '红光拐得少', from: 3 },
          { kind: 'label', at: [1000, 630], pos: [960, 760], text: '紫光拐得多', from: 4.4 },
        ],
      },
      {
        turn: 2, title: '水滴分颜色', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 450], size: [320, 320], color: '#dff1fb', from: 0 },
          { kind: 'ray', path: [[90, 360], [470, 360]], color: '#c9bfae', draw: 1, from: 0.6 },
          { kind: 'ray', path: [[470, 360], [740, 520], [520, 590], [200, 700]], color: '#e03131', draw: 1.6, from: 1.6 },
          { kind: 'ray', path: [[470, 360], [748, 496], [536, 602], [250, 704]], color: '#9c36b5', draw: 1.6, from: 1.9 },
          { kind: 'myth', wrong: '水滴给阳光染了色', right: '颜色本来藏在白光里', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '要背对太阳', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[160, 220]], size: 110, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[520, 600]], size: 160, from: 0 },
          { kind: 'sprite', icon: '🌧️', path: [[980, 280]], size: 150, from: 0.6 },
          { kind: 'sprite', icon: '🌈', path: [[980, 470]], size: 200, from: 2.6 },
          { kind: 'count', at: [280, 440], label: '太阳要低于', start: 0, end: 42, unit: '°', from: 5, over: 1.5 },
          { kind: 'text', at: [600, 830], text: '早上、傍晚最容易', from: 8 },
        ],
      },
      {
        turn: 4, title: '其实是个圆', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 560], size: [600, 600], color: '#fdf0f5', outline: true, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 770], size: [1200, 300], color: '#b9c79a', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[600, 600]], size: 110, from: 0 },
          { kind: 'sprite', icon: '✈️', path: [[960, 210]], size: 110, from: 4.4 },
          { kind: 'label', at: [880, 380], pos: [1000, 320], text: '高处能看整圈', from: 5 },
          { kind: 'text', at: [600, 830], text: '地面挡住了下半圈', from: 6.5 },
        ],
      },
    ],
  },
};
