webpackJsonp([44],{189:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"pakour",props:{dialog:Object,close:Function,func:Function,show:{type:Boolean,default:!1}},data:function(){return{content_show:!1,decoration_show:!1}},mounted:function(){var t=this;this.show&&setTimeout(function(){t.content_show=!0},50)}}},251:function(t,e,o){"use strict";t.exports=o(529)},317:function(t,e,o){e=t.exports=o(0)(),e.push([t.i,".pakour[data-v-e93f1cfe]{position:fixed;top:50%;left:50%;margin-left:-2.715rem;margin-top:-3.005rem;z-index:6}.pakour .content[data-v-e93f1cfe]{position:relative;width:5.43rem;height:6.01rem;overflow:hidden;background:url("+o(474)+") no-repeat;background-size:100% 100%}.pakour .product[data-v-e93f1cfe]{bottom:30.7%;width:2.17rem;height:2.17rem}.pakour .message[data-v-e93f1cfe],.pakour .product[data-v-e93f1cfe]{position:absolute;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%)}.pakour .message[data-v-e93f1cfe]{bottom:18%;width:88%;height:.5rem;line-height:.5rem;font-size:.34rem;overflow:hidden;text-align:center;color:#fff}.pakour .score[data-v-e93f1cfe]{position:absolute;left:42%;top:12%;color:#fff;font-size:.34rem}.pakour .score span[data-v-e93f1cfe]{padding:0 .08rem;font-size:.66rem;color:#fffa72}.pakour .operation[data-v-e93f1cfe]{position:absolute;left:7%;bottom:4.5%;width:2.05rem;height:.64rem}.pakour .operation[data-v-e93f1cfe]:last-child{left:auto;right:9%}",""])},380:function(t,e,o){var a=o(317);"string"==typeof a&&(a=[[t.i,a,""]]);o(2)(a,{});a.locals&&(t.exports=a.locals)},474:function(t,e,o){t.exports=o.p+"images/pakourBackground.a84e1cbb3ce07f2b3969ad912a0982ec.png"},529:function(t,e,o){o(380);var a=o(1)(o(189),o(622),"data-v-e93f1cfe",null);t.exports=a.exports},622:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"enlarge"}},[t.show?o("div",{staticClass:"pakour"},[o("div",{staticClass:"content"},[o("div",{staticClass:"score"},[t._v("你跑了"),o("span",[t._v(t._s(t.dialog.score))]),t._v("分")]),t._v(" "),o("p",{staticClass:"message"},[t._v(t._s(t.dialog.msg))]),t._v(" "),o("img",{staticClass:"product",attrs:{src:t.dialog.img}}),t._v(" "),o("div",{staticClass:"operation",on:{click:t.close}}),t._v(" "),o("div",{staticClass:"operation",on:{click:t.func}})])]):t._e()])},staticRenderFns:[]}}});