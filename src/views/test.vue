<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-rotate {
        position: absolute;
        left: 40%;
        top: 50%;
        width: pxTorem(100);
        height: pxTorem(100);
        line-height: pxTorem(100);
        text-align: center;
        background-color: $orange;
        color: $white;
        border-radius: 50%;
        &.back {
            background-color: $gray;
        }
    }
</style>
<template>
    <div class='test'>
        <transition name='rotate'>
            <div v-if='show' class='v-rotate'>
                hello
            </div>
        </transition>
        <transition name='rotate'>
            <div v-if='!show' class='v-rotate back'>
                wolrd
            </div>
        </transition>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <button @click='rotate'>rotate</button>
    </div>
</template>
<script>
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

        }
    }
</script>