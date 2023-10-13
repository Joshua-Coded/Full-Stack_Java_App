define((function(){return function(t){var n={};function e(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,e),a.l=!0,a.exports}return e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(o,a,function(n){return t[n]}.bind(null,a));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=11)}([function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=t(n);return n[2]?"@media ".concat(n[2]," {").concat(e,"}"):e})).join("")},n.i=function(t,e,o){"string"==typeof t&&(t=[[null,t,""]]);var a={};if(o)for(var i=0;i<this.length;i++){var r=this[i][0];null!=r&&(a[r]=!0)}for(var l=0;l<t.length;l++){var s=[].concat(t[l]);o&&a[s[0]]||(e&&(s[2]?s[2]="".concat(e," and ").concat(s[2]):s[2]=e),n.push(s))}},n}},function(t,n,e){"use strict";function o(t,n,e,o,a,i,r,l){var s=typeof(t=t||{}).default;"object"!==s&&"function"!==s||(t=t.default);var c,u="function"==typeof t?t.options:t;if(n&&(u.render=n,u.staticRenderFns=e,u._compiled=!0),o&&(u.functional=!0),i&&(u._scopeId=i),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=c):a&&(c=l?function(){a.call(this,this.$root.$options.shadowRoot)}:a),c)if(u.functional){u._injectStyles=c;var d=u.render;u.render=function(t,n){return c.call(n),d(t,n)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,c):[c]}return{exports:t,options:u}}e.d(n,"a",(function(){return o}))},function(t,n,e){"use strict";function o(t,n){for(var e=[],o={},a=0;a<n.length;a++){var i=n[a],r=i[0],l={id:t+":"+a,css:i[1],media:i[2],sourceMap:i[3]};o[r]?o[r].parts.push(l):e.push(o[r]={id:r,parts:[l]})}return e}e.r(n),e.d(n,"default",(function(){return f}));var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},r=a&&(document.head||document.getElementsByTagName("head")[0]),l=null,s=0,c=!1,u=function(){},d=null,p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(t,n,e,a){c=e,d=a||{};var r=o(t,n);return v(r),function(n){for(var e=[],a=0;a<r.length;a++){var l=r[a];(s=i[l.id]).refs--,e.push(s)}n?v(r=o(t,n)):r=[];for(a=0;a<e.length;a++){var s;if(0===(s=e[a]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}}function v(t){for(var n=0;n<t.length;n++){var e=t[n],o=i[e.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](e.parts[a]);for(;a<e.parts.length;a++)o.parts.push(g(e.parts[a]));o.parts.length>e.parts.length&&(o.parts.length=e.parts.length)}else{var r=[];for(a=0;a<e.parts.length;a++)r.push(g(e.parts[a]));i[e.id]={id:e.id,refs:1,parts:r}}}}function h(){var t=document.createElement("style");return t.type="text/css",r.appendChild(t),t}function g(t){var n,e,o=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(o){if(c)return u;o.parentNode.removeChild(o)}if(p){var a=s++;o=l||(l=h()),n=y.bind(null,o,a,!1),e=y.bind(null,o,a,!0)}else o=h(),n=_.bind(null,o),e=function(){o.parentNode.removeChild(o)};return n(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;n(t=o)}else e()}}var b,m=(b=[],function(t,n){return b[t]=n,b.filter(Boolean).join("\n")});function y(t,n,e,o){var a=e?"":o.css;if(t.styleSheet)t.styleSheet.cssText=m(n,a);else{var i=document.createTextNode(a),r=t.childNodes;r[n]&&t.removeChild(r[n]),r.length?t.insertBefore(i,r[n]):t.appendChild(i)}}function _(t,n){var e=n.css,o=n.media,a=n.sourceMap;if(o&&t.setAttribute("media",o),d.ssrId&&t.setAttribute("data-vue-ssr-id",n.id),a&&(e+="\n/*# sourceURL="+a.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},function(t,n,e){var o=e(4);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(2).default)("7e063fea",o,!1,{})},function(t,n,e){"use strict";e.r(n);var o=e(0),a=e.n(o)()((function(t){return t[1]}));a.push([t.i,'/* Typography */\n/* colors */\n/* layout */\n/* layout */\n/* border & shadow */\n/* borde & shadow */\n/* Responsive */\n/* Responsive */\n.VuetifyApp .v-btn:not(.v-btn--round).v-size--default[data-v-e2f9450e] {\n  padding: 0px;\n  min-width: unset;\n  width: 100%;\n  height: 100%;\n}\n.VuetifyApp .v-btn[data-v-e2f9450e] {\n  padding: 0px;\n  justify-content: flex-start;\n}\n.VuetifyApp .theme--light.v-btn[data-v-e2f9450e] {\n  background: inherit;\n}\n.VuetifyApp .theme--light.v-btn[data-v-e2f9450e]:focus::before {\n  opacity: 0;\n  background: transparent;\n}\n.VuetifyApp .theme--light.v-btn[data-v-e2f9450e]:hover::before {\n  color: #476A9C;\n  opacity: 0;\n}\n.VuetifyApp .call-button-container button .v-btn__content[data-v-e2f9450e] {\n  letter-spacing: normal;\n  padding: 0 10px;\n  height: 100%;\n}\n.VuetifyApp .call-button-container.single:hover button:hover i[data-v-e2f9450e] {\n  color: #476A9C;\n}\n.VuetifyApp .call-button-container.single:hover button:hover span[data-v-e2f9450e] {\n  color: unset;\n}\n.jitsiCallAction[data-v-e2f9450e] {\n  color: var(--allPagesDarkGrey, #4d5466) !important;\n}\n.jitsiCallAction .uiIconSocPhone[data-v-e2f9450e]:before {\n  content: "\\e92b";\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\n.jitsiCallAction .uiIconSocPhone.uiIconCallStart[data-v-e2f9450e]:before {\n  color: unset;\n  content: "\\e92b";\n}\n.jitsiCallAction .uiIconSocPhone.uiIconCallJoin[data-v-e2f9450e]:before {\n  content: "\\E61C";\n  color: #fb8e18;\n}\n.jitsiCallAction .uiIconSocPhone.uiIconCallJoined[data-v-e2f9450e]:before {\n  color: #2eb58c;\n  content: "\\e92b";\n}\n.call-button-mini .VuetifyApp .call-button-container .dropdown-vue .buttons-container [class^="call-button-container-"] button[data-v-e2f9450e] {\n  background: transparent;\n  box-shadow: none;\n  border: none;\n}\n.call-button-mini .VuetifyApp .call-button-container .dropdown-vue .buttons-container [class^="call-button-container-"] .v-btn[data-v-e2f9450e] {\n  padding: 0px;\n  vertical-align: baseline;\n}\n.call-button-mini .VuetifyApp .call-button-container .dropdown-vue .buttons-container [class^="call-button-container-"]:hover .v-btn[data-v-e2f9450e] {\n  color: white!important;\n}\n.call-button-mini .VuetifyApp .call-button-container .dropdown-vue .buttons-container [class^="call-button-container-"]:hover .v-btn i.uiIconSocPhone[data-v-e2f9450e] {\n  color: white!important;\n}\n.call-button-mini .VuetifyApp .call-button-container.single:hover button:hover i[data-v-e2f9450e] {\n  color: var(--allPagesGreyColorLighten1, #5f708a);\n}\n.call-button-mini .VuetifyApp .call-button-container.single .single-btn-container button[data-v-e2f9450e] {\n  margin-right: 0;\n  border: none;\n  background: transparent;\n  justify-content: center;\n}\n.call-button-mini .VuetifyApp .call-button-container.single .single-btn-container button .v-btn__content span[data-v-e2f9450e] {\n  display: none;\n}\n.call-button-mini .VuetifyApp .call-button-container.single .single-btn-container button .v-btn__content .uiIconSocPhone[data-v-e2f9450e] {\n  font-size: 18px !important;\n  margin-bottom: 0px;\n}\n.call-button-mini .VuetifyApp:hover.single .single-btn-container button[data-v-e2f9450e] {\n  width: inherit;\n  margin-right: 0;\n  border: none;\n  background: #ffffff;\n}\n.call-button-mini .VuetifyApp:hover.single .single-btn-container button span[data-v-e2f9450e] {\n  width: inherit;\n}\n.call-button-mini.call-button--tiptip .VuetifyApp .call-button-container .buttons-container [class^="call-button-container-"] button[data-v-e2f9450e] {\n  padding-left: 0;\n}\n.call-button-mini.call-button--tiptip .VuetifyApp .call-button-container .buttons-container [class^="call-button-container-"] button .v-btn__content .uiIconSocPhone[data-v-e2f9450e] {\n  font-size: 16px !important;\n}\n.call-button-mini.call-button--tiptip .VuetifyApp .call-button-container .buttons-container [class^="call-button-container-"] button .v-btn__content .uiIconSocPhone[data-v-e2f9450e]::before {\n  content: "\\e92b";\n}\n',""]),n.default=a},function(t,n,e){var o=e(6);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(2).default)("73b4e582",o,!1,{})},function(t,n,e){"use strict";e.r(n);var o=e(0),a=e.n(o)()((function(t){return t[1]}));a.push([t.i,'\n.VuetifyApp .v-application .btn.jitsiCallAction {\n  border: none !important;\n  background-color: inherit !important;\n}\n.call-button--profile .uiIconSocPhone,\n.call-button--chat .uiIconSocPhone {\n  font-size: 14px;\n  margin-bottom: -2px;\n}\n.uiAction .jitsiCallAction.btn:first-child [class^="uiIcon"] {\n  color: var(--allPagesPrimaryColor, #476A9C);\n}\n#tiptip_content .connectAction .btn.jitsiCallAction {\n  height: inherit;\n}\n',""]),n.default=a},function(t,n,e){var o=e(8);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(2).default)("0b7cd49e",o,!1,{})},function(t,n,e){"use strict";e.r(n);var o=e(0),a=e.n(o)()((function(t){return t[1]}));a.push([t.i,'\n.spacer[data-v-50426a43] {\n  flex-grow: unset !important;\n  width: 12%;\n}\n.v-dialog__content[data-v-50426a43] {\n  justify-content: center;\n  left: unset;\n  position: static;\n  margin: 0px 10px 20px;\n  height: fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  width: -moz-fit-content;\n}\n.v-dialog[data-v-50426a43] {\n  border-radius: 2px;\n  height: 160px;\n}\n.v-dialog .v-sheet.v-card[data-v-50426a43] {\n  border-radius: 2px;\n  height: 160px;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 80px);\n  grid-auto-rows: 10px;\n  width: initial;\n}\n.v-dialog .v-sheet.v-card [class^="uiIcon"].start-call[data-v-50426a43] {\n  position: absolute;\n  top: 15%;\n  left: 24%;\n}\n.v-dialog .v-sheet.v-card [class^="uiIcon"].start-call[data-v-50426a43]::before {\n  content: "\\e61c";\n  color: #fb8e18;\n  font-size: 20px;\n}\n.v-dialog .v-sheet.v-card .v-avatar[data-v-50426a43] {\n  border-radius: 50% !important;\n  align-self: center;\n  justify-self: center;\n  top: 15px;\n  left: -15px;\n}\n.v-dialog .v-sheet.v-card .v-card__text[data-v-50426a43] {\n  grid-column: 2 / span 2;\n  grid-row: 1 / span 1;\n  padding: 20px 15px 20px 0px;\n  font-size: 16px;\n  color: #333;\n}\n.v-dialog .v-sheet.v-card .v-card__actions[data-v-50426a43] {\n  grid-column: 1 / span 3;\n  grid-row: 2 / span 1;\n  padding: 8px 0px !important;\n  display: flex;\n  justify-content: center;\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn[data-v-50426a43] {\n  padding: 0;\n  height: 50px;\n  width: 50px;\n  border: 1px solid;\n  margin-left: 0px !important;\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn .v-btn__content [class^="uiIcon"][data-v-50426a43] {\n  position: relative;\n  height: 25px;\n  width: 50px;\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn .v-btn__content [class^="uiIcon"][data-v-50426a43]::before {\n  position: absolute;\n  font-size: 24px;\n  right: 50%;\n  transform: translateX(50%);\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn.accept-button .uiIconPopupPhone[data-v-50426a43] {\n  color: white;\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn.accept-button .uiIconPopupPhone[data-v-50426a43]::before {\n  content: "\\e92b";\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn.decline-button .uiIconPopupClose[data-v-50426a43] {\n  opacity: 1;\n}\n.v-dialog .v-sheet.v-card .v-card__actions .v-btn.decline-button .uiIconPopupClose[data-v-50426a43]::before {\n  color: #aeb3b7;\n  content: "\\e9d2";\n}\n.v-dialog .v-sheet.v-card .v-card__actions .button-title[data-v-50426a43] {\n  font-weight: 700;\n  font-size: 14px;\n  cursor: pointer;\n  color: #333;\n}\n',""]),n.default=a},function(t,n,e){var o=e(10);o.__esModule&&(o=o.default),"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,e(2).default)("c606d6f4",o,!1,{})},function(t,n,e){"use strict";e.r(n);var o=e(0),a=e.n(o)()((function(t){return t[1]}));a.push([t.i,"\n#vuetify-apps {\n  display: flex;\n  flex-flow: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n  width: 100%;\n  min-height: calc(100vh - 57px);\n}\n.incoming-dialog {\n  border: 1px solid #aeb3b7;\n}\n.VuetifyApp.call-popup {\n  position: fixed;\n  height: 100vh;\n  padding-left: 77px;\n  margin-top: 57px;\n  overflow-y: hidden;\n  z-index: 70;\n  right: 0px;\n  pointer-events: none;\n}\n",""]),n.default=a},function(t,n,e){"use strict";e.r(n),e.d(n,"init",(function(){return C})),e.d(n,"updateCallState",(function(){return x})),e.d(n,"initCallPopup",(function(){return S})),e.d(n,"closeCallPopup",(function(){return w}));var o={name:"JitsiMeetButton",props:{callSettings:{type:Object,required:!0},i18n:{type:Object,required:!0},language:{type:String,required:!0},resourceBundleName:{type:String,required:!0}},data:function(){return{settings:this.callSettings,log:null,callWindow:null}},computed:{callState:function(){return this.callSettings.callState},parentClasses:function(){return this.callSettings.context.parentClasses},buttonTitle:function(){return"joined"===this.callState?this.generateButtonTitle("UICallButton.label.joined","Joined","uiIconCallJoined"):"started"===this.callState||"leaved"===this.callState?this.generateButtonTitle("UICallButton.label.join","Join Call","uiIconCallJoin"):this.generateButtonTitle("UICallButton.label.jitsi","Call","uiIconCallStart")}},created(){this.log=webConferencing.getLog("jitsi")},mounted(){},methods:{startCall:function(){this.callSettings.onCallOpen()},generateButtonTitle:function(t,n,e){return this.parentClasses?{title:this.parentClasses.includes("call-button-mini")||this.parentClasses.includes("call-button")?this.i18n.te(t)?this.$t(t):n:"",icon:e}:{icon:e}}}},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,a=n.attrs;return[e("v-btn",t._g(t._b({ref:"jitsi",staticClass:"jitsiCallAction",attrs:{ripple:!1,outlined:""},on:{click:function(n){return n.stopPropagation(),n.preventDefault(),t.startCall(n)}}},"v-btn",a,!1),o),[e("i",{staticClass:"uiIconSocPhone uiIconBlue ps-2",class:t.buttonTitle.icon}),t._v(" "),e("span",[t._v(t._s(t.buttonTitle.title))])])]}}])},[t._v(" "),e("span",[t._v(t._s(t.buttonTitle.title))])])};a._withStripped=!0;var i=e(1);var r=function(t){e(3),e(5)},l=Object(i.a)(o,a,[],!1,r,"data-v-e2f9450e",null);l.options.__file="src/main/webapp/vue-apps/CallButton/components/JitsiMeetButton.vue";var s=l.exports;function c(t){t&&(t.pause(),t.currentTime=0)}var u={name:"CallPopup",props:{isDialogVisible:{type:Boolean,required:!0,default:!1},caller:{type:String,required:!0},avatar:{type:String,required:!0},callerMessage:{type:String,required:!0},playRingtone:{type:Boolean,required:!0},i18n:{type:Object,required:!0}},data:()=>({state:null}),mounted(){if(this.state="shown",this.playRingtone)try{this.$refs.audio.play()}catch(t){console.error("Error playing ringtone for Jitsi call: "+this.caller,t)}},methods:{passAccepted(){"shown"===this.state&&(this.state="closed",this.$emit("accepted"),c(this.$refs.audio))},passRejected(){"shown"===this.state&&(this.state="closed",this.$emit("rejected"),c(this.$refs.audio))}}},d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"VuetifyApp"},[t.isDialogVisible?e("v-app",[e("v-dialog",{ref:"incoming",attrs:{"retain-focus":!1,"content-class":"incoming-dialog","no-click-animation":"",persistent:"","hide-overlay":"",width:"430"},model:{value:t.isDialogVisible,callback:function(n){t.isDialogVisible=n},expression:"isDialogVisible"}},[e("v-card",[e("v-avatar",{attrs:{color:"#476A9C",width:"70",height:"70"}},[e("img",{attrs:{src:t.avatar,alt:t.caller}})]),t._v(" "),e("i",{staticClass:"uiIconSocPhone start-call"}),t._v(" "),e("v-card-text",{attrs:{color:"#333"},domProps:{innerHTML:t._s(t.callerMessage)}}),t._v(" "),e("v-card-actions",{attrs:{color:"#333"}},[e("v-btn",{staticClass:"ma-2 accept-button",attrs:{color:"#2eb58c",elevation:"0",fab:""},on:{click:t.passAccepted}},[e("i",{staticClass:"uiIconPopupPhone"})]),t._v(" "),e("span",{staticClass:"button-title",on:{click:t.passAccepted}},[t._v("\n            "+t._s(t.i18n.te("UICallPopup.label.join")?t.$t("UICallPopup.label.join"):"Join")+"\n          ")]),t._v(" "),e("v-spacer"),t._v(" "),e("v-btn",{staticClass:"ma-2 decline-button",attrs:{outlined:"",fab:"",color:"#b1b5b9"},on:{click:function(n){return t.passRejected()}}},[e("i",{staticClass:"uiIconPopupClose"})]),t._v(" "),e("span",{staticClass:"button-title",on:{click:function(n){return t.passRejected()}}},[t._v("\n            "+t._s(t.i18n.te("UICallPopup.label.ignore")?t.$t("UICallPopup.label.ignore"):"Ignore")+"\n          ")]),t._v(" "),e("audio",{ref:"audio",staticClass:"audio-call-popup",staticStyle:{display:"none"},attrs:{loop:"",preload:"auto"}},[e("source",{attrs:{src:"/jitsi/resources/audio/ringtone_exo-1.m4a"}}),t._v(" "),e("p",[t._v('"Your browser does not support the audio element')])])],1)],1)],1)],1):t._e()],1)};d._withStripped=!0;var p=function(t){e(7),e(9)},f=Object(i.a)(u,d,[],!1,p,"data-v-50426a43",null);f.options.__file="src/main/webapp/vue-apps/CallButton/components/CallPopup.vue";var v=f.exports;Vue.component("jitsi-meet-button",s);const h=new Vuetify(eXo.env.portal.vuetifyPreset),g=window.eXo&&eXo.env&&eXo.env.portal&&eXo.env.portal.language||"en",b=`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.jitsi.Jitsi-${g}.json`,m=webConferencing.getLog("jitsi"),y=new Map,_=new Map;function C(t){const n=document.querySelector(".leftHeaderDrawer");return n&&n.addEventListener("click",t=>{if(t.target.classList.contains("backButton")&&t.target.parentElement.classList.contains("leftHeaderDrawer")){const t=document.querySelector(".single-btn-container"),n=document.querySelector(".jitsiCallAction");t&&n&&t.removeChild(n)}}),exoi18n.loadLanguageAsync(g,b).then(n=>new Vue({data:()=>({callSettings:t}),created(){y.has(this.callSettings.callId)||y.set(this.callSettings.callId,new Map);y.get(this.callSettings.callId).set(this.callSettings.context.parentClasses,{setCallState:this.setCallState,getCallState:this.getCallState})},methods:{setCallState:function(t){this.$set(this.callSettings,"callState",t)},getCallState:function(){return this.callSettings.callState}},render:e=>e(s,{props:{callSettings:t,i18n:n,language:g,resourceBundleName:"Jitsi"}}),i18n:n,vuetify:h}))}function x(t,n){m.trace(`>>> updateCallState for ${t} state: ${n}`),"started"===n&&function(t){let n=_.get(t);if(n)m.trace(">> Call popup already loading for "+t);else{let e=null;const o=new Promise(t=>{e=t});let a=!1;n={loader:o,resolve:n=>{a?m.trace(">> Call popup already resolved for "+t):(a=!0,e(n))}},_.set(t,n),m.trace(">> Save call popup for "+t)}}(t);const e=y.get(t);e&&e.forEach(t=>{t.setCallState(n)})}function S(t,n,e,o,a,i){const r=webConferencing.getUser().id,l=`jitsi-call-ring-${window.location.host}-${n}`;if(i){const n=localStorage.getItem(l);!n||Date.now()-n>5e3?(m.trace(`>>> Call start ringing: ${t} for ${r}`),localStorage.setItem(l,Date.now())):(i=!1,m.trace(`>>> Call already ringing: ${t} for ${r}`))}return exoi18n.loadLanguageAsync(g,b).then(e=>{const s=document.createElement("div");let c,u,d;document.body.appendChild(s);const p=new Vue({el:s,components:{CallPopup:v},data:()=>({isDialogVisible:!0,callerId:n,avatar:o,callerMessage:a,playRingtone:i}),mounted(){d=setTimeout(()=>{m.info(`Auto rejected the call: ${t} user: ${r}`),g()},6e4)},i18n:e,vuetify:h,render:function(t){return t(v,{props:{isDialogVisible:this.isDialogVisible,caller:this.callerId,avatar:this.avatar,callerMessage:this.callerMessage,playRingtone:this.playRingtone,i18n:e},on:{accepted:f,rejected:g}})}});function f(){w(t),c&&c()}function g(n){w(t),u&&u(n)}const b={callId:t,callerId:n,close:function(){clearTimeout(d),i&&localStorage.removeItem(l),p.isDialogVisible=!1,p.$destroy()},onAccepted:function(t){c=t},onRejected:function(t){u=t}},y=_.get(t);return y?y.resolve(b):m.trace("Call popup loader not found for the call: "+t),b})}function w(t){const n=_.get(t);n&&(_.delete(t),n.loader.then(n=>{m.trace(">>> Close popup for the call: "+t),n.close()}))}}])}));