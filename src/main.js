import utils from 'libs/utils.js';
window.APP = {
    TITLE: '积分兑换',
    // APPID: 'wx8057c4704888d230',
    // HOST: 'http://integral.api.justtong.com/imall', //接口域名
    // MALL_HOST: 'http://imall.justtong.com', //服务器域名
    APPID: 'wx871e120dd0a24149',
    HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    LOGO: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg',
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: ''
};

var token = utils.getParameterByName('token');
var activity_id = utils.getParameterByName('activity_id');
if (token) {
    var media_id=utils.getParameterByName('mediaid');
    var cache = {
        TOKEN: token,
        USER_ID: utils.getParameterByName('userid'),
        MEDIA_ID: media_id,
        OPEN_ID: utils.getParameterByName('open_id')
    };
    utils.setLocalStorage(media_id, cache);
    var link=`${APP.MALL_HOST}/?id=${media_id}#`;
    if(activity_id){
      link=link+'/activity_detail?activity_id='+activity_id;
    }
    location.href = link;
} else {
    var media_id = utils.getParameterByName('id');
    var cache = utils.getLocalStorage(media_id);
    if (!cache) {
        var redirect = encodeURIComponent(APP.MALL_HOST);
        var link = `${APP.HOST}/weixin/${media_id}?callback=${redirect}`;
        if (activity_id) {
            link = link + '&activity_id=' + activity_id;
        }
        location.href = link;
    } else {
        var Vue = require('vue');
        var VueResource = require('vue-resource');
        var VueLazyLoad=require('vue-lazyload');
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
        Vue.use(VueLazyLoad);
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
