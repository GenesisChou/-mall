<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-items-small {
        overflow: hidden;
        background-color: $white;
        padding: 0 pxTorem(28);
    }

    .v-item {
        @include active;
        @include clearfix;
        position: relative;
        width: 50%;
        padding: pxTorem(20) 0;
        list-style: none;
        float: left;
        background-color: $white;
    }

    .head {
        position: relative;
        margin: 0 auto;
        width: pxTorem(310);
        height: pxTorem(310);
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
        margin: 0 pxTorem(24) 0 pxTorem(23);
        padding-top: pxTorem(15);
        padding-bottom: pxTorem(12);
        overflow: hidden;
        border-bottom: 1px solid #d3d4d6;
        h5 {
            height: pxTorem(38);
            line-height: pxTorem(38);
            padding-left: pxTorem(16);
            overflow: hidden;
        }
        h6 {
            height: pxTorem(40);
            padding-left: pxTorem(16);
            line-height: pxTorem(40);
            font-size: pxTorem(22);
            overflow: hidden;
            color: #a9aaae;
        }
        .integral {
            height: pxTorem(32);
            padding-left: pxTorem(16);
            padding-right: pxTorem(50);
            line-height: pxTorem(32);
            font-size: pxTorem(22);
            overflow: hidden;
            color: $orange;
        }
        .icon {
            position: absolute;
            width: pxTorem(46);
            height: pxTorem(46);
            right: pxTorem(16);
            bottom: pxTorem(32);
        }
    }
</style>
<template>
    <ul class='v-items-small'>
        <div v-for='item in layout.items' class='v-item' @click='routerLink(item,layout)'>
            <header class='head'>
                <span v-if='layout.show_script===1'>
                {{item.script}}
            </span>
                <img v-if='layout.show_script===1' class='red-arrows' src="./images/redArrows.png">
                <img class='img' v-lazy='item.pic_thumb_new'>
            </header>
            <footer v-if='show_message' class='message'>
                <h5 v-if='layout.show_title===1'>{{item.title}}</h5>
                <h6 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h6>
                <p v-if='layout.show_integral===1' class='integral'>{{item.integral>>0}}积分</p>
                <img v-if='layout.show_integral===1' class='icon' :src='getIcon(item)'>
            </footer>
        </div>
    </ul>
</template>
<script>
    export default {
        name: 'vItemSmall',
        mixins: [require('../mixin.js')],
    };
</script>