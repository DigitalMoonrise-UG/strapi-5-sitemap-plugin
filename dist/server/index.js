"use strict";
const PLUGIN_ID = "strapi-5-sitemap-plugin";
const bootstrap = async ({ strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Access the plugin settings",
      uid: "settings.read",
      pluginName: PLUGIN_ID
    },
    {
      section: "plugins",
      displayName: "Menu link to plugin settings",
      uid: "menu-link",
      pluginName: PLUGIN_ID
    }
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
};
const config = {
  default: {},
  validator() {
  }
};
const kind$2 = "collectionType";
const collectionName$2 = "strapi_5_sitemap_plugin_content_types";
const info$2 = {
  singularName: "strapi-5-sitemap-plugin-content-type",
  pluralName: "strapi-5-sitemap-plugin-content-types",
  displayName: "strapi-5-sitemap-plugin-content-type"
};
const options$3 = {
  comment: ""
};
const pluginOptions$2 = {
  "content-manager": {
    visible: false
  },
  "content-type-builder": {
    visible: false
  }
};
const attributes$2 = {
  type: {
    type: "string"
  },
  langcode: {
    type: "string"
  },
  pattern: {
    type: "string"
  },
  priority: {
    type: "float"
  },
  frequency: {
    type: "string"
  },
  lastModified: {
    type: "string"
  },
  thumbnail: {
    type: "string"
  },
  populateLinkedModels: {
    type: "string"
  }
};
const schema$2 = {
  kind: kind$2,
  collectionName: collectionName$2,
  info: info$2,
  options: options$3,
  pluginOptions: pluginOptions$2,
  attributes: attributes$2
};
const contentType = {
  schema: schema$2
};
const kind$1 = "collectionType";
const collectionName$1 = "strapi_5_sitemap_plugin_content_type_single_urls";
const info$1 = {
  singularName: "strapi-5-sitemap-plugin-content-type-single-url",
  pluralName: "strapi-5-sitemap-plugin-content-type-single-urls",
  displayName: "strapi-5-sitemap-plugin-content-type-single-url"
};
const options$2 = {
  comment: ""
};
const pluginOptions$1 = {
  "content-manager": {
    visible: false
  },
  "content-type-builder": {
    visible: false
  }
};
const attributes$1 = {
  slug: {
    type: "string"
  },
  priority: {
    type: "float"
  },
  frequency: {
    type: "string"
  }
};
const schema$1 = {
  kind: kind$1,
  collectionName: collectionName$1,
  info: info$1,
  options: options$2,
  pluginOptions: pluginOptions$1,
  attributes: attributes$1
};
const contentTypeSingle = {
  schema: schema$1
};
const kind = "singleType";
const collectionName = "strapi_5_sitemap_plugin_options";
const info = {
  singularName: "strapi-5-sitemap-plugin-option",
  pluralName: "strapi-5-sitemap-plugin-options",
  displayName: "strapi-5-sitemap-plugin-options"
};
const options$1 = {
  comment: ""
};
const pluginOptions = {
  "content-manager": {
    visible: false
  },
  "content-type-builder": {
    visible: false
  }
};
const attributes = {
  baseUrl: {
    type: "string"
  }
};
const schema = {
  kind,
  collectionName,
  info,
  options: options$1,
  pluginOptions,
  attributes
};
const options = {
  schema
};
const contentTypes = {
  "strapi-5-sitemap-plugin-content-type": contentType,
  "strapi-5-sitemap-plugin-content-type-single-url": contentTypeSingle,
  "strapi-5-sitemap-plugin-option": options
};
const controller = ({ strapi }) => ({
  getSitemap: async (ctx) => {
    const sitemap = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getSitemap();
    ctx.set("Content-Type", "application/xml");
    ctx.body = sitemap;
  },
  adminGET: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getAdminData();
  },
  adminPOST(ctx) {
    const requestData = ctx.request.body;
    ctx.body = strapi.plugin("strapi-5-sitemap-plugin").service("service").saveAdminData(requestData);
  },
  adminPUT(ctx) {
    const requestData = ctx.request.body;
    ctx.body = strapi.plugin("strapi-5-sitemap-plugin").service("service").updateAdminData(requestData);
  },
  adminDELETE(ctx) {
    ctx.body = strapi.plugin("strapi-5-sitemap-plugin").service("service").deleteAdminData(ctx.query.id);
  },
  adminGETContentTypes: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getContentTypes();
  },
  adminGETLocales: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getLocales();
  },
  adminAllowedFields: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getAllowedFields(ctx.query.type);
  },
  adminPutOptions: async (ctx) => {
    const requestData = ctx.request.body;
    ctx.body = strapi.plugin("strapi-5-sitemap-plugin").service("service").updateOptions(requestData);
  },
  adminGetOptions: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getOptions();
  },
  adminGetCustomURLs: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").getCustomURLs();
  },
  adminPostCustomURLs: async (ctx) => {
    const requestData = ctx.request.body;
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").postCustomURLs(requestData);
  },
  adminPutCustomURLs: async (ctx) => {
    const requestData = ctx.request.body;
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").putCustomURLs(requestData);
  },
  adminDeleteCustomURLs: async (ctx) => {
    ctx.body = await strapi.plugin("strapi-5-sitemap-plugin").service("service").deleteCustomURLs(ctx.query.id);
  }
});
const controllers = {
  controller
};
const middlewares = {};
const policies = {};
const frontend = [
  {
    method: "GET",
    path: "/sitemap.xml",
    handler: "controller.getSitemap",
    config: {
      policies: []
    }
  }
];
const admin = [
  {
    method: "GET",
    path: "/admin",
    handler: "controller.adminGET",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/admin",
    handler: "controller.adminPOST",
    config: {
      policies: []
    }
  },
  {
    method: "PUT",
    path: "/admin",
    handler: "controller.adminPUT",
    config: {
      policies: []
    }
  },
  {
    method: "DELETE",
    path: "/admin",
    handler: "controller.adminDELETE",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/admin-get-content-types",
    handler: "controller.adminGETContentTypes",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/admin-get-locales",
    handler: "controller.adminGETLocales",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/admin-allowed-fields",
    handler: "controller.adminAllowedFields",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/admin-get-options",
    handler: "controller.adminGetOptions",
    config: {
      policies: []
    }
  },
  {
    method: "PUT",
    path: "/admin-put-options",
    handler: "controller.adminPutOptions",
    config: {
      policies: []
    }
  },
  {
    method: "GET",
    path: "/admin-custom-urls",
    handler: "controller.adminGetCustomURLs",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/admin-custom-urls",
    handler: "controller.adminPostCustomURLs",
    config: {
      policies: []
    }
  },
  {
    method: "PUT",
    path: "/admin-custom-urls",
    handler: "controller.adminPutCustomURLs",
    config: {
      policies: []
    }
  },
  {
    method: "DELETE",
    path: "/admin-custom-urls",
    handler: "controller.adminDeleteCustomURLs",
    config: {
      policies: []
    }
  }
];
const routes = {
  frontend: {
    type: "content-api",
    routes: [...frontend]
  },
  admin: {
    type: "admin",
    routes: [...admin]
  }
};
const service = ({ strapi }) => ({
  getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== void 0 ? current[key] : null;
    }, obj);
  },
  parseTableReferences(pattern) {
    const populate = {};
    const placeholders = pattern.match(/\[([^\]]+)]/g) || [];
    for (const placeholder of placeholders) {
      const content = placeholder.replace(/[\[\]]/g, "");
      if (content.includes(".")) {
        const parts = content.split(".");
        parts.pop();
        if (parts.length === 1) {
          const table = parts[0];
          populate[table] = true;
        } else if (parts.length > 1) {
          let current = populate;
          for (let i = 0; i < parts.length; i++) {
            const tableName = parts[i];
            if (i === parts.length - 1) {
              current[tableName] = true;
            } else {
              if (!current[tableName] || current[tableName] === true) {
                current[tableName] = { populate: {} };
              }
              current = current[tableName].populate;
            }
          }
        }
      }
    }
    return Object.keys(populate).length > 0 ? { populate } : {};
  },
  async getSitemap() {
    const sitemapEntries = await strapi.documents("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type").findMany();
    const customURLs = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url").findMany();
    const baseURLObject = await strapi.documents("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option").findFirst();
    const baseURL = baseURLObject.baseUrl;
    try {
      const collections = [];
      const sitemap = [];
      for (const sitemapEntry of sitemapEntries) {
        const isValidThumbnail = sitemapEntry.thumbnail && sitemapEntry.thumbnail !== "-";
        let populate = isValidThumbnail ? { [sitemapEntry.thumbnail]: true } : void 0;
        if (sitemapEntry.populateLinkedModels === "true") {
          const linkedModels = this.parseTableReferences(sitemapEntry.pattern);
          if (linkedModels.populate) {
            populate = {
              ...populate,
              ...linkedModels.populate
            };
          }
        }
        const entries = await strapi.documents(`api::${sitemapEntry.type}.${sitemapEntry.type}`).findMany({
          locale: sitemapEntry.langcode === "-" ? void 0 : sitemapEntry.langcode,
          status: "published",
          populate
        });
        collections.push({ ...sitemapEntry, entries });
      }
      collections.forEach((collection) => {
        const {
          pattern,
          priority,
          frequency,
          entries,
          lastModified,
          thumbnail,
          populateLinkedModels
        } = collection;
        outerloop: for (const entry of entries) {
          let url = pattern;
          const placeholders = pattern.match(/\[([^\]]+)]/g) || [];
          for (const placeholder of placeholders) {
            const key = placeholder.replace(/[\[\]]/g, "");
            let value;
            if (key.includes(".")) {
              value = this.getNestedValue(entry, key);
            } else {
              value = entry[key];
            }
            if (value !== null && value !== void 0) {
              url = url.replace(placeholder, value);
            } else {
              break outerloop;
            }
          }
          url = baseURL + url;
          const sitemapEntry = {
            url,
            priority,
            frequency,
            lastmod: void 0,
            thumbnail: void 0,
            thumbnailTitle: void 0,
            populateLinkedModels: void 0
          };
          if (lastModified === "true") {
            sitemapEntry.lastmod = entry.updatedAt;
          }
          if (populateLinkedModels == "true") {
            sitemapEntry.populateLinkedModels = true;
          }
          if (thumbnail !== "") {
            const media = Array.isArray(entry[thumbnail]) ? entry[thumbnail][0] : entry[thumbnail];
            if (media?.url) {
              sitemapEntry.thumbnail = media.url;
              sitemapEntry.thumbnailTitle = media.name;
            }
          }
          sitemap.push(sitemapEntry);
        }
      });
      const customSitemapEntries = customURLs.map((customURL) => ({
        url: `${baseURL}${customURL.slug}`,
        priority: customURL.priority,
        frequency: customURL.frequency
      }));
      sitemap.push(...customSitemapEntries);
      const generateXML = (sitemap2) => {
        const urlSet = sitemap2.map(
          (entry) => `
					        <url>
					            <loc>${entry.url}</loc>
					            <priority>${entry.priority}</priority>
					            <changefreq>${entry.frequency}</changefreq>
					            ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}
					            ${entry.thumbnail ? `<image:image><image:loc>${entry.thumbnail}</image:loc><image:title>${entry.thumbnailTitle}</image:title></image:image>` : ""}
					        </url>`
        ).join("");
        return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlSet}</urlset>`;
      };
      return generateXML(sitemap);
    } catch (error) {
      strapi.log.error("Error fetching entries:", error);
      throw new Error("Failed to fetch entries for types");
    }
  },
  async saveAdminData(data) {
    try {
      const result = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type").create({
        data
      });
      return {
        message: "Data saved successfully",
        savedData: result
      };
    } catch (error) {
      strapi.log.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  },
  async getAdminData() {
    try {
      const results = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type").findMany();
      return {
        results
      };
    } catch (error) {
      strapi.log.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  },
  async getContentTypes() {
    try {
      const contentTypes2 = strapi.contentTypes;
      const collectionTypes = Object.keys(contentTypes2).filter((key) => contentTypes2[key].kind === "collectionType" && key.startsWith("api::")).map((key) => ({
        uid: key,
        singularName: contentTypes2[key].info.singularName,
        pluralName: contentTypes2[key].info.pluralName,
        displayName: contentTypes2[key].info.displayName
      }));
      return { collectionTypes };
    } catch (error) {
      strapi.log.error("Error fetching content types:", error);
      throw new Error("Failed to fetch content types");
    }
  },
  async getLocales() {
    try {
      return await strapi.plugin("i18n").service("locales").find();
    } catch (error) {
      strapi.log.error("Error fetching locales:", error);
      throw new Error("Failed to fetch locales");
    }
  },
  async getAllowedFields(contentTypeSingularName) {
    const systemFields = [
      "createdAt",
      "updatedAt",
      "publishedAt",
      "createdBy",
      "updatedBy",
      "locale"
    ];
    const contentType2 = Object.values(strapi.contentTypes).find(
      (type) => type.info.singularName === contentTypeSingularName
    );
    const fields = [];
    Object.entries(contentType2.attributes).forEach(
      ([fieldName, field]) => {
        if (!systemFields.includes(fieldName) && field.type !== "relation" && field.type !== "component") {
          fields.push(fieldName);
        } else if (field.type === "relation" && field.relation.endsWith("ToOne") && !["createdBy", "updatedBy"].includes(fieldName)) {
          fields.push(`${fieldName}.id`);
        } else if (field.type === "component" && !field.repeatable) {
          const component = strapi.components[field.component];
          Object.keys(component.attributes).forEach((subFieldName) => {
            fields.push(`${fieldName}.${subFieldName}`);
          });
        }
      }
    );
    if (!fields.includes("id")) {
      fields.push("id");
    }
    return {
      allowedFields: fields,
      slug: contentType2.info.pluralName
    };
  },
  async updateAdminData(data) {
    try {
      const result = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type").update({
        where: { id: data.id },
        data: {
          type: data.type,
          langcode: data.langcode,
          pattern: data.pattern,
          priority: data.priority,
          frequency: data.frequency,
          lastModified: data.lastModified,
          thumbnail: data.thumbnail,
          populateLinkedModels: data.populateLinkedModels
        }
      });
      return {
        message: "Data saved successfully",
        savedData: result
      };
    } catch (error) {
      strapi.log.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  },
  async deleteAdminData(id) {
    try {
      const result = await strapi.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type").delete({
        where: {
          id
        }
      });
      return {
        message: "Data deleted successfully",
        deletedData: result
      };
    } catch (error) {
      strapi.log.error("Error deleting data:", error);
      throw new Error("Failed to delete data");
    }
  },
  async getOptions() {
    try {
      const results = await strapi.documents("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option").findFirst();
      if (results) {
        return { baseUrl: results.baseUrl };
      } else {
        return { baseUrl: "" };
      }
    } catch (error) {
      strapi.log.error("Error fetching locales:", error);
      throw new Error("Failed to fetch locales");
    }
  },
  async updateOptions(data) {
    try {
      const results = await strapi.documents("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option").findFirst();
      let response = null;
      if (results) {
        response = await strapi.documents("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option").update({
          documentId: results.documentId,
          data: {
            // @ts-ignore
            baseUrl: data.baseURL
          }
        });
      } else {
        response = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option").create({
          data: {
            baseUrl: data.baseURL
          }
        });
      }
      return {
        message: "Data saved successfully",
        savedData: response
      };
    } catch (error) {
      strapi.log.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  },
  async getCustomURLs() {
    try {
      const results = await strapi.documents(
        "plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url"
      ).findMany();
      return {
        results
      };
    } catch (error) {
      strapi.log.error("Error fetching data:", error);
      throw new Error("Failed to fetch data");
    }
  },
  async postCustomURLs(data) {
    try {
      const result = await strapi.documents(
        "plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url"
      ).create({
        data
      });
      return {
        message: "Data saved successfully",
        savedData: result
      };
    } catch (error) {
      strapi.log.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  },
  async putCustomURLs(data) {
    try {
      const result = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url").update({
        where: { id: data.id },
        data: {
          slug: data.slug,
          priority: data.priority,
          frequency: data.frequency
        }
      });
      return {
        message: "Data saved successfully",
        savedData: result
      };
    } catch (error) {
      strapi.log.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  },
  async deleteCustomURLs(id) {
    try {
      const result = await strapi.db.query("plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url").delete({
        where: {
          id
        }
      });
      return {
        message: "Data deleted successfully",
        deletedData: result
      };
    } catch (error) {
      strapi.log.error("Error deleting data:", error);
      throw new Error("Failed to delete data");
    }
  }
});
const services = {
  service
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
module.exports = index;
