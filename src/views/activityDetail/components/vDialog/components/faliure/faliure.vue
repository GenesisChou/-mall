<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .faliure {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 6;
        width: pxTorem(540);
        height: pxTorem(581);
        margin-left: pxTorem(-540/2);
        margin-top: pxTorem(-581/2);
        background-color: $white;
        border-radius: pxTorem(30);
        .close {
            @include flex-center;
            right: pxTorem(-15);
            top: pxTorem(-15);
            position: absolute;
            width: pxTorem(50);
            height: pxTorem(50);
            background-color: $white;
            border-radius: 50%;
        }
        .icon-error {
            font-size: pxTorem(25);
            font-weight: bold;
        }
        h1 {
            // height: pxTorem(92);
            padding: pxTorem(20);
            font-size: pxTorem(38);
            color: #fe112d;
            &.title {
                padding-top: pxTorem(50);
                text-align: center;
            }
        }
        h2 {
            height: pxTorem(44);
            line-height: pxTorem(44);
        }
        img {

            position: absolute;
            left: 50%;
            top: 50%;
            width: pxTorem(306);
            height: pxTorem(265);
            transform: translate(-50%, -50%);
        }
        .operation {
            @include flex-center;
            position: absolute;
            height: pxTorem(59);
            border-radius: pxTorem(10);
            font-size: pxTorem(28);
            bottom: pxTorem(50);
            &.purple {
                @include active(#a401d6,
                5%);
                left: 50%;
                width: pxTorem(241);
                background-color: #a401d6;
                color: $white;
                transform: translateX(-50%);
            }
            &.right {
                right: pxTorem(60);
            }
            &.left {
                left: pxTorem(60);
            }
        }
        footer {
            display: flex;
            justify-content: space-between;
            width: pxTorem(416);
            .operation {
                width: pxTorem(177);
                &:first-child {
                    @include active($white, 2%);
                    color: #feae2f;
                    border: 1px solid #feae2f;
                }
                &:last-child {
                    @include active(#feae2f,
                    5%);
                    color: $white;
                    background-color: #feae2f;
                    border: 1px solid #feae2f;
                }
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='faliure'>
            <div class='close' @click='close'>
                <i class='iconfont icon-error'></i>
            </div>
            <template v-if='type==="lack"'>
                <h1>积分不足</h1>
                <h2>赚取积分后再来吧～</h2>
                <img src='./images/faliureLack.png'></img>
                <footer>
                    <div class='operation left' @click='close'>知道了</div>
                    <router-link :to='{name:"earn_integral"}' class='operation right' tag='div'>
                        去赚积分
                    </router-link>
                </footer>
            </template>
            <template v-else>
                <h1 class='title'>{{dialog.msg||"没中奖"}}</h1>
                <img src='./images/faliureDefault.png'></img>
                <div class='operation purple' @click='close'>{{dialog.btn_text||"知道了"}}</div>
            </template>

        </div>
    </transition>
</template>
<script>
    export default {
        name: 'faliure',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            },
        },
        computed: {
            type() {
                return this.dialog.faliure || '';
            }
        }
    };
</script>