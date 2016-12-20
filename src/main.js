import utils from 'libs/utils.js';
window.APP = {
    TITLE: '积分兑换',
    VERSION:'1.20',
    APPID: 'wx8057c4704888d230',
    HOST: 'http://integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://imall.justtong.com', //服务器域名
    // APPID: 'wxda819741c7aa5b47',
    // HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    // MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    LOGO: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg',
    SUCCESS: 10000, //服务端返回成功状态码
    LOGIN_FAILED:9999,
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: ''
};

var token = utils.getParameterByName('token');
var activity_id = utils.getParameterByName('activity_id');
if (token) {
    var media_id = utils.getParameterByName('mediaid');
    var cache = {
        TOKEN: token,
        USER_ID: utils.getParameterByName('userid'),
        MEDIA_ID: media_id,
        OPEN_ID: utils.getParameterByName('open_id'),
        DATE: new Date()
    };
    //储存数据
    utils.setLocalStorage(APP.VERSION+media_id, cache);
    var link = `${APP.MALL_HOST}/?id=${media_id}`;
    if (activity_id) {
        link = link + '#/activity_detail?activity_id=' + activity_id;
    }
    location.href = link;
} else {
    var media_id = utils.getParameterByName('id');
    //获取缓存
    var cache = utils.getLocalStorage(APP.VERSION+media_id);
    //无缓存
    if (!cache) {
        console.log('no cache');
        wxLogin(activity_id);
    //缓存过期
    } else if (cacheExpire(cache)) {
        console.log('cache out of date');
        wxLogin(activity_id);
    } else {
        var Vue = require('vue');
        var VueResource = require('vue-resource');
        var store = require('./vuex/store.js');
        var FastClick = require('fastclick');
        var wxConfig = require('./wx_config');
        console.log('login success');
        APP.TOKEN = cache.TOKEN;
        APP.USER_ID = cache.USER_ID;
        APP.MEDIA_ID = cache.MEDIA_ID;
        APP.OPEN_ID = cache.OPEN_ID;
        var title = utils.getParameterByName('imall_title');
        if (title) {
            window.APP.TITLE = title;
        }
        utils.setTitle(window.APP.TITLE);
        FastClick.attach(document.body);
        Vue.use(VueResource);
        Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
        wxConfig(Vue);
        new Vue({
            el: '#app',
            render: h => h(require('./APP.vue')),
            router: require('./router.js'),
            store
        });
    }
}
//判断是否过期
//localstorage保存时间30天
function cacheExpire(cache) {
    var current_time = new Date();
    var save_time = cache.Date;
    var interval = utils.getTimeInterval(current_time, save_time, 'day');
    return interval > 30;
}
//微信登陆
function wxLogin(activity_id) {
    var redirect = encodeURIComponent(APP.MALL_HOST);
    var link = `${APP.HOST}/weixin/${APP.MEDIA_ID}?callback=${redirect}`;
    if (activity_id) {
        link = link + '&activity_id=' + activity_id;
    }
    location.href = link;
}
