<style lang='scss' scoped>
@import '../assets/scss/variable.scss';
.v-sticky {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid $gray-light;
    background-color:$white;
}
</style>
<template>
    <div class='v-sticky'>
        <slot></slot>
    </div>
</template>
