export default [
	{
		method: 'GET',
		path: '/admin',
		handler: 'controller.adminGET',
		config: {
			policies: [],
		},
	},
	{
		method: 'POST',
		path: '/admin',
		handler: 'controller.adminPOST',
		config: {
			policies: [],
		},
	},
	{
		method: 'PUT',
		path: '/admin',
		handler: 'controller.adminPUT',
		config: {
			policies: [],
		},
	},
	{
		method: 'DELETE',
		path: '/admin',
		handler: 'controller.adminDELETE',
		config: {
			policies: [],
		},
	},
	{
		method: 'GET',
		path: '/admin-get-content-types',
		handler: 'controller.adminGETContentTypes',
		config: {
			policies: [],
		},
	},
	{
		method: 'GET',
		path: '/admin-get-locales',
		handler: 'controller.adminGETLocales',
		config: {
			policies: [],
		},
	},
	{
		method: 'GET',
		path: '/admin-allowed-fields',
		handler: 'controller.adminAllowedFields',
		config: {
			policies: [],
		},
	},
	{
		method: 'GET',
		path: '/admin-get-options',
		handler: 'controller.adminGetOptions',
		config: {
			policies: [],
		},
	},
	{
		method: 'PUT',
		path: '/admin-put-options',
		handler: 'controller.adminPutOptions',
		config: {
			policies: [],
		},
	},
	{
		method: 'GET',
		path: '/admin-custom-urls',
		handler: 'controller.adminGetCustomURLs',
		config: {
			policies: [],
		},
	},
	{
		method: 'POST',
		path: '/admin-custom-urls',
		handler: 'controller.adminPostCustomURLs',
		config: {
			policies: [],
		},
	},
	{
		method: 'PUT',
		path: '/admin-custom-urls',
		handler: 'controller.adminPutCustomURLs',
		config: {
			policies: [],
		},
	},
	{
		method: 'DELETE',
		path: '/admin-custom-urls',
		handler: 'controller.adminDeleteCustomURLs',
		config: {
			policies: [],
		},
	},
];
