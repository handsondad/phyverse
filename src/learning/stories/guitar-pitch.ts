import type { Story } from './types';

export const guitarPitch: Story = {
  slug: 'guitar-pitch',
  title: '琴弦按短、拧紧，声音为什么变高？',
  trigger: '小念学尤克里里，手指往琴颈上一按，声音就变尖；爸爸拧紧琴头的旋钮，声音也跟着变高。小念使劲一拨，声音却只是更响了。',
  dialogue: [
    {
      nian: '爸爸，同一根弦，为什么按住不同的地方，声音高低就不一样？',
      dad: '声音是弦振动出来的。弦每秒来回振动多少次，叫频率；频率越高，我们听到的声音越尖，这个高低叫音调。手指一按，能振动的那段弦变短了，短的弦振得更快，频率变高，音调就变高了。',
    },
    {
      nian: '短的弦振动更快？那拧紧旋钮为什么也会变高？',
      dad: '拧紧以后，弦被拉得更紧，弹回来的劲更大，来回振动也更快。弦越短、拉得越紧、越细，振动就越快，音调越高。澳大利亚新南威尔士大学的乐器声学资料讲的也正是这几条：调音时把弦拧紧，音就变高。',
      figure: { kind: 'sim', sim: 'guitar', caption: '拖动能振动的弦长、弦拧得多紧：每秒振动几次？大约是哪个音？' },
    },
    {
      nian: '弦越细音调越高？那我使劲拨，为什么声音只是更响，不会变高？',
      dad: '使劲拨，弦摆动的幅度大了，推动空气更猛，声音就更响，这叫响度大。可它每秒振动的次数几乎没变，所以音调不变。很多人以为用力弹声音会变高，其实用力只管响不响，高不高要看振动得快不快。',
    },
    {
      nian: '高不高要看振动快不快？那人能听到多高、多低的声音？',
      dad: '一般说来，人耳能听到每秒振动大约 20 次到 20000 次的声音，频率的单位叫赫兹。比 20000 赫兹还高的叫超声波，蝙蝠就靠它认路；比 20 赫兹还低的叫次声波，地震、台风发生时都会产生次声波，人耳都听不到。',
    },
    {
      nian: '次声波人耳听不到……那吉他六根弦一样长，为什么音调都不一样？',
      dad: '因为它们粗细不一样。粗的弦更重，振动起来慢，音调就低；细的弦轻，振动得快，音调高。小提琴、吉他都是这样，低音弦又粗又重。演奏时，乐手再用手指按住不同位置改变弦长，就能弹出一首完整的曲子。',
    },
    {
      nian: '我懂了！音调高低看振动的频率：弦越短、越紧、越细，振动越快，音调越高。用力弹只是振动幅度大，声音更响，音调不变。',
      dad: '说得好！把一根橡皮筋套在打开的空铅笔盒上拨一拨，再把它拉得更紧一些拨一拨，或者用手指按住一半再拨，听听音调怎么变。',
    },
  ],
  tip: '互动图里的频率是按一根普通吉他弦估算的，真实的乐器还和弦的材料有关。人耳能听到的范围因人而异，“20 到 20000 赫兹”是课本里的大致说法，新南威尔士大学的资料写的是大约 15 赫兹到 2 万赫兹。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第2节 声音的特性', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Strings, standing waves and harmonics（弦长、拉力、粗细决定音高）', by: 'Music Acoustics · UNSW Sydney', url: 'https://www.phys.unsw.edu.au/jw/strings.html' },
    { title: 'Violin acoustics: an introduction（频率与音调、人耳听觉范围）', by: 'Music Acoustics · UNSW Sydney', url: 'https://phys.unsw.edu.au/jw/violintro.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '弦短，音就高', duration: 12,
        cues: [
          { kind: 'wave', a: [200, 340], b: [1000, 340], amplitude: 24, wavelength: 260, speed: 120, color: '#7a5cc4', from: 0.4 },
          { kind: 'label', at: [600, 330], pos: [600, 220], text: '长弦：振得慢', from: 1 },
          { kind: 'sprite', icon: '👆', path: [[470, 600]], size: 90, from: 2.6 },
          { kind: 'wave', a: [500, 560], b: [1000, 560], amplitude: 24, wavelength: 90, speed: 120, color: '#e8590c', from: 3 },
          { kind: 'label', at: [760, 560], pos: [760, 690], text: '短弦：振得快', from: 3.6 },
          { kind: 'text', at: [600, 830], text: '频率越高，音调越高', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '拧紧也变高', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 230], label: '弦拉得多紧', start: 0.3, end: 0.9, color: '#7a5cc4', from: 0.6, over: 3 },
          { kind: 'wave', a: [200, 460], b: [1000, 460], amplitude: 22, wavelength: 90, speed: 160, color: '#e8590c', from: 1 },
          { kind: 'text', at: [600, 830], text: '短、紧、细：音调高', from: 6 },
        ],
      },
      {
        turn: 2, title: '用力只变响', duration: 12,
        cues: [
          { kind: 'wave', a: [260, 300], b: [1000, 300], amplitude: 12, wavelength: 100, speed: 140, color: '#7a5cc4', from: 0.4 },
          { kind: 'label', at: [260, 300], pos: [200, 200], text: '轻轻拨', from: 0.8 },
          { kind: 'wave', a: [260, 500], b: [1000, 500], amplitude: 44, wavelength: 100, speed: 140, color: '#e8590c', from: 2.4 },
          { kind: 'label', at: [260, 500], pos: [200, 630], text: '使劲拨', from: 2.8 },
          { kind: 'myth', wrong: '用力弹声音会变高', right: '用力只变响，高低看频率', from: 6.8 },
        ],
      },
      {
        turn: 3, title: '听得见的范围', duration: 12,
        cues: [
          { kind: 'count', at: [300, 400], label: '最低大约', start: 0, end: 20, unit: '赫兹', from: 0.6, over: 1.5 },
          { kind: 'count', at: [900, 400], label: '最高大约', start: 0, end: 20000, unit: '赫兹', from: 2.2, over: 2 },
          { kind: 'sprite', icon: '🦇', path: [[960, 640]], size: 120, wobble: true, from: 5 },
          { kind: 'label', at: [960, 640], pos: [680, 600], text: '更高：超声波', from: 5.4 },
          { kind: 'text', at: [600, 830], text: '再低是次声波', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '粗弦音低', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 340], size: [800, 26], color: '#7d6a4b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [800, 8], color: '#b79a6b', from: 0 },
          { kind: 'label', at: [900, 340], pos: [960, 230], text: '粗：音调低', from: 1 },
          { kind: 'label', at: [900, 560], pos: [960, 680], text: '细：音调高', from: 2 },
          { kind: 'text', at: [600, 830], text: '低音弦又粗又重', from: 6 },
        ],
      },
    ],
  },
};
