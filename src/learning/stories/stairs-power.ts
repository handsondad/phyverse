import type { Story } from './types';

export const stairsPower: Story = {
  slug: 'stairs-power',
  title: '跑上楼和走上楼，谁做的功多？',
  trigger: '放学回家，小念“噔噔噔”几秒钟就跑上了楼，爸爸慢悠悠地走在后面；小念趴在楼梯口直喘气，爸爸却一点也不喘。',
  dialogue: [
    {
      nian: '爸爸，我跑上来累得直喘，你慢慢走上来，是不是我做的功比你多？',
      dad: '不一定！上楼做的功，就是把自己的身体举高：功等于你受到的重力乘上升高的高度。你 30 千克，一层楼大约 3 米高，举高一层大约要做 900 焦的功。不管是跑还是走，只要是你、是这一层楼，做的功就一样多。',
      eq: '功 = 重力 × 高度 ≈ 300 N × 3 m ≈ 900 J',
    },
    {
      nian: '做的功一样多？那同样把自己举高，为什么跑上来就累得多？',
      dad: '因为跑上来用的时间短。同样 900 焦，走上来花 15 秒，每秒只做 60 焦；跑上来只花 5 秒，每秒就得做 180 焦。每秒做多少功叫功率，单位是瓦。功率越大，身体越要使劲供上能量，心跳和呼吸就得跟着加快。',
      eq: '功率 = 功 ÷ 时间：900 J ÷ 5 s = 180 W',
      figure: { kind: 'sim', sim: 'stairs', caption: '选谁上楼、上一层楼用几秒：做的功变不变？功率又怎么变？' },
    },
    {
      nian: '每秒做多少功叫功率？那爸爸比我重，走上来的功率是多少？',
      dad: '我 65 千克，比你重一倍多，上一层楼要做大约 1900 焦的功，是你的两倍多。我走 15 秒，功率大约 130 瓦，比你跑上来的功率还小一点。所以谁做的功多，要看体重和高度；谁更喘，要看功率。',
    },
    {
      nian: '功率大约 130 瓦？这个“瓦”和灯泡上写的“瓦”是一回事吗？',
      dad: '正是一回事！灯泡写着 10 瓦，就是它每秒用掉 10 焦的电能。还有个老单位叫马力：1 马力大约 735 瓦，差不多是 1 秒钟把 75 千克的东西举高 1 米。你跑上楼的那几秒，功率大约是四分之一马力；汽车的发动机常常有一百多马力。',
    },
    {
      nian: '汽车有一百多马力？那电梯把一整箱人送上楼，功率是不是很大？',
      dad: '电梯一次要把一箱人一起举高，几秒钟就升一层，功率比人大得多。不过它有个好帮手叫对重块：轿厢往上走，井道另一边的对重块就往下走，两边差不多一样重，电动机只要补上两边重量的差，省下不少电。',
    },
    {
      nian: '我懂了！上同一层楼，跑和走做的功一样多，都是体重乘楼高；跑得快，时间短，功率大，所以更喘。功率说的是做功的快慢，不是做了多少。',
      dad: '完全正确！下次和家人比一比：用手机秒表记下各自上一层楼用了几秒，再用体重的千克数乘 10、乘 3 米，除以秒数，算算每个人的功率是多少瓦。',
    },
  ],
  tip: '文中取一层楼高约 3 米，算出来的数都只保留到整十；在家算时把每千克受到的重力当成 10 牛就行。马力和瓦的换算来自美国国家标准与技术研究院（NIST）的单位换算表（1 公制马力 ≈ 735.5 瓦）。比赛爬楼梯时别推挤，也别在楼梯上跑太快。',
  sources: [
    { title: '物理 八年级下册 · 第十一章 功和机械能 · 第1节 功；第2节 功率', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'NIST Guide to the SI, Appendix B.8（horsepower, metric = 735.4988 W）', by: 'National Institute of Standards and Technology', url: 'https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '把自己举高', duration: 11,
        cues: [
          { kind: 'bond', a: [200, 760], b: [800, 320], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[260, 700]], size: 90, from: 0, to: 1 },
          { kind: 'sprite', icon: '🧒', path: [[260, 700], [740, 350]], size: 90, travel: 5, from: 1 },
          { kind: 'arrow', path: [[920, 740], [920, 320]], color: '#3553a6', text: '升高 3 米', from: 2 },
          { kind: 'count', at: [400, 300], label: '做的功', start: 0, end: 900, unit: '焦', from: 4 },
          { kind: 'text', at: [600, 840], text: '跑还是走，功都一样', from: 7.4 },
        ],
      },
      {
        turn: 1, title: '比快慢：功率', duration: 12,
        cues: [
          { kind: 'count', at: [960, 280], label: '走上楼', start: 0, end: 15, unit: '秒', over: 7, from: 1 },
          { kind: 'count', at: [960, 500], label: '跑上楼', start: 0, end: 5, unit: '秒', over: 2.4, from: 1 },
          { kind: 'sprite', icon: '🚶', path: [[700, 290], [160, 290]], size: 90, travel: 7, from: 1 },
          { kind: 'sprite', icon: '🏃', path: [[700, 510], [160, 510]], size: 90, travel: 2.4, from: 1 },
          { kind: 'myth', wrong: '跑得快，做的功就多', right: '功一样多，跑的功率大', from: 6.6 },
        ],
      },
      {
        turn: 2, title: '谁的功率大', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 280], label: '小念跑', start: 0, end: 0.9, color: '#e8590c', from: 0.6, over: 1.5 },
          { kind: 'meter', at: [600, 420], label: '爸爸走', start: 0, end: 0.65, color: '#3553a6', from: 2.4, over: 1.5 },
          { kind: 'meter', at: [600, 560], label: '小念走', start: 0, end: 0.3, color: '#7fb3d5', from: 4.2, over: 1.5 },
          { kind: 'label', at: [700, 420], pos: [960, 420], text: '约 130 瓦', from: 3.4 },
          { kind: 'text', at: [600, 780], text: '谁更喘，看功率', from: 7 },
        ],
      },
      {
        turn: 3, title: '瓦和马力', duration: 11,
        cues: [
          { kind: 'sprite', icon: '💡', path: [[300, 380]], size: 160, from: 0.4 },
          { kind: 'label', at: [300, 420], pos: [300, 600], text: '10 瓦：每秒 10 焦', from: 1.2 },
          { kind: 'sprite', icon: '🐎', path: [[860, 380]], size: 200, from: 3 },
          { kind: 'label', at: [860, 430], pos: [860, 600], text: '1 马力 ≈ 735 瓦', from: 3.8 },
          { kind: 'text', at: [600, 800], text: '马力也是功率的单位', from: 6.6 },
        ],
      },
      {
        turn: 4, title: '电梯的对重块', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 180], size: [110, 110], color: '#e6e1d6', outline: true, from: 0 },
          { kind: 'shape', shape: 'rect', at: [450, 620], size: [170, 200], color: '#cfe5f7', text: '轿厢', slide: { to: [450, 360], at: 1.6, over: 5 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [760, 360], size: [100, 170], color: '#7d8790', text: '对重', slide: { to: [760, 620], at: 1.6, over: 5 }, from: 0.6 },
          { kind: 'arrow', path: [[300, 620], [300, 400]], color: '#3553a6', text: '往上', from: 1.6 },
          { kind: 'arrow', path: [[900, 400], [900, 620]], color: '#7d8790', text: '往下', from: 1.6 },
          { kind: 'text', at: [600, 830], text: '只补两边重量的差', from: 7.4 },
        ],
      },
    ],
  },
};
