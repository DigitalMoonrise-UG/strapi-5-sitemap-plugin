import type { Core } from '@strapi/strapi';
declare const service: ({ strapi }: {
    strapi: Core.Strapi;
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
export default service;
