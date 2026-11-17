import type { Story } from './types';

export const deepDive: Story = {
  slug: 'deep-dive',
  title: '潜水越深耳朵越疼，水坝为什么上窄下宽？',
  trigger: '游泳馆里，小念憋足一口气，潜到深水区池底去捡一枚硬币，还没摸到，耳朵就胀得生疼。',
  dialogue: [
    {
      nian: '爸爸，我一潜到池底耳朵就疼，是水把耳朵堵住了吗？',
      dad: '不是堵住，是水在压你的耳朵。水有重量，上面的水压着下面的水，越往下，头顶上的水越多，压得越重。哪怕只潜一两米，耳膜外面的水压就比里面的空气大，把耳膜往里推，所以会胀、会疼。',
      figure: { kind: 'sim', sim: 'depth', caption: '拖着潜水员往下潜：看四面八方的箭头怎样变长，再看右边的大坝为什么下面厚。' },
    },
    {
      nian: '水压是从上面往下压的吧？为什么耳朵在旁边也会疼呢？',
      dad: '很多人以为水只往下压，其实水往四面八方都压，同一个深度，上下左右压得一样大。在塑料瓶侧面不同高度扎几个小孔，灌满水，水会从侧面喷出来，而且越靠下的孔喷得越急。这说明水对侧面也有压强，越深压强越大。',
    },
    {
      nian: '越深压强越大，那大海深处是不是压得更厉害？',
      dad: '厉害得多！水每深 10 米，增加的压强就差不多是一个大气压，相当于指甲盖那么大的地方又多压了 1 千克的东西。越往深处压得越狠，所以去深海要坐又厚又结实的潜水器。抹香鲸却能潜到两千多米深去抓大王乌贼，它的肋骨和肺能被压扁也不受伤。',
    },
    {
      nian: '潜水器要又厚又结实……水坝修得上窄下宽，也是这个原因吗？',
      dad: '对！水坝挡住的水越往下越深，压强越大，坝底被推得最厉害，所以要修得最厚；上面水浅、压强小，就可以薄一些。三峡大坝最高 181 米，坝顶宽 15 米，坝底却有 124 米宽，就是这个道理。',
    },
    {
      nian: '坝底被推得最厉害……那我耳朵被压疼的时候，有什么办法吗？',
      dad: '有。潜水员会捏住鼻子、闭上嘴，轻轻往鼻子里鼓气，让空气从喉咙后面一根细细的咽鼓管跑进耳朵里面，里外压强差不多了，就不疼了。要是怎么都不舒服，就慢慢游上来，千万别硬往深处潜。',
    },
    {
      nian: '我明白了！水往四面八方都有压强，越深压强越大。我潜到池底，水把耳膜往里压，所以会疼；水坝下面挡的水最深、压强最大，所以要修得上窄下宽。',
      dad: '完全正确！在家可以做那个扎孔塑料瓶的小实验，记得在水池或大盆上方做，水会喷得到处都是。',
    },
  ],
  tip: '互动图按清水估算：每深 1 米，水的压强约增加 9.8 千帕（海水稍大一点）。耳朵疼时不要硬潜，感冒鼻塞时更不要潜水；“捏鼻鼓气”要轻，最好在游泳教练指导下学。三峡大坝的尺寸来自湖北省住房和城乡建设厅的公开资料。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第2节 液体的压强', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'How does pressure change with ocean depth?（每深约 10 米增加一个大气压）', by: 'NOAA National Ocean Service（美国国家海洋局）', url: 'https://oceanservice.noaa.gov/facts/pressure.html' },
    { title: '三峡大坝全面建成在即 全长2309米（坝顶宽 15 米、底部宽 124 米）', by: '湖北省住房和城乡建设厅', url: 'https://zjt.hubei.gov.cn/bmdt/ztzl/hbcjda/gzdt_7471/201910/t20191028_79928.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '水压着耳朵', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [520, 560], size: [800, 560], color: '#cfe5f7', from: 0 },
          { kind: 'sprite', icon: '🏊', path: [[520, 300]], size: 120, from: 0.3, to: 1.8 },
          { kind: 'sprite', icon: '🤿', path: [[520, 330], [520, 720]], size: 120, travel: 4, from: 1.8 },
          { kind: 'meter', at: [990, 300], label: '耳朵受的压', start: 0.08, end: 0.75, color: '#3a6fb0', from: 1.8, over: 4 },
          { kind: 'arrow', path: [[260, 380], [260, 580]], color: '#3a6fb0', text: '上面的水压下来', from: 3 },
          { kind: 'text', at: [990, 520], text: '越深，压得越重', from: 6.8 },
        ],
      },
      {
        turn: 1, title: '四面八方都压', duration: 12,
        cues: [
          { kind: 'vessel', vessel: 'jar', at: [460, 440], size: [240, 420], liquid: '#7fb8e6', level: 0.9, from: 0 },
          { kind: 'flow', path: [[585, 330], [640, 345], [680, 390], [700, 450]], color: '#4f93cf', count: 5, speed: 140, from: 1.6 },
          { kind: 'flow', path: [[585, 450], [670, 470], [740, 530], [780, 610]], color: '#4f93cf', count: 6, speed: 210, from: 2.4 },
          { kind: 'flow', path: [[585, 570], [700, 590], [800, 650], [860, 700]], color: '#4f93cf', count: 7, speed: 280, from: 3.2 },
          { kind: 'label', at: [600, 572], pos: [930, 470], text: '越靠下，喷得越急', from: 4.4 },
          { kind: 'myth', wrong: '水只往下压', right: '水往四面八方都压', from: 7 },
        ],
      },
      {
        turn: 2, title: '每深 10 米', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [500, 330], size: [760, 200], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [500, 530], size: [760, 200], color: '#8fbbe0', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [500, 730], size: [760, 200], color: '#4f7fa8', from: 1.2 },
          { kind: 'label', at: [880, 430], pos: [1000, 360], text: '深 10 米', from: 2.2 },
          { kind: 'count', at: [1000, 560], label: '多出的压强', start: 0, end: 1, unit: '个大气压', from: 2.8 },
          { kind: 'sprite', icon: '🐋', path: [[240, 300], [460, 730]], size: 150, travel: 3.6, from: 6.2 },
          { kind: 'label', at: [460, 730], pos: [700, 800], text: '抹香鲸能潜两千多米', from: 8.6 },
        ],
      },
      {
        turn: 3, title: '上窄下宽', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 520], size: [600, 480], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [700, 360], size: [40, 160], color: '#b9b2a6', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [725, 520], size: [90, 160], color: '#b9b2a6', from: 1 },
          { kind: 'shape', shape: 'rect', at: [755, 680], size: [150, 160], color: '#b9b2a6', from: 1.4 },
          { kind: 'arrow', path: [[600, 360], [672, 360]], color: '#3a6fb0', from: 2.6 },
          { kind: 'arrow', path: [[520, 520], [672, 520]], color: '#3a6fb0', from: 3.4 },
          { kind: 'arrow', path: [[400, 680], [672, 680]], color: '#3a6fb0', text: '越深推得越狠', from: 4.2 },
          { kind: 'label', at: [700, 290], pos: [960, 230], text: '坝顶宽 15 米', from: 6 },
        ],
      },
      {
        turn: 3, title: '坝底最厚', duration: 7,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 520], size: [600, 480], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [700, 360], size: [40, 160], color: '#b9b2a6', from: 0 },
          { kind: 'shape', shape: 'rect', at: [725, 520], size: [90, 160], color: '#b9b2a6', from: 0 },
          { kind: 'shape', shape: 'rect', at: [755, 680], size: [150, 160], color: '#e0b06b', from: 0.4 },
          { kind: 'label', at: [800, 720], pos: [1000, 620], text: '坝底宽 124 米', from: 0.8 },
          { kind: 'text', at: [600, 820], text: '水越深，坝越厚', from: 2.6 },
        ],
      },
      {
        turn: 4, title: '让里外一样', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 480], size: [460, 460], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [830, 480], size: [500, 460], color: '#fff4e3', from: 0 },
          { kind: 'shape', shape: 'rect', at: [580, 480], size: [18, 240], color: '#e8a0a0', motion: 'wiggle', from: 0.4 },
          { kind: 'label', at: [580, 360], pos: [580, 200], text: '耳膜', from: 0.8 },
          { kind: 'arrow', path: [[300, 480], [560, 480]], color: '#3a6fb0', text: '水压', from: 1.4 },
          { kind: 'flow', path: [[900, 760], [860, 640], [720, 560], [610, 520]], color: '#c9a05a', count: 6, speed: 160, from: 3.6 },
          { kind: 'arrow', path: [[860, 430], [604, 430]], color: '#e0762b', text: '鼓进去的空气', from: 5.2 },
          { kind: 'text', at: [600, 820], text: '里外一样，就不疼了', from: 7.4 },
        ],
      },
    ],
  },
};
