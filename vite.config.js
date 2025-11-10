import { defineConfig } from 'vite'

export default defineConfig({
  base: '', // 👈 NOTE: empty string, not './'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
