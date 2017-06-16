const utils = {
    isInArray(name, arr) {
        let result = false;
        arr.forEach(item => {
            if (item === name) {
                result = true;
                return;
            }
        });
        return result;
    },
    getTypeOf(value) {
        const temp = Object.prototype.toString.call(value);
        return temp.substr(0, temp.length - 1).split(/\s+/)[1];
    },
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    scrollToTop() {
        window.scrollTo(0, 0);
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
        return utils.getScrollTop() + utils.getClientHeight() === utils.getScrollHeight();
    },
    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
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
        if (type === 'day') {
            return interval / 3600 / 24;
        } else if (type === 'hour') {
            return interval / 3600;
        }
    },
    deleteLocalStorage(key) {
        localStorage.removeItem(key);
    },
    // 防抖函数
    debounce(fn, delay, mustRunDelay) {
        let timer = null,
            t_start;
        return function () {
            const context = this,
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
    syncLoadArray(result, target, time = 150) {
        let $index = 0;
        const timer = setInterval(() => {
            if ($index < target.length) {
                result.push(target[$index]);
                $index++;
            } else {
                clearInterval(timer);
            }
        }, 150);

        return result;
    },
    reloadApp() {
        window.location.reload();
    },
    pxTorem(value) {
        return value / 100 + 'rem';
    },
    preventTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    toggleTouchMove(value, element) {
        const utils = this;
        if (element) {
            if (value) {
                element.addEventListener('touchmove', utils.preventTouchMove, false);
            } else {
                element.removeEventListener('touchmove', utils.preventTouchMove, false);
            }
        } else {
            if (value) {
                document.addEventListener('touchmove', utils.preventTouchMove, false);
            } else {
                document.removeEventListener('touchmove', utils.preventTouchMove, false);
            }
        }
    }
};
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = utils : window.utils = utils;