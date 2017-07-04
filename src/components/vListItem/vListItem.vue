<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-list-item {
        @include active;
        width: pxTorem(750);
        padding: 0 pxTorem(30);
        background-color: $white;
        overflow: hidden;
    }

    .container {
        @include flex-center-v;
        height: pxTorem(226);
        border-bottom: 1px solid $gray-light;
        .img {
            position: relative;
            width: pxTorem(185);
            height: pxTorem(185);
            margin-left: pxTorem(10);
            margin-right: pxTorem(60);
            img {
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
        .describe {
            flex: 1;
            text-align: justify;
        }
        h2 {
            height: pxTorem(46);
            line-height: pxTorem(46);
        }
        h6 {
            height: pxTorem(40);
            line-height: pxTorem(40);
            color: #babbbe;
        }
        .integral {
            display: flex;
            align-items: center;
            padding-top: pxTorem(10);
            color: $orange;
            strong {
                width: pxTorem(78);
                height: pxTorem(32);
                line-height: pxTorem(32);
                text-align: center;
                font-weight: normal;
                font-size: pxTorem(22);
                background: #ff5000;
                color: $white;
            }
            span {
                height: pxTorem(32);
                line-height: pxTorem(32);
                overflow: hidden;
                padding: 0 pxTorem(10);
                color: #ff5000;
                font-size: pxTorem(32);
            }
            s {
                height: pxTorem(32);
                line-height: pxTorem(32);
                overflow: hidden;
                font-size: pxTorem(22);
                color: #a9aaae;
                transform: translateY(5%);
            }
        }
        &.no-border {
            border-bottom: none;
        }
    }
</style>
<template>
    <div class='v-list-item'>
        <div :class='["container",{"no-border":noBorder}]'>
            <div class='img'>
                <img v-lazy='img'>
                <span v-if='script'>
                    {{script}}
                </span>
                <img v-if='script' class='red-arrows' src="./images/redArrows.png">
            </div>
            <div class='describe'>
                <h2 class='text-ellipsis'>{{title}}</h2>
                <h6 class='text-ellipsis'>{{titleDupty}}</h6>
                <h3 class='integral'>
                    <template v-if='item.show_share_integral===1'>
                        <strong>分享后</strong><span>{{parseInt(item.share_integral) || 0}}积分</span>
                        <s>{{parseInt(item.integral)}}积分</s>
                    </template>
                    <template v-else>
                        {{integral}}积分
                    </template>
                </h3>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vListItem',
        props: {
            img: String,
            title: String,
            titleDupty: String,
            integral: Number,
            noBorder: {
                type: Boolean,
                default: false
            },
            script: String,
            item: Object
        },
    };
</script>