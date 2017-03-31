webpackJsonp([5],{

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

/***/ 117:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'vListItem',
    props: {
        img: String,
        title: String,
        titleDupty: String,
        integral: Number,
        noBorder: {
            type: Boolean,
            default: false
        }
    }
});

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-list-item[data-v-7e57ffc1]{padding:0 .4rem;background-color:#fff}.v-list-item[data-v-7e57ffc1]:active{background-color:#fafafa}.container[data-v-7e57ffc1]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:2.77333rem;border-bottom:1px solid #f2f3f4}.container .img[data-v-7e57ffc1]{width:3.32rem;height:2.25333rem;margin-left:.13333rem;margin-right:.8rem}.container .describe[data-v-7e57ffc1]{-webkit-flex:1;-ms-flex:1;flex:1;text-align:justify}.container h2[data-v-7e57ffc1]{height:.61333rem;line-height:.61333rem}.container h6[data-v-7e57ffc1]{height:.53333rem;line-height:.53333rem;color:#babbbe}.container .integral[data-v-7e57ffc1]{padding-top:.13333rem;color:#ff5000}.container.no-border[data-v-7e57ffc1]{border-bottom:none}", ""]);

// exports


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e57ffc1&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vListItem.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e57ffc1&scoped=true!../../node_modules/sass-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vListItem.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(124)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(131),
  /* scopeId */
  "data-v-7e57ffc1",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/components/vListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e57ffc1", Component.options)
  } else {
    hotAPI.reload("data-v-7e57ffc1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-list-item"
  }, [_c('div', {
    class: ["container", {
      "no-border": _vm.noBorder
    }]
  }, [_c('img', {
    staticClass: "img",
    attrs: {
      "src": _vm.img
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "describe"
  }, [_c('h2', {
    staticClass: "text-ellipsis"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('h6', {
    staticClass: "text-ellipsis"
  }, [_vm._v(_vm._s(_vm.titleDupty))]), _vm._v(" "), _c('h3', {
    staticClass: "integral"
  }, [_vm._v(_vm._s(_vm.integral) + "积分")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e57ffc1", module.exports)
  }
}

/***/ }),

/***/ 172:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'search',
    props: {
        search: Function,
        value: String
    },
    methods: {
        updateValue: function updateValue(state) {
            this.$emit('input', event.target.value);
        },
        clear: function clear() {
            this.$emit('input', '');
        }
    }
});

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(APP, utils) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_vSearch_vue__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_vSearch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_vSearch_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_vBackTop__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_vBackTop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_vBackTop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_vListItem_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_vListItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_components_vListItem_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'productList',
    components: {
        vSearch: __WEBPACK_IMPORTED_MODULE_0__components_vSearch_vue___default.a,
        vBackTop: __WEBPACK_IMPORTED_MODULE_1_components_vBackTop___default.a,
        vListItem: __WEBPACK_IMPORTED_MODULE_2_components_vListItem_vue___default.a
    },
    data: function data() {
        return {
            product_list: [],
            params: {
                sword: '',
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id: APP.MEDIA_ID,
                _order: ''

            },
            sort_type: '',
            scroll_event: ''
        };
    },

    computed: {
        busy: function busy() {
            return this.params.total > this.params.p;
        }
    },
    activated: function activated() {
        var position = utils.getSessionStorage('position:' + this.$route.name);
        if (position) {
            window.scrollTo(0, position);
        }
        window.addEventListener('scroll', this.scroll_event);
    },
    created: function created() {
        var _this = this;

        this.$store.dispatch('toggleLoading');
        this.getProductList().then(function () {
            _this.$store.dispatch('toggleLoading');
        }).catch(function () {
            _this.$store.dispatch('toggleLoading');
        });
        this.scroll_event = this.getScrollEvent();
    },
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.scroll_event);
        next();
    },

    methods: {
        //获取商品列表
        getProductList: function getProductList() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.$http.post(APP.HOST + '/all_product', _this2.params).then(function (response) {
                    var data = response.data;
                    if (resolve) {
                        resolve(data);
                    }
                    _this2.params.total = data.data.total;
                    _this2.product_list = _this2.product_list.concat(data.data.list);
                }, function (response) {
                    if (reject) {
                        reject();
                    }
                });
            });
        },

        //搜索商品
        searchProduct: function searchProduct() {
            var _this3 = this;

            this.$store.dispatch('toggleLoading');
            this.sort_type = '';
            this.initParams();
            this.getProductList().then(function (data) {
                _this3.$store.dispatch('toggleLoading');
                _this3.loading = true;
                _this3.params.total = data.data.total;
                _this3.product_list = data.data.list;
            }).catch(function () {
                _this3.$store.dispatch('toggleLoading');
            });
        },

        //初始化参数
        initParams: function initParams() {
            this.params.p = 1;
            this.params.r = APP.PERPAGE;
            this.params.token = APP.TOKEN;
            this.params.userid = APP.USER_ID;
            this.params.media_id = APP.MEDIA_ID;
            this.params._order = '';
        },

        //消耗积分排序
        sortByIntegral: function sortByIntegral() {
            var _this4 = this;

            this.initParams();
            if (this.sort_type === 'integral-up') {
                this.sort_type = 'integral-down';
                this.params._order = 'integral:DESC';
            } else {
                this.sort_type = 'integral-up';
                this.params._order = 'integral:ASC';
            }
            this.$store.dispatch('toggleLoading');
            this.getProductList().then(function (data) {
                _this4.product_list = [];
                _this4.product_list = _this4.product_list.concat(data.data.list);
                _this4.$store.dispatch('toggleLoading');
            }).catch(function () {
                _this4.$store.dispatch('toggleLoading');
            });
        },

        //兑换量优先
        sortByCount: function sortByCount() {
            var _this5 = this;

            this.initParams();
            this.params._order = 'used_count:DESC';
            this.$store.dispatch('toggleLoading');
            if (this.sort_type !== 'count') {
                this.sort_type = 'count';
                this.getProductList().then(function (data) {
                    _this5.product_list = [];
                    _this5.product_list = _this5.product_list.concat(data.data.list);
                    _this5.$store.dispatch('toggleLoading');
                }).catch(function () {
                    _this5.$store.dispatch('toggleLoading');
                });
            } else {
                this.$store.dispatch('toggleLoading');
            }
        },
        getScrollEvent: function getScrollEvent() {
            var _this6 = this;

            var scroll = true;
            return utils.debounce(function () {
                if (scroll && _this6.busy && utils.touchBottom()) {
                    scroll = false;
                    _this6.params.p++;
                    _this6.getProductList().then(function () {
                        scroll = true;
                    });
                }
            }, 500, 500);
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4), __webpack_require__(8)))

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".product-list[data-v-1e8dcfb2]{overflow:hidden;_zoom:1;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;background-color:#f2f3f4}.product-list-content[data-v-1e8dcfb2]{-webkit-flex:1;-ms-flex:1;flex:1}li[data-v-1e8dcfb2],ul[data-v-1e8dcfb2]{list-style:none}.sort[data-v-1e8dcfb2]{margin:1.49333rem 0 .26667rem;border-bottom:1px solid #d3d4d6;background-color:#fff;color:#babbbe}.sort>div[data-v-1e8dcfb2],.sort[data-v-1e8dcfb2]{display:-webkit-flex;display:-ms-flexbox;display:flex}.sort>div[data-v-1e8dcfb2]{-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex:1;-ms-flex:1;flex:1;height:1.09333rem;font-size:.4rem}.sort>div[data-v-1e8dcfb2]:first-child{position:relative}.sort .active[data-v-1e8dcfb2]{color:#ff5000}.sort .iconfont[data-v-1e8dcfb2]{font-weight:700}.arrows[data-v-1e8dcfb2]{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);line-height:.24rem;right:.93333rem}.arrows .down[data-v-1e8dcfb2],.arrows .up[data-v-1e8dcfb2]{width:0;height:0;border:.12rem solid #a9aaae}.arrows .up[data-v-1e8dcfb2]{border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;margin-bottom:.08rem}.arrows .up.active[data-v-1e8dcfb2]{border-bottom-color:#ff5000}.arrows .down[data-v-1e8dcfb2]{border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.arrows .down.active[data-v-1e8dcfb2]{border-top-color:#ff5000}.list li[data-v-1e8dcfb2]:last-child{margin-bottom:.26667rem}", ""]);

