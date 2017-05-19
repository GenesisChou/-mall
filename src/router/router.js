import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve => {
                require.ensure(['views/index'], () => {
                    resolve(require('views/index'));
                });
            },
        }, {
            path: '/product_list',
            name: 'product_list',
            component: resolve => {
                require.ensure(['views/productList'], () => {
                    resolve(require('views/productList'));
                });
            },
        }, {
            path: '/product_detail',
            name: 'product_detail',
            component: resolve => {
                require.ensure(['views/productDetail'], () => {
                    resolve(require('views/productDetail'));
                });
            },
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            component: resolve => {
                require.ensure(['views/activityDetail'], () => {
                    resolve(require('views/activityDetail'));
                });
            },
        }, {
            path: '/my_account',
            name: 'my_account',
            component: resolve => {
                require.ensure(['views/myAccount'], () => {
                    resolve(require('views/myAccount'));
                });
            },

        }, {
            path: '/order_list',
            name: 'order_list',
            component: resolve => {
                require.ensure(['views/orderList'], () => {
                    resolve(require('views/orderList'));
                });
            },
        }, {
            path: '/order_detail',
            name: 'order_detail',
            component: resolve => {
                require.ensure(['views/orderDetail'], () => {
                    resolve(require('views/orderDetail'));
                });
            },
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            component: resolve => {
                require.ensure(['views/subjectDetail'], () => {
                    resolve(require('views/subjectDetail'));
                });
            },
        },
        {
            path: '/earn_integral',
            name: 'earn_integral',
            component: resolve => {
                require.ensure(['views/earnIntegral'], () => {
                    resolve(require('views/earnIntegral'));
                });
            },
        },
        {
            path: '/edit_user',
            name: 'edit_user',
            component: resolve => {
                require.ensure(['views/editUser'], () => {
                    resolve(require('views/editUser'));
                });
            },
        },
        // {
        //     path: '/test',
        //     name: 'test',
        //     // component: require('views/editUser.vue')
        //     component: resolve => {
        //         require.ensure(['views/test'], () => {
        //             resolve(require('views/test'))
        //         })
        //     },
        // },
        {
            path: '*',
            redirect: '/'
        }
    ],
});
router.beforeEach((to, from, next) => {
    store.dispatch('pageView', to.name);
    next();
});
module.exports = router;