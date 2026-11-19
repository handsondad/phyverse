import type { Story } from './types';

const FILM = '#a5d8ff';
const FRONT = '#ffd43b';
const BACK = '#ff6b6b';

export const soapBubble: Story = {
  slug: 'soap-bubble',
  title: '肥皂水明明是透明的，吹出的泡泡为什么是彩色的？',
  trigger: '公园草坪上，小念蘸着透明的肥皂水吹出一串大泡泡，阳光一照，泡泡上流淌着粉紫、翠绿、金黄的彩带，没过几秒最顶上变暗，“啪”地破了。',
  dialogue: [
    {
      nian: '爸爸，杯子里的肥皂水明明是透明的，吹出的泡泡为什么是彩色的？跟彩虹是一个道理吗？',
      dad: '看着都有七彩颜色，道理却不一样！很多人以为肥皂泡像三棱镜那样靠折射分色，其实泡泡靠的是“两束反射光叠罗汉”。肥皂膜虽然薄得像一张纸的几百分之一，它仍然有前表面和后表面，照上去的白光会在前后两面各反射一次，变成两束紧挨着的光一起跑进你眼睛。',
    },
    {
      nian: '前后两面各反射一次……两束白光叠在一起，怎么就变出彩色了？',
      dad: '因为光是一种一上一下起伏的波，不同颜色的光“步子长短”不一样。后表面反射的那束光在膜里多跑了一个来回：要是多跑的路刚好让红光波峰叠上波峰，红光就变得特别鲜亮；与此同时，蓝光可能正好波峰撞上波谷，两束蓝光互相抵消不见了，这一块膜看着就泛红橙色。这就叫薄膜干涉。',
      figure: { kind: 'sim', sim: 'thinFilm', caption: '拖动肥皂膜的纳米厚度：看看红、绿、蓝哪种光被加强、哪种被抵消，再把厚度拖到最左边的 20 纳米试试！' },
    },
    {
      nian: '薄膜干涉……那同一个泡泡上的彩色条纹，为什么一直在往下流、变来变去？',
      dad: '因为重力在悄悄拉着肥皂水往下淌呀！刚吹出来的泡泡上面渐渐变薄、下面越积越厚，厚度从几十纳米到几百纳米一层层排开。每一层厚度“捧红”的颜色不一样，水流到哪儿厚度变到哪儿，你眼里的彩带就像活了一样旋转流淌。',
    },
    {
      nian: '上面渐渐变薄……那泡泡快破之前，最顶上为什么会变成透明发黑的暗斑？',
      dad: '旧金山探索馆的光学实验专门演示过这一幕：光在前表面从空气射向肥皂水反射时，波会先“翻个跟头”。当泡泡顶端薄到只有二三十纳米、比光波的一步短得多时，后表面那束光几乎没多走路，跟前面翻了跟头的光一碰面，红绿蓝所有颜色全都波峰撞波谷抵消光了，一点反射光也没有，看着就像一块黑暗斑，说明膜薄到快破啦！',
    },
    {
      nian: '一点反射光也没有……生活里还有别的东西也是靠薄膜干涉变出彩色的吗？',
      dad: '到处都是！雨后马路积水上漂着的一层薄油膜、阳光下闪着蓝绿色金属光泽的孔雀羽毛和甲虫外壳，都不是涂了颜料，而是极薄的膜或微小结构让两束反射光叠加挑出了颜色；相机镜头和眼镜片上泛淡紫色的增透膜，更是故意算好厚度把讨厌的反光抵消掉呢。',
    },
    {
      nian: '我懂了！透明肥皂水吹出彩色泡泡，是因为极薄的肥皂膜前后两面各反射一束光，发生薄膜干涉：合拍的颜色变亮、顶牛的颜色抵消，膜厚随重力变化就流出了彩带。',
      dad: '说得太精彩了！下次吹泡泡时，可以拿杯口蘸一层平平的肥皂膜竖着举在深色衣服前，你能亲眼看到一道道横着的彩色条纹，还有顶上那块快破前的暗斑！',
    },
  ],
  tip: '在家调肥皂水做竖直肥皂膜观察时，洗洁精加水再兑一点甘油或白糖水能让泡泡更结实、条纹保持更久；提醒孩子吹泡泡时往外吹气别往嘴里吸，肥皂水溅入眼睛要立刻用清水冲洗。',
  sources: [
    { title: '物理 选择性必修 第一册 · 第四章 光 · 第3节 光的干涉（薄膜干涉、肥皂膜条纹与增透膜）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Soap Film on a Can: Light & Waves Science Activity（肥皂膜前后表面反射相位反转、彩色干涉带与顶端极薄无反射暗区）', by: 'Exploratorium（旧金山探索馆）', url: 'https://www.exploratorium.edu/snacks/soap-film-on-can' },
    { title: 'Soap Film Interference Model（两表面反射波同相加强与反相抵消模型）', by: 'Exploratorium Teacher Institute', url: 'https://www.exploratorium.edu/snacks/soap-film-interference' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '前后两面反射', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [640, 430], size: [110, 420], color: FILM, text: '肥皂膜', from: 0.2 },
          { kind: 'ray', path: [[200, 260], [585, 390], [200, 510]], color: FRONT, draw: 1.2, from: 1 },
          { kind: 'ray', path: [[585, 390], [695, 430], [200, 590]], color: BACK, draw: 1.4, from: 2 },
          { kind: 'label', at: [360, 470], pos: [340, 230], text: '两束反射光追在一起', from: 3.4 },
          { kind: 'myth', wrong: '肥皂水里有彩色颜料', right: '前后两面反射光叠加成色', from: 6.2 },
        ],
      },
      {
        turn: 1, title: '合拍亮顶牛消', duration: 11,
        cues: [
          { kind: 'wave', a: [180, 320], b: [760, 320], amplitude: 32, wavelength: 140, speed: 180, color: '#e03131', from: 0.4 },
          { kind: 'wave', a: [180, 350], b: [760, 350], amplitude: 32, wavelength: 140, speed: 180, color: '#ff8787', from: 0.8 },
          { kind: 'label', at: [800, 335], pos: [980, 335], text: '步调合拍：变亮', from: 1.8 },
          { kind: 'wave', a: [180, 540], b: [760, 540], amplitude: 28, wavelength: 110, speed: 180, color: '#1971c2', from: 2.4 },
          { kind: 'bond', a: [800, 540], b: [1040, 540], color: '#8b7a5c', from: 3.4 },
          { kind: 'label', at: [920, 540], pos: [920, 650], text: '波峰撞波谷：抵消', from: 3.8 },
          { kind: 'text', at: [600, 810], text: '挑剩下的颜色，就是泡泡的色', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '上薄下厚淌水', duration: 11,
        cues: [
          { kind: 'shape', shape: 'circle', at: [600, 430], size: [340, 340], color: '#d0ebff', outline: true, from: 0.2 },
          { kind: 'shape', shape: 'pill', at: [600, 320], size: [240, 44], color: '#74c0fc', text: '薄', from: 1 },
          { kind: 'shape', shape: 'pill', at: [600, 430], size: [300, 52], color: '#ff922b', text: '中', from: 1.8 },
          { kind: 'shape', shape: 'pill', at: [600, 540], size: [240, 60], color: '#51cf66', text: '厚', from: 2.6 },
          { kind: 'arrow', path: [[840, 300], [840, 560]], color: '#3553a6', text: '水往下淌', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '厚度一变，彩带就跟着流淌', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '快破前的暗斑', duration: 11,
        cues: [
          { kind: 'count', at: [340, 380], label: '顶端薄到约', start: 200, end: 25, unit: '纳米', from: 0.6 },
          { kind: 'shape', shape: 'circle', at: [780, 430], size: [300, 300], color: '#fcc2d7', from: 0.4 },
          { kind: 'shape', shape: 'pill', at: [780, 320], size: [170, 60], color: '#212529', text: '暗斑', from: 2.4 },
          { kind: 'pulse', at: [780, 430], color: '#74c0fc', radius: 190, from: 5.2 },
          { kind: 'text', at: [600, 810], text: '所有颜色都抵消，马上要破啦', from: 6.5 },
        ],
      },
      {
        turn: 4, title: '羽毛和镜片膜', duration: 10,
        cues: [
          { kind: 'sprite', icon: '🦚', path: [[340, 440]], size: 140, from: 0.4 },
          { kind: 'label', at: [340, 530], pos: [340, 660], text: '结构反射出金属彩光', from: 1.6 },
          { kind: 'sprite', icon: '👓', path: [[840, 440]], size: 140, from: 2.2 },
          { kind: 'label', at: [840, 530], pos: [840, 660], text: '增透膜故意抵消反光', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '不用颜料，也能用波调出颜色', from: 6 },
        ],
      },
    ],
  },
};
