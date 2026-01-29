const CACHE_NAME = 'charbuy-final-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Bypass total: Si el archivo no está en la lista de ASSETS, 
// el Service Worker ni siquiera lo mira.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isStaticAsset = ASSETS.some(asset => e.request.url.includes(asset.replace('./', '')));

  if (!isStaticAsset) {
    return; // El navegador maneja la publicidad por su cuenta
  }

  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});









