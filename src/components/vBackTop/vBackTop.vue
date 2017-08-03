<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-back-top {
        position: fixed;
        right: pxTorem(50);
        bottom: pxTorem(117);
        width: pxTorem(94);
        height: pxTorem(94);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>
<template>
    <transition name='fade'>
        <img v-show='show' @click='backTop' src='./images/backTop.png' class=' v-back-top '>
    </transition>
</template>
<script>
    export default {
        name: 'backTop',
        data() {
            return {
                show: false,
                scroll_event: '',
            };
        },
        created() {
            this.scroll_event = this.getScrollEvent();
            window.addEventListener('scroll', this.scroll_event);
        },
        computed: {
            router_state() {
                return this.$parent.router_state || {};
            }
        },
        watch: {
            router_state(value) {
                if (value === 'leave') {
                    window.removeEventListener('scroll', this.scroll_event);
                } else if (value === 'enter') {
                    window.addEventListener('scroll', this.scroll_event);
                }
            }

        },
        methods: {
            backTop() {
                let height = utils.getScrollTop(),
                    interval = 0;
                const clientHeight = utils.getClientHeight(),
                    timer = window.setInterval(() => {
                        if (height >= 0) {
                            interval = (50 * (height / clientHeight));
                            height -= interval > 2 ? interval : 2;
                            window.scrollTo(0, height);
                        } else {
                            window.clearInterval(timer);
                        }
                    }, 10);
            },
            getScrollEvent() {
                const clientHeight = utils.getClientHeight();
                return utils.debounce(() => {
                    this.show = utils.getScrollTop() > 1.5 * clientHeight;
                }, 500, 500);
            }
        },
    };
</script>