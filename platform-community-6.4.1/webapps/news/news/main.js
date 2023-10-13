import './initComponents.js';

import {newsConstants} from '../js/newsConstants';

Vue.use(Vuetify);

const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

// get overridden components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('News');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

// getting language of the PLF
const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';
// should expose the locale resources as REST API
const urls = [
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.portlet.news.News-${lang}.json`,
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.social.Webui-${lang}.json`
];

document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
const appId = 'NewsApp';

export function init() {
  exoi18n.loadLanguageAsync(lang, urls).then(i18n => {
    new Vue({
      template: `<news-app id="${appId}"/>`,
      i18n,
      vuetify,
    }).$mount(`#${appId}`);
  });
}