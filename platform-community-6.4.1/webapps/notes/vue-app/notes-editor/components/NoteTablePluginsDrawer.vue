<template>
  <div>
    <v-overlay
      z-index="1031"
      :value="drawer"
      @click.native="drawer = false" />
    <exo-drawer
      ref="customTableDrawer"
      v-model="drawer"
      show-overlay
      class="customTableDrawer"
      @closed="closeAllDrawer()" 
      right>
      <template slot="title">
        <div class="d-flex">
          <i class="uiIcon uiArrowBAckIcon" @click="backToPlugins(); close()"></i>
          <span class="ps-2 pt-1">{{ $t('notes.plugin.table') }}</span>
        </div>
      </template>
      <template slot="content">
        <v-container fluid>
          <div class="d-flex">
            <v-subheader class="px-0">
              {{ $t('notes.plugin.table.size') }}
            </v-subheader>
            <v-divider class="spacesOverviewHorizontalSeparator mx-2 ma-auto" />
          </div>

          <v-row align="center">
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.lines') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="lines"
                class="pa-0"
                type="number"
                :rules="maxRules"
                dense
                min-height
                outlined
                :disabled="table ? true : false " />
            </v-col>
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.columns') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="columns"
                class="pa-0"
                type="number"
                :rules="maxRules"
                dense
                min-height
                outlined
                :disabled="table ? true : false " />
            </v-col>
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.width') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="width"
                class="pa-0"
                :rules="maxRules"
                dense
                min-height
                outlined />
            </v-col>
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.height') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="height"
                class="pa-0"
                :rules="maxRules"
                dense
                min-height
                outlined />
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid>
          <div class="d-flex">
            <v-subheader class="px-0">
              {{ $t('notes.plugin.table.adjustment') }}
            </v-subheader>
            <v-divider class="spacesOverviewHorizontalSeparator mx-2 ma-auto" />
          </div>

          <v-row align="center">
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.header') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <select
                v-model="headerSelected"
                name="priority"
                class="input-block-level ignore-vuetify-classes my-3">
                <option
                  v-for="item in header"
                  :key="item.name"
                  :value="item.name">
                  {{ $t('label.header.'+item.name.toLowerCase()) }}
                </option>
              </select>
            </v-col>
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.border') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="border"
                class="pa-0"
                type="number"
                :rules="maxRules"
                dense
                min-height
                outlined />
            </v-col>
            <v-col cols="9">
              <v-subheader>
                {{ $t('notes.plugin.table.spacing') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="spacing"
                class="pa-0"
                type="number"
                :rules="maxRules"
                dense
                min-height
                outlined />
            </v-col>
            <v-col cols="9">
              <v-subheader>
                {{ $t('notes.plugin.table.internal') }}
              </v-subheader>
            </v-col>

            <v-col cols="3">
              <v-text-field
                v-model="internal"
                class="pa-0"
                type="number"
                :rules="maxRules"
                dense
                min-height
                outlined />
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid>
          <div class="d-flex">
            <v-subheader class="px-0">
              {{ $t('notes.plugin.table.alignment') }}
            </v-subheader>
            <v-divider class="spacesOverviewHorizontalSeparator mx-2 ma-auto" />
          </div>

          <v-row align="center">
            <v-col cols="3">
              <v-subheader>
                {{ $t('notes.plugin.table.alignment') }}
              </v-subheader>
            </v-col>
            <v-col cols="3">
              <select
                v-model="alignmentSelected"
                name="priority"
                class="input-block-level ignore-vuetify-classes my-3">
                <option
                  v-for="item in alignment"
                  :key="item.name"
                  :value="item.name">
                  {{ $t('label.alignment.'+item.name.toLowerCase()) }}
                </option>
              </select>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid>
          <div class="d-flex">
            <v-subheader class="px-0">
              {{ $t('notes.plugin.table.summary') }}
            </v-subheader>
            <v-divider class="spacesOverviewHorizontalSeparator mx-2 ma-auto" />
          </div>
          <v-row align="center">
            <v-col>
              <v-text-field
                v-model="summary"
                :placeholder="$t('notes.plugin.table.summaryPlaceholder')"
                class="pa-0"
                dense
                min-height
                outlined />
            </v-col>
          </v-row>
          <div class="accessibility-text d-flex">
            <div class="btn-accessibility me-2">
              <v-icon size="18" class="primary v-btn--round">mdi-human</v-icon>
            </div>
            <span class="caption text-light-color font-italic">{{ $t('notes.plugin.table.summaryText') }}</span>
          </div>
        </v-container>
      </template>
      <template slot="footer">
        <div class="d-flex">
          <v-spacer />
          <div class="VuetifyApp d-flex">
            <div class="d-btn">
              <v-btn class="btn mr-2" @click="close">
                <template>
                  {{ $t('notes.button.cancel') }}
                </template>
              </v-btn>

              <v-btn class="btn btn-primary" @click="insertTable">
                <template>
                  {{ $t('notes.button.ok') }}
                </template>
              </v-btn>
            </div>
          </div>
        </div>
      </template>
    </exo-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    limit: 0,
    maxRules: [],
    lines: 1,
    columns: 1,
    width: 500,
    height: 25,
    border: 1,
    spacing: 1,
    internal: 0,
    alignmentSelected: '',
    table: '',
    countIdTable: 1,
    summary: '',
    alignment: [
      {name: ''},{name: 'left'},{name: 'center'},{name: 'right'}
    ],
    headerSelected: '',
    header: [
      {name: ''},{name: 'FIRST.ROW'},{name: 'FIRST.COLUMN'},{name: 'BOTH'}
    ],
    closeAll: true,
    drawer: false,
  }),
  props: {
    instance: {
      type: Object,
      default: () => null,
    },
  },
  created() {
    this.maxRules = [v => v >= 0];
    this.$root.$on('note-table-plugins', () => {
      this.closeAll = true;
    });
  },
  methods: {
    open(table, summary) {
      this.table = table;
      if (table) {
        this.width = table.width;
        this.height = table.height;
        this.border = table.border;
        this.internal = table.cellpadding;
        this.spacing = table.cellspacing;
        this.alignmentSelected = table.align;
        this.headerSelected = table.tHead;
        if (summary) {
          this.summary = summary;
        }
      }
      this.$refs.customTableDrawer.open();
    },
    close() {
      this.$refs.customTableDrawer.close();
    },
    closeAllDrawer() {
      if (this.closeAll) {
        this.$emit('closed');
      }
    },
    backToPlugins() {
      this.closeAll = false;
    },
    insertTable() {
      this.close();
      this.addTable();
    },
    addTable() {
      if (!this.table) {
        const div = document.createElement('DIV');
        const elementContainer = document.createElement('DIV');
        const tableContainerId = Math.random().toString(16).slice(2);
        elementContainer.setAttribute('id', `table-${tableContainerId}`);
        const table = document.createElement('TABLE');
        const contentSummary = document.createElement('p');
        contentSummary.setAttribute('id', `summary-${tableContainerId}`);
        contentSummary.appendChild(document.createTextNode(this.summary));
        contentSummary.style.display = 'none';
        const idTable= `table${this.countIdTable}`;
        table.setAttribute('id', idTable);
        elementContainer.appendChild(contentSummary);
        elementContainer.appendChild(table);
        div.appendChild(elementContainer);
        table.setAttribute('width', this.width);
        table.setAttribute('border', this.border);
        table.setAttribute('cellPadding', this.internal);
        table.setAttribute('height', this.height);
        table.setAttribute('cellSpacing', this.spacing);
        table.setAttribute('align', this.alignmentSelected);
        table.setAttribute('tHead', this.headerSelected);

        const tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);

        for (let i = 0; i < this.lines; i++) {
          const tr = document.createElement('TR');
          tableBody.appendChild(tr);

          for (let j = 0; j < this.columns; j++) {
            const td = document.createElement('TD');
            const widthTd =this.columns !== 0 ? this.width/Math.abs(this.columns) : this.width;
            const heightTd =this.lines !== 0 ? this.height/Math.abs(this.lines) : this.height;
            td.width = widthTd.toString();
            td.height = heightTd.toString();
            tr.appendChild(td);
          }
        }
        this.instance.insertHtml(div.innerHTML);
        const selector = `#${idTable} br`;
        const elements= CKEDITOR.instances['notesContent'].document.find(selector);
        for (let i = 0; i<elements.$.length ;i++){
          elements.$[i].remove();
        }
        this.countIdTable+=1;
      } else {
        this.instance.elementPath().contains('table', 1).setAttribute('width', this.width);
        this.instance.elementPath().contains('table', 1).setAttribute('height', this.height);
        this.instance.elementPath().contains('table', 1).setAttribute('border', this.border);
        this.instance.elementPath().contains('table', 1).setAttribute('cellPadding', this.internal);
        this.instance.elementPath().contains('table', 1).setAttribute('cellSpacing', this.spacing);
        this.instance.elementPath().contains('table', 1).setAttribute('align', this.alignmentSelected);
        this.instance.elementPath().contains('table', 1).setAttribute('tHead', this.headerSelected);
        this.instance.elementPath().contains('table', 1).setAttribute('summary', this.summary);
        const tableSummary = this.instance.elementPath().contains( 'div', 1 ).$.firstChild;
        tableSummary.innerText = this.summary;
        this.$root.$emit('updateData', this.instance.getData());
      }
    },
  }
};
</script>
