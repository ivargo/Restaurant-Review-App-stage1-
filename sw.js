const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles2.css',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/js/main.js',
  '/data/restaurants.json',
  '/img/',
  ];

/* Open cache upon install and add all urls*/
  self.addEventListener('install', function(event) {
      event.waitUntil(caches.open('apps_cache_1')
      .then(function(cache) {
          return cache.addAll(urlsToCache);
      }));
  });

  /* gets the cache and returns it if the response is macthed*/
  self.addEventListener('fetch', function(event) {
      event.respondWith(caches.match(event.request)
      .then(function(response) {
          if (response) {
            return response;
          }
  /*if the request is not macthed, fetch a normal request and add it to cache*/
          else {
            return fetch(event.request)
            .then(function(response){
              const cloneCache = response.clone();
              caches.open('apps_cache_1').then(function(cache) {
              cache.put(event.request, cloneCache);
              });
              return response;
          })
        };
    })
  )
});
