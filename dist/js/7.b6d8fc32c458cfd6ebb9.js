webpackJsonp([7],{132:function(t,e,a){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"myAccount",data:function(){return{modal:!1,params:{p:1,r:t.PERPAGE,total:0,token:t.TOKEN,userid:t.USER_ID,media_id:t.MEDIA_ID},integral_list:[]}},filters:{pointFormat:function(t){return t>>=0,t>0?"+"+t:t}},computed:{user:function(){return this.$store.state.user}},mounted:function(){var t=this;this.getIntegralList();var e=this.$refs.list,r=!0;e.addEventListener("scroll",a.debounce(function(){r&&t.params.p<t.params.total&&e.clientHeight+e.scrollTop>=e.scrollHeight-100&&(r=!1,t.params.p++,t.getIntegralList().then(function(){r=!0}))},500,500))},methods:{toggleModal:function(){this.modal=!this.modal},getIntegralList:function(){var e=this;return new Promise(function(a){e.$http.post(t.HOST+"/integral_list/"+t.USER_ID,e.params).then(function(t){var r=t.data;e.integral_list=e.integral_list.concat(r.data.list),e.params.total=r.data.total,a&&a()},function(t){})})}}}}).call(e,a(3),a(5))},172:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".header[data-v-7e21b60f]{position:relative;height:3.84rem;background-image:url("+a(259)+");background-repeat:no-repeat;background-size:100%;font-size:.4rem;padding-top:.85333rem;color:#fff}.header .avater[data-v-7e21b60f]{background-color:#fff;border-radius:50%;width:2.13333rem;height:2.13333rem;margin-left:1.78667rem;margin-right:.4rem;overflow:hidden;border:.13333rem solid #fff;float:left}.header .avater img[data-v-7e21b60f]{width:100%;height:100%}.header .message[data-v-7e21b60f]{float:left;padding-top:.4rem;line-height:.66667rem}.header .earn-integral[data-v-7e21b60f]{position:absolute;top:.26667rem;right:.26667rem;font-style:normal}.header .edit-user[data-v-7e21b60f]{padding:0 .26667rem;color:#fff;background-color:#de443b;border-radius:.13333rem}.block-text[data-v-7e21b60f]{height:1.33333rem;line-height:1.33333rem;text-align:center;background-color:#fff}.record-list[data-v-7e21b60f]{position:absolute;top:5.17333rem;left:0;right:0;bottom:0;z-index:1;overflow:scroll;padding-top:.4rem;background-color:#f2f3f4}.record-list[data-v-7e21b60f]::-webkit-scrollbar{display:none}.record-list li[data-v-7e21b60f]{height:1.33333rem;padding:0 .50667rem;border-bottom:1px solid #c8c8c8;list-style:none;overflow:hidden}.record-list li div[data-v-7e21b60f]{line-height:.6rem;padding-top:.06667rem}.record-list li span[data-v-7e21b60f]{line-height:1.33333rem}.record-list h6[data-v-7e21b60f]{color:#666}.modal-content[data-v-7e21b60f]{width:8rem;padding:.66667rem .90667rem;border-radius:.13333rem;background-color:#fff}.modal-content header[data-v-7e21b60f]{font-size:.37333rem;line-height:1rem}.modal-content footer[data-v-7e21b60f]{text-align:center;padding-top:.66667rem}.modal-content button[data-v-7e21b60f]{height:1.06667rem;line-height:1.06667rem;width:4rem}.modal-content img[data-v-7e21b60f]{width:5.46667rem;height:2.09333rem}.modal-content .iconfont[data-v-7e21b60f]{font-size:.34667rem}",""])},202:function(t,e,a){var r=a(172);"string"==typeof r&&(r=[[t.i,r,""]]);a(1)(r,{});r.locals&&(t.exports=r.locals)},23:function(t,e,a){"use strict";t.exports=a(282)},259:function(t,e,a){t.exports=a.p+"images/myAccountBackground.20fa19f02965a448c5d36c7e84e6fed2.png"},260:function(t,e,a){t.exports=a.p+"images/share.a605fbdaf70f0ddec5a08b2aef49f399.png"},282:function(t,e,a){a(202);var r=a(2)(a(132),a(309),"data-v-7e21b60f",null);t.exports=r.exports},309:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"my-account "},[r("header",{staticClass:"header"},[r("div",{staticClass:"avater"},[r("img",{attrs:{src:t.user.headimg}})]),t._v(" "),r("div",{staticClass:"message"},[r("p",[t._v(t._s(t.user.nickname))]),t._v(" "),r("p",[t._v("积分: "+t._s(t.user.integral>>0))]),t._v(" "),r("router-link",{attrs:{to:{name:"edit_user"},tag:"div"}},[r("a",{staticClass:"edit-user"},[t._v("完善资料赚积分")])])],1),t._v(" "),r("i",{staticClass:"earn-integral",on:{click:function(e){t.toggleModal()}}},[t._v("\n            赚取积分?\n        ")])]),t._v(" "),r("h4",{staticClass:"block-text"},[t._v("\n        积分明细\n    ")]),t._v(" "),r("ul",{ref:"list",staticClass:"record-list"},t._l(t.integral_list,function(e){return r("li",[r("div",{staticClass:"pull-left"},[r("h4",[t._v(t._s(e.name))]),t._v(" "),r("h6",[t._v("\n                    "+t._s(e.create_time)+"\n                ")])]),t._v(" "),r("span",{staticClass:"pull-right"},[t._v(t._s(t._f("pointFormat")(e.point))+" ")])])})),t._v(" "),r("v-modal",{model:{value:t.modal,callback:function(e){t.modal=e}}},[r("div",{staticClass:"modal-content"},[r("header",[t._v("\n                您可以通过以下途径赚取积分："),r("br"),t._v(" 1.点击右上角的'...' "),r("br"),t._v(" 2.选择 "),r("i",{staticClass:" icon-share iconfont "}),t._v(" 或 "),r("i",{staticClass:" icon-timeline iconfont "}),t._v("                    即可\n                "),r("img",{attrs:{src:a(260)}})]),t._v(" "),r("footer",[r("button",{staticClass:"btn btn-red",on:{click:function(e){t.toggleModal()}}},[t._v("知道了")])])])])],1)},staticRenderFns:[]}}});