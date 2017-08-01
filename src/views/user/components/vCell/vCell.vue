<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-cell {
        display: flex;
        height: pxTorem(96);
        align-items: center;
        &:active {
            @include active($white, 3%);
        }
    }

    .icon {
        margin-left: pxTorem(44);
        margin-right: pxTorem(31);
        width: pxTorem(38);
        height: pxTorem(38);
        background-size: 100% 100%;
        &.check {
            background-image: url('./images/check.png');
        }
        &.earn-integral {
            background-image: url('./images/earnIntegral.png');
        }
        &.records {
            background-image: url('./images/records.png');
        }
        &.integral-list {
            background-image: url('./images/integralList.png');
        }
        &.edit-user {
            background-image: url('./images/editUser.png');
        }
        &.wish-wall {
            background-image: url('./images/wishWall.png');
        }
    }

    .message {
        flex: 1;
        display: flex;
        align-items: center;
        height: 100%;
        border-bottom: 1px solid #e2e2e2;
        h2 {
            flex: 1;
            color: #2d2d2d;
        }
        .icon-arrows-right {
            font-weight: bold;
            color: #cccccc;
            margin-right: pxTorem(30);
        }
    }
</style>
<template>
    <div class='v-cell' @click='callback'>
        <div :class='["icon",icon]'></div>
        <div class='message'>
            <h2>
                <slot></slot>
            </h2>
            <i class='iconfont icon-arrows-right'></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vCell',
        props: {
            icon: String,
            callback: Function
        }
    };
</script>