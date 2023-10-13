<template>
  <div>
    <v-overlay
      z-index="1031"
      :value="drawer"
      @click.native="drawer = false" />
    <exo-drawer
      ref="customPluginsDrawer"
      v-model="drawer"
      show-overlay
      class="customPluginsDrawer"
      right>
      <template slot="title">
        {{ $t('notes.label.customPlugins') }}
      </template>
      <template slot="content">
        <div slot="content" class="content">
          <v-row class="mandatory pluginsContainer d-flex flex-wrap width-full ml-0">
            <v-col v-model="plugins" class="pluginsList d-flex flex-wrap width-full ">
              <div
                v-for="(plugin, index) in plugins"
                :id="'plugin-' + index"
                :key="index"
                class="pluginsItemContainer">
                <div
                  :id="'pluginItem-' + index"
                  class="pluginItem pa-4">
                  <a
                    :id="plugin.id"
                    :target="plugin.title"
                    @click="openPlugin(plugin.id)">
                    <img
                      v-if="plugin.src && plugin.src.length"
                      class="pluginImage bloc"
                      :src="plugin.src">
                    <img
                      v-else
                      class="pluginImage block"
                      :src="defaultImagePlugin">
                    <span
                      v-exo-tooltip.bottom.body="plugin.tooltip"
                      class="pluginTitle text-truncate">
                      {{ $t(`notes.label.${plugin.title}`) }}
                    </span>
                  </a>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
    </exo-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    defaultImagePlugin: '/notes/images/defaultPlugin.png',
    drawer: false,
    noteChildren: [],
    treeviewInserted: false
  }),
  computed: {
    plugins() {
      const pluginsList = [
        { id: 'video',title: 'Video', src: '/notes/images/video.png', tooltip: this.$t('notes.label.insertVideo') },
        { id: 'table',title: 'Table', src: '/notes/images/table.png', tooltip: this.$t('notes.label.insertTable') },
        { id: 'note',title: 'Note', src: '/notes/images/notes.png', tooltip: this.$t('notes.label.insertNote')  },
        { id: 'Navigation',title: 'Navigation', src: '/notes/images/children.png', tooltip: this.$t('notes.label.Navigation') }
      ];
      if (eXo.ecm){
        pluginsList.unshift({ id: 'selectImage',title: 'Image', src: '/notes/images/photo.png', tooltip: this.$t('notes.label.insertImage')  });
      }
      if (this.hideNavigation || !this.noteChildren.length) {
        return pluginsList.filter( plugin => plugin.id !== 'Navigation' );
      } else {
        return pluginsList;
      }
    },
  },
  props: {
    instance: {
      type: Object,
      default: () => null,
    }
  },
  created() {
    const queryPath = window.location.search;
    const urlParams = new URLSearchParams(queryPath);
    if (urlParams.has('noteId')) {
      this.noteId = urlParams.get('noteId');
      this.hideNavigation = false;
      this.retrieveNoteChildren(this.noteId);
    }
  },
  methods: {
    open() {
      this.$refs.customPluginsDrawer.open();
      this.$root.$emit('initCkeditor');
    },
    close() {
      this.$refs.customPluginsDrawer.close();
    },
    retrieveNoteChildren(noteId) {
      this.$notesService.getNoteById(noteId, '','','',true).then(data => {
        this.noteChildren = data && data.children || [];
      });
    },
    openPlugin(id){
      if (id==='table'){
        this.$root.$emit('note-table-plugins');
      } else if ( id === 'note') {
        this.$root.$emit('display-treeview-items', 'published');

      } else if ( id === 'Navigation') {
        this.instance.execCommand('ToC');
        this.treeviewInserted = true;
        this.close();
      }
      else {
        this.instance.execCommand(id);
        this.close();
      }
    }
  }
};
</script>