// exports


/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".v-search[data-v-4faf4fbb]{position:fixed;width:10rem;padding:.26667rem .53333rem;background-color:#f2f3f4;box-shadow:0 0 .13333rem rgba(0,0,0,.2);z-index:1}.v-search .search-box[data-v-4faf4fbb]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:.96rem;border-radius:.26667rem;background-color:#fff}.v-search .iconfont[data-v-4faf4fbb]{text-align:center;width:.8rem;font-size:.48rem;color:#bababa}.v-search input[data-v-4faf4fbb]{-webkit-flex:1;-ms-flex:1;flex:1;width:8.13333rem;border:0;font-size:.37333rem;color:#ff5000;text-shadow:0 0 0 #bababa;-webkit-text-fill-color:transparent}.v-search [data-v-4faf4fbb]::-webkit-input-placeholder{color:#bababa}.v-search input[type=search][data-v-4faf4fbb]::-webkit-search-cancel-button{display:none}.v-search span[data-v-4faf4fbb]{font-size:.42667rem}", ""]);

// exports


/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1e8dcfb2&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productList.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1e8dcfb2&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productList.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4faf4fbb&scoped=true!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vSearch.vue", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4faf4fbb&scoped=true!../../../../node_modules/sass-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vSearch.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(393);

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(254)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(415),
  /* scopeId */
  "data-v-4faf4fbb",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/productList/components/vSearch.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] vSearch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4faf4fbb", Component.options)
  } else {
    hotAPI.reload("data-v-4faf4fbb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(238)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(399),
  /* scopeId */
  "data-v-1e8dcfb2",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/productList/productList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] productList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e8dcfb2", Component.options)
  } else {
    hotAPI.reload("data-v-1e8dcfb2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "product-list"
  }, [_c('div', {
    staticClass: "product-list-content"
  }, [_c('v-search', {
    attrs: {
      "search": _vm.searchProduct
    },
    model: {
      value: (_vm.params.sword),
      callback: function($$v) {
        _vm.params.sword = $$v
      },
      expression: "params.sword"
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "sort"
  }, [_c('div', {
    on: {
      "click": _vm.sortByIntegral
    }
  }, [_c('span', {
    class: [_vm.sort_type != "count" && _vm.sort_type ? "active" : ""]
  }, [_vm._v("消耗积分排序")]), _vm._v(" "), _c('div', {
    staticClass: "arrows"
  }, [_c('div', {
    class: ["up", {
      active: _vm.sort_type == "integral-up"
    }]
  }), _vm._v(" "), _c('div', {
    class: ["down", {
      active: _vm.sort_type == "integral-down"
    }]
  })])]), _vm._v(" "), _c('div', {
    class: [_vm.sort_type == "count" ? "active" : ""],
    on: {
      "click": _vm.sortByCount
    }
  }, [_vm._v("\n                兑换量优先\n            ")])]), _vm._v(" "), _c('ul', {
    staticClass: "list"
  }, _vm._l((_vm.product_list), function(product, $index) {
    return _c('router-link', {
      attrs: {
        "to": {
          name: "product_detail",
          query: {
            product_id: product.id,
            integral: product.integral >> 0
          }
        },
        "tag": "li"
      }
    }, [_c('v-list-item', {
      attrs: {
        "title": product.name,
        "title-dupty": product.name,
        "integral": product.integral >> 0,
        "img": product.pic_thumb,
        "no-border": $index == _vm.product_list.length - 1
      }
    })], 1)
  }))], 1), _vm._v(" "), _c('v-back-top'), _vm._v(" "), _c('v-support', {
    attrs: {
      "busy": _vm.busy
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1e8dcfb2", module.exports)
  }
}

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "v-search"
  }, [_c('form', {
    staticClass: "search-box",
    attrs: {
      "action": "javascript:return true;"
    }
  }, [_c('i', {
    staticClass: "iconfont icon-search ",
    on: {
      "click": _vm.search
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "type": "search",
      "placeholder": "请输入关键字进行过滤"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.updateValue,
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.search($event)
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont icon-close-circle ",
    on: {
      "click": _vm.clear
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4faf4fbb", module.exports)
  }
}

/***/ })

});