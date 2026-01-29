const CACHE_NAME = 'charbuy-cache-v1.0.2'; // Incrementado para forzar actualización
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

// Activación y limpieza
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

// Intercepción de peticiones (CORREGIDO PARA ANUNCIOS)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // EXCLUSIONES CRÍTICAS: Si la URL es de anuncios o APIs de tasas, NO USAR CACHÉ
  if (
      url.hostname.includes('googlesyndication.com') || 
      url.hostname.includes('doubleclick.net') ||
      url.hostname.includes('otieu.com') || 
      url.hostname.includes('api.binance.com') ||
      url.hostname.includes('exchangerate-api.com') ||
      url.hostname.includes('open.er-api.com')
  ) {
    // Retornamos directamente de la red para asegurar impresiones y tasas reales
    return e.respondWith(fetch(e.request));
  }

  // Para el resto (HTML, CSS, Iconos), usamos estrategia Cache First
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});









