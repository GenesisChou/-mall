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
// if (!utils.getParameterByName('token')) {
//     var redirect = encodeURIComponent(APP.MALL_HOST);
//     var id = utils.getParameterByName('id');
//     if (localStorage[id + '-token']) {
//         startApp(id);
//     } else {
//         location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}`;
//     }
// } else {
//     startApp();
// }
if (!utils.getParameterByName('token')) {
    var redirect = encodeURIComponent(APP.MALL_HOST);
    var id = utils.getParameterByName('id');
    var activity_id=utils.getParameterByName('activity_id');
    if(activity_id){
      console.log(`${APP.HOST}/weixin/${id}?callback=${redirect}&activity_id=${activity_id}`);
      location.href = `${APP.HOST}/weixin/${id}?callback=${redirect}&activity_id=${activity_id}`;
    }else{
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
        window.APP.IMALL_TITLE = utils.getParameterByName('imall_title');
        window.APP.OPEN_ID = utils.getParameterByName('open_id');
        // localStorage[window.APP.MEDIA_ID + '-token'] = window.APP.TOKEN;
        // localStorage[window.APP.MEDIA_ID + '-user_id'] = window.APP.USER_ID;
        // localStorage[window.APP.MEDIA_ID + '-media_id'] = window.APP.MEDIA_ID;
        // localStorage[window.APP.MEDIA_ID + '-imall-title'] = window.APP.IMALL_TITLE;
        // localStorage[window.APP.MEDIA_ID + '-oepn_id'] = window.APP.OPEN_ID;
    } else {
        window.APP.TOKEN = localStorage[id + '-token'];
        window.APP.USER_ID = localStorage[id + '-user_id'];
        window.APP.MEDIA_ID = localStorage[id + '-media_id'];
        window.APP.IMALL_TITLE = localStorage[id + '-imall-title'];
        window.APP.OPEN_ID = localStorage[id + '-open_id'];
    }
    console.log('login success');
    // console.log(window.APP);
    utils.setTitle(window.APP.IMALL_TITLE);
    FastClick.attach(document.body);
    //配置微信jsdk
    wxConfig(wx, store);
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata

    Vue.http.options.headers = {
        "Token-Key": window.APP.TOKEN,
        "Media-Id": window.APP.MEDIA_ID
    };
    // Vue.http.headers['fuck'] = 'Basic YXBpOnBhc3N3b3Jk';
    new Vue({
        el: '#app',
        render: h => h(App),
        router,
        store
    })
}
