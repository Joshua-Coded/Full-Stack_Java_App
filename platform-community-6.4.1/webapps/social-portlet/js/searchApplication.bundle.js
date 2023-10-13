define((()=>(()=>{"use strict";var e={d:(t,s)=>{for(var a in s)e.o(s,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:s[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{init:()=>v});var s=function(){var e=this,t=e._self._c;return t("v-app",{attrs:{role:"search"}},[t("v-btn",{staticClass:"transparent",attrs:{title:e.buttonTooltip,icon:""},on:{click:function(t){e.dialog=!e.dialog}}},[t("i",{staticClass:"v-icon fas fa-search icon-medium-size icon-default-color position-static d-flex"})]),e._v(" "),t("v-fade-transition",[t("v-flex",{directives:[{name:"show",rawName:"v-show",value:e.dialog||e.standalone,expression:"dialog || standalone"}],attrs:{id:"searchDialog",transition:"fade-transition","hide-overlay":""}},[t("v-card",{attrs:{flat:""}},[e.loading?e._e():[t("search-toolbar",{ref:"toolbar",attrs:{standalone:e.standalone},on:{search:function(t){e.term=t},"close-search":function(t){e.dialog=!1}}}),e._v(" "),t("search-results",{ref:"results",attrs:{connectors:e.connectors,term:e.term,standalone:e.standalone},on:{"favorites-changed":function(t){e.favorites=t},"tags-changed":function(t){e.selectedTags=t},"filter-changed":e.changeURI}})]],2)],1)],1)],1)};function a(e,t,s,a,n,i,r,o){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=s,c._compiled=!0),a&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),r?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=l):n&&(l=o?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),l)if(c.functional){c._injectStyles=l;var h=c.render;c.render=function(e,t){return l.call(t),h(e,t)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:e,options:c}}s._withStripped=!0;const n=a({props:{connectors:{type:Array,default:()=>[]},skinUrls:{type:Array,default:()=>[]}},data:()=>({dialog:!1,loading:!0,term:null,favorites:!1,selectedTags:[],standalone:!1,pageUri:null,pageTitle:null}),computed:{buttonTooltip(){return this.$t("Search.button.tooltip.open",{0:"Ctrl + Alt + F"})},searchUri:()=>`${eXo.env.portal.context}/${eXo.env.portal.portalName}/search`},watch:{term(){this.changeURI()},favorites(){this.changeURI()},selectedTags(){this.changeURI()},loading(){this.loading||(document.dispatchEvent(new CustomEvent("hideTopBarLoading")),this.$root.$applicationLoaded())},dialog(){this.dialog?($("body").addClass("hide-scroll"),this.$root.$emit("search-opened"),this.changeURI()):($("body").removeClass("hide-scroll"),this.$root.$emit("search-closed"),window.history.replaceState("",this.pageTitle,this.pageUri))}},created(){this.skinUrls&&this.skinUrls.length&&this.skinUrls.forEach((e=>{if(!document.querySelector(`link[href="${e}"]`)){const t=document.createElement("link");t.type="text/css",t.rel="stylesheet",t.href=e,document.head.appendChild(t)}}));const e=eXo.env.portal.language,t=`${eXo.env.portal.context}/${eXo.env.portal.rest}`,s=[`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.Portlets-${e}.json`];if(this.connectors&&this.connectors.length&&this.connectors.forEach((a=>{a.i18nBundle&&s.push(`${t}/i18n/bundle/${a.i18nBundle}-${e}.json`)})),exoi18n.loadLanguageAsync(e,s).then((()=>this.$nextTick())).finally((()=>this.loading=!1)),this.pageUri=window.location.href,this.pageTitle=window.document.title,this.standalone=0===window.location.pathname.indexOf(this.searchUri),this.standalone){const e=window.location.search&&window.location.search.substring(1);if(e){const t=JSON.parse(`{"${decodeURI(e).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`),s=t.types&&window.decodeURIComponent(t.types);s&&s.trim().length&&this.connectors.forEach((e=>{e.enabled=s.includes(e.name)})),this.term=t.q||"",this.favorites="true"===t.favorites,this.selectedTags=t.tags&&t.tags.split(",")||[]}}else $(document).on("keydown",(e=>{"Escape"===e.key&&(this.dialog=!1),e.ctrlKey&&e.altKey&&"f"===e.key&&(this.dialog=!this.dialog)}));document.addEventListener("search-metadata-tag",this.open)},mounted(){this.dialog=!0},methods:{open(){this.dialog=!0},changeURI(){const e=window.encodeURIComponent(this.term||""),t=this.connectors.filter((e=>e.enabled)).map((e=>e.name));let s="";t.length!==this.connectors.length&&(s=window.encodeURIComponent(t.join(",")));let a=`${this.searchUri}?q=${e}&types=${s}`;this.favorites&&(a+="&favorites=true"),this.selectedTags&&this.selectedTags.length&&(a+=`&tags=${this.selectedTags.join(",")}`),window.history.replaceState("",this.$t("Search.page.title"),a)}}},s,[],!1,null,null,null).exports;var i=function(){var e=this,t=e._self._c;return t("v-list-item",{staticClass:"px-0 my-2"},[t("v-list-item-content",{staticClass:"align-start"},[t("v-text-field",{ref:"searchInput",staticClass:"fill-width my-auto pt-0 px-4 searchInputParent",attrs:{id:"searchInput",placeholder:e.$t("Search.label.inputPlaceHolder"),type:"text",autocomplete:"off"},model:{value:e.term,callback:function(t){e.term=t},expression:"term"}})],1),e._v(" "),t("v-list-item-action",{staticClass:"align-end d-flex flex-row ms-0 me-4"},[e.term?t("v-btn",{attrs:{text:"",color:"error"},on:{click:e.clearSearchTerm}},[e._v("\n      "+e._s(e.$t("search.connector.label.clear"))+"\n    ")]):e._e(),e._v(" "),e.standalone?e._e():t("v-btn",{staticClass:"searchCloseIcon transparent",attrs:{"aria-label":e.$t("Search.button.close.label"),icon:""},on:{click:function(t){return e.$emit("close-search")}}},[t("v-icon",[e._v("mdi-close")])],1)],1)],1)};i._withStripped=!0;const r=a({props:{standalone:{type:Boolean,default:!1}},data:()=>({startSearchAfterInMilliseconds:600,endTypingKeywordTimeout:50,startTypingKeywordTimeout:0,term:null,typing:!1}),watch:{term(){this.term?(this.startTypingKeywordTimeout=Date.now()+this.startSearchAfterInMilliseconds,this.typing||(this.typing=!0,this.waitForEndTyping())):this.$emit("search")}},created(){if(this.$root.$on("search-opened",(()=>{window.setTimeout((()=>{this.$refs.searchInput.$el.querySelector("input").focus()}),200)})),this.standalone){const e=window.location.search&&window.location.search.substring(1);if(e){const t=JSON.parse(`{"${decodeURI(e).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`);this.term=window.decodeURIComponent(t.q),this.dialog=!0}}},mounted(){window.setTimeout((()=>{this.$refs.searchInput.$el.querySelector("input").focus()}),200)},methods:{clearSearchTerm(){this.term="",window.setTimeout((()=>{this.$refs.searchInput.$el.querySelector("input").focus()}),200)},waitForEndTyping(){window.setTimeout((()=>{Date.now()>this.startTypingKeywordTimeout?(this.typing=!1,this.$emit("search",this.term)):this.waitForEndTyping()}),this.endTypingKeywordTimeout)}}},i,[],!1,null,null,null).exports;var o=function(){var e=this,t=e._self._c;return t("v-flex",[t("div",{staticClass:"searchConnectorsParent d-flex align-center mx-4 mb-4 border-box-sizing"},[t("v-chip",{staticClass:"ms-1 me-2 border-color",attrs:{outlined:!e.favorites,color:e.favorites?"primary":""},on:{click:e.selectFavorites}},[t("v-icon",{staticClass:"pb-1 pe-2 yellow--text text--darken-2",attrs:{size:"16"}},[e._v("\n        fas fa-star\n      ")]),e._v(" "),t("span",{staticClass:"subtitle-1"},[e._v(e._s(e.$t("search.connector.label.favorites")))])],1),e._v(" "),t("search-tag-selector",{on:{"tags-changed":e.selectTags}}),e._v(" "),t("v-menu",{attrs:{"close-on-content-click":!1,"content-class":"connectors-list",bottom:"",right:"","offset-y":""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t("v-chip",e._g(e._b({staticClass:"border-color mx-1 subtitle-1",attrs:{outlined:!e.allEnabled,color:e.allEnabled?"primary":""}},"v-chip",a,!1),s),[t("span",{staticClass:"me-8"},[e._v(e._s(e.$t("search.connector.label.all")))]),e._v(" "),t("i",{staticClass:"fas fa-chevron-down"})])]}}]),model:{value:e.connectorsListOpened,callback:function(t){e.connectorsListOpened=t},expression:"connectorsListOpened"}},[e._v(" "),t("v-list",{staticClass:"pa-0",attrs:{dense:""}},[t("v-list-item",{on:{click:function(t){return e.selectAllConnector()}}},[t("v-list-item-title",{staticClass:"d-flex align-center"},[t("v-checkbox",{staticClass:"ma-0",attrs:{"input-value":e.allEnabled,ripple:!1,readonly:"",dense:""}}),e._v(" "),t("span",{staticClass:"subtitle-1"},[e._v(e._s(e.$t("search.connector.label.all")))])],1)],1),e._v(" "),e._l(e.sortedConnectors,(function(s){return t("v-list-item",{key:s.name,staticClass:"clickable",attrs:{dense:""},on:{click:function(t){return e.selectConnector(s)}}},[t("v-list-item-title",{staticClass:"d-flex align-center"},[t("v-checkbox",{staticClass:"ma-0",attrs:{"input-value":!e.allEnabled&&s.enabled,ripple:!1,dense:""}}),e._v(" "),t("span",{staticClass:"subtitle-1"},[e._v(e._s(s.label))])],1)],1)}))],2)],1),e._v(" "),e.allEnabled?e._e():t("div",{staticClass:"selected-connectors"},e._l(e.enabledConnectors,(function(s){return t("v-chip",{key:s.name,staticClass:"mx-1 border-color",attrs:{color:"primary"}},[t("span",{staticClass:"text-capitalize-first-letter subtitle-1"},[e._v(e._s(s.label))]),e._v(" "),t("v-icon",{staticClass:"ms-2",attrs:{size:"10",right:""},on:{click:function(t){return e.selectConnector(s)}}},[e._v("\n          fas fa-times\n        ")])],1)})),1)],1),e._v(" "),e.hasResults?t("v-row",{staticClass:"searchResultsParent justify-center justify-md-start mx-4 border-box-sizing"},e._l(e.resultsArray,(function(s){return t("v-col",{key:s.domId,staticClass:"searchCard pa-0",attrs:{cols:"12",md:"6",lg:"4",xl:"3"}},[t("search-result-card",{attrs:{result:s,term:e.term}})],1)})),1):e._e(),e._v(" "),e.noResults?t("v-flex",{staticClass:"searchNoResultsParent d-flex my-auto border-box-sizing"},[t("div",{staticClass:"d-flex flex-column ma-auto text-center text-sub-title"},[t("div",[t("i",{staticClass:"uiIconSearchLight text-sub-title my-auto"},[t("i",{staticClass:"uiIconCloseLight text-sub-title"})])]),e._v(" "),t("span",{staticClass:"headline"},[e._v(e._s(e.$t("Search.noResults")))]),e._v(" "),t("span",{staticClass:"caption"},[e._v(e._s(e.$t("Search.noResultsMessage")))])])]):e._e(),e._v(" "),e.hasMore?t("v-flex",{staticClass:"searchLoadMoreParent d-flex my-4 border-box-sizing"},[t("v-btn",{staticClass:"btn mx-auto",attrs:{loading:e.searching>0,disabled:e.searching>0},on:{click:e.loadMore}},[e._v("\n      "+e._s(e.$t("Search.button.loadMore"))+"\n    ")])],1):e._e()],1)};o._withStripped=!0;const l=a({props:{term:{type:String,default:null},connectors:{type:Array,default:()=>[]},standalone:{type:Boolean,default:!1}},data:()=>({index:0,totalSize:0,results:null,pageSize:10,limit:10,selectedTags:[],favorites:!1,allEnabled:!0,searching:0,abortController:null,searchInitialized:!1,connectorsListOpened:!1}),computed:{hasMore(){return this.totalSize&&this.enabledConnectors&&this.enabledConnectors.filter((e=>e.hasMore)).length},hasResults(){return this.resultsArray&&this.resultsArray.length},noResults(){return this.searchInitialized&&!this.hasResults&&(this.term||this.favorites)&&!this.searching&&this.results&&Object.keys(this.results).length},sortedConnectors(){return this.connectors?this.connectors.map((e=>(e.label=this.$t(`search.connector.label.${e.name}`),e))).sort(((e,t)=>e.label>t.label?1:e.label<t.label?-1:0)):[]},enabledConnectors(){return this.sortedConnectors&&this.sortedConnectors.filter((e=>e.enabled))||[]},enabledConnectorNames(){return this.enabledConnectors.map((e=>e.name))},searchEnabledConnectors(){return this.enabledConnectors.filter((e=>(e.favoritesEnabled||!this.favorites)&&(e.tagsEnabled||!this.selectedTags.length)))},resultsArray(){if(!this.results||!this.totalSize||this.searching<0)return;const e=Object.keys(this.results);let t={};return e.forEach((e=>{this.enabledConnectorNames.includes(e)&&(t[e]=this.results[e])})),t=Object.values(t).flat(),this.favorites&&(t=t.filter((e=>e.metadatas&&e.metadatas.favorites||e.favorite||e.isFavorite))),t.sort(((e,t)=>e.index-t.index))}},watch:{searching(e,t){e&&!t?document.dispatchEvent(new CustomEvent("displayTopBarLoading")):t&&!e&&document.dispatchEvent(new CustomEvent("hideTopBarLoading"))},selectedTags(){this.$emit("tags-changed",this.selectedTags),this.searchInitialized&&this.$nextTick().then(this.search)},favorites(){this.$emit("favorites-changed",this.favorites),this.searchInitialized&&this.$nextTick().then(this.search)},term(){this.totalSize=0,this.limit=this.pageSize,this.searchInitialized&&this.search()}},created(){$(document).on("click",(e=>{e.target&&!$(e.target).parents(".connectors-list").length&&(this.connectorsListOpened=!1)})),this.$root.$on("refresh",((e,t)=>{!!t==!!this.favorites&&(this.$set(this.results,e.name,[]),this.retrieveConnectorResults(e))}));let e=!0;this.connectors.forEach((t=>{e=e&&t.enabled})),this.allEnabled=!!e;const t=window.location.search&&window.location.search.substring(1);if(t){const e=JSON.parse(`{"${decodeURI(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`);this.favorites="true"===e.favorites}this.favorites||this.term?this.search():this.searchInitialized=!0},methods:{selectFavorites(){this.favorites||document.dispatchEvent(new CustomEvent("search-favorites-selected")),this.favorites=!this.favorites,this.$emit("filter-changed")},selectTags(e){this.selectedTags=e||[],this.$emit("filter-changed")},selectAllConnector(){this.allEnabled||(this.connectors.forEach((e=>{e.enabled=!0})),this.allEnabled=!0,window.setTimeout((()=>{this.$emit("filter-changed"),this.$nextTick().then(this.search)}),50))},selectConnector(e){if(!e)return;e.enabled&&this.connectors.length!==this.enabledConnectors.length||document.dispatchEvent(new CustomEvent("search-connector-selected",{detail:e.name})),this.connectors.length===this.enabledConnectors.length?this.connectors.forEach((t=>{t.enabled=t.name===e.name})):e.enabled&&1===this.enabledConnectors.length?this.connectors.forEach((e=>{e.enabled=!0})):e.enabled=!e.enabled;let t=!0;this.connectors.forEach((e=>{t=t&&e.enabled})),this.allEnabled=t,window.setTimeout((()=>{this.$emit("filter-changed"),this.$nextTick().then(this.search)}),50)},loadMore(){this.limit+=this.pageSize,this.search()},search(){if(this.abortController&&this.abortController.abort(),!this.term&&!this.favorites&&!this.selectedTags.length)return void(this.results=null);this.results={},this.connectors.forEach((e=>{e.size=-1,this.results[e.name]=[]}));let e={};window.AbortController&&(this.abortController=new window.AbortController,e=this.abortController.signal),this.searchEnabledConnectors.forEach((t=>{(-1===t.size||t.hasMore)&&this.retrieveConnectorResults(t,e)}))},retrieveConnectorResults(e,t){if(e)return window.require([e.jsModule],(s=>{let a={headers:{Accept:"application/json"}};t&&(a=Object.assign(a,t)),0===e.uri.indexOf("/")&&(a.credentials="include"),this.searching++;let n=e.uri.replace("{keyword}",window.encodeURIComponent(this.term||"")).replace("{limit}",this.limit);return this.favorites&&(n.includes("?")?n+="&favorites=true":n+="?favorites=true"),this.selectedTags&&this.selectedTags.length&&this.selectedTags.forEach((e=>{const t=e.replace("#","");n.includes("?")?n+=`&tags=${t}`:n+=`?tags=${t}`})),(s.fetchSearchResult?s.fetchSearchResult(n,a):fetch(n,a)).then((e=>{if(e&&e.ok)return e.json();throw new Error("Error getting result")})).then((e=>s&&s.formatSearchResult?s.formatSearchResult(e,this.term||""):e)).then((t=>{t&&t.length&&(e.size=t.length,e.hasMore=e.enabled&&e.uri&&e.size>=this.limit,t.forEach((t=>{t.connector=e,t.index=++this.index,t.domId=t.domId||`SearchResult${t.index}`})),this.$set(this.results,e.name,t),this.totalSize=this.results[e.name].length)})).catch((t=>e.error=t)).finally((()=>{this.searching--,this.searchInitialized=!0}))}))}}},o,[],!1,null,null,null).exports;var c=function(){return(0,this._self._c)("div",{attrs:{id:this.id}})};c._withStripped=!0;const h=a({props:{term:{type:String,default:null},result:{type:Object,default:()=>null}},data:()=>({id:`SearchResult${String(parseInt(1e4*Math.random()))}`}),mounted(){if(this.result&&this.result.connector){const e=this;new(Vue.extend({data:()=>({result:this.result,term:this.term,id:this.id}),methods:{refresh(){e.$root.$emit("refresh",e.result.connector)},refreshFavorites(){e.$root.$emit("refresh",e.result.connector,!0)}},template:`\n          <${this.result.connector.uiComponent} :id="id" :result="result" :term="term" @refresh="refresh" @refresh-favorite="refreshFavorites()" />\n        `}))({vuetify:Vue.prototype.vuetifyOptions,i18n:exoi18n.i18n}).$mount(`#${this.id}`),this.$forceUpdate()}}},c,[],!1,null,null,null).exports;var d=function(){var e=this,t=e._self._c;return t("span",[t("search-tag-list",{model:{value:e.selectedTags,callback:function(t){e.selectedTags=t},expression:"selectedTags"}}),e._v(" "),e._l(e.selectedTags,(function(s,a){return t("v-chip",{key:s,staticClass:"border-color mx-1",attrs:{color:"primary"}},[t("span",{staticClass:"subtitle-1"},[e._v("#"+e._s(s))]),e._v(" "),t("v-icon",{staticClass:"ms-2",attrs:{size:"10",right:""},on:{click:function(t){return e.deleteTag(a)}}},[e._v("\n      fas fa-times\n    ")])],1)}))],2)};d._withStripped=!0;const u=a({data:()=>({selectedTags:[]}),watch:{selectedTags(){this.$emit("tags-changed",this.selectedTags)}},created(){if(this.$root.tagName)this.selectedTags=[this.$root.tagName];else{const e=window.location.search&&window.location.search.substring(1);if(e){const t=JSON.parse(`{"${decodeURI(e).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')}"}`).tags;t&&t.length&&(this.selectedTags=t.split(","))}}document.addEventListener("search-metadata-tag",this.selectTag)},methods:{deleteTag(e){this.selectedTags.splice(e,1)},selectTag(e){e&&e.detail&&(this.selectedTags=[e.detail])}}},d,[],!1,null,null,null).exports;var p=function(){var e=this,t=e._self._c;return t("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":e.Width,"nudge-left":e.isMobile&&300,"nudge-bottom":30,"content-class":"tag-search-content","offset-x":""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t("v-chip",e._g(e._b({staticClass:"border-color mx-1",attrs:{outlined:!e.open,color:e.open?"primary":""}},"v-chip",a,!1),s),[t("span",{staticClass:"subtitle-1"},[t("span",{staticClass:"text-sub-title"},[e._v("#")]),e._v(" "+e._s(e.$t("Tag.search.button")))])])]}}]),model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[e._v(" "),t("v-card",[t("v-text-field",{ref:"tagSearchInput",staticClass:"px-4",attrs:{placeholder:e.$t("Tag.search.placeholder")},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),e._v(" "),t("div",{staticClass:"pa-3"},[e.searching?e._e():t("span",{staticClass:"text-sm-body-2 font-weight-bold pl-1"},[e._v(e._s(e.$t("Tag.last.added")))]),e._v(" "),t("v-chip-group",{staticClass:"pt-2",attrs:{"active-class":"primary--text",multiple:""},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.tags,(function(s){return t("v-chip",{key:s,attrs:{color:e.isMobile?"blue lighten-4":"",value:s},on:{click:function(t){return e.handleTag(s)},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleTag(s)}}},[t("span",{class:e.isMobile?"primary--text":""},[e._v(" "+e._s(s))])])})),1)],1)],1)],1)};p._withStripped=!0;const g={"search-application":n,"search-toolbar":r,"search-results":l,"search-result-card":h,"search-tag-selector":u,"search-tag-list":a({props:{value:{type:Array,default:()=>[]}},data:()=>({initialized:!1,tags:[],selectedTags:[],query:"",searching:!1,searchLimit:5,open:!1}),computed:{isMobile(){return this.$vuetify&&this.$vuetify.breakpoint&&"xs"===this.$vuetify.breakpoint.name},Width(){return this.isMobile?"400":"200"}},watch:{query(){this.searching=this.query.length>0,this.search()},selectedTags(){this.$emit("input",this.selectedTags)},open(){this.open&&(this.query="",window.setTimeout((()=>{this.$refs.tagSearchInput&&this.$refs.tagSearchInput.$el.querySelector("input").focus()}),200),this.search())}},created(){document.onmousedown=e=>{this.open&&e&&e.target&&($(".tag-search-content").find(e.target).length||window.setTimeout((()=>{this.open=!1}),200))},this.selectedTags=this.value},methods:{search(){return this.$tagService.searchTags(this.query,this.searchLimit).then((e=>{this.tags=e.map((e=>e.name))||[],this.selectedTags&&this.selectedTags.length&&(this.selectedTags=this.selectedTags.map((e=>{const t=this.tags.map((e=>e.toLowerCase())),s=e.toLowerCase(),a=t.indexOf(s);return a>=0?this.tags[a]:e})))}))},handleTag(e){const t=this.selectedTags.map((e=>e.toLowerCase())),s=e.toLowerCase();if(t.includes(s)){const e=t.indexOf(s);this.selectedTags.splice(e,1)}else this.selectedTags.push(e),document.dispatchEvent(new CustomEvent("search-tag"))}}},p,[],!1,null,null,null).exports};for(const e in g)Vue.component(e,g[e]);if(extensionRegistry){const e=extensionRegistry.loadComponents("SearchApplication");e&&e.length&&e.forEach((e=>{Vue.component(e.componentName,e.componentOptions)}))}const f="SearchApplication";let m=!1;function v(e){if(m)return;m=!0,document.dispatchEvent(new CustomEvent("displayTopBarLoading"));const t=JSON.parse(document.getElementById("searchConnectorsDefaultValue").value),s=JSON.parse(document.getElementById("searchSkinUrlsDefaultValue").value);Vue.createApp({data:{tagName:e,connectors:t,skinUrls:s},template:`<search-application id="${f}" :connectors="connectors" :skin-urls="skinUrls" />`,vuetify:Vue.prototype.vuetifyOptions,i18n:exoi18n.i18n},`#${f}`,"Search")}return document.onclick=e=>{if(e&&e.target&&e.target.className&&e.target.className.includes("metadata-tag")){const t=e.target.innerText;t&&(e.stopPropagation(),e.preventDefault(),m||v(t.replace("#","")),document.dispatchEvent(new CustomEvent("search-metadata-tag",{detail:t.replace("#","")})))}},t})()));