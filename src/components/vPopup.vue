<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-popup {
        .v-popup-content {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid $gray-light;
            z-index: 2;
        }
        .close-popup {
            position: absolute;
            right: 0;
            top: 0;
            padding-right: pxTorem(20);
            padding-top: pxTorem(20);
            color: $orange;
        }
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 1;
        }
        .iconfont {
            font-size: pxTorem(40);
        }
    }
    .popup-enter-active,
    .popup-leave-active {
        transition: transform .5s;
    }

    .popup-enter,
    .popup-leave-active {
        transform: translate3d(0, 100%, 0);
    }
</style>
<template>
    <div class='v-popup'>
        <transition name='popup'>
            <div v-show='show' class='v-popup-content'>
                <i class='close-popup iconfont icon-close-circle' @click='close'></i>
                <slot></slot>
            </div>
        </transition>
        <div v-show='show' class='bg-cover'></div>
    </div>
</template>
<script>
    export default {
        props: {
            togglePopup: Function,
            callback: Function,
            show: {
                type: Boolean,
                default: false
            },

        },
        methods: {
            close() {
                if (this.callback) {
                    this.callback();
                } else {
                    this.togglePopup();
                }
            }
        }
    };
</script>