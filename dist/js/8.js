webpackJsonp([8],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(APP) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'earnIntegral',
    data: function data() {
        return {
            check_in_params: [],
            loaded: false,
            checked: true,
            submit_param: {
                integral: 0
            },
            //
            read_param: {
                integral: 0,
                day_limit: 0,
                today: 0
            },
            frame_link: 'http://www.baidu.com',
            article_list: [],
            back_show: false,
            frame_show: false
        };
    },

    computed: {
        user: function user() {
            return this.$store.state.user;
        },
        integral: function integral() {
            if (this.check_in_params.length === 0) return 0;
            if (!this.user.ischecked) {
                return this.check_in_params[1]['integral'].substring(1);
            }
            return this.check_in_params[2]['integral'].substring(1);
        }
    },
    activated: function activated() {
        this.back_show = this.$route.query.back_show || false;
        this.getArticleList();
        this.getReadParam();
    },
    created: function created() {
        this.getCheckInParams();
        this.getSubmitParam();
    },
    deactivated: function deactivated() {
        this.back_show = false;
        this.frame_show = false;
    },

    methods: {
        //签到
        checkIn: function checkIn() {
            var _this = this;

            if (!this.user.ischecked) {
                this.$store.dispatch('toggleLoading');
                this.$http.post(APP.HOST + '/checkin/' + APP.USER_ID, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then(function (response) {
                    var data = response.data;
                    _this.$store.dispatch('toggleLoading');
                    if (data.status === APP.SUCCESS) {
                        _this.$store.dispatch('getUserInfor');
                    } else {
                        _this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    }
                }, function (response) {
                    _this.$store.dispatch('toggleLoading');
                });
            }
        },

        //获取签到记录
        getCheckInParams: function getCheckInParams() {
            var _this2 = this;

            this.$store.dispatch('toggleLoading');
            this.$http.post(APP.HOST + '/get_checkin_param/' + APP.USER_ID, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                _this2.$store.dispatch('toggleLoading');
                var data = response.data;
                _this2.check_in_params = data.data;
                _this2.loaded = true;
            }, function (response) {
                _this2.$store.dispatch('toggleLoading');
            });
        },

        //获取提交资料积分参数
        getSubmitParam: function getSubmitParam() {
            var _this3 = this;

            this.$http.post(APP.HOST + '/get_submit_param/' + APP.USER_ID, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                var data = response.data;
                _this3.submit_param.integral = data.data.integral;
            });
        },

        //获取阅读文章积分参数
        getReadParam: function getReadParam() {
            var _this4 = this;

            this.$http.post(APP.HOST + '/get_read_param/' + APP.USER_ID, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                var data = response.data;
                _this4.read_param = data.data;
            });
        },

        //获取文章列表
        getArticleList: function getArticleList() {
            var _this5 = this;

            this.$http.post(APP.HOST + '/article_list/' + APP.USER_ID, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                var data = response.data;
                _this5.article_list = data.data;
            });
        },

        //阅读文章
        readArticle: function readArticle(article) {
            var _this6 = this;

            this.frame_link = article.url;
            this.$http.post(APP.HOST + '/read_article/' + article.id, {
                token: APP.TOKEN,
                user_id: APP.USER_ID,
                media_id: APP.MEDIA_ID
            }).then(function (response) {
                _this6.toggleFrame();
                var data = response.data;
                if (data.status === APP.SUCCESS && article.is_read === 2) {
                    _this6.$store.dispatch('getUserInfor');
                }
                // location.href = article.url;
            });
        },
        toggleFrame: function toggleFrame() {
            this.frame_show = !this.frame_show;
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".earn-integral[data-v-1013dc0b]{background-color:#f2f3f4}.head[data-v-1013dc0b]{width:100%;height:10.66667rem;padding-top:.93333rem;position:relative;background-image:url(" + __webpack_require__(332) + ");background-repeat:no-repeat;background-size:10rem 8.26667rem}.head .message[data-v-1013dc0b]{padding-top:.33333rem;text-align:center}.head .message h5[data-v-1013dc0b]{text-shadow:0 .05333rem .05333rem rgba(209,172,0,.68);font-weight:700;color:#fff}.head .message h5 span[data-v-1013dc0b]{color:#ff5000;font-size:.4rem}.head .message h6[data-v-1013dc0b]{color:#9d7035}.back[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;position:absolute;left:.4rem;top:.4rem;width:1.53333rem;height:.66667rem;font-size:.32rem;box-shadow:0 .06667rem .06667rem #d56a10}.rotate[data-v-1013dc0b]{position:relative;width:100%;height:3.12rem}.circle-button[data-v-1013dc0b]{width:3.12rem;height:3.12rem;position:absolute;top:0;left:50%;margin-left:-1.56rem;background-color:hsla(0,0%,100%,.62)}.circle-button .circle[data-v-1013dc0b],.circle-button[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-radius:50%}.circle-button .circle[data-v-1013dc0b]{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:2.58667rem;height:2.58667rem}.circle-button .circle.white[data-v-1013dc0b]{box-shadow:0 .04rem .06667rem rgba(193,63,7,.51);background-color:#fff;color:#ff5000}.circle-button .circle.white h1[data-v-1013dc0b]{font-size:.58667rem;border-bottom:1px solid #ff5000}.circle-button .circle.red[data-v-1013dc0b]{font-size:.76rem;font-weight:500;color:#fff;box-shadow:0 .04rem .06667rem rgba(193,63,7,.75);background-color:#ff5000}.main[data-v-1013dc0b]{background-color:#4dd3d6}.progress[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;width:100%;padding:0 .2rem;bottom:.4rem}.progress .check-item[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex:1;-ms-flex:1;flex:1;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;color:#fff}.progress .check-item.active .circle[data-v-1013dc0b]{background-color:#ff5000}.progress .check-item.active h6[data-v-1013dc0b]{color:#ff5000}.progress .check-item:first-child .circle[data-v-1013dc0b]{color:#a78179;background-color:hsla(0,0%,100%,.4);background-size:100%;background-position:50%;background-repeat:no-repeat;box-shadow:0 .04rem .06667rem #42c0c3,0 -.04rem .04rem hsla(0,0%,100%,.8)}.progress .check-item:first-child h6[data-v-1013dc0b]{color:#a78179}.progress .circle[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:1.2rem;height:1.2rem;margin-bottom:.13333rem;border-radius:50%;background-color:#14bcbf;font-size:.4rem;box-shadow:0 .04rem .04rem #1e9da1;transition:.5s}.progress h6[data-v-1013dc0b]{transition:.5s}.edit-user[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:1.42667rem;padding-left:.46667rem;background-color:#d0eff1;margin-bottom:.26667rem}.edit-user[data-v-1013dc0b]:active{background-color:#a9e2e5}.edit-user img[data-v-1013dc0b]{width:.94667rem;height:.70667rem;margin-right:.26667rem}.edit-user h2[data-v-1013dc0b]{color:#ff5000}.edit-user h6[data-v-1013dc0b]{color:#a78179}.notice[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:1.41333rem;padding-left:.46667rem;font-size:.37333rem}.notice span[data-v-1013dc0b]{color:#ff5000;padding:0 .06667rem;font-size:.42667rem}.article-list[data-v-1013dc0b]{color:#a78179;background-color:#d0eff1;border-top:1px solid #d4d4d6}.article-list li[data-v-1013dc0b],.article-list ul[data-v-1013dc0b]{list-style:none}.article-list li~[data-v-1013dc0b]:active{background-color:#a9e2e5}.article-list .empty[data-v-1013dc0b]{background-color:#4dd3d6;height:5.73333rem;padding-top:1.06667rem;text-align:center;font-size:.37333rem;color:#8d8d8d}.article-list .empty[data-v-1013dc0b]:active{background-color:#4dd3d6}.article[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;position:relative;height:1.46667rem;margin:0 .4rem;border-top:1px solid #d4d4d6}.article .title[data-v-1013dc0b]{width:70%;font-weight:500}.article div[data-v-1013dc0b]{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:1.53333rem;height:.66667rem;border-radius:.13333rem;font-size:.32rem;background-color:#ff5000;color:#fff}.article div.read[data-v-1013dc0b]{background-color:#4dd3d6}.rotate-leave-active[data-v-1013dc0b]{-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:1s cubic-bezier(.5,1,.5,1.3)}.rotate-enter[data-v-1013dc0b],.rotate-leave-active[data-v-1013dc0b]{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}.rotate-enter-active[data-v-1013dc0b]{-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:1s cubic-bezier(.5,1,.5,1.3)}.rotate-enter-to[data-v-1013dc0b]{-webkit-transform:rotateY(1turn);transform:rotateY(1turn)}.footer[data-v-1013dc0b]{background-color:#f2f3f4}.frame[data-v-1013dc0b]{position:fixed;left:0;right:0;top:0;bottom:0;z-index:2}.frame iframe[data-v-1013dc0b]{width:100%;height:100%;overflow:scroll}.frame .back[data-v-1013dc0b]{z-index:3}", ""]);

