<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    img {
        width: pxTorem(200);
        height: pxTorem(200);
        margin: pxTorem(300) auto;
    }
</style>
<template>
    <div class='test'>
        <img class='img' src="">
        <v-load-more></v-load-more>
        <button class='btn btn-red' @click='toggleAlert'>alert</button>
        <button class='btn btn-red' @click='toggleConfirm'>confirm</button>
    </div>
</template>
<script>
    import vLoadMore from 'components/vLoadMore.vue'
    import fortune from 'components/activities/fortune';
    import shake from 'components/activities/shake';
    export default {
        components: {
            fortune,
            shake,
            vLoadMore,
        },
        data() {
            return {}
        },
        mounted() {
            let img = document.getElementsByTagName('img')[0];
            let start_x=0,start_y=0;
            img.addEventListener('touchstart', (event) => {
                let target = event.target,
                    startPoint = event.touches[0];
                start_x = startPoint.clientX,
                    start_y = startPoint.clientY;
            })
            img.addEventListener('touchend', (event) => {
                let stopPoint = event.changedTouches[0],
                    stop_x = stopPoint.clientX,
                    stop_y = stopPoint.clientY;
                let off_x = stop_x - start_x,
                    off_y = stop_y - start_y;
                console.log('touchend', off_x, off_y);
            })
        },
        methods: {
            toggleAlert() {
                this.$store.dispatch('toggleAlert', {
                    msg: "test",
                    // close_btn:true
                })
            },
            toggleConfirm() {
                this.$store.dispatch('toggleConfirm', {
                    msg: 'hello world'
                })
            }
        }
    }
</script>