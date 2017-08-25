<style lang='scss' scoped>
    @import '../../../../../../scss/variable.scss';
    .time {
        position: absolute;
        left: pxTorem(100);
        top: pxTorem(70);
        width: pxTorem(260);
        height: pxTorem(42);
        background: $white;
        border: pxTorem(6) solid #211d22;
        border-left: none;
        border-top-right-radius: pxTorem(21);
        border-bottom-right-radius: pxTorem(21);
    }

    .progress {
        width: 0;
        height: 100%;
        background: #fdf298;
        border-top-right-radius: pxTorem(21);
        border-bottom-right-radius: pxTorem(21);
    }

    .clock {
        position: absolute;
        left: pxTorem(-62);
        top: 50%;
        width: pxTorem(67);
        height: pxTorem(69);
        margin-top: pxTorem(-69/2);
        background: url('./images/clock.png') no-repeat center center/100% 100%;
        span {
            position: absolute;
            left: 50%;
            bottom: 5%;
            color: $white;
            font-size: pxTorem(14);
            transform: translateX(-50%);
        }
    }
</style>
<template>
    <div class='time'>
        <div class='progress' :style='progress'></div>
        <div class='clock'>
            <span>{{time}}S</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                full_time: ''
            }
        },
        computed: {
            time() {
                return this.$store.state.ship.time;
            },
            progress() {
                return {
                    width: `${(1-this.time/this.full_time)*100}%`
                }
            },
        },
        created() {
            this.full_time = this.$store.state.ship.time;
        },
    }
</script>