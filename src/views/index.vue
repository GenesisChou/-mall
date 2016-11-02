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
        &:first-child {
            border-right: 1px solid $gray-light;
        }
    }
}

.hot-product-list,
.hot-activity-list {
    >div:last-child .v-list-item {
        border-bottom: 0;
    }
}
</style>
<template>
    <div class='index'>
        <div class='head bg-white flex '>
            <router-link :to='{ name:"my_integral"}' class='event flex flex-center-v'>
                <img class='icon' src='../assets/images/index/money.png'>
                <div class='content'>
                    <p class='text-large'>我的积分</p>
                    <p class='text-small'>当前余额: <span class='text-pink'>{{parseInt(user.integral)}}</span> </p>
                </div>
            </router-link>
            <div class='event flex  flex-center-v' @click='checkIn'>
                <img class='icon' src='../assets/images/index/sign-in.png'>
                <div class='content'>
                    <p class='text-large'>
                        <span v-if='user.ischecked '>已签到</span>
                        <span v-else>未签到</span>
                    </p>
                </div>
            </div>
        </div>
        <router-link :to='{name:"activity_list"}'>
            <v-banner type='activity'></v-banner>
        </router-link>
        <div class='hot-activity-list'>
            <router-link v-for='activity in hot_activity_list' :to='{name:"activity_detail",query:{activity_id:activity.id,type:activity.type}}'>
                <v-list-item :title='activity.name' :title-dupty='parseInt(activity.integral)+"积分"' :img='activity.pic_thumb'></v-list-item>
            </router-link>
        </div>
        <router-link :to='{name:"product_list"}'>
            <v-banner type='product'></v-banner>
        </router-link>
        <div class='hot-product-list'>
            <router-link v-for='product in hot_product_list' :to='{name:"product_detail",query:{product_id:product.id}}'>
                <v-list-item :title='product.name' :title-dupty='parseInt(product.integral)+"积分"' :img='product.pic_thumb'></v-list-item>
            </router-link>
        </div>
    </div>
</template>
<script>
import vBanner from 'components/v_banner.vue'
import vListItem from 'components/v_list_item.vue'
import {
    mapState
} from 'vuex'
import {
    mapActions
} from 'vuex'
export default {
    name: 'index',
    components: {
        vListItem,
        vBanner,
    },
    computed: mapState(['user', 'hot_activity_list', 'hot_product_list']),
    mounted() {
        this.getUserInfor();
        this.getHotActivityList();
        this.getHotProductList();
    },
    methods: mapActions(['checkIn', 'getUserInfor', 'getHotActivityList', 'getHotProductList'])
};
</script>
