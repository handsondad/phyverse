import type { Story } from './types';

const SUN = '#ffb703';
const LIGHT = '#ffd43b';

export const moonPhase: Story = {
  slug: 'moon-phase',
  title: '月亮为什么有时圆、有时弯？',
  trigger: '小念连着几天晚上在阳台看月亮：前几天还是一弯细细的月牙，今晚已经胖了一大半。',
  dialogue: [
    {
      nian: '爸爸，月亮为什么有时圆、有时弯？是地球的影子把它挡住了吗？',
      dad: '不是影子。月亮自己不发光，我们看到的月光，是它反射的太阳光。太阳总把月亮朝着它的那一半照亮，另一半是黑的。月亮绕着地球转，这亮着的一半有时正对着我们，有时侧着，有时几乎全背过去，我们看到的亮面就时多时少。',
    },
    {
      nian: '亮着的一半有时侧着……那什么时候是圆的，什么时候是弯的？',
      dad: '月亮走到地球背后、跟太阳隔着地球的时候，亮着的一半整个朝着我们，就是满月，大约在农历十五前后。走到太阳和地球中间时，亮面全背着我们，几乎看不见，叫新月，大约在初一。在这两个位置中间，就是弯弯的月牙和半个月亮。',
      figure: { kind: 'sim', sim: 'phases', caption: '拖一拖天数，看月亮走到哪儿，地上看到的月亮又是什么样？' },
    },
    {
      nian: '弯弯的月牙和半个月亮……那月亮多久变一轮？',
      dad: '美国航天局的资料说，从新月到下一个新月，大约要 29.5 天，差不多一个月。我国的农历就是跟着月相排的，每个月初一前后是新月，十五前后是满月。在北半球看，月亮一天天变圆时亮在右边，变瘦时亮在左边。',
    },
    {
      nian: '亮在右边……那很多人说是地球的影子挡住了月亮，对不对？',
      dad: '不对。地球的影子落到月亮上，那叫月食，并不常有，而月相每天都在变。月相的弯，是因为太阳照着月亮的一侧，我们从旁边只看到亮面的一部分。下次看到月牙，你会发现亮的那一弯总是朝着太阳那边。',
    },
    {
      nian: '总是朝着太阳那边……那月牙旁边暗的地方，为什么有时也能隐约看见？',
      dad: '你观察得真仔细！那是地球照亮的。太阳光照到地球上，地球的海洋、云和陆地又把一部分光反射到月亮上，把月亮暗的那面照得微微发亮。美国航天局管它叫“地球照”，月亮是一弯月牙的时候最容易看到。',
    },
    {
      nian: '我懂了！月亮自己不发光，太阳总照亮它的一半。月亮绕地球转，亮的那一半朝着我们的部分有多有少，看起来就有圆有弯，大约一个月轮一遍。',
      dad: '说得对！接下来一个月，每天同一时间画一画月亮的样子，再在旁边写上农历日期，看看是不是十五前后最圆。',
    },
  ],
  tip: '看月亮可以用眼睛或望远镜，但千万别用望远镜去看太阳。互动图里的距离和大小都没按比例。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播（光源：月亮本身不发光）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Moon Phases（月亮自己不发光；太阳总照亮它的一半；约 29.5 天轮一遍；地球照）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/moon-phases/' },
    { title: 'Moon Facts（月亮绕地球转，被照亮的部分变化形成月相）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '太阳照亮一半', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [130, 470], size: [200, 200], color: SUN, text: '太阳', from: 0 },
          { kind: 'arrow', path: [[260, 470], [500, 470]], color: LIGHT, draw: 0.6, from: 1 },
          { kind: 'sprite', icon: '🌗', path: [[700, 470]], size: 220, from: 2 },
          { kind: 'label', at: [640, 430], pos: [600, 230], text: '亮的一半朝着太阳', from: 3 },
          { kind: 'label', at: [760, 520], pos: [990, 660], text: '另一半是黑的', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '我们看到的是反射的光', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '绕着地球转', duration: 12,
        cues: [
          { kind: 'arrow', path: [[120, 260], [300, 260]], color: LIGHT, text: '太阳光', draw: 0.5, from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[600, 470]], size: 150, from: 0 },
          { kind: 'sprite', icon: '🌑', path: [[360, 470]], size: 90, from: 1 },
          { kind: 'label', at: [360, 500], pos: [330, 660], text: '新月 · 初一前后', from: 1.5 },
          { kind: 'sprite', icon: '🌕', path: [[840, 470]], size: 90, from: 2.5 },
          { kind: 'label', at: [840, 500], pos: [870, 660], text: '满月 · 十五前后', from: 3 },
          { kind: 'text', at: [600, 830], text: '中间是月牙和半个月亮', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '一个月一轮', duration: 12,
        cues: [
          { kind: 'count', at: [600, 290], label: '轮一遍要', start: 0, end: 29.5, unit: '天', from: 0.5 },
          { kind: 'sprite', icon: '🌒', path: [[200, 540]], size: 110, from: 2 },
          { kind: 'sprite', icon: '🌓', path: [[400, 540]], size: 110, from: 2.5 },
          { kind: 'sprite', icon: '🌕', path: [[600, 540]], size: 110, from: 3 },
          { kind: 'sprite', icon: '🌗', path: [[800, 540]], size: 110, from: 3.5 },
          { kind: 'sprite', icon: '🌘', path: [[1000, 540]], size: 110, from: 4 },
          { kind: 'text', at: [600, 830], text: '变圆亮右边，变瘦亮左边', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '不是影子挡的', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[200, 420]], size: 160, from: 0 },
          { kind: 'arrow', path: [[310, 420], [600, 420]], color: LIGHT, draw: 0.6, from: 1 },
          { kind: 'sprite', icon: '🌒', path: [[720, 420]], size: 160, from: 1 },
          { kind: 'label', at: [760, 400], pos: [980, 280], text: '亮的一弯朝着太阳', from: 2.5 },
          { kind: 'myth', wrong: '地球的影子挡住了月亮', right: '是亮面朝着我们的多少在变', from: 6 },
        ],
      },
      {
        turn: 4, title: '地球照', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[280, 470]], size: 180, from: 0 },
          { kind: 'sprite', icon: '🌒', path: [[900, 470]], size: 170, from: 0.5 },
          { kind: 'arrow', path: [[400, 430], [790, 430]], color: '#9ec5fe', text: '地球反射的光', draw: 0.8, from: 2 },
          { kind: 'label', at: [870, 500], pos: [900, 690], text: '暗的地方微微发亮', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '月牙时最容易看到', from: 7.5 },
        ],
      },
    ],
  },
};
