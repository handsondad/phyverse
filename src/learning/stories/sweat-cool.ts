import type { Story } from './types';

export const sweatCool: Story = {
  slug: 'sweat-cool',
  title: '出了汗，为什么风一吹特别凉？',
  trigger: '体育课跑完八百米，小念满头大汗地冲到电风扇前面，风一吹，凉得直打哆嗦。',
  dialogue: [
    {
      nian: '爸爸，电风扇吹出来的风明明不冷，为什么吹在身上那么凉？',
      dad: '风本身确实不冷，跟屋里的空气一样暖。凉快的秘密在你身上的汗水：汗水变成水汽飞走的时候，要从皮肤上带走热，这叫蒸发吸热。风一吹，飞走的水汽多了，带走的热也多，你就觉得凉。',
    },
    {
      nian: '汗水蒸发还要带走热？为什么风一吹，它就飞得更快呢？',
      dad: '汗水里的水分子一直在乱跑，跑得最快的那几个会冲出水面，变成水汽。没风的时候，这些水汽堆在皮肤旁边，有的又落回汗里；风一来，把它们吹走，换来干一点的空气，水分子就跑得更痛快。天越热，蒸发也越快。',
      figure: { kind: 'sim', sim: 'evaporation', caption: '拖动汗水的温度，再打开风：看橙色的水分子飞走得快不快，蒸发快慢有几颗星。' },
    },
    {
      nian: '风会换来干一点的空气……那在空屋子里开着电扇，屋子会变凉吗？',
      dad: '不会。很多人以为电扇能把屋子吹凉，其实它只是让空气动起来，屋里的温度一点没降，电动机转起来还会发一点热。美国“能源之星”的节能建议里就写着：电扇凉快的是人，不是屋子，人走了就关掉。',
    },
    {
      nian: '电扇凉快的是人？那汗水蒸发掉，到底能带走多少热呢？',
      dad: '比你想的多得多！按美国国家标准与技术研究院的水的数据算，1 克汗水在皮肤上蒸发，大约要带走 2400 焦的热，差不多够把 6 克冰水一直烧到开。跑步时身体热得快，就靠一身汗慢慢把热运走。',
    },
    {
      nian: '身体靠汗水运走热？那闷热的雨天，为什么出了汗还是黏黏的不凉快？',
      dad: '因为空气里本来就有很多水汽，湿乎乎的。汗水想变成水汽飞出去，外面却挤得满满的，蒸发得很慢，热就运不走，汗只能挂在身上。所以又湿又热的天特别难受，也更容易中暑，要多喝水、找阴凉的地方歇一歇。',
    },
    {
      nian: '我懂了！风本身不冷，是它帮汗水蒸发得更快，蒸发要从皮肤上带走热，所以吹着凉。电扇凉快的是人，不是屋子；空气太潮湿时，汗不容易蒸发，就不凉快。',
      dad: '说得好！在两只手背上各抹一点清水，只对着一只手轻轻吹气：哪只手先干？哪只手觉得更凉？',
    },
  ],
  tip: '“1 克汗水蒸发大约带走 2400 焦”是按美国国家标准与技术研究院（NIST）水的数据，在皮肤温度附近估算的；“6 克冰水”只是帮助想象的比方。互动图里蒸发的快慢是示意。天气又湿又热时，电扇的效果有限，要注意防暑。',
  sources: [
    { title: '物理 八年级上册 · 第三章 物态变化 · 第3节 汽化和液化', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Ceiling Fan Installation and Usage Tips（Ceiling fans cool people, not rooms）', by: 'ENERGY STAR · U.S. EPA', url: 'https://www.energystar.gov/products/ceiling_fans/installation-and-usage-tips' },
    { title: 'Thermophysical Properties of Fluid Systems（水的饱和性质）', by: 'NIST Chemistry WebBook', url: 'https://webbook.nist.gov/chemistry/fluid/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '汗水带走热', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[420, 480]], size: 200, from: 0 },
          { kind: 'flow', path: [[1100, 420], [620, 420]], color: '#8fb8d8', count: 8, speed: 220, from: 1 },
          { kind: 'particles', box: [290, 220, 260, 160], count: 14, color: '#3a7bb5', motion: 'rise', from: 2 },
          { kind: 'label', at: [420, 300], pos: [760, 230], text: '汗水变成水汽飞走', from: 2.6 },
          { kind: 'text', at: [600, 820], text: '蒸发要从皮肤上带走热', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '风把水汽吹走', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [1000, 60], color: '#f4c7a1', text: '皮肤', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 645], size: [1000, 30], color: '#bfe0f5', from: 0 },
          { kind: 'particles', box: [200, 410, 800, 180], count: 14, color: '#e8590c', motion: 'rise', from: 0.8 },
          { kind: 'flow', path: [[150, 420], [1050, 420]], color: '#8fb8d8', count: 10, speed: 260, from: 4 },
          { kind: 'meter', at: [600, 240], label: '蒸发快慢', start: 0.3, end: 0.85, color: '#e8590c', from: 4, over: 2 },
          { kind: 'text', at: [600, 820], text: '风一吹，飞走得更快', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '空屋子开电扇', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [760, 380], color: '#fffaf0', outline: true, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 360], size: [180, 180], color: '#cfe5f7', text: '电扇', motion: 'wiggle', from: 0.5 },
          { kind: 'flow', path: [[700, 360], [920, 360]], color: '#8fb8d8', count: 6, speed: 200, from: 1 },
          { kind: 'meter', at: [600, 530], label: '屋里温度', start: 0.6, end: 0.6, color: '#e8590c', from: 2 },
          { kind: 'myth', wrong: '风本身是冷的', right: '风帮汗水带走热', from: 6.4 },
        ],
      },
      {
        turn: 3, title: '能带走多少热', duration: 12,
        cues: [
          { kind: 'sprite', icon: '💧', path: [[300, 420]], size: 150, from: 0.4 },
          { kind: 'label', at: [300, 470], pos: [300, 620], text: '1 克汗水蒸发', from: 1 },
          { kind: 'count', at: [800, 380], label: '带走的热', start: 0, end: 2400, unit: '焦', from: 2, over: 2.5 },
          { kind: 'text', at: [600, 800], text: '够把 6 克冰水烧开', from: 6 },
        ],
      },
      {
        turn: 4, title: '闷热天不凉快', duration: 12,
        cues: [
          { kind: 'particles', box: [120, 180, 960, 320], count: 40, color: '#3a7bb5', motion: 'gas', from: 0 },
          { kind: 'sprite', icon: '🥵', path: [[600, 560]], size: 160, from: 1 },
          { kind: 'label', at: [800, 340], pos: [930, 200], text: '水汽挤得满满的', from: 2 },
          { kind: 'text', at: [600, 820], text: '多喝水，找阴凉歇一歇', from: 6.5 },
        ],
      },
    ],
  },
};
