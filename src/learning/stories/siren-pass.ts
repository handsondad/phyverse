import type { Story } from './types';

export const sirenPass: Story = {
  slug: 'siren-pass',
  title: '救护车开过去时，声音为什么一下变低？',
  trigger: '小念在路边等红灯，一辆救护车“嘀嘟嘀嘟”开过来，声音尖尖的；刚从身边开过去，声音一下子就变低了。',
  dialogue: [
    {
      nian: '爸爸，救护车开过去以后，是司机把警笛换了个调吗？',
      dad: '警笛自己一直发出同样的声音，没换调。变的是传到你耳朵里的声波。警笛每秒向四周发出几百个声波，像一圈圈涟漪；车往你这边开，后一圈刚发出，车已经往前挪了一点，一圈圈声波就被挤密了。',
    },
    {
      nian: '声波被挤密了？挤密了为什么听起来更尖？',
      dad: '挤密了，每秒钟传到你耳朵的声波就更多，也就是你听到的频率变高，音调就更尖。车开过去以后正好反过来：它一边发声一边离你远去，声波被拉稀，每秒传到耳朵的变少，音调就一下变低了。这叫多普勒效应。',
      figure: { kind: 'sim', sim: 'doppler', caption: '换一换救护车的速度：车前、车后的声波哪边密？两边各听到多高的音？' },
    },
    {
      nian: '多普勒效应？那车开得越快，高低差得越多吗？',
      dad: '对。假如警笛的音是每秒振动 700 次，也就是 700 赫兹，车以每秒 30 米的速度开过来，你听到的大约是 768 赫兹；开走以后，变成大约 643 赫兹。车越快，前后差得越多。很多人以为车开走了警笛换了调，其实警笛没变，是声波被挤密或拉稀了。',
    },
    {
      nian: '声波被挤密或拉稀……那如果我跟着救护车一起跑呢？',
      dad: '只要你和车之间的距离不变，声波就既没被挤密也没被拉稀，你听到的就是警笛原来的音。坐在救护车里的医生、护士，听到的警笛一直是同一个调，不会忽高忽低。只有声源和你互相靠近或者远离时，音调才会变。',
    },
    {
      nian: '互相靠近或者远离才会变？那这个本事能用来做什么？',
      dad: '用处很多。交警的测速仪发出电波，碰到汽车再弹回来，看频率变了多少就知道车速。医院里的彩超用超声波测血液流得多快。天文学家发现遥远星系的光频率变低、偏向红色，就知道它们正在离我们远去。',
    },
    {
      nian: '我懂了！警笛的音其实没变：车开过来，声波被挤密，听着更高；车开走，声波被拉稀，听着更低。这就是多普勒效应。',
      dad: '说得好！下次站在路边，听听呼啸而过的汽车、摩托车，是不是也是“呜——”地从高往低一落。',
    },
  ],
  tip: '文中的数字按声速每秒 340 米、警笛 700 赫兹估算，真实的警笛常常有两个音来回切换。互动图为了看清楚，把车画得比真实的快得多，只看声波哪边密、哪边稀就行。',
  sources: [
    { title: '物理 选择性必修 第一册 · 第三章 机械波 · 第5节 多普勒效应', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Doppler Effect（声源运动时听到的频率公式）', by: 'HyperPhysics · Georgia State University', url: 'https://www.hyperphysics.gsu.edu/hbase/Sound/dopp.html' },
    { title: 'Explained: the Doppler effect（警笛、测速雷达、医学成像、天文红移）', by: 'MIT News', url: 'https://news.mit.edu/2010/explained-doppler-0803' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '警笛没换调', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚑', path: [[720, 480]], size: 160, from: 0 },
          { kind: 'pulse', at: [720, 470], color: '#7a5cc4', radius: 260, from: 0.8 },
          { kind: 'label', at: [640, 380], pos: [640, 220], text: '一圈圈声波', from: 1.6 },
          { kind: 'sprite', icon: '🧒', path: [[180, 520]], size: 120, from: 2.4 },
          { kind: 'text', at: [600, 830], text: '警笛一直不变', from: 7 },
        ],
      },
      {
        turn: 1, title: '前密后稀', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🚑', path: [[720, 480]], size: 160, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[150, 520]], size: 120, from: 0 },
          { kind: 'wave', a: [620, 470], b: [240, 470], amplitude: 22, wavelength: 46, speed: 160, color: '#e8590c', from: 1 },
          { kind: 'label', at: [430, 440], pos: [400, 280], text: '前面：挤密', from: 1.6 },
          { kind: 'wave', a: [820, 470], b: [1100, 470], amplitude: 22, wavelength: 130, speed: 160, color: '#7a5cc4', from: 4 },
          { kind: 'label', at: [960, 440], pos: [940, 280], text: '后面：拉稀', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '这叫多普勒效应', from: 8 },
        ],
      },
      {
        turn: 2, title: '越快差越多', duration: 12,
        cues: [
          { kind: 'count', at: [330, 360], label: '开过来', start: 0, end: 768, unit: '赫兹', from: 1, over: 2 },
          { kind: 'count', at: [870, 360], label: '开走后', start: 0, end: 643, unit: '赫兹', from: 3.5, over: 2 },
          { kind: 'sprite', icon: '🚑', path: [[1050, 540], [150, 540]], size: 120, travel: 6, from: 0.4 },
          { kind: 'myth', wrong: '车开走了警笛换了调', right: '警笛没变，波被挤密拉稀', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '一起跑不变', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🚑', path: [[1050, 470], [420, 470]], size: 140, travel: 8, from: 0.4 },
          { kind: 'sprite', icon: '🏃', path: [[870, 500], [240, 500]], size: 110, travel: 8, from: 0.4 },
          { kind: 'text', at: [600, 250], text: '距离不变：音不变', from: 3 },
          { kind: 'text', at: [600, 830], text: '车里的人听不出变化', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '测速与看星系', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🚓', path: [[260, 460]], size: 160, from: 0.4 },
          { kind: 'label', at: [260, 520], pos: [260, 680], text: '测车速', from: 1 },
          { kind: 'sprite', icon: '🏥', path: [[600, 460]], size: 160, from: 3.6 },
          { kind: 'label', at: [600, 520], pos: [600, 680], text: '彩超测血流', from: 4.2 },
          { kind: 'sprite', icon: '🌌', path: [[940, 460]], size: 160, from: 6.6 },
          { kind: 'label', at: [940, 520], pos: [940, 680], text: '星系在远去', from: 7.2 },
        ],
      },
    ],
  },
};
