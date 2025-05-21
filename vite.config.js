import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        preise: resolve(__dirname, 'preise.html'),
        danke: resolve(__dirname, 'danke.html'),
      },
    },
  },
});
