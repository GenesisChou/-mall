<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-aword-box {
        position: relative;
        width: pxTorem(728);
        height: pxTorem(235);
        margin: pxTorem(48) auto 0 auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.red {
            background-image: url('./redAwordBox.png');
        }
        &.green {
            background-image: url('./greenAwordBox.png');
        }
        &.blue {
            background-image: url('./blueAwordBox.png');
        }
        ul {
            position: absolute;
            left: pxTorem(15);
            top: pxTorem(54);
            display: flex;
            display: -webkit-flex;
            width: pxTorem(700);
            overflow-x: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .aword {
            list-style: none;
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
                text-align:center;
            }
            &.red {
                background-color: #fe7a6f;
            }
            &.green {
                background-color: #78cc1e;
            }
            &.blue {
                background-color: #2ba7a9;
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