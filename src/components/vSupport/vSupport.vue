<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-support {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        height: pxTorem(110);
        color: #a0a7ad;
        border-top:1px solid #d4d4d6;
    }
</style>
<template>
    <h4 class='v-support'>
        由{{name}}提供技术支持
    </h4>
</template>
<script>
    export default {
        name: 'vSupport',
        computed: {
            name() {
                return APP.NAME;
            }
        },
    }
</script>