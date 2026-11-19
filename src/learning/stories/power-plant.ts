import type { Story } from './types';

const WIRE = '#5d4e37';
const SPARK = '#ffb703';
const GREEN = '#2f9e44';

export const powerPlant: Story = {
  slug: 'power-plant',
  title: '墙上插座里的电是从哪儿来的，发电厂是在“造”电吗？',
  trigger: '周末坐车走高速，小念看见山脊上一排白色大风车慢悠悠地转，山坡下还铺着大片蓝闪闪的板子，好奇家里的插座是不是就接着它们。',
  dialogue: [
    {
      nian: '爸爸，墙上插座里的电是从哪儿来的？发电厂能凭空把电“造”出来吗？',
      dad: '不能凭空造出来哦！能量守恒定律管得死死的：能量不会无中生有，发电厂其实是一座“能量兑换站”，把大自然里别的能量换成电能。比如烧煤烧气的火力发电、大坝落水的水力发电、山顶的大风车和屋顶的太阳能板，都在忙着把别的能量兑成电。',
    },
    {
      nian: '能量兑换站……烧煤、落水和大风，怎么都能兑成电呢？',
      dad: '前三种干的其实是同一件事：转大轮子！水力发电让高处的水冲下来推水轮机，风力发电让大风吹动叶片，火力发电和核电站则是把水烧成高压水蒸气去吹汽轮机。大轮子一转，就带着发电机里的大磁铁在线圈中间飞快旋转，靠电磁感应生出源源不断的电流。',
      figure: { kind: 'sim', sim: 'turbine', caption: '切换火力、水力、风力和太阳能光伏：看看哪些要靠“转大轮子”，哪个不用转轮子。' },
    },
    {
      nian: '电磁感应……那蓝闪闪的太阳能板里，也藏着小轮子吗？',
      dad: '它是个例外，里面一个轮子也没有！那种板子叫光伏板，是用硅一类的半导体做的。太阳光一照上去，光子直接把里面的电子推得朝一个方向跑，当场就生出了电流。没有锅炉也没有轮机，安安静静晒着太阳就能发电。',
    },
    {
      nian: '晒着太阳就能发电……那现在我们家插座里的电，哪种兑出来的最多？',
      dad: '看国家统计局和国家能源局公布的 2025 年全国发电账本就清楚了：全国一年发了约 10.58 万亿千瓦时的电，其中火电约 6.33 万亿，占了大约六成；水电约 1.46 万亿、太阳能约 1.17 万亿、风电约 1.13 万亿、核电约 0.49 万亿。算下来，每用 10 度电，已经有近 4 度是不烧煤的清洁电啦！',
      figure: {
        kind: 'bars',
        unit: '万亿千瓦时',
        caption: '2025 年全国各类电源发电量（国家统计局统计公报）：每 10 度电里已有近 4 度来自清洁能源。',
        bars: [
          { label: '火电', value: 6.33 },
          { label: '水电', value: 1.46, hot: true },
          { label: '太阳能', value: 1.17, hot: true },
          { label: '风电', value: 1.13, hot: true },
          { label: '核电', value: 0.49, hot: true },
        ],
      },
    },
    {
      nian: '已经有近 4 度是清洁电！这些电发出来以后，是先攒在电线里等我开灯吗？',
      dad: '很多人以为电线像水管存水一样攒着电，其实电在电网上几乎没法直接攒住，发电、输电和用电是同一瞬间完成的！你按下台灯开关的这一秒，几百公里外的发电机组就多出了一点点力气；要是白天阳光大、风又猛，多余的电还得靠抽水蓄能电站把水抽回山顶水库，或者存进大电池里。',
    },
    {
      nian: '我懂了！插座里的电不是发电厂凭空造出来的，而是把燃料、水流、风、核能或阳光换成电能，顺着电网实时送到家里的，每省一度电就是帮远处的电站少耗一份能源。',
      dad: '说得太棒了！人走关灯、空调调到合适的温度，你随手按一下开关，远处的发电厂真的当场就能松一口气。',
    },
  ],
  tip: '插座里的家庭电路电压高达 220 伏，有生命危险，绝不能用手指、湿手或金属丝去捅插孔。数据引自国家统计局《2025 年国民经济和社会发展统计公报》（1 千瓦时就是平时说的 1 度电；火电统计中含少量生物质发电）。',
  sources: [
    { title: '物理 九年级全一册 · 第二十二章 能源与可持续发展 · 第1节 能源；第3节 太阳能', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '中华人民共和国 2025 年国民经济和社会发展统计公报（表4：全年发电量及火电、水电、核电、风电、太阳能分项数据）', by: '国家统计局', url: 'https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html' },
    { title: '2025 年可再生能源并网运行情况（全社会用电量中每 10 度电有近 4 度是绿电）', by: '国家能源局', url: 'https://www.nea.gov.cn/20260212/742b8c6a078347b0b39de676c05c5d58/c.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '能量兑换站', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🔥', path: [[220, 290]], size: 90, from: 0.4 },
          { kind: 'sprite', icon: '🌊', path: [[220, 450]], size: 90, from: 1 },
          { kind: 'sprite', icon: '🌬️', path: [[220, 610]], size: 90, from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [620, 450], size: [260, 140], color: '#3553a6', text: '发电站', from: 2.2 },
          { kind: 'arrow', path: [[320, 450], [470, 450]], color: SPARK, text: '别的能量', from: 2.8 },
          { kind: 'arrow', path: [[770, 450], [980, 450]], color: SPARK, text: '换成电能', from: 3.6 },
          { kind: 'myth', wrong: '发电厂凭空把电造出来', right: '是把别的能量兑换成电能', from: 6.2 },
        ],
      },
      {
        turn: 1, title: '一起转大轮子', duration: 11,
        cues: [
          { kind: 'flow', path: [[160, 440], [460, 440]], color: '#74c0fc', count: 6, speed: 200, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [200, 200], color: '#ffd43b', text: '轮机转', motion: 'pulse', from: 1.2 },
          { kind: 'shape', shape: 'rect', at: [900, 440], size: [210, 140], color: '#e8590c', text: '发电机', from: 2.2 },
          { kind: 'label', at: [900, 360], pos: [900, 230], text: '磁铁在线圈里转', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '水流、大风、蒸汽都推轮子', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '光伏不转轮子', duration: 10,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[250, 270]], size: 130, from: 0.3 },
          { kind: 'ray', path: [[330, 320], [560, 480]], color: SPARK, draw: 1, from: 1.2 },
          { kind: 'ray', path: [[380, 290], [640, 480]], color: SPARK, draw: 1, from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [620, 520], size: [340, 80], color: '#2b579a', text: '光伏硅板', from: 0.8 },
          { kind: 'flow', path: [[790, 520], [1040, 520]], color: SPARK, count: 5, speed: 170, from: 2.8 },
          { kind: 'text', at: [600, 810], text: '阳光直照半导体，直接生电', from: 6 },
        ],
      },
      {
        turn: 3, title: '十度电近四度绿', duration: 12,
        cues: [
          { kind: 'count', at: [360, 360], label: '每用发电量', start: 0, end: 10, unit: '度电', from: 0.6 },
          { kind: 'count', at: [840, 360], label: '清洁绿电近', start: 0, end: 4, unit: '度电', from: 2.2 },
          { kind: 'meter', at: [600, 560], label: '清洁电占比', start: 0, end: 40, over: 2.5, color: GREEN, from: 3 },
          { kind: 'text', at: [600, 810], text: '水电、风光、核电越来越多', from: 7 },
        ],
      },
      {
        turn: 4, title: '实时发实时用', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [240, 460], size: [200, 120], color: '#3553a6', text: '发电厂', from: 0.2 },
          { kind: 'bond', a: [340, 460], b: [860, 460], color: WIRE, from: 0.6 },
          { kind: 'flow', path: [[340, 460], [860, 460]], color: SPARK, count: 7, speed: 260, from: 1.4 },
          { kind: 'sprite', icon: '💡', path: [[950, 450]], size: 120, from: 1.8 },
          { kind: 'label', at: [600, 460], pos: [600, 280], text: '电线不存电，同步送达', from: 3 },
          { kind: 'text', at: [600, 810], text: '一按开关，远处同步发电', from: 6.5 },
        ],
      },
    ],
  },
};
