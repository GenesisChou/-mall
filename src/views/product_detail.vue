<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(400);
    position: relative;
    img {
        width: 100%;
        height: 100%;
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
.fill{
  height:pxTorem(150);
}
.body {
    padding: 0 pxTorem(50);
    .introduction {
        margin-top: pxTorem(50);
        .title{
          padding:pxTorem(30) 0;
          }
    }
}

.footer {
    height: pxTorem(120);
    padding: 0 pxTorem(55);
    .btn {
        padding: 0;
        width: pxTorem(180);
        height: pxTorem(68);
        line-height: pxTorem(68);
        font-size: pxTorem(30);
        text-indent:pxTorem(12);
        letter-spacing: pxTorem(12);
    }
    .btn-disable {
        letter-spacing: 0;
        text-indent:pxTorem(0);

    }
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(260);
    padding-top: pxTorem(31);
    border-radius: pxTorem(5);
    .icon {
        width: pxTorem(50);
        height: pxTorem(50);
    }
    .msg {
        line-height: pxTorem(100);
    }
    .btn{
      text-indent:pxTorem(12);
      letter-spacing: pxTorem(12);
    }
    .btn+ {
        margin-left: pxTorem(30);
    }
}
</style>
<template>
    <div class='product_detail'>
        <div class='head flex flex-center-h flex-center-v'>
            <img :src='product_detail.pic_banner' />
            <div class='cover text-white  flex flex-center-v'>
                <p class='text-huge'>{{product_detail.name}}</p>
            </div>
        </div>
        <div class='body '>
            <div class='introduction'>
                <v-simditor>
                    <template v-if='product_detail.content'>
                        <v-divider text='详细说明'></v-divider>
                        {{{product_detail.content}}}
                    </template>
                    <template v-if='product_detail.content_use'>
                        <v-divider text='使用说明'></v-divider>
                        {{{product_detail.content_use}}}
                    </template>
                </v-simditor>
            </div>
            <div class='fill'></div>
        </div>
        <v-sticky>
            <div class='footer flex flex-space-between flex-center-v'>
                <div class='text-large'>
                    单价：<span class='text-pink'>{{product_detail.integral|parseInt}}</span>积分
                </div>
                <button v-if='order_enble' class='btn btn-pink ' @click='toggleModal'>兑换</button>
                <button v-else class='btn btn-disable '>积分不足</button>
            </div>
        </v-sticky>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center text-large bg-white'>
                <template v-if='!order_state.start'>
                    <img class='icon' src='../assets/images/question-hollow.png' />
                    <p class=' msg'>是否确认兑换</p>
                    <button class='btn btn-pink-hollow ' @click='toggleModal'>取消</button>
                    <button class='btn btn-pink ' @click='order'>确认</button>
                </template>
                <template v-else>
                    <template v-if='order_state.success'>
                        <img class='icon' src='../assets/images/correct-hollow.png' />
                        <p class=' msg'>兑换成功</p>
                        <button class='btn btn-pink' v-link='{name:"order_detail",query:{order_id:order_id}}'>查看</button>
                    </template>
                    <template v-else>
                        <img class='icon' src='../assets/images/error-hollow.png' />
                        <p class=' msg'>{{fail_info}}</p>
                        <button v-else class='btn btn-pink' @click='toggleModal'>关闭</button>
                    </template>
                </template>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSticky from 'components/v_sticky'
import vDivider from 'components/v_divider'
import vModal from 'components/v_modal'
import vSimditor from 'components/v_simditor'
import filters from 'libs/filters'
import actions from 'v_vuex/actions'
import getters from 'v_vuex/getters'
export default {

    name: 'product_detail',
    components: {
        vSticky,
        vModal,
        vSimditor,
        vDivider
    },
    data() {
        return {
            modal: false,
            order_state: {
                start: false,
                success: false,
                msg: ''
            },
            product_id: '',
            product_detail: '',
            order_id: '', //兑换成功后用于跳转订单详情的订单id
            fail_info: '', //失败信息
        };
    },
    route: {
        data(transition) {
            this.$set('product_id', transition.to.query.product_id);
            this.getUserInfor();
            this.getProductDetail();
        }
    },
    computed: {
        order_enble: function() {
            return (parseInt(this.user.integral) - parseInt(this.product_detail.integral)) >= 0 ? true : false;
        }
    },
    methods: {

        //获取商品详情
        getProductDetail() {
            this.$http.post(`${APP.HOST}/product_detail/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('product_detail', utils.resizeImg(data.data));
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
            this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('order_state.start', true);
                this.$set('order_state.msg', data.info);
                if (response.data.status === APP.SUCCESS) {
                    this.$set('order_state.success', true);
                    this.$set('order_id', data.data.id);
                    //更新用户数据
                    this.getUserInfor();
                } else {
                    this.$set('fail_info', data.info);
                }
            }, (response) => {

            })
        }
    },
    filters,
    vuex:{
      actions,
      getters
    }
};
</script>
