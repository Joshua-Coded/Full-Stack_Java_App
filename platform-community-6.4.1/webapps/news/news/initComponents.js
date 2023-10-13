import NewsApp  from './components/NewsApp.vue';
import NewsSpacesSharedIn from './components/NewsSpacesSharedIn.vue';
import NewsActivitySharingSpacesDrawer from './components/NewsActivitySharingSpacesDrawer.vue';
import NewsFilterSpaceDrawer from './components/NewsFilterSpaceDrawer.vue';
import NewsFilterSpaceItem from './components/NewsFilterSpaceItem.vue';
import NewsFilterSpaceList from './components/NewsFilterSpaceList.vue';
import NewsFilterSpaceSearch from './components/NewsFilterSpaceSearch.vue';
import ExoNewsDetailsActionMenuApp from './components/ExoNewsDetailsActionMenuApp.vue';
import NewsAppItem from './components/NewsAppItem.vue';

const components = {
  'news-app': NewsApp,
  'news-spaces-shared-in': NewsSpacesSharedIn,
  'news-activity-sharing-spaces-drawer': NewsActivitySharingSpacesDrawer,
  'news-filter-space-drawer': NewsFilterSpaceDrawer,
  'news-filter-space-item': NewsFilterSpaceItem,
  'news-filter-space-list': NewsFilterSpaceList,
  'news-filter-space-search': NewsFilterSpaceSearch,
  'exo-news-details-action-menu-app': ExoNewsDetailsActionMenuApp,
  'news-app-item': NewsAppItem,
};

for (const key in components) {
  Vue.component(key, components[key]);
}

import * as  newsServices from '../services/newsServices';

if (!Vue.prototype.$newsServices) {
  window.Object.defineProperty(Vue.prototype, '$newsServices', {
    value: newsServices,
  });
}