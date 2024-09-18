import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/App.scss" as *;`,
      },
    },
  },

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [react()],
})
