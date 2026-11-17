import type { Story } from './types';

export const flagPulley: Story = {
  slug: 'flag-pulley',
  title: '升旗时往下拉绳，旗子为什么往上走？',
  trigger: '周一升旗仪式，旗手站在旗杆底下，双手一把一把往下拉绳子，国旗却随着国歌一点点升上了旗杆顶。',
  dialogue: [
    {
      nian: '爸爸，旗手明明是往下拉绳子，国旗怎么反倒往上升呢？',
      dad: '因为旗杆顶上装着一个滑轮。绳子绕过滑轮，一头系着国旗，一头在旗手手里：手这头往下走多少，旗子那头就往上走多少。这个滑轮固定在杆顶不动，叫定滑轮，它的本事是把用力的方向倒过来。',
    },
    {
      nian: '定滑轮能把方向倒过来，那它能帮旗手省力气吗？',
      dad: '不能。很多人以为滑轮都省力，其实定滑轮两边的绳子拉力一样大：旗子有多重，手上就得用多大的力；拉多长的绳子，旗子就升多高。它省的不是力气，是方便：站在地上往下拉，比爬到杆顶往上提容易多了。',
      figure: { kind: 'sim', sim: 'pulley', caption: '先选「定滑轮」拉一拉，再换成动滑轮和滑轮组：比比手上用的力、手拉的长度和重物升高了多少。' },
    },
    {
      nian: '省的是方便不是力气……那有没有真能省力的滑轮？',
      dad: '有。把滑轮挂在重物上，让它跟着重物一起往上走，这叫动滑轮。重物被两段绳子一起吊着，每段只分担一半，手上只要用一半的力。可是重物升高 1 米，两段绳子都要缩短 1 米，手就得拉 2 米。',
    },
    {
      nian: '手要拉 2 米才升高 1 米？那工地上的吊车用的是什么滑轮？',
      dad: '吊车用的是滑轮组：定滑轮和动滑轮串在一起，绳子在它们之间来回绕好几道。吊着重物的绳子有几段，手上的力就差不多变成几分之一，可要收的绳子也长了好几倍。所以吊车的钢丝绳特别长，吊起一根钢梁要卷好一会儿。',
    },
    {
      nian: '绳子有几段，力就变成几分之一？那天安门升国旗也用滑轮组吗？',
      dad: '国旗不重，用不着省力。天安门广场的旗杆高出地面 30 米，杆顶同样靠滑轮让绳子拐弯。要紧的是速度：国旗要在国歌奏完的 46 秒里正好升到杆顶，所以绳子要收得又匀又稳，不能忽快忽慢。',
    },
    {
      nian: '我懂了！定滑轮不省力，但能把往下拉变成往上升；动滑轮跟着重物走，省一半力，可绳子要多拉一倍；滑轮组又省力又能改方向。',
      dad: '说得对！家里的升降晾衣架也藏着滑轮，下次摇的时候数一数：衣架被几段绳子吊着？手柄摇了好多圈，衣架才升起来多少？',
    },
  ],
  tip: '互动图不计滑轮和绳子的重量，也不计摩擦；真实的滑轮组要用的力会比“几分之一”大一点。天安门广场旗杆的高度、升旗用时来自北京日报客户端和国防部网站。玩滑轮时别把手指放在滑轮和绳子之间，容易被夹。',
  sources: [
    { title: '物理 八年级下册 · 第十二章 简单机械 · 第2节 滑轮', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '天安门广场升降国旗仪式呈现七大变化（国歌奏一遍，升旗时长 46 秒）', by: '中华人民共和国国防部', url: 'https://www.mod.gov.cn/gfbw/gfjy_index/4801254.html' },
    { title: '行走京华大地 感悟思想伟力｜天安门广场（国旗杆地面以上净高 30 米）', by: '北京日报客户端', url: 'https://xinwen.bjd.com.cn/content/s69327d66e4b06b6f7a7f0102.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '往下拉，往上升', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [16, 620], color: '#b9b2a6', from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 170], size: [80, 80], color: '#e6e1d6', outline: true, from: 0.3 },
          { kind: 'bond', a: [560, 170], b: [560, 760], color: '#8b5a2b', from: 0.6 },
          { kind: 'bond', a: [640, 170], b: [640, 760], color: '#8b5a2b', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [510, 720], size: [100, 66], color: '#de2910', slide: { to: [510, 250], at: 2, over: 6 }, from: 1 },
          { kind: 'arrow', path: [[720, 380], [720, 600]], color: '#e8590c', text: '往下拉', from: 1.6, to: 8 },
          { kind: 'arrow', path: [[400, 600], [400, 380]], color: '#3553a6', text: '往上升', from: 2.6, to: 8 },
          { kind: 'text', at: [600, 840], text: '定滑轮：把方向倒过来', from: 8.2 },
        ],
      },
      {
        turn: 1, title: '只改方向，不省力', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 200], size: [100, 100], color: '#e6e1d6', outline: true, from: 0 },
          { kind: 'bond', a: [550, 200], b: [550, 510], color: '#8b5a2b', from: 0.3 },
          { kind: 'bond', a: [650, 200], b: [650, 600], color: '#8b5a2b', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [550, 550], size: [110, 80], color: '#de2910', text: '旗子', from: 0.6 },
          { kind: 'meter', at: [260, 300], label: '旗子的重', start: 0.5, end: 0.5, color: '#3553a6', from: 1.6 },
          { kind: 'meter', at: [940, 300], label: '手上的力', start: 0.5, end: 0.5, color: '#e8590c', from: 2.8 },
          { kind: 'myth', wrong: '滑轮都能省力', right: '定滑轮只改方向，不省力', from: 6.4 },
        ],
      },
      {
        turn: 2, title: '动滑轮省一半', duration: 12,
        cues: [
          { kind: 'bond', a: [530, 150], b: [530, 470], color: '#8b5a2b', from: 0 },
          { kind: 'bond', a: [670, 150], b: [670, 470], color: '#8b5a2b', from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 480], size: [140, 140], color: '#e6e1d6', outline: true, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [600, 630], size: [150, 90], color: '#9a9187', text: '重物', from: 0.6 },
          { kind: 'label', at: [530, 320], pos: [300, 320], text: '两段绳子各分一半', from: 1.8 },
          { kind: 'meter', at: [960, 300], label: '重物升高', start: 0, end: 0.3, color: '#3553a6', from: 4, over: 3 },
          { kind: 'meter', at: [960, 450], label: '手拉的绳子', start: 0, end: 0.6, color: '#e8590c', from: 4, over: 3 },
          { kind: 'text', at: [600, 830], text: '省一半力，多拉一倍绳', from: 7.6 },
        ],
      },
      {
        turn: 3, title: '吊车的滑轮组', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🏗️', path: [[360, 480]], size: 380, from: 0.3 },
          { kind: 'label', at: [470, 330], pos: [820, 220], text: '定滑轮 + 动滑轮', from: 1.6 },
          { kind: 'meter', at: [900, 400], label: '手上的力', start: 0.9, end: 0.25, color: '#e8590c', from: 3.4, over: 2.6 },
          { kind: 'meter', at: [900, 540], label: '要收的绳子', start: 0.2, end: 0.9, color: '#3553a6', from: 3.4, over: 2.6 },
          { kind: 'text', at: [600, 830], text: '绳子段数多，力就小', from: 7.4 },
        ],
      },
      {
        turn: 4, title: '46 秒升到杆顶', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [18, 620], color: '#b9b2a6', from: 0 },
          { kind: 'shape', shape: 'circle', at: [600, 170], size: [60, 60], color: '#e6e1d6', outline: true, from: 0 },
          { kind: 'label', at: [600, 170], pos: [820, 200], text: '杆顶的滑轮', from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [530, 740], size: [100, 66], color: '#de2910', slide: { to: [530, 230], at: 1.2, over: 8 }, from: 0.8 },
          { kind: 'count', at: [930, 420], label: '升旗用时', start: 0, end: 46, unit: '秒', over: 8, from: 1.2 },
          { kind: 'text', at: [600, 840], text: '收绳要又匀又稳', from: 9.6 },
        ],
      },
    ],
  },
};
