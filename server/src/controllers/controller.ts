import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
	getSitemap: async (ctx) => {
		const sitemap = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getSitemap();

		ctx.set('Content-Type', 'application/xml');
		ctx.body = sitemap;
	},
	adminGET: async (ctx) => {
		ctx.body = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getAdminData();
	},
	adminPOST(ctx) {
		const requestData = ctx.request.body;

		ctx.body = strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.saveAdminData(requestData);
	},
	adminPUT(ctx) {
		const requestData = ctx.request.body;

		ctx.body = strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.updateAdminData(requestData);
	},
	adminDELETE(ctx) {
		ctx.body = strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.deleteAdminData(ctx.query.id);
	},
	adminGETContentTypes: async (ctx) => {
		ctx.body = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getContentTypes();
	},
	adminGETLocales: async (ctx) => {
		ctx.body = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getLocales();
	},
	adminAllowedFields: async (ctx) => {
		ctx.body = await strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.getAllowedFields(ctx.query.type);
	},
	adminPutOptions: async (ctx) => {
		const requestData = ctx.request.body;

		ctx.body = strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.updateOptions(requestData);
	},
	adminGetOptions: async (ctx) => {
		ctx.body = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getOptions();
	},
	adminGetCustomURLs: async (ctx) => {
		ctx.body = await strapi.plugin('strapi-5-sitemap-plugin').service('service').getCustomURLs();
	},
	adminPostCustomURLs: async (ctx) => {
		const requestData = ctx.request.body;

		ctx.body = await strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.postCustomURLs(requestData);
	},
	adminPutCustomURLs: async (ctx) => {
		const requestData = ctx.request.body;

		ctx.body = await strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.putCustomURLs(requestData);
	},
	adminDeleteCustomURLs: async (ctx) => {
		ctx.body = await strapi
			.plugin('strapi-5-sitemap-plugin')
			.service('service')
			.deleteCustomURLs(ctx.query.id);
	},
});

export default controller;
