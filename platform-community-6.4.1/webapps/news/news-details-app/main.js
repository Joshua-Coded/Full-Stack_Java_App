import './initComponents.js';
import { newsConstants } from '../js/newsConstants.js';

Vue.use(Vuetify);
const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

// get overridden components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('NewsDetailApp');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

let newsDetailsApp;
export function init() {
  // getting language of the PLF
  const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';
  // should expose the locale resources as REST API
  const urls = [
    `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.portlet.news.News-${lang}.json`,
    `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.attachmentsSelector.attachments-${lang}.json`
  ];

  const appId = 'newsDetailApp';
  const appElement = document.createElement('div');
  appElement.id = appId;
  // getting locale resources
  exoi18n.loadLanguageAsync(lang, urls).then(i18n => {
    // init Vue app when locale resources are ready
    newsDetailsApp = new Vue({
      el: '#NewsDetailApp',
      data: function() {
        return {
          newsId: getURLQueryParam('newsId'),
        };
      },
      template: `<v-app id="${appId}">
                   <exo-news-details-app :news-id="newsId"></exo-news-details-app>
                 </v-app>`,
      i18n,
      vuetify
    }).$mount(appElement);
  });
}
export function destroy() {
  if (newsDetailsApp) {
    newsDetailsApp.$destroy();
  }
}
function getURLQueryParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(paramName)) {
    return urlParams.get(paramName);
  }
}