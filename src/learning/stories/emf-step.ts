import type { Story } from './types';

const AXIS = '#5d4e37';
const HOT = '#e8590c';
const BLUE = '#3553a6';

export const emfStep: Story = {
  slug: 'emf-step',
  title: '旧电池量着还有电压，为什么装进遥控器就按不动了？',
  trigger: '电视遥控器按不动了。小念把电池抠出来，用爸爸的电压表一量，还有 1.4 伏，装回去照样按不动。',
  dialogue: [
    {
      nian: '爸爸，这节旧电池量着还有电，为什么装进遥控器就按不动了？',
      dad: '因为电池里面也有电阻，叫内阻。电压表几乎不从电池取电流，内阻分不走电压，所以还能量出 1.4 伏。可一装进遥控器，电流流起来，也得穿过电池里的内阻，在那里就“丢”掉一部分电压，留给遥控器的就不够了。电池越旧，内阻越大。',
    },
    {
      nian: '电流也得穿过电池里面……那电池的电压到底是多少？',
      dad: '要分两个说法。电池本身能给的“力气”叫电动势 E，外面电路两头实际拿到的叫路端电压 U。电流 I 流过内阻 r，内阻分走 I 乘 r 那么多电压，剩下的才是 U。电流越大，内阻分走得越多，U 就越小。旧电池的 r 大，一干活 U 就掉下来。',
      eq: 'U = E − Ir',
      figure: { kind: 'sim', sim: 'battery', caption: '换新电池、旧电池，再换一换接什么：电压表读数是多少？遥控器能不能用？' },
    },
    {
      nian: '内阻分走得越多……那内阻有多大，能测出来吗？',
      dad: '能。3D 实验台上有一节旧干电池：电压表跨在电池两头，电流表和滑动变阻器串在电路里。先把变阻器调到最大再合开关，免得电流太大；然后一点点调小，记下五组电流和电压。电流越大，电压表的读数越小，正好对上刚才那个式子。',
      show: { kind: 'lab', step: 2, label: '看「多测几组」' },
    },
    {
      nian: '电流越大读数越小……那五组数怎么算出 E 和 r？',
      dad: '把五组数画在 U-I 图上，它们排成一条往下斜的直线。直线和纵轴的交点，就是电流为零时的电压，也就是电动势 E，实验台上读出来是 1.50 伏；直线有多斜，就是内阻 r，大约 0.6 欧。只测两组也能解方程，可误差大，所以要多测几组再画线。',
      show: { kind: 'lab', step: 3, label: '看「作 U-I 图」' },
    },
    {
      nian: '只测两组误差大……那换成新电池，图会有什么不一样？',
      dad: '新电池的内阻小得多，直线几乎是平的，电流再大，电压也掉得不多。美国普渡大学的物理演示正好对比过：一节很旧的干电池，开关断开时，电压表的读数接近标称电压；接上一个电阻、合上开关，读数就一下掉了很多。所以只用电压表空量，看不出电池还有没有劲。',
    },
    {
      nian: '我明白了！电池里面有内阻，电流一大，内阻就分走一部分电压，留给外面的就少了。旧电池内阻大，电压表空量看着还有电，一装进遥控器就没劲了。',
      dad: '说得对！想亲手测一测，就去「3D 实验台」做测电源电动势和内阻的实验：五组数画成一条线，读出 E 和 r。',
    },
  ],
  tip: '互动图里新、旧电池的电动势和内阻是示意数，真实电池各不相同。旧电池别和新电池混着用，不要拆开或扔进火里；用完的电池按当地要求分类投放。',
  sources: [
    { title: '物理 必修 第三册 · 第十二章 电能 能量守恒定律 · 第2节 闭合电路的欧姆定律；第3节 实验：电池电动势和内阻的测量', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Terminal Voltage and Internal Resistance（旧干电池空载读数接近标称电压，接上负载后明显下降）', by: 'Physics Lecture Demonstrations · Purdue University（美国普渡大学）', url: 'https://www.physics.purdue.edu/demos/display_page.php?item=5B-02' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '量着还有电', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [350, 470], size: [170, 310], color: '#ffe8a3', text: '旧电池', from: 0 },
          { kind: 'count', at: [820, 300], label: '电压表读', start: 0, end: 1.4, unit: '伏', over: 1.2, from: 1 },
          { kind: 'shape', shape: 'rect', at: [350, 380], size: [150, 60], color: HOT, text: '内阻', from: 3 },
          { kind: 'shape', shape: 'rect', at: [850, 570], size: [220, 120], color: '#f4efe4', text: '遥控器', from: 4.5 },
          { kind: 'label', at: [900, 600], pos: [1040, 720], text: '按不动了', from: 5.5 },
          { kind: 'text', at: [600, 830], text: '电池里面也有电阻', from: 7 },
        ],
      },
      {
        turn: 1, title: '内阻分走电压', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 250], text: 'U = E − Ir', from: 0.5 },
          { kind: 'meter', at: [600, 440], label: '给外面的 U', start: 0.95, end: 0.65, color: BLUE, over: 3, from: 2 },
          { kind: 'meter', at: [600, 570], label: '内阻分走', start: 0.05, end: 0.35, color: HOT, over: 3, from: 2 },
          { kind: 'text', at: [600, 830], text: '电流越大，U 越小', from: 7 },
        ],
      },
      {
        turn: 2, title: '多测几组', duration: 12,
        cues: [
          { kind: 'bond', a: [260, 220], b: [260, 640], color: AXIS, from: 0 },
          { kind: 'bond', a: [260, 640], b: [1000, 640], color: AXIS, from: 0 },
          { kind: 'label', at: [262, 230], pos: [380, 200], text: '电压 U', from: 0.5, to: 2.8 },
          { kind: 'label', at: [990, 640], pos: [960, 700], text: '电流 I', from: 0.5, to: 2.8 },
          { kind: 'shape', shape: 'circle', at: [350, 320], size: [34, 34], color: HOT, from: 1 },
          { kind: 'shape', shape: 'circle', at: [470, 370], size: [34, 34], color: HOT, from: 1.6 },
          { kind: 'shape', shape: 'circle', at: [590, 420], size: [34, 34], color: HOT, from: 2.2 },
          { kind: 'shape', shape: 'circle', at: [710, 470], size: [34, 34], color: HOT, from: 2.8 },
          { kind: 'shape', shape: 'circle', at: [830, 520], size: [34, 34], color: HOT, from: 3.4 },
          { kind: 'label', at: [600, 440], pos: [800, 330], text: '电流越大，读数越小', from: 4.5, to: 7 },
          { kind: 'text', at: [600, 830], text: '先调到最大再合开关', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '读出 E 和 r', duration: 12,
        cues: [
          { kind: 'bond', a: [260, 200], b: [260, 700], color: AXIS, from: 0 },
          { kind: 'bond', a: [260, 700], b: [1000, 700], color: AXIS, from: 0 },
          { kind: 'ray', path: [[260, 300], [960, 620]], color: BLUE, draw: 1.2, from: 0.5 },
          { kind: 'label', at: [262, 300], pos: [470, 230], text: '交点就是 E', from: 2 },
          { kind: 'count', at: [760, 260], label: '电动势 E', start: 0, end: 1.5, unit: '伏', from: 3 },
          { kind: 'count', at: [900, 420], label: '内阻 r 约', start: 0, end: 0.6, unit: '欧', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '多测几组再画线', from: 8 },
        ],
      },
      {
        turn: 4, title: '新旧电池对比', duration: 12,
        cues: [
          { kind: 'bond', a: [260, 200], b: [260, 700], color: AXIS, from: 0 },
          { kind: 'bond', a: [260, 700], b: [1000, 700], color: AXIS, from: 0 },
          { kind: 'ray', path: [[260, 300], [960, 340]], color: '#2f8a57', draw: 1, from: 0.5 },
          { kind: 'ray', path: [[260, 320], [960, 640]], color: HOT, draw: 1, from: 2 },
          { kind: 'label', at: [900, 337], pos: [900, 230], text: '新电池：几乎是平的', from: 1.5 },
          { kind: 'label', at: [900, 613], pos: [760, 750], text: '旧电池：掉得很快', from: 3 },
          { kind: 'text', at: [600, 830], text: '空量看不出有没有劲', from: 7 },
        ],
      },
    ],
  },
};
