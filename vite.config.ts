import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/crypto-app/',
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
