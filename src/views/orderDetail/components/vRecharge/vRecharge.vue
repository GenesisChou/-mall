<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-recharge {
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        h5 {
            padding-left: pxTorem(30);
            line-height: pxTorem(76);
            color: $orange;
            border-bottom: 1px solid $gray-light;
            .iconfont {
                font-size: pxTorem(30);
            }
        }
    }
    
    .container {
        @include flexbox;
        padding: pxTorem(30) pxTorem(65);
    }
    
    .form-control {
        @include flex-center-v;
        @include flex;
        width: pxTorem(450);
        height: pxTorem(75);
        border: pxTorem(2) solid #f0c3c2;
        background-color: #fef6f5;
    }
    
    label {
        width: pxTorem(120);
        text-align: right;
        color: #3d4244;
        font-size: pxTorem(32);
    }
    
    input {
        @include flex;
        height: pxTorem(75);
        background: none;
        border: none;
        text-indent: pxTorem(5);
        color: $orange;
        font-size: pxTorem(30);
        text-indent: pxTorem(10);
    }
    
    .submit {
        @include flex-center;
        width: pxTorem(180);
        height: pxTorem(75);
        background-color: #f0c3c2;
        color: $white;
        font-size: pxTorem(34);
    }
    
    .script {
        position: absolute;
        right: pxTorem(30);
        top: pxTorem(76);
        width: pxTorem(223);
        height: pxTorem(126);
    }
</style>
<template>
    <section class='v-recharge'>
        <img v-if='orderDetail.status==3||orderDetail.status==4' class='script' :src='script'>
        <h5> <i class='iconfont icon-phone'></i> 输入手机号</h5>
        <main class='container'>
            <div class='form-control'>
                <label for='phone'>手机号:</label><input type='tel' id='phone' v-model='phone' placeholder='请输入' :disabled='orderDetail.status!=1'>
            </div>
            <div v-if='orderDetail.status==1' class='submit' @click='recharge'>确认</div>
            <div v-else class='submit'>{{btn_text}}</div>
        </main>
    </section>
</template>
<script>
    export default {
        name: 'vRecharge',
        props: {
            type: Number,
            orderDetail: Object,
            productDetail: Object,
            getOrderDetail: Function
        },
        data() {
            return {
                phone: ''
            }
        },
        computed: {
            btn_text() {
                switch (this.orderDetail.status) {
                    case 2:
                        return '充值等待';
                    case 3:
                        return '充值成功';
                    case 4:
                        return '返还积分';
                }
            },
            script() {
                if (this.orderDetail.status == 3) {
                    return require('./images/rechargeSuccess.png')
                } else if (this.orderDetail.status == 4) {
                    return require('./images/rechargeFaliure.png')
                }
            }
        },
        created() {
            this.phone = this.orderDetail.phone;
        },
        methods: {
            recharge() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '点击确认后不可修改',
                    msg_second: '请核对无误后点击确认!',
                    callback: () => {
                        this.$store.dispatch('toggleLoading');
                        this.$http.post(`${APP.HOST}/activity_flows_recharge/${this.orderDetail.id}`, {
                            token: APP.TOKEN,
                            userid: APP.USER_ID,
                            media_id: APP.MEDIA_ID,
                            phone: this.phone
                        }).then((response) => {
                            this.$store.dispatch('toggleLoading');
                            let data = response.data;
                            if (data.status == APP.SUCCESS) {
                                this.getOrderDetail();
                            } else {
                                this.$store.dispatch('toggleAlert', {
                                    msg: data.info
                                })
                            }
                        }, () => {
                            this.$store.dispatch('toggleLoading');
                        });
                    }
                });

            }
        },
    }
</script>