// This file sets up overrides for Vite server configuration
window.__VITE_ALLOWED_HOSTS = window.__VITE_ALLOWED_HOSTS || [];

// Add known Replit domains
window.__VITE_ALLOWED_HOSTS.push(
  '.replit.dev',
  '.repl.co',
  '.replit.app',
  'localhost',
  'workspace',
  'a7c0a29bf813',
  'a8c171c4-768d-425a-b69b-4cd1ad4c1947-00-icw0rstl9wue.kirk.replit.dev',
  'a8c171c4-768d-425a-b69b-4cd1ad4c1947-00-icw0rst19wue.kirk.replit.dev'
);

// Add current hostname automatically
window.__VITE_ALLOWED_HOSTS.push(window.location.hostname);

console.log('Vite server config loaded with allowed hosts:', window.__VITE_ALLOWED_HOSTS);