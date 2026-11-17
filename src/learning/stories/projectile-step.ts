import type { Story } from './types';

export const projectileStep: Story = {
  slug: 'projectile-step',
  title: '弹珠从桌边滚下去，会落在哪儿？',
  trigger: '小念在桌上弹弹珠，一颗弹珠骨碌碌滚过桌边，画出一道弧线，“嗒”地落在离桌腿好远的地板上。',
  dialogue: [
    {
      nian: '爸爸，弹珠滚得越快，是不是在空中飘得越久，才落得越远？',
      dad: '落得远是对的，飘得久可不对。弹珠一离开桌边，就同时做两件事：横着，按离开桌边时的速度一直往前走；竖着，跟直接从桌边掉下去一样往下落。滚得快，只是横着走得快，往下掉的快慢一点没变。',
    },
    {
      nian: '往下掉的快慢一点没变？那快弹珠和慢弹珠，会同时落地吗？',
      dad: '会！科学家做过：用一个弹簧片一敲，一个球被横着打出去，另一个球同时直接落下，两个球总是同时着地，只听到一声响。很多人以为横着的速度能让它掉得慢一点，其实横着走和往下掉，谁也不打扰谁。',
      figure: { kind: 'sim', sim: 'drop', caption: '拖动「弹珠滚出桌边的速度」：每 0.1 秒留一个影子，看橙球和蓝球是不是一直一样高。' },
      show: { kind: 'lab', step: 1, label: '看「先做竖直」' },
    },
    {
      nian: '同时着地……那从桌边到地上，要掉多久？',
      dad: '只看桌子有多高，跟滚得快慢没关系。从 0.8 米高的桌边掉下去，大约要 0.4 秒；桌子越高，掉得越久。不过往下掉是越掉越快的，所以高度翻一倍，时间并不会翻一倍，只多四成左右。',
      eq: 't = √(2h ÷ g) = √(2 × 0.8 m ÷ 9.8 m/s²) ≈ 0.4 s',
    },
    {
      nian: '知道了时间，就能算出它落在哪儿吗？',
      dad: '对！横着的速度一直不变，落地的远近就等于横着的速度乘下落的时间。弹珠以每秒 1.5 米滚出 0.8 米高的桌边，0.4 秒落地，就落在离桌边大约 0.6 米的地方。滚得快一倍，就落得远一倍。',
      eq: 'x = v × t = 1.5 m/s × 0.4 s ≈ 0.6 m',
      show: { kind: 'lab', step: 5, label: '看「水平是匀速」' },
    },
    {
      nian: '横着的速度一直不变？怎么知道它真的没变？',
      dad: '可以给它拍“连拍照”：每隔一样的时间拍一下弹珠在哪儿。你会发现，横着每一格走的距离都一样，竖着却一格比一格掉得多。实验室里也这样做：让小球从斜槽滚出来，用挡板记下它经过的几个点，连起来就是那条弯弯的弧线。',
      show: { kind: 'lab', step: 3, label: '看「描四个点」' },
    },
    {
      nian: '斜槽滚出来的地方，是不是要放平？要不然就不是横着飞出去了？',
      dad: '对，斜槽的末端必须水平，小球才是横着飞出去的；末端要是翘起来或者往下斜，小球一出去就带着往上或往下的速度，弧线就不一样了。生活里水管平着喷出的水柱、从桌边冲下去的玩具车，画出来的都是这种弧线。',
      show: { kind: 'lab', step: 2, label: '看「末端要水平」' },
    },
    {
      nian: '我明白了！弹珠离开桌边以后，横着按原来的速度一直走，竖着和直接掉下去一样落。掉多久只看桌子多高，落多远等于横着的速度乘时间。',
      dad: '一点没错！可以拿两颗弹珠试一试：一颗从桌边轻轻推下去，一颗同时快快地滚出去，听听是不是同一声“嗒”。弹珠很小，玩完要收好，别让小弟弟小妹妹放进嘴里。',
    },
  ],
  tip: '文中的时间按 g = 9.8 m/s² 计算，不计空气阻力：0.8 米高约 0.40 秒。教材的实验用一个装置让两个小球同时开始运动，一个平抛、一个自由下落，听落地声判断是否同时落地；3D 实验台里能一步步做，还能用描出的点算出平抛的初速度。弹珠小，家里有三岁以下的小朋友要收好。',
  sources: [
    { title: '物理 必修 第二册 · 第五章 抛体运动 · 第3节 实验：探究平抛运动的特点；第4节 抛体运动的规律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Ballistic Flight Equations（抛体运动的方程）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ballistic-flight-equations/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '同时做两件事', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 352], size: [380, 24], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [110, 556], size: [20, 384], color: '#b07b45', from: 0 },
          { kind: 'shape', shape: 'rect', at: [410, 556], size: [20, 384], color: '#b07b45', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 755], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [440, 318], velocity: [300, 0], gravity: 900, ground: 726, from: 1 },
          { kind: 'arrow', path: [[480, 240], [720, 240]], color: '#2c774a', text: '横着一直走', from: 2.2 },
          { kind: 'arrow', path: [[840, 380], [840, 600]], color: '#e0762b', text: '竖着往下落', from: 3.2 },
          { kind: 'text', at: [600, 840], text: '滚得快，只是横着走得快', from: 5 },
        ],
      },
      {
        turn: 1, title: '同时落地', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 352], size: [380, 24], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [440, 318], velocity: [0, 0], gravity: 900, ground: 671, color: '#3a86c8', from: 1 },
          { kind: 'toss', at: [440, 318], velocity: [360, 0], gravity: 900, ground: 671, from: 1 },
          { kind: 'label', at: [760, 671], pos: [950, 450], text: '同时着地', from: 2.3 },
          { kind: 'myth', wrong: '横着的速度让它掉得慢', right: '横着走、往下掉互不打扰', from: 6 },
        ],
      },
      {
        turn: 2, title: '只看多高', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 432], size: [380, 24], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 755], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [440, 398], velocity: [0, 0], gravity: 900, ground: 726, color: '#3a86c8', from: 1 },
          { kind: 'toss', at: [440, 398], velocity: [250, 0], gravity: 900, ground: 726, color: '#9cc7e8', from: 1 },
          { kind: 'toss', at: [440, 398], velocity: [500, 0], gravity: 900, ground: 726, from: 1 },
          { kind: 'label', at: [740, 726], pos: [930, 540], text: '快慢不同，同时落地', from: 2.4 },
          { kind: 'formula', at: [850, 240], text: 't = √(2h ÷ g)', from: 4 },
          { kind: 'text', at: [600, 850], text: '0.8 米高：约 0.4 秒', from: 6 },
        ],
      },
      {
        turn: 3, title: '落在哪儿', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 352], size: [380, 24], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 755], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'formula', at: [820, 230], text: 'x = v × t', from: 0.6 },
          { kind: 'toss', at: [440, 318], velocity: [300, 0], gravity: 900, ground: 726, from: 1.4 },
          { kind: 'label', at: [721, 726], pos: [640, 590], text: '约 0.6 米', from: 2.8 },
          { kind: 'toss', at: [440, 318], velocity: [600, 0], gravity: 900, ground: 726, color: '#e0762b', from: 4.6 },
          { kind: 'label', at: [1002, 726], pos: [990, 560], text: '快一倍，远一倍', from: 6 },
        ],
      },
      {
        turn: 4, title: '连拍照', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 352], size: [380, 24], color: '#c8955b', from: 0 },
          { kind: 'atom', path: [[485, 350]], symbol: '', color: '#ff9f43', r: 16, from: 1 },
          { kind: 'atom', path: [[530, 381]], symbol: '', color: '#ff9f43', r: 16, from: 1.6 },
          { kind: 'atom', path: [[575, 431]], symbol: '', color: '#ff9f43', r: 16, from: 2.2 },
          { kind: 'atom', path: [[620, 502]], symbol: '', color: '#ff9f43', r: 16, from: 2.8 },
          { kind: 'atom', path: [[665, 593]], symbol: '', color: '#ff9f43', r: 16, from: 3.4 },
          { kind: 'atom', path: [[710, 705]], symbol: '', color: '#ff9f43', r: 16, from: 4 },
          { kind: 'text', at: [600, 830], text: '横着每格一样，竖着越掉越多', from: 5.5 },
        ],
      },
      {
        turn: 5, title: '末端要水平', duration: 11,
        cues: [
          { kind: 'bond', a: [150, 220], b: [420, 380], color: '#b08850', from: 0 },
          { kind: 'bond', a: [420, 380], b: [520, 380], color: '#b08850', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'label', at: [470, 380], pos: [360, 540], text: '末端放平', from: 0.8 },
          { kind: 'toss', at: [520, 362], velocity: [330, 0], gravity: 900, ground: 731, from: 1.8 },
          { kind: 'text', at: [600, 850], text: '横着飞出，才是这条弧线', from: 5 },
        ],
      },
    ],
  },
};
