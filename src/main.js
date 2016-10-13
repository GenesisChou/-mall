import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import RouterConfig from './router'
import FastClick from 'fastclick'
import filters from 'libs/filters'
import utils from 'libs/utils'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueTouch);
Vue.http.options.emulateJSON = true;
FastClick.attach(document.body);
let router = new VueRouter();
RouterConfig(router);




window.APP = {
    HOST: 'http://integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://imall.justtong.com', //
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    USER_ID: 0,
    NICK_NAME: '',
    HEAD_IMG: ''
};
if (!localStorage.token) {
    if (utils.getParameterByName('token')) {
        localStorage.tocken = utils.getParameterByName('token');
        localStorage.user_id = utils.getParameterByName('userid');
        localStorage.media_id = utils.getParameterByName('mediaid');
        localStorage.nickname = utils.getParameterByName('nickname');
        localStorage.headimg = utils.getParameterByName('headimg');
		utils.setUserBase();
    } else {
        let redirect = encodeURIComponent(APP.MALL_HOST);
        let id = utils.getParameterByName('id');
        location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
    }
} else {
	utils.setUserBase();
}
router.start(App, '#app');
