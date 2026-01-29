const CACHE_NAME = 'charbuy-cache-v1.0.1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación y limpieza de versiones viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de respuesta
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // No cachear anuncios ni APIs de tasas para mantener precisión en Bolívares/Dólares
  if (url.hostname.includes('googlesyndication') || 
      url.hostname.includes('otieu.com') || 
      url.hostname.includes('api.binance.com') ||
      url.hostname.includes('exchangerate-api.com')) {
    return; 
  }

  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});









