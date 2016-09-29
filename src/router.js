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
        '/goods-list': { //首页
            name: 'goods-list',
            component: require('views/goods-list'),
        },
        '/goods-detail': {
            name: 'goods-detail',
            component: require('views/goods-detail'),
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
        '/exchange-list': {
            name: 'exchange-list',
            component: require('views/exchange-list'),
        },
        '/exchange-detail': {
            name: 'exchange-detail',
            component: require('views/exchange-detail'),
        }
    });
    router.beforeEach((transition)=>{
      window.scrollTo(0,0);
      transition.next();
    })

}
