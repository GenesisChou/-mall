<style lang='sass' scoped>
	.v-loading {
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 100;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
	}
</style>
<template>
	<div v-show='show' class='v-loading'>
		<v-spinner></v-spinner>
	</div>
</template>
<script>
	export default {
		computed: {
			show(){
                return this.$store.state.v_loading.show;
			}
		}
	}
</script>