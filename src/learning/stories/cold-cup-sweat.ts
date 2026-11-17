import type { Story } from './types';

export const coldCupSweat: Story = {
  slug: 'cold-cup-sweat',
  title: '冰饮料杯子外面，为什么会“出汗”？',
  trigger: '夏天，小念从冰箱里拿出一罐冰可乐倒进玻璃杯，没过一会儿，杯子外面就挂满了小水珠，桌上还湿了一圈。',
  dialogue: [
    {
      nian: '爸爸，杯子外面的水，是从杯子里渗出来的吗？',
      dad: '不是，玻璃杯没有缝，水渗不出来。要是从里面渗出来，水珠应该有可乐的颜色和甜味，可它们清清的、没有味道。它们是从空气里来的：空气里藏着很多看不见的水汽，碰到冰凉的杯子，被冷成了小水珠，这叫液化。',
    },
    {
      nian: '空气里藏着水汽？为什么一碰到冰杯子就变成水珠了？',
      dad: '空气能装下的水汽有个限度，越冷装得越少。贴着冰杯子的那层空气被冷下来，装不下原来那么多水汽，多出来的就液化成小水珠，挂在杯子外面。空气冷到正好装满水汽的那个温度，叫露点；杯子比露点还冷，就会“出汗”。',
      figure: { kind: 'sim', sim: 'dew', caption: '拖动杯子的温度，再换一换天气的干湿：杯子比露点冷的时候，才会“出汗”。' },
    },
    {
      nian: '杯子比露点冷就出汗？那露点是多少度呢？',
      dad: '要看空气有多湿。比如 30 ℃ 的天，空气湿度 60% 时，露点大约 21 ℃；湿度 85% 的闷热天，露点能到 27 ℃ 左右。所以一杯冰饮料几乎总会出汗，而一杯 30 ℃ 的温水，杯子外面就是干的。很多人以为水是杯子里渗出来的，其实它们来自空气。',
    },
    {
      nian: '闷热天的露点更高？那是不是天越闷，杯子出汗越多？',
      dad: '对！空气越湿，露点越高，杯子比露点冷得越多，出的汗就越多，桌上能积出一摊水。反过来，北方冬天屋里开着暖气，空气很干，露点很低，冰饮料杯子上的水珠就少多了。',
    },
    {
      nian: '水珠是冷出来的？那早上草叶上的露水，也是这样来的吗？',
      dad: '正是！夜里草叶把热散掉，变得比空气还凉，冷到露点以下，空气里的水汽就在叶子上液化成露珠，“露点”这个名字就是从露水来的。要是叶子冷到 0 ℃ 以下，水汽会直接变成一层白白的霜。',
    },
    {
      nian: '我懂了！杯子外面的水珠不是渗出来的，是空气里看不见的水汽碰到比露点还冷的杯子，液化成了小水珠。空气越湿、杯子越冰，出的汗就越多。',
      dad: '完全正确！拿两个杯子，一个倒冰水，一个倒温水，把杯子外面擦干，过五分钟看看哪个杯子“出汗”；再给冰水杯包一层纸巾，摸摸纸巾湿了没有。',
    },
  ],
  tip: '露点的数是按气象上常用的 Magnus 公式估算的，只是大约的值。“露点”的说法来自美国国家气象局（NWS）的术语表：空气冷到这个温度，水汽正好饱和，再冷就会凝结出水来。',
  sources: [
    { title: '物理 八年级上册 · 第三章 物态变化 · 第3节 汽化和液化', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'National Weather Service Glossary（Dew / Dew Point）', by: 'U.S. National Weather Service', url: 'https://www.weather.gov/ggw/GlossaryD' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '水从哪儿来', duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [240, 340], liquid: '#c98a4b', level: 0.75, label: '冰可乐', from: 0 },
          { kind: 'particles', box: [452, 420, 36, 260], count: 7, color: '#3a7bb5', motion: 'jitter', from: 2.4 },
          { kind: 'particles', box: [712, 420, 36, 260], count: 7, color: '#3a7bb5', motion: 'jitter', from: 2.4 },
          { kind: 'label', at: [720, 420], pos: [930, 300], text: '不是渗出来的', from: 3.6 },
          { kind: 'text', at: [600, 820], text: '水来自空气', from: 7 },
        ],
      },
      {
        turn: 1, title: '空气装不下了', duration: 12,
        cues: [
          { kind: 'particles', box: [120, 180, 960, 300], count: 30, color: '#3a7bb5', motion: 'gas', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [200, 260], color: '#cfe5f7', text: '冰杯子', from: 0.5 },
          { kind: 'flow', path: [[250, 420], [490, 580]], color: '#3a7bb5', count: 6, speed: 120, from: 3 },
          { kind: 'flow', path: [[950, 420], [710, 580]], color: '#3a7bb5', count: 6, speed: 120, from: 3 },
          { kind: 'label', at: [700, 600], pos: [960, 680], text: '冷到露点以下', from: 5 },
          { kind: 'text', at: [600, 830], text: '多出来的水汽变成水珠', from: 8 },
        ],
      },
      {
        turn: 2, title: '露点大约 21 ℃', duration: 12,
        cues: [
          { kind: 'text', at: [600, 200], text: '30 ℃、湿度 60%', from: 0.4 },
          { kind: 'count', at: [360, 420], label: '露点', start: 0, end: 21, unit: '℃', from: 1.2 },
          { kind: 'count', at: [840, 420], label: '闷热天露点', start: 0, end: 27, unit: '℃', from: 3 },
          { kind: 'myth', wrong: '水是从杯子里渗出来的', right: '水是空气里的水汽变的', from: 6.6 },
        ],
      },
      {
        turn: 3, title: '越闷越出汗', duration: 11,
        cues: [
          { kind: 'meter', at: [600, 280], label: '空气湿度', start: 0.3, end: 0.85, color: '#3a7bb5', from: 0.6, over: 3 },
          { kind: 'meter', at: [600, 420], label: '杯子出汗', start: 0.2, end: 0.9, color: '#5b9bd5', from: 0.6, over: 3 },
          { kind: 'shape', shape: 'pill', at: [600, 600], size: [420, 80], color: '#cfe5f7', text: '桌上一摊水', from: 4.4 },
          { kind: 'text', at: [600, 800], text: '空气越湿，露点越高', from: 6.4 },
        ],
      },
      {
        turn: 4, title: '早上的露水', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌿', path: [[600, 520]], size: 280, from: 0 },
          { kind: 'particles', box: [440, 370, 320, 220], count: 12, color: '#3a7bb5', motion: 'jitter', from: 2 },
          { kind: 'label', at: [690, 440], pos: [930, 300], text: '露珠', from: 3 },
          { kind: 'text', at: [600, 820], text: '叶子冷到露点以下', from: 6.5 },
        ],
      },
    ],
  },
};
