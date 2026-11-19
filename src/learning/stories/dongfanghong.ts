import type { Story } from './types';

const NIGHT = '#141b2d';
const SHINE = '#fff3bf';
const EARTH = '#a5d8ff';
const HOT = '#e8590c';

export const dongfanghong: Story = {
  slug: 'dongfanghong',
  title: '1970 年，全世界是怎样“看见”和“听见”中国卫星的？',
  trigger: '小念在航天日的展览上看到一颗银光闪闪的多面体卫星模型，旁边写着“东方红一号，1970 年 4 月 24 日”。爷爷说，那年春天的晚上，他还在院子里看见卫星飞过。',
  dialogue: [
    {
      nian: '爸爸，东方红一号只有一米来宽，飞得那么高，爷爷真的能用眼睛看见它吗？',
      dad: '其实爷爷看见的多半不是卫星本身！东方红一号直径只有约 1 米，在天上太暗，肉眼很难看见。科学家想出了“借箭显星”的妙招：和卫星一起入轨的末级火箭外面，裹了一圈镀铝的“观测裙”，入轨后撑开成一个反光的大球。',
    },
    {
      nian: '反光的大球？它有多大，为什么就能看见了？',
      dad: '它撑开后直径约 4 米，表面镀铝，像镜子一样把太阳光反射下来，亮得像天上的二三等亮星。火箭和卫星一前一后、相隔不远地飞，大家看见的那颗缓缓移动的亮星，其实是这颗大球，真正的卫星在它前面不远处“领路”。',
    },
    {
      nian: '真正的卫星在前面领路……它为什么能一直绕着地球飞，不掉下来？',
      dad: '它其实一直在往下掉！卫星横着飞得飞快，往下掉多少，地球的弧面就弯走多少，于是永远落不到地面。贴着地面附近要做到这一点，横着飞要达到每秒约 7.9 公里。东方红一号离地面最近 439 公里、最远 2384 公里，绕地球一圈要 114 分钟。',
      figure: { kind: 'sim', sim: 'orbit', caption: '把“打出去的速度”往上拖：慢了落回地面，够快就绕着地球转起来，变成一颗卫星。' },
    },
    {
      nian: '一圈要 114 分钟……那《东方红》的乐曲是怎么从天上传下来的？',
      dad: '靠看不见的无线电波！卫星上的电子乐音装置模仿铝板琴的声音，奏出《东方红》乐曲，再由一台小小的短波发射机，用 20.009 兆赫的频率发回地面。普通收音机收不到这么弱的信号，大型地面站收到后，再由中央人民广播电台转播，全世界就都听见了。',
    },
    {
      nian: '中央人民广播电台转播……当时是谁带着大家造出这颗卫星的？',
      dad: '这是成千上万人一起完成的。钱学森是中国空间技术研究院的第一任院长，研究院在 1968 年正式成立；38 岁的孙家栋被钱学森推荐，担任这颗卫星的技术总负责人。中国由此成为继苏联、美国、法国、日本之后，第五个独立研制并发射卫星的国家。',
    },
    {
      nian: '我明白了！大家看见的是末级火箭上撑开的反光“观测裙”，听见的是卫星用 20.009 兆赫的无线电波发回、再由电台转播的乐曲，卫星横着飞得够快，就一直绕着地球转。',
      dad: '说得一点没错！东方红一号早就停止了工作，可直到今天，它还在太空里绕着地球飞呢。',
    },
  ],
  tip: '东方红一号的轨道数据（近地点 439 公里、远地点 2384 公里、114 分钟一圈、20.009 兆赫）出自 1970 年的新华社公报，新华网和科普中国都有转载。想自己看人造卫星，可以用正规天文软件查国际空间站过境时间，天刚黑后的一两个小时最容易看到。',
  sources: [
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第4节 宇宙航行；九年级 · 第二十一章 信息的传递 · 电磁波的海洋', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '第一颗人造地球卫星：中国从此进入太空时代（轨道近地点 439 千米、远地点 2384 千米、114 分钟一圈、20.009 兆赫、第五个国家、至今仍在绕地飞行）', by: '新华网', url: 'https://www.xinhuanet.com/politics/2017-07/23/c_1121365570.htm' },
    { title: '【科普】东方红一号卫星（直径 1 米的 72 面体；末级火箭“观测裙”展开成直径 4 米的反光球，亮度约 2–3 等星）', by: '科普中国', url: 'https://www.kepuchina.cn/article/articleinfo?ar_id=434769&business_type=100' },
    { title: '宇宙高歌东方红（乐音装置模拟铝板琴、短波发射机发送，地面站接收后由中央人民广播电台转播）', by: '科普中国', url: 'https://www.kepuchina.cn/more/202106/t20210625_3003831.shtml' },
    { title: '今天，再忆五院首任院长钱学森（1968 年 2 月 20 日空间技术研究院正式成立）', by: '中国空间技术研究院', url: 'https://www.cast.cn/news/8346' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '卫星太暗了', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [1000, 520], color: NIGHT, from: 0 },
          { kind: 'shape', shape: 'circle', at: [460, 400], size: [24, 24], color: '#adb5bd', from: 0.5 },
          { kind: 'label', at: [460, 410], pos: [320, 580], text: '卫星：直径约1米', from: 1.2 },
          { kind: 'shape', shape: 'circle', at: [720, 420], size: [90, 90], color: SHINE, from: 4 },
          { kind: 'label', at: [740, 460], pos: [900, 600], text: '观测裙撑成大球', from: 5 },
          { kind: 'text', at: [600, 820], text: '借箭显星', from: 7 },
        ],
      },
      {
        turn: 1, title: '亮星其实是它', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [1000, 520], color: NIGHT, from: 0 },
          { kind: 'shape', shape: 'circle', at: [620, 420], size: [120, 120], color: SHINE, slide: { to: [860, 340], at: 1, over: 7 }, from: 0.3 },
          { kind: 'shape', shape: 'circle', at: [740, 380], size: [20, 20], color: '#adb5bd', slide: { to: [980, 300], at: 1, over: 7 }, from: 0.3 },
          { kind: 'count', at: [300, 300], label: '直径约', start: 0, end: 4, unit: '米', from: 1 },
          { kind: 'ray', path: [[200, 240], [620, 420], [520, 680]], color: '#ffd43b', draw: 1.2, from: 3 },
          { kind: 'text', at: [600, 820], text: '反射阳光，像颗亮星', from: 6 },
        ],
      },
      {
        turn: 2, title: '一直在往下掉', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 500], size: [360, 360], color: EARTH, text: '地球', from: 0.2 },
          { kind: 'flow', path: [[600, 250], [777, 323], [850, 500], [777, 677], [600, 750], [423, 677], [350, 500], [423, 323], [600, 250]], color: HOT, count: 3, loop: true, from: 1 },
          { kind: 'text', at: [970, 220], text: '每秒约7.9公里', from: 2.5 },
          { kind: 'count', at: [230, 230], label: '绕一圈', start: 0, end: 114, unit: '分钟', from: 4 },
          { kind: 'text', at: [600, 850], text: '掉多少，地面弯走多少', from: 7 },
        ],
      },
      {
        turn: 3, title: '乐曲从天而降', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🛰️', path: [[300, 280]], size: 110, from: 0.3 },
          { kind: 'wave', a: [380, 320], b: [820, 580], amplitude: 18, wavelength: 60, speed: 2, color: '#7048e8', from: 1 },
          { kind: 'text', at: [820, 300], text: '20.009兆赫', from: 2 },
          { kind: 'sprite', icon: '📻', path: [[900, 640]], size: 130, from: 3.5 },
          { kind: 'text', at: [600, 820], text: '地面站收到再转播', from: 6 },
        ],
      },
      {
        turn: 4, title: '第五个国家', duration: 10,
        cues: [
          { kind: 'count', at: [600, 300], label: '成为第', start: 0, end: 5, unit: '个', from: 0.5 },
          { kind: 'text', at: [600, 440], text: '钱学森：首任院长', from: 2 },
          { kind: 'text', at: [600, 520], text: '孙家栋：技术总负责', from: 3 },
          { kind: 'count', at: [600, 680], label: '研究院成立', start: 1960, end: 1968, unit: '年', from: 4.5 },
          { kind: 'text', at: [600, 820], text: '成千上万人一起完成', from: 7 },
        ],
      },
    ],
  },
};
