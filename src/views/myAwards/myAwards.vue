<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    ul,
    li {
        list-style: none;
    }

    .my-awards {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
        padding-top: pxTorem(20);
    }

    .my-awards-content {
        flex: 1;
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
    <div class='my-awards'>
        <transition-group tag='ul' class='my-awards-content' name='slide-fade'>
            <li v-for='(order,$index) in award_list' @click='toOrderDetail(order)' :key='order.id'>
                <v-order :dot='order.is_read===2' :img='order.product_pic' :id='order.orderid' :integral='order.integral>>0' :name='order.product'
                    :active='true'>
                    <h6 class='v-order-footer'>
                        {{order.tips}}
                    </h6>
                </v-order>
            </li>
        </transition-group>
        <v-support></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vOrder from 'components/vOrder.vue';
    import vBackTop from 'components/vBackTop';
    export default {
        name: 'myAwards',
        components: {
            vOrder,
            vBackTop
        },
        data() {
            return {
                activity_id: '',
                award_list: []
            };
        },
        beforeRouteEnter(to, from, next) {
            //当从订单详情返回至订单列表时绑定滚动事件
            next(vm => {
                if (from.name === 'activity_detail') {
                    vm.activity_id = vm.$route.query.activity_id;
                    vm.getAwards();
                }
            });
        },
        activated() {
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            if (to.name === 'activity_detail') {
                this.activity_id = '';
                this.award_list = [];
            }
            next();
        },
        methods: {
            getAwards() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/user_activity_prize/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.award_list = data.data.list;
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            toOrderDetail(order) {
                if (order.is_read === 2) {
                    this.award_list.forEach(item => {
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