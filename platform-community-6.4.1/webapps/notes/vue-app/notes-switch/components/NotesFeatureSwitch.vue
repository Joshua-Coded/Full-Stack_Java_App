<template>
  <v-app class="white">
    <div :class="notesApplicationClass">
      <div v-if="!useNewApp" class="white my-3 py-2 primary--text">
        <v-btn
          id="switchToOldWikiApp"
          link
          text
          class="primary--text font-weight-bold text-capitalize"
          @click="switchNotesApp">
          <v-icon class="me-3" size="16">far fa-window-restore</v-icon>
          {{ $t('notes.switchToOldApp') }}
        </v-btn>
      </div>
      <div v-show="!useNewApp" class="white my-3 py-2 primary--text">
        <v-btn
          id="switchToNewNotesApp"
          link
          text
          class="primary--text font-weight-bold text-capitalize"
          @click="switchNotesApp">
          <v-icon class="me-3" size="16">far fa-window-restore</v-icon>
          {{ $t('notes.switchToNewApp') }}
        </v-btn>
      </div>
      <div v-if="useNewApp" class="d-flex flex-column pb-4 notes-wrapper">
        <notes-overview />
      </div>
    </div>
  </v-app>
</template>
<script>
import { notesConstants } from '../../../javascript/eXo/wiki/notesConstants.js';
export default {
  data: () => ({
    useNewApp: true,
    imageLoaded: false,
    notesApplicationClass: 'notesApplication',
    noteBookType: eXo.env.portal.spaceName ? 'group' : 'portal',
    noteBookOwner: eXo.env.portal.spaceGroup ? `/spaces/${eXo.env.portal.spaceGroup}` : `${eXo.env.portal.portalName}`,
    currentPath: window.location.pathname, 
  }),
  computed: {
    notesPageName() {
      if (this.currentPath.endsWith('/wiki')){
        return 'WikiHome';
      } else {
        if (!(this.currentPath.includes('/wiki/'))) {
          return;
        } else {
          const noteId = this.currentPath.split('/').pop();
          if (noteId) {
            return noteId;
          } else {
            return 'WikiHome';
          }
        }
      }
    }
  },

  created() {
    const queryPath = window.location.search;
    const urlParams = new URLSearchParams(queryPath);
    if ( urlParams.has('appView') ){
      const appView = urlParams.get('appView');
      if (appView ==='old'){
        this.useNewApp = false; 
        this.notesApplicationClass='WikiPortlet';
        $('.uiWikiPortlet').show();
        const theURL= new URL(window.location.href);
        theURL.searchParams.delete('appView');
        window.history.pushState('wiki', '', theURL.href);
      }
    }
  },
  methods: {
    switchNotesApp() {
      document.dispatchEvent(new CustomEvent('displayTopBarLoading'));

      if (this.useNewApp) {
        let noteId = 0;
        let currentUrl = window.location.href;
        if (currentUrl.includes('/wiki/')) {
          const nId = currentUrl.split('wiki/')[1].split(/[^0-9]/)[0];
          noteId = nId && Number(nId) || 0;
        }
        if (noteId!==0){
          this.$notesService.getNoteById(noteId).then(data => {
            const note = data || [];
            currentUrl = `${currentUrl.split(notesConstants.NOTES_PAGE_NAME)[0]}${notesConstants.NOTES_PAGE_NAME}/${note.name}`;
            const theURL= new URL(currentUrl);
            theURL.searchParams.set('appView', 'old');
            window.location.href=theURL.href;
          }).catch(e => {
            console.error('Error when getting note', e);
          });
        } else {
          const theURL= new URL(window.location.href);
          theURL.searchParams.set('appView', 'old');
          window.location.href=theURL.href;
        }        
      } else {
        this.notesApplicationClass='notesApplication';
        $('.uiWikiPortlet').hide();
        const theURL= new URL(window.location.href);
        theURL.searchParams.delete('appView');
        window.history.pushState('wiki', '', theURL.href);
        document.dispatchEvent(new CustomEvent('hideTopBarLoading'));
        this.useNewApp = !this.useNewApp;
      }

    },
    displayText() {
      window.setTimeout(() => this.imageLoaded = true, 200);
    },
  },
};
</script> 