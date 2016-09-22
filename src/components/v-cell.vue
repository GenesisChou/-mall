<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.cell{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 1.2rem;
	padding:0 $content-gap;
	border-top:1px solid black;
	border-bottom:1px solid black;
}
.icon{
	height: 0.6rem;
	width: 0.6rem;
	vertical-align: middle;
	border:1px solid black;
}
</style>
<template>
<div class='cell' v-link='link'>
		<div>
			<img class='icon mg5-r' />
			{{msgLeft}} 
		</div>
		<div>
			{{msgRight}}
			<span v-if='link'>></span>
		</div>

</div>
</template>

<script>
export default {

  name: 'cell',
  props:{
  	link:{
  		type:Object,
  		default:''
  	},
  	msgLeft:{
  		type:String,
  		default:''
  	},
  	msgRight:{
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
