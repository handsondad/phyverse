import type { Story } from './types';

const CLOUD = '#495670';
const BOLT = '#ffd43b';
const EARTH_SOIL = '#6b563c';

export const lightningRod: Story = {
  slug: 'lightning-rod',
  title: '楼顶上的避雷针是把雷“挡走”，还是把雷“引过来”？',
  trigger: '夏天的雷阵雨快来了，乌云压得很低，小念站在窗边看见对面高楼顶上竖着一根尖尖的金属杆，指着它问爸爸。',
  dialogue: [
    {
      nian: '爸爸，楼顶上的避雷针是像盾牌一样把雷“挡走”，还是把雷“引过来”？',
      dad: '说出来你可能吓一跳：它的名字虽然叫“避雷针”，干的活却是把劈向大楼的雷“接住引下来”！很多人以为避雷针能把闪电吓跑，其实中国气象局的雷电专家专门解释过，避雷针本身就是一根“引雷针”，现在国家防雷标准里干脆改名叫接闪杆。',
    },
    {
      nian: '改名叫接闪杆……把雷接过来，大楼岂不是更危险了？',
      dad: '要是只竖一根铁杆不管后头，那确实更危险！真正的防雷装置是一整套三件宝：楼顶高高竖起的接闪杆、顺着外墙或柱子通下去的粗引下线、还有深埋在地底下的接地网。它故意比楼房高出一截，替整栋楼挨这一劈，再顺着电阻极小的金属通道把大电流直接送进大地。',
      figure: { kind: 'sim', sim: 'lightningRod', caption: '对比“没装接闪杆”“装了接闪杆并可靠接地”和“引下线半路断了”，看看几万安的雷电流往哪儿走。' },
    },
    {
      nian: '电阻极小的金属通道……为什么闪电偏偏喜欢挑那根高高的尖杆劈呢？',
      dad: '因为带负电的雷雨云压过来时，地面和楼房上会被吸引出大量的正电荷。电荷有个脾气：越是高耸、尖锐的导体顶端，电荷挤得越密，周围电场越强，最容易先把空气打通成导电通道。于是闪电还没碰到水泥屋顶，就先被接闪杆的尖端稳稳截住了。',
    },
    {
      nian: '被尖端稳稳截住了……那要是楼顶装了接闪杆，屋里的电器就绝对安全了吗？',
      dad: '还不能掉以轻心。中国气象局和美国国家气象局都提醒，接闪杆主要防的是直接劈下来的直击雷；可闪电落下的瞬间，强大的电磁脉冲还会在附近的电线、网线里激起感应高压，顺着电线钻进屋里打坏电器，所以配电箱里还要装电涌保护器，打雷时最好拔掉贵重电器插头。',
    },
    {
      nian: '还要装电涌保护器……那我们在户外碰到打雷，为什么绝对不能躲到大树底下？',
      dad: '因为孤立的大树又高又突出，就像一根竖在野地里的接闪杆，特别容易被雷劈中；可树干不是好导体，也没有专用引下线，雷电流劈中大树时会向四周跳火、顺着潮湿地面乱窜，站在树下的人非常危险。听见雷声最好的办法，就是立刻进到有防雷装置的封闭楼房或全金属车厢里。',
    },
    {
      nian: '我明白了！避雷针不是把雷吓跑，而是靠高耸的金属尖端主动接住闪电，再顺着引下线和接地网把雷电流安全送进大地；户外打雷时千万不能站大树下，要赶紧进屋躲避。',
      dad: '记住了最要紧的一条！气象部门有句顺口溜叫“听到雷声就进屋”，等最后一声雷响过去半小时，再出门玩最稳当。',
    },
  ],
  tip: '防雷安全红线：雷雨天气严禁在旷野打金属杆雨伞、举球拍鱼竿，严禁在大树、孤立凉亭下躲雨或在水里游泳；切勿私自在屋顶电视天线上绑铁杆当“土法避雷针”，正规建筑防雷装置须由专业机构按国家标准施工和定期检测。',
  sources: [
    { title: '物理 必修 第三册 · 第九章 静电场及其应用 · 第4节 静电的防止与利用（尖端放电与避雷针）', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '安装避雷针是否还会被雷击？（避雷针本质是引雷针：接闪器、引下线与接地体，直击雷与感应雷防护）', by: '中国气象局', url: 'https://www.cma.gov.cn/kppd/kppdqxsj/kppdldfh/201909/t20190927_536491.html' },
    { title: 'Lightning Rods（防雷系统并不阻止雷击，而是拦截雷击并提供通往接地网的低阻通路）', by: '美国国家气象局（NOAA NWS）', url: 'https://www.weather.gov/safety/lightning-rods' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '避雷其实是接雷', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 230], size: [520, 110], color: CLOUD, text: '雷雨云', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [260, 220], color: '#e9dcc9', text: '高楼', from: 0.5 },
          { kind: 'bond', a: [600, 360], b: [600, 450], color: BOLT, from: 1 },
          { kind: 'ray', path: [[580, 285], [620, 325], [600, 360]], color: BOLT, draw: 0.6, from: 2 },
          { kind: 'myth', wrong: '避雷针能把闪电吓跑挡开', right: '主动接住闪电再安全导入大地', from: 6 },
        ],
      },
      {
        turn: 1, title: '防雷三件宝', duration: 11,
        cues: [
          { kind: 'shape', shape: 'rect', at: [540, 500], size: [240, 220], color: '#e9dcc9', text: '大楼', from: 0.2 },
          { kind: 'shape', shape: 'rect', at: [600, 660], size: [960, 90], color: EARTH_SOIL, text: '大地', from: 0.2 },
          { kind: 'bond', a: [540, 310], b: [540, 390], color: BOLT, from: 0.8 },
          { kind: 'bond', a: [540, 390], b: [690, 390], color: BOLT, from: 1.4 },
          { kind: 'bond', a: [690, 390], b: [690, 650], color: BOLT, from: 1.8 },
          { kind: 'flow', path: [[540, 310], [690, 390], [690, 650]], color: '#fff3bf', count: 6, speed: 240, from: 2.6 },
          { kind: 'label', at: [690, 500], pos: [900, 480], text: '接闪杆+引下线+接地网', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '给雷电流修一条入地滑梯', from: 6.5 },
        ],
      },
      {
        turn: 2, title: '尖端聚满电荷', duration: 11,
        cues: [
          { kind: 'shape', shape: 'pill', at: [600, 230], size: [500, 96], color: CLOUD, text: '云底带负电', from: 0.2 },
          { kind: 'bond', a: [600, 410], b: [600, 640], color: '#8b7a5c', from: 0.8 },
          { kind: 'atom', path: [[560, 390]], symbol: '+', color: '#e8590c', r: 22, from: 1.6 },
          { kind: 'atom', path: [[600, 375]], symbol: '+', color: '#e8590c', r: 22, from: 2 },
          { kind: 'atom', path: [[640, 390]], symbol: '+', color: '#e8590c', r: 22, from: 2.4 },
          { kind: 'pulse', at: [600, 390], color: BOLT, radius: 110, from: 3.4 },
          { kind: 'text', at: [600, 810], text: '又高又尖，最先把闪电接住', from: 6.5 },
        ],
      },
      {
        turn: 3, title: '还要防感应雷', duration: 10,
        cues: [
          { kind: 'pulse', at: [320, 360], color: BOLT, radius: 220, from: 0.6 },
          { kind: 'bond', a: [480, 460], b: [860, 460], color: '#5d4e37', from: 1 },
          { kind: 'shape', shape: 'rect', at: [680, 460], size: [180, 80], color: '#2f9e44', text: '保护器', from: 2 },
          { kind: 'sprite', icon: '📺', path: [[950, 450]], size: 110, from: 1.4 },
          { kind: 'text', at: [600, 810], text: '电涌保护器拦住电线上的浪涌', from: 6 },
        ],
      },
      {
        turn: 4, title: '打雷别站树下', duration: 11,
        cues: [
          { kind: 'sprite', icon: '🌳', path: [[340, 450]], size: 170, from: 0.3 },
          { kind: 'sprite', icon: '🚫', path: [[340, 450]], size: 210, from: 1.4 },
          { kind: 'label', at: [340, 560], pos: [340, 680], text: '孤立大树易遭雷劈', from: 2 },
          { kind: 'sprite', icon: '🏢', path: [[840, 450]], size: 160, from: 2.6 },
          { kind: 'label', at: [840, 560], pos: [840, 680], text: '进封闭楼房最安全', from: 3.2 },
          { kind: 'text', at: [600, 810], text: '听到雷声就进屋！', from: 6.5 },
        ],
      },
    ],
  },
};
