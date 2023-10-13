define((()=>(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{init:()=>_});var i={};t.r(i),t.d(i,{getNavigations:()=>p});var n=function(){var t=this,e=t._self._c;return e("v-app",[t.isMobile&&this.mobileNavigations.length?e("v-footer",{staticClass:"white pt-0 pr-0 pl-0 elevation-2",attrs:{inset:"",fixed:""}},[e("v-tabs",{staticClass:"navigation-mobile-menu",attrs:{optional:"",height:"56","slider-size":"4"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.mobileNavigations,(function(i,n){return e("navigation-mobile-menu-item",{key:i.id,attrs:{navigation:i,"base-site-uri":t.getNavigationBaseUri(n)},on:{"update-navigation-state":t.updateNavigationState}})})),1)],1):e("v-tabs",{attrs:{"show-arrows":"","center-active":"",optional:"",height:"56","slider-size":"4"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.navigations,(function(i,n){return e("navigation-menu-item",{key:i.id,attrs:{navigation:i,"base-site-uri":t.getNavigationBaseUri(n)},on:{"update-navigation-state":t.updateNavigationState}})})),1)],1)};function a(t,e,i,n,a,o,s,r){var l,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=i,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),s?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=l):a&&(l=r?function(){a.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:a),l)if(u.functional){u._injectStyles=l;var h=u.render;u.render=function(t,e){return l.call(e),h(t,e)}}else{var c=u.beforeCreate;u.beforeCreate=c?[].concat(c,l):[l]}return{exports:t,options:u}}n._withStripped=!0;const o=a({data:()=>({BASE_SITE_URI:`${eXo.env.portal.context}/${eXo.env.portal.portalName}/`,navigations:[],mobileNavigations:[],scope:"ALL",globalScope:"children",visibility:"displayed",siteType:"PORTAL",exclude:"global",tab:null,navigationTabState:"topNavigationTabState"}),created(){this.getNavigations(),this.getActiveTab()},watch:{isMobile(){this.isMobile?this.refreshMobileNavigations():this.computeSiteBodyMargin()}},computed:{isMobile(){return"sm"===this.$vuetify.breakpoint.name||"xs"===this.$vuetify.breakpoint.name||"md"===this.$vuetify.breakpoint.name}},methods:{getNavigationBaseUri(t){const e=`${this.BASE_SITE_URI}${this.navigations[0].name}`;return t&&`${e}/`||e},getNavigations(){const t=eXo.env.portal.portalName;return this.$navigationService.getNavigations(t,this.siteType,this.globalScope,this.visibility,this.exclude).then((e=>{if(e.length){const i=e[0];return this.$navigationService.getNavigations(t,this.siteType,this.scope,this.visibility,null,i.id).then((t=>{this.navigations=t||[],this.constructNavigations()}))}}))},updateNavigationState(t){sessionStorage.setItem(this.navigationTabState,t)},constructNavigations(){this.navigations.length&&this.navigations[0].children?.length?(this.navigations.push(...this.navigations[0].children),this.navigations[0].children=[]):this.navigations=[],this.isMobile&&this.refreshMobileNavigations()},refreshMobileNavigations(){if(this.navigations.length>3){this.mobileNavigations=[];const t=this.navigations.slice(2,this.navigations.length);this.mobileNavigations.push(...this.navigations.slice(0,2)),this.mobileNavigations.push({id:0,name:"more",label:this.$t("topBar.navigation.label.more"),children:t})}else this.mobileNavigations=this.navigations;this.computeSiteBodyMargin()},getActiveTab(){const t=eXo.env.portal.portalName;let e=location.pathname;e===`${eXo.env.portal.context}/${t}/`&&(e=`${eXo.env.portal.context}/${t}/${eXo.env.portal.selectedNodeUri}`,this.updateNavigationState(e)),this.tab=sessionStorage.getItem(this.navigationTabState),e===this.tab||e.startsWith(this.tab)||(this.tab=e)},computeSiteBodyMargin(){this.isMobile?window.setTimeout((()=>{$("#UISiteBody").css("margin-bottom","70px")}),200):$("#UISiteBody").css("margin-bottom","")}}},n,[],!1,null,null,null).exports;var s=function(){var t=this,e=t._self._c;return e("v-menu",{attrs:{rounded:"","content-class":"topBar-navigation-drop-menu",left:t.$vuetify.rtl,"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({attrs:i}){return[e("v-tab",t._b({staticClass:"mx-auto text-caption text-break",attrs:{href:`${t.baseSiteUri}${t.navigation.uri}`,disabled:!t.hasPage&&!t.hasChildren,link:t.hasPage},on:{click:function(e){return e.stopPropagation(),t.checkLink(t.navigation,e)},change:function(e){return t.updateNavigationState(t.navigation.uri)}}},"v-tab",i,!1),[e("span",{staticClass:"text-truncate-3"},[t._v("\n        "+t._s(t.navigation.label)+"\n      ")]),t._v(" "),t.hasPage&&t.hasChildren?e("v-btn",{attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.openDropMenu.apply(null,arguments)}}},[e("v-icon",{attrs:{size:"20"}},[t._v("\n          fa-angle-down\n        ")])],1):t.hasChildren?e("v-icon",{staticClass:"pa-3",attrs:{size:"20"}},[t._v("\n        fa-angle-down\n      ")]):t._e()],1)]}}]),model:{value:t.showMenu,callback:function(e){t.showMenu=e},expression:"showMenu"}},[t._v(" "),e("navigation-menu-sub-item",{attrs:{navigation:t.navigation.children,"base-site-uri":t.baseSiteUri,"parent-navigation-uri":t.navigation.uri},on:{"update-navigation-state":t.updateNavigationState}})],1)};s._withStripped=!0;const r=a({data:()=>({showMenu:!1}),props:{navigation:{type:Object,default:null},baseSiteUri:{type:String,default:null}},created(){document.addEventListener("click",this.handleCloseMenu),this.$root.$on("close-sibling-drop-menus",this.handleCloseSiblingMenus)},computed:{hasChildren(){return this.navigation?.children?.length},hasPage(){return!!this.navigation?.pageKey}},methods:{updateNavigationState(t){this.$emit("update-navigation-state",`${this.baseSiteUri}${t}`)},checkLink(t,e){t.pageKey||e.preventDefault(),t.children&&this.openDropMenu()},openDropMenu(t){!t&&this.showMenu?this.showMenu=!1:this.showMenu||(this.showMenu=!0,this.$root.$emit("close-sibling-drop-menus",this))},handleCloseSiblingMenus(t){this!==t&&this.showMenu&&(this.showMenu=!1)},handleCloseMenu(){this.showMenu&&setTimeout((()=>{this.showMenu=!1}),100)}}},s,[],!1,null,null,null).exports;var l=function(){var t=this,e=t._self._c;return e("v-list",{staticClass:"pa-0",attrs:{dense:""}},t._l(t.navigation,(function(i){return e("v-list-item",{key:i.id,staticClass:"pt-0 pb-0",attrs:{href:`${t.baseSiteUri}${i.uri}`,disabled:!i.pageKey&&!i.children?.length,link:!!i.pageKey},on:{click:function(e){return e.stopPropagation(),t.checkLink(i,e)}}},[e("v-menu",{attrs:{"content-class":"topBar-navigation-drop-sub-menu",rounded:"",left:t.$vuetify.rtl,"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function({attrs:n,on:a}){return[e("v-list-item-title",t._b({staticClass:"pt-5 pb-5 text-caption",domProps:{textContent:t._s(i.label)}},"v-list-item-title",n,!1)),t._v(" "),i.children?.length?e("v-list-item-icon",{staticClass:"ms-0 me-n2 ma-auto full-height"},[e("v-btn",t._g({attrs:{icon:""},on:{click:function(t){t.stopPropagation(),t.preventDefault()}}},i.children?.length&&a),[e("v-icon",{attrs:{size:"18"}},[t._v("\n              "+t._s(t.$vuetify.rtl?"fa-angle-left":"fa-angle-right")+"\n            ")])],1)],1):t._e()]}}],null,!0)},[t._v(" "),e("navigation-menu-sub-item",{attrs:{navigation:i.children,"parent-navigation-uri":t.parentNavigationUri,"base-site-uri":t.baseSiteUri},on:{"update-navigation-state":t.updateNavigationState}})],1)],1)})),1)};l._withStripped=!0;const u=a({data:()=>({showMenu:!1}),props:{navigation:{type:Object,default:null},baseSiteUri:{type:String,default:null},parentNavigationUri:{type:String,default:null}},methods:{checkLink(t,e){t.pageKey?this.$emit("update-navigation-state",`${this.parentNavigationUri}`):e.preventDefault()},updateNavigationState(t){this.$emit("update-navigation-state",t)}}},l,[],!1,null,null,null).exports;var h=function(){var t=this,e=t._self._c;return e("v-menu",{attrs:{rounded:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function({attrs:i,on:n}){return[e("v-tab",t._b({staticClass:"mx-auto text-caption pa-1 text-break navigation-mobile-menu-tab",attrs:{href:`${t.baseSiteUri}${t.navigation.uri}`,disabled:!t.hasPage&&!t.hasChildren,link:t.hasPage},on:{click:function(e){return e.stopPropagation(),t.checkLink(t.navigation,e)},change:function(e){return t.updateNavigationState(t.navigation.uri)}}},"v-tab",i,!1),[e("span",{staticClass:"text-truncate-3 pt-2"},[t._v("\n        "+t._s(t.navigation.label)+"\n      ")]),t._v(" "),t.hasPage&&t.hasChildren?e("v-btn",t._g({staticClass:"mt-2",attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.openDropMenu.apply(null,arguments)}}},t.hasChildren&&n),[e("v-icon",{attrs:{size:"20"}},[t._v("\n          fa-angle-up\n        ")])],1):t.hasChildren?e("v-icon",{staticClass:"pa-3 mt-2",attrs:{size:"20"}},[t._v("\n        fa-angle-up\n      ")]):t._e()],1)]}}]),model:{value:t.showMenu,callback:function(e){t.showMenu=e},expression:"showMenu"}},[t._v(" "),t.hasChildren?e("navigation-mobile-menu-sub-item",{attrs:{navigation:t.navigation.children,"base-site-uri":t.baseSiteUri,"show-menu":t.showMenu,"parent-navigation-uri":t.navigation.uri},on:{"update-navigation-state":t.updateNavigationState}}):t._e()],1)};h._withStripped=!0;const c=a({data:()=>({showMenu:!1}),props:{navigation:{type:Object,default:null},baseSiteUri:{type:String,default:null}},created(){document.addEventListener("click",this.handleCloseMenu),this.$root.$on("close-sibling-drop-menus",this.handleCloseSiblingMenus)},computed:{hasChildren(){return this.navigation?.children?.length},hasPage(){return!!this.navigation?.pageKey}},methods:{updateNavigationState(t){this.$emit("update-navigation-state",`${this.baseSiteUri}${t}`)},checkLink(t,e){t.pageKey||e.preventDefault(),t.children&&this.openDropMenu()},openDropMenu(t){!t&&this.showMenu?this.showMenu=!1:this.showMenu||(this.$root.$emit("close-sibling-drop-menus",this),this.$nextTick().then((()=>{this.showMenu=!0})))},handleCloseSiblingMenus(t){this!==t&&this.showMenu&&(this.showMenu=!1)},handleCloseMenu(){this.showMenu&&setTimeout((()=>{this.showMenu=!1}),100)}}},h,[],!1,null,null,null).exports;var v=function(){var t=this,e=t._self._c;return e("v-bottom-sheet",{attrs:{inset:"","content-class":"topBar-navigation-bottom-drop-menu","hide-overlay":""},model:{value:t.showChildren,callback:function(e){t.showChildren=e},expression:"showChildren"}},[t.showChildren?e("v-sheet",[t.navigationObject.previous?e("div",[e("v-btn",{staticClass:"mt-2 ms-1",attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.prev.apply(null,arguments)}}},[e("v-icon",{attrs:{size:"15"}},[t._v("\n          "+t._s(t.$vuetify.rtl?"fa-arrow-right":"fa-arrow-left")+"\n        ")])],1)],1):t._e(),t._v(" "),e("v-list",{staticClass:"mt-n3",attrs:{dense:""}},[e("v-list-item-group",t._l(t.navigationObject,(function(i){return e("v-list-item",{key:i.id,attrs:{href:`${t.baseSiteUri}${i.uri}`,disabled:!i.pageKey&&!i.children?.length,link:!!i.pageKey},on:{click:function(e){return e.stopPropagation(),t.checkLink(i,e)}}},[e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(i.label)}})],1),t._v(" "),i.children?.length?e("v-list-item-icon",{staticClass:"full-height"},[e("v-btn",{attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.next(i)}}},[e("v-icon",{attrs:{size:"18"}},[t._v("\n                "+t._s(t.$vuetify.rtl?"fa-angle-left":"fa-angle-right")+"\n              ")])],1)],1):t._e()],1)})),1)],1)],1):t._e()],1)};function p(t,e,i,n,a,o){const s=new FormData;t&&s.append("siteName",t),i&&s.append("scope",i),n&&s.append("visibility",n),a&&s.append("exclude",a),o&&s.append("nodeId",o);const r=new URLSearchParams(s).toString();return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/navigations/${e||"portal"}?${r}`,{method:"GET",credentials:"include"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Response code indicates a server error")}))}v._withStripped=!0;const g={"top-bar-navigation-menu":o,"navigation-menu-item":r,"navigation-menu-sub-item":u,"navigation-mobile-menu-item":c,"navigation-mobile-menu-sub-item":a({data:()=>({navigationObject:null,showChildren:!1}),props:{navigation:{type:Object,default:null},baseSiteUri:{type:String,default:null},showMenu:{type:Boolean,default:!1},parentNavigationUri:{type:String,default:null}},created(){this.navigationObject=Object.assign({},this.navigation),this.showChildren=this.showMenu},watch:{showMenu(t){this.showChildren=t,t&&(this.navigationObject=Object.assign({},this.navigation))}},methods:{next(t){const e=this.navigationObject;this.navigationObject=t.children,this.navigationObject.previous=e},prev(){this.navigationObject=this.navigationObject.previous},checkLink(t,e){t.pageKey?this.$emit("update-navigation-state",`${this.parentNavigationUri}`):(e.preventDefault(),t.children&&this.next(t))}}},v,[],!1,null,null,null).exports};for(const t in g)Vue.component(t,g[t]);if(Vue.prototype.$navigationService||window.Object.defineProperty(Vue.prototype,"$navigationService",{value:i}),extensionRegistry){const t=extensionRegistry.loadComponents("TopBarNavigationMenu");t&&t.length>0&&t.forEach((t=>{Vue.component(t.componentName,t.componentOptions)}))}const d=eXo&&eXo.env.portal.language||"en",b=`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.Portlets-${d}.json`;Vue.use(Vuetify);const m=new Vuetify(eXo.env.portal.vuetifyPreset),f="topBarMenu";function _(){document.dispatchEvent(new CustomEvent("displayTopBarLoading")),exoi18n.loadLanguageAsync(d,b).then((t=>{Vue.createApp({mounted(){document.dispatchEvent(new CustomEvent("hideTopBarLoading"))},template:`<top-bar-navigation-menu id="${f}" />`,vuetify:m,i18n:t},`#${f}`,"TopBar Navigation Menu")}))}return e})()));