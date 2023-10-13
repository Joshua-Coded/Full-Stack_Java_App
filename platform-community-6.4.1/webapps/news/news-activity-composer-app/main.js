import './initComponents.js';
import { newsConstants } from '../js/newsConstants.js';

Vue.use(Vuetify);

const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

// getting language of the PLF
const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';

// should expose the locale resources as REST API
const urls = [
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.portlet.news.News-${lang}.json`,
  `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.attachmentsSelector.attachments-${lang}.json`
];

// get overrided components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('NewsActivityComposer');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

let newsActivityComposerApp;
export function init(maxToUpload, maxFileSize) {
  // getting locale resources
  exoi18n.loadLanguageAsync(lang, urls).then(i18n => {
    // init Vue app when locale resources are ready
    newsActivityComposerApp = new Vue({
      el: '#NewsComposerApp',
      data: function() {
        return {
          newsId: getURLQueryParam('newsId'),
          spaceId: getURLQueryParam('spaceId'),
          activityId: getURLQueryParam('activityId'),
          maxToUpload: maxToUpload,
          maxFileSize: maxFileSize
        };
      },
      template: '<exo-news-activity-composer :news-id="newsId" :space-id="spaceId" :activity-id="activityId" :max-to-upload="maxToUpload" :max-file-size="maxFileSize"></exo-news-activity-composer>',
      i18n,
      vuetify
    });
  });
}

export function destroy() {
  if (newsActivityComposerApp) {
    newsActivityComposerApp.$destroy();
  }
}

function getURLQueryParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(paramName)) {
    return urlParams.get(paramName);
  }
}