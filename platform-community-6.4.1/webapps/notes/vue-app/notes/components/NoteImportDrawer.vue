<template>
  <div>
    <exo-drawer
      ref="importNotesDrawer"
      class="notesImportDrawer"
      v-model="drawer"
      show-overlay
      right>
      <template slot="title">
        {{ $t('notes.label.importNotes') }}
      </template>
      <template slot="content">
        <div>
          <template>
            <v-stepper
              v-model="stepper"
              vertical
              flat
              class="ma-0 me-4">
              <v-stepper-step
                :complete="stepper > 1"
                step="1">
                {{ $t('notes.label.importChoice') }}
                <span v-if=" stepper!==1 && value " class="text-light-color caption">{{ $t('notes.label.importChoice.sub.title') }}</span>
              </v-stepper-step>

              <v-stepper-content step="1">
                <attachments-notes-upload-input
                  :attachments="value"
                  :max-files-count="maxFilesCount"
                  :max-files-size="maxFileSize" />

                <attachments-uploaded-notes
                  :attachments="value"
                  :max-files-count="maxFilesCount"
                  :max-files-size="maxFileSize" />

                <v-card-actions class="px-0">
                  <v-spacer />
                  <v-btn
                    :disabled="continueButtonDisabled"
                    class="btn btn-primary"
                    outlined
                    @click="stepper = 2">
                    {{ $t('notes.label.button.continue') }}
                    <v-icon size="18" class="ms-2">
                      {{ $vuetify.rtl && 'fa-caret-left' || 'fa-caret-right' }}
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-step
                :complete="stepper > 2"
                step="2">
                {{ $t('notes.label.importRules') }}
              </v-stepper-step>

              <v-stepper-content step="2" class="py-0 ps-0">
                <div class="radio-group-container ps-4">
                  <v-radio-group
                    v-model="selected"
                    @change="importModeChanges">
                    <v-radio
                      :label="$t('notes.label.importRules1')"
                      value="replaceAll" />
                    <v-radio
                      :label="$t('notes.label.importRules2')"
                      value="updateNotes" />
                  </v-radio-group>
                </div>
                <template v-if="enableOptionList">
                  <v-container class="mt-n5 ps-4">
                    <div class="import-rules-messages ps-2 pt-5">
                      <h4 class="import-rules-title text-sub-title font-weight-bold body-2"> {{ $t('notes.label.importRulesMessage.title') }}</h4>
                      <p class="mb-0 text-sub-title text-sub-title body-2">{{ $t('notes.label.importRulesMessage.text') }}</p>
                    </div>
                    <div class="import-alert-message pt-4 d-flex">
                      <v-icon size="30" class="text-sub-title pe-3">mdi-alert-outline</v-icon>
                      <span class="body-2 text-sub-title">{{ $t('notes.label.importRulesAlert.text') }}</span>
                    </div>
                    <v-radio-group
                      v-model="choice"
                      column
                      class="import-choice-options ms-8">
                      <!--                      <v-radio
                        :label="$t('notes.label.importRules4')"
                        value="overwrite" />-->
                      <v-radio
                        :label="$t('notes.label.importRules2')"
                        value="update" />
                      <v-radio
                        :label="$t('notes.label.importRules3')"
                        value="duplicate" />
                    </v-radio-group>
                  </v-container>
                </template>
                <v-card-actions class="mt-4 px-0">
                  <v-btn
                    class="btn"
                    @click="stepper = 1">
                    <v-icon size="18" class="me-2">
                      {{ $vuetify.rtl && 'fa-caret-right' || 'fa-caret-left' }}
                    </v-icon>
                    {{ $t('notes.label.button.back') }}
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-stepper>
          </template>
        </div>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <v-spacer />
          <v-btn
            class="btn me-2"
            @click="cancel">
            <template>
              {{ $t('notes.button.cancel') }}
            </template>
          </v-btn>
          <v-btn
            :disabled="importButtonDisabled"
            class="btn btn-primary"
            @click="importNotes">
            <template>
              {{ $t('notes.button.import') }}
            </template>
          </v-btn>
        </div>
      </template>
    </exo-drawer>
  </div>
</template>
<script>
export default {
  props: {
    maxFileSize: {
      type: Number,
      default: parseInt(`${eXo.env.portal.maxFileSize}`)
    },
    maxFilesCount: {
      type: Number,
      required: false,
      default: parseInt(`${eXo.env.portal.maxToUpload}`)
    },
  },
  data() {
    return {
      stepper: 1,
      selected: 'nothing',
      choice: 'nothing',
      value: [],
      showImportOptionsList: false
    };
  },
  computed: {
    continueButtonDisabled(){
      if (this.value && this.value[0] && this.value[0].uploadId){
        return false;
      } else {
        return true;
      }
    },
    importButtonDisabled(){
      if ((this.selected === 'replaceAll' && this.value && this.value[0] && this.value[0].uploadId)
      || (this.choice !== 'nothing' && this.value && this.value[0] && this.value[0].uploadId)){
        return false;
      } else {
        return true;
      }
    },
    enableOptionList() {
      return this.showImportOptionsList;
    }
  },
  created() {
    this.$root.$on('add-new-uploaded-file', file => {
      this.value = [];
      this.value.push(file);
    });
    this.$root.$on('delete-uploaded-file', () => {
      this.value = [];
    });
  },
  methods: {
    open() {
      this.$refs.importNotesDrawer.open();
    },
    cancel() {
      this.value = [];
      this.selected = 'nothing';
      this.choice = 'nothing';
      this.stepper = 1;
      this.$refs.importNotesDrawer.close();
    },
    importNotes(){
      if ( this.choice !== 'nothing' ){
        this.selected = this.choice;
      }
      this.$root.$emit('import-notes',this.value[0].uploadId,this.selected);
      this.cancel();
    },
    importModeChanges() {
      if ( this.selected === 'updateNotes' ) {
        this.showImportOptionsList = true;
      } else {
        this.showImportOptionsList = false;
        this.choice = 'nothing';
      }
    }
  }
};
</script>