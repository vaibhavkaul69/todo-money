const staticCache = "static-asset-cache-list-prod-v-02/2021";

const dynamicCache = "dynamic-asset-cache";

const cachedAssets = [
	"/",
	"/index.html",
	"/fallback.html",
	"/manifest.json",
	"/logo.png",
	"/icons/logo-72x72.png",
	"/icons/logo-96x96.png",
	"/icons/logo-128x128.png",
	"/icons/logo-144x144.png",
	"/icons/logo-152x152.png",
	"/icons/logo-192x192.png",
	"/icons/logo-384x384.png",
	"/icons/logo-512x512.png",
	"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
	"https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&family=Raleway:wght@300&family=Roboto:wght@300&display=swap",
	"/static/media/body-bg.f18f3b42.png",
	"/static/media/clock.7d110776.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/logo.png",
	"/static/media/user_image.df8a24a9.png",
	"/static/media/no-transaction.667df5a8.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/f1f410173e2f3d23175473d552598fc434ab8ad5/src/images/whatsapp.svg",
	"/static/media/success.a96e3504.gif",
	"/static/media/failed.7419303b.gif",
	"/static/media/logout-btn.8de1d49a.svg",
	"/static/media/telephone.e1195dfa.svg",
	"/static/media/theme-toggle.6a5683c2.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/9eb84ca031353c5c690a07195fc3b0da86dac183/src/images/feedback.svg",
	"/static/media/video-tutorial.be019740.svg",
	"/static/media/important.07acce51.svg",
	"/static/media/money-given.21135113.svg",
	"/static/media/add-transaction-icon.2633cf90.png",
	"/static/media/settled.72770d74.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/b29543e7548cc548dcb96efa824e45b028cdd934/src/images/hide-pass.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/b29543e7548cc548dcb96efa824e45b028cdd934/src/images/show-pass.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/748e02131413b1143f609c4edf6318e641eff9cb/src/images/faq.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/56bacddd99106afb698d51a0768bfbe9b73e3b69/src/images/add_icon.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/settled-icon.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/info.gif",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/denied.gif",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/404.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/user_image.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/clock.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/no-transaction.png",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/homepage_bg.jpg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/failed.gif",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/master/src/images/success.gif",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/2d01241c8b432b49c002da635d635ac3078e5690/src/images/gmail.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/4bd63ab8b5a0dfc513ca7f33f4b78c1c675543f3/src/images/instagram.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/4bd63ab8b5a0dfc513ca7f33f4b78c1c675543f3/src/images/facebook.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/4bd63ab8b5a0dfc513ca7f33f4b78c1c675543f3/src/images/linkedin.svg",
	"https://raw.githubusercontent.com/vaibhavkaul69/todo-money/4bd63ab8b5a0dfc513ca7f33f4b78c1c675543f3/src/images/github.svg",
	"/static/css/main.7b38d2e6.css",
	"/static/css/main.7b38d2e6.css.map",
	"/static/js/main.64a86251.js",
	"/static/js/main.64a86251.js.map",
	"/static/js/bundle.js",
];

self.addEventListener("beforeinstallprompt", (e) => {
	console.log("Service worker installing", e);
});
self.addEventListener("install", (e) => {
	console.log("Installed....", e);
	e.waitUntil(
		caches
			.open(staticCache)
			.then((cache) => {
				//addAll method adds an array of resource to be cached.
				cache.addAll(cachedAssets);
			})

			//If an error comes then the installation fails.
			.catch((error) => console.log(error))
	);
	self.skipWaiting();
});
self.addEventListener("activate", (evt) => {
	console.log("Offline mode Activated..");
	evt.waitUntil(
		caches.keys().then((arrayRes) => {
			let removeArrayElement = arrayRes.filter((element) =>
				element.includes("list")
			);
			removeArrayElement.map((element) => {
				if (element !== staticCache) {
					caches.delete(element);
				}
			});
		})
	);
});
self.addEventListener("fetch", (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request);
		})
	);
});
