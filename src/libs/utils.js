module.exports={
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
    //获取滚动数据
    //list:列别数据 parmas:参数 callback:回调函数
    getScrollData(list, params, callback) {
        let utils = this;
        if (typeof callback === 'function') {
            window.addEventListener('scroll', utils.debounce(function() {
                if (params.p < params.total && list.length < params.count && (utils.getScrollTop() + utils.getClientHeight() >= utils.getScrollHeight())) {
                    params.p++;
                    callback();
                }
            },500));
        }
    },
    // 防抖函数
    debounce(callback,delay){
      var timer=null;
      return function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
          callback();
        },delay);
      };
    }
};
