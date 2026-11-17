import type { Story } from './types';

export const myopia: Story = {
  slug: 'myopia',
  title: '近视眼镜为什么是中间薄、边上厚的？',
  trigger: '同桌戴着一副近视眼镜。小念借来一看，镜片中间薄、边上厚，透过它看书，字反而变小了。',
  dialogue: [
    {
      nian: '爸爸，近视眼镜为什么中间薄、边上厚？透过它看字怎么还变小了？',
      dad: '因为它是凹透镜，和放大镜正好相反。放大镜中间厚，会把光往中间拢；凹透镜中间薄、边上厚，会把光往外散开一点。透过它看东西，看到的是缩小的像，所以字变小了。近视的同学，正需要它这个把光散开的本事。',
    },
    {
      nian: '正需要把光散开？近视的眼睛到底出了什么问题？',
      dad: '先说正常的眼睛。眼睛前面的晶状体相当于一个凸透镜，能把远处来的光正好聚在眼底的视网膜上，就看得清。近视的眼睛常常是眼球长得偏长，光还没走到视网膜就聚成了一点，到视网膜上又散开了，远处的东西就模糊一片。',
      figure: { kind: 'sim', sim: 'eyeFocus', caption: '换一换眼睛和眼镜：远处来的光聚在哪儿？黑板看得清吗？' },
    },
    {
      nian: '光还没走到视网膜就聚成一点？那凹透镜是怎么帮忙的？',
      dad: '凹透镜先把光稍稍散开一点，再让它进眼睛，聚的那一点就往后挪，正好落回视网膜上，黑板就又清楚了。很多人以为眼镜是把东西放大了才看得清，其实近视镜是把光散开一点，让像退回到视网膜上。',
    },
    {
      nian: '让像退回到视网膜上……那戴了眼镜，近视就治好了吗？',
      dad: '没有。眼镜只是帮你看清，眼球的长短并没有变回去。国家卫健委的近视防控知识里说，近视可防可控但不可逆，一旦近视了，还得按时复查，及时换合适的眼镜。所以最要紧的，是别让近视找上门。',
    },
    {
      nian: '别让近视找上门……那要怎么做才能预防？',
      dad: '最管用的是多到户外去。国家卫健委建议，每天白天在户外活动不少于 2 小时，阴天也有用。近处看书写字 20 分钟，就抬头看看 6 米以外的地方，至少 20 秒。全国 2020 年的调查显示，儿童青少年的近视率已经达到 52.7%。',
    },
    {
      nian: '我懂了！近视常常是眼球偏长，光聚在视网膜前面，看远处就模糊。近视镜是凹透镜，把光散开一点，让像落回视网膜上。每天到户外玩够 2 小时，能帮着预防近视。',
      dad: '说得对！今天就试试“20—20—20”：看书 20 分钟，抬头望一望窗外远处的树，数到 20 再低头。',
    },
  ],
  tip: '近视要到正规医院验光以后再配镜，别人的眼镜不能乱戴。互动图把眼球画大了，光路只是示意。',
  sources: [
    { title: '物理 八年级上册 · 第五章 透镜及其应用 · 第4节 眼睛和眼镜', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '防控儿童青少年近视核心知识十条（户外 2 小时、“20—20—20”、可防可控不可逆）', by: '国家卫生健康委员会', url: 'https://www.nhc.gov.cn/fys/c100078/202307/a210193cfd774009a1db0399d713fec9.shtml' },
    { title: '暑期不上课，眼睛也要放假（2020 年儿童青少年总体近视率 52.7%）', by: '广东省疾病预防控制中心', url: 'https://cdcp.gd.gov.cn/jkjy/jkts/content/post_4229555.html' },
    { title: 'Nearsightedness (Myopia)（眼球偏长，光聚在视网膜前面）', by: 'National Eye Institute（美国国家眼科研究所）', url: 'https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/nearsightedness-myopia' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '中间薄边上厚', duration: 12,
        cues: [
          { kind: 'shape', shape: 'pill', at: [380, 450], size: [70, 300], color: '#dff1fb', text: '凸', from: 0 },
          { kind: 'ray', path: [[120, 380], [380, 380], [560, 450]], color: '#f5b800', draw: 1, from: 0.8 },
          { kind: 'ray', path: [[120, 520], [380, 520], [560, 450]], color: '#f5b800', draw: 1, from: 0.8 },
          { kind: 'shape', shape: 'rect', at: [820, 450], size: [60, 300], color: '#dff1fb', text: '凹', from: 2.4 },
          { kind: 'ray', path: [[640, 410], [820, 410], [1100, 340]], color: '#f5b800', draw: 1, from: 3 },
          { kind: 'ray', path: [[640, 490], [820, 490], [1100, 560]], color: '#f5b800', draw: 1, from: 3 },
          { kind: 'label', at: [820, 300], pos: [820, 200], text: '中间薄、边上厚', from: 3.6 },
          { kind: 'text', at: [600, 830], text: '一个拢光，一个散光', from: 7 },
        ],
      },
      {
        turn: 1, title: '光聚早了', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [660, 450], size: [520, 380], color: '#fbfbfb', from: 0 },
          { kind: 'shape', shape: 'pill', at: [420, 450], size: [30, 180], color: '#cfe8f5', from: 0 },
          { kind: 'shape', shape: 'rect', at: [912, 450], size: [12, 260], color: '#e07a7a', from: 0 },
          { kind: 'ray', path: [[100, 390], [420, 390], [790, 450], [906, 469]], color: '#f5b800', draw: 1.4, from: 1 },
          { kind: 'ray', path: [[100, 510], [420, 510], [790, 450], [906, 431]], color: '#f5b800', draw: 1.4, from: 1 },
          { kind: 'label', at: [790, 450], pos: [760, 230], text: '还没到就聚了', from: 3 },
          { kind: 'text', at: [600, 830], text: '远处一片模糊', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '凹透镜帮忙', duration: 12,
        cues: [
          { kind: 'shape', shape: 'circle', at: [660, 450], size: [520, 380], color: '#fbfbfb', from: 0 },
          { kind: 'shape', shape: 'pill', at: [420, 450], size: [30, 180], color: '#cfe8f5', from: 0 },
          { kind: 'shape', shape: 'rect', at: [912, 450], size: [12, 260], color: '#e07a7a', from: 0 },
          { kind: 'shape', shape: 'rect', at: [200, 450], size: [30, 220], color: '#dff1fb', from: 0.6 },
          { kind: 'ray', path: [[60, 400], [200, 400], [420, 384], [906, 450]], color: '#f5b800', draw: 1.4, from: 1.4 },
          { kind: 'ray', path: [[60, 500], [200, 500], [420, 516], [906, 450]], color: '#f5b800', draw: 1.4, from: 1.4 },
          { kind: 'myth', wrong: '眼镜把东西放大了', right: '近视镜让像退回视网膜', from: 7 },
        ],
      },
      {
        turn: 3, title: '眼镜治不好', duration: 11,
        cues: [
          { kind: 'sprite', icon: '👓', path: [[600, 430]], size: 220, from: 0 },
          { kind: 'label', at: [680, 420], pos: [900, 260], text: '只是帮你看清', from: 1.4 },
          { kind: 'text', at: [600, 660], text: '可防可控，不可逆', from: 3.6 },
          { kind: 'text', at: [600, 830], text: '按时复查', from: 7 },
        ],
      },
      {
        turn: 4, title: '多到户外去', duration: 12,
        cues: [
          { kind: 'count', at: [300, 280], label: '每天户外', start: 0, end: 2, unit: '小时', from: 1, over: 1.2 },
          { kind: 'sprite', icon: '🌳', path: [[600, 540]], size: 180, from: 2 },
          { kind: 'text', at: [900, 280], text: '看远 20 秒', from: 4 },
          { kind: 'text', at: [600, 830], text: '2020 年：52.7%', from: 7.5 },
        ],
      },
    ],
  },
};
