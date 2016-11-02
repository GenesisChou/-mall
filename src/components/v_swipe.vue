<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-swipe {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: pxTorem(300);
}

.scroll,
.circles li {
    float: left;
    list-style: none;
}

.scroll {
    height: 100%;
    transition: transform .8s;
    li {
        float: left;
        height: 100%;
    }
}

.circles {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    li {
        padding: pxTorem(8);
        margin: 0 pxTorem(10);
        border-radius: 50%;
        background-color: $white;
        &.active {
            background-color: $gray-light;
        }
    }
}
</style>
<template>
    <div class='v-swipe bg-white'>
        <ul class='scroll' :style='{width:scroll_width}'>
            <li v-for='item in list' :class='item.class' :style='{width:item_width}'></li>
        </ul>
        <ul class='circles'>
            <li v-for='(i,$index) in list.length' :class='$index==currentNumber?"active":""' @click='active($index)'></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            scroll: '',
            timer:'',
            currentNumber: 0,
            list: [{
                class: 'bg-pink'
            }, {
                class: 'bg-yellow'
            }, {
                class: 'bg-green'
            }, {
                class: 'bg-gray'
            }, {
                class: 'bg-blue'
            }],
        }
    },
    mounted() {
        this.scroll = document.querySelector('.scroll');
        this.start();
    },
    computed: {
        //轮播总宽度
        scroll_width() {
            return (this.list.length * 100) + '%';
        },
        item_width() {
            return this.gap + '%';
        },
        //每次移动间隔
        gap() {
            return Math.floor(100 / this.list.length);
        }
    },
    methods: {
        move($index) {
            this.scroll.style.transform = `translateX(-${$index*this.gap}%)`;
        },
        start() {
            this.timer = setInterval(() => {
            	console.log('moving');
                this.currentNumber = this.currentNumber == (this.list.length - 1) ? 0 : this.currentNumber + 1;
                this.move(this.currentNumber);
            }, 2000);

        },
        stop() {
            clearInterval(this.timer);
        },
        active($index) {
            this.stop();
            this.currentNumber = $index;
            this.move(this.currentNumber);
            this.start();
        },
    }
}
</script>
