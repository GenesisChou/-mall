import Vue from 'vue';
import wx from 'weixin-js-sdk';
import store from '../store';
module.exports = function (option = {}) {
    let url = location.href.split('#')[0];
    if (option.router && option.router.name !== 'index') {
        url += '#' + option.router.fullPath;
    }
    store.dispatch('changeCurrentSignature', option.router.name);
    getSignature(url).then((data) => {
        init(data.data);
    });

    function init(data) {
        const title = option.title || APP.TITLE,
            desc = option.desc || '',
            link = option.link || url,
            imgUrl = option.img || APP.LOGO,
            appId = APP.APPID,
            timestamp = data.timestamp,
            nonceStr = data.noncestr,
            signature = data.signature;
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        //通过error接口处理失败验证
        wx.error(function (res) {

        });
        // //判断当前客户端版本是否支持指定JS接口
        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success(res) {}
        });
        wx.ready(() => {
            wx.onMenuShareTimeline({
                title, // 分享标题
                desc,
                link, // 分享链接
                imgUrl, // 分享图标
                success() {
                    // 用户确认分享后执行的回调函数
                    share();
                },
            });
            wx.onMenuShareAppMessage({
                title, // 分享标题
                desc,
                link, // 分享链接
                imgUrl, // 分享图标
                // type: '', // 分享类型,music、video或link，不填默认为link
                // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success() {
                    share();
                },
            });

            // 分享到QQ
            wx.onMenuShareQQ({
                title,
                desc,
                link, // 分享链接
                imgUrl, // 分享图标
                success() {
                    // 用户确认分享后执行的回调函数
                    share();
                },
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
                title,
                desc,
                link, // 分享链接
                imgUrl, // 分享图标
                success() {
                    // 用户确认分享后执行的回调函数
                    share();
                },
            });
            //分享到qq空间
            wx.onMenuShareQZone({
                title,
                desc,
                link,
                imgUrl,
                success() {
                    share();
                },
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
        });
    }

    function getSignature(url) {
        return new Promise((resolve, reject) => {
            Vue.http.post(`${APP.HOST}/get_signature`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id: APP.MEDIA_ID,
                url
            }).then((response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    if (resolve) {
                        resolve(data);
                    }
                }
            }, (response) => {
                if (reject) {
                    reject(response.data);
                }
            });
        });
    }
};