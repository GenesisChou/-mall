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
            &.active {
                .home {
                    background-image: url('./images/homeActive.png');
                }
                .flower {
                    background-image: url('./images/flowerActive.png');
                }
                .user {
                    background-image: url('./images/userActive.png');
                }
                span{
                    color:#ff5f17;
                }
            }
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
    }

    .flower {
        width: pxTorem(39);
        height: pxTorem(45);
        margin: 0 auto;
        background-image: url('./images/flower.png');
        background-size: 100% 100%;
    }

    .user {
        width: pxTorem(42);
        height: pxTorem(44);
        margin: 0 auto;
        background-image: url('./images/user.png');
        background-size: 100% 100%;
    }

    span {
        font-size: pxTorem(20);
        color: #565656;
    }
</style>
<template>
    <div class='v-menu'>
        <router-link :to='{name:"index"}' tag='div' :class='{active:$route.name==="index"}'>
            <div class='icon'>
                <div class='home'></div>
            </div>
            <span>首页</span>
        </router-link>
        <router-link :to='{name:"product_list"}' tag='div' :class='{active:$route.name==="product_list"}'>
            <div class='icon'>
                <div class='flower'></div>
            </div>
            <span>福利</span>
        </router-link>
        <router-link :to='{name:"user"}' tag='div' :class='{active:$route.name==="user"}'>
            <div class='icon'>
                <div class='user'></div>
            </div>
            <span>我的</span>
        </router-link>
    </div>
</template>