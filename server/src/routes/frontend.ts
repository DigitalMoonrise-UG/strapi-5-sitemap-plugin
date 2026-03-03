export default [
	{
		method: "GET",
		path: "/sitemap.xml",
		handler: "controller.getSitemap",
		config: {
			policies: [],
		},
	},
	{
		method: "GET",
		path: "/sitemap-:slug.xml",
		handler: "controller.getSitemapBySlug",
		config: {
			policies: [],
		},
	},
];
