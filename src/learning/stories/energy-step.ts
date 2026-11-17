import type { Story } from './types';

export const energyStep: Story = {
  slug: 'energy-step',
  title: '从滑梯上滑下来，屁股为什么会发热？',
  trigger: '公园里，小念从高高的滑梯上“嗖”地滑下来，一站起来就捂着屁股喊：好烫好烫！',
  dialogue: [
    {
      nian: '爸爸，我滑下来屁股热乎乎的，是滑梯被太阳晒热了吗？',
      dad: '晒热是一个原因，可就算在阴天，滑得快了也会觉得热。那是摩擦生的热：你的裤子在滑梯上一路蹭下来，就像冬天搓手一样，搓得越快越用力，热得越明显。你从高处出发带着的能量，有一部分就在这一路上变成了热。',
    },
    {
      nian: '高处带着的能量变成了热？那要是滑梯一点摩擦都没有呢？',
      dad: '那高度会全部换成速度。从 2 米高滑下来，到底下大约每秒 6.3 米，差不多是骑自行车的速度。真实的塑料滑梯有摩擦，你到底下只有每秒 5 米多一点。少掉的那份速度，就是变成热的那份能量。',
      figure: { kind: 'sim', sim: 'chute', caption: '拖动滑梯的高度，换一换滑梯表面：滑到底的速度差了多少？“变成热”那根条有多长？' },
    },
    {
      nian: '少掉的那份速度……科学家是怎么证明没有摩擦时高度能全换成速度的？',
      dad: '高中实验室里，让一个重物拖着纸带竖直往下落，打点计时器每 0.02 秒在纸带上打一个点。用尺子量出它下落的高度，算出减少的势能；再用相邻几个点算出它的速度，算出增加的动能。两个数算出来几乎一样大。',
      eq: '减少的势能 mgh ≈ 增加的动能 ½mv²',
      show: { kind: 'lab', step: 3, label: '看「量 h 算 v」' },
    },
    {
      nian: '两个数几乎一样大？为什么不是正好一样大呢？',
      dad: '因为纸带穿过打点计时器时有摩擦，重物往下落还要推开空气，这两样都会偷走一点能量。所以量出来的动能总比势能少一点点。反过来，要是算出来动能比势能还大，那一定是量错了或者算错了，得回头查一查。',
      show: { kind: 'lab', step: 6, label: '看「误差」' },
    },
    {
      nian: '量错了得回头查？那做这个实验最容易错在哪一步？',
      dad: '最容易错的是顺序：必须先接通电源，让计时器打起点来，再松手放重物。要是先松手后通电，纸带开头一段就成了白纸，最开始下落的那段高度量不到，后面所有的高度就都算错了。',
      show: { kind: 'lab', step: 1, label: '看「先通电后释放」' },
    },
    {
      nian: '我明白了！没有摩擦时，下落高度减少的势能正好全部变成动能，这叫机械能守恒；滑梯有摩擦，一部分能量变成了热，所以屁股会发热，滑到底也没那么快。',
      dad: '说得对！想亲手验证一下，就去「3D 实验台」做这个落体实验：先通电、再松手，量一量纸带上的点，看势能和动能差多少。',
    },
  ],
  tip: '文中的速度按滑梯倾角 35°、塑料滑梯摩擦系数约 0.2 估算，只是大约的数。夏天的金属滑梯和深色塑料滑梯被太阳晒过会很烫，玩之前先用手背摸一摸；国家标准《小型游乐设施 滑梯》（GB/T 27689—2025）也要求滑梯在使用中不能有烫伤的危险。',
  sources: [
    { title: '物理 必修 第二册 · 第八章 机械能守恒定律 · 第5节 实验：验证机械能守恒定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '小型游乐设施 滑梯（GB/T 27689—2025）', by: '国家市场监督管理总局 · 全国标准信息公共服务平台', url: 'https://std.samr.gov.cn/gb/search/gbDetailed?id=3DBA213286C80D16E06397BE0A0A8119' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '摩擦生热', duration: 11,
        cues: [
          { kind: 'bond', a: [200, 260], b: [900, 760], color: '#e8590c', from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[240, 240]], size: 80, from: 0, to: 1 },
          { kind: 'sprite', icon: '🧒', path: [[240, 240], [880, 700]], size: 80, travel: 4, from: 1 },
          { kind: 'particles', box: [560, 470, 300, 120], count: 12, color: '#e8590c', motion: 'rise', from: 2.4 },
          { kind: 'label', at: [560, 520], pos: [900, 400], text: '一路蹭出热', from: 3 },
          { kind: 'text', at: [450, 840], text: '高度的能量，一部分变成了热', from: 6.6 },
        ],
      },
      {
        turn: 1, title: '少掉的速度', duration: 12,
        cues: [
          { kind: 'count', at: [330, 300], label: '没有摩擦', start: 0, end: 6.3, unit: '米/秒', from: 0.8 },
          { kind: 'count', at: [870, 300], label: '塑料滑梯', start: 0, end: 5, unit: '米/秒', from: 2.6 },
          { kind: 'meter', at: [600, 520], label: '变成热', start: 0, end: 0.3, color: '#b03f38', from: 5, over: 2 },
          { kind: 'text', at: [600, 760], text: '少掉的速度变成了热', from: 7.6 },
        ],
      },
      {
        turn: 2, title: '纸带上的点', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 220], size: [140, 90], color: '#9cc7e8', text: '计时器', from: 0 },
          { kind: 'shape', shape: 'rect', at: [300, 470], size: [26, 420], color: '#f6ecd4', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [300, 300], size: [100, 90], color: '#7d8790', text: '重物', slide: { to: [300, 700], at: 1, over: 3 }, from: 0.3 },
          { kind: 'atom', path: [[300, 330]], symbol: '', color: '#5d4e37', r: 8, from: 2 },
          { kind: 'atom', path: [[300, 390]], symbol: '', color: '#5d4e37', r: 8, from: 2.6 },
          { kind: 'atom', path: [[300, 480]], symbol: '', color: '#5d4e37', r: 8, from: 3.2 },
          { kind: 'formula', at: [800, 400], text: 'mgh ≈ ½mv²', from: 4.6 },
          { kind: 'text', at: [800, 560], text: '每 0.02 秒打一个点', from: 5.6 },
        ],
      },
      {
        turn: 3, title: '为什么差一点', duration: 11,
        cues: [
          { kind: 'meter', at: [600, 300], label: '减少的势能', start: 0, end: 0.85, color: '#3553a6', from: 0.6, over: 2 },
          { kind: 'meter', at: [600, 430], label: '增加的动能', start: 0, end: 0.8, color: '#e8590c', from: 2, over: 2 },
          { kind: 'shape', shape: 'pill', at: [380, 600], size: [300, 90], color: '#ffd166', text: '纸带摩擦', from: 4.4 },
          { kind: 'shape', shape: 'pill', at: [820, 600], size: [300, 90], color: '#ffd166', text: '推开空气', from: 5 },
          { kind: 'text', at: [600, 790], text: '动能总少一点点', from: 7 },
        ],
      },
      {
        turn: 4, title: '先通电再松手', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 340], size: [300, 100], color: '#9cc7e8', text: '① 接通电源', from: 0.6 },
          { kind: 'arrow', path: [[500, 340], [690, 340]], color: '#5d4e37', from: 1.4 },
          { kind: 'shape', shape: 'pill', at: [870, 340], size: [300, 100], color: '#ffd166', text: '② 松手', from: 2 },
          { kind: 'myth', wrong: '先松手，再接电源', right: '先接电源，再松手', from: 5 },
        ],
      },
    ],
  },
};
