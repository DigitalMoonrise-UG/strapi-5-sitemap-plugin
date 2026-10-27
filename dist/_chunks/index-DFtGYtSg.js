"use strict";
const react = require("react");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "strapi-5-sitemap-plugin";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const getTrad = (id) => `${PLUGIN_ID}.${id}`;
const index = {
  register(app) {
    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: getTrad("plugin.name"),
          defaultMessage: "Sitemap"
        }
      },
      [
        {
          intlLabel: {
            id: getTrad("settings.configuration"),
            defaultMessage: "Configuration"
          },
          id: "sitemap-settings",
          to: PLUGIN_ID,
          Component: () => Promise.resolve().then(() => require("./Settings-B6TRX71n.js")),
          permissions: [{ action: `plugin::${PLUGIN_ID}.settings.read`, subject: null }]
        }
      ]
    );
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-B8JjvNaP.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-BKGrpFv2.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-C0blQ096.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-BiYYOqqU.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.getTrad = getTrad;
exports.index = index;
