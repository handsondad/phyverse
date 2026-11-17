import type { Story } from './types';

export const mirrorFlip: Story = {
  slug: 'mirror-flip',
  title: '镜子为什么左右颠倒，却不上下颠倒？',
  trigger: '小念对着穿衣镜举起右手，镜子里的“小念”举的好像是左手。可镜子里的头还在上面，脚还在下面。',
  dialogue: [
    {
      nian: '爸爸，镜子为什么把左右换了，却不把上下也换一换？',
      dad: '先看看镜子到底做了什么。平面镜里的像和你一样大，你离镜子多远，像就在镜子后面多远，像和你对着镜面是对称的。你举起右手，镜子里举起的那只手，其实和你的右手在同一边，并没有跑到另一边去。',
    },
    {
      nian: '镜子里举起的手和我在同一边？那到底换了什么？',
      dad: '换的是前后。你的脸朝着镜子，镜子里的你脸却朝着你；你的鼻尖离镜子最近，像的鼻尖也离镜子最近。镜子只会把朝着它和背着它的方向翻过来。新南威尔士大学的物理老师还试过：躺在地上、脚朝镜子，镜子里就成了头脚颠倒。',
      figure: { kind: 'sim', sim: 'mirror', caption: '换一换动作：镜子里哪些方向没变？哪个方向翻过来了？' },
    },
    {
      nian: '脚朝镜子就头脚颠倒？那我站着照，为什么总觉得是左右换了？',
      dad: '这是我们脑子里在“变魔术”。我们把镜子里的像想成一个绕过来、面对面站着的人，人转身时左右就对调了，于是觉得它举的是左手。其实没有人转身，镜子只是把前后翻了。很多人以为镜子会把左右翻过来，其实它翻的是前后。',
    },
    {
      nian: '镜子翻的是前后……那纸上写的字，在镜子里为什么是反的？',
      dad: '因为你为了让镜子“看到”字，先把纸转了个面，让字朝着镜子。你把写了字的纸对着窗户，从背面看，看到的也是反字，和镜子里一模一样。所以字不是被镜子打乱的，只是你把纸转了个面。',
    },
    {
      nian: '原来是把纸转了个面……那要照见全身，镜子得有我这么高吗？',
      dad: '不用，有你身高的一半就够了。从头顶射到镜子再进你眼睛的光，正好碰在镜子上头顶和眼睛中间的高度；脚发出的光也一样。算下来，镜子只要有你一半高、挂对位置，就能从头照到脚，而且和你站得远近没有关系。',
    },
    {
      nian: '我懂了！镜子里的像和我一样大、一样远，和我对着镜面对称。镜子没有换左右，它翻的是前后，是我们把像想成转过身的人，才觉得左右反了。',
      dad: '说得好！拿一张写了字的纸，先从背面对着窗户看看，再拿到镜子前看看，比一比两个反字是不是一模一样。',
    },
  ],
  tip: '“镜子到底换没换左右”，物理学家也常拿来讨论，关键在于怎么规定左右。只要记住：平面镜里的像和物体关于镜面对称，翻过来的是垂直于镜面的那个方向。',
  sources: [
    { title: '物理 八年级上册 · 第四章 光现象 · 第3节 平面镜成像', by: '人民教育出版社', url: 'https://jc.pep.com.cn/' },
    { title: 'Mirrors and images（镜子翻的是前后、半身高的镜子照全身）', by: 'Physclips · UNSW Sydney', url: 'https://www.animations.physics.unsw.edu.au/jw/light/mirrors-and-images.htm' },
    { title: 'Mirror Symmetry（从纸背面看字与镜像）', by: 'Department of Physics · University of Toronto', url: 'https://faraday.physics.utoronto.ca/GeneralInterest/Harrison/Parity/Parity.html' },
  ],
  film: {
    scenes: [
      {
        turn: 0, title: '一样大一样远', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 480], size: [16, 460], color: '#cfe5f7', from: 0 },
          { kind: 'label', at: [600, 300], pos: [600, 190], text: '镜面', from: 0.6 },
          { kind: 'sprite', icon: '🧍', path: [[360, 500]], size: 200, from: 0.4 },
          { kind: 'sprite', icon: '🧍', path: [[840, 500]], size: 200, from: 1.6 },
          { kind: 'arrow', path: [[380, 680], [590, 680]], color: '#3553a6', text: '一样远', draw: 0.8, from: 3 },
          { kind: 'arrow', path: [[820, 680], [610, 680]], color: '#3553a6', draw: 0.8, from: 3 },
          { kind: 'text', at: [600, 830], text: '和你一样大、一样远', from: 7 },
        ],
      },
      {
        turn: 1, title: '换的是前后', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [600, 450], size: [16, 420], color: '#cfe5f7', from: 0 },
          { kind: 'arrow', path: [[260, 400], [570, 400]], color: '#e8590c', text: '脸朝镜子', draw: 1, from: 1 },
          { kind: 'arrow', path: [[940, 500], [630, 500]], color: '#e8590c', text: '像脸朝你', draw: 1, from: 2.6 },
          { kind: 'text', at: [600, 210], text: '前后翻了过来', from: 5 },
          { kind: 'text', at: [600, 830], text: '躺下：头脚就颠倒了', from: 8 },
        ],
      },
      {
        turn: 2, title: '脑子在变魔术', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧍', path: [[340, 500]], size: 200, from: 0 },
          { kind: 'sprite', icon: '🔄', path: [[600, 320]], size: 100, from: 1.6 },
          { kind: 'sprite', icon: '🧍', path: [[860, 500]], size: 200, from: 0 },
          { kind: 'label', at: [860, 420], pos: [1000, 250], text: '想成转过身', from: 2.4 },
          { kind: 'myth', wrong: '镜子把左右翻过来', right: '镜子翻的是前后', from: 7 },
        ],
      },
      {
        turn: 3, title: '反字的秘密', duration: 12,
        cues: [
          { kind: 'shape', shape: 'rect', at: [380, 460], size: [240, 180], color: '#fffdf5', text: 'R', from: 0.4 },
          { kind: 'label', at: [380, 550], pos: [380, 690], text: '纸的正面', from: 1 },
          { kind: 'shape', shape: 'rect', at: [820, 460], size: [240, 180], color: '#fffdf5', text: 'Я', from: 2.6 },
          { kind: 'label', at: [820, 550], pos: [820, 690], text: '从背面看', from: 3.2 },
          { kind: 'text', at: [600, 830], text: '和镜子里一模一样', from: 7 },
        ],
      },
      {
        turn: 4, title: '半身高就够', duration: 12,
        cues: [
          { kind: 'sprite', icon: '🧍', path: [[340, 500]], size: 300, from: 0 },
          { kind: 'shape', shape: 'rect', at: [760, 460], size: [16, 170], color: '#cfe5f7', from: 0.8 },
          { kind: 'ray', path: [[360, 360], [752, 382], [372, 404]], color: '#f5b800', draw: 1.2, from: 2 },
          { kind: 'ray', path: [[360, 650], [752, 528], [372, 404]], color: '#e8590c', draw: 1.2, from: 4 },
          { kind: 'label', at: [768, 460], pos: [960, 300], text: '一半高就够', from: 5.6 },
          { kind: 'text', at: [600, 830], text: '和站多远没关系', from: 7.5 },
        ],
      },
    ],
  },
};
