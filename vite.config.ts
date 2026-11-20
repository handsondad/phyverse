import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: { ignored: ['**/.story-preview/**'] },
  },
  build: {
    outDir: 'dist',
    // three.js 仅在首页空闲且支持 WebGL 时按需懒加载，不进首屏包
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        // 只把明确点名的模块放进手动分包：别让 sims 包把首页也要用的 html 小工具吞进去，害首页白拉整包互动图
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          // 首页用的轻量问题索引单独留在主包里，别把配音清单和课件对话（data 包）一起拖上首屏
          if (norm.includes('/src/data/') && !norm.endsWith('/lesson-index.json')) return 'data';
          if (norm.includes('/src/learning/simlib/') || norm.endsWith('/src/learning/sims.ts')) return 'sims';
          const storyMatch = /\/src\/learning\/stories\/([a-z0-9-]+)\.ts$/.exec(norm);
          if (storyMatch && !['index', 'types', 'rules'].includes(storyMatch[1])) {
            return storyMatch[1] < 'n' ? 'stories-a' : 'stories-b';
          }
          return undefined;
        },
      },
    },
  },
});
