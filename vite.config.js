import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inlineCSS = () => {
  return {
    name: 'inline-css',
    closeBundle() {
      try {
        const distDir = path.resolve(__dirname, 'dist')
        const assetsDir = path.resolve(distDir, 'assets')
        if (!fs.existsSync(assetsDir)) return

        const files = fs.readdirSync(assetsDir)
        const cssFile = files.find(file => file.endsWith('.css'))
        if (!cssFile) return

        const cssPath = path.resolve(assetsDir, cssFile)
        const cssContent = fs.readFileSync(cssPath, 'utf-8')

        const htmlPath = path.resolve(distDir, 'index.html')
        if (!fs.existsSync(htmlPath)) return
        let htmlContent = fs.readFileSync(htmlPath, 'utf-8')

        // Replace link tag with style tag
        const linkTagRegex = new RegExp(`<link[^>]*href="[^"]*assets\\/${cssFile.replace(/\./g, '\\.')}"[^>]*>`, 'i')
        if (linkTagRegex.test(htmlContent)) {
          htmlContent = htmlContent.replace(linkTagRegex, `<style>${cssContent}</style>`)
          fs.writeFileSync(htmlPath, htmlContent, 'utf-8')
          console.log(`[inline-css] Inlined assets/${cssFile} into dist/index.html`)
        }
      } catch (err) {
        console.error('[inline-css] Failed to inline CSS:', err)
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCSS()],
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