// exports


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(372);

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(197);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1013dc0b&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./earnIntegral.vue", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize&-autoprefixer!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1013dc0b&scoped=true!../../../node_modules/sass-loader/index.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./earnIntegral.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 331:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/yellowBg.9827748a354d901ee23f7b3ae52356b9.png";

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(235)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(151),
  /* template */
  __webpack_require__(396),
  /* scopeId */
  "data-v-1013dc0b",
  /* cssModules */
  null
)
Component.options.__file = "/Users/genesischou/Documents/integral-mall/src/views/earnIntegral/earnIntegral.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] earnIntegral.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1013dc0b", Component.options)
  } else {
    hotAPI.reload("data-v-1013dc0b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.loaded) ? _c('div', {
    staticClass: "earn-integral"
  }, [(!_vm.frame_show) ? _c('main', {
    staticClass: "main"
  }, [_c('header', {
    staticClass: "head"
  }, [(_vm.back_show) ? _c('router-link', {
    staticClass: "back btn-orange btn",
    attrs: {
      "to": {
        name: "index"
      },
      "tag": "div"
    }
  }, [_vm._v("\n                返回首页\n            ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "rotate"
  }, [_c('transition', {
    attrs: {
      "name": "rotate"
    }
  }, [(_vm.user.ischecked) ? _c('div', {
    staticClass: "circle-button"
  }, [_c('div', {
    staticClass: "circle white"
  }, [_c('h1', [_vm._v("已签到")]), _vm._v(" "), _c('h4', [_vm._v("连续" + _vm._s(_vm.user.checkin_days) + "天")])])]) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "rotate"
    }
  }, [(!_vm.user.ischecked) ? _c('div', {
    staticClass: "circle-button"
  }, [_c('div', {
    staticClass: "circle red",
    on: {
      "click": _vm.checkIn
    }
  }, [_vm._v("\n                            签到\n                        ")])]) : _vm._e()])], 1), _vm._v(" "), _c('div', {
    staticClass: "message"
  }, [_c('h5', [(!_vm.user.ischecked) ? [_vm._v("今日")] : [_vm._v("明日")], _vm._v(" 签到可领取\n                    "), _c('span', [_vm._v(_vm._s(_vm.integral))]), _vm._v(" 积分\n                ")], 2), _vm._v(" "), _c('h6', [_vm._v("连续签到有更多惊喜哦")])]), _vm._v(" "), _c('div', {
    staticClass: "progress"
  }, _vm._l((_vm.check_in_params), function(item, $index) {
    return _c('div', {
      class: ["check-item", {
        active: _vm.user.ischecked && $index == 1
      }]
    }, [_c('div', {
      staticClass: "circle"
    }, [_vm._v(" " + _vm._s(item.integral) + " ")]), _vm._v(" "), _c('h6', [_vm._v(_vm._s(item.day))])])
  }))], 1), _vm._v(" "), (_vm.user.is_submit != 1) ? [_c('router-link', {
    staticClass: "edit-user",
    attrs: {
      "to": {
        name: "edit_user"
      },
      "tag": "div"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(331)
    }
  }), _vm._v(" "), _c('div', [_c('h2', [_vm._v("填写个人资料 ")]), _vm._v(" "), _c('h6', [_vm._v("首次完善个人资料可获得积分")])])])] : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "article-list"
  }, [_c('li', {
    staticClass: "notice"
  }, [_c('p', [_vm._v(" 完成单个任务可获得"), _c('span', [_vm._v(_vm._s(_vm.read_param.integral))]), _vm._v("积分 ")]), _vm._v(" "), _c('p', [_vm._v(" 每日最多可得"), _c('span', [_vm._v(_vm._s(_vm.read_param.day_limit))]), _vm._v("积分,今日已获得"), _c('span', [_vm._v(_vm._s(_vm.read_param.today))]), _vm._v("积分 ")])]), _vm._v(" "), (_vm.article_list.length) ? _vm._l((_vm.article_list), function(article) {
    return _c('li', [_c('div', {
      staticClass: "article",
      on: {
        "click": function($event) {
          _vm.readArticle(article)
        }
      }
    }, [_c('h4', {
      staticClass: "title"
    }, [_vm._v(_vm._s(article.title))]), _vm._v(" "), _c('div', {
      class: {
        read: article.is_read == 1
      }
    }, [_vm._v(_vm._s(article.is_read == 1 ? '已完成' : article.button))])])])
  }) : _c('li', {
    staticClass: "empty"
  }, [_vm._v("\n                现在没有积分任务啦～\n            ")])], 2), _vm._v(" "), _c('footer', {
    staticClass: "footer"
  }, [_c('v-support')], 1)], 2) : _vm._e(), _vm._v(" "), (_vm.frame_show) ? _c('div', {
    staticClass: "frame",
    staticStyle: {
      "overflow": "auto",
      "-webkit-overflow-scrolling": "touch"
    }
  }, [_c('div', {
    staticClass: "back btn btn-orange",
    on: {
      "click": _vm.toggleFrame
    }
  }, [_vm._v("返回")]), _vm._v(" "), _c('iframe', {
    attrs: {
      "src": _vm.frame_link
    }
  })], 1) : _vm._e()]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1013dc0b", module.exports)
  }
}

/***/ })

});