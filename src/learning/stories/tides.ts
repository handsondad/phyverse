import type { Story } from './types';

const SUN = '#ffb703';
const SEA = '#74b3e8';
const PULL = '#3553a6';
const MOON = '#f1ead2';

export const tides: Story = {
  slug: 'tides',
  title: '海水为什么一天涨两次潮？',
  trigger: '暑假在海边赶海，早上还是一大片能捡贝壳的沙滩，中午海水就涨了上来，傍晚又退了下去。',
  dialogue: [
    {
      nian: '爸爸，海水为什么一会儿涨上来、一会儿退下去？是风吹的吗？',
      dad: '主要不是风，是月亮的引力。美国国家海洋和大气管理局说，三百多年前牛顿就解释过：潮汐是太阳和月亮的引力拉着地球上的海水造成的。月亮离我们近，拉得最明显。海水被拉得鼓起来的地方，就涨潮；被拉走了水的地方，就落潮。',
    },
    {
      nian: '鼓起来的地方就涨潮……为什么一天会涨两次？',
      dad: '因为海水不只在朝着月亮的那一边鼓起来，背着月亮的那一边也鼓起来，像一个被拉长的橄榄球。地球每天自转一圈，海边会先后转进这两个“鼓包”，所以大多数海边一天涨两次、落两次，两次涨潮之间隔十二个多小时。',
      figure: { kind: 'sim', sim: 'tide', caption: '看红点那片海边跟着地球转：一天里水位涨落几次？再换成“成直角”试试。' },
    },
    {
      nian: '背着月亮的那一边也鼓起来……那边为什么也会鼓？',
      dad: '因为月亮对地球每个地方的拉力不一样大：离它近的海水被拉得最狠，地球本身次之，离它最远那边的海水被拉得最轻。近的海水被拉过去，远的海水像被“落在了后面”，于是两头都鼓了起来。美国航天局的科普图也是这么画的。',
    },
    {
      nian: '两头都鼓了起来……那太阳的引力不管潮水吗？',
      dad: '也管，只是太阳离得太远，它拉出潮水的本领只有月亮的一半左右。初一、十五前后，太阳、月亮和地球排成一条线，两边的拉扯叠在一起，潮水涨得特别高、落得特别低，叫大潮；初八、廿三前后，太阳和月亮成直角，力量部分抵消，叫小潮。',
    },
    {
      nian: '叫大潮……那每天涨潮的时间都一样吗？',
      dad: '不一样，每天大约要推迟 50 分钟。因为月亮也在绕着地球转，地球转完一圈，还要多转一会儿才能重新对着月亮。所以去海边赶海，一定要先查当地的潮汐表，记好涨潮的时间，早点回到岸上。',
    },
    {
      nian: '我懂了！月亮的引力把海水拉成两头鼓，地球转一圈，海边两次转进鼓起来的水里，所以一天涨两次潮。太阳和月亮排成一线时，潮水最大。',
      dad: '说得对！下次去海边，先查潮汐表，再在沙滩上插一根小木棍，每隔一个小时看看海水离它有多远。',
    },
  ],
  tip: '赶海一定要有大人陪着，提前查好潮汐表，涨潮前回到岸上，不要走到礁石和滩涂深处。各地海岸的形状不同，涨落的时间和高低也不一样。',
  sources: [
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第2节 万有引力定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What Causes Tides?（潮汐由太阳和月亮的引力造成；太阳的引潮力约为月亮的一半）', by: "NOAA National Ocean Service（美国国家海洋和大气管理局）", url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html' },
    { title: 'Frequency of Tides: The Lunar Day（大多数海岸一天两涨两落；每天推迟约 50 分钟）', by: "NOAA National Ocean Service（美国国家海洋和大气管理局）", url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides05_lunarday.html' },
    { title: 'Tides（朝着和背着月亮两边都鼓起；新月、满月时大潮，上下弦时小潮）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/tides/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '月亮拉着海水', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[420, 450]], size: 220, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[1000, 450]], size: 100, from: 0.5 },
          { kind: 'arrow', path: [[920, 450], [580, 450]], color: PULL, text: '月亮的引力', draw: 0.7, from: 1.5 },
          { kind: 'label', at: [530, 400], pos: [600, 240], text: '海水被拉得鼓起来', from: 3 },
          { kind: 'myth', wrong: '潮汐是风吹出来的', right: '主要是月亮的引力拉的', from: 7 },
        ],
      },
      {
        turn: 1, title: '两个鼓包', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [520, 470], size: [470, 300], color: SEA, from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[520, 470]], size: 220, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[1050, 470]], size: 90, from: 0.5 },
          { kind: 'label', at: [740, 470], pos: [820, 690], text: '朝着月亮鼓', from: 1.5 },
          { kind: 'label', at: [300, 470], pos: [250, 690], text: '背着月亮也鼓', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '一天涨两次、落两次', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '拉力不一样大', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [500, 470], size: [260, 260], color: '#8fbf6a', from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[1060, 470]], size: 90, from: 0 },
          { kind: 'arrow', path: [[650, 470], [880, 470]], color: '#e8590c', text: '拉得最狠', draw: 0.5, from: 1 },
          { kind: 'arrow', path: [[500, 470], [620, 470]], color: '#f59f00', text: '中等', draw: 0.5, from: 2 },
          { kind: 'arrow', path: [[310, 470], [380, 470]], color: '#fab005', text: '最轻', draw: 0.5, from: 3 },
          { kind: 'text', at: [600, 830], text: '两头都鼓起来', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '大潮和小潮', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [130, 340], size: [160, 160], color: SUN, text: '太阳', from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[600, 340]], size: 140, from: 0 },
          { kind: 'shape', shape: 'circle', at: [880, 340], size: [70, 70], color: MOON, slide: { to: [600, 590], at: 5, over: 1.2 }, from: 0.5 },
          { kind: 'label', at: [740, 340], pos: [740, 190], text: '排成一线：大潮', from: 1.5, to: 4.6 },
          { kind: 'label', at: [600, 590], pos: [900, 650], text: '成直角：小潮', from: 6.5 },
          { kind: 'text', at: [600, 830], text: '太阳的作用约是一半', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '每天晚一点', duration: 12,
        cues: [
          { kind: 'count', at: [600, 290], label: '每天推迟大约', start: 0, end: 50, unit: '分钟', from: 0.5 },
          { kind: 'sprite', icon: '🏖️', path: [[350, 560]], size: 150, from: 1.5 },
          { kind: 'sprite', icon: '📋', path: [[850, 560]], size: 130, from: 2.5 },
          { kind: 'label', at: [850, 620], pos: [900, 720], text: '先查潮汐表', from: 3 },
          { kind: 'text', at: [600, 830], text: '涨潮前回到岸上', from: 7.5 },
        ],
      },
    ],
  },
};
