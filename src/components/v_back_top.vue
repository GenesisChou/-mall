<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-back-top {
    position: fixed;
    right: pxTorem(50);
    bottom: pxTorem(50);
    width: pxTorem(80);
    height: pxTorem(80);
    border-radius: 50%;
    border: 2px solid $pink;
    opacity: 0;
    -webkit-transition: opacity .3s linear;
    -moz-transition: opacity .3s linear;
    -o-transition: opacity .3s linear;
    transition: opacity .3s linear;
}

.v-back-top.fade {
    opacity: 1;
}
</style>
<template>
    <div :class='["flex","flex-center-h","flex-center-v","v-back-top","bg-white","text-huge","bg-pink","text-white",show?"fade":""]' @click='backTop'>
        &#8593;
    </div>
</template>
<script>
import utils from 'libs/utils'
export default {
    name: 'back_top',
    data() {
        return {
            show: false
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
            this.show = utils.getScrollTop() > 1500 ? true : false;
        })
    }
}
</script>
