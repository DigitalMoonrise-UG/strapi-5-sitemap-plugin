declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        controller: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getSitemap: (ctx: any) => Promise<void>;
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
    };
    routes: {
        frontend: {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                };
            }[];
        };
        admin: {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                };
            }[];
        };
    };
    services: {
        service: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getNestedValue<T>(obj: Record<string, T | Record<string, any>>, path: string): T;
            parseTableReferences(pattern: string): Record<string, any>;
            getSitemap(): Promise<string>;
            saveAdminData(data: any): Promise<{
                message: string;
                savedData: any;
            }>;
            getAdminData(): Promise<{
                results: any[];
            }>;
            getContentTypes(): Promise<{
                collectionTypes: {
                    uid: string;
                    singularName: any;
                    pluralName: any;
                    displayName: any;
                }[];
            }>;
            getLocales(): Promise<any>;
            getAllowedFields(contentTypeSingularName: any): Promise<{
                allowedFields: any[];
                slug: any;
            }>;
            updateAdminData(data: any): Promise<{
                message: string;
                savedData: any;
            }>;
            deleteAdminData(id: any): Promise<{
                message: string;
                deletedData: any;
            }>;
            getOptions(): Promise<{
                baseUrl: any;
            }>;
            updateOptions(data: any): Promise<{
                message: string;
                savedData: any;
            }>;
            getCustomURLs(): Promise<{
                results: import("@strapi/types/dist/modules/documents").AnyDocument[];
            }>;
            postCustomURLs(data: any): Promise<{
                message: string;
                savedData: import("@strapi/types/dist/modules/documents").AnyDocument;
            }>;
            putCustomURLs(data: any): Promise<{
                message: string;
                savedData: any;
            }>;
            deleteCustomURLs(id: any): Promise<{
                message: string;
                deletedData: any;
            }>;
        };
    };
    contentTypes: {
        'strapi-5-sitemap-plugin-content-type': {
            schema: any;
        };
        'strapi-5-sitemap-plugin-content-type-single-url': {
            schema: any;
        };
        'strapi-5-sitemap-plugin-option': {
            schema: any;
        };
    };
    policies: {};
    middlewares: {};
};
export default _default;
