import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
const media_id = utils.getParameterByName('id'),
    page = utils.getParameterByName('page'),
    origin = utils.getParameterByName('origin'),
    storage = utils.getLocalStorage(media_id);
if (storage) {
    const now = new Date(),
        before = new Date(storage.DATE),
        interval = (now - before) / 1000 / 60 / 60 / 24,
        is_expired = parseInt(interval) >= 30;
    if (is_expired) {
        utils.login(media_id, 1, page, null, origin);
    } else {
        startApp(storage);
    }
} else {
    const token = utils.getParameterByName('token');
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
        let link = `${APP.MALL_HOST}/?id=${media_id}`;
        if (origin) {
            link += `&origin=${origin}`;
        }
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
        } else if (page === 'order_detail') {
            const order_id = utils.getParameterByName('order_id');
            link += `&page=${page}&order_id=${order_id}`;
        }
        location.href = link;
    } else {
        utils.login(media_id, 1, page, null, origin);
    }
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
    APP.ORIGIN = origin || 'menu';
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