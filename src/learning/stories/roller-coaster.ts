import type { Story } from './types';

export const rollerCoaster: Story = {
  slug: 'roller-coaster',
  title: '过山车没有发动机，为什么能冲上第二个坡？',
  trigger: '游乐场里，过山车被链条“咔嗒咔嗒”慢慢拉上最高的坡，一松开就带着尖叫冲下去，又冲上了第二个坡，一路上都没听见发动机响。',
  dialogue: [
    {
      nian: '爸爸，过山车没有发动机，是什么推着它冲上第二个坡的？',
      dad: '是它自己冲下来攒的速度。开头那段，链条把车慢慢拉上最高的坡，把能量存成了高度，这叫重力势能。一松开，车往下冲，高度换成了速度，也就是动能；冲到坡底最快，再往上冲，速度又换回了高度。',
    },
    {
      nian: '速度又换回了高度？那它能冲回跟出发时一样高吗？',
      dad: '如果一点摩擦都没有，它正好能冲回出发时那么高，一分不多、一分不少。可轮子和轨道之间有摩擦，空气也在挡它，一路上总有一点能量变成热和声音溜走。所以后面的坡只能比第一个坡低，设计师都会把第一个坡修成最高的。',
      figure: { kind: 'sim', sim: 'coaster', caption: '拖动第二个坡的高度，再打开摩擦：看势能、动能和“变成热”三根条怎么换来换去，车能不能冲过去。' },
    },
    {
      nian: '第一个坡要修成最高的？那要是第二个坡更高，会怎么样？',
      dad: '车会冲到半坡就停住，然后倒着滑回来。很多人以为只要冲得够快就能一直冲，其实速度是用高度换来的，能换多少早就定好了：从出发的高度往下，能用的能量就那么多。想冲上更高的坡，就得在中途再用链条拉一把，给它补上能量。',
    },
    {
      nian: '中途还得用链条再拉一把？那跑完一圈，过山车是怎么停下来的？',
      dad: '跑完一圈，车还剩不少速度，就靠刹车把它收掉。轨道上装着刹车片或者磁铁刹车，夹住或拖住车底的金属片，把动能变成热。所以过山车那份用高度换来的能量，最后全都变成了热和声音，散进了空气里。',
    },
    {
      nian: '最后全都变成了热和声音？那下一趟又要从哪儿来能量呢？',
      dad: '还是靠那条链条，链条背后是电动机，电动机用的是电。电又是发电厂用煤、水流、风或者阳光换来的。过山车只是在中间转了个手：电能变成高度，高度变成速度，速度最后变成热。能量一路换样子，总量不会变，这就是能量守恒。',
    },
    {
      nian: '我明白了！过山车的能量全是链条把它拉上第一个坡时攒的：往下冲，高度换速度；往上冲，速度换回高度。摩擦一路偷走一点，所以后面的坡都比第一个坡低。',
      dad: '说得好！把泡沫管道剖成两半搭一条小轨道，让玻璃弹珠从高处滚下来：第二个坡要比出发点低多少，弹珠才冲得过去？',
    },
  ],
  tip: '互动图里出发点 20 米高，第二个坡的高度和摩擦大小都是示意值。真实的过山车还要考虑转弯、翻滚时座椅对人的力，那属于圆周运动。坐过山车要按规定系好安全带，身高不够就不要坐。',
  sources: [
    { title: '物理 八年级下册 · 第十一章 功和机械能 · 第3节 动能和势能；第4节 机械能及其转化', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'First Hill on a Roller Coaster is Biggest（为什么第一个坡最高）', by: 'Physics Van · University of Illinois Urbana-Champaign', url: 'https://van.physics.illinois.edu/ask/listing/31' },
    { title: 'Physics of a roller coaster（过山车的能量转化）', by: '香港中文大学物理系 PhyWorld', url: 'https://www.phy.cuhk.edu.hk/phyworld/articles/roller_coaster/roller_coaster_e.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '拉上最高的坡', duration: 12,
        cues: [
          { kind: 'ray', path: [[100, 760], [300, 260], [500, 700], [700, 430], [900, 700], [1100, 570]], color: '#8b4a2b', draw: 1.5, from: 0 },
          { kind: 'sprite', icon: '🚃', path: [[110, 730], [300, 240]], size: 70, travel: 4, from: 1.6, to: 5.6 },
          { kind: 'sprite', icon: '🚃', path: [[300, 240], [500, 680], [700, 410], [900, 680], [1100, 550]], size: 70, travel: 4, from: 5.6 },
          { kind: 'label', at: [220, 460], pos: [140, 300], text: '链条慢慢拉上来', from: 2 },
          { kind: 'meter', at: [940, 220], label: '高度', start: 0.1, end: 0.95, color: '#3553a6', from: 1.6, over: 4 },
          { kind: 'text', at: [600, 840], text: '高度换成速度', from: 9 },
        ],
      },
      {
        turn: 1, title: '第二个坡要低', duration: 12,
        cues: [
          { kind: 'ray', path: [[100, 280], [350, 720], [600, 400], [850, 720], [1100, 470]], color: '#8b4a2b', draw: 1.2, from: 0 },
          { kind: 'arrow', path: [[100, 280], [1100, 280]], color: '#3553a6', text: '出发的高度', draw: 1, from: 1 },
          { kind: 'sprite', icon: '🚃', path: [[110, 260], [350, 700], [600, 380], [850, 700], [1080, 460]], size: 70, travel: 6, from: 1.8 },
          { kind: 'meter', at: [330, 820], label: '变成热和声音', start: 0, end: 0.3, color: '#b03f38', from: 2, over: 6 },
          { kind: 'text', at: [800, 820], text: '摩擦偷走一点能量', size: 's', from: 8 },
        ],
      },
      {
        turn: 2, title: '冲不上就滑回来', duration: 12,
        cues: [
          { kind: 'ray', path: [[100, 300], [400, 680], [700, 200]], color: '#8b4a2b', draw: 1.2, from: 0 },
          { kind: 'sprite', icon: '🚃', path: [[110, 290], [400, 660], [600, 360], [400, 660], [220, 450]], size: 70, travel: 6, from: 0.8 },
          { kind: 'label', at: [600, 360], pos: [900, 400], text: '冲到半坡，滑回来', from: 4 },
          { kind: 'myth', wrong: '冲得够快就能一直冲', right: '速度是用高度换来的', from: 7 },
        ],
      },
      {
        turn: 3, title: '刹车收掉速度', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [1100, 16], color: '#8b4a2b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [800, 625], size: [240, 26], color: '#7d8790', text: '刹车', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [200, 555], size: [170, 70], color: '#e8590c', text: '过山车', slide: { to: [800, 555], at: 0.6, over: 4 }, from: 0.3 },
          { kind: 'particles', box: [800, 500, 220, 80], count: 10, color: '#e8590c', motion: 'rise', from: 4 },
          { kind: 'meter', at: [940, 280], label: '动能', start: 0.8, end: 0, color: '#e8590c', from: 0.6, over: 4 },
          { kind: 'meter', at: [940, 390], label: '热', start: 0, end: 0.8, color: '#b03f38', from: 0.6, over: 4 },
          { kind: 'text', at: [600, 820], text: '动能变成了热', from: 7 },
        ],
      },
      {
        turn: 4, title: '能量转了个手', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 300], text: '电 → 高度 → 速度 → 热', from: 0.5 },
          { kind: 'sprite', icon: '⚡', path: [[200, 520]], size: 110, from: 1.4 },
          { kind: 'sprite', icon: '🎢', path: [[600, 520]], size: 130, from: 2.6 },
          { kind: 'sprite', icon: '🔥', path: [[1000, 520]], size: 110, from: 3.8 },
          { kind: 'text', at: [600, 780], text: '换了样子，总量不变', from: 6 },
        ],
      },
    ],
  },
};
