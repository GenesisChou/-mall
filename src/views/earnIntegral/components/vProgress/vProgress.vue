<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-progress {
        position: absolute;
        bottom: 0;
        li {
            float: left;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: pxTorem(750/7);
            height: pxTorem(150);
            float: left;
            list-style: none;
            color: $white;
            &:first-child {
                .pipe {
                    display: none;
                }
            }
            &:nth-child(7)~li,
            {
                float: right;
                .pipe {
                    left: 50%;
                }
            }
            &:nth-child(14)~li {
                float: left;
                .pipe {
                    left: -50%;
                }
            }
            &:nth-child(21)~li {
                float: right;
                .pipe {
                    left: 50%;
                }
            }
            &:nth-child(28)~li {
                float: left;
                .pipe {
                    left: -50%;
                }
            }
            &:nth-child(7n+1) {
                .pipe {
                    width: pxTorem(14);
                    height: pxTorem(140); // border-right: 1px solid #1d9ca0;
                    box-shadow: pxTorem(3) 0 0 #1d9ca0;
                    left: 50% !important;
                    top: -50%;
                    margin-left: pxTorem(-7); // transform:rotate();
                }
            }
        }
        .pipe {
            position: absolute;
            left: -50%;
            top: 32%;
            width: pxTorem(110);
            height: pxTorem(14);
            background: #14bcbf;
            box-shadow: 0 pxTorem(3) 0 #1d9ca0; // border-bottom: 1px solid #1d9ca0;
            &.verticle {
                width: pxTorem(14);
                height: pxTorem(140); // border-right: 1px solid #1d9ca0;
                box-shadow: pxTorem(3) 0 0 #1d9ca0;
                left: 50%;
                margin-left: pxTorem(-7); // transform:rotate();
            }
        }
        .circle {
            @include flex-center;
            position: relative;
            width: pxTorem(54);
            height: pxTorem(54);
            margin-bottom: pxTorem(5);
            border-radius: 50%;
            background-color: #2aa6a8;
            color: $white;
            box-shadow: 0 pxTorem(2) pxTorem(3) #1d9ca0;
            font-size: pxTorem(24);
            z-index: 2;
        }
        h6 {
            position: relative;
            z-index: 2;
        }
        .gift {
            position: absolute;
            width: pxTorem(59);
            height: pxTorem(70);
            left: 50%;
            top: pxTorem(-20);
            margin-left: pxTorem(-59/2);
            z-index: 3;
            background: url('./images/gift.png') no-repeat;
            background-size: 100% 100%;
        }
        li.checked {
            .circle {
                background-color: #b7edee;
                color: $orange;
            }
            .pipe {
                background-color: #92e0e2;
                box-shadow: 0 pxTorem(3) 0 rgba(55, 186, 189, .8); // border-bottom: 1px solid #1d9ca0;
                &.verticle {
                    box-shadow: pxTorem(3) 0 0 rgba(55, 186, 189, .8);
                }
            }
            .gift {
                background-image: url('./images/activeGift.png');
            }
        }
    }
</style>
<template>
    <ul class='v-progress'>
        <li v-for='(item,$index) in checkinParams' :class='{checked:item.checkin}'>
            <div class='circle'>{{item.integral}}</div>
            <b class='pipe'></b>
            <h6>{{item.day}}</h6>
            <div v-if='item.price' class='gift'></div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'vProgress',
        props: {
            checkinParams: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        }
    };
</script>