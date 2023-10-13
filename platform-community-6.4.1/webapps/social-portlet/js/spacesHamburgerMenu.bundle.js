define((()=>(()=>{"use strict";var e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t);var s={};e.r(s),e.d(s,{checkCanCreateSpaces:()=>b,deleteSpaceById:()=>I,getBindingReportOperations:()=>P,getGroupSpaceBindings:()=>E,getGroups:()=>w,getGroupsTree:()=>A,getReport:()=>U,getSpaceLinkSetting:()=>y,getSpaces:()=>f,getSpacesAdministrationSetting:()=>C,getSpacesPerPage:()=>S,getUserPermissions:()=>_,isExternalFeatureActive:()=>N,removeBinding:()=>L,saveExternalFeatureStatus:()=>T,saveGroupsSpaceBindings:()=>x,searchSpaces:()=>g,updateSpacesAdministrationSetting:()=>k});var n=function(){var e=this,t=e._self._c;return t("v-container",{staticClass:"border-box-sizing",attrs:{"px-0":"","pt-0":""}},[t("v-row",{staticClass:"mx-0 spacesNavigationTitle"},[e.isMobile?t("v-list-item",{on:{click:function(t){return e.openOrCloseDrawer()}}},[t("v-list-item-icon",{staticClass:"mb-2 mt-3 me-6 titleIcon"},[t("i",{staticClass:"uiIcon uiIconToolbarNavItem spacesIcon"})]),e._v(" "),t("v-list-item-content",{staticClass:"subtitle-2"},[e._v("\n        "+e._s(e.$t("menu.spaces.lastVisitedSpaces"))+"\n      ")]),e._v(" "),t("v-list-item-action",{staticClass:"my-0 d-flex flex-row align-center"},[e.canAddSpaces?t("v-btn",{attrs:{icon:"",link:"",href:e.allSpacesLink},on:{click:function(t){return e.leftNavigationActionEvent(t,"addNewSpace")}}},[t("v-icon",{staticClass:"me-0 pa-2 icon-default-color clickable",attrs:{small:""}},[e._v("\n            fa-plus\n          ")])],1):e._e()],1)],1):t("v-list-item",{on:{mouseover:function(t){e.showItemActions=!0,e.spacePanel=!1},mouseleave:function(t){e.showItemActions=!1}}},[t("v-list-item-icon",{staticClass:"mb-2 mt-3 me-6 titleIcon"},[t("i",{staticClass:"uiIcon uiIconToolbarNavItem spacesIcon"})]),e._v(" "),t("v-list-item-content",{staticClass:"subtitle-2"},[e._v("\n        "+e._s(e.$t("menu.spaces.lastVisitedSpaces"))+"\n      ")]),e._v(" "),e.toggleArrow?t("v-list-item-action",{staticClass:"my-0 d-flex flex-row align-center"},[e.canAddSpaces?t("v-btn",{attrs:{link:"",icon:"",href:e.allSpacesLink},on:{click:function(t){return e.leftNavigationActionEvent(t,"addNewSpace")}}},[t("v-icon",{staticClass:"me-0 pa-2 icon-default-color clickable",attrs:{small:""}},[e._v("\n            fa-plus\n          ")])],1):e._e(),e._v(" "),t("v-btn",{attrs:{icon:""},on:{click:function(t){return e.openOrCloseDrawer()}}},[t("v-icon",{staticClass:"me-0 pa-2 icon-default-color clickable",attrs:{small:""}},[e._v("\n            "+e._s(e.arrowIconClass)+" \n          ")])],1)],1):e._e()],1)],1),e._v(" "),t("exo-spaces-navigation-content",{attrs:{limit:e.spacesLimit,"home-link":e.homeLink,"home-icon":"",shaped:""},on:{"open-space-panel":function(t){return e.openSpacePanel(t)},"close-space-pane":function(t){return e.openSpacePanel(t)}}}),e._v(" "),t("exo-confirm-dialog",{ref:"confirmDialog",attrs:{title:e.$t("menu.confirmation.title.changeHome"),message:e.confirmMessage,"ok-label":e.$t("menu.confirmation.ok"),"cancel-label":e.$t("menu.confirmation.cancel")},on:{ok:e.changeHome}})],1)};function a(e,t,s,n,a,i,o,r){var c,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=s,l._compiled=!0),n&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),o?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=c):a&&(c=r?function(){a.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:a),c)if(l.functional){l._injectStyles=c;var p=l.render;l.render=function(e,t){return c.call(t),p(e,t)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:l}}n._withStripped=!0;const i=a({data:()=>({channelName:"/SpaceWebNotification",homeLink:eXo.env.portal.homeLink,selectedSpace:null,spacesLimit:7,secondLevelVueInstance:null,secondeLevel:!1,secondeLevelSpacePanel:!1,showItemActions:!1,arrowIcon:"fa-arrow-right",allSpacesLink:`${eXo.env.portal.context}/${eXo.env.portal.portalName}/all-spaces?createSpace=true`,canAddSpaces:!1,isRecentSpaces:!1,space:null,spacePanel:!1}),computed:{confirmMessage(){return this.$t("menu.confirmation.message.changeHome",{0:`<b>${this.selectedSpace&&this.selectedSpace.displayName}</b>`})},arrowIconClass(){return this.arrowIcon},toggleArrow(){return(this.secondeLevel||this.showItemActions)&&!this.spacePanel},isMobile(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name},recentSpaces(){return this.isRecentSpaces}},created(){this.$spacesAdministrationServices.checkCanCreateSpaces().then((e=>this.canAddSpaces=e)),this.$socialWebSocket.initCometd(this.channelName),document.addEventListener("homeLinkUpdated",(()=>{this.homeLink=eXo.env.portal.homeLink})),document.addEventListener("second-level-hidden",(()=>{this.hideSecondeItem()})),document.addEventListener("second-level-opened",(e=>{e&&e.detail&&"HamburgerMenuNavigationSpaces"!==e.detail.contentDetail.id&&this.hideSecondeItem()}))},methods:{changeHome(){var e,t;("USER",e=eXo.env.portal.userName,"PORTAL","HOME","HOME_PAGE_URI",t=this.url(this.selectedSpace),fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/settings/USER,${e}/PORTAL,HOME/HOME_PAGE_URI`,{method:"PUT",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({value:t})}).then((e=>{if(!e||!e.ok)throw new Error("Response code indicates a server error",e)}))).then((()=>{this.homeLink=eXo.env.portal.homeLink=this.url(this.selectedSpace),$("#UserHomePortalLink").attr("href",this.homeLink),document.dispatchEvent(new CustomEvent("homeLinkUpdated",{detail:this.homeLink}))}))},selectHome(e){this.homeLink!==this.url(e)&&(this.selectedSpace=e,this.$refs.confirmDialog.open())},mountSecondLevel(e){let t=null;const s=this;t=this.recentSpaces?Vue.extend({data:()=>({space:s.space,thirdLevel:!1}),methods:{openSpacePanel(e){let t=null;this.space&&(t=this.space.id),this.space=e,this.thirdLevel=!this.thirdLevel,this.thirdLevel||t!==this.space.id&&null!==t?(document.dispatchEvent(new CustomEvent("space-opened",{detail:t})),document.dispatchEvent(new CustomEvent("display-third-level",{detail:{space:e,component:this}}))):document.dispatchEvent(new CustomEvent("hide-third-level"))},mountThirdLevel(e){new(Vue.extend({data:()=>({space:this.space,homeLink:s.homeLink}),methods:{closeMenu(){s.$emit("close-second-level"),s.secondeLevel=!1,document.dispatchEvent(new CustomEvent("hide-third-level"))},selectThirdLevelHome(e){s.selectHome(e)}},template:'\n                  <space-panel-hamburger-navigation :space="space" :home-link="homeLink" @selectHome="selectThirdLevelHome(space)" @close-menu="closeMenu" />\n                '}))({i18n:new VueI18n({locale:this.$i18n.locale,messages:this.$i18n.messages}),vuetify:Vue.prototype.vuetifyOptions,el:e})},closeMenu(){document.dispatchEvent(new CustomEvent("hide-third-level")),s.openOrCloseDrawer()}},template:'\n            <exo-recent-spaces-hamburger-menu-navigation @open-space-panel="openSpacePanel($event)" @close-menu="closeMenu" />\n          '}):Vue.extend({data:()=>({space:s.space,homeLink:this.homeLink}),methods:{selectHome(e){s.selectHome(e)},closeMenu(){document.dispatchEvent(new CustomEvent("hide-third-level")),s.openSpacePanel()}},template:'\n            <space-panel-hamburger-navigation :space="space" :home-link="homeLink" @selectHome="selectHome(space)" @close-menu="closeMenu" />\n          '}),this.secondLevelVueInstance=new t({i18n:new VueI18n({locale:this.$i18n.locale,messages:this.$i18n.messages}),vuetify:Vue.prototype.vuetifyOptions,el:e})},hideSecondeItem(){this.arrowIcon="fa-arrow-right",this.showItemActions=!1,this.secondeLevel=!1,this.secondeLevelSpacePanel=!1,this.spacePanel=!1},openOrCloseDrawer(){this.isRecentSpaces=!0,this.arrowIcon="fa-arrow-right",this.secondeLevel=!this.secondeLevel,this.secondeLevel?(this.secondeLevelSpacePanel=!1,this.arrowIcon="fa-arrow-left",this.$emit("open-second-level",!0),document.dispatchEvent(new CustomEvent("hide-space-panel"))):(this.arrowIcon="fa-arrow-right",this.$emit("close-second-level"))},openSpacePanel(e){let t=null;this.space&&(t=this.space.id),this.isRecentSpaces=!1,this.spacePanel=!1,e&&(this.space=e),this.spacePanel=!this.spacePanel,this.secondeLevelSpacePanel=!this.secondeLevelSpacePanel,this.secondeLevelSpacePanel||t!==this.space.id&&null!==t?(document.dispatchEvent(new CustomEvent("space-opened",{detail:t})),this.secondeLevel=!1,this.$emit("open-second-level",!0),this.arrowIcon="fa-arrow-right"):this.$emit("close-second-level")},leftNavigationActionEvent(e,t){this.isMobile&&e&&e.stopPropagation(),document.dispatchEvent(new CustomEvent("space-left-navigation-action",{detail:t}))},url(e){if(e&&e.groupId){const t=e.groupId.replace(/\//g,":");return`${eXo.env.portal.context}/g/${t}/`}return"#"}}},n,[],!1,null,null,null).exports;var o=function(){var e=this,t=e._self._c;return t("v-container",{staticClass:"recentDrawer",attrs:{flat:""}},[t("v-flex",{staticClass:"filterSpaces d-flex align-center"},[t("v-list-item-icon",{staticClass:"d-flex d-sm-none backToMenu my-5 mx-2 icon-default-color justify-center",on:{click:function(t){return e.closeMenu()}}},[t("v-icon",{staticClass:"fas fa-arrow-left",attrs:{small:""}})],1),e._v(" "),t("v-list-item",{staticClass:"recentSpacesTitle px-2"},[t("v-list-item-icon",{staticClass:"me-2 align-self-center",on:{click:function(t){return e.closeMenu()}}},[t("v-icon",{staticClass:"disabled--text",attrs:{size:"20"}},[e._v("fas fa-filter ")])],1),e._v(" "),e.showFilter?t("v-list-item-content",{staticClass:"recentSpacesTitleLabel"},[t("v-text-field",{staticClass:"recentSpacesFilter border-bottom-color pt-0 mt-0",attrs:{placeholder:e.$t("menu.spaces.recentSpaces"),"single-line":"","hide-details":"",required:"",autofocus:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1):t("v-list-item-content",{staticClass:"recentSpacesTitleLabel pt-1 pb-2px disabled--text border-bottom-color",on:{click:function(t){return e.openFilter()}}},[e._v("\n        "+e._s(e.$t("menu.spaces.recentSpaces"))+"\n      ")]),e._v(" "),e.showFilter?t("v-list-item-action",{staticClass:"recentSpacesTitleIcon position-absolute r-3"},[t("v-btn",{attrs:{text:"",icon:"",color:"blue-grey darken-1",size:"22"},on:{click:function(t){return e.closeFilter()}}},[t("v-icon",{attrs:{size:"18"}},[e._v("mdi-close")])],1)],1):e._e()],1)],1),e._v(" "),t("exo-spaces-navigation-content",{staticClass:"recentSpacesWrapper mt-4",attrs:{limit:e.itemsToShow,"page-size":e.itemsToShow,keyword:e.keyword,"show-more-button":""},on:{"open-space-panel":function(t){return e.$emit("open-space-panel",t)}}})],1)};o._withStripped=!0;const r=a({data:()=>({itemsToShow:15,showFilter:!1,keyword:""}),methods:{closeMenu(){this.$emit("close-menu")},closeFilter(){this.keyword="",this.showFilter=!1},getSpacesPage(e){if(this.itemsToShow<=this.spacesList.length){const t=this.spacesList.length-this.itemsToShow;t>e?this.itemsToShow+=e:(this.itemsToShow+=t,this.showButton=!1)}},leftNavigationActionEvent(e){document.dispatchEvent(new CustomEvent("space-left-navigation-action",{detail:e}))},openFilter(){this.showFilter=!0,this.leftNavigationActionEvent("filterBySpaces")}}},o,[],!1,null,null,null).exports;var c=function(){var e=this,t=e._self._c;return t("v-flex",{staticClass:"mx-0 spacesNavigationContent",class:e.shaped&&"ms-12",attrs:{flat:""}},[t("v-list",{attrs:{dense:""}},[t("v-list-item-group",{model:{value:e.selectedSpaceIndex,callback:function(t){e.selectedSpaceIndex=t},expression:"selectedSpaceIndex"}},e._l(e.filteredSpaces,(function(s){return t("space-navigation-item",{key:s.id,attrs:{space:s,"space-url":e.url(s),"home-icon":e.homeIcon,"home-link":e.homeLink},on:{"open-space-panel":function(t){return e.openOrCloseSpacePanel(s)},"close-space-panel":function(t){return e.openOrCloseSpacePanel(s)}}})})),1)],1),e._v(" "),e.canShowMore?t("v-row",{staticClass:"mx-0 my-4 justify-center"},[t("v-btn",{attrs:{small:"",depressed:""},on:{click:function(t){return e.loadNextPage()}}},[e._v("\n      "+e._s(e.$t("menu.spaces.showMore"))+"\n    ")])],1):e._e()],1)};c._withStripped=!0;const l=a({props:{homeLink:{type:String,default:null},homeIcon:{type:Boolean,default:!1},offset:{type:Number,default:0},limit:{type:Number,default:10},pageSize:{type:Number,default:10},keyword:{type:Object,default:null},showMoreButton:{type:Boolean,default:!1},shaped:{type:Boolean,default:!1}},data:()=>({startSearchAfterInMilliseconds:400,endTypingKeywordTimeout:50,startTypingKeywordTimeout:0,spaces:[],initialized:!1,loadingSpaces:!1,limitToFetch:0,originalLimitToFetch:0}),computed:{canShowMore(){return this.showMoreButton&&!this.loadingSpaces&&this.spaces.length>=this.limitToFetch},filteredSpaces(){return this.keyword?this.spaces.slice().filter((e=>e.displayName&&e.displayName.toLowerCase().indexOf(this.keyword.toLowerCase())>=0)):this.spaces},selectedSpaceIndex(){return this.spaces.findIndex((e=>this.url(e)===eXo.env.server.portalBaseURL||0===eXo.env.server.portalBaseURL.indexOf(`${this.url(e)}/`)))}},watch:{keyword(){if(!this.keyword)return this.resetSearch(),void this.searchSpaces();this.startTypingKeywordTimeout=Date.now(),this.loadingSpaces||(this.loadingSpaces=!0,this.waitForEndTyping())},limitToFetch(){this.searchSpaces().finally((()=>{this.initialized||(this.initialized=!0,this.$root.$applicationLoaded())}))}},created(){this.originalLimitToFetch=this.limitToFetch=this.limit,document.addEventListener("space-unread-activities-updated",this.applySpaceUnreadChanges),document.addEventListener("unread-items-deleted",(e=>{e&&this.searchSpaces()}))},methods:{applySpaceUnreadChanges(e){if(!e?.detail)return;const{spaceId:t,unread:s}=e.detail,n=this.spaces?.find((e=>e.id===t));n&&(n.unread=s&&JSON.parse(JSON.stringify(s))||null)},searchSpaces(){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spaces?q=&offset=${this.offset}&limit=${this.limitToFetch}&filterType=lastVisited&returnSize=true&expand=member,managers,favorite,unread`,{method:"GET",credentials:"include"}).then((e=>e&&e.ok&&e.json())).then((e=>(this.spaces=e&&e.spaces||[],this.$nextTick()))).then((()=>{this.keyword&&this.filteredSpaces.length<this.originalLimitToFetch&&this.spaces.length>=this.limitToFetch&&(this.limitToFetch+=this.pageSize)})).finally((()=>this.loadingSpaces=!1))},resetSearch(){this.limitToFetch!==this.originalLimitToFetch&&(this.limitToFetch=this.originalLimitToFetch)},loadNextPage(){this.originalLimitToFetch=this.limitToFetch+=this.pageSize},waitForEndTyping(){window.setTimeout((()=>{Date.now()-this.startTypingKeywordTimeout>this.startSearchAfterInMilliseconds?this.searchSpaces():this.waitForEndTyping()}),this.endTypingKeywordTimeout)},url(e){if(e&&e.groupId){const t=e.groupId.replace(/\//g,":");return`${eXo.env.portal.context}/g/${t}/`}return"#"},openOrCloseSpacePanel(e){e?this.$emit("open-space-panel",e):this.$emit("close-space-panel",null)}}},c,[],!1,null,null,null).exports;var p=function(){var e=this,t=e._self._c;return e.isMobile?t("v-list-item",{staticClass:"px-2 spaceItem",class:e.homeIcon&&(e.homeLink===e.spaceLink?"UserPageLinkHome":"UserPageLink"),on:{click:function(t){return e.openOrCloseDrawer()}}},[t("v-list-item-avatar",{staticClass:"me-3 ms-3 tile my-0 spaceAvatar",attrs:{size:"28",tile:""}},[t("v-img",{attrs:{src:e.spaceAvatar}})],1),e._v(" "),t("v-list-item-content",[t("v-list-item-title",{staticClass:"body-2",domProps:{textContent:e._s(e.spaceDisplayName)}})],1),e._v(" "),e.spaceUnreadCount?t("v-list-item-icon",{staticClass:"me-2 align-center"},[e.spaceUnreadCount?t("v-chip",{attrs:{color:"error-color-background","min-width":"22",height:"22",dark:""}},[e._v("\n      "+e._s(e.spaceUnreadCount)+"\n    ")]):e._e()],1):e._e()],1):t("v-list-item",{staticClass:"px-2 spaceItem",class:e.homeIcon&&(e.homeLink===e.spaceLink?"UserPageLinkHome":"UserPageLink"),attrs:{href:e.spaceLink,link:""},on:{mouseover:function(t){e.showItemActions=!0},mouseleave:function(t){e.showItemActions=!1}}},[t("v-list-item-avatar",{staticClass:"me-3 ms-2 tile my-0 spaceAvatar",attrs:{size:"28",tile:""}},[t("v-img",{attrs:{src:e.spaceAvatar}})],1),e._v(" "),t("v-list-item-content",[t("v-list-item-title",{staticClass:"body-2",domProps:{textContent:e._s(e.spaceDisplayName)}})],1),e._v(" "),e.toggleArrow?t("v-list-item-icon",{staticClass:"me-2 align-center",attrs:{disabled:e.loading,loading:e.loading}},[t("v-btn",{attrs:{icon:""},on:{click:function(t){return e.openOrCloseDrawer(t)}}},[t("v-icon",{staticClass:"me-0 pa-2 icon-default-color clickable",attrs:{id:e.space.id,small:""}},[e._v("\n        "+e._s(e.arrowIcon)+" \n      ")])],1)],1):e._e(),e._v(" "),!e.toggleArrow&&e.spaceUnreadCount?t("v-list-item-icon",{staticClass:"me-2 align-center"},[e.spaceUnreadCount?t("v-chip",{attrs:{color:"error-color-background","min-width":"22",height:"22",dark:""}},[e._v("\n      "+e._s(e.spaceUnreadCount)+"\n    ")]):e._e()],1):e._e()],1)};p._withStripped=!0;const d=a({props:{space:{type:Object,default:null},spaceUrl:{type:String,default:null},homeLink:{type:String,default:null},homeIcon:{type:Boolean,default:!1}},data:()=>({secondLevelVueInstancee:null,secondeLevel:!1,showItemActions:!1,arrowIcon:"fa-arrow-right",spaceUnreadItems:null,webSocketSpaceUnreadItems:{}}),computed:{spaceId(){return this.space?.id},spaceLink(){return this.spaceUrl},spaceAvatar(){return this.space?.avatarUrl},spaceDisplayName(){return this.space?.displayName},spaceUnreadCount(){return this.spaceUnreadItems&&Object.values(this.spaceUnreadItems).reduce(((e,t)=>e+t),0)||0},toggleArrow(){return this.showItemActions||this.secondeLevel},isMobile(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name}},watch:{space:{immediate:!0,deep:!0,handler:function(){JSON.stringify(this.spaceUnreadItems||{})!==JSON.stringify(this.space?.unread||{})&&(this.spaceUnreadItems=this.space?.unread)}}},created(){document.addEventListener("space-opened",(e=>{e.detail===this.space.id&&(this.arrowIcon="fa-arrow-right",this.secondeLevel=!1,this.showItemActions=!1)})),document.addEventListener("hide-space-panel",(()=>{this.arrowIcon="fa-arrow-right",this.secondeLevel=!1,this.showItemActions=!1})),document.addEventListener("notification.unread.item",this.handleUpdatesFromWebSocket),document.addEventListener("notification.read.item",this.handleUpdatesFromWebSocket),document.addEventListener("notification.read.allItems",this.handleUpdatesFromWebSocket)},beforeDestroy(){document.removeEventListener("notification.unread.item",this.handleUpdatesFromWebSocket),document.removeEventListener("notification.read.item",this.handleUpdatesFromWebSocket),document.removeEventListener("notification.read.allItems",this.handleUpdatesFromWebSocket)},methods:{handleUpdatesFromWebSocket(e){const t=e?.detail,s=t?.wsEventName||"";let n=t?.message?.spaceWebNotificationItem||t?.message?.spacewebnotificationitem;n?.length&&(n=JSON.parse(n));const a=n?.applicationName,i=n?.applicationItemId,o=n?.spaceId,r=`${a}-${i}`;this.webSocketSpaceUnreadItems[o]||(this.webSocketSpaceUnreadItems[o]={}),o&&Number(this.spaceId)===Number(o)&&(this.spaceUnreadItems||(this.space.unread={},this.spaceUnreadItems=this.space.unread),this.spaceUnreadItems[a]||(this.spaceUnreadItems[a]=0),"notification.unread.item"===s?!0!==this.webSocketSpaceUnreadItems[o][r]&&(this.webSocketSpaceUnreadItems[o][r]=!0,this.spaceUnreadItems[a]++):"notification.read.item"===s?this.spaceUnreadItems[a]>0&&!1!==this.webSocketSpaceUnreadItems[o][r]&&(this.webSocketSpaceUnreadItems[o][r]=!1,this.spaceUnreadItems[a]--):"notification.read.allItems"===s&&(this.spaceUnreadItems=null,this.webSocketSpaceUnreadItems[o]={}),this.refreshUnreadItems())},refreshUnreadItems(){this.spaceUnreadItems=this.spaceUnreadItems&&Object.assign({},this.spaceUnreadItems)||null,document.dispatchEvent(new CustomEvent("space-unread-activities-updated",{detail:{spaceId:this.spaceId,unread:this.spaceUnreadItems}}))},hideSecondeItem(){this.arrowIcon="fa-arrow-right",this.showItemActions=!1,this.secondeLevel=!1},openOrCloseDrawer(e){e&&(e.preventDefault(),e.stopPropagation()),this.secondeLevel=!this.secondeLevel,this.secondeLevel?(this.arrowIcon="fa-arrow-left",this.$emit("open-space-panel")):(this.arrowIcon="fa-arrow-right",this.$emit("close-space-panel"))}}},p,[],!1,null,null,null).exports;var h=function(){var e=this,t=e._self._c;return t("v-container",{staticClass:"recentDrawer",attrs:{flat:""}},[t("v-flex",{staticClass:"d-flex pa-0"},[t("v-list-item-icon",{staticClass:"d-flex d-sm-none backToMenu my-5 mx-2 icon-default-color justify-center",on:{click:function(t){return e.closeMenu()}}},[t("v-icon",{staticClass:"fas fa-arrow-left",attrs:{small:""}})],1),e._v(" "),t("v-list-item",{staticClass:"width-min-content pt-3"},[t("v-list-item-avatar",{staticClass:"spaceAvatar mt-0 mb-0 align-self-start",attrs:{width:e.avatarWidth,height:e.avatarHeight}},[t("v-img",{staticClass:"object-fit-cover",attrs:{src:e.avatar}})],1),e._v(" "),t("v-list-item-content",{staticClass:"pb-0 pt-0"},[t("a",{staticClass:"font-weight-bold text-truncate-2 primary--text mb-2",attrs:{href:e.spaceURL}},[e._v(e._s(e.spaceDisplayName))]),e._v(" "),t("v-list-item-subtitle",[e._v("\n          "+e._s(e.membersCount)+" "+e._s(e.$t("space.logo.banner.popover.members"))+"\n        ")])],1)],1)],1),e._v(" "),t("p",{staticClass:"text-truncate-4 text-caption text--primary font-weight-medium pt-3 px-4"},[e._v("\n    "+e._s(e.description)+"\n  ")]),e._v(" "),t("v-flex",[t("v-list-item",[t("v-list-item-content",{staticClass:"body-2 grey--text text-truncate text--darken-1"},[e._v("\n        "+e._s(e.$t("space.logo.banner.popover.managers"))+"\n      ")]),e._v(" "),t("v-list-item-action",[t("exo-user-avatars-list",{attrs:{users:e.managersToDisplay,"icon-size":30,popover:!1,max:"3","avatar-overlay-position":""},on:{"open-detail":function(t){return e.openDetails()}}})],1)],1),e._v(" "),t("v-divider")],1),e._v(" "),t("v-flex",[t("v-list-item-action",{staticClass:"my-0 py-3 d-flex flex-row align-center justify-space-around me-0"},[t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:n}){return[t("v-btn",e._g(e._b({attrs:{link:"",icon:""},on:{click:function(t){return e.selectHome()}}},"v-btn",n,!1),s),[t("v-icon",{staticClass:"me-0 pa-2",class:e.isHomeLink?"primary--text":"icon-default-color",attrs:{small:""}},[e._v("\n              fa-house-user\n            ")])],1)]}}])},[e._v(" "),t("span",[e._v("\n          "+e._s(e.$t("menu.spaces.makeAsHomePage"))+"\n        ")])]),e._v(" "),t("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:n}){return[t("v-btn",e._g(e._b({attrs:{disabled:e.markAsReadDisabled,icon:""},on:{click:e.markAsAllRead}},"v-btn",n,!1),s),[t("v-icon",{staticClass:"me-0 pa-2",attrs:{small:""}},[e._v("\n              fa-envelope-open-text\n            ")])],1)]}}])},[e._v(" "),t("span",[e._v("\n          "+e._s(e.$t("menu.spaces.markAsRead"))+"\n        ")])]),e._v(" "),t("exo-space-favorite-action",{attrs:{"is-favorite":e.isFavorite,"space-id":e.spaceId,"entity-type":"spaces_left_navigation"}}),e._v(" "),t("extension-registry-components",{staticClass:"space-panel-action",attrs:{params:e.params,name:"SpacePopover",type:"space-popover-action","parent-element":"div",element:"div","element-class":"mx-auto ma-lg-0"}}),e._v(" "),e._l(e.enabledExtensionComponents,(function(e){return t("span",{key:e.key,ref:e.key,refInFor:!0,staticClass:"space-panel-action",class:`${e.appClass} ${e.typeClass}`})}))],2)],1),e._v(" "),t("v-flex",[t("v-list",e._l(e.spaceNavigations,(function(s){return t("space-panel-hamburger-navigation-item",{key:s.id,attrs:{navigation:s,"space-unread-items":e.spaceUnreadItems}})})),1)],1)],1)};h._withStripped=!0;const u=a({props:{space:{type:Object,default:null},homeLink:{type:String,default:null}},data:()=>({spaceNavigations:[],externalExtensions:[],spaceUnreadItems:null}),computed:{spaceId(){return this.space?.id},spaceDisplayName(){return this.space?.displayName},avatar(){return this.space?.avatarUrl},membersCount(){return this.space?.membersCount},description(){return this.space?.description},managersToDisplay(){return this.space?.managers},isFavorite(){return this.space?.isFavorite},isHomeLink(){return this.spaceURL===this.homeLink},params(){return{identityType:"space",identityId:this.spaceId}},enabledExtensionComponents(){return this.externalExtensions.filter((e=>e.enabled))},isMobile(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name},spaceURL(){if(this.space&&this.space.groupId){const e=this.space.groupId.replace(/\//g,":");return`${eXo.env.portal.context}/g/${e}/`}return"#"},avatarWidth(){return this.isMobile?"45":"60"},avatarHeight(){return this.isMobile?"45":"60"},hasUnreadItems(){return this.spaceUnreadItems&&Object.values(this.spaceUnreadItems).reduce(((e,t)=>e+t),0)>0},markAsReadDisabled(){return!this.hasUnreadItems}},watch:{spaceId:{immediate:!0,handler(e,t){e!==t&&this.refreshExtensions()}},space:{deep:!0,immediate:!0,handler:function(){this.spaceUnreadItems=this.space?.unread}}},created(){document.addEventListener("space-unread-activities-updated",this.applySpaceUnreadChanges),this.retrieveSpaceNavigations(this.spaceId)},methods:{applySpaceUnreadChanges(e){if(!e?.detail)return;const{spaceId:t,unread:s}=e.detail;this.spaceId===t&&(this.spaceUnreadItems=s)},retrieveSpaceNavigations(e){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spaces/${e}/navigations`,{method:"GET",credentials:"include"}).then((e=>e&&e.ok&&e.json())).then((e=>{e.forEach((e=>{e.uri=`${this.spaceURL}${e.uri}`})),this.spaceNavigations=e||[]}))},markAsAllRead(){this.$spaceService.markAllAsRead(this.spaceId)},closeMenu(){this.$emit("close-menu")},leftNavigationActionEvent(e){document.dispatchEvent(new CustomEvent("space-left-navigation-action",{detail:e}))},selectHome(){this.$emit("selectHome"),this.leftNavigationActionEvent("makeAsHomePage")},openDetails(){document.dispatchEvent(new CustomEvent("display-users-list-drawer",{detail:this.managersToDisplay}))},refreshExtensions(){this.externalExtensions=[],this.$nextTick((()=>{this.externalExtensions=extensionRegistry.loadExtensions("space-popup","space-popup-action")||[],this.$nextTick().then((()=>this.externalExtensions.forEach(this.initExtensionAction)))}))},initExtensionAction(e){if(e.enabled){let t=this.$refs[e.key];t&&t.length>0?(t=t[0],e.init(t,this.space.prettyName)):console.error(`Error initialization of the ${e.key} action component: empty container`)}}}},h,[],!1,null,null,null).exports;var m=function(){var e=this,t=e._self._c;return t("v-list-item",{attrs:{href:e.navigationUri}},[t("v-list-item-icon",{staticClass:"me-3 py-3 my-0 d-flex"},[t("i",{class:e.navigationIcon,attrs:{"aria-hidden":"true"}})]),e._v(" "),t("v-list-item-content",{staticClass:"my-n1"},[t("div",{staticClass:"d-flex align-center justify-space-between"},[t("span",[e._v(e._s(e.navigationLabel))]),e._v(" "),e.unreadBadge?t("v-chip",{attrs:{color:"error-color-background","min-width":"22",height:"22",dark:""}},[e._v("\n        "+e._s(e.unreadBadge)+"\n      ")]):e._e()],1)])],1)};m._withStripped=!0;const v={"space-navigation-item":d,"space-panel-hamburger-navigation":u,"space-panel-hamburger-navigation-item":a({props:{navigation:{type:Object,default:null},spaceUnreadItems:{type:Object,default:null}},computed:{navigationIcon(){return`${this.applicationIcon(this.navigation.icon)} icon-default-color icon-default-size`},navigationLabel(){return this.navigation?.label},navigationUri(){return this.navigation?.uri||""},badgeApplicationName(){const e=this.navigationUri.split("/"),t=e.length>5&&e[5]||null;return!t||t.includes("stream")||t.includes("activity")||t.includes("home")?"activity":t},unreadBadge(){return this.spaceUnreadItems&&("activity"===this.badgeApplicationName&&Object.values(this.spaceUnreadItems).reduce(((e,t)=>e+t),0)||0)||0}},methods:{applicationIcon(e){const t=e||"";return t?.length?t.includes("uiIconAppSpaceHomePage")?"fas fa-stream":t.includes("uiIconAppMembersPortlet")?"fas fa-users":t.includes("uiIconAppTasksManagement")||t.includes("uiIconApptasks")?"fas fa-tasks":t.includes("uiIconAppNotes")||t.includes("uiIconAppnotes")?"fas fa-clipboard":t.includes("uiIconAppSpaceWallet")?"fas fa-wallet":t.includes("uiIconAppSpaceSettingPortlet")?"fas fa-cog":t:"fas fa-sticky-note"}}},m,[],!1,null,null,null).exports,"exo-spaces-hamburger-menu-navigation":i,"exo-recent-spaces-hamburger-menu-navigation":r,"exo-spaces-navigation-content":l};for(const e in v)Vue.component(e,v[e]);function f(){return fetch(`${Vue.prototype.$spacesConstants.SOCIAL_SPACE_API}?sort=date&order=desc&limit=${Vue.prototype.$spacesConstants.SPACES_PER_PAGE}&returnSize=true&expand=membersCount`,{credentials:"include"}).then((e=>e.json()))}function g(e){return fetch(`${Vue.prototype.$spacesConstants.SOCIAL_SPACE_API}?q=${e}&sort=date&order=desc&limit=${Vue.prototype.$spacesConstants.SPACES_PER_PAGE}&returnSize=true&expand=membersCount`,{credentials:"include"}).then((e=>e.json()))}function S(e){return fetch(`${Vue.prototype.$spacesConstants.SOCIAL_SPACE_API}?offset=${e}&sort=date&order=desc&limit=${Vue.prototype.$spacesConstants.SPACES_PER_PAGE}&returnSize=true&expand=membersCount`,{credentials:"include"}).then((e=>e.json()))}function I(e){return fetch(`/rest/v1/social/spaces/${e}`,{credentials:"include",method:"delete"})}function y(e,t){if(e&&t){const s=e.toLowerCase().split(" ").join("_"),n=t.toLowerCase().split("/"),a=n[n.length-1];return`${Vue.prototype.$spacesConstants.PORTAL}${Vue.prototype.$spacesConstants.PROFILE_SPACE_LINK}${a}/${s}/settings`}return null}function _(e){return fetch(`${Vue.prototype.$spacesConstants.USER_API}/${e}`,{credentials:"include"}).then((e=>e.json()))}function w(e){return fetch(`${Vue.prototype.$spacesConstants.GROUP_API}?q=${e}`,{credentials:"include"}).then((e=>e.json()))}function C(e){return fetch(`${Vue.prototype.$spacesConstants.SPACES_ADMINISTRATION_API}/permissions/${e}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"GET"}).then((e=>200===e.status?e.json():e.text()))}function b(){return fetch(`${Vue.prototype.$spacesConstants.SPACES_ADMINISTRATION_API}/permissions/canCreatespaces/${eXo.env.portal.userName}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"GET"}).then((e=>{if(e&&e.ok)return e.json();throw new Error("Error to check can add spaces")}))}function k(e,t){return fetch(`${Vue.prototype.$spacesConstants.SPACES_ADMINISTRATION_API}/permissions/${e}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"PUT",body:JSON.stringify(t)})}function x(e,t){return fetch(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/saveGroupsSpaceBindings/${e}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"POST",body:JSON.stringify(t)})}function E(e){return fetch(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/${e}`,{credentials:"include"}).then((e=>e.json()))}function L(e){return fetch(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/removeGroupSpaceBinding/${e}`,{credentials:"include",method:"delete"})}function A(){return fetch(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/getGroupsTree`,{credentials:"include"}).then((e=>e.json()))}function P(){return fetch(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/getBindingReportOperations`,{credentials:"include"}).then((e=>e.json()))}function U(e,t,s,n){window.open(`${Vue.prototype.$spacesConstants.SPACE_GROUP_BINDING_API}/getExport?spaceId=${e}&action=${t}&group=${s}&groupBindingId=${n}`,"_blank")}function T(e){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/management/featureservice/changeFeatureActivation?featureName=externalUsers&isActive=${e}`,{method:"POST",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"}})}function N(){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/management/featureservice/isActiveFeature?featureName=externalUsers`,{method:"GET",credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((e=>{if(e&&e.ok)return e.json();throw new Error("Error when getting External Feature settings")}))}if(extensionRegistry&&extensionRegistry.registerExtension("exo-hamburger-menu-navigation","exo-hamburger-menu-navigation-items",{id:"HamburgerMenuNavigationSpaces",priority:20,secondLevel:!0,vueComponent:v["exo-spaces-hamburger-menu-navigation"]}),extensionRegistry){const e=extensionRegistry.loadComponents("SpacesHamburgerNavigation");e&&e.length>0&&e.forEach((e=>{Vue.component(e.componentName,e.componentOptions)}))}return Vue.prototype.$spacesAdministrationServices||window.Object.defineProperty(Vue.prototype,"$spacesAdministrationServices",{value:s}),document.dispatchEvent(new CustomEvent("exo-hamburger-menu-navigation-refresh")),t})()));