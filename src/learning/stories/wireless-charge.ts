import type { Story } from './types';

const COPPER = '#c77d3a';
const FIELD = '#3553a6';
const HOT = '#e8590c';

export const wirelessCharge: Story = {
  slug: 'wireless-charge',
  title: '手机往充电板上轻轻一放就能充电，电是怎么隔空“跳”过去的？',
  trigger: '洗漱台上的电动牙刷连一个金属插孔都没有，浑身包着光滑的塑料，往底座上一插却亮起了充电灯；爸爸的手机往圆圆的充电板上一搁也开始充电了。',
  dialogue: [
    {
      nian: '爸爸，充电板和手机明明隔着塑料壳，电是怎么隔空“跳”过去的？里面有看不见的小闪电吗？',
      dad: '一丁点小闪电都没有！很多人以为无线充电是电流穿过空气跳进了手机，要是真有电流穿过塑料壳，手摸上去早就被电麻啦。真正跨过那几毫米缝隙的不是电流，而是看不见、摸不着、也电不到人的磁场。',
    },
    {
      nian: '磁场怎么能给手机电池充电呢？',
      dad: '还记得手摇发电机里的电磁感应吗？无线充电玩的是“双线圈接力”：充电底座里盘着一圈铜线叫发射线圈，通上每秒来回变十几万次的交流电，就会激起飞快变化的磁场；手机背面也盘着一圈铜线叫接收线圈，变化的磁场一穿过去，就在接收线圈里“晃”出了感应电流！两个线圈这样隔空传能量，物理上叫互感。',
      figure: { kind: 'sim', sim: 'wirelessCoil', caption: '试试隔着薄塑料手机壳、把手机拿远，再往中间夹一枚金属硬币：看看磁场和充电功率怎么变！' },
    },
    {
      nian: '互感……为什么隔着塑料壳能充，把手机稍微拿高一点或者放歪一点就充不上了？',
      dad: '因为磁场对塑料、木头和玻璃畅通无阻，几乎一点不拦，所以电动牙刷做成全密封塑料壳防水又安全。可线圈发出的磁感线一离开底座就会往四周散开，手机抬高几厘米或者歪到一边，穿过接收线圈的磁感线一下子少了大半，感应出来的电压不够高，充电自然就断了。',
    },
    {
      nian: '磁感线会往四周散开……那要是不小心在充电板和手机中间夹了一枚金属硬币呢？',
      dad: '千万别这么干！飞快变化的磁场一旦撞上硬币、钥匙、回形针或者带金属环的手机壳，就会像电磁炉烧铁锅一样，在金属片里转出一圈圈涡流，硬币几秒钟就会烫手，严重的还会烫化塑料面板。所以合格的无线充电器都装了“异物检测”，一察觉有金属抢能量，就立刻闪灯断电。',
    },
    {
      nian: '异物检测真管用！那这种不用插线的充电办法，比直接插充电线省电吗？',
      dad: '实话实说，还是插充电线更省电、也更快。隔空传磁场总会漏掉一部分磁感线，两边线圈自己也会微微发热，大约有一两成到三成的电能会变成热散掉；所以平时赶时间或者想更节能就插线充，洗手间里怕进水的电动牙刷、随手放下的床头充电板就派无线充电上场。',
    },
    {
      nian: '我懂了！无线充电不是电流跳过空气，而是靠互感：底座发射线圈用交流电生出快速变化的磁场，穿过塑料壳在手机接收线圈里感应出电流；充电板上可不能放硬币钥匙，免得激起涡流发烫。',
      dad: '一点不差！其实街头变电站里的变压器，也是把两个线圈绕在同一个铁芯上靠互感改电压的——你今天连变压器的本领也一起学到手啦。',
    },
  ],
  tip: '无线充电板表面切勿放置硬币、钥匙、金属卡针、公交卡或带磁吸铁片的老式指环扣：金属异物会因涡流发热，带芯片或磁条的卡片还可能被交变磁场损坏。充电时保持底座通风，不要压在枕头或厚被子下面。',
  sources: [
    { title: '物理 选择性必修 第二册 · 第二章 电磁感应 · 第3节 涡流、电磁阻尼和电磁驱动；第4节 互感和自感', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'An Equivalent Coil Model of a Wireless Power Transfer System（发射与接收线圈通过交变磁场传递能量及导电异物涡流损耗）', by: '美国国家科学基金会公共获取库（NSF PAR）', url: 'https://par.nsf.gov/servlets/purl/10696588' },
    { title: 'Foreign Object Detection in Wireless Power Transfer Systems（硬币钥匙等金属异物在交变磁场中产生涡流温升及异物检测保护）', by: '圣迭戈州立大学电力电子实验室综述论文', url: 'https://chrismi.sdsu.edu/publications/194.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是电火花跳过去', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [380, 70], color: '#dee2e6', text: '充电底座', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 340], size: [320, 64], color: '#343a40', text: '手机', from: 0.6 },
          { kind: 'pulse', at: [600, 460], color: FIELD, radius: 150, from: 1.6 },
          { kind: 'myth', wrong: '电流穿过空气跳进手机', right: '靠来回变化的磁场隔空传能', from: 6 },
        ],
      },
      {
        turn: 1, title: '两个线圈接力', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 580], size: [340, 64], color: COPPER, text: '发射线圈', from: 0.3 },
          { kind: 'flow', path: [[460, 580], [740, 580]], color: '#ffd43b', count: 5, speed: 220, from: 1 },
          { kind: 'pulse', at: [600, 450], color: FIELD, radius: 160, from: 1.8 },
          { kind: 'shape', shape: 'pill', at: [600, 310], size: [300, 64], color: COPPER, text: '接收线圈', from: 2.2 },
          { kind: 'flow', path: [[480, 310], [720, 310]], color: '#51cf66', count: 5, speed: 200, from: 3 },
          { kind: 'text', at: [600, 810], text: '变化的磁场隔空晃出感应电流', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '穿塑料但怕拿远', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [340, 450], size: [260, 30], color: '#a5d8ff', text: '塑料壳', from: 0.4 },
          { kind: 'arrow', path: [[340, 560], [340, 320]], color: FIELD, text: '磁场直穿', from: 1.2 },
          { kind: 'shape', shape: 'pill', at: [860, 580], size: [240, 50], color: COPPER, text: '底座', from: 2 },
          { kind: 'shape', shape: 'pill', at: [860, 250], size: [220, 50], color: '#495057', text: '拿太高', from: 2.4 },
          { kind: 'label', at: [860, 410], pos: [860, 420], text: '磁感线散开够不着', from: 3.4 },
          { kind: 'text', at: [600, 810], text: '贴近放正，穿过的磁感线最多', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '别夹金属硬币', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 580], size: [340, 60], color: COPPER, text: '发射线圈', from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [110, 110], color: '#ffd43b', text: '硬币', tint: { color: HOT, at: 2, over: 2 }, from: 0.8 },
          { kind: 'pulse', at: [600, 440], color: HOT, radius: 130, from: 2.2 },
          { kind: 'label', at: [660, 440], pos: [920, 400], text: '激起涡流发烫！', from: 2.8 },
          { kind: 'text', at: [600, 810], text: '异物检测察觉金属，立刻停充', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '防水牙刷最拿手', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🪥', path: [[360, 440]], size: 140, from: 0.4 },
          { kind: 'label', at: [360, 540], pos: [360, 660], text: '全密封塑料不怕水', from: 1.4 },
          { kind: 'sprite', icon: '🔌', path: [[840, 440]], size: 130, from: 2.2 },
          { kind: 'label', at: [840, 540], pos: [840, 660], text: '插线损耗更少更快', from: 3 },
          { kind: 'text', at: [600, 810], text: '各有各的拿手场合', from: 6 },
        ],
      },
    ],
  },
};
