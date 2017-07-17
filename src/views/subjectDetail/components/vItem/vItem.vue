<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        @include clearfix;
        position: relative;
        width: pxTorem(355);
        padding: pxTorem(20) 0;
        margin: pxTorem(13) 0 0 pxTorem(13);
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
        overflow: hidden;
        h4 {
            height: pxTorem(38);
            line-height: pxTorem(38);
            padding-left: pxTorem(16);
            overflow: hidden;
        }
        h6 {
            height: pxTorem(40);
            padding-left: pxTorem(16);
            line-height: pxTorem(40);
            overflow: hidden;
            color: #a9aaae;
        }
        .integral {
            display: flex;
            align-items: center;
            height: pxTorem(32);
            padding-left: pxTorem(16);
            padding-right: pxTorem(50);
            line-height: pxTorem(32);
            font-size: pxTorem(22);
            overflow: hidden;
            color: $orange;
            strong {
                width: pxTorem(65);
                height: pxTorem(25);
                line-height: pxTorem(25);
                text-align: center;
                font-weight: normal;
                font-size: pxTorem(18);
                background: #ff5000;
                color: $white;
            }
            span {
                height: pxTorem(32);
                line-height: pxTorem(32);
                overflow: hidden;
                margin: 0 pxTorem(5) 0 pxTorem(8);
                color: #ff5000;
                font-size: pxTorem(24);
            }
            s {
                height: pxTorem(32);
                line-height: pxTorem(32);
                overflow: hidden;
                font-size: pxTorem(20);
                color: #a9aaae;
                transform: translateY(5%);
            }
        }
    }
</style>
<template>
    <div class='v-item' @click='callback(item)'>
        <header class='head'>
            <span v-if='item.script'>
                    {{item.script}}
                </span>
            <img v-if='item.script' class='red-arrows' src="./images/redArrows.png">
            <img class='img' v-lazy='item.pic'>
        </header>
        <footer class='message'>
            <h4>{{item.name}}</h4>
            <h6>{{item.sub_name}}</h6>
            <p class='integral'>
                <template v-if='item.type!==3'>
                    <template v-if='item.show_share_integral===1'>
                        <strong>分享后</strong><span>{{parseInt(item.share_integral) || 0}}积分</span>
                        <s>{{parseInt(item.integral)}}积分</s>
                    </template>
                    <template v-else>
                        {{parseInt(item.integral)}}积分
                    </template>
                </template>
            </p>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'vItem',
        props: {
            item: Object,
            callback: Function
        }
    };
</script>