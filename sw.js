const CACHE = "patanjali-v1";
const FILES = [
  "/client-side-ecommerce-engine/",
  "/client-side-ecommerce-engine/index.html",
  "/client-side-ecommerce-engine/style.css",
  "/client-side-ecommerce-engine/script.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});