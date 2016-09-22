
<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
	.v-list-item{
		display: flex;
		height: 2.5rem;
		align-items: center;
		border-bottom:1px solid black;
		>img{
			width: 2.3rem;
			height: 1.7rem;
			border:1px solid black;
			margin:0 $content-gap;
		}
	}
</style>
<template>
<div class='v-list-item' v-link='link'>
	<img >
	<div>
		<strong>{{title}}</strong>
		<p>{{titleDupty}}</p>
	</div>
</div>
</template>

<script>
export default {

  name: 'v-list-item',
  props:{
  	link:{
  		type:Object,
  		default:'',
  	},
  	title:{
  		type:String,
  		default:''
  	},
  	titleDupty:{
  		type:String,
  		default:''
  	}
  },
  data () {
    return {

    };
  }
};
</script>
