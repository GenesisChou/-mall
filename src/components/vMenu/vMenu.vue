<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-menu {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        background: $white;
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
    }

    .flower {
        width: pxTorem(39);
        height: pxTorem(45);
    }

    .user {
        width: pxTorem(42);
        height: pxTorem(44);
    }

    span {
        font-size: pxTorem(20);
        color: #565656;
    }
</style>
<template>
    <div class='v-menu'>
        <div>
            <div class='icon'>
                <img class='home' src='./images/home.png'>
            </div>
            <span>首页</span>
        </div>
        <div>
            <div class='icon'>
                <img class='flower' src='./images/flower.png'>
            </div>
            <span>福利</span>
        </div>
        <div>
            <div class='icon'>
                <img class='user' src='./images/user.png'>
            </div>
            <span>我的</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'menu'
    };
</script>