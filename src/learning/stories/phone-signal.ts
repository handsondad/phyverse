import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const EM = '#7048e8';

export const phoneSignal: Story = {
  slug: 'phone-signal',
  title: '手机信号是怎么飞到手机里的？',
  trigger: '周末，小念用爸爸的手机给老家的奶奶打视频电话。奶奶离得很远很远，屏幕里的她却像就在眼前，说话一点都不卡。',
  dialogue: [
    {
      nian: '爸爸，中间又没有电线，我的声音是怎么飞到奶奶手机里的？',
      dad: '靠的是一种看不见的波，叫电磁波。手机先把你的声音变成电信号，再用里面的天线变成电磁波发出去。附近的基站收到后，一站接一站往前传，最后由奶奶那边的基站发给她的手机，手机再把它变回声音。课本里说，手机既能发射电磁波，也能接收电磁波。',
    },
    {
      nian: '一站接一站往前传……电磁波跑得有多快？',
      dad: '和光一样快，因为光本身也是一种电磁波。课本里说，电磁波在真空中每秒大约走 30 万公里，一秒钟能绕地球七圈半。所以哪怕奶奶在一千多公里外，电磁波在路上也只要几百分之一秒，你们说话几乎感觉不到等待。',
    },
    {
      nian: '光本身也是一种电磁波……那我为什么看不见手机发出的电磁波？',
      dad: '因为眼睛只认得电磁波里很窄的一小段，就是可见光。电磁波是一大家子，按波长从长到短排队：无线电波、微波、红外线、可见光、紫外线、X 光。手机信号用的是无线电波和微波这一段，波长比可见光长得多，眼睛对它们没反应。美国航天局的科普也是这样排的。',
    },
    {
      nian: '眼睛对它们没反应……那为什么一进电梯，手机就没信号了？',
      dad: '因为金属会把电磁波反射回去。电梯四面大多是铁皮，像一个金属盒子把手机罩住，外面的电磁波很难进来，里面的也很难出去。砖墙、木门只会挡掉一部分，信号弱一点还能用。美国食品药品监督管理局也说，微波碰到金属会被反射回去。',
      figure: { kind: 'sim', sim: 'signal', caption: '换个地方打电话：隔着砖墙、关进铁皮电梯，信号会怎样？' },
    },
    {
      nian: '会被反射回去……那手机信号是不是也像声音一样，要靠空气才能传？',
      dad: '不用，这正是它和声音最大的不同。声音要靠空气、水这些东西一下下推着往前传，太空里没有空气，就听不到声音。电磁波在真空里照样能跑，所以太阳光能穿过太空照到地球，卫星的信号也能从太空传下来。很多人以为手机传的是声音，其实传的是电磁波。',
    },
    {
      nian: '我懂了！手机把声音变成电信号，再变成电磁波发出去，基站一站站接力。电磁波跑得和光一样快，碰到金属会被挡回来，所以电梯里没信号。',
      dad: '说得对！下次坐电梯时看看手机上的信号格：门一关、门一开，它是不是跟着变？',
    },
  ],
  tip: '在电梯里看看信号格就好，不用特意打电话；电梯运行时要站稳扶好。互动图和动画里画出来的电磁波只是示意，真实的电磁波是看不见的。',
  sources: [
    { title: '物理 九年级 · 第二十一章 信息的传递 · 第2节 电磁波的海洋（手机既能发射又能接收电磁波；电磁波在真空中的速度约 3×10⁸ m/s）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Tour of the Electromagnetic Spectrum · Radio Waves（无线电波是电磁波谱里波长最长的一段）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/ems/05_radiowaves/' },
    { title: 'Tour of the Electromagnetic Spectrum · Microwaves（微波是无线电频段的高频端，通信卫星用它传信号）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/ems/06_microwaves/' },
    { title: 'Microwave Ovens（微波会被金属反射；微波也用来传送电话和电视信号）', by: 'U.S. FDA（美国食品药品监督管理局）', url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-oven-radiation' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '声音变成电磁波', duration: 12,
        cues: [
          { kind: 'sprite', icon: '📱', path: [[230, 470]], size: 130, from: 0 },
          { kind: 'sprite', icon: '📡', path: [[600, 400]], size: 150, from: 0.5 },
          { kind: 'sprite', icon: '📱', path: [[970, 470]], size: 130, from: 1 },
          { kind: 'pulse', at: [230, 470], color: EM, radius: 180, from: 1.5 },
          { kind: 'flow', path: [[290, 450], [550, 410]], color: EM, count: 4, speed: 220, from: 2 },
          { kind: 'flow', path: [[650, 410], [910, 450]], color: EM, count: 4, speed: 220, from: 3.5 },
          { kind: 'label', at: [600, 330], pos: [820, 220], text: '基站接力', from: 3 },
          { kind: 'text', at: [600, 830], text: '声音→电信号→电磁波', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '跟光一样快', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[600, 540]], size: 220, from: 0 },
          { kind: 'ray', path: circle(600, 540, 160), color: EM, draw: 1.5, from: 3 },
          { kind: 'count', at: [600, 250], label: '每秒约走', start: 0, end: 30, unit: '万公里', from: 1.5 },
          { kind: 'text', at: [600, 830], text: '一秒绕地球七圈半', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '电磁波一大家子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [150, 460], size: [170, 70], color: '#d0bfff', text: '无线电波', from: 0 },
          { kind: 'shape', shape: 'pill', at: [330, 460], size: [150, 70], color: '#b197fc', text: '微波', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [500, 460], size: [150, 70], color: '#ffa8a8', text: '红外线', from: 0.8 },
          { kind: 'shape', shape: 'pill', at: [670, 460], size: [150, 70], color: '#ffd43b', text: '可见光', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [840, 460], size: [150, 70], color: '#9775fa', text: '紫外线', from: 1.6 },
          { kind: 'shape', shape: 'pill', at: [1010, 460], size: [150, 70], color: '#adb5bd', text: 'X 光', from: 2 },
          { kind: 'label', at: [240, 500], pos: [240, 640], text: '手机用这一段', from: 3.5 },
          { kind: 'label', at: [670, 500], pos: [760, 640], text: '眼睛只看得见这段', from: 5 },
        ],
      },
      {
        turn: 3, title: '金属挡住信号', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [480, 460], size: [340, 420], color: '#495057', outline: true, from: 0 },
          { kind: 'sprite', icon: '📱', path: [[480, 480]], size: 110, from: 0.5 },
          { kind: 'pulse', at: [480, 480], color: EM, radius: 140, from: 1 },
          { kind: 'arrow', path: [[1060, 400], [670, 400], [1000, 560]], color: EM, text: '被反射回去', draw: 0.8, from: 2.5 },
          { kind: 'label', at: [480, 250], pos: [800, 200], text: '铁皮电梯', from: 1.5 },
          { kind: 'text', at: [600, 830], text: '铁皮电梯里没信号', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '不用空气也能传', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[220, 330]], size: 150, from: 0 },
          { kind: 'ray', path: [[300, 360], [920, 520]], color: '#f59f00', draw: 1.2, from: 1 },
          { kind: 'sprite', icon: '🌍', path: [[1000, 560]], size: 190, from: 0.5 },
          { kind: 'sprite', icon: '🛰️', path: [[760, 250]], size: 90, from: 2.5 },
          { kind: 'label', at: [600, 440], pos: [560, 260], text: '真空里照样跑', from: 2 },
          { kind: 'myth', wrong: '手机信号是声音在空中传', right: '是看不见的电磁波', from: 7 },
        ],
      },
    ],
  },
};
