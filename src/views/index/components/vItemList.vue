<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        @include clearfix;
        display: flex;
        align-items: center;
        width: 100%;
        list-style: none;
        padding: pxTorem(20) pxTorem(35);
        background-color: $white;
    }

    .left {
        position: relative;
        .img {
            width: pxTorem(250);
            height: pxTorem(250);
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
        flex: 1;
        position: relative;
        padding: 0 pxTorem(37);
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
    <ul class='v-item-list'>
        <li v-for='item in layout.items' class='v-item' @click='routerLink(item,layout)'>
            <div class='left'>
                <span v-if='layout.show_script===1'>
                {{item.script}}
            </span>
                <img v-if='layout.show_script===1' class='red-arrows' src="./images/redArrows.png">
                <img class='img' :src='item.pic_thumb_new'>
            </div>
            <div class='message'>
                <h5 v-if='layout.show_title===1'>{{item.title}}</h5>
                <h6 v-if='layout.show_subtitle===1'>{{item.subtitle}}</h6>
                <p v-if='layout.show_integral===1' class='integral'>{{item.integral>>0}}积分 </p>
                <img v-if='layout.show_integral===1' class='icon' :src='getIcon(item)'>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vItemList',
        props: {
            layout: Object,
            routerLink: Function,
            getIcon: Function
        },
    };
</script>