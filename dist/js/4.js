webpackJsonp([4],{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(127)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(134),
  /* scopeId */
  "data-v-c5ac4128",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/components/vPopup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vPopup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c5ac4128", Component.options)
  } else {
    hotAPI.reload("data-v-c5ac4128", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'vIntroduction',
    props: {
        title: String,
        content: String
    }
});

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        togglePopup: Function,
        callback: Function,
        show: {
            type: Boolean,
            default: false
        }

    },
    methods: {
        close: function close() {
            if (this.callback) {
                this.callback();
            } else {
                this.togglePopup();
            }
        }
    }
});

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-introduction[data-v-a2f982ec]{padding:0 .4rem;margin-top:.26667rem;background-color:#fff;border-bottom:1px solid #d3d4d6;text-align:justify}.v-introduction h3[data-v-a2f982ec]{line-height:1.01333rem;color:#646565;border-bottom:1px solid #f2f3f4}.v-introduction .content[data-v-a2f982ec]{padding:.26667rem 0}", ""]);

// exports


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-popup .v-popup-content[data-v-c5ac4128]{position:fixed;bottom:0;left:0;right:0;border-top:1px solid #f2f3f4;z-index:2}.v-popup .close-popup[data-v-c5ac4128]{position:absolute;right:0;top:0;padding-right:.26667rem;padding-top:.26667rem;color:#ff5000}.v-popup .bg-cover[data-v-c5ac4128]{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:1}.v-popup .iconfont[data-v-c5ac4128]{font-size:.53333rem}.popup-enter-active[data-v-c5ac4128],.popup-leave-active[data-v-c5ac4128]{transition:-webkit-transform .5s;transition:transform .5s;transition:transform .5s,-webkit-transform .5s}.popup-enter[data-v-c5ac4128],.popup-leave-active[data-v-c5ac4128]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}", ""]);

// exports


/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a2f982ec&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vIntroduction.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a2f982ec&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vIntroduction.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c5ac4128&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vPopup.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c5ac4128&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vPopup.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(125)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(132),
  /* scopeId */
  "data-v-a2f982ec",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/components/vIntroduction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vIntroduction.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a2f982ec", Component.options)
  } else {
    hotAPI.reload("data-v-a2f982ec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "v-introduction"
  }, [_c('h3', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('v-simditor', [_c('article', {
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a2f982ec", module.exports)
  }
}

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-popup"
  }, [_c('transition', {
    attrs: {
      "name": "popup"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "v-popup-content"
  }, [_c('i', {
    staticClass: "close-popup iconfont icon-close-circle",
    on: {
      "click": _vm.close
    }
  }), _vm._v(" "), _vm._t("default")], 2)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "bg-cover"
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c5ac4128", module.exports)
  }
}

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(APP) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vPopup_vue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vPopup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_vPopup_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'recharge',
    components: {
        vPopup: __WEBPACK_IMPORTED_MODULE_0_components_vPopup_vue___default.a
    },
    props: {
        productDetail: {
            type: Object,
            default: {}
        }
    },
    data: function data() {
        return {
            flow_list: ['30M', '70M', '150M', '500M', '1024M', '2048M'],
            phone: '',
            state: 'ready',
            flow_infor: '',
            in_exchange: false,
            popup_show: false
        };
    },

    computed: {
        company: function company() {
            return this.flow_infor ? this.flow_infor.company : '';
        }
    },
    watch: {
        phone: function phone(value) {
            this.state = /^1[34578]\d{9}$/.test(value) ? 'active' : 'ready';
        },
        state: function state(value, old_value) {
            if (value == 'active' && old_value == 'ready') {
                this.getFlows();
            } else if (value == 'ready') {
                this.flow_infor = '';
            }
        }
    },
    methods: {
        exchange: function exchange() {
            var _this = this;

            if (this.in_exchange) return;
            this.in_exchange = true;
            this.$store.dispatch('toggleLoading');
            this.$http.post(APP.HOST + '/exchange_flows_recharge/' + this.phone, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id: APP.MEDIA_ID,
                user_id: APP.USER_ID,
                product_id: this.productDetail.id,
                companytype: this.flow_infor.companytype,
                flows: this.flow_infor.flows
            }).then(function (response) {
                _this.$store.dispatch('toggleLoading');
                var data = response.data,
                    msg = '';
                if (data.status == APP.SUCCESS) {
                    msg = data.data.message;
                } else {
                    msg = data.info;
                }
                _this.$store.dispatch('toggleAlert', {
                    msg: msg,
                    callback: function callback() {
                        _this.in_exchange = false;
                    }
                });
            }, function () {
                _this.$store.dispatch('toggleLoading');
            });
        },
        getFlows: function getFlows() {
            var _this2 = this;

            this.$http.post(APP.HOST + '/check_flows_phone/' + this.phone, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                var data = response.data;
                if (data.status == APP.SUCCESS) {
                    _this2.flow_infor = data.data;
                }
            });
        },
        togglePopup: function togglePopup() {
            if (this.state != 'active') return;
            this.popup_show = !this.popup_show;
        }
    }

});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(APP) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vIntroduction_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vIntroduction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_vIntroduction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_recharge__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_recharge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_recharge__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'productDetail',
    components: {
        vIntroduction: __WEBPACK_IMPORTED_MODULE_0_components_vIntroduction_vue___default.a,
        recharge: __WEBPACK_IMPORTED_MODULE_1__components_recharge___default.a
    },
    data: function data() {
        return {
            product_id: '',
            product_detail: '',
            order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
            content_show: false,
            is_recharge: false
        };
    },

    computed: {
        user: function user() {
            return this.$store.state.user;
        },
        integral_enough: function integral_enough() {
            return this.user.integral >> 0 >= this.integral;
        },
        integral: function integral() {
            return this.$route.query.integral || this.product_detail.integral >> 0 || 0;
        },
        product_name: function product_name() {
            return this.$route.query.name || this.product_detail.name;
        }
    },
    watch: {
        order_detail_id: function order_detail_id() {
            this.$store.dispatch('getUserInfor');
            this.$store.dispatch('toggleAlert', {
                close_btn: true,
                msg: '获得' + this.product_name,
                type: 'img',
                img: this.product_detail.pic_thumb,
                btn_text: '查看',
                callback: this.toOrderDetail
            });
        }
    },
    created: function created() {
        this.product_id = this.$route.query.product_id;
        this.getProductDetail();
    },

    methods: {
        //获取商品详情
        getProductDetail: function getProductDetail() {
            var _this = this;

            this.$store.dispatch('toggleLoading');
            this.$http.post(APP.HOST + '/product_detail_l/' + this.product_id, {
                token: APP.TOKEN,
                media_id: APP.MEDIA_ID,
                user_id: APP.USER_ID,
                open_id: APP.OPEN_ID
            }).then(function (response) {
                _this.$store.dispatch('toggleLoading');
                var data = response.data;
                _this.product_detail = data.data;
                if (_this.product_detail.type === 8) {
                    _this.is_recharge = true;
                }
            }, function (response) {
                _this.$store.dispatch('toggleLoading');
            });
        },

        //兑换
        exchange: function exchange() {
            var _this2 = this;

            this.$store.dispatch('toggleConfirm', {
                msg: '确认兑换该商品吗?',
                callback: function callback() {
                    _this2.order().then(function (data) {
                        _this2.order_detail_id = data.data.id;
                    }).catch(function (data) {
                        _this2.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    });
                }
            });
        },

        //生成订单
        order: function order() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.$store.dispatch('toggleLoading');
                _this3.$http.post(APP.HOST + '/product_order/' + _this3.product_id, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then(function (response) {
                    _this3.$store.dispatch('toggleLoading');
                    var data = response.data;
                    if (data.status == APP.SUCCESS) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }, function (response) {
                    _this3.$store.dispatch('toggleLoading');
                    reject(response.data);
                });
            });
        },

        //路由跳转
        toOrderDetail: function toOrderDetail() {
            this.$router.push({
                name: 'order_detail',
                query: {
                    order_id: this.order_detail_id
                }
            });
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(390);

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".banner[data-v-3aecc88e]{width:10rem;height:5.6rem}main[data-v-3aecc88e]{background-color:#fff;border-bottom:1px solid #d3d4d6}.form-control[data-v-3aecc88e]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;height:1.22667rem;margin:0 .32rem;padding:0 .21333rem;border-bottom:1px solid #f2f3f4;font-size:.45333rem}.form-control input[data-v-3aecc88e]{-webkit-flex:1;-ms-flex:1;flex:1;border:none}.form-control span[data-v-3aecc88e]{color:#a9aaae}.flow-box[data-v-3aecc88e]{-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-content:space-between;-ms-flex-line-pack:justify;align-content:space-between;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;min-height:3.78667rem;padding:.4rem .53333rem 0}.flow-box[data-v-3aecc88e],.flow-box li[data-v-3aecc88e]{display:-webkit-flex;display:-ms-flexbox;display:flex;list-style:none}.flow-box li[data-v-3aecc88e]{-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:2.81333rem;height:1.54667rem;border:1px solid #a9aaae;border-radius:.13333rem;font-size:.48rem}.flow-box li.ready[data-v-3aecc88e]{color:#ff5000;border-color:#ff5000}.flow-box li.active[data-v-3aecc88e]{color:#fff;background-color:#ff5000;border-color:#ff5000}.flow-box li[data-v-3aecc88e]:nth-child(3),.flow-box li[data-v-3aecc88e]:nth-child(6){margin-right:0}.notice[data-v-3aecc88e]{line-height:1.33333rem;text-align:center}.exchange[data-v-3aecc88e]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:1.49333rem;margin:.73333rem .46667rem;border-radius:.13333rem;font-size:.48rem}.exchange span[data-v-3aecc88e]{padding:0 .2rem}.exchange s[data-v-3aecc88e]{color:#c5c5c5;font-size:.32rem;-webkit-transform:scale(.9);-ms-transform:scale(.9);transform:scale(.9)}.popup-content[data-v-3aecc88e]{padding-bottom:.46667rem;background-color:#f2f3f4}.popup-content h1[data-v-3aecc88e]{text-align:center;line-height:1.52rem;color:#3d4244;background-color:#fff}.popup-content ul[data-v-3aecc88e]{background-color:#fff;list-style:none;margin-bottom:.46667rem}.popup-content li[data-v-3aecc88e]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:1.28rem;margin:0 .33333rem;list-style:none;border-top:1px solid #f2f3f4;color:#646565}.popup-content strong[data-v-3aecc88e]{padding:0 .6rem 0 .10667rem;color:#646565;font-weight:400}.popup-content .integral[data-v-3aecc88e]{color:#ff5000}.popup-content .exchange[data-v-3aecc88e]{margin:0 .46667rem}", ""]);

