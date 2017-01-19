<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    .order-detail {
        min-height: 100%;
        overflow: hidden;
        background-color: $gray-light;
        .v-order {
            border: 0;
            margin-bottom: 0;
        }
        .introduction {
            padding: pxTorem(20);
            margin: 0;
            &:last-child {
                padding: pxTorem(20) pxTorem(40);
                border-bottom: 1px solid $gray-light;
                box-sizing: border-box;
                li {
                    list-style: none;
                }
            }
        }
        .ticket {
            border-top: 1px solid $gray-light;
            border-bottom: 1px solid $gray-light;
            .ticket-box {
                width: pxTorem(608);
                height: pxTorem(66);
                line-height: pxTorem(66);
                border: 1px solid $red;
                padding-left: pxTorem(20);
                margin: pxTorem(40) auto;
                background-color: #fefafa;
            }
        }
    }
    
    .single-button {
        padding: pxTorem(20) pxTorem(75);
        a {
            display: block;
            text-align: center;
            color: $white;
        }
    }
    
    .address-selected {
        position: relative;
        padding: pxTorem(55) pxTorem(70) pxTorem(55) 0;
        font-size: pxTorem(28);
        border-top: 1px solid $gray-light;
        border-bottom: 1px solid $gray-light;
        overflow: hidden;
        background-color: $white;
        .location {
            width: pxTorem(110);
            text-align: center;
            line-height: pxTorem(110);
        }
        .arrows {
            position: absolute;
            right: pxTorem(15);
            top: 50%;
            transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
        }
        .address-content {
            line-height: pxTorem(55);
            label {
                margin-right: pxTorem(10);
            }
        }
    }
    
    .input-box {
        padding: pxTorem(30);
        input {
            width: pxTorem(500);
            border: 1px solid $gray-light;
            color: $sliver;
            text-indent: pxTorem(20);
        }
        .btn {
            font-size: pxTorem(26);
            padding-left: pxTorem(15);
            padding-right: pxTorem(15);
        }
        .btn-receive{
            background-color:$gray;
        }
    }
</style>
<template>
    <div v-if='loaded' class='order-detail '>
        <!-- 订单详情 -->
        <v-order :img='order_detail.product_pic' :id='order_detail.orderid' :integral='order_detail.integral>>0' :name='order_detail.product'>
            <!--商品为虚拟物品时 -->
            <template v-if='is_virtual'>
                <!--商品为优惠券时 -->
                <div v-if='product_type==1||product_type==6' class='ticket'>
                    <div class='ticket-box'>
                        <span class='text-large'>优惠券:</span>
                        <span class='text-red text-huge'>
                            <template v-if='product_type==1'>
                                {{order_detail.ticket_id}}
                            </template>
                            <template v-if='product_type==6'>
                                {{product_detail.ticket_id}}
                            </template>
                        </span>
                    </div>
                </div>
                <v-simditor>
                    <v-divider v-if='product_detail.content_use' text='使用说明'></v-divider>
                    <article v-if='product_detail.content_use' class='introduction' v-html='product_detail.content_use'> </article>
                    <v-divider text='重要声明'></v-divider>
                    <ul class='introduction'>
                        <li>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </li>
                        <li>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </li>
                        <li>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </li>
                        <li>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</li>
                    </ul>
                </v-simditor>
                <div v-if='product_type==5' class='single-button'>
                    <a class='btn btn-red btn-block btn-large ' :href='product_detail.url'> 前往使用 </a>
                </div>
            </template>
            <!-- 商品为实物时 -->
            <template v-else>
                <!-- 取货类型为快递 -->
                <template v-if='send_type==1'>
                    <!-- 无地址 -->
                    <template v-if='order_detail.status==1&&!address_list.length'>
                        <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit'></v-address-edit>
                        <div class='single-button'>
                            <button class='btn btn-red btn-block btn-large ' @click='toggleEdit'>+ 请填写收货地址</button>
                        </div>
                    </template>
                    <!-- 有地址 -->
                    <template v-else>
                        <section class='address-selected ' @click='toggleSelect'>
                            <div class='location pull-left'>
                                <i class='iconfont icon-location  text-huge'></i>
                            </div>
                            <div class='address-content clearfix'>
                                <p>
                                    <span> <label>收货信息:</label>{{default_address.contact}}</span>
                                    <span class='pull-right'>{{default_address.phone}}</span>
                                </p>
                                <p>
                                    <label>收货地址:</label> {{default_address.province}} {{default_address.city}} {{default_address.country}}
                                    {{default_address.address}}
                                </p>
                                <div v-if='!order_checked' class='arrows'>
                                    <i class='iconfont icon-arrows-right text-bold text-huge'></i>
                                </div>
                            </div>
                        </section>
                        <!-- 物流信息 -->
                        <!-- status!=1时为已确认地址 -->
                        <v-logistics v-if='order_detail.status!=1' :order-detail='order_detail'></v-logistics>
                        <div v-if='!order_checked' class='single-button'>
                            <button class='btn btn-red btn-block btn-large ' @click='updateOrderAddress'>确认地址</button>
                        </div>
                        <v-address-select :show='popup_select' :toggle-popup='toggleSelect' :default-id='default_address.id>>0'></v-address-select>
                    </template>
                </template>
                <!-- 取货类型为自取时 -->
                <template v-if='send_type==2'>
                    <div class='address-selected '>
                        <div class='location pull-left'>
                            <i class='iconfont icon-location  text-huge'></i>
                        </div>
                        <div class='address-content clearfix'>
                            <p>
                                <label>取货地址:</label> {{order_detail.take_address}}
                            </p>
                        </div>
                    </div>
                    <v-divider text='输入取货码'></v-divider>
                    <form class='input-box'>
                        <input type="text">
                        <button v-if='order_detail.status==3' class='btn btn-red pull-right text-normal' @click='receiveOrder'>确认</button>
                        <button v-else class='btn  pull-right text-normal'>已取货</button>
                    </form>
                    <v-simditor>
                        <v-divider v-if='product_detail.content_use' text='领取说明'></v-divider>
                        <article v-if='product_detail.content_use' class='introduction' v-html='product_detail.content_use'> </article>
                        <v-divider text='重要声明'></v-divider>
                        <ul class='introduction'>
                            <li>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </li>
                            <li>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </li>
                            <li>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </li>
                            <li>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</li>
                        </ul>
                    </v-simditor>
                </template>
            </template>
        </v-order>
    </div>
