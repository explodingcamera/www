export const projects = [
	{
		title: "Professional Work",
		from: "2017-now",
		text: [
			"I focus on scalable backend systems and infrastructure. I've also built apps and websites, with experience spanning large companies and freelance projects.",
		],
	},
	{
		title: "Open Source",
		from: "2016-now",
		text: [
			"I maintain various open-source projects and libraries, and contribute to others. Find my work on ",
			{ link: "https://github.com/explodingcamera", name: "GitHub" },
			".",
		],
	},
	{
		title: "tinywasm",
		from: "2023-now",
		img: "tinywasm.png",
		text: [
			"An efficient WebAssembly 3.0 runtime written entirely in safe Rust. The code is on ",
			{ link: "https://github.com/explodingcamera/tinywasm", name: "GitHub" },
			".",
		],
	},
	{
		title: "Liwan",
		from: "2024-now",
		img: "liwan-social-preview.png",
		text: [
			"Self-hosted, privacy-first web analytics in a single Rust binary. Visit ",
			{ link: "https://liwan.dev", name: "liwan.dev" },
			" or browse the code on ",
			{ link: "https://github.com/explodingcamera/liwan", name: "GitHub" },
			".",
		],
	},
	{
		title: "Creating an RISC-V Operating System in Rust",
		from: "2023",
		img: "os.png",
		text: [
			"A ",
			{ link: "https://blog.henrygressmann.de/series/rust-os/", name: "blog series" },
			" about building a small RISC-V microkernel in Rust, with the code on ",
			{ link: "https://github.com/explodingcamera/rust-os-blog", name: "GitHub" },
			".",
		],
	},
	{
		title: "dawdle.space",
		from: "2023-now",
		img: "dawdle.png",
		href: "https://dawdle.space",
		text: [
			"dawdle.space is a small community for handmade websites. For art, writing, games, blogs, experiments, and whatever else you're into.",
		],
	},
	{
		title: "Last.fm Iceberg Chart Generator",
		from: "2024-now",
		img: "lastfm-iceberg.avif",
		text: [
			"Generate shareable iceberg charts from Last.fm listening history. More than 200k people have used the ",
			{ link: "https://lastfm-iceberg.dawdle.space/", name: "site" },
			". The code is on ",
			{ link: "https://github.com/explodingcamera/lastfm-iceberg", name: "GitHub" },
			".",
		],
	},
	// {
	// 	title: "Keygate",
	// 	from: "2023-now",
	// 	img: "keygate.webp",
	// 	text: "Modular and open-source identity management, authentication and authorization. Currently being rewritten with a focus on minimalism and security.",
	// 	links: [
	// 		{
	// 			link: "https://keygate.io",
	// 			name: "keygate.io",
	// 		},
	// 	],
	// },
	// {
	// 	title: "Koi",
	// 	from: "2023",
	// 	img: "koi.webp",
	// 	text: "Koi is a new lossless image format that is designed for embedded systems and game engines",
	// 	links: [
	// 		{
	// 			link: "https://github.com/explodingcamera/koi-rs",
	// 			name: "GitHub",
	// 		},
	// 		{
	// 			link: "https://blog.henrygressmann.de/koi",
	// 			name: "blog post",
	// 		},
	// 	],
	// },
	// {
	// 	title: "nots.dev",
	// 	from: "2023-now",
	// 	img: "nots.jpg",
	// 	text: "A open source self-hosted cloud platform — Just bring your code, and Nots will take care of the rest. Currently in development.",
	// 	links: [
	// 		{
	// 			link: "https://github.com/explodingcamera/nots",
	// 			name: "GitHub",
	// 		},
	// 		{
	// 			link: "https://nots.dev",
	// 			name: "nots.dev",
	// 		},
	// 	],
	// },

	{
		title: "Snowstorm",
		from: "2021-2022",
		img: "snowstorm.webp",
		filters: { filter: "invert(1) contrast(2) hue-rotate(180deg)" },
		text: [
			"A React framework built around Suspense, ES modules, and esbuild. The code is on ",
			{ link: "https://github.com/explodingcamera/snowstorm", name: "GitHub" },
			".",
		],
	},
	{
		title: "pog.network",
		from: "2021-2022",
		img: "pog.network.webp",
		text: [
			"Experimental cryptocurrency protocol. I led technical direction and worked on the Rust implementation, APIs, and frontend. See ",
			{ link: "https://github.com/pognetwork", name: "GitHub" },
			".",
		],
	},
	{
		title: "etournity.com",
		from: "2020",
		img: "etournity.webp",
		href: "https://etournity.com",
		text: ["Esports tournament platform. I migrated the frontend to Next.js and improved GraphQL API security."],
	},
	{
		title: "FantasyMarket",
		from: "2020",
		img: "fantasymarket.webp",
		filters: { filter: "brightness(0.7) saturate(0.45)", scale: 1.2, position: "50% 80%" },
		text: [
			"A stock market simulation where users invest in-game currency. See the project on ",
			{ link: "https://github.com/fantasymarket", name: "GitHub" },
			".",
		],
	},
	{
		title: "recordskip",
		from: "2019",
		img: "recordskip.jpeg",
		text: [
			"A mobile app for vinyl collectors that used image recognition to catalogue records and recommend music. See ",
			{ link: "https://github.com/recordskip/recordskip-app", name: "GitHub" },
			".",
		],
	},
	{
		title: "canX",
		from: "2018-2020",
		img: "canx.webp",
		filters: { filter: "brightness(0.7) saturate(0.45)", scale: 1.2, position: "30% 50%" },
		text: ["I co-founded canX and led a three-person team building its apps, Go backend, and video infrastructure."],
	},
	// {
	// 	title: "livecount.pro",
	// 	from: "2017 - 2019",
	// 	img: "livecount-min.webp",
	// 	text: "LiveCount Pro (now discontinued) was a real-time anaylytics platform and dashboard with support for multiple social networks and multiple channels simultaneously.",
	// 	links: [
	// 		{
	// 			link: "https://github.com/explodingcamera/livecount.pro",
	// 			name: "GitHub",
	// 		},
	// 	],
	// },
	{
		title: "musiqpad",
		from: "2016",
		img: "musiqpad.webp",
		filters: { filter: "brightness(0.7) saturate(0.45)", scale: 1.2 },
		text: [
			"Open-source social music platform for self-hosted chatrooms. I modernized the codebase and fixed security vulnerabilities. See ",
			{ link: "https://github.com/musiqpad/mqp-server", name: "GitHub" },
			".",
		],
	},
	// {
	// 	title: "musiqplus",
	// 	from: "2015-2016",
	// 	img: "musiqplus.webp",
	// 	text: "MusiqPlus is a Google Chrome extension that enhanced the experience on musiqpad servers with a ton of extra features. This started my involvement with Musiqpad and was one of my first larger projects.",
	// 	links: [
	// 		{
	// 			link: "https://github.com/explodingcamera/musiqplus",
	// 			name: "GitHub",
	// 		},
	// 	],
	// },
];
