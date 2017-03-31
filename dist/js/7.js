webpackJsonp([7],{

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

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(utils, APP) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vListItem_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_vListItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_vListItem_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'subjectDetail',
    components: {
        vListItem: __WEBPACK_IMPORTED_MODULE_0_components_vListItem_vue___default.a
    },
    data: function data() {
        return {
            subject_id: '',
            subject_detail: {
                class_items: []
            },
            current_tab: '全部',
            content_show: false
        };
    },

    computed: {
        tabs: function tabs() {
            return this.subject_detail.class_items;
        },
        tabs_show: function tabs_show() {
            return this.subject_detail.class_items.length > 1;
        }
    },
    watch: {
        subject_id: function subject_id(value) {
            var _this = this;

            //bug 路由进入时值为number 路由返回/路由原地刷新时值类型为string
            //类型变化也会引发该函数
            this.content_show = false;
            this.getSubjectDetail().then(function () {
                _this.content_show = true;
            });
        }
    },
    activated: function activated() {
        this.subject_id = this.$route.query.subject_id;
        //保持滚动位置
        var position = utils.getSessionStorage('position:' + this.$route.name);
        if (position) {
            window.scrollTo(0, position);
        }
    },

    //路由至详情内tab状态不重置 
    //返回至主页时tab状态重置
    beforeRouteLeave: function beforeRouteLeave(to, from, next) {
        if (to.name == 'index') {
            this.current_tab = '全部';
        }
        next();
    },

    methods: {
        getSubjectDetail: function getSubjectDetail() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.$store.dispatch('toggleLoading');
                _this2.$http.post(APP.HOST + '/subject_detail/' + _this2.subject_id, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then(function (response) {
                    _this2.$store.dispatch('toggleLoading');
                    var data = response.data;
                    _this2.subject_detail = data.data;
                    if (resolve) {
                        resolve();
                    }
                }, function (response) {
                    _this2.$store.dispatch('toggleLoading');
                });
            });
        },
        switchTab: function switchTab(name) {
            this.current_tab = name;
        },
        getRouter: function getRouter(item) {
            if (item.type == 1) {
                return {
                    name: "product_detail",
                    query: {
                        product_id: item.item_id,
                        integral: item.integral >> 0,
                        product_name: item.name
                    }
                };
            }
            if (item.type == 2) {
                return {
                    name: "activity_detail",
                    query: {
                        activity_id: item.item_id
                    }
                };
            }
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8), __webpack_require__(4)))

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".subject-detail[data-v-27b05f87]{padding-bottom:.26667rem}header[data-v-27b05f87]{width:10rem;height:4rem;background-color:#f2f3f4}li[data-v-27b05f87],ul[data-v-27b05f87]{list-style:none}.tabs[data-v-27b05f87]{border-bottom:1px solid #d3d4d6;margin-bottom:.26667rem}.tabs[data-v-27b05f87],.tabs li[data-v-27b05f87]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.tabs li[data-v-27b05f87]{-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex:1;-ms-flex:1;flex:1;position:relative;height:1.06667rem;background-color:#fff;font-size:.4rem;color:#a9aaae}.tabs li.active[data-v-27b05f87]{color:#ff5000}.tabs li.active[data-v-27b05f87]:after{content:\"\";position:absolute;bottom:0;left:50%;width:65%;height:.06667rem;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);background-color:#ff5000}", ""]);

// exports


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(203);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27b05f87&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./subjectDetail.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27b05f87&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./subjectDetail.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(394);

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(241)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(402),
  /* scopeId */
  "data-v-27b05f87",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/subjectDetail/subjectDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] subjectDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27b05f87", Component.options)
  } else {
    hotAPI.reload("data-v-27b05f87", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.content_show),
      expression: "content_show"
    }],
    staticClass: "subject-detail"
  }, [_c('header', [_c('img', {
    staticClass: "img-responsive",
    attrs: {
      "src": _vm.subject_detail.pic
    }
  })]), _vm._v(" "), _c('main', [(_vm.tabs_show) ? _c('ul', {
    staticClass: "tabs"
  }, [_c('li', {
    class: {
      active: _vm.current_tab == "全部"
    },
    on: {
      "click": function($event) {
        _vm.switchTab("全部")
      }
    }
  }, [_vm._v("全部")]), _vm._v(" "), _vm._l((_vm.tabs), function(tab) {
    return _c('li', {
      class: {
        active: _vm.current_tab == tab.name
      },
      on: {
        "click": function($event) {
          _vm.switchTab(tab.name)
        }
      }
    }, [_vm._v("\n                " + _vm._s(tab.name) + "\n            ")])
  })], 2) : _vm._e(), _vm._v(" "), _vm._l((_vm.tabs), function(tab) {
    return _c('ul', _vm._l((tab.items), function(item, $index) {
      return _c('router-link', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (_vm.current_tab == "全部" || _vm.current_tab == tab.name),
          expression: "current_tab==\"全部\"||current_tab==tab.name"
        }],
        attrs: {
          "to": _vm.getRouter(item),
          "tag": "li"
        }
      }, [_c('v-list-item', {
        attrs: {
          "title": item.name,
          "title-dupty": item.sub_name,
          "integral": item.integral >> 0,
          "img": item.pic,
          "no-border": $index == tab.items.length - 1
        }
      })], 1)
    }))
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-27b05f87", module.exports)
  }
}

/***/ })

});