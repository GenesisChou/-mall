<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-share-guide {
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .76);
            z-index: 5;
        }
        .content {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 6
        }
        .share {
            width: pxTorem(750);
            height: pxTorem(315);
        }
        .msg {
            li {
                list-style: none;
                font-size: pxTorem(36);
            }
            li:first-child {
                position: relative;
                &:after {
                    content: '“...”';
                    position: absolute;
                    right: pxTorem(-40);
                    top: 0;
                }
            }

            position:absolute;
            top: pxTorem(-330);
            left: 50%;
            transform: translateX(-50%);
            color: $white;
            z-index:1;
        }
        .icon-share-time {
            font-size: pxTorem(45);
        }
        .arrows {
            position: absolute;
            top: pxTorem(-420);
            right: pxTorem(70);
            width: pxTorem(75);
            height: pxTorem(75);
            color: $white;
        }
        .btn {
            @include flex-center;
            position: absolute;
            top: pxTorem(490);
            left: 30%;
            width: pxTorem(173);
            height: pxTorem(63);
            background: url('./images/button.png');
            background-size: 100% 100%;
        }
        .dot-left {
            position: absolute;
            left: pxTorem(240);
            top: pxTorem(-160);
            width: pxTorem(80);
            height: pxTorem(119);
        }
        .dot-right {
            position: absolute;
            left: pxTorem(240);
            bottom: pxTorem(-120);
            width: pxTorem(47);
            height: pxTorem(106);
        }
    }
</style>
<template>
    <div class='v-share-guide'>
        <div v-show='show' class='bg-cover'>
        </div>
        <div v-show='show' class='content'>
            <ul class='msg'>
                <li>1、点击右上角的 </li>
                <li>2、选择“ <i class='iconfont icon-share-time'></i> ”即可</li>
            </ul>
            <img class='dot-left' src='./images/arrowsLeft.png'>
            <img class='dot-right ' src='./images/arrowsRight.png'>
            <img class='arrows' src='./images/arrows.png'>
            <img class='share' src='./images/share.png'>
            <div class='btn' @click='close'></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
        },
        data() {
            const touchMoveEvent = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            return {
                touchMoveEvent
            };
        },
        methods: {
            close() {
                this.$emit('update:show', false);
            },
        }
    };
</script>