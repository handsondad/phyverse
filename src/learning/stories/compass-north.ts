import type { Story, Vec } from './types';

/** 地球磁场的一根磁感线：从北半球地面出发，绕到 side 那一边，再回到南半球地面；L 是它离地心最远处与地球半径之比 */
function lobe(cx: number, cy: number, R: number, L: number, side: 1 | -1, count = 24): Vec[] {
  const top = Math.acos(Math.sqrt(1 / L));
  return Array.from({ length: count + 1 }, (_, i) => {
    const lat = top - (2 * top * i) / count;
    const r = L * R * Math.cos(lat) ** 2;
    return [Math.round(cx + side * r * Math.cos(lat)), Math.round(cy - r * Math.sin(lat))] as const;
  });
}

const NPOLE = '#d9480f';
const SPOLE = '#3553a6';
const FIELD = '#7a9cc6';
const EARTH = '#cfe5f7';

export const compassNorth: Story = {
  slug: 'compass-north',
  title: '指南针为什么总是指着南北？',
  trigger: '春游时，老师发给每个小组一个指南针。小念把它转了好几圈，可每次停下来，红色那头都指着北方。',
  dialogue: [
    {
      nian: '爸爸，指南针不管怎么转，停下来为什么总是指着南北？',
      dad: '因为地球本身就像一块大磁铁，周围到处都有磁场。指南针是一根能转的小磁针，会顺着这里的磁场方向停下来，所以一头指北、一头指南。课本里说，小磁针静止时 N 极所指的方向，就是那里磁场的方向。',
    },
    {
      nian: '地球像一块大磁铁……那它的 N 极在北边吗？',
      dad: '正好反过来。磁铁是同名磁极相斥、异名磁极相吸，指南针的 N 极被拉向北方，说明北边附近藏着的是这块“大磁铁”的 S 极。美国国家海洋和大气管理局的资料说，地磁场很像地心放着一根条形磁铁，只是这根“磁铁”和地轴没有完全对齐。',
      figure: { kind: 'sim', sim: 'compass', caption: '把指南针放到不同的地方，再在旁边放一块磁铁：它的 N 极指向哪里？' },
    },
    {
      nian: '没有完全对齐……那指南针指的北，就是北极吗？',
      dad: '不完全是。指南针指的是“磁北”，和地图上的正北差一个小角度，叫磁偏角。宋朝的沈括在《梦溪笔谈》里就写过，指南针“常微偏东，不全南也”。而且地磁的北极还在慢慢挪动，美国国家海洋和大气管理局说，这几年它每年要挪三十多公里。',
    },
    {
      nian: '每年要挪三十多公里……那是北极有一大块铁在吸着指南针吗？',
      dad: '很多人这么想，其实不是。地球深处有大量熔化的金属在流动，生出了包住整个地球的磁场；指南针只是顺着身边的磁场方向转，并不是被哪一个点吸过去。美国国家海洋和大气管理局的问答里也专门说过：指南针并不指向磁极这一个点。',
    },
    {
      nian: '顺着身边的磁场……那旁边放一块磁铁，指南针会不会被拐跑？',
      dad: '会的！地磁场其实很弱，冰箱贴里的磁铁一凑近，就比它强得多，指南针马上转过去对着磁铁。铁栏杆、汽车也会让它偏。所以用指南针认方向时，要离铁器和磁铁远一点，端平了，等它停稳再看。到了磁极附近，磁场几乎是竖直的，指南针就不好用了。',
    },
    {
      nian: '我懂了！地球本身就像一块大磁铁，指南针顺着地磁场停下来，N 极就指北。可它指的是磁北，跟正北差一点，旁边有磁铁还会被拐跑。',
      dad: '说得对！请大人帮忙，把一根缝衣针在磁铁上朝一个方向摩擦几十下，放在漂在水面的小纸片上，看看它会不会慢慢转向南北。',
    },
  ],
  tip: '缝衣针很尖，摩擦和放置都请大人帮忙。互动图把地磁轴和地轴画成了一条，真实的地磁轴和地轴斜着差了一点。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第1节 磁现象 磁场（地磁场、沈括与磁偏角）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Geomagnetism Frequently Asked Questions（地磁场像地心的一根条形磁铁；指南针不指向某一个点）', by: 'NOAA National Centers for Environmental Information（美国国家海洋和大气管理局）', url: 'https://www.ncei.noaa.gov/products/geomagnetism-frequently-asked-questions' },
    { title: '2025 WMM Annual Report is Released（地磁北极每年约挪 36 公里；地磁来自外核里流动的熔融金属）', by: 'NOAA National Centers for Environmental Information（美国国家海洋和大气管理局）', url: 'https://www.ncei.noaa.gov/news/2025-wmm-annual-report-released' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '地球像大磁铁', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [380, 380], color: EARTH, from: 0 },
          { kind: 'ray', path: lobe(600, 460, 190, 1.6, -1), color: FIELD, draw: 1.2, from: 1 },
          { kind: 'ray', path: lobe(600, 460, 190, 1.6, 1), color: FIELD, draw: 1.2, from: 1 },
          { kind: 'shape', shape: 'rect', at: [600, 410], size: [60, 100], color: SPOLE, text: 'S', from: 2 },
          { kind: 'shape', shape: 'rect', at: [600, 510], size: [60, 100], color: NPOLE, text: 'N', from: 2 },
          { kind: 'sprite', icon: '🧭', path: [[980, 300]], size: 120, from: 3.5 },
          { kind: 'text', at: [600, 830], text: '指南针顺着磁场停下', from: 7 },
        ],
      },
      {
        turn: 1, title: '北边是 S 极', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 480], size: [380, 380], color: EARTH, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [60, 100], color: SPOLE, text: 'S', from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [600, 530], size: [60, 100], color: NPOLE, text: 'N', from: 0.5 },
          { kind: 'sprite', icon: '🧭', path: [[600, 220]], size: 100, from: 1.5 },
          { kind: 'arrow', path: [[690, 230], [640, 380]], color: NPOLE, text: '异名磁极相吸', draw: 0.6, from: 3 },
          { kind: 'label', at: [570, 430], pos: [300, 300], text: '大磁铁的 S 极', from: 4 },
          { kind: 'text', at: [600, 830], text: '地磁轴没完全对齐', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '磁北和正北', duration: 12,
        cues: [
          { kind: 'arrow', path: [[600, 640], [600, 260]], color: '#5d4e37', text: '正北', draw: 0.8, from: 0.5 },
          { kind: 'arrow', path: [[600, 640], [700, 270]], color: NPOLE, text: '磁北', draw: 0.8, from: 2 },
          { kind: 'label', at: [640, 380], pos: [880, 420], text: '差一个磁偏角', from: 3.5 },
          { kind: 'sprite', icon: '📜', path: [[300, 450]], size: 110, from: 5 },
          { kind: 'label', at: [300, 470], pos: [300, 620], text: '沈括早就记下', from: 5.5 },
          { kind: 'text', at: [600, 830], text: '磁北每年挪三十多公里', from: 8 },
        ],
      },
      {
        turn: 3, title: '不是被一点吸', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [400, 400], color: EARTH, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [170, 170], color: '#ffb36b', from: 0.8 },
          { kind: 'particles', box: [530, 350, 140, 140], count: 14, color: '#e8590c', motion: 'jitter', from: 1.2 },
          { kind: 'label', at: [660, 400], pos: [960, 300], text: '熔化的金属在流动', from: 2.5 },
          { kind: 'myth', wrong: '指南针被北极的铁吸着', right: '地球本身就像一块大磁铁', from: 7 },
        ],
      },
      {
        turn: 4, title: '被磁铁拐跑', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧭', path: [[420, 470]], size: 200, from: 0 },
          { kind: 'shape', shape: 'rect', at: [760, 470], size: [110, 70], color: SPOLE, text: 'S', from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [870, 470], size: [110, 70], color: NPOLE, text: 'N', from: 1.5 },
          { kind: 'arrow', path: [[540, 470], [690, 470]], color: NPOLE, text: '被拐跑', draw: 0.6, from: 3 },
          { kind: 'text', at: [600, 830], text: '离铁器和磁铁远一点', from: 7 },
        ],
      },
    ],
  },
};
