import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router.js'
import store from 'v_vuex/store.js'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true; //设置vue-resource post请求参数类型为formdata
// utils.setTitle(window.APP.APP_NAME);
// wxConfig(wx);
// new Vue({
//     el: '#app',
//     render: h => h(App),
//     router,
//     store
// })
const app = new Vue({
  router,
  App
})

export { app, router }
