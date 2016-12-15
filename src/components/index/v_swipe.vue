<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.swiper-container {
    width: 100%;
    height: pxTorem(300);
    img{
        width: 100%;
        height: 100%;
    }
}

</style>
<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="slide in swiperSlides" >
            <img :src="slide.pic" @click='bannerView(slide)' class='swiper-lazy'>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>
<script>
import {
    swiper,
    swiperSlide,
} from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                // loop: true,
                autoplay: 4000,
                speed: 300,
                autoplayDisableOnInteraction: false, //用户操作后不停止
                pagination: '.swiper-pagination',
                paginationClickable: true,
                // mousewheelControl: true,
                // observeParents: true,
                // setWrapperSize: true,
            },
            swiperSlides: []
        }
    },
    mounted() {
        this.getHotBanners();
    },
    methods: {
        getHotBanners() {
            this.$http.post(`${APP.HOST}/hot_banner`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            }).then((response) => {
                this.swiperSlides = response.data.data;
            }, (response) => {});
        },
        routerLink(banner) {
            if (banner.type == 1) {
                window.location.href = banner.url;
            } else if (banner.type == 2) {
                this.$router.push({
                    name: "activity_detail",
                    query: {
                        activity_id: banner.item_id
                    }
                })
            }
        },
        bannerView(banner) {
            this.$store.dispatch('bannerView', banner.id);
            this.routerLink(banner);
        },
    }

}
</script>
