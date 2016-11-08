<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
@import './swiper.min.css';
.swiper-container {
    width: 100%;
    height: pxTorem(300);
    .swiper-pagination-bullet {
        padding: pxTorem(10);
        margin: 0 pxTorem(10);
        border-radius: 50%;
        background-color: $white;
    }
    .swiper-pagination-bullet-active {
        background-color: $gray-light;
    }
}
</style>
<template>
    <div  class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide bg-blue">
            </div>
            <div class="swiper-slide bg-green">
            </div>
            <div class="swiper-slide bg-yellow">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import './swiper.min.js'
export default {
    data() {
            return {
                mySwiper: '',
            }
        },
        mounted() {
            this.mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: 3000,
                speed: 600,
                autoplayDisableOnInteraction: false, //用户操作后不停止
                pagination: '.swiper-pagination',
                paginationBulletRender: function(swiper, index, className) {
                    return '<span class="' + className + '"></span>';
                }
            })
        }

}
</script>
