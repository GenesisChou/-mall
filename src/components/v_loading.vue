<template >
  <v-popup :show.sync='show'>
    <div class='flex flex-center-h'>
        <v-spinner></v-spinner>
    </div>
  </v-popup>
</template>

<script>
import vPopup from 'components/v_popup'
import vSpinner from 'components/v_spinner'
export default {
  components: {
    vPopup,vSpinner
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
