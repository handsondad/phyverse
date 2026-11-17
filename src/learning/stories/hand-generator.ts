import type { Story } from './types';

const NPOLE = '#d9480f';
const COPPER = '#c77d3a';
const HOT = '#e8590c';

export const handGenerator: Story = {
  slug: 'hand-generator',
  title: '手摇发电机为什么一摇灯就亮？',
  trigger: '停电的晚上，爸爸翻出一个应急手电筒，里面没装电池。他摇了几下把手，小灯就亮了；一停下来，灯又慢慢暗了。',
  dialogue: [
    {
      nian: '爸爸，这个手电筒没装电池，为什么一摇灯就亮？',
      dad: '因为它里面有一台小发电机。摇把手时，里面的磁铁跟着转，穿过旁边线圈的磁场一会儿多、一会儿少、一会儿换方向，线圈里就生出了电流，送到小灯泡，灯就亮了。这叫电磁感应，是英国科学家法拉第在 1831 年发现的。',
    },
    {
      nian: '磁场一会儿多、一会儿少……那磁铁不动，就没有电了吗？',
      dad: '对，光放着可不行。英国皇家研究院收藏着法拉第当年的装置：一根缠着导线的管子和一根条形磁铁。他让磁铁在管子里来回抽动，电流计的指针就跳起来；磁铁一停，指针就不动了。磁场要变化，才能生出电来。',
      figure: { kind: 'sim', sim: 'generator', caption: '调一调摇的快慢，再换一块更强的磁铁：灯有多亮？电压怎样变？' },
    },
    {
      nian: '磁场要变化……那摇得越快，灯就越亮吗？',
      dad: '是的。摇得越快，穿过线圈的磁场变得越快，生出的电压越高，灯就越亮。换一块更强的磁铁，或者线圈多绕几圈，电压也会更高。美国国家强磁场实验室的互动教程里就能试：磁铁抽得越快、线圈匝数越多，电流计的读数越大。',
    },
    {
      nian: '线圈多绕几圈……那电是藏在发电机里面的吗？',
      dad: '不是藏在里面的。很多人以为发电机里存着电，其实它一点也不存，电是你摇把手的力气变来的：手做的功变成了电能。所以灯亮着的时候再摇，会觉得把手沉了一点，那是线圈里的电流在“顶”着你。一停下来，就一点电也没有了。',
    },
    {
      nian: '一停下来就没有电……那发电厂的电也是这样转出来的吗？',
      dad: '原理一模一样！英国皇家研究院说，几乎所有的电都是按法拉第的原理发出来的：烧煤、烧天然气、核能、水流、风力，都是用来推着发电机转的，只是那里的发电机比手电筒里的大得多。你家里的电，就是远处发电机里的线圈和磁铁转出来的。',
    },
    {
      nian: '我懂了！磁铁和线圈一转起来，穿过线圈的磁场一直在变，线圈里就生出电流，这叫电磁感应。电是摇把手的力气变来的，摇得越快，电压越高。',
      dad: '说得对！要是家里有手摇手电筒，或者自行车上的发电机车灯，试试摇快一点、慢一点，看看灯的亮度怎么变。',
    },
  ],
  tip: '互动图里的电压只是示意。发电厂、变电站和电线杆上的电压很高，千万不要靠近、攀爬。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第5节 磁生电', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: "Michael Faraday's generator（1831 年发现电磁感应；磁铁在线圈里来回抽动产生电流；几乎所有的电都按这个原理发出）", by: 'The Royal Institution（英国皇家研究院）', url: 'https://www.rigb.org/explore-science/explore/collection/michael-faradays-generator' },
    { title: 'Electromagnetic Induction（磁铁动得越快、线圈匝数越多，电流越大）', by: 'Magnet Academy · National MagLab（美国国家强磁场实验室）', url: 'https://nationalmaglab.org/magnet-academy/watch-play/interactive-tutorials/electromagnetic-induction' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一摇就亮', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 470], size: [70, 160], color: COPPER, text: '线圈', from: 0 },
          { kind: 'shape', shape: 'pill', at: [520, 470], size: [220, 60], color: NPOLE, text: 'N  S', motion: 'wiggle', from: 0.5 },
          { kind: 'ray', path: [[300, 390], [300, 260], [860, 260], [860, 400]], color: '#5d4e37', draw: 1, from: 1.5 },
          { kind: 'shape', shape: 'circle', at: [860, 450], size: [100, 100], color: '#fff3b0', tint: { color: '#ffe066', at: 3, over: 1 }, from: 1.5 },
          { kind: 'pulse', at: [860, 450], color: '#ffd43b', radius: 120, from: 3.5 },
          { kind: 'count', at: [600, 640], label: '法拉第发现', start: 1800, end: 1831, unit: '年', from: 5 },
          { kind: 'text', at: [600, 830], text: '这叫电磁感应', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '磁铁要动', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [300, 140], color: '#f3e3cf', text: '线圈', from: 0 },
          { kind: 'shape', shape: 'pill', at: [300, 470], size: [220, 50], color: NPOLE, text: 'N  S', slide: { to: [600, 470], at: 1.5, over: 1.2 }, from: 0.5 },
          { kind: 'meter', at: [600, 270], label: '电流计', start: 0, end: 0.8, color: HOT, over: 1, from: 1.5, to: 4.5 },
          { kind: 'meter', at: [600, 270], label: '电流计', start: 0, end: 0, color: HOT, over: 0.1, from: 5 },
          { kind: 'label', at: [600, 540], pos: [600, 660], text: '一停，指针就不动', from: 5 },
          { kind: 'text', at: [600, 830], text: '磁场要变化才生电', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '越快越亮', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 460], size: [110, 110], color: '#fff3b0', from: 0 },
          { kind: 'shape', shape: 'circle', at: [870, 460], size: [110, 110], color: '#ffe066', motion: 'pulse', from: 1.5 },
          { kind: 'pulse', at: [870, 460], color: '#ffd43b', radius: 140, from: 2 },
          { kind: 'label', at: [330, 520], pos: [330, 650], text: '摇得慢', from: 1 },
          { kind: 'label', at: [870, 520], pos: [870, 650], text: '摇得快', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '磁铁强、匝数多也更亮', from: 7 },
        ],
      },
      {
        turn: 3, title: '力气变成电', duration: 12,
        cues: [
          { kind: 'sprite', icon: '✋', path: [[300, 440]], size: 140, wobble: true, from: 0 },
          { kind: 'arrow', path: [[420, 440], [740, 440]], color: HOT, text: '做功变成电能', draw: 0.8, from: 1.5 },
          { kind: 'sprite', icon: '💡', path: [[860, 440]], size: 140, from: 2.5 },
          { kind: 'myth', wrong: '发电机里藏着电', right: '电是手摇的力气变来的', from: 7 },
        ],
      },
      {
        turn: 4, title: '发电厂也一样', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏭', path: [[260, 440]], size: 130, from: 0.5 },
          { kind: 'sprite', icon: '🌊', path: [[480, 440]], size: 130, from: 1.2 },
          { kind: 'sprite', icon: '💨', path: [[700, 440]], size: 130, from: 1.9 },
          { kind: 'sprite', icon: '⚡', path: [[940, 440]], size: 130, from: 3 },
          { kind: 'label', at: [700, 500], pos: [600, 640], text: '都推着发电机转', from: 4 },
          { kind: 'text', at: [600, 830], text: '家里的电是转出来的', from: 7.5 },
        ],
      },
    ],
  },
};
