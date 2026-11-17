import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const PULL = '#3553a6';
const HOT = '#e8590c';

export const spaceFloat: Story = {
  slug: 'space-float',
  title: '空间站离地球不远，航天员为什么会飘？',
  trigger: '小念在看“天宫课堂”的回放：王亚平老师把冰墩墩轻轻一推，它没有往下掉，而是一直往前飘，飘到了叶光富叔叔的手里。',
  dialogue: [
    {
      nian: '爸爸，冰墩墩为什么不掉下来，一直往前飘？空间站里没有重力吗？',
      dad: '有重力，而且还不小。中国空间站离地面约 400 公里，跟地球的大小比起来很近，那里地球的引力还有地面的大约九成。冰墩墩会飘，是因为空间站、航天员和冰墩墩都在一起绕着地球“往下掉”，掉得一样快，谁也压不着谁，看起来就飘起来了。',
    },
    {
      nian: '谁也压不着谁……这跟坐电梯有关系吗？',
      dad: '有！电梯刚往下加速时，你会觉得身子一轻，站在体重计上，读数也会变小，这叫失重。要是电梯整个自由下落，你和电梯掉得一样快，脚下一点也不托你，体重计的读数就变成 0，这叫完全失重。空间站里，一直都是完全失重。',
      figure: { kind: 'sim', sim: 'elevator', caption: '把电梯的加速度往下调，一直调到 -9.8：体重计的读数会怎样？' },
    },
    {
      nian: '一直都是完全失重……那冰墩墩为什么沿直线飘，不拐弯？',
      dad: '因为在舱里看，没有东西托它、拉它，让它改变运动。课本里的牛顿第一定律说，物体不受力时，会保持静止或匀速直线运动。王亚平老师轻轻一推，冰墩墩就近似匀速直线地飘过去。在地面上，它早就被重力拉着划一道弧线，掉到地上了。',
    },
    {
      nian: '划一道弧线掉到地上……那空间站飞得有多快？',
      dad: '快极了！美国航天局说，国际空间站每小时要飞两万八千公里左右，差不多每秒 7.8 公里，一个半小时左右就绕地球一圈。正是这么快的速度，让它往下掉多少，地面就弯走多少，一直掉不到地上。很多人以为空间站里没有重力，其实它一直在“往下掉”。',
    },
    {
      nian: '一直在往下掉……那航天员在太空里待久了，身体会怎样？',
      dad: '美国航天局说，在失重里，骨头和肌肉不用使劲撑着身体，时间长了会变弱。所以航天员在空间站里每天都要坚持锻炼。回到地面后，他们也要休养一段时间，让身体重新适应重力，才能像平常一样走路。',
    },
    {
      nian: '我懂了！空间站里有重力，只是航天员和空间站一起绕着地球往下掉，掉得一样快，谁也不托谁，所以都飘起来了，这叫完全失重。',
      dad: '说得对！在纸杯底扎个小孔，装上水，水会往下流；让杯子自由落下时，水就不流了——这就是失重。这个实验去室外或水池边做。',
    },
  ],
  tip: '做纸杯落水实验要在室外或水池边，别把地面弄湿滑倒。空间站离地面的高度会有变化，约 400 公里是大约的数。',
  sources: [
    { title: '物理 必修 第一册 · 第四章 运动和力的关系 · 第6节 超重和失重', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第4节 宇宙航行', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '“天宫课堂”再次开讲 太空授课，深播科学种子（空间站距离地球约 400 公里；冰墩墩近似匀速直线运动）', by: '中国载人航天官方网站（转载人民日报）', url: 'https://www.cmse.gov.cn/kpjy/tgkt/mtjj_918/202205/t20220514_49793.html' },
    { title: 'What Is Microgravity?（空间站高度处引力约为地面的九成；一起自由下落所以飘；骨骼肌肉会变弱）', by: 'NASA（美国航天局）', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一起往下掉', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[600, 600]], size: 260, from: 0 },
          { kind: 'sprite', icon: '🛰️', path: [[600, 290]], size: 120, from: 0.5 },
          { kind: 'arrow', path: [[600, 350], [600, 450]], color: PULL, text: '引力约九成', draw: 0.5, from: 1.5 },
          { kind: 'count', at: [960, 300], label: '离地面约', start: 0, end: 400, unit: '公里', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '一起往下掉，谁也不压谁', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '电梯里的失重', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 450], size: [260, 380], color: '#f6efe4', outline: true, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[520, 480]], size: 140, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [520, 610], size: [140, 30], color: '#d8dee6', text: '体重计', from: 0.5 },
          { kind: 'arrow', path: [[760, 300], [760, 520]], color: HOT, text: '自由下落', draw: 0.6, from: 2 },
          { kind: 'meter', at: [960, 400], label: '脚下托的力', start: 1, end: 0, color: PULL, over: 2.5, from: 2.5 },
          { kind: 'text', at: [600, 830], text: '读数变成 0：完全失重', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '冰墩墩走直线', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧑‍🚀', path: [[170, 470]], size: 130, from: 0 },
          { kind: 'sprite', icon: '🧑‍🚀', path: [[1030, 470]], size: 130, from: 0 },
          { kind: 'sprite', icon: '🐼', path: [[260, 450], [940, 450]], size: 90, travel: 5, from: 1 },
          { kind: 'arrow', path: [[300, 560], [900, 560]], color: '#4dabf7', text: '近似匀速直线', draw: 0.8, from: 3 },
          { kind: 'text', at: [600, 830], text: '没有东西让它改变运动', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '飞得飞快', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[560, 480]], size: 230, from: 0 },
          { kind: 'ray', path: circle(560, 480, 210), color: '#ffd43b', draw: 2, from: 1 },
          { kind: 'sprite', icon: '🛰️', path: circle(560, 480, 210), size: 60, travel: 6, from: 2 },
          { kind: 'count', at: [990, 300], label: '每秒约飞', start: 0, end: 7.8, unit: '公里', from: 2.5 },
          { kind: 'myth', wrong: '空间站里没有重力', right: '它一直在绕着地球往下掉', from: 7 },
        ],
      },
      {
        turn: 4, title: '天天锻炼', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏃', path: [[380, 470]], size: 170, from: 0 },
          { kind: 'sprite', icon: '🦴', path: [[800, 420]], size: 100, from: 1 },
          { kind: 'sprite', icon: '💪', path: [[960, 520]], size: 100, from: 1.5 },
          { kind: 'label', at: [880, 470], pos: [900, 690], text: '不使劲就会变弱', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '每天都要坚持锻炼', from: 7.5 },
        ],
      },
    ],
  },
};
