import './initComponents.js';
import { newsConstants } from '../js/newsConstants.js';

Vue.use(Vuetify);
const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

// get overridden components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('NewsDetails');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

let newsDetails;
// getting locale resources
export function init(params) {
  // getting language of the PLF
  const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';
  // should expose the locale resources as REST API
  const urls = [
    `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.portlet.news.News-${lang}.json`,
    `${newsConstants.PORTAL}/${newsConstants.PORTAL_REST}/i18n/bundle/locale.attachmentsSelector.attachments-${lang}.json`
  ];

  const appId = 'newsDetailsApp';
  const cacheId = `${appId}_${params.activityId}`;

  const appElement = document.createElement('div');
  appElement.id = appId;

  exoi18n.loadLanguageAsync(lang, urls).then(i18n => {
    // init Vue app when locale resources are ready
    newsDetails = new Vue({
      data: function() {
        return {
          news: params.news,
          newsId: params.news.newsId,
          activityId: params.activityId,
          showEditButton: params.news.canEdit,
          showPublishButton: params.news.canPublish,
          showDeleteButton: params.news.canDelete,
        };
      },
      template: `<v-app id="${appId}" v-cacheable="{cacheId: '${cacheId}'}">
                  <exo-news-details
                    :news="news"
                    :news-id="newsId"
                    :activity-id="activityId"
                    :show-edit-button="showEditButton"
                    :show-publish-button="showPublishButton"
                    :show-delete-button="showDeleteButton"/>
                 </v-app>`,
      i18n,
      vuetify
    }).$mount(appElement);
  });
}

export function destroy() {
  if (newsDetails) {
    newsDetails.$destroy();
  }
}