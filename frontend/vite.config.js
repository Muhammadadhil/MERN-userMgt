import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  server:{
    port:3000,
    proxy:{
      '/api':{
        target:'http://localhost:8000',
        changeOrigin:true
      }
    }
  }
})
