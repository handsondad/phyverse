import type { Story } from './types';

const NPOLE = '#d9480f';
const SPOLE = '#3553a6';
const COPPER = '#c77d3a';
const IRON = '#9aa3ad';
const FIELD = '#7a9cc6';

export const currentFieldStep: Story = {
  slug: 'current-field-step',
  title: '废品站的电磁铁，为什么一通电就吸、一断电就放？',
  trigger: '小念跟着爸爸去废品回收站，看见吊车下挂着一个大铁圆盘，往废铁堆上一放，一大堆铁块“哐”地被吸起来；挪到卡车上方一松，又全掉了下去。',
  dialogue: [
    {
      nian: '爸爸，那个大圆盘为什么一通电就吸、一断电就放？',
      dad: '因为它是一块电磁铁，磁性是电流给的。课本里说，通电导线周围存在磁场，这是丹麦科学家奥斯特发现的。把导线绕成线圈，里面插上铁芯，磁性就强得多。一通电，它就是一块强磁铁；一断电，磁场消失，铁块就掉下来了。',
    },
    {
      nian: '一断电磁场就消失……那电磁铁的磁性有多强，能调吗？',
      dad: '能调，这正是它的好处。很多人以为磁铁的磁性都是一直有的，电磁铁却是电流一流才有。电流越大、线圈匝数越多，磁性越强，插进铁芯又会强上好多倍。美国国家强磁场实验室有个小实验：光绕成线圈的导线吸不起回形针，插进一根铁钉就能吸起来了。',
      figure: { kind: 'sim', sim: 'coil', caption: '调一调电流和匝数，再把铁芯拔出来：能吸起几枚回形针？' },
    },
    {
      nian: '光绕成线圈吸不起来……那导线周围的磁场长什么样？',
      dad: '3D 实验台上，一根直导线竖着穿过撒了铁屑的玻璃板，一通电，轻轻敲一敲，铁屑就排成一圈圈的同心圆。铁屑被磁化成一根根小磁针，顺着磁场排好队，把看不见的磁场画了出来。不过离导线 2 厘米的地方，磁场还不到地磁场的一半，很弱。',
      show: { kind: 'lab', step: 0, label: '看「铁屑显形」' },
    },
    {
      nian: '还不到地磁场的一半……那一圈导线变成十圈，磁场会怎样？',
      dad: '变成 10 倍。实验台上把一匝圆环换成十匝，中心的读数一下变成原来的 10 倍，磁感线的形状一点没变，只是更密了。每一匝在中心产生的磁场方向相同，叠在一起，所以匝数越多磁性越强，这就是电磁铁要绕那么多圈的原因。',
      show: { kind: 'lab', step: 5, label: '看「多匝叠加」' },
    },
    {
      nian: '匝数越多磁性越强……那绕成长长的螺线管，又像什么？',
      dad: '像一根条形磁铁！实验台上通电的螺线管，外面的磁感线跟条形磁铁的一模一样，里面的磁感线几乎是平行、等距的直线，磁场又强又均匀。用右手握住它，四指顺着电流绕，大拇指指的那一头就是 N 极。再插上铁芯，就是一块电磁铁。',
      show: { kind: 'lab', step: 7, label: '看「内部匀强」' },
    },
    {
      nian: '我明白了！电流周围有磁场，导线绕成线圈、插上铁芯，就成了电磁铁。电流越大、匝数越多，磁性越强；一断电，磁性就没了，所以废品站的电磁铁说吸就吸、说放就放。',
      dad: '说得对！想亲眼看铁屑排队，就去「3D 实验台」做电流的磁场实验，再用右手握一握，找找螺线管的 N 极。',
    },
  ],
  tip: '自己做电磁铁只用一两节干电池，通电时间别太长，导线会发烫；千万不能用插座的电。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第2节 电生磁；第3节 电磁铁 电磁继电器', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 必修 第三册 · 第十三章 电磁感应与电磁波初步 · 第1节 磁场 磁感线', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Making Electromagnets（光有线圈吸不起回形针，插进铁钉就能吸起）', by: 'Magnet Academy · National MagLab（美国国家强磁场实验室）', url: 'https://nationalmaglab.org/magnet-academy/try-this-at-home/making-electromagnets/' },
    { title: 'Demo Highlight: Electromagnet With Bang（一节电池的电磁铁吊住大钢块，断电就掉下）', by: 'Lecture Demonstration Facility · University of Maryland（美国马里兰大学）', url: 'https://lecdem.physics.umd.edu/tools-and-resources/lecdem-blog/492-demo-highlight-electromagnet-with-bang-blog.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '通电就吸', duration: 12,
        cues: [
          { kind: 'bond', a: [600, 140], b: [600, 300], color: '#5d4e37', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 330], size: [300, 70], color: IRON, text: '电磁铁', from: 0 },
          { kind: 'particles', box: [470, 380, 260, 90], count: 10, color: '#6c757d', motion: 'jitter', symbol: '■', from: 1, to: 6 },
          { kind: 'particles', box: [470, 600, 260, 90], count: 10, color: '#6c757d', motion: 'jitter', symbol: '■', from: 6.2 },
          { kind: 'label', at: [700, 330], pos: [950, 250], text: '通电：吸住', from: 1.5, to: 6 },
          { kind: 'label', at: [700, 330], pos: [950, 250], text: '断电：放手', from: 6.2 },
          { kind: 'text', at: [600, 830], text: '磁性是电流给的', from: 8 },
        ],
      },
      {
        turn: 1, title: '磁性能调', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [480, 450], size: [60, 260], color: IRON, from: 0 },
          { kind: 'shape', shape: 'rect', at: [480, 450], size: [120, 200], color: COPPER, text: '线圈', outline: true, from: 0.5 },
          { kind: 'meter', at: [860, 320], label: '电流', start: 0.3, end: 0.8, color: NPOLE, over: 2, from: 1.5 },
          { kind: 'meter', at: [860, 440], label: '匝数', start: 0.3, end: 0.8, color: NPOLE, over: 2, from: 2.5 },
          { kind: 'meter', at: [860, 560], label: '磁性', start: 0.2, end: 0.95, color: SPOLE, over: 3, from: 3 },
          { kind: 'text', at: [600, 830], text: '插上铁芯，强好多倍', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '铁屑画出磁场', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [380, 380], color: '#fffdf8', outline: true, from: 1.5 },
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [240, 240], color: '#fffdf8', outline: true, from: 1 },
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [120, 120], color: '#fffdf8', outline: true, from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [36, 36], color: COPPER, from: 0 },
          { kind: 'label', at: [600, 460], pos: [920, 250], text: '通电的导线', from: 2 },
          { kind: 'label', at: [790, 460], pos: [960, 640], text: '一圈圈同心圆', from: 3 },
          { kind: 'text', at: [600, 830], text: '2 厘米处不到地磁一半', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '十匝就 10 倍', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 450], size: [160, 160], color: '#fffdf8', outline: true, from: 0 },
          { kind: 'shape', shape: 'pill', at: [850, 450], size: [120, 200], color: COPPER, text: '十匝', from: 1.5 },
          { kind: 'count', at: [600, 280], label: '中心磁场变成', start: 1, end: 10, unit: '倍', from: 3 },
          { kind: 'label', at: [330, 450], pos: [330, 640], text: '一匝', from: 0.5 },
          { kind: 'myth', wrong: '磁铁的磁性都是一直有的', right: '电流一流，才有磁场', from: 7 },
        ],
      },
      {
        turn: 4, title: '像条形磁铁', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [440, 140], color: COPPER, outline: true, from: 0 },
          { kind: 'ray', path: [[380, 460], [820, 460]], color: FIELD, draw: 0.8, from: 1 },
          { kind: 'ray', path: [[820, 420], [960, 300], [600, 250], [240, 300], [380, 420]], color: FIELD, draw: 1.2, from: 1.8 },
          { kind: 'shape', shape: 'rect', at: [880, 460], size: [80, 80], color: NPOLE, text: 'N', from: 3 },
          { kind: 'shape', shape: 'rect', at: [320, 460], size: [80, 80], color: SPOLE, text: 'S', from: 3 },
          { kind: 'sprite', icon: '✊', path: [[600, 620]], size: 110, from: 4.5 },
          { kind: 'text', at: [600, 830], text: '右手握住找 N 极', from: 7.5 },
        ],
      },
    ],
  },
};
