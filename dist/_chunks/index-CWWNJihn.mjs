import { useRef, useEffect } from "react";
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
  const ref = useRef(setPlugin);
  useEffect(() => {
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
          Component: () => import("./Settings-DINXwZpN.mjs"),
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
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-C1nqXShX.mjs"), "./translations/en.json": () => import("./en-BhE2soD2.mjs"), "./translations/es.json": () => import("./es-DrRyegdz.mjs"), "./translations/tr.json": () => import("./tr-CkohvQ5p.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  PLUGIN_ID as P,
  getTrad as g,
  index as i
};
