import type { Story } from './types';

export const echoValley: Story = {
  slug: 'echo-valley',
  title: '对着山谷喊，为什么会听到回声？',
  trigger: '爬到山顶，对面是一大片山崖。小念双手圈在嘴边大喊“喂——”，过了一会儿，山里也传回来一声“喂……”。',
  dialogue: [
    {
      nian: '爸爸，是不是山里有人在学我说话？',
      dad: '山里没人，是你自己的声音回来了。声音碰到又大又硬的山崖，会像皮球撞墙一样被弹回来，这叫声音的反射，弹回来的声音就是回声。山崖离你越远，回声要走的路越长，回来得越晚。',
    },
    {
      nian: '声音会被山崖弹回来？那为什么在家里喊，就听不到回声呢？',
      dad: '家里的墙也会把声音弹回来，只是离你太近，回来得太快了。耳朵要分出两声，回声得比原来的声音晚 0.1 秒以上才行。声音 0.1 秒只走 34 米左右，一来一回，墙就得在 17 米以外。家里的墙才几米远，回声和原声混在一起，你只觉得声音变响、变长了一点。',
      figure: { kind: 'sim', sim: 'echo', caption: '拖动离山崖的远近：回声几秒后回来？离得多近时，就分不出回声了？' },
    },
    {
      nian: '回声要晚 0.1 秒以上才分得出？那能不能用回声量出山崖有多远？',
      dad: '能！喊一声，掐着表等回声。比如过了 2 秒才回来，声音一共走了大约 680 米，可这是一来一回的路，山崖离你只有一半，大约 340 米。很多人以为回声是山在“说话”，其实就是你自己的声音碰到山崖弹了回来。',
    },
    {
      nian: '一来一回要除以 2？那蝙蝠在黑夜里飞，也是靠回声认路吗？',
      dad: '对！蝙蝠一边飞一边发出很尖的叫声，频率高得人耳听不到，叫超声波。超声波碰到前面的虫子、树枝，弹回来被蝙蝠听到，它就知道东西在哪儿、离多远，这叫回声定位。课本里讲的倒车雷达、轮船上的声呐，用的也是这个办法。',
    },
    {
      nian: '轮船上的声呐也靠回声？那它能量出海有多深吗？',
      dad: '能。声呐朝海底发出一声超声波，等它从海底弹回来，看用了几秒。声音在海水里每秒走大约 1500 米，比如 4 秒后收到回声，一来一回是 6000 米，海深大约 3000 米。用回声测距，不用潜到海底，也能画出海底的样子。',
    },
    {
      nian: '我懂了！回声是声音碰到山崖弹回来的。回声要比原声晚 0.1 秒以上才分得出来，所以障碍物得在 17 米以外。量出回声的时间，乘声速再除以 2，就知道有多远。',
      dad: '说得好！到空旷安全的地方，找一面离你很远的高墙，用力拍一下手，听听有没有回声；再走近到只剩几步远拍一次，比比有什么不同。',
    },
  ],
  tip: '“0.1 秒”是大致的说法，每个人的耳朵不太一样；17 米是按每秒 340 米的声速算出来的。山崖要又大又硬，回声才明显；树林、草地这些软软的东西会把声音吸掉不少。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播；第3节 声的利用', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Echo Tube（回声要晚约 0.1 秒，反射面要在 17 米以外）', by: 'Exploratorium', url: 'https://www.exploratorium.edu/exhibits/echo-tube' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '声音碰壁弹回', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [1060, 460], size: [200, 600], color: '#c4ad87', from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[180, 560]], size: 150, from: 0 },
          { kind: 'wave', a: [260, 510], b: [950, 510], amplitude: 16, wavelength: 60, speed: 220, color: '#7a5cc4', from: 0.6 },
          { kind: 'wave', a: [950, 580], b: [260, 580], amplitude: 12, wavelength: 60, speed: 220, color: '#c2588f', from: 4.2 },
          { kind: 'label', at: [600, 590], pos: [600, 710], text: '回声', from: 5 },
          { kind: 'text', at: [600, 830], text: '弹回来的就是回声', from: 7 },
        ],
      },
      {
        turn: 1, title: '0.1 秒的门槛', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[180, 560]], size: 150, from: 0 },
          { kind: 'shape', shape: 'rect', at: [420, 480], size: [50, 420], color: '#d9cdb6', from: 0 },
          { kind: 'pulse', at: [260, 520], color: '#7a5cc4', radius: 160, from: 0.6 },
          { kind: 'text', at: [700, 200], text: '回声要晚 0.1 秒以上', from: 2 },
          { kind: 'count', at: [860, 460], label: '墙至少要隔', start: 0, end: 17, unit: '米', from: 4, over: 2 },
          { kind: 'text', at: [600, 830], text: '家里的墙太近了', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '掐表量距离', duration: 12,
        cues: [
          { kind: 'count', at: [280, 380], label: '回声用时', start: 0, end: 2, unit: '秒', from: 0.6, over: 1.5 },
          { kind: 'count', at: [600, 380], label: '声音走了', start: 0, end: 680, unit: '米', from: 2.2, over: 1.5 },
          { kind: 'count', at: [920, 380], label: '山崖距离', start: 0, end: 340, unit: '米', from: 4, over: 1.5 },
          { kind: 'text', at: [600, 560], text: '一来一回，除以 2', from: 5 },
          { kind: 'myth', wrong: '回声是山在说话', right: '声音碰到山崖弹回来', from: 7 },
        ],
      },
      {
        turn: 3, title: '蝙蝠回声定位', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🦇', path: [[290, 420]], size: 160, wobble: true, from: 0 },
          { kind: 'sprite', icon: '🦟', path: [[920, 430]], size: 90, wobble: true, from: 0 },
          { kind: 'wave', a: [370, 400], b: [870, 410], amplitude: 10, wavelength: 26, speed: 260, color: '#7a5cc4', from: 1 },
          { kind: 'wave', a: [870, 460], b: [370, 450], amplitude: 8, wavelength: 26, speed: 260, color: '#c2588f', from: 3.6 },
          { kind: 'label', at: [620, 400], pos: [620, 230], text: '超声波', from: 1.6 },
          { kind: 'text', at: [600, 830], text: '靠回声“看”路', from: 7 },
        ],
      },
      {
        turn: 4, title: '声呐量海深', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 550], size: [1100, 520], color: '#cfe5f7', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 820], size: [1100, 40], color: '#c4ad87', from: 0 },
          { kind: 'sprite', icon: '🚢', path: [[600, 250]], size: 160, from: 0 },
          { kind: 'arrow', path: [[520, 330], [520, 790]], color: '#7a5cc4', text: '超声波', draw: 2, from: 1 },
          { kind: 'arrow', path: [[690, 790], [690, 330]], color: '#c2588f', text: '回声', draw: 2, from: 3.2 },
          { kind: 'count', at: [940, 540], label: '海深大约', start: 0, end: 3000, unit: '米', from: 5.6, over: 1.5 },
        ],
      },
    ],
  },
};
