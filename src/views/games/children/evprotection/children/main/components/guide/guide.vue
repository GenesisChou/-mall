<style lang="scss" scoped>
    @import '../../../../../../../../assets/scss/variable.scss';
    .v-guide {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 5;
    }

    .content {
        position: fixed;
        left: 50%;
        top: 50%;
        width: pxTorem(660);
        height: pxTorem(654);
        margin-left: pxTorem(-330);
        margin-top: pxTorem(-654/2);
        text-align: center;
        background: #fff5e3;
        border: pxTorem(10) solid #c68e4f;
        border-radius: pxTorem(10);
        transform-origin: center center;
        transform: scale(.95);
        z-index: 6;
    }

    .title {
        padding: pxTorem(96) 0 pxTorem(60) 0;
        font-size: pxTorem(42);
        color: #1b1b1b;
    }

    .rubbish {
        width: pxTorem(582);
        height: pxTorem(235);
        margin-bottom: pxTorem(45);
    }

    .button {
        width: pxTorem(475);
        height: pxTorem(81);
    }
</style>

<template>
    <div v-if='show' class='v-guide'>
        <transition name='enlarge'>
            <div class='content'>
                <h1 class='title'>点击下面内容可获得分数</h1>
                <img class='rubbish' src='./images/rubbish.png'>
                <img class='button' src='./images/button.png' @click='close'>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                default: false,
                type: Boolean,
            },
            callback: Function,
        },
        methods: {
            close() {
                if (this.callback && typeof this.callback === 'function') {
                    this.callback();
                } else {
                    this.$emit('update:show', false);
                }
            }
        }
    }
</script>