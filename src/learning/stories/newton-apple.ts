import type { Story } from './types';

const EARTH = '#a5d8ff';
const BLUE = '#3553a6';
const HOT = '#e8590c';

export const newtonApple: Story = {
  slug: 'newton-apple',
  title: '苹果真的砸中了牛顿的脑袋吗？',
  trigger: '小念的绘本上画着一个红苹果“咚”地砸在牛顿头上，牛顿眼冒金星，头顶冒出一行字“万有引力！”。她举着绘本跑来问爸爸是不是真的。',
  dialogue: [
    {
      nian: '爸爸，牛顿真的是被苹果砸了脑袋，才发现万有引力的吗？',
      dad: '多半没有砸到头！最可靠的记载来自牛顿的朋友斯蒂克利：1726 年，牛顿和他在苹果树下喝茶，亲口说起当年的事——他坐着沉思，看见一个苹果落了下来。记载里只说苹果落下，没说砸到谁，“砸脑袋”是后人越传越热闹加上去的。',
    },
    {
      nian: '只是看见苹果落下？苹果天天往下掉，这有什么好想的？',
      dad: '牛顿问了一个谁都没认真问过的问题。斯蒂克利记下了他的原话：苹果为什么总是垂直落向地面？为什么不往旁边飞，也不往上飞，而总是朝着地球的中心？你看，他想的不是“苹果会掉”，而是“它为什么偏偏朝那个方向掉”。',
    },
    {
      nian: '朝着地球的中心？我们这儿的往下，和地球另一边的往下，是同一个方向吗？',
      dad: '方向不同，却指向同一个点！地球是个大球，北京的苹果往下掉，阿根廷的苹果也往下掉，两个“往下”几乎相反，可延长下去都穿过地心。这说明拉苹果的是地球本身，而且是朝着整个地球的中心在拉。这就是重力，它的方向总是竖直向下。',
      figure: { kind: 'sim', sim: 'appleEarth', caption: '把苹果树种到世界各地，再切到“全世界一起看”：每个地方的“往下”都指向哪里？' },
    },
    {
      nian: '是地球本身在拉……那地球能拉多远？能拉到天上的月亮吗？',
      dad: '牛顿正是这么想的！他猜，拉苹果的力一直伸到月亮那里，只是离得越远越弱。月亮没掉下来，是因为它在飞快地横着跑，一边往地球“掉”，一边又跑开，于是绕着地球转圈。这个想法后来写进了他二十多年后出版的书里，就是万有引力定律。',
    },
    {
      nian: '万有引力定律……那牛顿当时多大？他怎么有空在树下发呆？',
      dad: '那是 1666 年前后，牛顿才二十出头。剑桥大学因为瘟疫停课，他回到老家伍尔索普的农庄，没人打扰，就一门心思琢磨数学、光和引力。那棵苹果树后来倒下，又从根上重新长起来，今天还活着，它的嫁接苗被种到了世界各地。',
    },
    {
      nian: '我明白了！苹果没有砸牛顿的头，他是看见苹果总朝地心掉，想到地球在拉它，还猜这个力能一直伸到月亮，后来写成了万有引力定律。',
      dad: '说得对！大发现常常不是被砸出来的，而是从一个别人觉得“这有什么好问”的问题开始的。下次你看到苹果落地，也问问自己为什么。',
    },
  ],
  tip: '“苹果砸头”是后来通俗读物越传越夸张的版本；最可靠的一手记载是斯蒂克利 1752 年写成的《牛顿爵士生平回忆录》手稿，现存英国皇家学会，记录了 1726 年牛顿亲口讲述的情景。伍尔索普庄园的那棵苹果树至今还在。',
  sources: [
    { title: '物理 八年级下册 · 第七章 力 · 第3节 重力；必修 第二册 · 第七章 万有引力与宇宙航行 · 第2节 万有引力定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Newton’s apple tree（斯蒂克利《牛顿爵士生平回忆录》手稿：牛顿坐着沉思时看见苹果落下；老树倒下后又重新生根）', by: '英国皇家学会（Royal Society）', url: 'https://royalsociety.org/blog/2012/02/newtons-apple-tree/' },
    { title: 'Scientist of the Day: Isaac Newton（1666 年剑桥因瘟疫停课，牛顿回到伍尔索普；1726 年向斯蒂克利讲述苹果故事）', by: '琳达·霍尔图书馆（Linda Hall Library）', url: 'https://www.lindahall.org/about/news/scientist-of-the-day/isaac-newton-4/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '没有砸到头', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🌳', path: [[420, 440]], size: 260, from: 0.2 },
          { kind: 'sprite', icon: '🧑', path: [[620, 560]], size: 120, from: 0.5 },
          { kind: 'sprite', icon: '🍎', path: [[470, 380], [470, 600]], size: 50, travel: 1.2, from: 1.5 },
          { kind: 'count', at: [920, 300], label: '牛顿讲述', start: 1700, end: 1726, unit: '年', from: 2.5 },
          { kind: 'myth', wrong: '苹果咚地砸中牛顿的头', right: '他坐着沉思，看见苹果落下', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '为什么朝下掉', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🍎', path: [[600, 300], [600, 600]], size: 60, travel: 2, from: 0.5 },
          { kind: 'arrow', path: [[660, 420], [900, 420]], color: '#adb5bd', text: '往旁边？', from: 2.5 },
          { kind: 'arrow', path: [[600, 260], [600, 160]], color: '#adb5bd', text: '往上？', from: 3.2 },
          { kind: 'arrow', path: [[600, 640], [600, 750]], color: HOT, text: '总朝地心', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '牛顿问：为什么？', from: 6 },
        ],
      },
      {
        turn: 2, title: '往下都指地心', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 480], size: [440, 440], color: EARTH, from: 0.2 },
          { kind: 'shape', shape: 'circle', at: [600, 480], size: [18, 18], color: HOT, from: 0.5 },
          { kind: 'sprite', icon: '🍎', path: [[600, 220], [600, 252]], size: 40, travel: 1, from: 1 },
          { kind: 'sprite', icon: '🍎', path: [[600, 740], [600, 708]], size: 40, travel: 1, from: 1 },
          { kind: 'arrow', path: [[600, 270], [600, 460]], color: HOT, text: '北京', from: 2.5 },
          { kind: 'arrow', path: [[600, 690], [600, 500]], color: HOT, text: '阿根廷', from: 3.5 },
          { kind: 'label', at: [600, 480], pos: [920, 560], text: '都指向地心', from: 5 },
          { kind: 'text', at: [600, 850], text: '重力：竖直向下', from: 7 },
        ],
      },
      {
        turn: 3, title: '一直拉到月亮', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [300, 480], size: [200, 200], color: EARTH, text: '地球', from: 0.2 },
          { kind: 'sprite', icon: '🌙', path: [[880, 520], [860, 330]], size: 90, travel: 6, from: 0.6 },
          { kind: 'arrow', path: [[820, 480], [420, 480]], color: HOT, text: '同一种拉力', from: 2 },
          { kind: 'arrow', path: [[960, 520], [960, 320]], color: BLUE, text: '横着跑', from: 3.5 },
          { kind: 'text', at: [600, 820], text: '离得越远，拉力越弱', from: 6 },
        ],
      },
      {
        turn: 4, title: '回老家的牛顿', duration: 10,
        cues: [
          { kind: 'count', at: [360, 300], label: '那一年', start: 1600, end: 1666, unit: '年', from: 0.5 },
          { kind: 'sprite', icon: '🏡', path: [[360, 520]], size: 180, from: 1.5 },
          { kind: 'label', at: [360, 600], pos: [360, 720], text: '伍尔索普的农庄', from: 2.5 },
          { kind: 'sprite', icon: '🌳', path: [[840, 520]], size: 220, from: 3 },
          { kind: 'label', at: [880, 440], pos: [980, 300], text: '老树至今还活着', from: 4.5 },
        ],
      },
    ],
  },
};
