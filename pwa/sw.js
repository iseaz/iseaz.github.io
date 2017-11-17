let CACHE_STATIC_NAME = 'static-v1'
let CACHE_DYNAMIC_NAME = 'dynamic-v1'
let STATIC_FILES = [
	'/pwa',
	'/pwa/index.html',
	'/pwa/dist/build.js'
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_STATIC_NAME)
			.then(cache => {
				cache.addAll(STATIC_FILES)
			})
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
			.then(keyList => {
				return Promise.all(keyList.map(key => {
					if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
						return caches.delete(key)
					}
				}))
			})
	)

	return self.clients.claim()
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				if (response) {
					return response
				} else {
					return fetch(event.request)
						.then(res => {
							return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
								cache.put(event.request.url, res.clone())

								return res
							})
						})
						.catch(err => {
							return caches.open(CACHE_STATIC_NAME)
								.then(cache => {
									return cache.match('./offline.html')
								})
						})
				}
			})
	)
})