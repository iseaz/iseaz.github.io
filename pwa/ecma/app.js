if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('https://iseaz.github.io/pwa/sw.js').then(() => {
		console.log('Service worker registered!')
	}).catch(err => {
		console.log(err)
	})
}