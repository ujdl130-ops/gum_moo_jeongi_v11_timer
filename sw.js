const CACHE_NAME = "gum-moo-jeongi-pwa-v37-hold-spacing-1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./index.html?v=20260621-hold-spacing-1",
  "./style.css?v=20260621-hold-spacing-1",
  "./script.js?v=20260621-hold-spacing-1",
  "./manifest.json?v=20260621-hold-spacing-1",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/Steel_Against_Night.mp3",
  "./assets/Steel_Against_Bamboo.mp3",
  "./assets/Seven_Strikes_of_Honor.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const freshFirst =
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    event.request.destination === "style" ||
    event.request.destination === "script" ||
    event.request.destination === "manifest" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html");

  if (freshFirst) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => (
        caches.match(event.request)
          .then((cached) => cached || caches.match("./index.html"))
      ))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
