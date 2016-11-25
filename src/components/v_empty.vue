<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -100%);
    /* IE 9 */
    -moz-transform: translate(-50%, -100%);
    /* Firefox */
    -webkit-transform: translate(-50%, -100%);
    /* Safari 和 Chrome */
    -o-transform: translate(-50%, -100%);
    img {
        width: pxTorem(280);
        height: pxTorem(273);
    }
}
</style>
<template>
    <div class='v-empty'>
        <img src='../assets/images/empty.png'>
    </div>
</template>
<script>
export default {

}
</script>
