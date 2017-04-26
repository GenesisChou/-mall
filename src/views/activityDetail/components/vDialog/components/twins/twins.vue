<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .twins {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-384/2);
        margin-top: pxTorem(-541/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(384);
            height: pxTorem(541);
            overflow: hidden;
            background: url('./images/twinsBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left: 50%;
            bottom: 34.4%;
            width: pxTorem(165);
            height: pxTorem(165);
            transform: translateX(-50%);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            top: 25%;
            width: 90%;
            height: pxTorem(36);
            line-height: pxTorem(36);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            font-size: pxTorem(24);
            color: #1276a8;
        }
        .score {
            position: absolute;
            left: 55%;
            top: 15.5%; // color: #010101;
            font-size: pxTorem(30); // font-weight: 500;
            -webkit-text-fill-color: $white;
            -webkit-text-stroke: #1176a8 1px;
        }

        .operation {
            position: absolute;
            left: 50%;
            bottom: 19%;
            width: pxTorem(190);
            height: pxTorem(54);
            transform: translateX(-50%);
            &:last-child {
                bottom: 6.5%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='twins'>
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <p class='message'>{{dialog.msg}}</p>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'twins',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                content_show: false,
                decoration_show: false
            };
        },
        mounted() {
            if (this.show) {
                setTimeout(() => {
                    this.content_show = true;
                }, 50);
            }
        }
    };
</script>