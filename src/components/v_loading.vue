<style lang='sass' scoped>
.v-loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}
</style>
<template>
    <div v-show='show' class='v-loading'>
    	<v-spinner></v-spinner>
    </div>
</template>
<script >
import vSpinner from 'components//v_spinner.vue'
	export default{
		components:{
			vSpinner
		},
		props:{
			show:{
				type:Boolean,
				default:false
			}
		}
	}
</script>
