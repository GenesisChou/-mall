webpackJsonp([6],{

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)();
// imports


// module
exports.push([module.i, ".load-more[data-v-409b263f]{height:1.2rem}.search-box[data-v-409b263f]{padding:.22667rem .4rem;position:fixed}.fill[data-v-409b263f]{height:1.33333rem}.sort[data-v-409b263f]{border-top:1px solid #c8c8c8;border-bottom:1px solid #c8c8c8;height:1.4rem}.arrows[data-v-409b263f]{line-height:.24rem;font-size:.24rem;margin-left:.13333rem}", ""]);

// exports


/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(40)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-409b263f&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./product_list.vue", function() {
			var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-409b263f&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./product_list.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_libs_utils_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_v_search_vue__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_v_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_v_search_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_v_list_item_vue__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_v_list_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_components_v_list_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_v_back_top_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_v_back_top_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_components_v_back_top_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_v_spinner_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_v_spinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_components_v_spinner_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ exports["default"] = {

    name: 'product_list',
    components: {
        vListItem: __WEBPACK_IMPORTED_MODULE_2_components_v_list_item_vue___default.a,
        vSearch: __WEBPACK_IMPORTED_MODULE_1_components_v_search_vue___default.a,
        vBackTop: __WEBPACK_IMPORTED_MODULE_3_components_v_back_top_vue___default.a,
        vSpinner: __WEBPACK_IMPORTED_MODULE_4_components_v_spinner_vue___default.a
    },
    data: function data() {
        return {
            product_list: '',
            params: {
                sword: '',
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                _order: ''
            },
            sort_type: ''
        };
    },
    mounted: function mounted() {
        this.getProductList();
        __WEBPACK_IMPORTED_MODULE_0_libs_utils_js__["a" /* default */].getScrollData(this.product_list, this.params, this.getProductList);
    },

    methods: {
        //获取商品列表
        getProductList: function getProductList(callback) {
            var _this = this;

            this.searchProduct(this.params, function (data) {
                if (callback) {
                    callback();
                }
                var product_list = _this.product_list;
                if (_this.params.p <= 1) {
                    _this.params.total = data.data.total;
                    _this.params.count = data.data.count;
                }
                _this.product_list = data.data.list.concat(product_list);
            });
        },

        //搜索商品
        searchProduct: function searchProduct() {
            var _this2 = this;

            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params;
            var callback = arguments[1];

            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(APP.HOST + '/all_product', params).then(function (response) {
                var data = response.data;
                _this2.$store.dispatch('toggleLoading');
                if (callback) {
                    callback(data);
                } else {
                    _this2.product_list = data.data.list;
                }
            }, function (response) {
                _this2.$store.dispatch('toggleLoading');
            });
        },

        //初始化参数
        initParams: function initParams() {
            var temp = this.params.sword;
            this.params = {
                sword: temp,
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                _order: ''
            };
        },

        //消耗积分排序
        sortByIntegral: function sortByIntegral() {
            var _this3 = this;

            this.initParams();
            if (this.sort_type == 'integral-up') {
                this.sort_type = 'integral-down';
                this.params._order = 'integral:DESC';
            } else {
                this.sort_type = 'integral-up';
                this.params._order = 'integral:ASC';
            }

            this.getProductList(function () {
                _this3.product_list = [];
            });
        },

        //兑换量优先
        sortByCount: function sortByCount() {
            var _this4 = this;

            this.initParams();
            this.params._order = 'used_count:DESC';
            if (this.sort_type != 'count') {

                this.sort_type = 'count';
                this.getProductList(function () {
                    _this4.product_list = [];
                });
            }
        }
    }
};

/***/ },

/***/ 180:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "product-list"
  }, [_vm._h('div', {
    staticClass: "search-box bg-base"
  }, [_vm._h('v-search', {
    attrs: {
      "search": _vm.searchProduct,
      "params": _vm.params
    }
  })]), " ", _vm._m(0), " ", _vm._h('div', {
    staticClass: "sort flex"
  }, [_vm._h('div', {
    staticClass: "flex-item text-huge flex flex-center-h flex-center-v",
    on: {
      "click": _vm.sortByIntegral
    }
  }, [_vm._h('span', {
    class: [_vm.sort_type != "count" && _vm.sort_type ? "text-red" : ""]
  }, ["消耗积分排序"]), " ", _vm._h('div', {
    staticClass: "arrows flex flex-column "
  }, [_vm._h('i', {
    class: ["icon-arrows-up", "iconfont", "text-bold", _vm.sort_type == "integral-up" ? "text-red" : ""]
  }), " ", _vm._h('i', {
    class: ["icon-arrows-down", "iconfont", "text-bold", _vm.sort_type == "integral-down" ? "text-red" : ""]
  })])]), " ", _vm._h('div', {
    class: ["flex-item", "text-huge", "flex", "flex-center-h", "flex-center-v", _vm.sort_type == "count" ? "text-red" : ""],
    on: {
      "click": _vm.sortByCount
    }
  }, ["\n            兑换量优先\n        "])]), " ", _vm._l((_vm.product_list), function(product) {
    return _vm._h('router-link', {
      attrs: {
        "to": {
          name: "product_detail",
          query: {
            product_id: product.id
          }
        }
      }
    }, [_vm._h('v-list-item', {
      attrs: {
        "title": product.name,
        "title-dupty": parseInt(product.integral) + "积分",
        "img": product.pic_thumb,
        "color": "text-red"
      }
    })])
  }), " ", _vm._h('v-back-top')])
},staticRenderFns: [function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "fill"
  })
}]}

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(125)

