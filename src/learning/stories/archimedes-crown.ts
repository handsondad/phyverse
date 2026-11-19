import type { Story } from './types';

const GOLD = '#f2c94c';
const SILVER = '#ced4da';
const WATER = '#cfe5f7';
const BLUE = '#3553a6';
const HOT = '#e8590c';

export const archimedesCrown: Story = {
  slug: 'archimedes-crown',
  title: '不弄坏王冠，怎样查出金匠掺了银？',
  trigger: '小念在故事书里读到：国王怀疑金匠往金王冠里偷偷掺了银，命令阿基米德查清楚，却不许把王冠弄坏。她没翻到答案那一页，先跑来考爸爸。',
  dialogue: [
    {
      nian: '爸爸，王冠和国王给的金子一样重，看着也一样黄，怎么才能知道里面掺了银？',
      dad: '秘诀是比“个头”！同样重的金子和银子，银的个头要大得多：课本的密度表里，金每立方厘米约 19.3 克，银约 10.5 克。所以掺了银的王冠，虽然和纯金一样重，体积却会大一些。只要不弄坏王冠、又能比出体积，就能抓住金匠。',
      figure: {
        kind: 'bars',
        unit: '克每立方厘米',
        caption: '同样是 1 立方厘米：金比银重得多，水最轻（人教版八年级上册密度表）。',
        bars: [
          { label: '金', value: 19.3, hot: true, text: '19.3' },
          { label: '银', value: 10.5, text: '10.5' },
          { label: '水', value: 1, text: '1' },
        ],
      },
    },
    {
      nian: '比出体积？王冠弯弯曲曲的，又不能拿尺子量，怎么比？',
      dad: '流传最广的说法是：阿基米德泡进澡盆，看见水漫了出来，一下子想到可以把王冠放进装满水的盆里，看它挤出多少水。不过这个澡盆故事，是很久以后古罗马作家维特鲁威才写下的，细节未必是真的。',
    },
    {
      nian: '细节未必是真的？那量溢出来的水，到底哪里不对？',
      dad: '道理没错，可那点水实在太少了。1 千克的王冠，就算掺了三成银，也只比纯金块多挤出约 13 毫升水，盆沿一晃、水珠一挂，误差就比它还大。四百多年前，22 岁的伽利略专门写了一篇《小天平》，说阿基米德更可能用的是天平。',
    },
    {
      nian: '小天平？天平称的不是重量吗，怎么能比出体积？',
      dad: '妙就妙在把天平放进水里称！王冠挂一头，同样重的纯金块挂另一头，在空气里正好平衡。一起浸进水里，两样东西都被水往上托，体积越大托得越多。掺了银的王冠个头大，被托得更多，那一头就翘起来——一下就露馅了。',
      figure: { kind: 'sim', sim: 'crownBalance', caption: '先在空气里称，再把天平浸进水里；拖动掺银的比例，看王冠那头翘多高。' },
    },
    {
      nian: '往上托的力有多大，能算出来吗？',
      dad: '能！这就是阿基米德原理：浸在水里的东西受到的浮力，等于它排开的那部分水的重力。掺三成银的王冠体积约 65 立方厘米，纯金块约 52 立方厘米，王冠多排开约 13 克水，就被多托起约 13 克那么重。',
    },
    {
      nian: '我明白了！同样重的银比金个头大，掺了银的王冠排开的水多、受到的浮力大，把它和纯金块挂在天平两头一起放进水里，王冠那头翘起来，金匠就露馅了。',
      dad: '完全正确！不管当年阿基米德用的是澡盆还是天平，“体积大、浮力大”这条规律两千多年来都没变过，轮船和潜水艇也离不开它。',
    },
  ],
  tip: '在家可以这样试：用一根筷子做杠杆，两头分别挂同样重的一团橡皮泥和一个金属螺母，调到平衡后一起浸进一盆水里，体积大的橡皮泥那头会翘起来。金、银密度取自人教版八年级上册的密度表；“澡盆”故事出自古罗马维特鲁威的记载，未必是史实。',
  sources: [
    { title: '物理 八年级下册 · 第十章 浮力 · 第2节 阿基米德原理；八年级上册 · 第六章 质量与密度（常见物质的密度表）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Galileo Galilei, La bilancetta（伽利略认为阿基米德并非用维特鲁威说的溢水法，而是在水中称重识破王冠骗局）', by: '伽利略博物馆（Museo Galileo）', url: 'https://exhibits.museogalileo.it/archimedes/object/GalileoGalileiBilancettaOpereGalileoGalileiFacsimile.html' },
    { title: 'The Golden Crown: La Bilancetta（1586 年 22 岁的伽利略写下《小天平》，认为溢水法太粗糙）', by: 'Chris Rorres · Archimedes Home Page', url: 'https://math.nyu.edu/Archimedes/Crown/bilancetta.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '比一比个头', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 500], size: [110, 110], color: GOLD, text: '金', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [820, 480], size: [150, 150], color: SILVER, text: '银', from: 1.5 },
          { kind: 'label', at: [380, 445], pos: [380, 320], text: '每立方厘米19.3克', from: 2.6 },
          { kind: 'label', at: [820, 405], pos: [820, 290], text: '每立方厘米10.5克', from: 3.6 },
          { kind: 'text', at: [600, 820], text: '一样重，银的个头大', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '澡盆里的灵感', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🛁', path: [[460, 480]], size: 200, from: 0.3 },
          { kind: 'flow', path: [[540, 420], [640, 400], [720, 540]], color: '#4dabf7', count: 4, from: 1.5 },
          { kind: 'label', at: [640, 400], pos: [860, 300], text: '水漫出来了', from: 2.5 },
          { kind: 'myth', wrong: '阿基米德一定是靠澡盆破案', right: '澡盆故事是后人写的，未必真', from: 5.5 },
        ],
      },
      {
        turn: 2, title: '溢出的水太少', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [520, 180], color: WATER, from: 0.3 },
          { kind: 'count', at: [380, 320], label: '只多挤出约', start: 0, end: 13, unit: '毫升', from: 1 },
          { kind: 'text', at: [600, 820], text: '盆沿一晃就量不准', from: 3.5 },
          { kind: 'count', at: [840, 320], label: '伽利略那年', start: 0, end: 22, unit: '岁', from: 5.5 },
        ],
      },
      {
        turn: 3, title: '放进水里称', duration: 12,
        cues: [
          { kind: 'text', at: [600, 240], text: '空气里平衡，水里不平衡', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 600], size: [900, 220], color: WATER, from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [380, 560], size: [150, 64], color: '#e0c46b', text: '王冠', slide: { to: [380, 470], at: 5, over: 1.5 }, from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [820, 560], size: [100, 64], color: GOLD, text: '金块', slide: { to: [820, 630], at: 5, over: 1.5 }, from: 0.6 },
          { kind: 'arrow', path: [[380, 700], [380, 610]], color: BLUE, text: '托得多', from: 2.6 },
          { kind: 'arrow', path: [[820, 700], [820, 660]], color: BLUE, text: '托得少', from: 3.4 },
          { kind: 'text', at: [600, 820], text: '王冠一头翘起来！', from: 7 },
        ],
      },
      {
        turn: 4, title: '阿基米德原理', duration: 11,
        cues: [
          { kind: 'count', at: [360, 320], label: '王冠体积约', start: 0, end: 65, unit: '立方厘米', from: 0.5 },
          { kind: 'count', at: [840, 320], label: '金块体积约', start: 0, end: 52, unit: '立方厘米', from: 1.6 },
          { kind: 'arrow', path: [[460, 520], [740, 520]], color: HOT, text: '多排开13克水', from: 3.4 },
          { kind: 'text', at: [600, 820], text: '浮力等于排开的水重', from: 6 },
        ],
      },
    ],
  },
};
