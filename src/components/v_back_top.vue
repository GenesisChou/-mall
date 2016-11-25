<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-back-top {
    position: fixed;
    right: pxTorem(50);
    bottom: pxTorem(50);
    width: pxTorem(70);
    height: pxTorem(70);
    padding-top:pxTorem(5);
    text-align: center;
    border-radius: 50%;
    border: 2px solid $pink;
    color: $white;
    background-color: $red;
    -webkit-transition: opacity .3s linear;
    -moz-transition: opacity .3s linear;
    -o-transition: opacity .3s linear;
    transition: opacity .3s linear;
    box-shadow: pxTorem(2) pxTorem(5) pxTorem(10) rgba(0, 15, 15, .3);
}
</style>
<template>
    <transition name='fade'>
        <div v-show='show' class=' v-back-top text-huge' @click='backTop'>
            <i class=' icon-arrows-up iconfont text-small'></i>
        </div>
    </transition>
</template>
<script>
import utils from 'libs/utils'
export default {
    name: 'back_top',
    data() {
        return {
            show: true
        }
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
        }
    },
    created() {
        window.addEventListener('scroll', () => {
            this.show = utils.getScrollTop() > 1000;
        })
    }
}
</script>
