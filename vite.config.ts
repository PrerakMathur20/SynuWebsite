import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tokisPkg from '../TokisLib/packages/tokis/package.json';

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? '/',
  define: {
    __APP_VERSION__: JSON.stringify(tokisPkg.version),
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
