import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Sitio de usuario: se publica en la raíz de jhaymayleth.github.io.
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})