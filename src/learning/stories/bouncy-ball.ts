import type { Story } from './types';

export const bouncyBall: Story = {
  slug: 'bouncy-ball',
  title: '弹力球为什么越弹越低？能量去哪了？',
  trigger: '小念把篮球举过头顶，一松手，球“砰、砰、砰”地弹，一次比一次低，最后在地上滚了几圈就停住了。',
  dialogue: [
    {
      nian: '爸爸，球为什么一次比一次弹得低？是它的力气用完了吗？',
      dad: '可以说是它的能量一点点漏掉了。球举高的时候攒着能量；往下掉，高度换成了速度；砸到地上，球被压扁一点，又像弹簧一样撑开，把速度换回高度。可每砸一次，总有一部分能量没换回来，下一次就弹不了那么高。',
    },
    {
      nian: '每砸一次都有能量没换回来？那漏掉的能量跑到哪里去了？',
      dad: '很多人以为能量用完就没了，其实它只是换了样子。你听，球落地“砰”的一声，那是一部分能量变成了声音；球被压扁再撑开，里面的橡胶和空气会摩擦发热，地板也被砸得热了一点点。热和声音散到四周，就再也收不回来了。',
      figure: { kind: 'sim', sim: 'bounce', caption: '换不同的球、不同的地面：看每次弹回多高，蓝色的势能、橙色的动能和红色的“热和声音”怎么此消彼长。' },
    },
    {
      nian: '变成了热和声音……那篮球该弹多高，有没有规定？',
      dad: '有！国际篮联的规则写着：把球从大约 1.8 米高的地方松手，落到地板上，要弹回 1.035 米到 1.085 米之间，都从球的底部量，也就是不到六成。气打得太足弹得太高，气不足又弹不起来，比赛用球的气要打到正好这样才算合格。',
    },
    {
      nian: '气打足了就弹得高？那橡皮泥摔到地板上，为什么一下都不弹？',
      dad: '皮球被压扁以后，里面压紧的空气和有弹性的橡胶会使劲撑回原样，把大部分能量还给它。橡皮泥被压扁就扁了，不会撑回来，几乎所有的能量都花在把它捏变形、让它变热上，所以“啪”一声就趴下了。厚地毯也会软软地吃掉能量，在上面拍球特别费劲。',
    },
    {
      nian: '地毯会吃掉能量？那有没有球能一直弹下去，永远不停？',
      dad: '没有。只要还在碰地、还在空气里穿过，每一次都会漏掉一点能量，弹得再好的超级弹力球也会越弹越低。想让球一直弹，就得像拍皮球那样，每次往下拍一把，把漏掉的能量补回去。能量不会凭空消失，也不会凭空多出来，这叫能量守恒。',
    },
    {
      nian: '我懂了！球往下掉是高度换速度，弹起来是速度换回高度；每碰一次地，一部分能量变成了热和声音，所以越弹越低。能量没有消失，只是换了样子。',
      dad: '一点没错！拿一把卷尺靠墙立好，让篮球从同一个高度松手，在硬地板和地毯上各弹一次，量量第一次分别弹回多高。',
    },
  ],
  tip: '篮球弹回的高度来自国际篮联（FIBA）2026 年 10 月起执行的器材规则：从约 1.8 米松手、量球的底部；以前的版本量球的顶部，写的是 1.2～1.4 米，两种写法差不多是一回事。互动图里超级弹力球、橡皮泥和地毯的弹回比例是示意值。拍球、弹球别在楼梯口和马路边玩。',
  sources: [
    { title: '物理 九年级 · 第十四章 内能的利用 · 第3节 能量的转化和守恒', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Official Basketball Rules 2026 · Basketball Equipment（篮球从 1.8 米落下要弹回 1035～1085 毫米）', by: 'FIBA 国际篮球联合会', url: 'https://assets.fiba.basketball/image/upload/documents-corporate-fiba-official-rules-2026-equipment-v1-0.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '高度换速度', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 40], color: '#d8c9ad', from: 0 },
          { kind: 'sprite', icon: '🏀', path: [[400, 220]], size: 80, from: 0, to: 1 },
          { kind: 'sprite', icon: '🏀', path: [[400, 220], [400, 700], [520, 400], [640, 700], [740, 520], [840, 700], [920, 610], [1000, 700]], size: 80, travel: 6, from: 1 },
          { kind: 'label', at: [400, 220], pos: [200, 330], text: '举高：攒着能量', from: 0.4, to: 3 },
          { kind: 'arrow', path: [[300, 300], [300, 650]], color: '#3553a6', text: '高度换速度', from: 1.4 },
          { kind: 'text', at: [600, 840], text: '一次比一次低', from: 7.4 },
        ],
      },
      {
        turn: 1, title: '变成热和声音', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [1200, 40], color: '#d8c9ad', from: 0 },
          { kind: 'sprite', icon: '🏀', path: [[600, 550]], size: 110, from: 0.3 },
          { kind: 'pulse', at: [600, 600], radius: 260, from: 1 },
          { kind: 'label', at: [680, 560], pos: [930, 380], text: '“砰”：变成声音', from: 1.6 },
          { kind: 'particles', box: [600, 610, 320, 30], count: 10, color: '#e8590c', motion: 'jitter', from: 3 },
          { kind: 'label', at: [480, 610], pos: [280, 380], text: '地板热了一点点', from: 3.4 },
          { kind: 'myth', wrong: '能量用完就没了', right: '能量变成了热和声音', from: 6.4 },
        ],
      },
      {
        turn: 2, title: '弹回不到六成', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 40], color: '#d8c9ad', from: 0 },
          { kind: 'sprite', icon: '🏀', path: [[500, 220], [500, 700], [500, 420]], size: 90, travel: 3, from: 0.6 },
          { kind: 'label', at: [540, 220], pos: [820, 220], text: '松手：1.8 米', from: 0.8 },
          { kind: 'label', at: [540, 420], pos: [820, 420], text: '弹回：不到六成', from: 4 },
          { kind: 'text', at: [600, 840], text: '比赛用球都要这样测', from: 7 },
        ],
      },
      {
        turn: 3, title: '橡皮泥不弹', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 40], color: '#d8c9ad', from: 0 },
          { kind: 'sprite', icon: '🏀', path: [[350, 220], [350, 690], [350, 380]], size: 90, travel: 2.6, from: 0.4 },
          { kind: 'label', at: [350, 380], pos: [180, 300], text: '撑回原样', from: 3 },
          { kind: 'shape', shape: 'circle', at: [820, 220], size: [90, 90], color: '#9b6bd1', slide: { to: [820, 695], at: 3.6, over: 1 }, from: 0.6 },
          { kind: 'label', at: [820, 700], pos: [880, 500], text: '捏扁就扁了', from: 5 },
          { kind: 'text', at: [600, 840], text: '软的东西吃掉能量', from: 7 },
        ],
      },
      {
        turn: 4, title: '补回能量', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 760], size: [1200, 40], color: '#d8c9ad', from: 0 },
          { kind: 'sprite', icon: '✋', path: [[600, 300]], size: 100, from: 0.4 },
          { kind: 'sprite', icon: '🏀', path: [[600, 400], [600, 700], [600, 400], [600, 700], [600, 400], [600, 700], [600, 400]], size: 90, travel: 6, from: 0.8 },
          { kind: 'arrow', path: [[720, 300], [720, 440]], color: '#e8590c', text: '拍一把', from: 1.6 },
          { kind: 'formula', at: [600, 200], text: '能量不会凭空消失', from: 3.6 },
          { kind: 'text', at: [600, 840], text: '漏掉多少，补回多少', from: 7.4 },
        ],
      },
    ],
  },
};
