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
    touchBottom(){
      var utils=this;
      return utils.getScrollTop() + utils.getClientHeight() >= utils.getScrollHeight();
    },
    setSessionStorage(key,obj){
      sessionStorage.setItem(key,JSON.stringify(obj));
    },
    getSessionStorage(key){
      return JSON.parse(sessionStorage.getItem(key));
    },
    setLocalStorage(key,obj){
      localStorage.setItem(key,JSON.stringify(obj));
    },
    getLocalStorage(key){
      return JSON.parse(localStorage.getItem(key));
    },
    // 防抖函数
    debounce(callback,delay){
      var timer;
      return function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
          callback();
        },delay);
      };
    },
};
