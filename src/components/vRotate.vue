<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .rotate-leave-active {
        // -webkit-transform-origin: pxTorem(50) pxTorem(50);
        backface-visibility: hidden;
        transform: rotateY(180deg);
        transition: 1s cubic-bezier(0.5, 1, 0.5, 1.3);
    }
    
    .rotate-enter {
        transform: rotateY(180deg);
    }
    
    .rotate-enter-active {
        -webkit-transform-origin: pxTorem(-50) 0;
        backface-visibility: hidden;
        transition: 1s cubic-bezier(0.5, 1, 0.5, 1.3);
    }
    
    .rotate-enter-to {
        transform: rotateY(360deg);
    }
</style>
<template>
    <div class='v-rotate' ref='vRotate'>
        <transition name='rotate'>
            <div v-if='value' class='front'>
                <slot name='front'></slot>
            </div>
        </transition>
        <transition name='rotate'>
        <div v-if='!value' class="back">
            <slot  name='back'></slot>
        </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            value: Boolean
        }
    }
</script>