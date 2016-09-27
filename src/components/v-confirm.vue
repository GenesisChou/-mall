<style lang='sass' scoped>
</style>
<template>
    <v-modal :show.sync='show'>
        <div class='text-center'>
            <p>{{msg.title}}</p>
            <div>
                <button class='btn btn-default' @click='show=!show'>{{msg.cancel}}</button>
                <button class='btn btn-blue' @click='ok()'>{{msg.ok}}</button>
            </div>
        </div>
    </v-modal>
</template>
<script>
import vModal from 'components/v-modal'
export default {

    name: 'v-confirm',
    components: {
        vModal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        msg: {
            type: Object,
            default () {
                return {
                    ok: '确定',
                    cancel: '取消',
                    title:'你确定要操作吗?'
                }
            }
        },
        ok:{
          type:Function,
          default(){
            this.show=!this.show;
          }
        }
    },
    data() {
        return {

        };
    }
};
</script>
