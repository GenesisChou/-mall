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

.add-address {
    padding: pxTorem(20) pxTorem(75);
}

.address-selected {
    padding: pxTorem(55) 0;
    font-size: pxTorem(28);
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;
    .location {
        width: pxTorem(110);
    }
    .arrows {
        width: pxTorem(105);
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
            max-width: pxTorem(450);
        }
    }
}
</style>
<template>
    <div class='order-detail bg-base'>
        <!-- 订单详情 -->
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
        <!-- 收货地址 -->
        <section class='address-selected bg-white flex' @click='toggleSelect'>
            <div class='location flex flex-center-v flex-center-h'>
                <i class='iconfont icon-location  text-huge'></i>
            </div>
            <div class='address-content '>
                <p class='flex flex-space-between'>
                    <span> <label>收货信息:</label>张三</span>
                    <span>1390000000</span>
                </p>
                <div class='flex'>
                    <label>收货地址:</label>
                    <div class='flex-item address-detail'>浙江省 杭州市 西湖区 坚果互动科技全球研发中心</div>
                </div>
            </div>
            <div class='arrows flex flex-center-v flex-center-h'>
                <i class='iconfont icon-arrows-right text-bold text-huge'></i>
            </div>
        </section>
        <!-- 物流信息 -->
        <v-logistics></v-logistics>
        <div class='add-address'>
            <button class='btn btn-red btn-block btn-large ' @click='toggleEdit'>+ 请填写收货地址</button>
        </div>
        <!-- 编辑地址 -->
        <v-address-edit :show='popup_edit' :toggle-popup='toggleEdit' :recive-infor='reciveInfor'></v-address-edit>
        <!-- 选择地址 -->
        <v-address-select :show='popup_select' :toggle-popup='toggleSelect'></v-address-edit>
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
            confirm: false,
            popup_edit:false,
            popup_select:false,
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
        // this.order_id = this.$route.query.order_id;
        // this.getOrderDetail();
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
        toggleEdit(){
            this.popup_edit=!this.popup_edit;
        },
        toggleSelect(){
            this.popup_select=!this.popup_select;
        }
    }


};
</script>
