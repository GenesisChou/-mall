<style lang='sass'>
@import './assets/scss/iconfont/iconfont.css';
@import './assets/scss/main.scss';
</style>
<template>
    <div id="app">
        <router-view></router-view>
        <v-alert :show='v_alert.show' :msg='v_alert.msg' :callback='v_alert.callback' :type='v_alert.type' :cover-close='v_alert.cover_close' :btn-text='v_alert.btn_text'></v-alert>
        <v-confirm :show='v_confirm.show' :msg='v_confirm.msg' :callback='v_confirm.callback'></v-confirm>
        <v-loading :show='v_loading.show'></v-loading>
    </div>
</template>
<script>
import vAlert from 'components/v_alert.vue'
import vConfirm from 'components/v_confirm.vue'
import vLoading from 'components/v_loading.vue'
export default {
    name: 'app',
    components: {
        vAlert,
        vConfirm,
        vLoading
    },
    mounted() {
        this.$store.dispatch('getUserInfor');
        // let scale = 1 / devicePixelRatio;
        // document.querySelector('meta[name="viewport"]').setAttribute('content', `width=device-width,initial-scale=${scale}, maximum-scale=${scale} , minimum-scale=${scale} ,  minimal-ui,user-scalable=no`);
        document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;
    },
    computed: {
        v_alert() {
            return this.$store.state.v_alert;
        },
        v_confirm() {
            return this.$store.state.v_confirm;
        },
        v_loading() {
            return this.$store.state.v_loading;
        }
    }
}
</script>
