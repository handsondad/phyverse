import type { Story } from './types';

export const planeLift: Story = {
  slug: 'plane-lift',
  title: '几百吨重的飞机为什么能飞起来？',
  trigger: '机场的大玻璃窗外，一架大飞机在跑道上越跑越快，机头一抬，几百吨重的大家伙就稳稳地离开了地面。',
  dialogue: [
    {
      nian: '爸爸，飞机那么重，是什么把它托到天上去的？',
      dad: '是机翼和空气。飞机在跑道上越跑越快，空气飞快地流过机翼，机翼斜着一点迎上去，把流过的空气往下压；空气也反过来把机翼往上推。这个往上推的力叫升力。跑得够快，升力超过飞机的重量，它就飞起来了。',
      figure: { kind: 'sim', sim: 'wing', caption: '先拖速度，再拖机翼抬起的角度：看升力什么时候超过 575 吨；角度抬得太陡又会怎样？' },
    },
    {
      nian: '把空气往下压，空气就把机翼往上推？就像力的作用是相互的？',
      dad: '对，就是这个道理。换个角度看也一样：机翼上面的空气被带着流得更快、压强更小，下面的压强更大，上下一差，也是把机翼往上托。两种说法讲的是同一件事：机翼让空气拐了弯，也让上下的压强不一样了。',
    },
    {
      nian: '上面的空气流得更快？是因为上面那条路更长，要跟下面的空气同时到达吗？',
      dad: '很多书上都这么说，其实“同时到达”是错的。美国国家航空航天局的科普网页专门解释过：上面的空气比下面的跑得快得多，根本不会和下面的同时到达机翼后面。纸飞机的机翼上下一样长，照样能飞；特技飞机还能倒着飞。真正要紧的是机翼把空气往下拐。',
    },
    {
      nian: '把空气往下拐……那飞机为什么要在跑道上跑那么远才起飞？',
      dad: '因为升力跟速度关系很大：速度变成两倍，升力差不多变成四倍。像空客 A380 这样的大飞机，最大起飞重量有 575 吨，要在跑道上加速到每小时两三百千米，再把机头抬起来，让机翼迎着气流的角度变大，升力才够把它托起来。',
    },
    {
      nian: '角度变大升力就变大，那机头抬得越高越好吗？',
      dad: '不是。角度抬得太陡，空气就贴不住机翼上表面，乱成一团，升力反而一下子变小，这叫失速，非常危险。所以飞行员要把速度和角度配合好，飞机上还有提醒失速的警告装置。起飞、降落时机翼会伸出襟翼，让机翼变大变弯，飞得慢一点也有足够的升力。',
    },
    {
      nian: '我明白了！飞机跑得飞快，机翼斜着迎上气流，把空气往下压，空气就把机翼往上推，上面压强小、下面压强大。速度够快、角度合适，升力超过重量，几百吨的飞机就飞起来了。',
      dad: '说得好！拿一张纸条，一头贴在下嘴唇下面，顺着纸条上面用力吹气，纸条会往上飘起来。再折几只纸飞机，把机翼后边往上或往下折一点点，比比飞起来有什么不同。',
    },
  ],
  tip: '互动图按一架约 575 吨、机翼面积约 845 平方米的大型客机，用升力公式粗略估算，起飞速度、角度和失速点都是示意值。“上下两股气流同时到达”的错误说法在不少地方还能看到，NASA 格伦研究中心的科普页面专门解释了它错在哪里。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第4节 流体压强与流速的关系', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Incorrect Lift Theory（“等时到达”为什么是错的）', by: 'NASA Glenn Research Center', url: 'https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/wrong1.html' },
    { title: 'What is Lift?（升力来自机翼让气流拐弯）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/what-is-lift/' },
    { title: 'A380 Facts and Figures（最大起飞重量 575 吨、机翼面积 845 平方米）', by: 'Airbus', url: 'https://www.airbus.com/sites/g/files/jlcbta136/files/2022-01/EN-Airbus-A380-Facts-and-Figures-January-2022.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '把空气往下压', duration: 12,
        cues: [
          { kind: 'flow', path: [[0, 330], [1200, 330]], color: '#9cc7e8', count: 8, speed: 420, from: 0.3 },
          { kind: 'flow', path: [[0, 440], [380, 440], [560, 470], [760, 560], [1200, 680]], color: '#3a6fb0', count: 9, speed: 420, from: 0.6 },
          { kind: 'flow', path: [[0, 560], [380, 560], [560, 590], [760, 660], [1200, 760]], color: '#3a6fb0', count: 9, speed: 420, from: 0.9 },
          { kind: 'shape', shape: 'pill', at: [560, 490], size: [400, 70], color: '#e6e1d6', text: '机翼', from: 1.4 },
          { kind: 'arrow', path: [[900, 560], [1000, 680]], color: '#3a6fb0', text: '空气往下', from: 3.4 },
          { kind: 'arrow', path: [[560, 440], [560, 250]], color: '#e0762b', text: '升力', from: 5 },
          { kind: 'text', at: [600, 840], text: '压下空气，被空气托起', from: 7.4 },
        ],
      },
      {
        turn: 1, title: '上面压强小', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 480], size: [460, 80], color: '#e6e1d6', text: '机翼', from: 0 },
          { kind: 'flow', path: [[0, 400], [1200, 400]], color: '#3a6fb0', count: 10, speed: 640, from: 0.6 },
          { kind: 'flow', path: [[0, 570], [1200, 570]], color: '#9cc7e8', count: 6, speed: 300, from: 1 },
          { kind: 'label', at: [860, 400], pos: [920, 260], text: '流得快，压强小', from: 2 },
          { kind: 'label', at: [860, 570], pos: [920, 700], text: '压强大', from: 3.2 },
          { kind: 'arrow', path: [[380, 680], [380, 540]], color: '#e0762b', text: '往上托', from: 4.8 },
          { kind: 'text', at: [600, 840], text: '下面压强大，上面压强小', size: 's', from: 7 },
        ],
      },
      {
        turn: 2, title: '不会同时到达', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 400], size: [460, 80], color: '#e6e1d6', from: 0 },
          { kind: 'atom', path: [[200, 340], [1000, 340]], symbol: '上', color: '#3a6fb0', travel: 2.2, from: 0.8 },
          { kind: 'atom', path: [[200, 460], [1000, 460]], symbol: '下', color: '#9cc7e8', travel: 4.4, from: 0.8 },
          { kind: 'label', at: [1000, 340], pos: [960, 210], text: '上面的先到', from: 3.2 },
          { kind: 'sprite', icon: '✈️', path: [[600, 600]], size: 120, from: 5 },
          { kind: 'myth', wrong: '上下的空气同时到达后缘', right: '机翼把空气往下拐才有升力', from: 7 },
        ],
      },
      {
        turn: 3, title: '跑得越快越好', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 40], color: '#cfc6b8', from: 0 },
          { kind: 'sprite', icon: '🛫', path: [[160, 680], [700, 680], [1080, 540]], size: 150, travel: 7, from: 0.4 },
          { kind: 'meter', at: [360, 240], label: '速度', start: 0.05, end: 0.9, color: '#3a6fb0', from: 0.6, over: 5 },
          { kind: 'meter', at: [840, 240], label: '升力', start: 0.01, end: 0.95, color: '#e0762b', from: 0.6, over: 5 },
          { kind: 'formula', at: [600, 360], text: '速度 × 2 → 升力 × 4', from: 3.6 },
          { kind: 'count', at: [300, 500], label: '最大起飞重量', start: 0, end: 575, unit: '吨', from: 5.6 },
        ],
      },
      {
        turn: 4, title: '抬太陡会失速', duration: 11,
        cues: [
          { kind: 'flow', path: [[0, 470], [1200, 470]], color: '#9cc7e8', count: 8, speed: 400, from: 0 },
          { kind: 'shape', shape: 'pill', at: [520, 450], size: [420, 70], color: '#e6e1d6', text: '机翼', motion: 'wiggle', from: 0.4 },
          { kind: 'particles', box: [600, 260, 420, 140], count: 12, color: '#3a6fb0', motion: 'gas', from: 2 },
          { kind: 'label', at: [700, 330], pos: [940, 220], text: '气流乱成一团', from: 2.6 },
          { kind: 'meter', at: [360, 660], label: '升力', start: 0.9, end: 0.35, color: '#e0762b', from: 3.6, over: 1.6 },
          { kind: 'text', at: [600, 830], text: '速度和角度要配合好', from: 7 },
        ],
      },
    ],
  },
};
