import type { Story } from './types';

const ROAD = '#8b7a5c';

export const moonFollows: Story = {
  slug: 'moon-follows',
  title: '坐车时，月亮为什么好像一直跟着我走？',
  trigger: '晚上从奶奶家坐车回来，小念一直盯着窗外：路边的树一棵棵往后飞，月亮却一直挂在车窗的右上角，开了半个小时都没挪地方。',
  dialogue: [
    {
      nian: '爸爸，月亮为什么一直跟着我们的车走？',
      dad: '月亮其实没有跟着我们，是因为它离我们实在太远了。车往前开，离你很近的树，你看它的方向一下子就变了，它就“嗖”地往后退；远处的山，方向变得慢，就慢慢往后挪；月亮离我们约 38 万公里，车开出好几公里，看它的方向几乎一点没变。',
    },
    {
      nian: '看它的方向几乎一点没变……为什么离得远，方向就变得慢？',
      dad: '你可以自己试一试：伸出两根手指，一根放在眼前，一根伸到胳膊那么远，然后左右晃晃脑袋。近的那根在眼前跳来跳去，远的那根几乎不动。美国旧金山探索馆就是这样解释的：东西离得越远，你走动时看它的方向变得越慢。',
      figure: { kind: 'sim', sim: 'parallax', caption: '换着看树、山和月亮：车往前开时，看它们的方向变得一样快吗？' },
    },
    {
      nian: '看它的方向变得越慢……那说月亮跟着人走，到底对不对？',
      dad: '说它跟着人走并不对。说一个东西动没动，要先选好参照物：以路边的树为参照物，车在往前开；以车为参照物，树在往后退。月亮离得太远，在很长一段路上，看它的方向都几乎不变，相对车窗好像一直停在同一个地方，看起来就像跟着你。',
    },
    {
      nian: '好像一直停在同一个地方……那月亮到底有多远？',
      dad: '美国航天局说，月亮离地球平均约 38 万公里，中间能排下 30 个地球。就算一天开车开 800 公里，也要开一年多才能到。车开几公里，跟这么远的距离比起来，实在太小了，看月亮的方向当然几乎不变。',
    },
    {
      nian: '看月亮的方向几乎不变……那太阳和星星是不是也会跟着我走？',
      dad: '会的，而且看起来更“听话”。太阳比月亮还远得多，星星就更远了，你走多远，它们在天上的方向都几乎不变。所以古时候的人赶路、航海，可以靠北极星认方向：走上一整天的路，它还在北边天上差不多同一个地方。',
    },
    {
      nian: '我懂了！月亮离我们特别远，车开出好几公里，看它的方向几乎不变，它就像停在窗外跟着我们走；路边的树离得近，方向一下就变，所以往后退。',
      dad: '说得对！下次坐车时，比一比路边的树、远处的楼和月亮，谁往后退得最快，谁好像一动不动。',
    },
  ],
  tip: '坐车时要系好安全带，千万别把头和手伸出窗外。',
  sources: [
    { title: '物理 八年级上册 · 第一章 机械运动 · 第2节 运动的描述（参照物）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Looking at the Moon（月亮离得远，看它的方向变得慢，所以像跟着你走；手指实验）', by: 'Exploratorium（美国旧金山探索馆）', url: 'https://annex.exploratorium.edu/seeing/ideas/moon4.html' },
    { title: 'Why does the Moon follow me when I move?（月亮太远，近处的树和房子才会从眼前掠过）', by: 'Cool Cosmos · IPAC, Caltech（美国加州理工学院）', url: 'https://coolcosmos.ipac.caltech.edu/ask/177-Why-does-the-moon-follow-me-when-I-move' },
    { title: 'Moon Facts（月亮平均离地球约 38 万公里，中间能排下 30 个地球）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '树退，月亮跟着', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [960, 20], color: ROAD, from: 0 },
          { kind: 'sprite', icon: '🚗', path: [[300, 560], [760, 560]], size: 100, travel: 6, from: 0.5 },
          { kind: 'sprite', icon: '🌳', path: [[1000, 500], [200, 500]], size: 120, travel: 2, from: 1 },
          { kind: 'sprite', icon: '🌕', path: [[340, 250], [800, 250]], size: 90, travel: 6, from: 0.5 },
          { kind: 'count', at: [990, 300], label: '月亮离我们约', start: 0, end: 38, unit: '万公里', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '树往后退，月亮像跟着走', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '手指实验', duration: 12,
        cues: [
          { kind: 'sprite', icon: '👀', path: [[180, 470]], size: 130, from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 470], size: [34, 170], color: '#f4c7a1', text: '近', motion: 'wiggle', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [900, 470], size: [34, 170], color: '#f4c7a1', text: '远', from: 1 },
          { kind: 'label', at: [420, 560], pos: [420, 700], text: '近的跳来跳去', from: 2 },
          { kind: 'label', at: [900, 560], pos: [900, 700], text: '远的几乎不动', from: 3 },
          { kind: 'text', at: [600, 830], text: '越远，方向变得越慢', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '选好参照物', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [960, 20], color: ROAD, from: 0 },
          { kind: 'sprite', icon: '🚗', path: [[600, 560]], size: 110, from: 0 },
          { kind: 'sprite', icon: '🌳', path: [[1020, 500], [180, 500]], size: 120, travel: 4, from: 1 },
          { kind: 'label', at: [600, 540], pos: [600, 330], text: '以树为参照：车在走', from: 1.5, to: 4.6 },
          { kind: 'label', at: [600, 540], pos: [600, 330], text: '以车为参照：树在退', from: 5.3 },
          { kind: 'myth', wrong: '月亮在跟着人走', right: '离得太远，方向几乎不变', from: 7 },
        ],
      },
      {
        turn: 3, title: '月亮有多远', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[200, 480]], size: 150, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[1010, 480]], size: 70, from: 0.5 },
          { kind: 'arrow', path: [[300, 480], [950, 480]], color: '#5f6f69', text: '约 38 万公里', draw: 1, from: 1 },
          { kind: 'count', at: [600, 290], label: '中间能排下', start: 0, end: 30, unit: '个地球', from: 2 },
          { kind: 'count', at: [600, 680], label: '每天开车', start: 0, end: 800, unit: '公里', from: 4 },
          { kind: 'text', at: [600, 830], text: '也要开一年多', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '星星更听话', duration: 12,
        cues: [
          { kind: 'sprite', icon: '⭐', path: [[600, 260]], size: 90, from: 0.5 },
          { kind: 'label', at: [620, 260], pos: [900, 220], text: '北极星', from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [960, 20], color: ROAD, from: 0 },
          { kind: 'sprite', icon: '🚶', path: [[220, 590], [980, 590]], size: 100, travel: 6, from: 1 },
          { kind: 'text', at: [600, 830], text: '走一天，它还在北边', from: 7.5 },
        ],
      },
    ],
  },
};
