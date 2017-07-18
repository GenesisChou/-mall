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
                    this.$store.dispatch('getQrCode', qr_code => {
                        if (qr_code.qr_code_pic && qr_code.qr_code_tips) {
                            if (APP.ORIGIN === 'menu') {
                                this.setGuideState(data.data);
                                if (data.data.first_login === 1) {
                                    this.loginRecord();
                                }
                            }
                        } else {
                            this.setGuideState(data.data);
                            if (data.data.first_login === 1) {
                                this.loginRecord();
                            }
                        }
                    });
                } else {
                    utils.deleteLocalStorage(APP.MEDIA_ID);
                    utils.reloadApp();
                }
            });
            const page = utils.getParameterByName('page');
            if (page) {
                let query = {};
                if (page === 'product_detail') {
                    const product_id = utils.getParameterByName('product_id'),
                        back = utils.getParameterByName('back');
                    query = {
                        product_id,
                    };
                    if (back) {
                        query.back = back;
                    }
                } else if (page === 'activity_detail') {
                    const activity_id = utils.getParameterByName('activity_id');
                    query = {
                        activity_id,
                    };
                } else if (page === 'subject_detail') {
                    const subject_id = utils.getParameterByName('subject_id');
                    query = {
                        subject_id,
                    };
                } else if (page === 'order_detail') {
                    const order_id = utils.getParameterByName('order_id');
                    query = {
                        order_id,
                    };
                }
                this.$router.push({
                    name: page,
                    query
                });
            }
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