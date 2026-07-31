import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // 0.0.0.0で待ち受け（コンテナ外からの接続を許可）
    port: 5173,
    watch: {
      usePolling: true, // Dev Container内でのファイル変更検知を有効化
    }
  }
})