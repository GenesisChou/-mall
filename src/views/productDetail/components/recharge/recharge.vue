<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .banner {
        width: pxTorem(750);
        height: pxTorem(420);
    }
    
    main {
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
    }
    
    .form-control {
        @include flex-center-v;
        justify-content: space-between;
        height: pxTorem(92);
        margin: 0 pxTorem(24);
        padding: 0 pxTorem(16);
        border-bottom: 1px solid $gray-light;
        font-size: pxTorem(34);
        input {
            flex:1;
            border: none;
        }
        span {
            color: #a9aaae;
        }
    }
    
    .flow-box {
        display:flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap;
        min-height: pxTorem(284);
        padding: pxTorem(30) pxTorem(40) 0 pxTorem(40);
        list-style: none;
        li {
            @include flex-center;
            width: pxTorem(211);
            height: pxTorem(116);
            border: 1px solid #a9aaae;
            border-radius: pxTorem(10);
            font-size: pxTorem(36);
            list-style: none;
            &.ready {
                color: $orange;
                border-color: $orange;
            }
            &.active {
                color: $white;
                background-color: $orange;
                border-color: $orange;
            }
            &:nth-child(3),
            &:nth-child(6) {
                margin-right: 0;
            }
        }
    }
    
    .notice {
        line-height: pxTorem(100);
        text-align: center;
    }
    
    .exchange {
        @include flex-center;
        height: pxTorem(112);
        margin: pxTorem(55) pxTorem(35);
        border-radius: pxTorem(10);
        font-size: pxTorem(36);
        span {
            padding: 0 pxTorem(15);
        }
        s {
            color: #c5c5c5;
            font-size: pxTorem(24);
            transform: scale(0.9);
        }
    }
    
    .popup-content {
        padding-bottom: pxTorem(35);
        background-color: $gray-light;
        h1 {
            text-align: center;
            line-height: pxTorem(114);
            color: #3d4244;
            background-color: $white;
        }
        ul {
            background-color: $white;
            list-style: none;
            margin-bottom: pxTorem(35);
        }
        li {
            @include flex-center-v;
            height: pxTorem(96);
            margin: 0 pxTorem(25);
            list-style: none;
            border-top: 1px solid $gray-light;
            color: #646565;
        }
        strong {
            padding: 0 pxTorem(45) 0 pxTorem(8);
            color: #646565;
            font-weight: 400;
        }
        .integral {
            color: $orange;
        }
        .exchange {
            margin: 0 pxTorem(35);
        }
    }
</style>
<template>
    <div class='recharge '>
        <img class='banner' src='./images/rechargeBanner.png'></img>
        <main>
            <div class='form-control'>
                <input type='tel' v-model='phone' autofocus>
                <span>{{company}}</span>
            </div>
            <ul v-if='!flow_infor' class='flow-box'>
                <li class='ready' v-for='(flow,$index) in flow_list'>{{flow}}</li>
            </ul>
            <ul v-else class='flow-box'>
                <li v-show='flow_infor.flows' class='active'>{{flow_infor.flows}}</li>
            </ul>
            <h4 class='notice'>即时生效,当月有效,(充值高峰可能出现延迟)。</h4>
        </main>
        <footer>
            <div class='exchange btn-orange' @click='togglePopup'>立即兑换
                <template v-if='flow_infor'>
                    :<span>{{productDetail.integral>>0}}积分</span>
                    <s>¥{{productDetail.price}}</s>
                </template>
            </div>
        </footer>
        <v-popup :show='popup_show' :toggle-popup='togglePopup'>
            <div class='popup-content'>
                <h1>确认支付</h1>
                <ul>
                    <li>
                        <strong>手机号码</strong> {{phone}}
                    </li>
                    <li>
                        <strong>重制流量</strong> {{flow_infor.flows}}
                    </li>
                    <li>
                        <strong>消耗积分</strong> <span class='integral'>{{productDetail.integral>>0}}积分</span>
                    </li>
                </ul>
                <footer class='footer'>
                    <div class='exchange btn-orange' @click='exchange'>确认兑换</div>
                </footer>
            </div>
        </v-popup>
    </div>
</template>
<script>
    import vPopup from 'components/vPopup.vue';
    export default {
        name: 'recharge',
        components: {
            vPopup
        },
        props: {
            productDetail: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                flow_list: [
                    '30M',
                    '70M',
                    '150M',
                    '500M',
                    '1024M',
                    '2048M'
                ],
                phone: '',
                state: 'ready',
                flow_infor: '',
                in_exchange: false,
                popup_show: false
            }
        },
        computed: {
            company() {
                return this.flow_infor ? this.flow_infor.company : '';
            }
        },
        watch: {
            phone(value) {
                this.state = /^1[34578]\d{9}$/.test(value) ?
                    'active' : 'ready';
            },
            state(value, old_value) {
                if (value == 'active' && old_value == 'ready') {
                    this.getFlows();
                } else if (value == 'ready') {
                    this.flow_infor = '';
                }
            }
        },
        methods: {
            exchange() {
                if (this.in_exchange) return;
                this.in_exchange = true;
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/exchange_flows_recharge/${this.phone}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    product_id: this.productDetail.id,
                    companytype: this.flow_infor.companytype,
                    flows: this.flow_infor.flows
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data,
                        msg = '';
                    if (data.status == APP.SUCCESS) {
                        msg = data.data.message;
                    } else {
                        msg = data.info;
                    }
                    this.$store.dispatch('toggleAlert', {
                        msg,
                        callback: () => {
                            this.in_exchange = false;
                        }
                    })
                }, () => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            getFlows() {
                this.$http.post(`${APP.HOST}/check_flows_phone/${this.phone}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.flow_infor = data.data;
                    }
                });
            },
            togglePopup() {
                if (this.state != 'active') return;
                this.popup_show = !this.popup_show;
            }
        }


    };
</script>