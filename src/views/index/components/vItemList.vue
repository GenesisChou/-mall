<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        display: flex;
        position: relative;
        width: pxTorem(722);
        padding: pxTorem(20) pxTorem(26) pxTorem(20) pxTorem(32);
        margin: 0 auto pxTorem(14) auto;
        list-style: none;
        background-color: $white;
    }

    .left {
        position: relative;
        .img {
            width: pxTorem(310);
            height: pxTorem(310);
        }
        span {
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(70);
            height: pxTorem(34);
            overflow: hidden;
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
        flex: 1;
        padding-left: pxTorem(19);
        padding-top: pxTorem(34);
        h3 {
            max-height: pxTorem(88);
            line-height: pxTorem(44);
            overflow: hidden;
        }
        h5 {
            height: pxTorem(38);
            line-height: pxTorem(38);
            overflow: hidden;
            color: #a9aaae;
        }
        .integral {
            color: $orange;
        }
        .icon {
            position: absolute;
            width: pxTorem(46);
            height: pxTorem(46);
            right: pxTorem(25);
            bottom: pxTorem(36);
        }
    }
</style>
<template>
    <ul class='v-item-list'>
        <li v-for='item in layout.items' class='v-item' @click='routerLink(item,layout)'>
            <div class='left'>
                <span v-if='layout.show_script&&item.script'>
                {{item.script}}
            </span>
                <img v-if='layout.show_script===1&&item.script' class='red-arrows' src="./images/redArrows.png">
                <img class='img' v-lazy='item.pic_thumb_new'>
            </div>
            <div class='message'>
                <h3 v-if='layout.show_title===1'>{{item.title}}</h3>
                <h5 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h5>
                <p v-if='layout.show_integral===1' class='integral'>{{item.integral>>0}}积分 </p>
                <img v-if='layout.show_integral===1' class='icon' :src='getIcon(item)'>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vItemList',
        mixins: [require('../mixin.js')],
    };
</script>