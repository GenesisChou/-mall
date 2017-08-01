<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-menu {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        background: $white;
        box-shadow: 0 0 1px rgba(0, 0, 0, .2);
        >div {
            @include active($white, 3%);
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: pxTorem(100);
        }
    }

    .icon {
        width: 100%;
        padding-top: pxTorem(12);
        text-align: center;
        height: pxTorem(62);
    }

    .home {
        width: pxTorem(48);
        height: pxTorem(42);
        margin: 0 auto;
        background-image: url('./images/home.png');
        background-size: 100% 100%;
        &.active {
            background-image: url('./images/homeActive.png');
        }
    }

    .flower {
        width: pxTorem(39);
        height: pxTorem(45);
        margin: 0 auto;
        background-image: url('./images/flower.png');
        background-size: 100% 100%;
        &.active {
            background-image: url('./images/flowerActive.png');
        }
    }

    .user {
        width: pxTorem(42);
        height: pxTorem(44);
        margin: 0 auto;
        background-image: url('./images/user.png');
        background-size: 100% 100%;
        &.active {
            background-image: url('./images/userActive.png');
        }
    }

    span {
        font-size: pxTorem(20);
        color: #565656;
    }
</style>
<template>
    <div class='v-menu'>
        <router-link :to='{path:"/"}' tag='div'>
            <div class='icon'>
                <div :class='["home",{active:path==="/"}]'></div>
            </div>
            <span>首页</span>
        </router-link>
        <router-link :to='{path:"/product_list"}' tag='div'>
            <div class='icon'>
                <div class='flower'></div>
            </div>
            <span>福利</span>
        </router-link>
        <router-link :to='{path:"/user"}' tag='div'>
            <div class='icon'>
                <div :class='["user",{active:matchRouter}]'></div>
            </div>
            <span>我的</span>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'menu',
        data() {
            return {
                path: ''
            };
        },
        watch: {
            $route(value) {
                this.path = value.path;
            }
        },
        computed: {
            matchRouter() {
                return this.path === '/user' || (/^\/wish_wall/).test(this.path);
            }
        },
        mounted() {
            this.path = this.$route.path;
        }
    };
</script>