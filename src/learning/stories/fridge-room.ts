import type { Story } from './types';

const COLD = '#4dabf7';
const HEAT = '#e8590c';
const ROOM = '#f8efe2';

export const fridgeRoom: Story = {
  slug: 'fridge-room',
  title: '大热天把冰箱门敞开，能让房间凉快下来吗？',
  trigger: '夏天的午后热得像蒸笼，小念拉开冰箱门把脸凑过去吹冷气，舍不得关门：“爸爸，把冰箱门一直敞开，不就变成一台免费空调了吗？”',
  dialogue: [
    {
      nian: '爸爸，冰箱里面那么凉，大热天把冰箱门敞开，能让房间凉快下来吗？',
      dad: '不但凉快不下来，关着窗开一会儿，房间反而会变得更热！很多人以为冰箱是一台“造冷机”，其实冷根本不是一种东西，没法造出来；冰箱只是一个“搬热工”，把箱子里的热搬到冰箱外头去。',
    },
    {
      nian: '搬热工……那它把箱子里的热搬到哪儿去了？',
      dad: '你用手背轻轻贴一下冰箱两侧或者背后的外壳，是不是暖烘烘、甚至有点烫？冰箱管子里的制冷剂在箱内蒸发吸热，把食物的热吸走，再靠底下的压缩机加压送到外壳散热管液化放热——它搬出来的热，一分不少全吐回你站的这间屋子里了！',
      figure: { kind: 'sim', sim: 'heatPump', caption: '先看“冰箱关好门”，再切到“敞开冰箱门当空调”和“装了窗外机的空调”，算算屋里的热变多了还是变少了。' },
    },
    {
      nian: '全吐回这间屋子里了……那一吸一放，不就刚好扯平了吗，怎么还会更热？',
      dad: '你把压缩机吃的电给忘啦！热不会自己从冷的地方往热的地方跑，得靠压缩机费劲做功去推它。打个比方，冰箱从前面敞开的门里吸走 3 份热，压缩机自己干活还要耗掉 1 份电能，合起来就得从背后往屋里吐出 4 份热！门敞着，那 3 份热转头又流回箱里，屋里白白多出 1 份电热。',
      eq: 'Q放 = Q吸 + W电',
    },
    {
      nian: '白白多出 1 份电热……那空调不也是制冷的吗，空调怎么就能把房间吹凉？',
      dad: '秘密就在窗户外头挂着的那台大铁箱子——空调室外机！空调和冰箱用的是同一套搬热本领，但空调穿墙伸出了两根铜管：室内机负责从房间里吸走那 3 份热，室外机隔着墙，把这 3 份热连同压缩机耗的 1 份电热，一共 4 份热统统扔到了窗外的大街上！',
    },
    {
      nian: '统统扔到了窗外……怪不得夏天路过室外机总有一股热浪！那冬天空调制热也是搬热吗？',
      dad: '观察得真准！要是把整台空调连室内机带室外机一起搬进关紧门窗的屋子里开着，它就跟敞开门的冰箱一模一样，也只会把房间越吹越热。反过来到了冬天，热泵空调只要把搬运方向掉个头，就能花 1 份电把窗外空气里的两三份热搬进屋里来取暖。',
    },
    {
      nian: '我懂了！冰箱和空调都不会凭空造冷，只是花电费搬热：冰箱把热排在屋里，敞开门只会让压缩机的电热越攒越多；空调靠窗外的室外机把热扔出房间，屋里才能凉快下来。',
      dad: '账算得明明白白！所以平时拿完冰酸奶要随手把冰箱门关严，不然压缩机一直加班耗电，厨房可就更热喽。',
    },
  ],
  tip: '冰箱两侧或背面需要留出至少 5 到 10 厘米的散热空隙，别用厚布盖住，否则热散不出去既费电又伤机器。摸冰箱外壳感受散热时由大人陪同，不要触碰电源插座或老式冰箱背后裸露的压缩机管路。',
  sources: [
    { title: '物理 九年级全一册 · 第十四章 内能的利用 · 第3节 能量的转化和守恒', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Pump Up Your Savings with Heat Pumps（热泵与冰箱一样用电把热从冷处搬往热处，而非凭空产生热或冷）', by: '美国能源部（U.S. Department of Energy）', url: 'https://www.energy.gov/articles/pump-your-savings-heat-pumps' },
    { title: 'Renewable Energy Systems · Heat Pumps（制冷循环：耗 1 份电能搬运多份热能，室内外双换热器原理）', by: '美国能源部建筑科学教育中心（BSESC）', url: 'https://bsesc.energy.gov/sites/default/files/2023-09/Renewable%20Energy%20Systems%20-%20Chapter%2011.pdf' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '不是造冷机', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 430], size: [760, 400], color: ROOM, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [520, 440], size: [180, 280], color: '#dff1fb', text: '冰箱', from: 0.6 },
          { kind: 'arrow', path: [[420, 440], [300, 440]], color: COLD, text: '门前一点凉', from: 1.6 },
          { kind: 'arrow', path: [[620, 440], [820, 440]], color: HEAT, text: '背后吐热风', from: 2.6 },
          { kind: 'myth', wrong: '冰箱能凭空制造冷气', right: '冰箱只是搬热的搬运工', from: 6 },
        ],
      },
      {
        turn: 1, title: '摸摸冰箱背', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [480, 450], size: [220, 320], color: '#e7f5ff', text: '箱内吸热', from: 0.3 },
          { kind: 'flow', path: [[480, 520], [640, 520], [640, 340]], color: HEAT, count: 5, speed: 150, from: 1.4 },
          { kind: 'label', at: [640, 430], pos: [880, 420], text: '外壳散热管暖烘烘', from: 2.6 },
          { kind: 'text', at: [600, 810], text: '箱里的热全排回了厨房', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '3加1等于4', duration: 12,
        cues: [
          { kind: 'count', at: [300, 340], label: '前面吸热', start: 0, end: 3, unit: '份', from: 0.6 },
          { kind: 'count', at: [600, 340], label: '压缩机耗电', start: 0, end: 1, unit: '份', from: 1.8 },
          { kind: 'count', at: [900, 340], label: '背后吐热', start: 0, end: 4, unit: '份', from: 3 },
          { kind: 'meter', at: [600, 560], label: '关窗室温', start: 45, end: 82, over: 3, color: HEAT, from: 3.8 },
          { kind: 'text', at: [600, 810], text: '敞开门，屋里多攒 1 份电热', from: 7 },
        ],
      },
      {
        turn: 3, title: '空调有外机', duration: 11,
        cues: [
          { kind: 'bond', a: [640, 220], b: [640, 680], color: '#8b7a5c', order: 2, from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [440, 380], size: [220, 100], color: '#e7f5ff', text: '室内机', from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [840, 380], size: [220, 130], color: '#dee2e6', text: '室外机', from: 1.2 },
          { kind: 'arrow', path: [[250, 380], [320, 380]], color: COLD, text: '抽走 3 份热', from: 2 },
          { kind: 'arrow', path: [[840, 460], [840, 620]], color: HEAT, text: '4 份热排窗外', from: 3 },
          { kind: 'text', at: [600, 810], text: '隔着墙把热扔到室外才凉快', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '冬天反着搬', duration: 10,
        cues: [
          { kind: 'bond', a: [640, 230], b: [640, 670], color: '#8b7a5c', order: 2, from: 0.2 },
          { kind: 'sprite', icon: '❄️', path: [[880, 360]], size: 100, from: 0.6 },
          { kind: 'flow', path: [[860, 480], [400, 480]], color: HEAT, count: 6, speed: 180, from: 1.5 },
          { kind: 'sprite', icon: '🏠', path: [[340, 380]], size: 120, from: 0.8 },
          { kind: 'label', at: [640, 480], pos: [640, 260], text: '掉个头把热搬进屋', from: 3 },
          { kind: 'text', at: [600, 810], text: '花 1 份电，搬进好几份热', from: 6 },
        ],
      },
    ],
  },
};
