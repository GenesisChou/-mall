<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
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
        @include justify-content(space-between);
        height: pxTorem(92);
        margin: 0 pxTorem(24);
        padding: 0 pxTorem(16);
        border-bottom: 1px solid $gray-light;
        font-size: pxTorem(34);
        input {
            @include flex;
            border: none;
        }
        span {
            color: #a9aaae;
        }
    }
    
    .flow-box {
        @include flexbox;
        @include justify-content(space-between);
        @include align-content(space-between);
        @include flex-wrap(wrap);
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
            <ul v-if='state=="ready"' class='flow-box'>
                <li class='ready' v-for='(flow,$index) in flow_list'>{{flow}}</li>
            </ul>
            <ul v-else class='flow-box'>
                <li v-show='flow_infor.flows' class='active'>{{flow_infor.flows}}</li>
            </ul>
            <h4 class='notice'>即时生效,当月有效,(充值高峰可能出现延迟)。</h4>
        </main>
        <footer>
            <div class='exchange btn-orange' @click='exchange'>立即兑换
                <template>
                    :<span>50积分</span>
                    <s>¥5.9</s>
                </template>
            </div>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'recharge',
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
                flow_infor: {},
            }
        },
        computed: {
            company() {
                return this.flow_infor.company || '';
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
                    this.flow_infor = {};
                }
            }
        },
        methods: {
            exchange() {
                if (this.state != 'active') return;
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
        }


    };
</script>