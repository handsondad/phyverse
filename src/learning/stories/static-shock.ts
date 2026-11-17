import type { Story } from './types';

export const staticShock: Story = {
  slug: 'static-shock',
  title: '冬天摸门把手，为什么会被电一下？',
  trigger: '冬天的晚上，小念穿着棉拖鞋在地毯上跑了几圈，伸手去开门，指尖“啪”地冒出一个小火花，又麻又疼。',
  dialogue: [
    {
      nian: '爸爸，我摸门把手的时候，为什么会被电一下？',
      dad: '因为你身上攒了电。东西都是由原子组成的，原子里有带正电的部分，也有带负电的电子，平时一样多，正好抵消。你在地毯上走，鞋底和地毯一摩擦，一些电子就从一边跑到了另一边，你身上就多出了电荷。手指靠近金属门把手时，这些电荷一下子跳过去，“啪”地电你一下。',
    },
    {
      nian: '电子从一边跑到另一边？那电是摩擦造出来的吗？',
      dad: '不是造出来的，只是搬了家。美国国会图书馆的科普里说，鞋子在地毯上一蹭，你的身体就收集了多余的电子，它们一直待在你身上，直到找到地方放出去。这边多了多少，那边就少了多少，电荷的总数一点没变。',
      figure: { kind: 'sim', sim: 'staticShock', caption: '在地毯上多走几步，再调一调空气湿度：身上攒了多少静电？碰门把手会不会“啪”？' },
    },
    {
      nian: '电荷的总数没变……那为什么冬天特别容易被电，夏天就很少？',
      dad: '因为冬天的空气特别干。空气潮湿时，东西表面会蒙上一层看不见的薄水膜，电荷顺着它悄悄溜走，攒不起来。冬天又冷又干，屋里开着暖气更干，电荷没处跑，越攒越多。很多人以为电是摩擦造出来的，其实摩擦只是把电荷从一处搬到了另一处。',
    },
    {
      nian: '越攒越多……那一下有多高的电压？会不会很危险？',
      dad: '美国肯塔基大学的物理科普说，这种静电的电压可以高达几千伏，听着吓人。可攒下的电荷其实很少，一下子就放完了，所以只是麻一下、疼一下，不会伤人。家里插座的电完全不一样，它能源源不断地送电，千万不能碰。',
    },
    {
      nian: '不会伤人……那有没有办法不被电？',
      dad: '有。开门前先握着一把钥匙，用钥匙尖去碰门把手，火花从钥匙上跳过去，手指就不疼了。屋里用加湿器让空气潮一点，电荷就不容易攒起来。冬天脱毛衣时噼啪响、冒小火花，也是攒下的电荷在往外跑。',
    },
    {
      nian: '我懂了！摩擦让电子搬了家，我身上攒起了电荷，碰到门把手就“啪”地放出去。冬天空气干，电荷攒得多，所以特别容易被电。',
      dad: '说得对！干燥的天里，拿一个吹好的气球在头发上蹭几下，再慢慢靠近碎纸屑，看看纸屑会不会跳起来粘到气球上。',
    },
  ],
  tip: '互动图里的电压是按走的步数和湿度估算的示意值。静电只是麻一下，可家里插座、电线里的电会致命，千万不要用手或金属去碰。',
  sources: [
    { title: '物理 九年级全一册 · 第十五章 电流和电路 · 第1节 两种电荷（摩擦起电）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'How does static electricity work?（鞋子蹭地毯，身体收集多余的电子）', by: 'Everyday Mysteries · Library of Congress（美国国会图书馆）', url: 'https://www.loc.gov/everyday-mysteries/browse-all-questions/item/how-does-static-electricity-work/' },
    { title: 'Static electricity in winter（电压可达几千伏、潮湿时表面水膜带走电荷）', by: 'SciWorks · University of Kentucky（美国肯塔基大学）', url: 'https://www.pa.uky.edu/sciworks/courses/heat/static.htm' },
    { title: 'Tips for avoiding static electricity shocks during winter（常碰金属放掉电荷）', by: 'Northeastern University College of Engineering', url: 'https://coe.northeastern.edu/news/winter-air-is-electric-but-there-are-solutions-to-those-annoying-static-shocks/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '啪地电一下', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[300, 560]], size: 220, from: 0 },
          { kind: 'particles', box: [220, 440, 170, 230], count: 14, color: '#3553a6', motion: 'jitter', from: 1.5 },
          { kind: 'shape', shape: 'rect', at: [920, 470], size: [220, 560], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'circle', at: [835, 500], size: [40, 40], color: '#d8dee6', from: 0 },
          { kind: 'flow', path: [[430, 500], [810, 500]], color: '#ffd43b', count: 6, speed: 420, from: 4.5 },
          { kind: 'pulse', at: [820, 500], color: '#ffd43b', radius: 70, from: 4.5 },
          { kind: 'text', at: [600, 830], text: '指尖“啪”地一下', from: 7 },
        ],
      },
      {
        turn: 1, title: '电荷搬了家', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [900, 100], color: '#d9a3a3', text: '地毯', from: 0 },
          { kind: 'sprite', icon: '👟', path: [[260, 560], [940, 560]], size: 130, travel: 6, wobble: true, from: 0.5 },
          { kind: 'arrow', path: [[700, 630], [700, 470]], color: '#3553a6', text: '电子', draw: 0.6, from: 3 },
          { kind: 'text', at: [600, 300], text: '这边多，那边就少', from: 5 },
          { kind: 'text', at: [600, 830], text: '电荷总数不变', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '冬天特别干', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 450], size: [460, 360], color: '#eaf4fb', text: '夏天潮湿', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 450], size: [460, 360], color: '#fdebe0', text: '冬天干燥', from: 0 },
          { kind: 'particles', box: [130, 300, 400, 80], count: 4, color: '#3553a6', motion: 'jitter', from: 1 },
          { kind: 'particles', box: [670, 300, 400, 80], count: 18, color: '#3553a6', motion: 'jitter', from: 1 },
          { kind: 'sprite', icon: '💧', path: [[330, 570]], size: 70, from: 2 },
          { kind: 'myth', wrong: '电是摩擦造出来的', right: '摩擦只是给电荷搬家', from: 7 },
        ],
      },
      {
        turn: 3, title: '电压高电荷少', duration: 11,
        cues: [
          { kind: 'text', at: [600, 250], text: '几千伏', size: 'l', from: 0.5 },
          { kind: 'sprite', icon: '⚡', path: [[600, 470]], size: 200, from: 1.5 },
          { kind: 'label', at: [640, 470], pos: [930, 620], text: '电荷其实很少', from: 3 },
          { kind: 'text', at: [600, 830], text: '麻一下，不会伤人', from: 7 },
        ],
      },
      {
        turn: 4, title: '先放掉电荷', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [920, 470], size: [220, 560], color: '#c8955b', from: 0 },
          { kind: 'shape', shape: 'circle', at: [835, 500], size: [40, 40], color: '#d8dee6', from: 0 },
          { kind: 'sprite', icon: '🔑', path: [[260, 500], [760, 500]], size: 110, travel: 3, from: 0.5 },
          { kind: 'pulse', at: [800, 500], color: '#ffd43b', radius: 60, from: 3.8 },
          { kind: 'text', at: [600, 830], text: '用钥匙先碰一碰', from: 7 },
        ],
      },
    ],
  },
};
