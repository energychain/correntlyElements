const CACHE_NAME = 'corrently-cache';

const FILES_TO_CACHE =[
  '/gsi.html',
  '/assets/bootstrap/css/bootstrap.min.css',
  '/assets/css/Footer-Basic.css',
  '/assets/css/header-1.css',
  '/assets/css/header-2.css',
  '/assets/css/header.css',
  '/assets/css/Navigation-Clean.css',
  '/assets/css/styles.css',
  '/assets/js/jquery.min.js',
  '/depot.html',
  '/index.html',
  '/assets/img/corrently_logo.png',
  '/assets/bootstrap/js/bootstrap.min.js',
  '/dist/correntlyElements-min.js',
  'https://api.corrently.io/core/gsi',
  'https://api.corrently.io/core/depot?account=0x504ec8497EBD02369550f6586EB32b26f088F25B'
]


self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('['+CACHE_NAME+'] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('['+CACHE_NAME+'] Fetch', evt.request.url);
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('gsi.html');
                });
          })
  );
});

self.addEventListener('foreignfetch', event => {
  // Assume that requestLogic() is a custom function that takes
  // a Request and returns a Promise which resolves with a Response.
  console.log('['+CACHE_NAME+'] Foreign Fetch', evt.request.url);
  // The new Request will have credentials omitted by default.
  const noCredentialsRequest = new Request(event.request.url);
  event.respondWith(
    // Replace with your own request logic as appropriate.
    fetch(noCredentialsRequest)
      .catch(() => caches.match(noCredentialsRequest))
      .then(response => ({response}))
  );
});

self.addEventListener('install', (evt) => {
  console.log('['+CACHE_NAME+'] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('['+CACHE_NAME+'] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
