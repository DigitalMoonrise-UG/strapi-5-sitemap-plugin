declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getNestedValue<T>(obj: Record<string, T | Record<string, any>>, path: string): T;
        parseTableReferences(pattern: string): Record<string, any>;
        getSitemap(slug?: string): Promise<string>;
        generateSitemapIndexXml(baseURL: string, definitions: {
            name: string;
        }[]): string;
        generateUrlsetXml(sitemap: {
            url: string;
            priority: number;
            frequency: string;
            lastmod?: string;
            thumbnail?: string;
            thumbnailTitle?: string;
        }[]): string;
        buildAndReturnSitemapXml(baseURL: string, excludedUrls: string[], sitemapEntries: any[], customURLs: any[]): Promise<string>;
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
            excludedUrls: any[];
            useSitemapIndex: boolean;
            sitemapDefinitions: any[];
        }>;
        updateOptions(data: Record<string, unknown>): Promise<{
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
export default _default;
