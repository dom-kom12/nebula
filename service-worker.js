const CACHE_NAME = 'nebula-cache-v1';
const OFFLINE_URL = 'off.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/off.html',
];

// Instalacja – cache’ujemy pliki
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Aktywacja – czyścimy stare cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch – serwujemy offline.html gdy nie ma internetu
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match(OFFLINE_URL);
      }
    })
  );
});
