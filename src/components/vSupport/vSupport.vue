<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-support {
        line-height: pxTorem(110);
        color: #a0a7ad;
        border-top: 1px solid #d4d4d6;
        text-align:center;
    }
</style>
<template>
    <h4 class='v-support'> 由{{name}}提供技术支持 </h4>
</template>
<script>
    export default {
        name: 'vSupport',
        computed: {
            name() {
                return APP.NAME;
            },
        },
    };
</script>