define((()=>(()=>{"use strict";var e={d:(t,n)=>{for(var i in n)e.o(n,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{init:()=>g});var n=function(){var e=this,t=e._self._c;return t("v-app",{staticClass:"connectorsAdminSettings"},[t("v-main",{staticClass:"white rounded-lg ma-5 px-7 pb-2"},[t("agenda-admin-connector-settings",{attrs:{settings:e.settings}}),e._v(" "),t("agenda-admin-conference-settings",{attrs:{settings:e.settings}})],1)],1)};function i(e,t,n,i,s,r,o,a){var c,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=n,d._compiled=!0),i&&(d.functional=!0),r&&(d._scopeId="data-v-"+r),o?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},d._ssrRegister=c):s&&(c=a?function(){s.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:s),c)if(d.functional){d._injectStyles=c;var l=d.render;d.render=function(e,t){return c.call(t),l(e,t)}}else{var p=d.beforeCreate;d.beforeCreate=p?[].concat(p,c):[c]}return{exports:e,options:d}}n._withStripped=!0;const s=i({data:()=>({settings:null}),created(){this.refreshSettings().finally((()=>this.$root.$applicationLoaded()))},methods:{refreshSettings(){return this.$settingsService.getUserSettings().then((e=>this.settings=e))}}},n,[],!1,null,null,null).exports;var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"white rounded-lg"},[t("h4",{staticClass:"py-5 font-weight-bold"},[e._v("\n    "+e._s(e.$t("agenda.agendaConnectors"))+"\n  ")]),e._v(" "),t("v-divider"),e._v(" "),t("v-data-table",{attrs:{headers:e.headers,items:e.connectors,"items-per-page":e.itemsPerPage,"hide-default-footer":e.hideFooter,"footer-props":{itemsPerPageText:`${e.$t("agenda.itemsPerPage")}:`},"no-data-text":e.$t("agenda.noConnectors"),"disable-sort":""},scopedSlots:e._u([{key:"item",fn:function(n){return[t("tr",[t("td",[t("div",{staticClass:"align-center"},[t("v-avatar",{attrs:{tile:"",size:"40"}},[t("img",{attrs:{alt:n.item.name,src:n.item.avatar}})])],1)]),e._v(" "),t("td",[t("div",{staticClass:"align-center"},[e._v("\n            "+e._s(e.$t(n.item.name))+"\n          ")])]),e._v(" "),t("td",[t("div",{staticClass:"align-center"},[e._v("\n            "+e._s(e.$t(n.item.description))+"\n          ")])]),e._v(" "),t("td",[t("div",{staticClass:"align-center"},[t("v-text-field",{ref:`${n.item.name}ApiInput`,class:n.item.isOauth?"mx-2 pa-0":"mx-2 pa-0 me-8",attrs:{readonly:!n.item.apiEditing,placeholder:n.item.isOauth?e.$t("agenda.connectorClientApiKey"):e.$t("agenda.noConnectorClientApiKey"),dense:""},scopedSlots:e._u([{key:"prepend",fn:function(){return[t("i",{class:n.item.isOauth?"uiIcon uiIconLock primary--text mt-1":"uiIcon uiIconLock grey--text mt-1"})]},proxy:!0},n.item.isOauth?{key:"append-outer",fn:function(){return[t("v-slide-x-reverse-transition",{attrs:{mode:"out-in"}},[t("i",{key:`icon-${n.item.apiEditing}`,class:n.item.apiEditing?"uiIcon uiIconTick clickable success--text mt-1":"uiIcon uiIconEdit clickable primary--text mt-1",on:{click:function(t){return e.editApiKey(n.item)}}})])]},proxy:!0}:null],null,!0),model:{value:n.item.apiKey,callback:function(t){e.$set(n.item,"apiKey",t)},expression:"props.item.apiKey"}})],1)]),e._v(" "),t("td",[t("v-text-field",{ref:`${n.item.name}SecretInput`,class:n.item.mandatorySecretKey?"mx-2 pa-0":"mx-2 pa-0 me-8",attrs:{readonly:!n.item.secretEditing,placeholder:n.item.mandatorySecretKey?e.$t("agenda.connectorSecretApiKey"):e.$t("agenda.noConnectorClientSecretKey"),dense:""},scopedSlots:e._u([{key:"prepend",fn:function(){return[t("em",{class:n.item.mandatorySecretKey?"uiIcon uiIconLock primary--text mt-1":"uiIcon uiIconLock grey--text mt-1"})]},proxy:!0},n.item.mandatorySecretKey?{key:"append-outer",fn:function(){return[t("v-slide-x-reverse-transition",{attrs:{mode:"out-in"}},[t("em",{key:`icon-${n.item.secretEditing}`,class:n.item.secretEditing?"uiIcon uiIconTick clickable success--text mt-1":"uiIcon uiIconEdit clickable primary--text mt-1",on:{click:function(t){return e.editSecretKey(n.item)}}})])]},proxy:!0}:null],null,!0),model:{value:n.item.secretKey,callback:function(t){e.$set(n.item,"secretKey",t)},expression:"props.item.secretKey"}})],1),e._v(" "),t("td",[t("div",{staticClass:"d-flex flex-column align-center"},[t("v-switch",{staticClass:"connectorSwitcher my-auto",attrs:{disabled:n.item.isOauth&&(n.item.loading||n.item.editing||!n.item.apiKey),loading:n.item.loading,ripple:!1,color:"primary"},on:{change:function(t){return e.enableDisableConnector(n.item)}},model:{value:n.item.enabled,callback:function(t){e.$set(n.item,"enabled",t)},expression:"props.item.enabled"}})],1)])])]}}])})],1)};r._withStripped=!0;const o=i({props:{settings:{type:Object,default:()=>null}},data:()=>({connectors:[],headers:[],itemsPerPage:10}),computed:{hideFooter(){return this.connectors&&this.connectors.length<=this.itemsPerPage}},watch:{settings(){this.refreshConnectorsList()}},mounted(){document.dispatchEvent(new CustomEvent("hideTopBarLoading")),this.skeleton=!1},created(){this.headers=[{text:this.$t("agenda.avatar"),align:"center"},{text:this.$t("agenda.name"),align:"center"},{text:this.$t("agenda.description"),align:"center"},{text:this.$t("agenda.connectorClientApiKey"),align:"center",width:"40%"},{text:this.$t("agenda.connectorSecretApiKey"),align:"center",width:"15%"},{text:this.$t("agenda.active"),align:"center"}],document.addEventListener("agenda-connectors-refresh",this.refreshConnectorsList)},methods:{refreshConnectorsList(){const e=extensionRegistry.loadExtensions("agenda","connectors")||[];this.settings&&this.settings.remoteProviders?e.forEach((e=>{const t=this.settings.remoteProviders.find((t=>t.name===e.name));e.enabled=t&&t.enabled||!1,e.apiKey=t&&t.apiKey||"",e.secretKey=t&&t.secretKey||"",e.loading=!1,e.apiEditing=!1,e.secretEditing=!1})):e.forEach((e=>e.enabled=!1)),this.connectors=e},enableDisableConnector(e){e.loading=!0,this.$settingsService.saveRemoteProviderStatus(e.name,e.enabled,e.isOauth).then((t=>Object.assign(e,t))).catch((()=>e.enabled=!e.enabled)).finally((()=>e.loading=!1))},editApiKey(e){e.apiEditing?this.$settingsService.saveRemoteProviderApiKey(e.name,e.apiKey).then((t=>Object.assign(e,t))).finally((()=>e.apiEditing=!1)):(e.apiEditing=!0,this.$nextTick((()=>{const t=this.$refs[`${e.name}ApiInput`];t&&t.focus()})))},editSecretKey(e){e.secretEditing?this.$settingsService.saveRemoteProviderSecretKey(e.name,e.secretKey).then((t=>Object.assign(e,t))).finally((()=>e.secretEditing=!1)):(e.secretEditing=!0,this.$nextTick((()=>{const t=this.$refs[`${e.name}SecretInput`];t&&t.focus()})))}}},r,[],!1,null,null,null).exports;var a=function(){var e=this,t=e._self._c;return e.isWebConferencingEnabled?t("div",{staticClass:"white rounded-lg pb-5"},[t("h4",{staticClass:"py-5 font-weight-bold"},[e._v("\n    "+e._s(e.$t("agenda.agendaConferences"))+"\n  ")]),e._v(" "),t("div",{staticClass:"d-flex flex-row"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedProviderType,expression:"selectedProviderType"}],staticClass:"subtitle-1 ignore-vuetify-classes my-4 me-2",on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.selectedProviderType=t.target.multiple?n:n[0]},e.saveSelectedProvider]}},e._l(e.webConferenceProviderChoices,(function(n){return t("option",{key:n.type,domProps:{value:n.type}},[e._v("\n        "+e._s(e.$t(n.title))+"\n      ")])})),0),e._v(" "),e.loading?t("v-progress-circular",{staticClass:"ms-3 my-auto",attrs:{indeterminate:"",color:"primary",size:"20"}}):e._e(),e._v(" "),t("v-alert",{staticClass:"my-auto",attrs:{type:"success",dismissible:""},model:{value:e.saved,callback:function(t){e.saved=t},expression:"saved"}},[e._v("\n      "+e._s(e.$t("agenda.webConferencingProviderSaved"))+"\n    ")])],1)]):e._e()};a._withStripped=!0;const c={"agenda-admin-settings":s,"agenda-admin-connector-settings":o,"agenda-admin-conference-settings":i({props:{settings:{type:Object,default:()=>null}},data:()=>({loading:!1,saved:!1,isWebConferencingEnabled:!1,emptyConferenceProvider:{type:"",title:"agenda.emptyWebConferenceProvider"},conferenceProviders:[]}),computed:{webConferenceProviderChoices(){return[this.emptyConferenceProvider,...this.conferenceProviders]}},watch:{settings(){this.refreshConferencesList()}},mounted(){this.$webConferencingService.checkWebConferencingEnabled().then((e=>{this.isWebConferencingEnabled=e}))},methods:{refreshConferencesList(){return this.$webConferencingService.getAllProviders().then((e=>{this.conferenceProviders=[],e&&e.length&&e.forEach((e=>{if(!e.isInitialized||!e.linkSupported&&!e.groupSupported)return;const t={title:e.getTitle(),type:e.getType(),enabled:!1};this.settings&&this.settings.webConferenceProviders&&this.settings.webConferenceProviders.length&&(t.enabled=this.settings.webConferenceProviders.find((e=>e===t.type)),t.enabled&&(this.selectedProviderType=t.type)),this.conferenceProviders.push(t)})),this.selectedProviderType||(this.selectedProviderType="")}))},saveSelectedProvider(){this.saved=!1,this.loading=!0,this.$settingsService.saveEnabledWebConferencingProvider(this.selectedProviderType).then((()=>this.settings.webConferenceProviders=[this.selectedProviderType])).then(this.refreshConferencesList).finally((()=>{window.setTimeout((()=>{this.loading=!1,this.saved=!0,window.setTimeout((()=>this.saved=!1),5e3)}),200)}))}}},a,[],!1,null,null,null).exports};for(const e in c)Vue.component(e,c[e]);if(extensionRegistry){const e=extensionRegistry.loadComponents("agendaAdminSettings");e&&e.length>0&&e.forEach((e=>{Vue.component(e.componentName,e.componentOptions)}))}Vue.use(Vuetify);const d=new Vuetify(eXo.env.portal.vuetifyPreset);document.dispatchEvent(new CustomEvent("displayTopBarLoading"));const l="AgendaAdminSettingsApplication",p=eXo&&eXo.env.portal.language||"en",u=`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.Agenda-${p}.json`;function g(){exoi18n.loadLanguageAsync(p,u).then((e=>{Vue.createApp({template:`<agenda-admin-settings id="${l}" />`,vuetify:d,i18n:e},`#${l}`,"Agenda administration")}))}return t})()));