import ExoLatestNews from './components/ExoLatestNews.vue';

const components = {
  'exo-news-latest': ExoLatestNews,
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