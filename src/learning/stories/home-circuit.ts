import type { Story } from './types';

const WIRE = '#5d4e37';

export const homeCircuit: Story = {
  slug: 'home-circuit',
  title: '家里一盏灯坏了，别的灯为什么还亮？',
  trigger: '客厅的灯泡“啪”地烧坏了，屋里暗了一块，可卧室、厨房的灯照样亮着。小念想起奶奶家那串小彩灯，坏一个就全不亮了。',
  dialogue: [
    {
      nian: '爸爸，客厅的灯坏了，别的灯为什么还亮着？',
      dad: '因为家里的灯是“各走各的路”。电流要有一条从电源出发、再回到电源的闭合的路，才流得动。家里每盏灯都单独连在两根电线之间，一盏灯坏了，只是它那条小路断了，别的小路照样通，这叫并联。',
    },
    {
      nian: '各走各的路？那有没有大家只走一条路的接法？',
      dad: '有，叫串联：几盏灯一个接一个排成一串，电流只有一条路，要穿过每一盏灯。老式的一串小彩灯就是这样接的，只要一个灯泡坏了，整条路就断了，所有的灯一起熄灭，还得一个一个去找是哪个坏了。',
      figure: { kind: 'sim', sim: 'circuit', caption: '把三盏灯串着接、并着接，再弄坏中间那盏：另外两盏还亮不亮？' },
    },
    {
      nian: '所有的灯一起熄灭……那电流穿过一盏盏灯泡，会不会越用越少？',
      dad: '不会。英国物理学会给老师的教学资料里专门讲过：每秒钟流进灯泡多少电荷，就流出多少，灯泡前后的电流一样大。灯泡用掉的不是电流，是电源送来的能量，变成了光和热。很多人以为电流会被灯泡用掉，其实电流一圈回来，一点也不少。',
    },
    {
      nian: '电流一圈回来……那电荷是不是一下子就从电源跑到了灯泡？',
      dad: '说出来你可能不信，电线里的电荷走得特别慢，英国物理学会的资料说，大约每分钟才挪 1 厘米。可开关一合上，整圈电线里的电荷一起动起来，就像一根灌满水的管子，这头一推，那头马上出水，所以灯一下就亮了。',
    },
    {
      nian: '这头一推那头就出水……那家里的插座也是这样并联的吗？',
      dad: '对。家里的电灯、插座、电视、冰箱，都并联在同一对电线上，每个都能单独开关，谁也不耽误谁。课本里讲，家庭电路的电压是 220 伏，每个电器两头都是这么大的电压。不过电器开得越多，总电流就越大，太多了还会跳闸。',
    },
    {
      nian: '我懂了！串联只有一条路，断一处全都不亮；并联各走各的路，家里的灯都是并联的，一盏坏了别的照样亮。电流也不会被灯泡用掉。',
      dad: '说得对！找一节电池、两个小灯泡和几根导线，先串着接、再并着接，各拧下一个灯泡，看看另一个还亮不亮。',
    },
  ],
  tip: '互动图和动画里的电路是用电池画的示意。家里的电是 220 伏，会致命，换灯泡要先关掉开关、让大人来做，小朋友只用干电池做实验。',
  sources: [
    { title: '物理 九年级全一册 · 第十五章 电流和电路 · 第3节 串联和并联；第十九章 生活用电 · 第1节 家庭电路', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What gets used up?（电流在灯泡里不会被用掉，被转移的是能量）', by: 'IOPSpark · Institute of Physics（英国物理学会）', url: 'https://spark.iop.org/what-gets-used' },
    { title: 'A simple loop: current the same everywhere（电荷大约每分钟漂移 1 厘米）', by: 'IOPSpark · Institute of Physics（英国物理学会）', url: 'https://spark.iop.org/simple-loop-current-same-everywhere' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '各走各的路', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [180, 450], size: [90, 170], color: '#ffe8a3', text: '电源', from: 0 },
          { kind: 'ray', path: [[180, 365], [180, 250], [480, 250], [480, 650], [180, 650], [180, 535]], color: WIRE, draw: 1.2, from: 0.4 },
          { kind: 'ray', path: [[180, 365], [180, 250], [1040, 250], [1040, 650], [180, 650], [180, 535]], color: WIRE, draw: 1.6, from: 1.2 },
          { kind: 'bond', a: [760, 250], b: [760, 650], color: '#c9c2b4', from: 2 },
          { kind: 'shape', shape: 'circle', at: [480, 450], size: [90, 90], color: '#fff3b0', motion: 'pulse', from: 1.4 },
          { kind: 'shape', shape: 'circle', at: [760, 450], size: [90, 90], color: '#d9d4ca', text: '坏了', from: 2.4 },
          { kind: 'shape', shape: 'circle', at: [1040, 450], size: [90, 90], color: '#fff3b0', motion: 'pulse', from: 2.8 },
          { kind: 'text', at: [600, 830], text: '一盏坏了，别的照样亮', from: 7 },
        ],
      },
      {
        turn: 1, title: '串成一串', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [610, 450], size: [860, 400], color: '#fffaf0', outline: true, from: 6 },
          { kind: 'shape', shape: 'rect', at: [180, 450], size: [90, 170], color: '#ffe8a3', text: '电源', from: 0 },
          { kind: 'ray', path: [[180, 365], [180, 250], [1040, 250], [1040, 650], [180, 650], [180, 535]], color: WIRE, draw: 1.6, from: 0.4, to: 6 },
          { kind: 'shape', shape: 'circle', at: [400, 250], size: [90, 90], color: '#fff3b0', tint: { color: '#d9d4ca', at: 6, over: 0.4 }, from: 1.6 },
          { kind: 'shape', shape: 'circle', at: [610, 250], size: [90, 90], color: '#fff3b0', tint: { color: '#d9d4ca', at: 6, over: 0.4 }, from: 2 },
          { kind: 'shape', shape: 'circle', at: [820, 250], size: [90, 90], color: '#fff3b0', tint: { color: '#d9d4ca', at: 6, over: 0.4 }, from: 2.4 },
          { kind: 'label', at: [610, 280], pos: [610, 470], text: '这一个坏了', from: 6.2 },
          { kind: 'text', at: [600, 830], text: '坏一个，全都灭', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '电流用不掉', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [180, 450], size: [90, 170], color: '#ffe8a3', text: '电源', from: 0 },
          { kind: 'ray', path: [[180, 365], [180, 250], [1040, 250], [1040, 650], [180, 650], [180, 535]], color: WIRE, draw: 1.6, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [610, 250], size: [100, 100], color: '#fff3b0', motion: 'pulse', from: 1.2 },
          { kind: 'label', at: [430, 250], pos: [400, 420], text: '流进多少', from: 2.5 },
          { kind: 'label', at: [790, 250], pos: [820, 420], text: '就流出多少', from: 3.5 },
          { kind: 'myth', wrong: '电流会被灯泡用掉', right: '电流一圈回来一点不少', from: 7 },
        ],
      },
      {
        turn: 3, title: '电荷走得慢', duration: 12,
        cues: [
          { kind: 'count', at: [300, 320], label: '每分钟约', start: 0, end: 1, unit: '厘米', from: 1 },
          { kind: 'sprite', icon: '🐌', path: [[200, 560], [360, 560]], size: 110, travel: 8, from: 0.5 },
          { kind: 'ray', path: [[500, 560], [1000, 560]], color: WIRE, draw: 0.6, from: 4 },
          { kind: 'sprite', icon: '💡', path: [[1080, 520]], size: 120, from: 4.6 },
          { kind: 'text', at: [600, 830], text: '一合开关，灯马上亮', from: 7 },
        ],
      },
      {
        turn: 4, title: '家里都是并联', duration: 12,
        cues: [
          { kind: 'count', at: [300, 280], label: '家庭电压', start: 0, end: 220, unit: '伏', over: 1.5, from: 1 },
          { kind: 'bond', a: [150, 450], b: [1080, 450], color: '#e8590c', from: 0 },
          { kind: 'bond', a: [150, 680], b: [1080, 680], color: '#3553a6', from: 0 },
          { kind: 'sprite', icon: '💡', path: [[360, 570]], size: 110, from: 2.5 },
          { kind: 'sprite', icon: '📺', path: [[620, 570]], size: 110, from: 3 },
          { kind: 'sprite', icon: '🔌', path: [[880, 570]], size: 110, from: 3.5 },
          { kind: 'text', at: [600, 830], text: '每个都能单独开关', from: 7 },
        ],
      },
    ],
  },
};
