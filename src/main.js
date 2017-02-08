let token = utils.getParameterByName('token');
let activity_id = utils.getParameterByName('activity_id'),
    product_id = utils.getParameterByName('product_id'),
    subject_id = utils.getParameterByName('subject_id');
if (token) {
    let media_id = utils.getParameterByName('mediaid');
    let cache = {
        TOKEN: token,
        USER_ID: utils.getParameterByName('userid'),
        MEDIA_ID: media_id,
        OPEN_ID: utils.getParameterByName('open_id'),
        DATE: new Date(),
        TITLE: utils.getParameterByName('imall_title')
    };
    utils.setLocalStorage(media_id, cache);
    //本地测试用
    startApp(cache);
    //正式部署用
    // let link = `${APP.MALL_HOST}/?id=${media_id}#/`;
    // if (activity_id) {
    //     link += 'activity_detail?activity_id=' + activity_id;
    // } else if (product_id) {
    //     link += 'product_detail?product_id=' + product_id;
    // } else if (subject_id) {
    //     link += 'subject_detail?subject_id=' + subject_id;
    // }
    // location.href = link;
} else {
    let media_id = utils.getParameterByName('id');
    let cache = utils.getLocalStorage(media_id);
    //无缓存
    if (!cache) {
        wxLogin(media_id);
        console.log('no cache');
        //缓存过期
    } else if (cacheExpire(cache)) {
        wxLogin(media_id);
        console.log('out of date');
    } else {
        startApp(cache);
    }
}
//判断是否过期
//localstorage保存时间30天
function cacheExpire(cache) {
    let current_time = new Date();
    let save_time = cache.Date;
    let interval = utils.getTimeInterval(current_time, save_time, 'day');
    return interval > 30;
}
//微信登陆
function wxLogin(media_id) {
    let redirect = encodeURIComponent(APP.MALL_HOST);
    let link = `${APP.HOST}/weixin/${media_id}?callback=${redirect}`;
    // let activity_id = utils.getParameterByName('activity_id');
    // let product_id = utils.getParameterByName('product_id');
    if (activity_id) {
        link += '&activity_id=' + activity_id;
    } else if (product_id) {
        link += '&product_id=' + product_id;
    } else if (subject_id) {
        link += '&subject_id=' + product_id;
    }
    location.href = link;
}

function startApp(cache) {
    let Vue = require('vue');
    let VueResource = require('vue-resource');
    let store = require('./vuex/store.js');
    let FastClick = require('fastclick');
    let setWeChatConfig=require('libs/weChatConfig.js');
    APP.TOKEN = cache.TOKEN;
    APP.USER_ID = cache.USER_ID;
    APP.MEDIA_ID = cache.MEDIA_ID;
    APP.OPEN_ID = cache.OPEN_ID;
    if (cache.TITLE) {
        APP.TITLE = cache.TITLE;
    }
    FastClick.attach(document.body);
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
    registerComponents(Vue);
    setWeChatConfig(Vue);
    new Vue({
        el: '#app',
        render: h => h(require('./APP.vue')),
        router: require('libs/router.js'),
        store
    });
}

function registerComponents(Vue) {
    let components = require('./components');
    Object.keys(components).forEach(name => {
        Vue.component(name, components[name]);
    })
}