'use strict'
export default function(wx) {
    wx.checkJsApi({
        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: '分享到朋友圈', // 分享标题
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: '分享给朋友', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    // 分享到QQ
    wx.onMenuShareQQ({
        title: '分享到QQ', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: '分享到腾讯微博', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    //分享到qq空间
    wx.onMenuShareQZone({
        title: '分享到QQ空间', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
}
