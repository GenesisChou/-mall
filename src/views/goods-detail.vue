<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(205);
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
        height: pxTorem(61);
        background: rgba(0, 0, 0, .4);
    }
}

.footer {
    height: pxTorem(40);
}

.modal-content {
    .img {
        width: pxTorem(30);
        height: pxTorem(30);
        border: pxTorem(1) solid $black;
    }
}
</style>
<template>
    <div class='goods-detail'>
        <div class='head'>
            <img>
            <div class='cover text-white pd10-l flex flex-center-v'>
                <p class='text-large'>商品名称</p>
            </div>
        </div>
        <div class='body pd10-l pd10-r'>
            <div class='introduction'>
                <h1 class='text-large pd10-t pd10-b'> 商品介绍 </h1>
                <div class='content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quaerat quasi quibusdam dicta repellendus, laboriosam obcaecati pariatur adipisci, at quidem iste ex vel? Commodi, ipsam libero natus nihil, delectus voluptatibus.
                </div>
            </div>
            <div class='explation'>
                <h1 class='text-large pd10-t pd10-b'> 兑换说明 </h1>
                <div class='content'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed dolorum saepe sapiente molestias fugit. Assumenda velit, ullam dicta tenetur mollitia, expedita quis laboriosam consequatur, deleniti enim vitae in distinctio. Incidunt.
                </div>
            </div>
        </div>
        <v-sticky>
            <div class='footer flex flex-space-between flex-center-v'>
                <div>
                    单价：<span class='text-red'>200</span>积分
                </div>
                <button class='btn btn-default' @click='toggleModal'>兑换</button>
            </div>
        </v-sticky>
    </div>
    <v-modal :show.sync='modal'>
        <div class='modal-content text-center'>
            <img class='img' />
            <p style='line-height:1.5rem'>
                <span v-if='!exchangeState'>
            是否确认兑换?
          </span>
                <span v-else>
            兑换成功
          </span>
            </p>
            <div v-if='!exchangeState'>
                <button class='btn btn-default mg10-r' @click='toggleModal'>取消</button>
                <button class='btn btn-blue' @click='exchange'>确认</button>
            </div>
            <div v-else>
                <button class='btn btn-blue' v-link='{name:"exchange-detail"}'>查看</button>
            </div>
        </div>
    </v-modal>
</template>
<script>
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
            modal:false,
            exchangeState: false
        };
    },
    methods: {
        //获取商品详情
        getGoodsDetail(){

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
