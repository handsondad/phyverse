import type { Story } from './types';

export const seeDark: Story = {
  slug: 'see-dark',
  title: '关了灯为什么什么都看不见，眼睛会发光吗？',
  trigger: '晚上突然停电，屋里一下子黑漆漆的，小念伸手不见五指。可沙发底下的小猫，两只眼睛亮得像两盏小灯。',
  dialogue: [
    {
      nian: '爸爸，关了灯我什么都看不见，可小猫的眼睛怎么在发光？',
      dad: '小猫的眼睛其实不会自己发光。我们能看见东西，是因为有光从东西那儿跑进了眼睛。灯和太阳自己会发光，叫光源；苹果、书本自己不发光，它们是把照到身上的光弹进你的眼睛。灯一关，没有光，眼睛睁得再大也看不见。',
    },
    {
      nian: '把照到身上的光弹进眼睛？那眼睛是不是也会射出光去“照”东西？',
      dad: '两千多年前，古希腊有些学者真是这么想的，以为眼睛像手电筒一样往外射光。大约一千年前，阿拉伯学者伊本·海赛木用实验说明：看东西靠的是光从外面进入眼睛。要是眼睛自己能发光，我们在黑屋子里也该看得见了。',
      figure: { kind: 'sim', sim: 'seeLight', caption: '换一换灯的亮暗和看的人：光从哪儿来，又跑到了哪里？' },
    },
    {
      nian: '黑屋子里看不见……那小猫的眼睛为什么亮闪闪的？',
      dad: '猫的眼睛后面有一层像小镜子一样的东西，能把照进来的光再反射出去。手电筒或者车灯一照，光进到猫眼里又被弹回来，我们就看见两点亮光。很多人以为猫眼在黑暗里会发光，其实它只是把外面的光反射回来。',
    },
    {
      nian: '把外面的光反射回来？那小猫在一点光都没有的地方，也看得清吗？',
      dad: '看不清。猫的眼睛收光的本领比人强得多，在我们觉得很暗的地方，它还能看清东西。可要是一点光都没有，猫也什么都看不见。看东西总得有光进入眼睛，谁都不例外。',
    },
    {
      nian: '总得有光进入眼睛……那白天屋里没开灯，我为什么也能看见桌子、椅子？',
      dad: '因为阳光从窗户照进来，照到墙上、地上，又被弹向四面八方，屋里到处都是弹来弹去的光，桌子、椅子也被照亮了。粗糙的东西会把光往各个方向弹，你站在哪儿都能看见它们，这叫漫反射。光跑得飞快，每秒大约 30 万千米，所以一开灯，屋里一下就亮了。',
    },
    {
      nian: '我明白了！看见东西是因为光从东西上跑进了眼睛：灯和太阳自己发光，别的东西把光弹进来。眼睛不会发光，猫眼发亮也只是反射的光。',
      dad: '说得对！晚上关了灯，用手电筒斜着照一照镜子、白纸和黑布，再从旁边看看哪个最亮，想想光都被弹到哪儿去了。',
    },
  ],
  tip: '小猫的眼睛在暗处比我们灵得多，可一点光都没有时，它也看不见。互动图里“看清了多少”只是示意，不是测出来的数字。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播 / 第2节 光的反射', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Meowfest: Why Do Cat Eyes Glow in the Dark?（猫眼发亮是反射）', by: 'Carnegie Museum of Natural History', url: 'https://carnegiemnh.org/meowfest-why-do-cat-eyes-glow-in-the-dark/' },
    { title: 'Islamic science paved the way for a millennial celebration of light（“眼睛射光”说与伊本·海赛木）', by: 'Science News', url: 'https://www.sciencenews.org/blog/context/islamic-science-paved-way-millennial-celebration-light' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '看见要靠光', duration: 12,
        cues: [
          { kind: 'sprite', icon: '💡', path: [[300, 230]], size: 110, from: 0 },
          { kind: 'sprite', icon: '🍎', path: [[800, 470]], size: 120, from: 0.4 },
          { kind: 'sprite', icon: '🧒', path: [[260, 620]], size: 130, from: 0.4 },
          { kind: 'arrow', path: [[350, 280], [730, 440]], color: '#f5b800', text: '光', draw: 1.2, from: 1.2 },
          { kind: 'arrow', path: [[730, 520], [340, 610]], color: '#e8590c', text: '弹进眼睛', draw: 1.2, from: 3.4 },
          { kind: 'text', at: [600, 830], text: '光跑进眼睛才看得见', from: 7 },
        ],
      },
      {
        turn: 1, title: '眼睛不射光', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[260, 460]], size: 140, from: 0 },
          { kind: 'sprite', icon: '🍎', path: [[900, 460]], size: 120, from: 0 },
          { kind: 'arrow', path: [[350, 420], [810, 420]], color: '#b8b2c8', text: '眼睛射光？', draw: 1.2, from: 1, to: 6 },
          { kind: 'text', at: [600, 240], text: '古人这样猜过', from: 2.4, to: 6 },
          { kind: 'arrow', path: [[810, 500], [350, 500]], color: '#e8590c', text: '光进眼睛', draw: 1.2, from: 6 },
          { kind: 'text', at: [600, 830], text: '其实是光进眼睛', from: 8 },
        ],
      },
      {
        turn: 2, title: '猫眼会反光', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔦', path: [[250, 470]], size: 120, from: 0 },
          { kind: 'sprite', icon: '🐱', path: [[800, 470]], size: 180, from: 0 },
          { kind: 'arrow', path: [[330, 440], [690, 440]], color: '#f5b800', text: '光照进去', draw: 1, from: 1.2 },
          { kind: 'arrow', path: [[690, 520], [330, 520]], color: '#f5b800', text: '反射回来', draw: 1, from: 3.4 },
          { kind: 'myth', wrong: '猫眼在黑暗里会发光', right: '猫眼只是把光反射回来', from: 7 },
        ],
      },
      {
        turn: 3, title: '没光谁也看不见', duration: 11,
        cues: [
          { kind: 'meter', at: [600, 250], label: '屋里的光', start: 0.7, end: 0, color: '#f5b800', from: 0.6, over: 3.5 },
          { kind: 'sprite', icon: '🐱', path: [[420, 520]], size: 150, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[780, 520]], size: 150, from: 0 },
          { kind: 'text', at: [600, 830], text: '没有光，谁也看不见', from: 6 },
        ],
      },
      {
        turn: 4, title: '光到处弹', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🪟', path: [[220, 300]], size: 140, from: 0 },
          { kind: 'flow', path: [[270, 340], [560, 640], [860, 360], [1020, 640]], color: '#f5b800', count: 9, speed: 260, from: 1 },
          { kind: 'sprite', icon: '🪑', path: [[620, 640]], size: 120, from: 2 },
          { kind: 'count', at: [900, 230], label: '光每秒约', start: 0, end: 30, unit: '万千米', from: 5, over: 1.5 },
          { kind: 'text', at: [600, 830], text: '这叫漫反射', from: 8 },
        ],
      },
    ],
  },
};
