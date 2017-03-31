webpackJsonp([3],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(utils) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
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
    name: 'backTop',
    data: function data() {
        return {
            show: false,
            scrollEvent: ''
        };
    },
    created: function created() {
        this.scrollEvent = this.getScrollEvent();
        window.addEventListener('scroll', this.scrollEvent);
    },

    methods: {
        backTop: function backTop() {
            var height = utils.getScrollTop();
            var timer = window.setInterval(function () {
                if (height >= 0) {
                    height -= 150;
                    window.scrollTo(0, height);
                } else {
                    window.clearInterval(timer);
                }
            }, 10);
        },
        getScrollEvent: function getScrollEvent() {
            var _this = this;

            var clientHeight = utils.getClientHeight();
            return utils.debounce(function () {
                _this.show = utils.getScrollTop() > 1.5 * clientHeight;
            }, 500, 500);
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(113);

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-back-top[data-v-adc712ee]{position:fixed;right:.66667rem;bottom:.66667rem;width:1.25333rem;height:1.25333rem}", ""]);

// exports


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-adc712ee&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vBackTop.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-adc712ee&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vBackTop.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(111)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(108),
  /* template */
  __webpack_require__(114),
  /* scopeId */
  "data-v-adc712ee",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/components/vBackTop/vBackTop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vBackTop.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-adc712ee", Component.options)
  } else {
    hotAPI.reload("data-v-adc712ee", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('img', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: " v-back-top ",
    attrs: {
      "src": __webpack_require__(112)
    },
    on: {
      "click": _vm.backTop
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-adc712ee", module.exports)
  }
}

/***/ }),

/***/ 118:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        order: Object,
        img: String,
        id: String,
        integral: Number,
        name: String,
        hasBorder: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: false
        }
    }
});

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-order.active:active .v-order-footer[data-v-aae655e4],.v-order.active:active .v-order-header[data-v-aae655e4],.v-order.active:active .v-order-main[data-v-aae655e4]{background-color:#fafafa}.v-order-header[data-v-aae655e4]{padding-left:.4rem;line-height:1.01333rem;font-size:.32rem;color:#646565;background-color:#fff}.v-order-header .iconfont[data-v-aae655e4]{font-size:.4rem;margin-right:.16rem;vertical-align:middle}.v-order-main[data-v-aae655e4]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:2.06667rem;border-top:1px solid #f2f3f4;padding:0 .4rem;background-color:#fff}.v-order-main.border[data-v-aae655e4]{border-bottom:1px solid #d3d4d6}.v-order-main .pic[data-v-aae655e4]{width:2.13333rem;height:1.6rem}.v-order-main .describe[data-v-aae655e4]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:80%;padding-left:.33333rem}.v-order-main .describe h2[data-v-aae655e4]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;height:.8rem;line-height:.8rem;color:#3d4244;font-size:.45333rem}.v-order-main .describe p[data-v-aae655e4]{color:#a9aaae;font-size:.32rem}.v-order-main .describe span[data-v-aae655e4]{float:right}", ""]);

// exports


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(122);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-aae655e4&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vOrder.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-aae655e4&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vOrder.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(126)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(118),
  /* template */
  __webpack_require__(133),
  /* scopeId */
  "data-v-aae655e4",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/components/vOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vOrder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aae655e4", Component.options)
  } else {
    hotAPI.reload("data-v-aae655e4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ["v-order", {
      active: _vm.active
    }]
  }, [_c('header', {
    staticClass: "v-order-header"
  }, [_c('i', {
    staticClass: "iconfont  icon-order"
  }), _vm._v(" 订单号：" + _vm._s(_vm.id) + "\n    ")]), _vm._v(" "), _c('main', {
    class: ["v-order-main", {
      border: _vm.hasBorder
    }]
  }, [_c('img', {
    staticClass: "pic",
    attrs: {
      "src": _vm.img
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "describe"
  }, [_c('h2', [_vm._v(_vm._s(_vm.name))]), _vm._v(" "), _c('p', [_vm._v(" " + _vm._s(_vm.integral) + "积分\n                "), _c('span', [_vm._v("x1")])])])]), _vm._v(" "), _c('footer', [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-aae655e4", module.exports)
  }
}

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(utils, APP) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vOrder_vue__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vOrder_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_vOrder_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_vBackTop__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_vBackTop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_vBackTop__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'orderList',
    components: {
        vOrder: __WEBPACK_IMPORTED_MODULE_0_components_vOrder_vue___default.a,
        vBackTop: __WEBPACK_IMPORTED_MODULE_1_components_vBackTop___default.a
    },
    data: function data() {
        return {
            order_list: {
                unsolved: [],
                untransported: [],
                solved: [],
                expired: []
            },
            current_tab: 0,
            current_type: '',
            params: {},
            scroll_events: {},
            tabs: [{
                type: 'unsolved',
                name: '待处理'
            }, {
                type: 'untransported',
                name: '待发货'
            }, {
                type: 'solved',
                name: '已完成'
            }, {
                type: 'expired',
                name: '已逾期'
            }],
            busy: false,
            has_entered: false
        };
    },

    computed: {
        user: function user() {
            return this.$store.state.user;
        }
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        //当从订单详情返回至订单列表时绑定滚动事件
        next(function (vm) {
            if (from.name !== 'order_detail' || !vm.has_entered) {
                vm.init();
                vm.switchTab(1);
                vm.has_entered = true;
            }
            window.addEventListener('scroll', vm.scroll_events[vm.current_type]);
        });
    },
    activated: function activated() {
        var position = utils.getSessionStorage('position:' + this.$route.name);
        if (position) {
            window.scrollTo(0, position);
        }
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        //离开页面后解除滚动事件
        window.removeEventListener('scroll', this.scroll_events[this.current_type]);
        next();
    },

    methods: {
        init: function init() {
            var _this = this;

            this.order_list.unsolved = [];
            this.order_list.untransported = [];
            this.order_list.solved = [];
            this.order_list.expired = [];
            this.tabs.forEach(function (item, index) {
                var type = item.type,
                    tab = index + 1;
                _this.params[type] = {
                    p: 1,
                    r: APP.PERPAGE,
                    total: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    class: tab
                };
                _this.scroll_events[type] = _this.getScrollEvent(tab, _this.params[type], function (data) {
                    _this.order_list[type] = _this.order_list[type].concat(data.data.list);
                });
            });
        },
        getOrderList: function getOrderList(tab, params) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.$http.post(APP.HOST + '/order_list/' + APP.USER_ID + '/' + tab, params).then(function (response) {
                    var data = response.data;
                    if (resolve) {
                        resolve(data);
                    }
                }, function (response) {
                    var data = response.data;
                    if (reject) {
                        reject(data);
                    }
                });
            });
        },

        //获取对应的滚动事件
        getScrollEvent: function getScrollEvent(tab, params, success, failure) {
            var _this3 = this;

            var scroll = true;
            return utils.debounce(function () {
                _this3.busy = params.total > params.p;
                if (scroll && _this3.busy && utils.touchBottom()) {
                    scroll = false;
                    params.p++;
                    _this3.getOrderList(tab, params).then(function (data) {
                        success(data);
                        scroll = true;
                    }).catch(function (data) {
                        failure(data);
                    });
                }
            }, 500, 500);
        },
        switchTab: function switchTab(tab) {
            var _this4 = this;

            this.current_tab = tab;
            this.current_type = this.tabs[this.current_tab - 1].type;
            var type = this.current_type;
            //显示／隐藏加载更多
            this.busy = this.params[type].total > this.params[type].p;
            //添加当前目滚动事件 解除其余项滚动事件
            this.tabs.forEach(function (item) {
                if (item.type === type) {
                    window.addEventListener('scroll', _this4.scroll_events[item.type]);
                } else {
                    window.removeEventListener('scroll', _this4.scroll_events[item.type]);
                }
            });
            if (this.params[type].total) return;
            this.$store.dispatch('toggleLoading');
            this.getOrderList(tab, this.params[type]).then(function (data) {
                _this4.$store.dispatch('toggleLoading');
                var p = data.data.p,
                    total = data.data.total;
                _this4.params[type].total = total;
                _this4.order_list[type] = _this4.order_list[type].concat(data.data.list);
                if (total > p) {
                    _this4.busy = true;
                }
            }).catch(function (data) {
                _this4.$store.dispatch('toggleLoading');
            });
        },
        getIconType: function getIconType($index) {
            var icon_list = ['icon-order-unsolved', 'icon-car', 'icon-solved', 'icon-delete'];
            var temp = '';
            icon_list.forEach(function (name, index) {
                if (index === $index) {
                    temp = name;
                    return;
                }
            });
            return temp;
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8), __webpack_require__(4)))

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".order-list[data-v-a22114b6]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;background-color:#f2f3f4;padding-top:.26667rem}.order-list-content[data-v-a22114b6]{-webkit-flex:1;-ms-flex:1;flex:1}.tabs[data-v-a22114b6]{background-color:#fff;margin-bottom:.26667rem;border-bottom:1px solid #d3d4d6}.tabs[data-v-a22114b6],.tabs li[data-v-a22114b6]{display:-webkit-flex;display:-ms-flexbox;display:flex}.tabs li[data-v-a22114b6]{-webkit-flex:1;-ms-flex:1;flex:1;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:1.70667rem;padding-bottom:.13333rem;padding-top:.06667rem;list-style:none;position:relative}.tabs li.active[data-v-a22114b6]{color:#ff5000}.tabs li.active[data-v-a22114b6]:before{content:\"\";position:absolute;left:17.5%;bottom:0;width:65%;height:.05333rem;background-color:#ff5000}.tabs .icon[data-v-a22114b6]{width:.98667rem;height:.98667rem;background-size:100%;background-repeat:no-repeat}.tabs .icon.unsolved[data-v-a22114b6]{background-image:url(" + __webpack_require__(356) + ")}.tabs .icon.unsolved.active[data-v-a22114b6]{background-image:url(" + __webpack_require__(352) + ")}.tabs .icon.untransported[data-v-a22114b6]{background-image:url(" + __webpack_require__(357) + ")}.tabs .icon.untransported.active[data-v-a22114b6]{background-image:url(" + __webpack_require__(353) + ")}.tabs .icon.solved[data-v-a22114b6]{background-image:url(" + __webpack_require__(355) + ")}.tabs .icon.solved.active[data-v-a22114b6]{background-image:url(" + __webpack_require__(351) + ")}.tabs .icon.expired[data-v-a22114b6]{background-image:url(" + __webpack_require__(354) + ")}.tabs .icon.expired.active[data-v-a22114b6]{background-image:url(" + __webpack_require__(350) + ")}.tabs h6[data-v-a22114b6]{margin-top:-.13333rem}.tabs .badage[data-v-a22114b6]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:.48rem;height:.48rem;position:absolute;right:.66667rem;top:.13333rem;color:#ff5000;border-radius:50%;text-align:center;box-sizing:content-box;border:.04rem solid #ff5000;background-color:#fff;font-size:.32rem;-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8);z-index:1}.v-order-footer[data-v-a22114b6]{padding:0 .4rem;margin-bottom:.26667rem;line-height:.88rem;border-top:1px solid #f2f3f4;border-bottom:1px solid #d3d4d6;color:#ff5000;background-color:#fff;text-align:justify}", ""]);

