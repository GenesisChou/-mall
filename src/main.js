import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import Vuex from 'vuex'
import RouterConfig from './router'
import FastClick from 'fastclick'
import filters from 'libs/filters'
import utils from 'libs/utils'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueTouch);

FastClick.attach(document.body);
let router = new VueRouter();
RouterConfig(router);
Vue.http.options.emulateJSON = true;//设置vue-resource post请求参数类型为formdata




window.APP = {
    HOST: 'http://integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://imall.justtong.com', //服务器域名
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    USER_ID: 1,
    NICK_NAME: '',
    HEAD_IMG: ''
};
if (!localStorage.token) {
    //若授权码不存在
    if (!utils.getParameterByName('token')) {
        //进行微信登陆操作
        let redirect = encodeURIComponent(APP.MALL_HOST);
        let id = utils.getParameterByName('id');
        location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
    } else {
        //第一次登陆  将数据存入localstorage中，再为全局变量赋值，用于后续的request操作
        console.log('login success');
        localStorage.token = utils.getParameterByName('token');
        localStorage.user_id = utils.getParameterByName('userid');
        localStorage.media_id = utils.getParameterByName('mediaid');
        localStorage.nickname = utils.getParameterByName('nickname');
        localStorage.headimg = utils.getParameterByName('headimg');
        utils.setAppBase(localStorage);
        router.start(App, '#app');
    }
} else {
    utils.setAppBase(localStorage);
    router.start(App, '#app');
}

