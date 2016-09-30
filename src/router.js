'use strict'

export default function(router) {
    router.map({
        '/': { //首页
            name: 'index',
            component: require('views/index'),

        },
        /* 404路由 */
        '*': {
            component: require('views/index'),
        },
        '/test':{//组件测试
            name:'test',
            component:require('views/test')
        },
        '/index': { //首页
            name: 'index',
            component: require('views/index'),
        },
        '/product-list': { //首页
            name: 'product-list',
            component: require('views/product-list'),
        },
        '/product-detail': {
            name: 'product-detail',
            component: require('views/product-detail'),
        },
        '/activity-list': {
            name: 'activity-list',
            component: require('views/activity-list'),
        },
        '/activity-detail': {
            name: 'activity-detail',
            component: require('views/activity-detail'),
        },
        '/my-integral': {
            name: 'my-integral',
            component: require('views/my-integral'),
        },
        '/order-list': {
            name: 'order-list',
            component: require('views/order-list'),
        },
        '/order-detail': {
            name: 'order-detail',
            component: require('views/order-detail'),
        }
    });
    router.beforeEach((transition)=>{
      window.scrollTo(0,0);
      transition.next();
    })

}
