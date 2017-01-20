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
                padding: pxTorem(40) pxTorem(35);
                border-bottom: 1px solid $gray-light;
            }
        }
    }
    
    .detail {
        margin-left: pxTorem(60);
        overflow: hidden;
        color: $gray;
        &.active {
            color: $red;
        }
        .msg {
            margin-bottom: pxTorem(5);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    
    .circle {
        width: pxTorem(20);
        height: pxTorem(20);
        margin-top: pxTorem(20);
        display: block;
        border-radius: 50%;
        float: left;
        background-color: $sliver;
        &.active {
            background-color: $red;
        }
    }
</style>
<template>
    <section v-if='!is_expired' class='v-logistics'>
        <header>
            <span>物流信息</span>
            <label>{{message}}</label>
        </header>
        <ul class='main'>
            <li v-if='is_shiped' v-for='(item,$index) in logistics_list'>
                <i :class='["circle",{active:$index==0}]'></i>
                <div :class='["detail",{active:$index==0}]'>
                    <p class='msg'>{{item.remark}} </p>
                    <h5>
                        {{item.datetime}}
                    </h5>
                </div>
            </li>
            <li v-if='!is_shiped'>
                <i class='circle'></i>
                <div class='detail'>
                    <p class='msg'>仓库正在打包，请耐心等待!</p>
                    <h5>
                        {{orderDetail.update_time}}
                    </h5>
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
        mounted() {
            if (this.is_shiped) {
                this.getOderExpress();
            }
        },
        data() {
            return {
                logistics_detail: {}
            }
        },
        computed: {
            order_id() {
                return this.orderDetail.id;
            },
            is_shiped() {
                return this.orderDetail.status == 3;
            },
            is_expired(){
                return this.orderDetail.status == 4;
            },
            message() {
                if (this.is_shiped) {
                    return this.logistics_detail.company + ' ' + this.logistics_detail.no;
                }
                return '未发货';
            },
            logistics_list() {
                return this.logistics_detail.list || [];
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
                    let data = response.data;
                    this.logistics_detail = data.data;
                    this.$store.dispatch('toggleLoading');
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })
            },
        }
    }
</script>