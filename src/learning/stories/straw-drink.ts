import type { Story } from './types';

export const strawDrink: Story = {
  slug: 'straw-drink',
  title: '用吸管喝饮料，是谁把饮料推上来的？',
  trigger: '小念用吸管喝果汁，一吸就上来；爸爸把吸管插进一瓶水，用橡皮泥把瓶口和吸管之间封得严严实实，小念憋红了脸也吸不上来。',
  dialogue: [
    {
      nian: '爸爸，平时一吸饮料就上来了，为什么这个瓶子怎么吸都吸不动？',
      dad: '因为平时把饮料推上来的，根本不是你的嘴，而是外面的空气。我们周围的空气有重量，从四面八方压着所有东西，这叫大气压。你一吸，吸管里的空气变少，压强变小，外面的大气压就把杯里的饮料压进了吸管。',
      figure: { kind: 'sim', sim: 'straw', caption: '先拖「吸管里少了多少气压」看饮料上升，再把杯口封死：同样用力，为什么吸不上来？' },
    },
    {
      nian: '空气还有重量？我怎么一点都感觉不到被压着？',
      dad: '因为你身体里面也有空气和液体在往外顶，里外差不多一样大，就感觉不到了。可它其实大得吓人：在海边，每平方厘米上压着差不多 10 牛，相当于指甲盖那么大的地方压着 1 千克的东西。一只手掌上压着的空气，比一个大人还重。',
    },
    {
      nian: '比一个大人还重？那为什么瓶口一封住，它就不帮忙了呢？',
      dad: '因为瓶口一封，外面的大气压就压不到瓶里的水面了。你一吸，瓶里水面上那点空气也跟着变稀，压强变小，推水上去的力就没了，里外差不多，水自然不动。很多人以为是嘴把饮料“拉”上来的，其实嘴只负责让吸管里的气压变小。',
    },
    {
      nian: '嘴只负责让气压变小？那吸管再长，是不是也能一直吸上来？',
      dad: '不能。就算把吸管里的空气全抽光，大气压最多也只能把水压到大约 10 米高。将近四百年前，意大利科学家托里拆利用水银做实验，量出大气压能托起约 76 厘米高的水银柱；水比水银轻得多，就能被压到 10 米左右。',
      eq: '大气压 ≈ 101 千帕 ≈ 76 厘米水银柱 ≈ 10 米水柱',
    },
    {
      nian: '大气压能托起那么高的水？那生活里还有哪些东西在靠大气压帮忙？',
      dad: '多着呢！挂毛巾的吸盘，先把里面的空气挤出去，外面的大气压就把它紧紧按在墙上；钢笔吸墨水、针筒吸药水，也是先把里面的空气排走，再让大气压把液体压进去。护士往外一拉活塞，药水就跟着进了针筒。',
    },
    {
      nian: '我懂了！是外面的大气压把饮料压进吸管的，嘴只是把吸管里的空气吸走、让气压变小。瓶口封死了，外面的大气压压不到水面，水就上不来。',
      dad: '说得好！你可以自己试：把吸管插进一瓶水，用橡皮泥把瓶口封严，吸吸看；再用牙签在橡皮泥上戳一个小孔，看看是不是又能吸上来了。',
    },
  ],
  tip: '互动图里的气压差和上升高度按大气压约 101 千帕估算，示意用。托里拆利实验要用水银，有毒，只能看视频或模型，不要在家做；橡皮泥封瓶口的小实验很安全，做完把水倒掉，别喝。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第3节 大气压强', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Air Pressure（海平面标准气压 1013.25 百帕、29.92 英寸水银柱）', by: 'NOAA JetStream（美国国家海洋和大气管理局）', url: 'https://www.noaa.gov/jetstream/atmosphere/air-pressure' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '外面的空气在推', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 600], size: [340, 340], liquid: '#c98b5a', level: 0.6, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [26, 460], color: '#ffffff', outline: true, from: 0.4 },
          { kind: 'sprite', icon: '😗', path: [[600, 205]], size: 110, from: 1 },
          { kind: 'label', at: [612, 330], pos: [880, 280], text: '管里气压变小', from: 2 },
          { kind: 'arrow', path: [[480, 420], [480, 540]], color: '#3a6fb0', text: '大气压', from: 3.4 },
          { kind: 'arrow', path: [[720, 420], [720, 540]], color: '#3a6fb0', from: 3.8 },
          { kind: 'flow', path: [[600, 680], [600, 260]], color: '#8a5a33', count: 6, speed: 150, from: 5 },
          { kind: 'text', at: [600, 830], text: '是空气把饮料压上来', from: 7.4 },
        ],
      },
      {
        turn: 1, title: '空气有多重', duration: 11,
        cues: [
          { kind: 'sprite', icon: '✋', path: [[420, 560]], size: 240, from: 0.3 },
          { kind: 'arrow', path: [[340, 260], [340, 400]], color: '#3a6fb0', from: 1.2 },
          { kind: 'arrow', path: [[420, 260], [420, 400]], color: '#3a6fb0', from: 1.5 },
          { kind: 'arrow', path: [[500, 260], [500, 400]], color: '#3a6fb0', from: 1.8 },
          { kind: 'count', at: [900, 330], label: '每平方厘米', start: 0, end: 10, unit: '牛', from: 3 },
          { kind: 'sprite', icon: '🧍', path: [[900, 620]], size: 190, from: 6 },
          { kind: 'text', at: [600, 820], text: '手掌上的空气比大人重', from: 7.2 },
        ],
      },
      {
        turn: 2, title: '封住瓶口', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [600, 500], size: [300, 360], liquid: '#7fb8e6', level: 0.6, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 312], size: [330, 34], color: '#8b7a5c', text: '封死', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [24, 420], color: '#ffffff', outline: true, from: 0.8 },
          { kind: 'arrow', path: [[460, 170], [460, 280]], color: '#9aa3ab', text: '压不进去', from: 2 },
          { kind: 'particles', box: [470, 340, 260, 90], count: 8, color: '#9cc7e8', motion: 'gas', amount: { at: 3.4, over: 2, from: 8, to: 3 }, from: 2.8 },
          { kind: 'myth', wrong: '嘴把饮料拉上来', right: '嘴只让管里的气压变小', from: 7 },
        ],
      },
      {
        turn: 3, title: '最多压 10 米', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 790], size: [900, 40], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [380, 700], size: [70, 140], color: '#b8bec6', from: 0.8 },
          { kind: 'label', at: [380, 630], pos: [380, 520], text: '水银 76 厘米', from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [800, 450], size: [70, 680], color: '#7fb8e6', from: 3.6 },
          { kind: 'label', at: [835, 150], pos: [1020, 180], text: '水约 10 米', from: 4.6 },
          { kind: 'arrow', path: [[560, 640], [560, 760]], color: '#3a6fb0', text: '大气压', from: 5.6 },
          { kind: 'text', at: [600, 860], text: '大气压最多托起这么高', size: 's', from: 7.4 },
        ],
      },
      {
        turn: 4, title: '吸盘和针筒', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [230, 480], size: [44, 520], color: '#d9d2c5', from: 0 },
          { kind: 'shape', shape: 'pill', at: [282, 480], size: [60, 150], color: '#9cc7e8', from: 0.6 },
          { kind: 'arrow', path: [[500, 430], [320, 430]], color: '#3a6fb0', text: '大气压按住', from: 1.6 },
          { kind: 'arrow', path: [[500, 530], [320, 530]], color: '#3a6fb0', from: 1.9 },
          { kind: 'sprite', icon: '💉', path: [[860, 430]], size: 200, from: 4 },
          { kind: 'flow', path: [[960, 640], [930, 540], [880, 470]], color: '#d9a35b', count: 5, speed: 120, from: 5.4 },
          { kind: 'text', at: [600, 810], text: '先排空气，再让大气压推', from: 7.2 },
        ],
      },
    ],
  },
};
