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
            <div class='event flex  flex-center-v ' v-link='{name:"my_integral"}'>
                <img class='icon' src='../assets/images/index/money.png'>
                <div class='content'>
                    <p class='text-large'>我的积分</p>
                    <p class='text-small'>当前余额: <span class='text-pink'>{{user.integral|parseInt}}</span> </p>
                </div>
            </div>
            <div class='event flex  flex-center-v' @click='toggleModal(checkIn)'>
                <img class='icon' src='../assets/images/index/sign-in.png'>
                <div class='content'>
                    <p class='text-large'>
                        <span v-if='user.ischecked '>已签到</span>
                        <span v-else>未签到</span>
                    </p>
                    <p class='text-small'>连续签到: <span class='text-pink'>20天</span></p>
                </div>
            </div>
        </div>
        <div class='hot-list '>
            <v-banner type='activity' v-link='{name:"activity_list"}'></v-banner>
            <v-list-item v-for='activity in hotActivityList' v-link='{name:"activity_detail",query:{activity_id:activity.id,type:activity.type}}' :title='activity.name' :title-dupty=`${activity.integral|parseInt}积分` :img='activity.pic_thumb'></v-list-item>
            <v-banner type='product' v-link='{name:"product_list"}'></v-banner>
            <v-list-item v-for='product in hot_product_list' v-link='{name:"product_detail",query:{product_id:product.id}}' :title='product.name' :title-dupty=`${product.integral|parseInt}积分` :img='product.pic_thumb'></v-list-item>
            <v-modal :show.sync='modal'>
                <div class='modal-content text-center'>
                    <img src='../assets/images/correct.png' />
                    <p v-if='!user.ischecked ' class='text-large'>签到成功，积分+10</p>
                    <p v-else class='text-large'>已签到</p>
                    <button class='btn   btn-pink text-large' @click='toggleModal()'>确定</button>
                </div>
            </v-modal>
        </div>
</template>
<script>
import utils from 'libs/utils'
import filters from 'libs/filters'
import vModal from 'components/v_modal'
import vBanner from 'components/v_banner'
import vListItem from 'components/v_list_item'
export default {

    name: 'index',
    components: {
        vListItem,
        vModal,
        vBanner,
    },
    data() {
        return {
            modal: false,
            signState: false,
            user: {},
            hotActivityList: [],
            hot_product_list: [],
        };
    },
    route: {
        data() {
            this.getUserInfor();
            this.getHotActivityList();
            this.getHotProductList();
        }
    },
    methods: {

        //获取用户信息
        getUserInfor() {
            this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('user', data.data);
            }, (response) => {

            })
        },
        //获取热门活动
        getHotActivityList() {
            this.$http.post(`${APP.HOST}/hot_activity`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('hotActivityList', data.data.list);
            }, (response) => {
                // error callback
            });
        },
        //获取热门商品
        getHotProductList(hot_product_list) {
            this.$http.post(`${APP.HOST}/hot_product`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('hot_product_list', data.data.list);
            }, (response) => {
                // error callback
            });
        },
        //签到
        checkIn() {
            if (!this.user.ischecked) {
                this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID
                }).then((response) => {
                    this.getUserInfor();
                }, (response) => {

                })
            }
        },
        // 显示/隐藏弹出框
        toggleModal(func) {
            typeof func==='function'?func():'';
            this.modal = !this.modal;
        },
    },
    filters
};
</script>
