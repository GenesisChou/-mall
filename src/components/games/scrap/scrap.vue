<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.v-scrap {
    position: relative;
    height: pxTorem(600);
    background-image: url('./images/scrap.png');
    background-size: 100%;
}

.container {
    position: absolute;
    left: pxTorem(138);
    top: pxTorem(312);
    width: pxTorem(497);
    height: pxTorem(196);
}

</style>
<template>
    <div class='v-scrap '>
        <div class='container'>
            <canvas id='canvas'></canvas>
        </div>
    </div>
</template>
<script>
export default {

    name: 'scrap',

    data() {
        return {

        };
    },
    ready() {
        this.init();
        window.onresize = () => {
            this.init();
        };
    },
    methods: {
        pxTorem(value) {
            let clientWidth = document.documentElement.clientWidth;
            return value * clientWidth / 750;
        },
        init() {
            let canvas = document.querySelector('#canvas');
            let ctx = canvas.getContext('2d');
            canvas.setAttribute('width', `${this.pxTorem(496)}px`);
            canvas.setAttribute('height', `${this.pxTorem(192)}px`);
            ctx.beginPath();
            ctx.fillStyle = '#a3a3a3';
            ctx.fillRect(0, 0, this.pxTorem(496), this.pxTorem(192));
            ctx.closePath();
            canvas.addEventListener('touchstart', () => {
                canvas.addEventListener('touchmove', () => {
                    let x = this.pxTorem(event.targetTouches[0].clientX - 138);
                    let y = this.pxTorem(event.targetTouches[0].clientY - 312);
                    ctx.clearRect(x, y, this.pxTorem(30), this.pxTorem(30));
                })
            })
        }
    }
};
</script>
