// Offline cache for the BYKUCUTZZ demo: app shell first from cache, refreshed in the background.
const C="bykucutzz-v1",FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>{const f=fetch(e.request).then(n=>{if(n.ok&&new URL(e.request.url).origin===location.origin)caches.open(C).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>r);return r||f}))});
