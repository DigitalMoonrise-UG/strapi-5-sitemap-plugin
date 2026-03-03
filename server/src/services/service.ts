import type {Core} from '@strapi/strapi';

const service = ({strapi}: { strapi: Core.Strapi }) => ({
	getNestedValue<T>(obj: Record<string, T | Record<string, any>>, path: string): T {
		return path.split('.').reduce((current, key) => {
			return current && current[key] !== undefined ? current[key] : null;
		}, obj) as T;
	},
	parseTableReferences(pattern: string): Record<string, any> {
		const populate: Record<string, any> = {};
		const placeholders = pattern.match(/\[([^\]]+)]/g) || [];

		for (const placeholder of placeholders) {
			const content = placeholder.replace(/[\[\]]/g, '');
			if (content.includes('.')) {
				const parts = content.split('.');
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
	async getSitemap(slug?: string) {
		const baseURLObject = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').findFirst();
		if (!baseURLObject) return this.generateUrlsetXml([]);
		const baseURL = baseURLObject.baseUrl || '';
		const excludedUrls: string[] = Array.isArray(baseURLObject.excludedUrls) ? baseURLObject.excludedUrls : [];
		const useSitemapIndex = Boolean(baseURLObject.useSitemapIndex);
		const sitemapDefinitions: Array<{ name: string; collectionTypeConfigIds: number[]; includeCustomUrls: boolean }> =
			Array.isArray(baseURLObject.sitemapDefinitions) ? baseURLObject.sitemapDefinitions : [];

		const allSitemapEntries = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type').findMany();
		const allCustomURLs = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url').findMany();

		if (useSitemapIndex && sitemapDefinitions.length > 0) {
			if (slug === undefined) {
				return this.generateSitemapIndexXml(baseURL, sitemapDefinitions);
			}
			const def = sitemapDefinitions.find((d: { name: string }) => (d.name || '').trim() === String(slug).trim());
			if (!def) return this.generateUrlsetXml([]);
			const configIds = Array.isArray(def.collectionTypeConfigIds) ? def.collectionTypeConfigIds : [];
			const sitemapEntries = allSitemapEntries.filter((e: { id: number }) => configIds.includes(e.id));
			const customURLs = def.includeCustomUrls ? allCustomURLs : [];
			return this.buildAndReturnSitemapXml(baseURL, excludedUrls, sitemapEntries, customURLs);
		}

		return this.buildAndReturnSitemapXml(baseURL, excludedUrls, allSitemapEntries, allCustomURLs);
	},
	generateSitemapIndexXml(baseURL: string, definitions: Array<{ name: string }>) {
		const base = baseURL.replace(/\/$/, '');
		const prefix = '/api/strapi-5-sitemap-plugin';
		const sitemaps = definitions
			.filter((d) => (d.name || '').trim() !== '')
			.map((d) => `<sitemap><loc>${base}${prefix}/sitemap-${encodeURIComponent(String(d.name).trim())}.xml</loc></sitemap>`)
			.join('');
		return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}</sitemapindex>`;
	},
	generateUrlsetXml(sitemap: Array<{ url: string; priority: number; frequency: string; lastmod?: string; thumbnail?: string; thumbnailTitle?: string }>) {
		const urlSet = sitemap
			.map(
				(entry) => `
					        <url>
					            <loc>${entry.url}</loc>
					            <priority>${entry.priority}</priority>
					            <changefreq>${entry.frequency}</changefreq>
					            ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
					            ${entry.thumbnail ? `<image:image><image:loc>${entry.thumbnail}</image:loc><image:title>${entry.thumbnailTitle || ''}</image:title></image:image>` : ''}
					        </url>`
			)
			.join('');
		return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlSet}</urlset>`;
	},
	async buildAndReturnSitemapXml(
		baseURL: string,
		excludedUrls: string[],
		sitemapEntries: any[],
		customURLs: any[]
	) {
		try {
			const collections = [];
			const sitemap = [];

			for (const sitemapEntry of sitemapEntries) {
				const isValidThumbnail = sitemapEntry.thumbnail && sitemapEntry.thumbnail !== '-';
				let populate = isValidThumbnail ? { [sitemapEntry.thumbnail]: true } : undefined;

				if (sitemapEntry.populateLinkedModels === 'true') {
					const linkedModels = this.parseTableReferences(sitemapEntry.pattern);
					if (linkedModels.populate) {
						populate = {
							...populate,
							...linkedModels.populate,
						};
					}
				}

				const entries = await strapi
					.documents(`api::${sitemapEntry.type}.${sitemapEntry.type}`)
					.findMany({
						locale: sitemapEntry.langcode === '-' ? undefined : sitemapEntry.langcode,
						status: 'published',
						populate,
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
					populateLinkedModels,
				} = collection;
				outerloop: for (const entry of entries) {
					let url = pattern;
					const placeholders = pattern.match(/\[([^\]]+)]/g) || [];
					let hasInvalidPlaceholder = false;

					for (const placeholder of placeholders) {
						const key = placeholder.replace(/[\[\]]/g, '');

						// Support nested object references with dot notation
						let value: any;
						if (key.includes('.')) {
							value = this.getNestedValue(entry, key);
						} else {
							value = entry[key];
						}

						if (value !== null && value !== undefined) {
							url = url.replace(placeholder, value);
						} else if (key.includes('.')) {
							// For nested references, replace them with empty string to allow URL generation
							url = url.replace(placeholder, '');
						} else {
							// For direct field references, skip this entry entirely
							hasInvalidPlaceholder = true;
							break;
						}
					}

					if (hasInvalidPlaceholder) {
						continue;
					}

					// Clean up any double slashes that might result from empty replacements
					url = url.replace(/\/+/g, '/');
					url = baseURL + url;

					const sitemapEntry = {
						url,
						priority,
						frequency,
						lastmod: undefined,
						thumbnail: undefined,
						thumbnailTitle: undefined,
						populateLinkedModels: undefined,
					};

					if (lastModified === 'true') {
						sitemapEntry.lastmod = entry.updatedAt;
					}

					if (populateLinkedModels == 'true') {
						sitemapEntry.populateLinkedModels = true;
					}

					if (thumbnail !== '') {
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
				frequency: customURL.frequency,
			}));

			sitemap.push(...customSitemapEntries);

			// Filter out excluded URL paths
			const normalizedExcluded = excludedUrls
				.map((path) => String(path).trim())
				.filter(Boolean)
				.map((p) => (p.startsWith('/') ? p : `/${p}`).replace(/\/$/, '') || '/');
			const getPathFromUrl = (url: string): string => {
				try {
					const pathname = new URL(url).pathname;
					return pathname.replace(/\/$/, '') || '/';
				} catch {
					return '/';
				}
			};
			const filteredSitemap = sitemap.filter((entry) => {
				const path = getPathFromUrl(entry.url);
				return !normalizedExcluded.some((ex) => path === ex);
			});

			return this.generateUrlsetXml(filteredSitemap);
		} catch (error) {
			strapi.log.error('Error fetching entries:', error);
			throw new Error('Failed to fetch entries for types');
		}
	},
	async saveAdminData(data: any) {
		try {
			const result = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type').create({
				data,
			});

			return {
				message: 'Data saved successfully',
				savedData: result,
			};
		} catch (error) {
			strapi.log.error('Error saving data:', error);
			throw new Error('Failed to save data');
		}
	},
	async getAdminData() {
		try {
			const results = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type').findMany();

			return {
				results,
			};
		} catch (error) {
			strapi.log.error('Error fetching data:', error);
			throw new Error('Failed to fetch data');
		}
	},
	async getContentTypes() {
		try {
			const contentTypes = strapi.contentTypes;

			const collectionTypes = Object.keys(contentTypes)
				.filter((key) => contentTypes[key].kind === 'collectionType' && key.startsWith('api::'))
				.map((key) => ({
					uid: key,
					singularName: contentTypes[key].info.singularName,
					pluralName: contentTypes[key].info.pluralName,
					displayName: contentTypes[key].info.displayName,
				}));

			return {collectionTypes};
		} catch (error) {
			strapi.log.error('Error fetching content types:', error);
			throw new Error('Failed to fetch content types');
		}
	},
	async getLocales() {
		try {
			return await strapi.plugin('i18n').service('locales').find();
		} catch (error) {
			strapi.log.error('Error fetching locales:', error);
			throw new Error('Failed to fetch locales');
		}
	},
	async getAllowedFields(contentTypeSingularName) {
		const systemFields = ['createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'locale'];

		const contentType = Object.values(strapi.contentTypes).find(
			(type) => type.info.singularName === contentTypeSingularName
		);

		const fields = [];

		Object.entries(contentType.attributes).forEach(([fieldName, field] : [fieldName: string, field: any]) => {
			if (
				!systemFields.includes(fieldName) &&
				field.type !== 'relation' &&
				field.type !== 'component'
			) {
				fields.push(fieldName);
			} else if (
				field.type === 'relation' &&
				field.relation.endsWith('ToOne') &&
				!['createdBy', 'updatedBy'].includes(fieldName)
			) {
				fields.push(`${fieldName}.id`);
			} else if (
				field.type === 'component' &&
				!field.repeatable
			) {
				const component = strapi.components[field.component];
				Object.keys(component.attributes).forEach((subFieldName) => {
					fields.push(`${fieldName}.${subFieldName}`);
				});
			}
		});

		if (!fields.includes('id')) {
			fields.push('id');
		}

		return {
			allowedFields: fields,
			slug: contentType.info.pluralName,
		};
	},
	async updateAdminData(data) {
		try {
			const result = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type').update({
				where: {id: data.id},
				data: {
					type: data.type,
					langcode: data.langcode,
					pattern: data.pattern,
					priority: data.priority,
					frequency: data.frequency,
					lastModified: data.lastModified,
					thumbnail: data.thumbnail,
					populateLinkedModels: data.populateLinkedModels,
				},
			});

			return {
				message: 'Data saved successfully',
				savedData: result,
			};
		} catch (error) {
			strapi.log.error('Error saving data:', error);
			throw new Error('Failed to save data');
		}
	},
	async deleteAdminData(id) {
		try {
			const result = await strapi.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type').delete({
				where: {
					id: id,
				},
			});

			return {
				message: 'Data deleted successfully',
				deletedData: result,
			};
		} catch (error) {
			strapi.log.error('Error deleting data:', error);
			throw new Error('Failed to delete data');
		}
	},
	async getOptions() {
		try {
			const results = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').findFirst();
			if (results) {
				const excludedUrls = Array.isArray(results.excludedUrls) ? results.excludedUrls : [];
				const useSitemapIndex = Boolean(results.useSitemapIndex);
				const sitemapDefinitions = Array.isArray(results.sitemapDefinitions) ? results.sitemapDefinitions : [];
				return { baseUrl: results.baseUrl, excludedUrls, useSitemapIndex, sitemapDefinitions };
			} else {
				return { baseUrl: '', excludedUrls: [], useSitemapIndex: false, sitemapDefinitions: [] };
			}
		} catch (error) {
			strapi.log.error('Error fetching locales:', error);
			throw new Error('Failed to fetch locales');
		}
	},
	async updateOptions(data: Record<string, unknown>) {
		try {
			const results = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').findFirst();
			const excludedUrls = Array.isArray(data.excludedUrls) ? data.excludedUrls : [];
			const useSitemapIndex = Boolean(data.useSitemapIndex);
			const sitemapDefinitions = Array.isArray(data.sitemapDefinitions) ? data.sitemapDefinitions : [];
			const updateData = {
				baseUrl: data.baseURL != null ? String(data.baseURL) : '',
				excludedUrls,
				useSitemapIndex,
				sitemapDefinitions,
			};
			let response;
			if (results) {
				// Use db.query().update() so JSON/boolean fields persist (Query Engine uses id)
				const rows = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').findMany({ limit: 1 });
				const row = rows[0];
				if (row && row.id != null) {
					response = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').update({
						where: { id: row.id },
						data: updateData as Record<string, unknown>,
					});
				} else {
					response = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').update({
						documentId: results.documentId,
						// @ts-expect-error schema includes useSitemapIndex, sitemapDefinitions
						data: updateData,
					});
				}
			} else {
				response = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option').create({
					data: updateData as Record<string, unknown>,
				});
			}
			return { message: 'Data saved successfully', savedData: response };
		} catch (error) {
			strapi.log.error('Error saving data:', error);
			throw new Error('Failed to save data');
		}
	},
	async getCustomURLs() {
		try {
			const results = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url').findMany();

			return {
				results,
			};
		} catch (error) {
			strapi.log.error('Error fetching data:', error);
			throw new Error('Failed to fetch data');
		}
	},
	async postCustomURLs(data) {
		try {
			const result = await strapi.documents('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url').create({
				data,
			});

			return {
				message: 'Data saved successfully',
				savedData: result,
			};
		} catch (error) {
			strapi.log.error('Error saving data:', error);
			throw new Error('Failed to save data');
		}
	},
	async putCustomURLs(data) {
		try {
			const result = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url').update({
				where: {id: data.id},
				data: {
					slug: data.slug,
					priority: data.priority,
					frequency: data.frequency,
				},
			});

			return {
				message: 'Data saved successfully',
				savedData: result,
			};
		} catch (error) {
			strapi.log.error('Error saving data:', error);
			throw new Error('Failed to save data');
		}
	},
	async deleteCustomURLs(id) {
		try {
			const result = await strapi.db.query('plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url').delete({
				where: {
					id: id,
				},
			});

			return {
				message: 'Data deleted successfully',
				deletedData: result,
			};
		} catch (error) {
			strapi.log.error('Error deleting data:', error);
			throw new Error('Failed to delete data');
		}
	}
});

export default service;
