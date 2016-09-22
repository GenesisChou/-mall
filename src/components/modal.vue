<style lang='sass' scoped>
	.modal{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background: rgba(0,0,0,.3);
		z-index: 1;
	}
	.content{
		position: absolute;
		left:50%;
		top:50%;
		width: 80%;
		transform: translate(-50%,-50%);
		border: 1px solid black;
		background: white;
	}
	.head{
		overflow: hidden;
		_zoom:1;
		padding-left:5px;
		border-bottom:1px solid black;
		.close{
			float:right;
			padding:2px 5px;
		}
	}
	.body{
		padding: 5px;
	}
	.footer{
		border-top:1px solid black;
		text-align: right;
	}
</style>
<template>
<div v-if='show' class='modal'>
	<div class='content'>
		<div class='head'>
			<span>{{title}}</span>
			<span class='close' @click='show=false'>&times;</span>
		</div>
		<div class='body'>
			<slot></slot>
		</div>
		<div v-if='footer' class='footer'>
			<button>{{okText}}</button>
			<button>{{cancelText}}</button>
		</div>
	</div>
</div>
</template>

<script>
export default {

  name: 'modal',
  props:{
  	show:{
  		type:Boolean,
  		default:false
  	},
  	footer:{
  		type:Boolean,
  		default:true
  	},
  	title:{
  		type:String,
  		default:'Title'
  	},
  	okText:{
  		type:String,
  		default:'ok'
  	},
  	cancelText:{
  		type:String,
  		default:'cancel'
  	}
  },
  data () {
    return {

    };
  }
};
</script>
