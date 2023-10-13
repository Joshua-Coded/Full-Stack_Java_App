import * as  newsServices from '../services/newsServices';
import ExoNewsDetailsApp from './components/ExoNewsDetailsApp.vue';
const components = {
  'exo-news-details-app': ExoNewsDetailsApp,
};

for (const key in components) {
  Vue.component(key, components[key]);
}

if (!Vue.prototype.$newsServices) {
  window.Object.defineProperty(Vue.prototype, '$newsServices', {
    value: newsServices,
  });
} 