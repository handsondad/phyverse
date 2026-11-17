import type { Story } from './types';

const WIRE = '#5d4e37';
const HOT = '#e8590c';

export const chargerWarm: Story = {
  slug: 'charger-warm',
  title: '手机充电时为什么会发热？',
  trigger: '晚上，爸爸的手机插着充电器放在桌上。小念拿起来一摸，背面暖乎乎的，充电头也有点热。',
  dialogue: [
    {
      nian: '爸爸，手机充电的时候，为什么摸着暖乎乎的？',
      dad: '因为电流流过有电阻的东西，总会生热。充电时，电流要穿过充电头、充电线，再流进手机里的电池，这些东西都有电阻。电荷挤过去时撞来撞去，一部分电能就变成了热，摸上去就暖乎乎的。电水壶、电暖器，就是专门用这种热来干活的。',
    },
    {
      nian: '电流流过电阻会生热……那电流越大，是不是热得越厉害？',
      dad: '对，而且不止多一点。英国物理学家焦耳做实验发现，电流产生的热，跟电流的平方、电阻和通电时间成正比。电流变成 2 倍，生的热就变成 4 倍；电阻越大、通电越久，热得也越多。这叫焦耳定律。',
      eq: 'Q = I²Rt',
      figure: { kind: 'sim', sim: 'joule', caption: '调一调充电电流，再换一根细细的劣质线：导线每秒生多少热？' },
    },
    {
      nian: '电阻越大热得越多……那劣质的细充电线是不是更危险？',
      dad: '是的。细线、劣质线电阻大，同样的电流流过，生的热更多，外皮还薄，时间长了容易发烫、老化，甚至短路起火。很多人以为手机一发热就说明快坏了，其实充电时稍微发热很正常，可要是烫得厉害，就该马上停下来检查。',
    },
    {
      nian: '烫得厉害就要停下来……那充电时还要注意什么？',
      dad: '国家消防救援局提醒：手机不要整夜充电，充满了就把充电器拔掉；充电器长期插在插座上不拔，会一直发热、加速老化。别在枕头边、被窝里充电，热散不出去，万一起火，被褥一下就烧起来了。还要用原装或合格的充电器。',
    },
    {
      nian: '热散不出去……那为什么边充电边玩游戏，手机会更烫？',
      dad: '因为手机里的芯片、屏幕一干活也要用电，同样会生热。一边充电，一边玩游戏，电池在发热，芯片也在发热，热量叠在一起，手机就更烫了。消防部门的科普也说，充电时尽量不要用手机，打电话、玩游戏都会让热量升得更快。',
    },
    {
      nian: '我懂了！电流流过有电阻的东西就会生热，电流变成 2 倍，热就变成 4 倍。所以充电要用合格的线，别在被窝里充，太烫了就停下来。',
      dad: '说得对！下次充电时，把手机放在桌面上，过一会儿摸摸充电头和手机背面，再想想热是从哪儿来的。',
    },
  ],
  tip: '互动图里导线的电阻和生热是示意数。手机、充电宝明显鼓包、冒烟或烫得握不住时，要马上拔掉电源、告诉大人，不要再继续用。',
  sources: [
    { title: '物理 九年级全一册 · 第十八章 电功率 · 第4节 焦耳定律', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: '你的手机充电器还没拔？这个举动很危险→（不整夜充电、不在枕头附近充、充电时少用手机）', by: '国家消防救援局', url: 'https://www.119.gov.cn/kp/hzyf/jt/2024/46648.shtml' },
    { title: '手机充电小贴士，请查收！（充满就拔、用原装充电器、远离床铺充电）', by: '应急管理部（晋城市人民政府网站转载）', url: 'https://www.jcgov.gov.cn/dtxx/zxts/202605/t20260519_2351387.shtml' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '电流会生热', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [220, 450], size: [150, 160], color: '#f4efe4', text: '充电头', from: 0 },
          { kind: 'ray', path: [[295, 450], [560, 570], [880, 450]], color: WIRE, draw: 1.2, from: 0.5 },
          { kind: 'shape', shape: 'rect', at: [970, 450], size: [150, 280], color: '#2f3640', text: '手机', from: 0 },
          { kind: 'pulse', at: [560, 570], color: HOT, radius: 60, from: 3 },
          { kind: 'pulse', at: [970, 450], color: HOT, radius: 100, from: 4 },
          { kind: 'text', at: [600, 830], text: '电能变成了热', from: 7 },
        ],
      },
      {
        turn: 1, title: '焦耳定律', duration: 12,
        cues: [
          { kind: 'formula', at: [600, 280], text: 'Q = I²Rt', from: 0.5 },
          { kind: 'count', at: [330, 540], label: '电流变成', start: 0, end: 2, unit: '倍', over: 1, from: 3 },
          { kind: 'count', at: [870, 540], label: '生热变成', start: 0, end: 4, unit: '倍', over: 1.5, from: 4.5 },
          { kind: 'text', at: [600, 830], text: '电流 2 倍，热 4 倍', from: 7.5 },
        ],
      },
      {
        turn: 2, title: '劣质线更热', duration: 12,
        cues: [
          { kind: 'ray', path: [[150, 340], [1050, 340]], color: WIRE, draw: 1, from: 0.5 },
          { kind: 'ray', path: [[150, 560], [1050, 560]], color: HOT, draw: 1, from: 1.5 },
          { kind: 'label', at: [300, 340], pos: [300, 230], text: '合格的粗线', from: 1.5 },
          { kind: 'label', at: [300, 560], pos: [300, 660], text: '劣质的细线', from: 2.5 },
          { kind: 'pulse', at: [720, 560], color: HOT, radius: 80, from: 3.5 },
          { kind: 'myth', wrong: '充电发热说明快坏了', right: '电流流过电阻总会生热', from: 7 },
        ],
      },
      {
        turn: 3, title: '别在枕边充', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🛏️', path: [[380, 560]], size: 240, from: 0 },
          { kind: 'sprite', icon: '📱', path: [[330, 500]], size: 80, from: 1 },
          { kind: 'sprite', icon: '🚫', path: [[510, 420]], size: 120, from: 2 },
          { kind: 'sprite', icon: '🔌', path: [[880, 520]], size: 140, from: 3 },
          { kind: 'label', at: [880, 480], pos: [900, 300], text: '充满就拔掉', from: 4 },
          { kind: 'text', at: [600, 830], text: '用合格的充电器', from: 7 },
        ],
      },
      {
        turn: 4, title: '热量叠在一起', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 470], size: [220, 400], color: '#2f3640', from: 0 },
          { kind: 'pulse', at: [600, 380], color: HOT, radius: 80, from: 1 },
          { kind: 'label', at: [640, 380], pos: [930, 300], text: '芯片在发热', from: 1.5 },
          { kind: 'pulse', at: [600, 570], color: '#ffb703', radius: 80, from: 2.5 },
          { kind: 'label', at: [640, 570], pos: [930, 640], text: '电池在发热', from: 3 },
          { kind: 'text', at: [600, 830], text: '充电时少玩手机', from: 7 },
        ],
      },
    ],
  },
};
