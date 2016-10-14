export default {
    getParameterByName(name, url) {

            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        //设置标题
        setTitle(title) {
            document.title = title;
        },
        //获取滚动条距顶部高度
        getScrollTop() {
            let scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
        //获取可视区域高度
        getClientHeight() {
            let clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            } else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }
            return clientHeight;
        },
        //获取总高度
        getScrollHeight() {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        },
        //获取当天日期
        getToday() {
            let date=new Date();
            let today=`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
            return today;
        },
        //比较日期
        compareDate(date1, date2) {
            return new Date(date1).getTime() - new Date(date2).getTime();
        },
        //获取滚动数据
        getScrollData(list, params, func) {
            window.onscroll = () => {
                if (params.p < params.total && list.length < params.count && this.getScrollTop() + this.getClientHeight() >= this.getScrollHeight()) {
                    params.p++;
                    func();
                }
            }
        },
        setUserBase(obj) {
            window.APP.TOKEN=obj.token;
            window.APP.USER_ID = obj.user_id;
            window.APP.NICK_NAME = obj.nickname;
            window.APP.HEAD_IMG = obj.headimg;
        }
}
