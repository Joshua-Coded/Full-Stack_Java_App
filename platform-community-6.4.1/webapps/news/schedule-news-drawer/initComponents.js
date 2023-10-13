import ScheduleNewsDrawer from './components/ExoScheduleNewsDrawer.vue';

const components = {
  'schedule-news-drawer': ScheduleNewsDrawer,
};
for (const key in components) {
  Vue.component(key, components[key]);
}
import * as  newsServices from '../services/newsServices';
import * as newsUtils from '../js/newsUtils';

if (!Vue.prototype.$newsServices) {
  window.Object.defineProperty(Vue.prototype, '$newsServices', {
    value: newsServices,
  });
}
if (!Vue.prototype.$newsUtils) {
  window.Object.defineProperty(Vue.prototype, '$newsUtils', {
    value: newsUtils,
  });
}