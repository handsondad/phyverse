import type { Story } from './types';

const GOLD = '#f2c94c';
const ALPHA = '#4dabf7';
const CLOUD = '#a5d8ff';
const PUSH = '#e8590c';

export const emptyAtom: Story = {
  slug: 'empty-atom',
  title: '原子里面大部分是空的，为什么手按桌子按不进去？',
  trigger: '小念在书上读到一句话：“原子里几乎全是空的。”她用力按了按桌子，手掌都压白了，桌子却纹丝不动。',
  dialogue: [
    {
      nian: '爸爸，书上说原子里面大部分是空的，为什么我的手按不进桌子？',
      dad: '一百多年前的科学家也为这件事吃了一惊。1911 年前后，卢瑟福用一种叫 α 粒子的小“炮弹”去打薄薄的金箔，结果绝大多数直直穿了过去，只有极少数被弹了回来。所以原子里大部分地方确实是空的，正中间藏着一个很小的原子核。',
      figure: { kind: 'sim', sim: 'rutherford', caption: '先看整片金箔，再放大一个金原子：为什么只有极少数 α 粒子被弹回来？' },
    },
    {
      nian: '只有极少数被弹了回来……原子核到底有多小？',
      dad: '小得出奇。课本里说，原子核的直径只有原子的大约十万分之一。把原子放大成一座大体育场，原子核也就像场中央的一只小蚊子。可它又特别重，原子几乎全部的质量都集中在这颗小小的“芯”里，外面只有很轻的电子在跑。',
    },
    {
      nian: '外面只有很轻的电子……那原子和原子为什么不能互相穿过去？',
      dad: '因为电子带负电。两块东西靠得很近时，表面原子外层的电子会互相推开，靠得越近，推得越厉害。课本里也讲，分子之间既有引力又有斥力，距离很小的时候斥力很大，所以固体和液体都很难被压缩。你按桌子，就是手上的电子被桌子的电子往回推。',
    },
    {
      nian: '被桌子的电子往回推……那我们摸东西的时候，真的碰到它了吗？',
      dad: '在原子这么小的地方，“碰到”的意思就是靠得太近、互相推得很厉害。你用的劲越大，靠得越近，推回来的力就越大，手上就觉得越硬。所以摸到一样东西，说到底是电的推力在起作用，并不是两颗实心小球撞在了一起。',
    },
    {
      nian: '并不是两颗实心小球……那 α 粒子为什么就能穿过金箔？',
      dad: 'α 粒子是从放射性物质里高速射出来的，又小又快，能从原子里大片“空”的地方一穿而过。只有正对着原子核飞的，才会被核里的正电猛地推回来。你的手可不是一颗飞快的小粒子，而是无数原子挤在一起，所以只能被桌子顶住。',
    },
    {
      nian: '我明白了！原子里大部分确实是空的，原子核小得像体育场里的一只蚊子。手按不进桌子，是因为两边原子外层的电子互相推开。',
      dad: '说得对！把两个气球都在头发上蹭几下，再让它们慢慢靠近，它们会互相躲开。同种电荷互相推，原子外层的电子也是这样。',
    },
  ],
  tip: '蹭气球时别太用力，免得气球爆开吓一跳。互动图里原子核画大了很多，照真实比例画就看不见了。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第四章 原子结构和波粒二象性 · 原子的核式结构模型（α 粒子散射实验；原子核的大小）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 九年级 · 第十三章 内能 · 第1节 分子热运动（分子间同时存在引力和斥力）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Ernest Rutherford（1911 年发表金箔实验结果；原子核半径至少比原子小一万倍，原子绝大部分是空的）', by: 'Purdue University 化学系（普渡大学）', url: 'https://chemed.chem.purdue.edu/genchem/history/rutherford.html' },
    { title: 'Physics for Future Presidents · Ch. 4 Nuclei and Radioactivity（原子核只有原子的十万分之一，像体育场里的一只蚊子，却占原子 99.9% 以上的质量）', by: 'Richard A. Muller · 加州大学伯克利分校', url: 'https://muller.lbl.gov/teaching/Physics10/PffP_textbook/PffP-04-radioactivity-5-27.pdf' },
    { title: 'The ABC\'s of Nuclear Science · Ch. 2 The Atomic Nucleus（卢瑟福实验里有 α 粒子被大角度弹开）', by: 'Lawrence Berkeley National Laboratory（劳伦斯伯克利国家实验室）', url: 'https://www2.lbl.gov/abc/wallchart/teachersguide/pdf/Chap02.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '金箔实验', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [24, 440], color: GOLD, from: 0 },
          { kind: 'label', at: [600, 240], pos: [820, 200], text: '薄薄的金箔', from: 0.5 },
          { kind: 'flow', path: [[150, 380], [1100, 380]], color: ALPHA, count: 5, speed: 260, from: 1 },
          { kind: 'flow', path: [[150, 470], [1100, 470]], color: ALPHA, count: 5, speed: 260, from: 1.5 },
          { kind: 'flow', path: [[150, 560], [1100, 560]], color: ALPHA, count: 5, speed: 260, from: 2 },
          { kind: 'arrow', path: [[150, 640], [580, 640], [300, 720]], color: '#e03131', text: '极少数弹回', draw: 0.8, from: 4 },
          { kind: 'text', at: [600, 830], text: '绝大多数直穿过去', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '小小的原子核', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏟️', path: [[600, 450]], size: 440, from: 0 },
          { kind: 'sprite', icon: '🦟', path: [[600, 470]], size: 36, from: 2.5 },
          { kind: 'label', at: [600, 470], pos: [960, 260], text: '原子核', from: 3 },
          { kind: 'text', at: [600, 830], text: '质量几乎都在核里', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '电子互相推', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [380, 470], size: [280, 280], color: CLOUD, slide: { to: [460, 470], at: 1, over: 2 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [820, 470], size: [280, 280], color: CLOUD, slide: { to: [740, 470], at: 1, over: 2 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [380, 470], size: [12, 12], color: PUSH, slide: { to: [460, 470], at: 1, over: 2 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [820, 470], size: [12, 12], color: PUSH, slide: { to: [740, 470], at: 1, over: 2 }, from: 0 },
          { kind: 'arrow', path: [[560, 300], [420, 300]], color: PUSH, text: '推开', draw: 0.5, from: 3.5 },
          { kind: 'arrow', path: [[640, 300], [780, 300]], color: PUSH, text: '推开', draw: 0.5, from: 3.5 },
          { kind: 'text', at: [600, 830], text: '靠得越近，推得越狠', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '“碰到”是推力', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [800, 70], color: '#c8955b', text: '桌子', from: 0 },
          { kind: 'sprite', icon: '✋', path: [[600, 260], [600, 470]], size: 150, travel: 2, from: 0.5 },
          { kind: 'arrow', path: [[760, 560], [760, 420]], color: '#3553a6', text: '往回推', draw: 0.5, from: 2.8 },
          { kind: 'text', at: [600, 830], text: '推得越狠，越觉得硬', from: 7.5 },
        ],
      },
      {
        turn: 4, title: 'α 粒子穿过去', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 410], size: [440, 440], color: CLOUD, outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 410], size: [14, 14], color: PUSH, from: 0.5 },
          { kind: 'flow', path: [[100, 300], [1100, 300]], color: ALPHA, count: 4, speed: 300, from: 1 },
          { kind: 'flow', path: [[100, 530], [1100, 530]], color: ALPHA, count: 4, speed: 300, from: 1.5 },
          { kind: 'arrow', path: [[100, 400], [580, 405], [220, 440]], color: '#e03131', text: '正对核被推回', draw: 0.8, from: 3 },
          { kind: 'myth', wrong: '原子是实心的小球', right: '中间小核，外面电子', from: 7 },
        ],
      },
    ],
  },
};
