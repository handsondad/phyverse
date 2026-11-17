import type { Story } from './types';

export const nailBed: Story = {
  slug: 'nail-bed',
  title: '躺在钉板上为什么不疼？',
  trigger: '科技馆里，一位叔叔慢慢躺到一块密密麻麻全是钉子的板上，还笑着朝小念挥了挥手。',
  dialogue: [
    {
      nian: '爸爸，那么多尖尖的钉子，叔叔躺上去怎么一点都不疼？',
      dad: '因为钉子太多了。叔叔的体重是一定的，压在一千根左右的钉子上，就被分成了一千份，每根钉子只顶住一点点，差不多一个鸡蛋那么重。这么小的力压在钉尖上，扎不破皮肤。',
      figure: { kind: 'sim', sim: 'press', caption: '把钉子从 1000 根拖到 1 根，再换小念躺上去：看每根钉子要顶多大的力。' },
    },
    {
      nian: '每根钉子只顶一点点？那要是只有一根钉子呢？',
      dad: '那就危险了！全身的重量都压在一个小小的钉尖上，一下就扎进去。同样大的压力，压在越小的面积上，效果越厉害。物理上把压力除以受力面积叫作压强，单位是帕斯卡，简称帕。',
      eq: '压强 p = 压力 F ÷ 受力面积 S',
    },
    {
      nian: '压强……那钉子越多不是越危险吗，怎么反而越安全？',
      dad: '很多人都这么想，其实正好反过来。钉子越多，受力面积越大，压强就越小。就算每个钉尖只有大约 1 平方毫米，一千个加起来也有 10 平方厘米左右，压强就降下来了。所以表演的人要慢慢躺、慢慢起，让身体始终同时压在很多钉子上。',
    },
    {
      nian: '慢慢躺也有讲究？生活里还有哪些地方在改变受力面积？',
      dad: '到处都是。书包带做得宽宽的，压在肩上的面积大，背着不勒；雪地靴、坦克的履带又宽又大，不容易陷下去。反过来，刀刃磨得很薄、针尖做得很尖，都是把面积变小，让压强变大，好切进去、扎进去。图钉帽大、尖头小，两头的本事都用上了。',
    },
    {
      nian: '图钉帽大、尖头小……是一头减小压强，一头增大压强吗？',
      dad: '对！手指按在宽宽的钉帽上，面积大、压强小，手不疼；同样的力传到尖尖的钉头上，面积小、压强大，一下就扎进木板。用的力一直是那么大，变的只是面积。所以想要压强小就加大面积，想要压强大就减小面积。',
    },
    {
      nian: '我懂了！压强就是压力除以受力面积。钉子越多，受力面积越大，每根钉子分到的力就越小，压强小，扎不破皮肤；只有一根钉子，面积太小，压强就大得吓人。',
      dad: '说得对！不过钉床要练过的人用专门的器材才能表演，千万别自己试。想体会压强，可以用手掌和指尖分别用同样的力按一块橡皮泥，看哪个坑更深。',
    },
  ],
  tip: '互动图按每个钉尖约 1 平方毫米估算，“疼不疼”是示意的分界。钉床表演要专门的器材和训练，不要模仿。按橡皮泥、在沙地上比较脚印深浅，都是安全的压强小实验。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第1节 压强', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'The bed of nails（钉床：每根钉子分到多大的力）', by: 'University of Waikato · Physics Stop', url: 'https://blog.waikato.ac.nz/physicsstop/2011/02/10/the-bed-of-nails/' },
    { title: 'Fakir Physics（钉床演示：约 1000 根钉子、间距约 2 厘米）', by: 'Harvard Natural Sciences Lecture Demonstrations', url: 'https://sciencedemonstrations.fas.harvard.edu/presentations/fakir-physics' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '分成一千份', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [760, 44], color: '#c99a62', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 655], size: [740, 26], color: '#9aa3ab', from: 0.4 },
          { kind: 'sprite', icon: '🛌', path: [[600, 570]], size: 190, from: 1 },
          { kind: 'arrow', path: [[600, 250], [600, 450]], color: '#e0762b', text: '体重', from: 2, to: 6 },
          { kind: 'count', at: [930, 330], label: '分给钉子', start: 1, end: 1000, unit: '根', from: 4.2 },
          { kind: 'arrow', path: [[360, 740], [360, 680]], color: '#3a6fb0', from: 6.4 },
          { kind: 'arrow', path: [[600, 740], [600, 680]], color: '#3a6fb0', text: '每根一点点', from: 6.8 },
          { kind: 'arrow', path: [[840, 740], [840, 680]], color: '#3a6fb0', from: 7.2 },
        ],
      },
      {
        turn: 1, title: '只有一根钉子', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 700], size: [700, 44], color: '#c99a62', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [12, 80], color: '#7d8790', from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 330], size: [300, 120], color: '#7fb3dc', text: '同样重', slide: { to: [600, 540], at: 1.6, over: 1.4 }, from: 0.8 },
          { kind: 'pulse', at: [600, 600], color: '#e8590c', radius: 90, from: 3.2, to: 6 },
          { kind: 'label', at: [606, 604], pos: [900, 560], text: '全压在一个尖上', from: 3.6 },
          { kind: 'formula', at: [600, 190], text: 'p = F ÷ S', from: 5.4 },
          { kind: 'text', at: [600, 810], text: '面积越小，压强越大', from: 7.4 },
        ],
      },
      {
        turn: 2, title: '越多越安全', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 260], size: [260, 90], color: '#ffb36b', text: '1 根', from: 0.3 },
          { kind: 'shape', shape: 'pill', at: [870, 260], size: [260, 90], color: '#9cc7e8', text: '1000 根', from: 0.9 },
          { kind: 'meter', at: [330, 450], label: '压强', start: 0, end: 1, color: '#e8590c', from: 1.6, over: 2 },
          { kind: 'meter', at: [870, 450], label: '压强', start: 0, end: 0.04, color: '#3a6fb0', from: 2.4, over: 2 },
          { kind: 'meter', at: [330, 590], label: '受力面积', start: 0, end: 0.04, color: '#8b7a5c', from: 3.6, over: 2 },
          { kind: 'meter', at: [870, 590], label: '受力面积', start: 0, end: 1, color: '#8b7a5c', from: 4.2, over: 2 },
          { kind: 'myth', wrong: '钉子越多越危险', right: '钉子越多，压强越小', from: 7 },
        ],
      },
      {
        turn: 3, title: '宽带子，尖刀刃', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 260], size: [340, 90], color: '#9cc7e8', text: '面积大压强小', from: 0.3 },
          { kind: 'sprite', icon: '🎒', path: [[250, 470]], size: 130, from: 1.2 },
          { kind: 'sprite', icon: '🥾', path: [[420, 470]], size: 130, from: 2 },
          { kind: 'shape', shape: 'pill', at: [870, 260], size: [340, 90], color: '#ffb36b', text: '面积小压强大', from: 4.2 },
          { kind: 'sprite', icon: '🔪', path: [[790, 470]], size: 130, from: 5 },
          { kind: 'sprite', icon: '📌', path: [[960, 470]], size: 130, from: 5.8 },
          { kind: 'text', at: [600, 760], text: '压强大小，靠面积来调', from: 7.6 },
        ],
      },
      {
        turn: 4, title: '图钉的两头', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 690], size: [760, 120], color: '#c99a62', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 380], size: [280, 36], color: '#e0762b', slide: { to: [600, 470], at: 4, over: 1.2 }, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [14, 170], color: '#7d8790', slide: { to: [600, 570], at: 4, over: 1.2 }, from: 0.4 },
          { kind: 'sprite', icon: '👆', path: [[600, 230], [600, 320]], size: 130, travel: 1.4, from: 1.2, to: 4 },
          { kind: 'sprite', icon: '👆', path: [[600, 320], [600, 410]], size: 130, travel: 1.2, from: 4 },
          { kind: 'label', at: [720, 380], pos: [960, 300], text: '面积大：手不疼', from: 2.2, to: 4 },
          { kind: 'label', at: [720, 470], pos: [960, 380], text: '面积大：手不疼', from: 5.4 },
          { kind: 'label', at: [600, 640], pos: [300, 560], text: '面积小：扎进去', from: 5.8 },
          { kind: 'text', at: [600, 820], text: '力一样大，面积不一样', from: 7.4 },
        ],
      },
    ],
  },
};
