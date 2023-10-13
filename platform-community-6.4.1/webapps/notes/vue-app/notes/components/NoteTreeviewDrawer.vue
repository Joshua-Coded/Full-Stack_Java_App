<template>
  <div>
    <v-overlay
      z-index="1031"
      :value="drawer"
      @click.native="drawer = false" />

    <exo-drawer
      ref="breadcrumbDrawer"
      class="breadcrumbDrawer"
      :confirm-close="exporting"
      :confirm-close-labels="confirmCloseLabels"
      v-model="drawer"
      show-overlay
      @closed="closeAllDrawer()"
      right>
      <template v-if="isIncludePage && displayArrow" slot="title">
        <div class="d-flex">
          <v-icon size="19" @click="backToPlugins(); close()">mdi-arrow-left</v-icon>
          <span class="ps-2">{{ $t('notes.label.includePageTitle') }}</span>
        </div>
      </template>
      <template v-else-if="movePage" slot="title">
        {{ $t('notes.label.movePageTitle') }}
      </template>
      <template v-else-if="exportNotes" slot="title">
        {{ $t('notes.label.exportNotesTitle') }}
      </template>
      <template v-else slot="title">
        {{ $t('notes.label.breadcrumbTitle') }}
      </template>
      <template v-if="exporting" slot="content">
        <v-card flat class="pa-2 mt-10">            
          <v-list>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.started">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.started"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.started') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.notesGetted">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.notesGetted"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-if="exportStatus.exportedNotesCount>0"> {{ $t('notes.export.status.label.preparingNotes') }} ({{ exportStatus.exportedNotesCount }} notes)</v-list-item-title>
                  <v-list-item-title v-else> {{ $t('notes.export.status.label.preparingNotes') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.notesPrepared">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.notesPrepared"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.updatingNoteParents') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.jsonCreated">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.jsonCreated"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.creatingJson') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.imageUrlsUpdated">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.imageUrlsUpdated"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.updatingImages') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.zipCreated">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.zipCreated"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.creatingZip') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.tempCleaned">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.tempCleaned"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.cleaningTemps') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
            <v-list-item>
              <template>
                <v-list-item-action class="mr-3">
                  <v-icon
                    color="success"
                    size="18"
                    v-if="exportStatus.action.dataCreated">
                    fa-check
                  </v-icon>
                  <v-progress-circular
                    v-if="!exportStatus.action.dataCreated"
                    color="primary"
                    indeterminate
                    size="18" />
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('notes.export.status.label.done') }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </template>
      <template slot="content" v-if="!exporting">
        <v-layout v-if="movePage" column>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-color">{{ note.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <div class="d-flex align-center">
              <div class="pr-4"><span class="font-weight-bold text-color">{{ $t('notes.label.movePageSpace') }}</span></div>
              <div class="identitySuggester no-border mt-0">
                <v-chip
                  class="identitySuggesterItem me-2 mt-2">
                  <span class="text-truncate">
                    {{ spaceDisplayName }}
                  </span>
                </v-chip>
              </div>
            </div>
          </v-list-item>
          <v-list-item>
            <div class="py-2 width-full">
              <span class="font-weight-bold text-color  pb-2">{{ $t('notes.label.movePageCurrentPosition') }}</span>
              <note-breadcrumb :note-breadcrumb="note ? note.breadcrumb : []" />
            </div>
          </v-list-item>
          <v-list-item>
            <div class="py-2  width-full">
              <span class="font-weight-bold text-color pb-2">{{ $t('notes.label.movePageDestination') }}</span>
              <note-breadcrumb :note-breadcrumb="currentBreadcrumb" />
            </div>
          </v-list-item>
          <v-list-item class="position-title">
            <div class="py-2">
              <span class="font-weight-bold text-color">{{ $t('notes.label.movePagePosition') }}</span>
            </div>
          </v-list-item>
        </v-layout>
        <v-col column>
          <v-row v-if="!exportNotes && !movePage">
            <v-col class="my-auto">
              <v-text-field
                v-model="search"
                class="search"
                :placeholder=" $t('notes.label.filter') "
                clearable
                font-size="18"
                prepend-inner-icon="fa-filter" />
            </v-col>
            <v-col class="filter" cols="4">
              <div class="btn-group">
                <button class="btn dropdown-toggle" data-toggle="dropdown">
                  {{ filter }}
                  <i class="uiIconMiniArrowDown uiIconLightGray"></i><span></span>
                </button>
                <ul class="dropdown-menu">
                  <li><a href="#" @click="filter = filterOptions[0]"> {{ filterOptions[0] }} </a></li>
                  <li><a href="#" @click="filter = filterOptions[1]"> {{ filterOptions[1] }} </a></li>
                </ul>
              </div>
            </v-col>
          </v-row>
          <template v-if="home && !exportNotes && resultSearch && !search">
            <v-list-item @click.prevent="openNote(event,home)" class="ma-0 border-box-sizing">
              <v-list-item-content>
                <v-list-item-title class="body-2 treeview-home-link">
                  <span v-if="filter === $t('notes.filter.label.drafts')" :style="{color: 'rgba(0, 0, 0, 0.38)!important', cursor: 'default'}">{{ home.name }}</span>
                  <a v-else :href="home.noteId">{{ home.name }}</a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-if="items && items.length && exportNotes">
            <v-checkbox
              v-model="checkbox"
              :label="selectExportLabel"
              class="checkbox mt-0 pl-3" />
            <v-treeview
              v-if="reload"
              v-model="selectionNotes"
              ref="treeSearch"
              :items="allItemsHome"
              :open.sync="openLevel"
              class="treeview-item"
              item-key="noteId"
              hoverable
              selectable
              activatable
              open-on-click
              :selection-type="selectionType"
              transition />
          </template>
          <template v-if="items && items.length && !exportNotes">
            <v-treeview
              v-if="reload"
              :items="items"
              :open="openedItems"
              :active="active"
              :search="search"
              class="treeview-item"
              item-key="noteId"
              hoverable
              activatable
              open-on-click
              transition>
              <template #label="{ item }">
                <v-list-item-title class="body-2">
                  <div 
                    v-if="filter === $t('notes.filter.label.drafts') && !item.draftPage"
                    :style="{cursor: 'default'}">
                    {{ item.name }}
                  </div>
                  <a 
                    v-else 
                    :href="item.draftPage ? `${item.noteId}/draft` : item.noteId" 
                    :style="{color: filter === $t('notes.filter.label.drafts') && item.draftPage || !item.draftPage ? 'var(--allPagesBaseTextColor, #333333)' : ''}"
                    @click.prevent="openNote(event,item)">
                    {{ item.name }}
                  </a>
                </v-list-item-title>
              </template>
            </v-treeview>
          </template>
          <template v-if="!resultSearch">
            <div class="note-not-found-wrapper text-center mt-6">
              <v-img
                :src="noteNotFountImage"
                class="mx-auto"
                max-height="85"
                max-width="90"
                contain
                eager />
              <p class="mt-3 text-light-color">{{ $t('notes.label.noteSearchNotFound') + search }}</p>
            </div>
          </template>
        </v-col>
      </template>
      <template v-if="movePage" slot="footer">
        <div class="d-flex">
          <v-spacer />
          <v-btn
            @click="close"
            class="btn ml-2">
            {{ $t('notes.button.cancel') }}
          </v-btn>
          <v-btn
            @click="moveNote()"
            class="btn btn-primary ml-2">
            {{ $t('notes.button.ok') }}
          </v-btn>
        </div>
      </template>
      <template v-if="exportNotes" slot="footer">
        <div class="d-flex">
          <v-spacer />
          <v-btn
            @click="close"
            class="btn ml-2">
            {{ $t('notes.button.cancel') }}
          </v-btn>
          <v-btn
            :disabled="exporting"
            @click="exportNotesToZip()"
            class="btn btn-primary ml-2">
            {{ $t('notes.button.export') }}
          </v-btn>
        </div>
      </template>
    </exo-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    note: {},
    items: [],
    allItems: [],
    allItemsHome: [],
    home: {},
    noteBookType: '',
    noteBookOwnerTree: '',
    openNotes: [],
    activeItem: [],
    isIncludePage: false,
    movePage: false,
    exportNotes: false,
    selectionNotes: [],
    spaceDisplayName: eXo.env.portal.spaceDisplayName,
    breadcrumb: [],
    destinationNote: {},
    displayArrow: true,
    render: true,
    closeAll: true,
    drawer: false,
    filter: '',
    filterOptions: [],
    checkbox: false,
    showTree: true,
    search: '',
    noteNotFountImage: '/notes/skin/images/notes_not_found.png',
    exportStatus: {status: '', action: {}}, 
    exporting: false, 
    started: false,
    notesGetted: false,
    parentUpdated: false,
    jsonCreated: false,
    imageUrlsUpdated: false,
    zipCreated: false,
    tempCleaned: false,
    dataCreated: false,
  }),
  computed: {
    confirmCloseLabels() {
      return {
        title: this.$t('notes.confirmCancelExport.title'),
        message: this.$t('notes.confirmCancelExport'),
        ok: this.$t('notes.button.yes'),
        cancel: this.$t('notes.button.no'),
      };
    },
    openedItems() {
      return this.openNotes;
    },
    active() {
      return this.search
        && this.allItems
        && this.allItems.filter(item => item.name.toLowerCase().match(this.search.toLowerCase()))
        || this.activeItem;
    },
    includePage() {
      return this.isIncludePage;
    },
    currentBreadcrumb() {
      return this.breadcrumb;
    },
    reload() {
      return this.render;
    },
    resultSearch() {
      return this.showTree;
    },
    selectExportLabel() {
      if (this.checkbox === true) {
        return this.$t('notes.label.export.deselectAll');
      } else {
        return this.$t('notes.label.export.selectAll');
      }
    },
    openLevel() {
      return [this.home.noteId];
    },
    selectionType() {
      return this.exportNotes ? 'independent' : 'leaf';
    },
  },
  watch: {
    search() {
      this.showTree = true;
      if (this.search) {
        this.items = this.active;
        this.items.forEach(item => {
          item.children = null;
        });
        this.showTree = this.active.length ? true : false;
      } else {
        this.retrieveNoteTree(this.note.wikiType, this.note.wikiOwner, this.note.name);
      }
    },
    checkbox() {
      if (this.checkbox) {
        const allNotesIds = this.allItems.map(note => note.noteId);
        this.selectionNotes = allNotesIds;
        this.$refs.treeSearch.updateAll(true);
      } else {
        this.selectionNotes = [];
        this.$refs.treeSearch.updateAll(false);
        this.open(this.home.noteId, 'exportNotes');
      }
    },
    filter() {
      if (this.note && this.note.id) {
        if (this.note.draftPage) {
          this.getDraftNote(this.note.id);
        } else {
          this.getNoteById(this.note.id);
        }
      }
    },
  },
  created() {
    this.$root.$on('refresh-treeView-items', (note)=> {
      if (note.draftPage) {
        this.getDraftNote(note.id);
      } else {
        this.getNoteById(note.id);
      }
    });
    this.$root.$on('close-note-tree-drawer', () => {
      this.close();
    });
    this.$root.$on('display-treeview-items', () => {
      this.closeAll = true;
    });
  },
  mounted() {
    this.filterOptions = [
      this.$t('notes.filter.label.published.notes'),
      this.$t('notes.filter.label.drafts'),
    ];
    this.filter = this.filterOptions[0];
  },
  methods: {
    open(note, source, includeDisplay,filter) {
      this.render = false;
      if (note.draftPage) {
        this.filter = filter === 'published' && this.filterOptions[0] || this.filterOptions[1];
        this.getDraftNote(note.id);
      } else {
        this.filter = filter === 'draft' && this.filterOptions[1] || this.filterOptions[0];
        this.getNoteById(note.id);
      }
      if (source === 'includePages') {
        this.isIncludePage = true;
      } else {
        this.isIncludePage = false;
      }
      if (includeDisplay) {
        this.displayArrow =false;
      } else {
        this.displayArrow =true;
      }
      if (source === 'movePage') {
        this.movePage = true;
        this.exportNotes = false;
      }
      else if (source === 'exportNotes') {
        this.exportNotes = true;
        this.movePage = false;
      } else {
        this.movePage = false;
        this.exportNotes = false;
      }
      this.$nextTick().then(() => {
        this.$forceUpdate();
        this.render = true;
        this.$refs.breadcrumbDrawer.open();
      });
    },
    backToPlugins() {
      this.closeAll = false;
    },
    openNote(event, note) {
      const canOpenNote = (this.filter !== this.$t('notes.filter.label.drafts') || this.filter === this.$t('notes.filter.label.drafts') && note.draftPage) && note.noteId !== this.note.id;
      if (canOpenNote) {
        //reinitialize filter
        this.filter = this.filterOptions[0];
        this.activeItem = [note.noteId];
        if (this.includePage) {
          this.$root.$emit('include-page', note);
          this.$refs.breadcrumbDrawer.close();
        } else if (this.movePage) {
          if (note.noteId !== this.note.id) {
            this.$notesService.getNoteById(note.noteId, '', '', '', true).then(data => {
              this.breadcrumb = data && data.breadcrumb || [];
              this.breadcrumb[0].name = this.$t('notes.label.noteHome');
              this.destinationNote = data;
            });
          } else {
            Object.assign(this.destinationNote, this.note);
          }
        } else {
          const noteName = note.draftPage ? note.noteId : note.path.split('%2F').pop();
          this.$root.$emit('open-note-by-name', noteName, note.draftPage);
          this.$refs.breadcrumbDrawer.close();
        }
      } else {
        this.$refs.breadcrumbDrawer.close();
      }
    },
    getNoteById(id) {
      if (id) {
        return this.$notesService.getNoteById(id).then(data => {
          this.note = data || [];
          this.note.breadcrumb[0].title = this.$t('notes.label.noteHome');
          this.breadcrumb = this.note.breadcrumb;
        }).then(() => {
          if (this.note.wikiType === 'group'){
            this.note.wikiOwner = this.note.wikiOwner.substring(1);
          }
          this.retrieveNoteTree(this.note.wikiType, this.note.wikiOwner , this.note.name);
        });
      }
    },
    getDraftNote(id) {
      if (id) {
        return this.$notesService.getDraftNoteById(id).then(data => {
          this.note = data || [];
          this.note.breadcrumb[0].title = this.$t('notes.label.noteHome');
          this.breadcrumb = this.note.breadcrumb;
        }).then(() => {
          if (this.note.wikiType === 'group') {
            this.note.wikiOwner = this.note.wikiOwner.substring(1);
          }
          this.retrieveNoteTree(this.note.wikiType, this.note.wikiOwner, this.note.parentPageName);
        });
      }
    },
    retrieveNoteTree(noteType, noteOwner, noteName) {
      const withDrafts = this.filter === this.$t('notes.filter.label.drafts');
      this.$notesService.getFullNoteTree(noteType, noteOwner , noteName, withDrafts).then(data => {
        if (data && data.jsonList.length) {
          this.home = [];
          this.items = [];
          this.allItems = [];
          this.allItemsHome = [];
          this.home = data.treeNodeData.length ? data.treeNodeData[0] : data.jsonList[0];
          this.items = data.treeNodeData && data.treeNodeData[0] && data.treeNodeData[0] .children || [];
          this.allItems = data.jsonList;
          this.allItemsHome = data.treeNodeData;
        }
        const openedTreeViewItems = this.getOpenedTreeViewItems(this.note.breadcrumb);
        this.openNotes = [];
        this.openNotes = openedTreeViewItems;
        this.activeItem = [];
        this.activeItem = [openedTreeViewItems[openedTreeViewItems.length-1]];
        this.noteBookType = noteType;
        this.noteBookOwnerTree = noteOwner;
      });
    },
    getOpenedTreeViewItems(breadCrumbArray) {
      const activatedNotes = [];
      if (this.filter === this.$t('notes.filter.label.drafts')) {
        const nodesToOpen = this.allItems.filter(item => !item.draftPage);
        const nodesToOpenIds = nodesToOpen.map(node => node.noteId);
        
        activatedNotes.push(...nodesToOpenIds);
      } else {
        for (let index = 1; index < breadCrumbArray.length; index++) {
          activatedNotes.push(breadCrumbArray[index].noteId);
        }
      }
      return activatedNotes;
    },
    moveNote() {
      if (this.note.id !== this.destinationNote.id && this.note.parentPageId !== this.destinationNote.id) {
        this.$root.$emit('move-page', this.note, this.destinationNote);
      }
    },
    exportNotesToZip(){
      this.$root.$emit('export-notes',this.selectionNotes,this.checkbox,this.home.noteId);
      this.exporting=true;
    },
    resetImport(){
      this.checkbox = false;
      this.selectionNotes = [];
    },
    close() {
      this.render = false;
      this.$refs.breadcrumbDrawer.close();
      if (this.exporting){
        this.$root.$emit('cancel-export-notes');
        this.exportStatus = {};
        this.exporting = false; 
        this.resetImport();
      }
    },
    closeAllDrawer() {
      $('.spaceButtomNavigation').removeClass('hidden');
      this.search = '';
      if (this.exporting){
        this.$root.$emit('cancel-export-notes');
        this.exportStatus = {};
        this.exporting = false;
        this.resetImport();
      }
      if (this.closeAll) {
        this.$emit('closed');
      }
    },
    setExportStaus(exportStatus) {
      this.exportStatus = exportStatus;
      if (!this.exportStatus.status || this.exportStatus.status==='ZIP_CREATED'){
        this.exporting = false;
        this.$nextTick().then(() => this.close());
      }
    }
  }
};
</script>
