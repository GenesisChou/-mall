<style lang='scss' scoped>
	.v-loading {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 100;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}
</style>
<template>
	<div v-show='show' class='v-loading'>
		<v-spinner></v-spinner>
	</div>
</template>
<script>
	import vSpinner from 'components/vSpinner.vue';
	export default {
		name:'vLoading',
		components:{
			vSpinner
		},
		computed: {
			show(){
                return this.$store.state.v_loading.show;
			}
		}
	}
</script>