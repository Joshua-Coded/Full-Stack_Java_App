<template>
  <div class="note-breadcrumb-wrapper">
    <div v-if="noteBreadcrumb && noteBreadcrumb.length <= 4" class="notes-tree-items d-flex">
      <div
        v-for="(note, index) in noteBreadcrumb"
        :key="index"
        :class="noteBreadcrumb && noteBreadcrumb.length === 1 && 'single-path-element' || ''"
        class="notes-tree-item d-flex text-truncate"
        :style="`max-width: ${100 / (noteBreadcrumb.length)}%`">
        <v-tooltip max-width="300" bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              height="20px"
              min-width="45px"
              class="pa-0"
              :class="noteBreadcrumb[noteBreadcrumb.length-1].id === actualNoteId && 'clickable' || ''"
              text
              v-bind="attrs"
              v-on="on"
              @click="openNote(note)">
              <a
                class="caption text-truncate breadCrumb-link"
                :class="index < noteBreadcrumb.length-1 && 'path-clickable text-color' || 'text-sub-title not-clickable'">{{ note.title }}</a>
            </v-btn>
          </template>
          <span class="caption">{{ note.title }}</span>
        </v-tooltip>
        <v-icon v-if="index < noteBreadcrumb.length-1" size="18">mdi-chevron-right</v-icon>
      </div>
    </div>
    <div v-else class="notes-tree-items notes-long-path d-flex align-center">
      <div class="notes-tree-item long-path-first-item d-flex text-truncate">
        <v-tooltip max-width="300" bottom>
          <template #activator="{ on, attrs }">
            <a
              class="caption text-color text-truncate path-clickable breadCrumb-link"
              :class="noteBreadcrumb[noteBreadcrumb.length-1].id === actualNoteId && 'clickable' || ''"
              v-bind="attrs"
              v-on="on"
              @click="openNote(noteBreadcrumb[0])">{{ noteBreadcrumb && noteBreadcrumb.length && noteBreadcrumb[0].title }}</a>
          </template>
          <span class="caption">{{ noteBreadcrumb && noteBreadcrumb.length && noteBreadcrumb[0].title }}</span>
        </v-tooltip>
        <v-icon size="18">mdi-chevron-right</v-icon>
      </div>
      <div class="notes-tree-item long-path-second-item d-flex">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              size="24">
              mdi-dots-horizontal
            </v-icon>
          </template>
          <p
            v-for="(note, index) in noteBreadcrumb"
            :key="index"
            class="mb-0">
            <span v-if="index > 0 && index < noteBreadcrumb.length-2" class="caption"><v-icon size="18" class="tooltip-chevron">mdi-chevron-right</v-icon> {{ note.title }}</span>
          </p>
        </v-tooltip>
        <v-icon class="clickable" size="18">mdi-chevron-right</v-icon>
      </div>
      <div class="notes-tree-item long-path-third-item d-flex text-truncate">
        <v-tooltip max-width="300" bottom>
          <template #activator="{ on, attrs }">
            <a
              class="caption text-color text-truncate path-clickable breadCrumb-link"
              :class="noteBreadcrumb[noteBreadcrumb.length-1].id === actualNoteId && 'clickable' || ''"
              v-bind="attrs"
              v-on="on"
              @click="openNote(noteBreadcrumb[noteBreadcrumb.length-2])">{{ noteBreadcrumb[noteBreadcrumb.length-2].title }}</a>
          </template>
          <span class="caption">{{ noteBreadcrumb[noteBreadcrumb.length-2].title }}</span>
        </v-tooltip>
        <v-icon size="18">mdi-chevron-right</v-icon>
      </div>
      <div class="notes-tree-item d-flex text-truncate">
        <v-tooltip max-width="300" bottom>
          <template #activator="{ on, attrs }">
            <a
              class="caption text-color text-truncate text-sub-title breadCrumb-link"
              :class="noteBreadcrumb[noteBreadcrumb.length-1].id === actualNoteId && 'clickable' || ''"
              v-bind="attrs"
              v-on="on"
              @click="openNote(noteBreadcrumb[noteBreadcrumb.length-1])">{{ noteBreadcrumb[noteBreadcrumb.length-1].title }}</a>
          </template>
          <span class="caption">{{ noteBreadcrumb[noteBreadcrumb.length-1].title }}</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    noteBreadcrumb: {
      type: Array,
      default: () => null
    },
    actualNoteId: {
      type: String,
      default: ''
    },
  },
  methods: {
    openNote(note) {
      if (note.noteId !== this.actualNoteId ) {
        this.$emit('open-note',note.id);
      }
    }
  }
};
</script>