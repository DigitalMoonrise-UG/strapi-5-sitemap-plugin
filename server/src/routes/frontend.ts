export default [
	{
		method: 'GET',
		path: '/sitemap.xml',
		handler: 'controller.getSitemap',
		config: {
			policies: [],
		},
	},
];
