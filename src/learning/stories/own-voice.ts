import type { Story } from './types';

const AIR_COL = '#3553a6';
const BONE_COL = '#e8590c';

export const ownVoice: Story = {
  slug: 'own-voice',
  title: '录音里自己的声音，为什么听着那么陌生？',
  trigger: '小念用妈妈的手机录了一段朗诵，回放时捂住了脸：“爸爸，手机是不是坏啦？这声音又尖又细，一点也不像我！”',
  dialogue: [
    {
      nian: '爸爸，录音里自己的声音为什么听着那么陌生？是手机麦克风把声音录坏了吗？',
      dad: '手机一点都没坏——录下来的这个声音，恰恰就是爸爸妈妈和同学们每天听到的你！之所以只有你自己觉得陌生，是因为平时你张嘴说话时，你的耳朵其实同时收到了两条路传来的声音，而手机只录到了其中一条。',
    },
    {
      nian: '两条路传来的声音？除了顺着空气钻进耳朵，还有哪一条路？',
      dad: '另一条路就在你脑袋里面！说话时声带嗡嗡振动，一部分声波从嘴里跑进空气，绕进外耳道去敲鼓膜，叫空气传导；另一部分振动直接顺着下巴和头骨，抄近道传进耳朵最深处的内耳耳蜗，这就叫骨传导。',
      figure: { kind: 'sim', sim: 'boneVoice', caption: '切换“自己边说边听”“听手机录音”和“捂住耳朵说话”：看看头骨那一路给低音加了多少劲。' },
    },
    {
      nian: '骨传导……顺着头骨传过去的声音，跟空气传的有什么不一样？',
      dad: '头骨又厚又结实，就像自带了一层“低音滤镜”，特别擅长把低沉的振动传进内耳，高频振动反而衰减得多。两路声音在你脑海里合二为一，你平时听见自己的声音就显得格外浑厚、饱满；一听录音，头骨那一路没了，低音少了一截，自然觉得又细又高。',
    },
    {
      nian: '低音少了一截……我能不能当场试一试头骨传声是什么感觉？',
      dad: '现在就能试！伸手把两只耳朵轻轻捂严，堵住空气那条路，再开口说一句“一二三”或者咬一口脆饼干。是不是觉得说话声变得嗡嗡低沉，嚼饼干简直像在脑子里打雷？别人站在旁边却几乎听不见，因为那全是头骨直接传给你自己的振动！',
    },
    {
      nian: '真的像在脑子里打雷！那骨传导除了让我们听自己的声音，还有别的用处吗？',
      dad: '用处大着呢！两百年前，耳朵听不见空气声音的大音乐家贝多芬，就曾用牙齿咬住一根木棒，把木棒另一头抵在钢琴上，靠牙齿和头骨传来的振动继续“听”琴谱曲。现在跑步用的骨传导耳机和一些助听器，也是贴在耳朵前面的骨头上直接传振动的。',
    },
    {
      nian: '我明白了！平时自己说话时，声音同时走空气和头骨两条路，头骨把低音放大了；手机录音只录下了空气传的那一路，少了低音我才觉得陌生，可那正是别人一直听到的我。',
      dad: '一点没错！其实大家早就听惯并且喜欢你真实清亮的声音啦，多听几次录音，你自己也会和它交上朋友的。',
    },
  ],
  tip: '在家做“捂耳朵说话”和“吃脆饼干听骨传导”小实验时，轻轻盖住外耳道口即可，不要用力往耳道里猛按手掌，以免气压突然挤压鼓膜；使用任何耳机都要控制音量和时长，保护听力。',
  sources: [
    { title: '物理 八年级上册 · 第二章 声现象 · 第1节 声音的产生与传播（科学世界：我们是怎样听到声音的·骨传导）；第2节 声音的特性（音色）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Why does my voice sound so different when it is recorded and played back?（空气传导与头骨骨传导双通道及低频增强）', by: 'Scientific American', url: 'https://www.scientificamerican.com/article/why-does-my-voice-sound-different/' },
    { title: 'Finite element analysis on cochlear vibration patterns under bone conduction stimulations（颅骨振动模式与骨传导生物力学）', by: 'Scientific Reports（NIH PubMed Central 收录）', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11514166/' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '手机没录坏', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🧒', path: [[340, 440]], size: 140, from: 0.3 },
          { kind: 'sprite', icon: '📱', path: [[820, 440]], size: 120, from: 0.8 },
          { kind: 'wave', a: [440, 440], b: [730, 440], amplitude: 24, wavelength: 100, speed: 200, color: AIR_COL, from: 1.5 },
          { kind: 'myth', wrong: '手机麦克风把声音录走样了', right: '录音正是别人平时听到的你', from: 6 },
        ],
      },
      {
        turn: 1, title: '声音走两条路', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [260, 260], color: '#fbe4cf', text: '脑袋', from: 0.2 },
          { kind: 'flow', path: [[600, 560], [340, 500], [450, 390]], color: AIR_COL, count: 5, speed: 170, from: 1.2 },
          { kind: 'label', at: [360, 480], pos: [230, 320], text: '空气传导', from: 1.8 },
          { kind: 'flow', path: [[600, 540], [600, 360]], color: BONE_COL, count: 4, speed: 200, from: 2.6 },
          { kind: 'label', at: [620, 450], pos: [900, 400], text: '头骨骨传导', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '一路绕空气，一路抄头骨近道', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '头骨加了低音', duration: 11,
        cues: [
          { kind: 'meter', at: [380, 360], label: '说话低音', start: 40, end: 92, over: 2.2, color: BONE_COL, from: 0.8 },
          { kind: 'meter', at: [380, 520], label: '录音低音', start: 92, end: 42, over: 2.2, color: AIR_COL, from: 2.8 },
          { kind: 'label', at: [680, 360], pos: [920, 360], text: '头骨擅长传低频', from: 1.8 },
          { kind: 'label', at: [680, 520], pos: [920, 520], text: '录音只收空气那路', from: 3.8 },
          { kind: 'text', at: [600, 810], text: '少了低音滤镜，听着就变细了', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '捂耳朵嚼饼干', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🍪', path: [[400, 440]], size: 120, from: 0.4 },
          { kind: 'pulse', at: [760, 440], color: BONE_COL, radius: 150, from: 1.5 },
          { kind: 'sprite', icon: '🙉', path: [[760, 440]], size: 140, from: 0.8 },
          { kind: 'label', at: [760, 340], pos: [760, 210], text: '自己听着像打雷', from: 2.6 },
          { kind: 'text', at: [600, 810], text: '堵住外耳道，全靠头骨传声', from: 6 },
        ],
      },
      {
        turn: 4, title: '咬木棒听钢琴', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🎹', path: [[300, 450]], size: 140, from: 0.3 },
          { kind: 'bond', a: [400, 450], b: [780, 450], color: '#8b5e3c', from: 1 },
          { kind: 'flow', path: [[400, 450], [780, 450]], color: BONE_COL, count: 6, speed: 220, from: 1.8 },
          { kind: 'sprite', icon: '🎼', path: [[880, 430]], size: 120, from: 2.4 },
          { kind: 'label', at: [590, 450], pos: [590, 270], text: '木棒把振动传给牙齿头骨', from: 3 },
          { kind: 'text', at: [600, 810], text: '骨传导耳机也是这个道理', from: 6.5 },
        ],
      },
    ],
  },
};
