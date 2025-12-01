import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',   // ← REQUIRED FIX
  base: './',
  build: {
    minify: false,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        preise: 'preise.html',
        datenschutz: 'datenschutz.html',
        impressum: 'impressum.html'
      }
    }
  }
})
