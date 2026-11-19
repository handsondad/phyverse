import type { Story } from './types';

const COBALT = '#9775fa';
const SPIN = '#7048e8';
const MIRROR = '#a5c3e6';
const BLUE = '#3553a6';
const HOT = '#e8590c';

export const wuMirror: Story = {
  slug: 'wu-mirror',
  title: '镜子里的世界，和真实世界一模一样吗？',
  trigger: '小念对着镜子举起右手，镜子里的“小念”举起的却像是左手。爸爸说，七十年前，一位中国出生的女物理学家用一个实验回答了“镜子里的世界和真实世界一样不一样”。',
  dialogue: [
    {
      nian: '爸爸，镜子里的我只是左右反了，镜子里会发生的事，现实里不也都能发生吗？',
      dad: '大多数时候是这样！镜子里的你走路、跳绳、扔球，现实里都能照样做，物理学家把这叫“左右对称”，三十年来几乎人人深信不疑。可 1956 年，李政道和杨振宁提出：在原子核衰变这类“弱相互作用”里，这条规矩可能不成立。',
    },
    {
      nian: '可能不成立？那要怎么证明镜子里和现实不一样？',
      dad: '需要一个精巧又极难做的实验，做它的是美籍华裔物理学家吴健雄。她选了会衰变的钴 60，和美国国家标准局的科学家一起，把钴 60 冻到只比绝对零度高一点点，再加上磁场，让原子核像小陀螺一样朝同一个方向自转，排得整整齐齐。',
      figure: {
        kind: 'image',
        src: '/images/photos/wu-chien-shiung-1958.webp',
        alt: '1958 年的吴健雄身穿旗袍、面带微笑，出席学术研讨会，黑白照片',
        caption: '1958 年的吴健雄。她用钴 60 实验证明了宇称不守恒。',
        credit: 'Smithsonian Institution · 无已知版权限制',
        href: 'https://commons.wikimedia.org/wiki/File:Chien-Shiung_Wu_(1912-1997)_in_1958.jpg',
      },
    },
    {
      nian: '原子核排整齐了，然后会发生什么？',
      dad: '钴 60 衰变时会射出电子。如果真的左右对称，电子朝自转方向和反方向飞出的应该一样多。可测量结果是：电子总是往和自转方向相反的一头飞得更多！1956 年圣诞节到元旦之间，第一批结果出来了，后来又反复验证。',
    },
    {
      nian: '电子往一头飞得多，跟镜子有什么关系？',
      dad: '把这个实验放到镜子前看：镜子里，原子核的自转方向反过来了，可电子飞的方向没变，变成顺着自转飞得多。真实世界里从来做不出这个结果。也就是说，镜子里的样子在现实中不会发生——宇宙原来分得出左和右，这叫“宇称不守恒”。',
      figure: { kind: 'sim', sim: 'parityMirror', caption: '先把钴原子核冻住排整齐，再切到“镜子里的样子”，比比电子朝哪边飞得多。' },
    },
    {
      nian: '宇称不守恒……这个发现后来怎么样了？',
      dad: '它震动了整个物理学界！1957 年，提出预言的李政道和杨振宁获得了诺贝尔物理学奖，他们是最早获得诺贝尔奖的华人。吴健雄虽然没有一起获奖，她的实验却被写进了教科书，她后来还成为美国物理学会第一位女会长。',
    },
    {
      nian: '我明白了！吴健雄把钴 60 冻得极冷、让原子核排整齐，发现电子总往和自转相反的一头多飞，镜子里却变成顺着自转飞，现实中做不到，所以镜子里的世界和真实世界不一样。',
      dad: '讲得清清楚楚！只有在弱相互作用里才这样，日常生活中镜子里的事照样能发生。吴健雄用一个实验推翻了物理学家相信了几十年的“规矩”，这就是实验的力量。',
    },
  ],
  tip: '实验在只比绝对零度高一点点的超低温下进行，钴 60 是放射性物质，只能在专业实验室里操作。实验经过取自美国国家标准与技术研究院（原美国国家标准局）的展览资料；互动图里“往上 30 个、往下 70 个”只是示意比例，不是实测数。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第五章 原子核 · 第2节 放射性元素的衰变；八年级上册 · 第四章 光现象 · 平面镜成像', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'The Fall of Parity（1956 年圣诞到元旦间在美国国家标准局取得第一批结果；镜像世界与真实世界可以区分；吴健雄是美国物理学会首位女会长）', by: '美国国家标准与技术研究院（NIST）', url: 'https://www.nist.gov/pml/fall-parity' },
    { title: 'The Reversal of Parity Law in Nuclear Physics（钴 60 原子核低温定向，β 粒子更多地朝与核自旋相反的方向发射；此前该定律被普遍接受了 30 年）', by: '美国国家标准与技术研究院（NIST）', url: 'https://www.nist.gov/pml/fall-parity/reversal-parity-law-nuclear-physics' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '镜子里的世界', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [14, 520], color: MIRROR, from: 0.2 },
          { kind: 'sprite', icon: '🙋', path: [[400, 460]], size: 160, from: 0.5 },
          { kind: 'sprite', icon: '🙋', path: [[800, 460]], size: 160, from: 1 },
          { kind: 'count', at: [960, 250], label: '人们相信了', start: 0, end: 30, unit: '年', from: 2.5 },
          { kind: 'text', at: [600, 820], text: '弱相互作用里也对称吗？', from: 6 },
        ],
      },
      {
        turn: 1, title: '冻住的钴60', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [620, 460], size: [140, 140], color: COBALT, text: '钴60', from: 0.3 },
          { kind: 'meter', at: [300, 360], label: '温度', start: 80, end: 3, over: 3, from: 1 },
          { kind: 'label', at: [300, 400], pos: [300, 620], text: '接近绝对零度', from: 3 },
          { kind: 'arrow', path: [[820, 560], [820, 340]], color: SPIN, text: '自转排整齐', from: 4.5 },
          { kind: 'text', at: [600, 820], text: '磁场让原子核排好队', from: 7 },
        ],
      },
      {
        turn: 2, title: '电子偏向一头', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [100, 100], color: COBALT, text: '钴', from: 0.2 },
          { kind: 'arrow', path: [[690, 520], [690, 380]], color: SPIN, text: '自转', from: 0.6 },
          { kind: 'flow', path: [[600, 520], [600, 760]], color: BLUE, count: 6, from: 2 },
          { kind: 'flow', path: [[600, 400], [600, 200]], color: HOT, count: 2, from: 2.5 },
          { kind: 'label', at: [600, 700], pos: [880, 720], text: '往下飞得多', from: 4 },
          { kind: 'text', at: [300, 300], text: '1956年底出结果', from: 6 },
        ],
      },
      {
        turn: 3, title: '镜子里不一样', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [14, 540], color: MIRROR, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [380, 440], size: [90, 90], color: COBALT, text: '真', from: 0.4 },
          { kind: 'arrow', path: [[450, 490], [450, 380]], color: SPIN, text: '自转朝上', from: 1 },
          { kind: 'flow', path: [[380, 490], [380, 690]], color: BLUE, count: 4, from: 1.5 },
          { kind: 'shape', shape: 'circle', at: [820, 440], size: [90, 90], color: COBALT, text: '镜', from: 3 },
          { kind: 'arrow', path: [[750, 380], [750, 490]], color: SPIN, text: '自转朝下', from: 3.5 },
          { kind: 'flow', path: [[820, 490], [820, 690]], color: BLUE, count: 4, from: 4 },
          { kind: 'myth', wrong: '镜子里的事现实中一定能发生', right: '弱相互作用分得出左和右', from: 8 },
        ],
      },
      {
        turn: 4, title: '震动物理学界', duration: 10,
        cues: [
          { kind: 'count', at: [380, 320], label: '诺贝尔奖', start: 1950, end: 1957, unit: '年', from: 0.5 },
          { kind: 'text', at: [380, 500], text: '李政道、杨振宁', from: 2 },
          { kind: 'sprite', icon: '🔬', path: [[840, 420]], size: 150, from: 3.5 },
          { kind: 'label', at: [840, 500], pos: [840, 660], text: '美国物理学会首位女会长', from: 4.5 },
          { kind: 'text', at: [600, 820], text: '实验推翻了旧规矩', from: 7 },
        ],
      },
    ],
  },
};
