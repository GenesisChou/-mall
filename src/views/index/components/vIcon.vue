<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .icon-list {
        display: flex;
        list-style: none; // border-bottom: 1px solid #d3d4d6;
        color: #666;
        font-size: pxTorem(24);
        // margin-bottom: pxTorem(20);
        li {
            @include active;
            @include flex-center;
            list-style: none;
            flex-direction: column;
            width: 25%;
            height: pxTorem(190);
            overflow: hidden;
            position: relative;
            text-align: center;
            background-color: $white;
            .v-badage {
                @include flex-center;
                width: pxTorem(50);
                height: pxTorem(50);
                position: absolute;
                right: pxTorem(45);
                top: pxTorem(0);
                background-color: $white;
                color: $red;
                border-radius: 50%;
                border: 2px solid $red;
                box-sizing: content-box;
                z-index: 1;
                transform: scale(0.5);
            }
        }
        p {
            width: 100%;
            height: pxTorem(30);
            overflow: hidden;
        }
        .icon {
            width: pxTorem(95);
            height: pxTorem(95);
            margin-bottom: pxTorem(15);
        }
    }
</style>
<template>
    <ul class='icon-list'>
        <li v-for='item in layout.items' @click='routerLink(item,layout)'>
            <img class='icon' :src='item.pic_thumb_new'>
            <p>{{item.title}}</p>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vIcon',
        props: {
            layout: Object,
            routerLink: Function
        },
    };
</script>