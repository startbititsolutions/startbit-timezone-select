import { getTranslation } from "./utils/getTranslation";
import { PLUGIN_ID } from "./pluginId";
import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";

export default {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import("./pages/App");

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: "timeZone",
      pluginId: PLUGIN_ID,
      type: "string",

      intlLabel: {
        id: `${PLUGIN_ID}.timeZone.label`,
        defaultMessage: "Timezone",
      },

      intlDescription: {
        id: `${PLUGIN_ID}.timeZone.description`,
        defaultMessage: "Dynamic TimeZone listing",
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import("./components/TimeZone").then((module) => ({
            default: module.default,
          })),
      },

      options: {
        advanced: [
            {
              sectionTitle: {
                id: 'global.advanced',
                defaultMessage: 'Settings',
              },
              items: [
                {
                  intlLabel: { id: 'global.required', defaultMessage: 'Required' },
                  name: 'required',
                  type: 'checkbox',
                  description: {
                    id: 'global.required.description',
                    defaultMessage: 'Make this field required',
                  },
                },
              ],
            },
          ],
      },
    });
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            `./translations/${locale}.json`
          );

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};