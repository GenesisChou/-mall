<style lang='scss'>
    @import './assets/scss/iconfont.css';
    @import './assets/scss/main.scss';
</style>
<template>
    <div id="app">
        <keep-alive exclude='activity_detail'>
            <router-view></router-view>
        </keep-alive>
        <v-alert></v-alert>
        <v-confirm> </v-confirm>
        <v-loading></v-loading>
    </div>
</template>
<script>
    import vLoading from 'components/vLoading.vue';
    import vAlert from 'components/vAlert.vue';
    import vConfirm from 'components/vConfirm.vue';
    export default {
        name: 'app',
        components: {
            vLoading,
            vAlert,
            vConfirm
        },
        created() {
            this.$store.dispatch('getUserInfor', (response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    console.log('login success');
                } else if (data.status == APP.LOGIN_FAILED) {
                    console.log(data.info);
                    utils.deleteLocalStorage(APP.MEDIA_ID);
                    utils.reloadApp();
                } else {
                    console.log(data.info);
                    this.$store.dispatch('toggleAlert', {
                        msg: '网络断开连接'
                    })
                }
            });
            document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;
        },
    }
</script>