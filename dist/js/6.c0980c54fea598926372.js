webpackJsonp([6],{137:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=i(194),a=i.n(n);e.default={name:"activityDetail",components:{vDialog:a.a,quiz:function(t){i.e(14).then(function(){var e=[i(183)];t.apply(null,e)}.bind(this)).catch(i.oe)},scrap:function(t){i.e(13).then(function(){var e=[i(184)];t.apply(null,e)}.bind(this)).catch(i.oe)},game:function(t){i.e(20).then(function(){var e=[i(181)];t.apply(null,e)}.bind(this)).catch(i.oe)},shake:function(t){i.e(19).then(function(){var e=[i(186)];t.apply(null,e)}.bind(this)).catch(i.oe)},fortune:function(t){i.e(15).then(function(){var e=[i(180)];t.apply(null,e)}.bind(this)).catch(i.oe)},egg:function(t){i.e(18).then(function(){var e=[i(179)];t.apply(null,e)}.bind(this)).catch(i.oe)},machine:function(t){i.e(16).then(function(){var e=[i(182)];t.apply(null,e)}.bind(this)).catch(i.oe)},treasure:function(t){i.e(11).then(function(){var e=[i(189)];t.apply(null,e)}.bind(this)).catch(i.oe)},card:function(t){i.e(12).then(function(){var e=[i(178)];t.apply(null,e)}.bind(this)).catch(i.oe)},tear:function(t){i.e(17).then(function(){var e=[i(187)];t.apply(null,e)}.bind(this)).catch(i.oe)}},data:function(){return{activity_id:"",activity_detail:{},activity_type:"",free_times:"",dialog_show:!1,dialog:{}}},computed:{notice:function(){return this.free_times>0?"您还剩余"+this.free_times+"次免费机会":"消耗积分"+(this.activity_detail.integral>>0)}},created:function(){var t=this;this.activity_id=this.$route.query.activity_id,this.getActivityDetail().then(function(e){t.activity_type=t.getActivityType(e.data.type)}),this.getFreeTimes()},methods:{getActivityDetail:function(){var e=this;return new Promise(function(i){e.$store.dispatch("toggleLoading"),e.$http.post(t.HOST+"/activity_detail_l/"+e.activity_id,{token:t.TOKEN,media_id:t.MEDIA_ID,user_id:t.USER_ID,open_id:t.OPEN_ID}).then(function(t){e.$store.dispatch("toggleLoading");var n=t.data;e.activity_detail=n.data,i&&i(n)},function(t){e.$store.dispatch("toggleLoading")})})},getFreeTimes:function(){var e=this;this.$http.post(t.HOST+"/get_free_times/"+t.USER_ID,{token:t.TOKEN,userid:t.USER_ID,activity_id:this.activity_id}).then(function(t){var i=t.data;e.free_times=i.data.free_times})},freshFreeTimes:function(){this.$store.dispatch("getUserInfor"),this.getFreeTimes()},toOrderDetail:function(t){return function(){this.$router.push({name:"order_detail",query:{order_id:t}})}},getActivityType:function(t){var e="";return["scrap","quiz","game","shake","fortune","egg","machine","treasure","doll","card","tear"].forEach(function(i,n){if(t===n+1)return void(e=i)}),e||"scrap"},toggleDialog:function(t){this.dialog=t,this.dialog_show=!this.dialog_show}}}}).call(e,i(3))},151:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"faliure",props:{dialog:Object,close:Function,func:Function,show:{type:Boolean,default:!1}}}},153:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(192),a=i.n(n);e.default={name:"vDialog",components:{common:function(t){i.e(22).then(function(){var e=[i(190)];t.apply(null,e)}.bind(this)).catch(i.oe)},dice:function(t){i.e(23).then(function(){var e=[i(191)];t.apply(null,e)}.bind(this)).catch(i.oe)},reel:function(t){i.e(21).then(function(){var e=[i(193)];t.apply(null,e)}.bind(this)).catch(i.oe)},faliure:a.a},props:{dialog:{type:Object,default:function(){return{}}},toggleDialog:Function,show:Boolean},computed:{type:function(){return this.dialog.type||"faliure"},style:function(){return this.dialog.style||"common"},callback:function(){return this.dialog.callback},callback_close:function(){return this.dialog.callback_close}},methods:{func:function(){this.callback&&this.callback(),this.toggleDialog()},close:function(){this.callback_close?this.callback_close():"faliure"===this.type&&this.callback&&this.callback(),this.toggleDialog()}}}},192:function(t,e,i){"use strict";t.exports=i(399)},194:function(t,e,i){"use strict";t.exports=i(401)},20:function(t,e,i){"use strict";t.exports=i(385)},211:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".faliure[data-v-254945f2]{position:fixed;left:50%;top:50%;z-index:6;width:7.65333rem;height:7.37333rem;margin-left:-3.82667rem;margin-top:-3.68667rem;background-color:#eb4a4a;border-radius:.4rem}.faliure .close[data-v-254945f2]{float:right;width:.66667rem;height:.66667rem;background-image:url("+i(350)+");background-size:.45333rem .45333rem;background-position:0 100%;background-repeat:no-repeat}.faliure .message[data-v-254945f2]{width:100%;height:.88rem;line-height:.88rem;padding:0 .2rem;overflow:hidden;font-size:.50667rem;text-align:center;font-weight:500;color:#ffe433}.faliure .circle[data-v-254945f2]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:3.06667rem;height:3.06667rem;margin:.4rem auto .73333rem;background:url("+i(351)+") no-repeat;background-size:100% 100%}.faliure .operation[data-v-254945f2]{display:block;width:2.4rem;height:.78667rem;margin:0 auto;text-align:center;line-height:.78667rem;border-radius:.13333rem;background-color:#ffe433;color:#474747;font-size:.45333rem}",""])},214:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".v-dialog .bg-cover[data-v-2ca7ddbf]{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:5}",""])},240:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".activity-detail[data-v-dacd106a]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;background-color:#f2f3f4;overflow:hidden}.activity-detail-content[data-v-dacd106a]{-webkit-flex:1;-ms-flex:1;flex:1}",""])},253:function(t,e,i){var n=i(211);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},256:function(t,e,i){var n=i(214);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},282:function(t,e,i){var n=i(240);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},350:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAjCAYAAADxG9hnAAAB3klEQVRYR7XXMS8FQRDA8f9EI0SHmujoqan5ENREKS+hoqBXSXwLjUYvUaL1etFKFDIy3Mo6b9/N7r295iWXu7e/m9mdnRWaS1XXgUcReQ/3av6q6hKwB5zbmGKDqeousAO8ACe1MQ3iFJj9HVNV94Gt6OurYlqIMOyTqOomcNBKQxVMAmFT4TikpjpmLEJk+A1p5kk1TBfCxv+F1MJ4EP8gk8Z4ESMhk8LkIJKQvphcxFhIKaYE0QnJxZQiXBAvpg/CDenCAItA2DtCafqpmCJDz+b5p450vZDYDt6azWs6ej8LkRWRRAWeAVaBD+AZ+ASyEUWQKE1HDWKqQRrgARh40xFnICs1UVSsqbkC1qI/s2jcAocl/Uw2pLU65oGVJiWWGotKUQuRBUks0bloboQA3YvIRdfkL0rNuDoBLI9oru5E5NKLcUXEU6wSS9uN6YR4EImlHW67MGMhOYi+mCSkBNEHMxLSBxFh7PC03ZqsyTT9g0wCEWHsmGJNeXyNxLSbZ6uYvXbR9nJVVRcmPk5MHJETmXDAqobwYuzIWR3hwRjE5kS8ixb1E95SnpgzNwax5uYMsMhURSQi8+cQbpgBcF3S1HijET/XRGYj9LWde03JIN53VHVBRF7t+S8IRmVTnPygGAAAAABJRU5ErkJggg=="},351:function(t,e,i){t.exports=i.p+"images/faliure.b4072d3867bb1638a86058c68914b7e9.png"},385:function(t,e,i){i(282);var n=i(2)(i(137),i(462),"data-v-dacd106a",null);t.exports=n.exports},399:function(t,e,i){i(253);var n=i(2)(i(151),i(433),"data-v-254945f2",null);t.exports=n.exports},401:function(t,e,i){i(256);var n=i(2)(i(153),i(436),"data-v-2ca7ddbf",null);t.exports=n.exports},433:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",{staticClass:"faliure"},[i("div",{staticClass:"close",on:{click:t.close}}),t._v(" "),i("h1",{staticClass:"message "},[t._v(t._s(t.dialog.msg||"谢谢参与"))]),t._v(" "),i("div",{staticClass:"circle"}),t._v(" "),i("div",{staticClass:"operation",on:{click:t.func}},[t._v(t._s(t.dialog.btn_text||"关闭"))])]):t._e()},staticRenderFns:[]}},436:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-dialog"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"bg-cover"}),t._v(" "),"success"===t.type?i(t.style,{tag:"component",attrs:{close:t.close,func:t.func,dialog:t.dialog,show:t.show}}):i("faliure",{attrs:{close:t.close,func:t.func,dialog:t.dialog,show:t.show}})],1)},staticRenderFns:[]}},462:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"activity-detail"},[i("div",{staticClass:"activity-detail-content"},[i("keep-alive",[i(t.activity_type,{tag:"component",attrs:{"free-times":t.free_times>>0,"fresh-free-times":t.freshFreeTimes,"activity-detail":t.activity_detail,id:t.activity_id>>0,notice:t.notice,"to-order-detail":t.toOrderDetail,toggleDialog:t.toggleDialog}})],1)],1),t._v(" "),i("v-dialog",{attrs:{show:t.dialog_show,dialog:t.dialog,"toggle-dialog":t.toggleDialog}}),t._v(" "),i("v-support")],1)},staticRenderFns:[]}}});