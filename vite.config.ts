import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@synu/core': resolve(__dirname, '../SynuLib/packages/core/dist/index.js'),
      '@synu/tokens': resolve(__dirname, '../SynuLib/packages/tokens/dist/index.js'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
