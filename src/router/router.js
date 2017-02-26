import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            component: resolve => {
                require.ensure(['views/index.vue'], () => {
                    resolve(require('views/index.vue'))
                })
            },
            // component: require('views/index.vue')
        }, {
            path: '/product_list',
            name: 'product_list',
            // component: require('views/productList.vue')
            component: resolve => {
                require.ensure(['views/productList.vue'], () => {
                    resolve(require('views/productList.vue'))
                })
            },


        }, {
            path: '/product_detail',
            name: 'product_detail',
            // component: require('views/productDetail.vue')
            component: resolve => {
                require.ensure(['views/productDetail.vue'], () => {
                    resolve(require('views/productDetail.vue'))
                })
            },
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            // component: require('views/activityDetail.vue')
            component: resolve => {
                require.ensure(['views/activityDetail.vue'], () => {
                    resolve(require('views/activityDetail.vue'))
                })
            },
        }, {
            path: '/my_account',
            name: 'my_account',
            // component: require('views/myAccount.vue')
            component: resolve => {
                require.ensure(['views/myAccount.vue'], () => {
                    resolve(require('views/myAccount.vue'))
                })
            },

        }, {
            path: '/order_list',
            name: 'order_list',
            // component: require('views/orderList.vue')
            component: resolve => {
                require.ensure(['views/orderList.vue'], () => {
                    resolve(require('views/orderList.vue'))
                })
            },
        }, {
            path: '/order_detail',
            name: 'order_detail',
            // component: require('views/orderDetail.vue')
            component: resolve => {
                require.ensure(['views/orderDetail.vue'], () => {
                    resolve(require('views/orderDetail.vue'))
                })
            },
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            // component: require('views/subjectDetail.vue')
            component: resolve => {
                require.ensure(['views/subjectDetail.vue'], () => {
                    resolve(require('views/subjectDetail.vue'))
                })
            },
        },
        {
            path: '/earn_integral',
            name: 'earn_integral',
            // component: require('views/earnIntegral.vue')
            component: resolve => {
                require.ensure(['views/earnIntegral.vue'], () => {
                    resolve(require('views/earnIntegral.vue'))
                })
            },
        },
        {
            path: '/edit_user',
            name: 'edit_user',
            // component: require('views/editUser.vue')
            component: resolve => {
                require.ensure(['views/editUser.vue'], () => {
                    resolve(require('views/editUser.vue'))
                })
            },
        },
        {
            path: '/test',
            name: 'test',
            // component: require('views/test.vue')
            component: resolve => {
                require.ensure(['views/test.vue'], () => {
                    resolve(require('views/test.vue'))
                })
            },
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
        edit_user: '填写个人资料',
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