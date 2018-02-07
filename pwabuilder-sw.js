self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pwabuilder-offline').then(function(cache) {
      return cache.addAll([
        '/',
        '/frame1.html',
        '/frame2.html',
        '/index.html',
        '/styles.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      console.log( '[PWA Builder] Network request Failed. Serving content from cache: ' + error );
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})