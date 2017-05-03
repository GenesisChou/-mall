<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        @include clearfix;
        position: relative;
        width: 100%;
        list-style: none;
        padding: pxTorem(20) 0;
        background-color: $white;
    }

    .head {
        position: relative;
        width: pxTorem(658);
        height: pxTorem(658);
        margin: 0 auto;
        .img {
            width: 100%;
            height: 100%;
        }
        span {
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(155);
            height: pxTorem(70);
            line-height: pxTorem(70);
            overflow: hidden;
            text-align: center;
            color: $white;
            font-size: pxTorem(34);
            z-index: 1;
        }
        .red-arrows {
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(174);
            height: pxTorem(70);
        }
    }

    .message {
        margin: 0 pxTorem(46);
        padding-top: pxTorem(15);
        border-bottom: 1px solid #d3d4d6;
        h1 {
            height: pxTorem(80);
            padding-left: pxTorem(39);
            line-height: pxTorem(80);
            font-size: pxTorem(54);
            overflow: hidden;
        }
        h2 {
            height: pxTorem(68);
            padding-left: pxTorem(39);
            line-height: pxTorem(68);
            font-size: pxTorem(46);
            overflow: hidden;
            color: #a9aaae;
        }
        .integral {
            height: pxTorem(85);
            padding: 0 pxTorem(100) 0 pxTorem(39);
            margin-bottom: pxTorem(20);
            line-height: pxTorem(85);
            overflow: hidden;
            color: $orange;
            font-size: pxTorem(46);
        }
        .icon {
            position: absolute;
            width: pxTorem(98);
            height: pxTorem(98);
            right: pxTorem(28);
            bottom: pxTorem(36);
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
            <footer v-if='show_message' class='message'>
                <h1 v-if='layout.show_title===1'>{{item.title}}</h1>
                <h2 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h2>
                <p v-if='layout.show_integral===1' class='integral'>{{item.integral>>0}}积分 </p>
                <img class='icon' :src='getIcon(item)'>
            </footer>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vItemLarge',
        mixins: [require('../mixin.js')],

    };
</script>