<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <modal :show.sync='modal' >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nihil tempore dolorem magnam nesciunt sapiente inventore. Praesentium eaque, nostrum repellat nihil deleniti quis, provident quam illum repellendus accusantium soluta veritatis?
    </modal>
    <button @click='modal=true'>show modal</button>
  </div>
</template>

<script>
import './assets/scss/main.scss';
import modal from 'components/modal';
export default {
  components:{
    modal
  },
  data () {
    return {
      msg: 'Hello Vue!',
      modal:false,
    }
  },
  ready(){
  },
}
</script>
