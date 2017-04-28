<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        @include clearfix;
        width: 100%;
        list-style: none;
        padding: pxTorem(20) 0;
        background-color: $white;
    }

    .head {
        position:relative;
        width: pxTorem(640);
        height: pxTorem(640);
        margin:0 auto;
        .img {
            width: 100%;
            height: 100%;
        }
        span {
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(70);
            height: pxTorem(34);
            line-height: pxTorem(34);
            text-align: center;
            color: $white;
            font-size: pxTorem(16);
            z-index: 1;
        }
        .red-arrows {
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(86);
            height: pxTorem(34);
        }
    }

    .message {
        position: relative;
        padding: 0 pxTorem(55);
        padding-top: pxTorem(15);
        overflow: hidden;
        h5 {
            height: pxTorem(40);
            line-height: pxTorem(40);
        }
        h6 {
            height: pxTorem(35);
            line-height: pxTorem(35);
            color: #a9aaae;
        }
        .integral {
            color: $orange;
            border-bottom: 1px solid #d3d4d6;
            padding-top: pxTorem(3);
            padding-bottom: pxTorem(12);
        }
        .icon {
            position: absolute;
            width: pxTorem(47);
            height: pxTorem(47);
            right: pxTorem(47/2);
            bottom: pxTorem(10);
        }
    }
</style>
<template>
    <ul class='v-item-large'>
        <li v-for='item in layout.items' class='v-item' @click='routerLink(item,layout)'>
            <header class='head'>
                <span v-if='layout.show_script===1'>{{item.script}}</span>
                <img v-if='layout.show_script===1' class='red-arrows' src="./images/redArrows.png">
                <img class='img' :src='item.pic_thumb_new'>
            </header>
            <footer class='message'>
                <h5 v-if='layout.show_title===1'>{{item.title}}</h5>
                <h6 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h6>
                <p v-if='layout.show_integral===1' class='integral'>{{item.integral>>0}}积分 </p>
                <img v-if='layout.show_integral===1' class='icon' :src='getIcon(item)'>
            </footer>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vItemLarge',
        props: {
            layout: Object,
            routerLink: Function,
            getIcon: Function
        },
    };
</script>