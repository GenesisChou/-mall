<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    min-height: 100%;
    overflow: hidden;
    .v-order {
        border: 0;
        margin-bottom: 0;
    }
    .introduction {
        padding: pxTorem(20);
        margin:0;
        &:last-child {
            padding:pxTorem(20) pxTorem(40);
            border-bottom: 1px solid $gray-light;
            box-sizing: border-box;
            li{
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
            line-height:pxTorem(66);
            border: 1px solid $red;
            padding-left: pxTorem(20);
            margin: pxTorem(40) auto;
            background-color: #fefafa;
        }
    }
}

.single-button {
    padding: pxTorem(20) pxTorem(75);
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
    }
    .address-content {
        line-height: pxTorem(55);
        label {
            margin-right: pxTorem(10);
        }
    }
}

.copy-ticket {
    background-color: $white;
    margin-top: pxTorem(30);
    padding: pxTorem(25) pxTorem(73);
}
</style>
<template>
    <div class='order-detail bg-base'>
        <!-- 订单详情 -->
        <v-order :order='order_detail'>
            <!--商品为优惠券时 -->
            <template v-if='product_type==1||(product_type==2&&send_type==2)||product_type==5||product_type==6'>
                <div v-if='product_type==1||product_type==6' class='ticket'>
                    <div class='ticket-box'><span class='text-large'>优惠券:</span>
                      <span v-if='product_type==1' class='text-red text-huge'>{{order_detail.ticket_id}}</span>
                      <span v-if='product_type==6' class='text-red text-huge'>{{product_detail.ticket_id}}</span>
                    </div>
                </div>
                <section v-if='product_type==2' class='address-selected '>
                    <div class='location pull-left'>
                        <i class='iconfont icon-location  text-huge'></i>
                    </div>
                    <div class='address-content clearfix'>
                        <p>
                            <label>取货地址:</label>
                            {{order_detail.take_address}}
                        </p>
                    </div>
                </section>
                <v-simditor>
                    <v-divider text='使用说明'></v-divider>
                    <article class='introduction' v-html='product_detail.content_use'> </article>
                    <v-divider text='重要声明'></v-divider>
                    <ul class='introduction'>
                        <li>1.除商品本身不能正常兑换外，商品一经兑换，积分概不退还，请用户在兑换前仔细阅读使用规则、使用说明、有效期等重要信息； </li>
                        <li>2.除活动流程出现异常外，奖品一经发放，参与活动积分概不退还，请用户在参与活动前仔细阅读活动规则、活动说明等重要信息； </li>
                        <li>3.通过非法途径获得积分后进行的正常兑换（参与活动）行为，或不按照商品使用规则进行兑换，商家有权不提供服务； </li>
                        <li>4.凡以不正当手段（包括但不限于作弊、扰乱系统、实施网络攻击等）进行兑换，平台有权终止该次兑换。</li>
                    </ul>
                </v-simditor>
            </template>
        </v-order>
        <!-- 商品为实物时 -->
        <template v-if='product_type==2'>
            <!-- 取货类型为快递 -->
            <template v-if='send_type==1'>
                <template v-if='address_list.length>0'>
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
                                <label>收货地址:</label>
                                {{default_address.province}} {{default_address.city}} {{default_address.country}} {{default_address.address}}
                            </p>
                            <div v-if='!order_checked' class='arrows'>
                                <i class='iconfont icon-arrows-right text-bold text-huge'></i>
                            </div>
                        </div>
                    </section>
                    <!-- 物流信息 -->
                    <v-logistics :order-id='parseInt(order_id)' :status='order_detail.status' :status-str='order_detail.status_str'></v-logistics>
                    <div v-if='!order_checked' class='single-button'>
                        <button class='btn btn-red btn-block btn-large ' @click='updateOrderAddress'>确认地址</button>
                    </div>
                    <v-address-select :show='popup_select' :toggle-popup='toggleSelect' :default-id='parseInt(default_id)'></v-address-edit>
                </template>
                <!-- 无地址 -->
                <template v-if='address_list.length==0'>
                    <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit'></v-address-edit>
                    <div class='single-button'>
                        <button class='btn btn-red btn-block btn-large ' @click='toggleEdit'>+ 请填写收货地址</button>
                    </div>
                </template>
            </template>
        </template>
    </div>
</template>
<script>
import vOrder from 'components/order/v_order.vue'
import vSimditor from 'components/v_simditor.vue'
import vBlockText from 'components/v_block_text.vue'
import vLogistics from 'components/order/v_logistics.vue'
import vDivider from 'components/v_divider.vue'
import vAddressEdit from 'components/order/v_address_edit.vue'
import vAddressSelect from 'components/order/v_address_select.vue'
export default {

    name: 'order_detail',
    components: {
        vOrder,
        vSimditor,
        vBlockText,
        vLogistics,
        vDivider,
        vAddressEdit,
        vAddressSelect
    },
    data() {
        return {
            order_id: '',
            order_detail: {},
            product_detail: {},
            product_type: '',
            send_type: 0,
            confirm: false,
            popup_edit: false,
            popup_select: false
        };
    },
    computed: {
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
            if (this.send_type == 1) {

                if (this.order_detail.status == 1) {
                    //若订单未确认 从地址列表内选取默认地址
                    this.address_list.forEach((address) => {
                        if (address.is_defaults) {
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
                //订单类型为自取时
            } else if (this.send_type == 2) {

            }
            return temp;
        },
        default_id() {
            return this.default_address.id;
        }
    },
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail((data) => {
            let product_type = data.data.product_type;
            this.send_type = data.data.send_type;
            if (product_type == 1 || product_type == 2||product_type==5||product_type==6) {
                this.getProductDetail(data.data.product_id);
            }
            if (this.send_type == 1 && product_type == 2) {
                this.$store.dispatch('getAddressList');
            }
        });
    },
    methods: {
        //获取订单详情
        //order_type  1商品兑换 2活动
        //product_type 1优惠券码 2实物 4积分赠送 5谢谢参与
        //status  1未发货 2已确认地址 3已发货
        getOrderDetail(callback) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });

            this.$http.post(`${APP.HOST}/order_detail/${this.order_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.$store.dispatch('toggleLoading', {
                    show: false
                });

                let data = response.data;
                this.order_detail = data.data;
                this.product_type = this.order_detail.product_type;
                if (callback) {
                    callback(data);
                }

            }, (response) => {
                this.$store.dispatch('toggleLoading', {
                    show: false
                });

            })
        },
        //获取订单内商品详情
        getProductDetail(product_id) {
            this.$http.post(`${APP.HOST}/product_detail/${product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.product_detail = data.data;
            }, (response) => {

            })
        },
        //确认订单地址
        updateOrderAddress() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
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
                        msg: data.info,
                        show: true
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
