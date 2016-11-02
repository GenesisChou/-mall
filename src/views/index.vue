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
    >.flex:first-child .icon {
        position: relative;
        .label {
            position: absolute;
            left: pxTorem(-50);
            opacity: 0;
            color: $red;
            &.active {
                animation: move 1s;
            }
        }
    }
}

@keyframes move {
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
    padding: pxTorem(18) pxTorem(12);
}
</style>
<template>
    <div class='index bg-base'>
        <v-swipe ></v-swipe>
        <div class='icon-list flex bg-white'>
            <div class='flex-item flex flex-center-v flex-center-h' @click='checkIn'>
                <div class='icon bg-pink text-white flex flex-column flex-center-v flex-center-h '>
                    <p>点击</p>
                    <p>签到</p>
                    <span :class='["label",checked?"active":""]'>+10</span>
                </div>
            </div>
            <router-link :to='{name:"my_integral"}' class='flex-item flex flex-center-v flex-center-h'>
                <div class='icon bg-blue text-white flex flex-column flex-center-v flex-center-h '>
                    <p>积分</p>
                    <p>1200</p>
                </div>
            </router-link>
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
import {
    mapActions
} from 'vuex'
export default {
    name: 'index',
    components: {
        vSwipe,
        vItem
    },
    data() {
        return {
            checked: false,
        }
    },
    methods: {
        checkIn() {
            this.checked = true;
        }
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        next();
    }
    // computed: mapState(['user', 'hot_activity_list', 'hot_product_list']),
    // mounted() {
    //     this.getUserInfor();
    //     this.getHotActivityList();
    //     this.getHotProductList();
    // },
    // methods: mapActions(['checkIn', 'getUserInfor', 'getHotActivityList', 'getHotProductList'])
};
</script>
