import type { Story } from './types';

export const brownianStep: Story = {
  slug: 'brownian-step',
  title: '一滴墨水滴进水里，不搅为什么也会散开？',
  trigger: '小念写毛笔字，一滴墨不小心掉进了洗笔的清水杯里。谁也没去搅，过了一会儿，整杯水都变成了淡淡的灰色。',
  dialogue: [
    {
      nian: '爸爸，没人搅它，墨水自己怎么散开的？',
      dad: '有“人”在搅，只是你看不见：水是由数不清的水分子组成的，它们一刻不停地乱撞。墨水里的小颗粒被水分子从四面八方撞来撞去，一点点从浓的地方跑到淡的地方，最后整杯都匀了。这种现象叫扩散。',
    },
    {
      nian: '水分子一直在乱撞？那水越热，扩散会不会越快？',
      dad: '会！温度越高，水分子跑得越快，撞得越猛，墨水散开得也越快。泡茶也是这样：开水一冲，茶色很快就泡出来了；用凉水泡，要等好久才有一点颜色。',
      figure: { kind: 'sim', sim: 'diffuse', caption: '把杯子里的水换成冷水、温水和热水，看墨水散开的快慢；再放大看一颗墨粒怎么走。' },
      show: { kind: 'lab', step: 4, label: '看「温度越高越剧烈」' },
    },
    {
      nian: '水分子小得看不见，怎么知道它们真的在乱撞呢？',
      dad: '差不多两百年前，英国植物学家布朗用显微镜看水里的小颗粒，那是从花粉里出来的细小微粒。他发现它们一直在不停地乱晃，一会儿往东，一会儿往西，没有一刻停下来。后来人们才明白：那是水分子从各个方向撞它们，撞得不均匀，微粒就被推得乱跑。人们把它叫布朗运动。',
      show: { kind: 'lab', step: 5, label: '看「撞出来的」' },
    },
    {
      nian: '布朗运动是水分子撞出来的？可是有谁真的证明过吗？',
      dad: '爱因斯坦先用数学算出：如果真有分子在撞，微粒乱跑的距离应该怎样随时间变大。法国科学家佩兰就照着做实验，在显微镜下每隔一段时间记下微粒的位置，结果跟爱因斯坦算的对上了。佩兰因此得了 1926 年的诺贝尔物理学奖，大家从此确信分子是真实存在的。',
    },
    {
      nian: '在显微镜下记微粒的位置？那是不是什么颗粒都能看到乱跑？',
      dad: '不是。颗粒太大，四面八方的撞击差不多抵消了，它几乎一动不动；颗粒越小，撞得越不均匀，乱跑得越明显。温度越高，也越明显。所以布朗看的是很细小的微粒，换成一粒沙子就看不出来了。',
      show: { kind: 'lab', step: 3, label: '看「微粒越小越明显」' },
    },
    {
      nian: '我明白了！墨水散开是因为水分子一直在乱撞，这叫扩散；水越热，撞得越猛，散得越快。布朗运动是小微粒被水分子撞得乱跑，微粒越小、温度越高越明显。',
      dad: '说得对！想亲眼看看微粒怎么乱跑，就去「3D 实验台」做布朗运动实验：每隔 30 秒点一个位置，连起来看看它的路线。',
    },
  ],
  tip: '布朗看到的不是花粉粒本身，而是从花粉里出来的更细小的微粒，所以文中说“从花粉里出来的细小微粒”。布朗运动不是分子本身的运动，而是悬浮的微粒被分子撞出来的运动。互动图里扩散的快慢按温度做了示意。',
  sources: [
    { title: '物理 选择性必修 第三册 · 第一章 分子动理论 · 第1节 分子动理论的基本内容', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Jean Baptiste Perrin – Facts（1926 年诺贝尔物理学奖）', by: 'NobelPrize.org', url: 'https://www.nobelprize.org/prizes/physics/1926/perrin/facts/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '墨水自己散开', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 500], size: [420, 460], color: '#eaf4fb', outline: true, from: 0 },
          { kind: 'particles', box: [560, 340, 80, 80], count: 30, color: '#2f3640', motion: 'jitter', from: 0.5, to: 4.5 },
          { kind: 'particles', box: [410, 290, 380, 420], count: 30, color: '#2f3640', motion: 'jitter', from: 4.5 },
          { kind: 'label', at: [720, 500], pos: [960, 300], text: '没人搅也会匀', from: 5.2 },
          { kind: 'text', at: [600, 820], text: '这叫扩散', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '热水散得快', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 500], size: [320, 380], color: '#eaf4fb', text: '冷水', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 500], size: [320, 380], color: '#fdebe0', text: '热水', from: 0 },
          { kind: 'particles', box: [270, 360, 120, 120], count: 22, color: '#2f3640', motion: 'jitter', from: 1 },
          { kind: 'particles', box: [725, 325, 290, 350], count: 22, color: '#2f3640', motion: 'gas', from: 1 },
          { kind: 'text', at: [600, 820], text: '温度越高，撞得越猛', from: 5.5 },
        ],
      },
      {
        turn: 2, title: '显微镜下乱晃', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 470], size: [440, 440], color: '#f4fbff', outline: true, from: 0 },
          { kind: 'particles', box: [450, 320, 300, 300], count: 26, color: '#8fb8d8', motion: 'gas', from: 0.5 },
          { kind: 'sprite', icon: '🟤', path: [[600, 470], [560, 430], [640, 420], [610, 520], [540, 500]], size: 60, travel: 6, wobble: true, from: 1 },
          { kind: 'label', at: [620, 470], pos: [960, 300], text: '细小微粒', from: 2 },
          { kind: 'text', at: [600, 820], text: '水分子撞得不均匀', from: 7 },
        ],
      },
      {
        turn: 3, title: '佩兰的证明', duration: 12,
        cues: [
          { kind: 'arrow', path: [[400, 520], [480, 430], [560, 500], [660, 410], [760, 470]], color: '#3553a6', draw: 4, from: 0.5 },
          { kind: 'label', at: [580, 470], pos: [580, 640], text: '记下的位置连起来', from: 2 },
          { kind: 'text', at: [600, 250], text: '1926 年诺贝尔物理学奖', size: 'l', from: 5 },
          { kind: 'text', at: [600, 820], text: '分子是真实存在的', from: 8 },
        ],
      },
      {
        turn: 4, title: '越小越明显', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [330, 470], size: [180, 180], color: '#c79a63', text: '沙子', from: 0 },
          { kind: 'shape', shape: 'circle', at: [870, 470], size: [40, 40], color: '#5a4636', motion: 'wiggle', from: 0 },
          { kind: 'particles', box: [170, 310, 320, 320], count: 20, color: '#8fb8d8', motion: 'gas', from: 0.5 },
          { kind: 'particles', box: [770, 370, 200, 200], count: 12, color: '#8fb8d8', motion: 'gas', from: 0.5 },
          { kind: 'label', at: [870, 450], pos: [930, 260], text: '小微粒乱跑', from: 2 },
          { kind: 'text', at: [600, 820], text: '颗粒越小，晃得越明显', from: 6 },
        ],
      },
    ],
  },
};
