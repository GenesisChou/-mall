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
            position:relative;
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
            padding-top: pxTorem(10);
            color: $orange;
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
                <h3 class='integral'>{{integral}}积分</h3>
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
            script: String
        },
    };
</script>