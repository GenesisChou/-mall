webpackJsonp([39],{159:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAACEklEQVQ4T6WUy2sTURjFz0kT09RCt24VQXyBCm66EEVBsLbapJnE7iKFqlTdizv9A4pSbRGdnc7ckAeNFMUH0kUXrqpURRDdui3UYkw6RxKbmMdUbby7ueec3/dx536X8FnGmF6PwaOQBgnuAtAHYFnQR5CFgMqvLMtaaY2ydeNROt/fJe+6gJMAAj61PAJP1xi4eS5+dqFRb4I56cxlirf8uvXbE3UlGY/drml1mDG5q4Im/xVU9wkTiUR0qvJdhTlO5jADfL1p0HqA4EHLGl6kbdvdPVv75gAc6xQG4OXqt+UBOunsGQr5v4DmARz5k0fEIF03ew/E2IZG4WIiEZ123ewFEHc39vEOXZN7BuiEn4lgKhjUXKlMOxRUqlzmKUG2vxcvaEx2ScDeNoM4Wiz2zIa7VxYB7gT0qfi990A4vDoE6qEPcKkCey7geKMo4nwyHrVdk/kMcPtvTV8SVmyHk86mKDxoAT6h6+amQF1qEoQZsHrgu306+ABhHsR4c4aTlb95mkLhP67Fr6i8ARpjIkIoB6gyix0tAo8jkVCiOgHG5PcL3tuOSADWAt6+0ZGRd/XZdNKZcYrTmwUSHLOs4fv12awB1oGVi9n2NPkUKYuaSMZjMzWtLeQ4mUMM4BrAIQAhH0gJ0Kw83kgmo28add8OjDFb1hjqZ/WlxR4A2wB8FfBeZKFLpQXLsn60FvoJzOnCIdw0mh4AAAAASUVORK5CYII="},215:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{orderDetail:Object},data:function(){return{logistics_detail:{}}},filters:{getDate:function(t){return t.split(" ")[0]},getTime:function(t){return t.split(" ")[1]}},computed:{order_id:function(){return this.orderDetail.id},is_shiped:function(){return 3===this.orderDetail.status},is_expired:function(){return 4===this.orderDetail.status},message:function(){return this.is_shiped?this.logistics_detail.company+" "+this.logistics_detail.no:"未发货"},logistics_list:function(){return this.logistics_detail.list||[]}},mounted:function(){this.is_shiped&&this.getOderExpress()},methods:{getOderExpress:function(){var e=this;this.$store.dispatch("toggleLoading"),this.$http.post(t.HOST+"/order_express_trace/"+this.order_id,{token:t.TOKEN,userid:t.USER_ID}).then(function(t){var i=t.data;e.logistics_detail=i.data,e.$store.dispatch("toggleLoading")},function(t){e.$store.dispatch("toggleLoading")})}}}}).call(e,i(4))},257:function(t,e,i){"use strict";t.exports=i(555)},279:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".v-logistics[data-v-2d3e4e3a]{margin-top:.2rem;background-color:#fff;font-size:.28rem}.v-logistics .title[data-v-2d3e4e3a]{line-height:.77rem;padding-left:.73rem;border-bottom:1px solid #f2f3f4;color:#ff5000}.v-logistics .main li[data-v-2d3e4e3a]{list-style:none;height:1.2rem}.v-logistics .circle[data-v-2d3e4e3a],.v-logistics .main li[data-v-2d3e4e3a]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:relative}.v-logistics .circle[data-v-2d3e4e3a]{width:1.08rem;height:100%}.v-logistics .circle .icon[data-v-2d3e4e3a]{position:relative;width:.2rem;height:.2rem;z-index:1}.v-logistics .circle .line[data-v-2d3e4e3a]{position:absolute;left:50%;top:-50%;width:1px;height:1.5rem;background-color:#d3d4d6;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);z-index:0}.v-logistics .date[data-v-2d3e4e3a]{width:1.7rem;text-align:right}.v-logistics .date h5[data-v-2d3e4e3a]{padding-bottom:.08rem}.v-logistics .detail[data-v-2d3e4e3a]{-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;padding-right:.3rem;color:#a9aaae;font-size:.24rem;text-align:justify}",""])},342:function(t,e,i){var s=i(279);"string"==typeof s&&(s=[[t.i,s,""]]);i(2)(s,{});s.locals&&(t.exports=s.locals)},555:function(t,e,i){i(342);var s=i(1)(i(215),i(583),"data-v-2d3e4e3a",null);t.exports=s.exports},583:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.is_expired?t._e():i("div",{staticClass:"v-logistics"},[i("header",[i("h4",{staticClass:"title"},[t._v("\n            "+t._s(t.message)+"\n        ")])]),t._v(" "),i("ul",{staticClass:"main"},[t._l(t.logistics_list,function(e,s){return t.is_shiped?i("li",[i("div",{staticClass:"date"},[i("h5",[i("strong",[t._v(t._s(t._f("getTime")(e.datetime)))])]),t._v(" "),i("h6",[t._v(t._s(t._f("getDate")(e.datetime)))])]),t._v(" "),t._m(0,!0),t._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:s>0,expression:"$index>0"}],staticClass:"line"}),t._v(" "),i("div",{staticClass:"detail"},[t._v(" "+t._s(e.remark)+" ")])]):t._e()}),t._v(" "),t.is_shiped?t._e():i("li",[i("div",{staticClass:"date"},[i("h5",[i("strong",[t._v(t._s(t._f("getTime")(t.orderDetail.update_time)))])]),t._v(" "),i("h6",[t._v(t._s(t._f("getDate")(t.orderDetail.update_time)))])]),t._v(" "),t._m(1),t._v(" "),i("div",{staticClass:"detail"},[t._v(" 仓库正在打包，请耐心等待! ")])])],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"circle"},[s("img",{staticClass:"icon",attrs:{src:i(159)}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"circle"},[s("img",{staticClass:"icon",attrs:{src:i(159)}})])}]}}});