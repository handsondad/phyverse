import type { Story } from './types';

export const noiseBlock: Story = {
  slug: 'noise-block',
  title: '隔音墙、耳塞是怎么挡住噪声的？',
  trigger: '楼上邻居在装修，电钻“嗡嗡”响个不停，小念捂着耳朵写不下作业。妈妈递来一副耳塞，爸爸说：挡噪声，其实有三道关。',
  dialogue: [
    {
      nian: '爸爸，噪声为什么这么烦人？挡噪声为什么有三道关？',
      dad: '噪声太吵，会让人心烦、睡不好、没法专心，太响的声音还会伤耳朵。噪声从声源发出来，穿过空气和墙壁一路跑，最后钻进耳朵。所以有三个地方能拦住它：在声源那儿让它小一点，在路上挡一挡，在耳朵口堵一堵。',
    },
    {
      nian: '在声源那儿让它小一点？具体怎么做呢？',
      dad: '比如给摩托车、发电机装上消声器，让排气声小很多；工厂换上更安静的机器；小区规定装修只能在白天干活，晚上不许打电钻。从源头减弱，是最省事的办法，噪声根本没机会跑出来。',
      figure: { kind: 'sim', sim: 'noiseBlock', caption: '换一换挡噪声的地方：在声源、在路上、在耳朵边，传进耳朵的噪声怎么变？' },
    },
    {
      nian: '要是噪声已经跑出来了呢？高架路旁边那一排高墙，就是挡它的吧？',
      dad: '对，那是隔音墙，在噪声传播的路上把它挡住。美国联邦公路局的资料说，设计得好的隔音墙，通常能让噪声降低大约 5 到 10 分贝，听起来最多小一半。墙要又高又长，中间不能有缺口；路边多种些树，也能挡掉一点。很多人以为挡噪声只能捂耳朵，其实路上就能拦。',
    },
    {
      nian: '隔音墙也只能让它小一半？那最后一道关，就是戴耳塞吗？',
      dad: '是的，这叫在人耳处防护。耳塞、耳罩把耳朵口堵住，噪声照样传到身边，却不容易钻进耳朵。在机场跑道边、在很吵的工厂里工作的人，都要戴耳罩保护听力；睡觉嫌吵时，戴一副软软的耳塞也管用。',
    },
    {
      nian: '戴耳罩保护听力？那平时戴耳机听歌，开得很大声，会伤耳朵吗？',
      dad: '会。声音太响、听得太久，耳朵里感受声音的细胞会受伤，伤了就很难恢复。世界卫生组织建议：耳机音量不要超过最大音量的 60%，听一会儿就让耳朵歇一歇。要是耳朵里一直嗡嗡响，就是耳朵在报警，要告诉大人去看医生。',
    },
    {
      nian: '我明白了！噪声从声源出发，一路传进耳朵，三个地方都能拦：在声源处装消声器，在传播途中建隔音墙、种树，在人耳处戴耳塞。戴耳机也别开太大声。',
      dad: '说得好！在家找一找噪声：冰箱、洗衣机、窗外的汽车声，各是从哪儿来的？想一想，用哪一道关来挡最合适。',
    },
  ],
  tip: '“降低 5 到 10 分贝”是美国联邦公路局对高速路隔音墙的说法，墙离路和房子的远近不同，效果也不一样。分贝每降低 10，人听起来大约只剩一半响。互动图里传进耳朵的噪声多少只是示意。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第4节 噪声的危害和控制', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Highway Traffic Noise Barriers at a Glance', by: 'U.S. Federal Highway Administration', url: 'https://www.fhwa.dot.gov/Environment/noise/noise_barriers/design_construction/keepdown.cfm' },
    { title: 'Deafness and hearing loss: Safe listening', by: 'World Health Organization', url: 'https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '三道关', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🚚', path: [[160, 560]], size: 170, from: 0 },
          { kind: 'sprite', icon: '🧒', path: [[1040, 560]], size: 150, from: 0 },
          { kind: 'wave', a: [260, 540], b: [960, 540], amplitude: 18, wavelength: 60, speed: 220, color: '#7a5cc4', from: 0.6 },
          { kind: 'shape', shape: 'pill', at: [220, 330], size: [200, 80], color: '#fde3cf', text: '声源', from: 2.4 },
          { kind: 'shape', shape: 'pill', at: [600, 330], size: [200, 80], color: '#fde3cf', text: '路上', from: 3.4 },
          { kind: 'shape', shape: 'pill', at: [1000, 330], size: [200, 80], color: '#fde3cf', text: '耳朵', from: 4.4 },
          { kind: 'text', at: [600, 830], text: '三个地方都能拦', from: 7 },
        ],
      },
      {
        turn: 1, title: '源头减弱', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🏍️', path: [[420, 520]], size: 220, from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 590], size: [120, 40], color: '#8b7a5c', from: 1.5 },
          { kind: 'label', at: [620, 590], pos: [820, 700], text: '消声器', from: 2 },
          { kind: 'meter', at: [600, 240], label: '排气声', start: 0.9, end: 0.35, color: '#e8590c', from: 3, over: 2 },
          { kind: 'text', at: [600, 830], text: '晚上不许打电钻', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '隔音墙', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [330, 620], size: [620, 80], color: '#c9c2b5', from: 0 },
          { kind: 'sprite', icon: '🚗', path: [[250, 560]], size: 130, from: 0 },
          { kind: 'shape', shape: 'rect', at: [690, 480], size: [40, 300], color: '#9aa7b3', from: 0.6 },
          { kind: 'sprite', icon: '🏠', path: [[980, 540]], size: 200, from: 0 },
          { kind: 'wave', a: [330, 500], b: [660, 460], amplitude: 16, wavelength: 50, speed: 200, color: '#7a5cc4', from: 1 },
          { kind: 'meter', at: [980, 260], label: '墙后的噪声', start: 0.9, end: 0.5, color: '#e8590c', from: 3, over: 2 },
          { kind: 'myth', wrong: '挡噪声只能捂耳朵', right: '声源、路上、耳朵都能拦', from: 7 },
        ],
      },
      {
        turn: 3, title: '戴上耳塞', duration: 11,
        cues: [
          { kind: 'sprite', icon: '😴', path: [[620, 480]], size: 220, from: 0 },
          { kind: 'wave', a: [120, 420], b: [480, 450], amplitude: 16, wavelength: 50, speed: 200, color: '#7a5cc4', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [515, 480], size: [34, 34], color: '#e8590c', from: 2 },
          { kind: 'shape', shape: 'circle', at: [725, 480], size: [34, 34], color: '#e8590c', from: 2 },
          { kind: 'label', at: [515, 480], pos: [320, 680], text: '耳塞', from: 2.6 },
          { kind: 'text', at: [600, 830], text: '把耳朵口堵住', from: 6 },
        ],
      },
      {
        turn: 4, title: '耳机别太响', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🎧', path: [[600, 420]], size: 230, from: 0 },
          { kind: 'meter', at: [600, 660], label: '耳机音量', start: 0.95, end: 0.6, color: '#7a5cc4', from: 2.4, over: 2 },
          { kind: 'text', at: [600, 200], text: '不超过最大的 60%', from: 4.6 },
          { kind: 'text', at: [600, 830], text: '听一会儿歇一会儿', from: 7 },
        ],
      },
    ],
  },
};
