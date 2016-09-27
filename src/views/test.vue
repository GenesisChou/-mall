<template >
  <div class='test'>
    <v-spinner></v-spinner>
    <button class='btn btn-blue' @click='loading=true'>show loading</button>
    <br>
    <br>
    <button class='btn btn-blue' @click='modal=true'>show modal</button>
    <br>
    <br>
    <button class='btn btn-blue' @click='confirm=true'>show confirm</button>
    <v-loading :show.sync='loading'></v-loading>
    <v-modal :show.sync='modal'>
      <div>modal</div>
    </v-modal>
    <v-confirm :show.sync='confirm' :msg={title:'标题',ok:'好的',cancel:'取消'} :ok='okTest'></v-confirm>
  </div>
</template>

<script>
import vSpinner from 'components/v-spinner'
import vModal from 'components/v-modal'
import vLoading from 'components/v-loading'
import vConfirm from 'components/v-confirm'
export default {
  components: {
    vSpinner,vLoading,vModal,vConfirm
  },
  data () {
    return {
    	loading:false,
    	modal:false,
      confirm:false
    }
  },
  methods:{
    okTest(){
      alert('你点击了');
      this.confirm=!this.confirm;
    }
  }
}
</script>
