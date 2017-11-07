self.addEventListener('install', event => {
	console.log('Service worker installed')

	event.waitUntil(
		caches.open('static').then(cache => {
			cache.addAll([
				'https://iseaz.github.io/pwa',
				'https://iseaz.github.io/pwa/',
				'https://iseaz.github.io/pwa/index.html',
				'https://iseaz.github.io/pwa/ecma/app.js'
			])
		})
	)
})