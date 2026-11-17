import type { Story } from './types';

const HOT = '#e8590c';
const COLD = '#3553a6';
const AXIS = '#5d4e37';

export const seasons: Story = {
  slug: 'seasons',
  title: '夏天热，是因为地球离太阳近吗？',
  trigger: '小念在一本旧书上看到一句话：“夏天热，是因为地球离太阳近。”她拿着书跑去问爸爸，这是不是真的。',
  dialogue: [
    {
      nian: '爸爸，夏天热，是因为地球离太阳近吗？',
      dad: '很多人这么想，其实不对。美国航天局的科普里说，北半球过冬天的时候，地球离太阳最近；过夏天的时候，反而离太阳最远。地球离太阳的远近一年里只变一点点，对冷热影响不大。真正的原因是：地球是斜着身子绕太阳转的。',
    },
    {
      nian: '斜着身子绕太阳转……斜着为什么就有了冬天和夏天？',
      dad: '地球的地轴斜着约 23.5°，而且一年到头都朝同一个方向斜。6 月前后，北半球歪向太阳，阳光照得又直又集中，白天也长，地面得到的热多，就是夏天；12 月前后，北半球背着太阳，阳光斜斜地铺开，白天又短，就是冬天。',
      figure: { kind: 'sim', sim: 'tilt', caption: '让地球走到 6 月和 12 月，再试试“假如地轴不斜”：北京的阳光有什么不同？' },
    },
    {
      nian: '阳光斜斜地铺开……照得斜一点，为什么就冷了？',
      dad: '拿手电筒照桌子试试：垂直照下去，光斑小小的，很亮；斜着照，同样的光铺成一大片，每一小块分到的光就少了。阳光也是这样。在北京，夏至正午太阳高七十多度，冬至只有二十多度，同样一束阳光，冬天铺开得大得多，地面就晒不热。',
    },
    {
      nian: '地面就晒不热……那白天的长短也有关系吗？',
      dad: '有关系。在北京，夏至前后白天有十五个小时左右，冬至前后只有九个多小时。白天长，太阳晒得久，夜里散热的时间短，热就一天天攒起来；冬天正好反过来。所以冷和热，是阳光照得直不直、晒得久不久一起决定的。',
    },
    {
      nian: '一起决定的……那南半球的人，是不是 6 月过冬天？',
      dad: '对！6 月北半球歪向太阳时，南半球正好背着太阳，所以澳大利亚的人 6 月过冬天、12 月过夏天。美国航天局也说，南北两个半球的季节总是正好相反。这也说明四季跟地球离太阳的远近关系不大，不然南北半球应该一起热、一起冷。',
    },
    {
      nian: '我懂了！四季不是因为地球离太阳远近，而是地轴斜着。北半球歪向太阳时，阳光直、白天长，就是夏天；背着太阳时，阳光斜、白天短，就是冬天。',
      dad: '说得对！每个月挑一天正午，在阳台上量一量一根筷子影子的长短，看看是不是夏天短、冬天长。',
    },
  ],
  tip: '量影子时别抬头直接看太阳。互动图里的轨道和地球大小都没按比例，北京的太阳高度和白天长短是按北纬 40° 估算的。',
  sources: [
    { title: '地理 七年级上册 · 地球的运动（地球公转与四季，黄赤交角）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What Causes the Seasons?（地轴倾斜造成四季；北半球冬天地球离太阳最近；南北半球季节相反）', by: 'NASA Space Place（美国航天局）', url: 'https://spaceplace.nasa.gov/seasons/en/' },
    { title: 'Moon Phases（地轴倾斜约 23.5°）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/moon-phases/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是离得近', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[600, 430]], size: 160, from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[230, 430]], size: 110, from: 1 },
          { kind: 'label', at: [230, 480], pos: [250, 640], text: '北半球冬天：最近', from: 1.5 },
          { kind: 'sprite', icon: '🌍', path: [[990, 430]], size: 110, from: 2.5 },
          { kind: 'label', at: [990, 480], pos: [960, 640], text: '北半球夏天：最远', from: 3 },
          { kind: 'myth', wrong: '夏天热是因为离太阳近', right: '是地轴斜着，阳光照得直', from: 7 },
        ],
      },
      {
        turn: 1, title: '地轴斜着', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[600, 470]], size: 140, from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[220, 470]], size: 120, from: 0.5 },
          { kind: 'bond', a: [190, 370], b: [250, 570], color: AXIS, from: 1 },
          { kind: 'sprite', icon: '🌍', path: [[980, 470]], size: 120, from: 0.5 },
          { kind: 'bond', a: [950, 370], b: [1010, 570], color: AXIS, from: 1 },
          { kind: 'count', at: [600, 260], label: '地轴斜着约', start: 0, end: 23.5, unit: '°', from: 2 },
          { kind: 'label', at: [220, 540], pos: [230, 690], text: '12 月：背着太阳', from: 3.5 },
          { kind: 'label', at: [980, 540], pos: [970, 690], text: '6 月：歪向太阳', from: 4.5 },
        ],
      },
      {
        turn: 2, title: '照得直才热', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔦', path: [[350, 280]], size: 110, from: 0 },
          { kind: 'shape', shape: 'pill', at: [350, 600], size: [140, 50], color: '#ffe066', text: '亮', from: 1 },
          { kind: 'label', at: [350, 625], pos: [350, 720], text: '直照：小而亮', from: 1.5 },
          { kind: 'sprite', icon: '🔦', path: [[780, 300]], size: 110, from: 2.5 },
          { kind: 'shape', shape: 'pill', at: [880, 600], size: [340, 50], color: '#fff3bf', text: '暗', from: 3 },
          { kind: 'label', at: [880, 625], pos: [880, 720], text: '斜照：铺开一大片', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '阳光斜，地面晒不热', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '白天长短', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[240, 450]], size: 140, from: 0 },
          { kind: 'meter', at: [700, 380], label: '夏至的白天', start: 0, end: 0.62, color: HOT, over: 2, from: 1 },
          { kind: 'meter', at: [700, 520], label: '冬至的白天', start: 0, end: 0.38, color: COLD, over: 2, from: 2.5 },
          { kind: 'text', at: [600, 830], text: '照得直、晒得久，就热', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '南北相反', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[150, 470]], size: 130, from: 0 },
          { kind: 'arrow', path: [[240, 470], [470, 470]], color: '#ffd43b', draw: 0.6, from: 0.5 },
          { kind: 'sprite', icon: '🌍', path: [[620, 470]], size: 220, from: 0.5 },
          { kind: 'label', at: [620, 400], pos: [920, 260], text: '北半球：夏天', from: 1.5 },
          { kind: 'label', at: [620, 545], pos: [920, 680], text: '南半球：冬天', from: 2.5 },
          { kind: 'text', at: [600, 830], text: '6 月南北半球季节相反', from: 7.5 },
        ],
      },
    ],
  },
};
