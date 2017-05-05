<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .order-detail {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .order-detail-content {
        flex: 1;
    }


    .single-button {
        @include flex-center;
        height: pxTorem(120);
        &.bg-white {
            margin-top: pxTorem(20);
            background-color: $white;
        }
        .btn {
            width: pxTorem(517);
            height: pxTorem(72);
        }
    }

    .address-box {
        background-color: $white;
        background-image: url('./images/border.png');
        background-size: pxTorem(744) pxTorem(4);
        background-position: center bottom;
        background-repeat: no-repeat;
        .location {
            width: pxTorem(73);
            .iconfont {
                font-size: pxTorem(30);
            }
        }
        .content {
            @include flex-center-v;
            height: pxTorem(157);
            margin-top: pxTorem(20);
            padding: 0 pxTorem(30);
            .address-content {
                flex: 1;
                overflow: hidden;
            }
            .address-detail {
                @include text-ellipsis(2);
                text-align: justify;
                color: #646565;
            }
            .icon-arrows-right {
                font-weight: bold;
                font-size: pxTorem(32);
                width: pxTorem(60);
                text-align: right;
            }
            &.active {
                color: $orange;
                .address-detail {
                    color: $orange;
                }
            }
        }
        .single-button {
            border-top: 1px solid $gray-light;
        }
    }

    .address-box.no-address {
        .content {
            .plus {
                width: pxTorem(80);
                height: pxTorem(80);
                border-radius: pxTorem(10);
                background-color: $orange;
                background-image: url('./images/plus.png');
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

    .input-box {
        padding: pxTorem(30);
        .container {
            display: flex;
            padding-left: pxTorem(20);
            overflow: hidden;
        }
        .form-control {
            @include flex-center-v;
            flex: 1;
            float: left;
            height: pxTorem(75);
            padding-left: pxTorem(30);
            border: 1px solid #f0c3c2;
            background-color: #fef6f5;
            &.disable {
                background-color: $gray-light;
                border: 1px solid $gray;
            }
        }
        label {
            color: #3d4244;
            font-size: pxTorem(32);
            width: pxTorem(120);
        }
        input {
            width: pxTorem(300);
            background: none;
            border: none;
            text-indent: 0;
            color: $orange;
            font-size: pxTorem(20);
        }
        .submit {
            float: left;
            height: pxTorem(75);
            padding: 0 pxTorem(50);
            line-height: pxTorem(75);
            background-color: #f0c3c2;
            color: $white;
            font-size: pxTorem(34);
        }
        .disable {
            background-color: $gray;
        }
    }

    .take-goods-script {
        position: absolute;
        right: pxTorem(30);
        top: pxTorem(76);
        width: pxTorem(223);
        height: pxTorem(126);
    }

    .profile {
        margin-top: pxTorem(20);
        padding: pxTorem(23) 0;
        background-color: $white;
        .iconfont {
            font-size: pxTorem(30);
            margin-right: pxTorem(12);
        }
        .content {
            @include flex-center;
            @include active(#fef6f5,3%);
            width: pxTorem(619);
            height: pxTorem(154);
            margin: 0 auto;
            border: 1px solid #f1d0cf;
            background-color: #fef6f5;
            color: $orange;
        }
    }
</style>
<template>
    <div v-show='content_show' class='order-detail '>
        <div class='order-detail-content'>
            <!-- 订单详情 -->
            <v-order :img='order_detail.product_pic' :id='order_detail.orderid' :integral='order_detail.integral>>0' :name='order_detail.product'
                :has-border='true'>
                <!--商品为虚拟物品时 -->
                <template v-if='is_virtual'>
                    <!--商品为优惠券时 -->
                    <v-ticket v-if='product_type==1||product_type==6' :type='product_type' :order-detail='order_detail' :product-detail='product_detail'></v-ticket>
                    <!--商品为流量充值时 -->
                    <v-recharge v-if='product_type==8' :type='product_type' :get-order-detail='getOrderDetail' :order-detail='order_detail' :product-detail='product_detail'></v-recharge>
                    <!-- 详细说明 -->
                    <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
                    <!-- 使用说明 -->
                    <v-introduction v-if='product_detail.content_use' title='使用说明' :content='product_detail.content_use'></v-introduction>
                    <!-- 重要声明 -->
                    <v-announcement :has-border='product_type==5'></v-announcement>
                    <div v-if='product_type==5' class='single-button bg-white'>
                        <button class='btn btn-orange' @click='useTicket(product_detail.url)'> 前往使用 </button>
                    </div>
                </template>
                <!-- 商品为实物时 -->
                <template v-else>
                    <!-- 取货类型为快递 -->
                    <template v-if='send_type==1'>
                        <!-- 无地址 -->
                        <template v-if='order_detail.status==1&&!address_list.length'>
                            <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit'></v-address-edit>
                            <div class='profile'>
                                <div class='content' @click='toggleEdit'>
                                    <i class='iconfont icon-plus'></i>完善个人信息
                                </div>
                            </div>
                        </template>
                        <!-- 有地址 -->
                        <template v-else>
                            <section class='address-box'>
                                <div :class='["content",{active:!order_checked}]' @click='toggleSelect'>
                                    <div class='location'>
                                        <i class='iconfont icon-location '></i>
                                    </div>
                                    <div class='address-content '>
                                        <h4>
                                            <span><label>收件人:</label> {{default_address.contact}}</span>
                                            <span class='pull-right'>{{default_address.phone}}</span>
                                        </h4>
                                        <h4 class='address-detail'>
                                            <label>收货地址:</label> {{default_address.province}} {{default_address.city}} {{default_address.country}}
                                            {{default_address.address}}
                                        </h4>
                                    </div>
                                    <i v-if='!order_checked' class='iconfont icon-arrows-right'></i>
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
                        <img v-if='order_detail.status==3' class='take-goods-script' src="./images/takeGoods.png" alt="">
                        <!-- 取货 -->
                        <section class='take-goods'>
                            <h5> <i class='iconfont icon-location'></i> 取货地址: {{order_detail.take_address}} </h5>
                            <main class='input-box' v-if='order_detail.status!=3'>
                                <div class='container'>
                                    <div :class='["form-control",{disable:order_detail.status==4}]'>
                                        <label for='take-goods'>取货码:</label>
                                        <input type="text" id='take-goods' placeholder='到达取货地址后,由商家输入' v-model='take_code' :disabled='order_detail.status==4'>
                                    </div>
                                    <div v-if='order_detail.status==2' class='submit' @click='takeGoods'>确认</div>
                                    <div v-if='order_detail.status==4' class='submit disable'>已逾期</div>
                                </div>
                            </main>
                        </section>
                        <!-- 详细说明 -->
                        <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
                        <!-- 领取说明 -->
                        <v-introduction v-if='product_detail.content_use' title='领取说明' :content='product_detail.content_use'></v-introduction>
                        <!-- 重要声明 -->
                        <v-announcement :has-border='false'></v-announcement>
                    </template>
                </template>
            </v-order>
        </div>
        <v-support></v-support>
    </div>
</template>
<script>
    import vOrder from 'components/vOrder.vue';
    export default {
        name: 'orderDetail',
        components: {
            vOrder,
            vLogistics: (resolve) => {
                require(['./components/vLogistics'], resolve);
            },
            vAddressEdit: (resolve) => {
                require(['./components/vAddressEdit'], resolve);
            },
            vIntroduction: (resolve) => {
                require(['components/vIntroduction'], resolve);
            },
            vAnnouncement: (resolve) => {
                require(['./components/vAnnouncement'], resolve);
            },
            vTicket: (resolve) => {
                require(['./components/vTicket'], resolve);
            },
            vRecharge: (resolve) => {
                require(['./components/vRecharge'], resolve);
            },
            vAddressSelect: (resolve) => {
                require(['./components/vAddressSelect'], resolve);
            },
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
                take_code: '',
                content_show: false,
            };
        },
        computed: {
            is_virtual() {
                return this.product_type && this.product_type !== 2;
            },
            address_list() {
                return this.$store.state.address_list || [];
            },
            //订单地址确认状态
            order_checked() {
                return this.order_detail.status !== 1;
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
                if (this.send_type !== 1) return temp;
                if (this.order_detail.status === 1) {
                    //若订单未确认 从地址列表内选取默认地址
                    this.address_list.forEach((address) => {
                        if (address.is_defaults === 1) {
                            temp = address;
                            return;
                        }
                    });
                } else {
                    //订单已确认,从订单详情内获取指定地址
                    temp.contact = this.order_detail.contact;
                    temp.phone = this.order_detail.phone;
                    temp.province = this.order_detail.province;
                    temp.city = this.order_detail.city;
                    temp.country = this.order_detail.country;
                    temp.address = this.order_detail.address;
                }
                return temp;
            },
        },
        watch: {
            //order_type  1商品兑换 2活动
            //product_type 1优惠券唯一码 2实物 3积分赠送 4谢谢参与 5优惠券链接 6优惠券通用码 7福袋 8流量充值
            //status  1未确认地址 2已确认地址 3已发货
            //send_type 1快递 2自提
            order_id() {
                this.content_show = false;
                this.getOrderDetail().then(() => {
                    const data = this.order_detail;
                    this.product_id = data.product_id;
                    this.product_type = data.product_type;
                    this.send_type = data.send_type;
                    this.getProductDetail().then(() => {
                        this.content_show = true;
                    });
                });
            },
            send_type(value) {
                if (value === 1 && this.product_type === 2 && this.order_detail.status === 1) {
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
                        const data = response.data;
                        this.order_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            //获取订单内商品详情
            getProductDetail() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/product_detail/${this.product_id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        const data = response.data;
                        this.product_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {

                    });
                });
            },
            //确认订单地址
            updateOrderAddress() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '确认收货地址',
                    callback: () => {
                        this.$store.dispatch('toggleLoading');
                        this.$http.post(`${APP.HOST}/update_order_address/${this.order_id}`, {
                            token: APP.TOKEN,
                            userid: APP.USER_ID,
                            id: this.default_address.id
                        }).then((response) => {
                            const data = response.data;
                            this.$store.dispatch('toggleLoading');
                            if (data.status === APP.SUCCESS) {
                                this.getOrderDetail();
                            } else {
                                this.$store.dispatch('toggleAlert', {
                                    msg: data.info
                                });
                            }
                        }, (response) => {
                            this.$store.dispatch('toggleLoading');
                        });
                    }
                });
            },
            //领取订单
            takeGoods() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '点击确认后不可修改',
                    msg_second: '请核对无误后点击确认!',
                    callback: () => {
                        this.$store.dispatch('toggleLoading');
                        this.$http.post(`${APP.HOST}/take_goods/${this.order_id}`, {
                            token: APP.TOKEN,
                            userid: APP.USER_ID,
                            take_word: this.take_code
                        }).then((response) => {
                            const data = response.data;
                            this.$store.dispatch('toggleLoading');
                            if (data.status === APP.SUCCESS) {
                                this.getOrderDetail();
                            } else {
                                this.$store.dispatch('toggleAlert', {
                                    msg: data.info
                                });
                            }
                        }, (response) => {
                            this.$store.dispatch('toggleLoading');
                        });
                    }
                });
            },
            useTicket(url) {
                // event.preventDefault();
                location.href = url;
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