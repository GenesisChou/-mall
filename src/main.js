
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'

Vue.use(VueResource);
Vue.use(VueRouter);

let router = new VueRouter();
routerConfig(router);
router.start(App, '#app');
