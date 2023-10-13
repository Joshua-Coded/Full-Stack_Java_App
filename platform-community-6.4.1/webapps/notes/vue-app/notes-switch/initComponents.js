import notesFeatureSwitch from './components/NotesFeatureSwitch.vue';
import notesOverView from '../notes/components/NotesOverview.vue';
import NoteTreeviewDrawer from '../notes/components/NoteTreeviewDrawer.vue';
import NotesActionsMenu from '../notes/components/NotesActionsMenu.vue';
import NoteBreadcrumb from '../notes/components/NoteBreadcrumb.vue';

const components = {
  'notes-feature-switch': notesFeatureSwitch,
  'notes-overview': notesOverView,
  'note-treeview-drawer': NoteTreeviewDrawer,
  'notes-actions-menu': NotesActionsMenu,
  'note-breadcrumb': NoteBreadcrumb
};

for (const key in components) {
  Vue.component(key, components[key]);
}