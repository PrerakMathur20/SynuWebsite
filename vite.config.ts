import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tokisPkg from '../TokisLib/packages/tokis/package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(tokisPkg.version),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@tokis/core': resolve(__dirname, '../TokisLib/packages/core/dist/index.js'),
      '@tokis/tokens': resolve(__dirname, '../TokisLib/packages/tokens/dist/index.js'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
