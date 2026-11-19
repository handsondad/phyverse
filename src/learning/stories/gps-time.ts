import type { Story } from './types';

const SPACE = '#1e2a4a';
const BLUE = '#3553a6';
const GOLD = '#ffb703';
const HOT = '#e8590c';

export const gpsTime: Story = {
  slug: 'gps-time',
  title: '跑得越快时间越慢是真的吗？手机导航为什么要管相对论？',
  trigger: '爸爸开车快到高架岔路口时，手机导航提前喊道：“请走右侧第二条车道。”小念盯着屏幕上的小蓝点，好奇它怎么能算得几米都不差。',
  dialogue: [
    {
      nian: '爸爸，科幻片里说跑得越快时间流逝越慢，这是真的吗？还是编出来的故事？',
      dad: '千真万确！这是爱因斯坦在一百多年前提出的相对论，而且它一点也不遥远——咱们车上这台正在指路的手机导航，每一秒钟都得把相对论算进去，不然今天咱们早就开到十公里外的庄稼地里去啦！',
    },
    {
      nian: '手机导航只是给人指路的，为什么还要管时间快慢？',
      dad: '因为卫星导航本质上就是在“拿时间量距离”！天上离地面约 2 万公里的地方飞着几十颗导航卫星，每颗卫星肚子里都装着极准的原子钟，不停往下发带时间戳的无线电信号。信号以每秒 30 万公里的光速飞到手机里，只要钟差了百万分之一秒，也就是 1 微秒，算出来的距离就会偏出 300 米！',
    },
    {
      nian: '差 1 微秒就偏出 300 米！那卫星上的原子钟，跟地面的钟走得不一样快吗？',
      dad: '真的不一样快，而且同时受两件事拉扯！第一件归狭义相对论管：卫星以每秒近 4 公里的速度绕地球飞奔，飞得快让它的钟比地面每天慢约 7 微秒。第二件归广义相对论管：2 万公里高空的地球引力比地面弱得多，引力越弱时间走得越快，又让它的钟比地面每天快约 45 微秒！',
      figure: { kind: 'sim', sim: 'relativityClock', caption: '先选“完全不校正相对论”，把时间拖到 24 小时看地图歪出多远；再切到“速度和高空两项都校正”试试！' },
    },
    {
      nian: '一边慢约 7 微秒，一边快约 45 微秒……合起来卫星的钟每天快了多少？',
      dad: '美国国家标准与技术研究院算得清清楚楚：快 45 微秒减去慢 7 微秒，卫星上的原子钟每天比地面净快约 38 微秒！可别小瞧这眨眼都算不上的 38 微秒，乘上光速，导航定位短短两分钟就不准了，一天下来足足会歪出去约 11 公里，连你在哪个区都分不清。',
      eq: '+45 μs − 7 μs = +38 μs / 天',
    },
    {
      nian: '一天歪出去约 11 公里！那工程师怎么让天上的卫星钟和地面的钟对齐呢？',
      dad: '办法特别巧妙！工程师在火箭发射之前，就故意把卫星原子钟走字的步调稍微调慢一点点；等卫星升到 2 万公里高空飞起来，相对论刚好把它“催快”那 38 微秒，从地面上看就分秒不差了！手机里的导航芯片还会边收信号边做精细修正，无论是北斗还是全球定位系统都离不开这一步。',
    },
    {
      nian: '我明白了！跑得越快时间越慢、高处引力越弱时间越快都是真的：导航卫星的钟每天净快约 38 微秒，不按相对论校正一天就会偏出约 11 公里，我们每天看导航都在验证爱因斯坦的发现！',
      dad: '说得太棒了！平时走路坐车速度太慢，慢掉的时间连一眨眼的亿万分之一都不到，所以你感觉不出来；可一旦用上光速和原子钟，大自然藏着的规矩就清清楚楚现身啦。',
    },
  ],
  tip: '1 微秒等于百万分之一秒（0.000001 秒），1 纳秒等于十亿分之一秒；现代北斗与 GPS 卫星定位要求钟差控制在二三十纳秒以内。乘车看手机导航演示时，请由坐在后排的家人操作，驾驶员专心看路。',
  sources: [
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第5节 相对论时空观与牛顿力学的局限性（时间延缓效应与卫星导航修正）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Putting Einstein to the Test（导航卫星原子钟狭义相对论每天慢 7 微秒、广义相对论每天快 45 微秒、净快 38 微秒）', by: '美国国家标准与技术研究院（NIST）', url: 'https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test' },
    { title: 'General Relativity Centennial Brochure（2 万公里轨道导航卫星相对论时钟修正原理）', by: 'NASA / 美国物理学会（APS）', url: 'https://assets.science.nasa.gov/content/dam/science/astro/programs/physics-of-the-cosmos/documents/brochures-factsheets/april-2016-aps/GR_Centennial_Brochure-Mar2016-final.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '导航离不开相对论', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🛰️', path: [[260, 270], [880, 270]], size: 110, travel: 5, from: 0.3 },
          { kind: 'sprite', icon: '🚗', path: [[600, 560]], size: 120, from: 0.6 },
          { kind: 'ray', path: [[560, 300], [600, 510]], color: GOLD, draw: 0.8, from: 1.8 },
          { kind: 'myth', wrong: '相对论只是离生活很远的纯理论', right: '手机导航每秒都在用相对论算路', from: 6 },
        ],
      },
      {
        turn: 1, title: '差1微秒偏300米', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 260], size: [900, 140], color: SPACE, from: 0.2 },
          { kind: 'sprite', icon: '🛰️', path: [[320, 260]], size: 96, from: 0.5 },
          { kind: 'count', at: [760, 260], label: '轨道高约', start: 0, end: 2, unit: '万公里', from: 1.2 },
          { kind: 'count', at: [380, 540], label: '光速每秒', start: 0, end: 30, unit: '万公里', from: 2.2 },
          { kind: 'count', at: [820, 540], label: '1微秒跑', start: 0, end: 300, unit: '米', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '拿光跑的时间算距离，分毫不差', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '一慢一快两笔账', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🛰️', path: [[240, 340], [920, 340]], size: 100, travel: 4.5, from: 0.4 },
          { kind: 'count', at: [360, 540], label: '飞得快每天慢', start: 0, end: 7, unit: '微秒', from: 1.2 },
          { kind: 'count', at: [840, 540], label: '引力弱每天快', start: 0, end: 45, unit: '微秒', from: 2.8 },
          { kind: 'text', at: [600, 810], text: '高空引力弱，钟反而走得更快', from: 7 },
        ],
      },
      {
        turn: 3, title: '净快38微秒', duration: 11,
        cues: [
          { kind: 'count', at: [360, 380], label: '每天净快约', start: 0, end: 38, unit: '微秒', from: 0.6 },
          { kind: 'count', at: [840, 380], label: '一天歪出约', start: 0, end: 11, unit: '公里', from: 2.2 },
          { kind: 'meter', at: [600, 580], label: '定位偏差', start: 5, end: 90, over: 3, color: HOT, from: 3 },
          { kind: 'text', at: [600, 810], text: '不校正相对论，两分钟就指错路', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '上天前先调慢', duration: 10,
        cues: [
          { kind: 'shape', shape: 'circle', at: [360, 440], size: [200, 200], color: BLUE, text: '卫星钟', from: 0.4 },
          { kind: 'arrow', path: [[490, 440], [710, 440]], color: GOLD, text: '发射上天', from: 1.6 },
          { kind: 'shape', shape: 'circle', at: [840, 440], size: [200, 200], color: '#2f9e44', text: '天地同步', from: 2.6 },
          { kind: 'label', at: [360, 560], pos: [360, 670], text: '地面故意调慢一点点', from: 1.8 },
          { kind: 'text', at: [600, 810], text: '北斗和全球定位系统都这么校正', from: 6 },
        ],
      },
    ],
  },
};
