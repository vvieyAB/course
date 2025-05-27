// Empty service worker - We're disabling service worker functionality
// This file exists only to handle any lingering requests to /sw.js
console.log('Service Worker disabled - no offline functionality');

self.addEventListener('install', event => {
  self.skipWaiting(); // Skip waiting to ensure the latest version is activated immediately
});

self.addEventListener('fetch', event => {
  // Pass through all fetch events to the network, not intercepting anything
  event.respondWith(fetch(event.request));
});