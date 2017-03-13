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
        ul {
            width: 100%;
            overflow-y: hidden;
            -webkit-overflow-y: hidden;
            overflow-x: scroll;
            -webkit-overflow-x: scroll;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
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
        }
    }
</style>

<template>
    <div :class='["v-aword-box",color]'>
        <ul>
            <li :class='["aword",color]' v-for='aword in awords'>
                <img :src='aword.pic'>
                <h6 class='text-ellipsis'>
                    {{aword.name}}
                </h6>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            awords: {
                default: () => [],
                type: Array
            },
            color: String
        }

    }
</script>