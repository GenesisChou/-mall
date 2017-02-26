<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-back-top {
        position: fixed;
        right: pxTorem(50);
        bottom: pxTorem(50);
        width: pxTorem(94);
        height: pxTorem(94);
    }
</style>
<template>
    <img v-show='show' @click='backTop' src='./images/backTop.png' class=' v-back-top '>
</template>
<script>
    export default {
        name: 'backTop',
        data() {
            return {
                show: false,
                scrollEvent: '',
            }
        },
        created() {
            this.scrollEvent = this.getScrollEvent();
            window.addEventListener('scroll', this.scrollEvent);
        },
        methods: {
            backTop() {
                let height = utils.getScrollTop();
                let timer = window.setInterval(() => {
                    if (height >= 0) {
                        height -= 150;
                        window.scrollTo(0, height);
                    } else {
                        window.clearInterval(timer);
                    }
                }, 10)
            },
            getScrollEvent() {
                let clientHeight = utils.getClientHeight();
                return utils.debounce(() => {
                    this.show = utils.getScrollTop() > 1.5 * clientHeight;
                }, 500, 500);

            }
        },

    }
</script>