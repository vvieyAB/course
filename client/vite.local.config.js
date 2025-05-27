/**
 * Local Development Vite Configuration 
 * CommonJS format to avoid ESM-related TypeScript errors
 */

const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const path = require("path");

// Define project directories
const projectRoot = path.resolve(__dirname, "..");

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to the backend Express server
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/public"),
    emptyOutDir: true,
  }
});