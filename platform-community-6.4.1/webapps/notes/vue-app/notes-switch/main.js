import './initComponents.js';
import * as notesService from '../../javascript/eXo/wiki/notesService.js';

// get overrided components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('NotesApp');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

//getting language of the PLF
const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';

Vue.use(Vuetify);
const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);

const appId = 'NotesApp';

//should expose the locale ressources as REST API 
const url = [`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.wiki.WikiPortlet_${lang}.json`,`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.notes.notesPortlet-${lang}.json`];

if (!Vue.prototype.$notesService) {
  window.Object.defineProperty(Vue.prototype, '$notesService', {
    value: notesService,
  });
}

export function init() {
  exoi18n.loadLanguageAsync(lang, url).then(i18n => {
    new Vue({
      template: `<notes-feature-switch id="${appId}" />`,
      vuetify,
      i18n,
    }).$mount(`#${appId}`);
  });
}