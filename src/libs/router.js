import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
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
            path: '/my_account',
            name: 'my_account',
            component: require('views/myAccount.vue')

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
            path: '/earn_integral',
            name: 'earn_integral',
            component: require('views/earnIntegral.vue')
        },
        {
            path:'/edit_user',
            name:'edit_user',
            component: require('views/editUser.vue')
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
utils.setTitle(APP.TITLE);
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
// router.afterEach((to, from) => {
//     let url = location.href;
//     url = `${url.split('#/')[0]}#${to.fullPath}`;
//     setWeChatConfig(Vue, url);
// });
module.exports = router;