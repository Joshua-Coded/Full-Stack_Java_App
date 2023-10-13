<template>
  <v-app class="notesEditor">
    <v-alert
      v-model="alert"
      :class="alertMessageClass"
      :type="alertType"
      :icon="alertType === 'warning' ? 'mdi-alert-circle' : ''"
      dismissible>
      {{ message }}
      <a 
        v-if="alertType === 'warning' && note.draftPage" 
        class="dropDraftLink"
        @click="dropDraft">{{ $t('notes.label.drop.draft') }}</a>
    </v-alert>
    <div
      id="notesEditor"
      class="notesEditor width-full">
      <div class="notes-topbar">
        <div class="notesActions white">
          <div class="notesFormButtons d-inline-flex flex-wrap width-full pa-3 ma-0">
            <div class="notesFormLeftActions d-inline-flex align-center me-10">
              <img :src="srcImageNote">
              <span class="notesFormTitle ps-2">{{ noteFormTitle }}</span>
            </div>
            <div class="notesFormRightActions pr-7">
              <p class="draftSavingStatus mr-7">{{ draftSavingStatus }}</p>
              <button
                id="notesUpdateAndPost"
                class="btn btn-primary primary px-2 py-0"
                :key="postKey"
                :aria-label="publishButtonText"
                @click.once="postNote(false)">
                {{ publishButtonText }}
                <v-icon
                  id="notesPublichAndPost"
                  dark
                  @click="openPublishAndPost">
                  mdi-menu-down
                </v-icon>
              </button>
              <v-menu
                v-model="publishAndPost"
                :attach="'#notesUpdateAndPost'"
                transition="scroll-y-transition"
                content-class="publish-and-post-btn width-full"
                offset-y
                left>
                <v-list-item
                  @click.stop="postNote(true)"
                  class="px-2">
                  <v-icon
                    size="19"
                    class="primary--text clickable pr-2">
                    mdi-arrow-collapse-up
                  </v-icon>
                  <span class="body-2 text-color">{{ publishAndPostButtonText }}</span>
                </v-list-item>
              </v-menu>
            </div>
          </div>
        </div>
        <div id="notesTop" class="width-full darkComposerEffect"></div>
      </div>

      <form class="notes-content">
        <div class="notes-content-form px-4">
          <div class="formInputGroup notesTitle mx-3">
            <input
              id="notesTitle"
              ref="noteTitle"
              v-model="note.title"
              :placeholder="notesTitlePlaceholder"
              type="text"
              class="py-0 px-1 mt-5 mb-0">
          </div>
          <div class="formInputGroup white overflow-auto flex notes-content-wrapper">
            <textarea
              id="notesContent"
              v-model="note.content"
              :placeholder="notesBodyPlaceholder"
              class="notesFormInput"
              name="notesContent">
            </textarea>
          </div>
        </div>
      </form>
    </div>
    <note-custom-plugins ref="noteCustomPlugins" :instance="instance" />
    <note-table-plugins-drawer
      ref="noteTablePlugins"
      :instance="instance"
      @closed="closePluginsDrawer()" />
    <note-treeview-drawer 
      ref="noteTreeview"
      @closed="closePluginsDrawer()" />
  </v-app>
</template>

<script>

