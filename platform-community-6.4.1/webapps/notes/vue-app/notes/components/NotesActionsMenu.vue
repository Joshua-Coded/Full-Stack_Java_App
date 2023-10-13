<template>
  <v-menu
    v-model="displayActionMenu"
    :attach="'#note-actions-menu'"
    transition="slide-x-reverse-transition"
    content-class="note-actions-menu"
    offset-y
    left>
    <v-list>
      <v-list-item
        v-if="!homePage && note.canManage"
        class="px-2 text-left action-menu-item draftButton"
        @click="$root.$emit('delete-note')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-trash-can-outline
        </v-icon>
        <span>{{ $t('notes.menu.label.delete') }}</span>
      </v-list-item>
      <v-list-item
        v-if="note && note.canView"
        class="px-2 text-left action-menu-item draftButton"
        @click="copyLink">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-link-variant
        </v-icon>
        <span>{{ $t('notes.menu.label.copyLink') }}</span>
      </v-list-item>
      <v-list-item
        class="px-2 text-left action-menu-item draftButton"
        @click="$emit('open-history')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-history
        </v-icon>
        <span>{{ $t('notes.menu.label.noteHistory') }}</span>
      </v-list-item>
      <v-list-item
        v-if="!homePage && note.canManage"
        class="px-2 text-left action-menu-item draftButton"
        @click="$emit('open-treeview')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-cursor-move
        </v-icon>
        <span>{{ $t('notes.menu.label.movePage') }}</span>
      </v-list-item>
      <v-list-item
        v-if="note && note.canView"
        class="px-2 text-left noteExportPdf action-menu-item draftButton"
        @click="$emit('export-pdf')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-file-pdf-box
        </v-icon>
        <span>{{ $t('notes.menu.label.exportPdf') }}</span>
      </v-list-item>
      <v-list-item
        v-if="homePage"
        class="px-2 text-left action-menu-item draftButton"
        @click="$emit('open-treeview-export')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-export
        </v-icon>
        <span>{{ $t('notes.menu.label.export') }}</span>
      </v-list-item>
      <v-list-item
        v-if="homePage && note.canImport"
        class="px-2 text-left action-menu-item draftButton"
        @click="$emit('open-import-drawer')">
        <v-icon
          size="18"
          class="primary--text clickable pr-2">
          mdi-import
        </v-icon>
        <span>{{ $t('notes.menu.label.import') }}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      displayActionMenu: false,
    };
  },
  props: {
    note: {
      type: Object,
      default: () => null,
    },
    defaultPath: {
      type: String,
      default: () => 'Home',
    }
  },
  computed: {
    homePage(){
      return !this.note.parentPageId;
    }
  },
  created() {
    $(document).on('mousedown', () => {
      if (this.displayActionMenu) {
        window.setTimeout(() => {
          this.displayActionMenu = false;
        }, this.waitTimeUntilCloseMenu);
      }
    });
    this.$root.$on('display-action-menu', ( )=> {
      this.displayActionMenu = true;
    });
  },
  methods: {
    copyLink() {
      const inputTemp = $('<input>');
      const path = window.location.href;
      $('body').append(inputTemp);
      inputTemp.val(path).select();
      document.execCommand('copy');
      inputTemp.remove();
      this.$root.$emit('show-alert', {type: 'success',message: this.$t('notes.alert.success.label.linkCopied')});
    }
  },
};
</script>