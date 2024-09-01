import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "chunk-4HAMFFQC.js",
      "chunk-EQCVQC35.js",
    ],
  },
});
