import type { Story } from './types';

export const glassSing: Story = {
  slug: 'glass-sing',
  title: '唱歌真能把玻璃杯震碎吗？',
  trigger: '动画片里，歌唱家飙出一个高音，桌上的玻璃杯“啪”地碎了。小念对着家里的杯子“啊——”了半天，杯子一点事都没有。',
  dialogue: [
    {
      nian: '爸爸，为什么我喊了半天，杯子一点都没碎？',
      dad: '光喊得响可不够。每只玻璃杯都有自己最“喜欢”的振动快慢，叫固有频率；用手指弹一下杯口，“叮——”的那一声就是它。只有声音的频率正好对上它，杯子才会越晃越厉害。你随便“啊”一声，频率没对上，杯子只是轻轻抖一下。',
    },
    {
      nian: '频率要正好对上？对上了会怎么样？',
      dad: '就像推秋千：每次都在秋千荡回来的那一刻推一把，秋千会越荡越高。声音的频率对上了杯子的固有频率，每一下推动都踩在点上，杯壁晃得越来越大，这叫共振。晃得超过玻璃能承受的程度，杯子就碎了。',
      figure: { kind: 'sim', sim: 'resonance', caption: '拖动唱出的频率，再换换声音大小：频率要对到多准，杯子才会碎？' },
    },
    {
      nian: '杯壁晃得越来越大就会碎？那是不是声音越大越容易碎？',
      dad: '声音大也要紧，但前提是频率对上。哈佛大学的物理演示里，先测出杯子的频率，再用大喇叭放出几乎一模一样的声音，相差不到半赫兹，音量开得很大，杯子才碎。他们特意提醒：频率不对，声音再大也没用。很多人以为声音大就能震碎玻璃，其实关键是对准频率。',
    },
    {
      nian: '相差不到半赫兹？那真能用嗓子把杯子唱碎吗？',
      dad: '非常难。嗓音要正好对准杯子的频率，还得又大又稳地保持好一会儿，杯子也得是薄薄的好玻璃。大学里做这个演示时，人要戴耳塞、隔着透明挡板，因为声音太响，碎玻璃也会飞出来。你可千万别自己硬来。',
    },
    {
      nian: '要戴耳塞、隔着挡板？那共振除了震碎杯子，还有别的用处吗？',
      dad: '有好有坏。乐器靠共振让声音更响：吉他的木头琴箱跟着弦一起振动，声音才饱满。可共振也会添乱：一大队人齐步走过桥，脚步的节奏要是对上了桥的固有频率，桥会晃得越来越厉害，所以部队过桥时要便步走，不能齐步走。',
    },
    {
      nian: '我明白了！杯子有自己的固有频率，声音的频率正好对上，杯壁越晃越猛，声音又够大时就会碎，这叫共振。频率对不上，喊得再响也没用。',
      dad: '说得好！用湿手指沿着高脚杯的杯口慢慢转圈，会听到杯子自己“唱”出一个音；往杯里加一点水再转，听听这个音变高了还是变低了。',
    },
  ],
  tip: '互动图里这只杯子的频率按 800 赫兹算，只是示意；真实的玻璃杯大多在几百到一千多赫兹，每只都不一样。用大喇叭震碎杯子的演示声音非常响，只能在有防护的实验室里做。',
  sources: [
    { title: '物理 选择性必修 第一册 · 第二章 机械振动 · 第6节 受迫振动 共振', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Shattering Wineglass（频率最要紧，频率不对再响也没用）', by: 'Harvard Natural Sciences Lecture Demonstrations', url: 'https://sciencedemonstrations.fas.harvard.edu/presentations/shattering-wineglass' },
    { title: 'Breaking Glass with Sound（透明挡板、共振时杯口的振动）', by: 'UCLA Physics & Astronomy', url: 'https://demoweb.physics.ucla.edu/content/50-breaking-glass-sound' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '叮——它的音', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🍷', path: [[400, 480]], size: 230, from: 0 },
          { kind: 'pulse', at: [400, 400], color: '#7a5cc4', radius: 130, from: 1.2 },
          { kind: 'label', at: [440, 380], pos: [720, 230], text: '固有频率', from: 2 },
          { kind: 'sprite', icon: '🗣️', path: [[960, 480]], size: 170, from: 4.4 },
          { kind: 'wave', a: [880, 470], b: [540, 470], amplitude: 10, wavelength: 46, speed: 200, color: '#b9a3e3', from: 5 },
          { kind: 'text', at: [600, 830], text: '频率没对上', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '像推秋千', duration: 12,
        cues: [
          { kind: 'swing', pivot: [340, 170], length: 380, angle: 40, period: 2.6, color: '#e8590c', icon: '🧒', from: 0 },
          { kind: 'sprite', icon: '🍷', path: [[900, 500]], size: 210, wobble: true, from: 4 },
          { kind: 'label', at: [900, 440], pos: [900, 250], text: '杯壁越晃越大', from: 5 },
          { kind: 'text', at: [600, 830], text: '踩在点上：共振', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '先对准频率', duration: 12,
        cues: [
          { kind: 'sprite', icon: '📢', path: [[320, 470]], size: 190, from: 0 },
          { kind: 'wave', a: [420, 460], b: [760, 460], amplitude: 18, wavelength: 50, speed: 220, color: '#7a5cc4', from: 1 },
          { kind: 'sprite', icon: '🍷', path: [[880, 480]], size: 210, wobble: true, from: 0 },
          { kind: 'text', at: [600, 230], text: '相差不到半赫兹', from: 2.6 },
          { kind: 'myth', wrong: '声音大就能震碎杯子', right: '要对准它自己的频率', from: 7 },
        ],
      },
      {
        turn: 3, title: '别自己硬来', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🍷', path: [[420, 480]], size: 210, from: 0 },
          { kind: 'shape', shape: 'rect', at: [660, 470], size: [24, 340], color: '#cfe5f7', outline: true, from: 1 },
          { kind: 'label', at: [660, 400], pos: [880, 260], text: '透明挡板', from: 1.6 },
          { kind: 'sprite', icon: '🧑‍🔬', path: [[900, 520]], size: 170, from: 2.4 },
          { kind: 'text', at: [600, 830], text: '戴耳塞，隔挡板', from: 6 },
        ],
      },
      {
        turn: 4, title: '有好也有坏', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🎸', path: [[300, 470]], size: 220, from: 0 },
          { kind: 'label', at: [300, 470], pos: [300, 700], text: '琴箱跟着振', from: 1 },
          { kind: 'sprite', icon: '🌉', path: [[880, 470]], size: 260, wobble: true, from: 3 },
          { kind: 'label', at: [880, 420], pos: [900, 230], text: '过桥要便步走', from: 4 },
          { kind: 'text', at: [600, 830], text: '共振有好也有坏', from: 7 },
        ],
      },
    ],
  },
};
