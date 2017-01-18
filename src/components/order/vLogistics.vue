<style lang='sass' scoped>
    @import '../../assets/scss/variable.scss';
    .v-logistics {
        background-color: $white;
        font-size: pxTorem(28);
        header {
            height: pxTorem(90);
            line-height: pxTorem(90);
            padding: 0 pxTorem(100);
            border-bottom: 1px solid $gray-light;
            label {
                float: right;
            }
        }
        .main {
            li {
                list-style: none;
                padding: pxTorem(40) 0 pxTorem(40) pxTorem(120);
                border-bottom: 1px solid $gray-light;
                .iconfont {
                    line-height: pxTorem(87);
                }
                .detail {
                    margin-left: pxTorem(60);
                    overflow: hidden;
                    .msg {
                        margin-bottom: pxTorem(5);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
            }
        }
    }
</style>
<template>
    <section class='v-logistics'>
        <header>
            <span>物流信息</span>
            <label>{{status_str}}</label>
        </header>
        <ul class='main'>
            <li v-for='item in logistics'>
                <i class='iconfont icon-car  text-huge pull-left'></i>
                <div class='detail'>
                    <p class='msg'>{{item.remark}} </p>
                    <p class='text-gray text-normal'>
                        {{item.datetime}}
                    </p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
    export default {
        props: {
            orderDetail: Object
        },
        created() {
            this.getOderExpress();
        },
        data() {
            return {
                logistics: []
            }
        },
        computed: {
            order_id() {
                return this.orderDetail.id;
            },
            status_str() {
                return this.orderDetail.status_str;
            }
        },
        methods: {
            //获取物流信息
            getOderExpress() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/order_express_trace/${this.order_id}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID
                }).then((response) => {
                    this.logistics = response.data.data;
                    this.$store.dispatch('toggleLoading');
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })
            },
        }
    }
</script>