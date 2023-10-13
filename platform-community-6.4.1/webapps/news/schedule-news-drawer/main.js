import './initComponents.js';
import {newsConstants} from '../js/newsConstants';

// getting language of the PLF
const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';

Vue.use(Vuetify);
const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

// should expose the locale ressources as REST API
const urls = [
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.portlet.news.News-${lang}.json`,
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.social.Webui-${lang}.json`
];
// get overrided components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('ScheduleNewsDrawer');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}
let scheduleNewsDrawer;
export function init(params) {
  const appId = `scheduleNewsDrawer-${params.newsId}`;

  const appElement = document.createElement('div');
  appElement.id = appId;

  exoi18n.loadLanguageAsync(lang, urls).then(i18n => {
    // init Vue app when locale ressources are ready
    scheduleNewsDrawer = new Vue({
      template: `<schedule-news-drawer
                  v-cacheable="{cacheId: '${appId}'}"
                  id="${appId}"/>`,
      i18n,
      vuetify,
    }).$mount(appElement);
  });
}

export function destroy() {
  if (scheduleNewsDrawer) {
    scheduleNewsDrawer.$destroy();
  }
}