import type { Story } from './types';

const AXIS = '#5d4e37';
const BLUE = '#3553a6';
const HOT = '#e8590c';
const PLATE = '#c9d3dd';

export const capacitorStep: Story = {
  slug: 'capacitor-step',
  title: '闪光灯为什么要先“嘀——”地充一会儿电？',
  trigger: '小念翻出爷爷的老相机，一按开关，里面“嘀——”地越叫越尖，等小灯亮了再按快门，“咔”的一道白光，晃得人直眨眼。',
  dialogue: [
    {
      nian: '爸爸，老相机的闪光灯，为什么要先“嘀——”地响一会儿才能闪？',
      dad: '那一会儿是在给电容器充电。电池的电压太低，也没法一下子放出那么多电，闪光灯就先把电一点点攒进电容器里。美国科罗拉多大学的物理演示说，一次性相机里一节 1.5 伏的电池，能把电容器充到 300 多伏，按快门时几毫秒就全放出来，亮得晃眼。',
    },
    {
      nian: '把电一点点攒进电容器……电容器长什么样？',
      dad: '最简单的电容器，就是两块靠得很近、中间隔着绝缘层的金属板。充电时，电池把一块板上的电子搬到另一块板上，一块带正电，一块带负电，两块板上的电荷一样多。电荷攒得越多，两块板之间的电压越高。断开电池，电荷还互相吸引着留在板上。',
      figure: { kind: 'sim', sim: 'capacitor', caption: '先充电，再放电：拖动时间，看电容器的电压怎样变；换成闪光灯管放电又怎样？' },
    },
    {
      nian: '电荷攒得越多电压越高……那为什么要等一会儿，不能一下充满？',
      dad: '因为越充越难。刚开始，电容器上没电荷，电池推得最顺，电流最大；电荷越攒越多，电容器的电压越来越接近电池，剩下能推的就越少，电流也越来越小。实验台上用 8 伏的电源、3.3 千欧的电阻给电容器充电，大约 8 秒才基本充满。',
      show: { kind: 'lab', step: 1, label: '看「合向 1 充电」' },
    },
    {
      nian: '越充越难……那按下快门放电的时候，电流往哪边走？',
      dad: '和充电时正好反过来。实验台上把开关拨到放电那边，电流表的指针一下打到另一侧，电压也越来越低。闪光灯管的电阻只有大约 1 欧，电荷几乎一下子就倒光了。很多人以为闪光是电池直接打出去的，其实是先攒进电容器，再一下子放出来。',
      show: { kind: 'lab', step: 2, label: '看「合向 2 放电」' },
    },
    {
      nian: '电荷一下子就倒光了……那电容器到底装了多少电荷？',
      dad: '把放电时的电流画成曲线，曲线下面的面积就是放出的电荷量。实验台上记下几组电荷量和电压，发现它们成正比：电压翻倍，电荷也翻倍。电荷量和电压的比值只由电容器自己决定，叫电容 C，实验台上这个电容器是 470 微法。',
      eq: 'C = Q / U',
      show: { kind: 'lab', step: 5, label: '看「记录 q-u」' },
    },
    {
      nian: '我懂了！闪光灯先把电攒进电容器里，越充越慢，所以要“嘀——”地等一会儿；一按快门，电荷一下子全放出来，就是一道强光。电容越大，同样的电压能装的电荷越多。',
      dad: '说得对！想看看电流怎么一下大、一下小，就去「3D 实验台」做电容器充放电的实验，自己拨一拨开关、数一数格子。',
    },
  ],
  tip: '闪光灯里的电容器能充到几百伏，关了机也可能还存着电，千万不要拆相机、闪光灯和别的电器。互动图用的是实验台上的低电压电容器（8 伏、470 微法），只是示意。',
  sources: [
    { title: '物理 必修 第三册 · 第十章 静电场中的能量 · 第4节 电容器的电容（观察电容器的充放电）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Camera Flash（1.5 伏电池把电容器充到 300 多伏，几毫秒内经闪光管放电）', by: 'Physics Lecture Demonstrations · University of Colorado Boulder（美国科罗拉多大学）', url: 'https://physicslabs.colorado.edu/demos/electricity-and-magnetism/capacitance/energy-stored-in-a-capacitor/camera-flash/' },
    { title: 'Lecture 9: Flash Camera（充电时的“嘀”声来自振荡电路，闪光管导通后电阻约 1 欧）', by: 'Rensselaer Polytechnic Institute（美国伦斯勒理工学院）', url: 'https://hibp.ecse.rpi.edu/~connor/education/IEE/lectures/Lecture_9_flash_camera.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '先把电攒起来', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [240, 480], size: [120, 190], color: '#ffe8a3', text: '电池', from: 0 },
          { kind: 'flow', path: [[310, 480], [640, 480]], color: '#ffd43b', count: 6, speed: 200, from: 1 },
          { kind: 'shape', shape: 'rect', at: [760, 480], size: [130, 230], color: PLATE, text: '电容器', from: 0.5 },
          { kind: 'count', at: [760, 260], label: '能充到', start: 0, end: 300, unit: '多伏', over: 2, from: 2 },
          { kind: 'sprite', icon: '📸', path: [[1060, 480]], size: 140, from: 5 },
          { kind: 'pulse', at: [1060, 450], color: '#ffe066', radius: 130, from: 6 },
          { kind: 'text', at: [600, 830], text: '几毫秒全放出来', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '两块金属板', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 470], size: [30, 300], color: PLATE, from: 0 },
          { kind: 'shape', shape: 'rect', at: [680, 470], size: [30, 300], color: PLATE, from: 0 },
          { kind: 'particles', box: [545, 340, 30, 260], count: 8, color: HOT, motion: 'jitter', symbol: '+', amount: { at: 1, over: 4, from: 0, to: 8 }, from: 1 },
          { kind: 'particles', box: [625, 340, 30, 260], count: 8, color: BLUE, motion: 'jitter', symbol: '−', amount: { at: 1, over: 4, from: 0, to: 8 }, from: 1 },
          { kind: 'label', at: [600, 620], pos: [600, 720], text: '中间隔着绝缘层', from: 3 },
          { kind: 'text', at: [600, 830], text: '电荷越多，电压越高', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '越充越慢', duration: 12,
        cues: [
          { kind: 'bond', a: [250, 230], b: [250, 650], color: AXIS, from: 0 },
          { kind: 'bond', a: [250, 650], b: [980, 650], color: AXIS, from: 0 },
          { kind: 'ray', path: [[250, 650], [338, 460], [425, 360], [513, 308], [600, 280], [775, 258], [950, 252]], color: BLUE, draw: 4, from: 0.5 },
          { kind: 'label', at: [425, 360], pos: [560, 520], text: '越充越慢', from: 3 },
          { kind: 'count', at: [830, 450], label: '基本充满', start: 0, end: 8, unit: '秒', from: 5 },
          { kind: 'text', at: [600, 830], text: '越接近电池，越难推', from: 8 },
        ],
      },
      {
        turn: 3, title: '一下子放光', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 470], size: [30, 300], color: PLATE, from: 0 },
          { kind: 'shape', shape: 'rect', at: [680, 470], size: [30, 300], color: PLATE, from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 230], size: [160, 44], color: '#fffbe0', from: 0 },
          { kind: 'flow', path: [[505, 320], [505, 230], [695, 230], [695, 320]], color: '#ffd43b', count: 6, speed: 500, from: 1 },
          { kind: 'pulse', at: [600, 230], color: '#ffe066', radius: 150, from: 1.5 },
          { kind: 'myth', wrong: '闪光是电池直接打出去的', right: '先攒进电容器，再一下放出', from: 7 },
        ],
      },
      {
        turn: 4, title: '电容 C', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 230], text: 'C = Q / U', from: 0.5 },
          { kind: 'bond', a: [300, 330], b: [300, 700], color: AXIS, from: 1 },
          { kind: 'bond', a: [300, 700], b: [920, 700], color: AXIS, from: 1 },
          { kind: 'ray', path: [[300, 700], [880, 370]], color: BLUE, draw: 1.5, from: 2 },
          { kind: 'count', at: [860, 590], label: '这个电容', start: 0, end: 470, unit: '微法', over: 1.5, from: 5 },
          { kind: 'text', at: [600, 830], text: '电压翻倍，电荷也翻倍', from: 7.5 },
        ],
      },
    ],
  },
};
