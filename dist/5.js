webpackJsonp([5],{117:function(t,e,a){var r=a(92);"string"==typeof r&&(r=[[t.i,r,""]]);a(37)(r,{});r.locals&&(t.exports=r.locals)},120:function(t,e,a){var r=a(95);"string"==typeof r&&(r=[[t.i,r,""]]);a(37)(r,{});r.locals&&(t.exports=r.locals)},141:function(t,e,a){"use strict";e.default={name:"search",props:{placeholder:{type:String,default:"请输入关键字进行过滤"},search:Function,params:Object}}},150:function(t,e,a){"use strict";var r=a(5),i=a(166),s=a.n(i),o=a(74),n=a.n(o),c=a(72),d=a.n(c),l=a(12),p=a.n(l);e.default={name:"product_list",components:{vListItem:n.a,vSearch:s.a,vBackTop:d.a,vSpinner:p.a},data:function(){return{product_list:"",params:{sword:"",p:1,r:APP.PERPAGE,total:0,count:0,token:APP.TOKEN,userid:APP.USER_ID,media_id:APP.MEDIA_ID,_order:""},sort_type:""}},mounted:function(){this.getProductList(),r.a.getScrollData(this.product_list,this.params,this.getProductList)},methods:{getProductList:function(t){var e=this;this.searchProduct(this.params,function(a){t&&t();var r=e.product_list;e.params.p<=1&&(e.params.total=a.data.total,e.params.count=a.data.count),e.product_list=a.data.list.concat(r)})},searchProduct:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.params,a=arguments[1];this.$store.dispatch("toggleLoading",{show:!0}),this.$http.post(APP.HOST+"/all_product",e).then(function(e){var r=e.data;t.$store.dispatch("toggleLoading"),a?a(r):t.product_list=r.data.list},function(e){t.$store.dispatch("toggleLoading")})},initParams:function(){var t=this.params.sword;this.params={sword:t,p:1,r:APP.PERPAGE,total:0,count:0,token:APP.TOKEN,userid:APP.USER_ID,media_id:APP.MEDIA_ID,_order:""}},sortByIntegral:function(){var t=this;this.initParams(),"integral-up"==this.sort_type?(this.sort_type="integral-down",this.params._order="integral:DESC"):(this.sort_type="integral-up",this.params._order="integral:ASC"),this.getProductList(function(){t.product_list=[]})},sortByCount:function(){var t=this;this.initParams(),this.params._order="used_count:DESC","count"!=this.sort_type&&(this.sort_type="count",this.getProductList(function(){t.product_list=[]}))}}}},166:function(t,e,a){var r,i;a(120),r=a(141);var s=a(181);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,i._scopeId="data-v-4e1eadca",t.exports=r},178:function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"product-list"},[t._h("div",{staticClass:"search-box bg-base"},[t._h("v-search",{attrs:{search:t.searchProduct,params:t.params}})])," ",t._m(0)," ",t._h("ul",{staticClass:"sort list-inline"},[t._h("li",{staticClass:" text-huge",on:{click:t.sortByIntegral}},[t._h("span",{class:["count"!=t.sort_type&&t.sort_type?"text-red":""]},["消耗积分排序"])," ",t._h("div",{staticClass:"arrows"},[t._h("i",{class:["icon-arrows-up","iconfont","text-bold","integral-up"==t.sort_type?"text-red":""]})," ",t._h("i",{class:["icon-arrows-down","iconfont","text-bold","integral-down"==t.sort_type?"text-red":""]})])])," ",t._h("li",{class:["text-huge","count"==t.sort_type?"text-red":""],on:{click:t.sortByCount}},["\n            兑换量优先\n        "])])," ",t._l(t.product_list,function(e){return t._h("router-link",{attrs:{to:{name:"product_detail",query:{product_id:e.id}}}},[t._h("v-list-item",{attrs:{title:e.name,"title-dupty":parseInt(e.integral)+"积分",img:e.pic_thumb,color:"text-red"}})])})," ",t._h("v-back-top")])},staticRenderFns:[function(){var t=this;return t._h("div",{staticClass:"fill"})}]}},181:function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"v-search ",on:{submit:function(t){t.preventDefault()}}},[t._h("input",{directives:[{name:"model",rawName:"v-model",value:t.params.sword,expression:"params.sword"}],staticClass:"text-sliver text-large",attrs:{type:"search",placeholder:t.placeholder},domProps:{value:t._s(t.params.sword)},on:{keyup:function(e){13===e.keyCode&&t.search()},input:function(e){e.target.composing||(t.params.sword=e.target.value)}}})," ",t._h("i",{staticClass:"iconfont icon-search text-sliver text-huge ",on:{click:function(e){t.search()}}})])},staticRenderFns:[]}},43:function(t,e,a){var r,i;a(117),r=a(150);var s=a(178);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,i._scopeId="data-v-409b263f",t.exports=r},61:function(t,e,a){e=t.exports=a(36)(),e.push([t.i,".v-list-item[data-v-4e3430e2]{display:table;width:100%;height:2.93333rem;border-bottom:1px solid #c8c8c8;background-color:#fff}.v-list-item .img[data-v-4e3430e2]{display:table-cell;width:3.73333rem;vertical-align:middle;text-align:center}.v-list-item .img img[data-v-4e3430e2]{width:2.4rem;height:1.86667rem}.v-list-item .describe[data-v-4e3430e2]{display:table-cell;vertical-align:middle}.v-list-item .describe span[data-v-4e3430e2]:nth-child(1){overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:.09333rem}",""])},63:function(t,e,a){e=t.exports=a(36)(),e.push([t.i,".v-back-top[data-v-e187f5c2]{position:fixed;right:.66667rem;bottom:.66667rem;width:.93333rem;height:.93333rem;padding-top:.06667rem;text-align:center;border-radius:50%;border:2px solid #f06870;color:#fff;background-color:#de443b;-webkit-transition:opacity .3s linear;transition:opacity .3s linear;box-shadow:.02667rem .06667rem .13333rem rgba(0,15,15,.3)}",""])},65:function(t,e,a){var r=a(61);"string"==typeof r&&(r=[[t.i,r,""]]);a(37)(r,{});r.locals&&(t.exports=r.locals)},67:function(t,e,a){var r=a(63);"string"==typeof r&&(r=[[t.i,r,""]]);a(37)(r,{});r.locals&&(t.exports=r.locals)},68:function(t,e,a){"use strict";var r=a(5);e.default={name:"back_top",data:function(){return{show:!0}},methods:{backTop:function(){var t=r.a.getScrollTop(),e=window.setInterval(function(){t>=0?(t-=150,window.scrollTo(0,t)):window.clearInterval(e)},10)}},created:function(){var t=this;window.addEventListener("scroll",function(){t.show=r.a.getScrollTop()>1e3})}}},70:function(t,e,a){"use strict";e.default={name:"v-list-item",props:{title:{type:String,default:""},titleDupty:{type:String,default:""},color:{type:String,default:"text-gray"},img:{type:String,default:""}}}},72:function(t,e,a){var r,i;a(67),r=a(68);var s=a(79);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,i._scopeId="data-v-e187f5c2",t.exports=r},74:function(t,e,a){var r,i;a(65),r=a(70);var s=a(77);i=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(i=r=r.default),"function"==typeof i&&(i=i.options),i.render=s.render,i.staticRenderFns=s.staticRenderFns,i._scopeId="data-v-4e3430e2",t.exports=r},77:function(t,e){t.exports={render:function(){var t=this;return t._h("div",{staticClass:"v-list-item"},[t._h("div",{staticClass:"img"},[t._h("img",{attrs:{src:t.img}})])," ",t._h("div",{staticClass:"describe"},[t._h("span",{staticClass:"text-huge "},[t._s(t.title)])," ",t._h("span",{class:t.color},[t._s(t.titleDupty)])])])},staticRenderFns:[]}},79:function(t,e){t.exports={render:function(){var t=this;return t._h("transition",{attrs:{name:"fade"}},[t._h("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:" v-back-top text-huge",on:{click:t.backTop}},[t._h("i",{staticClass:" icon-arrows-up iconfont text-small"})])])},staticRenderFns:[]}},92:function(t,e,a){e=t.exports=a(36)(),e.push([t.i,".load-more[data-v-409b263f]{height:1.2rem}.search-box[data-v-409b263f]{padding:.22667rem .4rem;position:fixed;z-index:1}.fill[data-v-409b263f]{height:1.33333rem}.sort[data-v-409b263f]{border-top:1px solid #c8c8c8;border-bottom:1px solid #c8c8c8;height:1.4rem;line-height:1.4rem}.sort>li[data-v-409b263f]{width:50%;text-align:center}.sort>li[data-v-409b263f]:nth-child(1){position:relative}.arrows[data-v-409b263f]{position:absolute;right:0;top:50%;-ms-transform:translateY(-50%);-moz-transform:translateY(-50%);-webkit-transform:translateY(-50%);-o-transform:translateY(-50%);line-height:.24rem;right:.26667rem}.arrows i[data-v-409b263f]{font-size:.24rem;display:block}",""])},95:function(t,e,a){e=t.exports=a(36)(),e.push([t.i,".v-search[data-v-4e1eadca]{width:9.2rem;height:.88rem;line-height:.88rem;border-radius:.06667rem;background-color:#fff}.v-search input[data-v-4e1eadca]{width:8.13333rem;border:0;text-indent:27px}.v-search input[type=search][data-v-4e1eadca]::-webkit-search-cancel-button{display:none}.v-search .iconfont[data-v-4e1eadca]{float:right;margin-right:.46667rem}",""])}});