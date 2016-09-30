<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(260);
    padding: pxTorem(10) 0;
    .event {
        flex: 1;
        .icon {
            width: pxTorem(100);
            height: pxTorem(100);
            border-radius: 50%;
            margin: 0 pxTorem(18) 0 pxTorem(56);
        }
        &:nth-child(1) {
            border-right: pxTorem(1) solid #7E7E7E;
        }
    }
}

.hot-list {
    .v-list-item:last-child {
        border-bottom: 0;
    }
}

.modal-content {
    width: pxTorem(500);
    height: pxTorem(300);
    padding-top: pxTorem(34);
    >img {
        width: pxTorem(66);
        height: pxTorem(66);
    }
    >p {
        line-height: pxTorem(110);
    }
}
</style>
<template>
    <div class='index'>
        <div class='head bg-white flex '>
            <div class='event flex  flex-center-v ' v-link='{name:"my-integral"}'>
                <img class='icon' src='../assets/images/index/money.png'>
                <div class='content'>
                    <p class='text-large'>我的积分</p>
                    <p class='text-small'>当前余额: <span class='text-pink'>1200</span> </p>
                </div>
            </div>
            <div class='event flex  flex-center-v'>
                <img class='icon' src='../assets/images/index/sign-in.png' @click='toggleModal()'>
                <div class='content'>
                    <p class='text-large'>未签到</p>
                    <p class='text-small'>连续签到: <span class='text-pink'>20天</span></p>
                </div>
            </div>
        </div>
        <div class='hot-list '>
            <v-banner type='activity' v-link='{name:"activity-list"}'></v-banner>
            <v-list-item v-for='activity in hotActivityList' v-link='{name:"activity-detail",query:{id:activity.id,type:activity.type}}' :title='activity.name' :title-dupty=`${activity.integral|parseInt}积分` img='../src/assets/images/activity-1.png'></v-list-item>
            <!--             <v-list-item v-link='{name:"activity-detail",query:{game:"scrap"}}' title='刮刮卡' title-dupty='这是活动副标题' img='../src/assets/images/activity-1.png'></v-list-item>

            <v-list-item v-link='{name:"activity-detail",query:{game:"quiz"}}' title='有奖问答' title-dupty='这是活动副标题' img='../src/assets/images/activity-2.png'></v-list-item> -->
        </div>
        <div class='hot-list'>
            <v-banner type='product' v-link='{name:"product-list"}'></v-banner>
            <v-list-item v-for='product in hotProductList' v-link='{name:"product-detail",query:{id:product.id}}' :title='product.name' :title-dupty=`${product.integral|parseInt}积分` img='../src/assets/images/product-1.png'></v-list-item>
        </div>
        <v-modal :show.sync='modal'>
            <div class='modal-content text-center'>
                <img src='../assets/images/correct.png' />
                <p>签到成功，积分+10</p>
                <button class='btn btn-pink' @click='toggleModal(signIn)'>确定</button>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import filters from 'libs/filters'
import vModal from 'components/v-modal'
import vBanner from 'components/v-banner'
import vListItem from 'components/v-list-item'
export default {

    name: 'index',
    components: {
        vListItem,
        vModal,
        vBanner
    },
    data() {
        return {
            modal: false,
            signState: false,
            hotActivityList: [],
            hotProductList: []
        };
    },
    created() {
        utils.setTitle('积分商城');
        this.getHotActivityList();
        this.getHotProductList();
    },
    methods: {
        //获取用户信息
        getUserInfor() {

        },
        //获取热门活动
        getHotActivityList() {
            this.$http.post(`${APP.HOST}/hot_activity`).then((response) => {
                let data = response.data;
                this.$set('hotActivityList', data.info.list);
            }, (response) => {
                // error callback
            });
        },
        //获取热门商品
        getHotProductList(hotProductList) {
            this.$http.post(`${APP.HOST}/hot_product`).then((response) => {
                let data = response.data;
                this.$set('hotProductList', data.info.list);
            }, (response) => {
                // error callback
            });
        },
        //签到
        signIn() {

        },
        // 显示/隐藏弹出框
        toggleModal(method) {
            if (method) {
                method();
            }
            this.modal = !this.modal;

        },
    },
    filters
};
</script>
