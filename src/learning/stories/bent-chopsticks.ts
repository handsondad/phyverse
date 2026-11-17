import type { Story } from './types';

export const bentChopsticks: Story = {
  slug: 'bent-chopsticks',
  title: '筷子插进水里为什么像折断了？',
  trigger: '吃饭时，小念把筷子斜着插进一碗汤里，筷子在汤面那儿好像“咔嚓”折成了两段。拿出来一看，筷子好好的。',
  dialogue: [
    {
      nian: '爸爸，筷子插进水里，为什么在水面那儿好像断了？',
      dad: '筷子没断，是光拐了个弯。我们看见水里那截筷子，是因为它发出的光从水里跑到空气里，再进了眼睛。光从水里斜着进入空气时，传播方向会偏折一下，这叫光的折射。',
    },
    {
      nian: '光从水里斜着进入空气会偏折？那眼睛怎么就被骗了？',
      dad: '眼睛和大脑总以为光是沿直线走来的。光在水面拐了弯，眼睛顺着拐弯后的方向往回找，就觉得筷子尖在更高、更浅的地方。水下那截筷子看起来被抬高了，和水上那截对不齐，筷子就像在水面处折断了。',
      figure: { kind: 'sim', sim: 'refraction', caption: '换个角度看，换一换碗里装的东西：筷子尖实际在哪？看起来在哪？' },
    },
    {
      nian: '看起来被抬高了？那水里的东西是不是都比实际浅？',
      dad: '是的。从岸上看，池底被抬高了，池水看起来比实际浅。美国佐治亚州立大学的物理资料也写着：水下的东西看起来总比实际浅。所以看着只到腰的水，下去可能没过头顶。千万别凭眼睛判断水深，下水前要问清楚，还要有大人陪着。',
    },
    {
      nian: '池水比实际深……那光为什么一到水面就要拐弯？',
      dad: '因为光在水里跑得比在空气里慢，在水里的速度大约只有空气里的四分之三。就像一排同学手拉手，斜着从水泥地跑进沙地，先进沙地的人先慢下来，整排队伍就转了个方向。光从一种东西斜着进入另一种东西，速度一变，就拐弯了。',
    },
    {
      nian: '速度一变就拐弯？那正对着水面直直地往下看，筷子还会断吗？',
      dad: '正对着看，光是垂直穿过水面的，方向不变，筷子就不会“折”。不过从正上方看，水里的东西还是显得浅一些，大约只有实际深度的四分之三。斜着看得越厉害，光拐得越明显，筷子也“折”得越厉害。',
    },
    {
      nian: '我懂了！光从水里斜着跑到空气里会拐弯，这叫折射。眼睛顺着拐弯的光往回看，水里的筷子就被看浅了，像折断了一样。水比看起来深，不能大意。',
      dad: '说得好！在空碗底放一枚硬币，往后退到刚好看不见它，再请人往碗里慢慢倒水，看看硬币是不是“浮”出来了。',
    },
  ],
  tip: '互动图里水的折射率按 1.33、玻璃按 1.5 计算。游泳一定要去有救生员的正规泳池，不要去野外的河塘。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第4节 光的折射', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Refraction of Light by Water（“折断的铅笔”、水下物体看起来变浅）', by: 'HyperPhysics · Georgia State University', url: 'https://www.hyperphysics.gsu.edu/hbase/geoopt/refr2.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '筷子没断', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [360, 320], liquid: '#cfe5f7', level: 0.7, from: 0 },
          { kind: 'bond', a: [430, 250], b: [600, 456], color: '#c8955b', from: 0.4 },
          { kind: 'bond', a: [600, 456], b: [760, 520], color: '#c8955b', from: 0.4 },
          { kind: 'label', at: [600, 456], pos: [880, 280], text: '像折断了', from: 1.4 },
          { kind: 'text', at: [600, 830], text: '其实是光拐了弯', from: 7 },
        ],
      },
      {
        turn: 1, title: '眼睛被骗了', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 520], size: [360, 320], liquid: '#cfe5f7', level: 0.7, from: 0 },
          { kind: 'shape', shape: 'circle', at: [700, 640], size: [26, 26], color: '#c8955b', from: 0.4 },
          { kind: 'ray', path: [[700, 640], [620, 456], [360, 250]], color: '#f5b800', draw: 1.4, from: 1 },
          { kind: 'sprite', icon: '👁️', path: [[330, 230]], size: 90, from: 0.4 },
          { kind: 'label', at: [700, 640], pos: [940, 700], text: '筷子尖其实在这', from: 3 },
          { kind: 'shape', shape: 'circle', at: [700, 519], size: [26, 26], color: '#c8955b', outline: true, from: 4 },
          { kind: 'label', at: [700, 519], pos: [960, 440], text: '看起来在这', from: 4.4 },
          { kind: 'text', at: [600, 830], text: '顺着光往回看，看浅了', from: 7 },
        ],
      },
      {
        turn: 2, title: '水比看着深', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [560, 500], size: [760, 320], color: '#cfe5f7', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[200, 280]], size: 130, from: 0 },
          { kind: 'arrow', path: [[990, 340], [990, 500]], color: '#3553a6', text: '看着浅', draw: 1, from: 1.5 },
          { kind: 'arrow', path: [[1150, 340], [1150, 660]], color: '#e8590c', text: '其实深', draw: 1, from: 3.2 },
          { kind: 'myth', wrong: '看着浅的水就很浅', right: '水比看起来要深', from: 7 },
        ],
      },
      {
        turn: 3, title: '变慢就拐弯', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 500], size: [540, 400], color: '#e9e4da', text: '水泥地', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 500], size: [540, 400], color: '#f3dfb0', text: '沙地', from: 0 },
          { kind: 'sprite', icon: '🏃', path: [[180, 320], [600, 520], [1020, 640]], size: 90, travel: 6, from: 1 },
          { kind: 'text', at: [600, 830], text: '速度一变，就拐弯', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '正着看不折', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'beaker', at: [600, 540], size: [360, 300], liquid: '#cfe5f7', level: 0.7, from: 0 },
          { kind: 'ray', path: [[600, 650], [600, 230]], color: '#f5b800', draw: 1, from: 1 },
          { kind: 'sprite', icon: '👁️', path: [[600, 190]], size: 80, from: 0.4 },
          { kind: 'label', at: [600, 400], pos: [860, 330], text: '方向不变', from: 2.4 },
          { kind: 'text', at: [600, 830], text: '斜得越厉害，折得越狠', from: 7 },
        ],
      },
    ],
  },
};
