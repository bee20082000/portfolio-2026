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
        // Find all CSS files, as Vite might output multiple (e.g., dynamic imports)
        const cssFiles = files.filter(file => file.endsWith('.css'))
        
        const htmlPath = path.resolve(distDir, 'index.html')
        if (!fs.existsSync(htmlPath)) return
        let htmlContent = fs.readFileSync(htmlPath, 'utf-8')

        for (const cssFile of cssFiles) {
          // Double escape for RegExp constructor
          const escapedCssFile = cssFile.replace(/\./g, '\\.')
          const linkTagRegex = new RegExp(`<link[^>]*href="[^"]*assets\\/${escapedCssFile}"[^>]*>`, 'i')
          
          if (linkTagRegex.test(htmlContent)) {
            const cssPath = path.resolve(assetsDir, cssFile)
            const cssContent = fs.readFileSync(cssPath, 'utf-8')
            
            // Use replacer function to avoid issue with $ patterns in cssContent
            htmlContent = htmlContent.replace(linkTagRegex, () => `<style>${cssContent}</style>`)
            console.log(`[inline-css] Inlined assets/${cssFile} into dist/index.html`)
            
            // Optionally delete the CSS file since it's now inlined
            // fs.unlinkSync(cssPath) 
          }
        }
        
        fs.writeFileSync(htmlPath, htmlContent, 'utf-8')
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

