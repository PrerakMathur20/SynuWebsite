import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readVersion(filePath: string): string {
  return JSON.parse(readFileSync(filePath, 'utf-8')).version;
}

function getTokisVersion(): string {
  // Local dev: read from sibling TokisLib
  try { return readVersion(resolve(__dirname, '../TokisLib/packages/tokis/package.json')); } catch {}
  // CI: read directly from node_modules (bypasses exports field restriction)
  try { return readVersion(resolve(__dirname, 'node_modules/@tokis/react/package.json')); } catch {}
  return '0.0.0';
}

export default defineConfig({
  base: process.env.VITE_BASE_URL ?? '/',
  define: {
    __APP_VERSION__: JSON.stringify(getTokisVersion()),
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
