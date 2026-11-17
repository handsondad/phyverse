import type { Story } from './types';

export const whiteSteam: Story = {
  slug: 'white-steam',
  title: '水开时冒出的“白气”，是水蒸气吗？',
  trigger: '早上烧开水，水壶“呜呜”地叫，壶嘴冒出一大团白白的气；小念凑过去想看清楚，被爸爸一把拉开了。',
  dialogue: [
    {
      nian: '爸爸，壶嘴冒出来的白气就是水蒸气吧？为什么不让我凑近看？',
      dad: '先说为什么拉开你：壶嘴喷出来的气有 100 ℃ 左右，烫起人来不比开水差。再说白气：它其实不是水蒸气。水蒸气和空气一样，是看不见的；你看见的白白一团，是水蒸气碰到冷空气，又变回来的许许多多小水滴。',
    },
    {
      nian: '白气是小水滴？那真正的水蒸气在哪儿呢？',
      dad: '仔细看壶嘴口：白气不是贴着壶嘴就有的，中间隔着一小段，看起来空空的。那一小段才是真正的水蒸气，水分子一个个分开乱飞，光直接穿过去。飞出一点儿、被空气冷下来，水分子抱成小水滴，挡住了光，我们才看见白气。',
      figure: { kind: 'sim', sim: 'kettle', caption: '换一换厨房的冷热，看白气浓不浓、壶嘴口那段“空白”有多长；再放大看看两段里的水分子。' },
    },
    {
      nian: '被空气冷下来才变成水滴？那冬天的白气是不是比夏天多？',
      dad: '对！冬天厨房冷，水蒸气一出壶嘴就被冷成小水滴，白气又浓又长；夏天空气暖，白气就淡淡的一小团。很多人以为白气就是水蒸气，其实是水蒸气变成了小水滴，这叫液化，液化的时候还会把热放出来。',
    },
    {
      nian: '液化还会放出热？那冬天说话时嘴里冒的白气，也是液化吗？',
      dad: '是同一回事。你呼出的气又暖又湿，里面有不少看不见的水汽，一出嘴碰上冬天的冷空气，就液化成小水滴，变成一团白气。夏天呼出的气一样有水汽，可外面不够冷，就看不见。',
    },
    {
      nian: '冒出来的小水滴，过一会儿怎么又不见了？',
      dad: '小水滴飘远了，周围的空气没那么湿，它们又慢慢蒸发，变回看不见的水汽，所以白气飘一会儿就散了。天上的云也差不多是这样来的：水汽升到高空遇冷，液化成数不清的小水滴，聚成一大片，我们就看见了云。',
    },
    {
      nian: '我明白了！水蒸气是看不见的，壶嘴口那一小段才是它；白气是水蒸气遇冷液化成的小水滴，冬天冷，所以白气多。白气飘远了又会蒸发，悄悄不见。',
      dad: '说得好！下次烧水时站远一点，请大人帮你开灯照着壶嘴看：白气是贴着壶嘴就有，还是隔了一小段才出现？千万别伸手去摸。',
    },
  ],
  tip: '壶嘴口那段看不见的水蒸气有 100 ℃ 左右，比飘远的白气更烫，观察时一定要离远一点。互动图里白气的浓淡、“空白”的长短都是示意，真实情况还跟火力、风和空气的干湿有关。',
  sources: [
    { title: '物理 八年级上册 · 第三章 物态变化 · 第3节 汽化和液化', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'The Invisibility of Steam（水蒸气是看不见的）', by: 'The Physics Teacher · 美国物理教师协会', url: 'https://pubs.aip.org/aapt/pte/article-abstract/52/8/459/277267/The-Invisibility-of-Steam' },
    { title: 'Making clouds in your kitchen（壶嘴口那段透明的才是水蒸气）', by: 'A Moment of Science · Indiana Public Media', url: 'https://www.ipm.org/show/amomentofscience/2022-11-23/making-clouds-in-your-kitchen' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '别凑近', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 600], size: [300, 220], color: '#c9d3dc', text: '水壶', from: 0 },
          { kind: 'bond', a: [530, 540], b: [640, 440], color: '#9aa7b3', from: 0 },
          { kind: 'particles', box: [630, 150, 260, 240], count: 20, color: '#aab6c2', motion: 'rise', from: 0.8 },
          { kind: 'label', at: [655, 420], pos: [880, 520], text: '100 ℃ 左右', from: 2 },
          { kind: 'text', at: [600, 830], text: '看得见的不是水蒸气', from: 6 },
        ],
      },
      {
        turn: 1, title: '空白的一小段', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [400, 600], size: [300, 220], color: '#c9d3dc', text: '水壶', from: 0 },
          { kind: 'bond', a: [530, 540], b: [640, 440], color: '#9aa7b3', from: 0 },
          { kind: 'particles', box: [630, 150, 260, 240], count: 20, color: '#aab6c2', motion: 'rise', from: 0 },
          { kind: 'shape', shape: 'circle', at: [668, 405], size: [90, 90], color: '#eef4fb', outline: true, from: 1 },
          { kind: 'label', at: [690, 410], pos: [900, 520], text: '真正的水蒸气', from: 1.6 },
          { kind: 'label', at: [760, 250], pos: [400, 220], text: '白气：小水滴', from: 4.5 },
        ],
      },
      {
        turn: 2, title: '冬天白气多', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [300, 600], size: [200, 150], color: '#c9d3dc', text: '冬天', from: 0 },
          { kind: 'shape', shape: 'rect', at: [900, 600], size: [200, 150], color: '#c9d3dc', text: '夏天', from: 0 },
          { kind: 'particles', box: [200, 230, 260, 260], count: 32, color: '#aab6c2', motion: 'rise', from: 0.8 },
          { kind: 'particles', box: [860, 390, 140, 120], count: 6, color: '#aab6c2', motion: 'rise', from: 0.8 },
          { kind: 'text', at: [600, 200], text: '越冷，白气越浓', from: 3 },
          { kind: 'myth', wrong: '白气就是水蒸气', right: '白气是遇冷变成的小水滴', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '哈出一口白气', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[330, 480]], size: 200, from: 0 },
          { kind: 'particles', box: [480, 340, 280, 160], count: 18, color: '#aab6c2', motion: 'gas', from: 1.2 },
          { kind: 'label', at: [600, 420], pos: [820, 260], text: '暖湿的气遇冷', from: 2 },
          { kind: 'text', at: [600, 820], text: '一样是液化', from: 6 },
        ],
      },
      {
        turn: 4, title: '飘远又散了', duration: 12,
        cues: [
          { kind: 'particles', box: [230, 410, 300, 220], count: 22, color: '#aab6c2', motion: 'rise', from: 0, to: 4.5 },
          { kind: 'label', at: [380, 520], pos: [380, 300], text: '又蒸发成水汽', from: 2.4, to: 4.5 },
          { kind: 'sprite', icon: '☁️', path: [[820, 330]], size: 220, from: 5 },
          { kind: 'label', at: [820, 380], pos: [820, 560], text: '云也是小水滴', from: 6 },
          { kind: 'text', at: [600, 820], text: '水汽遇冷又成了水滴', from: 8 },
        ],
      },
    ],
  },
};
