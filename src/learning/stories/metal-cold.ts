import type { Story } from './types';

export const metalCold: Story = {
  slug: 'metal-cold',
  title: '铁栏杆为什么比木头摸着凉？',
  trigger: '冬天放学，小念一手扶着公园的铁栏杆，一手摸着旁边的木头长椅：铁栏杆冰得扎手，木头椅子却没那么凉。',
  dialogue: [
    {
      nian: '爸爸，铁栏杆和木头椅子放在一起，为什么铁的冰那么多？',
      dad: '其实它们在外面放了一整夜，温度几乎一样，都跟空气差不多冷。你觉得铁更冰，是因为手是暖的，摸上去时热会从手往外跑；铁把你手上的热拉走得特别快，木头拉走得慢，手感觉的是“热跑得多快”，不是东西本身有多冷。',
    },
    {
      nian: '温度一样，手却觉得不一样？为什么铁拉走热那么快？',
      dad: '因为铁是传热的好手，热在铁里跑得飞快：手上的热一传到铁上，马上就被传开，接着再从手上拉走更多。木头传热慢得多，贴着手的那一小块很快被焐热，就不怎么再拉走热了。像这样容易传热的叫热的良导体，不容易传热的叫不良导体。',
      figure: { kind: 'sim', sim: 'conduction', caption: '换一换手摸的材料：一样是 5 ℃，看热从手上跑走的箭头有多粗。' },
    },
    {
      nian: '容易传热的才觉得冰？那泡沫是不是摸起来一点都不凉？',
      dad: '对，泡沫传热最慢，摸上去几乎不觉得凉，哪怕它跟铁一样冷。很多人以为铁本身就比木头冷，其实放在一起的东西温度一样，只是铁拉走热更快。用温度计去量，读数是一样的；只有手会被“骗”。',
    },
    {
      nian: '铁拉走热更快？那夏天被太阳晒过的铁滑梯，摸着会不会更烫？',
      dad: '会！反过来也一样：东西比手热的时候，铁会把热飞快地送进手里，所以晒过的铁滑梯比旁边的木头椅子烫得多，容易烫伤。夏天玩滑梯之前，先用手背轻轻碰一下，试试烫不烫。',
    },
    {
      nian: '晒过的金属那么烫？那冬天的铁栏杆，是不是也不能乱碰？',
      dad: '对，冬天千万别用舌头去舔很冷的铁栏杆！舌头湿湿的，铁一下子把热拉走，口水会冻住，把舌头粘在上面，硬扯会受伤。在家也能看见铁拉走热的本事：把两块冰分别放在铁锅盖和木板上，铁上的冰会化得快得多。',
    },
    {
      nian: '我懂了！放在一起的铁和木头温度一样，铁传热快，把手上的热拉走得快，所以摸着更冰；东西比手热时，铁又把热送得快，所以更烫。手感觉的是热跑得多快。',
      dad: '说得好！拿一把金属勺和一把木勺放在桌上一会儿，同时握住，哪把觉得凉？再把它们一起放进温水里泡一会儿，摸摸哪把的柄先变热。',
    },
  ],
  tip: '“冰在金属上化得比在木头上快”是美国物理学会和旧金山探索馆都推荐的小实验，铁锅盖、铝盘都可以用。冬天别让皮肤长时间贴着很冷的金属，尤其别用舌头舔。互动图里热流的粗细是示意。',
  sources: [
    { title: '物理 九年级 · 第十三章 内能 · 第2节 内能（热传递）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Getting Warmer/Getting Colder（冰在金属上化得更快）', by: 'American Physical Society', url: 'https://www.aps.org/learning-resources/getting-warmer-colder' },
    { title: 'Cold Metal（为什么金属摸起来更凉）', by: 'Exploratorium Science Snacks', url: 'https://www.exploratorium.edu/snacks/cold-metal' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '温度一样', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 480], size: [300, 120], color: '#9aa7b3', text: '铁', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 480], size: [300, 120], color: '#c79a63', text: '木头', from: 0 },
          { kind: 'meter', at: [330, 300], label: '温度', start: 0.2, end: 0.2, color: '#3a7bb5', from: 1 },
          { kind: 'meter', at: [870, 300], label: '温度', start: 0.2, end: 0.2, color: '#3a7bb5', from: 1 },
          { kind: 'text', at: [600, 820], text: '手感觉的是热跑多快', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '热被拉走', duration: 12,
        cues: [
          { kind: 'sprite', icon: '✋', path: [[330, 330]], size: 140, from: 0 },
          { kind: 'sprite', icon: '✋', path: [[870, 330]], size: 140, from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 520], size: [300, 120], color: '#9aa7b3', text: '铁', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 520], size: [300, 120], color: '#c79a63', text: '木头', from: 0 },
          { kind: 'flow', path: [[330, 400], [330, 520], [480, 520]], color: '#e8590c', count: 10, speed: 260, from: 1.5 },
          { kind: 'meter', at: [330, 660], label: '拉走的热', start: 0, end: 0.9, color: '#e8590c', from: 1.5, over: 3 },
          { kind: 'meter', at: [870, 660], label: '拉走的热', start: 0, end: 0.2, color: '#e8590c', from: 1.5, over: 3 },
          { kind: 'text', at: [600, 820], text: '铁传热快，木头传热慢', from: 6 },
        ],
      },
      {
        turn: 2, title: '一样冷', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 420], size: [300, 120], color: '#9aa7b3', text: '铁', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 420], size: [300, 120], color: '#fbf6ea', text: '泡沫', from: 0 },
          { kind: 'sprite', icon: '🌡️', path: [[600, 420]], size: 110, from: 1 },
          { kind: 'text', at: [600, 210], text: '温度计读数一样', from: 2 },
          { kind: 'myth', wrong: '铁本身比木头冷', right: '一样冷，铁拉走热更快', from: 6.4 },
        ],
      },
      {
        turn: 3, title: '晒过的滑梯', duration: 11,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[960, 230]], size: 150, from: 0 },
          { kind: 'shape', shape: 'pill', at: [520, 520], size: [560, 70], color: '#9aa7b3', text: '铁滑梯', from: 0 },
          { kind: 'sprite', icon: '✋', path: [[520, 270]], size: 130, from: 1 },
          { kind: 'arrow', path: [[520, 480], [520, 350]], color: '#e8590c', text: '热冲进手', from: 1.8 },
          { kind: 'text', at: [600, 820], text: '先用手背碰一下', from: 5.5 },
        ],
      },
      {
        turn: 4, title: '冰化得快慢', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 560], size: [320, 50], color: '#9aa7b3', text: '铁锅盖', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 560], size: [320, 50], color: '#c79a63', text: '木板', from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [120, 120], color: '#e6f6ff', motion: 'shrink', from: 1 },
          { kind: 'shape', shape: 'rect', at: [870, 470], size: [120, 120], color: '#e6f6ff', from: 1 },
          { kind: 'text', at: [600, 260], text: '铁上的冰化得快', from: 5 },
          { kind: 'text', at: [600, 820], text: '别用舌头舔冷铁', from: 7.5 },
        ],
      },
    ],
  },
};
