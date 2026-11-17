import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const PULL = '#3553a6';
const GO = '#e8590c';

export const moonOrbit: Story = {
  slug: 'moon-orbit',
  title: '地球吸着月亮，月亮为什么不掉下来？',
  trigger: '小念一边啃苹果，一边听爸爸讲牛顿和苹果的故事。她抬头看见窗外又大又圆的月亮，突然冒出一个问题。',
  dialogue: [
    {
      nian: '爸爸，地球能把苹果吸下来，也吸着月亮，那月亮为什么不掉下来？',
      dad: '其实月亮一直在往地球掉！只是它同时在横着飞，飞得很快。它往下掉一点，就往前飞了好远一段，而地球是圆的，地面也跟着弯走了，所以它怎么掉也掉不到地上，就一直绕着地球转圈。美国航天局也说，月亮是在“绕着地球往下掉”。',
    },
    {
      nian: '绕着地球往下掉……那要飞多快才掉不下来？',
      dad: '牛顿想过一个办法：站在高山顶上横着扔石头，扔得越快，落地越远。快到每秒约 7.9 公里，石头往下掉多少，地面就弯走多少，它就绕着地球转起来，成了一颗卫星。月亮离得远，受的引力弱多了，每秒大约走 1 公里就够了。',
      figure: { kind: 'sim', sim: 'orbit', caption: '把打出去的速度调快一点、再快一点：它什么时候不再落回地面？' },
    },
    {
      nian: '每秒大约走 1 公里……那拉着月亮的，真的是让苹果落地的那个力吗？',
      dad: '是的，牛顿就是这么想的。月亮离地心的距离，大约是地球半径的 60 倍。如果引力随距离的平方变弱，月亮受的引力就只有地面的三千六百分之一。用这个数去算月亮绕一圈要多久，正好跟真实的 27 天多对上了。课本里管这叫“月—地检验”。',
    },
    {
      nian: '正好对上了……要是引力突然没了，月亮会怎样？',
      dad: '那月亮就会沿着直线飞走，再也不回来；反过来，要是它突然停住不往前飞，就会真的朝地球掉下来。月亮能稳稳地转圈，是因为引力一直把它往里拉，它横着的速度又一直带着它往前跑。很多人以为太空里没有重力，所以月亮掉不下来，这是不对的。',
    },
    {
      nian: '这是不对的……那月亮会不会离我们越来越远？',
      dad: '会，不过特别慢。美国航天局的资料说，月亮每年离地球远大约几厘米。科学家把激光打到放在月亮上的反射镜上，看光来回一趟要多久，就能算出它离我们有多远。光来回一趟，只要 2 秒多。',
    },
    {
      nian: '我懂了！月亮一直在往地球掉，只是它横着飞得够快，掉多少，地面就弯走多少，所以一直绕着地球转。拉着它的就是让苹果落地的引力。',
      dad: '说得对！在空地上用绳子拴一个小沙包甩着转：绳子就像引力，一松手，沙包就沿着直线飞出去了。',
    },
  ],
  tip: '甩沙包要在空旷的地方，周围不能有人，也别对着窗户。互动图里地球和轨道的大小没按比例。',
  sources: [
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第2节 万有引力定律（月—地检验）；第4节 宇宙航行（第一宇宙速度）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'What Is Microgravity?（月亮和空间站一样，是在绕着地球往下掉）', by: 'NASA（美国航天局）', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/' },
    { title: 'Moon Fact Sheet（月亮平均每秒约走 1.02 公里，约 27.3 天绕地球一圈，每年远离约 3.8 厘米）', by: 'NASA Goddard · NSSDCA（美国航天局）', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html' },
    { title: 'Tides（科学家用激光打到月亮上的反射镜测距离）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/moon/tides/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一直在往下掉', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[600, 490]], size: 200, from: 0 },
          { kind: 'arrow', path: [[600, 230], [880, 230]], color: GO, text: '横着飞', draw: 0.6, from: 0.8, to: 6 },
          { kind: 'arrow', path: [[600, 240], [600, 360]], color: PULL, text: '往下掉', draw: 0.6, from: 1.8, to: 6 },
          { kind: 'sprite', icon: '🌕', path: circle(600, 490, 260), size: 70, travel: 8, from: 3 },
          { kind: 'text', at: [600, 830], text: '掉多少，地面就弯走多少', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '牛顿的高山', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[600, 560]], size: 280, from: 0 },
          { kind: 'sprite', icon: '⛰️', path: [[600, 400]], size: 90, from: 0 },
          { kind: 'arrow', path: [[630, 375], [690, 380], [730, 440]], color: '#adb5bd', text: '慢：落地', draw: 0.8, from: 1 },
          { kind: 'arrow', path: [[630, 375], [920, 380], [1050, 580]], color: '#868e96', text: '快：落得远', draw: 0.8, from: 2.5 },
          { kind: 'ray', path: circle(600, 560, 200), color: '#ffd43b', draw: 2, from: 4 },
          { kind: 'count', at: [230, 330], label: '绕圈要每秒', start: 0, end: 7.9, unit: '公里', from: 5 },
          { kind: 'text', at: [600, 830], text: '月亮每秒大约 1 公里', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '月—地检验', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🍎', path: [[220, 420]], size: 110, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[980, 420]], size: 100, from: 0.5 },
          { kind: 'count', at: [600, 300], label: '月地距离约', start: 0, end: 60, unit: '倍半径', from: 1.5 },
          { kind: 'count', at: [600, 560], label: '绕一圈要', start: 0, end: 27, unit: '天多', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '同一个引力', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '引力往里拉', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[560, 470]], size: 170, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[900, 470]], size: 80, from: 0.5 },
          { kind: 'arrow', path: [[860, 470], [700, 470]], color: PULL, text: '引力往里拉', draw: 0.6, from: 1.5 },
          { kind: 'arrow', path: [[900, 420], [900, 250]], color: GO, text: '速度往前跑', draw: 0.6, from: 2.5 },
          { kind: 'myth', wrong: '太空里没有重力', right: '引力一直拉着月亮转', from: 7 },
        ],
      },
      {
        turn: 4, title: '激光量距离', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌍', path: [[200, 470]], size: 150, from: 0 },
          { kind: 'sprite', icon: '🌕', path: [[1000, 470]], size: 90, from: 0 },
          { kind: 'flow', path: [[290, 450], [950, 450]], color: '#ff6b6b', count: 3, speed: 300, from: 1 },
          { kind: 'flow', path: [[950, 490], [290, 490]], color: '#ff6b6b', count: 3, speed: 300, from: 2 },
          { kind: 'label', at: [1000, 510], pos: [1000, 650], text: '月亮上的反射镜', from: 2.5 },
          { kind: 'count', at: [600, 290], label: '光来回一趟', start: 0, end: 2, unit: '秒多', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '每年远大约几厘米', from: 7.5 },
        ],
      },
    ],
  },
};
