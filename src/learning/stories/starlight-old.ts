import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const SUN = '#ffb703';
const LIGHT = '#ffd43b';

export const starlightOld: Story = {
  slug: 'starlight-old',
  title: '我们看到的星光是“过去”的吗？',
  trigger: '夏天的夜里，小念和爸爸躺在草地上数星星。爸爸指着天上说：“你现在看到的有些星光，比爷爷的年纪还大。”',
  dialogue: [
    {
      nian: '爸爸，星光怎么会比爷爷还老？我们看到的星光是“过去”的吗？',
      dad: '是的。光跑得特别快，每秒约 30 万公里，一秒钟能绕地球七圈半。可宇宙太大了，星星离我们又特别远，星光要在路上走好多年才能到我们眼睛里。所以你现在看到的星光，是它们很多年以前发出来的。',
    },
    {
      nian: '在路上走好多年……那太阳光要走多久？',
      dad: '太阳离我们约 1.5 亿公里，光要走大约 8 分钟。也就是说，你看到的太阳，是它 8 分钟以前的样子。月亮近得多，月光只要走一秒多。美国航天局的资料里，离太阳最近的恒星叫比邻星，它的光要走 4 年多才到地球。',
      figure: { kind: 'sim', sim: 'lightyear', caption: '换着看月亮、太阳、海王星和比邻星：光要走多久才到你眼里？' },
    },
    {
      nian: '光要走 4 年多……那该怎么说星星有多远？用公里吗？',
      dad: '用公里，数字就太长了。科学家用一个长度单位，叫光年，就是光走一年的路程，大约 9.5 万亿公里。比邻星离我们约 4.2 光年。注意，光年虽然有个“年”字，量的却是距离，不是时间。很多人把光年当成时间单位，这是不对的。',
    },
    {
      nian: '量的却是距离……那最远的星光走了多少年？',
      dad: '天上有的星星离我们几百、几千光年，它们的光就走了几百、几千年才到。你今晚看到的某颗星，它的光可能在唐朝时就出发了。所以看星空，就像在看一张把很多年代叠在一起的老照片。',
    },
    {
      nian: '很多年代叠在一起……那星星现在可能已经不在了吗？',
      dad: '有可能，不过大多数星星的寿命都长得很，几百年、几千年对它们来说只是一眨眼。像太阳这样的恒星，美国航天局说能发光大约 100 亿年，现在才过了一半左右。所以你看到的星星，绝大多数现在还好好地在发光。',
    },
    {
      nian: '我懂了！光虽然跑得快，星星离得更远，星光要走好多年才到。我们看到的星光，都是它们很久以前发出的光；光年是量距离的单位。',
      dad: '说得对！找个晴朗、没有月亮的晚上，和大人一起到远离灯光的地方，数一数你能看到多少颗星星。',
    },
  ],
  tip: '夜里观星要有大人陪着；千万不要用眼睛或望远镜直接看太阳。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播（光速、光年）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Our Sun: Facts（太阳离地球约 1.5 亿公里；比邻星约 4.24 光年；1 光年约 9.5 万亿公里）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/sun/facts/' },
    { title: 'Basics of Space Flight · The Solar System（地球离太阳约 8.3 光分）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/' },
    { title: 'How Old Is the Sun?（像太阳这样的恒星能发光约 90 亿到 100 亿年，太阳已过了一半左右）', by: 'NASA Space Place（美国航天局）', url: 'https://spaceplace.nasa.gov/sun-age/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '光跑得飞快', duration: 12,
        cues: [
          { kind: 'count', at: [600, 290], label: '光每秒约跑', start: 0, end: 30, unit: '万公里', from: 0.5 },
          { kind: 'sprite', icon: '🌍', path: [[600, 560]], size: 150, from: 1.5 },
          { kind: 'flow', path: circle(600, 560, 115), color: LIGHT, count: 6, speed: 420, loop: true, from: 2 },
          { kind: 'text', at: [600, 830], text: '一秒绕地球七圈半', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '8 分钟前的太阳', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [150, 470], size: [200, 200], color: SUN, text: '太阳', from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[1010, 470]], size: 130, from: 0 },
          { kind: 'flow', path: [[260, 470], [940, 470]], color: LIGHT, count: 4, speed: 120, from: 1 },
          { kind: 'count', at: [600, 290], label: '光要走大约', start: 0, end: 8, unit: '分钟', from: 2 },
          { kind: 'text', at: [600, 830], text: '看到的是 8 分钟前的太阳', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '光年是距离', duration: 12,
        cues: [
          { kind: 'count', at: [600, 290], label: '比邻星离我们约', start: 0, end: 4.2, unit: '光年', from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [600, 500], size: [540, 100], color: '#ffe066', text: '光走一年的路程', from: 2 },
          { kind: 'myth', wrong: '光年是时间单位', right: '光年是长度单位', from: 7 },
        ],
      },
      {
        turn: 3, title: '星空老照片', duration: 12,
        cues: [
          { kind: 'sprite', icon: '⭐', path: [[300, 330]], size: 80, from: 0 },
          { kind: 'sprite', icon: '⭐', path: [[600, 260]], size: 60, from: 0.5 },
          { kind: 'sprite', icon: '⭐', path: [[900, 360]], size: 90, from: 1 },
          { kind: 'sprite', icon: '🧒', path: [[600, 680]], size: 110, from: 1.5 },
          { kind: 'flow', path: [[900, 400], [640, 630]], color: LIGHT, count: 3, speed: 80, from: 2 },
          { kind: 'label', at: [900, 360], pos: [1000, 540], text: '几千年前出发的光', from: 3 },
          { kind: 'text', at: [600, 830], text: '星空像一张老照片', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '星星还在吗', duration: 12,
        cues: [
          { kind: 'count', at: [600, 270], label: '能发光大约', start: 0, end: 100, unit: '亿年', from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [600, 520], size: [220, 220], color: SUN, text: '太阳', from: 1.5 },
          { kind: 'label', at: [690, 520], pos: [960, 600], text: '现在过了一半左右', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '大多数星星还在发光', from: 7.5 },
        ],
      },
    ],
  },
};
