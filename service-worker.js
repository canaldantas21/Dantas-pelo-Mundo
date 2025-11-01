
// service-worker.js
const CACHE_NAME = "dantas-cache-v1";
const urlsToCache = [
  "index.html",
  "biblia.html",
  "viagens.html",
  "musica.html",
  "canal.html",
  "style.css",
  "logo.png"
];

// Instala o service worker e faz cache dos ficheiros
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Responde com ficheiros do cache quando estiver offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

