import type { Story } from './types';

const FILM = '#212529';
const BONE = '#f1f3f5';
const FLESH = '#5c5f66';
const XRAY = '#9775fa';

export const xRay: Story = {
  slug: 'x-ray',
  title: '医院的 X 光为什么能透过身体看到骨头？',
  trigger: '小念打篮球时扭了手腕，医生让她去拍个 X 光片。片子挂在灯箱上，手骨白白的一根根，肉却只剩一层淡淡的灰影。',
  dialogue: [
    {
      nian: '爸爸，X 光怎么能穿过我的手，只拍出骨头来？',
      dad: 'X 光和手电筒的光其实是亲戚，都是电磁波，只是 X 光的能量高得多，能穿过身体的大部分地方。美国国立卫生研究院的科普说，身体各处挡 X 光的本事不一样：骨头里有钙，挡住的 X 光多，片子上就白；肌肉、脂肪挡得少，只留下灰影；肺里是空气，就更黑。',
      figure: { kind: 'sim', sim: 'xray', caption: '先用手电筒照，再换成 X 光，最后戴上戒指：屏上的影子有什么不同？' },
    },
    {
      nian: '骨头里有钙……为什么有钙就挡得多？',
      dad: '钙原子比身体里多数的碳、氢、氧原子“个头”大，原子核里的质子多，外面的电子也多，X 光从它旁边过，更容易被吸收掉。骨头又结实又密，挡得就更多了。所以拍片前医生会让你摘掉项链、戒指，金属挡 X 光更厉害，会在片子上留下一大块白。',
    },
    {
      nian: '金属挡 X 光更厉害……X 光是谁发现的？',
      dad: '一百三十多年前，1895 年，德国物理学家伦琴在做实验时，发现旁边的荧光屏莫名其妙地亮了起来，原来是一种看不见、穿透力很强的射线。他不知道这是什么，就叫它 X 射线。他也因此在 1901 年得了第一届诺贝尔物理学奖。',
    },
    {
      nian: '穿透力很强的射线……那拍 X 光对身体有害吗？',
      dad: 'X 光能量高，能伤到细胞里的 DNA，所以确实有一点风险，拍得越多，风险越大。美国食品药品监督管理局说，医生认为需要时拍一次，好处远远大于这点风险，但不需要的就别拍。拍片时还常给不拍的部位盖上铅做的围裙，挡住多余的 X 光。',
    },
    {
      nian: '挡住多余的 X 光……那手机信号、微波也会这样伤人吗？',
      dad: '不一样。美国食品药品监督管理局解释过，无线电波、微波和可见光的能量比较低，打不掉原子里的电子；X 光能量高，能把电子从原子里打出来，这才会伤到细胞。同样是电磁波，能量高低差别很大。很多人以为 X 光就是普通的光，其实它的能量要高得多。',
    },
    {
      nian: '我明白了！X 光也是电磁波，能量比可见光高得多，能穿过肌肉和脂肪；骨头里有钙，挡得多，片子上就白。X 光有一点风险，所以只在需要时拍。',
      dad: '说得对！晚上用手电筒紧贴着手指照一照，你会看到手指边上透出一圈红光：可见光也能钻进皮肤一点点，只是穿不透骨头和肉。',
    },
  ],
  tip: '用手电筒照手指时别对着眼睛照。拍 X 光要听医生的安排，不要因为好奇去拍。互动图和动画里的手骨只是示意。',
  sources: [
    { title: '物理 选择性必修 第二册 · 第四章 电磁振荡与电磁波 · 电磁波谱（X 射线用于医学透视）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'X-ray Fact Sheet（X 光能量比可见光高，能穿过身体；骨头含钙，原子序数高，吸收 X 光多所以发白；脂肪、肌肉、肺是灰到黑）', by: 'NIBIB · U.S. National Institutes of Health（美国国立卫生研究院）', url: 'https://www.nibib.nih.gov/sites/default/files/X-ray_Fact_Sheet.pdf' },
    { title: 'Wilhelm Conrad Röntgen – Facts（1895 年发现 X 射线，获 1901 年诺贝尔物理学奖）', by: 'NobelPrize.org（诺贝尔奖官网）', url: 'https://www.nobelprize.org/prizes/physics/1901/rontgen/facts/' },
    { title: 'Medical X-ray Imaging（X 光属于电离辐射，可能损伤 DNA；医学上需要时，好处远大于风险，应尽量少照）', by: 'U.S. FDA（美国食品药品监督管理局）', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/medical-x-ray-imaging' },
    { title: 'Microwave Ovens（可见光、微波和无线电波属于非电离辐射，能量不足以把电子打出原子）', by: 'U.S. FDA（美国食品药品监督管理局）', url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-oven-radiation' },
    { title: 'Physics for Future Presidents · Ch. 4 Nuclei and Radioactivity（拍牙片时用铅围裙挡住散射的 X 光）', by: 'Richard A. Muller · 加州大学伯克利分校', url: 'https://muller.lbl.gov/teaching/Physics10/PffP_textbook/PffP-04-radioactivity-5-27.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '骨头白，肉淡', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [520, 580], color: FILM, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [300, 320], color: FLESH, from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [530, 430], size: [40, 240], color: BONE, from: 1.5 },
          { kind: 'shape', shape: 'pill', at: [600, 410], size: [40, 270], color: BONE, from: 1.8 },
          { kind: 'shape', shape: 'pill', at: [670, 430], size: [40, 240], color: BONE, from: 2.1 },
          { kind: 'label', at: [670, 400], pos: [980, 260], text: '骨头：白', from: 3 },
          { kind: 'label', at: [720, 620], pos: [980, 640], text: '肌肉：淡灰', from: 4 },
          { kind: 'text', at: [600, 830], text: 'X 光穿过了身体', from: 7.5 },
        ],
      },
      {
        turn: 1, title: '钙挡得多', duration: 12,
        cues: [
          { kind: 'atom', path: [[380, 470]], symbol: 'Ca', color: BONE, r: 70, from: 0 },
          { kind: 'atom', path: [[820, 470]], symbol: 'C', color: '#ced4da', r: 36, from: 0.5 },
          { kind: 'arrow', path: [[120, 470], [290, 470]], color: XRAY, text: '被挡住', draw: 0.5, from: 1.5 },
          { kind: 'arrow', path: [[620, 400], [1080, 400]], color: XRAY, text: '穿过去', draw: 0.6, from: 3 },
          { kind: 'text', at: [600, 830], text: '拍片前摘掉金属', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '伦琴的发现', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 470], size: [240, 100], color: '#adb5bd', text: '放电管', from: 0 },
          { kind: 'shape', shape: 'rect', at: [880, 470], size: [40, 320], color: '#e9ecef', tint: { color: '#94d82d', at: 3, over: 1 }, from: 0.5 },
          { kind: 'flow', path: [[460, 470], [850, 470]], color: XRAY, count: 5, speed: 240, from: 2.5 },
          { kind: 'label', at: [880, 330], pos: [1000, 220], text: '荧光屏亮了', from: 3.5 },
          { kind: 'count', at: [600, 250], label: '发现于', start: 1800, end: 1895, unit: '年', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '叫它 X 射线', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '需要时才拍', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧑', path: [[640, 420]], size: 230, from: 0 },
          { kind: 'shape', shape: 'rect', at: [640, 620], size: [220, 170], color: '#495057', text: '铅围裙', from: 1.5 },
          { kind: 'arrow', path: [[180, 620], [510, 620]], color: XRAY, text: '多余的 X 光', draw: 0.6, from: 3 },
          { kind: 'text', at: [600, 830], text: '需要时才拍，尽量少拍', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '能量高低不一样', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [280, 330], size: [200, 70], color: '#b197fc', text: '微波', from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 330], size: [200, 70], color: '#ffd43b', text: '可见光', from: 0.5 },
          { kind: 'shape', shape: 'pill', at: [920, 330], size: [200, 70], color: '#adb5bd', text: 'X 光', from: 1 },
          { kind: 'meter', at: [280, 500], label: '能量', start: 0, end: 0.08, color: XRAY, from: 2 },
          { kind: 'meter', at: [600, 500], label: '能量', start: 0, end: 0.25, color: '#f59f00', from: 2.5 },
          { kind: 'meter', at: [920, 500], label: '能量', start: 0, end: 1, color: '#e03131', from: 3 },
          { kind: 'myth', wrong: 'X 光就是普通的光', right: '能量高得多，能伤细胞', from: 7 },
        ],
      },
    ],
  },
};
