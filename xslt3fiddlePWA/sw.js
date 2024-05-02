self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('xslt3fiddlePWA-v1').then((cache) => cache.addAll([
      '/xslt3fiddlePWA/',
      '/xslt3fiddlePWA/index.html',
      '/xslt3fiddlePWA/index.js',
      '/xslt3fiddlePWA/manifest.webmanifest',
      '/xslt3fiddlePWA/css/ace-fiddle.css',
      '/xslt3fiddlePWA/js/SaxonJS2.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.1/ace.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.1/mode-xml.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.1/mode-html.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ace/1.33.1/mode-json.js',
      '/xslt3fiddlePWA/examples/defaults/default.xml',
      '/xslt3fiddlePWA/examples/defaults/default.xsl',
      '/xslt3fiddlePWA/js/frame-write.js',
      '/xslt3fiddlePWA/js/ace-modes.js',
      '/xslt3fiddlePWA/js/transform.js',
      '/xslt3fiddlePWA/js/ace-editors-init.js',
      '/xslt3fiddlePWA/js/event-listeners-init.js',
      '/xslt3fiddlePWA/js/init-examples.js'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
