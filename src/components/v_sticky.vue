<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: pxTorem(1) solid $sliver;
}
</style>
<template>
    <div class='v-sticky bg-white'>
        <slot></slot>
    </div>
</template>
<script>
export default {

    name: 'v-sticky',

    data() {
        return {

        };
    }
};
</script>
