import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
const media_id = utils.getParameterByName('id'),
    storage = utils.getLocalStorage(media_id);
if (storage) {
    startApp(storage);
} else {
    const media_id = utils.getParameterByName('mediaid'),
        token = utils.getParameterByName('token');
    if (token) {
        utils.setLocalStorage(media_id, {
            TOKEN: token,
            USER_ID: utils.getParameterByName('userid'),
            MEDIA_ID: media_id,
            OPEN_ID: utils.getParameterByName('open_id'),
            DATE: new Date(),
        });
        //本地测试用
        startApp(utils.getLocalStorage(media_id));
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
        wxLogin(media_id);
    }
}

//微信登陆
function wxLogin(media_id) {
    const redirect = encodeURIComponent(APP.MALL_HOST),
        activity_id = utils.getParameterByName('activity_id'),
        product_id = utils.getParameterByName('product_id'),
        subject_id = utils.getParameterByName('subject_id');
    let link = `${APP.HOST}/weixin/${media_id}?callback=${redirect}`;
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
    const store = require('./store'),
        fastClick = require('fastclick'),
        weChatShare = require('libs/weChatShare.js'),
        lazyLoad = require('vue-lazyload'),
        globalComponents = require('components/components.js');
    APP.TOKEN = cache.TOKEN;
    APP.USER_ID = cache.USER_ID;
    APP.MEDIA_ID = cache.MEDIA_ID;
    APP.OPEN_ID = cache.OPEN_ID;
    fastClick.attach(document.body);
    Vue.use(globalComponents);
    Vue.use(lazyLoad, {
        attempt: 1,
        listenEvents: ['scroll']
    });
    weChatShare();
    store.dispatch('getTitle', (response) => {
        document.title = store.state.title;
    });
    new Vue({
        el: '#app',
        render: h => h(require('./APP.vue')),
        router: require('./router'),
        store
    });
}