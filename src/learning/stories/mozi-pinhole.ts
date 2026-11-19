import type { Story } from './types';

const DARK = '#2b2f3a';
const BOARD = '#8b7a5c';
const SUN = '#ffd43b';
const HOT = '#e8590c';

export const moziPinhole: Story = {
  slug: 'mozi-pinhole',
  title: '两千多年前，墨家怎么知道小孔里的像是倒的？',
  trigger: '小念在中国科技馆“华夏之光”展厅走进一间小黑屋，对面白墙上映出屋外走动的人，可每个人都是头朝下的，她拉着爸爸问个不停。',
  dialogue: [
    {
      nian: '爸爸，墙上的人怎么都是头朝下的？是屋子里装了什么机关吗？',
      dad: '没有机关，只有墙上一个小孔！这叫小孔成像，两千多年前的墨家就做过这个实验。光沿直线走，人头顶的光穿过小孔，一路斜着往下，落到墙的下方；脚下的光穿过小孔往上走，落到墙的上方。上下的光在孔那里交叉，像就倒过来了。',
      figure: { kind: 'sim', sim: 'pinhole', caption: '拖动“人离小孔”，看屏上的倒像怎样变大变小；再把孔换成大孔，看像怎样糊掉。' },
    },
    {
      nian: '墨家？墨家是谁，他们也有这样一间小黑屋吗？',
      dad: '墨家是战国时墨子和他的弟子们，他们把学问记在《墨经》里。书里有一句：“景到，在午有端，与景长，说在端。”景就是像，到通“倒”，午是光线交叉的地方，端就是那个小孔。中国科技馆的这间小黑屋，就是照着这段文字复原的。',
    },
    {
      nian: '光线交叉的地方……为什么一定要在那儿开一个小小的孔？',
      dad: '因为孔小，人身上每一点的光只能挑一条路穿过去，在墙上落成一个小亮点，无数小亮点拼起来，才是清楚的像。孔要是开得太大，同一点的光能从孔里很多位置钻过去，落成一大片，许多个像叠在一起，就糊成一团了。',
    },
    {
      nian: '糊成一团就看不清了……那人走近走远，墙上的像会变吗？',
      dad: '会！《墨经》里也写了：人离小孔远，像就小；离得近，像就大。你在互动图里把人拉近，交叉后的光张得更开，像就变大。墨家没有精密的仪器，却靠一次次观察把规律写了下来。国外已知最早研究小孔成像的记录，要晚一千多年。',
    },
    {
      nian: '晚一千多年……那今天还有什么东西用到了小孔成像？',
      dad: '照相机就是它的后代！早期的“暗箱”就是一个开了小孔的黑盒子，后来人们在孔上装了透镜，既能让更多光进来，又能让像保持清楚。日偏食的时候，树叶缝隙在地上投出一个个小月牙，也是天然的小孔成像。',
    },
    {
      nian: '我懂了！光沿直线走，头顶的光穿过小孔往下、脚下的光往上，在孔那里交叉，所以像是倒的；孔要小像才清楚，人越近像越大，墨家两千多年前就把它写进了《墨经》。',
      dad: '说得太好了！周末我们拿个鞋盒扎个小孔，蒙上一层薄纸当屏，对着窗外看一看，自己做一间墨家的“小黑屋”。',
    },
  ],
  tip: '自己做小孔成像：鞋盒一端用针扎一个小孔，另一端挖空蒙上半透明的硫酸纸，蒙住头对着明亮的窗外就能看到倒像。千万不要用它或任何东西直接看太阳；日食时可以看树荫下小孔投在地上的光斑。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第1节 光的直线传播（小孔成像）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '华夏之光 · 小孔成像（《墨经》“景到，在午有端，与景长，说在端”；像的大小与人到小孔的距离有关；国外已知最早的研究在 11 世纪初）', by: '中国科学技术馆', url: 'https://www.cdstm.cn/museum/zphc/hxzg2017x/art/2017/art_166f4587bd924a3f9b98f87607ea214b.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '小孔让人倒立', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [1000, 560], color: DARK, from: 0 },
          { kind: 'shape', shape: 'rect', at: [560, 300], size: [18, 280], color: BOARD, from: 0.3 },
          { kind: 'shape', shape: 'rect', at: [560, 620], size: [18, 280], color: BOARD, from: 0.3 },
          { kind: 'sprite', icon: '🧍', path: [[300, 460]], size: 160, from: 0.6 },
          { kind: 'ray', path: [[300, 390], [560, 460], [880, 560]], color: SUN, draw: 1.2, from: 1.5 },
          { kind: 'ray', path: [[300, 540], [560, 460], [880, 360]], color: HOT, draw: 1.2, from: 2.6 },
          { kind: 'label', at: [880, 560], pos: [990, 660], text: '头顶的光落到下面', from: 4.2 },
          { kind: 'text', at: [600, 820], text: '光走直线，在孔里交叉', from: 6.5 },
        ],
      },
      {
        turn: 1, title: '墨经里的一句话', duration: 10,
        cues: [
          { kind: 'text', at: [600, 320], text: '景到，在午有端', size: 'l', from: 0.4 },
          { kind: 'label', at: [440, 330], pos: [300, 500], text: '景是像，到是倒', from: 2 },
          { kind: 'label', at: [660, 330], pos: [640, 560], text: '午：光线交叉处', from: 3.2 },
          { kind: 'label', at: [800, 330], pos: [960, 480], text: '端：小孔', from: 4.4 },
          { kind: 'text', at: [600, 820], text: '科技馆照着它复原', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '孔大就糊了', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [340, 360], size: [40, 40], color: '#f59f00', from: 0.3 },
          { kind: 'ray', path: [[340, 360], [600, 360], [860, 360]], color: '#f59f00', draw: 1, from: 0.8 },
          { kind: 'label', at: [860, 360], pos: [1000, 260], text: '小孔：清楚一点', from: 2.2 },
          { kind: 'shape', shape: 'circle', at: [340, 620], size: [40, 40], color: '#f59f00', from: 4.5 },
          { kind: 'flow', path: [[340, 620], [600, 570], [860, 530]], color: '#f59f00', count: 3, from: 5 },
          { kind: 'flow', path: [[340, 620], [600, 670], [860, 710]], color: '#f59f00', count: 3, from: 5 },
          { kind: 'shape', shape: 'circle', at: [860, 620], size: [200, 200], color: '#ffe8a3', from: 6.2 },
          { kind: 'label', at: [860, 620], pos: [1010, 790], text: '大孔：糊成一片', from: 7.4 },
        ],
      },
      {
        turn: 3, title: '近大远小', duration: 10,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 460], size: [16, 420], color: BOARD, from: 0 },
          { kind: 'sprite', icon: '🧍', path: [[220, 460], [440, 460]], size: 130, travel: 4, from: 0.4 },
          { kind: 'label', at: [440, 540], pos: [440, 690], text: '人走近小孔', from: 1.5 },
          { kind: 'meter', at: [900, 320], label: '像的大小', start: 25, end: 90, over: 4, from: 1 },
          { kind: 'text', at: [600, 820], text: '离得越近，像越大', from: 6 },
        ],
      },
      {
        turn: 4, title: '照相机的祖先', duration: 10,
        cues: [
          { kind: 'sprite', icon: '📦', path: [[360, 440]], size: 150, from: 0.3 },
          { kind: 'label', at: [360, 500], pos: [360, 660], text: '暗箱：带小孔的盒子', from: 1.2 },
          { kind: 'arrow', path: [[480, 440], [720, 440]], color: HOT, text: '装上透镜', from: 2.4 },
          { kind: 'sprite', icon: '📷', path: [[840, 440]], size: 150, from: 3.4 },
          { kind: 'text', at: [600, 820], text: '照相机是它的后代', from: 6 },
        ],
      },
    ],
  },
};
