define((()=>(()=>{"use strict";var t={d:(e,s)=>{for(var a in s)t.o(s,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:s[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{init:()=>v});var s=function(){var t=this,e=t._self._c;return e("div",[t.isShown?e("v-app",[e("v-flex",{attrs:{"d-flex":"",xs12:"",sm12:""}},[e("v-layout",{attrs:{row:"",wrap:"","mx-0":""}},[e("v-flex",{attrs:{"d-flex":"",xs12:""}},[e("v-card",{staticClass:"flex",attrs:{flat:""}},[e("v-card-title",{staticClass:"external-spaces-list-title subtitle-1 text-uppercase pb-2"},[e("span",{staticClass:"body-1 text-sub-title"},[t._v("\n                "+t._s(t.$t("externalSpacesList.title.yourSpaces"))+"\n              ")])]),t._v(" "),e("v-list",{attrs:{dense:""}},[[t._l(t.spacesList,(function(t){return e("external-space-item",{key:t.id,attrs:{space:t}})})),t._v(" "),e("external-spaces-requests-items",{on:{invitationReplied:t.refreshSpaces}})]],2)],1)],1)],1)],1)],1):t._e()],1)};function a(){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spacesMemberships?status=invited&limit=-1`,{method:"GET",credentials:"include"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Error when getting external spaces requests")}))}function i(t,e,s,a,i,r,n,o){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=s,c._compiled=!0),a&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),n?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(n)},c._ssrRegister=l):i&&(l=o?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var p=c.render;c.render=function(t,e){return l.call(e),p(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:c}}s._withStripped=!0;const r=i({data:()=>({spacesList:[],spacesRequestsSize:0}),computed:{isShown(){return this.spacesList&&this.spacesList.length>0||this.spacesRequestsSize>0}},created(){this.getExternalSpacesList(),a().then((t=>{this.spacesRequestsSize=t.spacesMemberships.length})).finally((()=>this.$root.$applicationLoaded()))},methods:{getExternalSpacesList(){fetch(`${Vue.prototype.$spacesConstants.SOCIAL_USER_API}${eXo.env.portal.userName}/spaces?limit=-1`,{method:"GET",credentials:"include"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Error when getting spaces of current user")})).then((t=>{this.spacesList=t.spaces}))},refreshSpaces(t){this.spacesList.unshift(t)}}},s,[],!1,null,null,null).exports;var n=function(){var t=this,e=t._self._c;return e("v-list-item",{staticClass:"pa-1 pb-1",attrs:{href:t.url}},[e("v-list-item-avatar",{staticClass:"my-0 ps-4",attrs:{href:t.url,tile:""}},[e("v-avatar",{attrs:{size:t.avatarSize,tile:""}},[e("v-img",{staticClass:"mx-auto spaceAvatar",attrs:{src:t.avatarUrl,height:t.avatarSize,width:t.avatarSize,"max-height":t.avatarSize,"max-width":t.avatarSize,role:"presentation"}})],1)],1),t._v(" "),e("v-list-item-content",{staticClass:"pa-0",attrs:{id:t.id}},[e("v-list-item-title",[e("a",{staticClass:"text-color text-truncate spaceTitle"},[t._v("\n        "+t._s(t.space.displayName)+"\n      ")])])],1)],1)};n._withStripped=!0;const o=i({props:{space:{type:Object,default:()=>null},avatarSize:{type:Number,default:()=>37}},computed:{avatarUrl(){return this.space.avatarUrl||`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spaces/${this.space.prettyName}/avatar`},url(){if(!this.space||!this.space.groupId)return"#";const t=this.space.groupId.replace(/\//g,":");return`${eXo.env.portal.context}/g/${t}/`}}},n,[],!1,null,null,null).exports;var l=function(){var t=this,e=t._self._c;return e("v-layout",{attrs:{row:"",wrap:"","pa-1":"","pb-1":"","mx-0":""}},[e("v-flex",{attrs:{xs12:""}},[e("v-list",[t._l(t.spacesRequests,(function(s){return[e("v-list-item",{key:s.id,staticClass:"py-0 px-2"},[e("v-list-item-avatar",{staticClass:"my-0 ps-2",attrs:{tile:""}},[e("v-avatar",{attrs:{size:t.avatarSize,tile:""}},[e("v-img",{staticClass:"mx-auto spaceAvatar",attrs:{src:s.avatar,height:t.avatarSize,width:t.avatarSize,"max-height":t.avatarSize,"max-width":t.avatarSize,role:"presentation"}})],1)],1),t._v(" "),e("v-list-item-content",{staticClass:"py-0"},[e("v-list-item-title",{staticClass:"text-color text-truncate requestSpaceName",domProps:{textContent:t._s(s.displayName)}}),t._v(" "),e("v-list-item-subtitle",{staticClass:"caption grey-color",domProps:{textContent:t._s(s.description)}})],1),t._v(" "),e("v-list-item-action",[e("v-btn-toggle",{staticClass:"transparent",attrs:{dark:""}},[e("v-btn",{directives:[{name:"exo-tooltip",rawName:"v-exo-tooltip.bottom.body",value:t.$t("externalSpacesList.tooltip.AcceptToJoin"),expression:"$t('externalSpacesList.tooltip.AcceptToJoin')",modifiers:{bottom:!0,body:!0}}],staticClass:"px-0",attrs:{text:"",icon:"",small:"","min-width":"auto"},on:{click:function(e){return t.replyInvitationToJoinSpace(s.id,"approved")}}},[e("v-icon",{attrs:{color:"green",size:"20"}},[t._v("mdi-checkbox-marked-circle")])],1),t._v(" "),e("v-btn",{directives:[{name:"exo-tooltip",rawName:"v-exo-tooltip.bottom.body",value:t.$t("externalSpacesList.tooltip.DeclineInvitation"),expression:"$t('externalSpacesList.tooltip.DeclineInvitation')",modifiers:{bottom:!0,body:!0}}],staticClass:"px-0",attrs:{text:"",icon:"",small:"","min-width":"auto"},on:{click:function(e){return t.replyInvitationToJoinSpace(s.id,"ignored")}}},[e("v-icon",{attrs:{color:"red",size:"20"}},[t._v("mdi-close-circle")])],1)],1)],1)],1)]}))],2)],1)],1)};l._withStripped=!0;const c={"external-spaces-list":r,"external-space-item":o,"external-spaces-requests-items":i({props:{avatarSize:{type:Number,default:()=>37}},data:()=>({spacesRequests:[]}),created(){this.getSpacesRequests()},methods:{getSpacesRequests(){this.spacesRequests=[],a().then((t=>{for(let e=0;e<t.spacesMemberships.length;e++){const s={};s.id=t.spacesMemberships[e].id,fetch(`${t.spacesMemberships[e].space}`,{method:"GET",credentials:"include"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Error when getting space")})).then((t=>{s.avatar=t.avatarUrl||`/portal/rest/v1/social/spaces/${s.id.split(":")[0]}/avatar`,s.displayName=t.displayName,this.spacesRequests.splice(e,0,s)}))}}))},replyInvitationToJoinSpace(t,e){(function(t,e){const s={status:`${e}`};return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spacesMemberships/${t}`,{method:"PUT",credentials:"include",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Error when replying invitation to join space")}))})(t,e).then((()=>{if("approved"===e){const e=this.spacesRequests.filter((e=>e.id===t))[0],s={id:e.id,displayName:e.displayName,avatarUrl:e.avatar};this.$emit("invitationReplied",s)}this.getSpacesRequests()}))}}},l,[],!1,null,null,null).exports};for(const t in c)Vue.component(t,c[t]);const p="undefined"!=typeof eXo?eXo.env.portal.language:"en",d=`${Vue.prototype.$spacesConstants.PORTAL}/${Vue.prototype.$spacesConstants.PORTAL_REST}/i18n/bundle/locale.portlet.social.ExternalSpacesListApplication-${p}.json`;if(extensionRegistry){const t=extensionRegistry.loadComponents("ExternalSpacesList");t&&t.length>0&&t.forEach((t=>{Vue.component(t.componentName,t.componentOptions)}))}document.dispatchEvent(new CustomEvent("displayTopBarLoading"));const u="ExternalSpacesListPortlet";function v(){exoi18n.loadLanguageAsync(p,d).then((t=>{Vue.createApp({mounted(){document.dispatchEvent(new CustomEvent("hideTopBarLoading"))},template:`<external-spaces-list id="${u}" />`,i18n:t,vuetify:Vue.prototype.vuetifyOptions},`#${u}`,"External Spaces List")}))}return e})()));