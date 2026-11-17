import type { Story } from './types';

export const spaceSilent: Story = {
  slug: 'space-silent',
  title: '太空里爆炸会“轰”地响吗？',
  trigger: '小念看科幻电影，宇宙飞船在太空里爆炸，“轰”的一声，震得沙发都在抖。',
  dialogue: [
    {
      nian: '爸爸，太空里爆炸，真的会“轰”地这么响吗？',
      dad: '真实的太空里，爆炸再猛也是静悄悄的。声音是东西振动出来的，振动要一层层推着空气往外传，才能钻进你的耳朵。太空几乎什么都没有，叫真空，没有空气帮忙，声音就传不出来。电影里的“轰”是后来配上去的。',
    },
    {
      nian: '没有空气，声音就传不出来？能做实验看看吗？',
      dad: '课本里就有一个：把一个正在响的闹铃放进玻璃罩，用抽气机一点点把空气抽走。铃锤一直在敲，可听到的铃声越来越小，抽得差不多空了，就几乎听不见了。再把空气放回去，铃声又回来了。',
      figure: { kind: 'sim', sim: 'bellJar', caption: '把玻璃罩里的空气一点点抽走：铃锤一直在敲，听到的铃声怎么变了？' },
    },
    {
      nian: '铃锤一直在敲却听不见？那航天员在太空里怎么说话？',
      dad: '在空间站里面有空气，航天员可以面对面聊天。到了舱外，他们之间隔着真空，就靠头盔里的无线电通话。无线电和光一样是电磁波，不用空气也能传。美国航天局的科普就说：真空里没有东西帮声音传，所以在太空中说话是听不见的。',
    },
    {
      nian: '无线电不用空气也能传？那声音能在水里传吗？',
      dad: '能！声音不光能在空气里传，水和固体也能传。你潜到游泳池水下，也能听到岸上的人喊你，只是闷闷的；把耳朵贴在桌面上，轻轻敲桌子的另一头，比隔着空气听更清楚。能帮声音传过去的这些东西，叫介质。',
    },
    {
      nian: '能帮声音传过去的叫介质？那太阳上那么大的爆炸，我们也一点都听不见吗？',
      dad: '听不见。太阳和地球之间差不多全是真空，太阳上的声音传不过来；可它的光能跨过真空照到地球，所以我们看得到太阳，却听不到它。科学家有时会把探测器收到的电磁波变成声音给大家听，那是“翻译”出来的，不是从太空传来的真声音。',
    },
    {
      nian: '我明白了！声音是振动一层层传出来的，要靠空气、水或固体这些介质来传。太空几乎是真空，爆炸再猛也听不见，航天员在舱外要靠无线电说话。',
      dad: '说得好！把一把尺子的一头压在桌边，拨一下另一头，看着它振动、听它发声；再用手按住它，声音马上就停了——没有振动，就没有声音。',
    },
  ],
  tip: '“真空铃”实验里，罩子很难抽成完全真空，铃也会通过底座传出一点振动，所以总还能听到一丝声音。电影里太空爆炸的声音，是为了好看后来配上去的。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Ask Us: Sound in Space（真空里声音传不出去）', by: "NASA's Cosmicopia · Goddard Space Flight Center", url: 'https://cosmicopia.gsfc.nasa.gov/qa_sp_ev.html' },
    { title: 'How Scary Is Space?（太空里没有声音，科学家把别的波“翻译”成声音）', by: 'NASA Space Place', url: 'https://spaceplace.nasa.gov/scary-space/en/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '静悄悄的爆炸', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚀', path: [[520, 430]], size: 180, from: 0, to: 2.6 },
          { kind: 'sprite', icon: '💥', path: [[520, 430]], size: 280, from: 2.6 },
          { kind: 'label', at: [600, 400], pos: [920, 240], text: '没有空气传声', from: 4 },
          { kind: 'text', at: [600, 830], text: '真空里听不见', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '抽走空气', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [440, 380], color: '#eef6fb', outline: true, from: 0 },
          { kind: 'particles', box: [400, 270, 400, 340], count: 30, color: '#8fb8d8', motion: 'gas', amount: { at: 2, over: 5, from: 30, to: 2 }, from: 0 },
          { kind: 'sprite', icon: '🔔', path: [[600, 440]], size: 150, wobble: true, from: 0 },
          { kind: 'meter', at: [600, 200], label: '听到的铃声', start: 0.9, end: 0.05, color: '#7a5cc4', from: 2, over: 5 },
          { kind: 'text', at: [600, 820], text: '铃锤一直在敲', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '舱外靠无线电', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧑‍🚀', path: [[280, 460]], size: 180, from: 0 },
          { kind: 'sprite', icon: '🧑‍🚀', path: [[920, 460]], size: 180, from: 0 },
          { kind: 'wave', a: [380, 430], b: [820, 430], amplitude: 16, wavelength: 50, speed: 260, color: '#3553a6', from: 1.6 },
          { kind: 'label', at: [600, 410], pos: [600, 240], text: '无线电', from: 2.4 },
          { kind: 'myth', wrong: '太空里也听得到爆炸', right: '真空不能传声', from: 6.6 },
        ],
      },
      {
        turn: 3, title: '水里也能传', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [1100, 320], color: '#cfe5f7', from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[220, 400]], size: 160, from: 0 },
          { kind: 'sprite', icon: '🏊', path: [[820, 680]], size: 140, from: 0 },
          { kind: 'wave', a: [300, 420], b: [740, 660], amplitude: 14, wavelength: 50, speed: 200, color: '#7a5cc4', from: 1.4 },
          { kind: 'text', at: [700, 220], text: '水和固体也能传声', from: 5 },
        ],
      },
      {
        turn: 4, title: '看得见听不见', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[220, 360]], size: 220, from: 0 },
          { kind: 'sprite', icon: '🌍', path: [[980, 500]], size: 190, from: 0 },
          { kind: 'ray', path: [[320, 380], [890, 480]], color: '#f5b800', draw: 1, from: 1 },
          { kind: 'label', at: [600, 430], pos: [600, 620], text: '光能穿过真空', from: 2.4 },
          { kind: 'text', at: [600, 830], text: '太阳的声音传不过来', from: 6.5 },
        ],
      },
    ],
  },
};
