import './initComponents.js';
import * as notesService from '../../javascript/eXo/wiki/notesService.js';

// get overrided components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('notes');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}

const objects = Object.keys(localStorage);
for (const index in objects) {
  if (objects[index].startsWith('draftNoteId-')) {
    const draftNote = JSON.parse(localStorage[objects[index]]);
    notesService.saveDraftNote(draftNote).then(() => localStorage.removeItem(objects[index]));
  }
}

Vue.use(Vuetify);
const vuetify = new Vuetify(eXo.env.portal.vuetifyPreset);
const appId = 'notesOverviewApplication';

//getting language of the PLF
const lang = eXo && eXo.env.portal.language || 'en';

//should expose the locale ressources as REST API
const url = `${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.notes.notesPortlet-${lang}.json`;

if (!Vue.prototype.$notesService) {
  window.Object.defineProperty(Vue.prototype, '$notesService', {
    value: notesService,
  });
}

export function init() {
  exoi18n.loadLanguageAsync(lang, url).then(i18n => {
    const appElement = document.createElement('div');
    appElement.id = appId;
    // init Vue app when locale ressources are ready
    Vue.createApp({
      template: `<notes-overview v-cacheable id="${appId}" />`,
      vuetify,
      i18n
    }, appElement, 'Notes Overview');
  });
}