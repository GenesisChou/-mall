<style lang='sass'>
@import './assets/scss/iconfont.css';
@import './assets/scss/main.scss';
</style>
<template>
    <div id="app">
        <keep-alive exclude='product_detail,activity_detail,order_list,order_detail' >
          <router-view></router-view>
        </keep-alive>
        <v-alert :show='v_alert.show' :msg='v_alert.msg' :callback='v_alert.callback' :type='v_alert.type' :cover-close='v_alert.cover_close' :btn-text='v_alert.btn_text' :img='v_alert.img'></v-alert>
        <v-confirm :show='v_confirm.show' :msg='v_confirm.msg' :callback='v_confirm.callback'></v-confirm>
        <v-loading :show='v_loading.show'></v-loading>
    </div>
</template>
<script>
import vAlert from 'components/v_alert.vue'
import vConfirm from 'components/v_confirm.vue'
import vLoading from 'components/v_loading.vue'
export default {
    name: 'app',
    components: {
        vAlert,
        vConfirm,
        vLoading,
    },
    mounted() {
        this.$store.dispatch('getUserInfor',function(response){
          let data=response.data;
          if(data.status==APP.SUCCESS){
            console.log('login success');
          }else if(data.status==APP.LOGIN_FAILED){
            console.log(data.info);
            utils.deleteLocalStorage(APP.MEDIA_ID);
            utils.reloadApp();
          }else{
            console.log(data.info);
            this.$store.dispatch('toggleAlert',{
              msg:'网络断开连接'
            })
          }
        });
        document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;
    },
    computed: {
        v_alert() {
            return this.$store.state.v_alert;
        },
        v_confirm() {
            return this.$store.state.v_confirm;
        },
        v_loading() {
            return this.$store.state.v_loading;
        }
    }
}
</script>
