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

.product-list,
.activity-list {
    .v-list-item:last-child {
        border-bottom: 0;
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
            <div class='event flex  flex-center-v' @click='checkIn'>
                <img class='icon' src='../assets/images/index/sign-in.png'>
                <div class='content'>
                    <p class='text-large'>
                        <span v-if='user.ischecked '>已签到</span>
                        <span v-else>未签到</span>
                    </p>
                    <!-- <p class='text-small'>连续签到: <span class='text-pink'>20天</span></p> -->
                    <!-- <p class='text-small'>{{user.last_checkin}}</p> -->
                </div>
            </div>
        </div>
        <v-banner type='activity' v-link='{name:"activity_list"}'></v-banner>
        <div class='activity-list'>
            <v-list-item v-for='activity in hot_activity_list' v-link='{name:"activity_detail",query:{activity_id:activity.id,type:activity.type}}' :title='activity.name' :title-dupty=`${activity.integral|parseInt}积分` :img='activity.pic_thumb'></v-list-item>
        </div>
        <v-banner type='product' v-link='{name:"product_list"}'></v-banner>
        <div class='product-list'>
            <v-list-item v-for='product in hot_product_list' v-link='{name:"product_detail",query:{product_id:product.id}}' :title='product.name' :title-dupty=`${product.integral|parseInt}积分` :img='product.pic_thumb'></v-list-item>
        </div>
        <v-alert :show.sync='modal' :msg='msg' btn-text='确定'>
        </v-alert>
    </div>
</template>
<script>
import utils from 'libs/utils'
import filters from 'libs/filters'
import vAlert from 'components/v_alert'
import vBanner from 'components/v_banner'
import vListItem from 'components/v_list_item'
export default {

    name: 'index',
    components: {
        vListItem,
        vAlert,
        vBanner,
    },
    data() {
        return {
            modal: false,
            signState: false,
            msg: '签到成功',
            user:{},
            hot_activity_list: [],
            hot_product_list: []
        };
    },
    route: {
        data() {
            this.gerUserInfor();
            this.getHotActivityList();
            this.getHotProductList();
        }
    },
    methods: {
        //签到
        gerUserInfor() {
            this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('user',data.data)
            }, (response) => {

            })

        },
        checkIn() {
            this.modal = !this.modal;
            if (!this.user.ischecked) {
                this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID
                }).then((response) => {
                    this.gerUserInfor();
                }, (response) => {

                })
            } else {
                this.$set('msg', '已签到');
            }
        },
        getHotActivityList() {
            this.$http.post(`${APP.HOST}/hot_activity`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('hot_activity_list', data.data.list);
            }, (response) => {
                // error callback
            });
        },
        getHotProductList() {
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
    },
    filters
};
</script>
