webpackJsonp([8],{212:function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"myAccount",data:function(){return{params:{p:1,r:t.PERPAGE,total:0,token:t.TOKEN,userid:t.USER_ID,media_id:t.MEDIA_ID},integral_list:[]}},filters:{pointFormat:function(t){return t>>=0,t>0?"+"+t:t}},computed:{user:function(){return this.$store.state.user}},mounted:function(){var t=this;this.getIntegralList();var e=this.$refs.list,r=!0;e.addEventListener("scroll",a.debounce(function(){r&&t.params.p<t.params.total&&e.clientHeight+e.scrollTop>=e.scrollHeight-100&&(r=!1,t.params.p++,t.getIntegralList().then(function(){r=!0}))},500,500))},methods:{getIntegralList:function(){var e=this;return new Promise(function(a){e.$http.post(t.HOST+"/integral_list/"+t.USER_ID,e.params).then(function(t){var r=t.data;e.integral_list=e.integral_list.concat(r.data.list),e.params.total=r.data.total,a&&"function"==typeof a&&a()},function(t){})})}}}}).call(e,a(4),a(9))},24:function(t,e,a){"use strict";t.exports=a(552)},313:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".my-account[data-v-a9f6791a]{min-height:100%;background-color:#f2f3f4}.header[data-v-a9f6791a]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:4rem;background-color:#fff;background-image:url("+a(492)+");background-repeat:no-repeat;background-size:100% 100%;color:#fff;text-align:center}.header .avater[data-v-a9f6791a]{background-color:#f4f4f4;border-radius:50%;width:1.34rem;height:1.34rem;margin-bottom:.1rem;overflow:hidden;border:.06rem solid #f4f4f4}.header .edit-user[data-v-a9f6791a]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:2.17rem;height:.66rem;margin-top:.2rem;color:#fff;background-color:hsla(0,0%,100%,.35);border-radius:.33rem;border:1px solid #fff}.header .edit-user[data-v-a9f6791a]:active{opacity:.9}.block-text[data-v-a9f6791a]{line-height:.88rem;text-align:center;background-color:#fff;color:#ff5000;border-bottom:1px solid #d4d4d6;font-size:.34rem}.record-list[data-v-a9f6791a]{position:absolute;top:5.08rem;left:0;right:0;bottom:1.1rem;z-index:1;padding:0 .3rem;overflow:scroll;-webkit-overflow-scrolling:touch;background-color:#fff}.record-list[data-v-a9f6791a]::-webkit-scrollbar{display:none}.record-list li[data-v-a9f6791a]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;height:1rem;list-style:none}.record-list h3[data-v-a9f6791a]{color:#646565}.record-list h6[data-v-a9f6791a]{color:#a9aaae}.record-list span[data-v-a9f6791a]{font-size:.3rem;color:#646565}.record-list span.pull-right[data-v-a9f6791a]{color:#ff5000}.footer[data-v-a9f6791a]{position:absolute;bottom:0;left:0;right:0}",""])},376:function(t,e,a){var r=a(313);"string"==typeof r&&(r=[[t.i,r,""]]);a(2)(r,{});r.locals&&(t.exports=r.locals)},492:function(t,e,a){t.exports=a.p+"images/myAccountBackground.2b6b31922e34a6f8d1e059e211c2dbe4.png"},552:function(t,e,a){a(376);var r=a(1)(a(212),a(618),"data-v-a9f6791a",null);t.exports=r.exports},618:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-account "},[a("header",{staticClass:"header"},[a("div",{staticClass:"avater"},[a("img",{staticClass:"img-responsive",attrs:{src:t.user.headimg}})]),t._v(" "),a("p",[t._v(t._s(t.user.nickname))]),t._v(" "),a("p",[t._v("积分: "+t._s(t.user.integral>>0))]),t._v(" "),a("router-link",{staticClass:"edit-user",attrs:{to:{name:"edit_user"},tag:"div"}},[1==t.user.is_submit?[t._v("修改资料")]:[t._v("完善资料赚积分")]],2)],1),t._v(" "),a("h4",{staticClass:"block-text"},[t._v("\n        积分明细\n    ")]),t._v(" "),a("ul",{ref:"list",staticClass:"record-list"},t._l(t.integral_list,function(e){return a("li",[a("div",{staticClass:"pull-left"},[a("h3",[t._v(t._s(e.name))]),t._v(" "),a("h6",[t._v(" "+t._s(e.create_time)+" ")])]),t._v(" "),a("span",{staticClass:"pull-right"},[t._v(t._s(t._f("pointFormat")(e.point))+" ")])])})),t._v(" "),a("footer",{staticClass:"footer"},[a("v-support")],1)])},staticRenderFns:[]}}});