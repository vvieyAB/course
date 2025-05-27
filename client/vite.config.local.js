import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: 'all',
    strictPort: false,
    hmr: {
      clientPort: 443 // Use the Replit HTTPS port
    }
  }
});