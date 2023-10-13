import './initComponents.js';
import {initExtensions} from './extensions.js';
import * as  newsServices from '../services/newsServices';

if (!Vue.prototype.$newsServices) {
  window.Object.defineProperty(Vue.prototype, '$newsServices', {
    value: newsServices,
  });
}

export function init() {
  initExtensions();
}