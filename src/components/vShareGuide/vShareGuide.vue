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
            width: pxTorem(694);
            height: pxTorem(264);
        }
        .msg {
            li {
                list-style: none;
                font-size: pxTorem(36);
            }
            position:absolute;
            top: pxTorem(-350);
            left: 50%;
            transform: translateX(-50%);
            color: $white;
        }
        .icon-share-time {
            font-size: pxTorem(45);
        }
        .arrows {
            position: absolute;
            top: pxTorem(-420);
            right: pxTorem(20);
            width: pxTorem(100);
            height: pxTorem(100);
            color: $white;
        }
        .btn {
            @include flex-center;
            position: absolute;
            top: pxTorem(480);
            left: 50%;
            transform: translateX(-50%);
            width: pxTorem(326);
            height: pxTorem(90);
            font-size: pxTorem(30);
            color: $white;
            background-color: #000;
            border: 1px solid $white;
            border-radius: pxTorem(30);
            &:active {
                background-color: #222;
            }
        }
        .dot {
            position: absolute;
            left: pxTorem(80);
            width: pxTorem(128);
            height: pxTorem(184);
            &.top {
                top: pxTorem(-200);
            }
            &.bottom {
                bottom: pxTorem(-200);
                transform: rotateX(180deg);
            }
        }
    }
</style>
<template>
    <div class='v-share-guide'>
        <div v-show='show' class='bg-cover'>
        </div>
        <div v-show='show' class='content'>
            <ul class='msg'>
                <li>1、点击右上角的 “...”</li>
                <li>2、选择“ <i class='iconfont icon-share-time'></i> ”即可</li>
            </ul>
            <img class='dot top' src='./images/dot.png'>
            <img class='dot bottom' src='./images/dot.png'>
            <img class='arrows' src='./images/arrows.png'>
            <img class='share' src='./images/share.png'>
            <div class='btn' @click='close'>完成分享 立即参加</div>
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
        watch: {
            // show(v) {
            //     utils.toggleTouchMove(v);
            // }
        },
        methods: {
            close() {
                this.$emit('update:show', false);
            },
        }
    };
</script>