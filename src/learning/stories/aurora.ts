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

const RIGHT = lobe(600, 470, 120, 2.4, 1);
const LEFT = lobe(600, 470, 120, 2.4, -1);

const EARTH = '#cfe5f7';
const FIELD = '#7a9cc6';
const SUN = '#ffb703';
const GREEN = '#51cf66';
const RED = '#ff6b81';

export const aurora: Story = {
  slug: 'aurora',
  title: '极光是怎么来的，为什么多在南北极附近？',
  trigger: '小念在新闻里看到一张照片：北京郊外的长城上空泛着一大片玫红色的光，标题写着“北京拍到极光”。',
  dialogue: [
    {
      nian: '爸爸，极光是怎么来的？它不是只在北极才有吗？',
      dad: '极光是高空的空气被撞得发了光。太阳一直往外吹出带电的粒子，叫太阳风。地球的磁场像一把大伞，把大部分粒子挡在外面，可也有一部分顺着磁感线溜进来，冲到南北两极附近的高空，撞上那里的氧和氮，空气就发出绿色、红色、紫色的光，这就是极光。',
    },
    {
      nian: '顺着磁感线溜进来……为什么偏偏是南北两极？',
      dad: '因为越靠近两极，地球的磁感线越往下扎进大地。带电的粒子很难横着穿过磁感线，只能绕着它打转、顺着它滑，于是就被引到了离磁极不远的地方。美国国家海洋和大气管理局说，极光常常排成一个围着磁极的大圆圈，住在圆圈底下的人最常看到极光。',
      figure: { kind: 'sim', sim: 'aurora', caption: '让太阳风变强一点，再来一次超大地磁暴：极光会落到哪里？' },
    },
    {
      nian: '围着磁极的大圆圈……那北京怎么也能看到极光？',
      dad: '那是太阳闹得特别凶的时候。2024 年 5 月，太阳接连喷出大团带电的物质，冲到地球引发了大地磁暴，国家空间天气监测预警中心发了最高级的红色预警。人民日报报道，那几天北京、内蒙古、黑龙江、新疆等很多地方都出现了极光。太阳活动越强，极光的大圆圈就往离两极越远的地方扩。',
    },
    {
      nian: '往离两极越远的地方扩……那极光是冰雪反射出来的光吗？',
      dad: '不是。很多人以为极光是冰雪反射的光，其实是高空的空气自己在发光，离地面大约一百到四百公里，比飞机飞得高多了。中国气象局的专家介绍，约四百公里高的氧原子发红光，两百公里左右的氧原子发绿光，一百公里左右的氮分子发紫光，五颜六色就是这么来的。',
      figure: {
        kind: 'image',
        src: '/images/photos/aurora-iss023.webp',
        alt: '国际空间站从太空俯拍地球边缘，高层大气里亮着一条翠绿色的极光光带',
        caption: '国际空间站从太空往下拍到的极光：发光的地方悬在百余公里高的空气里，远远高过地面的云层。',
        credit: 'NASA · 公有领域',
        href: 'https://images.nasa.gov/details/iss023e058455',
      },
    },
    {
      nian: '比飞机飞得高多了……地球的磁场还能挡住别的东西吗？',
      dad: '能挡住很多。美国国家海洋和大气管理局的资料说，要是没有地球的磁场和大气层这两层保护，从太阳冲过来的辐射和带电粒子会对地球上的生命很危险。大部分带电粒子在离地面很远的地方就被磁场拐开了，我们站在地上，平常一点也感觉不到。',
    },
    {
      nian: '我懂了！太阳吹出的带电粒子被地球磁场挡住，一部分顺着磁感线溜到南北两极附近，撞得高空的空气发光，就是极光。太阳闹得特别凶时，北京也能看到。',
      dad: '说得对！留意国家空间天气监测预警中心发布的地磁暴预警，有机会时，和大人一起到没有灯光的北边郊外，朝北边的天空看一看。',
    },
  ],
  tip: '中国气象局的专家说，地磁暴对普通人的身体没有影响，不需要专门防护。夜里外出看极光一定要和大人一起，注意保暖和安全。互动图里粒子的路线只是示意。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第1节 磁现象 磁场（地磁场）；选择性必修 第二册 · 第一章 第2节 磁场对运动电荷的作用力', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Aurora Tutorial（电子顺着地磁场冲进高层大气发光，极光排成围着磁极的环；活动越强离两极越远）', by: 'NOAA Space Weather Prediction Center（美国国家海洋和大气管理局）', url: 'https://www.spaceweather.gov/content/aurora-tutorial' },
    { title: 'Solar-Terrestrial Interactions（带电粒子绕着磁感线打转；磁场和大气层两层保护）', by: 'NOAA Space Weather Prediction Center（美国国家海洋和大气管理局）', url: 'https://www.spaceweather.gov/sites/default/files/images/u2/Chapter_4_mod2-FINAL.pdf' },
    { title: '我国多地出现极光现象，中国气象局专家解读——地磁暴、太阳耀斑，会有什么影响？（北京等多地出现极光；不同高度的氧、氮发出不同颜色；不影响身体健康）', by: '人民日报（新华网转载）', url: 'https://www.news.cn/science/20240513/f8e555599b734ca09abbf5045e5ecef9/c.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '太阳吹来粒子', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [60, 470], size: [300, 300], color: SUN, from: 0 },
          { kind: 'flow', path: [[220, 380], [560, 380]], color: '#ffd43b', count: 5, speed: 160, from: 1 },
          { kind: 'flow', path: [[220, 560], [560, 560]], color: '#ffd43b', count: 5, speed: 160, from: 1.4 },
          { kind: 'shape', shape: 'circle', at: [820, 470], size: [220, 220], color: EARTH, from: 0 },
          { kind: 'ray', path: [[600, 300], [580, 470], [600, 640]], color: FIELD, draw: 1, from: 2.5 },
          { kind: 'label', at: [585, 470], pos: [600, 230], text: '磁场像一把大伞', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '撞得高空的空气发光', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '顺着磁感线滑', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [240, 240], color: EARTH, from: 0 },
          { kind: 'ray', path: RIGHT, color: FIELD, draw: 1.2, from: 0.5 },
          { kind: 'ray', path: LEFT, color: FIELD, draw: 1.2, from: 0.5 },
          { kind: 'flow', path: RIGHT.slice(0, 13).reverse(), color: '#ffd43b', count: 4, speed: 180, from: 2 },
          { kind: 'pulse', at: RIGHT[0], color: GREEN, radius: 70, from: 3 },
          { kind: 'pulse', at: RIGHT[RIGHT.length - 1], color: GREEN, radius: 70, from: 3.5 },
          { kind: 'text', at: [600, 830], text: '围着磁极的大圆圈', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '北京也看到了', duration: 12,
        cues: [
          { kind: 'count', at: [330, 300], label: '那一年', start: 2000, end: 2024, unit: '年', from: 0.5 },
          { kind: 'count', at: [330, 470], label: '那个月份', start: 0, end: 5, unit: '月', from: 2 },
          { kind: 'shape', shape: 'circle', at: [820, 460], size: [240, 240], color: EARTH, from: 0 },
          { kind: 'pulse', at: [900, 380], color: RED, radius: 90, from: 3.5 },
          { kind: 'label', at: [900, 380], pos: [1000, 250], text: '北京', from: 4 },
          { kind: 'text', at: [600, 830], text: '大地磁暴，极光南扩', from: 7 },
        ],
      },
      {
        turn: 3, title: '空气自己发光', duration: 12,
        cues: [
          { kind: 'count', at: [250, 330], label: '红光高约', start: 0, end: 400, unit: '公里', from: 0.5 },
          { kind: 'count', at: [550, 330], label: '绿光高约', start: 0, end: 200, unit: '公里', from: 1.5 },
          { kind: 'count', at: [850, 330], label: '紫光高约', start: 0, end: 100, unit: '公里', from: 2.5 },
          { kind: 'shape', shape: 'pill', at: [250, 500], size: [220, 80], color: RED, text: '氧', from: 3.5 },
          { kind: 'shape', shape: 'pill', at: [550, 500], size: [220, 80], color: GREEN, text: '氧', from: 4 },
          { kind: 'shape', shape: 'pill', at: [850, 500], size: [220, 80], color: '#9775fa', text: '氮', from: 4.5 },
          { kind: 'myth', wrong: '极光是冰雪反射的光', right: '是高空的空气自己发光', from: 7 },
        ],
      },
      {
        turn: 4, title: '两层保护', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [220, 220], color: EARTH, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [280, 280], color: '#e7f5ff', outline: true, from: 1 },
          { kind: 'ray', path: [[320, 300], [250, 470], [320, 640]], color: FIELD, draw: 1, from: 2 },
          { kind: 'flow', path: [[80, 420], [230, 420], [180, 300]], color: '#ffd43b', count: 4, speed: 160, from: 3 },
          { kind: 'label', at: [250, 470], pos: [250, 700], text: '磁场把粒子拐开', from: 3.5 },
          { kind: 'label', at: [740, 400], pos: [960, 300], text: '还有大气层', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '平常一点也感觉不到', from: 7.5 },
        ],
      },
    ],
  },
};
