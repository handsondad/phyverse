import type { Story } from './types';

const NPOLE = '#d9480f';
const SPOLE = '#3553a6';
const COPPER = '#c77d3a';
const HOT = '#e8590c';

export const motorSpin: Story = {
  slug: 'motor-spin',
  title: '小电动机为什么一通电就转起来？',
  trigger: '小念拆开一辆坏了的玩具车，里面有个小小的电动机。接上电池，它“嗡”地一下转起来；把电池反过来接，它就倒着转。',
  dialogue: [
    {
      nian: '爸爸，小电动机为什么一接上电池就转起来？',
      dad: '因为通电的导线放在磁场里会受到力。电动机里有一块磁铁，中间是一个能转的线圈。电流流过线圈，线圈两边的电流方向正好相反，在磁场里一边被往上推、一边被往下推，就像有两只手一推一拉，线圈就转起来了。',
    },
    {
      nian: '一边往上推、一边往下推……那它转半圈不就卡住了吗？',
      dad: '问得好！线圈转到竖直的位置，两边的力就不再让它转了。所以电动机里有个小零件叫换向器，每转半圈就把线圈里的电流掉个头，受力也跟着掉头，线圈就能一直朝一个方向转。美国国家强磁场实验室说，要是没有换向器，它只能转半圈。',
      figure: { kind: 'sim', sim: 'motor', caption: '调一调电流，把电池反过来接，再拆掉换向器：线圈怎么转？' },
    },
    {
      nian: '把电流掉个头……所以电池反过来接，它就倒着转？',
      dad: '对。课本里说，通电导线受力的方向，跟电流的方向和磁场的方向都有关系：电流反过来，或者把磁铁的 N 极、S 极对调，受力就反过来，电动机就倒着转。要是两样一起反过来，它又转回原来的方向了。',
    },
    {
      nian: '两样一起反过来……那是电直接把轴推着转的吗？',
      dad: '不是电直接推轴，是磁场推着通电的线圈。很多人以为电一来就把轴推转了，其实电先让线圈在磁场里受力，力再带着轴转起来，电能就变成了转动的能量。电流越大、磁铁越强、线圈匝数越多，受的力越大，转得越有劲。',
    },
    {
      nian: '磁场推着线圈……家里哪些东西里面也有电动机？',
      dad: '可多了！电风扇、洗衣机、吸尘器、电动牙刷，还有手机里让它“嗡嗡”振动的小马达，都靠电动机转起来，电动汽车的轮子也是电动机带着转的。英国皇家研究院里还收藏着法拉第两百多年前做的磁转动装置，那是电动机的老祖宗。',
    },
    {
      nian: '我明白了！通电的线圈在磁场里受力，一边被推上、一边被推下，就转起来了；换向器每半圈把电流掉个头，它就一直转。电流反过来，它就倒着转。',
      dad: '说得对！找一辆旧玩具车，把电池反过来装，看看轮子是不是倒着转；要拆开看时请大人帮忙，别把电池两头直接连起来。',
    },
  ],
  tip: '拆玩具前先取出电池；不要拆家里插电的电器，里面有 220 伏的电。互动图是从上往下看的示意，线圈两边的电流 ⊙ 表示流出纸面、⊗ 表示流进纸面。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第4节 电动机', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'DC Motor（线圈、磁铁和换向器；没有换向器只能转半圈）', by: 'Magnet Academy · National MagLab（美国国家强磁场实验室）', url: 'https://nationalmaglab.org/magnet-academy/watch-play/interactive-tutorials/dc-motor/' },
    { title: 'Michael Faraday at the Royal Institution（法拉第 1822 年的磁转动装置）', by: 'The Royal Institution（英国皇家研究院）', url: 'https://www.rigb.org/explore-science/michael-faraday-royal-institution' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一推一拉', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [220, 470], size: [140, 300], color: NPOLE, text: 'N', from: 0 },
          { kind: 'shape', shape: 'rect', at: [980, 470], size: [140, 300], color: SPOLE, text: 'S', from: 0 },
          { kind: 'bond', a: [430, 470], b: [770, 470], color: COPPER, order: 2, from: 1 },
          { kind: 'arrow', path: [[430, 440], [430, 290]], color: HOT, text: '往上推', draw: 0.6, from: 2.5 },
          { kind: 'arrow', path: [[770, 500], [770, 650]], color: HOT, text: '往下推', draw: 0.6, from: 3 },
          { kind: 'text', at: [600, 830], text: '线圈就转起来了', from: 7 },
        ],
      },
      {
        turn: 1, title: '换向器', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [220, 220], color: COPPER, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [26, 240], color: '#fffdf8', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [420, 460], size: [80, 50], color: '#6c757d', text: '电刷', from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [780, 460], size: [80, 50], color: '#6c757d', text: '电刷', from: 1.5 },
          { kind: 'label', at: [600, 350], pos: [600, 240], text: '每半圈换个头', from: 3 },
          { kind: 'text', at: [600, 830], text: '没有它只能转半圈', from: 7 },
        ],
      },
      {
        turn: 2, title: '倒着转', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔋', path: [[330, 470]], size: 140, from: 0 },
          { kind: 'arrow', path: [[640, 320], [800, 360], [860, 470], [800, 580]], color: HOT, text: '正着转', draw: 1, from: 1, to: 5 },
          { kind: 'arrow', path: [[800, 580], [860, 470], [800, 360], [640, 320]], color: SPOLE, text: '倒着转', draw: 1, from: 5.5 },
          { kind: 'label', at: [330, 470], pos: [330, 650], text: '反过来接', from: 5 },
          { kind: 'text', at: [600, 830], text: '电流反过来，力就反过来', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '磁场推线圈', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [220, 420], size: [120, 260], color: NPOLE, text: 'N', from: 0 },
          { kind: 'shape', shape: 'rect', at: [980, 420], size: [120, 260], color: SPOLE, text: 'S', from: 0 },
          { kind: 'bond', a: [470, 420], b: [730, 420], color: COPPER, order: 2, from: 0.5 },
          { kind: 'arrow', path: [[470, 395], [470, 270]], color: HOT, draw: 0.5, from: 1.5 },
          { kind: 'arrow', path: [[730, 445], [730, 570]], color: HOT, draw: 0.5, from: 1.5 },
          { kind: 'myth', wrong: '电直接把轴推转', right: '磁场推着通电的线圈', from: 7 },
        ],
      },
      {
        turn: 4, title: '家里的电动机', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🪥', path: [[300, 460]], size: 130, from: 0.5 },
          { kind: 'sprite', icon: '📱', path: [[600, 460]], size: 130, from: 1.5 },
          { kind: 'sprite', icon: '🚗', path: [[900, 460]], size: 130, from: 2.5 },
          { kind: 'label', at: [600, 520], pos: [600, 650], text: '振动的小马达', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '都靠电动机转起来', from: 7 },
        ],
      },
    ],
  },
};
