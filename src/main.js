
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import routerMap from './router'

Vue.use(VueRouter);
Vue.use(Mint);
Vue.use(VueResource);

let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
routerMap(router);
router.start(App, '#app');