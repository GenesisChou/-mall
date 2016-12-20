<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.swiper-container {
    width: 100%;
    height: pxTorem(300);
}

</style>
<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min.js'
export default {
    data() {
        return {
            swiperOption: {
                loop: true,
                pagination: '.swiper-pagination',
                autoplay:3000,
                autoplayDisableOnInteraction:false,
                paginationClickable:true,
            },
        }
    },
    mounted() {
        this.getHotBanners();
    },
    methods: {
        getHotBanners() {
            var wrapper=document.querySelector('.swiper-wrapper');
            this.$http.post(`${APP.HOST}/hot_banner`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            }).then((response) => {
                let data=response.data;
                let slides=data.data;
                if(slides.length>0){
                  slides.forEach(slide=>{
                    var newSlide=document.createElement('div');
                    newSlide.className='swiper-slide';
                    newSlide.innerHTML=`<img  src="${slide.pic}" style='width:100%;height:100%'>`;
                    newSlide.addEventListener('click',()=>{
                      this.bannerView(slide);
                    })
                    wrapper.appendChild(newSlide);
                  })
                }
                new Swiper('.swiper-container',this.swiperOption);
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
