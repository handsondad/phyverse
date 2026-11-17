import type { Story } from './types';

const NPOLE = '#d9480f';
const SPOLE = '#3553a6';
const IRON = '#9aa3ad';

export const magnetPick: Story = {
  slug: 'magnet-pick',
  title: '磁铁为什么能吸铁钉，却吸不动易拉罐？',
  trigger: '收拾冰箱时，小念拿冰箱贴去碰家里的东西：铁钉“啪”地一下吸上了，铝做的易拉罐却一动不动。',
  dialogue: [
    {
      nian: '爸爸，冰箱贴能吸住铁钉，为什么吸不动易拉罐？易拉罐也是金属呀？',
      dad: '因为磁铁不是什么金属都吸。课本里说，磁铁能吸引铁、钴、镍这类物质。家里的易拉罐大多是铝做的，铝不在这个名单里，磁铁凑近了也吸不动它，铜也一样。冰箱门的外壳是钢板，钢里主要是铁，所以冰箱贴能牢牢吸住。',
    },
    {
      nian: '冰箱门的钢板……那铁为什么就能被吸住呢？',
      dad: '铁里面有许多很小很小的区域，叫小磁区，科学家叫它磁畴，每一块都像一块小磁铁。平时它们方向乱七八糟，磁性互相抵消，所以铁钉自己不吸东西。磁铁一靠近，这些小磁区一下子排成一队，铁钉就变成了一块临时的小磁铁，这叫磁化，然后就被吸过去了。',
      figure: { kind: 'sim', sim: 'magnetize', caption: '换一换拿去试的东西，再把磁铁凑近：里面的小磁区会不会排成一队？' },
    },
    {
      nian: '小磁区排成一队……那铝里面为什么没有小磁区？',
      dad: '这跟原子里电子的排法有关。美国国家强磁场实验室的科普里说，常温下能被磁化成磁铁的元素只有铁、镍、钴、钆四种；铝、铜原子里电子的小磁性两两抵消，排不成小磁区。很多人以为磁铁能吸所有金属，其实能被它吸住的只是少数几种。',
    },
    {
      nian: '只是少数几种……那回收站怎么把钢罐和铝罐分开？',
      dad: '正好用上这个本领。美国环保署介绍过垃圾分拣厂的做法：传送带上的瓶瓶罐罐经过一块大磁铁，钢做的罐头盒被吸走，铝罐留了下来；接着再用一种飞快转动的磁铁，让铝罐里生出电流，被弹到另一边。一吸一弹，钢和铝就分开了。',
    },
    {
      nian: '钢做的罐头盒被吸走……那被吸住的铁钉，自己也能吸东西吗？',
      dad: '能！铁钉被磁化以后，下面还能再吸住一枚回形针，一串串连起来。可把磁铁拿开，纯铁里的小磁区很快又乱了，磁性几乎就没了。美国国家强磁场实验室说，纯铁只能保持几分钟的磁性，有些铁的合金却能留得很久，可以做成永久的磁铁。',
    },
    {
      nian: '我懂了！磁铁只吸铁、钴、镍这类东西。铁里的小磁区平时乱糟糟，磁铁一靠近就排成一队，铁就被磁化、被吸过去；铝和铜没有这样的小磁区，就吸不动。',
      dad: '说得对！拿一块磁铁在家里找一找：勺子、钥匙、硬币、易拉罐、锅，哪些能吸住，哪些吸不住？记下来，再想想它们是什么做的。',
    },
  ],
  tip: '强力磁铁要远离手机、银行卡和电子设备，小磁珠千万不能放进嘴里。不锈钢有的能吸、有的不能吸，要看里面的成分。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第1节 磁现象 磁场（磁性、磁化）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Magnets from Mini to Mighty（磁畴；常温下铁、镍、钴、钆能被磁化；纯铁的磁性只保持几分钟）', by: 'Magnet Academy · National MagLab（美国国家强磁场实验室）', url: 'https://nationalmaglab.org/magnet-academy/read-science-stories/science-simplified/magnets-from-mini-to-mighty/' },
    { title: 'Material Recovery Facilities for Municipal Solid Waste（用磁铁吸走钢罐，用涡流分选机弹出铝罐）', by: 'U.S. Environmental Protection Agency（美国环保署）', url: 'https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=30004DDZ.TXT' },
    { title: 'Material Recovery Facility（磁选滚筒吸走钢罐、涡流分选机弹出铝罐）', by: 'Wasatch Integrated Waste Management District（美国犹他州垃圾管理区）', url: 'https://www.wasatchintegrated.gov/material-recovery-facility/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '吸铁不吸铝', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [230, 460], size: [140, 110], color: SPOLE, text: 'S', from: 0 },
          { kind: 'shape', shape: 'rect', at: [370, 460], size: [140, 110], color: NPOLE, text: 'N', from: 0 },
          { kind: 'shape', shape: 'rect', at: [760, 300], size: [220, 46], color: IRON, text: '铁钉', slide: { to: [550, 460], at: 2, over: 0.6 }, from: 1 },
          { kind: 'shape', shape: 'rect', at: [880, 540], size: [160, 230], color: '#dfe3e8', text: '易拉罐', from: 1 },
          { kind: 'label', at: [880, 600], pos: [1040, 720], text: '一动不动', from: 4 },
          { kind: 'text', at: [600, 830], text: '只吸铁、钴、镍', from: 7 },
        ],
      },
      {
        turn: 1, title: '小磁区排队', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [520, 260], color: IRON, from: 0 },
          { kind: 'particles', box: [370, 360, 460, 200], count: 7, color: '#5d4e37', motion: 'jitter', symbol: '↗', from: 0.5, to: 4.5 },
          { kind: 'particles', box: [390, 380, 420, 170], count: 7, color: '#5d4e37', motion: 'jitter', symbol: '↙', from: 0.5, to: 4.5 },
          { kind: 'particles', box: [370, 360, 460, 200], count: 14, color: NPOLE, motion: 'jitter', symbol: '→', from: 4.5 },
          { kind: 'label', at: [600, 330], pos: [600, 230], text: '小磁区排成一队', from: 5 },
          { kind: 'text', at: [600, 830], text: '铁钉被磁化了', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '铝没有小磁区', duration: 12,
        cues: [
          { kind: 'count', at: [600, 280], label: '常温能磁化的', start: 0, end: 4, unit: '种', from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [330, 480], size: [300, 100], color: IRON, text: '铁 镍 钴 钆', from: 2 },
          { kind: 'shape', shape: 'pill', at: [870, 480], size: [300, 100], color: '#dfe3e8', text: '铝 铜', from: 3 },
          { kind: 'label', at: [870, 525], pos: [870, 650], text: '小磁性抵消了', from: 4 },
          { kind: 'myth', wrong: '磁铁能吸所有金属', right: '只吸铁、钴、镍这类东西', from: 7 },
        ],
      },
      {
        turn: 3, title: '一吸一弹', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [900, 30], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [500, 300], size: [200, 70], color: NPOLE, text: '大磁铁', from: 0.5 },
          { kind: 'sprite', icon: '🥫', path: [[240, 510], [500, 510], [500, 360]], size: 80, travel: 3, from: 1 },
          { kind: 'sprite', icon: '🥤', path: [[240, 510], [800, 510], [1000, 380]], size: 80, travel: 4, from: 2 },
          { kind: 'label', at: [500, 360], pos: [260, 250], text: '钢罐被吸走', from: 4 },
          { kind: 'label', at: [990, 400], pos: [960, 260], text: '铝罐被弹开', from: 6 },
          { kind: 'text', at: [600, 830], text: '钢和铝分开了', from: 8 },
        ],
      },
      {
        turn: 4, title: '临时的小磁铁', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [550, 250], size: [110, 70], color: SPOLE, text: 'S', slide: { to: [850, 250], at: 5.5, over: 0.6 }, from: 0 },
          { kind: 'shape', shape: 'rect', at: [660, 250], size: [110, 70], color: NPOLE, text: 'N', slide: { to: [960, 250], at: 5.5, over: 0.6 }, from: 0 },
          { kind: 'shape', shape: 'rect', at: [660, 380], size: [34, 180], color: IRON, text: '钉', slide: { to: [660, 600], at: 6, over: 0.6 }, from: 1 },
          { kind: 'sprite', icon: '📎', path: [[660, 520]], size: 70, from: 2.5, to: 6 },
          { kind: 'label', at: [700, 400], pos: [940, 420], text: '还能再吸一枚', from: 3, to: 5.5 },
          { kind: 'text', at: [600, 830], text: '磁铁拿开，磁性就没了', from: 7 },
        ],
      },
    ],
  },
};
