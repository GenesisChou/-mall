'use strict'
import utils from 'libs/utils'
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
        '/index': { //首页
            name: 'index',
            component: require('views/index'),
        },
        '/product_list': { //首页
            name: 'product_list',
            component: require('views/product_list'),
        },
        '/product_detail': {
            name: 'product_detail',
            component: require('views/product_detail'),
        },
        '/activity_list': {
            name: 'activity_list',
            component: require('views/activity_list'),
        },
        '/activity_detail': {
            name: 'activity_detail',
            component: require('views/activity_detail'),
        },
        '/my_integral': {
            name: 'my_integral',
            component: require('views/my_integral'),
        },
        '/order_list': {
            name: 'order_list',
            component: require('views/order_list'),
        },
        '/order_detail': {
            name: 'order_detail',
            component: require('views/order_detail'),
        }
    });
    // router.beforeEach((transition) => {
    //     window.scrollTo(0, 0);
    //     const title_list = [
    //         { name: 'index', title: '坚果互动' },
    //         { name: 'my_integral', title: '用户中心' },
    //         { name: 'order_list', title: '兑换记录' },
    //         { name: 'order_detail', title: '订单详情' },
    //         { name: 'activity_list', title: '活动列表' },
    //         { name: 'activity_detail', title: '活动详情' },
    //         { name: 'product_list', title: '商品列表' },
    //         { name: 'product_detail', title: '商品详情' }
    //     ];
    //     title_list.forEach((item) => {
    //         if (item.name == transition.to.name) {
    //             var i = document.createElement('iframe');
    //             i.src = '//m.baidu.com/favicon.ico';
    //             i.style.display = 'none';
    //             i.onload = function() {
    //                 setTimeout(function() {
    //                     i.remove();
    //                 }, 9)
    //             }
    //             document.body.appendChild(i);
    //             utils.setTitle(item.title);


    //         }
    //     })
    //     transition.next();
    // })

}
