import NotesFavoriteItem from './components/favorites/NotesFavoriteItem.vue';
const components = {
  'notes-favorite-item': NotesFavoriteItem,
};

for (const key in components) {
  Vue.component(key, components[key]);
}