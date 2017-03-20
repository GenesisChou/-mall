import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../vuex/store.js';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            component: resolve => {
                require.ensure(['views/index'], () => {
                    resolve(require('views/index'))
                })
            },
            // component: require('views/index.vue')
        }, {
            path: '/product_list',
            name: 'product_list',
            // component: require('views/productList.vue')
            component: resolve => {
                require.ensure(['views/productList'], () => {
                    resolve(require('views/productList'))
                })
            },


        }, {
            path: '/product_detail',
            name: 'product_detail',
            // component: require('views/productDetail.vue')
            component: resolve => {
                require.ensure(['views/productDetail'], () => {
                    resolve(require('views/productDetail'))
                })
            },
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            // component: require('views/activityDetail.vue')
            component: resolve => {
                require.ensure(['views/activityDetail'], () => {
                    resolve(require('views/activityDetail'))
                })
            },
        }, {
            path: '/my_account',
            name: 'my_account',
            // component: require('views/myAccount.vue')
            component: resolve => {
                require.ensure(['views/myAccount'], () => {
                    resolve(require('views/myAccount'))
                })
            },

        }, {
            path: '/order_list',
            name: 'order_list',
            // component: require('views/orderList.vue')
            component: resolve => {
                require.ensure(['views/orderList'], () => {
                    resolve(require('views/orderList'))
                })
            },
        }, {
            path: '/order_detail',
            name: 'order_detail',
            // component: require('views/orderDetail.vue')
            component: resolve => {
                require.ensure(['views/orderDetail'], () => {
                    resolve(require('views/orderDetail'))
                })
            },
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            // component: require('views/subjectDetail.vue')
            component: resolve => {
                require.ensure(['views/subjectDetail'], () => {
                    resolve(require('views/subjectDetail'))
                })
            },
        },
        {
            path: '/earn_integral',
            name: 'earn_integral',
            // component: require('views/earnIntegral.vue')
            component: resolve => {
                require.ensure(['views/earnIntegral'], () => {
                    resolve(require('views/earnIntegral'))
                })
            },
        },
        {
            path: '/edit_user',
            name: 'edit_user',
            // component: require('views/editUser.vue')
            component: resolve => {
                require.ensure(['views/editUser'], () => {
                    resolve(require('views/editUser'))
                })
            },
        },
        {
            path: '*',
            redirect: '/'
        }
    ],
});
//需要固定滚动条位置的页面
const fixList = ['index', 'product_list', 'order_list', 'subject_detail'];
router.beforeEach((to, from, next) => {
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