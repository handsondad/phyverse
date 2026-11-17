import type { Story } from './types';

export const beachSand: Story = {
  slug: 'beach-sand',
  title: '海边中午，为什么沙子烫脚、海水却凉凉的？',
  trigger: '暑假去海边，中午小念光脚踩上沙滩，烫得一蹦一跳地冲进海里，海水却凉丝丝的。',
  dialogue: [
    {
      nian: '爸爸，太阳是不是偏心，专门晒沙子，不怎么晒海水？',
      dad: '太阳一点也不偏心，沙子和海水晒到的阳光差不多一样多。不同的是它们“升温的脾气”：同样吸收那么多热，沙子温度蹿得快，海水温度涨得慢。物理上用比热容来说这个脾气：比热容越大，越不容易升温。',
    },
    {
      nian: '比热容越大越不容易升温？那水和沙子的比热容差多少呢？',
      dad: '比热容就是 1 千克的东西升高 1 ℃ 要吸收多少热。课本的表里写着：水的比热容是 4.2×10³ 焦每千克摄氏度，砂石大约只有 0.92×10³，水是砂石的 4 倍多。同样晒一中午，沙子能烫到四五十度，海水才暖了一点点。',
      eq: '吸收的热 Q = 比热容 c × 质量 m × 升高的温度 Δt',
      figure: { kind: 'sim', sim: 'heatCap', caption: '让太阳晒上几小时，比比沙子和海水的温度；再等太阳下山，看谁凉得快。' },
    },
    {
      nian: '海水才暖了一点点？那到了晚上，海水是不是还是比沙子凉？',
      dad: '晚上正好反过来！太阳下山以后，沙子的热跑得也快，温度一下子降下来；海水降温很慢，摸上去反而比沙子暖。很多人以为是太阳偏心照沙子，其实是水升温慢，降温也慢，所以海边的冷热总是比内陆温和。',
    },
    {
      nian: '海水降温也慢？那海边的风是不是也跟这个有关系？',
      dad: '有关系！中国气象局的科普讲过海陆风：白天陆地热得快，上面的热空气往上升，海上较凉的空气吹过来补，这就是海风；夜里陆地凉得快，风就从陆地吹向大海，叫陆风。所以海边白天常常有凉爽的海风。',
    },
    {
      nian: '凉爽的海风也是比热容带来的？那家里还有哪些地方用到水的这个本事？',
      dad: '可多了！水能吸收很多热、自己温度却涨得不多，所以汽车发动机用水来降温；冬天的暖气片里流着热水，一千克热水降温时能放出很多热，屋子就暖和。北方冬天往菜窖里放几大桶水，也是靠它慢慢放热，让菜不容易冻坏。',
    },
    {
      nian: '我懂了！太阳不偏心，是水的比热容比沙子大得多：同样晒太阳，沙子升温快，海水升温慢；到了晚上，沙子降温快，海水降温慢。海风和暖气片也用到了它。',
      dad: '说得好！找两个一样的杯子，一杯装沙子，一杯装同样多的水，一起放在太阳下晒半小时，摸一摸哪杯更热；再拿到阴凉处，看哪杯先凉下来。',
    },
  ],
  tip: '真实的海水会上下流动、互相交换热量，中国气象局的科普也提到了这一点，所以海水升温比互动图里还要慢。比热容的数值来自课本的表；“四五十度”只是大约的说法，沙子能晒到多烫，跟天气和沙子的颜色都有关系。',
  sources: [
    { title: '物理 九年级 · 第十三章 内能 · 第3节 比热容', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '海陆风是怎么形成的', by: '中国气象局', url: 'https://www.cma.gov.cn/kppd/kppdqxyr/kppdshqx/202111/t20211103_4163005.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '太阳不偏心', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[600, 220]], size: 150, from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 600], size: [460, 160], color: '#ead29a', text: '沙子', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 600], size: [460, 160], color: '#7fb5df', text: '海水', from: 0 },
          { kind: 'ray', path: [[560, 280], [330, 520]], color: '#f5b800', from: 1 },
          { kind: 'ray', path: [[640, 280], [870, 520]], color: '#f5b800', from: 1 },
          { kind: 'text', at: [600, 820], text: '晒到的阳光一样多', from: 5 },
        ],
      },
      {
        turn: 1, title: '比热容差 4 倍', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 600], size: [460, 160], color: '#ead29a', text: '沙子', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 600], size: [460, 160], color: '#7fb5df', text: '海水', from: 0 },
          { kind: 'meter', at: [330, 360], label: '温度', start: 0.3, end: 0.9, color: '#e8590c', from: 1, over: 4 },
          { kind: 'meter', at: [870, 360], label: '温度', start: 0.3, end: 0.4, color: '#3a7bb5', from: 1, over: 4 },
          { kind: 'text', at: [600, 820], text: '水是砂石的 4 倍多', from: 6 },
        ],
      },
      {
        turn: 2, title: '晚上反过来', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🌙', path: [[600, 220]], size: 130, from: 0 },
          { kind: 'shape', shape: 'rect', at: [330, 560], size: [460, 160], color: '#ead29a', text: '沙子', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 560], size: [460, 160], color: '#7fb5df', text: '海水', from: 0 },
          { kind: 'meter', at: [330, 360], label: '温度', start: 0.9, end: 0.25, color: '#e8590c', from: 1, over: 3 },
          { kind: 'meter', at: [870, 360], label: '温度', start: 0.45, end: 0.4, color: '#3a7bb5', from: 1, over: 3 },
          { kind: 'myth', wrong: '太阳偏心照沙子', right: '水升温慢，降温也慢', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '白天吹海风', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 640], size: [460, 120], color: '#ead29a', text: '陆地', from: 0 },
          { kind: 'shape', shape: 'rect', at: [870, 640], size: [460, 120], color: '#7fb5df', text: '海面', from: 0 },
          { kind: 'arrow', path: [[330, 540], [330, 300]], color: '#e8590c', text: '热空气上升', from: 1.2 },
          { kind: 'arrow', path: [[930, 500], [470, 500]], color: '#3a7bb5', text: '海风', from: 3 },
          { kind: 'text', at: [600, 820], text: '夜里风向反过来', from: 7 },
        ],
      },
      {
        turn: 4, title: '水来帮忙', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚗', path: [[300, 450]], size: 170, from: 0.5 },
          { kind: 'label', at: [300, 500], pos: [300, 640], text: '水给发动机降温', from: 1.4 },
          { kind: 'shape', shape: 'rect', at: [860, 450], size: [260, 200], color: '#e9a07e', text: '暖气片', from: 3.5 },
          { kind: 'label', at: [860, 550], pos: [860, 640], text: '热水慢慢放热', from: 4.2 },
          { kind: 'text', at: [600, 820], text: '吸热多，温度涨得少', from: 7 },
        ],
      },
    ],
  },
};
