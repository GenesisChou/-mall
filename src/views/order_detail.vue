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
        border-bottom: 1px solid $gray-light;
    }
    .ticket {
        border-top: 1px solid $gray-light;
        border-bottom: 1px solid $gray-light;
        .ticket-box {
            width: pxTorem(608);
            height: pxTorem(66);
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
    padding: pxTorem(55) pxTorem(50) pxTorem(55) 0;
    font-size: pxTorem(28);
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;
    .location {
        width: pxTorem(110);
    }
    .arrows {
        /*width: pxTorem(105);*/
        margin-left: pxTorem(30);
    }
    .address-content {
        line-height: pxTorem(55);
        label {
            margin-right: pxTorem(10);
        }
        .address-detail {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
            <template v-if='product_type==1||product_type==2'>
                <div class='ticket'>
                    <div class='ticket-box'><span class='text-large'>优惠券:</span> <span class='text-red text-huge'>{{order_detail.ticket_id}}</span> </div>
                </div>
                <v-divider text='使用说明'></v-divider>
                <v-simditor>
                    <article class='introduction' v-html='product_detail.content_use'> </article>
                </v-simditor>
            </template>
        </v-order>
        <!-- <div v-if='order_detail.product_type==1' class='copy-ticket'>
            <button  class='btn btn-block btn-red btn-large'>复制优惠券</button>
        </div> -->
        <div v-if='order_detail.product_type==2' class='copy-ticket'>
            <button class='btn btn-block btn-red btn-large'>前往使用</button>
        </div>
        <!-- 商品为实物时 -->
        <template v-if='product_type==3'>
            <!-- 有地址 -->
            <template v-if='address_list.length>0'>
                <section class='address-selected bg-white flex' @click='toggleSelect'>
                    <div class='location flex flex-center-v flex-center-h'>
                        <i class='iconfont icon-location  text-huge'></i>
                    </div>
                    <div class='address-content flex-item'>
                        <p class='flex flex-space-between'>
                            <span> <label>收货信息:</label>{{default_address.contact}}</span>
                            <span>{{default_address.phone}}</span>
                        </p>
                        <div class='flex'>
                            <label>收货地址:</label>
                            <div class='flex-item address-detail'>{{default_address.province}} {{default_address.city}} {{default_address.country}} {{default_address.address}}</div>
                        </div>
                    </div>
                    <div v-if='!order_checked' class='arrows flex flex-center-v flex-center-h'>
                        <i class='iconfont icon-arrows-right text-bold text-huge'></i>
                    </div>
                </section>
                <!-- 物流信息 -->
                <v-logistics :order-id='parseInt(order_id)' :status='order_detail.status' :status-str='order_detail.status_str'></v-logistics>
                
                <div v-if='!order_checked' class='single-button'>
                    <button class='btn btn-red btn-block btn-large ' @click='updateOrderAddress'>确认地址</button>
                </div>
                <v-address-select :show='popup_select' :toggle-popup='toggleSelect'></v-address-edit>
            </template>
            <!-- 无地址 -->
            <template v-else>
                <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit'></v-address-edit>
                <div class='single-button'>
                    <button class='btn btn-red btn-block btn-large ' @click='toggleEdit'>+ 请填写收货地址</button>
                </div>
            </template>
        </template>
    </div>
</template>
<script>
import vOrder from 'components/v_order.vue'
import vSimditor from 'components/v_simditor.vue'
import vBlockText from 'components/v_block_text.vue'
import vLogistics from 'components/v_logistics.vue'
import vDivider from 'components/v_divider.vue'
import vAddressEdit from 'components/v_address_edit.vue'
import vAddressSelect from 'components/v_address_select.vue'
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
            confirm: false,
            popup_edit: false,
            popup_select: false
        };
    },
    computed: {
        address_list() {
            return this.$store.state.address_list;
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
            if (this.order_detail.status == 1) {
            //若订单未确认 从地址列表内选取默认地址
                this.address_list.forEach((address) => {
                    if (address.is_defaults) {
                        temp = address;
                        return;
                    }
                })
            }else{
                //订单已确认,从订单详情内获取指定地址
                temp.contact=this.order_detail.contact;
                temp.phone=this.order_detail.phone;
                temp.province=this.order_detail.province;
                temp.city=this.order_detail.city;
                temp.country=this.order_detail.country;

            }
            return temp;
        }
    },
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail((data) => {
            let product_type = data.data.product_type;
            if (product_type == 1 || product_type == 2) {
                this.getProductDetail(data.data.product_id);
            } else if (product_type == 3) {
                this.$store.dispatch('getAddressList');
            }
        });
    },
    methods: {
        //获取订单详情
        //order_type  1商品兑换 2活动
        //product_type 1优惠券码 2优惠券链接 3实物 4积分赠送 5谢谢参与
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
            this.$http.post(`${APP.HOST}/update_order_address/${this.order_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                id: this.default_address.id
            }).then((response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    this.getOrderDetail();
                } else {
                    this.$store.dispatch('toggleAlert', {
                        msg: data.info,
                        show: true
                    })
                }
            }, (response) => {

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
