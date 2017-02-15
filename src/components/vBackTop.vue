<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-back-top {
        position: fixed;
        right: pxTorem(50);
        bottom: pxTorem(50);
        width: pxTorem(70);
        height: pxTorem(70);
        line-height: pxTorem(70);
        text-align: center;
        border-radius: 50%;
        color: $white;
        background-color: $red;
        box-shadow: pxTorem(2) pxTorem(5) pxTorem(10) rgba(0, 15, 15, .3);
        &:active {
            background-color: darken($red, 10%);
        }
        .iconfont {
            font-size: pxTorem(24);
            font-weight: bold;
        }
    }
</style>
<template>
    <transition name='fade'>
        <div v-show='show' class=' v-back-top ' @click='backTop'>
            <i class=' icon-arrows-up iconfont'></i>
        </div>
    </transition>
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
        watch: {
            $route(value) {
                //离开解除滚动事件
                if (this.scrollEvent) {
                    window.removeEventListener('scroll', this.scrollEvent);
                    this.scrollEvent='';
                } else {
                    //进入绑定滚动事件
                    this.scrollEvent = this.getScrollEvent();
                    window.addEventListener('scroll', this.scrollEvent);
                }
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