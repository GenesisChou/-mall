<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .ticket {
        margin-top: pxTorem(20);
        padding: pxTorem(20) 0;
        position: relative;
        height: pxTorem(177);
        background-image: url('../assets/images/ticket.png');
        background-size: pxTorem(748) pxTorem(167);
        background-position: 0 pxTorem(10);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        span {
            position: absolute;
            top: 50%;
            left: 40%;
            color: #646565;
            font-size: pxTorem(30);
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
        }
    }
    
    .take-goods {
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
    
    .take-goods-script {
        position: absolute;
        right: pxTorem(30);
        top: pxTorem(76);
        width: pxTorem(223);
        height: pxTorem(126);
    }
    
    .introduction,
    .announcement {
        padding: 0 pxTorem(30);
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        h3 {
            line-height: pxTorem(76);
            color: #646565;
            border-bottom: 1px solid $gray-light;
        }
        .content {
            padding: pxTorem(20) 0;
        }
    }
    
    .introduction {
        padding-bottom: pxTorem(20);
    }
    
    .single-button {
        padding: pxTorem(20) 0;
        text-align: center;
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            width: pxTorem(517);
            height: pxTorem(72);
            margin: 0 auto;
            color:$white;
        }
    }
    
    .address-box {
        background-color: $white;
        background-image: url('../assets/images/border.png');
        background-size: pxTorem(744) pxTorem(4);
        background-position: center bottom;
        background-repeat: no-repeat;
        .content {
            display: flex;
            align-items: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            height: pxTorem(164);
            padding: 0 pxTorem(30);
            margin-top: pxTorem(20);
            .address-content {
                flex: 1;
                -webkit-flex: 1;
                padding: 0 pxTorem(10);
                label {
                    margin-right: pxTorem(10);
                }
            }
            .address-detail {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            &.active {
                color: $orange;
            }
        }
    }
    
    .address-box.no-address {
        .content {
            .plus {
                width: pxTorem(80);
                height: pxTorem(80);
                border-radius: pxTorem(10);
                background-color: $orange;
                background-image: url('../assets/images/plus.png');
                background-size: pxTorem(43) pxTorem(43);
                background-position: center center;
                background-repeat: no-repeat;
            }
            .address-content {
                padding-left: pxTorem(50);
                color: #646565;
                font-size: pxTorem(32);
            }
            .arrows {
                color: $orange;
                font-size: pxTorem(36);
                font-weight: bold;
            }
        }
    }
    
    .input-box {
        padding: pxTorem(30);
        form {
            display: flex;
            display: -webkit-flex;
            width: pxTorem(618);
            height: pxTorem(75);
            background-color: #fef6f5;
            margin: 0 auto;
        }
        .form-control {
            flex: 1;
            display: flex;
            align-items: center;
            -webkit-flex: 1;
            display: -webkit-flex;
            -webkit-align-items: center;
            border: pxTorem(2) solid #f0c3c2;
        }
        label {
            color: #3d4244;
            font-size: pxTorem(32);
            padding-left: pxTorem(20);
        }
        input {
            flex: 1;
            -webkit-flex: 1;
            background: none;
            border: none;
            text-indent: pxTorem(20);
            color: #a9aaae;
            font-size: pxTorem(30);
        }
        .submit {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            width: pxTorem(165);
            height: 100%;
            background-color: #f0c3c2;
            color: $white;
            font-size: pxTorem(34);
        }
        .disable {
            background-color: $gray;
        }
    }
    
    input[type="text"]:disabled {
        background-color: $gray-light;
    }
</style>
<template>
    <div v-show='content_show' class='order-detail '>
        <!-- 订单详情 -->
        <v-order :img='order_detail.product_pic' :id='order_detail.orderid' :integral='order_detail.integral>>0' :name='order_detail.product'>
            <!--商品为虚拟物品时 -->
            <template v-if='is_virtual'>
                <!--商品为优惠券时 -->
                <template v-if='product_type==1||product_type==6'>
                    <section class='ticket'>
                        <span v-if='product_type==1'> {{order_detail.ticket_id}} </span>
                        <span v-if='product_type==6'> {{product_detail.ticket_id}} </span>
                    </section>
                </template>
                <!-- 使用说明 -->
                <section v-if='product_detail.content_use' class='introduction'>
                    <h3>使用说明</h3>
                    <div class='content'>
                        <v-simditor>
                            <article v-if='product_detail.content_use' v-html='product_detail.content_use'> </article>
                        </v-simditor>
                    </div>
                </section>
                <!-- 重要声明 -->
                <section class='announcement'>
                    <h3>重要声明</h3>
                    <div class='content'>
                        <h5>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </h5>
                        <h5>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </h5>
                        <h5>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </h5>
                        <h5>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</h5>
                    </div>
                </section>
                <div v-if='product_type==5' class='single-button'>
                    <a class='btn btn-orange' :href='product_detail.url'> 前往使用 </a>
                </div>
            </template>
            <!-- 商品为实物时 -->
            <template v-else>
                <!-- 取货类型为快递 -->
                <template v-if='send_type==1'>
                    <!-- 无地址 -->
                    <template v-if='order_detail.status==1&&!address_list.length'>
                        <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit'></v-address-edit>
                        <section class='address-box no-address'>
                            <div class='content'  @click='toggleEdit'>
                                <div class='plus'> </div>
                                <span class='address-content'>新增收货地址</span>
                                <div class='arrows'>
                                    <i class='iconfont icon-arrows-right'></i>
                                </div>
                            </div>
                        </section>
                    </template>
                    <!-- 有地址 -->
                    <template v-else>
                        <section class='address-box'>
                            <div :class='["content",{active:!order_checked}]'  @click='toggleSelect' >
                                <div class='location'>
                                    <i class='iconfont icon-location '></i>
                                </div>
                                <div class='address-content '>
                                    <h4>
                                        <span><label>收货信息:</label>{{default_address.contact}}</span>
                                        <span class='pull-right'>{{default_address.phone}}</span>
                                    </h4>
                                    <h4 class='address-detail'>
                                        <label>收货地址:</label> {{default_address.province}} {{default_address.city}} {{default_address.country}}
                                        {{default_address.address}}
                                    </h4>
                                </div>
                            </div>
                            <div v-if='!order_checked' class='single-button'>
                                <button class='btn btn-orange' @click='updateOrderAddress'>确认地址</button>
                            </div>
                        </section>
                        <!-- 物流信息 -->
                        <!-- status!=1时为已确认地址 -->
                        <v-logistics v-if='order_detail.status!=1' :order-detail='order_detail'></v-logistics>
                        <v-address-select :show='popup_select' :toggle-popup='toggleSelect' :default-id='default_address.id>>0'></v-address-select>
                    </template>
                </template>
                <!-- 取货类型为自取时 -->
                <template v-if='send_type==2'>
                    <img v-if='order_detail.status==3' class='take-goods-script' src="../assets/images/takeGoods.png" alt="">
                    <!-- 取货 -->
                    <section class='take-goods'>
                        <h5> <i class='iconfont icon-location'></i> 取货地址: {{order_detail.take_address}} </h5>
                        <main class='input-box'>
                            <form>
                                <div class='form-control'>
                                    <label for=' take-goods '>取货码:</label>
                                    <input type="text" id='take-goods' v-model='take_wordh' :disabled='order_detail.status==3||order_detail.status==4'>
                                </div>
                                <a v-if='order_detail.status==2' class='submit' @click='takeGoods'>确认</a>
                                <a v-if='order_detail.status==4' class='submit disable'>已逾期</button>
                            </form>
                        </main>
                    </section>
                    <!-- 领取说明 -->
                    <section v-if='product_detail.content_use' class='introduction'>
                        <h3>领取说明</h3>
                        <div class='content'>
                            <v-simditor>
                                <article v-if='product_detail.content_use' v-html='product_detail.content_use'> </article>
                            </v-simditor>
                        </div>
                    </section>
                    <!-- 重要声明 -->
                    <section class='announcement'>
                        <h3>重要声明</h3>
                        <div class='content'>
                            <h5>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </h5>
                            <h5>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </h5>
                            <h5>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </h5>
                            <h5>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</h5>
                        </div>
                    </section>
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
            vAddressSelect,
        },
        data() {
            return {
                order_id: '',
                order_detail: {},
                product_detail: {},
                product_id: '',
                product_type: '',
                send_type: '',
                popup_edit: false,
                popup_select: false,
                loaded: false,
                take_wordh: '',
                content_show: false,
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
            //order_type  1商品兑换 2活动
            //product_type 1优惠券唯一码 2实物 3积分赠送 4谢谢参与 5优惠券链接 6优惠券通用码
            //status  1未确认地址 2已确认地址 3已发货
            //send_type 1快递 2自提
            order_id() {
                this.content_show = false;
                this.getOrderDetail().then(() => {
                    let data = this.order_detail;
                    this.product_id = data.product_id;
                    this.product_type = data.product_type;
                    this.send_type = data.send_type;
                    this.getProductDetail().then(() => {
                        this.content_show = true;
                    })
                });
            },
            send_type(value) {
                if (value == 1 && this.product_type == 2 && this.order_detail.status == 1) {
                    this.$store.dispatch('getAddressList');
                }
            }
        },
        activated() {
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
                this.$store.dispatch('toggleConfirm',{
                    msg:'确认收货地址',
                    callback:()=>{
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
                    }

                })

             },
            //领取订单
            takeGoods() {
                 this.$store.dispatch('toggleConfirm', {
                    msg: '点击确认后不可修改',
                    msg_second:'请核对无误后点击确认!',
                    callback: () => {
                        this.$store.dispatch('toggleLoading');
                            this.$http.post(`${APP.HOST}/take_goods/${this.order_id}`, {
                                token: APP.TOKEN,
                                userid: APP.USER_ID,
                                take_word: this.take_word
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
                        }
                     });
            },
            toggleEdit() {
                this.popup_edit = !this.popup_edit;
            },
            toggleSelect() {
                if (!this.order_checked) {
                    this.popup_select = !this.popup_select;
                }
            },
        }


    };
</script>