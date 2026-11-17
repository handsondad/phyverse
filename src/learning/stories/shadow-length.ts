import type { Story } from './types';

export const shadowLength: Story = {
  slug: 'shadow-length',
  title: '影子为什么早上长、中午短？',
  trigger: '早上上学，小念的影子拖得老长，一直伸到马路对面；中午放学，影子却缩成了脚底下小小的一团。',
  dialogue: [
    {
      nian: '爸爸，我的影子早上那么长，中午怎么缩得这么短？',
      dad: '先说影子是什么。光是沿直线跑的，碰到你的身体就被挡住了，你身后那块光照不到的地方，就是影子。早上太阳刚升起来，离地面很低，光斜斜地照过来，被你挡住的那一块就拉得很长；中午太阳升到最高，光几乎从头顶照下来，影子就变短了。',
    },
    {
      nian: '光几乎从头顶照下来？那太阳越高，影子就越短吗？',
      dad: '对。拿北京来说，春分前后的中午，太阳离地面大约 50°，1 米高的竿子，影子不到 1 米；到了冬至前后的中午，太阳只有二十多度高，同一根竿子的影子要长到 2 米左右。太阳越低，影子越长。',
      figure: { kind: 'sim', sim: 'shadow', caption: '拖动时间、换一换季节：太阳有多高？影子有多长、朝哪边？' },
    },
    {
      nian: '太阳越低影子越长……那影子为什么总是黑乎乎的？',
      dad: '因为影子那儿缺了光。影子不是一样东西，也不是从你身上掉下来的一块黑布，它只是光被挡住、照不到的地方。很多人以为影子是一种黑色的东西，其实影子是光照不到的地方。所以影子总在背着太阳的那一边：太阳在东边，影子就朝西。',
    },
    {
      nian: '影子总在背着太阳的那一边？那有没有一点影子都没有的时候？',
      dad: '有！太阳正好在头顶时，光直直地照下来，竖着的竿子几乎没有影子，叫“立竿无影”。只有北回归线附近和更南边的地方才看得到。香港太空馆介绍，香港每年 6 月初和 7 月上旬的中午，各有一次太阳几乎正好在头顶。北京纬度高，太阳永远到不了头顶。',
    },
    {
      nian: '太阳永远到不了北京头顶？那没有钟表的时候，人们能用影子看时间吗？',
      dad: '能。在地上立一根竿子，看影子转到哪儿、有多长，就知道大概几点了，这就是日晷的道理。中午的影子一年里也在变：在我们北方，夏至前后最短，冬至前后最长，所以量一量中午的影子，还能知道季节在变。',
    },
    {
      nian: '我懂了！光沿直线走，被挡住照不到的地方就是影子。太阳低，光斜着照，影子长；太阳高，影子短。影子总在背着太阳的那一边。',
      dad: '说得好！找个晴天，在地上竖一根铅笔，每过一小时画下影子顶端的位置，看看它怎么转、怎么变长变短。',
    },
  ],
  tip: '互动图按北京的纬度和当地的太阳时估算，和钟表上的时间会差一点。立竿无影只在北回归线附近和更南的地方出现，具体日子各地不一样。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '万物无影的一刻（立竿无影、太阳经过香港天顶）', by: '香港太空馆 · 馆长随笔', url: 'https://hk.space.museum/sc/web/spm/resources/curators-blog/2020/07/the-moment-when-things-cast-no-shadow.html' },
    { title: '2026 太阳周年路径图（太阳最接近香港天顶的日子）', by: '香港天文台', url: 'https://www.hko.gov.hk/tc/gts/astron2026/files/2026simp-paths-sun.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '挡住光的地方', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[1000, 230]], size: 120, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[640, 570]], size: 160, from: 0 },
          { kind: 'ray', path: [[960, 270], [640, 480], [250, 690]], color: '#f5b800', draw: 1.2, from: 1 },
          { kind: 'shape', shape: 'pill', at: [450, 680], size: [380, 26], color: '#4a3f33', from: 2.4 },
          { kind: 'label', at: [400, 680], pos: [330, 560], text: '光照不到', from: 3 },
          { kind: 'text', at: [600, 830], text: '早上太阳低，影子长', from: 7 },
        ],
      },
      {
        turn: 1, title: '太阳越高越短', duration: 12,
        cues: [
          { kind: 'count', at: [320, 240], label: '春分中午', start: 0, end: 50, unit: '°', from: 1, over: 1.5 },
          { kind: 'shape', shape: 'rect', at: [640, 580], size: [14, 200], color: '#5d4e37', from: 0 },
          { kind: 'count', at: [880, 240], label: '冬至影子', start: 0, end: 2, unit: '米', from: 4, over: 1.5 },
          { kind: 'shape', shape: 'pill', at: [460, 680], size: [360, 24], color: '#4a3f33', motion: 'grow', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '太阳越低，影子越长', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '影子不是东西', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[1020, 240]], size: 110, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[640, 540]], size: 170, from: 0 },
          { kind: 'shape', shape: 'pill', at: [420, 660], size: [380, 24], color: '#4a3f33', from: 1 },
          { kind: 'label', at: [380, 660], pos: [300, 560], text: '光照不到', from: 2 },
          { kind: 'myth', wrong: '影子是黑色的东西', right: '影子是光照不到的地方', from: 7 },
        ],
      },
      {
        turn: 3, title: '立竿无影', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[600, 200]], size: 120, from: 0 },
          { kind: 'ray', path: [[560, 270], [560, 700]], color: '#f5b800', draw: 1, from: 1 },
          { kind: 'ray', path: [[640, 270], [640, 700]], color: '#f5b800', draw: 1, from: 1 },
          { kind: 'shape', shape: 'rect', at: [600, 620], size: [14, 160], color: '#5d4e37', from: 0 },
          { kind: 'label', at: [600, 700], pos: [860, 560], text: '几乎没影子', from: 3 },
          { kind: 'text', at: [600, 830], text: '6 月初和 7 月上旬', from: 6 },
        ],
      },
      {
        turn: 4, title: '用影子看时间', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 540], size: [440, 440], color: '#f3e3c8', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [14, 14], color: '#5d4e37', from: 0 },
          { kind: 'arrow', path: [[600, 540], [420, 470]], color: '#4a3f33', draw: 0.6, from: 1, to: 3.4 },
          { kind: 'arrow', path: [[600, 540], [600, 400]], color: '#4a3f33', draw: 0.6, from: 3.4, to: 5.8 },
          { kind: 'arrow', path: [[600, 540], [780, 470]], color: '#4a3f33', draw: 0.6, from: 5.8 },
          { kind: 'label', at: [760, 640], pos: [960, 360], text: '日晷', from: 1.4 },
          { kind: 'text', at: [600, 830], text: '夏至最短，冬至最长', from: 7.5 },
        ],
      },
    ],
  },
};
