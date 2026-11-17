import type { Story } from './types';

export const platformLine: Story = {
  slug: 'platform-line',
  title: '火车进站时，为什么不能越过黄线？',
  trigger: '高铁站台上，广播一遍遍提醒“请站在安全线以内”。一列车呼啸着开过，小念的头发和衣角一下子全飘向了铁轨那边。',
  dialogue: [
    {
      nian: '爸爸，刚才车一开过，我的衣服怎么全往车那边飘？',
      dad: '因为列车跑得飞快，会带着身边的空气一起往前冲，离车越近，空气跑得越快。流得快的空气压强小：你靠车那一面的压强变小了，背后的空气压强还是原来那么大，两边一差，就把你和衣服一起往车那边推。',
      figure: { kind: 'sim', sim: 'flowPress', caption: '把列车开快一点，再把人往黄线里面挪：看身前的风有多快，往车那边的推力有多大。' },
    },
    {
      nian: '流得快的空气压强小？这个怎么才能看出来呢？',
      dad: '拿两张纸，隔一指宽竖着垂在面前，往中间使劲吹气。你可能以为纸会被吹开，结果两张纸反而往中间贴拢了。中间的空气流得快、压强小，外面不动的空气压强大，就把两张纸往中间推。',
    },
    {
      nian: '把纸往中间推……那火车是不是有一股吸力，把人吸过去？',
      dad: '听起来像吸，其实并没有什么吸力，是你背后的空气在推你，就像吸管里的饮料也是被外面的大气压推上来的。列车越快、人离得越近，前后的压强差越大，推力就越大，严重的时候能把人推得站不稳，甚至推向列车。',
    },
    {
      nian: '人离得越近越危险，所以黄线要画得离站台边远一点吗？',
      dad: '对。铁路有规定：高站台的安全线离站台边 1 米；有的站台比较矮，经过的列车又快，安全线就要画到离边 1.5 米、2 米远。车越快，线画得越靠里。站在线里面，那股推力就小到能站稳了。',
    },
    {
      nian: '车越快线越靠里……还有别的地方也会这样吗？',
      dad: '有。两条船并排开得太近，中间的水流得快、压强小，外侧的水就把两条船往中间挤，容易撞在一起，所以船不能并排靠得太近。刮大风时，屋顶上面的空气跑得飞快、压强变小，屋里的空气还是原来的压强，风太大时能把屋顶掀起来。',
    },
    {
      nian: '我明白了！列车带着空气跑，人身前的空气流得快、压强小，背后的压强大，就把人往车那边推。车越快、离得越近，推得越厉害，所以一定要站在黄线里面。',
      dad: '说得好！等车时站在黄线里面，拉好行李箱、牵好小朋友，车停稳了再上。两张纸的小实验随时都能做，吹得越用力，纸贴得越紧。',
    },
  ],
  tip: '互动图里的推力按“离车越远风越小”粗略估算，只用来比较远近快慢，不是测量数据。安全线的距离出自《铁路技术管理规程》，各站以现场标线和广播为准。站台上推行李箱、婴儿车要拉紧扶好；雨天尽量穿雨衣，别在站台上打伞。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第4节 流体压强与流速的关系', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '再次强调：这里绝对不能越界！（《铁路技术管理规程》第157条的安全标线距离）', by: '北京铁路（澎湃号·政务）', url: 'https://m.thepaper.cn/newsDetail_forward_13192985' },
    { title: '为什么地铁站要设置安全线', by: '科普中国', url: 'https://www.kepuchina.cn/2016zt/100000whys/02/201706/t20170630_207762.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '车带着空气跑', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [1200, 480], color: '#ece6da', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1200, 14], color: '#f2c230', from: 0 },
          { kind: 'shape', shape: 'rect', at: [-700, 330], size: [1300, 150], color: '#f3f1ec', text: '列车', slide: { to: [1900, 330], at: 0.6, over: 6 }, from: 0 },
          { kind: 'flow', path: [[0, 440], [1200, 440]], color: '#3a6fb0', count: 9, speed: 700, from: 1.4 },
          { kind: 'flow', path: [[0, 590], [1200, 590]], color: '#9cc7e8', count: 5, speed: 180, from: 2.2 },
          { kind: 'sprite', icon: '🧍', path: [[760, 640]], size: 150, from: 0.6 },
          { kind: 'arrow', path: [[900, 830], [900, 700]], color: '#e0762b', text: '背后压强大', from: 5 },
          { kind: 'text', at: [380, 820], text: '身前流得快，压强小', from: 6.6 },
        ],
      },
      {
        turn: 1, title: '两张纸', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [500, 500], size: [16, 380], color: '#ffffff', outline: true, slide: { to: [570, 500], at: 3.6, over: 1.4 }, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [700, 500], size: [16, 380], color: '#ffffff', outline: true, slide: { to: [630, 500], at: 3.6, over: 1.4 }, from: 0.3 },
          { kind: 'sprite', icon: '🌬️', path: [[600, 210]], size: 120, from: 1 },
          { kind: 'flow', path: [[600, 290], [600, 720]], color: '#3a6fb0', count: 7, speed: 420, from: 1.8 },
          { kind: 'arrow', path: [[300, 500], [470, 500]], color: '#e0762b', from: 5 },
          { kind: 'arrow', path: [[900, 500], [730, 500]], color: '#e0762b', text: '外面压强大', from: 5.3 },
          { kind: 'text', at: [600, 820], text: '中间流得快，压强小', from: 7 },
        ],
      },
      {
        turn: 2, title: '不是吸，是推', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [260, 420], size: [220, 520], color: '#f3f1ec', text: '列车', from: 0 },
          { kind: 'flow', path: [[440, 180], [440, 660]], color: '#3a6fb0', count: 7, speed: 600, from: 0.8 },
          { kind: 'sprite', icon: '🧍', path: [[640, 430]], size: 170, from: 1.2 },
          { kind: 'arrow', path: [[960, 430], [760, 430]], color: '#e0762b', text: '背后的空气推', from: 2.6 },
          { kind: 'label', at: [440, 300], pos: [700, 220], text: '这边压强小', from: 4 },
          { kind: 'myth', wrong: '火车有吸力把人吸过去', right: '是背后的空气把人推过去', from: 7 },
        ],
      },
      {
        turn: 3, title: '黄线画在哪', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 290], size: [1200, 150], color: '#8a8178', text: '轨道', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 640], size: [1200, 560], color: '#ece6da', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [1200, 14], color: '#f2c230', from: 1 },
          { kind: 'label', at: [300, 470], pos: [300, 420], text: '高站台：离边 1 米', from: 1.6 },
          { kind: 'shape', shape: 'rect', at: [600, 570], size: [1200, 14], color: '#f2c230', from: 3.8 },
          { kind: 'label', at: [600, 570], pos: [600, 520], text: '车更快：1.5 米', from: 4.2 },
          { kind: 'shape', shape: 'rect', at: [600, 670], size: [1200, 14], color: '#f2c230', from: 5.8 },
          { kind: 'label', at: [900, 670], pos: [900, 620], text: '再快：2 米', from: 6.2 },
        ],
      },
      {
        turn: 4, title: '两条船别靠太近', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 520], size: [1200, 600], color: '#cfe5f7', from: 0 },
          { kind: 'sprite', icon: '🚢', path: [[220, 380], [800, 440]], size: 150, travel: 7, from: 0.4 },
          { kind: 'sprite', icon: '🚢', path: [[220, 640], [800, 580]], size: 150, travel: 7, from: 0.4 },
          { kind: 'flow', path: [[200, 510], [1100, 510]], color: '#3a6fb0', count: 8, speed: 520, from: 2 },
          { kind: 'arrow', path: [[1000, 260], [1000, 360]], color: '#e0762b', from: 4 },
          { kind: 'arrow', path: [[1000, 760], [1000, 660]], color: '#e0762b', text: '外侧往里挤', from: 4.3 },
          { kind: 'text', at: [600, 860], text: '中间流得快，两船靠拢', size: 's', from: 7.6 },
        ],
      },
    ],
  },
};
