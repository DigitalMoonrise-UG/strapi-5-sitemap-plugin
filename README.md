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

---

## Installation

### Install via NPM

```bash
npm install strapi-5-sitemap-plugin
```

---

### Make the sitemap.xml file available

1. Go to **Settings**:
2. Select **Roles** unter **Users & Permissions**.
3. Select **Public**
4. Search for **Strapi-5-sitemap-plugin**
5. Select **getSitemap**
6. Save your changes.

---

## Configuration

The plugin offers a configuration UI accessible from the Strapi Admin panel, where you can:

- Select which **Collection Types** should be included in the sitemap.
- Define patterns and attributes for language-specific or global sitemaps.
- Add custom URLs with specific metadata.

---

## Usage

### View the Sitemap

Once installed and configured, your sitemap will be available at:

```
/api/strapi-5-sitemap-plugin/sitemap.xml
```

### Set your base URL

1. Go to **Settings**
2. Select **Configuration** under **Sitemap**
3. Set your **Base URL** and hit **Save**.

### Adding Collection Types

1. In the same **Settings** area, navigate to the **Collection Types** section.
2. Select the Collection Types you want to include.
3. Configure the pattern, language code, and other metadata as required.
4. Changes will be saved automatically

### Adding Custom URLs

1. In the same **Settings** area, navigate to the **Custom Links** section.
2. Add your URLs with slugs and configure the priority, frequency, and last modification date.
3. Changes will be saved automatically

---

## Example Sitemap Output

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
