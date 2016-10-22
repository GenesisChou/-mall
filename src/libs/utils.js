export default {
    clientWidth: document.documentElement.clientWidth,
    pxTorem(value) {
        return value * this.clientWidth / 750;
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
    //设置标题
    setTitle(title) {
        document.title = title;
        // var i = document.createElement('iframe');
        // i.src = '//m.baidu.com/favicon.ico';
        // i.style.display = 'none';
        // i.onload = function() {
        //     setTimeout(function() {
        //         i.remove();
        //     }, 9)
        // }
        // document.body.appendChild(i);

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
    //获取总高度
    getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    //获取当天日期
    getToday() {
        let date = new Date();
        let today = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
        return today;
    },
    //比较日期
    compareDate(date1, date2) {
        return (new Date(date1).getTime() - new Date(date2).getTime()) > 0 ? true : false;
    },
    //获取滚动数据
    //list:列别数据 parmas:参数 func:回调函数
    getScrollData(list, params, func) {
        if (typeof func === 'function') {
            window.addEventListener('scroll', this.debounce(() => {
                // 滚动中的真正的操作
                if (params.p < params.total && list.length < params.count && (this.getScrollTop() + this.getClientHeight() >= this.getScrollHeight())) {
                    params.p++;
                    func();
                }
            }, 250));
        }
    },
    //防抖函数
    debounce(func, wait, immediate) {
        let timeout;
        return () => {
            let self = this,
                args = arguments;
            let later = () => {
                timeout = null;
                if (!immediate) func.apply(self, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(self, args);
        };
    },

    //将宽度超过屏幕尺寸的图片宽度设为100%
    resizeImg(detail) {
        detail.content = detail.content.replace(/([a-z]+)="[\s\S]+?"/ig, function(a, b, c, d) {
            if (b === 'height') {
                return '';
            } else if (b === 'width') {
                return 'style="width:100%"';
            }
            return a;
        });
        return detail;
    }
}
