<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-divider {
    position: relative;
    height: 1rem;
    .text{
    	position: absolute;
    	left:50%;
    	top:50%;
    	transform: translate(-50%,-50%);
    	background: $white;
    	padding:0 pxTorem(30);
    }
    .line{
    	position: absolute;
    	width: 100%;
    	top:50%;
    }
    .line.solid{
        border-bottom: 1px solid #bababa;
    }
    .line.dashed{
        border-bottom:2px dashed #bababa;
    }
    span{
        font-size: 100%;
        font-family: 'Microsoft Yahei'
    }
}
</style>
<template>
    <div class='v-divider text-gray'>
    	<div :class='["line", type]'></div>
        <span class='text'> {{text}} </span>
    </div>
</template>
<script>
export default {
	props:{
		text:{
			type:String,
			default:'内容'
		},
        type:{
            type:String,
            default:'solid'
        }
	}
}
</script>
