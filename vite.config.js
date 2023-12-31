import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  join
} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    open: true,
    port: 3005,
    host: '0.0.0.0'
  }
})