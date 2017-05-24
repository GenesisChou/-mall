<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-subject {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:pxTorem(750);
        height: pxTorem(252);
        padding: 0 pxTorem(28); 
        margin-bottom: pxTorem(14);
        background-color: $white; 
        border-bottom: 1px solid #d3d4d6;
        overflow:hidden;
        img {
            width: pxTorem(220);
            height: pxTorem(220);
        }
    }
</style>
<template>
    <div class='v-subject'>
        <img v-for='item in layout.items' v-lazy='item.pic_thumb_new' @click='routerLink(item,layout)'>
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