// exports


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".product-detail[data-v-f2cf4366]{min-height:100%;padding-bottom:1.13333rem;background-color:#f2f3f4}.banner[data-v-f2cf4366]{width:10rem;height:5.33333rem}.title[data-v-f2cf4366]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:1.86667rem;padding-left:.4rem;background-color:#fff;border-bottom:1px solid #d3d4d6}.title h1[data-v-f2cf4366]{font-size:.45333rem}.title h3[data-v-f2cf4366]{display:inline-block;color:#ff5000}.title .number[data-v-f2cf4366]{font-size:.48rem}.title s[data-v-f2cf4366]{padding-left:.4rem;color:#6e6f6f;-webkit-transform:scale(.6) translateY(10%);-ms-transform:scale(.6) translateY(10%);transform:scale(.6) translateY(10%);display:inline-block;-webkit-transform-origin:left;-ms-transform-origin:left;transform-origin:left}.main[data-v-f2cf4366]{padding-bottom:1.33333rem}.sticky[data-v-f2cf4366]{position:fixed;bottom:0;left:0;right:0;z-index:1;padding:0 .4rem .4rem;text-align:center;background-color:#fff;border-bottom:1px solid #f2f3f4;box-shadow:0 0 0 #000,0 0 .2rem #ddd}.sticky>div[data-v-f2cf4366]{display:block;width:100%;height:1.33333rem;line-height:1.33333rem;font-size:.53333rem;color:#fff;border-radius:.13333rem}.sticky h6[data-v-f2cf4366]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:.88rem;color:#646565}.sticky h6 .iconfont[data-v-f2cf4366]{color:#ff9817;margin-right:.06667rem}.sticky .exchange[data-v-f2cf4366]{margin-top:.4rem;background-color:#ff5000}.sticky .exchange[data-v-f2cf4366]:active{background-color:#e64800}.sticky .lack[data-v-f2cf4366]{background-color:#ff9817}.sticky .lack[data-v-f2cf4366]:active{background-color:#fd8c00}", ""]);

