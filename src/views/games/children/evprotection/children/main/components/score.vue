<style lang='scss' scoped>
    @import '../../../../../../../assets/scss/variable.scss';
    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: pxTorem(60);
        top: pxTorem(52);
        width: pxTorem(222);
        height: pxTorem(76);
        font-size: pxTorem(44);
        font-weight: bold;
        background: #fdf298;
        color: #211d22;
        border: pxTorem(6) solid #211d22;
        border-radius: pxTorem(10);
    }
</style>
<template>
    <div class='score'>
        <slot></slot>
    </div>
</template>