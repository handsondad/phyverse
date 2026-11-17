import type { Story } from './types';

export const featherHammer: Story = {
  slug: 'feather-hammer',
  title: '重的东西一定掉得更快吗？',
  trigger: '小念把一本书和一张纸同时松手，书“啪”地先落了地，纸却晃晃悠悠飘了半天。',
  dialogue: [
    {
      nian: '爸爸，书比纸重，所以掉得快，对不对？',
      dad: '先别急着下结论，咱们再试一次：把这张纸揉成一个紧紧的纸团，和书一起松手。你看，几乎同时落地！纸还是那张纸，一点没变重，只是揉成团以后，空气托不住它了。纸片飘得慢，要怪空气，不是因为它轻。',
    },
    {
      nian: '空气还能托住东西？我怎么感觉不到？',
      dad: '东西往下掉的时候，要一路挤开前面的空气，空气就会往上顶它，这叫空气阻力，掉得越快顶得越厉害。纸片又大又轻，一点点阻力就把它托得慢悠悠；书和纸团块头小、分量足，那点阻力对它们几乎不算什么。',
      figure: { kind: 'sim', sim: 'fall', caption: '先在地球上比锤子和羽毛，再换成纸团，最后把地方换到月球：没有空气时，谁快谁慢？' },
    },
    {
      nian: '要是没有空气阻力，羽毛和锤子也会一起落地吗？',
      dad: '会！真有人试过。1971 年，阿波罗 15 号的航天员斯科特站在月球上，一只手拿着锤子，一只手拿着一根羽毛，从大约 1.6 米高同时松手。月球上没有空气，锤子和羽毛真的同时落在了月面上。',
      figure: {
        kind: 'image',
        src: '/images/photos/feather-hammer-apollo15.webp',
        alt: '阿波罗 15 号的电视直播画面：航天员斯科特站在登月舱旁，刚刚同时放开锤子和羽毛',
        caption: '1971 年阿波罗 15 号的电视直播画面：斯科特站在登月舱旁，刚同时放开了锤子和羽毛。',
        credit: 'NASA · 公有领域',
        href: 'https://images.nasa.gov/details/S71-43788',
      },
    },
    {
      nian: '锤子比羽毛重那么多，为什么不会掉得更快？',
      dad: '这里有两件事正好抵消。锤子重，被拉向地面的力确实更大；可它也更难被拉动，惯性更大。拉力大了多少倍，难拉动也多了多少倍，结果加快的步子一模一样：在地球上，每过一秒，下落速度都快大约每秒 9.8 米。这样只受重力往下掉，就叫自由落体。',
      eq: 'g ≈ 9.8 m/s²',
    },
    {
      nian: '自由落体……那古时候的人，也以为重的东西掉得快吗？',
      dad: '是的，两千多年前的亚里士多德就这么认为，很多人信了很久。后来伽利略让小球从斜坡上滚下来，把“往下掉”放慢了仔细量，发现快慢跟轻重没关系。斯科特在月球上松手之后，还特意说了一句：伽利略说得对！',
    },
    {
      nian: '我明白了！没有空气的时候，轻的重的东西掉得一样快，因为重的东西被拉得更用力，可也更难拉动。地球上羽毛和纸片掉得慢，是空气在往上托它们，不是因为它们轻。',
      dad: '说得太对了！再试一个：把一张纸平放在一本书上面，一起松手，纸会紧紧跟着书落下来，因为书替它挡住了空气。只在桌子高度做就行，千万别从窗口、阳台往下扔东西。',
    },
  ],
  tip: '锤子和羽毛的数据来自 NASA 的档案：锤子 1.32 千克，羽毛是一根约 0.03 千克的猎鹰羽毛，从大约 1.6 米高放手。月球上的重力只有地球的六分之一左右，所以要 1.4 秒左右才落地。互动图里地球上羽毛和纸团的下落快慢是按空气阻力估算的示意。高空抛物很危险，也违法，小实验只在桌面高度做。',
  sources: [
    { title: '物理 必修 第一册 · 第二章 匀变速直线运动的研究 · 第4节 自由落体运动', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'The Apollo 15 Hammer-Feather Drop（阿波罗 15 号锤子和羽毛实验）', by: 'NASA 空间科学数据协调档案馆（NSSDCA）', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '揉成纸团', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 730], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'toss', at: [380, 250], velocity: [0, 0], ground: 690, icon: '📕', from: 1, to: 6.2 },
          { kind: 'sprite', icon: '📄', path: [[780, 250], [830, 400], [750, 540], [800, 690]], size: 80, travel: 4.6, wobble: true, from: 1, to: 6.2 },
          { kind: 'toss', at: [380, 250], velocity: [0, 0], ground: 690, icon: '📕', from: 6.6 },
          { kind: 'toss', at: [800, 250], velocity: [0, 0], ground: 690, color: '#f6f3ea', from: 6.6 },
          { kind: 'label', at: [800, 250], pos: [1010, 330], text: '揉成纸团', from: 6.2, to: 8 },
          { kind: 'text', at: [600, 830], text: '揉成团，几乎一起落地', from: 8.5 },
        ],
      },
      {
        turn: 1, title: '空气往上托', duration: 11,
        cues: [
          { kind: 'particles', box: [220, 200, 380, 500], count: 18, color: '#9cc7e8', motion: 'gas', size: 7, from: 0.2 },
          { kind: 'sprite', icon: '📄', path: [[400, 240], [450, 400], [370, 540], [420, 690]], size: 80, travel: 7, wobble: true, from: 0.6 },
          { kind: 'arrow', path: [[570, 600], [570, 430]], color: '#3a6fb0', text: '空气往上顶', from: 2 },
          { kind: 'toss', at: [900, 240], velocity: [0, 0], ground: 690, icon: '📕', from: 1.2 },
          { kind: 'text', at: [600, 820], text: '纸片又大又轻，被托得慢', from: 5 },
        ],
      },
      {
        turn: 2, title: '月球上的实验', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [1200, 900], color: '#1f2433', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 780], size: [1200, 140], color: '#9a9a96', from: 0.2 },
          { kind: 'sprite', icon: '👨‍🚀', path: [[600, 560]], size: 220, from: 0.5 },
          { kind: 'label', at: [600, 440], pos: [940, 300], text: '阿波罗 15 号', from: 1.2 },
          { kind: 'toss', at: [460, 470], velocity: [0, 0], gravity: 220, ground: 700, icon: '🔨', from: 3 },
          { kind: 'toss', at: [740, 470], velocity: [0, 0], gravity: 220, ground: 700, icon: '🪶', from: 3 },
          { kind: 'text', at: [600, 230], text: '同时落地！', color: '#ffd166', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '两件事抵消', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔨', path: [[330, 290]], size: 110, from: 0.3 },
          { kind: 'sprite', icon: '🪶', path: [[870, 290]], size: 110, from: 0.6 },
          { kind: 'meter', at: [330, 470], label: '锤子：拉力', start: 0, end: 0.9, from: 1.5 },
          { kind: 'meter', at: [870, 470], label: '羽毛：拉力', start: 0, end: 0.15, from: 1.8 },
          { kind: 'meter', at: [330, 600], label: '锤子：难拉动', start: 0, end: 0.9, color: '#3a6fb0', from: 3 },
          { kind: 'meter', at: [870, 600], label: '羽毛：难拉动', start: 0, end: 0.15, color: '#3a6fb0', from: 3.3 },
          { kind: 'formula', at: [600, 780], text: 'g ≈ 9.8 m/s²', from: 6 },
        ],
      },
      {
        turn: 4, title: '伽利略的办法', duration: 11,
        cues: [
          { kind: 'bond', a: [200, 300], b: [920, 620], color: '#b08850', from: 0 },
          { kind: 'atom', path: [[220, 275], [900, 590]], symbol: '', color: '#ff9f43', r: 26, travel: 3.5, from: 1 },
          { kind: 'label', at: [560, 440], pos: [330, 600], text: '把下落放慢来量', from: 2.4 },
          { kind: 'myth', wrong: '越重的东西掉得越快', right: '没有空气，轻重一样快', from: 6 },
        ],
      },
    ],
  },
};
