import type { Story } from './types';

const HOT = '#e8590c';

export const breakerTrip: Story = {
  slug: 'breaker-trip',
  title: '电器一起开，为什么会跳闸？',
  trigger: '冬天的晚上，客厅里开着电暖器，爸爸又烧上一壶水，“啪”的一声，屋里一下子全黑了。',
  dialogue: [
    {
      nian: '爸爸，电暖器开着，又烧了一壶水，怎么“啪”地一下全黑了？',
      dad: '那是空气开关跳闸了。家里的电器都并联在 220 伏的电线上，每多开一个，就多一条路分走电流，干路上的总电流就越来越大。电暖器、电热水壶这类发热的电器很费电，两个一起开，总电流一下子超过了这条线路允许的大小，开关就自动断电了。',
    },
    {
      nian: '总电流超过了允许的大小……那怎么知道电流有多大？',
      dad: '看电器的功率就能算。功率等于电压乘电流，反过来，电流就等于功率除以电压。比如一台约 2000 瓦的电暖器，电流约等于 2000 除以 220，大约 9 安。再开一台约 1800 瓦的电水壶，又多出 8 安左右，加起来就有 17 安多了。',
      eq: 'I = P / U',
      figure: { kind: 'sim', sim: 'load', caption: '开一开电暖器、电热水壶和空调：总电流有多大？超过 16 安会怎样？' },
    },
    {
      nian: '加起来有 17 安多……那电流大了会怎么样？',
      dad: '电流越大，电线越热。电线发的热跟电流的平方有关，电流大了很多，电线就热得厉害，时间长了外皮会软化、熔掉，甚至起火。空气开关一发现电流超过了它允许的大小，就“啪”地断开。很多人以为跳闸是电线坏了，其实往往是开关在保护你。',
    },
    {
      nian: '开关在保护你……那跳闸以后，能直接把开关推上去吗？',
      dad: '先别急，这得让大人来做。国家应急广播请消防员讲过：先把这条线路上的电器关掉、插头拔掉，再用绝缘的工具或戴绝缘手套去合闸；然后一个一个插回电器，哪个一插就跳，就是它出了毛病。要是一推上去马上又跳，可能是线路短路，得请电工来修。',
    },
    {
      nian: '一推上去马上又跳……短路是怎么回事？',
      dad: '短路就是火线和零线没经过电器，直接碰在了一起，比如电线外皮破了。这时电路里几乎没有电阻拦着，电流一下子变得特别大，开关会瞬间跳闸，还可能伴着一声爆响。课本里说，家庭电路中电流过大，一是用电器的总功率过大，二是短路。',
    },
    {
      nian: '我明白了！电器开得越多，总功率越大，总电流就越大。电流太大电线会发热，空气开关就跳闸断电，保护电线不起火。大功率的电器别插在同一个插线板上。',
      dad: '说得对！去看看家里电暖器、电水壶底下的铭牌，找到写着“瓦”的那个数，用它除以 220，算一算它工作时的电流有多大。',
    },
  ],
  tip: '互动图里电器的功率是常见的大概数，以铭牌为准；“16 安”只是举例，各家线路允许的电流不一样。合闸、修线路要让大人来做，线路有问题请持证电工。',
  sources: [
    { title: '物理 九年级全一册 · 第十八章 电功率 · 第2节 电功率；第十九章 生活用电 · 第2节 家庭电路中电流过大的原因', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '家中电路跳闸？千万不要徒手合闸！（过载跳闸、短路跳闸，合闸前先切断负载）', by: '央视网 · 国家应急广播', url: 'https://news.cctv.com/2026/02/01/ARTIJ5XuLhlkA6Ic2nOVrpIo260201.shtml' },
    { title: '注意！这些夏季消暑电器也需防火（大功率电器配专用线路，防止线路过载发热）', by: '国家消防救援局', url: 'https://www.119.gov.cn/kp/hzyf/jt/2025/50059.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '啪，全黑了', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔥', path: [[280, 520]], size: 130, from: 0 },
          { kind: 'sprite', icon: '🫖', path: [[560, 520]], size: 130, from: 1.5 },
          { kind: 'meter', at: [420, 300], label: '总电流', start: 0.35, end: 1, color: HOT, over: 3, from: 2 },
          { kind: 'shape', shape: 'rect', at: [940, 480], size: [130, 210], color: '#f4efe4', text: '空气开关', from: 0 },
          { kind: 'pulse', at: [940, 480], color: HOT, radius: 110, from: 5 },
          { kind: 'text', at: [600, 830], text: '超过允许的电流就跳闸', from: 7 },
        ],
      },
      {
        turn: 1, title: '算一算电流', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 260], text: 'I = P ÷ U', from: 0.5 },
          { kind: 'count', at: [280, 480], label: '电暖器约', start: 0, end: 9, unit: '安', over: 1.2, from: 2.5 },
          { kind: 'count', at: [600, 480], label: '电水壶约', start: 0, end: 8, unit: '安', over: 1.2, from: 4 },
          { kind: 'count', at: [920, 480], label: '加起来超过', start: 0, end: 17, unit: '安', over: 1.2, from: 5.5 },
          { kind: 'text', at: [600, 830], text: '发热的电器很费电', from: 8 },
        ],
      },
      {
        turn: 2, title: '电线会变热', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 400], size: [900, 44], color: '#5d4e37', tint: { color: HOT, at: 2, over: 3 }, from: 0 },
          { kind: 'flow', path: [[150, 400], [1050, 400]], color: '#ffd43b', count: 10, speed: 360, from: 1 },
          { kind: 'pulse', at: [600, 400], color: HOT, radius: 90, from: 4 },
          { kind: 'label', at: [600, 425], pos: [600, 580], text: '电流大，电线热', from: 3 },
          { kind: 'myth', wrong: '跳闸就是电线坏了', right: '往往是开关在保护你', from: 7 },
        ],
      },
      {
        turn: 3, title: '先拔掉插头', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔌', path: [[330, 500], [170, 500]], size: 120, travel: 2, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [800, 480], size: [150, 230], color: '#f4efe4', text: '合闸', from: 0 },
          { kind: 'sprite', icon: '🧤', path: [[800, 660]], size: 100, from: 3 },
          { kind: 'label', at: [860, 400], pos: [1030, 270], text: '用绝缘工具', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '这得让大人来做', from: 7 },
        ],
      },
      {
        turn: 4, title: '短路', duration: 12,
        cues: [
          { kind: 'bond', a: [200, 330], b: [1000, 330], color: HOT, from: 0 },
          { kind: 'bond', a: [200, 560], b: [1000, 560], color: '#3553a6', from: 0 },
          { kind: 'bond', a: [700, 330], b: [700, 560], color: '#5d4e37', from: 2 },
          { kind: 'flow', path: [[200, 330], [700, 330], [700, 560], [200, 560]], color: '#ffd43b', count: 12, speed: 700, from: 2.5 },
          { kind: 'pulse', at: [700, 445], color: HOT, radius: 90, from: 3 },
          { kind: 'label', at: [720, 445], pos: [960, 445], text: '火线碰上零线', from: 3 },
          { kind: 'text', at: [600, 830], text: '电流特别大，瞬间跳闸', from: 7 },
        ],
      },
    ],
  },
};
