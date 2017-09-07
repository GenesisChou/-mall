<style lang='scss' scoped>
    @import '../../../../../../../../assets/scss/variable.scss';
    .rubbish {
        animation: moveDown linear forwards;
        .container {
            width: 100%;
            height: 100%;
        }
        .content {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .wave {
            position: absolute;
            z-index: 0;
        }
    }

    .rubbish-1 {
        width: pxTorem(103);
        height: pxTorem(116);
        .content {
            background: url('./images/rubbish1.png') no-repeat center center/100% 100%;
        }
        .wave {
            left: -65%;
            top: -5%;
            width: pxTorem(185);
            height: pxTorem(191);
        }
        .score {
            top: pxTorem(-100);
            left: pxTorem(20);
        }
    }

    .rubbish-2 {
        width: pxTorem(133);
        height: pxTorem(123);
        .content {
            background: url('./images/rubbish2.png') no-repeat center center/100% 100%;
        }
        .wave {
            left: -27%;
            top: -22%;
            width: pxTorem(185);
            height: pxTorem(191);
        }
        .score {
            top: pxTorem(-100);
            left: pxTorem(20);
        }
    }

    .rubbish-3 {
        width: pxTorem(103);
        height: pxTorem(97);
        .content {
            background: url('./images/rubbish3.png') no-repeat center center/100% 100%;
        }
        .wave {
            left: 11%;
            top: 2%;
            width: pxTorem(185*0.7);
            height: pxTorem(191*0.7);
        }
        .score {
            top: pxTorem(-80);
            left: pxTorem(-10);
        }
    }

    .score {
        display: none;
        position: absolute;
        color: #093389;
        font-size: pxTorem(52);
        font-weight: bold;
        &.active {
            display: block;
            animation: score .7s forwards;
        }
    }

    @keyframes moveDown {
        from {
            top: -10%;
        }

        to {
            top: 110%;
        }
    }

    @keyframes score {
        from {
            transform: translateY(0);
            opacity: 1;
        }

        to {
            transform: translateY(-60%);
            opacity: 0;
        }
    }
</style>

<template>
    <div :ref='rubbish' :class='["rubbish-"+type,"rubbish"]' :style='style'>
        <span :class='["score",{active:score_show}]'>+{{score}}</span>
        <div v-if='show' class='container' :style='angle' @click='clear'>
            <img class='wave' src='./images/wave.png'>
            <div class='content'></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            rubbish: Object,
            clearRubbish: Function,
            speed: Number,
            status: String
        },
        data() {
            return {
                type: '',
                score: '',
                style: {},
                angle: {},
                show: true,
                clicked: false,
                score_show: false
            }
        },
        created() {
            /*
                speed:1-10 越大越快
                duration:1-5 越大越小
                当剩余时间为15s(可控)时speed(速度)达到最大10,duration(持续时间)变为最小1
            */
            const speed = {
                    min: 1,
                    max: 10,
                },
                duration = {
                    min: 2,
                    max: 5
                };
            const interval = (duration.max - duration.min) / (speed.max - speed.min),
                result = duration.max - (this.speed - speed.min) * interval;
            this.style = {
                position: `absolute`,
                left: `${Math.random() * 87}%`,
                animationDuration: `${result}s`
            }
            this.angle = {
                transform: `rotate(${-30 + Math.random() * 60}deg)`
            }
            this.type = Math.floor(1 + Math.random() * 3);
            const list = [5, 4, 3]
            this.score = list[this.type - 1];
            //自动销毁未被点击的垃圾
            setTimeout(() => {
                if (this.show === true && this.status === 'start') {
                    this.clearRubbish(this.rubbish.key);
                }
            }, Math.ceil(result) * 1000);
        },
        methods: {
            clear() {
                if (this.clicked === false) {
                    this.clicked = true;
                    this.score_show = true;
                    this.show = false;
                    this.rubbish.click(this.rubbish.key, this.score);
                    setTimeout(() => {
                        this.clearRubbish(this.rubbish.key);
                    }, 1000);
                }
            }
        }
    }
</script>