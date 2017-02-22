<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-rotate {
        width: pxTorem(300);
        height: pxTorem(300);
        position: relative;
        .front {
            position: absolute;
            left: 0;
            top: 0;
            transform: rotateY(0);
            transform-origin: pxTorem(50) 50%;
            backface-visibility: hidden;
            transition: 1s;
        }
        .back {
            position: absolute;
            left: 0;
            top: 0;
            transform: rotateY(180deg);
            transform-origin: pxTorem(50) 50%;
            backface-visibility: hidden;
            transition: 1s;
        }
    }
    
    .v-rotate.active {
        .front {
            transform: rotateY(180deg);
        }
        .back {
            transform: rotateY(360deg);
        }
    }
</style>
<template>
    <div class='v-rotate' ref='vRotate' @click='rotate'>
        <div class='front'>
            <slot name='front'></slot>
        </div>
        <div class='back'>
            <slot name='back'></slot>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            rotate() {
                this.$refs.vRotate.classList.add('active');
            }
        }
    }
</script>