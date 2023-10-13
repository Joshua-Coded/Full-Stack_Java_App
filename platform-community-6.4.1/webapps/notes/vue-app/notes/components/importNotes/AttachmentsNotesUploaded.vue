<template>
  <div class="uploadedFiles">
    <div class="uploadedFiles ma-2">
      <div class="attachments-list d-flex align-center">
        <v-subheader class="text-sub-title pl-0 d-flex">
          {{ $t('notes.attachments.title') }}
        </v-subheader>
        <v-divider />
      </div>
      <div v-if="attachments.length === 0" class="no-files-attached d-flex flex-column align-center text-sub-title">
        <div class="d-flex pl-6 not-files-icon">
          <i class="uiIconAttach uiIcon64x64"></i>
          <i class="uiIconCloseCircled uiIcon32x32"></i>
        </div>
        <span>{{ $t('notes.no.attachments') }}</span>
      </div>
      <div class="uploadedFilesItems d-flex flex-row align-center">
        <div
          v-for="attachedFile in attachments"
          :key="attachedFile.name"
          class="uploadedFilesItem">
          <div class="showDestination">
            <div class="showFile">
              <attachments-notes-item :attachment="attachedFile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attachments: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    removeAttachedFile: function() {
      this.$root.$emit('delete-uploaded-file', this.attachments);
    },
  },
};
</script>