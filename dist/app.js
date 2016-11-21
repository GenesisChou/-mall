webpackJsonp([8],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
    clientWidth: document.documentElement.clientWidth,
    pxTorem: function pxTorem(value) {
        return value * this.clientWidth / 750;
    },

    //获取url指定参数的值
    getParameterByName: function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    //设置标题
    setTitle: function setTitle(title) {
        document.title = title;
    },

    //获取滚动条距顶部高度
    getScrollTop: function getScrollTop() {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        } else if (document.body) {
            return document.body.scrollTop;
        }
        return 0;
    },

    //获取可视区域高度
    getClientHeight: function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    },

    //获取总高度
    getScrollHeight: function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },

    //获取滚动数据
    //list:列别数据 parmas:参数 callback:回调函数
    getScrollData: function getScrollData(list, params, callback) {
        var utils = this;
        if (typeof callback === 'function') {
            window.addEventListener('scroll', function () {
                if (params.p < params.total && list.length < params.count && utils.getScrollTop() + utils.getClientHeight() >= utils.getScrollHeight()) {
                    params.p++;
                    callback();
                }
            });
        }
    },

    // 防抖函数
    debounce: function debounce(func, wait, immediate) {
        var _this = this,
            _arguments = arguments;

        var timeout = void 0;
        return function () {
            var self = _this,
                args = _arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(self, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(self, args);
        };
    }
};

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
"use strict";




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);
var state = {
    // TODO: 放置初始状态
    user: '', //用户信息
    address_list: '', //用户地址列表
    v_alert: {
        type: 'suprise',
        show: false,
        event: 'close',
        msg: '',
        btn_text: '',
        cover_close: true,
        callback: function callback() {}
    },
    v_confirm: {
        show: false,
        msg: '',
        callback: function callback() {}
    },
    v_loading: {
        show: false
    },
    order_list: [],
    order_list_params: {
        p: 1,
        r: 20,
        total: 0,
        count: 0
    }
};

