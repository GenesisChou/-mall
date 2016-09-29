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
    <div class='goods-detail'>
        <div class='head flex flex-center-h flex-center-v'>
            <img src='../assets/images/goods.png' />
            <div class='cover text-white  flex flex-center-v'>
                <p class='text-huge'>商品名称</p>
            </div>
        </div>
        <div class='body '>
            <div class='introduction'>
                <h1 class='text-huge title'> <strong>商品介绍</strong> </h1>
                <div class='content text-gray'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quaerat quasi quibusdam dicta repellendus, laboriosam obcaecati pariatur adipisci, at quidem iste ex vel? Commodi, ipsam libero natus nihil, delectus voluptatibus.
                </div>
            </div>
            <div class='explation'>
                <h1 class='text-huge title'><strong>兑换说明</strong>  </h1>
                <div class='content text-gray'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed dolorum saepe sapiente molestias fugit. Assumenda velit, ullam dicta tenetur mollitia, expedita quis laboriosam consequatur, deleniti enim vitae in distinctio. Incidunt.
                </div>
            </div>
        </div>
        <v-sticky>
            <div class='footer flex flex-space-between flex-center-v'>
                <div class='text-large'>
                    单价：<span class='text-pink'>200</span>积分
                </div>
                <button class='btn btn-default ' @click='toggleModal'>兑换</button>
            </div>
        </v-sticky>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center'>
                <img v-if='!exchangeState' src='../assets/images/question-hollow.png' />
                <img v-else src='../assets/images/correct-hollow.png' />
                <p>
                    <span v-if='!exchangeState'>
                是否确认兑换?
              </span>
                    <span v-else>
                兑换成功
              </span>
                </p>
                <div v-if='!exchangeState'>
                    <button class='btn btn-pink-hollow' @click='toggleModal'>取消</button>
                    <button class='btn btn-pink' @click='exchange'>确认</button>
                </div>
                <div v-else>
                    <button class='btn btn-pink' v-link='{name:"exchange-detail"}'>查看</button>
                </div>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vSticky from 'components/v-sticky'
import vModal from 'components/v-modal'
export default {

    name: 'goods-detail',
    components: {
        vSticky,
        vModal
    },
    data() {
        return {
            popup: false,
            modal: false,
            exchangeState: false
        };
    },
    created() {
        utils.setTitle('商品详情');
    },
    methods: {
        //获取商品详情
        getGoodsDetail() {

        },
        toggleModal() {
            this.modal = !this.modal;
        },
        exchange() {
            this.exchangeState = true;
        }
    }
};
</script>
