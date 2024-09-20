function loadHead() {
	const head = document.head;

	// Meta tags
	const metaTags = [
		{ charset: "UTF-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
		{ name: "description", content: "Biblioteca Yenny." },
		{ name: "keywords", content: "Biblioteca, etc." },
		{ name: "author", content: "Gerónimo Mercante. Gianfranco Andreachi. Axel Berger" },
		{ name: "robots", content: "index, follow" }
	];

	metaTags.forEach(attrs => {
		const meta = document.createElement('meta');
		Object.keys(attrs).forEach(key => {
			meta.setAttribute(key, attrs[key]);
		});
		head.appendChild(meta);
	});

	// Link tags
	const linkTags = [
		{ rel: "icon", href: "/public/favicon.ico", type: "image/x-icon" },
		{ rel: "stylesheet", href: "/dist/output.css" },
		{ rel: "stylesheet", href: "/src/assets/styles/main.css" }
	];

	linkTags.forEach(attrs => {
		const link = document.createElement('link');
		Object.keys(attrs).forEach(key => {
			link.setAttribute(key, attrs[key]);
		});
		head.appendChild(link);
	});

	// Open Graph / Facebook
	const ogTags = [
		{ property: "og:title", content: "Biblioteca Yenny" },
		{ property: "og:description", content: "Biblioteca, etc." },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: "https://nuestro-sitio.com" },
		{ property: "og:image", content: "public/site.webmanifest" }
	];

	ogTags.forEach(attrs => {
		const meta = document.createElement('meta');
		Object.keys(attrs).forEach(key => {
			meta.setAttribute(key, attrs[key]);
		});
		head.appendChild(meta);
	});

	// Twitter Card
	const twitterTags = [
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "Biblioteca Yenny" },
		{ name: "twitter:description", content: "Biblioteca, etc." },
		{ name: "twitter:image", content: "public/site.webmanifest" }
	];

	twitterTags.forEach(attrs => {
		const meta = document.createElement('meta');
		Object.keys(attrs).forEach(key => {
			meta.setAttribute(key, attrs[key]);
		});
		head.appendChild(meta);
	});

	// Tailwind CSS
	const script = document.createElement('script');
	script.src = "https://cdn.tailwindcss.com";
	head.appendChild(script);
}

loadHead();
