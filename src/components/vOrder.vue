<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-order {
        border-bottom: 1px solid $gray-light;
    }

    .v-order-header {
        padding-left: pxTorem(30);
        line-height: pxTorem(76);
        font-size: pxTorem(24);
        color: #646565;
        background-color: $white;
        .iconfont {
            font-size: pxTorem(30);
            margin-right:pxTorem(12);
        }
    }

    .v-order-main {
        display: flex;
        align-items: center;
        display: -webkit-flex;
        -webkit-align-items: center;
        height: pxTorem(155);
        border-top: 1px solid $gray-light;
        padding: 0 pxTorem(30);
        background-color: $white;
        .pic {
            width: pxTorem(160);
            height: pxTorem(120);
        }
        .describe {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            -webkit-flex: 1;
            display: -webkit-flex;
            -webkit-flex-direction: column;
            -webkit-justify-content: space-between;
            height: 80%;
            padding-left: pxTorem(25);
            h2 {
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
    <div class='v-order'>
        <header class='v-order-header'>
            <i class='iconfont  icon-order'></i> 订单号：{{id}}
        </header>
        <main class='v-order-main'>
            <img class='pic' :src='img' />
            <div class='describe'>
                <h2 class='text-ellipsis'>{{name}}</h2>
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
            name: String
        }
    }
</script>