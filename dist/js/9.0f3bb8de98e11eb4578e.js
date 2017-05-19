webpackJsonp([9],{22:function(t,e,i){"use strict";t.exports=i(575)},224:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"productDetail",components:{vIntroduction:function(t){i.e(12).then(function(){var e=[i(162)];t.apply(null,e)}.bind(this)).catch(i.oe)},recharge:function(t){i.e(30).then(function(){var e=[i(265)];t.apply(null,e)}.bind(this)).catch(i.oe)}},data:function(){return{product_id:"",product_detail:"",order_detail_id:"",content_show:!1,is_recharge:!1}},computed:{user:function(){return this.$store.state.user},exchange_unavaliable:function(){return 8!==this.product_detail.type&&5!==this.product_detail.type&&this.product_detail.stocks<=0||1===this.product_detail.status},integral_enough:function(){return this.user.integral>>0>=this.integral},integral:function(){return this.$route.query.integral||this.product_detail.integral>>0||0},product_name:function(){return this.$route.query.name||this.product_detail.name}},watch:{order_detail_id:function(){this.$store.dispatch("getUserInfor"),this.$store.dispatch("toggleAlert",{close_btn:!0,msg:"获得"+this.product_name,type:"img",img:this.product_detail.pic_thumb_new,btn_text:"查看",callback:this.toOrderDetail})}},beforeRouteLeave:function(t,e,i){i()},created:function(){this.product_id=this.$route.query.product_id,this.getProductDetail()},methods:{getProductDetail:function(){var e=this;this.$store.dispatch("toggleLoading"),this.$http.post(t.HOST+"/product_detail_l/"+this.product_id,{token:t.TOKEN,media_id:t.MEDIA_ID,user_id:t.USER_ID,open_id:t.OPEN_ID}).then(function(i){e.$store.dispatch("toggleLoading");var a=i.data;a.status===t.SUCCESS&&(e.product_detail=a.data),8===e.product_detail.type&&(e.is_recharge=!0)},function(t){e.$store.dispatch("toggleLoading")})},exchange:function(){var t=this;this.$store.dispatch("toggleConfirm",{msg:"确认兑换该商品吗?",callback:function(){t.order().then(function(e){t.order_detail_id=e.data.id,t.getProductDetail()}).catch(function(e){t.$store.dispatch("toggleAlert",{msg:e.info})})}})},order:function(){var e=this;return new Promise(function(i,a){e.$store.dispatch("toggleLoading"),e.$http.post(t.HOST+"/product_order/"+e.product_id,{token:t.TOKEN,user_id:t.USER_ID}).then(function(n){e.$store.dispatch("toggleLoading");var o=n.data;o.status===t.SUCCESS?i&&"function"==typeof i&&i(o):a&&"function"==typeof a&&a(o)},function(t){e.$store.dispatch("toggleLoading"),a&&"function"==typeof a&&a(t.data)})})},toOrderDetail:function(){this.$router.push({name:"order_detail",query:{order_id:this.order_detail_id}})}}}}).call(e,i(4))},326:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".product-detail[data-v-f2cf4366]{min-height:100%;padding-bottom:.85rem;background-color:#f2f3f4}.banner[data-v-f2cf4366]{width:7.5rem;height:3.3rem}.title[data-v-f2cf4366]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:1.4rem;padding-left:.3rem;background-color:#fff;border-bottom:1px solid #d3d4d6}.title h1[data-v-f2cf4366]{font-size:.34rem}.title h3[data-v-f2cf4366]{display:inline-block;color:#ff5000}.title .number[data-v-f2cf4366]{font-size:.36rem}.title s[data-v-f2cf4366]{padding-left:.4rem;color:#6e6f6f;-webkit-transform:scale(.6) translateY(10%);-ms-transform:scale(.6) translateY(10%);transform:scale(.6) translateY(10%);display:inline-block;-webkit-transform-origin:left;-ms-transform-origin:left;transform-origin:left}.main[data-v-f2cf4366]{padding-bottom:1rem}.sticky[data-v-f2cf4366]{position:fixed;bottom:0;left:0;right:0;z-index:1;padding:0 .3rem .3rem;text-align:center;background-color:#fff;border-bottom:1px solid #f2f3f4;box-shadow:0 0 0 #000,0 0 .15rem #ddd}.sticky>div[data-v-f2cf4366]{display:block;width:100%;height:1rem;line-height:1rem;font-size:.4rem;color:#fff;border-radius:.1rem}.sticky h6[data-v-f2cf4366]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:.66rem;color:#646565}.sticky h6 .iconfont[data-v-f2cf4366]{color:#ff9817;margin-right:.05rem}.sticky .exchange[data-v-f2cf4366]{margin-top:.3rem;background-color:#ff5000}.sticky .exchange[data-v-f2cf4366]:active{background-color:#e64800}.sticky .exchange.disable[data-v-f2cf4366]{background-color:#b5b5b5}.sticky .exchange.disable[data-v-f2cf4366]:active{background-color:#a8a8a8}.sticky .lack[data-v-f2cf4366]{background-color:#ff9817}.sticky .lack[data-v-f2cf4366]:active{background-color:#fd8c00}",""])},390:function(t,e,i){var a=i(326);"string"==typeof a&&(a=[[t.i,a,""]]);i(2)(a,{});a.locals&&(t.exports=a.locals)},575:function(t,e,i){i(390);var a=i(1)(i(224),i(640),"data-v-f2cf4366",null);t.exports=a.exports},640:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.product_detail?i("div",{staticClass:"product-detail"},[t.is_recharge?i("recharge",{attrs:{"product-detail":t.product_detail}}):[i("header",{staticClass:"header "},[i("img",{staticClass:"banner",attrs:{src:t.product_detail.pic_banner_new}}),t._v(" "),i("div",{staticClass:"title"},[i("h1",{staticClass:"text-ellipsis"},[t._v(t._s(t.product_name))]),t._v(" "),i("h3",[i("span",{staticClass:"number"},[t._v(t._s(t.integral))]),t._v("积分\n                    "),i("s",[t._v("¥"+t._s(t.product_detail.price))])])])]),t._v(" "),i("main",{staticClass:"main"},[t.product_detail.content?i("v-introduction",{attrs:{title:"详细说明",content:t.product_detail.content}}):t._e(),t._v(" "),t.product_detail.content_use?i("v-introduction",{attrs:{title:"使用说明",content:t.product_detail.content_use}}):t._e()],1),t._v(" "),i("footer",{staticClass:"sticky"},[t.exchange_unavaliable?i("div",{staticClass:"exchange disable"},[t._v("商品已兑换光")]):t.integral_enough?i("div",{staticClass:"exchange",on:{click:t.exchange}},[t._v("立即兑换")]):[i("h6",[i("i",{staticClass:"iconfont icon-warn"}),t._v(" 您的积分不足\n                ")]),t._v(" "),i("router-link",{staticClass:"lack",attrs:{to:{name:"earn_integral",query:{back_show:!0}},tag:"div"}},[t._v("\n                    去赚取更多的积分>>\n                ")])]],2)]],2):t._e()},staticRenderFns:[]}}});