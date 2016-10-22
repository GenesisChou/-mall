<style lang='sass'>
@import './assets/scss/main.scss';
</style>
<template>
    <div id='app'>
        <router-view></router-view>
    </div>
</template>
<script>
import store from 'v_vuex/store'
import actions from 'v_vuex/actions'
import getters from 'v_vuex/getters'
export default {
    created() {
            this.getUserInfor();
            this.init();
        },
        methods: {
            init() {
                // let scale = 1 / devicePixelRatio;
                // document.querySelector('meta[name="viewport"]').setAttribute('content', `width=device-width,initial-scale=${scale}, maximum-scale=${scale} , minimum-scale=${scale} , user-scalable=no`);
                document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;

            }
        },
        store,
        vuex:{
            actions,
            getters
        }
}
</script>
