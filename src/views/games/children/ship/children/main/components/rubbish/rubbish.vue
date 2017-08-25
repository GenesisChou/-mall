<style lang='scss' scoped>
    @import '../../../../../../scss/variable.scss';
    .rubbish-1 {
        width: pxTorem(103);
        height: pxTorem(116);
        background: url('./images/rubbish1.png') no-repeat center center/100% 100%;
    }

    .rubbish-2 {
        width: pxTorem(133);
        height: pxTorem(123);
        background: url('./images/rubbish2.png') no-repeat center center/100% 100%;
    }

    .rubbish-3 {
        width: pxTorem(103);
        height: pxTorem(97);
        background: url('./images/rubbish3.png') no-repeat center center/100% 100%;
    }
</style>

<template>
    <div :class='"rubbish-"+type' :style='style' @click='updateScore'>{{score}}</div>
</template>
<script>
    export default {
        props: {
            rubbish: Object,
            clearRubbish: Function
        },
        data() {
            return {
                type: '',
                score: '',
                style: {}
            }
        },
        computed: {
            speed() {
                return this.$store.state.ship.speed.current / 10;
            }
        },
        created() {
            this.init();
            this.dropDown();
        },
        methods: {
            init() {
                this.style = {
                    position: `absolute`,
                    left: `${Math.random() * 87}%`,
                    top: `-10%`
                }
                this.type = Math.floor(1 + Math.random() * 3);
                const list = [4, 5, 3]
                this.score = list[this.type - 1];
            },
            updateScore() {
                this.$store.dispatch('ship/updateScore', this.$store.state.ship.score + this.score);
                this.clearRubbish(this.rubbish.key);
            },
            dropDown() {
                let distance = 0,
                    timer = setInterval(() => {
                        if (distance >= 110) {
                            clearInterval(timer);
                            if (typeof this.clearRubbish === 'function') {
                                this.clearRubbish(this.rubbish.key);
                            }
                        } else {
                            distance += this.speed;
                            this.style.top = `${-7+distance}%`
                        }
                    }, 16);
            }
        }
    }
</script>