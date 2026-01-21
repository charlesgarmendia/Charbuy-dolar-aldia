const CACHE_NAME = 'charbuy-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'ads.txt',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap'
];

// Instalación: Guarda los archivos esenciales
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activación: Limpia versiones viejas de la App
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de Red: Intenta internet primero, si falla usa caché
self.addEventListener('fetch', (e) => {
  // EXCLUSIÓN CRÍTICA: No interferir con AdSense ni con las APIs de precios en tiempo real
  if (
    e.request.url.includes('googlesyndication') || 
    e.request.url.includes('pagead') ||
    e.request.url.includes('open.er-api.com') ||
    e.request.url.includes('exchangerate-api.com')
  ) {
    return; 
  }

  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
