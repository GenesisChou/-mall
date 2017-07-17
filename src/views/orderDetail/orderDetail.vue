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
        margin-bottom: pxTorem(40);
    }


    .single-button {
        @include flex-center;
        height: pxTorem(120);
        .btn {
            width: pxTorem(517);
            height: pxTorem(72);
        }
    }

    .sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        padding: 0 pxTorem(30) pxTorem(30) pxTorem(30);
        text-align: center;
        background-color: $white;
        border-bottom: 1px solid $gray-light;
        box-shadow: 0 0 0 #000, 0 0 pxTorem(15) #ddd;
        >div {
            @include active(#ff5000, 5%);
            margin-top: pxTorem(30);
            background-color: #ff5000;
            display: block;
            width: 100%;
            height: pxTorem(100);
            line-height: pxTorem(100);
            font-size: pxTorem(40);
            color: $white;
            border-radius: pxTorem(10);
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
            @include flex-center-v; // line-height: pxTorem(86);
            padding: pxTorem(20) pxTorem(30);
            margin-top: pxTorem(20); // padding: 0 pxTorem(30);
            .address-content {
                flex: 1;
                overflow: hidden;
                .contact-phone {
                    display: flex;
                    justify-content: space-between;
                }
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
        overflow: hidden;
        h5 {
            padding: pxTorem(10) pxTorem(30);
            line-height: pxTorem(40);
            color: $orange;
            text-align: justify;
            .iconfont {
                font-size: pxTorem(30);
            }
        }
    }

    .input-box {
        border-top: 1px solid $gray-light;
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
            height: 100%;
            background: none;
            border: none;
            text-indent: 0;
            color: $orange;
            font-size: pxTorem(24);
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
            @include active(#fef6f5,
            3%);
            width: pxTorem(619);
            height: pxTorem(154);
            margin: 0 auto;
            border: 1px solid #f1d0cf;
            background-color: #fef6f5;
            color: $orange;
        }
    }

    .expand {
        @include flex-center;
        background-color: $white;
        height: pxTorem(50);
        text-align: center;
        border-top: 1px solid #d3d4d6;
        .iconfont {
            font-size: pxTorem(28);
            color: $orange;
            font-weight: bold;
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
                    <template v-if='order_detail.status===1&&product_type!==8'>
                        <v-address-edit :id='order_detail.id' :order-user.sync='order_user' :state='{show_address:order_detail.is_address===1,
                                                show_contact:order_detail.is_name===1,
                                                show_phone:order_detail.is_phone===1}' :show='update_order_show' :toggle-popup='toggleUpdateOrder'
                            :title='!order_user.contact&&!order_user.phone&&!order_user.province&&!order_user.city&&!order_user.country&&!order_user.address?"完善个人信息":"修改个人信息"'
                            btn-text='确认'></v-address-edit>
                        <div v-if='!order_user.contact&&!order_user.phone&&!order_user.province&&!order_user.city&&!order_user.country&&!order_user.address'
                            class='profile'>
                            <div class='content' @click='toggleUpdateOrder'>
                                为了更好的领取优惠，请完善您的个人信息<strong><i class='iconfont icon-arrows-right'></i></strong>
                            </div>
                        </div>
                        <section v-else class='address-box'>
                            <div :class='["content",{active:!order_checked}]' @click='toggleUpdateOrder'>
                                <div class='location'>
                                    <i :class='["iconfont", order_detail.is_name===1?"icon-user":(order_detail.is_phone===1?"icon-phone":"icon-location")]'></i>
                                </div>
                                <div class='address-content '>
                                    <h4 class='contact-phone'>
                                        <span v-if='order_detail.is_name===1'><label>收件人:</label> {{order_user.contact}}</span>
                                        <span v-if='order_detail.is_phone===1' class='pull-right'>
                                        <label v-if='order_detail.is_name!==1'>联系电话:</label> {{order_user.phone}}
                                        </span>
                                    </h4>
                                    <h4 v-if='order_detail.is_address===1' class='address-detail'>
                                        <label>收货地址:</label> {{order_user.province}} {{order_user.city}} {{order_user.country}}
                                        {{order_user.address}}
                                    </h4>
                                </div>
                                <i v-if='!order_checked' class='iconfont icon-arrows-right'></i>
                            </div>
                            <div v-if='!order_checked' class='single-button'>
                                <button class='btn btn-orange' @click='updateOrderUser'>确认信息</button>
                            </div>
                        </section>
                    </template>
                    <v-ticket v-else-if='product_type==1||product_type==6' :type='product_type' :order-detail='order_detail' :product-detail='product_detail'></v-ticket>
                    <!--商品为流量充值时 -->
                    <v-recharge v-if='product_type==8' :type='product_type' :get-order-detail='getOrderDetail' :order-detail='order_detail' :product-detail='product_detail'></v-recharge>
                    <!-- 详细说明 -->
                    <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
                    <!-- 使用说明 -->
                    <v-introduction v-if='product_detail.content_use' title='使用说明' :content='product_detail.content_use'></v-introduction>
                    <!-- 重要声明 -->
                    <v-announcement></v-announcement>
                    <div v-if='product_type==5&&order_detail.status!==1' class='sticky'>
                        <div class='exchange' @click='useTicket(product_detail.url)'> 前往使用 </div>
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
                                    <i class='iconfont icon-plus'></i>请填写收货地址</div>
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
                        <template v-if='order_detail.status===1'>
                            <v-address-edit :id='order_detail.id' :order-user.sync='order_user' :state='{show_address:order_detail.is_address===1,
                                                show_contact:order_detail.is_name===1,
                                                show_phone:order_detail.is_phone===1}' :show='update_order_show' :toggle-popup='toggleUpdateOrder'
                                :title='!order_user.contact&&!order_user.phone&&!order_user.province&&!order_user.city&&!order_user.country&&!order_user.address?"完善个人信息":"修改个人信息"'
                                btn-text='确认'></v-address-edit>
                            <div v-if='!order_user.contact&&!order_user.phone&&!order_user.province&&!order_user.city&&!order_user.country&&!order_user.address'
                                class='profile'>
                                <div class='content' @click='toggleUpdateOrder'>
                                    为了更好的领取优惠，请完善您的个人信息<strong><i class='iconfont icon-arrows-right'></i></strong>
                                </div>
                            </div>
                            <section v-else class='address-box'>
                                <div :class='["content",{active:!order_checked}]' @click='toggleUpdateOrder'>
                                    <div class='location'>
                                        <i :class='["iconfont", order_detail.is_name===1?"icon-user":(order_detail.is_phone===1?"icon-phone":"icon-location")]'></i>
                                    </div>
                                    <div class='address-content '>
                                        <h4 class='contact-phone'>
                                            <span v-if='order_detail.is_name===1'><label>收件人:</label> {{order_user.contact}}</span>
                                            <span v-if='order_detail.is_phone===1' class='pull-right'>
                                        <label v-if='order_detail.is_name!==1'>联系电话:</label> {{order_user.phone}}
                                        </span>
                                        </h4>
                                        <h4 v-if='order_detail.is_address===1' class='address-detail'>
                                            <label>收货地址:</label> {{order_user.province}} {{order_user.city}} {{order_user.country}}
                                            {{order_user.address}}
                                        </h4>
                                    </div>
                                    <i v-if='!order_checked' class='iconfont icon-arrows-right'></i>
                                </div>
                                <div v-if='!order_checked' class='single-button'>
                                    <button class='btn btn-orange' @click='updateOrderUser'>确认信息</button>
                                </div>
                            </section>

                        </template>
                        <img v-if='order_detail.status===3' class='take-goods-script' src="./images/takeGoods.png" alt="">
                        <!-- 取货 -->
                        <section v-if='order_detail.status!==1' class='take-goods'>
                            <h5 v-show='$index<address_limit_num' v-for='(address,$index) in take_address'> <i class='iconfont icon-location'></i> 取货地址: {{address}} </h5>
                            <template v-if='take_address.length>2'>
                                <div class='expand' @click='expandAddress(address_limit_num===2?take_address.length:2)'>
                                    <i :class='["iconfont", address_limit_num===2?"icon-arrows-down":"icon-arrows-up"]'></i>
                                </div>
                            </template>
                            <main class='input-box' v-if='order_detail.status!=3&&product_detail.take_word'>
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
                        <v-announcement></v-announcement>
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
            vLogistics: require('./components/vLogistics'),
            vAddressEdit: require('./components/vAddressEdit'),
            vIntroduction: require('components/vIntroduction'),
            vAnnouncement: require('./components/vAnnouncement'),
            vTicket: require('./components/vTicket'),
            vRecharge: require('./components/vRecharge'),
            vAddressSelect: require('./components/vAddressSelect')
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
                update_order_show: false,
                order_user: {
                    contact: '',
                    phone: '',
                    province: '',
                    province_id: '',
                    city: '',
                    city_id: '',
                    country: '',
                    country_id: '',
                    address: ''
                },
                address_limit_num: 2
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
            take_address() {
                if (this.order_detail && this.order_detail.take_address) {
                    return this.order_detail.take_address.split('\n');
                }
                return [];
            },
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            //order_type  1商品兑换 2活动
            //product_type 1优惠券唯一码 2实物 3积分赠送 4谢谢参与 5优惠券链接 6优惠券通用码 7福袋 8流量充值
            //status  1未确认地址 2已确认地址 3已发货 4已逾期
            //send_type 1快递 2自提
            send_type(value) {
                if (value === 1 && this.product_type === 2 && this.order_detail.status === 1) {
                    this.$store.dispatch('getAddressList');
                }
            }
        },
        created() {
            this.order_id = this.$route.query.order_id;
            this.content_show = false;
            this.getOrderDetail().then(data => {
                this.product_id = data.product_id;
                this.product_type = data.product_type;
                this.send_type = data.send_type;
                this.order_user.contact = this.user.contact;
                this.order_user.phone = this.user.phone;
                this.order_user.province = this.user.province_name;
                this.order_user.province_id = this.user.province_id;
                this.order_user.city = this.user.city_name;
                this.order_user.city_id = this.user.city_id;
                this.order_user.country = this.user.country_name;
                this.order_user.country_id = this.user.country_id;
                this.order_user.address = this.user.address;
                this.getProductDetail().then(() => {
                    this.content_show = true;
                });
                if (data.status === 1 || data.status === 2) {
                    this.updateOrderRead().then(() => {
                        this.$store.dispatch('getUserInfor');
                    });
                }
            });
        },
        beforeRouteLeave(to, from, next) {
            this.$store.dispatch('updatePageView');
            next();
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
                        if (data.status === APP.SUCCESS) {
                            this.order_detail = data.data;
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info,
                                callback: () => {
                                    this.$router.push({
                                        name: 'order_list',
                                        query: {
                                            t: new Date()
                                        }
                                    });
                                }
                            });
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
                        user_id: APP.USER_ID,
                        media_id: APP.USER_ID
                    }).then((response) => {
                        const data = response.data;
                        this.product_detail = data.data;
                        if (resolve && typeof resolve === 'function') {
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
                                // this.getOrderDetail();
                                window.location.reload();
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
                                // this.getOrderDetail();
                                window.location.reload();
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
            toggleUpdateOrder() {
                this.update_order_show = !this.update_order_show;
            },
            updateOrderUser() {
                this.$store.dispatch('toggleConfirm', {
                    msg: '点击确认后不可修改',
                    msg_second: '请核对无误后点击确认!',
                    callback: () => {
                        this.$store.dispatch('toggleLoading');
                        this.$http.post(`${APP.HOST}/update_order_user/${this.order_id}`, {
                            token: APP.TOKEN,
                            user_id: APP.USER_ID,
                            contact: this.order_user.contact,
                            phone: this.order_user.phone,
                            province: this.order_user.province,
                            province_id: this.order_user.province_id,
                            city: this.order_user.city,
                            city_id: this.order_user.city_id,
                            country: this.order_user.country,
                            country_id: this.order_user.country_id,
                            address: this.order_user.address,
                        }).then((response) => {
                            const data = response.data;
                            this.$store.dispatch('toggleLoading');
                            if (data.status === APP.SUCCESS) {
                                window.location.reload();
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
            expandAddress(num = 2) {
                this.address_limit_num = num;
            },
            shrinkAddress() {
                this.address_limit_num = 2;
            },
            updateOrderRead() {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/update_order_read/${this.order_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then(response => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        } else {
                            if (reject && typeof reject === 'function') {
                                reject(data);
                            }
                        }
                    });
                });
            },
        }
    };
</script>