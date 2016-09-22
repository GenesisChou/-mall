<template>
<div class='mg10-t'>
	<div class='text-center'>
		<p><strong>当前余额</strong></p>
		<p><strong>{{1200 | currency '¥'}}</strong></p>
		<p>
			<button class='btn' @click='modal=true' >赚取积分</button>
			<button class='btn' v-link='{name:"exchange-list"}'>兑换记录</button>
		</p>
	</div>
	<modal :show.sync='modal'>
		我就是内容
	</modal>
</div>
</template>

<script>
import modal from 'components/modal'
export default {

  name: 'my-integral',
  components:{
  	modal
  },
  data () {
    return {
    	modal:false 
    };
  }
};
</script>

