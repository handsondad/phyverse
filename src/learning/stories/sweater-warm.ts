import type { Story } from './types';

export const sweaterWarm: Story = {
  slug: 'sweater-warm',
  title: '穿毛衣为什么暖和，毛衣自己会发热吗？',
  trigger: '冬天早上，小念把毛衣从衣柜里拿出来，摸上去凉凉的；可穿上没一会儿，身上就暖烘烘的。',
  dialogue: [
    {
      nian: '爸爸，毛衣刚拿出来是凉的，穿上却暖和，是不是毛衣会自己发热？',
      dad: '毛衣自己一点也不发热，热其实是你身体造出来的。你的身体一直在产生热，冬天这些热会不停地往冷空气里跑；毛衣的本事是把热挡住，让它跑得慢一点，所以身上就暖和了。',
    },
    {
      nian: '毛衣是把热挡住？软软的毛线，怎么挡得住热呢？',
      dad: '靠的是毛线里藏着的空气。毛线弯弯曲曲、蓬蓬松松，中间卡着许多小小的空气泡，这些空气被困住、不能流动。不流动的空气很不容易传热，就像在你身上围了一圈“空气墙”。羽绒服更蓬松，困住的空气更多，所以更暖和。',
      figure: { kind: 'sim', sim: 'insulate', caption: '给一杯热水裹上不同的衣服，看 1 小时后还剩多热；再把热水换成一块冰试试。' },
    },
    {
      nian: '困住的空气能挡热？那用毛衣包住一块冰，冰会不会化得更快？',
      dad: '恰恰相反，冰会化得更慢！很多人以为毛衣会发热，那冰包进去应该化得快；其实毛衣不分冷热，它只是挡住热的进出：穿在身上，挡住身体的热往外跑；包住冰块，挡住屋里的热往冰里钻。',
    },
    {
      nian: '包住冰块也能让它化得慢？那卖冰棍的箱子外面盖着棉被，也是这个道理吗？',
      dad: '一模一样！以前街上卖冰棍，箱子外面盖一层厚厚的棉被，不是给冰棍保暖，是挡住外面的热，让冰棍化得慢。现在的泡沫保温箱也一样，泡沫里全是封住的小气泡，挡热的本领更好。',
    },
    {
      nian: '泡沫里全是气泡？那毛衣被雨淋湿了，还暖和吗？',
      dad: '湿了就不暖和了。水钻进毛线，把空气挤了出去，而水传热比空气快得多，热一下子就被带走了。所以冬天衣服湿了要赶紧换。毛衣穿久了被压得扁扁的，空气少了，也没那么暖，晒一晒、拍一拍，让它重新蓬松起来就好。',
    },
    {
      nian: '我明白了！毛衣自己不发热，热是身体造的；毛衣里困住了很多不流动的空气，把热挡住，让它跑得慢。它也能让冰化得慢，因为它只是挡住热的进出。',
      dad: '说得好！找两块一样大的冰，一块用毛巾或旧毛衣包起来，一块放在旁边的盘子里，每隔十分钟看一看：哪块化得快？',
    },
  ],
  tip: '互动图里裹上不同衣服后，热水降温和冰块融化的快慢都是示意值，不是实测数据。“衣服会自己发热”是孩子们很常见的想法，美国俄亥俄州立大学的科学教育资料专门讨论过；用冰块做对照实验，最能看出毛衣只是挡住了热。',
  sources: [
    { title: '物理 九年级 · 第十三章 内能 · 第2节 内能（热传递）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Common Misconceptions about Heat and Insulation（毛衣、毯子不会自己发热）', by: 'Beyond Penguins and Polar Bears · The Ohio State University', url: 'https://beyondpenguins.ehe.osu.edu/issue/keeping-warm/common-misconceptions-about-heat-and-insulation' },
    { title: 'Getting Warmer/Getting Colder（导热与隔热）', by: 'American Physical Society', url: 'https://www.aps.org/learning-resources/getting-warmer-colder' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '热是身体造的', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[600, 500]], size: 220, from: 0 },
          { kind: 'particles', box: [390, 230, 420, 200], count: 14, color: '#e8590c', motion: 'rise', from: 1 },
          { kind: 'label', at: [700, 380], pos: [940, 260], text: '身体一直在产生热', from: 2 },
          { kind: 'text', at: [600, 820], text: '毛衣只是把热挡住', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '空气墙', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [640, 320], color: '#d9776b', from: 0 },
          { kind: 'particles', box: [300, 340, 600, 280], count: 34, color: '#ffffff', motion: 'jitter', from: 1 },
          { kind: 'label', at: [700, 450], pos: [960, 230], text: '困住的空气', from: 2 },
          { kind: 'text', at: [600, 820], text: '不流动的空气不爱传热', from: 6 },
        ],
      },
      {
        turn: 2, title: '包住一块冰', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [280, 280], color: '#d9776b', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [150, 150], color: '#e6f6ff', text: '冰', from: 0.3 },
          { kind: 'arrow', path: [[200, 460], [440, 460]], color: '#e8590c', text: '屋里的热', from: 1.4 },
          { kind: 'arrow', path: [[1000, 460], [760, 460]], color: '#e8590c', from: 1.4 },
          { kind: 'text', at: [600, 200], text: '热进不去，冰化得慢', from: 3.6 },
          { kind: 'myth', wrong: '毛衣自己会发热', right: '毛衣只是把热挡住', from: 6.6 },
        ],
      },
      {
        turn: 3, title: '冰棍箱盖棉被', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 580], size: [420, 220], color: '#f1efe6', text: '冰棍', from: 0 },
          { kind: 'shape', shape: 'rect', at: [600, 440], size: [480, 60], color: '#86acd9', text: '棉被', from: 0.6 },
          { kind: 'arrow', path: [[600, 160], [600, 380]], color: '#e8590c', text: '外面的热', from: 1.6 },
          { kind: 'text', at: [600, 820], text: '挡住热，冰棍化得慢', from: 5.5 },
        ],
      },
      {
        turn: 4, title: '湿了就不暖', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [640, 320], color: '#d9776b', from: 0 },
          { kind: 'particles', box: [300, 340, 600, 280], count: 30, color: '#ffffff', motion: 'jitter', from: 0, to: 4 },
          { kind: 'particles', box: [300, 340, 600, 280], count: 30, color: '#3a7bb5', motion: 'jitter', from: 4 },
          { kind: 'label', at: [700, 450], pos: [960, 230], text: '水把空气挤走了', from: 4.6 },
          { kind: 'text', at: [600, 820], text: '衣服湿了赶紧换', from: 7.5 },
        ],
      },
    ],
  },
};
