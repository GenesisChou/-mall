webpackJsonp([43],{203:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"vTitle",props:{layout:Object},computed:{style:function(){var t=this.layout.layout_type;return 1===t?"left":2===t?"center":3===t?"right":void 0}}}},297:function(t,e,a){e=t.exports=a(0)(),e.push([t.i,".v-title[data-v-7706b1fa]{padding:.1rem .35rem;background-color:#fff;font-size:.3rem}.v-title.left[data-v-7706b1fa]{text-align:left}.v-title.center[data-v-7706b1fa]{text-align:center}.v-title.right[data-v-7706b1fa]{text-align:right}",""])},360:function(t,e,a){var n=a(297);"string"==typeof n&&(n=[[t.i,n,""]]);a(2)(n,{});n.locals&&(t.exports=n.locals)},551:function(t,e,a){a(360);var n=a(1)(a(203),a(609),"data-v-7706b1fa",null);t.exports=n.exports},609:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"v-title-list"},t._l(t.layout.items,function(e){return a("li",{class:["v-title",t.style]},[t._v("\n        "+t._s(e.title)+"\n    ")])}))},staticRenderFns:[]}}});