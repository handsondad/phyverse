import type { Story } from './types';

const WIRE = '#5d4e37';
const LOOP = [[200, 365], [200, 250], [1000, 250], [1000, 650], [200, 650], [200, 535]] as const;

export const bulbBright: Story = {
  slug: 'bulb-bright',
  title: '小灯泡接一节电池和两节电池，亮度为什么不一样？',
  trigger: '停电的晚上，小念的手电筒只装了一节电池，灯光昏昏的；爸爸又塞进去一节，“咔”一下，光一下子亮了好多。',
  dialogue: [
    {
      nian: '爸爸，手电筒装两节电池，为什么比一节亮得多？',
      dad: '因为两节电池的电压更大，推得更有劲。一节干电池的电压是 1.5 伏，两节串起来就是 3 伏。电压就像推着电荷往前走的力气，力气大了，每秒钟流过灯丝的电荷就多，电流变大，灯就更亮。',
    },
    {
      nian: '电流变大……可电池给出的电流不是固定的吗？',
      dad: '不是。电池给的是电压，电流有多大，还要看电路里的电阻拦得多厉害。灯丝又细又长，电荷挤过去很费劲，这就是电阻。电压推、电阻拦，电流由这两样一起决定：电流等于电压除以电阻，这就是欧姆定律。',
      eq: 'I = U / R',
      figure: { kind: 'sim', sim: 'ohm', caption: '换一换电池节数，再串上第二盏灯：电流变了多少？灯更亮还是更暗？' },
    },
    {
      nian: '电阻拦得多厉害……那两盏灯串在一起，会怎么样？',
      dad: '两盏灯一个接一个，电荷要挤过两段灯丝，电阻变大了，同样的电池推出来的电流就变小，两盏灯都比只接一盏时暗。很多人以为电池总是给出固定的电流，其实电流的大小要看电压和电阻：电压大了电流就大，电阻大了电流就小。',
    },
    {
      nian: '电压大了电流就大……那两节电池，电流是不是正好变成 2 倍？',
      dad: '差一点点。英国物理学会的教学资料提醒过：电池从一节加到两节，电流确实变大了，却到不了 2 倍。因为电流大了，灯丝更热，里面的原子晃得更厉害，电荷更难挤过去，电阻也跟着变大了。所以欧姆定律最适合电阻不变的导体。',
    },
    {
      nian: '灯丝更热电阻就变大……那电池加到很多节，灯会不会一直更亮？',
      dad: '不会一直亮下去。电压加得太多，电流太大，灯丝热得受不了就会烧断，英国物理学会的资料也提到了这一点。所以小灯泡上都标着它该用的电压，比如 2.5 伏，按标的电压去接，灯才又亮又安全。',
    },
    {
      nian: '我明白了！电压推、电阻拦，电流由这两样一起决定。两节电池电压大，电流就大，灯更亮；两盏灯串起来电阻大，电流就小，灯就暗了。',
      dad: '说得对！拿一节和两节电池分别接同一个小灯泡比比亮度，再把两个灯泡串起来接两节电池，看看和一个灯泡接一节时谁更亮。',
    },
  ],
  tip: '互动图里灯丝电阻随温度变大，是按常见小灯泡估算的示意。做实验只用干电池，不要把电池两头直接用导线连起来（短路会发烫），更不能拿家里的插座做实验。',
  sources: [
    { title: '物理 九年级全一册 · 第十七章 欧姆定律 · 第2节 欧姆定律；第十八章 电功率 · 第3节 测量小灯泡的电功率', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Extra batteries: the electric circuit model（多一节电池推得更有劲，电流变大）', by: 'IOPSpark · Institute of Physics（英国物理学会）', url: 'https://spark.iop.org/extra-batteries-electric-circuit-model' },
    { title: 'Just how big can the current get?（电流变大但不到 2 倍：灯丝变热电阻变大，最后会烧断）', by: 'IOPSpark · Institute of Physics（英国物理学会）', url: 'https://spark.iop.org/just-how-big-can-current-get' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '两节更亮', duration: 12,
        cues: [
          { kind: 'count', at: [300, 300], label: '一节电池', start: 0, end: 1.5, unit: '伏', from: 0.5 },
          { kind: 'count', at: [900, 300], label: '两节串起来', start: 0, end: 3, unit: '伏', from: 2 },
          { kind: 'shape', shape: 'circle', at: [300, 560], size: [110, 110], color: '#f3ecd6', from: 1 },
          { kind: 'shape', shape: 'circle', at: [900, 560], size: [110, 110], color: '#ffe066', motion: 'pulse', from: 2.5 },
          { kind: 'pulse', at: [900, 560], color: '#ffd43b', radius: 120, from: 3 },
          { kind: 'text', at: [600, 830], text: '电压大，推得有劲', from: 7 },
        ],
      },
      {
        turn: 1, title: '电压推电阻拦', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [200, 450], size: [90, 170], color: '#ffe8a3', text: '电池', from: 0 },
          { kind: 'ray', path: LOOP, color: WIRE, draw: 1.4, from: 0.4 },
          { kind: 'shape', shape: 'rect', at: [600, 250], size: [200, 60], color: '#f4c27a', text: '灯丝', from: 1 },
          { kind: 'arrow', path: [[290, 560], [290, 340]], color: '#3553a6', text: '电压推', draw: 0.6, from: 2 },
          { kind: 'label', at: [600, 280], pos: [600, 420], text: '电阻拦', from: 3 },
          { kind: 'formula', at: [600, 560], text: 'I = U / R', from: 5 },
          { kind: 'text', at: [600, 830], text: '欧姆定律', from: 8 },
        ],
      },
      {
        turn: 2, title: '串两盏更暗', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [200, 450], size: [90, 170], color: '#ffe8a3', text: '电池', from: 0 },
          { kind: 'ray', path: LOOP, color: WIRE, draw: 1.4, from: 0.4 },
          { kind: 'shape', shape: 'circle', at: [480, 250], size: [90, 90], color: '#f3ecd6', from: 1.4 },
          { kind: 'shape', shape: 'circle', at: [760, 250], size: [90, 90], color: '#f3ecd6', from: 1.8 },
          { kind: 'label', at: [620, 280], pos: [620, 460], text: '电阻变大，电流变小', from: 3 },
          { kind: 'myth', wrong: '电池总给出固定的电流', right: '电流由电压和电阻决定', from: 7 },
        ],
      },
      {
        turn: 3, title: '到不了 2 倍', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 300], label: '电流', start: 0.4, end: 0.7, color: '#3553a6', over: 3, from: 1 },
          { kind: 'shape', shape: 'rect', at: [600, 540], size: [300, 90], color: '#f4c27a', tint: { color: '#ff6b3d', at: 3, over: 3 }, text: '灯丝变热', from: 0.5 },
          { kind: 'particles', box: [460, 600, 280, 70], count: 12, color: '#8b7a5c', motion: 'jitter', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '电流大了，到不了 2 倍', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '别接太多', duration: 12,
        cues: [
          { kind: 'count', at: [300, 300], label: '灯泡标着', start: 0, end: 2.5, unit: '伏', from: 1 },
          { kind: 'shape', shape: 'circle', at: [820, 500], size: [130, 130], color: '#ffe066', tint: { color: '#9a9488', at: 5, over: 0.3 }, from: 0.5 },
          { kind: 'pulse', at: [820, 500], color: '#ffd43b', radius: 140, from: 1 },
          { kind: 'sprite', icon: '💥', path: [[820, 380]], size: 90, from: 5 },
          { kind: 'text', at: [600, 830], text: '按标的电压去接', from: 7 },
        ],
      },
    ],
  },
};
