/*
 * Service Worker do NeuroBot — estratégia "network first, cache como reserva".
 * Online: sempre busca a versão mais nova e atualiza o cache.
 * Offline: serve o que estiver em cache (o jogo não depende de assets externos).
 * Troque CACHE_NAME ao mudar esta lógica para invalidar caches antigos.
 */
const CACHE_NAME = 'neurobot-phaser-v2';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('/index.html'))),
  );
});
