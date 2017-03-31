webpackJsonp([9],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(APP, utils) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'myAccount',
    data: function data() {
        return {
            // modal: false,
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id: APP.MEDIA_ID
            },
            integral_list: []
        };
    },

    filters: {
        pointFormat: function pointFormat(point) {
            point = point >> 0;
            return point > 0 ? '+' + point : point;
        }
    },
    computed: {
        user: function user() {
            return this.$store.state.user;
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.getIntegralList();
        var list = this.$refs.list;
        var scroll = true;
        list.addEventListener('scroll', utils.debounce(function () {
            if (scroll && _this.params.p < _this.params.total && list.clientHeight + list.scrollTop >= list.scrollHeight - 100) {
                scroll = false;
                _this.params.p++;
                _this.getIntegralList().then(function () {
                    scroll = true;
                });
            }
        }, 500, 500));
    },

    methods: {
        // toggleModal() {
        //     this.modal = !this.modal;
        // },
        //——获取积分明细列表
        getIntegralList: function getIntegralList() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.$http.post(APP.HOST + '/integral_list/' + APP.USER_ID, _this2.params).then(function (response) {
                    var data = response.data;
                    _this2.integral_list = _this2.integral_list.concat(data.data.list);
                    _this2.params.total = data.data.total;
                    if (resolve) {
                        resolve();
                    }
                }, function (response) {});
            });
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4), __webpack_require__(8)))

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".header[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;height:5.30667rem;background-color:#fff;background-image:url(" + __webpack_require__(343) + ");background-repeat:no-repeat;background-size:100%;color:#fff;text-align:center}.header .avater[data-v-7e21b60f]{background-color:#f4f4f4;border-radius:50%;width:1.78667rem;height:1.78667rem;margin-bottom:.13333rem;overflow:hidden;border:.08rem solid #f4f4f4}.header .edit-user[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:2.89333rem;height:.88rem;margin-top:.26667rem;color:#fff;background-color:hsla(0,0%,100%,.35);border-radius:.44rem;border:1px solid #fff}.header .edit-user[data-v-7e21b60f]:active{opacity:.9}.block-text[data-v-7e21b60f]{line-height:1.17333rem;text-align:center;background-color:#fff;color:#ff5000;border-bottom:1px solid #d4d4d6}.record-list[data-v-7e21b60f]{position:absolute;top:6.77333rem;left:0;right:0;bottom:1.46667rem;z-index:1;padding:0 .4rem;border-bottom:1px solid #d4d4d6;overflow:scroll;-webkit-overflow-scrolling:touch;background-color:#fff}.record-list[data-v-7e21b60f]::-webkit-scrollbar{display:none}.record-list li[data-v-7e21b60f]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;height:1.33333rem;list-style:none}.record-list h3[data-v-7e21b60f]{color:#646565}.record-list h6[data-v-7e21b60f]{color:#a9aaae}.record-list span[data-v-7e21b60f]{font-size:.4rem;color:#646565}.footer[data-v-7e21b60f]{position:absolute;bottom:0;left:0;right:0;background-color:#f2f3f4}", ""]);

// exports


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(382);

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(222);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e21b60f&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./myAccount.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7e21b60f&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./myAccount.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/myAccountBackground.e1b7d928319f33f3e9acd5f10ce9ffb3.png";

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(260)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(421),
  /* scopeId */
  "data-v-7e21b60f",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/myAccount/myAccount.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myAccount.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e21b60f", Component.options)
  } else {
    hotAPI.reload("data-v-7e21b60f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-account "
  }, [_c('header', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "avater"
  }, [_c('img', {
    staticClass: "img-responsive",
    attrs: {
      "src": _vm.user.headimg
    }
  })]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.user.nickname))]), _vm._v(" "), _c('p', [_vm._v("积分: " + _vm._s(_vm.user.integral >> 0))]), _vm._v(" "), _c('router-link', {
    staticClass: "edit-user",
    attrs: {
      "to": {
        name: "edit_user"
      },
      "tag": "div"
    }
  }, [(_vm.user.is_submit == 1) ? [_vm._v("修改资料")] : [_vm._v("完善资料赚积分")]], 2)], 1), _vm._v(" "), _c('h4', {
    staticClass: "block-text"
  }, [_vm._v("\n        积分明细\n    ")]), _vm._v(" "), _c('main', [_c('ul', {
    ref: "list",
    staticClass: "record-list"
  }, _vm._l((_vm.integral_list), function(item) {
    return _c('li', [_c('div', {
      staticClass: "pull-left"
    }, [_c('h3', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('h6', [_vm._v(" " + _vm._s(item.create_time) + " ")])]), _vm._v(" "), _c('span', {
      staticClass: "pull-right"
    }, [_vm._v(_vm._s(_vm._f("pointFormat")(item.point)) + " ")])])
  }))]), _vm._v(" "), _c('footer', {
    staticClass: "footer"
  }, [_c('v-support')], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e21b60f", module.exports)
  }
}

/***/ })

});