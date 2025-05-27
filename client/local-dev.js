/**
 * Client-side local development script
 * This runs the frontend development server using the local Vite configuration
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting frontend development server...');

// Run the Vite development server with our local config
const viteProcess = spawn('npx', [
  'vite',
  '--config', 
  path.join(__dirname, 'vite.local.config.js')
], {
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite server:', error);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  console.log(`Vite server exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\nReceived ${signal}, shutting down...`);
    viteProcess.kill();
    process.exit(0);
  });
});