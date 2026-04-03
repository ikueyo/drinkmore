import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ⚠️ 部署到 GitHub Pages 時，改成你的 repo 名稱
  // 如果用自訂域名或 Vercel，改為 '/'
  base: '/drinkmore/',
  build: {
    outDir: 'dist'
  }
})
