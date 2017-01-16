import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
import setWeChatConfig from 'libs/weChatConfig.js';
import setWeChatTitle from 'libs/weChatTitle.js';
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
            component: require('views/product_list.vue')

        }, {
            path: '/product_detail',
            name: 'product_detail',
            component: require('views/product_detail.vue')
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            component: require('views/activity_detail.vue')
        }, {
            path: '/my_integral',
            name: 'my_integral',
            component: require('views/my_integral.vue')

        }, {
            path: '/order_list',
            name: 'order_list',
            component: require('views/order_list.vue')
        }, {
            path: '/order_detail',
            name: 'order_detail',
            component: require('views/order_detail.vue')
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            component: require('views/subject_detail.vue')
        },
        {
            path: '/check_in',
            name: 'check_in',
            component: require('views/check_in.vue')
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
    if (store.state.v_alert.show) {
        store.dispatch('toggleAlert');
    }
    if (store.state.v_confirm.show) {
        store.dispatch('toggleConfirm');
    }
    utils.setSessionStorage('position:' + from.name, utils.getScrollTop());
    next();
});
router.afterEach(()=>{
    setWeChatConfig(Vue);
})


module.exports = router;