<template>
  <div class="attachment d-flex clickable">
    <v-list-item-avatar
      class="border-radius me-3">
      <div v-if="attachment.uploadProgress < 100" class="fileProgress">
        <v-progress-circular
          :rotate="-90"
          :size="40"
          :width="4"
          :value="attachment.uploadProgress"
          color="primary">
          {{ attachment.uploadProgress }}
        </v-progress-circular>
      </div>
      <div
        v-else
        class="fileType">
        <i class="uiIconFileTypeapplicationzip uiIconFileTypeDefault"></i>
      </div>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="uploadedFileTitle" :title="attachmentTitle">
        {{ attachmentTitle }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action class="d-flex flex-row align-center">
      <div
        :title="$t('notes.attachments.delete')"
        class="remove-button">
        <v-btn
          class="d-flex"
          outlined
          x-small
          height="24"
          width="24"
          @click="removeAttachedFile(attachment)">
          <v-icon
            small
            class="fas fa-trash fa-xs colorIcon error--text" />
        </v-btn>
      </div>
    </v-list-item-action>
  </div>
</template>
<script>
export default {
  props: {
    attachment: {
      type: Object,
      default: () => null
    },
  },
  computed: {
    attachmentInProgress() {
      return this.attachment.uploadProgress < 100;
    },
    attachmentTitle() {
      return this.attachment && this.attachment.name && unescape(this.attachment.name);
    },
  },
  methods: {
    removeAttachedFile: function() {
      this.$root.$emit('delete-uploaded-file', this.attachment);
    },

  }
};
</script>