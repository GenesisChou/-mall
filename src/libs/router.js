import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
import setWeChatConfig from 'libs/weChatConfig.js';
import setWeChatTitle from 'libs/setTitle.js';
import titles from 'libs/titles.js';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            component: require('views/index.vue')
        }, {
            path: '/product_list',
            name: 'product_list',
            component: require('views/productList.vue')

        }, {
            path: '/product_detail',
            name: 'product_detail',
            component: require('views/productDetail.vue')
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            component: require('views/activityDetail.vue')
        }, {
            path: '/my_integral',
            name: 'my_integral',
            component: require('views/myIntegral.vue')

        }, {
            path: '/order_list',
            name: 'order_list',
            component: require('views/orderList.vue')
        }, {
            path: '/order_detail',
            name: 'order_detail',
            component: require('views/orderDetail.vue')
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            component: require('views/subjectDetail.vue')
        },
        {
            path: '/check_in',
            name: 'check_in',
            component: require('views/checkIn.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: require('views/test.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
});
router.beforeEach((to, from, next) => {
    titles.forEach(item => {
        if (item.name == to.name) {
            setWeChatTitle(item.title);
            return;
        }
    })
    store.dispatch('pageView', to.name);
    utils.setSessionStorage('position:' + from.name, utils.getScrollTop());
    next();
});
router.afterEach((to, from) => {
    let url = location.href.split('#/')[0];
    url += '#' + to.fullPath;
    console.log(to.fullPath);
    console.log(url);
    setWeChatConfig(Vue, url);
});
module.exports = router;