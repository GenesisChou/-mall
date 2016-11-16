import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router.js'
import utils from 'libs/utils.js'
import store from 'v_vuex/store.js'
import FastClick from 'fastclick'
import wx from 'weixin-js-sdk'
import wxConfig from './wx_config'
window.APP = {
    APP_NAME: '积分兑换',
    HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: '',
};
if (!utils.getParameterByName('token')) {
    //进行微信登陆操作
    var redirect = encodeURIComponent(APP.MALL_HOST);

    var id = utils.getParameterByName('id');
    if (localStorage[id+'-token']) {
        startApp(id);

    } else {
        location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
    }
} else {
    startApp();
}

function startApp(id) {
    if (!id) {
        //first login
        window.APP.TOKEN = utils.getParameterByName('token');
        window.APP.USER_ID = utils.getParameterByName('userid');
        window.APP.MEDIA_ID = utils.getParameterByName('mediaid');
        localStorage[window.APP.MEDIA_ID+'-token']=window.APP.TOKE;
        localStorage[window.APP.MEDIA_ID+'-user_id']=window.APP.USER_ID;
        localStorage[window.APP.MEDIA_ID+'-media_id']=window.APP.MEDIA_ID;
    } else {
        window.APP.TOKEN=localStorage[id+'-token'];
        window.APP.USER_ID=localStorage[id+'-user_id'];
        window.APP.MEDIA_ID=localStorage[id+'-media_id'];
    }
    console.log('login success');
    FastClick.attach(document.body);
    //配置微信jsdk
    wxConfig(wx, store);
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
    new Vue({
        el: '#app',
        render: h => h(App),
        router,
        store
    })
}
