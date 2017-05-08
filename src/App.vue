<style lang='scss'>
    @import './assets/scss/iconfont.css';
    @import './assets/scss/main.scss';
    #app {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div id='app'>
        <keep-alive exclude='myAccount,activityDetail,productDetail,orderDetail,editUser'>
            <router-view></router-view>
        </keep-alive>
        <v-alert></v-alert>
        <v-confirm> </v-confirm>
        <v-loading></v-loading>
        <!--<v-support></v-support>-->
    </div>
</template>
<script>
    import vLoading from 'components/vLoading.vue';
    import vAlert from 'components/vAlert.vue';
    import vConfirm from 'components/vConfirm.vue';
    // import vSupport from 'components/vSupport';
    export default {
        name: 'app',
        components: {
            vLoading,
            vAlert,
            vConfirm,
            // vSupport
        },
        created() {
            this.$store.dispatch('getUserInfor', (response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    console.log('login success');
                    this.loginRecord();
                } else if (data.status === APP.LOGIN_FAILED) {
                    console.log(data.info);
                    utils.deleteLocalStorage(APP.MEDIA_ID);
                    utils.reloadApp();
                } else {
                    console.log(data.info);
                    this.$store.dispatch('toggleAlert', {
                        msg: '网络断开连接'
                    });
                }
            });
        },
        methods: {
            loginRecord() {
                const redirect = encodeURIComponent(APP.MALL_HOST);
                this.$http.get(`${APP.HOST}/weixin/${APP.MEDIA_ID}?callback=${redirect}`);
            }
        }
    };
</script>