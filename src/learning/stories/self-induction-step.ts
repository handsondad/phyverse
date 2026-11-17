import type { Story } from './types';

const COPPER = '#c77d3a';
const FIELD = '#7a9cc6';
const IRON = '#4a4f57';
const HOT = '#e8590c';
const GLASS = '#d6e2ea';

export const selfInductionStep: Story = {
  slug: 'self-induction-step',
  title: '电磁炉面板不烫，锅为什么会热？',
  trigger: '小念帮妈妈煮面，电磁炉上的锅已经咕嘟咕嘟冒泡了。妈妈把锅端开一会儿，用手背轻轻碰了碰面板，说：“只是温的。”',
  dialogue: [
    {
      nian: '爸爸，电磁炉的面板只是温的，锅为什么能热得冒泡？',
      dad: '因为电磁炉不是先把面板烧热，而是让锅底自己发热。面板下面有一个铜线圈，通上来回变得很快的电流，就产生来回变化的磁场。这个磁场穿过面板，在铁锅底里激起一圈圈的电流，叫涡流。锅底有电阻，涡流一流就发热，热的是锅本身。',
    },
    {
      nian: '涡流一流就发热……那面板为什么只是温的？',
      dad: '面板是一种玻璃陶瓷，不导电，变化的磁场穿过它时激不起涡流，它自己不生热。美国能源部说，热是从锅里面生出来的，锅一端走，加热就停了；面板只是被热锅捂热，所以有点温。电磁炉的大部分能量都直接送进了锅里，比燃气灶浪费得少。',
      figure: { kind: 'sim', sim: 'eddy', caption: '换一换放上去的锅，再把锅端起来：锅还热不热？' },
    },
    {
      nian: '锅一端走，加热就停了……那铝锅、陶瓷碗能用电磁炉吗？',
      dad: '陶瓷碗不导电，激不起涡流，一点也不热；铝锅虽然导电，家用电磁炉一般也带不动它，会提示没放锅。美国能源部给了个简单的办法：拿磁铁吸一吸锅底，能吸住的平底锅就能用。很多人以为是电磁炉的面板在加热，其实是锅底自己在发热。',
    },
    {
      nian: '锅底自己在发热……那涡流有时候是不是也挺麻烦的？',
      dad: '是的，在不需要的地方它就是浪费。3D 实验台上有一块线圈里的铁芯：整块铁芯里激起一个大大的涡流环，白白发热；把它切成十片互相绝缘的薄片，每片里的涡流小多了，损耗只剩原来的百分之一左右。变压器的铁芯用一叠硅钢片，就是这个道理。',
      show: { kind: 'lab', step: 6, label: '看「涡流」' },
    },
    {
      nian: '损耗只剩百分之一左右……涡流还能用来干别的吗？',
      dad: '能让东西慢下来。实验台上，让一块磁铁从竖着的铝管里落下去：铝不吸磁铁，可磁铁一动，就在管壁里激起涡流，涡流的磁场反过来拖住它，落 1 米要三秒多，没有铝管只要零点几秒。把铝管锯开一道缝，涡流断了，它就掉得快多了。这叫电磁阻尼。',
      show: { kind: 'lab', step: 7, label: '看「电磁阻尼」' },
    },
    {
      nian: '我懂了！电磁炉里的线圈产生来回变化的磁场，在锅底激起涡流，锅底自己发热，面板只是被热锅捂热。所以锅底要能吸住磁铁，锅一端走就不热了。',
      dad: '说得对！想看铁芯里的涡流和铝管里慢慢落下的磁铁，就去「3D 实验台」做自感与涡流的实验。',
    },
  ],
  tip: '刚做完饭的面板会被热锅捂得很烫，别用手去摸；不要空烧铁锅。互动图里锅的温度只是示意。',
  sources: [
    { title: '物理 选择性必修 第二册 · 第二章 电磁感应 · 第3节 涡流、电磁阻尼和电磁驱动', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Making the Switch to Induction Stoves or Cooktops（热从锅里生出，锅一拿开就停；能吸住磁铁的平底锅都能用）', by: 'U.S. Department of Energy（美国能源部）', url: 'https://www.energy.gov/articles/making-switch-induction-stoves-or-cooktops' },
    { title: 'Residential Induction Cooking Tops（线圈产生磁场让锅自己发热，面板摸着不烫）', by: 'ENERGY STAR（美国“能源之星”）', url: 'https://www.energystar.gov/partner-resources/products_partner_resources/brand-owner/eta-consumers/res-induction-cooking-tops' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '锅底自己发热', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [760, 30], color: GLASS, text: '面板', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 640], size: [480, 50], color: COPPER, text: '线圈', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [460, 190], color: IRON, tint: { color: '#c0392b', at: 4, over: 3 }, from: 1 },
          { kind: 'arrow', path: [[460, 620], [460, 540]], color: FIELD, draw: 0.4, from: 2 },
          { kind: 'arrow', path: [[740, 540], [740, 620]], color: FIELD, draw: 0.4, from: 2.5 },
          { kind: 'flow', path: [[420, 510], [600, 490], [780, 510], [600, 530], [420, 510]], color: '#ffd43b', count: 8, speed: 200, loop: true, from: 3 },
          { kind: 'label', at: [700, 510], pos: [960, 300], text: '涡流', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '热的是锅本身', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '面板不生热', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [760, 30], color: GLASS, text: '面板', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 300], size: [400, 160], color: IRON, slide: { to: [600, 180], at: 3, over: 0.8 }, from: 0 },
          { kind: 'label', at: [600, 560], pos: [300, 700], text: '不导电，不生热', from: 1.5 },
          { kind: 'label', at: [600, 200], pos: [960, 280], text: '一端走就不热', from: 4 },
          { kind: 'text', at: [600, 830], text: '面板是被热锅捂热的', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '能吸住才合适', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [280, 450], size: [220, 120], color: IRON, text: '铁锅', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [220, 120], color: '#cfd5dc', text: '铝锅', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [920, 450], size: [220, 120], color: '#f1e6d2', text: '陶瓷碗', from: 1 },
          { kind: 'sprite', icon: '🧲', path: [[280, 330]], size: 80, from: 2.5 },
          { kind: 'pulse', at: [280, 450], color: HOT, radius: 120, from: 3.5 },
          { kind: 'myth', wrong: '是电磁炉的面板在加热', right: '是锅底自己在发热', from: 7 },
        ],
      },
      {
        turn: 3, title: '切成薄片', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [220, 220], color: '#9aa3ad', text: '整块', from: 0 },
          { kind: 'flow', path: [[250, 370], [410, 370], [410, 530], [250, 530], [250, 370]], color: '#ffd43b', count: 8, speed: 180, loop: true, from: 1 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [220, 220], color: '#9aa3ad', text: '十片', outline: true, from: 2.5 },
          { kind: 'count', at: [870, 680], label: '损耗只剩约', start: 100, end: 1, unit: '%', from: 4 },
          { kind: 'text', at: [600, 830], text: '只剩百分之一左右', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '铝管拖住磁铁', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [110, 460], color: '#dfe3e8', text: '铝管', outline: true, from: 0 },
          { kind: 'sprite', icon: '🧲', path: [[330, 260], [330, 680]], size: 70, travel: 6, from: 1 },
          { kind: 'sprite', icon: '🧲', path: [[640, 260], [640, 680]], size: 70, travel: 0.8, from: 1 },
          { kind: 'label', at: [640, 680], pos: [640, 330], text: '没有铝管', from: 2 },
          { kind: 'count', at: [960, 470], label: '铝管里落1米', start: 0, end: 3, unit: '秒多', from: 6.5 },
          { kind: 'text', at: [600, 830], text: '这叫电磁阻尼', from: 8 },
        ],
      },
    ],
  },
};
