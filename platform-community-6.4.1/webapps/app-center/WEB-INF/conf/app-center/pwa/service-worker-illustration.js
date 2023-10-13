// Here we can add additional rules using workbox for service worker
workbox.routing.registerRoute(
  new RegExp('.*/rest/app-center/applications/illustration/.*'),
  new workbox.strategies.CacheFirst({
    cacheName: imageCacheName,
  }),
);
