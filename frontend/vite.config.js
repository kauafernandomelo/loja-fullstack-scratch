import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // o proxy manda tudo que comeca com /api pro backend (porta 5000)
  // assim no front a gente so escreve fetch("/api/products") sem colocar o localhost:5000
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
})
