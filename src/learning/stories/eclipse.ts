import type { Story } from './types';

const SUN = '#ffb703';
const MOON = '#f1ead2';
const SHADOW = '#2b3048';
const RED = '#b5483a';

export const eclipse: Story = {
  slug: 'eclipse',
  title: '日食和月食是怎么回事，为什么不是每个月都有？',
  trigger: '晚上新闻说今晚有月全食。小念守在窗边，看见圆圆的月亮慢慢缺了一块，最后整个变成了暗红色。',
  dialogue: [
    {
      nian: '爸爸，月亮怎么缺了一块，还变红了？是被云挡住了吗？',
      dad: '不是云，是地球的影子挡住了它。光是沿直线传播的，太阳照着地球，地球背后就拖着一条长长的影子。今晚是十五，月亮正好走到地球背后，钻进了这条影子里，照不到太阳光，就一点点暗下去，这就是月食。',
    },
    {
      nian: '钻进了这条影子……那日食又是怎么回事？',
      dad: '日食正好反过来。初一前后，月亮走到太阳和地球中间，要是三个正好排成一条线，月亮就把太阳挡住，它的影子落到地球上，站在影子里的人就看到太阳缺了一块，甚至整个变黑。美国航天局说，月亮的影子很小，同一个地方平均要几百年才轮到一次日全食。',
      figure: { kind: 'sim', sim: 'eclipse', caption: '让月亮走到初一和十五的位置，再让它偏上去一点：还会有日食、月食吗？' },
    },
    {
      nian: '几百年才轮到一次……可月亮每个月都绕地球一圈，为什么不是每个月都有？',
      dad: '因为月亮绕地球的轨道是斜着的，跟地球绕太阳的轨道差了约 5°。大多数月份，初一、十五的月亮都从影子的上方或下方擦过去，三个排不成一条线。只有月亮恰好走到两条轨道交叉的地方，又正好是初一或十五，才会发生日食或月食。',
    },
    {
      nian: '恰好走到交叉的地方……那月亮为什么会变成红色，不是全黑？',
      dad: '因为地球有大气层。美国航天局解释说，太阳光穿过地球边上的大气时会拐个弯，别的颜色被吸收掉，剩下的红光被弯进地球的影子，照到月亮上。月全食时月亮的红光，其实来自地球上正在日出、日落的那一圈地方。所以月食不是云挡的，是地球的影子。',
    },
    {
      nian: '是地球的影子……那看日食要注意什么？',
      dad: '看月食很安全，用眼睛直接看就行。看日食可千万不能直接看太阳，也不能用普通墨镜、望远镜看，会伤眼睛。美国航天局提醒，除了日全食完全遮住太阳的那一小会儿，看太阳都必须戴专门的日食眼镜；还可以用小孔成像，把太阳的像投到纸上看。',
      figure: {
        kind: 'image',
        src: '/images/photos/eclipse-corona-2017.webp',
        alt: '2017 年日全食照片：月亮的黑圆盘刚好遮住太阳，周围透出洁白羽毛状的日冕和边缘一点粉红色光斑',
        caption: '2017 年日全食完全遮住太阳的那一刻：平时被强光盖住的白色日冕露了出来。',
        credit: 'NASA / Carla Thomas · 公有领域',
        href: 'https://images.nasa.gov/details/AFRC2017-0233-005',
      },
    },
    {
      nian: '我懂了！光沿直线传播，月亮的影子落到地球上就是日食，月亮钻进地球的影子就是月食。月亮的轨道斜着，所以不是每个月都有。',
      dad: '说得对！下次有月食的预报，我们一起拿个本子，每隔十分钟画一次月亮缺了多少。',
    },
  ],
  tip: '看日食一定要戴合格的日食眼镜，或者用小孔成像间接看，绝不能用眼睛、墨镜或望远镜直接看太阳。互动图里的大小和距离都没按比例。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播（影子、日食和月食、小孔成像）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Lunar Eclipses and Solar Eclipses（日食和月食；月亮轨道斜着所以不是每个月都有；月食泛红；同一地点约几百年才见一次日全食）', by: 'NASA Space Place（美国航天局）', url: 'https://spaceplace.nasa.gov/eclipses/en/' },
    { title: 'Moon Phases（月亮的轨道斜着约 5°，新月时通常不正好挡在太阳和地球中间）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/moon-phases/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '钻进地球影子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [110, 450], size: [200, 200], color: SUN, text: '太阳', from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[500, 450]], size: 150, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [800, 450], size: [400, 110], color: SHADOW, text: '地球的影子', from: 1 },
          { kind: 'shape', shape: 'circle', at: [940, 290], size: [80, 80], color: MOON, slide: { to: [940, 450], at: 2.5, over: 2 }, tint: { color: RED, at: 4.5, over: 1.5 }, from: 2 },
          { kind: 'label', at: [880, 480], pos: [960, 660], text: '十五：月食', from: 6 },
          { kind: 'text', at: [600, 830], text: '照不到太阳光，就暗了', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '日食反过来', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [110, 450], size: [200, 200], color: SUN, text: '太阳', from: 0 },
          { kind: 'sprite', icon: '🌑', path: [[420, 450]], size: 80, from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [610, 450], size: [300, 26], color: SHADOW, from: 1.5 },
          { kind: 'sprite', icon: '🌍', path: [[860, 450]], size: 180, from: 0.5 },
          { kind: 'label', at: [775, 450], pos: [800, 250], text: '影子里的人看到日食', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '初一：日食', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '轨道斜着', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[600, 470]], size: 150, from: 0 },
          { kind: 'bond', a: [220, 470], b: [980, 470], color: '#9aa3ad', from: 0.5 },
          { kind: 'bond', a: [220, 540], b: [980, 400], color: '#f59f00', from: 1.5 },
          { kind: 'count', at: [600, 250], label: '两条轨道差约', start: 0, end: 5, unit: '°', from: 2.5 },
          { kind: 'sprite', icon: '🌕', path: [[900, 415]], size: 60, from: 3.5 },
          { kind: 'label', at: [900, 400], pos: [1000, 640], text: '从影子上方擦过', from: 4 },
          { kind: 'text', at: [600, 830], text: '大多数月份排不成线', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '红红的月亮', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[450, 450]], size: 200, from: 0 },
          { kind: 'ray', path: [[140, 320], [420, 345], [820, 430]], color: '#ff6b6b', draw: 1, from: 1 },
          { kind: 'shape', shape: 'circle', at: [880, 450], size: [90, 90], color: RED, from: 2 },
          { kind: 'label', at: [420, 345], pos: [330, 220], text: '大气把红光弯进来', from: 2.5 },
          { kind: 'myth', wrong: '月食是月亮被云挡住了', right: '是钻进了地球的影子', from: 7 },
        ],
      },
      {
        turn: 4, title: '安全看日食', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🕶️', path: [[350, 450]], size: 140, from: 0 },
          { kind: 'sprite', icon: '🚫', path: [[350, 450]], size: 210, from: 1.5 },
          { kind: 'label', at: [350, 540], pos: [350, 690], text: '普通墨镜不行', from: 2 },
          { kind: 'shape', shape: 'rect', at: [850, 450], size: [260, 110], color: '#343a40', text: '日食眼镜', from: 3 },
          { kind: 'label', at: [850, 510], pos: [850, 690], text: '戴专门的眼镜', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '月食可以直接看', from: 7.5 },
        ],
      },
    ],
  },
};
