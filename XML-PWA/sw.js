self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('XML-PWA-v1').then((cache) => cache.addAll([
      '/XML-PWA/',
      '/XML-PWA/index.xml',
      '/XML-PWA/index.xsl',
      '/XML-PWA/index.js',
      '/XML-PWA/manifest.webmanifest'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});