<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order-detail {
    min-height: 100%;
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

.add-address,
.confirm-address {
    padding: pxTorem(20) pxTorem(75);
}

.confirm-address {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.edit-address {
    background: $white;
    .header {
        line-height: pxTorem(135);
        /*border-bottom: 1px solid $sliver;*/
    }
    .main {
        padding: 0 pxTorem(53);
        label {
            width: pxTorem(204);
            font-size: pxTorem(30);
            text-align: left;
        }
        input {
            height: pxTorem(50);
            width: pxTorem(300);
            padding-left: pxTorem(18);
            border: 1px solid $gray;
            font-size: pxTorem(26);
        }
        >.flex {
            height: pxTorem(87);
            align-items: center;
            border-bottom: 1px solid $gray;
            &:nth-child(1) {
                border-top: 1px solid $gray;
            }
        }
    }
    .footer {
        height: pxTorem(158);
        line-height: pxTorem(158);
        padding: 0 pxTorem(73);
        .btn {
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
    }
}
</style>
<template>
    <div class='order-detail bg-base'>
        <v-order :order='order_detail'>
            <template v-if='order_detail.ticket_id'>
                <div class='ticket'>
                    <div class='ticket-box'><span class='text-large'>优惠券:</span> <span class='text-red text-huge'>{{order_detail.ticket_id}}</span> </div>
                </div>
            </template>
            <template v-if='product_detail.content_use'>
                <v-divider text='使用说明'></v-divider>
                <v-simditor>
                    <article class='introduction' v-html='product_detail.content_use'> </article>
                </v-simditor>
            </template>
        </v-order>
        <v-address></v-address>
        <v-logistics></v-logistics>
        <div class='add-address'>
            <button class='btn btn-red btn-block btn-large ' @click='togglePopup'>+ 请填写收货地址</button>
        </div>
        <v-popup :show='popup' :toggle-popup='togglePopup' :callback='cancelEdit'>
            <form class='edit-address'>
                <header class='header text-center text-huge'>
                    新增收货地址
                </header>
                <section class='main'>
                    <div class='flex'>
                        <label for='name'>收货人</label>
                        <input id='name' placeholder="收货人姓名" v-model='reciveInfor.name'>
                    </div>
                    <div class='flex'>
                        <label for='province'>选择省</label>
                        <input id='province' placeholder="请选择省" v-model='reciveInfor.province'>
                    </div>
                    <div class='flex'>
                        <label for='city'>选择市</label>
                        <input id='city' placeholder="请选择市" v-model='reciveInfor.city'>
                    </div>
                    <div class='flex'>
                        <label for='county'>选择区/县</label>
                        <input id='county' placeholder="请选择区县" v-model='reciveInfor.county'>
                    </div>
                    <div class='flex'>
                        <label for='address'>详细地址</label>
                        <input id='address' placeholder="请输入详细地址" v-model='reciveInfor.address'>
                    </div>
                    <div class='flex'>
                        <label for='phone'>手机号码</label>
                        <input id='phone' type='number' placeholder="手机或固定电话" v-model='reciveInfor.phone'>
                    </div>
                </section>
                <footer class='footer text-center'>
                    <button class='btn btn-red btn-block btn-large' @click.prevent='saveEdit'>保存</button>
                </footer>
            </form>
        </v-popup>
    </div>
</template>
<script>
import vOrder from 'components/v_order.vue'
import vSimditor from 'components/v_simditor.vue'
import vBlockText from 'components/v_block_text.vue'
import vConfirm from 'components/v_confirm.vue'
import vPopup from 'components/v_popup.vue'
import vAddress from 'components/v_address.vue'
import vLogistics from 'components/v_logistics.vue'
import vDivider from 'components/v_divider.vue'
export default {

    name: 'order_detail',
    components: {
        vOrder,
        vSimditor,
        vBlockText,
        vConfirm,
        vPopup,
        vAddress,
        vLogistics,
        vDivider
    },
    data() {
        return {
            order_id: '',
            order_detail: {},
            product_detail: {},
            confirm: false,
            popup: false,
            reciveInfor: {
                name: '',
                province: '',
                city: '',
                county: '',
                address: '',
                phone: ''
            }
        };
    },
    mounted() {
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail();
    },
    methods: {
        //获取订单详情
        getOrderDetail() {
            this.$http.post(`${APP.HOST}/order_detail/${this.order_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.order_detail = data.data;
                this.getProductDetail(data.data.product_id);
            }, (response) => {

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
        //保存编辑
        saveEdit() {

        },
        //取消编辑
        cancelEdit() {
            this.toggleConfirm();
        },
        //清除输入
        clearInput() {
            this.reciveInfor.name = '';
            this.reciveInfor.province = '';
            this.reciveInfor.city = '';
            this.reciveInfor.county = '';
            this.reciveInfor.address = '';
            this.reciveInfor.phone = '';
        },
        //关闭/显示confirm
        toggleConfirm() {
            this.$store.dispatch('toggleConfirm', {
                msg: '确认放弃编辑?',
                show: true,
                callback: () => {
                    this.$store.dispatch('toggleConfirm', {
                        show: false
                    });
                    this.togglePopup();
                    this.clearInput();
                }
            });
        },
        togglePopup() {
            this.popup = !this.popup;
        }
    }


};
</script>
