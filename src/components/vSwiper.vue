<style lang='scss' scoped>
    @import '../assets/scss/variable.scss'; // @import './style.scss';
    .v-swiper {
        width: pxTorem(750);
        height: pxTorem(200);
    }

    .slide-item {
        width: pxTorem(750);
        height: pxTorem(200);
    }
</style>
<template>
    <div class='v-swiper'>
        <swiper :options='swiperOption' ref='mySwiper' id='swiper'>
            <!-- slides -->
            <swiper-slide v-for='slide in slides'>
                <img class='slide-item' :src="slide.url">
            </swiper-slide>
            <div class='swiper-pagination' slot='pagination'></div>
        </swiper>
    </div>
</template>
<script>
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    export default {
        name: 'vAdvSlide',
        props: {
            slides: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    autoHeight: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    onTap: (swiper) => {
                        // const index = swiper.realIndex;
                        // this.routerLink(this.layout.items[index], this.layout);
                    },
                }
            };
        },
        watch: {
            router_state(value) {
                if (value === 'leave') {
                    this.swiper.stopAutoplay();
                } else if (value === 'enter') {
                    this.swiper.startAutoplay();
                }
            }
        },
        computed: {
            router_state() {
                return this.$parent.router_state;
            },
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {
            this.swiper.slideTo(1, 0);
        },
    };
</script>