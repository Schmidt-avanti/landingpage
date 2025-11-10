import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './', // 👈 THIS is the important line
  root: path.resolve(__dirname),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
