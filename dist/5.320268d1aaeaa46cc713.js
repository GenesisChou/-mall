webpackJsonp([5],{130:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"search",props:{placeholder:{type:String,default:"请输入关键字进行过滤"},search:Function,value:String},methods:{updateValue:function(){this.$emit("input",event.target.value)}}}},139:function(t,e,o){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0});var i=o(283),r=o.n(i);e.default={name:"productList",components:{vSearch:r.a},data:function(){return{product_list:[],params:{sword:"",p:1,r:t.PERPAGE,total:0,token:t.TOKEN,userid:t.USER_ID,media_id:t.MEDIA_ID,_order:""},sort_type:"",scroll_event:""}},computed:{busy:function(){return this.params.total>this.params.p}},activated:function(){var t=a.getSessionStorage("position:"+this.$route.name);t&&window.scrollTo(0,t),window.addEventListener("scroll",this.scroll_event)},created:function(){var t=this;this.$store.dispatch("toggleLoading"),this.getProductList().then(function(){t.$store.dispatch("toggleLoading")}).catch(function(){t.$store.dispatch("toggleLoading")}),this.scroll_event=this.getScrollEvent()},beforeRouteLeave:function(t,e,o){window.removeEventListener("scroll",this.scroll_event),o()},methods:{getProductList:function(){var e=this;return new Promise(function(o,a){e.$http.post(t.HOST+"/all_product",e.params).then(function(t){var a=t.data;o&&o(a),e.params.total=a.data.total,e.product_list=e.product_list.concat(a.data.list)},function(t){a&&a()})})},searchProduct:function(){var t=this;this.$store.dispatch("toggleLoading"),this.sort_type="",this.initParams(),this.getProductList().then(function(e){t.$store.dispatch("toggleLoading"),t.loading=!0,t.params.total=e.data.total,t.product_list=e.data.list}).catch(function(){t.$store.dispatch("toggleLoading")})},initParams:function(){this.params.p=1,this.params.r=t.PERPAGE,this.params.token=t.TOKEN,this.params.userid=t.USER_ID,this.params.media_id=t.MEDIA_ID,this.params._order=""},sortByIntegral:function(){var t=this;this.initParams(),"integral-up"==this.sort_type?(this.sort_type="integral-down",this.params._order="integral:DESC"):(this.sort_type="integral-up",this.params._order="integral:ASC"),this.$store.dispatch("toggleLoading"),this.getProductList().then(function(e){t.product_list=[],t.product_list=t.product_list.concat(e.data.list),t.$store.dispatch("toggleLoading")}).catch(function(){t.$store.dispatch("toggleLoading")})},sortByCount:function(){var t=this;this.initParams(),this.params._order="used_count:DESC",this.$store.dispatch("toggleLoading"),"count"!=this.sort_type&&(this.sort_type="count",this.getProductList().then(function(e){t.product_list=[],t.product_list=t.product_list.concat(e.data.list),t.$store.dispatch("toggleLoading")}).catch(function(){t.$store.dispatch("toggleLoading")}))},getScrollEvent:function(){var t=this,e=!0;return a.debounce(function(){e&&t.busy&&a.touchBottom()&&(e=!1,t.params.p++,t.getProductList().then(function(){e=!0}))},500,500)}}}}).call(e,o(3),o(5))},167:function(t,e,o){e=t.exports=o(0)(),e.push([t.i,".search-box[data-v-42fe0bee]{padding:.22667rem .4rem;position:fixed;z-index:1;background-color:#f2f3f4}.space[data-v-42fe0bee]{height:1.33333rem}.sort[data-v-42fe0bee]{display:flex;align-items:center;display:-webkit-flex;-webkit-align-items:center;height:1.4rem;border-top:1px solid #f2f3f4;border-bottom:1px solid #f2f3f4;background-color:#fff}.sort>div[data-v-42fe0bee]{flex:1;-webkit-flex:1;text-align:center;font-size:.48rem}.sort>div[data-v-42fe0bee]:first-child{position:relative}.sort .active[data-v-42fe0bee]{color:#de443b}.sort .iconfont[data-v-42fe0bee]{font-weight:700}.arrows[data-v-42fe0bee]{position:absolute;right:0;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%);line-height:.24rem;right:.26667rem}.arrows i[data-v-42fe0bee]{font-size:.24rem;display:block}",""])},168:function(t,e,o){e=t.exports=o(0)(),e.push([t.i,".v-search[data-v-523f5718]{display:flex;display:-webkit-flex;align-items:center;-webkit-align-items:center;justify-content:space-around;-webkit-justify-content:space-around;width:9.2rem;height:.88rem;border-radius:.06667rem;background-color:#fff}.v-search input[data-v-523f5718]{width:8.13333rem;border:0;text-indent:27px;color:#a3a3a3;font-size:.37333rem}.v-search input[type=search][data-v-523f5718]::-webkit-search-cancel-button{display:none}.v-search .iconfont[data-v-523f5718]{margin-right:.46667rem;color:#a3a3a3;font-size:.48rem}",""])},198:function(t,e,o){var a=o(167);"string"==typeof a&&(a=[[t.i,a,""]]);o(1)(a,{});a.locals&&(t.exports=a.locals)},199:function(t,e,o){var a=o(168);"string"==typeof a&&(a=[[t.i,a,""]]);o(1)(a,{});a.locals&&(t.exports=a.locals)},27:function(t,e,o){o(198);var a=o(2)(o(139),o(297),"data-v-42fe0bee",null);t.exports=a.exports},283:function(t,e,o){o(199);var a=o(2)(o(130),o(298),"data-v-523f5718",null);t.exports=a.exports},297:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"product-list"},[o("div",{staticClass:"search-box"},[o("v-search",{attrs:{search:t.searchProduct},model:{value:t.params.sword,callback:function(e){t.params.sword=e}}})],1),t._v(" "),o("div",{staticClass:"space"}),t._v(" "),o("section",{staticClass:"sort"},[o("div",{on:{click:t.sortByIntegral}},[o("span",{class:["count"!=t.sort_type&&t.sort_type?"active":""]},[t._v("消耗积分排序")]),t._v(" "),o("div",{staticClass:"arrows"},[o("i",{class:["icon-arrows-up","iconfont","integral-up"==t.sort_type?"active":""]}),t._v(" "),o("i",{class:["icon-arrows-down","iconfont","integral-down"==t.sort_type?"active":""]})])]),t._v(" "),o("div",{class:["count"==t.sort_type?"active":""],on:{click:t.sortByCount}},[t._v("\n            兑换量优先\n        ")])]),t._v(" "),t._l(t.product_list,function(t){return o("router-link",{attrs:{to:{name:"product_detail",query:{product_id:t.id,integral:t.integral>>0}},tag:"div"}},[o("v-list-item",{attrs:{title:t.name,"title-dupty":~~t.integral+"积分",img:t.pic_thumb,color:"red"}})],1)}),t._v(" "),t.busy?o("v-load-more"):t._e(),t._v(" "),o("v-back-top")],2)},staticRenderFns:[]}},298:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"v-search ",on:{submit:function(t){t.preventDefault()}}},[o("input",{attrs:{type:"search",placeholder:t.placeholder},domProps:{value:t.value},on:{input:t.updateValue,keyup:function(e){return t._k(e.keyCode,"enter",13)?null:void t.search()}}}),t._v(" "),o("i",{staticClass:"iconfont icon-search ",on:{click:function(e){t.search()}}})])},staticRenderFns:[]}}});