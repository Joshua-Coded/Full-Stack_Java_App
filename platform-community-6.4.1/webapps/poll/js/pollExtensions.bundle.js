define((()=>(()=>{"use strict";var t={d:(e,o)=>{for(var s in o)t.o(o,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:o[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{init:()=>_});var o={};t.r(o),t.d(o,{getRemainingDate:()=>v});var s={};t.r(s),t.d(s,{getPollById:()=>m,postPoll:()=>h,vote:()=>f});var i=function(){var t=this,e=t._self._c;return e("exo-drawer",{ref:"createPollDrawer",attrs:{id:"createPollDrawer","drawer-width":t.drawerWidth,right:!t.$vuetify.rtl,"disable-pull-to-refresh":""}},[e("template",{slot:"title"},[e("div",{staticClass:"createPollDrawerHeader"},[e("span",[t._v(t._s(t.$t("composer.poll.create.drawer.label")))])])]),t._v(" "),e("template",{slot:"content"},[e("div",{staticClass:"pt-0 pa-5 my-5 createPollDrawerContent"},[e("v-form",{staticClass:"flex",attrs:{flat:""}},[e("v-list",{staticClass:"d-flex flex-column",attrs:{dense:""}},[e("v-list-item",{staticClass:"px-0",attrs:{dense:""}},[e("extended-textarea",{staticClass:"custom-poll-textarea pt-0 mb-3",attrs:{rows:"5","row-height":"15","max-length":t.MAX_LENGTH,placeholder:t.questionPlaceholder},model:{value:t.poll.question,callback:function(e){t.$set(t.poll,"question","string"==typeof e?e.trim():e)},expression:"poll.question"}})],1),t._v(" "),t._l(t.options,(function(o,s){return e("v-list-item",{key:s,staticClass:"px-0",attrs:{dense:""}},[e("extended-textarea",{staticClass:"custom-poll-textarea pt-0 mb-3",attrs:{rows:"2","row-height":"15","max-length":t.MAX_LENGTH,placeholder:t.$t("composer.poll.create.drawer.field.option"+(o.required?"":".optional"),{0:o.id})},model:{value:t.options[s].data,callback:function(e){t.$set(t.options[s],"data","string"==typeof e?e.trim():e)},expression:"options[index].data"}})],1)})),t._v(" "),e("v-list-item",{staticClass:"px-0",attrs:{dense:""}},[e("label",{staticClass:"subtitle-1 font-weight-bold mb-3 mt-5"},[t._v("\n              "+t._s(t.$t("composer.poll.create.drawer.field.duration.label"))+"\n            ")])]),t._v(" "),e("v-list-item",{staticClass:"px-0",attrs:{dense:""}},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.poll.duration,expression:"poll.duration"}],staticClass:"ignore-vuetify-classes poll-select-duration flex-grow-1",attrs:{id:"pollSelectedDuration"},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.poll,"duration",e.target.multiple?o:o[0])}}},[e("option",{attrs:{value:"1day"}},[t._v(t._s(t.$t("composer.poll.create.drawer.field.duration.oneDay")))]),t._v(" "),e("option",{attrs:{value:"3days"}},[t._v(t._s(t.$t("composer.poll.create.drawer.field.duration.threeDays")))]),t._v(" "),e("option",{attrs:{value:"1week"}},[t._v(t._s(t.$t("composer.poll.create.drawer.field.duration.oneWeek")))]),t._v(" "),e("option",{attrs:{value:"2weeks"}},[t._v(t._s(t.$t("composer.poll.create.drawer.field.duration.twoWeeks")))])])])],2)],1)],1)]),t._v(" "),e("template",{slot:"footer"},[e("div",{staticClass:"d-flex my-2 flex-row justify-end"},[e("v-btn",{staticClass:"mx-5 px-8 btn",attrs:{button:"",large:""},on:{click:t.closeDrawer}},[t._v("\n        "+t._s(t.closeButton)+"\n      ")]),t._v(" "),e("v-btn",{staticClass:"px-8 primary btn no-box-shadow",attrs:{button:"",large:"",disabled:t.disableCreatePoll},on:{click:t.createPoll}},[t._v("\n        "+t._s(t.submitButton)+"\n      ")])],1)])],2)};function l(t,e,o,s,i,l,a,r){var n,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=o,c._compiled=!0),s&&(c.functional=!0),l&&(c._scopeId="data-v-"+l),a?(n=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=n):i&&(n=r?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),n)if(c.functional){c._injectStyles=n;var p=c.render;c.render=function(t,e){return n.call(e),p(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,n):[n]}return{exports:t,options:c}}i._withStripped=!0;const a=l({data:()=>({MAX_LENGTH:1e3,poll:{},options:[],pollCreated:!1}),props:{savedPoll:{type:Object,default:null}},computed:{isMobile(){return"xs"===this.$vuetify.breakpoint.name||"sm"===this.$vuetify.breakpoint.name},drawerWidth(){return this.isMobile?"420":"100%"},checkPollOptionalOptions(){return this.options.slice(-2).every((t=>!t.data||t.data.length<=this.MAX_LENGTH))},checkPollAllOptions(){return this.options&&0!==this.options.length&&this.options.slice(0,2).every((t=>null!==t.data&&""!==t.data&&t.data.length<=this.MAX_LENGTH))&&this.checkPollOptionalOptions},disableCreatePoll(){return!(0!==Object.values(this.poll).length&&this.poll.question&&this.poll.question.length<=this.MAX_LENGTH&&this.checkPollAllOptions)},questionPlaceholder(){return this.$t("composer.poll.create.drawer.field.question")},submitButton(){return this.$t("composer.poll.create.drawer.action."+(this.pollCreated?"update":"create"))},closeButton(){return this.$t("composer.poll.create.drawer.action.cancel")}},methods:{intializeDrawerFields(){this.poll={},this.options=[{id:1,required:!0,data:null},{id:2,required:!0,data:null},{id:3,required:!1,data:null},{id:4,required:!1,data:null}],this.poll.duration="1week",this.pollCreated=!1},openDrawer(){Object.values(this.savedPoll).length?(this.options=JSON.parse(JSON.stringify(this.savedPoll.options)),Object.assign(this.poll,JSON.parse(JSON.stringify(this.savedPoll)))):this.intializeDrawerFields(),this.$refs.createPollDrawer.open()},closeDrawer(){this.$refs.createPollDrawer.close()},createPoll(){this.disableCreatePoll||(this.poll.duration||(this.poll.duration=document.getElementById("pollSelectedDuration").value),this.poll.options=this.options,this.pollCreated=!0,this.$emit("poll-created",this.poll),this.closeDrawer())}}},i,[],!1,null,null,null).exports;var r=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"actionItem",on:{click:t.openCreatePollDrawer}},[t._m(0),t._v(" "),e("div",{staticClass:"actionItemDescription"},[e("div",{class:`actionLabel ${t.createdPollIcon}`},[t._v(" "+t._s(t.pollActionLabel)+" ")]),t._v(" "),e("div",{staticClass:"actionDescription"},[e("p",[t._v(t._s(t.pollActionDescription))])])])]),t._v(" "),e("create-poll-drawer",{ref:"createPollDrawer",attrs:{"saved-poll":t.savedPoll},on:{"poll-created":t.createPoll}})],1)};r._withStripped=!0;const n=l({data:()=>({pollAction:"create",savedPoll:{}}),props:{activityId:{type:String,default:null},message:{type:String,default:null},maxMessageLength:{type:Number,default:0},templateParams:{type:Object,default:null},files:{type:Array,default:null},activityType:{type:Array,default:null}},computed:{pollActionLabel(){return this.$t(`composer.poll.${this.pollAction}.drawer.label`)},pollActionDescription(){return this.$t(`composer.poll.${this.pollAction}.drawer.description`)},createdPollIcon(){return"update"===this.pollAction?"createdPollIcon":""}},created(){document.addEventListener("post-activity",(t=>{this.postPoll(t.detail)})),document.addEventListener("message-composer-opened",(()=>{"update"===this.pollAction&&(this.activityType.push("poll"),document.dispatchEvent(new CustomEvent("activity-composer-edited")))}))},methods:{openCreatePollDrawer(){this.$refs.createPollDrawer.openDrawer()},createPoll(t){Object.assign(this.savedPoll,t),this.pollAction="update",this.activityType.push("poll"),document.dispatchEvent(new CustomEvent("activity-composer-edited"))},postPoll(t){const e={question:this.savedPoll.question,options:this.savedPoll.options.filter((t=>null!=t.data&&""!==t.data)).map((t=>({description:t.data}))),duration:this.savedPoll.duration,message:t,files:this.files};this.$pollService.postPoll(e,eXo.env.portal.spaceId).then((()=>{document.dispatchEvent(new CustomEvent("activity-created",{detail:this.activityId})),this.pollAction="create",this.savedPoll={}})).catch((t=>{console.error(`Error when posting message: ${t}`)})).finally((()=>{document.dispatchEvent(new CustomEvent("activity-composer-closed"))}))}}},r,[function(){var t=this._self._c;return t("div",{staticClass:"actionItemIcon"},[t("div",{staticClass:"createPollComposerIcon"})])}],!1,null,null,null).exports;var c=function(){var t=this,e=t._self._c;return t.poll?e("div",{attrs:{id:"poll-activity-stream"}},[e("v-card",{staticClass:"border-color border-radius my-3 pa-5",attrs:{outlined:""}},[e("poll-activity",{attrs:{poll:t.poll,"show-results":t.showResults,"final-results":t.finalResults,"is-space-member":t.isSpaceMember,"is-poll-creator":t.isPollCreator},on:{"submit-vote":t.submitVote}})],1),t._v(" "),e("div",{staticClass:"votes-remaining-state",domProps:{textContent:t._s(t.remainingTime)}})],1):t._e()};c._withStripped=!0;const p=l({props:{activity:{type:Object,default:null}},data:()=>({poll:null}),computed:{remainingTime(){const t=(new Date).getTime(),e=this.poll&&this.poll.endDateTime,o=this.$pollUtils.getRemainingDate.inDays(t,e),s=this.$pollUtils.getRemainingDate.inHours(t,e)-24*this.$pollUtils.getRemainingDate.inDays(t,e),i=this.$pollUtils.getRemainingDate.inMinutes(t,e)-60*this.$pollUtils.getRemainingDate.inHours(t,e);return this.finalResults?this.$t("activity.poll.expired"):this.$t("activity.poll.remaining",{0:o,1:s,2:i})},templateParams(){return this.activity&&this.activity.templateParams},pollId(){return this.templateParams&&this.templateParams.pollId},activityId(){return this.activity&&this.activity.id},showResults(){return this.poll&&this.poll.options&&this.poll.options.some((t=>t.voted))},finalResults(){return this.poll&&this.poll.endDateTime<(new Date).getTime()},isSpaceMember(){return this.activity&&this.activity.activityStream&&this.activity.activityStream.space&&this.activity.activityStream.space.isMember},isPollCreator(){return this.poll&&this.poll.creator&&this.poll.creator===eXo.env.portal.userName}},created(){this.pollId&&this.retrievePoll()},methods:{retrievePoll(){this.$pollService.getPollById(this.pollId).then((t=>{this.poll=t,this.poll||this.$root.$emit("activity-extension-abort",this.activityId)})).catch((()=>{this.$root.$emit("activity-extension-abort",this.activityId)}))},submitVote(t){this.$pollService.vote(t).catch((t=>{console.error(`Error when voting: ${t}`)}))}}},c,[],!1,null,null,null).exports;var d=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"poll-activity"}},[e("div",{staticClass:"poll-content"},[e("h3",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:t.poll.question,expression:"poll.question"}],staticClass:"question"}),t._v(" "),e("div",{staticClass:"answer-content"},t._l(t.answersPercent,(function(o,s){return e("div",{key:s,class:{voteAnswer:!0,[o.class]:o.class}},[t.finalResults?[e("v-progress-linear",{staticClass:"answer final",attrs:{value:o.percent,color:"transparent",height:"20",rounded:""}},[[e("div",{staticClass:"flex d-flex"},[o.percent?e("span",{staticClass:"vote-percent",domProps:{textContent:t._s(o.percent)}}):t._e(),t._v(" "),e("span",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:o.description,expression:"answer.description"}],class:t.mostVotes===o.votes?"vote-content-winning text-truncate":"vote-content text-truncate",attrs:{title:o.description}})])]],2),t._v(" "),e("span",{class:{voteBackground:!0,selected:t.mostVotes===o.votes},style:{width:o.percent}})]:[t.visibleResults?e("div",[e("v-progress-linear",{class:{answer:!0,selected:o.voted},attrs:{value:o.percent,color:"transparent",height:"20",rounded:""}},[[e("div",{staticClass:"flex d-flex"},[o.percent?e("span",{staticClass:"vote-percent",domProps:{textContent:t._s(o.percent)}}):t._e(),t._v(" "),e("span",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:o.description,expression:"answer.description"}],staticClass:"vote-content text-truncate",attrs:{title:o.description}})])]],2)],1):e("div",[t.isPollCreator?e("v-progress-linear",{class:{"answer-cant-vote":!t.isSpaceMember,answer:!0,"creator-not-voted":!0,selected:o.voted},attrs:{value:o.percent,color:"transparent",height:"20",rounded:""},on:{click:function(e){return e.preventDefault(),t.handleVote(o)}}},[[e("div",{staticClass:"flex d-flex"},[o.percent?e("span",{staticClass:"vote-percent",domProps:{textContent:t._s(o.percent)}}):t._e(),t._v(" "),e("span",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:o.description,expression:"answer.description"}],staticClass:"vote-content text-truncate",attrs:{title:o.description}})])]],2):e("div",{class:{"answer-cant-vote":!t.isSpaceMember,"answer-no-vote no-select":!0,active:o.voted},style:t.isPollCreator&&"margin-top: -30px",attrs:{title:!t.isSpaceMember&&t.$t("activity.poll.not.space.member")},on:{click:function(e){return e.preventDefault(),t.handleVote(o)}}},[e("span",{directives:[{name:"sanitized-html",rawName:"v-sanitized-html",value:o.description,expression:"answer.description"}],class:`vote-content ${t.isPollCreator&&"vote-content-poll-creator"}`})])],1),t._v(" "),e("span",{class:`voteBackground voteBackgroundPollCreator  ${!t.isSpaceMember&&"poll-creator-non-member"}`,style:{width:!t.visibleResults&&t.isPollCreator||t.visibleResults?t.fixWidth(o.percent):"0%"},attrs:{title:!t.isSpaceMember&&t.$t("activity.poll.not.space.member")}})]],2)})),0),t._v(" "),t.showTotalVotes&&(t.visibleResults||t.finalResults||t.isPollCreator)?e("div",{staticClass:"total-votes",domProps:{textContent:t._s(t.totalVotesFormatted)}}):t._e()])])};d._withStripped=!0;const u={"create-poll-drawer":a,"create-poll-composer":n,"poll-activity-stream":p,"poll-activity":l({props:{poll:{type:Object,default:null},showResults:{type:Boolean,default:!1},showTotalVotes:{type:Boolean,default:!0},finalResults:{type:Boolean,default:!1},submitButtonText:{type:String,default:"Submit"},isSpaceMember:{type:Boolean,default:!1},isPollCreator:{type:Boolean,default:!1}},data(){return{visibleResults:JSON.parse(this.showResults)}},computed:{answers(){return this.poll&&this.poll.options},totalVotes(){let t=0;return this.answers.filter((e=>{!isNaN(e.votes)&&e.votes>0&&(t+=parseInt(e.votes))})),t},totalVotesFormatted(){return 1===this.totalVotes?this.$t("activity.poll.single.vote.label",{0:this.totalVotes}):this.$t("activity.poll.many.votes.label",{0:this.totalVotes})},mostVotes(){let t=0;return this.answers.filter((e=>{!isNaN(e.votes)&&e.votes>0&&e.votes>=t&&(t=e.votes)})),t},answersPercent(){return 0===this.totalVotes?this.answers.map((t=>(t.percent="0%",t))):this.answers.filter((t=>(!isNaN(t.votes)&&t.votes>0?t.percent=`${Math.round(parseInt(t.votes)/this.totalVotes*100)}%`:t.percent="0%",t)))},isMobile(){return"xs"===this.$vuetify.breakpoint.name||"sm"===this.$vuetify.breakpoint.name}},methods:{fixWidth(t){return parseFloat(t.substring(0,t.length-1))-(this.isMobile?1:.5)+"%"},handleVote(t){this.isSpaceMember&&(t.votes++,t.voted=!0,this.visibleResults=!0,this.$emit("submit-vote",t.id))}}},d,[],!1,null,null,null).exports};for(const t in u)Vue.component(t,u[t]);const v={inDays:(t,e)=>parseInt((e-t)/864e5),inHours:(t,e)=>parseInt((e-t)/36e5),inMinutes:(t,e)=>parseInt((e-t)/6e4)},h=(t,e)=>fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/poll?spaceId=${e||""}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"POST",body:JSON.stringify(t)}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Response code indicates a server error",t)})),m=t=>fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/poll/${t}`,{credentials:"include",method:"GET"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Response code indicates a server error",t)})),f=t=>fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/poll/vote/${t}`,{headers:{"Content-Type":"application/json"},credentials:"include",method:"POST"}).then((t=>{if(t&&t.ok)return t.json();throw new Error("Response code indicates a server error",t)})),y=eXo.env.portal.language||"en",w=`${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.Poll-${y}.json`;function _(t){!function(t){eXo.env.portal.spaceGroup&&""!==eXo.env.portal.spaceGroup&&(""===t||t.includes(eXo.env.portal.spaceGroup))&&extensionRegistry.registerComponent("ActivityComposerFooterAction","activity-composer-footer-action",{id:"createPollButton",vueComponent:Vue.options.components["create-poll-composer"],rank:20}),extensionRegistry.registerComponent("ActivityContent","activity-content-extensions",{id:"poll",isEnabled:t=>{const e=t&&t.activity;return e&&"poll"===e.type},vueComponent:Vue.options.components["poll-activity-stream"],rank:30}),extensionRegistry.registerExtension("ActivityFavoriteIcon","activity-favorite-icon-extensions",{id:"favorite-poll",type:"poll",icon:"fas fa-poll",class:"dark-yellow--color",title:t=>t?.poll?.question||t.title})}(t)}return exoi18n.loadLanguageAsync(y,w).then((t=>new Vue({i18n:t}))),Vue.prototype.$pollUtils||window.Object.defineProperty(Vue.prototype,"$pollUtils",{value:o}),Vue.prototype.$pollService||window.Object.defineProperty(Vue.prototype,"$pollService",{value:s}),e})()));