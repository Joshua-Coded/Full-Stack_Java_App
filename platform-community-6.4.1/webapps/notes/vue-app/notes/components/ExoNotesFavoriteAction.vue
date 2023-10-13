<template>
  <favorite-button
    :key="note.id"
    :id="note.id"
    :favorite="isFavorite"
    :absolute="absolute"
    :top="top"
    :right="right"
    :space-id="spaceId"
    :template-params="templateParams"
    :small="false"
    type="notes"
    type-label="notes"
    @removed="removed"
    @remove-error="removeError"
    @added="added"
    @add-error="addError" />
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      default: null,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Number,
      default: () => 0,
    },
    right: {
      type: Number,
      default: () => 0,
    },
  },
  data: () => ({
    spaceId: eXo.env.portal.spaceId,
    templateParams: {},
  }),
  computed: {
    isFavorite() {
      return this.note.metadatas && this.note.metadatas.favorites && this.note.metadatas.favorites.length;
    },
  },
  watch: {
    note() {
      if (this.note) {
        this.templateParams.page_id = this.note.id;
      }
    }
  },
  methods: {
    removed() {
      this.displayAlert(this.$t('Favorite.tooltip.SuccessfullyDeletedFavorite'));
      this.$emit('removed');
    },
    removeError() {
      this.displayAlert(this.$t('Favorite.tooltip.ErrorDeletingFavorite', 'note'), 'error');
    },
    added() {
      this.displayAlert(this.$t('Favorite.tooltip.SuccessfullyAddedAsFavorite'));
      this.$emit('added');
    },
    addError() {
      this.displayAlert(this.$t('Favorite.tooltip.ErrorAddingAsFavorite', 'note'), 'error');
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