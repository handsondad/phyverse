import type { Story } from './types';

const RED = '#e03131';
const UV = '#7048e8';
const ELECTRON = '#3553a6';
const PLATE = '#ced4da';

export const photoelectricStep: Story = {
  slug: 'photoelectric-step',
  title: '光能把电子从金属里打出来，为什么红光照得再亮也不行？',
  trigger: '课上，老师用紫外灯照一块擦亮的锌板，连着锌板的验电器指针一下子张开了；换成一盏很亮的红灯照了半天，指针却一动不动。',
  dialogue: [
    {
      nian: '爸爸，红灯明明更亮，为什么打不出电子，紫外灯却可以？',
      dad: '这就是有名的光电效应。光照到金属上，能把里面的电子打出来，可是有个门槛：光的频率必须高过某个值才行，低于它，光再强、照得再久也没用。红光的频率低，紫外线的频率高，所以只有紫外线跨过了锌的门槛。',
    },
    {
      nian: '光的频率必须高过某个值……为什么亮度不管用？',
      dad: '爱因斯坦给出了答案：光是一份一份的，每一份叫一个光子，一个光子的能量只由频率决定，频率越高能量越大。一个电子一次只吃一个光子，光子能量不够，它就跑不出来。光更亮，只是光子更多，每一个还是不够。他因此得了诺贝尔物理学奖。',
      eq: 'E = hν',
      figure: { kind: 'sim', sim: 'photon', caption: '换不同颜色的光、调不同的亮度：什么时候钠板上才有电子飞出来？' },
    },
    {
      nian: '光更亮，只是光子更多……那亮度到底改变了什么？',
      dad: '改变的是电子的个数。在 3D 实验台里保持颜色不变，把光调强，饱和电流变大了，说明每秒打出来的电子变多；可是让电流降到零的遏止电压一点没变，说明每个电子带出来的最大能量没变。光强只管“多少个”，不管“每个多大劲”。',
      eq: 'I饱和 ∝ 光子个数',
      show: { kind: 'lab', step: 3, label: '看「改光强」' },
    },
    {
      nian: '不管每个多大劲……那换一种颜色的光呢？',
      dad: '换一片滤光片，频率越高，遏止电压越大，打出来的电子跑得越快；频率降到某个值，电流就彻底没了，这个值叫截止频率。爱因斯坦把它写成一条式子：光子的能量 hν，一部分用来让电子挣脱金属，叫逸出功，剩下的就是电子的动能。',
      eq: 'hν = W₀ + Ek',
      show: { kind: 'lab', step: 4, label: '看「换频率」' },
    },
    {
      nian: '让电子挣脱金属……换一种金属，门槛会变吗？',
      dad: '会变。不同金属“抓”电子的本事不一样，逸出功也不一样。课本的表里，钠的逸出功约 2.29 电子伏，用蓝光就能打出电子；锌的逸出功大得多，非得紫外线才行。在实验台里，同一束光换一种阴极，就可能一个光电子都没有。',
      eq: 'νc = W₀ / h',
      show: { kind: 'lab', step: 5, label: '看「换金属」' },
    },
    {
      nian: '我明白了！光是一份份的光子，一个光子的能量只由频率决定。能量够大才能把电子打出来，所以红光再亮也不行；光越亮，只是打出来的电子越多。',
      dad: '说得对！去 3D 实验台把钠换成钾、铷试一试，找一找每种金属刚好能打出电子的是哪条谱线。',
    },
  ],
  tip: '紫外灯会伤眼睛和皮肤，现实中只在老师指导下使用，千万别盯着看。3D 实验台里的电源和光源都是虚拟的；互动图里光的颜色和波长取的是大约的值。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第四章 原子结构和波粒二象性 · 第2节 光电效应（截止频率、遏止电压、饱和电流；爱因斯坦光电效应方程；几种金属的逸出功）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Albert Einstein – Facts（因发现光电效应定律获 1921 年诺贝尔物理学奖；光子要有一定的最低频率才能打出电子）', by: 'NobelPrize.org（诺贝尔奖官网）', url: 'https://www.nobelprize.org/prizes/physics/1921/einstein/facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '红光不行，紫外行', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [800, 460], size: [40, 380], color: PLATE, text: '锌', from: 0 },
          { kind: 'flow', path: [[200, 360], [770, 360]], color: RED, count: 8, speed: 260, from: 1, to: 5 },
          { kind: 'label', at: [400, 360], pos: [400, 220], text: '红光：再亮也不行', from: 1.5, to: 5 },
          { kind: 'flow', path: [[200, 560], [770, 560]], color: UV, count: 3, speed: 260, from: 5 },
          { kind: 'flow', path: [[830, 560], [1120, 480]], color: ELECTRON, count: 3, speed: 200, from: 6 },
          { kind: 'label', at: [1000, 520], pos: [1000, 680], text: '电子飞出来了', from: 6.5 },
          { kind: 'text', at: [600, 830], text: '要跨过频率的门槛', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '一份一份的光子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [800, 460], size: [40, 380], color: PLATE, text: '钠', from: 0 },
          { kind: 'flow', path: [[150, 380], [770, 380]], color: RED, count: 10, speed: 240, from: 1 },
          { kind: 'flow', path: [[150, 560], [770, 560]], color: UV, count: 2, speed: 240, from: 2.5 },
          { kind: 'flow', path: [[830, 560], [1120, 460]], color: ELECTRON, count: 2, speed: 220, from: 3.5 },
          { kind: 'label', at: [400, 380], pos: [400, 240], text: '光子多，每颗都不够', from: 4 },
          { kind: 'myth', wrong: '光越亮，越能打出电子', right: '看每颗光子的能量', from: 7 },
        ],
      },
      {
        turn: 2, title: '亮度管个数', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 300], label: '饱和电流', start: 0.3, end: 0.9, color: ELECTRON, over: 3, from: 1.5 },
          { kind: 'meter', at: [600, 480], label: '遏止电压', start: 0.5, end: 0.5, color: UV, from: 1.5 },
          { kind: 'label', at: [460, 300], pos: [240, 220], text: '光调强：变大', from: 3.5 },
          { kind: 'label', at: [460, 480], pos: [240, 620], text: '光调强：不变', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '亮度只管电子个数', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '颜色管能量', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [260, 380], size: [180, 70], color: '#ffd43b', text: '黄光', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [180, 70], color: '#4dabf7', text: '蓝光', from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [940, 380], size: [180, 70], color: UV, text: '紫外线', from: 1 },
          { kind: 'meter', at: [260, 540], label: '电子能量', start: 0, end: 0.02, color: ELECTRON, from: 2 },
          { kind: 'meter', at: [600, 540], label: '电子能量', start: 0, end: 0.3, color: ELECTRON, from: 2.5 },
          { kind: 'meter', at: [940, 540], label: '电子能量', start: 0, end: 0.9, color: ELECTRON, from: 3 },
          { kind: 'text', at: [600, 830], text: '频率越高，电子越快', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '换金属换门槛', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 460], size: [40, 320], color: PLATE, text: '钠', from: 0 },
          { kind: 'shape', shape: 'rect', at: [860, 460], size: [40, 320], color: '#adb5bd', text: '锌', from: 0.5 },
          { kind: 'flow', path: [[120, 460], [350, 460]], color: '#4dabf7', count: 3, speed: 200, from: 1.5 },
          { kind: 'flow', path: [[410, 460], [560, 400]], color: ELECTRON, count: 2, speed: 180, from: 2.5 },
          { kind: 'flow', path: [[620, 460], [830, 460]], color: '#4dabf7', count: 3, speed: 200, from: 3.5 },
          { kind: 'count', at: [380, 230], label: '钠的逸出功约', start: 0, end: 2.29, unit: 'eV', from: 4 },
          { kind: 'label', at: [860, 330], pos: [1000, 230], text: '蓝光打不动锌', from: 5 },
          { kind: 'text', at: [600, 830], text: '金属不同，门槛不同', from: 7.5 },
        ],
      },
    ],
  },
};
