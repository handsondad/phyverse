import type { Story } from './types';

export const tugOfWar: Story = {
  slug: 'tug-of-war',
  title: '拔河时绳子拉两队的力一样大，为什么还分输赢？',
  trigger: '学校运动会拔河比赛，小念班上憋足了劲，还是被隔壁班一点点拖过了线。',
  dialogue: [
    {
      nian: '爸爸，我们拉得那么用力，还是输了！是不是隔壁班拉绳子的力比我们大？',
      dad: '其实不是。一根绳子拉两头的力是一样大的：你们用多大的力拉绳子，绳子就用多大的力拉隔壁班；隔壁班用多大的力拉绳子，绳子也用多大的力拉你们。所以绳子拉两队的力，从头到尾都一样大。',
    },
    {
      nian: '绳子拉两队的力一样大？那为什么还能分出输赢呢？',
      dad: '因为两队不光被绳子拉着，脚下还有地面在帮忙。你们用脚往前使劲蹬着地，地面就用摩擦力把你们往后推，跟绳子对着干。哪队脚下抓得牢，地面就能顶住绳子；哪队先抓不住，就被绳子拖着往前滑。输赢看的是脚下。',
      figure: { kind: 'sim', sim: 'tug', caption: '拖动两队的体重，再给右队换上袜子：绳子上的力总是一样大，谁脚下抓得牢谁就赢。' },
    },
    {
      nian: '脚下抓得牢……地面的摩擦力怎样才能大一点？',
      dad: '有两个办法。一是人重一点，压在地上的力大，摩擦就大，所以正式的拔河比赛每队 8 个人，还要按全队的体重分级别来比。二是鞋底要防滑，穿着袜子在光滑的地上拔河，一拉就滑。身子往后倒、脚跟使劲踩住地，也能让地面顶得更牢。',
    },
    {
      nian: '身子往后倒也有用？那我拉绳子的时候，绳子是不是也在拉我？',
      dad: '对，力的作用是相互的：你拉绳子，绳子同时用一样大的力拉你；你蹬地，地也同时推你。就像你用手推墙，墙也在推你的手，所以手会觉得疼。这样的一对力总是一样大、方向相反，同时出现、同时消失。',
    },
    {
      nian: '一样大、方向相反……那大人和我拔河，他拉我的力也和我拉他的一样大吗？',
      dad: '一样大！大人赢，不是因为拉你的力更大，而是他更重、脚下抓得更牢：同样大的拉力，他脚下的摩擦顶得住，你的顶不住，你就被拉过去了。很多人以为赢的一队力气更大，其实绳子两头一样大，比的是谁站得稳。',
    },
    {
      nian: '我懂了！力的作用是相互的，绳子拉两队的力永远一样大。拔河比的是谁脚下抓得牢：人重一点、鞋底防滑、身子往后倒，地面的摩擦就大，就能赢。',
      dad: '完全正确！下次拔河，记得穿有花纹的运动鞋，大家喊着口号一起用力。还可以做个小实验：把两个弹簧测力计的钩子勾在一起，两个人往两边拉，看看两个读数是不是总一样。',
    },
  ],
  tip: '“绳子两头拉力一样大”是把绳子看成很轻的绳子，初中和高中都这样处理。互动图里鞋子和袜子的摩擦大小是示意值。拔河时别把绳子缠在手腕或身上，要松手就大家一起松，以免摔倒受伤。弹簧测力计对拉的实验教材里也有，可以照着做。',
  sources: [
    { title: '物理 八年级下册 · 第七章 力 · 第1节 力（力的作用是相互的）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '物理 八年级下册 · 第八章 运动和力 · 第3节 摩擦力', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'TWIF Rules Manual 2025（国际拔河联合会比赛规则：每队人数、体重级别）', by: 'Tug of War International Federation', url: 'https://tugofwar-twif.org/wp-content/uploads/2025/08/TWIF-Rules-Manual-2025-final-edition-II-1.pdf' },
    { title: 'Newton’s Laws of Motion（牛顿运动定律）', by: 'NASA Glenn Research Center', url: 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '绳子两头', duration: 11,
        cues: [
          { kind: 'bond', a: [180, 460], b: [1020, 460], color: '#b08850', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 485], size: [24, 70], color: '#d64545', from: 0.3 },
          { kind: 'sprite', icon: '🧍', path: [[150, 450]], size: 140, from: 0.5 },
          { kind: 'sprite', icon: '🧍', path: [[1050, 450]], size: 140, from: 0.8 },
          { kind: 'arrow', path: [[290, 370], [460, 370]], color: '#8b5cf6', text: '绳子拉左队', from: 2 },
          { kind: 'arrow', path: [[910, 370], [740, 370]], color: '#8b5cf6', text: '绳子拉右队', from: 3 },
          { kind: 'text', at: [600, 760], text: '两头的拉力一样大', from: 5 },
        ],
      },
      {
        turn: 1, title: '比的是脚下', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 570], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [610, 410], size: [760, 10], color: '#b08850', slide: { to: [490, 410], at: 5, over: 3 }, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[210, 480]], size: 130, from: 0, to: 5 },
          { kind: 'sprite', icon: '🧍', path: [[1010, 480]], size: 130, from: 0, to: 5 },
          { kind: 'sprite', icon: '🧍', path: [[210, 480], [90, 480]], size: 130, travel: 3, from: 5 },
          { kind: 'sprite', icon: '🧍', path: [[1010, 480], [890, 480]], size: 130, travel: 3, from: 5 },
          { kind: 'arrow', path: [[260, 630], [60, 630]], color: '#2c774a', text: '地面帮左队', from: 1.5 },
          { kind: 'arrow', path: [[940, 630], [1040, 630]], color: '#3a6fb0', text: '地面帮右队', from: 2.6 },
          { kind: 'myth', wrong: '赢的队拉绳子的力更大', right: '两头一样大，比谁脚下稳', from: 8 },
        ],
      },
      {
        turn: 2, title: '抓得更牢', duration: 11,
        cues: [
          { kind: 'sprite', icon: '👟', path: [[260, 330]], size: 110, from: 0.4 },
          { kind: 'meter', at: [720, 330], label: '运动鞋的抓地', start: 0, end: 0.8, color: '#2c774a', from: 1 },
          { kind: 'sprite', icon: '🧦', path: [[260, 530]], size: 110, from: 2.4 },
          { kind: 'meter', at: [720, 530], label: '只穿袜子', start: 0, end: 0.3, from: 3 },
          { kind: 'count', at: [600, 750], label: '正式比赛每队', start: 0, end: 8, unit: '人', over: 1.5, from: 5.5 },
        ],
      },
      {
        turn: 3, title: '力是成对的', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [900, 460], size: [70, 440], color: '#c9bca6', from: 0 },
          { kind: 'sprite', icon: '✋', path: [[790, 460]], size: 130, from: 0.5 },
          { kind: 'arrow', path: [[700, 380], [860, 380]], color: '#e0762b', text: '手推墙', from: 1.4 },
          { kind: 'arrow', path: [[860, 540], [700, 540]], color: '#3a6fb0', text: '墙推手', from: 2.6 },
          { kind: 'text', at: [480, 760], text: '一样大、方向相反', from: 4.5 },
        ],
      },
      {
        turn: 4, title: '大人和我', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 590], size: [1200, 14], color: '#8b7a5c', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [700, 10], color: '#b08850', slide: { to: [740, 470], at: 5, over: 3.5 }, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[230, 535]], size: 110, from: 0, to: 5 },
          { kind: 'sprite', icon: '🧍', path: [[960, 500]], size: 180, from: 0, to: 5 },
          { kind: 'sprite', icon: '🧍', path: [[230, 535], [370, 535]], size: 110, travel: 3.5, from: 5 },
          { kind: 'sprite', icon: '🧍', path: [[960, 500], [1100, 500]], size: 180, travel: 3.5, from: 5 },
          { kind: 'arrow', path: [[320, 360], [470, 360]], color: '#8b5cf6', text: '绳子拉我', from: 1.5, to: 5 },
          { kind: 'arrow', path: [[880, 360], [730, 360]], color: '#8b5cf6', text: '绳子拉大人', from: 2.4, to: 5 },
          { kind: 'text', at: [600, 770], text: '比的是谁站得稳', from: 7.5 },
        ],
      },
    ],
  },
};
