<style lang='sass' scoped>
@import '../assets/scss/variable.scss';


.slide1 {
    background-color: #0089dc;
    color: #fff;
}

.slide2 {
    background-color: #ffd705;
    color: #000;
}

.slide3 {
    background-color: #ff2d4b;
    color: #fff;
}
.swiper-container {
    width: 600px;
    height: 300px;
}
</style>
<template>
<div class='test'>
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide slide1">Slide 1</div>
            <div class="swiper-slide slide2">Slide 2</div>
            <div class="swiper-slide slide3">Slide 3</div>
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
    </div>
    <button class='btn' @click='alert'>alert</button>
    <v-load-more></v-load-more>
</div>
</template>
<script >
import vLoadMore from 'components/v_load_more.vue';
import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min.js'
import utils from 'libs/utils';
import {
    Swipe,
    SwipeItem
} from 'vue-swipe';
export default {
    components: {
        vLoadMore,
        Swipe,
        SwipeItem
    },
    computed: {},
    mounted() {
        // window.addEventListener('scroll',utils.debounce(function(){
        //   console.log('hi');
        // },1000))
        // console.log(this.test);
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            // direction: 'vertical',
            loop: true,

            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            // scrollbar: '.swiper-scrollbar',
        })
    },
    methods: {
        alert() {
            this.$store.dispatch('toggleAlert', {
                // type:'img',
                // img:'http://static.justtong.com/uploads/images/goods/20161215/12513458522156ad5b5.png',
                show: true,
                msg: 'asdfasdf',
            });
        },
        fuck() {
            console.log('fuck');
        },
        test() {
            console.log('test');
        }
    }
}
</script>
