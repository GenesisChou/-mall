<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -100%);
    -moz-transform: translate(-50%, -100%);
    -webkit-transform: translate(-50%, -100%);
    -o-transform: translate(-50%, -100%);
    img {
        width: pxTorem(280);
        height: pxTorem(273);
    }
}
</style>
<template>
    <div class='v-empty'>
        <img src='../../assets/images/empty.png'>
    </div>
</template>
