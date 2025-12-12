
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const date = new Date();
const yy = date.getFullYear().toString().slice(-2);
const mm = (date.getMonth() + 1).toString().padStart(2, '0');
const dd = date.getDate().toString().padStart(2, '0');
const buildVersion = `Build ${yy}${mm}${dd}`;

export default defineConfig({
  plugins: [react()],
  define: {
    '__APP_VERSION__': JSON.stringify(buildVersion),
  },
  build: {
    outDir: 'dist',
  },
});
