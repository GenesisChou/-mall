import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
const media_id = utils.getParameterByName('id'),
    origin = utils.getParameterByName('origin'),
    storage = utils.getLocalStorage(media_id);
if (storage) {
    startApp(storage);
} else {
    const token = utils.getParameterByName('token'),
        page = utils.getParameterByName('page');
    if (token) {
        const media_id = utils.getParameterByName('mediaid');
        //设置缓存
        utils.setLocalStorage(media_id, {
            TOKEN: token,
            USER_ID: utils.getParameterByName('userid'),
            MEDIA_ID: media_id,
            OPEN_ID: utils.getParameterByName('open_id'),
            DATE: new Date(),
        });
        //本地测试用
        // startApp(utils.getLocalStorage(media_id));
        //正式部署用 清除url内token,xxx,xxx
        let link = `${APP.MALL_HOST}/?id=${media_id}&origin=${origin}`;
        if (page === 'product_detail') {
            const product_id = utils.getParameterByName('product_id'),
                back = utils.getParameterByName('back');
            link += `&page=${page}&product_id=${product_id}`;
            if (back) {
                link += `&back=${back}`;
                if (back === 'subject_detail') {
                    const subject_id = utils.getParameterByName('subject_id');
                    link += `&subject_id=${subject_id}`;
                }
            }
        } else if (page === 'activity_detail') {
            const activity_id = utils.getParameterByName('activity_id');
            link += `&page=${page}&activity_id=${activity_id}`;
        } else if (page === 'subject_detail') {
            const subject_id = utils.getParameterByName('subject_id');
            link += `&page=${page}&subject_id=${subject_id}`;
        }
        location.href = link;
    } else {
        wxLogin(page);
    }
}

//微信登陆
function wxLogin(page) {
    const redirect = encodeURIComponent(APP.MALL_HOST);
    let link = `${APP.HOST}/weixin/${media_id}?callback=${redirect}`;
    if (page === 'product_detail') {
        const back = utils.getParameterByName('back'),
            product_id = utils.getParameterByName('product_id');
        link += `&page=product_detail&product_id=${product_id}&back=${back}`;
        if (back === 'subject_detail') {
            const subject_id = utils.getParameterByName('subject_id');
            link += `&subject_id=${subject_id}`;
        }
    } else if (page === 'activity_detail') {
        const activity_id = utils.getParameterByName('activity_id');
        link += `&page=activity_detail&activity_id=${activity_id}`;
    } else if (page === 'subject_detail') {
        const subject_id = utils.getParameterByName('subject_id');
        link += `&page=subject_detail&subject_id=${subject_id}`;
    }
    location.href = link;
}

function startApp(cache) {
    const store = require('./store'),
        fastClick = require('fastclick'),
        lazyLoad = require('vue-lazyload'),
        globalComponents = require('components/components.js');
    APP.TOKEN = cache.TOKEN;
    APP.USER_ID = cache.USER_ID;
    APP.MEDIA_ID = cache.MEDIA_ID;
    APP.OPEN_ID = cache.OPEN_ID;
    APP.ORIGIN = origin;
    fastClick.attach(document.body);
    Vue.use(globalComponents);
    Vue.use(lazyLoad, {
        attempt: 1,
        listenEvents: ['scroll']
    });
    new Vue({
        el: '#app',
        render: h => h(require('./APP.vue')),
        router: require('./router'),
        store
    });
}