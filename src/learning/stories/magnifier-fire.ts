import type { Story } from './types';

export const magnifierFire: Story = {
  slug: 'magnifier-fire',
  title: '放大镜为什么能把纸点着？',
  trigger: '夏天中午，爸爸陪小念在院子的空地上，拿放大镜对着太阳。下面的黑纸上出现一个小亮点，越来越亮，不一会儿竟冒起了青烟。',
  dialogue: [
    {
      nian: '爸爸，放大镜怎么能把纸点着？它会自己变出更多的光吗？',
      dad: '放大镜不会变出光来。它是中间厚、边缘薄的凸透镜，阳光穿过它时，每一束都往中间拐一点，一大片阳光就被拢到一起，聚在一个小亮点上，这个点叫焦点。照到放大镜上的阳光一点没多，只是全挤到了这一小点上。',
    },
    {
      nian: '一大片阳光挤到一小点上？那这个亮点为什么那么烫？',
      dad: '太阳光带着能量，平时散在一大片地方，每一处分到的不多。现在放大镜把它们挤到一个小点上，那里每一小块分到的能量一下子多了几百上千倍，温度飞快升高，纸就冒烟、着火了。放大镜越大，收拢的阳光越多，着得越快。',
      figure: { kind: 'sim', sim: 'burnLens', caption: '拖动放大镜离纸的距离，再换换大小：光斑多大的时候，纸最容易着？' },
    },
    {
      nian: '放大镜越大着得越快……那放大镜离纸多远最好？',
      dad: '离纸正好一个焦距的时候。太近了光还没聚拢，太远了光又交叉着散开，光斑都很大；只有在焦点上，光斑最小最亮。量一量这时放大镜到纸的距离，就是它的焦距。很多人以为放大镜能让光变多，其实它只是把一大片光聚到一点。',
    },
    {
      nian: '把一大片光聚到一点……那别的东西会不会也这样聚光？',
      dad: '会。装满水的透明瓶子中间鼓、边上薄，也像一个凸透镜。国家消防救援局的科普说，夏天车里能热到六七十摄氏度，阳光穿过瓶装水聚起来，照到的地方可能到 120 ℃ 甚至更高，旁边要是有易燃的东西就可能出事。老花镜也是凸透镜，同样别放在太阳底下晒。',
    },
    {
      nian: '老花镜也是凸透镜？那放大镜为什么还能把字放大？',
      dad: '拿放大镜看书时，书离它比一个焦距还近，书上发出的光穿过放大镜被拢了拢，眼睛顺着光往回看，就看到一个放大了的、正立的字。这个像在书的后面，并不是光真的聚成的，叫虚像。点火用的是它聚光的本事，看字用的是它放大的本事，都是凸透镜在帮忙。',
    },
    {
      nian: '我懂了！放大镜是凸透镜，把一大片阳光聚到焦点上，光没有变多，只是挤到了一小点，那里就烫得能点着纸。装水的瓶子、老花镜也会聚光，不能放在车里晒。',
      dad: '说得好！做这个实验一定要有大人在身边，在空地上用黑纸试，旁边备一杯水。千万别对着眼睛、皮肤和别人的衣服，更不能透过放大镜直接看太阳。',
    },
  ],
  tip: '互动图按焦距 10 厘米的放大镜估算，真实的光斑还和镜片好坏有关；纸上“多烫”只是示意，不是测出来的温度。',
  sources: [
    { title: '物理 八年级上册 · 第五章 透镜及其应用 · 第1节 透镜 / 第3节 凸透镜成像的规律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '瓶装水、老花镜、喷雾……高温天小心这些车内“危险品”', by: '国家消防救援局', url: 'https://www.119.gov.cn/kp/hzyf/jtgj/2025/49915.shtml' },
    { title: 'Mirrors and images（把阳光聚到一点能点着纸，对着眼睛很危险）', by: 'Physclips · UNSW Sydney', url: 'https://www.animations.physics.unsw.edu.au/jw/light/mirrors-and-images.htm' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '聚到一点', duration: 12,
        cues: [
          { kind: 'sprite', icon: '☀️', path: [[150, 210]], size: 110, from: 0 },
          { kind: 'shape', shape: 'pill', at: [500, 480], size: [36, 260], color: '#dff1fb', from: 0 },
          { kind: 'ray', path: [[90, 380], [500, 380], [820, 480]], color: '#f5b800', draw: 1.2, from: 0.8 },
          { kind: 'ray', path: [[90, 480], [820, 480]], color: '#f5b800', draw: 1.2, from: 0.8 },
          { kind: 'ray', path: [[90, 580], [500, 580], [820, 480]], color: '#f5b800', draw: 1.2, from: 0.8 },
          { kind: 'label', at: [820, 480], pos: [960, 330], text: '焦点', from: 2.6 },
          { kind: 'text', at: [600, 830], text: '光没变多，只是挤到一起', from: 7 },
        ],
      },
      {
        turn: 1, title: '挤到一小点', duration: 12,
        cues: [
          { kind: 'meter', at: [600, 250], label: '这一点有多烫', start: 0.1, end: 0.95, color: '#e8590c', from: 1, over: 4 },
          { kind: 'shape', shape: 'rect', at: [600, 560], size: [320, 200], color: '#3b3b3b', from: 0 },
          { kind: 'pulse', at: [600, 560], color: '#ffb703', radius: 70, from: 2 },
          { kind: 'sprite', icon: '🔥', path: [[600, 510]], size: 90, from: 6 },
          { kind: 'text', at: [600, 830], text: '分到的能量多了几百上千倍', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '离一个焦距', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [400, 450], size: [36, 260], color: '#dff1fb', from: 0 },
          { kind: 'ray', path: [[90, 350], [400, 350], [720, 450]], color: '#f5b800', draw: 1, from: 0.6 },
          { kind: 'ray', path: [[90, 550], [400, 550], [720, 450]], color: '#f5b800', draw: 1, from: 0.6 },
          { kind: 'shape', shape: 'rect', at: [728, 450], size: [16, 300], color: '#fffdf5', from: 0 },
          { kind: 'label', at: [728, 450], pos: [940, 300], text: '光斑最小最亮', from: 2.4 },
          { kind: 'myth', wrong: '放大镜让光变多了', right: '只是把光聚到一点', from: 7 },
        ],
      },
      {
        turn: 3, title: '水瓶也聚光', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🚗', path: [[300, 520]], size: 220, from: 0 },
          { kind: 'sprite', icon: '☀️', path: [[1000, 210]], size: 110, from: 0 },
          { kind: 'shape', shape: 'pill', at: [700, 460], size: [100, 240], color: '#cfe5f7', text: '水', from: 0.6 },
          { kind: 'ray', path: [[960, 250], [740, 420], [640, 640]], color: '#f5b800', draw: 1.2, from: 1.4 },
          { kind: 'count', at: [960, 560], label: '可能高达', start: 0, end: 120, unit: '℃', from: 4, over: 1.5 },
          { kind: 'text', at: [600, 830], text: '别把水瓶留在车里', from: 7.5 },
        ],
      },
      {
        turn: 4, title: '还能看字', duration: 12,
        cues: [
          { kind: 'sprite', icon: '📖', path: [[360, 520]], size: 140, from: 0 },
          { kind: 'shape', shape: 'pill', at: [600, 460], size: [30, 280], color: '#dff1fb', from: 0 },
          { kind: 'sprite', icon: '👁️', path: [[900, 460]], size: 90, from: 0.4 },
          { kind: 'ray', path: [[420, 490], [600, 440], [860, 455]], color: '#f5b800', draw: 1, from: 1.6 },
          { kind: 'label', at: [600, 320], pos: [600, 210], text: '凸透镜', from: 2.4 },
          { kind: 'text', at: [600, 830], text: '放大的、正立的虚像', from: 6.5 },
        ],
      },
    ],
  },
};