// exports


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(224);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a22114b6&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orderList.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a22114b6&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./orderList.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(389);

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/activeExpiredOrder.934d60edf4a2d9e9098f55494192186a.png";

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/activeSolvedOrder.6c88d05d8c3e677e3d5d9ce3994f96c5.png";

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/activeUnsolvedOrder.ccb18df1c63f71177c3f5bb265852ce4.png";

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/activeUntransportedOrder.6ab178454eaf74de6205499374964154.png";

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/expiredOrder.9d3a75d58af8a35edc76a6af703d6ece.png";

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/solvedOrder.137b3c4ddce7180408acda5fcc6b6c88.png";

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/unsolvedOrder.0f3b1feddb28bc2eef66bf3554f7ede0.png";

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/untransportedOrder.ac621d1811703c0c2b6329c24b1201e2.png";

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(262)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(423),
  /* scopeId */
  "data-v-a22114b6",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/orderList/orderList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a22114b6", Component.options)
  } else {
    hotAPI.reload("data-v-a22114b6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order-list"
  }, [_c('div', {
    staticClass: "order-list-content"
  }, [_c('ul', {
    staticClass: "tabs"
  }, _vm._l((_vm.tabs), function(tab, $index) {
    return _c('li', {
      class: {
        active: $index + 1 == _vm.current_tab
      },
      on: {
        "click": function($event) {
          _vm.switchTab($index + 1)
        }
      }
    }, [_c('div', {
      class: ["icon", tab.type, {
        active: $index + 1 == _vm.current_tab
      }]
    }), _vm._v(" "), _c('h6', [_vm._v(_vm._s(tab.name))]), _vm._v(" "), ($index == 0 && _vm.user.unfinished_order_count > 0) ? _c('span', {
      staticClass: "badage"
    }, [_vm._v(_vm._s(_vm.user.unfinished_order_count))]) : _vm._e()])
  })), _vm._v(" "), _c('ul', {
    staticClass: "list"
  }, _vm._l((_vm.order_list[_vm.current_type]), function(order, $index) {
    return _c('router-link', {
      attrs: {
        "to": {
          name: "order_detail",
          query: {
            order_id: parseInt(order.id)
          }
        },
        "tag": "li"
      }
    }, [_c('v-order', {
      attrs: {
        "img": order.product_pic,
        "id": order.orderid,
        "integral": order.integral >> 0,
        "name": order.product,
        "active": true
      }
    }, [_c('h6', {
      staticClass: "v-order-footer"
    }, [_vm._v("\n                        " + _vm._s(order.tips) + "\n                    ")])])], 1)
  }))]), _vm._v(" "), _c('v-support', {
    attrs: {
      "busy": _vm.busy
    }
  }), _vm._v(" "), _c('v-back-top')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a22114b6", module.exports)
  }
}

/***/ })

});