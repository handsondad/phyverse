import type { Story } from './types';

const HAIR = '#8d6e4c';
const ATOM = '#74c0fc';

export const atomSize: Story = {
  slug: 'atom-size',
  title: '原子到底有多小？',
  trigger: '小念拔下一根头发，放在白纸上，眯着眼睛看了半天：“这么细了，还能再分成更小的东西吗？”',
  dialogue: [
    {
      nian: '爸爸，课本上说东西都是原子组成的，原子到底有多小？',
      dad: '小得超乎想象。课本里说，分子、原子小到连普通的光学显微镜都看不见。就拿你这根头发来说，它的粗细里能并排摆下 20 万个左右的原子。美国的纳米科普资料也说，一根头发大约几万到十万纳米粗，而一纳米里只能排下三个左右的原子。',
    },
    {
      nian: '能并排摆下 20 万个……那一纳米到底有多长？',
      dad: '一纳米是一米的十亿分之一。打个比方：你的指甲每秒大约长 1 纳米，可你盯着看一整天，也看不出它长了。流感病毒大约一百纳米，DNA 大约两纳米半粗，原子只有零点几纳米。要一层层往下缩，才缩得到原子这么小。',
      figure: { kind: 'sim', sim: 'zoom', caption: '从头发丝一层层放大下去：每往下一层，要再缩小多少倍？' },
    },
    {
      nian: '一层层往下缩……原子这么小，科学家怎么知道它真的存在？',
      dad: '早先靠推理：一滴墨水滴进清水，不搅也会慢慢散开；闻到花香，是因为香味的小颗粒自己跑进了鼻子。这些现象只有“东西由不停运动的小颗粒组成”才说得通。后来科学家造出了特别的显微镜，用极尖的针在表面一点点“摸”，真的看到了原子排成的样子。',
    },
    {
      nian: '真的看到了原子……那原子是最小的东西吗？',
      dad: '还不是。原子正中间有一个原子核，外面是一团电子。原子核又小得出奇，只有原子的大约十万分之一。要是把一个原子放大成一座大体育场，原子核也就像场地正中间的一只小虫子。原子核里面，还挤着质子和中子。',
    },
    {
      nian: '像一只小虫子……那用放大镜能看到原子吗？',
      dad: '看不到。放大镜只能放大几倍；学校里的显微镜能看清细胞，却连大多数病毒都看不清，更别说原子。光本身就太“粗”了，用光去照原子，就像拿粗毛笔描一根细细的线，怎么也描不出来。很多人以为放大镜够厉害就能看到原子，其实差得太远了。',
    },
    {
      nian: '我懂了！原子小得要用纳米来量，一根头发丝的粗细里能并排摆下 20 万个左右。原子正中间还有一个更小的原子核。',
      dad: '说得对！拿一张白纸摸一摸它的厚度：它大约有十万纳米厚，算一算，大约能叠下几十万层原子。',
    },
  ],
  tip: '拔头发观察时轻一点，别用力扯。互动图里各层东西的大小只是示意，真实的比例差得太远，没法按比例画在一张图上。',
  sources: [
    { title: '物理 九年级 · 第十三章 内能 · 第1节 分子热运动（分子很小，用光学显微镜也看不见；扩散现象）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 选择性必修 第三册 · 第四章 原子结构和波粒二象性（原子核的大小）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What is Nano?（头发约 6–10 万纳米粗；1 纳米约 3 个原子长；流感病毒约 100 纳米；DNA 约 2.5 纳米；指甲每秒约长 1 纳米；纸约 10 万纳米厚）', by: 'NNCI（美国国家科学基金会支持的国家纳米技术协调基础设施）', url: 'https://nnci.net/what-nano' },
    { title: 'Understanding the Nano Size Scale · Teacher Guide（用扫描探针显微镜“看”纳米世界）', by: 'NNCI', url: 'https://nnci.net/sites/default/files/2020-07/understand_nano_size_scale_TG.pdf' },
    { title: 'Physics for Future Presidents · Ch. 4 Nuclei and Radioactivity（头发约 20 万个原子粗；原子核只有原子的十万分之一，像体育场里的一只蚊子）', by: 'Richard A. Muller · 加州大学伯克利分校', url: 'https://muller.lbl.gov/teaching/Physics10/PffP_textbook/PffP-04-radioactivity-5-27.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '头发丝里排原子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 400], size: [900, 90], color: HAIR, from: 0 },
          { kind: 'label', at: [300, 400], pos: [300, 250], text: '一根头发丝', from: 0.5 },
          { kind: 'particles', box: [150, 560, 900, 70], count: 26, color: ATOM, motion: 'jitter', size: 10, from: 3 },
          { kind: 'label', at: [600, 595], pos: [880, 700], text: '放大看：一个个原子', from: 4 },
          { kind: 'count', at: [880, 250], label: '头发粗细里', start: 0, end: 20, unit: '万个原子', from: 2 },
          { kind: 'text', at: [600, 830], text: '并排摆下 20 万个左右', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '一纳米有多长', duration: 12,
        cues: [
          { kind: 'count', at: [600, 230], label: '指甲每秒长约', start: 0, end: 1, unit: '纳米', from: 1 },
          { kind: 'shape', shape: 'circle', at: [300, 520], size: [220, 220], color: '#fcc2d7', text: '病毒', from: 3 },
          { kind: 'shape', shape: 'circle', at: [640, 540], size: [110, 110], color: '#a5d8ff', text: 'DNA', from: 4 },
          { kind: 'shape', shape: 'circle', at: [880, 550], size: [40, 40], color: ATOM, from: 5 },
          { kind: 'label', at: [880, 550], pos: [960, 700], text: '原子：零点几纳米', from: 5.5 },
          { kind: 'text', at: [600, 830], text: '一层层往下缩', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '看不见也知道', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [420, 470], size: [440, 340], color: '#e7f5ff', outline: true, from: 0 },
          { kind: 'particles', box: [220, 320, 400, 300], count: 18, color: '#5c7cfa', motion: 'gas', from: 1 },
          { kind: 'label', at: [420, 320], pos: [420, 220], text: '墨水自己散开', from: 2 },
          { kind: 'sprite', icon: '🔬', path: [[900, 430]], size: 170, from: 4.5 },
          { kind: 'label', at: [900, 360], pos: [900, 230], text: '特别的显微镜', from: 5 },
          { kind: 'text', at: [600, 830], text: '真的看到了原子', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '原子核小得出奇', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏟️', path: [[600, 450]], size: 440, from: 0 },
          { kind: 'sprite', icon: '🦟', path: [[600, 470]], size: 40, from: 3 },
          { kind: 'label', at: [600, 470], pos: [960, 260], text: '原子核像一只小虫', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '核只有原子十万分之一', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '放大镜不够用', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔍', path: [[260, 430]], size: 150, from: 0 },
          { kind: 'label', at: [260, 500], pos: [260, 640], text: '只放大几倍', from: 1 },
          { kind: 'sprite', icon: '🔬', path: [[620, 430]], size: 150, from: 2 },
          { kind: 'label', at: [620, 500], pos: [620, 640], text: '能看清细胞', from: 3 },
          { kind: 'sprite', icon: '🦠', path: [[960, 430]], size: 70, from: 4 },
          { kind: 'label', at: [960, 470], pos: [960, 640], text: '病毒都看不清', from: 4.5 },
          { kind: 'myth', wrong: '放大镜够厉害就能看到原子', right: '光太“粗”，照不出原子', from: 7 },
        ],
      },
    ],
  },
};