/* script */
__vue_exports__ = __webpack_require__(157)

/* template */
var __vue_template__ = __webpack_require__(180)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-409b263f"

module.exports = __vue_exports__


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)();
// imports


// module
exports.push([module.i, ".v-list-item[data-v-4e3430e2]{height:2.93333rem;border-bottom:1px solid #c8c8c8}.v-list-item .img[data-v-4e3430e2]{width:2.4rem;height:1.86667rem;margin:0 .66667rem 0 .74667rem}.v-list-item .describe .text-huge[data-v-4e3430e2]{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:.13333rem}", ""]);

// exports


/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)();
// imports


// module
exports.push([module.i, ".v-back-top[data-v-e187f5c2]{position:fixed;right:.66667rem;bottom:.66667rem;width:.93333rem;height:.93333rem;border-radius:50%;border:2px solid #f06870;-webkit-transition:opacity .3s linear;transition:opacity .3s linear;box-shadow:.06667rem .06667rem .06667rem #c8c8c8}", ""]);

// exports


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(50);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(40)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-4e3430e2&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_list_item.vue", function() {
			var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-4e3430e2&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_list_item.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(40)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-e187f5c2&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_back_top.vue", function() {
			var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-e187f5c2&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_back_top.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_libs_utils__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ exports["default"] = {
    name: 'back_top',
    data: function data() {
        return {
            show: false
        };
    },

    methods: {
        backTop: function backTop() {
            var height = __WEBPACK_IMPORTED_MODULE_0_libs_utils__["a" /* default */].getScrollTop();
            var timer = window.setInterval(function () {
                if (height >= 0) {
                    height -= 150;
                    window.scrollTo(0, height);
                } else {
                    window.clearInterval(timer);
                }
            }, 10);
        }
    },
    created: function created() {
        var _this = this;

        window.addEventListener('scroll', function () {
            _this.show = __WEBPACK_IMPORTED_MODULE_0_libs_utils__["a" /* default */].getScrollTop() > 1000 ? true : false;
        });
    }
};

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {

    name: 'v-list-item',
    props: {
        title: {
            type: String,
            default: ''
        },
        titleDupty: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'text-gray'
        },
        img: {
            type: String,
            default: ''
        }
    }
};

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(58)

/* script */
__vue_exports__ = __webpack_require__(59)

/* template */
var __vue_template__ = __webpack_require__(73)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-e187f5c2"

module.exports = __vue_exports__


/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(56)

/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(71)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4e3430e2"

module.exports = __vue_exports__


/***/ },

/***/ 71:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "v-list-item flex flex-center-v  bg-white"
  }, [_vm._h('img', {
    staticClass: "img",
    attrs: {
      "src": _vm.img
    }
  }), " ", _vm._h('div', {
    staticClass: "describe flex-item"
  }, [_vm._h('div', {
    staticClass: "text-huge "
  }, [_vm._s(_vm.title)]), " ", _vm._h('p', {
    class: _vm.color
  }, [_vm._s(_vm.titleDupty)])])])
},staticRenderFns: []}

/***/ },

/***/ 73:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_vm._h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "flex flex-center-h flex-center-v v-back-top bg-white text-huge bg-red text-white",
    on: {
      "click": _vm.backTop
    }
  }, [_vm._h('i', {
    staticClass: " icon-arrows-up iconfont text-small"
  })])])
},staticRenderFns: []}

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(39)();
// imports


// module
exports.push([module.i, ".v-search[data-v-4e1eadca]{width:9.2rem;height:.88rem;border-radius:.06667rem}.v-search input[data-v-4e1eadca]{flex:1;border:0;padding:0 .36rem}.v-search input[type=search][data-v-4e1eadca]::-webkit-search-cancel-button{display:none}.v-search .iconfont[data-v-4e1eadca]{font-size:130%;padding-right:.58667rem}", ""]);

// exports


/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(40)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-4e1eadca&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_search.vue", function() {
			var newContent = require("!!./../../node_modules/.0.25.0@css-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/style-rewriter.js?id=data-v-4e1eadca&scoped=true!./../../node_modules/.4.0.2@sass-loader/index.js!./../../node_modules/.9.9.3@vue-loader/lib/selector.js?type=styles&index=0!./v_search.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["default"] = {
    name: 'search',
    props: {
        placeholder: {
            type: String,
            default: '请输入关键字进行过滤'
        },
        search: Function,
        params: Object
    }
};

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(78)

/* script */
__vue_exports__ = __webpack_require__(82)

/* template */
var __vue_template__ = __webpack_require__(87)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-4e1eadca"

module.exports = __vue_exports__


/***/ },

/***/ 87:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('form', {
    staticClass: "v-search flex flex-center-v bg-white",
    on: {
      "submit": function($event) {
        $event.preventDefault();
      }
    }
  }, [_vm._h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.params.sword),
      expression: "params.sword"
    }],
    staticClass: "text-sliver text-large",
    attrs: {
      "type": "search",
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm._s(_vm.params.sword)
    },
    on: {
      "keyup": function($event) {
        if ($event.keyCode !== 13) { return; }
        _vm.search()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.params.sword = $event.target.value
      }
    }
  }), " ", _vm._h('i', {
    staticClass: "iconfont icon-search text-sliver text-large",
    on: {
      "click": function($event) {
        _vm.search()
      }
    }
  })])
},staticRenderFns: []}

/***/ }

});