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

.v-popup {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    border-top: 1px solid $gray-light;
    /*transform: translateY(100%);*/
    .close-popup{
    	position: absolute;
    	right: 0;
    	top: 0;
    	padding-right:pxTorem(20);
    	padding-top:pxTorem(20);
    }
}
</style>
<template>
    <transition name='popup'>
        <div class='v-popup ' v-show='show'>
            <i class='close-popup iconfont icon-error text-sliver text-large' @click='togglePopup()'></i>
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        togglePopup: Function,
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>
