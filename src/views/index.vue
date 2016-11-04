<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.index {
    min-height: 100%;
}

.icon-list {
    padding: pxTorem(25) 0;
    margin-top: pxTorem(30);
    .icon {
        height: pxTorem(90);
        width: pxTorem(90);
        border-radius: 50%;
        line-height: 100%;
    }
    >.flex:nth-child(2) .icon {
        position: relative;
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

.main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: pxTorem(18) 0;
}
</style>
<template>
    <div class='index bg-base'>
        <v-swipe></v-swipe>
        <router-link :to='{name:"activity_list"}' tag='button' class='btn btn-red'>活动列表</router-link >
        <div class='icon-list flex bg-white'>
            <router-link :to='{name:"my_integral"}' class='flex-item flex flex-center-v flex-center-h'>
                <div class='icon bg-blue text-white flex flex-column flex-center-v flex-center-h '>
                    <p>积分</p>
                    <p>{{parseInt(user.integral)}}</p>
                </div>
            </router-link>
            <div class='flex-item flex flex-center-v flex-center-h' @click='checkIn'>
                <div class='icon bg-pink text-white flex flex-column flex-center-v flex-center-h '>
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
            </div>
            <router-link :to='{name:"product_list"}' class='flex-item flex flex-center-v flex-center-h'>
                <div class='icon bg-yellow text-white flex flex-column flex-center-v flex-center-h '>
                    <p>所有</p>
                    <p>商品</p>
                </div>
            </router-link>
        </div>
        <section class='main'>
            <v-item v-for='i in 6'></v-item>
        </section>
    </div>
</template>
<script>
import vSwipe from 'components/v_swipe.vue'
import vItem from 'components/index/v_item.vue'
import {
    mapState
} from 'vuex'
export default {
    name: 'index',
    components: {
        vSwipe,
        vItem
    },

    computed: mapState(['user', 'hot_banners', 'hot_items']),
    mounted() {
        // this.$store.dispatch('getUserInfor');
        // this.$store.dispatch('getHotBanners');
        // this.$store.dispatch('getHotItems');
    },
    data() {
        return {
            check_animation: false,
        }
    },
    methods: {
        checkIn() {
            this.$store.dispatch('checkIn', () => {
                this.check_animation = true;
            });
        }
    }
};
</script>
