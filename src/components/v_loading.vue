<template >
  <v-modal :show.sync='show'>
    <div class='flex flex-center-h'>
        <v-spinner></v-spinner>
    </div>
  </v-modal>
</template>

<script>
import vModal from 'components/v_modal'
import vSpinner from 'components/v_spinner'
export default {
  components: {
    vModal,vSpinner
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
