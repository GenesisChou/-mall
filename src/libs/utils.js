const utils = {
    login(media_id, type = 1, page, id, origin) {
        let link = APP.MALL_HOST;
        if (origin) {
            link += `&origin=${origin}`;
        }
        if (page === 'product_detail') {
            const back = utils.getParameterByName('back'),
                product_id = id || utils.getParameterByName('product_id');
            link += `&page=product_detail&product_id=${product_id}`;
            if (back) {
                link += `&back=${back}`;
                if (back === 'subject_detail') {
                    const subject_id = utils.getParameterByName('subject_id');
                    link += `&subject_id=${subject_id}`;
                }
            }
        } else if (page === 'activity_detail') {
            const activity_id = id || utils.getParameterByName('activity_id');
            link += `&page=activity_detail&activity_id=${activity_id}`;
        } else if (page === 'subject_detail') {
            const subject_id = id || utils.getParameterByName('subject_id');
            link += `&page=subject_detail&subject_id=${subject_id}`;
        } else if (page === 'order_detail') {
            const order_id = id || utils.getParameterByName('order_id');
            link += `&page=order_detail&order_id=${order_id}`;
        } else if (page === 'wish_detail') {
            const wish_id = id || utils.getParameterByName('wish_id');
            link += `&page=wish_detail&wish_id=${wish_id}`;
        } else if (page === 'games') {
            const game_id = id || utils.getParameterByName('game_id');
            link += `&page=games&game_id=${game_id}`;
        }
        if (type === 1) {
            location.href = `${APP.HOST}/weixin/${media_id}?callback=${link}`;
        } else if (type === 2) {
            location.href = `${APP.HOST}/show_weixin/${media_id}?callback=${link}`;
        }
    },
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
    },
    isIos() {
        const u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    },
    isAndroid() {
        const u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    }
};
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = utils : window.utils = utils;