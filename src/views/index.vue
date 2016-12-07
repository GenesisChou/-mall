<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.index {
  overflow:hidden;
  background-color:$gray-light;
}

.icon-list {
    padding: pxTorem(25) 0;
    margin: pxTorem(30) 0;
    overflow: hidden;
    >li{
        width: 33.3%;
        float: left;
        &:nth-child(2) {
            position: relative;
        }
    }
    .icon {
        height: pxTorem(90);
        width: pxTorem(90);
        border-radius: 50%;
        padding-top: pxTorem(10);
        line-height: pxTorem(35);
        margin: auto;
        text-align: center;
        color: $white;
    }
    .label {
        position: absolute;
        left: pxTorem(-50);
        opacity: 0;
        color: $red;
        &.active {
            animation: checkAnimation 1s;
        }
    }
}

@keyframes checkAnimation {
    0% {
        opacity: 1;
        top: pxTorem(15);
    }
    100% {
        opacity: 0;
        top: pxTorem(-15);
    }
}
  .v-item:nth-child(1){
    border-top:0;
  }
  .v-item:nth-child(2){
    border-top:0;
  }
  .v-item:nth-child(2n-1){
    border-left:0;
  }
  .v-item:nth-child(2n){
    border-right:0;
  }
</style>
<template>
    <div class='index '>
        <v-swipe></v-swipe>
        <!-- <router-link :to='{name:"activity_list"}' tag='button' class='btn btn-red'>活动列表</router-link > -->
        <ul class='list-inline icon-list  bg-white'>
            <router-link :to='{name:"my_integral"}' tag='li' class=''>
                <div class='icon bg-blue '>
                    <p>积分</p>
                    <p>{{parseInt(user.integral)}}</p>
                </div>
            </router-link>
            <li  @click='checkIn'>
                <div class='icon bg-pink '>
                    <template v-if='!user.ischecked'>
                        <p>点击</p>
                        <p>签到</p>
                    </template>
                    <template v-else>
                        <p>您已</p>
                        <p>签到</p>
                    </template>
                    <span :class='["label",check_animation?"active":""]'>+10</span>
                </div>
            </li>
            <router-link :to='{name:"product_list"}' tag='li'>
                <div class='icon bg-yellow '>
                    <p>所有</p>
                    <p>商品</p>
                </div>
            </router-link>
        </ul>

        <section class='main'>
            <!-- 热门推荐 -->
            <v-item v-for='item in hot_commend' :item='item' type='commend'></v-item>
            <!-- 热门 -->
            <v-item v-for='item in hot_items' :item='item' type='item'></v-item>
        </section>
    </div>
</template>
<script>
import utils from 'libs/utils.js'
import vSwipe from 'components/index/v_swipe.vue'
import vItem from 'components/index/v_item.vue'
export default {
    name: 'index',
    components: {
        vSwipe,
        vItem
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    data() {
        return {
            hot_items: [],
            hot_commend: [],
            check_animation: false,
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            },
        }
    },
    mounted() {
        this.getHotCommend();
        this.getHotItems();
        utils.getScrollData(this.hot_items, this.params, this.getHotItems);
    },
    methods: {
        //签到
        checkIn() {
            if (!this.user.ischecked) {
                this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id:APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.$store.dispatch('getUserInfor');
                        this.check_animation = true;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {

                })
            }
        },

        //  热门商品和活动列表，用于首页列表
        getHotItems(params = this.params) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/hot_item`, params ).then((response) => {
                let data = response.data;
                if (this.params.p <= 1) {
                    this.params.total = data.data.total;
                    this.params.count = data.data.count;
                }
                this.$store.dispatch('toggleLoading');
                this.hot_items = this.hot_items.concat(data.data.list);
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            });
        },
        getHotCommend() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/hot_commend`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            }).then((response) => {
                this.$store.dispatch('toggleLoading');
                this.hot_commend = response.data.data;
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            });
        }
    }
};
</script>
