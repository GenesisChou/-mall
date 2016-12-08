import utils from 'libs/utils.js';
window.APP = {
    APP_NAME: '积分兑换',
    HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    LOGO:'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg',
    SUCCESS: 10000, //服务端返回成功状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: '',
};
if (!utils.getParameterByName('token')) {
    var redirect = encodeURIComponent(APP.MALL_HOST);
    var id = utils.getParameterByName('id');
    var token=localStorage[id + '-token'];
    var link=`${APP.HOST}/weixin/${id}?callback=${redirect}`;
    var activity_id=utils.getParameterByName('activity_id');
    if(token){
      link=link+'&token='+token;
    }
    if(activity_id){
      link=link+'&activity_id='+activity_id;
    }
    location.href=link;
} else {
    startApp();
}
function startApp() {
    var Vue=require('vue');
    var VueResource=require('vue-resource');
    var store=require('./vuex/store.js');
    var FastClick=require('fastclick');
    var wxConfig=require('./wx_config');
    window.APP.TOKEN = utils.getParameterByName('token');
    window.APP.USER_ID = utils.getParameterByName('userid');
    window.APP.MEDIA_ID = utils.getParameterByName('mediaid');
    window.APP.IMALL_TITLE = utils.getParameterByName('imall_title');
    window.APP.OPEN_ID = utils.getParameterByName('open_id');
    localStorage[window.APP.MEDIA_ID + '-token'] = window.APP.TOKEN;
    console.log('login success');
    if(window.APP.IMALL_TITLE){
      utils.setTitle(window.APP.IMALL_TITLE);
    }else{
      utils.setTitle(window.APP.APP_NAME);
    }
    FastClick.attach(document.body);
      //配置微信jsdk
    wxConfig().init('first');
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
    new Vue({
        el: '#app',
        render: h => h(require('./APP.vue')),
        router:require('./router.js'),
        store
    });
}
