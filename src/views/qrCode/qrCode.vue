<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    img {
        width: pxTorem(750);
        height: auto;
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
        data() {
            const img = this.$route.query.img;
            return {
                img
            };
        }
    };
</script>