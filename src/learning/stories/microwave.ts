import type { Story, Vec } from './types';

/** 圆周上的点：从最上面开始，在屏幕上顺时针走一圈（首尾相接） */
function circle(cx: number, cy: number, r: number, count = 32): Vec[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / count;
    return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))] as const;
  });
}

const HOT = '#f03e3e';
const WARM = '#ffd43b';
const COLD = '#74c0fc';
const WAVE = '#9775fa';

export const microwave: Story = {
  slug: 'microwave',
  title: '微波炉怎么让饭变热，会从里往外热吗？',
  trigger: '小念把一碗剩饭放进微波炉转了一分钟，端出来吃第一口，碗边的饭烫得她直吸气；再往中间挖一勺，却还是凉的。',
  dialogue: [
    {
      nian: '爸爸，不是说微波炉是从里往外热的吗？为什么外面烫、中间还凉？',
      dad: '这是个很常见的误会。美国食品药品监督管理局专门说过：微波炉并不是从里往外热。食物比较厚的时候，外面一层主要被微波直接加热，里面主要靠外层的热一点点传进去。所以热的时间不够，就会外面烫、中间凉。',
      figure: { kind: 'sim', sim: 'microwave', caption: '拨到不同的时候，把这碗饭切开看看：哪里先热？热又是怎么跑到中间的？' },
    },
    {
      nian: '被微波直接加热……微波到底是什么东西？',
      dad: '微波也是一种电磁波，跟手机信号是亲戚，只是被用来做饭。微波炉里有个叫磁控管的零件，专门产生微波。微波在金属内壁之间来回反射，最后被食物吸收。美国航天局的科普说，微波炉用的微波，波长大约 12 厘米。',
    },
    {
      nian: '最后被食物吸收……吸收了微波，饭为什么就热了？',
      dad: '因为食物里有很多水。微波会让水分子不停地来回转动，转得飞快，分子之间互相摩擦、碰撞，就生了热，跟你使劲搓手会发热差不多。所以含水多的新鲜蔬菜热得特别快；干巴巴的东西，就没那么容易热起来。',
    },
    {
      nian: '新鲜蔬菜热得特别快……那为什么不能把金属碗放进去？',
      dad: '因为金属会把微波反射回去，食物就热得不均匀，还可能弄坏微波炉。玻璃、陶瓷和纸，微波能直接穿过去，这些容器自己不怎么吸收微波；你觉得碗烫手，多半是被里面的热饭焐热的。美国食品药品监督管理局也是这么提醒的。',
    },
    {
      nian: '被里面的热饭焐热的……那要怎样才能让整碗饭都热透？',
      dad: '热到一半拿出来搅一搅，把中间凉的翻到外面去；热完别急着吃，盖着放一会儿，让外层的热慢慢传到中间。东西越大越厚，越要多翻几次、多等一会儿，给热留出“走路”的时间。',
    },
    {
      nian: '我明白了！微波让食物里的水分子转起来、互相摩擦生热，外层先被微波加热，中间靠热慢慢传进去。所以微波炉不是从里往外热，热完要搅一搅、放一会儿。',
      dad: '说得对！下次热饭，转到一半停下来，用勺子分别尝一小口碗边和中间的饭，感觉一下差多少。',
    },
  ],
  tip: '从微波炉里端碗要用隔热手套，先小口试温度。不要空转微波炉，也不要放金属、锡纸进去；单独加热一杯清水容易突然沸腾溅出来，要按说明书的时间来。',
  sources: [
    { title: '物理 九年级 · 第二十一章 信息的传递 · 第2节 电磁波的海洋（微波是电磁波）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 九年级 · 第十三章 内能 · 第2节 内能（热传递）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Microwave Ovens（微波让水分子振动生热；微波炉不是从里往外热，厚食物的里面主要靠热传导；金属反射微波；玻璃、陶瓷、纸能透过微波；过热的清水会突然沸腾）', by: 'U.S. FDA（美国食品药品监督管理局）', url: 'https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-oven-radiation' },
    { title: 'Tour of the Electromagnetic Spectrum · Microwaves（微波炉用约 12 厘米的微波，让食物里的水和油脂分子转动生热）', by: 'NASA Science（美国航天局）', url: 'https://science.nasa.gov/ems/06_microwaves/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '外面烫，中间凉', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [460, 460], color: WARM, tint: { color: HOT, at: 1, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [300, 300], color: COLD, tint: { color: WARM, at: 2.5, over: 3 }, from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [140, 140], color: COLD, from: 0 },
          { kind: 'label', at: [790, 330], pos: [980, 220], text: '外层：已经烫了', from: 2 },
          { kind: 'label', at: [620, 470], pos: [980, 640], text: '中间：还凉着', from: 3.5 },
          { kind: 'myth', wrong: '微波炉是从里往外热', right: '外层先热，再往里传', from: 7 },
        ],
      },
      {
        turn: 1, title: '微波炉里的波', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [560, 530], size: [700, 380], color: '#495057', outline: true, from: 0 },
          { kind: 'shape', shape: 'rect', at: [1020, 470], size: [100, 150], color: '#868e96', text: '磁控管', from: 0.5 },
          { kind: 'arrow', path: [[960, 400], [760, 660], [560, 380], [360, 660], [300, 580]], color: WAVE, text: '来回反射', draw: 1.6, from: 1 },
          { kind: 'sprite', icon: '🍚', path: [[560, 650]], size: 110, from: 2 },
          { kind: 'count', at: [600, 200], label: '波长大约', start: 0, end: 12, unit: '厘米', from: 3.5 },
          { kind: 'text', at: [600, 830], text: '最后被食物吸收', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '水分子转起来', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [440, 440], color: '#fff3bf', from: 0 },
          { kind: 'particles', box: [430, 300, 340, 320], count: 14, color: '#e03131', motion: 'jitter', size: 18, from: 1 },
          { kind: 'label', at: [600, 300], pos: [960, 220], text: '水分子', from: 1.5 },
          { kind: 'pulse', at: [600, 460], color: '#e8590c', radius: 260, from: 3.5 },
          { kind: 'text', at: [600, 830], text: '转得飞快，摩擦生热', from: 7.5 },
        ],
      },
      {
        turn: 3, title: '容器怎么选', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🥣', path: [[320, 470]], size: 160, from: 0 },
          { kind: 'flow', path: [[320, 230], [320, 600]], color: WAVE, count: 4, speed: 200, from: 1 },
          { kind: 'label', at: [320, 560], pos: [320, 690], text: '陶瓷玻璃：能穿过', from: 2 },
          { kind: 'sprite', icon: '🥄', path: [[880, 500]], size: 150, from: 3 },
          { kind: 'arrow', path: [[740, 260], [870, 420], [1000, 260]], color: WAVE, text: '金属反射', draw: 0.8, from: 4 },
          { kind: 'text', at: [600, 830], text: '金属别进微波炉', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '搅一搅，等一等', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 460], size: [420, 420], color: '#ffc078', from: 0 },
          { kind: 'sprite', icon: '🥄', path: circle(600, 460, 120), size: 90, travel: 3, from: 0.5 },
          { kind: 'flow', path: circle(600, 460, 170), color: HOT, count: 8, speed: 160, loop: true, from: 4 },
          { kind: 'label', at: [770, 460], pos: [1000, 300], text: '热慢慢走进去', from: 4.5 },
          { kind: 'text', at: [600, 830], text: '热透了再吃', from: 7.5 },
        ],
      },
    ],
  },
};
