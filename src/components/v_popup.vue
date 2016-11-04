<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.popup-enter-active,
.popup-leave-active {
    transition: transform .5s
}

.popup-enter,
.popup-leave-active {
    transform: translateY(100%);
}

.v-popup-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /*height: 30%;*/
    border-top: 1px solid $gray-light;
    /*transform: translateY(100%);*/
    .close-popup {
        position: absolute;
        right: 0;
        top: 0;
        height: pxTorem(135);
        line-height: pxTorem(135);
        padding-right: pxTorem(20);
        /*padding-top: pxTorem(45);*/
    }
}

.v-popup .bg-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 1;
}
</style>
<template>
    <section class='v-popup'>
        <div class='bg-cover' v-show='show'>
            <transition name='popup'>
                <div class='v-popup-content' v-show='show'>
                    <i class='close-popup iconfont icon-error text-bold text-huge' @click='close()'></i>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </section>
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
}
</script>
