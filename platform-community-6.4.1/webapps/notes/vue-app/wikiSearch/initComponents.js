import WikiSearchCard from './components/WikiSearchCard.vue';
import ExoNotesFavoriteAction from '../notes/components/ExoNotesFavoriteAction.vue';

const components = {
  'wiki-search-card': WikiSearchCard,
  'exo-notes-favorite-action': ExoNotesFavoriteAction,
};

for (const key in components) {
  Vue.component(key, components[key]);
}

// get override components if exists
if (extensionRegistry) {
  const components = extensionRegistry.loadComponents('WikiSearchCard');
  if (components && components.length > 0) {
    components.forEach(cmp => {
      Vue.component(cmp.componentName, cmp.componentOptions);
    });
  }
}
