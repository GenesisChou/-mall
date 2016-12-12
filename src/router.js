import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'index',
            component: function(resolve) {
                require(['views/index.vue'], resolve);
            }
        }, {
            path: '/index',
            name: 'index',
            component: function(resolve) {
                require(['views/index.vue'], resolve);
            }
        }, {
            path: '/product_list',
            name: 'product_list',
            component: function(resolve) {
                require(['views/product_list.vue'], resolve);
            }
        }, {
            path: '/product_detail',
            name: 'product_detail',
            component: function(resolve) {
                require(['views/product_detail.vue'], resolve);
            }
        },
        {
            path: '/activity_detail',
            name: 'activity_detail',
            component: function(resolve) {
                require(['views/activity_detail.vue'], resolve);
            }
        }, {
            path: '/my_integral',
            name: 'my_integral',
            component: function(resolve) {
                require(['views/my_integral.vue'], resolve);
            }
        }, {
            path: '/order_list',
            name: 'order_list',
            component: function(resolve) {
                require(['views/order_list.vue'], resolve);
            }
        }, {
            path: '/order_detail',
            name: 'order_detail',
            component: function(resolve) {
                require(['views/order_detail.vue'], resolve);
            }
        },
        //  {
        //     path:'/test',
        //     name:'test',
        //     component:function(resolve){
        //         require(['views/test.vue'],resolve);
        //     }
        // },

        { path: '*', redirect: '/' }
    ],
    //  mode: 'history',
    scrollBehavior (to, from, savedPosition){
      return false;
    }
});
router.beforeEach((to, from, next) => {
    // console.log(to.name);
    // console.log(from);
    store.dispatch('pageView', to.name);
    if (store.state.v_alert.show) {
        store.dispatch('toggleAlert');
    }
    if (store.state.v_confirm.show) {
        store.dispatch('toggleConfirm');
    }
    next();
});

module.exports = router;
