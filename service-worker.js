this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvelokyiv%2Fposts%2F1575379525842547',
        'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D604314139910596%26id%3D291232054552141',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request);
    }).then(function(r) {
      response = r;
      caches.open('v1').then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(function() {
      // return caches.match('/gallery/myLittleVader.jpg');
    })
  );
});

// self.addEventListener('install', function(event) {
//   // Perform install step:  loading each required file into cache
//   event.waitUntil(
//     caches.open('v1')
//       .then(function(cache) {
//         // Add all offline dependencies to the cache
//         console.log("offline");
//         // var title = document.getElementById("title");
//         // title.style.display = "none";
//         // return cache.addAll(REQUIRED_FILES);
//       })
//       .then(function() {
//         // At this point everything has been cached
//         return self.skipWaiting();
//       })
//   );
// });