var mutations = {
    //全局
    //显示/关闭弹窗
    toggleAlert: function toggleAlert(state) {
        var alert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        state.v_alert.show = !state.v_alert.show;
        state.v_alert.msg = alert.msg;
        state.v_alert.callback = alert.callback;
        state.v_alert.cover_close = alert.cover_close;
        state.v_alert.btn_text = alert.btn_text;
        state.v_alert.type = alert.type;
    },
    toggleConfirm: function toggleConfirm(state) {
        var confirm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        state.v_confirm.show = confirm.show;
        state.v_confirm.msg = confirm.msg;
        state.v_confirm.callback = confirm.callback;
    },
    toggleLoading: function toggleLoading(state) {
        var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        state.v_loading.show = loading.show;
    },

    //获取用户信息
    getUserInfor: function getUserInfor(state, callback) {
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/get_user/' + APP.USER_ID, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then(function (response) {
            state.user = response.data.data;
            if (callback) {
                callback();
            }
        }, function (response) {});
    },

    //获取地址列表
    getAddressList: function getAddressList(state, callback) {
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/address_list/' + APP.USER_ID, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then(function (response) {
            state.address_list = response.data.data;
            if (callback) {
                callback(response.data.data);
            }
        }, function (response) {});
    },

    //获取订单列表
    getOrderList: function getOrderList(state) {
        var params = state.order_list_params;
        params.token = window.APP.TOKEN;
        params.userid = window.APP.USER_ID;
        store.dispatch('toggleLoading', { show: true });
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/order_list/' + APP.USER_ID, params, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then(function (response) {
            store.dispatch('toggleLoading');
            var data = response.data;
            if (params.p <= 1) {
                params.total = data.data.total;
                params.count = data.data.count;
            }
            state.order_list = state.order_list.concat(data.data.list);
            // if (!this.order_list.length > 0) {
            //     this.empty = true;
            // }
        }, function (response) {
            store.dispatch('toggleLoading');
        });
    },
    pageView: function pageView(state, page_id) {
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/page_view', {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            user_id: APP.USER_ID,
            page_id: page_id
        });
    },
    bannerView: function bannerView(state, banner_id) {
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/banner_view', {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            user_id: APP.USER_ID,
            banner_id: banner_id
        });
    },
    commendView: function commendView(state, commend_id) {
        __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.post(APP.HOST + '/commend_view', {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            user_id: APP.USER_ID,
            commend_id: commend_id
        });
    }
};
var actions = {
    //全局
    //显示/关闭 弹窗
    toggleAlert: function toggleAlert(_ref, alert) {
        var commit = _ref.commit;

        commit('toggleAlert', alert);
    },
    toggleConfirm: function toggleConfirm(_ref2, confirm) {
        var commit = _ref2.commit;

        commit('toggleConfirm', confirm);
    },
    toggleLoading: function toggleLoading(_ref3, loading) {
        var commit = _ref3.commit;

        commit('toggleLoading', loading);
    },

    //——获取用户信息
    getUserInfor: function getUserInfor(_ref4, callback) {
        var commit = _ref4.commit;

        commit('getUserInfor', callback);
    },
    getAddressList: function getAddressList(_ref5, callback) {
        var commit = _ref5.commit;

        commit('getAddressList', callback);
    },
    pageView: function pageView(_ref6, page_id) {
        var commit = _ref6.commit;

        commit('pageView', page_id);
    },
    bannerView: function bannerView(_ref7, banner_id) {
        var commit = _ref7.commit;

        commit('bannerView', banner_id);
    },
    commendView: function commendView(_ref8, commend_id) {
        var commit = _ref8.commit;

        commit('commendView', commend_id);
    },
    getOrderList: function getOrderList(_ref9) {
        var commit = _ref9.commit;

        commit('getOrderList');
    }
};
var store = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
    state: state,
    mutations: mutations,
    actions: actions
});

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
module.exports = store;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js__);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
    routes: [{
        path: '/',
        name: 'index',
        component: function component(resolve) {
            __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(13)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/index',
        name: 'index',
        component: function component(resolve) {
            __webpack_require__.e/* require */(0/* duplicate */).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(13)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/product_list',
        name: 'product_list',
        component: function component(resolve) {
            __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(47)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/product_detail',
        name: 'product_detail',
        component: function component(resolve) {
            __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(46)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/activity_list',
        name: 'activity_list',
        component: function component(resolve) {
            __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(42)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/activity_detail',
        name: 'activity_detail',
        component: function component(resolve) {
            __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(41)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/my_integral',
        name: 'my_integral',
        component: function component(resolve) {
            __webpack_require__.e/* require */(7).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(43)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/order_list',
        name: 'order_list',
        component: function component(resolve) {
            __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(45)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: '/order_detail',
        name: 'order_detail',
        component: function component(resolve) {
            __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(44)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, { path: '*', redirect: '/' }],
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
router.beforeEach(function (to, from, next) {
    // console.log(to.name);
    // console.log(from);
    __WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default.a.dispatch('pageView', to.name);
    if (__WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default.a.state.v_alert.show) {
        __WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default.a.dispatch('toggleAlert');
    }
    if (__WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default.a.state.v_confirm.show) {
        __WEBPACK_IMPORTED_MODULE_2_v_vuex_store_js___default.a.dispatch('toggleConfirm');
    }
    next();
});

module.exports = router;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_libs_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_libs_sha1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_resource__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_resource___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_resource__);
'use strict';





__WEBPACK_IMPORTED_MODULE_2_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_resource___default.a);
__WEBPACK_IMPORTED_MODULE_2_vue___default.a.http.options.emulateJSON = true;
/* harmony default export */ exports["a"] = function (wx, store) {

    getTicket(function (ticket) {
        //通过config接口注入权限验证配置
        var option = {
            appId: 'wx871e120dd0a24149',
            ticket: ticket,
            noncestr: 'helloworld',
            timestamp: new Date().getTime(),
            signature: ''
        };
        var str1 = 'jsapi_ticket=' + option.ticket + '&noncestr=' + option.noncestr + '&timestamp=' + option.timestamp + '&url=' + location.href;
        option.signature = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_libs_sha1__["a" /* default */])(str1);
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: option.appId, // 必填，公众号的唯一标识
            timestamp: option.timestamp, // 必填，生成签名的时间戳
            nonceStr: option.noncestr, // 必填，生成签名的随机串
            signature: option.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    });

    //分享赢积分
    function share() {
        __WEBPACK_IMPORTED_MODULE_2_vue___default.a.http.post(APP.HOST + '/share/' + APP.USER_ID, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then(function (response) {
            store.dispatch('getUserInfor');
        }, function (response) {});
    }

    function getTicket(callback) {
        __WEBPACK_IMPORTED_MODULE_2_vue___default.a.http.post(APP.HOST + '/get_weixin_ticket/' + APP.MEDIA_ID, {
            token: APP.TOKEN,
            userid: APP.USER_ID
        }).then(function (response) {
            if (response.data.status == APP.SUCCESS) {
                callback(response.data.data.ticket);
            }
        }, function (response) {});
    }
    wx.ready(function () {
        wx.onMenuShareTimeline({
            // title: '分享到大奔朋友圈', // 分享标题
            link: APP.MALL_HOST + '?id=' + APP.MEDIA_ID, // 分享链接
            imgUrl: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg', // 分享图标
            success: function success() {
                // 用户确认分享后执行的回调函数

                share();
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            // title: '分享给地球的朋友', // 分享标题
            // desc: '来自地球的问候', // 分享描述
            link: APP.MALL_HOST + '?id=' + APP.MEDIA_ID, // 分享链接
            imgUrl: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg', // 分享图标
            // type: '', // 分享类型,music、video或link，不填默认为link
            // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function success() {
                // 用户确认分享后执行的回调函数
                share();
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });

        // 分享到QQ
        wx.onMenuShareQQ({
            // title: '分享给地球的QQ', // 分享标题
            // desc: '来自地球的问候', // 分享描述
            link: APP.MALL_HOST + '?id=' + APP.MEDIA_ID, // 分享链接
            imgUrl: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg', // 分享图标
            success: function success() {
                // 用户确认分享后执行的回调函数
                share();
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            // title: '分享给地球的微博', // 分享标题
            // desc: '来自地球的问候', // 分享描述
            link: APP.MALL_HOST + '?id=' + APP.MEDIA_ID, // 分享链接
            imgUrl: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg', // 分享图标
            success: function success() {
                // 用户确认分享后执行的回调函数
                share();
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到qq空间
        wx.onMenuShareQZone({
            // title: '分享给地球的空间', // 分享标题
            // desc: '来自地球的问候', // 分享描述
            link: APP.MALL_HOST + '?id=' + APP.MEDIA_ID, // 分享链接
            imgUrl: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg', // 分享图标
            success: function success() {
                // 用户确认分享后执行的回调函数
                share();
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
            }
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    //通过error接口处理失败验证
    wx.error(function (res) {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
    // //判断当前客户端版本是否支持指定JS接口
    // wx.checkJsApi({
    //     jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     success: function(res) {
    //         console.log(res);
    //         // 以键值对的形式返回，可用的api值true，不可用为false
    //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //     }
    // });

};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(18)

/* script */
__vue_exports__ = __webpack_require__(24)

/* template */
var __vue_template__ = __webpack_require__(32)
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

module.exports = __vue_exports__


/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(33)
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
__vue_options__._scopeId = "data-v-3be137e7"

module.exports = __vue_exports__


/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAn1BMVEUAAADeXFnfX17gYmXgZGnhZGrgYmTfXlrfYGDhZmzgYWLgXlrfXlvfXVrfXVjiZmzgYWHfXVveW1beW1bgY2ffXVrhY2XfX1/gY2bfXFffXFjhY2ffXFneXFjfXFbhZmvfXVngYF7fXVngYWPfYGHgXlvfXVngYGHhYmPgX13fXlzfXFfhZGngYF/fW1bhZWrhZ2/hZm7hZ27iZ28AAAADmqYJAAAAMHRSTlMAcMDv+/vvh9v+5oecnFf+25w8H/aH7872H1f2cFcf/lfAcObbnIfb5q+vPPvOH/sC33vzAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAArNJREFUSMeNVol22jAQFLYRODUBYbsEEmi4QmOadLX6/3/ryAe+BO4+3pOQPLuzh1YSoicjzw8IomksvYkYlNE0JCoAXEyefjwERAE+hYRS+viV6PHsLuBZElTPF2pZrcSTxdwaDEZuhAeFnPQ0pj+tpZUDEMMEBanTvwS6XuLu8hrLerW+Q9kj5nDTsfGqaf52Py5bRCLcthGms9KVHViETW4+/m/EQ4lfiZJWrB7byL391YjbO2mTDiHgj9FU5ccnXg0jhNgbExSzA1OwK6abowOrZEUa1aryCXIY1U6duohIk19OR6WZd+ag2k5RAYsOggyfqz/Q/oHhQkbVJFCDLTuKag4WT0cMyGsjRWci08DMgGgWasi0Fhvi3021Z8M1N4XDoJq7F6JUfGqTtQNEhqY1q/ZhAAlPLIg6iccyXXJWpulHLldjpM1jLxGUx9oOqrtHJhTIYy951umTYtNHCMkkiP3eulBFd3G0CWRGEDkgOSlWjg0/h0gXBGb0ybFhrWiXFRto5MeBkYaQ/D8uWqxQjg6MtWLJORyJ8qHPjVHLU6JOK5xRGV2HnaV1/ZMocyNuOW0T8HDw83pusVI1nIvaqeSUH5igVfyz1vkQM83csBOHHGL4okYpR91qj1rcQGFaeHSrsgn3KlFpS78UMDrY0a8/25PuVUlUO4vIFNpH6Mdly4+9j17yROqVV9Q6uPkpiY/iP+Srrsdl6DhLfTkgEs/Vn4x4qPGjk0LxvpGhoeulQDRr/jsZumDsNZa0rsv4BZjoPiJFz0s6N2mcIGXH2A3YreB50rt745N9VTjfEWqMMpI7x04WotUF2XdHFR4pONWecMr1mLeiY3a4OZ095Uvyfjjf0A3Kd4/v+3/xQLDNSR7EI7muguJ5hI/ZooPVsxiUbXbyrVs6lIvMwegfB55kLCaT7gAAAAAASUVORK5CYII="

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 19 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 20 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 21 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 22 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_v_alert_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_v_alert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_v_alert_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_v_confirm_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_v_confirm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_components_v_confirm_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_v_loading_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_v_loading_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_components_v_loading_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuex__);
//
//
//
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
    name: 'app',
    components: {
        vAlert: __WEBPACK_IMPORTED_MODULE_0_components_v_alert_vue___default.a,
        vConfirm: __WEBPACK_IMPORTED_MODULE_1_components_v_confirm_vue___default.a,
        vLoading: __WEBPACK_IMPORTED_MODULE_2_components_v_loading_vue___default.a
    },
    mounted: function mounted() {
        this.$store.dispatch('getUserInfor');
        var scale = 1 / devicePixelRatio;
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ' , minimum-scale=' + scale + ' ,  minimal-ui,user-scalable=0');
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
    },

    computed: {
        v_alert: function v_alert() {
            return this.$store.state.v_alert;
        },
        v_confirm: function v_confirm() {
            return this.$store.state.v_confirm;
        },
        v_loading: function v_loading() {
            return this.$store.state.v_loading;
        }
    }
};

/***/ },
/* 25 */
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: {
        show: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'suprise'
        },
        msg: String,
        coverClose: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String,
            default: '关闭'
        },
        callback: Function
    },
    methods: {
        func: function func() {
            this.$store.dispatch('toggleAlert', {
                msg: this.msg,
                btn_text: this.btnText,
                type: this.type,
                cover_close: this.coverClose
            });
            if (this.callback) {
                this.callback();
            }
        }
    }
};

/***/ },
/* 26 */
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
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: 'v-confirm',
    props: {
        show: false,
        toggleConfirm: Function,
        msg: {
            type: String,
            default: '你确定要操作吗?'
        },
        callback: Function
    },
    methods: {
        func: function func() {
            if (this.callback) {
                this.callback();
            } else {
                this.close();
            }
        },
        close: function close() {
            this.$store.dispatch('toggleConfirm', {
                msg: this.msg,
                show: false
            });
        }
    }
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_v_spinner_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_v_spinner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_components_v_spinner_vue__);
//
//
//
//
//
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
	components: {
		vSpinner: __WEBPACK_IMPORTED_MODULE_0_components_v_spinner_vue___default.a
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	}
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (str) {
    var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
    var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
    return hex_sha1(str);
    /*
     *
     * The main function to calculate message digest
     *
     */
    function hex_sha1(s) {
        return binb2hex(core_sha1(AlignSHA1(s)));
    }
    /*
     *
     * Perform a simple self-test to see if the VM is working
     *
     */
    function sha1_vm_test() {
        return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
    }
    /*
     *
     * Calculate the SHA-1 of an array of big-endian words, and a bit length
     *
     */
    function core_sha1(blockArray) {
        var x = blockArray; // append padding
        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
        for (var i = 0; i < x.length; i += 16) // 每次处理512位 16*32
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;
            for (var j = 0; j < 80; j++) // 对每个512位进行80步操作
            {
                if (j < 16) w[j] = x[i + j];else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                e = d;
                d = c;
                c = rol(b, 30);
                b = a;
                a = t;
            }
            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
            e = safe_add(e, olde);
        }
        return new Array(a, b, c, d, e);
    }
    /*
     *
     * Perform the appropriate triplet combination function for the current
     * iteration
     *
     * 返回对应F函数的值
     *
     */
    function sha1_ft(t, b, c, d) {
        if (t < 20) return b & c | ~b & d;
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return b & c | b & d | c & d;
        return b ^ c ^ d; // t<80
    }
    /*
     *
     * Determine the appropriate additive constant for the current iteration
     *
     * 返回对应的Kt值
     *
     */
    function sha1_kt(t) {
        return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
    }
    /*
     *
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     *
     * to work around bugs in some JS interpreters.
     *
     * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
     *
     */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | lsw & 0xFFFF;
    }
    /*
     *
     * Bitwise rotate a 32-bit number to the left.
     *
     * 32位二进制数循环左移
     *
     */
    function rol(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
    }
    /*
     *
     * The standard SHA1 needs the input string to fit into a block
     *
     * This function align the input string to meet the requirement
     *
     */
    function AlignSHA1(str) {
        var nblk = (str.length + 8 >> 6) + 1,
            blks = new Array(nblk * 16);
        for (var i = 0; i < nblk * 16; i++) {
            blks[i] = 0;
        }for (i = 0; i < str.length; i++) {
            blks[i >> 2] |= str.charCodeAt(i) << 24 - (i & 3) * 8;
        }blks[i >> 2] |= 0x80 << 24 - (i & 3) * 8;
        blks[nblk * 16 - 1] = str.length * 8;
        return blks;
    }
    /*
     *
     * Convert an array of big-endian words to a hex string.
     *
     */
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 0xF);
        }
        return str;
    }
    /*
     *
     * calculate MessageDigest accord to source message that inputted
     *
     */
    function calcDigest() {
        var digestM = hex_sha1(document.SHAForm.SourceMessage.value);
        document.SHAForm.MessageDigest.value = digestM;
    }
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(20)

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(34)
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
__vue_options__._scopeId = "data-v-7b1b2b2a"

module.exports = __vue_exports__


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(21)

/* script */
__vue_exports__ = __webpack_require__(26)

/* template */
var __vue_template__ = __webpack_require__(35)
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
__vue_options__._scopeId = "data-v-a5fa7de4"

module.exports = __vue_exports__


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(22)

/* script */
__vue_exports__ = __webpack_require__(27)

/* template */
var __vue_template__ = __webpack_require__(36)
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
__vue_options__._scopeId = "data-v-eaadc4ec"

module.exports = __vue_exports__


/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    attrs: {
      "id": "app"
    }
  }, [_vm._h('router-view'), " ", _vm._h('v-alert', {
    attrs: {
      "show": _vm.v_alert.show,
      "msg": _vm.v_alert.msg,
      "callback": _vm.v_alert.callback,
      "type": _vm.v_alert.type,
      "cover-close": _vm.v_alert.cover_close,
      "btn-text": _vm.v_alert.btn_text
    }
  }), " ", _vm._h('v-confirm', {
    attrs: {
      "show": _vm.v_confirm.show,
      "msg": _vm.v_confirm.msg,
      "callback": _vm.v_confirm.callback
    }
  }), " ", _vm._h('v-loading', {
    attrs: {
      "show": _vm.v_loading.show
    }
  })])
},staticRenderFns: []}

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "sk-fading-circle"
  }, [_vm._h('div', {
    staticClass: "sk-circle1 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle2 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle3 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle4 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle5 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle6 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle7 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle8 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle9 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle10 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle11 sk-circle"
  }), " ", _vm._h('div', {
    staticClass: "sk-circle12 sk-circle"
  })])
}]}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._h('section', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "v-alert"
  }, [_vm._h('div', {
    staticClass: "bg-cover"
  }, [_vm._h('div', {
    staticClass: "modal bg-white"
  }, [_vm._h('div', {
    staticClass: "modal-content text-center text-large"
  }, [(_vm.type == "suprise") ? _vm._h('img', {
    staticClass: "icon",
    attrs: {
      "src": __webpack_require__(16)
    }
  }) : _vm._e(), " ", (_vm.type == "correct") ? _vm._h('img', {
    staticClass: "icon",
    attrs: {
      "src": __webpack_require__(14)
    }
  }) : _vm._e(), " ", (_vm.type == "error") ? _vm._h('img', {
    staticClass: "icon",
    attrs: {
      "src": __webpack_require__(15)
    }
  }) : _vm._e(), " ", _vm._h('p', {
    staticClass: "msg"
  }, [_vm._s(_vm.msg)]), " ", _vm._h('div', {
    staticClass: "flex flex-center-h"
  }, [_vm._h('button', {
    staticClass: "btn btn-red btn-large",
    on: {
      "click": function($event) {
        _vm.func()
      }
    }
  }, [_vm._s(_vm.btnText)])])])])])])
},staticRenderFns: []}

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('section', {
    staticClass: "v-confirm"
  }, [_vm._h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "bg-cover"
  }), " ", _vm._h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "v-confirm-content"
  }, [_vm._h('div', {
    staticClass: " msg"
  }, [_vm._s(_vm.msg)]), " ", _vm._h('div', {
    staticClass: "flex btns"
  }, [_vm._h('div', {
    staticClass: " flex-item   bg-white",
    on: {
      "click": _vm.close
    }
  }, ["取消"]), " ", _vm._h('div', {
    staticClass: " flex-item  bg-red text-white",
    on: {
      "click": function($event) {
        _vm.func()
      }
    }
  }, ["确定"])])])])
},staticRenderFns: []}

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "v-loading"
  }, [_vm._h('v-spinner')])
},staticRenderFns: []}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_resource__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_resource___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_resource__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__router_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_libs_utils_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_v_vuex_store_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_v_vuex_store_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_v_vuex_store_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fastclick__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_fastclick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_fastclick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_weixin_js_sdk__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_weixin_js_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_weixin_js_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wx_config__ = __webpack_require__(9);









