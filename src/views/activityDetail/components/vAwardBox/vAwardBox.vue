<style lang='scss' scoped>
@import '../../../../assets/scss/variable.scss';
.v-award-box {
    position: relative;
    width: pxTorem(728);
    height: pxTorem(235);
    padding: pxTorem(45) pxTorem(20) 0 pxTorem(15);
    margin: pxTorem(48) auto 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    ul,li{
        list-style:none;
    }
    &.red {
        background-image: url('./images/redAwardBox.png');
    }
    &.green {
        background-image: url('./images/greenAwardBox.png');
    }
    &.aquamarine {
        background-image: url('./images/aquamarineAwardBox.png');
    }
    &.blue {
        background-image: url('./images/blueAwardBox.png');
    }
    &.navy {
        background-image: url('./images/navyAwardBox.png');
    }
    &.brown {
        background-image: url('./images/brownAwardBox.png');
    }
    &.palaceblue {
        background-image: url('./images/palaceblueAwardBox.png');
    }
    &.emerald {
        background-image: url('./images/emeraldAwardBox.png');
    }
    &.army {
        background-image: url('./images/armyAwardBox.png');
    }
    &.purple{
        background-image: url('./images/purpleAwardBox.png');
    }
    &.orange{
        background-image: url('./images/orangeAwardBox.png');
    }
    &.yellow{
        background-image: url('./images/yellowAwardBox.png');
    }
    .wrapper {
        width: 100%;
        overflow-x: hidden;
    }
    ul {
        white-space: nowrap;
        // display:flex;
    }
    .award {
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:center;
        width:pxTorem(155);
        height:pxTorem(175);
        margin:0 pxTorem(21);
        padding:pxTorem(10) pxTorem(10) 0 pxTorem(10);
        img {
            width: pxTorem(125);
            height: pxTorem(125);
        }
        h6 {
            color: $white;
            font-size:pxTorem(22);
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
        &.army{
            background-color:#1d7233;
        }
        &.purple{
            background-color:#9901aa;
        }
        &.orange{
            background-color:#e76241;
        }
        &.yellow{
            background-color:#e8af00;
        }
    }
}
</style>
<template>
    <div :class='["v-award-box",color]'>
        <div class='wrapper'>
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
