import type { Story } from './types';

const AIR = '#74c0fc';
const DRUM = '#e8590c';
const CHAMBER = '#fbe4cf';

export const earPop: Story = {
  slug: 'ear-pop',
  title: '坐飞机起降、高铁进隧道时，耳朵为什么会“嗡”地堵住？',
  trigger: '飞机开始下降，小念觉得两只耳朵像被棉花死死塞住，妈妈说话都像隔了一层墙；她咽了一口温水，耳朵里“啵”地响了一声，一下子清楚了。',
  dialogue: [
    {
      nian: '爸爸，飞机下降时耳朵为什么会“嗡”地堵住？是发动机的声音太吵震的吗？',
      dad: '不是声音震的，是鼓膜两边的气压不一样了！很多人以为耳闷是被噪声吵的，其实耳朵深处有一张薄薄的鼓膜，外面通着机舱里的空气，里面关着一小团叫中耳的空气。两边气压相等时，鼓膜平平的；一旦一边高一边低，鼓膜被压弯绷紧，听声音就像蒙了层布。',
    },
    {
      nian: '鼓膜两边的气压怎么会变得不一样呢？',
      dad: '海拔越高空气越稀薄，大气压越低。地面大气压大约 101 千帕，客机飞上万米高空时，机舱里虽然加了压，气压还是会降到大约 80 千帕，相当于两千多米高的山上。等飞机下降，机舱气压很快升回 101 千帕，中耳里却还困着 80 千帕的低气压，外面的空气就把鼓膜往里压弯了。',
      figure: { kind: 'sim', sim: 'earDrum', caption: '切到“飞机下降”，看看 101 千帕和 80 千帕怎样把鼓膜压弯；再点“咽口水打开”试试。' },
    },
    {
      nian: '中耳里的空气被关着……那我咽了一口水，为什么“啵”的一声就好了？',
      dad: '因为中耳底下连着一条通往鼻子后头和喉咙的细管子，叫咽鼓管。它平时像捏扁的软管一样关着，免得鼻涕和细菌乱钻；你一咽口水、嚼东西或者打哈欠，喉咙旁边的肌肉一拉，就把咽鼓管拉开一条小缝，让空气钻进去把气压补平，所以会听到轻轻“啵”的一声。',
    },
    {
      nian: '咽鼓管真聪明！可坐高铁钻进隧道又没飞上天，耳朵为什么也会发闷？',
      dad: '高铁时速两三百公里冲进狭窄隧道时，车头猛地挤压洞里的空气，车厢周围掀起一串气压波。虽然动车组密封得很好，仍有一小部分气压起伏传进车厢，外耳道的气压一秒钟里忽高忽低，咽鼓管还没来得及开门，鼓膜就跟着一鼓一凹地发胀了。',
    },
    {
      nian: '鼓膜一鼓一凹……那重感冒流鼻涕的时候坐飞机，为什么耳朵格外疼？',
      dad: '美国联邦航空局的航空生理手册专门提醒过这件事：感冒或鼻炎发作时，鼻子后头的黏膜肿了起来，把咽鼓管的门口堵得死死的。飞机下降时空气进不去，内外气压差越拉越大，鼓膜就会疼得厉害；所以重感冒时尽量别勉强捏鼻子猛鼓气，以免把鼻腔里的病菌挤进中耳。',
    },
    {
      nian: '我明白了！坐飞机起降和高铁进隧道时耳朵发闷，不是噪声震的，而是鼓膜外面的气压变了、中耳还没跟上，把鼓膜压弯了；咽口水或打哈欠打开咽鼓管，两边气压一平就通了。',
      dad: '说得太对了！下次飞机广播“开始下降”的时候，别等耳朵疼才想起它，提前喝几小口水或者打几个哈欠，耳朵一路都舒舒服服。',
    },
  ],
  tip: '婴幼儿不会主动做吞咽动作，飞机下降时给小宝宝喂奶或含安抚奶嘴能帮咽鼓管自然打开；睡觉时吞咽变少，下降前最好叫醒孩子。若感冒严重或降落后耳痛、耳闷长时间不消退，应及时看耳鼻喉科医生。',
  sources: [
    { title: '物理 八年级下册 · 第九章 压强 · 第3节 大气压强（大气压随高度升高而减小）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Airman Education: Trapped Gas（中耳气压平衡与咽鼓管机制、下降阶段耳闷及感冒飞行风险）', by: '美国联邦航空局（FAA）', url: 'https://www.faa.gov/pilots/training/airman_education/topics_of_interest/trapped_gas' },
    { title: 'Ear barotrauma（鼓膜两侧气压差与吞咽、打哈欠平衡气压）', by: '美国国家医学图书馆 MedlinePlus', url: 'https://medlineplus.gov/ency/article/001064.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '两边气压不等', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [360, 440], size: [340, 200], color: '#e7f5ff', text: '外耳道', from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [790, 440], size: [300, 220], color: CHAMBER, text: '中耳', from: 0.6 },
          { kind: 'bond', a: [580, 320], b: [620, 440], color: DRUM, from: 1.2 },
          { kind: 'bond', a: [620, 440], b: [580, 560], color: DRUM, from: 1.2 },
          { kind: 'arrow', path: [[430, 440], [565, 440]], color: DRUM, text: '压弯鼓膜', from: 2.2 },
          { kind: 'myth', wrong: '耳朵堵住是被噪声震的', right: '是鼓膜两边气压不一样', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '飞机升和降', duration: 12,
        cues: [
          { kind: 'sprite', icon: '✈️', path: [[240, 300], [920, 520]], size: 110, travel: 5, from: 0.5 },
          { kind: 'count', at: [360, 620], label: '高空机舱约', start: 101, end: 80, unit: '千帕', from: 1 },
          { kind: 'count', at: [840, 320], label: '降回地面约', start: 80, end: 101, unit: '千帕', from: 3.5 },
          { kind: 'text', at: [600, 810], text: '外高里低，把鼓膜往里压弯', from: 7 },
        ],
      },
      {
        turn: 2, title: '咽口水通气', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 380], size: [280, 190], color: CHAMBER, text: '中耳', from: 0.2 },
          { kind: 'bond', a: [640, 480], b: [760, 680], color: '#8b7a5c', order: 2, from: 0.8 },
          { kind: 'flow', path: [[760, 680], [640, 480]], color: AIR, count: 5, speed: 160, from: 2.4 },
          { kind: 'label', at: [700, 580], pos: [930, 560], text: '咽鼓管打开', from: 2.8 },
          { kind: 'pulse', at: [600, 380], color: '#3553a6', radius: 90, from: 4.5 },
          { kind: 'text', at: [600, 810], text: '“啵”一声，两边气压拉平', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '高铁钻隧道', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [760, 450], size: [640, 230], color: '#495057', text: '隧道', from: 0.2 },
          { kind: 'sprite', icon: '🚄', path: [[180, 470], [820, 470]], size: 110, travel: 4, from: 1 },
          { kind: 'wave', a: [480, 400], b: [1020, 400], amplitude: 24, wavelength: 120, speed: 220, color: AIR, from: 2.2 },
          { kind: 'label', at: [720, 400], pos: [720, 230], text: '洞内掀起气压波', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '车厢气压波动，耳朵来不及调', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '感冒别猛鼓气', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🤧', path: [[360, 440]], size: 130, from: 0.4 },
          { kind: 'label', at: [360, 520], pos: [360, 660], text: '黏膜肿胀堵住管口', from: 1.6 },
          { kind: 'sprite', icon: '🥤', path: [[840, 440]], size: 130, from: 2.6 },
          { kind: 'label', at: [840, 520], pos: [840, 660], text: '小口喝水慢慢吞咽', from: 3.4 },
          { kind: 'text', at: [600, 810], text: '提前咽口水，别猛捏鼻鼓气', from: 6 },
        ],
      },
    ],
  },
};
