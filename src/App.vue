<style lang='scss'>
    @import './assets/scss/iconfont.css';
    @import './assets/scss/main.scss';
    #app {
        min-height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        background-color: $gray-light;
    }
    .app-content {
        flex: 1;
        -webkit-flex: 1;
    }
</style>
<template>
    <div id="app">
        <div class="app-content">
            <keep-alive exclude='myAccount,activityDetail,orderDetail,editUser'>
                <router-view></router-view>
            </keep-alive>
        </div>
        <v-alert></v-alert>
        <v-confirm> </v-confirm>
        <v-loading></v-loading>
        <v-support></v-support>
    </div>
</template>
<script>
    import vLoading from 'components/vLoading.vue';
    import vAlert from 'components/vAlert.vue';
    import vConfirm from 'components/vConfirm.vue';
    import vSupport from 'components/vSupport';
    export default {
        name: 'app',
        components: {
            vLoading,
            vAlert,
            vConfirm,
            vSupport
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