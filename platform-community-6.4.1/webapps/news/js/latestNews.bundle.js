define((()=>(()=>{"use strict";var e={d:(t,n)=>{for(var s in n)e.o(n,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:n[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{destroy:()=>U,initLatestNews:()=>R});var n={};e.r(n),e.d(n,{canPublishNews:()=>A,canScheduleNews:()=>k,canUserCreateNews:()=>X,clickOnEditButton:()=>N,deleteDraft:()=>C,deleteNews:()=>O,escapeHTML:()=>I,fetchFoldersAndFiles:()=>_,findUserSpaces:()=>b,getDrivers:()=>E,getNews:()=>m,getNewsByActivityId:()=>f,getNewsById:()=>h,getNewsSpaces:()=>w,getSpaceById:()=>S,getUserSpaces:()=>T,importFileFromUrl:()=>$,markNewsAsRead:()=>v,saveNews:()=>x,scheduleNews:()=>y,searchSpaces:()=>j,undoDeleteNews:()=>P,updateNews:()=>g});var s=function(){var e=this,t=e._self._c;return t("v-app",{staticClass:"VuetifyApp",attrs:{flat:""}},[t("v-container",{attrs:{"pa-0":""}},[t("v-layout",{staticClass:"white",attrs:{row:"","mx-0":""}},[t("v-flex",{staticClass:"px-3 border-box-sizing"},[t("v-layout",{staticClass:"d-flex mx-0 align-center border-box-sizing"},[t("v-flex",{staticClass:"d-flex text-truncate"},[e.isShowHeader?t("v-card",{attrs:{flat:"",color:"transparent"}},[t("v-card-text",{staticClass:"body-1 text-truncate text-uppercase grey--text px-0"},[e._v("\n                "+e._s(e.header)+"\n              ")])],1):e._e()],1),e._v(" "),t("v-flex",{staticClass:"d-flex justify-end"},[t("v-btn",{staticClass:"caption text-uppercase grey--text d-sm-flex",attrs:{depressed:"",small:""},on:{click:function(t){return e.openAllNewsPublished(e.url)}}},[e._v("\n              "+e._s(e.seeAll)+"\n            ")])],1)],1)],1),e._v(" "),t("v-flex",{staticClass:"news-container",attrs:{"d-flex":"",xs12:"","px-3":"","pb-3":""}},[t("v-layout",{staticClass:"d-none d-sm-flex",attrs:{row:"",wrap:"","mx-0":""}},[t("v-flex",{attrs:{"d-flex":"",xs12:"",sm6:""}},[void 0!==e.newsInfo[0]?t("v-img",{staticClass:"firstNewsImg",attrs:{src:e.newsInfo[0].illustrationURL,"aspect-ratio":"2.3"},on:{click:function(t){return e.openNews(e.newsInfo[0].url)}}},[t("v-row",{staticClass:"lightbox white--text pa-2 fill-height",attrs:{align:"end"}},[t("v-list",{staticClass:"flex transparent",attrs:{"three-line":""}},[t("v-list-item",[t("v-list-item-content",[t("v-list-item-title",{staticClass:"subtitle-1 font-weight-bold text-uppercase white--text contentTitle",on:{click:function(t){return e.openNews(e.newsInfo[0].url)}}},[e._v(e._s(e.newsInfo[0].title))]),e._v(" "),t("v-list-item-subtitle",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:e.newsInfo[0].body,expression:"newsInfo[0].body"}],staticClass:"body-2 white--text contentBody",on:{click:function(t){return e.openNews(e.newsInfo[0].url)}}})],1)],1)],1)],1)],1):e._e()],1),e._v(" "),t("v-flex",{attrs:{"d-flex":"",xs12:"",sm6:"","align-start":""}},[t("v-layout",{staticClass:"news-right-list",attrs:{row:"",wrap:"","mx-0":"","pl-3":""}},[t("v-list",{staticClass:"d-xs-none py-1 list-news",attrs:{"three-line":""}},[e._l(e.newsInfo.slice(1),(function(n){return[t("v-list-item",{key:n.title,staticClass:"px-0 news-item"},[t("v-list-item-avatar",{staticClass:"mr-2 my-0",attrs:{tile:"",size:"95"}},[t("v-img",{attrs:{src:n.illustrationURL},on:{click:function(t){return e.openNews(n.url)}}})],1),e._v(" "),t("v-list-item-content",{staticClass:"pt-0 pl-3"},[t("v-list-item-title",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:n.title,expression:"item.title"}],staticClass:"subtitle-2 font-weight-bold text-uppercase rightTitle",staticStyle:{"margin-bottom":"0px"},on:{click:function(t){return e.openNews(n.url)}}}),e._v(" "),t("v-list-item-subtitle",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:n.body,expression:"item.body"}],staticClass:"grey-color rightBody",on:{click:function(t){return e.openNews(n.url)}}})],1)],1)]}))],2)],1)],1),e._v(" "),0===e.newsInfo.length?t("div",{staticClass:"noNews mx-auto"},[t("div",{staticClass:"noNewsContent"},[t("i",{staticClass:"uiNoNewsIcon"}),e._v(" "),t("div",{staticClass:"noNewsTitle"},[e._v(e._s(e.$t("news.latest.noNews")))])])]):e._e()],1),e._v(" "),0!==e.newsInfo.length?t("v-carousel",{staticClass:"d-sm-none carousel-news",attrs:{height:250,touch:"","hide-delimiters":""}},e._l(e.newsInfo,(function(n,s){return t("v-carousel-item",{key:s,attrs:{src:n.illustrationURL,"aspect-ratio":"2.3"},on:{click:function(t){return e.openNews(n.url)}}},[t("v-sheet",{staticClass:"mx-auto",attrs:{color:"transparent news-text",height:"50%",width:"100%",tile:""}},[t("v-list",{staticClass:"flex item-lightbox",attrs:{"three-line":""}},[t("v-list-item",{staticClass:"px-2"},[t("v-list-item-content",{staticClass:"py-0"},[t("v-list-item-title",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:n.title,expression:"slide.title"}],staticClass:"font-weight-bold text-uppercase white--text",on:{click:function(t){return e.openNews(n.url)}}}),e._v(" "),t("v-list-item-subtitle",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:n.body,expression:"slide.body"}],staticClass:"body-2 white--text",on:{click:function(t){return e.openNews(n.url)}}})],1)],1)],1)],1)],1)})),1):t("div",{staticClass:"d-sm-none noNews"},[t("div",{staticClass:"noNewsContent"},[t("i",{staticClass:"uiNoNewsIcon"}),e._v(" "),t("div",{staticClass:"noNewsTitle"},[e._v(e._s(e.$t("news.latest.noNews")))])])])],1)],1)],1)],1)};s._withStripped=!0;var o=function(e,t,n,s,o,r,i,a){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=[],c._compiled=!0),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(e,t){return l.call(t),d(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:c}}({props:{newsInfo:{type:Object,required:!1,default:function(){return new Object}},seeAll:{type:String,required:!1,default:null},header:{type:String,required:!1,default:null},url:{type:String,required:!1,default:null},isShowHeader:{type:Boolean,required:!1,default:!0}},created(){for(let e=0;e<this.newsInfo.length;e++)null===this.newsInfo[e].illustrationURL&&(this.newsInfo[e].illustrationURL="/news/images/news.png")},mounted(){this.$root.$emit("application-loaded")},methods:{openNews(e){null!==e&&(window.location.href=e)},openAllNewsPublished(e){null!==e&&(window.location.href=e)}}},s);const r=o.exports,i=eXo.env.portal.context||"",a=(eXo.env.portal.portalName,eXo.env.portal.containerName,eXo.env.portal.rest),l=`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news`,c=(eXo.env.portal.context,eXo.env.portal.rest,`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/social/spaces`),d=`${eXo.env.portal.context}/${eXo.env.portal.rest}${eXo.env.portal.context}/social/spaces/suggest.json`,u=`${eXo.env.portal.context}/${eXo.env.portal.rest}/space/user/searchSpace/`,p=(eXo.env.portal.spaceId,window.location.host,eXo.env.portal.context,eXo.env.portal.userName);function h(e,t){return fetch(`${l}/${e}?editMode=${t||""}`,{credentials:"include",method:"GET"}).then((e=>e&&e.ok?e.json():401===e.status?e.status:void 0)).then((e=>e)).catch((e=>e))}function f(e){return fetch(`${l}/byActivity/${e}`,{credentials:"include",method:"GET"}).then((e=>{if(e&&e.ok)return e.json();throw new Error("Response code indicates a server error",e)}))}function w(e){return fetch(`${l}/${e}?fields=spaces`,{credentials:"include",method:"GET"}).then((e=>e.json())).then((e=>e))}function v(e){return fetch(`${l}/markAsRead/${e}`,{credentials:"include",method:"POST"}).then((e=>{if(e&&e.ok)return e.text();throw new Error("Error while marking news as read")}))}function m(e,t,n,s,o,r){let i=`${l}?author=${p}&publicationState=published&filter=${e}`;return n&&(i+=`&text=${n}`),t&&(i+=`&spaces=${t}`),isNaN(s)||(i+=`&offset=${s}`),isNaN(o)||(i+=`&limit=${o}`),r&&(i+=`&returnSize=${r}`),fetch(i,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>{if(e&&e.ok)return e.json();throw new Error("Error getting news list")}))}function x(e){return fetch(`${l}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"POST",body:JSON.stringify(e)}).then((e=>e.json()))}function y(e){return fetch(`${l}/schedule`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"PATCH",body:JSON.stringify(e)}).then((e=>e.json()))}function $(e){return fetch(e,{headers:{"Content-Type":"blob"},credentials:"include",method:"GET"})}function g(e,t){return fetch(`${l}/${e.id}?post=${t}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"PUT",body:JSON.stringify(e)}).then((e=>e.json()))}function N(e){return fetch(`${l}/${e}/click`,{credentials:"include",method:"POST",body:"edit"})}function b(e){return fetch(`${d}?conditionToSearch=${e}&currentUser=${p}&typeOfRelation=confirmed`,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>e.json())).then((e=>e.options))}function C(e){return fetch(`${l}/${e}`,{credentials:"include",method:"DELETE"})}function S(e){return fetch(`${c}/${e}`,{credentials:"include",method:"GET"}).then((t=>{if(t&&t.ok)return t.json();throw new Error(`Error getting space with id ${e}`)}))}function T(e,t,n){return fetch(`${c}?offset=${e}&limit=${t}&returnSize=true&filterType=${n}`,{credentials:"include",method:"GET"}).then((e=>e.json())).then((e=>e))}function j(e){return fetch(`${u}?fields=id,url,displayName,avatarUrl&keyword=${e}`,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>e.json()))}function _(e,t,n){return fetch(`/portal/rest/managedocument/getFoldersAndFiles/?driveName=${e}&workspaceName=${t}&currentFolder=${n}`,{}).then((e=>e.text())).then((e=>(new window.DOMParser).parseFromString(e,"text/xml"))).then((e=>e))}function E(){return fetch("/portal/rest/wcmDriver/getDrivers",{}).then((e=>e.text())).then((e=>(new window.DOMParser).parseFromString(e,"text/xml"))).then((e=>e))}function I(e){const t=document.createElement("div");return t.innerText=e,t.innerHTML}function X(e){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canCreateNews/${eXo.env.portal.spaceId||e}`,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>e&&e.ok&&e.json()))}function k(e){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canScheduleNews/${eXo.env.portal.spaceId||e}`,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>e&&e.ok&&e.json()))}function O(e,t,n){return n>0&&localStorage.setItem("deletedNews",e),fetch(`${l}/${e}?isDraft=${t||""}&delay=${n||0}`,{credentials:"include",method:"DELETE"}).then((e=>{if(e&&!e.ok)throw new Error("Error when deleting news")}))}function P(e){return fetch(`${l}/${e}/undoDelete`,{method:"POST",credentials:"include"}).then((e=>{if(!e||!e.ok)throw new Error("Error when undoing deleting news");localStorage.removeItem("deletedNews")}))}function A(){return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canPublishNews?spaceId=${eXo.env.portal.spaceId}`,{headers:{"Content-Type":"application/json"},method:"GET"}).then((e=>e.json())).then((e=>e))}const z={"exo-news-latest":r};for(const e in z)Vue.component(e,z[e]);if(Vue.prototype.$newsServices||window.Object.defineProperty(Vue.prototype,"$newsServices",{value:n}),extensionRegistry){const e=extensionRegistry.loadComponents("latestNews");e&&e.length>0&&e.forEach((e=>{Vue.component(e.componentName,e.componentOptions)}))}Vue.use(Vuetify);const L=new Vuetify(eXo.env.portal.vuetifyPreset),D="latestNewsDetails";let G;function R(e){const t="undefined"!=typeof eXo?eXo.env.portal.language:"en",n=`${i}/${a}/i18n/bundle/locale.portlet.news.News-${t}.json`;exoi18n.loadLanguageAsync(t,n).then((t=>{G=Vue.createApp({data:function(){return{newsInfo:e.newsInfo,seeAllLabel:e.seeAllLabel,header:e.header,url:e.url,isShowHeader:e.isShowHeader}},template:`<exo-news-latest id="${D}" v-cacheable :news-info="newsInfo" :header="header" :see-all="seeAllLabel" :url="url"  :is-show-header="isShowHeader"></exo-news-latest>`,i18n:t,vuetify:L},`#${D}`,"news")}))}function U(){G&&G.$destroy()}return t})()));