window.APP = {
    APP_NAME: '积分兑换',
    HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: ''
};
if (!__WEBPACK_IMPORTED_MODULE_4_libs_utils_js__["a" /* default */].getParameterByName('token')) {
    //进行微信登陆操作
    var redirect = encodeURIComponent(APP.MALL_HOST);

    var id = __WEBPACK_IMPORTED_MODULE_4_libs_utils_js__["a" /* default */].getParameterByName('id');
    // if (localStorage[id+'-token']) {
    //     startApp(id);

    // } else {
    //     location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
    // }
    location.href = APP.HOST + '/weixin/' + id + '?callback=' + redirect;
} else {
    startApp();
}

function startApp(id) {
    if (!id) {
        //first login
        window.APP.TOKEN = __WEBPACK_IMPORTED_MODULE_4_libs_utils_js__["a" /* default */].getParameterByName('token');
        window.APP.USER_ID = __WEBPACK_IMPORTED_MODULE_4_libs_utils_js__["a" /* default */].getParameterByName('userid');
        window.APP.MEDIA_ID = __WEBPACK_IMPORTED_MODULE_4_libs_utils_js__["a" /* default */].getParameterByName('mediaid');
        localStorage[window.APP.MEDIA_ID + '-token'] = window.APP.TOKEN;
        localStorage[window.APP.MEDIA_ID + '-user_id'] = window.APP.USER_ID;
        localStorage[window.APP.MEDIA_ID + '-media_id'] = window.APP.MEDIA_ID;
    } else {
        window.APP.TOKEN = localStorage[id + '-token'];
        window.APP.USER_ID = localStorage[id + '-user_id'];
        window.APP.MEDIA_ID = localStorage[id + '-media_id'];
    }
    console.log('login success');
    __WEBPACK_IMPORTED_MODULE_6_fastclick___default.a.attach(document.body);
    //配置微信jsdk
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__wx_config__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_7_weixin_js_sdk___default.a, __WEBPACK_IMPORTED_MODULE_5_v_vuex_store_js___default.a);
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vue_resource___default.a);
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
    new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
        el: '#app',
        render: function render(h) {
            return h(__WEBPACK_IMPORTED_MODULE_1__App_vue___default.a);
        },
        router: __WEBPACK_IMPORTED_MODULE_3__router_js___default.a,
        store: __WEBPACK_IMPORTED_MODULE_5_v_vuex_store_js___default.a
    });
}

/***/ },
/* 38 */,
/* 39 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 40 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }
],[37]);