import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    watch: { ignored: ['**/.story-preview/**'] },
  },
  build: {
    outDir: 'dist',
  },
});
