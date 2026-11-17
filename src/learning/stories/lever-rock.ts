import type { Story } from './types';

export const leverRock: Story = {
  slug: 'lever-rock',
  title: '一根棍子为什么能撬动大石头？',
  trigger: '工地旁边，一位师傅把长铁棍的一头塞到大石头底下，垫上一块砖，在另一头往下一压，几百斤重的石头就慢慢翘了起来。',
  dialogue: [
    {
      nian: '爸爸，那块石头那么重，师傅一个人怎么一压就翘起来了？',
      dad: '秘密在那根铁棍和底下那块砖。铁棍架在砖上，就成了杠杆，砖就是支点。石头离支点很近，师傅的手离支点很远，手上往下压一点力，传到石头那头就变成了很大的力。跷跷板、开瓶器也都是杠杆。',
    },
    {
      nian: '手离支点很远，力就会变大？那到底能大多少呢？',
      dad: '有一条规矩：力乘上它离支点的距离，两边要一样大。这段到支点的距离叫力臂。比如石头重 800 牛，离支点 0.4 米；手离支点 1.6 米，是石头那边的 4 倍，手上只要用 200 牛，四分之一的力就够了。',
      eq: '动力 × 动力臂 = 阻力 × 阻力臂：200 N × 1.6 m = 800 N × 0.4 m',
      figure: { kind: 'sim', sim: 'lever', caption: '拖动支点的位置和石头的重量：手离支点越远，要用的力越小；把支点挪到中间以后又会怎样？' },
    },
    {
      nian: '只要四分之一的力？那是不是棍子越长，什么都能撬起来？',
      dad: '很多人以为杠杆能凭空变出力气，其实它是拿距离换力气。石头被翘起 1 厘米，手那头就得往下压 4 厘米：省了力，就得多走路。相传阿基米德说过：“给我一个站脚的地方，我就能撬动地球。”道理没错，可那根棍子得长得吓人，手要压下好远好远。',
    },
    {
      nian: '省了力就得多走路……那有没有反过来，费力却能省距离的杠杆？',
      dad: '有，而且你天天在用！筷子、镊子、钓鱼竿都是：手捏的地方离支点近，夹东西的那头离得远，手上要用更大的力，可手只动一点点，那头就张开一大截，又快又灵巧。人的胳膊也一样，肌肉拉在离手肘很近的地方。',
    },
    {
      nian: '胳膊也是杠杆？那剪刀呢，为什么剪纸的和剪树枝的长得不一样？',
      dad: '剪刀的支点就是中间那颗螺丝。剪树枝的大剪刀手柄长、刀口短，手离支点远、树枝离支点近，是省力杠杆，咔嚓一下就断；剪纸的剪刀刀口长、手柄短，要费点力，可手一合，刀口就走出长长一道，剪得又快又直。',
    },
    {
      nian: '我懂了！杠杆绕着支点转，力乘力臂两边一样大。手离支点越远越省力，可手要多走路；筷子和胳膊是费力杠杆，换来的是省距离。',
      dad: '完全正确！拿一把尺子横放在一支铅笔上，一头放一块橡皮，用手指按另一头：铅笔挪近橡皮和挪远橡皮，手指要用的力一样吗？',
    },
  ],
  tip: '互动图里的棍子长 2 米，石头 400～1200 牛，都是为了好算取的整数，不计棍子自己的重量。“给我一个站脚的地方，我就能撬动地球”是后人记下来的阿基米德的话，最早见于古希腊数学家帕普斯的书。孩子玩撬东西时，别用手去垫支点，也别站在被撬起的东西下面。',
  sources: [
    { title: '物理 八年级下册 · 第十二章 简单机械 · 第1节 杠杆', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Archimedes’ Lever（阿基米德关于杠杆的那句话及其出处）', by: 'Chris Rorres · Courant Institute, New York University', url: 'https://math.nyu.edu/Archimedes/Lever/LeverIntro.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一压就翘起来', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [1200, 30], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 650], size: [90, 70], color: '#c8955b', text: '支点', from: 0.4 },
          { kind: 'bond', a: [170, 620], b: [1030, 585], color: '#6b5a42', from: 0.8 },
          { kind: 'shape', shape: 'circle', at: [250, 520], size: [220, 180], color: '#9a9187', text: '石头', from: 1.2 },
          { kind: 'sprite', icon: '✋', path: [[1000, 510]], size: 90, from: 2 },
          { kind: 'arrow', path: [[1090, 450], [1090, 570]], color: '#e8590c', text: '轻轻一压', from: 2.6 },
          { kind: 'arrow', path: [[250, 410], [250, 290]], color: '#3553a6', text: '翘起来', from: 4 },
          { kind: 'text', at: [600, 830], text: '手离支点远，石头离得近', from: 6 },
        ],
      },
      {
        turn: 1, title: '力 × 力臂', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [1200, 30], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 650], size: [90, 70], color: '#c8955b', text: '支点', from: 0 },
          { kind: 'bond', a: [170, 620], b: [1030, 585], color: '#6b5a42', from: 0 },
          { kind: 'shape', shape: 'circle', at: [250, 520], size: [220, 180], color: '#9a9187', text: '800 牛', from: 0 },
          { kind: 'label', at: [330, 615], pos: [300, 790], text: '阻力臂 0.4 米', from: 1.2 },
          { kind: 'label', at: [720, 602], pos: [760, 790], text: '动力臂 1.6 米', from: 2.4 },
          { kind: 'formula', at: [600, 220], text: '200 × 1.6 = 800 × 0.4', from: 4 },
          { kind: 'count', at: [930, 380], label: '手上的力', start: 800, end: 200, unit: '牛', from: 6 },
        ],
      },
      {
        turn: 2, title: '拿距离换力气', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [1200, 30], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 640], size: [90, 70], color: '#c8955b', text: '支点', from: 0 },
          { kind: 'bond', a: [170, 610], b: [1030, 575], color: '#6b5a42', from: 0 },
          { kind: 'arrow', path: [[250, 560], [250, 510]], color: '#3553a6', text: '1 厘米', from: 1 },
          { kind: 'arrow', path: [[1000, 420], [1000, 620]], color: '#e8590c', text: '4 厘米', from: 2.4 },
          { kind: 'myth', wrong: '杠杆能凭空变出力气', right: '省了力，就得多走路', from: 6 },
        ],
      },
      {
        turn: 3, title: '费力，省距离', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🥢', path: [[420, 470]], size: 260, from: 0.4 },
          { kind: 'label', at: [360, 540], pos: [250, 300], text: '手捏这里：离支点近', from: 1.6 },
          { kind: 'label', at: [520, 380], pos: [640, 250], text: '筷子尖：走得远', from: 3 },
          { kind: 'sprite', icon: '💪', path: [[880, 520]], size: 200, from: 5 },
          { kind: 'label', at: [860, 580], pos: [960, 720], text: '胳膊也是杠杆', from: 6 },
          { kind: 'text', at: [600, 830], text: '费点力，换来省距离', from: 7.4 },
        ],
      },
      {
        turn: 4, title: '两种剪刀', duration: 12,
        cues: [
          { kind: 'sprite', icon: '✂️', path: [[330, 470]], size: 220, from: 0.4 },
          { kind: 'label', at: [330, 470], pos: [330, 250], text: '剪树枝：手柄长，省力', from: 1.4 },
          { kind: 'sprite', icon: '✂️', path: [[870, 470]], size: 160, from: 3.4 },
          { kind: 'label', at: [870, 470], pos: [870, 250], text: '剪纸：刀口长，省距离', from: 4.4 },
          { kind: 'text', at: [600, 820], text: '省力还是省距离，看用途', from: 7 },
        ],
      },
    ],
  },
};
