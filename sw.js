const CACHE_NAME = 'charbuy-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512.png'
];

// Instalación: Forzar que el nuevo SW tome el control de inmediato
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpiar caches antiguos para evitar errores de versión
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Lógica inteligente para no cachear las APIs de precios
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // NO CACHEAR peticiones a APIs de divisas o WebSockets para que siempre sean reales
  if (url.hostname.includes('er-api.com') || 
      url.hostname.includes('exchangerate-api.com') || 
      url.hostname.includes('binance.com')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Para el resto (HTML, CSS, Iconos), usar Caché primero, luego Red
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).then((response) => {
        // Guardar en caché nuevas peticiones válidas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        let responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return response;
      });
    }).catch(() => {
      // Si falla todo y es una navegación, podrías retornar la página de inicio
      return caches.match('/');
    })
  );
});












