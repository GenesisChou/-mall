<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .soccer {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: pxTorem(-640/2);
        margin-top: pxTorem(-606/2);
        z-index: 6;
        .content {
            position: relative;
            width: pxTorem(640);
            height: pxTorem(606);
            overflow: hidden;
            background: url('./images/soccerBackground.png') no-repeat;
            background-size: 100% 100%;
        }
        .product {
            position: absolute;
            left:50%;
            top: pxTorem(196);
            width: pxTorem(196);
            height: pxTorem(196);
            transform:translateX(-50%);
        }
        .message {
            // display:flex;
            position: absolute;
            left: 50%;
            top: 22%;
            width: pxTorem(450);
            height: pxTorem(38);
            line-height: pxTorem(38);
            transform: translateX(-50%);
            overflow: hidden;
            text-align: center;
            color: #ee5917;
        }
        .score {
            position: absolute;
            left: 62%;
            top: 7.5%;
            color: #f81006;
            font-size: pxTorem(50);
            font-weight: 500;
        }

        .operation {
            position: absolute;
            left: 38%;
            bottom: 21.5%;
            width: pxTorem(159);
            height: pxTorem(51);
            &:last-child {
                bottom: 9.4%;
            }
        }
    }
</style>
<template>
    <transition name='enlarge'>
        <div v-if='show' class='soccer'>
            <!--<div class='close' @click='close'></div>-->
            <div class='content'>
                <span class='score'>{{dialog.score}}</span>
                <h5 class='message'>{{dialog.msg}}</h5>
                <img class='product' :src='dialog.img'>
                <div class='operation' @click='close'></div>
                <div class='operation' @click='func'></div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'soccer',
        props: {
            dialog: Object,
            close: Function,
            func: Function,
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                content_show: false,
                decoration_show: false
            };
        },
        mounted() {
            if (this.show) {
                setTimeout(() => {
                    this.content_show = true;
                }, 50);
            }
        }
    };
</script>