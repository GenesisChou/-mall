
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import RouterConfig from './router'
import FastClick from 'fastclick'
Vue.use(VueResource);
Vue.use(VueRouter);
FastClick.attach(document.body);
let router = new VueRouter();
RouterConfig(router);
router.start(App, '#app');
