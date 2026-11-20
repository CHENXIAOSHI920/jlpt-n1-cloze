// JLPT N1 問題7 v2 完整版：首次联网后缓存应用，断网仍可完整使用。
const CACHE = 'jlpt-n1-q7-v2-r5';
const ASSETS = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const hadPreviousVersion = keys.some((key) => key.startsWith('jlpt-n1-q7-v2-') && key !== CACHE);
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
    if (hadPreviousVersion) {
      const windows = await self.clients.matchAll({ type: 'window' });
      await Promise.all(windows.map((client) => client.navigate(client.url).catch(() => undefined)));
    }
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(event.request, { ignoreSearch: true });
    try {
      const response = await fetch(event.request, { cache: 'no-store' });
      if (response && response.ok) cache.put(event.request, response.clone());
      return response;
    } catch {
      if (hit) return hit;
      if (event.request.mode === 'navigate') return cache.match('./index.html');
      return Response.error();
    }
  })());
});
