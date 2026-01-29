const CACHE_NAME = 'charbuy-cache-v1.0.3'; 
const ASSETS = ['./', './index.html', './manifest.json', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // REGLA DE ORO: Si es publicidad o APIs, salir del Service Worker inmediatamente
  if (url.hostname.includes('otieu.com') || 
      url.hostname.includes('googlesyndication') || 
      url.hostname.includes('doubleclick') ||
      url.hostname.includes('api.binance.com') ||
      url.hostname.includes('exchangerate-api.com')) {
    return; // No usamos e.respondWith, dejamos que el navegador lo maneje solo
  }

  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});









