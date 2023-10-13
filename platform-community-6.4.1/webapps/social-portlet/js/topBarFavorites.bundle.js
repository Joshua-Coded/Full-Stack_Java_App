define((()=>(()=>{var t={6899:()=>{extensionRegistry.registerComponent("favorite-activity","favorite-drawer-item",{id:"activity",vueComponent:Vue.options.components["activity-favorite-item"]}),extensionRegistry.registerComponent("favorite-space","favorite-drawer-item",{id:"space",vueComponent:Vue.options.components["space-favorite-item"]})}},e={};function i(o){var s=e[o];if(void 0!==s)return s.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,i),a.exports}i.d=(t,e)=>{for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};return(()=>{"use strict";i.r(o),i.d(o,{init:()=>x});var t=function(){var t=this._self._c;return t("v-app",[t("v-flex",[t("v-layout",[t("top-bar-favorites-button")],1)],1),this._v(" "),t("top-bar-favorites-drawer")],1)};function e(t,e,i,o,s,a,r,n){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),o&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):s&&(l=n?function(){s.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:s),l)if(c.functional){c._injectStyles=l;var v=c.render;c.render=function(t,e){return l.call(e),v(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,l):[l]}return{exports:t,options:c}}t._withStripped=!0;const s=e({mounted(){this.$root.$applicationLoaded()}},t,[],!1,null,null,null).exports;var a=function(){var t=this;return(0,t._self._c)("extension-registry-component",{key:t.favoriteId,attrs:{component:t.component,element:t.div,params:t.params}})};a._withStripped=!0;const r=e({props:{favorite:{type:Object,default:()=>null},activityExtensions:{type:Object,default:()=>null}},data:()=>({component:{}}),computed:{favoriteType(){return this.favorite&&this.favorite.objectType},favoriteId(){return this.favorite&&this.favorite.objectId},params(){return{id:this.favoriteId,activityExtensions:this.activityExtensions}},componentsApp(){return`favorite-${this.favoriteType}`}},created(){const t=extensionRegistry.loadComponents(this.componentsApp);t&&(this.component=t[0])}},a,[],!1,null,null,null).exports;var n=function(){var t=this,e=t._self._c;return e("exo-drawer",{ref:"favoritesDrawer",staticClass:"favoritesDrawer",attrs:{right:""}},[e("template",{slot:"title"},[t._v("\n    "+t._s(t.$t("UITopBarFavoritesPortlet.title.recentFavorites"))+"\n  ")]),t._v(" "),e("template",{slot:"content"},[t.favoritesList.length?e("v-list",{staticClass:"mx-3"},t._l(t.favoritesList,(function(i){return e("favorite-item",{key:i.id,attrs:{favorite:i,"activity-extensions":t.activityExtensions}})})),1):t.loading?t._e():e("div",{staticClass:"d-flex full-height disabled-background align-center justify-center"},[e("div",{staticClass:"noFavoritesContent"},[e("v-icon",{staticClass:"mx-auto disabled--text mb-3",attrs:{size:"100"}},[t._v("fas fa-star ")]),t._v(" "),e("p",{staticClass:"text-sub-title font-weight-bold"},[t._v(t._s(t.$t("UITopBarFavoritesPortlet.label.NoFavorites")))])],1)])],1),t._v(" "),t.hasMore?e("template",{slot:"footer"},[e("v-btn",{staticClass:"btn pa-0",attrs:{loading:t.loading,disabled:t.loading,block:""},on:{click:t.loadMore}},[t._v("\n      "+t._s(t.$t("Search.button.loadMore"))+"\n    ")])],1):t._e()],2)};n._withStripped=!0;const l=e({data:()=>({favoritesList:[],loading:!1,offset:0,limit:Math.round((window.innerHeight-122)/53),totalSize:0,pageSize:10,activityExtensions:[],extensionApp:"ActivityFavoriteIcon",activityIconExtension:"activity-favorite-icon-extensions"}),computed:{hasMore(){return this.limit<this.totalSize||this.loading&&!this.totalSize}},watch:{limit(){this.retrieveFavoritesList()},loading(){this.loading?this.$refs.favoritesDrawer.startLoading():this.$refs.favoritesDrawer.endLoading()}},created(){this.$root.$on("open-favorite-drawer",(()=>{document.addEventListener(`extension-${this.extensionApp}-${this.activityIconExtension}-updated`,this.refreshActivityIcon),this.refreshActivityIcon(),this.openDrawer()})),this.$root.$on("close-favorite-drawer",(()=>{this.$refs.favoritesDrawer.close()})),this.$root.$on("refresh-favorite-list",(()=>{this.retrieveFavoritesList()}))},beforeDestroy(){document.removeEventListener(`extension-${this.extensionApp}-${this.activityIconExtension}-updated`,this.refreshActivityIcon)},methods:{openDrawer(){this.retrieveFavoritesList(),this.$refs.favoritesDrawer.open()},retrieveFavoritesList(){return this.loading=!0,this.$favoriteService.getFavorites(this.offset,this.limit,!0).then((t=>{this.totalSize=t&&t.size||this.totalSize,this.favoritesList=t&&t.favoritesItem||[]})).finally((()=>this.loading=!1))},loadMore(){this.hasMore&&(this.limit+=this.pageSize)},refreshActivityIcon(){extensionRegistry.loadExtensions(this.extensionApp,this.activityIconExtension).forEach((t=>{t.id&&this.activityExtensions.push(t)}))}}},n,[],!1,null,null,null).exports;var c=function(){var t=this,e=t._self._c;return e("v-btn",{staticClass:"icon-default-color",attrs:{title:t.$t("UITopBarFavoritesPortlet.label.iconTooltip"),icon:""},on:{click:function(e){return t.$root.$emit("open-favorite-drawer")}}},[e("v-icon",{staticClass:"pb-1",attrs:{size:"22"}},[t._v("fa-star")])],1)};c._withStripped=!0;const v=e({},c,[],!1,null,null,null).exports;var p=function(){var t=this,e=t._self._c;return e("v-list-item",{staticClass:"clickable",attrs:{href:t.activityUrl}},[e("v-list-item-icon",{staticClass:"me-3 my-auto"},[t.activityTypeExtension&&t.activityTypeExtension.img?e("v-img",{attrs:{src:t.activityTypeExtension.img,"max-height":"28","max-width":"25"}}):t.activityTypeExtension&&t.activityTypeExtension.icon?e("v-icon",{class:t.activityTypeExtension.class,attrs:{size:"24"}},[t._v("\n      "+t._s(t.activityTypeExtension.icon)+" \n    ")]):e("v-icon",{staticClass:"primary--text",attrs:{size:"24"}},[t._v("\n      fas fa-stream\n    ")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{staticClass:"text-color body-2"},[e("p",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:t.activityTitle,expression:"activityTitle"}],staticClass:"ma-auto text-truncate"})])],1),t._v(" "),e("v-list-item-action",[e("favorite-button",{attrs:{id:t.id,favorite:t.isFavorite,"space-id":t.spaceId,top:t.top,right:t.right,type:"activity"},on:{removed:t.removed,"remove-error":t.removeError}})],1)],1)};p._withStripped=!0;const d=e({props:{id:{type:String,default:()=>null},activityExtensions:{type:Object,default:()=>null}},data:()=>({activity:null,activityUrl:"#",isFavorite:!0,defaultIcon:"fas fa-feather-alt",defaultClass:"primary--text"}),computed:{spaceId(){return this.activity?.activityStream?.space?.id},activityTypeExtension(){return this.activity?.type?this.activityExtensions.find((t=>t.type===this.activity.type)):null},activityTitle(){return this.activityTypeExtension?.title&&this.activityTypeExtension?.title(this.activity)||this.favoriteTitle(this.activity?.title)||this.$t("UITopBarFavoritesPortlet.label.activity")}},created(){this.activityUrl=`${eXo.env.portal.context}/${eXo.env.portal.portalName}/activity?id=${this.id}`,this.$activityService.getActivityById(this.id).then((t=>{this.activity=t}))},methods:{favoriteTitle:t=>t&&t.replace(/(<([^>]+)>)/gi,"")||"",removed(){this.isFavorite=!this.isFavorite,this.displayAlert(this.$t("Favorite.tooltip.SuccessfullyDeletedFavorite",{0:this.$t("activity.label")})),this.$emit("removed"),this.$root.$emit("refresh-favorite-list")},removeError(){this.displayAlert(this.$t("Favorite.tooltip.ErrorDeletingFavorite",{0:this.$t("activity.label")}),"error")},displayAlert(t,e){document.dispatchEvent(new CustomEvent("notification-alert",{detail:{message:t,type:e||"success"}}))}}},p,[],!1,null,null,null).exports;var h=function(){var t=this,e=t._self._c;return e("v-list-item",{staticClass:"clickable",attrs:{href:t.spaceUrl}},[e("v-list-item-icon",{staticClass:"me-3 my-auto"},[e("exo-space-avatar",{attrs:{space:t.space,size:25,avatar:""}})],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{staticClass:"text-color body-2"},[e("p",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:t.spaceName,expression:"spaceName"}],staticClass:"ma-auto text-truncate"})])],1),t._v(" "),e("v-list-item-action",[e("favorite-button",{attrs:{id:t.id,favorite:t.isFavorite,"space-id":t.id,top:t.top,right:t.right,type:"space"},on:{removed:t.removed,"remove-error":t.removeError}})],1)],1)};h._withStripped=!0;const f={"top-bar-favorites":s,"top-bar-favorites-button":v,"top-bar-favorites-drawer":l,"favorite-item":r,"activity-favorite-item":d,"space-favorite-item":e({props:{id:{type:String,default:()=>null}},data:()=>({space:null,spaceName:"",spaceUrl:"#",isFavorite:!0}),created(){this.spaceUrl=`${eXo.env.portal.context}/${eXo.env.portal.portalName}/activity?id=${this.id}`,this.$spaceService.getSpaceById(this.id).then((t=>{this.space=t,this.spaceName=t?.displayName?t.displayName:this.$t("UITopBarFavoritesPortlet.label.space"),this.spaceUrl=`${eXo.env.portal.context}/g/${t.groupId.replace(/\//g,":")}`}))},methods:{removed(){this.isFavorite=!this.isFavorite,this.displayAlert(this.$t("Favorite.tooltip.SuccessfullyDeletedFavorite",{0:this.$t("spaceList.alert.label")})),this.$emit("removed"),this.$root.$emit("refresh-favorite-list")},removeError(){this.displayAlert(this.$t("Favorite.tooltip.ErrorDeletingFavorite",{0:this.$t("spaceList.alert.label")}),"error")},displayAlert(t,e){this.$root.$emit("notification-alert",{message:t,type:e||"success"})}}},h,[],!1,null,null,null).exports};for(const t in f)Vue.component(t,f[t]);if(i(6899),extensionRegistry){const t=extensionRegistry.loadComponents("TopBarFavorites");t&&t.length>0&&t.forEach((t=>{Vue.component(t.componentName,t.componentOptions)}))}const u="favoritesListPortlet",y=eXo.env.portal.language,m=`${Vue.prototype.$spacesConstants.PORTAL}/${Vue.prototype.$spacesConstants.PORTAL_REST}/i18n/bundle/locale.portlet.Portlets-${y}.json`;function x(){exoi18n.loadLanguageAsync(y,m).then((()=>{Vue.createApp({template:`<top-bar-favorites id="${u}" />`,vuetify:Vue.prototype.vuetifyOptions,i18n:exoi18n.i18n},`#${u}`,"Topbar Favorites")}))}})(),o})()));