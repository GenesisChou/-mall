<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    img {
        width: pxTorem(750);
        height: auto;
        transform: translateY(pxTorem(-120));
    }
</style>
<template>
    <div class='qr-code'>
        <img :src='img'>
    </div>
</template>
<script>
    export default {
        name: 'qrCode',
        computed: {
            img() {
                return this.$store.state.qr_code.qr_code_pic;
            }
        }
    };
</script>