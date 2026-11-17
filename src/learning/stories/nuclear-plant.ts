import type { Story } from './types';

const URANIUM = '#2f9e44';
const NEUTRON = '#adb5bd';
const HEAT = '#ffd43b';
const ROD = '#495057';

export const nuclearPlant: Story = {
  slug: 'nuclear-plant',
  title: '核电站里“烧”的是什么，会像原子弹一样爆炸吗？',
  trigger: '电视里在介绍一座核电站。小念想起电影里原子弹爆炸时腾起的蘑菇云，有点担心地凑到爸爸身边。',
  dialogue: [
    {
      nian: '爸爸，核电站里“烧”的是什么？会不会像原子弹一样爆炸？',
      dad: '先说它“烧”的是什么：核电站里其实没有火，用的燃料是铀。铀原子核被一个中子打中，会裂成两半，同时放出很多热，这叫核裂变。这些热把水烧成蒸汽，蒸汽推着汽轮机转，带动发电机发电。美国能源部的科普也是这样讲反应堆的。',
    },
    {
      nian: '裂成两半……一个原子核放出的热，够发电用吗？',
      dad: '一个当然不够。可铀原子核裂开时，还会放出两三个新的中子，它们又去打中别的铀原子核，一个接一个地裂下去，这叫链式反应。课本里说，核电站就是让链式反应有控制地、平稳地一直进行下去，源源不断地放出热来。',
    },
    {
      nian: '有控制地一直进行……要怎么控制它？',
      dad: '靠控制棒。控制棒能吸收中子，把它往堆芯里插深一点，被吸走的中子多了，反应就变慢；往外拔一点，反应就变快。让每次裂变平均正好引起下一次裂变，反应就不快不慢。堆芯泡在水里，水还能让中子慢下来、把热带走。',
      figure: { kind: 'sim', sim: 'chain', caption: '把控制棒插深、插浅：每一代的裂变会越来越多、越来越少，还是一样多？' },
    },
    {
      nian: '反应就不快不慢……那核电站会不会像原子弹一样炸开？',
      dad: '不会，这是物理规律决定的。美国能源部说，核电站燃料里容易裂变的铀-235 只占百分之三到五，原子弹却要百分之九十以上，还要做成特别的样子，让反应在一眨眼间全部发生。核电站从燃料到控制棒，每一处都是为了让热慢慢地、稳稳地放出来。',
    },
    {
      nian: '慢慢地、稳稳地放出来……那核电站就一点危险都没有吗？',
      dad: '也不能这么说。裂变后剩下的燃料有很强的放射性，要用水和厚厚的保护壳层层包住，用完还要小心地长期存放。所以核电站设了好几道安全屏障，还要严格管理。它不会像原子弹那样爆炸，但要一直认真对待。',
    },
    {
      nian: '我懂了！核电站里没有火，是铀原子核裂变放出热来发电。控制棒吸收中子，让链式反应平稳地进行。燃料里容易裂变的铀只有百分之三到五，所以不会像原子弹那样爆炸。',
      dad: '说得对！摆一长排多米诺骨牌，中间抽掉几块再推倒，看看抽掉的地方是不是像控制棒一样，让倒下的势头停住了。',
    },
  ],
  tip: '摆多米诺骨牌要找平稳的桌面。互动图里的反应堆只是示意，真实的堆芯有上百组燃料，控制系统也复杂得多。',
  sources: [
    { title: '物理 九年级 · 第二十二章 能源与可持续发展 · 第2节 核能（核裂变、链式反应；核电站让链式反应可控地进行）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'NUCLEAR 101: How Does a Nuclear Reactor Work?（裂变放热烧水发电；水让中子减速并带走热；控制棒插入减慢、拔出加快反应；堆芯由几百组燃料组成）', by: 'U.S. Department of Energy（美国能源部）', url: 'https://www.energy.gov/ne/articles/nuclear-101-how-does-nuclear-reactor-work' },
    { title: 'Beyond Oppenheimer: How Nuclear Weapons and Nuclear Reactors are Different（核电燃料约 3%～5% 的铀-235，核武器要 90% 以上；反应堆的燃料、控制棒和保护壳都为平稳放热设计）', by: 'U.S. Department of Energy（美国能源部）', url: 'https://www.energy.gov/ne/articles/beyond-oppenheimer-how-nuclear-weapons-and-nuclear-reactors-are-different' },
    { title: 'Frequently Asked Questions About Radiation Protection（反应堆里的材料分布方式让它不会瞬间放出能量，不会爆炸）', by: 'U.S. NRC（美国核管理委员会）', url: 'https://www.nrc.gov/about-nrc/radiation/related-info/faq' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '没有火的“锅炉”', duration: 12,
        cues: [
          { kind: 'atom', path: [[150, 450], [420, 450]], symbol: 'n', color: NEUTRON, r: 18, travel: 2, from: 0.5, to: 3 },
          { kind: 'atom', path: [[520, 450]], symbol: '铀', color: URANIUM, r: 60, from: 0, to: 3 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [84, 84], color: URANIUM, slide: { to: [400, 320], at: 3, over: 1 }, from: 3 },
          { kind: 'shape', shape: 'circle', at: [520, 450], size: [84, 84], color: URANIUM, slide: { to: [640, 580], at: 3, over: 1 }, from: 3 },
          { kind: 'pulse', at: [520, 450], color: HEAT, radius: 220, from: 3 },
          { kind: 'sprite', icon: '♨️', path: [[960, 420]], size: 130, from: 5 },
          { kind: 'label', at: [960, 480], pos: [960, 640], text: '热把水烧成蒸汽', from: 5.5 },
          { kind: 'text', at: [600, 830], text: '裂开时放出很多热', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '一个接一个', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [240, 450], size: [70, 70], color: URANIUM, from: 0 },
          { kind: 'arrow', path: [[280, 430], [480, 330]], color: '#e8590c', draw: 0.5, from: 1.5 },
          { kind: 'arrow', path: [[280, 470], [480, 570]], color: '#e8590c', draw: 0.5, from: 1.5 },
          { kind: 'shape', shape: 'circle', at: [530, 320], size: [70, 70], color: URANIUM, from: 2 },
          { kind: 'shape', shape: 'circle', at: [530, 580], size: [70, 70], color: URANIUM, from: 2 },
          { kind: 'pulse', at: [240, 450], color: HEAT, radius: 160, from: 1 },
          { kind: 'particles', box: [720, 250, 380, 400], count: 8, color: URANIUM, motion: 'jitter', size: 30, from: 4.5 },
          { kind: 'text', at: [600, 830], text: '一个接一个：链式反应', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '控制棒吸中子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [620, 420], color: '#d0ebff', from: 0 },
          { kind: 'particles', box: [310, 290, 580, 380], count: 16, color: '#e8590c', motion: 'gas', amount: { at: 3, over: 3, from: 16, to: 6 }, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [460, 300], size: [40, 240], color: ROD, slide: { to: [460, 430], at: 3, over: 2 }, from: 1 },
          { kind: 'shape', shape: 'rect', at: [740, 300], size: [40, 240], color: ROD, slide: { to: [740, 430], at: 3, over: 2 }, from: 1 },
          { kind: 'label', at: [740, 220], pos: [1000, 200], text: '控制棒', from: 1.5 },
          { kind: 'text', at: [600, 830], text: '插深变慢，拔出变快', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '不会像原子弹', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 320], label: '核电站燃料', start: 0, end: 0.05, color: URANIUM, from: 1.5 },
          { kind: 'meter', at: [600, 500], label: '原子弹', start: 0, end: 0.9, color: '#e03131', from: 3 },
          { kind: 'label', at: [420, 320], pos: [260, 220], text: '容易裂变的铀', from: 4 },
          { kind: 'myth', wrong: '核电站会像原子弹爆炸', right: '燃料太“淡”，炸不起来', from: 7 },
        ],
      },
      {
        turn: 4, title: '层层保护', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [620, 480], color: '#ced4da', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 490], size: [440, 340], color: '#868e96', from: 1 },
          { kind: 'shape', shape: 'rect', at: [600, 510], size: [240, 180], color: '#d0ebff', text: '堆芯', from: 2 },
          { kind: 'label', at: [600, 240], pos: [960, 200], text: '厚厚的保护壳', from: 3 },
          { kind: 'text', at: [600, 830], text: '一直认真对待', from: 7.5 },
        ],
      },
    ],
  },
};
