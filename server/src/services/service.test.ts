import service from './service';
import { vi, assert, expect, test, describe, beforeEach } from 'vitest';

function normalizeXml(xmlString: string): string {
	return xmlString.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
}

describe('Sitemap service', () => {
	let strapi;

	beforeEach(async function () {
		strapi = {
			documents: vi.fn().mockImplementation((type: string) => {
				switch (type) {
					case 'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type':
						return {
							findMany: vi.fn().mockReturnValue([
								{ pattern: 'test/[url]', type: 'test', priority: 0.5, frequency: 'daily' },
								{
									pattern: 'test2/[url]/[other]',
									type: 'test2',
									priority: 0.5,
									frequency: 'daily',
								},
								{
									pattern: 'test3/[nested.url]/[url]',
									type: 'test3',
									priority: 0.1,
									frequency: 'daily',
								},
							]),
						};
					case 'api::test.test':
						return {
							findMany: vi.fn().mockReturnValue([
								{ url: '123' },
								{ url: null }, // would generate invalid url
							]),
						};
					case 'api::test2.test2':
						return {
							findMany: vi.fn().mockReturnValue([
								{ url: '456', other: 'other' },
								{ url: null, other: 'other' }, // would generate invalid url
								{ url: '789', other: null }, // would generate invalid url
							]),
						};
					case 'api::test3.test3':
						return {
							findMany: vi
								.fn()
								.mockReturnValue([{ nested: { url: 'parent-url' }, url: 'child-url' }]),
						};
					case 'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option':
						return {
							findFirst: vi.fn().mockReturnValue({ baseUrl: 'https://example.com/' }),
						};
				}
			}),
			db: {
				query: vi.fn().mockImplementation((type: string) => {
					switch (type) {
						case 'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url':
							return {
								findMany: vi.fn().mockReturnValue([
									{
										slug: 'custom1',
										priority: 1,
										frequency: 'daily',
									},
									{
										slug: 'custom2',
										priority: 2,
										frequency: 'monthly',
									},
								]),
							};
					}
				}),
			},
			log: {
				error: vi.fn().mockImplementation((message: string, error: Error) => {
					console.log(message, error);
				}),
			},
			plugin: vi.fn().mockReturnValue({
				service: vi.fn().mockReturnValue({
					create: vi.fn().mockReturnValue({
						data: {
							name: 'test',
							status: false,
						},
					}),
					complete: vi.fn().mockReturnValue({
						data: {
							id: 1,
							status: true,
						},
					}),
				}),
			}),
		};
	});
	test('should generate only valid urls', async function () {
		const name = 'test';
		const sitemap = await service({ strapi }).getSitemap();
		const normalized = normalizeXml(sitemap);
		const expected = normalizeXml(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
          <url>
              <loc>https://example.com/test/123</loc>
              <priority>0.5</priority>
              <changefreq>daily</changefreq>
          </url>
          <url>
              <loc>https://example.com/test2/456/other</loc>
              <priority>0.5</priority>
              <changefreq>daily</changefreq>
          </url>
           <url>
              <loc>https://example.com/test3/parent-url/child-url</loc>
              <priority>0.1</priority>
              <changefreq>daily</changefreq>
          </url>
          <url>
              <loc>https://example.com/custom1</loc>
              <priority>1</priority>
              <changefreq>daily</changefreq>
          </url>
          <url>
              <loc>https://example.com/custom2</loc>
              <priority>2</priority>
              <changefreq>monthly</changefreq>
          </url>
      </urlset>
      `);
		expect(normalized).toBe(expected);
	});
});
