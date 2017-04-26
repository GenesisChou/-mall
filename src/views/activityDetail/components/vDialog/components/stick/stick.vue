<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .stick {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-485/2);
        margin-top: pxTorem(-656/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(485);
            height: pxTorem(656);
            overflow: hidden;
            background: url('./images/stickBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left: 50%;
            bottom: 20.7%;
            width: pxTorem(215);
            height: pxTorem(215);
            border-radius: pxTorem(10);
            transform: translateX(-50%);
        }
        .message {
            width: 100%;
            height: pxTorem(38);
            margin-top: pxTorem(16);
            line-height: pxTorem(38);
            overflow: hidden;
            text-align: center;
            color: #ee5917;
        }
        .score {
            margin-top: 32%;
            text-align: center;
            span {
                padding: pxTorem(6) pxTorem(20);
                color: $white;
                background-color: #4eb2a6;
                border-radius: pxTorem(10);
                font-size: pxTorem(43);
                font-weight: 500;
            }
        }

        .operation {
            @include flex-center;
            @include active(#ee5917,
            5%);
            position: absolute;
            bottom: 4.5%;
            left: 6%;
            width: pxTorem(180);
            height: pxTorem(63);
            font-size: pxTorem(30);
            background-color: #ee5917;
            color: $white;
            border-radius: pxTorem(10);
            &:last-child {
                left: auto;
                right: 6%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='stick'>
            <div class='content'>
                <div class='score'>
                    <span>分数：{{dialog.score}}</span>
                </div>
                <h5 class='message'>{{dialog.msg}}</h5>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'>再玩一次</div>
                <div class='operation' @click='func'>查看奖品</div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'stick',
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