    import Vue from 'vue'
    import App from './App'
    import VueRouter from 'vue-router'
    import VueResource from 'vue-resource'
    import Vuex from 'vuex'
    import RouterConfig from './router_config'
    import FastClick from 'fastclick'
    import utils from 'libs/utils'
    import wx from 'weixin-js-sdk'
    import wxConfig from './wx_config'
    window.APP = {
        APP_NAME: '坚果互动',
        HOST: 'http://integral.api.justtong.com/imall', //接口域名
        MALL_HOST: 'http://imall.justtong.com', //服务器域名
        SUCCESS: 10000, //服务端返回成功状态码
        PERPAGE: 20, //分页查询时每页条数
        TOKEN: '', //授权码
        MEDIA_ID: '',
    };
    if (!utils.getParameterByName('token')) {
        //进行微信登陆操作
        var redirect = encodeURIComponent(APP.MALL_HOST);
        var id = utils.getParameterByName('id');
        location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
    } else {
        Vue.use(VueResource);
        Vue.use(VueRouter);
        Vue.use(Vuex);
        FastClick.attach(document.body);
        const router = new VueRouter({
            hashbang: true,
            history: false,
            saveScrollPosition: true,
            transitionOnLoad: true
        });
        RouterConfig(router);
        Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
        console.log('login success');
        window.APP.TOKEN = utils.getParameterByName('token');
        window.APP.USER_ID = utils.getParameterByName('userid');
        window.APP.HEAD_IMG = utils.getParameterByName('headimg');
        window.APP.MEDIA_ID = utils.getParameterByName('mediaid');
        // utils.setTitle(window.APP.APP_NAME);
        wxConfig(wx);
        router.start(App, '#app');
    }
