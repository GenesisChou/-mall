<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
</style>
<template>
    <div class='test'>
        <v-dialog v-model='show' :dialog='dialog'></v-dialog>
    </div>
</template>
<script>
    import vDialog from 'views/activityDetail/components/vDialog';
    export default {
        components: {
            vDialog
        },
        data() {
            return {
                show: true,
                dialog:{}
            }
        },
        methods: {},
        created() {
            this.dialog = {
                type: 'success',
                // img: result.pic_thumb,
                msg: '获得balabala',
                btn_text: '查看',
                // callback: this.toOrderDetail(result.id),
                // callback_close: () => {
                //     let canvas = document.getElementsByTagName('canvas');
                //     canvas = Array.prototype.slice.call(canvas);
                //     canvas.forEach(item => {
                //         item.parentElement.removeChild(item)
                //     });
                //     this.init();
                // },
            };

        }
    }
</script>