<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-logistics {
        margin-top: pxTorem(20);
        background-color: $white;
        font-size: pxTorem(28);
        .title {
            line-height: pxTorem(90);
            padding-left: pxTorem(70);
            border-bottom: 1px solid #d3d4d6;
            color: $orange;
        }
        .main {
            li {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                display: -webkit-flex;
                -webkit-align-items: center;
                -webkit-justify-content: center;
                list-style: none;
                height: pxTorem(120);
            }
            .circle {
                position: relative;
                width: pxTorem(20);
                height: pxTorem(20);
                margin: 0 pxTorem(40);
                z-index: 1;
            }
            .line {
                position: absolute;
                left: pxTorem(180+98/2);
                top: pxTorem(-120/2);
                width: 1px;
                height: pxTorem(120);
                background-color: #d3d4d6;
                z-index: 0;
            }
        }
        .date {
            width: pxTorem(180);
            text-align: right;
        }
        .detail {
            flex: 1;
            -webkit-flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #a9aaae;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: pxTorem(24);
            &.active {
                color: $red;
            }
        }
    }
</style>
<template>
    <div v-if='!is_expired' class='v-logistics'>
        <header>
            <h4 class='title'>
                {{message}}
            </h4>
        </header>
        <ul class='main'>
            <li v-if='is_shiped' v-for='(item,$index) in logistics_list'>
                <div class='date'>
                    <h5><strong>{{item.datetime | getTime}}</strong></h5>
                    <h6>{{item.datetime | getDate}}</h6>
                </div>
                <img class='circle' src='./images/circleArrow.png'></img>
                <i v-show='$index>0' class='line'></i>
                <div class='detail'> {{item.remark}} </div>
            </li>
            <li v-if='!is_shiped'>
                <div class='date'>
                    <h5><strong>{{orderDetail.update_time | getTime}}</strong></h5>
                    <h6>{{orderDetail.update_time | getDate}}</h6>
                </div>
                <img class='circle' src='./images/circleArrow.png'></img>
                <div class='detail'> 仓库正在打包，请耐心等待! </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            orderDetail: Object
        },
        data() {
            return {
                logistics_detail: {}
            }
        },
        filters: {
            getDate(value) {
                return value.split(' ')[0];
            },
            getTime(value) {
                return value.split(' ')[1];
            }
        },
        computed: {
            order_id() {
                return this.orderDetail.id;
            },
            is_shiped() {
                return this.orderDetail.status == 3;
            },
            is_expired() {
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
        mounted() {
            if (this.is_shiped) {
                this.getOderExpress();
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