# Sitemap Plugin for Strapi v5

## Overview
The **Sitemap Plugin for Strapi v5** is a powerful tool to dynamically generate a sitemap in XML format for your Strapi application. It automates the creation of sitemaps for your collection types and allows you to include custom links with detailed configurations, ensuring that your site is easily navigable by search engines.

---

## Features

### 1. Automatic Sitemap Generation
- Creates a sitemap in **XML format** accessible at:
  ```
  /api/strapi-5-sitemap-plugin/sitemap.xml
  ```

### 2. Collection Type Integration
- Automatically includes **Collection Types** with support for:
	- Language codes
	- Dynamic patterns (e.g., `/[slug]`)
	- `lastmod` (last modification date)
	- `changefreq` (change frequency for search engines)
	- `priority` (page priority)

### 3. Custom Links
- Add custom URLs to your sitemap with:
	- Slug-based patterns
	- Individual configurations for priority, change frequency, and `lastmod`.

### 4. Excluded URLs
- Exclude specific URL paths from the sitemap (one path per line), e.g. to avoid duplicates or 404s.

### 5. Sitemap Index (optional)
- Use a sitemap index with multiple sitemaps: `sitemap.xml` becomes the index; each defined sitemap is available at `sitemap-{name}.xml`.
- Define multiple sitemaps and assign collection type configs and/or custom URLs to each.

---

## Installation

### Install via NPM
```bash
npm install strapi-5-sitemap-plugin
```

---

### Make the sitemap available
1. Go to **Settings**.
2. Open **Users & Permissions** → **Roles** and select **Public**.
3. Find **Strapi-5-sitemap-plugin** and enable:
   - **getSitemap** — required for the main sitemap at `/api/strapi-5-sitemap-plugin/sitemap.xml`.
   - **getSitemapBySlug** — required only if you use *Sitemap index with multiple sitemaps* (for individual sitemaps at `sitemap-{name}.xml`).
4. Save your changes.

---

## Configuration
The plugin offers a configuration UI in the Strapi Admin under **Settings** → **Sitemap**, where you can:

- Set the **Base URL** and save.
- **Settings**: Optionally enable *Use sitemap index with multiple sitemaps* and define named sitemaps (each can include selected collection type configs and/or custom URLs). Save after changes.
- Configure **Collection Types**: select types, patterns, language codes, priority, change frequency, and last modification.
- Add **Custom URLs** with slug, priority, frequency, and lastmod.
- **Excluded URLs**: List URL paths to exclude from the sitemap (one per line).

---

## Usage

### View the Sitemap
- **Single sitemap**: After configuration, the sitemap is available at:
  ```
  /api/strapi-5-sitemap-plugin/sitemap.xml
  ```
- **Sitemap index**: If you enabled *Use sitemap index with multiple sitemaps*, then:
  - `sitemap.xml` is the index listing all defined sitemaps.
  - Each sitemap is at: `/api/strapi-5-sitemap-plugin/sitemap-{name}.xml` (e.g. `sitemap-blog.xml`). Ensure **getSitemapBySlug** is enabled for Public if you need these URLs to be publicly accessible.

### Set your base URL
1. Go to **Settings** → **Sitemap**.
2. Set your **Base URL** and click **Save**.

### Adding Collection Types
1. In **Settings** → **Sitemap**, open the **Collection Types** section.
2. Add entries and configure type, pattern, language code, priority, frequency, and last modification.
3. Use **Save** where provided to persist changes.

### Adding Custom URLs
1. In **Settings** → **Sitemap**, open the **Custom URLs** section.
2. Add URLs with slugs and set priority, frequency, and last modification.
3. Use **Save** to persist changes.

### Excluded URLs
1. In **Settings** → **Sitemap**, scroll to **Excluded URLs**.
2. Enter one path per line (e.g. `/index`) and click **Save options**.

---

## Example Sitemap Output

**Single sitemap** (`sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/your-collection-type-slug</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
    <lastmod>2025-01-15T10:00:00Z</lastmod>
  </url>
  <url>
    <loc>https://example.com/your-custom-page</loc>
    <priority>0.5</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

**Sitemap index** (when “Use sitemap index with multiple sitemaps” is enabled, `sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/api/strapi-5-sitemap-plugin/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/api/strapi-5-sitemap-plugin/sitemap-pages.xml</loc>
  </sitemap>
</sitemapindex>
```

---
### Need a Custom Plugin or Feature?

Do you need a custom Strapi plugin or a specific feature for your project? 

DigitalMoonrise is specialized in Strapi plugin development and tailored solutions to fit your needs.

📧 Feel free to contact me via my website: [DigitalMoonrise, your digital agency for Websites, Online Shops and Configurator with Next.js and Strapi](https://digitalmoonrise.de)

---

## Contributions
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

## License
This plugin is licensed under the MIT License.

