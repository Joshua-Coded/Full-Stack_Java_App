importScripts('/eXoResources/javascript/workbox-5.1.4/workbox-sw.js');

const cachePrefix = 'portal-pwa-resources';
const assetsVersion = '@assets-version@';
const siteName = '@site-name@';
const development = @development@;
const resourceCachingEnabled = @resourceCachingEnabled@;
const domCachingEnabled = @domCachingEnabled@;

workbox.setConfig({
  debug: false,
  modulePathPrefix: '/eXoResources/javascript/workbox-5.1.4/'
});

workbox.loadModule('workbox-strategies');

workbox.core.setCacheNameDetails({
  prefix: cachePrefix,
  suffix: assetsVersion,
  precache: 'preload',
});

const cssCacheName = `${cachePrefix}-css-${assetsVersion}`;
const jsCacheName = `${cachePrefix}-js-${assetsVersion}`;
const fontCacheName = `${cachePrefix}-font-${assetsVersion}`;
const bundleCacheName = `${cachePrefix}-bundle-${assetsVersion}`;

const imageCacheName = `${cachePrefix}-image`;
const domCacheName = `${cachePrefix}-dom`;

const cachesWhiteList = [
  imageCacheName,
  domCacheName,
  workbox.core.cacheNames.precache,
  cssCacheName,
  jsCacheName,
  fontCacheName,
  bundleCacheName
];

if (resourceCachingEnabled && !development) {

  workbox.routing.registerRoute(
    new RegExp('.*\\.(ttf|woff|woff2|otf|otf|ttc)($|\\?.*|\\#.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: fontCacheName,
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('.*\\.js($|\\?.*|\\#.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: jsCacheName,
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('.*/rest/v1/platform/branding/css.*'),
    new workbox.strategies.CacheFirst({
      cacheName: cssCacheName,
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('.*\\.css($|\\?.*|\\#.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: cssCacheName,
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('.*/i18n/bundle/.*\\.json.*'),
    new workbox.strategies.CacheFirst({
      cacheName: bundleCacheName,
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif|ico)'),
    new workbox.strategies.CacheFirst({
      cacheName: imageCacheName,
    }),
  );

@extended-service-worker-parts@

}

if (domCachingEnabled) {
  workbox.routing.registerRoute(
    new RegExp('.*/dom-cache.*'),
    new workbox.strategies.CacheOnly({
      cacheName: domCacheName,
    }),
  );
  
  const domMatcher = ({url, request, event}) => {
    const pathname = url.pathname;
    return (
            pathname.includes(`/${siteName}`)
            || pathname.includes('/g/:')
            || pathname.includes('/u/:')
           )
           && !pathname.includes('/rest/')
           && !pathname.includes('.js')
           && !pathname.includes('.css');
  };
  
  const domHandler = async ({url, request, event, params}) => {
    const response = await fetch(request);
    const headers = response.headers;
    if (response.status !== 200
        || !headers.has('content-type')
        || !headers.get('content-type').includes('text/html')) {
      return response;
    }
  
    let html = await response.text();
    try {
      const cacheableDOMs = [...html.matchAll(/<v-cacheable-dom-app([ \t\r\n]*)cache-id="(.*)"([ \t\r\n]*)(\/>|>[ \t\r\n]*<\/v-cacheable-dom-app>)/g)];
      if(cacheableDOMs.length) {
        const domCache = await self.caches.open(domCacheName);
        for (let index in cacheableDOMs) {
          const cacheableDOM = cacheableDOMs[index];
          const domToReplace = cacheableDOM[0];
          const cacheId = cacheableDOM[2];
          const domCacheEntry = await domCache.match(`/dom-cache?id=${cacheId}`);
          if (domCacheEntry) {
            const htmlAppPart = await domCacheEntry.text();
            html = html.replace(domToReplace, htmlAppPart);
          }
        }
      }
    } catch(e) {
      console.error('Error while treating DOM caches of URL', url, e);
    }
    return new Response(html, {
      headers: response.headers,
      status: response.status,
    });
  };
  
  workbox.routing.registerRoute(domMatcher, domHandler);
}

self.addEventListener('install', event => {
  self.skipWaiting();
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cachesWhiteList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();