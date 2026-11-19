import type { Story } from './types';

const SPACE = '#141b2d';
const GOLD = '#ffb703';
const RING = '#ff922b';

export const blackHole: Story = {
  slug: 'black-hole',
  title: '黑洞为什么连光都逃不出来？它会像吸尘器一样把地球吸进去吗？',
  trigger: '小念在天文画册上看到一张暗黑中心围着一圈橙金色亮环的照片，图注写着“人类首张黑洞照片”，她担心地问爸爸太阳系会不会也被黑洞吸走。',
  dialogue: [
    {
      nian: '爸爸，黑洞是不是宇宙里到处乱吸的大吸尘器？它会把地球吸进去吗？',
      dad: '别怕，黑洞可不是到处乱吸的吸尘器！很多人都有这个误会，美国航天局专门算过一笔账：假如现在有一根魔法棒，把太阳突然变成一个同样质量的黑洞，地球既不会被吸进去，也不会飞走，还会照着原来的轨道、原来的速度，稳稳当当一年绕它转一圈——只是没有阳光，地球会变得又黑又冷。',
    },
    {
      nian: '还会照着原来的轨道转？黑洞的引力不是超级大吗？',
      dad: '引力有多大，只看天体一共有多重，还有你离它的中心有多远。太阳变成同样重的黑洞，总质量一分没多，地球离它的中心还是 1.5 亿公里，所以地球感受到的引力跟以前一模一样！真正可怕的变化发生在中心附近：原本半径约 70 万公里的太阳，全部物质被压进了半径只有约 3 公里的小小范围里，你就能凑到离中心极近极近的地方了。',
      figure: { kind: 'sim', sim: 'blackHole', caption: '把太阳换成同样质量的白矮星和黑洞：先看左边地球轨道变没变，再去右边离中心 30 公里和 3 公里内测逃逸速度！' },
    },
    {
      nian: '半径只有约 3 公里……凑到那么近的地方，为什么连光都逃不出来？',
      dad: '这要看“逃逸速度”。在地球表面，火箭每秒飞大约 11.2 公里就能挣脱地球引力；天体压得越紧实、你离中心越近，想挣脱它需要的速度就越快。等到跨进那条半径约 3 公里的边界，逃出去所需的速度超过了每秒 30 万公里的光速！宇宙里没有任何东西跑得过光，所以一旦跨过这条线，连光也有去无回，这条边界就叫事件视界。',
    },
    {
      nian: '事件视界……既然黑洞本身一点光都不放出来，画册上那张照片是怎么拍到的？',
      dad: '拍到的不是黑洞自己发光，而是它周围的亮环衬托出来的“黑影”！2019 年，全球科学家把八台射电望远镜连成一台地球那么大的“事件视界望远镜”，拍下了距离我们 5500 万光年的室女座星系中心超大质量黑洞。黑洞外围还没掉进去的气体旋转摩擦，热得发出强光，强引力又把光线弯成一圈亮环，正中间那团黑影就是光逃不出来的区域。',
      figure: {
        kind: 'image',
        src: '/images/photos/black-hole-m87-eht.webp',
        alt: '事件视界望远镜拍到的室女座 M87 星系中心超大质量黑洞：漆黑背景中央是一团圆形暗影，外围环绕着不对称的橙金色亮环',
        caption: '2019 年事件视界望远镜发布的室女座星系中心黑洞照片：亮环是外围炙热气体被强引力弯曲的光，中间暗区是黑洞阴影。',
        credit: 'EHT Collaboration · CC BY 4.0',
        href: 'https://www.eso.org/public/images/eso1907a/',
      },
    },
    {
      nian: '中间暗区是黑洞阴影……那我们头顶的太阳，将来老了也会变成黑洞吗？',
      dad: '不会的，太阳的个头还差得远呢！科学家发现，恒星老了以后只有质量比太阳大许多倍的大块头，核心坍缩时才压得出黑洞；像太阳这样中等个头的恒星，大约 50 亿年后只会安安静静缩成一颗地球大小的白矮星。而且离地球最近的已知黑洞也在上千光年之外，根本威胁不到我们。',
    },
    {
      nian: '我懂了！黑洞不是到处乱吸的吸尘器，离远了它的引力和同样重的恒星一样；只有跨进极近的事件视界，逃逸速度超过每秒 30 万公里的光速，连光才逃不出来。',
      dad: '讲得太清楚了！一百多年前爱因斯坦刚写出广义相对论时，人们还不敢相信宇宙里真有这么奇妙的天体，如今科学家已经亲眼拍到它的影子啦。',
    },
  ],
  tip: '太阳质量黑洞的视界半径（史瓦西半径）由 r = 2GM/c² 算出约为 2.95 公里；照片中的 M87 星系中心超大质量黑洞质量约为太阳的 65 亿倍，阴影直径比整个太阳系还大，但因远在约 5500 万光年外，在地球上看去角直径仅相当于看月球上的一张银行卡。',
  sources: [
    { title: '物理 必修 第二册 · 第七章 万有引力与宇宙航行 · 第4节 宇宙航行；第5节 相对论时空观与牛顿力学的局限性（黑洞与事件视界）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Black Holes & Anatomy of a Black Hole（把太阳换成同质量黑洞行星轨道不变；事件视界逃逸速度达到光速；吸积盘与黑洞阴影）', by: 'NASA Science', url: 'https://science.nasa.gov/universe/black-holes/anatomy/' },
    { title: 'First Image of a Black Hole（M87 星系中心黑洞首张照片观测原理、5500 万光年距离与 65 亿倍太阳质量）', by: '欧洲南方天文台（ESO）/ EHT Collaboration', url: 'https://www.eso.org/public/images/eso1907a/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是大吸尘器', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 420], size: [960, 420], color: SPACE, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 420], size: [80, 80], color: GOLD, tint: { color: '#05070e', at: 2.5, over: 1.5 }, from: 0.4 },
          { kind: 'sprite', icon: '🌍', path: [[820, 420], [600, 240], [380, 420], [600, 600], [820, 420]], size: 76, travel: 7, from: 0.5 },
          { kind: 'myth', wrong: '黑洞像吸尘器把远处行星吸走', right: '质量不变，地球照原样绕圈转', from: 6 },
        ],
      },
      {
        turn: 1, title: '压进3公里里', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 440], size: [280, 280], color: GOLD, text: '太阳', from: 0.3 },
          { kind: 'count', at: [340, 230], label: '太阳半径约', start: 0, end: 70, unit: '万公里', from: 1 },
          { kind: 'arrow', path: [[520, 440], [720, 440]], color: RING, text: '质量不变', from: 2.2 },
          { kind: 'shape', shape: 'circle', at: [860, 440], size: [44, 44], color: '#05070e', from: 2.8 },
          { kind: 'count', at: [860, 230], label: '压成黑洞约', start: 70, end: 3, unit: '公里', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '全部质量挤进极小的空间', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '有去无回的线', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [960, 420], color: SPACE, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [200, 200], color: RING, outline: true, from: 0.5 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [120, 120], color: '#05070e', text: '视界', from: 0.5 },
          { kind: 'count', at: [310, 300], label: '光速每秒', start: 0, end: 30, unit: '万公里', from: 1.4 },
          { kind: 'ray', path: [[640, 410], [690, 370], [620, 430]], color: GOLD, draw: 1.4, from: 2.8 },
          { kind: 'label', at: [700, 440], pos: [920, 520], text: '事件视界：光也折回', from: 3.8 },
          { kind: 'text', at: [600, 810], text: '逃逸速度超光速，连光也逃不掉', from: 7 },
        ],
      },
      {
        turn: 3, title: '亮环衬出黑影', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [920, 420], color: SPACE, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [280, 280], color: RING, from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [600, 440], size: [150, 150], color: '#05070e', from: 1 },
          { kind: 'count', at: [280, 290], label: '远在约', start: 0, end: 5500, unit: '万光年', from: 1.8 },
          { kind: 'label', at: [730, 380], pos: [950, 320], text: '炙热气体发出的光环', from: 3 },
          { kind: 'text', at: [600, 810], text: '八台望远镜联手拍下黑洞阴影', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '太阳变白矮星', duration: 10,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[320, 440]], size: 150, from: 0.4 },
          { kind: 'arrow', path: [[440, 440], [720, 440]], color: GOLD, text: '约50亿年后', from: 1.6 },
          { kind: 'shape', shape: 'circle', at: [840, 440], size: [74, 74], color: '#e7f5ff', text: '白矮星', from: 2.6 },
          { kind: 'label', at: [840, 520], pos: [840, 660], text: '质量不够压成黑洞', from: 3.4 },
          { kind: 'text', at: [600, 810], text: '太阳老了不会变成黑洞', from: 6 },
        ],
      },
    ],
  },
};
