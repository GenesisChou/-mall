<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-subject {
        display: flex;
        justify-content: space-between;
        padding: 0 pxTorem(28); // margin-bottom: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        img {
            width: pxTorem(222);
            height: pxTorem(222);
        }
    }
</style>
<template>
    <div class='v-subject'>
        <img v-for='item in layout.items' :src='item.pic_thumb_new' @click='routerLink(item,layout)'>
    </div>
</template>
<script>
    export default {
        name: 'vSubjectOne',
        props: {
            layout: Object,
            routerLink: Function
        }
    };
</script>