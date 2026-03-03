import type { Core } from '@strapi/strapi';
declare const controller: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getSitemap: (ctx: any) => Promise<void>;
    getSitemapBySlug: (ctx: any) => Promise<void>;
    adminGET: (ctx: any) => Promise<void>;
    adminPOST(ctx: any): void;
    adminPUT(ctx: any): void;
    adminDELETE(ctx: any): void;
    adminGETContentTypes: (ctx: any) => Promise<void>;
    adminGETLocales: (ctx: any) => Promise<void>;
    adminAllowedFields: (ctx: any) => Promise<void>;
    adminPutOptions: (ctx: any) => Promise<void>;
    adminGetOptions: (ctx: any) => Promise<void>;
    adminGetCustomURLs: (ctx: any) => Promise<void>;
    adminPostCustomURLs: (ctx: any) => Promise<void>;
    adminPutCustomURLs: (ctx: any) => Promise<void>;
    adminDeleteCustomURLs: (ctx: any) => Promise<void>;
};
export default controller;
