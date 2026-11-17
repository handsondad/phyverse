import type { Story } from './types';

export const thunderLater: Story = {
  slug: 'thunder-later',
  title: '为什么先看到闪电，再听到雷？',
  trigger: '夏天傍晚，窗外一道闪电劈下来，小念赶紧捂住耳朵，可等了好几秒，才听见“轰隆隆”的雷声。',
  dialogue: [
    {
      nian: '爸爸，闪电都劈下来好几秒了，雷声怎么才到？',
      dad: '其实闪电和雷声是同时发生的。闪电一下子把周围的空气烧得极热，空气猛地膨胀，就炸出了雷声。只是光跑得太快，一眨眼就到；声音慢吞吞的，在空气里每秒只走大约 340 米，所以雷声总是迟到。',
    },
    {
      nian: '声音每秒才走几百米？那光比它快多少呢？',
      dad: '光每秒大约跑 30 万千米，差不多是声音的 90 万倍。一千米外的闪电，光只要三十万分之一秒就到了，跟没花时间一样；雷声却要走差不多 3 秒。中国气象局的科普也是这么讲的：光和声音的速度差得太远，所以总是先看到闪电，后听到雷。',
      figure: { kind: 'sim', sim: 'thunder', caption: '拖动闪电离你有多远：看光和雷声各要走多久，雷声几秒以后才到。' },
    },
    {
      nian: '雷声要走差不多 3 秒？那数一数秒数，是不是就能算出闪电有多远？',
      dad: '能！从看到闪电开始数，数到听见雷声，用秒数乘 340 米就行。比如隔了 10 秒，雷电大约在 3400 米外。香港天文台还教了个更省事的办法：秒数除以 3，就是大约多少千米。很多人以为雷和闪电不是一起发生的，其实只是声音在路上走得慢。',
    },
    {
      nian: '秒数除以 3 就是千米？那要是数到的秒数很少，是不是很危险？',
      dad: '对！秒数越少，雷电离你越近。美国国家气象局提醒：只要听得到雷声，你就在雷电能打到的范围里，应该马上进屋躲一躲。千万别站在大树下、空旷的操场上，也别在水边玩。',
    },
    {
      nian: '别站在大树下……那为什么近处的雷是“咔嚓”一声，远处的雷是“轰隆隆”一长串？',
      dad: '因为闪电是一条很长的通道，每一段都在发出雷声。离你近的那段先传到，远的那段后传到，接连不断，就成了一长串“轰隆隆”。雷电离得近，声音来得又急又猛，就是清脆的“咔嚓”；离得远，声音一路上变得闷闷的，只剩低沉的隆隆声。',
    },
    {
      nian: '我懂了！闪电和雷声是同时发生的，光几乎一下就到，声音每秒只走 340 米左右，所以雷声总迟到。数一数隔了几秒，乘 340 米，就知道雷电有多远；听得到雷声就要进屋。',
      dad: '说得好！下次打雷时，待在屋里看着窗外，从看到闪电开始数“一、二、三……”，听到雷声就停，算一算这道闪电离你有多远。',
    },
  ],
  tip: '340 米/秒是 15 ℃ 空气里的声速，天热时稍快一点；数秒的办法只能估个大概。每一道闪电的远近都不一样，下一道可能更近，所以听到雷声就要躲好，不要在户外数着玩。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '闪电与打雷为什么“不同时发生”', by: '中国气象局', url: 'https://www.cma.gov.cn/2011xzt/2018zt/20100728/2010072808/201807/t20180706_472677.html' },
    { title: '为什么总是先闪电后打雷？', by: '香港天文台', url: 'https://www.hko.gov.hk/sc/education/weather/thunderstorm-and-lightning/00021-why-does-lightning-always-come-before-thunder.html' },
    { title: 'Understanding Lightning: Thunder', by: 'U.S. National Weather Service', url: 'https://www.weather.gov/safety/lightning-science-thunder' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '同时发生', duration: 11,
        cues: [
          { kind: 'sprite', icon: '⛈️', path: [[860, 220]], size: 220, from: 0 },
          { kind: 'ray', path: [[860, 300], [800, 420], [880, 460], [820, 640]], color: '#f5b800', draw: 0.4, from: 0.6 },
          { kind: 'sprite', icon: '🧒', path: [[260, 600]], size: 170, from: 0 },
          { kind: 'wave', a: [800, 640], b: [360, 600], amplitude: 18, wavelength: 70, speed: 90, color: '#7a5cc4', from: 2 },
          { kind: 'label', at: [580, 610], pos: [580, 760], text: '雷声慢吞吞', from: 3 },
          { kind: 'text', at: [600, 830], text: '声音每秒约 340 米', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '光快得多', duration: 12,
        cues: [
          { kind: 'arrow', path: [[160, 330], [1040, 330]], color: '#f5b800', text: '光：一眨眼', draw: 0.4, from: 0.6 },
          { kind: 'arrow', path: [[160, 520], [460, 520]], color: '#7a5cc4', text: '声音', draw: 6, from: 0.6 },
          { kind: 'count', at: [820, 560], label: '雷声要走', start: 0, end: 3, unit: '秒', from: 1, over: 6 },
          { kind: 'text', at: [600, 200], text: '光快将近 90 万倍', from: 7 },
          { kind: 'text', at: [600, 820], text: '一千米外的闪电', from: 0.6 },
        ],
      },
      {
        turn: 2, title: '数秒算距离', duration: 12,
        cues: [
          { kind: 'count', at: [360, 380], label: '隔了几秒', start: 0, end: 10, unit: '秒', from: 0.6, over: 3 },
          { kind: 'count', at: [840, 380], label: '大约多远', start: 0, end: 3400, unit: '米', from: 3, over: 2 },
          { kind: 'text', at: [600, 560], text: '秒数 × 340 米', from: 4.5 },
          { kind: 'myth', wrong: '雷和闪电不是同时的', right: '同时发生，声音跑得慢', from: 6.6 },
        ],
      },
      {
        turn: 3, title: '听到雷就进屋', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🏠', path: [[620, 470]], size: 240, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[180, 620], [520, 560]], size: 120, travel: 2, from: 1 },
          { kind: 'sprite', icon: '🌳', path: [[980, 520]], size: 220, from: 0 },
          { kind: 'label', at: [980, 520], pos: [980, 260], text: '别躲大树下', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '听得到雷声就危险', from: 6 },
        ],
      },
      {
        turn: 4, title: '咔嚓和轰隆', duration: 12,
        cues: [
          { kind: 'ray', path: [[260, 180], [400, 300], [320, 430], [470, 600]], color: '#f5b800', draw: 0.5, from: 0.3 },
          { kind: 'sprite', icon: '🧒', path: [[960, 620]], size: 140, from: 0 },
          { kind: 'arrow', path: [[490, 600], [880, 620]], color: '#7a5cc4', text: '近处先到', draw: 1, from: 1.4 },
          { kind: 'arrow', path: [[290, 200], [890, 560]], color: '#b9a3e3', text: '远处后到', draw: 2.4, from: 3.4 },
          { kind: 'text', at: [600, 830], text: '连成一长串轰隆隆', from: 7 },
        ],
      },
    ],
  },
};
