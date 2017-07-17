<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .order-list {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
        padding-top: pxTorem(20);
    }

    .order-list-content {
        flex: 1;
    }

    .tabs {
        display: flex;
        background-color: $white;
        margin-bottom: pxTorem(20);
        border-bottom: 1px solid #d3d4d6;
        li {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            height: pxTorem(128);
            padding-bottom: pxTorem(10);
            padding-top: pxTorem(5);
            list-style: none;
            position: relative;
            &.active {
                color: $orange;
                &:before {
                    content: '';
                    position: absolute;
                    left: 17.5%;
                    bottom: 0;
                    width: 65%;
                    height: pxTorem(4);
                    background-color: $orange;
                }
            }
        }
        .icon {
            width: pxTorem(74);
            height: pxTorem(74);
            background: url('./images/icons.png') no-repeat;
            background-size: pxTorem(320) pxTorem(204);
        }
        .icon.unsolved {
            background-position: pxTorem(10) pxTorem(-110);
            &.active {
                background-position: pxTorem(10) pxTorem(-31);
            }
        }
        .icon.untransported {
            background-position: pxTorem(-80) pxTorem(-110);
            &.active {
                background-position: pxTorem(-80) pxTorem(-31);
            }
        }
        .icon.solved {
            background-position: pxTorem(-170) pxTorem(-110);
            &.active {
                background-position: pxTorem(-170) pxTorem(-31);
            }
        }
        .icon.expired {
            background-position: pxTorem(-260) pxTorem(-110);
            &.active {
                background-position: pxTorem(-260) pxTorem(-31);
            }
        }

        h6 {
            margin-top: pxTorem(-10);
        }
        .badage {
            @include flex-center;
            width: pxTorem(36);
            height: pxTorem(36);
            position: absolute;
            right: pxTorem(50);
            top: pxTorem(10);
            color: $orange;
            border-radius: 50%;
            text-align: center;
            box-sizing: content-box;
            border: pxTorem(3) solid $orange;
            background-color: #ffffff;
            font-size: pxTorem(24);
            transform: scale(0.8);
            z-index: 1;
        }
    }

    .v-order-footer {
        padding: 0 pxTorem(30);
        margin-bottom: pxTorem(20);
        line-height: pxTorem(66);
        border-top: 1px solid $gray-light;
        border-bottom: 1px solid #d3d4d6;
        color: $orange;
        background-color: $white;
        text-align: justify;
    }
