import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split heavy animation libs into separate cached chunks (Vite 8 / Rolldown: function form required)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('gsap') || id.includes('@gsap')) return 'vendor-gsap'
          if (id.includes('lenis')) return 'vendor-lenis'
        },
      },
    },
  },
})
