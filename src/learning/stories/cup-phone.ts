import type { Story } from './types';

export const cupPhone: Story = {
  slug: 'cup-phone',
  title: '纸杯电话为什么能听到声音？',
  trigger: '手工课上，小念和同桌用两个纸杯和一根长长的细线做了个“电话”。线拉直以后，对着杯子小声说话，另一头竟然听得清清楚楚。',
  dialogue: [
    {
      nian: '爸爸，我说话那么小声，同桌为什么在另一头听得那么清楚？',
      dad: '秘密在那根拉直的线上。你对着杯子说话，空气推着杯底一下下振动，杯底拉着线振动，振动顺着线跑到另一头，推着那边的杯底振动，杯底再推动空气，声音就钻进了同桌的耳朵。声音顺着线跑，不会四处散开，所以小声也听得清。',
    },
    {
      nian: '振动顺着线跑过去？那线松下来还能听到吗？',
      dad: '基本听不到了。线一松，软塌塌的，杯底的振动传不过去，大部分在半路就没了。线中间被手捏住也不行，振动被手吸收掉了。所以玩纸杯电话一定要把线拉直，线也不能碰到别的东西。',
    },
    {
      nian: '线拉直才传得过去？那声音在线里、水里和空气里，跑得一样快吗？',
      dad: '不一样。课本里有张声速表：15 ℃ 的空气里，声音每秒走大约 340 米；在水里，每秒大约 1500 米；在钢铁里，每秒五千多米。很多人以为声音只能在空气里走，其实固体、液体都能传声，一般在固体里跑得最快，液体里其次，气体里最慢。',
      figure: { kind: 'sim', sim: 'medium', caption: '拖一拖要走的距离：同样的路，声音在空气、水和钢铁里各要跑多久？' },
    },
    {
      nian: '钢铁里每秒五千多米？那把耳朵贴在铁轨上，是不是能更早听到火车？',
      dad: '道理上是这样，声音沿着铁轨跑得快，还不容易散开。可千万别真去铁路上试，火车开得飞快，非常危险！在家换个安全的办法：一个人轻轻敲长桌的一头，另一个人把耳朵贴在桌子另一头听，再抬起头听一次，比比哪次更清楚。',
    },
    {
      nian: '耳朵贴着桌子听得更清楚？那古时候的人知道这个办法吗？',
      dad: '知道！宋朝的沈括在《梦溪笔谈》里记过一个古法：士兵用牛皮做箭袋，睡觉时把它贴着地面当枕头，几里之内有人马走动都能听见。马蹄声顺着大地传过来，比隔着空气听更清楚；中空的箭袋又像个小音箱，把声音收拢起来。',
    },
    {
      nian: '我懂了！纸杯电话靠拉直的线把振动传过去。声音不只能在空气里传，固体、液体也能传，而且一般在固体里跑得最快，所以耳朵贴着桌子听更清楚。',
      dad: '说得好！自己做一个纸杯电话：两个纸杯底各戳个小孔，穿一根三四米长的细线，打结固定。拉直了说悄悄话，再让线松下来试试，听听有什么不同。',
    },
  ],
  tip: '声速会随温度和材料变：钢铁里的声速，不同资料给的从每秒五千多米到将近六千米都有，只要记住“固体快、液体次之、气体最慢”。纸杯电话的线要细一点、结实一点，绷直了效果最好。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播（小资料：一些介质中的声速）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '梦溪笔谈 · 卷十九 器用（古法以牛革为矢服）', by: '沈括 · 中国哲学书电子化计划', url: 'https://ctext.org/wiki.pl?chapter=331880&if=gb' },
    { title: 'Phys 102 eBook · Speed of sound（空气、水、钢中的声速）', by: 'King Fahd University of Petroleum & Minerals · Physics', url: 'https://faculty.kfupm.edu.sa/PHYS/aljalal/phys-102-online-course-web/phys102-eBook/ch-02/ch-02-02-01.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '振动顺着线跑', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[100, 450]], size: 130, from: 0 },
          { kind: 'sprite', icon: '👧', path: [[1100, 450]], size: 130, from: 0 },
          { kind: 'shape', shape: 'rect', at: [230, 450], size: [100, 130], color: '#f4ead9', from: 0 },
          { kind: 'shape', shape: 'rect', at: [970, 450], size: [100, 130], color: '#f4ead9', from: 0 },
          { kind: 'bond', a: [280, 450], b: [920, 450], color: '#8b7a5c', from: 0 },
          { kind: 'flow', path: [[290, 450], [910, 450]], color: '#7a5cc4', count: 8, speed: 240, from: 2 },
          { kind: 'text', at: [600, 820], text: '振动顺着线跑过去', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '线一松就不行', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [230, 400], size: [100, 130], color: '#f4ead9', from: 0 },
          { kind: 'shape', shape: 'rect', at: [970, 400], size: [100, 130], color: '#f4ead9', from: 0 },
          { kind: 'bond', a: [280, 400], b: [440, 560], color: '#8b7a5c', from: 0.5 },
          { kind: 'bond', a: [440, 560], b: [600, 610], color: '#8b7a5c', from: 0.5 },
          { kind: 'bond', a: [600, 610], b: [760, 560], color: '#8b7a5c', from: 0.5 },
          { kind: 'bond', a: [760, 560], b: [920, 400], color: '#8b7a5c', from: 0.5 },
          { kind: 'label', at: [600, 610], pos: [600, 740], text: '线松：传不过去', from: 2 },
          { kind: 'text', at: [600, 220], text: '一定要拉直', from: 5 },
        ],
      },
      {
        turn: 2, title: '谁跑得快', duration: 12,
        cues: [
          { kind: 'count', at: [260, 400], label: '空气里', start: 0, end: 340, unit: '米/秒', from: 0.6, over: 1.5 },
          { kind: 'count', at: [600, 400], label: '水里', start: 0, end: 1500, unit: '米/秒', from: 2, over: 1.5 },
          { kind: 'shape', shape: 'pill', at: [940, 400], size: [260, 110], color: '#dfe5ea', text: '钢铁里', from: 3.4 },
          { kind: 'label', at: [940, 440], pos: [940, 560], text: '每秒五千多米', from: 3.8 },
          { kind: 'text', at: [600, 210], text: '固体最快，气体最慢', from: 5 },
          { kind: 'myth', wrong: '声音只能在空气里走', right: '固体、液体也能传声', from: 6.8 },
        ],
      },
      {
        turn: 3, title: '贴着桌子听', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [900, 60], color: '#c79a63', text: '长桌', from: 0 },
          { kind: 'sprite', icon: '✊', path: [[200, 480]], size: 100, wobble: true, from: 0.5 },
          { kind: 'sprite', icon: '👂', path: [[1000, 490]], size: 110, from: 0.5 },
          { kind: 'flow', path: [[220, 560], [980, 560]], color: '#7a5cc4', count: 6, speed: 320, from: 1.5 },
          { kind: 'text', at: [600, 820], text: '别去铁路上试！', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '枕着箭袋听', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [1100, 120], color: '#d8c7a5', from: 0 },
          { kind: 'sprite', icon: '🐎', path: [[1000, 580]], size: 160, wobble: true, from: 0 },
          { kind: 'sprite', icon: '😴', path: [[220, 600]], size: 140, from: 0 },
          { kind: 'flow', path: [[920, 690], [300, 690]], color: '#7a5cc4', count: 8, speed: 260, from: 1.5 },
          { kind: 'label', at: [600, 690], pos: [600, 470], text: '马蹄声从地下来', from: 3 },
          { kind: 'text', at: [600, 230], text: '固体传得早又清楚', from: 6.5 },
        ],
      },
    ],
  },
};
