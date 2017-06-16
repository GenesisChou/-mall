module.exports = {
    NAME: '坚果互动',
    TITLE: '积分兑换',
    //正式部署用
    APPID: 'wx8057c4704888d230',
    HOST: 'http://integral.api.justtong.com/imall', //接口域名
    MALL_HOST: 'http://imall.justtong.com', //服务器域名
    //测试用
    // APPID: 'wxda819741c7aa5b47',
    // HOST: 'http://test.integral.api.justtong.com/imall', //接口域名
    // MALL_HOST: 'http://test.imall.justtong.com', //服务器域名
    LOGO: 'http://static.justtong.com/uploads/images/goods/20161025/142505580efac1ad494.jpg',
    SUCCESS: 10000, //服务端返回成功状态码
    INTEGRAL_LACK: 40001,
    LOGIN_FAILED: 9999, //服务端返回错误状态码
    PERPAGE: 20, //分页查询时每页条数
    TOKEN: '', //授权码
    MEDIA_ID: '', //公众号id
    USER_ID: '', //用户id
    OPEN_ID: ''
};