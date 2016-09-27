<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 $panel-gap;
}
</style>
<template>
    <div class='sticky bg-white border-t-1'>
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
