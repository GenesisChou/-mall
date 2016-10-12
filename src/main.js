import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import RouterConfig from './router'
import FastClick from 'fastclick'
import filters from 'libs/filters'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.emulateJSON = true;
FastClick.attach(document.body);
let router = new VueRouter();
RouterConfig(router);




window.APP = {
    HOST: 'http://integral.api.justtong.com/imall',//服务端域名
    SUCCESS: 10000,//服务端返回成功状态码
    PERPAGE: 20,//分页查询时每页条数
    ISLOGIN: 0,
    USER_ID:1
};
router.start(App, '#app');
