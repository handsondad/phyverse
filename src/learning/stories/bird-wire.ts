import type { Story } from './types';

const WIRE = '#5d4e37';
const HOT = '#e8590c';

export const birdWire: Story = {
  slug: 'bird-wire',
  title: '小鸟站在高压线上为什么不触电？',
  trigger: '放学路上，小念看见一排麻雀站在电线上叽叽喳喳，一点事也没有。可大人总说，碰到电线会触电。',
  dialogue: [
    {
      nian: '爸爸，小鸟站在高压线上，为什么不会触电？',
      dad: '因为电流要靠电压差来推。电线和大地之间有很高的电压，可小鸟的两只脚踩在同一根电线上，脚和脚之间几乎没有电压差，电荷没有理由绕道从小鸟身上走，照样顺着电线往前跑。没有电流穿过身体，小鸟就安然无恙。',
    },
    {
      nian: '几乎没有电压差？那如果小鸟碰到别的东西呢？',
      dad: '那就危险了。哈佛大学的物理演示里讲，要是小鸟同时碰到另一根电线，两根线之间有电压差，电流就会穿过它的身体；美国地质调查局的资料也说，翅膀同时碰到电线和接地的金属，鸟就会触电。所以电线之间要隔得远远的。',
      figure: { kind: 'sim', sim: 'bird', caption: '换一换小鸟碰到的东西：电流会不会穿过它的身体？' },
    },
    {
      nian: '电线之间要隔得远远的……那人为什么碰一下电线就会触电？',
      dad: '因为人几乎总是站在地上。麻省理工学院的科普里说，人的身体很容易导电，手碰到电线、脚踩着大地，电流就从电线穿过身体流进大地，正好连成一条路。很多人以为碰到电线就会触电，其实关键是身体两头有没有电压差、能不能连成通路。',
    },
    {
      nian: '连成一条路……那放风筝时，风筝线挂上电线会怎么样？',
      dad: '非常危险！风筝线一头挂在电线上，一头攥在你手里，电线、风筝线、人和大地就连成了一条路。风筝线被雨水、露水打湿，更容易导电。所以要到空旷的地方放风筝，远离电线；风筝挂到电线上，千万别去拽，要请供电部门来处理。',
    },
    {
      nian: '远离电线……那爬上去修电线的工人，为什么不怕？',
      dad: '他们穿着特制的绝缘衣服、戴着厚厚的绝缘手套，工具也包着绝缘材料，电流很难穿过去。麻省理工学院的科普还提到，有的工人吊在直升机下面去修高压线：他和直升机都不碰大地，只碰一根线，就像那只小鸟一样。这是受过专门训练的工作，普通人千万别学。',
    },
    {
      nian: '我懂了！小鸟两只脚站在同一根电线上，脚和脚之间没有电压差，就没有电流穿过身体。要是同时碰到两根线，或者碰到电线和大地，电流就会穿过身体。',
      dad: '说得对！出门时看看路边的电线杆，数一数上面有几根线、彼此隔得多远，再想想为什么要离得那么远。',
    },
  ],
  tip: '互动图只是示意，各条电线的电压不一样。看到掉在地上的电线，要远远躲开，马上告诉大人并联系供电部门，千万不要靠近，也不要用竹竿之类的东西去挑。',
  sources: [
    { title: '物理 九年级全一册 · 第十六章 电压 电阻 · 第1节 电压；第十九章 生活用电 · 第3节 安全用电', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'How do birds sit on high-voltage power lines without getting electrocuted?（两脚电势相同；人站在地上碰电线会形成通路）', by: 'MIT School of Engineering（麻省理工学院）', url: 'https://engineering.mit.edu/ask-an-engineer/how-do-birds-sit-on-high-voltage-power-lines-without-getting-electrocuted/' },
    { title: 'Bird on a High-Voltage Transmission Line（跨到另一根线就会有电流）', by: 'Harvard Natural Sciences Lecture Demonstrations（哈佛大学）', url: 'https://sciencedemonstrations.fas.harvard.edu/presentations/bird-high-voltage-transmission-line' },
    { title: 'Electrocution（翅膀连通带电导线和接地金属时鸟会触电）', by: 'U.S. Geological Survey（美国地质调查局）', url: 'https://www.usgs.gov/publications/electrocution' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '两脚没有电压差', duration: 12,
        cues: [
          { kind: 'bond', a: [60, 400], b: [1140, 400], color: WIRE, from: 0 },
          { kind: 'sprite', icon: '🐦', path: [[600, 360]], size: 130, from: 0.5 },
          { kind: 'flow', path: [[60, 400], [1140, 400]], color: '#ffd43b', count: 8, speed: 220, from: 2 },
          { kind: 'label', at: [600, 410], pos: [600, 580], text: '两脚之间没电压差', from: 3 },
          { kind: 'text', at: [600, 830], text: '电流照样走电线', from: 7 },
        ],
      },
      {
        turn: 1, title: '碰到两根线', duration: 12,
        cues: [
          { kind: 'bond', a: [60, 320], b: [1140, 320], color: WIRE, from: 0 },
          { kind: 'bond', a: [60, 540], b: [1140, 540], color: WIRE, from: 0 },
          { kind: 'sprite', icon: '🐦', path: [[600, 500]], size: 120, from: 0.5 },
          { kind: 'arrow', path: [[640, 470], [690, 335]], color: HOT, text: '翅膀碰到', draw: 0.6, from: 2.5 },
          { kind: 'pulse', at: [690, 320], color: HOT, radius: 60, from: 3.2 },
          { kind: 'text', at: [600, 830], text: '电线要隔得远', from: 7 },
        ],
      },
      {
        turn: 2, title: '人站在地上', duration: 12,
        cues: [
          { kind: 'bond', a: [60, 420], b: [1140, 420], color: WIRE, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 685], size: [1100, 44], color: '#cfe0b4', text: '大地', from: 0 },
          { kind: 'sprite', icon: '🙋', path: [[420, 545]], size: 240, from: 0.5 },
          { kind: 'flow', path: [[380, 420], [420, 545], [420, 665]], color: HOT, count: 6, speed: 220, from: 2.5 },
          { kind: 'label', at: [380, 420], pos: [760, 300], text: '手碰电线、脚踩地', from: 2 },
          { kind: 'myth', wrong: '碰到电线就会触电', right: '身体两头有电压差才有电流', from: 7 },
        ],
      },
      {
        turn: 3, title: '风筝线挂上电线', duration: 12,
        cues: [
          { kind: 'bond', a: [60, 330], b: [1140, 330], color: WIRE, from: 0 },
          { kind: 'sprite', icon: '🪁', path: [[830, 200]], size: 110, from: 0.5 },
          { kind: 'bond', a: [300, 600], b: [820, 230], color: '#8b7a5c', from: 1 },
          { kind: 'sprite', icon: '🧒', path: [[270, 650]], size: 160, from: 0.5 },
          { kind: 'pulse', at: [679, 330], color: HOT, radius: 60, from: 3 },
          { kind: 'text', at: [600, 830], text: '远离电线放风筝', from: 7 },
        ],
      },
      {
        turn: 4, title: '只碰一根线', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🚁', path: [[600, 220]], size: 150, from: 0 },
          { kind: 'bond', a: [600, 280], b: [600, 410], color: '#8b7a5c', from: 1 },
          { kind: 'sprite', icon: '👷', path: [[600, 460]], size: 120, from: 1.5 },
          { kind: 'bond', a: [60, 530], b: [1140, 530], color: WIRE, from: 0 },
          { kind: 'label', at: [640, 470], pos: [920, 650], text: '不碰大地', from: 3 },
          { kind: 'text', at: [600, 830], text: '受过训练，千万别学', from: 7 },
        ],
      },
    ],
  },
};
