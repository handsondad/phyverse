import type { Story } from './types';

export const shoeGrip: Story = {
  slug: 'shoe-grip',
  title: '鞋底为什么要有花纹，下雨天为什么容易滑倒？',
  trigger: '下雨天走进商场，小念的光底凉鞋一踩到湿瓷砖，“哧溜”一下差点摔倒。',
  dialogue: [
    {
      nian: '爸爸，我刚才差点滑倒！为什么下雨天的地这么滑？',
      dad: '因为鞋底和地面之间夹进了一层水。平时鞋底和地面贴在一起，凹凸不平的地方互相卡住，这种阻碍滑动的力叫摩擦力。夹了一层水，鞋底就像浮在水上，摩擦一下子变得很小，脚一用力就滑出去了。',
    },
    {
      nian: '摩擦力小了就会滑倒？摩擦不是总跟运动作对、让东西停下来的吗？',
      dad: '很多人这么以为，其实走路全靠摩擦。你每走一步，脚都在往后蹬地；地面用摩擦力把脚往前推，你才走得出去。要是一点摩擦都没有，你使劲往后蹬，脚只会在原地往后滑，身子一步也走不动。',
      figure: { kind: 'sim', sim: 'friction', caption: '换「鞋底」和「地面」：看抓地力够不够走路，再看放大的鞋底下面，水都跑到哪儿去了。' },
    },
    {
      nian: '脚往后蹬，地面就把我往前推？那在冰面上为什么老是打滑？',
      dad: '冰面太光滑，上面还常常化出一层薄薄的水，能给的摩擦很小。你一蹬，它推不住你，脚就往后打滑。所以在冰上要迈小步、脚底放平、慢慢走，让每一步需要的摩擦小一点。',
    },
    {
      nian: '那鞋底的花纹，是为了让摩擦变大吗？',
      dad: '对，花纹有两个本事。一是让鞋底凹凸不平，更能和地面卡住；二是下雨时，花纹里的沟能把水挤出去、引走，鞋底的大部分又能直接踩到地面上。光滑的鞋底没地方排水，就只能踩在那层水上了。',
    },
    {
      nian: '光滑的鞋底就一定不好吗？有没有要让摩擦变小的时候？',
      dad: '当然有，摩擦是好是坏要看场合。溜冰鞋的冰刀又窄又光滑，就是要摩擦小、滑得远；给门轴、自行车链条上点油，也是为了减小摩擦。想要摩擦大，就把表面做粗糙，或者压得更紧：下雪天给车轮装防滑链，就是这个道理。',
    },
    {
      nian: '我明白了！走路靠的是地面往前推脚的摩擦力。下雨天鞋底和地面之间夹了一层水，摩擦变小就容易滑倒；鞋底的花纹能把水挤走，让鞋底踩到地面，所以不容易滑。',
      dad: '说得好！下雨天穿有花纹的鞋，看到“小心地滑”的牌子就放慢脚步。在家也能试试：把同一只鞋放在斜着的木板上，干的时候和抹了一点肥皂水的时候，比比哪次更容易滑下来。',
    },
  ],
  tip: '互动图里的“抓地力”是示意值，只用来比大小，不是测量数据。浴室、厨房的地面湿了要马上擦干，家里有老人和小朋友的可以铺防滑垫。斜木板的小实验在地上做，坡度小一点，别站上去试。',
  sources: [
    { title: '物理 八年级下册 · 第八章 运动和力 · 第3节 摩擦力', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Slips and trips: footwear（防滑鞋的鞋底花纹与排水）', by: 'Health and Safety Executive（英国健康与安全局）', url: 'https://www.hse.gov.uk/slips/footprocure.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '夹了一层水', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [900, 70], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 585], size: [700, 80], color: '#4a4036', slide: { to: [600, 560], at: 3, over: 1 }, from: 0 },
          { kind: 'label', at: [280, 580], pos: [250, 420], text: '鞋底', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [600, 613], size: [700, 24], color: '#7fb8e6', from: 2.8 },
          { kind: 'label', at: [880, 613], pos: [980, 470], text: '一层水', from: 3.4 },
          { kind: 'text', at: [600, 800], text: '鞋底像浮在水上', from: 5.5 },
        ],
      },
      {
        turn: 1, title: '走路靠摩擦', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 590], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'sprite', icon: '🚶', path: [[920, 500], [520, 500]], size: 140, travel: 5, from: 0.5 },
          { kind: 'arrow', path: [[540, 640], [690, 640]], color: '#3a6fb0', text: '脚往后蹬地', from: 5.6 },
          { kind: 'arrow', path: [[500, 380], [350, 380]], color: '#e0762b', text: '地面往前推', from: 6.4 },
          { kind: 'myth', wrong: '摩擦总跟运动作对', right: '走路就靠地面的摩擦', from: 8 },
        ],
      },
      {
        turn: 2, title: '冰上打滑', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 610], size: [1200, 110], color: '#e3f3fb', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[600, 470]], size: 170, wobble: true, from: 0.3 },
          { kind: 'arrow', path: [[640, 580], [800, 580]], color: '#3a6fb0', text: '一蹬', from: 1.4 },
          { kind: 'arrow', path: [[600, 680], [550, 680]], color: '#e0762b', text: '推不住', from: 2.6 },
          { kind: 'text', at: [600, 810], text: '迈小步，脚底放平', from: 5 },
        ],
      },
      {
        turn: 3, title: '花纹排水', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 670], size: [900, 70], color: '#cfc6b8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 618], size: [700, 26], color: '#7fb8e6', from: 0, to: 5 },
          { kind: 'shape', shape: 'rect', at: [600, 545], size: [700, 90], color: '#4a4036', text: '有花纹的鞋底', slide: { to: [600, 590], at: 2.6, over: 1.6 }, from: 0 },
          { kind: 'flow', path: [[560, 625], [140, 625]], color: '#7fb8e6', count: 6, speed: 240, from: 2.8, to: 6.5 },
          { kind: 'flow', path: [[640, 625], [1060, 625]], color: '#7fb8e6', count: 6, speed: 240, from: 2.8, to: 6.5 },
          { kind: 'label', at: [600, 560], pos: [900, 330], text: '沟把水挤出去', from: 1 },
          { kind: 'text', at: [600, 810], text: '水挤走了，鞋底踩到地', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '摩擦看场合', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [330, 280], size: [320, 90], color: '#9cc7e8', text: '要摩擦小', from: 0.3 },
          { kind: 'sprite', icon: '⛸️', path: [[250, 470]], size: 110, from: 1.2 },
          { kind: 'sprite', icon: '🚲', path: [[420, 470]], size: 110, from: 2.2 },
          { kind: 'shape', shape: 'pill', at: [870, 280], size: [320, 90], color: '#ffb36b', text: '要摩擦大', from: 3.4 },
          { kind: 'sprite', icon: '⛓️', path: [[790, 470]], size: 110, from: 4.2 },
          { kind: 'sprite', icon: '👟', path: [[960, 470]], size: 110, from: 4.8 },
          { kind: 'text', at: [600, 760], text: '摩擦是好是坏，看场合', from: 6.5 },
        ],
      },
    ],
  },
};
