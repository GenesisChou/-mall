module.exports = {
    setTitle(title) {
        document.title = title;
    },
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    //获取滚动条距顶部高度
    getScrollTop() {
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        } else if (document.body) {
            return document.body.scrollTop;
        }
        return 0;
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
    getClientWidth() {
        return window.innerWidth || Math.min(document.documentElement.clientWidth, document.body.clientWidth);
    },
    //获取总高度
    getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    touchBottom() {
        var utils = this;
        return utils.getScrollTop() + utils.getClientHeight() >= utils.getScrollHeight();
    },
    setSessionStorage(key, obj) {
        sessionStorage.setItem(key, JSON.stringify(obj));
    },
    getSessionStorage(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    setLocalStorage(key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },
    getLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    getTimeInterval(date_1, date_2, type) {
        var interval = Math.abs((date_2 - date_1) / 1000);
        if (type == 'day') {
            return interval / 3600 / 24;
        } else if (type == 'hour') {
            return integral / 3600;
        }
    },
    deleteLocalStorage(key) {
        localStorage.removeItem(key);
    },
    // 防抖函数
    debounce(fn, delay, mustRunDelay) {
        var timer = null;
        var t_start;
        return function () {
            var context = this,
                args = arguments,
                t_curr = +new Date();
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr;
            } else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        };
    },
    reloadApp() {
        location.reload();
    },
};