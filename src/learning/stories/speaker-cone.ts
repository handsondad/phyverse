import type { Story } from './types';

const COPPER = '#c77d3a';
const HOT = '#e8590c';
const CONE = '#e8dcc6';
const AIR = '#8fb8d8';

export const speakerCone: Story = {
  slug: 'speaker-cone',
  title: '喇叭是怎么把电变成声音的？',
  trigger: '小念戴着耳机听故事。一只旧耳机坏了，爸爸拆开给她看：里面只有一小块磁铁、一圈细细的铜线和一张薄薄的膜。',
  dialogue: [
    {
      nian: '爸爸，喇叭里又没有人在说话，它是怎么把电变成声音的？',
      dad: '靠磁场推电流。喇叭里有一块磁铁，旁边套着一个能前后滑动的线圈，线圈粘在纸盆或薄膜上。电流一流过线圈，线圈在磁场里就受到力，被推出去或者拉回来，纸盆跟着动，推动空气，声音就出来了。课本里说，声音是由物体振动产生的。',
    },
    {
      nian: '被推出去或者拉回来……它怎么知道什么时候推、什么时候拉？',
      dad: '秘密在电流里。手机把声音变成一股忽大忽小、来回改变方向的电流送给喇叭：电流朝这边流，线圈被推出去；朝那边流，又被拉回来。电流每秒来回多少次，纸盆就每秒振多少次。美国麻省理工学院的课程资料就是这样讲喇叭的。',
      figure: { kind: 'sim', sim: 'speaker', caption: '换一换低音、高音，再调一调音量：纸盆振得多快、多猛？' },
    },
    {
      nian: '每秒振多少次……那声音的高低也是电流决定的吗？',
      dad: '对。电流来回得快，纸盆振得快，声音就高；来回得慢，声音就低，比如每秒 100 次是低沉的“嗡嗡”声，每秒 1600 次就尖多了。电流越大，线圈受的力越大，纸盆振得越猛，声音越响。麻省理工学院的资料还说，手机送出的电流太弱，要先用放大器放大。',
    },
    {
      nian: '要先用放大器放大……那电线里传过来的，就是声音本身吗？',
      dad: '不是，电线里跑的是电流。很多人以为声音是顺着电线钻进耳机的，其实声音先被话筒变成忽大忽小的电流，送到喇叭里，再靠磁场推着纸盆振动，重新变回声音。所以耳机里的线圈断了，电流过不去，声音就没了。',
    },
    {
      nian: '重新变回声音……那话筒是不是把这件事倒过来做？',
      dad: '正是！动圈式话筒的构造跟喇叭很像：你对着它说话，声音推着薄膜振动，薄膜带着线圈在磁铁旁边前后移动，线圈里就生出忽大忽小的电流，这就是课本里“磁生电”讲的电磁感应。喇叭和话筒，一个把电变成振动，一个把振动变成电。',
    },
    {
      nian: '我明白了！喇叭里的线圈在磁场里受力，电流来回变，线圈就被推出去、拉回来，带着纸盆振动发出声音。电流变得越快，声音越高；电流越大，声音越响。',
      dad: '说得对！把手机音量调大一点，在喇叭前面放几粒米，放一段低音多的音乐，看看米粒会不会跟着跳。',
    },
  ],
  tip: '听耳机音量别开太大，时间也别太长，会伤耳朵。不要拆插电的音箱。互动图里纸盆的振动放慢了，真实的快得看不清。',
  sources: [
    { title: '物理 九年级全一册 · 第二十章 电与磁 · 第4节 电动机；第5节 磁生电（动圈式话筒）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'How Speakers Work（音圈在磁场中受力带动纸盆；频率决定音调、幅度决定响度；需要放大器）', by: 'MIT 2.972 · Massachusetts Institute of Technology（美国麻省理工学院）', url: 'https://web.mit.edu/2.972/www/reports/speaker/speaker.html' },
    { title: 'How A Speaker Works（交变电流让线圈在环形磁铁里振动，带动纸盆）', by: 'Molecular Expressions · Florida State University / National MagLab（美国佛罗里达州立大学）', url: 'https://micro.magnet.fsu.edu/electromag/java/speaker/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '推着纸盆动', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [280, 470], size: [150, 220], color: '#6c757d', text: '磁铁', from: 0 },
          { kind: 'shape', shape: 'rect', at: [400, 470], size: [70, 110], color: COPPER, text: '线圈', motion: 'wiggle', from: 1 },
          { kind: 'shape', shape: 'rect', at: [520, 470], size: [110, 360], color: CONE, text: '纸盆', motion: 'wiggle', from: 1.5 },
          { kind: 'wave', a: [600, 470], b: [1120, 470], amplitude: 30, wavelength: 140, speed: 220, color: AIR, from: 3 },
          { kind: 'text', at: [600, 830], text: '振动发出声音', from: 7 },
        ],
      },
      {
        turn: 1, title: '跟着电流振', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 470], size: [90, 130], color: COPPER, text: '线圈', slide: { to: [470, 470], at: 2, over: 0.4 }, from: 0 },
          { kind: 'arrow', path: [[400, 340], [560, 340]], color: HOT, text: '推出去', draw: 0.5, from: 2, to: 5 },
          { kind: 'arrow', path: [[560, 620], [400, 620]], color: '#3553a6', text: '拉回来', draw: 0.5, from: 5.5 },
          { kind: 'label', at: [440, 530], pos: [800, 640], text: '电流换了方向', from: 5.5 },
          { kind: 'text', at: [600, 830], text: '电流来回，纸盆就振', from: 8 },
        ],
      },
      {
        turn: 2, title: '高低和响轻', duration: 12,
        cues: [
          { kind: 'count', at: [330, 300], label: '低音每秒', start: 0, end: 100, unit: '次', from: 0.5 },
          { kind: 'count', at: [870, 300], label: '高音每秒', start: 0, end: 1600, unit: '次', from: 2.5 },
          { kind: 'particles', box: [200, 450, 260, 160], count: 10, color: AIR, motion: 'jitter', from: 1 },
          { kind: 'particles', box: [740, 450, 260, 160], count: 22, color: AIR, motion: 'jitter', from: 3 },
          { kind: 'sprite', icon: '🔊', path: [[600, 530]], size: 120, from: 5 },
          { kind: 'text', at: [600, 830], text: '电流越大，声音越响', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '电线里是电流', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🎤', path: [[220, 420]], size: 120, from: 0 },
          { kind: 'ray', path: [[300, 420], [900, 420]], color: '#5d4e37', draw: 1, from: 1 },
          { kind: 'flow', path: [[300, 420], [900, 420]], color: '#ffd43b', count: 8, speed: 260, from: 2 },
          { kind: 'sprite', icon: '🎧', path: [[980, 420]], size: 120, from: 1 },
          { kind: 'label', at: [600, 430], pos: [600, 560], text: '跑的是电流', from: 3 },
          { kind: 'myth', wrong: '电线里传的就是声音', right: '传的是忽大忽小的电流', from: 7 },
        ],
      },
      {
        turn: 4, title: '话筒倒过来', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🔊', path: [[330, 430]], size: 140, from: 0.5 },
          { kind: 'sprite', icon: '🎤', path: [[870, 430]], size: 140, from: 1.5 },
          { kind: 'label', at: [330, 500], pos: [330, 640], text: '电变成振动', from: 3 },
          { kind: 'label', at: [870, 500], pos: [870, 640], text: '振动变成电', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '一个推，一个生电', from: 7 },
        ],
      },
    ],
  },
};
