module.exports = {
    user: '', // 用户信息
    title: '',
    address_list: '', // 用户地址列表
    v_alert: {
        type: 'suprise',
        show: false,
        close_btn: false,
        msg: '',
        btn_text: '',
        img: '',
        callback: function () {},
        callback_close: function () {}
    },
    v_confirm: {
        show: false,
        msg: '',
        msg_second: '',
        callback: function () {}
    },
    v_loading: {
        show: false
    }
};