webpackJsonp([3],{124:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=i(274),o=i.n(n);e.default={name:"vAddress",components:{vListChoose:o.a},props:{address:Object,id:Object,changeName:Function,changeId:Function},data:function(){return{show_province:!1,show_city:!1,show_country:!1,province_list:[],city_list:[],country_list:[]}},computed:{province:function(){return this.address.province},city:function(){return this.address.city},country:function(){return this.address.country},province_id:function(){return this.id.province_id},city_id:function(){return this.id.city_id},country_id:function(){return this.id.country_id}},watch:{province_id:function(t){var e="";t&&this.province_list.length&&(this.getCityList(t),this.changeId("city"),this.changeId("country"),e=this.getAddressName("province",t,this.province_list)),this.changeName("province",e)},city_id:function(t){var e="";t?(this.getCountryList(t),this.changeId("country"),e=this.getAddressName("city",t,this.city_list)):this.country_list=[],this.changeName("city",e)},country_id:function(t){var e="";t&&(e=this.getAddressName("country",t,this.country_list)),this.changeName("country",e)}},created:function(){this.getProvinceList(),this.province_id&&this.getCityList(this.province_id),this.city_id&&this.getCountryList(this.city_id)},methods:{listEvent:function(t){var e=Object.keys(t)[1];this.changeId(e,t[e+"id"])},isActive:function(t){var e=Object.keys(t)[1];return this[e+"_id"]==t[e+"id"]},getProvinceList:function(){var e=this;return new Promise(function(i){e.$http.post(t.HOST+"/province_list",{token:t.TOKEN,userid:t.USER_ID}).then(function(t){var n=t.data;e.province_list=n.data||[],i&&i()})})},getCityList:function(e){var i=this;return new Promise(function(n){i.$http.post(t.HOST+"/city_list/"+e,{token:t.TOKEN,userid:t.USER_ID}).then(function(t){var e=t.data;i.city_list=e.data||[],n&&n()},function(t){})})},getCountryList:function(e){var i=this;return new Promise(function(n){i.$http.post(t.HOST+"/country_list/"+e,{token:t.TOKEN,userid:t.USER_ID}).then(function(t){var e=t.data;i.country_list=e.data||[],n&&n()})})},getAddressName:function(t,e,i){var n=t+"id",o="";return i.forEach(function(i){if(i[n]==e)return void(o=i[t])}),o},toggleProvince:function(){this.show_province=!this.show_province},toggleCity:function(){this.show_city=!this.show_city},toggleCountry:function(){this.city_id&&(this.show_country=!this.show_country)}}}}).call(e,i(3))},125:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(9),o=i.n(n);e.default={name:"vListChoose",components:{vModal:o.a},props:{show:{type:Boolean,default:!1},toggleModal:Function,list:{type:Array,default:function(){return[]}},attribute:String,callback:Function,isActive:Function,value:Boolean},data:function(){return{}},watch:{},methods:{event:function(t){this.callback(t),this.toggleModal()}}}},126:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"vWarn",props:{warn:Object,value:Boolean,toggleWarn:Function},computed:{alert:function(){return this.warn||{}},msg:function(){return this.alert.msg},btn_text:function(){return this.alert.btn_text||"关闭"},type:function(){return this.alert.type||"faliure"},img:function(){return this.alert.img},callback:function(){return this.alert.callback},callback_close:function(){return this.alert.callback_close}},methods:{func:function(){this.callback&&this.callback(),this.$emit("input",!1)},close:function(){this.callback_close?this.callback_close():"faliure"==this.type&&this.callback&&this.callback(),this.$emit("input",!1)}}}},127:function(t,e,i){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0});var o=i(275),a=i.n(o),r=i(273),s=i.n(r);e.default={name:"editUser",components:{vAddress:s.a,vWarn:a.a},data:function(){return{show_birth:!1,birth:{year:"",month:"",day:""},province:"",city:"",country:"",address:"",phone:"",contact:"",birthday:"",province_id:"",city_id:"",country_id:"",in_vertication:!1,verification_code:"",countdown:60,warn:{},warn_show:!1}},computed:{user:function(){return this.$store.state.user},content_show:function(){return!t.isEmptyObject(this.user)},is_submit:function(){return 1==this.$store.state.user.is_submit},default_address:function(){return this.user.default_address||{}},birth_format:function(){return this.birth.year&&this.birth.month&&this.birth.day?this.birth.year+"-"+this.birth.month+"-"+this.birth.day:""}},watch:{default_address:function(t){this.init(t)}},created:function(){this.init(this.default_address),this.birth={year:this.user.year||"",month:this.user.month||"",day:this.user.day||""}},methods:{init:function(e){var i=this;if(!t.isEmptyObject(e)){var n=["province","city","country","address","phone","contact","province_id","city_id","country_id"];n.forEach(function(t){i[t]=e[t]}),this.birthday=this.user.birthday}},cancel:function(){event.preventDefault(),this.$router.go(-1)},submit:function(){var t=this;event.preventDefault(),this.$store.dispatch("toggleLoading"),this.$http.post(n.HOST+"/user_submit/"+n.USER_ID,{token:n.TOKEN,userid:n.USER_ID,province:this.province,city:this.city,country:this.country,address:this.address,phone:this.phone,contact:this.contact,birthday:this.birthday,province_id:this.province_id,city_id:this.city_id,country_id:this.country_id,verification_code:this.verification_code}).then(function(e){t.$store.dispatch("toggleLoading");var i=e.data;i.status==n.SUCCESS?t.toggleWarn({msg:i.info,btn_text:"确定",callback:function(){t.$store.dispatch("getUserInfor"),t.$router.go(-1)}}):t.toggleWarn({msg:i.info})},function(e){t.$store.dispatch("toggleLoading")})},getVerificationCode:function(){var t=this;event.preventDefault(),this.$http.post(n.HOST+"/verification_sm/"+n.USER_ID,{token:n.TOKEN,userid:n.USER_ID,phone:this.phone}).then(function(e){var i=e.data;if(i.status==n.SUCCESS){t.in_vertication=!0;var o=0,a=setInterval(function(){o+=1e3,t.countdown--,o>6e4&&(t.in_vertication=!1,t.countdown=60,clearInterval(a))},1e3)}else t.toggleWarn({msg:i.info})})},changeName:function(t,e){var i=this,n=["province","city","country"];n.forEach(function(n){if(n==t)return void(i[n]=e)})},changeId:function(t,e){var i=this,n=["province","city","country"];n.forEach(function(n){if(n==t)return void(i[n+"_id"]=e)})},toggleWarn:function(t){this.warn=t,this.warn_show=!this.warn_show}}}}).call(e,i(5),i(3))},164:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".v-modal .bg-cover[data-v-332b52ce]{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:5}.v-modal .content[data-v-332b52ce]{position:fixed;left:50%;top:50%;z-index:6}.v-warn-content[data-v-332b52ce]{display:flex;display:-webkit-flex;flex-direction:column;justify-content:space-between;-webkit-justify-content:space-between;width:8rem;height:3.06667rem;margin-left:-4rem;margin-top:-1.53333rem;background-color:#fff;border-radius:.4rem}.v-warn-content .message[data-v-332b52ce]{display:flex;display:-webkit-flex;align-items:center;-webkit-align-items:center;justify-content:center;-webkit-justify-content:center;height:1.73333rem;color:#3d4244}.v-warn-content .message h3[data-v-332b52ce]{width:4rem;text-align:center}.v-warn-content .operation[data-v-332b52ce]{display:flex;display:-webkit-flex;align-items:center;-webkit-align-items:center;justify-content:center;-webkit-justify-content:center;height:1.33333rem;color:#ff5000;font-size:.48rem;border-top:1px solid #f2f3f4}",""])},165:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".edit-user[data-v-34f6b8ab]{padding-top:.4rem}.main[data-v-34f6b8ab]{flex:1;-webkit-flex:1;padding:0 .4rem;list-style:none;background-color:#fff;border-bottom:1px solid #d3d4d6}.main li[data-v-34f6b8ab]{display:flex;align-items:center;display:-webkit-flex;-webkit-align-items:center;height:1.26667rem;overflow:hidden;border-bottom:1px solid #f2f3f4}.main li[data-v-34f6b8ab]:last-child{align-items:flex-start;-webkit-align-items:flex-start;padding-top:.3rem;height:2rem;border-bottom:none}.main label[data-v-34f6b8ab]{width:2rem;font-size:.42667rem;color:#646565}.main input[data-v-34f6b8ab]{background:none}.main input[data-v-34f6b8ab],.main textarea[data-v-34f6b8ab]{flex:1;-webkit-flex:1;color:#646565;border:0;font-size:.37333rem}.main textarea[data-v-34f6b8ab]{text-align:justify}.main .code .btn[data-v-34f6b8ab]{width:1.33333rem}.footer[data-v-34f6b8ab]{padding:.26667rem 0;text-align:center;background-color:#fff}.footer .btn[data-v-34f6b8ab]{width:9.2rem;height:.96rem;text-indent:.16rem;letter-spacing:.16rem}.operation[data-v-34f6b8ab]{display:flex;display:-webkit-flex;-webkit-align-items:center;-webkit-justify-content:center;height:1.6rem;margin-top:.26667rem;background-color:#fff;border-bottom:1px solid #d3d4d6}.operation .btn[data-v-34f6b8ab]{width:6.89333rem;height:.96rem}",""])},175:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".v-address[data-v-c4584b9e]{flex:1;-webkit-flex:1;display:flex;display:-webkit-flex}.v-address .form-control[data-v-c4584b9e]{flex:1;-webkit-flex:1;position:relative}.v-address .iconfont[data-v-c4584b9e]{position:absolute;right:.17333rem;top:50%;font-size:.32rem;font-weight:700;color:#a3a3a3;transform:scale(.7) translateY(-50%);-webkit-transform:scale(.7) translateY(-50%)}.v-address .iconfont.third[data-v-c4584b9e]{right:0}.v-address input[data-v-c4584b9e]{width:2rem;color:#646565;background:none;border:0;font-size:.37333rem}",""])},180:function(t,e,i){e=t.exports=i(0)(),e.push([t.i,".v-list-choose[data-v-fa273eb0]{background-color:#fff;max-height:8rem;overflow:scroll;-webkit-overflow-scrolling:touch;border-radius:.13333rem}.v-list-choose[data-v-fa273eb0]::-webkit-scrollbar{display:none}.v-list-choose li[data-v-fa273eb0]{display:flex;display:-webkit-flex;align-items:center;-webkit-align-items:center;width:5.33333rem;height:.93333rem;list-style:none;overflow:hidden;border-bottom:1px solid #f2f3f4}.v-list-choose li[data-v-fa273eb0]:last-child{border-bottom:1px solid #f2f3f4}.v-list-choose li[data-v-fa273eb0]:active{background-color:#e6e6e6}.v-list-choose li .radio[data-v-fa273eb0]{width:.4rem;height:.4rem;margin:0 .26667rem;border-radius:50%;box-shadow:inset 0 0 .13333rem #f2f3f4}.v-list-choose li .radio.active[data-v-fa273eb0]{box-shadow:none;-webkit-box-shadow:none;border:.13333rem solid #ff5000}",""])},194:function(t,e,i){var n=i(164);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},195:function(t,e,i){var n=i(165);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},205:function(t,e,i){var n=i(175);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},21:function(t,e,i){"use strict";t.exports=i(276)},210:function(t,e,i){var n=i(180);"string"==typeof n&&(n=[[t.i,n,""]]);i(1)(n,{});n.locals&&(t.exports=n.locals)},273:function(t,e,i){i(205);var n=i(2)(i(124),i(312),"data-v-c4584b9e",null);t.exports=n.exports},274:function(t,e,i){i(210);var n=i(2)(i(125),i(317),"data-v-fa273eb0",null);t.exports=n.exports},275:function(t,e,i){i(194);var n=i(2)(i(126),i(301),"data-v-332b52ce",null);t.exports=n.exports},276:function(t,e,i){i(195);var n=i(2)(i(127),i(302),"data-v-34f6b8ab",null);t.exports=n.exports},301:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-modal"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"bg-cover"}),t._v(" "),i("transition",{attrs:{name:"scale"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.value,expression:"value"}],staticClass:"content "},[i("div",{staticClass:"v-warn-content "},[i("div",{staticClass:"message"},[i("h3",[t._v(" "+t._s(t.msg)+" ")])]),t._v(" "),i("a",{staticClass:"operation",on:{click:t.func}},[t._v(t._s(t.btn_text))])])])])],1)},staticRenderFns:[]}},302:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.content_show?i("div",{staticClass:"edit-user"},[i("form",{ref:"form"},[i("ul",{staticClass:"main"},[i("li",[i("label",{attrs:{for:"contact"}},[t._v("姓名")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.contact,expression:"contact"}],attrs:{id:"contact",placeholder:"姓名"},domProps:{value:t.contact},on:{input:function(e){e.target.composing||(t.contact=e.target.value)}}})]),t._v(" "),i("li",[i("label",{attrs:{for:"birth"}},[t._v("出生年月")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.birthday,expression:"birthday"}],attrs:{type:"date"},domProps:{value:t.birthday},on:{input:function(e){e.target.composing||(t.birthday=e.target.value)}}})]),t._v(" "),i("li",[i("label",{attrs:{for:"phone"}},[t._v("手机号")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{id:"phone",type:"tel",placeholder:"手机或固定电话"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),i("li",{staticClass:"code"},[i("label",{attrs:{for:"code"}},[t._v("验证码")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.verification_code,expression:"verification_code"}],attrs:{id:"code",placeholder:"请输入验证码"},domProps:{value:t.verification_code},on:{input:function(e){e.target.composing||(t.verification_code=e.target.value)}}}),t._v(" "),t.in_vertication?i("button",{staticClass:"btn btn-gray",on:{click:t.getVerificationCode}},[t._v(t._s(t.countdown)+"秒")]):i("button",{staticClass:"btn btn-orange",on:{click:t.getVerificationCode}},[t._v("验证")])]),t._v(" "),i("li",{staticClass:"address"},[i("label",{attrs:{for:"province"}},[t._v("收货地址")]),t._v(" "),i("v-address",{attrs:{address:{province:t.province,city:t.city,country:t.country},id:{province_id:t.province_id,city_id:t.city_id,country_id:t.country_id},"change-id":t.changeId,"change-name":t.changeName}})],1),t._v(" "),i("li",[i("label",{attrs:{for:"address"}},[t._v("详细地址")]),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],attrs:{id:"address",placeholder:"请填写详细地址 不少于5个字"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"operation"},[i("button",{staticClass:"btn btn-orange ",on:{click:t.submit}},[t._v("确认")])])]),t._v(" "),i("v-warn",{attrs:{warn:t.warn},model:{value:t.warn_show,callback:function(e){t.warn_show=e}}},[t._v(">")])],1):t._e()},staticRenderFns:[]}},312:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"v-address"},[i("div",{staticClass:"form-control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.province,expression:"province"}],attrs:{id:"province",placeholder:"请选择省",readonly:""},domProps:{value:t.province},on:{click:t.toggleProvince,input:function(e){e.target.composing||(t.province=e.target.value)}}}),t._v(" "),t.province?t._e():i("i",{staticClass:" iconfont icon-arrows-down"})]),t._v(" "),i("div",{staticClass:"form-control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.city,expression:"city"}],attrs:{id:"city",placeholder:"请选择市",readonly:""},domProps:{value:t.city},on:{click:t.toggleCity,input:function(e){e.target.composing||(t.city=e.target.value)}}}),t._v(" "),t.city?t._e():i("i",{staticClass:" iconfont icon-arrows-down"})]),t._v(" "),i("div",{staticClass:"form-control"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.country,expression:"country"}],attrs:{id:"country",placeholder:"请选择县",readonly:""},domProps:{value:t.country},on:{click:t.toggleCountry,input:function(e){e.target.composing||(t.country=e.target.value)}}}),t._v(" "),t.country?t._e():i("i",{staticClass:" iconfont icon-arrows-down third"})]),t._v(" "),i("v-list-choose",{attrs:{show:t.show_province,"toggle-modal":t.toggleProvince,list:t.province_list,attribute:"province",callback:t.listEvent,"is-active":t.isActive}}),t._v(" "),i("v-list-choose",{attrs:{show:t.show_city,"toggle-modal":t.toggleCity,list:t.city_list,attribute:"city",callback:t.listEvent,"is-active":t.isActive}}),t._v(" "),i("v-list-choose",{attrs:{show:t.show_country,"toggle-modal":t.toggleCountry,list:t.country_list,attribute:"country",callback:t.listEvent,"is-active":t.isActive}})],1)},staticRenderFns:[]}},317:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-modal",{attrs:{"toggle-modal":t.toggleModal},model:{value:t.show,callback:function(e){t.show=e}}},[i("ul",{ref:"list",staticClass:"v-list-choose"},t._l(t.list,function(e){return i("li",{on:{click:function(i){t.event(e)}}},[i("i",{class:["radio",{active:t.isActive(e)}]}),t._v(" "),i("span",[t._v(t._s(e[t.attribute]))])])}))])},staticRenderFns:[]}}});