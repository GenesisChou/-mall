import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import index from './modules/index';
import wish from './modules/wish';
import games from './modules/games';
Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        index,
        wish,
        games
    }
});
module.exports = store;