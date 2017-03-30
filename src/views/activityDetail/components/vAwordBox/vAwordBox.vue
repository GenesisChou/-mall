<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
.v-aword-box {
    position: relative;
    width: pxTorem(728);
    height: pxTorem(235);
    padding: pxTorem(45) pxTorem(20) 0 pxTorem(15);
    margin: pxTorem(48) auto 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.red {
        background-image: url('./images/redAwordBox.png');
    }
    &.green {
        background-image: url('./images/greenAwordBox.png');
    }
    &.aquamarine {
        background-image: url('./images/aquamarineAwordBox.png');
    }
    &.blue {
        background-image: url('./images/blueAwordBox.png');
    }
    &.navy {
        background-image: url('./images/navyAwordBox.png');
    }
    &.brown {
        background-image: url('./images/brownAwordBox.png');
    }
    &.palaceblue {
        background-image: url('./images/palaceblueAwordBox.png');
    }
    &.emerald {
        background-image: url('./images/emeraldAwordBox.png');
    }
    .wrapper {
        width: 100%;
        overflow-x: hidden;
    }
    ul {
        white-space: nowrap;
    }
    .aword {
        list-style: none;
        display: inline-block;
        height: pxTorem(160);
        padding: pxTorem(5);
        margin: 0 pxTorem(17.5);
        img {
            width: pxTorem(145);
            height: pxTorem(113);
        }
        h6 {
            color: $white;
            width: pxTorem(145);
            height: pxTorem(42);
            line-height: pxTorem(42);
            text-align: center;
            overflow: hidden;
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
        <<<<<<< HEAD &.palaceblue {
            background-color: #1081e1;
            =======&.emerald {
                background-color: #019a88;
                >>>>>>> 1c8d673fa2015f6b738a29bf3d1b16672e4befa3
            }
        }
    }
</style>
<template>
    <div :class='["v-aword-box",color]'>
        <div class='wrapper'>
            <ul ref='scroller'>
                <li :class='["aword",color]' v-for='aword in awords'>
                    <img :src='aword.pic'>
                    <h6>
                        {{aword.name|filter}}
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
