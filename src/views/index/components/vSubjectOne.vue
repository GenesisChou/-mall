<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-subject {
        // margin-bottom: pxTorem(20);
        overflow: hidden;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        img:nth-child(1) {
            width: pxTorem(456);
            height: pxTorem(456);
            margin: pxTorem(14) 0 pxTorem(14) pxTorem(28);
            float: left;
        }
        img:nth-child(2),
        img:nth-child(3) {
            width: pxTorem(222);
            height: pxTorem(222);
            margin-right: pxTorem(28);
            float: right;
        }
        img:nth-child(2) {
            margin: pxTorem(14) pxTorem(28) pxTorem(12) 0;
        }
    }
</style>
<template>
    <div class='v-subject'>
        <img v-for='(item,$index) in layout.items' :src='$index==0?item.pic_init_new:item.pic_thumb_new' @click='routerLink(item,layout)'>
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