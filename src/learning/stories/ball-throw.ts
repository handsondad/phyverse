import type { Story } from './types';

export const ballThrow: Story = {
  slug: 'ball-throw',
  title: '扔球为什么斜着往上扔最远？',
  trigger: '体育课考扔实心球，小念平着往前一推，球没飞多远就“咚”地砸在了脚前面。',
  dialogue: [
    {
      nian: '爸爸，我用了好大的劲，球还是没扔远！是不是平着扔不对？',
      dad: '平着扔的球，一出手就开始往下掉，没飞一会儿就落地了，横着跑得再快也跑不远。球一出手就同时做两件事：横着按出手时的速度一直往前跑，竖着被重力往下拉。扔多远，要看它在空中飞多久、横着跑多快。',
    },
    {
      nian: '飞多久、横着跑多快……那我往高里扔，让它飞久一点，不就远了吗？',
      dad: '往高处扔，飞得是久了，可你的力气大半用在了往上，横着的速度就小了。竖直往上扔，球横着一点都不走，飞再久也只会落回手里。平着扔横着快却飞得短，竖着扔飞得久却不往前，最远的那一下，在两头的中间。',
      figure: { kind: 'sim', sim: 'projectile', caption: '拖动「扔出去的角度」：太平、太陡都扔不远；虚线是 45° 的弧线，找找哪个角度落得最远。' },
    },
    {
      nian: '在两头的中间？是不是正好 45° 最远？',
      dad: '要是没有空气阻力、出手和落地一样高，就是 45° 最远。比如出手速度每秒 14 米：30° 扔出去落在 17 米多外，45° 能到 20 米。往 45° 两边偏同样的角度，比如 30° 和 60°，落点一样远，只是一个低平、一个高高的。',
      eq: '射程 R = v² · sin 2θ ÷ g',
    },
    {
      nian: '没有空气阻力才是 45°？那体育课上扔实心球，也该用 45° 吗？',
      dad: '真扔的时候要低一点。一是球出手时在你头顶附近，比落地的地方高；二是人往斜上方使劲，没有往前推那么顺，角度越陡，出手速度反而越小。研究铅球的科学家算过，运动员最合适的出手角度大约在 26° 到 41° 之间。',
    },
    {
      nian: '出手速度……球在空中，横着的速度真的一直不变吗？',
      dad: '不算空气的话，是的。球飞出去以后只有重力在拉它，重力是竖直往下的，横着没有谁推它、拉它，所以横着的速度一直保持出手时的样子，这又是惯性。竖着就不一样了：重力让它往上越飞越慢，到最高点停一下，再越掉越快。',
    },
    {
      nian: '我明白了！球一出手，横着靠惯性一直跑，竖着被重力往下拉。扔多远要看飞多久和横着跑多快：太平飞不久，太陡跑不快，没有空气时 45° 最远，真扔实心球要比 45° 低一点。',
      dad: '总结得真好！下次扔实心球，先蹬地、再挥臂，斜着往前上方送出去。也可以用浇花的水管试试：水流不变，把管口从平着慢慢抬高，看水柱在什么角度喷得最远。',
    },
  ],
  tip: '“45° 最远”要同时满足三个条件：不计空气阻力、出手点和落地点一样高、换角度时出手速度不变。扔实心球、推铅球时出手点比地面高，人往斜上方用力时速度也会变小，所以最合适的角度比 45° 小。互动图不计空气阻力。用水管做实验时别对着人和电器喷。',
  sources: [
    { title: '物理 必修 第二册 · 第五章 抛体运动 · 第4节 抛体运动的规律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Optimum release angle in the shot put（铅球的最佳出手角度）', by: 'N. P. Linthorne, Journal of Sports Sciences', url: 'https://arxiv.org/abs/physics/0601148' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '平着扔', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 740], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[140, 650]], size: 150, from: 0.2 },
          { kind: 'toss', at: [190, 560], velocity: [420, 0], gravity: 600, ground: 712, from: 1 },
          { kind: 'arrow', path: [[300, 420], [560, 420]], color: '#2c774a', text: '横着一直跑', from: 2.4 },
          { kind: 'arrow', path: [[680, 380], [680, 560]], color: '#e0762b', text: '竖着往下拉', from: 3.4 },
          { kind: 'text', at: [600, 830], text: '飞多久 × 横着跑多快', from: 5.5 },
        ],
      },
      {
        turn: 1, title: '太平、太陡', duration: 13,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 740], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[140, 650]], size: 150, from: 0.2 },
          { kind: 'toss', at: [190, 560], velocity: [541, -145], gravity: 600, ground: 712, color: '#9cc7e8', from: 0.8 },
          { kind: 'label', at: [742, 712], pos: [700, 590], text: '太平：飞得短', from: 2 },
          { kind: 'toss', at: [190, 560], velocity: [97, -551], gravity: 600, ground: 712, color: '#c9bca6', from: 3.4 },
          { kind: 'label', at: [279, 310], pos: [520, 260], text: '太陡：不往前', from: 4.6 },
          { kind: 'toss', at: [190, 560], velocity: [396, -396], gravity: 600, ground: 712, from: 6.6 },
          { kind: 'label', at: [844, 712], pos: [1000, 590], text: '中间最远', from: 8.4 },
        ],
      },
      {
        turn: 2, title: '45° 最远', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 230], text: 'R = v² · sin 2θ ÷ g', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 729], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [200, 699], velocity: [485, -280], gravity: 600, ground: 700, color: '#9cc7e8', from: 1.6 },
          { kind: 'toss', at: [200, 699], velocity: [280, -485], gravity: 600, ground: 700, color: '#c9bca6', from: 1.6 },
          { kind: 'label', at: [653, 700], pos: [520, 820], text: '30° 60° 一样远', from: 3.4 },
          { kind: 'toss', at: [200, 699], velocity: [396, -396], gravity: 600, ground: 700, from: 5 },
          { kind: 'label', at: [723, 700], pos: [960, 600], text: '45° 最远', from: 6.6 },
          { kind: 'count', at: [960, 400], label: '45° 扔出', start: 0, end: 20, unit: '米', over: 1.4, from: 6.8 },
        ],
      },
      {
        turn: 3, title: '真扔要低一点', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 740], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[150, 650]], size: 150, from: 0.2 },
          { kind: 'label', at: [200, 560], pos: [420, 330], text: '出手点比地面高', from: 0.8 },
          { kind: 'toss', at: [200, 560], velocity: [396, -396], gravity: 600, ground: 712, color: '#c9bca6', from: 2 },
          { kind: 'toss', at: [200, 560], velocity: [491, -344], gravity: 600, ground: 712, from: 4.2 },
          { kind: 'label', at: [941, 712], pos: [980, 560], text: '低一点更远', from: 6 },
          { kind: 'text', at: [600, 830], text: '约 26° 到 41°', from: 7 },
        ],
      },
      {
        turn: 4, title: '横着不变', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 740], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [150, 711], velocity: [300, -620], gravity: 600, ground: 712, from: 0.6 },
          { kind: 'flow', path: [[150, 810], [1100, 810]], color: '#2c774a', count: 4, speed: 300, size: 12, from: 0.6 },
          { kind: 'label', at: [460, 392], pos: [760, 300], text: '最高点：竖着停一下', from: 1.8 },
          { kind: 'text', at: [600, 870], text: '横着的速度一直不变', size: 's', from: 4.5 },
        ],
      },
    ],
  },
};
