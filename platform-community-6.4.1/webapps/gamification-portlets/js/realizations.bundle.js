define((()=>(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};if(e.r(t),e.d(t,{init:()=>r}),extensionRegistry){const e=extensionRegistry.loadComponents("Realizations");e&&e.length>0&&e.forEach((e=>{Vue.component(e.componentName,e.componentOptions)}))}Vue.use(Vuetify);const o=new Vuetify(eXo.env.portal.vuetifyPreset),n=eXo&&eXo.env.portal.language||"en",i=`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.addon.Gamification-${n}.json`,a="Realizations";function r(e){exoi18n.loadLanguageAsync(n,i).then((t=>{Vue.createApp({template:`<realizations id="${a}"  :is-administrator="${e}"/>`,i18n:t,vuetify:o},`#${a}`,"Realizations")}))}return t})()));