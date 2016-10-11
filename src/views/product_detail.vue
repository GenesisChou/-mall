<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(400);
    position: relative;
    img {
        width: pxTorem(309);
        height: pxTorem(368);
    }
    .cover {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: pxTorem(102);
        padding-left: pxTorem(55);
        background: rgba(0, 0, 0, .5);
    }
}

.body {
    padding: 0 pxTorem(55);
    margin-bottom: pxTorem(119);
    .title {
        margin: pxTorem(50) 0 pxTorem(30) 0;
    }
    .content {
        text-align: justify;
    }
}

.footer {
    height: pxTorem(119);
    padding: 0 pxTorem(55);
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(260);
    padding-top: pxTorem(31);
    >img {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    >p {
        line-height: pxTorem(101);
    }
    .btn:nth-child(2) {
        margin-left: pxTorem(30);
    }
}
</style>
<template>
    <div class='product_detail'>
        <div class='head flex flex-center-h flex-center-v'>
            <img src='../assets/images/product.png' />
            <div class='cover text-white  flex flex-center-v'>
                <p class='text-huge'>{{detail.name}}</p>
            </div>
        </div>
        <div class='body '>
            <div class='introduction'>
                <h1 class='text-huge title'> <strong>商品介绍</strong> </h1>
                <div class='content text-gray'>
                    {{detail.content}}
                </div>
            </div>
            <div class='explation'>
                <h1 class='text-huge title'><strong>兑换说明</strong>  </h1>
                <div class='content text-gray'>
                    <pre>
                        {{detail|json}}
                    </pre>
                </div>
            </div>
        </div>
        <v-sticky>
            <div class='footer flex flex-space-between flex-center-v'>
                <div class='text-large'>
                    单价：<span class='text-pink'>{{detail.integral|parseInt}}</span>积分
                </div>
                <button class='btn btn-default ' @click='toggleModal'>兑换</button>
            </div>
        </v-sticky>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center'>
                <div v-if='!order_state.start'>
                    <img src='../assets/images/question-hollow.png' />
                </div>
                <div v-else>
                    <img v-if='order_state.success' src='../assets/images/correct-hollow.png' />
                    <img v-else src='../assets/images/error-hollow.png' />
                </div>
                <p>
                    <p v-if='!order_state.start'>
                        是否确认兑换?
                    </p>
                    <p v-else>
                        <span v-if='order_state.success'>
                            兑换成功
                        </span>
                        <span v-else>
                            兑换失败
                        </span>
                    </p>
                </p>
                <div v-if='!order_state.start'>
                    <button class='btn btn-pink-hollow' @click='toggleModal'>取消</button>
                    <button class='btn btn-pink' @click='order'>确认</button>
                </div>
                <div v-else>
                    <button v-if='order_state.success' class='btn btn-pink' v-link='{name:"order_detail"}'>查看</button>
                    <button v-else class='btn btn-pink' @click='toggleModal'>关闭</button>
                </div>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSticky from 'components/v_sticky'
import vModal from 'components/v_modal'
import filters from 'libs/filters'
export default {

    name: 'product_detail',
    components: {
        vSticky,
        vModal
    },
    data() {
        return {
            popup: false,
            modal: false,
            order_state: {
                start: false,
                success: false
            },
            id: '',
            detail: ''
        };
    },
    route: {
        data(transition) {
            this.id = transition.to.query.id;
            this.getProductDetail();
        }
    },
    methods: {
        //获取商品详情
        getProductDetail() {
            this.$http.post(`${APP.HOST}/product_detail/${this.id}`).then((response) => {
                let data = response.data;
                this.$set('detail', data.data);

            }, (response) => {})
        },
        toggleModal() {
            this.modal = !this.modal;
            setTimeout(() => {
                this.order_state.start = false;
            }, 500);
        },
        //生成订单
        order() {
            this.$http.post(`${APP.HOST}/product_order/${this.id}`).then((response) => {
                this.$set('order_state.start', true);
                if (response.data.status === APP.SUCCESS) {
                    this.$set('order_state.success', true);
                }
            }, (response) => {

            })
        }
    },
    filters
};
</script>
