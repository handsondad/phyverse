import type { Story } from './types';

export const steelShip: Story = {
  slug: 'steel-ship',
  title: '万吨钢船为什么能浮起来？',
  trigger: '小念往水盆里丢了一颗铁钉，铁钉“咕咚”一声沉到了盆底；可电视里几万吨重的钢铁巨轮，却稳稳地浮在海面上。',
  dialogue: [
    {
      nian: '爸爸，一颗小铁钉都会沉，那么重的钢铁大船怎么反而能浮起来？',
      dad: '因为东西能不能浮，不是只看它有多重，还要看它能推开多少水。水会往上托泡在里面的东西，这个往上托的力叫浮力。东西排开的水有多重，浮力就有多大。铁钉那么小，排开的水很少，托不住它；大船肚子是空的，能排开好多好多水。',
      figure: { kind: 'sim', sim: 'buoyancy', caption: '同样 8 千克钢铁，换成「铁皮小碗」「大肚子船」：看能排开多少水，再一箱箱往上装货。' },
    },
    {
      nian: '排开的水有多重，浮力就有多大？这是谁发现的？',
      dad: '两千多年前古希腊的阿基米德。传说他泡进装满水的澡盆，看到水哗地漫了出来，一下子想通了：东西泡进水里多大一块，就把多大一块水挤开，被挤开的水想回到原来的地方，就往上托它。后来人们把这条规律叫作阿基米德原理。',
      eq: '浮力 = 排开的水受到的重力',
    },
    {
      nian: '把水挤开，水就往上托？那铁块做成船的样子，为什么就能浮了？',
      dad: '同样一块钢铁，做成实心的一坨，只能挤开跟自己一样大的那一点水，可钢铁比同样大的水重差不多 8 倍，浮力远远不够。把它压成薄薄的钢板，围成一个大肚子的船，里面装着空气，同样多的钢铁就能挤开大得多的水，浮力一下子变大，足够托住它。',
    },
    {
      nian: '可大家都说轻的浮、重的沉，钢铁这么重，到底该看什么呢？',
      dad: '要拿它和同样大的一块水比。一颗铁钉比同样大的水重，就沉；一大根木头虽然很沉，却比同样大的水轻，就浮。船也一样：把船身和里面的空气算在一起，比它占的那么大一块水还轻，所以能浮。轻重要和同样大的水比，不是和别的东西比。',
    },
    {
      nian: '船身和空气算在一起……那船上货装多了，是不是就会沉下去？',
      dad: '对！货装得越多，船就吃水越深，排开的水越多，浮力也跟着变大。可船身就那么高，泡到再也排不开更多水时，浮力就到头了，再装就会沉。所以大船两侧都画着载重线，装货时水面不能超过这条线，还要给大风大浪留出余地。',
    },
    {
      nian: '我懂了！浮力等于东西排开的水有多重。钢铁做成大肚子的船，能排开很多水，浮力大得能托住它；能不能浮，要拿它和同样大的水比轻重，不是光看它自己重不重。',
      dad: '完全正确！拿一块橡皮泥试试：捏成一团丢进水里会沉，捏成小船的样子就能浮起来，还能往里放几颗硬币当货物，比比谁的小船装得多。',
    },
  ],
  tip: '互动图按“排开多少千克水，就有多大浮力”简化计算，船形能排开的水量是示意值。钢铁的密度约是水的 7.9 倍。载重线的规定来自国际海事组织的《国际载重线公约》。玩水的小实验，大人要在旁边。',
  sources: [
    { title: '物理 八年级下册 · 第十章 浮力 · 第2节 阿基米德原理、第3节 物体的浮沉条件及应用', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'International Convention on Load Lines（国际载重线公约：船两侧必须标出载重线）', by: 'International Maritime Organization（国际海事组织）', url: 'https://www.imo.org/en/about/conventions/pages/international-convention-on-load-lines.aspx' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '铁钉和大船', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [1100, 440], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [320, 320], size: [14, 60], color: '#7d8790', slide: { to: [320, 820], at: 1, over: 1.6 }, from: 0.4 },
          { kind: 'label', at: [330, 780], pos: [330, 600], text: '排开的水很少', from: 2.8 },
          { kind: 'sprite', icon: '🚢', path: [[800, 390]], size: 230, from: 3.6 },
          { kind: 'arrow', path: [[800, 620], [800, 500]], color: '#3a6fb0', text: '水往上托', from: 4.8 },
          { kind: 'text', at: [600, 830], text: '要看它排开多少水', from: 7 },
        ],
      },
      {
        turn: 1, title: '阿基米德的澡盆', duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [560, 560], size: [420, 360], liquid: '#7fb8e6', level: 0.82, rise: { to: 1, at: 2.4, over: 1.6 }, from: 0 },
          { kind: 'sprite', icon: '🧔', path: [[560, 260], [560, 470]], size: 150, travel: 2, from: 0.6 },
          { kind: 'flow', path: [[772, 390], [830, 430], [860, 560], [870, 740]], color: '#4f93cf', count: 6, speed: 200, from: 3 },
          { kind: 'label', at: [860, 600], pos: [1040, 520], text: '被挤开的水', from: 4 },
          { kind: 'formula', at: [560, 180], text: '浮力 = 排开的水重', from: 5.6 },
          { kind: 'text', at: [560, 840], text: '泡进去多少，就挤开多少', from: 7.4 },
        ],
      },
      {
        turn: 2, title: '一坨和大肚子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [1100, 440], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [320, 300], size: [90, 90], color: '#7d8790', text: '实心', slide: { to: [320, 790], at: 1.2, over: 1.8 }, from: 0.4 },
          { kind: 'label', at: [320, 790], pos: [320, 560], text: '只挤开一点水', from: 3.2 },
          { kind: 'shape', shape: 'rect', at: [830, 420], size: [380, 100], color: '#8d99a6', text: '大肚子船', from: 4.6 },
          { kind: 'arrow', path: [[740, 640], [740, 480]], color: '#3a6fb0', from: 5.6 },
          { kind: 'arrow', path: [[920, 640], [920, 480]], color: '#3a6fb0', text: '浮力大', from: 5.9 },
          { kind: 'text', at: [600, 840], text: '钢板围成大肚子', from: 7.6 },
        ],
      },
      {
        turn: 3, title: '和同样大的水比', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 220], size: [240, 80], color: '#ffb36b', text: '沉', from: 0.3 },
          { kind: 'meter', at: [330, 380], label: '铁钉', start: 0, end: 0.95, color: '#7d8790', from: 0.8 },
          { kind: 'meter', at: [330, 500], label: '同样大的水', start: 0, end: 0.12, color: '#4f93cf', from: 1.4 },
          { kind: 'shape', shape: 'pill', at: [870, 220], size: [240, 80], color: '#9cc7e8', text: '浮', from: 3 },
          { kind: 'meter', at: [870, 380], label: '木头', start: 0, end: 0.5, color: '#c99a62', from: 3.4 },
          { kind: 'meter', at: [870, 500], label: '同样大的水', start: 0, end: 0.75, color: '#4f93cf', from: 4 },
          { kind: 'myth', wrong: '重的东西就会沉', right: '比同样大的水重才会沉', from: 7 },
        ],
      },
      {
        turn: 4, title: '载重线', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [1100, 420], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [620, 160], color: '#8d99a6', text: '装货', slide: { to: [600, 490], at: 2, over: 4 }, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [620, 10], color: '#d64545', slide: { to: [600, 510], at: 2, over: 4 }, from: 0.6 },
          { kind: 'label', at: [910, 420], pos: [1060, 300], text: '载重线', from: 0.8, to: 2 },
          { kind: 'meter', at: [600, 210], label: '浮力', start: 0.45, end: 0.95, color: '#3a6fb0', from: 2, over: 4 },
          { kind: 'text', at: [600, 830], text: '水面不能没过这条线', from: 6.8 },
        ],
      },
    ],
  },
};
