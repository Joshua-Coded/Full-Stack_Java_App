import ExoNewsNotificationAlert from './ExoNewsNotificationAlert.vue';
import ExoNewsNotificationAlerts from './ExoNewsNotificationAlerts.vue';

const components = {
  'exo-news-notification-alert': ExoNewsNotificationAlert,
  'exo-news-notification-alerts': ExoNewsNotificationAlerts,
};

for (const key in components) {
  Vue.component(key, components[key]);
}
