<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .circle {
        width: pxTorem(100);
        height: pxTorem(100);
        border-radius: 50%;
    }
    
    .circle.front {
        background-color: #66ccff;
    }
    
    .circle.back {
        background-color: #e4393c;
    }
</style>
<template>
    <div class='test'>
        <v-load-more></v-load-more>
        <button class='btn btn-red' @click='toggleAlert'>alert</button>
        <button class='btn btn-red' @click='toggleConfirm'>confirm</button>
        <button class='btn btn-red' @click='toggleDialog'>dialog</button>
        <v-rotate>
            <div class='circle front' slot='front'>hello wolrd</div>
            <div class='circle back' slot='back'>fuck off</div>
        </v-rotate>
        <v-dialog v-model='dialogShow'  ></v-dialog>
    </div>
</template>
<script>
    import vRotate from 'components/vRotate.vue';
    import vLoadMore from 'components/vLoadMore.vue'
    import fortune from 'components/activities/fortune';
    import shake from 'components/activities/shake';
    import vDialog from 'components/activities/vDialog.vue';
    export default {
        components: {
            fortune,
            shake,
            vLoadMore,
            vRotate,
            vDialog
        },
        data() {
            return {
                test: '',
                dialogShow:false
            }
        },
        mounted() {
            // let img = document.getElementsByTagName('img')[0];
            // let start_x=0,start_y=0;
            // img.addEventListener('touchstart', (event) => {
            //     let target = event.target,
            //         startPoint = event.touches[0];
            //     start_x = startPoint.clientX,
            //         start_y = startPoint.clientY;
            // })
            // img.addEventListener('touchend', (event) => {
            //     let stopPoint = event.changedTouches[0],
            //         stop_x = stopPoint.clientX,
            //         stop_y = stopPoint.clientY;
            //     let off_x = stop_x - start_x,
            //         off_y = stop_y - start_y;
            //     console.log('touchend', off_x, off_y);
            // })
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
            },
            toggleDialog() {
                this.dialogShow=!this.dialogShow;
            }

        }
    }
</script>