import type { Story } from './types';

export const submarine: Story = {
  slug: 'submarine',
  title: '潜水艇是怎么上浮和下沉的？',
  trigger: '玩具店里有个“浮沉子”：装满水的塑料瓶里漂着一支小滴管，小念一捏瓶身，小滴管就往下沉，一松手又慢慢浮了上来。',
  dialogue: [
    {
      nian: '爸爸，我一捏瓶子小滴管就沉下去，一松手又浮上来，这是怎么回事？',
      dad: '你一捏，瓶里的水就被挤进小滴管一点，滴管变重了，重力超过浮力，它就往下沉；一松手，滴管里被压紧的空气又把水推出去，它变轻了，浮力大于重力，就浮上来。真正的潜水艇用的也是这个办法：改变自己的重量。',
    },
    {
      nian: '潜水艇也是改变自己的重量？它不是靠发动机往下钻的吗？',
      dad: '很多人这么以为，其实上浮下沉主要靠水舱。潜水艇的艇壳外面有很大的水舱，打开阀门让海水灌进去，艇变重，比浮力还重就沉下去；用压缩空气把水舱里的水挤出去，艇变轻，浮力大于重力就浮上来。螺旋桨和艇尾的小翅膀只是帮它往前走、调方向和深浅。',
      figure: { kind: 'sim', sim: 'ballast', caption: '往水舱里一点点灌水：看艇重什么时候超过浮力，灌到一半时为什么能停在水里。' },
    },
    {
      nian: '用压缩空气把水挤出去？那潜下去以后，浮力会不会变呢？',
      dad: '整艘艇都泡进水里以后，它排开的水就是那么多，浮力几乎不变了。能改变的只有它自己的重量：水舱多灌一点就往下沉，少一点就往上浮，调到重力正好等于浮力，它就能停在水里不上不下，这叫悬浮。',
    },
    {
      nian: '悬浮……那鱼在水里一动不动地停着，也是悬浮吗？',
      dad: '对。很多鱼肚子里有个鱼鳔，像个小气球。鱼鳔里多一点气，鱼的身体就鼓大一点，排开的水更多，浮力变大；少一点气，浮力就变小。鱼改变的是浮力，潜水艇改变的是重量，办法不一样，道理都是让浮力和重力比大小。',
    },
    {
      nian: '一个改变浮力，一个改变重量……那潜水艇能潜到多深呢？',
      dad: '要看艇壳有多结实。越往深处，水的压强越大，每深 10 米就多一个大气压。中国的“奋斗者”号载人潜水器 2020 年在马里亚纳海沟潜到了 10909 米深。它下潜时背着几块压载铁，到了海底先抛掉一部分，停在水里干活；要回来时再抛掉剩下的，变轻了，就浮上来了。',
    },
    {
      nian: '我懂了！潜水艇泡在水里时浮力几乎不变，它靠往水舱灌水、排水来改变自己的重量：比浮力重就下沉，比浮力轻就上浮，一样重就停在水里悬浮。',
      dad: '完全正确！自己做个浮沉子：塑料瓶装满水，放进一支吸了一半水、能刚好浮着的塑料滴管，拧紧瓶盖，捏一捏、松一松，看它上上下下。',
    },
  ],
  tip: '互动图用“份”来比重量和浮力，只比大小；真实的潜艇还要靠调整水舱和水平舵来细调深度。浮沉子要用塑料瓶和塑料滴管，不要用玻璃的。“奋斗者”号的压载铁和下潜过程来自央视网的报道。',
  sources: [
    { title: '物理 八年级下册 · 第十章 浮力 · 第3节 物体的浮沉条件及应用', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Ballast Control（压载水舱：灌水下潜，压缩空气排水上浮）', by: 'Smithsonian National Museum of American History', url: 'https://www.americanhistory.si.edu/subs/operating/attackcenter/controlstation/ballastcontrol.html' },
    { title: '“奋斗者”号全海深载人潜水器顺利完成万米深潜试验', by: '中华人民共和国科学技术部', url: 'https://www.most.gov.cn/kjbgz/202011/t20201125_169674.html' },
    { title: '“奋斗者”号如何潜入万米深海？听潜航员讲述海洋科考重器奥秘', by: '央视网', url: 'https://ocean.cctv.com/2023/05/17/ARTIGfGl3uxmRzf8nxTba5Kj230517.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '浮沉子', duration: 11,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [600, 520], size: [280, 480], liquid: '#9cc7e8', level: 0.92, from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 380], size: [44, 110], color: '#ffffff', outline: true, slide: { to: [600, 650], at: 3, over: 2 }, from: 0.4 },
          { kind: 'sprite', icon: '✊', path: [[800, 520]], size: 130, from: 2, to: 6 },
          { kind: 'label', at: [622, 650], pos: [360, 560], text: '水挤进来，变重了', from: 5.2 },
          { kind: 'meter', at: [990, 300], label: '滴管的重量', start: 0.4, end: 0.8, color: '#e0762b', from: 3 },
          { kind: 'text', at: [600, 840], text: '变重就沉，变轻就浮', from: 7.4 },
        ],
      },
      {
        turn: 1, title: '靠水舱，不靠钻', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1100, 480], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 330], size: [520, 120], color: '#6f7b86', slide: { to: [600, 560], at: 3.6, over: 2.6 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [420, 330], size: [110, 70], color: '#f3efe6', tint: { color: '#4f93cf', at: 1.6, over: 1.8 }, slide: { to: [420, 560], at: 3.6, over: 2.6 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [780, 330], size: [110, 70], color: '#f3efe6', tint: { color: '#4f93cf', at: 1.6, over: 1.8 }, slide: { to: [780, 560], at: 3.6, over: 2.6 }, from: 0.3 },
          { kind: 'label', at: [420, 300], pos: [240, 200], text: '水舱灌水', from: 1.6, to: 3.6 },
          { kind: 'myth', wrong: '潜水艇靠发动机往下钻', right: '靠水舱灌水排水改变重量', from: 7 },
        ],
      },
      {
        turn: 2, title: '浮力不变，调重量', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1100, 560], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'pill', at: [450, 500], size: [460, 110], color: '#6f7b86', from: 0.3 },
          { kind: 'meter', at: [940, 330], label: '浮力', start: 0.6, end: 0.6, color: '#3a6fb0', from: 1 },
          { kind: 'meter', at: [940, 470], label: '艇重', start: 0.8, end: 0.6, color: '#e0762b', from: 2.4, over: 3 },
          { kind: 'label', at: [450, 445], pos: [450, 300], text: '一样大：停住', from: 5.8 },
          { kind: 'text', at: [600, 830], text: '不上不下，叫悬浮', from: 7.4 },
        ],
      },
      {
        turn: 3, title: '鱼鳔像小气球', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1100, 560], color: '#cfe5f7', from: 0 },
          { kind: 'sprite', icon: '🐟', path: [[520, 480]], size: 260, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [520, 500], size: [60, 40], color: '#ffffff', motion: 'grow', over: 3, from: 1.8 },
          { kind: 'label', at: [520, 500], pos: [820, 330], text: '鱼鳔：多充一点气', from: 2.4 },
          { kind: 'arrow', path: [[720, 700], [720, 560]], color: '#3a6fb0', text: '浮力变大', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '鱼改浮力，潜艇改重量', from: 7 },
        ],
      },
      {
        turn: 4, title: '抛掉压载铁', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1100, 640], color: '#2f5f8a', from: 0 },
          { kind: 'count', at: [960, 300], label: '下潜深度', start: 0, end: 10909, unit: '米', over: 3, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [450, 400], size: [180, 140], color: '#f4f1ea', text: '奋斗者', slide: { to: [450, 700], at: 0.6, over: 2.8 }, from: 0.3, to: 5 },
          { kind: 'shape', shape: 'rect', at: [450, 790], size: [140, 44], color: '#7d8790', text: '压载铁', slide: { to: [450, 820], at: 4.4, over: 0.6 }, from: 3.6 },
          { kind: 'shape', shape: 'circle', at: [450, 700], size: [180, 140], color: '#f4f1ea', text: '奋斗者', slide: { to: [450, 360], at: 5.6, over: 3 }, from: 5 },
          { kind: 'label', at: [450, 790], pos: [760, 700], text: '抛掉，变轻', from: 5.2 },
        ],
      },
    ],
  },
};
