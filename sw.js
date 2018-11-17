/*eslint-disable*/
let cacheFiles = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

console.log('Service Worker is working it!');
self.addEventListener('install', function(e){
  console.log("Installing...");
  e.waitUntil(
    caches.open('v1').then(function(cache){
      console.log("adding the cache files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e){
  console.log("In fetch...");
  e.respondWith(
    caches.match(e.request).then(function(response){
      if(response){
        console.log(e.request + ' in cache');
        return response;
      }
      else{
        console.log(e.request + ' NOT in cache, go fetch!');
        return fetch(e.request)
        .then(function(response){
          const clonedResp = response.clone();
          caches.open('v1').then(function(cache){
            cache.put(e.request, clonedResp);
          })
          return response;
        })
        .catch(function(err){
          console.error(err);
        });
      }
    })
  );
});