</style>
<template>
    <div class='order-list'>
        <div class='order-list-content'>
            <ul class='tabs'>
                <li v-for='(tab,$index) in tabs' @click='switchTab($index+1)' :class='{active:$index+1==current_tab}'>
                    <div :class='["icon",tab.type,{active:$index+1==current_tab}]'></div>
                    <h6>{{tab.name}}</h6>
                    <span class='badage' v-if='$index==0&&order_list["unsolved"].length>0'>{{order_list['unsolved'].length}}</span>
                </li>
            </ul>
            <transition-group tag='ul' class='list' name='slide-fade'>
                <li v-for='(order,$index) in order_list[current_type]' @click='toOrderDetail(order)' :key='order.id'>
                    <v-order :dot='current_type==="unsolved"&&order.is_read===2' :img='order.product_pic' :id='order.orderid' :integral='order.integral>>0'
                        :name='order.product' :active='true'>
                        <h6 class='v-order-footer'>
                            {{order.tips}}
                        </h6>
                    </v-order>
                </li>
            </transition-group>
        </div>
        <v-support :busy='busy'></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vOrder from 'components/vOrder.vue';
    import vBackTop from 'components/vBackTop';
    export default {
        name: 'orderList',
        components: {
            vOrder,
            vBackTop
        },
        data() {
            return {
                order_list: {
                    unsolved: [],
                    untransported: [],
                    solved: [],
                    expired: [],
                },
                current_tab: 0,
                current_type: '',
                params: {},
                scroll_events: {},
                tabs: [{
                    type: 'unsolved',
                    name: '待处理'
                }, {
                    type: 'untransported',
                    name: '待发货'
                }, {
                    type: 'solved',
                    name: '已完成'
                }, {
                    type: 'expired',
                    name: '已逾期'
                }],
                busy: false,
                has_entered: false,
                router_state: ''
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        beforeRouteEnter(to, from, next) {
            //当从订单详情返回至订单列表时绑定滚动事件
            next(vm => {
                if (from.name !== 'order_detail' || !vm.has_entered || vm.$route.query.t) {
                    vm.init();
                    vm.switchTab(1);
                    vm.has_entered = true;
                }
                if (vm.$store.state.v_alert.show === true) {
                    vm.$store.dispatch('toggleAlert');
                }
                window.addEventListener('scroll', vm.scroll_events[vm.current_type]);
            });
        },
        activated() {
            this.router_state = 'enter';
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.router_state = 'leave';
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            window.removeEventListener('scroll', this.scroll_events[this.current_type]);
            this.$store.dispatch('updatePageView');
            next();
        },
        methods: {
            init() {
                this.order_list.unsolved = [];
                this.order_list.untransported = [];
                this.order_list.solved = [];
                this.order_list.expired = [];
                this.tabs.forEach((item, index) => {
                    const type = item.type,
                        tab = index + 1;
                    this.params[type] = {
                        p: 1,
                        r: APP.PERPAGE,
                        total: 0,
                        token: APP.TOKEN,
                        userid: APP.USER_ID,
                        class: tab
                    };
                    this.scroll_events[type] = this.getScrollEvent(tab, this.params[type], (data) => {
                        this.order_list[type] = this.order_list[type].concat(data.data.list);
                    });
                });
            },
            getOrderList(tab, params) {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/order_list/${APP.USER_ID}/${tab}`, params).then((
                        response) => {
                        const data = response.data;
                        if (resolve && typeof resolve === 'function') {
                            resolve(data);
                        }
                    }, (response) => {
                        const data = response.data;
                        if (reject && typeof reject === 'function') {
                            reject(data);
                        }
                    });
                });
            },
            //获取对应的滚动事件
            getScrollEvent(tab, params, success, failure) {
                let scroll = true;
                return utils.debounce(() => {
                    this.busy = params.total > params.p;
                    if (scroll && this.busy && utils.touchBottom()) {
                        scroll = false;
                        params.p++;
                        this.getOrderList(tab, params).then((data) => {
                            success(data);
                            scroll = true;
                        }).catch((data) => {
                            failure(data);
                        });
                    }
                }, 500, 500);
            },
            switchTab(tab) {
                this.current_tab = tab;
                this.current_type = this.tabs[this.current_tab - 1].type;
                const type = this.current_type;
                //显示／隐藏加载更多
                this.busy = this.params[type].total > this.params[type].p;
                //添加当前目滚动事件 解除其余项滚动事件
                this.tabs.forEach((item) => {
                    if (item.type === type) {
                        window.addEventListener('scroll', this.scroll_events[item.type]);
                    } else {
                        window.removeEventListener('scroll', this.scroll_events[item.type]);
                    }
                });
                if (this.params[type].total) return;
                this.$store.dispatch('toggleLoading');
                this.getOrderList(tab, this.params[type]).then((data) => {
                    this.$store.dispatch('toggleLoading');
                    const p = data.data.p,
                        total = data.data.total;
                    this.params[type].total = total;
                    this.order_list[type] = this.order_list[type].concat(data.data.list);
                    if (total > p) {
                        this.busy = true;
                    }
                }).catch((data) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            toOrderDetail(order) {
                if (this.current_type === 'unsolved' && order.is_read === 2) {
                    this.order_list['unsolved'].forEach(item => {
                        if (item.id === order.id) {
                            item.is_read = 1;
                        }
                    });
                }
                this.$router.push({
                    name: 'order_detail',
                    query: {
                        order_id: order.id >> 0
                    }
                });
            },
        }
    };
</script>