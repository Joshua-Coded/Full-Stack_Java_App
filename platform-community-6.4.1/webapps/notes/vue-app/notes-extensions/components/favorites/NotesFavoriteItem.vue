<template>
  <v-list-item class="clickable" :href="noteUrl">
    <v-list-item-icon class="me-3 my-auto">
      <v-img
        :src="noteImg"
        max-height="28"
        max-width="25" />
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title class="text-color body-2 text-truncate">{{ noteTitle }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <favorite-button
        :id="id"
        :favorite="isFavorite"
        :top="top"
        :right="right"
        type="notes"
        type-label="notes"
        @removed="removed"
        @remove-error="removeError" />
    </v-list-item-action>
  </v-list-item>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: () => null,
    },
  },
  data: () => ({ 
    isFavorite: true,
    note: {},
    noteImg: '/notes/images/notes-appicon.png',
  }),
  computed: {
    noteTitle() {
      return this.note?.title || '';
    },
    noteUrl() {
      return this.note?.url || '#';
    }
  },
  created() {
    this.$notesService.getNoteById(this.id).then(note => {
      this.note = note;
    });
  },
  methods: {
    removed() {
      this.isFavorite = !this.isFavorite;
      this.displayAlert(this.$t('Favorite.tooltip.SuccessfullyDeletedFavorite'));
      this.$emit('removed');
      this.$root.$emit('refresh-favorite-list');
    },
    removeError() {
      this.displayAlert(this.$t('Favorite.tooltip.ErrorDeletingFavorite', 'note'), 'error');
    },
    displayAlert(message, type) {
      document.dispatchEvent(new CustomEvent('notification-alert', {detail: {
        message,
        type: type || 'success',
      }}));
    },
  },
};
</script>