// exports


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(213);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3aecc88e&scoped=true!../../../../../node_modules/sass-loader/index.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recharge.vue", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3aecc88e&scoped=true!../../../../../node_modules/sass-loader/index.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./recharge.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(231);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f2cf4366&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productDetail.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-f2cf4366&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productDetail.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(391);

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/rechargeBanner.1729f836452668ef8b6ed6e4fbaf1002.png";

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(251)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(412),
  /* scopeId */
  "data-v-3aecc88e",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/productDetail/components/recharge/recharge.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] recharge.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3aecc88e", Component.options)
  } else {
    hotAPI.reload("data-v-3aecc88e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(269)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(430),
  /* scopeId */
  "data-v-f2cf4366",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/productDetail/productDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] productDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2cf4366", Component.options)
  } else {
    hotAPI.reload("data-v-f2cf4366", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "recharge "
  }, [_c('img', {
    staticClass: "banner",
    attrs: {
      "src": __webpack_require__(358)
    }
  }), _vm._v(" "), _c('main', [_c('div', {
    staticClass: "form-control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phone),
      expression: "phone"
    }],
    attrs: {
      "type": "tel",
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phone = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.company))])]), _vm._v(" "), (!_vm.flow_infor) ? _c('ul', {
    staticClass: "flow-box"
  }, _vm._l((_vm.flow_list), function(flow, $index) {
    return _c('li', {
      staticClass: "ready"
    }, [_vm._v(_vm._s(flow))])
  })) : _c('ul', {
    staticClass: "flow-box"
  }, [_c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.flow_infor.flows),
      expression: "flow_infor.flows"
    }],
    staticClass: "active"
  }, [_vm._v(_vm._s(_vm.flow_infor.flows))])]), _vm._v(" "), _c('h4', {
    staticClass: "notice"
  }, [_vm._v("即时生效,当月有效,(充值高峰可能出现延迟)。")])]), _vm._v(" "), _c('footer', [_c('div', {
    staticClass: "exchange btn-orange",
    on: {
      "click": _vm.togglePopup
    }
  }, [_vm._v("立即兑换\n            "), (_vm.flow_infor) ? [_vm._v("\n                :"), _c('span', [_vm._v(_vm._s(_vm.productDetail.integral >> 0) + "积分")]), _vm._v(" "), _c('s', [_vm._v("¥" + _vm._s(_vm.productDetail.price))])] : _vm._e()], 2)]), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.popup_show,
      "toggle-popup": _vm.togglePopup
    }
  }, [_c('div', {
    staticClass: "popup-content"
  }, [_c('h1', [_vm._v("确认支付")]), _vm._v(" "), _c('ul', [_c('li', [_c('strong', [_vm._v("手机号码")]), _vm._v(" " + _vm._s(_vm.phone) + "\n                ")]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("重制流量")]), _vm._v(" " + _vm._s(_vm.flow_infor.flows) + "\n                ")]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("消耗积分")]), _vm._v(" "), _c('span', {
    staticClass: "integral"
  }, [_vm._v(_vm._s(_vm.productDetail.integral >> 0) + "积分")])])]), _vm._v(" "), _c('footer', {
    staticClass: "footer"
  }, [_c('div', {
    staticClass: "exchange btn-orange",
    on: {
      "click": _vm.exchange
    }
  }, [_vm._v("确认兑换")])])])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3aecc88e", module.exports)
  }
}

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.product_detail) ? _c('div', {
    staticClass: "product-detail"
  }, [(!_vm.is_recharge) ? [_c('header', {
    staticClass: "header "
  }, [_c('img', {
    staticClass: "banner",
    attrs: {
      "src": _vm.product_detail.pic_banner
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_c('h1', {
    staticClass: "text-ellipsis"
  }, [_vm._v(_vm._s(_vm.product_name))]), _vm._v(" "), _c('h3', [_c('span', {
    staticClass: "number"
  }, [_vm._v(_vm._s(_vm.integral))]), _vm._v("积分\n                    "), _c('s', [_vm._v("¥" + _vm._s(_vm.product_detail.price))])])])]), _vm._v(" "), _c('main', {
    staticClass: "main"
  }, [(_vm.product_detail.content) ? _c('v-introduction', {
    attrs: {
      "title": "详细说明",
      "content": _vm.product_detail.content
    }
  }) : _vm._e(), _vm._v(" "), (_vm.product_detail.content_use) ? _c('v-introduction', {
    attrs: {
      "title": "使用说明",
      "content": _vm.product_detail.content_use
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('footer', {
    staticClass: "sticky"
  }, [(_vm.integral_enough) ? _c('div', {
    staticClass: "exchange",
    on: {
      "click": _vm.exchange
    }
  }, [_vm._v("立即兑换")]) : [_c('h6', [_c('i', {
    staticClass: "iconfont icon-warn"
  }), _vm._v(" 您的积分不足\n                ")]), _vm._v(" "), _c('router-link', {
    staticClass: "lack",
    attrs: {
      "to": {
        name: "earn_integral",
        query: {
          back_show: true
        }
      },
      "tag": "div"
    }
  }, [_vm._v("\n                    去赚取更多的积分>>\n                ")])]], 2)] : _c('recharge', {
    attrs: {
      "product-detail": _vm.product_detail
    }
  })], 2) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f2cf4366", module.exports)
  }
}

/***/ })

});