</template>
<script>
    import vOrder from 'components/order/vOrder.vue'
    import vLogistics from 'components/order/vLogistics.vue'
    import vAddressEdit from 'components/order/vAddressEdit.vue'
    import vAddressSelect from 'components/order/vAddressSelect.vue'
    export default {
        name: 'order_detail',
        components: {
            vOrder,
            vLogistics,
            vAddressEdit,
            vAddressSelect
        },
        data() {
            return {
                order_id: '',
                order_detail: {},
                product_detail: {},
                product_id: '',
                product_type: '',
                send_type: '',
                confirm: false,
                popup_edit: false,
                popup_select: false,
                loaded: false,
            };
        },
        computed: {
            is_virtual() {
                return this.product_type && this.product_type != 2;
            },
            address_list() {
                return this.$store.state.address_list || [];
            },
            //订单地址确认状态
            order_checked() {
                return this.order_detail.status != 1;
            },
            default_address() {
                let temp = {
                    province: '',
                    city: '',
                    country: '',
                    address: '',
                    phone: '',
                    contact: ''
                };
                //订单类型为快递
                if (this.send_type != 1) return temp;
                if (this.order_detail.status == 1) {
                    //若订单未确认 从地址列表内选取默认地址
                    this.address_list.forEach((address) => {
                        if (address.is_defaults == 1) {
                            temp = address;
                            return;
                        }
                    })
                } else {
                    //订单已确认,从订单详情内获取指定地址
                    temp.contact = this.order_detail.contact;
                    temp.phone = this.order_detail.phone;
                    temp.province = this.order_detail.province;
                    temp.city = this.order_detail.city;
                    temp.country = this.order_detail.country;

                }
                return temp;
            },
        },
        watch: {
            order_id() {
                this.getOrderDetail().then(() => {
                    let data = this.order_detail;
                    this.product_id = data.product_id;
                    this.product_type = data.product_type;
                    this.send_type = data.send_type;
                });
            },
            //order_type  1商品兑换 2活动
            //product_type 1优惠券唯一码 2实物 3积分赠送 4谢谢参与 5优惠券链接 6优惠券通用码
            //status  1未确认地址 2已确认地址 3已发货
            //send_type 1快递 2自提
            product_type(value) {
                if (value == 1 || value == 2 || value == 5 || value == 6) {
                    this.getProductDetail().then(() => {
                        this.loaded = true;
                    });
                } else {
                    this.loaded = true;
                }
            },
            send_type(value) {
                if (value == 1 && this.product_type == 2 && this.order_detail.status == 1) {
                    this.$store.dispatch('getAddressList');
                }
            }
        },
        created() {
            this.order_id = this.$route.query.order_id;
        },
        methods: {
            getOrderDetail() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/order_detail/${this.order_id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        let data = response.data;
                        this.order_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    })
                })
            },
            //获取订单内商品详情
            getProductDetail() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/product_detail/${this.product_id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        this.product_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {

                    })

                })
            },
            //确认订单地址
            updateOrderAddress() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/update_order_address/${this.order_id}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    id: this.default_address.id
                }).then((response) => {
                    let data = response.data;
                    this.$store.dispatch('toggleLoading');
                    if (data.status == APP.SUCCESS) {
                        this.getOrderDetail();
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');

                })
            },
            //领取订单
            receiveOrder() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/update_order_address/${this.order_id}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    id: this.default_address.id
                }).then((response) => {
                    let data = response.data;
                    this.$store.dispatch('toggleLoading');
                    if (data.status == APP.SUCCESS) {
                        this.getOrderDetail();
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');

                })
            },
            toggleEdit() {
                this.popup_edit = !this.popup_edit;
            },
            toggleSelect() {
                if (!this.order_checked) {
                    this.popup_select = !this.popup_select;
                }
            }
        }


    };
</script>