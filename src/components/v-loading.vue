<style lang='sass' scoped>
  @import '../assets/scss/variable.scss';
  .spinner {
      border: pxTorem(8) solid $gray-light-extra;
      border-top: pxTorem(8) solid $blue;
      border-radius: 50%;
      width: pxTorem(60);
      height: pxTorem(60);
      animation: spin 2s linear infinite;
  }
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
</style>
<template >
  <v-popup :show.sync='show'>
    <div class='flex flex-center-h'>
      <div class='spinner'>

      </div>
    </div>
  </v-popup>
</template>

<script>
import vPopup from 'components/v-popup'
export default {
  components: {
    vPopup
  },
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {}
  },
  methods: {},
}
</script>
