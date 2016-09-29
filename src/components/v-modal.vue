<style lang='sass' scoped>
  @import '../assets/scss/variable';
    .modal {
      border-radius: pxTorem(5);
    }
</style>
<template >
  <v-popup :show.sync='show'>
    <div class='modal bg-white'>
      <slot></slot>
    </div>
  </v-popup>
</template>

<script>
import vPopup from 'components/v-popup'
export default {
  components: {vPopup},
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
}
</script>
