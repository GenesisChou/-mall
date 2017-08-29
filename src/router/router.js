import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
Vue.use(VueRouter);
const router = new VueRouter({
    // mode: 'history',
    routes: [{
            path: '/',
            name: 'index',
            component: require('views/index')
        }, {
            path: '/product_list',
            name: 'product_list',
            component: require('views/productList')
        }, {
            path: '/product_detail',
            name: 'product_detail',
            component: require('views/productDetail')
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            component: require('views/activityDetail')
        }, {
            path: '/integral_details',
            name: 'integral_details',
            component: require('views/integralDetails')

        }, {
            path: '/order_list',
            name: 'order_list',
            component: require('views/orderList')
        }, {
            path: '/order_detail',
            name: 'order_detail',
            component: require('views/orderDetail')
        }, {
            path: '/subject_detail',
            name: 'subject_detail',
            component: require('views/subjectDetail')
        },
        {
            path: '/earn_integral',
            name: 'earn_integral',
            component: require('views/earnIntegral')
        },
        {
            path: '/edit_user',
            name: 'edit_user',
            component: require('views/editUser')
        },
        {
            path: '/my_awards',
            name: 'my_awards',
            component: require('views/myAwards')
        },
        {
            path: '/qr_code',
            name: 'qr_code',
            component: require('views/qrCode')
        },
        {

            path: '/user',
            name: 'user',
            component: require('views/user')
        },
        {
            path: '/wish',
            name: 'wish',
            component: require('views/wish'),
            children: [{
                path: 'wish_wall',
                name: 'wish_wall',
                component: require('views/wish/children/wishWall')
            }, {
                path: 'my_wish',
                name: 'my_wish',
                component: require('views/wish/children/myWish')
            }, {
                path: 'wish_list',
                name: 'wish_list',
                component: require('views/wish/children/wishList')
            }, {
                path: 'publish_wish',
                name: 'publish_wish',
                component: require('views/wish/children/publishWish')
            }, {
                path: 'wish_detail',
                name: 'wish_detail',
                component: require('views/wish/children/wishDetail')
            }]
        }, {
            path: '/games',
            component: require('views/games'),
            children: [{
                    path: 'ship',
                    component: require('views/games/children/ship'),
                    children: [{
                            path: '',
                            component: require('views/games/children/ship/children/start')
                        }, {
                            path: 'rulers',
                            component: require('views/games/children/ship/children/rulers')
                        },
                        {
                            path: 'main',
                            component: require('views/games/children/ship/children/main')
                        }
                    ]
                }

            ]
        }, {
            path: '*',
            redirect: '/'
        }
    ],
});
router.beforeEach((to, from, next) => {
    if (store.state.v_alert.show === true) {
        store.dispatch('toggleAlert');
    }
    if (store.state.v_confirm.show === true) {
        store.dispatch('toggleConfirm');
    }
    if (store.state.v_loading.show === true) {
        store.dispatch('toggleLoading');
    }
    if (from && from.name) {
        store.dispatch('currentPageView', from.name);
    }
    store.dispatch('pageView', to.name);
    next();
});
router.afterEach(route => {});
module.exports = router;