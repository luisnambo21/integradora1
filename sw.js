const CACHE_NAME = 'v1_cache_Lions',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Raleway:400,700',
        'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
        'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
        '../public/style.css',
        './script.js',
        '../public/lions',
        '../public/lions_16.png',
        '../public/lions_16.png',
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
//eslint-disable-next-line
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            //eslint-disable-next-line
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
//eslint-disable-next-line
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        //eslint-disable-next-line
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
//eslint-disable-next-line
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})