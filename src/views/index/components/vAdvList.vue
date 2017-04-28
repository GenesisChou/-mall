<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-adv {
        // margin-bottom: pxTorem(15);
        li {
            list-style: none;
        }
        img {
            width: pxTorem(750);
            height: pxTorem(330);
        }
    }
</style>
<template>
    <ul class='v-adv'>
        <li v-for='item in layout.items'>
            <img class='v-adv' :src='item.pic_banner_new' @click='routerLink(item,layout)'>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vAdvList',
        props: {
            layout: Object,
            routerLink: Function
        },
    };
</script>