<style lang='scss'>
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
            vConfirm,
        },
        created() {
            this.$store.dispatch('getUserInfor', (response) => {
                const data = response.data;
                if (data.status === APP.SUCCESS) {
                    console.log('login success');
                    // this.setGuideState(data.data);
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
                    utils.deleteLocalStorage(APP.MEDIA_ID);
                    utils.reloadApp();
                }
            });
        },
        mounted() {
            this.$store.dispatch('getTitle', (response) => {
                document.title = response.data.data.imall_title;
            });
        },
        methods: {
            loginRecord() {
                const redirect = encodeURIComponent(APP.MALL_HOST);
                this.$http.get(`${APP.HOST}/weixin/${APP.MEDIA_ID}?callback=${redirect}&token=${APP.TOKEN}`);
            },
            setGuideState(user) {
                this.$store.dispatch('updateGuideState', (user.first_login === 1 ? 'guide-account' : ''));
            }
        }
    };
</script>