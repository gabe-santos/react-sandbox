import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/shared": resolve(__dirname, "../../shared"),
    },
  },
  css: {
    postcss: "../../postcss.config.js",
  },
  server: {
    port: 3342
  }
})