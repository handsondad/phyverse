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
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          if (norm.includes('/src/data/')) return 'data';
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
