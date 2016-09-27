<template >
  <v-popup :show.sync='show'>
    <div class='flex flex-center-h'>
        <v-spinner></v-spinner>
    </div>
  </v-popup>
</template>

<script>
import vPopup from 'components/v-popup'
import vSpinner from 'components/v-spinner'
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
