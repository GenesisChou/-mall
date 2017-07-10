<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-award-box {
        position: relative;
        width: pxTorem(722);
        margin: pxTorem(48) auto;
        padding-bottom: pxTorem(10);
        border-radius: pxTorem(10);
        border-width: pxTorem(4);
        border-style: solid;
        ul,
        li {
            list-style: none;
        }
        &.red {
            background: #ffdddd;
            border-color: #fe7a6f;
        }
        &.green {
            background: #e7f758;
            border-color: #78cc1e;
        }
        &.aquamarine {
            background: #d0eff1;
            border-color: #2ba7a9;
        }
        &.blue {
            background: #87e7ff;
            border-color: #29cfff;
        }
        &.navy {
            background: #89deee;
            border-color: #399fae;
        }
        &.brown {
            background: #cf9500;
            border-color: #a26a01;
        }
        &.palaceblue {
            background: #30c7fe;
            border-color: #0696f1;
        }
        &.emerald {
            background: #227668;
            border-color: #05543d;
        }
        &.army {
            background: #34ad54;
            border-color: #1d7233;
        }
        &.purple {
            background: #ce65ee;
            border-color: #9901aa;
        }
        &.orange {
            background: #ffbb6a;
            border-color: #f8951e;
        }
        &.yellow {
            background: #ffd916;
            border-color: #e8af00;
        }
        .wrapper {
            width: 100%;
            overflow-x: hidden;
        }
        ul {
            white-space: nowrap; // display:flex;
        }
        .title {
            padding-left: pxTorem(26);
            line-height: pxTorem(47);
            color: $white;
        }
        .award {
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center; // width: pxTorem(155);
            // height: pxTorem(175);
            margin: 0 pxTorem(12);
            padding: pxTorem(5) pxTorem(5) 0 pxTorem(5);
            img {
                width: pxTorem(144);
                height: pxTorem(144);
            }
            h6 {
                color: $white;
                font-size: pxTorem(22);
            }
            &.red {
                background-color: #fe7a6f;
            }
            &.green {
                background-color: #78cc1e;
            }
            &.aquamarine {
                background-color: #2ba7a9;
            }
            &.blue {
                background-color: #29cfff;
            }
            &.navy {
                background-color: #399fae;
            }
            &.brown {
                background-color: #a26a01;
            }
            &.palaceblue {
                background-color: #1081e1;
            }
            &.emerald {
                background-color: #019a88;
            }
            &.army {
                background-color: #1d7233;
            }
            &.purple {
                background-color: #9901aa;
            }
            &.orange {
                background-color: #e76241;
            }
            &.yellow {
                background-color: #e8af00;
            }
        }
    }
</style>
<template>
    <div :class='["v-award-box",color]'>
        <div class='wrapper'>
            <h6 class='title'>奖品列表</h6>
            <ul ref='scroller'>
                <li :class='["award",color]' v-for='award in awords'>
                    <img :src='award.pic'>
                    <h6>
                        {{award.name|filter}}
                    </h6>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    /*global  utils:true*/
    import Transform from 'alloytouch/transformjs/transform.js';
    import AlloyTouch from 'alloytouch/alloy_touch.js';
    export default {
        props: {
            awords: {
                default: () => [],
                type: Array
            },
            color: String
        },
        mounted() {
            const scroller = this.$refs.scroller,
                length = this.awords.length;
            let min = 0;
            if (length > 3) {
                const width = scroller.firstElementChild.offsetWidth + this.getSize(35);
                min = -(width * length - utils.getClientWidth() + 50);
            }
            Transform(scroller);
            new AlloyTouch({
                touch: '.wrapper',
                vertical: false,
                target: scroller,
                property: 'translateX',
                min,
                max: 0
            });
        },
        methods: {
            getSize(value) {
                return value * utils.getClientWidth() / 750;
            }
        },
        filters: {
            filter(str) {
                return str.length < 5 ? str : str.substr(0, 5) + '...';
            }
        }
    };
</script>