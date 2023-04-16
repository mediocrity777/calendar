self.addEventListener('install', event => {
	event.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll([
				'./',
				'./scripts/app.js',
				'./styles/style.css',
				'./styles/reset.css',
				'./icons/icon-192.png',
				'./icons/icon-512.png',
				'./images/1659796386_64-kartinkin-net-p-persikovie-oboi-krasivo-65.jpg',
			]);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});