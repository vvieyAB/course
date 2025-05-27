import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";
import path from "path";

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
    cors: {
      origin: '*',
    },
    hmr: {
      clientPort: 443,
    },
    allowedHosts: true,
  },
});