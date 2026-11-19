import type { Story } from './types';

const GLOW = '#a9e34b';
const GREEN = '#5c940d';

export const curieRadium: Story = {
  slug: 'curie-radium',
  title: '居里夫人怎样从成吨的矿渣里找到看不见的新元素？',
  trigger: '小念在科学家传记里看到一张黑白照片：一位穿深色衣服的女士神情专注。书上说，她在一间漏雨的大棚子里找到了两种谁都没见过的新元素。',
  dialogue: [
    {
      nian: '爸爸，居里夫人找的新元素看不见也摸不着，她怎么知道矿渣里藏着它？',
      dad: '靠一台能“量”射线的仪器！当时人们刚发现铀会自己放出看不见的射线，射线能让空气导电。居里夫人用丈夫皮埃尔和他哥哥做的静电计，测射线让空气导电的强弱。她发现沥青铀矿的射线，比按它含的铀算出来的还强 4 到 5 倍。',
      figure: {
        kind: 'image',
        src: '/images/photos/curie-portrait-1920s.webp',
        alt: '玛丽·居里约 1920 年代的黑白肖像照：盘着头发，身穿深色衣服',
        caption: '玛丽·居里（约 1920 年代）。她是第一位两次获得诺贝尔奖的人。',
        credit: 'Henri Manuel · 公有领域',
        href: 'https://commons.wikimedia.org/wiki/File:Marie_Curie_c._1920s.jpg',
      },
    },
    {
      nian: '强 4 到 5 倍？多出来的射线是从哪儿来的？',
      dad: '这正是她的大胆猜想：矿里一定藏着一种比铀活泼得多的新元素，只是含量太少。于是她和皮埃尔把矿渣用化学办法一轮轮分开，每分一次，就用静电计量一量哪一份射线更强，留下强的、扔掉弱的，像顺着越来越响的叫声去找一只藏起来的蝈蝈。',
    },
    {
      nian: '射线更强的留下……为什么不用天平称一称新元素有多重？',
      dad: '因为新元素实在太少了，混在一大堆矿渣里，天平根本称不出来。居里夫人后来在诺贝尔奖演讲里说，这是一种新的化学，用的工具是静电计，而不是天平。1898 年 6 月底，他们提出的东西比铀强了约 300 倍；7 月宣布发现钋，12 月又宣布发现了镭。',
      figure: { kind: 'sim', sim: 'radiumRefine', caption: '把“用什么来量”在天平和静电计之间切换，再一轮轮提炼，看哪种工具能找到新元素。' },
    },
    {
      nian: '发现了镭以后，她是不是马上就能把它拿在手里看？',
      dad: '还早着呢！为了把纯的镭提出来，她搬进一间废弃的大棚子：屋顶漏雨，夏天闷热，冬天冰冷。她一次要处理 20 公斤矿渣，常常一整天用一根差不多和她一样高的铁棍搅着一锅沸腾的料，累得筋疲力尽。三年多以后，她才得到十分之一克的氯化镭。',
    },
    {
      nian: '十分之一克……这么辛苦，后来大家知道她的发现了吗？',
      dad: '1903 年，居里夫妇和贝克勒尔一起获得诺贝尔物理学奖；1911 年，她又独自获得诺贝尔化学奖，成了第一位两次获得诺贝尔奖的人。可当时人们还不知道射线有多危险，她长期接触，健康受到了伤害。今天做放射性实验，一定要严格防护。',
    },
    {
      nian: '我懂了！新元素太少，天平称不出来，居里夫人就用静电计量射线，把矿渣一轮轮分开，留下射线更强的那份，最后找到了钋和镭。',
      dad: '没错！看不见元素本身，她就去量它放出的射线，换了一种“看”的办法。“放射性”这个词，也是居里夫妇在 1898 年发现钋的那篇论文里第一次用的。',
    },
  ],
  tip: '放射性物质会伤害人体，不要收集或把玩来历不明的矿石；医院做放射检查有专门的防护。文中数据（沥青铀矿比按铀含量该有的强 4 到 5 倍、1898 年 6 月底约强 300 倍、每次处理 20 公斤原料）取自诺贝尔奖官网的介绍文章，三年多得到十分之一克氯化镭取自美国物理联合会的居里展。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第五章 原子核 · 第1节 原子核的组成（天然放射现象）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Marie and Pierre Curie and the discovery of polonium and radium（静电计测量；沥青铀矿强 4–5 倍；1898 年 6 月底约强 300 倍；钋与镭的发现；大棚子里每次处理 20 公斤原料）', by: '诺贝尔奖官网（NobelPrize.org）', url: 'https://www.nobelprize.org/prizes/chemistry/marie-and-pierre-curie-and-the-discovery-of-polonium-and-radium/' },
    { title: 'Marie Curie – Research Breakthroughs (1897–1904)（用了三年多才分离出十分之一克氯化镭）', by: '美国物理联合会（AIP）', url: 'https://history.aip.org/exhibits/curie/resbr2.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '会导电的射线', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🪨', path: [[320, 480]], size: 180, from: 0.3 },
          { kind: 'flow', path: [[420, 460], [700, 420]], color: GLOW, count: 4, from: 1 },
          { kind: 'shape', shape: 'rect', at: [840, 440], size: [200, 140], color: '#fffdf8', text: '静电计', outline: true, from: 1.5 },
          { kind: 'text', at: [600, 660], text: '比该有的强4到5倍', from: 4 },
          { kind: 'text', at: [600, 820], text: '矿里还藏着别的东西', from: 7 },
        ],
      },
      {
        turn: 1, title: '一轮轮分开', duration: 11,
        cues: [
          { kind: 'sprite', icon: '⚗️', path: [[300, 460]], size: 150, from: 0.3 },
          { kind: 'arrow', path: [[400, 460], [580, 360]], color: GREEN, text: '更强：留下', from: 1.5 },
          { kind: 'arrow', path: [[400, 460], [580, 580]], color: '#adb5bd', text: '更弱：扔掉', from: 2.5 },
          { kind: 'meter', at: [880, 380], label: '射线强度', start: 20, end: 85, over: 5, from: 3 },
          { kind: 'text', at: [600, 820], text: '顺着越来越强去找', from: 7 },
        ],
      },
      {
        turn: 2, title: '天平称不出', duration: 12,
        cues: [
          { kind: 'sprite', icon: '⚖️', path: [[340, 440]], size: 170, from: 0.3 },
          { kind: 'label', at: [340, 520], pos: [340, 660], text: '太少，称不出', from: 1.5 },
          { kind: 'count', at: [860, 330], label: '比铀强约', start: 0, end: 300, unit: '倍', from: 3 },
          { kind: 'text', at: [860, 540], text: '7月：钋', from: 6 },
          { kind: 'text', at: [860, 630], text: '12月：镭', from: 7.5 },
          { kind: 'text', at: [600, 820], text: '用静电计，不用天平', from: 9 },
        ],
      },
      {
        turn: 3, title: '漏雨的大棚子', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🏚️', path: [[360, 460]], size: 220, from: 0.3 },
          { kind: 'count', at: [840, 300], label: '每次处理', start: 0, end: 20, unit: '公斤', from: 1.5 },
          { kind: 'text', at: [840, 520], text: '十分之一克氯化镭', from: 5 },
          { kind: 'text', at: [600, 820], text: '三年多才提出一点点', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '两次诺贝尔奖', duration: 10,
        cues: [
          { kind: 'count', at: [360, 340], label: '物理学奖', start: 1890, end: 1903, unit: '年', from: 0.5 },
          { kind: 'count', at: [840, 340], label: '化学奖', start: 1890, end: 1911, unit: '年', from: 2 },
          { kind: 'sprite', icon: '🏅', path: [[600, 560]], size: 140, from: 3.5 },
          { kind: 'text', at: [600, 820], text: '射线危险，要严格防护', from: 6 },
        ],
      },
    ],
  },
};
