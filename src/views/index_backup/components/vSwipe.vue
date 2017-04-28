<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss'; // @import './style.scss';
    .v-swipe {
        width: pxTorem(750);
        height: pxTorem(330);
    }

    .slide-item {
        width: pxTorem(750);
        height: pxTorem(330);
    }
</style>
<template>
    <div class='v-swipe'>
        <swiper :options='swiperOption' ref='mySwiper'>
            <!-- slides -->
            <swiper-slide v-for='slide in slides'>
                <img class='slide-item' :src="slide.pic">
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
        name: 'vSwipe',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                slides: [],
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
                        // console.log(this.slides[index]);
                        this.routerLink(this.slides[index]);
                    },
                }
            };
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        created() {
            this.getHotBanners();
        },
        mounted() {
            this.swiper.slideTo(1, 0);
        },
        methods: {
            getHotBanners() {
                this.$http.post(`${APP.HOST}/hot_banner`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.slides = data.data;
                    }
                }, (response) => {});
            },
            routerLink(banner) {
                //1 外链    2 活动    3 商品     4 专题
                const type = banner.type,
                    id = banner.id,
                    item_id = banner.item_id;
                // let router = null;
                this.$store.dispatch('bannerView', id);
                switch (type) {
                    case 1:
                        location.href = banner.url;
                        break;
                    case 2:
                        this.$router.push({
                            name: 'activity_detail',
                            query: {
                                activity_id: item_id,
                            }
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: 'product_detail',
                            query: {
                                product_id: item_id,
                            }
                        });
                        break;
                    case 4:
                        this.$router.push({
                            name: 'subject_detail',
                            query: {
                                subject_id: item_id,
                            }
                        });
                        break;
                }
            },
        }
    };
</script>