export default {
  props: {
    instance: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      lang: eXo.env.portal.language,
      dateTimeFormat: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      note: {
        id: '',
        title: '',
        content: '',
        parentPageId: '',
      },
      actualNote: {
        id: '',
        title: '',
        content: '',
        parentPageId: '',
      },
      alert: false,
      alertType: '',
      message: '',
      noteId: '',
      parentPageId: '',
      appName: 'notes',
      srcImageNote: '/notes/images/wiki.png',
      titleMaxLength: 1000,
      notesTitlePlaceholder: `${this.$t('notes.title.placeholderContentInput')}*`,
      notesBodyPlaceholder: `${this.$t('notes.body.placeholderContentInput')}`,
      publishAndPost: false,
      spaceId: '',
      noteFormTitle: '',
      postingNote: false,
      savingDraft: false,
      initDone: false,
      initActualNoteDone: false,
      draftSavingStatus: '',
      autoSaveDelay: 1000,
      saveDraft: '',
      postKey: 1,
      navigationLabel: `${this.$t('notes.label.Navigation')}`,
      noteNavigationDisplayed: false,
      spaceGroupId: null,
    };
  },
  computed: {
    publishAndPostButtonText() {
      if (this.note.id && (this.note.targetPageId || !this.note.draftPage)) {
        return this.$t('notes.button.updateAndPost');
      } else {
        return this.$t('notes.button.publishAndPost');
      }
    },
    publishButtonText() {
      if (this.note.id && (this.note.targetPageId || !this.note.draftPage)) {
        return this.$t('notes.button.update');
      } else {
        return this.$t('notes.button.publish');
      }
    },
    initCompleted() {
      return this.initDone && ((this.initActualNoteDone || this.noteId) || (this.initActualNoteDone || !this.noteId)) ;
    },
    alertMessageClass(){
      return  this.message.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length > 45 ? 'lengthyAlertMessage' : '';
    },
  },
  watch: {
    'note.title'() {
      if (this.note.title !== this.actualNote.title ) {
        this.autoSave();
      }
    },
    'note.content'() {
      if (this.note.content !== this.actualNote.content) {
        this.autoSave();
      }
    },
  },
  created() {
    window.addEventListener('beforeunload', () => {
      if (!this.postingNote && this.note.draftPage && this.note.id) {
        const currentDraft = localStorage.getItem(`draftNoteId-${this.note.id}`);
        if (currentDraft) {
          this.removeLocalStorageCurrentDraft();
          const draftToPersist = JSON.parse(currentDraft);
          this.persistDraftNote(draftToPersist);
        }
      }
    });
    const queryPath = window.location.search;
    const urlParams = new URLSearchParams(queryPath);
    if (urlParams.has('appName')) {
      this.appName = urlParams.get('appName');
    }
    if (urlParams.has('noteId')) {
      this.noteId = urlParams.get('noteId');
      const isDraft = urlParams.has('isDraft') && urlParams.get('isDraft') === 'true';
      if (isDraft) {
        this.getDraftNote(this.noteId);
      } else {
        this.getNote(this.noteId);
      }
    }
    if (urlParams.has('parentNoteId')) {
      this.parentPageId = urlParams.get('parentNoteId');
      this.spaceId = urlParams.get('spaceId');
      this.spaceGroupId  = urlParams.get('spaceGroupId');
      this.note.parentPageId = this.parentPageId;
    }
    this.displayFormTitle();
    $(document).on('mousedown', () => {
      if (this.publishAndPost) {
        window.setTimeout(() => {
          this.publishAndPost = false;
        }, this.waitTimeUntilCloseMenu);
      }
    });
    document.addEventListener('note-custom-plugins', () => {
      this.$refs.noteCustomPlugins.open();
    });
    this.$root.$on('note-table-plugins', () => {
      this.$refs.noteTablePlugins.open();
    });
    this.$root.$on('updateData', data => {
      this.note.content= data;
    });
    this.$root.$on('show-alert', message => {
      this.displayMessage(message);
    });
    this.$root.$on('display-treeview-items', filter => {
      if ( urlParams.has('noteId') ) {
        this.$refs.noteTreeview.open(this.note, 'includePages', null, filter);
      } else if (urlParams.has('parentNoteId')) {
        this.$notesService.getNoteById(this.parentPageId).then(data => {
          const note = data;
          this.$refs.noteTreeview.open(note, 'includePages', null, filter);
        });
      }
    });
    this.$root.$on('include-page', (note) => {
      const editor = $('textarea#notesContent').ckeditor().editor;
      const editorSelectedElement = editor.getSelection().getStartElement();
      if (editor.getSelection().getSelectedText()) {
        if (editorSelectedElement.is('a')) {
          if (editorSelectedElement.getAttribute( 'class' ) === 'noteLink') {
            editor.getSelection().getStartElement().remove();
            editor.insertHtml(`<a href='${note.noteId}' class='noteLink'>${note.name}</a>`);
          }
          if (editorSelectedElement.getAttribute( 'class' ) === 'labelLink') {
            const linkText = editorSelectedElement.getHtml();
            editor.getSelection().getStartElement().remove();
            editor.insertHtml(`<a href='${note.noteId}' class='noteLink'>${linkText}</a>`);
          }
        } else {
          editor.insertHtml(`<a href='${note.noteId}' class='labelLink'>${editor.getSelection().getSelectedText()}</a>`);
        }
      } else {
        editor.insertHtml(`<a href='${note.noteId}' class='noteLink'>${note.name}</a>`);
      }
    });

    document.addEventListener('note-navigation-plugin', () => {
      this.$root.$emit('show-alert', {
        type: 'error',
        message: this.$t('notes.message.manualChild')
      });
    });

  },
  mounted() {
    if (this.spaceId) {
      this.init();
      this.$root.$on('initCkeditor',() => this.initCKEditor());
    }
  },
  methods: {
    init() {
      this.initCKEditor();
      this.setToolBarEffect();
      this.initDone = true;
    },
    autoSave() {
      // No draft saving if init not done or in edit mode for the moment
      if (!this.initCompleted) {
        return;
      }
      // if the Note is being posted, no need to autosave anymore
      if (this.postingNote) {
        return;
      }

      // close draft dropping related alert
      if (this.alertType === 'warning' && this.note.draftPage && this.alert) {
        this.alert = false;
      }
      
      clearTimeout(this.saveDraft);
      this.saveDraft = setTimeout(() => {
        this.savingDraft = true;
        this.draftSavingStatus = this.$t('notes.draft.savingDraftStatus');
        this.$nextTick(() => {
          this.saveNoteDraft();
        });
      }, this.autoSaveDelay);
    },
    getNote(id) {
      return this.$notesService.getLatestDraftOfPage(id).then(latestDraft => {
        if (latestDraft.wikiType === 'group') {
          this.spaceGroupId = latestDraft.wikiOwner;
        }
        this.init();
        // check if page has a draft
        latestDraft = Object.keys(latestDraft).length !== 0 ? latestDraft : null;
        if (latestDraft) {
          this.fillNote(latestDraft);
          const messageObject = {
            type: 'warning',
            message: `${this.$t('notes.alert.warning.label.draft.drop')} ${this.$dateUtil.formatDateObjectToDisplay(new Date(this.note.updatedDate.time), this.dateTimeFormat, this.lang)},`
          };
          this.displayMessage(messageObject, true);
          this.initActualNoteDone = true;
        } else {
          this.$notesService.getNoteById(id).then(data => {
            this.$nextTick(()=> this.fillNote(data));
            this.initActualNoteDone = true;
          });
        }
      });
    },
    getDraftNote(id) {
      return this.$notesService.getDraftNoteById(id).then(data => {
        if (data.wikiType === 'group') {
          this.spaceGroupId = data.wikiOwner;
        }
        this.init();
        this.fillNote(data);
      }).finally(() => {
        const messageObject = {
          type: 'warning',
          message: `${this.$t('notes.alert.warning.label.draft.drop')} ${this.$dateUtil.formatDateObjectToDisplay(new Date(this.note.updatedDate.time), this.dateTimeFormat, this.lang)},  `
        };
        this.displayMessage(messageObject, true);
        this.initActualNoteDone = true;
      });
    },
    fillNote(data) {
      this.initActualNoteDone = false;
      if (data) {
        this.note = data;
        this.actualNote = {
          id: this.note.id,
          name: this.note.name,
          title: this.note.title,
          content: this.note.content,
          author: this.note.author,
          owner: this.note.owner,
          breadcrumb: this.note.breadcrumb,
          toBePublished: this.note.toBePublished,
        };
        const childContainer = '<div id="note-children-container" class="navigation-img-wrapper" contenteditable="false"><figure class="image-navigation" contenteditable="false">'
        +'<img src="/notes/images/children.png" role="presentation"/><img src="/notes/images/trash.png" id="remove-treeview" alt="remove treeview"/>'
        +'<figcaption class="note-navigation-label">Navigation</figcaption></figure></div><p></p>';
        CKEDITOR.instances['notesContent'].setData(data.content);
        if ((this.note.content.trim().length === 0)) {
          this.$notesService.getNoteById(this.noteId, '','','',true).then(data => {
            if (data && data.children && data.children.length) {
              CKEDITOR.instances['notesContent'].setData(childContainer);
              this.setFocus();
            }
          });
        } 
      }
    },
    postNote(toPublish) {
      this.postingNote = true;
      clearTimeout(this.saveDraft);
      if (this.validateForm()) {
        let note;
        if (this.note.draftPage) {
          note = {
            id: this.note.targetPageId ? this.note.targetPageId : null,
            title: this.note.title,
            name: this.note.name,
            wikiType: this.note.wikiType,
            wikiOwner: this.note.wikiOwner,
            content: this.getBody() || this.note.content,
            parentPageId: this.note.targetPageId === this.parentPageId ? null : this.parentPageId,
            toBePublished: toPublish,
            appName: this.appName,
          };
        } else {
          note = {
            id: this.note.id,
            title: this.note.title,
            name: this.note.name,
            wikiType: this.note.wikiType,
            wikiOwner: this.note.wikiOwner,
            content: this.getBody() || this.note.content,
            parentPageId: this.parentPageId,
            toBePublished: toPublish,
            appName: this.appName,
          };
        }
        let notePath = '';
        if (note.id) {
          this.$notesService.updateNoteById(note).then(data => {
            this.removeLocalStorageCurrentDraft();
            notePath = this.$notesService.getPathByNoteOwner(data, this.appName).replace(/ /g, '_');
            this.draftSavingStatus = '';
            window.location.href = notePath;
          }).catch(e => {
            console.error('Error when update note page', e);
            this.enableClickOnce();
            this.$root.$emit('show-alert', {
              type: 'error',
              message: this.$t(`notes.message.${e.message}`)
            });
          });
        } else {
          this.$notesService.createNote(note).then(data => {
            notePath = this.$notesService.getPathByNoteOwner(data, this.appName).replace(/ /g, '_');
            // delete draft note
            const draftNote = JSON.parse(localStorage.getItem(`draftNoteId-${this.note.id}`));
            this.deleteDraftNote(draftNote, notePath);
          }).catch(e => {
            console.error('Error when creating note page', e);
            this.enableClickOnce();
            this.$root.$emit('show-alert', {
              type: 'error',
              message: this.$t(`notes.message.${e.message}`)
            });
          });
        }
      }
    },
    openPublishAndPost(event) {
      this.publishAndPost = !this.publishAndPost;
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    saveNoteDraft() {
      const draftNote = {
        id: this.note.draftPage ? this.note.id : '',
        title: this.note.title,
        content: this.getBody() || this.note.content,
        name: this.note.name,
        appName: this.appName,
        wikiType: this.note.wikiType,
        wikiOwner: this.note.wikiOwner,
        parentPageId: this.parentPageId,
      };
      if (this.note.draftPage && this.note.id) {
        draftNote.targetPageId = this.note.targetPageId;
      } else {
        draftNote.targetPageId = this.note.id ? this.note.id : '';
      }

      if (this.note.title || this.note.content) {
        // if draft page not created persist it only the first time else update it in browser's localStorage
        if (this.note.draftPage && this.note.id) {
          this.note.parentPageId = this.parentPageId;
          localStorage.setItem(`draftNoteId-${this.note.id}`, JSON.stringify(draftNote));
          this.actualNote = {
            name: draftNote.name,
            title: draftNote.title,
            content: draftNote.content,
          };
          setTimeout(() => {
            this.draftSavingStatus = this.$t('notes.draft.savedDraftStatus');
          }, this.autoSaveDelay/2);
        } else {
          if (!this.isDefaultContent(this.note.content)) {
            this.persistDraftNote(draftNote);
          }
        }
      } else {
        // delete draft
        this.deleteDraftNote();
      }
    },
    persistDraftNote(draftNote) {
      if (this.note.title || this.note.content) {
        this.$notesService.saveDraftNote(draftNote, this.parentPageId).then(savedDraftNote => {
          this.actualNote = {
            id: savedDraftNote.id,
            name: savedDraftNote.name,
            title: savedDraftNote.title,
            content: savedDraftNote.content,
            author: savedDraftNote.author,
            owner: savedDraftNote.owner,
          };
          savedDraftNote.parentPageId = this.parentPageId;
          this.note = savedDraftNote;
          localStorage.setItem(`draftNoteId-${this.note.id}`, JSON.stringify(savedDraftNote));
        }).then(() => {
          this.savingDraft = false;
          setTimeout(() => {
            this.draftSavingStatus = this.$t('notes.draft.savedDraftStatus');
          }, this.autoSaveDelay/2);
        }).catch(e => {
          console.error('Error when creating draft note: ', e);
          this.$root.$emit('show-alert', {
            type: 'error',
            message: this.$t(`notes.message.${e.message}`)
          });
        });
      }
    },
    closePluginsDrawer() {
      this.$refs.noteCustomPlugins.close();
    },
    initCKEditor: function() {
      if (CKEDITOR.instances['notesContent'] && CKEDITOR.instances['notesContent'].destroy) {
        CKEDITOR.instances['notesContent'].destroy(true);
      }
      CKEDITOR.plugins.addExternal('video','/notes/javascript/eXo/wiki/ckeditor/plugins/video/','plugin.js');
      CKEDITOR.plugins.addExternal('insertOptions','/notes/javascript/eXo/wiki/ckeditor/plugins/insertOptions/','plugin.js');
      CKEDITOR.plugins.addExternal('toc','/notes/javascript/eXo/wiki/ckeditor/plugins/toc/','plugin.js');

      CKEDITOR.dtd.$removeEmpty['i'] = false;
      let extraPlugins = 'sharedspace,simpleLink,font,justify,widget,video,insertOptions,contextmenu,tabletools,tableresize,toc';
      let removePlugins = 'image,confirmBeforeReload,maximize,resize';
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();
      if (windowWidth > windowHeight && windowWidth < this.SMARTPHONE_LANDSCAPE_WIDTH) {
        // Disable suggester on smart-phone landscape
        extraPlugins = 'simpleLink';
      }

      const ckEditorExtensions = extensionRegistry.loadExtensions('WYSIWYGPlugins', 'image');
      if (ckEditorExtensions && ckEditorExtensions.length) {
        const ckEditorExtraPlugins = ckEditorExtensions.map(ckEditorExtension => ckEditorExtension.extraPlugin).join(',');
        const ckEditorRemovePlugins = ckEditorExtensions.map(ckEditorExtension => ckEditorExtension.removePlugin).join(',');
        if (ckEditorExtraPlugins) {
          extraPlugins = `${extraPlugins},${ckEditorExtraPlugins}`;
        }
        if (ckEditorRemovePlugins) {
          removePlugins = `${removePlugins},${ckEditorRemovePlugins}`;
        }
      }
      CKEDITOR.addCss('h1 { font-size: 34px;font-weight: 400;}');
      CKEDITOR.addCss('h2 { font-size: 28px;font-weight: 400;}');
      CKEDITOR.addCss('h3 { font-size: 21.84px;font-weight: 400;}');
      CKEDITOR.addCss('p,li { font-size: 18.6667px;}');
      CKEDITOR.addCss('blockquote p { font-size: 17.5px;font-weight: 300;}');
      CKEDITOR.addCss('.cke_editable { font-size: 14px; line-height: 1.4 !important;}');
      CKEDITOR.addCss('.placeholder { color: #5f708a!important;}');

      // this line is mandatory when a custom skin is defined

      CKEDITOR.basePath = '/commons-extension/ckeditor/';
      const self = this;

      $('textarea#notesContent').ckeditor({
        customConfig: '/commons-extension/ckeditorCustom/config.js',
        extraPlugins: extraPlugins,
        removePlugins: removePlugins,
        allowedContent: true,
        spaceURL: self.spaceURL,
        spaceGroupId: `/spaces/${this.spaceGroupId}`,
        imagesDownloadFolder: 'notes/images',
        toolbarLocation: 'top',
        extraAllowedContent: 'table[!summary]; img[style,class,src,referrerpolicy,alt,width,height]; span(*)[*]{*}; span[data-atwho-at-query,data-atwho-at-value,contenteditable]; a[*];i[*];',
        removeButtons: '',
        enterMode: CKEDITOR.ENTER_BR,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        toolbar: [
          { name: 'format', items: ['Format'] },
          { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
          { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Blockquote' ] },
          { name: 'fontsize', items: ['FontSize'] },
          { name: 'colors', items: [ 'TextColor' ] },
          { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
          { name: 'insert' },
          { name: 'links', items: [ 'simpleLink','InsertOptions'] },
        ],
        format_tags: 'p;h1;h2;h3',
        autoGrow_minHeight: self.noteFormContentHeight,
        height: self.noteFormContentHeight,
        bodyClass: 'notesContent',
        dialog_noConfirmCancel: true,
        sharedSpaces: {
          top: 'notesTop'
        },
        on: {
          instanceReady: function (evt) {
            //self.note.content = evt.editor.getData();
            self.actualNote.content = evt.editor.getData();
            CKEDITOR.instances['notesContent'].removeMenuItem('linkItem');
            CKEDITOR.instances['notesContent'].removeMenuItem('selectImageItem');
            CKEDITOR.instances['notesContent'].contextMenu.addListener( function( element ) {
              if ( element.getAscendant( 'table', true ) ) {
                return {
                  tableProperties: CKEDITOR.TRISTATE_ON
                };
              }
            });
            CKEDITOR.instances['notesContent'].addCommand('tableProperties', {
              exec: function() {
                if (CKEDITOR.instances['notesContent'].elementPath() && CKEDITOR.instances['notesContent'].elementPath().contains( 'table', 1 )){
                  const tableSummary = CKEDITOR.instances['notesContent'].elementPath().contains( 'div', 1 ).$.firstChild.innerText;
                  const table=CKEDITOR.instances['notesContent'].elementPath().contains( 'table', 1 ).getAttributes();
                  self.$refs.noteTablePlugins.open(table, tableSummary);
                }

              }
            });
            $(CKEDITOR.instances['notesContent'].document.$)
              .find('.atwho-inserted')
              .each(function() {
                $(this).on('click', '.remove', function() {
                  $(this).closest('[data-atwho-at-query]').remove();
                });
              });
            
            const treeviewParentWrapper =  CKEDITOR.instances['notesContent'].window.$.document.getElementById('note-children-container');
            if ( treeviewParentWrapper ) {
              treeviewParentWrapper.contentEditable='false';
            }

            const removeTreeviewBtn =  evt.editor.document.getById( 'remove-treeview' );
            if ( removeTreeviewBtn ) {
              evt.editor.editable().attachListener( removeTreeviewBtn, 'click', function() {
                const treeviewParentWrapper = evt.editor.document.getById( 'note-children-container' );
                if ( treeviewParentWrapper) {
                  treeviewParentWrapper.remove();
                  self.note.content = evt.editor.getData();
                }
                self.setFocus();
              } );
            }
            window.setTimeout(() => self.setFocus(), 50);
            self.$root.$applicationLoaded();
          },
          change: function (evt) {
            self.note.content = evt.editor.getData();
            self.autoSave();
            const removeTreeviewBtn =  evt.editor.document.getById( 'remove-treeview' );
            if ( removeTreeviewBtn ) {
              evt.editor.editable().attachListener( removeTreeviewBtn, 'click', function() {
                const treeviewParentWrapper = evt.editor.document.getById( 'note-children-container' );
                if ( treeviewParentWrapper) {
                  const newLine = treeviewParentWrapper.getNext();
                  treeviewParentWrapper.remove();
                  if ( newLine.$.innerText.trim().length === 0) {
                    newLine.remove();
                  }
                  self.note.content = evt.editor.getData();
                }
              } );
            }
          },
          fileUploadResponse: function() {
            /*add plugin fileUploadResponse to handle file upload response ,
              in this method we can get the response from server and update the editor content
              this method is called when file upload is finished*/
            CKEDITOR.instances.notesContent.once('afterInsertHtml', ()=> {
              window.setTimeout(() => {
                CKEDITOR.instances.notesContent.fire('mode');
              }, 2000);
            });
          },
          doubleclick: function(evt) {
            const element = evt.data.element;
            if ( element && element.is('a')) {
              const noteId = element.getAttribute( 'href' );
              self.$notesService.getNoteById(noteId).then(data => {
                const note = data;
                self.$refs.noteTreeview.open(note, 'includePages', 'no-arrow');
              });
            }
          }
        }
      });
      this.instance =CKEDITOR.instances['notesContent'];
    },
    setToolBarEffect() {
      const element = CKEDITOR.instances['notesContent'] ;
      const elementNewTop = document.getElementById('notesTop');
      element.on('contentDom', function () {
        this.document.on('click', function(){
          elementNewTop.classList.add('darkComposerEffect');
        });
      });
      element.on('contentDom', function () {
        this.document.on('keyup', function(){
          elementNewTop.classList.add('darkComposerEffect');
        });
      });
      $('#notesEditor').parent().click(() => {
        elementNewTop.classList.remove('darkComposerEffect');
        elementNewTop.classList.add('greyComposerEffect');
      });
      $('#notesEditor').parent().keyup(() => {
        elementNewTop.classList.remove('darkComposerEffect');
        elementNewTop.classList.add('greyComposerEffect');
      });
    },
    setFocus() {
      if (!this.noteId) {
        this.$refs.noteTitle.focus();
      } else {
        if (CKEDITOR.instances['notesContent']) {
          CKEDITOR.instances['notesContent'].status = 'ready';
          window.setTimeout(() => {
            this.$nextTick().then(() => CKEDITOR.instances['notesContent'].focus());
          }, 200);
        }        
      }
    },
    validateForm() {
      if (!this.note.title) {
        this.enableClickOnce();
        this.$root.$emit('show-alert', {
          type: 'error',
          message: this.$t('notes.message.missingTitle')
        });
        return false;
      }
      if (!isNaN(this.note.title)) {
        this.enableClickOnce();
        this.$root.$emit('show-alert', {
          type: 'error',
          message: this.$t('notes.message.numericTitle')
        });
        return false;
      } else if (this.note.title.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length < 3 || this.note.title.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim().length > this.titleMaxLength) {
        this.enableClickOnce();
        this.$root.$emit('show-alert', {
          type: 'error',
          message: this.$t('notes.message.missingLengthTitle')
        });
        return false;
      } else {
        return true;
      }
    },
    displayMessage(message, keepAlert) {
      this.message = message.message;
      this.alertType = message.type;
      this.alert = true;
      if (!keepAlert) {
        window.setTimeout(() => this.alert = false, 5000);
      }
    },
    displayFormTitle() {
      if (this.noteId) {
        this.noteFormTitle = this.$t('notes.edit.editNotes');
      } else {
        return this.$spaceService.getSpaceById(this.spaceId).then(space => {
          this.noteFormTitle = this.$t('notes.composer.createNotes').replace('{0}', space.displayName);
        });
      }
    },
    dropDraft() {
      if (this.note.draftPage && this.note.id) {
        const targetPageId = this.note.targetPageId;
        this.removeLocalStorageCurrentDraft();
        this.$notesService.deleteDraftNote(this.note).then(() => {
          this.draftSavingStatus = '';
          //re-initialize data
          if (targetPageId) {
            if (this.alertType === 'warning') {
              this.alert = false;
            }
            this.getNote(targetPageId);
          } else {
            const parentNote = {
              id: this.note.parentPageId,
              wikiId: this.note.wikiId,
              wikiOwner: this.note.wikiOwner,
              wikiType: this.note.wikiType,
            };
            window.location.href = this.$notesService.getPathByNoteOwner(parentNote, this.appName).replace(/ /g, '_');
          }
        }).catch(e => {
          console.error('Error when deleting draft note', e);
        });
      }
    },
    deleteDraftNote(draftNote, notePath) {
      if (!draftNote) {
        draftNote = this.note;
      }
      if (this.note.draftPage && this.note.id) {
        this.removeLocalStorageCurrentDraft();
        this.$notesService.deleteDraftNote(draftNote).then(() => {
          this.draftSavingStatus = '';
          //re-initialize data
          if (!notePath) {
            this.note = {
              id: '',
              title: '',
              content: '',
              parentPageId: this.parentPageId,
              draftPage: true,
            };
            this.actualNote = {
              id: '',
              title: '',
              content: '',
              parentPageId: this.parentPageId,
              draftPage: true,
            };
          }
        }).then(() => {
          this.draftSavingStatus = '';
          if (notePath) {
            window.location.href = notePath;
          }
        }).catch(e => {
          console.error('Error when deleting draft note', e);
        });
      }
    },
    removeLocalStorageCurrentDraft() {
      const currentDraft = localStorage.getItem(`draftNoteId-${this.note.id}`);
      if (currentDraft) {
        localStorage.removeItem(`draftNoteId-${this.note.id}`);
      }
    },
    enableClickOnce() {
      this.postingNote = false;
      this.postKey++;
    },
    isDefaultContent(noteContent) {
      const div = document.createElement('div');
      div.innerHTML = noteContent;
      if ( div.childElementCount === 2) {
        const childrenWrapper = CKEDITOR.instances['notesContent'].window.$.document.getElementById('note-children-container');
        if ( childrenWrapper ) {
          if (childrenWrapper.nextElementSibling.innerText.trim().length === 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    getBody: function() {
      const newData = CKEDITOR.instances['notesContent'].getData();
      return newData ? newData : null;
    }
  }
};
</script>
