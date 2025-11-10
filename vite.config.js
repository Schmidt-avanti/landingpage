import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // 👈 this is the fix
  build: {
    outDir: 'dist',
  },
});
