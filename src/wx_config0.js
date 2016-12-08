module.exports = function() {
    var wx = require('weixin-js-sdk');
    var store = require('./vuex/store.js');
    var utils = require('libs/utils.js');
    var sha1 = require('js-sha1');
    var Vue = require('vue');
    var VueResource = require('vue-resource');
    var link = `${APP.MALL_HOST}?id=${APP.MEDIA_ID}`;
    var logo = APP.LOGO;
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true;

    function init(state) {
        if (state === 'first') {
            configBase();
        }else{
          configShare();
        }
    }

    function configBase() {
        getSignature(function(data) {
            wx.config({
                appId: "wxda819741c7aa5b47", // 必填，公众号的唯一标识
                timestamp:data.timestamp , // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            //通过error接口处理失败验证
            wx.error(function(res) {
                console.log(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });
            // //判断当前客户端版本是否支持指定JS接口
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    console.log(res);
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            configShare();
        });
    }


    function configShare() {
        wx.ready(function() {
            wx.onMenuShareTimeline({
                // title: '分享到大奔朋友圈', // 分享标题
                link: link, // 分享链接
                imgUrl: logo, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数

                    share();


                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                // title: '分享给地球的朋友', // 分享标题
                // desc: '来自地球的问候', // 分享描述
                link: link, // 分享链接
                imgUrl: logo, // 分享图标
                // type: '', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                    share();
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            // 分享到QQ
            wx.onMenuShareQQ({
                // title: '分享给地球的QQ', // 分享标题
                // desc: '来自地球的问候', // 分享描述
                link: link, // 分享链接
                imgUrl: logo, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    share();

                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
                // title: '分享给地球的微博', // 分享标题
                // desc: '来自地球的问候', // 分享描述
                link: link, // 分享链接
                imgUrl: logo, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    share();

                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到qq空间
            wx.onMenuShareQZone({
                // title: '分享给地球的空间', // 分享标题
                // desc: '来自地球的问候', // 分享描述
                link: link, // 分享链接
                imgUrl: logo, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    share();

                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
    }

    //分享赢积分
    function share() {
        Vue.http.post(`${APP.HOST}/share/${APP.USER_ID}`, {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            media_id: APP.MEDIA_ID
        }).then((response) => {
            store.dispatch('getUserInfor');
        }, (response) => {

        });
    }

    function getSignature(callback) {
        Vue.http.post(`${APP.HOST}/share_test`, {
            token: APP.TOKEN,
            userid: APP.USER_ID,
            media_id: APP.MEDIA_ID,
            url:location.href
        }).then((response) => {
            if (response.data.status == APP.SUCCESS) {
                callback(response.data.data);
            }
        }, (response) => {

        });
    }

    function setLink(type, id) {
        if (!type) {
            link = `${APP.MALL_HOST}?id=${APP.MEDIA_ID}`;
        } else if (type == 'activity') {
            link = link + '&activity_id=' + id;
        } else if (type == 'product') {
            link = link + '&product_id=' + id;
        }
        init();
    }

    function resetLink() {
        setLink();
    }

    function setLogo(img_link) {
        logo = img_link;
        init();
    }
    return {
        init,
        setLink,
        resetLink
    };

};
