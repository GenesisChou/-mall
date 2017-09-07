<style lang='scss' scoped>
    @import '../../../../../../../assets/scss/variable.scss';
    .v-notice {
        @include flex-center;
        position: absolute;
        left: 50%;
        top: 30%;
        width: pxTorem(315);
        height: pxTorem(67);
        margin-left: pxTorem(-315/2);
        background-color: #4e4e4e;
        border-radius: pxTorem(10);
        color: $white;
        z-index: 6
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='v-notice'>
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            show: Boolean
        },
    };
</script>