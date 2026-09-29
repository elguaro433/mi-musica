/* Mi Música — service worker.
   Estrategia "red primero": con internet siempre carga la versión publicada
   (así ningún teléfono se queda con una versión vieja); sin internet usa la
   última copia guardada del armazón.

   ⚠️ IMPORTANTE: este service worker NUNCA toca IndexedDB. La música vive ahí.
   Borrar estas cachés no borra ni una canción.                                 */

const VERSION = '1.9.0';
const CACHE = 'mimusica-' + VERSION;

const ARMAZON = [
  './', './index.html', './manifest.json',
  './icon-180.png', './icon-192.png', './icon-512.png',
  './splash-375x812.png',
  './splash-390x844.png',
  './splash-393x852.png',
  './splash-402x874.png',
  './splash-430x932.png',
  './splash-440x956.png'
];

// Solo cacheamos lo nuestro y las fuentes. Nunca los streams de radio
// (son infinitos: llenarían el disco) ni YouTube.
const HOSTS_OK = [
  self.location.origin,
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARMAZON)).catch(() => {})
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(Promise.all([
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k !== CACHE && k.startsWith('mimusica-')).map(k => caches.delete(k))
    )),
    self.clients.claim()
  ]));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (HOSTS_OK.indexOf(url.origin) === -1) return;   // radio y YouTube: directos a la red

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // cache:'no-cache' → el navegador pregunta al servidor si hay versión nueva,
      // así nunca se mezclan archivos viejos con nuevos.
      const red = fetch(req, url.origin === self.location.origin ? { cache: 'no-cache' } : {})
        .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; });

      // Si la red tarda más de 6 s y hay copia, tiramos de copia.
      const lento = new Promise((_, rej) => setTimeout(() => rej(new Error('lento')), 6000));
      return await Promise.race([red, lento])
        .catch(async () => (await cache.match(req, { ignoreSearch: true })) || red);
    } catch (_) {
      const copia = await cache.match(req, { ignoreSearch: true });
      if (copia) return copia;
      if (req.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});

/* Guardián nº 8 — auto-desinfección.
   Si la app detecta que arrancó mal dos veces seguidas, nos manda LIMPIAR.
   Tiramos las cachés del armazón y nos desregistramos; la app recarga una vez.
   La música (IndexedDB) no se toca.                                            */
self.addEventListener('message', e => {
  const dato = e.data || {};
  if (dato.tipo === 'LIMPIAR') {
    e.waitUntil((async () => {
      const ks = await caches.keys();
      await Promise.all(ks.filter(k => k.startsWith('mimusica-')).map(k => caches.delete(k)));
      await self.registration.unregister();
      const cs = await self.clients.matchAll({ type: 'window' });
      cs.forEach(c => c.postMessage({ tipo: 'LIMPIO' }));
    })());
  }
  if (dato.tipo === 'VERSION') {
    e.source && e.source.postMessage({ tipo: 'VERSION', version: VERSION });
  }
});
