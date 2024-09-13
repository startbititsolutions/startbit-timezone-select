import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import {TimezoneIcon} from './components/PluginIcons';
//import "./components/CustomField.css"; // Import CSS file

const name = pluginPkg.strapi.name;

export default {
  register(app) {    
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register([
      {
        name: "timeZone",
        pluginId: pluginId,
        type: "string", // Store the timezone value as a string
        intlLabel: {
          id: `${pluginId}.timeZone.name`,
          defaultMessage: "Timezone",
        },
        intlDescription: {
          id: `${pluginId}.timeZone.description`,
          defaultMessage: "Dynamic TimeZone listing",
        },
        icon: PluginIcon,
        components: {
          Input: async () =>
            import(/* webpackChunkName: "input-component" */ "./components/TimeZone"),
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
      }
    ]);
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
