webpackJsonp([9],{205:function(t,e,r){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"myAccount",data:function(){return{params:{p:1,r:t.PERPAGE,total:0,token:t.TOKEN,userid:t.USER_ID,media_id:t.MEDIA_ID},integral_list:[]}},filters:{pointFormat:function(t){return t>>=0,t>0?"+"+t:t}},computed:{user:function(){return this.$store.state.user}},mounted:function(){var t=this;this.getIntegralList();var e=this.$refs.list,i=!0;e.addEventListener("scroll",r.debounce(function(){i&&t.params.p<t.params.total&&e.clientHeight+e.scrollTop>=e.scrollHeight-100&&(i=!1,t.params.p++,t.getIntegralList().then(function(){i=!0}))},500,500))},methods:{getIntegralList:function(){var e=this;return new Promise(function(r){e.$http.post(t.HOST+"/integral_list/"+t.USER_ID,e.params).then(function(t){var i=t.data;e.integral_list=e.integral_list.concat(i.data.list),e.params.total=i.data.total,r&&r()},function(t){})})}}}}).call(e,r(3),r(8))},23:function(t,e,r){"use strict";t.exports=r(553)},298:function(t,e,r){e=t.exports=r(0)(),e.push([t.i,".my-account[data-v-7e21b60f]{min-height:100%;background-color:#f2f3f4}.header[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:4rem;background-color:#fff;background-image:url("+r(486)+");background-repeat:no-repeat;background-size:100% 100%;color:#fff;text-align:center}.header .avater[data-v-7e21b60f]{background-color:#f4f4f4;border-radius:50%;width:1.34rem;height:1.34rem;margin-bottom:.1rem;overflow:hidden;border:.06rem solid #f4f4f4}.header .edit-user[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:2.17rem;height:.66rem;margin-top:.2rem;color:#fff;background-color:hsla(0,0%,100%,.35);border-radius:.33rem;border:1px solid #fff}.header .edit-user[data-v-7e21b60f]:active{opacity:.9}.block-text[data-v-7e21b60f]{line-height:.88rem;text-align:center;background-color:#fff;color:#ff5000;border-bottom:1px solid #d4d4d6;font-size:.34rem}.record-list[data-v-7e21b60f]{position:absolute;top:5.08rem;left:0;right:0;bottom:1.1rem;z-index:1;padding:0 .3rem;overflow:scroll;-webkit-overflow-scrolling:touch;background-color:#fff}.record-list[data-v-7e21b60f]::-webkit-scrollbar{display:none}.record-list li[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;height:1rem;list-style:none}.record-list h3[data-v-7e21b60f]{color:#646565}.record-list h6[data-v-7e21b60f]{color:#a9aaae}.record-list span[data-v-7e21b60f]{font-size:.3rem;color:#646565}.record-list span.pull-right[data-v-7e21b60f]{color:#ff5000}.footer[data-v-7e21b60f]{position:absolute;bottom:0;left:0;right:0}",""])},361:function(t,e,r){var i=r(298);"string"==typeof i&&(i=[[t.i,i,""]]);r(2)(i,{});i.locals&&(t.exports=i.locals)},486:function(t,e,r){t.exports=r.p+"images/myAccountBackground.2b6b31922e34a6f8d1e059e211c2dbe4.png"},553:function(t,e,r){r(361);var i=r(1)(r(205),r(610),"data-v-7e21b60f",null);t.exports=i.exports},610:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"my-account "},[r("header",{staticClass:"header"},[r("div",{staticClass:"avater"},[r("img",{staticClass:"img-responsive",attrs:{src:t.user.headimg}})]),t._v(" "),r("p",[t._v(t._s(t.user.nickname))]),t._v(" "),r("p",[t._v("积分: "+t._s(t.user.integral>>0))]),t._v(" "),r("router-link",{staticClass:"edit-user",attrs:{to:{name:"edit_user"},tag:"div"}},[1==t.user.is_submit?[t._v("修改资料")]:[t._v("完善资料赚积分")]],2)],1),t._v(" "),r("h4",{staticClass:"block-text"},[t._v("\n        积分明细\n    ")]),t._v(" "),r("ul",{ref:"list",staticClass:"record-list"},t._l(t.integral_list,function(e){return r("li",[r("div",{staticClass:"pull-left"},[r("h3",[t._v(t._s(e.name))]),t._v(" "),r("h6",[t._v(" "+t._s(e.create_time)+" ")])]),t._v(" "),r("span",{staticClass:"pull-right"},[t._v(t._s(t._f("pointFormat")(e.point))+" ")])])})),t._v(" "),r("footer",{staticClass:"footer"},[r("v-support")],1)])},staticRenderFns:[]}}});