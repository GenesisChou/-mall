<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .order-list {
        min-height: 100%;
        padding-top: pxTorem(20);
    }
    
    .tabs {
        display: flex;
        display: -webkit-flex;
        background-color: $white;
        margin-bottom: pxTorem(20);
        border-bottom: 1px solid #d3d4d6;
        li {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            -webkit-flex: 1;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            -webkit-flex-direction: column;
            height: pxTorem(128);
            text-align: center;
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
        .iconfont {
            font-size: pxTorem(50);
        }
        .badage {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
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
            -webkit-transform: scale(0.8);
            z-index: 1;
        }
    }
    
    .v-order {
        &:active {
            background-color: darken($white, 2%);
        }
    }
    
    .v-order-footer {
        padding-left: pxTorem(30);
        margin-bottom: pxTorem(20);
        line-height: pxTorem(66);
        border-top: 1px solid $gray-light;
        border-bottom: 1px solid #d3d4d6;
        color: $orange;
        background-color: $white;
    }
</style>
<template>
    <div class='order-list'>
        <ul class='tabs'>
            <li v-for='(tab,$index) in tabs' @click='switchTab($index+1)' :class='{active:$index+1==current_tab}'>
                <i :class='["iconfont",getIconType($index)]'></i>
                <h6>{{tab.name}}</h6>
                <span class='badage' v-if='$index==0&&user.unfinished_order_count>0'>{{user.unfinished_order_count}}</span>
            </li>
        </ul>
        <ul>
            <router-link v-for='order in order_list[current_type]' :to='{name:"order_detail",
                        query:{order_id:parseInt(order.id)}}' tag='li'>
                <v-order :img='order.product_pic' :id='order.orderid' :integral='order.integral>>0' :name='order.product'>
                    <h6 class='v-order-footer'>
                        {{order.tips}}
                    </h6>
                </v-order>
            </router-link>
        </ul>
        <v-load-more v-if='busy'></v-load-more>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vOrder from 'components/order/vOrder.vue'
    export default {
        name: 'orderList',
        components: {
            vOrder,
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
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            current_type() {
                return this.tabs[this.current_tab - 1].type;
            },
        },
        watch: {
            current_tab(tab) {
                let type = this.current_type;
                //显示／隐藏加载更多
                this.busy = this.params[type].total > this.params[type].p;
                //添加当前目滚动事件 解除其余项滚动事件
                this.tabs.forEach((item) => {
                    if (item.type == type) {
                        window.addEventListener('scroll', this.scroll_events[item.type]);
                    } else {
                        window.removeEventListener('scroll', this.scroll_events[item.type])
                    }
                })
                //仅当第一次切换选项卡时才执行操作 
                if (this.params[type].total) return;
                this.$store.dispatch('toggleLoading');
                this.getOrderList(tab, this.params[type]).then((data) => {
                    this.$store.dispatch('toggleLoading');
                    let p = data.data.p,
                        total = data.data.total;
                    this.params[type].total = total;
                    this.order_list[type] = this.order_list[type].concat(data.data.list);
                    if (total > p) {
                        this.busy = true;
                    }
                }).catch((data) => {
                    this.$store.dispatch('toggleLoading');
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            //当从订单详情返回至订单列表时绑定滚动事件
            next(vm => {
                window.addEventListener('scroll', vm.scroll_events[vm.current_type]);
                if (from.name == 'index') {
                    let tab = vm.current_tab,
                        type = vm.current_type;
                    vm.$store.dispatch('toggleLoading');
                    vm.getOrderList(tab, vm.params[type]).then((data) => {
                        vm.$store.dispatch('toggleLoading');
                        let p = data.data.p,
                            total = data.data.total;
                        vm.params[type].total = total;
                        vm.order_list[type] = vm.order_list[type].concat(data.data.list);
                        if (total > p) {
                            vm.busy = true;
                        }
                    }).catch((data) => {
                        vm.$store.dispatch('toggleLoading');
                    })

                }
            })
        },
        activated() {
            let position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
        },
        created() {
            this.init();
        },
        beforeRouteLeave(to, from, next) {
            //离开页面后解除滚动事件
            window.removeEventListener('scroll', this.scroll_events[this.current_type]);
            //回到主页时重置所有状态
            if (to.name == 'index') {
                this.init();
            }
            next();
        },
        methods: {
            init() {
                this.order_list.unsolved = [];
                this.order_list.untransported = [];
                this.order_list.solved = [];
                this.order_list.expired = [];
                this.tabs.forEach((item, index) => {
                    let type = item.type,
                        tab = index + 1;
                    this.params[type] = {
                        p: 1,
                        r: APP.PERPAGE,
                        total: 0,
                        token: APP.TOKEN,
                        userid: APP.USER_ID,
                        class: tab
                    }

                    this.scroll_events[type] = this.getScrollEvent(tab, this.params[type], (data) => {
                        this.order_list[type] = this.order_list[type].concat(data.data.list);
                    });
                });
                this.current_tab = 1;
            },
            getOrderList(tab, params) {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/order_list/${APP.USER_ID}/${tab}`, params).then((
                        response) => {
                        let data = response.data;
                        if (resolve) {
                            resolve(data);
                        }
                    }, (response) => {
                        if (reject) {
                            reject(data);
                        }
                    })
                })
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
            },
            getIconType($index) {
                let icon_list = ['icon-order-unsolved', 'icon-car', 'icon-order', 'icon-delete'],
                    temp = ''
                icon_list.forEach((name, index) => {
                    if (index == $index) {
                        temp = name;
                        return;
                    }
                })
                return temp;
            }
        }
    };
</script>