import ExoNewsActivityComposer  from './components/ExoNewsActivityComposer.vue';
import ExoNewsFileDrop from './components/ExoNewsFileDrop.vue';
import ExoNewsDraftVisibilityMobile from './components/ExoNewsDraftVisibilityMobile.vue';
import * as  newsServices from '../services/newsServices.js';

const components = {
  'exo-news-activity-composer': ExoNewsActivityComposer,
  'exo-news-file-drop': ExoNewsFileDrop,
  'exo-news-draft-visibility-mobile': ExoNewsDraftVisibilityMobile,
};

for (const key in components) {
  Vue.component(key, components[key]);
}

if (!Vue.prototype.$newsServices) {
  window.Object.defineProperty(Vue.prototype, '$newsServices', {
    value: newsServices,
  });
}
