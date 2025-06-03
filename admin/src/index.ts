import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';

export default {
	register(app: any) {
		app.createSettingSection(
			{
				id: PLUGIN_ID,
				intlLabel: {
					id: `${PLUGIN_ID}.plugin.name`,
					defaultMessage: 'Sitemap',
				},
			},
			[
				{
					intlLabel: {
						id: 'Configuration',
						defaultMessage: 'Configuration',
					},
					id: 'sitemap-settings',
					to: `/settings/${PLUGIN_ID}`,
					Component: async () => {
						return import('./pages/Settings');
					},
					permissions: [{ action: `plugin::${PLUGIN_ID}.settings.read`, subject: null }],
				},
			]
		);

		app.registerPlugin({
			id: PLUGIN_ID,
			initializer: Initializer,
			isReady: false,
			name: PLUGIN_ID,
		});
	},

	async registerTrads({ locales }: { locales: string[] }) {
		return Promise.all(
			locales.map(async (locale) => {
				try {
					const { default: data } = await import(`./translations/${locale}.json`);

					return { data, locale };
				} catch {
					return { data: {}, locale };
				}
			})
		);
	},
};
