<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .carousel-scroller {
        position: relative;
        font-size: 0;
        white-space: nowrap;
    }
    
    img {
        width: 400px;
        height: 200px;
        border:1px solid black;
    }
</style>
<template>
    <div class='test'>
        <div id="carousel-container">
            <div class="carousel-scroller" id="carousel-scroller">
                <img >
                <img >
                <img >
                <img >
                <img >
            </div>
        </div>
    </div>
</template>
<script>
    import Transform from 'alloytouch/transformjs/transform.js';
    import AlloyTouch from 'alloytouch/alloy_touch.js';
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            rotate() {
                this.show = !this.show;
            }
        },
        mounted() {
            var scroller = document.querySelector("#carousel-scroller");
            Transform(scroller);
            new AlloyTouch({
                touch: "#carousel-container", //ÂèçÈ¶àËß¶Êë∏ÁöÑdom
                vertical: false, //‰∏çÂøÖÈúÄÔºåÈªòËÆ§ÊòØtrue‰ª£Ë°®ÁõëÂê¨Á´ñÁõ¥ÊñπÂêëtouch
                target: scroller, //ËøêÂä®ÁöÑÂØπË±°
                property: "translateX", //Ë¢´ËøêÂä®ÁöÑÂ±ûÊÄß
                min: -(2000 - window.innerWidth), //‰∏çÂøÖÈúÄ,ËøêÂä®Â±ûÊÄßÁöÑÊúÄÂ∞èÂÄº
                max: 0 //‰∏çÂøÖÈúÄ,ÊªöÂä®Â±ûÊÄßÁöÑÊúÄÂ§ßÂÄº
            })

        }
    }
</script>