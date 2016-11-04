<style lang='sass'>
@import './assets/scss/main.scss';
.fade-enter-active {
  transition: opacity .3s
}
.fade-enter {
  opacity: 0
}

</style>
<template>
    <div id="app">
        <router-view></router-view>
        <transition name='fade'>
            <v-alert v-show='v_alert.show' :msg='v_alert.msg' :callback='v_alert.callback' :type='v_alert.type' :cover-close='v_alert.cover_close' :btn-text='v_alert.btn_text'></v-alert>
        </transition>
    </div>
</template>
<script>
import vAlert from 'components/v_alert.vue'
export default {
    name: 'app',
    components: {
        vAlert
    },
    mounted() {
        this.init();
        this.$store.dispatch('getUserInfor');
        window.onresize = () => {
            this.init();
        }
    },
    computed: {
        v_alert() {
            return this.$store.state.v_alert;
        }
    },
    methods: {
        init() {
            let scale = 1 / devicePixelRatio;
            document.querySelector('meta[name="viewport"]').setAttribute('content', `width=device-width,initial-scale=${scale}, maximum-scale=${scale} , minimum-scale=${scale} ,  minimal-ui`);
            document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;

        }
    },
}
</script>
