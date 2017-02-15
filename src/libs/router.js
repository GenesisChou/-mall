import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
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
            path: '/edit_user',
            name: 'edit_user',
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
//需要固定滚动条位置的页面
const fixList = ['index', 'product_list', 'order_list', 'subject_detail'],
    titles = {
        index: APP.TITLE,
        product_list: '所有商品',
        product_detail: '商品详情',
        activity_detail: '活动详情',
        my_account: '我的账户',
        order_list: '兑换记录',
        order_detail: '订单详情',
        subject_detail: '每日上新',
        earn_integral: '赚取积分',
    }
router.beforeEach((to, from, next) => {
    utils.setTitle(titles[to.name])
    if (utils.isInArray(from.name, fixList)) {
        utils.setSessionStorage('position:' + from.name, utils.getScrollTop());
    }
    if (!utils.isInArray(to.name, fixList)) {
        utils.scrollToTop();
    }
    store.dispatch('pageView', to.name);
    next();
});
module.exports = router;