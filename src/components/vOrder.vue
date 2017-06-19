<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-order.active:active {
        .v-order-header,
        .v-order-main,
        .v-order-footer {
            background-color: darken($white, 2%);
        }
    }

    .v-order-header {
        position: relative;
        padding-left: pxTorem(30);
        line-height: pxTorem(76);
        font-size: pxTorem(24);
        color: #646565;
        background-color: $white;
        .iconfont {
            font-size: pxTorem(30);
            margin-right: pxTorem(12);
            vertical-align: middle;
        }
        .red-dot {
            position: absolute;
            top: 50%;
            right: pxTorem(30);
            width: pxTorem(8);
            height: pxTorem(8);
            background-color: $red;
            transform: translateY(-50%);
            border-radius: 50%;
        }
    }

    .v-order-main {
        @include flex-center-v;
        height: pxTorem(155);
        border-top: 1px solid $gray-light;
        padding: 0 pxTorem(30);
        background-color: $white;
        &.border {
            border-bottom: 1px solid #d3d4d6;
        }
        .pic {
            width: pxTorem(133); // height: pxTorem(133);
            height: pxTorem(133);
            line-height: pxTorem(133);
            text-align: center;
            img {
                max-width: pxTorem(133);
                max-height: pxTorem(133);
            }
        }
        .describe {
            @include flex-center-h;
            flex: 1;
            flex-direction: column;
            height: 80%;
            padding-left: pxTorem(25);
            h2 {
                @include text-ellipsis;
                height: pxTorem(60);
                line-height: pxTorem(60);
                color: #3d4244;
                font-size: pxTorem(34);
            }
            p {
                color: #a9aaae;
                font-size: pxTorem(24);
            }
            span {
                float: right;
            }
        }
    }
</style>
<template>
    <div :class='["v-order",{active:active}]'>
        <header class='v-order-header'>
            <i class='iconfont  icon-order'></i> 订单号：{{id}}
            <div v-if='dot' class='red-dot'></div>
        </header>
        <main :class='["v-order-main",{border:hasBorder}]'>
            <div class='pic'>
                <img v-lazy='img' />
            </div>
            <div class='describe'>
                <h2>{{name}}</h2>
                <p> {{integral}}积分
                    <span>x1</span>
                </p>
            </div>
        </main>
        <footer>
            <slot> </slot>
        </footer>
    </div>
</template>
<script>
    export default {
        props: {
            order: Object,
            img: String,
            id: String,
            integral: Number,
            name: String,
            hasBorder: {
                type: Boolean,
                default: false
            },
            active: {
                type: Boolean,
                default: false
            },
            dot: {
                type: Boolean,
                default: false
            }
        }
    };
</script>