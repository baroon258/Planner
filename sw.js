const CACHE_NAME = 'ai-planner-v2';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});

// باز کردن مستقیم پنجره ثبت سریع با لمس ویجت صفحه قفل
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                let client = clientList[0];
                client.focus();
                return client.navigate('./index.html?action=quick');
            }
            return clients.openWindow('./index.html?action=quick');
        })
    );
});
