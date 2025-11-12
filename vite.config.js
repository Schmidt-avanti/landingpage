import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
      minify: false,
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
})
