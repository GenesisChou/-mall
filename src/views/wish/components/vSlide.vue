<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-slide {
        width: pxTorem(750);
        height: pxTorem(200);
    }

    .slide-item {
        width: pxTorem(750);
        height: pxTorem(200);
    }
</style>
<template>
    <div v-if='items.length>0' class='v-slide'>
        <swiper v-if='items.length>1' :options='swiperOption' ref='mySwiper' id='swiper'>
            <!-- slides -->
            <swiper-slide v-for='slide in items'>
                <img class='slide-item' :src="slide.pic_banner_new">
            </swiper-slide>
            <div class='swiper-pagination' slot='pagination'></div>
        </swiper>
        <img class='slide-item' v-else :src='items[0].pic_banner_new' @click='routerLink(items[0])'>
    </div>
</template>
<script>
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    export default {
        name: 'vSlide',
        props: {
            items: Array
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
                        const index = swiper.realIndex;
                        this.routerLink(this.items[index]);
                    },
                }
            };
        },
        watch: {
            router_state(value) {
                if (this.items.length > 1) {
                    if (value === 'leave') {
                        this.swiper.stopAutoplay();
                    } else if (value === 'enter') {
                        this.swiper.startAutoplay();
                    }
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
            if (this.items.length > 1) {
                this.swiper.slideTo(1, 0);
            }
        },
        methods: {
            routerLink(item) {
                let link = '';
                if (item.type === 1) {
                    link = {
                        name: 'publish_wish'
                    };
                } else if (item.type === 2) {
                    link = {
                        name: 'product_detail',
                        query: {
                            product_id: item.item_id,
                        }
                    };
                } else if (item.type === 3) {
                    link = {
                        name: 'activity_detail',
                        query: {
                            activity_id: item.item_id,
                        }
                    };
                } else if (item.type === 4) {
                    link = {
                        name: 'subject_detail',
                        query: {
                            subject_id: item.item_id,
                        }
                    };
                } else if (item.type === 5) {
                    location.href = item.url;
                }
                this.$router.push(link);
            }
        }
    };
</script>