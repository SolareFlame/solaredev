import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // IPv4 so both localhost and 127.0.0.1 resolve (Node on Windows binds ::1 only by default).
    host: '127.0.0.1',
    // The NestJS API (../back) listens on :3000 and serves everything under /api.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
