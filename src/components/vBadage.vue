<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-badage {
        width: pxTorem(50);
        height: pxTorem(50);
        position: absolute;
        right: pxTorem(45);
        top: pxTorem(0);
        background-color: $white;
        color: $red;
        border-radius: 50%;
        border: 2px solid $red;
        text-align: center;
        line-height: pxTorem(50);
        font-weight: bold;
        box-sizing: content-box;
        z-index: 1;
        transform: scale(0.5);
        -webkit-transform:scale(0.5);
    }
</style>
<template>
    <div v-if='num>0' class='v-badage' :style='position'>{{num}}</div>
</template>
<script>
    export default {
        props: {
            num: Number,
            position: Object
        },
        computed: {}
    }
</script>