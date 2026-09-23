import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/edugo/',
  plugins: [
    UnoCSS(),
    vue(),
  ],
  build: {
    outDir: 'dist',
  },
})
