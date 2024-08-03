import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteEjsPlugin(),
  ],
  base: '/flashcards/',
  root: 'src',

  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./src/index.html', import.meta.url)),
      }
    },

    outDir: '../dist',
    target: 'es2022',
  },

  envDir: '.',

  assetsInclude: [
    "src/favicon/*",
  ]

})
