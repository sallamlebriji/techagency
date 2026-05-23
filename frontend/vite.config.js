import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readEnvPort(filePath) {
  if (!fs.existsSync(filePath)) return '';

  const content = fs.readFileSync(filePath, 'utf8');
  const portLine = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('PORT='));

  return portLine?.split('=').slice(1).join('=').trim() || '';
}

const backendPort =
  process.env.PORT ||
  readEnvPort(path.resolve(__dirname, '../backend/.env')) ||
  readEnvPort(path.resolve(__dirname, '../.env')) ||
  '4000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://127.0.0.1:${backendPort}`,
    },
  },
});
